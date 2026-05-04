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

import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import Swal from "sweetalert2";
import { useCart } from "../../../context/CartContext"; 
import { BASE_URL } from "../../../config/api";

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
  stock: number;
  image_url: string;
  variant_images?: string[]; 
  variant_video?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  color?: any[];
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate(); 
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  // State untuk Quantity
  const [quantityInput, setQuantityInput] = useState<string>("1");
  const quantity = parseInt(quantityInput) || 1;

  const [isBuyingNow, setIsBuyingNow] = useState(false); 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // [BARU] State untuk menyimpan produk saudara (varian)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [relatedVariants, setRelatedVariants] = useState<any[]>([]);

  const [isFavorited, setIsFavorited] = useState(false);
  const { fetchCart, cartItems, addCartItemOptimistically, revertCartItems } = useCart(); 

  useEffect(() => {
    // Reset state ketika ID URL berubah
    setLoading(true);
    setProduct(null);
    setCurrentImageIndex(0);
    setQuantityInput("1");

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products/${id}`);
        if (!res.ok) throw new Error("Produk tidak ditemukan");
        const responseData = await res.json();
        
        const productObject = responseData.data ? responseData.data : responseData;
        setProduct(productObject);
      } catch (error) {
        console.error("Gagal memuat produk:", error);
        navigate("/products");
      }
    };

    const fetchVariants = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products/${id}/variants`);
        if (res.ok) {
           const data = await res.json();
           setRelatedVariants(data.variants || []);
        }
      } catch (error) {
        console.error("Gagal memuat produk terkait:", error);
      }
    };

    const checkWishlistStatus = async () => {
      const token = localStorage.getItem("user_token");
      if (!token) return;

      try {
        const res = await fetch(`${BASE_URL}/api/wishlists`, {
          headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
        });
        if (res.ok) {
          const data = await res.json();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const isWished = data.some((item: any) => item.product_id === Number(id));
          setIsFavorited(isWished);
        }
      } catch (error) {
        console.error("Gagal memeriksa wishlist:", error);
      }
    };

    if (id) {
      Promise.all([fetchProduct(), fetchVariants(), checkWishlistStatus()]).finally(() => {
        setLoading(false);
      });
    }
  }, [id, navigate]);

  const handleToggleWishlist = async () => {
    const token = localStorage.getItem("user_token");
    if (!token) {
      Swal.fire({
        title: "Login Diperlukan",
        text: "Silakan masuk ke akun Anda untuk menyimpan produk ke favorit.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#059669",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ke Halaman Login",
        cancelButtonText: "Batal"
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
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        },
        body: JSON.stringify({ product_id: product?.id })
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
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
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

  // [PERBAIKAN] Hapus dependency color, AddToCart langsung melempar base product id
  const handleAddToCart = () => {
    const token = localStorage.getItem("user_token");
    if (!token) {
      Swal.fire({ title: "Login Diperlukan", text: "Silakan masuk ke akun Anda untuk mulai berbelanja.", icon: "info", confirmButtonColor: "#059669", confirmButtonText: "Ke Halaman Login" }).then(() => navigate("/login"));
      return;
    }

    const previousCartState = [...cartItems];
    const optimisticItem = {
      id: Date.now(), 
      product_id: product!.id,
      quantity: quantity,
      gross_amount: quantity * product!.price,
      // Color dihapus dari keranjang karena sekarang beda warna = beda product_id
      color: null, 
      product: {
        id: product!.id,
        name: product!.name,
        price: product!.price,
        image_url: product!.image_url,
        sku: product!.sku,
        stock: product!.stock,
        color: "" 
      }
    };
    
    addCartItemOptimistically(optimisticItem);
    triggerFlyingAnimation();
    Swal.fire({ title: "Ditambahkan!", icon: "success", toast: true, position: "top-end", timer: 1500, showConfirmButton: false });

    fetch(`${BASE_URL}/api/carts`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ product_id: product?.id, quantity: quantity, color: null })
    })
    .then(async (res) => {
      const data = await res.json();
      if (res.ok && data.cart_id) {
        fetchCart(); 
      } else {
        revertCartItems(previousCartState);
        Swal.fire("Pemberitahuan", data.message || "Gagal menambahkan produk ke keranjang.", "warning");
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
      Swal.fire({ title: "Login Diperlukan", icon: "info", confirmButtonColor: "#059669" }).then(() => navigate("/login"));
      return;
    }

    setIsBuyingNow(true);
    try {
      const res = await fetch(`${BASE_URL}/api/carts`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ product_id: product?.id, quantity: quantity, color: null })
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
      Swal.fire({ toast: true, position: 'top-end', icon: 'warning', title: `Maksimal stok adalah ${product.stock}`, showConfirmButton: false, timer: 2000 });
    }
    setQuantityInput(parsed.toString());
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen font-sans bg-white"><div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div></div>;
  if (!product) return null;
  
  const isOutOfStock = product.stock <= 0;
  const isFormDisabled = isOutOfStock || isBuyingNow;

  return (
    <div className="min-h-screen py-12 font-sans bg-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          
          <div className="flex flex-col mb-10 lg:mb-0">
            <div id="product-image" className="relative group bg-gray-50 rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-[4/5] border border-gray-100 flex items-center justify-center">
              {gallery.length > 0 ? (
                <>
                  {gallery.map((src, idx) => (
                    <img 
                      key={idx}
                      src={src} 
                      alt={`${product.name} - Varian ${idx}`} 
                      className={`absolute inset-0 object-cover object-center w-full h-full transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    />
                  ))}
                  {gallery.length > 1 && (
                    <>
                      <button onClick={prevImage} className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      <button onClick={nextImage} className="absolute z-20 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </button>
                      <div className="absolute z-20 flex gap-2 bottom-6">
                        {gallery.map((_, idx) => (
                          <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`h-2 rounded-full transition-all shadow-sm ${idx === currentImageIndex ? 'bg-gycora w-6' : 'bg-white/80 hover:bg-white w-2'}`} />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400">No Image</div>
              )}
              <div className="absolute z-20 top-6 left-6">
                <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
                  {product.category_name}
                </span>
              </div>
            </div>

            {product.variant_video && (
              <div className="mt-8">
                <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">Video Demo</h3>
                <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
                  <video src={product.variant_video} controls className="object-contain w-full h-64 md:h-80" />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
             <div className="flex items-start justify-between gap-4 mb-2">
               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">{product.name}</h1>
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

             <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
             <div className="mb-8"><p className="text-4xl font-extrabold text-gycora">{formatRupiah(product.price)}</p></div>

             <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">
               
               {/* ========================================================= */}
               {/* [BARU] LOGIKA VARIAN PRODUK LAIN (NAVIGASI) */}
               {/* ========================================================= */}
               {relatedVariants.length > 0 && (
                 <div className="pb-6 mb-6 border-b border-gray-200">
                   <h3 className="mb-3 text-sm font-bold text-gray-700">Pilih Varian Warna:</h3>
                   <div className="flex flex-wrap gap-3">
                     {relatedVariants.map((variant) => {
                       
                       // Ekstrak Hex dan Name dari JSON array `color`
                       let hex = "#ddd";
                       let name = "";
                       
                       if (Array.isArray(variant.color) && variant.color.length > 0) {
                         const firstColor = variant.color[0];
                         hex = typeof firstColor === 'string' ? firstColor : (firstColor.hex || hex);
                         name = typeof firstColor === 'string' ? '' : (firstColor.name || '');
                       }

                       // Cek apakah kotak yang diloop adalah produk yang sedang dibuka
                       const isCurrentProduct = variant.id === product.id;

                       return (
                         <button
                           key={variant.id}
                           onClick={() => {
                             if (!isCurrentProduct) {
                               // NAVIGASI ke URL produk saudara
                               navigate(`/product/${variant.id}`);
                             }
                           }}
                           className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${
                             isCurrentProduct 
                              ? 'border-gycora ring-2 ring-gycora/30 scale-105 cursor-default' 
                              : 'border-gray-200 hover:border-gray-300 hover:scale-105 cursor-pointer bg-white'
                            }`}
                           title={`Lihat varian ${name || variant.name}`}
                         >
                           <span className="w-5 h-5 border border-gray-300 rounded-full shadow-inner" style={{ backgroundColor: hex }}></span>
                           {/* Jika nama warnanya kosong di DB, ambil dari kata terakhir nama produk (misal: "Gycora Matte Black" -> "Black") */}
                           <span className={`text-xs font-bold ${isCurrentProduct ? 'text-gycora-dark' : 'text-gray-700'}`}>
                              {name ? name : variant.name.split(' ').pop()}
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
                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-gycora hover:bg-gray-50 disabled:opacity-50"
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
                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-gycora hover:bg-gray-50 disabled:opacity-50"
                   >
                     +
                   </button>
                 </div>
                 
                 <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
                   <button 
                     onClick={handleAddToCart}
                     disabled={isFormDisabled}
                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 ${
                       isOutOfStock 
                         ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
                         : 'bg-white border-gycora text-gycora hover:bg-emerald-50 active:scale-95'
                     }`}
                   >
                     Add to Cart
                   </button>

                   <button 
                     onClick={handleBuyItNow}
                     disabled={isFormDisabled}
                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all ${
                       isOutOfStock 
                         ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                         : 'bg-gycora text-white hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5 active:scale-95'
                     }`}
                   >
                     {isBuyingNow ? "Memproses..." : (isOutOfStock ? 'Stok Habis' : 'Buy it Now')}
                   </button>
                 </div>

               </div>
             </div>

             <div className="space-y-8">
               <div>
                 <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">Tentang Produk Ini</h3>
                 <div className="leading-relaxed prose-sm prose text-gray-600 whitespace-pre-wrap sm:prose max-w-none">{product.description}</div>
               </div>
               {product.benefits && (
                 <div>
                   <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">Manfaat Utama</h3>
                   <div className="p-5 border border-emerald-100 bg-emerald-50/50 rounded-2xl">
                     <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">{product.benefits}</p>
                   </div>
                 </div>
               )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}