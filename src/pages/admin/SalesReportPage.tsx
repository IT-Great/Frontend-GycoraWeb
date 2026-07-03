// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useMemo } from "react";
// import html2pdf from "html2pdf.js";
// import * as XLSX from "xlsx";
// import { BASE_URL } from "../../config/api";

// export default function SalesReportPage() {
//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   // --- STATE ---
//   const [allReportData, setAllReportData] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);

//   const [filters, setFilters] = useState({
//     year: currentYear,
//     month: new Date().getMonth() + 1,
//     search: "",
//   });

//   // --- FORMATTING HELPERS ---
//   const formatPrice = (v: number) =>
//     new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(v || 0);

//   // --- FETCH DATA ---
//   const fetchReport = async () => {
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem("admin_token");

//       // Susun Query Parameter
//       const queryParams = new URLSearchParams();
//       if (filters.month) queryParams.append("month", filters.month.toString());
//       if (filters.year) queryParams.append("year", filters.year.toString());
//       if (filters.search) queryParams.append("search", filters.search);

//       const res = await fetch(
//         `${BASE_URL}/api/admin/sales-report?${queryParams.toString()}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );

//       if (!res.ok) throw new Error("Gagal mengambil laporan");
//       const jsonRes = await res.json();

//       setAllReportData(jsonRes.data || []);
//       setCurrentPage(1);
//     } catch (error) {
//       console.error("Fetch report failed", error);
//     } finally {
//       setTimeout(() => {
//         setIsLoading(false);
//       }, 500);
//     }
//   };

//   // Efek Mounting Awal
//   useEffect(() => {
//     fetchReport();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Efek Debounce untuk Search & Otomatis Fetch saat Items Per Page diganti
//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       fetchReport();
//     }, 600);

//     return () => clearTimeout(delayDebounceFn);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [filters.search]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [itemsPerPage]);

//   // --- GLOBAL SUMMARY CALCULATIONS ---
//   const { grandTotalRevenue, totalUnitsSold, bestSellerName } = useMemo(() => {
//     if (allReportData.length > 0) {
//       const rev = allReportData.reduce(
//         (acc, item) => acc + parseFloat(item.total_revenue),
//         0,
//       );
//       const units = allReportData.reduce(
//         (acc, item) => acc + parseInt(item.total_sold),
//         0,
//       );
//       // Asumsi data dari backend sudah diurutkan berdasarkan penjualan tertinggi
//       const bestSeller = allReportData[0].name;
//       return {
//         grandTotalRevenue: rev,
//         totalUnitsSold: units,
//         bestSellerName: bestSeller,
//       };
//     }
//     return { grandTotalRevenue: 0, totalUnitsSold: 0, bestSellerName: "-" };
//   }, [allReportData]);

//   // --- PAGINATION LOGIC ---
//   const totalItems = allReportData.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   const paginatedData = useMemo(() => {
//     const start = (currentPage - 1) * itemsPerPage;
//     const end = start + itemsPerPage;
//     return allReportData.slice(start, end);
//   }, [allReportData, currentPage, itemsPerPage]);

//   const showingStart =
//     totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
//   const showingEnd = Math.min(currentPage * itemsPerPage, totalItems);

//   const visiblePages = useMemo(() => {
//     const maxVisible = 7;
//     if (totalPages <= maxVisible)
//       return Array.from({ length: totalPages }, (_, i) => i + 1);
//     if (currentPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
//     if (currentPage >= totalPages - 3)
//       return [
//         1,
//         "...",
//         totalPages - 4,
//         totalPages - 3,
//         totalPages - 2,
//         totalPages - 1,
//         totalPages,
//       ];
//     return [
//       1,
//       "...",
//       currentPage - 1,
//       currentPage,
//       currentPage + 1,
//       "...",
//       totalPages,
//     ];
//   }, [currentPage, totalPages]);

//   const changePage = (page: number) => {
//     if (page >= 1 && page <= totalPages) setCurrentPage(page);
//   };

//   // --- EXPORTS ---
//   const exportToPDF = () => {
//     const element = document.getElementById("exportable-table");
//     if (!element) return;

