// /* eslint-disable @typescript-eslint/no-unused-vars */
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
//   wholesale_price?: number | null; // <--- BARU
//   discount_price?: number | null; 
//   voucher_discount_price?: number | null;
//   stock: number;
//   image_url: string;
//   variant_images?: string[]; 
//   variant_video?: string;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   color?: any[];
// }

// export default function AdminProductDetail() {
//   const navigate = useNavigate(); 
//   const { slug } = useParams<{ slug: string }>();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
  
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const fetchProductDetail = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products/${slug}`);
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

//     if (slug) fetchProductDetail();
//   }, [slug, navigate]);

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

//     if (result.isConfirmed && product) {
//       try {
//         const token = localStorage.getItem("admin_token");
//         const res = await fetch(`${BASE_URL}/api/products/${product.id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } });
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
//           <Link to={`/admin/products/${product.slug}/edit`} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg shadow-sm bg-gycora hover:bg-gycora-dark"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg> Edit Produk</Link>
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

//             {/* 👇 GRID HARGA DIPERLEBAR AGAR MUAT 4 KOLOM 👇 */}
//             <div className="grid grid-cols-1 gap-6 p-6 border border-gray-100 sm:grid-cols-2 lg:grid-cols-4 bg-gray-50 rounded-xl">
//               <div>
//                 <p className="mb-1 text-sm font-medium text-gray-500">Harga Normal</p>
//                 <p className="text-xl font-bold text-gray-900">{formatRupiah(product.price)}</p>
//               </div>
              
//               {/* KOLOM BARU: HARGA GROSIR */}
//               <div className="p-3 border border-blue-100 rounded-lg bg-blue-50">
//                 <p className="mb-1 text-xs font-bold tracking-widest text-blue-600 uppercase">Harga Grosir (Reseller)</p>
//                 {product.wholesale_price && product.wholesale_price > 0 ? (
//                   <p className="text-xl font-black text-blue-700">{formatRupiah(product.wholesale_price)}</p>
//                 ) : (
//                   <p className="text-sm font-bold text-blue-300">Tidak diset</p>
//                 )}
//               </div>

//               <div>
//                 <p className="mb-1 text-sm font-medium text-gray-500">Diskon Publik</p>
//                 {product.discount_price && product.discount_price > 0 ? (
//                   <p className="text-xl font-bold text-red-600">{formatRupiah(product.discount_price)}</p>
//                 ) : (
//                   <p className="text-xl font-bold text-gray-300">-</p>
//                 )}
//               </div>
              
//               <div className="p-3 border rounded-lg bg-amber-50 border-amber-100">
//                 <p className="mb-1 text-xs font-bold tracking-widest uppercase text-amber-600">Harga Voucher Bos</p>
//                 {product.voucher_discount_price && product.voucher_discount_price > 0 ? (
//                   <p className="text-xl font-black text-amber-700">{formatRupiah(product.voucher_discount_price)}</p>
//                 ) : (
//                   <p className="text-sm font-bold text-amber-300">Tidak diset</p>
//                 )}
//               </div>
//             </div>

//             <div className="space-y-6">
              
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

// /* eslint-disable @typescript-eslint/no-unused-vars */
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
//   wholesale_price?: number | null; 
//   discount_price?: number | null; 
//   voucher_discount_price?: number | null;
//   // 👇 Multi-currency properties
//   prices?: Record<string, string | number> | null;
//   discount_prices?: Record<string, string | number> | null;
//   wholesale_prices?: Record<string, string | number> | null;
//   voucher_discount_prices?: Record<string, string | number> | null;
//   stock: number;
//   image_url: string;
//   variant_images?: string[]; 
//   variant_video?: string;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   color?: any[];
// }

// const SUPPORTED_CURRENCIES = ["USD", "SGD", "EUR", "AUD", "MYR"];

// export default function AdminProductDetail() {
//   const navigate = useNavigate(); 
//   const { slug } = useParams<{ slug: string }>();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
  
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const fetchProductDetail = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products/${slug}`);
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

//     if (slug) fetchProductDetail();
//   }, [slug, navigate]);

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

//     if (result.isConfirmed && product) {
//       try {
//         const token = localStorage.getItem("admin_token");
//         const res = await fetch(`${BASE_URL}/api/products/${product.id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } });
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
  
//   // Helper memformat mata uang internasional
//   const formatForeignCurrency = (amount: number | string | undefined, currencyCode: string) => {
//     if (amount === undefined || amount === null || amount === "") return "-";
//     const num = Number(amount);
//     if (isNaN(num)) return "-";
//     return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(num);
//   };

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
//           <Link to={`/admin/products/${product.slug}/edit`} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg shadow-sm bg-gycora hover:bg-gycora-dark"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg> Edit Produk</Link>
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

