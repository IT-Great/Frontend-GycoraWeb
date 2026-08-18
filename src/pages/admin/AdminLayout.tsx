// /* eslint-disable react-hooks/set-state-in-effect */
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import logoGycora from "../../assets/gycora_logo.png";
// import { useMessage } from "../../context/MessageContext";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
//   const [isAuthorized, setIsAuthorized] = useState(false);

//   const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
//   const [isClinicMenuOpen, setIsClinicMenuOpen] = useState(false);

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [adminUser, setAdminUser] = useState<any>(null);
//   const [allowedModules, setAllowedModules] = useState<string[]>([]);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const pathname = location.pathname;

//   const { unreadCount, fetchUnreadMessages } = useMessage();

//   useEffect(() => {
//     if (pathname === "/admin/login") {
//       setIsAuthorized(true);
//       return;
//     }

//     const token = localStorage.getItem("admin_token");
//     const userStr = localStorage.getItem("admin_user");

//     if (!token || !userStr) {
//       navigate("/admin/login", { replace: true });
//       return;
//     }

//     const user = JSON.parse(userStr);
//     const allowedRoles = ["admin", "superadmin", "gudang", "accounting"];

//     if (!allowedRoles.includes(user.usertype)) {
//       Swal.fire(
//         "Akses Ditolak",
//         "Halaman ini khusus untuk Staf Manajemen.",
//         "error",
//       );
//       navigate("/login", { replace: true });
//       return;
//     }

//     setAdminUser(user);
//     fetchUnreadMessages();

//     // -------------------------------------------------------------
//     // [PERBAIKAN] Mengambil Policies & Logika Auto-Redirect
//     // -------------------------------------------------------------
//     let currentAllowed: string[] = [];
//     try {
//       const policiesStr = localStorage.getItem("admin_access_policies");
//       if (policiesStr) {
//         const policies = JSON.parse(policiesStr);
//         if (user.usertype !== "superadmin") {
//           currentAllowed = policies[user.usertype] || [];
//           setAllowedModules(currentAllowed);
//         }
//       }
//     } catch (error) {
//       console.error("Gagal membaca kebijakan akses:", error);
//     }

//     // Jika bukan superadmin, cek apakah user berhak mengakses path saat ini
//     if (user.usertype !== "superadmin") {
//       // Peta URL ke Module Key
//       const routeMap: Record<string, string> = {
//         "/admin/dashboard": "dashboard",
//         "/admin/categories": "categories",
//         "/admin/products": "products",
//         "/admin/stocks": "stocks",
//         "/admin/treatments": "treatments",
//         "/admin/transactions": "transactions",
//         "/admin/sales-report": "sales_report",
//         "/admin/users": "users",
//         "/admin/business-partners": "business_partners",
//         "/admin/reviews": "reviews",
//         "/admin/events": "events",
//         "/admin/subscribers": "subscribers",
//         "/admin/audit-logs": "audit_logs",
//         "/admin/coas": "coas",
//         "/admin/transfer-receive": "transfer_receive",
//         "/admin/suppliers": "suppliers",
//         "/admin/invoices": "invoices",
//       };

//       let requiredModule: string | null = null;
//       for (const [route, module] of Object.entries(routeMap)) {
//         if (pathname.startsWith(route)) {
//           requiredModule = module;
//           break;
//         }
//       }

//       // Jika mendarat di rute yang membutuhkan izin, TAPI user tidak punya izinnya
//       if (requiredModule && !currentAllowed.includes(requiredModule)) {
//         // Cari menu pertama yang diizinkan untuk mereka
//         const orderedModules = Object.values(routeMap);
//         const firstAllowedModule = orderedModules.find((m) =>
//           currentAllowed.includes(m),
//         );

//         if (firstAllowedModule) {
//           // Cari URL (path) dari modul pertama yang diizinkan tersebut
//           const fallbackRoute = Object.keys(routeMap).find(
//             (key) => routeMap[key] === firstAllowedModule,
//           );
//           if (fallbackRoute) {
//             navigate(fallbackRoute, { replace: true });
//             return; // Hentikan eksekusi, biarkan useEffect berjalan ulang di rute baru
//           }
//         } else {
//           // Fallback terakhir jika user sama sekali tidak punya akses ke menu apapun
//           navigate("/admin/profile", { replace: true });
//           return;
//         }
//       }
//     }

//     setIsAuthorized(true);
//   }, [pathname, navigate, fetchUnreadMessages]);

//   useEffect(() => {
//     if (
//       pathname.includes("/admin/products") ||
//       pathname.includes("/admin/stocks")
//     ) {
//       setIsProductMenuOpen(true);
//     }
//     if (pathname.includes("/admin/treatments")) {
//       setIsClinicMenuOpen(true);
//     }
//   }, [pathname]);

//   // Otomatis tutup sidebar mobile saat rute berpindah
//   useEffect(() => {
//     setIsMobileSidebarOpen(false);
//   }, [pathname]);

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Keluar dari Portal?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Ya, Keluar",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("admin_token");
//         localStorage.removeItem("admin_user");
//         navigate("/admin/login");
//       }
//     });
//   };

//   const canAccess = (moduleKey: string) => {
//     if (!adminUser) return false;
//     if (adminUser.usertype === "superadmin") return true; 
//     return allowedModules.includes(moduleKey);
//   };

//   if (!isAuthorized) {
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">
//         <div className="w-8 h-8 border-4 rounded-full border-gycora/30 border-t-gycora animate-spin"></div>
//       </div>
//     );
//   }

//   if (pathname === "/admin/login") {
//     return <>{children}</>;
//   }

//   const isProductsActive =
//     pathname === "/admin/products" ||
//     pathname.includes("/admin/products/create") ||
//     (pathname.includes("/admin/products/") && !pathname.includes("stocks"));
//   const isStocksActive = pathname.includes("/admin/stocks");
//   const isAnyProductSubmenuActive = isProductsActive || isStocksActive;

//   const isTreatmentsActive = pathname.includes("/admin/treatments");

//   // -------------------------------------------------------------
//   // [PERBAIKAN] Cek apakah ada menu utama yang aktif untuk menampilkan label
//   // -------------------------------------------------------------
//   const hasMainMenuAccess =
//     canAccess("dashboard") ||
//     canAccess("categories") ||
//     canAccess("products") ||
//     canAccess("stocks") ||
//     canAccess("treatments") ||
//     canAccess("transactions") ||
//     canAccess("sales_report") ||
//     canAccess("users") ||
//     canAccess("business_partners") ||
//     canAccess("reviews") ||
//     canAccess("events") ||
//     canAccess("subscribers") ||
//     canAccess("audit_logs") ||
//     adminUser?.usertype === "superadmin";

//   return (
//     <div className="relative flex h-screen overflow-hidden font-sans bg-gray-50">
      
//       {/* BACKDROP OVERLAY KHUSUS MOBILE */}
//       {isMobileSidebarOpen && (
//         <div 
//           className="fixed inset-0 z-40 transition-opacity md:hidden bg-black/50 backdrop-blur-sm"
//           onClick={() => setIsMobileSidebarOpen(false)}
//         ></div>
//       )}

//       {/* SIDEBAR */}
//       <aside
//         className={`
//           fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-gray-200 shadow-xl md:shadow-sm transition-all duration-300 ease-in-out
//           ${isSidebarOpen ? "md:w-64" : "md:w-20"} 
//           ${isMobileSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0"}
//           md:relative
//         `}
//       >
//         <div
//           className={`h-16 flex items-center justify-between border-b border-gray-100 overflow-hidden whitespace-nowrap transition-all duration-300 ${isSidebarOpen || isMobileSidebarOpen ? "px-6" : "justify-center px-0"}`}
//         >
//           <div className="flex items-center">
//             <img
//               src={logoGycora}
//               alt="Gycora Logo"
//               className={`object-contain transition-all duration-300 ${isSidebarOpen || isMobileSidebarOpen ? "h-8" : "h-6"}`}
//             />
//             {(isSidebarOpen || isMobileSidebarOpen) && (
//               <span className="mt-1 ml-2 text-[10px] font-bold tracking-widest text-gycora uppercase">
//                 Admin
//               </span>
//             )}
//           </div>
          
//           <button 
//             className="p-1 text-gray-400 md:hidden hover:text-black"
//             onClick={() => setIsMobileSidebarOpen(false)}
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//           </button>
//         </div>

//         <nav className="flex-1 p-4 space-y-2 overflow-x-hidden overflow-y-auto custom-scrollbar">
          
//           {/* 👇 [PERBAIKAN] Label Menu Utama disembunyikan jika tidak ada akses 👇 */}
//           {hasMainMenuAccess && (
//             <>
//               {(isSidebarOpen || isMobileSidebarOpen) ? (
//                 <p className="px-4 mt-2 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-opacity duration-300">
//                   Menu Utama
//                 </p>
//               ) : (
//                 <div className="h-4 mt-2"></div>
//               )}
//             </>
//           )}

//           {/* DASHBOARD */}
//           {canAccess("dashboard") && (
//             <Link
//               to="/admin/dashboard"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Dashboard" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/dashboard") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/dashboard") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Dashboard</span>}
//             </Link>
//           )}

//           {/* KATEGORI */}
//           {canAccess("categories") && (
//             <Link
//               to="/admin/categories"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Kategori" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/categories") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/categories") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Kategori</span>}
//             </Link>
//           )}