//     const headers = element.querySelectorAll(".export-header");
//     headers.forEach((h) => {
//       h.classList.remove("hidden");
//       h.classList.add("block");
//     });

//     const monthName = filters.month ? months[filters.month - 1] : "All";
//     const fileName = `Sales_Report_${filters.year}_${monthName}.pdf`;

//     const opt = {
//       margin: 0.5,
//       filename: fileName,
//       image: { type: "jpeg" as const, quality: 0.98 },
//       html2canvas: { scale: 2, useCORS: true },
//       jsPDF: {
//         unit: "in" as const,
//         format: "letter" as const,
//         orientation: "portrait" as const,
//       },
//     };

//     html2pdf()
//       .set(opt)
//       .from(element)
//       .save()
//       .then(() => {
//         headers.forEach((h) => {
//           h.classList.add("hidden");
//           h.classList.remove("block");
//         });
//       });
//   };

//   //   const exportToExcel = () => {
//   //     const excelData = allReportData.map((item, index) => ({
//   //       No: index + 1,
//   //       "Product Code": item.code,
//   //       "Product Name": item.name,
//   //       Category: item.category_name,
//   //       "Units Sold": parseInt(item.total_sold),
//   //       "Total Revenue (IDR)": parseFloat(item.total_revenue),
//   //     }));

//   //     excelData.push({
//   //       No: "",
//   //       "Product Code": "",
//   //       "Product Name": "",
//   //       Category: "GRAND TOTAL",
//   //       "Units Sold": totalUnitsSold as any, // Type assertion agar sheet excel jalan
//   //       "Total Revenue (IDR)": grandTotalRevenue as any,
//   //     });

//   //     const worksheet = XLSX.utils.json_to_sheet(excelData);
//   //     const workbook = XLSX.utils.book_new();

//   //     XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Data");

//   //     const monthName = filters.month ? months[filters.month - 1] : "All";
//   //     const fileName = `Sales_Report_${filters.year}_${monthName}.xlsx`;

//   //     XLSX.writeFile(workbook, fileName);
//   //   };

//   const exportToExcel = () => {
//     // Tambahkan tipe <any[]> secara eksplisit di sini
//     const excelData: any[] = allReportData.map((item, index) => ({
//       No: index + 1,
//       "Product Code": item.sku,
//       "Product Name": item.name,
//       Category: item.category_name,
//       "Units Sold": parseInt(item.total_sold),
//       "Total Revenue (IDR)": parseFloat(item.total_revenue),
//     }));

//     excelData.push({
//       No: "", // Sekarang TypeScript tidak akan protes karena kita sudah menggunakan any[]
//       "Product Code": "",
//       "Product Name": "",
//       Category: "GRAND TOTAL",
//       "Units Sold": totalUnitsSold, // Tidak perlu lagi as any
//       "Total Revenue (IDR)": grandTotalRevenue, // Tidak perlu lagi as any
//     });

//     const worksheet = XLSX.utils.json_to_sheet(excelData);
//     const workbook = XLSX.utils.book_new();

//     XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Data");

//     const monthName = filters.month ? months[filters.month - 1] : "All";
//     const fileName = `Sales_Report_${filters.year}_${monthName}.xlsx`;

//     XLSX.writeFile(workbook, fileName);
//   };

