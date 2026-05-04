/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState, useEffect } from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import Swal from "sweetalert2";

// interface Product {
//   id: number;
//   category: { name: string };
//   sku: string;
//   name: string;
//   slug: string;
//   description: string;
//   benefits: string;
//   price: number;
//   stock: number;
//   image_url: string;
// }

// export default function AdminProductDetail() {
//   const navigate = useNavigate(); 
//   const { id } = useParams<{ id: string }>();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProductDetail = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products/${id}`);
//         if (!res.ok) throw new Error("Produk tidak ditemukan");
        
//         const data = await res.json();
//         // PERBAIKAN: Tangani bungkus data dengan benar
//         const responseData = data.data ? data.data : data;
//         setProduct(responseData);
//       } catch (error) {
//         console.error("Detail produk error:", error);
//         Swal.fire('Error!', 'Gagal memuat detail produk.', 'error');
//         navigate("/admin/products"); 
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchProductDetail();
//   }, [id, navigate]);

//   const handleDelete = async () => {
//     const result = await Swal.fire({
//       title: 'Yakin menghapus produk ini?',
//       text: "Data yang dihapus tidak dapat dikembalikan!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Ya, hapus!',
//       cancelButtonText: 'Batal'
//     });

//     if (result.isConfirmed) {
//       try {
//         const token = localStorage.getItem("admin_token");
//         const res = await fetch(`${BASE_URL}/api/products/${id}`, { 
//             method: "DELETE",
//             headers: { "Authorization": `Bearer ${token}` }
//         });
//         if (res.ok) {
//           await Swal.fire('Terhapus!', 'Produk telah dihapus.', 'success');
//           navigate("/admin/products"); 
//         } else {
//           throw new Error("Gagal menghapus data");
//         }
//       } catch (error) {
//         console.error("Gagal hapus produk:", error); 
//         Swal.fire('Error!', 'Gagal menghapus produk.', 'error');
//       }
//     }
//   };

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0,
//     }).format(angka);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-[calc(100vh-4rem)] font-sans">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   }

//   if (!product) return null;

//   return (
//     <div className="max-w-5xl p-8 mx-auto space-y-6 font-sans">
      
//       {/* Top Navigation & Actions */}
//       <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
//         <div className="flex items-center gap-4">
//           <button 
//             onClick={() => navigate("/admin/products")}
//             className="p-2 text-gray-400 transition-colors border border-gray-200 rounded-lg hover:text-gray-900 hover:bg-white bg-gray-50"
//             title="Kembali"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
//           </button>
//           <h1 className="text-2xl font-bold text-gray-900">Detail Produk</h1>
//         </div>

//         <div className="flex gap-3">
//           <Link 
//             to={`/admin/products/${product.id}/edit`} 
//             className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
//             Edit Produk
//           </Link>
//           <button 
//             onClick={handleDelete}
//             className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 transition-colors rounded-lg bg-red-50 hover:bg-red-100"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
//             Hapus
//           </button>
//         </div>
//       </div>

//       {/* Main Content Card */}
//       <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
//         <div className="grid grid-cols-1 lg:grid-cols-3">
          
//           {/* Left Column: Image Area */}
//           <div className="bg-gray-50 border-r border-gray-100 p-8 flex flex-col items-center justify-center min-h-[300px]">
//             {product.image_url ? (
//               <img 
//                 src={product.image_url} 
//                 alt={product.name} 
//                 className="object-cover h-auto max-w-full shadow-sm rounded-xl"
//               />
//             ) : (
//               <div className="flex flex-col items-center space-y-3 text-gray-400">
//                 <svg className="w-16 h-16 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
//                 <span className="text-sm font-medium">Belum ada gambar</span>
//               </div>
//             )}
//           </div>

//           {/* Right Column: Product Details */}
//           <div className="p-8 space-y-8 lg:col-span-2">
            
//             {/* Header Info */}
//             <div className="space-y-2">
//               <div className="flex items-center gap-3">
//                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gycora-light text-gycora-dark">
//                   {product.category?.name || "Uncategorized"}
//                 </span>
//                 <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
//                   SKU: {product.sku}
//                 </span>
//               </div>
//               <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h2>
//               <p className="text-sm text-gray-400">Slug: <span className="font-mono text-gray-500">{product.slug}</span></p>
//             </div>

//             {/* Price & Stock Stats */}
//             <div className="grid grid-cols-2 gap-6 p-6 border border-gray-100 bg-gray-50 rounded-xl">
//               <div>
//                 <p className="mb-1 text-sm font-medium text-gray-500">Harga Jual</p>
//                 <p className="text-2xl font-bold text-gycora">{formatRupiah(product.price)}</p>
//               </div>
//               <div>
//                 <p className="mb-1 text-sm font-medium text-gray-500">Stok Gudang</p>
//                 <div className="flex items-center gap-2">
//                   <span className={`text-2xl font-bold ${product.stock > 0 ? 'text-gray-900' : 'text-red-500'}`}>
//                     {product.stock}
//                   </span>
//                   <span className="text-sm text-gray-500">Unit</span>
//                 </div>
//               </div>
//             </div>

//             {/* Description & Benefits */}
//             <div className="space-y-6">
//               <div>
//                 <h3 className="mb-3 text-sm font-bold tracking-wider text-gray-900 uppercase">Deskripsi Produk</h3>
//                 <div className="prose-sm prose text-gray-600 max-w-none">
//                   {product.description ? (
//                     <p className="leading-relaxed whitespace-pre-wrap">{product.description}</p>
//                   ) : (
//                     <p className="italic text-gray-400">Tidak ada deskripsi.</p>
//                   )}
//                 </div>
//               </div>

