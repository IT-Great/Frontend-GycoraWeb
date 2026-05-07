/* eslint-disable react-hooks/set-state-in-effect */
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isAuthorized, setIsAuthorized] = useState(false);

//   // STATE BARU: Mengontrol buka/tutup dropdown menu Products
//   const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();

//   const pathname = location.pathname;

//   // =====================================================================
//   // [SOLUSI SATPAM] ROUTE GUARD (CLIENT-SIDE MIDDLEWARE)
//   // =====================================================================
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
//     const allowedRoles = ['admin', 'superadmin', 'gudang', 'accounting'];

//     if (!allowedRoles.includes(user.usertype)) {
//       Swal.fire("Akses Ditolak", "Halaman ini khusus untuk Staf Manajemen.", "error");
//       navigate("/login", { replace: true });
//       return;
//     }

//     setIsAuthorized(true);
//   }, [pathname, navigate]);

//   // Efek Samping: Buka otomatis dropdown menu jika user sedang berada di halaman turunan products
//   useEffect(() => {
//       if(pathname.includes('/admin/products') || pathname.includes('/admin/stocks')) {
//           setIsProductMenuOpen(true);
//       }
//   }, [pathname]);

//   const handleLogout = () => {
//     Swal.fire({
//       title: 'Keluar dari Portal?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Ya, Keluar'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("admin_token");
//         localStorage.removeItem("admin_user");
//         navigate("/admin/login");
//       }
//     });
//   };

//   if (!isAuthorized) {
//     return <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">Memverifikasi Akses...</div>;
//   }

//   if (pathname === "/admin/login") {
//     return <>{children}</>;
//   }

//   // Helper untuk menentukan apakah submenu aktif
//   const isProductsActive = pathname === '/admin/products' || pathname.includes('/admin/products/create') || pathname.includes('/admin/products/') && !pathname.includes('stocks');
//   const isStocksActive = pathname.includes('/admin/stocks');
//   const isAnyProductSubmenuActive = isProductsActive || isStocksActive;

//   return (
//     <div className="flex h-screen overflow-hidden font-sans bg-gray-50">

//       {/* SIDEBAR */}
//       <aside
//         className={`${
//           isSidebarOpen ? "w-64" : "w-20"
//         } bg-white border-r border-gray-200 flex flex-col shadow-sm z-10 transition-all duration-300 ease-in-out hidden md:flex`}
//       >

//         {/* Logo Area */}
//         <div className={`h-16 flex items-center border-b border-gray-100 overflow-hidden whitespace-nowrap transition-all duration-300 ${isSidebarOpen ? 'px-6' : 'justify-center px-0'}`}>
//           <span className="text-2xl font-extrabold tracking-tight text-gycora">
//             {isSidebarOpen ? "Gycora" : "G"}
//           </span>
//           {isSidebarOpen && (
//             <span className="mt-1 ml-2 text-sm font-medium text-gray-400">Admin</span>
//           )}
//         </div>

//         {/* Menu Navigasi */}
//         <nav className="flex-1 p-4 space-y-2 overflow-x-hidden overflow-y-auto custom-scrollbar">
//           {isSidebarOpen ? (
//              <p className="px-4 mt-4 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-opacity duration-300">
//                Menu Utama
//              </p>
//           ) : (
//             <div className="h-6 mt-4"></div>
//           )}

//           <Link
//             to="/admin/dashboard"
//             title={!isSidebarOpen ? "Dashboard" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/dashboard')
//                 ? "bg-gycora-light text-gycora-dark"
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/dashboard') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Dashboard</span>}
//           </Link>

//           <Link
//             to="/admin/categories"
//             title={!isSidebarOpen ? "Kategori" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/categories')
//                 ? "bg-gycora-light text-gycora-dark"
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/categories') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Kategori</span>}
//           </Link>

//           {/* ============================================================== */}
//           {/* MENU PRODUCTS (DROPDOWN / ACCORDION) */}
//           {/* ============================================================== */}
//           <div className="flex flex-col">
//               <button
//                 onClick={() => {
//                     if(!isSidebarOpen) setIsSidebarOpen(true);
//                     setIsProductMenuOpen(!isProductMenuOpen);
//                 }}
//                 title={!isSidebarOpen ? "Produk" : ""}
//                 className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${
//                   isAnyProductSubmenuActive
//                     ? "bg-gycora-light text-gycora-dark"
//                     : "text-gray-700 hover:bg-gray-100"
//                 } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//               >
//                 <div className="flex items-center gap-3">
//                     <svg className={`w-6 h-6 shrink-0 transition-colors ${isAnyProductSubmenuActive ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//                     </svg>
//                     {isSidebarOpen && <span className="truncate">Produk</span>}
//                 </div>
//                 {/* Ikon panah bawah/atas (Hanya tampil jika sidebar terbuka) */}
//                 {isSidebarOpen && (
//                     <svg className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                     </svg>
//                 )}
//               </button>

//               {/* Sub-menu Items (Tersembunyi jika sidebar ditutup atau state false) */}
//               <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isProductMenuOpen && isSidebarOpen ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
//                   <div className="flex flex-col pl-2 space-y-1 border-l-2 border-gray-100 ml-11">
//                       <Link
//                         to="/admin/products"
//                         className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isProductsActive ? 'text-gycora bg-emerald-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
//                       >
//                           Katalog Utama
//                       </Link>
//                       <Link
//                         to="/admin/stocks"
//                         className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isStocksActive ? 'text-gycora bg-emerald-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
//                       >
//                           Stok & Batch Gudang
//                       </Link>
//                   </div>
//               </div>
//           </div>
//           {/* ============================================================== */}

//           {/* ============================================================== */}
//           {/* MENU TRANSAKSI (BARU DITAMBAHKAN) */}
//           {/* ============================================================== */}
//           <Link
//             to="/admin/transactions"
//             title={!isSidebarOpen ? "Transaksi" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/transactions')
//                 ? "bg-gycora-light text-gycora-dark"
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/transactions') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Transaksi</span>}
//           </Link>

//           <Link
//             to="/admin/users"
//             title={!isSidebarOpen ? "Pelanggan" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/users')
//                 ? "bg-gycora-light text-gycora-dark"
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/users') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Pelanggan</span>}
//           </Link>
//         </nav>

//         {/* Footer Sidebar */}
//         <div className="p-4 border-t border-gray-100">
//           <button
//             onClick={handleLogout}
//             title={!isSidebarOpen ? "Logout" : ""}
//             className={`flex items-center gap-3 py-2 w-full text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium text-sm ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//             </svg>
//             {isSidebarOpen && <span>Logout</span>}
//           </button>
//         </div>
//       </aside>

//       {/* MAIN CONTENT AREA */}
//       <div className="flex flex-col flex-1 overflow-hidden">

//         {/* HEADER */}
//         <header className="z-0 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-100 shadow-sm">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gycora/20"
//               title="Toggle Sidebar"
//             >
//                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                </svg>
//             </button>

//              <h2 className="hidden text-lg font-semibold text-gray-800 capitalize sm:block">
//                 {pathname.split('/').pop() || 'Dashboard'}
//              </h2>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
//               <div className="hidden text-right sm:block">
//                 <p className="text-sm font-bold leading-tight text-gray-900">Admin Gycora</p>
//                 <p className="text-xs font-medium text-gycora-dark">Staf Manajemen</p>
//               </div>
//               <img
//                 src="https://ui-avatars.com/api/?name=Admin&background=059669&color=fff&bold=true"
//                 alt="Profile Avatar"
//                 className="object-cover rounded-full h-9 w-9 ring-2 ring-gycora-light"
//               />
//             </div>
//           </div>
//         </header>

//         {/* AREA KONTEN DINAMIS */}
//         <main className="flex-1 overflow-y-auto bg-gray-50/50">
//           {children}
//         </main>

//       </div>
//     </div>
//   );
// }

// /* eslint-disable react-hooks/set-state-in-effect */
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isAuthorized, setIsAuthorized] = useState(false);

//   // STATE BARU: Mengontrol buka/tutup dropdown menu Products
//   const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();

//   const pathname = location.pathname;

//   // =====================================================================
//   // [SOLUSI SATPAM] ROUTE GUARD (CLIENT-SIDE MIDDLEWARE)
//   // =====================================================================
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
//     const allowedRoles = ['admin', 'superadmin', 'gudang', 'accounting'];

//     if (!allowedRoles.includes(user.usertype)) {
//       Swal.fire("Akses Ditolak", "Halaman ini khusus untuk Staf Manajemen.", "error");
//       navigate("/login", { replace: true });
//       return;
//     }

//     setIsAuthorized(true);
//   }, [pathname, navigate]);

//   // Efek Samping: Buka otomatis dropdown menu jika user sedang berada di halaman turunan products
//   useEffect(() => {
//       if(pathname.includes('/admin/products') || pathname.includes('/admin/stocks')) {
//           setIsProductMenuOpen(true);
//       }
//   }, [pathname]);

//   const handleLogout = () => {
//     Swal.fire({
//       title: 'Keluar dari Portal?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Ya, Keluar'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("admin_token");
//         localStorage.removeItem("admin_user");
//         navigate("/admin/login");
//       }
//     });
//   };

//   if (!isAuthorized) {
//     return <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">Memverifikasi Akses...</div>;
//   }

//   if (pathname === "/admin/login") {
//     return <>{children}</>;
//   }

//   // Helper untuk menentukan apakah submenu aktif
//   const isProductsActive = pathname === '/admin/products' || pathname.includes('/admin/products/create') || pathname.includes('/admin/products/') && !pathname.includes('stocks');
//   const isStocksActive = pathname.includes('/admin/stocks');
//   const isAnyProductSubmenuActive = isProductsActive || isStocksActive;

//   return (
//     <div className="flex h-screen overflow-hidden font-sans bg-gray-50">

//       {/* SIDEBAR */}
//       <aside
//         className={`${
//           isSidebarOpen ? "w-64" : "w-20"
//         } bg-white border-r border-gray-200 flex flex-col shadow-sm z-10 transition-all duration-300 ease-in-out hidden md:flex`}
//       >

//         {/* Logo Area */}
//         <div className={`h-16 flex items-center border-b border-gray-100 overflow-hidden whitespace-nowrap transition-all duration-300 ${isSidebarOpen ? 'px-6' : 'justify-center px-0'}`}>
//           <span className="text-2xl font-extrabold tracking-tight text-gycora">
//             {isSidebarOpen ? "Gycora" : "G"}
//           </span>
//           {isSidebarOpen && (
//             <span className="mt-1 ml-2 text-sm font-medium text-gray-400">Admin</span>
//           )}
//         </div>

//         {/* Menu Navigasi */}
//         <nav className="flex-1 p-4 space-y-2 overflow-x-hidden overflow-y-auto custom-scrollbar">
//           {isSidebarOpen ? (
//              <p className="px-4 mt-4 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-opacity duration-300">
//                Menu Utama
//              </p>
//           ) : (
//             <div className="h-6 mt-4"></div>
//           )}

//           <Link
//             to="/admin/dashboard"
//             title={!isSidebarOpen ? "Dashboard" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/dashboard')
//                 ? "bg-gycora-light text-gycora-dark"
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/dashboard') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Dashboard</span>}
//           </Link>

//           <Link
//             to="/admin/categories"
//             title={!isSidebarOpen ? "Kategori" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/categories')
//                 ? "bg-gycora-light text-gycora-dark"
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/categories') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Kategori</span>}
//           </Link>

//           {/* ============================================================== */}
//           {/* MENU PRODUCTS (DROPDOWN / ACCORDION) */}
//           {/* ============================================================== */}
//           <div className="flex flex-col">
//               <button
//                 onClick={() => {
//                     if(!isSidebarOpen) setIsSidebarOpen(true);
//                     setIsProductMenuOpen(!isProductMenuOpen);
//                 }}
//                 title={!isSidebarOpen ? "Produk" : ""}
//                 className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${
//                   isAnyProductSubmenuActive
//                     ? "bg-gycora-light text-gycora-dark"
//                     : "text-gray-700 hover:bg-gray-100"
//                 } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//               >
//                 <div className="flex items-center gap-3">
//                     <svg className={`w-6 h-6 shrink-0 transition-colors ${isAnyProductSubmenuActive ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//                     </svg>
//                     {isSidebarOpen && <span className="truncate">Produk</span>}
//                 </div>
//                 {isSidebarOpen && (
//                     <svg className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                     </svg>
//                 )}
//               </button>

//               <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isProductMenuOpen && isSidebarOpen ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
//                   <div className="flex flex-col pl-2 space-y-1 border-l-2 border-gray-100 ml-11">
//                       <Link
//                         to="/admin/products"
//                         className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isProductsActive ? 'text-gycora bg-emerald-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
//                       >
//                           Katalog Utama
//                       </Link>
//                       <Link
//                         to="/admin/stocks"
//                         className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isStocksActive ? 'text-gycora bg-emerald-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
//                       >
//                           Stok & Batch Gudang
//                       </Link>
//                   </div>
//               </div>
//           </div>
//           {/* ============================================================== */}

//           {/* ============================================================== */}
//           {/* MENU TRANSAKSI */}
//           {/* ============================================================== */}
//           <Link
//             to="/admin/transactions"
//             title={!isSidebarOpen ? "Transaksi" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/transactions')
//                 ? "bg-gycora-light text-gycora-dark"
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/transactions') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Transaksi</span>}
//           </Link>

