// // import { useState, useEffect } from "react";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// // --- TIPE DATA ---
// type Role = "admin" | "gudang" | "accounting" | "reseller";

// interface ActionDefinition {
//   key: string;
//   label: string;
// }

// interface ModuleDefinition {
//   key: string;
//   label: string;
//   description: string;
//   actions?: ActionDefinition[];
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
//     // 👇 [PERBAIKAN] Menambahkan sub-aksi (CRUD) untuk Kategori 👇
//     actions: [
//       { key: "categories.create", label: "Tambah Kategori Baru" },
//       { key: "categories.edit", label: "Ubah (Edit) Kategori" },
//       { key: "categories.delete", label: "Hapus Kategori" },
//     ],
//   },
//   {
//     key: "products",
//     label: "Katalog Utama (Produk)",
//     description: "Mengelola daftar produk.",
//     actions: [
//       { key: "products.create", label: "Tambah Produk Baru" },
//       { key: "products.edit", label: "Ubah (Edit) Produk" },
//       { key: "products.delete", label: "Nonaktifkan (Hapus) Produk" },
//       { key: "products.detail", label: "Lihat Detail Produk" },
//     ],
//   },
//   {
//     key: "stocks",
//     label: "Stok & Batch Gudang",
//     description: "Mengatur pergerakan dan batch stok.",
//     actions: [{ key: "stocks.create", label: "Tambah Batch Stok Baru" }],
//   },
//   {
//     key: "treatments",
//     label: "Daftar Treatment (Klinik)",
//     description: "Mengelola layanan klinik kecantikan.",
//     actions: [
//       { key: "treatments.create", label: "Tambah Treatment Baru" },
//       { key: "treatments.edit", label: "Ubah (Edit) Treatment" },
//       { key: "treatments.delete", label: "Hapus Treatment" },
//       {
//         key: "treatments.approve",
//         label: "Persetujuan Janji Temu & Konsultasi",
//       },
//     ],
//   },
//   {
//     key: "transactions",
//     label: "Transaksi",
//     description: "Memantau dan memproses pesanan.",
//     actions: [
//       { key: "transactions.detail", label: "Lihat Detail Transaksi" },
//       {
//         key: "transactions.refund",
//         label: "Setujui/Tolak Pengembalian Dana (Refund)",
//       },
//       { key: "transactions.export", label: "Ekspor Data (PDF/Excel)" },
//     ],
//   },
//   {
//     key: "sales_report",
//     label: "Laporan Penjualan",
//     description: "Melihat rekapan omzet dan grafik penjualan.",
//     // 👇 [PERBAIKAN] Menambahkan sub-aksi untuk membatasi Ekspor Data 👇
//     actions: [
//       { key: "sales_report.export", label: "Ekspor Laporan (PDF/Excel)" },
//     ],
//   },
//   {
//     key: "users",
//     label: "Pelanggan",
//     description: "Melihat data pelanggan aplikasi.",
//     actions: [
//       { key: "users.detail", label: "Lihat Detail Pelanggan" },
//       { key: "users.chat", label: "Chat dengan Pelanggan" },
//     ],
//   },
//   {
//     key: "business_partners",
//     label: "Partner Bisnis",
//     description: "Manajemen data partner/reseller.",
//     actions: [
//       { key: "business_partners.approve", label: "Setujui/Tolak Kemitraan" },
//     ],
//   },
//   {
//     key: "reviews",
//     label: "Ulasan Pelanggan",
//     description: "Memoderasi ulasan produk/treatment.",
//     actions: [{ key: "reviews.delete", label: "Hapus Ulasan Pelanggan" }],
//   },
// {
//     key: "events",
//     label: "Events",
//     description: "Mengatur acara atau promo khusus.",
//     actions: [
//       { key: "events.create", label: "Tambah Event Baru" },
//       { key: "events.edit", label: "Ubah (Edit) Event" },
//       { key: "events.delete", label: "Hapus Event" },
//       { key: "events.detail", label: "Lihat Detail Event" },
//     ]
//   },
//   {
//     key: "subscribers",
//     label: "Subscribers",
//     description: "Mengelola data langganan email (newsletter).",
//     actions: [
//       { key: "subscribers.detail", label: "Lihat Detail Pelanggan (Mailing List)" },
//     ]
//   },
// {
//     key: "audit_logs",
//     label: "System Logs",
//     description: "Melihat riwayat aktivitas (audit trail).",
//     actions: [
//       { key: "audit_logs.detail", label: "Lihat Detail/Payload Log" },
//       { key: "audit_logs.export", label: "Ekspor Data Log (CSV)" },
//     ]
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
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);

