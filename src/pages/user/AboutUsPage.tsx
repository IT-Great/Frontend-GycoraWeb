// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// export default function AboutUsPage() {
//   const location = useLocation();

//   // Efek untuk melompat (scroll) ke bagian tertentu berdasarkan hash di URL
//   useEffect(() => {
//     if (location.hash) {
//       const element = document.getElementById(location.hash.substring(1));
//       if (element) {
//         // Timeout kecil memastikan render selesai sebelum scroll
//         setTimeout(() => {
//           element.scrollIntoView({ behavior: "smooth", block: "start" });
//         }, 100);
//       }
//     } else {
//       window.scrollTo(0, 0);
//     }
//   }, [location]);

//   return (
//     <div className="min-h-screen pb-24 font-sans bg-white">
//       {/* HEADER SECTION */}
//       <div className="bg-[#F4F9F6] py-24 text-center px-4">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-4xl md:text-6xl font-extrabold text-[#006A4E] mb-6 tracking-tight">
//             Tentang Gycora
//           </h1>
//           <p className="max-w-2xl mx-auto text-lg leading-relaxed text-gray-600 md:text-xl">
//             Kami percaya bahwa self-care bukan sekadar rutinitas, tapi bentuk perhatian kecil untuk diri sendiri di tengah aktivitas yang padat.
//           </p>
//           <p className="max-w-2xl mx-auto mt-4 text-lg leading-relaxed text-gray-600 md:text-xl">
//             Karena tampil rapi dan merasa nyaman dengan diri sendiri seharusnya bisa terasa lebih mudah, praktis, dan tetap bermakna.
//           </p>
//         </div>
//       </div>

//       <div className="max-w-4xl px-4 mx-auto mt-20 space-y-32 sm:px-6 lg:px-8">
        
//         {/* WHO WE ARE */}
//         <section className="scroll-mt-32" id="who-we-are">
//           <h2 className="mb-4 text-sm font-bold tracking-widest text-gray-400 uppercase">WHO WE ARE</h2>
//           <h3 className="mb-6 text-3xl font-extrabold text-gray-900">
//             Beauty Essentials yang Dirancang untuk Kehidupan Sehari-Hari
//           </h3>
//           <div className="prose prose-lg text-gray-600 max-w-none">
//             <p>
//               Gycora menghadirkan produk perawatan rambut berbasis inovasi modern yang membantu rutinitas harian terasa lebih praktis dan nyaman.
//             </p>
//             <p>
//               Mulai dari hairbrush anti-static hingga scalp care yang dirancang untuk penggunaan sehari-hari, setiap produk dibuat untuk membantu kamu tampil lebih rapi tanpa effort berlebih.
//             </p>
//           </div>
//         </section>

//         {/* OUR STORY */}
//         <section className="scroll-mt-32" id="our-story">
//           <h2 className="mb-4 text-sm font-bold tracking-widest text-gray-400 uppercase">OUR STORY</h2>
//           <h3 className="mb-6 text-3xl font-extrabold text-gray-900">
//             Berawal dari Hal Sederhana: Keinginan untuk Membuat Self-Care Terasa Lebih Mudah
//           </h3>
//           <div className="prose prose-lg text-gray-600 max-w-none">
//             <p>
//               Di tengah aktivitas yang terus berjalan, kami sadar bahwa tidak semua orang punya banyak waktu untuk styling atau perawatan yang rumit.
//             </p>
//             <p>
//               Tapi di saat yang sama, rasa percaya diri sering datang dari hal-hal kecil — seperti rambut yang terasa lebih rapi, nyaman, dan mudah diatur.
//             </p>
//             <p>
//               Dari situlah Gycora lahir.
//             </p>
//             <p>
//               Kami ingin menghadirkan produk yang bukan hanya terlihat baik, tetapi juga benar-benar membantu keseharian penggunanya.
//             </p>
//           </div>
//         </section>

//         {/* WHY GYCORA (OUR PURPOSE) */}
//         <section className="scroll-mt-32" id="our-purpose">
//           <h2 className="mb-4 text-sm font-bold tracking-widest text-gray-400 uppercase">WHY GYCORA</h2>
//           <h3 className="mb-10 text-3xl font-extrabold text-gray-900">Kenapa Gycora?</h3>
          