//           {/* DROPDOWN PRODUK (Akan tampil jika memiliki akses 'products' ATAU 'stocks') */}
//           {(canAccess("products") || canAccess("stocks")) && (
//             <div className="flex flex-col">
//               <button
//                 onClick={() => {
//                   if (!isSidebarOpen && !isMobileSidebarOpen) setIsSidebarOpen(true);
//                   setIsProductMenuOpen(!isProductMenuOpen);
//                 }}
//                 title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Produk" : ""}
//                 className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${isAnyProductSubmenuActive ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//               >
//                 <div className="flex items-center gap-3">
//                   <svg className={`w-6 h-6 shrink-0 transition-colors ${isAnyProductSubmenuActive ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//                   </svg>
//                   {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Produk</span>}
//                 </div>
//                 {(isSidebarOpen || isMobileSidebarOpen) && (
//                   <svg className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 )}
//               </button>
//               <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isProductMenuOpen && (isSidebarOpen || isMobileSidebarOpen) ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
//                 <div className="flex flex-col pl-2 space-y-1 border-l-2 border-gray-100 ml-11">
//                   {canAccess("products") && (
//                     <Link to="/admin/products" className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isProductsActive ? "text-gycora bg-emerald-50/50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}>Katalog Utama</Link>
//                   )}
//                   {canAccess("stocks") && (
//                     <Link to="/admin/stocks" className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isStocksActive ? "text-gycora bg-emerald-50/50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}>Stok & Batch Gudang</Link>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* MENU KLINIK / TREATMENTS */}
//           {canAccess("treatments") && (
//             <div className="flex flex-col">
//               <button
//                 onClick={() => {
//                   if (!isSidebarOpen && !isMobileSidebarOpen) setIsSidebarOpen(true);
//                   setIsClinicMenuOpen(!isClinicMenuOpen);
//                 }}
//                 title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Klinik" : ""}
//                 className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${isTreatmentsActive ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//               >
//                 <div className="flex items-center gap-3">
//                   <svg className={`w-6 h-6 shrink-0 transition-colors ${isTreatmentsActive ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
//                   </svg>
//                   {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Klinik</span>}
//                 </div>
//                 {(isSidebarOpen || isMobileSidebarOpen) && (
//                   <svg className={`w-4 h-4 transition-transform duration-200 ${isClinicMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 )}
//               </button>
//               <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isClinicMenuOpen && (isSidebarOpen || isMobileSidebarOpen) ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
//                 <div className="flex flex-col pl-2 space-y-1 border-l-2 border-gray-100 ml-11">
//                   <Link to="/admin/treatments" className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isTreatmentsActive ? "text-gycora bg-emerald-50/50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}>Daftar Treatment</Link>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* TRANSAKSI */}
//           {canAccess("transactions") && (
//             <Link
//               to="/admin/transactions"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Transaksi" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/transactions") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/transactions") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Transaksi</span>}
//             </Link>
//           )}

//           {/* LAPORAN PENJUALAN */}
//           {canAccess("sales_report") && (
//             <Link
//               to="/admin/sales-report"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Laporan Penjualan" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/sales-report") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/sales-report") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Laporan</span>}
//             </Link>
//           )}

//           {/* PELANGGAN */}
//           {canAccess("users") && (
//             <Link
//               to="/admin/users"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Pelanggan" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/users") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/users") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Pelanggan</span>}
//             </Link>
//           )}

//           {/* PARTNER BISNIS */}
//           {canAccess("business_partners") && (
//             <Link
//               to="/admin/business-partners"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Business Partners" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/admin/business-partners") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/admin/business-partners") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Partner Bisnis</span>}
//             </Link>
//           )}

//           {/* ULASAN */}
//           {canAccess("reviews") && (
//             <Link
//               to="/admin/reviews"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Ulasan Pelanggan" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/reviews") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/reviews") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Ulasan</span>}
//             </Link>
//           )}

//           {/* EVENTS */}
//           {canAccess("events") && (
//             <Link
//               to="/admin/events"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Event" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/admin/events") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/admin/events") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Events</span>}
//             </Link>
//           )}

//           {/* SUBSCRIBERS */}
//           {canAccess("subscribers") && (
//             <Link
//               to="/admin/subscribers"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Subscribers" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/subscribers") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/subscribers") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Subscribers</span>}
//             </Link>
//           )}

//           {/* SYSTEM LOGS */}
//           {canAccess("audit_logs") && (
//             <Link
//               to="/admin/audit-logs"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "System Logs" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/audit-logs") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/audit-logs") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">System Logs</span>}
//             </Link>
//           )}

//           {/* ACCESS POLICY (Hanya Superadmin) */}
//           {adminUser?.usertype === "superadmin" && (
//             <Link
//               to="/admin/access-policy"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Access Policy" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/access-policy") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/access-policy") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Access Policy</span>}
//             </Link>
//           )}

//           {/* SECTION ACCOUNTING (Hanya Tampil Jika User Punya Minimal 1 Akses Menu Accounting) */}
//           {(canAccess("coas") || canAccess("transfer_receive") || canAccess("suppliers") || canAccess("invoices")) && (
//             <div className="pt-2 mt-4 border-t border-gray-100">
//               {(isSidebarOpen || isMobileSidebarOpen) ? (
//                 <p className="px-4 mt-2 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-opacity duration-300">
//                   Accounting
//                 </p>
//               ) : (
//                 <div className="h-4 mt-2"></div>
//               )}

//               {canAccess("coas") && (
//                 <Link
//                   to="/admin/coas"
//                   title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Chart of Accounts" : ""}
//                   className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//                     pathname.includes("/coas") || pathname.includes("/category-coas")
//                       ? "bg-gycora-light text-gycora-dark"
//                       : "text-gray-700 hover:bg-gray-100"
//                   } ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//                 >
//                   <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/coas") || pathname.includes("/category-coas") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2-2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
//                   </svg>
//                   {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Chart of Accounts</span>}
//                 </Link>
//               )}

//               {canAccess("transfer_receive") && (
//                 <Link
//                   to="/admin/transfer-receive"
//                   title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Payments" : ""}
//                   className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//                     pathname.includes("/transfer-receive")
//                       ? "bg-gycora-light text-gycora-dark"
//                       : "text-gray-700 hover:bg-gray-100"
//                   } ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//                 >
//                   <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/transfer-receive") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
//                   </svg>
//                   {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Payments</span>}
//                 </Link>
//               )}

//               {canAccess("suppliers") && (
//                 <Link
//                   to="/admin/suppliers"
//                   title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Suppliers" : ""}
//                   className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//                     pathname.includes("/suppliers")
//                       ? "bg-gycora-light text-gycora-dark"
//                       : "text-gray-700 hover:bg-gray-100"
//                   } ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//                 >
//                   <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/suppliers") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                   </svg>
//                   {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Suppliers</span>}
//                 </Link>
//               )}

//               {canAccess("invoices") && (
//                 <Link
//                   to="/admin/invoices"
//                   title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Invoices" : ""}
//                   className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//                     pathname.includes("/invoices")
//                       ? "bg-gycora-light text-gycora-dark"
//                       : "text-gray-700 hover:bg-gray-100"
//                   } ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//                 >
//                   <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/invoices") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                   {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Invoices</span>}
//                 </Link>
//               )}
//             </div>
//           )}
//         </nav>

//         {/* Footer Sidebar (Logout) */}
//         <div className="p-4 border-t border-gray-100 shrink-0">
//           <button
//             onClick={handleLogout}
//             title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Logout" : ""}
//             className={`flex items-center gap-3 py-2 w-full text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium text-sm ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//             </svg>
//             {(isSidebarOpen || isMobileSidebarOpen) && <span>Logout</span>}
//           </button>
//         </div>
//       </aside>

//       {/* MAIN CONTENT AREA */}
//       <div className="flex flex-col flex-1 overflow-hidden">
//         {/* HEADER */}
//         <header className="z-0 flex items-center justify-between h-16 px-4 bg-white border-b border-gray-100 shadow-sm sm:px-6 shrink-0">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => {
//                 if (window.innerWidth < 768) {
//                   setIsMobileSidebarOpen(true);
//                 } else {
//                   setIsSidebarOpen(!isSidebarOpen);
//                 }
//               }}
//               className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gycora/20"
//               title="Toggle Sidebar"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>

//             <h2 className="hidden text-lg font-semibold text-gray-800 capitalize sm:block">
//               {pathname.split("/").pop() || "Dashboard"}
//             </h2>
//           </div>

//           <div className="flex items-center gap-4 md:gap-6">
//             {adminUser && (
//               <button
//                 onClick={() => navigate("/admin/messages")}
//                 className="relative p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora"
//                 title="Pesan Masuk"
//               >
//                 <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>

//                 {unreadCount > 0 && (
//                   <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white translate-x-1 -translate-y-1 bg-red-500 rounded-full shadow-sm animate-pulse">
//                     {unreadCount > 99 ? "99+" : unreadCount}
//                   </span>
//                 )}
//               </button>
//             )}

//             <Link
//               to="/admin/profile"
//               className="flex items-center gap-3 p-1.5 transition-colors rounded-lg cursor-pointer hover:bg-gray-50"
//             >
//               <div className="hidden text-right sm:block">
//                 <p className="text-sm font-bold leading-tight text-gray-900">
//                   {adminUser?.first_name} {adminUser?.last_name}
//                 </p>
//                 <p className="text-xs font-medium text-gycora-dark uppercase tracking-widest mt-0.5">
//                   {adminUser?.usertype === "superadmin"
//                     ? "Super Admin"
//                     : "Staf Manajemen"}
//                 </p>
//               </div>
//               <img
//                 src={
//                   adminUser?.profile_image ||
//                   `https://ui-avatars.com/api/?name=${adminUser?.first_name}+${adminUser?.last_name}&background=059669&color=fff&bold=true`
//                 }
//                 alt="Profile Avatar"
//                 className="object-cover w-8 h-8 rounded-full shadow-sm sm:w-10 sm:h-10 ring-2 ring-gycora-light"
//                 onError={(e) => {
//                   e.currentTarget.src = `https://ui-avatars.com/api/?name=${adminUser?.first_name}+${adminUser?.last_name}&background=059669&color=fff&bold=true`;
//                 }}
//               />
//             </Link>
//           </div>
//         </header>