//   const [policies, setPolicies] = useState<Record<Role, string[]>>({
//     admin: [],
//     gudang: [],
//     accounting: [],
//     reseller: [],
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

//   // [PERBAIKAN] Fungsi toggle sekarang menerima Role dan Module Key spesifik
//   const handleTogglePermission = (roleId: Role, moduleKey: string) => {
//     setPolicies((prev) => {
//       const currentRolePermissions = prev[roleId] || [];
//       const hasPermission = currentRolePermissions.includes(moduleKey);

//       let newPermissions;
//       if (hasPermission) {
//         newPermissions = currentRolePermissions.filter((k) => k !== moduleKey);
//       } else {
//         newPermissions = [...currentRolePermissions, moduleKey];
//       }

//       return {
//         ...prev,
//         [roleId]: newPermissions,
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
//         text: "Matriks kebijakan akses berhasil diperbarui.",
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
//       <div className="flex items-center justify-center h-full min-h-[400px]">
//         <div className="w-8 h-8 border-4 border-gray-200 rounded-full border-t-gycora animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-[1400px] mx-auto animate-fade-in">
//       {/* HEADER SECTION */}
//       <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
//             Access Policy Matrix
//           </h1>
//           <p className="max-w-3xl mt-1 text-sm text-gray-500">
//             Centang kotak pada matriks di bawah untuk memberikan otorisasi menu
//             atau aksi (CRUD) kepada masing-masing Role. Pengaturan ini akan
//             langsung membatasi akses pada tampilan antarmuka.
//           </p>
//         </div>
//         <button
//           onClick={handleSavePolicies}
//           disabled={isSaving}
//           className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold tracking-wider text-white uppercase transition-all rounded-lg bg-gycora hover:bg-gycora-dark focus:ring-4 focus:ring-gycora/20 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-md"
//         >
//           {isSaving ? "Menyimpan..." : "Simpan Matriks"}
//         </button>
//       </div>

//       {/* MATRIX TABLE SECTION */}
//       <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
//         <div className="overflow-x-auto custom-scrollbar">
//           <table className="w-full text-left border-collapse">
//             <thead className="bg-gray-50/80">
//               <tr>
//                 <th className="sticky left-0 z-10 p-4 text-xs font-bold tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50 min-w-[280px]">
//                   Modul & Aksi
//                 </th>
//                 {ROLES.map((role) => (
//                   <th
//                     key={role.id}
//                     className="p-4 text-xs font-bold tracking-wider text-center text-gray-700 uppercase border-b border-gray-200 min-w-[140px]"
//                   >
//                     {role.label}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {AVAILABLE_MODULES.map((module) => (
//                 <React.Fragment key={module.key}>
//                   {/* PARENT ROW */}
//                   <tr className="transition-colors hover:bg-gray-50/50">
//                     <td className="sticky left-0 z-10 p-4 bg-white border-r border-gray-100/50">
//                       <div className="flex flex-col">
//                         <span className="font-bold text-gray-900">
//                           {module.label}
//                         </span>
//                         <span className="mt-0.5 text-[10px] text-gray-500 truncate max-w-[250px]">
//                           {module.description}
//                         </span>
//                       </div>
//                     </td>
//                     {ROLES.map((role) => {
//                       const isGranted =
//                         policies[role.id]?.includes(module.key) || false;
//                       return (
//                         <td
//                           key={`${module.key}-${role.id}`}
//                           className="p-4 text-center align-middle border-x border-gray-50/50"
//                         >
//                           <label className="inline-flex items-center cursor-pointer">
//                             <input
//                               type="checkbox"
//                               checked={isGranted}
//                               onChange={() =>
//                                 handleTogglePermission(role.id, module.key)
//                               }
//                               className="w-5 h-5 transition-all border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora focus:ring-offset-1 hover:border-gycora"
//                             />
//                           </label>
//                         </td>
//                       );
//                     })}
//                   </tr>