//   // --- RENDER ---
//   return (
//     <div className="p-8 pb-10 space-y-8 font-sans animate-fade-in">
//       {/* HEADER SECTION & FILTERS */}
//       <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
//         <h1 className="mb-6 text-2xl font-bold text-gray-900">
//           Laporan Penjualan
//         </h1>
//         <div className="flex flex-wrap items-end gap-4">
//           <div className="w-full sm:w-auto">
//             <label className="block mb-1 text-xs font-bold tracking-wide text-gray-500 uppercase">
//               Tahun
//             </label>
//             <select
//               value={filters.year}
//               onChange={(e) =>
//                 setFilters({ ...filters, year: Number(e.target.value) })
//               }
//               className="w-full px-4 py-2 font-bold transition border border-gray-200 outline-none cursor-pointer bg-gray-50 rounded-xl sm:w-32 focus:ring-2 focus:ring-gycora"
//             >
//               {years.map((y) => (
//                 <option key={y} value={y}>
//                   {y}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="w-full sm:w-auto">
//             <label className="block mb-1 text-xs font-bold tracking-wide text-gray-500 uppercase">
//               Bulan
//             </label>
//             <select
//               value={filters.month}
//               onChange={(e) =>
//                 setFilters({ ...filters, month: Number(e.target.value) })
//               }
//               className="w-full px-4 py-2 transition border border-gray-200 outline-none cursor-pointer bg-gray-50 rounded-xl sm:w-40 focus:ring-2 focus:ring-gycora"
//             >
//               <option value="">Semua Bulan</option>
//               {months.map((m, i) => (
//                 <option key={i} value={i + 1}>
//                   {m}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex-grow w-full sm:w-auto">
//             <label className="block mb-1 text-xs font-bold tracking-wide text-gray-500 uppercase">
//               Cari Produk
//             </label>
//             <div className="relative">
//               <input
//                 value={filters.search}
//                 onChange={(e) =>
//                   setFilters({ ...filters, search: e.target.value })
//                 }
//                 type="text"
//                 placeholder="Cari berdasarkan nama atau SKU..."
//                 className="w-full py-2 pl-10 pr-4 transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora"
//               />
//               <svg
//                 className="top-2.5 left-3 absolute w-5 h-5 text-gray-400"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </div>
//           </div>

//           <button
//             onClick={fetchReport}
//             className="bg-gray-900 hover:bg-black px-6 py-2 rounded-xl font-bold text-white transition h-[42px] shadow-sm tracking-widest text-xs uppercase"
//           >
//             Terapkan
//           </button>
//         </div>
//       </div>

//       {/* SUMMARY CARDS */}
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//         <div className="relative p-6 overflow-hidden border shadow-sm border-emerald-100 bg-gradient-to-br from-emerald-50 to-white rounded-2xl">
//           <p className="mb-1 text-xs font-bold tracking-widest uppercase text-emerald-600">
//             Total Pendapatan
//           </p>
//           {!isLoading ? (
//             <p className="text-3xl font-black text-emerald-900">
//               {formatPrice(grandTotalRevenue)}
//             </p>
//           ) : (
//             <div className="w-3/4 h-8 mt-1 rounded bg-emerald-200 animate-pulse"></div>
//           )}
//         </div>

//         <div className="relative p-6 overflow-hidden border border-blue-100 shadow-sm bg-gradient-to-br from-blue-50 to-white rounded-2xl">
//           <p className="mb-1 text-xs font-bold tracking-widest text-blue-600 uppercase">
//             Unit Terjual
//           </p>
//           {!isLoading ? (
//             <p className="text-3xl font-black text-blue-900">
//               {totalUnitsSold} pcs
//             </p>
//           ) : (
//             <div className="w-1/2 h-8 mt-1 bg-blue-200 rounded animate-pulse"></div>
//           )}
//         </div>

//         <div className="relative p-6 overflow-hidden border border-purple-100 shadow-sm bg-gradient-to-br from-purple-50 to-white rounded-2xl">
//           <p className="mb-1 text-xs font-bold tracking-widest text-purple-600 uppercase">
//             Produk Terlaris
//           </p>
//           {!isLoading ? (
//             <p className="text-xl font-black text-purple-900 truncate">
//               {bestSellerName}
//             </p>
//           ) : (
//             <div className="w-3/4 h-6 mt-2 bg-purple-200 rounded animate-pulse"></div>
//           )}
//         </div>
//       </div>

//       {/* MAIN TABLE SECTION */}
//       <div className="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[400px]">
//         <div className="flex flex-col items-start justify-between gap-4 mb-6 md:flex-row md:items-center">
//           <h2 className="text-xl font-bold text-gray-800">Performa Produk</h2>

