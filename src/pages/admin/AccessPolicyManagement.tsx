// import { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api"; // Sesuaikan path dengan struktur proyek Anda

// // --- TIPE DATA ---
// type Role = "admin" | "gudang" | "accounting" | "reseller";

// interface ModuleDefinition {
//   key: string;
//   label: string;
//   description: string;
// }

// // --- KONSTANTA MODUL (Sesuai dengan AdminLayout.tsx) ---
// const AVAILABLE_MODULES: ModuleDefinition[] = [
//   {
//     key: "dashboard",
//     label: "Dashboard",
//     description: "Melihat ringkasan statistik utama.",
//   },
//   {
//     key: "categories",
//     label: "Kategori Produk",
//     description: "Mengelola kategori produk.",
//   },
//   {
//     key: "products",
//     label: "Katalog Utama (Produk)",
//     description: "Membuat, mengedit, dan menghapus produk.",
//   },
//   {
//     key: "stocks",
//     label: "Stok & Batch Gudang",
//     description: "Mengatur pergerakan dan batch stok.",
//   },
//   {
//     key: "treatments",
//     label: "Daftar Treatment (Klinik)",
//     description: "Mengelola layanan klinik kecantikan.",
//   },
//   {
//     key: "transactions",
//     label: "Transaksi",
//     description: "Memantau dan memproses pesanan.",
//   },
//   {
//     key: "sales_report",
//     label: "Laporan Penjualan",
//     description: "Melihat rekapan omzet dan grafik penjualan.",
//   },
//   {
//     key: "users",
//     label: "Pelanggan",
//     description: "Melihat data pelanggan aplikasi.",
//   },
//   {
//     key: "business_partners",
//     label: "Partner Bisnis",
//     description: "Manajemen data partner/reseller.",
//   },
//   {
//     key: "reviews",
//     label: "Ulasan Pelanggan",
//     description: "Memoderasi ulasan produk/treatment.",
//   },
//   {
//     key: "events",
//     label: "Events",
//     description: "Mengatur acara atau promo khusus.",
//   },
//   {
//     key: "subscribers",
//     label: "Subscribers",
//     description: "Mengelola data langganan email (newsletter).",
//   },
//   {
//     key: "audit_logs",
//     label: "System Logs",
//     description: "Melihat riwayat aktivitas (audit trail).",
//   },
//   {
//     key: "coas",
//     label: "Chart of Accounts",
//     description: "Manajemen kode akun akuntansi.",
//   },
//   {
//     key: "transfer_receive",
//     label: "Payments",
//     description: "Mencatat kas masuk/keluar.",
//   },
//   {
//     key: "suppliers",
//     label: "Suppliers",
//     description: "Data vendor/pemasok barang.",
//   },
//   {
//     key: "invoices",
//     label: "Invoices",
//     description: "Mengelola faktur tagihan.",
//   },
// ];

// const ROLES: { id: Role; label: string }[] = [
//   { id: "admin", label: "Admin Umum" },
//   { id: "gudang", label: "Tim Gudang" },
//   { id: "accounting", label: "Accounting & Finance" },
//   { id: "reseller", label: "Reseller (B2B)" },
// ];

// export default function AccessPolicyManagement() {
//   const [activeTab, setActiveTab] = useState<Role>("admin");
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);

//   // State untuk menyimpan kebijakan akses: Record<Role, string[]>
//   // Contoh: { admin: ['dashboard', 'products'], gudang: ['stocks'] }
//   const [policies, setPolicies] = useState<Record<Role, string[]>>({
//     admin: [],
//     gudang: [],
//     accounting: [],
//     reseller: [],
//   });

//   // Ambil data konfigurasi akses saat komponen dimuat
//   const fetchPolicies = async () => {
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem("admin_token");
//       //   const res = await axios.get(`${BASE_URL}/admin/access-policies`, {
//       //     headers: { Authorization: `Bearer ${token}` },
//       //   });