//             {/* HARGA LOKAL IDR */}
//             <div>
//               <h3 className="pb-2 mb-3 text-sm font-bold tracking-wider text-gray-900 uppercase border-b">Harga Domestik (IDR)</h3>
//               <div className="grid grid-cols-1 gap-6 p-6 border border-gray-100 sm:grid-cols-2 lg:grid-cols-4 bg-gray-50 rounded-xl">
//                 <div>
//                   <p className="mb-1 text-sm font-medium text-gray-500">Harga Normal</p>
//                   <p className="text-xl font-bold text-gray-900">{formatRupiah(product.price)}</p>
//                 </div>
                
//                 <div className="p-3 border border-blue-100 rounded-lg bg-blue-50">
//                   <p className="mb-1 text-xs font-bold tracking-widest text-blue-600 uppercase">Grosir (Reseller)</p>
//                   {product.wholesale_price && product.wholesale_price > 0 ? (
//                     <p className="text-xl font-black text-blue-700">{formatRupiah(product.wholesale_price)}</p>
//                   ) : (
//                     <p className="text-sm font-bold text-blue-300">Tidak diset</p>
//                   )}
//                 </div>

//                 <div>
//                   <p className="mb-1 text-sm font-medium text-gray-500">Diskon Publik</p>
//                   {product.discount_price && product.discount_price > 0 ? (
//                     <p className="text-xl font-bold text-red-600">{formatRupiah(product.discount_price)}</p>
//                   ) : (
//                     <p className="text-xl font-bold text-gray-300">-</p>
//                   )}
//                 </div>
                
//                 <div className="p-3 border rounded-lg bg-amber-50 border-amber-100">
//                   <p className="mb-1 text-xs font-bold tracking-widest uppercase text-amber-600">Voucher Bos</p>
//                   {product.voucher_discount_price && product.voucher_discount_price > 0 ? (
//                     <p className="text-xl font-black text-amber-700">{formatRupiah(product.voucher_discount_price)}</p>
//                   ) : (
//                     <p className="text-sm font-bold text-amber-300">Tidak diset</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* 👇 HARGA INTERNASIONAL (MULTI-CURRENCY) 👇 */}
//             <div>
//               <h3 className="pb-2 mb-3 text-sm font-bold tracking-wider text-gray-900 uppercase border-b">Harga Internasional (Multi-Currency)</h3>
//               <div className="overflow-x-auto border border-gray-200 shadow-sm rounded-xl">
//                 <table className="w-full text-sm text-left text-gray-600">
//                   <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 font-bold">Mata Uang</th>
//                       <th className="px-6 py-3 font-bold">Base Price</th>
//                       <th className="px-6 py-3 font-bold text-blue-600">Wholesale</th>
//                       <th className="px-6 py-3 font-bold text-red-600">Discount</th>
//                       <th className="px-6 py-3 font-bold text-amber-600">Voucher</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {SUPPORTED_CURRENCIES.map((curr, idx) => {
//                       // Mengakses data JSON, pastikan aman dengan optional chaining
//                       const pPrices = typeof product.prices === 'string' ? JSON.parse(product.prices || '{}') : (product.prices || {});
//                       const pDiscounts = typeof product.discount_prices === 'string' ? JSON.parse(product.discount_prices || '{}') : (product.discount_prices || {});
//                       const pWholesale = typeof product.wholesale_prices === 'string' ? JSON.parse(product.wholesale_prices || '{}') : (product.wholesale_prices || {});
//                       const pVouchers = typeof product.voucher_discount_prices === 'string' ? JSON.parse(product.voucher_discount_prices || '{}') : (product.voucher_discount_prices || {});

//                       const base = pPrices[curr];
//                       const disc = pDiscounts[curr];
//                       const whole = pWholesale[curr];
//                       const vouch = pVouchers[curr];

//                       // Jangan render baris jika mata uang ini sama sekali tidak memiliki set harga
//                       if (!base && !disc && !whole && !vouch) return null;

//                       return (
//                         <tr key={curr} className={`border-b ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-gray-50`}>
//                           <td className="px-6 py-4 font-black text-gray-900">{curr}</td>
//                           <td className="px-6 py-4 font-semibold">{formatForeignCurrency(base, curr)}</td>
//                           <td className="px-6 py-4 font-bold text-blue-700">{formatForeignCurrency(whole, curr)}</td>
//                           <td className="px-6 py-4 font-bold text-red-600">{formatForeignCurrency(disc, curr)}</td>
//                           <td className="px-6 py-4 font-bold text-amber-700">{formatForeignCurrency(vouch, curr)}</td>
//                         </tr>
//                       );
//                     })}
//                     {/* Fallback jika tidak ada data mata uang asing sama sekali */}
//                     {SUPPORTED_CURRENCIES.every((curr) => {
//                        const pP = typeof product.prices === 'string' ? JSON.parse(product.prices || '{}') : (product.prices || {});
//                        return !pP[curr];
//                     }) && (
//                       <tr>
//                         <td colSpan={5} className="px-6 py-8 italic text-center text-gray-400">Belum ada pengaturan harga internasional.</td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             <div className="space-y-6">
              
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