//           <div className="flex items-center gap-4">
//             <div className="flex gap-2">
//               <button
//                 onClick={exportToPDF}
//                 disabled={allReportData.length === 0 || isLoading}
//                 className="flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest text-red-600 uppercase transition bg-red-50 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-4 h-4"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                   />
//                 </svg>
//                 PDF
//               </button>
//               <button
//                 onClick={exportToExcel}
//                 disabled={allReportData.length === 0 || isLoading}
//                 className="flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest uppercase transition text-emerald-600 bg-emerald-50 hover:bg-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-4 h-4"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                   />
//                 </svg>
//                 Excel
//               </button>
//             </div>

//             <div className="hidden w-px h-6 bg-gray-200 md:block"></div>

//             <div className="flex items-center gap-2">
//               <span className="text-xs font-bold text-gray-500 uppercase">
//                 Show:
//               </span>
//               <select
//                 value={itemsPerPage}
//                 onChange={(e) => setItemsPerPage(Number(e.target.value))}
//                 className="px-2 py-1 text-sm border border-gray-200 rounded-lg outline-none cursor-pointer bg-gray-50 focus:border-gycora"
//               >
//                 <option value={5}>5</option>
//                 <option value={10}>10</option>
//                 <option value={20}>20</option>
//                 <option value={50}>50</option>
//                 <option value={100}>100</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         <div className="overflow-x-auto" id="exportable-table">
//           <div className="hidden mb-4 export-header">
//             <h2 className="text-2xl font-bold text-black">Sales Report</h2>
//             <p className="text-sm text-gray-500">
//               Period: {filters.month ? months[filters.month - 1] : "All Months"}{" "}
//               {filters.year}
//             </p>
//           </div>

//           <table className="w-full text-left bg-white border-collapse">
//             <thead>
//               <tr className="text-xs tracking-widest text-gray-400 uppercase border-b border-gray-100">
//                 <th className="pb-4 pl-2 font-medium">Informasi Produk</th>
//                 <th className="pb-4 font-medium">Kategori</th>
//                 <th className="pb-4 font-medium text-right">Unit Terjual</th>
//                 <th className="pb-4 pr-2 font-medium text-right">Pendapatan</th>
//               </tr>
//             </thead>

//             {isLoading ? (
//               <tbody>
//                 {Array.from({
//                   length: itemsPerPage > 10 ? 10 : itemsPerPage,
//                 }).map((_, i) => (
//                   <tr key={`skel-${i}`} className="border-b border-gray-50">
//                     <td className="py-4 pl-2">
//                       <div className="flex items-center gap-4">
//                         <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse shrink-0"></div>
//                         <div className="space-y-2">
//                           <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
//                           <div className="w-20 h-3 bg-gray-100 rounded animate-pulse"></div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="py-4">
//                       <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
//                     </td>
//                     <td className="py-4">
//                       <div className="w-12 h-4 ml-auto bg-gray-200 rounded animate-pulse"></div>
//                     </td>
//                     <td className="py-4 pr-2">
//                       <div className="w-24 h-4 ml-auto bg-gray-200 rounded animate-pulse"></div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             ) : (
//               <tbody className="text-gray-600">
//                 {paginatedData.map((item: any, index: number) => (
//                   <tr
//                     key={index}
//                     className="transition border-b hover:bg-gray-50 border-gray-50"
//                   >
//                     <td className="py-4 pl-2">
//                       <div className="flex items-center gap-4">
//                         <img
//                           src={item.image || item.image_url}
//                           alt="Product"
//                           className="object-cover w-12 h-12 bg-gray-100 border border-gray-100 rounded-lg shadow-sm shrink-0"
//                         />
//                         <div>
//                           <p className="font-bold text-gray-900">{item.name}</p>
//                           <p className="font-mono text-gray-400 text-xs mt-0.5">
//                             {/* {item.code || item.sku} */}
//                             {item.sku}
//                           </p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="py-4 text-sm font-medium">
//                       {item.category_name}
//                     </td>
//                     <td className="py-4 font-bold text-right text-gray-900">
//                       {item.total_sold}
//                     </td>
//                     <td className="py-4 pr-2 font-bold text-right text-emerald-600">
//                       {formatPrice(item.total_revenue)}
//                     </td>
//                   </tr>
//                 ))}

