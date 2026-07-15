// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/set-state-in-effect */
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; 
// import { 
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
//   PieChart, Pie, Cell, Legend
// } from 'recharts';
// import { BASE_URL } from "../../config/api";

// // Palet warna hijau khas Gycora dari gelap ke terang
// const PIE_COLORS = ['#065f46', '#059669', '#10b981', '#34d399', '#6ee7b7'];

// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const [adminName, setAdminName] = useState("Admin");
  
//   // State untuk mengontrol animasi loading (Skeleton)
//   const [loading, setLoading] = useState(true);
//   const [isDataReady, setIsDataReady] = useState(false);

//   // --- STATE UNTUK DATA DASHBOARD ---
//   const [stats, setStats] = useState<any>({});
//   const [revenueData, setRevenueData] = useState<any[]>([]);
//   const [popularProducts, setPopularProducts] = useState<any[]>([]);

//   useEffect(() => {
//     const userStr = localStorage.getItem("admin_user");
//     const token = localStorage.getItem("admin_token");

//     if (!token || !userStr) {
//       navigate("/admin/login");
//       return;
//     }

//     const user = JSON.parse(userStr);
//     setAdminName(user.first_name);

//     const fetchDashboardData = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/admin/dashboard/master-data`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json"
//           }
//         });

//         if (res.ok) {
//           const data = await res.json();
//           setStats(data.stats || {});
//           setRevenueData(data.revenue || []);
          
//           const formattedPopular = (data.popular || []).map((item: any) => ({
//             name: item.name,
//             value: Number(item.total_sold)
//           }));
//           setPopularProducts(formattedPopular);
          
//           // Memberi sedikit delay estetika agar animasi Skeleton terasa natural
//           setTimeout(() => {
//             setLoading(false);
//             // Trigger state kedua untuk animasi fade-in layout
//             setTimeout(() => setIsDataReady(true), 50); 
//           }, 800);

//         } else if (res.status === 401) {
//           localStorage.removeItem("admin_token");
//           localStorage.removeItem("admin_user");
//           navigate("/admin/login");
//         }
//       } catch (error) {
//         console.error("Gagal mengambil data dashboard:", error);
//         setLoading(false);
//         setIsDataReady(true);
//       }
//     };

//     fetchDashboardData();
//   }, [navigate]);

//   // Format angka ke format Rupiah
//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0,
//     }).format(angka || 0);
//   };

//   const formatRupiahTooltip = (value: any) => [formatRupiah(value), 'Pendapatan'];

//   // =========================================================================
//   // ANIMASI LOADING MODERN (SKELETON)
//   // =========================================================================
//   if (loading) {
//     return (
//       <div className="p-8 pb-20 mx-auto space-y-8 max-w-7xl animate-pulse">
//         {/* Skeleton Header */}
//         <div className="flex flex-col gap-3">
//           <div className="h-8 bg-gray-200 rounded-lg w-44"></div>
//           <div className="h-4 bg-gray-200 rounded-lg w-96"></div>
//         </div>

//         {/* Skeleton Stats Cards */}
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//           {[1, 2, 3, 4].map((i) => (
//             <div key={i} className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
//               <div className="w-32 h-4 mb-4 bg-gray-200 rounded"></div>
//               <div className="w-24 h-8 mb-4 bg-gray-200 rounded"></div>
//               <div className="w-40 h-3 bg-gray-100 rounded"></div>
//             </div>
//           ))}
//         </div>

//         {/* Skeleton Charts */}
//         <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
//           <div className="p-6 bg-white border border-gray-100 shadow-sm lg:col-span-2 rounded-2xl">
//              <div className="w-48 h-6 mb-6 bg-gray-200 rounded"></div>
//              <div className="w-full bg-gray-100 rounded-lg h-72"></div>
//           </div>
//           <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
//              <div className="w-40 h-6 mb-4 bg-gray-200 rounded"></div>
//              <div className="w-24 h-3 mb-6 bg-gray-100 rounded"></div>
//              <div className="w-48 h-48 mx-auto bg-gray-200 rounded-full mt-7"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // =========================================================================
//   // TAMPILAN DASHBOARD ASLI DENGAN ANIMASI FADE-IN MUNCUL BERTAHAP
//   // =========================================================================
//   return (
//     <div className={`p-8 pb-20 mx-auto space-y-8 font-sans max-w-7xl transition-all duration-700 ease-out transform ${isDataReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      
//       {/* HEADER DASHBOARD */}
//       <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
//         <div>
//           <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Dashboard</h1>
//           <p className="mt-1 text-gray-500">Selamat datang kembali, <span className="font-semibold text-gycora">{adminName}</span>. Berikut performa Gycora hari ini.</p>
//         </div>
//       </div>