//       const res = await axios.get(`${BASE_URL}/api/admin/access-policies`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       // Asumsi backend mengembalikan data format JSON yang memetakan Role -> Array of Keys
//       setPolicies(res.data.data);
//     } catch (error) {
//       console.error("Gagal memuat Access Policies", error);
//       Swal.fire(
//         "Error",
//         "Gagal mengambil data konfigurasi akses dari server.",
//         "error",
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPolicies();
//   }, []);

//   // Fungsi untuk membalikkan (toggle) status izin suatu modul
//   const handleTogglePermission = (moduleKey: string) => {
//     setPolicies((prev) => {
//       const currentRolePermissions = prev[activeTab] || [];
//       const hasPermission = currentRolePermissions.includes(moduleKey);

//       let newPermissions;
//       if (hasPermission) {
//         // Hapus akses
//         newPermissions = currentRolePermissions.filter((k) => k !== moduleKey);
//       } else {
//         // Tambahkan akses
//         newPermissions = [...currentRolePermissions, moduleKey];
//       }

//       return {
//         ...prev,
//         [activeTab]: newPermissions,
//       };
//     });
//   };

//   // Fungsi untuk menyimpan perubahan ke backend
//   const handleSavePolicies = async () => {
//     setIsSaving(true);
//     try {
//       const token = localStorage.getItem("admin_token");
//       //   await axios.put(
//       //     `${BASE_URL}/admin/access-policies`,
//       //     { policies },
//       //     { headers: { Authorization: `Bearer ${token}` } },
//       //   );

//       await axios.put(
//         `${BASE_URL}/api/admin/access-policies`,
//         { policies },
//         { headers: { Authorization: `Bearer ${token}` } },
//       );

//       // Simpan juga ke localStorage agar layout langsung tahu tanpa refresh (Opsional)
//       localStorage.setItem("admin_access_policies", JSON.stringify(policies));

//       Swal.fire({
//         title: "Tersimpan!",
//         text: "Kebijakan akses berhasil diperbarui.",
//         icon: "success",
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       console.error("Gagal menyimpan Access Policies", error);
//       Swal.fire(
//         "Gagal!",
//         "Terjadi kesalahan saat menyimpan pengaturan.",
//         "error",
//       );
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <div className="w-8 h-8 border-4 border-gray-200 rounded-full border-t-gycora animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto animate-fade-in">
//       {/* HEADER SECTION */}
//       <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
//             Access Policy
//           </h1>
//           <p className="mt-1 text-sm text-gray-500">
//             Atur visibilitas menu dan otorisasi akses untuk setiap tipe pengguna
//             (Role). Superadmin secara otomatis memiliki akses penuh ke semua
//             modul.
//           </p>
//         </div>
//         <button
//           onClick={handleSavePolicies}
//           disabled={isSaving}
//           className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold tracking-wider text-white uppercase transition-all rounded-lg bg-gycora hover:bg-gycora-dark focus:ring-4 focus:ring-gycora/20 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isSaving ? (
//             "Menyimpan..."
//           ) : (
//             <>
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
//                 />
//               </svg>
//               Simpan Konfigurasi
//             </>
//           )}
//         </button>
//       </div>

//       <div className="flex flex-col gap-6 md:flex-row">
//         {/* SIDEBAR TABS (ROLES) */}
//         <div className="w-full md:w-64 shrink-0">
//           <div className="flex flex-row overflow-x-auto bg-white border border-gray-200 md:flex-col rounded-xl custom-scrollbar">
//             {ROLES.map((role) => (
//               <button
//                 key={role.id}
//                 onClick={() => setActiveTab(role.id)}
//                 className={`flex items-center justify-between px-4 py-4 text-sm font-medium transition-colors border-b border-gray-100 last:border-b-0 whitespace-nowrap md:whitespace-normal text-left ${
//                   activeTab === role.id
//                     ? "bg-gycora-light/30 text-gycora-dark border-l-4 border-l-gycora"
//                     : "text-gray-600 hover:bg-gray-50 border-l-4 border-l-transparent"
//                 }`}
//               >
//                 {role.label}
//                 <span className="hidden px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded-md md:inline-block">
//                   {policies[role.id]?.length || 0} Izin
//                 </span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* MAIN CONTENT (MODULES LIST) */}
//         <div className="flex-1 bg-white border border-gray-200 rounded-xl">
//           <div className="px-6 py-4 border-b border-gray-100">
//             <h2 className="text-lg font-bold text-gray-900">
//               Pengaturan Akses: {ROLES.find((r) => r.id === activeTab)?.label}
//             </h2>
//             <p className="text-sm text-gray-500">
//               Pilih menu mana saja yang boleh dilihat dan diakses oleh Role ini
//               di Dashboard Admin.
//             </p>
//           </div>