//                 {allReportData.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan={4}
//                       className="py-16 text-sm italic text-center text-gray-400"
//                     >
//                       Tidak ada data penjualan yang ditemukan untuk periode ini.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             )}

//             {allReportData.length > 0 && !isLoading && (
//               <tfoot>
//                 <tr className="font-bold text-gray-800 border-t-2 border-gray-100 bg-gray-50/50">
//                   <td
//                     colSpan={2}
//                     className="py-4 pl-4 text-xs tracking-widest text-right text-gray-500 uppercase"
//                   >
//                     Grand Total (Keseluruhan)
//                   </td>
//                   <td className="py-4 text-lg text-right">{totalUnitsSold}</td>
//                   <td className="py-4 pr-2 text-xl text-right text-emerald-700">
//                     {formatPrice(grandTotalRevenue)}
//                   </td>
//                 </tr>
//               </tfoot>
//             )}
//           </table>
//         </div>

//         {/* PAGINATION CONTROLS */}
//         {!isLoading && (totalPages > 0 || allReportData.length > 0) && (
//           <div className="flex flex-col items-center justify-between gap-4 pt-4 mt-6 border-t border-gray-100 md:flex-row">
//             <p className="text-sm text-gray-400">
//               Menampilkan{" "}
//               <span className="font-bold text-gray-800">{showingStart}</span>{" "}
//               hingga{" "}
//               <span className="font-bold text-gray-800">{showingEnd}</span> dari{" "}
//               <span className="font-bold text-gray-800">{totalItems}</span>{" "}
//               produk
//             </p>