//           <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
//             <div>
//               <h4 className="flex items-center gap-2 mb-3 text-xl font-bold text-gray-900">
//                 <span>✨</span> Practical Beauty
//               </h4>
//               <p className="text-gray-600">Produk yang dirancang untuk rutinitas harian yang cepat dan praktis.</p>
//             </div>
//             <div>
//               <h4 className="flex items-center gap-2 mb-3 text-xl font-bold text-gray-900">
//                 <span>✨</span> Modern Innovation
//               </h4>
//               <p className="text-gray-600">Menggunakan teknologi modern untuk membantu rambut lebih mudah diatur dan nyaman digunakan setiap hari.</p>
//             </div>
//             <div>
//               <h4 className="flex items-center gap-2 mb-3 text-xl font-bold text-gray-900">
//                 <span>✨</span> Thoughtfully Designed
//               </h4>
//               <p className="text-gray-600">Dibuat dengan desain yang nyaman digunakan sekaligus tetap estetis.</p>
//             </div>
//             <div>
//               <h4 className="flex items-center gap-2 mb-3 text-xl font-bold text-gray-900">
//                 <span>✨</span> More Conscious Choice
//               </h4>
//               <p className="text-gray-600">Menggunakan material yang lebih ramah lingkungan sebagai langkah kecil menuju perawatan yang lebih bertanggung jawab.</p>
//             </div>
//           </div>
//         </section>

//         {/* INNOVATION & SUSTAINABILITY */}
//         <section className="scroll-mt-32" id="our-innovation">
//           <h2 className="mb-4 text-sm font-bold tracking-widest text-gray-400 uppercase">INNOVATION & SUSTAINABILITY</h2>
//           <h3 className="mb-6 text-3xl font-extrabold text-gray-900">
//             Inovasi yang Tetap Peduli pada Lingkungan
//           </h3>
//           <div className="prose prose-lg text-gray-600 max-w-none">
//             <p>
//               Kami percaya bahwa inovasi tidak hanya soal hasil, tapi juga tentang bagaimana sebuah produk dibuat dengan lebih bijak.
//             </p>
//             <p>
//               Karena itu, Gycora terus berupaya menghadirkan produk dengan material yang lebih ramah lingkungan dan desain yang dibuat untuk penggunaan jangka panjang.
//             </p>
//             <p>
//               Langkah kecil yang kami percaya bisa membawa dampak lebih baik untuk masa depan.
//             </p>
//           </div>
//         </section>

//         {/* VISION & MISSION */}
//         <section className="p-10 bg-emerald-50 rounded-3xl lg:p-16 scroll-mt-32" id="vision-mission">
//           <h2 className="mb-8 text-sm font-bold tracking-widest uppercase text-emerald-800">VISION & MISSION</h2>
          
//           <div className="mb-12">
//             <h3 className="mb-4 text-2xl font-bold text-gray-900">Visi Kami</h3>
//             <p className="text-lg text-gray-700">
//               Menjadi beauty brand modern yang menghadirkan produk praktis, inovatif, dan lebih mindful untuk mendukung rutinitas self-care sehari-hari.
//             </p>
//           </div>

//           <div>
//             <h3 className="mb-4 text-2xl font-bold text-gray-900">Misi Kami</h3>
//             <ul className="pl-4 space-y-3 text-lg text-gray-700 list-disc list-inside">
//               <li>Menghadirkan produk yang nyaman dan efektif digunakan setiap hari</li>
//               <li>Menggabungkan inovasi modern dengan desain yang thoughtful</li>
//               <li>Mendukung pilihan perawatan yang lebih conscious dan berkelanjutan</li>
//               <li>Membantu lebih banyak orang merasa nyaman dan percaya diri dengan dirinya sendiri</li>
//             </ul>
//           </div>
//         </section>

//         {/* CLOSING SECTION */}
//         <section className="pt-10 text-center border-t border-gray-100">
//           <h2 className="mb-4 text-sm font-bold tracking-widest text-gray-400 uppercase">CLOSING SECTION</h2>
//           <h3 className="text-3xl md:text-4xl font-extrabold text-[#006A4E] mb-6">
//             Self-Care yang Lebih Simpel, untuk Hari-Hari yang Lebih Nyaman
//           </h3>
//           <p className="mb-4 text-xl text-gray-600">
//             Karena kami percaya, rasa percaya diri sering dimulai dari perhatian kecil untuk diri sendiri.
//           </p>
//           <p className="text-xl font-medium text-gray-900">
//             Dan Gycora ingin menjadi bagian dari perjalanan itu 🤍
//           </p>
//         </section>