//           <div className="divide-y divide-gray-100">
//             {AVAILABLE_MODULES.map((module) => {
//               const isGranted =
//                 policies[activeTab]?.includes(module.key) || false;

//               return (
//                 <div
//                   key={module.key}
//                   className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50/50"
//                 >
//                   <div className="pr-4">
//                     <p className="font-bold text-gray-900">{module.label}</p>
//                     <p className="mt-0.5 text-xs text-gray-500">
//                       {module.description}
//                     </p>
//                   </div>

//                   {/* TOGGLE SWITCH */}
//                   <button
//                     type="button"
//                     onClick={() => handleTogglePermission(module.key)}
//                     className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gycora focus:ring-offset-2 ${
//                       isGranted ? "bg-gycora" : "bg-gray-200"
//                     }`}
//                   >
//                     <span className="sr-only">Use setting</span>
//                     <span
//                       aria-hidden="true"
//                       className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
//                         isGranted ? "translate-x-5" : "translate-x-0"
//                       }`}
//                     />
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// // --- TIPE DATA ---
// type Role = "admin" | "gudang" | "accounting" | "reseller";

// // [PERBAIKAN] Tambahkan interface untuk Aksi Spesifik (CRUD)
// interface ActionDefinition {
//   key: string;
//   label: string;
// }

// interface ModuleDefinition {
//   key: string;
//   label: string;
//   description: string;
//   actions?: ActionDefinition[]; // Properti baru yang opsional
// }

// // --- KONSTANTA MODUL ---
// const AVAILABLE_MODULES: ModuleDefinition[] = [
//   {
//     key: "dashboard",
//     label: "Dashboard",
//     description: "Melihat ringkasan statistik utama.",
//   },
//   {
//     key: "categories",
//     label: "Kategori Produk",
//     description: "Mengelola kategori produk.",
//   },
//   {
//     key: "products",
//     label: "Katalog Utama (Produk)",
//     description: "Mengelola daftar produk.",
//     // 👇 [PERBAIKAN] Menambahkan sub-aksi (CRUD) spesifik untuk halaman Produk 👇
//     actions: [
//       { key: "products.create", label: "Tambah Produk Baru" },
//       { key: "products.edit", label: "Ubah (Edit) Produk" },
//       { key: "products.delete", label: "Nonaktifkan (Hapus) Produk" },
//       { key: "products.detail", label: "Lihat Detail Produk" },
//     ]
//   },
//   {
//     key: "stocks",
//     label: "Stok & Batch Gudang",
//     description: "Mengatur pergerakan dan batch stok.",
//   },
//   {
//     key: "treatments",
//     label: "Daftar Treatment (Klinik)",
//     description: "Mengelola layanan klinik kecantikan.",
//   },
//   {
//     key: "transactions",
//     label: "Transaksi",
//     description: "Memantau dan memproses pesanan.",
//   },
//   {
//     key: "sales_report",
//     label: "Laporan Penjualan",
//     description: "Melihat rekapan omzet dan grafik penjualan.",
//   },
//   {
//     key: "users",
//     label: "Pelanggan",
//     description: "Melihat data pelanggan aplikasi.",
//   },
//   {
//     key: "business_partners",
//     label: "Partner Bisnis",
//     description: "Manajemen data partner/reseller.",
//   },
//   {
//     key: "reviews",
//     label: "Ulasan Pelanggan",
//     description: "Memoderasi ulasan produk/treatment.",
//   },
//   {
//     key: "events",
//     label: "Events",
//     description: "Mengatur acara atau promo khusus.",
//   },
//   {
//     key: "subscribers",
//     label: "Subscribers",
//     description: "Mengelola data langganan email (newsletter).",
//   },
//   {
//     key: "audit_logs",
//     label: "System Logs",
//     description: "Melihat riwayat aktivitas (audit trail).",
//   },
//   {
//     key: "coas",
//     label: "Chart of Accounts",
//     description: "Manajemen kode akun akuntansi.",
//   },
//   {
//     key: "transfer_receive",
//     label: "Payments",
//     description: "Mencatat kas masuk/keluar.",
//   },
//   {
//     key: "suppliers",
//     label: "Suppliers",
//     description: "Data vendor/pemasok barang.",
//   },
//   {
//     key: "invoices",
//     label: "Invoices",
//     description: "Mengelola faktur tagihan.",
//   },
// ];