//         <main className="flex-1 p-4 overflow-y-auto bg-gray-50/50 md:p-6 custom-scrollbar">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

// /* eslint-disable react-hooks/set-state-in-effect */
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import logoGycora from "../../assets/gycora_logo.png";
// import { useMessage } from "../../context/MessageContext";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
//   const [isAuthorized, setIsAuthorized] = useState(false);

//   const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
//   const [isClinicMenuOpen, setIsClinicMenuOpen] = useState(false);

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [adminUser, setAdminUser] = useState<any>(null);
//   const [allowedModules, setAllowedModules] = useState<string[]>([]);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const pathname = location.pathname;

//   const { unreadCount, fetchUnreadMessages } = useMessage();

//   useEffect(() => {
//     if (pathname === "/admin/login") {
//       setIsAuthorized(true);
//       return;
//     }

//     const token = localStorage.getItem("admin_token");
//     const userStr = localStorage.getItem("admin_user");

//     if (!token || !userStr) {
//       navigate("/admin/login", { replace: true });
//       return;
//     }

//     const user = JSON.parse(userStr);
//     // 👇 Menambahkan 'cs' ke dalam allowedRoles login portal Admin
//     const allowedRoles = ["admin", "superadmin", "gudang", "accounting", "cs"];

//     if (!allowedRoles.includes(user.usertype)) {
//       Swal.fire(
//         "Akses Ditolak",
//         "Halaman ini khusus untuk Staf Manajemen.",
//         "error",
//       );
//       navigate("/login", { replace: true });
//       return;
//     }

//     setAdminUser(user);
//     fetchUnreadMessages();

//     // -------------------------------------------------------------
//     // Mengambil Policies & Logika Auto-Redirect
//     // -------------------------------------------------------------
//     let currentAllowed: string[] = [];
//     try {
//       const policiesStr = localStorage.getItem("admin_access_policies");
//       if (policiesStr) {
//         const policies = JSON.parse(policiesStr);
//         if (user.usertype !== "superadmin") {
//           currentAllowed = policies[user.usertype] || [];
//           setAllowedModules(currentAllowed);
//         }
//       }
//     } catch (error) {
//       console.error("Gagal membaca kebijakan akses:", error);
//     }

//     // Jika bukan superadmin, cek apakah user berhak mengakses path saat ini
//     if (user.usertype !== "superadmin") {
//       // Peta URL ke Module Key
//       const routeMap: Record<string, string> = {
//         "/admin/dashboard": "dashboard",
//         "/admin/categories": "categories",
//         "/admin/products": "products",
//         "/admin/stocks": "stocks",
//         "/admin/treatments": "treatments",
//         "/admin/transactions": "transactions",
//         "/admin/sales-report": "sales_report",
//         "/admin/users": "users",
//         "/admin/messages": "messages", // 👇 [BARU] Proteksi Akses Route Inbox
//         "/admin/business-partners": "business_partners",
//         "/admin/reviews": "reviews",
//         "/admin/events": "events",
//         "/admin/subscribers": "subscribers",
//         "/admin/audit-logs": "audit_logs",
//         "/admin/coas": "coas",
//         "/admin/transfer-receive": "transfer_receive",
//         "/admin/suppliers": "suppliers",
//         "/admin/invoices": "invoices",
//       };

//       let requiredModule: string | null = null;
//       for (const [route, module] of Object.entries(routeMap)) {
//         if (pathname.startsWith(route)) {
//           requiredModule = module;
//           break;
//         }
//       }

//       if (requiredModule && !currentAllowed.includes(requiredModule)) {
//         const orderedModules = Object.values(routeMap);
//         const firstAllowedModule = orderedModules.find((m) =>
//           currentAllowed.includes(m),
//         );

//         if (firstAllowedModule) {
//           const fallbackRoute = Object.keys(routeMap).find(
//             (key) => routeMap[key] === firstAllowedModule,
//           );
//           if (fallbackRoute) {
//             navigate(fallbackRoute, { replace: true });
//             return;
//           }
//         } else {
//           navigate("/admin/profile", { replace: true });
//           return;
//         }
//       }
//     }

//     setIsAuthorized(true);
//   }, [pathname, navigate, fetchUnreadMessages]);

//   useEffect(() => {
//     if (
//       pathname.includes("/admin/products") ||
//       pathname.includes("/admin/stocks")
//     ) {
//       setIsProductMenuOpen(true);
//     }
//     if (pathname.includes("/admin/treatments")) {
//       setIsClinicMenuOpen(true);
//     }
//   }, [pathname]);

//   useEffect(() => {
//     setIsMobileSidebarOpen(false);
//   }, [pathname]);

//   useEffect(() => {
//     window.addEventListener("refresh-admin-chat-badge", fetchUnreadMessages);
//     return () => window.removeEventListener("refresh-admin-chat-badge", fetchUnreadMessages);
//   }, [fetchUnreadMessages]);

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Keluar dari Portal?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Ya, Keluar",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("admin_token");
//         localStorage.removeItem("admin_user");
//         navigate("/admin/login");
//       }
//     });
//   };

//   const canAccess = (moduleKey: string) => {
//     if (!adminUser) return false;
//     if (adminUser.usertype === "superadmin") return true; 
//     return allowedModules.includes(moduleKey);
//   };

//   if (!isAuthorized) {
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">
//         <div className="w-8 h-8 border-4 rounded-full border-gycora/30 border-t-gycora animate-spin"></div>
//       </div>
//     );
//   }

//   if (pathname === "/admin/login") {
//     return <>{children}</>;
//   }

//   const isProductsActive =
//     pathname === "/admin/products" ||
//     pathname.includes("/admin/products/create") ||
//     (pathname.includes("/admin/products/") && !pathname.includes("stocks"));
//   const isStocksActive = pathname.includes("/admin/stocks");
//   const isAnyProductSubmenuActive = isProductsActive || isStocksActive;

//   const isTreatmentsActive = pathname.includes("/admin/treatments");

//   const hasMainMenuAccess =
//     canAccess("dashboard") ||
//     canAccess("categories") ||
//     canAccess("products") ||
//     canAccess("stocks") ||
//     canAccess("treatments") ||
//     canAccess("transactions") ||
//     canAccess("sales_report") ||
//     canAccess("users") ||
//     canAccess("business_partners") ||
//     canAccess("reviews") ||
//     canAccess("events") ||
//     canAccess("subscribers") ||
//     canAccess("audit_logs") ||
//     adminUser?.usertype === "superadmin";

//   return (
//     <div className="relative flex h-screen overflow-hidden font-sans bg-gray-50">
      
//       {/* BACKDROP OVERLAY KHUSUS MOBILE */}
//       {isMobileSidebarOpen && (
//         <div 
//           className="fixed inset-0 z-40 transition-opacity md:hidden bg-black/50 backdrop-blur-sm"
//           onClick={() => setIsMobileSidebarOpen(false)}
//         ></div>
//       )}

//       {/* SIDEBAR */}
//       <aside
//         className={`
//           fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-gray-200 shadow-xl md:shadow-sm transition-all duration-300 ease-in-out
//           ${isSidebarOpen ? "md:w-64" : "md:w-20"} 
//           ${isMobileSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0"}
//           md:relative
//         `}
//       >
//         <div
//           className={`h-16 flex items-center justify-between border-b border-gray-100 overflow-hidden whitespace-nowrap transition-all duration-300 ${isSidebarOpen || isMobileSidebarOpen ? "px-6" : "justify-center px-0"}`}
//         >
//           <div className="flex items-center">
//             <img
//               src={logoGycora}
//               alt="Gycora Logo"
//               className={`object-contain transition-all duration-300 ${isSidebarOpen || isMobileSidebarOpen ? "h-8" : "h-6"}`}
//             />
//             {(isSidebarOpen || isMobileSidebarOpen) && (
//               <span className="mt-1 ml-2 text-[10px] font-bold tracking-widest text-gycora uppercase">
//                 Admin
//               </span>
//             )}
//           </div>
          
//           <button 
//             className="p-1 text-gray-400 md:hidden hover:text-black"
//             onClick={() => setIsMobileSidebarOpen(false)}
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//           </button>
//         </div>

//         <nav className="flex-1 p-4 space-y-2 overflow-x-hidden overflow-y-auto custom-scrollbar">
          
//           {hasMainMenuAccess && (
//             <>
//               {(isSidebarOpen || isMobileSidebarOpen) ? (
//                 <p className="px-4 mt-2 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-opacity duration-300">
//                   Menu Utama
//                 </p>
//               ) : (
//                 <div className="h-4 mt-2"></div>
//               )}
//             </>
//           )}

//           {/* DASHBOARD */}
//           {canAccess("dashboard") && (
//             <Link
//               to="/admin/dashboard"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Dashboard" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/dashboard") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/dashboard") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Dashboard</span>}
//             </Link>
//           )}

//           {/* KATEGORI */}
//           {canAccess("categories") && (
//             <Link
//               to="/admin/categories"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Kategori" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/categories") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/categories") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Kategori</span>}
//             </Link>
//           )}

