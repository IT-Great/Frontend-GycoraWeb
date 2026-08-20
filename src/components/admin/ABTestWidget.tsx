import { useState, useEffect } from "react";
import { BASE_URL } from "../../config/api";

interface ABTestData {
  variant: string;
  total_checkouts: number;
  total_revenue: string;
  conversion_rate?: number; // Opsional jika mau hitung konversi dari impresi
}

export default function ABTestWidget() {
  const [data, setData] = useState<ABTestData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        const res = await fetch(`${BASE_URL}/api/admin/analytics/ab-test`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const result = await res.json();
          setData(result);
        }
      } catch (error) {
        console.error("Gagal memuat data A/B Test", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(amount));
  };

  if (loading) return <div className="h-48 p-6 bg-white border border-gray-100 shadow-sm rounded-xl animate-pulse">Memuat Analitik A/B Test...</div>;

  const variantA = data.find(v => v.variant === 'A') || { variant: 'A', total_checkouts: 0, total_revenue: "0" };
  const variantB = data.find(v => v.variant === 'B') || { variant: 'B', total_checkouts: 0, total_revenue: "0" };

  const totalRevenueA = Number(variantA.total_revenue);
  const totalRevenueB = Number(variantB.total_revenue);
  
  let winner = "Belum Cukup Data";
  let winnerColor = "text-gray-500";
  if (totalRevenueA > totalRevenueB && totalRevenueA > 0) {
      winner = "Varian A (Hitam) Lebih Unggul";
      winnerColor = "text-emerald-600";
  } else if (totalRevenueB > totalRevenueA && totalRevenueB > 0) {
      winner = "Varian B (Merah) Lebih Unggul";
      winnerColor = "text-red-600";
  } else if (totalRevenueA === totalRevenueB && totalRevenueA > 0) {
      winner = "Seimbang (Draw)";
      winnerColor = "text-blue-600";
  }

  return (
    <div className="p-6 font-sans bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-extrabold text-gray-900">🔬 A/B Testing: Tombol Checkout</h3>
          <p className="mt-1 text-xs text-gray-500">Eksperimen warna tombol checkout terhadap nilai pendapatan.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Varian A (Klasik/Hitam) */}
        <div className="flex flex-col justify-between p-4 border border-gray-200 rounded-xl bg-gray-50">
           <div>
               <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2">Varian A (Hitam)</p>
               <h4 className="text-xl font-black text-gray-900">{formatCurrency(variantA.total_revenue)}</h4>
           </div>
           <p className="px-2 py-1 mt-2 text-xs font-medium text-gray-500 bg-white border border-gray-100 rounded shadow-sm w-fit">
             {variantA.total_checkouts} Transaksi Sukses
           </p>
        </div>

        {/* Varian B (Merah) */}
        <div className="flex flex-col justify-between p-4 border border-red-100 rounded-xl bg-red-50">
           <div>
               <p className="text-[10px] font-bold tracking-widest text-red-400 uppercase mb-2">Varian B (Merah)</p>
               <h4 className="text-xl font-black text-red-900">{formatCurrency(variantB.total_revenue)}</h4>
           </div>
           <p className="px-2 py-1 mt-2 text-xs font-medium text-red-700 bg-white border border-red-100 rounded shadow-sm w-fit">
             {variantB.total_checkouts} Transaksi Sukses
           </p>
        </div>
      </div>
      
      <div className="pt-3 text-center border-t border-gray-100">
          <p className="mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase">Status Eksperimen</p>
          <p className={`text-sm font-black uppercase ${winnerColor}`}>{winner}</p>
      </div>
    </div>
  );
}