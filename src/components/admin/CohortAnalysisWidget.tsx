import { useState, useEffect } from "react";
import { BASE_URL } from "../../config/api";

interface CohortData {
  cohort_month: string;
  total_users: number;
  retention_rates: (number | null)[];
}

interface CohortResponse {
  max_months: number;
  data: CohortData[];
}

export default function CohortAnalysisWidget() {
  const [cohorts, setCohorts] = useState<CohortResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCohortData = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        const res = await fetch(`${BASE_URL}/api/admin/analytics/cohort`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setCohorts(data);
        }
      } catch (error) {
        console.error("Gagal memuat Cohort Analysis", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCohortData();
  }, []);

  // Fungsi untuk mendapatkan warna Heatmap dinamis (Semakin mendekati 100%, semakin hijau pekat)
  const getHeatmapColor = (percentage: number | null, isMonthZero: boolean) => {
    if (percentage === null) return "bg-gray-50 text-transparent"; // Waktu belum terjadi
    if (isMonthZero) return "bg-emerald-900 text-white font-bold"; // Bulan ke-0 (pasti 100%)
    
    // Kalkulasi transparansi warna hijau berdasarkan persentase
    const alpha = Math.max(0.1, percentage / 100 + 0.1); 
    
    // Menggunakan warna khas Gycora (#006A4E / rgb 0, 106, 78)
    return {
      backgroundColor: `rgba(0, 106, 78, ${alpha})`,
      color: percentage > 40 ? "white" : "#0f172a",
      fontWeight: percentage > 40 ? "bold" : "normal"
    };
  };

  if (loading) return <div className="flex items-center justify-center p-6 text-gray-500 bg-white border border-gray-100 shadow-sm rounded-xl animate-pulse h-80">Menghitung Data Retensi Pelanggan...</div>;
  if (!cohorts || cohorts.data.length === 0) return null;

  const monthHeaders = Array.from({ length: cohorts.max_months + 1 }, (_, i) => i);

  return (
    <div className="p-6 overflow-hidden font-sans bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="mb-6">
        <h3 className="text-lg font-extrabold text-gray-900">📊 Cohort Analysis (Customer Retention)</h3>
        <p className="mt-1 text-xs text-gray-500">Mengukur seberapa loyal pelanggan kembali berbelanja di bulan-bulan berikutnya setelah transaksi pertama mereka.</p>
      </div>

      <div className="pb-4 overflow-x-auto custom-scrollbar">
        <table className="w-full text-sm text-left border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th className="py-3 px-4 font-bold text-gray-600 bg-gray-50 border-b border-r border-gray-200 sticky left-0 z-10 whitespace-nowrap min-w-[120px]">
                Kohor (Bulan)
              </th>
              <th className="px-4 py-3 font-bold text-center text-gray-600 border-b border-r border-gray-200 bg-gray-50 whitespace-nowrap">
                Pelanggan Baru
              </th>
              {monthHeaders.map(month => (
                <th key={month} className="px-4 py-3 font-bold text-center text-gray-600 border-b border-gray-200 bg-gray-50 whitespace-nowrap">
                  Bulan {month}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cohorts.data.map((row, idx) => (
              <tr key={idx} className="transition-colors border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-bold text-gray-900 border-r border-gray-100 bg-white sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                  {row.cohort_month}
                </td>
                <td className="py-3 px-4 text-center font-bold text-[#006A4E] border-r border-gray-100 bg-white">
                  {row.total_users}
                </td>
                {monthHeaders.map(monthOffset => {
                  const percentage = row.retention_rates[monthOffset];
                  const isMonthZero = monthOffset === 0;
                  const styleProps = getHeatmapColor(percentage, isMonthZero);

                  // 👇 PERBAIKAN: Menggabungkan class bawaan dengan class dari getHeatmapColor (jika string)
                  const baseClasses = "px-4 py-3 text-center transition-all border-l border-white cursor-default hover:brightness-110";
                  const finalClassName = typeof styleProps === 'string' ? `${baseClasses} ${styleProps}` : baseClasses;

                  return (
                    <td 
                      key={monthOffset} 
                      className={finalClassName}
                      style={typeof styleProps === 'object' ? styleProps : undefined}
                      title={percentage !== null ? `${percentage}% pelanggan dari ${row.cohort_month} belanja lagi di Bulan ke-${monthOffset}` : "Belum ada data"}
                    >
                      {percentage !== null ? `${percentage}%` : ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-end gap-2 text-[10px] text-gray-500">
        <span>Rendah</span>
        <div className="w-4 h-4 rounded bg-emerald-100 opacity-30"></div>
        <div className="w-4 h-4 rounded bg-emerald-500 opacity-60"></div>
        <div className="w-4 h-4 rounded bg-emerald-900"></div>
        <span>Tinggi</span>
      </div>
    </div>
  );
}