//           {/* DROPDOWN PRODUK (Akan tampil jika memiliki akses 'products' ATAU 'stocks') */}
//           {(canAccess("products") || canAccess("stocks")) && (
//             <div className="flex flex-col">
//               <button
//                 onClick={() => {
//                   if (!isSidebarOpen && !isMobileSidebarOpen) setIsSidebarOpen(true);
//                   setIsProductMenuOpen(!isProductMenuOpen);
//                 }}
//                 title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Produk" : ""}
//                 className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${isAnyProductSubmenuActive ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//               >
//                 <div className="flex items-center gap-3">
//                   <svg className={`w-6 h-6 shrink-0 transition-colors ${isAnyProductSubmenuActive ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//                   </svg>
//                   {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Produk</span>}
//                 </div>
//                 {(isSidebarOpen || isMobileSidebarOpen) && (
//                   <svg className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 )}
//               </button>
//               <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isProductMenuOpen && (isSidebarOpen || isMobileSidebarOpen) ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
//                 <div className="flex flex-col pl-2 space-y-1 border-l-2 border-gray-100 ml-11">
//                   {canAccess("products") && (
//                     <Link to="/admin/products" className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isProductsActive ? "text-gycora bg-emerald-50/50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}>Katalog Utama</Link>
//                   )}
//                   {canAccess("stocks") && (
//                     <Link to="/admin/stocks" className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isStocksActive ? "text-gycora bg-emerald-50/50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}>Stok & Batch Gudang</Link>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* MENU KLINIK / TREATMENTS */}
//           {canAccess("treatments") && (
//             <div className="flex flex-col">
//               <button
//                 onClick={() => {
//                   if (!isSidebarOpen && !isMobileSidebarOpen) setIsSidebarOpen(true);
//                   setIsClinicMenuOpen(!isClinicMenuOpen);
//                 }}
//                 title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Klinik" : ""}
//                 className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${isTreatmentsActive ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//               >
//                 <div className="flex items-center gap-3">
//                   <svg className={`w-6 h-6 shrink-0 transition-colors ${isTreatmentsActive ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
//                   </svg>
//                   {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Klinik</span>}
//                 </div>
//                 {(isSidebarOpen || isMobileSidebarOpen) && (
//                   <svg className={`w-4 h-4 transition-transform duration-200 ${isClinicMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 )}
//               </button>
//               <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isClinicMenuOpen && (isSidebarOpen || isMobileSidebarOpen) ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
//                 <div className="flex flex-col pl-2 space-y-1 border-l-2 border-gray-100 ml-11">
//                   <Link to="/admin/treatments" className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isTreatmentsActive ? "text-gycora bg-emerald-50/50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}>Daftar Treatment</Link>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* TRANSAKSI */}
//           {canAccess("transactions") && (
//             <Link
//               to="/admin/transactions"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Transaksi" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/transactions") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/transactions") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Transaksi</span>}
//             </Link>
//           )}

//           {/* LAPORAN PENJUALAN */}
//           {canAccess("sales_report") && (
//             <Link
//               to="/admin/sales-report"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Laporan Penjualan" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/sales-report") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/sales-report") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Laporan</span>}
//             </Link>
//           )}

//           {/* PELANGGAN */}
//           {/* {canAccess("users") && (
//             <Link
//               to="/admin/users"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Pelanggan" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/users") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/users") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Pelanggan</span>}
//             </Link>
//           )} */}

//           {canAccess("users") && (
//     <Link
//       to="/admin/users"
//       title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Pelanggan" : ""}
//       className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/users") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//     >
//       <div className="flex items-center gap-3">
//         <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/users") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//         </svg>
//         {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Pelanggan</span>}
//       </div>
      
//       {/* BADGE TOTAL PESAN BELUM TERBACA */}
//       {unreadCount > 0 && (isSidebarOpen || isMobileSidebarOpen) && (
//         <span className="px-2 py-0.5 ml-2 text-[10px] font-bold text-white bg-red-600 rounded-full shadow-sm whitespace-nowrap animate-pulse">
//           {unreadCount} Pesan
//         </span>
//       )}
//     </Link>
//   )}

//           {/* PARTNER BISNIS */}
//           {canAccess("business_partners") && (
//             <Link
//               to="/admin/business-partners"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Business Partners" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/admin/business-partners") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/admin/business-partners") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Partner Bisnis</span>}
//             </Link>
//           )}

//           {/* ULASAN */}
//           {canAccess("reviews") && (
//             <Link
//               to="/admin/reviews"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Ulasan Pelanggan" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/reviews") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/reviews") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Ulasan</span>}
//             </Link>
//           )}

//           {/* EVENTS */}
//           {canAccess("events") && (
//             <Link
//               to="/admin/events"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Event" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/admin/events") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/admin/events") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Events</span>}
//             </Link>
//           )}

//           {/* SUBSCRIBERS */}
//           {canAccess("subscribers") && (
//             <Link
//               to="/admin/subscribers"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Subscribers" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/subscribers") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/subscribers") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Subscribers</span>}
//             </Link>
//           )}

//           {/* SYSTEM LOGS */}
//           {canAccess("audit_logs") && (
//             <Link
//               to="/admin/audit-logs"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "System Logs" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/audit-logs") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/audit-logs") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">System Logs</span>}
//             </Link>
//           )}

//           {/* ACCESS POLICY (Hanya Superadmin) */}
//           {adminUser?.usertype === "superadmin" && (
//             <Link
//               to="/admin/access-policy"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Access Policy" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/access-policy") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/access-policy") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Access Policy</span>}
//             </Link>
//           )}

//           {/* SECTION ACCOUNTING */}
//           {(canAccess("coas") || canAccess("transfer_receive") || canAccess("suppliers") || canAccess("invoices")) && (
//             <div className="pt-2 mt-4 border-t border-gray-100">
//               {(isSidebarOpen || isMobileSidebarOpen) ? (
//                 <p className="px-4 mt-2 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-opacity duration-300">
//                   Accounting
//                 </p>
//               ) : (
//                 <div className="h-4 mt-2"></div>
//               )}

//               {canAccess("coas") && (
//                 <Link
//                   to="/admin/coas"
//                   title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Chart of Accounts" : ""}
//                   className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//                     pathname.includes("/coas") || pathname.includes("/category-coas")
//                       ? "bg-gycora-light text-gycora-dark"
//                       : "text-gray-700 hover:bg-gray-100"
//                   } ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//                 >
//                   <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/coas") || pathname.includes("/category-coas") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2-2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
//                   </svg>
//                   {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Chart of Accounts</span>}
//                 </Link>
//               )}

//               {canAccess("transfer_receive") && (
//                 <Link
//                   to="/admin/transfer-receive"
//                   title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Payments" : ""}
//                   className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//                     pathname.includes("/transfer-receive")
//                       ? "bg-gycora-light text-gycora-dark"
//                       : "text-gray-700 hover:bg-gray-100"
//                   } ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//                 >
//                   <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/transfer-receive") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
//                   </svg>
//                   {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Payments</span>}
//                 </Link>
//               )}

//               {canAccess("suppliers") && (
//                 <Link
//                   to="/admin/suppliers"
//                   title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Suppliers" : ""}
//                   className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//                     pathname.includes("/suppliers")
//                       ? "bg-gycora-light text-gycora-dark"
//                       : "text-gray-700 hover:bg-gray-100"
//                   } ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//                 >
//                   <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/suppliers") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                   </svg>
//                   {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Suppliers</span>}
//                 </Link>
//               )}

//               {canAccess("invoices") && (
//                 <Link
//                   to="/admin/invoices"
//                   title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Invoices" : ""}
//                   className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//                     pathname.includes("/invoices")
//                       ? "bg-gycora-light text-gycora-dark"
//                       : "text-gray-700 hover:bg-gray-100"
//                   } ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//                 >
//                   <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/invoices") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                   {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Invoices</span>}
//                 </Link>
//               )}
//             </div>
//           )}
//         </nav>

//         {/* Footer Sidebar (Logout) */}
//         <div className="p-4 border-t border-gray-100 shrink-0">
//           <button
//             onClick={handleLogout}
//             title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Logout" : ""}
//             className={`flex items-center gap-3 py-2 w-full text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium text-sm ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//             </svg>
//             {(isSidebarOpen || isMobileSidebarOpen) && <span>Logout</span>}
//           </button>
//         </div>
//       </aside>

//       {/* MAIN CONTENT AREA */}
//       <div className="flex flex-col flex-1 overflow-hidden">
//         {/* HEADER */}
//         <header className="z-0 flex items-center justify-between h-16 px-4 bg-white border-b border-gray-100 shadow-sm sm:px-6 shrink-0">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => {
//                 if (window.innerWidth < 768) {
//                   setIsMobileSidebarOpen(true);
//                 } else {
//                   setIsSidebarOpen(!isSidebarOpen);
//                 }
//               }}
//               className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gycora/20"
//               title="Toggle Sidebar"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>

//             <h2 className="hidden text-lg font-semibold text-gray-800 capitalize sm:block">
//               {pathname.split("/").pop() || "Dashboard"}
//             </h2>
//           </div>

//           <div className="flex items-center gap-4 md:gap-6">
//             {/* 👇 [PERBAIKAN] Tampilkan icon inbox hanya jika diizinkan (dan sudah terautentikasi) 👇 */}
//             {adminUser && canAccess("messages") && (
//               <button
//                 onClick={() => navigate("/admin/messages")}
//                 className="relative p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora"
//                 title="Pesan Masuk"
//               >
//                 <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>

//                 {unreadCount > 0 && (
//                   <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white translate-x-1 -translate-y-1 bg-red-500 rounded-full shadow-sm animate-pulse">
//                     {unreadCount > 99 ? "99+" : unreadCount}
//                   </span>
//                 )}
//               </button>
//             )}