// /* eslint-disable @typescript-eslint/no-unused-vars */
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
//   wholesale_price?: number | null; 
//   discount_price?: number | null; 
//   voucher_discount_price?: number | null;
//   // 👇 Bundle Properties
//   is_bundle_active?: boolean;
//   bundle_price?: number | null;
//   bundle_end_date?: string | null;
//   // 👇 Multi-currency properties
//   prices?: Record<string, string | number> | null;
//   discount_prices?: Record<string, string | number> | null;
//   wholesale_prices?: Record<string, string | number> | null;
//   voucher_discount_prices?: Record<string, string | number> | null;
//   bundle_prices?: Record<string, string | number> | null;
//   stock: number;
//   image_url: string;
//   variant_images?: string[]; 
//   variant_video?: string;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   color?: any[];
// }

// const SUPPORTED_CURRENCIES = ["USD", "SGD", "EUR", "AUD", "MYR"];

// export default function AdminProductDetail() {
//   const navigate = useNavigate(); 
//   const { slug } = useParams<{ slug: string }>();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
  
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const fetchProductDetail = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products/${slug}`);
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

//     if (slug) fetchProductDetail();
//   }, [slug, navigate]);

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

//     if (result.isConfirmed && product) {
//       try {
//         const token = localStorage.getItem("admin_token");
//         const res = await fetch(`${BASE_URL}/api/products/${product.id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } });
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
  
//   const formatForeignCurrency = (amount: number | string | undefined, currencyCode: string) => {
//     if (amount === undefined || amount === null || amount === "") return "-";
//     const num = Number(amount);
//     if (isNaN(num)) return "-";
//     return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(num);
//   };

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
//           <Link to={`/admin/products/${product.slug}/edit`} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg shadow-sm bg-gycora hover:bg-gycora-dark"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg> Edit Produk</Link>
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

//             {/* HARGA LOKAL IDR */}
//             <div>
//               <h3 className="pb-2 mb-3 text-sm font-bold tracking-wider text-gray-900 uppercase border-b">Harga Domestik (IDR)</h3>
//               <div className="grid grid-cols-1 gap-6 p-6 border border-gray-100 sm:grid-cols-2 lg:grid-cols-5 bg-gray-50 rounded-xl">
//                 <div>
//                   <p className="mb-1 text-sm font-medium text-gray-500">Harga Normal</p>
//                   <p className="text-xl font-bold text-gray-900">{formatRupiah(product.price)}</p>
//                 </div>
                
//                 <div className="p-3 border border-blue-100 rounded-lg bg-blue-50">
//                   <p className="mb-1 text-xs font-bold tracking-widest text-blue-600 uppercase">Grosir (Reseller)</p>
//                   {product.wholesale_price && product.wholesale_price > 0 ? (
//                     <p className="text-xl font-black text-blue-700">{formatRupiah(product.wholesale_price)}</p>
//                   ) : (
//                     <p className="text-sm font-bold text-blue-300">Tidak diset</p>
//                   )}
//                 </div>

//                 <div>
//                   <p className="mb-1 text-sm font-medium text-gray-500">Diskon Publik</p>
//                   {product.discount_price && product.discount_price > 0 ? (
//                     <p className="text-xl font-bold text-red-600">{formatRupiah(product.discount_price)}</p>
//                   ) : (
//                     <p className="text-xl font-bold text-gray-300">-</p>
//                   )}
//                 </div>
                
//                 <div className="p-3 border rounded-lg bg-amber-50 border-amber-100">
//                   <p className="mb-1 text-xs font-bold tracking-widest uppercase text-amber-600">Voucher Bos</p>
//                   {product.voucher_discount_price && product.voucher_discount_price > 0 ? (
//                     <p className="text-xl font-black text-amber-700">{formatRupiah(product.voucher_discount_price)}</p>
//                   ) : (
//                     <p className="text-sm font-bold text-amber-300">Tidak diset</p>
//                   )}
//                 </div>