//       </div>
//     </div>
//   );
// }

// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { useLanguage } from "../../context/LanguageContext"; // [BARU] Import Context Bahasa

// export default function AboutUsPage() {
//   const location = useLocation();
//   const { t } = useLanguage(); // [BARU] Inisialisasi fungsi penerjemah t()

//   // Efek untuk melompat (scroll) ke bagian tertentu berdasarkan hash di URL
//   useEffect(() => {
//     if (location.hash) {
//       const element = document.getElementById(location.hash.substring(1));
//       if (element) {
//         // Timeout kecil memastikan render selesai sebelum scroll
//         setTimeout(() => {
//           element.scrollIntoView({ behavior: "smooth", block: "start" });
//         }, 100);
//       }
//     } else {
//       window.scrollTo(0, 0);
//     }
//   }, [location]);

//   return (
//     <div className="min-h-screen pb-24 font-sans bg-white">
//       {/* HEADER SECTION */}
//       <div className="bg-[#F4F9F6] py-24 text-center px-4">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-4xl md:text-6xl font-extrabold text-[#006A4E] mb-6 tracking-tight">
//             {t("about_header_title")}
//           </h1>
//           <p className="max-w-2xl mx-auto text-lg leading-relaxed text-gray-600 md:text-xl">
//             {t("about_header_desc1")}
//           </p>
//           <p className="max-w-2xl mx-auto mt-4 text-lg leading-relaxed text-gray-600 md:text-xl">
//             {t("about_header_desc2")}
//           </p>
//         </div>
//       </div>

//       <div className="max-w-4xl px-4 mx-auto mt-20 space-y-32 sm:px-6 lg:px-8">
        
//         {/* WHO WE ARE */}
//         <section className="scroll-mt-32" id="who-we-are">
//           <h2 className="mb-4 text-sm font-bold tracking-widest text-gray-400 uppercase">{t("about_who_we_are_label")}</h2>
//           <h3 className="mb-6 text-3xl font-extrabold text-gray-900">
//             {t("about_who_we_are_title")}
//           </h3>
//           <div className="prose prose-lg text-gray-600 max-w-none">
//             <p>
//               {t("about_who_we_are_p1")}
//             </p>
//             <p>
//               {t("about_who_we_are_p2")}
//             </p>
//           </div>
//         </section>

//         {/* OUR STORY */}
//         <section className="scroll-mt-32" id="our-story">
//           <h2 className="mb-4 text-sm font-bold tracking-widest text-gray-400 uppercase">{t("about_our_story_label")}</h2>
//           <h3 className="mb-6 text-3xl font-extrabold text-gray-900">
//             {t("about_our_story_title")}
//           </h3>
//           <div className="prose prose-lg text-gray-600 max-w-none">
//             <p>
//               {t("about_our_story_p1")}
//             </p>
//             <p>
//               {t("about_our_story_p2")}
//             </p>
//             <p>
//               {t("about_our_story_p3")}
//             </p>
//             <p>
//               {t("about_our_story_p4")}
//             </p>
//           </div>
//         </section>

//         {/* WHY GYCORA (OUR PURPOSE) */}
//         <section className="scroll-mt-32" id="our-purpose">
//           <h2 className="mb-4 text-sm font-bold tracking-widest text-gray-400 uppercase">{t("about_why_label")}</h2>
//           <h3 className="mb-10 text-3xl font-extrabold text-gray-900">{t("about_why_title")}</h3>
          
//           <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
//             <div>
//               <h4 className="flex items-center gap-2 mb-3 text-xl font-bold text-gray-900">
//                 <span>✨</span> {t("about_purpose1_title")}
//               </h4>
//               <p className="text-gray-600">{t("about_purpose1_desc")}</p>
//             </div>
//             <div>
//               <h4 className="flex items-center gap-2 mb-3 text-xl font-bold text-gray-900">
//                 <span>✨</span> {t("about_purpose2_title")}
//               </h4>
//               <p className="text-gray-600">{t("about_purpose2_desc")}</p>
//             </div>
//             <div>
//               <h4 className="flex items-center gap-2 mb-3 text-xl font-bold text-gray-900">
//                 <span>✨</span> {t("about_purpose3_title")}
//               </h4>
//               <p className="text-gray-600">{t("about_purpose3_desc")}</p>
//             </div>
//             <div>
//               <h4 className="flex items-center gap-2 mb-3 text-xl font-bold text-gray-900">
//                 <span>✨</span> {t("about_purpose4_title")}
//               </h4>
//               <p className="text-gray-600">{t("about_purpose4_desc")}</p>
//             </div>
//           </div>
//         </section>

