/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import { BASE_URL } from "../../config/api";
import Swal from "sweetalert2";

export default function AdminTreatments() {
  const [treatments, setTreatments] = useState<any[]>([]);
  const [logs, setLogs] = useState<{ consults: any[]; appointments: any[] }>({
    consults: [],
    appointments: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    is_active: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  // 👇 [PERBAIKAN] State untuk Otorisasi CRUD Treatment 👇
  const [adminUser, setAdminUser] = useState<any>(null);
  const [allowedModules, setAllowedModules] = useState<string[]>([]);

  useEffect(() => {
    // Ambil data user & otorisasi dari localStorage saat komponen dimuat
    const userStr = localStorage.getItem("admin_user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setAdminUser(user);
      try {
        const policiesStr = localStorage.getItem("admin_access_policies");
        if (policiesStr) {
          const policies = JSON.parse(policiesStr);
          if (user.usertype !== "superadmin") {
            setAllowedModules(policies[user.usertype] || []);
          }
        }
      } catch (error) {
        console.error("Gagal membaca kebijakan akses:", error);
      }
    }
  }, []);

  // Fungsi Helper RBAC
  const canAccess = (key: string) => {
    if (!adminUser) return false;
    if (adminUser.usertype === "superadmin") return true; 
    return allowedModules.includes(key);
  };
  // 👆 ========================================== 👆

  const fetchAllData = useCallback(async () => {
    const token = localStorage.getItem("admin_token");
    const headers = { Authorization: `Bearer ${token}` };

    // Fetch Treatments
    const resT = await fetch(`${BASE_URL}/api/admin/clinic-treatments`, {
      headers,
    });
    if (resT.ok) setTreatments(await resT.json());

    // Fetch Notifications/Logs
    const resL = await fetch(`${BASE_URL}/api/admin/clinic-notifications`, {
      headers,
    });
    if (resL.ok) setLogs(await resL.json());
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // --- FUNGSI APPROVAL ADMIN DENGAN KONFIRMASI ---
  const updateStatus = async (
    type: "consults" | "appointments",
    id: number,
    status: "approved" | "rejected",
    email: string 
  ) => {
    const actionText = status === "approved" ? "menyetujui" : "menolak";
    const confirmColor = status === "approved" ? "#10b981" : "#ef4444"; 

    const result = await Swal.fire({
      title: `Konfirmasi Tindakan`,
      html: `Anda yakin ingin <strong>${actionText}</strong> permintaan dari <br/> <span class="text-gycora font-bold">${email}</span>?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: confirmColor,
      cancelButtonColor: "#9ca3af",
      confirmButtonText: `Ya, ${status === 'approved' ? 'Setujui' : 'Tolak'}`,
      cancelButtonText: "Batal",
      reverseButtons: true 
    });

    if (result.isConfirmed) {
      const token = localStorage.getItem("admin_token");
      try {
        const res = await fetch(
          `${BASE_URL}/api/admin/clinic-notifications/${type}/${id}/status`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status }),
          },
        );

        if (res.ok) {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: `Permintaan berhasil di-${status === "approved" ? "setujui" : "tolak"}`,
            showConfirmButton: false,
            timer: 2000,
          });
          fetchAllData(); 
        } else {
           throw new Error("Gagal menyimpan perubahan");
        }
      } catch (err) {
        Swal.fire("Error", "Gagal memperbarui status ke server", "error");
      }
    }
  };

  const handleOpenModal = (item: any = null) => {
    if (item) {
      setIsEdit(true);
      setSelectedId(item.id);
      setFormData({
        title: item.title,
        price: item.price,
        is_active: item.is_active,
      });
    } else {
      setIsEdit(false);
      setFormData({ title: "", price: "", is_active: true });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Hapus Treatment?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("admin_token");
        await fetch(`${BASE_URL}/api/admin/clinic-treatments/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchAllData();
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("admin_token");
    const data = new FormData();
    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("is_active", String(formData.is_active ? 1 : 0));
    if (imageFile) data.append("image", imageFile);
    if (isEdit) data.append("_method", "PUT");

    const url = isEdit
      ? `${BASE_URL}/api/admin/clinic-treatments/${selectedId}`
      : `${BASE_URL}/api/admin/clinic-treatments`;

    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      body: data,
    });

    if (res.ok) {
      Swal.fire("Berhasil", "Data berhasil disimpan", "success");
      setIsModalOpen(false);
      fetchAllData();
    }
  };

  const renderStatusBadge = (status: string) => {
    if (status === "approved")
      return (
        <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-emerald-500 rounded">
          Disetujui
        </span>
      );
    if (status === "rejected")
      return (
        <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-red-500 rounded">
          Ditolak
        </span>
      );
    return (
      <span className="px-2 py-0.5 text-[10px] font-bold text-gray-600 bg-gray-200 rounded">
        Menunggu
      </span>
    );
  };

  return (
    <div className="max-w-6xl p-8 mx-auto space-y-12 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Portal Manajemen Klinik
        </h1>

        {/* BUNGKUS TOMBOL TAMBAH TREATMENT */}
        {canAccess('treatments.create') && (
          <button
            onClick={() => handleOpenModal()}
            className="px-6 py-2 text-white transition-all shadow-lg bg-gycora rounded-xl hover:bg-gycora-dark"
          >
            + Tambah Treatment
          </button>
        )}
      </div>

      {/* TABEL TREATMENT */}
      <section className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
        <div className="p-6 font-bold border-b border-gray-100">
          Daftar Treatment
        </div>
        <table className="w-full text-left">
          <thead className="text-xs font-bold text-gray-500 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-4">Gambar</th>
              <th className="px-6 py-4">Nama</th>
              <th className="px-6 py-4">Harga</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {treatments.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img
                    src={t.image_url}
                    className="object-cover w-12 h-12 rounded-lg"
                  />
                </td>
                <td className="px-6 py-4 font-medium">{t.title}</td>
                <td className="px-6 py-4 font-bold text-gycora">
                  Rp {parseInt(t.price).toLocaleString()}
                </td>
                <td className="flex justify-center gap-2 px-6 py-4">
                  
                  {/* BUNGKUS TOMBOL EDIT */}
                  {canAccess('treatments.edit') && (
                    <button
                      onClick={() => handleOpenModal(t)}
                      className="p-2 text-blue-600 rounded-lg hover:bg-blue-50"
                    >
                      Edit
                    </button>
                  )}

                  {/* BUNGKUS TOMBOL HAPUS */}
                  {canAccess('treatments.delete') && (
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="p-2 text-red-600 rounded-lg hover:bg-red-50"
                    >
                      Hapus
                    </button>
                  )}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* LOG NOTIFIKASI KONSULTASI & APPOINTMENT */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* KOLOM KONSULTASI ONLINE */}
        <section className="flex flex-col overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
          <div className="p-6 border-b border-gray-100 bg-amber-50/30">
            <h2 className="flex items-center gap-2 font-bold text-amber-600">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>{" "}
              Permintaan Konsultasi
            </h2>
          </div>
          <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[500px] custom-scrollbar">
            {logs.consults.map((log: any) => (
              <div
                key={log.id}
                className="p-4 bg-white border border-gray-100 shadow-sm rounded-xl"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="font-bold text-gray-900">{log.email}</p>
                  {renderStatusBadge(log.status)}
                </div>
                <div className="mb-3 space-y-1 text-xs text-gray-600">
                  <p>
                    Kategori:{" "}
                    <span className="font-bold text-gycora">
                      {log.category_title}
                    </span>
                  </p>
                  <p>Metode: {log.consultation_type}</p>
                  <p>
                    Jadwal:{" "}
                    <span className="font-semibold text-gray-900">
                      {new Date(log.consultation_time).toLocaleString("id-ID")}
                    </span>
                  </p>
                  {log.notes && (
                    <p className="p-2 mt-2 italic border border-gray-100 rounded bg-gray-50">
                      "{log.notes}"
                    </p>
                  )}
                </div>

                {log.status === "pending" && (
                  <div className="flex gap-2 pt-3 mt-4 border-t border-gray-100">
                    {/* BUNGKUS TOMBOL APPROVE/REJECT KONSULTASI */}
                    {canAccess('treatments.approve') ? (
                      <>
                        <button
                          onClick={() => updateStatus("consults", log.id, "approved", log.email)}
                          className="flex-1 py-1.5 text-xs font-bold text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors"
                        >
                          Setujui
                        </button>
                        <button
                          onClick={() => updateStatus("consults", log.id, "rejected", log.email)}
                          className="flex-1 py-1.5 text-xs font-bold text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          Tolak
                        </button>
                      </>
                    ) : (
                      <p className="w-full text-xs italic text-center text-gray-400">Menunggu Persetujuan Admin</p>
                    )}
                  </div>
                )}
              </div>
            ))}
            {logs.consults.length === 0 && (
              <p className="py-10 text-sm text-center text-gray-400">
                Belum ada pengajuan konsultasi.
              </p>
            )}
          </div>
        </section>

        {/* KOLOM JANJI TEMU (APPOINTMENT) */}
        <section className="flex flex-col overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
          <div className="p-6 border-b border-gray-100 bg-emerald-50/30">
            <h2 className="flex items-center gap-2 font-bold text-emerald-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>{" "}
              Reservasi Janji Temu
            </h2>
          </div>
          <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[500px] custom-scrollbar">
            {logs.appointments.map((ap: any) => (
              <div
                key={ap.id}
                className="p-4 bg-white border border-gray-100 shadow-sm rounded-xl"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="font-bold text-gray-900">{ap.email}</p>
                  {renderStatusBadge(ap.status)}
                </div>
                <div className="mb-3 space-y-1 text-xs text-gray-600">
                  <p>
                    Treatment:{" "}
                    <span className="font-bold text-gycora">
                      {ap.treatment?.title}
                    </span>
                  </p>
                  <p>
                    Jadwal Kedatangan:{" "}
                    <span className="font-semibold text-gray-900">
                      {new Date(ap.appointment_time).toLocaleString("id-ID")}
                    </span>
                  </p>
                  {ap.reason && (
                    <p className="p-2 mt-2 italic border border-gray-100 rounded bg-gray-50">
                      "{ap.reason}"
                    </p>
                  )}
                </div>

                {ap.status === "pending" && (
                  <div className="flex gap-2 pt-3 mt-4 border-t border-gray-100">
                     {/* BUNGKUS TOMBOL APPROVE/REJECT APPOINTMENT */}
                     {canAccess('treatments.approve') ? (
                      <>
                        <button
                          onClick={() => updateStatus("appointments", ap.id, "approved", ap.email)}
                          className="flex-1 py-1.5 text-xs font-bold text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors"
                        >
                          Setujui
                        </button>
                        <button
                          onClick={() => updateStatus("appointments", ap.id, "rejected", ap.email)}
                          className="flex-1 py-1.5 text-xs font-bold text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          Tolak
                        </button>
                      </>
                    ) : (
                      <p className="w-full text-xs italic text-center text-gray-400">Menunggu Persetujuan Admin</p>
                    )}
                  </div>
                )}
              </div>
            ))}
            {logs.appointments.length === 0 && (
              <p className="py-10 text-sm text-center text-gray-400">
                Belum ada reservasi masuk.
              </p>
            )}
          </div>
        </section>
      </div>

      {/* MODAL ADD/EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg overflow-hidden bg-white shadow-2xl rounded-3xl animate-fade-in-up">
            <div className="flex items-center justify-between p-6 border-b bg-gray-50">
              <h3 className="text-lg font-bold">
                {isEdit ? "Update Treatment" : "Tambah Treatment"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div>
                <label className="block mb-1 text-sm font-bold">
                  Nama Treatment
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full p-3 border rounded-xl"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-bold">
                  Harga (Rp)
                </label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full p-3 border rounded-xl"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-bold">
                  Gambar (Upload S3)
                </label>
                <input
                  type="file"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 font-bold text-white transition-all shadow-lg bg-gycora rounded-2xl hover:bg-gycora-dark"
              >
                Simpan Perubahan
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}