//       {/* STATISTIK UTAMA */}
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//         {/* Card 1: Pendapatan */}
//         <div className={`relative p-6 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl group transition-all duration-500 delay-100 ${isDataReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
//           <div className="absolute top-0 right-0 p-4 transition-transform transform translate-x-4 -translate-y-4 opacity-10 group-hover:scale-110">
//             <svg className="w-24 h-24 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>
//           </div>
//           <p className="mb-1 text-sm font-semibold tracking-wider text-gray-500 uppercase">Total Pendapatan</p>
//           <h3 className="text-2xl font-extrabold text-gray-900 truncate" title={formatRupiah(stats.total_sales)}>
//             {formatRupiah(stats.total_sales)}
//           </h3>
//           <p className={`flex items-center gap-1 mt-2 text-sm font-medium ${stats.sales_growth >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
//             {stats.sales_growth >= 0 ? (
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
//             ) : (
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" /></svg>
//             )}
//             {stats.sales_growth >= 0 ? '+' : ''}{stats.sales_growth}% dari bulan lalu
//           </p>
//         </div>

//         {/* Card 2: Pesanan / Transaksi */}
//         <div className={`relative p-6 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl group transition-all duration-500 delay-200 ${isDataReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
//           <p className="mb-1 text-sm font-semibold tracking-wider text-gray-500 uppercase">Total Transaksi</p>
//           <h3 className="text-3xl font-extrabold text-gray-900">{stats.total_transactions || 0}</h3>
//           <p className={`flex items-center gap-1 mt-2 text-sm font-medium ${stats.transaction_growth >= 0 ? 'text-amber-500' : 'text-red-500'}`}>
//             {stats.transaction_growth >= 0 ? (
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
//             ) : (
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" /></svg>
//             )}
//             {stats.transaction_growth >= 0 ? '+' : ''}{stats.transaction_growth}% dari bulan lalu
//           </p>
//         </div>

//         {/* Card 3: Katalog Produk */}
//         <div className={`relative p-6 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl group transition-all duration-500 delay-300 ${isDataReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
//           <p className="mb-1 text-sm font-semibold tracking-wider text-gray-500 uppercase">Katalog Produk</p>
//           <h3 className="text-3xl font-extrabold text-gray-900">{stats.total_products || 0}</h3>
//           <p className="flex items-center gap-1 mt-2 text-sm font-medium text-blue-500">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
//             +{stats.new_products_growth || 0} produk baru bulan ini
//           </p>
//         </div>

//         {/* Card 4: Pelanggan Baru */}
//         <div className={`relative p-6 overflow-hidden text-white border shadow-lg bg-gradient-to-br from-gycora to-gycora-dark rounded-2xl border-emerald-700 transition-all duration-500 delay-400 ${isDataReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
//           <p className="mb-1 text-sm font-semibold tracking-wider uppercase text-emerald-100">Total Pelanggan</p>
//           <h3 className="text-3xl font-extrabold">{stats.total_users || 0}</h3>
//           <p className="mt-2 text-sm font-medium text-white">
//             +{stats.new_users_growth || 0} pengguna baru bulan ini!
//           </p>
//         </div>
//       </div>

//       {/* BARIS GRAFIK: BAR CHART & PIE CHART */}
//       <div className={`grid grid-cols-1 gap-8 lg:grid-cols-3 transition-all duration-700 delay-500 ${isDataReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        
//         {/* BAR CHART PENJUALAN (Col-span 2) */}
//         <div className="p-6 bg-white border border-gray-100 shadow-sm lg:col-span-2 rounded-2xl">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-lg font-bold text-gray-900">Tren Pendapatan 6 Bulan Terakhir</h2>
//           </div>
          