// const ROLES: { id: Role; label: string }[] = [
//   { id: "admin", label: "Admin Umum" },
//   { id: "gudang", label: "Tim Gudang" },
//   { id: "accounting", label: "Accounting & Finance" },
//   { id: "reseller", label: "Reseller (B2B)" },
// ];

// export default function AccessPolicyManagement() {
//   const [activeTab, setActiveTab] = useState<Role>("admin");
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);

//   const [policies, setPolicies] = useState<Record<Role, string[]>>({
//     admin: [], gudang: [], accounting: [], reseller: [],
//   });

//   const fetchPolicies = async () => {
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem("admin_token");
//       const res = await axios.get(`${BASE_URL}/api/admin/access-policies`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setPolicies(res.data.data);
//     } catch (error) {
//       console.error("Gagal memuat Access Policies", error);
//       Swal.fire("Error", "Gagal mengambil data konfigurasi akses dari server.", "error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPolicies();
//   }, []);

//   const handleTogglePermission = (moduleKey: string) => {
//     setPolicies((prev) => {
//       const currentRolePermissions = prev[activeTab] || [];
//       const hasPermission = currentRolePermissions.includes(moduleKey);

//       let newPermissions;
//       if (hasPermission) {
//         newPermissions = currentRolePermissions.filter((k) => k !== moduleKey);
//       } else {
//         newPermissions = [...currentRolePermissions, moduleKey];
//       }

//       return {
//         ...prev,
//         [activeTab]: newPermissions,
//       };
//     });
//   };

//   const handleSavePolicies = async () => {
//     setIsSaving(true);
//     try {
//       const token = localStorage.getItem("admin_token");
//       await axios.put(
//         `${BASE_URL}/api/admin/access-policies`,
//         { policies },
//         { headers: { Authorization: `Bearer ${token}` } },
//       );

//       localStorage.setItem("admin_access_policies", JSON.stringify(policies));

//       Swal.fire({
//         title: "Tersimpan!",
//         text: "Kebijakan akses berhasil diperbarui.",
//         icon: "success",
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       console.error("Gagal menyimpan Access Policies", error);
//       Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan pengaturan.", "error");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <div className="w-8 h-8 border-4 border-gray-200 rounded-full border-t-gycora animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto animate-fade-in">
//       {/* HEADER SECTION */}
//       <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Access Policy</h1>
//           <p className="mt-1 text-sm text-gray-500">
//             Atur visibilitas menu dan otorisasi akses (CRUD) untuk setiap tipe pengguna. Superadmin otomatis memiliki akses penuh.
//           </p>
//         </div>
//         <button
//           onClick={handleSavePolicies}
//           disabled={isSaving}
//           className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold tracking-wider text-white uppercase transition-all rounded-lg bg-gycora hover:bg-gycora-dark focus:ring-4 focus:ring-gycora/20 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isSaving ? "Menyimpan..." : "Simpan Konfigurasi"}
//         </button>
//       </div>