//                   {/* CHILD ACTIONS ROWS */}
//                   {module.actions &&
//                     module.actions.map((action) => (
//                       <tr
//                         key={action.key}
//                         className="bg-gray-50/30 hover:bg-gray-100/50"
//                       >
//                         <td className="sticky left-0 z-10 px-4 py-3 border-r bg-gray-50/80 border-gray-100/50 pl-9">
//                           <div className="flex items-center text-xs font-medium text-gray-600">
//                             <span className="mr-2 text-gray-400">↳</span>
//                             {action.label}
//                           </div>
//                         </td>
//                         {ROLES.map((role) => {
//                           const isGranted =
//                             policies[role.id]?.includes(action.key) || false;
//                           return (
//                             <td
//                               key={`${action.key}-${role.id}`}
//                               className="px-4 py-3 text-center align-middle border-x border-gray-50/50"
//                             >
//                               <label className="inline-flex items-center cursor-pointer">
//                                 <input
//                                   type="checkbox"
//                                   checked={isGranted}
//                                   onChange={() =>
//                                     handleTogglePermission(role.id, action.key)
//                                   }
//                                   className="w-4 h-4 transition-all border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora focus:ring-offset-1 hover:border-gycora"
//                                 />
//                               </label>
//                             </td>
//                           );
//                         })}
//                       </tr>
//                     ))}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// // --- TIPE DATA ---
// // 👇 [PERBAIKAN] Hapus "reseller" dari tipe Role
// type Role = "admin" | "gudang" | "accounting";

// interface ActionDefinition {
//   key: string;
//   label: string;
// }

// interface ModuleDefinition {
//   key: string;
//   label: string;
//   description: string;
//   actions?: ActionDefinition[];
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
//     actions: [
//       { key: "categories.create", label: "Tambah Kategori Baru" },
//       { key: "categories.edit", label: "Ubah (Edit) Kategori" },
//       { key: "categories.delete", label: "Hapus Kategori" },
//     ],
//   },
//   {
//     key: "products",
//     label: "Katalog Utama (Produk)",
//     description: "Mengelola daftar produk.",
//     actions: [
//       { key: "products.create", label: "Tambah Produk Baru" },
//       { key: "products.edit", label: "Ubah (Edit) Produk" },
//       { key: "products.delete", label: "Nonaktifkan (Hapus) Produk" },
//       { key: "products.detail", label: "Lihat Detail Produk" },
//     ],
//   },
//   {
//     key: "stocks",
//     label: "Stok & Batch Gudang",
//     description: "Mengatur pergerakan dan batch stok.",
//     actions: [{ key: "stocks.create", label: "Tambah Batch Stok Baru" }],
//   },
//   {
//     key: "treatments",
//     label: "Daftar Treatment (Klinik)",
//     description: "Mengelola layanan klinik kecantikan.",
//     actions: [
//       { key: "treatments.create", label: "Tambah Treatment Baru" },
//       { key: "treatments.edit", label: "Ubah (Edit) Treatment" },
//       { key: "treatments.delete", label: "Hapus Treatment" },
//       {
//         key: "treatments.approve",
//         label: "Persetujuan Janji Temu & Konsultasi",
//       },
//     ],
//   },
//   {
//     key: "transactions",
//     label: "Transaksi",
//     description: "Memantau dan memproses pesanan.",
//     actions: [
//       { key: "transactions.detail", label: "Lihat Detail Transaksi" },
//       {
//         key: "transactions.refund",
//         label: "Setujui/Tolak Pengembalian Dana (Refund)",
//       },
//       { key: "transactions.export", label: "Ekspor Data (PDF/Excel)" },
//     ],
//   },
//   {
//     key: "sales_report",
//     label: "Laporan Penjualan",
//     description: "Melihat rekapan omzet dan grafik penjualan.",
//     actions: [
//       { key: "sales_report.export", label: "Ekspor Laporan (PDF/Excel)" },
//     ],
//   },
//   {
//     key: "users",
//     label: "Pelanggan",
//     description: "Melihat data pelanggan aplikasi.",
//     actions: [
//       { key: "users.detail", label: "Lihat Detail Pelanggan" },
//       { key: "users.chat", label: "Chat dengan Pelanggan" },
//     ],
//   },
//   {
//     key: "business_partners",
//     label: "Partner Bisnis",
//     description: "Manajemen data partner/reseller.",
//     actions: [
//       { key: "business_partners.approve", label: "Setujui/Tolak Kemitraan" },
//     ],
//   },
//   {
//     key: "reviews",
//     label: "Ulasan Pelanggan",
//     description: "Memoderasi ulasan produk/treatment.",
//     actions: [{ key: "reviews.delete", label: "Hapus Ulasan Pelanggan" }],
//   },
//   {
//     key: "events",
//     label: "Events",
//     description: "Mengatur acara atau promo khusus.",
//     actions: [
//       { key: "events.create", label: "Tambah Event Baru" },
//       { key: "events.edit", label: "Ubah (Edit) Event" },
//       { key: "events.delete", label: "Hapus Event" },
//       { key: "events.detail", label: "Lihat Detail Event" },
//     ]
//   },
//   {
//     key: "subscribers",
//     label: "Subscribers",
//     description: "Mengelola data langganan email (newsletter).",
//     actions: [
//       { key: "subscribers.detail", label: "Lihat Detail Pelanggan (Mailing List)" },
//     ]
//   },
//   {
//     key: "audit_logs",
//     label: "System Logs",
//     description: "Melihat riwayat aktivitas (audit trail).",
//     actions: [
//       { key: "audit_logs.detail", label: "Lihat Detail/Payload Log" },
//       { key: "audit_logs.export", label: "Ekspor Data Log (CSV)" },
//     ]
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