//               <div className="pt-6 border-t border-gray-100">
//                 <h3 className="mb-3 text-sm font-bold tracking-wider text-gray-900 uppercase">Manfaat (Benefits)</h3>
//                 <div className="p-4 border bg-gycora-light/30 rounded-xl border-gycora-light">
//                   {product.benefits ? (
//                     <p className="text-sm leading-relaxed whitespace-pre-wrap text-gycora-dark">{product.benefits}</p>
//                   ) : (
//                     <p className="text-sm italic text-gray-400">Tidak ada catatan manfaat.</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// interface Product {
//   id: number;
//   category: { name: string };
//   sku: string;
//   name: string;
//   slug: string;
//   description: string;
//   benefits: string;
//   price: number;
//   stock: number;
//   image_url: string;
//   variant_images?: string[]; 
// }

// export default function AdminProductDetail() {
//   const navigate = useNavigate(); 
//   const { id } = useParams<{ id: string }>();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
  
//   // STATE CAROUSEL GAMBAR
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const fetchProductDetail = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products/${id}`);
//         if (!res.ok) throw new Error("Produk tidak ditemukan");
        
//         const data = await res.json();
//         const responseData = data.data ? data.data : data;
//         setProduct(responseData);
//       } catch (error) {
//         console.error("Detail produk error:", error);
//         Swal.fire('Error!', 'Gagal memuat detail produk.', 'error');
//         navigate("/admin/products"); 
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchProductDetail();
//   }, [id, navigate]);

//   // KUMPULKAN SEMUA GAMBAR (Utama + Varian)
//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   // KENDALI CAROUSEL
//   const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

//   const handleDelete = async () => {
//     const result = await Swal.fire({
//       title: 'Nonaktifkan produk ini?',
//       text: "Produk akan disembunyikan dari pelanggan.",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Ya, nonaktifkan!',
//       cancelButtonText: 'Batal'
//     });

//     if (result.isConfirmed) {
//       try {
//         const token = localStorage.getItem("admin_token");
//         const res = await fetch(`${BASE_URL}/api/products/${id}`, { 
//             method: "DELETE",
//             headers: { "Authorization": `Bearer ${token}` }
//         });
//         if (res.ok) {
//           await Swal.fire('Dinonaktifkan!', 'Produk telah dinonaktifkan.', 'success');
//           navigate("/admin/products"); 
//         } else {
//           throw new Error("Gagal menghapus data");
//         }
//       } catch (error) {
//         console.error("Gagal hapus produk:", error); 
//         Swal.fire('Error!', 'Gagal menghapus produk.', 'error');
//       }
//     }
//   };

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0,
//     }).format(angka);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-[calc(100vh-4rem)] font-sans">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   }

//   if (!product) return null;

//   return (
//     <div className="max-w-5xl p-8 mx-auto space-y-6 font-sans">
      
//       {/* Top Navigation & Actions */}
//       <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
//         <div className="flex items-center gap-4">
//           <button 
//             onClick={() => navigate("/admin/products")}
//             className="p-2 text-gray-400 transition-colors border border-gray-200 rounded-lg hover:text-gray-900 hover:bg-white bg-gray-50"
//             title="Kembali"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
//           </button>
//           <h1 className="text-2xl font-bold text-gray-900">Detail Produk</h1>
//         </div>

//         <div className="flex gap-3">
//           <Link 
//             to={`/admin/products/${product.id}/edit`} 
//             className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg shadow-sm bg-gycora hover:bg-gycora-dark"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
//             Edit Produk
//           </Link>
//           <button 
//             onClick={handleDelete}
//             className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 transition-colors rounded-lg bg-red-50 hover:bg-red-100"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
//             Nonaktifkan
//           </button>
//         </div>
//       </div>

//       {/* Main Content Card */}
//       <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
//         <div className="grid grid-cols-1 lg:grid-cols-3">
          
//           {/* Left Column: Image Area (CAROUSEL) */}
//           <div className="bg-gray-50 border-r border-gray-100 p-8 flex flex-col items-center justify-center min-h-[400px] relative group">
//             {gallery.length > 0 ? (
//               <>
//                 {/* Tampilan Gambar */}
//                 <div className="relative flex items-center justify-center w-full overflow-hidden bg-white shadow-sm aspect-square rounded-xl">
//                     <img 
//                       src={gallery[currentImageIndex]} 
//                       alt={`${product.name} - ${currentImageIndex}`} 
//                       className="object-cover w-full h-full"
//                     />
//                     {currentImageIndex === 0 && <span className="absolute top-2 left-2 bg-gycora text-white text-[10px] font-bold px-2 py-1 rounded shadow">Utama</span>}
//                 </div>

//                 {/* Tombol Kiri Kanan (Jika lebih dari 1 gambar) */}
//                 {gallery.length > 1 && (
//                   <>
//                     <button onClick={prevImage} className="absolute p-2 text-gray-800 transition-opacity rounded-full shadow-md opacity-0 left-4 bg-white/80 hover:bg-white group-hover:opacity-100">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                     </button>
//                     <button onClick={nextImage} className="absolute p-2 text-gray-800 transition-opacity rounded-full shadow-md opacity-0 right-4 bg-white/80 hover:bg-white group-hover:opacity-100">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                     </button>

//                     {/* Dot Indicators */}
//                     <div className="flex gap-2 mt-4">
//                       {gallery.map((_, idx) => (
//                         <button 
//                           key={idx} 
//                           onClick={() => setCurrentImageIndex(idx)}
//                           className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-gycora w-4' : 'bg-gray-300'}`}
//                         />
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </>
//             ) : (
//               <div className="flex flex-col items-center space-y-3 text-gray-400">
//                 <svg className="w-16 h-16 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
//                 <span className="text-sm font-medium">Belum ada gambar</span>
//               </div>
//             )}
//           </div>

