/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

interface DynamicPromo {
  id: number;
  name: string;
  banner_badge: string | null;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

export default function AdminPromoListPage() {
  const navigate = useNavigate();
  const [promos, setPromos] = useState<DynamicPromo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPromos();
  }, []);

  const fetchPromos = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${BASE_URL}/api/admin/dynamic-promos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPromos(data);
      }
    } catch (error) {
      console.error("Gagal mengambil data promo", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Hapus Promo?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("admin_token");
        const res = await fetch(`${BASE_URL}/api/admin/dynamic-promos/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          Swal.fire("Terhapus!", "Promo berhasil dihapus.", "success");
          fetchPromos(); // Refresh data
        } else {
          Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus.", "error");
        }
      } catch (error) {
        Swal.fire("Error!", "Gagal menghubungi server.", "error");
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="p-6 font-sans bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="flex flex-col items-start justify-between gap-4 mb-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manajemen Promo Dinamis</h2>
          <p className="mt-1 text-sm text-gray-500">Atur diskon, aturan belanja, dan hadiah (freebies) di sini.</p>
        </div>
        <button
          onClick={() => navigate("/admin/dynamic-promos/create")}
          className="px-6 py-2.5 text-sm font-bold text-white transition-all shadow-md bg-[#006A4E] rounded-xl hover:bg-emerald-900"
        >
          + Buat Promo Baru
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 font-bold">Nama Promo</th>
              <th className="px-6 py-4 font-bold">Periode</th>
              <th className="px-6 py-4 font-bold text-center">Status</th>
              <th className="px-6 py-4 font-bold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {loading ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500 animate-pulse">Memuat data...</td>
              </tr>
            ) : promos.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">Belum ada promo yang dibuat.</td>
              </tr>
            ) : (
              promos.map((promo) => (
                <tr key={promo.id} className="transition-colors border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900">{promo.name}</p>
                    {promo.banner_badge && (
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold text-blue-700 bg-blue-100 rounded">
                        Badge: {promo.banner_badge}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <div><span className="font-semibold text-emerald-600">Mulai:</span> {formatDate(promo.start_date)}</div>
                    <div className="mt-1"><span className="font-semibold text-red-500">Berakhir:</span> {formatDate(promo.end_date)}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${promo.is_active ? "bg-emerald-100 text-emerald-800" : "bg-gray-200 text-gray-600"}`}>
                      {promo.is_active ? "Aktif" : "Tidak Aktif"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => navigate(`/admin/dynamic-promos/${promo.id}`)} className="p-2 text-blue-600 transition-colors rounded bg-blue-50 hover:bg-blue-100" title="Detail">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </button>
                      <button onClick={() => navigate(`/admin/dynamic-promos/edit/${promo.id}`)} className="p-2 transition-colors rounded text-emerald-600 bg-emerald-50 hover:bg-emerald-100" title="Edit">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button onClick={() => handleDelete(promo.id)} className="p-2 text-red-600 transition-colors rounded bg-red-50 hover:bg-red-100" title="Hapus">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}