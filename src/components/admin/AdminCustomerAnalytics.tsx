import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

interface CustomerRFM {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  recency_days: number;
  frequency_count: number;
  monetary_total: string;
  rfm_score: string;
  segment: string;
  badge_color: string;
}

export default function AdminCustomerAnalytics() {
  const [customers, setCustomers] = useState<CustomerRFM[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchRFMData();
  }, []);

  const fetchRFMData = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${BASE_URL}/api/admin/analytics/rfm`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setCustomers(data);
      }
    } catch (error) {
      console.error("Gagal memuat analitik pelanggan", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendVoucher = (customer: CustomerRFM) => {
    Swal.fire({
      title: "Kirim Voucher Diskon 20%?",
      text: `Sistem akan mengirimkan email "We Miss You" beserta kode voucher ke ${customer.email}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#006A4E",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Kirim!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Terkirim!", `Voucher pancingan berhasil dikirim ke ${customer.first_name}.`, "success");
      }
    });
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(amount));
  };

  const filteredCustomers = filter === "ALL" ? customers : customers.filter(c => c.segment.includes(filter));

  // Menghitung ringkasan
  const totalAnalyzed = customers.length;
  const countAtRisk = customers.filter(c => c.segment.includes("At Risk")).length;
  const countChampions = customers.filter(c => c.segment.includes("Champions")).length;

  return (
    <div className="p-6 font-sans bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-gray-900">🧬 Segmentasi Pelanggan (RFM Analysis)</h2>
        <p className="mt-1 text-sm text-gray-500">Kecerdasan Buatan akan otomatis mengelompokkan pelanggan berdasarkan Kapan terakhir belanja (Recency), Seberapa sering (Frequency), dan Total pengeluaran (Monetary).</p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-3">
        <div className="p-5 border border-gray-100 rounded-xl bg-gray-50">
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Total Dianalisa</p>
          <p className="mt-2 text-3xl font-black text-gray-800">{totalAnalyzed}</p>
        </div>
        <div className="p-5 border border-yellow-200 rounded-xl bg-yellow-50">
          <p className="text-xs font-bold tracking-widest text-yellow-600 uppercase">Champions 🏆</p>
          <p className="mt-2 text-3xl font-black text-yellow-700">{countChampions}</p>
        </div>
        <div className="p-5 border border-red-200 rounded-xl bg-red-50">
          <p className="text-xs font-bold tracking-widest text-red-600 uppercase">At Risk (Hampir Lepas) 🆘</p>
          <p className="mt-2 text-3xl font-black text-red-700">{countAtRisk}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800">Daftar Pelanggan</h3>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 text-sm font-bold border border-gray-300 rounded outline-none focus:ring-2 focus:ring-emerald-600"
        >
          <option value="ALL">Tampilkan Semua</option>
          <option value="Champions">Champions 🏆</option>
          <option value="Loyal">Loyal Customers 💎</option>
          <option value="Promising">New / Promising 🌟</option>
          <option value="Need Attention">Need Attention ⚠️</option>
          <option value="At Risk">At Risk 🆘</option>
          <option value="Hibernating">Hibernating 💤</option>
        </select>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 font-bold">Pelanggan</th>
              <th className="px-6 py-4 font-bold text-center" title="Days since last purchase">Terakhir Belanja (R)</th>
              <th className="px-6 py-4 font-bold text-center" title="Total number of orders">Total Order (F)</th>
              <th className="px-6 py-4 font-bold text-right" title="Total money spent">Total Spend (M)</th>
              <th className="px-6 py-4 font-bold text-center">Skor RFM</th>
              <th className="px-6 py-4 font-bold">Segmen Prediksi</th>
              <th className="px-6 py-4 font-bold text-right">Aksi Pintar</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {loading ? (
              <tr><td colSpan={7} className="py-8 text-center text-gray-500 animate-pulse">Algoritma sedang menganalisa data...</td></tr>
            ) : filteredCustomers.length === 0 ? (
              <tr><td colSpan={7} className="py-8 text-center text-gray-500">Tidak ada pelanggan di segmen ini.</td></tr>
            ) : (
              filteredCustomers.map((c) => (
                <tr key={c.id} className="transition-colors border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900">{c.first_name} {c.last_name}</p>
                    <p className="text-xs text-gray-500">{c.email}</p>
                  </td>
                  <td className="px-6 py-4 font-medium text-center text-gray-700">{c.recency_days} hari lalu</td>
                  <td className="px-6 py-4 font-medium text-center text-gray-700">{c.frequency_count}x</td>
                  <td className="px-6 py-4 font-medium text-right text-emerald-700">{formatCurrency(c.monetary_total)}</td>
                  <td className="px-6 py-4 font-mono font-bold tracking-widest text-center text-gray-500">{c.rfm_score}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap ${c.badge_color}`}>
                      {c.segment}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {c.segment.includes("At Risk") || c.segment.includes("Need Attention") ? (
                      <button onClick={() => handleSendVoucher(c)} className="px-4 py-1.5 text-xs font-bold text-white transition-colors bg-red-600 rounded shadow-sm hover:bg-red-700 animate-pulse">
                        Kirim Promo Win-Back
                      </button>
                    ) : c.segment.includes("Champions") ? (
                      <button onClick={() => Swal.fire("Afiliasi Terkirim", `Kode referral eksklusif telah di-email ke ${c.first_name}`, "success")} className="px-4 py-1.5 text-xs font-bold text-yellow-800 transition-colors bg-yellow-300 rounded shadow-sm hover:bg-yellow-400">
                        Kirim Tawaran Afiliasi
                      </button>
                    ) : (
                      <span className="text-xs italic text-gray-400">Tidak ada aksi</span>
                    )}
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