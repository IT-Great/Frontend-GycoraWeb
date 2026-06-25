// // import React, { useState, FormEvent } from 'react';
// import React, { useState } from "react";
// import axios, { AxiosError } from "axios";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// // 1. Definisikan Tipe Data untuk Form (TypeScript)
// interface PartnerFormData {
//   business_name: string;
//   sales_platform: string;
//   monthly_capacity: string;
//   additional_notes: string;
// }

// const BusinessPartnerPage: React.FC = () => {
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [formData, setFormData] = useState<PartnerFormData>({
//     business_name: "",
//     sales_platform: "",
//     monthly_capacity: "",
//     additional_notes: "",
//   });

//   // URL API Backend Anda (Sesuaikan dengan config Anda)
// //   const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

//   // 2. Fungsi Penanganan Perubahan Input
//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >,
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // 3. Fungsi Pengiriman Form
//   //   const handleSubmit = async (e: FormEvent) => {
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     if (!token) {
//       Swal.fire({
//         icon: "warning",
//         title: "Login Dibutuhkan",
//         text: "Silakan login terlebih dahulu untuk mendaftar sebagai Business Partner.",
//         confirmButtonColor: "#000",
//       });
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const response = await axios.post(`${BASE_URL}/api/reseller/apply`, formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       Swal.fire({
//         icon: "success",
//         title: "Pendaftaran Berhasil!",
//         text:
//           response.data.message ||
//           "Tim kami akan segera meninjau aplikasi Anda.",
//         confirmButtonColor: "#000",
//       });

//       // Reset form setelah berhasil
//       setFormData({
//         business_name: "",
//         sales_platform: "",
//         monthly_capacity: "",
//         additional_notes: "",
//       });
//     } catch (error) {
//       const err = error as AxiosError<{ message: string }>;
//       Swal.fire({
//         icon: "error",
//         title: "Pendaftaran Gagal",
//         text:
//           err.response?.data?.message ||
//           "Terjadi kesalahan pada sistem. Coba lagi nanti.",
//         confirmButtonColor: "#000",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* --- HERO SECTION --- */}
//       <section className="relative py-20 text-white bg-black lg:py-32">
//         <div className="px-6 mx-auto text-center max-w-7xl">
//           <h1 className="mb-6 font-serif text-4xl tracking-widest uppercase md:text-6xl">
//             Gycora Business Partner
//           </h1>
//           <p className="max-w-2xl mx-auto mb-10 text-sm leading-relaxed text-gray-300 md:text-base">
//             Tingkatkan skala bisnis Anda bersama kami. Jadilah bagian dari
//             jaringan eksklusif Gycora dan nikmati berbagai kemudahan serta
//             keuntungan maksimal untuk pertumbuhan toko Anda.
//           </p>
//           <a
//             href="#join-form"
//             className="inline-block px-8 py-4 text-xs font-bold tracking-widest text-black uppercase transition-colors bg-white rounded-full hover:bg-gray-200"
//           >
//             Daftar Sekarang
//           </a>
//         </div>
//       </section>

//       {/* --- BENEFIT SECTION --- */}
//       <section className="py-16 bg-white md:py-24">
//         <div className="px-6 mx-auto max-w-7xl">
//           <div className="mb-16 text-center">
//             <h2 className="text-2xl font-bold tracking-widest text-gray-900 uppercase">
//               Keuntungan Kemitraan
//             </h2>
//             <div className="w-16 h-1 mx-auto mt-4 bg-black"></div>
//           </div>

//           <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
//             {/* Benefit 1 */}
//             <div className="p-6 bg-gray-50 rounded-2xl">
//               <div className="flex items-center justify-center mx-auto mb-6 text-white bg-black rounded-full w-14 h-14">
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="mb-3 text-sm font-bold tracking-widest uppercase">
//                 Harga Grosir Spesial
//               </h3>
//               <p className="text-xs leading-relaxed text-gray-500">
//                 Dapatkan margin keuntungan maksimal dengan akses langsung ke
//                 harga wholesale eksklusif khusus Business Partner.
//               </p>
//             </div>

//             {/* Benefit 2 */}
//             <div className="p-6 bg-gray-50 rounded-2xl">
//               <div className="flex items-center justify-center mx-auto mb-6 text-white bg-black rounded-full w-14 h-14">
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="mb-3 text-sm font-bold tracking-widest uppercase">
//                 Aset Visual Premium
//               </h3>
//               <p className="text-xs leading-relaxed text-gray-500">
//                 Akses gratis ke katalog foto dan video resolusi tinggi tanpa
//                 watermark untuk kebutuhan promosi toko Anda.
//               </p>
//             </div>

//             {/* Benefit 3 */}
//             <div className="p-6 bg-gray-50 rounded-2xl">
//               <div className="flex items-center justify-center mx-auto mb-6 text-white bg-black rounded-full w-14 h-14">
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
//                   />
//                 </svg>
//               </div>
//               <h3 className="mb-3 text-sm font-bold tracking-widest uppercase">
//                 Prioritas Stok
//               </h3>
//               <p className="text-xs leading-relaxed text-gray-500">
//                 Prioritas alokasi produk unggulan dan koleksi terbaru sebelum
//                 dirilis untuk pelanggan retail biasa.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- FORM SECTION --- */}
//       <section id="join-form" className="py-20 bg-gray-50">
//         <div className="max-w-3xl px-6 mx-auto">
//           <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-gray-100">
//             <div className="mb-10 text-center">
//               <h2 className="mb-2 font-serif text-2xl tracking-tight text-gray-900">
//                 Formulir Pengajuan Kemitraan
//               </h2>
//               <p className="text-sm text-gray-500">
//                 Lengkapi data bisnis Anda di bawah ini. Tim kami akan melakukan
//                 peninjauan dalam waktu 1x24 jam kerja.
//               </p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                 {/* Nama Bisnis */}
//                 <div>
//                   <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
//                     Nama Toko / Bisnis <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="business_name"
//                     value={formData.business_name}
//                     onChange={handleChange}
//                     required
//                     placeholder="Contoh: Gycora Official Store"
//                     className="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-black focus:ring-1 focus:ring-black"
//                   />
//                 </div>

//                 {/* Platform Penjualan */}
//                 <div>
//                   <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
//                     Platform Penjualan Utama{" "}
//                     <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="sales_platform"
//                     value={formData.sales_platform}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-black focus:ring-1 focus:ring-black"
//                   >
//                     <option value="" disabled>
//                       Pilih Platform
//                     </option>
//                     <option value="Shopee">Shopee</option>
//                     <option value="Tokopedia">Tokopedia</option>
//                     <option value="Tiktok Shop">TikTok Shop</option>
//                     <option value="Instagram / WhatsApp">
//                       Instagram / WhatsApp
//                     </option>
//                     <option value="Toko Offline / Fisik">
//                       Toko Offline / Fisik
//                     </option>
//                     <option value="Lainnya">Lainnya</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Kapasitas Order */}
//               <div>
//                 <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
//                   Estimasi Pengambilan per Bulan{" "}
//                   <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   name="monthly_capacity"
//                   value={formData.monthly_capacity}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-black focus:ring-1 focus:ring-black"
//                 >
//                   <option value="" disabled>
//                     Pilih Estimasi Order
//                   </option>
//                   <option value="10 - 50 Pcs">10 - 50 Pcs</option>
//                   <option value="51 - 100 Pcs">51 - 100 Pcs</option>
//                   <option value="101 - 500 Pcs">101 - 500 Pcs</option>
//                   <option value="> 500 Pcs">more than 500 Pcs</option>
//                 </select>
//               </div>

//               {/* Catatan Tambahan */}
//               <div>
//                 <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
//                   Catatan Tambahan / Link Toko (Opsional)
//                 </label>
//                 <textarea
//                   name="additional_notes"
//                   value={formData.additional_notes}
//                   onChange={handleChange}
//                   rows={4}
//                   placeholder="Ceritakan sedikit tentang bisnis Anda atau sertakan link toko Anda agar kami dapat meninjaunya lebih cepat."
//                   className="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none resize-none bg-gray-50 rounded-xl focus:border-black focus:ring-1 focus:ring-black"
//                 ></textarea>
//               </div>

//               {/* Tombol Submit */}
//               <div className="pt-4">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="flex items-center justify-center w-full gap-3 py-4 text-xs font-bold tracking-widest text-white uppercase transition-all bg-black shadow-lg hover:bg-gray-800 disabled:bg-gray-400 rounded-xl"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"></div>
//                       Memproses...
//                     </>
//                   ) : (
//                     "Kirim Pengajuan Kemitraan"
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default BusinessPartnerPage;

// import React, { useState } from "react";
// import axios, { AxiosError } from "axios";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// // 1. Definisikan Tipe Data untuk Form (TypeScript)
// interface PartnerFormData {
//   business_name: string;
//   sales_platform: string;
//   monthly_capacity: string;
//   additional_notes: string;
// }

// const BusinessPartnerPage: React.FC = () => {
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
//   // 👇 [BARU] State untuk mengontrol visibilitas Modal
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

//   const [formData, setFormData] = useState<PartnerFormData>({
//     business_name: "",
//     sales_platform: "",
//     monthly_capacity: "",
//     additional_notes: "",
//   });

//   // 2. Fungsi Penanganan Perubahan Input
//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >,
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // 3. Fungsi Pengiriman Form
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const token = localStorage.getItem("user_token");

//     if (!token) {
//       setIsModalOpen(false); // Tutup modal sebentar jika belum login
//       Swal.fire({
//         icon: "warning",
//         title: "Login Dibutuhkan",
//         text: "Silakan login terlebih dahulu untuk mendaftar sebagai Business Partner.",
//         confirmButtonColor: "#000",
//       });
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const response = await axios.post(`${BASE_URL}/api/reseller/apply`, formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       Swal.fire({
//         icon: "success",
//         title: "Pendaftaran Berhasil!",
//         text:
//           response.data.message ||
//           "Tim kami akan segera meninjau aplikasi Anda.",
//         confirmButtonColor: "#000",
//       });

//       // Reset form dan TUTUP MODAL setelah berhasil
//       setFormData({
//         business_name: "",
//         sales_platform: "",
//         monthly_capacity: "",
//         additional_notes: "",
//       });
//       setIsModalOpen(false);

//     } catch (error) {
//       const err = error as AxiosError<{ message: string }>;
//       Swal.fire({
//         icon: "error",
//         title: "Pendaftaran Gagal",
//         text:
//           err.response?.data?.message ||
//           "Terjadi kesalahan pada sistem. Coba lagi nanti.",
//         confirmButtonColor: "#000",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* --- HERO SECTION --- */}
//       <section className="relative py-20 text-white bg-black lg:py-32">
//         <div className="px-6 mx-auto text-center max-w-7xl">
//           <h1 className="mb-6 font-serif text-4xl tracking-widest uppercase md:text-6xl">
//             Gycora Business Partner
//           </h1>
//           <p className="max-w-2xl mx-auto mb-10 text-sm leading-relaxed text-gray-300 md:text-base">
//             Tingkatkan skala bisnis Anda bersama kami. Jadilah bagian dari
//             jaringan eksklusif Gycora dan nikmati berbagai kemudahan serta
//             keuntungan maksimal untuk pertumbuhan toko Anda.
//           </p>
          
//           {/* 👇 [PERUBAHAN] Ubah dari link href="#join-form" menjadi button pembuka Modal 👇 */}
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="inline-block px-8 py-4 text-xs font-bold tracking-widest text-black uppercase transition-colors bg-white rounded-full hover:bg-gray-200"
//           >
//             Daftar Sekarang
//           </button>
//         </div>
//       </section>

//       {/* --- BENEFIT SECTION --- */}
//       <section className="py-16 bg-white md:py-24">
//         <div className="px-6 mx-auto max-w-7xl">
//           <div className="mb-16 text-center">
//             <h2 className="text-2xl font-bold tracking-widest text-gray-900 uppercase">
//               Keuntungan Kemitraan
//             </h2>
//             <div className="w-16 h-1 mx-auto mt-4 bg-black"></div>
//           </div>

//           <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
//             {/* Benefit 1 */}
//             <div className="p-6 bg-gray-50 rounded-2xl">
//               <div className="flex items-center justify-center mx-auto mb-6 text-white bg-black rounded-full w-14 h-14">
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="mb-3 text-sm font-bold tracking-widest uppercase">
//                 Harga Grosir Spesial
//               </h3>
//               <p className="text-xs leading-relaxed text-gray-500">
//                 Dapatkan margin keuntungan maksimal dengan akses langsung ke
//                 harga wholesale eksklusif khusus Business Partner.
//               </p>
//             </div>

//             {/* Benefit 2 */}
//             <div className="p-6 bg-gray-50 rounded-2xl">
//               <div className="flex items-center justify-center mx-auto mb-6 text-white bg-black rounded-full w-14 h-14">
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="mb-3 text-sm font-bold tracking-widest uppercase">
//                 Aset Visual Premium
//               </h3>
//               <p className="text-xs leading-relaxed text-gray-500">
//                 Akses gratis ke katalog foto dan video resolusi tinggi tanpa
//                 watermark untuk kebutuhan promosi toko Anda.
//               </p>
//             </div>

//             {/* Benefit 3 */}
//             <div className="p-6 bg-gray-50 rounded-2xl">
//               <div className="flex items-center justify-center mx-auto mb-6 text-white bg-black rounded-full w-14 h-14">
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
//                   />
//                 </svg>
//               </div>
//               <h3 className="mb-3 text-sm font-bold tracking-widest uppercase">
//                 Prioritas Stok
//               </h3>
//               <p className="text-xs leading-relaxed text-gray-500">
//                 Prioritas alokasi produk unggulan dan koleksi terbaru sebelum
//                 dirilis untuk pelanggan retail biasa.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ========================================================= */}
//       {/* 👇 [BARU] MODAL FORM SECTION 👇 */}
//       {/* ========================================================= */}
//       {isModalOpen && (
//         <div 
//           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
//           onClick={() => setIsModalOpen(false)} // Tutup jika background di-klik
//         >
//           {/* Hentikan event onClick agar modal tidak tertutup jika di-klik di area dalam form */}
//           <div 
//             className="flex flex-col w-full max-w-3xl overflow-hidden bg-white shadow-2xl rounded-3xl max-h-[90vh]"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Header Modal */}
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50 shrink-0">
//               <div>
//                 <h2 className="font-serif text-xl tracking-tight text-gray-900">
//                   Formulir Pengajuan Kemitraan
//                 </h2>
//               </div>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="p-2 text-gray-400 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
//               >
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>

//             {/* Body Modal (Scrollable) */}
//             <div className="p-6 overflow-y-auto md:p-8 custom-scrollbar">
//               <p className="p-3 mb-6 text-sm text-center text-gray-500 border border-gray-100 rounded-lg bg-gray-50">
//                 Lengkapi data bisnis Anda di bawah ini. Tim kami akan melakukan
//                 peninjauan dalam waktu 1x24 jam kerja.
//               </p>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                   {/* Nama Bisnis */}
//                   <div>
//                     <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
//                       Nama Toko / Bisnis <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="business_name"
//                       value={formData.business_name}
//                       onChange={handleChange}
//                       required
//                       placeholder="Contoh: Gycora Official Store"
//                       className="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-black focus:ring-1 focus:ring-black"
//                     />
//                   </div>

//                   {/* Platform Penjualan */}
//                   <div>
//                     <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
//                       Platform Penjualan Utama{" "}
//                       <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       name="sales_platform"
//                       value={formData.sales_platform}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-black focus:ring-1 focus:ring-black"
//                     >
//                       <option value="" disabled>
//                         Pilih Platform
//                       </option>
//                       <option value="Shopee">Shopee</option>
//                       <option value="Tokopedia">Tokopedia</option>
//                       <option value="Tiktok Shop">TikTok Shop</option>
//                       <option value="Instagram / WhatsApp">
//                         Instagram / WhatsApp
//                       </option>
//                       <option value="Toko Offline / Fisik">
//                         Toko Offline / Fisik
//                       </option>
//                       <option value="Lainnya">Lainnya</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Kapasitas Order */}
//                 <div>
//                   <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
//                     Estimasi Pengambilan per Bulan{" "}
//                     <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="monthly_capacity"
//                     value={formData.monthly_capacity}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-black focus:ring-1 focus:ring-black"
//                   >
//                     <option value="" disabled>
//                       Pilih Estimasi Order
//                     </option>
//                     <option value="10 - 50 Pcs">10 - 50 Pcs</option>
//                     <option value="51 - 100 Pcs">51 - 100 Pcs</option>
//                     <option value="101 - 500 Pcs">101 - 500 Pcs</option>
//                     <option value="> 500 Pcs">lebih dari 500 Pcs</option>
//                   </select>
//                 </div>

//                 {/* Catatan Tambahan */}
//                 <div>
//                   <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
//                     Catatan Tambahan / Link Toko (Opsional)
//                   </label>
//                   <textarea
//                     name="additional_notes"
//                     value={formData.additional_notes}
//                     onChange={handleChange}
//                     rows={4}
//                     placeholder="Ceritakan sedikit tentang bisnis Anda atau sertakan link toko Anda agar kami dapat meninjaunya lebih cepat."
//                     className="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none resize-none bg-gray-50 rounded-xl focus:border-black focus:ring-1 focus:ring-black"
//                   ></textarea>
//                 </div>

//                 {/* Tombol Submit */}
//                 <div className="pt-4 border-t border-gray-100">
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="flex items-center justify-center w-full gap-3 py-4 text-xs font-bold tracking-widest text-white uppercase transition-all bg-black shadow-lg hover:bg-gray-800 disabled:bg-gray-400 rounded-xl"
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <div className="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"></div>
//                         Memproses...
//                       </>
//                     ) : (
//                       "Kirim Pengajuan Kemitraan"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* 👆 BATAS MODAL FORM SECTION 👆 */}

//     </div>
//   );
// };

// export default BusinessPartnerPage;

// import React, { useState } from "react";
// import axios, { AxiosError } from "axios";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// interface PartnerFormData {
//   business_name: string;
//   sales_platform: string;
//   monthly_capacity: string;
//   additional_notes: string;
// }

// const BusinessPartnerPage: React.FC = () => {
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [activeFaq, setActiveFaq] = useState<number | null>(null);

//   const [formData, setFormData] = useState<PartnerFormData>({
//     business_name: "",
//     sales_platform: "",
//     monthly_capacity: "",
//     additional_notes: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >,
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const token = localStorage.getItem("user_token");

//     if (!token) {
//       setIsModalOpen(false);
//       Swal.fire({
//         icon: "warning",
//         title: "Login Dibutuhkan",
//         text: "Silakan login terlebih dahulu untuk mendaftar sebagai Business Partner.",
//         confirmButtonColor: "#000",
//       });
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const response = await axios.post(`${BASE_URL}/api/reseller/apply`, formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       Swal.fire({
//         icon: "success",
//         title: "Pendaftaran Berhasil!",
//         text: response.data.message || "Tim kami akan segera meninjau aplikasi Anda.",
//         confirmButtonColor: "#000",
//       });

//       setFormData({
//         business_name: "",
//         sales_platform: "",
//         monthly_capacity: "",
//         additional_notes: "",
//       });
//       setIsModalOpen(false);

//     } catch (error) {
//       const err = error as AxiosError<{ message: string }>;
//       Swal.fire({
//         icon: "error",
//         title: "Pendaftaran Gagal",
//         text: err.response?.data?.message || "Terjadi kesalahan pada sistem. Coba lagi nanti.",
//         confirmButtonColor: "#000",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // --- DATA DUMMY ---
//   const steps = [
//     {
//       number: "01",
//       title: "Isi Formulir",
//       desc: "Lengkapi data toko dan estimasi penjualan bulanan Anda melalui formulir pendaftaran kami.",
//     },
//     {
//       number: "02",
//       title: "Proses Kurasi",
//       desc: "Tim Gycora akan meninjau profil bisnis Anda dalam waktu 1x24 jam kerja untuk memastikan standar kemitraan.",
//     },
//     {
//       number: "03",
//       title: "Akses Terbuka",
//       desc: "Setelah disetujui, akun Anda otomatis ditingkatkan dan dapat langsung melihat Harga Grosir Pabrik.",
//     },
//     {
//       number: "04",
//       title: "Mulai Berjualan",
//       desc: "Lakukan pesanan minimal (MOQ) dan nikmati margin keuntungan maksimal untuk bisnis Anda.",
//     },
//   ];

//   const faqs = [
//     {
//       question: "Berapa minimum order (MOQ) untuk mendapatkan harga reseller?",
//       answer: "Untuk melindungi harga pasar (Price Protection), harga grosir eksklusif Gycora hanya akan aktif jika Anda berbelanja minimal 24 pcs (2 lusin) per transaksi di keranjang Anda."
//     },
//     {
//       question: "Apakah Gycora memfasilitasi sistem Dropship?",
//       answer: "Saat ini, program Business Partner kami difokuskan pada model B2B Wholesale (Grosir Tradisional). Barang akan dikirim secara massal ke alamat Anda, dan Anda bebas menjualnya kembali di platform apa pun dengan margin keuntungan 20% - 30%."
//     },
//     {
//       question: "Berapa lama proses persetujuan akun reseller?",
//       answer: "Proses kurasi dan persetujuan akun biasanya memakan waktu maksimal 1x24 jam kerja. Tim kami perlu memastikan bahwa mitra memiliki komitmen bisnis yang sesuai dengan visi Gycora."
//     }
//   ];

//   const feedbacks = [
//     {
//       name: "Toko Cantik Jelita",
//       platform: "Shopee Seller",
//       comment: "Margin profit dari Gycora sangat bagus! Sejak daftar jadi reseller, perputaran kas toko saya jadi lebih cepat karena produknya memang cepat laku di pasaran.",
//     },
//     {
//       name: "Aura Beauty Supply",
//       platform: "Toko Fisik",
//       comment: "Awalnya ragu karena MOQ-nya 24 pcs. Tapi ternyata kualitas barangnya premium banget. Pelanggan salon saya pada suka, 2 lusin langsung ludes dalam 1 minggu.",
//     },
//     {
//       name: "Dewi Haircare",
//       platform: "Tiktok Shop",
//       comment: "Yang paling saya suka adalah perlindungan harganya. Gycora nggak obral harga grosir ke sembarang orang, jadi kita reseller nggak perlu takut perang harga.",
//     }
//   ];

//   return (
//     <div className="min-h-screen font-sans bg-[#FAFAFA] animate-fade-in">
//       {/* --- HERO SECTION --- */}
//       <section className="relative flex items-center justify-center px-4 py-32 overflow-hidden bg-black md:py-40">
//         <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1598440947619-2ce6598c4e1d?q=80&w=2000')] bg-cover bg-center"></div>
//         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        
//         <div className="relative z-10 max-w-3xl text-center">
//           <span className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.3em] text-white uppercase border border-white/30 rounded-full backdrop-blur-sm">
//             B2B Wholesale
//           </span>
//           <h1 className="mb-6 font-serif text-4xl font-normal leading-tight text-white md:text-6xl">
//             Gycora <span className="italic text-gray-300">Business</span> Partner.
//           </h1>
//           <p className="max-w-xl mx-auto mb-10 text-sm leading-relaxed text-gray-400 md:text-base">
//             Tingkatkan skala bisnis Anda bersama kami. Jadilah bagian dari jaringan eksklusif Gycora dan nikmati margin keuntungan maksimal untuk pertumbuhan toko Anda.
//           </p>
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="px-10 py-4 text-xs font-bold tracking-[0.2em] text-black uppercase transition-all duration-500 bg-white rounded-none hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
//           >
//             Daftar Sekarang
//           </button>
//         </div>
//       </section>

//       {/* --- HOW IT WORKS SECTION --- */}
//       <section className="px-6 py-24 mx-auto max-w-7xl">
//         <div className="mb-16 text-center">
//           <h2 className="font-serif text-3xl font-normal text-gray-900 md:text-4xl">Cara Menjadi Reseller</h2>
//           <div className="w-16 h-0.5 mx-auto mt-6 bg-black"></div>
//         </div>

//         <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
//           {steps.map((step, index) => (
//             <div key={index} className="relative flex flex-col items-center text-center group">
//               <span className="mb-4 font-serif text-5xl font-light text-gray-200 transition-colors group-hover:text-gray-900">
//                 {step.number}
//               </span>
//               <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">{step.title}</h3>
//               <p className="text-sm leading-relaxed text-gray-500">
//                 {step.desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* --- FAQ SECTION --- */}
//       <section className="py-24 bg-white border-t border-gray-200">
//         <div className="max-w-4xl px-6 mx-auto">
//           <div className="mb-16 text-center">
//             <h2 className="font-serif text-3xl font-normal text-gray-900 md:text-4xl">
//               Yang Sering Ditanya Seputar Reseller di Gycora
//             </h2>
//             <div className="w-16 h-0.5 mx-auto mt-6 bg-black"></div>
//           </div>

//           <div className="space-y-4">
//             {faqs.map((faq, index) => (
//               <div 
//                 key={index} 
//                 className="overflow-hidden transition-all duration-300 border border-gray-200 rounded-2xl"
//               >
//                 <button
//                   onClick={() => setActiveFaq(activeFaq === index ? null : index)}
//                   className="flex items-center justify-between w-full p-6 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none"
//                 >
//                   <span className="text-sm font-bold text-gray-900">{faq.question}</span>
//                   <svg 
//                     className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`} 
//                     fill="none" 
//                     viewBox="0 0 24 24" 
//                     stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
//                 <div 
//                   className={`transition-all duration-300 ease-in-out ${activeFaq === index ? 'max-h-[500px] opacity-100 p-6 bg-white' : 'max-h-0 opacity-0 px-6 py-0'}`}
//                 >
//                   <p className="text-sm leading-relaxed text-gray-600">
//                     {faq.answer}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* --- TESTIMONIAL / FEEDBACK SECTION --- */}
//       <section className="px-6 py-24 mx-auto border-t border-gray-200 max-w-7xl">
//         <div className="mb-16 text-center">
//           <h2 className="font-serif text-3xl font-normal text-gray-900 md:text-4xl">
//             Mari Simak Feedback dari Reseller Kami
//           </h2>
//           <div className="w-16 h-0.5 mx-auto mt-6 bg-black"></div>
//         </div>

//         <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//           {feedbacks.map((fb, index) => (
//             <div key={index} className="flex flex-col p-8 transition-shadow bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-xl">
//               <div className="flex mb-4 text-amber-400">
//                 {[...Array(5)].map((_, i) => (
//                   <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                 ))}
//               </div>
//               <p className="flex-grow mb-6 text-sm italic leading-relaxed text-gray-600">
//                 "{fb.comment}"
//               </p>
//               <div>
//                 <h4 className="text-sm font-bold text-gray-900">{fb.name}</h4>
//                 <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mt-1">{fb.platform}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* --- BENEFIT SECTION (Di Pindah Ke Bawah) --- */}
//       <section className="py-24 text-white bg-gray-900 border-t border-gray-800">
//         <div className="px-6 mx-auto max-w-7xl">
//           <div className="mb-16 text-center">
//             <h2 className="font-serif text-3xl font-normal md:text-4xl">
//               Keuntungan Kemitraan
//             </h2>
//             <div className="w-16 h-0.5 mx-auto mt-6 bg-white/50"></div>
//           </div>

//           <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3">
//             <div className="flex flex-col items-center">
//               <div className="flex items-center justify-center w-20 h-20 mb-6 bg-white rounded-full">
//                 <svg className="w-8 h-8 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <h3 className="mb-3 text-lg font-bold tracking-widest uppercase">Harga Grosir Spesial</h3>
//               <p className="text-sm leading-relaxed text-gray-400">
//                 Dapatkan margin keuntungan maksimal dengan akses langsung ke harga wholesale eksklusif khusus Business Partner.
//               </p>
//             </div>

//             <div className="flex flex-col items-center">
//               <div className="flex items-center justify-center w-20 h-20 mb-6 bg-white rounded-full">
//                 <svg className="w-8 h-8 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//               </div>
//               <h3 className="mb-3 text-lg font-bold tracking-widest uppercase">Aset Visual Premium</h3>
//               <p className="text-sm leading-relaxed text-gray-400">
//                 Akses gratis ke katalog foto dan video resolusi tinggi tanpa watermark untuk kebutuhan promosi toko Anda.
//               </p>
//             </div>

//             <div className="flex flex-col items-center">
//               <div className="flex items-center justify-center w-20 h-20 mb-6 bg-white rounded-full">
//                 <svg className="w-8 h-8 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
//                 </svg>
//               </div>
//               <h3 className="mb-3 text-lg font-bold tracking-widest uppercase">Prioritas Stok</h3>
//               <p className="text-sm leading-relaxed text-gray-400">
//                 Prioritas alokasi produk unggulan dan koleksi terbaru sebelum dirilis untuk pelanggan retail biasa.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ========================================================= */}
//       {/* 👇 MODAL FORM SECTION 👇 */}
//       {/* ========================================================= */}
//       {isModalOpen && (
//         <div 
//           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
//           onClick={() => setIsModalOpen(false)}
//         >
//           <div 
//             className="flex flex-col w-full max-w-3xl overflow-hidden bg-white shadow-2xl rounded-3xl max-h-[90vh]"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50 shrink-0">
//               <div>
//                 <h2 className="font-serif text-xl tracking-tight text-gray-900">
//                   Formulir Pengajuan Kemitraan
//                 </h2>
//               </div>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="p-2 text-gray-400 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             <div className="p-6 overflow-y-auto md:p-8 custom-scrollbar">
//               <p className="p-3 mb-6 text-sm text-center text-gray-500 border border-gray-100 rounded-lg bg-gray-50">
//                 Lengkapi data bisnis Anda di bawah ini. Tim kami akan melakukan
//                 peninjauan dalam waktu 1x24 jam kerja.
//               </p>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                   <div>
//                     <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
//                       Nama Toko / Bisnis <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="business_name"
//                       value={formData.business_name}
//                       onChange={handleChange}
//                       required
//                       placeholder="Contoh: Gycora Official Store"
//                       className="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-black focus:ring-1 focus:ring-black"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
//                       Platform Penjualan Utama <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       name="sales_platform"
//                       value={formData.sales_platform}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-black focus:ring-1 focus:ring-black"
//                     >
//                       <option value="" disabled>Pilih Platform</option>
//                       <option value="Shopee">Shopee</option>
//                       <option value="Tokopedia">Tokopedia</option>
//                       <option value="Tiktok Shop">TikTok Shop</option>
//                       <option value="Instagram / WhatsApp">Instagram / WhatsApp</option>
//                       <option value="Toko Offline / Fisik">Toko Offline / Fisik</option>
//                       <option value="Lainnya">Lainnya</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
//                     Estimasi Pengambilan per Bulan <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="monthly_capacity"
//                     value={formData.monthly_capacity}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-black focus:ring-1 focus:ring-black"
//                   >
//                     <option value="" disabled>Pilih Estimasi Order</option>
//                     <option value="10 - 50 Pcs">10 - 50 Pcs</option>
//                     <option value="51 - 100 Pcs">51 - 100 Pcs</option>
//                     <option value="101 - 500 Pcs">101 - 500 Pcs</option>
//                     <option value="> 500 Pcs">lebih dari 500 Pcs</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
//                     Catatan Tambahan / Link Toko (Opsional)
//                   </label>
//                   <textarea
//                     name="additional_notes"
//                     value={formData.additional_notes}
//                     onChange={handleChange}
//                     rows={4}
//                     placeholder="Ceritakan sedikit tentang bisnis Anda atau sertakan link toko Anda agar kami dapat meninjaunya lebih cepat."
//                     className="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none resize-none bg-gray-50 rounded-xl focus:border-black focus:ring-1 focus:ring-black"
//                   ></textarea>
//                 </div>

//                 <div className="pt-4 border-t border-gray-100">
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="flex items-center justify-center w-full gap-3 py-4 text-xs font-bold tracking-widest text-white uppercase transition-all bg-black shadow-lg hover:bg-gray-800 disabled:bg-gray-400 rounded-xl"
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <div className="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"></div>
//                         Memproses...
//                       </>
//                     ) : (
//                       "Kirim Pengajuan Kemitraan"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BusinessPartnerPage;

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

import bgPartner from "../../assets/gycora_business_partner_bg.png";

interface PartnerFormData {
  business_name: string;
  sales_platform: string;
  monthly_capacity: string;
  additional_notes: string;
}

const BusinessPartnerPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const [formData, setFormData] = useState<PartnerFormData>({
    business_name: "",
    sales_platform: "",
    monthly_capacity: "",
    additional_notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("user_token");

    if (!token) {
      setIsModalOpen(false);
      Swal.fire({
        icon: "warning",
        title: "Login Dibutuhkan",
        text: "Silakan login terlebih dahulu untuk mendaftar sebagai Business Partner.",
        confirmButtonColor: "#000",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/reseller/apply`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire({
        icon: "success",
        title: "Pendaftaran Berhasil!",
        text: response.data.message || "Tim kami akan segera meninjau aplikasi Anda.",
        confirmButtonColor: "#000",
      });

      setFormData({
        business_name: "",
        sales_platform: "",
        monthly_capacity: "",
        additional_notes: "",
      });
      setIsModalOpen(false);

    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      Swal.fire({
        icon: "error",
        title: "Pendaftaran Gagal",
        text: err.response?.data?.message || "Terjadi kesalahan pada sistem. Coba lagi nanti.",
        confirmButtonColor: "#000",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- DATA DUMMY ---
  const steps = [
    {
      icon: (
        <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Isi Formulir",
      desc: "Lengkapi data toko dan estimasi penjualan bulanan Anda melalui formulir pendaftaran kami.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: "Proses Kurasi",
      desc: "Tim Gycora akan meninjau profil bisnis Anda dalam waktu 1x24 jam kerja untuk memastikan standar kemitraan.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      ),
      title: "Akses Terbuka",
      desc: "Setelah disetujui, akun Anda otomatis ditingkatkan dan dapat langsung melihat Harga Grosir Pabrik.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      title: "Mulai Berjualan",
      desc: "Lakukan pesanan minimal (MOQ) dan nikmati margin keuntungan maksimal untuk bisnis Anda.",
    },
  ];

  const faqs = [
    {
      question: "Berapa minimum order (MOQ) untuk mendapatkan harga reseller?",
      answer: "Untuk melindungi harga pasar (Price Protection), harga grosir eksklusif Gycora hanya akan aktif jika Anda berbelanja minimal 24 pcs (2 lusin) per transaksi di keranjang Anda."
    },
    {
      question: "Apakah Gycora memfasilitasi sistem Dropship?",
      answer: "Saat ini, program Business Partner kami difokuskan pada model B2B Wholesale (Grosir Tradisional). Barang akan dikirim secara massal ke alamat Anda, dan Anda bebas menjualnya kembali di platform apa pun dengan margin keuntungan 20% - 30%."
    },
    {
      question: "Berapa lama proses persetujuan akun reseller?",
      answer: "Proses kurasi dan persetujuan akun biasanya memakan waktu maksimal 1x24 jam kerja. Tim kami perlu memastikan bahwa mitra memiliki komitmen bisnis yang sesuai dengan visi Gycora."
    }
  ];

  const feedbacks = [
    {
      name: "Toko Cantik Jelita",
      platform: "Shopee Seller",
      comment: "Margin profit dari Gycora sangat bagus! Sejak daftar jadi reseller, perputaran kas toko saya jadi lebih cepat karena produknya memang cepat laku di pasaran.",
    },
    {
      name: "Aura Beauty Supply",
      platform: "Toko Fisik",
      comment: "Awalnya ragu karena MOQ-nya 24 pcs. Tapi ternyata kualitas barangnya premium banget. Pelanggan salon saya pada suka, 2 lusin langsung ludes dalam 1 minggu.",
    },
    {
      name: "Dewi Haircare",
      platform: "Tiktok Shop",
      comment: "Yang paling saya suka adalah perlindungan harganya. Gycora nggak obral harga grosir ke sembarang orang, jadi kita reseller nggak perlu takut perang harga.",
    }
  ];

  return (
    <div className="min-h-screen font-sans bg-[#FAFAFA] animate-fade-in">
      {/* --- HERO SECTION --- */}
      {/* <section className="relative flex items-center justify-center px-4 py-32 overflow-hidden bg-black md:py-40">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1598440947619-2ce6598c4e1d?q=80&w=2000')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        
        <div className="relative z-10 max-w-3xl text-center">
          <span className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.3em] text-white uppercase border border-white/30 rounded-full backdrop-blur-sm">
            B2B Wholesale
          </span>
          <h1 className="mb-6 font-serif text-4xl font-normal leading-tight text-white md:text-6xl">
            Gycora <span className="italic text-gray-300">Business</span> Partner.
          </h1>
          <p className="max-w-xl mx-auto mb-10 text-sm leading-relaxed text-gray-400 md:text-base">
            Tingkatkan skala bisnis Anda bersama kami. Jadilah bagian dari jaringan eksklusif Gycora dan nikmati margin keuntungan maksimal untuk pertumbuhan toko Anda.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-10 py-4 text-xs font-bold tracking-[0.2em] text-black uppercase transition-all duration-500 bg-white rounded-none hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            Daftar Sekarang
          </button>
        </div>
      </section> */}

      {/* --- HERO SECTION --- */}
      <section className="relative flex items-center justify-center px-4 py-32 overflow-hidden bg-black md:py-40">
        {/* Gambar Background Baru yang Aktif dan Elegan */}
        <div 
  className="absolute inset-0 bg-center bg-cover opacity-40"
  style={{ backgroundImage: `url(${bgPartner})` }}
></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        
        <div className="relative z-10 max-w-3xl text-center">
          <span className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.3em] text-white uppercase border border-white/30 rounded-full backdrop-blur-sm">
            B2B Wholesale
          </span>
          <h1 className="mb-6 font-serif text-4xl font-normal leading-tight text-white md:text-6xl">
            Gycora <span className="italic text-gray-300">Business</span> Partner.
          </h1>
          <p className="max-w-xl mx-auto mb-10 text-sm leading-relaxed text-gray-400 md:text-base">
            Tingkatkan skala bisnis Anda bersama kami. Jadilah bagian dari jaringan eksklusif Gycora dan nikmati margin keuntungan maksimal untuk pertumbuhan toko Anda.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-10 py-4 text-xs font-bold tracking-[0.2em] text-black uppercase transition-all duration-500 bg-white rounded-none hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            Daftar Sekarang
          </button>
        </div>
      </section>

      {/* --- HOW IT WORKS SECTION --- */}
      <section className="px-6 py-24 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="font-serif text-3xl font-normal text-gray-900 md:text-4xl">Cara Menjadi Reseller</h2>
          <div className="w-16 h-0.5 mx-auto mt-6 bg-black"></div>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center group">
              <div className="flex items-center justify-center w-20 h-20 mb-6 transition-colors bg-white border border-gray-200 rounded-full shadow-sm group-hover:border-black">
                {step.icon}
              </div>
              <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">{step.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="max-w-4xl px-6 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-3xl font-normal text-gray-900 md:text-4xl">
              Yang Sering Ditanya Seputar Reseller di Gycora
            </h2>
            <div className="w-16 h-0.5 mx-auto mt-6 bg-black"></div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="overflow-hidden transition-all duration-300 border border-gray-200 rounded-2xl"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="flex items-center justify-between w-full p-6 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none"
                >
                  <span className="text-sm font-bold text-gray-900">{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out ${activeFaq === index ? 'max-h-[500px] opacity-100 p-6 bg-white' : 'max-h-0 opacity-0 px-6 py-0'}`}
                >
                  <p className="text-sm leading-relaxed text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIAL / FEEDBACK SECTION --- */}
      <section className="px-6 py-24 mx-auto border-t border-gray-200 max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="font-serif text-3xl font-normal text-gray-900 md:text-4xl">
            Mari Simak Feedback dari Reseller Kami
          </h2>
          <div className="w-16 h-0.5 mx-auto mt-6 bg-black"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {feedbacks.map((fb, index) => (
            <div key={index} className="flex flex-col p-8 transition-shadow bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-xl">
              <div className="flex mb-4 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="flex-grow mb-6 text-sm italic leading-relaxed text-gray-600">
                "{fb.comment}"
              </p>
              <div>
                <h4 className="text-sm font-bold text-gray-900">{fb.name}</h4>
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mt-1">{fb.platform}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- BENEFIT SECTION --- */}
      <section className="py-24 text-white bg-gray-900 border-t border-gray-800">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-3xl font-normal md:text-4xl">
              Keuntungan Kemitraan
            </h2>
            <div className="w-16 h-0.5 mx-auto mt-6 bg-white/50"></div>
          </div>

          <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-20 h-20 mb-6 bg-white rounded-full">
                <svg className="w-8 h-8 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-3 text-lg font-bold tracking-widest uppercase">Harga Grosir Spesial</h3>
              <p className="text-sm leading-relaxed text-gray-400">
                Dapatkan margin keuntungan maksimal dengan akses langsung ke harga wholesale eksklusif khusus Business Partner.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-20 h-20 mb-6 bg-white rounded-full">
                <svg className="w-8 h-8 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mb-3 text-lg font-bold tracking-widest uppercase">Aset Visual Premium</h3>
              <p className="text-sm leading-relaxed text-gray-400">
                Akses gratis ke katalog foto dan video resolusi tinggi tanpa watermark untuk kebutuhan promosi toko Anda.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-20 h-20 mb-6 bg-white rounded-full">
                <svg className="w-8 h-8 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="mb-3 text-lg font-bold tracking-widest uppercase">Prioritas Stok</h3>
              <p className="text-sm leading-relaxed text-gray-400">
                Prioritas alokasi produk unggulan dan koleksi terbaru sebelum dirilis untuk pelanggan retail biasa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 👇 MODAL FORM SECTION 👇 */}
      {/* ========================================================= */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="flex flex-col w-full max-w-3xl overflow-hidden bg-white shadow-2xl rounded-3xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50 shrink-0">
              <div>
                <h2 className="font-serif text-xl tracking-tight text-gray-900">
                  Formulir Pengajuan Kemitraan
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto md:p-8 custom-scrollbar">
              <p className="p-3 mb-6 text-sm text-center text-gray-500 border border-gray-100 rounded-lg bg-gray-50">
                Lengkapi data bisnis Anda di bawah ini. Tim kami akan melakukan
                peninjauan dalam waktu 1x24 jam kerja.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
                      Nama Toko / Bisnis <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="business_name"
                      value={formData.business_name}
                      onChange={handleChange}
                      required
                      placeholder="Contoh: Gycora Official Store"
                      className="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-black focus:ring-1 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
                      Platform Penjualan Utama <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="sales_platform"
                      value={formData.sales_platform}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-black focus:ring-1 focus:ring-black"
                    >
                      <option value="" disabled>Pilih Platform</option>
                      <option value="Shopee">Shopee</option>
                      <option value="Tokopedia">Tokopedia</option>
                      <option value="Tiktok Shop">TikTok Shop</option>
                      <option value="Instagram / WhatsApp">Instagram / WhatsApp</option>
                      <option value="Toko Offline / Fisik">Toko Offline / Fisik</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
                    Estimasi Pengambilan per Bulan <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="monthly_capacity"
                    value={formData.monthly_capacity}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-black focus:ring-1 focus:ring-black"
                  >
                    <option value="" disabled>Pilih Estimasi Order</option>
                    <option value="10 - 50 Pcs">10 - 50 Pcs</option>
                    <option value="51 - 100 Pcs">51 - 100 Pcs</option>
                    <option value="101 - 500 Pcs">101 - 500 Pcs</option>
                    <option value="> 500 Pcs">lebih dari 500 Pcs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
                    Catatan Tambahan / Link Toko (Opsional)
                  </label>
                  <textarea
                    name="additional_notes"
                    value={formData.additional_notes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Ceritakan sedikit tentang bisnis Anda atau sertakan link toko Anda agar kami dapat meninjaunya lebih cepat."
                    className="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none resize-none bg-gray-50 rounded-xl focus:border-black focus:ring-1 focus:ring-black"
                  ></textarea>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center w-full gap-3 py-4 text-xs font-bold tracking-widest text-white uppercase transition-all bg-black shadow-lg hover:bg-gray-800 disabled:bg-gray-400 rounded-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"></div>
                        Memproses...
                      </>
                    ) : (
                      "Kirim Pengajuan Kemitraan"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessPartnerPage;