//             <Link
//               to="/admin/profile"
//               className="flex items-center gap-3 p-1.5 transition-colors rounded-lg cursor-pointer hover:bg-gray-50"
//             >
//               <div className="hidden text-right sm:block">
//                 <p className="text-sm font-bold leading-tight text-gray-900">
//                   {adminUser?.first_name} {adminUser?.last_name}
//                 </p>
//                 <p className="text-xs font-medium text-gycora-dark uppercase tracking-widest mt-0.5">
//                   {adminUser?.usertype === "superadmin"
//                     ? "Super Admin"
//                     : "Staf Manajemen"}
//                 </p>
//               </div>
//               <img
//                 src={
//                   adminUser?.profile_image ||
//                   `https://ui-avatars.com/api/?name=${adminUser?.first_name}+${adminUser?.last_name}&background=059669&color=fff&bold=true`
//                 }
//                 alt="Profile Avatar"
//                 className="object-cover w-8 h-8 rounded-full shadow-sm sm:w-10 sm:h-10 ring-2 ring-gycora-light"
//                 onError={(e) => {
//                   e.currentTarget.src = `https://ui-avatars.com/api/?name=${adminUser?.first_name}+${adminUser?.last_name}&background=059669&color=fff&bold=true`;
//                 }}
//               />
//             </Link>
//           </div>
//         </header>

//         <main className="flex-1 p-4 overflow-y-auto bg-gray-50/50 md:p-6 custom-scrollbar">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

// /* eslint-disable react-hooks/set-state-in-effect */
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import logoGycora from "../../assets/gycora_logo.png";
// import { useMessage } from "../../context/MessageContext";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
//   const [isAuthorized, setIsAuthorized] = useState(false);

//   const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
//   const [isClinicMenuOpen, setIsClinicMenuOpen] = useState(false);

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [adminUser, setAdminUser] = useState<any>(null);
//   const [allowedModules, setAllowedModules] = useState<string[]>([]);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const pathname = location.pathname;

//   const { unreadCount, fetchUnreadMessages } = useMessage();

//   useEffect(() => {
//     if (pathname === "/admin/login") {
//       setIsAuthorized(true);
//       return;
//     }

//     const token = localStorage.getItem("admin_token");
//     const userStr = localStorage.getItem("admin_user");

//     if (!token || !userStr) {
//       navigate("/admin/login", { replace: true });
//       return;
//     }

//     const user = JSON.parse(userStr);
//     const allowedRoles = ["admin", "superadmin", "gudang", "accounting", "cs"];

//     if (!allowedRoles.includes(user.usertype)) {
//       Swal.fire(
//         "Akses Ditolak",
//         "Halaman ini khusus untuk Staf Manajemen.",
//         "error",
//       );
//       navigate("/login", { replace: true });
//       return;
//     }

//     setAdminUser(user);
//     fetchUnreadMessages(); // Dipanggil pertama kali saat layout diload

//     let currentAllowed: string[] = [];
//     try {
//       const policiesStr = localStorage.getItem("admin_access_policies");
//       if (policiesStr) {
//         const policies = JSON.parse(policiesStr);
//         if (user.usertype !== "superadmin") {
//           currentAllowed = policies[user.usertype] || [];
//           setAllowedModules(currentAllowed);
//         }
//       }
//     } catch (error) {
//       console.error("Gagal membaca kebijakan akses:", error);
//     }

//     if (user.usertype !== "superadmin") {
//       const routeMap: Record<string, string> = {
//         "/admin/dashboard": "dashboard",
//         "/admin/categories": "categories",
//         "/admin/products": "products",
//         "/admin/stocks": "stocks",
//         "/admin/treatments": "treatments",
//         "/admin/transactions": "transactions",
//         "/admin/sales-report": "sales_report",
//         "/admin/users": "users",
//         "/admin/messages": "messages", 
//         "/admin/business-partners": "business_partners",
//         "/admin/reviews": "reviews",
//         "/admin/events": "events",
//         "/admin/subscribers": "subscribers",
//         "/admin/audit-logs": "audit_logs",
//         "/admin/coas": "coas",
//         "/admin/transfer-receive": "transfer_receive",
//         "/admin/suppliers": "suppliers",
//         "/admin/invoices": "invoices",
//       };

//       let requiredModule: string | null = null;
//       for (const [route, module] of Object.entries(routeMap)) {
//         if (pathname.startsWith(route)) {
//           requiredModule = module;
//           break;
//         }
//       }

//       if (requiredModule && !currentAllowed.includes(requiredModule)) {
//         const orderedModules = Object.values(routeMap);
//         const firstAllowedModule = orderedModules.find((m) =>
//           currentAllowed.includes(m),
//         );

//         if (firstAllowedModule) {
//           const fallbackRoute = Object.keys(routeMap).find(
//             (key) => routeMap[key] === firstAllowedModule,
//           );
//           if (fallbackRoute) {
//             navigate(fallbackRoute, { replace: true });
//             return;
//           }
//         } else {
//           navigate("/admin/profile", { replace: true });
//           return;
//         }
//       }
//     }

//     setIsAuthorized(true);
//   }, [pathname, navigate, fetchUnreadMessages]);

//   useEffect(() => {
//     if (
//       pathname.includes("/admin/products") ||
//       pathname.includes("/admin/stocks")
//     ) {
//       setIsProductMenuOpen(true);
//     }
//     if (pathname.includes("/admin/treatments")) {
//       setIsClinicMenuOpen(true);
//     }
//   }, [pathname]);

//   useEffect(() => {
//     setIsMobileSidebarOpen(false);
//   }, [pathname]);

//   // 👇 PERBAIKAN: Menambahkan Listener Global agar Context otomatis mengupdate diri
//   useEffect(() => {
//     window.addEventListener("refresh-admin-chat-badge", fetchUnreadMessages);
//     return () => window.removeEventListener("refresh-admin-chat-badge", fetchUnreadMessages);
//   }, [fetchUnreadMessages]);

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Keluar dari Portal?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Ya, Keluar",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("admin_token");
//         localStorage.removeItem("admin_user");
//         navigate("/admin/login");
//       }
//     });
//   };

//   const canAccess = (moduleKey: string) => {
//     if (!adminUser) return false;
//     if (adminUser.usertype === "superadmin") return true; 
//     return allowedModules.includes(moduleKey);
//   };

//   if (!isAuthorized) {
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">
//         <div className="w-8 h-8 border-4 rounded-full border-gycora/30 border-t-gycora animate-spin"></div>
//       </div>
//     );
//   }

//   if (pathname === "/admin/login") {
//     return <>{children}</>;
//   }

//   const isProductsActive =
//     pathname === "/admin/products" ||
//     pathname.includes("/admin/products/create") ||
//     (pathname.includes("/admin/products/") && !pathname.includes("stocks"));
//   const isStocksActive = pathname.includes("/admin/stocks");
//   const isAnyProductSubmenuActive = isProductsActive || isStocksActive;

//   const isTreatmentsActive = pathname.includes("/admin/treatments");

//   const hasMainMenuAccess =
//     canAccess("dashboard") ||
//     canAccess("categories") ||
//     canAccess("products") ||
//     canAccess("stocks") ||
//     canAccess("treatments") ||
//     canAccess("transactions") ||
//     canAccess("sales_report") ||
//     canAccess("users") ||
//     canAccess("business_partners") ||
//     canAccess("reviews") ||
//     canAccess("events") ||
//     canAccess("subscribers") ||
//     canAccess("audit_logs") ||
//     adminUser?.usertype === "superadmin";

//   return (
//     <div className="relative flex h-screen overflow-hidden font-sans bg-gray-50">
      
//       {/* BACKDROP OVERLAY KHUSUS MOBILE */}
//       {isMobileSidebarOpen && (
//         <div 
//           className="fixed inset-0 z-40 transition-opacity md:hidden bg-black/50 backdrop-blur-sm"
//           onClick={() => setIsMobileSidebarOpen(false)}
//         ></div>
//       )}

//       {/* SIDEBAR */}
//       <aside
//         className={`
//           fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-gray-200 shadow-xl md:shadow-sm transition-all duration-300 ease-in-out
//           ${isSidebarOpen ? "md:w-64" : "md:w-20"} 
//           ${isMobileSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0"}
//           md:relative
//         `}
//       >
//         <div
//           className={`h-16 flex items-center justify-between border-b border-gray-100 overflow-hidden whitespace-nowrap transition-all duration-300 ${isSidebarOpen || isMobileSidebarOpen ? "px-6" : "justify-center px-0"}`}
//         >
//           <div className="flex items-center">
//             <img
//               src={logoGycora}
//               alt="Gycora Logo"
//               className={`object-contain transition-all duration-300 ${isSidebarOpen || isMobileSidebarOpen ? "h-8" : "h-6"}`}
//             />
//             {(isSidebarOpen || isMobileSidebarOpen) && (
//               <span className="mt-1 ml-2 text-[10px] font-bold tracking-widest text-gycora uppercase">
//                 Admin
//               </span>
//             )}
//           </div>
          
//           <button 
//             className="p-1 text-gray-400 md:hidden hover:text-black"
//             onClick={() => setIsMobileSidebarOpen(false)}
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//           </button>
//         </div>

//         <nav className="flex-1 p-4 space-y-2 overflow-x-hidden overflow-y-auto custom-scrollbar">
          
//           {hasMainMenuAccess && (
//             <>
//               {(isSidebarOpen || isMobileSidebarOpen) ? (
//                 <p className="px-4 mt-2 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-opacity duration-300">
//                   Menu Utama
//                 </p>
//               ) : (
//                 <div className="h-4 mt-2"></div>
//               )}
//             </>
//           )}

