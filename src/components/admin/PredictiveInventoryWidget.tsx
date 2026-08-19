import { useState, useEffect } from "react";
import { BASE_URL } from "../../config/api";

interface PredictiveData {
  id: number;
  name: string;
  image_url: string;
  current_stock: number;
  sold_last_7_days: number;
  velocity_per_day: number;
  estimated_days_remaining: number;
  status_label: string;
  status_color: string;
}

export default function PredictiveInventoryWidget() {
  const [data, setData] = useState<PredictiveData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        const res = await fetch(`${BASE_URL}/api/admin/inventory/predictive`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const result = await res.json();
          // Ambil 5 produk paling kritis saja untuk widget
          setData(result.data.slice(0, 5));
        }
      } catch (error) {
        console.error("Gagal memuat predictive inventory", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'red': return 'bg-red-100 text-red-800 border-red-200';
      case 'yellow': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'green': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'gray': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) return <div className="h-64 p-6 bg-white border border-gray-100 shadow-sm rounded-xl animate-pulse">Memuat Analitik Inventaris...</div>;

  return (
    <div className="p-6 font-sans bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-extrabold text-gray-900">🚨 Smart Restock Alerts</h3>
          <p className="text-xs text-gray-500">Prediksi kehabisan stok berdasarkan tren penjualan 7 hari terakhir.</p>
        </div>
      </div>

      <div className="space-y-4">
        {data.length === 0 ? (
          <p className="text-sm italic text-gray-500">Belum ada data penjualan yang cukup untuk dianalisa.</p>
        ) : (
          data.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 transition-colors border border-gray-100 rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <img src={item.image_url} alt={item.name} className="object-cover w-10 h-10 border border-gray-200 rounded-md" />
                <div>
                  <p className="text-sm font-bold text-gray-900 truncate max-w-[200px]">{item.name}</p>
                  <p className="text-[10px] font-medium text-gray-500 uppercase tracking-widest mt-0.5">
                    Sisa Stok: <span className="font-bold text-gray-900">{item.current_stock}</span> | Kecepatan: <span className="font-bold text-gray-900">{item.velocity_per_day} / hari</span>
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <span className={`px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-full border ${getColorClasses(item.status_color)}`}>
                  {item.status_label}
                </span>
                {item.estimated_days_remaining !== 999 && item.estimated_days_remaining > 0 && (
                  <p className="text-[10px] text-gray-400 font-medium mt-1">
                    Prediksi habis dlm {item.estimated_days_remaining} hari
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}