//           {/* ============================================================== */}
//           {/* MENU LAPORAN (SALES REPORT) */}
//           {/* ============================================================== */}
//           <Link
//             to="/admin/sales-report"
//             title={!isSidebarOpen ? "Laporan Penjualan" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/sales-report')
//                 ? "bg-gycora-light text-gycora-dark"
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/sales-report') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Laporan</span>}
//           </Link>

//           <Link
//             to="/admin/users"
//             title={!isSidebarOpen ? "Pelanggan" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/users')
//                 ? "bg-gycora-light text-gycora-dark"
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/users') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Pelanggan</span>}
//           </Link>
//         </nav>

//         {/* Footer Sidebar */}
//         <div className="p-4 border-t border-gray-100">
//           <button
//             onClick={handleLogout}
//             title={!isSidebarOpen ? "Logout" : ""}
//             className={`flex items-center gap-3 py-2 w-full text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium text-sm ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//             </svg>
//             {isSidebarOpen && <span>Logout</span>}
//           </button>
//         </div>
//       </aside>

//       {/* MAIN CONTENT AREA */}
//       <div className="flex flex-col flex-1 overflow-hidden">

//         {/* HEADER */}
//         <header className="z-0 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-100 shadow-sm">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gycora/20"
//               title="Toggle Sidebar"
//             >
//                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                </svg>
//             </button>

//              <h2 className="hidden text-lg font-semibold text-gray-800 capitalize sm:block">
//                 {pathname.split('/').pop() || 'Dashboard'}
//              </h2>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
//               <div className="hidden text-right sm:block">
//                 <p className="text-sm font-bold leading-tight text-gray-900">Admin Gycora</p>
//                 <p className="text-xs font-medium text-gycora-dark">Staf Manajemen</p>
//               </div>
//               <img
//                 src="https://ui-avatars.com/api/?name=Admin&background=059669&color=fff&bold=true"
//                 alt="Profile Avatar"
//                 className="object-cover rounded-full h-9 w-9 ring-2 ring-gycora-light"
//               />
//             </div>
//           </div>
//         </header>

//         {/* AREA KONTEN DINAMIS */}
//         <main className="flex-1 overflow-y-auto bg-gray-50/50">
//           {children}
//         </main>

//       </div>
//     </div>
//   );
// }

/* eslint-disable react-hooks/set-state-in-effect */
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isAuthorized, setIsAuthorized] = useState(false);

//   // STATE BARU: Mengontrol buka/tutup dropdown menu Products
//   const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();

//   const pathname = location.pathname;

//   // =====================================================================
//   // [SOLUSI SATPAM] ROUTE GUARD (CLIENT-SIDE MIDDLEWARE)
//   // =====================================================================
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
//     const allowedRoles = ['admin', 'superadmin', 'gudang', 'accounting'];

//     if (!allowedRoles.includes(user.usertype)) {
//       Swal.fire("Akses Ditolak", "Halaman ini khusus untuk Staf Manajemen.", "error");
//       navigate("/login", { replace: true });
//       return;
//     }

//     setIsAuthorized(true);
//   }, [pathname, navigate]);

//   // Efek Samping: Buka otomatis dropdown menu jika user sedang berada di halaman turunan products
//   useEffect(() => {
//       if(pathname.includes('/admin/products') || pathname.includes('/admin/stocks')) {
//           setIsProductMenuOpen(true);
//       }
//   }, [pathname]);

//   const handleLogout = () => {
//     Swal.fire({
//       title: 'Keluar dari Portal?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Ya, Keluar'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("admin_token");
//         localStorage.removeItem("admin_user");
//         navigate("/admin/login");
//       }
//     });
//   };

//   if (!isAuthorized) {
//     return <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">Memverifikasi Akses...</div>;
//   }

//   if (pathname === "/admin/login") {
//     return <>{children}</>;
//   }

//   // Helper untuk menentukan apakah submenu aktif
//   const isProductsActive = pathname === '/admin/products' || pathname.includes('/admin/products/create') || pathname.includes('/admin/products/') && !pathname.includes('stocks');
//   const isStocksActive = pathname.includes('/admin/stocks');
//   const isAnyProductSubmenuActive = isProductsActive || isStocksActive;

//   return (
//     <div className="flex h-screen overflow-hidden font-sans bg-gray-50">

//       {/* SIDEBAR */}
//       <aside
//         className={`${
//           isSidebarOpen ? "w-64" : "w-20"
//         } bg-white border-r border-gray-200 flex flex-col shadow-sm z-10 transition-all duration-300 ease-in-out hidden md:flex`}
//       >

//         {/* Logo Area */}
//         <div className={`h-16 flex items-center border-b border-gray-100 overflow-hidden whitespace-nowrap transition-all duration-300 ${isSidebarOpen ? 'px-6' : 'justify-center px-0'}`}>
//           <span className="text-2xl font-extrabold tracking-tight text-gycora">
//             {isSidebarOpen ? "Gycora" : "G"}
//           </span>
//           {isSidebarOpen && (
//             <span className="mt-1 ml-2 text-sm font-medium text-gray-400">Admin</span>
//           )}
//         </div>

//         {/* Menu Navigasi */}
//         <nav className="flex-1 p-4 space-y-2 overflow-x-hidden overflow-y-auto custom-scrollbar">
//           {isSidebarOpen ? (
//              <p className="px-4 mt-4 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-opacity duration-300">
//                Menu Utama
//              </p>
//           ) : (
//             <div className="h-6 mt-4"></div>
//           )}

//           <Link
//             to="/admin/dashboard"
//             title={!isSidebarOpen ? "Dashboard" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/dashboard')
//                 ? "bg-gycora-light text-gycora-dark"
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/dashboard') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Dashboard</span>}
//           </Link>

//           <Link
//             to="/admin/categories"
//             title={!isSidebarOpen ? "Kategori" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/categories')
//                 ? "bg-gycora-light text-gycora-dark"
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/categories') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Kategori</span>}
//           </Link>

//           {/* ============================================================== */}
//           {/* MENU PRODUCTS (DROPDOWN / ACCORDION) */}
//           {/* ============================================================== */}
//           <div className="flex flex-col">
//               <button
//                 onClick={() => {
//                     if(!isSidebarOpen) setIsSidebarOpen(true);
//                     setIsProductMenuOpen(!isProductMenuOpen);
//                 }}
//                 title={!isSidebarOpen ? "Produk" : ""}
//                 className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${
//                   isAnyProductSubmenuActive
//                     ? "bg-gycora-light text-gycora-dark"
//                     : "text-gray-700 hover:bg-gray-100"
//                 } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//               >
//                 <div className="flex items-center gap-3">
//                     <svg className={`w-6 h-6 shrink-0 transition-colors ${isAnyProductSubmenuActive ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//                     </svg>
//                     {isSidebarOpen && <span className="truncate">Produk</span>}
//                 </div>
//                 {isSidebarOpen && (
//                     <svg className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                     </svg>
//                 )}
//               </button>

//               <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isProductMenuOpen && isSidebarOpen ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
//                   <div className="flex flex-col pl-2 space-y-1 border-l-2 border-gray-100 ml-11">
//                       <Link
//                         to="/admin/products"
//                         className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isProductsActive ? 'text-gycora bg-emerald-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
//                       >
//                           Katalog Utama
//                       </Link>
//                       <Link
//                         to="/admin/stocks"
//                         className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isStocksActive ? 'text-gycora bg-emerald-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
//                       >
//                           Stok & Batch Gudang
//                       </Link>
//                   </div>
//               </div>
//           </div>
//           {/* ============================================================== */}

//           {/* ============================================================== */}
//           {/* MENU TRANSAKSI */}
//           {/* ============================================================== */}
//           <Link
//             to="/admin/transactions"
//             title={!isSidebarOpen ? "Transaksi" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/transactions')
//                 ? "bg-gycora-light text-gycora-dark"
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/transactions') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Transaksi</span>}
//           </Link>

//           {/* ============================================================== */}
//           {/* MENU LAPORAN (SALES REPORT) */}
//           {/* ============================================================== */}
//           <Link
//             to="/admin/sales-report"
//             title={!isSidebarOpen ? "Laporan Penjualan" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/sales-report')
//                 ? "bg-gycora-light text-gycora-dark"
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/sales-report') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Laporan</span>}
//           </Link>

//           <Link
//             to="/admin/users"
//             title={!isSidebarOpen ? "Pelanggan" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/users')
//                 ? "bg-gycora-light text-gycora-dark"
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/users') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Pelanggan</span>}
//           </Link>

//           {/* ============================================================== */}
//           {/* MENU SUBSCRIBERS (BARU) */}
//           {/* ============================================================== */}
//           <Link
//             to="/admin/subscribers"
//             title={!isSidebarOpen ? "Subscribers" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/subscribers')
//                 ? "bg-gycora-light text-gycora-dark"
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/subscribers') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Subscribers</span>}
//           </Link>

//         </nav>

//         {/* Footer Sidebar */}
//         <div className="p-4 border-t border-gray-100">
//           <button
//             onClick={handleLogout}
//             title={!isSidebarOpen ? "Logout" : ""}
//             className={`flex items-center gap-3 py-2 w-full text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium text-sm ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//             </svg>
//             {isSidebarOpen && <span>Logout</span>}
//           </button>
//         </div>
//       </aside>

//       {/* MAIN CONTENT AREA */}
//       <div className="flex flex-col flex-1 overflow-hidden">

//         {/* HEADER */}
//         <header className="z-0 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-100 shadow-sm">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gycora/20"
//               title="Toggle Sidebar"
//             >
//                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                </svg>
//             </button>

//              <h2 className="hidden text-lg font-semibold text-gray-800 capitalize sm:block">
//                 {pathname.split('/').pop() || 'Dashboard'}
//              </h2>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
//               <div className="hidden text-right sm:block">
//                 <p className="text-sm font-bold leading-tight text-gray-900">Admin Gycora</p>
//                 <p className="text-xs font-medium text-gycora-dark">Staf Manajemen</p>
//               </div>
//               <img
//                 src="https://ui-avatars.com/api/?name=Admin&background=059669&color=fff&bold=true"
//                 alt="Profile Avatar"
//                 className="object-cover rounded-full h-9 w-9 ring-2 ring-gycora-light"
//               />
//             </div>
//           </div>
//         </header>

//         {/* AREA KONTEN DINAMIS */}
//         <main className="flex-1 overflow-y-auto bg-gray-50/50">
//           {children}
//         </main>

//       </div>
//     </div>
//   );
// }

/* eslint-disable react-hooks/set-state-in-effect */
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import logoGycora from "../../assets/gycora_logo.png"; // <-- Import Logo

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isAuthorized, setIsAuthorized] = useState(false);

//   // STATE BARU: Mengontrol buka/tutup dropdown menu Products
//   const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();

//   const pathname = location.pathname;

//   // =====================================================================
//   // [SOLUSI SATPAM] ROUTE GUARD (CLIENT-SIDE MIDDLEWARE)
//   // =====================================================================
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
//     const allowedRoles = ['admin', 'superadmin', 'gudang', 'accounting'];

//     if (!allowedRoles.includes(user.usertype)) {
//       Swal.fire("Akses Ditolak", "Halaman ini khusus untuk Staf Manajemen.", "error");
//       navigate("/login", { replace: true });
//       return;
//     }

//     setIsAuthorized(true);
//   }, [pathname, navigate]);

//   // Efek Samping: Buka otomatis dropdown menu jika user sedang berada di halaman turunan products
//   useEffect(() => {
//       if(pathname.includes('/admin/products') || pathname.includes('/admin/stocks')) {
//           setIsProductMenuOpen(true);
//       }
//   }, [pathname]);

//   const handleLogout = () => {
//     Swal.fire({
//       title: 'Keluar dari Portal?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Ya, Keluar'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("admin_token");
//         localStorage.removeItem("admin_user");
//         navigate("/admin/login");
//       }
//     });
//   };

//   if (!isAuthorized) {
//     return <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">Memverifikasi Akses...</div>;
//   }

//   if (pathname === "/admin/login") {
//     return <>{children}</>;
//   }

//   // Helper untuk menentukan apakah submenu aktif
//   const isProductsActive = pathname === '/admin/products' || pathname.includes('/admin/products/create') || pathname.includes('/admin/products/') && !pathname.includes('stocks');
//   const isStocksActive = pathname.includes('/admin/stocks');
//   const isAnyProductSubmenuActive = isProductsActive || isStocksActive;

//   return (
//     <div className="flex h-screen overflow-hidden font-sans bg-gray-50">

//       {/* SIDEBAR */}
//       <aside
//         className={`${
//           isSidebarOpen ? "w-64" : "w-20"
//         } bg-white border-r border-gray-200 flex flex-col shadow-sm z-10 transition-all duration-300 ease-in-out hidden md:flex`}
//       >

//         {/* Logo Area */}
//         <div className={`h-16 flex items-center border-b border-gray-100 overflow-hidden whitespace-nowrap transition-all duration-300 ${isSidebarOpen ? 'px-6' : 'justify-center px-0'}`}>
//           <img
//             src={logoGycora}
//             alt="Gycora Logo"
//             className={`object-contain transition-all duration-300 ${isSidebarOpen ? 'h-8' : 'h-6'}`}
//           />
//           {isSidebarOpen && (
//             <span className="mt-1 ml-2 text-[10px] font-bold tracking-widest text-gycora uppercase">Admin</span>
//           )}
//         </div>

