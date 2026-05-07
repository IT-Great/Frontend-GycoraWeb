/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api"; // Sesuaikan path

export default function AdminEventForm() {
  const { id } = useParams<{ id: string }>(); // Jika ada ID, berarti mode EDIT
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(isEditMode); // Loading jika mode edit untuk ambil data lama
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    start_date: "",
    end_date: "",
    description: "",
    image_url: "",
    link_url: "",
    is_active: true
  });

  // Ambil data event lama jika dalam mode Edit
  useEffect(() => {
    if (isEditMode) {
      const fetchEventDetail = async () => {
        try {
          // Asumsi Anda punya endpoint GET detail event atau ngambil dari list. 
          // Karena controller Anda belum ada GET /{id}, 
          // kita fetch semua lalu cari yang cocok (Workaround sementara)
          const res = await fetch(`${BASE_URL}/api/events`);
          const data = await res.json();
          const allEvents = [...(data.data.upcoming || []), ...(data.data.past || [])];
          
          const event = allEvents.find((e: any) => e.id === Number(id));
          if (event) {
            setFormData({
              name: event.name,
              location: event.location,
              // Potong jam/waktu jika format dari server adalah datetime
              start_date: event.start_date.split('T')[0], 
              end_date: event.end_date ? event.end_date.split('T')[0] : event.start_date.split('T')[0],
              description: event.description,
              image_url: event.image_url || "",
              link_url: event.link_url || "",
              is_active: event.is_active
            });
          } else {
            Swal.fire("Error", "Event tidak ditemukan", "error");
            navigate("/admin/events");
          }
        } catch (error) {
          console.error("Gagal load detail:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchEventDetail();
    }
  }, [id, isEditMode, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Handle checkbox khusus
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem("admin_token") || localStorage.getItem("user_token");
      const url = isEditMode ? `${BASE_URL}/api/admin/events/${id}` : `${BASE_URL}/api/admin/events`;
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const responseData = await res.json();

      if (res.ok) {
        Swal.fire({
          title: "Berhasil!",
          text: responseData.message,
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
        navigate("/admin/events");
      } else {
        // Tampilkan error validasi dari Laravel
        let errorMsg = responseData.message || "Gagal menyimpan data.";
        if (responseData.errors) {
            errorMsg = Object.values(responseData.errors).flat().join("\n");
        }
        Swal.fire("Peringatan", errorMsg, "warning");
      }
    } catch (error) {
      Swal.fire("Error", "Gagal terhubung ke server.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Memuat data...</div>;

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 transition-colors bg-gray-100 rounded-full hover:bg-gray-200">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {isEditMode ? "Edit Event" : "Tambah Event Baru"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white border border-gray-100 shadow-sm sm:p-8 rounded-xl">
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700">Nama Event <span className="text-red-500">*</span></label>
            <input 
              type="text" name="name" required value={formData.name} onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-gycora"
              placeholder="Contoh: Illuma Market"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700">Lokasi <span className="text-red-500">*</span></label>
            <input 
              type="text" name="location" required value={formData.location} onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-gycora"
              placeholder="Contoh: PIK Avenue"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700">Tanggal Mulai <span className="text-red-500">*</span></label>
            <input 
              type="date" name="start_date" required value={formData.start_date} onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-gycora"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700">Tanggal Selesai <span className="text-red-500">*</span></label>
            <input 
              type="date" name="end_date" required value={formData.end_date} onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-gycora"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-700">Deskripsi Copywriting <span className="text-red-500">*</span></label>
          <textarea 
            name="description" required rows={5} value={formData.description} onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-gycora"
            placeholder="Tulis deskripsi event, promo yang ada, dan ajakan untuk hadir..."
          ></textarea>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700">URL Gambar/Banner</label>
            <input 
              type="text" name="image_url" value={formData.image_url} onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-gycora"
              placeholder="/images/event_cover.jpg atau https://..."
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700">URL Tombol [Visit Event]</label>
            <input 
              type="text" name="link_url" value={formData.link_url} onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-gycora"
              placeholder="https://instagram.com/p/..."
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input 
            type="checkbox" id="is_active" name="is_active" 
            checked={formData.is_active} onChange={handleInputChange}
            className="w-5 h-5 border-gray-300 rounded text-gycora focus:ring-gycora"
          />
          <label htmlFor="is_active" className="text-sm font-medium text-gray-700 cursor-pointer">
            Event Aktif (Tampilkan di halaman publik)
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
          <button 
            type="button" 
            onClick={() => navigate("/admin/events")}
            className="px-6 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold transition-colors"
          >
            Batal
          </button>
          <button 
            type="submit" 
            disabled={saving}
            className="px-8 py-2.5 bg-gycora hover:bg-emerald-700 text-white rounded-lg font-bold shadow-md transition-colors disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : "Simpan Event"}
          </button>
        </div>
      </form>
    </div>
  );
}