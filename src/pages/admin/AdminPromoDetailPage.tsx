/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/api";

export default function AdminPromoDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [promo, setPromo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromo = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        const res = await fetch(`${BASE_URL}/api/admin/dynamic-promos/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          // Pastikan rules di-parse jika dari backend bentuknya string
          if (typeof data.rules === 'string') {
            data.rules = JSON.parse(data.rules);
          }
          setPromo(data);
        }
      } catch (error) {
        console.error("Gagal memuat detail promo", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPromo();
  }, [id]);

  if (loading) return <div className="p-8 text-center animate-pulse">Memuat detail promo...</div>;
  if (!promo) return <div className="p-8 text-center text-red-500">Data promo tidak ditemukan.</div>;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="max-w-4xl p-6 mx-auto font-sans bg-white border border-gray-200 shadow-md rounded-xl">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800">Detail Promo</h2>
        <div className="flex gap-2">
          <button onClick={() => navigate("/admin/dynamic-promos")} className="px-4 py-2 text-sm font-bold text-gray-600 bg-gray-100 rounded hover:bg-gray-200">Kembali</button>
          <button onClick={() => navigate(`/admin/dynamic-promos/edit/${id}`)} className="px-4 py-2 text-sm font-bold text-white rounded bg-emerald-600 hover:bg-emerald-700">Edit Promo</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
        <div>
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Nama Promo</p>
          <p className="text-lg font-bold text-gray-900">{promo.name}</p>
        </div>
        <div>
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Status</p>
          <span className={`inline-block mt-1 px-3 py-1 text-xs font-bold rounded-full ${promo.is_active ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
            {promo.is_active ? "AKTIF" : "TIDAK AKTIF"}
          </span>
        </div>
        <div>
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Waktu Mulai</p>
          <p className="font-medium text-gray-800">{formatDate(promo.start_date)}</p>
        </div>
        <div>
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Waktu Selesai</p>
          <p className="font-medium text-gray-800">{formatDate(promo.end_date)}</p>
        </div>
        {promo.banner_badge && (
          <div className="md:col-span-2">
            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Banner Badge</p>
            <p className="font-medium text-gray-800">{promo.banner_badge}</p>
          </div>
        )}
      </div>

      <div className="p-5 mb-6 border border-gray-200 rounded-lg bg-gray-50">
        <h3 className="pb-2 mb-4 text-lg font-bold text-gray-800 border-b border-gray-200">Aturan Diskon & Hadiah (Tiers)</h3>
        {promo.rules?.tiers?.length > 0 ? (
          <div className="space-y-4">
            {promo.rules.tiers.map((tier: any, index: number) => (
              <div key={index} className="p-4 bg-white border border-gray-200 rounded shadow-sm">
                <p className="mb-2 font-bold text-emerald-700">Tingkat {index + 1}: Min. Belanja {formatIDR(tier.min_purchase)}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p><span className="text-gray-500">Diskon Nominal:</span> <span className="font-semibold text-gray-900">{formatIDR(tier.discount_nominal)}</span></p>
                  <p>
                    <span className="text-gray-500">Hadiah: </span> 
                    <span className="font-semibold text-gray-900">
                      {tier.freebies && tier.freebies.length > 0 ? tier.freebies.join(", ") : "-"}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm italic text-gray-500">Tidak ada aturan tiering.</p>
        )}
      </div>

      {promo.rules?.bundle_reward?.freebies && promo.rules.bundle_reward.freebies.length > 0 && (
        <div className="p-5 border border-purple-200 rounded-lg bg-purple-50">
          <h3 className="mb-2 text-lg font-bold text-purple-900">Hadiah Pembelian Bundle</h3>
          <p className="text-sm font-semibold text-purple-800">
            {promo.rules.bundle_reward.freebies.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}