//         {/* INNOVATION & SUSTAINABILITY */}
//         <section className="scroll-mt-32" id="our-innovation">
//           <h2 className="mb-4 text-sm font-bold tracking-widest text-gray-400 uppercase">{t("about_innov_label")}</h2>
//           <h3 className="mb-6 text-3xl font-extrabold text-gray-900">
//             {t("about_innov_title")}
//           </h3>
//           <div className="prose prose-lg text-gray-600 max-w-none">
//             <p>
//               {t("about_innov_p1")}
//             </p>
//             <p>
//               {t("about_innov_p2")}
//             </p>
//             <p>
//               {t("about_innov_p3")}
//             </p>
//           </div>
//         </section>

//         {/* VISION & MISSION */}
//         <section className="p-10 bg-emerald-50 rounded-3xl lg:p-16 scroll-mt-32" id="vision-mission">
//           <h2 className="mb-8 text-sm font-bold tracking-widest uppercase text-emerald-800">{t("about_vm_label")}</h2>
          
//           <div className="mb-12">
//             <h3 className="mb-4 text-2xl font-bold text-gray-900">{t("about_vision_title")}</h3>
//             <p className="text-lg text-gray-700">
//               {t("about_vision_desc")}
//             </p>
//           </div>

//           <div>
//             <h3 className="mb-4 text-2xl font-bold text-gray-900">{t("about_mission_title")}</h3>
//             <ul className="pl-4 space-y-3 text-lg text-gray-700 list-disc list-inside">
//               <li>{t("about_mission_item1")}</li>
//               <li>{t("about_mission_item2")}</li>
//               <li>{t("about_mission_item3")}</li>
//               <li>{t("about_mission_item4")}</li>
//             </ul>
//           </div>
//         </section>

//         {/* CLOSING SECTION */}
//         <section className="pt-10 text-center border-t border-gray-100">
//           <h2 className="mb-4 text-sm font-bold tracking-widest text-gray-400 uppercase">{t("about_closing_label")}</h2>
//           <h3 className="text-3xl md:text-4xl font-extrabold text-[#006A4E] mb-6">
//             {t("about_closing_title")}
//           </h3>
//           <p className="mb-4 text-xl text-gray-600">
//             {t("about_closing_p1")}
//           </p>
//           <p className="text-xl font-medium text-gray-900">
//             {t("about_closing_p2")}
//           </p>
//         </section>

//       </div>
//     </div>
//   );
// }

// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { useLanguage } from "../../context/LanguageContext";

// export default function AboutUsPage() {
//   const location = useLocation();
//   const { t } = useLanguage();

//   useEffect(() => {
//     if (location.hash) {
//       const element = document.getElementById(location.hash.substring(1));
//       if (element) {
//         setTimeout(() => {
//           element.scrollIntoView({ behavior: "smooth", block: "start" });
//         }, 100);
//       }
//     } else {
//       window.scrollTo(0, 0);
//     }
//   }, [location]);

//   return (
//     <div className="min-h-screen pb-24 overflow-hidden font-sans bg-white">
      
//       {/* ================= HEADER SECTION (HERO) ================= */}
//       <div className="relative bg-[#006A4E] py-32 text-center px-4 overflow-hidden">
//         {/* Dekorasi Latar Belakang */}
//         <div className="absolute top-0 left-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 mix-blend-multiply filter blur-3xl opacity-30"></div>
//         <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#D4FF32] rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/3 translate-y-1/3"></div>
        
//         <div className="relative z-10 max-w-4xl mx-auto animate-fade-in-up">
//           <h1 className="mb-6 text-4xl font-black tracking-tight text-white md:text-6xl drop-shadow-sm">
//             {t("about_header_title")}
//           </h1>
//           <p className="max-w-2xl mx-auto text-lg font-medium leading-relaxed text-emerald-50 md:text-xl">
//             {t("about_header_desc1")}
//           </p>
//           <p className="max-w-2xl mx-auto mt-4 text-lg leading-relaxed text-emerald-100 md:text-xl">
//             {t("about_header_desc2")}
//           </p>
//         </div>
//       </div>