//           {/* Right Column: Product Details */}
//           <div className="p-8 space-y-8 lg:col-span-2">
            
//             {/* Header Info */}
//             <div className="space-y-2">
//               <div className="flex items-center gap-3">
//                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gycora-light text-gycora-dark">
//                   {product.category?.name || "Uncategorized"}
//                 </span>
//                 <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
//                   SKU: {product.sku}
//                 </span>
//               </div>
//               <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h2>
//               <p className="text-sm text-gray-400">Slug: <span className="font-mono text-gray-500">{product.slug}</span></p>
//             </div>

//             {/* Price & Stock Stats */}
//             <div className="grid grid-cols-2 gap-6 p-6 border border-gray-100 bg-gray-50 rounded-xl">
//               <div>
//                 <p className="mb-1 text-sm font-medium text-gray-500">Harga Jual</p>
//                 <p className="text-2xl font-bold text-gycora">{formatRupiah(product.price)}</p>
//               </div>
//               <div>
//                 <p className="mb-1 text-sm font-medium text-gray-500">Stok Gudang</p>
//                 <div className="flex items-center gap-2">
//                   <span className={`text-2xl font-bold ${product.stock > 0 ? 'text-gray-900' : 'text-red-500'}`}>
//                     {product.stock}
//                   </span>
//                   <span className="text-sm text-gray-500">Unit</span>
//                 </div>
//               </div>
//             </div>

//             {/* Description & Benefits */}
//             <div className="space-y-6">
//               <div>
//                 <h3 className="mb-3 text-sm font-bold tracking-wider text-gray-900 uppercase">Deskripsi Produk</h3>
//                 <div className="prose-sm prose text-gray-600 max-w-none">
//                   {product.description ? (
//                     <p className="leading-relaxed whitespace-pre-wrap">{product.description}</p>
//                   ) : (
//                     <p className="italic text-gray-400">Tidak ada deskripsi.</p>
//                   )}
//                 </div>
//               </div>

//               <div className="pt-6 border-t border-gray-100">
//                 <h3 className="mb-3 text-sm font-bold tracking-wider text-gray-900 uppercase">Manfaat (Benefits)</h3>
//                 <div className="p-4 border bg-gycora-light/30 rounded-xl border-gycora-light">
//                   {product.benefits ? (
//                     <p className="text-sm leading-relaxed whitespace-pre-wrap text-gycora-dark">{product.benefits}</p>
//                   ) : (
//                     <p className="text-sm italic text-gray-400">Tidak ada catatan manfaat.</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// interface Product {
//   id: number;
//   category: { name: string };
//   sku: string;
//   name: string;
//   slug: string;
//   description: string;
//   benefits: string;
//   price: number;
//   stock: number;
//   image_url: string;
//   variant_images?: string[]; 
//   variant_video?: string;
//   color?: string[];
// }

// export default function AdminProductDetail() {
//   const navigate = useNavigate(); 
//   const { id } = useParams<{ id: string }>();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
  
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const fetchProductDetail = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products/${id}`);
//         if (!res.ok) throw new Error("Produk tidak ditemukan");
        
//         const data = await res.json();
//         setProduct(data.data ? data.data : data);
//       } catch (error) {
//         Swal.fire('Error!', 'Gagal memuat detail produk.', 'error');
//         navigate("/admin/products"); 
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchProductDetail();
//   }, [id, navigate]);

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) imgs.push(...product.variant_images);
//     return imgs;
//   }, [product]);

//   const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

//   const handleDelete = async () => {
//     const result = await Swal.fire({
//       title: 'Nonaktifkan produk ini?',
//       text: "Produk akan disembunyikan dari pelanggan.",
//       icon: 'warning', showCancelButton: true, confirmButtonColor: '#d33', cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Ya, nonaktifkan!', cancelButtonText: 'Batal'
//     });

//     if (result.isConfirmed) {
//       try {
//         const token = localStorage.getItem("admin_token");
//         const res = await fetch(`${BASE_URL}/api/products/${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } });
//         if (res.ok) {
//           await Swal.fire('Dinonaktifkan!', 'Produk telah dinonaktifkan.', 'success');
//           navigate("/admin/products"); 
//         } else { throw new Error("Gagal menghapus data"); }
//       } catch (error) {
//         Swal.fire('Error!', 'Gagal menghapus produk.', 'error');
//       }
//     }
//   };

//   const formatRupiah = (angka: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);

//   if (loading) return <div className="flex justify-center items-center h-[calc(100vh-4rem)]"><div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div></div>;
//   if (!product) return null;

//   return (
//     <div className="max-w-5xl p-8 mx-auto space-y-6 font-sans">
      
//       {/* Top Navigation */}
//       <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
//         <div className="flex items-center gap-4">
//           <button onClick={() => navigate("/admin/products")} className="p-2 text-gray-400 transition-colors border border-gray-200 rounded-lg hover:text-gray-900 hover:bg-white bg-gray-50"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg></button>
//           <h1 className="text-2xl font-bold text-gray-900">Detail Produk</h1>
//         </div>
//         <div className="flex gap-3">
//           <Link to={`/admin/products/${product.id}/edit`} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg shadow-sm bg-gycora hover:bg-gycora-dark"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg> Edit Produk</Link>
//           <button onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 transition-colors rounded-lg bg-red-50 hover:bg-red-100"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> Nonaktifkan</button>
//         </div>
//       </div>

//       <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
//         <div className="grid grid-cols-1 lg:grid-cols-3">
          