//         {/* Menu Navigasi */}
//         <nav className="flex-1 p-4 space-y-2 overflow-x-hidden overflow-y-auto custom-scrollbar">
//           {isSidebarOpen ? (
//              <p className="px-4 mt-4 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-opacity duration-300">
//                Menu Utama
//              </p>
//           ) : (
//             <div className="h-6 mt-4"></div>
//           )}

//           <Link
//             to="/admin/dashboard"
//             title={!isSidebarOpen ? "Dashboard" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/dashboard')
//                 ? "bg-gycora-light text-gycora-dark"
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/dashboard') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Dashboard</span>}
//           </Link>

//           <Link
//             to="/admin/categories"
//             title={!isSidebarOpen ? "Kategori" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/categories')
//                 ? "bg-gycora-light text-gycora-dark"
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/categories') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Kategori</span>}
//           </Link>

//           {/* ============================================================== */}
//           {/* MENU PRODUCTS (DROPDOWN / ACCORDION) */}
//           {/* ============================================================== */}
//           <div className="flex flex-col">
//               <button
//                 onClick={() => {
//                     if(!isSidebarOpen) setIsSidebarOpen(true);
//                     setIsProductMenuOpen(!isProductMenuOpen);
//                 }}
//                 title={!isSidebarOpen ? "Produk" : ""}
//                 className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${
//                   isAnyProductSubmenuActive
//                     ? "bg-gycora-light text-gycora-dark"
//                     : "text-gray-700 hover:bg-gray-100"
//                 } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//               >
//                 <div className="flex items-center gap-3">
//                     <svg className={`w-6 h-6 shrink-0 transition-colors ${isAnyProductSubmenuActive ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//                     </svg>
//                     {isSidebarOpen && <span className="truncate">Produk</span>}
//                 </div>
//                 {isSidebarOpen && (
//                     <svg className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                     </svg>
//                 )}
//               </button>

//               <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isProductMenuOpen && isSidebarOpen ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
//                   <div className="flex flex-col pl-2 space-y-1 border-l-2 border-gray-100 ml-11">
//                       <Link
//                         to="/admin/products"
//                         className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isProductsActive ? 'text-gycora bg-emerald-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
//                       >
//                           Katalog Utama
//                       </Link>
//                       <Link
//                         to="/admin/stocks"
//                         className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isStocksActive ? 'text-gycora bg-emerald-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
//                       >
//                           Stok & Batch Gudang
//                       </Link>
//                   </div>
//               </div>
//           </div>
//           {/* ============================================================== */}

//           {/* ============================================================== */}
//           {/* MENU TRANSAKSI */}
//           {/* ============================================================== */}
//           <Link
//             to="/admin/transactions"
//             title={!isSidebarOpen ? "Transaksi" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/transactions')
//                 ? "bg-gycora-light text-gycora-dark"
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/transactions') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Transaksi</span>}
//           </Link>

//           {/* ============================================================== */}
//           {/* MENU LAPORAN (SALES REPORT) */}
//           {/* ============================================================== */}
//           <Link
//             to="/admin/sales-report"
//             title={!isSidebarOpen ? "Laporan Penjualan" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/sales-report')
//                 ? "bg-gycora-light text-gycora-dark"
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/sales-report') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Laporan</span>}
//           </Link>

//           <Link
//             to="/admin/users"
//             title={!isSidebarOpen ? "Pelanggan" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/users')
//                 ? "bg-gycora-light text-gycora-dark"
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/users') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Pelanggan</span>}
//           </Link>

//           {/* ============================================================== */}
//           {/* MENU SUBSCRIBERS */}
//           {/* ============================================================== */}
//           <Link
//             to="/admin/subscribers"
//             title={!isSidebarOpen ? "Subscribers" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/subscribers')
//                 ? "bg-gycora-light text-gycora-dark"
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/subscribers') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Subscribers</span>}
//           </Link>

//         </nav>

//         {/* Footer Sidebar */}
//         <div className="p-4 border-t border-gray-100">
//           <button
//             onClick={handleLogout}
//             title={!isSidebarOpen ? "Logout" : ""}
//             className={`flex items-center gap-3 py-2 w-full text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium text-sm ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//             </svg>
//             {isSidebarOpen && <span>Logout</span>}
//           </button>
//         </div>
//       </aside>

//       {/* MAIN CONTENT AREA */}
//       <div className="flex flex-col flex-1 overflow-hidden">

//         {/* HEADER */}
//         <header className="z-0 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-100 shadow-sm">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gycora/20"
//               title="Toggle Sidebar"
//             >
//                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                </svg>
//             </button>

//              <h2 className="hidden text-lg font-semibold text-gray-800 capitalize sm:block">
//                 {pathname.split('/').pop() || 'Dashboard'}
//              </h2>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
//               <div className="hidden text-right sm:block">
//                 <p className="text-sm font-bold leading-tight text-gray-900">Admin Gycora</p>
//                 <p className="text-xs font-medium text-gycora-dark">Staf Manajemen</p>
//               </div>
//               <img
//                 src="https://ui-avatars.com/api/?name=Admin&background=059669&color=fff&bold=true"
//                 alt="Profile Avatar"
//                 className="object-cover rounded-full h-9 w-9 ring-2 ring-gycora-light"
//               />
//             </div>
//           </div>
//         </header>

//         {/* AREA KONTEN DINAMIS */}
//         <main className="flex-1 overflow-y-auto bg-gray-50/50">
//           {children}
//         </main>

//       </div>
//     </div>
//   );
// }

// /* eslint-disable react-hooks/set-state-in-effect */
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import logoGycora from "../../assets/gycora_logo.png";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isAuthorized, setIsAuthorized] = useState(false);
//   const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

//   // STATE BARU: Untuk menyimpan data admin yang sedang login
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [adminUser, setAdminUser] = useState<any>(null);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const pathname = location.pathname;

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
//     const allowedRoles = ['admin', 'superadmin', 'gudang', 'accounting'];

//     if (!allowedRoles.includes(user.usertype)) {
//       Swal.fire("Akses Ditolak", "Halaman ini khusus untuk Staf Manajemen.", "error");
//       navigate("/login", { replace: true });
//       return;
//     }

//     setAdminUser(user); // Simpan ke state agar bisa dipakai di Header
//     setIsAuthorized(true);
//   }, [pathname, navigate]);

//   useEffect(() => {
//       if(pathname.includes('/admin/products') || pathname.includes('/admin/stocks')) {
//           setIsProductMenuOpen(true);
//       }
//   }, [pathname]);

//   const handleLogout = () => {
//     Swal.fire({
//       title: 'Keluar dari Portal?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Ya, Keluar'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("admin_token");
//         localStorage.removeItem("admin_user");
//         navigate("/admin/login");
//       }
//     });
//   };

//   if (!isAuthorized) {
//     return <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">Memverifikasi Akses...</div>;
//   }

//   if (pathname === "/admin/login") {
//     return <>{children}</>;
//   }

//   const isProductsActive = pathname === '/admin/products' || pathname.includes('/admin/products/create') || pathname.includes('/admin/products/') && !pathname.includes('stocks');
//   const isStocksActive = pathname.includes('/admin/stocks');
//   const isAnyProductSubmenuActive = isProductsActive || isStocksActive;

//   return (
//     <div className="flex h-screen overflow-hidden font-sans bg-gray-50">

//       {/* SIDEBAR */}
//       <aside
//         className={`${
//           isSidebarOpen ? "w-64" : "w-20"
//         } bg-white border-r border-gray-200 flex flex-col shadow-sm z-10 transition-all duration-300 ease-in-out hidden md:flex`}
//       >
//         <div className={`h-16 flex items-center border-b border-gray-100 overflow-hidden whitespace-nowrap transition-all duration-300 ${isSidebarOpen ? 'px-6' : 'justify-center px-0'}`}>
//           <img
//             src={logoGycora}
//             alt="Gycora Logo"
//             className={`object-contain transition-all duration-300 ${isSidebarOpen ? 'h-8' : 'h-6'}`}
//           />
//           {isSidebarOpen && (
//             <span className="mt-1 ml-2 text-[10px] font-bold tracking-widest text-gycora uppercase">Admin</span>
//           )}
//         </div>

//         <nav className="flex-1 p-4 space-y-2 overflow-x-hidden overflow-y-auto custom-scrollbar">
//           {isSidebarOpen ? (
//              <p className="px-4 mt-4 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-opacity duration-300">Menu Utama</p>
//           ) : <div className="h-6 mt-4"></div>}

//           <Link to="/admin/dashboard" title={!isSidebarOpen ? "Dashboard" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/dashboard') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/dashboard') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
//             {isSidebarOpen && <span className="truncate">Dashboard</span>}
//           </Link>

//           <Link to="/admin/categories" title={!isSidebarOpen ? "Kategori" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/categories') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/categories') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
//             {isSidebarOpen && <span className="truncate">Kategori</span>}
//           </Link>

//           <div className="flex flex-col">
//               <button onClick={() => { if(!isSidebarOpen) setIsSidebarOpen(true); setIsProductMenuOpen(!isProductMenuOpen); }} title={!isSidebarOpen ? "Produk" : ""} className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${isAnyProductSubmenuActive ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//                 <div className="flex items-center gap-3">
//                     <svg className={`w-6 h-6 shrink-0 transition-colors ${isAnyProductSubmenuActive ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
//                     {isSidebarOpen && <span className="truncate">Produk</span>}
//                 </div>
//                 {isSidebarOpen && <svg className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>}
//               </button>
//               <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isProductMenuOpen && isSidebarOpen ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
//                   <div className="flex flex-col pl-2 space-y-1 border-l-2 border-gray-100 ml-11">
//                       <Link to="/admin/products" className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isProductsActive ? 'text-gycora bg-emerald-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>Katalog Utama</Link>
//                       <Link to="/admin/stocks" className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isStocksActive ? 'text-gycora bg-emerald-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>Stok & Batch Gudang</Link>
//                   </div>
//               </div>
//           </div>

//           <Link to="/admin/transactions" title={!isSidebarOpen ? "Transaksi" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/transactions') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/transactions') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
//             {isSidebarOpen && <span className="truncate">Transaksi</span>}
//           </Link>

//           <Link to="/admin/sales-report" title={!isSidebarOpen ? "Laporan Penjualan" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/sales-report') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/sales-report') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
//             {isSidebarOpen && <span className="truncate">Laporan</span>}
//           </Link>

//           <Link to="/admin/users" title={!isSidebarOpen ? "Pelanggan" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/users') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/users') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
//             {isSidebarOpen && <span className="truncate">Pelanggan</span>}
//           </Link>

//           <Link to="/admin/subscribers" title={!isSidebarOpen ? "Subscribers" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/subscribers') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/subscribers') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
//             {isSidebarOpen && <span className="truncate">Subscribers</span>}
//           </Link>
//         </nav>

//         <div className="p-4 border-t border-gray-100">
//           <button onClick={handleLogout} title={!isSidebarOpen ? "Logout" : ""} className={`flex items-center gap-3 py-2 w-full text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium text-sm ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
//             {isSidebarOpen && <span>Logout</span>}
//           </button>
//         </div>
//       </aside>

//       {/* MAIN CONTENT AREA */}
//       <div className="flex flex-col flex-1 overflow-hidden">

//         {/* HEADER */}
//         <header className="z-0 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-100 shadow-sm">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gycora/20"
//               title="Toggle Sidebar"
//             >
//                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                </svg>
//             </button>

//              <h2 className="hidden text-lg font-semibold text-gray-800 capitalize sm:block">
//                 {pathname.split('/').pop() || 'Dashboard'}
//              </h2>
//           </div>

//           <div className="flex items-center gap-4">
//             {/* [PERBAIKAN]: Link menuju Profile Admin */}
//             <Link
//               to="/admin/profile"
//               className="flex items-center gap-3 p-1.5 transition-colors rounded-lg cursor-pointer hover:bg-gray-50"
//             >
//               <div className="hidden text-right sm:block">
//                 <p className="text-sm font-bold leading-tight text-gray-900">
//                   {adminUser?.first_name} {adminUser?.last_name}
//                 </p>
//                 <p className="text-xs font-medium text-gycora-dark uppercase tracking-widest mt-0.5">
//                   {adminUser?.usertype === 'superadmin' ? 'Super Admin' : 'Staf Manajemen'}
//                 </p>
//               </div>
//               <img
//                 src={adminUser?.profile_image || `https://ui-avatars.com/api/?name=${adminUser?.first_name}+${adminUser?.last_name}&background=059669&color=fff&bold=true`}
//                 alt="Profile Avatar"
//                 className="object-cover w-10 h-10 rounded-full shadow-sm ring-2 ring-gycora-light"
//                 onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${adminUser?.first_name}+${adminUser?.last_name}&background=059669&color=fff&bold=true`; }}
//               />
//             </Link>
//           </div>
//         </header>

//         <main className="flex-1 overflow-y-auto bg-gray-50/50">
//           {children}
//         </main>

//       </div>
//     </div>
//   );
// }

// /* eslint-disable react-hooks/set-state-in-effect */
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import logoGycora from "../../assets/gycora_logo.png";
// import { BASE_URL } from "../../config/api"; // <-- Import BASE_URL

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isAuthorized, setIsAuthorized] = useState(false);
//   const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [adminUser, setAdminUser] = useState<any>(null);

//   // STATE BARU: Notifikasi pesan yang belum dibaca
//   const [unreadCount, setUnreadCount] = useState(0);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const pathname = location.pathname;

