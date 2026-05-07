/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api"; // Sesuaikan path

export default function AdminEventList() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/events`);
      const data = await res.json();
      
      // Menggabungkan upcoming dan past untuk tampilan tabel admin
      if (res.ok) {
        const allEvents = [...(data.data.upcoming || []), ...(data.data.past || [])];
        setEvents(allEvents);
      }
    } catch (error) {
      console.error("Gagal menarik data event:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Hapus Event?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("admin_token") || localStorage.getItem("user_token");
          const res = await fetch(`${BASE_URL}/api/admin/events/${id}`, {
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Accept": "application/json"
            }
          });

          if (res.ok) {
            Swal.fire("Terhapus!", "Event berhasil dihapus.", "success");
            fetchEvents(); // Refresh data
          } else {
            Swal.fire("Gagal", "Terjadi kesalahan saat menghapus data.", "error");
          }
        } catch (error) {
          Swal.fire("Error", "Gagal terhubung ke server.", "error");
        }
      }
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Event</h1>
        <Link 
          to="/admin/events/create" 
          className="px-4 py-2 font-medium text-white transition-colors rounded-lg shadow-sm bg-gycora hover:bg-emerald-700"
        >
          + Tambah Event
        </Link>
      </div>

      <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-sm text-gray-500 border-b border-gray-100 bg-gray-50">
                <th className="p-4 font-semibold">Nama Event</th>
                <th className="p-4 font-semibold">Lokasi</th>
                <th className="p-4 font-semibold">Tanggal</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400">Loading data...</td>
                </tr>
              ) : events.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400">Belum ada data event.</td>
                </tr>
              ) : (
                events.map((event) => {
                  const isPast = new Date(event.end_date || event.start_date) < new Date();
                  
                  return (
                    <tr key={event.id} className="transition-colors hover:bg-gray-50">
                      <td className="p-4">
                        <p className="font-bold text-gray-800">{event.name}</p>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{event.location}</td>
                      <td className="p-4 text-sm text-gray-600">
                        {new Date(event.start_date).toLocaleDateString('id-ID')} 
                        {event.end_date && event.end_date !== event.start_date ? ` - ${new Date(event.end_date).toLocaleDateString('id-ID')}` : ''}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          !event.is_active ? 'bg-red-100 text-red-600' :
                          isPast ? 'bg-gray-100 text-gray-600' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {!event.is_active ? 'Nonaktif' : isPast ? 'Selesai' : 'Upcoming'}
                        </span>
                      </td>
                      <td className="p-4 space-x-2 text-right">
                        <Link 
                          to={`/admin/events/${event.id}`} 
                          className="inline-block px-3 py-1 text-sm text-blue-600 transition-colors rounded hover:bg-blue-50"
                        >
                          Detail
                        </Link>
                        <Link 
                          to={`/admin/events/edit/${event.id}`} 
                          className="inline-block px-3 py-1 text-sm transition-colors rounded text-amber-600 hover:bg-amber-50"
                        >
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleDelete(event.id)}
                          className="px-3 py-1 text-sm text-red-600 transition-colors rounded hover:bg-red-50"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}