//           {/* Left Column: Media Area (INSTANT CAROUSEL & VIDEO) */}
//           <div className="flex flex-col items-center p-8 border-r border-gray-100 bg-gray-50">
//             {gallery.length > 0 ? (
//               <div className="relative flex flex-col items-center w-full group">
//                 <div className="relative w-full overflow-hidden bg-white shadow-sm aspect-square rounded-xl">
//                   {/* [PERBAIKAN] Merender semua gambar dan mengatur Opacity untuk pergantian INSTAN */}
//                   {gallery.map((src, idx) => (
//                     <img 
//                       key={idx}
//                       src={src} 
//                       alt={`${product.name} - ${idx}`} 
//                       className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
//                     />
//                   ))}
//                   {currentImageIndex === 0 && <span className="absolute z-20 px-2 py-1 font-bold text-white shadow top-2 left-2 bg-gycora text-[10px] rounded">Utama</span>}
//                 </div>

//                 {gallery.length > 1 && (
//                   <>
//                     <button onClick={prevImage} className="absolute z-20 p-2 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/80 hover:bg-white group-hover:opacity-100"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
//                     <button onClick={nextImage} className="absolute z-20 p-2 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/80 hover:bg-white group-hover:opacity-100"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>

//                     <div className="flex gap-2 mt-4">
//                       {gallery.map((_, idx) => (
//                         <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-gycora w-6' : 'bg-gray-300 w-2'}`} />
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             ) : (
//               <div className="flex flex-col items-center justify-center w-full space-y-3 text-gray-400 aspect-square">
//                 <svg className="w-16 h-16 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
//                 <span className="text-sm font-medium">Belum ada gambar</span>
//               </div>
//             )}

//             {/* VIDEO TAMPIL DI BAWAH GAMBAR */}
//             {product.variant_video && (
//               <div className="w-full mt-8">
//                 <h3 className="mb-2 text-xs font-bold tracking-widest text-gray-500 uppercase">Video Demo</h3>
//                 <video src={product.variant_video} controls className="object-contain w-full bg-black rounded-lg shadow-sm h-44" />
//               </div>
//             )}
//           </div>

//           {/* Right Column: Product Details */}
//           <div className="p-8 space-y-8 lg:col-span-2">
//             <div className="space-y-2">
//               <div className="flex items-center gap-3">
//                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gycora-light text-gycora-dark">{product.category?.name || "Uncategorized"}</span>
//                 <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">SKU: {product.sku}</span>
//               </div>
//               <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h2>
//               <p className="text-sm text-gray-400">Slug: <span className="font-mono text-gray-500">{product.slug}</span></p>
//             </div>

//             <div className="grid grid-cols-2 gap-6 p-6 border border-gray-100 bg-gray-50 rounded-xl">
//               <div>
//                 <p className="mb-1 text-sm font-medium text-gray-500">Harga Jual</p>
//                 <p className="text-2xl font-bold text-gycora">{formatRupiah(product.price)}</p>
//               </div>
//               <div>
//                 <p className="mb-1 text-sm font-medium text-gray-500">Stok Gudang</p>
//                 <div className="flex items-center gap-2">
//                   <span className={`text-2xl font-bold ${product.stock > 0 ? 'text-gray-900' : 'text-red-500'}`}>{product.stock}</span>
//                   <span className="text-sm text-gray-500">Unit</span>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-6">
//               {/* VARIAN WARNA DISPLAY */}
//               {Array.isArray(product.color) && product.color.length > 0 && (
//                 <div>
//                   <h3 className="mb-3 text-sm font-bold tracking-wider text-gray-900 uppercase">Varian Warna</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {product.color.map((c, i) => (
//                       <div key={i} className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-full shadow-sm" style={{ backgroundColor: c }} title={c}></div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <h3 className="mb-3 text-sm font-bold tracking-wider text-gray-900 uppercase">Deskripsi Produk</h3>
//                 <div className="prose-sm prose text-gray-600 max-w-none">
//                   {product.description ? <p className="leading-relaxed whitespace-pre-wrap">{product.description}</p> : <p className="italic text-gray-400">Tidak ada deskripsi.</p>}
//                 </div>
//               </div>

//               <div className="pt-6 border-t border-gray-100">
//                 <h3 className="mb-3 text-sm font-bold tracking-wider text-gray-900 uppercase">Manfaat (Benefits)</h3>
//                 <div className="p-4 border bg-gycora-light/30 rounded-xl border-gycora-light">
//                   {product.benefits ? <p className="text-sm leading-relaxed whitespace-pre-wrap text-gycora-dark">{product.benefits}</p> : <p className="text-sm italic text-gray-400">Tidak ada catatan manfaat.</p>}
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// interface Product {
//   id: number;
//   category: { name: string };
//   sku: string;
//   name: string;
//   slug: string;
//   description: string;
//   benefits: string;
//   price: number;
//   stock: number;
//   image_url: string;
//   variant_images?: string[]; 
//   variant_video?: string;
//   // Ubah tipe data color menjadi any[] agar dapat menerima string maupun object
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   color?: any[];
// }

// export default function AdminProductDetail() {
//   const navigate = useNavigate(); 
//   const { id } = useParams<{ id: string }>();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
  
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const fetchProductDetail = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products/${id}`);
//         if (!res.ok) throw new Error("Produk tidak ditemukan");
        
//         const data = await res.json();
//         setProduct(data.data ? data.data : data);
//       } catch (error) {
//         Swal.fire('Error!', 'Gagal memuat detail produk.', 'error');
//         navigate("/admin/products"); 
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchProductDetail();
//   }, [id, navigate]);

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) imgs.push(...product.variant_images);
//     return imgs;
//   }, [product]);

//   const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

//   const handleDelete = async () => {
//     const result = await Swal.fire({
//       title: 'Nonaktifkan produk ini?',
//       text: "Produk akan disembunyikan dari pelanggan.",
//       icon: 'warning', showCancelButton: true, confirmButtonColor: '#d33', cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Ya, nonaktifkan!', cancelButtonText: 'Batal'
//     });

//     if (result.isConfirmed) {
//       try {
//         const token = localStorage.getItem("admin_token");
//         const res = await fetch(`${BASE_URL}/api/products/${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } });
//         if (res.ok) {
//           await Swal.fire('Dinonaktifkan!', 'Produk telah dinonaktifkan.', 'success');
//           navigate("/admin/products"); 
//         } else { throw new Error("Gagal menghapus data"); }
//       } catch (error) {
//         Swal.fire('Error!', 'Gagal menghapus produk.', 'error');
//       }
//     }
//   };