//   const fetchUnreadMessagesCount = async (token: string) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/admin/messages`, {
//         headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//       });
//       if (res.ok) {
//         const data = await res.json();
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         const unread = data.filter((msg: any) => !msg.is_read).length;
//         setUnreadCount(unread);
//       }
//     } catch (error) {
//       console.error("Gagal mengambil notifikasi pesan", error);
//     }
//   };

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
//     const allowedRoles = ['admin', 'superadmin', 'gudang', 'accounting'];

//     if (!allowedRoles.includes(user.usertype)) {
//       Swal.fire("Akses Ditolak", "Halaman ini khusus untuk Staf Manajemen.", "error");
//       navigate("/login", { replace: true });
//       return;
//     }

//     setAdminUser(user);
//     setIsAuthorized(true);

//     // FETCH JUMLAH PESAN UNREAD (Hanya jika login)
//     fetchUnreadMessagesCount(token);

//   }, [pathname, navigate]);

//   // Fungsi untuk mengambil jumlah pesan yang belum dibaca
//   // const fetchUnreadMessagesCount = async (token: string) => {
//   //   try {
//   //     const res = await fetch(`${BASE_URL}/api/admin/messages`, {
//   //       headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//   //     });
//   //     if (res.ok) {
//   //       const data = await res.json();
//   //       // Asumsi data mengembalikan array pesan
//   //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   //       const unread = data.filter((msg: any) => !msg.is_read).length;
//   //       setUnreadCount(unread);
//   //     }
//   //   } catch (error) {
//   //     console.error("Gagal mengambil notifikasi pesan", error);
//   //   }
//   // };

//   useEffect(() => {
//       if(pathname.includes('/admin/products') || pathname.includes('/admin/stocks')) {
//           setIsProductMenuOpen(true);
//       }
//   }, [pathname]);

//   const handleLogout = () => {
//     Swal.fire({
//       title: 'Keluar dari Portal?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Ya, Keluar'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("admin_token");
//         localStorage.removeItem("admin_user");
//         navigate("/admin/login");
//       }
//     });
//   };

//   if (!isAuthorized) {
//     return <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">Memverifikasi Akses...</div>;
//   }

//   if (pathname === "/admin/login") {
//     return <>{children}</>;
//   }

//   const isProductsActive = pathname === '/admin/products' || pathname.includes('/admin/products/create') || pathname.includes('/admin/products/') && !pathname.includes('stocks');
//   const isStocksActive = pathname.includes('/admin/stocks');
//   const isAnyProductSubmenuActive = isProductsActive || isStocksActive;

//   return (
//     <div className="flex h-screen overflow-hidden font-sans bg-gray-50">

//       {/* SIDEBAR (Kode sidebar persis sama seperti sebelumnya) */}
//       <aside
//         className={`${
//           isSidebarOpen ? "w-64" : "w-20"
//         } bg-white border-r border-gray-200 flex flex-col shadow-sm z-10 transition-all duration-300 ease-in-out hidden md:flex`}
//       >
//         <div className={`h-16 flex items-center border-b border-gray-100 overflow-hidden whitespace-nowrap transition-all duration-300 ${isSidebarOpen ? 'px-6' : 'justify-center px-0'}`}>
//           <img
//             src={logoGycora}
//             alt="Gycora Logo"
//             className={`object-contain transition-all duration-300 ${isSidebarOpen ? 'h-8' : 'h-6'}`}
//           />
//           {isSidebarOpen && (
//             <span className="mt-1 ml-2 text-[10px] font-bold tracking-widest text-gycora uppercase">Admin</span>
//           )}
//         </div>

//         <nav className="flex-1 p-4 space-y-2 overflow-x-hidden overflow-y-auto custom-scrollbar">
//           {isSidebarOpen ? (
//              <p className="px-4 mt-4 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-opacity duration-300">Menu Utama</p>
//           ) : <div className="h-6 mt-4"></div>}

//           <Link to="/admin/dashboard" title={!isSidebarOpen ? "Dashboard" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/dashboard') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/dashboard') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
//             {isSidebarOpen && <span className="truncate">Dashboard</span>}
//           </Link>

//           <Link to="/admin/categories" title={!isSidebarOpen ? "Kategori" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/categories') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/categories') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
//             {isSidebarOpen && <span className="truncate">Kategori</span>}
//           </Link>

//           <div className="flex flex-col">
//               <button onClick={() => { if(!isSidebarOpen) setIsSidebarOpen(true); setIsProductMenuOpen(!isProductMenuOpen); }} title={!isSidebarOpen ? "Produk" : ""} className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${isAnyProductSubmenuActive ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//                 <div className="flex items-center gap-3">
//                     <svg className={`w-6 h-6 shrink-0 transition-colors ${isAnyProductSubmenuActive ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
//                     {isSidebarOpen && <span className="truncate">Produk</span>}
//                 </div>
//                 {isSidebarOpen && <svg className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>}
//               </button>
//               <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isProductMenuOpen && isSidebarOpen ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
//                   <div className="flex flex-col pl-2 space-y-1 border-l-2 border-gray-100 ml-11">
//                       <Link to="/admin/products" className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isProductsActive ? 'text-gycora bg-emerald-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>Katalog Utama</Link>
//                       <Link to="/admin/stocks" className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isStocksActive ? 'text-gycora bg-emerald-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>Stok & Batch Gudang</Link>
//                   </div>
//               </div>
//           </div>

//           <Link to="/admin/transactions" title={!isSidebarOpen ? "Transaksi" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/transactions') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/transactions') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
//             {isSidebarOpen && <span className="truncate">Transaksi</span>}
//           </Link>

//           <Link to="/admin/sales-report" title={!isSidebarOpen ? "Laporan Penjualan" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/sales-report') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/sales-report') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
//             {isSidebarOpen && <span className="truncate">Laporan</span>}
//           </Link>

//           <Link to="/admin/users" title={!isSidebarOpen ? "Pelanggan" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/users') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/users') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
//             {isSidebarOpen && <span className="truncate">Pelanggan</span>}
//           </Link>

//           <Link to="/admin/subscribers" title={!isSidebarOpen ? "Subscribers" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/subscribers') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/subscribers') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
//             {isSidebarOpen && <span className="truncate">Subscribers</span>}
//           </Link>
//         </nav>

//         <div className="p-4 border-t border-gray-100">
//           <button onClick={handleLogout} title={!isSidebarOpen ? "Logout" : ""} className={`flex items-center gap-3 py-2 w-full text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium text-sm ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
//             {isSidebarOpen && <span>Logout</span>}
//           </button>
//         </div>
//       </aside>

//       {/* MAIN CONTENT AREA */}
//       <div className="flex flex-col flex-1 overflow-hidden">

//         {/* HEADER */}
//         <header className="z-0 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-100 shadow-sm">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gycora/20"
//               title="Toggle Sidebar"
//             >
//                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                </svg>
//             </button>

//              <h2 className="hidden text-lg font-semibold text-gray-800 capitalize sm:block">
//                 {pathname.split('/').pop() || 'Dashboard'}
//              </h2>
//           </div>

//           <div className="flex items-center gap-6">

//             {/* [BARU]: ICON MESSAGES/BELL */}
//             <button
//               onClick={() => navigate('/admin/messages')}
//               className="relative p-2 text-gray-500 transition-colors rounded-lg hover:text-gycora hover:bg-gray-50"
//               title="Pesan Masuk"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3h9m-9 3h3m-6.75 4.125a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-10.5a3 3 0 0 0-3-3H6.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3Z" />
//               </svg>
//               {unreadCount > 0 && (
//                 <span className="absolute flex w-3 h-3 top-1 right-1">
//                   <span className="absolute inline-flex w-full h-full rounded-full opacity-75 bg-gycora animate-ping"></span>
//                   <span className="relative inline-flex w-3 h-3 text-[8px] font-bold text-white items-center justify-center rounded-full bg-gycora">
//                     {/* Hapus unreadCount jika hanya ingin titik merah (ping) seperti referensi Vue Anda,
//                         atau biarkan jika ingin menampilkan angkanya */}
//                   </span>
//                 </span>
//               )}
//             </button>

//             <Link
//               to="/admin/profile"
//               className="flex items-center gap-3 p-1.5 transition-colors rounded-lg cursor-pointer hover:bg-gray-50"
//             >
//               <div className="hidden text-right sm:block">
//                 <p className="text-sm font-bold leading-tight text-gray-900">
//                   {adminUser?.first_name} {adminUser?.last_name}
//                 </p>
//                 <p className="text-xs font-medium text-gycora-dark uppercase tracking-widest mt-0.5">
//                   {adminUser?.usertype === 'superadmin' ? 'Super Admin' : 'Staf Manajemen'}
//                 </p>
//               </div>
//               <img
//                 src={adminUser?.profile_image || `https://ui-avatars.com/api/?name=${adminUser?.first_name}+${adminUser?.last_name}&background=059669&color=fff&bold=true`}
//                 alt="Profile Avatar"
//                 className="object-cover w-10 h-10 rounded-full shadow-sm ring-2 ring-gycora-light"
//                 onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${adminUser?.first_name}+${adminUser?.last_name}&background=059669&color=fff&bold=true`; }}
//               />
//             </Link>
//           </div>
//         </header>

//         <main className="flex-1 overflow-y-auto bg-gray-50/50">
//           {children}
//         </main>

//       </div>
//     </div>
//   );
// }

/* eslint-disable react-hooks/set-state-in-effect */
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import logoGycora from "../../assets/gycora_logo.png";
// import { BASE_URL } from "../../config/api";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isAuthorized, setIsAuthorized] = useState(false);
//   const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [adminUser, setAdminUser] = useState<any>(null);

//   const [unreadCount, setUnreadCount] = useState(0);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const pathname = location.pathname;

//   const fetchUnreadMessagesCount = async (token: string) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/admin/messages`, {
//         headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//       });
//       if (res.ok) {
//         const data = await res.json();
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         const unread = data.filter((msg: any) => !msg.is_read).length;
//         setUnreadCount(unread);
//       }
//     } catch (error) {
//       console.error("Gagal mengambil notifikasi pesan", error);
//     }
//   };

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
//     const allowedRoles = ['admin', 'superadmin', 'gudang', 'accounting'];

//     if (!allowedRoles.includes(user.usertype)) {
//       Swal.fire("Akses Ditolak", "Halaman ini khusus untuk Staf Manajemen.", "error");
//       navigate("/login", { replace: true });
//       return;
//     }

//     setAdminUser(user);
//     setIsAuthorized(true);

//     fetchUnreadMessagesCount(token);

//   }, [pathname, navigate]);

//   useEffect(() => {
//       if(pathname.includes('/admin/products') || pathname.includes('/admin/stocks')) {
//           setIsProductMenuOpen(true);
//       }
//   }, [pathname]);

//   const handleLogout = () => {
//     Swal.fire({
//       title: 'Keluar dari Portal?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Ya, Keluar'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("admin_token");
//         localStorage.removeItem("admin_user");
//         navigate("/admin/login");
//       }
//     });
//   };

//   if (!isAuthorized) {
//     return <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">Memverifikasi Akses...</div>;
//   }

//   if (pathname === "/admin/login") {
//     return <>{children}</>;
//   }

//   const isProductsActive = pathname === '/admin/products' || pathname.includes('/admin/products/create') || pathname.includes('/admin/products/') && !pathname.includes('stocks');
//   const isStocksActive = pathname.includes('/admin/stocks');
//   const isAnyProductSubmenuActive = isProductsActive || isStocksActive;

//   return (
//     <div className="flex h-screen overflow-hidden font-sans bg-gray-50">

//       {/* SIDEBAR */}
//       <aside
//         className={`${
//           isSidebarOpen ? "w-64" : "w-20"
//         } bg-white border-r border-gray-200 flex flex-col shadow-sm z-10 transition-all duration-300 ease-in-out hidden md:flex`}
//       >
//         <div className={`h-16 flex items-center border-b border-gray-100 overflow-hidden whitespace-nowrap transition-all duration-300 ${isSidebarOpen ? 'px-6' : 'justify-center px-0'}`}>
//           <img
//             src={logoGycora}
//             alt="Gycora Logo"
//             className={`object-contain transition-all duration-300 ${isSidebarOpen ? 'h-8' : 'h-6'}`}
//           />
//           {isSidebarOpen && (
//             <span className="mt-1 ml-2 text-[10px] font-bold tracking-widest text-gycora uppercase">Admin</span>
//           )}
//         </div>

//         <nav className="flex-1 p-4 space-y-2 overflow-x-hidden overflow-y-auto custom-scrollbar">

//           {/* LABEL: MENU UTAMA */}
//           {isSidebarOpen ? (
//              <p className="px-4 mt-2 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-opacity duration-300">Menu Utama</p>
//           ) : <div className="h-4 mt-2"></div>}

//           <Link to="/admin/dashboard" title={!isSidebarOpen ? "Dashboard" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/dashboard') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/dashboard') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
//             {isSidebarOpen && <span className="truncate">Dashboard</span>}
//           </Link>

//           <Link to="/admin/categories" title={!isSidebarOpen ? "Kategori" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/categories') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/categories') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
//             {isSidebarOpen && <span className="truncate">Kategori</span>}
//           </Link>