//             {totalPages > 1 && (
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => changePage(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="px-4 py-2 text-sm font-medium transition border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
//                 >
//                   Mundur
//                 </button>

//                 <div className="hidden gap-1 sm:flex">
//                   {visiblePages.map((page, index) => (
//                     <button
//                       key={index}
//                       onClick={() =>
//                         typeof page === "number" ? changePage(page) : null
//                       }
//                       disabled={page === "..."}
//                       className={`flex items-center justify-center w-10 h-10 text-sm font-medium transition rounded-xl ${
//                         currentPage === page
//                           ? "bg-gray-900 text-white border-gray-900"
//                           : "hover:bg-gray-50 border-gray-200"
//                       } ${page === "..." ? "cursor-default border-transparent hover:bg-transparent" : "border"}`}
//                     >
//                       {page}
//                     </button>
//                   ))}
//                 </div>

//                 <button
//                   onClick={() => changePage(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   className="px-4 py-2 text-sm font-medium transition border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
//                 >
//                   Lanjut
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from "react";
import html2pdf from "html2pdf.js";
import * as XLSX from "xlsx";
import { BASE_URL } from "../../config/api";

export default function SalesReportPage() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // --- STATE ---
  const [allReportData, setAllReportData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [filters, setFilters] = useState({
    year: currentYear,
    month: new Date().getMonth() + 1,
    search: "",
  });

  // 👇 [PERBAIKAN] State untuk Otorisasi Ekspor Laporan 👇
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

  // --- FORMATTING HELPERS ---
  const formatPrice = (v: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(v || 0);

  // --- FETCH DATA ---
  const fetchReport = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("admin_token");

      // Susun Query Parameter
      const queryParams = new URLSearchParams();
      if (filters.month) queryParams.append("month", filters.month.toString());
      if (filters.year) queryParams.append("year", filters.year.toString());
      if (filters.search) queryParams.append("search", filters.search);

      const res = await fetch(
        `${BASE_URL}/api/admin/sales-report?${queryParams.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!res.ok) throw new Error("Gagal mengambil laporan");
      const jsonRes = await res.json();

      setAllReportData(jsonRes.data || []);
      setCurrentPage(1);
    } catch (error) {
      console.error("Fetch report failed", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  // Efek Mounting Awal
  useEffect(() => {
    fetchReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Efek Debounce untuk Search & Otomatis Fetch saat Items Per Page diganti
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchReport();
    }, 600);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  // --- GLOBAL SUMMARY CALCULATIONS ---
  const { grandTotalRevenue, totalUnitsSold, bestSellerName } = useMemo(() => {
    if (allReportData.length > 0) {
      const rev = allReportData.reduce(
        (acc, item) => acc + parseFloat(item.total_revenue),
        0,
      );
      const units = allReportData.reduce(
        (acc, item) => acc + parseInt(item.total_sold),
        0,
      );
      // Asumsi data dari backend sudah diurutkan berdasarkan penjualan tertinggi
      const bestSeller = allReportData[0].name;
      return {
        grandTotalRevenue: rev,
        totalUnitsSold: units,
        bestSellerName: bestSeller,
      };
    }
    return { grandTotalRevenue: 0, totalUnitsSold: 0, bestSellerName: "-" };
  }, [allReportData]);

  // --- PAGINATION LOGIC ---
  const totalItems = allReportData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return allReportData.slice(start, end);
  }, [allReportData, currentPage, itemsPerPage]);

  const showingStart =
    totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const showingEnd = Math.min(currentPage * itemsPerPage, totalItems);

  const visiblePages = useMemo(() => {
    const maxVisible = 7;
    if (totalPages <= maxVisible)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
    if (currentPage >= totalPages - 3)
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  }, [currentPage, totalPages]);

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // --- EXPORTS ---
  const exportToPDF = () => {
    const element = document.getElementById("exportable-table");
    if (!element) return;

    const headers = element.querySelectorAll(".export-header");
    headers.forEach((h) => {
      h.classList.remove("hidden");
      h.classList.add("block");
    });

    const monthName = filters.month ? months[filters.month - 1] : "All";
    const fileName = `Sales_Report_${filters.year}_${monthName}.pdf`;

    const opt = {
      margin: 0.5,
      filename: fileName,
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: {
        unit: "in" as const,
        format: "letter" as const,
        orientation: "portrait" as const,
      },
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        headers.forEach((h) => {
          h.classList.add("hidden");
          h.classList.remove("block");
        });
      });
  };

  const exportToExcel = () => {
    const excelData: any[] = allReportData.map((item, index) => ({
      No: index + 1,
      "Product Code": item.sku,
      "Product Name": item.name,
      Category: item.category_name,
      "Units Sold": parseInt(item.total_sold),
      "Total Revenue (IDR)": parseFloat(item.total_revenue),
    }));

    excelData.push({
      No: "",
      "Product Code": "",
      "Product Name": "",
      Category: "GRAND TOTAL",
      "Units Sold": totalUnitsSold,
      "Total Revenue (IDR)": grandTotalRevenue,
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Data");

    const monthName = filters.month ? months[filters.month - 1] : "All";
    const fileName = `Sales_Report_${filters.year}_${monthName}.xlsx`;

    XLSX.writeFile(workbook, fileName);
  };

  // --- RENDER ---
  return (
    <div className="p-8 pb-10 space-y-8 font-sans animate-fade-in">
      {/* HEADER SECTION & FILTERS */}
      <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          Laporan Penjualan
        </h1>
        <div className="flex flex-wrap items-end gap-4">
          <div className="w-full sm:w-auto">
            <label className="block mb-1 text-xs font-bold tracking-wide text-gray-500 uppercase">
              Tahun
            </label>
            <select
              value={filters.year}
              onChange={(e) =>
                setFilters({ ...filters, year: Number(e.target.value) })
              }
              className="w-full px-4 py-2 font-bold transition border border-gray-200 outline-none cursor-pointer bg-gray-50 rounded-xl sm:w-32 focus:ring-2 focus:ring-gycora"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full sm:w-auto">
            <label className="block mb-1 text-xs font-bold tracking-wide text-gray-500 uppercase">
              Bulan
            </label>
            <select
              value={filters.month}
              onChange={(e) =>
                setFilters({ ...filters, month: Number(e.target.value) })
              }
              className="w-full px-4 py-2 transition border border-gray-200 outline-none cursor-pointer bg-gray-50 rounded-xl sm:w-40 focus:ring-2 focus:ring-gycora"
            >
              <option value="">Semua Bulan</option>
              {months.map((m, i) => (
                <option key={i} value={i + 1}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-grow w-full sm:w-auto">
            <label className="block mb-1 text-xs font-bold tracking-wide text-gray-500 uppercase">
              Cari Produk
            </label>
            <div className="relative">
              <input
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                type="text"
                placeholder="Cari berdasarkan nama atau SKU..."
                className="w-full py-2 pl-10 pr-4 transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora"
              />
              <svg
                className="top-2.5 left-3 absolute w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <button
            onClick={fetchReport}
            className="bg-gray-900 hover:bg-black px-6 py-2 rounded-xl font-bold text-white transition h-[42px] shadow-sm tracking-widest text-xs uppercase"
          >
            Terapkan
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="relative p-6 overflow-hidden border shadow-sm border-emerald-100 bg-gradient-to-br from-emerald-50 to-white rounded-2xl">
          <p className="mb-1 text-xs font-bold tracking-widest uppercase text-emerald-600">
            Total Pendapatan
          </p>
          {!isLoading ? (
            <p className="text-3xl font-black text-emerald-900">
              {formatPrice(grandTotalRevenue)}
            </p>
          ) : (
            <div className="w-3/4 h-8 mt-1 rounded bg-emerald-200 animate-pulse"></div>
          )}
        </div>

        <div className="relative p-6 overflow-hidden border border-blue-100 shadow-sm bg-gradient-to-br from-blue-50 to-white rounded-2xl">
          <p className="mb-1 text-xs font-bold tracking-widest text-blue-600 uppercase">
            Unit Terjual
          </p>
          {!isLoading ? (
            <p className="text-3xl font-black text-blue-900">
              {totalUnitsSold} pcs
            </p>
          ) : (
            <div className="w-1/2 h-8 mt-1 bg-blue-200 rounded animate-pulse"></div>
          )}
        </div>

        <div className="relative p-6 overflow-hidden border border-purple-100 shadow-sm bg-gradient-to-br from-purple-50 to-white rounded-2xl">
          <p className="mb-1 text-xs font-bold tracking-widest text-purple-600 uppercase">
            Produk Terlaris
          </p>
          {!isLoading ? (
            <p className="text-xl font-black text-purple-900 truncate">
              {bestSellerName}
            </p>
          ) : (
            <div className="w-3/4 h-6 mt-2 bg-purple-200 rounded animate-pulse"></div>
          )}
        </div>
      </div>

      {/* MAIN TABLE SECTION */}
      <div className="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[400px]">
        <div className="flex flex-col items-start justify-between gap-4 mb-6 md:flex-row md:items-center">
          <h2 className="text-xl font-bold text-gray-800">Performa Produk</h2>

          <div className="flex items-center gap-4">
            {/* 👇 BUNGKUS TOMBOL EXPORT DENGAN RBAC 👇 */}
            {canAccess("sales_report.export") && (
              <div className="flex gap-2">
                <button
                  onClick={exportToPDF}
                  disabled={allReportData.length === 0 || isLoading}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest text-red-600 uppercase transition bg-red-50 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  PDF
                </button>
                <button
                  onClick={exportToExcel}
                  disabled={allReportData.length === 0 || isLoading}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest uppercase transition text-emerald-600 bg-emerald-50 hover:bg-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Excel
                </button>
              </div>
            )}

            <div className="hidden w-px h-6 bg-gray-200 md:block"></div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500 uppercase">
                Show:
              </span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="px-2 py-1 text-sm border border-gray-200 rounded-lg outline-none cursor-pointer bg-gray-50 focus:border-gycora"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto" id="exportable-table">
          <div className="hidden mb-4 export-header">
            <h2 className="text-2xl font-bold text-black">Sales Report</h2>
            <p className="text-sm text-gray-500">
              Period: {filters.month ? months[filters.month - 1] : "All Months"}{" "}
              {filters.year}
            </p>
          </div>

          <table className="w-full text-left bg-white border-collapse">
            <thead>
              <tr className="text-xs tracking-widest text-gray-400 uppercase border-b border-gray-100">
                <th className="pb-4 pl-2 font-medium">Informasi Produk</th>
                <th className="pb-4 font-medium">Kategori</th>
                <th className="pb-4 font-medium text-right">Unit Terjual</th>
                <th className="pb-4 pr-2 font-medium text-right">Pendapatan</th>
              </tr>
            </thead>

            {isLoading ? (
              <tbody>
                {Array.from({
                  length: itemsPerPage > 10 ? 10 : itemsPerPage,
                }).map((_, i) => (
                  <tr key={`skel-${i}`} className="border-b border-gray-50">
                    <td className="py-4 pl-2">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse shrink-0"></div>
                        <div className="space-y-2">
                          <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="w-20 h-3 bg-gray-100 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="py-4">
                      <div className="w-12 h-4 ml-auto bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="py-4 pr-2">
                      <div className="w-24 h-4 ml-auto bg-gray-200 rounded animate-pulse"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody className="text-gray-600">
                {paginatedData.map((item: any, index: number) => (
                  <tr
                    key={index}
                    className="transition border-b hover:bg-gray-50 border-gray-50"
                  >
                    <td className="py-4 pl-2">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image || item.image_url}
                          alt="Product"
                          className="object-cover w-12 h-12 bg-gray-100 border border-gray-100 rounded-lg shadow-sm shrink-0"
                        />
                        <div>
                          <p className="font-bold text-gray-900">{item.name}</p>
                          <p className="font-mono text-gray-400 text-xs mt-0.5">
                            {item.sku}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-sm font-medium">
                      {item.category_name}
                    </td>
                    <td className="py-4 font-bold text-right text-gray-900">
                      {item.total_sold}
                    </td>
                    <td className="py-4 pr-2 font-bold text-right text-emerald-600">
                      {formatPrice(item.total_revenue)}
                    </td>
                  </tr>
                ))}

                {allReportData.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-16 text-sm italic text-center text-gray-400"
                    >
                      Tidak ada data penjualan yang ditemukan untuk periode ini.
                    </td>
                  </tr>
                )}
              </tbody>
            )}

            {allReportData.length > 0 && !isLoading && (
              <tfoot>
                <tr className="font-bold text-gray-800 border-t-2 border-gray-100 bg-gray-50/50">
                  <td
                    colSpan={2}
                    className="py-4 pl-4 text-xs tracking-widest text-right text-gray-500 uppercase"
                  >
                    Grand Total (Keseluruhan)
                  </td>
                  <td className="py-4 text-lg text-right">{totalUnitsSold}</td>
                  <td className="py-4 pr-2 text-xl text-right text-emerald-700">
                    {formatPrice(grandTotalRevenue)}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>

        {/* PAGINATION CONTROLS */}
        {!isLoading && (totalPages > 0 || allReportData.length > 0) && (
          <div className="flex flex-col items-center justify-between gap-4 pt-4 mt-6 border-t border-gray-100 md:flex-row">
            <p className="text-sm text-gray-400">
              Menampilkan{" "}
              <span className="font-bold text-gray-800">{showingStart}</span>{" "}
              hingga{" "}
              <span className="font-bold text-gray-800">{showingEnd}</span> dari{" "}
              <span className="font-bold text-gray-800">{totalItems}</span>{" "}
              produk
            </p>

            {totalPages > 1 && (
              <div className="flex gap-2">
                <button
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium transition border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Mundur
                </button>

                <div className="hidden gap-1 sm:flex">
                  {visiblePages.map((page, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        typeof page === "number" ? changePage(page) : null
                      }
                      disabled={page === "..."}
                      className={`flex items-center justify-center w-10 h-10 text-sm font-medium transition rounded-xl ${
                        currentPage === page
                          ? "bg-gray-900 text-white border-gray-900"
                          : "hover:bg-gray-50 border-gray-200"
                      } ${page === "..." ? "cursor-default border-transparent hover:bg-transparent" : "border"}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium transition border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Lanjut
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}