//                 {/* INFO HARGA BUNDLE */}
//                 <div className="p-3 border border-purple-100 rounded-lg bg-purple-50">
//                   <p className="mb-1 text-xs font-bold tracking-widest text-purple-600 uppercase">Bundle Price</p>
//                   {product.is_bundle_active && product.bundle_price && product.bundle_price > 0 ? (
//                     <div>
//                       <p className="text-xl font-black text-purple-700">{formatRupiah(product.bundle_price)}</p>
//                       {product.bundle_end_date && (
//                         <p className="mt-1 text-[10px] font-semibold text-purple-500">
//                           s/d {new Date(product.bundle_end_date).toLocaleString('id-ID')}
//                         </p>
//                       )}
//                     </div>
//                   ) : (
//                     <p className="text-sm font-bold text-purple-300">Tidak aktif</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* 👇 HARGA INTERNASIONAL (MULTI-CURRENCY) 👇 */}
//             <div>
//               <h3 className="pb-2 mb-3 text-sm font-bold tracking-wider text-gray-900 uppercase border-b">Harga Internasional (Multi-Currency)</h3>
//               <div className="overflow-x-auto border border-gray-200 shadow-sm rounded-xl">
//                 <table className="w-full text-sm text-left text-gray-600">
//                   <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 font-bold">Mata Uang</th>
//                       <th className="px-6 py-3 font-bold">Base Price</th>
//                       <th className="px-6 py-3 font-bold text-blue-600">Wholesale</th>
//                       <th className="px-6 py-3 font-bold text-red-600">Discount</th>
//                       <th className="px-6 py-3 font-bold text-amber-600">Voucher</th>
//                       <th className="px-6 py-3 font-bold text-purple-600">Bundle</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {SUPPORTED_CURRENCIES.map((curr, idx) => {
//                       const pPrices = typeof product.prices === 'string' ? JSON.parse(product.prices || '{}') : (product.prices || {});
//                       const pDiscounts = typeof product.discount_prices === 'string' ? JSON.parse(product.discount_prices || '{}') : (product.discount_prices || {});
//                       const pWholesale = typeof product.wholesale_prices === 'string' ? JSON.parse(product.wholesale_prices || '{}') : (product.wholesale_prices || {});
//                       const pVouchers = typeof product.voucher_discount_prices === 'string' ? JSON.parse(product.voucher_discount_prices || '{}') : (product.voucher_discount_prices || {});
//                       const pBundles = typeof product.bundle_prices === 'string' ? JSON.parse(product.bundle_prices || '{}') : (product.bundle_prices || {});

//                       const base = pPrices[curr];
//                       const disc = pDiscounts[curr];
//                       const whole = pWholesale[curr];
//                       const vouch = pVouchers[curr];
//                       const bundle = pBundles[curr];

//                       // Jangan render baris jika mata uang ini sama sekali tidak memiliki set harga apapun
//                       if (!base && !disc && !whole && !vouch && !bundle) return null;

//                       return (
//                         <tr key={curr} className={`border-b ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-gray-50`}>
//                           <td className="px-6 py-4 font-black text-gray-900">{curr}</td>
//                           <td className="px-6 py-4 font-semibold">{formatForeignCurrency(base, curr)}</td>
//                           <td className="px-6 py-4 font-bold text-blue-700">{formatForeignCurrency(whole, curr)}</td>
//                           <td className="px-6 py-4 font-bold text-red-600">{formatForeignCurrency(disc, curr)}</td>
//                           <td className="px-6 py-4 font-bold text-amber-700">{formatForeignCurrency(vouch, curr)}</td>
//                           <td className="px-6 py-4 font-bold text-purple-700">{formatForeignCurrency(bundle, curr)}</td>
//                         </tr>
//                       );
//                     })}
//                     {/* Fallback jika tidak ada data mata uang asing sama sekali */}
//                     {SUPPORTED_CURRENCIES.every((curr) => {
//                        const pP = typeof product.prices === 'string' ? JSON.parse(product.prices || '{}') : (product.prices || {});
//                        return !pP[curr];
//                     }) && (
//                       <tr>
//                         <td colSpan={6} className="px-6 py-8 italic text-center text-gray-400">Belum ada pengaturan harga internasional.</td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             <div className="space-y-6">
              
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

// /* eslint-disable @typescript-eslint/no-unused-vars */
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
//   wholesale_price?: number | null; 
//   discount_price?: number | null; 
//   voucher_discount_price?: number | null;
//   // 👇 Bundle Properties
//   is_bundle_active?: boolean;
//   bundle_price?: number | null;
//   bundle_start_date?: string | null; // <-- UPDATE
//   bundle_end_date?: string | null;
//   // 👇 Multi-currency properties
//   prices?: Record<string, string | number> | null;
//   discount_prices?: Record<string, string | number> | null;
//   wholesale_prices?: Record<string, string | number> | null;
//   voucher_discount_prices?: Record<string, string | number> | null;
//   bundle_prices?: Record<string, string | number> | null;
//   stock: number;
//   image_url: string;
//   variant_images?: string[]; 
//   variant_video?: string;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   color?: any[];
// }

// const SUPPORTED_CURRENCIES = ["USD", "SGD", "EUR", "AUD", "MYR"];

// export default function AdminProductDetail() {
//   const navigate = useNavigate(); 
//   const { slug } = useParams<{ slug: string }>();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
  
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const fetchProductDetail = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products/${slug}`);
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

//     if (slug) fetchProductDetail();
//   }, [slug, navigate]);

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

//     if (result.isConfirmed && product) {
//       try {
//         const token = localStorage.getItem("admin_token");
//         const res = await fetch(`${BASE_URL}/api/products/${product.id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } });
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
  