//           {/* DROPDOWN PRODUK */}
//           <div className="flex flex-col">
//               <button onClick={() => { if(!isSidebarOpen) setIsSidebarOpen(true); setIsProductMenuOpen(!isProductMenuOpen); }} title={!isSidebarOpen ? "Produk" : ""} className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${isAnyProductSubmenuActive ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//                 <div className="flex items-center gap-3">
//                     <svg className={`w-6 h-6 shrink-0 transition-colors ${isAnyProductSubmenuActive ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
//                     {isSidebarOpen && <span className="truncate">Produk</span>}
//                 </div>
//                 {isSidebarOpen && <svg className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>}
//               </button>
//               <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isProductMenuOpen && isSidebarOpen ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
//                   <div className="flex flex-col pl-2 space-y-1 border-l-2 border-gray-100 ml-11">
//                       <Link to="/admin/products" className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isProductsActive ? 'text-gycora bg-emerald-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>Katalog Utama</Link>
//                       <Link to="/admin/stocks" className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isStocksActive ? 'text-gycora bg-emerald-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>Stok & Batch Gudang</Link>
//                   </div>
//               </div>
//           </div>

//           <Link to="/admin/transactions" title={!isSidebarOpen ? "Transaksi" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/transactions') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/transactions') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
//             {isSidebarOpen && <span className="truncate">Transaksi</span>}
//           </Link>

//           <Link to="/admin/sales-report" title={!isSidebarOpen ? "Laporan Penjualan" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/sales-report') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/sales-report') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
//             {isSidebarOpen && <span className="truncate">Laporan</span>}
//           </Link>

//           <Link to="/admin/users" title={!isSidebarOpen ? "Pelanggan" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/users') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/users') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
//             {isSidebarOpen && <span className="truncate">Pelanggan</span>}
//           </Link>

//           <Link to="/admin/subscribers" title={!isSidebarOpen ? "Subscribers" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/subscribers') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/subscribers') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
//             {isSidebarOpen && <span className="truncate">Subscribers</span>}
//           </Link>

//           {/* ============================================================== */}
//           {/* LABEL: ACCOUNTING (MODUL KEUANGAN) */}
//           {/* ============================================================== */}
//           <div className="pt-2 mt-4 border-t border-gray-100">
//             {isSidebarOpen ? (
//                <p className="px-4 mt-2 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-opacity duration-300">Accounting</p>
//             ) : <div className="h-4 mt-2"></div>}

//             {/* LINK 1: COA */}
//             <Link
//               to="/admin/coas"
//               title={!isSidebarOpen ? "Chart of Accounts" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//                 pathname.includes('/coas') || pathname.includes('/category-coas')
//                   ? "bg-gycora-light text-gycora-dark"
//                   : "text-gray-700 hover:bg-gray-100"
//               } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/coas') || pathname.includes('/category-coas') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
//               </svg>
//               {isSidebarOpen && <span className="truncate">Chart of Accounts</span>}
//             </Link>

//             {/* LINK 2: TRANSFER & RECEIVE */}
//             <Link
//               to="/admin/transfer-receive"
//               title={!isSidebarOpen ? "Transfer & Receive" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//                 pathname.includes('/transfer-receive')
//                   ? "bg-gycora-light text-gycora-dark"
//                   : "text-gray-700 hover:bg-gray-100"
//               } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/transfer-receive') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
//               </svg>
//               {isSidebarOpen && <span className="truncate">Transfer & Receive</span>}
//             </Link>

//           </div>

//         </nav>

//         {/* Footer Sidebar (Logout) */}
//         <div className="p-4 border-t border-gray-100">
//           <button onClick={handleLogout} title={!isSidebarOpen ? "Logout" : ""} className={`flex items-center gap-3 py-2 w-full text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium text-sm ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
//             {isSidebarOpen && <span>Logout</span>}
//           </button>
//         </div>
//       </aside>

//       {/* MAIN CONTENT AREA */}
//       <div className="flex flex-col flex-1 overflow-hidden">

//         {/* HEADER */}
//         <header className="z-0 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-100 shadow-sm">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gycora/20"
//               title="Toggle Sidebar"
//             >
//                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                </svg>
//             </button>

//              <h2 className="hidden text-lg font-semibold text-gray-800 capitalize sm:block">
//                 {pathname.split('/').pop() || 'Dashboard'}
//              </h2>
//           </div>

//           <div className="flex items-center gap-6">

//             {/* ICON MESSAGES/BELL */}
//             <button
//               onClick={() => navigate('/admin/messages')}
//               className="relative p-2 text-gray-500 transition-colors rounded-lg hover:text-gycora hover:bg-gray-50"
//               title="Pesan Masuk"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3h9m-9 3h3m-6.75 4.125a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-10.5a3 3 0 0 0-3-3H6.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3Z" />
//               </svg>
//               {unreadCount > 0 && (
//                 <span className="absolute flex w-3 h-3 top-1 right-1">
//                   <span className="absolute inline-flex w-full h-full rounded-full opacity-75 bg-gycora animate-ping"></span>
//                   <span className="relative inline-flex w-3 h-3 text-[8px] font-bold text-white items-center justify-center rounded-full bg-gycora">
//                   </span>
//                 </span>
//               )}
//             </button>

//             <Link
//               to="/admin/profile"
//               className="flex items-center gap-3 p-1.5 transition-colors rounded-lg cursor-pointer hover:bg-gray-50"
//             >
//               <div className="hidden text-right sm:block">
//                 <p className="text-sm font-bold leading-tight text-gray-900">
//                   {adminUser?.first_name} {adminUser?.last_name}
//                 </p>
//                 <p className="text-xs font-medium text-gycora-dark uppercase tracking-widest mt-0.5">
//                   {adminUser?.usertype === 'superadmin' ? 'Super Admin' : 'Staf Manajemen'}
//                 </p>
//               </div>
//               <img
//                 src={adminUser?.profile_image || `https://ui-avatars.com/api/?name=${adminUser?.first_name}+${adminUser?.last_name}&background=059669&color=fff&bold=true`}
//                 alt="Profile Avatar"
//                 className="object-cover w-10 h-10 rounded-full shadow-sm ring-2 ring-gycora-light"
//                 onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${adminUser?.first_name}+${adminUser?.last_name}&background=059669&color=fff&bold=true`; }}
//               />
//             </Link>
//           </div>
//         </header>

//         <main className="flex-1 overflow-y-auto bg-gray-50/50">
//           {children}
//         </main>

//       </div>
//     </div>
//   );
// }

// /* eslint-disable react-hooks/set-state-in-effect */
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import logoGycora from "../../assets/gycora_logo.png";
// import { BASE_URL } from "../../config/api";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isAuthorized, setIsAuthorized] = useState(false);
//   const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [adminUser, setAdminUser] = useState<any>(null);

//   const [unreadCount, setUnreadCount] = useState(0);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const pathname = location.pathname;

//   const fetchUnreadMessagesCount = async (token: string) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/admin/messages`, {
//         headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//       });
//       if (res.ok) {
//         const data = await res.json();
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         const unread = data.filter((msg: any) => !msg.is_read).length;
//         setUnreadCount(unread);
//       }
//     } catch (error) {
//       console.error("Gagal mengambil notifikasi pesan", error);
//     }
//   };

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
//     const allowedRoles = ['admin', 'superadmin', 'gudang', 'accounting'];

//     if (!allowedRoles.includes(user.usertype)) {
//       Swal.fire("Akses Ditolak", "Halaman ini khusus untuk Staf Manajemen.", "error");
//       navigate("/login", { replace: true });
//       return;
//     }

//     setAdminUser(user);
//     setIsAuthorized(true);

//     fetchUnreadMessagesCount(token);

//   }, [pathname, navigate]);

//   useEffect(() => {
//       if(pathname.includes('/admin/products') || pathname.includes('/admin/stocks')) {
//           setIsProductMenuOpen(true);
//       }
//   }, [pathname]);

//   const handleLogout = () => {
//     Swal.fire({
//       title: 'Keluar dari Portal?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Ya, Keluar'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("admin_token");
//         localStorage.removeItem("admin_user");
//         navigate("/admin/login");
//       }
//     });
//   };

//   if (!isAuthorized) {
//     return <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">Memverifikasi Akses...</div>;
//   }

//   if (pathname === "/admin/login") {
//     return <>{children}</>;
//   }

//   const isProductsActive = pathname === '/admin/products' || pathname.includes('/admin/products/create') || pathname.includes('/admin/products/') && !pathname.includes('stocks');
//   const isStocksActive = pathname.includes('/admin/stocks');
//   const isAnyProductSubmenuActive = isProductsActive || isStocksActive;

//   return (
//     <div className="flex h-screen overflow-hidden font-sans bg-gray-50">

//       {/* SIDEBAR */}
//       <aside
//         className={`${
//           isSidebarOpen ? "w-64" : "w-20"
//         } bg-white border-r border-gray-200 flex flex-col shadow-sm z-10 transition-all duration-300 ease-in-out hidden md:flex`}
//       >
//         <div className={`h-16 flex items-center border-b border-gray-100 overflow-hidden whitespace-nowrap transition-all duration-300 ${isSidebarOpen ? 'px-6' : 'justify-center px-0'}`}>
//           <img
//             src={logoGycora}
//             alt="Gycora Logo"
//             className={`object-contain transition-all duration-300 ${isSidebarOpen ? 'h-8' : 'h-6'}`}
//           />
//           {isSidebarOpen && (
//             <span className="mt-1 ml-2 text-[10px] font-bold tracking-widest text-gycora uppercase">Admin</span>
//           )}
//         </div>

//         <nav className="flex-1 p-4 space-y-2 overflow-x-hidden overflow-y-auto custom-scrollbar">

//           {/* LABEL: MENU UTAMA */}
//           {isSidebarOpen ? (
//              <p className="px-4 mt-2 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-opacity duration-300">Menu Utama</p>
//           ) : <div className="h-4 mt-2"></div>}

//           <Link to="/admin/dashboard" title={!isSidebarOpen ? "Dashboard" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/dashboard') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/dashboard') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
//             {isSidebarOpen && <span className="truncate">Dashboard</span>}
//           </Link>

//           <Link to="/admin/categories" title={!isSidebarOpen ? "Kategori" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/categories') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/categories') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
//             {isSidebarOpen && <span className="truncate">Kategori</span>}
//           </Link>

//           {/* DROPDOWN PRODUK */}
//           <div className="flex flex-col">
//               <button onClick={() => { if(!isSidebarOpen) setIsSidebarOpen(true); setIsProductMenuOpen(!isProductMenuOpen); }} title={!isSidebarOpen ? "Produk" : ""} className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${isAnyProductSubmenuActive ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//                 <div className="flex items-center gap-3">
//                     <svg className={`w-6 h-6 shrink-0 transition-colors ${isAnyProductSubmenuActive ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
//                     {isSidebarOpen && <span className="truncate">Produk</span>}
//                 </div>
//                 {isSidebarOpen && <svg className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>}
//               </button>
//               <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isProductMenuOpen && isSidebarOpen ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
//                   <div className="flex flex-col pl-2 space-y-1 border-l-2 border-gray-100 ml-11">
//                       <Link to="/admin/products" className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isProductsActive ? 'text-gycora bg-emerald-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>Katalog Utama</Link>
//                       <Link to="/admin/stocks" className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isStocksActive ? 'text-gycora bg-emerald-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>Stok & Batch Gudang</Link>
//                   </div>
//               </div>
//           </div>

//           <Link to="/admin/transactions" title={!isSidebarOpen ? "Transaksi" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/transactions') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/transactions') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
//             {isSidebarOpen && <span className="truncate">Transaksi</span>}
//           </Link>

//           <Link to="/admin/sales-report" title={!isSidebarOpen ? "Laporan Penjualan" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/sales-report') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/sales-report') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
//             {isSidebarOpen && <span className="truncate">Laporan</span>}
//           </Link>

//           <Link to="/admin/users" title={!isSidebarOpen ? "Pelanggan" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/users') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/users') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
//             {isSidebarOpen && <span className="truncate">Pelanggan</span>}
//           </Link>

//           <Link to="/admin/subscribers" title={!isSidebarOpen ? "Subscribers" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/subscribers') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/subscribers') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
//             {isSidebarOpen && <span className="truncate">Subscribers</span>}
//           </Link>

//           {/* ============================================================== */}
//           {/* LABEL: ACCOUNTING (MODUL KEUANGAN) */}
//           {/* ============================================================== */}
//           <div className="pt-2 mt-4 border-t border-gray-100">
//             {isSidebarOpen ? (
//                <p className="px-4 mt-2 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-opacity duration-300">Accounting</p>
//             ) : <div className="h-4 mt-2"></div>}

//             {/* LINK 1: COA */}
//             <Link
//               to="/admin/coas"
//               title={!isSidebarOpen ? "Chart of Accounts" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//                 pathname.includes('/coas') || pathname.includes('/category-coas')
//                   ? "bg-gycora-light text-gycora-dark"
//                   : "text-gray-700 hover:bg-gray-100"
//               } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/coas') || pathname.includes('/category-coas') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
//               </svg>
//               {isSidebarOpen && <span className="truncate">Chart of Accounts</span>}
//             </Link>

//             {/* LINK 2: PAYMENTS */}
//             <Link
//               to="/admin/transfer-receive"
//               title={!isSidebarOpen ? "Payments" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//                 pathname.includes('/transfer-receive')
//                   ? "bg-gycora-light text-gycora-dark"
//                   : "text-gray-700 hover:bg-gray-100"
//               } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/transfer-receive') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
//               </svg>
//               {isSidebarOpen && <span className="truncate">Payments</span>}
//             </Link>