// // 👇 [PERBAIKAN] Hapus objek Reseller dari array ROLES
// const ROLES: { id: Role; label: string }[] = [
//   { id: "admin", label: "Admin Umum" },
//   { id: "gudang", label: "Tim Gudang" },
//   { id: "accounting", label: "Accounting & Finance" },
// ];

// export default function AccessPolicyManagement() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);

//   // 👇 [PERBAIKAN] Hapus key reseller dari inisialisasi state
//   const [policies, setPolicies] = useState<Record<Role, string[]>>({
//     admin: [],
//     gudang: [],
//     accounting: [],
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

//   const handleTogglePermission = (roleId: Role, moduleKey: string) => {
//     setPolicies((prev) => {
//       const currentRolePermissions = prev[roleId] || [];
//       const hasPermission = currentRolePermissions.includes(moduleKey);

//       let newPermissions;
//       if (hasPermission) {
//         newPermissions = currentRolePermissions.filter((k) => k !== moduleKey);
//       } else {
//         newPermissions = [...currentRolePermissions, moduleKey];
//       }

//       return {
//         ...prev,
//         [roleId]: newPermissions,
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
//         text: "Matriks kebijakan akses berhasil diperbarui.",
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
//       <div className="flex items-center justify-center h-full min-h-[400px]">
//         <div className="w-8 h-8 border-4 border-gray-200 rounded-full border-t-gycora animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-[1400px] mx-auto animate-fade-in">
//       {/* HEADER SECTION */}
//       <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
//             Access Policy Matrix
//           </h1>
//           <p className="max-w-3xl mt-1 text-sm text-gray-500">
//             Centang kotak pada matriks di bawah untuk memberikan otorisasi menu
//             atau aksi (CRUD) kepada masing-masing Role. Pengaturan ini akan
//             langsung membatasi akses pada tampilan antarmuka.
//           </p>
//         </div>
//         <button
//           onClick={handleSavePolicies}
//           disabled={isSaving}
//           className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold tracking-wider text-white uppercase transition-all rounded-lg bg-gycora hover:bg-gycora-dark focus:ring-4 focus:ring-gycora/20 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-md"
//         >
//           {isSaving ? "Menyimpan..." : "Simpan Matriks"}
//         </button>
//       </div>

//       {/* MATRIX TABLE SECTION */}
//       <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
//         <div className="overflow-x-auto custom-scrollbar">
//           <table className="w-full text-left border-collapse">
//             <thead className="bg-gray-50/80">
//               <tr>
//                 <th className="sticky left-0 z-10 p-4 text-xs font-bold tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50 min-w-[280px]">
//                   Modul & Aksi
//                 </th>
//                 {ROLES.map((role) => (
//                   <th
//                     key={role.id}
//                     className="p-4 text-xs font-bold tracking-wider text-center text-gray-700 uppercase border-b border-gray-200 min-w-[140px]"
//                   >
//                     {role.label}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {AVAILABLE_MODULES.map((module) => (
//                 <React.Fragment key={module.key}>
//                   {/* PARENT ROW */}
//                   <tr className="transition-colors hover:bg-gray-50/50">
//                     <td className="sticky left-0 z-10 p-4 bg-white border-r border-gray-100/50">
//                       <div className="flex flex-col">
//                         <span className="font-bold text-gray-900">
//                           {module.label}
//                         </span>
//                         <span className="mt-0.5 text-[10px] text-gray-500 truncate max-w-[250px]">
//                           {module.description}
//                         </span>
//                       </div>
//                     </td>
//                     {ROLES.map((role) => {
//                       const isGranted =
//                         policies[role.id]?.includes(module.key) || false;
//                       return (
//                         <td
//                           key={`${module.key}-${role.id}`}
//                           className="p-4 text-center align-middle border-x border-gray-50/50"
//                         >
//                           <label className="inline-flex items-center cursor-pointer">
//                             <input
//                               type="checkbox"
//                               checked={isGranted}
//                               onChange={() =>
//                                 handleTogglePermission(role.id, module.key)
//                               }
//                               className="w-5 h-5 transition-all border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora focus:ring-offset-1 hover:border-gycora"
//                             />
//                           </label>
//                         </td>
//                       );
//                     })}
//                   </tr>