//   const formatForeignCurrency = (amount: number | string | undefined, currencyCode: string) => {
//     if (amount === undefined || amount === null || amount === "") return "-";
//     const num = Number(amount);
//     if (isNaN(num)) return "-";
//     return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(num);
//   };

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
//           <Link to={`/admin/products/${product.slug}/edit`} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg shadow-sm bg-gycora hover:bg-gycora-dark"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg> Edit Produk</Link>
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

//             {/* HARGA LOKAL IDR */}
//             <div>
//               <h3 className="pb-2 mb-3 text-sm font-bold tracking-wider text-gray-900 uppercase border-b">Harga Domestik (IDR)</h3>
//               <div className="grid grid-cols-1 gap-6 p-6 border border-gray-100 sm:grid-cols-2 lg:grid-cols-5 bg-gray-50 rounded-xl">
//                 <div>
//                   <p className="mb-1 text-sm font-medium text-gray-500">Harga Normal</p>
//                   <p className="text-xl font-bold text-gray-900">{formatRupiah(product.price)}</p>
//                 </div>
                
//                 <div className="p-3 border border-blue-100 rounded-lg bg-blue-50">
//                   <p className="mb-1 text-xs font-bold tracking-widest text-blue-600 uppercase">Grosir (Reseller)</p>
//                   {product.wholesale_price && product.wholesale_price > 0 ? (
//                     <p className="text-xl font-black text-blue-700">{formatRupiah(product.wholesale_price)}</p>
//                   ) : (
//                     <p className="text-sm font-bold text-blue-300">Tidak diset</p>
//                   )}
//                 </div>

//                 <div>
//                   <p className="mb-1 text-sm font-medium text-gray-500">Diskon Publik</p>
//                   {product.discount_price && product.discount_price > 0 ? (
//                     <p className="text-xl font-bold text-red-600">{formatRupiah(product.discount_price)}</p>
//                   ) : (
//                     <p className="text-xl font-bold text-gray-300">-</p>
//                   )}
//                 </div>
                
//                 <div className="p-3 border rounded-lg bg-amber-50 border-amber-100">
//                   <p className="mb-1 text-xs font-bold tracking-widest uppercase text-amber-600">Voucher Bos</p>
//                   {product.voucher_discount_price && product.voucher_discount_price > 0 ? (
//                     <p className="text-xl font-black text-amber-700">{formatRupiah(product.voucher_discount_price)}</p>
//                   ) : (
//                     <p className="text-sm font-bold text-amber-300">Tidak diset</p>
//                   )}
//                 </div>

//                 {/* INFO HARGA BUNDLE (SUDAH DENGAN RENTANG WAKTU) */}
//                 <div className="p-3 border border-purple-100 rounded-lg bg-purple-50">
//                   <p className="mb-1 text-xs font-bold tracking-widest text-purple-600 uppercase">Bundle Price</p>
//                   {product.is_bundle_active && product.bundle_price && product.bundle_price > 0 ? (
//                     <div>
//                       <p className="text-xl font-black text-purple-700">{formatRupiah(product.bundle_price)}</p>
//                       {(product.bundle_start_date || product.bundle_end_date) && (
//                         <p className="mt-1 text-[10px] font-semibold text-purple-500">
//                           {product.bundle_start_date ? new Date(product.bundle_start_date).toLocaleDateString('id-ID') : "Sekarang"} 
//                           {" s/d "} 
//                           {product.bundle_end_date ? new Date(product.bundle_end_date).toLocaleDateString('id-ID') : "Seterusnya"}
//                         </p>
//                       )}
//                     </div>
//                   ) : (
//                     <p className="text-sm font-bold text-purple-300">Tidak aktif</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* 👇 HARGA INTERNASIONAL (MULTI-CURRENCY) 👇 */}
//             <div>
//               <h3 className="pb-2 mb-3 text-sm font-bold tracking-wider text-gray-900 uppercase border-b">Harga Internasional (Multi-Currency)</h3>
//               <div className="overflow-x-auto border border-gray-200 shadow-sm rounded-xl">
//                 <table className="w-full text-sm text-left text-gray-600">
//                   <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 font-bold">Mata Uang</th>
//                       <th className="px-6 py-3 font-bold">Base Price</th>
//                       <th className="px-6 py-3 font-bold text-blue-600">Wholesale</th>
//                       <th className="px-6 py-3 font-bold text-red-600">Discount</th>
//                       <th className="px-6 py-3 font-bold text-amber-600">Voucher</th>
//                       <th className="px-6 py-3 font-bold text-purple-600">Bundle</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {SUPPORTED_CURRENCIES.map((curr, idx) => {
//                       const pPrices = typeof product.prices === 'string' ? JSON.parse(product.prices || '{}') : (product.prices || {});
//                       const pDiscounts = typeof product.discount_prices === 'string' ? JSON.parse(product.discount_prices || '{}') : (product.discount_prices || {});
//                       const pWholesale = typeof product.wholesale_prices === 'string' ? JSON.parse(product.wholesale_prices || '{}') : (product.wholesale_prices || {});
//                       const pVouchers = typeof product.voucher_discount_prices === 'string' ? JSON.parse(product.voucher_discount_prices || '{}') : (product.voucher_discount_prices || {});
//                       const pBundles = typeof product.bundle_prices === 'string' ? JSON.parse(product.bundle_prices || '{}') : (product.bundle_prices || {});