//       <div className="max-w-6xl px-4 mx-auto mt-24 space-y-32 sm:px-6 lg:px-8">
        
//         {/* ================= WHO WE ARE (Teks Kiri, Gambar Kanan) ================= */}
//         <section className="flex flex-col items-center gap-16 scroll-mt-32 lg:flex-row" id="who-we-are">
//           <div className="lg:w-1/2 animate-fade-in-left">
//             <h2 className="mb-4 text-sm font-bold tracking-widest text-[#006A4E] uppercase flex items-center gap-2">
//               <span className="w-8 h-0.5 bg-[#006A4E]"></span>
//               {t("about_who_we_are_label")}
//             </h2>
//             <h3 className="mb-6 text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl">
//               {t("about_who_we_are_title")}
//             </h3>
//             <div className="prose prose-lg text-gray-600 max-w-none">
//               <p>{t("about_who_we_are_p1")}</p>
//               <p>{t("about_who_we_are_p2")}</p>
//             </div>
//           </div>
//           <div className="relative lg:w-1/2">
//             <div className="absolute inset-0 translate-x-4 translate-y-4 bg-emerald-100 rounded-3xl -z-10"></div>
//             <img 
//               src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop" 
//               alt="Who we are" 
//               className="w-full h-[400px] object-cover rounded-3xl shadow-xl border border-gray-100"
//             />
//           </div>
//         </section>

//         {/* ================= OUR STORY (Gambar Kiri, Teks Kanan) ================= */}
//         <section className="flex flex-col-reverse items-center gap-16 scroll-mt-32 lg:flex-row" id="our-story">
//           <div className="relative lg:w-1/2">
//             <div className="absolute inset-0 -translate-x-4 translate-y-4 bg-gray-100 rounded-3xl -z-10"></div>
//             <img 
//               src="https://images.unsplash.com/photo-1596462502278-27bf85033e5a?q=80&w=800&auto=format&fit=crop" 
//               alt="Our Story" 
//               className="w-full h-[450px] object-cover rounded-3xl shadow-lg border border-gray-100"
//             />
//           </div>
//           <div className="lg:w-1/2 animate-fade-in-right">
//             <h2 className="mb-4 text-sm font-bold tracking-widest text-[#006A4E] uppercase flex items-center gap-2">
//               {t("about_our_story_label")}
//               <span className="w-8 h-0.5 bg-[#006A4E]"></span>
//             </h2>
//             <h3 className="mb-6 text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl">
//               {t("about_our_story_title")}
//             </h3>
//             <div className="space-y-4 text-lg text-gray-600">
//               <p>{t("about_our_story_p1")}</p>
//               <p>{t("about_our_story_p2")}</p>
//               <p className="font-bold text-gray-900 border-l-4 border-[#006A4E] pl-4 my-6 italic">
//                 {t("about_our_story_p3")}
//               </p>
//               <p>{t("about_our_story_p4")}</p>
//             </div>
//           </div>
//         </section>

//         {/* ================= WHY GYCORA (OUR PURPOSE) ================= */}
//         <section className="scroll-mt-32 bg-[#F9FAF9] rounded-[3rem] p-10 md:p-16 border border-emerald-50" id="our-purpose">
//           <div className="mb-16 text-center">
//             <h2 className="mb-4 text-sm font-bold tracking-widest text-[#006A4E] uppercase inline-block border-b-2 border-[#006A4E] pb-1">
//               {t("about_why_label")}
//             </h2>
//             <h3 className="text-3xl font-black text-gray-900 md:text-4xl">{t("about_why_title")}</h3>
//           </div>
          