//           {/* DASHBOARD */}
//           {canAccess("dashboard") && (
//             <Link
//               to="/admin/dashboard"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Dashboard" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/dashboard") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/dashboard") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Dashboard</span>}
//             </Link>
//           )}

//           {/* KATEGORI */}
//           {canAccess("categories") && (
//             <Link
//               to="/admin/categories"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Kategori" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/categories") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/categories") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Kategori</span>}
//             </Link>
//           )}

//           {/* DROPDOWN PRODUK */}
//           {(canAccess("products") || canAccess("stocks")) && (
//             <div className="flex flex-col">
//               <button
//                 onClick={() => {
//                   if (!isSidebarOpen && !isMobileSidebarOpen) setIsSidebarOpen(true);
//                   setIsProductMenuOpen(!isProductMenuOpen);
//                 }}
//                 title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Produk" : ""}
//                 className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${isAnyProductSubmenuActive ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//               >
//                 <div className="flex items-center gap-3">
//                   <svg className={`w-6 h-6 shrink-0 transition-colors ${isAnyProductSubmenuActive ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//                   </svg>
//                   {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Produk</span>}
//                 </div>
//                 {(isSidebarOpen || isMobileSidebarOpen) && (
//                   <svg className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 )}
//               </button>
//               <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isProductMenuOpen && (isSidebarOpen || isMobileSidebarOpen) ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
//                 <div className="flex flex-col pl-2 space-y-1 border-l-2 border-gray-100 ml-11">
//                   {canAccess("products") && (
//                     <Link to="/admin/products" className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isProductsActive ? "text-gycora bg-emerald-50/50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}>Katalog Utama</Link>
//                   )}
//                   {canAccess("stocks") && (
//                     <Link to="/admin/stocks" className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isStocksActive ? "text-gycora bg-emerald-50/50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}>Stok & Batch Gudang</Link>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* MENU KLINIK */}
//           {canAccess("treatments") && (
//             <div className="flex flex-col">
//               <button
//                 onClick={() => {
//                   if (!isSidebarOpen && !isMobileSidebarOpen) setIsSidebarOpen(true);
//                   setIsClinicMenuOpen(!isClinicMenuOpen);
//                 }}
//                 title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Klinik" : ""}
//                 className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${isTreatmentsActive ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//               >
//                 <div className="flex items-center gap-3">
//                   <svg className={`w-6 h-6 shrink-0 transition-colors ${isTreatmentsActive ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
//                   </svg>
//                   {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Klinik</span>}
//                 </div>
//                 {(isSidebarOpen || isMobileSidebarOpen) && (
//                   <svg className={`w-4 h-4 transition-transform duration-200 ${isClinicMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 )}
//               </button>
//               <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isClinicMenuOpen && (isSidebarOpen || isMobileSidebarOpen) ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
//                 <div className="flex flex-col pl-2 space-y-1 border-l-2 border-gray-100 ml-11">
//                   <Link to="/admin/treatments" className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isTreatmentsActive ? "text-gycora bg-emerald-50/50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}>Daftar Treatment</Link>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* TRANSAKSI */}
//           {canAccess("transactions") && (
//             <Link
//               to="/admin/transactions"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Transaksi" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/transactions") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/transactions") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Transaksi</span>}
//             </Link>
//           )}

//           {/* LAPORAN PENJUALAN */}
//           {canAccess("sales_report") && (
//             <Link
//               to="/admin/sales-report"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Laporan Penjualan" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/sales-report") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/sales-report") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Laporan</span>}
//             </Link>
//           )}

//           {/* PELANGGAN */}
//           {canAccess("users") && (
//             <Link
//               to="/admin/users"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Pelanggan" : ""}
//               className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/users") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <div className="flex items-center gap-3">
//                 <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/users") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//                 </svg>
//                 {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Pelanggan</span>}
//               </div>
              
//               {/* 👇 BADGE DI MENU SIDEBAR 👇 */}
//               {unreadCount > 0 && (isSidebarOpen || isMobileSidebarOpen) && (
//                 <span className="px-2 py-0.5 ml-2 text-[10px] font-bold text-white bg-red-600 rounded-full shadow-sm whitespace-nowrap animate-pulse">
//                   {unreadCount} Pesan
//                 </span>
//               )}
//             </Link>
//           )}

//           {/* PARTNER BISNIS */}
//           {canAccess("business_partners") && (
//             <Link
//               to="/admin/business-partners"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Business Partners" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/admin/business-partners") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/admin/business-partners") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Partner Bisnis</span>}
//             </Link>
//           )}

//           {/* ULASAN */}
//           {canAccess("reviews") && (
//             <Link
//               to="/admin/reviews"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Ulasan Pelanggan" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/reviews") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/reviews") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Ulasan</span>}
//             </Link>
//           )}

//           {/* EVENTS */}
//           {canAccess("events") && (
//             <Link
//               to="/admin/events"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Event" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/admin/events") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/admin/events") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Events</span>}
//             </Link>
//           )}

//           {/* SUBSCRIBERS */}
//           {canAccess("subscribers") && (
//             <Link
//               to="/admin/subscribers"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Subscribers" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/subscribers") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/subscribers") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Subscribers</span>}
//             </Link>
//           )}

//           {/* SYSTEM LOGS */}
//           {canAccess("audit_logs") && (
//             <Link
//               to="/admin/audit-logs"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "System Logs" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/audit-logs") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/audit-logs") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">System Logs</span>}
//             </Link>
//           )}

//           {/* ACCESS POLICY (Hanya Superadmin) */}
//           {adminUser?.usertype === "superadmin" && (
//             <Link
//               to="/admin/access-policy"
//               title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Access Policy" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/access-policy") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/access-policy") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//               </svg>
//               {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Access Policy</span>}
//             </Link>
//           )}

//           {/* SECTION ACCOUNTING */}
//           {(canAccess("coas") || canAccess("transfer_receive") || canAccess("suppliers") || canAccess("invoices")) && (
//             <div className="pt-2 mt-4 border-t border-gray-100">
//               {(isSidebarOpen || isMobileSidebarOpen) ? (
//                 <p className="px-4 mt-2 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-opacity duration-300">
//                   Accounting
//                 </p>
//               ) : (
//                 <div className="h-4 mt-2"></div>
//               )}

//               {canAccess("coas") && (
//                 <Link
//                   to="/admin/coas"
//                   title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Chart of Accounts" : ""}
//                   className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//                     pathname.includes("/coas") || pathname.includes("/category-coas")
//                       ? "bg-gycora-light text-gycora-dark"
//                       : "text-gray-700 hover:bg-gray-100"
//                   } ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//                 >
//                   <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/coas") || pathname.includes("/category-coas") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2-2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
//                   </svg>
//                   {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Chart of Accounts</span>}
//                 </Link>
//               )}

//               {canAccess("transfer_receive") && (
//                 <Link
//                   to="/admin/transfer-receive"
//                   title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Payments" : ""}
//                   className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//                     pathname.includes("/transfer-receive")
//                       ? "bg-gycora-light text-gycora-dark"
//                       : "text-gray-700 hover:bg-gray-100"
//                   } ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//                 >
//                   <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/transfer-receive") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
//                   </svg>
//                   {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Payments</span>}
//                 </Link>
//               )}

//               {canAccess("suppliers") && (
//                 <Link
//                   to="/admin/suppliers"
//                   title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Suppliers" : ""}
//                   className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//                     pathname.includes("/suppliers")
//                       ? "bg-gycora-light text-gycora-dark"
//                       : "text-gray-700 hover:bg-gray-100"
//                   } ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//                 >
//                   <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/suppliers") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                   </svg>
//                   {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Suppliers</span>}
//                 </Link>
//               )}

//               {canAccess("invoices") && (
//                 <Link
//                   to="/admin/invoices"
//                   title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Invoices" : ""}
//                   className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//                     pathname.includes("/invoices")
//                       ? "bg-gycora-light text-gycora-dark"
//                       : "text-gray-700 hover:bg-gray-100"
//                   } ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//                 >
//                   <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/invoices") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                   {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Invoices</span>}
//                 </Link>
//               )}
//             </div>
//           )}
//         </nav>

//         {/* Footer Sidebar (Logout) */}
//         <div className="p-4 border-t border-gray-100 shrink-0">
//           <button
//             onClick={handleLogout}
//             title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Logout" : ""}
//             className={`flex items-center gap-3 py-2 w-full text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium text-sm ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//             </svg>
//             {(isSidebarOpen || isMobileSidebarOpen) && <span>Logout</span>}
//           </button>
//         </div>
//       </aside>

//       {/* MAIN CONTENT AREA */}
//       <div className="flex flex-col flex-1 overflow-hidden">
//         {/* HEADER */}
//         <header className="z-0 flex items-center justify-between h-16 px-4 bg-white border-b border-gray-100 shadow-sm sm:px-6 shrink-0">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => {
//                 if (window.innerWidth < 768) {
//                   setIsMobileSidebarOpen(true);
//                 } else {
//                   setIsSidebarOpen(!isSidebarOpen);
//                 }
//               }}
//               className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gycora/20"
//               title="Toggle Sidebar"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>

//             <h2 className="hidden text-lg font-semibold text-gray-800 capitalize sm:block">
//               {pathname.split("/").pop() || "Dashboard"}
//             </h2>
//           </div>

//           <div className="flex items-center gap-4 md:gap-6">
//             {adminUser && canAccess("messages") && (
//               <button
//                 onClick={() => navigate("/admin/messages")}
//                 className="relative p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora"
//                 title="Pesan Masuk"
//               >
//                 <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>