//                   {/* CHILD ACTIONS ROWS */}
//                   {module.actions &&
//                     module.actions.map((action) => (
//                       <tr
//                         key={action.key}
//                         className="bg-gray-50/30 hover:bg-gray-100/50"
//                       >
//                         <td className="sticky left-0 z-10 px-4 py-3 border-r bg-gray-50/80 border-gray-100/50 pl-9">
//                           <div className="flex items-center text-xs font-medium text-gray-600">
//                             <span className="mr-2 text-gray-400">↳</span>
//                             {action.label}
//                           </div>
//                         </td>
//                         {ROLES.map((role) => {
//                           const isGranted =
//                             policies[role.id]?.includes(action.key) || false;
//                           return (
//                             <td
//                               key={`${action.key}-${role.id}`}
//                               className="px-4 py-3 text-center align-middle border-x border-gray-50/50"
//                             >
//                               <label className="inline-flex items-center cursor-pointer">
//                                 <input
//                                   type="checkbox"
//                                   checked={isGranted}
//                                   onChange={() =>
//                                     handleTogglePermission(role.id, action.key)
//                                   }
//                                   className="w-4 h-4 transition-all border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora focus:ring-offset-1 hover:border-gycora"
//                                 />
//                               </label>
//                             </td>
//                           );
//                         })}
//                       </tr>
//                     ))}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

// --- TIPE DATA ---
// 👇 Menambahkan "cs" ke dalam tipe Role
type Role = "admin" | "gudang" | "accounting" | "cs";

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
    actions: [
      { key: "sales_report.export", label: "Ekspor Laporan (PDF/Excel)" },
    ],
  },
  {
    key: "users",
    label: "Pelanggan",
    description: "Melihat data pelanggan aplikasi.",
    actions: [
      { key: "users.detail", label: "Lihat Detail Pelanggan" },
      { key: "users.chat", label: "Chat dengan Pelanggan" },
    ],
  },
  {
    key: "business_partners",
    label: "Partner Bisnis",
    description: "Manajemen data partner/reseller.",
    actions: [
      { key: "business_partners.approve", label: "Setujui/Tolak Kemitraan" },
    ],
  },
  {
    key: "reviews",
    label: "Ulasan Pelanggan",
    description: "Memoderasi ulasan produk/treatment.",
    actions: [{ key: "reviews.delete", label: "Hapus Ulasan Pelanggan" }],
  },
  {
    key: "events",
    label: "Events",
    description: "Mengatur acara atau promo khusus.",
    actions: [
      { key: "events.create", label: "Tambah Event Baru" },
      { key: "events.edit", label: "Ubah (Edit) Event" },
      { key: "events.delete", label: "Hapus Event" },
      { key: "events.detail", label: "Lihat Detail Event" },
    ]
  },
  {
    key: "subscribers",
    label: "Subscribers",
    description: "Mengelola data langganan email (newsletter).",
    actions: [
      { key: "subscribers.detail", label: "Lihat Detail Pelanggan (Mailing List)" },
    ]
  },
  {
    key: "audit_logs",
    label: "System Logs",
    description: "Melihat riwayat aktivitas (audit trail).",
    actions: [
      { key: "audit_logs.detail", label: "Lihat Detail/Payload Log" },
      { key: "audit_logs.export", label: "Ekspor Data Log (CSV)" },
    ]
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

// 👇 Menambahkan objek "cs" ke dalam list rendering Tabel
const ROLES: { id: Role; label: string }[] = [
  { id: "admin", label: "Admin Umum" },
  { id: "gudang", label: "Tim Gudang" },
  { id: "accounting", label: "Accounting & Finance" },
  { id: "cs", label: "Customer Service" },
];

export default function AccessPolicyManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 👇 Menambahkan inisialisasi state untuk "cs"
  const [policies, setPolicies] = useState<Record<Role, string[]>>({
    admin: [],
    gudang: [],
    accounting: [],
    cs: [],
  });

  const fetchPolicies = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await axios.get(`${BASE_URL}/api/admin/access-policies`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Menggabungkan data dari server dengan struktur awal agar 'cs' tetap terdefinisi
      // jika di server/JSON belum ada data 'cs'.
      setPolicies(prev => ({ ...prev, ...res.data.data }));
      
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