/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// // ============================================================================
// // DUMMY DATA (DIPERBARUI DENGAN ASET INTERNAL/BEBAS ROYALTI)
// // ============================================================================

// // Ikon SVG sederhana untuk masing-masing kategori
// const IconAcne = () => <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
// const IconHair = () => <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>; // Representasi sisir/arah pertumbuhan
// const IconSkin = () => <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>; // Sparkles untuk kulit kusam/cerah
// const IconBeard = () => <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>; // Representasi wajah pria

// const consultationCategories = [
//   { id: 1, title: "Jerawat Remaja", icon: <IconAcne /> },
//   { id: 2, title: "Jerawat Dewasa", icon: <IconAcne /> },
//   { id: 3, title: "Kebotakan", icon: <IconHair /> },
//   { id: 4, title: "Rambut Rontok", icon: <IconHair /> },
//   { id: 5, title: "Penumbuh Brewok", icon: <IconBeard /> },
//   { id: 6, title: "Kulit Kusam", icon: <IconSkin /> },
//   { id: 7, title: "Bekas Jerawat", icon: <IconAcne /> },
//   { id: 8, title: "Ketombe", icon: <IconHair /> },
// ];

// const clinicTreatments = [
//   { id: 1, title: "Gycora Facial Acne Repair", price: "Rp235.000", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
//   { id: 2, title: "Promo Pico Laser 499", price: "Rp499.000", image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
//   { id: 3, title: "My First Glow", price: "Rp499.000", image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
//   { id: 4, title: "Glass Skin Facial", price: "Rp699.000", image: "https://images.unsplash.com/photo-1598440947619-2ce6598c4e1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
//   { id: 5, title: "Hair Growth Express", price: "Rp299.000", image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
//   { id: 6, title: "Laser A+ Scalp", price: "Rp1.000.000", image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
// ];

// const otcProducts = [
//   { id: 1, title: "Gycora Micellar Water 60 ml", price: "Rp89.000", discPrice: "Rp21.500", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
//   { id: 2, title: "BoostME Daily Serum 15 ml", price: "Rp135.000", discPrice: "Rp90.000", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
//   { id: 3, title: "RefineME Acne Serum 15 ml", price: "Rp139.000", discPrice: "Rp30.000", image: "https://images.unsplash.com/photo-1615397323218-c2bda069f9d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
//   { id: 4, title: "PurifyME Gentle Cleanser", price: "Rp85.000", discPrice: "Rp65.000", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
// ];

// // Placeholder untuk logo media
// const mediaLogos = [
//   "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Tech_in_Asia_logo.svg/512px-Tech_in_Asia_logo.svg.png",
//   "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Kompas_Logo.svg/512px-Kompas_Logo.svg.png",
// ];

// const faqs = [
//   { q: "Apa itu Gycora Care?", a: "Gycora Care adalah klinik kesehatan kulit dan rambut terdepan. Kami menyediakan solusi medis untuk kulit lebih cerah dan rambut yang lebih lebat, tersedia secara online maupun di outlet resmi kami." },
//   { q: "Apakah produk dari Gycora aman?", a: "Ya, seluruh produk kami diformulasikan oleh tim dokter ahli, terdaftar di BPOM, tidak mengandung bahan berbahaya, dan sudah teruji secara klinis." },
//   { q: "Apakah saya dikenakan biaya untuk konsultasi?", a: "Konsultasi di Aplikasi Gycora maupun outlet Gycora Clinic tidak dipungut biaya (GRATIS) untuk evaluasi awal kondisi Anda." },
//   { q: "Bagaimana cara memulai perawatan?", a: "Pilih kondisi keluhan Anda di halaman ini, isi kuesioner medis, dan dokter kami akan langsung memberikan rekomendasi produk atau treatment yang paling tepat untuk Anda." },
// ];