//           <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
//             <div className="p-8 transition-shadow bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-md">
//               <div className="w-12 h-12 bg-emerald-100 text-[#006A4E] rounded-full flex items-center justify-center mb-6 text-xl">✨</div>
//               <h4 className="mb-3 text-xl font-bold text-gray-900">{t("about_purpose1_title")}</h4>
//               <p className="leading-relaxed text-gray-600">{t("about_purpose1_desc")}</p>
//             </div>
//             <div className="p-8 transition-shadow bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-md">
//               <div className="w-12 h-12 bg-emerald-100 text-[#006A4E] rounded-full flex items-center justify-center mb-6 text-xl">💡</div>
//               <h4 className="mb-3 text-xl font-bold text-gray-900">{t("about_purpose2_title")}</h4>
//               <p className="leading-relaxed text-gray-600">{t("about_purpose2_desc")}</p>
//             </div>
//             <div className="p-8 transition-shadow bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-md">
//               <div className="w-12 h-12 bg-emerald-100 text-[#006A4E] rounded-full flex items-center justify-center mb-6 text-xl">🎨</div>
//               <h4 className="mb-3 text-xl font-bold text-gray-900">{t("about_purpose3_title")}</h4>
//               <p className="leading-relaxed text-gray-600">{t("about_purpose3_desc")}</p>
//             </div>
//             <div className="p-8 transition-shadow bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-md">
//               <div className="w-12 h-12 bg-emerald-100 text-[#006A4E] rounded-full flex items-center justify-center mb-6 text-xl">🌱</div>
//               <h4 className="mb-3 text-xl font-bold text-gray-900">{t("about_purpose4_title")}</h4>
//               <p className="leading-relaxed text-gray-600">{t("about_purpose4_desc")}</p>
//             </div>
//           </div>
//         </section>

//         {/* ================= INNOVATION & SUSTAINABILITY ================= */}
//         <section className="max-w-3xl mx-auto text-center scroll-mt-32" id="our-innovation">
//           <h2 className="mb-4 text-sm font-bold tracking-widest text-[#006A4E] uppercase">{t("about_innov_label")}</h2>
//           <h3 className="mb-8 text-3xl font-extrabold text-gray-900 md:text-4xl">
//             {t("about_innov_title")}
//           </h3>
//           <div className="space-y-6 text-lg text-gray-600">
//             <p>{t("about_innov_p1")}</p>
//             <p>{t("about_innov_p2")}</p>
//             <p className="font-bold text-[#006A4E] text-xl mt-8">
//               "{t("about_innov_p3")}"
//             </p>
//           </div>
//         </section>

//         {/* ================= VISION & MISSION ================= */}
//         <section className="relative overflow-hidden bg-gray-900 rounded-[3rem] p-10 md:p-20 scroll-mt-32" id="vision-mission">
//           <div className="absolute top-0 right-0 w-64 h-64 bg-[#006A4E] rounded-full blur-[80px] opacity-40"></div>
          
//           <h2 className="relative z-10 inline-block pb-4 mb-12 text-sm font-bold tracking-widest uppercase border-b border-gray-700 text-emerald-400">
//             {t("about_vm_label")}
//           </h2>
          
//           <div className="relative z-10 grid grid-cols-1 gap-16 lg:grid-cols-2">
//             <div>
//               <h3 className="mb-6 text-3xl font-bold text-white">{t("about_vision_title")}</h3>
//               <p className="text-xl leading-relaxed text-gray-300">
//                 {t("about_vision_desc")}
//               </p>
//             </div>

//             <div>
//               <h3 className="mb-6 text-3xl font-bold text-white">{t("about_mission_title")}</h3>
//               <ul className="space-y-4 text-lg text-gray-300">
//                 <li className="flex items-start gap-3">
//                   <span className="text-[#D4FF32] mt-1">✔</span> 
//                   <span>{t("about_mission_item1")}</span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <span className="text-[#D4FF32] mt-1">✔</span> 
//                   <span>{t("about_mission_item2")}</span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <span className="text-[#D4FF32] mt-1">✔</span> 
//                   <span>{t("about_mission_item3")}</span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <span className="text-[#D4FF32] mt-1">✔</span> 
//                   <span>{t("about_mission_item4")}</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </section>

//         {/* ================= CLOSING SECTION ================= */}
//         <section className="pt-20 pb-10 text-center">
//           <h2 className="mb-4 text-sm font-bold tracking-widest text-gray-400 uppercase">{t("about_closing_label")}</h2>
//           <h3 className="text-3xl md:text-5xl font-black text-[#006A4E] mb-8 leading-tight max-w-3xl mx-auto">
//             {t("about_closing_title")}
//           </h3>
//           <p className="mb-4 text-xl text-gray-600">
//             {t("about_closing_p1")}
//           </p>
//           <p className="text-xl font-bold text-gray-900">
//             {t("about_closing_p2")}
//           </p>
//         </section>