//       <div className="flex flex-col gap-6 md:flex-row">
//         {/* SIDEBAR TABS (ROLES) */}
//         <div className="w-full shrink-0 md:w-64">
//           <div className="flex flex-row overflow-x-auto bg-white border border-gray-200 rounded-xl md:flex-col custom-scrollbar">
//             {ROLES.map((role) => (
//               <button
//                 key={role.id}
//                 onClick={() => setActiveTab(role.id)}
//                 className={`flex items-center justify-between px-4 py-4 text-sm font-medium transition-colors border-b border-gray-100 last:border-b-0 whitespace-nowrap md:whitespace-normal text-left ${
//                   activeTab === role.id
//                     ? "bg-gycora-light/30 text-gycora-dark border-l-4 border-l-gycora"
//                     : "text-gray-600 hover:bg-gray-50 border-l-4 border-l-transparent"
//                 }`}
//               >
//                 {role.label}
//                 <span className="hidden px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded-md md:inline-block">
//                   {policies[role.id]?.length || 0} Izin
//                 </span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* MAIN CONTENT (MODULES LIST) */}
//         <div className="flex-1 bg-white border border-gray-200 rounded-xl">
//           <div className="px-6 py-4 border-b border-gray-100">
//             <h2 className="text-lg font-bold text-gray-900">
//               Pengaturan Akses: {ROLES.find((r) => r.id === activeTab)?.label}
//             </h2>
//           </div>

//           <div className="divide-y divide-gray-100">
//             {AVAILABLE_MODULES.map((module) => {
//               const isGranted = policies[activeTab]?.includes(module.key) || false;

//               return (
//                 <div key={module.key} className="flex flex-col transition-colors hover:bg-gray-50/20">
//                   {/* PARENT MODULE ROW */}
//                   <div className="flex items-center justify-between px-6 py-4">
//                     <div className="pr-4">
//                       <p className="font-bold text-gray-900">{module.label}</p>
//                       <p className="mt-0.5 text-xs text-gray-500">{module.description}</p>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => handleTogglePermission(module.key)}
//                       className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gycora focus:ring-offset-2 ${
//                         isGranted ? "bg-gycora" : "bg-gray-200"
//                       }`}
//                     >
//                       <span className="sr-only">Use setting</span>
//                       <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isGranted ? "translate-x-5" : "translate-x-0"}`} />
//                     </button>
//                   </div>

//                   {/* CHILD ACTIONS (CRUD) ROW */}
//                   {module.actions && (
//                     <div className="px-6 py-3 space-y-3 border-t border-dashed bg-gray-50/50 border-gray-100/50 pl-14">
//                       {module.actions.map(action => {
//                         const isActionGranted = policies[activeTab]?.includes(action.key) || false;
//                         return (
//                           <div key={action.key} className="flex items-center justify-between">
//                             <span className="text-xs font-medium text-gray-600">↳ {action.label}</span>
//                             <button
//                               type="button"
//                               onClick={() => handleTogglePermission(action.key)}
//                               className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gycora focus:ring-offset-2 ${
//                                 isActionGranted ? "bg-emerald-500" : "bg-gray-300"
//                               }`}
//                             >
//                               <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isActionGranted ? "translate-x-4" : "translate-x-0"}`} />
//                             </button>
//                           </div>
//                         )
//                       })}
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

// --- TIPE DATA ---
type Role = "admin" | "gudang" | "accounting" | "reseller";

interface ActionDefinition {
  key: string;
  label: string;
}

interface ModuleDefinition {
  key: string;
  label: string;
  description: string;
  actions?: ActionDefinition[];
}