//             {/* LINK 3: SUPPLIER */}
//             <Link
//               to="/admin/suppliers"
//               title={!isSidebarOpen ? "Suppliers" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//                 pathname.includes('/suppliers')
//                   ? "bg-gycora-light text-gycora-dark"
//                   : "text-gray-700 hover:bg-gray-100"
//               } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/suppliers') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//               </svg>
//               {isSidebarOpen && <span className="truncate">Suppliers</span>}
//             </Link>

//             {/* LINK 4: INVOICES */}
//             <Link
//               to="/admin/invoices"
//               title={!isSidebarOpen ? "Invoices" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//                 pathname.includes('/invoices')
//                   ? "bg-gycora-light text-gycora-dark"
//                   : "text-gray-700 hover:bg-gray-100"
//               } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/invoices') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//               {isSidebarOpen && <span className="truncate">Invoices</span>}
//             </Link>

//           </div>

//         </nav>

//         {/* Footer Sidebar (Logout) */}
//         <div className="p-4 border-t border-gray-100">
//           <button onClick={handleLogout} title={!isSidebarOpen ? "Logout" : ""} className={`flex items-center gap-3 py-2 w-full text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium text-sm ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
//             {isSidebarOpen && <span>Logout</span>}
//           </button>
//         </div>
//       </aside>

//       {/* MAIN CONTENT AREA */}
//       <div className="flex flex-col flex-1 overflow-hidden">

//         {/* HEADER */}
//         <header className="z-0 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-100 shadow-sm">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gycora/20"
//               title="Toggle Sidebar"
//             >
//                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                </svg>
//             </button>

//              <h2 className="hidden text-lg font-semibold text-gray-800 capitalize sm:block">
//                 {pathname.split('/').pop() || 'Dashboard'}
//              </h2>
//           </div>

//           <div className="flex items-center gap-6">

//             {/* ICON MESSAGES/BELL */}
//             <button
//               onClick={() => navigate('/admin/messages')}
//               className="relative p-2 text-gray-500 transition-colors rounded-lg hover:text-gycora hover:bg-gray-50"
//               title="Pesan Masuk"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3h9m-9 3h3m-6.75 4.125a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-10.5a3 3 0 0 0-3-3H6.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3Z" />
//               </svg>
//               {unreadCount > 0 && (
//                 <span className="absolute flex w-3 h-3 top-1 right-1">
//                   <span className="absolute inline-flex w-full h-full rounded-full opacity-75 bg-gycora animate-ping"></span>
//                   <span className="relative inline-flex w-3 h-3 text-[8px] font-bold text-white items-center justify-center rounded-full bg-gycora">
//                   </span>
//                 </span>
//               )}
//             </button>

//             <Link
//               to="/admin/profile"
//               className="flex items-center gap-3 p-1.5 transition-colors rounded-lg cursor-pointer hover:bg-gray-50"
//             >
//               <div className="hidden text-right sm:block">
//                 <p className="text-sm font-bold leading-tight text-gray-900">
//                   {adminUser?.first_name} {adminUser?.last_name}
//                 </p>
//                 <p className="text-xs font-medium text-gycora-dark uppercase tracking-widest mt-0.5">
//                   {adminUser?.usertype === 'superadmin' ? 'Super Admin' : 'Staf Manajemen'}
//                 </p>
//               </div>
//               <img
//                 src={adminUser?.profile_image || `https://ui-avatars.com/api/?name=${adminUser?.first_name}+${adminUser?.last_name}&background=059669&color=fff&bold=true`}
//                 alt="Profile Avatar"
//                 className="object-cover w-10 h-10 rounded-full shadow-sm ring-2 ring-gycora-light"
//                 onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${adminUser?.first_name}+${adminUser?.last_name}&background=059669&color=fff&bold=true`; }}
//               />
//             </Link>
//           </div>
//         </header>

//         <main className="flex-1 overflow-y-auto bg-gray-50/50">
//           {children}
//         </main>

//       </div>
//     </div>
//   );
// }

/* eslint-disable react-hooks/set-state-in-effect */
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import logoGycora from "../../assets/gycora_logo.png";
// import { useMessage } from "../context/MessageContext"; // <-- TAMBAHKAN INI
// import { BASE_URL } from "../../config/api";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isAuthorized, setIsAuthorized] = useState(false);

//   // --- STATE UNTUK MENU DROPDOWN SIDEBAR ---
//   const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
//   const [isClinicMenuOpen, setIsClinicMenuOpen] = useState(false); // <-- Tambahan untuk menu Klinik

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [adminUser, setAdminUser] = useState<any>(null);

//   const [adminData, setAdminData] = useState<any>(null);

//   const [unreadCount, setUnreadCount] = useState(0);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const pathname = location.pathname;

//   const fetchUnreadMessagesCount = async (token: string) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/admin/messages`, {
//         headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//       });
//       if (res.ok) {
//         const data = await res.json();
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         const unread = data.filter((msg: any) => !msg.is_read).length;
//         setUnreadCount(unread);
//       }
//     } catch (error) {
//       console.error("Gagal mengambil notifikasi pesan", error);
//     }
//   };

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
//     const allowedRoles = ['admin', 'superadmin', 'gudang', 'accounting'];

//     if (!allowedRoles.includes(user.usertype)) {
//       Swal.fire("Akses Ditolak", "Halaman ini khusus untuk Staf Manajemen.", "error");
//       navigate("/login", { replace: true });
//       return;
//     }

//     setAdminUser(user);
//     setIsAuthorized(true);

//     fetchUnreadMessagesCount(token);

//   }, [pathname, navigate]);

//   // Efek untuk membuka dropdown secara otomatis jika rute aktif ada di dalamnya
//   useEffect(() => {
//       if(pathname.includes('/admin/products') || pathname.includes('/admin/stocks')) {
//           setIsProductMenuOpen(true);
//       }
//       if(pathname.includes('/admin/treatments')) {
//           setIsClinicMenuOpen(true);
//       }
//   }, [pathname]);

//   const handleLogout = () => {
//     Swal.fire({
//       title: 'Keluar dari Portal?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Ya, Keluar'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("admin_token");
//         localStorage.removeItem("admin_user");
//         navigate("/admin/login");
//       }
//     });
//   };

//   if (!isAuthorized) {
//     return <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">Memverifikasi Akses...</div>;
//   }

//   if (pathname === "/admin/login") {
//     return <>{children}</>;
//   }

//   // Helper untuk menentukan status aktif rute
//   const isProductsActive = pathname === '/admin/products' || pathname.includes('/admin/products/create') || pathname.includes('/admin/products/') && !pathname.includes('stocks');
//   const isStocksActive = pathname.includes('/admin/stocks');
//   const isAnyProductSubmenuActive = isProductsActive || isStocksActive;

//   const isTreatmentsActive = pathname.includes('/admin/treatments');

//   return (
//     <div className="flex h-screen overflow-hidden font-sans bg-gray-50">

//       {/* SIDEBAR */}
//       <aside
//         className={`${
//           isSidebarOpen ? "w-64" : "w-20"
//         } bg-white border-r border-gray-200 flex flex-col shadow-sm z-10 transition-all duration-300 ease-in-out hidden md:flex`}
//       >
//         <div className={`h-16 flex items-center border-b border-gray-100 overflow-hidden whitespace-nowrap transition-all duration-300 ${isSidebarOpen ? 'px-6' : 'justify-center px-0'}`}>
//           <img
//             src={logoGycora}
//             alt="Gycora Logo"
//             className={`object-contain transition-all duration-300 ${isSidebarOpen ? 'h-8' : 'h-6'}`}
//           />
//           {isSidebarOpen && (
//             <span className="mt-1 ml-2 text-[10px] font-bold tracking-widest text-gycora uppercase">Admin</span>
//           )}
//         </div>

//         <nav className="flex-1 p-4 space-y-2 overflow-x-hidden overflow-y-auto custom-scrollbar">

//           {/* LABEL: MENU UTAMA */}
//           {isSidebarOpen ? (
//              <p className="px-4 mt-2 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-opacity duration-300">Menu Utama</p>
//           ) : <div className="h-4 mt-2"></div>}

//           <Link to="/admin/dashboard" title={!isSidebarOpen ? "Dashboard" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/dashboard') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/dashboard') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
//             {isSidebarOpen && <span className="truncate">Dashboard</span>}
//           </Link>

//           <Link to="/admin/categories" title={!isSidebarOpen ? "Kategori" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/categories') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/categories') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
//             {isSidebarOpen && <span className="truncate">Kategori</span>}
//           </Link>

//           {/* DROPDOWN PRODUK */}
//           <div className="flex flex-col">
//               <button onClick={() => { if(!isSidebarOpen) setIsSidebarOpen(true); setIsProductMenuOpen(!isProductMenuOpen); }} title={!isSidebarOpen ? "Produk" : ""} className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${isAnyProductSubmenuActive ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//                 <div className="flex items-center gap-3">
//                     <svg className={`w-6 h-6 shrink-0 transition-colors ${isAnyProductSubmenuActive ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
//                     {isSidebarOpen && <span className="truncate">Produk</span>}
//                 </div>
//                 {isSidebarOpen && <svg className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>}
//               </button>
//               <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isProductMenuOpen && isSidebarOpen ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
//                   <div className="flex flex-col pl-2 space-y-1 border-l-2 border-gray-100 ml-11">
//                       <Link to="/admin/products" className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isProductsActive ? 'text-gycora bg-emerald-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>Katalog Utama</Link>
//                       <Link to="/admin/stocks" className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isStocksActive ? 'text-gycora bg-emerald-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>Stok & Batch Gudang</Link>
//                   </div>
//               </div>
//           </div>

//           {/* ============================================================== */}
//           {/* MENU KLINIK / TREATMENTS (BARU) */}
//           {/* ============================================================== */}
//           <div className="flex flex-col">
//               <button onClick={() => { if(!isSidebarOpen) setIsSidebarOpen(true); setIsClinicMenuOpen(!isClinicMenuOpen); }} title={!isSidebarOpen ? "Klinik" : ""} className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${isTreatmentsActive ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//                 <div className="flex items-center gap-3">
//                     {/* Ikon Stetoskop / Medis */}
//                     <svg className={`w-6 h-6 shrink-0 transition-colors ${isTreatmentsActive ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
//                     {isSidebarOpen && <span className="truncate">Klinik</span>}
//                 </div>
//                 {isSidebarOpen && <svg className={`w-4 h-4 transition-transform duration-200 ${isClinicMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>}
//               </button>
//               <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isClinicMenuOpen && isSidebarOpen ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
//                   <div className="flex flex-col pl-2 space-y-1 border-l-2 border-gray-100 ml-11">
//                       <Link to="/admin/treatments" className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isTreatmentsActive ? 'text-gycora bg-emerald-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>Daftar Treatment</Link>
//                       {/* Anda bisa menambah menu lain di sini, misal: Reservasi, Jadwal Dokter, dll */}
//                   </div>
//               </div>
//           </div>

//           <Link to="/admin/transactions" title={!isSidebarOpen ? "Transaksi" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/transactions') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/transactions') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
//             {isSidebarOpen && <span className="truncate">Transaksi</span>}
//           </Link>

//           <Link to="/admin/sales-report" title={!isSidebarOpen ? "Laporan Penjualan" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/sales-report') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/sales-report') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
//             {isSidebarOpen && <span className="truncate">Laporan</span>}
//           </Link>

//           <Link to="/admin/users" title={!isSidebarOpen ? "Pelanggan" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/users') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/users') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
//             {isSidebarOpen && <span className="truncate">Pelanggan</span>}
//           </Link>

//           <Link to="/admin/reviews" title={!isSidebarOpen ? "Ulasan Pelanggan" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/reviews') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/reviews') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Ulasan</span>}
//           </Link>

//           <Link to="/admin/subscribers" title={!isSidebarOpen ? "Subscribers" : ""} className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes('/subscribers') ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/subscribers') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
//             {isSidebarOpen && <span className="truncate">Subscribers</span>}
//           </Link>

//           {/* ============================================================== */}
//           {/* LABEL: ACCOUNTING (MODUL KEUANGAN) */}
//           {/* ============================================================== */}
//           <div className="pt-2 mt-4 border-t border-gray-100">
//             {isSidebarOpen ? (
//                <p className="px-4 mt-2 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-opacity duration-300">Accounting</p>
//             ) : <div className="h-4 mt-2"></div>}

//             {/* LINK 1: COA */}
//             <Link
//               to="/admin/coas"
//               title={!isSidebarOpen ? "Chart of Accounts" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//                 pathname.includes('/coas') || pathname.includes('/category-coas')
//                   ? "bg-gycora-light text-gycora-dark"
//                   : "text-gray-700 hover:bg-gray-100"
//               } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/coas') || pathname.includes('/category-coas') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
//               </svg>
//               {isSidebarOpen && <span className="truncate">Chart of Accounts</span>}
//             </Link>

//             {/* LINK 2: PAYMENTS */}
//             <Link
//               to="/admin/transfer-receive"
//               title={!isSidebarOpen ? "Payments" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//                 pathname.includes('/transfer-receive')
//                   ? "bg-gycora-light text-gycora-dark"
//                   : "text-gray-700 hover:bg-gray-100"
//               } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/transfer-receive') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
//               </svg>
//               {isSidebarOpen && <span className="truncate">Payments</span>}
//             </Link>