//       </div>
//     </div>
//   );
// }

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

// Import gambar aset lokal
import imgStory1 from "../../assets/DD_00067.jpg";
import imgStory2 from "../../assets/DD_00229.jpg";

export default function AboutUsPage() {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen pb-24 overflow-hidden font-sans bg-white">
      
      {/* ================= HEADER SECTION (HERO) ================= */}
      <div className="relative bg-[#006A4E] py-32 text-center px-4 overflow-hidden">
        {/* Dekorasi Latar Belakang */}
        <div className="absolute top-0 left-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#D4FF32] rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/3 translate-y-1/3"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="mb-6 text-4xl font-black tracking-tight text-white md:text-6xl drop-shadow-sm">
            {t("about_header_title")}
          </h1>
          <p className="max-w-2xl mx-auto text-lg font-medium leading-relaxed text-emerald-50 md:text-xl">
            {t("about_header_desc1")}
          </p>
          <p className="max-w-2xl mx-auto mt-4 text-lg leading-relaxed text-emerald-100 md:text-xl">
            {t("about_header_desc2")}
          </p>
        </div>
      </div>

      <div className="max-w-6xl px-4 mx-auto mt-24 space-y-32 sm:px-6 lg:px-8">
        
        {/* ================= WHO WE ARE (Teks Kiri, Gambar Kanan) ================= */}
        <section className="flex flex-col items-center gap-16 scroll-mt-32 lg:flex-row" id="who-we-are">
          <div className="lg:w-1/2 animate-fade-in-left">
            <h2 className="mb-4 text-sm font-bold tracking-widest text-[#006A4E] uppercase flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#006A4E]"></span>
              {t("about_who_we_are_label")}
            </h2>
            <h3 className="mb-6 text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl">
              {t("about_who_we_are_title")}
            </h3>
            <div className="prose prose-lg text-gray-600 max-w-none">
              <p>{t("about_who_we_are_p1")}</p>
              <p>{t("about_who_we_are_p2")}</p>
            </div>
          </div>
          <div className="relative lg:w-1/2">
            <div className="absolute inset-0 translate-x-4 translate-y-4 bg-emerald-100 rounded-3xl -z-10"></div>
            <img 
              src={imgStory1} 
              alt="Who we are" 
              className="w-full h-[400px] object-cover rounded-3xl shadow-xl border border-gray-100"
            />
          </div>
        </section>

        {/* ================= OUR STORY (Gambar Kiri, Teks Kanan) ================= */}
        <section className="flex flex-col-reverse items-center gap-16 scroll-mt-32 lg:flex-row" id="our-story">
          <div className="relative lg:w-1/2">
            <div className="absolute inset-0 -translate-x-4 translate-y-4 bg-gray-100 rounded-3xl -z-10"></div>
            <img 
              src={imgStory2} 
              alt="Our Story" 
              className="w-full h-[450px] object-cover rounded-3xl shadow-lg border border-gray-100"
            />
          </div>
          <div className="lg:w-1/2 animate-fade-in-right">
            <h2 className="mb-4 text-sm font-bold tracking-widest text-[#006A4E] uppercase flex items-center gap-2">
              {t("about_our_story_label")}
              <span className="w-8 h-0.5 bg-[#006A4E]"></span>
            </h2>
            <h3 className="mb-6 text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl">
              {t("about_our_story_title")}
            </h3>
            <div className="space-y-4 text-lg text-gray-600">
              <p>{t("about_our_story_p1")}</p>
              <p>{t("about_our_story_p2")}</p>
              <p className="font-bold text-gray-900 border-l-4 border-[#006A4E] pl-4 my-6 italic">
                {t("about_our_story_p3")}
              </p>
              <p>{t("about_our_story_p4")}</p>
            </div>
          </div>
        </section>

        {/* ================= WHY GYCORA (OUR PURPOSE) ================= */}
        <section className="scroll-mt-32 bg-[#F9FAF9] rounded-[3rem] p-10 md:p-16 border border-emerald-50" id="our-purpose">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-sm font-bold tracking-widest text-[#006A4E] uppercase inline-block border-b-2 border-[#006A4E] pb-1">
              {t("about_why_label")}
            </h2>
            <h3 className="text-3xl font-black text-gray-900 md:text-4xl">{t("about_why_title")}</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="p-8 transition-shadow bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-md">
              <div className="w-12 h-12 bg-emerald-100 text-[#006A4E] rounded-full flex items-center justify-center mb-6 text-xl">✨</div>
              <h4 className="mb-3 text-xl font-bold text-gray-900">{t("about_purpose1_title")}</h4>
              <p className="leading-relaxed text-gray-600">{t("about_purpose1_desc")}</p>
            </div>
            <div className="p-8 transition-shadow bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-md">
              <div className="w-12 h-12 bg-emerald-100 text-[#006A4E] rounded-full flex items-center justify-center mb-6 text-xl">💡</div>
              <h4 className="mb-3 text-xl font-bold text-gray-900">{t("about_purpose2_title")}</h4>
              <p className="leading-relaxed text-gray-600">{t("about_purpose2_desc")}</p>
            </div>
            <div className="p-8 transition-shadow bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-md">
              <div className="w-12 h-12 bg-emerald-100 text-[#006A4E] rounded-full flex items-center justify-center mb-6 text-xl">🎨</div>
              <h4 className="mb-3 text-xl font-bold text-gray-900">{t("about_purpose3_title")}</h4>
              <p className="leading-relaxed text-gray-600">{t("about_purpose3_desc")}</p>
            </div>
            <div className="p-8 transition-shadow bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-md">
              <div className="w-12 h-12 bg-emerald-100 text-[#006A4E] rounded-full flex items-center justify-center mb-6 text-xl">🌱</div>
              <h4 className="mb-3 text-xl font-bold text-gray-900">{t("about_purpose4_title")}</h4>
              <p className="leading-relaxed text-gray-600">{t("about_purpose4_desc")}</p>
            </div>
          </div>
        </section>

        {/* ================= INNOVATION & SUSTAINABILITY ================= */}
        <section className="max-w-3xl mx-auto text-center scroll-mt-32" id="our-innovation">
          <h2 className="mb-4 text-sm font-bold tracking-widest text-[#006A4E] uppercase">{t("about_innov_label")}</h2>
          <h3 className="mb-8 text-3xl font-extrabold text-gray-900 md:text-4xl">
            {t("about_innov_title")}
          </h3>
          <div className="space-y-6 text-lg text-gray-600">
            <p>{t("about_innov_p1")}</p>
            <p>{t("about_innov_p2")}</p>
            <p className="font-bold text-[#006A4E] text-xl mt-8">
              "{t("about_innov_p3")}"
            </p>
          </div>
        </section>

        {/* ================= VISION & MISSION ================= */}
        <section className="relative overflow-hidden bg-gray-900 rounded-[3rem] p-10 md:p-20 scroll-mt-32" id="vision-mission">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#006A4E] rounded-full blur-[80px] opacity-40"></div>
          
          <h2 className="relative z-10 inline-block pb-4 mb-12 text-sm font-bold tracking-widest uppercase border-b border-gray-700 text-emerald-400">
            {t("about_vm_label")}
          </h2>
          
          <div className="relative z-10 grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <h3 className="mb-6 text-3xl font-bold text-white">{t("about_vision_title")}</h3>
              <p className="text-xl leading-relaxed text-gray-300">
                {t("about_vision_desc")}
              </p>
            </div>

            <div>
              <h3 className="mb-6 text-3xl font-bold text-white">{t("about_mission_title")}</h3>
              <ul className="space-y-4 text-lg text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-[#D4FF32] mt-1">✔</span> 
                  <span>{t("about_mission_item1")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4FF32] mt-1">✔</span> 
                  <span>{t("about_mission_item2")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4FF32] mt-1">✔</span> 
                  <span>{t("about_mission_item3")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4FF32] mt-1">✔</span> 
                  <span>{t("about_mission_item4")}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ================= CLOSING SECTION ================= */}
        <section className="pt-20 pb-10 text-center">
          <h2 className="mb-4 text-sm font-bold tracking-widest text-gray-400 uppercase">{t("about_closing_label")}</h2>
          <h3 className="text-3xl md:text-5xl font-black text-[#006A4E] mb-8 leading-tight max-w-3xl mx-auto">
            {t("about_closing_title")}
          </h3>
          <p className="mb-4 text-xl text-gray-600">
            {t("about_closing_p1")}
          </p>
          <p className="text-xl font-bold text-gray-900">
            {t("about_closing_p2")}
          </p>
        </section>

      </div>
    </div>
  );
}