//   const formatRupiah = (angka: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);

//   if (loading) return <div className="flex justify-center items-center h-[calc(100vh-4rem)]"><div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div></div>;
//   if (!product) return null;

//   return (
//     <div className="max-w-5xl p-8 mx-auto space-y-6 font-sans">
      
//       {/* Top Navigation */}
//       <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
//         <div className="flex items-center gap-4">
//           <button onClick={() => navigate("/admin/products")} className="p-2 text-gray-400 transition-colors border border-gray-200 rounded-lg hover:text-gray-900 hover:bg-white bg-gray-50"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg></button>
//           <h1 className="text-2xl font-bold text-gray-900">Detail Produk</h1>
//         </div>
//         <div className="flex gap-3">
//           <Link to={`/admin/products/${product.id}/edit`} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg shadow-sm bg-gycora hover:bg-gycora-dark"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg> Edit Produk</Link>
//           <button onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 transition-colors rounded-lg bg-red-50 hover:bg-red-100"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> Nonaktifkan</button>
//         </div>
//       </div>

//       <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
//         <div className="grid grid-cols-1 lg:grid-cols-3">
          
//           {/* Left Column: Media Area */}
//           <div className="flex flex-col items-center p-8 border-r border-gray-100 bg-gray-50">
//             {gallery.length > 0 ? (
//               <div className="relative flex flex-col items-center w-full group">
//                 <div className="relative w-full overflow-hidden bg-white shadow-sm aspect-square rounded-xl">
//                   {gallery.map((src, idx) => (
//                     <img 
//                       key={idx}
//                       src={src} 
//                       alt={`${product.name} - ${idx}`} 
//                       className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
//                     />
//                   ))}
//                   {currentImageIndex === 0 && <span className="absolute z-20 px-2 py-1 font-bold text-white shadow top-2 left-2 bg-gycora text-[10px] rounded">Utama</span>}
//                 </div>

//                 {gallery.length > 1 && (
//                   <>
//                     <button onClick={prevImage} className="absolute z-20 p-2 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/80 hover:bg-white group-hover:opacity-100"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
//                     <button onClick={nextImage} className="absolute z-20 p-2 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/80 hover:bg-white group-hover:opacity-100"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>