//                 {unreadCount > 0 && (
//                   <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white translate-x-1 -translate-y-1 bg-red-500 rounded-full shadow-sm animate-pulse">
//                     {unreadCount > 99 ? "99+" : unreadCount}
//                   </span>
//                 )}
//               </button>
//             )}

//             <Link
//               to="/admin/profile"
//               className="flex items-center gap-3 p-1.5 transition-colors rounded-lg cursor-pointer hover:bg-gray-50"
//             >
//               <div className="hidden text-right sm:block">
//                 <p className="text-sm font-bold leading-tight text-gray-900">
//                   {adminUser?.first_name} {adminUser?.last_name}
//                 </p>
//                 <p className="text-xs font-medium text-gycora-dark uppercase tracking-widest mt-0.5">
//                   {adminUser?.usertype === "superadmin"
//                     ? "Super Admin"
//                     : "Staf Manajemen"}
//                 </p>
//               </div>
//               <img
//                 src={
//                   adminUser?.profile_image ||
//                   `https://ui-avatars.com/api/?name=${adminUser?.first_name}+${adminUser?.last_name}&background=059669&color=fff&bold=true`
//                 }
//                 alt="Profile Avatar"
//                 className="object-cover w-8 h-8 rounded-full shadow-sm sm:w-10 sm:h-10 ring-2 ring-gycora-light"
//                 onError={(e) => {
//                   e.currentTarget.src = `https://ui-avatars.com/api/?name=${adminUser?.first_name}+${adminUser?.last_name}&background=059669&color=fff&bold=true`;
//                 }}
//               />
//             </Link>
//           </div>
//         </header>

//         <main className="flex-1 p-4 overflow-y-auto bg-gray-50/50 md:p-6 custom-scrollbar">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