//           <div className="w-full h-72">
//             {revenueData.length > 0 ? (
//               <ResponsiveContainer width="100%" height="100%" debounce={300}>
//                 <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
//                   <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
//                   <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} tickFormatter={(val) => `Rp${(val/1000000).toFixed(0)}M`} />
//                   <Tooltip 
//                     cursor={{fill: '#f9fafb'}} 
//                     contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
//                     formatter={formatRupiahTooltip}
//                   />
//                   <Bar dataKey="total" fill="#059669" radius={[4, 4, 0, 0]} maxBarSize={40} />
//                 </BarChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className="flex items-center justify-center w-full h-full text-sm italic text-gray-400">
//                 Belum ada data transaksi dalam 6 bulan terakhir.
//               </div>
//             )}
//           </div>
//         </div>

//         {/* PIE CHART PRODUK POPULER (Col-span 1) */}
//         <div className="flex flex-col p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
//           <h2 className="mb-2 text-lg font-bold text-gray-900">Top Produk Terlaris</h2>
//           <p className="mb-6 text-xs text-gray-500">Berdasarkan volume penjualan historis</p>
          
//           <div className="flex-1 min-h-[250px]">
//             {popularProducts.length > 0 ? (
//               <ResponsiveContainer width="100%" height="100%" debounce={300}>
//                 <PieChart>
//                   <Pie
//                     data={popularProducts}
//                     cx="50%"
//                     cy="45%"
//                     innerRadius={50}
//                     outerRadius={80}
//                     paddingAngle={5}
//                     dataKey="value"
//                     stroke="none"
//                   >
//                     {popularProducts.map((_entry, index) => (
//                       <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip 
//                     contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
//                     formatter={(value: any) => [`${value} Unit`, 'Terjual']}
//                   />
//                   <Legend 
//                     verticalAlign="bottom" 
//                     height={36}
//                     iconType="circle"
//                     iconSize={8}
//                     wrapperStyle={{ fontSize: '11px', color: '#4b5563' }}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className="flex items-center justify-center w-full h-full text-sm italic text-gray-400">
//                 Belum ada data penjualan produk.
//               </div>
//             )}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { BASE_URL } from "../../config/api";
// import Breadcrumb from "./Layout/Breadcrumb"; // Sesuaikan path jika perlu