// --- KONSTANTA MODUL ---
const AVAILABLE_MODULES: ModuleDefinition[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    description: "Melihat ringkasan statistik utama.",
  },
  {
    key: "categories",
    label: "Kategori Produk",
    description: "Mengelola kategori produk.",
    // 👇 [PERBAIKAN] Menambahkan sub-aksi (CRUD) untuk Kategori 👇
    actions: [
      { key: "categories.create", label: "Tambah Kategori Baru" },
      { key: "categories.edit", label: "Ubah (Edit) Kategori" },
      { key: "categories.delete", label: "Hapus Kategori" },
    ],
  },
  {
    key: "products",
    label: "Katalog Utama (Produk)",
    description: "Mengelola daftar produk.",
    actions: [
      { key: "products.create", label: "Tambah Produk Baru" },
      { key: "products.edit", label: "Ubah (Edit) Produk" },
      { key: "products.delete", label: "Nonaktifkan (Hapus) Produk" },
      { key: "products.detail", label: "Lihat Detail Produk" },
    ],
  },
  {
    key: "stocks",
    label: "Stok & Batch Gudang",
    description: "Mengatur pergerakan dan batch stok.",
    actions: [{ key: "stocks.create", label: "Tambah Batch Stok Baru" }],
  },
  {
    key: "treatments",
    label: "Daftar Treatment (Klinik)",
    description: "Mengelola layanan klinik kecantikan.",
    actions: [
      { key: "treatments.create", label: "Tambah Treatment Baru" },
      { key: "treatments.edit", label: "Ubah (Edit) Treatment" },
      { key: "treatments.delete", label: "Hapus Treatment" },
      {
        key: "treatments.approve",
        label: "Persetujuan Janji Temu & Konsultasi",
      },
    ],
  },
  {
    key: "transactions",
    label: "Transaksi",
    description: "Memantau dan memproses pesanan.",
    actions: [
      { key: "transactions.detail", label: "Lihat Detail Transaksi" },
      {
        key: "transactions.refund",
        label: "Setujui/Tolak Pengembalian Dana (Refund)",
      },
      { key: "transactions.export", label: "Ekspor Data (PDF/Excel)" },
    ],
  },
  {
    key: "sales_report",
    label: "Laporan Penjualan",
    description: "Melihat rekapan omzet dan grafik penjualan.",
    // 👇 [PERBAIKAN] Menambahkan sub-aksi untuk membatasi Ekspor Data 👇
    actions: [
      { key: "sales_report.export", label: "Ekspor Laporan (PDF/Excel)" },
    ],
  },
  {
    key: "users",
    label: "Pelanggan",
    description: "Melihat data pelanggan aplikasi.",
  },
  {
    key: "business_partners",
    label: "Partner Bisnis",
    description: "Manajemen data partner/reseller.",
  },
  {
    key: "reviews",
    label: "Ulasan Pelanggan",
    description: "Memoderasi ulasan produk/treatment.",
  },
  {
    key: "events",
    label: "Events",
    description: "Mengatur acara atau promo khusus.",
  },
  {
    key: "subscribers",
    label: "Subscribers",
    description: "Mengelola data langganan email (newsletter).",
  },
  {
    key: "audit_logs",
    label: "System Logs",
    description: "Melihat riwayat aktivitas (audit trail).",
  },
  {
    key: "coas",
    label: "Chart of Accounts",
    description: "Manajemen kode akun akuntansi.",
  },
  {
    key: "transfer_receive",
    label: "Payments",
    description: "Mencatat kas masuk/keluar.",
  },
  {
    key: "suppliers",
    label: "Suppliers",
    description: "Data vendor/pemasok barang.",
  },
  {
    key: "invoices",
    label: "Invoices",
    description: "Mengelola faktur tagihan.",
  },
];

const ROLES: { id: Role; label: string }[] = [
  { id: "admin", label: "Admin Umum" },
  { id: "gudang", label: "Tim Gudang" },
  { id: "accounting", label: "Accounting & Finance" },
  { id: "reseller", label: "Reseller (B2B)" },
];