/* eslint-disable react-hooks/set-state-in-effect */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import logoGycora from "../../assets/gycora_logo.png";
import { useMessage } from "../../context/MessageContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [isClinicMenuOpen, setIsClinicMenuOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [adminUser, setAdminUser] = useState<any>(null);
  const [allowedModules, setAllowedModules] = useState<string[]>([]);

  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const { unreadCount, fetchUnreadMessages } = useMessage();

  useEffect(() => {
    if (pathname === "/admin/login") {
      setIsAuthorized(true);
      return;
    }

    const token = localStorage.getItem("admin_token");
    const userStr = localStorage.getItem("admin_user");

    if (!token || !userStr) {
      navigate("/admin/login", { replace: true });
      return;
    }

    const user = JSON.parse(userStr);
    const allowedRoles = ["admin", "superadmin", "gudang", "accounting", "cs"];

    if (!allowedRoles.includes(user.usertype)) {
      Swal.fire(
        "Akses Ditolak",
        "Halaman ini khusus untuk Staf Manajemen.",
        "error",
      );
      navigate("/login", { replace: true });
      return;
    }

    setAdminUser(user);
    fetchUnreadMessages(); // Dipanggil pertama kali saat layout diload

    let currentAllowed: string[] = [];
    try {
      const policiesStr = localStorage.getItem("admin_access_policies");
      if (policiesStr) {
        const policies = JSON.parse(policiesStr);
        if (user.usertype !== "superadmin") {
          currentAllowed = policies[user.usertype] || [];
          setAllowedModules(currentAllowed);
        }
      }
    } catch (error) {
      console.error("Gagal membaca kebijakan akses:", error);
    }

    if (user.usertype !== "superadmin") {
      const routeMap: Record<string, string> = {
        "/admin/dashboard": "dashboard",
        "/admin/categories": "categories",
        "/admin/products": "products",
        "/admin/stocks": "stocks",
        "/admin/treatments": "treatments",
        "/admin/transactions": "transactions",
        "/admin/sales-report": "sales_report",
        "/admin/users": "users",
        "/admin/messages": "messages", 
        "/admin/business-partners": "business_partners",
        "/admin/reviews": "reviews",
        "/admin/events": "events",
        // 👇 [BARU] Mendaftarkan modul dynamic_promos 👇
        "/admin/dynamic-promos": "dynamic_promos",
        "/admin/subscribers": "subscribers",
        "/admin/audit-logs": "audit_logs",
        "/admin/coas": "coas",
        "/admin/transfer-receive": "transfer_receive",
        "/admin/suppliers": "suppliers",
        "/admin/invoices": "invoices",
      };

      let requiredModule: string | null = null;
      for (const [route, module] of Object.entries(routeMap)) {
        if (pathname.startsWith(route)) {
          requiredModule = module;
          break;
        }
      }

      if (requiredModule && !currentAllowed.includes(requiredModule)) {
        const orderedModules = Object.values(routeMap);
        const firstAllowedModule = orderedModules.find((m) =>
          currentAllowed.includes(m),
        );

        if (firstAllowedModule) {
          const fallbackRoute = Object.keys(routeMap).find(
            (key) => routeMap[key] === firstAllowedModule,
          );
          if (fallbackRoute) {
            navigate(fallbackRoute, { replace: true });
            return;
          }
        } else {
          navigate("/admin/profile", { replace: true });
          return;
        }
      }
    }

    setIsAuthorized(true);
  }, [pathname, navigate, fetchUnreadMessages]);

  useEffect(() => {
    if (
      pathname.includes("/admin/products") ||
      pathname.includes("/admin/stocks")
    ) {
      setIsProductMenuOpen(true);
    }
    if (pathname.includes("/admin/treatments")) {
      setIsClinicMenuOpen(true);
    }
  }, [pathname]);

  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("refresh-admin-chat-badge", fetchUnreadMessages);
    return () => window.removeEventListener("refresh-admin-chat-badge", fetchUnreadMessages);
  }, [fetchUnreadMessages]);

  const handleLogout = () => {
    Swal.fire({
      title: "Keluar dari Portal?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Keluar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_user");
        navigate("/admin/login");
      }
    });
  };

  const canAccess = (moduleKey: string) => {
    if (!adminUser) return false;
    if (adminUser.usertype === "superadmin") return true; 
    return allowedModules.includes(moduleKey);
  };

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">
        <div className="w-8 h-8 border-4 rounded-full border-gycora/30 border-t-gycora animate-spin"></div>
      </div>
    );
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const isProductsActive =
    pathname === "/admin/products" ||
    pathname.includes("/admin/products/create") ||
    (pathname.includes("/admin/products/") && !pathname.includes("stocks"));
  const isStocksActive = pathname.includes("/admin/stocks");
  const isAnyProductSubmenuActive = isProductsActive || isStocksActive;

  const isTreatmentsActive = pathname.includes("/admin/treatments");

  const hasMainMenuAccess =
    canAccess("dashboard") ||
    canAccess("categories") ||
    canAccess("products") ||
    canAccess("stocks") ||
    canAccess("treatments") ||
    canAccess("transactions") ||
    canAccess("sales_report") ||
    canAccess("users") ||
    canAccess("business_partners") ||
    canAccess("reviews") ||
    canAccess("events") ||
    canAccess("dynamic_promos") || // 👇 [BARU] Izin menu utama
    canAccess("subscribers") ||
    canAccess("audit_logs") ||
    adminUser?.usertype === "superadmin";

  return (
    <div className="relative flex h-screen overflow-hidden font-sans bg-gray-50">
      
      {/* BACKDROP OVERLAY KHUSUS MOBILE */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 transition-opacity md:hidden bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileSidebarOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-gray-200 shadow-xl md:shadow-sm transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "md:w-64" : "md:w-20"} 
          ${isMobileSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0"}
          md:relative
        `}
      >
        <div
          className={`h-16 flex items-center justify-between border-b border-gray-100 overflow-hidden whitespace-nowrap transition-all duration-300 ${isSidebarOpen || isMobileSidebarOpen ? "px-6" : "justify-center px-0"}`}
        >
          <div className="flex items-center">
            <img
              src={logoGycora}
              alt="Gycora Logo"
              className={`object-contain transition-all duration-300 ${isSidebarOpen || isMobileSidebarOpen ? "h-8" : "h-6"}`}
            />
            {(isSidebarOpen || isMobileSidebarOpen) && (
              <span className="mt-1 ml-2 text-[10px] font-bold tracking-widest text-gycora uppercase">
                Admin
              </span>
            )}
          </div>
          
          <button 
            className="p-1 text-gray-400 md:hidden hover:text-black"
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-x-hidden overflow-y-auto custom-scrollbar">
          
          {hasMainMenuAccess && (
            <>
              {(isSidebarOpen || isMobileSidebarOpen) ? (
                <p className="px-4 mt-2 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-opacity duration-300">
                  Menu Utama
                </p>
              ) : (
                <div className="h-4 mt-2"></div>
              )}
            </>
          )}

          {/* DASHBOARD */}
          {canAccess("dashboard") && (
            <Link
              to="/admin/dashboard"
              title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Dashboard" : ""}
              className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/dashboard") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
            >
              <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/dashboard") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Dashboard</span>}
            </Link>
          )}

          {/* KATEGORI */}
          {canAccess("categories") && (
            <Link
              to="/admin/categories"
              title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Kategori" : ""}
              className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/categories") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
            >
              <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/categories") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Kategori</span>}
            </Link>
          )}

          {/* DROPDOWN PRODUK */}
          {(canAccess("products") || canAccess("stocks")) && (
            <div className="flex flex-col">
              <button
                onClick={() => {
                  if (!isSidebarOpen && !isMobileSidebarOpen) setIsSidebarOpen(true);
                  setIsProductMenuOpen(!isProductMenuOpen);
                }}
                title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Produk" : ""}
                className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${isAnyProductSubmenuActive ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
              >
                <div className="flex items-center gap-3">
                  <svg className={`w-6 h-6 shrink-0 transition-colors ${isAnyProductSubmenuActive ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Produk</span>}
                </div>
                {(isSidebarOpen || isMobileSidebarOpen) && (
                  <svg className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isProductMenuOpen && (isSidebarOpen || isMobileSidebarOpen) ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
                <div className="flex flex-col pl-2 space-y-1 border-l-2 border-gray-100 ml-11">
                  {canAccess("products") && (
                    <Link to="/admin/products" className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isProductsActive ? "text-gycora bg-emerald-50/50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}>Katalog Utama</Link>
                  )}
                  {canAccess("stocks") && (
                    <Link to="/admin/stocks" className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isStocksActive ? "text-gycora bg-emerald-50/50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}>Stok & Batch Gudang</Link>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* MENU KLINIK */}
          {canAccess("treatments") && (
            <div className="flex flex-col">
              <button
                onClick={() => {
                  if (!isSidebarOpen && !isMobileSidebarOpen) setIsSidebarOpen(true);
                  setIsClinicMenuOpen(!isClinicMenuOpen);
                }}
                title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Klinik" : ""}
                className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${isTreatmentsActive ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
              >
                <div className="flex items-center gap-3">
                  <svg className={`w-6 h-6 shrink-0 transition-colors ${isTreatmentsActive ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Klinik</span>}
                </div>
                {(isSidebarOpen || isMobileSidebarOpen) && (
                  <svg className={`w-4 h-4 transition-transform duration-200 ${isClinicMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isClinicMenuOpen && (isSidebarOpen || isMobileSidebarOpen) ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
                <div className="flex flex-col pl-2 space-y-1 border-l-2 border-gray-100 ml-11">
                  <Link to="/admin/treatments" className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isTreatmentsActive ? "text-gycora bg-emerald-50/50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}>Daftar Treatment</Link>
                </div>
              </div>
            </div>
          )}

          {/* TRANSAKSI */}
          {canAccess("transactions") && (
            <Link
              to="/admin/transactions"
              title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Transaksi" : ""}
              className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/transactions") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
            >
              <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/transactions") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Transaksi</span>}
            </Link>
          )}

          {/* LAPORAN PENJUALAN */}
          {canAccess("sales_report") && (
            <Link
              to="/admin/sales-report"
              title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Laporan Penjualan" : ""}
              className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/sales-report") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
            >
              <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/sales-report") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Laporan</span>}
            </Link>
          )}

          {/* PELANGGAN */}
          {canAccess("users") && (
            <Link
              to="/admin/users"
              title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Pelanggan" : ""}
              className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/users") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
            >
              <div className="flex items-center gap-3">
                <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/users") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Pelanggan</span>}
              </div>
              
              {unreadCount > 0 && (isSidebarOpen || isMobileSidebarOpen) && (
                <span className="px-2 py-0.5 ml-2 text-[10px] font-bold text-white bg-red-600 rounded-full shadow-sm whitespace-nowrap animate-pulse">
                  {unreadCount} Pesan
                </span>
              )}
            </Link>
          )}

          {/* PARTNER BISNIS */}
          {canAccess("business_partners") && (
            <Link
              to="/admin/business-partners"
              title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Business Partners" : ""}
              className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/admin/business-partners") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
            >
              <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/admin/business-partners") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Partner Bisnis</span>}
            </Link>
          )}

          {/* ULASAN */}
          {canAccess("reviews") && (
            <Link
              to="/admin/reviews"
              title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Ulasan Pelanggan" : ""}
              className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/reviews") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
            >
              <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/reviews") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Ulasan</span>}
            </Link>
          )}

          {/* EVENTS */}
          {canAccess("events") && (
            <Link
              to="/admin/events"
              title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Event" : ""}
              className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/admin/events") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
            >
              <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/admin/events") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Events</span>}
            </Link>
          )}

          {/* 👇 [BARU] PROMO DINAMIS 👇 */}
          {canAccess("dynamic_promos") && (
            <Link
              to="/admin/dynamic-promos"
              title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Promo Dinamis" : ""}
              className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/dynamic-promos") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
            >
              <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/dynamic-promos") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Promo Dinamis</span>}
            </Link>
          )}

          {/* SUBSCRIBERS */}
          {canAccess("subscribers") && (
            <Link
              to="/admin/subscribers"
              title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Subscribers" : ""}
              className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/subscribers") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
            >
              <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/subscribers") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Subscribers</span>}
            </Link>
          )}

          {/* SYSTEM LOGS */}
          {canAccess("audit_logs") && (
            <Link
              to="/admin/audit-logs"
              title={(!isSidebarOpen && !isMobileSidebarOpen) ? "System Logs" : ""}
              className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/audit-logs") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
            >
              <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/audit-logs") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">System Logs</span>}
            </Link>
          )}

          {/* ACCESS POLICY (Hanya Superadmin) */}
          {adminUser?.usertype === "superadmin" && (
            <Link
              to="/admin/access-policy"
              title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Access Policy" : ""}
              className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/access-policy") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
            >
              <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/access-policy") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Access Policy</span>}
            </Link>
          )}

          {/* SECTION ACCOUNTING */}
          {(canAccess("coas") || canAccess("transfer_receive") || canAccess("suppliers") || canAccess("invoices")) && (
            <div className="pt-2 mt-4 border-t border-gray-100">
              {(isSidebarOpen || isMobileSidebarOpen) ? (
                <p className="px-4 mt-2 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-opacity duration-300">
                  Accounting
                </p>
              ) : (
                <div className="h-4 mt-2"></div>
              )}

              {canAccess("coas") && (
                <Link
                  to="/admin/coas"
                  title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Chart of Accounts" : ""}
                  className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
                    pathname.includes("/coas") || pathname.includes("/category-coas")
                      ? "bg-gycora-light text-gycora-dark"
                      : "text-gray-700 hover:bg-gray-100"
                  } ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
                >
                  <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/coas") || pathname.includes("/category-coas") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2-2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Chart of Accounts</span>}
                </Link>
              )}

              {canAccess("transfer_receive") && (
                <Link
                  to="/admin/transfer-receive"
                  title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Payments" : ""}
                  className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
                    pathname.includes("/transfer-receive")
                      ? "bg-gycora-light text-gycora-dark"
                      : "text-gray-700 hover:bg-gray-100"
                  } ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
                >
                  <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/transfer-receive") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Payments</span>}
                </Link>
              )}

              {canAccess("suppliers") && (
                <Link
                  to="/admin/suppliers"
                  title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Suppliers" : ""}
                  className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
                    pathname.includes("/suppliers")
                      ? "bg-gycora-light text-gycora-dark"
                      : "text-gray-700 hover:bg-gray-100"
                  } ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
                >
                  <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/suppliers") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Suppliers</span>}
                </Link>
              )}

              {canAccess("invoices") && (
                <Link
                  to="/admin/invoices"
                  title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Invoices" : ""}
                  className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
                    pathname.includes("/invoices")
                      ? "bg-gycora-light text-gycora-dark"
                      : "text-gray-700 hover:bg-gray-100"
                  } ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
                >
                  <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/invoices") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {(isSidebarOpen || isMobileSidebarOpen) && <span className="truncate">Invoices</span>}
                </Link>
              )}
            </div>
          )}
        </nav>

        {/* Footer Sidebar (Logout) */}
        <div className="p-4 border-t border-gray-100 shrink-0">
          <button
            onClick={handleLogout}
            title={(!isSidebarOpen && !isMobileSidebarOpen) ? "Logout" : ""}
            className={`flex items-center gap-3 py-2 w-full text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium text-sm ${(isSidebarOpen || isMobileSidebarOpen) ? "px-4" : "justify-center px-0"}`}
          >
            <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {(isSidebarOpen || isMobileSidebarOpen) && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* HEADER */}
        <header className="z-0 flex items-center justify-between h-16 px-4 bg-white border-b border-gray-100 shadow-sm sm:px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (window.innerWidth < 768) {
                  setIsMobileSidebarOpen(true);
                } else {
                  setIsSidebarOpen(!isSidebarOpen);
                }
              }}
              className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gycora/20"
              title="Toggle Sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <h2 className="hidden text-lg font-semibold text-gray-800 capitalize sm:block">
              {pathname.split("/").pop() || "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            {adminUser && canAccess("messages") && (
              <button
                onClick={() => navigate("/admin/messages")}
                className="relative p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora"
                title="Pesan Masuk"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>

                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white translate-x-1 -translate-y-1 bg-red-500 rounded-full shadow-sm animate-pulse">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </button>
            )}

            <Link
              to="/admin/profile"
              className="flex items-center gap-3 p-1.5 transition-colors rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <div className="hidden text-right sm:block">
                <p className="text-sm font-bold leading-tight text-gray-900">
                  {adminUser?.first_name} {adminUser?.last_name}
                </p>
                <p className="text-xs font-medium text-gycora-dark uppercase tracking-widest mt-0.5">
                  {adminUser?.usertype === "superadmin"
                    ? "Super Admin"
                    : "Staf Manajemen"}
                </p>
              </div>
              <img
                src={
                  adminUser?.profile_image ||
                  `https://ui-avatars.com/api/?name=${adminUser?.first_name}+${adminUser?.last_name}&background=059669&color=fff&bold=true`
                }
                alt="Profile Avatar"
                className="object-cover w-8 h-8 rounded-full shadow-sm sm:w-10 sm:h-10 ring-2 ring-gycora-light"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${adminUser?.first_name}+${adminUser?.last_name}&background=059669&color=fff&bold=true`;
                }}
              />
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 overflow-y-auto bg-gray-50/50 md:p-6 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}