//                       const base = pPrices[curr];
//                       const disc = pDiscounts[curr];
//                       const whole = pWholesale[curr];
//                       const vouch = pVouchers[curr];
//                       const bundle = pBundles[curr];

//                       // Jangan render baris jika mata uang ini sama sekali tidak memiliki set harga apapun
//                       if (!base && !disc && !whole && !vouch && !bundle) return null;

//                       return (
//                         <tr key={curr} className={`border-b ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-gray-50`}>
//                           <td className="px-6 py-4 font-black text-gray-900">{curr}</td>
//                           <td className="px-6 py-4 font-semibold">{formatForeignCurrency(base, curr)}</td>
//                           <td className="px-6 py-4 font-bold text-blue-700">{formatForeignCurrency(whole, curr)}</td>
//                           <td className="px-6 py-4 font-bold text-red-600">{formatForeignCurrency(disc, curr)}</td>
//                           <td className="px-6 py-4 font-bold text-amber-700">{formatForeignCurrency(vouch, curr)}</td>
//                           <td className="px-6 py-4 font-bold text-purple-700">{formatForeignCurrency(bundle, curr)}</td>
//                         </tr>
//                       );
//                     })}
//                     {/* Fallback jika tidak ada data mata uang asing sama sekali */}
//                     {SUPPORTED_CURRENCIES.every((curr) => {
//                        const pP = typeof product.prices === 'string' ? JSON.parse(product.prices || '{}') : (product.prices || {});
//                        return !pP[curr];
//                     }) && (
//                       <tr>
//                         <td colSpan={6} className="px-6 py-8 italic text-center text-gray-400">Belum ada pengaturan harga internasional.</td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             <div className="space-y-6">
              
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

/* eslint-disable @typescript-eslint/no-unused-vars */
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
  wholesale_price?: number | null; 
  discount_price?: number | null; 
  voucher_discount_price?: number | null;
  // 👇 Bundle Properties
  is_bundle_active?: boolean;
  bundle_price?: number | null;
  bundle_start_date?: string | null;
  bundle_end_date?: string | null;
  // 👇 Multi-currency properties
  prices?: Record<string, string | number> | null;
  discount_prices?: Record<string, string | number> | null;
  wholesale_prices?: Record<string, string | number> | null;
  voucher_discount_prices?: Record<string, string | number> | null;
  bundle_prices?: Record<string, string | number> | null;
  stock: number;
  image_url: string;
  variant_images?: string[]; 
  variant_video?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  color?: any[];
}

const SUPPORTED_CURRENCIES = ["USD", "SGD", "EUR", "AUD", "MYR"];

