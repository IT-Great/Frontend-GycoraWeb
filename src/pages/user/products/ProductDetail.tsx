/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom"; // Ganti dari next/navigation
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
//   sku: string;
//   name: string;
//   slug: string;
//   description: string;
//   benefits: string;
//   price: number;
//   stock: number;
//   image_url: string;
// }

// export default function ProductDetail() {
//   const { id } = useParams<{ id: string }>(); // Tangkap ID dari URL params
//   const navigate = useNavigate(); // Ganti useRouter

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const [isAdding, setIsAdding] = useState(false);

//   const { fetchCart, setIsCartOpen } = useCart();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products/${id}`);
//         if (!res.ok) throw new Error("Produk tidak ditemukan");
//         const responseData = await res.json();
//         // --- PERBAIKAN DI SINI ---
//         // Jika dibungkus "data" oleh Laravel Resource, ambil isinya.
//         const productObject = responseData.data ? responseData.data : responseData;
//         setProduct(productObject);
//       } catch (error) {
//         console.error("Gagal memuat produk:", error);
//         navigate("/products");
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (id) fetchProduct();
//   }, [id, navigate]);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
//   };

//   const handleAddToCart = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk mulai berbelanja.",
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: "Ke Halaman Login"
//       }).then(() => navigate("/login"));
//       return;
//     }

//     setIsAdding(true);

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity
//         })
//       });

//       const data = await res.json();

//       if (res.ok) {
//         // ANIMASI GAMBAR TERBANG
//         const startEl = document.getElementById("product-image");
//         const endEl = document.getElementById("cart-icon");

//         if (startEl && endEl && product?.image_url) {
//           const startRect = startEl.getBoundingClientRect();
//           const endRect = endEl.getBoundingClientRect();

//           const flyingImg = document.createElement("img");
//           flyingImg.src = product.image_url;
//           flyingImg.style.position = "fixed";
//           flyingImg.style.top = `${startRect.top}px`;
//           flyingImg.style.left = `${startRect.left}px`;
//           flyingImg.style.width = `${startRect.width}px`;
//           flyingImg.style.height = `${startRect.height}px`;
//           flyingImg.style.borderRadius = "10%";
//           flyingImg.style.zIndex = "9999";
//           flyingImg.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//           document.body.appendChild(flyingImg);

//           requestAnimationFrame(() => {
//             flyingImg.style.top = `${endRect.top + 10}px`;
//             flyingImg.style.left = `${endRect.left + 10}px`;
//             flyingImg.style.width = "20px";
//             flyingImg.style.height = "20px";
//             flyingImg.style.opacity = "0.2";
//             flyingImg.style.borderRadius = "50%";
//           });

//           setTimeout(() => {
//             flyingImg.remove();
//             fetchCart();
//             setIsCartOpen(true);
//           }, 800);
//         } else {
//            fetchCart();
//            setIsCartOpen(true);
//         }
//       } else {
//         Swal.fire("Gagal", data.message || "Stok tidak mencukupi", "error");
//       }
//     } catch (error) {
//         console.error("Gagal add to cart:", error);
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   if (loading) return <div className="flex items-center justify-center min-h-screen font-sans bg-white"><div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div></div>;
//   if (!product) return null;
//   const isOutOfStock = product.stock <= 0;

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">

//           {/* Image Section */}
//           <div className="relative bg-gray-50 rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-[4/5] mb-10 lg:mb-0 border border-gray-100">
//             {product.image_url ? (
//               <img
//                 id="product-image"
//                 src={product.image_url}
//                 alt={product.name}
//                 className="object-cover object-center w-full h-full"
//               />
//             ) : (
//               <div id="product-image" className="flex items-center justify-center w-full h-full text-gray-400 bg-gray-100">
//                 No Image
//               </div>
//             )}

//             <div className="absolute top-6 left-6">
//               <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                 {product.category_name}
//               </span>
//             </div>
//           </div>

//           {/* Product Details Section */}
//           <div className="flex flex-col justify-center">
//              <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">{product.name}</h1>
//              <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
//              <div className="mb-8"><p className="text-4xl font-extrabold text-gycora">{formatRupiah(product.price)}</p></div>

//              <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">
//                 <div className="flex items-center gap-4 mb-4">
//                   <span className="text-sm font-semibold text-gray-700">Status Ketersediaan:</span>
//                   {isOutOfStock ? (
//                     <span className="px-3 py-1 text-sm font-bold text-red-600 rounded-full bg-red-50">Stok Habis</span>
//                   ) : (
//                     <span className="px-3 py-1 text-sm font-bold rounded-full text-emerald-600 bg-emerald-50">Tersedia ({product.stock} Unit)</span>
//                   )}
//                 </div>

//                 <div className="flex flex-col gap-4 sm:flex-row">
//                   <div className="flex items-center justify-between w-full bg-white border border-gray-300 rounded-xl sm:w-32 h-14">
//                     <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={isOutOfStock} className="flex items-center justify-center w-10 h-full text-gray-600 transition-colors hover:text-gycora hover:bg-gray-50 rounded-l-xl disabled:opacity-50">-</button>
//                     <span className="font-bold text-gray-900">{quantity}</span>
//                     <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} disabled={isOutOfStock} className="flex items-center justify-center w-10 h-full text-gray-600 transition-colors hover:text-gycora hover:bg-gray-50 rounded-r-xl disabled:opacity-50">+</button>
//                   </div>

//                   <button
//                     onClick={handleAddToCart}
//                     disabled={isOutOfStock || isAdding}
//                     className={`flex-1 h-14 rounded-xl text-lg font-bold transition-all ${
//                       isOutOfStock
//                         ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                         : 'bg-gycora text-white hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:shadow-[0_6px_20px_rgba(5,150,105,0.23)] hover:-translate-y-0.5'
//                     }`}
//                   >
//                     {isAdding ? "Menambahkan..." : (isOutOfStock ? 'Tidak Tersedia' : 'Tambah ke Keranjang')}
//                   </button>
//                 </div>
//              </div>

//              <div className="space-y-8">
//                 <div>
//                   <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">Tentang Produk Ini</h3>
//                   <div className="leading-relaxed prose-sm prose text-gray-600 whitespace-pre-wrap sm:prose max-w-none">{product.description}</div>
//                 </div>
//                 {product.benefits && (
//                   <div>
//                     <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">Manfaat Utama</h3>
//                     <div className="p-5 border border-pink-100 bg-pink-50/50 rounded-2xl">
//                       <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">{product.benefits}</p>
//                     </div>
//                   </div>
//                 )}
//              </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
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

// export default function ProductDetail() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const [isAdding, setIsAdding] = useState(false);

//   // State untuk Varian
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);

//   const { fetchCart } = useCart(); // Hapus setIsCartOpen karena kita akan redirect

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products/${id}`);
//         if (!res.ok) throw new Error("Produk tidak ditemukan");
//         const responseData = await res.json();

//         const productObject = responseData.data ? responseData.data : responseData;
//         setProduct(productObject);

//         // Pilih warna pertama secara default jika ada
//         if (productObject.color && Array.isArray(productObject.color) && productObject.color.length > 0) {
//           setSelectedColor(productObject.color[0]);
//         }

//       } catch (error) {
//         console.error("Gagal memuat produk:", error);
//         navigate("/products");
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (id) fetchProduct();
//   }, [id, navigate]);

//   // --- LOGIKA CAROUSEL ---
//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
//   };

//   const handleAddToCart = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk mulai berbelanja.",
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: "Ke Halaman Login"
//       }).then(() => navigate("/login"));
//       return;
//     }

//     if (product?.color && product.color.length > 0 && !selectedColor) {
//        Swal.fire("Pilih Warna", "Silakan pilih varian warna terlebih dahulu.", "warning");
//        return;
//     }

//     setIsAdding(true);

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: selectedColor // Kirim warna yang dipilih ke backend
//         })
//       });

//       const data = await res.json();

//       if (res.ok) {
//         // ANIMASI GAMBAR TERBANG
//         const startEl = document.getElementById("product-image");
//         const endEl = document.getElementById("cart-icon");

//         if (startEl && endEl && gallery.length > 0) {
//           const startRect = startEl.getBoundingClientRect();
//           const endRect = endEl.getBoundingClientRect();

//           const flyingImg = document.createElement("img");
//           flyingImg.src = gallery[currentImageIndex]; // Terbang menggunakan gambar yang sedang dilihat
//           flyingImg.style.position = "fixed";
//           flyingImg.style.top = `${startRect.top}px`;
//           flyingImg.style.left = `${startRect.left}px`;
//           flyingImg.style.width = `${startRect.width}px`;
//           flyingImg.style.height = `${startRect.height}px`;
//           flyingImg.style.borderRadius = "10%";
//           flyingImg.style.zIndex = "9999";
//           flyingImg.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//           document.body.appendChild(flyingImg);

//           requestAnimationFrame(() => {
//             flyingImg.style.top = `${endRect.top + 10}px`;
//             flyingImg.style.left = `${endRect.left + 10}px`;
//             flyingImg.style.width = "20px";
//             flyingImg.style.height = "20px";
//             flyingImg.style.opacity = "0.2";
//             flyingImg.style.borderRadius = "50%";
//           });

//           // Redirect ke halaman /cart setelah animasi selesai (800ms)
//           setTimeout(() => {
//             flyingImg.remove();
//             fetchCart();
//             navigate("/cart");
//           }, 800);

//         } else {
//            fetchCart();
//            navigate("/cart");
//         }
//       } else {
//         Swal.fire("Gagal", data.message || "Stok tidak mencukupi", "error");
//       }
//     } catch (error) {
//         console.error("Gagal add to cart:", error);
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   if (loading) return <div className="flex items-center justify-center min-h-screen font-sans bg-white"><div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div></div>;
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">

//           {/* KIRI: MEDIA SECTION */}
//           <div className="flex flex-col mb-10 lg:mb-0">
//             {/* CAROUSEL GAMBAR (Instan) */}
//             <div id="product-image" className="relative group bg-gray-50 rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-[4/5] border border-gray-100 flex items-center justify-center">
//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-cover object-center w-full h-full transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
//                     />
//                   ))}

//                   {/* Tombol Kiri Kanan Carousel */}
//                   {gallery.length > 1 && (
//                     <>
//                       <button onClick={prevImage} className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                       </button>
//                       <button onClick={nextImage} className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                       </button>

//                       {/* Dots Indicator */}
//                       <div className="absolute z-20 flex gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`h-2 rounded-full transition-all shadow-sm ${idx === currentImageIndex ? 'bg-gycora w-6' : 'bg-white/80 hover:bg-white w-2'}`} />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">No Image</div>
//               )}

//               <div className="absolute z-20 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {/* VIDEO DEMO PLAYER */}
//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">Video Demo</h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video src={product.variant_video} controls className="object-contain w-full h-64 md:h-80" />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* KANAN: PRODUCT DETAILS SECTION */}
//           <div className="flex flex-col justify-center">
//              <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">{product.name}</h1>
//              <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
//              <div className="mb-8"><p className="text-4xl font-extrabold text-gycora">{formatRupiah(product.price)}</p></div>

//              <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">

//                 {/* VARIAN WARNA */}
//                 {Array.isArray(product.color) && product.color.length > 0 && (
//                   <div className="pb-6 mb-6 border-b border-gray-200">
//                     <h3 className="mb-3 text-sm font-bold text-gray-700">Pilih Varian Warna:</h3>
//                     <div className="flex flex-wrap gap-3">
//                       {product.color.map((colorHex, idx) => (
//                         <button
//                           key={idx}
//                           onClick={() => setSelectedColor(colorHex)}
//                           className={`w-10 h-10 rounded-full border-2 transition-all shadow-sm ${selectedColor === colorHex ? 'border-gycora ring-2 ring-gycora/30 scale-110' : 'border-gray-200 hover:scale-105'}`}
//                           style={{ backgroundColor: colorHex }}
//                           title={`Pilih warna ${colorHex}`}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex items-center gap-4 mb-4">
//                   <span className="text-sm font-semibold text-gray-700">Status Ketersediaan:</span>
//                   {isOutOfStock ? (
//                     <span className="px-3 py-1 text-sm font-bold text-red-600 rounded-full bg-red-50">Stok Habis</span>
//                   ) : (
//                     <span className="px-3 py-1 text-sm font-bold rounded-full text-emerald-600 bg-emerald-50">Tersedia ({product.stock} Unit)</span>
//                   )}
//                 </div>

//                 <div className="flex flex-col gap-4 sm:flex-row">
//                   <div className="flex items-center justify-between w-full bg-white border border-gray-300 rounded-xl sm:w-32 h-14">
//                     <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={isOutOfStock} className="flex items-center justify-center w-10 h-full text-gray-600 transition-colors hover:text-gycora hover:bg-gray-50 rounded-l-xl disabled:opacity-50">-</button>
//                     <span className="font-bold text-gray-900">{quantity}</span>
//                     <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} disabled={isOutOfStock} className="flex items-center justify-center w-10 h-full text-gray-600 transition-colors hover:text-gycora hover:bg-gray-50 rounded-r-xl disabled:opacity-50">+</button>
//                   </div>

//                   <button
//                     onClick={handleAddToCart}
//                     disabled={isOutOfStock || isAdding}
//                     className={`flex-1 h-14 rounded-xl text-lg font-bold transition-all ${
//                       isOutOfStock
//                         ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                         : 'bg-gycora text-white hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:shadow-[0_6px_20px_rgba(5,150,105,0.23)] hover:-translate-y-0.5'
//                     }`}
//                   >
//                     {isAdding ? "Memproses..." : (isOutOfStock ? 'Tidak Tersedia' : 'Beli Sekarang')}
//                   </button>
//                 </div>
//              </div>

//              <div className="space-y-8">
//                 <div>
//                   <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">Tentang Produk Ini</h3>
//                   <div className="leading-relaxed prose-sm prose text-gray-600 whitespace-pre-wrap sm:prose max-w-none">{product.description}</div>
//                 </div>
//                 {product.benefits && (
//                   <div>
//                     <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">Manfaat Utama</h3>
//                     <div className="p-5 border border-emerald-100 bg-emerald-50/50 rounded-2xl">
//                       <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">{product.benefits}</p>
//                     </div>
//                   </div>
//                 )}
//              </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
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

// export default function ProductDetail() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const [isAdding, setIsAdding] = useState(false);

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);

//   // Ambil isi keranjang saat ini untuk logika penyaringan varian
//   const { cartItems, fetchCart } = useCart();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products/${id}`);
//         if (!res.ok) throw new Error("Produk tidak ditemukan");
//         const responseData = await res.json();

//         const productObject = responseData.data ? responseData.data : responseData;
//         setProduct(productObject);
//       } catch (error) {
//         console.error("Gagal memuat produk:", error);
//         navigate("/products");
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (id) fetchProduct();
//   }, [id, navigate]);

//   // =========================================================================
//   // LOGIKA PENYARINGAN VARIAN BERDASARKAN ISI KERANJANG
//   // =========================================================================

//   // 1. Cari warna apa saja dari produk ini yang SUDAH ada di keranjang
//   const colorsAlreadyInCart = useMemo(() => {
//     if (!product) return [];
//     return cartItems
//       .filter((item: any) => item.product.id === product.id && item.color)
//       .map((item: any) => item.color);
//   }, [cartItems, product]);

//   // 2. Saring warna yang MASIH BISA dipilih
//   const availableColors = useMemo(() => {
//     if (!product || !Array.isArray(product.color)) return [];
//     return product.color.filter(c => !colorsAlreadyInCart.includes(c));
//   }, [product, colorsAlreadyInCart]);

//   // 3. Logika: Apakah SELURUH varian (atau produk jika tak punya varian) sudah masuk keranjang?
//   const isFullyInCart = useMemo(() => {
//     if (!product) return false;
//     const hasColors = Array.isArray(product.color) && product.color.length > 0;

//     if (hasColors) {
//       // Jika punya warna, tapi sisa warna yang tersedia = 0
//       return availableColors.length === 0;
//     } else {
//       // Jika tak punya warna, cek apakah ID produk ini sudah ada di keranjang
//       return cartItems.some((item: any) => item.product.id === product.id);
//     }
//   }, [product, availableColors, cartItems]);

//   // 4. Auto-select warna pertama yang tersedia
//   useEffect(() => {
//     if (availableColors.length > 0 && (!selectedColor || !availableColors.includes(selectedColor))) {
//       setSelectedColor(availableColors[0]);
//     }
//   }, [availableColors, selectedColor]);

//   // =========================================================================

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
//   };

//   const handleAddToCart = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk mulai berbelanja.",
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: "Ke Halaman Login"
//       }).then(() => navigate("/login"));
//       return;
//     }

//     if (product?.color && product.color.length > 0 && !selectedColor) {
//        Swal.fire("Pilih Warna", "Silakan pilih varian warna terlebih dahulu.", "warning");
//        return;
//     }

//     setIsAdding(true);

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: selectedColor
//         })
//       });

//       const data = await res.json();

//       if (res.ok) {
//         const startEl = document.getElementById("product-image");
//         const endEl = document.getElementById("cart-icon");

//         if (startEl && endEl && gallery.length > 0) {
//           const startRect = startEl.getBoundingClientRect();
//           const endRect = endEl.getBoundingClientRect();

//           const flyingImg = document.createElement("img");
//           flyingImg.src = gallery[currentImageIndex];
//           flyingImg.style.position = "fixed";
//           flyingImg.style.top = `${startRect.top}px`;
//           flyingImg.style.left = `${startRect.left}px`;
//           flyingImg.style.width = `${startRect.width}px`;
//           flyingImg.style.height = `${startRect.height}px`;
//           flyingImg.style.borderRadius = "10%";
//           flyingImg.style.zIndex = "9999";
//           flyingImg.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//           document.body.appendChild(flyingImg);

//           requestAnimationFrame(() => {
//             flyingImg.style.top = `${endRect.top + 10}px`;
//             flyingImg.style.left = `${endRect.left + 10}px`;
//             flyingImg.style.width = "20px";
//             flyingImg.style.height = "20px";
//             flyingImg.style.opacity = "0.2";
//             flyingImg.style.borderRadius = "50%";
//           });

//           setTimeout(() => {
//             flyingImg.remove();
//             fetchCart();
//             navigate("/cart");
//           }, 800);
//         } else {
//            fetchCart();
//            navigate("/cart");
//         }
//       } else {
//         Swal.fire("Gagal", data.message || "Stok tidak mencukupi", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   if (loading) return <div className="flex items-center justify-center min-h-screen font-sans bg-white"><div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div></div>;
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">

//           {/* KIRI: MEDIA SECTION */}
//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div id="product-image" className="relative group bg-gray-50 rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-[4/5] border border-gray-100 flex items-center justify-center">
//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-cover object-center w-full h-full transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
//                     />
//                   ))}
//                   {gallery.length > 1 && (
//                     <>
//                       <button onClick={prevImage} className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                       </button>
//                       <button onClick={nextImage} className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                       </button>
//                       <div className="absolute z-20 flex gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`h-2 rounded-full transition-all shadow-sm ${idx === currentImageIndex ? 'bg-gycora w-6' : 'bg-white/80 hover:bg-white w-2'}`} />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">No Image</div>
//               )}
//               <div className="absolute z-20 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">Video Demo</h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video src={product.variant_video} controls className="object-contain w-full h-64 md:h-80" />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* KANAN: PRODUCT DETAILS SECTION */}
//           <div className="flex flex-col justify-center">
//              <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">{product.name}</h1>
//              <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
//              <div className="mb-8"><p className="text-4xl font-extrabold text-gycora">{formatRupiah(product.price)}</p></div>

//              <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">

//                 {/* JIKA SEMUA VARIAN SUDAH ADA DI KERANJANG */}
//                 {isFullyInCart ? (
//                   <div className="py-8 text-center border bg-emerald-50 rounded-xl border-emerald-100">
//                     <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-white rounded-full bg-emerald-500">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
//                     </div>
//                     <h3 className="mb-2 text-lg font-bold text-emerald-900">Sudah di Keranjang</h3>
//                     <p className="text-sm text-emerald-700">
//                       {Array.isArray(product.color) && product.color.length > 0
//                         ? "Semua varian warna produk ini telah Anda masukkan ke keranjang."
//                         : "Produk ini sudah ada di dalam keranjang belanja Anda."}
//                     </p>
//                     <button onClick={() => navigate("/cart")} className="px-6 py-2 mt-6 text-xs font-bold tracking-widest text-white uppercase transition-colors rounded-full shadow-sm bg-gycora hover:bg-gycora-dark">
//                       Lihat Keranjang
//                     </button>
//                   </div>
//                 ) : (
//                   <>
//                     {/* VARIAN WARNA (HANYA TAMPILKAN YANG TERSEDIA) */}
//                     {availableColors.length > 0 && (
//                       <div className="pb-6 mb-6 border-b border-gray-200">
//                         <h3 className="mb-3 text-sm font-bold text-gray-700">Pilih Varian Warna:</h3>
//                         <div className="flex flex-wrap gap-3">
//                           {availableColors.map((colorHex, idx) => (
//                             <button
//                               key={idx}
//                               onClick={() => setSelectedColor(colorHex)}
//                               className={`w-10 h-10 rounded-full border-2 transition-all shadow-sm ${selectedColor === colorHex ? 'border-gycora ring-2 ring-gycora/30 scale-110' : 'border-gray-200 hover:scale-105'}`}
//                               style={{ backgroundColor: colorHex }}
//                               title={`Pilih warna ${colorHex}`}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     <div className="flex items-center gap-4 mb-4">
//                       <span className="text-sm font-semibold text-gray-700">Status Ketersediaan:</span>
//                       {isOutOfStock ? (
//                         <span className="px-3 py-1 text-sm font-bold text-red-600 rounded-full bg-red-50">Stok Habis</span>
//                       ) : (
//                         <span className="px-3 py-1 text-sm font-bold rounded-full text-emerald-600 bg-emerald-50">Tersedia ({product.stock} Unit)</span>
//                       )}
//                     </div>

//                     <div className="flex flex-col gap-4 sm:flex-row">
//                       <div className="flex items-center justify-between w-full bg-white border border-gray-300 rounded-xl sm:w-32 h-14">
//                         <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={isOutOfStock} className="flex items-center justify-center w-10 h-full text-gray-600 transition-colors hover:text-gycora hover:bg-gray-50 rounded-l-xl disabled:opacity-50">-</button>
//                         <span className="font-bold text-gray-900">{quantity}</span>
//                         <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} disabled={isOutOfStock} className="flex items-center justify-center w-10 h-full text-gray-600 transition-colors hover:text-gycora hover:bg-gray-50 rounded-r-xl disabled:opacity-50">+</button>
//                       </div>

//                       <button
//                         onClick={handleAddToCart}
//                         disabled={isOutOfStock || isAdding}
//                         className={`flex-1 h-14 rounded-xl text-lg font-bold transition-all ${
//                           isOutOfStock
//                             ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                             : 'bg-gycora text-white hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:shadow-[0_6px_20px_rgba(5,150,105,0.23)] hover:-translate-y-0.5'
//                         }`}
//                       >
//                         {isAdding ? "Memproses..." : (isOutOfStock ? 'Tidak Tersedia' : 'Beli Sekarang')}
//                       </button>
//                     </div>
//                   </>
//                 )}
//              </div>

//              <div className="space-y-8">
//                 <div>
//                   <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">Tentang Produk Ini</h3>
//                   <div className="leading-relaxed prose-sm prose text-gray-600 whitespace-pre-wrap sm:prose max-w-none">{product.description}</div>
//                 </div>
//                 {product.benefits && (
//                   <div>
//                     <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">Manfaat Utama</h3>
//                     <div className="p-5 border border-emerald-100 bg-emerald-50/50 rounded-2xl">
//                       <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">{product.benefits}</p>
//                     </div>
//                   </div>
//                 )}
//              </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
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

// export default function ProductDetail() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const [isAdding, setIsAdding] = useState(false);

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);

//   // STATE BARU: Status Favorit produk ini
//   const [isFavorited, setIsFavorited] = useState(false);

//   const { cartItems, fetchCart } = useCart();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products/${id}`);
//         if (!res.ok) throw new Error("Produk tidak ditemukan");
//         const responseData = await res.json();

//         const productObject = responseData.data ? responseData.data : responseData;
//         setProduct(productObject);
//       } catch (error) {
//         console.error("Gagal memuat produk:", error);
//         navigate("/products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     // FUNGSI BARU: Mengecek apakah produk ini difavoritkan
//     const checkWishlistStatus = async () => {
//       const token = localStorage.getItem("user_token");
//       if (!token) return;

//       try {
//         const res = await fetch(`${BASE_URL}/api/wishlists`, {
//           headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//         });
//         if (res.ok) {
//           const data = await res.json();
//           // Cek apakah ID produk ini ada di daftar wishlist user
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           const isWished = data.some((item: any) => item.product_id === Number(id));
//           setIsFavorited(isWished);
//         }
//       } catch (error) {
//         console.error("Gagal memeriksa wishlist:", error);
//       }
//     };

//     if (id) {
//       fetchProduct();
//       checkWishlistStatus();
//     }
//   }, [id, navigate]);

//   // FUNGSI BARU: Toggle Favorit di halaman detail
//   const handleToggleWishlist = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk menyimpan produk ke favorit.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#059669",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Ke Halaman Login",
//         cancelButtonText: "Batal"
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     // Optimistic update
//     setIsFavorited(!isFavorited);

//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//           "Accept": "application/json"
//         },
//         body: JSON.stringify({ product_id: product?.id })
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       // Revert jika gagal
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   // =========================================================================
//   // LOGIKA PENYARINGAN VARIAN BERDASARKAN ISI KERANJANG
//   // =========================================================================
//   const colorsAlreadyInCart = useMemo(() => {
//     if (!product) return [];
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     return cartItems
//       .filter((item: any) => item.product.id === product.id && item.color)
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       .map((item: any) => item.color);
//   }, [cartItems, product]);

//   const availableColors = useMemo(() => {
//     if (!product || !Array.isArray(product.color)) return [];
//     return product.color.filter(c => !colorsAlreadyInCart.includes(c));
//   }, [product, colorsAlreadyInCart]);

//   const isFullyInCart = useMemo(() => {
//     if (!product) return false;
//     const hasColors = Array.isArray(product.color) && product.color.length > 0;

//     if (hasColors) {
//       return availableColors.length === 0;
//     } else {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       return cartItems.some((item: any) => item.product.id === product.id);
//     }
//   }, [product, availableColors, cartItems]);

//   useEffect(() => {
//     if (availableColors.length > 0 && (!selectedColor || !availableColors.includes(selectedColor))) {
//       setSelectedColor(availableColors[0]);
//     }
//   }, [availableColors, selectedColor]);

//   // =========================================================================

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
//   };

//   const handleAddToCart = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk mulai berbelanja.",
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: "Ke Halaman Login"
//       }).then(() => navigate("/login"));
//       return;
//     }

//     if (product?.color && product.color.length > 0 && !selectedColor) {
//        Swal.fire("Pilih Warna", "Silakan pilih varian warna terlebih dahulu.", "warning");
//        return;
//     }

//     setIsAdding(true);

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: selectedColor
//         })
//       });

//       const data = await res.json();

//       if (res.ok) {
//         const startEl = document.getElementById("product-image");
//         const endEl = document.getElementById("cart-icon");

//         if (startEl && endEl && gallery.length > 0) {
//           const startRect = startEl.getBoundingClientRect();
//           const endRect = endEl.getBoundingClientRect();

//           const flyingImg = document.createElement("img");
//           flyingImg.src = gallery[currentImageIndex];
//           flyingImg.style.position = "fixed";
//           flyingImg.style.top = `${startRect.top}px`;
//           flyingImg.style.left = `${startRect.left}px`;
//           flyingImg.style.width = `${startRect.width}px`;
//           flyingImg.style.height = `${startRect.height}px`;
//           flyingImg.style.borderRadius = "10%";
//           flyingImg.style.zIndex = "9999";
//           flyingImg.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//           document.body.appendChild(flyingImg);

//           requestAnimationFrame(() => {
//             flyingImg.style.top = `${endRect.top + 10}px`;
//             flyingImg.style.left = `${endRect.left + 10}px`;
//             flyingImg.style.width = "20px";
//             flyingImg.style.height = "20px";
//             flyingImg.style.opacity = "0.2";
//             flyingImg.style.borderRadius = "50%";
//           });

//           setTimeout(() => {
//             flyingImg.remove();
//             fetchCart();
//             navigate("/cart");
//           }, 800);
//         } else {
//            fetchCart();
//            navigate("/cart");
//         }
//       } else {
//         Swal.fire("Gagal", data.message || "Stok tidak mencukupi", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   if (loading) return <div className="flex items-center justify-center min-h-screen font-sans bg-white"><div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div></div>;
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">

//           {/* KIRI: MEDIA SECTION */}
//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div id="product-image" className="relative group bg-gray-50 rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-[4/5] border border-gray-100 flex items-center justify-center">
//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-cover object-center w-full h-full transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
//                     />
//                   ))}
//                   {gallery.length > 1 && (
//                     <>
//                       <button onClick={prevImage} className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                       </button>
//                       <button onClick={nextImage} className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                       </button>
//                       <div className="absolute z-20 flex gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`h-2 rounded-full transition-all shadow-sm ${idx === currentImageIndex ? 'bg-gycora w-6' : 'bg-white/80 hover:bg-white w-2'}`} />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">No Image</div>
//               )}
//               <div className="absolute z-20 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">Video Demo</h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video src={product.variant_video} controls className="object-contain w-full h-64 md:h-80" />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* KANAN: PRODUCT DETAILS SECTION */}
//           <div className="flex flex-col justify-center">

//              {/* AREA NAMA PRODUK DAN TOMBOL FAVORIT */}
//              <div className="flex items-start justify-between gap-4 mb-2">
//                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">{product.name}</h1>
//                <button
//                  onClick={handleToggleWishlist}
//                  className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                  title="Simpan ke Favorit"
//                >
//                  <svg
//                    xmlns="http://www.w3.org/2000/svg"
//                    viewBox="0 0 24 24"
//                    strokeWidth={1.5}
//                    stroke="currentColor"
//                    className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}
//                  >
//                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                  </svg>
//                </button>
//              </div>

//              <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
//              <div className="mb-8"><p className="text-4xl font-extrabold text-gycora">{formatRupiah(product.price)}</p></div>

//              <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">

//                 {/* JIKA SEMUA VARIAN SUDAH ADA DI KERANJANG */}
//                 {isFullyInCart ? (
//                   <div className="py-8 text-center border bg-emerald-50 rounded-xl border-emerald-100">
//                     <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-white rounded-full bg-emerald-500">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
//                     </div>
//                     <h3 className="mb-2 text-lg font-bold text-emerald-900">Sudah di Keranjang</h3>
//                     <p className="text-sm text-emerald-700">
//                       {Array.isArray(product.color) && product.color.length > 0
//                         ? "Semua varian warna produk ini telah Anda masukkan ke keranjang."
//                         : "Produk ini sudah ada di dalam keranjang belanja Anda."}
//                     </p>
//                     <button onClick={() => navigate("/cart")} className="px-6 py-2 mt-6 text-xs font-bold tracking-widest text-white uppercase transition-colors rounded-full shadow-sm bg-gycora hover:bg-gycora-dark">
//                       Lihat Keranjang
//                     </button>
//                   </div>
//                 ) : (
//                   <>
//                     {/* VARIAN WARNA (HANYA TAMPILKAN YANG TERSEDIA) */}
//                     {availableColors.length > 0 && (
//                       <div className="pb-6 mb-6 border-b border-gray-200">
//                         <h3 className="mb-3 text-sm font-bold text-gray-700">Pilih Varian Warna:</h3>
//                         <div className="flex flex-wrap gap-3">
//                           {availableColors.map((colorHex, idx) => (
//                             <button
//                               key={idx}
//                               onClick={() => setSelectedColor(colorHex)}
//                               className={`w-10 h-10 rounded-full border-2 transition-all shadow-sm ${selectedColor === colorHex ? 'border-gycora ring-2 ring-gycora/30 scale-110' : 'border-gray-200 hover:scale-105'}`}
//                               style={{ backgroundColor: colorHex }}
//                               title={`Pilih warna ${colorHex}`}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     <div className="flex items-center gap-4 mb-4">
//                       <span className="text-sm font-semibold text-gray-700">Status Ketersediaan:</span>
//                       {isOutOfStock ? (
//                         <span className="px-3 py-1 text-sm font-bold text-red-600 rounded-full bg-red-50">Stok Habis</span>
//                       ) : (
//                         <span className="px-3 py-1 text-sm font-bold rounded-full text-emerald-600 bg-emerald-50">Tersedia ({product.stock} Unit)</span>
//                       )}
//                     </div>

//                     <div className="flex flex-col gap-4 sm:flex-row">
//                       <div className="flex items-center justify-between w-full bg-white border border-gray-300 rounded-xl sm:w-32 h-14">
//                         <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={isOutOfStock} className="flex items-center justify-center w-10 h-full text-gray-600 transition-colors hover:text-gycora hover:bg-gray-50 rounded-l-xl disabled:opacity-50">-</button>
//                         <span className="font-bold text-gray-900">{quantity}</span>
//                         <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} disabled={isOutOfStock} className="flex items-center justify-center w-10 h-full text-gray-600 transition-colors hover:text-gycora hover:bg-gray-50 rounded-r-xl disabled:opacity-50">+</button>
//                       </div>

//                       <button
//                         onClick={handleAddToCart}
//                         disabled={isOutOfStock || isAdding}
//                         className={`flex-1 h-14 rounded-xl text-lg font-bold transition-all ${
//                           isOutOfStock
//                             ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                             : 'bg-gycora text-white hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:shadow-[0_6px_20px_rgba(5,150,105,0.23)] hover:-translate-y-0.5'
//                         }`}
//                       >
//                         {isAdding ? "Memproses..." : (isOutOfStock ? 'Tidak Tersedia' : 'Beli Sekarang')}
//                       </button>
//                     </div>
//                   </>
//                 )}
//              </div>

//              <div className="space-y-8">
//                 <div>
//                   <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">Tentang Produk Ini</h3>
//                   <div className="leading-relaxed prose-sm prose text-gray-600 whitespace-pre-wrap sm:prose max-w-none">{product.description}</div>
//                 </div>
//                 {product.benefits && (
//                   <div>
//                     <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">Manfaat Utama</h3>
//                     <div className="p-5 border border-emerald-100 bg-emerald-50/50 rounded-2xl">
//                       <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">{product.benefits}</p>
//                     </div>
//                   </div>
//                 )}
//              </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
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

// export default function ProductDetail() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const [isAdding, setIsAdding] = useState(false);

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);

//   const [isFavorited, setIsFavorited] = useState(false);

//   const { cartItems, fetchCart } = useCart();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products/${id}`);
//         if (!res.ok) throw new Error("Produk tidak ditemukan");
//         const responseData = await res.json();

//         const productObject = responseData.data ? responseData.data : responseData;
//         setProduct(productObject);
//       } catch (error) {
//         console.error("Gagal memuat produk:", error);
//         navigate("/products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     const checkWishlistStatus = async () => {
//       const token = localStorage.getItem("user_token");
//       if (!token) return;

//       try {
//         const res = await fetch(`${BASE_URL}/api/wishlists`, {
//           headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//         });
//         if (res.ok) {
//           const data = await res.json();
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           const isWished = data.some((item: any) => item.product_id === Number(id));
//           setIsFavorited(isWished);
//         }
//       } catch (error) {
//         console.error("Gagal memeriksa wishlist:", error);
//       }
//     };

//     if (id) {
//       fetchProduct();
//       checkWishlistStatus();
//     }
//   }, [id, navigate]);

//   const handleToggleWishlist = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk menyimpan produk ke favorit.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#059669",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Ke Halaman Login",
//         cancelButtonText: "Batal"
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//           "Accept": "application/json"
//         },
//         body: JSON.stringify({ product_id: product?.id })
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   // =========================================================================
//   // PERBAIKAN LOGIKA PENYARINGAN VARIAN (SUPPORT OBJECT & STRING)
//   // =========================================================================
//   const colorsAlreadyInCart = useMemo(() => {
//     if (!product) return [];
//     // Mengambil array "hex" dari warna-warna produk ini yang sudah ada di keranjang
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     return cartItems
//       .filter((item: any) => item.product.id === product.id && item.color)
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       .map((item: any) => {
//         try {
//           const parsed = JSON.parse(item.color);
//           return parsed.hex || item.color;
//         } catch {
//           return item.color; // Jika string lama
//         }
//       });
//   }, [cartItems, product]);

//   const availableColors = useMemo(() => {
//     if (!product || !Array.isArray(product.color)) return [];
//     return product.color.filter(c => {
//       const hex = typeof c === 'string' ? c : c.hex;
//       return !colorsAlreadyInCart.includes(hex);
//     });
//   }, [product, colorsAlreadyInCart]);

//   const isFullyInCart = useMemo(() => {
//     if (!product) return false;
//     const hasColors = Array.isArray(product.color) && product.color.length > 0;
//     if (hasColors) {
//       return availableColors.length === 0;
//     } else {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       return cartItems.some((item: any) => item.product.id === product.id);
//     }
//   }, [product, availableColors, cartItems]);

//   useEffect(() => {
//     if (availableColors.length > 0) {
//       // Default terpilih di set ke JSON stringifier dari objek atau string itu sendiri
//       const firstColorStr = typeof availableColors[0] === 'string' ? availableColors[0] : JSON.stringify(availableColors[0]);

//       if (!selectedColor || !availableColors.some(c => (typeof c === 'string' ? c : JSON.stringify(c)) === selectedColor)) {
//         setSelectedColor(firstColorStr);
//       }
//     } else {
//       setSelectedColor(null);
//     }
//   }, [availableColors, selectedColor]);
//   // =========================================================================

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
//   };

//   const handleAddToCart = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk mulai berbelanja.",
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: "Ke Halaman Login"
//       }).then(() => navigate("/login"));
//       return;
//     }

//     if (product?.color && product.color.length > 0 && !selectedColor) {
//        Swal.fire("Pilih Warna", "Silakan pilih varian warna terlebih dahulu.", "warning");
//        return;
//     }

//     setIsAdding(true);

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: selectedColor // selectedColor sudah berupa JSON string aman untuk backend varchar
//         })
//       });

//       const data = await res.json();

//       if (res.ok) {
//         const startEl = document.getElementById("product-image");
//         const endEl = document.getElementById("cart-icon");

//         if (startEl && endEl && gallery.length > 0) {
//           const startRect = startEl.getBoundingClientRect();
//           const endRect = endEl.getBoundingClientRect();

//           const flyingImg = document.createElement("img");
//           flyingImg.src = gallery[currentImageIndex];
//           flyingImg.style.position = "fixed";
//           flyingImg.style.top = `${startRect.top}px`;
//           flyingImg.style.left = `${startRect.left}px`;
//           flyingImg.style.width = `${startRect.width}px`;
//           flyingImg.style.height = `${startRect.height}px`;
//           flyingImg.style.borderRadius = "10%";
//           flyingImg.style.zIndex = "9999";
//           flyingImg.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//           document.body.appendChild(flyingImg);

//           requestAnimationFrame(() => {
//             flyingImg.style.top = `${endRect.top + 10}px`;
//             flyingImg.style.left = `${endRect.left + 10}px`;
//             flyingImg.style.width = "20px";
//             flyingImg.style.height = "20px";
//             flyingImg.style.opacity = "0.2";
//             flyingImg.style.borderRadius = "50%";
//           });

//           setTimeout(() => {
//             flyingImg.remove();
//             fetchCart();
//             navigate("/cart");
//           }, 800);
//         } else {
//            fetchCart();
//            navigate("/cart");
//         }
//       } else {
//         Swal.fire("Gagal", data.message || "Stok tidak mencukupi", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   if (loading) return <div className="flex items-center justify-center min-h-screen font-sans bg-white"><div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div></div>;
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">

//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div id="product-image" className="relative group bg-gray-50 rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-[4/5] border border-gray-100 flex items-center justify-center">
//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-cover object-center w-full h-full transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
//                     />
//                   ))}
//                   {gallery.length > 1 && (
//                     <>
//                       <button onClick={prevImage} className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                       </button>
//                       <button onClick={nextImage} className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                       </button>
//                       <div className="absolute z-20 flex gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`h-2 rounded-full transition-all shadow-sm ${idx === currentImageIndex ? 'bg-gycora w-6' : 'bg-white/80 hover:bg-white w-2'}`} />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">No Image</div>
//               )}
//               <div className="absolute z-20 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">Video Demo</h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video src={product.variant_video} controls className="object-contain w-full h-64 md:h-80" />
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="flex flex-col justify-center">
//              <div className="flex items-start justify-between gap-4 mb-2">
//                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">{product.name}</h1>
//                <button
//                  onClick={handleToggleWishlist}
//                  className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                  title="Simpan ke Favorit"
//                >
//                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}>
//                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                  </svg>
//                </button>
//              </div>

//              <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
//              <div className="mb-8"><p className="text-4xl font-extrabold text-gycora">{formatRupiah(product.price)}</p></div>

//              <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">

//                 {isFullyInCart ? (
//                   <div className="py-8 text-center border bg-emerald-50 rounded-xl border-emerald-100">
//                     <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-white rounded-full bg-emerald-500">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
//                     </div>
//                     <h3 className="mb-2 text-lg font-bold text-emerald-900">Sudah di Keranjang</h3>
//                     <p className="text-sm text-emerald-700">
//                       {Array.isArray(product.color) && product.color.length > 0
//                         ? "Semua varian warna produk ini telah Anda masukkan ke keranjang."
//                         : "Produk ini sudah ada di dalam keranjang belanja Anda."}
//                     </p>
//                     <button onClick={() => navigate("/cart")} className="px-6 py-2 mt-6 text-xs font-bold tracking-widest text-white uppercase transition-colors rounded-full shadow-sm bg-gycora hover:bg-gycora-dark">
//                       Lihat Keranjang
//                     </button>
//                   </div>
//                 ) : (
//                   <>
//                     {availableColors.length > 0 && (
//                       <div className="pb-6 mb-6 border-b border-gray-200">
//                         <h3 className="mb-3 text-sm font-bold text-gray-700">Pilih Varian Warna:</h3>
//                         <div className="flex flex-wrap gap-3">
//                           {availableColors.map((c, idx) => {
//                             const hex = typeof c === 'string' ? c : c.hex;
//                             const name = typeof c === 'string' ? '' : c.name;
//                             const colorString = typeof c === 'string' ? c : JSON.stringify(c);
//                             const isSelected = selectedColor === colorString;

//                             return (
//                               <button
//                                 key={idx}
//                                 onClick={() => setSelectedColor(colorString)}
//                                 className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${isSelected ? 'border-gycora ring-2 ring-gycora/30 scale-105' : 'border-gray-200 hover:border-gray-300 hover:scale-105'}`}
//                                 title={`Pilih warna ${name || hex}`}
//                               >
//                                 <span className="w-5 h-5 border border-gray-300 rounded-full shadow-inner" style={{ backgroundColor: hex }}></span>
//                                 {name && <span className={`text-xs font-bold ${isSelected ? 'text-gycora-dark' : 'text-gray-700'}`}>{name}</span>}
//                               </button>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     )}

//                     {/* <div className="flex items-center gap-4 mb-4">
//                       <span className="text-sm font-semibold text-gray-700">Status Ketersediaan:</span>
//                       {isOutOfStock ? (
//                         <span className="px-3 py-1 text-sm font-bold text-red-600 rounded-full bg-red-50">Stok Habis</span>
//                       ) : (
//                         <span className="px-3 py-1 text-sm font-bold rounded-full text-emerald-600 bg-emerald-50">Tersedia ({product.stock} Unit)</span>
//                       )}
//                     </div> */}

//                     <div className="flex flex-col gap-4 sm:flex-row">
//                       <div className="flex items-center justify-between w-full bg-white border border-gray-300 rounded-xl sm:w-32 h-14">
//                         <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={isOutOfStock} className="flex items-center justify-center w-10 h-full text-gray-600 transition-colors hover:text-gycora hover:bg-gray-50 rounded-l-xl disabled:opacity-50">-</button>
//                         <span className="font-bold text-gray-900">{quantity}</span>
//                         <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} disabled={isOutOfStock} className="flex items-center justify-center w-10 h-full text-gray-600 transition-colors hover:text-gycora hover:bg-gray-50 rounded-r-xl disabled:opacity-50">+</button>
//                       </div>

//                       <button
//                         onClick={handleAddToCart}
//                         disabled={isOutOfStock || isAdding}
//                         className={`flex-1 h-14 rounded-xl text-lg font-bold transition-all ${
//                           isOutOfStock
//                             ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                             : 'bg-gycora text-white hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:shadow-[0_6px_20px_rgba(5,150,105,0.23)] hover:-translate-y-0.5'
//                         }`}
//                       >
//                         {isAdding ? "Memproses..." : (isOutOfStock ? 'Tidak Tersedia' : 'Beli Sekarang')}
//                       </button>
//                     </div>
//                   </>
//                 )}
//              </div>

//              <div className="space-y-8">
//                 <div>
//                   <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">Tentang Produk Ini</h3>
//                   <div className="leading-relaxed prose-sm prose text-gray-600 whitespace-pre-wrap sm:prose max-w-none">{product.description}</div>
//                 </div>
//                 {product.benefits && (
//                   <div>
//                     <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">Manfaat Utama</h3>
//                     <div className="p-5 border border-emerald-100 bg-emerald-50/50 rounded-2xl">
//                       <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">{product.benefits}</p>
//                     </div>
//                   </div>
//                 )}
//              </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
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

// export default function ProductDetail() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const [isAdding, setIsAdding] = useState(false);
//   const [isBuyingNow, setIsBuyingNow] = useState(false); // State baru untuk loading Buy It Now

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);

//   const [isFavorited, setIsFavorited] = useState(false);

//   const { cartItems, fetchCart } = useCart();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products/${id}`);
//         if (!res.ok) throw new Error("Produk tidak ditemukan");
//         const responseData = await res.json();

//         const productObject = responseData.data ? responseData.data : responseData;
//         setProduct(productObject);
//       } catch (error) {
//         console.error("Gagal memuat produk:", error);
//         navigate("/products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     const checkWishlistStatus = async () => {
//       const token = localStorage.getItem("user_token");
//       if (!token) return;

//       try {
//         const res = await fetch(`${BASE_URL}/api/wishlists`, {
//           headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//         });
//         if (res.ok) {
//           const data = await res.json();
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           const isWished = data.some((item: any) => item.product_id === Number(id));
//           setIsFavorited(isWished);
//         }
//       } catch (error) {
//         console.error("Gagal memeriksa wishlist:", error);
//       }
//     };

//     if (id) {
//       fetchProduct();
//       checkWishlistStatus();
//     }
//   }, [id, navigate]);

//   const handleToggleWishlist = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk menyimpan produk ke favorit.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#059669",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Ke Halaman Login",
//         cancelButtonText: "Batal"
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//           "Accept": "application/json"
//         },
//         body: JSON.stringify({ product_id: product?.id })
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   // =========================================================================
//   // PERBAIKAN LOGIKA PENYARINGAN VARIAN (SUPPORT OBJECT & STRING)
//   // =========================================================================
//   const colorsAlreadyInCart = useMemo(() => {
//     if (!product) return [];
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     return cartItems
//       .filter((item: any) => item.product.id === product.id && item.color)
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       .map((item: any) => {
//         try {
//           const parsed = JSON.parse(item.color);
//           return parsed.hex || item.color;
//         } catch {
//           return item.color; // Jika string lama
//         }
//       });
//   }, [cartItems, product]);

//   const availableColors = useMemo(() => {
//     if (!product || !Array.isArray(product.color)) return [];
//     return product.color.filter(c => {
//       const hex = typeof c === 'string' ? c : c.hex;
//       return !colorsAlreadyInCart.includes(hex);
//     });
//   }, [product, colorsAlreadyInCart]);

//   const isFullyInCart = useMemo(() => {
//     if (!product) return false;
//     const hasColors = Array.isArray(product.color) && product.color.length > 0;
//     if (hasColors) {
//       return availableColors.length === 0;
//     } else {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       return cartItems.some((item: any) => item.product.id === product.id);
//     }
//   }, [product, availableColors, cartItems]);

//   useEffect(() => {
//     if (availableColors.length > 0) {
//       const firstColorStr = typeof availableColors[0] === 'string' ? availableColors[0] : JSON.stringify(availableColors[0]);
//       if (!selectedColor || !availableColors.some(c => (typeof c === 'string' ? c : JSON.stringify(c)) === selectedColor)) {
//         setSelectedColor(firstColorStr);
//       }
//     } else {
//       setSelectedColor(null);
//     }
//   }, [availableColors, selectedColor]);
//   // =========================================================================

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
//   };

//   // Handler Umum yang memproses API Cart untuk kedua tombol
//   const processAddToCartAPI = async (): Promise<number | null> => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk mulai berbelanja.",
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: "Ke Halaman Login"
//       }).then(() => navigate("/login"));
//       return null;
//     }

//     if (product?.color && product.color.length > 0 && !selectedColor) {
//        Swal.fire("Pilih Warna", "Silakan pilih varian warna terlebih dahulu.", "warning");
//        return null;
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: selectedColor
//         })
//       });

//       const data = await res.json();

//       if (res.ok) {
//         // Mengembalikan cart_id yang baru dibuat/diupdate dari backend
//         return data.cart_id;
//       } else {
//         Swal.fire("Gagal", data.message || "Stok tidak mencukupi", "error");
//         return null;
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//       return null;
//     }
//   };

//   // TOMBOL 1: ADD TO CART (Logic Lama dengan Animasi Terbang)
//   const handleAddToCart = async () => {
//     setIsAdding(true);
//     const cartId = await processAddToCartAPI();

//     if (cartId) {
//       const startEl = document.getElementById("product-image");
//       const endEl = document.getElementById("cart-icon");

//       if (startEl && endEl && gallery.length > 0) {
//         const startRect = startEl.getBoundingClientRect();
//         const endRect = endEl.getBoundingClientRect();

//         const flyingImg = document.createElement("img");
//         flyingImg.src = gallery[currentImageIndex];
//         flyingImg.style.position = "fixed";
//         flyingImg.style.top = `${startRect.top}px`;
//         flyingImg.style.left = `${startRect.left}px`;
//         flyingImg.style.width = `${startRect.width}px`;
//         flyingImg.style.height = `${startRect.height}px`;
//         flyingImg.style.borderRadius = "10%";
//         flyingImg.style.zIndex = "9999";
//         flyingImg.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//         document.body.appendChild(flyingImg);

//         requestAnimationFrame(() => {
//           flyingImg.style.top = `${endRect.top + 10}px`;
//           flyingImg.style.left = `${endRect.left + 10}px`;
//           flyingImg.style.width = "20px";
//           flyingImg.style.height = "20px";
//           flyingImg.style.opacity = "0.2";
//           flyingImg.style.borderRadius = "50%";
//         });

//         setTimeout(() => {
//           flyingImg.remove();
//           fetchCart();
//           navigate("/cart");
//         }, 800);
//       } else {
//          fetchCart();
//          navigate("/cart");
//       }
//     }
//     setIsAdding(false);
//   };

//   // TOMBOL 2: BUY IT NOW (Bypass Cart, langsung ke Checkout)
//   const handleBuyItNow = async () => {
//     setIsBuyingNow(true);
//     const cartId = await processAddToCartAPI();

//     if (cartId) {
//       fetchCart(); // Update state global keranjang diam-diam
//       // Langsung arahkan ke halaman payment dengan membawa ID Cart tersebut
//       navigate("/checkout", { state: { selectedIds: [cartId] } });
//     } else {
//       setIsBuyingNow(false);
//     }
//   };

//   if (loading) return <div className="flex items-center justify-center min-h-screen font-sans bg-white"><div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div></div>;
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;
//   const isFormDisabled = isOutOfStock || isAdding || isBuyingNow;

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">

//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div id="product-image" className="relative group bg-gray-50 rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-[4/5] border border-gray-100 flex items-center justify-center">
//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-cover object-center w-full h-full transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
//                     />
//                   ))}
//                   {gallery.length > 1 && (
//                     <>
//                       <button onClick={prevImage} className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                       </button>
//                       <button onClick={nextImage} className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                       </button>
//                       <div className="absolute z-20 flex gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`h-2 rounded-full transition-all shadow-sm ${idx === currentImageIndex ? 'bg-gycora w-6' : 'bg-white/80 hover:bg-white w-2'}`} />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">No Image</div>
//               )}
//               <div className="absolute z-20 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">Video Demo</h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video src={product.variant_video} controls className="object-contain w-full h-64 md:h-80" />
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="flex flex-col justify-center">
//              <div className="flex items-start justify-between gap-4 mb-2">
//                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">{product.name}</h1>
//                <button
//                  onClick={handleToggleWishlist}
//                  className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                  title="Simpan ke Favorit"
//                >
//                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}>
//                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                  </svg>
//                </button>
//              </div>

//              <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
//              <div className="mb-8"><p className="text-4xl font-extrabold text-gycora">{formatRupiah(product.price)}</p></div>

//              <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">

//                 {isFullyInCart ? (
//                   <div className="py-8 text-center border bg-emerald-50 rounded-xl border-emerald-100">
//                     <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-white rounded-full bg-emerald-500">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
//                     </div>
//                     <h3 className="mb-2 text-lg font-bold text-emerald-900">Sudah di Keranjang</h3>
//                     <p className="text-sm text-emerald-700">
//                       {Array.isArray(product.color) && product.color.length > 0
//                         ? "Semua varian warna produk ini telah Anda masukkan ke keranjang."
//                         : "Produk ini sudah ada di dalam keranjang belanja Anda."}
//                     </p>
//                     <button onClick={() => navigate("/cart")} className="px-6 py-2 mt-6 text-xs font-bold tracking-widest text-white uppercase transition-colors rounded-full shadow-sm bg-gycora hover:bg-gycora-dark">
//                       Lihat Keranjang
//                     </button>
//                   </div>
//                 ) : (
//                   <>
//                     {availableColors.length > 0 && (
//                       <div className="pb-6 mb-6 border-b border-gray-200">
//                         <h3 className="mb-3 text-sm font-bold text-gray-700">Pilih Varian Warna:</h3>
//                         <div className="flex flex-wrap gap-3">
//                           {availableColors.map((c, idx) => {
//                             const hex = typeof c === 'string' ? c : c.hex;
//                             const name = typeof c === 'string' ? '' : c.name;
//                             const colorString = typeof c === 'string' ? c : JSON.stringify(c);
//                             const isSelected = selectedColor === colorString;

//                             return (
//                               <button
//                                 key={idx}
//                                 onClick={() => setSelectedColor(colorString)}
//                                 className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${isSelected ? 'border-gycora ring-2 ring-gycora/30 scale-105' : 'border-gray-200 hover:border-gray-300 hover:scale-105'}`}
//                                 title={`Pilih warna ${name || hex}`}
//                               >
//                                 <span className="w-5 h-5 border border-gray-300 rounded-full shadow-inner" style={{ backgroundColor: hex }}></span>
//                                 {name && <span className={`text-xs font-bold ${isSelected ? 'text-gycora-dark' : 'text-gray-700'}`}>{name}</span>}
//                               </button>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     )}

//                     <div className="flex flex-col gap-4">
//                       {/* QTY Input */}
//                       <div className="flex items-center justify-between w-full bg-white border border-gray-300 h-14 rounded-xl">
//                         <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={isFormDisabled} className="flex items-center justify-center w-12 h-full text-gray-600 transition-colors hover:text-gycora hover:bg-gray-50 rounded-l-xl disabled:opacity-50">-</button>
//                         <span className="font-bold text-gray-900">{quantity}</span>
//                         <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} disabled={isFormDisabled} className="flex items-center justify-center w-12 h-full text-gray-600 transition-colors hover:text-gycora hover:bg-gray-50 rounded-r-xl disabled:opacity-50">+</button>
//                       </div>

//                       {/* --- DOUBLE BUTTONS: ADD TO CART & BUY IT NOW --- */}
//                       <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
//                         {/* Tombol Add To Cart (Outline) */}
//                         <button
//                           onClick={handleAddToCart}
//                           disabled={isFormDisabled}
//                           className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 ${
//                             isOutOfStock
//                               ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
//                               : 'bg-white border-gycora text-gycora hover:bg-emerald-50'
//                           }`}
//                         >
//                           {isAdding ? "Menambahkan..." : "Add to Cart"}
//                         </button>

//                         {/* Tombol Buy It Now (Solid) */}
//                         <button
//                           onClick={handleBuyItNow}
//                           disabled={isFormDisabled}
//                           className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all ${
//                             isOutOfStock
//                               ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                               : 'bg-gycora text-white hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5'
//                           }`}
//                         >
//                           {isBuyingNow ? "Memproses..." : (isOutOfStock ? 'Stok Habis' : 'Buy it Now')}
//                         </button>
//                       </div>

//                     </div>
//                   </>
//                 )}
//              </div>

//              <div className="space-y-8">
//                 <div>
//                   <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">Tentang Produk Ini</h3>
//                   <div className="leading-relaxed prose-sm prose text-gray-600 whitespace-pre-wrap sm:prose max-w-none">{product.description}</div>
//                 </div>
//                 {product.benefits && (
//                   <div>
//                     <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">Manfaat Utama</h3>
//                     <div className="p-5 border border-emerald-100 bg-emerald-50/50 rounded-2xl">
//                       <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">{product.benefits}</p>
//                     </div>
//                   </div>
//                 )}
//              </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
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

// export default function ProductDetail() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);

//   const [isAdding, setIsAdding] = useState(false);
//   const [isBuyingNow, setIsBuyingNow] = useState(false);

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);

//   const [isFavorited, setIsFavorited] = useState(false);

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { fetchCart } = useCart();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products/${id}`);
//         if (!res.ok) throw new Error("Produk tidak ditemukan");
//         const responseData = await res.json();

//         const productObject = responseData.data ? responseData.data : responseData;
//         setProduct(productObject);
//       } catch (error) {
//         console.error("Gagal memuat produk:", error);
//         navigate("/products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     const checkWishlistStatus = async () => {
//       const token = localStorage.getItem("user_token");
//       if (!token) return;

//       try {
//         const res = await fetch(`${BASE_URL}/api/wishlists`, {
//           headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//         });
//         if (res.ok) {
//           const data = await res.json();
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           const isWished = data.some((item: any) => item.product_id === Number(id));
//           setIsFavorited(isWished);
//         }
//       } catch (error) {
//         console.error("Gagal memeriksa wishlist:", error);
//       }
//     };

//     if (id) {
//       fetchProduct();
//       checkWishlistStatus();
//     }
//   }, [id, navigate]);

//   const handleToggleWishlist = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk menyimpan produk ke favorit.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#059669",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Ke Halaman Login",
//         cancelButtonText: "Batal"
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//           "Accept": "application/json"
//         },
//         body: JSON.stringify({ product_id: product?.id })
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   // =========================================================================
//   // PERBAIKAN: Tampilkan SEMUA warna yang tersedia di master produk (Tidak peduli sudah di keranjang atau belum)
//   // =========================================================================
//   const allColors = useMemo(() => {
//     if (!product || !Array.isArray(product.color)) return [];
//     return product.color;
//   }, [product]);

//   useEffect(() => {
//     if (allColors.length > 0) {
//       const firstColorStr = typeof allColors[0] === 'string' ? allColors[0] : JSON.stringify(allColors[0]);
//       if (!selectedColor || !allColors.some(c => (typeof c === 'string' ? c : JSON.stringify(c)) === selectedColor)) {
//         setSelectedColor(firstColorStr);
//       }
//     } else {
//       setSelectedColor(null);
//     }
//   }, [allColors, selectedColor]);
//   // =========================================================================

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
//   };

//   // Handler Umum yang memproses API Cart untuk kedua tombol
//   const processAddToCartAPI = async (): Promise<number | null> => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk mulai berbelanja.",
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: "Ke Halaman Login"
//       }).then(() => navigate("/login"));
//       return null;
//     }

//     if (product?.color && product.color.length > 0 && !selectedColor) {
//        Swal.fire("Pilih Warna", "Silakan pilih varian warna terlebih dahulu.", "warning");
//        return null;
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: selectedColor
//         })
//       });

//       const data = await res.json();

//       if (res.ok) {
//         // Mengembalikan cart_id yang baru dibuat/diupdate dari backend
//         return data.cart_id;
//       } else {
//         Swal.fire("Gagal", data.message || "Stok tidak mencukupi", "error");
//         return null;
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//       return null;
//     }
//   };

//   // TOMBOL 1: ADD TO CART (PERBAIKAN: Animasi Terbang, BUKAN navigasi ke /cart)
//   const handleAddToCart = async () => {
//     setIsAdding(true);
//     const cartId = await processAddToCartAPI();

//     if (cartId) {
//       // 1. Dapatkan elemen gambar produk dan elemen ikon keranjang di header
//       const startEl = document.getElementById("product-image");

//       // Catatan: Pastikan di Header.tsx Anda menambahkan `id="cart-icon"` pada tombol keranjang agar baris di bawah ini bisa menemukan elemennya.
//       // <button id="cart-icon" onClick={() => navigate("/cart")} ...>
//       const endEl = document.getElementById("cart-icon");

//       if (startEl && endEl && gallery.length > 0) {
//         const startRect = startEl.getBoundingClientRect();
//         const endRect = endEl.getBoundingClientRect();

//         // Buat kloningan gambar
//         const flyingImg = document.createElement("img");
//         flyingImg.src = gallery[currentImageIndex];
//         flyingImg.style.position = "fixed";
//         flyingImg.style.top = `${startRect.top}px`;
//         flyingImg.style.left = `${startRect.left}px`;
//         flyingImg.style.width = `${startRect.width}px`;
//         flyingImg.style.height = `${startRect.height}px`;
//         flyingImg.style.borderRadius = "10%";
//         flyingImg.style.zIndex = "9999";
//         flyingImg.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//         document.body.appendChild(flyingImg);

//         // Paksa browser me-render gambar di titik awal sebelum memindahkannya
//         requestAnimationFrame(() => {
//           flyingImg.style.top = `${endRect.top + 10}px`;
//           flyingImg.style.left = `${endRect.left + 10}px`;
//           flyingImg.style.width = "20px";
//           flyingImg.style.height = "20px";
//           flyingImg.style.opacity = "0.2";
//           flyingImg.style.borderRadius = "50%";
//         });

//         // Setelah animasi selesai (0.8 detik), hapus gambar kloningan dan perbarui angka di keranjang
//         setTimeout(() => {
//           flyingImg.remove();
//           fetchCart(); // Perbarui badge (angka) keranjang di header

//           // Tampilkan notifikasi toast kecil di pojok kanan atas agar user tahu sukses
//           Swal.fire({
//             title: "Ditambahkan!",
//             icon: "success",
//             toast: true,
//             position: "top-end",
//             timer: 1500,
//             showConfirmButton: false
//           });

//           // PENTING: Dihapus navigate("/cart") dari sini agar user tetap di halaman detail produk!
//         }, 800);
//       } else {
//          // Fallback jika elemen tidak ditemukan
//          fetchCart();
//          Swal.fire({ title: "Ditambahkan!", icon: "success", toast: true, position: "top-end", timer: 1500, showConfirmButton: false });
//       }
//     }
//     setIsAdding(false);
//   };

//   // TOMBOL 2: BUY IT NOW (Bypass Cart, langsung ke Checkout)
//   const handleBuyItNow = async () => {
//     setIsBuyingNow(true);
//     const cartId = await processAddToCartAPI();

//     if (cartId) {
//       fetchCart();
//       // Langsung arahkan ke halaman payment dengan membawa ID Cart tersebut
//       navigate("/checkout", { state: { selectedIds: [cartId] } });
//     } else {
//       setIsBuyingNow(false);
//     }
//   };

//   if (loading) return <div className="flex items-center justify-center min-h-screen font-sans bg-white"><div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div></div>;
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;
//   const isFormDisabled = isOutOfStock || isAdding || isBuyingNow;

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">

//           {/* Kolom Kiri: Gambar Produk */}
//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div id="product-image" className="relative group bg-gray-50 rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-[4/5] border border-gray-100 flex items-center justify-center">
//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-cover object-center w-full h-full transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
//                     />
//                   ))}
//                   {gallery.length > 1 && (
//                     <>
//                       <button onClick={prevImage} className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                       </button>
//                       <button onClick={nextImage} className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                       </button>
//                       <div className="absolute z-20 flex gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`h-2 rounded-full transition-all shadow-sm ${idx === currentImageIndex ? 'bg-gycora w-6' : 'bg-white/80 hover:bg-white w-2'}`} />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">No Image</div>
//               )}
//               <div className="absolute z-20 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">Video Demo</h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video src={product.variant_video} controls className="object-contain w-full h-64 md:h-80" />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Kolom Kanan: Detail dan Form */}
//           <div className="flex flex-col justify-center">
//              <div className="flex items-start justify-between gap-4 mb-2">
//                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">{product.name}</h1>
//                <button
//                  onClick={handleToggleWishlist}
//                  className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                  title="Simpan ke Favorit"
//                >
//                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}>
//                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                  </svg>
//                </button>
//              </div>

//              <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
//              <div className="mb-8"><p className="text-4xl font-extrabold text-gycora">{formatRupiah(product.price)}</p></div>

//              <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">

//                 {/* --- MENAMPILKAN SEMUA WARNA (TIDAK DISEMBUNYIKAN WALAUPUN SUDAH DI KERANJANG) --- */}
//                 {allColors.length > 0 && (
//                   <div className="pb-6 mb-6 border-b border-gray-200">
//                     <h3 className="mb-3 text-sm font-bold text-gray-700">Pilih Varian Warna:</h3>
//                     <div className="flex flex-wrap gap-3">
//                       {allColors.map((c, idx) => {
//                         const hex = typeof c === 'string' ? c : c.hex;
//                         const name = typeof c === 'string' ? '' : c.name;
//                         const colorString = typeof c === 'string' ? c : JSON.stringify(c);
//                         const isSelected = selectedColor === colorString;

//                         return (
//                           <button
//                             key={idx}
//                             onClick={() => setSelectedColor(colorString)}
//                             className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${isSelected ? 'border-gycora ring-2 ring-gycora/30 scale-105' : 'border-gray-200 hover:border-gray-300 hover:scale-105'}`}
//                             title={`Pilih warna ${name || hex}`}
//                           >
//                             <span className="w-5 h-5 border border-gray-300 rounded-full shadow-inner" style={{ backgroundColor: hex }}></span>
//                             {name && <span className={`text-xs font-bold ${isSelected ? 'text-gycora-dark' : 'text-gray-700'}`}>{name}</span>}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex flex-col gap-4">
//                   {/* QTY Input */}
//                   <div className="flex items-center justify-between w-full bg-white border border-gray-300 h-14 rounded-xl">
//                     <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={isFormDisabled} className="flex items-center justify-center w-12 h-full text-gray-600 transition-colors hover:text-gycora hover:bg-gray-50 rounded-l-xl disabled:opacity-50">-</button>
//                     <span className="font-bold text-gray-900">{quantity}</span>
//                     <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} disabled={isFormDisabled} className="flex items-center justify-center w-12 h-full text-gray-600 transition-colors hover:text-gycora hover:bg-gray-50 rounded-r-xl disabled:opacity-50">+</button>
//                   </div>

//                   {/* --- DOUBLE BUTTONS: ADD TO CART & BUY IT NOW --- */}
//                   <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
//                     {/* Tombol Add To Cart (Outline) */}
//                     <button
//                       onClick={handleAddToCart}
//                       disabled={isFormDisabled}
//                       className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 ${
//                         isOutOfStock
//                           ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
//                           : 'bg-white border-gycora text-gycora hover:bg-emerald-50'
//                       }`}
//                     >
//                       {isAdding ? "Memproses..." : "Add to Cart"}
//                     </button>

//                     {/* Tombol Buy It Now (Solid) */}
//                     <button
//                       onClick={handleBuyItNow}
//                       disabled={isFormDisabled}
//                       className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all ${
//                         isOutOfStock
//                           ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                           : 'bg-gycora text-white hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5'
//                       }`}
//                     >
//                       {isBuyingNow ? "Memproses..." : (isOutOfStock ? 'Stok Habis' : 'Buy it Now')}
//                     </button>
//                   </div>

//                 </div>
//              </div>

//              <div className="space-y-8">
//                 <div>
//                   <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">Tentang Produk Ini</h3>
//                   <div className="leading-relaxed prose-sm prose text-gray-600 whitespace-pre-wrap sm:prose max-w-none">{product.description}</div>
//                 </div>
//                 {product.benefits && (
//                   <div>
//                     <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">Manfaat Utama</h3>
//                     <div className="p-5 border border-emerald-100 bg-emerald-50/50 rounded-2xl">
//                       <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">{product.benefits}</p>
//                     </div>
//                   </div>
//                 )}
//              </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// product detail page
// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
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

// export default function ProductDetail() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);

//   const [isAdding, setIsAdding] = useState(false);
//   const [isBuyingNow, setIsBuyingNow] = useState(false);

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);

//   const [isFavorited, setIsFavorited] = useState(false);

//   const { fetchCart } = useCart();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products/${id}`);
//         if (!res.ok) throw new Error("Produk tidak ditemukan");
//         const responseData = await res.json();

//         const productObject = responseData.data ? responseData.data : responseData;
//         setProduct(productObject);
//       } catch (error) {
//         console.error("Gagal memuat produk:", error);
//         navigate("/products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     const checkWishlistStatus = async () => {
//       const token = localStorage.getItem("user_token");
//       if (!token) return;

//       try {
//         const res = await fetch(`${BASE_URL}/api/wishlists`, {
//           headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//         });
//         if (res.ok) {
//           const data = await res.json();
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           const isWished = data.some((item: any) => item.product_id === Number(id));
//           setIsFavorited(isWished);
//         }
//       } catch (error) {
//         console.error("Gagal memeriksa wishlist:", error);
//       }
//     };

//     if (id) {
//       fetchProduct();
//       checkWishlistStatus();
//     }
//   }, [id, navigate]);

//   const handleToggleWishlist = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk menyimpan produk ke favorit.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#059669",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Ke Halaman Login",
//         cancelButtonText: "Batal"
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//           "Accept": "application/json"
//         },
//         body: JSON.stringify({ product_id: product?.id })
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   // const colorsAlreadyInCart = useMemo(() => {
//   //   if (!product) return [];
//   //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   //   return cartItems
//   //     .filter((item: any) => item.product.id === product.id && item.color)
//   //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   //     .map((item: any) => {
//   //       try {
//   //         const parsed = JSON.parse(item.color);
//   //         return parsed.hex || item.color;
//   //       } catch {
//   //         return item.color; // Jika string lama
//   //       }
//   //     });
//   // }, [cartItems, product]);

//   const allColors = useMemo(() => {
//     if (!product || !Array.isArray(product.color)) return [];
//     return product.color;
//   }, [product]);

//   useEffect(() => {
//     if (allColors.length > 0) {
//       const firstColorStr = typeof allColors[0] === 'string' ? allColors[0] : JSON.stringify(allColors[0]);
//       if (!selectedColor || !allColors.some(c => (typeof c === 'string' ? c : JSON.stringify(c)) === selectedColor)) {
//         setSelectedColor(firstColorStr);
//       }
//     } else {
//       setSelectedColor(null);
//     }
//   }, [allColors, selectedColor]);

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
//   };

//   // --- LOGIKA OPTIMISTIC ANIMATION ---
//   const triggerFlyingAnimation = () => {
//     const startEl = document.getElementById("product-image");
//     // Pastikan tombol keranjang di Header.tsx punya id="cart-icon"
//     const endEl = document.getElementById("cart-icon");

//     if (startEl && endEl && gallery.length > 0) {
//       const startRect = startEl.getBoundingClientRect();
//       const endRect = endEl.getBoundingClientRect();

//       const flyingImg = document.createElement("img");
//       flyingImg.src = gallery[currentImageIndex];
//       flyingImg.style.position = "fixed";
//       flyingImg.style.top = `${startRect.top}px`;
//       flyingImg.style.left = `${startRect.left}px`;
//       flyingImg.style.width = `${startRect.width}px`;
//       flyingImg.style.height = `${startRect.height}px`;
//       flyingImg.style.borderRadius = "10%";
//       flyingImg.style.zIndex = "9999";
//       flyingImg.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//       document.body.appendChild(flyingImg);

//       requestAnimationFrame(() => {
//         flyingImg.style.top = `${endRect.top + 10}px`;
//         flyingImg.style.left = `${endRect.left + 10}px`;
//         flyingImg.style.width = "20px";
//         flyingImg.style.height = "20px";
//         flyingImg.style.opacity = "0.2";
//         flyingImg.style.borderRadius = "50%";
//       });

//       // Hapus setelah selesai terbang
//       setTimeout(() => {
//         flyingImg.remove();

//         // Animasi pop pada ikon keranjang agar terlihat lebih hidup
//         endEl.classList.add("scale-125");
//         setTimeout(() => endEl.classList.remove("scale-125"), 200);

//       }, 800);
//     }
//   };

//   // TOMBOL 1: ADD TO CART (OPTIMISTIC UPDATE)
//   const handleAddToCart = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan", text: "Silakan masuk ke akun Anda untuk mulai berbelanja.", icon: "info", confirmButtonColor: "#059669", confirmButtonText: "Ke Halaman Login"
//       }).then(() => navigate("/login"));
//       return;
//     }

//     if (product?.color && product.color.length > 0 && !selectedColor) {
//        Swal.fire("Pilih Warna", "Silakan pilih varian warna terlebih dahulu.", "warning");
//        return;
//     }

//     setIsAdding(true);

//     // 1. TRIGGER ANIMASI SEKETIKA (Tanpa nunggu API)
//     triggerFlyingAnimation();

//     // 2. HIT API DI BACKGROUND
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: selectedColor
//         })
//       });

//       const data = await res.json();

//       if (res.ok) {
//         fetchCart(); // Panggil ini untuk me-refresh data keranjang asli dari database setelah animasi selesai

//         // Toast muncul diam-diam tanpa mem-block user
//         Swal.fire({
//           title: "Ditambahkan!",
//           icon: "success",
//           toast: true,
//           position: "top-end",
//           timer: 1500,
//           showConfirmButton: false
//         });
//       } else {
//         // Jika gagal, beritahu user (animasi sudah terlanjur terbang, tapi data tidak tersimpan)
//         Swal.fire("Gagal", data.message || "Stok tidak mencukupi atau terjadi kesalahan.", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   // TOMBOL 2: BUY IT NOW (Bypass Cart, langsung ke Checkout)
//   const handleBuyItNow = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({ title: "Login Diperlukan", icon: "info", confirmButtonColor: "#059669" }).then(() => navigate("/login"));
//       return;
//     }

//     if (product?.color && product.color.length > 0 && !selectedColor) {
//        Swal.fire("Pilih Warna", "Silakan pilih varian warna.", "warning");
//        return;
//     }

//     setIsBuyingNow(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//         body: JSON.stringify({ product_id: product?.id, quantity: quantity, color: selectedColor })
//       });
//       const data = await res.json();

//       if (res.ok) {
//         fetchCart();
//         navigate("/checkout", { state: { selectedIds: [data.cart_id] } });
//       } else {
//         Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsBuyingNow(false);
//     }
//   };

//   if (loading) return <div className="flex items-center justify-center min-h-screen font-sans bg-white"><div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div></div>;
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;
//   const isFormDisabled = isOutOfStock || isAdding || isBuyingNow;

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">

//           {/* Kolom Kiri: Gambar Produk */}
//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div id="product-image" className="relative group bg-gray-50 rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-[4/5] border border-gray-100 flex items-center justify-center">
//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-cover object-center w-full h-full transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
//                     />
//                   ))}
//                   {gallery.length > 1 && (
//                     <>
//                       <button onClick={prevImage} className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                       </button>
//                       <button onClick={nextImage} className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                       </button>
//                       <div className="absolute z-20 flex gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`h-2 rounded-full transition-all shadow-sm ${idx === currentImageIndex ? 'bg-gycora w-6' : 'bg-white/80 hover:bg-white w-2'}`} />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">No Image</div>
//               )}
//               <div className="absolute z-20 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">Video Demo</h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video src={product.variant_video} controls className="object-contain w-full h-64 md:h-80" />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Kolom Kanan: Detail dan Form */}
//           <div className="flex flex-col justify-center">
//              <div className="flex items-start justify-between gap-4 mb-2">
//                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">{product.name}</h1>
//                <button
//                  onClick={handleToggleWishlist}
//                  className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                  title="Simpan ke Favorit"
//                >
//                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}>
//                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                  </svg>
//                </button>
//              </div>

//              <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
//              <div className="mb-8"><p className="text-4xl font-extrabold text-gycora">{formatRupiah(product.price)}</p></div>

//              <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">

//                 {allColors.length > 0 && (
//                   <div className="pb-6 mb-6 border-b border-gray-200">
//                     <h3 className="mb-3 text-sm font-bold text-gray-700">Pilih Varian Warna:</h3>
//                     <div className="flex flex-wrap gap-3">
//                       {allColors.map((c, idx) => {
//                         const hex = typeof c === 'string' ? c : c.hex;
//                         const name = typeof c === 'string' ? '' : c.name;
//                         const colorString = typeof c === 'string' ? c : JSON.stringify(c);
//                         const isSelected = selectedColor === colorString;

//                         return (
//                           <button
//                             key={idx}
//                             onClick={() => setSelectedColor(colorString)}
//                             className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${isSelected ? 'border-gycora ring-2 ring-gycora/30 scale-105' : 'border-gray-200 hover:border-gray-300 hover:scale-105'}`}
//                             title={`Pilih warna ${name || hex}`}
//                           >
//                             <span className="w-5 h-5 border border-gray-300 rounded-full shadow-inner" style={{ backgroundColor: hex }}></span>
//                             {name && <span className={`text-xs font-bold ${isSelected ? 'text-gycora-dark' : 'text-gray-700'}`}>{name}</span>}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex flex-col gap-4">
//                   {/* QTY Input */}
//                   <div className="flex items-center justify-between w-full bg-white border border-gray-300 h-14 rounded-xl">
//                     <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={isFormDisabled} className="flex items-center justify-center w-12 h-full text-gray-600 transition-colors hover:text-gycora hover:bg-gray-50 rounded-l-xl disabled:opacity-50">-</button>
//                     <span className="font-bold text-gray-900">{quantity}</span>
//                     <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} disabled={isFormDisabled} className="flex items-center justify-center w-12 h-full text-gray-600 transition-colors hover:text-gycora hover:bg-gray-50 rounded-r-xl disabled:opacity-50">+</button>
//                   </div>

//                   {/* --- DOUBLE BUTTONS --- */}
//                   <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
//                     <button
//                       onClick={handleAddToCart}
//                       disabled={isFormDisabled}
//                       className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 ${
//                         isOutOfStock
//                           ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
//                           : 'bg-white border-gycora text-gycora hover:bg-emerald-50'
//                       }`}
//                     >
//                       {isAdding ? "Memproses..." : "Add to Cart"}
//                     </button>

//                     <button
//                       onClick={handleBuyItNow}
//                       disabled={isFormDisabled}
//                       className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all ${
//                         isOutOfStock
//                           ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                           : 'bg-gycora text-white hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5'
//                       }`}
//                     >
//                       {isBuyingNow ? "Memproses..." : (isOutOfStock ? 'Stok Habis' : 'Buy it Now')}
//                     </button>
//                   </div>

//                 </div>
//              </div>

//              <div className="space-y-8">
//                 <div>
//                   <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">Tentang Produk Ini</h3>
//                   <div className="leading-relaxed prose-sm prose text-gray-600 whitespace-pre-wrap sm:prose max-w-none">{product.description}</div>
//                 </div>
//                 {product.benefits && (
//                   <div>
//                     <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">Manfaat Utama</h3>
//                     <div className="p-5 border border-emerald-100 bg-emerald-50/50 rounded-2xl">
//                       <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">{product.benefits}</p>
//                     </div>
//                   </div>
//                 )}
//              </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
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

// export default function ProductDetail() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);

//   // Catatan: isAdding dihapus untuk implementasi murni Optimistic Update
//   const [isBuyingNow, setIsBuyingNow] = useState(false);

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);

//   const [isFavorited, setIsFavorited] = useState(false);

//   const { fetchCart } = useCart();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products/${id}`);
//         if (!res.ok) throw new Error("Produk tidak ditemukan");
//         const responseData = await res.json();

//         const productObject = responseData.data ? responseData.data : responseData;
//         setProduct(productObject);
//       } catch (error) {
//         console.error("Gagal memuat produk:", error);
//         navigate("/products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     const checkWishlistStatus = async () => {
//       const token = localStorage.getItem("user_token");
//       if (!token) return;

//       try {
//         const res = await fetch(`${BASE_URL}/api/wishlists`, {
//           headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//         });
//         if (res.ok) {
//           const data = await res.json();
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           const isWished = data.some((item: any) => item.product_id === Number(id));
//           setIsFavorited(isWished);
//         }
//       } catch (error) {
//         console.error("Gagal memeriksa wishlist:", error);
//       }
//     };

//     if (id) {
//       fetchProduct();
//       checkWishlistStatus();
//     }
//   }, [id, navigate]);

//   const handleToggleWishlist = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk menyimpan produk ke favorit.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#059669",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Ke Halaman Login",
//         cancelButtonText: "Batal"
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//           "Accept": "application/json"
//         },
//         body: JSON.stringify({ product_id: product?.id })
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   const allColors = useMemo(() => {
//     if (!product || !Array.isArray(product.color)) return [];
//     return product.color;
//   }, [product]);

//   useEffect(() => {
//     if (allColors.length > 0) {
//       const firstColorStr = typeof allColors[0] === 'string' ? allColors[0] : JSON.stringify(allColors[0]);
//       if (!selectedColor || !allColors.some(c => (typeof c === 'string' ? c : JSON.stringify(c)) === selectedColor)) {
//         setSelectedColor(firstColorStr);
//       }
//     } else {
//       setSelectedColor(null);
//     }
//   }, [allColors, selectedColor]);

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
//   };

//   // =========================================================================
//   // LOGIKA OPTIMISTIC ANIMATION (DIPERBARUI)
//   // =========================================================================
//   const triggerFlyingAnimation = () => {
//     const startEl = document.getElementById("product-image");
//     const endEl = document.getElementById("cart-icon");

//     if (startEl && endEl && gallery.length > 0) {
//       const startRect = startEl.getBoundingClientRect();
//       const endRect = endEl.getBoundingClientRect();

//       const flyingImg = document.createElement("img");
//       flyingImg.src = gallery[currentImageIndex];
//       flyingImg.style.position = "fixed";
//       flyingImg.style.top = `${startRect.top}px`;
//       flyingImg.style.left = `${startRect.left}px`;
//       flyingImg.style.width = `${startRect.width}px`;
//       flyingImg.style.height = `${startRect.height}px`;
//       flyingImg.style.borderRadius = "10%";
//       flyingImg.style.zIndex = "9999";
//       flyingImg.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//       document.body.appendChild(flyingImg);

//       requestAnimationFrame(() => {
//         flyingImg.style.top = `${endRect.top + 10}px`;
//         flyingImg.style.left = `${endRect.left + 10}px`;
//         flyingImg.style.width = "20px";
//         flyingImg.style.height = "20px";
//         flyingImg.style.opacity = "0.2";
//         flyingImg.style.borderRadius = "50%";
//       });

//       // Hapus setelah selesai terbang
//       setTimeout(() => {
//         flyingImg.remove();

//         // Animasi pop pada ikon keranjang agar terlihat lebih hidup
//         endEl.classList.add("scale-125");
//         setTimeout(() => endEl.classList.remove("scale-125"), 200);

//       }, 800);
//     }
//   };

//   // TOMBOL 1: ADD TO CART (MURNI OPTIMISTIC UPDATE)
//   const handleAddToCart = () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan", text: "Silakan masuk ke akun Anda untuk mulai berbelanja.", icon: "info", confirmButtonColor: "#059669", confirmButtonText: "Ke Halaman Login"
//       }).then(() => navigate("/login"));
//       return;
//     }

//     if (product?.color && product.color.length > 0 && !selectedColor) {
//        Swal.fire("Pilih Warna", "Silakan pilih varian warna terlebih dahulu.", "warning");
//        return;
//     }

//     // 1. TRIGGER ANIMASI DAN TOAST SEKETIKA (0 detik jeda)
//     triggerFlyingAnimation();
//     Swal.fire({
//       title: "Ditambahkan!",
//       icon: "success",
//       toast: true,
//       position: "top-end",
//       timer: 1500,
//       showConfirmButton: false
//     });

//     // 2. HIT API DI BACKGROUND SILENTLY
//     // Kita tidak perlu await di sini agar fungsi UI tidak tertahan
//     fetch(`${BASE_URL}/api/carts`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//       body: JSON.stringify({
//         product_id: product?.id,
//         quantity: quantity,
//         color: selectedColor
//       })
//     })
//     .then(res => res.json())
//     .then(data => {
//       if (data.cart_id) {
//         // Jika sukses, baru perbarui data asli dari server
//         fetchCart();
//       } else {
//         // Jika gagal di belakang layar (misal stok habis di detik terakhir)
//         Swal.fire("Pemberitahuan", data.message || "Gagal menambahkan produk ke keranjang.", "warning");
//       }
//     })
//     .catch(() => {
//        console.error("Gagal terhubung ke server saat add to cart");
//     });
//   };

//   // TOMBOL 2: BUY IT NOW (Bypass Cart, langsung ke Checkout)
//   const handleBuyItNow = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({ title: "Login Diperlukan", icon: "info", confirmButtonColor: "#059669" }).then(() => navigate("/login"));
//       return;
//     }

//     if (product?.color && product.color.length > 0 && !selectedColor) {
//        Swal.fire("Pilih Warna", "Silakan pilih varian warna.", "warning");
//        return;
//     }

//     setIsBuyingNow(true); // Untuk Buy It Now, loading state tetap diperlukan karena harus menunggu ID Cart
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//         body: JSON.stringify({ product_id: product?.id, quantity: quantity, color: selectedColor })
//       });
//       const data = await res.json();

//       if (res.ok && data.cart_id) {
//         fetchCart();
//         navigate("/checkout", { state: { selectedIds: [data.cart_id] } });
//       } else {
//         Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsBuyingNow(false);
//     }
//   };

//   if (loading) return <div className="flex items-center justify-center min-h-screen font-sans bg-white"><div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div></div>;
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;

//   // Hapus isAdding dari kondisi disabled agar tombol Add To Cart tidak pernah terkunci saat diklik
//   const isFormDisabled = isOutOfStock || isBuyingNow;

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">

//           {/* Kolom Kiri: Gambar Produk */}
//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div id="product-image" className="relative group bg-gray-50 rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-[4/5] border border-gray-100 flex items-center justify-center">
//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-cover object-center w-full h-full transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
//                     />
//                   ))}
//                   {gallery.length > 1 && (
//                     <>
//                       <button onClick={prevImage} className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                       </button>
//                       <button onClick={nextImage} className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                       </button>
//                       <div className="absolute z-20 flex gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`h-2 rounded-full transition-all shadow-sm ${idx === currentImageIndex ? 'bg-gycora w-6' : 'bg-white/80 hover:bg-white w-2'}`} />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">No Image</div>
//               )}
//               <div className="absolute z-20 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">Video Demo</h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video src={product.variant_video} controls className="object-contain w-full h-64 md:h-80" />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Kolom Kanan: Detail dan Form */}
//           <div className="flex flex-col justify-center">
//              <div className="flex items-start justify-between gap-4 mb-2">
//                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">{product.name}</h1>
//                <button
//                  onClick={handleToggleWishlist}
//                  className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                  title="Simpan ke Favorit"
//                >
//                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}>
//                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                  </svg>
//                </button>
//              </div>

//              <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
//              <div className="mb-8"><p className="text-4xl font-extrabold text-gycora">{formatRupiah(product.price)}</p></div>

//              <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">

//                 {allColors.length > 0 && (
//                   <div className="pb-6 mb-6 border-b border-gray-200">
//                     <h3 className="mb-3 text-sm font-bold text-gray-700">Pilih Varian Warna:</h3>
//                     <div className="flex flex-wrap gap-3">
//                       {allColors.map((c, idx) => {
//                         const hex = typeof c === 'string' ? c : c.hex;
//                         const name = typeof c === 'string' ? '' : c.name;
//                         const colorString = typeof c === 'string' ? c : JSON.stringify(c);
//                         const isSelected = selectedColor === colorString;

//                         return (
//                           <button
//                             key={idx}
//                             onClick={() => setSelectedColor(colorString)}
//                             className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${isSelected ? 'border-gycora ring-2 ring-gycora/30 scale-105' : 'border-gray-200 hover:border-gray-300 hover:scale-105'}`}
//                             title={`Pilih warna ${name || hex}`}
//                           >
//                             <span className="w-5 h-5 border border-gray-300 rounded-full shadow-inner" style={{ backgroundColor: hex }}></span>
//                             {name && <span className={`text-xs font-bold ${isSelected ? 'text-gycora-dark' : 'text-gray-700'}`}>{name}</span>}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex flex-col gap-4">
//                   {/* QTY Input */}
//                   <div className="flex items-center justify-between w-full bg-white border border-gray-300 h-14 rounded-xl">
//                     <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={isFormDisabled} className="flex items-center justify-center w-12 h-full text-gray-600 transition-colors hover:text-gycora hover:bg-gray-50 rounded-l-xl disabled:opacity-50">-</button>
//                     <span className="font-bold text-gray-900">{quantity}</span>
//                     <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} disabled={isFormDisabled} className="flex items-center justify-center w-12 h-full text-gray-600 transition-colors hover:text-gycora hover:bg-gray-50 rounded-r-xl disabled:opacity-50">+</button>
//                   </div>

//                   {/* --- DOUBLE BUTTONS --- */}
//                   <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
//                     <button
//                       onClick={handleAddToCart}
//                       disabled={isFormDisabled}
//                       className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 ${
//                         isOutOfStock
//                           ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
//                           : 'bg-white border-gycora text-gycora hover:bg-emerald-50 active:scale-95'
//                       }`}
//                     >
//                       Add to Cart
//                     </button>

//                     <button
//                       onClick={handleBuyItNow}
//                       disabled={isFormDisabled}
//                       className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all ${
//                         isOutOfStock
//                           ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                           : 'bg-gycora text-white hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5 active:scale-95'
//                       }`}
//                     >
//                       {isBuyingNow ? "Memproses..." : (isOutOfStock ? 'Stok Habis' : 'Buy it Now')}
//                     </button>
//                   </div>

//                 </div>
//              </div>

//              <div className="space-y-8">
//                 <div>
//                   <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">Tentang Produk Ini</h3>
//                   <div className="leading-relaxed prose-sm prose text-gray-600 whitespace-pre-wrap sm:prose max-w-none">{product.description}</div>
//                 </div>
//                 {product.benefits && (
//                   <div>
//                     <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">Manfaat Utama</h3>
//                     <div className="p-5 border border-emerald-100 bg-emerald-50/50 rounded-2xl">
//                       <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">{product.benefits}</p>
//                     </div>
//                   </div>
//                 )}
//              </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
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

// export default function ProductDetail() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);

//   const [isBuyingNow, setIsBuyingNow] = useState(false);

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);

//   const [isFavorited, setIsFavorited] = useState(false);

//   // Mengambil fungsi optimistic dari CartContext
//   const { fetchCart, cartItems, addCartItemOptimistically, revertCartItems } = useCart();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products/${id}`);
//         if (!res.ok) throw new Error("Produk tidak ditemukan");
//         const responseData = await res.json();

//         const productObject = responseData.data ? responseData.data : responseData;
//         setProduct(productObject);
//       } catch (error) {
//         console.error("Gagal memuat produk:", error);
//         navigate("/products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     const checkWishlistStatus = async () => {
//       const token = localStorage.getItem("user_token");
//       if (!token) return;

//       try {
//         const res = await fetch(`${BASE_URL}/api/wishlists`, {
//           headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//         });
//         if (res.ok) {
//           const data = await res.json();
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           const isWished = data.some((item: any) => item.product_id === Number(id));
//           setIsFavorited(isWished);
//         }
//       } catch (error) {
//         console.error("Gagal memeriksa wishlist:", error);
//       }
//     };

//     if (id) {
//       fetchProduct();
//       checkWishlistStatus();
//     }
//   }, [id, navigate]);

//   const handleToggleWishlist = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk menyimpan produk ke favorit.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#059669",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Ke Halaman Login",
//         cancelButtonText: "Batal"
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//           "Accept": "application/json"
//         },
//         body: JSON.stringify({ product_id: product?.id })
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   const allColors = useMemo(() => {
//     if (!product || !Array.isArray(product.color)) return [];
//     return product.color;
//   }, [product]);

//   useEffect(() => {
//     if (allColors.length > 0) {
//       const firstColorStr = typeof allColors[0] === 'string' ? allColors[0] : JSON.stringify(allColors[0]);
//       if (!selectedColor || !allColors.some(c => (typeof c === 'string' ? c : JSON.stringify(c)) === selectedColor)) {
//         setSelectedColor(firstColorStr);
//       }
//     } else {
//       setSelectedColor(null);
//     }
//   }, [allColors, selectedColor]);

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
//   };

//   const triggerFlyingAnimation = () => {
//     const startEl = document.getElementById("product-image");
//     const endEl = document.getElementById("cart-icon");

//     if (startEl && endEl && gallery.length > 0) {
//       const startRect = startEl.getBoundingClientRect();
//       const endRect = endEl.getBoundingClientRect();

//       const flyingImg = document.createElement("img");
//       flyingImg.src = gallery[currentImageIndex];
//       flyingImg.style.position = "fixed";
//       flyingImg.style.top = `${startRect.top}px`;
//       flyingImg.style.left = `${startRect.left}px`;
//       flyingImg.style.width = `${startRect.width}px`;
//       flyingImg.style.height = `${startRect.height}px`;
//       flyingImg.style.borderRadius = "10%";
//       flyingImg.style.zIndex = "9999";
//       flyingImg.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//       document.body.appendChild(flyingImg);

//       requestAnimationFrame(() => {
//         flyingImg.style.top = `${endRect.top + 10}px`;
//         flyingImg.style.left = `${endRect.left + 10}px`;
//         flyingImg.style.width = "20px";
//         flyingImg.style.height = "20px";
//         flyingImg.style.opacity = "0.2";
//         flyingImg.style.borderRadius = "50%";
//       });

//       setTimeout(() => {
//         flyingImg.remove();
//         endEl.classList.add("scale-125");
//         setTimeout(() => endEl.classList.remove("scale-125"), 200);
//       }, 800);
//     }
//   };

//   // TOMBOL 1: FULL OPTIMISTIC ADD TO CART
//   const handleAddToCart = () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({ title: "Login Diperlukan", text: "Silakan masuk ke akun Anda untuk mulai berbelanja.", icon: "info", confirmButtonColor: "#059669", confirmButtonText: "Ke Halaman Login" }).then(() => navigate("/login"));
//       return;
//     }

//     if (product?.color && product.color.length > 0 && !selectedColor) {
//        Swal.fire("Pilih Warna", "Silakan pilih varian warna terlebih dahulu.", "warning");
//        return;
//     }

//     // 1. Amankan state lama untuk antisipasi API gagal
//     const previousCartState = [...cartItems];

//     // 2. Suntikkan data dummy ke CartContext SECARA INSTAN
//     const optimisticItem = {
//       id: Date.now(), // Fake ID
//       product_id: product!.id,
//       quantity: quantity,
//       gross_amount: quantity * product!.price,
//       color: selectedColor,
//       product: {
//         id: product!.id,
//         name: product!.name,
//         price: product!.price,
//         image_url: product!.image_url,
//         sku: product!.sku,
//         stock: product!.stock,
//         color: product?.color ? JSON.stringify(product.color) : "" // Cast array to string for type matching
//       }
//     };

//     addCartItemOptimistically(optimisticItem);

//     // 3. Jalankan Animasi & Toast
//     triggerFlyingAnimation();
//     Swal.fire({
//       title: "Ditambahkan!",
//       icon: "success",
//       toast: true,
//       position: "top-end",
//       timer: 1500,
//       showConfirmButton: false
//     });

//     // 4. Hit API di background
//     fetch(`${BASE_URL}/api/carts`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//       body: JSON.stringify({
//         product_id: product?.id,
//         quantity: quantity,
//         color: selectedColor
//       })
//     })
//     .then(async (res) => {
//       const data = await res.json();
//       if (res.ok && data.cart_id) {
//         // Jika sukses, fetch ulang untuk mendapatkan ID Cart yang asli dari DB
//         fetchCart();
//       } else {
//         // JIKA GAGAL: Revert (Kembalikan) badge dan data ke semula
//         revertCartItems(previousCartState);
//         Swal.fire("Pemberitahuan", data.message || "Gagal menambahkan produk ke keranjang.", "warning");
//       }
//     })
//     .catch(() => {
//        // JIKA GAGAL JARINGAN: Revert state
//        revertCartItems(previousCartState);
//        console.error("Gagal terhubung ke server saat add to cart");
//     });
//   };

//   // TOMBOL 2: BUY IT NOW (Logic tetap karena butuh ID cart yang asli)
//   const handleBuyItNow = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({ title: "Login Diperlukan", icon: "info", confirmButtonColor: "#059669" }).then(() => navigate("/login"));
//       return;
//     }

//     if (product?.color && product.color.length > 0 && !selectedColor) {
//        Swal.fire("Pilih Warna", "Silakan pilih varian warna.", "warning");
//        return;
//     }

//     setIsBuyingNow(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//         body: JSON.stringify({ product_id: product?.id, quantity: quantity, color: selectedColor })
//       });
//       const data = await res.json();

//       if (res.ok && data.cart_id) {
//         fetchCart();
//         navigate("/checkout", { state: { selectedIds: [data.cart_id] } });
//       } else {
//         Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsBuyingNow(false);
//     }
//   };

//   if (loading) return <div className="flex items-center justify-center min-h-screen font-sans bg-white"><div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div></div>;
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;
//   const isFormDisabled = isOutOfStock || isBuyingNow;

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">

//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div id="product-image" className="relative group bg-gray-50 rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-[4/5] border border-gray-100 flex items-center justify-center">
//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-cover object-center w-full h-full transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
//                     />
//                   ))}
//                   {gallery.length > 1 && (
//                     <>
//                       <button onClick={prevImage} className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                       </button>
//                       <button onClick={nextImage} className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                       </button>
//                       <div className="absolute z-20 flex gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`h-2 rounded-full transition-all shadow-sm ${idx === currentImageIndex ? 'bg-gycora w-6' : 'bg-white/80 hover:bg-white w-2'}`} />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">No Image</div>
//               )}
//               <div className="absolute z-20 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">Video Demo</h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video src={product.variant_video} controls className="object-contain w-full h-64 md:h-80" />
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="flex flex-col justify-center">
//              <div className="flex items-start justify-between gap-4 mb-2">
//                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">{product.name}</h1>
//                <button
//                  onClick={handleToggleWishlist}
//                  className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                  title="Simpan ke Favorit"
//                >
//                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}>
//                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                  </svg>
//                </button>
//              </div>

//              <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
//              <div className="mb-8"><p className="text-4xl font-extrabold text-gycora">{formatRupiah(product.price)}</p></div>

//              <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">

//                 {allColors.length > 0 && (
//                   <div className="pb-6 mb-6 border-b border-gray-200">
//                     <h3 className="mb-3 text-sm font-bold text-gray-700">Pilih Varian Warna:</h3>
//                     <div className="flex flex-wrap gap-3">
//                       {allColors.map((c, idx) => {
//                         const hex = typeof c === 'string' ? c : c.hex;
//                         const name = typeof c === 'string' ? '' : c.name;
//                         const colorString = typeof c === 'string' ? c : JSON.stringify(c);
//                         const isSelected = selectedColor === colorString;

//                         return (
//                           <button
//                             key={idx}
//                             onClick={() => setSelectedColor(colorString)}
//                             className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${isSelected ? 'border-gycora ring-2 ring-gycora/30 scale-105' : 'border-gray-200 hover:border-gray-300 hover:scale-105'}`}
//                             title={`Pilih warna ${name || hex}`}
//                           >
//                             <span className="w-5 h-5 border border-gray-300 rounded-full shadow-inner" style={{ backgroundColor: hex }}></span>
//                             {name && <span className={`text-xs font-bold ${isSelected ? 'text-gycora-dark' : 'text-gray-700'}`}>{name}</span>}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex flex-col gap-4">
//                   <div className="flex items-center justify-between w-full bg-white border border-gray-300 h-14 rounded-xl">
//                     <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={isFormDisabled} className="flex items-center justify-center w-12 h-full text-gray-600 transition-colors hover:text-gycora hover:bg-gray-50 rounded-l-xl disabled:opacity-50">-</button>
//                     <span className="font-bold text-gray-900">{quantity}</span>
//                     <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} disabled={isFormDisabled} className="flex items-center justify-center w-12 h-full text-gray-600 transition-colors hover:text-gycora hover:bg-gray-50 rounded-r-xl disabled:opacity-50">+</button>
//                   </div>

//                   <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
//                     <button
//                       onClick={handleAddToCart}
//                       disabled={isFormDisabled}
//                       className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 ${
//                         isOutOfStock
//                           ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
//                           : 'bg-white border-gycora text-gycora hover:bg-emerald-50 active:scale-95'
//                       }`}
//                     >
//                       Add to Cart
//                     </button>

//                     <button
//                       onClick={handleBuyItNow}
//                       disabled={isFormDisabled}
//                       className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all ${
//                         isOutOfStock
//                           ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                           : 'bg-gycora text-white hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5 active:scale-95'
//                       }`}
//                     >
//                       {isBuyingNow ? "Memproses..." : (isOutOfStock ? 'Stok Habis' : 'Buy it Now')}
//                     </button>
//                   </div>

//                 </div>
//              </div>

//              <div className="space-y-8">
//                 <div>
//                   <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">Tentang Produk Ini</h3>
//                   <div className="leading-relaxed prose-sm prose text-gray-600 whitespace-pre-wrap sm:prose max-w-none">{product.description}</div>
//                 </div>
//                 {product.benefits && (
//                   <div>
//                     <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">Manfaat Utama</h3>
//                     <div className="p-5 border border-emerald-100 bg-emerald-50/50 rounded-2xl">
//                       <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">{product.benefits}</p>
//                     </div>
//                   </div>
//                 )}
//              </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
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

// export default function ProductDetail() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);

//   // State untuk Quantity diubah menjadi string sementara agar bisa diketik kosong saat dihapus user
//   const [quantityInput, setQuantityInput] = useState<string>("1");
//   const quantity = parseInt(quantityInput) || 1; // Konversi ke angka yang valid

//   const [isBuyingNow, setIsBuyingNow] = useState(false);

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);

//   const [isFavorited, setIsFavorited] = useState(false);

//   const { fetchCart, cartItems, addCartItemOptimistically, revertCartItems } = useCart();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products/${id}`);
//         if (!res.ok) throw new Error("Produk tidak ditemukan");
//         const responseData = await res.json();

//         const productObject = responseData.data ? responseData.data : responseData;
//         setProduct(productObject);
//       } catch (error) {
//         console.error("Gagal memuat produk:", error);
//         navigate("/products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     const checkWishlistStatus = async () => {
//       const token = localStorage.getItem("user_token");
//       if (!token) return;

//       try {
//         const res = await fetch(`${BASE_URL}/api/wishlists`, {
//           headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//         });
//         if (res.ok) {
//           const data = await res.json();
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           const isWished = data.some((item: any) => item.product_id === Number(id));
//           setIsFavorited(isWished);
//         }
//       } catch (error) {
//         console.error("Gagal memeriksa wishlist:", error);
//       }
//     };

//     if (id) {
//       fetchProduct();
//       checkWishlistStatus();
//     }
//   }, [id, navigate]);

//   const handleToggleWishlist = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk menyimpan produk ke favorit.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#059669",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Ke Halaman Login",
//         cancelButtonText: "Batal"
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//           "Accept": "application/json"
//         },
//         body: JSON.stringify({ product_id: product?.id })
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   const allColors = useMemo(() => {
//     if (!product || !Array.isArray(product.color)) return [];
//     return product.color;
//   }, [product]);

//   useEffect(() => {
//     if (allColors.length > 0) {
//       const firstColorStr = typeof allColors[0] === 'string' ? allColors[0] : JSON.stringify(allColors[0]);
//       if (!selectedColor || !allColors.some(c => (typeof c === 'string' ? c : JSON.stringify(c)) === selectedColor)) {
//         setSelectedColor(firstColorStr);
//       }
//     } else {
//       setSelectedColor(null);
//     }
//   }, [allColors, selectedColor]);

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
//   };

//   const triggerFlyingAnimation = () => {
//     const startEl = document.getElementById("product-image");
//     const endEl = document.getElementById("cart-icon");

//     if (startEl && endEl && gallery.length > 0) {
//       const startRect = startEl.getBoundingClientRect();
//       const endRect = endEl.getBoundingClientRect();

//       const flyingImg = document.createElement("img");
//       flyingImg.src = gallery[currentImageIndex];
//       flyingImg.style.position = "fixed";
//       flyingImg.style.top = `${startRect.top}px`;
//       flyingImg.style.left = `${startRect.left}px`;
//       flyingImg.style.width = `${startRect.width}px`;
//       flyingImg.style.height = `${startRect.height}px`;
//       flyingImg.style.borderRadius = "10%";
//       flyingImg.style.zIndex = "9999";
//       flyingImg.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//       document.body.appendChild(flyingImg);

//       requestAnimationFrame(() => {
//         flyingImg.style.top = `${endRect.top + 10}px`;
//         flyingImg.style.left = `${endRect.left + 10}px`;
//         flyingImg.style.width = "20px";
//         flyingImg.style.height = "20px";
//         flyingImg.style.opacity = "0.2";
//         flyingImg.style.borderRadius = "50%";
//       });

//       setTimeout(() => {
//         flyingImg.remove();
//         endEl.classList.add("scale-125");
//         setTimeout(() => endEl.classList.remove("scale-125"), 200);
//       }, 800);
//     }
//   };

//   const handleAddToCart = () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({ title: "Login Diperlukan", text: "Silakan masuk ke akun Anda untuk mulai berbelanja.", icon: "info", confirmButtonColor: "#059669", confirmButtonText: "Ke Halaman Login" }).then(() => navigate("/login"));
//       return;
//     }

//     if (product?.color && product.color.length > 0 && !selectedColor) {
//        Swal.fire("Pilih Warna", "Silakan pilih varian warna terlebih dahulu.", "warning");
//        return;
//     }

//     const previousCartState = [...cartItems];
//     const optimisticItem = {
//       id: Date.now(),
//       product_id: product!.id,
//       quantity: quantity,
//       gross_amount: quantity * product!.price,
//       color: selectedColor,
//       product: {
//         id: product!.id,
//         name: product!.name,
//         price: product!.price,
//         image_url: product!.image_url,
//         sku: product!.sku,
//         stock: product!.stock,
//         color: product?.color ? JSON.stringify(product.color) : ""
//       }
//     };

//     addCartItemOptimistically(optimisticItem);
//     triggerFlyingAnimation();
//     Swal.fire({ title: "Ditambahkan!", icon: "success", toast: true, position: "top-end", timer: 1500, showConfirmButton: false });

//     fetch(`${BASE_URL}/api/carts`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//       body: JSON.stringify({ product_id: product?.id, quantity: quantity, color: selectedColor })
//     })
//     .then(async (res) => {
//       const data = await res.json();
//       if (res.ok && data.cart_id) {
//         fetchCart();
//       } else {
//         revertCartItems(previousCartState);
//         Swal.fire("Pemberitahuan", data.message || "Gagal menambahkan produk ke keranjang.", "warning");
//       }
//     })
//     .catch(() => {
//        revertCartItems(previousCartState);
//        console.error("Gagal terhubung ke server saat add to cart");
//     });
//   };

//   const handleBuyItNow = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({ title: "Login Diperlukan", icon: "info", confirmButtonColor: "#059669" }).then(() => navigate("/login"));
//       return;
//     }

//     if (product?.color && product.color.length > 0 && !selectedColor) {
//        Swal.fire("Pilih Warna", "Silakan pilih varian warna.", "warning");
//        return;
//     }

//     setIsBuyingNow(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//         body: JSON.stringify({ product_id: product?.id, quantity: quantity, color: selectedColor })
//       });
//       const data = await res.json();

//       if (res.ok && data.cart_id) {
//         fetchCart();
//         navigate("/checkout", { state: { selectedIds: [data.cart_id] } });
//       } else {
//         Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsBuyingNow(false);
//     }
//   };

//   // --- FUNGSI HANDLE INPUT KUANTITAS ---
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value;
//     if (val === "" || /^\d+$/.test(val)) {
//       setQuantityInput(val);
//     }
//   };

//   const handleInputBlur = () => {
//     let parsed = parseInt(quantityInput);
//     if (isNaN(parsed) || parsed < 1) parsed = 1;
//     if (product && parsed > product.stock) {
//       parsed = product.stock;
//       Swal.fire({ toast: true, position: 'top-end', icon: 'warning', title: `Maksimal stok adalah ${product.stock}`, showConfirmButton: false, timer: 2000 });
//     }
//     setQuantityInput(parsed.toString());
//   };

//   if (loading) return <div className="flex items-center justify-center min-h-screen font-sans bg-white"><div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div></div>;
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;
//   const isFormDisabled = isOutOfStock || isBuyingNow;

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">

//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div id="product-image" className="relative group bg-gray-50 rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-[4/5] border border-gray-100 flex items-center justify-center">
//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-cover object-center w-full h-full transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
//                     />
//                   ))}
//                   {gallery.length > 1 && (
//                     <>
//                       <button onClick={prevImage} className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                       </button>
//                       <button onClick={nextImage} className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                       </button>
//                       <div className="absolute z-20 flex gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`h-2 rounded-full transition-all shadow-sm ${idx === currentImageIndex ? 'bg-gycora w-6' : 'bg-white/80 hover:bg-white w-2'}`} />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">No Image</div>
//               )}
//               <div className="absolute z-20 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">Video Demo</h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video src={product.variant_video} controls className="object-contain w-full h-64 md:h-80" />
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="flex flex-col justify-center">
//              <div className="flex items-start justify-between gap-4 mb-2">
//                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">{product.name}</h1>
//                <button
//                  onClick={handleToggleWishlist}
//                  className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                  title="Simpan ke Favorit"
//                >
//                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}>
//                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                  </svg>
//                </button>
//              </div>

//              <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
//              <div className="mb-8"><p className="text-4xl font-extrabold text-gycora">{formatRupiah(product.price)}</p></div>

//              <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">

//                 {allColors.length > 0 && (
//                   <div className="pb-6 mb-6 border-b border-gray-200">
//                     <h3 className="mb-3 text-sm font-bold text-gray-700">Pilih Varian Warna:</h3>
//                     <div className="flex flex-wrap gap-3">
//                       {allColors.map((c, idx) => {
//                         const hex = typeof c === 'string' ? c : c.hex;
//                         const name = typeof c === 'string' ? '' : c.name;
//                         const colorString = typeof c === 'string' ? c : JSON.stringify(c);
//                         const isSelected = selectedColor === colorString;

//                         return (
//                           <button
//                             key={idx}
//                             onClick={() => setSelectedColor(colorString)}
//                             className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${isSelected ? 'border-gycora ring-2 ring-gycora/30 scale-105' : 'border-gray-200 hover:border-gray-300 hover:scale-105'}`}
//                             title={`Pilih warna ${name || hex}`}
//                           >
//                             <span className="w-5 h-5 border border-gray-300 rounded-full shadow-inner" style={{ backgroundColor: hex }}></span>
//                             {name && <span className={`text-xs font-bold ${isSelected ? 'text-gycora-dark' : 'text-gray-700'}`}>{name}</span>}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex flex-col gap-4">
//                   {/* PERBAIKAN: QTY INPUT BISA DIKETIK */}
//                   <div className="flex items-center justify-between w-full overflow-hidden bg-white border border-gray-300 h-14 rounded-xl">
//                     <button
//                       onClick={() => {
//                         const newVal = Math.max(1, quantity - 1);
//                         setQuantityInput(newVal.toString());
//                       }}
//                       disabled={isFormDisabled}
//                       className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-gycora hover:bg-gray-50 disabled:opacity-50"
//                     >
//                       -
//                     </button>

//                     <input
//                       type="text"
//                       value={quantityInput}
//                       onChange={handleInputChange}
//                       onBlur={handleInputBlur}
//                       disabled={isFormDisabled}
//                       className="w-full h-full font-bold text-center text-gray-900 bg-transparent outline-none appearance-none focus:ring-0"
//                     />

//                     <button
//                       onClick={() => {
//                         const newVal = Math.min(product.stock, quantity + 1);
//                         setQuantityInput(newVal.toString());
//                       }}
//                       disabled={isFormDisabled}
//                       className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-gycora hover:bg-gray-50 disabled:opacity-50"
//                     >
//                       +
//                     </button>
//                   </div>

//                   <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
//                     <button
//                       onClick={handleAddToCart}
//                       disabled={isFormDisabled}
//                       className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 ${
//                         isOutOfStock
//                           ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
//                           : 'bg-white border-gycora text-gycora hover:bg-emerald-50 active:scale-95'
//                       }`}
//                     >
//                       Add to Cart
//                     </button>

//                     <button
//                       onClick={handleBuyItNow}
//                       disabled={isFormDisabled}
//                       className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all ${
//                         isOutOfStock
//                           ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                           : 'bg-gycora text-white hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5 active:scale-95'
//                       }`}
//                     >
//                       {isBuyingNow ? "Memproses..." : (isOutOfStock ? 'Stok Habis' : 'Buy it Now')}
//                     </button>
//                   </div>

//                 </div>
//              </div>

//              <div className="space-y-8">
//                 <div>
//                   <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">Tentang Produk Ini</h3>
//                   <div className="leading-relaxed prose-sm prose text-gray-600 whitespace-pre-wrap sm:prose max-w-none">{product.description}</div>
//                 </div>
//                 {product.benefits && (
//                   <div>
//                     <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">Manfaat Utama</h3>
//                     <div className="p-5 border border-emerald-100 bg-emerald-50/50 rounded-2xl">
//                       <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">{product.benefits}</p>
//                     </div>
//                   </div>
//                 )}
//              </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";

// // =========================================================
// // [BARU] KAMUS WARNA (Sama seperti versi Vue)
// // =========================================================
// const colorMapHex: Record<string, string> = {
//   Black: "#000000",
//   White: "#FFFFFF",
//   Brown: "#8B4513",
//   Beige: "#F5F5DC",
//   Red: "#8B0000",
//   Navy: "#000080",
//   Green: "#008000",
//   Grey: "#808080",
//   Pink: "#FFC0CB",
//   Yellow: "#FFD700",
//   Blue: "#4169E1",
//   Mocca: "#967969",
//   Cream: "#FDF4E3",
//   Sage: "#9DC183",
//   Gold: "#D4AF37",
//   Orange: "#FF9900",
//   Silver: "#C0C0C0",
//   Maroon: "#800000",
//   Olive: "#808000",
//   Taupe: "#483C32",
//   Khaki: "#F0E68C",
//   Mustard: "#FFDB58",
//   Emerald: "#50C878",
//   Coral: "#FF7F50",
//   Mint: "#98FF98",
//   Teal: "#008080",
//   Cyan: "#00FFFF",
//   Indigo: "#4B0082",
//   Violet: "#EE82EE",
//   Purple: "#800080",
//   Magenta: "#FF00FF",
//   Lilac: "#C8A2C8",
//   Lavender: "#E6E6FA",
//   Rose: "#FF007F",
//   Peach: "#FFE5B4",
//   Apricot: "#FBCEB1",
//   Ivory: "#FFFFF0",
//   Tan: "#D2B48C",
//   Charcoal: "#36454F",
//   Ash: "#555555",
//   Platinum: "#E5E4E2",
//   Bronze: "#CD7F32",
//   Copper: "#B87333",
//   Rust: "#B7410E",
//   Ochre: "#CC7722",
//   Sienna: "#882D17",
//   Terracotta: "#E2725B",
//   Amber: "#FFBF00",
//   Caramel: "#FFD59A",
//   Honey: "#FFC30B",
//   Chestnut: "#954535",
//   Walnut: "#5C4033",
//   Mahogany: "#C04000",
//   Chocolate: "#7B3F00",
//   Cocoa: "#D2691E",
//   Coffee: "#6F4E37",
//   Mocha: "#493D26",
//   Espresso: "#4B3621",
//   Cappuccino: "#654321",
//   Latte: "#C5A059",
//   Macchiato: "#8B5A2B",
//   Almond: "#EED9C4",
//   Hazelnut: "#C4A484",
//   Pecan: "#8A3324",
//   Pistachio: "#93C572",
//   Seafoam: "#9FE2BF",
//   Turquoise: "#40E0D0",
//   Aqua: "#00FFFF",
//   Azure: "#00FFFF",
//   Sky: "#87CEEB",
//   Cerulean: "#007BA7",
//   Cobalt: "#0047AB",
//   Sapphire: "#0F52BA",
//   Ultramarine: "#120A8F",
//   Lapis: "#26619C",
//   Denim: "#1560BD",
//   Steel: "#4682B4",
//   Slate: "#708090",
//   Gunmetal: "#2a3439",
//   Onyx: "#353839",
//   Jet: "#343434",
//   Ebony: "#555D50",
//   Raven: "#050301",
//   Pitch: "#000000",
//   Obsidian: "#0B0B0B",
//   Carbon: "#333333",
//   Graphite: "#383838",
//   Pewter: "#8E8E8E",
//   Zinc: "#8C92AC",
//   Lead: "#778899",
//   Iron: "#A19D94",
//   Titanium: "#878681",
//   Chromium: "#C0C0C0",
//   Nickel: "#727472",
//   Tungsten: "#A0A0A0",
//   Fuchsia: "#FF00FF",
//   Crimson: "#DC143C",
//   Carmine: "#960018",
//   Ruby: "#E0115F",
//   Scarlet: "#FF2400",
//   Vermilion: "#E34234",
//   Brick: "#CB4154",
//   Tomato: "#FF6347",
//   Papaya: "#FFEFD5",
//   Melon: "#FDBCB4",
//   Mango: "#F4A460",
//   Citrus: "#FFA500",
//   Lemon: "#FFF700",
//   Lime: "#BFFF00",
//   Kiwi: "#8EE53F",
//   Apple: "#8DB600",
//   Pear: "#D1E231",
//   Grape: "#6F2DA8",
//   Plum: "#8E4585",
//   Blackberry: "#4D0135",
//   Mulberry: "#C54B8C",
//   Raisin: "#652DC1",
//   Eggplant: "#614051",
//   Aubergine: "#472C4C",
//   Amethyst: "#9966CC",
//   Orchid: "#DA70D6",
//   Heather: "#D473D4",
//   Thistle: "#D8BFD8",
//   Mauve: "#E0B0FF",
//   Wisteria: "#C9A0DC",
//   Periwinkle: "#CCCCFF",
//   Cornflower: "#6495ED",
//   Baby: "#89CFF0",
//   Powder: "#B0E0E6",
//   Midnight: "#191970",
//   Ocean: "#0077BE",
// };

// // =========================================================
// // [BARU] HELPER EKSTRAKSI WARNA (Sama seperti versi Vue)
// // =========================================================
// const extractColorName = (fullName: string) => {
//   if (!fullName) return "Main";
//   const words = fullName.trim().split(" ");
//   const lastWord = words[words.length - 1];
//   return lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
// };

// const extractColorHex = (fullName: string) => {
//   const colorName = extractColorName(fullName);
//   return colorMapHex[colorName] || "#cccccc";
// };

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
//   sku: string;
//   name: string;
//   slug: string;
//   description: string;
//   benefits: string;
//   price: number;
//   discount_price: number;
//   voucher_discount_price?: number;

//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   color?: any[];
// }

// export default function ProductDetail() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);

//   const [quantityInput, setQuantityInput] = useState<string>("1");
//   const quantity = parseInt(quantityInput) || 1;

//   const [isBuyingNow, setIsBuyingNow] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   // [BARU] State untuk menyimpan produk saudara menggunakan logika Vue
//   const [siblingColors, setSiblingColors] = useState<Product[]>([]);

//   const [isFavorited, setIsFavorited] = useState(false);
//   const { fetchCart, cartItems, addCartItemOptimistically, revertCartItems } =
//     useCart();

//   // =========================================================
//   // [BARU] FUNGSI FETCH SIBLING SEPERTI DI VUE
//   // =========================================================
//   const fetchSiblingColors = async (productName: string) => {
//     if (!productName) return;
//     try {
//       const words = productName.trim().split(" ");
//       let rootName = productName;

//       // Hapus 1 kata terakhir sebagai warna
//       if (words.length > 1) {
//         words.pop();
//         rootName = words.join(" ");
//       }

//       // Ambil seluruh produk dari API public
//       const res = await fetch(`${BASE_URL}/api/products`);
//       const data = await res.json();
//       const allProducts = data.data ? data.data : data;

//       // Filter nama produk yang mengandung rootName
//       const siblings = allProducts.filter((p: Product) =>
//         p.name.toLowerCase().includes(rootName.toLowerCase()),
//       );

//       if (siblings.length <= 1) {
//         setSiblingColors([]);
//       } else {
//         setSiblingColors(siblings);
//       }
//     } catch (error) {
//       console.error("Gagal menarik data varian warna:", error);
//     }
//   };

//   useEffect(() => {
//     setLoading(true);
//     setProduct(null);
//     setCurrentImageIndex(0);
//     setQuantityInput("1");

//     const fetchProductAndSiblings = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products/${id}`);
//         if (!res.ok) throw new Error("Produk tidak ditemukan");
//         const responseData = await res.json();

//         const productObject = responseData.data
//           ? responseData.data
//           : responseData;
//         setProduct(productObject);

//         // Setelah produk didapat, cari siblingsnya
//         await fetchSiblingColors(productObject.name);
//       } catch (error) {
//         console.error("Gagal memuat produk:", error);
//         navigate("/products");
//       }
//     };

//     const checkWishlistStatus = async () => {
//       const token = localStorage.getItem("user_token");
//       if (!token) return;

//       try {
//         const res = await fetch(`${BASE_URL}/api/wishlists`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         });
//         if (res.ok) {
//           const data = await res.json();
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           const isWished = data.some(
//             (item: any) => item.product_id === Number(id),
//           );
//           setIsFavorited(isWished);
//         }
//       } catch (error) {
//         console.error("Gagal memeriksa wishlist:", error);
//       }
//     };

//     if (id) {
//       Promise.all([fetchProductAndSiblings(), checkWishlistStatus()]).finally(
//         () => {
//           setLoading(false);
//         },
//       );
//     }
//   }, [id, navigate]);

//   const handleToggleWishlist = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk menyimpan produk ke favorit.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#059669",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Ke Halaman Login",
//         cancelButtonText: "Batal",
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ product_id: product?.id }),
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () =>
//     setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () =>
//     setCurrentImageIndex(
//       (prev) => (prev - 1 + gallery.length) % gallery.length,
//     );

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(angka);
//   };

//   const triggerFlyingAnimation = () => {
//     const startEl = document.getElementById("product-image");
//     const endEl = document.getElementById("cart-icon");

//     if (startEl && endEl && gallery.length > 0) {
//       const startRect = startEl.getBoundingClientRect();
//       const endRect = endEl.getBoundingClientRect();

//       const flyingImg = document.createElement("img");
//       flyingImg.src = gallery[currentImageIndex];
//       flyingImg.style.position = "fixed";
//       flyingImg.style.top = `${startRect.top}px`;
//       flyingImg.style.left = `${startRect.left}px`;
//       flyingImg.style.width = `${startRect.width}px`;
//       flyingImg.style.height = `${startRect.height}px`;
//       flyingImg.style.borderRadius = "10%";
//       flyingImg.style.zIndex = "9999";
//       flyingImg.style.transition =
//         "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//       document.body.appendChild(flyingImg);

//       requestAnimationFrame(() => {
//         flyingImg.style.top = `${endRect.top + 10}px`;
//         flyingImg.style.left = `${endRect.left + 10}px`;
//         flyingImg.style.width = "20px";
//         flyingImg.style.height = "20px";
//         flyingImg.style.opacity = "0.2";
//         flyingImg.style.borderRadius = "50%";
//       });

//       setTimeout(() => {
//         flyingImg.remove();
//         endEl.classList.add("scale-125");
//         setTimeout(() => endEl.classList.remove("scale-125"), 200);
//       }, 800);
//     }
//   };

//   const handleAddToCart = () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk mulai berbelanja.",
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: "Ke Halaman Login",
//       }).then(() => navigate("/login"));
//       return;
//     }

//     const previousCartState = [...cartItems];
//     const optimisticItem = {
//       id: Date.now(),
//       product_id: product!.id,
//       quantity: quantity,
//       gross_amount: quantity * product!.price,
//       color: null,
//       product: {
//         id: product!.id,
//         name: product!.name,
//         price: product!.price,
//         discount_price: product!.price,
//         image_url: product!.image_url,
//         sku: product!.sku,
//         stock: product!.stock,
//         color: "",
//       },
//     };

//     addCartItemOptimistically(optimisticItem);
//     triggerFlyingAnimation();
//     Swal.fire({
//       title: "Ditambahkan!",
//       icon: "success",
//       toast: true,
//       position: "top-end",
//       timer: 1500,
//       showConfirmButton: false,
//     });

//     fetch(`${BASE_URL}/api/carts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         product_id: product?.id,
//         quantity: quantity,
//         color: null,
//       }),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (res.ok && data.cart_id) {
//           fetchCart();
//         } else {
//           revertCartItems(previousCartState);
//           Swal.fire(
//             "Pemberitahuan",
//             data.message || "Gagal menambahkan produk ke keranjang.",
//             "warning",
//           );
//         }
//       })
//       .catch(() => {
//         revertCartItems(previousCartState);
//         console.error("Gagal terhubung ke server saat add to cart");
//       });
//   };

//   const handleBuyItNow = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         icon: "info",
//         confirmButtonColor: "#059669",
//       }).then(() => navigate("/login"));
//       return;
//     }

//     setIsBuyingNow(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: null,
//         }),
//       });
//       const data = await res.json();

//       if (res.ok && data.cart_id) {
//         fetchCart();
//         navigate("/checkout", { state: { selectedIds: [data.cart_id] } });
//       } else {
//         Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsBuyingNow(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value;
//     if (val === "" || /^\d+$/.test(val)) {
//       setQuantityInput(val);
//     }
//   };

//   const handleInputBlur = () => {
//     let parsed = parseInt(quantityInput);
//     if (isNaN(parsed) || parsed < 1) parsed = 1;
//     if (product && parsed > product.stock) {
//       parsed = product.stock;
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "warning",
//         title: `Maksimal stok adalah ${product.stock}`,
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     }
//     setQuantityInput(parsed.toString());
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;
//   const isFormDisabled = isOutOfStock || isBuyingNow;

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">
//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div
//               id="product-image"
//               className="relative group bg-gray-50 rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-[4/5] border border-gray-100 flex items-center justify-center"
//             >
//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-cover object-center w-full h-full transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
//                     />
//                   ))}
//                   {gallery.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M15 19l-7-7 7-7"
//                           />
//                         </svg>
//                       </button>
//                       <button
//                         onClick={nextImage}
//                         className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M9 5l7 7-7 7"
//                           />
//                         </svg>
//                       </button>
//                       <div className="absolute z-20 flex gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => setCurrentImageIndex(idx)}
//                             className={`h-2 rounded-full transition-all shadow-sm ${idx === currentImageIndex ? "bg-gycora w-6" : "bg-white/80 hover:bg-white w-2"}`}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">
//                   No Image
//                 </div>
//               )}
//               <div className="absolute z-20 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
//                   Video Demo
//                 </h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video
//                     src={product.variant_video}
//                     controls
//                     className="object-contain w-full h-64 md:h-80"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="flex flex-col justify-center">
//             <div className="flex items-start justify-between gap-4 mb-2">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
//                 {product.name}
//               </h1>
//               <button
//                 onClick={handleToggleWishlist}
//                 className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                 title="Simpan ke Favorit"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   strokeWidth={1.5}
//                   stroke="currentColor"
//                   className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
//                   />
//                 </svg>
//               </button>
//             </div>

//             <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
//             <div className="mb-8">
//               {product.discount_price && product.discount_price > 0 ? (
//                 <div className="flex flex-col">
//                   <span className="text-2xl text-gray-400 line-through">
//                     {formatRupiah(product.price)}
//                   </span>
//                   <span className="text-4xl font-extrabold text-red-600">
//                     {formatRupiah(product.discount_price)}
//                   </span>
//                 </div>
//               ) : (
//                 <p className="text-4xl font-extrabold text-gycora">
//                   {formatRupiah(product.price)}
//                 </p>
//               )}
//             </div>

//             <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">
//               {/* ========================================================= */}
//               {/* [RENDER BARU] MENGGUNAKAN LOGIKA VUE SIBLING COLORS */}
//               {/* ========================================================= */}
//               {siblingColors.length > 0 && (
//                 <div className="pb-6 mb-6 border-b border-gray-200">
//                   <h3 className="mb-3 text-sm font-bold text-gray-700">
//                     Pilih Varian Warna:
//                   </h3>
//                   <div className="flex flex-wrap gap-3">
//                     {siblingColors.map((sibling) => {
//                       const isCurrentProduct = sibling.id === product.id;

//                       return (
//                         <button
//                           key={sibling.id}
//                           onClick={() => {
//                             if (!isCurrentProduct) {
//                               window.scrollTo({ top: 0, behavior: "smooth" });
//                               navigate(`/product/${sibling.id}`);
//                             }
//                           }}
//                           className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${
//                             isCurrentProduct
//                               ? "border-gycora ring-2 ring-gycora/30 scale-105 cursor-default"
//                               : "border-gray-200 hover:border-gray-300 hover:scale-105 cursor-pointer bg-white"
//                           }`}
//                           title={`Lihat varian ${extractColorName(sibling.name)}`}
//                         >
//                           <span
//                             className="w-5 h-5 border border-gray-300 rounded-full shadow-inner"
//                             style={{
//                               backgroundColor: extractColorHex(sibling.name),
//                             }}
//                           ></span>
//                           <span
//                             className={`text-xs font-bold ${isCurrentProduct ? "text-gycora-dark" : "text-gray-700"}`}
//                           >
//                             {extractColorName(sibling.name)}
//                           </span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center justify-between w-full overflow-hidden bg-white border border-gray-300 h-14 rounded-xl">
//                   <button
//                     onClick={() => {
//                       const newVal = Math.max(1, quantity - 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-gycora hover:bg-gray-50 disabled:opacity-50"
//                   >
//                     -
//                   </button>

//                   <input
//                     type="text"
//                     value={quantityInput}
//                     onChange={handleInputChange}
//                     onBlur={handleInputBlur}
//                     disabled={isFormDisabled}
//                     className="w-full h-full font-bold text-center text-gray-900 bg-transparent outline-none appearance-none focus:ring-0"
//                   />

//                   <button
//                     onClick={() => {
//                       const newVal = Math.min(product.stock, quantity + 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-gycora hover:bg-gray-50 disabled:opacity-50"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 ${
//                       isOutOfStock
//                         ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-white border-gycora text-gycora hover:bg-emerald-50 active:scale-95"
//                     }`}
//                   >
//                     Add to Cart
//                   </button>

//                   <button
//                     onClick={handleBuyItNow}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all ${
//                       isOutOfStock
//                         ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-gycora text-white hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5 active:scale-95"
//                     }`}
//                   >
//                     {isBuyingNow
//                       ? "Memproses..."
//                       : isOutOfStock
//                         ? "Stok Habis"
//                         : "Buy it Now"}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-8">
//               <div>
//                 <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">
//                   Tentang Produk Ini
//                 </h3>
//                 <div className="leading-relaxed prose-sm prose text-gray-600 whitespace-pre-wrap sm:prose max-w-none">
//                   {product.description}
//                 </div>
//               </div>
//               {product.benefits && (
//                 <div>
//                   <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">
//                     Manfaat Utama
//                   </h3>
//                   <div className="p-5 border border-emerald-100 bg-emerald-50/50 rounded-2xl">
//                     <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">
//                       {product.benefits}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom"; // [BARU] Tambahkan useLocation
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";

// const colorMapHex: Record<string, string> = {
//   Black: "#000000",
//   White: "#FFFFFF",
//   Brown: "#8B4513",
//   Beige: "#F5F5DC",
//   Red: "#8B0000",
//   Navy: "#000080",
//   Green: "#008000",
//   Grey: "#808080",
//   Pink: "#FFC0CB",
//   Yellow: "#FFD700",
//   Blue: "#4169E1",
//   Mocca: "#967969",
//   Cream: "#FDF4E3",
//   Sage: "#9DC183",
//   Gold: "#D4AF37",
//   Orange: "#FF9900",
//   Silver: "#C0C0C0",
//   Maroon: "#800000",
//   Olive: "#808000",
//   Taupe: "#483C32",
//   Khaki: "#F0E68C",
//   Mustard: "#FFDB58",
//   Emerald: "#50C878",
//   Coral: "#FF7F50",
//   Mint: "#98FF98",
//   Teal: "#008080",
//   Cyan: "#00FFFF",
//   Indigo: "#4B0082",
//   Violet: "#EE82EE",
//   Purple: "#800080",
//   Magenta: "#FF00FF",
//   Lilac: "#C8A2C8",
//   Lavender: "#E6E6FA",
//   Rose: "#FF007F",
//   Peach: "#FFE5B4",
//   Apricot: "#FBCEB1",
//   Ivory: "#FFFFF0",
//   Tan: "#D2B48C",
//   Charcoal: "#36454F",
//   Ash: "#555555",
//   Platinum: "#E5E4E2",
//   Bronze: "#CD7F32",
//   Copper: "#B87333",
//   Rust: "#B7410E",
//   Ochre: "#CC7722",
//   Sienna: "#882D17",
//   Terracotta: "#E2725B",
//   Amber: "#FFBF00",
//   Caramel: "#FFD59A",
//   Honey: "#FFC30B",
//   Chestnut: "#954535",
//   Walnut: "#5C4033",
//   Mahogany: "#C04000",
//   Chocolate: "#7B3F00",
//   Cocoa: "#D2691E",
//   Coffee: "#6F4E37",
//   Mocha: "#493D26",
//   Espresso: "#4B3621",
//   Cappuccino: "#654321",
//   Latte: "#C5A059",
//   Macchiato: "#8B5A2B",
//   Almond: "#EED9C4",
//   Hazelnut: "#C4A484",
//   Pecan: "#8A3324",
//   Pistachio: "#93C572",
//   Seafoam: "#9FE2BF",
//   Turquoise: "#40E0D0",
//   Aqua: "#00FFFF",
//   Azure: "#00FFFF",
//   Sky: "#87CEEB",
//   Cerulean: "#007BA7",
//   Cobalt: "#0047AB",
//   Sapphire: "#0F52BA",
//   Ultramarine: "#120A8F",
//   Lapis: "#26619C",
//   Denim: "#1560BD",
//   Steel: "#4682B4",
//   Slate: "#708090",
//   Gunmetal: "#2a3439",
//   Onyx: "#353839",
//   Jet: "#343434",
//   Ebony: "#555D50",
//   Raven: "#050301",
//   Pitch: "#000000",
//   Obsidian: "#0B0B0B",
//   Carbon: "#333333",
//   Graphite: "#383838",
//   Pewter: "#8E8E8E",
//   Zinc: "#8C92AC",
//   Lead: "#778899",
//   Iron: "#A19D94",
//   Titanium: "#878681",
//   Chromium: "#C0C0C0",
//   Nickel: "#727472",
//   Tungsten: "#A0A0A0",
//   Fuchsia: "#FF00FF",
//   Crimson: "#DC143C",
//   Carmine: "#960018",
//   Ruby: "#E0115F",
//   Scarlet: "#FF2400",
//   Vermilion: "#E34234",
//   Brick: "#CB4154",
//   Tomato: "#FF6347",
//   Papaya: "#FFEFD5",
//   Melon: "#FDBCB4",
//   Mango: "#F4A460",
//   Citrus: "#FFA500",
//   Lemon: "#FFF700",
//   Lime: "#BFFF00",
//   Kiwi: "#8EE53F",
//   Apple: "#8DB600",
//   Pear: "#D1E231",
//   Grape: "#6F2DA8",
//   Plum: "#8E4585",
//   Blackberry: "#4D0135",
//   Mulberry: "#C54B8C",
//   Raisin: "#652DC1",
//   Eggplant: "#614051",
//   Aubergine: "#472C4C",
//   Amethyst: "#9966CC",
//   Orchid: "#DA70D6",
//   Heather: "#D473D4",
//   Thistle: "#D8BFD8",
//   Mauve: "#E0B0FF",
//   Wisteria: "#C9A0DC",
//   Periwinkle: "#CCCCFF",
//   Cornflower: "#6495ED",
//   Baby: "#89CFF0",
//   Powder: "#B0E0E6",
//   Midnight: "#191970",
//   Ocean: "#0077BE",
// };

// const extractColorName = (fullName: string) => {
//   if (!fullName) return "Main";
//   const words = fullName.trim().split(" ");
//   const lastWord = words[words.length - 1];
//   return lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
// };

// const extractColorHex = (fullName: string) => {
//   const colorName = extractColorName(fullName);
//   return colorMapHex[colorName] || "#cccccc";
// };

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
//   sku: string;
//   name: string;
//   slug: string;
//   description: string;
//   benefits: string;
//   price: number;
//   discount_price: number;
//   voucher_discount_price?: number;
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   color?: any[];
// }

// export default function ProductDetail() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const location = useLocation(); // [BARU] Menangkap data dari router

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isFetchingFull, setIsFetchingFull] = useState(false); // [BARU] Penanda untuk render skeleton deskripsi

//   const [quantityInput, setQuantityInput] = useState<string>("1");
//   const quantity = parseInt(quantityInput) || 1;

//   const [isBuyingNow, setIsBuyingNow] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const [siblingColors, setSiblingColors] = useState<Product[]>([]);

//   const [isFavorited, setIsFavorited] = useState(false);
//   const { fetchCart, cartItems, addCartItemOptimistically, revertCartItems } =
//     useCart();

//   const fetchSiblingColors = async (productName: string) => {
//     if (!productName) return;
//     try {
//       const words = productName.trim().split(" ");
//       let rootName = productName;

//       if (words.length > 1) {
//         words.pop();
//         rootName = words.join(" ");
//       }

//       const res = await fetch(`${BASE_URL}/api/products`);
//       const data = await res.json();
//       const allProducts = data.data ? data.data : data;

//       const siblings = allProducts.filter((p: Product) =>
//         p.name.toLowerCase().includes(rootName.toLowerCase()),
//       );

//       if (siblings.length <= 1) {
//         setSiblingColors([]);
//       } else {
//         setSiblingColors(siblings);
//       }
//     } catch (error) {
//       console.error("Gagal menarik data varian warna:", error);
//     }
//   };

//   // useEffect(() => {
//   //   // =========================================================
//   //   // [BARU] OPTIMISTIC UI: Render seketika jika ada data awal
//   //   // =========================================================
//   //   const initialPassedData = location.state?.initialProduct;

//   //   if (initialPassedData && String(initialPassedData.id) === id) {
//   //     setProduct(initialPassedData);
//   //     setLoading(false); // Matikan loading besar, biarkan render dengan data seadanya (Gambar, Harga, Judul)
//   //   } else {
//   //     setLoading(true); // Jika diakses via direct URL (tanpa history), tetap tampilkan spinner
//   //     setProduct(null);
//   //   }

//   //   setIsFetchingFull(true);
//   //   setCurrentImageIndex(0);
//   //   setQuantityInput("1");

//   //   const fetchProductAndSiblings = async () => {
//   //     try {
//   //       const res = await fetch(`${BASE_URL}/api/products/${id}`);
//   //       if (!res.ok) throw new Error("Produk tidak ditemukan");
//   //       const responseData = await res.json();

//   //       const productObject = responseData.data
//   //         ? responseData.data
//   //         : responseData;
//   //       setProduct(productObject); // Perbarui dengan data utuh (Deskripsi, dll akan muncul)

//   //       await fetchSiblingColors(productObject.name);
//   //     } catch (error) {
//   //       console.error("Gagal memuat produk:", error);
//   //       navigate("/products");
//   //     }
//   //   };

//   //   const checkWishlistStatus = async () => {
//   //     const token = localStorage.getItem("user_token");
//   //     if (!token) return;

//   //     try {
//   //       const res = await fetch(`${BASE_URL}/api/wishlists`, {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //           Accept: "application/json",
//   //         },
//   //       });
//   //       if (res.ok) {
//   //         const data = await res.json();
//   //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   //         const isWished = data.some(
//   //           (item: any) => item.product_id === Number(id),
//   //         );
//   //         setIsFavorited(isWished);
//   //       }
//   //     } catch (error) {
//   //       console.error("Gagal memeriksa wishlist:", error);
//   //     }
//   //   };

//   //   if (id) {
//   //     Promise.all([fetchProductAndSiblings(), checkWishlistStatus()]).finally(
//   //       () => {
//   //         setLoading(false);
//   //         setIsFetchingFull(false);
//   //       },
//   //     );
//   //   }
//   //   // Sengaja tidak memasukkan 'location.state' agar tidak loop render
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, [id, navigate]);

//   useEffect(() => {
//     // =========================================================
//     // [BARU] OPTIMISTIC UI: Render seketika jika ada data awal
//     // =========================================================
//     const initialPassedData = location.state?.initialProduct;

//     if (initialPassedData && String(initialPassedData.id) === id) {
//       setProduct(initialPassedData);
//       setLoading(false); // Matikan loading besar, biarkan render dengan data seadanya (Gambar, Harga, Judul)
//     } else {
//       setLoading(true); // Jika diakses via direct URL (tanpa history), tetap tampilkan spinner
//       setProduct(null);
//     }

//     setIsFetchingFull(true);
//     setCurrentImageIndex(0);
//     setQuantityInput("1");

//     // [PERBAIKAN] Variabel pencegah Race Condition
//     let isCurrentFetchValid = true;

//     const fetchProductAndSiblings = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products/${id}`);
//         if (!res.ok) throw new Error("Produk tidak ditemukan");
//         const responseData = await res.json();

//         // Hanya ubah state JIKA request ini masih relevan (user belum pindah warna lagi)
//         if (isCurrentFetchValid) {
//           const productObject = responseData.data ? responseData.data : responseData;
//           setProduct(productObject);
//           await fetchSiblingColors(productObject.name);
//         }
//       } catch (error) {
//         if (isCurrentFetchValid) {
//           console.error("Gagal memuat produk:", error);
//           navigate("/products");
//         }
//       }
//     };

//     const checkWishlistStatus = async () => {
//       const token = localStorage.getItem("user_token");
//       if (!token) return;

//       try {
//         const res = await fetch(`${BASE_URL}/api/wishlists`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         });
//         if (res.ok) {
//           const data = await res.json();
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           const isWished = data.some(
//             (item: any) => item.product_id === Number(id),
//           );
          
//           if (isCurrentFetchValid) setIsFavorited(isWished);
//         }
//       } catch (error) {
//         if (isCurrentFetchValid) console.error("Gagal memeriksa wishlist:", error);
//       }
//     };

//     if (id) {
//       Promise.all([fetchProductAndSiblings(), checkWishlistStatus()]).finally(
//         () => {
//           if (isCurrentFetchValid) {
//             setLoading(false);
//             setIsFetchingFull(false);
//           }
//         },
//       );
//     }

//     // [PERBAIKAN] Cleanup function: Beritahu fetch lama agar tidak usah merubah state lagi
//     return () => {
//       isCurrentFetchValid = false;
//     };
    
//     // Sengaja tidak memasukkan 'location.state' agar tidak loop render
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id, navigate]);

//   const handleToggleWishlist = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk menyimpan produk ke favorit.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#059669",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Ke Halaman Login",
//         cancelButtonText: "Batal",
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ product_id: product?.id }),
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () =>
//     setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () =>
//     setCurrentImageIndex(
//       (prev) => (prev - 1 + gallery.length) % gallery.length,
//     );

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(angka);
//   };

//   const triggerFlyingAnimation = () => {
//     const startEl = document.getElementById("product-image");
//     const endEl = document.getElementById("cart-icon");

//     if (startEl && endEl && gallery.length > 0) {
//       const startRect = startEl.getBoundingClientRect();
//       const endRect = endEl.getBoundingClientRect();

//       const flyingImg = document.createElement("img");
//       flyingImg.src = gallery[currentImageIndex];
//       flyingImg.style.position = "fixed";
//       flyingImg.style.top = `${startRect.top}px`;
//       flyingImg.style.left = `${startRect.left}px`;
//       flyingImg.style.width = `${startRect.width}px`;
//       flyingImg.style.height = `${startRect.height}px`;
//       flyingImg.style.borderRadius = "10%";
//       flyingImg.style.zIndex = "9999";
//       flyingImg.style.transition =
//         "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//       document.body.appendChild(flyingImg);

//       requestAnimationFrame(() => {
//         flyingImg.style.top = `${endRect.top + 10}px`;
//         flyingImg.style.left = `${endRect.left + 10}px`;
//         flyingImg.style.width = "20px";
//         flyingImg.style.height = "20px";
//         flyingImg.style.opacity = "0.2";
//         flyingImg.style.borderRadius = "50%";
//       });

//       setTimeout(() => {
//         flyingImg.remove();
//         endEl.classList.add("scale-125");
//         setTimeout(() => endEl.classList.remove("scale-125"), 200);
//       }, 800);
//     }
//   };

//   const handleAddToCart = () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk mulai berbelanja.",
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: "Ke Halaman Login",
//       }).then(() => navigate("/login"));
//       return;
//     }

//     const previousCartState = [...cartItems];
//     const optimisticItem = {
//       id: Date.now(),
//       product_id: product!.id,
//       quantity: quantity,
//       gross_amount: quantity * product!.price,
//       color: null,
//       product: {
//         id: product!.id,
//         name: product!.name,
//         price: product!.price,
//         discount_price: product!.price,
//         image_url: product!.image_url,
//         sku: product!.sku,
//         stock: product!.stock,
//         color: "",
//       },
//     };

//     addCartItemOptimistically(optimisticItem);
//     triggerFlyingAnimation();
//     Swal.fire({
//       title: "Ditambahkan!",
//       icon: "success",
//       toast: true,
//       position: "top-end",
//       timer: 1500,
//       showConfirmButton: false,
//     });

//     fetch(`${BASE_URL}/api/carts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         product_id: product?.id,
//         quantity: quantity,
//         color: null,
//       }),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (res.ok && data.cart_id) {
//           fetchCart();
//         } else {
//           revertCartItems(previousCartState);
//           Swal.fire(
//             "Pemberitahuan",
//             data.message || "Gagal menambahkan produk ke keranjang.",
//             "warning",
//           );
//         }
//       })
//       .catch(() => {
//         revertCartItems(previousCartState);
//         console.error("Gagal terhubung ke server saat add to cart");
//       });
//   };

//   const handleBuyItNow = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         icon: "info",
//         confirmButtonColor: "#059669",
//       }).then(() => navigate("/login"));
//       return;
//     }

//     setIsBuyingNow(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: null,
//         }),
//       });
//       const data = await res.json();

//       if (res.ok && data.cart_id) {
//         fetchCart();
//         navigate("/checkout", { state: { selectedIds: [data.cart_id] } });
//       } else {
//         Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsBuyingNow(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value;
//     if (val === "" || /^\d+$/.test(val)) {
//       setQuantityInput(val);
//     }
//   };

//   const handleInputBlur = () => {
//     let parsed = parseInt(quantityInput);
//     if (isNaN(parsed) || parsed < 1) parsed = 1;
//     if (product && parsed > product.stock) {
//       parsed = product.stock;
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "warning",
//         title: `Maksimal stok adalah ${product.stock}`,
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     }
//     setQuantityInput(parsed.toString());
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;
//   const isFormDisabled = isOutOfStock || isBuyingNow;

//   // [BARU] Fungsi Share Link Produk
//   const handleShare = async () => {
//     const shareData = {
//       title: product?.name,
//       text: `Cek produk keren ini dari Gycora: ${product?.name}`,
//       url: window.location.href,
//     };

//     if (navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch (err) {
//         console.error("Gagal membagikan:", err);
//       }
//     } else {
//       // Fallback jika browser desktop lama: Salin ke clipboard
//       navigator.clipboard.writeText(window.location.href);
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "success",
//         title: "Link produk disalin!",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">
//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div
//               id="product-image"
//               className="relative group bg-gray-50 rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-[4/5] border border-gray-100 flex items-center justify-center"
//             >
//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-cover object-center w-full h-full transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
//                     />
//                   ))}
//                   {gallery.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M15 19l-7-7 7-7"
//                           />
//                         </svg>
//                       </button>
//                       <button
//                         onClick={nextImage}
//                         className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M9 5l7 7-7 7"
//                           />
//                         </svg>
//                       </button>
//                       <div className="absolute z-20 flex gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => setCurrentImageIndex(idx)}
//                             className={`h-2 rounded-full transition-all shadow-sm ${idx === currentImageIndex ? "bg-gycora w-6" : "bg-white/80 hover:bg-white w-2"}`}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">
//                   No Image
//                 </div>
//               )}
//               <div className="absolute z-20 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
//                   Video Demo
//                 </h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video
//                     src={product.variant_video}
//                     controls
//                     className="object-contain w-full h-64 md:h-80"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="flex flex-col justify-center">
//             <div className="flex items-start justify-between gap-4 mb-2">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
//                 {product.name}
//               </h1>
//               <div className="flex items-center gap-2 shrink-0">
//                 {/* [BARU] Tombol Share */}
//                 <button
//                   onClick={handleShare}
//                   className="flex items-center justify-center w-12 h-12 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:text-gycora"
//                   title="Bagikan Produk"
//                 >
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
//                     />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={handleToggleWishlist}
//                   className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                   title="Simpan ke Favorit"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
//             <div className="mb-8">
//               {product.discount_price && product.discount_price > 0 ? (
//                 <div className="flex flex-col">
//                   <span className="text-2xl text-gray-400 line-through">
//                     {formatRupiah(product.price)}
//                   </span>
//                   <span className="text-4xl font-extrabold text-red-600">
//                     {formatRupiah(product.discount_price)}
//                   </span>
//                 </div>
//               ) : (
//                 <p className="text-4xl font-extrabold text-gycora">
//                   {formatRupiah(product.price)}
//                 </p>
//               )}
//             </div>

//             <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">
//               {siblingColors.length > 0 && (
//                 <div className="pb-6 mb-6 border-b border-gray-200">
//                   <h3 className="mb-3 text-sm font-bold text-gray-700">
//                     Pilih Varian Warna:
//                   </h3>
//                   <div className="flex flex-wrap gap-3">
//                     {siblingColors.map((sibling) => {
//                       const isCurrentProduct = sibling.id === product.id;

//                       return (
//                         <button
//                           key={sibling.id}
//                           onClick={() => {
//                             if (!isCurrentProduct) {
//                               window.scrollTo({ top: 0, behavior: "smooth" });
//                               // [BARU] Melempar data produk varian ke URL baru agar dirender tanpa loading
//                               navigate(`/product/${sibling.id}`, {
//                                 state: { initialProduct: sibling },
//                               });
//                             }
//                           }}
//                           className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${
//                             isCurrentProduct
//                               ? "border-gycora ring-2 ring-gycora/30 scale-105 cursor-default"
//                               : "border-gray-200 hover:border-gray-300 hover:scale-105 cursor-pointer bg-white"
//                           }`}
//                           title={`Lihat varian ${extractColorName(sibling.name)}`}
//                         >
//                           <span
//                             className="w-5 h-5 border border-gray-300 rounded-full shadow-inner"
//                             style={{
//                               backgroundColor: extractColorHex(sibling.name),
//                             }}
//                           ></span>
//                           <span
//                             className={`text-xs font-bold ${isCurrentProduct ? "text-gycora-dark" : "text-gray-700"}`}
//                           >
//                             {extractColorName(sibling.name)}
//                           </span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center justify-between w-full overflow-hidden bg-white border border-gray-300 h-14 rounded-xl">
//                   <button
//                     onClick={() => {
//                       const newVal = Math.max(1, quantity - 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-gycora hover:bg-gray-50 disabled:opacity-50"
//                   >
//                     -
//                   </button>

//                   <input
//                     type="text"
//                     value={quantityInput}
//                     onChange={handleInputChange}
//                     onBlur={handleInputBlur}
//                     disabled={isFormDisabled}
//                     className="w-full h-full font-bold text-center text-gray-900 bg-transparent outline-none appearance-none focus:ring-0"
//                   />

//                   <button
//                     onClick={() => {
//                       const newVal = Math.min(product.stock, quantity + 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-gycora hover:bg-gray-50 disabled:opacity-50"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 ${
//                       isOutOfStock
//                         ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-white border-gycora text-gycora hover:bg-emerald-50 active:scale-95"
//                     }`}
//                   >
//                     Add to Cart
//                   </button>

//                   <button
//                     onClick={handleBuyItNow}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all ${
//                       isOutOfStock
//                         ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-gycora text-white hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5 active:scale-95"
//                     }`}
//                   >
//                     {isBuyingNow
//                       ? "Memproses..."
//                       : isOutOfStock
//                         ? "Stok Habis"
//                         : "Buy it Now"}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-8">
//               <div>
//                 <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">
//                   Tentang Produk Ini
//                 </h3>
//                 <div className="leading-relaxed prose-sm prose text-gray-600 whitespace-pre-wrap sm:prose max-w-none">
//                   {/* [BARU] Menampilkan Skeleton Text jika deskripsi belum selesai di-fetch */}
//                   {isFetchingFull && !product.description ? (
//                     <div className="space-y-2 animate-pulse">
//                       <div className="w-full h-3 bg-gray-200 rounded"></div>
//                       <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
//                       <div className="w-4/6 h-3 bg-gray-200 rounded"></div>
//                     </div>
//                   ) : (
//                     product.description
//                   )}
//                 </div>
//               </div>

//               {(isFetchingFull || product.benefits) && (
//                 <div>
//                   <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">
//                     Manfaat Utama
//                   </h3>
//                   <div className="p-5 border border-emerald-100 bg-emerald-50/50 rounded-2xl">
//                     {/* [BARU] Skeleton untuk Benefits */}
//                     {isFetchingFull && !product.benefits ? (
//                       <div className="w-3/4 h-3 rounded bg-emerald-200/50 animate-pulse"></div>
//                     ) : (
//                       <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">
//                         {product.benefits}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";

// const colorMapHex: Record<string, string> = {
//   Black: "#000000", White: "#FFFFFF", Brown: "#8B4513", Beige: "#F5F5DC",
//   Red: "#8B0000", Navy: "#000080", Green: "#008000", Grey: "#808080",
//   Pink: "#FFC0CB", Yellow: "#FFD700", Blue: "#4169E1", Mocca: "#967969",
//   Cream: "#FDF4E3", Sage: "#9DC183", Gold: "#D4AF37", Orange: "#FF9900",
//   Silver: "#C0C0C0", Maroon: "#800000", Olive: "#808000", Taupe: "#483C32",
//   Khaki: "#F0E68C", Mustard: "#FFDB58", Emerald: "#50C878", Coral: "#FF7F50",
//   Mint: "#98FF98", Teal: "#008080", Cyan: "#00FFFF", Indigo: "#4B0082",
//   Violet: "#EE82EE", Purple: "#800080", Magenta: "#FF00FF", Lilac: "#C8A2C8",
//   Lavender: "#E6E6FA", Rose: "#FF007F", Peach: "#FFE5B4", Apricot: "#FBCEB1",
//   Ivory: "#FFFFF0", Tan: "#D2B48C", Charcoal: "#36454F", Ash: "#555555",
//   Platinum: "#E5E4E2", Bronze: "#CD7F32", Copper: "#B87333", Rust: "#B7410E",
//   Ochre: "#CC7722", Sienna: "#882D17", Terracotta: "#E2725B", Amber: "#FFBF00",
//   Caramel: "#FFD59A", Honey: "#FFC30B", Chestnut: "#954535", Walnut: "#5C4033",
//   Mahogany: "#C04000", Chocolate: "#7B3F00", Cocoa: "#D2691E", Coffee: "#6F4E37",
//   Mocha: "#493D26", Espresso: "#4B3621", Cappuccino: "#654321", Latte: "#C5A059",
//   Macchiato: "#8B5A2B", Almond: "#EED9C4", Hazelnut: "#C4A484", Pecan: "#8A3324",
//   Pistachio: "#93C572", Seafoam: "#9FE2BF", Turquoise: "#40E0D0", Aqua: "#00FFFF",
//   Azure: "#00FFFF", Sky: "#87CEEB", Cerulean: "#007BA7", Cobalt: "#0047AB",
//   Sapphire: "#0F52BA", Ultramarine: "#120A8F", Lapis: "#26619C", Denim: "#1560BD",
//   Steel: "#4682B4", Slate: "#708090", Gunmetal: "#2a3439", Onyx: "#353839",
//   Jet: "#343434", Ebony: "#555D50", Raven: "#050301", Pitch: "#000000",
//   Obsidian: "#0B0B0B", Carbon: "#333333", Graphite: "#383838", Pewter: "#8E8E8E",
//   Zinc: "#8C92AC", Lead: "#778899", Iron: "#A19D94", Titanium: "#878681",
//   Chromium: "#C0C0C0", Nickel: "#727472", Tungsten: "#A0A0A0", Fuchsia: "#FF00FF",
//   Crimson: "#DC143C", Carmine: "#960018", Ruby: "#E0115F", Scarlet: "#FF2400",
//   Vermilion: "#E34234", Brick: "#CB4154", Tomato: "#FF6347", Papaya: "#FFEFD5",
//   Melon: "#FDBCB4", Mango: "#F4A460", Citrus: "#FFA500", Lemon: "#FFF700",
//   Lime: "#BFFF00", Kiwi: "#8EE53F", Apple: "#8DB600", Pear: "#D1E231",
//   Grape: "#6F2DA8", Plum: "#8E4585", Blackberry: "#4D0135", Mulberry: "#C54B8C",
//   Raisin: "#652DC1", Eggplant: "#614051", Aubergine: "#472C4C", Amethyst: "#9966CC",
//   Orchid: "#DA70D6", Heather: "#D473D4", Thistle: "#D8BFD8", Mauve: "#E0B0FF",
//   Wisteria: "#C9A0DC", Periwinkle: "#CCCCFF", Cornflower: "#6495ED", Baby: "#89CFF0",
//   Powder: "#B0E0E6", Midnight: "#191970", Ocean: "#0077BE",
// };

// const extractColorName = (fullName: string) => {
//   if (!fullName) return "Main";
//   const words = fullName.trim().split(" ");
//   const lastWord = words[words.length - 1];
//   return lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
// };

// const extractColorHex = (fullName: string) => {
//   const colorName = extractColorName(fullName);
//   return colorMapHex[colorName] || "#cccccc";
// };

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
//   sku: string;
//   name: string;
//   slug: string;
//   description: string;
//   benefits: string;
//   price: number;
//   discount_price: number;
//   voucher_discount_price?: number;
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   color?: any[];
// }

// export default function ProductDetail() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isFetchingFull, setIsFetchingFull] = useState(false);

//   const [quantityInput, setQuantityInput] = useState<string>("1");
//   const quantity = parseInt(quantityInput) || 1;

//   const [isBuyingNow, setIsBuyingNow] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const [siblingColors, setSiblingColors] = useState<Product[]>([]);

//   const [isFavorited, setIsFavorited] = useState(false);
//   const { fetchCart, cartItems, addCartItemOptimistically, revertCartItems } = useCart();

//   // FUNGSI FETCH API (HANYA DIPAKAI JIKA MASUK LEWAT URL LANGSUNG)
//   const fetchSiblingColorsViaAPI = async (productName: string) => {
//     if (!productName) return;
//     try {
//       const words = productName.trim().split(" ");
//       let rootName = productName;

//       if (words.length > 1) {
//         words.pop();
//         rootName = words.join(" ");
//       }

//       const res = await fetch(`${BASE_URL}/api/products`);
//       const data = await res.json();
//       const allProducts = data.data ? data.data : data;

//       const siblings = allProducts.filter((p: Product) =>
//         p.name.toLowerCase().includes(rootName.toLowerCase()),
//       );

//       if (siblings.length <= 1) {
//         setSiblingColors([]);
//       } else {
//         setSiblingColors(siblings);
//       }
//     } catch (error) {
//       console.error("Gagal menarik data varian warna:", error);
//     }
//   };

//   useEffect(() => {
//     let isCurrentFetchValid = true;

//     // =========================================================
//     // [BARU] INSTANT COLOR BADGE RENDER
//     // =========================================================
//     const initialPassedData = location.state?.initialProduct;
//     const allPassedProducts = location.state?.allProducts; // Menangkap seluruh katalog yang dikirim dari Home/Catalog

//     // 1. SET PRODUK AWAL INSTAN
//     if (initialPassedData && String(initialPassedData.id) === id) {
//       setProduct(initialPassedData);
//       setLoading(false);
      
//       // 2. SET WARNA SIBLING INSTAN SECARA LOKAL (TANPA API)
//       if (allPassedProducts && allPassedProducts.length > 0) {
//         const words = initialPassedData.name.trim().split(" ");
//         let rootName = initialPassedData.name;
//         if (words.length > 1) {
//           words.pop(); // Buang kata terakhir (warna)
//           rootName = words.join(" ");
//         }

//         const localSiblings = allPassedProducts.filter((p: Product) =>
//           p.name.toLowerCase().includes(rootName.toLowerCase())
//         );

//         if (localSiblings.length > 1) {
//            setSiblingColors(localSiblings);
//         }
//       }
//     } else {
//       setLoading(true);
//       setProduct(null);
//     }

//     setIsFetchingFull(true);
//     setCurrentImageIndex(0);
//     setQuantityInput("1");

//     const fetchProductAndSiblings = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products/${id}`);
//         if (!res.ok) throw new Error("Produk tidak ditemukan");
//         const responseData = await res.json();

//         if (isCurrentFetchValid) {
//           const productObject = responseData.data ? responseData.data : responseData;
//           setProduct(productObject);
          
//           // JIKA user masuk dari luar (langsung ketik URL), barulah kita paksa tembak API buat cari warna
//           if (!allPassedProducts) {
//              await fetchSiblingColorsViaAPI(productObject.name);
//           }
//         }
//       } catch (error) {
//         if (isCurrentFetchValid) {
//           console.error("Gagal memuat produk:", error);
//           navigate("/products");
//         }
//       }
//     };

//     const checkWishlistStatus = async () => {
//       const token = localStorage.getItem("user_token");
//       if (!token) return;

//       try {
//         const res = await fetch(`${BASE_URL}/api/wishlists`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         });
//         if (res.ok) {
//           const data = await res.json();
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           const isWished = data.some(
//             (item: any) => item.product_id === Number(id),
//           );
          
//           if (isCurrentFetchValid) setIsFavorited(isWished);
//         }
//       } catch (error) {
//         if (isCurrentFetchValid) console.error("Gagal memeriksa wishlist:", error);
//       }
//     };

//     if (id) {
//       Promise.all([fetchProductAndSiblings(), checkWishlistStatus()]).finally(
//         () => {
//           if (isCurrentFetchValid) {
//             setLoading(false);
//             setIsFetchingFull(false);
//           }
//         },
//       );
//     }

//     return () => {
//       isCurrentFetchValid = false;
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id, navigate]);

//   const handleToggleWishlist = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk menyimpan produk ke favorit.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#059669",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Ke Halaman Login",
//         cancelButtonText: "Batal",
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ product_id: product?.id }),
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () =>
//     setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () =>
//     setCurrentImageIndex(
//       (prev) => (prev - 1 + gallery.length) % gallery.length,
//     );

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(angka);
//   };

//   const triggerFlyingAnimation = () => {
//     const startEl = document.getElementById("product-image");
//     const endEl = document.getElementById("cart-icon");

//     if (startEl && endEl && gallery.length > 0) {
//       const startRect = startEl.getBoundingClientRect();
//       const endRect = endEl.getBoundingClientRect();

//       const flyingImg = document.createElement("img");
//       flyingImg.src = gallery[currentImageIndex];
//       flyingImg.style.position = "fixed";
//       flyingImg.style.top = `${startRect.top}px`;
//       flyingImg.style.left = `${startRect.left}px`;
//       flyingImg.style.width = `${startRect.width}px`;
//       flyingImg.style.height = `${startRect.height}px`;
//       flyingImg.style.borderRadius = "10%";
//       flyingImg.style.zIndex = "9999";
//       flyingImg.style.transition =
//         "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//       document.body.appendChild(flyingImg);

//       requestAnimationFrame(() => {
//         flyingImg.style.top = `${endRect.top + 10}px`;
//         flyingImg.style.left = `${endRect.left + 10}px`;
//         flyingImg.style.width = "20px";
//         flyingImg.style.height = "20px";
//         flyingImg.style.opacity = "0.2";
//         flyingImg.style.borderRadius = "50%";
//       });

//       setTimeout(() => {
//         flyingImg.remove();
//         endEl.classList.add("scale-125");
//         setTimeout(() => endEl.classList.remove("scale-125"), 200);
//       }, 800);
//     }
//   };

//   const handleAddToCart = () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk mulai berbelanja.",
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: "Ke Halaman Login",
//       }).then(() => navigate("/login"));
//       return;
//     }

//     const previousCartState = [...cartItems];
//     const optimisticItem = {
//       id: Date.now(),
//       product_id: product!.id,
//       quantity: quantity,
//       gross_amount: quantity * product!.price,
//       color: null,
//       product: {
//         id: product!.id,
//         name: product!.name,
//         price: product!.price,
//         discount_price: product!.price,
//         image_url: product!.image_url,
//         sku: product!.sku,
//         stock: product!.stock,
//         color: "",
//       },
//     };

//     addCartItemOptimistically(optimisticItem);
//     triggerFlyingAnimation();
//     Swal.fire({
//       title: "Ditambahkan!",
//       icon: "success",
//       toast: true,
//       position: "top-end",
//       timer: 1500,
//       showConfirmButton: false,
//     });

//     fetch(`${BASE_URL}/api/carts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         product_id: product?.id,
//         quantity: quantity,
//         color: null,
//       }),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (res.ok && data.cart_id) {
//           fetchCart();
//         } else {
//           revertCartItems(previousCartState);
//           Swal.fire(
//             "Pemberitahuan",
//             data.message || "Gagal menambahkan produk ke keranjang.",
//             "warning",
//           );
//         }
//       })
//       .catch(() => {
//         revertCartItems(previousCartState);
//         console.error("Gagal terhubung ke server saat add to cart");
//       });
//   };

//   const handleBuyItNow = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         icon: "info",
//         confirmButtonColor: "#059669",
//       }).then(() => navigate("/login"));
//       return;
//     }

//     setIsBuyingNow(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: null,
//         }),
//       });
//       const data = await res.json();

//       if (res.ok && data.cart_id) {
//         fetchCart();
//         navigate("/checkout", { state: { selectedIds: [data.cart_id] } });
//       } else {
//         Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsBuyingNow(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value;
//     if (val === "" || /^\d+$/.test(val)) {
//       setQuantityInput(val);
//     }
//   };

//   const handleInputBlur = () => {
//     let parsed = parseInt(quantityInput);
//     if (isNaN(parsed) || parsed < 1) parsed = 1;
//     if (product && parsed > product.stock) {
//       parsed = product.stock;
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "warning",
//         title: `Maksimal stok adalah ${product.stock}`,
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     }
//     setQuantityInput(parsed.toString());
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;
//   const isFormDisabled = isOutOfStock || isBuyingNow;

//   const handleShare = async () => {
//     const shareData = {
//       title: product?.name,
//       text: `Cek produk keren ini dari Gycora: ${product?.name}`,
//       url: window.location.href,
//     };

//     if (navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch (err) {
//         console.error("Gagal membagikan:", err);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "success",
//         title: "Link produk disalin!",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">
//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div
//               id="product-image"
//               className="relative group bg-gray-50 rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-[4/5] border border-gray-100 flex items-center justify-center"
//             >
//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-cover object-center w-full h-full transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
//                     />
//                   ))}
//                   {gallery.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M15 19l-7-7 7-7"
//                           />
//                         </svg>
//                       </button>
//                       <button
//                         onClick={nextImage}
//                         className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M9 5l7 7-7 7"
//                           />
//                         </svg>
//                       </button>
//                       <div className="absolute z-20 flex gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => setCurrentImageIndex(idx)}
//                             className={`h-2 rounded-full transition-all shadow-sm ${idx === currentImageIndex ? "bg-gycora w-6" : "bg-white/80 hover:bg-white w-2"}`}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">
//                   No Image
//                 </div>
//               )}
//               <div className="absolute z-20 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
//                   Video Demo
//                 </h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video
//                     src={product.variant_video}
//                     controls
//                     className="object-contain w-full h-64 md:h-80"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="flex flex-col justify-center">
//             <div className="flex items-start justify-between gap-4 mb-2">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
//                 {product.name}
//               </h1>
//               <div className="flex items-center gap-2 shrink-0">
//                 <button
//                   onClick={handleShare}
//                   className="flex items-center justify-center w-12 h-12 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:text-gycora"
//                   title="Bagikan Produk"
//                 >
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
//                     />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={handleToggleWishlist}
//                   className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                   title="Simpan ke Favorit"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
//             <div className="mb-8">
//               {product.discount_price && product.discount_price > 0 ? (
//                 <div className="flex flex-col">
//                   <span className="text-2xl text-gray-400 line-through">
//                     {formatRupiah(product.price)}
//                   </span>
//                   <span className="text-4xl font-extrabold text-red-600">
//                     {formatRupiah(product.discount_price)}
//                   </span>
//                 </div>
//               ) : (
//                 <p className="text-4xl font-extrabold text-gycora">
//                   {formatRupiah(product.price)}
//                 </p>
//               )}
//             </div>

//             <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">
//               {siblingColors.length > 0 && (
//                 <div className="pb-6 mb-6 border-b border-gray-200">
//                   <h3 className="mb-3 text-sm font-bold text-gray-700">
//                     Pilih Varian Warna:
//                   </h3>
//                   <div className="flex flex-wrap gap-3">
//                     {siblingColors.map((sibling) => {
//                       const isCurrentProduct = sibling.id === product.id;

//                       return (
//                         <button
//                           key={sibling.id}
//                           onClick={() => {
//                             if (!isCurrentProduct) {
//                               window.scrollTo({ top: 0, behavior: "smooth" });
//                               // [PERBAIKAN] Pastikan allProducts ikut dilempar lagi saat ganti warna
//                               navigate(`/product/${sibling.id}`, {
//                                 state: { 
//                                   initialProduct: sibling,
//                                   allProducts: location.state?.allProducts
//                                 },
//                               });
//                             }
//                           }}
//                           className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${
//                             isCurrentProduct
//                               ? "border-gycora ring-2 ring-gycora/30 scale-105 cursor-default"
//                               : "border-gray-200 hover:border-gray-300 hover:scale-105 cursor-pointer bg-white"
//                           }`}
//                           title={`Lihat varian ${extractColorName(sibling.name)}`}
//                         >
//                           <span
//                             className="w-5 h-5 border border-gray-300 rounded-full shadow-inner"
//                             style={{
//                               backgroundColor: extractColorHex(sibling.name),
//                             }}
//                           ></span>
//                           <span
//                             className={`text-xs font-bold ${isCurrentProduct ? "text-gycora-dark" : "text-gray-700"}`}
//                           >
//                             {extractColorName(sibling.name)}
//                           </span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center justify-between w-full overflow-hidden bg-white border border-gray-300 h-14 rounded-xl">
//                   <button
//                     onClick={() => {
//                       const newVal = Math.max(1, quantity - 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-gycora hover:bg-gray-50 disabled:opacity-50"
//                   >
//                     -
//                   </button>

//                   <input
//                     type="text"
//                     value={quantityInput}
//                     onChange={handleInputChange}
//                     onBlur={handleInputBlur}
//                     disabled={isFormDisabled}
//                     className="w-full h-full font-bold text-center text-gray-900 bg-transparent outline-none appearance-none focus:ring-0"
//                   />

//                   <button
//                     onClick={() => {
//                       const newVal = Math.min(product.stock, quantity + 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-gycora hover:bg-gray-50 disabled:opacity-50"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 ${
//                       isOutOfStock
//                         ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-white border-gycora text-gycora hover:bg-emerald-50 active:scale-95"
//                     }`}
//                   >
//                     Add to Cart
//                   </button>

//                   <button
//                     onClick={handleBuyItNow}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all ${
//                       isOutOfStock
//                         ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-gycora text-white hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5 active:scale-95"
//                     }`}
//                   >
//                     {isBuyingNow
//                       ? "Memproses..."
//                       : isOutOfStock
//                         ? "Stok Habis"
//                         : "Buy it Now"}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-8">
//               <div>
//                 <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">
//                   Tentang Produk Ini
//                 </h3>
//                 <div className="leading-relaxed prose-sm prose text-gray-600 whitespace-pre-wrap sm:prose max-w-none">
//                   {isFetchingFull && !product.description ? (
//                     <div className="space-y-2 animate-pulse">
//                       <div className="w-full h-3 bg-gray-200 rounded"></div>
//                       <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
//                       <div className="w-4/6 h-3 bg-gray-200 rounded"></div>
//                     </div>
//                   ) : (
//                     product.description
//                   )}
//                 </div>
//               </div>

//               {/* {(isFetchingFull || product.benefits) && (
//                 <div>
//                   <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">
//                     Manfaat Utama
//                   </h3>
//                   <div className="p-5 border border-emerald-100 bg-emerald-50/50 rounded-2xl">
//                     {isFetchingFull && !product.benefits ? (
//                       <div className="w-3/4 h-3 rounded bg-emerald-200/50 animate-pulse"></div>
//                     ) : (
//                       <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">
//                         {product.benefits}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               )} */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";

// const colorMapHex: Record<string, string> = {
//   Black: "#000000", White: "#FFFFFF", Brown: "#8B4513", Beige: "#F5F5DC",
//   Red: "#8B0000", Navy: "#000080", Green: "#008000", Grey: "#808080",
//   Pink: "#FFC0CB", Yellow: "#FFD700", Blue: "#4169E1", Mocca: "#967969",
//   Cream: "#FDF4E3", Sage: "#9DC183", Gold: "#D4AF37", Orange: "#FF9900",
//   Silver: "#C0C0C0", Maroon: "#800000", Olive: "#808000", Taupe: "#483C32",
//   Khaki: "#F0E68C", Mustard: "#FFDB58", Emerald: "#50C878", Coral: "#FF7F50",
//   Mint: "#98FF98", Teal: "#008080", Cyan: "#00FFFF", Indigo: "#4B0082",
//   Violet: "#EE82EE", Purple: "#800080", Magenta: "#FF00FF", Lilac: "#C8A2C8",
//   Lavender: "#E6E6FA", Rose: "#FF007F", Peach: "#FFE5B4", Apricot: "#FBCEB1",
//   Ivory: "#FFFFF0", Tan: "#D2B48C", Charcoal: "#36454F", Ash: "#555555",
//   Platinum: "#E5E4E2", Bronze: "#CD7F32", Copper: "#B87333", Rust: "#B7410E",
//   Ochre: "#CC7722", Sienna: "#882D17", Terracotta: "#E2725B", Amber: "#FFBF00",
//   Caramel: "#FFD59A", Honey: "#FFC30B", Chestnut: "#954535", Walnut: "#5C4033",
//   Mahogany: "#C04000", Chocolate: "#7B3F00", Cocoa: "#D2691E", Coffee: "#6F4E37",
//   Mocha: "#493D26", Espresso: "#4B3621", Cappuccino: "#654321", Latte: "#C5A059",
//   Macchiato: "#8B5A2B", Almond: "#EED9C4", Hazelnut: "#C4A484", Pecan: "#8A3324",
//   Pistachio: "#93C572", Seafoam: "#9FE2BF", Turquoise: "#40E0D0", Aqua: "#00FFFF",
//   Azure: "#00FFFF", Sky: "#87CEEB", Cerulean: "#007BA7", Cobalt: "#0047AB",
//   Sapphire: "#0F52BA", Ultramarine: "#120A8F", Lapis: "#26619C", Denim: "#1560BD",
//   Steel: "#4682B4", Slate: "#708090", Gunmetal: "#2a3439", Onyx: "#353839",
//   Jet: "#343434", Ebony: "#555D50", Raven: "#050301", Pitch: "#000000",
//   Obsidian: "#0B0B0B", Carbon: "#333333", Graphite: "#383838", Pewter: "#8E8E8E",
//   Zinc: "#8C92AC", Lead: "#778899", Iron: "#A19D94", Titanium: "#878681",
//   Chromium: "#C0C0C0", Nickel: "#727472", Tungsten: "#A0A0A0", Fuchsia: "#FF00FF",
//   Crimson: "#DC143C", Carmine: "#960018", Ruby: "#E0115F", Scarlet: "#FF2400",
//   Vermilion: "#E34234", Brick: "#CB4154", Tomato: "#FF6347", Papaya: "#FFEFD5",
//   Melon: "#FDBCB4", Mango: "#F4A460", Citrus: "#FFA500", Lemon: "#FFF700",
//   Lime: "#BFFF00", Kiwi: "#8EE53F", Apple: "#8DB600", Pear: "#D1E231",
//   Grape: "#6F2DA8", Plum: "#8E4585", Blackberry: "#4D0135", Mulberry: "#C54B8C",
//   Raisin: "#652DC1", Eggplant: "#614051", Aubergine: "#472C4C", Amethyst: "#9966CC",
//   Orchid: "#DA70D6", Heather: "#D473D4", Thistle: "#D8BFD8", Mauve: "#E0B0FF",
//   Wisteria: "#C9A0DC", Periwinkle: "#CCCCFF", Cornflower: "#6495ED", Baby: "#89CFF0",
//   Powder: "#B0E0E6", Midnight: "#191970", Ocean: "#0077BE",
// };

// const extractColorName = (fullName: string) => {
//   if (!fullName) return "Main";
//   const words = fullName.trim().split(" ");
//   const lastWord = words[words.length - 1];
//   return lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
// };

// const extractColorHex = (fullName: string) => {
//   const colorName = extractColorName(fullName);
//   return colorMapHex[colorName] || "#cccccc";
// };

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
//   sku: string;
//   name: string;
//   slug: string;
//   description: string;
//   benefits: string;
//   price: number;
//   discount_price: number;
//   voucher_discount_price?: number;
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   color?: any[];
// }

// export default function ProductDetail() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isFetchingFull, setIsFetchingFull] = useState(false);

//   const [quantityInput, setQuantityInput] = useState<string>("1");
//   const quantity = parseInt(quantityInput) || 1;

//   const [isBuyingNow, setIsBuyingNow] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const [siblingColors, setSiblingColors] = useState<Product[]>([]);

//   const [isFavorited, setIsFavorited] = useState(false);
//   const { fetchCart, cartItems, addCartItemOptimistically, revertCartItems } = useCart();

//   const fetchSiblingColorsViaAPI = async (productName: string) => {
//     if (!productName) return;
//     try {
//       const words = productName.trim().split(" ");
//       let rootName = productName;

//       if (words.length > 1) {
//         words.pop();
//         rootName = words.join(" ");
//       }

//       const res = await fetch(`${BASE_URL}/api/products`);
//       const data = await res.json();
//       const allProducts = data.data ? data.data : data;

//       const siblings = allProducts.filter((p: Product) =>
//         p.name.toLowerCase().includes(rootName.toLowerCase()),
//       );

//       if (siblings.length <= 1) {
//         setSiblingColors([]);
//       } else {
//         setSiblingColors(siblings);
//       }
//     } catch (error) {
//       console.error("Gagal menarik data varian warna:", error);
//     }
//   };

//   useEffect(() => {
//     let isCurrentFetchValid = true;

//     const initialPassedData = location.state?.initialProduct;
//     const allPassedProducts = location.state?.allProducts; 

//     if (initialPassedData && String(initialPassedData.id) === id) {
//       setProduct(initialPassedData);
//       setLoading(false);
      
//       if (allPassedProducts && allPassedProducts.length > 0) {
//         const words = initialPassedData.name.trim().split(" ");
//         let rootName = initialPassedData.name;
//         if (words.length > 1) {
//           words.pop(); 
//           rootName = words.join(" ");
//         }

//         const localSiblings = allPassedProducts.filter((p: Product) =>
//           p.name.toLowerCase().includes(rootName.toLowerCase())
//         );

//         if (localSiblings.length > 1) {
//            setSiblingColors(localSiblings);
//         }
//       }
//     } else {
//       setLoading(true);
//       setProduct(null);
//     }

//     setIsFetchingFull(true);
//     setCurrentImageIndex(0);
//     setQuantityInput("1");

//     const fetchProductAndSiblings = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products/${id}`);
//         if (!res.ok) throw new Error("Produk tidak ditemukan");
//         const responseData = await res.json();

//         if (isCurrentFetchValid) {
//           const productObject = responseData.data ? responseData.data : responseData;
//           setProduct(productObject);
          
//           if (!allPassedProducts) {
//              await fetchSiblingColorsViaAPI(productObject.name);
//           }
//         }
//       } catch (error) {
//         if (isCurrentFetchValid) {
//           console.error("Gagal memuat produk:", error);
//           navigate("/products");
//         }
//       }
//     };

//     const checkWishlistStatus = async () => {
//       const token = localStorage.getItem("user_token");
//       if (!token) return;

//       try {
//         const res = await fetch(`${BASE_URL}/api/wishlists`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         });
//         if (res.ok) {
//           const data = await res.json();
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           const isWished = data.some(
//             (item: any) => item.product_id === Number(id),
//           );
          
//           if (isCurrentFetchValid) setIsFavorited(isWished);
//         }
//       } catch (error) {
//         if (isCurrentFetchValid) console.error("Gagal memeriksa wishlist:", error);
//       }
//     };

//     if (id) {
//       Promise.all([fetchProductAndSiblings(), checkWishlistStatus()]).finally(
//         () => {
//           if (isCurrentFetchValid) {
//             setLoading(false);
//             setIsFetchingFull(false);
//           }
//         },
//       );
//     }

//     return () => {
//       isCurrentFetchValid = false;
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id, navigate]);

//   const handleToggleWishlist = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk menyimpan produk ke favorit.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#059669",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Ke Halaman Login",
//         cancelButtonText: "Batal",
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ product_id: product?.id }),
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () =>
//     setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () =>
//     setCurrentImageIndex(
//       (prev) => (prev - 1 + gallery.length) % gallery.length,
//     );

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(angka);
//   };

//   const triggerFlyingAnimation = () => {
//     const startEl = document.getElementById("product-image");
//     const endEl = document.getElementById("cart-icon");

//     if (startEl && endEl && gallery.length > 0) {
//       const startRect = startEl.getBoundingClientRect();
//       const endRect = endEl.getBoundingClientRect();

//       const flyingImg = document.createElement("img");
//       flyingImg.src = gallery[currentImageIndex];
//       flyingImg.style.position = "fixed";
//       flyingImg.style.top = `${startRect.top}px`;
//       flyingImg.style.left = `${startRect.left}px`;
//       flyingImg.style.width = `${startRect.width}px`;
//       flyingImg.style.height = `${startRect.height}px`;
//       flyingImg.style.borderRadius = "10%";
//       flyingImg.style.zIndex = "9999";
//       flyingImg.style.transition =
//         "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//       document.body.appendChild(flyingImg);

//       requestAnimationFrame(() => {
//         flyingImg.style.top = `${endRect.top + 10}px`;
//         flyingImg.style.left = `${endRect.left + 10}px`;
//         flyingImg.style.width = "20px";
//         flyingImg.style.height = "20px";
//         flyingImg.style.opacity = "0.2";
//         flyingImg.style.borderRadius = "50%";
//       });

//       setTimeout(() => {
//         flyingImg.remove();
//         endEl.classList.add("scale-125");
//         setTimeout(() => endEl.classList.remove("scale-125"), 200);
//       }, 800);
//     }
//   };

//   const handleAddToCart = () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk mulai berbelanja.",
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: "Ke Halaman Login",
//       }).then(() => navigate("/login"));
//       return;
//     }

//     const previousCartState = [...cartItems];
//     const optimisticItem = {
//       id: Date.now(),
//       product_id: product!.id,
//       quantity: quantity,
//       gross_amount: quantity * product!.price,
//       color: null,
//       product: {
//         id: product!.id,
//         name: product!.name,
//         price: product!.price,
//         discount_price: product!.price,
//         image_url: product!.image_url,
//         sku: product!.sku,
//         stock: product!.stock,
//         color: "",
//       },
//     };

//     addCartItemOptimistically(optimisticItem);
//     triggerFlyingAnimation();
//     Swal.fire({
//       title: "Ditambahkan!",
//       icon: "success",
//       toast: true,
//       position: "top-end",
//       timer: 1500,
//       showConfirmButton: false,
//     });

//     fetch(`${BASE_URL}/api/carts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         product_id: product?.id,
//         quantity: quantity,
//         color: null,
//       }),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (res.ok && data.cart_id) {
//           fetchCart();
//         } else {
//           revertCartItems(previousCartState);
//           Swal.fire(
//             "Pemberitahuan",
//             data.message || "Gagal menambahkan produk ke keranjang.",
//             "warning",
//           );
//         }
//       })
//       .catch(() => {
//         revertCartItems(previousCartState);
//         console.error("Gagal terhubung ke server saat add to cart");
//       });
//   };

//   const handleBuyItNow = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         icon: "info",
//         confirmButtonColor: "#059669",
//       }).then(() => navigate("/login"));
//       return;
//     }

//     setIsBuyingNow(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: null,
//         }),
//       });
//       const data = await res.json();

//       if (res.ok && data.cart_id) {
//         fetchCart();
//         navigate("/checkout", { state: { selectedIds: [data.cart_id] } });
//       } else {
//         Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsBuyingNow(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value;
//     if (val === "" || /^\d+$/.test(val)) {
//       setQuantityInput(val);
//     }
//   };

//   const handleInputBlur = () => {
//     let parsed = parseInt(quantityInput);
//     if (isNaN(parsed) || parsed < 1) parsed = 1;
//     if (product && parsed > product.stock) {
//       parsed = product.stock;
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "warning",
//         title: `Maksimal stok adalah ${product.stock}`,
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     }
//     setQuantityInput(parsed.toString());
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;
//   const isFormDisabled = isOutOfStock || isBuyingNow;

//   const handleShare = async () => {
//     const shareData = {
//       title: product?.name,
//       text: `Cek produk keren ini dari Gycora: ${product?.name}`,
//       url: window.location.href,
//     };

//     if (navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch (err) {
//         console.error("Gagal membagikan:", err);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "success",
//         title: "Link produk disalin!",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };

//   // Cek apakah produk ini adalah lini Ethereal Glow Brush
//   const isEtherealBrush = product.name.toLowerCase().includes("ethereal glow brush");

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">
//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div
//               id="product-image"
//               className="relative group bg-gray-50 rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-[4/5] border border-gray-100 flex items-center justify-center"
//             >
//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-cover object-center w-full h-full transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
//                     />
//                   ))}
//                   {gallery.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M15 19l-7-7 7-7"
//                           />
//                         </svg>
//                       </button>
//                       <button
//                         onClick={nextImage}
//                         className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M9 5l7 7-7 7"
//                           />
//                         </svg>
//                       </button>
//                       <div className="absolute z-20 flex gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => setCurrentImageIndex(idx)}
//                             className={`h-2 rounded-full transition-all shadow-sm ${idx === currentImageIndex ? "bg-gycora w-6" : "bg-white/80 hover:bg-white w-2"}`}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">
//                   No Image
//                 </div>
//               )}
//               <div className="absolute z-20 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
//                   Video Demo
//                 </h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video
//                     src={product.variant_video}
//                     controls
//                     className="object-contain w-full h-64 md:h-80"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="flex flex-col justify-center">
//             <div className="flex items-start justify-between gap-4 mb-2">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
//                 {product.name}
//               </h1>
//               <div className="flex items-center gap-2 shrink-0">
//                 <button
//                   onClick={handleShare}
//                   className="flex items-center justify-center w-12 h-12 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:text-gycora"
//                   title="Bagikan Produk"
//                 >
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
//                     />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={handleToggleWishlist}
//                   className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                   title="Simpan ke Favorit"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {/* Tagline Dinamis Khusus Ethereal Brush */}
//             {isEtherealBrush && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 Rambut Lebih Rapi, Halus, dan Mudah Diatur dalam Sekali Sisir ✨
//               </h2>
//             )}

//             <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
//             <div className="mb-8">
//               {product.discount_price && product.discount_price > 0 ? (
//                 <div className="flex flex-col">
//                   <span className="text-2xl text-gray-400 line-through">
//                     {formatRupiah(product.price)}
//                   </span>
//                   <span className="text-4xl font-extrabold text-red-600">
//                     {formatRupiah(product.discount_price)}
//                   </span>
//                 </div>
//               ) : (
//                 <p className="text-4xl font-extrabold text-gycora">
//                   {formatRupiah(product.price)}
//                 </p>
//               )}
//             </div>

//             <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">
//               {siblingColors.length > 0 && (
//                 <div className="pb-6 mb-6 border-b border-gray-200">
//                   <h3 className="mb-3 text-sm font-bold text-gray-700">
//                     Pilih Varian Warna:
//                   </h3>
//                   <div className="flex flex-wrap gap-3">
//                     {siblingColors.map((sibling) => {
//                       const isCurrentProduct = sibling.id === product.id;

//                       return (
//                         <button
//                           key={sibling.id}
//                           onClick={() => {
//                             if (!isCurrentProduct) {
//                               window.scrollTo({ top: 0, behavior: "smooth" });
//                               // [PERBAIKAN] Pastikan allProducts ikut dilempar lagi saat ganti warna
//                               navigate(`/product/${sibling.id}`, {
//                                 state: { 
//                                   initialProduct: sibling,
//                                   allProducts: location.state?.allProducts
//                                 },
//                               });
//                             }
//                           }}
//                           className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${
//                             isCurrentProduct
//                               ? "border-gycora ring-2 ring-gycora/30 scale-105 cursor-default"
//                               : "border-gray-200 hover:border-gray-300 hover:scale-105 cursor-pointer bg-white"
//                           }`}
//                           title={`Lihat varian ${extractColorName(sibling.name)}`}
//                         >
//                           <span
//                             className="w-5 h-5 border border-gray-300 rounded-full shadow-inner"
//                             style={{
//                               backgroundColor: extractColorHex(sibling.name),
//                             }}
//                           ></span>
//                           <span
//                             className={`text-xs font-bold ${isCurrentProduct ? "text-gycora-dark" : "text-gray-700"}`}
//                           >
//                             {extractColorName(sibling.name)}
//                           </span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center justify-between w-full overflow-hidden bg-white border border-gray-300 h-14 rounded-xl">
//                   <button
//                     onClick={() => {
//                       const newVal = Math.max(1, quantity - 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-gycora hover:bg-gray-50 disabled:opacity-50"
//                   >
//                     -
//                   </button>

//                   <input
//                     type="text"
//                     value={quantityInput}
//                     onChange={handleInputChange}
//                     onBlur={handleInputBlur}
//                     disabled={isFormDisabled}
//                     className="w-full h-full font-bold text-center text-gray-900 bg-transparent outline-none appearance-none focus:ring-0"
//                   />

//                   <button
//                     onClick={() => {
//                       const newVal = Math.min(product.stock, quantity + 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-gycora hover:bg-gray-50 disabled:opacity-50"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 ${
//                       isOutOfStock
//                         ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-white border-gycora text-gycora hover:bg-emerald-50 active:scale-95"
//                     }`}
//                   >
//                     Add to Cart
//                   </button>

//                   <button
//                     onClick={handleBuyItNow}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all ${
//                       isOutOfStock
//                         ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-gycora text-white hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5 active:scale-95"
//                     }`}
//                   >
//                     {isBuyingNow
//                       ? "Memproses..."
//                       : isOutOfStock
//                         ? "Stok Habis"
//                         : "Buy it Now"}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-8">
//               <div>
//                 <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">
//                   Tentang Produk Ini
//                 </h3>
//                 <div className="leading-relaxed prose-sm prose text-gray-600 whitespace-pre-wrap sm:prose max-w-none">
//                   {/* Konten Kustom Khusus Ethereal Brush */}
//                   {isEtherealBrush ? (
//                     <div className="space-y-4">
//                       <p>
//                         Kenalin <strong>Ethereal Glow Brush</strong>, hairbrush anti-static dengan teknologi konduktif dan molekul karbon yang dirancang untuk membantu rambut terasa lebih halus, rapi, dan tampak berkilau setiap hari.
//                       </p>
//                       <p>
//                         Dengan desain fleksibel yang mengikuti kontur kepala serta bulu sisir yang lembut di kulit kepala, pengalaman menyisir jadi terasa lebih nyaman tanpa rasa sakit atau tarikan berlebih.
//                       </p>
//                       <p>
//                         Cocok untuk kamu yang ingin rambut tetap terlihat rapi di tengah aktivitas harian — tanpa perlu effort styling yang ribet.
//                       </p>
                      
//                       <div className="pt-6 mt-8 border-t border-gray-100">
//                         <h4 className="mb-4 font-bold text-gray-900 text-md">Kenapa Banyak yang Suka Ethereal Glow Brush?</h4>
//                         <ul className="space-y-3 list-none">
//                           <li className="flex gap-2"><span>✨</span> <div><strong>Anti-Static Technology:</strong> Membantu mengurangi rambut mengembang, kusut, dan sulit diatur.</div></li>
//                           <li className="flex gap-2"><span>✨</span> <div><strong>Membantu Rambut Tampak Lebih Halus & Berkilau:</strong> Setiap sapuan sisir membantu merapikan rambut sekaligus meningkatkan kilau alami.</div></li>
//                           <li className="flex gap-2"><span>✨</span> <div><strong>Flexible & Soft Bristles:</strong> Lembut di kulit kepala untuk membantu mengurangi rasa sakit dan rambut patah.</div></li>
//                           <li className="flex gap-2"><span>✨</span> <div><strong>Spiral Comb Design:</strong> Desain spiral mengikuti bentuk kepala dengan lebih nyaman.</div></li>
//                           <li className="flex gap-2"><span>✨</span> <div><strong>Eco-Friendly Material:</strong> Terbuat dari material Polylactic Acid Fiber yang ramah lingkungan.</div></li>
//                         </ul>
//                       </div>

//                       <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                         <div>
//                           <h4 className="mb-3 font-bold text-gray-900 text-md">Cocok Digunakan Untuk:</h4>
//                           <ul className="space-y-1 list-disc list-inside">
//                             <li>Rambut mudah kusut & mengembang</li>
//                             <li>Rambut yang susah diatur</li>
//                             <li>Penggunaan sehari-hari</li>
//                             <li>Semua jenis rambut</li>
//                           </ul>
//                         </div>
//                         <div>
//                           <h4 className="mb-3 font-bold text-gray-900 text-md">Detail Produk:</h4>
//                           <ul className="space-y-1 list-disc list-inside">
//                             <li>Material: Carbon Molecule + Polylactic Acid Fiber</li>
//                             <li>Size: 25 x 7 cm</li>
//                             <li>Include: Premium Soft Box</li>
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     // Rendering Default untuk Produk Lain (dari Database)
//                     isFetchingFull && !product.description ? (
//                       <div className="space-y-2 animate-pulse">
//                         <div className="w-full h-3 bg-gray-200 rounded"></div>
//                         <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
//                         <div className="w-4/6 h-3 bg-gray-200 rounded"></div>
//                       </div>
//                     ) : (
//                       product.description
//                     )
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
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";

// const colorMapHex: Record<string, string> = {
//   Black: "#000000", White: "#FFFFFF", Brown: "#8B4513", Beige: "#F5F5DC",
//   Red: "#8B0000", Navy: "#000080", Green: "#008000", Grey: "#808080",
//   Pink: "#FFC0CB", Yellow: "#FFD700", Blue: "#4169E1", Mocca: "#967969",
//   Cream: "#FDF4E3", Sage: "#9DC183", Gold: "#D4AF37", Orange: "#FF9900",
//   Silver: "#C0C0C0", Maroon: "#800000", Olive: "#808000", Taupe: "#483C32",
//   Khaki: "#F0E68C", Mustard: "#FFDB58", Emerald: "#50C878", Coral: "#FF7F50",
//   Mint: "#98FF98", Teal: "#008080", Cyan: "#00FFFF", Indigo: "#4B0082",
//   Violet: "#EE82EE", Purple: "#800080", Magenta: "#FF00FF", Lilac: "#C8A2C8",
//   Lavender: "#E6E6FA", Rose: "#FF007F", Peach: "#FFE5B4", Apricot: "#FBCEB1",
//   Ivory: "#FFFFF0", Tan: "#D2B48C", Charcoal: "#36454F", Ash: "#555555",
//   Platinum: "#E5E4E2", Bronze: "#CD7F32", Copper: "#B87333", Rust: "#B7410E",
//   Ochre: "#CC7722", Sienna: "#882D17", Terracotta: "#E2725B", Amber: "#FFBF00",
//   Caramel: "#FFD59A", Honey: "#FFC30B", Chestnut: "#954535", Walnut: "#5C4033",
//   Mahogany: "#C04000", Chocolate: "#7B3F00", Cocoa: "#D2691E", Coffee: "#6F4E37",
//   Mocha: "#493D26", Espresso: "#4B3621", Cappuccino: "#654321", Latte: "#C5A059",
//   Macchiato: "#8B5A2B", Almond: "#EED9C4", Hazelnut: "#C4A484", Pecan: "#8A3324",
//   Pistachio: "#93C572", Seafoam: "#9FE2BF", Turquoise: "#40E0D0", Aqua: "#00FFFF",
//   Azure: "#00FFFF", Sky: "#87CEEB", Cerulean: "#007BA7", Cobalt: "#0047AB",
//   Sapphire: "#0F52BA", Ultramarine: "#120A8F", Lapis: "#26619C", Denim: "#1560BD",
//   Steel: "#4682B4", Slate: "#708090", Gunmetal: "#2a3439", Onyx: "#353839",
//   Jet: "#343434", Ebony: "#555D50", Raven: "#050301", Pitch: "#000000",
//   Obsidian: "#0B0B0B", Carbon: "#333333", Graphite: "#383838", Pewter: "#8E8E8E",
//   Zinc: "#8C92AC", Lead: "#778899", Iron: "#A19D94", Titanium: "#878681",
//   Chromium: "#C0C0C0", Nickel: "#727472", Tungsten: "#A0A0A0", Fuchsia: "#FF00FF",
//   Crimson: "#DC143C", Carmine: "#960018", Ruby: "#E0115F", Scarlet: "#FF2400",
//   Vermilion: "#E34234", Brick: "#CB4154", Tomato: "#FF6347", Papaya: "#FFEFD5",
//   Melon: "#FDBCB4", Mango: "#F4A460", Citrus: "#FFA500", Lemon: "#FFF700",
//   Lime: "#BFFF00", Kiwi: "#8EE53F", Apple: "#8DB600", Pear: "#D1E231",
//   Grape: "#6F2DA8", Plum: "#8E4585", Blackberry: "#4D0135", Mulberry: "#C54B8C",
//   Raisin: "#652DC1", Eggplant: "#614051", Aubergine: "#472C4C", Amethyst: "#9966CC",
//   Orchid: "#DA70D6", Heather: "#D473D4", Thistle: "#D8BFD8", Mauve: "#E0B0FF",
//   Wisteria: "#C9A0DC", Periwinkle: "#CCCCFF", Cornflower: "#6495ED", Baby: "#89CFF0",
//   Powder: "#B0E0E6", Midnight: "#191970", Ocean: "#0077BE",
// };

// const extractColorName = (fullName: string) => {
//   if (!fullName) return "Main";
//   const words = fullName.trim().split(" ");
//   const lastWord = words[words.length - 1];
//   return lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
// };

// const extractColorHex = (fullName: string) => {
//   const colorName = extractColorName(fullName);
//   return colorMapHex[colorName] || "#cccccc";
// };

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
//   sku: string;
//   name: string;
//   slug: string;
//   description: string;
//   benefits: string;
//   price: number;
//   discount_price: number;
//   voucher_discount_price?: number;
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   color?: any[];
// }

// export default function ProductDetail() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isFetchingFull, setIsFetchingFull] = useState(false);

//   const [quantityInput, setQuantityInput] = useState<string>("1");
//   const quantity = parseInt(quantityInput) || 1;

//   const [isBuyingNow, setIsBuyingNow] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const [siblingColors, setSiblingColors] = useState<Product[]>([]);

//   const [isFavorited, setIsFavorited] = useState(false);
//   const { fetchCart, cartItems, addCartItemOptimistically, revertCartItems } = useCart();

//   const fetchSiblingColorsViaAPI = async (productName: string) => {
//     if (!productName) return;
//     try {
//       const words = productName.trim().split(" ");
//       let rootName = productName;

//       if (words.length > 1) {
//         words.pop();
//         rootName = words.join(" ");
//       }

//       const res = await fetch(`${BASE_URL}/api/products`);
//       const data = await res.json();
//       const allProducts = data.data ? data.data : data;

//       const siblings = allProducts.filter((p: Product) =>
//         p.name.toLowerCase().includes(rootName.toLowerCase()),
//       );

//       if (siblings.length <= 1) {
//         setSiblingColors([]);
//       } else {
//         setSiblingColors(siblings);
//       }
//     } catch (error) {
//       console.error("Gagal menarik data varian warna:", error);
//     }
//   };

//   useEffect(() => {
//     let isCurrentFetchValid = true;

//     const initialPassedData = location.state?.initialProduct;
//     const allPassedProducts = location.state?.allProducts; 

//     if (initialPassedData && String(initialPassedData.id) === id) {
//       setProduct(initialPassedData);
//       setLoading(false);
      
//       if (allPassedProducts && allPassedProducts.length > 0) {
//         const words = initialPassedData.name.trim().split(" ");
//         let rootName = initialPassedData.name;
//         if (words.length > 1) {
//           words.pop(); 
//           rootName = words.join(" ");
//         }

//         const localSiblings = allPassedProducts.filter((p: Product) =>
//           p.name.toLowerCase().includes(rootName.toLowerCase())
//         );

//         if (localSiblings.length > 1) {
//            setSiblingColors(localSiblings);
//         }
//       }
//     } else {
//       setLoading(true);
//       setProduct(null);
//     }

//     setIsFetchingFull(true);
//     setCurrentImageIndex(0);
//     setQuantityInput("1");

//     const fetchProductAndSiblings = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products/${id}`);
//         if (!res.ok) throw new Error("Produk tidak ditemukan");
//         const responseData = await res.json();

//         if (isCurrentFetchValid) {
//           const productObject = responseData.data ? responseData.data : responseData;
//           setProduct(productObject);
          
//           if (!allPassedProducts) {
//              await fetchSiblingColorsViaAPI(productObject.name);
//           }
//         }
//       } catch (error) {
//         if (isCurrentFetchValid) {
//           console.error("Gagal memuat produk:", error);
//           navigate("/products");
//         }
//       }
//     };

//     const checkWishlistStatus = async () => {
//       const token = localStorage.getItem("user_token");
//       if (!token) return;

//       try {
//         const res = await fetch(`${BASE_URL}/api/wishlists`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         });
//         if (res.ok) {
//           const data = await res.json();
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           const isWished = data.some(
//             (item: any) => item.product_id === Number(id),
//           );
          
//           if (isCurrentFetchValid) setIsFavorited(isWished);
//         }
//       } catch (error) {
//         if (isCurrentFetchValid) console.error("Gagal memeriksa wishlist:", error);
//       }
//     };

//     if (id) {
//       Promise.all([fetchProductAndSiblings(), checkWishlistStatus()]).finally(
//         () => {
//           if (isCurrentFetchValid) {
//             setLoading(false);
//             setIsFetchingFull(false);
//           }
//         },
//       );
//     }

//     return () => {
//       isCurrentFetchValid = false;
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id, navigate]);

//   const handleToggleWishlist = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk menyimpan produk ke favorit.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#059669",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Ke Halaman Login",
//         cancelButtonText: "Batal",
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ product_id: product?.id }),
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () =>
//     setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () =>
//     setCurrentImageIndex(
//       (prev) => (prev - 1 + gallery.length) % gallery.length,
//     );

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(angka);
//   };

//   const triggerFlyingAnimation = () => {
//     const startEl = document.getElementById("product-image");
//     const endEl = document.getElementById("cart-icon");

//     if (startEl && endEl && gallery.length > 0) {
//       const startRect = startEl.getBoundingClientRect();
//       const endRect = endEl.getBoundingClientRect();

//       const flyingImg = document.createElement("img");
//       flyingImg.src = gallery[currentImageIndex];
//       flyingImg.style.position = "fixed";
//       flyingImg.style.top = `${startRect.top}px`;
//       flyingImg.style.left = `${startRect.left}px`;
//       flyingImg.style.width = `${startRect.width}px`;
//       flyingImg.style.height = `${startRect.height}px`;
//       flyingImg.style.borderRadius = "10%";
//       flyingImg.style.zIndex = "9999";
//       flyingImg.style.transition =
//         "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//       document.body.appendChild(flyingImg);

//       requestAnimationFrame(() => {
//         flyingImg.style.top = `${endRect.top + 10}px`;
//         flyingImg.style.left = `${endRect.left + 10}px`;
//         flyingImg.style.width = "20px";
//         flyingImg.style.height = "20px";
//         flyingImg.style.opacity = "0.2";
//         flyingImg.style.borderRadius = "50%";
//       });

//       setTimeout(() => {
//         flyingImg.remove();
//         endEl.classList.add("scale-125");
//         setTimeout(() => endEl.classList.remove("scale-125"), 200);
//       }, 800);
//     }
//   };

//   const handleAddToCart = () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk mulai berbelanja.",
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: "Ke Halaman Login",
//       }).then(() => navigate("/login"));
//       return;
//     }

//     const previousCartState = [...cartItems];
//     const optimisticItem = {
//       id: Date.now(),
//       product_id: product!.id,
//       quantity: quantity,
//       gross_amount: quantity * product!.price,
//       color: null,
//       product: {
//         id: product!.id,
//         name: product!.name,
//         price: product!.price,
//         discount_price: product!.price,
//         image_url: product!.image_url,
//         sku: product!.sku,
//         stock: product!.stock,
//         color: "",
//       },
//     };

//     addCartItemOptimistically(optimisticItem);
//     triggerFlyingAnimation();
//     Swal.fire({
//       title: "Ditambahkan!",
//       icon: "success",
//       toast: true,
//       position: "top-end",
//       timer: 1500,
//       showConfirmButton: false,
//     });

//     fetch(`${BASE_URL}/api/carts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         product_id: product?.id,
//         quantity: quantity,
//         color: null,
//       }),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (res.ok && data.cart_id) {
//           fetchCart();
//         } else {
//           revertCartItems(previousCartState);
//           Swal.fire(
//             "Pemberitahuan",
//             data.message || "Gagal menambahkan produk ke keranjang.",
//             "warning",
//           );
//         }
//       })
//       .catch(() => {
//         revertCartItems(previousCartState);
//         console.error("Gagal terhubung ke server saat add to cart");
//       });
//   };

//   const handleBuyItNow = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         icon: "info",
//         confirmButtonColor: "#059669",
//       }).then(() => navigate("/login"));
//       return;
//     }

//     setIsBuyingNow(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: null,
//         }),
//       });
//       const data = await res.json();

//       if (res.ok && data.cart_id) {
//         fetchCart();
//         navigate("/checkout", { state: { selectedIds: [data.cart_id] } });
//       } else {
//         Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsBuyingNow(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value;
//     if (val === "" || /^\d+$/.test(val)) {
//       setQuantityInput(val);
//     }
//   };

//   const handleInputBlur = () => {
//     let parsed = parseInt(quantityInput);
//     if (isNaN(parsed) || parsed < 1) parsed = 1;
//     if (product && parsed > product.stock) {
//       parsed = product.stock;
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "warning",
//         title: `Maksimal stok adalah ${product.stock}`,
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     }
//     setQuantityInput(parsed.toString());
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;
//   const isFormDisabled = isOutOfStock || isBuyingNow;

//   const handleShare = async () => {
//     const shareData = {
//       title: product?.name,
//       text: `Cek produk keren ini dari Gycora: ${product?.name}`,
//       url: window.location.href,
//     };

//     if (navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch (err) {
//         console.error("Gagal membagikan:", err);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "success",
//         title: "Link produk disalin!",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };

//   // Cek kategori/nama produk
//   const isEtherealBrush = product.name.toLowerCase().includes("ethereal glow brush");
//   // [BARU] Cek apakah ini produk Eco Serenity Scalp Care
//   const isScalpCare = product.name.toLowerCase().includes("scalp");

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">
//           {/* <div className="flex flex-col mb-10 lg:mb-0">
//             <div
//               id="product-image"
//               className="relative group bg-gray-50 rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-[4/5] border border-gray-100 flex items-center justify-center"
//             >
//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-cover object-center w-full h-full transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
//                     />
//                   ))}
//                   {gallery.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M15 19l-7-7 7-7"
//                           />
//                         </svg>
//                       </button>
//                       <button
//                         onClick={nextImage}
//                         className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M9 5l7 7-7 7"
//                           />
//                         </svg>
//                       </button>
//                       <div className="absolute z-20 flex gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => setCurrentImageIndex(idx)}
//                             className={`h-2 rounded-full transition-all shadow-sm ${idx === currentImageIndex ? "bg-gycora w-6" : "bg-white/80 hover:bg-white w-2"}`}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">
//                   No Image
//                 </div>
//               )}
//               <div className="absolute z-20 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
//                   Video Demo
//                 </h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video
//                     src={product.variant_video}
//                     controls
//                     className="object-contain w-full h-64 md:h-80"
//                   />
//                 </div>
//               </div>
//             )}
//           </div> */}

//           {/* <div className="flex flex-col mb-10 lg:mb-0">
//             <div
//               id="product-image"
//               className="relative flex items-center justify-center p-4 overflow-hidden border border-gray-100 group bg-gray-50/50 rounded-3xl aspect-square md:p-8"
//             >
//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       // [PERBAIKAN] Ubah 'object-cover' menjadi 'object-contain' agar gambar selalu utuh
//                       className={`absolute inset-0 object-contain object-center w-full h-full p-4 md:p-8 transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
//                     />
//                   ))}
//                   {gallery.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                         </svg>
//                       </button>
//                       <button
//                         onClick={nextImage}
//                         className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                         </svg>
//                       </button>
//                       <div className="absolute z-20 flex gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => setCurrentImageIndex(idx)}
//                             className={`h-2 rounded-full transition-all shadow-sm ${idx === currentImageIndex ? "bg-gycora w-6" : "bg-white/80 hover:bg-white w-2"}`}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">
//                   No Image
//                 </div>
//               )}
//               <div className="absolute z-20 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
//                   Video Demo
//                 </h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video
//                     src={product.variant_video}
//                     controls
//                     className="object-contain w-full h-64 md:h-80"
//                   />
//                 </div>
//               </div>
//             )}
//           </div> */}
          
//           <div className="flex flex-col mb-10 lg:mb-0">
//             {/* [PERBAIKAN] Kontainer utama gambar. Pastikan relative dan overflow-hidden */}
//             <div
//               id="product-image"
//               className="relative flex items-center justify-center p-4 overflow-hidden border border-gray-100 group bg-gray-50/50 rounded-3xl aspect-square md:p-8"
//             >
//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-contain object-center w-full h-full p-4 md:p-8 transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
//                     />
//                   ))}
                  
//                   {/* Panah Navigasi Kiri & Kanan */}
//                   {gallery.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         // [PERBAIKAN] Tambahkan z-30 agar tombol pasti di atas gambar
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                         </svg>
//                       </button>
                      
//                       <button
//                         onClick={nextImage}
//                         // [PERBAIKAN] Tambahkan z-30
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                         </svg>
//                       </button>
                      
//                       {/* [PERBAIKAN] Wadah Bulatan Navigasi (Dots). Pastikan letaknya di tengah bawah. */}
//                       <div className="absolute left-0 right-0 z-30 flex items-center justify-center gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => setCurrentImageIndex(idx)}
//                             // [PERBAIKAN] Pastikan tombol ini tidak memiliki background tak kasat mata yang menjadikannya aneh
//                             className={`h-2 rounded-full transition-all shadow-sm focus:outline-none ${idx === currentImageIndex ? "bg-gycora w-6" : "bg-gray-300 hover:bg-gray-400 w-2"}`}
//                             aria-label={`Lihat gambar ke-${idx + 1}`}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">
//                   No Image
//                 </div>
//               )}
              
//               {/* Badge Kategori */}
//               <div className="absolute z-30 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {/* Video Demo (Jika ada) */}
//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
//                   Video Demo
//                 </h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video
//                     src={product.variant_video}
//                     controls
//                     className="object-contain w-full h-64 md:h-80"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>
//           {/*  */}

//           <div className="flex flex-col justify-center">
//             <div className="flex items-start justify-between gap-4 mb-2">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
//                 {product.name}
//               </h1>
//               <div className="flex items-center gap-2 shrink-0">
//                 <button
//                   onClick={handleShare}
//                   className="flex items-center justify-center w-12 h-12 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:text-gycora"
//                   title="Bagikan Produk"
//                 >
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
//                     />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={handleToggleWishlist}
//                   className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                   title="Simpan ke Favorit"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {/* Tagline Dinamis Khusus Ethereal Brush */}
//             {isEtherealBrush && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 Rambut Lebih Rapi, Halus, dan Mudah Diatur dalam Sekali Sisir ✨
//               </h2>
//             )}
//             {/* [BARU] Tagline Dinamis Khusus Eco Serenity Scalp Care */}
//             {isScalpCare && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 Scalp Massager untuk Kulit Kepala Lebih Bersih, Nyaman, dan Sehat ✨
//               </h2>
//             )}

//             <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
//             <div className="mb-8">
//               {product.discount_price && product.discount_price > 0 ? (
//                 <div className="flex flex-col">
//                   <span className="text-2xl text-gray-400 line-through">
//                     {formatRupiah(product.price)}
//                   </span>
//                   <span className="text-4xl font-extrabold text-red-600">
//                     {formatRupiah(product.discount_price)}
//                   </span>
//                 </div>
//               ) : (
//                 <p className="text-4xl font-extrabold text-gycora">
//                   {formatRupiah(product.price)}
//                 </p>
//               )}
//             </div>

//             <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">
//               {siblingColors.length > 0 && (
//                 <div className="pb-6 mb-6 border-b border-gray-200">
//                   <h3 className="mb-3 text-sm font-bold text-gray-700">
//                     Pilih Varian Warna:
//                   </h3>
//                   <div className="flex flex-wrap gap-3">
//                     {siblingColors.map((sibling) => {
//                       const isCurrentProduct = sibling.id === product.id;

//                       return (
//                         <button
//                           key={sibling.id}
//                           onClick={() => {
//                             if (!isCurrentProduct) {
//                               window.scrollTo({ top: 0, behavior: "smooth" });
//                               navigate(`/product/${sibling.id}`, {
//                                 state: { 
//                                   initialProduct: sibling,
//                                   allProducts: location.state?.allProducts
//                                 },
//                               });
//                             }
//                           }}
//                           className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${
//                             isCurrentProduct
//                               ? "border-gycora ring-2 ring-gycora/30 scale-105 cursor-default"
//                               : "border-gray-200 hover:border-gray-300 hover:scale-105 cursor-pointer bg-white"
//                           }`}
//                           title={`Lihat varian ${extractColorName(sibling.name)}`}
//                         >
//                           <span
//                             className="w-5 h-5 border border-gray-300 rounded-full shadow-inner"
//                             style={{
//                               backgroundColor: extractColorHex(sibling.name),
//                             }}
//                           ></span>
//                           <span
//                             className={`text-xs font-bold ${isCurrentProduct ? "text-gycora-dark" : "text-gray-700"}`}
//                           >
//                             {extractColorName(sibling.name)}
//                           </span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center justify-between w-full overflow-hidden bg-white border border-gray-300 h-14 rounded-xl">
//                   <button
//                     onClick={() => {
//                       const newVal = Math.max(1, quantity - 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-gycora hover:bg-gray-50 disabled:opacity-50"
//                   >
//                     -
//                   </button>

//                   <input
//                     type="text"
//                     value={quantityInput}
//                     onChange={handleInputChange}
//                     onBlur={handleInputBlur}
//                     disabled={isFormDisabled}
//                     className="w-full h-full font-bold text-center text-gray-900 bg-transparent outline-none appearance-none focus:ring-0"
//                   />

//                   <button
//                     onClick={() => {
//                       const newVal = Math.min(product.stock, quantity + 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-gycora hover:bg-gray-50 disabled:opacity-50"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 ${
//                       isOutOfStock
//                         ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-white border-gycora text-gycora hover:bg-emerald-50 active:scale-95"
//                     }`}
//                   >
//                     Add to Cart
//                   </button>

//                   <button
//                     onClick={handleBuyItNow}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all ${
//                       isOutOfStock
//                         ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-gycora text-white hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5 active:scale-95"
//                     }`}
//                   >
//                     {isBuyingNow
//                       ? "Memproses..."
//                       : isOutOfStock
//                         ? "Stok Habis"
//                         : "Buy it Now"}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-8">
//               <div>
//                 <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">
//                   Tentang Produk Ini
//                 </h3>
//                 <div className="leading-relaxed prose-sm prose text-gray-600 whitespace-pre-wrap sm:prose max-w-none">
//                   {/* Konten Kustom Khusus Ethereal Brush */}
//                   {isEtherealBrush ? (
//                     <div className="space-y-4">
//                       <p>
//                         Kenalin <strong>Ethereal Glow Brush</strong>, hairbrush anti-static dengan teknologi konduktif dan molekul karbon yang dirancang untuk membantu rambut terasa lebih halus, rapi, dan tampak berkilau setiap hari.
//                       </p>
//                       <p>
//                         Dengan desain fleksibel yang mengikuti kontur kepala serta bulu sisir yang lembut di kulit kepala, pengalaman menyisir jadi terasa lebih nyaman tanpa rasa sakit atau tarikan berlebih.
//                       </p>
//                       <p>
//                         Cocok untuk kamu yang ingin rambut tetap terlihat rapi di tengah aktivitas harian — tanpa perlu effort styling yang ribet.
//                       </p>
                      
//                       <div className="pt-6 mt-8 border-t border-gray-100">
//                         <h4 className="mb-4 font-bold text-gray-900 text-md">Kenapa Banyak yang Suka Ethereal Glow Brush?</h4>
//                         <ul className="space-y-3 list-none">
//                           <li className="flex gap-2"><span>✨</span> <div><strong>Anti-Static Technology:</strong> Membantu mengurangi rambut mengembang, kusut, dan sulit diatur.</div></li>
//                           <li className="flex gap-2"><span>✨</span> <div><strong>Membantu Rambut Tampak Lebih Halus & Berkilau:</strong> Setiap sapuan sisir membantu merapikan rambut sekaligus meningkatkan kilau alami.</div></li>
//                           <li className="flex gap-2"><span>✨</span> <div><strong>Flexible & Soft Bristles:</strong> Lembut di kulit kepala untuk membantu mengurangi rasa sakit dan rambut patah.</div></li>
//                           <li className="flex gap-2"><span>✨</span> <div><strong>Spiral Comb Design:</strong> Desain spiral mengikuti bentuk kepala dengan lebih nyaman.</div></li>
//                           <li className="flex gap-2"><span>✨</span> <div><strong>Eco-Friendly Material:</strong> Terbuat dari material Polylactic Acid Fiber yang ramah lingkungan.</div></li>
//                         </ul>
//                       </div>

//                       <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                         <div>
//                           <h4 className="mb-3 font-bold text-gray-900 text-md">Cocok Digunakan Untuk:</h4>
//                           <ul className="space-y-1 list-disc list-inside">
//                             <li>Rambut mudah kusut & mengembang</li>
//                             <li>Rambut yang susah diatur</li>
//                             <li>Penggunaan sehari-hari</li>
//                             <li>Semua jenis rambut</li>
//                           </ul>
//                         </div>
//                         <div>
//                           <h4 className="mb-3 font-bold text-gray-900 text-md">Detail Produk:</h4>
//                           <ul className="space-y-1 list-disc list-inside">
//                             <li>Material: Carbon Molecule + Polylactic Acid Fiber</li>
//                             <li>Size: 25 x 7 cm</li>
//                             <li>Include: Premium Soft Box</li>
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                   ) : isScalpCare ? (
//                     // [BARU] Konten Kustom Khusus Eco Serenity Scalp Care
//                     <div className="space-y-4">
//                       <p>
//                         Kenalin <strong>Eco Serenity Scalp Care</strong>, scalp massager inovatif dari Gycora yang dirancang untuk membantu membersihkan kulit kepala sekaligus memberikan sensasi pijatan yang menenangkan setiap hari.
//                       </p>
//                       <p>
//                         Dengan desain fleksibel dan 196 teeth dengan ukuran berbeda, Eco Serenity mampu menjangkau area kulit kepala secara lebih menyeluruh untuk membantu mengangkat kotoran, minyak berlebih, dan penumpukan pada kulit kepala tanpa rasa kasar atau iritasi.
//                       </p>
//                       <p>
//                         Bukan cuma nyaman digunakan saat keramas, tapi juga cocok untuk relaksasi di tengah aktivitas yang padat.
//                       </p>
                      
//                       <div className="pt-6 mt-8 border-t border-gray-100">
//                         <h4 className="mb-4 font-bold text-gray-900 text-md">Kenapa Banyak yang Suka Eco Serenity Scalp Care?</h4>
//                         <ul className="space-y-3 list-none">
//                           <li className="flex gap-2"><span>✨</span> <div><strong>Triple-Fold Structure Design:</strong> Desain fleksibel yang mengikuti bentuk kepala untuk pijatan nyaman maksimal.</div></li>
//                           <li className="flex gap-2"><span>✨</span> <div><strong>196 Flexible Teeth:</strong> Membantu membersihkan merata dan memberi sensasi relaxing.</div></li>
//                           <li className="flex gap-2"><span>✨</span> <div><strong>Membantu Membersihkan Kulit Kepala Lebih Optimal:</strong> Mengangkat minyak dan penumpukan kotoran.</div></li>
//                           <li className="flex gap-2"><span>✨</span> <div><strong>Relaxing Scalp Massage:</strong> Pijatan lembut bantu melancarkan sirkulasi kulit kepala.</div></li>
//                           <li className="flex gap-2"><span>✨</span> <div><strong>Anti-Microbial Silver Ion:</strong> Teknologi ion perak menjaga kebersihan alat.</div></li>
//                           <li className="flex gap-2"><span>✨</span> <div><strong>Ergonomic & Comfortable Grip:</strong> Nyaman digenggam dalam berbagai posisi.</div></li>
//                           <li className="flex gap-2"><span>✨</span> <div><strong>Multifungsi:</strong> Cocok saat rambut kering (relaksasi) maupun saat keramas (pembersihan ekstra).</div></li>
//                           <li className="flex gap-2"><span>✨</span> <div><strong>Eco-Friendly Material:</strong> Terbuat dari material yang dapat didaur ulang.</div></li>
//                         </ul>
//                       </div>

//                       <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                         <div>
//                           <h4 className="mb-3 font-bold text-gray-900 text-md">Cocok Digunakan Untuk:</h4>
//                           <ul className="space-y-1 list-disc list-inside">
//                             <li>Kulit kepala mudah berminyak</li>
//                             <li>Kulit kepala dengan penumpukan kotoran</li>
//                             <li>Pengalaman keramas yang lebih nyaman</li>
//                             <li>Relaksasi ringan sehari-hari</li>
//                             <li>Semua jenis rambut</li>
//                           </ul>
//                         </div>
//                         <div>
//                           <h4 className="mb-3 font-bold text-gray-900 text-md">Detail Produk:</h4>
//                           <ul className="space-y-1 list-disc list-inside">
//                             <li>Material: Recyclable Material</li>
//                             <li>Technology: Anti-Microbial Silver Ion</li>
//                             <li>Heat Resistance: Up to 80°C</li>
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     // Rendering Default untuk Produk Lain (dari Database)
//                     isFetchingFull && !product.description ? (
//                       <div className="space-y-2 animate-pulse">
//                         <div className="w-full h-3 bg-gray-200 rounded"></div>
//                         <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
//                         <div className="w-4/6 h-3 bg-gray-200 rounded"></div>
//                       </div>
//                     ) : (
//                       product.description
//                     )
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
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";

// const colorMapHex: Record<string, string> = {
//   Black: "#000000", White: "#FFFFFF", Brown: "#8B4513", Beige: "#F5F5DC",
//   Red: "#8B0000", Navy: "#000080", Green: "#008000", Grey: "#808080",
//   Pink: "#FFC0CB", Yellow: "#FFD700", Blue: "#4169E1", Mocca: "#967969",
//   Cream: "#FDF4E3", Sage: "#9DC183", Gold: "#D4AF37", Orange: "#FF9900",
//   Silver: "#C0C0C0", Maroon: "#800000", Olive: "#808000", Taupe: "#483C32",
//   Khaki: "#F0E68C", Mustard: "#FFDB58", Emerald: "#50C878", Coral: "#FF7F50",
//   Mint: "#98FF98", Teal: "#008080", Cyan: "#00FFFF", Indigo: "#4B0082",
//   Violet: "#EE82EE", Purple: "#800080", Magenta: "#FF00FF", Lilac: "#C8A2C8",
//   Lavender: "#E6E6FA", Rose: "#FF007F", Peach: "#FFE5B4", Apricot: "#FBCEB1",
//   Ivory: "#FFFFF0", Tan: "#D2B48C", Charcoal: "#36454F", Ash: "#555555",
//   Platinum: "#E5E4E2", Bronze: "#CD7F32", Copper: "#B87333", Rust: "#B7410E",
//   Ochre: "#CC7722", Sienna: "#882D17", Terracotta: "#E2725B", Amber: "#FFBF00",
//   Caramel: "#FFD59A", Honey: "#FFC30B", Chestnut: "#954535", Walnut: "#5C4033",
//   Mahogany: "#C04000", Chocolate: "#7B3F00", Cocoa: "#D2691E", Coffee: "#6F4E37",
//   Mocha: "#493D26", Espresso: "#4B3621", Cappuccino: "#654321", Latte: "#C5A059",
//   Macchiato: "#8B5A2B", Almond: "#EED9C4", Hazelnut: "#C4A484", Pecan: "#8A3324",
//   Pistachio: "#93C572", Seafoam: "#9FE2BF", Turquoise: "#40E0D0", Aqua: "#00FFFF",
//   Azure: "#00FFFF", Sky: "#87CEEB", Cerulean: "#007BA7", Cobalt: "#0047AB",
//   Sapphire: "#0F52BA", Ultramarine: "#120A8F", Lapis: "#26619C", Denim: "#1560BD",
//   Steel: "#4682B4", Slate: "#708090", Gunmetal: "#2a3439", Onyx: "#353839",
//   Jet: "#343434", Ebony: "#555D50", Raven: "#050301", Pitch: "#000000",
//   Obsidian: "#0B0B0B", Carbon: "#333333", Graphite: "#383838", Pewter: "#8E8E8E",
//   Zinc: "#8C92AC", Lead: "#778899", Iron: "#A19D94", Titanium: "#878681",
//   Chromium: "#C0C0C0", Nickel: "#727472", Tungsten: "#A0A0A0", Fuchsia: "#FF00FF",
//   Crimson: "#DC143C", Carmine: "#960018", Ruby: "#E0115F", Scarlet: "#FF2400",
//   Vermilion: "#E34234", Brick: "#CB4154", Tomato: "#FF6347", Papaya: "#FFEFD5",
//   Melon: "#FDBCB4", Mango: "#F4A460", Citrus: "#FFA500", Lemon: "#FFF700",
//   Lime: "#BFFF00", Kiwi: "#8EE53F", Apple: "#8DB600", Pear: "#D1E231",
//   Grape: "#6F2DA8", Plum: "#8E4585", Blackberry: "#4D0135", Mulberry: "#C54B8C",
//   Raisin: "#652DC1", Eggplant: "#614051", Aubergine: "#472C4C", Amethyst: "#9966CC",
//   Orchid: "#DA70D6", Heather: "#D473D4", Thistle: "#D8BFD8", Mauve: "#E0B0FF",
//   Wisteria: "#C9A0DC", Periwinkle: "#CCCCFF", Cornflower: "#6495ED", Baby: "#89CFF0",
//   Powder: "#B0E0E6", Midnight: "#191970", Ocean: "#0077BE",
// };

// const extractColorName = (fullName: string) => {
//   if (!fullName) return "Main";
//   const words = fullName.trim().split(" ");
//   const lastWord = words[words.length - 1];
//   return lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
// };

// const extractColorHex = (fullName: string) => {
//   const colorName = extractColorName(fullName);
//   return colorMapHex[colorName] || "#cccccc";
// };

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
//   sku: string;
//   name: string;
//   slug: string;
//   description: string;
//   benefits: string;
//   price: number;
//   discount_price: number;
//   voucher_discount_price?: number;
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   color?: any[];
// }

// export default function ProductDetail() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isFetchingFull, setIsFetchingFull] = useState(false);

//   const [quantityInput, setQuantityInput] = useState<string>("1");
//   const quantity = parseInt(quantityInput) || 1;

//   const [isBuyingNow, setIsBuyingNow] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const [siblingColors, setSiblingColors] = useState<Product[]>([]);
//   const [isFavorited, setIsFavorited] = useState(false);
  
//   // [BARU] State untuk Tab Aktif
//   const [activeTab, setActiveTab] = useState("desc");

//   const { fetchCart, cartItems, addCartItemOptimistically, revertCartItems } = useCart();

//   const fetchSiblingColorsViaAPI = async (productName: string) => {
//     if (!productName) return;
//     try {
//       const words = productName.trim().split(" ");
//       let rootName = productName;

//       if (words.length > 1) {
//         words.pop();
//         rootName = words.join(" ");
//       }

//       const res = await fetch(`${BASE_URL}/api/products`);
//       const data = await res.json();
//       const allProducts = data.data ? data.data : data;

//       const siblings = allProducts.filter((p: Product) =>
//         p.name.toLowerCase().includes(rootName.toLowerCase()),
//       );

//       if (siblings.length <= 1) {
//         setSiblingColors([]);
//       } else {
//         setSiblingColors(siblings);
//       }
//     } catch (error) {
//       console.error("Gagal menarik data varian warna:", error);
//     }
//   };

//   useEffect(() => {
//     let isCurrentFetchValid = true;

//     const initialPassedData = location.state?.initialProduct;
//     const allPassedProducts = location.state?.allProducts; 

//     if (initialPassedData && String(initialPassedData.id) === id) {
//       setProduct(initialPassedData);
//       setLoading(false);
      
//       if (allPassedProducts && allPassedProducts.length > 0) {
//         const words = initialPassedData.name.trim().split(" ");
//         let rootName = initialPassedData.name;
//         if (words.length > 1) {
//           words.pop(); 
//           rootName = words.join(" ");
//         }

//         const localSiblings = allPassedProducts.filter((p: Product) =>
//           p.name.toLowerCase().includes(rootName.toLowerCase())
//         );

//         if (localSiblings.length > 1) {
//            setSiblingColors(localSiblings);
//         }
//       }
//     } else {
//       setLoading(true);
//       setProduct(null);
//     }

//     setIsFetchingFull(true);
//     setCurrentImageIndex(0);
//     setQuantityInput("1");
//     setActiveTab("desc"); // Reset tab saat ganti produk

//     const fetchProductAndSiblings = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products/${id}`);
//         if (!res.ok) throw new Error("Produk tidak ditemukan");
//         const responseData = await res.json();

//         if (isCurrentFetchValid) {
//           const productObject = responseData.data ? responseData.data : responseData;
//           setProduct(productObject);
          
//           if (!allPassedProducts) {
//              await fetchSiblingColorsViaAPI(productObject.name);
//           }
//         }
//       } catch (error) {
//         if (isCurrentFetchValid) {
//           console.error("Gagal memuat produk:", error);
//           navigate("/products");
//         }
//       }
//     };

//     const checkWishlistStatus = async () => {
//       const token = localStorage.getItem("user_token");
//       if (!token) return;

//       try {
//         const res = await fetch(`${BASE_URL}/api/wishlists`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         });
//         if (res.ok) {
//           const data = await res.json();
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           const isWished = data.some(
//             (item: any) => item.product_id === Number(id),
//           );
          
//           if (isCurrentFetchValid) setIsFavorited(isWished);
//         }
//       } catch (error) {
//         if (isCurrentFetchValid) console.error("Gagal memeriksa wishlist:", error);
//       }
//     };

//     if (id) {
//       Promise.all([fetchProductAndSiblings(), checkWishlistStatus()]).finally(
//         () => {
//           if (isCurrentFetchValid) {
//             setLoading(false);
//             setIsFetchingFull(false);
//           }
//         },
//       );
//     }

//     return () => {
//       isCurrentFetchValid = false;
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id, navigate]);

//   const handleToggleWishlist = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk menyimpan produk ke favorit.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#059669",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Ke Halaman Login",
//         cancelButtonText: "Batal",
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ product_id: product?.id }),
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () =>
//     setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () =>
//     setCurrentImageIndex(
//       (prev) => (prev - 1 + gallery.length) % gallery.length,
//     );

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(angka);
//   };

//   const triggerFlyingAnimation = () => {
//     const startEl = document.getElementById("product-image");
//     const endEl = document.getElementById("cart-icon");

//     if (startEl && endEl && gallery.length > 0) {
//       const startRect = startEl.getBoundingClientRect();
//       const endRect = endEl.getBoundingClientRect();

//       const flyingImg = document.createElement("img");
//       flyingImg.src = gallery[currentImageIndex];
//       flyingImg.style.position = "fixed";
//       flyingImg.style.top = `${startRect.top}px`;
//       flyingImg.style.left = `${startRect.left}px`;
//       flyingImg.style.width = `${startRect.width}px`;
//       flyingImg.style.height = `${startRect.height}px`;
//       flyingImg.style.borderRadius = "10%";
//       flyingImg.style.zIndex = "9999";
//       flyingImg.style.transition =
//         "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//       document.body.appendChild(flyingImg);

//       requestAnimationFrame(() => {
//         flyingImg.style.top = `${endRect.top + 10}px`;
//         flyingImg.style.left = `${endRect.left + 10}px`;
//         flyingImg.style.width = "20px";
//         flyingImg.style.height = "20px";
//         flyingImg.style.opacity = "0.2";
//         flyingImg.style.borderRadius = "50%";
//       });

//       setTimeout(() => {
//         flyingImg.remove();
//         endEl.classList.add("scale-125");
//         setTimeout(() => endEl.classList.remove("scale-125"), 200);
//       }, 800);
//     }
//   };

//   const handleAddToCart = () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk mulai berbelanja.",
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: "Ke Halaman Login",
//       }).then(() => navigate("/login"));
//       return;
//     }

//     const previousCartState = [...cartItems];
//     const optimisticItem = {
//       id: Date.now(),
//       product_id: product!.id,
//       quantity: quantity,
//       gross_amount: quantity * product!.price,
//       color: null,
//       product: {
//         id: product!.id,
//         name: product!.name,
//         price: product!.price,
//         discount_price: product!.price,
//         image_url: product!.image_url,
//         sku: product!.sku,
//         stock: product!.stock,
//         color: "",
//       },
//     };

//     addCartItemOptimistically(optimisticItem);
//     triggerFlyingAnimation();
//     Swal.fire({
//       title: "Ditambahkan!",
//       icon: "success",
//       toast: true,
//       position: "top-end",
//       timer: 1500,
//       showConfirmButton: false,
//     });

//     fetch(`${BASE_URL}/api/carts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         product_id: product?.id,
//         quantity: quantity,
//         color: null,
//       }),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (res.ok && data.cart_id) {
//           fetchCart();
//         } else {
//           revertCartItems(previousCartState);
//           Swal.fire(
//             "Pemberitahuan",
//             data.message || "Gagal menambahkan produk ke keranjang.",
//             "warning",
//           );
//         }
//       })
//       .catch(() => {
//         revertCartItems(previousCartState);
//         console.error("Gagal terhubung ke server saat add to cart");
//       });
//   };

//   const handleBuyItNow = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         icon: "info",
//         confirmButtonColor: "#059669",
//       }).then(() => navigate("/login"));
//       return;
//     }

//     setIsBuyingNow(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: null,
//         }),
//       });
//       const data = await res.json();

//       if (res.ok && data.cart_id) {
//         fetchCart();
//         navigate("/checkout", { state: { selectedIds: [data.cart_id] } });
//       } else {
//         Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsBuyingNow(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value;
//     if (val === "" || /^\d+$/.test(val)) {
//       setQuantityInput(val);
//     }
//   };

//   const handleInputBlur = () => {
//     let parsed = parseInt(quantityInput);
//     if (isNaN(parsed) || parsed < 1) parsed = 1;
//     if (product && parsed > product.stock) {
//       parsed = product.stock;
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "warning",
//         title: `Maksimal stok adalah ${product.stock}`,
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     }
//     setQuantityInput(parsed.toString());
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;
//   const isFormDisabled = isOutOfStock || isBuyingNow;

//   const handleShare = async () => {
//     const shareData = {
//       title: product?.name,
//       text: `Cek produk keren ini dari Gycora: ${product?.name}`,
//       url: window.location.href,
//     };

//     if (navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch (err) {
//         console.error("Gagal membagikan:", err);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "success",
//         title: "Link produk disalin!",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };

//   const isEtherealBrush = product.name.toLowerCase().includes("ethereal glow brush");
//   const isScalpCare = product.name.toLowerCase().includes("scalp");

//   // [BARU] Data Review Spesifik per Produk
//   const brushReviews = [
//     { name: "Claudiasunshinee", text: "Sisir nya bagus banget sih sesuai dgn claim nya 🙌🙌 sblmnya aku pakai brand w** krn rambutku rontok.. trs setelah aku compare sm brand Gycora ternyata jauh lbh ga rontok pakai Gycora ❤👍" },
//     { name: "Nilasetiobudii", text: "Sisirnya enak banget terutama buat rambut yg suka kusut Jd lebih gampang pake sisir dari Gycora.." },
//     { name: "Thaliastanley___", text: "Setelah saya pakai hair brush nya rambutku jadi lebih gak kusut dan bikin lebih pede pastinya.." },
//     { name: "Herlenasutanto", text: "Oke kok enak sisir nya lentur ngikutin kepala. ga nyangkut2 hehe" },
//     { name: "Anitaa_bee", text: "Sukaaa poll sma sisirnya... Rambut jd makin teratur pas disisir dan ga gerundel (kusut frizzy) n rambut ku ya uda ga tllu banyak yg rontok. terus sisirnya tu empuk dan nyaman poll di kepala ga sakit." },
//   ];

//   const scalpReviews = [
//     { name: "v*****b", text: "Kemasan: Bagus\nEfek: Ketombe keluar semua, semoga bisa bersih pakai ini\nPengalaman Penggunaan: Rasanya rambut halus setelah pakai." },
//     { name: "evelinlembono", text: "Tidak ada komentar." },
//     { name: "arhdt", text: "Tidak ada komentar." },
//   ];

//   const activeReviews = isEtherealBrush ? brushReviews : isScalpCare ? scalpReviews : [];

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          
//           {/* BAGIAN KIRI: GAMBAR */}
//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div
//               id="product-image"
//               className="relative flex items-center justify-center p-4 overflow-hidden border border-gray-100 group bg-gray-50/50 rounded-3xl aspect-square md:p-8"
//             >
//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-contain object-center w-full h-full p-4 md:p-8 transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
//                     />
//                   ))}
                  
//                   {gallery.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                         </svg>
//                       </button>
                      
//                       <button
//                         onClick={nextImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                         </svg>
//                       </button>
                      
//                       <div className="absolute left-0 right-0 z-30 flex items-center justify-center gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => setCurrentImageIndex(idx)}
//                             className={`h-2 rounded-full transition-all shadow-sm focus:outline-none ${idx === currentImageIndex ? "bg-[#006A4E] w-6" : "bg-gray-300 hover:bg-gray-400 w-2"}`}
//                             aria-label={`Lihat gambar ke-${idx + 1}`}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">
//                   No Image
//                 </div>
//               )}
              
//               <div className="absolute z-30 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
//                   Video Demo
//                 </h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video
//                     src={product.variant_video}
//                     controls
//                     className="object-contain w-full h-64 md:h-80"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* BAGIAN KANAN: DETAIL PRODUK */}
//           <div className="flex flex-col justify-center">
//             <div className="flex items-start justify-between gap-4 mb-2">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
//                 {product.name}
//               </h1>
//               <div className="flex items-center gap-2 shrink-0">
//                 <button
//                   onClick={handleShare}
//                   className="flex items-center justify-center w-12 h-12 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:text-[#006A4E]"
//                   title="Bagikan Produk"
//                 >
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={handleToggleWishlist}
//                   className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                   title="Simpan ke Favorit"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {isEtherealBrush && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 Rambut Lebih Rapi, Halus, dan Mudah Diatur dalam Sekali Sisir ✨
//               </h2>
//             )}
//             {isScalpCare && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 Scalp Massager untuk Kulit Kepala Lebih Bersih, Nyaman, dan Sehat ✨
//               </h2>
//             )}

//             <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
//             <div className="mb-8">
//               {product.discount_price && product.discount_price > 0 ? (
//                 <div className="flex flex-col">
//                   <span className="text-2xl text-gray-400 line-through">
//                     {formatRupiah(product.price)}
//                   </span>
//                   <span className="text-4xl font-extrabold text-red-600">
//                     {formatRupiah(product.discount_price)}
//                   </span>
//                 </div>
//               ) : (
//                 <p className="text-4xl font-extrabold text-[#006A4E]">
//                   {formatRupiah(product.price)}
//                 </p>
//               )}
//             </div>

//             <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">
//               {siblingColors.length > 0 && (
//                 <div className="pb-6 mb-6 border-b border-gray-200">
//                   <h3 className="mb-3 text-sm font-bold text-gray-700">
//                     Pilih Varian Warna:
//                   </h3>
//                   <div className="flex flex-wrap gap-3">
//                     {siblingColors.map((sibling) => {
//                       const isCurrentProduct = sibling.id === product.id;
//                       return (
//                         <button
//                           key={sibling.id}
//                           onClick={() => {
//                             if (!isCurrentProduct) {
//                               window.scrollTo({ top: 0, behavior: "smooth" });
//                               navigate(`/product/${sibling.id}`, {
//                                 state: { 
//                                   initialProduct: sibling,
//                                   allProducts: location.state?.allProducts
//                                 },
//                               });
//                             }
//                           }}
//                           className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${
//                             isCurrentProduct
//                               ? "border-[#006A4E] ring-2 ring-[#006A4E]/30 scale-105 cursor-default"
//                               : "border-gray-200 hover:border-gray-300 hover:scale-105 cursor-pointer bg-white"
//                           }`}
//                           title={`Lihat varian ${extractColorName(sibling.name)}`}
//                         >
//                           <span
//                             className="w-5 h-5 border border-gray-300 rounded-full shadow-inner"
//                             style={{ backgroundColor: extractColorHex(sibling.name) }}
//                           ></span>
//                           <span className={`text-xs font-bold ${isCurrentProduct ? "text-[#006A4E]" : "text-gray-700"}`}>
//                             {extractColorName(sibling.name)}
//                           </span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center justify-between w-full overflow-hidden bg-white border border-gray-300 h-14 rounded-xl">
//                   <button
//                     onClick={() => {
//                       const newVal = Math.max(1, quantity - 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     -
//                   </button>

//                   <input
//                     type="text"
//                     value={quantityInput}
//                     onChange={handleInputChange}
//                     onBlur={handleInputBlur}
//                     disabled={isFormDisabled}
//                     className="w-full h-full font-bold text-center text-gray-900 bg-transparent outline-none appearance-none focus:ring-0"
//                   />

//                   <button
//                     onClick={() => {
//                       const newVal = Math.min(product.stock, quantity + 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-white border-[#006A4E] text-[#006A4E] hover:bg-emerald-50 active:scale-95"
//                     }`}
//                   >
//                     Add to Cart
//                   </button>

//                   <button
//                     onClick={handleBuyItNow}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-[#006A4E] text-white hover:bg-emerald-900 shadow-[0_4px_14px_0_rgba(0,106,78,0.39)] hover:-translate-y-0.5 active:scale-95"
//                     }`}
//                   >
//                     {isBuyingNow ? "Memproses..." : isOutOfStock ? "Stok Habis" : "Buy it Now"}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* ==============================================================
//                 BAGIAN TAB (DESCRIPTION | HOW TO USE | FAQ | REVIEW) 
//             ============================================================== */}
//             <div className="mt-4">
//               <div className="flex flex-wrap gap-2 pb-4 mb-6 border-b border-gray-100">
//                 <button
//                   onClick={() => setActiveTab("desc")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "desc" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   Description
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("how-to-use")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "how-to-use" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   How to Use
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("faq")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "faq" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   FAQ
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("review")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "review" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   Review
//                 </button>
//               </div>

//               <div className="text-gray-600 prose-sm prose whitespace-pre-wrap sm:prose max-w-none min-h-[200px]">
                
//                 {/* KONTEN TAB: DESCRIPTION */}
//                 {activeTab === "desc" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <p>
//                           Kenalin <strong>Ethereal Glow Brush</strong>, hairbrush anti-static dengan teknologi konduktif dan molekul karbon yang dirancang untuk membantu rambut terasa lebih halus, rapi, dan tampak berkilau setiap hari.
//                         </p>
//                         <p>
//                           Dengan desain fleksibel yang mengikuti kontur kepala serta bulu sisir yang lembut di kulit kepala, pengalaman menyisir jadi terasa lebih nyaman tanpa rasa sakit atau tarikan berlebih.
//                         </p>
//                         <p>
//                           Cocok untuk kamu yang ingin rambut tetap terlihat rapi di tengah aktivitas harian — tanpa perlu effort styling yang ribet.
//                         </p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">Kenapa Banyak yang Suka Ethereal Glow Brush?</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Anti-Static Technology:</strong> Membantu mengurangi rambut mengembang, kusut, dan sulit diatur.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Membantu Rambut Tampak Lebih Halus & Berkilau:</strong> Setiap sapuan sisir membantu merapikan rambut sekaligus meningkatkan kilau alami.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Flexible & Soft Bristles:</strong> Lembut di kulit kepala untuk membantu mengurangi rasa sakit dan rambut patah.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Spiral Comb Design:</strong> Desain spiral mengikuti bentuk kepala dengan lebih nyaman.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Eco-Friendly Material:</strong> Terbuat dari material Polylactic Acid Fiber yang ramah lingkungan.</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">Cocok Digunakan Untuk:</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>Rambut mudah kusut & mengembang</li>
//                               <li>Rambut yang susah diatur</li>
//                               <li>Penggunaan sehari-hari</li>
//                               <li>Semua jenis rambut</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">Detail Produk:</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>Material: Carbon Molecule + Polylactic Acid Fiber</li>
//                               <li>Size: 25 x 7 cm</li>
//                               <li>Include: Premium Soft Box</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <p>
//                           Kenalin <strong>Eco Serenity Scalp Care</strong>, scalp massager inovatif dari Gycora yang dirancang untuk membantu membersihkan kulit kepala sekaligus memberikan sensasi pijatan yang menenangkan setiap hari.
//                         </p>
//                         <p>
//                           Dengan desain fleksibel dan 196 teeth dengan ukuran berbeda, Eco Serenity mampu menjangkau area kulit kepala secara lebih menyeluruh untuk membantu mengangkat kotoran, minyak berlebih, dan penumpukan pada kulit kepala tanpa rasa kasar atau iritasi.
//                         </p>
//                         <p>
//                           Bukan cuma nyaman digunakan saat keramas, tapi juga cocok untuk relaksasi di tengah aktivitas yang padat.
//                         </p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">Kenapa Banyak yang Suka Eco Serenity Scalp Care?</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Triple-Fold Structure Design:</strong> Desain fleksibel yang mengikuti bentuk kepala untuk pijatan nyaman maksimal.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>196 Flexible Teeth:</strong> Membantu membersihkan merata dan memberi sensasi relaxing.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Membantu Membersihkan Kulit Kepala Lebih Optimal:</strong> Mengangkat minyak dan penumpukan kotoran.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Relaxing Scalp Massage:</strong> Pijatan lembut bantu melancarkan sirkulasi kulit kepala.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Anti-Microbial Silver Ion:</strong> Teknologi ion perak menjaga kebersihan alat.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Ergonomic & Comfortable Grip:</strong> Nyaman digenggam dalam berbagai posisi.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Multifungsi:</strong> Cocok saat rambut kering (relaksasi) maupun saat keramas (pembersihan ekstra).</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Eco-Friendly Material:</strong> Terbuat dari material yang dapat didaur ulang.</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">Cocok Digunakan Untuk:</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>Kulit kepala mudah berminyak</li>
//                               <li>Kulit kepala dengan penumpukan kotoran</li>
//                               <li>Pengalaman keramas yang lebih nyaman</li>
//                               <li>Relaksasi ringan sehari-hari</li>
//                               <li>Semua jenis rambut</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">Detail Produk:</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>Material: Recyclable Material</li>
//                               <li>Technology: Anti-Microbial Silver Ion</li>
//                               <li>Heat Resistance: Up to 80°C</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : (
//                       isFetchingFull && !product.description ? (
//                         <div className="space-y-2 animate-pulse">
//                           <div className="w-full h-3 bg-gray-200 rounded"></div>
//                           <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
//                           <div className="w-4/6 h-3 bg-gray-200 rounded"></div>
//                         </div>
//                       ) : (
//                         product.description || <p className="italic text-gray-400">Deskripsi belum tersedia.</p>
//                       )
//                     )}
//                   </div>
//                 )}

//                 {/* KONTEN TAB: HOW TO USE */}
//                 {activeTab === "how-to-use" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     <h4 className="font-bold text-gray-900">Cara Penggunaan yang Tepat</h4>
//                     {isEtherealBrush ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>Pastikan rambut dalam keadaan kering atau setengah kering (jangan basah kuyup).</li>
//                         <li>Sisir perlahan dari bagian tengah atau ujung rambut terlebih dahulu untuk mengurai kusut.</li>
//                         <li>Setelah bagian bawah rapi, lanjutkan menyisir dari akar hingga ke ujung rambut.</li>
//                         <li>Gunakan setiap pagi atau kapan pun rambut terasa berantakan/statis.</li>
//                       </ul>
//                     ) : isScalpCare ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li><strong>Saat Keramas:</strong> Aplikasikan sampo secara merata, gunakan Scalp Care dengan gerakan melingkar yang lembut untuk membersihkan kulit kepala.</li>
//                         <li><strong>Saat Rambut Kering:</strong> Gunakan sebagai alat pijat relaksasi di sela-sela aktivitas harian dengan tekanan ringan.</li>
//                         <li>Bilas Scalp Care dengan air bersih setelah penggunaan bersama produk perawatan rambut.</li>
//                       </ul>
//                     ) : (
//                       <p className="italic text-gray-400">Panduan penggunaan belum tersedia untuk produk ini.</p>
//                     )}
//                   </div>
//                 )}

//                 {/* KONTEN TAB: FAQ */}
//                 {activeTab === "faq" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <div>
//                           <h5 className="font-bold text-gray-900">Q: Apakah aman untuk rambut rontok?</h5>
//                           <p className="mt-1">A: Ya, bulu sisirnya didesain lembut dan fleksibel sehingga meminimalisir tarikan yang bisa menyebabkan rambut patah/rontok.</p>
//                         </div>
//                         <div>
//                           <h5 className="font-bold text-gray-900">Q: Bagaimana cara membersihkan sisir ini?</h5>
//                           <p className="mt-1">A: Kamu bisa menggunakan sikat kecil untuk membuang helaian rambut, lalu lap permukaan sisir dengan kain basah/tisu basah. Hindari merendam di dalam air terlalu lama.</p>
//                         </div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <div>
//                           <h5 className="font-bold text-gray-900">Q: Apakah alat ini membuat rambut makin kusut saat keramas?</h5>
//                           <p className="mt-1">A: Tidak, gunakan dengan gerakan memijat ke satu arah atau melingkar kecil. Hindari menggosok maju-mundur secara kasar agar rambut tetap rapi.</p>
//                         </div>
//                         <div>
//                           <h5 className="font-bold text-gray-900">Q: Apakah aman untuk kulit kepala sensitif?</h5>
//                           <p className="mt-1">A: Sangat aman. Silikon yang digunakan cukup fleksibel sehingga memberikan pijatan tanpa melukai kulit kepala.</p>
//                         </div>
//                       </>
//                     ) : (
//                       <p className="italic text-gray-400">Belum ada pertanyaan yang sering diajukan untuk produk ini.</p>
//                     )}
//                   </div>
//                 )}

//                 {/* KONTEN TAB: REVIEW */}
//                 {/* {activeTab === "review" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     <div className="pb-4 border-b border-gray-100">
//                       <div className="flex items-center gap-2 mb-2">
//                         <div className="flex text-xs text-amber-400">★★★★★</div>
//                         <span className="font-bold text-gray-900">Siti A.</span>
//                         <span className="px-2 py-0.5 ml-2 text-[10px] font-bold text-[#006A4E] bg-emerald-50 rounded-full">Verified Buyer</span>
//                       </div>
//                       <p className="text-gray-600">"Suka banget sama produknya! Desainnya cakep dan beneran ngebantu ngerapihin rambut tanpa sakit."</p>
//                     </div>
//                     <div className="pb-4 border-b border-gray-100">
//                       <div className="flex items-center gap-2 mb-2">
//                         <div className="flex text-xs text-amber-400">★★★★★</div>
//                         <span className="font-bold text-gray-900">Nadia M.</span>
//                         <span className="px-2 py-0.5 ml-2 text-[10px] font-bold text-[#006A4E] bg-emerald-50 rounded-full">Verified Buyer</span>
//                       </div>
//                       <p className="text-gray-600">"Udah coba banyak merk lain tapi ini yang paling nyaman dipakai tiap hari. Worth the price!"</p>
//                     </div>
//                     <div className="mt-4 text-center">
//                       <button className="text-sm font-bold text-[#006A4E] hover:underline">Lihat Semua Ulasan</button>
//                     </div>
//                   </div>
//                 )} */}
                
//                 {activeTab === "review" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {activeReviews.length > 0 ? (
//                       activeReviews.map((review, index) => (
//                         <div key={index} className="pb-4 border-b border-gray-100">
//                           <div className="flex items-center gap-2 mb-2">
//                             <div className="flex text-xs text-amber-400">★★★★★</div>
//                             <span className="font-bold text-gray-900">{review.name}</span>
//                             <span className="px-2 py-0.5 ml-2 text-[10px] font-bold text-[#006A4E] bg-emerald-50 rounded-full">
//                               Verified Buyer
//                             </span>
//                           </div>
//                           <p className="text-gray-600 whitespace-pre-line">"{review.text}"</p>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="italic text-gray-400">Belum ada ulasan untuk produk ini.</p>
//                     )}
                    
//                     {activeReviews.length > 0 && (
//                       <div className="mt-4 text-center">
//                         <button className="text-sm font-bold text-[#006A4E] hover:underline focus:outline-none">
//                           Lihat Semua Ulasan
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";

// const colorMapHex: Record<string, string> = {
//   Black: "#000000", White: "#FFFFFF", Brown: "#8B4513", Beige: "#F5F5DC",
//   Red: "#8B0000", Navy: "#000080", Green: "#008000", Grey: "#808080",
//   Pink: "#FFC0CB", Yellow: "#FFD700", Blue: "#4169E1", Mocca: "#967969",
//   Cream: "#FDF4E3", Sage: "#9DC183", Gold: "#D4AF37", Orange: "#FF9900",
//   Silver: "#C0C0C0", Maroon: "#800000", Olive: "#808000", Taupe: "#483C32",
//   Khaki: "#F0E68C", Mustard: "#FFDB58", Emerald: "#50C878", Coral: "#FF7F50",
//   Mint: "#98FF98", Teal: "#008080", Cyan: "#00FFFF", Indigo: "#4B0082",
//   Violet: "#EE82EE", Purple: "#800080", Magenta: "#FF00FF", Lilac: "#C8A2C8",
//   Lavender: "#E6E6FA", Rose: "#FF007F", Peach: "#FFE5B4", Apricot: "#FBCEB1",
//   Ivory: "#FFFFF0", Tan: "#D2B48C", Charcoal: "#36454F", Ash: "#555555",
//   Platinum: "#E5E4E2", Bronze: "#CD7F32", Copper: "#B87333", Rust: "#B7410E",
//   Ochre: "#CC7722", Sienna: "#882D17", Terracotta: "#E2725B", Amber: "#FFBF00",
//   Caramel: "#FFD59A", Honey: "#FFC30B", Chestnut: "#954535", Walnut: "#5C4033",
//   Mahogany: "#C04000", Chocolate: "#7B3F00", Cocoa: "#D2691E", Coffee: "#6F4E37",
//   Mocha: "#493D26", Espresso: "#4B3621", Cappuccino: "#654321", Latte: "#C5A059",
//   Macchiato: "#8B5A2B", Almond: "#EED9C4", Hazelnut: "#C4A484", Pecan: "#8A3324",
//   Pistachio: "#93C572", Seafoam: "#9FE2BF", Turquoise: "#40E0D0", Aqua: "#00FFFF",
//   Azure: "#00FFFF", Sky: "#87CEEB", Cerulean: "#007BA7", Cobalt: "#0047AB",
//   Sapphire: "#0F52BA", Ultramarine: "#120A8F", Lapis: "#26619C", Denim: "#1560BD",
//   Steel: "#4682B4", Slate: "#708090", Gunmetal: "#2a3439", Onyx: "#353839",
//   Jet: "#343434", Ebony: "#555D50", Raven: "#050301", Pitch: "#000000",
//   Obsidian: "#0B0B0B", Carbon: "#333333", Graphite: "#383838", Pewter: "#8E8E8E",
//   Zinc: "#8C92AC", Lead: "#778899", Iron: "#A19D94", Titanium: "#878681",
//   Chromium: "#C0C0C0", Nickel: "#727472", Tungsten: "#A0A0A0", Fuchsia: "#FF00FF",
//   Crimson: "#DC143C", Carmine: "#960018", Ruby: "#E0115F", Scarlet: "#FF2400",
//   Vermilion: "#E34234", Brick: "#CB4154", Tomato: "#FF6347", Papaya: "#FFEFD5",
//   Melon: "#FDBCB4", Mango: "#F4A460", Citrus: "#FFA500", Lemon: "#FFF700",
//   Lime: "#BFFF00", Kiwi: "#8EE53F", Apple: "#8DB600", Pear: "#D1E231",
//   Grape: "#6F2DA8", Plum: "#8E4585", Blackberry: "#4D0135", Mulberry: "#C54B8C",
//   Raisin: "#652DC1", Eggplant: "#614051", Aubergine: "#472C4C", Amethyst: "#9966CC",
//   Orchid: "#DA70D6", Heather: "#D473D4", Thistle: "#D8BFD8", Mauve: "#E0B0FF",
//   Wisteria: "#C9A0DC", Periwinkle: "#CCCCFF", Cornflower: "#6495ED", Baby: "#89CFF0",
//   Powder: "#B0E0E6", Midnight: "#191970", Ocean: "#0077BE",
// };

// const extractColorName = (fullName: string) => {
//   if (!fullName) return "Main";
//   const words = fullName.trim().split(" ");
//   const lastWord = words[words.length - 1];
//   return lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
// };

// const extractColorHex = (fullName: string) => {
//   const colorName = extractColorName(fullName);
//   return colorMapHex[colorName] || "#cccccc";
// };

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
//   sku: string;
//   name: string;
//   slug: string;
//   description: string;
//   benefits: string;
//   price: number;
//   discount_price: number;
//   voucher_discount_price?: number;
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   color?: any[];
// }

// export default function ProductDetail() {
//   const { id } = useParams<{ id: string }>();
//   const { slug } = useParams<{ slug: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isFetchingFull, setIsFetchingFull] = useState(false);

//   const [quantityInput, setQuantityInput] = useState<string>("1");
//   const quantity = parseInt(quantityInput) || 1;

//   const [isBuyingNow, setIsBuyingNow] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const [siblingColors, setSiblingColors] = useState<Product[]>([]);
//   const [isFavorited, setIsFavorited] = useState(false);
  
//   const [activeTab, setActiveTab] = useState("desc");

//   // [BARU] State untuk menampung review asli dari database
//   const [apiReviews, setApiReviews] = useState<any[]>([]);

//   const { fetchCart, cartItems, addCartItemOptimistically, revertCartItems } = useCart();

//   const fetchSiblingColorsViaAPI = async (productName: string) => {
//     if (!productName) return;
//     try {
//       const words = productName.trim().split(" ");
//       let rootName = productName;

//       if (words.length > 1) {
//         words.pop();
//         rootName = words.join(" ");
//       }

//       const res = await fetch(`${BASE_URL}/api/products`);
//       const data = await res.json();
//       const allProducts = data.data ? data.data : data;

//       const siblings = allProducts.filter((p: Product) =>
//         p.name.toLowerCase().includes(rootName.toLowerCase()),
//       );

//       if (siblings.length <= 1) {
//         setSiblingColors([]);
//       } else {
//         setSiblingColors(siblings);
//       }
//     } catch (error) {
//       console.error("Gagal menarik data varian warna:", error);
//     }
//   };

//   useEffect(() => {
//     let isCurrentFetchValid = true;

//     const initialPassedData = location.state?.initialProduct;
//     const allPassedProducts = location.state?.allProducts; 

//     if (initialPassedData && String(initialPassedData.id) === id) {
//       setProduct(initialPassedData);
//       setLoading(false);
      
//       if (allPassedProducts && allPassedProducts.length > 0) {
//         const words = initialPassedData.name.trim().split(" ");
//         let rootName = initialPassedData.name;
//         if (words.length > 1) {
//           words.pop(); 
//           rootName = words.join(" ");
//         }

//         const localSiblings = allPassedProducts.filter((p: Product) =>
//           p.name.toLowerCase().includes(rootName.toLowerCase())
//         );

//         if (localSiblings.length > 1) {
//            setSiblingColors(localSiblings);
//         }
//       }
//     } else {
//       setLoading(true);
//       setProduct(null);
//     }

//     setIsFetchingFull(true);
//     setCurrentImageIndex(0);
//     setQuantityInput("1");
//     setActiveTab("desc");

//     const fetchProductAndSiblings = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products/${id}`);
//         if (!res.ok) throw new Error("Produk tidak ditemukan");
//         const responseData = await res.json();

//         // if (isCurrentFetchValid) {
//         //   const productObject = responseData.data ? responseData.data : responseData;
//         //   setProduct(productObject);
          
//         //   if (!allPassedProducts) {
//         //      await fetchSiblingColorsViaAPI(productObject.name);
//         //   }
//         // }

//         if (isCurrentFetchValid) {
//           const productObject = responseData.data ? responseData.data : responseData;
//           setProduct(productObject);
          
//           // [PERBAIKAN] Validasi yang lebih ketat: Cek apakah data benar-benar ada dan panjangnya lebih dari 0
//           if (!allPassedProducts || allPassedProducts.length === 0) {
//              await fetchSiblingColorsViaAPI(productObject.name);
//           }
//         }
//       } catch (error) {
//         if (isCurrentFetchValid) {
//           console.error("Gagal memuat produk:", error);
//           navigate("/products");
//         }
//       }
//     };

//     const checkWishlistStatus = async () => {
//       const token = localStorage.getItem("user_token");
//       if (!token) return;

//       try {
//         const res = await fetch(`${BASE_URL}/api/wishlists`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         });
//         if (res.ok) {
//           const data = await res.json();
//           const isWished = data.some(
//             (item: any) => item.product_id === Number(id),
//           );
          
//           if (isCurrentFetchValid) setIsFavorited(isWished);
//         }
//       } catch (error) {
//         if (isCurrentFetchValid) console.error("Gagal memeriksa wishlist:", error);
//       }
//     };

//     // [BARU] Fungsi mengambil review asli dari database
//     // const fetchReviews = async () => {
//     //   try {
//     //     // Sesuaikan URL endpoint ini jika struktur API Review Anda berbeda. 
//     //     // Biasa: GET /api/reviews?product_id={id} atau GET /api/products/{id}/reviews
//     //     // const res = await fetch(`${BASE_URL}/api/reviews?product_id=${id}`, {
//     //     //     headers: { Accept: "application/json" }
//     //     // });

//     //     const res = await fetch(`${BASE_URL}/api/products/${id}/reviews`, {
//     //         headers: { Accept: "application/json" }
//     //     });
//     //     if (res.ok) {
//     //         const data = await res.json();
//     //         if (isCurrentFetchValid) {
//     //             // Ambil data array review (tergantung bentuk json response laravel Anda)
//     //             const reviewsArr = data.data ? data.data : data; 
//     //             setApiReviews(reviewsArr);
//     //         }
//     //     }
//     //   } catch (error) {
//     //     console.error("Gagal menarik data ulasan asli:", error);
//     //   }
//     // };

//     // [BARU] Fungsi mengambil review asli dari database
//     const fetchReviews = async () => {
//       try {
//         // [PERBAIKAN] Disesuaikan dengan endpoint Route::get('/products/{product}/reviews')
//         const res = await fetch(`${BASE_URL}/api/products/${id}/reviews`, {
//             headers: { Accept: "application/json" }
//         });
        
//         if (res.ok) {
//             const data = await res.json();
//             if (isCurrentFetchValid) {
//                 // [PERBAIKAN] Mengambil dari key 'reviews' sesuai controller Backend Anda
//                 const reviewsArr = data.reviews ? data.reviews : []; 
//                 setApiReviews(reviewsArr);
//             }
//         }
//       } catch (error) {
//         console.error("Gagal menarik data ulasan asli:", error);
//       }
//     };

//     if (id) {
//       Promise.all([fetchProductAndSiblings(), checkWishlistStatus(), fetchReviews()]).finally(
//         () => {
//           if (isCurrentFetchValid) {
//             setLoading(false);
//             setIsFetchingFull(false);
//           }
//         },
//       );
//     }

//     return () => {
//       isCurrentFetchValid = false;
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id, navigate]);

//   const handleToggleWishlist = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk menyimpan produk ke favorit.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#059669",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Ke Halaman Login",
//         cancelButtonText: "Batal",
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ product_id: product?.id }),
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () =>
//     setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () =>
//     setCurrentImageIndex(
//       (prev) => (prev - 1 + gallery.length) % gallery.length,
//     );

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(angka);
//   };

//   const triggerFlyingAnimation = () => {
//     const startEl = document.getElementById("product-image");
//     const endEl = document.getElementById("cart-icon");

//     if (startEl && endEl && gallery.length > 0) {
//       const startRect = startEl.getBoundingClientRect();
//       const endRect = endEl.getBoundingClientRect();

//       const flyingImg = document.createElement("img");
//       flyingImg.src = gallery[currentImageIndex];
//       flyingImg.style.position = "fixed";
//       flyingImg.style.top = `${startRect.top}px`;
//       flyingImg.style.left = `${startRect.left}px`;
//       flyingImg.style.width = `${startRect.width}px`;
//       flyingImg.style.height = `${startRect.height}px`;
//       flyingImg.style.borderRadius = "10%";
//       flyingImg.style.zIndex = "9999";
//       flyingImg.style.transition =
//         "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//       document.body.appendChild(flyingImg);

//       requestAnimationFrame(() => {
//         flyingImg.style.top = `${endRect.top + 10}px`;
//         flyingImg.style.left = `${endRect.left + 10}px`;
//         flyingImg.style.width = "20px";
//         flyingImg.style.height = "20px";
//         flyingImg.style.opacity = "0.2";
//         flyingImg.style.borderRadius = "50%";
//       });

//       setTimeout(() => {
//         flyingImg.remove();
//         endEl.classList.add("scale-125");
//         setTimeout(() => endEl.classList.remove("scale-125"), 200);
//       }, 800);
//     }
//   };

//   const handleAddToCart = () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk mulai berbelanja.",
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: "Ke Halaman Login",
//       }).then(() => navigate("/login"));
//       return;
//     }

//     const previousCartState = [...cartItems];
//     const optimisticItem = {
//       id: Date.now(),
//       product_id: product!.id,
//       quantity: quantity,
//       gross_amount: quantity * product!.price,
//       color: null,
//       product: {
//         id: product!.id,
//         name: product!.name,
//         price: product!.price,
//         discount_price: product!.price,
//         image_url: product!.image_url,
//         sku: product!.sku,
//         stock: product!.stock,
//         color: "",
//       },
//     };

//     addCartItemOptimistically(optimisticItem);
//     triggerFlyingAnimation();
//     Swal.fire({
//       title: "Ditambahkan!",
//       icon: "success",
//       toast: true,
//       position: "top-end",
//       timer: 1500,
//       showConfirmButton: false,
//     });

//     fetch(`${BASE_URL}/api/carts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         product_id: product?.id,
//         quantity: quantity,
//         color: null,
//       }),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (res.ok && data.cart_id) {
//           fetchCart();
//         } else {
//           revertCartItems(previousCartState);
//           Swal.fire(
//             "Pemberitahuan",
//             data.message || "Gagal menambahkan produk ke keranjang.",
//             "warning",
//           );
//         }
//       })
//       .catch(() => {
//         revertCartItems(previousCartState);
//         console.error("Gagal terhubung ke server saat add to cart");
//       });
//   };

//   const handleBuyItNow = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         icon: "info",
//         confirmButtonColor: "#059669",
//       }).then(() => navigate("/login"));
//       return;
//     }

//     setIsBuyingNow(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: null,
//         }),
//       });
//       const data = await res.json();

//       if (res.ok && data.cart_id) {
//         fetchCart();
//         navigate("/checkout", { state: { selectedIds: [data.cart_id] } });
//       } else {
//         Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsBuyingNow(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value;
//     if (val === "" || /^\d+$/.test(val)) {
//       setQuantityInput(val);
//     }
//   };

//   const handleInputBlur = () => {
//     let parsed = parseInt(quantityInput);
//     if (isNaN(parsed) || parsed < 1) parsed = 1;
//     if (product && parsed > product.stock) {
//       parsed = product.stock;
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "warning",
//         title: `Maksimal stok adalah ${product.stock}`,
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     }
//     setQuantityInput(parsed.toString());
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;
//   const isFormDisabled = isOutOfStock || isBuyingNow;

//   const handleShare = async () => {
//     const shareData = {
//       title: product?.name,
//       text: `Cek produk keren ini dari Gycora: ${product?.name}`,
//       url: window.location.href,
//     };

//     if (navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch (err) {
//         console.error("Gagal membagikan:", err);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "success",
//         title: "Link produk disalin!",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };

//   const isEtherealBrush = product.name.toLowerCase().includes("ethereal glow brush");
//   const isScalpCare = product.name.toLowerCase().includes("scalp");

//   // [BARU] Gabungkan ulasan asli dari user dengan ulasan statis/dummy
//   // Kita map ulasan asli agar struktur object-nya sama dengan ulasan dummy.
//   const formattedApiReviews = apiReviews.map((r: any) => ({
//       name: r.user?.first_name ? `${r.user.first_name} ${r.user.last_name || ''}` : "Gycora Customer",
//       text: r.comment,
//       rating: r.rating || 5, // fallback ke 5 jika tidak ada sistem rating
//       is_verified: true
//   }));

//   const brushReviews = [
//     { name: "Claudiasunshinee", text: "Sisir nya bagus banget sih sesuai dgn claim nya 🙌🙌 sblmnya aku pakai brand w** krn rambutku rontok.. trs setelah aku compare sm brand Gycora ternyata jauh lbh ga rontok pakai Gycora ❤👍", rating: 5, is_verified: true },
//     { name: "Nilasetiobudii", text: "Sisirnya enak banget terutama buat rambut yg suka kusut Jd lebih gampang pake sisir dari Gycora..", rating: 5, is_verified: true },
//     { name: "Thaliastanley___", text: "Setelah saya pakai hair brush nya rambutku jadi lebih gak kusut dan bikin lebih pede pastinya..", rating: 5, is_verified: true },
//     { name: "Herlenasutanto", text: "Oke kok enak sisir nya lentur ngikutin kepala. ga nyangkut2 hehe", rating: 5, is_verified: true },
//     { name: "Anitaa_bee", text: "Sukaaa poll sma sisirnya... Rambut jd makin teratur pas disisir dan ga gerundel (kusut frizzy) n rambut ku ya uda ga tllu banyak yg rontok. terus sisirnya tu empuk dan nyaman poll di kepala ga sakit.", rating: 5, is_verified: true },
//   ];

//   const scalpReviews = [
//     { name: "v*****b", text: "Kemasan: Bagus\nEfek: Ketombe keluar semua, semoga bisa bersih pakai ini\nPengalaman Penggunaan: Rasanya rambut halus setelah pakai.", rating: 5, is_verified: true },
//   ];

//   const staticReviews = isEtherealBrush ? brushReviews : isScalpCare ? scalpReviews : [];
  
//   // Array Final yang akan di render: Ulasan User Asli ditaruh di urutan Paling Atas, disusul dummy.
//   const activeReviews = [...formattedApiReviews, ...staticReviews];

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          
//           {/* BAGIAN KIRI: GAMBAR */}
//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div
//               id="product-image"
//               className="relative flex items-center justify-center p-4 overflow-hidden border border-gray-100 group bg-gray-50/50 rounded-3xl aspect-square md:p-8"
//             >
//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-contain object-center w-full h-full p-4 md:p-8 transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
//                     />
//                   ))}
                  
//                   {gallery.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                         </svg>
//                       </button>
                      
//                       <button
//                         onClick={nextImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                         </svg>
//                       </button>
                      
//                       <div className="absolute left-0 right-0 z-30 flex items-center justify-center gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => setCurrentImageIndex(idx)}
//                             className={`h-2 rounded-full transition-all shadow-sm focus:outline-none ${idx === currentImageIndex ? "bg-[#006A4E] w-6" : "bg-gray-300 hover:bg-gray-400 w-2"}`}
//                             aria-label={`Lihat gambar ke-${idx + 1}`}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">
//                   No Image
//                 </div>
//               )}
              
//               <div className="absolute z-30 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
//                   Video Demo
//                 </h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video
//                     src={product.variant_video}
//                     controls
//                     className="object-contain w-full h-64 md:h-80"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* BAGIAN KANAN: DETAIL PRODUK */}
//           <div className="flex flex-col justify-center">
//             <div className="flex items-start justify-between gap-4 mb-2">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
//                 {product.name}
//               </h1>
//               <div className="flex items-center gap-2 shrink-0">
//                 <button
//                   onClick={handleShare}
//                   className="flex items-center justify-center w-12 h-12 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:text-[#006A4E]"
//                   title="Bagikan Produk"
//                 >
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={handleToggleWishlist}
//                   className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                   title="Simpan ke Favorit"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {isEtherealBrush && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 Rambut Lebih Rapi, Halus, dan Mudah Diatur dalam Sekali Sisir ✨
//               </h2>
//             )}
//             {isScalpCare && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 Scalp Massager untuk Kulit Kepala Lebih Bersih, Nyaman, dan Sehat ✨
//               </h2>
//             )}

//             <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
//             <div className="mb-8">
//               {product.discount_price && product.discount_price > 0 ? (
//                 <div className="flex flex-col">
//                   <span className="text-2xl text-gray-400 line-through">
//                     {formatRupiah(product.price)}
//                   </span>
//                   <span className="text-4xl font-extrabold text-red-600">
//                     {formatRupiah(product.discount_price)}
//                   </span>
//                 </div>
//               ) : (
//                 <p className="text-4xl font-extrabold text-[#006A4E]">
//                   {formatRupiah(product.price)}
//                 </p>
//               )}
//             </div>

//             <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">
//               {siblingColors.length > 0 && (
//                 <div className="pb-6 mb-6 border-b border-gray-200">
//                   <h3 className="mb-3 text-sm font-bold text-gray-700">
//                     Pilih Varian Warna:
//                   </h3>
//                   <div className="flex flex-wrap gap-3">
//                     {siblingColors.map((sibling) => {
//                       const isCurrentProduct = sibling.id === product.id;
//                       return (
//                         <button
//                           key={sibling.id}
//                           onClick={() => {
//                             if (!isCurrentProduct) {
//                               window.scrollTo({ top: 0, behavior: "smooth" });
//                               navigate(`/product/${sibling.id}`, {
//                                 state: { 
//                                   initialProduct: sibling,
//                                   allProducts: location.state?.allProducts
//                                 },
//                               });
//                             }
//                           }}
//                           className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${
//                             isCurrentProduct
//                               ? "border-[#006A4E] ring-2 ring-[#006A4E]/30 scale-105 cursor-default"
//                               : "border-gray-200 hover:border-gray-300 hover:scale-105 cursor-pointer bg-white"
//                           }`}
//                           title={`Lihat varian ${extractColorName(sibling.name)}`}
//                         >
//                           <span
//                             className="w-5 h-5 border border-gray-300 rounded-full shadow-inner"
//                             style={{ backgroundColor: extractColorHex(sibling.name) }}
//                           ></span>
//                           <span className={`text-xs font-bold ${isCurrentProduct ? "text-[#006A4E]" : "text-gray-700"}`}>
//                             {extractColorName(sibling.name)}
//                           </span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center justify-between w-full overflow-hidden bg-white border border-gray-300 h-14 rounded-xl">
//                   <button
//                     onClick={() => {
//                       const newVal = Math.max(1, quantity - 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     -
//                   </button>

//                   <input
//                     type="text"
//                     value={quantityInput}
//                     onChange={handleInputChange}
//                     onBlur={handleInputBlur}
//                     disabled={isFormDisabled}
//                     className="w-full h-full font-bold text-center text-gray-900 bg-transparent outline-none appearance-none focus:ring-0"
//                   />

//                   <button
//                     onClick={() => {
//                       const newVal = Math.min(product.stock, quantity + 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-white border-[#006A4E] text-[#006A4E] hover:bg-emerald-50 active:scale-95"
//                     }`}
//                   >
//                     Add to Cart
//                   </button>

//                   <button
//                     onClick={handleBuyItNow}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-[#006A4E] text-white hover:bg-emerald-900 shadow-[0_4px_14px_0_rgba(0,106,78,0.39)] hover:-translate-y-0.5 active:scale-95"
//                     }`}
//                   >
//                     {isBuyingNow ? "Memproses..." : isOutOfStock ? "Stok Habis" : "Buy it Now"}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* ==============================================================
//                 BAGIAN TAB (DESCRIPTION | HOW TO USE | FAQ | REVIEW) 
//             ============================================================== */}
//             <div className="mt-4">
//               <div className="flex flex-wrap gap-2 pb-4 mb-6 border-b border-gray-100">
//                 <button
//                   onClick={() => setActiveTab("desc")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "desc" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   Description
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("how-to-use")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "how-to-use" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   How to Use
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("faq")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "faq" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   FAQ
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("review")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "review" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   Review
//                 </button>
//               </div>

//               <div className="text-gray-600 prose-sm prose whitespace-pre-wrap sm:prose max-w-none min-h-[200px]">
                
//                 {/* KONTEN TAB: DESCRIPTION */}
//                 {activeTab === "desc" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <p>
//                           Kenalin <strong>Ethereal Glow Brush</strong>, hairbrush anti-static dengan teknologi konduktif dan molekul karbon yang dirancang untuk membantu rambut terasa lebih halus, rapi, dan tampak berkilau setiap hari.
//                         </p>
//                         <p>
//                           Dengan desain fleksibel yang mengikuti kontur kepala serta bulu sisir yang lembut di kulit kepala, pengalaman menyisir jadi terasa lebih nyaman tanpa rasa sakit atau tarikan berlebih.
//                         </p>
//                         <p>
//                           Cocok untuk kamu yang ingin rambut tetap terlihat rapi di tengah aktivitas harian — tanpa perlu effort styling yang ribet.
//                         </p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">Kenapa Banyak yang Suka Ethereal Glow Brush?</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Anti-Static Technology:</strong> Membantu mengurangi rambut mengembang, kusut, dan sulit diatur.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Membantu Rambut Tampak Lebih Halus & Berkilau:</strong> Setiap sapuan sisir membantu merapikan rambut sekaligus meningkatkan kilau alami.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Flexible & Soft Bristles:</strong> Lembut di kulit kepala untuk membantu mengurangi rasa sakit dan rambut patah.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Spiral Comb Design:</strong> Desain spiral mengikuti bentuk kepala dengan lebih nyaman.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Eco-Friendly Material:</strong> Terbuat dari material Polylactic Acid Fiber yang ramah lingkungan.</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">Cocok Digunakan Untuk:</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>Rambut mudah kusut & mengembang</li>
//                               <li>Rambut yang susah diatur</li>
//                               <li>Penggunaan sehari-hari</li>
//                               <li>Semua jenis rambut</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">Detail Produk:</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>Material: Carbon Molecule + Polylactic Acid Fiber</li>
//                               <li>Size: 25 x 7 cm</li>
//                               <li>Include: Premium Soft Box</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <p>
//                           Kenalin <strong>Eco Serenity Scalp Care</strong>, scalp massager inovatif dari Gycora yang dirancang untuk membantu membersihkan kulit kepala sekaligus memberikan sensasi pijatan yang menenangkan setiap hari.
//                         </p>
//                         <p>
//                           Dengan desain fleksibel dan 196 teeth dengan ukuran berbeda, Eco Serenity mampu menjangkau area kulit kepala secara lebih menyeluruh untuk membantu mengangkat kotoran, minyak berlebih, dan penumpukan pada kulit kepala tanpa rasa kasar atau iritasi.
//                         </p>
//                         <p>
//                           Bukan cuma nyaman digunakan saat keramas, tapi juga cocok untuk relaksasi di tengah aktivitas yang padat.
//                         </p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">Kenapa Banyak yang Suka Eco Serenity Scalp Care?</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Triple-Fold Structure Design:</strong> Desain fleksibel yang mengikuti bentuk kepala untuk pijatan nyaman maksimal.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>196 Flexible Teeth:</strong> Membantu membersihkan merata dan memberi sensasi relaxing.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Membantu Membersihkan Kulit Kepala Lebih Optimal:</strong> Mengangkat minyak dan penumpukan kotoran.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Relaxing Scalp Massage:</strong> Pijatan lembut bantu melancarkan sirkulasi kulit kepala.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Anti-Microbial Silver Ion:</strong> Teknologi ion perak menjaga kebersihan alat.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Ergonomic & Comfortable Grip:</strong> Nyaman digenggam dalam berbagai posisi.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Multifungsi:</strong> Cocok saat rambut kering (relaksasi) maupun saat keramas (pembersihan ekstra).</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Eco-Friendly Material:</strong> Terbuat dari material yang dapat didaur ulang.</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">Cocok Digunakan Untuk:</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>Kulit kepala mudah berminyak</li>
//                               <li>Kulit kepala dengan penumpukan kotoran</li>
//                               <li>Pengalaman keramas yang lebih nyaman</li>
//                               <li>Relaksasi ringan sehari-hari</li>
//                               <li>Semua jenis rambut</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">Detail Produk:</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>Material: Recyclable Material</li>
//                               <li>Technology: Anti-Microbial Silver Ion</li>
//                               <li>Heat Resistance: Up to 80°C</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : (
//                       isFetchingFull && !product.description ? (
//                         <div className="space-y-2 animate-pulse">
//                           <div className="w-full h-3 bg-gray-200 rounded"></div>
//                           <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
//                           <div className="w-4/6 h-3 bg-gray-200 rounded"></div>
//                         </div>
//                       ) : (
//                         product.description || <p className="italic text-gray-400">Deskripsi belum tersedia.</p>
//                       )
//                     )}
//                   </div>
//                 )}

//                 {/* KONTEN TAB: HOW TO USE */}
//                 {activeTab === "how-to-use" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     <h4 className="font-bold text-gray-900">Cara Penggunaan yang Tepat</h4>
//                     {isEtherealBrush ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>Pastikan rambut dalam keadaan kering atau setengah kering (jangan basah kuyup).</li>
//                         <li>Sisir perlahan dari bagian tengah atau ujung rambut terlebih dahulu untuk mengurai kusut.</li>
//                         <li>Setelah bagian bawah rapi, lanjutkan menyisir dari akar hingga ke ujung rambut.</li>
//                         <li>Gunakan setiap pagi atau kapan pun rambut terasa berantakan/statis.</li>
//                       </ul>
//                     ) : isScalpCare ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li><strong>Saat Keramas:</strong> Aplikasikan sampo secara merata, gunakan Scalp Care dengan gerakan melingkar yang lembut untuk membersihkan kulit kepala.</li>
//                         <li><strong>Saat Rambut Kering:</strong> Gunakan sebagai alat pijat relaksasi di sela-sela aktivitas harian dengan tekanan ringan.</li>
//                         <li>Bilas Scalp Care dengan air bersih setelah penggunaan bersama produk perawatan rambut.</li>
//                       </ul>
//                     ) : (
//                       <p className="italic text-gray-400">Panduan penggunaan belum tersedia untuk produk ini.</p>
//                     )}
//                   </div>
//                 )}

//                 {/* KONTEN TAB: FAQ */}
//                 {activeTab === "faq" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <div>
//                           <h5 className="font-bold text-gray-900">Q: Apakah aman untuk rambut rontok?</h5>
//                           <p className="mt-1">A: Ya, bulu sisirnya didesain lembut dan fleksibel sehingga meminimalisir tarikan yang bisa menyebabkan rambut patah/rontok.</p>
//                         </div>
//                         <div>
//                           <h5 className="font-bold text-gray-900">Q: Bagaimana cara membersihkan sisir ini?</h5>
//                           <p className="mt-1">A: Kamu bisa menggunakan sikat kecil untuk membuang helaian rambut, lalu lap permukaan sisir dengan kain basah/tisu basah. Hindari merendam di dalam air terlalu lama.</p>
//                         </div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <div>
//                           <h5 className="font-bold text-gray-900">Q: Apakah alat ini membuat rambut makin kusut saat keramas?</h5>
//                           <p className="mt-1">A: Tidak, gunakan dengan gerakan memijat ke satu arah atau melingkar kecil. Hindari menggosok maju-mundur secara kasar agar rambut tetap rapi.</p>
//                         </div>
//                         <div>
//                           <h5 className="font-bold text-gray-900">Q: Apakah aman untuk kulit kepala sensitif?</h5>
//                           <p className="mt-1">A: Sangat aman. Silikon yang digunakan cukup fleksibel sehingga memberikan pijatan tanpa melukai kulit kepala.</p>
//                         </div>
//                       </>
//                     ) : (
//                       <p className="italic text-gray-400">Belum ada pertanyaan yang sering diajukan untuk produk ini.</p>
//                     )}
//                   </div>
//                 )}
                
//                 {/* [BARU] KONTEN TAB: REVIEW (GABUNGAN API + STATIS) */}
//                 {activeTab === "review" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {activeReviews.length > 0 ? (
//                       activeReviews.map((review, index) => (
//                         <div key={index} className="pb-4 border-b border-gray-100">
//                           <div className="flex items-center gap-2 mb-2">
//                             {/* Rendering bintang berdasarkan property rating (default 5 jika kosong) */}
//                             <div className="flex text-xs text-amber-400">
//                               {[...Array(review.rating || 5)].map((_, i) => (
//                                  <span key={i}>★</span>
//                               ))}
//                             </div>
//                             <span className="font-bold text-gray-900">{review.name}</span>
//                             {review.is_verified && (
//                               <span className="px-2 py-0.5 ml-2 text-[10px] font-bold text-[#006A4E] bg-emerald-50 rounded-full">
//                                 Verified Buyer
//                               </span>
//                             )}
//                           </div>
//                           <p className="text-gray-600 whitespace-pre-line">"{review.text}"</p>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="italic text-gray-400">Belum ada ulasan untuk produk ini.</p>
//                     )}
                    
//                     {activeReviews.length > 0 && (
//                       <div className="mt-4 text-center">
//                         <button className="text-sm font-bold text-[#006A4E] hover:underline focus:outline-none">
//                           Lihat Semua Ulasan
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";

// const colorMapHex: Record<string, string> = {
//   Black: "#000000", White: "#FFFFFF", Brown: "#8B4513", Beige: "#F5F5DC",
//   Red: "#8B0000", Navy: "#000080", Green: "#008000", Grey: "#808080",
//   Pink: "#FFC0CB", Yellow: "#FFD700", Blue: "#4169E1", Mocca: "#967969",
//   Cream: "#FDF4E3", Sage: "#9DC183", Gold: "#D4AF37", Orange: "#FF9900",
//   Silver: "#C0C0C0", Maroon: "#800000", Olive: "#808000", Taupe: "#483C32",
//   Khaki: "#F0E68C", Mustard: "#FFDB58", Emerald: "#50C878", Coral: "#FF7F50",
//   Mint: "#98FF98", Teal: "#008080", Cyan: "#00FFFF", Indigo: "#4B0082",
//   Violet: "#EE82EE", Purple: "#800080", Magenta: "#FF00FF", Lilac: "#C8A2C8",
//   Lavender: "#E6E6FA", Rose: "#FF007F", Peach: "#FFE5B4", Apricot: "#FBCEB1",
//   Ivory: "#FFFFF0", Tan: "#D2B48C", Charcoal: "#36454F", Ash: "#555555",
//   Platinum: "#E5E4E2", Bronze: "#CD7F32", Copper: "#B87333", Rust: "#B7410E",
//   Ochre: "#CC7722", Sienna: "#882D17", Terracotta: "#E2725B", Amber: "#FFBF00",
//   Caramel: "#FFD59A", Honey: "#FFC30B", Chestnut: "#954535", Walnut: "#5C4033",
//   Mahogany: "#C04000", Chocolate: "#7B3F00", Cocoa: "#D2691E", Coffee: "#6F4E37",
//   Mocha: "#493D26", Espresso: "#4B3621", Cappuccino: "#654321", Latte: "#C5A059",
//   Macchiato: "#8B5A2B", Almond: "#EED9C4", Hazelnut: "#C4A484", Pecan: "#8A3324",
//   Pistachio: "#93C572", Seafoam: "#9FE2BF", Turquoise: "#40E0D0", Aqua: "#00FFFF",
//   Azure: "#00FFFF", Sky: "#87CEEB", Cerulean: "#007BA7", Cobalt: "#0047AB",
//   Sapphire: "#0F52BA", Ultramarine: "#120A8F", Lapis: "#26619C", Denim: "#1560BD",
//   Steel: "#4682B4", Slate: "#708090", Gunmetal: "#2a3439", Onyx: "#353839",
//   Jet: "#343434", Ebony: "#555D50", Raven: "#050301", Pitch: "#000000",
//   Obsidian: "#0B0B0B", Carbon: "#333333", Graphite: "#383838", Pewter: "#8E8E8E",
//   Zinc: "#8C92AC", Lead: "#778899", Iron: "#A19D94", Titanium: "#878681",
//   Chromium: "#C0C0C0", Nickel: "#727472", Tungsten: "#A0A0A0", Fuchsia: "#FF00FF",
//   Crimson: "#DC143C", Carmine: "#960018", Ruby: "#E0115F", Scarlet: "#FF2400",
//   Vermilion: "#E34234", Brick: "#CB4154", Tomato: "#FF6347", Papaya: "#FFEFD5",
//   Melon: "#FDBCB4", Mango: "#F4A460", Citrus: "#FFA500", Lemon: "#FFF700",
//   Lime: "#BFFF00", Kiwi: "#8EE53F", Apple: "#8DB600", Pear: "#D1E231",
//   Grape: "#6F2DA8", Plum: "#8E4585", Blackberry: "#4D0135", Mulberry: "#C54B8C",
//   Raisin: "#652DC1", Eggplant: "#614051", Aubergine: "#472C4C", Amethyst: "#9966CC",
//   Orchid: "#DA70D6", Heather: "#D473D4", Thistle: "#D8BFD8", Mauve: "#E0B0FF",
//   Wisteria: "#C9A0DC", Periwinkle: "#CCCCFF", Cornflower: "#6495ED", Baby: "#89CFF0",
//   Powder: "#B0E0E6", Midnight: "#191970", Ocean: "#0077BE",
// };

// const extractColorName = (fullName: string) => {
//   if (!fullName) return "Main";
//   const words = fullName.trim().split(" ");
//   const lastWord = words[words.length - 1];
//   return lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
// };

// const extractColorHex = (fullName: string) => {
//   const colorName = extractColorName(fullName);
//   return colorMapHex[colorName] || "#cccccc";
// };

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
//   sku: string;
//   name: string;
//   slug: string;
//   description: string;
//   benefits: string;
//   price: number;
//   discount_price: number;
//   voucher_discount_price?: number;
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   color?: any[];
// }

// export default function ProductDetail() {
//   // [PERBAIKAN] Hanya gunakan satu parameter yaitu slug
//   const { slug } = useParams<{ slug: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isFetchingFull, setIsFetchingFull] = useState(false);

//   const [quantityInput, setQuantityInput] = useState<string>("1");
//   const quantity = parseInt(quantityInput) || 1;

//   const [isBuyingNow, setIsBuyingNow] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const [siblingColors, setSiblingColors] = useState<Product[]>([]);
//   const [isFavorited, setIsFavorited] = useState(false);
  
//   const [activeTab, setActiveTab] = useState("desc");

//   const [apiReviews, setApiReviews] = useState<any[]>([]);

//   const { fetchCart, cartItems, addCartItemOptimistically, revertCartItems } = useCart();

//   const fetchSiblingColorsViaAPI = async (productName: string) => {
//     if (!productName) return;
//     try {
//       const words = productName.trim().split(" ");
//       let rootName = productName;

//       if (words.length > 1) {
//         words.pop();
//         rootName = words.join(" ");
//       }

//       const res = await fetch(`${BASE_URL}/api/products`);
//       const data = await res.json();
//       const allProducts = data.data ? data.data : data;

//       const siblings = allProducts.filter((p: Product) =>
//         p.name.toLowerCase().includes(rootName.toLowerCase()),
//       );

//       if (siblings.length <= 1) {
//         setSiblingColors([]);
//       } else {
//         setSiblingColors(siblings);
//       }
//     } catch (error) {
//       console.error("Gagal menarik data varian warna:", error);
//     }
//   };

// //   useEffect(() => {
// //     let isCurrentFetchValid = true;

// //     const initialPassedData = location.state?.initialProduct;
// //     const allPassedProducts = location.state?.allProducts; 

// //     // [PERBAIKAN] Kondisi verifikasi menggunakan SLUG
// //     if (initialPassedData && initialPassedData.slug === slug) {
// //       setProduct(initialPassedData);
// //       setLoading(false);
      
// //       if (allPassedProducts && allPassedProducts.length > 0) {
// //         const words = initialPassedData.name.trim().split(" ");
// //         let rootName = initialPassedData.name;
// //         if (words.length > 1) {
// //           words.pop(); 
// //           rootName = words.join(" ");
// //         }

// //         const localSiblings = allPassedProducts.filter((p: Product) =>
// //           p.name.toLowerCase().includes(rootName.toLowerCase())
// //         );

// //         if (localSiblings.length > 1) {
// //            setSiblingColors(localSiblings);
// //         }
// //       }
// //     } else {
// //       setLoading(true);
// //       setProduct(null);
// //     }

// //     setIsFetchingFull(true);
// //     setCurrentImageIndex(0);
// //     setQuantityInput("1");
// //     setActiveTab("desc");

// //     const fetchProductAndSiblings = async () => {
// //       try {
// //         // [PERBAIKAN] Menembak endpoint menggunakan slug
// //         const res = await fetch(`${BASE_URL}/api/products/${slug}`);
// //         if (!res.ok) throw new Error("Produk tidak ditemukan");
// //         const responseData = await res.json();

// //         if (isCurrentFetchValid) {
// //           const productObject = responseData.data ? responseData.data : responseData;
// //           setProduct(productObject);
          
// //           if (!allPassedProducts || allPassedProducts.length === 0) {
// //              await fetchSiblingColorsViaAPI(productObject.name);
// //           }
// //         }
// //       } catch (error) {
// //         if (isCurrentFetchValid) {
// //           console.error("Gagal memuat produk:", error);
// //           navigate("/products");
// //         }
// //       }
// //     };

// //     const checkWishlistStatus = async () => {
// //       const token = localStorage.getItem("user_token");
// //       if (!token) return;

// //       try {
// //         const res = await fetch(`${BASE_URL}/api/wishlists`, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             Accept: "application/json",
// //           },
// //         });
// //         if (res.ok) {
// //           const data = await res.json();
// //           // Hati-hati, wishlist menggunakan ID produk!
// //           // Periksa apakah product saat ini sudah di-set
// //           if (product && isCurrentFetchValid) {
// //             const isWished = data.some(
// //               (item: any) => item.product_id === product.id,
// //             );
// //             setIsFavorited(isWished);
// //           }
// //         }
// //       } catch (error) {
// //         if (isCurrentFetchValid) console.error("Gagal memeriksa wishlist:", error);
// //       }
// //     };

// //     // [PERBAIKAN] Endpoint Reviews disesuaikan agar menerima parameter $slug
// //     const fetchReviews = async () => {
// //       try {
// //         const res = await fetch(`${BASE_URL}/api/products/${slug}/reviews`, {
// //             headers: { Accept: "application/json" }
// //         });
        
// //         if (res.ok) {
// //             const data = await res.json();
// //             if (isCurrentFetchValid) {
// //                 const reviewsArr = data.reviews ? data.reviews : []; 
// //                 setApiReviews(reviewsArr);
// //             }
// //         }
// //       } catch (error) {
// //         console.error("Gagal menarik data ulasan asli:", error);
// //       }
// //     };

// //     if (slug) {
// //       Promise.all([fetchProductAndSiblings(), checkWishlistStatus(), fetchReviews()]).finally(
// //         () => {
// //           if (isCurrentFetchValid) {
// //             setLoading(false);
// //             setIsFetchingFull(false);
// //           }
// //         },
// //       );
// //     }

// //     return () => {
// //       isCurrentFetchValid = false;
// //     };
// //   }, [slug, navigate, product]); // [PERBAIKAN] Tambahkan 'product' dan 'slug' sebagai dependency

// useEffect(() => {
//     let isCurrentFetchValid = true;

//     const initialPassedData = location.state?.initialProduct;
//     const allPassedProducts = location.state?.allProducts;

//     setIsFetchingFull(true);
//     setCurrentImageIndex(0);
//     setQuantityInput("1");
//     setActiveTab("desc");

//     const loadProductData = async () => {
//       let activeProduct: Product | null = null;

//       // 1. CEK STATE NAVIGASI (Jika datang dari Home / Catalog)
//       if (initialPassedData && initialPassedData.slug === slug) {
//         activeProduct = initialPassedData;
//         if (isCurrentFetchValid) {
//           setProduct(activeProduct);

//           // Render Sibling Colors
//           if (allPassedProducts && allPassedProducts.length > 0) {
//             const words = activeProduct!.name.trim().split(" ");
//             let rootName = activeProduct!.name;
//             if (words.length > 1) {
//               words.pop();
//               rootName = words.join(" ");
//             }

//             const localSiblings = allPassedProducts.filter((p: Product) =>
//               p.name.toLowerCase().includes(rootName.toLowerCase())
//             );

//             if (localSiblings.length > 1) {
//               setSiblingColors(localSiblings);
//             }
//           } else {
//             await fetchSiblingColorsViaAPI(activeProduct!.name);
//           }
//         }
//       } 
//       // 2. FETCH DARI API (Jika buka URL langsung)
//       else {
//         if (isCurrentFetchValid) {
//           setLoading(true);
//           setProduct(null);
//         }
//         try {
//           const res = await fetch(`${BASE_URL}/api/products/${slug}`);
//           if (!res.ok) throw new Error("Produk tidak ditemukan");
//           const responseData = await res.json();

//           if (isCurrentFetchValid) {
//             activeProduct = responseData.data ? responseData.data : responseData;
//             setProduct(activeProduct);
//             await fetchSiblingColorsViaAPI(activeProduct!.name);
//           }
//         } catch (error) {
//           if (isCurrentFetchValid) {
//             console.error("Gagal memuat produk:", error);
//             navigate("/products");
//           }
//           return; // Hentikan eksekusi jika gagal
//         }
//       }

//       // 3. FETCH REVIEWS & WISHLIST (Setelah Produk Berhasil Ditemukan)
//       if (activeProduct && isCurrentFetchValid) {
//         const fetchReviews = async () => {
//           try {
//             const res = await fetch(`${BASE_URL}/api/products/${slug}/reviews`, {
//               headers: { Accept: "application/json" },
//             });

//             if (res.ok) {
//               const data = await res.json();
//               if (isCurrentFetchValid) {
//                 const reviewsArr = data.reviews ? data.reviews : [];
//                 setApiReviews(reviewsArr);
//               }
//             }
//           } catch (error) {
//             console.error("Gagal menarik data ulasan asli:", error);
//           }
//         };

//         const checkWishlistStatus = async () => {
//           const token = localStorage.getItem("user_token");
//           if (!token) return;

//           try {
//             const res = await fetch(`${BASE_URL}/api/wishlists`, {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 Accept: "application/json",
//               },
//             });
//             if (res.ok) {
//               const data = await res.json();
//               if (isCurrentFetchValid) {
//                 const isWished = data.some(
//                   (item: any) => item.product_id === activeProduct!.id
//                 );
//                 setIsFavorited(isWished);
//               }
//             }
//           } catch (error) {
//             if (isCurrentFetchValid) console.error("Gagal memeriksa wishlist:", error);
//           }
//         };

//         // Jalankan fetch tambahan secara paralel agar lebih cepat
//         await Promise.all([fetchReviews(), checkWishlistStatus()]);
//       }

//       // 4. SELESAI LOADING
//       if (isCurrentFetchValid) {
//         setLoading(false);
//         setIsFetchingFull(false);
//       }
//     };

//     loadProductData();

//     return () => {
//       isCurrentFetchValid = false;
//     };
//     // [PERBAIKAN] 'product' DIHAPUS DARI DEPENDENCY ARRAY AGAR TIDAK INFINITE LOOP
//   }, [slug, navigate, location.state]);

//   const handleToggleWishlist = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk menyimpan produk ke favorit.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#059669",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Ke Halaman Login",
//         cancelButtonText: "Batal",
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ product_id: product?.id }), // Tetap menggunakan ID ke API
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () =>
//     setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () =>
//     setCurrentImageIndex(
//       (prev) => (prev - 1 + gallery.length) % gallery.length,
//     );

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(angka);
//   };

//   const triggerFlyingAnimation = () => {
//     const startEl = document.getElementById("product-image");
//     const endEl = document.getElementById("cart-icon");

//     if (startEl && endEl && gallery.length > 0) {
//       const startRect = startEl.getBoundingClientRect();
//       const endRect = endEl.getBoundingClientRect();

//       const flyingImg = document.createElement("img");
//       flyingImg.src = gallery[currentImageIndex];
//       flyingImg.style.position = "fixed";
//       flyingImg.style.top = `${startRect.top}px`;
//       flyingImg.style.left = `${startRect.left}px`;
//       flyingImg.style.width = `${startRect.width}px`;
//       flyingImg.style.height = `${startRect.height}px`;
//       flyingImg.style.borderRadius = "10%";
//       flyingImg.style.zIndex = "9999";
//       flyingImg.style.transition =
//         "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//       document.body.appendChild(flyingImg);

//       requestAnimationFrame(() => {
//         flyingImg.style.top = `${endRect.top + 10}px`;
//         flyingImg.style.left = `${endRect.left + 10}px`;
//         flyingImg.style.width = "20px";
//         flyingImg.style.height = "20px";
//         flyingImg.style.opacity = "0.2";
//         flyingImg.style.borderRadius = "50%";
//       });

//       setTimeout(() => {
//         flyingImg.remove();
//         endEl.classList.add("scale-125");
//         setTimeout(() => endEl.classList.remove("scale-125"), 200);
//       }, 800);
//     }
//   };

//   const handleAddToCart = () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk mulai berbelanja.",
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: "Ke Halaman Login",
//       }).then(() => navigate("/login"));
//       return;
//     }

//     const previousCartState = [...cartItems];
//     const optimisticItem = {
//       id: Date.now(),
//       product_id: product!.id,
//       quantity: quantity,
//       gross_amount: quantity * product!.price,
//       color: null,
//       product: {
//         id: product!.id,
//         name: product!.name,
//         price: product!.price,
//         discount_price: product!.price,
//         image_url: product!.image_url,
//         sku: product!.sku,
//         stock: product!.stock,
//         color: "",
//       },
//     };

//     addCartItemOptimistically(optimisticItem);
//     triggerFlyingAnimation();
//     Swal.fire({
//       title: "Ditambahkan!",
//       icon: "success",
//       toast: true,
//       position: "top-end",
//       timer: 1500,
//       showConfirmButton: false,
//     });

//     fetch(`${BASE_URL}/api/carts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         product_id: product?.id, // Tetap ID yang dikirim ke Backend
//         quantity: quantity,
//         color: null,
//       }),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (res.ok && data.cart_id) {
//           fetchCart();
//         } else {
//           revertCartItems(previousCartState);
//           Swal.fire(
//             "Pemberitahuan",
//             data.message || "Gagal menambahkan produk ke keranjang.",
//             "warning",
//           );
//         }
//       })
//       .catch(() => {
//         revertCartItems(previousCartState);
//         console.error("Gagal terhubung ke server saat add to cart");
//       });
//   };

//   const handleBuyItNow = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         icon: "info",
//         confirmButtonColor: "#059669",
//       }).then(() => navigate("/login"));
//       return;
//     }

//     setIsBuyingNow(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: null,
//         }),
//       });
//       const data = await res.json();

//       if (res.ok && data.cart_id) {
//         fetchCart();
//         navigate("/checkout", { state: { selectedIds: [data.cart_id] } });
//       } else {
//         Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsBuyingNow(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value;
//     if (val === "" || /^\d+$/.test(val)) {
//       setQuantityInput(val);
//     }
//   };

//   const handleInputBlur = () => {
//     let parsed = parseInt(quantityInput);
//     if (isNaN(parsed) || parsed < 1) parsed = 1;
//     if (product && parsed > product.stock) {
//       parsed = product.stock;
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "warning",
//         title: `Maksimal stok adalah ${product.stock}`,
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     }
//     setQuantityInput(parsed.toString());
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;
//   const isFormDisabled = isOutOfStock || isBuyingNow;

//   const handleShare = async () => {
//     const shareData = {
//       title: product?.name,
//       text: `Cek produk keren ini dari Gycora: ${product?.name}`,
//       url: window.location.href,
//     };

//     if (navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch (err) {
//         console.error("Gagal membagikan:", err);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "success",
//         title: "Link produk disalin!",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };

//   const isEtherealBrush = product.name.toLowerCase().includes("ethereal glow brush");
//   const isScalpCare = product.name.toLowerCase().includes("scalp");

//   const formattedApiReviews = apiReviews.map((r: any) => ({
//       name: r.user?.first_name ? `${r.user.first_name} ${r.user.last_name || ''}` : "Gycora Customer",
//       text: r.comment,
//       rating: r.rating || 5, 
//       is_verified: true
//   }));

//   const brushReviews = [
//     { name: "Claudiasunshinee", text: "Sisir nya bagus banget sih sesuai dgn claim nya 🙌🙌 sblmnya aku pakai brand w** krn rambutku rontok.. trs setelah aku compare sm brand Gycora ternyata jauh lbh ga rontok pakai Gycora ❤👍", rating: 5, is_verified: true },
//     { name: "Nilasetiobudii", text: "Sisirnya enak banget terutama buat rambut yg suka kusut Jd lebih gampang pake sisir dari Gycora..", rating: 5, is_verified: true },
//     { name: "Thaliastanley___", text: "Setelah saya pakai hair brush nya rambutku jadi lebih gak kusut dan bikin lebih pede pastinya..", rating: 5, is_verified: true },
//     { name: "Herlenasutanto", text: "Oke kok enak sisir nya lentur ngikutin kepala. ga nyangkut2 hehe", rating: 5, is_verified: true },
//     { name: "Anitaa_bee", text: "Sukaaa poll sma sisirnya... Rambut jd makin teratur pas disisir dan ga gerundel (kusut frizzy) n rambut ku ya uda ga tllu banyak yg rontok. terus sisirnya tu empuk dan nyaman poll di kepala ga sakit.", rating: 5, is_verified: true },
//   ];

//   const scalpReviews = [
//     { name: "v*****b", text: "Kemasan: Bagus\nEfek: Ketombe keluar semua, semoga bisa bersih pakai ini\nPengalaman Penggunaan: Rasanya rambut halus setelah pakai.", rating: 5, is_verified: true },
//   ];

//   const staticReviews = isEtherealBrush ? brushReviews : isScalpCare ? scalpReviews : [];
  
//   const activeReviews = [...formattedApiReviews, ...staticReviews];

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          
//           {/* BAGIAN KIRI: GAMBAR */}
//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div
//               id="product-image"
//               className="relative flex items-center justify-center p-4 overflow-hidden border border-gray-100 group bg-gray-50/50 rounded-3xl aspect-square md:p-8"
//             >
//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-contain object-center w-full h-full p-4 md:p-8 transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
//                     />
//                   ))}
                  
//                   {gallery.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                         </svg>
//                       </button>
                      
//                       <button
//                         onClick={nextImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                         </svg>
//                       </button>
                      
//                       <div className="absolute left-0 right-0 z-30 flex items-center justify-center gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => setCurrentImageIndex(idx)}
//                             className={`h-2 rounded-full transition-all shadow-sm focus:outline-none ${idx === currentImageIndex ? "bg-[#006A4E] w-6" : "bg-gray-300 hover:bg-gray-400 w-2"}`}
//                             aria-label={`Lihat gambar ke-${idx + 1}`}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">
//                   No Image
//                 </div>
//               )}
              
//               <div className="absolute z-30 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
//                   Video Demo
//                 </h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video
//                     src={product.variant_video}
//                     controls
//                     className="object-contain w-full h-64 md:h-80"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* BAGIAN KANAN: DETAIL PRODUK */}
//           <div className="flex flex-col justify-center">
//             <div className="flex items-start justify-between gap-4 mb-2">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
//                 {product.name}
//               </h1>
//               <div className="flex items-center gap-2 shrink-0">
//                 <button
//                   onClick={handleShare}
//                   className="flex items-center justify-center w-12 h-12 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:text-[#006A4E]"
//                   title="Bagikan Produk"
//                 >
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={handleToggleWishlist}
//                   className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                   title="Simpan ke Favorit"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {isEtherealBrush && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 Rambut Lebih Rapi, Halus, dan Mudah Diatur dalam Sekali Sisir ✨
//               </h2>
//             )}
//             {isScalpCare && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 Scalp Massager untuk Kulit Kepala Lebih Bersih, Nyaman, dan Sehat ✨
//               </h2>
//             )}

//             <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
//             <div className="mb-8">
//               {product.discount_price && product.discount_price > 0 ? (
//                 <div className="flex flex-col">
//                   <span className="text-2xl text-gray-400 line-through">
//                     {formatRupiah(product.price)}
//                   </span>
//                   <span className="text-4xl font-extrabold text-red-600">
//                     {formatRupiah(product.discount_price)}
//                   </span>
//                 </div>
//               ) : (
//                 <p className="text-4xl font-extrabold text-[#006A4E]">
//                   {formatRupiah(product.price)}
//                 </p>
//               )}
//             </div>

//             <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">
//               {siblingColors.length > 0 && (
//                 <div className="pb-6 mb-6 border-b border-gray-200">
//                   <h3 className="mb-3 text-sm font-bold text-gray-700">
//                     Pilih Varian Warna:
//                   </h3>
//                   <div className="flex flex-wrap gap-3">
//                     {siblingColors.map((sibling) => {
//                       const isCurrentProduct = sibling.id === product.id;
//                       return (
//                         <button
//                           key={sibling.id}
//                           onClick={() => {
//                             if (!isCurrentProduct) {
//                               window.scrollTo({ top: 0, behavior: "smooth" });
//                               // [PERBAIKAN] Mengarahkan menggunakan slug
//                               navigate(`/product/${sibling.slug}`, {
//                                 state: { 
//                                   initialProduct: sibling,
//                                   allProducts: location.state?.allProducts
//                                 },
//                               });
//                             }
//                           }}
//                           className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${
//                             isCurrentProduct
//                               ? "border-[#006A4E] ring-2 ring-[#006A4E]/30 scale-105 cursor-default"
//                               : "border-gray-200 hover:border-gray-300 hover:scale-105 cursor-pointer bg-white"
//                           }`}
//                           title={`Lihat varian ${extractColorName(sibling.name)}`}
//                         >
//                           <span
//                             className="w-5 h-5 border border-gray-300 rounded-full shadow-inner"
//                             style={{ backgroundColor: extractColorHex(sibling.name) }}
//                           ></span>
//                           <span className={`text-xs font-bold ${isCurrentProduct ? "text-[#006A4E]" : "text-gray-700"}`}>
//                             {extractColorName(sibling.name)}
//                           </span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center justify-between w-full overflow-hidden bg-white border border-gray-300 h-14 rounded-xl">
//                   <button
//                     onClick={() => {
//                       const newVal = Math.max(1, quantity - 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     -
//                   </button>

//                   <input
//                     type="text"
//                     value={quantityInput}
//                     onChange={handleInputChange}
//                     onBlur={handleInputBlur}
//                     disabled={isFormDisabled}
//                     className="w-full h-full font-bold text-center text-gray-900 bg-transparent outline-none appearance-none focus:ring-0"
//                   />

//                   <button
//                     onClick={() => {
//                       const newVal = Math.min(product.stock, quantity + 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-white border-[#006A4E] text-[#006A4E] hover:bg-emerald-50 active:scale-95"
//                     }`}
//                   >
//                     Add to Cart
//                   </button>

//                   <button
//                     onClick={handleBuyItNow}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-[#006A4E] text-white hover:bg-emerald-900 shadow-[0_4px_14px_0_rgba(0,106,78,0.39)] hover:-translate-y-0.5 active:scale-95"
//                     }`}
//                   >
//                     {isBuyingNow ? "Memproses..." : isOutOfStock ? "Stok Habis" : "Buy it Now"}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* ==============================================================
//                 BAGIAN TAB (DESCRIPTION | HOW TO USE | FAQ | REVIEW) 
//             ============================================================== */}
//             <div className="mt-4">
//               <div className="flex flex-wrap gap-2 pb-4 mb-6 border-b border-gray-100">
//                 <button
//                   onClick={() => setActiveTab("desc")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "desc" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   Description
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("how-to-use")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "how-to-use" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   How to Use
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("faq")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "faq" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   FAQ
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("review")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "review" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   Review
//                 </button>
//               </div>

//               <div className="text-gray-600 prose-sm prose whitespace-pre-wrap sm:prose max-w-none min-h-[200px]">
                
//                 {/* KONTEN TAB: DESCRIPTION */}
//                 {activeTab === "desc" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <p>
//                           Kenalin <strong>Ethereal Glow Brush</strong>, hairbrush anti-static dengan teknologi konduktif dan molekul karbon yang dirancang untuk membantu rambut terasa lebih halus, rapi, dan tampak berkilau setiap hari.
//                         </p>
//                         <p>
//                           Dengan desain fleksibel yang mengikuti kontur kepala serta bulu sisir yang lembut di kulit kepala, pengalaman menyisir jadi terasa lebih nyaman tanpa rasa sakit atau tarikan berlebih.
//                         </p>
//                         <p>
//                           Cocok untuk kamu yang ingin rambut tetap terlihat rapi di tengah aktivitas harian — tanpa perlu effort styling yang ribet.
//                         </p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">Kenapa Banyak yang Suka Ethereal Glow Brush?</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Anti-Static Technology:</strong> Membantu mengurangi rambut mengembang, kusut, dan sulit diatur.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Membantu Rambut Tampak Lebih Halus & Berkilau:</strong> Setiap sapuan sisir membantu merapikan rambut sekaligus meningkatkan kilau alami.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Flexible & Soft Bristles:</strong> Lembut di kulit kepala untuk membantu mengurangi rasa sakit dan rambut patah.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Spiral Comb Design:</strong> Desain spiral mengikuti bentuk kepala dengan lebih nyaman.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Eco-Friendly Material:</strong> Terbuat dari material Polylactic Acid Fiber yang ramah lingkungan.</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">Cocok Digunakan Untuk:</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>Rambut mudah kusut & mengembang</li>
//                               <li>Rambut yang susah diatur</li>
//                               <li>Penggunaan sehari-hari</li>
//                               <li>Semua jenis rambut</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">Detail Produk:</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>Material: Carbon Molecule + Polylactic Acid Fiber</li>
//                               <li>Size: 25 x 7 cm</li>
//                               <li>Include: Premium Soft Box</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <p>
//                           Kenalin <strong>Eco Serenity Scalp Care</strong>, scalp massager inovatif dari Gycora yang dirancang untuk membantu membersihkan kulit kepala sekaligus memberikan sensasi pijatan yang menenangkan setiap hari.
//                         </p>
//                         <p>
//                           Dengan desain fleksibel dan 196 teeth dengan ukuran berbeda, Eco Serenity mampu menjangkau area kulit kepala secara lebih menyeluruh untuk membantu mengangkat kotoran, minyak berlebih, dan penumpukan pada kulit kepala tanpa rasa kasar atau iritasi.
//                         </p>
//                         <p>
//                           Bukan cuma nyaman digunakan saat keramas, tapi juga cocok untuk relaksasi di tengah aktivitas yang padat.
//                         </p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">Kenapa Banyak yang Suka Eco Serenity Scalp Care?</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Triple-Fold Structure Design:</strong> Desain fleksibel yang mengikuti bentuk kepala untuk pijatan nyaman maksimal.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>196 Flexible Teeth:</strong> Membantu membersihkan merata dan memberi sensasi relaxing.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Membantu Membersihkan Kulit Kepala Lebih Optimal:</strong> Mengangkat minyak dan penumpukan kotoran.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Relaxing Scalp Massage:</strong> Pijatan lembut bantu melancarkan sirkulasi kulit kepala.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Anti-Microbial Silver Ion:</strong> Teknologi ion perak menjaga kebersihan alat.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Ergonomic & Comfortable Grip:</strong> Nyaman digenggam dalam berbagai posisi.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Multifungsi:</strong> Cocok saat rambut kering (relaksasi) maupun saat keramas (pembersihan ekstra).</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Eco-Friendly Material:</strong> Terbuat dari material yang dapat didaur ulang.</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">Cocok Digunakan Untuk:</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>Kulit kepala mudah berminyak</li>
//                               <li>Kulit kepala dengan penumpukan kotoran</li>
//                               <li>Pengalaman keramas yang lebih nyaman</li>
//                               <li>Relaksasi ringan sehari-hari</li>
//                               <li>Semua jenis rambut</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">Detail Produk:</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>Material: Recyclable Material</li>
//                               <li>Technology: Anti-Microbial Silver Ion</li>
//                               <li>Heat Resistance: Up to 80°C</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : (
//                       isFetchingFull && !product.description ? (
//                         <div className="space-y-2 animate-pulse">
//                           <div className="w-full h-3 bg-gray-200 rounded"></div>
//                           <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
//                           <div className="w-4/6 h-3 bg-gray-200 rounded"></div>
//                         </div>
//                       ) : (
//                         product.description || <p className="italic text-gray-400">Deskripsi belum tersedia.</p>
//                       )
//                     )}
//                   </div>
//                 )}

//                 {/* KONTEN TAB: HOW TO USE */}
//                 {activeTab === "how-to-use" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     <h4 className="font-bold text-gray-900">Cara Penggunaan yang Tepat</h4>
//                     {isEtherealBrush ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>Pastikan rambut dalam keadaan kering atau setengah kering (jangan basah kuyup).</li>
//                         <li>Sisir perlahan dari bagian tengah atau ujung rambut terlebih dahulu untuk mengurai kusut.</li>
//                         <li>Setelah bagian bawah rapi, lanjutkan menyisir dari akar hingga ke ujung rambut.</li>
//                         <li>Gunakan setiap pagi atau kapan pun rambut terasa berantakan/statis.</li>
//                       </ul>
//                     ) : isScalpCare ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li><strong>Saat Keramas:</strong> Aplikasikan sampo secara merata, gunakan Scalp Care dengan gerakan melingkar yang lembut untuk membersihkan kulit kepala.</li>
//                         <li><strong>Saat Rambut Kering:</strong> Gunakan sebagai alat pijat relaksasi di sela-sela aktivitas harian dengan tekanan ringan.</li>
//                         <li>Bilas Scalp Care dengan air bersih setelah penggunaan bersama produk perawatan rambut.</li>
//                       </ul>
//                     ) : (
//                       <p className="italic text-gray-400">Panduan penggunaan belum tersedia untuk produk ini.</p>
//                     )}
//                   </div>
//                 )}

//                 {/* KONTEN TAB: FAQ */}
//                 {activeTab === "faq" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <div>
//                           <h5 className="font-bold text-gray-900">Q: Apakah aman untuk rambut rontok?</h5>
//                           <p className="mt-1">A: Ya, bulu sisirnya didesain lembut dan fleksibel sehingga meminimalisir tarikan yang bisa menyebabkan rambut patah/rontok.</p>
//                         </div>
//                         <div>
//                           <h5 className="font-bold text-gray-900">Q: Bagaimana cara membersihkan sisir ini?</h5>
//                           <p className="mt-1">A: Kamu bisa menggunakan sikat kecil untuk membuang helaian rambut, lalu lap permukaan sisir dengan kain basah/tisu basah. Hindari merendam di dalam air terlalu lama.</p>
//                         </div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <div>
//                           <h5 className="font-bold text-gray-900">Q: Apakah alat ini membuat rambut makin kusut saat keramas?</h5>
//                           <p className="mt-1">A: Tidak, gunakan dengan gerakan memijat ke satu arah atau melingkar kecil. Hindari menggosok maju-mundur secara kasar agar rambut tetap rapi.</p>
//                         </div>
//                         <div>
//                           <h5 className="font-bold text-gray-900">Q: Apakah aman untuk kulit kepala sensitif?</h5>
//                           <p className="mt-1">A: Sangat aman. Silikon yang digunakan cukup fleksibel sehingga memberikan pijatan tanpa melukai kulit kepala.</p>
//                         </div>
//                       </>
//                     ) : (
//                       <p className="italic text-gray-400">Belum ada pertanyaan yang sering diajukan untuk produk ini.</p>
//                     )}
//                   </div>
//                 )}
                
//                 {/* [BARU] KONTEN TAB: REVIEW (GABUNGAN API + STATIS) */}
//                 {activeTab === "review" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {activeReviews.length > 0 ? (
//                       activeReviews.map((review, index) => (
//                         <div key={index} className="pb-4 border-b border-gray-100">
//                           <div className="flex items-center gap-2 mb-2">
//                             {/* Rendering bintang berdasarkan property rating (default 5 jika kosong) */}
//                             <div className="flex text-xs text-amber-400">
//                               {[...Array(review.rating || 5)].map((_, i) => (
//                                  <span key={i}>★</span>
//                               ))}
//                             </div>
//                             <span className="font-bold text-gray-900">{review.name}</span>
//                             {review.is_verified && (
//                               <span className="px-2 py-0.5 ml-2 text-[10px] font-bold text-[#006A4E] bg-emerald-50 rounded-full">
//                                 Verified Buyer
//                               </span>
//                             )}
//                           </div>
//                           <p className="text-gray-600 whitespace-pre-line">"{review.text}"</p>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="italic text-gray-400">Belum ada ulasan untuk produk ini.</p>
//                     )}
                    
//                     {activeReviews.length > 0 && (
//                       <div className="mt-4 text-center">
//                         <button className="text-sm font-bold text-[#006A4E] hover:underline focus:outline-none">
//                           Lihat Semua Ulasan
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";

// const colorMapHex: Record<string, string> = {
//   Black: "#000000", White: "#FFFFFF", Brown: "#8B4513", Beige: "#F5F5DC",
//   Red: "#8B0000", Navy: "#000080", Green: "#008000", Grey: "#808080",
//   Pink: "#FFC0CB", Yellow: "#FFD700", Blue: "#4169E1", Mocca: "#967969",
//   Cream: "#FDF4E3", Sage: "#9DC183", Gold: "#D4AF37", Orange: "#FF9900",
//   Silver: "#C0C0C0", Maroon: "#800000", Olive: "#808000", Taupe: "#483C32",
//   Khaki: "#F0E68C", Mustard: "#FFDB58", Emerald: "#50C878", Coral: "#FF7F50",
//   Mint: "#98FF98", Teal: "#008080", Cyan: "#00FFFF", Indigo: "#4B0082",
//   Violet: "#EE82EE", Purple: "#800080", Magenta: "#FF00FF", Lilac: "#C8A2C8",
//   Lavender: "#E6E6FA", Rose: "#FF007F", Peach: "#FFE5B4", Apricot: "#FBCEB1",
//   Ivory: "#FFFFF0", Tan: "#D2B48C", Charcoal: "#36454F", Ash: "#555555",
//   Platinum: "#E5E4E2", Bronze: "#CD7F32", Copper: "#B87333", Rust: "#B7410E",
//   Ochre: "#CC7722", Sienna: "#882D17", Terracotta: "#E2725B", Amber: "#FFBF00",
//   Caramel: "#FFD59A", Honey: "#FFC30B", Chestnut: "#954535", Walnut: "#5C4033",
//   Mahogany: "#C04000", Chocolate: "#7B3F00", Cocoa: "#D2691E", Coffee: "#6F4E37",
//   Mocha: "#493D26", Espresso: "#4B3621", Cappuccino: "#654321", Latte: "#C5A059",
//   Macchiato: "#8B5A2B", Almond: "#EED9C4", Hazelnut: "#C4A484", Pecan: "#8A3324",
//   Pistachio: "#93C572", Seafoam: "#9FE2BF", Turquoise: "#40E0D0", Aqua: "#00FFFF",
//   Azure: "#00FFFF", Sky: "#87CEEB", Cerulean: "#007BA7", Cobalt: "#0047AB",
//   Sapphire: "#0F52BA", Ultramarine: "#120A8F", Lapis: "#26619C", Denim: "#1560BD",
//   Steel: "#4682B4", Slate: "#708090", Gunmetal: "#2a3439", Onyx: "#353839",
//   Jet: "#343434", Ebony: "#555D50", Raven: "#050301", Pitch: "#000000",
//   Obsidian: "#0B0B0B", Carbon: "#333333", Graphite: "#383838", Pewter: "#8E8E8E",
//   Zinc: "#8C92AC", Lead: "#778899", Iron: "#A19D94", Titanium: "#878681",
//   Chromium: "#C0C0C0", Nickel: "#727472", Tungsten: "#A0A0A0", Fuchsia: "#FF00FF",
//   Crimson: "#DC143C", Carmine: "#960018", Ruby: "#E0115F", Scarlet: "#FF2400",
//   Vermilion: "#E34234", Brick: "#CB4154", Tomato: "#FF6347", Papaya: "#FFEFD5",
//   Melon: "#FDBCB4", Mango: "#F4A460", Citrus: "#FFA500", Lemon: "#FFF700",
//   Lime: "#BFFF00", Kiwi: "#8EE53F", Apple: "#8DB600", Pear: "#D1E231",
//   Grape: "#6F2DA8", Plum: "#8E4585", Blackberry: "#4D0135", Mulberry: "#C54B8C",
//   Raisin: "#652DC1", Eggplant: "#614051", Aubergine: "#472C4C", Amethyst: "#9966CC",
//   Orchid: "#DA70D6", Heather: "#D473D4", Thistle: "#D8BFD8", Mauve: "#E0B0FF",
//   Wisteria: "#C9A0DC", Periwinkle: "#CCCCFF", Cornflower: "#6495ED", Baby: "#89CFF0",
//   Powder: "#B0E0E6", Midnight: "#191970", Ocean: "#0077BE",
// };

// const extractColorName = (fullName: string) => {
//   if (!fullName) return "Main";
//   const words = fullName.trim().split(" ");
//   const lastWord = words[words.length - 1];
//   return lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
// };

// const extractColorHex = (fullName: string) => {
//   const colorName = extractColorName(fullName);
//   return colorMapHex[colorName] || "#cccccc";
// };

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
//   sku: string;
//   name: string;
//   slug: string;
//   description: string;
//   benefits: string;
//   price: number;
//   discount_price: number;
//   voucher_discount_price?: number;
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   color?: any[];
// }

// export default function ProductDetail() {
//   const { slug } = useParams<{ slug: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // [PERBAIKAN] Langsung gunakan state dari location sebagai nilai awal jika ada
//   const initialPassedData = location.state?.initialProduct;
//   const [product, setProduct] = useState<Product | null>(initialPassedData || null);
  
//   // [PERBAIKAN] Jika product sudah ada (dari navigasi), loading diset false agar tampil instan
//   const [loading, setLoading] = useState(!initialPassedData);
//   const [isFetchingFull, setIsFetchingFull] = useState(false);

//   const [quantityInput, setQuantityInput] = useState<string>("1");
//   const quantity = parseInt(quantityInput) || 1;

//   const [isBuyingNow, setIsBuyingNow] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const [siblingColors, setSiblingColors] = useState<Product[]>([]);
//   const [isFavorited, setIsFavorited] = useState(false);
  
//   const [activeTab, setActiveTab] = useState("desc");

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [apiReviews, setApiReviews] = useState<any[]>([]);

//   const { fetchCart, cartItems, addCartItemOptimistically, revertCartItems } = useCart();

//   const fetchSiblingColorsViaAPI = async (productName: string) => {
//     if (!productName) return;
//     try {
//       const words = productName.trim().split(" ");
//       let rootName = productName;

//       if (words.length > 1) {
//         words.pop();
//         rootName = words.join(" ");
//       }

//       const res = await fetch(`${BASE_URL}/api/products`);
//       const data = await res.json();
//       const allProducts = data.data ? data.data : data;

//       const siblings = allProducts.filter((p: Product) =>
//         p.name.toLowerCase().includes(rootName.toLowerCase()),
//       );

//       if (siblings.length <= 1) {
//         setSiblingColors([]);
//       } else {
//         setSiblingColors(siblings);
//       }
//     } catch (error) {
//       console.error("Gagal menarik data varian warna:", error);
//     }
//   };

//   useEffect(() => {
//     let isCurrentFetchValid = true;
//     const allPassedProducts = location.state?.allProducts;

//     setCurrentImageIndex(0);
//     setQuantityInput("1");
//     setActiveTab("desc");

//     // Jika masuk ke halaman secara langsung tanpa state (misal: refresh page)
//     if (!initialPassedData) {
//       setLoading(true);
//       setIsFetchingFull(true);
//     }

//     const loadProductData = async () => {
//       let activeProduct: Product | null = initialPassedData || null;

//       // 1. Tampilkan varian warna secepat mungkin jika data didapat dari state navigasi
//       if (activeProduct) {
//         if (allPassedProducts && allPassedProducts.length > 0) {
//           const words = activeProduct.name.trim().split(" ");
//           let rootName = activeProduct.name;
//           if (words.length > 1) {
//             words.pop();
//             rootName = words.join(" ");
//           }
//           const localSiblings = allPassedProducts.filter((p: Product) =>
//             p.name.toLowerCase().includes(rootName.toLowerCase())
//           );
//           if (localSiblings.length > 1 && isCurrentFetchValid) {
//             setSiblingColors(localSiblings);
//           }
//         } else {
//           await fetchSiblingColorsViaAPI(activeProduct.name);
//         }
//       }

//       // 2. FETCH DARI API Latar Belakang (Untuk memastikan stok/harga terbaru)
//       try {
//         const res = await fetch(`${BASE_URL}/api/products/${slug}`);
//         if (!res.ok) throw new Error("Produk tidak ditemukan");
//         const responseData = await res.json();

//         if (isCurrentFetchValid) {
//           const freshProduct = responseData.data ? responseData.data : responseData;
//           setProduct(freshProduct);
//           activeProduct = freshProduct; // Update activeProduct untuk proses selanjutnya
          
//           if (!allPassedProducts || allPassedProducts.length === 0) {
//             await fetchSiblingColorsViaAPI(freshProduct.name);
//           }
//         }
//       } catch (error) {
//         if (isCurrentFetchValid && !initialPassedData) {
//           console.error("Gagal memuat produk:", error);
//           navigate("/products");
//         }
//       }

//       // 3. FETCH REVIEWS & WISHLIST di latar belakang
//       if (activeProduct && isCurrentFetchValid) {
//         const fetchReviews = async () => {
//           try {
//             const res = await fetch(`${BASE_URL}/api/products/${slug}/reviews`, {
//               headers: { Accept: "application/json" },
//             });

//             if (res.ok) {
//               const data = await res.json();
//               if (isCurrentFetchValid) {
//                 const reviewsArr = data.reviews ? data.reviews : [];
//                 setApiReviews(reviewsArr);
//               }
//             }
//           } catch (error) {
//             console.error("Gagal menarik data ulasan:", error);
//           }
//         };

//         const checkWishlistStatus = async () => {
//           const token = localStorage.getItem("user_token");
//           if (!token) return;

//           try {
//             const res = await fetch(`${BASE_URL}/api/wishlists`, {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 Accept: "application/json",
//               },
//             });
//             if (res.ok) {
//               const data = await res.json();
//               if (isCurrentFetchValid) {
//                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
//                 const isWished = data.some((item: any) => item.product_id === activeProduct!.id);
//                 setIsFavorited(isWished);
//               }
//             }
//           } catch (error) {
//              console.error("Gagal memeriksa wishlist:", error);
//           }
//         };

//         await Promise.all([fetchReviews(), checkWishlistStatus()]);
//       }

//       // Selesai memuat keseluruhan di latar belakang
//       if (isCurrentFetchValid) {
//         setLoading(false);
//         setIsFetchingFull(false);
//       }
//     };

//     loadProductData();

//     return () => {
//       isCurrentFetchValid = false;
//     };
//   }, [slug, navigate, initialPassedData]); 

//   const handleToggleWishlist = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk menyimpan produk ke favorit.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#059669",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Ke Halaman Login",
//         cancelButtonText: "Batal",
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ product_id: product?.id }), 
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () =>
//     setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () =>
//     setCurrentImageIndex(
//       (prev) => (prev - 1 + gallery.length) % gallery.length,
//     );

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(angka);
//   };

//   const triggerFlyingAnimation = () => {
//     const startEl = document.getElementById("product-image");
//     const endEl = document.getElementById("cart-icon");

//     if (startEl && endEl && gallery.length > 0) {
//       const startRect = startEl.getBoundingClientRect();
//       const endRect = endEl.getBoundingClientRect();

//       const flyingImg = document.createElement("img");
//       flyingImg.src = gallery[currentImageIndex];
//       flyingImg.style.position = "fixed";
//       flyingImg.style.top = `${startRect.top}px`;
//       flyingImg.style.left = `${startRect.left}px`;
//       flyingImg.style.width = `${startRect.width}px`;
//       flyingImg.style.height = `${startRect.height}px`;
//       flyingImg.style.borderRadius = "10%";
//       flyingImg.style.zIndex = "9999";
//       flyingImg.style.transition =
//         "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//       document.body.appendChild(flyingImg);

//       requestAnimationFrame(() => {
//         flyingImg.style.top = `${endRect.top + 10}px`;
//         flyingImg.style.left = `${endRect.left + 10}px`;
//         flyingImg.style.width = "20px";
//         flyingImg.style.height = "20px";
//         flyingImg.style.opacity = "0.2";
//         flyingImg.style.borderRadius = "50%";
//       });

//       setTimeout(() => {
//         flyingImg.remove();
//         endEl.classList.add("scale-125");
//         setTimeout(() => endEl.classList.remove("scale-125"), 200);
//       }, 800);
//     }
//   };

//   const handleAddToCart = () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk mulai berbelanja.",
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: "Ke Halaman Login",
//       }).then(() => navigate("/login"));
//       return;
//     }

//     const previousCartState = [...cartItems];
//     const optimisticItem = {
//       id: Date.now(),
//       product_id: product!.id,
//       quantity: quantity,
//       gross_amount: quantity * product!.price,
//       color: null,
//       product: {
//         id: product!.id,
//         name: product!.name,
//         price: product!.price,
//         discount_price: product!.price,
//         image_url: product!.image_url,
//         sku: product!.sku,
//         stock: product!.stock,
//         color: "",
//       },
//     };

//     addCartItemOptimistically(optimisticItem);
//     triggerFlyingAnimation();
//     Swal.fire({
//       title: "Ditambahkan!",
//       icon: "success",
//       toast: true,
//       position: "top-end",
//       timer: 1500,
//       showConfirmButton: false,
//     });

//     fetch(`${BASE_URL}/api/carts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         product_id: product?.id, 
//         quantity: quantity,
//         color: null,
//       }),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (res.ok && data.cart_id) {
//           fetchCart();
//         } else {
//           revertCartItems(previousCartState);
//           Swal.fire(
//             "Pemberitahuan",
//             data.message || "Gagal menambahkan produk ke keranjang.",
//             "warning",
//           );
//         }
//       })
//       .catch(() => {
//         revertCartItems(previousCartState);
//         console.error("Gagal terhubung ke server saat add to cart");
//       });
//   };

//   const handleBuyItNow = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         icon: "info",
//         confirmButtonColor: "#059669",
//       }).then(() => navigate("/login"));
//       return;
//     }

//     setIsBuyingNow(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: null,
//         }),
//       });
//       const data = await res.json();

//       if (res.ok && data.cart_id) {
//         fetchCart();
//         navigate("/checkout", { state: { selectedIds: [data.cart_id] } });
//       } else {
//         Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsBuyingNow(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value;
//     if (val === "" || /^\d+$/.test(val)) {
//       setQuantityInput(val);
//     }
//   };

//   const handleInputBlur = () => {
//     let parsed = parseInt(quantityInput);
//     if (isNaN(parsed) || parsed < 1) parsed = 1;
//     if (product && parsed > product.stock) {
//       parsed = product.stock;
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "warning",
//         title: `Maksimal stok adalah ${product.stock}`,
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     }
//     setQuantityInput(parsed.toString());
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;
//   const isFormDisabled = isOutOfStock || isBuyingNow;

//   const handleShare = async () => {
//     const shareData = {
//       title: product?.name,
//       text: `Cek produk keren ini dari Gycora: ${product?.name}`,
//       url: window.location.href,
//     };

//     if (navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch (err) {
//         console.error("Gagal membagikan:", err);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "success",
//         title: "Link produk disalin!",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };

//   const isEtherealBrush = product.name.toLowerCase().includes("ethereal glow brush");
//   const isScalpCare = product.name.toLowerCase().includes("scalp");

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const formattedApiReviews = apiReviews.map((r: any) => ({
//       name: r.user?.first_name ? `${r.user.first_name} ${r.user.last_name || ''}` : "Gycora Customer",
//       text: r.comment,
//       rating: r.rating || 5, 
//       is_verified: true
//   }));

//   const brushReviews = [
//     { name: "Claudiasunshinee", text: "Sisir nya bagus banget sih sesuai dgn claim nya 🙌🙌 sblmnya aku pakai brand w** krn rambutku rontok.. trs setelah aku compare sm brand Gycora ternyata jauh lbh ga rontok pakai Gycora ❤👍", rating: 5, is_verified: true },
//     { name: "Nilasetiobudii", text: "Sisirnya enak banget terutama buat rambut yg suka kusut Jd lebih gampang pake sisir dari Gycora..", rating: 5, is_verified: true },
//     { name: "Thaliastanley___", text: "Setelah saya pakai hair brush nya rambutku jadi lebih gak kusut dan bikin lebih pede pastinya..", rating: 5, is_verified: true },
//     { name: "Herlenasutanto", text: "Oke kok enak sisir nya lentur ngikutin kepala. ga nyangkut2 hehe", rating: 5, is_verified: true },
//     { name: "Anitaa_bee", text: "Sukaaa poll sma sisirnya... Rambut jd makin teratur pas disisir dan ga gerundel (kusut frizzy) n rambut ku ya uda ga tllu banyak yg rontok. terus sisirnya tu empuk dan nyaman poll di kepala ga sakit.", rating: 5, is_verified: true },
//   ];

//   const scalpReviews = [
//     { name: "v*****b", text: "Kemasan: Bagus\nEfek: Ketombe keluar semua, semoga bisa bersih pakai ini\nPengalaman Penggunaan: Rasanya rambut halus setelah pakai.", rating: 5, is_verified: true },
//   ];

//   const staticReviews = isEtherealBrush ? brushReviews : isScalpCare ? scalpReviews : [];
  
//   const activeReviews = [...formattedApiReviews, ...staticReviews];

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white animate-fade-in">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          
//           {/* BAGIAN KIRI: GAMBAR */}
//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div
//               id="product-image"
//               className="relative flex items-center justify-center p-4 overflow-hidden border border-gray-100 group bg-gray-50/50 rounded-3xl aspect-square md:p-8"
//             >
//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-contain object-center w-full h-full p-4 md:p-8 transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
//                     />
//                   ))}
                  
//                   {gallery.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                         </svg>
//                       </button>
                      
//                       <button
//                         onClick={nextImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                         </svg>
//                       </button>
                      
//                       <div className="absolute left-0 right-0 z-30 flex items-center justify-center gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => setCurrentImageIndex(idx)}
//                             className={`h-2 rounded-full transition-all shadow-sm focus:outline-none ${idx === currentImageIndex ? "bg-[#006A4E] w-6" : "bg-gray-300 hover:bg-gray-400 w-2"}`}
//                             aria-label={`Lihat gambar ke-${idx + 1}`}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">
//                   No Image
//                 </div>
//               )}
              
//               <div className="absolute z-30 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
//                   Video Demo
//                 </h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video
//                     src={product.variant_video}
//                     controls
//                     className="object-contain w-full h-64 md:h-80"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* BAGIAN KANAN: DETAIL PRODUK */}
//           <div className="flex flex-col justify-center">
//             <div className="flex items-start justify-between gap-4 mb-2">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
//                 {product.name}
//               </h1>
//               <div className="flex items-center gap-2 shrink-0">
//                 <button
//                   onClick={handleShare}
//                   className="flex items-center justify-center w-12 h-12 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:text-[#006A4E]"
//                   title="Bagikan Produk"
//                 >
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={handleToggleWishlist}
//                   className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                   title="Simpan ke Favorit"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {isEtherealBrush && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 Rambut Lebih Rapi, Halus, dan Mudah Diatur dalam Sekali Sisir ✨
//               </h2>
//             )}
//             {isScalpCare && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 Scalp Massager untuk Kulit Kepala Lebih Bersih, Nyaman, dan Sehat ✨
//               </h2>
//             )}

//             <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
//             <div className="mb-8">
//               {product.discount_price && product.discount_price > 0 ? (
//                 <div className="flex flex-col">
//                   <span className="text-2xl text-gray-400 line-through">
//                     {formatRupiah(product.price)}
//                   </span>
//                   <span className="text-4xl font-extrabold text-red-600">
//                     {formatRupiah(product.discount_price)}
//                   </span>
//                 </div>
//               ) : (
//                 <p className="text-4xl font-extrabold text-[#006A4E]">
//                   {formatRupiah(product.price)}
//                 </p>
//               )}
//             </div>

//             <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">
//               {siblingColors.length > 0 && (
//                 <div className="pb-6 mb-6 border-b border-gray-200">
//                   <h3 className="mb-3 text-sm font-bold text-gray-700">
//                     Pilih Varian Warna:
//                   </h3>
//                   <div className="flex flex-wrap gap-3">
//                     {siblingColors.map((sibling) => {
//                       const isCurrentProduct = sibling.id === product.id;
//                       return (
//                         <button
//                           key={sibling.id}
//                           onClick={() => {
//                             if (!isCurrentProduct) {
//                               window.scrollTo({ top: 0, behavior: "smooth" });
//                               navigate(`/product/${sibling.slug}`, {
//                                 state: { 
//                                   initialProduct: sibling,
//                                   allProducts: location.state?.allProducts
//                                 },
//                               });
//                             }
//                           }}
//                           className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${
//                             isCurrentProduct
//                               ? "border-[#006A4E] ring-2 ring-[#006A4E]/30 scale-105 cursor-default"
//                               : "border-gray-200 hover:border-gray-300 hover:scale-105 cursor-pointer bg-white"
//                           }`}
//                           title={`Lihat varian ${extractColorName(sibling.name)}`}
//                         >
//                           <span
//                             className="w-5 h-5 border border-gray-300 rounded-full shadow-inner"
//                             style={{ backgroundColor: extractColorHex(sibling.name) }}
//                           ></span>
//                           <span className={`text-xs font-bold ${isCurrentProduct ? "text-[#006A4E]" : "text-gray-700"}`}>
//                             {extractColorName(sibling.name)}
//                           </span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center justify-between w-full overflow-hidden bg-white border border-gray-300 h-14 rounded-xl">
//                   <button
//                     onClick={() => {
//                       const newVal = Math.max(1, quantity - 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     -
//                   </button>

//                   <input
//                     type="text"
//                     value={quantityInput}
//                     onChange={handleInputChange}
//                     onBlur={handleInputBlur}
//                     disabled={isFormDisabled}
//                     className="w-full h-full font-bold text-center text-gray-900 bg-transparent outline-none appearance-none focus:ring-0"
//                   />

//                   <button
//                     onClick={() => {
//                       const newVal = Math.min(product.stock, quantity + 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-white border-[#006A4E] text-[#006A4E] hover:bg-emerald-50 active:scale-95"
//                     }`}
//                   >
//                     Add to Cart
//                   </button>

//                   <button
//                     onClick={handleBuyItNow}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-[#006A4E] text-white hover:bg-emerald-900 shadow-[0_4px_14px_0_rgba(0,106,78,0.39)] hover:-translate-y-0.5 active:scale-95"
//                     }`}
//                   >
//                     {isBuyingNow ? "Memproses..." : isOutOfStock ? "Stok Habis" : "Buy it Now"}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* ==============================================================
//                 BAGIAN TAB (DESCRIPTION | HOW TO USE | FAQ | REVIEW) 
//             ============================================================== */}
//             <div className="mt-4">
//               <div className="flex flex-wrap gap-2 pb-4 mb-6 border-b border-gray-100">
//                 <button
//                   onClick={() => setActiveTab("desc")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "desc" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   Description
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("how-to-use")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "how-to-use" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   How to Use
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("faq")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "faq" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   FAQ
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("review")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "review" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   Review
//                 </button>
//               </div>

//               <div className="text-gray-600 prose-sm prose whitespace-pre-wrap sm:prose max-w-none min-h-[200px]">
                
//                 {/* KONTEN TAB: DESCRIPTION */}
//                 {activeTab === "desc" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <p>
//                           Kenalin <strong>Ethereal Glow Brush</strong>, hairbrush anti-static dengan teknologi konduktif dan molekul karbon yang dirancang untuk membantu rambut terasa lebih halus, rapi, dan tampak berkilau setiap hari.
//                         </p>
//                         <p>
//                           Dengan desain fleksibel yang mengikuti kontur kepala serta bulu sisir yang lembut di kulit kepala, pengalaman menyisir jadi terasa lebih nyaman tanpa rasa sakit atau tarikan berlebih.
//                         </p>
//                         <p>
//                           Cocok untuk kamu yang ingin rambut tetap terlihat rapi di tengah aktivitas harian — tanpa perlu effort styling yang ribet.
//                         </p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">Kenapa Banyak yang Suka Ethereal Glow Brush?</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Anti-Static Technology:</strong> Membantu mengurangi rambut mengembang, kusut, dan sulit diatur.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Membantu Rambut Tampak Lebih Halus & Berkilau:</strong> Setiap sapuan sisir membantu merapikan rambut sekaligus meningkatkan kilau alami.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Flexible & Soft Bristles:</strong> Lembut di kulit kepala untuk membantu mengurangi rasa sakit dan rambut patah.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Spiral Comb Design:</strong> Desain spiral mengikuti bentuk kepala dengan lebih nyaman.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Eco-Friendly Material:</strong> Terbuat dari material Polylactic Acid Fiber yang ramah lingkungan.</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">Cocok Digunakan Untuk:</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>Rambut mudah kusut & mengembang</li>
//                               <li>Rambut yang susah diatur</li>
//                               <li>Penggunaan sehari-hari</li>
//                               <li>Semua jenis rambut</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">Detail Produk:</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>Material: Carbon Molecule + Polylactic Acid Fiber</li>
//                               <li>Size: 25 x 7 cm</li>
//                               <li>Include: Premium Soft Box</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <p>
//                           Kenalin <strong>Eco Serenity Scalp Care</strong>, scalp massager inovatif dari Gycora yang dirancang untuk membantu membersihkan kulit kepala sekaligus memberikan sensasi pijatan yang menenangkan setiap hari.
//                         </p>
//                         <p>
//                           Dengan desain fleksibel dan 196 teeth dengan ukuran berbeda, Eco Serenity mampu menjangkau area kulit kepala secara lebih menyeluruh untuk membantu mengangkat kotoran, minyak berlebih, dan penumpukan pada kulit kepala tanpa rasa kasar atau iritasi.
//                         </p>
//                         <p>
//                           Bukan cuma nyaman digunakan saat keramas, tapi juga cocok untuk relaksasi di tengah aktivitas yang padat.
//                         </p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">Kenapa Banyak yang Suka Eco Serenity Scalp Care?</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Triple-Fold Structure Design:</strong> Desain fleksibel yang mengikuti bentuk kepala untuk pijatan nyaman maksimal.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>196 Flexible Teeth:</strong> Membantu membersihkan merata dan memberi sensasi relaxing.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Membantu Membersihkan Kulit Kepala Lebih Optimal:</strong> Mengangkat minyak dan penumpukan kotoran.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Relaxing Scalp Massage:</strong> Pijatan lembut bantu melancarkan sirkulasi kulit kepala.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Anti-Microbial Silver Ion:</strong> Teknologi ion perak menjaga kebersihan alat.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Ergonomic & Comfortable Grip:</strong> Nyaman digenggam dalam berbagai posisi.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Multifungsi:</strong> Cocok saat rambut kering (relaksasi) maupun saat keramas (pembersihan ekstra).</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Eco-Friendly Material:</strong> Terbuat dari material yang dapat didaur ulang.</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">Cocok Digunakan Untuk:</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>Kulit kepala mudah berminyak</li>
//                               <li>Kulit kepala dengan penumpukan kotoran</li>
//                               <li>Pengalaman keramas yang lebih nyaman</li>
//                               <li>Relaksasi ringan sehari-hari</li>
//                               <li>Semua jenis rambut</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">Detail Produk:</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>Material: Recyclable Material</li>
//                               <li>Technology: Anti-Microbial Silver Ion</li>
//                               <li>Heat Resistance: Up to 80°C</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : (
//                       isFetchingFull && !product.description ? (
//                         <div className="space-y-2 animate-pulse">
//                           <div className="w-full h-3 bg-gray-200 rounded"></div>
//                           <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
//                           <div className="w-4/6 h-3 bg-gray-200 rounded"></div>
//                         </div>
//                       ) : (
//                         product.description || <p className="italic text-gray-400">Deskripsi belum tersedia.</p>
//                       )
//                     )}
//                   </div>
//                 )}

//                 {/* KONTEN TAB: HOW TO USE */}
//                 {activeTab === "how-to-use" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     <h4 className="font-bold text-gray-900">Cara Penggunaan yang Tepat</h4>
//                     {isEtherealBrush ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>Pastikan rambut dalam keadaan kering atau setengah kering (jangan basah kuyup).</li>
//                         <li>Sisir perlahan dari bagian tengah atau ujung rambut terlebih dahulu untuk mengurai kusut.</li>
//                         <li>Setelah bagian bawah rapi, lanjutkan menyisir dari akar hingga ke ujung rambut.</li>
//                         <li>Gunakan setiap pagi atau kapan pun rambut terasa berantakan/statis.</li>
//                       </ul>
//                     ) : isScalpCare ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li><strong>Saat Keramas:</strong> Aplikasikan sampo secara merata, gunakan Scalp Care dengan gerakan melingkar yang lembut untuk membersihkan kulit kepala.</li>
//                         <li><strong>Saat Rambut Kering:</strong> Gunakan sebagai alat pijat relaksasi di sela-sela aktivitas harian dengan tekanan ringan.</li>
//                         <li>Bilas Scalp Care dengan air bersih setelah penggunaan bersama produk perawatan rambut.</li>
//                       </ul>
//                     ) : (
//                       <p className="italic text-gray-400">Panduan penggunaan belum tersedia untuk produk ini.</p>
//                     )}
//                   </div>
//                 )}

//                 {/* KONTEN TAB: FAQ */}
//                 {activeTab === "faq" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <div>
//                           <h5 className="font-bold text-gray-900">Q: Apakah aman untuk rambut rontok?</h5>
//                           <p className="mt-1">A: Ya, bulu sisirnya didesain lembut dan fleksibel sehingga meminimalisir tarikan yang bisa menyebabkan rambut patah/rontok.</p>
//                         </div>
//                         <div>
//                           <h5 className="font-bold text-gray-900">Q: Bagaimana cara membersihkan sisir ini?</h5>
//                           <p className="mt-1">A: Kamu bisa menggunakan sikat kecil untuk membuang helaian rambut, lalu lap permukaan sisir dengan kain basah/tisu basah. Hindari merendam di dalam air terlalu lama.</p>
//                         </div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <div>
//                           <h5 className="font-bold text-gray-900">Q: Apakah alat ini membuat rambut makin kusut saat keramas?</h5>
//                           <p className="mt-1">A: Tidak, gunakan dengan gerakan memijat ke satu arah atau melingkar kecil. Hindari menggosok maju-mundur secara kasar agar rambut tetap rapi.</p>
//                         </div>
//                         <div>
//                           <h5 className="font-bold text-gray-900">Q: Apakah aman untuk kulit kepala sensitif?</h5>
//                           <p className="mt-1">A: Sangat aman. Silikon yang digunakan cukup fleksibel sehingga memberikan pijatan tanpa melukai kulit kepala.</p>
//                         </div>
//                       </>
//                     ) : (
//                       <p className="italic text-gray-400">Belum ada pertanyaan yang sering diajukan untuk produk ini.</p>
//                     )}
//                   </div>
//                 )}
                
//                 {/* [BARU] KONTEN TAB: REVIEW (GABUNGAN API + STATIS) */}
//                 {activeTab === "review" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {activeReviews.length > 0 ? (
//                       activeReviews.map((review, index) => (
//                         <div key={index} className="pb-4 border-b border-gray-100">
//                           <div className="flex items-center gap-2 mb-2">
//                             {/* Rendering bintang berdasarkan property rating (default 5 jika kosong) */}
//                             <div className="flex text-xs text-amber-400">
//                               {[...Array(review.rating || 5)].map((_, i) => (
//                                  <span key={i}>★</span>
//                               ))}
//                             </div>
//                             <span className="font-bold text-gray-900">{review.name}</span>
//                             {review.is_verified && (
//                               <span className="px-2 py-0.5 ml-2 text-[10px] font-bold text-[#006A4E] bg-emerald-50 rounded-full">
//                                 Verified Buyer
//                               </span>
//                             )}
//                           </div>
//                           <p className="text-gray-600 whitespace-pre-line">"{review.text}"</p>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="italic text-gray-400">Belum ada ulasan untuk produk ini.</p>
//                     )}
                    
//                     {activeReviews.length > 0 && (
//                       <div className="mt-4 text-center">
//                         <button className="text-sm font-bold text-[#006A4E] hover:underline focus:outline-none">
//                           Lihat Semua Ulasan
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";
// import { useLanguage } from "../../../context/LanguageContext"; // [BARU] Import Language Context

// const colorMapHex: Record<string, string> = {
//   Black: "#000000", White: "#FFFFFF", Brown: "#8B4513", Beige: "#F5F5DC",
//   Red: "#8B0000", Navy: "#000080", Green: "#008000", Grey: "#808080",
//   Pink: "#FFC0CB", Yellow: "#FFD700", Blue: "#4169E1", Mocca: "#967969",
//   Cream: "#FDF4E3", Sage: "#9DC183", Gold: "#D4AF37", Orange: "#FF9900",
//   Silver: "#C0C0C0", Maroon: "#800000", Olive: "#808000", Taupe: "#483C32",
//   Khaki: "#F0E68C", Mustard: "#FFDB58", Emerald: "#50C878", Coral: "#FF7F50",
//   Mint: "#98FF98", Teal: "#008080", Cyan: "#00FFFF", Indigo: "#4B0082",
//   Violet: "#EE82EE", Purple: "#800080", Magenta: "#FF00FF", Lilac: "#C8A2C8",
//   Lavender: "#E6E6FA", Rose: "#FF007F", Peach: "#FFE5B4", Apricot: "#FBCEB1",
//   Ivory: "#FFFFF0", Tan: "#D2B48C", Charcoal: "#36454F", Ash: "#555555",
//   Platinum: "#E5E4E2", Bronze: "#CD7F32", Copper: "#B87333", Rust: "#B7410E",
//   Ochre: "#CC7722", Sienna: "#882D17", Terracotta: "#E2725B", Amber: "#FFBF00",
//   Caramel: "#FFD59A", Honey: "#FFC30B", Chestnut: "#954535", Walnut: "#5C4033",
//   Mahogany: "#C04000", Chocolate: "#7B3F00", Cocoa: "#D2691E", Coffee: "#6F4E37",
//   Mocha: "#493D26", Espresso: "#4B3621", Cappuccino: "#654321", Latte: "#C5A059",
//   Macchiato: "#8B5A2B", Almond: "#EED9C4", Hazelnut: "#C4A484", Pecan: "#8A3324",
//   Pistachio: "#93C572", Seafoam: "#9FE2BF", Turquoise: "#40E0D0", Aqua: "#00FFFF",
//   Azure: "#00FFFF", Sky: "#87CEEB", Cerulean: "#007BA7", Cobalt: "#0047AB",
//   Sapphire: "#0F52BA", Ultramarine: "#120A8F", Lapis: "#26619C", Denim: "#1560BD",
//   Steel: "#4682B4", Slate: "#708090", Gunmetal: "#2a3439", Onyx: "#353839",
//   Jet: "#343434", Ebony: "#555D50", Raven: "#050301", Pitch: "#000000",
//   Obsidian: "#0B0B0B", Carbon: "#333333", Graphite: "#383838", Pewter: "#8E8E8E",
//   Zinc: "#8C92AC", Lead: "#778899", Iron: "#A19D94", Titanium: "#878681",
//   Chromium: "#C0C0C0", Nickel: "#727472", Tungsten: "#A0A0A0", Fuchsia: "#FF00FF",
//   Crimson: "#DC143C", Carmine: "#960018", Ruby: "#E0115F", Scarlet: "#FF2400",
//   Vermilion: "#E34234", Brick: "#CB4154", Tomato: "#FF6347", Papaya: "#FFEFD5",
//   Melon: "#FDBCB4", Mango: "#F4A460", Citrus: "#FFA500", Lemon: "#FFF700",
//   Lime: "#BFFF00", Kiwi: "#8EE53F", Apple: "#8DB600", Pear: "#D1E231",
//   Grape: "#6F2DA8", Plum: "#8E4585", Blackberry: "#4D0135", Mulberry: "#C54B8C",
//   Raisin: "#652DC1", Eggplant: "#614051", Aubergine: "#472C4C", Amethyst: "#9966CC",
//   Orchid: "#DA70D6", Heather: "#D473D4", Thistle: "#D8BFD8", Mauve: "#E0B0FF",
//   Wisteria: "#C9A0DC", Periwinkle: "#CCCCFF", Cornflower: "#6495ED", Baby: "#89CFF0",
//   Powder: "#B0E0E6", Midnight: "#191970", Ocean: "#0077BE",
// };

// const extractColorName = (fullName: string) => {
//   if (!fullName) return "Main";
//   const words = fullName.trim().split(" ");
//   const lastWord = words[words.length - 1];
//   return lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
// };

// const extractColorHex = (fullName: string) => {
//   const colorName = extractColorName(fullName);
//   return colorMapHex[colorName] || "#cccccc";
// };

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
//   sku: string;
//   name: string;
//   slug: string;
//   description: string;
//   benefits: string;
//   price: number;
//   discount_price: number;
//   voucher_discount_price?: number;
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   color?: any[];
// }

// export default function ProductDetail() {
//   const { slug } = useParams<{ slug: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { t } = useLanguage(); // [BARU] Inisialisasi hook bahasa

//   const initialPassedData = location.state?.initialProduct;
//   // [PERBAIKAN] Inisialisasi awal menggunakan data dari lokasi jika tersedia.
//   const [product, setProduct] = useState<Product | null>(initialPassedData || null);
  
//   // [PERBAIKAN KRITIS] Jangan jalankan loading jika kita sudah memiliki product state
//   const [loading, setLoading] = useState(!initialPassedData);
//   const [isFetchingFull, setIsFetchingFull] = useState(!initialPassedData);

//   const [quantityInput, setQuantityInput] = useState<string>("1");
//   const quantity = parseInt(quantityInput) || 1;

//   const [isBuyingNow, setIsBuyingNow] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const [siblingColors, setSiblingColors] = useState<Product[]>([]);
//   const [isFavorited, setIsFavorited] = useState(false);
  
//   const [activeTab, setActiveTab] = useState("desc");

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [apiReviews, setApiReviews] = useState<any[]>([]);

//   const { fetchCart, cartItems, addCartItemOptimistically, revertCartItems } = useCart();

//   const fetchSiblingColorsViaAPI = async (productName: string) => {
//     if (!productName) return;
//     try {
//       const words = productName.trim().split(" ");
//       let rootName = productName;

//       if (words.length > 1) {
//         words.pop();
//         rootName = words.join(" ");
//       }

//       const res = await fetch(`${BASE_URL}/api/products`);
//       const data = await res.json();
//       const allProducts = data.data ? data.data : data;

//       const siblings = allProducts.filter((p: Product) =>
//         p.name.toLowerCase().includes(rootName.toLowerCase()),
//       );

//       if (siblings.length <= 1) {
//         setSiblingColors([]);
//       } else {
//         setSiblingColors(siblings);
//       }
//     } catch (error) {
//       console.error("Gagal menarik data varian warna:", error);
//     }
//   };

//   useEffect(() => {
//     let isCurrentFetchValid = true;
//     const allPassedProducts = location.state?.allProducts;

//     // Reset UI states when slug changes
//     setCurrentImageIndex(0);
//     setQuantityInput("1");
//     setActiveTab("desc");

//     const loadProductData = async () => {
//       let activeProduct: Product | null = location.state?.initialProduct || null;

//       // 1. INSTANT RENDER DENGAN DATA STATE (Bebas Loading)
//       if (activeProduct) {
//         // Langsung perbarui state produk tanpa memicu loading screen
//         if (isCurrentFetchValid) {
//           setProduct(activeProduct);
//           setLoading(false); // [KUNCI] Pastikan loading mati seketika
//         }

//         if (allPassedProducts && allPassedProducts.length > 0) {
//           const words = activeProduct.name.trim().split(" ");
//           let rootName = activeProduct.name;
//           if (words.length > 1) {
//             words.pop();
//             rootName = words.join(" ");
//           }
//           const localSiblings = allPassedProducts.filter((p: Product) =>
//             p.name.toLowerCase().includes(rootName.toLowerCase())
//           );
//           if (localSiblings.length > 1 && isCurrentFetchValid) {
//             setSiblingColors(localSiblings);
//           }
//         } else {
//           await fetchSiblingColorsViaAPI(activeProduct.name);
//         }
//       } 
//       // 2. JIKA DIREFRESH LANGSUNG DI BROWSER (Butuh Loading)
//       else {
//         if (isCurrentFetchValid) {
//           setLoading(true);
//           setIsFetchingFull(true);
//         }
//         try {
//           const res = await fetch(`${BASE_URL}/api/products/${slug}`);
//           if (!res.ok) throw new Error("Produk tidak ditemukan");
//           const responseData = await res.json();

//           if (isCurrentFetchValid) {
//             activeProduct = responseData.data ? responseData.data : responseData;
//             setProduct(activeProduct);
//             await fetchSiblingColorsViaAPI(activeProduct!.name);
//           }
//         } catch (error) {
//           if (isCurrentFetchValid) {
//             console.error("Gagal memuat produk:", error);
//             navigate("/products");
//           }
//           return;
//         }
//       }

//       // 3. FETCH REVIEWS & WISHLIST di latar belakang (Tidak memblokir render)
//       if (activeProduct && isCurrentFetchValid) {
//         const fetchReviews = async () => {
//           try {
//             const res = await fetch(`${BASE_URL}/api/products/${slug}/reviews`, {
//               headers: { Accept: "application/json" },
//             });
//             if (res.ok) {
//               const data = await res.json();
//               if (isCurrentFetchValid) {
//                 const reviewsArr = data.reviews ? data.reviews : [];
//                 setApiReviews(reviewsArr);
//               }
//             }
//           } catch (error) {
//             console.error("Gagal menarik data ulasan:", error);
//           }
//         };

//         const checkWishlistStatus = async () => {
//           const token = localStorage.getItem("user_token");
//           if (!token) return;
//           try {
//             const res = await fetch(`${BASE_URL}/api/wishlists`, {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 Accept: "application/json",
//               },
//             });
//             if (res.ok) {
//               const data = await res.json();
//               if (isCurrentFetchValid) {
//                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
//                 const isWished = data.some((item: any) => item.product_id === activeProduct!.id);
//                 setIsFavorited(isWished);
//               }
//             }
//           } catch (error) {
//              console.error("Gagal memeriksa wishlist:", error);
//           }
//         };

//         // Tunggu penyelesaian fetch background tanpa memblokir UI
//         Promise.all([fetchReviews(), checkWishlistStatus()]).finally(() => {
//             if (isCurrentFetchValid) setIsFetchingFull(false);
//         });
//       }

//       if (isCurrentFetchValid && !activeProduct) {
//         setLoading(false);
//       }
//     };

//     loadProductData();

//     return () => {
//       isCurrentFetchValid = false;
//     };
//   }, [slug, navigate, location.state]); 

//   const handleToggleWishlist = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         text: t("login_required_desc"),
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#059669",
//         cancelButtonColor: "#d33",
//         confirmButtonText: t("to_login_page"),
//         cancelButtonText: t("cancel"),
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ product_id: product?.id }), 
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(angka);
//   };

//   const triggerFlyingAnimation = () => {
//     const startEl = document.getElementById("product-image");
//     const endEl = document.getElementById("cart-icon");

//     if (startEl && endEl && gallery.length > 0) {
//       const startRect = startEl.getBoundingClientRect();
//       const endRect = endEl.getBoundingClientRect();

//       const flyingImg = document.createElement("img");
//       flyingImg.src = gallery[currentImageIndex];
//       flyingImg.style.position = "fixed";
//       flyingImg.style.top = `${startRect.top}px`;
//       flyingImg.style.left = `${startRect.left}px`;
//       flyingImg.style.width = `${startRect.width}px`;
//       flyingImg.style.height = `${startRect.height}px`;
//       flyingImg.style.borderRadius = "10%";
//       flyingImg.style.zIndex = "9999";
//       flyingImg.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//       document.body.appendChild(flyingImg);

//       requestAnimationFrame(() => {
//         flyingImg.style.top = `${endRect.top + 10}px`;
//         flyingImg.style.left = `${endRect.left + 10}px`;
//         flyingImg.style.width = "20px";
//         flyingImg.style.height = "20px";
//         flyingImg.style.opacity = "0.2";
//         flyingImg.style.borderRadius = "50%";
//       });

//       setTimeout(() => {
//         flyingImg.remove();
//         endEl.classList.add("scale-125");
//         setTimeout(() => endEl.classList.remove("scale-125"), 200);
//       }, 800);
//     }
//   };

//   const handleAddToCart = () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         text: t("login_required_desc"),
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: t("to_login_page"),
//       }).then(() => navigate("/login"));
//       return;
//     }

//     const previousCartState = [...cartItems];
//     const optimisticItem = {
//       id: Date.now(),
//       product_id: product!.id,
//       quantity: quantity,
//       gross_amount: quantity * product!.price,
//       color: null,
//       product: {
//         id: product!.id,
//         name: product!.name,
//         price: product!.price,
//         discount_price: product!.price,
//         image_url: product!.image_url,
//         sku: product!.sku,
//         stock: product!.stock,
//         color: "",
//       },
//     };

//     addCartItemOptimistically(optimisticItem);
//     triggerFlyingAnimation();
//     Swal.fire({
//       title: t("added_to_cart"),
//       icon: "success",
//       toast: true,
//       position: "top-end",
//       timer: 1500,
//       showConfirmButton: false,
//     });

//     fetch(`${BASE_URL}/api/carts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         product_id: product?.id, 
//         quantity: quantity,
//         color: null,
//       }),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (res.ok && data.cart_id) {
//           fetchCart();
//         } else {
//           revertCartItems(previousCartState);
//           Swal.fire("Error", data.message || "Gagal menambahkan produk", "warning");
//         }
//       })
//       .catch(() => {
//         revertCartItems(previousCartState);
//         console.error("Gagal terhubung ke server saat add to cart");
//       });
//   };

//   const handleBuyItNow = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         icon: "info",
//         confirmButtonColor: "#059669",
//       }).then(() => navigate("/login"));
//       return;
//     }

//     setIsBuyingNow(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: null,
//         }),
//       });
//       const data = await res.json();

//       if (res.ok && data.cart_id) {
//         fetchCart();
//         navigate("/checkout", { state: { selectedIds: [data.cart_id] } });
//       } else {
//         Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsBuyingNow(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value;
//     if (val === "" || /^\d+$/.test(val)) {
//       setQuantityInput(val);
//     }
//   };

//   const handleInputBlur = () => {
//     let parsed = parseInt(quantityInput);
//     if (isNaN(parsed) || parsed < 1) parsed = 1;
//     if (product && parsed > product.stock) {
//       parsed = product.stock;
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "warning",
//         title: `Maksimal stok adalah ${product.stock}`,
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     }
//     setQuantityInput(parsed.toString());
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;
//   const isFormDisabled = isOutOfStock || isBuyingNow;

//   const handleShare = async () => {
//     const shareData = {
//       title: product?.name,
//       text: `Cek produk keren ini dari Gycora: ${product?.name}`,
//       url: window.location.href,
//     };

//     if (navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch (err) {
//         console.error("Gagal membagikan:", err);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "success",
//         title: "Link produk disalin!",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };

//   const isEtherealBrush = product.name.toLowerCase().includes("ethereal glow brush");
//   const isScalpCare = product.name.toLowerCase().includes("scalp");

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const formattedApiReviews = apiReviews.map((r: any) => ({
//       name: r.user?.first_name ? `${r.user.first_name} ${r.user.last_name || ''}` : "Gycora Customer",
//       text: r.comment,
//       rating: r.rating || 5, 
//       is_verified: true
//   }));

//   const brushReviews = [
//     { name: "Claudiasunshinee", text: "Sisir nya bagus banget sih sesuai dgn claim nya 🙌🙌 sblmnya aku pakai brand w** krn rambutku rontok.. trs setelah aku compare sm brand Gycora ternyata jauh lbh ga rontok pakai Gycora ❤👍", rating: 5, is_verified: true },
//     { name: "Nilasetiobudii", text: "Sisirnya enak banget terutama buat rambut yg suka kusut Jd lebih gampang pake sisir dari Gycora..", rating: 5, is_verified: true },
//     { name: "Thaliastanley___", text: "Setelah saya pakai hair brush nya rambutku jadi lebih gak kusut dan bikin lebih pede pastinya..", rating: 5, is_verified: true },
//     { name: "Herlenasutanto", text: "Oke kok enak sisir nya lentur ngikutin kepala. ga nyangkut2 hehe", rating: 5, is_verified: true },
//     { name: "Anitaa_bee", text: "Sukaaa poll sma sisirnya... Rambut jd makin teratur pas disisir dan ga gerundel (kusut frizzy) n rambut ku ya uda ga tllu banyak yg rontok. terus sisirnya tu empuk dan nyaman poll di kepala ga sakit.", rating: 5, is_verified: true },
//   ];

//   const scalpReviews = [
//     { name: "v*****b", text: "Kemasan: Bagus\nEfek: Ketombe keluar semua, semoga bisa bersih pakai ini\nPengalaman Penggunaan: Rasanya rambut halus setelah pakai.", rating: 5, is_verified: true },
//   ];

//   const staticReviews = isEtherealBrush ? brushReviews : isScalpCare ? scalpReviews : [];
//   const activeReviews = [...formattedApiReviews, ...staticReviews];

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white animate-fade-in">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          
//           {/* BAGIAN KIRI: GAMBAR */}
//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div
//               id="product-image"
//               className="relative flex items-center justify-center p-4 overflow-hidden border border-gray-100 group bg-gray-50/50 rounded-3xl aspect-square md:p-8"
//             >
//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-contain object-center w-full h-full p-4 md:p-8 transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
//                     />
//                   ))}
                  
//                   {gallery.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                         </svg>
//                       </button>
                      
//                       <button
//                         onClick={nextImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                         </svg>
//                       </button>
                      
//                       <div className="absolute left-0 right-0 z-30 flex items-center justify-center gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => setCurrentImageIndex(idx)}
//                             className={`h-2 rounded-full transition-all shadow-sm focus:outline-none ${idx === currentImageIndex ? "bg-[#006A4E] w-6" : "bg-gray-300 hover:bg-gray-400 w-2"}`}
//                             aria-label={`Lihat gambar ke-${idx + 1}`}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">
//                   {t("no_image")}
//                 </div>
//               )}
              
//               <div className="absolute z-30 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
//                   Video Demo
//                 </h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video
//                     src={product.variant_video}
//                     controls
//                     className="object-contain w-full h-64 md:h-80"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* BAGIAN KANAN: DETAIL PRODUK */}
//           <div className="flex flex-col justify-center">
//             <div className="flex items-start justify-between gap-4 mb-2">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
//                 {product.name}
//               </h1>
//               <div className="flex items-center gap-2 shrink-0">
//                 <button
//                   onClick={handleShare}
//                   className="flex items-center justify-center w-12 h-12 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:text-[#006A4E]"
//                   title="Bagikan Produk"
//                 >
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={handleToggleWishlist}
//                   className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                   title="Simpan ke Favorit"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {isEtherealBrush && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 Rambut Lebih Rapi, Halus, dan Mudah Diatur dalam Sekali Sisir ✨
//               </h2>
//             )}
//             {isScalpCare && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 Scalp Massager untuk Kulit Kepala Lebih Bersih, Nyaman, dan Sehat ✨
//               </h2>
//             )}

//             <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
//             <div className="mb-8">
//               {product.discount_price && product.discount_price > 0 ? (
//                 <div className="flex flex-col">
//                   <span className="text-2xl text-gray-400 line-through">
//                     {formatRupiah(product.price)}
//                   </span>
//                   <span className="text-4xl font-extrabold text-red-600">
//                     {formatRupiah(product.discount_price)}
//                   </span>
//                 </div>
//               ) : (
//                 <p className="text-4xl font-extrabold text-[#006A4E]">
//                   {formatRupiah(product.price)}
//                 </p>
//               )}
//             </div>

//             <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">
//               {siblingColors.length > 0 && (
//                 <div className="pb-6 mb-6 border-b border-gray-200">
//                   <h3 className="mb-3 text-sm font-bold text-gray-700">
//                     {t("select_variant")}
//                   </h3>
//                   <div className="flex flex-wrap gap-3">
//                     {siblingColors.map((sibling) => {
//                       const isCurrentProduct = sibling.id === product.id;
//                       return (
//                         <button
//                           key={sibling.id}
//                           onClick={() => {
//                             if (!isCurrentProduct) {
//                               window.scrollTo({ top: 0, behavior: "smooth" });
//                               // [KUNCI PERBAIKAN] Data dikirim agar tidak ada loading
//                               navigate(`/product/${sibling.slug}`, {
//                                 state: { 
//                                   initialProduct: sibling,
//                                   allProducts: location.state?.allProducts || siblingColors
//                                 },
//                               });
//                             }
//                           }}
//                           className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${
//                             isCurrentProduct
//                               ? "border-[#006A4E] ring-2 ring-[#006A4E]/30 scale-105 cursor-default"
//                               : "border-gray-200 hover:border-gray-300 hover:scale-105 cursor-pointer bg-white"
//                           }`}
//                           title={`Lihat varian ${extractColorName(sibling.name)}`}
//                         >
//                           <span
//                             className="w-5 h-5 border border-gray-300 rounded-full shadow-inner"
//                             style={{ backgroundColor: extractColorHex(sibling.name) }}
//                           ></span>
//                           <span className={`text-xs font-bold ${isCurrentProduct ? "text-[#006A4E]" : "text-gray-700"}`}>
//                             {extractColorName(sibling.name)}
//                           </span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center justify-between w-full overflow-hidden bg-white border border-gray-300 h-14 rounded-xl">
//                   <button
//                     onClick={() => {
//                       const newVal = Math.max(1, quantity - 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     -
//                   </button>

//                   <input
//                     type="text"
//                     value={quantityInput}
//                     onChange={handleInputChange}
//                     onBlur={handleInputBlur}
//                     disabled={isFormDisabled}
//                     className="w-full h-full font-bold text-center text-gray-900 bg-transparent outline-none appearance-none focus:ring-0"
//                   />

//                   <button
//                     onClick={() => {
//                       const newVal = Math.min(product.stock, quantity + 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-white border-[#006A4E] text-[#006A4E] hover:bg-emerald-50 active:scale-95"
//                     }`}
//                   >
//                     {t("add_to_cart")}
//                   </button>

//                   <button
//                     onClick={handleBuyItNow}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-[#006A4E] text-white hover:bg-emerald-900 shadow-[0_4px_14px_0_rgba(0,106,78,0.39)] hover:-translate-y-0.5 active:scale-95"
//                     }`}
//                   >
//                     {isBuyingNow ? "Memproses..." : isOutOfStock ? t("out_of_stock") : t("buy_it_now")}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* ==============================================================
//                 BAGIAN TAB (DESCRIPTION | HOW TO USE | FAQ | REVIEW) 
//             ============================================================== */}
//             <div className="mt-4">
//               <div className="flex flex-wrap gap-2 pb-4 mb-6 border-b border-gray-100">
//                 <button
//                   onClick={() => setActiveTab("desc")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "desc" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("description")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("how-to-use")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "how-to-use" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("how_to_use")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("faq")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "faq" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("faq")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("review")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "review" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("review")}
//                 </button>
//               </div>

//               <div className="text-gray-600 prose-sm prose whitespace-pre-wrap sm:prose max-w-none min-h-[200px]">
                
//                 {/* KONTEN TAB: DESCRIPTION */}
//                 {activeTab === "desc" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <p>
//                           Kenalin <strong>Ethereal Glow Brush</strong>, hairbrush anti-static dengan teknologi konduktif dan molekul karbon yang dirancang untuk membantu rambut terasa lebih halus, rapi, dan tampak berkilau setiap hari.
//                         </p>
//                         <p>
//                           Dengan desain fleksibel yang mengikuti kontur kepala serta bulu sisir yang lembut di kulit kepala, pengalaman menyisir jadi terasa lebih nyaman tanpa rasa sakit atau tarikan berlebih.
//                         </p>
//                         <p>
//                           Cocok untuk kamu yang ingin rambut tetap terlihat rapi di tengah aktivitas harian — tanpa perlu effort styling yang ribet.
//                         </p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">Kenapa Banyak yang Suka Ethereal Glow Brush?</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Anti-Static Technology:</strong> Membantu mengurangi rambut mengembang, kusut, dan sulit diatur.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Membantu Rambut Tampak Lebih Halus & Berkilau:</strong> Setiap sapuan sisir membantu merapikan rambut sekaligus meningkatkan kilau alami.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Flexible & Soft Bristles:</strong> Lembut di kulit kepala untuk membantu mengurangi rasa sakit dan rambut patah.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Spiral Comb Design:</strong> Desain spiral mengikuti bentuk kepala dengan lebih nyaman.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Eco-Friendly Material:</strong> Terbuat dari material Polylactic Acid Fiber yang ramah lingkungan.</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">Cocok Digunakan Untuk:</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>Rambut mudah kusut & mengembang</li>
//                               <li>Rambut yang susah diatur</li>
//                               <li>Penggunaan sehari-hari</li>
//                               <li>Semua jenis rambut</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">Detail Produk:</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>Material: Carbon Molecule + Polylactic Acid Fiber</li>
//                               <li>Size: 25 x 7 cm</li>
//                               <li>Include: Premium Soft Box</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <p>
//                           Kenalin <strong>Eco Serenity Scalp Care</strong>, scalp massager inovatif dari Gycora yang dirancang untuk membantu membersihkan kulit kepala sekaligus memberikan sensasi pijatan yang menenangkan setiap hari.
//                         </p>
//                         <p>
//                           Dengan desain fleksibel dan 196 teeth dengan ukuran berbeda, Eco Serenity mampu menjangkau area kulit kepala secara lebih menyeluruh untuk membantu mengangkat kotoran, minyak berlebih, dan penumpukan pada kulit kepala tanpa rasa kasar atau iritasi.
//                         </p>
//                         <p>
//                           Bukan cuma nyaman digunakan saat keramas, tapi juga cocok untuk relaksasi di tengah aktivitas yang padat.
//                         </p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">Kenapa Banyak yang Suka Eco Serenity Scalp Care?</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Triple-Fold Structure Design:</strong> Desain fleksibel yang mengikuti bentuk kepala untuk pijatan nyaman maksimal.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>196 Flexible Teeth:</strong> Membantu membersihkan merata dan memberi sensasi relaxing.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Membantu Membersihkan Kulit Kepala Lebih Optimal:</strong> Mengangkat minyak dan penumpukan kotoran.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Relaxing Scalp Massage:</strong> Pijatan lembut bantu melancarkan sirkulasi kulit kepala.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Anti-Microbial Silver Ion:</strong> Teknologi ion perak menjaga kebersihan alat.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Ergonomic & Comfortable Grip:</strong> Nyaman digenggam dalam berbagai posisi.</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Multifungsi:</strong> Cocok saat rambut kering (relaksasi) maupun saat keramas (pembersihan ekstra).</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>Eco-Friendly Material:</strong> Terbuat dari material yang dapat didaur ulang.</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">Cocok Digunakan Untuk:</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>Kulit kepala mudah berminyak</li>
//                               <li>Kulit kepala dengan penumpukan kotoran</li>
//                               <li>Pengalaman keramas yang lebih nyaman</li>
//                               <li>Relaksasi ringan sehari-hari</li>
//                               <li>Semua jenis rambut</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">Detail Produk:</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>Material: Recyclable Material</li>
//                               <li>Technology: Anti-Microbial Silver Ion</li>
//                               <li>Heat Resistance: Up to 80°C</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : (
//                       isFetchingFull && !product.description ? (
//                         <div className="space-y-2 animate-pulse">
//                           <div className="w-full h-3 bg-gray-200 rounded"></div>
//                           <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
//                           <div className="w-4/6 h-3 bg-gray-200 rounded"></div>
//                         </div>
//                       ) : (
//                         product.description || <p className="italic text-gray-400">Deskripsi belum tersedia.</p>
//                       )
//                     )}
//                   </div>
//                 )}

//                 {/* KONTEN TAB: HOW TO USE */}
//                 {activeTab === "how-to-use" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     <h4 className="font-bold text-gray-900">Cara Penggunaan yang Tepat</h4>
//                     {isEtherealBrush ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>Pastikan rambut dalam keadaan kering atau setengah kering (jangan basah kuyup).</li>
//                         <li>Sisir perlahan dari bagian tengah atau ujung rambut terlebih dahulu untuk mengurai kusut.</li>
//                         <li>Setelah bagian bawah rapi, lanjutkan menyisir dari akar hingga ke ujung rambut.</li>
//                         <li>Gunakan setiap pagi atau kapan pun rambut terasa berantakan/statis.</li>
//                       </ul>
//                     ) : isScalpCare ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li><strong>Saat Keramas:</strong> Aplikasikan sampo secara merata, gunakan Scalp Care dengan gerakan melingkar yang lembut untuk membersihkan kulit kepala.</li>
//                         <li><strong>Saat Rambut Kering:</strong> Gunakan sebagai alat pijat relaksasi di sela-sela aktivitas harian dengan tekanan ringan.</li>
//                         <li>Bilas Scalp Care dengan air bersih setelah penggunaan bersama produk perawatan rambut.</li>
//                       </ul>
//                     ) : (
//                       <p className="italic text-gray-400">Panduan penggunaan belum tersedia untuk produk ini.</p>
//                     )}
//                   </div>
//                 )}

//                 {/* KONTEN TAB: FAQ */}
//                 {activeTab === "faq" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <div>
//                           <h5 className="font-bold text-gray-900">Q: Apakah aman untuk rambut rontok?</h5>
//                           <p className="mt-1">A: Ya, bulu sisirnya didesain lembut dan fleksibel sehingga meminimalisir tarikan yang bisa menyebabkan rambut patah/rontok.</p>
//                         </div>
//                         <div>
//                           <h5 className="font-bold text-gray-900">Q: Bagaimana cara membersihkan sisir ini?</h5>
//                           <p className="mt-1">A: Kamu bisa menggunakan sikat kecil untuk membuang helaian rambut, lalu lap permukaan sisir dengan kain basah/tisu basah. Hindari merendam di dalam air terlalu lama.</p>
//                         </div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <div>
//                           <h5 className="font-bold text-gray-900">Q: Apakah alat ini membuat rambut makin kusut saat keramas?</h5>
//                           <p className="mt-1">A: Tidak, gunakan dengan gerakan memijat ke satu arah atau melingkar kecil. Hindari menggosok maju-mundur secara kasar agar rambut tetap rapi.</p>
//                         </div>
//                         <div>
//                           <h5 className="font-bold text-gray-900">Q: Apakah aman untuk kulit kepala sensitif?</h5>
//                           <p className="mt-1">A: Sangat aman. Silikon yang digunakan cukup fleksibel sehingga memberikan pijatan tanpa melukai kulit kepala.</p>
//                         </div>
//                       </>
//                     ) : (
//                       <p className="italic text-gray-400">Belum ada pertanyaan yang sering diajukan untuk produk ini.</p>
//                     )}
//                   </div>
//                 )}
                
//                 {/* [BARU] KONTEN TAB: REVIEW (GABUNGAN API + STATIS) */}
//                 {activeTab === "review" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {activeReviews.length > 0 ? (
//                       activeReviews.map((review, index) => (
//                         <div key={index} className="pb-4 border-b border-gray-100">
//                           <div className="flex items-center gap-2 mb-2">
//                             {/* Rendering bintang berdasarkan property rating (default 5 jika kosong) */}
//                             <div className="flex text-xs text-amber-400">
//                               {[...Array(review.rating || 5)].map((_, i) => (
//                                  <span key={i}>★</span>
//                               ))}
//                             </div>
//                             <span className="font-bold text-gray-900">{review.name}</span>
//                             {review.is_verified && (
//                               <span className="px-2 py-0.5 ml-2 text-[10px] font-bold text-[#006A4E] bg-emerald-50 rounded-full">
//                                 Verified Buyer
//                               </span>
//                             )}
//                           </div>
//                           <p className="text-gray-600 whitespace-pre-line">"{review.text}"</p>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="italic text-gray-400">Belum ada ulasan untuk produk ini.</p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";
// import { useLanguage } from "../../../context/LanguageContext"; // Import Language Context

// const colorMapHex: Record<string, string> = {
//   Black: "#000000", White: "#FFFFFF", Brown: "#8B4513", Beige: "#F5F5DC",
//   Red: "#8B0000", Navy: "#000080", Green: "#008000", Grey: "#808080",
//   Pink: "#FFC0CB", Yellow: "#FFD700", Blue: "#4169E1", Mocca: "#967969",
//   Cream: "#FDF4E3", Sage: "#9DC183", Gold: "#D4AF37", Orange: "#FF9900",
//   Silver: "#C0C0C0", Maroon: "#800000", Olive: "#808000", Taupe: "#483C32",
//   Khaki: "#F0E68C", Mustard: "#FFDB58", Emerald: "#50C878", Coral: "#FF7F50",
//   Mint: "#98FF98", Teal: "#008080", Cyan: "#00FFFF", Indigo: "#4B0082",
//   Violet: "#EE82EE", Purple: "#800080", Magenta: "#FF00FF", Lilac: "#C8A2C8",
//   Lavender: "#E6E6FA", Rose: "#FF007F", Peach: "#FFE5B4", Apricot: "#FBCEB1",
//   Ivory: "#FFFFF0", Tan: "#D2B48C", Charcoal: "#36454F", Ash: "#555555",
//   Platinum: "#E5E4E2", Bronze: "#CD7F32", Copper: "#B87333", Rust: "#B7410E",
//   Ochre: "#CC7722", Sienna: "#882D17", Terracotta: "#E2725B", Amber: "#FFBF00",
//   Caramel: "#FFD59A", Honey: "#FFC30B", Chestnut: "#954535", Walnut: "#5C4033",
//   Mahogany: "#C04000", Chocolate: "#7B3F00", Cocoa: "#D2691E", Coffee: "#6F4E37",
//   Mocha: "#493D26", Espresso: "#4B3621", Cappuccino: "#654321", Latte: "#C5A059",
//   Macchiato: "#8B5A2B", Almond: "#EED9C4", Hazelnut: "#C4A484", Pecan: "#8A3324",
//   Pistachio: "#93C572", Seafoam: "#9FE2BF", Turquoise: "#40E0D0", Aqua: "#00FFFF",
//   Azure: "#00FFFF", Sky: "#87CEEB", Cerulean: "#007BA7", Cobalt: "#0047AB",
//   Sapphire: "#0F52BA", Ultramarine: "#120A8F", Lapis: "#26619C", Denim: "#1560BD",
//   Steel: "#4682B4", Slate: "#708090", Gunmetal: "#2a3439", Onyx: "#353839",
//   Jet: "#343434", Ebony: "#555D50", Raven: "#050301", Pitch: "#000000",
//   Obsidian: "#0B0B0B", Carbon: "#333333", Graphite: "#383838", Pewter: "#8E8E8E",
//   Zinc: "#8C92AC", Lead: "#778899", Iron: "#A19D94", Titanium: "#878681",
//   Chromium: "#C0C0C0", Nickel: "#727472", Tungsten: "#A0A0A0", Fuchsia: "#FF00FF",
//   Crimson: "#DC143C", Carmine: "#960018", Ruby: "#E0115F", Scarlet: "#FF2400",
//   Vermilion: "#E34234", Brick: "#CB4154", Tomato: "#FF6347", Papaya: "#FFEFD5",
//   Melon: "#FDBCB4", Mango: "#F4A460", Citrus: "#FFA500", Lemon: "#FFF700",
//   Lime: "#BFFF00", Kiwi: "#8EE53F", Apple: "#8DB600", Pear: "#D1E231",
//   Grape: "#6F2DA8", Plum: "#8E4585", Blackberry: "#4D0135", Mulberry: "#C54B8C",
//   Raisin: "#652DC1", Eggplant: "#614051", Aubergine: "#472C4C", Amethyst: "#9966CC",
//   Orchid: "#DA70D6", Heather: "#D473D4", Thistle: "#D8BFD8", Mauve: "#E0B0FF",
//   Wisteria: "#C9A0DC", Periwinkle: "#CCCCFF", Cornflower: "#6495ED", Baby: "#89CFF0",
//   Powder: "#B0E0E6", Midnight: "#191970", Ocean: "#0077BE",
// };

// const extractColorName = (fullName: string) => {
//   if (!fullName) return "Main";
//   const words = fullName.trim().split(" ");
//   const lastWord = words[words.length - 1];
//   return lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
// };

// const extractColorHex = (fullName: string) => {
//   const colorName = extractColorName(fullName);
//   return colorMapHex[colorName] || "#cccccc";
// };

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
//   sku: string;
//   name: string;
//   slug: string;
//   description: string;
//   benefits: string;
//   price: number;
//   discount_price: number;
//   voucher_discount_price?: number;
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   color?: any[];
// }

// export default function ProductDetail() {
//   const { slug } = useParams<{ slug: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { t } = useLanguage(); 

//   const initialPassedData = location.state?.initialProduct;
//   const [product, setProduct] = useState<Product | null>(initialPassedData || null);
  
//   const [loading, setLoading] = useState(!initialPassedData);
//   const [isFetchingFull, setIsFetchingFull] = useState(!initialPassedData);

//   const [quantityInput, setQuantityInput] = useState<string>("1");
//   const quantity = parseInt(quantityInput) || 1;

//   const [isBuyingNow, setIsBuyingNow] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const [siblingColors, setSiblingColors] = useState<Product[]>([]);
//   const [isFavorited, setIsFavorited] = useState(false);
  
//   const [activeTab, setActiveTab] = useState("desc");
//   const [apiReviews, setApiReviews] = useState<any[]>([]);

//   const { fetchCart, cartItems, addCartItemOptimistically, revertCartItems } = useCart();

//   const fetchSiblingColorsViaAPI = async (productName: string) => {
//     if (!productName) return;
//     try {
//       const words = productName.trim().split(" ");
//       let rootName = productName;

//       if (words.length > 1) {
//         words.pop();
//         rootName = words.join(" ");
//       }

//       const res = await fetch(`${BASE_URL}/api/products`);
//       const data = await res.json();
//       const allProducts = data.data ? data.data : data;

//       const siblings = allProducts.filter((p: Product) =>
//         p.name.toLowerCase().includes(rootName.toLowerCase()),
//       );

//       if (siblings.length <= 1) {
//         setSiblingColors([]);
//       } else {
//         setSiblingColors(siblings);
//       }
//     } catch (error) {
//       console.error("Gagal menarik data varian warna:", error);
//     }
//   };

//   useEffect(() => {
//     let isCurrentFetchValid = true;
//     const allPassedProducts = location.state?.allProducts;

//     setCurrentImageIndex(0);
//     setQuantityInput("1");
//     setActiveTab("desc");

//     const loadProductData = async () => {
//       let activeProduct: Product | null = location.state?.initialProduct || null;

//       if (activeProduct) {
//         if (isCurrentFetchValid) {
//           setProduct(activeProduct);
//           setLoading(false); 
//         }

//         if (allPassedProducts && allPassedProducts.length > 0) {
//           const words = activeProduct.name.trim().split(" ");
//           let rootName = activeProduct.name;
//           if (words.length > 1) {
//             words.pop();
//             rootName = words.join(" ");
//           }
//           const localSiblings = allPassedProducts.filter((p: Product) =>
//             p.name.toLowerCase().includes(rootName.toLowerCase())
//           );
//           if (localSiblings.length > 1 && isCurrentFetchValid) {
//             setSiblingColors(localSiblings);
//           }
//         } else {
//           await fetchSiblingColorsViaAPI(activeProduct.name);
//         }
//       } 
//       else {
//         if (isCurrentFetchValid) {
//           setLoading(true);
//           setIsFetchingFull(true);
//         }
//         try {
//           const res = await fetch(`${BASE_URL}/api/products/${slug}`);
//           if (!res.ok) throw new Error("Produk tidak ditemukan");
//           const responseData = await res.json();

//           if (isCurrentFetchValid) {
//             activeProduct = responseData.data ? responseData.data : responseData;
//             setProduct(activeProduct);
//             await fetchSiblingColorsViaAPI(activeProduct!.name);
//           }
//         } catch (error) {
//           if (isCurrentFetchValid) {
//             console.error("Gagal memuat produk:", error);
//             navigate("/products");
//           }
//           return;
//         }
//       }

//       if (activeProduct && isCurrentFetchValid) {
//         const fetchReviews = async () => {
//           try {
//             const res = await fetch(`${BASE_URL}/api/products/${slug}/reviews`, {
//               headers: { Accept: "application/json" },
//             });
//             if (res.ok) {
//               const data = await res.json();
//               if (isCurrentFetchValid) {
//                 const reviewsArr = data.reviews ? data.reviews : [];
//                 setApiReviews(reviewsArr);
//               }
//             }
//           } catch (error) {
//             console.error("Gagal menarik data ulasan:", error);
//           }
//         };

//         const checkWishlistStatus = async () => {
//           const token = localStorage.getItem("user_token");
//           if (!token) return;
//           try {
//             const res = await fetch(`${BASE_URL}/api/wishlists`, {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 Accept: "application/json",
//               },
//             });
//             if (res.ok) {
//               const data = await res.json();
//               if (isCurrentFetchValid) {
//                 const isWished = data.some((item: any) => item.product_id === activeProduct!.id);
//                 setIsFavorited(isWished);
//               }
//             }
//           } catch (error) {
//              console.error("Gagal memeriksa wishlist:", error);
//           }
//         };

//         Promise.all([fetchReviews(), checkWishlistStatus()]).finally(() => {
//             if (isCurrentFetchValid) setIsFetchingFull(false);
//         });
//       }

//       if (isCurrentFetchValid && !activeProduct) {
//         setLoading(false);
//       }
//     };

//     loadProductData();

//     return () => {
//       isCurrentFetchValid = false;
//     };
//   }, [slug, navigate, location.state]); 

//   const handleToggleWishlist = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         text: t("login_required_desc"),
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#059669",
//         cancelButtonColor: "#d33",
//         confirmButtonText: t("to_login_page"),
//         cancelButtonText: t("cancel"),
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ product_id: product?.id }), 
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(angka);
//   };

//   const triggerFlyingAnimation = () => {
//     const startEl = document.getElementById("product-image");
//     const endEl = document.getElementById("cart-icon");

//     if (startEl && endEl && gallery.length > 0) {
//       const startRect = startEl.getBoundingClientRect();
//       const endRect = endEl.getBoundingClientRect();

//       const flyingImg = document.createElement("img");
//       flyingImg.src = gallery[currentImageIndex];
//       flyingImg.style.position = "fixed";
//       flyingImg.style.top = `${startRect.top}px`;
//       flyingImg.style.left = `${startRect.left}px`;
//       flyingImg.style.width = `${startRect.width}px`;
//       flyingImg.style.height = `${startRect.height}px`;
//       flyingImg.style.borderRadius = "10%";
//       flyingImg.style.zIndex = "9999";
//       flyingImg.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//       document.body.appendChild(flyingImg);

//       requestAnimationFrame(() => {
//         flyingImg.style.top = `${endRect.top + 10}px`;
//         flyingImg.style.left = `${endRect.left + 10}px`;
//         flyingImg.style.width = "20px";
//         flyingImg.style.height = "20px";
//         flyingImg.style.opacity = "0.2";
//         flyingImg.style.borderRadius = "50%";
//       });

//       setTimeout(() => {
//         flyingImg.remove();
//         endEl.classList.add("scale-125");
//         setTimeout(() => endEl.classList.remove("scale-125"), 200);
//       }, 800);
//     }
//   };

//   const handleAddToCart = () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         text: t("login_required_desc"),
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: t("to_login_page"),
//       }).then(() => navigate("/login"));
//       return;
//     }

//     const previousCartState = [...cartItems];
//     const optimisticItem = {
//       id: Date.now(),
//       product_id: product!.id,
//       quantity: quantity,
//       gross_amount: quantity * product!.price,
//       color: null,
//       product: {
//         id: product!.id,
//         name: product!.name,
//         price: product!.price,
//         discount_price: product!.price,
//         image_url: product!.image_url,
//         sku: product!.sku,
//         stock: product!.stock,
//         color: "",
//       },
//     };

//     addCartItemOptimistically(optimisticItem);
//     triggerFlyingAnimation();
//     Swal.fire({
//       title: t("added_to_cart"),
//       icon: "success",
//       toast: true,
//       position: "top-end",
//       timer: 1500,
//       showConfirmButton: false,
//     });

//     fetch(`${BASE_URL}/api/carts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         product_id: product?.id, 
//         quantity: quantity,
//         color: null,
//       }),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (res.ok && data.cart_id) {
//           fetchCart();
//         } else {
//           revertCartItems(previousCartState);
//           Swal.fire("Error", data.message || "Gagal menambahkan produk", "warning");
//         }
//       })
//       .catch(() => {
//         revertCartItems(previousCartState);
//         console.error("Gagal terhubung ke server saat add to cart");
//       });
//   };

//   const handleBuyItNow = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         icon: "info",
//         confirmButtonColor: "#059669",
//       }).then(() => navigate("/login"));
//       return;
//     }

//     setIsBuyingNow(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: null,
//         }),
//       });
//       const data = await res.json();

//       if (res.ok && data.cart_id) {
//         fetchCart();
//         navigate("/checkout", { state: { selectedIds: [data.cart_id] } });
//       } else {
//         Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsBuyingNow(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value;
//     if (val === "" || /^\d+$/.test(val)) {
//       setQuantityInput(val);
//     }
//   };

//   const handleInputBlur = () => {
//     let parsed = parseInt(quantityInput);
//     if (isNaN(parsed) || parsed < 1) parsed = 1;
//     if (product && parsed > product.stock) {
//       parsed = product.stock;
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "warning",
//         title: t("product_max_stock_toast", { stock: product.stock.toString() }),
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     }
//     setQuantityInput(parsed.toString());
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;
//   const isFormDisabled = isOutOfStock || isBuyingNow;

//   const handleShare = async () => {
//     const shareData = {
//       title: product?.name,
//       text: `Cek produk keren ini dari Gycora: ${product?.name}`,
//       url: window.location.href,
//     };

//     if (navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch (err) {
//         console.error("Gagal membagikan:", err);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "success",
//         title: t("product_share_toast"),
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };

//   const isEtherealBrush = product.name.toLowerCase().includes("ethereal glow brush");
//   const isScalpCare = product.name.toLowerCase().includes("scalp");

//   const formattedApiReviews = apiReviews.map((r: any) => ({
//       name: r.user?.first_name ? `${r.user.first_name} ${r.user.last_name || ''}` : "Gycora Customer",
//       text: r.comment,
//       rating: r.rating || 5, 
//       is_verified: true
//   }));

//   const brushReviews = [
//     { name: "Claudiasunshinee", text: t("review_brush_1"), rating: 5, is_verified: true },
//     { name: "Nilasetiobudii", text: t("review_brush_2"), rating: 5, is_verified: true },
//     { name: "Thaliastanley___", text: t("review_brush_3"), rating: 5, is_verified: true },
//     { name: "Herlenasutanto", text: t("review_brush_4"), rating: 5, is_verified: true },
//     { name: "Anitaa_bee", text: t("review_brush_5"), rating: 5, is_verified: true },
//   ];

//   const scalpReviews = [
//     { name: "v*****b", text: t("review_scalp_1"), rating: 5, is_verified: true },
//   ];

//   const staticReviews = isEtherealBrush ? brushReviews : isScalpCare ? scalpReviews : [];
//   const activeReviews = [...formattedApiReviews, ...staticReviews];

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white animate-fade-in">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          
//           {/* BAGIAN KIRI: GAMBAR */}
//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div
//               id="product-image"
//               className="relative flex items-center justify-center p-4 overflow-hidden border border-gray-100 group bg-gray-50/50 rounded-3xl aspect-square md:p-8"
//             >
//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-contain object-center w-full h-full p-4 md:p-8 transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
//                     />
//                   ))}
                  
//                   {gallery.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                         </svg>
//                       </button>
                      
//                       <button
//                         onClick={nextImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                         </svg>
//                       </button>
                      
//                       <div className="absolute left-0 right-0 z-30 flex items-center justify-center gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => setCurrentImageIndex(idx)}
//                             className={`h-2 rounded-full transition-all shadow-sm focus:outline-none ${idx === currentImageIndex ? "bg-[#006A4E] w-6" : "bg-gray-300 hover:bg-gray-400 w-2"}`}
//                             aria-label={`Lihat gambar ke-${idx + 1}`}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">
//                   {t("no_image")}
//                 </div>
//               )}
              
//               <div className="absolute z-30 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
//                   {t("product_video_demo")}
//                 </h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video
//                     src={product.variant_video}
//                     controls
//                     className="object-contain w-full h-64 md:h-80"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* BAGIAN KANAN: DETAIL PRODUK */}
//           <div className="flex flex-col justify-center">
//             <div className="flex items-start justify-between gap-4 mb-2">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
//                 {product.name}
//               </h1>
//               <div className="flex items-center gap-2 shrink-0">
//                 <button
//                   onClick={handleShare}
//                   className="flex items-center justify-center w-12 h-12 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:text-[#006A4E]"
//                   title="Bagikan Produk"
//                 >
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={handleToggleWishlist}
//                   className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                   title="Simpan ke Favorit"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {isEtherealBrush && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 {t("brush_tagline")}
//               </h2>
//             )}
//             {isScalpCare && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 {t("scalp_tagline")}
//               </h2>
//             )}

//             <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
//             <div className="mb-8">
//               {product.discount_price && product.discount_price > 0 ? (
//                 <div className="flex flex-col">
//                   <span className="text-2xl text-gray-400 line-through">
//                     {formatRupiah(product.price)}
//                   </span>
//                   <span className="text-4xl font-extrabold text-red-600">
//                     {formatRupiah(product.discount_price)}
//                   </span>
//                 </div>
//               ) : (
//                 <p className="text-4xl font-extrabold text-[#006A4E]">
//                   {formatRupiah(product.price)}
//                 </p>
//               )}
//             </div>

//             <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">
//               {siblingColors.length > 0 && (
//                 <div className="pb-6 mb-6 border-b border-gray-200">
//                   <h3 className="mb-3 text-sm font-bold text-gray-700">
//                     {t("select_variant")}
//                   </h3>
//                   <div className="flex flex-wrap gap-3">
//                     {siblingColors.map((sibling) => {
//                       const isCurrentProduct = sibling.id === product.id;
//                       return (
//                         <button
//                           key={sibling.id}
//                           onClick={() => {
//                             if (!isCurrentProduct) {
//                               window.scrollTo({ top: 0, behavior: "smooth" });
//                               navigate(`/product/${sibling.slug}`, {
//                                   state: { 
//                                     initialProduct: sibling,
//                                     allProducts: location.state?.allProducts || siblingColors
//                                   },
//                                 });
//                             }
//                           }}
//                           className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${
//                             isCurrentProduct
//                               ? "border-[#006A4E] ring-2 ring-[#006A4E]/30 scale-105 cursor-default"
//                               : "border-gray-200 hover:border-gray-300 hover:scale-105 cursor-pointer bg-white"
//                           }`}
//                           title={`Lihat varian ${extractColorName(sibling.name)}`}
//                         >
//                           <span
//                             className="w-5 h-5 border border-gray-300 rounded-full shadow-inner"
//                             style={{ backgroundColor: extractColorHex(sibling.name) }}
//                           ></span>
//                           <span className={`text-xs font-bold ${isCurrentProduct ? "text-[#006A4E]" : "text-gray-700"}`}>
//                             {extractColorName(sibling.name)}
//                           </span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center justify-between w-full overflow-hidden bg-white border border-gray-300 h-14 rounded-xl">
//                   <button
//                     onClick={() => {
//                       const newVal = Math.max(1, quantity - 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     -
//                   </button>

//                   <input
//                     type="text"
//                     value={quantityInput}
//                     onChange={handleInputChange}
//                     onBlur={handleInputBlur}
//                     disabled={isFormDisabled}
//                     className="w-full h-full font-bold text-center text-gray-900 bg-transparent outline-none appearance-none focus:ring-0"
//                   />

//                   <button
//                     onClick={() => {
//                       const newVal = Math.min(product.stock, quantity + 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-white border-[#006A4E] text-[#006A4E] hover:bg-emerald-50 active:scale-95"
//                     }`}
//                   >
//                     {t("add_to_cart")}
//                   </button>

//                   <button
//                     onClick={handleBuyItNow}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-[#006A4E] text-white hover:bg-emerald-900 shadow-[0_4px_14px_0_rgba(0,106,78,0.39)] hover:-translate-y-0.5 active:scale-95"
//                     }`}
//                   >
//                     {isBuyingNow ? t("product_cart_processing") : isOutOfStock ? t("out_of_stock") : t("buy_it_now")}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* ==============================================================
//                 BAGIAN TAB (DESCRIPTION | HOW TO USE | FAQ | REVIEW) 
//             ============================================================== */}
//             <div className="mt-4">
//               <div className="flex flex-wrap gap-2 pb-4 mb-6 border-b border-gray-100">
//                 <button
//                   onClick={() => setActiveTab("desc")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "desc" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("description")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("how-to-use")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "how-to-use" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("how_to_use")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("faq")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "faq" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("faq")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("review")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "review" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("review")}
//                 </button>
//               </div>

//               <div className="text-gray-600 prose-sm prose whitespace-pre-wrap sm:prose max-w-none min-h-[200px]">
                
//                 {/* KONTEN TAB: DESCRIPTION */}
//                 {activeTab === "desc" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <p>{t("brush_desc_p1")}</p>
//                         <p>{t("brush_desc_p2")}</p>
//                         <p>{t("brush_desc_p3")}</p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">{t("brush_benefits_title")}</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_1_bold")}</strong>{t("brush_benefit_1_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_2_bold")}</strong>{t("brush_benefit_2_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_3_bold")}</strong>{t("brush_benefit_3_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_4_bold")}</strong>{t("brush_benefit_4_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_5_bold")}</strong>{t("brush_benefit_5_text")}</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("brush_suitable_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("brush_suitable_1")}</li>
//                               <li>{t("brush_suitable_2")}</li>
//                               <li>{t("brush_suitable_3")}</li>
//                               <li>{t("brush_suitable_4")}</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("brush_specs_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("brush_specs_1")}</li>
//                               <li>{t("brush_specs_2")}</li>
//                               <li>{t("brush_specs_3")}</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <p>{t("scalp_desc_p1")}</p>
//                         <p>{t("scalp_desc_p2")}</p>
//                         <p>{t("scalp_desc_p3")}</p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">{t("scalp_benefits_title")}</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_1_bold")}</strong>{t("scalp_benefit_1_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_2_bold")}</strong>{t("scalp_benefit_2_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_3_bold")}</strong>{t("scalp_benefit_3_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_4_bold")}</strong>{t("scalp_benefit_4_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_5_bold")}</strong>{t("scalp_benefit_5_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_6_bold")}</strong>{t("scalp_benefit_6_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_7_bold")}</strong>{t("scalp_benefit_7_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_8_bold")}</strong>{t("scalp_benefit_8_text")}</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("scalp_suitable_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("scalp_suitable_1")}</li>
//                               <li>{t("scalp_suitable_2")}</li>
//                               <li>{t("scalp_suitable_3")}</li>
//                               <li>{t("scalp_suitable_4")}</li>
//                               <li>{t("scalp_suitable_5")}</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("scalp_specs_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("scalp_specs_1")}</li>
//                               <li>{t("scalp_specs_2")}</li>
//                               <li>{t("scalp_specs_3")}</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : (
//                       isFetchingFull && !product.description ? (
//                         <div className="space-y-2 animate-pulse">
//                           <div className="w-full h-3 bg-gray-200 rounded"></div>
//                           <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
//                           <div className="w-4/6 h-3 bg-gray-200 rounded"></div>
//                         </div>
//                       ) : (
//                         product.description || <p className="italic text-gray-400">{t("product_desc_empty")}</p>
//                       )
//                     )}
//                   </div>
//                 )}

//                 {/* KONTEN TAB: HOW TO USE */}
//                 {activeTab === "how-to-use" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     <h4 className="font-bold text-gray-900">{t("guide_title")}</h4>
//                     {isEtherealBrush ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>{t("brush_guide_1")}</li>
//                         <li>{t("brush_guide_2")}</li>
//                         <li>{t("brush_guide_3")}</li>
//                         <li>{t("brush_guide_4")}</li>
//                       </ul>
//                     ) : isScalpCare ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>{t("scalp_guide_1")}</li>
//                         <li>{t("scalp_guide_2")}</li>
//                         <li>{t("scalp_guide_3")}</li>
//                       </ul>
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_guide_empty")}</p>
//                     )}
//                   </div>
//                 )}

//                 {/* KONTEN TAB: FAQ */}
//                 {activeTab === "faq" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <div>
//                           <h5 className="font-bold text-gray-900">{t("brush_faq_q1")}</h5>
//                           <p className="mt-1">{t("brush_faq_a1")}</p>
//                         </div>
//                         <div>
//                           <h5 className="font-bold text-gray-900">{t("brush_faq_q2")}</h5>
//                           <p className="mt-1">{t("brush_faq_a2")}</p>
//                         </div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <div>
//                           <h5 className="font-bold text-gray-900">{t("scalp_faq_q1")}</h5>
//                           <p className="mt-1">{t("scalp_faq_a1")}</p>
//                         </div>
//                         <div>
//                           <h5 className="font-bold text-gray-900">{t("scalp_faq_q2")}</h5>
//                           <p className="mt-1">{t("scalp_faq_a2")}</p>
//                         </div>
//                       </>
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_faq_empty")}</p>
//                     )}
//                   </div>
//                 )}
                
//                 {/* KONTEN TAB: REVIEW */}
//                 {activeTab === "review" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {activeReviews.length > 0 ? (
//                       activeReviews.map((review, index) => (
//                         <div key={index} className="pb-4 border-b border-gray-100">
//                           <div className="flex items-center gap-2 mb-2">
//                             <div className="flex text-xs text-amber-400">
//                               {[...Array(review.rating || 5)].map((_, i) => (
//                                  <span key={i}>★</span>
//                               ))}
//                             </div>
//                             <span className="font-bold text-gray-900">{review.name}</span>
//                             {review.is_verified && (
//                               <span className="px-2 py-0.5 ml-2 text-[10px] font-bold text-[#006A4E] bg-emerald-50 rounded-full">
//                                 {t("product_verified_buyer")}
//                               </span>
//                             )}
//                           </div>
//                           <p className="text-gray-600 whitespace-pre-line">"{review.text}"</p>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_review_empty")}</p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";
// import { useLanguage } from "../../../context/LanguageContext"; // Import Language Context

// const colorMapHex: Record<string, string> = {
//   Black: "#000000", White: "#FFFFFF", Brown: "#8B4513", Beige: "#F5F5DC",
//   Red: "#8B0000", Navy: "#000080", Green: "#008000", Grey: "#808080",
//   Pink: "#FFC0CB", Yellow: "#FFD700", Blue: "#4169E1", Mocca: "#967969",
//   Cream: "#FDF4E3", Sage: "#9DC183", Gold: "#D4AF37", Orange: "#FF9900",
//   Silver: "#C0C0C0", Maroon: "#800000", Olive: "#808000", Taupe: "#483C32",
//   Khaki: "#F0E68C", Mustard: "#FFDB58", Emerald: "#50C878", Coral: "#FF7F50",
//   Mint: "#98FF98", Teal: "#008080", Cyan: "#00FFFF", Indigo: "#4B0082",
//   Violet: "#EE82EE", Purple: "#800080", Magenta: "#FF00FF", Lilac: "#C8A2C8",
//   Lavender: "#E6E6FA", Rose: "#FF007F", Peach: "#FFE5B4", Apricot: "#FBCEB1",
//   Ivory: "#FFFFF0", Tan: "#D2B48C", Charcoal: "#36454F", Ash: "#555555",
//   Platinum: "#E5E4E2", Bronze: "#CD7F32", Copper: "#B87333", Rust: "#B7410E",
//   Ochre: "#CC7722", Sienna: "#882D17", Terracotta: "#E2725B", Amber: "#FFBF00",
//   Caramel: "#FFD59A", Honey: "#FFC30B", Chestnut: "#954535", Walnut: "#5C4033",
//   Mahogany: "#C04000", Chocolate: "#7B3F00", Cocoa: "#D2691E", Coffee: "#6F4E37",
//   Mocha: "#493D26", Espresso: "#4B3621", Cappuccino: "#654321", Latte: "#C5A059",
//   Macchiato: "#8B5A2B", Almond: "#EED9C4", Hazelnut: "#C4A484", Pecan: "#8A3324",
//   Pistachio: "#93C572", Seafoam: "#9FE2BF", Turquoise: "#40E0D0", Aqua: "#00FFFF",
//   Azure: "#00FFFF", Sky: "#87CEEB", Cerulean: "#007BA7", Cobalt: "#0047AB",
//   Sapphire: "#0F52BA", Ultramarine: "#120A8F", Lapis: "#26619C", Denim: "#1560BD",
//   Steel: "#4682B4", Slate: "#708090", Gunmetal: "#2a3439", Onyx: "#353839",
//   Jet: "#343434", Ebony: "#555D50", Raven: "#050301", Pitch: "#000000",
//   Obsidian: "#0B0B0B", Carbon: "#333333", Graphite: "#383838", Pewter: "#8E8E8E",
//   Zinc: "#8C92AC", Lead: "#778899", Iron: "#A19D94", Titanium: "#878681",
//   Chromium: "#C0C0C0", Nickel: "#727472", Tungsten: "#A0A0A0", Fuchsia: "#FF00FF",
//   Crimson: "#DC143C", Carmine: "#960018", Ruby: "#E0115F", Scarlet: "#FF2400",
//   Vermilion: "#E34234", Brick: "#CB4154", Tomato: "#FF6347", Papaya: "#FFEFD5",
//   Melon: "#FDBCB4", Mango: "#F4A460", Citrus: "#FFA500", Lemon: "#FFF700",
//   Lime: "#BFFF00", Kiwi: "#8EE53F", Apple: "#8DB600", Pear: "#D1E231",
//   Grape: "#6F2DA8", Plum: "#8E4585", Blackberry: "#4D0135", Mulberry: "#C54B8C",
//   Raisin: "#652DC1", Eggplant: "#614051", Aubergine: "#472C4C", Amethyst: "#9966CC",
//   Orchid: "#DA70D6", Heather: "#D473D4", Thistle: "#D8BFD8", Mauve: "#E0B0FF",
//   Wisteria: "#C9A0DC", Periwinkle: "#CCCCFF", Cornflower: "#6495ED", Baby: "#89CFF0",
//   Powder: "#B0E0E6", Midnight: "#191970", Ocean: "#0077BE",
// };

// const extractColorName = (fullName: string) => {
//   if (!fullName) return "Main";
//   const words = fullName.trim().split(" ");
//   const lastWord = words[words.length - 1];
//   return lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
// };

// const extractColorHex = (fullName: string) => {
//   const colorName = extractColorName(fullName);
//   return colorMapHex[colorName] || "#cccccc";
// };

// // [BARU] Fungsi utilitas untuk translasi teks dinamis dari API Review secara real-time
// const translateText = async (text: string, langTo: string): Promise<string> => {
//   if (!text) return "";
//   try {
//     const response = await fetch(
//       `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=id|${langTo}`
//     );
//     const data = await response.json();
//     if (data && data.responseData && data.responseData.translatedText) {
//       return data.responseData.translatedText;
//     }
//     return text;
//   } catch (error) {
//     console.error("Gagal menerjemahkan teks ulasan API:", error);
//     return text;
//   }
// };

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
//   sku: string;
//   name: string;
//   slug: string;
//   description: string;
//   benefits: string;
//   price: number;
//   discount_price: number;
//   voucher_discount_price?: number;
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   color?: any[];
// }

// export default function ProductDetail() {
//   const { slug } = useParams<{ slug: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { t, lang } = useLanguage(); 

//   const initialPassedData = location.state?.initialProduct;
//   const [product, setProduct] = useState<Product | null>(initialPassedData || null);
  
//   const [loading, setLoading] = useState(!initialPassedData);
//   const [isFetchingFull, setIsFetchingFull] = useState(!initialPassedData);

//   const [quantityInput, setQuantityInput] = useState<string>("1");
//   const quantity = parseInt(quantityInput) || 1;

//   const [isBuyingNow, setIsBuyingNow] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const [siblingColors, setSiblingColors] = useState<Product[]>([]);
//   const [isFavorited, setIsFavorited] = useState(false);
  
//   const [activeTab, setActiveTab] = useState("desc");
//   const [apiReviews, setApiReviews] = useState<any[]>([]);

//   const { fetchCart, cartItems, addCartItemOptimistically, revertCartItems } = useCart();

//   const fetchSiblingColorsViaAPI = async (productName: string) => {
//     if (!productName) return;
//     try {
//       const words = productName.trim().split(" ");
//       let rootName = productName;

//       if (words.length > 1) {
//         words.pop();
//         rootName = words.join(" ");
//       }

//       const res = await fetch(`${BASE_URL}/api/products`);
//       const data = await res.json();
//       const allProducts = data.data ? data.data : data;

//       const siblings = allProducts.filter((p: Product) =>
//         p.name.toLowerCase().includes(rootName.toLowerCase()),
//       );

//       if (siblings.length <= 1) {
//         setSiblingColors([]);
//       } else {
//         setSiblingColors(siblings);
//       }
//     } catch (error) {
//       console.error("Gagal menarik data varian warna:", error);
//     }
//   };

//   useEffect(() => {
//     let isCurrentFetchValid = true;
//     const allPassedProducts = location.state?.allProducts;

//     setCurrentImageIndex(0);
//     setQuantityInput("1");
//     setActiveTab("desc");

//     const loadProductData = async () => {
//       let activeProduct: Product | null = location.state?.initialProduct || null;

//       if (activeProduct) {
//         if (isCurrentFetchValid) {
//           setProduct(activeProduct);
//           setLoading(false); 
//         }

//         if (allPassedProducts && allPassedProducts.length > 0) {
//           const words = activeProduct.name.trim().split(" ");
//           let rootName = activeProduct.name;
//           if (words.length > 1) {
//             words.pop();
//             rootName = words.join(" ");
//           }
//           const localSiblings = allPassedProducts.filter((p: Product) =>
//             p.name.toLowerCase().includes(rootName.toLowerCase())
//           );
//           if (localSiblings.length > 1 && isCurrentFetchValid) {
//             setSiblingColors(localSiblings);
//           }
//         } else {
//           await fetchSiblingColorsViaAPI(activeProduct.name);
//         }
//       } 
//       else {
//         if (isCurrentFetchValid) {
//           setLoading(true);
//           setIsFetchingFull(true);
//         }
//         try {
//           const res = await fetch(`${BASE_URL}/api/products/${slug}`);
//           if (!res.ok) throw new Error("Produk tidak ditemukan");
//           const responseData = await res.json();

//           if (isCurrentFetchValid) {
//             activeProduct = responseData.data ? responseData.data : responseData;
//             setProduct(activeProduct);
//             await fetchSiblingColorsViaAPI(activeProduct!.name);
//           }
//         } catch (error) {
//           if (isCurrentFetchValid) {
//             console.error("Gagal memuat produk:", error);
//             navigate("/products");
//           }
//           return;
//         }
//       }

//       if (activeProduct && isCurrentFetchValid) {
//         const fetchReviews = async () => {
//           try {
//             const res = await fetch(`${BASE_URL}/api/products/${slug}/reviews`, {
//               headers: { Accept: "application/json" },
//             });
//             if (res.ok) {
//               const data = await res.json();
//               let reviewsArr = data.reviews ? data.reviews : [];

//               // [BARU] Menerjemahkan komentar ulasan dinamis dari database jika bahasa saat ini adalah English
//               if (lang === "en" && reviewsArr.length > 0) {
//                 reviewsArr = await Promise.all(
//                   reviewsArr.map(async (r: any) => {
//                     const translatedComment = await translateText(r.comment, "en");
//                     return {
//                       ...r,
//                       comment_en: translatedComment,
//                     };
//                   })
//                 );
//               }

//               if (isCurrentFetchValid) {
//                 setApiReviews(reviewsArr);
//               }
//             }
//           } catch (error) {
//             console.error("Gagal menarik data ulasan:", error);
//           }
//         };

//         const checkWishlistStatus = async () => {
//           const token = localStorage.getItem("user_token");
//           if (!token) return;
//           try {
//             const res = await fetch(`${BASE_URL}/api/wishlists`, {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 Accept: "application/json",
//               },
//             });
//             if (res.ok) {
//               const data = await res.json();
//               if (isCurrentFetchValid) {
//                 const isWished = data.some((item: any) => item.product_id === activeProduct!.id);
//                 setIsFavorited(isWished);
//               }
//             }
//           } catch (error) {
//              console.error("Gagal memeriksa wishlist:", error);
//           }
//         };

//         Promise.all([fetchReviews(), checkWishlistStatus()]).finally(() => {
//             if (isCurrentFetchValid) setIsFetchingFull(false);
//         });
//       }

//       if (isCurrentFetchValid && !activeProduct) {
//         setLoading(false);
//       }
//     };

//     loadProductData();

//     return () => {
//       isCurrentFetchValid = false;
//     };
//   }, [slug, navigate, location.state, lang]); // [PERBAIKAN] Tambahkan 'lang' agar mendeteksi perubahan bahasa untuk re-translate

//   const handleToggleWishlist = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         text: t("login_required_desc"),
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#059669",
//         cancelButtonColor: "#d33",
//         confirmButtonText: t("to_login_page"),
//         cancelButtonText: t("cancel"),
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ product_id: product?.id }), 
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(angka);
//   };

//   const triggerFlyingAnimation = () => {
//     const startEl = document.getElementById("product-image");
//     const endEl = document.getElementById("cart-icon");

//     if (startEl && endEl && gallery.length > 0) {
//       const startRect = startEl.getBoundingClientRect();
//       const endRect = endEl.getBoundingClientRect();

//       const flyingImg = document.createElement("img");
//       flyingImg.src = gallery[currentImageIndex];
//       flyingImg.style.position = "fixed";
//       flyingImg.style.top = `${startRect.top}px`;
//       flyingImg.style.left = `${startRect.left}px`;
//       flyingImg.style.width = `${startRect.width}px`;
//       flyingImg.style.height = `${startRect.height}px`;
//       flyingImg.style.borderRadius = "10%";
//       flyingImg.style.zIndex = "9999";
//       flyingImg.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//       document.body.appendChild(flyingImg);

//       requestAnimationFrame(() => {
//         flyingImg.style.top = `${endRect.top + 10}px`;
//         flyingImg.style.left = `${endRect.left + 10}px`;
//         flyingImg.style.width = "20px";
//         flyingImg.style.height = "20px";
//         flyingImg.style.opacity = "0.2";
//         flyingImg.style.borderRadius = "50%";
//       });

//       setTimeout(() => {
//         flyingImg.remove();
//         endEl.classList.add("scale-125");
//         setTimeout(() => endEl.classList.remove("scale-125"), 200);
//       }, 800);
//     }
//   };

//   const handleAddToCart = () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         text: t("login_required_desc"),
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: t("to_login_page"),
//       }).then(() => navigate("/login"));
//       return;
//     }

//     const previousCartState = [...cartItems];
//     const optimisticItem = {
//       id: Date.now(),
//       product_id: product!.id,
//       quantity: quantity,
//       gross_amount: quantity * product!.price,
//       color: null,
//       product: {
//         id: product!.id,
//         name: product!.name,
//         price: product!.price,
//         discount_price: product!.price,
//         image_url: product!.image_url,
//         sku: product!.sku,
//         stock: product!.stock,
//         color: "",
//       },
//     };

//     addCartItemOptimistically(optimisticItem);
//     triggerFlyingAnimation();
//     Swal.fire({
//       title: t("added_to_cart"),
//       icon: "success",
//       toast: true,
//       position: "top-end",
//       timer: 1500,
//       showConfirmButton: false,
//     });

//     fetch(`${BASE_URL}/api/carts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         product_id: product?.id, 
//         quantity: quantity,
//         color: null,
//       }),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (res.ok && data.cart_id) {
//           fetchCart();
//         } else {
//           revertCartItems(previousCartState);
//           Swal.fire("Error", data.message || "Gagal menambahkan produk", "warning");
//         }
//       })
//       .catch(() => {
//         revertCartItems(previousCartState);
//         console.error("Gagal terhubung ke server saat add to cart");
//       });
//   };

//   const handleBuyItNow = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         icon: "info",
//         confirmButtonColor: "#059669",
//       }).then(() => navigate("/login"));
//       return;
//     }

//     setIsBuyingNow(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: null,
//         }),
//       });
//       const data = await res.json();

//       if (res.ok && data.cart_id) {
//         fetchCart();
//         navigate("/checkout", { state: { selectedIds: [data.cart_id] } });
//       } else {
//         Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsBuyingNow(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value;
//     if (val === "" || /^\d+$/.test(val)) {
//       setQuantityInput(val);
//     }
//   };

//   const handleInputBlur = () => {
//     let parsed = parseInt(quantityInput);
//     if (isNaN(parsed) || parsed < 1) parsed = 1;
//     if (product && parsed > product.stock) {
//       parsed = product.stock;
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "warning",
//         title: t("product_max_stock_toast", { stock: product.stock.toString() }),
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     }
//     setQuantityInput(parsed.toString());
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;
//   const isFormDisabled = isOutOfStock || isBuyingNow;

//   const handleShare = async () => {
//     const shareData = {
//       title: product?.name,
//       text: `Cek produk keren ini dari Gycora: ${product?.name}`,
//       url: window.location.href,
//     };

//     if (navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch (err) {
//         console.error("Gagal membagikan:", err);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "success",
//         title: t("product_share_toast"),
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };

//   const isEtherealBrush = product.name.toLowerCase().includes("ethereal glow brush");
//   const isScalpCare = product.name.toLowerCase().includes("scalp");

//   // [BARU] Memetakan data review API dan memilih field komentar berdasarkan bahasa yang aktif
//   const formattedApiReviews = apiReviews.map((r: any) => ({
//       name: r.user?.first_name ? `${r.user.first_name} ${r.user.last_name || ''}` : "Gycora Customer",
//       text: lang === "en" ? (r.comment_en || r.comment) : r.comment, // Gunakan teks translasi jika ada
//       rating: r.rating || 5, 
//       is_verified: true
//   }));

//   const brushReviews = [
//     { name: "Claudiasunshinee", text: t("review_brush_1"), rating: 5, is_verified: true },
//     { name: "Nilasetiobudii", text: t("review_brush_2"), rating: 5, is_verified: true },
//     { name: "Thaliastanley___", text: t("review_brush_3"), rating: 5, is_verified: true },
//     { name: "Herlenasutanto", text: t("review_brush_4"), rating: 5, is_verified: true },
//     { name: "Anitaa_bee", text: t("review_brush_5"), rating: 5, is_verified: true },
//   ];

//   const scalpReviews = [
//     { name: "v*****b", text: t("review_scalp_1"), rating: 5, is_verified: true },
//   ];

//   const staticReviews = isEtherealBrush ? brushReviews : isScalpCare ? scalpReviews : [];
//   const activeReviews = [...formattedApiReviews, ...staticReviews];

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white animate-fade-in">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          
//           {/* BAGIAN KIRI: GAMBAR */}
//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div
//               id="product-image"
//               className="relative flex items-center justify-center p-4 overflow-hidden border border-gray-100 group bg-gray-50/50 rounded-3xl aspect-square md:p-8"
//             >
//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-contain object-center w-full h-full p-4 md:p-8 transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
//                     />
//                   ))}
                  
//                   {gallery.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                         </svg>
//                       </button>
                      
//                       <button
//                         onClick={nextImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                         </svg>
//                       </button>
                      
//                       <div className="absolute left-0 right-0 z-30 flex items-center justify-center gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => setCurrentImageIndex(idx)}
//                             className={`h-2 rounded-full transition-all shadow-sm focus:outline-none ${idx === currentImageIndex ? "bg-[#006A4E] w-6" : "bg-gray-300 hover:bg-gray-400 w-2"}`}
//                             aria-label={`Lihat gambar ke-${idx + 1}`}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">
//                   {t("no_image")}
//                 </div>
//               )}
              
//               <div className="absolute z-30 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
//                   {t("product_video_demo")}
//                 </h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video
//                     src={product.variant_video}
//                     controls
//                     className="object-contain w-full h-64 md:h-80"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* BAGIAN KANAN: DETAIL PRODUK */}
//           <div className="flex flex-col justify-center">
//             <div className="flex items-start justify-between gap-4 mb-2">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
//                 {product.name}
//               </h1>
//               <div className="flex items-center gap-2 shrink-0">
//                 <button
//                   onClick={handleShare}
//                   className="flex items-center justify-center w-12 h-12 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:text-[#006A4E]"
//                   title="Bagikan Produk"
//                 >
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={handleToggleWishlist}
//                   className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                   title="Simpan ke Favorit"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {isEtherealBrush && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 {t("brush_tagline")}
//               </h2>
//             )}
//             {isScalpCare && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 {t("scalp_tagline")}
//               </h2>
//             )}

//             <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
//             <div className="mb-8">
//               {product.discount_price && product.discount_price > 0 ? (
//                 <div className="flex flex-col">
//                   <span className="text-2xl text-gray-400 line-through">
//                     {formatRupiah(product.price)}
//                   </span>
//                   <span className="text-4xl font-extrabold text-red-600">
//                     {formatRupiah(product.discount_price)}
//                   </span>
//                 </div>
//               ) : (
//                 <p className="text-4xl font-extrabold text-[#006A4E]">
//                   {formatRupiah(product.price)}
//                 </p>
//               )}
//             </div>

//             <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">
//               {siblingColors.length > 0 && (
//                 <div className="pb-6 mb-6 border-b border-gray-200">
//                   <h3 className="mb-3 text-sm font-bold text-gray-700">
//                     {t("select_variant")}
//                   </h3>
//                   <div className="flex flex-wrap gap-3">
//                     {siblingColors.map((sibling) => {
//                       const isCurrentProduct = sibling.id === product.id;
//                       return (
//                         <button
//                           key={sibling.id}
//                           onClick={() => {
//                             if (!isCurrentProduct) {
//                               window.scrollTo({ top: 0, behavior: "smooth" });
//                               navigate(`/product/${sibling.slug}`, {
//                                   state: { 
//                                     initialProduct: sibling,
//                                     allProducts: location.state?.allProducts || siblingColors
//                                   },
//                                 });
//                             }
//                           }}
//                           className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${
//                             isCurrentProduct
//                               ? "border-[#006A4E] ring-2 ring-[#006A4E]/30 scale-105 cursor-default"
//                               : "border-gray-200 hover:border-gray-300 hover:scale-105 cursor-pointer bg-white"
//                           }`}
//                           title={`Lihat varian ${extractColorName(sibling.name)}`}
//                         >
//                           <span
//                             className="w-5 h-5 border border-gray-300 rounded-full shadow-inner"
//                             style={{ backgroundColor: extractColorHex(sibling.name) }}
//                           ></span>
//                           <span className={`text-xs font-bold ${isCurrentProduct ? "text-[#006A4E]" : "text-gray-700"}`}>
//                             {extractColorName(sibling.name)}
//                           </span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center justify-between w-full overflow-hidden bg-white border border-gray-300 h-14 rounded-xl">
//                   <button
//                     onClick={() => {
//                       const newVal = Math.max(1, quantity - 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     -
//                   </button>

//                   <input
//                     type="text"
//                     value={quantityInput}
//                     onChange={handleInputChange}
//                     onBlur={handleInputBlur}
//                     disabled={isFormDisabled}
//                     className="w-full h-full font-bold text-center text-gray-900 bg-transparent outline-none appearance-none focus:ring-0"
//                   />

//                   <button
//                     onClick={() => {
//                       const newVal = Math.min(product.stock, quantity + 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-white border-[#006A4E] text-[#006A4E] hover:bg-emerald-50 active:scale-95"
//                     }`}
//                   >
//                     {t("add_to_cart")}
//                   </button>

//                   <button
//                     onClick={handleBuyItNow}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-[#006A4E] text-white hover:bg-emerald-900 shadow-[0_4px_14px_0_rgba(0,106,78,0.39)] hover:-translate-y-0.5 active:scale-95"
//                     }`}
//                   >
//                     {isBuyingNow ? t("product_cart_processing") : isOutOfStock ? t("out_of_stock") : t("buy_it_now")}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* ==============================================================
//                 BAGIAN TAB (DESCRIPTION | HOW TO USE | FAQ | REVIEW) 
//             ============================================================== */}
//             <div className="mt-4">
//               <div className="flex flex-wrap gap-2 pb-4 mb-6 border-b border-gray-100">
//                 <button
//                   onClick={() => setActiveTab("desc")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "desc" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("description")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("how-to-use")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "how-to-use" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("how_to_use")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("faq")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "faq" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("faq")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("review")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "review" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("review")}
//                 </button>
//               </div>

//               <div className="text-gray-600 prose-sm prose whitespace-pre-wrap sm:prose max-w-none min-h-[200px]">
                
//                 {/* KONTEN TAB: DESCRIPTION */}
//                 {activeTab === "desc" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <p>{t("brush_desc_p1")}</p>
//                         <p>{t("brush_desc_p2")}</p>
//                         <p>{t("brush_desc_p3")}</p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">{t("brush_benefits_title")}</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_1_bold")}</strong>{t("brush_benefit_1_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_2_bold")}</strong>{t("brush_benefit_2_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_3_bold")}</strong>{t("brush_benefit_3_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_4_bold")}</strong>{t("brush_benefit_4_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_5_bold")}</strong>{t("brush_benefit_5_text")}</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("brush_suitable_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("brush_suitable_1")}</li>
//                               <li>{t("brush_suitable_2")}</li>
//                               <li>{t("brush_suitable_3")}</li>
//                               <li>{t("brush_suitable_4")}</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("brush_specs_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("brush_specs_1")}</li>
//                               <li>{t("brush_specs_2")}</li>
//                               <li>{t("brush_specs_3")}</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <p>{t("scalp_desc_p1")}</p>
//                         <p>{t("scalp_desc_p2")}</p>
//                         <p>{t("scalp_desc_p3")}</p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">{t("scalp_benefits_title")}</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_1_bold")}</strong>{t("scalp_benefit_1_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_2_bold")}</strong>{t("scalp_benefit_2_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_3_bold")}</strong>{t("scalp_benefit_3_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_4_bold")}</strong>{t("scalp_benefit_4_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_5_bold")}</strong>{t("scalp_benefit_5_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_6_bold")}</strong>{t("scalp_benefit_6_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_7_bold")}</strong>{t("scalp_benefit_7_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_8_bold")}</strong>{t("scalp_benefit_8_text")}</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("scalp_suitable_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("scalp_suitable_1")}</li>
//                               <li>{t("scalp_suitable_2")}</li>
//                               <li>{t("scalp_suitable_3")}</li>
//                               <li>{t("scalp_suitable_4")}</li>
//                               <li>{t("scalp_suitable_5")}</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("scalp_specs_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("scalp_specs_1")}</li>
//                               <li>{t("scalp_specs_2")}</li>
//                               <li>{t("scalp_specs_3")}</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : (
//                       isFetchingFull && !product.description ? (
//                         <div className="space-y-2 animate-pulse">
//                           <div className="w-full h-3 bg-gray-200 rounded"></div>
//                           <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
//                           <div className="w-4/6 h-3 bg-gray-200 rounded"></div>
//                         </div>
//                       ) : (
//                         product.description || <p className="italic text-gray-400">{t("product_desc_empty")}</p>
//                       )
//                     )}
//                   </div>
//                 )}

//                 {/* KONTEN TAB: HOW TO USE */}
//                 {activeTab === "how-to-use" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     <h4 className="font-bold text-gray-900">{t("guide_title")}</h4>
//                     {isEtherealBrush ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>{t("brush_guide_1")}</li>
//                         <li>{t("brush_guide_2")}</li>
//                         <li>{t("brush_guide_3")}</li>
//                         <li>{t("brush_guide_4")}</li>
//                       </ul>
//                     ) : isScalpCare ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>{t("scalp_guide_1")}</li>
//                         <li>{t("scalp_guide_2")}</li>
//                         <li>{t("scalp_guide_3")}</li>
//                       </ul>
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_guide_empty")}</p>
//                     )}
//                   </div>
//                 )}

//                 {/* KONTEN TAB: FAQ */}
//                 {activeTab === "faq" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <div>
//                           <h5 className="font-bold text-gray-900">{t("brush_faq_q1")}</h5>
//                           <p className="mt-1">{t("brush_faq_a1")}</p>
//                         </div>
//                         <div>
//                           <h5 className="font-bold text-gray-900">{t("brush_faq_q2")}</h5>
//                           <p className="mt-1">{t("brush_faq_a2")}</p>
//                         </div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <div>
//                           <h5 className="font-bold text-gray-900">{t("scalp_faq_q1")}</h5>
//                           <p className="mt-1">{t("scalp_faq_a1")}</p>
//                         </div>
//                         <div>
//                           <h5 className="font-bold text-gray-900">{t("scalp_faq_q2")}</h5>
//                           <p className="mt-1">{t("scalp_faq_a2")}</p>
//                         </div>
//                       </>
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_faq_empty")}</p>
//                     )}
//                   </div>
//                 )}
                
//                 {/* KONTEN TAB: REVIEW */}
//                 {activeTab === "review" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {activeReviews.length > 0 ? (
//                       activeReviews.map((review, index) => (
//                         <div key={index} className="pb-4 border-b border-gray-100">
//                           <div className="flex items-center gap-2 mb-2">
//                             <div className="flex text-xs text-amber-400">
//                               {[...Array(review.rating || 5)].map((_, i) => (
//                                  <span key={i}>★</span>
//                               ))}
//                             </div>
//                             <span className="font-bold text-gray-900">{review.name}</span>
//                             {review.is_verified && (
//                               <span className="px-2 py-0.5 ml-2 text-[10px] font-bold text-[#006A4E] bg-emerald-50 rounded-full">
//                                 {t("product_verified_buyer")}
//                               </span>
//                             )}
//                           </div>
//                           <p className="text-gray-600 whitespace-pre-line">"{review.text}"</p>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_review_empty")}</p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useCart } from "../../../context/CartContext";
import { BASE_URL } from "../../../config/api";
import { useLanguage } from "../../../context/LanguageContext";

const colorMapHex: Record<string, string> = {
  Black: "#000000", White: "#FFFFFF", Brown: "#8B4513", Beige: "#F5F5DC",
  Red: "#8B0000", Navy: "#000080", Green: "#008000", Grey: "#808080",
  Pink: "#FFC0CB", Yellow: "#FFD700", Blue: "#4169E1", Mocca: "#967969",
  Cream: "#FDF4E3", Sage: "#9DC183", Gold: "#D4AF37", Orange: "#FF9900",
  Silver: "#C0C0C0", Maroon: "#800000", Olive: "#808000", Taupe: "#483C32",
  Khaki: "#F0E68C", Mustard: "#FFDB58", Emerald: "#50C878", Coral: "#FF7F50",
  Mint: "#98FF98", Teal: "#008080", Cyan: "#00FFFF", Indigo: "#4B0082",
  Violet: "#EE82EE", Purple: "#800080", Magenta: "#FF00FF", Lilac: "#C8A2C8",
  Lavender: "#E6E6FA", Rose: "#FF007F", Peach: "#FFE5B4", Apricot: "#FBCEB1",
  Ivory: "#FFFFF0", Tan: "#D2B48C", Charcoal: "#36454F", Ash: "#555555",
  Platinum: "#E5E4E2", Bronze: "#CD7F32", Copper: "#B87333", Rust: "#B7410E",
  Ochre: "#CC7722", Sienna: "#882D17", Terracotta: "#E2725B", Amber: "#FFBF00",
  Caramel: "#FFD59A", Honey: "#FFC30B", Chestnut: "#954535", Walnut: "#5C4033",
  Mahogany: "#C04000", Chocolate: "#7B3F00", Cocoa: "#D2691E", Coffee: "#6F4E37",
  Mocha: "#493D26", Espresso: "#4B3621", Cappuccino: "#654321", Latte: "#C5A059",
  Macchiato: "#8B5A2B", Almond: "#EED9C4", Hazelnut: "#C4A484", Pecan: "#8A3324",
  Pistachio: "#93C572", Seafoam: "#9FE2BF", Turquoise: "#40E0D0", Aqua: "#00FFFF",
  Azure: "#00FFFF", Sky: "#87CEEB", Cerulean: "#007BA7", Cobalt: "#0047AB",
  Sapphire: "#0F52BA", Ultramarine: "#120A8F", Lapis: "#26619C", Denim: "#1560BD",
  Steel: "#4682B4", Slate: "#708090", Gunmetal: "#2a3439", Onyx: "#353839",
  Jet: "#343434", Ebony: "#555D50", Raven: "#050301", Pitch: "#000000",
  Obsidian: "#0B0B0B", Carbon: "#333333", Graphite: "#383838", Pewter: "#8E8E8E",
  Zinc: "#8C92AC", Lead: "#778899", Iron: "#A19D94", Titanium: "#878681",
  Chromium: "#C0C0C0", Nickel: "#727472", Tungsten: "#A0A0A0", Fuchsia: "#FF00FF",
  Crimson: "#DC143C", Carmine: "#960018", Ruby: "#E0115F", Scarlet: "#FF2400",
  Vermilion: "#E34234", Brick: "#CB4154", Tomato: "#FF6347", Papaya: "#FFEFD5",
  Melon: "#FDBCB4", Mango: "#F4A460", Citrus: "#FFA500", Lemon: "#FFF700",
  Lime: "#BFFF00", Kiwi: "#8EE53F", Apple: "#8DB600", Pear: "#D1E231",
  Grape: "#6F2DA8", Plum: "#8E4585", Blackberry: "#4D0135", Mulberry: "#C54B8C",
  Raisin: "#652DC1", Eggplant: "#614051", Aubergine: "#472C4C", Amethyst: "#9966CC",
  Orchid: "#DA70D6", Heather: "#D473D4", Thistle: "#D8BFD8", Mauve: "#E0B0FF",
  Wisteria: "#C9A0DC", Periwinkle: "#CCCCFF", Cornflower: "#6495ED", Baby: "#89CFF0",
  Powder: "#B0E0E6", Midnight: "#191970", Ocean: "#0077BE",
};

const extractColorName = (fullName: string) => {
  if (!fullName) return "Main";
  const words = fullName.trim().split(" ");
  const lastWord = words[words.length - 1];
  return lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
};

const extractColorHex = (fullName: string) => {
  const colorName = extractColorName(fullName);
  return colorMapHex[colorName] || "#cccccc";
};

// Fungsi utilitas untuk translasi teks dinamis dari API Review secara real-time
// const translateText = async (text: string, langTo: string): Promise<string> => {
//   if (!text) return "";
//   try {
//     const response = await fetch(
//       `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=id|${langTo}`
//     );
//     const data = await response.json();
//     if (data && data.responseData && data.responseData.translatedText) {
//       return data.responseData.translatedText;
//     }
//     return text;
//   } catch (error) {
//     console.error("Gagal menerjemahkan teks ulasan API:", error);
//     return text;
//   }
// };

// Fungsi utilitas untuk translasi teks dinamis dari API secara real-time
const translateText = async (text: string, langTo: string): Promise<string> => {
  if (!text) return "";
  try {
    // Tambahkan parameter email Anda di &de= untuk menambah limit gratis harian
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=id|${langTo}&de=admin@gycora.com`
    );
    const data = await response.json();
    
    if (data && data.responseData && data.responseData.translatedText) {
      const translated = data.responseData.translatedText;
      
      // Deteksi jika API mengirimkan pesan warning karena limit habis
      if (translated.includes("MYMEMORY WARNING")) {
        console.warn("Limit API Translate habis, fallback ke teks asli.");
        return text; // Tampilkan teks asli agar web tidak rusak
      }
      
      return translated;
    }
    return text;
  } catch (error) {
    console.error("Gagal menerjemahkan teks API:", error);
    return text;
  }
};

interface Product {
  id: number;
  category_id: number;
  category_name: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  benefits: string;
  price: number;
  discount_price: number;
  voucher_discount_price?: number;
  stock: number;
  image_url: string;
  variant_images?: string[];
  variant_video?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  color?: any[];
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, lang } = useLanguage(); 

  const initialPassedData = location.state?.initialProduct;
  const [product, setProduct] = useState<Product | null>(initialPassedData || null);
  
  const [loading, setLoading] = useState(!initialPassedData);
  const [isFetchingFull, setIsFetchingFull] = useState(!initialPassedData);

  const [quantityInput, setQuantityInput] = useState<string>("1");
  const quantity = parseInt(quantityInput) || 1;

  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [siblingColors, setSiblingColors] = useState<Product[]>([]);
  const [isFavorited, setIsFavorited] = useState(false);
  
  const [activeTab, setActiveTab] = useState("desc");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [apiReviews, setApiReviews] = useState<any[]>([]);

  const { fetchCart, cartItems, addCartItemOptimistically, revertCartItems } = useCart();

  const fetchSiblingColorsViaAPI = async (productName: string) => {
    if (!productName) return;
    try {
      const words = productName.trim().split(" ");
      let rootName = productName;

      if (words.length > 1) {
        words.pop();
        rootName = words.join(" ");
      }

      const res = await fetch(`${BASE_URL}/api/products`);
      const data = await res.json();
      const allProducts = data.data ? data.data : data;

      const siblings = allProducts.filter((p: Product) =>
        p.name.toLowerCase().includes(rootName.toLowerCase()),
      );

      if (siblings.length <= 1) {
        setSiblingColors([]);
      } else {
        setSiblingColors(siblings);
      }
    } catch (error) {
      console.error("Gagal menarik data varian warna:", error);
    }
  };

  useEffect(() => {
    let isCurrentFetchValid = true;
    const allPassedProducts = location.state?.allProducts;

    setCurrentImageIndex(0);
    setQuantityInput("1");
    setActiveTab("desc");

    const loadProductData = async () => {
      let activeProduct: Product | null = location.state?.initialProduct || null;

      if (activeProduct) {
        if (isCurrentFetchValid) {
          setProduct(activeProduct);
          setLoading(false); 
        }

        if (allPassedProducts && allPassedProducts.length > 0) {
          const words = activeProduct.name.trim().split(" ");
          let rootName = activeProduct.name;
          if (words.length > 1) {
            words.pop();
            rootName = words.join(" ");
          }
          const localSiblings = allPassedProducts.filter((p: Product) =>
            p.name.toLowerCase().includes(rootName.toLowerCase())
          );
          if (localSiblings.length > 1 && isCurrentFetchValid) {
            setSiblingColors(localSiblings);
          }
        } else {
          await fetchSiblingColorsViaAPI(activeProduct.name);
        }
      } 
      else {
        if (isCurrentFetchValid) {
          setLoading(true);
          setIsFetchingFull(true);
        }
        try {
          const res = await fetch(`${BASE_URL}/api/products/${slug}`);
          if (!res.ok) throw new Error("Produk tidak ditemukan");
          const responseData = await res.json();

          if (isCurrentFetchValid) {
            activeProduct = responseData.data ? responseData.data : responseData;
            setProduct(activeProduct);
            await fetchSiblingColorsViaAPI(activeProduct!.name);
          }
        } catch (error) {
          if (isCurrentFetchValid) {
            console.error("Gagal memuat produk:", error);
            navigate("/products");
          }
          return;
        }
      }

      // Memisahkan pengambilan Reviews yang hanya berdasarkan slug
      if (slug && isCurrentFetchValid) {
        const fetchReviews = async () => {
          try {
            // Murni menggunakan slug untuk fetch reviews
            const res = await fetch(`${BASE_URL}/api/products/${slug}/reviews`, {
              headers: { Accept: "application/json" },
            });
            if (res.ok) {
              const data = await res.json();
              let reviewsArr = data.reviews ? data.reviews : [];

              // Menerjemahkan komentar ulasan dinamis dari database jika bahasa saat ini adalah English
              if (lang === "en" && reviewsArr.length > 0) {
                reviewsArr = await Promise.all(
                  reviewsArr.map(async (r: any) => {
                    const translatedComment = await translateText(r.comment, "en");
                    return {
                      ...r,
                      comment_en: translatedComment,
                    };
                  })
                );
              }

              if (isCurrentFetchValid) {
                setApiReviews(reviewsArr);
              }
            }
          } catch (error) {
            console.error("Gagal menarik data ulasan:", error);
          }
        };
        fetchReviews();
      }

      // Mengambil status wishlist yang membutuhkan activeProduct.id
      if (activeProduct && isCurrentFetchValid) {
        const checkWishlistStatus = async () => {
          const token = localStorage.getItem("user_token");
          if (!token) return;
          try {
            const res = await fetch(`${BASE_URL}/api/wishlists`, {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
            });
            if (res.ok) {
              const data = await res.json();
              if (isCurrentFetchValid) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const isWished = data.some((item: any) => item.product_id === activeProduct!.id);
                setIsFavorited(isWished);
              }
            }
          } catch (error) {
             console.error("Gagal memeriksa wishlist:", error);
          }
        };

        checkWishlistStatus().finally(() => {
            if (isCurrentFetchValid) setIsFetchingFull(false);
        });
      }

      if (isCurrentFetchValid && !activeProduct) {
        setLoading(false);
      }
    };

    loadProductData();

    return () => {
      isCurrentFetchValid = false;
    };
  }, [slug, navigate, location.state, lang]);

  const handleToggleWishlist = async () => {
    const token = localStorage.getItem("user_token");
    if (!token) {
      Swal.fire({
        title: t("login_required"),
        text: t("login_required_desc"),
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#059669",
        cancelButtonColor: "#d33",
        confirmButtonText: t("to_login_page"),
        cancelButtonText: t("cancel"),
      }).then((result) => {
        if (result.isConfirmed) navigate("/login");
      });
      return;
    }

    setIsFavorited(!isFavorited);
    try {
      const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({ product_id: product?.id }), 
      });
      if (!res.ok) throw new Error("Gagal");
    } catch (error) {
      setIsFavorited(!isFavorited);
      console.error(error);
    }
  };

  const gallery = useMemo(() => {
    if (!product) return [];
    const imgs = [];
    if (product.image_url) imgs.push(product.image_url);
    if (Array.isArray(product.variant_images)) {
      imgs.push(...product.variant_images);
    }
    return imgs;
  }, [product]);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const triggerFlyingAnimation = () => {
    const startEl = document.getElementById("product-image");
    const endEl = document.getElementById("cart-icon");

    if (startEl && endEl && gallery.length > 0) {
      const startRect = startEl.getBoundingClientRect();
      const endRect = endEl.getBoundingClientRect();

      const flyingImg = document.createElement("img");
      flyingImg.src = gallery[currentImageIndex];
      flyingImg.style.position = "fixed";
      flyingImg.style.top = `${startRect.top}px`;
      flyingImg.style.left = `${startRect.left}px`;
      flyingImg.style.width = `${startRect.width}px`;
      flyingImg.style.height = `${startRect.height}px`;
      flyingImg.style.borderRadius = "10%";
      flyingImg.style.zIndex = "9999";
      flyingImg.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      document.body.appendChild(flyingImg);

      requestAnimationFrame(() => {
        flyingImg.style.top = `${endRect.top + 10}px`;
        flyingImg.style.left = `${endRect.left + 10}px`;
        flyingImg.style.width = "20px";
        flyingImg.style.height = "20px";
        flyingImg.style.opacity = "0.2";
        flyingImg.style.borderRadius = "50%";
      });

      setTimeout(() => {
        flyingImg.remove();
        endEl.classList.add("scale-125");
        setTimeout(() => endEl.classList.remove("scale-125"), 200);
      }, 800);
    }
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem("user_token");
    if (!token) {
      Swal.fire({
        title: t("login_required"),
        text: t("login_required_desc"),
        icon: "info",
        confirmButtonColor: "#059669",
        confirmButtonText: t("to_login_page"),
      }).then(() => navigate("/login"));
      return;
    }

    const previousCartState = [...cartItems];
    const optimisticItem = {
      id: Date.now(),
      product_id: product!.id,
      quantity: quantity,
      gross_amount: quantity * product!.price,
      color: null,
      product: {
        id: product!.id,
        slug: product!.slug,
        name: product!.name,
        price: product!.price,
        discount_price: product!.price,
        image_url: product!.image_url,
        sku: product!.sku,
        stock: product!.stock,
        color: "",
      },
    };

    addCartItemOptimistically(optimisticItem);
    triggerFlyingAnimation();
    Swal.fire({
      title: t("added_to_cart"),
      icon: "success",
      toast: true,
      position: "top-end",
      timer: 1500,
      showConfirmButton: false,
    });

    fetch(`${BASE_URL}/api/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_id: product?.id, 
        quantity: quantity,
        color: null,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok && data.cart_id) {
          fetchCart();
        } else {
          revertCartItems(previousCartState);
          Swal.fire("Error", data.message || "Gagal menambahkan produk", "warning");
        }
      })
      .catch(() => {
        revertCartItems(previousCartState);
        console.error("Gagal terhubung ke server saat add to cart");
      });
  };

  const handleBuyItNow = async () => {
    const token = localStorage.getItem("user_token");
    if (!token) {
      Swal.fire({
        title: t("login_required"),
        icon: "info",
        confirmButtonColor: "#059669",
      }).then(() => navigate("/login"));
      return;
    }

    setIsBuyingNow(true);
    try {
      const res = await fetch(`${BASE_URL}/api/carts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product?.id,
          quantity: quantity,
          color: null,
        }),
      });
      const data = await res.json();

      if (res.ok && data.cart_id) {
        fetchCart();
        navigate("/checkout", { state: { selectedIds: [data.cart_id] } });
      } else {
        Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Gagal terhubung ke server", "error");
    } finally {
      setIsBuyingNow(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "" || /^\d+$/.test(val)) {
      setQuantityInput(val);
    }
  };

  const handleInputBlur = () => {
    let parsed = parseInt(quantityInput);
    if (isNaN(parsed) || parsed < 1) parsed = 1;
    if (product && parsed > product.stock) {
      parsed = product.stock;
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "warning",
        title: t("product_max_stock_toast", { stock: product.stock.toString() }),
        showConfirmButton: false,
        timer: 2000,
      });
    }
    setQuantityInput(parsed.toString());
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen font-sans bg-white">
        <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
      </div>
    );
  if (!product) return null;

  const isOutOfStock = product.stock <= 0;
  const isFormDisabled = isOutOfStock || isBuyingNow;

  const handleShare = async () => {
    const shareData = {
      title: product?.name,
      text: `Cek produk keren ini dari Gycora: ${product?.name}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Gagal membagikan:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: t("product_share_toast"),
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const isEtherealBrush = product.name.toLowerCase().includes("ethereal glow brush");
  const isScalpCare = product.name.toLowerCase().includes("scalp");

  // Memetakan data review API dan memilih field komentar berdasarkan bahasa yang aktif
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formattedApiReviews = apiReviews.map((r: any) => ({
      name: r.user?.first_name ? `${r.user.first_name} ${r.user.last_name || ''}` : "Gycora Customer",
      text: lang === "en" ? (r.comment_en || r.comment) : r.comment,
      rating: r.rating || 5, 
      is_verified: true
  }));

  const brushReviews = [
    { name: "Claudiasunshinee", text: t("review_brush_1"), rating: 5, is_verified: true },
    { name: "Nilasetiobudii", text: t("review_brush_2"), rating: 5, is_verified: true },
    { name: "Thaliastanley___", text: t("review_brush_3"), rating: 5, is_verified: true },
    { name: "Herlenasutanto", text: t("review_brush_4"), rating: 5, is_verified: true },
    { name: "Anitaa_bee", text: t("review_brush_5"), rating: 5, is_verified: true },
  ];

  const scalpReviews = [
    { name: "v*****b", text: t("review_scalp_1"), rating: 5, is_verified: true },
  ];

  const staticReviews = isEtherealBrush ? brushReviews : isScalpCare ? scalpReviews : [];
  const activeReviews = [...formattedApiReviews, ...staticReviews];

  return (
    <div className="min-h-screen py-12 font-sans bg-white animate-fade-in">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          
          {/* BAGIAN KIRI: GAMBAR */}
          <div className="flex flex-col mb-10 lg:mb-0">
            <div
              id="product-image"
              className="relative flex items-center justify-center p-4 overflow-hidden border border-gray-100 group bg-gray-50/50 rounded-3xl aspect-square md:p-8"
            >
              {gallery.length > 0 ? (
                <>
                  {gallery.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`${product.name} - Varian ${idx}`}
                      className={`absolute inset-0 object-contain object-center w-full h-full p-4 md:p-8 transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
                    />
                  ))}
                  
                  {gallery.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={nextImage}
                        className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      
                      <div className="absolute left-0 right-0 z-30 flex items-center justify-center gap-2 bottom-6">
                        {gallery.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`h-2 rounded-full transition-all shadow-sm focus:outline-none ${idx === currentImageIndex ? "bg-[#006A4E] w-6" : "bg-gray-300 hover:bg-gray-400 w-2"}`}
                            aria-label={`Lihat gambar ke-${idx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400">
                  {t("no_image")}
                </div>
              )}
              
              <div className="absolute z-30 top-6 left-6">
                <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
                  {product.category_name}
                </span>
              </div>
            </div>

            {product.variant_video && (
              <div className="mt-8">
                <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
                  {t("product_video_demo")}
                </h3>
                <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
                  <video
                    src={product.variant_video}
                    controls
                    className="object-contain w-full h-64 md:h-80"
                  />
                </div>
              </div>
            )}
          </div>

          {/* BAGIAN KANAN: DETAIL PRODUK */}
          <div className="flex flex-col justify-center">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center w-12 h-12 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:text-[#006A4E]"
                  title="Bagikan Produk"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
                  title="Simpan ke Favorit"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </button>
              </div>
            </div>

            {isEtherealBrush && (
              <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
                {t("brush_tagline")}
              </h2>
            )}
            {isScalpCare && (
              <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
                {t("scalp_tagline")}
              </h2>
            )}

            <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
            <div className="mb-8">
              {product.discount_price && product.discount_price > 0 ? (
                <div className="flex flex-col">
                  <span className="text-2xl text-gray-400 line-through">
                    {formatRupiah(product.price)}
                  </span>
                  <span className="text-4xl font-extrabold text-red-600">
                    {formatRupiah(product.discount_price)}
                  </span>
                </div>
              ) : (
                <p className="text-4xl font-extrabold text-[#006A4E]">
                  {formatRupiah(product.price)}
                </p>
              )}
            </div>

            <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">
              {siblingColors.length > 0 && (
                <div className="pb-6 mb-6 border-b border-gray-200">
                  <h3 className="mb-3 text-sm font-bold text-gray-700">
                    {t("select_variant")}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {siblingColors.map((sibling) => {
                      const isCurrentProduct = sibling.id === product.id;
                      return (
                        <button
                          key={sibling.id}
                          onClick={() => {
                            if (!isCurrentProduct) {
                              window.scrollTo({ top: 0, behavior: "smooth" });
                              navigate(`/product/${sibling.slug}`, {
                                  state: { 
                                    initialProduct: sibling,
                                    allProducts: location.state?.allProducts || siblingColors
                                  },
                                });
                            }
                          }}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${
                            isCurrentProduct
                              ? "border-[#006A4E] ring-2 ring-[#006A4E]/30 scale-105 cursor-default"
                              : "border-gray-200 hover:border-gray-300 hover:scale-105 cursor-pointer bg-white"
                          }`}
                          title={`Lihat varian ${extractColorName(sibling.name)}`}
                        >
                          <span
                            className="w-5 h-5 border border-gray-300 rounded-full shadow-inner"
                            style={{ backgroundColor: extractColorHex(sibling.name) }}
                          ></span>
                          <span className={`text-xs font-bold ${isCurrentProduct ? "text-[#006A4E]" : "text-gray-700"}`}>
                            {extractColorName(sibling.name)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between w-full overflow-hidden bg-white border border-gray-300 h-14 rounded-xl">
                  <button
                    onClick={() => {
                      const newVal = Math.max(1, quantity - 1);
                      setQuantityInput(newVal.toString());
                    }}
                    disabled={isFormDisabled}
                    className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
                  >
                    -
                  </button>

                  <input
                    type="text"
                    value={quantityInput}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    disabled={isFormDisabled}
                    className="w-full h-full font-bold text-center text-gray-900 bg-transparent outline-none appearance-none focus:ring-0"
                  />

                  <button
                    onClick={() => {
                      const newVal = Math.min(product.stock, quantity + 1);
                      setQuantityInput(newVal.toString());
                    }}
                    disabled={isFormDisabled}
                    className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
                  >
                    +
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={isFormDisabled}
                    className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 focus:outline-none ${
                      isOutOfStock
                        ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white border-[#006A4E] text-[#006A4E] hover:bg-emerald-50 active:scale-95"
                    }`}
                  >
                    {t("add_to_cart")}
                  </button>

                  <button
                    onClick={handleBuyItNow}
                    disabled={isFormDisabled}
                    className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all focus:outline-none ${
                      isOutOfStock
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-[#006A4E] text-white hover:bg-emerald-900 shadow-[0_4px_14px_0_rgba(0,106,78,0.39)] hover:-translate-y-0.5 active:scale-95"
                    }`}
                  >
                    {isBuyingNow ? t("product_cart_processing") : isOutOfStock ? t("out_of_stock") : t("buy_it_now")}
                  </button>
                </div>
              </div>
            </div>

            {/* ==============================================================
                BAGIAN TAB (DESCRIPTION | HOW TO USE | FAQ | REVIEW) 
            ============================================================== */}
            <div className="mt-4">
              <div className="flex flex-wrap gap-2 pb-4 mb-6 border-b border-gray-100">
                <button
                  onClick={() => setActiveTab("desc")}
                  className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
                    activeTab === "desc" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
                  }`}
                >
                  {t("description")}
                </button>
                <button
                  onClick={() => setActiveTab("how-to-use")}
                  className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
                    activeTab === "how-to-use" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
                  }`}
                >
                  {t("how_to_use")}
                </button>
                <button
                  onClick={() => setActiveTab("faq")}
                  className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
                    activeTab === "faq" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
                  }`}
                >
                  {t("faq")}
                </button>
                <button
                  onClick={() => setActiveTab("review")}
                  className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
                    activeTab === "review" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
                  }`}
                >
                  {t("review")}
                </button>
              </div>

              <div className="text-gray-600 prose-sm prose whitespace-pre-wrap sm:prose max-w-none min-h-[200px]">
                
                {/* KONTEN TAB: DESCRIPTION */}
                {activeTab === "desc" && (
                  <div className="space-y-4 animate-fade-in-up">
                    {isEtherealBrush ? (
                      <>
                        <p>{t("brush_desc_p1")}</p>
                        <p>{t("brush_desc_p2")}</p>
                        <p>{t("brush_desc_p3")}</p>
                        <div className="pt-6 mt-8 border-t border-gray-100">
                          <h4 className="mb-4 font-bold text-gray-900 text-md">{t("brush_benefits_title")}</h4>
                          <ul className="space-y-3 list-none">
                            <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_1_bold")}</strong>{t("brush_benefit_1_text")}</div></li>
                            <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_2_bold")}</strong>{t("brush_benefit_2_text")}</div></li>
                            <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_3_bold")}</strong>{t("brush_benefit_3_text")}</div></li>
                            <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_4_bold")}</strong>{t("brush_benefit_4_text")}</div></li>
                            <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_5_bold")}</strong>{t("brush_benefit_5_text")}</div></li>
                          </ul>
                        </div>
                        <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
                          <div>
                            <h4 className="mb-3 font-bold text-gray-900 text-md">{t("brush_suitable_title")}</h4>
                            <ul className="space-y-1 list-disc list-inside">
                              <li>{t("brush_suitable_1")}</li>
                              <li>{t("brush_suitable_2")}</li>
                              <li>{t("brush_suitable_3")}</li>
                              <li>{t("brush_suitable_4")}</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="mb-3 font-bold text-gray-900 text-md">{t("brush_specs_title")}</h4>
                            <ul className="space-y-1 list-disc list-inside">
                              <li>{t("brush_specs_1")}</li>
                              <li>{t("brush_specs_2")}</li>
                              <li>{t("brush_specs_3")}</li>
                            </ul>
                          </div>
                        </div>
                      </>
                    ) : isScalpCare ? (
                      <>
                        <p>{t("scalp_desc_p1")}</p>
                        <p>{t("scalp_desc_p2")}</p>
                        <p>{t("scalp_desc_p3")}</p>
                        <div className="pt-6 mt-8 border-t border-gray-100">
                          <h4 className="mb-4 font-bold text-gray-900 text-md">{t("scalp_benefits_title")}</h4>
                          <ul className="space-y-3 list-none">
                            <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_1_bold")}</strong>{t("scalp_benefit_1_text")}</div></li>
                            <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_2_bold")}</strong>{t("scalp_benefit_2_text")}</div></li>
                            <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_3_bold")}</strong>{t("scalp_benefit_3_text")}</div></li>
                            <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_4_bold")}</strong>{t("scalp_benefit_4_text")}</div></li>
                            <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_5_bold")}</strong>{t("scalp_benefit_5_text")}</div></li>
                            <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_6_bold")}</strong>{t("scalp_benefit_6_text")}</div></li>
                            <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_7_bold")}</strong>{t("scalp_benefit_7_text")}</div></li>
                            <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_8_bold")}</strong>{t("scalp_benefit_8_text")}</div></li>
                          </ul>
                        </div>
                        <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
                          <div>
                            <h4 className="mb-3 font-bold text-gray-900 text-md">{t("scalp_suitable_title")}</h4>
                            <ul className="space-y-1 list-disc list-inside">
                              <li>{t("scalp_suitable_1")}</li>
                              <li>{t("scalp_suitable_2")}</li>
                              <li>{t("scalp_suitable_3")}</li>
                              <li>{t("scalp_suitable_4")}</li>
                              <li>{t("scalp_suitable_5")}</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="mb-3 font-bold text-gray-900 text-md">{t("scalp_specs_title")}</h4>
                            <ul className="space-y-1 list-disc list-inside">
                              <li>{t("scalp_specs_1")}</li>
                              <li>{t("scalp_specs_2")}</li>
                              <li>{t("scalp_specs_3")}</li>
                            </ul>
                          </div>
                        </div>
                      </>
                    ) : (
                      isFetchingFull && !product.description ? (
                        <div className="space-y-2 animate-pulse">
                          <div className="w-full h-3 bg-gray-200 rounded"></div>
                          <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
                          <div className="w-4/6 h-3 bg-gray-200 rounded"></div>
                        </div>
                      ) : (
                        product.description || <p className="italic text-gray-400">{t("product_desc_empty")}</p>
                      )
                    )}
                  </div>
                )}

                {/* KONTEN TAB: HOW TO USE */}
                {activeTab === "how-to-use" && (
                  <div className="space-y-4 animate-fade-in-up">
                    <h4 className="font-bold text-gray-900">{t("guide_title")}</h4>
                    {isEtherealBrush ? (
                      <ul className="space-y-2 list-decimal list-inside">
                        <li>{t("brush_guide_1")}</li>
                        <li>{t("brush_guide_2")}</li>
                        <li>{t("brush_guide_3")}</li>
                        <li>{t("brush_guide_4")}</li>
                      </ul>
                    ) : isScalpCare ? (
                      <ul className="space-y-2 list-decimal list-inside">
                        <li>{t("scalp_guide_1")}</li>
                        <li>{t("scalp_guide_2")}</li>
                        <li>{t("scalp_guide_3")}</li>
                      </ul>
                    ) : (
                      <p className="italic text-gray-400">{t("product_guide_empty")}</p>
                    )}
                  </div>
                )}

                {/* KONTEN TAB: FAQ */}
                {activeTab === "faq" && (
                  <div className="space-y-6 animate-fade-in-up">
                    {isEtherealBrush ? (
                      <>
                        <div>
                          <h5 className="font-bold text-gray-900">{t("brush_faq_q1")}</h5>
                          <p className="mt-1">{t("brush_faq_a1")}</p>
                        </div>
                        <div>
                          <h5 className="font-bold text-gray-900">{t("brush_faq_q2")}</h5>
                          <p className="mt-1">{t("brush_faq_a2")}</p>
                        </div>
                      </>
                    ) : isScalpCare ? (
                      <>
                        <div>
                          <h5 className="font-bold text-gray-900">{t("scalp_faq_q1")}</h5>
                          <p className="mt-1">{t("scalp_faq_a1")}</p>
                        </div>
                        <div>
                          <h5 className="font-bold text-gray-900">{t("scalp_faq_q2")}</h5>
                          <p className="mt-1">{t("scalp_faq_a2")}</p>
                        </div>
                      </>
                    ) : (
                      <p className="italic text-gray-400">{t("product_faq_empty")}</p>
                    )}
                  </div>
                )}
                
                {/* KONTEN TAB: REVIEW */}
                {activeTab === "review" && (
                  <div className="space-y-6 animate-fade-in-up">
                    {activeReviews.length > 0 ? (
                      activeReviews.map((review, index) => (
                        <div key={index} className="pb-4 border-b border-gray-100">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex text-xs text-amber-400">
                              {[...Array(review.rating || 5)].map((_, i) => (
                                 <span key={i}>★</span>
                              ))}
                            </div>
                            <span className="font-bold text-gray-900">{review.name}</span>
                            {review.is_verified && (
                              <span className="px-2 py-0.5 ml-2 text-[10px] font-bold text-[#006A4E] bg-emerald-50 rounded-full">
                                {t("product_verified_buyer")}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 whitespace-pre-line">"{review.text}"</p>
                        </div>
                      ))
                    ) : (
                      <p className="italic text-gray-400">{t("product_review_empty")}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}