const PIE_COLORS = ["#1e1e1e", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("Admin");

  // State untuk mengontrol animasi loading (Skeleton)
  const [loading, setLoading] = useState(true);
  const [isDataReady, setIsDataReady] = useState(false);

  // --- STATE UNTUK DATA DASHBOARD ---
  const [stats, setStats] = useState<any>({});
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [dailyAverageData, setDailyAverageData] = useState<any[]>([]);
  const [popularProducts, setPopularProducts] = useState<any[]>([]);
  const [predictedProducts, setPredictedProducts] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);

  // --- STATE UNTUK ADVANCED ANALYTICS ---
  const [returnedProducts, setReturnedProducts] = useState<any[]>([]);
  const [peakHoursData, setPeakHoursData] = useState<any[]>([]);
  const [topAffiliators, setTopAffiliators] = useState<any[]>([]);

  useEffect(() => {
    const userStr = localStorage.getItem("admin_user");
    const token = localStorage.getItem("admin_token");

    if (!token || !userStr) {
      navigate("/admin/login");
      return;
    }

    const user = JSON.parse(userStr);
    setAdminName(user.first_name);

    const fetchDashboardData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/admin/dashboard/master-data`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          
          setStats(data.stats || {});
          
          // Mapping Revenue Data (Line Chart di Recharts)
          setRevenueData(data.revenue || []);

          // Mapping Daily Average Data (Bar Chart di Recharts)
          setDailyAverageData(data.daily || []);

          // Mapping Popular Products (Pie Chart)
          const formattedPopular = (data.popular || []).map((item: any) => ({
            name: item.name,
            value: Number(item.total_sold),
          }));
          setPopularProducts(formattedPopular);

          setPredictedProducts(data.predicted || []);
          setRecentActivities(data.activities || []);

          // Mapping Advanced Analytics
          setReturnedProducts(data.returned || []);
          setPeakHoursData(data.peak_hours || []);
          setTopAffiliators(data.top_affiliators || []);

          setTimeout(() => {
            setLoading(false);
            setTimeout(() => setIsDataReady(true), 50);
          }, 800);
        } else if (res.status === 401) {
          localStorage.removeItem("admin_token");
          localStorage.removeItem("admin_user");
          navigate("/admin/login");
        }
      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
        setLoading(false);
        setIsDataReady(true);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka || 0);
  };

  const formatRupiahTooltip = (value: any) => [formatRupiah(value), "Pendapatan"];
  
  // Custom Y-Axis Formatter agar tidak terlalu panjang (1.000.000 -> 1M, 1.000 -> 1K)
  const yAxisFormatter = (value: number) => {
    if (value >= 1000000) return (value / 1000000).toFixed(1) + "M";
    if (value >= 1000) return (value / 1000).toFixed(0) + "K";
    return value.toString();
  };

  // =========================================================================
  // ANIMASI LOADING MODERN (SKELETON)
  // =========================================================================
  if (loading) {
    return (
      <div className="p-8 pb-20 mx-auto space-y-8 max-w-7xl animate-pulse">
        <div className="flex flex-col gap-3">
          <div className="h-8 bg-gray-200 rounded-lg w-44"></div>
          <div className="h-4 bg-gray-200 rounded-lg w-96"></div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
              <div className="w-32 h-4 mb-4 bg-gray-200 rounded"></div>
              <div className="w-24 h-8 mb-4 bg-gray-200 rounded"></div>
              <div className="w-40 h-3 bg-gray-100 rounded"></div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
            <div className="w-48 h-6 mb-6 bg-gray-200 rounded"></div>
            <div className="w-full bg-gray-100 rounded-lg h-72"></div>
          </div>
          <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
            <div className="w-40 h-6 mb-4 bg-gray-200 rounded"></div>
            <div className="w-24 h-3 mb-6 bg-gray-100 rounded"></div>
            <div className="w-full bg-gray-100 rounded-lg h-72"></div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // TAMPILAN DASHBOARD
  // =========================================================================
  return (
    <div
      className={`p-8 pb-20 mx-auto space-y-8 font-sans max-w-7xl transition-all duration-700 ease-out transform ${
        isDataReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <Breadcrumb />

      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Dashboard
          </h1>
          <p className="mt-1 text-gray-500">
            Selamat datang kembali, <span className="font-semibold text-gycora">{adminName}</span>.
            Berikut performa hari ini.
          </p>
        </div>
      </div>

      {/* 1. STATS CARDS */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Sales */}
        <div className="relative p-6 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
          <p className="mb-1 text-xs font-bold tracking-wider text-gray-400 uppercase">Total Sales</p>
          <p className="text-2xl font-black text-gray-900">{formatRupiah(stats.total_sales)}</p>
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                stats.sales_growth >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {stats.sales_growth >= 0 ? (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              ) : (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>
              )}
              {Math.abs(stats.sales_growth)}%
            </span>
            <span className="text-[10px] text-gray-400">vs last month</span>
          </div>
        </div>

        {/* Active Products */}
        <div className="relative p-6 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
          <p className="mb-1 text-xs font-bold tracking-wider text-gray-400 uppercase">Active Products</p>
          <p className="text-2xl font-black text-gray-900">{stats.total_products}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold text-[10px]">
              +{stats.new_products_growth} new
            </span>
            <span className="text-[10px] text-gray-400">added this month</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="relative p-6 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
          <p className="mb-1 text-xs font-bold tracking-wider text-gray-400 uppercase">Total Orders</p>
          <p className="text-2xl font-black text-gray-900">{stats.total_transactions}</p>
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                stats.transaction_growth >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {stats.transaction_growth >= 0 ? (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              ) : (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>
              )}
              {Math.abs(stats.transaction_growth)}%
            </span>
            <span className="text-[10px] text-gray-400">vs last month</span>
          </div>
        </div>

        {/* Registered Users */}
        <div className="relative p-6 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
          <p className="mb-1 text-xs font-bold tracking-wider text-gray-400 uppercase">Registered Users</p>
          <p className="text-2xl font-black text-gray-900">{stats.total_users}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-bold text-[10px]">
              +{stats.new_users_growth} joined
            </span>
            <span className="text-[10px] text-gray-400">this month</span>
          </div>
        </div>
      </div>

      {/* 2. REVENUE CHARTS */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
          <h3 className="mb-6 font-bold text-gray-800">Monthly Revenue Overview</h3>
          <div className="h-[300px]">
            {revenueData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} tickFormatter={yAxisFormatter} />
                  <Tooltip cursor={{ fill: "#f9fafb" }} formatter={formatRupiahTooltip} contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }} />
                  <Line type="monotone" dataKey="total" stroke="#000" strokeWidth={3} dot={{ r: 4, fill: "#000", strokeWidth: 0 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center w-full h-full text-sm italic text-gray-400">Belum ada data pendapatan.</div>
            )}
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="font-bold text-gray-800">Average Daily Revenue</h3>
              <p className="mt-1 text-xs text-gray-500">Historically, which day generates the most sales?</p>
            </div>
          </div>
          <div className="h-[300px]">
             {dailyAverageData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyAverageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} tickFormatter={yAxisFormatter} />
                    <Tooltip cursor={{ fill: "#f9fafb" }} formatter={formatRupiahTooltip} contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }} />
                    <Bar dataKey="average" fill="#3b82f6" radius={[6, 6, 0, 0]} maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center w-full h-full text-sm italic text-gray-400">Belum ada data harian.</div>
              )}
          </div>
        </div>
      </div>

      {/* 3. ACTIVITIES, AI PREDICTION, BESTSELLERS */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Recent Live Orders */}
        <div className="flex flex-col p-6 bg-white border border-gray-100 shadow-sm lg:col-span-1 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800">Recent Live Orders</h3>
            <Link to="/admin/transactions" className="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-widest">
              View All
            </Link>
          </div>
          <div className="flex-grow pr-2 overflow-y-auto max-h-[350px] custom-scrollbar">
            {recentActivities.length > 0 ? (
              <div className="space-y-4">
                {recentActivities.map((act) => (
                  <div key={act.id} className="flex items-center justify-between pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                    <div>
                      <p className="text-xs font-bold text-gray-900">{act.customer}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] text-gray-400 font-mono">{act.order_id}</span>
                        <span className="text-[8px] text-gray-300">•</span>
                        <span className="text-[9px] text-gray-400">{act.time_ago}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">{formatRupiah(act.amount)}</p>
                      <span
                        className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest inline-block mt-1 ${
                          act.status === "pending" || act.status === "awaiting_payment"
                            ? "text-amber-500 bg-amber-50"
                            : act.status === "processing"
                            ? "text-blue-500 bg-blue-50"
                            : act.status === "completed"
                            ? "text-green-600 bg-green-50"
                            : "text-red-500 bg-red-50"
                        }`}
                      >
                        {act.status.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-sm italic text-gray-400">
                No recent activities.
              </div>
            )}
          </div>
        </div>

        {/* AI Sales Prediction */}
        <div className="flex flex-col p-6 bg-white border border-gray-100 shadow-sm lg:col-span-2 rounded-2xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                AI Sales Prediction (C4.5)
              </h3>
              <p className="mt-1 text-xs text-gray-500">Predicting future bestsellers based on categories & pricing.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 pr-2 overflow-y-auto max-h-[350px] custom-scrollbar">
            {predictedProducts.length > 0 ? (
              predictedProducts.map((item, index) => (
                <div key={item.id} className="flex flex-col items-start gap-4 p-4 transition bg-white border border-gray-100 md:flex-row md:items-center rounded-xl hover:bg-gray-50">
                  <div className="items-center justify-center hidden w-8 h-8 text-sm font-bold text-gray-400 bg-gray-100 rounded-full md:flex shrink-0">
                    #{index + 1}
                  </div>
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="object-cover w-16 h-16 border border-gray-100 rounded-lg shadow-sm shrink-0" />
                  ) : (
                    <div className="flex items-center justify-center w-16 h-16 bg-gray-100 border border-gray-200 rounded-lg shadow-sm shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="text-sm font-bold text-gray-900 truncate">{item.name}</p>
                      <span className={`${item.color} font-black text-[9px] uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded-full shrink-0`}>
                        {item.label}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-1 text-[10px] text-gray-600">
                      <span className="font-bold tracking-widest text-gray-400 uppercase shrink-0 mt-0.5">Factors:</span>
                      <span className="italic text-gray-500 break-words line-clamp-2">{item.reasons || "No specific factors"}</span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center w-full mt-3 shrink-0 md:w-32 md:mt-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Match</span>
                      <span className="text-xs font-black text-purple-700">{item.score}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full">
                      <div className="h-1.5 transition-all duration-1000 rounded-full bg-gradient-to-r from-purple-400 to-purple-600" style={{ width: `${item.score}%` }}></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-sm italic text-center text-gray-400">Not enough historical data.</div>
            )}
          </div>
        </div>

        {/* Historical Best Sellers */}
        <div className="flex flex-col p-6 bg-white border border-gray-100 shadow-sm lg:col-span-1 rounded-2xl">
          <h3 className="mb-2 font-bold text-center text-gray-800 md:text-left">Historical Best Sellers</h3>
          <p className="mb-6 text-xs text-center text-gray-500 md:text-left">Top 5 items</p>
          <div className="flex items-center justify-center flex-grow h-[250px]">
            {popularProducts.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={popularProducts}
                    cx="50%"
                    cy="45%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {popularProducts.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} formatter={(value: any) => [`${value} Unit`, 'Terjual']} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', color: '#4b5563' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-sm italic text-gray-400">No data available</div>
            )}
          </div>
        </div>
      </div>

      {/* ======================================================= */}
      {/* 4. ADVANCED ANALYTICS (Retur, Jam Puncak, Top Users)      */}
      {/* ======================================================= */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Most Returned Products */}
        <div className="flex flex-col p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
          <h3 className="mb-1 font-bold text-gray-800">Most Returned Products</h3>
          <p className="mb-6 text-xs text-gray-500">Items with highest issue/refund rates.</p>

          <div className="flex-grow pr-2 overflow-y-auto max-h-[300px] custom-scrollbar">
            {returnedProducts.length > 0 ? (
              <div className="space-y-4">
                {returnedProducts.map((prod) => (
                  <div key={prod.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {prod.image ? (
                        <img src={prod.image} alt={prod.name} className="object-cover w-10 h-10 border border-gray-100 rounded shadow-sm" />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 border border-gray-200 rounded"></div>
                      )}
                      <p className="w-32 text-xs font-bold text-gray-800 truncate" title={prod.name}>{prod.name}</p>
                    </div>
                    <span className="px-2 py-1 text-[10px] font-bold text-red-600 rounded bg-red-50">
                      {prod.total_returned}x Returned
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-sm italic text-gray-400">No return data available.</div>
            )}
          </div>
        </div>

        {/* Peak Order Hours */}
        <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
          <h3 className="mb-1 font-bold text-gray-800">Peak Order Hours</h3>
          <p className="mb-6 text-xs text-gray-500">When do customers usually checkout?</p>

          <div className="h-[250px]">
            {peakHoursData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={peakHoursData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 10 }} dy={10} interval="preserveStartEnd" />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 10 }} />
                  <Tooltip cursor={{ fill: "#f9fafb" }} contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }} />
                  {/* Fill area chart (menyerupai chart Vue dengan filler) */}
                  <Line type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={2} dot={false} activeDot={{ r: 6 }} fill="rgba(139, 92, 246, 0.2)" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center w-full h-full text-sm italic text-gray-400">No hourly data.</div>
            )}
          </div>
        </div>

        {/* Top Customers / Affiliates */}
        <div className="flex flex-col p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
          <h3 className="mb-1 font-bold text-gray-800">Top Customers & Affiliates</h3>
          <p className="mb-6 text-xs text-gray-500">Users generating the most revenue.</p>

          <div className="flex-grow pr-2 overflow-y-auto max-h-[300px] custom-scrollbar">
            {topAffiliators.length > 0 ? (
              <div className="space-y-4">
                {topAffiliators.map((user, idx) => (
                  <div key={user.email} className="flex items-center justify-between pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-[10px] font-black text-indigo-700 bg-indigo-100 rounded-full">
                        #{idx + 1}
                      </div>
                      <div>
                        <p className="w-24 text-xs font-bold text-gray-900 truncate">{user.name}</p>
                        <span className="text-[9px] text-gray-400 capitalize">{user.usertype}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-green-600">{formatRupiah(user.total_generated)}</p>
                      <p className="mt-0.5 font-mono text-[9px] text-gray-400">{user.total_orders} Orders</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-sm italic text-gray-400">No user data available.</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}