export default function AccessPolicyManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [policies, setPolicies] = useState<Record<Role, string[]>>({
    admin: [],
    gudang: [],
    accounting: [],
    reseller: [],
  });

  const fetchPolicies = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await axios.get(`${BASE_URL}/api/admin/access-policies`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPolicies(res.data.data);
    } catch (error) {
      console.error("Gagal memuat Access Policies", error);
      Swal.fire(
        "Error",
        "Gagal mengambil data konfigurasi akses dari server.",
        "error",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  // [PERBAIKAN] Fungsi toggle sekarang menerima Role dan Module Key spesifik
  const handleTogglePermission = (roleId: Role, moduleKey: string) => {
    setPolicies((prev) => {
      const currentRolePermissions = prev[roleId] || [];
      const hasPermission = currentRolePermissions.includes(moduleKey);

      let newPermissions;
      if (hasPermission) {
        newPermissions = currentRolePermissions.filter((k) => k !== moduleKey);
      } else {
        newPermissions = [...currentRolePermissions, moduleKey];
      }

      return {
        ...prev,
        [roleId]: newPermissions,
      };
    });
  };

  const handleSavePolicies = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("admin_token");
      await axios.put(
        `${BASE_URL}/api/admin/access-policies`,
        { policies },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      localStorage.setItem("admin_access_policies", JSON.stringify(policies));

      Swal.fire({
        title: "Tersimpan!",
        text: "Matriks kebijakan akses berhasil diperbarui.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Gagal menyimpan Access Policies", error);
      Swal.fire(
        "Gagal!",
        "Terjadi kesalahan saat menyimpan pengaturan.",
        "error",
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="w-8 h-8 border-4 border-gray-200 rounded-full border-t-gycora animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto animate-fade-in">
      {/* HEADER SECTION */}
      <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Access Policy Matrix
          </h1>
          <p className="max-w-3xl mt-1 text-sm text-gray-500">
            Centang kotak pada matriks di bawah untuk memberikan otorisasi menu
            atau aksi (CRUD) kepada masing-masing Role. Pengaturan ini akan
            langsung membatasi akses pada tampilan antarmuka.
          </p>
        </div>
        <button
          onClick={handleSavePolicies}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold tracking-wider text-white uppercase transition-all rounded-lg bg-gycora hover:bg-gycora-dark focus:ring-4 focus:ring-gycora/20 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-md"
        >
          {isSaving ? "Menyimpan..." : "Simpan Matriks"}
        </button>
      </div>

      {/* MATRIX TABLE SECTION */}
      <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/80">
              <tr>
                <th className="sticky left-0 z-10 p-4 text-xs font-bold tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50 min-w-[280px]">
                  Modul & Aksi
                </th>
                {ROLES.map((role) => (
                  <th
                    key={role.id}
                    className="p-4 text-xs font-bold tracking-wider text-center text-gray-700 uppercase border-b border-gray-200 min-w-[140px]"
                  >
                    {role.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {AVAILABLE_MODULES.map((module) => (
                <React.Fragment key={module.key}>
                  {/* PARENT ROW */}
                  <tr className="transition-colors hover:bg-gray-50/50">
                    <td className="sticky left-0 z-10 p-4 bg-white border-r border-gray-100/50">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900">
                          {module.label}
                        </span>
                        <span className="mt-0.5 text-[10px] text-gray-500 truncate max-w-[250px]">
                          {module.description}
                        </span>
                      </div>
                    </td>
                    {ROLES.map((role) => {
                      const isGranted =
                        policies[role.id]?.includes(module.key) || false;
                      return (
                        <td
                          key={`${module.key}-${role.id}`}
                          className="p-4 text-center align-middle border-x border-gray-50/50"
                        >
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isGranted}
                              onChange={() =>
                                handleTogglePermission(role.id, module.key)
                              }
                              className="w-5 h-5 transition-all border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora focus:ring-offset-1 hover:border-gycora"
                            />
                          </label>
                        </td>
                      );
                    })}
                  </tr>

                  {/* CHILD ACTIONS ROWS */}
                  {module.actions &&
                    module.actions.map((action) => (
                      <tr
                        key={action.key}
                        className="bg-gray-50/30 hover:bg-gray-100/50"
                      >
                        <td className="sticky left-0 z-10 px-4 py-3 border-r bg-gray-50/80 border-gray-100/50 pl-9">
                          <div className="flex items-center text-xs font-medium text-gray-600">
                            <span className="mr-2 text-gray-400">↳</span>
                            {action.label}
                          </div>
                        </td>
                        {ROLES.map((role) => {
                          const isGranted =
                            policies[role.id]?.includes(action.key) || false;
                          return (
                            <td
                              key={`${action.key}-${role.id}`}
                              className="px-4 py-3 text-center align-middle border-x border-gray-50/50"
                            >
                              <label className="inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={isGranted}
                                  onChange={() =>
                                    handleTogglePermission(role.id, action.key)
                                  }
                                  className="w-4 h-4 transition-all border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora focus:ring-offset-1 hover:border-gycora"
                                />
                              </label>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