export default function AdminProductDetail() {
  const navigate = useNavigate(); 
  const { slug } = useParams<{ slug: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products/${slug}`);
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

    if (slug) fetchProductDetail();
  }, [slug, navigate]);

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

    if (result.isConfirmed && product) {
      try {
        const token = localStorage.getItem("admin_token");
        const res = await fetch(`${BASE_URL}/api/products/${product.id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } });
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
  
  const formatForeignCurrency = (amount: number | string | undefined, currencyCode: string) => {
    if (amount === undefined || amount === null || amount === "") return "-";
    const num = Number(amount);
    if (isNaN(num)) return "-";
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(num);
  };

  if (loading) return <div className="flex justify-center items-center h-[calc(100vh-4rem)]"><div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div></div>;
  if (!product) return null;

  return (
    <div className="max-w-6xl p-4 mx-auto space-y-6 md:p-8 font-sans animate-fade-in">
      
      {/* Top Navigation */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/admin/products")} className="p-2 text-gray-400 transition-colors border border-gray-200 rounded-lg hover:text-gray-900 hover:bg-white bg-gray-50"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg></button>
          <h1 className="text-2xl font-bold text-gray-900">Detail Produk</h1>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Link to={`/admin/products/${product.slug}/edit`} className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg shadow-sm bg-gycora hover:bg-gycora-dark"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg> Edit</Link>
          <button onClick={handleDelete} className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 transition-colors rounded-lg bg-red-50 hover:bg-red-100"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> Nonaktifkan</button>
        </div>
      </div>

      <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          
          <div className="flex flex-col items-center p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-100 bg-gray-50">
            {gallery.length > 0 ? (
              <div className="relative flex flex-col items-center w-full max-w-sm group">
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
              <div className="flex flex-col items-center justify-center w-full max-w-sm space-y-3 text-gray-400 aspect-square">
                <svg className="w-16 h-16 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span className="text-sm font-medium">Belum ada gambar</span>
              </div>
            )}

            {product.variant_video && (
              <div className="w-full mt-8 max-w-sm">
                <h3 className="mb-2 text-xs font-bold tracking-widest text-gray-500 uppercase">Video Demo</h3>
                <video src={product.variant_video} controls className="object-contain w-full bg-black rounded-lg shadow-sm h-44" />
              </div>
            )}
          </div>

          <div className="p-6 lg:p-8 space-y-8 lg:col-span-2 min-w-0">
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gycora-light text-gycora-dark">{product.category?.name || "Uncategorized"}</span>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">SKU: {product.sku}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 break-words leading-tight">{product.name}</h2>
              <p className="text-sm text-gray-400 break-all">Slug: <span className="font-mono text-gray-500">{product.slug}</span></p>
            </div>

            {/* 👇 HARGA LOKAL IDR - FIX LAYOUT (FLEX WRAP + SCROLL KESAMPING) 👇 */}
            <div>
              <h3 className="pb-2 mb-4 text-sm font-bold tracking-wider text-gray-900 uppercase border-b border-gray-100">Harga Domestik (IDR)</h3>
              <div className="flex flex-wrap gap-4 bg-gray-50 p-4 border border-gray-100 rounded-xl">
                
                {/* Normal */}
                <div className="flex-1 min-w-[160px] max-w-full flex flex-col p-4 bg-white border border-gray-200 shadow-sm rounded-xl overflow-x-auto custom-scrollbar">
                  <p className="mb-1 text-[10px] font-bold tracking-widest text-gray-400 uppercase whitespace-nowrap">Harga Normal</p>
                  <p className="text-base xl:text-lg font-black text-gray-900 whitespace-nowrap pb-1">{formatRupiah(product.price)}</p>
                </div>
                
                {/* Grosir */}
                <div className="flex-1 min-w-[160px] max-w-full flex flex-col p-4 bg-blue-50 border border-blue-100 shadow-sm rounded-xl overflow-x-auto custom-scrollbar">
                  <p className="mb-1 text-[10px] font-bold tracking-widest text-blue-500 uppercase whitespace-nowrap">Grosir</p>
                  {product.wholesale_price && product.wholesale_price > 0 ? (
                    <p className="text-base xl:text-lg font-black text-blue-700 whitespace-nowrap pb-1">{formatRupiah(product.wholesale_price)}</p>
                  ) : (
                    <p className="text-sm font-bold text-blue-300 whitespace-nowrap pb-1">Tidak diset</p>
                  )}
                </div>

                {/* Diskon */}
                <div className="flex-1 min-w-[160px] max-w-full flex flex-col p-4 bg-rose-50 border border-rose-100 shadow-sm rounded-xl overflow-x-auto custom-scrollbar">
                  <p className="mb-1 text-[10px] font-bold tracking-widest text-rose-500 uppercase whitespace-nowrap">Diskon Publik</p>
                  {product.discount_price && product.discount_price > 0 ? (
                    <p className="text-base xl:text-lg font-black text-rose-700 whitespace-nowrap pb-1">{formatRupiah(product.discount_price)}</p>
                  ) : (
                    <p className="text-sm font-bold text-rose-300 whitespace-nowrap pb-1">-</p>
                  )}
                </div>
                
                {/* Voucher */}
                <div className="flex-1 min-w-[160px] max-w-full flex flex-col p-4 bg-amber-50 border border-amber-100 shadow-sm rounded-xl overflow-x-auto custom-scrollbar">
                  <p className="mb-1 text-[10px] font-bold tracking-widest text-amber-500 uppercase whitespace-nowrap">Voucher Bos</p>
                  {product.voucher_discount_price && product.voucher_discount_price > 0 ? (
                    <p className="text-base xl:text-lg font-black text-amber-700 whitespace-nowrap pb-1">{formatRupiah(product.voucher_discount_price)}</p>
                  ) : (
                    <p className="text-sm font-bold text-amber-300 whitespace-nowrap pb-1">Tidak diset</p>
                  )}
                </div>

                {/* Bundle */}
                <div className="flex-1 min-w-[160px] max-w-full flex flex-col p-4 bg-purple-50 border border-purple-100 shadow-sm rounded-xl overflow-x-auto custom-scrollbar">
                  <p className="mb-1 text-[10px] font-bold tracking-widest text-purple-600 uppercase whitespace-nowrap">Bundle Price</p>
                  {product.is_bundle_active && product.bundle_price && product.bundle_price > 0 ? (
                    <div>
                      <p className="text-base xl:text-lg font-black text-purple-700 whitespace-nowrap pb-1">{formatRupiah(product.bundle_price)}</p>
                      {(product.bundle_start_date || product.bundle_end_date) && (
                        <p className="mt-1 text-[10px] font-semibold text-purple-500 leading-tight whitespace-nowrap">
                          {product.bundle_start_date ? new Date(product.bundle_start_date).toLocaleDateString('id-ID') : "Skrg"} 
                          {" - "} 
                          {product.bundle_end_date ? new Date(product.bundle_end_date).toLocaleDateString('id-ID') : "Seterusnya"}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm font-bold text-purple-300 whitespace-nowrap pb-1">Tidak aktif</p>
                  )}
                </div>
              </div>
            </div>

            {/* 👇 HARGA INTERNASIONAL (MULTI-CURRENCY) 👇 */}
            <div>
              <h3 className="pb-2 mb-4 text-sm font-bold tracking-wider text-gray-900 uppercase border-b border-gray-100">Harga Internasional (Multi-Currency)</h3>
              <div className="overflow-x-auto border border-gray-200 shadow-sm rounded-xl custom-scrollbar">
                <table className="w-full text-sm text-left text-gray-600 whitespace-nowrap">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 font-bold">Mata Uang</th>
                      <th className="px-6 py-3 font-bold">Base Price</th>
                      <th className="px-6 py-3 font-bold text-blue-600">Wholesale</th>
                      <th className="px-6 py-3 font-bold text-red-600">Discount</th>
                      <th className="px-6 py-3 font-bold text-amber-600">Voucher</th>
                      <th className="px-6 py-3 font-bold text-purple-600">Bundle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SUPPORTED_CURRENCIES.map((curr, idx) => {
                      const pPrices = typeof product.prices === 'string' ? JSON.parse(product.prices || '{}') : (product.prices || {});
                      const pDiscounts = typeof product.discount_prices === 'string' ? JSON.parse(product.discount_prices || '{}') : (product.discount_prices || {});
                      const pWholesale = typeof product.wholesale_prices === 'string' ? JSON.parse(product.wholesale_prices || '{}') : (product.wholesale_prices || {});
                      const pVouchers = typeof product.voucher_discount_prices === 'string' ? JSON.parse(product.voucher_discount_prices || '{}') : (product.voucher_discount_prices || {});
                      const pBundles = typeof product.bundle_prices === 'string' ? JSON.parse(product.bundle_prices || '{}') : (product.bundle_prices || {});

                      const base = pPrices[curr];
                      const disc = pDiscounts[curr];
                      const whole = pWholesale[curr];
                      const vouch = pVouchers[curr];
                      const bundle = pBundles[curr];

                      if (!base && !disc && !whole && !vouch && !bundle) return null;

                      return (
                        <tr key={curr} className={`border-b ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-gray-50`}>
                          <td className="px-6 py-4 font-black text-gray-900">{curr}</td>
                          <td className="px-6 py-4 font-semibold">{formatForeignCurrency(base, curr)}</td>
                          <td className="px-6 py-4 font-bold text-blue-700">{formatForeignCurrency(whole, curr)}</td>
                          <td className="px-6 py-4 font-bold text-red-600">{formatForeignCurrency(disc, curr)}</td>
                          <td className="px-6 py-4 font-bold text-amber-700">{formatForeignCurrency(vouch, curr)}</td>
                          <td className="px-6 py-4 font-bold text-purple-700">{formatForeignCurrency(bundle, curr)}</td>
                        </tr>
                      );
                    })}
                    {SUPPORTED_CURRENCIES.every((curr) => {
                       const pP = typeof product.prices === 'string' ? JSON.parse(product.prices || '{}') : (product.prices || {});
                       return !pP[curr];
                    }) && (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 italic text-center text-gray-400">Belum ada pengaturan harga internasional.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-6">
              
              {Array.isArray(product.color) && product.color.length > 0 && (
                <div>
                  <h3 className="pb-2 mb-4 text-sm font-bold tracking-wider text-gray-900 uppercase border-b border-gray-100">Varian Warna</h3>
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
                <h3 className="pb-2 mb-4 text-sm font-bold tracking-wider text-gray-900 uppercase border-b border-gray-100">Deskripsi Produk</h3>
                <div className="prose-sm prose text-gray-600 max-w-none">
                  {product.description ? <p className="leading-relaxed whitespace-pre-wrap">{product.description}</p> : <p className="italic text-gray-400">Tidak ada deskripsi.</p>}
                </div>
              </div>

              <div>
                <h3 className="pb-2 mb-4 text-sm font-bold tracking-wider text-gray-900 uppercase border-b border-gray-100">Manfaat (Benefits)</h3>
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