//             {/* LINK 3: SUPPLIER */}
//             <Link
//               to="/admin/suppliers"
//               title={!isSidebarOpen ? "Suppliers" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//                 pathname.includes('/suppliers')
//                   ? "bg-gycora-light text-gycora-dark"
//                   : "text-gray-700 hover:bg-gray-100"
//               } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/suppliers') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//               </svg>
//               {isSidebarOpen && <span className="truncate">Suppliers</span>}
//             </Link>

//             {/* LINK 4: INVOICES */}
//             <Link
//               to="/admin/invoices"
//               title={!isSidebarOpen ? "Invoices" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//                 pathname.includes('/invoices')
//                   ? "bg-gycora-light text-gycora-dark"
//                   : "text-gray-700 hover:bg-gray-100"
//               } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/invoices') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//               {isSidebarOpen && <span className="truncate">Invoices</span>}
//             </Link>

//           </div>

//         </nav>

//         {/* Footer Sidebar (Logout) */}
//         <div className="p-4 border-t border-gray-100">
//           <button onClick={handleLogout} title={!isSidebarOpen ? "Logout" : ""} className={`flex items-center gap-3 py-2 w-full text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium text-sm ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}>
//             <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
//             {isSidebarOpen && <span>Logout</span>}
//           </button>
//         </div>
//       </aside>

//       {/* MAIN CONTENT AREA */}
//       <div className="flex flex-col flex-1 overflow-hidden">

//         {/* HEADER */}
//         <header className="z-0 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-100 shadow-sm">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gycora/20"
//               title="Toggle Sidebar"
//             >
//                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                </svg>
//             </button>

//              <h2 className="hidden text-lg font-semibold text-gray-800 capitalize sm:block">
//                 {pathname.split('/').pop() || 'Dashboard'}
//              </h2>
//           </div>

//           <div className="flex items-center gap-6">

//             {/* ICON MESSAGES/BELL */}
//             {/* <button
//               onClick={() => navigate('/admin/messages')}
//               className="relative p-2 text-gray-500 transition-colors rounded-lg hover:text-gycora hover:bg-gray-50"
//               title="Pesan Masuk"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3h9m-9 3h3m-6.75 4.125a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-10.5a3 3 0 0 0-3-3H6.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3Z" />
//               </svg>
//               {unreadCount > 0 && (
//                 <span className="absolute flex w-3 h-3 top-1 right-1">
//                   <span className="absolute inline-flex w-full h-full rounded-full opacity-75 bg-gycora animate-ping"></span>
//                   <span className="relative inline-flex w-3 h-3 text-[8px] font-bold text-white items-center justify-center rounded-full bg-gycora">
//                   </span>
//                 </span>
//               )}
//             </button> */}

//             {/* --- BARU: IKON PESAN (INBOX) KHUSUS ADMIN --- */}
//             {adminData && (
//               <button
//                 onClick={() => navigate("/admin/messages")} // Sesuaikan route Inbox Admin Anda
//                 className="relative p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora"
//                 title="Pesan Masuk"
//               >
//                 <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>

//                 {unreadCount > 0 && (
//                   <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white translate-x-1 -translate-y-1 bg-red-500 rounded-full shadow-sm animate-pulse">
//                     {unreadCount > 99 ? '99+' : unreadCount}
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
//                   {adminUser?.usertype === 'superadmin' ? 'Super Admin' : 'Staf Manajemen'}
//                 </p>
//               </div>
//               <img
//                 src={adminUser?.profile_image || `https://ui-avatars.com/api/?name=${adminUser?.first_name}+${adminUser?.last_name}&background=059669&color=fff&bold=true`}
//                 alt="Profile Avatar"
//                 className="object-cover w-10 h-10 rounded-full shadow-sm ring-2 ring-gycora-light"
//                 onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${adminUser?.first_name}+${adminUser?.last_name}&background=059669&color=fff&bold=true`; }}
//               />
//             </Link>
//           </div>
//         </header>

//         <main className="flex-1 overflow-y-auto bg-gray-50/50">
//           {children}
//         </main>

//       </div>
//     </div>
//   );
// }

/* eslint-disable react-hooks/set-state-in-effect */
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import logoGycora from "../../assets/gycora_logo.png";

// // PERBAIKAN 1: Pastikan path ini benar (naik dua level jika AdminLayout ada di src/components/admin)
// // Sesuaikan dengan struktur folder aktual Anda jika masih merah.
// import { useMessage } from "../../context/MessageContext";
// // import { BASE_URL } from "../../config/api";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isAuthorized, setIsAuthorized] = useState(false);

//   // --- STATE UNTUK MENU DROPDOWN SIDEBAR ---
//   const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
//   const [isClinicMenuOpen, setIsClinicMenuOpen] = useState(false);

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [adminUser, setAdminUser] = useState<any>(null);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const pathname = location.pathname;

//   // PERBAIKAN 2: Gunakan Context, hapus fungsi fetch manual dan state unreadCount lokal
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
//     setIsAuthorized(true);

//     // Ambil data notifikasi pesan via Context
//     fetchUnreadMessages();
//   }, [pathname, navigate, fetchUnreadMessages]);

//   // Efek untuk membuka dropdown secara otomatis jika rute aktif ada di dalamnya
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

//   if (!isAuthorized) {
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">
//         Memverifikasi Akses...
//       </div>
//     );
//   }

//   if (pathname === "/admin/login") {
//     return <>{children}</>;
//   }

//   // Helper untuk menentukan status aktif rute
//   const isProductsActive =
//     pathname === "/admin/products" ||
//     pathname.includes("/admin/products/create") ||
//     (pathname.includes("/admin/products/") && !pathname.includes("stocks"));
//   const isStocksActive = pathname.includes("/admin/stocks");
//   const isAnyProductSubmenuActive = isProductsActive || isStocksActive;

//   const isTreatmentsActive = pathname.includes("/admin/treatments");

//   return (
//     <div className="flex h-screen overflow-hidden font-sans bg-gray-50">
//       {/* SIDEBAR */}
//       <aside
//         className={`${
//           isSidebarOpen ? "w-64" : "w-20"
//         } bg-white border-r border-gray-200 flex flex-col shadow-sm z-10 transition-all duration-300 ease-in-out hidden md:flex`}
//       >
//         <div
//           className={`h-16 flex items-center border-b border-gray-100 overflow-hidden whitespace-nowrap transition-all duration-300 ${isSidebarOpen ? "px-6" : "justify-center px-0"}`}
//         >
//           <img
//             src={logoGycora}
//             alt="Gycora Logo"
//             className={`object-contain transition-all duration-300 ${isSidebarOpen ? "h-8" : "h-6"}`}
//           />
//           {isSidebarOpen && (
//             <span className="mt-1 ml-2 text-[10px] font-bold tracking-widest text-gycora uppercase">
//               Admin
//             </span>
//           )}
//         </div>

//         <nav className="flex-1 p-4 space-y-2 overflow-x-hidden overflow-y-auto custom-scrollbar">
//           {/* LABEL: MENU UTAMA */}
//           {isSidebarOpen ? (
//             <p className="px-4 mt-2 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-opacity duration-300">
//               Menu Utama
//             </p>
//           ) : (
//             <div className="h-4 mt-2"></div>
//           )}

//           <Link
//             to="/admin/dashboard"
//             title={!isSidebarOpen ? "Dashboard" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/dashboard") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg
//               className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/dashboard") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
//               />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Dashboard</span>}
//           </Link>

//           <Link
//             to="/admin/categories"
//             title={!isSidebarOpen ? "Kategori" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/categories") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg
//               className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/categories") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
//               />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Kategori</span>}
//           </Link>

//           {/* DROPDOWN PRODUK */}
//           <div className="flex flex-col">
//             <button
//               onClick={() => {
//                 if (!isSidebarOpen) setIsSidebarOpen(true);
//                 setIsProductMenuOpen(!isProductMenuOpen);
//               }}
//               title={!isSidebarOpen ? "Produk" : ""}
//               className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${isAnyProductSubmenuActive ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//             >
//               <div className="flex items-center gap-3">
//                 <svg
//                   className={`w-6 h-6 shrink-0 transition-colors ${isAnyProductSubmenuActive ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
//                   />
//                 </svg>
//                 {isSidebarOpen && <span className="truncate">Produk</span>}
//               </div>
//               {isSidebarOpen && (
//                 <svg
//                   className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`}
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M19 9l-7 7-7-7"
//                   />
//                 </svg>
//               )}
//             </button>
//             <div
//               className={`overflow-hidden transition-all duration-300 ease-in-out ${isProductMenuOpen && isSidebarOpen ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}
//             >
//               <div className="flex flex-col pl-2 space-y-1 border-l-2 border-gray-100 ml-11">
//                 <Link
//                   to="/admin/products"
//                   className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isProductsActive ? "text-gycora bg-emerald-50/50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}
//                 >
//                   Katalog Utama
//                 </Link>
//                 <Link
//                   to="/admin/stocks"
//                   className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isStocksActive ? "text-gycora bg-emerald-50/50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}
//                 >
//                   Stok & Batch Gudang
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* ============================================================== */}
//           {/* MENU KLINIK / TREATMENTS (BARU) */}
//           {/* ============================================================== */}
//           <div className="flex flex-col">
//             <button
//               onClick={() => {
//                 if (!isSidebarOpen) setIsSidebarOpen(true);
//                 setIsClinicMenuOpen(!isClinicMenuOpen);
//               }}
//               title={!isSidebarOpen ? "Klinik" : ""}
//               className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${isTreatmentsActive ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//             >
//               <div className="flex items-center gap-3">
//                 {/* Ikon Stetoskop / Medis */}
//                 <svg
//                   className={`w-6 h-6 shrink-0 transition-colors ${isTreatmentsActive ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
//                   />
//                 </svg>
//                 {isSidebarOpen && <span className="truncate">Klinik</span>}
//               </div>
//               {isSidebarOpen && (
//                 <svg
//                   className={`w-4 h-4 transition-transform duration-200 ${isClinicMenuOpen ? "rotate-180" : ""}`}
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M19 9l-7 7-7-7"
//                   />
//                 </svg>
//               )}
//             </button>
//             <div
//               className={`overflow-hidden transition-all duration-300 ease-in-out ${isClinicMenuOpen && isSidebarOpen ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}
//             >
//               <div className="flex flex-col pl-2 space-y-1 border-l-2 border-gray-100 ml-11">
//                 <Link
//                   to="/admin/treatments"
//                   className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isTreatmentsActive ? "text-gycora bg-emerald-50/50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}
//                 >
//                   Daftar Treatment
//                 </Link>
//               </div>
//             </div>
//           </div>

//           <Link
//             to="/admin/transactions"
//             title={!isSidebarOpen ? "Transaksi" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/transactions") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg
//               className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/transactions") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//               />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Transaksi</span>}
//           </Link>

//           <Link
//             to="/admin/sales-report"
//             title={!isSidebarOpen ? "Laporan Penjualan" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/sales-report") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg
//               className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/sales-report") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//               />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Laporan</span>}
//           </Link>

//           <Link
//             to="/admin/users"
//             title={!isSidebarOpen ? "Pelanggan" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/users") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg
//               className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/users") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
//               />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Pelanggan</span>}
//           </Link>

//           <Link
//             to="/admin/reviews"
//             title={!isSidebarOpen ? "Ulasan Pelanggan" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/reviews") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg
//               className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/reviews") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
//               />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Ulasan</span>}
//           </Link>

//           <Link
//             to="/admin/subscribers"
//             title={!isSidebarOpen ? "Subscribers" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/subscribers") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg
//               className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/subscribers") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//               />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Subscribers</span>}
//           </Link>

//           <Link
//             to="/admin/audit-logs"
//             title={!isSidebarOpen ? "System Logs" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/audit-logs") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg
//               className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/audit-logs") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//               />
//             </svg>
//             {isSidebarOpen && <span className="truncate">System Logs</span>}
//           </Link>

//           {/* ============================================================== */}
//           {/* LABEL: ACCOUNTING (MODUL KEUANGAN) */}
//           {/* ============================================================== */}
//           <div className="pt-2 mt-4 border-t border-gray-100">
//             {isSidebarOpen ? (
//               <p className="px-4 mt-2 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-opacity duration-300">
//                 Accounting
//               </p>
//             ) : (
//               <div className="h-4 mt-2"></div>
//             )}

//             {/* LINK 1: COA */}
//             <Link
//               to="/admin/coas"
//               title={!isSidebarOpen ? "Chart of Accounts" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//                 pathname.includes("/coas") ||
//                 pathname.includes("/category-coas")
//                   ? "bg-gycora-light text-gycora-dark"
//                   : "text-gray-700 hover:bg-gray-100"
//               } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg
//                 className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/coas") || pathname.includes("/category-coas") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
//                 />
//               </svg>
//               {isSidebarOpen && (
//                 <span className="truncate">Chart of Accounts</span>
//               )}
//             </Link>

//             {/* LINK 2: PAYMENTS */}
//             <Link
//               to="/admin/transfer-receive"
//               title={!isSidebarOpen ? "Payments" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//                 pathname.includes("/transfer-receive")
//                   ? "bg-gycora-light text-gycora-dark"
//                   : "text-gray-700 hover:bg-gray-100"
//               } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg
//                 className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/transfer-receive") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
//                 />
//               </svg>
//               {isSidebarOpen && <span className="truncate">Payments</span>}
//             </Link>

