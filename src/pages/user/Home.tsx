/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Home() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user_data");
//     if (storedUser) {
//       // eslint-disable-next-line react-hooks/set-state-in-effect
//       setUserData(JSON.parse(storedUser));
//     }
//   }, []);

//   return (
//     <div className="font-sans bg-white">
      
//       {/* =========================================
//           1. HERO SECTION
//       ========================================= */}
//       <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
//         {/* Dekorasi Background Blur */}
//         <div className="absolute top-0 -translate-x-1/2 left-1/2 -z-10">
//           <div className="w-[800px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
//         </div>

//         <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32">
//           {userData ? (
//             <div className="max-w-4xl mx-auto space-y-8 text-center animate-fade-in-up">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
//                 Selamat datang kembali, <span className="text-gycora">{userData.first_name}</span>.
//               </h1>
//               <p className="max-w-2xl mx-auto text-lg text-gray-500 sm:text-xl">
//                 Katalog rambut premium terbaru kami sudah menanti Anda. Nikmati penawaran eksklusif dan kemudahan berbelanja khusus untuk member Gycora.
//               </p>
//               <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
//                 <button onClick={() => navigate("/products")} className="px-8 py-3.5 text-base font-bold text-white transition-all bg-gray-900 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5">
//                   Lanjutkan Belanja
//                 </button>
//                 <button onClick={() => navigate("/profile")} className="px-8 py-3.5 text-base font-bold text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                   Profil & Pesanan Saya
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
//               <div className="space-y-8 animate-fade-in-up">
//                 <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                   ✨ Solusi Perawatan Rambut Premium
//                 </div>
//                 <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
//                   Tingkatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-gycora to-emerald-400">Pesona</span><br /> Mahkota Anda.
//                 </h1>
//                 <p className="text-lg leading-relaxed text-gray-500 sm:text-xl">
//                   Temukan koleksi eksklusif Gycora. Diformulasikan dengan teknologi mutakhir dan bahan premium untuk rambut yang lebih sehat, bersinar, dan bebas kusut dari akar hingga ujung.
//                 </p>
//                 <div className="flex flex-col gap-4 pt-4 sm:flex-row">
//                   <Link to="/products" className="px-8 py-4 text-lg font-bold text-center text-white transition-all rounded-full bg-gycora hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5">
//                     Eksplorasi Katalog
//                   </Link>
//                   <Link to="/register" className="px-8 py-4 text-lg font-bold text-center text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                     Daftar Member
//                   </Link>
//                 </div>
//               </div>
//               <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//                 {/* Gambar Hero Placeholder - Ganti dengan URL gambar produk asli Anda nanti */}
//                 <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-pink-50 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
//                 <img 
//                   src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
//                   alt="Gycora Premium Hair Care" 
//                   className="object-cover w-full shadow-2xl h-[500px] rounded-[3rem]"
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =========================================
//           2. VALUE PROPOSITION (MENGAPA GYCORA?)
//       ========================================= */}
//       <div className="py-20 bg-white">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
//             <div className="p-6 transition-colors border border-transparent rounded-3xl hover:bg-gray-50 hover:border-gray-100">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Static-Free Technology</h3>
//               <p className="leading-relaxed text-gray-500">Molekul karbon konduktif pada sisir kami menetralkan listrik statis, mencegah rambut kusut dan rusak seketika.</p>
//             </div>
//             <div className="p-6 transition-colors border border-transparent rounded-3xl hover:bg-gray-50 hover:border-gray-100">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Premium Ingredients</h3>
//               <p className="leading-relaxed text-gray-500">Setiap tetes diformulasikan dengan bahan baku berkualitas tinggi yang aman dan teruji klinis untuk kesehatan kulit kepala.</p>
//             </div>
//             <div className="p-6 transition-colors border border-transparent rounded-3xl hover:bg-gray-50 hover:border-gray-100">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Cruelty-Free</h3>
//               <p className="leading-relaxed text-gray-500">Kecantikan sejati tidak menyakiti. Seluruh lini produk Gycora 100% bebas dari uji coba pada hewan.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           3. FEATURED PRODUCTS (PRODUK UNGGULAN)
//       ========================================= */}
//       {/* <div className="py-24 bg-gray-50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-between mb-12 sm:flex-row">
//             <div>
//               <h2 className="text-3xl font-extrabold text-gray-900">Produk Terlaris Kami</h2>
//               <p className="mt-2 text-gray-500">Pilihan favorit pelanggan Gycora bulan ini.</p>
//             </div>
//             <Link to="/products" className="hidden font-bold transition-colors sm:block text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>

//           <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//             <div className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm cursor-pointer group rounded-2xl hover:shadow-xl hover:-translate-y-1" onClick={() => navigate('/products')}>
//               <div className="relative overflow-hidden bg-gray-100 aspect-square">
//                 <img src="https://images.unsplash.com/photo-1598440947619-2ce6598c4e1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Ethereal Glow Brush" className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
//                 <div className="absolute px-3 py-1 text-xs font-bold text-gray-900 rounded-full shadow-sm top-4 left-4 bg-white/90 backdrop-blur-sm">Best Seller</div>
//               </div>
//               <div className="p-6">
//                 <h3 className="mb-1 text-lg font-bold text-gray-900">Ethereal Glow Brush</h3>
//                 <p className="mb-4 text-sm text-gray-500 line-clamp-2">Sisir berteknologi anti-statis dengan molekul karbon untuk rambut halus bebas kusut.</p>
//                 <div className="flex items-center justify-between">
//                   <span className="text-xl font-extrabold text-gycora">Rp 250.000</span>
//                   <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm cursor-pointer group rounded-2xl hover:shadow-xl hover:-translate-y-1" onClick={() => navigate('/products')}>
//               <div className="relative overflow-hidden bg-gray-100 aspect-square">
//                 <img src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Revitalizing Shampoo" className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
//               </div>
//               <div className="p-6">
//                 <h3 className="mb-1 text-lg font-bold text-gray-900">Revitalizing Shampoo</h3>
//                 <p className="mb-4 text-sm text-gray-500 line-clamp-2">Membersihkan kulit kepala secara mendalam sambil menjaga kelembapan alami rambut.</p>
//                 <div className="flex items-center justify-between">
//                   <span className="text-xl font-extrabold text-gycora">Rp 185.000</span>
//                   <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="hidden overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm cursor-pointer lg:block group rounded-2xl hover:shadow-xl hover:-translate-y-1" onClick={() => navigate('/products')}>
//               <div className="relative overflow-hidden bg-gray-100 aspect-square">
//                 <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Argan Hair Serum" className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
//                 <div className="absolute px-3 py-1 text-xs font-bold text-pink-700 rounded-full shadow-sm top-4 left-4 bg-pink-100/90 backdrop-blur-sm">New Arrival</div>
//               </div>
//               <div className="p-6">
//                 <h3 className="mb-1 text-lg font-bold text-gray-900">Argan Hair Serum</h3>
//                 <p className="mb-4 text-sm text-gray-500 line-clamp-2">Serum kaya nutrisi untuk mengunci kilau dan memperbaiki ujung rambut yang bercabang.</p>
//                 <div className="flex items-center justify-between">
//                   <span className="text-xl font-extrabold text-gycora">Rp 210.000</span>
//                   <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div> */}
          
//           <div className="mt-8 text-center sm:hidden">
//             <Link to="/products" className="font-bold transition-colors text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>
//         {/* </div> */}
//       {/* </div>  */}

//       {/* =========================================
//           4. CTA (CALL TO ACTION) / NEWSLETTER
//       ========================================= */}
//       <div className="relative py-24 overflow-hidden bg-gray-900">
//         {/* Dekorasi Glow */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gycora rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        
//         <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
//             Siap mengubah rutinitas rambut Anda?
//           </h2>
//           <p className="mt-4 mb-10 text-lg text-gray-400">
//             Bergabunglah dengan ribuan pelanggan yang telah merasakan keajaiban Ethereal Glow Brush dan rangkaian produk Gycora lainnya.
//           </p>
//           {!userData && (
//              <button onClick={() => navigate("/register")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Mulai Perjalanan Anda Sekarang
//              </button>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api"; // Pastikan path ini benar

// // --- IMPORT GAMBAR DARI LOKAL UNTUK SLIDER ---
// // Silakan sesuaikan nama dan ekstensi file dengan yang ada di folder assets Anda
// import slide1 from "../assets/hero_slide_1.jpg";
// import slide2 from "../assets/hero_slide_2.jpg";
// import slide3 from "../assets/hero_slide_3.jpg";

// const heroSlides = [
//   { id: 1, image: slide1, alt: "Gycora Premium Hair Care 1" },
//   { id: 2, image: slide2, alt: "Gycora Premium Hair Care 2" },
//   { id: 3, image: slide3, alt: "Gycora Premium Hair Care 3" },
// ];

// export default function Home() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
  
//   // State untuk Carousel
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // State untuk Featured Products (Mengambil data asli dari API)
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
//   const [isLoadingProducts, setIsLoadingProducts] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user_data");
//     if (storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }

//     // Mengambil Produk Bestseller/Featured dari API (Data Real)
//     const fetchFeaturedProducts = async () => {
//       try {
//         // Asumsi endpoint untuk mengambil semua produk aktif
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (res.ok) {
//           const data = await res.json();
//           // Ambil 3 produk teratas saja untuk ditampilkan di halaman depan
//           const productsArray = data.data ? data.data : data;
//           setFeaturedProducts(productsArray.slice(0, 3) || []);
//         }
//       } catch (error) {
//         console.error("Gagal memuat produk unggulan:", error);
//       } finally {
//         setIsLoadingProducts(false);
//       }
//     };

//     fetchFeaturedProducts();
//   }, []);

//   // Efek Autoplay untuk Slider
//   useEffect(() => {
//     // Jika user sudah login, slider tidak tampil, jadi tidak perlu jalankan interval
//     if (userData) return; 

//     const slideInterval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
//     }, 4000); // Ganti gambar setiap 4 detik

//     return () => clearInterval(slideInterval);
//   }, [userData]);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
//   };

//   return (
//     <div className="font-sans bg-white">
      
//       {/* =========================================
//           1. HERO SECTION
//       ========================================= */}
//       <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
//         {/* Dekorasi Background Blur */}
//         <div className="absolute top-0 -translate-x-1/2 left-1/2 -z-10">
//           <div className="w-[800px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
//         </div>

//         <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32">
//           {userData ? (
//             // TAMPILAN JIKA USER SUDAH LOGIN
//             <div className="max-w-4xl mx-auto space-y-8 text-center animate-fade-in-up">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
//                 Selamat datang kembali, <span className="text-gycora">{userData.first_name}</span>.
//               </h1>
//               <p className="max-w-2xl mx-auto text-lg text-gray-500 sm:text-xl">
//                 Katalog rambut premium terbaru kami sudah menanti Anda. Nikmati penawaran eksklusif dan kemudahan berbelanja khusus untuk member Gycora.
//               </p>
//               <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
//                 <button onClick={() => navigate("/products")} className="px-8 py-3.5 text-base font-bold text-white transition-all bg-gray-900 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5">
//                   Lanjutkan Belanja
//                 </button>
//                 <button onClick={() => navigate("/profile")} className="px-8 py-3.5 text-base font-bold text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                   Profil & Pesanan Saya
//                 </button>
//               </div>
//             </div>
//           ) : (
//             // TAMPILAN JIKA GUEST (BELUM LOGIN)
//             <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
//               <div className="space-y-8 animate-fade-in-up">
//                 <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                   ✨ Solusi Perawatan Rambut Premium
//                 </div>
//                 <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
//                   Tingkatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-gycora to-emerald-400">Pesona</span><br /> Mahkota Anda.
//                 </h1>
//                 <p className="text-lg leading-relaxed text-gray-500 sm:text-xl">
//                   Temukan koleksi eksklusif Gycora. Diformulasikan dengan teknologi mutakhir dan bahan premium untuk rambut yang lebih sehat, bersinar, dan bebas kusut dari akar hingga ujung.
//                 </p>
//                 <div className="flex flex-col gap-4 pt-4 sm:flex-row">
//                   <Link to="/products" className="px-8 py-4 text-lg font-bold text-center text-white transition-all rounded-full bg-gycora hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5">
//                     Eksplorasi Katalog
//                   </Link>
//                   <Link to="/register" className="px-8 py-4 text-lg font-bold text-center text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                     Daftar Member
//                   </Link>
//                 </div>
//               </div>
              
//               {/* IMAGE CAROUSEL AREA */}
//               <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//                 {/* Latar belakang dekoratif */}
//                 <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-pink-50 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
                
//                 {/* Wadah Gambar Slider */}
//                 <div className="relative w-full overflow-hidden shadow-2xl h-[500px] rounded-[3rem] group">
//                   {heroSlides.map((slide, index) => (
//                     <img 
//                       key={slide.id}
//                       src={slide.image} 
//                       alt={slide.alt} 
//                       className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
//                     />
//                   ))}

//                   {/* Tombol Navigasi Manual Slider (Muncul saat hover) */}
//                   <div className="absolute inset-0 flex items-center justify-between px-4 transition-opacity opacity-0 group-hover:opacity-100">
//                     <button 
//                       onClick={() => setCurrentSlide(prev => prev === 0 ? heroSlides.length - 1 : prev - 1)}
//                       className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                     </button>
//                     <button 
//                       onClick={() => setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1)}
//                       className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                     </button>
//                   </div>

//                   {/* Indikator Titik (Dots) di bawah gambar */}
//                   <div className="absolute flex justify-center w-full gap-2 bottom-6">
//                     {heroSlides.map((_, index) => (
//                       <button 
//                         key={index} 
//                         onClick={() => setCurrentSlide(index)}
//                         className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${index === currentSlide ? 'w-8 bg-gycora' : 'w-2.5 bg-white/70 hover:bg-white'}`}
//                         aria-label={`Slide ${index + 1}`}
//                       ></button>
//                     ))}
//                   </div>
//                 </div>

//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =========================================
//           2. VALUE PROPOSITION (MENGAPA GYCORA?)
//       ========================================= */}
//       <div className="py-20 bg-white">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
//             <div className="p-6 transition-colors border border-transparent rounded-3xl hover:bg-gray-50 hover:border-gray-100">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Teknologi Anti-Statis</h3>
//               <p className="leading-relaxed text-gray-500">Molekul karbon konduktif pada sisir kami menetralkan listrik statis, mencegah rambut kusut dan rusak seketika.</p>
//             </div>
//             <div className="p-6 transition-colors border border-transparent rounded-3xl hover:bg-gray-50 hover:border-gray-100">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Bahan Baku Premium</h3>
//               <p className="leading-relaxed text-gray-500">Setiap tetes diformulasikan dengan bahan baku berkualitas tinggi yang aman dan teruji klinis untuk kesehatan kulit kepala.</p>
//             </div>
//             <div className="p-6 transition-colors border border-transparent rounded-3xl hover:bg-gray-50 hover:border-gray-100">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Cruelty-Free</h3>
//               <p className="leading-relaxed text-gray-500">Kecantikan sejati tidak menyakiti. Seluruh lini produk Gycora 100% bebas dari uji coba pada hewan.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           3. FEATURED PRODUCTS (PRODUK UNGGULAN DINAMIS)
//       ========================================= */}
//       <div className="py-24 bg-gray-50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-between mb-12 sm:flex-row">
//             <div>
//               <h2 className="text-3xl font-extrabold text-gray-900">Produk Terlaris Kami</h2>
//               <p className="mt-2 text-gray-500">Pilihan favorit pelanggan Gycora bulan ini.</p>
//             </div>
//             <Link to="/products" className="hidden font-bold transition-colors sm:block text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>

//           {isLoadingProducts ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="bg-white border border-gray-100 shadow-sm rounded-2xl animate-pulse">
//                   <div className="w-full bg-gray-200 aspect-square rounded-t-2xl"></div>
//                   <div className="p-6 space-y-3">
//                     <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
//                     <div className="w-full h-4 bg-gray-200 rounded"></div>
//                     <div className="w-1/2 h-6 mt-4 bg-gray-200 rounded"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : featuredProducts.length > 0 ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {featuredProducts.map((product) => (
//                 <div 
//                   key={product.id} 
//                   className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm cursor-pointer group rounded-2xl hover:shadow-xl hover:-translate-y-1" 
//                   onClick={() => navigate(`/product/${product.id}`)}
//                 >
//                   <div className="relative overflow-hidden bg-gray-100 aspect-square">
//                     <img 
//                       src={product.image_url} 
//                       alt={product.name} 
//                       className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
//                     />
//                     <div className="absolute px-3 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-full shadow-sm top-4 left-4 bg-white/90 backdrop-blur-sm">
//                       {product.category?.name || "Gycora"}
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
//                     <p className="mb-4 text-sm text-gray-500 line-clamp-2">
//                       {product.description || "Temukan kilau alami rambut Anda dengan perawatan eksklusif dari Gycora."}
//                     </p>
//                     <div className="flex items-center justify-between">
//                       <span className="text-xl font-extrabold text-gycora">{formatRupiah(product.price)}</span>
//                       <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="py-12 italic text-center text-gray-500">Belum ada produk yang tersedia.</div>
//           )}
          
//           <div className="mt-8 text-center sm:hidden">
//             <Link to="/products" className="font-bold transition-colors text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>
//         </div>
//       </div> 

//       {/* =========================================
//           4. CTA (CALL TO ACTION) / NEWSLETTER
//       ========================================= */}
//       <div className="relative py-24 overflow-hidden bg-gray-900">
//         {/* Dekorasi Glow */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gycora rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        
//         <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
//             Siap mengubah rutinitas rambut Anda?
//           </h2>
//           <p className="mt-4 mb-10 text-lg text-gray-400">
//             Bergabunglah dengan ribuan pelanggan yang telah merasakan keajaiban Ethereal Glow Brush dan rangkaian produk Gycora lainnya.
//           </p>
//           {!userData && (
//              <button onClick={() => navigate("/register")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Mulai Perjalanan Anda Sekarang
//              </button>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api"; // Pastikan path ini benar

// // --- IMPORT 5 GAMBAR DARI LOKAL UNTUK SLIDER ---
// import slide1 from "/landing_page_images/hero_slide_1.jpg";
// import slide2 from "/landing_page_images/hero_slide_2.jpg";
// import slide3 from "/landing_page_images/hero_slide_3.jpg";
// import slide4 from "/landing_page_images/hero_slide_4.jpg";
// import slide5 from "/landing_page_images/hero_slide_5.jpg"; 

// const heroSlides = [
//   { id: 1, image: slide1, alt: "Gycora Premium Hair Care 1" },
//   { id: 2, image: slide2, alt: "Gycora Premium Hair Care 2" },
//   { id: 3, image: slide3, alt: "Gycora Premium Hair Care 3" },
//   { id: 4, image: slide4, alt: "Gycora Premium Hair Care 4" },
//   { id: 5, image: slide5, alt: "Gycora Premium Hair Care 5" },
// ];

// export default function Home() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
  
//   // State untuk Carousel
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // State untuk Featured Products (Mengambil data asli dari API)
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
//   const [isLoadingProducts, setIsLoadingProducts] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user_data");
//     if (storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }

//     // Mengambil Produk Bestseller/Featured dari API (Data Real)
//     const fetchFeaturedProducts = async () => {
//       try {
//         // Asumsi endpoint untuk mengambil semua produk aktif
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (res.ok) {
//           const data = await res.json();
//           // Ambil 3 produk teratas saja untuk ditampilkan di halaman depan
//           const productsArray = data.data ? data.data : data;
//           setFeaturedProducts(productsArray.slice(0, 3) || []);
//         }
//       } catch (error) {
//         console.error("Gagal memuat produk unggulan:", error);
//       } finally {
//         setIsLoadingProducts(false);
//       }
//     };

//     fetchFeaturedProducts();
//   }, []);

//   // Efek Autoplay untuk Slider
//   useEffect(() => {
//     // Jika user sudah login, slider tidak tampil, jadi tidak perlu jalankan interval
//     if (userData) return; 

//     const slideInterval = setInterval(() => {
//       // Logika otomatis menyesuaikan jumlah gambar di array heroSlides
//       setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
//     }, 4000); // Ganti gambar setiap 4 detik

//     return () => clearInterval(slideInterval);
//   }, [userData]);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
//   };

//   return (
//     <div className="font-sans bg-white">
      
//       {/* =========================================
//           1. HERO SECTION
//       ========================================= */}
//       <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
//         {/* Dekorasi Background Blur */}
//         <div className="absolute top-0 -translate-x-1/2 left-1/2 -z-10">
//           <div className="w-[800px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
//         </div>

//         <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32">
//           {userData ? (
//             // TAMPILAN JIKA USER SUDAH LOGIN
//             <div className="max-w-4xl mx-auto space-y-8 text-center animate-fade-in-up">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
//                 Selamat datang kembali, <span className="text-gycora">{userData.first_name}</span>.
//               </h1>
//               <p className="max-w-2xl mx-auto text-lg text-gray-500 sm:text-xl">
//                 Katalog rambut premium terbaru kami sudah menanti Anda. Nikmati penawaran eksklusif dan kemudahan berbelanja khusus untuk member Gycora.
//               </p>
//               <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
//                 <button onClick={() => navigate("/products")} className="px-8 py-3.5 text-base font-bold text-white transition-all bg-gray-900 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5">
//                   Lanjutkan Belanja
//                 </button>
//                 <button onClick={() => navigate("/profile")} className="px-8 py-3.5 text-base font-bold text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                   Profil & Pesanan Saya
//                 </button>
//               </div>
//             </div>
//           ) : (
//             // TAMPILAN JIKA GUEST (BELUM LOGIN)
//             <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
//               <div className="space-y-8 animate-fade-in-up">
//                 <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                   ✨ Solusi Perawatan Rambut Premium
//                 </div>
//                 <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
//                   Tingkatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-gycora to-emerald-400">Pesona</span><br /> Mahkota Anda.
//                 </h1>
//                 <p className="text-lg leading-relaxed text-gray-500 sm:text-xl">
//                   Temukan koleksi eksklusif Gycora. Diformulasikan dengan teknologi mutakhir dan bahan premium untuk rambut yang lebih sehat, bersinar, dan bebas kusut dari akar hingga ujung.
//                 </p>
//                 <div className="flex flex-col gap-4 pt-4 sm:flex-row">
//                   <Link to="/products" className="px-8 py-4 text-lg font-bold text-center text-white transition-all rounded-full bg-gycora hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5">
//                     Eksplorasi Katalog
//                   </Link>
//                   <Link to="/register" className="px-8 py-4 text-lg font-bold text-center text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                     Daftar Member
//                   </Link>
//                 </div>
//               </div>
              
//               {/* IMAGE CAROUSEL AREA */}
//               <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//                 {/* Latar belakang dekoratif */}
//                 <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-pink-50 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
                
//                 {/* Wadah Gambar Slider */}
//                 <div className="relative w-full overflow-hidden shadow-2xl h-[500px] rounded-[3rem] group">
//                   {heroSlides.map((slide, index) => (
//                     <img 
//                       key={slide.id}
//                       src={slide.image} 
//                       alt={slide.alt} 
//                       className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
//                     />
//                   ))}

//                   {/* Tombol Navigasi Manual Slider (Muncul saat hover) */}
//                   <div className="absolute inset-0 flex items-center justify-between px-4 transition-opacity opacity-0 group-hover:opacity-100">
//                     <button 
//                       onClick={() => setCurrentSlide(prev => prev === 0 ? heroSlides.length - 1 : prev - 1)}
//                       className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                     </button>
//                     <button 
//                       onClick={() => setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1)}
//                       className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                     </button>
//                   </div>

//                   {/* Indikator Titik (Dots) di bawah gambar */}
//                   <div className="absolute flex justify-center w-full gap-2 bottom-6">
//                     {heroSlides.map((_, index) => (
//                       <button 
//                         key={index} 
//                         onClick={() => setCurrentSlide(index)}
//                         className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${index === currentSlide ? 'w-8 bg-gycora' : 'w-2.5 bg-white/70 hover:bg-white'}`}
//                         aria-label={`Slide ${index + 1}`}
//                       ></button>
//                     ))}
//                   </div>
//                 </div>

//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =========================================
//           2. VALUE PROPOSITION (MENGAPA GYCORA?)
//       ========================================= */}
//       <div className="py-20 bg-white">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
//             <div className="p-6 transition-colors border border-transparent rounded-3xl hover:bg-gray-50 hover:border-gray-100">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Teknologi Anti-Statis</h3>
//               <p className="leading-relaxed text-gray-500">Molekul karbon konduktif pada sisir kami menetralkan listrik statis, mencegah rambut kusut dan rusak seketika.</p>
//             </div>
//             <div className="p-6 transition-colors border border-transparent rounded-3xl hover:bg-gray-50 hover:border-gray-100">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Bahan Baku Premium</h3>
//               <p className="leading-relaxed text-gray-500">Setiap tetes diformulasikan dengan bahan baku berkualitas tinggi yang aman dan teruji klinis untuk kesehatan kulit kepala.</p>
//             </div>
//             <div className="p-6 transition-colors border border-transparent rounded-3xl hover:bg-gray-50 hover:border-gray-100">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Cruelty-Free</h3>
//               <p className="leading-relaxed text-gray-500">Kecantikan sejati tidak menyakiti. Seluruh lini produk Gycora 100% bebas dari uji coba pada hewan.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           3. FEATURED PRODUCTS (PRODUK UNGGULAN DINAMIS)
//       ========================================= */}
//       <div className="py-24 bg-gray-50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-between mb-12 sm:flex-row">
//             <div>
//               <h2 className="text-3xl font-extrabold text-gray-900">Produk Terlaris Kami</h2>
//               <p className="mt-2 text-gray-500">Pilihan favorit pelanggan Gycora bulan ini.</p>
//             </div>
//             <Link to="/products" className="hidden font-bold transition-colors sm:block text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>

//           {isLoadingProducts ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="bg-white border border-gray-100 shadow-sm rounded-2xl animate-pulse">
//                   <div className="w-full bg-gray-200 aspect-square rounded-t-2xl"></div>
//                   <div className="p-6 space-y-3">
//                     <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
//                     <div className="w-full h-4 bg-gray-200 rounded"></div>
//                     <div className="w-1/2 h-6 mt-4 bg-gray-200 rounded"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : featuredProducts.length > 0 ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {featuredProducts.map((product) => (
//                 <div 
//                   key={product.id} 
//                   className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm cursor-pointer group rounded-2xl hover:shadow-xl hover:-translate-y-1" 
//                   onClick={() => navigate(`/product/${product.id}`)}
//                 >
//                   <div className="relative overflow-hidden bg-gray-100 aspect-square">
//                     <img 
//                       src={product.image_url} 
//                       alt={product.name} 
//                       className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
//                     />
//                     <div className="absolute px-3 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-full shadow-sm top-4 left-4 bg-white/90 backdrop-blur-sm">
//                       {product.category?.name || "Gycora"}
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
//                     <p className="mb-4 text-sm text-gray-500 line-clamp-2">
//                       {product.description || "Temukan kilau alami rambut Anda dengan perawatan eksklusif dari Gycora."}
//                     </p>
//                     <div className="flex items-center justify-between">
//                       <span className="text-xl font-extrabold text-gycora">{formatRupiah(product.price)}</span>
//                       <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="py-12 italic text-center text-gray-500">Belum ada produk yang tersedia.</div>
//           )}
          
//           <div className="mt-8 text-center sm:hidden">
//             <Link to="/products" className="font-bold transition-colors text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>
//         </div>
//       </div> 

//       {/* =========================================
//           4. CTA (CALL TO ACTION) / NEWSLETTER
//       ========================================= */}
//       <div className="relative py-24 overflow-hidden bg-gray-900">
//         {/* Dekorasi Glow */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gycora rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        
//         <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
//             Siap mengubah rutinitas rambut Anda?
//           </h2>
//           <p className="mt-4 mb-10 text-lg text-gray-400">
//             Bergabunglah dengan ribuan pelanggan yang telah merasakan keajaiban Ethereal Glow Brush dan rangkaian produk Gycora lainnya.
//           </p>
//           {!userData && (
//              <button onClick={() => navigate("/register")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Mulai Perjalanan Anda Sekarang
//              </button>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api"; 

// // --- IMPORT 5 GAMBAR DARI LOKAL UNTUK SLIDER ---
// import slide1 from "/landing_page_images/hero_slide_1.jpg";
// import slide2 from "/landing_page_images/hero_slide_2.jpg";
// import slide3 from "/landing_page_images/hero_slide_3.jpg";
// import slide4 from "/landing_page_images/hero_slide_4.jpg";
// import slide5 from "/landing_page_images/hero_slide_5.jpg"; 

// const heroSlides = [
//   { id: 1, image: slide1, alt: "Gycora Premium Hair Care 1" },
//   { id: 2, image: slide2, alt: "Gycora Premium Hair Care 2" },
//   { id: 3, image: slide3, alt: "Gycora Premium Hair Care 3" },
//   { id: 4, image: slide4, alt: "Gycora Premium Hair Care 4" },
//   { id: 5, image: slide5, alt: "Gycora Premium Hair Care 5" },
// ];

// // --- DATA DUMMY TESTIMONI ---
// const testimonials = [
//   {
//     id: 1,
//     name: "Amanda S.",
//     role: "Verified Buyer",
//     text: "Ethereal Glow Brush benar-benar mengubah hidup saya. Rambut yang biasanya rontok saat disisir sekarang sangat mudah diatur dan jauh lebih berkilau!",
//     rating: 5
//   },
//   {
//     id: 2,
//     name: "Rina Kartika",
//     role: "Gycora Member",
//     text: "Wangi dari Revitalizing Shampoo sangat elegan dan tahan lama. Kulit kepala terasa lebih bersih tanpa membuat ujung rambut menjadi kering.",
//     rating: 5
//   },
//   {
//     id: 3,
//     name: "Jessica W.",
//     role: "Verified Buyer",
//     text: "Awalnya ragu, tapi setelah mencoba Argan Hair Serum selama 2 minggu, ujung rambut bercabang saya benar-benar membaik. Sangat direkomendasikan!",
//     rating: 4
//   }
// ];

// export default function Home() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
  
//   // State untuk Carousel
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // State untuk Featured Products (Mengambil data asli dari API)
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
//   const [isLoadingProducts, setIsLoadingProducts] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user_data");
//     if (storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }

//     // Mengambil Produk Bestseller/Featured dari API (Data Real)
//     const fetchFeaturedProducts = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (res.ok) {
//           const data = await res.json();
//           const productsArray = data.data ? data.data : data;
//           setFeaturedProducts(productsArray.slice(0, 3) || []);
//         }
//       } catch (error) {
//         console.error("Gagal memuat produk unggulan:", error);
//       } finally {
//         setIsLoadingProducts(false);
//       }
//     };

//     fetchFeaturedProducts();
//   }, []);

//   // Efek Autoplay untuk Slider
//   useEffect(() => {
//     if (userData) return; 

//     const slideInterval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
//     }, 4000); 

//     return () => clearInterval(slideInterval);
//   }, [userData]);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
//   };

//   return (
//     <div className="font-sans bg-white">
      
//       {/* =========================================
//           1. HERO SECTION
//       ========================================= */}
//       <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
//         <div className="absolute top-0 -translate-x-1/2 left-1/2 -z-10">
//           <div className="w-[800px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
//         </div>

//         <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32">
//           {userData ? (
//             // TAMPILAN JIKA USER SUDAH LOGIN
//             <div className="max-w-4xl mx-auto space-y-8 text-center animate-fade-in-up">
//               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                 <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
//                 Gycora Exclusive Member
//               </div>
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
//                 Selamat datang kembali, <span className="text-gycora">{userData.first_name}</span>.
//               </h1>
//               <p className="max-w-2xl mx-auto text-lg text-gray-500 sm:text-xl">
//                 Katalog rambut premium terbaru kami sudah menanti Anda. Nikmati penawaran eksklusif, lacak pesanan, dan dapatkan kemudahan berbelanja khusus untuk member Gycora.
//               </p>
//               <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
//                 <button onClick={() => navigate("/products")} className="px-8 py-3.5 text-base font-bold text-white transition-all bg-gray-900 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5">
//                   Lanjutkan Belanja
//                 </button>
//                 <button onClick={() => navigate("/profile")} className="px-8 py-3.5 text-base font-bold text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                   Profil & Pesanan Saya
//                 </button>
//               </div>
//             </div>
//           ) : (
//             // TAMPILAN JIKA GUEST (BELUM LOGIN)
//             <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
//               <div className="space-y-8 animate-fade-in-up">
//                 <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                   ✨ Solusi Perawatan Rambut Premium
//                 </div>
//                 <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
//                   Tingkatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-gycora to-emerald-400">Pesona</span><br /> Mahkota Anda.
//                 </h1>
//                 <p className="text-lg leading-relaxed text-gray-500 sm:text-xl">
//                   Temukan koleksi eksklusif Gycora. Diformulasikan dengan teknologi mutakhir dan bahan premium untuk rambut yang lebih sehat, bersinar, dan bebas kusut dari akar hingga ujung.
//                 </p>
//                 <div className="flex flex-col gap-4 pt-4 sm:flex-row">
//                   <Link to="/products" className="px-8 py-4 text-lg font-bold text-center text-white transition-all rounded-full bg-gycora hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5">
//                     Eksplorasi Katalog
//                   </Link>
//                   <Link to="/register" className="px-8 py-4 text-lg font-bold text-center text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                     Daftar Member
//                   </Link>
//                 </div>
//               </div>
              
//               {/* IMAGE CAROUSEL AREA */}
//               <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//                 <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-pink-50 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
                
//                 <div className="relative w-full overflow-hidden shadow-2xl h-[500px] rounded-[3rem] group">
//                   {heroSlides.map((slide, index) => (
//                     <img 
//                       key={slide.id}
//                       src={slide.image} 
//                       alt={slide.alt} 
//                       className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
//                     />
//                   ))}

//                   <div className="absolute inset-0 flex items-center justify-between px-4 transition-opacity opacity-0 group-hover:opacity-100">
//                     <button onClick={() => setCurrentSlide(prev => prev === 0 ? heroSlides.length - 1 : prev - 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                     </button>
//                     <button onClick={() => setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                     </button>
//                   </div>

//                   <div className="absolute flex justify-center w-full gap-2 bottom-6">
//                     {heroSlides.map((_, index) => (
//                       <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${index === currentSlide ? 'w-8 bg-gycora' : 'w-2.5 bg-white/70 hover:bg-white'}`} aria-label={`Slide ${index + 1}`}></button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =========================================
//           2. SHOP BY CATEGORY (SEKSI BARU)
//       ========================================= */}
//       <div className="py-24 bg-white border-t border-gray-100">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-12 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Kategori Terpopuler</h2>
//             <p className="mt-4 text-gray-500">Jelajahi rangkaian produk spesifik untuk setiap kebutuhan mahkota Anda.</p>
//           </div>
          
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//             {/* Category 1 */}
//             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
//               <img src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Hair Care" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
//               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
//               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
//                 <h3 className="text-2xl font-bold text-white">Hair Care</h3>
//                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Shampoo, Conditioner & Serum</p>
//               </div>
//             </Link>
            
//             {/* Category 2 */}
//             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
//               <img src="https://images.unsplash.com/photo-1598440947619-2ce6598c4e1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tools & Accessories" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
//               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
//               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
//                 <h3 className="text-2xl font-bold text-white">Tools & Brushes</h3>
//                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Anti-Static & Detangling</p>
//               </div>
//             </Link>

//             {/* Category 3 */}
//             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
//               <img src="https://images.unsplash.com/photo-1615397323218-c2bda069f9d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Bundles & Gift Sets" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
//               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
//               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
//                 <h3 className="text-2xl font-bold text-white">Bundles & Gifts</h3>
//                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Set Lengkap & Promo Spesial</p>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           3. VALUE PROPOSITION (MENGAPA GYCORA?)
//       ========================================= */}
//       <div className="py-24 border-gray-100 bg-gray-50 border-y">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Teknologi Anti-Statis</h3>
//               <p className="leading-relaxed text-gray-500">Molekul karbon konduktif pada sisir kami menetralkan listrik statis, mencegah rambut kusut dan rusak seketika.</p>
//             </div>
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Bahan Baku Premium</h3>
//               <p className="leading-relaxed text-gray-500">Setiap tetes diformulasikan dengan bahan baku berkualitas tinggi yang aman dan teruji klinis untuk kesehatan kulit kepala.</p>
//             </div>
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Cruelty-Free</h3>
//               <p className="leading-relaxed text-gray-500">Kecantikan sejati tidak menyakiti. Seluruh lini produk Gycora 100% bebas dari uji coba pada hewan.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           4. FEATURED PRODUCTS (PRODUK UNGGULAN DINAMIS)
//       ========================================= */}
//       <div className="py-24 bg-white">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-between mb-12 sm:flex-row">
//             <div>
//               <h2 className="text-3xl font-extrabold text-gray-900">Produk Terlaris Kami</h2>
//               <p className="mt-2 text-gray-500">Pilihan favorit pelanggan Gycora bulan ini.</p>
//             </div>
//             <Link to="/products" className="hidden font-bold transition-colors sm:block text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>

//           {isLoadingProducts ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="bg-white border border-gray-100 shadow-sm rounded-2xl animate-pulse">
//                   <div className="w-full bg-gray-200 aspect-square rounded-t-2xl"></div>
//                   <div className="p-6 space-y-3">
//                     <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
//                     <div className="w-full h-4 bg-gray-200 rounded"></div>
//                     <div className="w-1/2 h-6 mt-4 bg-gray-200 rounded"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : featuredProducts.length > 0 ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {featuredProducts.map((product) => (
//                 <div 
//                   key={product.id} 
//                   className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md cursor-pointer group rounded-2xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1" 
//                   onClick={() => navigate(`/product/${product.id}`)}
//                 >
//                   <div className="relative overflow-hidden bg-gray-100 aspect-square">
//                     <img 
//                       src={product.image_url} 
//                       alt={product.name} 
//                       className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
//                     />
//                     <div className="absolute px-3 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-full shadow-sm top-4 left-4 bg-white/90 backdrop-blur-sm">
//                       {product.category?.name || "Gycora"}
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
//                     <p className="mb-4 text-sm text-gray-500 line-clamp-2">
//                       {product.description || "Temukan kilau alami rambut Anda dengan perawatan eksklusif dari Gycora."}
//                     </p>
//                     <div className="flex items-center justify-between">
//                       <span className="text-xl font-extrabold text-gycora">{formatRupiah(product.price)}</span>
//                       <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="py-12 italic text-center text-gray-500">Belum ada produk yang tersedia.</div>
//           )}
          
//           <div className="mt-8 text-center sm:hidden">
//             <Link to="/products" className="font-bold transition-colors text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>
//         </div>
//       </div> 

//       {/* =========================================
//           5. TESTIMONIALS / SOCIAL PROOF (SEKSI BARU)
//       ========================================= */}
//       <div className="py-24 border-t border-gray-100 bg-emerald-50/50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-16 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Kata Mereka Tentang Gycora</h2>
//             <p className="mt-4 text-gray-500">Ulasan jujur dari pelanggan setia yang telah membuktikan kualitas kami.</p>
//           </div>

//           <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//             {testimonials.map((testi) => (
//               <div key={testi.id} className="p-8 bg-white border border-gray-100 shadow-sm rounded-3xl">
//                 <div className="flex gap-1 mb-4 text-amber-400">
//                   {[...Array(testi.rating)].map((_, i) => (
//                     <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
//                   ))}
//                 </div>
//                 <p className="mb-6 italic text-gray-600">"{testi.text}"</p>
//                 <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
//                   <div className="flex items-center justify-center w-10 h-10 font-bold rounded-full bg-emerald-100 text-emerald-700">
//                     {testi.name.charAt(0)}
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-bold text-gray-900">{testi.name}</h4>
//                     <p className="text-xs text-gray-500">{testi.role}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           6. CTA (CALL TO ACTION) / NEWSLETTER
//       ========================================= */}
//       <div className="relative py-24 overflow-hidden bg-gray-900">
//         {/* Dekorasi Glow */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gycora rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        
//         <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
//             Siap mengubah rutinitas rambut Anda?
//           </h2>
//           <p className="mt-4 mb-10 text-lg text-gray-400">
//             Bergabunglah dengan ribuan pelanggan yang telah merasakan keajaiban Ethereal Glow Brush dan rangkaian produk Gycora lainnya.
//           </p>
//           {!userData ? (
//              <button onClick={() => navigate("/register")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Mulai Perjalanan Anda Sekarang
//              </button>
//           ) : (
//             <button onClick={() => navigate("/products")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Belanja Koleksi Kami
//             </button>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api"; 
// import Swal from "sweetalert2"; // Pastikan Swal di-import untuk notifikasi langganan

// // --- IMPORT 5 GAMBAR DARI LOKAL UNTUK SLIDER ---
// import slide1 from "/landing_page_images/hero_slide_1.jpg";
// import slide2 from "/landing_page_images/hero_slide_2.jpg";
// import slide3 from "/landing_page_images/hero_slide_3.jpg";
// import slide4 from "/landing_page_images/hero_slide_4.jpg";
// import slide5 from "/landing_page_images/hero_slide_5.jpg"; 

// const heroSlides = [
//   { id: 1, image: slide1, alt: "Gycora Premium Hair Care 1" },
//   { id: 2, image: slide2, alt: "Gycora Premium Hair Care 2" },
//   { id: 3, image: slide3, alt: "Gycora Premium Hair Care 3" },
//   { id: 4, image: slide4, alt: "Gycora Premium Hair Care 4" },
//   { id: 5, image: slide5, alt: "Gycora Premium Hair Care 5" },
// ];

// const testimonials = [
//   { id: 1, name: "Amanda S.", role: "Verified Buyer", text: "Ethereal Glow Brush benar-benar mengubah hidup saya. Rambut yang biasanya rontok saat disisir sekarang sangat mudah diatur dan jauh lebih berkilau!", rating: 5 },
//   { id: 2, name: "Rina Kartika", role: "Gycora Member", text: "Wangi dari Revitalizing Shampoo sangat elegan dan tahan lama. Kulit kepala terasa lebih bersih tanpa membuat ujung rambut menjadi kering.", rating: 5 },
//   { id: 3, name: "Jessica W.", role: "Verified Buyer", text: "Awalnya ragu, tapi setelah mencoba Argan Hair Serum selama 2 minggu, ujung rambut bercabang saya benar-benar membaik. Sangat direkomendasikan!", rating: 4 }
// ];

// export default function Home() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
  
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
//   const [isLoadingProducts, setIsLoadingProducts] = useState(true);

//   // --- STATE UNTUK POP-UP PROMO ---
//   const [showPromoModal, setShowPromoModal] = useState(false);
//   const [promoEmail, setPromoEmail] = useState("");
//   const [isSubscribing, setIsSubscribing] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user_data");
//     if (storedUser) {
//       setUserData(JSON.parse(storedUser));
//     } else {
//       // Tampilkan Promo Modal hanya untuk Guest yang belum pernah melihatnya di sesi ini
//       const hasSeenPromo = sessionStorage.getItem("hasSeenPromo");
//       if (!hasSeenPromo) {
//         // Delay sedikit agar lebih natural setelah halaman dimuat
//         const timer = setTimeout(() => {
//           setShowPromoModal(true);
//         }, 1500);
//         return () => clearTimeout(timer);
//       }
//     }

//     const fetchFeaturedProducts = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (res.ok) {
//           const data = await res.json();
//           const productsArray = data.data ? data.data : data;
//           setFeaturedProducts(productsArray.slice(0, 3) || []);
//         }
//       } catch (error) {
//         console.error("Gagal memuat produk unggulan:", error);
//       } finally {
//         setIsLoadingProducts(false);
//       }
//     };

//     fetchFeaturedProducts();
//   }, []);

//   useEffect(() => {
//     if (userData) return; 
//     const slideInterval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
//     }, 4000); 
//     return () => clearInterval(slideInterval);
//   }, [userData]);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
//   };

//   // --- HANDLER TUTUP PROMO & SUBMIT ---
//   const closePromoModal = () => {
//     setShowPromoModal(false);
//     sessionStorage.setItem("hasSeenPromo", "true"); // Tandai agar tidak muncul lagi di tab ini
//   };

//   const handleSubscribePromo = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!promoEmail) return;
    
//     setIsSubscribing(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/subscribe`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Accept": "application/json" },
//         body: JSON.stringify({ email: promoEmail }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         closePromoModal();
//         Swal.fire({
//           icon: "success",
//           title: "Berhasil!",
//           text: "Cek email Anda untuk kode voucher 50% Gycora.",
//           confirmButtonColor: "#059669",
//         });
//       } else {
//         Swal.fire({ icon: "warning", title: "Pemberitahuan", text: data.message || "Gagal berlangganan.", confirmButtonColor: "#d33" });
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire({ icon: "error", title: "Gagal", text: "Terjadi kesalahan server.", confirmButtonColor: "#d33" });
//     } finally {
//       setIsSubscribing(false);
//     }
//   };

//   return (
//     <div className="relative font-sans bg-white">
      
//       {/* =========================================
//           POP-UP PROMO MODAL (GUEST ONLY)
//       ========================================= */}
//       {showPromoModal && !userData && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
//           <div className="relative flex flex-col w-full max-w-3xl overflow-hidden bg-white shadow-2xl md:flex-row rounded-2xl">
            
//             {/* Tombol Close */}
//             <button 
//               onClick={closePromoModal}
//               className="absolute z-10 flex items-center justify-center w-8 h-8 text-gray-500 transition-colors bg-white rounded-full shadow-md top-4 right-4 hover:bg-gray-100 hover:text-gray-900"
//             >
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//             </button>

//             {/* Bagian Kiri: Teks & Form */}
//             <div className="flex flex-col justify-center flex-1 p-8 md:p-12">
//               <h2 className="mb-2 font-serif text-4xl font-black tracking-tight text-gray-900 uppercase">Gycora</h2>
//               <h3 className="mb-4 text-3xl font-extrabold leading-tight text-gycora-dark">
//                 Dapatkan Diskon 50% + Produk Spesial
//               </h3>
//               <p className="mb-8 text-sm font-medium text-gray-500">
//                 Daftarkan Email & SMS untuk mendapatkan penawaran eksklusif, tips kecantikan, dan banyak lagi dari kami!
//               </p>
              
//               <form onSubmit={handleSubscribePromo} className="space-y-4">
//                 <input 
//                   type="email" 
//                   value={promoEmail}
//                   onChange={(e) => setPromoEmail(e.target.value)}
//                   placeholder="Masukkan Email Anda" 
//                   className="w-full px-4 py-3 text-sm transition-all border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gycora"
//                   required
//                 />
//                 <button 
//                   type="submit" 
//                   disabled={isSubscribing}
//                   className="w-full px-4 py-3 text-sm font-bold tracking-widest text-white uppercase transition-all bg-gray-900 rounded-lg hover:bg-black disabled:bg-gray-400"
//                 >
//                   {isSubscribing ? "Memproses..." : "Continue"}
//                 </button>
//               </form>
              
//               <p className="mt-4 text-[9px] text-gray-400 leading-relaxed">
//                 *Penawaran hanya berlaku untuk pesanan pertama di atas Rp 200.000. Tidak dapat digabungkan dengan promo lain.
//               </p>
//             </div>

//             {/* Bagian Kanan: Gambar Pemanis (Akan disembunyikan di layar kecil) */}
//             <div className="hidden w-full md:block md:w-5/12 bg-emerald-50">
//               <img 
//                 src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
//                 alt="Promo Gycora" 
//                 className="object-cover w-full h-full"
//               />
//             </div>

//           </div>
//         </div>
//       )}


//       {/* =========================================
//           1. HERO SECTION
//       ========================================= */}
//       <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
//         <div className="absolute top-0 -translate-x-1/2 left-1/2 -z-10">
//           <div className="w-[800px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
//         </div>

//         <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32">
//           {userData ? (
//             <div className="max-w-4xl mx-auto space-y-8 text-center animate-fade-in-up">
//               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                 <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
//                 Gycora Exclusive Member
//               </div>
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
//                 Selamat datang kembali, <span className="text-gycora">{userData.first_name}</span>.
//               </h1>
//               <p className="max-w-2xl mx-auto text-lg text-gray-500 sm:text-xl">
//                 Katalog rambut premium terbaru kami sudah menanti Anda. Nikmati penawaran eksklusif, lacak pesanan, dan dapatkan kemudahan berbelanja khusus untuk member Gycora.
//               </p>
//               <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
//                 <button onClick={() => navigate("/products")} className="px-8 py-3.5 text-base font-bold text-white transition-all bg-gray-900 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5">
//                   Lanjutkan Belanja
//                 </button>
//                 <button onClick={() => navigate("/profile")} className="px-8 py-3.5 text-base font-bold text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                   Profil & Pesanan Saya
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
//               <div className="space-y-8 animate-fade-in-up">
//                 <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                   ✨ Solusi Perawatan Rambut Premium
//                 </div>
//                 <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
//                   Tingkatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-gycora to-emerald-400">Pesona</span><br /> Mahkota Anda.
//                 </h1>
//                 <p className="text-lg leading-relaxed text-gray-500 sm:text-xl">
//                   Temukan koleksi eksklusif Gycora. Diformulasikan dengan teknologi mutakhir dan bahan premium untuk rambut yang lebih sehat, bersinar, dan bebas kusut dari akar hingga ujung.
//                 </p>
//                 <div className="flex flex-col gap-4 pt-4 sm:flex-row">
//                   <Link to="/products" className="px-8 py-4 text-lg font-bold text-center text-white transition-all rounded-full bg-gycora hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5">
//                     Eksplorasi Katalog
//                   </Link>
//                   <Link to="/register" className="px-8 py-4 text-lg font-bold text-center text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                     Daftar Member
//                   </Link>
//                 </div>
//               </div>
              
//               <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//                 <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-pink-50 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
                
//                 <div className="relative w-full overflow-hidden shadow-2xl h-[500px] rounded-[3rem] group">
//                   {heroSlides.map((slide, index) => (
//                     <img 
//                       key={slide.id}
//                       src={slide.image} 
//                       alt={slide.alt} 
//                       className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
//                     />
//                   ))}

//                   <div className="absolute inset-0 flex items-center justify-between px-4 transition-opacity opacity-0 group-hover:opacity-100">
//                     <button onClick={() => setCurrentSlide(prev => prev === 0 ? heroSlides.length - 1 : prev - 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                     </button>
//                     <button onClick={() => setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                     </button>
//                   </div>

//                   <div className="absolute flex justify-center w-full gap-2 bottom-6">
//                     {heroSlides.map((_, index) => (
//                       <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${index === currentSlide ? 'w-8 bg-gycora' : 'w-2.5 bg-white/70 hover:bg-white'}`} aria-label={`Slide ${index + 1}`}></button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =========================================
//           2. SHOP BY CATEGORY (SEKSI BARU)
//       ========================================= */}
//       <div className="py-24 bg-white border-t border-gray-100">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-12 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Kategori Terpopuler</h2>
//             <p className="mt-4 text-gray-500">Jelajahi rangkaian produk spesifik untuk setiap kebutuhan mahkota Anda.</p>
//           </div>
          
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
//               <img src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Hair Care" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
//               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
//               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
//                 <h3 className="text-2xl font-bold text-white">Hair Care</h3>
//                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Shampoo, Conditioner & Serum</p>
//               </div>
//             </Link>
            
//             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
//               <img src="https://images.unsplash.com/photo-1598440947619-2ce6598c4e1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tools & Accessories" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
//               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
//               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
//                 <h3 className="text-2xl font-bold text-white">Tools & Brushes</h3>
//                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Anti-Static & Detangling</p>
//               </div>
//             </Link>

//             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
//               <img src="https://images.unsplash.com/photo-1615397323218-c2bda069f9d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Bundles & Gift Sets" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
//               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
//               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
//                 <h3 className="text-2xl font-bold text-white">Bundles & Gifts</h3>
//                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Set Lengkap & Promo Spesial</p>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           3. VALUE PROPOSITION (MENGAPA GYCORA?)
//       ========================================= */}
//       <div className="py-24 border-gray-100 bg-gray-50 border-y">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Teknologi Anti-Statis</h3>
//               <p className="leading-relaxed text-gray-500">Molekul karbon konduktif pada sisir kami menetralkan listrik statis, mencegah rambut kusut dan rusak seketika.</p>
//             </div>
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Bahan Baku Premium</h3>
//               <p className="leading-relaxed text-gray-500">Setiap tetes diformulasikan dengan bahan baku berkualitas tinggi yang aman dan teruji klinis untuk kesehatan kulit kepala.</p>
//             </div>
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Cruelty-Free</h3>
//               <p className="leading-relaxed text-gray-500">Kecantikan sejati tidak menyakiti. Seluruh lini produk Gycora 100% bebas dari uji coba pada hewan.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           4. FEATURED PRODUCTS (PRODUK UNGGULAN DINAMIS)
//       ========================================= */}
//       <div className="py-24 bg-white">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-between mb-12 sm:flex-row">
//             <div>
//               <h2 className="text-3xl font-extrabold text-gray-900">Produk Terlaris Kami</h2>
//               <p className="mt-2 text-gray-500">Pilihan favorit pelanggan Gycora bulan ini.</p>
//             </div>
//             <Link to="/products" className="hidden font-bold transition-colors sm:block text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>

//           {isLoadingProducts ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="bg-white border border-gray-100 shadow-sm rounded-2xl animate-pulse">
//                   <div className="w-full bg-gray-200 aspect-square rounded-t-2xl"></div>
//                   <div className="p-6 space-y-3">
//                     <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
//                     <div className="w-full h-4 bg-gray-200 rounded"></div>
//                     <div className="w-1/2 h-6 mt-4 bg-gray-200 rounded"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : featuredProducts.length > 0 ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {featuredProducts.map((product) => (
//                 <div 
//                   key={product.id} 
//                   className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md cursor-pointer group rounded-2xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1" 
//                   onClick={() => navigate(`/product/${product.id}`)}
//                 >
//                   <div className="relative overflow-hidden bg-gray-100 aspect-square">
//                     <img 
//                       src={product.image_url} 
//                       alt={product.name} 
//                       className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
//                     />
//                     <div className="absolute px-3 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-full shadow-sm top-4 left-4 bg-white/90 backdrop-blur-sm">
//                       {product.category?.name || "Gycora"}
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
//                     <p className="mb-4 text-sm text-gray-500 line-clamp-2">
//                       {product.description || "Temukan kilau alami rambut Anda dengan perawatan eksklusif dari Gycora."}
//                     </p>
//                     <div className="flex items-center justify-between">
//                       <span className="text-xl font-extrabold text-gycora">{formatRupiah(product.price)}</span>
//                       <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="py-12 italic text-center text-gray-500">Belum ada produk yang tersedia.</div>
//           )}
          
//           <div className="mt-8 text-center sm:hidden">
//             <Link to="/products" className="font-bold transition-colors text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>
//         </div>
//       </div> 

//       {/* =========================================
//           5. TESTIMONIALS / SOCIAL PROOF (SEKSI BARU)
//       ========================================= */}
//       <div className="py-24 border-t border-gray-100 bg-emerald-50/50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-16 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Kata Mereka Tentang Gycora</h2>
//             <p className="mt-4 text-gray-500">Ulasan jujur dari pelanggan setia yang telah membuktikan kualitas kami.</p>
//           </div>

//           <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//             {testimonials.map((testi) => (
//               <div key={testi.id} className="p-8 bg-white border border-gray-100 shadow-sm rounded-3xl">
//                 <div className="flex gap-1 mb-4 text-amber-400">
//                   {[...Array(testi.rating)].map((_, i) => (
//                     <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
//                   ))}
//                 </div>
//                 <p className="mb-6 italic text-gray-600">"{testi.text}"</p>
//                 <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
//                   <div className="flex items-center justify-center w-10 h-10 font-bold rounded-full bg-emerald-100 text-emerald-700">
//                     {testi.name.charAt(0)}
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-bold text-gray-900">{testi.name}</h4>
//                     <p className="text-xs text-gray-500">{testi.role}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           6. CTA (CALL TO ACTION) / NEWSLETTER
//       ========================================= */}
//       <div className="relative py-24 overflow-hidden bg-gray-900">
//         {/* Dekorasi Glow */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gycora rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        
//         <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
//             Siap mengubah rutinitas rambut Anda?
//           </h2>
//           <p className="mt-4 mb-10 text-lg text-gray-400">
//             Bergabunglah dengan ribuan pelanggan yang telah merasakan keajaiban Ethereal Glow Brush dan rangkaian produk Gycora lainnya.
//           </p>
//           {!userData ? (
//              <button onClick={() => navigate("/register")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Mulai Perjalanan Anda Sekarang
//              </button>
//           ) : (
//             <button onClick={() => navigate("/products")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Belanja Koleksi Kami
//             </button>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }

  // import { useState, useEffect } from "react";
  // import { Link, useNavigate } from "react-router-dom";
  // import { BASE_URL } from "../../config/api"; 
  // import Swal from "sweetalert2"; // Pastikan Swal di-import untuk notifikasi langganan

  // // --- IMPORT 5 GAMBAR DARI LOKAL UNTUK SLIDER ---
  // import slide1 from "/landing_page_images/hero_slide_1.jpg";
  // import slide2 from "/landing_page_images/hero_slide_2.jpg";
  // import slide3 from "/landing_page_images/hero_slide_3.jpg";
  // import slide4 from "/landing_page_images/hero_slide_4.jpg";
  // import slide5 from "/landing_page_images/hero_slide_5.jpg"; 

  // const heroSlides = [
  //   { id: 1, image: slide1, alt: "Gycora Premium Hair Care 1" },
  //   { id: 2, image: slide2, alt: "Gycora Premium Hair Care 2" },
  //   { id: 3, image: slide3, alt: "Gycora Premium Hair Care 3" },
  //   { id: 4, image: slide4, alt: "Gycora Premium Hair Care 4" },
  //   { id: 5, image: slide5, alt: "Gycora Premium Hair Care 5" },
  // ];

  // const testimonials = [
  //   { id: 1, name: "Amanda S.", role: "Verified Buyer", text: "Ethereal Glow Brush benar-benar mengubah hidup saya. Rambut yang biasanya rontok saat disisir sekarang sangat mudah diatur dan jauh lebih berkilau!", rating: 5 },
  //   { id: 2, name: "Rina Kartika", role: "Gycora Member", text: "Wangi dari Revitalizing Shampoo sangat elegan dan tahan lama. Kulit kepala terasa lebih bersih tanpa membuat ujung rambut menjadi kering.", rating: 5 },
  //   { id: 3, name: "Jessica W.", role: "Verified Buyer", text: "Awalnya ragu, tapi setelah mencoba Argan Hair Serum selama 2 minggu, ujung rambut bercabang saya benar-benar membaik. Sangat direkomendasikan!", rating: 4 }
  // ];

  // export default function Home() {
  //   const navigate = useNavigate();
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   const [userData, setUserData] = useState<any>(null);
  //   const [currentSlide, setCurrentSlide] = useState(0);
    
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  //   const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  //   // --- STATE UNTUK POP-UP PROMO ---
  //   const [showPromoModal, setShowPromoModal] = useState(false);
  //   const [promoEmail, setPromoEmail] = useState("");
  //   const [isSubscribing, setIsSubscribing] = useState(false);

  //   useEffect(() => {
  //     const storedUser = localStorage.getItem("user_data");
  //     if (storedUser) {
  //       setUserData(JSON.parse(storedUser));
  //     } else {
  //       // Tampilkan Promo Modal hanya untuk Guest yang belum pernah melihatnya di sesi ini
  //       const hasSeenPromo = sessionStorage.getItem("hasSeenPromo");
  //       if (!hasSeenPromo) {
  //         // Delay sedikit agar lebih natural setelah halaman dimuat
  //         const timer = setTimeout(() => {
  //           setShowPromoModal(true);
  //         }, 1500);
  //         return () => clearTimeout(timer);
  //       }
  //     }

  //     const fetchFeaturedProducts = async () => {
  //       try {
  //         const res = await fetch(`${BASE_URL}/api/products`);
  //         if (res.ok) {
  //           const data = await res.json();
  //           const productsArray = data.data ? data.data : data;
  //           setFeaturedProducts(productsArray.slice(0, 3) || []);
  //         }
  //       } catch (error) {
  //         console.error("Gagal memuat produk unggulan:", error);
  //       } finally {
  //         setIsLoadingProducts(false);
  //       }
  //     };

  //     fetchFeaturedProducts();
  //   }, []);

  //   useEffect(() => {
  //     if (userData) return; 
  //     const slideInterval = setInterval(() => {
  //       setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  //     }, 4000); 
  //     return () => clearInterval(slideInterval);
  //   }, [userData]);

  //   const formatRupiah = (angka: number) => {
  //     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
  //   };

  //   // --- HANDLER TUTUP PROMO & SUBMIT ---
  //   const closePromoModal = () => {
  //     setShowPromoModal(false);
  //     sessionStorage.setItem("hasSeenPromo", "true"); // Tandai agar tidak muncul lagi di tab ini
  //   };

  //   const handleSubscribePromo = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     if (!promoEmail) return;
      
  //     setIsSubscribing(true);
  //     try {
  //       const res = await fetch(`${BASE_URL}/api/subscribe`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json", "Accept": "application/json" },
  //         body: JSON.stringify({ email: promoEmail }),
  //       });

  //       const data = await res.json();

  //       if (res.ok) {
  //         closePromoModal();
  //         Swal.fire({
  //           icon: "success",
  //           title: "Berhasil!",
  //           text: "Cek email Anda untuk kode voucher 50% Gycora.",
  //           confirmButtonColor: "#059669",
  //         });
  //       } else {
  //         Swal.fire({ icon: "warning", title: "Pemberitahuan", text: data.message || "Gagal berlangganan.", confirmButtonColor: "#d33" });
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       Swal.fire({ icon: "error", title: "Gagal", text: "Terjadi kesalahan server.", confirmButtonColor: "#d33" });
  //     } finally {
  //       setIsSubscribing(false);
  //     }
  //   };

  //   return (
  //     <div className="relative font-sans bg-white">
        
  //       {/* =========================================
  //           POP-UP PROMO MODAL (GUEST ONLY)
  //       ========================================= */}
  //       {showPromoModal && !userData && (
  //         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
  //           <div className="relative flex flex-col w-full max-w-3xl overflow-hidden bg-white shadow-2xl md:flex-row rounded-2xl">
              
  //             {/* Tombol Close */}
  //             <button 
  //               onClick={closePromoModal}
  //               className="absolute z-10 flex items-center justify-center w-8 h-8 text-gray-500 transition-colors bg-white rounded-full shadow-md top-4 right-4 hover:bg-gray-100 hover:text-gray-900"
  //             >
  //               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
  //             </button>

  //             {/* Bagian Kiri: Teks & Form */}
  //             <div className="flex flex-col justify-center flex-1 p-8 md:p-12">
  //               <h2 className="mb-2 font-serif text-4xl font-black tracking-tight text-gray-900 uppercase">Gycora</h2>
  //               <h3 className="mb-4 text-3xl font-extrabold leading-tight text-gycora-dark">
  //                 Dapatkan Diskon 50% + Produk Spesial
  //               </h3>
  //               <p className="mb-8 text-sm font-medium text-gray-500">
  //                 Daftarkan Email & SMS untuk mendapatkan penawaran eksklusif, tips kecantikan, dan banyak lagi dari kami!
  //               </p>
                
  //               <form onSubmit={handleSubscribePromo} className="space-y-4">
  //                 <input 
  //                   type="email" 
  //                   value={promoEmail}
  //                   onChange={(e) => setPromoEmail(e.target.value)}
  //                   placeholder="Masukkan Email Anda" 
  //                   className="w-full px-4 py-3 text-sm transition-all border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gycora"
  //                   required
  //                 />
  //                 <button 
  //                   type="submit" 
  //                   disabled={isSubscribing}
  //                   className="w-full px-4 py-3 text-sm font-bold tracking-widest text-white uppercase transition-all bg-gray-900 rounded-lg hover:bg-black disabled:bg-gray-400"
  //                 >
  //                   {isSubscribing ? "Memproses..." : "Continue"}
  //                 </button>
  //               </form>
                
  //               <p className="mt-4 text-[9px] text-gray-400 leading-relaxed">
  //                 *Penawaran hanya berlaku untuk pesanan pertama di atas Rp 200.000. Tidak dapat digabungkan dengan promo lain.
  //               </p>
  //             </div>

  //             {/* Bagian Kanan: Gambar Pemanis (Akan disembunyikan di layar kecil) */}
  //             <div className="hidden w-full md:block md:w-5/12 bg-emerald-50">
  //               <img 
  //                 src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
  //                 alt="Promo Gycora" 
  //                 className="object-cover w-full h-full"
  //               />
  //             </div>

  //           </div>
  //         </div>
  //       )}


  //       {/* =========================================
  //           1. HERO SECTION
  //       ========================================= */}
  //       <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
  //         <div className="absolute top-0 -translate-x-1/2 left-1/2 -z-10">
  //           <div className="w-[800px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
  //         </div>

  //         <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32">
  //           {userData ? (
  //             <div className="max-w-4xl mx-auto space-y-8 text-center animate-fade-in-up">
  //               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
  //                 <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
  //                 Gycora Exclusive Member
  //               </div>
  //               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
  //                 Selamat datang kembali, <span className="text-gycora">{userData.first_name}</span>.
  //               </h1>
  //               <p className="max-w-2xl mx-auto text-lg text-gray-500 sm:text-xl">
  //                 Katalog rambut premium terbaru kami sudah menanti Anda. Nikmati penawaran eksklusif, lacak pesanan, dan dapatkan kemudahan berbelanja khusus untuk member Gycora.
  //               </p>
  //               <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
  //                 <button onClick={() => navigate("/products")} className="px-8 py-3.5 text-base font-bold text-white transition-all bg-gray-900 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5">
  //                   Lanjutkan Belanja
  //                 </button>
  //                 <button onClick={() => navigate("/profile")} className="px-8 py-3.5 text-base font-bold text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
  //                   Profil & Pesanan Saya
  //                 </button>
  //               </div>
  //             </div>
  //           ) : (
  //             <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
  //               <div className="space-y-8 animate-fade-in-up">
  //                 <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
  //                   ✨ Solusi Perawatan Rambut Premium
  //                 </div>
  //                 <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
  //                   Tingkatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-gycora to-emerald-400">Pesona</span><br /> Mahkota Anda.
  //                 </h1>
  //                 <p className="text-lg leading-relaxed text-gray-500 sm:text-xl">
  //                   Temukan koleksi eksklusif Gycora. Diformulasikan dengan teknologi mutakhir dan bahan premium untuk rambut yang lebih sehat, bersinar, dan bebas kusut dari akar hingga ujung.
  //                 </p>
  //                 <div className="flex flex-col gap-4 pt-4 sm:flex-row">
  //                   <Link to="/products" className="px-8 py-4 text-lg font-bold text-center text-white transition-all rounded-full bg-gycora hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5">
  //                     Eksplorasi Katalog
  //                   </Link>
  //                   <Link to="/register" className="px-8 py-4 text-lg font-bold text-center text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
  //                     Daftar Member
  //                   </Link>
  //                 </div>
  //               </div>
                
  //               <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: "200ms" }}>
  //                 <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-pink-50 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
                  
  //                 <div className="relative w-full overflow-hidden shadow-2xl h-[500px] rounded-[3rem] group">
  //                   {heroSlides.map((slide, index) => (
  //                     <img 
  //                       key={slide.id}
  //                       src={slide.image} 
  //                       alt={slide.alt} 
  //                       className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
  //                     />
  //                   ))}

  //                   <div className="absolute inset-0 flex items-center justify-between px-4 transition-opacity opacity-0 group-hover:opacity-100">
  //                     <button onClick={() => setCurrentSlide(prev => prev === 0 ? heroSlides.length - 1 : prev - 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
  //                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
  //                     </button>
  //                     <button onClick={() => setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
  //                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
  //                     </button>
  //                   </div>

  //                   <div className="absolute flex justify-center w-full gap-2 bottom-6">
  //                     {heroSlides.map((_, index) => (
  //                       <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${index === currentSlide ? 'w-8 bg-gycora' : 'w-2.5 bg-white/70 hover:bg-white'}`} aria-label={`Slide ${index + 1}`}></button>
  //                     ))}
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           )}
  //         </div>
  //       </div>

  //       {/* =========================================
  //           2. SHOP BY CATEGORY (SEKSI BARU)
  //       ========================================= */}
  //       <div className="py-24 bg-white border-t border-gray-100">
  //         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
  //           <div className="mb-12 text-center">
  //             <h2 className="text-3xl font-extrabold text-gray-900">Kategori Terpopuler</h2>
  //             <p className="mt-4 text-gray-500">Jelajahi rangkaian produk spesifik untuk setiap kebutuhan mahkota Anda.</p>
  //           </div>
            
  //           <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
  //             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
  //               <img src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Hair Care" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
  //               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
  //               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
  //                 <h3 className="text-2xl font-bold text-white">Hair Care</h3>
  //                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Shampoo, Conditioner & Serum</p>
  //               </div>
  //             </Link>
              
  //             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
  //               <img src="https://images.unsplash.com/photo-1598440947619-2ce6598c4e1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tools & Accessories" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
  //               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
  //               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
  //                 <h3 className="text-2xl font-bold text-white">Tools & Brushes</h3>
  //                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Anti-Static & Detangling</p>
  //               </div>
  //             </Link>

  //             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
  //               <img src="https://images.unsplash.com/photo-1615397323218-c2bda069f9d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Bundles & Gift Sets" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
  //               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
  //               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
  //                 <h3 className="text-2xl font-bold text-white">Bundles & Gifts</h3>
  //                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Set Lengkap & Promo Spesial</p>
  //               </div>
  //             </Link>
  //           </div>
  //         </div>
  //       </div>

  //       {/* =========================================
  //           3. VALUE PROPOSITION (MENGAPA GYCORA?)
  //       ========================================= */}
  //       <div className="py-24 border-gray-100 bg-gray-50 border-y">
  //         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
  //           <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
  //             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
  //               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
  //                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  //               </div>
  //               <h3 className="mb-3 text-xl font-bold text-gray-900">Teknologi Anti-Statis</h3>
  //               <p className="leading-relaxed text-gray-500">Molekul karbon konduktif pada sisir kami menetralkan listrik statis, mencegah rambut kusut dan rusak seketika.</p>
  //             </div>
  //             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
  //               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
  //                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
  //               </div>
  //               <h3 className="mb-3 text-xl font-bold text-gray-900">Bahan Baku Premium</h3>
  //               <p className="leading-relaxed text-gray-500">Setiap tetes diformulasikan dengan bahan baku berkualitas tinggi yang aman dan teruji klinis untuk kesehatan kulit kepala.</p>
  //             </div>
  //             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
  //               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
  //                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
  //               </div>
  //               <h3 className="mb-3 text-xl font-bold text-gray-900">Cruelty-Free</h3>
  //               <p className="leading-relaxed text-gray-500">Kecantikan sejati tidak menyakiti. Seluruh lini produk Gycora 100% bebas dari uji coba pada hewan.</p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       {/* =========================================
  //           4. FEATURED PRODUCTS (PRODUK UNGGULAN DINAMIS)
  //       ========================================= */}
  //       <div className="py-24 bg-white">
  //         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
  //           <div className="flex flex-col items-center justify-between mb-12 sm:flex-row">
  //             <div>
  //               <h2 className="text-3xl font-extrabold text-gray-900">Produk Terlaris Kami</h2>
  //               <p className="mt-2 text-gray-500">Pilihan favorit pelanggan Gycora bulan ini.</p>
  //             </div>
  //             <Link to="/products" className="hidden font-bold transition-colors sm:block text-gycora hover:text-gycora-dark hover:underline">
  //               Lihat Semua Produk &rarr;
  //             </Link>
  //           </div>

  //           {isLoadingProducts ? (
  //             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
  //               {[1, 2, 3].map((i) => (
  //                 <div key={i} className="bg-white border border-gray-100 shadow-sm rounded-2xl animate-pulse">
  //                   <div className="w-full bg-gray-200 aspect-square rounded-t-2xl"></div>
  //                   <div className="p-6 space-y-3">
  //                     <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
  //                     <div className="w-full h-4 bg-gray-200 rounded"></div>
  //                     <div className="w-1/2 h-6 mt-4 bg-gray-200 rounded"></div>
  //                   </div>
  //                 </div>
  //               ))}
  //             </div>
  //           ) : featuredProducts.length > 0 ? (
  //             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
  //               {featuredProducts.map((product) => (
  //                 <div 
  //                   key={product.id} 
  //                   className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md cursor-pointer group rounded-2xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1" 
  //                   onClick={() => navigate(`/product/${product.id}`)}
  //                 >
  //                   <div className="relative overflow-hidden bg-gray-100 aspect-square">
  //                     <img 
  //                       src={product.image_url} 
  //                       alt={product.name} 
  //                       className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
  //                     />
  //                     <div className="absolute px-3 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-full shadow-sm top-4 left-4 bg-white/90 backdrop-blur-sm">
  //                       {product.category?.name || "Gycora"}
  //                     </div>
  //                   </div>
  //                   <div className="p-6">
  //                     <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
  //                     <p className="mb-4 text-sm text-gray-500 line-clamp-2">
  //                       {product.description || "Temukan kilau alami rambut Anda dengan perawatan eksklusif dari Gycora."}
  //                     </p>
  //                     <div className="flex items-center justify-between">
  //                       <span className="text-xl font-extrabold text-gycora">{formatRupiah(product.price)}</span>
  //                       <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
  //                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
  //                       </button>
  //                     </div>
  //                   </div>
  //                 </div>
  //               ))}
  //             </div>
  //           ) : (
  //             <div className="py-12 italic text-center text-gray-500">Belum ada produk yang tersedia.</div>
  //           )}
            
  //           <div className="mt-8 text-center sm:hidden">
  //             <Link to="/products" className="font-bold transition-colors text-gycora hover:text-gycora-dark hover:underline">
  //               Lihat Semua Produk &rarr;
  //             </Link>
  //           </div>
  //         </div>
  //       </div> 

  //       {/* =========================================
  //           5. TESTIMONIALS / SOCIAL PROOF (SEKSI BARU)
  //       ========================================= */}
  //       <div className="py-24 border-t border-gray-100 bg-emerald-50/50">
  //         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
  //           <div className="mb-16 text-center">
  //             <h2 className="text-3xl font-extrabold text-gray-900">Kata Mereka Tentang Gycora</h2>
  //             <p className="mt-4 text-gray-500">Ulasan jujur dari pelanggan setia yang telah membuktikan kualitas kami.</p>
  //           </div>

  //           <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
  //             {testimonials.map((testi) => (
  //               <div key={testi.id} className="p-8 bg-white border border-gray-100 shadow-sm rounded-3xl">
  //                 <div className="flex gap-1 mb-4 text-amber-400">
  //                   {[...Array(testi.rating)].map((_, i) => (
  //                     <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
  //                   ))}
  //                 </div>
  //                 <p className="mb-6 italic text-gray-600">"{testi.text}"</p>
  //                 <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
  //                   <div className="flex items-center justify-center w-10 h-10 font-bold rounded-full bg-emerald-100 text-emerald-700">
  //                     {testi.name.charAt(0)}
  //                   </div>
  //                   <div>
  //                     <h4 className="text-sm font-bold text-gray-900">{testi.name}</h4>
  //                     <p className="text-xs text-gray-500">{testi.role}</p>
  //                   </div>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>

  //       {/* =========================================
  //           6. CTA (CALL TO ACTION) / NEWSLETTER
  //       ========================================= */}
  //       <div className="relative py-24 overflow-hidden bg-gray-900">
  //         {/* Dekorasi Glow */}
  //         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gycora rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
          
  //         <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
  //           <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
  //             Siap mengubah rutinitas rambut Anda?
  //           </h2>
  //           <p className="mt-4 mb-10 text-lg text-gray-400">
  //             Bergabunglah dengan ribuan pelanggan yang telah merasakan keajaiban Ethereal Glow Brush dan rangkaian produk Gycora lainnya.
  //           </p>
  //           {!userData ? (
  //             <button onClick={() => navigate("/register")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
  //               Mulai Perjalanan Anda Sekarang
  //             </button>
  //           ) : (
  //             <button onClick={() => navigate("/products")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
  //               Belanja Koleksi Kami
  //             </button>
  //           )}
  //         </div>
  //       </div>

  //     </div>
  //   );
  // }

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api"; 
// import Swal from "sweetalert2";

// // --- IMPORT GAMBAR DARI LOKAL UNTUK SLIDER ---
// import slide1 from "/landing_page_images/hero_slide_1.jpg";
// import slide2 from "/landing_page_images/hero_slide_2.jpg";
// import slide3 from "/landing_page_images/hero_slide_3.jpg";
// import slide4 from "/landing_page_images/hero_slide_4.jpg";
// import slide5 from "/landing_page_images/hero_slide_5.jpg"; 

// const heroSlides = [
//   { id: 1, image: slide1, alt: "Gycora Premium Hair Care 1" },
//   { id: 2, image: slide2, alt: "Gycora Premium Hair Care 2" },
//   { id: 3, image: slide3, alt: "Gycora Premium Hair Care 3" },
//   { id: 4, image: slide4, alt: "Gycora Premium Hair Care 4" },
//   { id: 5, image: slide5, alt: "Gycora Premium Hair Care 5" },
// ];

// const testimonials = [
//   { id: 1, name: "Amanda S.", role: "Verified Buyer", text: "Ethereal Glow Brush benar-benar mengubah hidup saya. Rambut yang biasanya rontok saat disisir sekarang sangat mudah diatur dan jauh lebih berkilau!", rating: 5 },
//   { id: 2, name: "Rina Kartika", role: "Gycora Member", text: "Wangi dari Revitalizing Shampoo sangat elegan dan tahan lama. Kulit kepala terasa lebih bersih tanpa membuat ujung rambut menjadi kering.", rating: 5 },
//   { id: 3, name: "Jessica W.", role: "Verified Buyer", text: "Awalnya ragu, tapi setelah mencoba Argan Hair Serum selama 2 minggu, ujung rambut bercabang saya benar-benar membaik. Sangat direkomendasikan!", rating: 4 }
// ];

// export default function Home() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
  
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
//   const [isLoadingProducts, setIsLoadingProducts] = useState(true);

//   // --- STATE UNTUK POP-UP PROMO ---
//   const [showPromoModal, setShowPromoModal] = useState(false);
//   const [promoEmail, setPromoEmail] = useState("");
//   const [isSubscribing, setIsSubscribing] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user_data");
//     if (storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }

//     // Tampilkan Promo Modal setiap kali komponen Home di-mount (baik user login maupun guest)
//     const promoTimer = setTimeout(() => {
//       setShowPromoModal(true);
//     }, 1500);

//     const fetchFeaturedProducts = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (res.ok) {
//           const data = await res.json();
//           const productsArray = data.data ? data.data : data;
//           setFeaturedProducts(productsArray.slice(0, 3) || []);
//         }
//       } catch (error) {
//         console.error("Gagal memuat produk unggulan:", error);
//       } finally {
//         setIsLoadingProducts(false);
//       }
//     };

//     fetchFeaturedProducts();

//     // Cleanup timer saat komponen di-unmount
//     return () => clearTimeout(promoTimer);
//   }, []);

//   useEffect(() => {
//     if (userData) return; 
//     const slideInterval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
//     }, 4000); 
//     return () => clearInterval(slideInterval);
//   }, [userData]);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
//   };

//   // --- HANDLER TUTUP PROMO & SUBMIT ---
//   const closePromoModal = () => {
//     setShowPromoModal(false);
//   };

//   const handleSubscribePromo = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!promoEmail) return;
    
//     setIsSubscribing(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/subscribe`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Accept": "application/json" },
//         body: JSON.stringify({ email: promoEmail }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         closePromoModal();
//         Swal.fire({
//           icon: "success",
//           title: "Berhasil!",
//           text: "Cek email Anda untuk kode voucher 50% Gycora.",
//           confirmButtonColor: "#059669",
//         });
//       } else {
//         Swal.fire({ icon: "warning", title: "Pemberitahuan", text: data.message || "Gagal berlangganan.", confirmButtonColor: "#d33" });
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire({ icon: "error", title: "Gagal", text: "Terjadi kesalahan server.", confirmButtonColor: "#d33" });
//     } finally {
//       setIsSubscribing(false);
//     }
//   };

//   return (
//     <div className="relative font-sans bg-white">
      
//       {/* =========================================
//           POP-UP PROMO MODAL (SELALU MUNCUL)
//       ========================================= */}
//       {showPromoModal && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
//           <div className="relative flex flex-col w-full max-w-3xl overflow-hidden bg-white shadow-2xl md:flex-row rounded-2xl">
            
//             {/* Tombol Close */}
//             <button 
//               onClick={closePromoModal}
//               className="absolute z-10 flex items-center justify-center w-8 h-8 text-gray-500 transition-colors bg-white rounded-full shadow-md top-4 right-4 hover:bg-gray-100 hover:text-gray-900"
//             >
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//             </button>

//             {/* Bagian Kiri: Teks & Form */}
//             <div className="flex flex-col justify-center flex-1 p-8 md:p-12">
//               <h2 className="mb-2 font-serif text-4xl font-black tracking-tight text-gray-900 uppercase">Gycora</h2>
//               <h3 className="mb-4 text-3xl font-extrabold leading-tight text-gycora-dark">
//                 Dapatkan Diskon 50% + Produk Spesial
//               </h3>
//               <p className="mb-8 text-sm font-medium text-gray-500">
//                 Daftarkan Email & SMS untuk mendapatkan penawaran eksklusif, tips kecantikan, dan banyak lagi dari kami!
//               </p>
              
//               <form onSubmit={handleSubscribePromo} className="space-y-4">
//                 <input 
//                   type="email" 
//                   value={promoEmail}
//                   onChange={(e) => setPromoEmail(e.target.value)}
//                   placeholder="Masukkan Email Anda" 
//                   className="w-full px-4 py-3 text-sm transition-all border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gycora"
//                   required
//                 />
//                 <button 
//                   type="submit" 
//                   disabled={isSubscribing}
//                   className="w-full px-4 py-3 text-sm font-bold tracking-widest text-white uppercase transition-all bg-gray-900 rounded-lg hover:bg-black disabled:bg-gray-400"
//                 >
//                   {isSubscribing ? "Memproses..." : "Continue"}
//                 </button>
//               </form>
              
//               <p className="mt-4 text-[9px] text-gray-400 leading-relaxed">
//                 *Penawaran hanya berlaku untuk pesanan pertama di atas Rp 200.000. Tidak dapat digabungkan dengan promo lain.
//               </p>
//             </div>

//             {/* Bagian Kanan: Gambar Pemanis dari Aset Lokal */}
//             <div className="hidden w-full md:block md:w-5/12 bg-emerald-50">
//               <img 
//                 src="/landing_page_images/promo_popup.jpg" 
//                 alt="Promo Gycora" 
//                 className="object-cover w-full h-full"
//               />
//             </div>

//           </div>
//         </div>
//       )}

//       {/* =========================================
//           1. HERO SECTION
//       ========================================= */}
//       <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
//         <div className="absolute top-0 -translate-x-1/2 left-1/2 -z-10">
//           <div className="w-[800px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
//         </div>

//         <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32">
//           {userData ? (
//             <div className="max-w-4xl mx-auto space-y-8 text-center animate-fade-in-up">
//               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                 <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
//                 Gycora Exclusive Member
//               </div>
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
//                 Selamat datang kembali, <span className="text-gycora">{userData.first_name}</span>.
//               </h1>
//               <p className="max-w-2xl mx-auto text-lg text-gray-500 sm:text-xl">
//                 Katalog rambut premium terbaru kami sudah menanti Anda. Nikmati penawaran eksklusif, lacak pesanan, dan dapatkan kemudahan berbelanja khusus untuk member Gycora.
//               </p>
//               <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
//                 <button onClick={() => navigate("/products")} className="px-8 py-3.5 text-base font-bold text-white transition-all bg-gray-900 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5">
//                   Lanjutkan Belanja
//                 </button>
//                 <button onClick={() => navigate("/profile")} className="px-8 py-3.5 text-base font-bold text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                   Profil & Pesanan Saya
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
//               <div className="space-y-8 animate-fade-in-up">
//                 <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                   ✨ Solusi Perawatan Rambut Premium
//                 </div>
//                 <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
//                   Tingkatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-gycora to-emerald-400">Pesona</span><br /> Mahkota Anda.
//                 </h1>
//                 <p className="text-lg leading-relaxed text-gray-500 sm:text-xl">
//                   Temukan koleksi eksklusif Gycora. Diformulasikan dengan teknologi mutakhir dan bahan premium untuk rambut yang lebih sehat, bersinar, dan bebas kusut dari akar hingga ujung.
//                 </p>
//                 <div className="flex flex-col gap-4 pt-4 sm:flex-row">
//                   <Link to="/products" className="px-8 py-4 text-lg font-bold text-center text-white transition-all rounded-full bg-gycora hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5">
//                     Eksplorasi Katalog
//                   </Link>
//                   <Link to="/register" className="px-8 py-4 text-lg font-bold text-center text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                     Daftar Member
//                   </Link>
//                 </div>
//               </div>
              
//               <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//                 <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-pink-50 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
                
//                 <div className="relative w-full overflow-hidden shadow-2xl h-[500px] rounded-[3rem] group">
//                   {heroSlides.map((slide, index) => (
//                     <img 
//                       key={slide.id}
//                       src={slide.image} 
//                       alt={slide.alt} 
//                       className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
//                     />
//                   ))}

//                   <div className="absolute inset-0 flex items-center justify-between px-4 transition-opacity opacity-0 group-hover:opacity-100">
//                     <button onClick={() => setCurrentSlide(prev => prev === 0 ? heroSlides.length - 1 : prev - 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                     </button>
//                     <button onClick={() => setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                     </button>
//                   </div>

//                   <div className="absolute flex justify-center w-full gap-2 bottom-6">
//                     {heroSlides.map((_, index) => (
//                       <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${index === currentSlide ? 'w-8 bg-gycora' : 'w-2.5 bg-white/70 hover:bg-white'}`} aria-label={`Slide ${index + 1}`}></button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =========================================
//           2. SHOP BY CATEGORY (SEKSI BARU)
//       ========================================= */}
//       <div className="py-24 bg-white border-t border-gray-100">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-12 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Kategori Terpopuler</h2>
//             <p className="mt-4 text-gray-500">Jelajahi rangkaian produk spesifik untuk setiap kebutuhan mahkota Anda.</p>
//           </div>
          
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
//               <img src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Hair Care" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
//               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
//               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
//                 <h3 className="text-2xl font-bold text-white">Hair Care</h3>
//                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Shampoo, Conditioner & Serum</p>
//               </div>
//             </Link>
            
//             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
//               <img src="https://images.unsplash.com/photo-1598440947619-2ce6598c4e1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tools & Accessories" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
//               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
//               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
//                 <h3 className="text-2xl font-bold text-white">Tools & Brushes</h3>
//                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Anti-Static & Detangling</p>
//               </div>
//             </Link>

//             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
//               <img src="https://images.unsplash.com/photo-1615397323218-c2bda069f9d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Bundles & Gift Sets" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
//               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
//               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
//                 <h3 className="text-2xl font-bold text-white">Bundles & Gifts</h3>
//                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Set Lengkap & Promo Spesial</p>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           3. VALUE PROPOSITION (MENGAPA GYCORA?)
//       ========================================= */}
//       <div className="py-24 border-gray-100 bg-gray-50 border-y">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Teknologi Anti-Statis</h3>
//               <p className="leading-relaxed text-gray-500">Molekul karbon konduktif pada sisir kami menetralkan listrik statis, mencegah rambut kusut dan rusak seketika.</p>
//             </div>
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Bahan Baku Premium</h3>
//               <p className="leading-relaxed text-gray-500">Setiap tetes diformulasikan dengan bahan baku berkualitas tinggi yang aman dan teruji klinis untuk kesehatan kulit kepala.</p>
//             </div>
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Cruelty-Free</h3>
//               <p className="leading-relaxed text-gray-500">Kecantikan sejati tidak menyakiti. Seluruh lini produk Gycora 100% bebas dari uji coba pada hewan.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           4. FEATURED PRODUCTS (PRODUK UNGGULAN DINAMIS)
//       ========================================= */}
//       <div className="py-24 bg-white">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-between mb-12 sm:flex-row">
//             <div>
//               <h2 className="text-3xl font-extrabold text-gray-900">Produk Terlaris Kami</h2>
//               <p className="mt-2 text-gray-500">Pilihan favorit pelanggan Gycora bulan ini.</p>
//             </div>
//             <Link to="/products" className="hidden font-bold transition-colors sm:block text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>

//           {isLoadingProducts ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="bg-white border border-gray-100 shadow-sm rounded-2xl animate-pulse">
//                   <div className="w-full bg-gray-200 aspect-square rounded-t-2xl"></div>
//                   <div className="p-6 space-y-3">
//                     <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
//                     <div className="w-full h-4 bg-gray-200 rounded"></div>
//                     <div className="w-1/2 h-6 mt-4 bg-gray-200 rounded"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : featuredProducts.length > 0 ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {featuredProducts.map((product) => (
//                 <div 
//                   key={product.id} 
//                   className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md cursor-pointer group rounded-2xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1" 
//                   onClick={() => navigate(`/product/${product.id}`)}
//                 >
//                   <div className="relative overflow-hidden bg-gray-100 aspect-square">
//                     <img 
//                       src={product.image_url} 
//                       alt={product.name} 
//                       className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
//                     />
//                     <div className="absolute px-3 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-full shadow-sm top-4 left-4 bg-white/90 backdrop-blur-sm">
//                       {product.category?.name || "Gycora"}
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
//                     <p className="mb-4 text-sm text-gray-500 line-clamp-2">
//                       {product.description || "Temukan kilau alami rambut Anda dengan perawatan eksklusif dari Gycora."}
//                     </p>
//                     <div className="flex items-center justify-between">
//                       <span className="text-xl font-extrabold text-gycora">{formatRupiah(product.price)}</span>
//                       <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="py-12 italic text-center text-gray-500">Belum ada produk yang tersedia.</div>
//           )}
          
//           <div className="mt-8 text-center sm:hidden">
//             <Link to="/products" className="font-bold transition-colors text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>
//         </div>
//       </div> 

//       {/* =========================================
//           5. TESTIMONIALS / SOCIAL PROOF (SEKSI BARU)
//       ========================================= */}
//       <div className="py-24 border-t border-gray-100 bg-emerald-50/50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-16 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Kata Mereka Tentang Gycora</h2>
//             <p className="mt-4 text-gray-500">Ulasan jujur dari pelanggan setia yang telah membuktikan kualitas kami.</p>
//           </div>

//           <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//             {testimonials.map((testi) => (
//               <div key={testi.id} className="p-8 bg-white border border-gray-100 shadow-sm rounded-3xl">
//                 <div className="flex gap-1 mb-4 text-amber-400">
//                   {[...Array(testi.rating)].map((_, i) => (
//                     <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
//                   ))}
//                 </div>
//                 <p className="mb-6 italic text-gray-600">"{testi.text}"</p>
//                 <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
//                   <div className="flex items-center justify-center w-10 h-10 font-bold rounded-full bg-emerald-100 text-emerald-700">
//                     {testi.name.charAt(0)}
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-bold text-gray-900">{testi.name}</h4>
//                     <p className="text-xs text-gray-500">{testi.role}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           6. CTA (CALL TO ACTION) / NEWSLETTER
//       ========================================= */}
//       <div className="relative py-24 overflow-hidden bg-gray-900">
//         {/* Dekorasi Glow */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gycora rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        
//         <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
//             Siap mengubah rutinitas rambut Anda?
//           </h2>
//           <p className="mt-4 mb-10 text-lg text-gray-400">
//             Bergabunglah dengan ribuan pelanggan yang telah merasakan keajaiban Ethereal Glow Brush dan rangkaian produk Gycora lainnya.
//           </p>
//           {!userData ? (
//              <button onClick={() => navigate("/register")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Mulai Perjalanan Anda Sekarang
//              </button>
//           ) : (
//             <button onClick={() => navigate("/products")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Belanja Koleksi Kami
//             </button>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api"; 
// import Swal from "sweetalert2"; 

// // --- IMPORT 5 GAMBAR DARI LOKAL UNTUK SLIDER ---
// import slide1 from "/landing_page_images/hero_slide_1.jpg";
// import slide2 from "/landing_page_images/hero_slide_2.jpg";
// import slide3 from "/landing_page_images/hero_slide_3.jpg";
// import slide4 from "/landing_page_images/hero_slide_4.jpg";
// import slide5 from "/landing_page_images/hero_slide_5.jpg"; 

// const heroSlides = [
//   { id: 1, image: slide1, alt: "Gycora Premium Hair Care 1" },
//   { id: 2, image: slide2, alt: "Gycora Premium Hair Care 2" },
//   { id: 3, image: slide3, alt: "Gycora Premium Hair Care 3" },
//   { id: 4, image: slide4, alt: "Gycora Premium Hair Care 4" },
//   { id: 5, image: slide5, alt: "Gycora Premium Hair Care 5" },
// ];

// const testimonials = [
//   { id: 1, name: "Amanda S.", role: "Verified Buyer", text: "Ethereal Glow Brush benar-benar mengubah hidup saya. Rambut yang biasanya rontok saat disisir sekarang sangat mudah diatur dan jauh lebih berkilau!", rating: 5 },
//   { id: 2, name: "Rina Kartika", role: "Gycora Member", text: "Wangi dari Revitalizing Shampoo sangat elegan dan tahan lama. Kulit kepala terasa lebih bersih tanpa membuat ujung rambut menjadi kering.", rating: 5 },
//   { id: 3, name: "Jessica W.", role: "Verified Buyer", text: "Awalnya ragu, tapi setelah mencoba Argan Hair Serum selama 2 minggu, ujung rambut bercabang saya benar-benar membaik. Sangat direkomendasikan!", rating: 4 }
// ];

// export default function Home() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
  
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
//   const [isLoadingProducts, setIsLoadingProducts] = useState(true);

//   // --- STATE UNTUK POP-UP PROMO ---
//   const [isPromoMounted, setIsPromoMounted] = useState(false); // Mengontrol apakah komponen ada di DOM
//   const [showPromoModal, setShowPromoModal] = useState(false); // Mengontrol animasi (opacity/transform)
//   const [promoEmail, setPromoEmail] = useState("");
//   const [isSubscribing, setIsSubscribing] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user_data");
//     if (storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }

//     // Mount modal setelah 1.5 detik, lalu trigger animasi 50ms kemudian
//     const mountTimer = setTimeout(() => {
//       setIsPromoMounted(true);
//       setTimeout(() => {
//         setShowPromoModal(true);
//       }, 50);
//     }, 1500);

//     const fetchFeaturedProducts = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (res.ok) {
//           const data = await res.json();
//           const productsArray = data.data ? data.data : data;
//           setFeaturedProducts(productsArray.slice(0, 3) || []);
//         }
//       } catch (error) {
//         console.error("Gagal memuat produk unggulan:", error);
//       } finally {
//         setIsLoadingProducts(false);
//       }
//     };

//     fetchFeaturedProducts();

//     return () => {
//       clearTimeout(mountTimer);
//     };
//   }, []);

//   useEffect(() => {
//     if (userData) return; 
//     const slideInterval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
//     }, 4000); 
//     return () => clearInterval(slideInterval);
//   }, [userData]);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
//   };

//   // --- HANDLER TUTUP PROMO & SUBMIT ---
//   const closePromoModal = () => {
//     setShowPromoModal(false); // Trigger animasi keluar (opacity 0)
//     // Tunggu animasi selesai (300ms) sebelum unmount dari DOM
//     setTimeout(() => {
//       setIsPromoMounted(false);
//     }, 300);
//   };

//   const handleSubscribePromo = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!promoEmail) return;
    
//     setIsSubscribing(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/subscribe`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Accept": "application/json" },
//         body: JSON.stringify({ email: promoEmail }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         closePromoModal();
//         Swal.fire({
//           icon: "success",
//           title: "Berhasil!",
//           text: "Cek email Anda untuk kode voucher 50% Gycora.",
//           confirmButtonColor: "#059669",
//         });
//       } else {
//         Swal.fire({ icon: "warning", title: "Pemberitahuan", text: data.message || "Gagal berlangganan.", confirmButtonColor: "#d33" });
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire({ icon: "error", title: "Gagal", text: "Terjadi kesalahan server.", confirmButtonColor: "#d33" });
//     } finally {
//       setIsSubscribing(false);
//     }
//   };

//   return (
//     <div className="relative font-sans bg-white">
      
//       {/* =========================================
//           POP-UP PROMO MODAL (DENGAN ANIMASI)
//       ========================================= */}
//       {isPromoMounted && (
//         <div 
//           className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ease-out
//             ${showPromoModal ? 'bg-black/60 backdrop-blur-sm opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0'}
//           `}
//         >
//           <div 
//             className={`relative flex flex-col w-full max-w-3xl overflow-hidden bg-white shadow-2xl md:flex-row rounded-2xl transition-all duration-500 ease-out transform
//               ${showPromoModal ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}
//             `}
//           >
            
//             {/* Tombol Close */}
//             <button 
//               onClick={closePromoModal}
//               className="absolute z-10 flex items-center justify-center w-8 h-8 text-gray-500 transition-colors bg-white rounded-full shadow-md top-4 right-4 hover:bg-gray-100 hover:text-gray-900"
//             >
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//             </button>

//             {/* Bagian Kiri: Teks & Form */}
//             <div className="flex flex-col justify-center flex-1 p-8 md:p-12">
//               <h2 className="mb-2 font-serif text-4xl font-black tracking-tight text-gray-900 uppercase">Gycora</h2>
//               <h3 className="mb-4 text-3xl font-extrabold leading-tight text-gycora-dark">
//                 Dapatkan Diskon 50% + Produk Spesial
//               </h3>
//               <p className="mb-8 text-sm font-medium text-gray-500">
//                 Daftarkan Email & SMS untuk mendapatkan penawaran eksklusif, tips kecantikan, dan banyak lagi dari kami!
//               </p>
              
//               <form onSubmit={handleSubscribePromo} className="space-y-4">
//                 <input 
//                   type="email" 
//                   value={promoEmail}
//                   onChange={(e) => setPromoEmail(e.target.value)}
//                   placeholder="Masukkan Email Anda" 
//                   className="w-full px-4 py-3 text-sm transition-all border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gycora"
//                   required
//                 />
//                 <button 
//                   type="submit" 
//                   disabled={isSubscribing}
//                   className="w-full px-4 py-3 text-sm font-bold tracking-widest text-white uppercase transition-all bg-gray-900 rounded-lg hover:bg-black disabled:bg-gray-400"
//                 >
//                   {isSubscribing ? "Memproses..." : "Continue"}
//                 </button>
//               </form>
              
//               <p className="mt-4 text-[9px] text-gray-400 leading-relaxed">
//                 *Penawaran hanya berlaku untuk pesanan pertama di atas Rp 200.000. Tidak dapat digabungkan dengan promo lain.
//               </p>
//             </div>

//             {/* Bagian Kanan: Gambar Pemanis dari Aset Lokal */}
//             <div className="hidden w-full md:block md:w-5/12 bg-emerald-50">
//               <img 
//                 src="/landing_page_images/promo_popup.jpg" 
//                 alt="Promo Gycora" 
//                 className="object-cover w-full h-full"
//               />
//             </div>

//           </div>
//         </div>
//       )}


//       {/* =========================================
//           1. HERO SECTION
//       ========================================= */}
//       <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
//         <div className="absolute top-0 -translate-x-1/2 left-1/2 -z-10">
//           <div className="w-[800px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
//         </div>

//         <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32">
//           {userData ? (
//             <div className="max-w-4xl mx-auto space-y-8 text-center animate-fade-in-up">
//               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                 <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
//                 Gycora Exclusive Member
//               </div>
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
//                 Selamat datang kembali, <span className="text-gycora">{userData.first_name}</span>.
//               </h1>
//               <p className="max-w-2xl mx-auto text-lg text-gray-500 sm:text-xl">
//                 Katalog rambut premium terbaru kami sudah menanti Anda. Nikmati penawaran eksklusif, lacak pesanan, dan dapatkan kemudahan berbelanja khusus untuk member Gycora.
//               </p>
//               <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
//                 <button onClick={() => navigate("/products")} className="px-8 py-3.5 text-base font-bold text-white transition-all bg-gray-900 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5">
//                   Lanjutkan Belanja
//                 </button>
//                 <button onClick={() => navigate("/profile")} className="px-8 py-3.5 text-base font-bold text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                   Profil & Pesanan Saya
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
//               <div className="space-y-8 animate-fade-in-up">
//                 <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                   ✨ Solusi Perawatan Rambut Premium
//                 </div>
//                 <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
//                   Tingkatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-gycora to-emerald-400">Pesona</span><br /> Mahkota Anda.
//                 </h1>
//                 <p className="text-lg leading-relaxed text-gray-500 sm:text-xl">
//                   Temukan koleksi eksklusif Gycora. Diformulasikan dengan teknologi mutakhir dan bahan premium untuk rambut yang lebih sehat, bersinar, dan bebas kusut dari akar hingga ujung.
//                 </p>
//                 <div className="flex flex-col gap-4 pt-4 sm:flex-row">
//                   <Link to="/products" className="px-8 py-4 text-lg font-bold text-center text-white transition-all rounded-full bg-gycora hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5">
//                     Eksplorasi Katalog
//                   </Link>
//                   <Link to="/register" className="px-8 py-4 text-lg font-bold text-center text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                     Daftar Member
//                   </Link>
//                 </div>
//               </div>
              
//               <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//                 <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-pink-50 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
                
//                 <div className="relative w-full overflow-hidden shadow-2xl h-[500px] rounded-[3rem] group">
//                   {heroSlides.map((slide, index) => (
//                     <img 
//                       key={slide.id}
//                       src={slide.image} 
//                       alt={slide.alt} 
//                       className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
//                     />
//                   ))}

//                   <div className="absolute inset-0 flex items-center justify-between px-4 transition-opacity opacity-0 group-hover:opacity-100">
//                     <button onClick={() => setCurrentSlide(prev => prev === 0 ? heroSlides.length - 1 : prev - 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                     </button>
//                     <button onClick={() => setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                     </button>
//                   </div>

//                   <div className="absolute flex justify-center w-full gap-2 bottom-6">
//                     {heroSlides.map((_, index) => (
//                       <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${index === currentSlide ? 'w-8 bg-gycora' : 'w-2.5 bg-white/70 hover:bg-white'}`} aria-label={`Slide ${index + 1}`}></button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =========================================
//           2. SHOP BY CATEGORY (SEKSI BARU)
//       ========================================= */}
//       <div className="py-24 bg-white border-t border-gray-100">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-12 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Kategori Terpopuler</h2>
//             <p className="mt-4 text-gray-500">Jelajahi rangkaian produk spesifik untuk setiap kebutuhan mahkota Anda.</p>
//           </div>
          
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
//               <img src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Hair Care" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
//               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
//               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
//                 <h3 className="text-2xl font-bold text-white">Hair Care</h3>
//                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Shampoo, Conditioner & Serum</p>
//               </div>
//             </Link>
            
//             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
//               <img src="https://images.unsplash.com/photo-1598440947619-2ce6598c4e1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tools & Accessories" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
//               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
//               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
//                 <h3 className="text-2xl font-bold text-white">Tools & Brushes</h3>
//                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Anti-Static & Detangling</p>
//               </div>
//             </Link>

//             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
//               <img src="https://images.unsplash.com/photo-1615397323218-c2bda069f9d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Bundles & Gift Sets" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
//               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
//               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
//                 <h3 className="text-2xl font-bold text-white">Bundles & Gifts</h3>
//                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Set Lengkap & Promo Spesial</p>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           3. VALUE PROPOSITION (MENGAPA GYCORA?)
//       ========================================= */}
//       <div className="py-24 border-gray-100 bg-gray-50 border-y">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Teknologi Anti-Statis</h3>
//               <p className="leading-relaxed text-gray-500">Molekul karbon konduktif pada sisir kami menetralkan listrik statis, mencegah rambut kusut dan rusak seketika.</p>
//             </div>
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Bahan Baku Premium</h3>
//               <p className="leading-relaxed text-gray-500">Setiap tetes diformulasikan dengan bahan baku berkualitas tinggi yang aman dan teruji klinis untuk kesehatan kulit kepala.</p>
//             </div>
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Cruelty-Free</h3>
//               <p className="leading-relaxed text-gray-500">Kecantikan sejati tidak menyakiti. Seluruh lini produk Gycora 100% bebas dari uji coba pada hewan.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           4. FEATURED PRODUCTS (PRODUK UNGGULAN DINAMIS)
//       ========================================= */}
//       <div className="py-24 bg-white">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-between mb-12 sm:flex-row">
//             <div>
//               <h2 className="text-3xl font-extrabold text-gray-900">Produk Terlaris Kami</h2>
//               <p className="mt-2 text-gray-500">Pilihan favorit pelanggan Gycora bulan ini.</p>
//             </div>
//             <Link to="/products" className="hidden font-bold transition-colors sm:block text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>

//           {isLoadingProducts ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="bg-white border border-gray-100 shadow-sm rounded-2xl animate-pulse">
//                   <div className="w-full bg-gray-200 aspect-square rounded-t-2xl"></div>
//                   <div className="p-6 space-y-3">
//                     <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
//                     <div className="w-full h-4 bg-gray-200 rounded"></div>
//                     <div className="w-1/2 h-6 mt-4 bg-gray-200 rounded"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : featuredProducts.length > 0 ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {featuredProducts.map((product) => (
//                 <div 
//                   key={product.id} 
//                   className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md cursor-pointer group rounded-2xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1" 
//                   onClick={() => navigate(`/product/${product.id}`)}
//                 >
//                   <div className="relative overflow-hidden bg-gray-100 aspect-square">
//                     <img 
//                       src={product.image_url} 
//                       alt={product.name} 
//                       className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
//                     />
//                     <div className="absolute px-3 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-full shadow-sm top-4 left-4 bg-white/90 backdrop-blur-sm">
//                       {product.category?.name || "Gycora"}
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
//                     <p className="mb-4 text-sm text-gray-500 line-clamp-2">
//                       {product.description || "Temukan kilau alami rambut Anda dengan perawatan eksklusif dari Gycora."}
//                     </p>
//                     <div className="flex items-center justify-between">
//                       <span className="text-xl font-extrabold text-gycora">{formatRupiah(product.price)}</span>
//                       <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="py-12 italic text-center text-gray-500">Belum ada produk yang tersedia.</div>
//           )}
          
//           <div className="mt-8 text-center sm:hidden">
//             <Link to="/products" className="font-bold transition-colors text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>
//         </div>
//       </div> 

//       {/* =========================================
//           5. TESTIMONIALS / SOCIAL PROOF (SEKSI BARU)
//       ========================================= */}
//       <div className="py-24 border-t border-gray-100 bg-emerald-50/50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-16 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Kata Mereka Tentang Gycora</h2>
//             <p className="mt-4 text-gray-500">Ulasan jujur dari pelanggan setia yang telah membuktikan kualitas kami.</p>
//           </div>

//           <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//             {testimonials.map((testi) => (
//               <div key={testi.id} className="p-8 bg-white border border-gray-100 shadow-sm rounded-3xl">
//                 <div className="flex gap-1 mb-4 text-amber-400">
//                   {[...Array(testi.rating)].map((_, i) => (
//                     <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
//                   ))}
//                 </div>
//                 <p className="mb-6 italic text-gray-600">"{testi.text}"</p>
//                 <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
//                   <div className="flex items-center justify-center w-10 h-10 font-bold rounded-full bg-emerald-100 text-emerald-700">
//                     {testi.name.charAt(0)}
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-bold text-gray-900">{testi.name}</h4>
//                     <p className="text-xs text-gray-500">{testi.role}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           6. CTA (CALL TO ACTION) / NEWSLETTER
//       ========================================= */}
//       <div className="relative py-24 overflow-hidden bg-gray-900">
//         {/* Dekorasi Glow */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gycora rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        
//         <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
//             Siap mengubah rutinitas rambut Anda?
//           </h2>
//           <p className="mt-4 mb-10 text-lg text-gray-400">
//             Bergabunglah dengan ribuan pelanggan yang telah merasakan keajaiban Ethereal Glow Brush dan rangkaian produk Gycora lainnya.
//           </p>
//           {!userData ? (
//              <button onClick={() => navigate("/register")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Mulai Perjalanan Anda Sekarang
//              </button>
//           ) : (
//             <button onClick={() => navigate("/products")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Belanja Koleksi Kami
//             </button>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api"; 
// import Swal from "sweetalert2"; 

// import slide1 from "/landing_page_images/hero_slide_1.jpg";
// import slide2 from "/landing_page_images/hero_slide_2.jpg";
// import slide3 from "/landing_page_images/hero_slide_3.jpg";
// import slide4 from "/landing_page_images/hero_slide_4.jpg";
// import slide5 from "/landing_page_images/hero_slide_5.jpg"; 

// const heroSlides = [
//   { id: 1, image: slide1, alt: "Gycora Premium Hair Care 1" },
//   { id: 2, image: slide2, alt: "Gycora Premium Hair Care 2" },
//   { id: 3, image: slide3, alt: "Gycora Premium Hair Care 3" },
//   { id: 4, image: slide4, alt: "Gycora Premium Hair Care 4" },
//   { id: 5, image: slide5, alt: "Gycora Premium Hair Care 5" },
// ];

// const testimonials = [
//   { id: 1, name: "Amanda S.", role: "Verified Buyer", text: "Ethereal Glow Brush benar-benar mengubah hidup saya. Rambut yang biasanya rontok saat disisir sekarang sangat mudah diatur dan jauh lebih berkilau!", rating: 5 },
//   { id: 2, name: "Rina Kartika", role: "Gycora Member", text: "Wangi dari Revitalizing Shampoo sangat elegan dan tahan lama. Kulit kepala terasa lebih bersih tanpa membuat ujung rambut menjadi kering.", rating: 5 },
//   { id: 3, name: "Jessica W.", role: "Verified Buyer", text: "Awalnya ragu, tapi setelah mencoba Argan Hair Serum selama 2 minggu, ujung rambut bercabang saya benar-benar membaik. Sangat direkomendasikan!", rating: 4 }
// ];

// export default function Home() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
  
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
//   const [isLoadingProducts, setIsLoadingProducts] = useState(true);

//   // --- STATE UNTUK POP-UP PROMO ---
//   const [isPromoMounted, setIsPromoMounted] = useState(false); // Mengontrol apakah komponen ada di DOM
//   const [showPromoModal, setShowPromoModal] = useState(false); // Mengontrol animasi (opacity/transform)
//   const [promoEmail, setPromoEmail] = useState("");
//   const [isSubscribing, setIsSubscribing] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user_data");
//     if (storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }

//     // Mount modal secara instan, lalu trigger animasi 50ms kemudian agar CSS transisi bekerja
//     setIsPromoMounted(true);
//     const animTimer = setTimeout(() => {
//       setShowPromoModal(true);
//     }, 50);

//     const fetchFeaturedProducts = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (res.ok) {
//           const data = await res.json();
//           const productsArray = data.data ? data.data : data;
//           setFeaturedProducts(productsArray.slice(0, 3) || []);
//         }
//       } catch (error) {
//         console.error("Gagal memuat produk unggulan:", error);
//       } finally {
//         setIsLoadingProducts(false);
//       }
//     };

//     fetchFeaturedProducts();

//     // Cleanup timer saat komponen di-unmount
//     return () => {
//       clearTimeout(animTimer);
//     };
//   }, []);

//   useEffect(() => {
//     if (userData) return; 
//     const slideInterval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
//     }, 4000); 
//     return () => clearInterval(slideInterval);
//   }, [userData]);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
//   };

//   // --- HANDLER TUTUP PROMO & SUBMIT ---
//   const closePromoModal = () => {
//     setShowPromoModal(false); // Trigger animasi keluar (opacity 0)
//     // Tunggu animasi selesai (300ms) sebelum unmount dari DOM
//     setTimeout(() => {
//       setIsPromoMounted(false);
//     }, 300);
//   };

//   const handleSubscribePromo = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!promoEmail) return;
    
//     setIsSubscribing(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/subscribe`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Accept": "application/json" },
//         body: JSON.stringify({ email: promoEmail }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         closePromoModal();
//         Swal.fire({
//           icon: "success",
//           title: "Berhasil!",
//           text: "Cek email Anda untuk kode voucher 50% Gycora.",
//           confirmButtonColor: "#059669",
//         });
//       } else {
//         Swal.fire({ icon: "warning", title: "Pemberitahuan", text: data.message || "Gagal berlangganan.", confirmButtonColor: "#d33" });
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire({ icon: "error", title: "Gagal", text: "Terjadi kesalahan server.", confirmButtonColor: "#d33" });
//     } finally {
//       setIsSubscribing(false);
//     }
//   };

//   return (
//     <div className="relative font-sans bg-white">
      
//       {/* =========================================
//           POP-UP PROMO MODAL (DENGAN ANIMASI INSTAN)
//       ========================================= */}
//       {isPromoMounted && (
//         <div 
//           className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ease-out
//             ${showPromoModal ? 'bg-black/60 backdrop-blur-sm opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0'}
//           `}
//         >
//           <div 
//             className={`relative flex flex-col w-full max-w-3xl overflow-hidden bg-white shadow-2xl md:flex-row rounded-2xl transition-all duration-500 ease-out transform
//               ${showPromoModal ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}
//             `}
//           >
            
//             {/* Tombol Close */}
//             <button 
//               onClick={closePromoModal}
//               className="absolute z-10 flex items-center justify-center w-8 h-8 text-gray-500 transition-colors bg-white rounded-full shadow-md top-4 right-4 hover:bg-gray-100 hover:text-gray-900"
//             >
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//             </button>

//             {/* Bagian Kiri: Teks & Form */}
//             <div className="flex flex-col justify-center flex-1 p-8 md:p-12">
//               <h2 className="mb-2 font-serif text-4xl font-black tracking-tight text-gray-900 uppercase">Gycora</h2>
//               <h3 className="mb-4 text-3xl font-extrabold leading-tight text-gycora-dark">
//                 Dapatkan Diskon 50% + Produk Spesial
//               </h3>
//               <p className="mb-8 text-sm font-medium text-gray-500">
//                 Daftarkan Email & SMS untuk mendapatkan penawaran eksklusif, tips kecantikan, dan banyak lagi dari kami!
//               </p>
              
//               <form onSubmit={handleSubscribePromo} className="space-y-4">
//                 <input 
//                   type="email" 
//                   value={promoEmail}
//                   onChange={(e) => setPromoEmail(e.target.value)}
//                   placeholder="Masukkan Email Anda" 
//                   className="w-full px-4 py-3 text-sm transition-all border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gycora"
//                   required
//                 />
//                 <button 
//                   type="submit" 
//                   disabled={isSubscribing}
//                   className="w-full px-4 py-3 text-sm font-bold tracking-widest text-white uppercase transition-all bg-gray-900 rounded-lg hover:bg-black disabled:bg-gray-400"
//                 >
//                   {isSubscribing ? "Memproses..." : "Continue"}
//                 </button>
//               </form>
              
//               <p className="mt-4 text-[9px] text-gray-400 leading-relaxed">
//                 *Penawaran hanya berlaku untuk pesanan pertama di atas Rp 200.000. Tidak dapat digabungkan dengan promo lain.
//               </p>
//             </div>

//             {/* Bagian Kanan: Gambar Pemanis dari Aset Lokal */}
//             <div className="hidden w-full md:block md:w-5/12 bg-emerald-50">
//               <img 
//                 src="/landing_page_images/promo_popup.jpg" 
//                 alt="Promo Gycora" 
//                 className="object-cover w-full h-full"
//               />
//             </div>

//           </div>
//         </div>
//       )}

//       {/* =========================================
//           1. HERO SECTION
//       ========================================= */}
//       <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
//         <div className="absolute top-0 -translate-x-1/2 left-1/2 -z-10">
//           <div className="w-[800px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
//         </div>

//         <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32">
//           {userData ? (
//             <div className="max-w-4xl mx-auto space-y-8 text-center animate-fade-in-up">
//               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                 <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
//                 Gycora Exclusive Member
//               </div>
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
//                 Selamat datang kembali, <span className="text-gycora">{userData.first_name}</span>.
//               </h1>
//               <p className="max-w-2xl mx-auto text-lg text-gray-500 sm:text-xl">
//                 Katalog rambut premium terbaru kami sudah menanti Anda. Nikmati penawaran eksklusif, lacak pesanan, dan dapatkan kemudahan berbelanja khusus untuk member Gycora.
//               </p>
//               <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
//                 <button onClick={() => navigate("/products")} className="px-8 py-3.5 text-base font-bold text-white transition-all bg-gray-900 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5">
//                   Lanjutkan Belanja
//                 </button>
//                 <button onClick={() => navigate("/profile")} className="px-8 py-3.5 text-base font-bold text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                   Profil & Pesanan Saya
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
//               <div className="space-y-8 animate-fade-in-up">
//                 <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                   ✨ Solusi Perawatan Rambut Premium
//                 </div>
//                 <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
//                   Tingkatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-gycora to-emerald-400">Pesona</span><br /> Mahkota Anda.
//                 </h1>
//                 <p className="text-lg leading-relaxed text-gray-500 sm:text-xl">
//                   Temukan koleksi eksklusif Gycora. Diformulasikan dengan teknologi mutakhir dan bahan premium untuk rambut yang lebih sehat, bersinar, dan bebas kusut dari akar hingga ujung.
//                 </p>
//                 <div className="flex flex-col gap-4 pt-4 sm:flex-row">
//                   <Link to="/products" className="px-8 py-4 text-lg font-bold text-center text-white transition-all rounded-full bg-gycora hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5">
//                     Eksplorasi Katalog
//                   </Link>
//                   <Link to="/register" className="px-8 py-4 text-lg font-bold text-center text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                     Daftar Member
//                   </Link>
//                 </div>
//               </div>
              
//               <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//                 <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-pink-50 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
                
//                 <div className="relative w-full overflow-hidden shadow-2xl h-[500px] rounded-[3rem] group">
//                   {heroSlides.map((slide, index) => (
//                     <img 
//                       key={slide.id}
//                       src={slide.image} 
//                       alt={slide.alt} 
//                       className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
//                     />
//                   ))}

//                   <div className="absolute inset-0 flex items-center justify-between px-4 transition-opacity opacity-0 group-hover:opacity-100">
//                     <button onClick={() => setCurrentSlide(prev => prev === 0 ? heroSlides.length - 1 : prev - 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                     </button>
//                     <button onClick={() => setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                     </button>
//                   </div>

//                   <div className="absolute flex justify-center w-full gap-2 bottom-6">
//                     {heroSlides.map((_, index) => (
//                       <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${index === currentSlide ? 'w-8 bg-gycora' : 'w-2.5 bg-white/70 hover:bg-white'}`} aria-label={`Slide ${index + 1}`}></button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =========================================
//           2. SHOP BY CATEGORY (SEKSI BARU)
//       ========================================= */}
//       <div className="py-24 bg-white border-t border-gray-100">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-12 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Kategori Terpopuler</h2>
//             <p className="mt-4 text-gray-500">Jelajahi rangkaian produk spesifik untuk setiap kebutuhan mahkota Anda.</p>
//           </div>
          
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
//               <img src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Hair Care" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
//               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
//               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
//                 <h3 className="text-2xl font-bold text-white">Hair Care</h3>
//                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Shampoo, Conditioner & Serum</p>
//               </div>
//             </Link>
            
//             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
//               <img src="https://images.unsplash.com/photo-1598440947619-2ce6598c4e1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tools & Accessories" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
//               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
//               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
//                 <h3 className="text-2xl font-bold text-white">Tools & Brushes</h3>
//                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Anti-Static & Detangling</p>
//               </div>
//             </Link>

//             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
//               <img src="https://images.unsplash.com/photo-1615397323218-c2bda069f9d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Bundles & Gift Sets" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
//               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
//               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
//                 <h3 className="text-2xl font-bold text-white">Bundles & Gifts</h3>
//                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Set Lengkap & Promo Spesial</p>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           3. VALUE PROPOSITION (MENGAPA GYCORA?)
//       ========================================= */}
//       <div className="py-24 border-gray-100 bg-gray-50 border-y">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Teknologi Anti-Statis</h3>
//               <p className="leading-relaxed text-gray-500">Molekul karbon konduktif pada sisir kami menetralkan listrik statis, mencegah rambut kusut dan rusak seketika.</p>
//             </div>
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Bahan Baku Premium</h3>
//               <p className="leading-relaxed text-gray-500">Setiap tetes diformulasikan dengan bahan baku berkualitas tinggi yang aman dan teruji klinis untuk kesehatan kulit kepala.</p>
//             </div>
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Cruelty-Free</h3>
//               <p className="leading-relaxed text-gray-500">Kecantikan sejati tidak menyakiti. Seluruh lini produk Gycora 100% bebas dari uji coba pada hewan.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           4. FEATURED PRODUCTS (PRODUK UNGGULAN DINAMIS)
//       ========================================= */}
//       <div className="py-24 bg-white">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-between mb-12 sm:flex-row">
//             <div>
//               <h2 className="text-3xl font-extrabold text-gray-900">Produk Terlaris Kami</h2>
//               <p className="mt-2 text-gray-500">Pilihan favorit pelanggan Gycora bulan ini.</p>
//             </div>
//             <Link to="/products" className="hidden font-bold transition-colors sm:block text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>

//           {isLoadingProducts ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="bg-white border border-gray-100 shadow-sm rounded-2xl animate-pulse">
//                   <div className="w-full bg-gray-200 aspect-square rounded-t-2xl"></div>
//                   <div className="p-6 space-y-3">
//                     <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
//                     <div className="w-full h-4 bg-gray-200 rounded"></div>
//                     <div className="w-1/2 h-6 mt-4 bg-gray-200 rounded"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : featuredProducts.length > 0 ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {featuredProducts.map((product) => (
//                 <div 
//                   key={product.id} 
//                   className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md cursor-pointer group rounded-2xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1" 
//                   onClick={() => navigate(`/product/${product.id}`)}
//                 >
//                   <div className="relative overflow-hidden bg-gray-100 aspect-square">
//                     <img 
//                       src={product.image_url} 
//                       alt={product.name} 
//                       className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
//                     />
//                     <div className="absolute px-3 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-full shadow-sm top-4 left-4 bg-white/90 backdrop-blur-sm">
//                       {product.category?.name || "Gycora"}
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
//                     <p className="mb-4 text-sm text-gray-500 line-clamp-2">
//                       {product.description || "Temukan kilau alami rambut Anda dengan perawatan eksklusif dari Gycora."}
//                     </p>
//                     <div className="flex items-center justify-between">
//                       <span className="text-xl font-extrabold text-gycora">{formatRupiah(product.price)}</span>
//                       <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="py-12 italic text-center text-gray-500">Belum ada produk yang tersedia.</div>
//           )}
          
//           <div className="mt-8 text-center sm:hidden">
//             <Link to="/products" className="font-bold transition-colors text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>
//         </div>
//       </div> 

//       {/* =========================================
//           5. TESTIMONIALS / SOCIAL PROOF (SEKSI BARU)
//       ========================================= */}
//       <div className="py-24 border-t border-gray-100 bg-emerald-50/50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-16 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Kata Mereka Tentang Gycora</h2>
//             <p className="mt-4 text-gray-500">Ulasan jujur dari pelanggan setia yang telah membuktikan kualitas kami.</p>
//           </div>

//           <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//             {testimonials.map((testi) => (
//               <div key={testi.id} className="p-8 bg-white border border-gray-100 shadow-sm rounded-3xl">
//                 <div className="flex gap-1 mb-4 text-amber-400">
//                   {[...Array(testi.rating)].map((_, i) => (
//                     <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
//                   ))}
//                 </div>
//                 <p className="mb-6 italic text-gray-600">"{testi.text}"</p>
//                 <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
//                   <div className="flex items-center justify-center w-10 h-10 font-bold rounded-full bg-emerald-100 text-emerald-700">
//                     {testi.name.charAt(0)}
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-bold text-gray-900">{testi.name}</h4>
//                     <p className="text-xs text-gray-500">{testi.role}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           6. CTA (CALL TO ACTION) / NEWSLETTER
//       ========================================= */}
//       <div className="relative py-24 overflow-hidden bg-gray-900">
//         {/* Dekorasi Glow */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gycora rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        
//         <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
//             Siap mengubah rutinitas rambut Anda?
//           </h2>
//           <p className="mt-4 mb-10 text-lg text-gray-400">
//             Bergabunglah dengan ribuan pelanggan yang telah merasakan keajaiban Ethereal Glow Brush dan rangkaian produk Gycora lainnya.
//           </p>
//           {!userData ? (
//              <button onClick={() => navigate("/register")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Mulai Perjalanan Anda Sekarang
//              </button>
//           ) : (
//             <button onClick={() => navigate("/products")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Belanja Koleksi Kami
//             </button>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api"; 
// import Swal from "sweetalert2"; 

// // --- IMPORT GAMBAR DARI LOKAL UNTUK SLIDER ---
// import slide1 from "/landing_page_images/hero_slide_1.jpg";
// import slide2 from "/landing_page_images/hero_slide_2.jpg";
// import slide3 from "/landing_page_images/hero_slide_3.jpg";
// import slide4 from "/landing_page_images/hero_slide_4.jpg";
// import slide5 from "/landing_page_images/hero_slide_5.jpg"; 

// const heroSlides = [
//   { id: 1, image: slide1, alt: "Gycora Premium Hair Care 1" },
//   { id: 2, image: slide2, alt: "Gycora Premium Hair Care 2" },
//   { id: 3, image: slide3, alt: "Gycora Premium Hair Care 3" },
//   { id: 4, image: slide4, alt: "Gycora Premium Hair Care 4" },
//   { id: 5, image: slide5, alt: "Gycora Premium Hair Care 5" },
// ];

// const testimonials = [
//   { id: 1, name: "Amanda S.", role: "Verified Buyer", text: "Ethereal Glow Brush benar-benar mengubah hidup saya. Rambut yang biasanya rontok saat disisir sekarang sangat mudah diatur dan jauh lebih berkilau!", rating: 5 },
//   { id: 2, name: "Rina Kartika", role: "Gycora Member", text: "Wangi dari Revitalizing Shampoo sangat elegan dan tahan lama. Kulit kepala terasa lebih bersih tanpa membuat ujung rambut menjadi kering.", rating: 5 },
//   { id: 3, name: "Jessica W.", role: "Verified Buyer", text: "Awalnya ragu, tapi setelah mencoba Argan Hair Serum selama 2 minggu, ujung rambut bercabang saya benar-benar membaik. Sangat direkomendasikan!", rating: 4 }
// ];

// export default function Home() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
  
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
//   const [isLoadingProducts, setIsLoadingProducts] = useState(true);

//   // --- STATE UNTUK POP-UP PROMO ---
//   const [isPromoMounted, setIsPromoMounted] = useState(false); 
//   const [showPromoModal, setShowPromoModal] = useState(false); 
//   const [promoEmail, setPromoEmail] = useState("");
//   const [isSubscribing, setIsSubscribing] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user_data");
//     if (storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }

//     // Mount modal secara instan, lalu trigger animasi 50ms kemudian agar CSS transisi bekerja
//     setIsPromoMounted(true);
//     const animTimer = setTimeout(() => {
//       setShowPromoModal(true);
//     }, 50);

//     const fetchFeaturedProducts = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (res.ok) {
//           const data = await res.json();
//           const productsArray = data.data ? data.data : data;
//           setFeaturedProducts(productsArray.slice(0, 3) || []);
//         }
//       } catch (error) {
//         console.error("Gagal memuat produk unggulan:", error);
//       } finally {
//         setIsLoadingProducts(false);
//       }
//     };

//     fetchFeaturedProducts();

//     return () => {
//       clearTimeout(animTimer);
//     };
//   }, []);

//   useEffect(() => {
//     if (userData) return; 
//     const slideInterval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
//     }, 4000); 
//     return () => clearInterval(slideInterval);
//   }, [userData]);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
//   };

//   const closePromoModal = () => {
//     setShowPromoModal(false); 
//     setTimeout(() => {
//       setIsPromoMounted(false);
//     }, 300);
//   };

//   // --- MENGHUBUNGKAN KE ENDPOINT /PROMO/CLAIM ---
//   const handleSubscribePromo = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!promoEmail) return;
    
//     setIsSubscribing(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/promo/claim`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Accept": "application/json" },
//         body: JSON.stringify({ email: promoEmail }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         closePromoModal();
//         Swal.fire({
//           icon: "success",
//           title: "Kode Promo Terkirim!",
//           text: "Silakan periksa kotak masuk email Anda untuk mendapatkan kode voucher spesial dari Gycora.",
//           confirmButtonColor: "#059669",
//         });
//       } else {
//         Swal.fire({ 
//           icon: "warning", 
//           title: "Pemberitahuan", 
//           text: data.message || "Gagal mengklaim promo. Pastikan format email benar.", 
//           confirmButtonColor: "#d33" 
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire({ 
//         icon: "error", 
//         title: "Gagal", 
//         text: "Terjadi kesalahan server saat memproses permintaan Anda.", 
//         confirmButtonColor: "#d33" 
//       });
//     } finally {
//       setIsSubscribing(false);
//     }
//   };

//   return (
//     <div className="relative font-sans bg-white">
      
//       {/* =========================================
//           POP-UP PROMO MODAL (DENGAN ANIMASI INSTAN)
//       ========================================= */}
//       {isPromoMounted && (
//         <div 
//           className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ease-out
//             ${showPromoModal ? 'bg-black/60 backdrop-blur-sm opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0'}
//           `}
//         >
//           <div 
//             className={`relative flex flex-col w-full max-w-3xl overflow-hidden bg-white shadow-2xl md:flex-row rounded-2xl transition-all duration-500 ease-out transform
//               ${showPromoModal ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}
//             `}
//           >
            
//             {/* Tombol Close */}
//             <button 
//               onClick={closePromoModal}
//               className="absolute z-10 flex items-center justify-center w-8 h-8 text-gray-500 transition-colors bg-white rounded-full shadow-md top-4 right-4 hover:bg-gray-100 hover:text-gray-900"
//             >
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//             </button>

//             {/* Bagian Kiri: Teks & Form */}
//             <div className="flex flex-col justify-center flex-1 p-8 md:p-12">
//               <h2 className="mb-2 font-serif text-4xl font-black tracking-tight text-gray-900 uppercase">Gycora</h2>
//               <h3 className="mb-4 text-3xl font-extrabold leading-tight text-gycora-dark">
//                 Klaim Voucher Belanja
//               </h3>
//               <p className="mb-8 text-sm font-medium text-gray-500">
//                 Masukkan email Anda untuk mendapatkan kode voucher eksklusif yang bisa langsung digunakan pada pesanan pertama!
//               </p>
              
//               <form onSubmit={handleSubscribePromo} className="space-y-4">
//                 <input 
//                   type="email" 
//                   value={promoEmail}
//                   onChange={(e) => setPromoEmail(e.target.value)}
//                   placeholder="Alamat Email Anda" 
//                   className="w-full px-4 py-3 text-sm transition-all border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gycora"
//                   required
//                 />
//                 <button 
//                   type="submit" 
//                   disabled={isSubscribing}
//                   className="w-full px-4 py-3 text-sm font-bold tracking-widest text-white uppercase transition-all bg-gray-900 rounded-lg hover:bg-black disabled:bg-gray-400"
//                 >
//                   {isSubscribing ? "Mengirim Kode..." : "Dapatkan Kode Promo"}
//                 </button>
//               </form>
              
//               <p className="mt-4 text-[9px] text-gray-400 leading-relaxed">
//                 *Penawaran hanya berlaku untuk pelanggan baru. Kode akan dikirimkan ke email Anda.
//               </p>
//             </div>

//             {/* Bagian Kanan: Gambar Pemanis dari Aset Lokal */}
//             <div className="hidden w-full md:block md:w-5/12 bg-emerald-50">
//               <img 
//                 src="/landing_page_images/promo_popup.jpg" 
//                 alt="Promo Gycora" 
//                 className="object-cover w-full h-full"
//               />
//             </div>

//           </div>
//         </div>
//       )}

//       {/* =========================================
//           1. HERO SECTION
//       ========================================= */}
//       <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
//         <div className="absolute top-0 -translate-x-1/2 left-1/2 -z-10">
//           <div className="w-[800px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
//         </div>

//         <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32">
//           {userData ? (
//             <div className="max-w-4xl mx-auto space-y-8 text-center animate-fade-in-up">
//               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                 <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
//                 Gycora Exclusive Member
//               </div>
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
//                 Selamat datang kembali, <span className="text-gycora">{userData.first_name}</span>.
//               </h1>
//               <p className="max-w-2xl mx-auto text-lg text-gray-500 sm:text-xl">
//                 Katalog rambut premium terbaru kami sudah menanti Anda. Nikmati penawaran eksklusif, lacak pesanan, dan dapatkan kemudahan berbelanja khusus untuk member Gycora.
//               </p>
//               <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
//                 <button onClick={() => navigate("/products")} className="px-8 py-3.5 text-base font-bold text-white transition-all bg-gray-900 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5">
//                   Lanjutkan Belanja
//                 </button>
//                 <button onClick={() => navigate("/profile")} className="px-8 py-3.5 text-base font-bold text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                   Profil & Pesanan Saya
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
//               <div className="space-y-8 animate-fade-in-up">
//                 <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                   ✨ Solusi Perawatan Rambut Premium
//                 </div>
//                 <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
//                   Tingkatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-gycora to-emerald-400">Pesona</span><br /> Mahkota Anda.
//                 </h1>
//                 <p className="text-lg leading-relaxed text-gray-500 sm:text-xl">
//                   Temukan koleksi eksklusif Gycora. Diformulasikan dengan teknologi mutakhir dan bahan premium untuk rambut yang lebih sehat, bersinar, dan bebas kusut dari akar hingga ujung.
//                 </p>
//                 <div className="flex flex-col gap-4 pt-4 sm:flex-row">
//                   <Link to="/products" className="px-8 py-4 text-lg font-bold text-center text-white transition-all rounded-full bg-gycora hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5">
//                     Eksplorasi Katalog
//                   </Link>
//                   <Link to="/register" className="px-8 py-4 text-lg font-bold text-center text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                     Daftar Member
//                   </Link>
//                 </div>
//               </div>
              
//               <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//                 <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-pink-50 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
                
//                 <div className="relative w-full overflow-hidden shadow-2xl h-[500px] rounded-[3rem] group">
//                   {heroSlides.map((slide, index) => (
//                     <img 
//                       key={slide.id}
//                       src={slide.image} 
//                       alt={slide.alt} 
//                       className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
//                     />
//                   ))}

//                   <div className="absolute inset-0 flex items-center justify-between px-4 transition-opacity opacity-0 group-hover:opacity-100">
//                     <button onClick={() => setCurrentSlide(prev => prev === 0 ? heroSlides.length - 1 : prev - 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                     </button>
//                     <button onClick={() => setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                     </button>
//                   </div>

//                   <div className="absolute flex justify-center w-full gap-2 bottom-6">
//                     {heroSlides.map((_, index) => (
//                       <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${index === currentSlide ? 'w-8 bg-gycora' : 'w-2.5 bg-white/70 hover:bg-white'}`} aria-label={`Slide ${index + 1}`}></button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =========================================
//           2. SHOP BY CATEGORY (SEKSI BARU)
//       ========================================= */}
//       <div className="py-24 bg-white border-t border-gray-100">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-12 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Kategori Terpopuler</h2>
//             <p className="mt-4 text-gray-500">Jelajahi rangkaian produk spesifik untuk setiap kebutuhan mahkota Anda.</p>
//           </div>
          
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
//               <img src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Hair Care" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
//               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
//               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
//                 <h3 className="text-2xl font-bold text-white">Hair Care</h3>
//                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Shampoo, Conditioner & Serum</p>
//               </div>
//             </Link>
            
//             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
//               <img src="https://images.unsplash.com/photo-1598440947619-2ce6598c4e1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tools & Accessories" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
//               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
//               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
//                 <h3 className="text-2xl font-bold text-white">Tools & Brushes</h3>
//                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Anti-Static & Detangling</p>
//               </div>
//             </Link>

//             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
//               <img src="https://images.unsplash.com/photo-1615397323218-c2bda069f9d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Bundles & Gift Sets" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
//               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
//               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
//                 <h3 className="text-2xl font-bold text-white">Bundles & Gifts</h3>
//                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Set Lengkap & Promo Spesial</p>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           3. VALUE PROPOSITION (MENGAPA GYCORA?)
//       ========================================= */}
//       <div className="py-24 border-gray-100 bg-gray-50 border-y">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Teknologi Anti-Statis</h3>
//               <p className="leading-relaxed text-gray-500">Molekul karbon konduktif pada sisir kami menetralkan listrik statis, mencegah rambut kusut dan rusak seketika.</p>
//             </div>
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Bahan Baku Premium</h3>
//               <p className="leading-relaxed text-gray-500">Setiap tetes diformulasikan dengan bahan baku berkualitas tinggi yang aman dan teruji klinis untuk kesehatan kulit kepala.</p>
//             </div>
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Cruelty-Free</h3>
//               <p className="leading-relaxed text-gray-500">Kecantikan sejati tidak menyakiti. Seluruh lini produk Gycora 100% bebas dari uji coba pada hewan.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           4. FEATURED PRODUCTS (PRODUK UNGGULAN DINAMIS)
//       ========================================= */}
//       <div className="py-24 bg-white">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-between mb-12 sm:flex-row">
//             <div>
//               <h2 className="text-3xl font-extrabold text-gray-900">Produk Terlaris Kami</h2>
//               <p className="mt-2 text-gray-500">Pilihan favorit pelanggan Gycora bulan ini.</p>
//             </div>
//             <Link to="/products" className="hidden font-bold transition-colors sm:block text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>

//           {isLoadingProducts ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="bg-white border border-gray-100 shadow-sm rounded-2xl animate-pulse">
//                   <div className="w-full bg-gray-200 aspect-square rounded-t-2xl"></div>
//                   <div className="p-6 space-y-3">
//                     <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
//                     <div className="w-full h-4 bg-gray-200 rounded"></div>
//                     <div className="w-1/2 h-6 mt-4 bg-gray-200 rounded"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : featuredProducts.length > 0 ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {featuredProducts.map((product) => (
//                 <div 
//                   key={product.id} 
//                   className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md cursor-pointer group rounded-2xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1" 
//                   onClick={() => navigate(`/product/${product.id}`)}
//                 >
//                   <div className="relative overflow-hidden bg-gray-100 aspect-square">
//                     <img 
//                       src={product.image_url} 
//                       alt={product.name} 
//                       className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
//                     />
//                     <div className="absolute px-3 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-full shadow-sm top-4 left-4 bg-white/90 backdrop-blur-sm">
//                       {product.category?.name || "Gycora"}
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
//                     <p className="mb-4 text-sm text-gray-500 line-clamp-2">
//                       {product.description || "Temukan kilau alami rambut Anda dengan perawatan eksklusif dari Gycora."}
//                     </p>
//                     <div className="flex items-center justify-between">
//                       <span className="text-xl font-extrabold text-gycora">{formatRupiah(product.price)}</span>
//                       <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="py-12 italic text-center text-gray-500">Belum ada produk yang tersedia.</div>
//           )}
          
//           <div className="mt-8 text-center sm:hidden">
//             <Link to="/products" className="font-bold transition-colors text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>
//         </div>
//       </div> 

//       {/* =========================================
//           5. TESTIMONIALS / SOCIAL PROOF (SEKSI BARU)
//       ========================================= */}
//       <div className="py-24 border-t border-gray-100 bg-emerald-50/50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-16 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Kata Mereka Tentang Gycora</h2>
//             <p className="mt-4 text-gray-500">Ulasan jujur dari pelanggan setia yang telah membuktikan kualitas kami.</p>
//           </div>

//           <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//             {testimonials.map((testi) => (
//               <div key={testi.id} className="p-8 bg-white border border-gray-100 shadow-sm rounded-3xl">
//                 <div className="flex gap-1 mb-4 text-amber-400">
//                   {[...Array(testi.rating)].map((_, i) => (
//                     <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
//                   ))}
//                 </div>
//                 <p className="mb-6 italic text-gray-600">"{testi.text}"</p>
//                 <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
//                   <div className="flex items-center justify-center w-10 h-10 font-bold rounded-full bg-emerald-100 text-emerald-700">
//                     {testi.name.charAt(0)}
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-bold text-gray-900">{testi.name}</h4>
//                     <p className="text-xs text-gray-500">{testi.role}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           6. CTA (CALL TO ACTION) / NEWSLETTER
//       ========================================= */}
//       <div className="relative py-24 overflow-hidden bg-gray-900">
//         {/* Dekorasi Glow */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gycora rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        
//         <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
//             Siap mengubah rutinitas rambut Anda?
//           </h2>
//           <p className="mt-4 mb-10 text-lg text-gray-400">
//             Bergabunglah dengan ribuan pelanggan yang telah merasakan keajaiban Ethereal Glow Brush dan rangkaian produk Gycora lainnya.
//           </p>
//           {!userData ? (
//              <button onClick={() => navigate("/register")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Mulai Perjalanan Anda Sekarang
//              </button>
//           ) : (
//             <button onClick={() => navigate("/products")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Belanja Koleksi Kami
//             </button>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api"; 
// import Swal from "sweetalert2"; 

// // --- IMPORT GAMBAR DARI LOKAL UNTUK SLIDER ---
// import slide1 from "/landing_page_images/hero_slide_1.jpg";
// import slide2 from "/landing_page_images/hero_slide_2.jpg";
// import slide3 from "/landing_page_images/hero_slide_3.jpg";
// import slide4 from "/landing_page_images/hero_slide_4.jpg";
// import slide5 from "/landing_page_images/hero_slide_5.jpg"; 

// const heroSlides = [
//   { id: 1, image: slide1, alt: "Gycora Premium Hair Care 1" },
//   { id: 2, image: slide2, alt: "Gycora Premium Hair Care 2" },
//   { id: 3, image: slide3, alt: "Gycora Premium Hair Care 3" },
//   { id: 4, image: slide4, alt: "Gycora Premium Hair Care 4" },
//   { id: 5, image: slide5, alt: "Gycora Premium Hair Care 5" },
// ];

// const testimonials = [
//   { id: 1, name: "Amanda S.", role: "Verified Buyer", text: "Ethereal Glow Brush benar-benar mengubah hidup saya. Rambut yang biasanya rontok saat disisir sekarang sangat mudah diatur dan jauh lebih berkilau!", rating: 5 },
//   { id: 2, name: "Rina Kartika", role: "Gycora Member", text: "Wangi dari Revitalizing Shampoo sangat elegan dan tahan lama. Kulit kepala terasa lebih bersih tanpa membuat ujung rambut menjadi kering.", rating: 5 },
//   { id: 3, name: "Jessica W.", role: "Verified Buyer", text: "Awalnya ragu, tapi setelah mencoba Argan Hair Serum selama 2 minggu, ujung rambut bercabang saya benar-benar membaik. Sangat direkomendasikan!", rating: 4 }
// ];

// export default function Home() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
  
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
//   const [isLoadingProducts, setIsLoadingProducts] = useState(true);

//   // --- STATE UNTUK POP-UP PROMO ---
//   const [isPromoMounted, setIsPromoMounted] = useState(false); 
//   const [showPromoModal, setShowPromoModal] = useState(false); 
//   const [promoEmail, setPromoEmail] = useState("");
//   const [isSubscribing, setIsSubscribing] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user_data");
//     if (storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }

//     // Mount modal secara instan, lalu trigger animasi 50ms kemudian agar CSS transisi bekerja
//     setIsPromoMounted(true);
//     const animTimer = setTimeout(() => {
//       setShowPromoModal(true);
//     }, 50);

//     const fetchFeaturedProducts = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (res.ok) {
//           const data = await res.json();
//           const productsArray = data.data ? data.data : data;
//           setFeaturedProducts(productsArray.slice(0, 3) || []);
//         }
//       } catch (error) {
//         console.error("Gagal memuat produk unggulan:", error);
//       } finally {
//         setIsLoadingProducts(false);
//       }
//     };

//     fetchFeaturedProducts();

//     return () => {
//       clearTimeout(animTimer);
//     };
//   }, []);

//   useEffect(() => {
//     if (userData) return; 
//     const slideInterval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
//     }, 4000); 
//     return () => clearInterval(slideInterval);
//   }, [userData]);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
//   };

//   const closePromoModal = () => {
//     setShowPromoModal(false); 
//     setTimeout(() => {
//       setIsPromoMounted(false);
//     }, 300);
//   };

//   // --- MENGHUBUNGKAN KE ENDPOINT /PROMO/CLAIM ---
//   const handleSubscribePromo = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!promoEmail) return;
    
//     setIsSubscribing(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/promo/claim`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Accept": "application/json" },
//         body: JSON.stringify({ email: promoEmail }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         closePromoModal();
//         Swal.fire({
//           icon: "success",
//           title: "Kode Promo Terkirim!",
//           text: "Silakan periksa kotak masuk email Anda untuk mendapatkan kode voucher spesial dari Gycora.",
//           confirmButtonColor: "#059669",
//         });
//       } else {
//         Swal.fire({ 
//           icon: "warning", 
//           title: "Pemberitahuan", 
//           text: data.message || "Gagal mengklaim promo. Pastikan format email benar.", 
//           confirmButtonColor: "#d33" 
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire({ 
//         icon: "error", 
//         title: "Gagal", 
//         text: "Terjadi kesalahan server saat memproses permintaan Anda.", 
//         confirmButtonColor: "#d33" 
//       });
//     } finally {
//       setIsSubscribing(false);
//     }
//   };

//   return (
//     <div className="relative font-sans bg-white">
      
//       {/* =========================================
//           POP-UP PROMO MODAL (DENGAN ANIMASI INSTAN)
//       ========================================= */}
//       {isPromoMounted && (
//         <div 
//           className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ease-out
//             ${showPromoModal ? 'bg-black/60 backdrop-blur-sm opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0'}
//           `}
//         >
//           <div 
//             className={`relative flex flex-col w-full max-w-3xl overflow-hidden bg-white shadow-2xl md:flex-row rounded-2xl transition-all duration-500 ease-out transform
//               ${showPromoModal ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}
//             `}
//           >
//             <button 
//               onClick={closePromoModal}
//               className="absolute z-10 flex items-center justify-center w-8 h-8 text-gray-500 transition-colors bg-white rounded-full shadow-md top-4 right-4 hover:bg-gray-100 hover:text-gray-900"
//             >
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//             </button>

//             <div className="flex flex-col justify-center flex-1 p-8 md:p-12">
//               <h2 className="mb-2 font-serif text-4xl font-black tracking-tight text-gray-900 uppercase">Gycora</h2>
//               <h3 className="mb-4 text-3xl font-extrabold leading-tight text-gycora-dark">
//                 Klaim Voucher Belanja
//               </h3>
//               <p className="mb-8 text-sm font-medium text-gray-500">
//                 Masukkan email Anda untuk mendapatkan kode voucher eksklusif yang bisa langsung digunakan pada pesanan pertama!
//               </p>
              
//               <form onSubmit={handleSubscribePromo} className="space-y-4">
//                 <input 
//                   type="email" 
//                   value={promoEmail}
//                   onChange={(e) => setPromoEmail(e.target.value)}
//                   placeholder="Alamat Email Anda" 
//                   className="w-full px-4 py-3 text-sm transition-all border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gycora"
//                   required
//                 />
//                 <button 
//                   type="submit" 
//                   disabled={isSubscribing}
//                   className="w-full px-4 py-3 text-sm font-bold tracking-widest text-white uppercase transition-all bg-gray-900 rounded-lg hover:bg-black disabled:bg-gray-400"
//                 >
//                   {isSubscribing ? "Mengirim Kode..." : "Dapatkan Kode Promo"}
//                 </button>
//               </form>
              
//               <p className="mt-4 text-[9px] text-gray-400 leading-relaxed">
//                 *Penawaran hanya berlaku untuk pelanggan baru. Kode akan dikirimkan ke email Anda.
//               </p>
//             </div>

//             <div className="hidden w-full md:block md:w-5/12 bg-emerald-50">
//               <img 
//                 src="/landing_page_images/promo_popup.jpg" 
//                 alt="Promo Gycora" 
//                 className="object-cover w-full h-full"
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* =========================================
//           1. HERO SECTION
//       ========================================= */}
//       <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
//         <div className="absolute top-0 -translate-x-1/2 left-1/2 -z-10">
//           <div className="w-[800px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
//         </div>

//         <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32">
//           {userData ? (
//             <div className="max-w-4xl mx-auto space-y-8 text-center animate-fade-in-up">
//               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                 <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
//                 Gycora Exclusive Member
//               </div>
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
//                 Selamat datang kembali, <span className="text-gycora">{userData.first_name}</span>.
//               </h1>
//               <p className="max-w-2xl mx-auto text-lg text-gray-500 sm:text-xl">
//                 Katalog rambut premium terbaru kami sudah menanti Anda. Nikmati penawaran eksklusif, lacak pesanan, dan dapatkan kemudahan berbelanja khusus untuk member Gycora.
//               </p>
//               <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
//                 <button onClick={() => navigate("/products")} className="px-8 py-3.5 text-base font-bold text-white transition-all bg-gray-900 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5">
//                   Lanjutkan Belanja
//                 </button>
//                 <button onClick={() => navigate("/profile")} className="px-8 py-3.5 text-base font-bold text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                   Profil & Pesanan Saya
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
//               <div className="space-y-8 animate-fade-in-up">
//                 <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                   ✨ Solusi Perawatan Rambut Premium
//                 </div>
//                 <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
//                   Tingkatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-gycora to-emerald-400">Pesona</span><br /> Mahkota Anda.
//                 </h1>
//                 <p className="text-lg leading-relaxed text-gray-500 sm:text-xl">
//                   Temukan koleksi eksklusif Gycora. Diformulasikan dengan teknologi mutakhir dan bahan premium untuk rambut yang lebih sehat, bersinar, dan bebas kusut dari akar hingga ujung.
//                 </p>
//                 <div className="flex flex-col gap-4 pt-4 sm:flex-row">
//                   <Link to="/products" className="px-8 py-4 text-lg font-bold text-center text-white transition-all rounded-full bg-gycora hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5">
//                     Eksplorasi Katalog
//                   </Link>
//                   <Link to="/register" className="px-8 py-4 text-lg font-bold text-center text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                     Daftar Member
//                   </Link>
//                 </div>
//               </div>
              
//               <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//                 <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-pink-50 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
                
//                 <div className="relative w-full overflow-hidden shadow-2xl h-[500px] rounded-[3rem] group">
//                   {heroSlides.map((slide, index) => (
//                     <img 
//                       key={slide.id}
//                       src={slide.image} 
//                       alt={slide.alt} 
//                       className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
//                     />
//                   ))}

//                   <div className="absolute inset-0 flex items-center justify-between px-4 transition-opacity opacity-0 group-hover:opacity-100">
//                     <button onClick={() => setCurrentSlide(prev => prev === 0 ? heroSlides.length - 1 : prev - 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                     </button>
//                     <button onClick={() => setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                     </button>
//                   </div>

//                   <div className="absolute flex justify-center w-full gap-2 bottom-6">
//                     {heroSlides.map((_, index) => (
//                       <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${index === currentSlide ? 'w-8 bg-gycora' : 'w-2.5 bg-white/70 hover:bg-white'}`} aria-label={`Slide ${index + 1}`}></button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =========================================
//           2. CLINIC TEASER SECTION (PENGGANTI KATEGORI)
//       ========================================= */}
//       <div className="py-24 bg-gray-900">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col-reverse items-center gap-12 lg:flex-row">
//             <div className="flex-1 space-y-8">
//               <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
//                 Ragu Memilih Produk?<br/>
//                 <span className="text-emerald-400">Tanya Pakar Kami.</span>
//               </h2>
//               <p className="text-lg leading-relaxed text-gray-400">
//                 Gycora tidak hanya menyediakan produk unggulan, tetapi juga layanan telemedisin terintegrasi. Konsultasikan kondisi rambut, kebotakan, atau masalah kulit Anda secara <strong className="text-white">GRATIS</strong> bersama dokter spesialis kami, dan dapatkan resep yang dirancang khusus untuk Anda.
//               </p>
//               <div className="pt-4">
//                 <button 
//                   onClick={() => navigate('/consult')}
//                   className="inline-flex items-center gap-2 px-8 py-4 font-bold text-gray-900 transition-all bg-white rounded-full hover:bg-emerald-50 hover:scale-105"
//                 >
//                   Mulai Konsultasi Gratis
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
//                 </button>
//               </div>
//             </div>
//             <div className="flex-1 w-full lg:w-auto">
//               <div className="relative">
//                 {/* Aksen glow di belakang gambar */}
//                 <div className="absolute inset-0 transform scale-105 bg-emerald-500 rounded-3xl blur-2xl opacity-20"></div>
//                 <img 
//                   src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
//                   alt="Gycora Dermatologist" 
//                   className="relative object-cover w-full shadow-2xl h-96 rounded-3xl"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           3. VALUE PROPOSITION (MENGAPA GYCORA?)
//       ========================================= */}
//       <div className="py-24 border-b border-gray-100 bg-gray-50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Teknologi Mutakhir</h3>
//               <p className="leading-relaxed text-gray-500">Molekul karbon konduktif pada alat kami menetralkan listrik statis, mencegah rambut kusut dan rusak seketika.</p>
//             </div>
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Bahan Baku Premium</h3>
//               <p className="leading-relaxed text-gray-500">Setiap tetes diformulasikan dengan bahan baku berkualitas tinggi yang aman dan teruji klinis untuk kesehatan.</p>
//             </div>
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Cruelty-Free</h3>
//               <p className="leading-relaxed text-gray-500">Kecantikan sejati tidak menyakiti. Seluruh lini produk Gycora 100% bebas dari uji coba pada hewan.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           4. FEATURED PRODUCTS (PRODUK UNGGULAN DINAMIS)
//       ========================================= */}
//       <div className="py-24 bg-white">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-between mb-12 sm:flex-row">
//             <div>
//               <h2 className="text-3xl font-extrabold text-gray-900">Produk Terlaris Kami</h2>
//               <p className="mt-2 text-gray-500">Pilihan favorit pelanggan Gycora bulan ini.</p>
//             </div>
//             <Link to="/products" className="hidden font-bold transition-colors sm:block text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>

//           {isLoadingProducts ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="bg-white border border-gray-100 shadow-sm rounded-2xl animate-pulse">
//                   <div className="w-full bg-gray-200 aspect-square rounded-t-2xl"></div>
//                   <div className="p-6 space-y-3">
//                     <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
//                     <div className="w-full h-4 bg-gray-200 rounded"></div>
//                     <div className="w-1/2 h-6 mt-4 bg-gray-200 rounded"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : featuredProducts.length > 0 ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {featuredProducts.map((product) => (
//                 <div 
//                   key={product.id} 
//                   className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md cursor-pointer group rounded-2xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1" 
//                   onClick={() => navigate(`/product/${product.id}`)}
//                 >
//                   <div className="relative overflow-hidden bg-gray-100 aspect-square">
//                     <img 
//                       src={product.image_url} 
//                       alt={product.name} 
//                       className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
//                     />
//                     <div className="absolute px-3 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-full shadow-sm top-4 left-4 bg-white/90 backdrop-blur-sm">
//                       {product.category?.name || "Gycora"}
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
//                     <p className="mb-4 text-sm text-gray-500 line-clamp-2">
//                       {product.description || "Temukan kilau alami rambut Anda dengan perawatan eksklusif dari Gycora."}
//                     </p>
//                     <div className="flex items-center justify-between">
//                       <span className="text-xl font-extrabold text-gycora">{formatRupiah(product.price)}</span>
//                       <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="py-12 italic text-center text-gray-500">Belum ada produk yang tersedia.</div>
//           )}
          
//           <div className="mt-8 text-center sm:hidden">
//             <Link to="/products" className="font-bold transition-colors text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>
//         </div>
//       </div> 

//       {/* =========================================
//           5. TESTIMONIALS / SOCIAL PROOF
//       ========================================= */}
//       <div className="py-24 border-t border-gray-100 bg-emerald-50/50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-16 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Kata Mereka Tentang Gycora</h2>
//             <p className="mt-4 text-gray-500">Ulasan jujur dari pelanggan setia yang telah membuktikan kualitas kami.</p>
//           </div>

//           <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//             {testimonials.map((testi) => (
//               <div key={testi.id} className="p-8 bg-white border border-gray-100 shadow-sm rounded-3xl">
//                 <div className="flex gap-1 mb-4 text-amber-400">
//                   {[...Array(testi.rating)].map((_, i) => (
//                     <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
//                   ))}
//                 </div>
//                 <p className="mb-6 italic text-gray-600">"{testi.text}"</p>
//                 <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
//                   <div className="flex items-center justify-center w-10 h-10 font-bold rounded-full bg-emerald-100 text-emerald-700">
//                     {testi.name.charAt(0)}
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-bold text-gray-900">{testi.name}</h4>
//                     <p className="text-xs text-gray-500">{testi.role}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           6. CTA (CALL TO ACTION) / NEWSLETTER
//       ========================================= */}
//       <div className="relative py-24 overflow-hidden bg-gray-900">
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gycora rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        
//         <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
//             Siap mengubah rutinitas Anda?
//           </h2>
//           <p className="mt-4 mb-10 text-lg text-gray-400">
//             Bergabunglah dengan ribuan pelanggan yang telah merasakan keajaiban perawatan premium Gycora.
//           </p>
//           {!userData ? (
//              <button onClick={() => navigate("/register")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Mulai Perjalanan Anda Sekarang
//              </button>
//           ) : (
//             <button onClick={() => navigate("/products")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Belanja Koleksi Kami
//             </button>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api"; 
// import Swal from "sweetalert2"; 

// // --- IMPORT GAMBAR DARI LOKAL UNTUK SLIDER ---
// import slide1 from "/landing_page_images/hero_slide_1.jpg";
// import slide2 from "/landing_page_images/hero_slide_2.jpg";
// import slide3 from "/landing_page_images/hero_slide_3.jpg";
// import slide4 from "/landing_page_images/hero_slide_4.jpg";
// import slide5 from "/landing_page_images/hero_slide_5.jpg"; 

// const heroSlides = [
//   { id: 1, image: slide1, alt: "Gycora Premium Hair Care 1" },
//   { id: 2, image: slide2, alt: "Gycora Premium Hair Care 2" },
//   { id: 3, image: slide3, alt: "Gycora Premium Hair Care 3" },
//   { id: 4, image: slide4, alt: "Gycora Premium Hair Care 4" },
//   { id: 5, image: slide5, alt: "Gycora Premium Hair Care 5" },
// ];

// const testimonials = [
//   { id: 1, name: "Amanda S.", role: "Verified Buyer", text: "Ethereal Glow Brush benar-benar mengubah hidup saya. Rambut yang biasanya rontok saat disisir sekarang sangat mudah diatur dan jauh lebih berkilau!", rating: 5 },
//   { id: 2, name: "Rina Kartika", role: "Gycora Member", text: "Wangi dari Revitalizing Shampoo sangat elegan dan tahan lama. Kulit kepala terasa lebih bersih tanpa membuat ujung rambut menjadi kering.", rating: 5 },
//   { id: 3, name: "Jessica W.", role: "Verified Buyer", text: "Awalnya ragu, tapi setelah mencoba Argan Hair Serum selama 2 minggu, ujung rambut bercabang saya benar-benar membaik. Sangat direkomendasikan!", rating: 4 }
// ];

// export default function Home() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
  
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
//   const [isLoadingProducts, setIsLoadingProducts] = useState(true);

//   // --- STATE UNTUK POP-UP PROMO ---
//   const [isPromoMounted, setIsPromoMounted] = useState(false); 
//   const [showPromoModal, setShowPromoModal] = useState(false); 
//   const [promoEmail, setPromoEmail] = useState("");
//   const [isSubscribing, setIsSubscribing] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user_data");
//     if (storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }

//     // Mount modal secara instan, lalu trigger animasi 50ms kemudian agar CSS transisi bekerja
//     setIsPromoMounted(true);
//     const animTimer = setTimeout(() => {
//       setShowPromoModal(true);
//     }, 50);

//     const fetchFeaturedProducts = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (res.ok) {
//           const data = await res.json();
//           const productsArray = data.data ? data.data : data;
//           setFeaturedProducts(productsArray.slice(0, 3) || []);
//         }
//       } catch (error) {
//         console.error("Gagal memuat produk unggulan:", error);
//       } finally {
//         setIsLoadingProducts(false);
//       }
//     };

//     fetchFeaturedProducts();

//     return () => {
//       clearTimeout(animTimer);
//     };
//   }, []);

//   useEffect(() => {
//     if (userData) return; 
//     const slideInterval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
//     }, 4000); 
//     return () => clearInterval(slideInterval);
//   }, [userData]);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
//   };

//   const closePromoModal = () => {
//     setShowPromoModal(false); 
//     setTimeout(() => {
//       setIsPromoMounted(false);
//     }, 300);
//   };

//   // --- MENGHUBUNGKAN KE ENDPOINT /PROMO/CLAIM ---
//   const handleSubscribePromo = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!promoEmail) return;
    
//     setIsSubscribing(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/promo/claim`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Accept": "application/json" },
//         body: JSON.stringify({ email: promoEmail }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         closePromoModal();
//         Swal.fire({
//           icon: "success",
//           title: "Kode Promo Terkirim!",
//           text: "Silakan periksa kotak masuk email Anda untuk mendapatkan kode voucher spesial dari Gycora.",
//           confirmButtonColor: "#059669",
//         });
//       } else {
//         Swal.fire({ 
//           icon: "warning", 
//           title: "Pemberitahuan", 
//           text: data.message || "Gagal mengklaim promo. Pastikan format email benar.", 
//           confirmButtonColor: "#d33" 
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire({ 
//         icon: "error", 
//         title: "Gagal", 
//         text: "Terjadi kesalahan server saat memproses permintaan Anda.", 
//         confirmButtonColor: "#d33" 
//       });
//     } finally {
//       setIsSubscribing(false);
//     }
//   };

//   return (
//     <div className="relative font-sans bg-white">
      
//       {/* =========================================
//           POP-UP PROMO MODAL (DENGAN ANIMASI INSTAN)
//       ========================================= */}
//       {isPromoMounted && (
//         <div 
//           className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ease-out
//             ${showPromoModal ? 'bg-black/60 backdrop-blur-sm opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0'}
//           `}
//         >
//           <div 
//             className={`relative flex flex-col w-full max-w-3xl overflow-hidden bg-white shadow-2xl md:flex-row rounded-2xl transition-all duration-500 ease-out transform
//               ${showPromoModal ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}
//             `}
//           >
//             <button 
//               onClick={closePromoModal}
//               className="absolute z-10 flex items-center justify-center w-8 h-8 text-gray-500 transition-colors bg-white rounded-full shadow-md top-4 right-4 hover:bg-gray-100 hover:text-gray-900"
//             >
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//             </button>

//             <div className="flex flex-col justify-center flex-1 p-8 md:p-12">
//               <h2 className="mb-2 font-serif text-4xl font-black tracking-tight text-gray-900 uppercase">Gycora</h2>
//               <h3 className="mb-4 text-3xl font-extrabold leading-tight text-gycora-dark">
//                 Klaim Voucher Belanja
//               </h3>
//               <p className="mb-8 text-sm font-medium text-gray-500">
//                 Masukkan email Anda untuk mendapatkan kode voucher eksklusif yang bisa langsung digunakan pada pesanan pertama!
//               </p>
              
//               <form onSubmit={handleSubscribePromo} className="space-y-4">
//                 <input 
//                   type="email" 
//                   value={promoEmail}
//                   onChange={(e) => setPromoEmail(e.target.value)}
//                   placeholder="Alamat Email Anda" 
//                   className="w-full px-4 py-3 text-sm transition-all border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gycora"
//                   required
//                 />
//                 <button 
//                   type="submit" 
//                   disabled={isSubscribing}
//                   className="w-full px-4 py-3 text-sm font-bold tracking-widest text-white uppercase transition-all bg-gray-900 rounded-lg hover:bg-black disabled:bg-gray-400"
//                 >
//                   {isSubscribing ? "Mengirim Kode..." : "Dapatkan Kode Promo"}
//                 </button>
//               </form>
              
//               <p className="mt-4 text-[9px] text-gray-400 leading-relaxed">
//                 *Penawaran hanya berlaku untuk pelanggan baru. Kode akan dikirimkan ke email Anda.
//               </p>
//             </div>

//             <div className="hidden w-full md:block md:w-5/12 bg-emerald-50">
//               <img 
//                 src="/landing_page_images/promo_popup.jpg" 
//                 alt="Promo Gycora" 
//                 className="object-cover w-full h-full"
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* =========================================
//           1. HERO SECTION
//       ========================================= */}
//       <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
//         <div className="absolute top-0 -translate-x-1/2 left-1/2 -z-10">
//           <div className="w-[800px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
//         </div>

//         <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32">
//           {userData ? (
//             <div className="max-w-4xl mx-auto space-y-8 text-center animate-fade-in-up">
//               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                 <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
//                 Gycora Exclusive Member
//               </div>
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
//                 Selamat datang kembali, <span className="text-gycora">{userData.first_name}</span>.
//               </h1>
//               <p className="max-w-2xl mx-auto text-lg text-gray-500 sm:text-xl">
//                 Katalog rambut premium terbaru kami sudah menanti Anda. Nikmati penawaran eksklusif, lacak pesanan, dan dapatkan kemudahan berbelanja khusus untuk member Gycora.
//               </p>
//               <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
//                 <button onClick={() => navigate("/products")} className="px-8 py-3.5 text-base font-bold text-white transition-all bg-gray-900 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5">
//                   Lanjutkan Belanja
//                 </button>
//                 <button onClick={() => navigate("/profile")} className="px-8 py-3.5 text-base font-bold text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                   Profil & Pesanan Saya
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
//               <div className="space-y-8 animate-fade-in-up">
//                 <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                   ✨ Solusi Perawatan Rambut Premium
//                 </div>
//                 <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
//                   Tingkatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-gycora to-emerald-400">Pesona</span><br /> Mahkota Anda.
//                 </h1>
//                 <p className="text-lg leading-relaxed text-gray-500 sm:text-xl">
//                   Temukan koleksi eksklusif Gycora. Diformulasikan dengan teknologi mutakhir dan bahan premium untuk rambut yang lebih sehat, bersinar, dan bebas kusut dari akar hingga ujung.
//                 </p>
//                 <div className="flex flex-col gap-4 pt-4 sm:flex-row">
//                   <Link to="/products" className="px-8 py-4 text-lg font-bold text-center text-white transition-all rounded-full bg-gycora hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5">
//                     Eksplorasi Katalog
//                   </Link>
//                   <Link to="/register" className="px-8 py-4 text-lg font-bold text-center text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                     Daftar Member
//                   </Link>
//                 </div>
//               </div>
              
//               <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//                 <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-pink-50 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
                
//                 <div className="relative w-full overflow-hidden shadow-2xl h-[500px] rounded-[3rem] group">
//                   {heroSlides.map((slide, index) => (
//                     <img 
//                       key={slide.id}
//                       src={slide.image} 
//                       alt={slide.alt} 
//                       className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
//                     />
//                   ))}

//                   <div className="absolute inset-0 flex items-center justify-between px-4 transition-opacity opacity-0 group-hover:opacity-100">
//                     <button onClick={() => setCurrentSlide(prev => prev === 0 ? heroSlides.length - 1 : prev - 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                     </button>
//                     <button onClick={() => setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                     </button>
//                   </div>

//                   <div className="absolute flex justify-center w-full gap-2 bottom-6">
//                     {heroSlides.map((_, index) => (
//                       <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${index === currentSlide ? 'w-8 bg-gycora' : 'w-2.5 bg-white/70 hover:bg-white'}`} aria-label={`Slide ${index + 1}`}></button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =========================================
//           2. CLINIC TEASER SECTION (PENGGANTI KATEGORI)
//       ========================================= */}
//       <div className="py-24 bg-gray-900">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col-reverse items-center gap-12 lg:flex-row">
//             <div className="flex-1 space-y-8">
//               <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
//                 Ragu Memilih Produk?<br/>
//                 <span className="text-emerald-400">Tanya Pakar Kami.</span>
//               </h2>
//               <p className="text-lg leading-relaxed text-gray-400">
//                 Gycora tidak hanya menyediakan produk unggulan, tetapi juga layanan telemedisin terintegrasi. Konsultasikan kondisi rambut, kebotakan, atau masalah kulit Anda secara <strong className="text-white">GRATIS</strong> bersama dokter spesialis kami, dan dapatkan resep yang dirancang khusus untuk Anda.
//               </p>
//               <div className="pt-4">
//                 <button 
//                   onClick={() => navigate('/consult')}
//                   className="inline-flex items-center gap-2 px-8 py-4 font-bold text-gray-900 transition-all bg-white rounded-full hover:bg-emerald-50 hover:scale-105"
//                 >
//                   Mulai Konsultasi Gratis
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
//                 </button>
//               </div>
//             </div>
//             <div className="flex-1 w-full lg:w-auto">
//               <div className="relative">
//                 {/* Aksen glow di belakang gambar */}
//                 <div className="absolute inset-0 transform scale-105 bg-emerald-500 rounded-3xl blur-2xl opacity-20"></div>
//                 {/* GAMBAR UNSPLASH DIUBAH MENJADI RAMBUT DISISIR */}
//                 <img 
//                   src="https://images.unsplash.com/photo-1560869713-da86a9ec460b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
//                   alt="Gycora Hair Care Routine" 
//                   className="relative object-cover w-full shadow-2xl h-96 rounded-3xl"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           3. VALUE PROPOSITION (MENGAPA GYCORA?)
//       ========================================= */}
//       <div className="py-24 border-b border-gray-100 bg-gray-50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Teknologi Mutakhir</h3>
//               <p className="leading-relaxed text-gray-500">Molekul karbon konduktif pada alat kami menetralkan listrik statis, mencegah rambut kusut dan rusak seketika.</p>
//             </div>
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Bahan Baku Premium</h3>
//               <p className="leading-relaxed text-gray-500">Setiap tetes diformulasikan dengan bahan baku berkualitas tinggi yang aman dan teruji klinis untuk kesehatan.</p>
//             </div>
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Cruelty-Free</h3>
//               <p className="leading-relaxed text-gray-500">Kecantikan sejati tidak menyakiti. Seluruh lini produk Gycora 100% bebas dari uji coba pada hewan.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           4. FEATURED PRODUCTS (PRODUK UNGGULAN DINAMIS)
//       ========================================= */}
//       <div className="py-24 bg-white">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-between mb-12 sm:flex-row">
//             <div>
//               <h2 className="text-3xl font-extrabold text-gray-900">Produk Terlaris Kami</h2>
//               <p className="mt-2 text-gray-500">Pilihan favorit pelanggan Gycora bulan ini.</p>
//             </div>
//             <Link to="/products" className="hidden font-bold transition-colors sm:block text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>

//           {isLoadingProducts ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="bg-white border border-gray-100 shadow-sm rounded-2xl animate-pulse">
//                   <div className="w-full bg-gray-200 aspect-square rounded-t-2xl"></div>
//                   <div className="p-6 space-y-3">
//                     <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
//                     <div className="w-full h-4 bg-gray-200 rounded"></div>
//                     <div className="w-1/2 h-6 mt-4 bg-gray-200 rounded"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : featuredProducts.length > 0 ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {featuredProducts.map((product) => (
//                 <div 
//                   key={product.id} 
//                   className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md cursor-pointer group rounded-2xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1" 
//                   onClick={() => navigate(`/product/${product.id}`)}
//                 >
//                   <div className="relative overflow-hidden bg-gray-100 aspect-square">
//                     <img 
//                       src={product.image_url} 
//                       alt={product.name} 
//                       className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
//                     />
//                     <div className="absolute px-3 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-full shadow-sm top-4 left-4 bg-white/90 backdrop-blur-sm">
//                       {product.category?.name || "Gycora"}
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
//                     <p className="mb-4 text-sm text-gray-500 line-clamp-2">
//                       {product.description || "Temukan kilau alami rambut Anda dengan perawatan eksklusif dari Gycora."}
//                     </p>
//                     <div className="flex items-center justify-between">
//                       <span className="text-xl font-extrabold text-gycora">{formatRupiah(product.price)}</span>
//                       <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="py-12 italic text-center text-gray-500">Belum ada produk yang tersedia.</div>
//           )}
          
//           <div className="mt-8 text-center sm:hidden">
//             <Link to="/products" className="font-bold transition-colors text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>
//         </div>
//       </div> 

//       {/* =========================================
//           5. TESTIMONIALS / SOCIAL PROOF
//       ========================================= */}
//       <div className="py-24 border-t border-gray-100 bg-emerald-50/50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-16 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Kata Mereka Tentang Gycora</h2>
//             <p className="mt-4 text-gray-500">Ulasan jujur dari pelanggan setia yang telah membuktikan kualitas kami.</p>
//           </div>

//           <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//             {testimonials.map((testi) => (
//               <div key={testi.id} className="p-8 bg-white border border-gray-100 shadow-sm rounded-3xl">
//                 <div className="flex gap-1 mb-4 text-amber-400">
//                   {[...Array(testi.rating)].map((_, i) => (
//                     <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
//                   ))}
//                 </div>
//                 <p className="mb-6 italic text-gray-600">"{testi.text}"</p>
//                 <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
//                   <div className="flex items-center justify-center w-10 h-10 font-bold rounded-full bg-emerald-100 text-emerald-700">
//                     {testi.name.charAt(0)}
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-bold text-gray-900">{testi.name}</h4>
//                     <p className="text-xs text-gray-500">{testi.role}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           6. CTA (CALL TO ACTION) / NEWSLETTER
//       ========================================= */}
//       <div className="relative py-24 overflow-hidden bg-gray-900">
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gycora rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        
//         <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
//             Siap mengubah rutinitas Anda?
//           </h2>
//           <p className="mt-4 mb-10 text-lg text-gray-400">
//             Bergabunglah dengan ribuan pelanggan yang telah merasakan keajaiban perawatan premium Gycora.
//           </p>
//           {!userData ? (
//              <button onClick={() => navigate("/register")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Mulai Perjalanan Anda Sekarang
//              </button>
//           ) : (
//             <button onClick={() => navigate("/products")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Belanja Koleksi Kami
//             </button>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api"; 
// import Swal from "sweetalert2"; 

// // --- IMPORT GAMBAR DARI LOKAL UNTUK SLIDER & ASET ---
// import slide1 from "/landing_page_images/hero_slide_1.jpg";
// import slide2 from "/landing_page_images/hero_slide_2.jpg";
// import slide3 from "/landing_page_images/hero_slide_3.jpg";
// import slide4 from "/landing_page_images/hero_slide_4.jpg";
// import slide5 from "/landing_page_images/hero_slide_5.jpg"; 

// // Import aset baru untuk seksi janji temu
// import gycoraPromise from "/landing_page_images/gycora_promise.webp";

// const heroSlides = [
//   { id: 1, image: slide1, alt: "Gycora Premium Hair Care 1" },
//   { id: 2, image: slide2, alt: "Gycora Premium Hair Care 2" },
//   { id: 3, image: slide3, alt: "Gycora Premium Hair Care 3" },
//   { id: 4, image: slide4, alt: "Gycora Premium Hair Care 4" },
//   { id: 5, image: slide5, alt: "Gycora Premium Hair Care 5" },
// ];

// const testimonials = [
//   { id: 1, name: "Amanda S.", role: "Verified Buyer", text: "Ethereal Glow Brush benar-benar mengubah hidup saya. Rambut yang biasanya rontok saat disisir sekarang sangat mudah diatur dan jauh lebih berkilau!", rating: 5 },
//   { id: 2, name: "Rina Kartika", role: "Gycora Member", text: "Wangi dari Revitalizing Shampoo sangat elegan dan tahan lama. Kulit kepala terasa lebih bersih tanpa membuat ujung rambut menjadi kering.", rating: 5 },
//   { id: 3, name: "Jessica W.", role: "Verified Buyer", text: "Awalnya ragu, tapi setelah mencoba Argan Hair Serum selama 2 minggu, ujung rambut bercabang saya benar-benar membaik. Sangat direkomendasikan!", rating: 4 }
// ];

// export default function Home() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
  
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
//   const [isLoadingProducts, setIsLoadingProducts] = useState(true);

//   // --- STATE UNTUK POP-UP PROMO ---
//   const [isPromoMounted, setIsPromoMounted] = useState(false); 
//   const [showPromoModal, setShowPromoModal] = useState(false); 
//   const [promoEmail, setPromoEmail] = useState("");
//   const [isSubscribing, setIsSubscribing] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user_data");
//     if (storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }

//     // Mount modal secara instan, lalu trigger animasi 50ms kemudian agar CSS transisi bekerja
//     setIsPromoMounted(true);
//     const animTimer = setTimeout(() => {
//       setShowPromoModal(true);
//     }, 50);

//     const fetchFeaturedProducts = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (res.ok) {
//           const data = await res.json();
//           const productsArray = data.data ? data.data : data;
//           setFeaturedProducts(productsArray.slice(0, 3) || []);
//         }
//       } catch (error) {
//         console.error("Gagal memuat produk unggulan:", error);
//       } finally {
//         setIsLoadingProducts(false);
//       }
//     };

//     fetchFeaturedProducts();

//     return () => {
//       clearTimeout(animTimer);
//     };
//   }, []);

//   useEffect(() => {
//     if (userData) return; 
//     const slideInterval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
//     }, 4000); 
//     return () => clearInterval(slideInterval);
//   }, [userData]);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
//   };

//   const closePromoModal = () => {
//     setShowPromoModal(false); 
//     setTimeout(() => {
//       setIsPromoMounted(false);
//     }, 300);
//   };

//   // --- MENGHUBUNGKAN KE ENDPOINT /PROMO/CLAIM ---
//   const handleSubscribePromo = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!promoEmail) return;
    
//     setIsSubscribing(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/promo/claim`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Accept": "application/json" },
//         body: JSON.stringify({ email: promoEmail }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         closePromoModal();
//         Swal.fire({
//           icon: "success",
//           title: "Kode Promo Terkirim!",
//           text: "Silakan periksa kotak masuk email Anda untuk mendapatkan kode voucher spesial dari Gycora.",
//           confirmButtonColor: "#059669",
//         });
//       } else {
//         Swal.fire({ 
//           icon: "warning", 
//           title: "Pemberitahuan", 
//           text: data.message || "Gagal mengklaim promo. Pastikan format email benar.", 
//           confirmButtonColor: "#d33" 
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire({ 
//         icon: "error", 
//         title: "Gagal", 
//         text: "Terjadi kesalahan server saat memproses permintaan Anda.", 
//         confirmButtonColor: "#d33" 
//       });
//     } finally {
//       setIsSubscribing(false);
//     }
//   };

//   return (
//     <div className="relative font-sans bg-white">
      
//       {/* =========================================
//           POP-UP PROMO MODAL (DENGAN ANIMASI INSTAN)
//       ========================================= */}
//       {isPromoMounted && (
//         <div 
//           className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ease-out
//             ${showPromoModal ? 'bg-black/60 backdrop-blur-sm opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0'}
//           `}
//         >
//           <div 
//             className={`relative flex flex-col w-full max-w-3xl overflow-hidden bg-white shadow-2xl md:flex-row rounded-2xl transition-all duration-500 ease-out transform
//               ${showPromoModal ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}
//             `}
//           >
//             <button 
//               onClick={closePromoModal}
//               className="absolute z-10 flex items-center justify-center w-8 h-8 text-gray-500 transition-colors bg-white rounded-full shadow-md top-4 right-4 hover:bg-gray-100 hover:text-gray-900"
//             >
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//             </button>

//             <div className="flex flex-col justify-center flex-1 p-8 md:p-12">
//               <h2 className="mb-2 font-serif text-4xl font-black tracking-tight text-gray-900 uppercase">Gycora</h2>
//               <h3 className="mb-4 text-3xl font-extrabold leading-tight text-gycora-dark">
//                 Klaim Voucher Belanja
//               </h3>
//               <p className="mb-8 text-sm font-medium text-gray-500">
//                 Masukkan email Anda untuk mendapatkan kode voucher eksklusif yang bisa langsung digunakan pada pesanan pertama!
//               </p>
              
//               <form onSubmit={handleSubscribePromo} className="space-y-4">
//                 <input 
//                   type="email" 
//                   value={promoEmail}
//                   onChange={(e) => setPromoEmail(e.target.value)}
//                   placeholder="Alamat Email Anda" 
//                   className="w-full px-4 py-3 text-sm transition-all border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gycora"
//                   required
//                 />
//                 <button 
//                   type="submit" 
//                   disabled={isSubscribing}
//                   className="w-full px-4 py-3 text-sm font-bold tracking-widest text-white uppercase transition-all bg-gray-900 rounded-lg hover:bg-black disabled:bg-gray-400"
//                 >
//                   {isSubscribing ? "Mengirim Kode..." : "Dapatkan Kode Promo"}
//                 </button>
//               </form>
              
//               <p className="mt-4 text-[9px] text-gray-400 leading-relaxed">
//                 *Penawaran hanya berlaku untuk pelanggan baru. Kode akan dikirimkan ke email Anda.
//               </p>
//             </div>

//             <div className="hidden w-full md:block md:w-5/12 bg-emerald-50">
//               <img 
//                 src="/landing_page_images/promo_popup.jpg" 
//                 alt="Promo Gycora" 
//                 className="object-cover w-full h-full"
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* =========================================
//           1. HERO SECTION
//       ========================================= */}
//       <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
//         <div className="absolute top-0 -translate-x-1/2 left-1/2 -z-10">
//           <div className="w-[800px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
//         </div>

//         <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32">
//           {userData ? (
//             <div className="max-w-4xl mx-auto space-y-8 text-center animate-fade-in-up">
//               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                 <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
//                 Gycora Exclusive Member
//               </div>
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
//                 Selamat datang kembali, <span className="text-gycora">{userData.first_name}</span>.
//               </h1>
//               <p className="max-w-2xl mx-auto text-lg text-gray-500 sm:text-xl">
//                 Katalog rambut premium terbaru kami sudah menanti Anda. Nikmati penawaran eksklusif, lacak pesanan, dan dapatkan kemudahan berbelanja khusus untuk member Gycora.
//               </p>
//               <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
//                 <button onClick={() => navigate("/products")} className="px-8 py-3.5 text-base font-bold text-white transition-all bg-gray-900 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5">
//                   Lanjutkan Belanja
//                 </button>
//                 <button onClick={() => navigate("/profile")} className="px-8 py-3.5 text-base font-bold text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                   Profil & Pesanan Saya
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
//               <div className="space-y-8 animate-fade-in-up">
//                 <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                   ✨ Solusi Perawatan Rambut Premium
//                 </div>
//                 <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
//                   Tingkatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-gycora to-emerald-400">Pesona</span><br /> Mahkota Anda.
//                 </h1>
//                 <p className="text-lg leading-relaxed text-gray-500 sm:text-xl">
//                   Temukan koleksi eksklusif Gycora. Diformulasikan dengan teknologi mutakhir dan bahan premium untuk rambut yang lebih sehat, bersinar, dan bebas kusut dari akar hingga ujung.
//                 </p>
//                 <div className="flex flex-col gap-4 pt-4 sm:flex-row">
//                   <Link to="/products" className="px-8 py-4 text-lg font-bold text-center text-white transition-all rounded-full bg-gycora hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5">
//                     Eksplorasi Katalog
//                   </Link>
//                   <Link to="/register" className="px-8 py-4 text-lg font-bold text-center text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                     Daftar Member
//                   </Link>
//                 </div>
//               </div>
              
//               <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//                 <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-pink-50 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
                
//                 <div className="relative w-full overflow-hidden shadow-2xl h-[500px] rounded-[3rem] group">
//                   {heroSlides.map((slide, index) => (
//                     <img 
//                       key={slide.id}
//                       src={slide.image} 
//                       alt={slide.alt} 
//                       className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
//                     />
//                   ))}

//                   <div className="absolute inset-0 flex items-center justify-between px-4 transition-opacity opacity-0 group-hover:opacity-100">
//                     <button onClick={() => setCurrentSlide(prev => prev === 0 ? heroSlides.length - 1 : prev - 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                     </button>
//                     <button onClick={() => setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                     </button>
//                   </div>

//                   <div className="absolute flex justify-center w-full gap-2 bottom-6">
//                     {heroSlides.map((_, index) => (
//                       <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${index === currentSlide ? 'w-8 bg-gycora' : 'w-2.5 bg-white/70 hover:bg-white'}`} aria-label={`Slide ${index + 1}`}></button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =========================================
//           2. CLINIC TEASER SECTION (PENGGANTI KATEGORI)
//       ========================================= */}
//       <div className="py-24 bg-gray-900">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col-reverse items-center gap-12 lg:flex-row">
//             <div className="flex-1 space-y-8">
//               <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
//                 Ragu Memilih Produk?<br/>
//                 <span className="text-emerald-400">Tanya Pakar Kami.</span>
//               </h2>
//               <p className="text-lg leading-relaxed text-gray-400">
//                 Gycora tidak hanya menyediakan produk unggulan, tetapi juga layanan telemedisin terintegrasi. Konsultasikan kondisi rambut, kebotakan, atau masalah kulit Anda secara <strong className="text-white">GRATIS</strong> bersama dokter spesialis kami, dan dapatkan resep yang dirancang khusus untuk Anda.
//               </p>
//               <div className="pt-4">
//                 <button 
//                   onClick={() => navigate('/consult')}
//                   className="inline-flex items-center gap-2 px-8 py-4 font-bold text-gray-900 transition-all bg-white rounded-full hover:bg-emerald-50 hover:scale-105"
//                 >
//                   Mulai Konsultasi Gratis
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
//                 </button>
//               </div>
//             </div>
//             {/* WADAH GAMBAR DISESUAIKAN UNTUK RESOLUSI 1080x1350 (Portrait 4:5) */}
//             <div className="flex-1 w-full lg:w-auto">
//               {/* Menambahkan aspek rasio 4/5 dan membatasi lebar maksimal agar tidak terlalu besar di desktop */}
//               <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-none lg:mx-0">
//                 {/* Aksen glow di belakang gambar */}
//                 <div className="absolute inset-0 transform scale-105 bg-emerald-500 rounded-3xl blur-2xl opacity-20"></div>
//                 {/* MENGGUNAKAN ASET LOKAL, MENGHAPUS onError, TINGGI DISESUAIKAN KE FULL */}
//                 <img 
//                   src={gycoraPromise} 
//                   alt="Gycora Promise Hair Care Routine" 
//                   className="relative object-cover w-full h-full shadow-2xl rounded-3xl"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           3. VALUE PROPOSITION (MENGAPA GYCORA?)
//       ========================================= */}
//       <div className="py-24 border-b border-gray-100 bg-gray-50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Teknologi Mutakhir</h3>
//               <p className="leading-relaxed text-gray-500">Molekul karbon konduktif pada alat kami menetralkan listrik statis, mencegah rambut kusut dan rusak seketika.</p>
//             </div>
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Bahan Baku Premium</h3>
//               <p className="leading-relaxed text-gray-500">Setiap tetes diformulasikan dengan bahan baku berkualitas tinggi yang aman dan teruji klinis untuk kesehatan.</p>
//             </div>
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Cruelty-Free</h3>
//               <p className="leading-relaxed text-gray-500">Kecantikan sejati tidak menyakiti. Seluruh lini produk Gycora 100% bebas dari uji coba pada hewan.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           4. FEATURED PRODUCTS (PRODUK UNGGULAN DINAMIS)
//       ========================================= */}
//       <div className="py-24 bg-white">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-between mb-12 sm:flex-row">
//             <div>
//               <h2 className="text-3xl font-extrabold text-gray-900">Produk Terlaris Kami</h2>
//               <p className="mt-2 text-gray-500">Pilihan favorit pelanggan Gycora bulan ini.</p>
//             </div>
//             <Link to="/products" className="hidden font-bold transition-colors sm:block text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>

//           {isLoadingProducts ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="bg-white border border-gray-100 shadow-sm rounded-2xl animate-pulse">
//                   <div className="w-full bg-gray-200 aspect-square rounded-t-2xl"></div>
//                   <div className="p-6 space-y-3">
//                     <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
//                     <div className="w-full h-4 bg-gray-200 rounded"></div>
//                     <div className="w-1/2 h-6 mt-4 bg-gray-200 rounded"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : featuredProducts.length > 0 ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {featuredProducts.map((product) => (
//                 <div 
//                   key={product.id} 
//                   className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md cursor-pointer group rounded-2xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1" 
//                   onClick={() => navigate(`/product/${product.id}`)}
//                 >
//                   <div className="relative overflow-hidden bg-gray-100 aspect-square">
//                     <img 
//                       src={product.image_url} 
//                       alt={product.name} 
//                       className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
//                     />
//                     <div className="absolute px-3 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-full shadow-sm top-4 left-4 bg-white/90 backdrop-blur-sm">
//                       {product.category?.name || "Gycora"}
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
//                     <p className="mb-4 text-sm text-gray-500 line-clamp-2">
//                       {product.description || "Temukan kilau alami rambut Anda dengan perawatan eksklusif dari Gycora."}
//                     </p>
//                     <div className="flex items-center justify-between">
//                       <span className="text-xl font-extrabold text-gycora">{formatRupiah(product.price)}</span>
//                       <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="py-12 italic text-center text-gray-500">Belum ada produk yang tersedia.</div>
//           )}
          
//           <div className="mt-8 text-center sm:hidden">
//             <Link to="/products" className="font-bold transition-colors text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>
//         </div>
//       </div> 

//       {/* =========================================
//           5. TESTIMONIALS / SOCIAL PROOF
//       ========================================= */}
//       <div className="py-24 border-t border-gray-100 bg-emerald-50/50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-16 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Kata Mereka Tentang Gycora</h2>
//             <p className="mt-4 text-gray-500">Ulasan jujur dari pelanggan setia yang telah membuktikan kualitas kami.</p>
//           </div>

//           <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//             {testimonials.map((testi) => (
//               <div key={testi.id} className="p-8 bg-white border border-gray-100 shadow-sm rounded-3xl">
//                 <div className="flex gap-1 mb-4 text-amber-400">
//                   {[...Array(testi.rating)].map((_, i) => (
//                     <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
//                   ))}
//                 </div>
//                 <p className="mb-6 italic text-gray-600">"{testi.text}"</p>
//                 <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
//                   <div className="flex items-center justify-center w-10 h-10 font-bold rounded-full bg-emerald-100 text-emerald-700">
//                     {testi.name.charAt(0)}
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-bold text-gray-900">{testi.name}</h4>
//                     <p className="text-xs text-gray-500">{testi.role}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           6. CTA (CALL TO ACTION) / NEWSLETTER
//       ========================================= */}
//       <div className="relative py-24 overflow-hidden bg-gray-900">
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gycora rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        
//         <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
//             Siap mengubah rutinitas Anda?
//           </h2>
//           <p className="mt-4 mb-10 text-lg text-gray-400">
//             Bergabunglah dengan ribuan pelanggan yang telah merasakan keajaiban perawatan premium Gycora.
//           </p>
//           {!userData ? (
//              <button onClick={() => navigate("/register")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Mulai Perjalanan Anda Sekarang
//              </button>
//           ) : (
//             <button onClick={() => navigate("/products")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Belanja Koleksi Kami
//             </button>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api"; 
// import Swal from "sweetalert2"; 

// // --- IMPORT GAMBAR DARI LOKAL UNTUK SLIDER & ASET ---
// import slide1 from "/landing_page_images/hero_slide_1.jpg";
// import slide2 from "/landing_page_images/hero_slide_2.jpg";
// import slide3 from "/landing_page_images/hero_slide_3.jpg";
// import slide4 from "/landing_page_images/hero_slide_4.jpg";
// import slide5 from "/landing_page_images/hero_slide_5.jpg"; 

// // Import aset baru untuk seksi janji temu
// import gycoraPromise from "/landing_page_images/gycora_promise.webp";

// const heroSlides = [
//   { id: 1, image: slide1, alt: "Gycora Premium Hair Care 1" },
//   { id: 2, image: slide2, alt: "Gycora Premium Hair Care 2" },
//   { id: 3, image: slide3, alt: "Gycora Premium Hair Care 3" },
//   { id: 4, image: slide4, alt: "Gycora Premium Hair Care 4" },
//   { id: 5, image: slide5, alt: "Gycora Premium Hair Care 5" },
// ];

// const testimonials = [
//   { id: 1, name: "Amanda S.", role: "Verified Buyer", text: "Ethereal Glow Brush benar-benar mengubah hidup saya. Rambut yang biasanya rontok saat disisir sekarang sangat mudah diatur dan jauh lebih berkilau!", rating: 5 },
//   { id: 2, name: "Rina Kartika", role: "Gycora Member", text: "Wangi dari Revitalizing Shampoo sangat elegan dan tahan lama. Kulit kepala terasa lebih bersih tanpa membuat ujung rambut menjadi kering.", rating: 5 },
//   { id: 3, name: "Jessica W.", role: "Verified Buyer", text: "Awalnya ragu, tapi setelah mencoba Argan Hair Serum selama 2 minggu, ujung rambut bercabang saya benar-benar membaik. Sangat direkomendasikan!", rating: 4 }
// ];

// // --- DATA UNTUK SHOP BY CONCERN ---
// const hairConcerns = [
//   { id: 1, title: "Rambut Rontok", desc: "Perkuat akar rambut", img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=400" },
//   { id: 2, title: "Kering & Bercabang", desc: "Kembalikan kelembapan", img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=400" },
//   { id: 3, title: "Ketombe & Gatal", desc: "Kulit kepala sehat", img: "https://images.unsplash.com/photo-1580612140415-3850ea950c45?q=80&w=400" },
//   { id: 4, title: "Kusut & Kusam", desc: "Halus dan berkilau", img: "https://images.unsplash.com/photo-1596614138096-733306dbd69c?q=80&w=400" },
// ];

// export default function Home() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
  
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
//   const [isLoadingProducts, setIsLoadingProducts] = useState(true);

//   // --- STATE UNTUK POP-UP PROMO ---
//   const [isPromoMounted, setIsPromoMounted] = useState(false); 
//   const [showPromoModal, setShowPromoModal] = useState(false); 
//   const [promoEmail, setPromoEmail] = useState("");
//   const [isSubscribing, setIsSubscribing] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user_data");
//     if (storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }

//     // Mount modal secara instan, lalu trigger animasi 50ms kemudian agar CSS transisi bekerja
//     setIsPromoMounted(true);
//     const animTimer = setTimeout(() => {
//       setShowPromoModal(true);
//     }, 50);

//     const fetchFeaturedProducts = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (res.ok) {
//           const data = await res.json();
//           const productsArray = data.data ? data.data : data;
//           setFeaturedProducts(productsArray.slice(0, 3) || []);
//         }
//       } catch (error) {
//         console.error("Gagal memuat produk unggulan:", error);
//       } finally {
//         setIsLoadingProducts(false);
//       }
//     };

//     fetchFeaturedProducts();

//     return () => {
//       clearTimeout(animTimer);
//     };
//   }, []);

//   useEffect(() => {
//     if (userData) return; 
//     const slideInterval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
//     }, 4000); 
//     return () => clearInterval(slideInterval);
//   }, [userData]);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
//   };

//   const closePromoModal = () => {
//     setShowPromoModal(false); 
//     setTimeout(() => {
//       setIsPromoMounted(false);
//     }, 300);
//   };

//   // --- MENGHUBUNGKAN KE ENDPOINT /PROMO/CLAIM ---
//   const handleSubscribePromo = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!promoEmail) return;
    
//     setIsSubscribing(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/promo/claim`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Accept": "application/json" },
//         body: JSON.stringify({ email: promoEmail }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         closePromoModal();
//         Swal.fire({
//           icon: "success",
//           title: "Kode Promo Terkirim!",
//           text: "Silakan periksa kotak masuk email Anda untuk mendapatkan kode voucher spesial dari Gycora.",
//           confirmButtonColor: "#059669",
//         });
//       } else {
//         Swal.fire({ 
//           icon: "warning", 
//           title: "Pemberitahuan", 
//           text: data.message || "Gagal mengklaim promo. Pastikan format email benar.", 
//           confirmButtonColor: "#d33" 
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire({ 
//         icon: "error", 
//         title: "Gagal", 
//         text: "Terjadi kesalahan server saat memproses permintaan Anda.", 
//         confirmButtonColor: "#d33" 
//       });
//     } finally {
//       setIsSubscribing(false);
//     }
//   };

//   return (
//     <div className="relative font-sans bg-white">
      
//       {/* =========================================
//           POP-UP PROMO MODAL (DENGAN ANIMASI INSTAN)
//       ========================================= */}
//       {isPromoMounted && (
//         <div 
//           className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ease-out
//             ${showPromoModal ? 'bg-black/60 backdrop-blur-sm opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0'}
//           `}
//         >
//           <div 
//             className={`relative flex flex-col w-full max-w-3xl overflow-hidden bg-white shadow-2xl md:flex-row rounded-2xl transition-all duration-500 ease-out transform
//               ${showPromoModal ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}
//             `}
//           >
//             <button 
//               onClick={closePromoModal}
//               className="absolute z-10 flex items-center justify-center w-8 h-8 text-gray-500 transition-colors bg-white rounded-full shadow-md top-4 right-4 hover:bg-gray-100 hover:text-gray-900"
//             >
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//             </button>

//             <div className="flex flex-col justify-center flex-1 p-8 md:p-12">
//               <h2 className="mb-2 font-serif text-4xl font-black tracking-tight text-gray-900 uppercase">Gycora</h2>
//               <h3 className="mb-4 text-3xl font-extrabold leading-tight text-gycora-dark">
//                 Klaim Voucher Belanja
//               </h3>
//               <p className="mb-8 text-sm font-medium text-gray-500">
//                 Masukkan email Anda untuk mendapatkan kode voucher eksklusif yang bisa langsung digunakan pada pesanan pertama!
//               </p>
              
//               <form onSubmit={handleSubscribePromo} className="space-y-4">
//                 <input 
//                   type="email" 
//                   value={promoEmail}
//                   onChange={(e) => setPromoEmail(e.target.value)}
//                   placeholder="Alamat Email Anda" 
//                   className="w-full px-4 py-3 text-sm transition-all border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gycora"
//                   required
//                 />
//                 <button 
//                   type="submit" 
//                   disabled={isSubscribing}
//                   className="w-full px-4 py-3 text-sm font-bold tracking-widest text-white uppercase transition-all bg-gray-900 rounded-lg hover:bg-black disabled:bg-gray-400"
//                 >
//                   {isSubscribing ? "Mengirim Kode..." : "Dapatkan Kode Promo"}
//                 </button>
//               </form>
              
//               <p className="mt-4 text-[9px] text-gray-400 leading-relaxed">
//                 *Penawaran hanya berlaku untuk pelanggan baru. Kode akan dikirimkan ke email Anda.
//               </p>
//             </div>

//             <div className="hidden w-full md:block md:w-5/12 bg-emerald-50">
//               <img 
//                 src="/landing_page_images/promo_popup.jpg" 
//                 alt="Promo Gycora" 
//                 className="object-cover w-full h-full"
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* =========================================
//           1. HERO SECTION
//       ========================================= */}
//       <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
//         <div className="absolute top-0 -translate-x-1/2 left-1/2 -z-10">
//           <div className="w-[800px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
//         </div>

//         <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32">
//           {userData ? (
//             <div className="max-w-4xl mx-auto space-y-8 text-center animate-fade-in-up">
//               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                 <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
//                 Gycora Exclusive Member
//               </div>
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
//                 Selamat datang kembali, <span className="text-gycora">{userData.first_name}</span>.
//               </h1>
//               <p className="max-w-2xl mx-auto text-lg text-gray-500 sm:text-xl">
//                 Katalog rambut premium terbaru kami sudah menanti Anda. Nikmati penawaran eksklusif, lacak pesanan, dan dapatkan kemudahan berbelanja khusus untuk member Gycora.
//               </p>
//               <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
//                 <button onClick={() => navigate("/products")} className="px-8 py-3.5 text-base font-bold text-white transition-all bg-gray-900 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5">
//                   Lanjutkan Belanja
//                 </button>
//                 <button onClick={() => navigate("/profile")} className="px-8 py-3.5 text-base font-bold text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                   Profil & Pesanan Saya
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
//               <div className="space-y-8 animate-fade-in-up">
//                 <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                   ✨ Solusi Perawatan Rambut Premium
//                 </div>
//                 <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
//                   Tingkatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-gycora to-emerald-400">Pesona</span><br /> Mahkota Anda.
//                 </h1>
//                 <p className="text-lg leading-relaxed text-gray-500 sm:text-xl">
//                   Temukan koleksi eksklusif Gycora. Diformulasikan dengan teknologi mutakhir dan bahan premium untuk rambut yang lebih sehat, bersinar, dan bebas kusut dari akar hingga ujung.
//                 </p>
//                 <div className="flex flex-col gap-4 pt-4 sm:flex-row">
//                   <Link to="/products" className="px-8 py-4 text-lg font-bold text-center text-white transition-all rounded-full bg-gycora hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5">
//                     Eksplorasi Katalog
//                   </Link>
//                   <Link to="/register" className="px-8 py-4 text-lg font-bold text-center text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                     Daftar Member
//                   </Link>
//                 </div>
//               </div>
              
//               <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//                 <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-pink-50 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
                
//                 <div className="relative w-full overflow-hidden shadow-2xl h-[500px] rounded-[3rem] group">
//                   {heroSlides.map((slide, index) => (
//                     <img 
//                       key={slide.id}
//                       src={slide.image} 
//                       alt={slide.alt} 
//                       className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
//                     />
//                   ))}

//                   <div className="absolute inset-0 flex items-center justify-between px-4 transition-opacity opacity-0 group-hover:opacity-100">
//                     <button onClick={() => setCurrentSlide(prev => prev === 0 ? heroSlides.length - 1 : prev - 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                     </button>
//                     <button onClick={() => setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                     </button>
//                   </div>

//                   <div className="absolute flex justify-center w-full gap-2 bottom-6">
//                     {heroSlides.map((_, index) => (
//                       <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${index === currentSlide ? 'w-8 bg-gycora' : 'w-2.5 bg-white/70 hover:bg-white'}`} aria-label={`Slide ${index + 1}`}></button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =========================================
//           2. SHOP BY CONCERN (SEKSI BARU)
//       ========================================= */}
//       <div className="py-16 bg-white border-b border-gray-100">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-12 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Belanja Sesuai Kebutuhan</h2>
//             <p className="mt-4 text-gray-500">Temukan solusi spesifik yang dirancang khusus untuk setiap masalah rambut Anda.</p>
//           </div>
//           <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
//             {hairConcerns.map((concern) => (
//               <div 
//                 key={concern.id} 
//                 onClick={() => navigate('/products')} 
//                 className="flex flex-col items-center text-center transition-all cursor-pointer group"
//               >
//                 <div className="relative w-32 h-32 mb-4 overflow-hidden transition-all duration-500 rounded-full shadow-md sm:w-44 sm:h-44 ring-4 ring-white group-hover:shadow-2xl group-hover:ring-emerald-50">
//                   <img 
//                     src={concern.img} 
//                     alt={concern.title} 
//                     className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" 
//                   />
//                   <div className="absolute inset-0 transition-opacity opacity-0 bg-gray-900/10 group-hover:opacity-100"></div>
//                 </div>
//                 <h3 className="text-sm font-bold text-gray-900 transition-colors sm:text-base group-hover:text-gycora">
//                   {concern.title}
//                 </h3>
//                 <p className="hidden mt-1 text-xs text-gray-500 sm:block">{concern.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           3. CLINIC TEASER SECTION
//       ========================================= */}
//       <div className="py-24 bg-gray-900">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col-reverse items-center gap-12 lg:flex-row">
//             <div className="flex-1 space-y-8">
//               <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
//                 Ragu Memilih Produk?<br/>
//                 <span className="text-emerald-400">Tanya Pakar Kami.</span>
//               </h2>
//               <p className="text-lg leading-relaxed text-gray-400">
//                 Gycora tidak hanya menyediakan produk unggulan, tetapi juga layanan telemedisin terintegrasi. Konsultasikan kondisi rambut, kebotakan, atau masalah kulit Anda secara <strong className="text-white">GRATIS</strong> bersama dokter spesialis kami, dan dapatkan resep yang dirancang khusus untuk Anda.
//               </p>
//               <div className="pt-4">
//                 <button 
//                   onClick={() => navigate('/consult')}
//                   className="inline-flex items-center gap-2 px-8 py-4 font-bold text-gray-900 transition-all bg-white rounded-full hover:bg-emerald-50 hover:scale-105"
//                 >
//                   Mulai Konsultasi Gratis
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
//                 </button>
//               </div>
//             </div>
//             <div className="flex-1 w-full lg:w-auto">
//               <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-none lg:mx-0">
//                 <div className="absolute inset-0 transform scale-105 bg-emerald-500 rounded-3xl blur-2xl opacity-20"></div>
//                 <img 
//                   src={gycoraPromise} 
//                   alt="Gycora Promise Hair Care Routine" 
//                   className="relative object-cover w-full h-full shadow-2xl rounded-3xl"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           4. VALUE PROPOSITION (MENGAPA GYCORA?)
//       ========================================= */}
//       <div className="py-24 border-b border-gray-100 bg-gray-50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Teknologi Mutakhir</h3>
//               <p className="leading-relaxed text-gray-500">Molekul karbon konduktif pada alat kami menetralkan listrik statis, mencegah rambut kusut dan rusak seketika.</p>
//             </div>
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Bahan Baku Premium</h3>
//               <p className="leading-relaxed text-gray-500">Setiap tetes diformulasikan dengan bahan baku berkualitas tinggi yang aman dan teruji klinis untuk kesehatan.</p>
//             </div>
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Cruelty-Free</h3>
//               <p className="leading-relaxed text-gray-500">Kecantikan sejati tidak menyakiti. Seluruh lini produk Gycora 100% bebas dari uji coba pada hewan.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           5. FEATURED PRODUCTS
//       ========================================= */}
//       <div className="py-24 bg-white">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-between mb-12 sm:flex-row">
//             <div>
//               <h2 className="text-3xl font-extrabold text-gray-900">Produk Terlaris Kami</h2>
//               <p className="mt-2 text-gray-500">Pilihan favorit pelanggan Gycora bulan ini.</p>
//             </div>
//             <Link to="/products" className="hidden font-bold transition-colors sm:block text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>

//           {isLoadingProducts ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="bg-white border border-gray-100 shadow-sm rounded-2xl animate-pulse">
//                   <div className="w-full bg-gray-200 aspect-square rounded-t-2xl"></div>
//                   <div className="p-6 space-y-3">
//                     <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
//                     <div className="w-full h-4 bg-gray-200 rounded"></div>
//                     <div className="w-1/2 h-6 mt-4 bg-gray-200 rounded"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : featuredProducts.length > 0 ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {featuredProducts.map((product) => (
//                 <div 
//                   key={product.id} 
//                   className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md cursor-pointer group rounded-2xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1" 
//                   onClick={() => navigate(`/product/${product.id}`)}
//                 >
//                   <div className="relative overflow-hidden bg-gray-100 aspect-square">
//                     <img 
//                       src={product.image_url} 
//                       alt={product.name} 
//                       className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
//                     />
//                     <div className="absolute px-3 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-full shadow-sm top-4 left-4 bg-white/90 backdrop-blur-sm">
//                       {product.category?.name || "Gycora"}
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
//                     <p className="mb-4 text-sm text-gray-500 line-clamp-2">
//                       {product.description || "Temukan kilau alami rambut Anda dengan perawatan eksklusif dari Gycora."}
//                     </p>
//                     <div className="flex items-center justify-between">
//                       <span className="text-xl font-extrabold text-gycora">{formatRupiah(product.price)}</span>
//                       <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="py-12 italic text-center text-gray-500">Belum ada produk yang tersedia.</div>
//           )}
          
//           <div className="mt-8 text-center sm:hidden">
//             <Link to="/products" className="font-bold transition-colors text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>
//         </div>
//       </div> 

//       {/* =========================================
//           6. TESTIMONIALS / SOCIAL PROOF
//       ========================================= */}
//       <div className="py-24 border-t border-gray-100 bg-emerald-50/50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-16 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Kata Mereka Tentang Gycora</h2>
//             <p className="mt-4 text-gray-500">Ulasan jujur dari pelanggan setia yang telah membuktikan kualitas kami.</p>
//           </div>

//           <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//             {testimonials.map((testi) => (
//               <div key={testi.id} className="p-8 bg-white border border-gray-100 shadow-sm rounded-3xl">
//                 <div className="flex gap-1 mb-4 text-amber-400">
//                   {[...Array(testi.rating)].map((_, i) => (
//                     <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
//                   ))}
//                 </div>
//                 <p className="mb-6 italic text-gray-600">"{testi.text}"</p>
//                 <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
//                   <div className="flex items-center justify-center w-10 h-10 font-bold rounded-full bg-emerald-100 text-emerald-700">
//                     {testi.name.charAt(0)}
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-bold text-gray-900">{testi.name}</h4>
//                     <p className="text-xs text-gray-500">{testi.role}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           7. REAL RESULTS (BEFORE - AFTER) (SEKSI BARU)
//       ========================================= */}
//       <div className="py-24 bg-white border-t border-gray-100">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-16 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Hasil Nyata. Tanpa Filter.</h2>
//             <p className="mt-4 text-gray-500">Lihat sendiri transformasi rambut pelanggan setelah 14 hari pemakaian rutin.</p>
//           </div>

//           <div className="flex flex-col max-w-5xl mx-auto overflow-hidden bg-gray-900 shadow-2xl rounded-3xl md:flex-row">
//             {/* Sisi Kiri (Before) */}
//             <div className="relative w-full md:w-1/2 h-80 md:h-[450px] group">
//               <div className="absolute top-6 left-6 z-10 px-4 py-1.5 text-xs font-bold tracking-widest text-white uppercase bg-black/50 backdrop-blur-md rounded-full">
//                 Before
//               </div>
//               <img 
//                 src="https://images.unsplash.com/photo-1580612140415-3850ea950c45?q=80&w=800" 
//                 alt="Before Hair Treatment" 
//                 className="object-cover w-full h-full transition-transform duration-1000 filter grayscale-[40%] contrast-75 group-hover:scale-105" 
//               />
//               <div className="absolute inset-0 bg-black/20"></div>
//             </div>
            
//             {/* Sisi Kanan (After) */}
//             <div className="relative w-full border-t-4 border-gycora md:border-t-0 md:border-l-4 md:w-1/2 h-80 md:h-[450px] group overflow-hidden">
//               <div className="absolute top-6 right-6 z-10 px-4 py-1.5 text-xs font-bold tracking-widest text-gray-900 uppercase bg-white/90 backdrop-blur-md rounded-full shadow-lg">
//                 After 14 Days
//               </div>
//               <img 
//                 src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800" 
//                 alt="After Hair Treatment" 
//                 className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105" 
//               />
              
//               {/* Teks Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
//               <div className="absolute bottom-0 left-0 p-8 text-left">
//                 <div className="flex items-center gap-2 mb-2">
//                   <svg className="w-5 h-5 text-[#D4FF32]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
//                   <span className="text-sm font-bold text-white">Ethereal Glow Brush & Serum</span>
//                 </div>
//                 <p className="text-sm text-gray-300">Rambut rontok berkurang drastis, jauh lebih bervolume, sehat, dan sangat mudah diatur.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           8. CTA (CALL TO ACTION) / NEWSLETTER
//       ========================================= */}
//       <div className="relative py-24 overflow-hidden bg-gray-900">
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gycora rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        
//         <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
//             Siap mengubah rutinitas Anda?
//           </h2>
//           <p className="mt-4 mb-10 text-lg text-gray-400">
//             Bergabunglah dengan ribuan pelanggan yang telah merasakan keajaiban perawatan premium Gycora.
//           </p>
//           {!userData ? (
//              <button onClick={() => navigate("/register")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Mulai Perjalanan Anda Sekarang
//              </button>
//           ) : (
//             <button onClick={() => navigate("/products")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Belanja Koleksi Kami
//             </button>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api"; 
// import Swal from "sweetalert2"; 

// // --- IMPORT GAMBAR DARI LOKAL UNTUK SLIDER & ASET ---
// import slide1 from "/landing_page_images/hero_slide_1.jpg";
// import slide2 from "/landing_page_images/hero_slide_2.jpg";
// import slide3 from "/landing_page_images/hero_slide_3.jpg";
// import slide4 from "/landing_page_images/hero_slide_4.jpg";
// import slide5 from "/landing_page_images/hero_slide_5.jpg"; 

// // Import aset baru untuk seksi janji temu
// import gycoraPromise from "/landing_page_images/gycora_promise.webp";

// // Import aset baru untuk seksi Shop by Concern & Before-After
// import concernRontok from "/landing_page_images/rambut_rontok_logo.jpg";
// import concernBercabang from "/landing_page_images/rambut_bercabang_logo.webp";
// import concernKetombe from "/landing_page_images/rambut_berketombe.png";
// import concernKusut from "/landing_page_images/rambut_kusut.jpg";
// import beforeAfterImg from "/landing_page_images/before_after.webp";

// const heroSlides = [
//   { id: 1, image: slide1, alt: "Gycora Premium Hair Care 1" },
//   { id: 2, image: slide2, alt: "Gycora Premium Hair Care 2" },
//   { id: 3, image: slide3, alt: "Gycora Premium Hair Care 3" },
//   { id: 4, image: slide4, alt: "Gycora Premium Hair Care 4" },
//   { id: 5, image: slide5, alt: "Gycora Premium Hair Care 5" },
// ];

// const testimonials = [
//   { id: 1, name: "Amanda S.", role: "Verified Buyer", text: "Ethereal Glow Brush benar-benar mengubah hidup saya. Rambut yang biasanya rontok saat disisir sekarang sangat mudah diatur dan jauh lebih berkilau!", rating: 5 },
//   { id: 2, name: "Rina Kartika", role: "Gycora Member", text: "Wangi dari Revitalizing Shampoo sangat elegan dan tahan lama. Kulit kepala terasa lebih bersih tanpa membuat ujung rambut menjadi kering.", rating: 5 },
//   { id: 3, name: "Jessica W.", role: "Verified Buyer", text: "Awalnya ragu, tapi setelah mencoba Argan Hair Serum selama 2 minggu, ujung rambut bercabang saya benar-benar membaik. Sangat direkomendasikan!", rating: 4 }
// ];

// // --- DATA UNTUK SHOP BY CONCERN DENGAN ASET LOKAL ---
// const hairConcerns = [
//   { id: 1, title: "Rambut Rontok", desc: "Perkuat akar rambut", img: concernRontok },
//   { id: 2, title: "Kering & Bercabang", desc: "Kembalikan kelembapan", img: concernBercabang },
//   { id: 3, title: "Ketombe & Gatal", desc: "Kulit kepala sehat", img: concernKetombe },
//   { id: 4, title: "Kusut & Kusam", desc: "Halus dan berkilau", img: concernKusut },
// ];

// export default function Home() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
  
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
//   const [isLoadingProducts, setIsLoadingProducts] = useState(true);

//   // --- STATE UNTUK POP-UP PROMO ---
//   const [isPromoMounted, setIsPromoMounted] = useState(false); 
//   const [showPromoModal, setShowPromoModal] = useState(false); 
//   const [promoEmail, setPromoEmail] = useState("");
//   const [isSubscribing, setIsSubscribing] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user_data");
//     if (storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }

//     // Mount modal secara instan, lalu trigger animasi 50ms kemudian agar CSS transisi bekerja
//     setIsPromoMounted(true);
//     const animTimer = setTimeout(() => {
//       setShowPromoModal(true);
//     }, 50);

//     const fetchFeaturedProducts = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (res.ok) {
//           const data = await res.json();
//           const productsArray = data.data ? data.data : data;
//           setFeaturedProducts(productsArray.slice(0, 3) || []);
//         }
//       } catch (error) {
//         console.error("Gagal memuat produk unggulan:", error);
//       } finally {
//         setIsLoadingProducts(false);
//       }
//     };

//     fetchFeaturedProducts();

//     return () => {
//       clearTimeout(animTimer);
//     };
//   }, []);

//   useEffect(() => {
//     if (userData) return; 
//     const slideInterval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
//     }, 4000); 
//     return () => clearInterval(slideInterval);
//   }, [userData]);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
//   };

//   const closePromoModal = () => {
//     setShowPromoModal(false); 
//     setTimeout(() => {
//       setIsPromoMounted(false);
//     }, 300);
//   };

//   // --- MENGHUBUNGKAN KE ENDPOINT /PROMO/CLAIM ---
//   const handleSubscribePromo = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!promoEmail) return;
    
//     setIsSubscribing(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/promo/claim`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Accept": "application/json" },
//         body: JSON.stringify({ email: promoEmail }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         closePromoModal();
//         Swal.fire({
//           icon: "success",
//           title: "Kode Promo Terkirim!",
//           text: "Silakan periksa kotak masuk email Anda untuk mendapatkan kode voucher spesial dari Gycora.",
//           confirmButtonColor: "#059669",
//         });
//       } else {
//         Swal.fire({ 
//           icon: "warning", 
//           title: "Pemberitahuan", 
//           text: data.message || "Gagal mengklaim promo. Pastikan format email benar.", 
//           confirmButtonColor: "#d33" 
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire({ 
//         icon: "error", 
//         title: "Gagal", 
//         text: "Terjadi kesalahan server saat memproses permintaan Anda.", 
//         confirmButtonColor: "#d33" 
//       });
//     } finally {
//       setIsSubscribing(false);
//     }
//   };

//   return (
//     <div className="relative font-sans bg-white">
      
//       {/* =========================================
//           POP-UP PROMO MODAL (DENGAN ANIMASI INSTAN)
//       ========================================= */}
//       {isPromoMounted && (
//         <div 
//           className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ease-out
//             ${showPromoModal ? 'bg-black/60 backdrop-blur-sm opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0'}
//           `}
//         >
//           <div 
//             className={`relative flex flex-col w-full max-w-3xl overflow-hidden bg-white shadow-2xl md:flex-row rounded-2xl transition-all duration-500 ease-out transform
//               ${showPromoModal ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}
//             `}
//           >
//             <button 
//               onClick={closePromoModal}
//               className="absolute z-10 flex items-center justify-center w-8 h-8 text-gray-500 transition-colors bg-white rounded-full shadow-md top-4 right-4 hover:bg-gray-100 hover:text-gray-900"
//             >
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//             </button>

//             <div className="flex flex-col justify-center flex-1 p-8 md:p-12">
//               <h2 className="mb-2 font-serif text-4xl font-black tracking-tight text-gray-900 uppercase">Gycora</h2>
//               <h3 className="mb-4 text-3xl font-extrabold leading-tight text-gycora-dark">
//                 Klaim Voucher Belanja
//               </h3>
//               <p className="mb-8 text-sm font-medium text-gray-500">
//                 Masukkan email Anda untuk mendapatkan kode voucher eksklusif yang bisa langsung digunakan pada pesanan pertama!
//               </p>
              
//               <form onSubmit={handleSubscribePromo} className="space-y-4">
//                 <input 
//                   type="email" 
//                   value={promoEmail}
//                   onChange={(e) => setPromoEmail(e.target.value)}
//                   placeholder="Alamat Email Anda" 
//                   className="w-full px-4 py-3 text-sm transition-all border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gycora"
//                   required
//                 />
//                 <button 
//                   type="submit" 
//                   disabled={isSubscribing}
//                   className="w-full px-4 py-3 text-sm font-bold tracking-widest text-white uppercase transition-all bg-gray-900 rounded-lg hover:bg-black disabled:bg-gray-400"
//                 >
//                   {isSubscribing ? "Mengirim Kode..." : "Dapatkan Kode Promo"}
//                 </button>
//               </form>
              
//               <p className="mt-4 text-[9px] text-gray-400 leading-relaxed">
//                 *Penawaran hanya berlaku untuk pelanggan baru. Kode akan dikirimkan ke email Anda.
//               </p>
//             </div>

//             <div className="hidden w-full md:block md:w-5/12 bg-emerald-50">
//               <img 
//                 src="/landing_page_images/promo_popup.jpg" 
//                 alt="Promo Gycora" 
//                 className="object-cover w-full h-full"
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* =========================================
//           1. HERO SECTION
//       ========================================= */}
//       <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
//         <div className="absolute top-0 -translate-x-1/2 left-1/2 -z-10">
//           <div className="w-[800px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
//         </div>

//         <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32">
//           {userData ? (
//             <div className="max-w-4xl mx-auto space-y-8 text-center animate-fade-in-up">
//               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                 <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
//                 Gycora Exclusive Member
//               </div>
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
//                 Selamat datang kembali, <span className="text-gycora">{userData.first_name}</span>.
//               </h1>
//               <p className="max-w-2xl mx-auto text-lg text-gray-500 sm:text-xl">
//                 Katalog rambut premium terbaru kami sudah menanti Anda. Nikmati penawaran eksklusif, lacak pesanan, dan dapatkan kemudahan berbelanja khusus untuk member Gycora.
//               </p>
//               <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
//                 <button onClick={() => navigate("/products")} className="px-8 py-3.5 text-base font-bold text-white transition-all bg-gray-900 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5">
//                   Lanjutkan Belanja
//                 </button>
//                 <button onClick={() => navigate("/profile")} className="px-8 py-3.5 text-base font-bold text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                   Profil & Pesanan Saya
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
//               <div className="space-y-8 animate-fade-in-up">
//                 <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                   ✨ Solusi Perawatan Rambut Premium
//                 </div>
//                 <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
//                   Tingkatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-gycora to-emerald-400">Pesona</span><br /> Mahkota Anda.
//                 </h1>
//                 <p className="text-lg leading-relaxed text-gray-500 sm:text-xl">
//                   Temukan koleksi eksklusif Gycora. Diformulasikan dengan teknologi mutakhir dan bahan premium untuk rambut yang lebih sehat, bersinar, dan bebas kusut dari akar hingga ujung.
//                 </p>
//                 <div className="flex flex-col gap-4 pt-4 sm:flex-row">
//                   <Link to="/products" className="px-8 py-4 text-lg font-bold text-center text-white transition-all rounded-full bg-gycora hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5">
//                     Eksplorasi Katalog
//                   </Link>
//                   <Link to="/register" className="px-8 py-4 text-lg font-bold text-center text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                     Daftar Member
//                   </Link>
//                 </div>
//               </div>
              
//               <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//                 <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-pink-50 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
                
//                 <div className="relative w-full overflow-hidden shadow-2xl h-[500px] rounded-[3rem] group">
//                   {heroSlides.map((slide, index) => (
//                     <img 
//                       key={slide.id}
//                       src={slide.image} 
//                       alt={slide.alt} 
//                       className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
//                     />
//                   ))}

//                   <div className="absolute inset-0 flex items-center justify-between px-4 transition-opacity opacity-0 group-hover:opacity-100">
//                     <button onClick={() => setCurrentSlide(prev => prev === 0 ? heroSlides.length - 1 : prev - 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                     </button>
//                     <button onClick={() => setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                     </button>
//                   </div>

//                   <div className="absolute flex justify-center w-full gap-2 bottom-6">
//                     {heroSlides.map((_, index) => (
//                       <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${index === currentSlide ? 'w-8 bg-gycora' : 'w-2.5 bg-white/70 hover:bg-white'}`} aria-label={`Slide ${index + 1}`}></button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =========================================
//           2. SHOP BY CONCERN (DENGAN ASET LOKAL)
//       ========================================= */}
//       <div className="py-16 bg-white border-b border-gray-100">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-12 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Belanja Sesuai Kebutuhan</h2>
//             <p className="mt-4 text-gray-500">Temukan solusi spesifik yang dirancang khusus untuk setiap masalah rambut Anda.</p>
//           </div>
//           <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
//             {hairConcerns.map((concern) => (
//               <div 
//                 key={concern.id} 
//                 onClick={() => navigate('/products')} 
//                 className="flex flex-col items-center text-center transition-all cursor-pointer group"
//               >
//                 <div className="relative w-32 h-32 mb-4 overflow-hidden transition-all duration-500 rounded-full shadow-md sm:w-44 sm:h-44 ring-4 ring-white group-hover:shadow-2xl group-hover:ring-emerald-50">
//                   <img 
//                     src={concern.img} 
//                     alt={concern.title} 
//                     className="object-cover w-full h-full transition-transform duration-700 bg-gray-50 group-hover:scale-110" 
//                   />
//                   <div className="absolute inset-0 transition-opacity opacity-0 bg-gray-900/10 group-hover:opacity-100"></div>
//                 </div>
//                 <h3 className="text-sm font-bold text-gray-900 transition-colors sm:text-base group-hover:text-gycora">
//                   {concern.title}
//                 </h3>
//                 <p className="hidden mt-1 text-xs text-gray-500 sm:block">{concern.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           3. CLINIC TEASER SECTION
//       ========================================= */}
//       <div className="py-24 bg-gray-900">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col-reverse items-center gap-12 lg:flex-row">
//             <div className="flex-1 space-y-8">
//               <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
//                 Ragu Memilih Produk?<br/>
//                 <span className="text-emerald-400">Tanya Pakar Kami.</span>
//               </h2>
//               <p className="text-lg leading-relaxed text-gray-400">
//                 Gycora tidak hanya menyediakan produk unggulan, tetapi juga layanan telemedisin terintegrasi. Konsultasikan kondisi rambut, kebotakan, atau masalah kulit Anda secara <strong className="text-white">GRATIS</strong> bersama dokter spesialis kami, dan dapatkan resep yang dirancang khusus untuk Anda.
//               </p>
//               <div className="pt-4">
//                 <button 
//                   onClick={() => navigate('/consult')}
//                   className="inline-flex items-center gap-2 px-8 py-4 font-bold text-gray-900 transition-all bg-white rounded-full hover:bg-emerald-50 hover:scale-105"
//                 >
//                   Mulai Konsultasi Gratis
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
//                 </button>
//               </div>
//             </div>
//             <div className="flex-1 w-full lg:w-auto">
//               <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-none lg:mx-0">
//                 <div className="absolute inset-0 transform scale-105 bg-emerald-500 rounded-3xl blur-2xl opacity-20"></div>
//                 <img 
//                   src={gycoraPromise} 
//                   alt="Gycora Promise Hair Care Routine" 
//                   className="relative object-cover w-full h-full shadow-2xl rounded-3xl"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           4. VALUE PROPOSITION (MENGAPA GYCORA?)
//       ========================================= */}
//       <div className="py-24 border-b border-gray-100 bg-gray-50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Teknologi Mutakhir</h3>
//               <p className="leading-relaxed text-gray-500">Molekul karbon konduktif pada alat kami menetralkan listrik statis, mencegah rambut kusut dan rusak seketika.</p>
//             </div>
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Bahan Baku Premium</h3>
//               <p className="leading-relaxed text-gray-500">Setiap tetes diformulasikan dengan bahan baku berkualitas tinggi yang aman dan teruji klinis untuk kesehatan.</p>
//             </div>
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Cruelty-Free</h3>
//               <p className="leading-relaxed text-gray-500">Kecantikan sejati tidak menyakiti. Seluruh lini produk Gycora 100% bebas dari uji coba pada hewan.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           5. FEATURED PRODUCTS
//       ========================================= */}
//       <div className="py-24 bg-white">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-between mb-12 sm:flex-row">
//             <div>
//               <h2 className="text-3xl font-extrabold text-gray-900">Produk Terlaris Kami</h2>
//               <p className="mt-2 text-gray-500">Pilihan favorit pelanggan Gycora bulan ini.</p>
//             </div>
//             <Link to="/products" className="hidden font-bold transition-colors sm:block text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>

//           {isLoadingProducts ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="bg-white border border-gray-100 shadow-sm rounded-2xl animate-pulse">
//                   <div className="w-full bg-gray-200 aspect-square rounded-t-2xl"></div>
//                   <div className="p-6 space-y-3">
//                     <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
//                     <div className="w-full h-4 bg-gray-200 rounded"></div>
//                     <div className="w-1/2 h-6 mt-4 bg-gray-200 rounded"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : featuredProducts.length > 0 ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {featuredProducts.map((product) => (
//                 <div 
//                   key={product.id} 
//                   className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md cursor-pointer group rounded-2xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1" 
//                   onClick={() => navigate(`/product/${product.id}`)}
//                 >
//                   <div className="relative overflow-hidden bg-gray-100 aspect-square">
//                     <img 
//                       src={product.image_url} 
//                       alt={product.name} 
//                       className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
//                     />
//                     <div className="absolute px-3 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-full shadow-sm top-4 left-4 bg-white/90 backdrop-blur-sm">
//                       {product.category?.name || "Gycora"}
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
//                     <p className="mb-4 text-sm text-gray-500 line-clamp-2">
//                       {product.description || "Temukan kilau alami rambut Anda dengan perawatan eksklusif dari Gycora."}
//                     </p>
//                     <div className="flex items-center justify-between">
//                       <span className="text-xl font-extrabold text-gycora">{formatRupiah(product.price)}</span>
//                       <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="py-12 italic text-center text-gray-500">Belum ada produk yang tersedia.</div>
//           )}
          
//           <div className="mt-8 text-center sm:hidden">
//             <Link to="/products" className="font-bold transition-colors text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>
//         </div>
//       </div> 

//       {/* =========================================
//           6. TESTIMONIALS / SOCIAL PROOF
//       ========================================= */}
//       <div className="py-24 border-t border-gray-100 bg-emerald-50/50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-16 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Kata Mereka Tentang Gycora</h2>
//             <p className="mt-4 text-gray-500">Ulasan jujur dari pelanggan setia yang telah membuktikan kualitas kami.</p>
//           </div>

//           <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//             {testimonials.map((testi) => (
//               <div key={testi.id} className="p-8 bg-white border border-gray-100 shadow-sm rounded-3xl">
//                 <div className="flex gap-1 mb-4 text-amber-400">
//                   {[...Array(testi.rating)].map((_, i) => (
//                     <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
//                   ))}
//                 </div>
//                 <p className="mb-6 italic text-gray-600">"{testi.text}"</p>
//                 <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
//                   <div className="flex items-center justify-center w-10 h-10 font-bold rounded-full bg-emerald-100 text-emerald-700">
//                     {testi.name.charAt(0)}
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-bold text-gray-900">{testi.name}</h4>
//                     <p className="text-xs text-gray-500">{testi.role}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           7. REAL RESULTS (BEFORE - AFTER) LOKAL ASET
//       ========================================= */}
//       <div className="py-24 bg-white border-t border-gray-100">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-16 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Hasil Nyata. Tanpa Filter.</h2>
//             <p className="mt-4 text-gray-500">Lihat sendiri transformasi rambut pelanggan setelah 14 hari pemakaian rutin.</p>
//           </div>

//           <div className="relative flex flex-col max-w-4xl mx-auto overflow-hidden bg-gray-900 shadow-2xl group rounded-3xl">
//             <img 
//               src={beforeAfterImg} 
//               alt="Before After Hair Treatment" 
//               className="object-cover w-full h-auto transition-transform duration-1000 group-hover:scale-105" 
//             />
//             {/* Teks Overlay */}
//             <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
//             <div className="absolute bottom-0 left-0 p-6 text-left pointer-events-none md:p-8">
//               <div className="flex items-center gap-2 mb-2">
//                 <svg className="w-5 h-5 text-[#D4FF32]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
//                 <span className="text-sm font-bold text-white">Ethereal Glow Brush & Serum</span>
//               </div>
//               <p className="text-sm text-gray-300">Rambut rontok berkurang drastis, jauh lebih bervolume, sehat, dan sangat mudah diatur.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           8. CTA (CALL TO ACTION) / NEWSLETTER
//       ========================================= */}
//       <div className="relative py-24 overflow-hidden bg-gray-900">
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gycora rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        
//         <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
//             Siap mengubah rutinitas Anda?
//           </h2>
//           <p className="mt-4 mb-10 text-lg text-gray-400">
//             Bergabunglah dengan ribuan pelanggan yang telah merasakan keajaiban perawatan premium Gycora.
//           </p>
//           {!userData ? (
//              <button onClick={() => navigate("/register")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Mulai Perjalanan Anda Sekarang
//              </button>
//           ) : (
//             <button onClick={() => navigate("/products")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Belanja Koleksi Kami
//             </button>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api"; 
// import Swal from "sweetalert2"; 

// // --- IMPORT GAMBAR DARI LOKAL UNTUK SLIDER & ASET ---
// import slide1 from "/landing_page_images/hero_slide_1.jpg";
// import slide2 from "/landing_page_images/hero_slide_2.jpg";
// import slide3 from "/landing_page_images/hero_slide_3.jpg";
// import slide4 from "/landing_page_images/hero_slide_4.jpg";
// import slide5 from "/landing_page_images/hero_slide_5.jpg"; 

// // Import aset baru untuk seksi janji temu
// import gycoraPromise from "/landing_page_images/gycora_promise.webp";

// // Import aset baru untuk seksi Shop by Concern & Before-After
// import concernRontok from "/landing_page_images/rambut_rontok_logo.jpg";
// import concernBercabang from "/landing_page_images/rambut_bercabang_logo.webp";
// import concernKetombe from "/landing_page_images/rambut_berketombe.png";
// import concernKusut from "/landing_page_images/rambut_kusut.jpg";
// import beforeAfterImg from "/landing_page_images/before_after.webp";

// const heroSlides = [
//   { id: 1, image: slide1, alt: "Gycora Premium Hair Care 1" },
//   { id: 2, image: slide2, alt: "Gycora Premium Hair Care 2" },
//   { id: 3, image: slide3, alt: "Gycora Premium Hair Care 3" },
//   { id: 4, image: slide4, alt: "Gycora Premium Hair Care 4" },
//   { id: 5, image: slide5, alt: "Gycora Premium Hair Care 5" },
// ];

// // Fallback testimonials jika database kosong atau error
// const fallbackTestimonials = [
//   { id: 'f1', name: "Amanda S.", role: "Verified Buyer", text: "Ethereal Glow Brush benar-benar mengubah hidup saya. Rambut yang biasanya rontok saat disisir sekarang sangat mudah diatur dan jauh lebih berkilau!", rating: 5 },
//   { id: 'f2', name: "Rina Kartika", role: "Gycora Member", text: "Wangi dari Revitalizing Shampoo sangat elegan dan tahan lama. Kulit kepala terasa lebih bersih tanpa membuat ujung rambut menjadi kering.", rating: 5 },
//   { id: 'f3', name: "Jessica W.", role: "Verified Buyer", text: "Awalnya ragu, tapi setelah mencoba Argan Hair Serum selama 2 minggu, ujung rambut bercabang saya benar-benar membaik. Sangat direkomendasikan!", rating: 5 }
// ];

// // --- DATA UNTUK SHOP BY CONCERN DENGAN ASET LOKAL ---
// const hairConcerns = [
//   { id: 1, title: "Rambut Rontok", desc: "Perkuat akar rambut", img: concernRontok },
//   { id: 2, title: "Kering & Bercabang", desc: "Kembalikan kelembapan", img: concernBercabang },
//   { id: 3, title: "Ketombe & Gatal", desc: "Kulit kepala sehat", img: concernKetombe },
//   { id: 4, title: "Kusut & Kusam", desc: "Halus dan berkilau", img: concernKusut },
// ];

// export default function Home() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
  
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
//   const [isLoadingProducts, setIsLoadingProducts] = useState(true);

//   // --- STATE UNTUK REAL REVIEWS ---
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [realReviews, setRealReviews] = useState<any[]>([]);
//   const [isLoadingReviews, setIsLoadingReviews] = useState(true);

//   // --- STATE UNTUK POP-UP PROMO ---
//   const [isPromoMounted, setIsPromoMounted] = useState(false); 
//   const [showPromoModal, setShowPromoModal] = useState(false); 
//   const [promoEmail, setPromoEmail] = useState("");
//   const [isSubscribing, setIsSubscribing] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user_data");
//     if (storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }

//     // Mount modal secara instan, lalu trigger animasi 50ms kemudian agar CSS transisi bekerja
//     setIsPromoMounted(true);
//     const animTimer = setTimeout(() => {
//       setShowPromoModal(true);
//     }, 50);

//     const fetchFeaturedProducts = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (res.ok) {
//           const data = await res.json();
//           const productsArray = data.data ? data.data : data;
//           setFeaturedProducts(productsArray.slice(0, 3) || []);
//         }
//       } catch (error) {
//         console.error("Gagal memuat produk unggulan:", error);
//       } finally {
//         setIsLoadingProducts(false);
//       }
//     };

//     // FUNGSI BARU: Fetch ulasan asli dari backend
//     const fetchRealReviews = async () => {
//       try {
//         // Catatan: Jika endpoint /admin/reviews membutuhkan token admin, 
//         // Anda mungkin perlu membuat endpoint khusus publik (misal: /api/public-reviews) di Laravel.
//         // Untuk saat ini, kita asumsikan bisa diakses atau kita tangani error-nya.
        
//         const token = localStorage.getItem("user_token") || localStorage.getItem("admin_token");
//         const headers: HeadersInit = { "Accept": "application/json" };
//         if (token) headers["Authorization"] = `Bearer ${token}`;

//         const res = await fetch(`${BASE_URL}/api/admin/reviews`, { headers });
        
//         if (res.ok) {
//           const data = await res.json();
//           // Filter hanya rating 5, dan batasi misal hanya 6 ulasan terbaik/terbaru
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           const fiveStarReviews = data.filter((review: any) => review.rating === 5).slice(0, 6);
//           setRealReviews(fiveStarReviews);
//         }
//       } catch (error) {
//         console.error("Gagal memuat ulasan asli:", error);
//       } finally {
//         setIsLoadingReviews(false);
//       }
//     };

//     fetchFeaturedProducts();
//     fetchRealReviews();

//     return () => {
//       clearTimeout(animTimer);
//     };
//   }, []);

//   useEffect(() => {
//     if (userData) return; 
//     const slideInterval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
//     }, 4000); 
//     return () => clearInterval(slideInterval);
//   }, [userData]);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
//   };

//   const closePromoModal = () => {
//     setShowPromoModal(false); 
//     setTimeout(() => {
//       setIsPromoMounted(false);
//     }, 300);
//   };

//   // --- MENGHUBUNGKAN KE ENDPOINT /PROMO/CLAIM ---
//   const handleSubscribePromo = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!promoEmail) return;
    
//     setIsSubscribing(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/promo/claim`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Accept": "application/json" },
//         body: JSON.stringify({ email: promoEmail }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         closePromoModal();
//         Swal.fire({
//           icon: "success",
//           title: "Kode Promo Terkirim!",
//           text: "Silakan periksa kotak masuk email Anda untuk mendapatkan kode voucher spesial dari Gycora.",
//           confirmButtonColor: "#059669",
//         });
//       } else {
//         Swal.fire({ 
//           icon: "warning", 
//           title: "Pemberitahuan", 
//           text: data.message || "Gagal mengklaim promo. Pastikan format email benar.", 
//           confirmButtonColor: "#d33" 
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire({ 
//         icon: "error", 
//         title: "Gagal", 
//         text: "Terjadi kesalahan server saat memproses permintaan Anda.", 
//         confirmButtonColor: "#d33" 
//       });
//     } finally {
//       setIsSubscribing(false);
//     }
//   };

//   // Tentukan data mana yang akan dirender (Data Asli vs Fallback)
//   const displayReviews = realReviews.length > 0 ? realReviews : fallbackTestimonials;

//   return (
//     <div className="relative font-sans bg-white">
      
//       {/* =========================================
//           POP-UP PROMO MODAL (DENGAN ANIMASI INSTAN)
//       ========================================= */}
//       {isPromoMounted && (
//         <div 
//           className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ease-out
//             ${showPromoModal ? 'bg-black/60 backdrop-blur-sm opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0'}
//           `}
//         >
//           <div 
//             className={`relative flex flex-col w-full max-w-3xl overflow-hidden bg-white shadow-2xl md:flex-row rounded-2xl transition-all duration-500 ease-out transform
//               ${showPromoModal ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}
//             `}
//           >
//             <button 
//               onClick={closePromoModal}
//               className="absolute z-10 flex items-center justify-center w-8 h-8 text-gray-500 transition-colors bg-white rounded-full shadow-md top-4 right-4 hover:bg-gray-100 hover:text-gray-900"
//             >
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//             </button>

//             <div className="flex flex-col justify-center flex-1 p-8 md:p-12">
//               <h2 className="mb-2 font-serif text-4xl font-black tracking-tight text-gray-900 uppercase">Gycora</h2>
//               <h3 className="mb-4 text-3xl font-extrabold leading-tight text-gycora-dark">
//                 Klaim Voucher Belanja
//               </h3>
//               <p className="mb-8 text-sm font-medium text-gray-500">
//                 Masukkan email Anda untuk mendapatkan kode voucher eksklusif yang bisa langsung digunakan pada pesanan pertama!
//               </p>
              
//               <form onSubmit={handleSubscribePromo} className="space-y-4">
//                 <input 
//                   type="email" 
//                   value={promoEmail}
//                   onChange={(e) => setPromoEmail(e.target.value)}
//                   placeholder="Alamat Email Anda" 
//                   className="w-full px-4 py-3 text-sm transition-all border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gycora"
//                   required
//                 />
//                 <button 
//                   type="submit" 
//                   disabled={isSubscribing}
//                   className="w-full px-4 py-3 text-sm font-bold tracking-widest text-white uppercase transition-all bg-gray-900 rounded-lg hover:bg-black disabled:bg-gray-400"
//                 >
//                   {isSubscribing ? "Mengirim Kode..." : "Dapatkan Kode Promo"}
//                 </button>
//               </form>
              
//               <p className="mt-4 text-[9px] text-gray-400 leading-relaxed">
//                 *Penawaran hanya berlaku untuk pelanggan baru. Kode akan dikirimkan ke email Anda.
//               </p>
//             </div>

//             <div className="hidden w-full md:block md:w-5/12 bg-emerald-50">
//               <img 
//                 src="/landing_page_images/promo_popup.jpg" 
//                 alt="Promo Gycora" 
//                 className="object-cover w-full h-full"
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* =========================================
//           1. HERO SECTION
//       ========================================= */}
//       <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
//         <div className="absolute top-0 -translate-x-1/2 left-1/2 -z-10">
//           <div className="w-[800px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
//         </div>

//         <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32">
//           {userData ? (
//             <div className="max-w-4xl mx-auto space-y-8 text-center animate-fade-in-up">
//               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                 <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
//                 Gycora Exclusive Member
//               </div>
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
//                 Selamat datang kembali, <span className="text-gycora">{userData.first_name}</span>.
//               </h1>
//               <p className="max-w-2xl mx-auto text-lg text-gray-500 sm:text-xl">
//                 Katalog rambut premium terbaru kami sudah menanti Anda. Nikmati penawaran eksklusif, lacak pesanan, dan dapatkan kemudahan berbelanja khusus untuk member Gycora.
//               </p>
//               <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
//                 <button onClick={() => navigate("/products")} className="px-8 py-3.5 text-base font-bold text-white transition-all bg-gray-900 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5">
//                   Lanjutkan Belanja
//                 </button>
//                 <button onClick={() => navigate("/profile")} className="px-8 py-3.5 text-base font-bold text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                   Profil & Pesanan Saya
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
//               <div className="space-y-8 animate-fade-in-up">
//                 <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                   ✨ Solusi Perawatan Rambut Premium
//                 </div>
//                 <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
//                   Tingkatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-gycora to-emerald-400">Pesona</span><br /> Mahkota Anda.
//                 </h1>
//                 <p className="text-lg leading-relaxed text-gray-500 sm:text-xl">
//                   Temukan koleksi eksklusif Gycora. Diformulasikan dengan teknologi mutakhir dan bahan premium untuk rambut yang lebih sehat, bersinar, dan bebas kusut dari akar hingga ujung.
//                 </p>
//                 <div className="flex flex-col gap-4 pt-4 sm:flex-row">
//                   <Link to="/products" className="px-8 py-4 text-lg font-bold text-center text-white transition-all rounded-full bg-gycora hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5">
//                     Eksplorasi Katalog
//                   </Link>
//                   <Link to="/register" className="px-8 py-4 text-lg font-bold text-center text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                     Daftar Member
//                   </Link>
//                 </div>
//               </div>
              
//               <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//                 <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-pink-50 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
                
//                 <div className="relative w-full overflow-hidden shadow-2xl h-[500px] rounded-[3rem] group">
//                   {heroSlides.map((slide, index) => (
//                     <img 
//                       key={slide.id}
//                       src={slide.image} 
//                       alt={slide.alt} 
//                       className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
//                     />
//                   ))}

//                   <div className="absolute inset-0 flex items-center justify-between px-4 transition-opacity opacity-0 group-hover:opacity-100">
//                     <button onClick={() => setCurrentSlide(prev => prev === 0 ? heroSlides.length - 1 : prev - 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                     </button>
//                     <button onClick={() => setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                     </button>
//                   </div>

//                   <div className="absolute flex justify-center w-full gap-2 bottom-6">
//                     {heroSlides.map((_, index) => (
//                       <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${index === currentSlide ? 'w-8 bg-gycora' : 'w-2.5 bg-white/70 hover:bg-white'}`} aria-label={`Slide ${index + 1}`}></button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =========================================
//           2. SHOP BY CONCERN (DENGAN ASET LOKAL)
//       ========================================= */}
//       <div className="py-16 bg-white border-b border-gray-100">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-12 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Belanja Sesuai Kebutuhan</h2>
//             <p className="mt-4 text-gray-500">Temukan solusi spesifik yang dirancang khusus untuk setiap masalah rambut Anda.</p>
//           </div>
//           <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
//             {hairConcerns.map((concern) => (
//               <div 
//                 key={concern.id} 
//                 onClick={() => navigate('/products')} 
//                 className="flex flex-col items-center text-center transition-all cursor-pointer group"
//               >
//                 <div className="relative w-32 h-32 mb-4 overflow-hidden transition-all duration-500 rounded-full shadow-md sm:w-44 sm:h-44 ring-4 ring-white group-hover:shadow-2xl group-hover:ring-emerald-50">
//                   <img 
//                     src={concern.img} 
//                     alt={concern.title} 
//                     className="object-cover w-full h-full transition-transform duration-700 bg-gray-50 group-hover:scale-110" 
//                   />
//                   <div className="absolute inset-0 transition-opacity opacity-0 bg-gray-900/10 group-hover:opacity-100"></div>
//                 </div>
//                 <h3 className="text-sm font-bold text-gray-900 transition-colors sm:text-base group-hover:text-gycora">
//                   {concern.title}
//                 </h3>
//                 <p className="hidden mt-1 text-xs text-gray-500 sm:block">{concern.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           3. CLINIC TEASER SECTION
//       ========================================= */}
//       <div className="py-24 bg-gray-900">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col-reverse items-center gap-12 lg:flex-row">
//             <div className="flex-1 space-y-8">
//               <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
//                 Ragu Memilih Produk?<br/>
//                 <span className="text-emerald-400">Tanya Pakar Kami.</span>
//               </h2>
//               <p className="text-lg leading-relaxed text-gray-400">
//                 Gycora tidak hanya menyediakan produk unggulan, tetapi juga layanan telemedisin terintegrasi. Konsultasikan kondisi rambut, kebotakan, atau masalah kulit Anda secara <strong className="text-white">GRATIS</strong> bersama dokter spesialis kami, dan dapatkan resep yang dirancang khusus untuk Anda.
//               </p>
//               <div className="pt-4">
//                 <button 
//                   onClick={() => navigate('/consult')}
//                   className="inline-flex items-center gap-2 px-8 py-4 font-bold text-gray-900 transition-all bg-white rounded-full hover:bg-emerald-50 hover:scale-105"
//                 >
//                   Mulai Konsultasi Gratis
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
//                 </button>
//               </div>
//             </div>
//             <div className="flex-1 w-full lg:w-auto">
//               <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-none lg:mx-0">
//                 <div className="absolute inset-0 transform scale-105 bg-emerald-500 rounded-3xl blur-2xl opacity-20"></div>
//                 <img 
//                   src={gycoraPromise} 
//                   alt="Gycora Promise Hair Care Routine" 
//                   className="relative object-cover w-full h-full shadow-2xl rounded-3xl"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           4. VALUE PROPOSITION (MENGAPA GYCORA?)
//       ========================================= */}
//       <div className="py-24 border-b border-gray-100 bg-gray-50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Teknologi Mutakhir</h3>
//               <p className="leading-relaxed text-gray-500">Molekul karbon konduktif pada alat kami menetralkan listrik statis, mencegah rambut kusut dan rusak seketika.</p>
//             </div>
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Bahan Baku Premium</h3>
//               <p className="leading-relaxed text-gray-500">Setiap tetes diformulasikan dengan bahan baku berkualitas tinggi yang aman dan teruji klinis untuk kesehatan.</p>
//             </div>
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Cruelty-Free</h3>
//               <p className="leading-relaxed text-gray-500">Kecantikan sejati tidak menyakiti. Seluruh lini produk Gycora 100% bebas dari uji coba pada hewan.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           5. FEATURED PRODUCTS
//       ========================================= */}
//       <div className="py-24 bg-white">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-between mb-12 sm:flex-row">
//             <div>
//               <h2 className="text-3xl font-extrabold text-gray-900">Produk Terlaris Kami</h2>
//               <p className="mt-2 text-gray-500">Pilihan favorit pelanggan Gycora bulan ini.</p>
//             </div>
//             <Link to="/products" className="hidden font-bold transition-colors sm:block text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>

//           {isLoadingProducts ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="bg-white border border-gray-100 shadow-sm rounded-2xl animate-pulse">
//                   <div className="w-full bg-gray-200 aspect-square rounded-t-2xl"></div>
//                   <div className="p-6 space-y-3">
//                     <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
//                     <div className="w-full h-4 bg-gray-200 rounded"></div>
//                     <div className="w-1/2 h-6 mt-4 bg-gray-200 rounded"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : featuredProducts.length > 0 ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {featuredProducts.map((product) => (
//                 <div 
//                   key={product.id} 
//                   className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md cursor-pointer group rounded-2xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1" 
//                   onClick={() => navigate(`/product/${product.id}`)}
//                 >
//                   <div className="relative overflow-hidden bg-gray-100 aspect-square">
//                     <img 
//                       src={product.image_url} 
//                       alt={product.name} 
//                       className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
//                     />
//                     <div className="absolute px-3 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-full shadow-sm top-4 left-4 bg-white/90 backdrop-blur-sm">
//                       {product.category?.name || "Gycora"}
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
//                     <p className="mb-4 text-sm text-gray-500 line-clamp-2">
//                       {product.description || "Temukan kilau alami rambut Anda dengan perawatan eksklusif dari Gycora."}
//                     </p>
//                     <div className="flex items-center justify-between">
//                       <span className="text-xl font-extrabold text-gycora">{formatRupiah(product.price)}</span>
//                       <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="py-12 italic text-center text-gray-500">Belum ada produk yang tersedia.</div>
//           )}
          
//           <div className="mt-8 text-center sm:hidden">
//             <Link to="/products" className="font-bold transition-colors text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>
//         </div>
//       </div> 

//       {/* =========================================
//           6. REAL REVIEWS / SOCIAL PROOF (DATA DARI BACKEND)
//       ========================================= */}
//       <div className="py-24 border-t border-gray-100 bg-emerald-50/50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-16 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Kata Mereka Tentang Gycora</h2>
//             <p className="mt-4 text-gray-500">Ulasan jujur bintang 5 dari pelanggan setia yang telah membuktikan kualitas kami.</p>
//           </div>

//           {isLoadingReviews ? (
//             <div className="flex justify-center">
//               <div className="w-10 h-10 border-4 rounded-full border-gycora animate-spin border-t-transparent"></div>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//               {displayReviews.map((review: any) => (
//                 <div key={review.id} className="relative flex flex-col p-8 transition-shadow bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-md">
//                   {/* Bintang */}
//                   <div className="flex gap-1 mb-4 text-amber-400">
//                     {[...Array(5)].map((_, i) => (
//                       <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
//                     ))}
//                   </div>
                  
//                   {/* Teks Ulasan */}
//                   <p className="flex-1 mb-6 italic text-gray-600 line-clamp-4">
//                     "{review.comment || review.text}"
//                   </p>
                  
//                   {/* Info User & Produk */}
//                   <div className="flex items-center gap-4 pt-6 mt-auto border-t border-gray-100">
//                     {review.user?.profile_image ? (
//                       <img src={review.user.profile_image} alt="User" className="object-cover w-10 h-10 rounded-full" />
//                     ) : (
//                       <div className="flex items-center justify-center w-10 h-10 font-bold rounded-full bg-emerald-100 text-emerald-700 shrink-0">
//                         {(review.user?.first_name || review.name || "U").charAt(0)}
//                       </div>
//                     )}
                    
//                     <div className="flex-1 min-w-0">
//                       <h4 className="text-sm font-bold text-gray-900 truncate">
//                         {review.user ? `${review.user.first_name} ${review.user.last_name}` : review.name}
//                       </h4>
//                       {/* Menampilkan nama produk jika dari database asli, jika fallback tampilkan role */}
//                       <p className="text-[10px] text-gycora font-bold uppercase tracking-widest truncate mt-0.5">
//                         {review.product?.name || review.role || "Verified Buyer"}
//                       </p>
//                     </div>
//                   </div>
                  
//                   {/* Jika ada gambar ulasan, tampilkan kecil di pojok kanan atas */}
//                   {review.image_url && (
//                     <div className="absolute w-12 h-12 overflow-hidden border border-gray-200 rounded-lg shadow-sm top-8 right-8">
//                       <img src={review.image_url} alt="Review attachment" className="object-cover w-full h-full" />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =========================================
//           7. REAL RESULTS (BEFORE - AFTER) LOKAL ASET
//       ========================================= */}
//       <div className="py-24 bg-white border-t border-gray-100">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-16 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Hasil Nyata. Tanpa Filter.</h2>
//             <p className="mt-4 text-gray-500">Lihat sendiri transformasi rambut pelanggan setelah 14 hari pemakaian rutin.</p>
//           </div>

//           <div className="relative flex flex-col max-w-4xl mx-auto overflow-hidden bg-gray-900 shadow-2xl group rounded-3xl">
//             <img 
//               src={beforeAfterImg} 
//               alt="Before After Hair Treatment" 
//               className="object-cover w-full h-auto transition-transform duration-1000 group-hover:scale-105" 
//             />
//             {/* Teks Overlay */}
//             <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
//             <div className="absolute bottom-0 left-0 p-6 text-left pointer-events-none md:p-8">
//               <div className="flex items-center gap-2 mb-2">
//                 <svg className="w-5 h-5 text-[#D4FF32]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
//                 <span className="text-sm font-bold text-white">Ethereal Glow Brush & Serum</span>
//               </div>
//               <p className="text-sm text-gray-300">Rambut rontok berkurang drastis, jauh lebih bervolume, sehat, dan sangat mudah diatur.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           8. CTA (CALL TO ACTION) / NEWSLETTER
//       ========================================= */}
//       <div className="relative py-24 overflow-hidden bg-gray-900">
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gycora rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        
//         <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
//             Siap mengubah rutinitas Anda?
//           </h2>
//           <p className="mt-4 mb-10 text-lg text-gray-400">
//             Bergabunglah dengan ribuan pelanggan yang telah merasakan keajaiban perawatan premium Gycora.
//           </p>
//           {!userData ? (
//              <button onClick={() => navigate("/register")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Mulai Perjalanan Anda Sekarang
//              </button>
//           ) : (
//             <button onClick={() => navigate("/products")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Belanja Koleksi Kami
//             </button>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api"; 
// import Swal from "sweetalert2"; 

// // --- IMPORT GAMBAR DARI LOKAL UNTUK SLIDER & ASET ---
// import slide1 from "/landing_page_images/hero_slide_1.jpg";
// import slide2 from "/landing_page_images/hero_slide_2.jpg";
// import slide3 from "/landing_page_images/hero_slide_3.jpg";
// import slide4 from "/landing_page_images/hero_slide_4.jpg";
// import slide5 from "/landing_page_images/hero_slide_5.jpg"; 

// // Import aset baru untuk Before-After
// import beforeAfterImg from "/landing_page_images/before_after.webp";

// const heroSlides = [
//   { id: 1, image: slide1, alt: "Gycora Premium Hair Care 1" },
//   { id: 2, image: slide2, alt: "Gycora Premium Hair Care 2" },
//   { id: 3, image: slide3, alt: "Gycora Premium Hair Care 3" },
//   { id: 4, image: slide4, alt: "Gycora Premium Hair Care 4" },
//   { id: 5, image: slide5, alt: "Gycora Premium Hair Care 5" },
// ];

// // Fallback testimonials (Diupdate sesuai dengan copy dari UI/UX)
// const fallbackTestimonials = [
//   { id: 'f1', name: "Claudiasunshinee", role: "Verified Buyer", text: "Sisir nya bagus banget sih sesuai dgn claim nya 🙌🙌 sblmnya aku pakai brand w** krn rambutku rontok.. trs setelah aku compare sm brand Gycora ternyata jauh lbh ga rontok pakai Gycora ❤👍", rating: 5 },
//   { id: 'f2', name: "Nilasetiobudii", role: "Verified Buyer", text: "Sisirnya enak banget terutama buat rambut yg suka kusut Jd lebih gampang pake sisir dari Gycora..", rating: 5 },
//   { id: 'f3', name: "Thaliastanley___", role: "Verified Buyer", text: "Setelah saya pakai hair brush nya rambutku jadi lebih gak kusut dan bikin lebih pede pastinya..", rating: 5 },
//   { id: 'f4', name: "Herlenasutanto", role: "Verified Buyer", text: "Oke kok enak sisir nya lentur ngikutin kepala. ga nyangkut2 hehe", rating: 5 },
//   { id: 'f5', name: "Anitaa_bee", role: "Verified Buyer", text: "Sukaaa poll sma sisirnya... Rambut jd makin teratur pas disisir dan ga gerundel (kusut frizzy) n rambut ku ya uda ga tllu banyak yg rontok. terus sisirnya tu empuk dan nyaman poll di kepala ga sakit.", rating: 5 }
// ];

// export default function Home() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
  
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
//   const [isLoadingProducts, setIsLoadingProducts] = useState(true);

//   // --- STATE UNTUK REAL REVIEWS ---
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [realReviews, setRealReviews] = useState<any[]>([]);
//   const [isLoadingReviews, setIsLoadingReviews] = useState(true);

//   // --- STATE UNTUK POP-UP PROMO ---
//   const [isPromoMounted, setIsPromoMounted] = useState(false); 
//   const [showPromoModal, setShowPromoModal] = useState(false); 
//   const [promoEmail, setPromoEmail] = useState("");
//   const [isSubscribing, setIsSubscribing] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user_data");
//     if (storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }

//     // Mount modal secara instan, lalu trigger animasi 50ms kemudian agar CSS transisi bekerja
//     setIsPromoMounted(true);
//     const animTimer = setTimeout(() => {
//       setShowPromoModal(true);
//     }, 50);

//     const fetchFeaturedProducts = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (res.ok) {
//           const data = await res.json();
//           const productsArray = data.data ? data.data : data;
//           setFeaturedProducts(productsArray.slice(0, 3) || []);
//         }
//       } catch (error) {
//         console.error("Gagal memuat produk unggulan:", error);
//       } finally {
//         setIsLoadingProducts(false);
//       }
//     };

//     const fetchRealReviews = async () => {
//       try {
//         const token = localStorage.getItem("user_token") || localStorage.getItem("admin_token");
//         const headers: HeadersInit = { "Accept": "application/json" };
//         if (token) headers["Authorization"] = `Bearer ${token}`;

//         const res = await fetch(`${BASE_URL}/api/admin/reviews`, { headers });
        
//         if (res.ok) {
//           const data = await res.json();
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           const fiveStarReviews = data.filter((review: any) => review.rating === 5).slice(0, 6);
//           setRealReviews(fiveStarReviews);
//         }
//       } catch (error) {
//         console.error("Gagal memuat ulasan asli:", error);
//       } finally {
//         setIsLoadingReviews(false);
//       }
//     };

//     fetchFeaturedProducts();
//     fetchRealReviews();

//     return () => {
//       clearTimeout(animTimer);
//     };
//   }, []);

//   useEffect(() => {
//     if (userData) return; 
//     const slideInterval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
//     }, 4000); 
//     return () => clearInterval(slideInterval);
//   }, [userData]);

//   // const formatRupiah = (angka: number) => {
//   //   return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
//   // };

//   const closePromoModal = () => {
//     setShowPromoModal(false); 
//     setTimeout(() => {
//       setIsPromoMounted(false);
//     }, 300);
//   };

//   const handleSubscribePromo = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!promoEmail) return;
    
//     setIsSubscribing(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/promo/claim`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Accept": "application/json" },
//         body: JSON.stringify({ email: promoEmail }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         closePromoModal();
//         Swal.fire({
//           icon: "success",
//           title: "Kode Promo Terkirim!",
//           text: "Silakan periksa kotak masuk email Anda untuk mendapatkan kode voucher spesial dari Gycora.",
//           confirmButtonColor: "#059669",
//         });
//       } else {
//         Swal.fire({ 
//           icon: "warning", 
//           title: "Pemberitahuan", 
//           text: data.message || "Gagal mengklaim promo. Pastikan format email benar.", 
//           confirmButtonColor: "#d33" 
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire({ 
//         icon: "error", 
//         title: "Gagal", 
//         text: "Terjadi kesalahan server saat memproses permintaan Anda.", 
//         confirmButtonColor: "#d33" 
//       });
//     } finally {
//       setIsSubscribing(false);
//     }
//   };

//   const displayReviews = realReviews.length > 0 ? realReviews : fallbackTestimonials;

//   return (
//     <div className="relative font-sans bg-white">
      
//       {/* =========================================
//           POP-UP PROMO MODAL (DISESUAIKAN DENGAN COPY UI/UX)
//       ========================================= */}
//       {isPromoMounted && (
//         <div 
//           className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ease-out
//             ${showPromoModal ? 'bg-black/60 backdrop-blur-sm opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0'}
//           `}
//         >
//           <div 
//             className={`relative flex flex-col w-full max-w-3xl overflow-hidden bg-white shadow-2xl md:flex-row rounded-2xl transition-all duration-500 ease-out transform
//               ${showPromoModal ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}
//             `}
//           >
//             <button 
//               onClick={closePromoModal}
//               className="absolute z-10 flex items-center justify-center w-8 h-8 text-gray-500 transition-colors bg-white rounded-full shadow-md top-4 right-4 hover:bg-gray-100 hover:text-gray-900"
//             >
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//             </button>

//             <div className="flex flex-col justify-center flex-1 p-8 md:p-12">
//               <h2 className="mb-2 font-serif text-4xl font-black tracking-tight text-gray-900 uppercase">Gycora</h2>
//               <h3 className="mb-4 text-3xl font-extrabold leading-tight text-gycora-dark">
//                 Dapetin Diskon Spesial untuk First Order ✨
//               </h3>
//               <p className="mb-8 text-sm font-medium text-gray-500">
//                 Masukkan email kamu & nikmati voucher eksklusif hari ini.
//               </p>
              
//               <form onSubmit={handleSubscribePromo} className="space-y-4">
//                 <input 
//                   type="email" 
//                   value={promoEmail}
//                   onChange={(e) => setPromoEmail(e.target.value)}
//                   placeholder="Masukkan Email" 
//                   className="w-full px-4 py-3 text-sm transition-all border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gycora"
//                   required
//                 />
//                 <button 
//                   type="submit" 
//                   disabled={isSubscribing}
//                   className="w-full px-4 py-3 text-sm font-bold tracking-widest text-white uppercase transition-all bg-gray-900 rounded-lg hover:bg-black disabled:bg-gray-400"
//                 >
//                   {isSubscribing ? "Mengirim..." : "Ambil Voucher"}
//                 </button>
//               </form>
//             </div>

//             <div className="hidden w-full md:block md:w-5/12 bg-emerald-50">
//               <img 
//                 src="/landing_page_images/promo_popup.jpg" 
//                 alt="Promo Gycora" 
//                 className="object-cover w-full h-full"
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* =========================================
//           1. HERO SECTION (COPY BARU: Tanpa Ribet)
//       ========================================= */}
//       <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
//         <div className="absolute top-0 -translate-x-1/2 left-1/2 -z-10">
//           <div className="w-[800px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
//         </div>

//         <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32">
//           {userData ? (
//             <div className="max-w-4xl mx-auto space-y-8 text-center animate-fade-in-up">
//               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                 <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
//                 Gycora Exclusive Member
//               </div>
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
//                 Selamat datang kembali, <span className="text-gycora">{userData.first_name}</span>.
//               </h1>
//               <p className="max-w-2xl mx-auto text-lg text-gray-500 sm:text-xl">
//                 Lanjutkan perjalanan rambut rapi tanpa ribet Anda hari ini.
//               </p>
//               <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
//                 <button onClick={() => navigate("/products")} className="px-8 py-3.5 text-base font-bold text-white transition-all bg-gray-900 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5">
//                   Shop Now
//                 </button>
//                 <button onClick={() => navigate("/profile")} className="px-8 py-3.5 text-base font-bold text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                   Profil Saya
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
//               <div className="space-y-8 animate-fade-in-up">
//                 <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                   ✨ Solusi Cepat Rambut Rapi
//                 </div>
//                 <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
//                   Tanpa Ribet, <br/>
//                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-gycora to-emerald-400">Tanpa Nunggu Lama.</span>
//                 </h1>
//                 <p className="text-lg leading-relaxed text-gray-500 sm:text-xl">
//                   Nggak semua orang punya waktu buat styling setiap hari. Tapi kamu tetap bisa tampil rapi dalam hitungan menit. Gycora hadir dengan solusi praktis untuk bantu rambut kamu tetap halus, mudah diatur, dan siap tampil kapan aja.
//                 </p>
//                 <div className="flex flex-col gap-4 pt-4 sm:flex-row">
//                   <Link to="/products" className="px-8 py-4 text-lg font-bold text-center text-white transition-all rounded-full bg-gycora hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5">
//                     Shop Now
//                   </Link>
//                   <a href="#featured" className="px-8 py-4 text-lg font-bold text-center text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                     Lihat Produk
//                   </a>
//                 </div>
//               </div>
              
//               <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//                 <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-pink-50 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
                
//                 <div className="relative w-full overflow-hidden shadow-2xl h-[500px] rounded-[3rem] group">
//                   {heroSlides.map((slide, index) => (
//                     <img 
//                       key={slide.id}
//                       src={slide.image} 
//                       alt={slide.alt} 
//                       className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
//                     />
//                   ))}

//                   <div className="absolute inset-0 flex items-center justify-between px-4 transition-opacity opacity-0 group-hover:opacity-100">
//                     <button onClick={() => setCurrentSlide(prev => prev === 0 ? heroSlides.length - 1 : prev - 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                     </button>
//                     <button onClick={() => setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                     </button>
//                   </div>

//                   <div className="absolute flex justify-center w-full gap-2 bottom-6">
//                     {heroSlides.map((_, index) => (
//                       <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${index === currentSlide ? 'w-8 bg-gycora' : 'w-2.5 bg-white/70 hover:bg-white'}`} aria-label={`Slide ${index + 1}`}></button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =========================================
//           2. REAL RESULTS (BEFORE - AFTER) LOKAL ASET
//       ========================================= */}
//       <div className="py-24 border-gray-100 bg-gray-50 border-y">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-16 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Hasil Nyata Tanpa Filter</h2>
//             <p className="mt-4 text-gray-500">Perbedaan nyata sebelum dan sesudah menggunakan Gycora.</p>
//           </div>

//           <div className="relative flex flex-col max-w-4xl mx-auto overflow-hidden bg-white border border-gray-200 shadow-xl group rounded-3xl">
//             <img 
//               src={beforeAfterImg} 
//               alt="Before After Hair Treatment" 
//               className="object-cover w-full h-auto transition-transform duration-1000 group-hover:scale-105" 
//             />
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           3. RELATABLE PROBLEM & SOLUTION SECTION
//       ========================================= */}
//       <div className="py-24 border-b border-gray-100 bg-gray-50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col gap-16 lg:flex-row lg:items-center">
//             <div className="flex-1 space-y-6">
//               <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Pernah Ngerasa Kayak Gini?</h2>
//               <ul className="space-y-4 text-lg text-gray-600">
//                 <li className="flex items-start gap-3">
//                   <span className="mt-1 text-red-500">✕</span>
//                   <span>Rambut tiba-tiba kusut di momen penting</span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <span className="mt-1 text-red-500">✕</span>
//                   <span>Udah rapi dari rumah, tapi berantakan di jalan</span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <span className="mt-1 text-red-500">✕</span>
//                   <span>Habis pakai helm, kena angin, atau aktivitas seharian</span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <span className="mt-1 text-red-500">✕</span>
//                   <span>Nggak punya banyak waktu buat styling ulang</span>
//                 </li>
//               </ul>
//               <p className="pt-4 font-medium text-gray-900 text-md">Padahal kamu cuma butuh cara cepat buat balik rapi lagi.</p>
//             </div>

//             <div className="flex-1 p-8 bg-white shadow-xl rounded-3xl lg:p-12">
//               <div className="inline-flex items-center px-4 py-1.5 mb-6 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase">
//                 The Solution
//               </div>
//               <h3 className="mb-6 text-2xl font-extrabold text-gray-900 sm:text-3xl">Nggak Perlu Ribet Buat Tampil Rapi</h3>
//               <p className="mb-6 text-lg leading-relaxed text-gray-500">
//                 Kenalin, <strong>Ethereal Glow Brush</strong> — sisir dengan teknologi anti-static yang bantu rambut lebih halus, rapi, dan mudah diatur hanya dalam beberapa menit.
//               </p>
//               <p className="mb-8 text-lg leading-relaxed text-gray-500">
//                 Cukup sisir seperti biasa, tanpa teknik khusus. Hasilnya langsung terasa.
//               </p>
//               <Link to="/products" className="inline-block px-8 py-4 text-base font-bold text-white transition-all bg-gray-900 rounded-full shadow-lg hover:bg-black hover:shadow-xl hover:-translate-y-0.5">
//                 Explore Product
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           4. KEY BENEFITS
//       ========================================= */}
//       <div className="py-24 bg-white border-b border-gray-100">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-16 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Kenapa Banyak yang Pilih Gycora?</h2>
//           </div>
//           <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
//             <div className="p-8 transition-colors border border-transparent shadow-sm bg-gray-50 rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-100 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
//               </div>
//               <h3 className="mb-3 text-lg font-bold text-gray-900">Hasil Hitungan Menit</h3>
//               <p className="leading-relaxed text-gray-500">Bantu mengurangi rambut kusut dan berantakan dalam hitungan menit tanpa effort lebih.</p>
//             </div>
//             <div className="p-8 transition-colors border border-transparent shadow-sm bg-gray-50 rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-100 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//               </div>
//               <h3 className="mb-3 text-lg font-bold text-gray-900">Teknologi Anti-Static</h3>
//               <p className="leading-relaxed text-gray-500">Mengurangi listrik statis pada rambut seketika. Cocok untuk berbagai jenis rambut.</p>
//             </div>
//             <div className="p-8 transition-colors border border-transparent shadow-sm bg-gray-50 rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-100 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
//               </div>
//               <h3 className="mb-3 text-lg font-bold text-gray-900">Praktis & Portabel</h3>
//               <p className="leading-relaxed text-gray-500">Desain ergonomis yang mudah dibawa ke mana saja. Rambut rapi di setiap momen penting.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           5. FEATURED PRODUCT SECTION (PRODUK SHOWCASE)
//       ========================================= */}
//       <div id="featured" className="py-24 bg-white">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-between mb-12 sm:flex-row">
//             <div>
//               <h2 className="text-3xl font-extrabold text-gray-900">Produk Favorit Pilihan Banyak Orang</h2>
//               <p className="mt-2 text-gray-500">Temukan produk best seller yang jadi andalan untuk rambut lebih rapi, halus, dan mudah diatur.</p>
//             </div>
//           </div>

//           {isLoadingProducts ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="bg-white border border-gray-100 shadow-sm rounded-2xl animate-pulse">
//                   <div className="w-full bg-gray-200 aspect-square rounded-t-2xl"></div>
//                   <div className="p-6 space-y-3">
//                     <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
//                     <div className="w-full h-4 bg-gray-200 rounded"></div>
//                     <div className="w-1/2 h-6 mt-4 bg-gray-200 rounded"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : featuredProducts.length > 0 ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//               {featuredProducts.map((product) => {
//                 // Menyesuaikan deskripsi dengan mock-up jika memungkinkan, atau pakai bawaan DB
//                 let customDesc = product.description;
//                 if (product.name.toLowerCase().includes("pink")) {
//                   customDesc = "Sisir anti-static untuk bantu rambut lebih rapi dan mudah diatur dalam beberapa menit.";
//                 } else if (product.name.toLowerCase().includes("black")) {
//                   customDesc = "Desain elegan dengan teknologi anti-static untuk rambut yang lebih halus dan bebas kusut.";
//                 } else if (product.name.toLowerCase().includes("scalp")) {
//                   customDesc = "Scalp brush yang bantu membersihkan dan merawat kulit kepala dengan lebih nyaman.";
//                 }

//                 return (
//                   <div 
//                     key={product.id} 
//                     className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md cursor-pointer group rounded-2xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1" 
//                     onClick={() => navigate(`/product/${product.id}`)}
//                   >
//                     <div className="relative overflow-hidden bg-gray-100 aspect-[4/5]">
//                       <img 
//                         src={product.image_url} 
//                         alt={product.name} 
//                         className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
//                       />
//                     </div>
//                     <div className="flex flex-col flex-1 p-6">
//                       <h3 className="mb-2 text-xl font-bold text-gray-900 line-clamp-1">{product.name}</h3>
//                       <p className="flex-1 mb-6 text-sm leading-relaxed text-gray-500 line-clamp-3">
//                         {customDesc || "Performa maksimal untuk rambut lebih rapi & halus."}
//                       </p>
//                       <button className="w-full py-3 text-sm font-bold tracking-widest text-center text-white uppercase transition-colors bg-gray-900 rounded-lg hover:bg-gycora">
//                         Shop Now
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           ) : (
//             <div className="py-12 italic text-center text-gray-500">Belum ada produk yang tersedia.</div>
//           )}
//         </div>
//       </div> 

//       {/* =========================================
//           6. SOCIAL PROOF (REVIEWS)
//       ========================================= */}
//       <div className="py-24 bg-white">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="max-w-2xl mx-auto mb-16 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Bukan Cuma Kata Kami, Tapi Mereka yang Sudah Coba</h2>
//             <p className="mt-4 text-gray-500">Ribuan pengguna Gycora sudah merasakan perubahan nyata dalam rutinitas mereka.</p>
//           </div>

//           {isLoadingReviews ? (
//             <div className="flex justify-center">
//               <div className="w-10 h-10 border-4 rounded-full border-gycora animate-spin border-t-transparent"></div>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {displayReviews.map((review: any) => (
//                 <div key={review.id} className="relative flex flex-col p-8 transition-shadow border border-gray-100 bg-gray-50 rounded-3xl hover:shadow-md">
//                   <div className="flex gap-1 mb-4 text-amber-400">
//                     {[...Array(5)].map((_, i) => (
//                       <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
//                     ))}
//                   </div>
                  
//                   <p className="flex-1 mb-6 text-sm italic leading-relaxed text-gray-600 line-clamp-4">
//                     "{review.comment || review.text}"
//                   </p>
                  
//                   <div className="flex items-center gap-3 pt-6 mt-auto border-t border-gray-200">
//                     <div className="flex-1 min-w-0">
//                       <h4 className="text-sm font-bold text-gray-900 truncate">
//                         - {review.user ? `${review.user.first_name}` : review.name}
//                       </h4>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =========================================
//           7. OFFER SECTION
//       ========================================= */}
//       <div className="py-20 bg-emerald-50">
//         <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
//           <h2 className="mb-4 text-3xl font-extrabold text-gycora-dark">Lagi Ada Promo Spesial Hari Ini ✨</h2>
//           <p className="mb-8 text-lg text-emerald-800">
//             Nikmati berbagai penawaran menarik untuk produk favorit kamu. Penawaran terbatas selama stok masih ada. Jangan sampai kehabisan.
//           </p>
//           <button 
//             onClick={() => setShowPromoModal(true)} 
//             className="inline-block px-10 py-4 text-lg font-bold text-white transition-all rounded-full bg-gycora hover:bg-gycora-dark shadow-lg hover:shadow-xl hover:-translate-y-0.5"
//           >
//             Ambil Promo Sekarang
//           </button>
//         </div>
//       </div>

//       {/* =========================================
//           8. CTA SECTION (CLOSING)
//       ========================================= */}
//       <div className="relative py-24 overflow-hidden bg-gray-900">
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gycora rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        
//         <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-extrabold text-white sm:text-5xl">
//             Nggak Perlu Ribet Buat Tampil Rapi
//           </h2>
//           <p className="mt-6 mb-10 text-lg leading-relaxed text-gray-400">
//             Mulai dari langkah kecil yang bikin perbedaan besar di penampilan kamu.<br/>
//             Dengan Gycora, rambut rapi bukan lagi hal yang butuh effort lebih.
//           </p>
//           <button 
//             onClick={() => navigate("/products")} 
//             className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5"
//           >
//             Shop Now
//           </button>
//         </div>
//       </div>

//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api";
// import Swal from "sweetalert2";

// // --- IMPORT GAMBAR DARI LOKAL UNTUK SLIDER & ASET ---
// import slide1 from "/landing_page_images/hero_slide_1.jpg";
// import slide2 from "/landing_page_images/hero_slide_2.jpg";
// import slide3 from "/landing_page_images/hero_slide_3.jpg";
// import slide4 from "/landing_page_images/hero_slide_4.jpg";
// // import slide5 from "/landing_page_images/hero_slide_5.jpg";

// // Import aset baru untuk Before-After
// import beforeAfterImg from "/landing_page_images/before_after.png";

// const heroSlides = [
//   { id: 1, image: slide1, alt: "Gycora Premium Hair Care 1" },
//   { id: 2, image: slide2, alt: "Gycora Premium Hair Care 2" },
//   { id: 3, image: slide3, alt: "Gycora Premium Hair Care 3" },
//   { id: 4, image: slide4, alt: "Gycora Premium Hair Care 4" },
//   // { id: 5, image: slide5, alt: "Gycora Premium Hair Care 5" },
// ];

// // Fallback testimonials (Diupdate sesuai dengan copy dari UI/UX)
// const fallbackTestimonials = [
//   {
//     id: "f1",
//     name: "Claudiasunshinee",
//     role: "Verified Buyer",
//     text: "Sisir nya bagus banget sih sesuai dgn claim nya 🙌🙌 sblmnya aku pakai brand w** krn rambutku rontok.. trs setelah aku compare sm brand Gycora ternyata jauh lbh ga rontok pakai Gycora ❤👍",
//     rating: 5,
//   },
//   {
//     id: "f2",
//     name: "Nilasetiobudii",
//     role: "Verified Buyer",
//     text: "Sisirnya enak banget terutama buat rambut yg suka kusut Jd lebih gampang pake sisir dari Gycora..",
//     rating: 5,
//   },
//   {
//     id: "f3",
//     name: "Thaliastanley___",
//     role: "Verified Buyer",
//     text: "Setelah saya pakai hair brush nya rambutku jadi lebih gak kusut dan bikin lebih pede pastinya..",
//     rating: 5,
//   },
//   {
//     id: "f4",
//     name: "Herlenasutanto",
//     role: "Verified Buyer",
//     text: "Oke kok enak sisir nya lentur ngikutin kepala. ga nyangkut2 hehe",
//     rating: 5,
//   },
//   {
//     id: "f5",
//     name: "Anitaa_bee",
//     role: "Verified Buyer",
//     text: "Sukaaa poll sma sisirnya... Rambut jd makin teratur pas disisir dan ga gerundel (kusut frizzy) n rambut ku ya uda ga tllu banyak yg rontok. terus sisirnya tu empuk dan nyaman poll di kepala ga sakit.",
//     rating: 5,
//   },
// ];

// export default function Home() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   // const [userData, setUserData] = useState<any>(null);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
//   const [isLoadingProducts, setIsLoadingProducts] = useState(true);

//   // --- STATE UNTUK REAL REVIEWS ---
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [realReviews, setRealReviews] = useState<any[]>([]);
//   const [isLoadingReviews, setIsLoadingReviews] = useState(true);

//   // --- STATE UNTUK POP-UP PROMO ---
//   const [isPromoMounted, setIsPromoMounted] = useState(false);
//   const [showPromoModal, setShowPromoModal] = useState(false);
//   const [promoEmail, setPromoEmail] = useState("");
//   const [isSubscribing, setIsSubscribing] = useState(false);

//   useEffect(() => {
//     // const storedUser = localStorage.getItem("user_data");
//     // if (storedUser) {
//     //   setUserData(JSON.parse(storedUser));
//     // }

//     // Mount modal secara instan, lalu trigger animasi 50ms kemudian agar CSS transisi bekerja
//     setIsPromoMounted(true);
//     const animTimer = setTimeout(() => {
//       setShowPromoModal(true);
//     }, 50);

//     const fetchFeaturedProducts = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (res.ok) {
//           const data = await res.json();
//           let productsArray = data.data ? data.data : data;

//           // =========================================================
//           // [PERBAIKAN] LOGIKA SORTING PRODUK (ETHEREAL GLOW BRUSH DULUAN)
//           // =========================================================
//           productsArray = productsArray.sort((a: any, b: any) => {
//             const nameA = a.name.toLowerCase();
//             const nameB = b.name.toLowerCase();
//             const aIsBrush = nameA.includes("ethereal glow brush");
//             const bIsBrush = nameB.includes("ethereal glow brush");
            
//             if (aIsBrush && !bIsBrush) return -1; // Taruh A di depan
//             if (!aIsBrush && bIsBrush) return 1;  // Taruh B di depan
//             return 0; // Jika sama-sama brush atau sama-sama bukan, biarkan urutannya
//           });

//           setFeaturedProducts(productsArray.slice(0, 3) || []);
//         }
//       } catch (error) {
//         console.error("Gagal memuat produk unggulan:", error);
//       } finally {
//         setIsLoadingProducts(false);
//       }
//     };

//     const fetchRealReviews = async () => {
//       try {
//         const token =
//           localStorage.getItem("user_token") ||
//           localStorage.getItem("admin_token");
//         const headers: HeadersInit = { Accept: "application/json" };
//         if (token) headers["Authorization"] = `Bearer ${token}`;

//         const res = await fetch(`${BASE_URL}/api/admin/reviews`, { headers });

//         if (res.ok) {
//           const data = await res.json();
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           const fiveStarReviews = data
//             .filter((review: any) => review.rating === 5)
//             .slice(0, 6);
//           setRealReviews(fiveStarReviews);
//         }
//       } catch (error) {
//         console.error("Gagal memuat ulasan asli:", error);
//       } finally {
//         setIsLoadingReviews(false);
//       }
//     };

//     fetchFeaturedProducts();
//     fetchRealReviews();

//     return () => {
//       clearTimeout(animTimer);
//     };
//   }, []);

//   // useEffect(() => {
//   //   if (userData) return;
//   //   const slideInterval = setInterval(() => {
//   //     setCurrentSlide((prev) =>
//   //       prev === heroSlides.length - 1 ? 0 : prev + 1,
//   //     );
//   //   }, 4000);
//   //   return () => clearInterval(slideInterval);
//   // }, [userData]);

//   // --- EFEK UNTUK AUTO-SLIDE HERO IMAGE ---
//   useEffect(() => {
//     const slideInterval = setInterval(() => {
//       setCurrentSlide((prev) =>
//         prev === heroSlides.length - 1 ? 0 : prev + 1,
//       );
//     }, 4000); // Ganti gambar setiap 4000ms (4 detik)
    
//     return () => clearInterval(slideInterval);
//   }, []);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { 
//       style: 'currency', 
//       currency: 'IDR', 
//       minimumFractionDigits: 0 
//     }).format(angka || 0);
//   };

//   const closePromoModal = () => {
//     setShowPromoModal(false);
//     setTimeout(() => {
//       setIsPromoMounted(false);
//     }, 300);
//   };

//   const handleSubscribePromo = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!promoEmail) return;

//     setIsSubscribing(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/promo/claim`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ email: promoEmail }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         closePromoModal();
//         Swal.fire({
//           icon: "success",
//           title: "Kode Promo Terkirim!",
//           text: "Silakan periksa kotak masuk email Anda untuk mendapatkan kode voucher spesial dari Gycora.",
//           confirmButtonColor: "#059669",
//         });
//       } else {
//         Swal.fire({
//           icon: "warning",
//           title: "Pemberitahuan",
//           text:
//             data.message ||
//             "Gagal mengklaim promo. Pastikan format email benar.",
//           confirmButtonColor: "#d33",
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         icon: "error",
//         title: "Gagal",
//         text: "Terjadi kesalahan server saat memproses permintaan Anda.",
//         confirmButtonColor: "#d33",
//       });
//     } finally {
//       setIsSubscribing(false);
//     }
//   };

//   const displayReviews =
//     realReviews.length > 0 ? realReviews : fallbackTestimonials;

//   return (
//     <div className="relative font-sans bg-white">
//       {/* =========================================
//           POP-UP PROMO MODAL 
//       ========================================= */}
//       {isPromoMounted && (
//         <div
//           className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ease-out
//             ${showPromoModal ? "bg-black/60 backdrop-blur-sm opacity-100" : "bg-black/0 backdrop-blur-none opacity-0"}
//           `}
//         >
//           <div
//             className={`relative flex flex-col w-full max-w-3xl overflow-hidden bg-white shadow-2xl md:flex-row rounded-2xl transition-all duration-500 ease-out transform
//               ${showPromoModal ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-8 opacity-0"}
//             `}
//           >
//             <button
//               onClick={closePromoModal}
//               className="absolute z-10 flex items-center justify-center w-8 h-8 text-gray-500 transition-colors bg-white rounded-full shadow-md top-4 right-4 hover:bg-gray-100 hover:text-gray-900"
//             >
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
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>

//             <div className="flex flex-col justify-center flex-1 p-8 md:p-12">
//               <h2 className="mb-2 font-serif text-4xl font-black tracking-tight text-gray-900 uppercase">
//                 Gycora
//               </h2>
//               <h3 className="mb-4 text-3xl font-extrabold leading-tight text-[#006A4E]">
//                 Dapetin Diskon Spesial untuk First Order ✨
//               </h3>
//               <p className="mb-8 text-sm font-medium text-gray-500">
//                 Masukkan email kamu & nikmati voucher eksklusif hari ini.
//               </p>

//               <form onSubmit={handleSubscribePromo} className="space-y-4">
//                 <input
//                   type="email"
//                   value={promoEmail}
//                   onChange={(e) => setPromoEmail(e.target.value)}
//                   placeholder="Masukkan Email"
//                   className="w-full px-4 py-3 text-sm transition-all border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#006A4E]"
//                   required
//                 />
//                 <button
//                   type="submit"
//                   disabled={isSubscribing}
//                   className="w-full px-4 py-3 text-sm font-bold tracking-widest text-white uppercase transition-all bg-[#006A4E] rounded-lg hover:bg-emerald-900 disabled:bg-gray-400"
//                 >
//                   {isSubscribing ? "Mengirim..." : "Ambil Voucher"}
//                 </button>
//               </form>
//             </div>

//             <div className="hidden w-full md:block md:w-5/12 bg-emerald-50">
//               <img
//                 src="/landing_page_images/promo_popup.jpg"
//                 alt="Promo Gycora"
//                 className="object-cover w-full h-full"
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* =========================================
//           1. HERO SECTION 
//           [PERBAIKAN] max-w-[1536px] agar melebar lebih dekat ke tepi layar
//       ========================================= */}
//       <div className="relative w-full overflow-hidden bg-[#F4F9F6] min-h-[600px] flex items-center">
//         {/* Gambar Slider (Di Sisi Kanan/Background) */}
//         <div className="absolute inset-0 z-0 flex justify-end">
//           <div className="w-full h-full md:w-[60%] relative">
//             {heroSlides.map((slide, index) => (
//               <img
//                 key={slide.id}
//                 src={slide.image}
//                 alt={slide.alt}
//                 className={`absolute inset-0 object-cover object-right-top w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
//               />
//             ))}
//             {/* Gradient Overlay agar teks kiri terbaca */}
//             <div className="absolute inset-0 bg-gradient-to-r from-[#F4F9F6] via-[#F4F9F6]/80 to-transparent w-full md:w-1/2"></div>
//           </div>
//         </div>

//         {/* Panah Navigasi Slider */}
//         <button
//           onClick={() => setCurrentSlide((prev) => prev === 0 ? heroSlides.length - 1 : prev - 1)}
//           className="absolute z-20 flex items-center justify-center w-10 h-10 text-[#006A4E] transition-colors bg-white rounded-full shadow-md left-4 md:left-8 hover:bg-gray-50"
//         >
//           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
//         </button>
//         <button
//           onClick={() => setCurrentSlide((prev) => prev === heroSlides.length - 1 ? 0 : prev + 1)}
//           className="absolute z-20 flex items-center justify-center w-10 h-10 text-[#006A4E] transition-colors bg-white rounded-full shadow-md right-4 md:right-8 hover:bg-gray-50"
//         >
//           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
//         </button>

//         {/* Konten Teks Kiri - [DILEBARKAN DENGAN max-w-[1236px]] */}
//         <div className="relative z-10 w-full px-6 mx-auto max-w-[1236px] sm:px-10 lg:px-16 animate-fade-in-up">
//           <div className="max-w-xl">
//             <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl text-[#006A4E]">
//               Solusi Cepat untuk <br /> Rambut Lebih Rapi
//             </h1>
//             <h2 className="mt-4 text-xl font-bold text-gray-900 sm:text-2xl">
//               Tanpa Ribet, Tanpa Nunggu Lama.
//             </h2>
//             <p className="mt-4 text-base leading-relaxed text-gray-500 sm:text-lg">
//               Nggak semua orang punya waktu buat styling setiap hari. Tapi kamu tetap bisa tampil lebih rapi dalam hitungan menit dengan produk pilihan dari Gycora.
//             </p>

//             {/* Tombol Aksi */}
//             <div className="flex flex-col gap-4 mt-8 sm:flex-row">
//               <Link
//                 to="/products"
//                 className="px-8 py-3.5 text-sm font-bold tracking-wider text-center text-white uppercase transition-colors rounded-full shadow-lg bg-[#006A4E] hover:bg-emerald-900"
//               >
//                 Shop Now
//               </Link>
//               <a
//                 href="#featured"
//                 className="px-8 py-3.5 text-sm font-bold tracking-wider text-center uppercase transition-colors bg-transparent border-2 rounded-full border-[#006A4E] text-[#006A4E] hover:bg-[#006A4E] hover:text-white"
//               >
//                 Lihat Produk
//               </a>
//             </div>

//             {/* Icon Features Bawah */}
//             <div className="flex items-center gap-8 mt-10">
//               <div className="flex items-center gap-2">
//                 <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//                 <span className="text-xs font-bold leading-tight text-gray-500">Teknologi<br/>Anti Statis</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
//                 <span className="text-xs font-bold leading-tight text-gray-500">Material<br/>Premium</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
//                 <span className="text-xs font-bold leading-tight text-gray-500">Eco<br/>Friendly</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           2. FEATURED PRODUCT SECTION (DESAIN KARTU HORIZONTAL)
//           [PERBAIKAN] max-w-[1536px] melebar mendekati tepi layar
//       ========================================= */}
//       <div id="featured" className="py-24 bg-[#F9FDFB]">
//         <div className="px-6 mx-auto max-w-[1536px] sm:px-10 lg:px-16">
//           <div className="flex flex-col items-end justify-between mb-10 md:flex-row">
//             <div className="w-full md:w-1/2">
//               <h2 className="text-2xl font-extrabold sm:text-3xl text-[#006A4E]">
//                 Produk Favorit Pilihan Banyak Orang
//               </h2>
//               <p className="mt-2 text-sm text-gray-500 sm:text-base">
//                 Temukan produk best seller yang jadi andalan untuk rambut lebih
//                 rapi, halus, dan mudah diatur setiap hari.
//               </p>
//             </div>
//             <Link
//               to="/products"
//               className="flex items-center gap-2 mt-4 font-bold text-gray-600 transition-colors md:mt-0 hover:text-[#006A4E]"
//             >
//               Lihat Semua Produk 
//               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
//             </Link>
//           </div>

//           {isLoadingProducts ? (
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="flex flex-row p-4 bg-white border border-gray-100 shadow-sm rounded-3xl animate-pulse">
//                   <div className="w-2/5 bg-gray-200 rounded-2xl h-36"></div>
//                   <div className="w-3/5 pl-4 space-y-3">
//                     <div className="w-full h-4 bg-gray-200 rounded"></div>
//                     <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
//                     <div className="w-1/2 h-5 mt-4 bg-gray-200 rounded"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : featuredProducts.length > 0 ? (
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {featuredProducts.map((product) => {
//                 // Gunakan deksripsi fallback untuk kartu yang sempit
//                 let customDesc = product.description;
//                 if (product.name.toLowerCase().includes("pink")) {
//                   customDesc = "Sisir premium dengan teknologi anti-static yang bantu rambut lebih halus, rapi, dan berkilau dalam sekali sisir.";
//                 } else if (product.name.toLowerCase().includes("black")) {
//                   customDesc = "Sisir premium dengan teknologi anti-static yang bantu rambut lebih halus, rapi, dan berkilau dalam sekali sisir.";
//                 } else if (product.name.toLowerCase().includes("scalp")) {
//                   customDesc = "Sisir premium dengan teknologi anti-static yang bantu rambut lebih halus, rapi, dan berkilau dalam sekali sisir.";
//                 }

//                 return (
//                   <div
//                     key={product.id}
//                     className="relative flex flex-row p-4 transition-all duration-300 bg-white border border-gray-100 shadow-sm cursor-pointer rounded-3xl hover:shadow-lg hover:-translate-y-1"
//                     onClick={() => navigate(`/product/${product.id}`)}
//                   >
//                     {/* Icon Favorit (Pojok Kanan Atas) */}
//                     <button className="absolute z-10 text-gray-300 top-4 right-4 hover:text-red-500">
//                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
//                     </button>

//                     {/* Gambar Produk Kiri */}
//                     <div className="flex items-center justify-center w-2/5 shrink-0">
//                       <img
//                         src={product.image_url}
//                         alt={product.name}
//                         className="object-contain w-full h-32 md:h-40 drop-shadow-sm"
//                       />
//                     </div>

//                     {/* Detail Produk Kanan */}
//                     <div className="flex flex-col justify-center w-3/5 pl-4 pr-2">
//                       <h3 className="text-sm font-extrabold leading-tight text-[#006A4E] line-clamp-2">
//                         {product.name}
//                       </h3>
//                       <p className="mt-1 leading-relaxed text-gray-500 text-md line-clamp-3">
//                         {customDesc || "Sisir premium dengan teknologi anti-static yang bantu rambut lebih halus, rapi, dan berkilau dalam sekali sisir."}
//                       </p>
                      
//                       {/* Area Harga */}
//                       <div className="mt-3">
//                         {product.discount_price && product.discount_price > 0 ? (
//                           <>
//                             <span className="block text-[10px] font-medium text-gray-400 line-through">
//                               {formatRupiah(product.price)}
//                             </span>
//                             <span className="block text-lg font-black leading-none text-rose-500">
//                               {formatRupiah(product.discount_price)}
//                             </span>
//                           </>
//                         ) : (
//                           <span className="block text-lg font-black leading-none text-[#006A4E]">
//                             {formatRupiah(product.price)}
//                           </span>
//                         )}
//                       </div>

//                       {/* Tombol Outline Shop Now */}
//                       <button className="px-4 py-1.5 mt-4 text-[10px] font-bold tracking-widest uppercase transition-colors bg-white border border-[#006A4E] rounded-full text-[#006A4E] hover:bg-[#006A4E] hover:text-white w-max">
//                         Shop Now
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           ) : (
//             <div className="py-12 italic text-center text-gray-500">
//               Belum ada produk yang tersedia.
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =========================================
//           3. RELATABLE PROBLEM & SOLUTION SECTION
//       ========================================= */}
//       <div className="py-24 bg-white border-gray-100 border-y">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col gap-16 lg:flex-row lg:items-center">
//             <div className="flex-1 space-y-6">
//               <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
//                 Pernah Ngerasa Kayak Gini?
//               </h2>
//               <ul className="space-y-4 text-lg text-gray-600">
//                 <li className="flex items-start gap-3">
//                   <span className="mt-1 text-red-500">✕</span>
//                   <span>Rambut tiba-tiba kusut di momen penting</span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <span className="mt-1 text-red-500">✕</span>
//                   <span>Udah rapi dari rumah, tapi berantakan di jalan</span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <span className="mt-1 text-red-500">✕</span>
//                   <span>
//                     Habis pakai helm, kena angin, atau aktivitas seharian
//                   </span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <span className="mt-1 text-red-500">✕</span>
//                   <span>Nggak punya banyak waktu buat styling ulang</span>
//                 </li>
//               </ul>
//               <p className="pt-4 font-medium text-gray-900 text-md">
//                 Padahal kamu cuma butuh cara cepat buat balik rapi lagi.
//               </p>
//             </div>

//             <div className="flex-1 p-8 bg-white border border-gray-100 shadow-xl rounded-3xl lg:p-12">
//               <div className="inline-flex items-center px-4 py-1.5 mb-6 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase">
//                 The Solution
//               </div>
//               <h3 className="mb-6 text-2xl font-extrabold text-gray-900 sm:text-3xl">
//                 Nggak Perlu Ribet Buat Tampil Rapi
//               </h3>
//               <p className="mb-6 text-lg leading-relaxed text-gray-500">
//                 Kenalin, <strong>Ethereal Glow Brush</strong> — sisir dengan
//                 teknologi anti-static yang bantu rambut lebih halus, rapi, dan
//                 mudah diatur hanya dalam beberapa menit.
//               </p>
//               <p className="mb-8 text-lg leading-relaxed text-gray-500">
//                 Cukup sisir seperti biasa, tanpa teknik khusus. Hasilnya
//                 langsung terasa.
//               </p>
//               <Link
//                 to="/products"
//                 className="inline-block px-8 py-4 text-base font-bold text-white transition-all bg-[#006A4E] rounded-full shadow-lg hover:bg-emerald-900 hover:shadow-xl hover:-translate-y-0.5"
//               >
//                 Explore Product
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           4. REAL RESULTS (BEFORE - AFTER) LOKAL ASET
//       ========================================= */}
//       <div className="py-24 border-gray-100 bg-[#F4F9F6] border-b">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-16 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">
//               Hasil Nyata Tanpa Filter
//             </h2>
//             <p className="mt-4 text-gray-500">
//               Perbedaan nyata sebelum dan sesudah menggunakan Gycora.
//             </p>
//           </div>

//           <div className="relative flex flex-col max-w-4xl mx-auto overflow-hidden bg-white border border-gray-200 shadow-xl group rounded-3xl">
//             <img
//               src={beforeAfterImg}
//               alt="Before After Hair Treatment"
//               className="object-cover w-full h-auto transition-transform duration-1000 group-hover:scale-105"
//             />
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           5. KEY BENEFITS
//       ========================================= */}
//       <div className="py-24 bg-white border-b border-gray-100">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-16 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
//               Kenapa Banyak yang Pilih Gycora?
//             </h2>
//           </div>
//           <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
//             <div className="p-8 transition-colors border border-transparent shadow-sm bg-gray-50 rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-100 text-[#006A4E]">
//                 <svg
//                   className="w-8 h-8"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="mb-3 text-lg font-bold text-gray-900">
//                 Hasil Hitungan Menit
//               </h3>
//               <p className="leading-relaxed text-gray-500">
//                 Bantu mengurangi rambut kusut dan berantakan dalam hitungan
//                 menit tanpa effort lebih.
//               </p>
//             </div>
//             <div className="p-8 transition-colors border border-transparent shadow-sm bg-gray-50 rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-100 text-[#006A4E]">
//                 <svg
//                   className="w-8 h-8"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M13 10V3L4 14h7v7l9-11h-7z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="mb-3 text-lg font-bold text-gray-900">
//                 Teknologi Anti-Static
//               </h3>
//               <p className="leading-relaxed text-gray-500">
//                 Mengurangi listrik statis pada rambut seketika. Cocok untuk
//                 berbagai jenis rambut.
//               </p>
//             </div>
//             <div className="p-8 transition-colors border border-transparent shadow-sm bg-gray-50 rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-100 text-[#006A4E]">
//                 <svg
//                   className="w-8 h-8"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="mb-3 text-lg font-bold text-gray-900">
//                 Praktis & Portabel
//               </h3>
//               <p className="leading-relaxed text-gray-500">
//                 Desain ergonomis yang mudah dibawa ke mana saja. Rambut rapi di
//                 setiap momen penting.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           6. SOCIAL PROOF (REVIEWS)
//       ========================================= */}
//       <div className="py-24 bg-white border-b border-gray-100">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="max-w-2xl mx-auto mb-16 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">
//               Bukan Cuma Kata Kami, Tapi Mereka yang Sudah Coba
//             </h2>
//             <p className="mt-4 text-gray-500">
//               Ribuan pengguna Gycora sudah merasakan perubahan nyata dalam
//               rutinitas mereka.
//             </p>
//           </div>

//           {isLoadingReviews ? (
//             <div className="flex justify-center">
//               <div className="w-10 h-10 border-4 rounded-full border-[#006A4E] animate-spin border-t-transparent"></div>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {displayReviews.map((review: any) => (
//                 <div
//                   key={review.id}
//                   className="relative flex flex-col p-8 transition-shadow border border-gray-100 bg-gray-50 rounded-3xl hover:shadow-md"
//                 >
//                   <div className="flex gap-1 mb-4 text-amber-400">
//                     {[...Array(5)].map((_, i) => (
//                       <svg
//                         key={i}
//                         className="w-5 h-5 fill-current"
//                         viewBox="0 0 20 20"
//                       >
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                     ))}
//                   </div>

//                   <p className="flex-1 mb-6 text-sm italic leading-relaxed text-gray-600 line-clamp-4">
//                     "{review.comment || review.text}"
//                   </p>

//                   <div className="flex items-center gap-3 pt-6 mt-auto border-t border-gray-200">
//                     <div className="flex-1 min-w-0">
//                       <h4 className="text-sm font-bold text-gray-900 truncate">
//                         -{" "}
//                         {review.user
//                           ? `${review.user.first_name}`
//                           : review.name}
//                       </h4>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =========================================
//           7. OFFER SECTION
//       ========================================= */}
//       <div className="py-20 bg-emerald-50">
//         <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
//           <h2 className="mb-4 text-3xl font-extrabold text-[#006A4E]">
//             Lagi Ada Promo Spesial Hari Ini ✨
//           </h2>
//           <p className="mb-8 text-lg text-emerald-800">
//             Nikmati berbagai penawaran menarik untuk produk favorit kamu.
//             Penawaran terbatas selama stok masih ada. Jangan sampai kehabisan.
//           </p>
//           <button
//             onClick={() => setShowPromoModal(true)}
//             className="inline-block px-10 py-4 text-lg font-bold text-white transition-all rounded-full bg-[#006A4E] hover:bg-emerald-900 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
//           >
//             Ambil Promo Sekarang
//           </button>
//         </div>
//       </div>

//       {/* =========================================
//           8. CTA SECTION (CLOSING)
//       ========================================= */}
//       <div className="relative py-24 overflow-hidden bg-gray-900">
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gycora rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

//         <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-extrabold text-white sm:text-5xl">
//             Nggak Perlu Ribet Buat Tampil Rapi
//           </h2>
//           <p className="mt-6 mb-10 text-lg leading-relaxed text-gray-400">
//             Mulai dari langkah kecil yang bikin perbedaan besar di penampilan
//             kamu.
//             <br />
//             Dengan Gycora, rambut rapi bukan lagi hal yang butuh effort lebih.
//           </p>
//           <button
//             onClick={() => navigate("/products")}
//             className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5"
//           >
//             Shop Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api";
// import Swal from "sweetalert2";

// // --- IMPORT GAMBAR DARI LOKAL UNTUK SLIDER & ASET ---
// import slide1 from "/landing_page_images/hero_slide_1.jpg";
// import slide2 from "/landing_page_images/hero_slide_2.jpg";
// import slide3 from "/landing_page_images/hero_slide_3.jpg";
// import slide4 from "/landing_page_images/hero_slide_4.jpg";
// import beforeAfterImg from "/landing_page_images/before_after.png";

// const heroSlides = [
//   { id: 1, image: slide1, alt: "Gycora Premium Hair Care 1" },
//   { id: 2, image: slide2, alt: "Gycora Premium Hair Care 2" },
//   { id: 3, image: slide3, alt: "Gycora Premium Hair Care 3" },
//   { id: 4, image: slide4, alt: "Gycora Premium Hair Care 4" },
// ];

// const keyBenefits = [
//   {
//     title: "Bantu mengurangi rambut kusut dalam hitungan menit",
//     icon: (
//       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//       </svg>
//     ),
//   },
//   {
//     title: "Mengurangi listrik statis pada rambut",
//     icon: (
//       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
//       </svg>
//     ),
//   },
//   {
//     title: "Praktis dibawa ke mana aja",
//     icon: (
//       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//       </svg>
//     ),
//   },
//   {
//     title: "Cocok untuk berbagai jenis rambut",
//     icon: (
//       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//       </svg>
//     ),
//   },
//   {
//     title: "Nggak perlu effort lebih untuk hasil yang rapi",
//     icon: (
//       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//       </svg>
//     ),
//   },
// ];

// // Data Testimoni Berdasarkan Permintaan (Hardcoded/Dummy)
// const displayReviews = [
//   {
//     id: "f1",
//     name: "Claudiasunshinee",
//     role: "Verified Buyer",
//     image: "/landing_page_images/user_1.jpg", 
//     text: "Sisir nya bagus banget sih sesuai dgn claim nya 🙌🙌 sblmnya aku pakai brand w** krn rambutku rontok.. trs setelah aku compare sm brand Gycora ternyata jauh lbh ga rontok pakai Gycora ❤👍",
//     rating: 5,
//   },
//   {
//     id: "f2",
//     name: "Nilasetiobudii",
//     role: "Verified Buyer",
//     image: "/landing_page_images/user_2.jpg",
//     text: "Sisirnya enak banget terutama buat rambut yg suka kusut Jd lebih gampang pake sisir dari Gycora..",
//     rating: 5,
//   },
//   {
//     id: "f3",
//     name: "Thaliastanley___",
//     role: "Verified Buyer",
//     image: "/landing_page_images/user_3.jpg",
//     text: "Setelah saya pakai hair brush nya rambutku jadi lebih gak kusut dan bikin lebih pede pastinya..",
//     rating: 5,
//   },
//   {
//     id: "f4",
//     name: "Herlenasutanto",
//     role: "Verified Buyer",
//     image: "/landing_page_images/user_4.jpg",
//     text: "Oke kok enak sisir nya lentur ngikutin kepala. ga nyangkut2 hehe",
//     rating: 5,
//   },
//   {
//     id: "f5",
//     name: "Anitaa_bee",
//     role: "Verified Buyer",
//     image: "/landing_page_images/user_5.jpg",
//     text: "Sukaaa poll sma sisirnya... Rambut jd makin teratur pas disisir dan ga gerundel (kusut frizzy) n rambut ku ya uda ga tllu banyak yg rontok. terus sisirnya tu empuk dan nyaman poll di kepala ga sakit.",
//     rating: 5,
//   },
// ];

// export default function Home() {
//   const navigate = useNavigate();
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
//   const [isLoadingProducts, setIsLoadingProducts] = useState(true);
//   const [isPromoMounted, setIsPromoMounted] = useState(false);
//   const [showPromoModal, setShowPromoModal] = useState(false);
//   const [promoEmail, setPromoEmail] = useState("");
//   const [isSubscribing, setIsSubscribing] = useState(false);

//   useEffect(() => {
//     setIsPromoMounted(true);
//     const animTimer = setTimeout(() => {
//       setShowPromoModal(true);
//     }, 50);

//     const fetchFeaturedProducts = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (res.ok) {
//           const data = await res.json();
//           let productsArray = data.data ? data.data : data;

//           productsArray = productsArray.sort((a: any, b: any) => {
//             const nameA = a.name.toLowerCase();
//             const nameB = b.name.toLowerCase();
//             const aIsBrush = nameA.includes("ethereal glow brush");
//             const bIsBrush = nameB.includes("ethereal glow brush");
//             if (aIsBrush && !bIsBrush) return -1;
//             if (!aIsBrush && bIsBrush) return 1;
//             return 0;
//           });

//           setFeaturedProducts(productsArray.slice(0, 3) || []);
//         }
//       } catch (error) {
//         console.error("Gagal memuat produk unggulan:", error);
//       } finally {
//         setIsLoadingProducts(false);
//       }
//     };

//     fetchFeaturedProducts();

//     return () => {
//       clearTimeout(animTimer);
//     };
//   }, []);

//   useEffect(() => {
//     const slideInterval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
//     }, 4000);
//     return () => clearInterval(slideInterval);
//   }, []);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(angka || 0);
//   };

//   const closePromoModal = () => {
//     setShowPromoModal(false);
//     setTimeout(() => {
//       setIsPromoMounted(false);
//     }, 300);
//   };

//   const handleSubscribePromo = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!promoEmail) return;

//     setIsSubscribing(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/promo/claim`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ email: promoEmail }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         closePromoModal();
//         Swal.fire({
//           icon: "success",
//           title: "Kode Promo Terkirim!",
//           text: "Silakan periksa kotak masuk email Anda untuk mendapatkan kode voucher spesial dari Gycora.",
//           confirmButtonColor: "#059669",
//         });
//       } else {
//         Swal.fire({
//           icon: "warning",
//           title: "Pemberitahuan",
//           text: data.message || "Gagal mengklaim promo. Pastikan format email benar.",
//           confirmButtonColor: "#d33",
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         icon: "error",
//         title: "Gagal",
//         text: "Terjadi kesalahan server saat memproses permintaan Anda.",
//         confirmButtonColor: "#d33",
//       });
//     } finally {
//       setIsSubscribing(false);
//     }
//   };

//   return (
//     <div className="relative font-sans bg-white">
//       {/* POP-UP PROMO MODAL */}
//       {isPromoMounted && (
//         <div
//           className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ease-out
//             ${showPromoModal ? "bg-black/60 backdrop-blur-sm opacity-100" : "bg-black/0 backdrop-blur-none opacity-0"}
//           `}
//         >
//           <div
//             className={`relative flex flex-col w-full max-w-3xl overflow-hidden bg-white shadow-2xl md:flex-row rounded-2xl transition-all duration-500 ease-out transform
//               ${showPromoModal ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-8 opacity-0"}
//             `}
//           >
//             <button
//               onClick={closePromoModal}
//               className="absolute z-10 flex items-center justify-center w-8 h-8 text-gray-500 transition-colors bg-white rounded-full shadow-md top-4 right-4 hover:bg-gray-100 hover:text-gray-900"
//             >
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>

//             <div className="flex flex-col justify-center flex-1 p-8 md:p-12">
//               <h2 className="mb-2 font-serif text-4xl font-black tracking-tight text-gray-900 uppercase">Gycora</h2>
//               <h3 className="mb-4 text-3xl font-extrabold leading-tight text-[#006A4E]">
//                 Dapetin Diskon Spesial untuk First Order ✨
//               </h3>
//               <p className="mb-8 text-sm font-medium text-gray-500">Masukkan email kamu & nikmati voucher eksklusif hari ini.</p>

//               <form onSubmit={handleSubscribePromo} className="space-y-4">
//                 <input
//                   type="email"
//                   value={promoEmail}
//                   onChange={(e) => setPromoEmail(e.target.value)}
//                   placeholder="Masukkan Email"
//                   className="w-full px-4 py-3 text-sm transition-all border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#006A4E]"
//                   required
//                 />
//                 <button
//                   type="submit"
//                   disabled={isSubscribing}
//                   className="w-full px-4 py-3 text-sm font-bold tracking-widest text-white uppercase transition-all bg-[#006A4E] rounded-lg hover:bg-emerald-900 disabled:bg-gray-400"
//                 >
//                   {isSubscribing ? "Mengirim..." : "Ambil Voucher"}
//                 </button>
//               </form>
//             </div>

//             <div className="hidden w-full md:block md:w-5/12 bg-emerald-50">
//               <img src="/landing_page_images/promo_popup.jpg" alt="Promo Gycora" className="object-cover w-full h-full" />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* HERO SECTION */}
//       <div className="relative w-full overflow-hidden bg-[#F4F9F6] min-h-[600px] flex items-center">
//         <div className="absolute inset-0 z-0 flex justify-end">
//           <div className="w-full h-full md:w-[60%] relative">
//             {heroSlides.map((slide, index) => (
//               <img
//                 key={slide.id}
//                 src={slide.image}
//                 alt={slide.alt}
//                 className={`absolute inset-0 object-cover object-right-top w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
//               />
//             ))}
//             <div className="absolute inset-0 bg-gradient-to-r from-[#F4F9F6] via-[#F4F9F6]/80 to-transparent w-full md:w-1/2"></div>
//           </div>
//         </div>

//         <button
//           onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
//           className="absolute z-20 flex items-center justify-center w-10 h-10 text-[#006A4E] transition-colors bg-white rounded-full shadow-md left-4 md:left-8 hover:bg-gray-50"
//         >
//           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//         <button
//           onClick={() => setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))}
//           className="absolute z-20 flex items-center justify-center w-10 h-10 text-[#006A4E] transition-colors bg-white rounded-full shadow-md right-4 md:right-8 hover:bg-gray-50"
//         >
//           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
//           </svg>
//         </button>

//         <div className="relative z-10 w-full px-6 mx-auto max-w-[1236px] sm:px-10 lg:px-16 animate-fade-in-up">
//           <div className="max-w-xl">
//             <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl text-[#006A4E]">
//               Solusi Cepat untuk <br /> Rambut Lebih Rapi
//             </h1>
//             <h2 className="mt-4 text-xl font-bold text-gray-900 sm:text-2xl">Tanpa Ribet, Tanpa Nunggu Lama.</h2>
//             <p className="mt-4 text-base leading-relaxed text-gray-500 sm:text-lg">
//               Nggak semua orang punya waktu buat styling setiap hari. Tapi kamu tetap bisa tampil lebih rapi dalam hitungan menit
//               dengan produk pilihan dari Gycora.
//             </p>

//             <div className="flex flex-col gap-4 mt-8 sm:flex-row">
//               <Link
//                 to="/products"
//                 className="px-8 py-3.5 text-sm font-bold tracking-wider text-center text-white uppercase transition-colors rounded-full shadow-lg bg-[#006A4E] hover:bg-emerald-900"
//               >
//                 Shop Now
//               </Link>
//               <a
//                 href="#featured"
//                 className="px-8 py-3.5 text-sm font-bold tracking-wider text-center uppercase transition-colors bg-transparent border-2 rounded-full border-[#006A4E] text-[#006A4E] hover:bg-[#006A4E] hover:text-white"
//               >
//                 Lihat Produk
//               </a>
//             </div>

//             <div className="flex items-center gap-8 mt-10">
//               <div className="flex items-center gap-2">
//                 <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                 </svg>
//                 <span className="text-xs font-bold leading-tight text-gray-500">
//                   Teknologi
//                   <br />
//                   Anti Statis
//                 </span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={1.5}
//                     d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
//                   />
//                 </svg>
//                 <span className="text-xs font-bold leading-tight text-gray-500">
//                   Material
//                   <br />
//                   Premium
//                 </span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={1.5}
//                     d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//                 <span className="text-xs font-bold leading-tight text-gray-500">
//                   Eco
//                   <br />
//                   Friendly
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* FEATURED PRODUCT SECTION */}
//       <div id="featured" className="py-24 bg-[#F9FDFB]">
//         <div className="px-6 mx-auto max-w-[1536px] sm:px-10 lg:px-16">
//           <div className="flex flex-col items-end justify-between mb-10 md:flex-row">
//             <div className="w-full md:w-1/2">
//               <h2 className="text-2xl font-extrabold sm:text-3xl text-[#006A4E]">Produk Favorit Pilihan Banyak Orang</h2>
//               <p className="mt-2 text-sm text-gray-500 sm:text-base">
//                 Temukan produk best seller yang jadi andalan untuk rambut lebih rapi, halus, dan mudah diatur setiap hari.
//               </p>
//             </div>
//             <Link
//               to="/products"
//               className="flex items-center gap-2 mt-4 font-bold text-gray-600 transition-colors md:mt-0 hover:text-[#006A4E]"
//             >
//               Lihat Semua Produk
//               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//               </svg>
//             </Link>
//           </div>

//           {isLoadingProducts ? (
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="flex flex-row p-4 bg-white border border-gray-100 shadow-sm rounded-3xl animate-pulse">
//                   <div className="w-2/5 bg-gray-200 rounded-2xl h-36"></div>
//                   <div className="w-3/5 pl-4 space-y-3">
//                     <div className="w-full h-4 bg-gray-200 rounded"></div>
//                     <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
//                     <div className="w-1/2 h-5 mt-4 bg-gray-200 rounded"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : featuredProducts.length > 0 ? (
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {featuredProducts.map((product) => {
//                 let customDesc = product.description;
//                 if (product.name.toLowerCase().includes("brush")) {
//                   customDesc = "Sisir premium dengan teknologi anti-static yang bantu rambut lebih halus, rapi, dan berkilau dalam sekali sisir.";
//                 }

//                 return (
//                   <div
//                     key={product.id}
//                     className="relative flex flex-row p-4 transition-all duration-300 bg-white border border-gray-100 shadow-sm cursor-pointer rounded-3xl hover:shadow-lg hover:-translate-y-1"
//                     onClick={() => navigate(`/product/${product.id}`)}
//                   >
//                     <button className="absolute z-10 text-gray-300 top-4 right-4 hover:text-red-500">
//                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={1.5}
//                           d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                         />
//                       </svg>
//                     </button>

//                     <div className="flex items-center justify-center w-2/5 shrink-0">
//                       <img src={product.image_url} alt={product.name} className="object-contain w-full h-32 md:h-40 drop-shadow-sm" />
//                     </div>

//                     <div className="flex flex-col justify-center w-3/5 pl-4 pr-2">
//                       <h3 className="text-sm font-extrabold leading-tight text-[#006A4E] line-clamp-2">{product.name}</h3>
//                       <p className="mt-1 leading-relaxed text-gray-500 text-md line-clamp-3">{customDesc}</p>
//                       <div className="mt-3">
//                         {product.discount_price && product.discount_price > 0 ? (
//                           <>
//                             <span className="block text-[10px] font-medium text-gray-400 line-through">{formatRupiah(product.price)}</span>
//                             <span className="block text-lg font-black leading-none text-rose-500">{formatRupiah(product.discount_price)}</span>
//                           </>
//                         ) : (
//                           <span className="block text-lg font-black leading-none text-[#006A4E]">{formatRupiah(product.price)}</span>
//                         )}
//                       </div>
//                       <button className="px-4 py-1.5 mt-4 text-[10px] font-bold tracking-widest uppercase transition-colors bg-white border border-[#006A4E] rounded-full text-[#006A4E] hover:bg-[#006A4E] hover:text-white w-max">
//                         Shop Now
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           ) : (
//             <div className="py-12 italic text-center text-gray-500">Belum ada produk yang tersedia.</div>
//           )}
//         </div>
//       </div>

//       {/* RELATABLE PROBLEM & SOLUTION SECTION */}
//       <div className="py-24 bg-white border-gray-100 border-y">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col gap-16 lg:flex-row lg:items-center">
//             <div className="flex-1 space-y-6">
//               <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Pernah Ngerasa Kayak Gini?</h2>
//               <ul className="space-y-4 text-lg text-gray-600">
//                 <li className="flex items-start gap-3">
//                   <span className="mt-1 text-red-500">✕</span>
//                   <span>Rambut tiba-tiba kusut di momen penting</span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <span className="mt-1 text-red-500">✕</span>
//                   <span>Udah rapi dari rumah, tapi berantakan di jalan</span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <span className="mt-1 text-red-500">✕</span>
//                   <span>Habis pakai helm, kena angin, atau aktivitas seharian</span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <span className="mt-1 text-red-500">✕</span>
//                   <span>Nggak punya banyak waktu buat styling ulang</span>
//                 </li>
//               </ul>
//               <p className="pt-4 font-medium text-gray-900 text-md">Padahal kamu cuma butuh cara cepat buat balik rapi lagi.</p>
//             </div>

//             <div className="flex-1 p-8 bg-white border border-gray-100 shadow-xl rounded-3xl lg:p-12">
//               <div className="inline-flex items-center px-4 py-1.5 mb-6 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase">
//                 The Solution
//               </div>
//               <h3 className="mb-6 text-2xl font-extrabold text-gray-900 sm:text-3xl">Nggak Perlu Ribet Buat Tampil Rapi</h3>
//               <p className="mb-6 text-lg leading-relaxed text-gray-500">
//                 Kenalin, <strong>Ethereal Glow Brush</strong> — sisir dengan teknologi anti-static yang bantu rambut lebih halus, rapi,
//                 dan mudah diatur hanya dalam beberapa menit.
//               </p>
//               <p className="mb-8 text-lg leading-relaxed text-gray-500">Cukup sisir seperti biasa, tanpa teknik khusus. Hasilnya langsung terasa.</p>
//               <Link
//                 to="/products"
//                 className="inline-block px-8 py-4 text-base font-bold text-white transition-all bg-[#006A4E] rounded-full shadow-lg hover:bg-emerald-900 hover:shadow-xl hover:-translate-y-0.5"
//               >
//                 Explore Product
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* REAL RESULTS (BEFORE - AFTER) */}
//       <div className="py-24 border-gray-100 bg-[#F4F9F6] border-b">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-16 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Hasil Nyata Tanpa Filter</h2>
//             <p className="mt-4 text-gray-500">Perbedaan nyata sebelum dan sesudah menggunakan Gycora.</p>
//           </div>

//           <div className="relative flex flex-col max-w-4xl mx-auto overflow-hidden bg-white border border-gray-200 shadow-xl group rounded-3xl">
//             <img
//               src={beforeAfterImg}
//               alt="Before After Hair Treatment"
//               className="object-cover w-full h-auto transition-transform duration-1000 group-hover:scale-105"
//             />
//           </div>
//         </div>
//       </div>

//       {/* KEY BENEFITS */}
//       <div className="py-24 bg-white border-b border-gray-100">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-16 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Kenapa Banyak yang Pilih Gycora?</h2>
//           </div>
//           <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 lg:grid-cols-5">
//             {keyBenefits.map((benefit, idx) => (
//               <div
//                 key={idx}
//                 className="p-8 transition-colors border border-transparent shadow-sm bg-gray-50 rounded-3xl hover:border-emerald-100 hover:shadow-md"
//               >
//                 <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-100 text-[#006A4E]">
//                   {benefit.icon}
//                 </div>
//                 <p className="text-sm font-bold leading-relaxed text-gray-800">{benefit.title}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* SOCIAL PROOF */}
//       <div className="py-24 bg-white border-b border-gray-100">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="max-w-2xl mx-auto mb-16 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Bukan Cuma Kata Kami, Tapi Mereka yang Sudah Coba</h2>
//             <p className="mt-4 text-gray-500">Ribuan pengguna Gycora sudah merasakan perubahan nyata dalam rutinitas mereka.</p>
//           </div>

//           {/* Dihilangkan state loading, langsung render displayReviews (data static dummy) */}
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {displayReviews.map((review) => (
//               <div
//                 key={review.id}
//                 className="relative flex flex-col p-8 transition-shadow border border-gray-100 bg-gray-50 rounded-3xl hover:shadow-md"
//               >
//                 <div className="flex gap-1 mb-4 text-amber-400">
//                   {[...Array(review.rating)].map((_, i) => (
//                     <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                   ))}
//                 </div>

//                 <p className="flex-1 mb-6 text-sm italic leading-relaxed text-gray-600 line-clamp-4">
//                   "{review.text}"
//                 </p>

//                 <div className="flex items-center gap-3 pt-6 mt-auto border-t border-gray-200">
//                   <img
//                     src={
//                       review.image ||
//                       `https://ui-avatars.com/api/?name=${review.name}&background=059669&color=fff`
//                     }
//                     alt={review.name}
//                     className="object-cover w-10 h-10 rounded-full bg-emerald-100"
//                     onError={(e) => {
//                        // Jika file tidak ada di storage, buatkan avatar otomatis.
//                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${review.name}&background=059669&color=fff`;
//                     }}
//                   />
//                   <div className="flex-1 min-w-0">
//                     <h4 className="text-sm font-bold text-gray-900 truncate">
//                       {review.name}
//                     </h4>
//                     <p className="text-xs tracking-widest text-gray-500 uppercase">{review.role}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* OFFER SECTION */}
//       {/* CTA SECTION (CLOSING) */}
//       <div className="relative py-24 overflow-hidden bg-gray-900">
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gycora rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

//         <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-extrabold text-white sm:text-5xl">Nggak Perlu Ribet Buat Tampil Rapi</h2>
//           <p className="mt-6 mb-10 text-lg leading-relaxed text-gray-400">
//             Mulai dari langkah kecil yang bikin perbedaan besar di penampilan kamu.
//             <br />
//             Dengan Gycora, rambut rapi bukan lagi hal yang butuh effort lebih.
//           </p>
//           <button
//             onClick={() => navigate("/products")}
//             className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5"
//           >
//             Shop Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/api";
import Swal from "sweetalert2";

// --- IMPORT GAMBAR DARI LOKAL UNTUK SLIDER & ASET ---
import slide1 from "/landing_page_images/hero_slide_1.jpg";
import slide2 from "/landing_page_images/hero_slide_2.jpg";
import slide3 from "/landing_page_images/hero_slide_3.jpg";
import slide4 from "/landing_page_images/hero_slide_4.jpg";
import beforeAfterImg from "/landing_page_images/before_after.png";

const heroSlides = [
  { id: 1, image: slide1, alt: "Gycora Premium Hair Care 1" },
  { id: 2, image: slide2, alt: "Gycora Premium Hair Care 2" },
  { id: 3, image: slide3, alt: "Gycora Premium Hair Care 3" },
  { id: 4, image: slide4, alt: "Gycora Premium Hair Care 4" },
];

const keyBenefits = [
  {
    title: "Bantu mengurangi rambut kusut dalam hitungan menit",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Mengurangi listrik statis pada rambut",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Praktis dibawa ke mana aja",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  {
    title: "Cocok untuk berbagai jenis rambut",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: "Nggak perlu effort lebih untuk hasil yang rapi",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
];

const displayReviews = [
  {
    id: "f1",
    name: "Claudiasunshinee",
    role: "Verified Buyer",
    image: "/landing_page_images/user_1.jpg", 
    text: "Sisir nya bagus banget sih sesuai dgn claim nya 🙌🙌 sblmnya aku pakai brand w** krn rambutku rontok.. trs setelah aku compare sm brand Gycora ternyata jauh lbh ga rontok pakai Gycora ❤👍",
    rating: 5,
  },
  {
    id: "f2",
    name: "Nilasetiobudii",
    role: "Verified Buyer",
    image: "/landing_page_images/user_2.jpg",
    text: "Sisirnya enak banget terutama buat rambut yg suka kusut Jd lebih gampang pake sisir dari Gycora..",
    rating: 5,
  },
  {
    id: "f3",
    name: "Thaliastanley___",
    role: "Verified Buyer",
    image: "/landing_page_images/user_3.jpg",
    text: "Setelah saya pakai hair brush nya rambutku jadi lebih gak kusut dan bikin lebih pede pastinya..",
    rating: 5,
  },
  {
    id: "f4",
    name: "Herlenasutanto",
    role: "Verified Buyer",
    image: "/landing_page_images/user_4.jpg",
    text: "Oke kok enak sisir nya lentur ngikutin kepala. ga nyangkut2 hehe",
    rating: 5,
  },
  {
    id: "f5",
    name: "Anitaa_bee",
    role: "Verified Buyer",
    image: "/landing_page_images/user_5.jpg",
    text: "Sukaaa poll sma sisirnya... Rambut jd makin teratur pas disisir dan ga gerundel (kusut frizzy) n rambut ku ya uda ga tllu banyak yg rontok. terus sisirnya tu empuk dan nyaman poll di kepala ga sakit.",
    rating: 5,
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isPromoMounted, setIsPromoMounted] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [promoEmail, setPromoEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  useEffect(() => {
    setIsPromoMounted(true);
    const animTimer = setTimeout(() => {
      setShowPromoModal(true);
    }, 50);

    const fetchFeaturedProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products`);
        if (res.ok) {
          const data = await res.json();
          let productsArray = data.data ? data.data : data;

          productsArray = productsArray.sort((a: any, b: any) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            const aIsBrush = nameA.includes("ethereal glow brush");
            const bIsBrush = nameB.includes("ethereal glow brush");
            if (aIsBrush && !bIsBrush) return -1;
            if (!aIsBrush && bIsBrush) return 1;
            return 0;
          });

          setFeaturedProducts(productsArray.slice(0, 3) || []);
        }
      } catch (error) {
        console.error("Gagal memuat produk unggulan:", error);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchFeaturedProducts();

    return () => {
      clearTimeout(animTimer);
    };
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(slideInterval);
  }, []);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka || 0);
  };

  const closePromoModal = () => {
    setShowPromoModal(false);
    setTimeout(() => {
      setIsPromoMounted(false);
    }, 300);
  };

  const handleSubscribePromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoEmail) return;

    setIsSubscribing(true);
    try {
      const res = await fetch(`${BASE_URL}/api/promo/claim`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: promoEmail }),
      });

      const data = await res.json();

      if (res.ok) {
        closePromoModal();
        Swal.fire({
          icon: "success",
          title: "Kode Promo Terkirim!",
          text: "Silakan periksa kotak masuk email Anda untuk mendapatkan kode voucher spesial dari Gycora.",
          confirmButtonColor: "#059669",
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Pemberitahuan",
          text: data.message || "Gagal mengklaim promo. Pastikan format email benar.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan server saat memproses permintaan Anda.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="relative font-sans bg-white">
      {/* POP-UP PROMO MODAL */}
      {isPromoMounted && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ease-out
            ${showPromoModal ? "bg-black/60 backdrop-blur-sm opacity-100" : "bg-black/0 backdrop-blur-none opacity-0"}
          `}
        >
          <div
            className={`relative flex flex-col w-full max-w-3xl overflow-hidden bg-white shadow-2xl md:flex-row rounded-2xl transition-all duration-500 ease-out transform
              ${showPromoModal ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-8 opacity-0"}
            `}
          >
            <button
              onClick={closePromoModal}
              className="absolute z-10 flex items-center justify-center w-8 h-8 text-gray-500 transition-colors bg-white rounded-full shadow-md top-4 right-4 hover:bg-gray-100 hover:text-gray-900"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col justify-center flex-1 p-8 md:p-12">
              <h2 className="mb-2 font-serif text-4xl font-black tracking-tight text-gray-900 uppercase">Gycora</h2>
              <h3 className="mb-4 text-3xl font-extrabold leading-tight text-[#006A4E]">
                Dapetin Diskon Spesial untuk First Order ✨
              </h3>
              <p className="mb-8 text-sm font-medium text-gray-500">Masukkan email kamu & nikmati voucher eksklusif hari ini.</p>

              <form onSubmit={handleSubscribePromo} className="space-y-4">
                <input
                  type="email"
                  value={promoEmail}
                  onChange={(e) => setPromoEmail(e.target.value)}
                  placeholder="Masukkan Email"
                  className="w-full px-4 py-3 text-sm transition-all border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#006A4E]"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="w-full px-4 py-3 text-sm font-bold tracking-widest text-white uppercase transition-all bg-[#006A4E] rounded-lg hover:bg-emerald-900 disabled:bg-gray-400"
                >
                  {isSubscribing ? "Mengirim..." : "Ambil Voucher"}
                </button>
              </form>
            </div>

            <div className="hidden w-full md:block md:w-5/12 bg-emerald-50">
              <img src="/landing_page_images/promo_popup.jpg" alt="Promo Gycora" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          HERO SECTION (RESPONSIVE HALF-WIDTH MOBILE)
      ========================================= */}
      {/* <div className="relative w-full overflow-hidden bg-[#F4F9F6] min-h-[450px] md:min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0 flex justify-end">
          <div className="w-[65%] md:w-[60%] h-full relative translate-x-6 md:translate-x-0">
            {heroSlides.map((slide, index) => (
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.alt}
                className={`absolute inset-0 object-cover object-right-top w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-[#F4F9F6] via-[#F4F9F6]/90 to-transparent w-full sm:w-1/2"></div>
          </div>
        </div>

        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
          className="absolute z-20 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 text-[#006A4E] transition-colors bg-white rounded-full shadow-md left-2 md:left-8 hover:bg-gray-50"
        >
          <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))}
          className="absolute z-20 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 text-[#006A4E] transition-colors bg-white rounded-full shadow-md right-2 md:right-8 hover:bg-gray-50"
        >
          <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="relative z-10 w-full px-4 mx-auto max-w-[1236px] sm:px-10 lg:px-16 animate-fade-in-up">
          <div className="w-[60%] sm:w-[60%] md:max-w-xl">
            <h1 className="text-2xl font-extrabold leading-tight sm:text-4xl md:text-5xl lg:text-6xl text-[#006A4E]">
              Solusi Cepat untuk <br /> Rambut Lebih Rapi
            </h1>
            <h2 className="mt-2 text-sm font-bold text-gray-900 md:mt-4 sm:text-xl md:text-2xl">
              Tanpa Ribet, Tanpa Nunggu Lama.
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-gray-500 md:mt-4 sm:text-sm md:text-lg">
              Nggak semua orang punya waktu buat styling setiap hari. Tapi kamu tetap bisa tampil lebih rapi dalam hitungan menit dengan produk pilihan dari Gycora.
            </p>

            <div className="flex flex-col gap-2 mt-4 sm:flex-row md:gap-4 md:mt-8">
              <Link
                to="/products"
                className="px-4 py-2 md:px-8 md:py-3.5 text-[10px] md:text-sm font-bold tracking-wider text-center text-white uppercase transition-colors rounded-full shadow-lg bg-[#006A4E] hover:bg-emerald-900"
              >
                Shop Now
              </Link>
              <a
                href="#featured"
                className="px-4 py-2 md:px-8 md:py-3.5 text-[10px] md:text-sm font-bold tracking-wider text-center uppercase transition-colors bg-transparent border-2 rounded-full border-[#006A4E] text-[#006A4E] hover:bg-[#006A4E] hover:text-white"
              >
                Lihat Produk
              </a>
            </div>

            <div className="flex flex-col items-start gap-3 mt-6 sm:flex-row sm:items-center md:gap-8 md:mt-10">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-600 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-[9px] md:text-xs font-bold leading-tight text-gray-500">
                  Teknologi<br className="hidden sm:block" /> Anti Statis
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-600 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                <span className="text-[9px] md:text-xs font-bold leading-tight text-gray-500">
                  Material<br className="hidden sm:block" /> Premium
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-600 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-[9px] md:text-xs font-bold leading-tight text-gray-500">
                  Eco<br className="hidden sm:block" /> Friendly
                </span>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* =========================================
          HERO SECTION (STACKED ON MOBILE, SIDE-BY-SIDE ON DESKTOP)
      ========================================= */}
      <div className="relative w-full overflow-hidden bg-[#F4F9F6] flex flex-col md:block md:min-h-[600px]">
        
        {/* GAMBAR SLIDER (Di atas pada mobile, absolute di kanan pada desktop) */}
        <div className="relative w-full h-[350px] sm:h-[450px] md:absolute md:inset-0 md:h-full md:z-0 md:flex md:justify-end shrink-0">
          <div className="w-full h-full md:w-[60%] relative">
            {heroSlides.map((slide, index) => (
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.alt}
                className={`absolute inset-0 object-cover object-center md:object-right-top w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            {/* Overlay Gradient: 
                Mobile: Gradasi ringan dari bawah ke atas agar menyatu lembut dengan area teks.
                Desktop: Gradasi dari kiri ke kanan agar teks bisa terbaca jelas.
            */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#F4F9F6] via-[#F4F9F6]/20 to-transparent md:bg-gradient-to-r md:from-[#F4F9F6] md:via-[#F4F9F6]/90 md:to-transparent md:w-1/2"></div>
          </div>

          {/* Panah Navigasi */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
            className="absolute z-20 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 text-[#006A4E] transition-colors bg-white rounded-full shadow-md left-4 md:left-8 top-1/2 -translate-y-1/2 hover:bg-gray-50 focus:outline-none"
          >
            <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))}
            className="absolute z-20 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 text-[#006A4E] transition-colors bg-white rounded-full shadow-md right-4 md:right-8 top-1/2 -translate-y-1/2 hover:bg-gray-50 focus:outline-none"
          >
            <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* KONTEN TEKS (Di bawah gambar pada mobile, di kiri pada desktop) */}
        <div className="relative z-10 w-full px-6 pt-6 pb-12 mx-auto max-w-[1236px] sm:px-10 lg:px-16 animate-fade-in-up flex items-center md:min-h-[600px]">
          {/* Teks di-center pada mobile agar terlihat seimbang dengan gambar di atasnya */}
          <div className="w-full text-center md:max-w-xl md:text-left">
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl lg:text-6xl text-[#006A4E]">
              Solusi Cepat untuk <br className="hidden md:block"/> Rambut Lebih Rapi
            </h1>
            <h2 className="mt-3 text-base font-bold text-gray-900 md:mt-4 sm:text-xl md:text-2xl">
              Tanpa Ribet, Tanpa Nunggu Lama.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-500 md:mt-4 md:text-lg">
              Nggak semua orang punya waktu buat styling setiap hari. Tapi kamu tetap bisa tampil lebih rapi dalam hitungan menit dengan produk pilihan dari Gycora.
            </p>

            {/* Tombol Action */}
            <div className="flex flex-col justify-center gap-3 mt-6 sm:flex-row md:justify-start md:gap-4 md:mt-8">
              <Link
                to="/products"
                className="px-6 py-3 md:px-8 md:py-3.5 text-xs md:text-sm font-bold tracking-wider text-center text-white uppercase transition-colors rounded-full shadow-lg bg-[#006A4E] hover:bg-emerald-900"
              >
                Shop Now
              </Link>
              <a
                href="#featured"
                className="px-6 py-3 md:px-8 md:py-3.5 text-xs md:text-sm font-bold tracking-wider text-center uppercase transition-colors bg-transparent border-2 rounded-full border-[#006A4E] text-[#006A4E] hover:bg-[#006A4E] hover:text-white"
              >
                Lihat Produk
              </a>
            </div>

            {/* Ikon Benefits Bawah */}
            <div className="flex flex-wrap justify-center gap-4 mt-8 md:justify-start md:gap-8 md:mt-10">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-gray-600 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-[10px] md:text-xs font-bold leading-tight text-left text-gray-500">
                  Teknologi<br className="hidden sm:block" /> Anti Statis
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-gray-600 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span className="text-[10px] md:text-xs font-bold leading-tight text-left text-gray-500">
                  Material<br className="hidden sm:block" /> Premium
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-gray-600 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[10px] md:text-xs font-bold leading-tight text-left text-gray-500">
                  Eco<br className="hidden sm:block" /> Friendly
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED PRODUCT SECTION */}
      <div id="featured" className="py-24 bg-[#F9FDFB]">
        <div className="px-6 mx-auto max-w-[1536px] sm:px-10 lg:px-16">
          <div className="flex flex-col items-end justify-between mb-10 md:flex-row">
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-extrabold sm:text-3xl text-[#006A4E] text-center">Produk Favorit Pilihan Banyak Orang</h2>
              <p className="mt-2 text-sm text-gray-500 sm:text-base">
                Temukan produk best seller yang jadi andalan untuk rambut lebih rapi, halus, dan mudah diatur setiap hari.
              </p>
            </div>
            <Link
              to="/products"
              className="flex items-center gap-2 mt-4 font-bold text-gray-600 transition-colors md:mt-0 hover:text-[#006A4E]"
            >
              Lihat Semua Produk
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {isLoadingProducts ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-row p-4 bg-white border border-gray-100 shadow-sm rounded-3xl animate-pulse">
                  <div className="w-2/5 bg-gray-200 rounded-2xl h-36"></div>
                  <div className="w-3/5 pl-4 space-y-3">
                    <div className="w-full h-4 bg-gray-200 rounded"></div>
                    <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
                    <div className="w-1/2 h-5 mt-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product) => {
                let customDesc = product.description;
                if (product.name.toLowerCase().includes("brush")) {
                  customDesc = "Sisir premium dengan teknologi anti-static yang bantu rambut lebih halus, rapi, dan berkilau dalam sekali sisir.";
                }

                return (
                  <div
                    key={product.id}
                    className="relative flex flex-row p-4 transition-all duration-300 bg-white border border-gray-100 shadow-sm cursor-pointer rounded-3xl hover:shadow-lg hover:-translate-y-1"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <button className="absolute z-10 text-gray-300 top-4 right-4 hover:text-red-500">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>

                    <div className="flex items-center justify-center w-2/5 shrink-0">
                      <img src={product.image_url} alt={product.name} className="object-contain w-full h-32 md:h-40 drop-shadow-sm" />
                    </div>

                    <div className="flex flex-col justify-center w-3/5 pl-4 pr-2">
                      <h3 className="text-sm font-extrabold leading-tight text-[#006A4E] line-clamp-2">{product.name}</h3>
                      <p className="mt-1 leading-relaxed text-gray-500 text-md line-clamp-3">{customDesc}</p>
                      <div className="mt-3">
                        {product.discount_price && product.discount_price > 0 ? (
                          <>
                            <span className="block text-[10px] font-medium text-gray-400 line-through">{formatRupiah(product.price)}</span>
                            <span className="block text-lg font-black leading-none text-rose-500">{formatRupiah(product.discount_price)}</span>
                          </>
                        ) : (
                          <span className="block text-lg font-black leading-none text-[#006A4E]">{formatRupiah(product.price)}</span>
                        )}
                      </div>
                      <button className="px-4 py-1.5 mt-4 text-[10px] font-bold tracking-widest uppercase transition-colors bg-white border border-[#006A4E] rounded-full text-[#006A4E] hover:bg-[#006A4E] hover:text-white w-max">
                        Shop Now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 italic text-center text-gray-500">Belum ada produk yang tersedia.</div>
          )}
        </div>
      </div>

      {/* RELATABLE PROBLEM & SOLUTION SECTION */}
      <div className="py-24 bg-white border-gray-100 border-y">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col gap-16 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Pernah Ngerasa Kayak Gini?</h2>
              <ul className="space-y-4 text-lg text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-red-500">✕</span>
                  <span>Rambut tiba-tiba kusut di momen penting</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-red-500">✕</span>
                  <span>Udah rapi dari rumah, tapi berantakan di jalan</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-red-500">✕</span>
                  <span>Habis pakai helm, kena angin, atau aktivitas seharian</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-red-500">✕</span>
                  <span>Nggak punya banyak waktu buat styling ulang</span>
                </li>
              </ul>
              <p className="pt-4 font-medium text-gray-900 text-md">Padahal kamu cuma butuh cara cepat buat balik rapi lagi.</p>
            </div>

            <div className="flex-1 p-8 bg-white border border-gray-100 shadow-xl rounded-3xl lg:p-12">
              <div className="inline-flex items-center px-4 py-1.5 mb-6 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase">
                The Solution
              </div>
              <h3 className="mb-6 text-2xl font-extrabold text-gray-900 sm:text-3xl">Nggak Perlu Ribet Buat Tampil Rapi</h3>
              <p className="mb-6 text-lg leading-relaxed text-gray-500">
                Kenalin, <strong>Ethereal Glow Brush</strong> — sisir dengan teknologi anti-static yang bantu rambut lebih halus, rapi,
                dan mudah diatur hanya dalam beberapa menit.
              </p>
              <p className="mb-8 text-lg leading-relaxed text-gray-500">Cukup sisir seperti biasa, tanpa teknik khusus. Hasilnya langsung terasa.</p>
              <Link
                to="/products"
                className="inline-block px-8 py-4 text-base font-bold text-white transition-all bg-[#006A4E] rounded-full shadow-lg hover:bg-emerald-900 hover:shadow-xl hover:-translate-y-0.5"
              >
                Explore Product
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* REAL RESULTS (BEFORE - AFTER) */}
      <div className="py-24 border-gray-100 bg-[#F4F9F6] border-b">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Hasil Nyata Tanpa Filter</h2>
            <p className="mt-4 text-gray-500">Perbedaan nyata sebelum dan sesudah menggunakan Gycora.</p>
          </div>

          <div className="relative flex flex-col max-w-4xl mx-auto overflow-hidden bg-white border border-gray-200 shadow-xl group rounded-3xl">
            <img
              src={beforeAfterImg}
              alt="Before After Hair Treatment"
              className="object-cover w-full h-auto transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* KEY BENEFITS */}
      <div className="py-24 bg-white border-b border-gray-100">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Kenapa Banyak yang Pilih Gycora?</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 lg:grid-cols-5">
            {keyBenefits.map((benefit, idx) => (
              <div
                key={idx}
                className="p-8 transition-colors border border-transparent shadow-sm bg-gray-50 rounded-3xl hover:border-emerald-100 hover:shadow-md"
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-100 text-[#006A4E]">
                  {benefit.icon}
                </div>
                <p className="text-sm font-bold leading-relaxed text-gray-800">{benefit.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SOCIAL PROOF */}
      <div className="py-24 bg-white border-b border-gray-100">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Bukan Cuma Kata Kami, Tapi Mereka yang Sudah Coba</h2>
            <p className="mt-4 text-gray-500">Ribuan pengguna Gycora sudah merasakan perubahan nyata dalam rutinitas mereka.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayReviews.map((review) => (
              <div
                key={review.id}
                className="relative flex flex-col p-8 transition-shadow border border-gray-100 bg-gray-50 rounded-3xl hover:shadow-md"
              >
                <div className="flex gap-1 mb-4 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="flex-1 mb-6 text-sm italic leading-relaxed text-gray-600 line-clamp-4">
                  "{review.text}"
                </p>

                <div className="flex items-center gap-3 pt-6 mt-auto border-t border-gray-200">
                  <img
                    src={
                      review.image ||
                      `https://ui-avatars.com/api/?name=${review.name}&background=059669&color=fff`
                    }
                    alt={review.name}
                    className="object-cover w-10 h-10 rounded-full bg-emerald-100"
                    onError={(e) => {
                       e.currentTarget.src = `https://ui-avatars.com/api/?name=${review.name}&background=059669&color=fff`;
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 truncate">
                      {review.name}
                    </h4>
                    <p className="text-xs tracking-widest text-gray-500 uppercase">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA SECTION (CLOSING) */}
      <div className="relative py-24 overflow-hidden bg-gray-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gycora rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

        <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-5xl">Nggak Perlu Ribet Buat Tampil Rapi</h2>
          <p className="mt-6 mb-10 text-lg leading-relaxed text-gray-400">
            Mulai dari langkah kecil yang bikin perbedaan besar di penampilan kamu.
            <br />
            Dengan Gycora, rambut rapi bukan lagi hal yang butuh effort lebih.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}