//                     <div className="flex gap-2 mt-4">
//                       {gallery.map((_, idx) => (
//                         <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-gycora w-6' : 'bg-gray-300 w-2'}`} />
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             ) : (
//               <div className="flex flex-col items-center justify-center w-full space-y-3 text-gray-400 aspect-square">
//                 <svg className="w-16 h-16 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
//                 <span className="text-sm font-medium">Belum ada gambar</span>
//               </div>
//             )}

//             {product.variant_video && (
//               <div className="w-full mt-8">
//                 <h3 className="mb-2 text-xs font-bold tracking-widest text-gray-500 uppercase">Video Demo</h3>
//                 <video src={product.variant_video} controls className="object-contain w-full bg-black rounded-lg shadow-sm h-44" />
//               </div>
//             )}
//           </div>

//           {/* Right Column: Product Details */}
//           <div className="p-8 space-y-8 lg:col-span-2">
//             <div className="space-y-2">
//               <div className="flex items-center gap-3">
//                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gycora-light text-gycora-dark">{product.category?.name || "Uncategorized"}</span>
//                 <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">SKU: {product.sku}</span>
//               </div>
//               <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h2>
//               <p className="text-sm text-gray-400">Slug: <span className="font-mono text-gray-500">{product.slug}</span></p>
//             </div>

//             <div className="grid grid-cols-2 gap-6 p-6 border border-gray-100 bg-gray-50 rounded-xl">
//               <div>
//                 <p className="mb-1 text-sm font-medium text-gray-500">Harga Jual</p>
//                 <p className="text-2xl font-bold text-gycora">{formatRupiah(product.price)}</p>
//               </div>
//               <div>
//                 <p className="mb-1 text-sm font-medium text-gray-500">Stok Gudang</p>
//                 <div className="flex items-center gap-2">
//                   <span className={`text-2xl font-bold ${product.stock > 0 ? 'text-gray-900' : 'text-red-500'}`}>{product.stock}</span>
//                   <span className="text-sm text-gray-500">Unit</span>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-6">
              
//               {/* --- PERBAIKAN: VARIAN WARNA DISPLAY --- */}
//               {Array.isArray(product.color) && product.color.length > 0 && (
//                 <div>
//                   <h3 className="mb-3 text-sm font-bold tracking-wider text-gray-900 uppercase">Varian Warna</h3>
//                   <div className="flex flex-wrap gap-3">
//                     {product.color.map((c, i) => {
//                       // Mengatasi format warna lama (string) dan format baru (object)
//                       const hex = typeof c === 'string' ? c : c.hex;
//                       const name = typeof c === 'string' ? '' : c.name;
                      
//                       return (
//                         <div key={i} className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg bg-white shadow-sm" title={hex}>
//                           <div className="w-5 h-5 border border-gray-300 rounded-full shadow-inner shrink-0" style={{ backgroundColor: hex }}></div>
//                           {name && <span className="text-xs font-bold text-gray-700">{name}</span>}
//                           {!name && <span className="font-mono text-[10px] text-gray-400 uppercase">{hex}</span>}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <h3 className="mb-3 text-sm font-bold tracking-wider text-gray-900 uppercase">Deskripsi Produk</h3>
//                 <div className="prose-sm prose text-gray-600 max-w-none">
//                   {product.description ? <p className="leading-relaxed whitespace-pre-wrap">{product.description}</p> : <p className="italic text-gray-400">Tidak ada deskripsi.</p>}
//                 </div>
//               </div>

//               <div className="pt-6 border-t border-gray-100">
//                 <h3 className="mb-3 text-sm font-bold tracking-wider text-gray-900 uppercase">Manfaat (Benefits)</h3>
//                 <div className="p-4 border bg-gycora-light/30 rounded-xl border-gycora-light">
//                   {product.benefits ? <p className="text-sm leading-relaxed whitespace-pre-wrap text-gycora-dark">{product.benefits}</p> : <p className="text-sm italic text-gray-400">Tidak ada catatan manfaat.</p>}
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// New

// import { useState, useEffect, useMemo } from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// interface Product {
//   id: number;
//   category: { name: string };
//   sku: string;
//   name: string;
//   slug: string;
//   description: string;
//   benefits: string;
//   price: number;
//   stock: number;
//   image_url: string;
//   variant_images?: string[]; 
//   variant_video?: string;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   color?: any[];
// }

// export default function AdminProductDetail() {
//   const navigate = useNavigate(); 
//   const { id } = useParams<{ id: string }>();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
  
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const fetchProductDetail = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products/${id}`);
//         if (!res.ok) throw new Error("Produk tidak ditemukan");
        
//         const data = await res.json();
//         setProduct(data.data ? data.data : data);
//       } catch (error) {
//         Swal.fire('Error!', 'Gagal memuat detail produk.', 'error');
//         navigate("/admin/products"); 
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchProductDetail();
//   }, [id, navigate]);

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) imgs.push(...product.variant_images);
//     return imgs;
//   }, [product]);

//   const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

//   const handleDelete = async () => {
//     const result = await Swal.fire({
//       title: 'Nonaktifkan produk ini?',
//       text: "Produk akan disembunyikan dari pelanggan.",
//       icon: 'warning', showCancelButton: true, confirmButtonColor: '#d33', cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Ya, nonaktifkan!', cancelButtonText: 'Batal'
//     });

//     if (result.isConfirmed) {
//       try {
//         const token = localStorage.getItem("admin_token");
//         const res = await fetch(`${BASE_URL}/api/products/${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } });
//         if (res.ok) {
//           await Swal.fire('Dinonaktifkan!', 'Produk telah dinonaktifkan.', 'success');
//           navigate("/admin/products"); 
//         } else { throw new Error("Gagal menghapus data"); }
//       } catch (error) {
//         Swal.fire('Error!', 'Gagal menghapus produk.', 'error');
//       }
//     }
//   };

//   const formatRupiah = (angka: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);

//   if (loading) return <div className="flex justify-center items-center h-[calc(100vh-4rem)]"><div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div></div>;
//   if (!product) return null;

//   return (
//     <div className="max-w-5xl p-8 mx-auto space-y-6 font-sans">
      
//       {/* Top Navigation */}
//       <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
//         <div className="flex items-center gap-4">
//           <button onClick={() => navigate("/admin/products")} className="p-2 text-gray-400 transition-colors border border-gray-200 rounded-lg hover:text-gray-900 hover:bg-white bg-gray-50"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg></button>
//           <h1 className="text-2xl font-bold text-gray-900">Detail Produk</h1>
//         </div>
//         <div className="flex gap-3">
//           <Link to={`/admin/products/${product.id}/edit`} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg shadow-sm bg-gycora hover:bg-gycora-dark"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg> Edit Produk</Link>
//           <button onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 transition-colors rounded-lg bg-red-50 hover:bg-red-100"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> Nonaktifkan</button>
//         </div>
//       </div>

//       <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
//         <div className="grid grid-cols-1 lg:grid-cols-3">
          
//           <div className="flex flex-col items-center p-8 border-r border-gray-100 bg-gray-50">
//             {gallery.length > 0 ? (
//               <div className="relative flex flex-col items-center w-full group">
//                 <div className="relative w-full overflow-hidden bg-white shadow-sm aspect-square rounded-xl">
//                   {gallery.map((src, idx) => (
//                     <img 
//                       key={idx}
//                       src={src} 
//                       alt={`${product.name} - ${idx}`} 
//                       className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
//                     />
//                   ))}
//                   {currentImageIndex === 0 && <span className="absolute z-20 px-2 py-1 font-bold text-white shadow top-2 left-2 bg-gycora text-[10px] rounded">Utama</span>}
//                 </div>

//                 {gallery.length > 1 && (
//                   <>
//                     <button onClick={prevImage} className="absolute z-20 p-2 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/80 hover:bg-white group-hover:opacity-100"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
//                     <button onClick={nextImage} className="absolute z-20 p-2 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/80 hover:bg-white group-hover:opacity-100"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>