//             {/* LINK 3: SUPPLIER */}
//             <Link
//               to="/admin/suppliers"
//               title={!isSidebarOpen ? "Suppliers" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//                 pathname.includes("/suppliers")
//                   ? "bg-gycora-light text-gycora-dark"
//                   : "text-gray-700 hover:bg-gray-100"
//               } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg
//                 className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/suppliers") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//                 />
//               </svg>
//               {isSidebarOpen && <span className="truncate">Suppliers</span>}
//             </Link>

//             {/* LINK 4: INVOICES */}
//             <Link
//               to="/admin/invoices"
//               title={!isSidebarOpen ? "Invoices" : ""}
//               className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//                 pathname.includes("/invoices")
//                   ? "bg-gycora-light text-gycora-dark"
//                   : "text-gray-700 hover:bg-gray-100"
//               } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//             >
//               <svg
//                 className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/invoices") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                 />
//               </svg>
//               {isSidebarOpen && <span className="truncate">Invoices</span>}
//             </Link>
//           </div>
//         </nav>

//         {/* Footer Sidebar (Logout) */}
//         <div className="p-4 border-t border-gray-100">
//           <button
//             onClick={handleLogout}
//             title={!isSidebarOpen ? "Logout" : ""}
//             className={`flex items-center gap-3 py-2 w-full text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium text-sm ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg
//               className="w-6 h-6 shrink-0"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//               />
//             </svg>
//             {isSidebarOpen && <span>Logout</span>}
//           </button>
//         </div>
//       </aside>

//       {/* MAIN CONTENT AREA */}
//       <div className="flex flex-col flex-1 overflow-hidden">
//         {/* HEADER */}
//         <header className="z-0 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-100 shadow-sm">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gycora/20"
//               title="Toggle Sidebar"
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             </button>

//             <h2 className="hidden text-lg font-semibold text-gray-800 capitalize sm:block">
//               {pathname.split("/").pop() || "Dashboard"}
//             </h2>
//           </div>

//           <div className="flex items-center gap-6">
//             {/* --- BARU: IKON PESAN (INBOX) KHUSUS ADMIN --- */}
//             {adminUser && (
//               <button
//                 onClick={() => navigate("/admin/messages")} // Sesuaikan route Inbox Admin Anda
//                 className="relative p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora"
//                 title="Pesan Masuk"
//               >
//                 <svg
//                   className="w-5 h-5 md:w-6 md:h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="1.5"
//                     d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                   />
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
//                 className="object-cover w-10 h-10 rounded-full shadow-sm ring-2 ring-gycora-light"
//                 onError={(e) => {
//                   e.currentTarget.src = `https://ui-avatars.com/api/?name=${adminUser?.first_name}+${adminUser?.last_name}&background=059669&color=fff&bold=true`;
//                 }}
//               />
//             </Link>
//           </div>
//         </header>

//         <main className="flex-1 overflow-y-auto bg-gray-50/50">{children}</main>
//       </div>
//     </div>
//   );
// }

/* eslint-disable react-hooks/set-state-in-effect */
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import logoGycora from "../../assets/gycora_logo.png";

// PERBAIKAN 1: Pastikan path ini benar (naik dua level jika AdminLayout ada di src/components/admin)
import { useMessage } from "../../context/MessageContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // --- STATE UNTUK MENU DROPDOWN SIDEBAR ---
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [isClinicMenuOpen, setIsClinicMenuOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [adminUser, setAdminUser] = useState<any>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  // PERBAIKAN 2: Gunakan Context, hapus fungsi fetch manual dan state unreadCount lokal
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
    const allowedRoles = ["admin", "superadmin", "gudang", "accounting"];

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
    setIsAuthorized(true);

    // Ambil data notifikasi pesan via Context
    fetchUnreadMessages();
  }, [pathname, navigate, fetchUnreadMessages]);

  // Efek untuk membuka dropdown secara otomatis jika rute aktif ada di dalamnya
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

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">
        Memverifikasi Akses...
      </div>
    );
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Helper untuk menentukan status aktif rute
  const isProductsActive =
    pathname === "/admin/products" ||
    pathname.includes("/admin/products/create") ||
    (pathname.includes("/admin/products/") && !pathname.includes("stocks"));
  const isStocksActive = pathname.includes("/admin/stocks");
  const isAnyProductSubmenuActive = isProductsActive || isStocksActive;

  const isTreatmentsActive = pathname.includes("/admin/treatments");

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-gray-50">
      {/* SIDEBAR */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-gray-200 flex flex-col shadow-sm z-10 transition-all duration-300 ease-in-out hidden md:flex`}
      >
        <div
          className={`h-16 flex items-center border-b border-gray-100 overflow-hidden whitespace-nowrap transition-all duration-300 ${isSidebarOpen ? "px-6" : "justify-center px-0"}`}
        >
          <img
            src={logoGycora}
            alt="Gycora Logo"
            className={`object-contain transition-all duration-300 ${isSidebarOpen ? "h-8" : "h-6"}`}
          />
          {isSidebarOpen && (
            <span className="mt-1 ml-2 text-[10px] font-bold tracking-widest text-gycora uppercase">
              Admin
            </span>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-x-hidden overflow-y-auto custom-scrollbar">
          {/* LABEL: MENU UTAMA */}
          {isSidebarOpen ? (
            <p className="px-4 mt-2 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-opacity duration-300">
              Menu Utama
            </p>
          ) : (
            <div className="h-4 mt-2"></div>
          )}

          <Link
            to="/admin/dashboard"
            title={!isSidebarOpen ? "Dashboard" : ""}
            className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/dashboard") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
          >
            <svg
              className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/dashboard") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            {isSidebarOpen && <span className="truncate">Dashboard</span>}
          </Link>

          <Link
            to="/admin/categories"
            title={!isSidebarOpen ? "Kategori" : ""}
            className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/categories") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
          >
            <svg
              className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/categories") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            {isSidebarOpen && <span className="truncate">Kategori</span>}
          </Link>

          {/* DROPDOWN PRODUK */}
          <div className="flex flex-col">
            <button
              onClick={() => {
                if (!isSidebarOpen) setIsSidebarOpen(true);
                setIsProductMenuOpen(!isProductMenuOpen);
              }}
              title={!isSidebarOpen ? "Produk" : ""}
              className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${isAnyProductSubmenuActive ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
            >
              <div className="flex items-center gap-3">
                <svg
                  className={`w-6 h-6 shrink-0 transition-colors ${isAnyProductSubmenuActive ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                {isSidebarOpen && <span className="truncate">Produk</span>}
              </div>
              {isSidebarOpen && (
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${isProductMenuOpen && isSidebarOpen ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}
            >
              <div className="flex flex-col pl-2 space-y-1 border-l-2 border-gray-100 ml-11">
                <Link
                  to="/admin/products"
                  className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isProductsActive ? "text-gycora bg-emerald-50/50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}
                >
                  Katalog Utama
                </Link>
                <Link
                  to="/admin/stocks"
                  className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isStocksActive ? "text-gycora bg-emerald-50/50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}
                >
                  Stok & Batch Gudang
                </Link>
              </div>
            </div>
          </div>

          {/* MENU KLINIK / TREATMENTS */}
          <div className="flex flex-col">
            <button
              onClick={() => {
                if (!isSidebarOpen) setIsSidebarOpen(true);
                setIsClinicMenuOpen(!isClinicMenuOpen);
              }}
              title={!isSidebarOpen ? "Klinik" : ""}
              className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${isTreatmentsActive ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
            >
              <div className="flex items-center gap-3">
                <svg
                  className={`w-6 h-6 shrink-0 transition-colors ${isTreatmentsActive ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
                {isSidebarOpen && <span className="truncate">Klinik</span>}
              </div>
              {isSidebarOpen && (
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isClinicMenuOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${isClinicMenuOpen && isSidebarOpen ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}
            >
              <div className="flex flex-col pl-2 space-y-1 border-l-2 border-gray-100 ml-11">
                <Link
                  to="/admin/treatments"
                  className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isTreatmentsActive ? "text-gycora bg-emerald-50/50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}
                >
                  Daftar Treatment
                </Link>
              </div>
            </div>
          </div>

          <Link
            to="/admin/transactions"
            title={!isSidebarOpen ? "Transaksi" : ""}
            className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/transactions") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
          >
            <svg
              className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/transactions") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            {isSidebarOpen && <span className="truncate">Transaksi</span>}
          </Link>

          <Link
            to="/admin/sales-report"
            title={!isSidebarOpen ? "Laporan Penjualan" : ""}
            className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/sales-report") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
          >
            <svg
              className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/sales-report") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {isSidebarOpen && <span className="truncate">Laporan</span>}
          </Link>

          <Link
            to="/admin/users"
            title={!isSidebarOpen ? "Pelanggan" : ""}
            className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/users") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
          >
            <svg
              className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/users") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            {isSidebarOpen && <span className="truncate">Pelanggan</span>}
          </Link>

          <Link
            to="/admin/reviews"
            title={!isSidebarOpen ? "Ulasan Pelanggan" : ""}
            className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/reviews") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
          >
            <svg
              className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/reviews") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            {isSidebarOpen && <span className="truncate">Ulasan</span>}
          </Link>

          {/* ============================================================== */}
          {/* MENU EVENTS (BARU) */}
          {/* ============================================================== */}
          <Link
            to="/admin/events"
            title={!isSidebarOpen ? "Event" : ""}
            className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/admin/events") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
          >
            <svg
              className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/admin/events") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            {isSidebarOpen && <span className="truncate">Events</span>}
          </Link>

          <Link
            to="/admin/subscribers"
            title={!isSidebarOpen ? "Subscribers" : ""}
            className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/subscribers") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
          >
            <svg
              className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/subscribers") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {isSidebarOpen && <span className="truncate">Subscribers</span>}
          </Link>

          <Link
            to="/admin/audit-logs"
            title={!isSidebarOpen ? "System Logs" : ""}
            className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${pathname.includes("/audit-logs") ? "bg-gycora-light text-gycora-dark" : "text-gray-700 hover:bg-gray-100"} ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
          >
            <svg
              className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/audit-logs") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            {isSidebarOpen && <span className="truncate">System Logs</span>}
          </Link>

          {/* ============================================================== */}
          {/* LABEL: ACCOUNTING (MODUL KEUANGAN) */}
          {/* ============================================================== */}
          <div className="pt-2 mt-4 border-t border-gray-100">
            {isSidebarOpen ? (
              <p className="px-4 mt-2 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-opacity duration-300">
                Accounting
              </p>
            ) : (
              <div className="h-4 mt-2"></div>
            )}

            {/* LINK 1: COA */}
            <Link
              to="/admin/coas"
              title={!isSidebarOpen ? "Chart of Accounts" : ""}
              className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
                pathname.includes("/coas") ||
                pathname.includes("/category-coas")
                  ? "bg-gycora-light text-gycora-dark"
                  : "text-gray-700 hover:bg-gray-100"
              } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
            >
              <svg
                className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/coas") || pathname.includes("/category-coas") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              {isSidebarOpen && (
                <span className="truncate">Chart of Accounts</span>
              )}
            </Link>

            {/* LINK 2: PAYMENTS */}
            <Link
              to="/admin/transfer-receive"
              title={!isSidebarOpen ? "Payments" : ""}
              className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
                pathname.includes("/transfer-receive")
                  ? "bg-gycora-light text-gycora-dark"
                  : "text-gray-700 hover:bg-gray-100"
              } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
            >
              <svg
                className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/transfer-receive") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
              {isSidebarOpen && <span className="truncate">Payments</span>}
            </Link>

            {/* LINK 3: SUPPLIER */}
            <Link
              to="/admin/suppliers"
              title={!isSidebarOpen ? "Suppliers" : ""}
              className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
                pathname.includes("/suppliers")
                  ? "bg-gycora-light text-gycora-dark"
                  : "text-gray-700 hover:bg-gray-100"
              } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
            >
              <svg
                className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/suppliers") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              {isSidebarOpen && <span className="truncate">Suppliers</span>}
            </Link>

            {/* LINK 4: INVOICES */}
            <Link
              to="/admin/invoices"
              title={!isSidebarOpen ? "Invoices" : ""}
              className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
                pathname.includes("/invoices")
                  ? "bg-gycora-light text-gycora-dark"
                  : "text-gray-700 hover:bg-gray-100"
              } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
            >
              <svg
                className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes("/invoices") ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {isSidebarOpen && <span className="truncate">Invoices</span>}
            </Link>
          </div>
        </nav>

        {/* Footer Sidebar (Logout) */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            title={!isSidebarOpen ? "Logout" : ""}
            className={`flex items-center gap-3 py-2 w-full text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium text-sm ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
          >
            <svg
              className="w-6 h-6 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* HEADER */}
        <header className="z-0 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gycora/20"
              title="Toggle Sidebar"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <h2 className="hidden text-lg font-semibold text-gray-800 capitalize sm:block">
              {pathname.split("/").pop() || "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            {/* --- BARU: IKON PESAN (INBOX) KHUSUS ADMIN --- */}
            {adminUser && (
              <button
                onClick={() => navigate("/admin/messages")} // Sesuaikan route Inbox Admin Anda
                className="relative p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora"
                title="Pesan Masuk"
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
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
                className="object-cover w-10 h-10 rounded-full shadow-sm ring-2 ring-gycora-light"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${adminUser?.first_name}+${adminUser?.last_name}&background=059669&color=fff&bold=true`;
                }}
              />
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50/50">{children}</main>
      </div>
    </div>
  );
}