// export default function ConsultWithUs() {
//   const navigate = useNavigate();

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData] = useState<any>(() => {
//     const storedUser = localStorage.getItem("user_data");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   const [activeFaq, setActiveFaq] = useState<number | null>(null);

//   const handleStartConsultation = (categoryName: string) => {
//     if (!userData) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk atau daftar terlebih dahulu untuk memulai konsultasi medis gratis.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonText: "Login Sekarang",
//         cancelButtonText: "Nanti",
//         confirmButtonColor: "#059669"
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     Swal.fire({
//       icon: 'success',
//       title: 'Memulai Konsultasi',
//       text: `Anda memilih kategori: ${categoryName}. Sistem kuesioner medis segera disiapkan.`,
//       confirmButtonColor: "#059669"
//     });
//   };

//   const toggleFaq = (index: number) => {
//     setActiveFaq(activeFaq === index ? null : index);
//   };

//   return (
//     <div className="min-h-screen pb-20 font-sans bg-gray-50 animate-fade-in">

//       {/* ================= HERO SECTION ================= */}
//       <div className="relative bg-[linear-gradient(180deg,#0072CD_0%,#009CDE_100%)] md:bg-[linear-gradient(181deg,#0072CD_0.75%,#58A8DD_49.94%,#59CBE8_99.12%)] overflow-hidden">
//         <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl opacity-20"></div>
//         <div className="relative flex flex-col items-center gap-12 px-4 py-16 mx-auto text-center max-w-7xl sm:px-6 lg:px-8 lg:py-24 md:text-left md:flex-row">
//           <div className="flex-1 space-y-6">
//             <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-white bg-white/20 uppercase border border-white/30 backdrop-blur-sm shadow-sm">
//               ✨ Konsultasi Dokter Gratis
//             </span>
//             <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
//               Hai, Selamat datang!<br />
//               <span className="text-emerald-100">Mulai perjalanan #RawatDiri-mu</span>
//             </h1>
//             <p className="max-w-2xl text-lg text-white/90 sm:text-xl">
//               Dapatkan hasil nyata dengan resep dokter spesialis. Solusi tepat untuk jerawat, kusam, kebotakan, hingga rambut rontok.
//             </p>
//             <div className="pt-4">
//               <button onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })} className="px-8 py-4 text-base font-bold text-gray-900 transition-all bg-white rounded-full shadow-lg hover:bg-gray-100 hover:shadow-xl hover:-translate-y-1">
//                 Pilih Keluhanmu Sekarang
//               </button>
//             </div>
//           </div>

//           <div className="relative justify-end flex-1 hidden md:flex">
//              {/* Lingkaran dekoratif di belakang foto dokter */}
//              <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-80 h-80 bg-white/20 blur-2xl"></div>
//              {/* Foto Dokter dari Unsplash */}
//              <img
//                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
//                alt="Gycora Dermatologist"
//                className="relative z-10 w-full max-w-md rounded-[2rem] shadow-2xl border-4 border-white/50 animate-fade-in-up object-cover h-[450px]"
//              />
//           </div>
//         </div>
//       </div>

//       {/* ================= STATISTIK / SOCIAL PROOF ================= */}
//       <div className="relative z-10 py-8 -mt-4 bg-white border-b border-gray-200 shadow-sm rounded-t-3xl md:rounded-none md:mt-0">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-6 text-center divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
//             <div className="py-4 md:py-0">
//               <p className="text-3xl font-black md:text-4xl text-gycora drop-shadow-sm">1 Juta+</p>
//               <p className="mt-1 text-sm font-medium tracking-widest text-gray-500 uppercase">Produk Terjual</p>
//             </div>
//             <div className="py-4 md:py-0">
//               <p className="text-3xl font-black md:text-4xl text-gycora drop-shadow-sm">1.000+</p>
//               <p className="mt-1 text-sm font-medium tracking-widest text-gray-500 uppercase">Kombinasi Formulasi</p>
//             </div>
//             <div className="py-4 md:py-0">
//               <p className="text-3xl font-black md:text-4xl text-gycora drop-shadow-sm">4.8 / 5</p>
//               <p className="mt-1 text-sm font-medium tracking-widest text-gray-500 uppercase">Rating Kepuasan</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= CARA KERJA ================= */}
//       <div className="py-16 bg-emerald-50/50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-10 text-center">
//             <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Cara #RawatDiri bareng Gycora</h2>
//             <p className="text-sm text-gray-500">Proses mudah, cepat, dan terpercaya.</p>
//           </div>

//           <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
//             <div className="hidden md:block absolute top-6 left-1/2 -translate-x-1/2 w-[70%] h-0.5 bg-gradient-to-r from-emerald-200 via-gycora to-emerald-200 z-0"></div>

//             <div className="relative z-10 flex flex-col items-center text-center">
//               <div className="flex items-center justify-center w-12 h-12 mb-4 text-xl font-bold text-white rounded-full shadow-lg bg-gycora ring-4 ring-white">1</div>
//               <h3 className="mb-2 text-sm font-bold text-gray-900">Pilih Kondisi</h3>
//               <p className="px-4 text-xs text-gray-500">Pilih keluhan yang paling sesuai dengan kebutuhanmu saat ini.</p>
//             </div>
//             <div className="relative z-10 flex flex-col items-center text-center">
//               <div className="flex items-center justify-center w-12 h-12 mb-4 text-xl font-bold text-white rounded-full shadow-lg bg-gycora ring-4 ring-white">2</div>
//               <h3 className="mb-2 text-sm font-bold text-gray-900">Isi Kuesioner</h3>
//               <p className="px-4 text-xs text-gray-500">Jawab pertanyaan medis singkat & chat dengan dokter spesialis.</p>
//             </div>
//             <div className="relative z-10 flex flex-col items-center text-center">
//               <div className="flex items-center justify-center w-12 h-12 mb-4 text-xl font-bold text-white rounded-full shadow-lg bg-gycora ring-4 ring-white">3</div>
//               <h3 className="mb-2 text-sm font-bold text-gray-900">Beli Produk</h3>
//               <p className="px-4 text-xs text-gray-500">Beli racikan produk khusus yang direkomendasikan dokter untukmu.</p>
//             </div>
//             <div className="relative z-10 flex flex-col items-center text-center">
//               <div className="flex items-center justify-center w-12 h-12 mb-4 text-xl font-bold text-white rounded-full shadow-lg bg-gycora ring-4 ring-white">4</div>
//               <h3 className="mb-2 text-sm font-bold text-gray-900">Update Progress</h3>
//               <p className="px-4 text-xs text-gray-500">Pantau perkembanganmu dan konsultasi ulang secara GRATIS.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= CATEGORY GRID ================= */}
//       <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="flex flex-col justify-between gap-4 mb-8 md:flex-row md:items-end">
//           <div>
//             <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Konsul keluhan sesuai kebutuhan</h2>
//             <p className="text-sm text-gray-500">Pilih kondisi dan dapatkan panduan dari dokter ahli.</p>
//           </div>
//           <span className="px-4 py-1.5 text-xs font-bold text-white bg-red-500 rounded-full animate-pulse shadow-md w-max">
//             Konsultasi 100% GRATIS
//           </span>
//         </div>

//         <div className="flex gap-4 pb-6 overflow-x-auto snap-x snap-mandatory no-scrollbar md:grid md:grid-cols-4 md:gap-6 md:overflow-visible">
//           {consultationCategories.map((category) => (
//             <div
//               key={category.id}
//               onClick={() => handleStartConsultation(category.title)}
//               className="relative flex flex-col items-center w-40 p-4 transition-all duration-300 bg-white border border-gray-200 cursor-pointer snap-center shrink-0 md:w-auto md:p-6 rounded-2xl group hover:border-gycora hover:shadow-xl hover:-translate-y-1"
//             >
//               <div className="flex items-center justify-center w-16 h-16 mb-4 transition-colors border border-gray-100 rounded-full bg-gray-50 group-hover:bg-emerald-50">
//                 {category.icon}
//               </div>
//               <h3 className="text-sm font-bold text-center text-gray-900 group-hover:text-gycora">
//                 {category.title}
//               </h3>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ================= SIGNATURE CLINIC TREATMENTS ================= */}
//       <div className="py-16 bg-gray-900">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col justify-between gap-4 mb-10 md:flex-row md:items-end">
//             <div>
//               <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">Gycora Clinic's Signature Treatments</h2>
//               <p className="text-sm text-gray-400">Perawatan langsung di klinik dengan teknologi mutakhir.</p>
//             </div>
//             <Link to="/products" className="text-sm font-bold transition-colors text-gycora hover:text-white">Lihat Semua Treatment &rarr;</Link>
//           </div>

//           <div className="flex gap-6 pb-6 overflow-x-auto snap-x snap-mandatory no-scrollbar">
//             {clinicTreatments.map((treatment) => (
//               <div key={treatment.id} className="flex flex-col w-64 overflow-hidden transition-shadow bg-white shadow-lg snap-center shrink-0 rounded-2xl hover:shadow-gycora/20">
//                 <div className="relative bg-gray-100 aspect-square">
//                   <img src={treatment.image} alt={treatment.title} className="object-cover w-full h-full" />
//                 </div>
//                 <div className="flex flex-col flex-1 p-5">
//                   <h3 className="flex-1 mb-2 text-sm font-bold text-gray-900 line-clamp-2">{treatment.title}</h3>
//                   <p className="mb-4 text-lg font-black text-gycora">{treatment.price}</p>
//                   <button onClick={() => handleStartConsultation(treatment.title)} className="w-full py-2.5 text-xs font-bold text-white bg-gray-900 rounded-lg hover:bg-black transition-colors">
//                     Buat Janji Temu
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ================= OTC / ESSENTIALS PRODUCTS ================= */}
//       <div className="py-16 bg-white border-b border-gray-100">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col justify-between gap-4 mb-10 md:flex-row md:items-end">
//             <div>
//               <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Skip Konsultasi dengan Gycora Essentials</h2>
//               <p className="text-sm text-gray-500">Skincare harian (Bebas Beli) yang aman digunakan tanpa resep.</p>
//             </div>
//             <Link to="/products" className="text-sm font-bold transition-colors text-gycora hover:text-gycora-dark">Lihat Semua Produk &rarr;</Link>
//           </div>

//           <div className="flex gap-6 pb-6 overflow-x-auto snap-x snap-mandatory no-scrollbar">
//             {otcProducts.map((product) => (
//               <div key={product.id} className="flex flex-col w-56 overflow-hidden transition-colors bg-white border border-gray-200 snap-center shrink-0 rounded-2xl hover:border-gycora group">
//                 <div className="relative flex items-center justify-center p-4 aspect-square bg-gray-50">
//                   <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">PROMO</div>
//                   <img src={product.image} alt={product.title} className="object-contain w-full h-full transition-transform group-hover:scale-105" />
//                 </div>
//                 <div className="flex flex-col flex-1 p-4 border-t border-gray-100">
//                   <h3 className="flex-1 mb-2 text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-gycora">{product.title}</h3>
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className="text-xs text-gray-400 line-through">{product.price}</span>
//                     <span className="text-base font-black text-gycora">{product.discPrice}</span>
//                   </div>
//                   <button onClick={() => navigate('/products')} className="w-full py-2 text-xs font-bold transition-colors border rounded-lg text-gycora-dark bg-emerald-50 border-emerald-200 hover:bg-gycora hover:text-white">
//                     Beli Langsung
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ================= MEDIA COVERAGE ================= */}
//       <div className="py-12 border-b border-gray-200 bg-gray-50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <h3 className="mb-8 text-sm font-bold tracking-widest text-center text-gray-400 uppercase">Telah Diliput Oleh Media Nasional</h3>
//           <div className="flex flex-wrap items-center justify-center gap-8 transition-all duration-500 md:gap-16 opacity-60 grayscale hover:grayscale-0">
//             {mediaLogos.map((logo, idx) => (
//               <img key={idx} src={logo} alt="Media Coverage" className="object-contain h-8 md:h-10" />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ================= FAQ SECTION ================= */}
//       <div className="py-20 bg-white">
//         <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-8">
//           <div className="mb-12 text-center">
//             <h2 className="mb-4 text-3xl font-extrabold text-gray-900">Kamu Tanya, Kami Jawab</h2>
//             <p className="text-gray-500">Pertanyaan yang paling sering diajukan oleh pelanggan kami.</p>
//           </div>

//           <div className="space-y-4">
//             {faqs.map((faq, index) => (
//               <div key={index} className="overflow-hidden transition-all duration-300 border border-gray-200 rounded-2xl">
//                 <button
//                   onClick={() => toggleFaq(index)}
//                   className="flex items-center justify-between w-full p-5 text-left transition-colors bg-white hover:bg-gray-50"
//                 >
//                   <span className="pr-4 text-sm font-bold text-gray-900 md:text-base">{faq.q}</span>
//                   <svg
//                     className={`w-5 h-5 text-gycora transform transition-transform duration-300 shrink-0 ${activeFaq === index ? 'rotate-180' : ''}`}
//                     fill="none" viewBox="0 0 24 24" stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
//                 <div
//                   className={`px-5 text-gray-600 text-sm leading-relaxed transition-all duration-300 ease-in-out bg-gray-50 ${activeFaq === index ? 'max-h-40 py-5 border-t border-gray-100 opacity-100' : 'max-h-0 py-0 opacity-0 pointer-events-none'}`}
//                 >
//                   {faq.a}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-10 text-center">
//             <button onClick={() => navigate('/help-center')} className="text-sm font-bold text-gycora hover:underline">
//               Lihat Pusat Bantuan Lengkap &rarr;
//             </button>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// // ============================================================================
// // 1. IKON SVG TETAP HARDCODED (Karena lebih ringan dirender langsung)
// // ============================================================================
// // const IconAcne = () => <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
// // const IconHair = () => <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>;
// // const IconSkin = () => <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
// // const IconBeard = () => <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;

// // const consultationCategories = [
// //   { id: 1, title: "Jerawat Remaja", icon: <IconAcne /> },
// //   { id: 2, title: "Jerawat Dewasa", icon: <IconAcne /> },
// //   { id: 3, title: "Kebotakan", icon: <IconHair /> },
// //   { id: 4, title: "Rambut Rontok", icon: <IconHair /> },
// //   { id: 5, title: "Penumbuh Brewok", icon: <IconBeard /> },
// //   { id: 6, title: "Kulit Kusam", icon: <IconSkin /> },
// //   { id: 7, title: "Bekas Jerawat", icon: <IconAcne /> },
// //   { id: 8, title: "Ketombe", icon: <IconHair /> },
// // ];

// export default function ConsultWithUs() {
//   const navigate = useNavigate();

//   const [userData] = useState<any>(() => {
//     const storedUser = localStorage.getItem("user_data");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   const [activeFaq, setActiveFaq] = useState<number | null>(null);

//   // --- STATE UNTUK DATA DINAMIS DARI BACKEND ---
//   const [clinicTreatments, setClinicTreatments] = useState<any[]>([]);
//   const [otcProducts, setOtcProducts] = useState<any[]>([]);
//   const [faqs, setFaqs] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // --- FETCH DATA DARI API ---
//   useEffect(() => {
//     const fetchLandingData = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/landing-page/consult`);
//         if (res.ok) {
//           const data = await res.json();
//           setClinicTreatments(data.treatments || []);
//           setOtcProducts(data.otc_products || []);
//           setFaqs(data.faqs || []);
//         }
//       } catch (error) {
//         console.error("Gagal memuat data landing page:", error);
//         // Fallback ke dummy data Aset Lokal jika API belum siap
//         loadDummyLocalData();
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchLandingData();
//   }, []);

//   const loadDummyLocalData = () => {
//     setClinicTreatments([
//       { id: 1, title: "Gycora Facial Acne Repair", price: 235000, image_url: "/consult_images/treatment_1.jpg" },
//       { id: 2, title: "Promo Pico Laser 499", price: 499000, image_url: "/consult_images/treatment_2.jpg" },
//       { id: 3, title: "My First Glow", price: 499000, image_url: "/consult_images/treatment_3.jpg" },
//       { id: 4, title: "Glass Skin Facial", price: 699000, image_url: "/consult_images/treatment_4.jpg" },
//     ]);

//     setOtcProducts([
//       { id: 1, title: "Gycora Micellar Water 60 ml", price: 89000, discPrice: 21500, image_url: "/consult_images/otc_1.jpg" },
//       { id: 2, title: "BoostME Daily Serum 15 ml", price: 135000, discPrice: 90000, image_url: "/consult_images/otc_2.jpg" },
//     ]);

//     setFaqs([
//       { q: "Apa itu Gycora Care?", a: "Gycora Care adalah klinik kesehatan kulit dan rambut terdepan..." },
//       { q: "Apakah produk dari Gycora aman?", a: "Ya, seluruh produk kami diformulasikan oleh tim dokter ahli..." },
//     ]);
//   };

//   const handleStartConsultation = (categoryName: string) => {
//     if (!userData) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk atau daftar terlebih dahulu untuk memulai konsultasi medis gratis.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonText: "Login Sekarang",
//         cancelButtonText: "Nanti",
//         confirmButtonColor: "#059669"
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     Swal.fire({
//       icon: 'success',
//       title: 'Memulai Konsultasi',
//       text: `Anda memilih kategori: ${categoryName}. Sistem kuesioner medis segera disiapkan.`,
//       confirmButtonColor: "#059669"
//     });
//   };

//   const toggleFaq = (index: number) => {
//     setActiveFaq(activeFaq === index ? null : index);
//   };

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
//   };

//   if (isLoading) return <div className="flex items-center justify-center min-h-screen"><div className="w-12 h-12 border-4 rounded-full border-emerald-200 border-t-gycora animate-spin"></div></div>;

//   return (
//     <div className="min-h-screen pb-20 font-sans bg-gray-50 animate-fade-in">

//       {/* ... [HERO SECTION, STATISTIK, CARA KERJA TETAP SAMA SEPERTI SEBELUMNYA] ... */}

//       {/* ================= SIGNATURE CLINIC TREATMENTS (DINAMIS) ================= */}
//       <div className="py-16 bg-gray-900">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col justify-between gap-4 mb-10 md:flex-row md:items-end">
//             <div>
//               <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">Gycora Clinic's Signature Treatments</h2>
//               <p className="text-sm text-gray-400">Perawatan langsung di klinik dengan teknologi mutakhir.</p>
//             </div>
//           </div>

//           <div className="flex gap-6 pb-6 overflow-x-auto snap-x snap-mandatory no-scrollbar">
//             {clinicTreatments.map((treatment) => (
//               <div key={treatment.id} className="flex flex-col w-64 overflow-hidden transition-shadow bg-white shadow-lg snap-center shrink-0 rounded-2xl hover:shadow-gycora/20">
//                 <div className="relative bg-gray-100 aspect-square">
//                   <img src={treatment.image_url} alt={treatment.title} className="object-cover w-full h-full" />
//                 </div>
//                 <div className="flex flex-col flex-1 p-5">
//                   <h3 className="flex-1 mb-2 text-sm font-bold text-gray-900 line-clamp-2">{treatment.title}</h3>
//                   <p className="mb-4 text-lg font-black text-gycora">{formatRupiah(treatment.price)}</p>
//                   <button onClick={() => handleStartConsultation(treatment.title)} className="w-full py-2.5 text-xs font-bold text-white bg-gray-900 rounded-lg hover:bg-black transition-colors">
//                     Buat Janji Temu
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ================= FAQ SECTION (DINAMIS) ================= */}
//       <div className="py-20 bg-white">
//         <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-8">
//           <div className="mb-12 text-center">
//             <h2 className="mb-4 text-3xl font-extrabold text-gray-900">Kamu Tanya, Kami Jawab</h2>
//             <p className="text-gray-500">Pertanyaan yang paling sering diajukan oleh pelanggan kami.</p>
//           </div>

//           <div className="space-y-4">
//             {faqs.map((faq, index) => (
//               <div key={index} className="overflow-hidden transition-all duration-300 border border-gray-200 rounded-2xl">
//                 <button
//                   onClick={() => toggleFaq(index)}
//                   className="flex items-center justify-between w-full p-5 text-left transition-colors bg-white hover:bg-gray-50"
//                 >
//                   <span className="pr-4 text-sm font-bold text-gray-900 md:text-base">{faq.q}</span>
//                   <svg className={`w-5 h-5 text-gycora transform transition-transform duration-300 shrink-0 ${activeFaq === index ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
//                 <div className={`px-5 text-gray-600 text-sm leading-relaxed transition-all duration-300 ease-in-out bg-gray-50 ${activeFaq === index ? 'max-h-40 py-5 border-t border-gray-100 opacity-100' : 'max-h-0 py-0 opacity-0 pointer-events-none'}`}>
//                   {faq.a}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// // ============================================================================
// // 1. IKON SVG TETAP HARDCODED (Karena lebih ringan dirender langsung)
// // ============================================================================
// const IconAcne = () => <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
// const IconHair = () => <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>;
// const IconSkin = () => <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
// const IconBeard = () => <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;

// const consultationCategories = [
//   { id: 1, title: "Jerawat Remaja", icon: <IconAcne /> },
//   { id: 2, title: "Jerawat Dewasa", icon: <IconAcne /> },
//   { id: 3, title: "Kebotakan", icon: <IconHair /> },
//   { id: 4, title: "Rambut Rontok", icon: <IconHair /> },
//   { id: 5, title: "Penumbuh Brewok", icon: <IconBeard /> },
//   { id: 6, title: "Kulit Kusam", icon: <IconSkin /> },
//   { id: 7, title: "Bekas Jerawat", icon: <IconAcne /> },
//   { id: 8, title: "Ketombe", icon: <IconHair /> },
// ];

// const mediaLogos = [
//   "https://assets-production.diricare.com/production/master-landing-page/techinasia.png",
//   "https://assets-production.diricare.com/production/master-landing-page/tribun-news.png",
//   "https://assets-production.diricare.com/production/master-landing-page/katadata.png",
//   "https://assets-production.diricare.com/production/master-landing-page/kontan.png",
//   "https://assets-production.diricare.com/production/master-landing-page/kompas.png",
// ];

// export default function ConsultWithUs() {
//   const navigate = useNavigate();

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData] = useState<any>(() => {
//     const storedUser = localStorage.getItem("user_data");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   const [activeFaq, setActiveFaq] = useState<number | null>(null);

//   // --- STATE UNTUK DATA DINAMIS DARI BACKEND ---
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [clinicTreatments, setClinicTreatments] = useState<any[]>([]);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [otcProducts, setOtcProducts] = useState<any[]>([]);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [faqs, setFaqs] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // --- FETCH DATA DARI API ---
//   useEffect(() => {
//     const fetchLandingData = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/landing-page/consult`);
//         if (res.ok) {
//           const data = await res.json();
//           setClinicTreatments(data.treatments || []);
//           setOtcProducts(data.otc_products || []);
//           setFaqs(data.faqs || []);
//         }
//       } catch (error) {
//         console.error("Gagal memuat data landing page:", error);
//         // Fallback ke dummy data Aset Lokal jika API belum siap
//         loadDummyLocalData();
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchLandingData();
//   }, []);

//   const loadDummyLocalData = () => {
//     setClinicTreatments([
//       { id: 1, title: "Gycora Facial Acne Repair", price: 235000, image_url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
//       { id: 2, title: "Promo Pico Laser 499", price: 499000, image_url: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
//       { id: 3, title: "My First Glow", price: 499000, image_url: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
//       { id: 4, title: "Glass Skin Facial", price: 699000, image_url: "https://images.unsplash.com/photo-1598440947619-2ce6598c4e1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
//     ]);

//     setOtcProducts([
//       { id: 1, name: "Gycora Micellar Water 60 ml", price: 89000, discPrice: 21500, image_url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
//       { id: 2, name: "BoostME Daily Serum 15 ml", price: 135000, discPrice: 90000, image_url: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
//       { id: 3, name: "RefineME Acne Serum 15 ml", price: 139000, discPrice: 30000, image_url: "https://images.unsplash.com/photo-1615397323218-c2bda069f9d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
//       { id: 4, name: "PurifyME Gentle Cleanser", price: 85000, discPrice: 65000, image_url: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
//     ]);

//     setFaqs([
//       { q: "Apa itu Gycora Care?", a: "Gycora Care adalah klinik kesehatan kulit dan rambut terdepan. Kami menyediakan solusi medis untuk kulit lebih cerah dan rambut yang lebih lebat, tersedia secara online maupun di outlet resmi kami." },
//       { q: "Apakah produk dari Gycora aman?", a: "Ya, seluruh produk kami diformulasikan oleh tim dokter ahli, terdaftar di BPOM, tidak mengandung bahan berbahaya, dan sudah teruji secara klinis." },
//     ]);
//   };

//   const handleStartConsultation = (categoryName: string) => {
//     if (!userData) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk atau daftar terlebih dahulu untuk memulai konsultasi medis gratis.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonText: "Login Sekarang",
//         cancelButtonText: "Nanti",
//         confirmButtonColor: "#059669"
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     Swal.fire({
//       icon: 'success',
//       title: 'Memulai Konsultasi',
//       text: `Anda memilih kategori: ${categoryName}. Sistem kuesioner medis segera disiapkan.`,
//       confirmButtonColor: "#059669"
//     });
//   };

//   const toggleFaq = (index: number) => {
//     setActiveFaq(activeFaq === index ? null : index);
//   };

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
//   };

//   if (isLoading) return <div className="flex items-center justify-center min-h-screen"><div className="w-12 h-12 border-4 rounded-full border-emerald-200 border-t-gycora animate-spin"></div></div>;

//   return (
//     <div className="min-h-screen pb-20 font-sans bg-gray-50 animate-fade-in">

//       {/* ================= HERO SECTION ================= */}
//       <div className="relative bg-[linear-gradient(180deg,#0072CD_0%,#009CDE_100%)] md:bg-[linear-gradient(181deg,#0072CD_0.75%,#58A8DD_49.94%,#59CBE8_99.12%)] overflow-hidden">
//         <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl opacity-20"></div>
//         <div className="relative flex flex-col items-center gap-12 px-4 py-16 mx-auto text-center max-w-7xl sm:px-6 lg:px-8 lg:py-24 md:text-left md:flex-row">
//           <div className="flex-1 space-y-6">
//             <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-white bg-white/20 uppercase border border-white/30 backdrop-blur-sm shadow-sm">
//               ✨ Konsultasi Dokter Gratis
//             </span>
//             <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
//               Hai, Selamat datang!<br />
//               <span className="text-emerald-100">Mulai perjalanan #RawatDiri-mu</span>
//             </h1>
//             <p className="max-w-2xl text-lg text-white/90 sm:text-xl">
//               Dapatkan hasil nyata dengan resep dokter spesialis. Solusi tepat untuk jerawat, kusam, kebotakan, hingga rambut rontok.
//             </p>
//             <div className="pt-4">
//               <button onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })} className="px-8 py-4 text-base font-bold text-gray-900 transition-all bg-white rounded-full shadow-lg hover:bg-gray-100 hover:shadow-xl hover:-translate-y-1">
//                 Pilih Keluhanmu Sekarang
//               </button>
//             </div>
//           </div>

//           <div className="relative justify-end flex-1 hidden md:flex">
//              <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-80 h-80 bg-white/20 blur-2xl"></div>
//              <img
//                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
//                alt="Gycora Dermatologist"
//                className="relative z-10 w-full max-w-md rounded-[2rem] shadow-2xl border-4 border-white/50 animate-fade-in-up object-cover h-[450px]"
//              />
//           </div>
//         </div>
//       </div>

//       {/* ================= STATISTIK / SOCIAL PROOF ================= */}
//       <div className="relative z-10 py-8 -mt-4 bg-white border-b border-gray-200 shadow-sm rounded-t-3xl md:rounded-none md:mt-0">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-6 text-center divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
//             <div className="py-4 md:py-0">
//               <p className="text-3xl font-black md:text-4xl text-gycora drop-shadow-sm">1 Juta+</p>
//               <p className="mt-1 text-sm font-medium tracking-widest text-gray-500 uppercase">Produk Terjual</p>
//             </div>
//             <div className="py-4 md:py-0">
//               <p className="text-3xl font-black md:text-4xl text-gycora drop-shadow-sm">1.000+</p>
//               <p className="mt-1 text-sm font-medium tracking-widest text-gray-500 uppercase">Kombinasi Formulasi</p>
//             </div>
//             <div className="py-4 md:py-0">
//               <p className="text-3xl font-black md:text-4xl text-gycora drop-shadow-sm">4.8 / 5</p>
//               <p className="mt-1 text-sm font-medium tracking-widest text-gray-500 uppercase">Rating Kepuasan</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= CARA KERJA ================= */}
//       <div className="py-16 bg-emerald-50/50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-10 text-center">
//             <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Cara #RawatDiri bareng Gycora</h2>
//             <p className="text-sm text-gray-500">Proses mudah, cepat, dan terpercaya.</p>
//           </div>

//           <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
//             <div className="hidden md:block absolute top-6 left-1/2 -translate-x-1/2 w-[70%] h-0.5 bg-gradient-to-r from-emerald-200 via-gycora to-emerald-200 z-0"></div>

//             <div className="relative z-10 flex flex-col items-center text-center">
//               <div className="flex items-center justify-center w-12 h-12 mb-4 text-xl font-bold text-white rounded-full shadow-lg bg-gycora ring-4 ring-white">1</div>
//               <h3 className="mb-2 text-sm font-bold text-gray-900">Pilih Kondisi</h3>
//               <p className="px-4 text-xs text-gray-500">Pilih keluhan yang paling sesuai dengan kebutuhanmu saat ini.</p>
//             </div>
//             <div className="relative z-10 flex flex-col items-center text-center">
//               <div className="flex items-center justify-center w-12 h-12 mb-4 text-xl font-bold text-white rounded-full shadow-lg bg-gycora ring-4 ring-white">2</div>
//               <h3 className="mb-2 text-sm font-bold text-gray-900">Isi Kuesioner</h3>
//               <p className="px-4 text-xs text-gray-500">Jawab pertanyaan medis singkat & chat dengan dokter spesialis.</p>
//             </div>
//             <div className="relative z-10 flex flex-col items-center text-center">
//               <div className="flex items-center justify-center w-12 h-12 mb-4 text-xl font-bold text-white rounded-full shadow-lg bg-gycora ring-4 ring-white">3</div>
//               <h3 className="mb-2 text-sm font-bold text-gray-900">Beli Produk</h3>
//               <p className="px-4 text-xs text-gray-500">Beli racikan produk khusus yang direkomendasikan dokter untukmu.</p>
//             </div>
//             <div className="relative z-10 flex flex-col items-center text-center">
//               <div className="flex items-center justify-center w-12 h-12 mb-4 text-xl font-bold text-white rounded-full shadow-lg bg-gycora ring-4 ring-white">4</div>
//               <h3 className="mb-2 text-sm font-bold text-gray-900">Update Progress</h3>
//               <p className="px-4 text-xs text-gray-500">Pantau perkembanganmu dan konsultasi ulang secara GRATIS.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= CATEGORY GRID ================= */}
//       <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="flex flex-col justify-between gap-4 mb-8 md:flex-row md:items-end">
//           <div>
//             <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Konsul keluhan sesuai kebutuhan</h2>
//             <p className="text-sm text-gray-500">Pilih kondisi dan dapatkan panduan dari dokter ahli.</p>
//           </div>
//           <span className="px-4 py-1.5 text-xs font-bold text-white bg-red-500 rounded-full animate-pulse shadow-md w-max">
//             Konsultasi 100% GRATIS
//           </span>
//         </div>

//         <div className="flex gap-4 pb-6 overflow-x-auto snap-x snap-mandatory no-scrollbar md:grid md:grid-cols-4 md:gap-6 md:overflow-visible">
//           {consultationCategories.map((category) => (
//             <div
//               key={category.id}
//               onClick={() => handleStartConsultation(category.title)}
//               className="relative flex flex-col items-center w-40 p-4 transition-all duration-300 bg-white border border-gray-200 cursor-pointer snap-center shrink-0 md:w-auto md:p-6 rounded-2xl group hover:border-gycora hover:shadow-xl hover:-translate-y-1"
//             >
//               <div className="flex items-center justify-center w-16 h-16 mb-4 transition-colors border border-gray-100 rounded-full bg-gray-50 group-hover:bg-emerald-50">
//                 {category.icon}
//               </div>
//               <h3 className="text-sm font-bold text-center text-gray-900 group-hover:text-gycora">
//                 {category.title}
//               </h3>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ================= SIGNATURE CLINIC TREATMENTS (DINAMIS) ================= */}
//       <div className="py-16 bg-gray-900">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col justify-between gap-4 mb-10 md:flex-row md:items-end">
//             <div>
//               <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">Gycora Clinic's Signature Treatments</h2>
//               <p className="text-sm text-gray-400">Perawatan langsung di klinik dengan teknologi mutakhir.</p>
//             </div>
//           </div>

//           <div className="flex gap-6 pb-6 overflow-x-auto snap-x snap-mandatory no-scrollbar">
//             {clinicTreatments.map((treatment) => (
//               <div key={treatment.id} className="flex flex-col w-64 overflow-hidden transition-shadow bg-white shadow-lg snap-center shrink-0 rounded-2xl hover:shadow-gycora/20">
//                 <div className="relative bg-gray-100 aspect-square">
//                   <img src={treatment.image_url} alt={treatment.title} className="object-cover w-full h-full" />
//                 </div>
//                 <div className="flex flex-col flex-1 p-5">
//                   <h3 className="flex-1 mb-2 text-sm font-bold text-gray-900 line-clamp-2">{treatment.title}</h3>
//                   <p className="mb-4 text-lg font-black text-gycora">{formatRupiah(treatment.price)}</p>
//                   <button onClick={() => handleStartConsultation(treatment.title)} className="w-full py-2.5 text-xs font-bold text-white bg-gray-900 rounded-lg hover:bg-black transition-colors">
//                     Buat Janji Temu
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ================= OTC / ESSENTIALS PRODUCTS (BAGIAN YANG HILANG DIKEMBALIKAN) ================= */}
//       <div className="py-16 bg-white border-b border-gray-100">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col justify-between gap-4 mb-10 md:flex-row md:items-end">
//             <div>
//               <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Skip Konsultasi dengan Gycora Essentials</h2>
//               <p className="text-sm text-gray-500">Skincare harian (Bebas Beli) yang aman digunakan tanpa resep.</p>
//             </div>
//             <Link to="/products" className="text-sm font-bold transition-colors text-gycora hover:text-gycora-dark">Lihat Semua Produk &rarr;</Link>
//           </div>

//           <div className="flex gap-6 pb-6 overflow-x-auto snap-x snap-mandatory no-scrollbar">
//             {otcProducts.map((product) => (
//               <div key={product.id} className="flex flex-col w-56 overflow-hidden transition-colors bg-white border border-gray-200 snap-center shrink-0 rounded-2xl hover:border-gycora group">
//                 <div className="relative flex items-center justify-center p-4 aspect-square bg-gray-50">
//                   <img src={product.image_url || product.image} alt={product.name || product.title} className="object-contain w-full h-full transition-transform group-hover:scale-105" />
//                 </div>
//                 <div className="flex flex-col flex-1 p-4 border-t border-gray-100">
//                   <h3 className="flex-1 mb-2 text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-gycora">{product.name || product.title}</h3>
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className="text-base font-black text-gycora">{formatRupiah(product.price)}</span>
//                   </div>
//                   <button onClick={() => navigate('/products')} className="w-full py-2 text-xs font-bold transition-colors border rounded-lg text-gycora-dark bg-emerald-50 border-emerald-200 hover:bg-gycora hover:text-white">
//                     Beli Langsung
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ================= MEDIA COVERAGE ================= */}
//       <div className="py-12 border-b border-gray-200 bg-gray-50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <h3 className="mb-8 text-sm font-bold tracking-widest text-center text-gray-400 uppercase">Telah Diliput Oleh Media Nasional</h3>
//           <div className="flex flex-wrap items-center justify-center gap-8 transition-all duration-500 md:gap-16 opacity-60 grayscale hover:grayscale-0">
//             {mediaLogos.map((logo, idx) => (
//               <img key={idx} src={logo} alt="Media Coverage" className="object-contain h-8 md:h-10" />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ================= FAQ SECTION (DINAMIS) ================= */}
//       <div className="py-20 bg-white">
//         <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-8">
//           <div className="mb-12 text-center">
//             <h2 className="mb-4 text-3xl font-extrabold text-gray-900">Kamu Tanya, Kami Jawab</h2>
//             <p className="text-gray-500">Pertanyaan yang paling sering diajukan oleh pelanggan kami.</p>
//           </div>

//           <div className="space-y-4">
//             {faqs.map((faq, index) => (
//               <div key={index} className="overflow-hidden transition-all duration-300 border border-gray-200 rounded-2xl">
//                 <button
//                   onClick={() => toggleFaq(index)}
//                   className="flex items-center justify-between w-full p-5 text-left transition-colors bg-white hover:bg-gray-50"
//                 >
//                   <span className="pr-4 text-sm font-bold text-gray-900 md:text-base">{faq.q}</span>
//                   <svg className={`w-5 h-5 text-gycora transform transition-transform duration-300 shrink-0 ${activeFaq === index ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
//                 <div className={`px-5 text-gray-600 text-sm leading-relaxed transition-all duration-300 ease-in-out bg-gray-50 ${activeFaq === index ? 'max-h-40 py-5 border-t border-gray-100 opacity-100' : 'max-h-0 py-0 opacity-0 pointer-events-none'}`}>
//                   {faq.a}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// // Aset lokal untuk shuffle header
// import img1 from "../../assets/consult_images/header_1.jpg";
// import img2 from "../../assets/consult_images/header_2.jpg";
// import img3 from "../../assets/consult_images/header_3.jpg";

// export default function ConsultWithUs() {
//   const navigate = useNavigate();
//   const categorySectionRef = useRef<HTMLDivElement>(null);

//   const [userData] = useState<any>(() => {
//     const storedUser = localStorage.getItem("user_data");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   // Shuffle Image State
//   const headerImages = [img1, img2, img3];
//   const [currentImgIdx, setCurrentImgIdx] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImgIdx((prev) => (prev + 1) % headerImages.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const [clinicTreatments, setClinicTreatments] = useState<any[]>([]);
//   const [otcProducts, setOtcProducts] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchLandingData = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/landing-page/consult`);
//         if (res.ok) {
//           const data = await res.json();
//           setClinicTreatments(data.treatments);
//           setOtcProducts(data.otc_products);
//         }
//       } catch (e) { console.error(e); }
//       finally { setIsLoading(false); }
//     };
//     fetchLandingData();
//   }, []);

//   // --- LOGIKA KONSULTASI (LOG ADMIN) ---
//   const handleStartConsultation = async (category: string) => {
//     if (!userData) {
//       Swal.fire("Login Diperlukan", "Silakan login untuk memulai konsultasi.", "info");
//       return;
//     }

//     const { value: formValues } = await Swal.fire({
//       title: `Konsultasi ${category}`,
//       html:
//         '<select id="swal-input1" class="swal2-input"><option value="Video Call">Video Call</option><option value="Chat">Chat WhatsApp</option></select>' +
//         '<textarea id="swal-input2" class="swal2-textarea" placeholder="Ceritakan keluhan singkat Anda..."></textarea>',
//       focusConfirm: false,
//       confirmButtonText: "Kirim Permintaan",
//       confirmButtonColor: "#059669",
//       preConfirm: () => {
//         return {
//           type: (document.getElementById('swal-input1') as HTMLSelectElement).value,
//           notes: (document.getElementById('swal-input2') as HTMLTextAreaElement).value
//         }
//       }
//     });

//     if (formValues) {
//       const token = localStorage.getItem("user_token");
//       await fetch(`${BASE_URL}/api/consultation/log`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//         body: JSON.stringify({ category_title: category, consultation_type: formValues.type, notes: formValues.notes })
//       });
//       Swal.fire("Terkirim", "Dokter kami akan segera menghubungi Anda.", "success");
//     }
//   };

//   // --- LOGIKA BUAT JANJI TEMU ---
//   const handleBookAppointment = async (treatment: any) => {
//     if (!userData) { navigate("/login"); return; }

//     const { value: formValues } = await Swal.fire({
//       title: `Janji Temu: ${treatment.title}`,
//       html:
//         '<label class="text-xs font-bold">Pilih Tanggal & Waktu</label>' +
//         '<input id="swal-date" type="datetime-local" class="swal2-input">' +
//         '<textarea id="swal-reason" class="swal2-textarea" placeholder="Alasan kunjungan..."></textarea>',
//       confirmButtonText: "Konfirmasi Janji",
//       confirmButtonColor: "#059669",
//       preConfirm: () => {
//         return {
//           time: (document.getElementById('swal-date') as HTMLInputElement).value,
//           reason: (document.getElementById('swal-reason') as HTMLTextAreaElement).value
//         }
//       }
//     });

//     if (formValues) {
//       const token = localStorage.getItem("user_token");
//       const res = await fetch(`${BASE_URL}/api/clinic/appointment`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//         body: JSON.stringify({ treatment_id: treatment.id, appointment_time: formValues.time, reason: formValues.reason })
//       });
//       if(res.ok) Swal.fire("Sukses", "Jadwal Anda telah tercatat.", "success");
//     }
//   };

//   if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

//   return (
//     <div className="pb-20 font-sans bg-gray-50">

//       {/* HERO SECTION WITH SHUFFLE IMAGE */}
//       <div className="relative h-[600px] bg-gray-900 flex items-center overflow-hidden">
//         <img
//           src={headerImages[currentImgIdx]}
//           className="absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 opacity-40"
//         />
//         <div className="relative z-10 max-w-4xl px-8 space-y-6 text-white">
//           <h1 className="text-5xl font-black leading-tight">Solusi Medis Profesional<br />Untuk Rambut & Kulit.</h1>
//           <p className="text-xl text-gray-300">Konsultasi gratis secara daring dengan dokter spesialis Gycora.</p>
//           <button
//             onClick={() => categorySectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
//             className="px-8 py-4 font-bold text-white transition-transform rounded-full shadow-xl bg-gycora hover:scale-105"
//           >
//             Pilih Keluhanmu Sekarang
//           </button>
//         </div>
//       </div>

//       {/* KATEGORI KONSULTASI */}
//       <div ref={categorySectionRef} className="px-8 py-24 mx-auto max-w-7xl">
//         <h2 className="mb-12 text-3xl font-bold text-center text-gray-900">Konsul keluhan sesuai kebutuhan</h2>
//         <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
//           {/* Mapping kategori keluhan (seperti di kode sebelumnya) */}
//           {/* Contoh satu item: */}
//           <div
//             onClick={() => handleStartConsultation("Jerawat Remaja")}
//             className="p-8 text-center transition-all bg-white border cursor-pointer rounded-3xl hover:border-gycora group"
//           >
//             <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 group-hover:bg-emerald-50">
//                <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
//             </div>
//             <p className="font-bold">Jerawat Remaja</p>
//           </div>
//         </div>
//       </div>

//       {/* TREATMENT SECTION */}
//       <div className="py-24 bg-gray-900">
//         <div className="px-8 mx-auto max-w-7xl">
//            <h2 className="mb-12 text-3xl font-bold text-white">Signature Clinic Treatments</h2>
//            <div className="flex gap-6 pb-8 overflow-x-auto no-scrollbar">
//              {clinicTreatments.map(t => (
//                <div key={t.id} className="min-w-[300px] bg-white rounded-3xl overflow-hidden shadow-2xl">
//                  <img src={t.image_url} className="object-cover w-full h-48" />
//                  <div className="p-6">
//                     <h4 className="mb-2 text-lg font-bold">{t.title}</h4>
//                     <p className="mb-6 font-black text-gycora">Rp {parseInt(t.price).toLocaleString()}</p>
//                     <button
//                       onClick={() => handleBookAppointment(t)}
//                       className="w-full py-3 font-bold text-white bg-gray-900 rounded-xl"
//                     >
//                       Buat Janji Temu
//                     </button>
//                  </div>
//                </div>
//              ))}
//            </div>
//         </div>
//       </div>

//     </div>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// // ============================================================================
// // 1. IKON SVG TETAP HARDCODED (Karena lebih ringan dirender langsung)
// // ============================================================================
// const IconAcne = () => <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
// const IconHair = () => <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>;
// const IconSkin = () => <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
// const IconBeard = () => <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;

// const consultationCategories = [
//   { id: 1, title: "Jerawat Remaja", icon: <IconAcne /> },
//   { id: 2, title: "Jerawat Dewasa", icon: <IconAcne /> },
//   { id: 3, title: "Kebotakan", icon: <IconHair /> },
//   { id: 4, title: "Rambut Rontok", icon: <IconHair /> },
//   { id: 5, title: "Penumbuh Brewok", icon: <IconBeard /> },
//   { id: 6, title: "Kulit Kusam", icon: <IconSkin /> },
//   { id: 7, title: "Bekas Jerawat", icon: <IconAcne /> },
//   { id: 8, title: "Ketombe", icon: <IconHair /> },
// ];

// // --- IMPORT ASET LOKAL ---
// // Aset lokal untuk shuffle header
// import img1 from "../../assets/consult_images/header_1.png";
// import img2 from "../../assets/consult_images/header_2.png";
// import img3 from "../../assets/consult_images/header_3.png";

// // Aset lokal untuk Logo Media / Marketplace
// // Pastikan nama file ini sesuai dengan yang ada di folder src/assets/ Anda
// import logoShopee from "../../assets/shopee.png";
// import logoTokopedia from "../../assets/tokopedia.png";
// import logoTiktok from "../../assets/tiktok.png";
// import logoInstagram from "../../assets/instagram.png";

// const mediaLogos = [
//   logoShopee,
//   logoTokopedia,
//   logoTiktok,
//   logoInstagram,
// ];

// export default function ConsultWithUs() {
//   const navigate = useNavigate();
//   const categorySectionRef = useRef<HTMLDivElement>(null);

//   const [userData] = useState<any>(() => {
//     const storedUser = localStorage.getItem("user_data");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   const [activeFaq, setActiveFaq] = useState<number | null>(null);

//   // Shuffle Image State
//   const headerImages = [img1, img2, img3];
//   const [currentImgIdx, setCurrentImgIdx] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImgIdx((prev) => (prev + 1) % headerImages.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [headerImages.length]);

//   const [clinicTreatments, setClinicTreatments] = useState<any[]>([]);
//   const [otcProducts, setOtcProducts] = useState<any[]>([]);
//   const [faqs, setFaqs] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchLandingData = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/landing-page/consult`);
//         if (res.ok) {
//           const data = await res.json();
//           setClinicTreatments(data.treatments || []);
//           setOtcProducts(data.otc_products || []);
//           setFaqs(data.faqs || []);
//         }
//       } catch (e) {
//         console.error(e);
//         loadDummyLocalData();
//       }
//       finally {
//         setIsLoading(false);
//       }
//     };
//     fetchLandingData();
//   }, []);

//   const loadDummyLocalData = () => {
//     setClinicTreatments([
//       { id: 1, title: "Gycora Facial Acne Repair", price: 235000, image_url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
//       { id: 2, title: "Promo Pico Laser 499", price: 499000, image_url: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
//     ]);

//     setOtcProducts([
//       { id: 1, name: "Gycora Micellar Water 60 ml", price: 89000, image_url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
//       { id: 2, name: "BoostME Daily Serum 15 ml", price: 135000, image_url: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
//     ]);

//     setFaqs([
//       { q: "Apa itu Gycora Care?", a: "Gycora Care adalah klinik kesehatan kulit dan rambut terdepan. Kami menyediakan solusi medis untuk kulit lebih cerah dan rambut yang lebih lebat." },
//       { q: "Apakah produk dari Gycora aman?", a: "Ya, seluruh produk kami diformulasikan oleh tim dokter ahli, terdaftar di BPOM, tidak mengandung bahan berbahaya, dan sudah teruji secara klinis." },
//     ]);
//   };

//   // --- LOGIKA KONSULTASI (LOG ADMIN) ---
//   const handleStartConsultation = async (category: string) => {
//     if (!userData) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan login atau daftar terlebih dahulu untuk memulai konsultasi medis gratis.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#059669",
//         confirmButtonText: "Login Sekarang"
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     const { value: formValues } = await Swal.fire({
//       title: `Konsultasi ${category}`,
//       html:
//         '<select id="swal-input1" class="swal2-input"><option value="Video Call">Video Call</option><option value="Chat">Chat WhatsApp</option></select>' +
//         '<textarea id="swal-input2" class="swal2-textarea" placeholder="Ceritakan keluhan singkat Anda..."></textarea>',
//       focusConfirm: false,
//       showCancelButton: true,
//       confirmButtonText: "Kirim Permintaan",
//       confirmButtonColor: "#059669",
//       preConfirm: () => {
//         return {
//           type: (document.getElementById('swal-input1') as HTMLSelectElement).value,
//           notes: (document.getElementById('swal-input2') as HTMLTextAreaElement).value
//         }
//       }
//     });

//     if (formValues) {
//       const token = localStorage.getItem("user_token");
//       try {
//         const res = await fetch(`${BASE_URL}/api/consultation/log`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//           body: JSON.stringify({ category_title: category, consultation_type: formValues.type, notes: formValues.notes })
//         });
//         if(res.ok) {
//           Swal.fire("Terkirim", "Dokter kami akan segera menghubungi Anda.", "success");
//         } else {
//           throw new Error("Gagal mengirim.");
//         }
//       } catch (err) {
//         Swal.fire("Error", "Gagal mengirim permintaan.", "error");
//       }
//     }
//   };

//   // --- LOGIKA BUAT JANJI TEMU ---
//   const handleBookAppointment = async (treatment: any) => {
//     if (!userData) {
//       Swal.fire("Login Diperlukan", "Silakan login untuk membuat janji temu.", "info");
//       navigate("/login");
//       return;
//     }

//     const { value: formValues } = await Swal.fire({
//       title: `Janji Temu`,
//       html:
//         `<p class="text-sm font-bold text-gray-600 mb-4">${treatment.title}</p>` +
//         '<label class="text-xs font-bold block mb-1">Pilih Tanggal & Waktu</label>' +
//         '<input id="swal-date" type="datetime-local" class="swal2-input" style="margin-bottom:1rem">' +
//         '<textarea id="swal-reason" class="swal2-textarea" placeholder="Alasan kunjungan..."></textarea>',
//       showCancelButton: true,
//       confirmButtonText: "Konfirmasi Janji",
//       confirmButtonColor: "#059669",
//       preConfirm: () => {
//         const time = (document.getElementById('swal-date') as HTMLInputElement).value;
//         const reason = (document.getElementById('swal-reason') as HTMLTextAreaElement).value;
//         if (!time || !reason) {
//           Swal.showValidationMessage('Harap lengkapi tanggal dan alasan.');
//           return false;
//         }
//         return { time, reason };
//       }
//     });

//     if (formValues) {
//       const token = localStorage.getItem("user_token");
//       try {
//         const res = await fetch(`${BASE_URL}/api/clinic/appointment`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//           body: JSON.stringify({ treatment_id: treatment.id, appointment_time: formValues.time, reason: formValues.reason })
//         });
//         if(res.ok) {
//           Swal.fire("Sukses", "Jadwal Anda telah tercatat.", "success");
//         } else {
//           throw new Error("Gagal membuat janji.");
//         }
//       } catch (err) {
//         Swal.fire("Error", "Gagal membuat janji temu.", "error");
//       }
//     }
//   };

//   const toggleFaq = (index: number) => {
//     setActiveFaq(activeFaq === index ? null : index);
//   };

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
//   };

//   if (isLoading) return <div className="flex items-center justify-center min-h-screen"><div className="w-12 h-12 border-4 rounded-full border-emerald-200 border-t-gycora animate-spin"></div></div>;

//   return (
//     <div className="pb-20 font-sans bg-gray-50">

//       {/* ================= HERO SECTION WITH SHUFFLE IMAGE ================= */}
//       <div className="relative h-[600px] bg-gray-900 flex items-center overflow-hidden">
//         <img
//           src={headerImages[currentImgIdx]}
//           alt="Gycora Clinic"
//           className="absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 opacity-40"
//         />
//         <div className="relative z-10 max-w-4xl px-8 space-y-6 text-white md:px-12 animate-fade-in-up">
//           <h1 className="text-5xl font-black leading-tight tracking-tight md:text-6xl">
//             Solusi Medis Profesional<br />Untuk Rambut & Kulit.
//           </h1>
//           <p className="max-w-2xl text-lg text-gray-300 md:text-xl">
//             Konsultasi gratis secara daring dengan dokter spesialis Gycora dan temukan perawatan terbaik untuk Anda.
//           </p>
//           <button
//             onClick={() => categorySectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
//             className="px-8 py-4 mt-4 font-bold text-white transition-all rounded-full shadow-xl bg-gycora hover:scale-105 hover:bg-gycora-dark"
//           >
//             Pilih Keluhanmu Sekarang
//           </button>
//         </div>
//       </div>

//       {/* ================= KATEGORI KONSULTASI (USER INTERACTION) ================= */}
//       <div ref={categorySectionRef} className="px-6 py-24 mx-auto max-w-7xl lg:px-8">
//         <div className="mb-12 text-center md:text-left md:flex md:items-end md:justify-between">
//           <div>
//             <h2 className="mb-2 text-3xl font-bold text-gray-900">Konsul keluhan sesuai kebutuhan</h2>
//             <p className="text-gray-500">Pilih kondisi dan dapatkan panduan dari dokter ahli.</p>
//           </div>
//           <span className="hidden px-4 py-2 mt-4 text-xs font-bold text-white bg-red-500 rounded-full shadow-md animate-pulse md:inline-block w-max">
//             Konsultasi 100% GRATIS
//           </span>
//         </div>

//         <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
//           {consultationCategories.map((category) => (
//             <div
//               key={category.id}
//               onClick={() => handleStartConsultation(category.title)}
//               className="flex flex-col items-center p-6 text-center transition-all bg-white border border-gray-200 cursor-pointer rounded-3xl hover:border-gycora hover:shadow-xl hover:-translate-y-1 group"
//             >
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-colors border border-gray-100 rounded-full bg-gray-50 group-hover:bg-emerald-50">
//                  {category.icon}
//               </div>
//               <p className="text-sm font-bold text-gray-900 transition-colors group-hover:text-gycora">
//                 {category.title}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ================= SIGNATURE CLINIC TREATMENTS ================= */}
//       <div className="py-24 bg-gray-900">
//         <div className="px-6 mx-auto max-w-7xl lg:px-8">
//            <div className="mb-12">
//              <h2 className="mb-2 text-3xl font-bold text-white">Signature Clinic Treatments</h2>
//              <p className="text-gray-400">Perawatan eksklusif langsung di klinik dengan teknologi mutakhir.</p>
//            </div>

//            <div className="flex gap-6 pb-8 overflow-x-auto snap-x snap-mandatory no-scrollbar">
//              {clinicTreatments.map(t => (
//                <div key={t.id} className="flex flex-col min-w-[280px] w-[280px] bg-white rounded-3xl overflow-hidden shadow-2xl snap-center shrink-0">
//                  <img src={t.image_url} alt={t.title} className="object-cover w-full bg-gray-100 h-52" />
//                  <div className="flex flex-col flex-1 p-6">
//                     <h4 className="flex-1 mb-2 text-lg font-bold text-gray-900 line-clamp-2">{t.title}</h4>
//                     <p className="mb-6 font-black text-gycora">Rp {parseInt(t.price).toLocaleString('id-ID')}</p>
//                     <button
//                       onClick={() => handleBookAppointment(t)}
//                       className="w-full py-3 font-bold text-white transition-colors bg-gray-900 rounded-xl hover:bg-black"
//                     >
//                       Buat Janji Temu
//                     </button>
//                  </div>
//                </div>
//              ))}
//            </div>
//         </div>
//       </div>

//       {/* ================= OTC / ESSENTIALS PRODUCTS ================= */}
//       <div className="py-24 bg-white border-b border-gray-100">
//         <div className="px-6 mx-auto max-w-7xl lg:px-8">
//           <div className="flex flex-col justify-between gap-4 mb-12 md:flex-row md:items-end">
//             <div>
//               <h2 className="mb-2 text-3xl font-bold text-gray-900">Skip Konsultasi dengan Gycora Essentials</h2>
//               <p className="text-gray-500">Skincare harian (Bebas Beli) yang aman digunakan tanpa resep dokter.</p>
//             </div>
//             <Link to="/products" className="text-sm font-bold transition-colors text-gycora hover:text-gycora-dark">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>

//           <div className="flex gap-6 pb-8 overflow-x-auto snap-x snap-mandatory no-scrollbar">
//             {otcProducts.map((product) => (
//               <div key={product.id} className="flex flex-col min-w-[240px] w-[240px] overflow-hidden transition-colors bg-white border border-gray-200 snap-center shrink-0 rounded-3xl hover:border-gycora group">
//                 <div className="relative flex items-center justify-center p-4 aspect-square bg-gray-50">
//                   <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">PROMO</div>
//                   <img src={product.image_url || product.image} alt={product.name || product.title} className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105" />
//                 </div>
//                 <div className="flex flex-col flex-1 p-5 border-t border-gray-100">
//                   <h3 className="flex-1 mb-2 text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-gycora">{product.name || product.title}</h3>
//                   <div className="flex items-center gap-2 mb-4">
//                     <span className="text-lg font-black text-gycora">{formatRupiah(product.price)}</span>
//                   </div>
//                   <button onClick={() => navigate('/products')} className="w-full py-2.5 text-xs font-bold transition-colors border rounded-xl text-gycora-dark bg-emerald-50 border-emerald-200 hover:bg-gycora hover:text-white">
//                     Beli Langsung
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ================= MEDIA COVERAGE / PARTNERS ================= */}
//       <div className="py-12 border-b border-gray-200 bg-gray-50">
//         <div className="px-6 mx-auto max-w-7xl lg:px-8">
//           <h3 className="mb-8 text-sm font-bold tracking-widest text-center text-gray-400 uppercase">Tersedia Juga Di</h3>
//           <div className="flex flex-wrap items-center justify-center gap-8 transition-all duration-500 md:gap-16 opacity-70 grayscale hover:grayscale-0">
//             {mediaLogos.map((logo, idx) => (
//               <img key={idx} src={logo} alt="Partner Logo" className="object-contain h-8 md:h-12" />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ================= FAQ SECTION ================= */}
//       <div className="py-24 bg-white">
//         <div className="max-w-3xl px-6 mx-auto lg:px-8">
//           <div className="mb-12 text-center">
//             <h2 className="mb-4 text-3xl font-extrabold text-gray-900">Kamu Tanya, Kami Jawab</h2>
//             <p className="text-gray-500">Pertanyaan yang paling sering diajukan oleh pelanggan kami.</p>
//           </div>

//           <div className="space-y-4">
//             {faqs.map((faq, index) => (
//               <div key={index} className="overflow-hidden transition-all duration-300 border border-gray-200 rounded-2xl">
//                 <button
//                   onClick={() => toggleFaq(index)}
//                   className="flex items-center justify-between w-full p-5 text-left transition-colors bg-white hover:bg-gray-50 focus:outline-none"
//                 >
//                   <span className="pr-4 text-sm font-bold text-gray-900 md:text-base">{faq.q}</span>
//                   <svg className={`w-5 h-5 text-gycora transform transition-transform duration-300 shrink-0 ${activeFaq === index ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
//                 <div className={`px-5 text-gray-600 text-sm leading-relaxed transition-all duration-300 ease-in-out bg-gray-50 ${activeFaq === index ? 'max-h-40 py-5 border-t border-gray-100 opacity-100' : 'max-h-0 py-0 opacity-0 pointer-events-none'}`}>
//                   {faq.a}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-12 text-center">
//             <button onClick={() => navigate('/help-center')} className="text-sm font-bold transition-colors text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Pusat Bantuan Lengkap &rarr;
//             </button>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// const IconAcne = () => (
//   <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// );
// const IconHair = () => (
//   <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//   </svg>
// );
// const IconSkin = () => (
//   <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
//   </svg>
// );
// const IconBeard = () => (
//   <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//   </svg>
// );

// const consultationCategories = [
//   { id: 1, title: "Jerawat Remaja", icon: <IconAcne /> },
//   { id: 2, title: "Jerawat Dewasa", icon: <IconAcne /> },
//   { id: 3, title: "Kebotakan", icon: <IconHair /> },
//   { id: 4, title: "Rambut Rontok", icon: <IconHair /> },
//   { id: 5, title: "Penumbuh Brewok", icon: <IconBeard /> },
//   { id: 6, title: "Kulit Kusam", icon: <IconSkin /> },
//   { id: 7, title: "Bekas Jerawat", icon: <IconAcne /> },
//   { id: 8, title: "Ketombe", icon: <IconHair /> },
// ];

// import logoShopee from "../../assets/shopee.png";
// import logoTokopedia from "../../assets/tokopedia.png";
// import logoTiktok from "../../assets/tiktok.png";
// import logoInstagram from "../../assets/instagram.png";

// const mediaLogos = [logoShopee, logoTokopedia, logoTiktok, logoInstagram];

// export default function ConsultWithUs() {
//   const navigate = useNavigate();
//   const categorySectionRef = useRef<HTMLDivElement>(null);

//   const [userData] = useState<any>(() => {
//     const storedUser = localStorage.getItem("user_data");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   const [activeFaq, setActiveFaq] = useState<number | null>(null);

//   const [clinicTreatments, setClinicTreatments] = useState<any[]>([]);
//   const [otcProducts, setOtcProducts] = useState<any[]>([]);
//   const [faqs, setFaqs] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // NOMOR WA ADMIN KLINIK (Ganti dengan nomor asli)
//   const ADMIN_WA_NUMBER = "6289517999768";

//   useEffect(() => {
//     const fetchLandingData = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/landing-page/consult`);
//         if (res.ok) {
//           const data = await res.json();
//           setClinicTreatments(data.treatments || []);
//           setOtcProducts(data.otc_products || []);
//           setFaqs(data.faqs || []);
//         }
//       } catch (e) {
//         console.error(e);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchLandingData();
//   }, []);

//   // --- LOGIKA KONSULTASI (DENGAN REDIRECT WA & UI MEWAH) ---
//   const handleStartConsultation = async (category: string) => {
//     if (!userData) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan login atau daftar terlebih dahulu untuk memulai konsultasi.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#059669",
//         confirmButtonText: "Login Sekarang",
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     const { value: formValues } = await Swal.fire({
//       title: `<span class="text-xl font-extrabold text-gray-900">Konsultasi ${category}</span>`,
//       html: `
//         <div class="text-left mt-4 space-y-4">
//           <div>
//             <label class="block mb-1 text-sm font-bold text-gray-700">Metode Konsultasi</label>
//             <select id="swal-type" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gycora outline-none transition-all">
//               <option value="Chat WhatsApp">Chat WhatsApp</option>
//               <option value="Video Call WhatsApp">Video Call WhatsApp</option>
//             </select>
//           </div>
//           <div>
//             <label class="block mb-1 text-sm font-bold text-gray-700">Pilih Jadwal (Tgl & Waktu)</label>
//             <input type="datetime-local" id="swal-time" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gycora outline-none transition-all" />
//           </div>
//           <div>
//             <label class="block mb-1 text-sm font-bold text-gray-700">Keluhan Singkat</label>
//             <textarea id="swal-notes" rows="3" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gycora outline-none resize-none transition-all" placeholder="Ceritakan detail keluhan Anda (Opsional)..."></textarea>
//           </div>
//         </div>
//       `,
//       customClass: {
//         popup: "rounded-3xl p-6",
//         confirmButton: "rounded-xl px-8 py-3 text-sm tracking-wider font-bold",
//         cancelButton: "rounded-xl px-8 py-3 text-sm font-bold",
//       },
//       focusConfirm: false,
//       showCancelButton: true,
//       confirmButtonText: "Lanjutkan ke WhatsApp",
//       cancelButtonText: "Batal",
//       confirmButtonColor: "#059669",
//       preConfirm: () => {
//         const time = (document.getElementById("swal-time") as HTMLInputElement).value;
//         if (!time) {
//           Swal.showValidationMessage("Harap lengkapi jadwal konsultasi!");
//           return false;
//         }
//         return {
//           type: (document.getElementById("swal-type") as HTMLSelectElement).value,
//           time: time,
//           notes: (document.getElementById("swal-notes") as HTMLTextAreaElement).value,
//         };
//       },
//     });

//     if (formValues) {
//       const token = localStorage.getItem("user_token");
//       try {
//         const res = await fetch(`${BASE_URL}/api/consultation/log`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             category_title: category,
//             consultation_type: formValues.type,
//             consultation_time: formValues.time,
//             notes: formValues.notes,
//           }),
//         });

//         if (res.ok) {
//           const dateFormatted = new Date(formValues.time).toLocaleString("id-ID", { dateStyle: "full", timeStyle: "short" });
//           const waMessage = `Halo Gycora Clinic, saya ${userData.first_name}.\n\nSaya ingin melakukan *${formValues.type}* mengenai keluhan *${category}*.\nJadwal Pengajuan: *${dateFormatted}*\nKeluhan: ${formValues.notes || "-"}\n\nMohon konfirmasinya. Terima kasih.`;
//           const waUrl = `https://wa.me/${ADMIN_WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

//           Swal.fire({
//             title: "Mengalihkan...",
//             text: "Membuka WhatsApp untuk melanjutkan konsultasi Anda.",
//             icon: "success",
//             timer: 2000,
//             showConfirmButton: false,
//           }).then(() => {
//             window.open(waUrl, "_blank");
//           });
//         } else {
//           throw new Error("Gagal mengirim.");
//         }
//       } catch (err) {
//         Swal.fire("Error", "Gagal mengirim permintaan.", "error");
//       }
//     }
//   };

//   // --- LOGIKA JANJI TEMU KLINIK (UI MEWAH) ---
//   const handleBookAppointment = async (treatment: any) => {
//     if (!userData) {
//       Swal.fire("Login Diperlukan", "Silakan login untuk membuat janji temu.", "info");
//       navigate("/login");
//       return;
//     }

//     const { value: formValues } = await Swal.fire({
//       title: `<span class="text-xl font-extrabold text-gray-900">Reservasi Klinik</span>`,
//       html: `
//         <div class="text-left mt-4 space-y-4">
//           <div class="p-4 bg-emerald-50 border border-emerald-100 rounded-xl mb-2">
//             <p class="text-xs text-emerald-600 font-bold uppercase tracking-widest mb-1">Treatment Pilihan</p>
//             <p class="text-sm font-black text-gray-900">${treatment.title}</p>
//           </div>
//           <div>
//             <label class="block mb-1 text-sm font-bold text-gray-700">Pilih Tanggal & Waktu Kedatangan</label>
//             <input id="swal-date" type="datetime-local" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gycora outline-none transition-all" />
//           </div>
//           <div>
//             <label class="block mb-1 text-sm font-bold text-gray-700">Alasan Kunjungan</label>
//             <textarea id="swal-reason" rows="3" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gycora outline-none resize-none transition-all" placeholder="Sebutkan detail keluhan/permintaan Anda..."></textarea>
//           </div>
//         </div>
//       `,
//       customClass: {
//         popup: "rounded-3xl p-6",
//         confirmButton: "rounded-xl px-8 py-3 text-sm tracking-wider font-bold",
//         cancelButton: "rounded-xl px-8 py-3 text-sm font-bold",
//       },
//       showCancelButton: true,
//       confirmButtonText: "Konfirmasi Janji",
//       cancelButtonText: "Batal",
//       confirmButtonColor: "#059669",
//       preConfirm: () => {
//         const time = (document.getElementById("swal-date") as HTMLInputElement).value;
//         const reason = (document.getElementById("swal-reason") as HTMLTextAreaElement).value;
//         if (!time || !reason) {
//           Swal.showValidationMessage("Harap lengkapi tanggal dan alasan.");
//           return false;
//         }
//         return { time, reason };
//       },
//     });

//     if (formValues) {
//       const token = localStorage.getItem("user_token");
//       try {
//         const res = await fetch(`${BASE_URL}/api/clinic/appointment`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             treatment_id: treatment.id,
//             appointment_time: formValues.time,
//             reason: formValues.reason,
//           }),
//         });
//         if (res.ok) {
//           Swal.fire({
//             title: "Sukses",
//             text: "Jadwal Anda telah tercatat. Menunggu konfirmasi admin.",
//             icon: "success",
//             customClass: { popup: "rounded-3xl" },
//           });
//         } else {
//           throw new Error("Gagal membuat janji.");
//         }
//       } catch (err) {
//         Swal.fire("Error", "Gagal membuat janji temu.", "error");
//       }
//     }
//   };

//   const toggleFaq = (index: number) => {
//     setActiveFaq(activeFaq === index ? null : index);
//   };

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(angka || 0);
//   };

//   if (isLoading)
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="w-12 h-12 border-4 rounded-full border-emerald-200 border-t-gycora animate-spin"></div>
//       </div>
//     );

//   return (
//     <div className="pb-20 font-sans bg-gray-50">
//       {/* ================= HERO SECTION TANPA GAMBAR ================= */}
//       {/* [PERBAIKAN] Background diubah menjadi terang/hijau sangat muda */}
//       <div className="relative py-24 md:py-32 bg-[#F4F9F6] overflow-hidden">
//         {/* Ornamen Latar Belakang Lingkaran (Diubah menjadi hijau transparan agar terlihat di background terang) */}
//         <div className="absolute top-0 right-0 -mt-20 -mr-20 bg-[#006A4E] rounded-full pointer-events-none w-96 h-96 opacity-[0.03] blur-3xl"></div>
//         <div className="absolute bottom-0 left-0 -mb-20 -ml-20 bg-[#006A4E] rounded-full pointer-events-none w-80 h-80 opacity-[0.03] blur-2xl"></div>

//         <div className="relative z-10 max-w-4xl px-8 mx-auto text-center md:px-12 animate-fade-in-up">
//           {/* [PERBAIKAN] Warna teks diubah menjadi hijau tua */}
//           <h1 className="text-5xl font-black leading-tight tracking-tight text-[#006A4E] md:text-6xl drop-shadow-sm">
//             Solusi Medis Profesional
//             <br />
//             Untuk Rambut & Kulit.
//           </h1>
//           {/* [PERBAIKAN] Warna teks paragraf diubah menjadi abu-abu/gelap */}
//           <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-600 md:text-xl">
//             Konsultasi gratis secara daring dengan dokter spesialis Gycora dan
//             temukan perawatan terbaik untuk Anda.
//           </p>
//           {/* [PERBAIKAN] Tombol diubah menjadi solid hijau tua dengan teks putih */}
//           <button
//             onClick={() => categorySectionRef.current?.scrollIntoView({ behavior: "smooth" })}
//             className="px-10 py-4 mt-10 font-bold text-white transition-all rounded-full shadow-lg bg-[#006A4E] hover:-translate-y-1 hover:shadow-xl hover:bg-emerald-900"
//           >
//             Pilih Keluhanmu Sekarang
//           </button>
//         </div>
//       </div>

//       {/* ================= KATEGORI KONSULTASI (USER INTERACTION) ================= */}
//       <div ref={categorySectionRef} className="px-6 py-24 mx-auto max-w-7xl lg:px-8">
//         <div className="mb-12 text-center md:text-left md:flex md:items-end md:justify-between">
//           <div>
//             <h2 className="mb-2 text-3xl font-bold text-gray-900">Konsul keluhan sesuai kebutuhan</h2>
//             <p className="text-gray-500">Pilih kondisi dan dapatkan panduan dari dokter ahli.</p>
//           </div>
//           <span className="hidden px-4 py-2 mt-4 text-xs font-bold text-white bg-red-500 rounded-full shadow-md animate-pulse md:inline-block w-max">
//             Konsultasi 100% GRATIS
//           </span>
//         </div>

//         <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
//           {consultationCategories.map((category) => (
//             <div
//               key={category.id}
//               onClick={() => handleStartConsultation(category.title)}
//               className="flex flex-col items-center p-6 text-center transition-all bg-white border border-gray-200 cursor-pointer rounded-3xl hover:border-gycora hover:shadow-xl hover:-translate-y-1 group"
//             >
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-colors border border-gray-100 rounded-full bg-gray-50 group-hover:bg-emerald-50">
//                 {category.icon}
//               </div>
//               <p className="text-sm font-bold text-gray-900 transition-colors group-hover:text-gycora">
//                 {category.title}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ================= SIGNATURE CLINIC TREATMENTS ================= */}
//       <div className="py-24 bg-gray-900">
//         <div className="px-6 mx-auto max-w-7xl lg:px-8">
//           <div className="mb-12">
//             <h2 className="mb-2 text-3xl font-bold text-white">Signature Clinic Treatments</h2>
//             <p className="text-gray-400">Perawatan eksklusif langsung di klinik dengan teknologi mutakhir.</p>
//           </div>

//           <div className="flex gap-6 pb-8 overflow-x-auto snap-x snap-mandatory no-scrollbar">
//             {clinicTreatments.map((t) => (
//               <div key={t.id} className="flex flex-col min-w-[280px] w-[280px] bg-white rounded-3xl overflow-hidden shadow-2xl snap-center shrink-0">
//                 <img src={t.image_url} alt={t.title} className="object-cover w-full bg-gray-100 h-52" />
//                 <div className="flex flex-col flex-1 p-6">
//                   <h4 className="flex-1 mb-2 text-lg font-bold text-gray-900 line-clamp-2">{t.title}</h4>
//                   <p className="mb-6 font-black text-gycora">Rp {parseInt(t.price).toLocaleString("id-ID")}</p>
//                   <button
//                     onClick={() => handleBookAppointment(t)}
//                     className="w-full py-3 font-bold text-white transition-colors bg-gray-900 rounded-xl hover:bg-black"
//                   >
//                     Buat Janji Temu
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ================= OTC / ESSENTIALS PRODUCTS ================= */}
//       <div className="py-24 bg-white border-b border-gray-100">
//         <div className="px-6 mx-auto max-w-7xl lg:px-8">
//           <div className="flex flex-col justify-between gap-4 mb-12 md:flex-row md:items-end">
//             <div>
//               <h2 className="mb-2 text-3xl font-bold text-gray-900">Skip Konsultasi dengan Gycora Essentials</h2>
//               <p className="text-gray-500">Skincare harian (Bebas Beli) yang aman digunakan tanpa resep dokter.</p>
//             </div>
//             <Link to="/products" className="text-sm font-bold transition-colors text-gycora hover:text-gycora-dark">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>

//           <div className="flex gap-6 pb-8 overflow-x-auto snap-x snap-mandatory no-scrollbar">
//             {otcProducts.map((product) => (
//               <div key={product.id} className="flex flex-col min-w-[240px] w-[240px] overflow-hidden transition-colors bg-white border border-gray-200 snap-center shrink-0 rounded-3xl hover:border-gycora group">
//                 <div className="relative flex items-center justify-center p-4 aspect-square bg-gray-50">
//                   <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
//                     PROMO
//                   </div>
//                   <img src={product.image_url || product.image} alt={product.name || product.title} className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105" />
//                 </div>
//                 <div className="flex flex-col flex-1 p-5 border-t border-gray-100">
//                   <h3 className="flex-1 mb-2 text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-gycora">{product.name || product.title}</h3>
//                   <div className="flex items-center gap-2 mb-4">
//                     <span className="text-lg font-black text-gycora">{formatRupiah(product.price)}</span>
//                   </div>
//                   <button
//                     onClick={() => navigate("/products")}
//                     className="w-full py-2.5 text-xs font-bold transition-colors border rounded-xl text-gycora-dark bg-emerald-50 border-emerald-200 hover:bg-gycora hover:text-white"
//                   >
//                     Beli Langsung
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ================= MEDIA COVERAGE / PARTNERS ================= */}
//       <div className="py-12 border-b border-gray-200 bg-gray-50">
//         <div className="px-6 mx-auto max-w-7xl lg:px-8">
//           <h3 className="mb-8 text-sm font-bold tracking-widest text-center text-gray-400 uppercase">Tersedia Juga Di</h3>
//           <div className="flex flex-wrap items-center justify-center gap-8 transition-all duration-500 md:gap-16 opacity-70 grayscale hover:grayscale-0">
//             {mediaLogos.map((logo, idx) => (
//               <img key={idx} src={logo} alt="Partner Logo" className="object-contain h-8 md:h-12" />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ================= FAQ SECTION ================= */}
//       <div className="py-24 bg-white">
//         <div className="max-w-3xl px-6 mx-auto lg:px-8">
//           <div className="mb-12 text-center">
//             <h2 className="mb-4 text-3xl font-extrabold text-gray-900">Kamu Tanya, Kami Jawab</h2>
//             <p className="text-gray-500">Pertanyaan yang paling sering diajukan oleh pelanggan kami.</p>
//           </div>

//           <div className="space-y-4">
//             {faqs.map((faq, index) => (
//               <div key={index} className="overflow-hidden transition-all duration-300 border border-gray-200 rounded-2xl">
//                 <button
//                   onClick={() => toggleFaq(index)}
//                   className="flex items-center justify-between w-full p-5 text-left transition-colors bg-white hover:bg-gray-50 focus:outline-none"
//                 >
//                   <span className="pr-4 text-sm font-bold text-gray-900 md:text-base">{faq.q}</span>
//                   <svg className={`w-5 h-5 text-gycora transform transition-transform duration-300 shrink-0 ${activeFaq === index ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
//                 <div className={`px-5 text-gray-600 text-sm leading-relaxed transition-all duration-300 ease-in-out bg-gray-50 ${activeFaq === index ? "max-h-40 py-5 border-t border-gray-100 opacity-100" : "max-h-0 py-0 opacity-0 pointer-events-none"}`}>
//                   {faq.a}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-12 text-center">
//             <button onClick={() => navigate("/help-center")} className="text-sm font-bold transition-colors text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Pusat Bantuan Lengkap &rarr;
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// const IconAcne = () => (
//   <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// );
// const IconHair = () => (
//   <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//   </svg>
// );
// const IconSkin = () => (
//   <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
//   </svg>
// );
// const IconBeard = () => (
//   <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//   </svg>
// );

// const consultationCategories = [
//   { id: 1, title: "Jerawat Remaja", icon: <IconAcne /> },
//   { id: 2, title: "Jerawat Dewasa", icon: <IconAcne /> },
//   { id: 3, title: "Kebotakan", icon: <IconHair /> },
//   { id: 4, title: "Rambut Rontok", icon: <IconHair /> },
//   { id: 5, title: "Penumbuh Brewok", icon: <IconBeard /> },
//   { id: 6, title: "Kulit Kusam", icon: <IconSkin /> },
//   { id: 7, title: "Bekas Jerawat", icon: <IconAcne /> },
//   { id: 8, title: "Ketombe", icon: <IconHair /> },
// ];

// import logoShopee from "../../assets/shopee.png";
// import logoTokopedia from "../../assets/tokopedia.png";
// import logoTiktok from "../../assets/tiktok.png";
// import logoInstagram from "../../assets/instagram.png";

// const mediaLogos = [logoShopee, logoTokopedia, logoTiktok, logoInstagram];

// export default function ConsultWithUs() {
//   const navigate = useNavigate();
//   const categorySectionRef = useRef<HTMLDivElement>(null);

//   const [userData] = useState<any>(() => {
//     const storedUser = localStorage.getItem("user_data");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   const [activeFaq, setActiveFaq] = useState<number | null>(null);
//   const [clinicTreatments, setClinicTreatments] = useState<any[]>([]);
//   const [otcProducts, setOtcProducts] = useState<any[]>([]);
  
//   // [BARU] Data FAQ yang sudah disaring
//   const [faqs] = useState<any[]>([
//     {
//       q: "Apa itu Ethereal Glow Brush?",
//       a: "Ethereal Glow Brush adalah hairbrush anti-static dengan teknologi konduktif dan molekul karbon yang membantu rambut terasa lebih halus, rapi, dan mudah diatur dalam sekali sisir."
//     },
//     {
//       q: "Apakah bulu sisir Ethereal Glow Brush sakit di kulit kepala?",
//       a: "Tidak. Bulu sisir dirancang fleksibel dan lembut untuk memberikan pengalaman menyisir yang lebih nyaman tanpa rasa sakit atau tarikan berlebih pada rambut."
//     },
//     {
//       q: "Apa manfaat menggunakan Eco Serenity Scalp Care?",
//       a: "Scalp massager membantu membersihkan kulit kepala lebih optimal, membantu mengurangi penumpukan minyak dan kotoran, serta memberikan efek relaksasi yang menenangkan."
//     },
//     {
//       q: "Apakah Eco Serenity bisa digunakan saat rambut kering?",
//       a: "Bisa. Selain saat keramas untuk pembersihan maksimal, Eco Serenity juga sangat nyaman digunakan untuk pijatan relaksasi pada kulit kepala saat rambut dalam kondisi kering."
//     },
//     {
//       q: "Apakah produk Gycora original?",
//       a: "Ya. Seluruh produk yang dijual melalui official store Gycora merupakan produk 100% original dan telah melalui standar kualitas yang ketat."
//     },
//     {
//       q: "Apakah tersedia pengiriman ke seluruh Indonesia?",
//       a: "Ya, Gycora melayani pengiriman ke seluruh wilayah Indonesia menggunakan berbagai pilihan ekspedisi yang tersedia."
//     },
//     {
//       q: "Bagaimana jika produk diterima dalam kondisi rusak?",
//       a: "Silakan hubungi tim customer support kami maksimal 1x24 jam setelah produk diterima dengan menyertakan video unboxing dan foto produk untuk proses klaim."
//     }
//   ]);

//   const [isLoading, setIsLoading] = useState(true);
//   const ADMIN_WA_NUMBER = "6289517999768";

//   useEffect(() => {
//     const fetchLandingData = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/landing-page/consult`);
//         if (res.ok) {
//           const data = await res.json();
//           setClinicTreatments(data.treatments || []);
//           setOtcProducts(data.otc_products || []);
//           // Jika API mengembalikan FAQ, kita bisa menggabungkan atau membiarkan data statis di atas
//           if (data.faqs && data.faqs.length > 0) {
//              // setFaqs(data.faqs); // Opsional: gunakan ini jika ingin FAQ dari database
//           }
//         }
//       } catch (e) {
//         console.error(e);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchLandingData();
//   }, []);

//   const handleStartConsultation = async (category: string) => {
//     if (!userData) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan login atau daftar terlebih dahulu untuk memulai konsultasi.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#059669",
//         confirmButtonText: "Login Sekarang",
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     const { value: formValues } = await Swal.fire({
//       title: `<span class="text-xl font-extrabold text-gray-900">Konsultasi ${category}</span>`,
//       html: `
//         <div class="text-left mt-4 space-y-4">
//           <div>
//             <label class="block mb-1 text-sm font-bold text-gray-700">Metode Konsultasi</label>
//             <select id="swal-type" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gycora outline-none transition-all">
//               <option value="Chat WhatsApp">Chat WhatsApp</option>
//               <option value="Video Call WhatsApp">Video Call WhatsApp</option>
//             </select>
//           </div>
//           <div>
//             <label class="block mb-1 text-sm font-bold text-gray-700">Pilih Jadwal (Tgl & Waktu)</label>
//             <input type="datetime-local" id="swal-time" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gycora outline-none transition-all" />
//           </div>
//           <div>
//             <label class="block mb-1 text-sm font-bold text-gray-700">Keluhan Singkat</label>
//             <textarea id="swal-notes" rows="3" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gycora outline-none resize-none transition-all" placeholder="Ceritakan detail keluhan Anda (Opsional)..."></textarea>
//           </div>
//         </div>
//       `,
//       customClass: {
//         popup: "rounded-3xl p-6",
//         confirmButton: "rounded-xl px-8 py-3 text-sm tracking-wider font-bold",
//         cancelButton: "rounded-xl px-8 py-3 text-sm font-bold",
//       },
//       focusConfirm: false,
//       showCancelButton: true,
//       confirmButtonText: "Lanjutkan ke WhatsApp",
//       cancelButtonText: "Batal",
//       confirmButtonColor: "#059669",
//       preConfirm: () => {
//         const time = (document.getElementById("swal-time") as HTMLInputElement).value;
//         if (!time) {
//           Swal.showValidationMessage("Harap lengkapi jadwal konsultasi!");
//           return false;
//         }
//         return {
//           type: (document.getElementById("swal-type") as HTMLSelectElement).value,
//           time: time,
//           notes: (document.getElementById("swal-notes") as HTMLTextAreaElement).value,
//         };
//       },
//     });

//     if (formValues) {
//       const token = localStorage.getItem("user_token");
//       try {
//         const res = await fetch(`${BASE_URL}/api/consultation/log`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             category_title: category,
//             consultation_type: formValues.type,
//             consultation_time: formValues.time,
//             notes: formValues.notes,
//           }),
//         });

//         if (res.ok) {
//           const dateFormatted = new Date(formValues.time).toLocaleString("id-ID", { dateStyle: "full", timeStyle: "short" });
//           const waMessage = `Halo Gycora Clinic, saya ${userData.first_name}.\n\nSaya ingin melakukan *${formValues.type}* mengenai keluhan *${category}*.\nJadwal Pengajuan: *${dateFormatted}*\nKeluhan: ${formValues.notes || "-"}\n\nMohon konfirmasinya. Terima kasih.`;
//           const waUrl = `https://wa.me/${ADMIN_WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

//           Swal.fire({
//             title: "Mengalihkan...",
//             text: "Membuka WhatsApp untuk melanjutkan konsultasi Anda.",
//             icon: "success",
//             timer: 2000,
//             showConfirmButton: false,
//           }).then(() => {
//             window.open(waUrl, "_blank");
//           });
//         } else {
//           throw new Error("Gagal mengirim.");
//         }
//       } catch (err) {
//         Swal.fire("Error", "Gagal mengirim permintaan.", "error");
//       }
//     }
//   };

//   const handleBookAppointment = async (treatment: any) => {
//     if (!userData) {
//       Swal.fire("Login Diperlukan", "Silakan login untuk membuat janji temu.", "info");
//       navigate("/login");
//       return;
//     }

//     const { value: formValues } = await Swal.fire({
//       title: `<span class="text-xl font-extrabold text-gray-900">Reservasi Klinik</span>`,
//       html: `
//         <div class="text-left mt-4 space-y-4">
//           <div class="p-4 bg-emerald-50 border border-emerald-100 rounded-xl mb-2">
//             <p class="text-xs text-emerald-600 font-bold uppercase tracking-widest mb-1">Treatment Pilihan</p>
//             <p class="text-sm font-black text-gray-900">${treatment.title}</p>
//           </div>
//           <div>
//             <label class="block mb-1 text-sm font-bold text-gray-700">Pilih Tanggal & Waktu Kedatangan</label>
//             <input id="swal-date" type="datetime-local" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gycora outline-none transition-all" />
//           </div>
//           <div>
//             <label class="block mb-1 text-sm font-bold text-gray-700">Alasan Kunjungan</label>
//             <textarea id="swal-reason" rows="3" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gycora outline-none resize-none transition-all" placeholder="Sebutkan detail keluhan/permintaan Anda..."></textarea>
//           </div>
//         </div>
//       `,
//       customClass: {
//         popup: "rounded-3xl p-6",
//         confirmButton: "rounded-xl px-8 py-3 text-sm tracking-wider font-bold",
//         cancelButton: "rounded-xl px-8 py-3 text-sm font-bold",
//       },
//       showCancelButton: true,
//       confirmButtonText: "Konfirmasi Janji",
//       cancelButtonText: "Batal",
//       confirmButtonColor: "#059669",
//       preConfirm: () => {
//         const time = (document.getElementById("swal-date") as HTMLInputElement).value;
//         const reason = (document.getElementById("swal-reason") as HTMLTextAreaElement).value;
//         if (!time || !reason) {
//           Swal.showValidationMessage("Harap lengkapi tanggal dan alasan.");
//           return false;
//         }
//         return { time, reason };
//       },
//     });

//     if (formValues) {
//       const token = localStorage.getItem("user_token");
//       try {
//         const res = await fetch(`${BASE_URL}/api/clinic/appointment`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             treatment_id: treatment.id,
//             appointment_time: formValues.time,
//             reason: formValues.reason,
//           }),
//         });
//         if (res.ok) {
//           Swal.fire({
//             title: "Sukses",
//             text: "Jadwal Anda telah tercatat. Menunggu konfirmasi admin.",
//             icon: "success",
//             customClass: { popup: "rounded-3xl" },
//           });
//         } else {
//           throw new Error("Gagal membuat janji.");
//         }
//       } catch (err) {
//         Swal.fire("Error", "Gagal membuat janji temu.", "error");
//       }
//     }
//   };

//   const toggleFaq = (index: number) => {
//     setActiveFaq(activeFaq === index ? null : index);
//   };

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(angka || 0);
//   };

//   if (isLoading)
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="w-12 h-12 border-4 rounded-full border-emerald-200 border-t-gycora animate-spin"></div>
//       </div>
//     );

//   return (
//     <div className="pb-20 font-sans bg-gray-50">
//       {/* ================= HERO SECTION TANPA GAMBAR ================= */}
//       <div className="relative py-24 md:py-32 bg-[#F4F9F6] overflow-hidden">
//         <div className="absolute top-0 right-0 -mt-20 -mr-20 bg-[#006A4E] rounded-full pointer-events-none w-96 h-96 opacity-[0.03] blur-3xl"></div>
//         <div className="absolute bottom-0 left-0 -mb-20 -ml-20 bg-[#006A4E] rounded-full pointer-events-none w-80 h-80 opacity-[0.03] blur-2xl"></div>

//         <div className="relative z-10 max-w-4xl px-8 mx-auto text-center md:px-12 animate-fade-in-up">
//           <h1 className="text-5xl font-black leading-tight tracking-tight text-[#006A4E] md:text-6xl drop-shadow-sm">
//             Solusi Medis Profesional
//             <br />
//             Untuk Rambut & Kulit.
//           </h1>
//           <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-600 md:text-xl">
//             Konsultasi gratis secara daring dengan dokter spesialis Gycora dan
//             temukan perawatan terbaik untuk Anda.
//           </p>
//           <button
//             onClick={() => categorySectionRef.current?.scrollIntoView({ behavior: "smooth" })}
//             className="px-10 py-4 mt-10 font-bold text-white transition-all rounded-full shadow-lg bg-[#006A4E] hover:-translate-y-1 hover:shadow-xl hover:bg-emerald-900"
//           >
//             Pilih Keluhanmu Sekarang
//           </button>
//         </div>
//       </div>

//       {/* ================= KATEGORI KONSULTASI (USER INTERACTION) ================= */}
//       <div ref={categorySectionRef} className="px-6 py-24 mx-auto max-w-7xl lg:px-8">
//         <div className="mb-12 text-center md:text-left md:flex md:items-end md:justify-between">
//           <div>
//             <h2 className="mb-2 text-3xl font-bold text-gray-900">Konsul keluhan sesuai kebutuhan</h2>
//             <p className="text-gray-500">Pilih kondisi dan dapatkan panduan dari dokter ahli.</p>
//           </div>
//           <span className="hidden px-4 py-2 mt-4 text-xs font-bold text-white bg-red-500 rounded-full shadow-md animate-pulse md:inline-block w-max">
//             Konsultasi 100% GRATIS
//           </span>
//         </div>

//         <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
//           {consultationCategories.map((category) => (
//             <div
//               key={category.id}
//               onClick={() => handleStartConsultation(category.title)}
//               className="flex flex-col items-center p-6 text-center transition-all bg-white border border-gray-200 cursor-pointer rounded-3xl hover:border-gycora hover:shadow-xl hover:-translate-y-1 group"
//             >
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-colors border border-gray-100 rounded-full bg-gray-50 group-hover:bg-emerald-50">
//                 {category.icon}
//               </div>
//               <p className="text-sm font-bold text-gray-900 transition-colors group-hover:text-gycora">
//                 {category.title}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ================= SIGNATURE CLINIC TREATMENTS ================= */}
//       <div className="py-24 bg-gray-900">
//         <div className="px-6 mx-auto max-w-7xl lg:px-8">
//           <div className="mb-12">
//             <h2 className="mb-2 text-3xl font-bold text-white">Signature Clinic Treatments</h2>
//             <p className="text-gray-400">Perawatan eksklusif langsung di klinik dengan teknologi mutakhir.</p>
//           </div>

//           <div className="flex gap-6 pb-8 overflow-x-auto snap-x snap-mandatory no-scrollbar">
//             {clinicTreatments.map((t) => (
//               <div key={t.id} className="flex flex-col min-w-[280px] w-[280px] bg-white rounded-3xl overflow-hidden shadow-2xl snap-center shrink-0">
//                 <img src={t.image_url} alt={t.title} className="object-cover w-full bg-gray-100 h-52" />
//                 <div className="flex flex-col flex-1 p-6">
//                   <h4 className="flex-1 mb-2 text-lg font-bold text-gray-900 line-clamp-2">{t.title}</h4>
//                   <p className="mb-6 font-black text-gycora">Rp {parseInt(t.price).toLocaleString("id-ID")}</p>
//                   <button
//                     onClick={() => handleBookAppointment(t)}
//                     className="w-full py-3 font-bold text-white transition-colors bg-gray-900 rounded-xl hover:bg-black"
//                   >
//                     Buat Janji Temu
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ================= OTC / ESSENTIALS PRODUCTS ================= */}
//       <div className="py-24 bg-white border-b border-gray-100">
//         <div className="px-6 mx-auto max-w-7xl lg:px-8">
//           <div className="flex flex-col justify-between gap-4 mb-12 md:flex-row md:items-end">
//             <div>
//               <h2 className="mb-2 text-3xl font-bold text-gray-900">Skip Konsultasi dengan Gycora Essentials</h2>
//               <p className="text-gray-500">Skincare harian (Bebas Beli) yang aman digunakan tanpa resep dokter.</p>
//             </div>
//             <Link to="/products" className="text-sm font-bold transition-colors text-gycora hover:text-gycora-dark">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>

//           <div className="flex gap-6 pb-8 overflow-x-auto snap-x snap-mandatory no-scrollbar">
//             {otcProducts.map((product) => (
//               <div key={product.id} className="flex flex-col min-w-[240px] w-[240px] overflow-hidden transition-colors bg-white border border-gray-200 snap-center shrink-0 rounded-3xl hover:border-gycora group">
//                 <div className="relative flex items-center justify-center p-4 aspect-square bg-gray-50">
//                   <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
//                     PROMO
//                   </div>
//                   <img src={product.image_url || product.image} alt={product.name || product.title} className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105" />
//                 </div>
//                 <div className="flex flex-col flex-1 p-5 border-t border-gray-100">
//                   <h3 className="flex-1 mb-2 text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-gycora">{product.name || product.title}</h3>
//                   <div className="flex items-center gap-2 mb-4">
//                     <span className="text-lg font-black text-gycora">{formatRupiah(product.price)}</span>
//                   </div>
//                   <button
//                     onClick={() => navigate("/products")}
//                     className="w-full py-2.5 text-xs font-bold transition-colors border rounded-xl text-gycora-dark bg-emerald-50 border-emerald-200 hover:bg-gycora hover:text-white"
//                   >
//                     Beli Langsung
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ================= MEDIA COVERAGE / PARTNERS ================= */}
//       <div className="py-12 border-b border-gray-200 bg-gray-50">
//         <div className="px-6 mx-auto max-w-7xl lg:px-8">
//           <h3 className="mb-8 text-sm font-bold tracking-widest text-center text-gray-400 uppercase">Tersedia Juga Di</h3>
//           <div className="flex flex-wrap items-center justify-center gap-8 transition-all duration-500 md:gap-16 opacity-70 grayscale hover:grayscale-0">
//             {mediaLogos.map((logo, idx) => (
//               <img key={idx} src={logo} alt="Partner Logo" className="object-contain h-8 md:h-12" />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ================= FAQ SECTION ================= */}
//       <div className="py-24 bg-white">
//         <div className="max-w-3xl px-6 mx-auto lg:px-8">
//           <div className="mb-12 text-center">
//             <h2 className="mb-4 text-3xl font-extrabold text-gray-900">Kamu Tanya, Kami Jawab</h2>
//             <p className="text-gray-500">Pertanyaan yang paling sering diajukan oleh pelanggan kami.</p>
//           </div>

//           <div className="space-y-4">
//             {faqs.map((faq, index) => (
//               <div key={index} className="overflow-hidden transition-all duration-300 border border-gray-200 rounded-2xl">
//                 <button
//                   onClick={() => toggleFaq(index)}
//                   className="flex items-center justify-between w-full p-5 text-left transition-colors bg-white hover:bg-gray-50 focus:outline-none"
//                 >
//                   <span className="pr-4 text-sm font-bold text-gray-900 md:text-base">{faq.q}</span>
//                   <svg className={`w-5 h-5 text-gycora transform transition-transform duration-300 shrink-0 ${activeFaq === index ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
//                 <div className={`px-5 text-gray-600 text-sm leading-relaxed transition-all duration-300 ease-in-out bg-gray-50 ${activeFaq === index ? "max-h-40 py-5 border-t border-gray-100 opacity-100" : "max-h-0 py-0 opacity-0 pointer-events-none"}`}>
//                   {faq.a}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-12 text-center">
//             <button onClick={() => navigate("/help-center")} className="text-sm font-bold transition-colors text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Pusat Bantuan Lengkap &rarr;
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

const IconAcne = () => (
  <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const IconHair = () => (
  <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);
const IconSkin = () => (
  <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);
const IconBeard = () => (
  <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const consultationCategories = [
  { id: 1, title: "Jerawat Remaja", icon: <IconAcne /> },
  { id: 2, title: "Jerawat Dewasa", icon: <IconAcne /> },
  { id: 3, title: "Kebotakan", icon: <IconHair /> },
  { id: 4, title: "Rambut Rontok", icon: <IconHair /> },
  { id: 5, title: "Penumbuh Brewok", icon: <IconBeard /> },
  { id: 6, title: "Kulit Kusam", icon: <IconSkin /> },
  { id: 7, title: "Bekas Jerawat", icon: <IconAcne /> },
  { id: 8, title: "Ketombe", icon: <IconHair /> },
];

import logoShopee from "../../assets/shopee.png";
import logoTokopedia from "../../assets/tokopedia.png";
import logoTiktok from "../../assets/tiktok.png";
import logoInstagram from "../../assets/instagram.png";

const mediaLogos = [logoShopee, logoTokopedia, logoTiktok, logoInstagram];

export default function ConsultWithUs() {
  const navigate = useNavigate();
  
  // Refs untuk navigasi scroll
  const categorySectionRef = useRef<HTMLDivElement>(null);
  const storeSectionRef = useRef<HTMLDivElement>(null);

  const [userData] = useState<any>(() => {
    const storedUser = localStorage.getItem("user_data");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [clinicTreatments, setClinicTreatments] = useState<any[]>([]);
  const [otcProducts, setOtcProducts] = useState<any[]>([]);
  
  const [faqs] = useState<any[]>([
    {
      q: "Apa itu Ethereal Glow Brush?",
      a: "Ethereal Glow Brush adalah hairbrush anti-static dengan teknologi konduktif dan molekul karbon yang membantu rambut terasa lebih halus, rapi, dan mudah diatur dalam sekali sisir."
    },
    {
      q: "Apakah bulu sisir Ethereal Glow Brush sakit di kulit kepala?",
      a: "Tidak. Bulu sisir dirancang fleksibel dan lembut untuk memberikan pengalaman menyisir yang lebih nyaman tanpa rasa sakit atau tarikan berlebih pada rambut."
    },
    {
      q: "Apa manfaat menggunakan Eco Serenity Scalp Care?",
      a: "Scalp massager membantu membersihkan kulit kepala lebih optimal, membantu mengurangi penumpukan minyak dan kotoran, serta memberikan efek relaksasi yang menenangkan."
    },
    {
      q: "Apakah Eco Serenity bisa digunakan saat rambut kering?",
      a: "Bisa. Selain saat keramas untuk pembersihan maksimal, Eco Serenity juga sangat nyaman digunakan untuk pijatan relaksasi pada kulit kepala saat rambut dalam kondisi kering."
    },
    {
      q: "Apakah produk Gycora original?",
      a: "Ya. Seluruh produk yang dijual melalui official store Gycora merupakan produk 100% original dan telah melalui standar kualitas yang ketat."
    },
    {
      q: "Apakah tersedia pengiriman ke seluruh Indonesia?",
      a: "Ya, Gycora melayani pengiriman ke seluruh wilayah Indonesia menggunakan berbagai pilihan ekspedisi yang tersedia."
    },
    {
      q: "Bagaimana jika produk diterima dalam kondisi rusak?",
      a: "Silakan hubungi tim customer support kami maksimal 1x24 jam setelah produk diterima dengan menyertakan video unboxing dan foto produk untuk proses klaim."
    }
  ]);

  const [isLoading, setIsLoading] = useState(true);
  const ADMIN_WA_NUMBER = "6289517999768";

  useEffect(() => {
    const fetchLandingData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/landing-page/consult`);
        if (res.ok) {
          const data = await res.json();
          setClinicTreatments(data.treatments || []);
          setOtcProducts(data.otc_products || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLandingData();
  }, []);

  const handleStartConsultation = async (category: string) => {
    if (!userData) {
      Swal.fire({
        title: "Login Diperlukan",
        text: "Silakan login atau daftar terlebih dahulu untuk memulai konsultasi.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#059669",
        confirmButtonText: "Login Sekarang",
      }).then((result) => {
        if (result.isConfirmed) navigate("/login");
      });
      return;
    }

    const { value: formValues } = await Swal.fire({
      title: `<span class="text-xl font-extrabold text-gray-900">Konsultasi ${category}</span>`,
      html: `
        <div class="text-left mt-4 space-y-4">
          <div>
            <label class="block mb-1 text-sm font-bold text-gray-700">Metode Konsultasi</label>
            <select id="swal-type" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gycora outline-none transition-all">
              <option value="Chat WhatsApp">Chat WhatsApp</option>
              <option value="Video Call WhatsApp">Video Call WhatsApp</option>
            </select>
          </div>
          <div>
            <label class="block mb-1 text-sm font-bold text-gray-700">Pilih Jadwal (Tgl & Waktu)</label>
            <input type="datetime-local" id="swal-time" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gycora outline-none transition-all" />
          </div>
          <div>
            <label class="block mb-1 text-sm font-bold text-gray-700">Keluhan Singkat</label>
            <textarea id="swal-notes" rows="3" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gycora outline-none resize-none transition-all" placeholder="Ceritakan detail keluhan Anda (Opsional)..."></textarea>
          </div>
        </div>
      `,
      customClass: {
        popup: "rounded-3xl p-6",
        confirmButton: "rounded-xl px-8 py-3 text-sm tracking-wider font-bold",
        cancelButton: "rounded-xl px-8 py-3 text-sm font-bold",
      },
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Lanjutkan ke WhatsApp",
      cancelButtonText: "Batal",
      confirmButtonColor: "#059669",
      preConfirm: () => {
        const time = (document.getElementById("swal-time") as HTMLInputElement).value;
        if (!time) {
          Swal.showValidationMessage("Harap lengkapi jadwal konsultasi!");
          return false;
        }
        return {
          type: (document.getElementById("swal-type") as HTMLSelectElement).value,
          time: time,
          notes: (document.getElementById("swal-notes") as HTMLTextAreaElement).value,
        };
      },
    });

    if (formValues) {
      const token = localStorage.getItem("user_token");
      try {
        const res = await fetch(`${BASE_URL}/api/consultation/log`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            category_title: category,
            consultation_type: formValues.type,
            consultation_time: formValues.time,
            notes: formValues.notes,
          }),
        });

        if (res.ok) {
          const dateFormatted = new Date(formValues.time).toLocaleString("id-ID", { dateStyle: "full", timeStyle: "short" });
          const waMessage = `Halo Gycora Clinic, saya ${userData.first_name}.\n\nSaya ingin melakukan *${formValues.type}* mengenai keluhan *${category}*.\nJadwal Pengajuan: *${dateFormatted}*\nKeluhan: ${formValues.notes || "-"}\n\nMohon konfirmasinya. Terima kasih.`;
          const waUrl = `https://wa.me/${ADMIN_WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

          Swal.fire({
            title: "Mengalihkan...",
            text: "Membuka WhatsApp untuk melanjutkan konsultasi Anda.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            window.open(waUrl, "_blank");
          });
        } else {
          throw new Error("Gagal mengirim.");
        }
      } catch (err) {
        Swal.fire("Error", "Gagal mengirim permintaan.", "error");
      }
    }
  };

  const handleBookAppointment = async (treatment: any) => {
    if (!userData) {
      Swal.fire("Login Diperlukan", "Silakan login untuk membuat janji temu.", "info");
      navigate("/login");
      return;
    }

    const { value: formValues } = await Swal.fire({
      title: `<span class="text-xl font-extrabold text-gray-900">Reservasi Klinik</span>`,
      html: `
        <div class="text-left mt-4 space-y-4">
          <div class="p-4 bg-emerald-50 border border-emerald-100 rounded-xl mb-2">
            <p class="text-xs text-emerald-600 font-bold uppercase tracking-widest mb-1">Treatment Pilihan</p>
            <p class="text-sm font-black text-gray-900">${treatment.title}</p>
          </div>
          <div>
            <label class="block mb-1 text-sm font-bold text-gray-700">Pilih Tanggal & Waktu Kedatangan</label>
            <input id="swal-date" type="datetime-local" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gycora outline-none transition-all" />
          </div>
          <div>
            <label class="block mb-1 text-sm font-bold text-gray-700">Alasan Kunjungan</label>
            <textarea id="swal-reason" rows="3" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gycora outline-none resize-none transition-all" placeholder="Sebutkan detail keluhan/permintaan Anda..."></textarea>
          </div>
        </div>
      `,
      customClass: {
        popup: "rounded-3xl p-6",
        confirmButton: "rounded-xl px-8 py-3 text-sm tracking-wider font-bold",
        cancelButton: "rounded-xl px-8 py-3 text-sm font-bold",
      },
      showCancelButton: true,
      confirmButtonText: "Konfirmasi Janji",
      cancelButtonText: "Batal",
      confirmButtonColor: "#059669",
      preConfirm: () => {
        const time = (document.getElementById("swal-date") as HTMLInputElement).value;
        const reason = (document.getElementById("swal-reason") as HTMLTextAreaElement).value;
        if (!time || !reason) {
          Swal.showValidationMessage("Harap lengkapi tanggal dan alasan.");
          return false;
        }
        return { time, reason };
      },
    });

    if (formValues) {
      const token = localStorage.getItem("user_token");
      try {
        const res = await fetch(`${BASE_URL}/api/clinic/appointment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            treatment_id: treatment.id,
            appointment_time: formValues.time,
            reason: formValues.reason,
          }),
        });
        if (res.ok) {
          Swal.fire({
            title: "Sukses",
            text: "Jadwal Anda telah tercatat. Menunggu konfirmasi admin.",
            icon: "success",
            customClass: { popup: "rounded-3xl" },
          });
        } else {
          throw new Error("Gagal membuat janji.");
        }
      } catch (err) {
        Swal.fire("Error", "Gagal membuat janji temu.", "error");
      }
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka || 0);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 rounded-full border-emerald-200 border-t-gycora animate-spin"></div>
      </div>
    );

  return (
    <div className="pb-20 font-sans bg-white">
      
      {/* ================= SECTION 1: HEADING (HERO) ================= */}
      <div className="relative py-20 md:py-32 bg-[#F4F9F6] overflow-hidden border-b border-gray-100">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 bg-[#006A4E] rounded-full pointer-events-none w-96 h-96 opacity-[0.03] blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 bg-[#006A4E] rounded-full pointer-events-none w-80 h-80 opacity-[0.03] blur-2xl"></div>

        <div className="relative z-10 max-w-4xl px-6 mx-auto text-center lg:px-8 animate-fade-in-up">
          <h1 className="text-4xl font-black leading-tight tracking-tight text-[#006A4E] sm:text-5xl md:text-6xl drop-shadow-sm">
            Perawatan yang Tepat Dimulai dari Konsultasi yang Nyaman
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-base text-gray-600 md:text-xl">
            Cerita tentang kebutuhan rambutmu dan biarkan tim Gycora membantu menemukan solusi yang paling sesuai untuk rutinitas harianmu.
          </p>
        </div>
      </div>

      {/* ================= SECTION 3: RELATABLE PROBLEM ================= */}
      <div className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-4xl px-6 mx-auto text-center lg:px-8">
          <h2 className="mb-6 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
            Kami Paham, Kadang Sulit Menentukan Produk yang Cocok
          </h2>
          <div className="space-y-4 text-base text-gray-600 md:text-lg">
            <p>
              Setiap orang punya kebutuhan rambut yang berbeda.
            </p>
            <p>
              Mulai dari rambut mudah kusut, sulit diatur, kulit kepala berminyak, hingga rutinitas yang padat dan nggak punya banyak waktu untuk styling.
            </p>
            <p className="font-medium text-gray-900">
              Karena itu, kami hadir untuk membantu kamu menemukan solusi yang lebih sesuai dan nyaman digunakan setiap hari.
            </p>
          </div>
        </div>
      </div>

      {/* ================= SECTION 2: PILIH KONSULTASI ================= */}
      <div className="py-24 border-b border-gray-100 bg-gray-50">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Pilih Cara Konsultasi yang Paling Nyaman
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Card Konsultasi Online */}
            <div className="flex flex-col h-full p-8 transition-shadow bg-white border border-gray-200 shadow-sm rounded-3xl hover:shadow-md">
              <h3 className="mb-4 text-2xl font-extrabold text-[#006A4E]">
                Konsultasi Online
              </h3>
              <p className="flex-grow mb-8 leading-relaxed text-gray-600">
                Konsultasikan kondisi rambut dan kulit kepala secara online dengan tim Gycora tanpa perlu datang langsung. Praktis, cepat, dan bisa dilakukan dari mana aja.
              </p>
              <button
                onClick={() => categorySectionRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="w-full py-4 text-sm font-bold tracking-widest text-white uppercase transition-all shadow-lg rounded-xl bg-[#006A4E] hover:-translate-y-0.5 hover:shadow-xl hover:bg-emerald-900"
              >
                Mulai Konsultasi Online
              </button>
            </div>

            {/* Card Visit In Store */}
            <div className="flex flex-col h-full p-8 transition-shadow bg-white border border-gray-200 shadow-sm rounded-3xl hover:shadow-md">
              <h3 className="mb-4 text-2xl font-extrabold text-[#006A4E]">
                Visit In Store
              </h3>
              <p className="flex-grow mb-8 leading-relaxed text-gray-600">
                Coba langsung produk favorit Gycora dan dapatkan pengalaman konsultasi secara langsung di booth atau store kami. Lebih personal dan nyaman untuk eksplor kebutuhanmu.
              </p>
              <button
                onClick={() => storeSectionRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="w-full py-4 text-sm font-bold tracking-widest uppercase transition-all bg-transparent border-2 rounded-xl text-[#006A4E] border-[#006A4E] hover:bg-[#006A4E] hover:text-white"
              >
                Lihat Lokasi Store
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SECTION 4: WHAT YOU CAN CONSULT (CATEGORIES) ================= */}
      <div ref={categorySectionRef} className="px-6 py-24 mx-auto bg-white border-b border-gray-100 max-w-7xl lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Kamu Bisa Konsultasi Tentang:
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {consultationCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleStartConsultation(category.title)}
              className="flex flex-col items-center p-6 text-center transition-all border border-gray-100 cursor-pointer bg-gray-50 rounded-3xl hover:border-gycora hover:bg-white hover:shadow-xl hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-colors bg-white border border-gray-100 rounded-full group-hover:bg-emerald-50">
                {category.icon}
              </div>
              <p className="text-sm font-bold text-gray-900 transition-colors group-hover:text-gycora">
                {category.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= SIGNATURE CLINIC TREATMENTS ================= */}
      <div ref={storeSectionRef} className="py-24 bg-gray-900">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="mb-12">
            <h2 className="mb-2 text-3xl font-bold text-white">Signature Clinic Treatments</h2>
            <p className="text-gray-400">Perawatan eksklusif langsung di klinik dengan teknologi mutakhir.</p>
          </div>

          <div className="flex gap-6 pb-8 overflow-x-auto snap-x snap-mandatory no-scrollbar">
            {clinicTreatments.map((t) => (
              <div key={t.id} className="flex flex-col min-w-[280px] w-[280px] bg-white rounded-3xl overflow-hidden shadow-2xl snap-center shrink-0">
                <img src={t.image_url} alt={t.title} className="object-cover w-full bg-gray-100 h-52" />
                <div className="flex flex-col flex-1 p-6">
                  <h4 className="flex-1 mb-2 text-lg font-bold text-gray-900 line-clamp-2">{t.title}</h4>
                  <p className="mb-6 font-black text-gycora">Rp {parseInt(t.price).toLocaleString("id-ID")}</p>
                  <button
                    onClick={() => handleBookAppointment(t)}
                    className="w-full py-3 font-bold text-white transition-colors bg-gray-900 rounded-xl hover:bg-black"
                  >
                    Buat Janji Temu
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= OTC / ESSENTIALS PRODUCTS ================= */}
      <div className="py-24 bg-white border-b border-gray-100">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="flex flex-col justify-between gap-4 mb-12 md:flex-row md:items-end">
            <div>
              <h2 className="mb-2 text-3xl font-bold text-gray-900">Skip Konsultasi dengan Gycora Essentials</h2>
              <p className="text-gray-500">Skincare harian (Bebas Beli) yang aman digunakan tanpa resep dokter.</p>
            </div>
            <Link to="/products" className="text-sm font-bold transition-colors text-gycora hover:text-gycora-dark">
              Lihat Semua Produk &rarr;
            </Link>
          </div>

          <div className="flex gap-6 pb-8 overflow-x-auto snap-x snap-mandatory no-scrollbar">
            {otcProducts.map((product) => (
              <div key={product.id} className="flex flex-col min-w-[240px] w-[240px] overflow-hidden transition-colors bg-white border border-gray-200 snap-center shrink-0 rounded-3xl hover:border-gycora group">
                <div className="relative flex items-center justify-center p-4 aspect-square bg-gray-50">
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                    PROMO
                  </div>
                  <img src={product.image_url || product.image} alt={product.name || product.title} className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-col flex-1 p-5 border-t border-gray-100">
                  <h3 className="flex-1 mb-2 text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-gycora">{product.name || product.title}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-black text-gycora">{formatRupiah(product.price)}</span>
                  </div>
                  <button
                    onClick={() => navigate("/products")}
                    className="w-full py-2.5 text-xs font-bold transition-colors border rounded-xl text-gycora-dark bg-emerald-50 border-emerald-200 hover:bg-gycora hover:text-white"
                  >
                    Beli Langsung
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= MEDIA COVERAGE / PARTNERS ================= */}
      <div className="py-12 border-b border-gray-200 bg-gray-50">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <h3 className="mb-8 text-sm font-bold tracking-widest text-center text-gray-400 uppercase">Tersedia Juga Di</h3>
          <div className="flex flex-wrap items-center justify-center gap-8 transition-all duration-500 md:gap-16 opacity-70 grayscale hover:grayscale-0">
            {mediaLogos.map((logo, idx) => (
              <img key={idx} src={logo} alt="Partner Logo" className="object-contain h-8 md:h-12" />
            ))}
          </div>
        </div>
      </div>

      {/* ================= FAQ SECTION ================= */}
      <div className="py-24 bg-white">
        <div className="max-w-3xl px-6 mx-auto lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-extrabold text-gray-900">Kamu Tanya, Kami Jawab</h2>
            <p className="text-gray-500">Pertanyaan yang paling sering diajukan oleh pelanggan kami.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="overflow-hidden transition-all duration-300 border border-gray-200 rounded-2xl">
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex items-center justify-between w-full p-5 text-left transition-colors bg-white hover:bg-gray-50 focus:outline-none"
                >
                  <span className="pr-4 text-sm font-bold text-gray-900 md:text-base">{faq.q}</span>
                  <svg className={`w-5 h-5 text-gycora transform transition-transform duration-300 shrink-0 ${activeFaq === index ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`px-5 text-gray-600 text-sm leading-relaxed transition-all duration-300 ease-in-out bg-gray-50 ${activeFaq === index ? "max-h-40 py-5 border-t border-gray-100 opacity-100" : "max-h-0 py-0 opacity-0 pointer-events-none"}`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button onClick={() => navigate("/help-center")} className="text-sm font-bold transition-colors text-gycora hover:text-gycora-dark hover:underline">
              Lihat Pusat Bantuan Lengkap &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* ================= SECTION 5: CTA (CLOSING) ================= */}
      <div className="relative py-24 overflow-hidden bg-gray-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gycora rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

        <div className="relative max-w-4xl px-6 mx-auto text-center lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
            Mulai Konsultasi dengan Gycora ✨
          </h2>
          <p className="mt-6 mb-10 text-lg leading-relaxed text-gray-400">
            Karena self-care terasa lebih nyaman ketika kamu tahu apa yang benar-benar dibutuhkan rambutmu.
          </p>
          <button
            onClick={() => categorySectionRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5"
          >
            Hubungi Kami Sekarang
          </button>
        </div>
      </div>
      
    </div>
  );
}