//                     <div className="flex gap-2 mt-4">
//                       {gallery.map((_, idx) => (
//                         <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-gycora w-6' : 'bg-gray-300 w-2'}`} />
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             ) : (
//               <div className="flex flex-col items-center justify-center w-full space-y-3 text-gray-400 aspect-square">
//                 <svg className="w-16 h-16 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
//                 <span className="text-sm font-medium">Belum ada gambar</span>
//               </div>
//             )}

//             {product.variant_video && (
//               <div className="w-full mt-8">
//                 <h3 className="mb-2 text-xs font-bold tracking-widest text-gray-500 uppercase">Video Demo</h3>
//                 <video src={product.variant_video} controls className="object-contain w-full bg-black rounded-lg shadow-sm h-44" />
//               </div>
//             )}
//           </div>

//           <div className="p-8 space-y-8 lg:col-span-2">
//             <div className="space-y-2">
//               <div className="flex items-center gap-3">
//                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gycora-light text-gycora-dark">{product.category?.name || "Uncategorized"}</span>
//                 <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">SKU: {product.sku}</span>
//               </div>
//               <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h2>
//               <p className="text-sm text-gray-400">Slug: <span className="font-mono text-gray-500">{product.slug}</span></p>
//             </div>

//             <div className="grid grid-cols-2 gap-6 p-6 border border-gray-100 bg-gray-50 rounded-xl">
//               <div>
//                 <p className="mb-1 text-sm font-medium text-gray-500">Harga Jual</p>
//                 <p className="text-2xl font-bold text-gycora">{formatRupiah(product.price)}</p>
//               </div>
//               <div>
//                 <p className="mb-1 text-sm font-medium text-gray-500">Stok Gudang</p>
//                 <div className="flex items-center gap-2">
//                   <span className={`text-2xl font-bold ${product.stock > 0 ? 'text-gray-900' : 'text-red-500'}`}>{product.stock}</span>
//                   <span className="text-sm text-gray-500">Unit</span>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-6">
              
//               {/* --- PERBAIKAN: VARIAN WARNA DISPLAY --- */}
//               {Array.isArray(product.color) && product.color.length > 0 && (
//                 <div>
//                   <h3 className="mb-3 text-sm font-bold tracking-wider text-gray-900 uppercase">Varian Warna</h3>
//                   <div className="flex flex-wrap gap-3">
//                     {product.color.map((c, i) => {
//                       const hex = typeof c === 'string' ? c : c.hex;
//                       const name = typeof c === 'string' ? '' : c.name;
                      
//                       return (
//                         <div key={i} className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg bg-white shadow-sm" title={hex}>
//                           <div className="w-5 h-5 border border-gray-300 rounded-full shadow-inner shrink-0" style={{ backgroundColor: hex }}></div>
//                           {name && <span className="text-xs font-bold text-gray-700">{name}</span>}
//                           {!name && <span className="font-mono text-[10px] text-gray-400 uppercase">{hex}</span>}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <h3 className="mb-3 text-sm font-bold tracking-wider text-gray-900 uppercase">Deskripsi Produk</h3>
//                 <div className="prose-sm prose text-gray-600 max-w-none">
//                   {product.description ? <p className="leading-relaxed whitespace-pre-wrap">{product.description}</p> : <p className="italic text-gray-400">Tidak ada deskripsi.</p>}
//                 </div>
//               </div>

//               <div className="pt-6 border-t border-gray-100">
//                 <h3 className="mb-3 text-sm font-bold tracking-wider text-gray-900 uppercase">Manfaat (Benefits)</h3>
//                 <div className="p-4 border bg-gycora-light/30 rounded-xl border-gycora-light">
//                   {product.benefits ? <p className="text-sm leading-relaxed whitespace-pre-wrap text-gycora-dark">{product.benefits}</p> : <p className="text-sm italic text-gray-400">Tidak ada catatan manfaat.</p>}
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// Menambah harga diskon
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

interface Product {
  id: number;
  category: { name: string };
  sku: string;
  name: string;
  slug: string;
  description: string;
  benefits: string;
  price: number;
  discount_price?: number | null; // Tambahan field discount_price
  voucher_discount_price?: number | null;
  stock: number;
  image_url: string;
  variant_images?: string[]; 
  variant_video?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  color?: any[];
}

export default function AdminProductDetail() {
  const navigate = useNavigate(); 
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products/${id}`);
        if (!res.ok) throw new Error("Produk tidak ditemukan");
        
        const data = await res.json();
        setProduct(data.data ? data.data : data);
      } catch (error) {
        Swal.fire('Error!', 'Gagal memuat detail produk.', 'error');
        navigate("/admin/products"); 
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProductDetail();
  }, [id, navigate]);

  const gallery = useMemo(() => {
    if (!product) return [];
    const imgs = [];
    if (product.image_url) imgs.push(product.image_url);
    if (Array.isArray(product.variant_images)) imgs.push(...product.variant_images);
    return imgs;
  }, [product]);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Nonaktifkan produk ini?',
      text: "Produk akan disembunyikan dari pelanggan.",
      icon: 'warning', showCancelButton: true, confirmButtonColor: '#d33', cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, nonaktifkan!', cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("admin_token");
        const res = await fetch(`${BASE_URL}/api/products/${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } });
        if (res.ok) {
          await Swal.fire('Dinonaktifkan!', 'Produk telah dinonaktifkan.', 'success');
          navigate("/admin/products"); 
        } else { throw new Error("Gagal menghapus data"); }
      } catch (error) {
        Swal.fire('Error!', 'Gagal menghapus produk.', 'error');
      }
    }
  };

  const formatRupiah = (angka: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);

  if (loading) return <div className="flex justify-center items-center h-[calc(100vh-4rem)]"><div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div></div>;
  if (!product) return null;

  return (
    <div className="max-w-5xl p-8 mx-auto space-y-6 font-sans">
      
      {/* Top Navigation */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/admin/products")} className="p-2 text-gray-400 transition-colors border border-gray-200 rounded-lg hover:text-gray-900 hover:bg-white bg-gray-50"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg></button>
          <h1 className="text-2xl font-bold text-gray-900">Detail Produk</h1>
        </div>
        <div className="flex gap-3">
          <Link to={`/admin/products/${product.id}/edit`} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg shadow-sm bg-gycora hover:bg-gycora-dark"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg> Edit Produk</Link>
          <button onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 transition-colors rounded-lg bg-red-50 hover:bg-red-100"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> Nonaktifkan</button>
        </div>
      </div>

      <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          
          <div className="flex flex-col items-center p-8 border-r border-gray-100 bg-gray-50">
            {gallery.length > 0 ? (
              <div className="relative flex flex-col items-center w-full group">
                <div className="relative w-full overflow-hidden bg-white shadow-sm aspect-square rounded-xl">
                  {gallery.map((src, idx) => (
                    <img 
                      key={idx}
                      src={src} 
                      alt={`${product.name} - ${idx}`} 
                      className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    />
                  ))}
                  {currentImageIndex === 0 && <span className="absolute z-20 px-2 py-1 font-bold text-white shadow top-2 left-2 bg-gycora text-[10px] rounded">Utama</span>}
                </div>

                {gallery.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute z-20 p-2 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/80 hover:bg-white group-hover:opacity-100"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
                    <button onClick={nextImage} className="absolute z-20 p-2 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/80 hover:bg-white group-hover:opacity-100"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>

                    <div className="flex gap-2 mt-4">
                      {gallery.map((_, idx) => (
                        <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-gycora w-6' : 'bg-gray-300 w-2'}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full space-y-3 text-gray-400 aspect-square">
                <svg className="w-16 h-16 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span className="text-sm font-medium">Belum ada gambar</span>
              </div>
            )}

            {product.variant_video && (
              <div className="w-full mt-8">
                <h3 className="mb-2 text-xs font-bold tracking-widest text-gray-500 uppercase">Video Demo</h3>
                <video src={product.variant_video} controls className="object-contain w-full bg-black rounded-lg shadow-sm h-44" />
              </div>
            )}
          </div>

          <div className="p-8 space-y-8 lg:col-span-2">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gycora-light text-gycora-dark">{product.category?.name || "Uncategorized"}</span>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">SKU: {product.sku}</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h2>
              <p className="text-sm text-gray-400">Slug: <span className="font-mono text-gray-500">{product.slug}</span></p>
            </div>

            {/* <div className="grid grid-cols-2 gap-6 p-6 border border-gray-100 bg-gray-50 rounded-xl">
              <div>
                <p className="mb-1 text-sm font-medium text-gray-500">Harga Jual</p>
                {product.discount_price && product.discount_price > 0 ? (
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-red-600">{formatRupiah(product.discount_price)}</span>
                    <span className="text-sm text-gray-400 line-through">{formatRupiah(product.price)}</span>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-gycora">{formatRupiah(product.price)}</p>
                )}
              </div>
              <div>
                <p className="mb-1 text-sm font-medium text-gray-500">Stok Gudang</p>
                <div className="flex items-center gap-2">
                  <span className={`text-2xl font-bold ${product.stock > 0 ? 'text-gray-900' : 'text-red-500'}`}>{product.stock}</span>
                  <span className="text-sm text-gray-500">Unit</span>
                </div>
              </div>
            </div> */}

            <div className="grid grid-cols-1 gap-6 p-6 border border-gray-100 sm:grid-cols-3 bg-gray-50 rounded-xl">
              <div>
                <p className="mb-1 text-sm font-medium text-gray-500">Harga Normal</p>
                <p className="text-xl font-bold text-gray-900">{formatRupiah(product.price)}</p>
              </div>
              <div>
                <p className="mb-1 text-sm font-medium text-gray-500">Diskon Publik</p>
                {product.discount_price && product.discount_price > 0 ? (
                  <p className="text-xl font-bold text-red-600">{formatRupiah(product.discount_price)}</p>
                ) : (
                  <p className="text-xl font-bold text-gray-300">-</p>
                )}
              </div>
              <div className="p-3 border rounded-lg bg-amber-50 border-amber-100">
                <p className="mb-1 text-xs font-bold tracking-widest uppercase text-amber-600">Harga Voucher Bos</p>
                {product.voucher_discount_price && product.voucher_discount_price > 0 ? (
                  <p className="text-xl font-black text-amber-700">{formatRupiah(product.voucher_discount_price)}</p>
                ) : (
                  <p className="text-sm font-bold text-amber-300">Tidak diset</p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              
              {Array.isArray(product.color) && product.color.length > 0 && (
                <div>
                  <h3 className="mb-3 text-sm font-bold tracking-wider text-gray-900 uppercase">Varian Warna</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.color.map((c, i) => {
                      const hex = typeof c === 'string' ? c : c.hex;
                      const name = typeof c === 'string' ? '' : c.name;
                      
                      return (
                        <div key={i} className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg bg-white shadow-sm" title={hex}>
                          <div className="w-5 h-5 border border-gray-300 rounded-full shadow-inner shrink-0" style={{ backgroundColor: hex }}></div>
                          {name && <span className="text-xs font-bold text-gray-700">{name}</span>}
                          {!name && <span className="font-mono text-[10px] text-gray-400 uppercase">{hex}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <h3 className="mb-3 text-sm font-bold tracking-wider text-gray-900 uppercase">Deskripsi Produk</h3>
                <div className="prose-sm prose text-gray-600 max-w-none">
                  {product.description ? <p className="leading-relaxed whitespace-pre-wrap">{product.description}</p> : <p className="italic text-gray-400">Tidak ada deskripsi.</p>}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h3 className="mb-3 text-sm font-bold tracking-wider text-gray-900 uppercase">Manfaat (Benefits)</h3>
                <div className="p-4 border bg-gycora-light/30 rounded-xl border-gycora-light">
                  {product.benefits ? <p className="text-sm leading-relaxed whitespace-pre-wrap text-gycora-dark">{product.benefits}</p> : <p className="text-sm italic text-gray-400">Tidak ada catatan manfaat.</p>}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}