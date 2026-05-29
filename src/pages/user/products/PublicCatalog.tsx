/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom"; // Ganti dari next/link
// import { BASE_URL } from "../../../config/api";

// interface Product {
//   id: number;
//   category_name: string;
//   sku: string;
//   name: string;
//   price: number;
//   stock: number;
//   image_url: string;
// }

// export default function PublicCatalog() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         // Sesuaikan URL jika nanti menggunakan Laravel API
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (!res.ok) throw new Error("Gagal mengambil data produk");
//         // const data = await res.json();

//         const responseData = await res.json();
        
//         // --- PERBAIKAN DI SINI ---
//         // Jika responseData memiliki properti "data" (Format Laravel API Resource), gunakan itu.
//         // Jika tidak ada (Format Golang lama), langsung gunakan responseData.
//         const productsArray = responseData.data ? responseData.data : responseData;
//         setProducts(productsArray || []);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0,
//     }).format(angka);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen font-sans bg-white">
//       {/* Header Banner */}
//       <div className="py-16 text-center border-b border-pink-100 bg-pink-50">
//         <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Koleksi Gycora</h1>
//         <p className="max-w-xl px-4 mx-auto mt-4 text-gray-600">
//           Temukan perawatan rambut premium yang dirancang khusus untuk Anda. Dari serum yang merevitalisasi hingga kondisioner yang melembapkan.
//         </p>
//       </div>

//       <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         {/* Product Grid */}
//         <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {products.map((product) => (
//             <Link 
//               key={product.id} 
//               to={`/product/${product.id}`} // Ganti href menjadi to
//               className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-transparent group rounded-2xl hover:shadow-xl hover:border-gycora/20"
//             >
//               {/* Product Image Area */}
//               <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
//                 {product.image_url ? (
//                   <img 
//                     src={product.image_url} 
//                     alt={product.name} 
//                     className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-105"
//                   />
//                 ) : (
//                   <div className="flex items-center justify-center w-full h-full font-medium text-gray-400">
//                     Belum ada gambar
//                   </div>
//                 )}
                
//                 {/* Badges */}
//                 <div className="absolute flex flex-col gap-2 top-3 left-3">
//                   <span className="px-2 py-1 text-xs font-bold text-gray-900 rounded-md shadow-sm bg-white/90 backdrop-blur-sm">
//                     {product.category_name}
//                   </span>
//                   {product.stock < 5 && product.stock > 0 && (
//                     <span className="px-2 py-1 text-xs font-bold text-white rounded-md shadow-sm bg-red-500/90 backdrop-blur-sm animate-pulse">
//                       Sisa {product.stock}!
//                     </span>
//                   )}
//                   {product.stock === 0 && (
//                      <span className="px-2 py-1 text-xs font-bold text-white rounded-md shadow-sm bg-gray-900/90 backdrop-blur-sm">
//                       Habis
//                     </span>
//                   )}
//                 </div>
//               </div>

//               {/* Product Info */}
//               <div className="flex flex-col flex-grow p-5">
//                 <h3 className="mb-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-gycora line-clamp-2">
//                   {product.name}
//                 </h3>
//                 <p className="mb-4 font-mono text-sm text-gray-500">{product.sku}</p>
//                 <div className="mt-auto">
//                   <p className="text-xl font-extrabold text-gycora">
//                     {formatRupiah(product.price)}
//                   </p>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {products.length === 0 && !loading && (
//           <div className="py-20 text-center">
//             <h3 className="text-xl font-bold text-gray-700">Belum ada produk</h3>
//             <p className="mt-2 text-gray-500">Katalog kami sedang diperbarui, silakan periksa kembali nanti.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom"; 
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../../config/api";

// interface Product {
//   id: number;
//   category_name: string;
//   // sku: string;
//   name: string;
//   price: number;
//   stock: number;
//   image_url: string;
// }

// export default function PublicCatalog() {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
  
//   // STATE BARU: Menyimpan daftar ID produk yang difavoritkan
//   const [wishlistIds, setWishlistIds] = useState<number[]>([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (!res.ok) throw new Error("Gagal mengambil data produk");

//         const responseData = await res.json();
//         const productsArray = responseData.data ? responseData.data : responseData;
//         setProducts(productsArray || []);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // FUNGSI BARU: Ambil data wishlist jika user sudah login
//     const fetchWishlists = async () => {
//       const token = localStorage.getItem("user_token");
//       if (!token) return; // Jika belum login, abaikan

//       try {
//         const res = await fetch(`${BASE_URL}/api/wishlists`, {
//           headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//         });
//         if (res.ok) {
//           const data = await res.json();
//           // Simpan hanya kumpulan ID produknya saja agar mudah dicek
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           setWishlistIds(data.map((item: any) => item.product_id));
//         }
//       } catch (error) {
//         console.error("Gagal mengambil wishlist:", error);
//       }
//     };

//     fetchProducts();
//     fetchWishlists();
//   }, []);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0,
//     }).format(angka);
//   };

//   // FUNGSI BARU: Handle klik tombol Favorit
//   const handleToggleWishlist = async (e: React.MouseEvent, productId: number) => {
//     e.preventDefault(); // Mencegah klik men-trigger Link ke halaman detail

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

//     // Optimistic Update: Langsung ubah warna UI sebelum API selesai
//     const isWished = wishlistIds.includes(productId);
//     if (isWished) {
//       setWishlistIds((prev) => prev.filter(id => id !== productId));
//     } else {
//       setWishlistIds((prev) => [...prev, productId]);
//     }

//     // Hit API di background
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//           "Accept": "application/json"
//         },
//         body: JSON.stringify({ product_id: productId })
//       });
      
//       if (!res.ok) throw new Error("Gagal memproses wishlist");
//     } catch (error) {
//       // Jika gagal, kembalikan ke state semula
//       if (isWished) {
//         setWishlistIds((prev) => [...prev, productId]);
//       } else {
//         setWishlistIds((prev) => prev.filter(id => id !== productId));
//       }
//       console.error(error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen font-sans bg-white">
//       {/* Header Banner */}
//       <div className="py-16 text-center border-b border-pink-100 bg-pink-50">
//         <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Koleksi Gycora</h1>
//         <p className="max-w-xl px-4 mx-auto mt-4 text-gray-600">
//           Temukan perawatan rambut premium yang dirancang khusus untuk Anda. Dari serum yang merevitalisasi hingga kondisioner yang melembapkan.
//         </p>
//       </div>

//       <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         {/* Product Grid */}
//         <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {products.map((product) => {
//             const isWished = wishlistIds.includes(product.id);

//             return (
//               <Link 
//                 key={product.id} 
//                 to={`/product/${product.id}`} 
//                 className="relative flex flex-col overflow-hidden transition-all duration-300 bg-white border border-transparent group rounded-2xl hover:shadow-xl hover:border-gycora/20"
//               >
//                 {/* Product Image Area */}
//                 <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
//                   {product.image_url ? (
//                     <img 
//                       src={product.image_url} 
//                       alt={product.name} 
//                       className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-105"
//                     />
//                   ) : (
//                     <div className="flex items-center justify-center w-full h-full font-medium text-gray-400">
//                       Belum ada gambar
//                     </div>
//                   )}
                  
//                   {/* Badges */}
//                   <div className="absolute flex flex-col gap-2 top-3 left-3">
//                     <span className="px-2 py-1 text-xs font-bold text-gray-900 rounded-md shadow-sm bg-white/90 backdrop-blur-sm">
//                       {product.category_name}
//                     </span>
//                     {product.stock < 5 && product.stock > 0 && (
//                       <span className="px-2 py-1 text-xs font-bold text-white rounded-md shadow-sm bg-red-500/90 backdrop-blur-sm animate-pulse">
//                         Sisa {product.stock}!
//                       </span>
//                     )}
//                     {product.stock === 0 && (
//                        <span className="px-2 py-1 text-xs font-bold text-white rounded-md shadow-sm bg-gray-900/90 backdrop-blur-sm">
//                         Habis
//                       </span>
//                     )}
//                   </div>

//                   {/* TOMBOL FAVORIT (HEART ICON) */}
//                   <button 
//                     onClick={(e) => handleToggleWishlist(e, product.id)}
//                     className="absolute z-10 flex items-center justify-center w-10 h-10 transition-colors bg-white rounded-full shadow-md top-3 right-3 hover:bg-gray-50"
//                   >
//                     <svg 
//                       xmlns="http://www.w3.org/2000/svg" 
//                       viewBox="0 0 24 24" 
//                       strokeWidth={1.5} 
//                       stroke="currentColor" 
//                       className={`w-6 h-6 transition-all duration-300 ${isWished ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                     </svg>
//                   </button>
//                 </div>

//                 {/* Product Info */}
//                 <div className="flex flex-col flex-grow p-5">
//                   <h3 className="mb-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-gycora line-clamp-2">
//                     {product.name}
//                   </h3>
//                   {/* <p className="mb-4 font-mono text-sm text-gray-500">{product.sku}</p> */}
//                   <div className="mt-auto">
//                     <p className="text-xl font-extrabold text-gycora">
//                       {formatRupiah(product.price)}
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>

//         {products.length === 0 && !loading && (
//           <div className="py-20 text-center">
//             <h3 className="text-xl font-bold text-gray-700">Belum ada produk</h3>
//             <p className="mt-2 text-gray-500">Katalog kami sedang diperbarui, silakan periksa kembali nanti.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { Link, useNavigate } from "react-router-dom"; 
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../../config/api";
// // Jika Anda menggunakan CartContext untuk meng-update badge keranjang di header
// import { useCart } from "../../../context/CartContext";

// interface Product {
//   id: number;
//   category_name: string;
//   name: string;
//   price: number;
//   stock: number;
//   image_url: string;
//   color?: string | null;
// }

// export default function PublicCatalog() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const { fetchCart } = useCart() as any; // Memanggil fetchCart untuk update header setelah quick add
  
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [wishlistIds, setWishlistIds] = useState<number[]>([]);

//   // --- STATE UNTUK FITUR BARU (FILTER, SEARCH, SORT) ---
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeCategory, setActiveCategory] = useState("Semua");
//   const [sortBy, setSortBy] = useState("newest");
//   const [addingToCartId, setAddingToCartId] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (!res.ok) throw new Error("Gagal mengambil data produk");

//         const responseData = await res.json();
//         const productsArray = responseData.data ? responseData.data : responseData;
//         setProducts(productsArray || []);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchWishlists = async () => {
//       const token = localStorage.getItem("user_token");
//       if (!token) return; 

//       try {
//         const res = await fetch(`${BASE_URL}/api/wishlists`, {
//           headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//         });
//         if (res.ok) {
//           const data = await res.json();
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           setWishlistIds(data.map((item: any) => item.product_id));
//         }
//       } catch (error) {
//         console.error("Gagal mengambil wishlist:", error);
//       }
//     };

//     fetchProducts();
//     fetchWishlists();
//   }, []);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0,
//     }).format(angka);
//   };

//   const handleToggleWishlist = async (e: React.MouseEvent, productId: number) => {
//     e.preventDefault(); 

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

//     const isWished = wishlistIds.includes(productId);
//     if (isWished) {
//       setWishlistIds((prev) => prev.filter(id => id !== productId));
//     } else {
//       setWishlistIds((prev) => [...prev, productId]);
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//           "Accept": "application/json"
//         },
//         body: JSON.stringify({ product_id: productId })
//       });
      
//       if (!res.ok) throw new Error("Gagal memproses wishlist");
//     } catch (error) {
//       if (isWished) {
//         setWishlistIds((prev) => [...prev, productId]);
//       } else {
//         setWishlistIds((prev) => prev.filter(id => id !== productId));
//       }
//       console.error(error);
//     }
//   };

//   // FUNGSI BARU: Quick Add To Cart
//   const handleQuickAddToCart = async (e: React.MouseEvent, product: Product) => {
//     e.preventDefault();
    
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({ title: "Login Diperlukan", text: "Silakan masuk untuk berbelanja.", icon: "info" });
//       navigate("/login");
//       return;
//     }

//     // Jika produk memiliki varian warna, paksa user ke halaman detail untuk memilih warna
//     if (product.color && product.color.length > 0 && product.color !== "[]") {
//       navigate(`/product/${product.id}`);
//       return;
//     }

//     setAddingToCartId(product.id);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ product_id: product.id, quantity: 1 }),
//       });
//       if (res.ok) {
//         Swal.fire({ title: "Berhasil", text: "Dimasukkan ke keranjang", icon: "success", toast: true, position: "top-end", timer: 1500, showConfirmButton: false });
//         if(fetchCart) fetchCart(); // Update badge header
//       } else {
//         const err = await res.json();
//         Swal.fire("Peringatan", err.message || "Gagal menambahkan produk", "warning");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Terjadi kesalahan koneksi.", "error");
//     } finally {
//       setAddingToCartId(null);
//     }
//   };

//   // --- LOGIKA FILTER, SEARCH, & SORT ---
//   const categories = ["Semua", ...Array.from(new Set(products.map((p) => p.category_name).filter(Boolean)))];

//   const processedProducts = useMemo(() => {
//     return products
//       .filter((p) => {
//         const matchCategory = activeCategory === "Semua" || p.category_name === activeCategory;
//         const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
//         return matchCategory && matchSearch;
//       })
//       .sort((a, b) => {
//         if (sortBy === "price_asc") return a.price - b.price;
//         if (sortBy === "price_desc") return b.price - a.price;
//         return b.id - a.id; // Default newest
//       });
//   }, [products, activeCategory, searchQuery, sortBy]);

//   return (
//     <div className="min-h-screen font-sans bg-gray-50/50">
      
//       {/* Header Banner */}
//       <div className="relative py-20 overflow-hidden text-center bg-gray-900 border-b border-gray-800">
//         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598440947619-2ce6598c4e1d?q=80&w=1500')] bg-cover bg-center opacity-20"></div>
//         <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
//         <div className="relative z-10 px-4">
//           <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">Temukan Favoritmu di Gycora</h1>
//           <p className="max-w-2xl mx-auto mt-4 text-gray-300">
//             Dari hair brush hingga scalp care, eksplor produk pilihan yang bikin rutinitas rambut terasa lebih praktis setiap hari.
//           </p>
//         </div>
//       </div>

//       <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
//         {/* --- FILTER & SEARCH BAR (BARU) --- */}
//         <div className="flex flex-col gap-6 mb-10 md:flex-row md:items-center md:justify-between">
          
//           {/* Categories Pills */}
//           <div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar md:pb-0">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setActiveCategory(cat)}
//                 className={`px-5 py-2 text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap rounded-full border ${
//                   activeCategory === cat 
//                     ? "bg-gray-900 text-white border-gray-900 shadow-md" 
//                     : "bg-white text-gray-600 border-gray-200 hover:border-gycora hover:text-gycora"
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>

//           <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
//             {/* Search Input */}
//             <div className="relative">
//               <svg className="absolute w-4 h-4 text-gray-400 left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
//               <input 
//                 type="text" 
//                 placeholder="Cari produk..." 
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full py-2 pl-10 pr-4 text-sm transition-shadow bg-white border border-gray-200 rounded-full outline-none focus:ring-2 focus:ring-gycora/50 focus:border-gycora sm:w-64"
//               />
//             </div>
            
//             {/* Sort Select */}
//             <select 
//               value={sortBy} 
//               onChange={(e) => setSortBy(e.target.value)}
//               className="py-2 pl-4 pr-8 text-sm font-medium bg-white border border-gray-200 rounded-full outline-none cursor-pointer focus:ring-2 focus:ring-gycora/50 focus:border-gycora"
//             >
//               <option value="newest">Terbaru</option>
//               <option value="price_asc">Harga: Rendah ke Tinggi</option>
//               <option value="price_desc">Harga: Tinggi ke Rendah</option>
//             </select>
//           </div>
//         </div>

//         {/* --- PRODUCT GRID --- */}
//         {loading ? (
//           /* SKELETON LOADER (BARU) */
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-pulse">
//             {[...Array(8)].map((_, i) => (
//               <div key={i} className="flex flex-col overflow-hidden bg-white border border-gray-100 rounded-2xl">
//                 <div className="aspect-[4/5] bg-gray-200 w-full"></div>
//                 <div className="p-5 space-y-3">
//                   <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
//                   <div className="w-1/2 h-6 bg-gray-200 rounded"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : processedProducts.length === 0 ? (
//           <div className="py-20 text-center bg-white border border-gray-100 border-dashed rounded-3xl">
//             <h3 className="text-xl font-bold text-gray-700">Produk tidak ditemukan</h3>
//             <p className="mt-2 text-gray-500">Coba ubah kata kunci pencarian atau filter kategori Anda.</p>
//             <button onClick={() => {setSearchQuery(""); setActiveCategory("Semua");}} className="mt-6 text-sm font-bold text-gycora hover:underline">Reset Filter</button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {processedProducts.map((product) => {
//               const isWished = wishlistIds.includes(product.id);
//               const isAdding = addingToCartId === product.id;
//               // Cek apakah punya warna
//               const hasColors = product.color && product.color.length > 0 && product.color !== "[]";

//               return (
//                 <Link 
//                   key={product.id} 
//                   to={`/product/${product.id}`} 
//                   // [BARU] Kirim data produk saat ini ke halaman detail agar tidak perlu loading
//                   // state={{ initialProduct: product }}
//                   // [PERBAIKAN] Lempar juga seluruh data 'products' agar halaman detail bisa langsung memfilter warna!
//                   state={{ 
//                     initialProduct: product,
//                     allProducts: products // Lempar semua data katalog
//                   }}
//                   className="relative flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm group rounded-2xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1"
//                 >
//                   {/* Product Image Area */}
//                   <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
//                     {product.image_url ? (
//                       <img 
//                         src={product.image_url} 
//                         alt={product.name} 
//                         className="object-cover object-center w-full h-full transition-transform duration-700 group-hover:scale-105"
//                       />
//                     ) : (
//                       <div className="flex items-center justify-center w-full h-full font-medium text-gray-400">
//                         Belum ada gambar
//                       </div>
//                     )}
                    
//                     {/* Overlay Gradient (Muncul saat hover untuk kontras tombol) */}
//                     <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-gray-900/60 to-transparent group-hover:opacity-100"></div>
                    
//                     {/* Badges */}
//                     <div className="absolute flex flex-col gap-2 top-3 left-3">
//                       <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-md shadow-sm bg-white/90 backdrop-blur-sm">
//                         {product.category_name}
//                       </span>
//                       {product.stock < 5 && product.stock > 0 && (
//                         <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm bg-red-500/90 backdrop-blur-sm animate-pulse">
//                           Sisa {product.stock}!
//                         </span>
//                       )}
//                       {product.stock === 0 && (
//                          <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm bg-gray-900/90 backdrop-blur-sm">
//                           Habis
//                         </span>
//                       )}
//                     </div>

//                     {/* TOMBOL FAVORIT */}
//                     <button 
//                       onClick={(e) => handleToggleWishlist(e, product.id)}
//                       className="absolute z-10 flex items-center justify-center w-10 h-10 transition-colors bg-white rounded-full shadow-md top-3 right-3 hover:bg-gray-50"
//                     >
//                       <svg 
//                         xmlns="http://www.w3.org/2000/svg" 
//                         viewBox="0 0 24 24" 
//                         strokeWidth={1.5} 
//                         stroke="currentColor" 
//                         className={`w-5 h-5 transition-all duration-300 ${isWished ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}
//                       >
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                       </svg>
//                     </button>

//                     {/* TOMBOL QUICK ADD TO CART (MUNCUL SAAT HOVER) */}
//                     <div className="absolute left-0 right-0 px-4 transition-all duration-300 translate-y-full opacity-0 bottom-4 group-hover:translate-y-0 group-hover:opacity-100">
//                       <button 
//                         disabled={product.stock === 0 || isAdding}
//                         onClick={(e) => handleQuickAddToCart(e, product)}
//                         className="w-full py-3 text-xs font-bold tracking-widest text-gray-900 uppercase transition-colors bg-white shadow-xl rounded-xl hover:bg-gycora hover:text-white disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
//                       >
//                         {isAdding ? "Memproses..." : hasColors ? "Pilih Varian" : "Tambah ke Keranjang"}
//                       </button>
//                     </div>
//                   </div>

//                   {/* Product Info */}
//                   <div className="flex flex-col flex-grow p-5 bg-white">
//                     <h3 className="mb-1 text-sm font-bold text-gray-900 transition-colors sm:text-base group-hover:text-gycora line-clamp-2">
//                       {product.name}
//                     </h3>
//                     <div className="pt-3 mt-auto">
//                       <p className="text-lg font-black text-gray-900">
//                         {formatRupiah(product.price)}
//                       </p>
//                     </div>
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { Link, useNavigate } from "react-router-dom"; 
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../../config/api";
// import { useCart } from "../../../context/CartContext";

// interface Product {
//   id: number;
//   category_name: string;
//   name: string;
//   price: number;
//   stock: number;
//   image_url: string;
//   color?: string | null;
// }

// export default function PublicCatalog() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const { fetchCart } = useCart() as any;
  
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [wishlistIds, setWishlistIds] = useState<number[]>([]);

//   // --- STATE UNTUK FITUR BARU (FILTER, SEARCH, SORT) ---
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeCategory, setActiveCategory] = useState("Semua");
//   // [PERBAIKAN] Mengubah default sortBy menjadi "name_asc" (A ke Z)
//   // const [sortBy, setSortBy] = useState("name_asc"); 
//   const [sortBy] = useState("name_asc"); 
//   const [addingToCartId, setAddingToCartId] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (!res.ok) throw new Error("Gagal mengambil data produk");

//         const responseData = await res.json();
//         const productsArray = responseData.data ? responseData.data : responseData;
//         setProducts(productsArray || []);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchWishlists = async () => {
//       const token = localStorage.getItem("user_token");
//       if (!token) return; 

//       try {
//         const res = await fetch(`${BASE_URL}/api/wishlists`, {
//           headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//         });
//         if (res.ok) {
//           const data = await res.json();
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           setWishlistIds(data.map((item: any) => item.product_id));
//         }
//       } catch (error) {
//         console.error("Gagal mengambil wishlist:", error);
//       }
//     };

//     fetchProducts();
//     fetchWishlists();
//   }, []);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0,
//     }).format(angka);
//   };

//   const handleToggleWishlist = async (e: React.MouseEvent, productId: number) => {
//     e.preventDefault(); 

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

//     const isWished = wishlistIds.includes(productId);
//     if (isWished) {
//       setWishlistIds((prev) => prev.filter(id => id !== productId));
//     } else {
//       setWishlistIds((prev) => [...prev, productId]);
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//           "Accept": "application/json"
//         },
//         body: JSON.stringify({ product_id: productId })
//       });
      
//       if (!res.ok) throw new Error("Gagal memproses wishlist");
//     } catch (error) {
//       if (isWished) {
//         setWishlistIds((prev) => [...prev, productId]);
//       } else {
//         setWishlistIds((prev) => prev.filter(id => id !== productId));
//       }
//       console.error(error);
//     }
//   };

//   const handleQuickAddToCart = async (e: React.MouseEvent, product: Product) => {
//     e.preventDefault();
    
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({ title: "Login Diperlukan", text: "Silakan masuk untuk berbelanja.", icon: "info" });
//       navigate("/login");
//       return;
//     }

//     if (product.color && product.color.length > 0 && product.color !== "[]") {
//       navigate(`/product/${product.id}`);
//       return;
//     }

//     setAddingToCartId(product.id);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ product_id: product.id, quantity: 1 }),
//       });
//       if (res.ok) {
//         Swal.fire({ title: "Berhasil", text: "Dimasukkan ke keranjang", icon: "success", toast: true, position: "top-end", timer: 1500, showConfirmButton: false });
//         if(fetchCart) fetchCart();
//       } else {
//         const err = await res.json();
//         Swal.fire("Peringatan", err.message || "Gagal menambahkan produk", "warning");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Terjadi kesalahan koneksi.", "error");
//     } finally {
//       setAddingToCartId(null);
//     }
//   };

//   // --- LOGIKA FILTER, SEARCH, & SORT ---
//   const categories = ["Semua", ...Array.from(new Set(products.map((p) => p.category_name).filter(Boolean)))];

//   const processedProducts = useMemo(() => {
//     return products
//       .filter((p) => {
//         const matchCategory = activeCategory === "Semua" || p.category_name === activeCategory;
//         const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
//         return matchCategory && matchSearch;
//       })
//       .sort((a, b) => {
//         // [PERBAIKAN] Menambahkan logika pengurutan berdasarkan nama (A-Z)
//         if (sortBy === "name_asc") return a.name.localeCompare(b.name);
//         if (sortBy === "price_asc") return a.price - b.price;
//         if (sortBy === "price_desc") return b.price - a.price;
//         return b.id - a.id; // Default newest (jika sortBy "newest")
//       });
//   }, [products, activeCategory, searchQuery, sortBy]);

//   return (
//     <div className="min-h-screen font-sans bg-gray-50/50">
      
//       {/* Header Banner */}
//       <div className="relative py-20 overflow-hidden text-center bg-gray-900 border-b border-gray-800">
//         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598440947619-2ce6598c4e1d?q=80&w=1500')] bg-cover bg-center opacity-20"></div>
//         <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
//         <div className="relative z-10 px-4">
//           <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">Temukan Favoritmu di Gycora</h1>
//           <p className="max-w-2xl mx-auto mt-4 text-gray-300">
//             Dari hair brush hingga scalp care, eksplor produk pilihan yang bikin rutinitas rambut terasa lebih praktis setiap hari.
//           </p>
//         </div>
//       </div>

//       <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
//         {/* --- FILTER & SEARCH BAR --- */}
//         <div className="flex flex-col gap-6 mb-10 md:flex-row md:items-center md:justify-between">
          
//           {/* Categories Pills */}
//           <div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar md:pb-0">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setActiveCategory(cat)}
//                 className={`px-5 py-2 text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap rounded-full border ${
//                   activeCategory === cat 
//                     ? "bg-gray-900 text-white border-gray-900 shadow-md" 
//                     : "bg-white text-gray-600 border-gray-200 hover:border-gycora hover:text-gycora"
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>

//           <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
//             {/* Search Input */}
//             <div className="relative">
//               <svg className="absolute w-4 h-4 text-gray-400 left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
//               <input 
//                 type="text" 
//                 placeholder="Cari produk..." 
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full py-2 pl-10 pr-4 text-sm transition-shadow bg-white border border-gray-200 rounded-full outline-none focus:ring-2 focus:ring-gycora/50 focus:border-gycora sm:w-64"
//               />
//             </div>
            
//             {/* Sort Select */}
//             {/* <select 
//               value={sortBy} 
//               onChange={(e) => setSortBy(e.target.value)}
//               className="py-2 pl-4 pr-8 text-sm font-medium bg-white border border-gray-200 rounded-full outline-none cursor-pointer focus:ring-2 focus:ring-gycora/50 focus:border-gycora"
//             >
//               <option value="name_asc">Nama: A ke Z</option>
//               <option value="newest">Terbaru</option>
//               <option value="price_asc">Harga: Rendah ke Tinggi</option>
//               <option value="price_desc">Harga: Tinggi ke Rendah</option>
//             </select> */}
//           </div>
//         </div>

//         {/* --- PRODUCT GRID --- */}
//         {loading ? (
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-pulse">
//             {[...Array(8)].map((_, i) => (
//               <div key={i} className="flex flex-col overflow-hidden bg-white border border-gray-100 rounded-2xl">
//                 <div className="aspect-[4/5] bg-gray-200 w-full"></div>
//                 <div className="p-5 space-y-3">
//                   <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
//                   <div className="w-1/2 h-6 bg-gray-200 rounded"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : processedProducts.length === 0 ? (
//           <div className="py-20 text-center bg-white border border-gray-100 border-dashed rounded-3xl">
//             <h3 className="text-xl font-bold text-gray-700">Produk tidak ditemukan</h3>
//             <p className="mt-2 text-gray-500">Coba ubah kata kunci pencarian atau filter kategori Anda.</p>
//             <button onClick={() => {setSearchQuery(""); setActiveCategory("Semua");}} className="mt-6 text-sm font-bold text-gycora hover:underline">Reset Filter</button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {processedProducts.map((product) => {
//               const isWished = wishlistIds.includes(product.id);
//               const isAdding = addingToCartId === product.id;
//               const hasColors = product.color && product.color.length > 0 && product.color !== "[]";

//               return (
//                 <Link 
//                   key={product.id} 
//                   to={`/product/${product.id}`} 
//                   state={{ 
//                     initialProduct: product,
//                     allProducts: products
//                   }}
//                   className="relative flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm group rounded-2xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1"
//                 >
//                   <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
//                     {product.image_url ? (
//                       <img 
//                         src={product.image_url} 
//                         alt={product.name} 
//                         className="object-cover object-center w-full h-full transition-transform duration-700 group-hover:scale-105"
//                       />
//                     ) : (
//                       <div className="flex items-center justify-center w-full h-full font-medium text-gray-400">
//                         Belum ada gambar
//                       </div>
//                     )}
                    
//                     <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-gray-900/60 to-transparent group-hover:opacity-100"></div>
                    
//                     <div className="absolute flex flex-col gap-2 top-3 left-3">
//                       <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-md shadow-sm bg-white/90 backdrop-blur-sm">
//                         {product.category_name}
//                       </span>
//                       {product.stock < 5 && product.stock > 0 && (
//                         <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm bg-red-500/90 backdrop-blur-sm animate-pulse">
//                           Sisa {product.stock}!
//                         </span>
//                       )}
//                       {product.stock === 0 && (
//                          <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm bg-gray-900/90 backdrop-blur-sm">
//                           Habis
//                         </span>
//                       )}
//                     </div>

//                     <button 
//                       onClick={(e) => handleToggleWishlist(e, product.id)}
//                       className="absolute z-10 flex items-center justify-center w-10 h-10 transition-colors bg-white rounded-full shadow-md top-3 right-3 hover:bg-gray-50"
//                     >
//                       <svg 
//                         xmlns="http://www.w3.org/2000/svg" 
//                         viewBox="0 0 24 24" 
//                         strokeWidth={1.5} 
//                         stroke="currentColor" 
//                         className={`w-5 h-5 transition-all duration-300 ${isWished ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}
//                       >
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                       </svg>
//                     </button>

//                     <div className="absolute left-0 right-0 px-4 transition-all duration-300 translate-y-full opacity-0 bottom-4 group-hover:translate-y-0 group-hover:opacity-100">
//                       <button 
//                         disabled={product.stock === 0 || isAdding}
//                         onClick={(e) => handleQuickAddToCart(e, product)}
//                         className="w-full py-3 text-xs font-bold tracking-widest text-gray-900 uppercase transition-colors bg-white shadow-xl rounded-xl hover:bg-gycora hover:text-white disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
//                       >
//                         {isAdding ? "Memproses..." : hasColors ? "Pilih Varian" : "Tambah ke Keranjang"}
//                       </button>
//                     </div>
//                   </div>

//                   <div className="flex flex-col flex-grow p-5 bg-white">
//                     <h3 className="mb-1 text-sm font-bold text-gray-900 transition-colors sm:text-base group-hover:text-gycora line-clamp-2">
//                       {product.name}
//                     </h3>
//                     <div className="pt-3 mt-auto">
//                       <p className="text-lg font-black text-gray-900">
//                         {formatRupiah(product.price)}
//                       </p>
//                     </div>
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// slug
// import { useState, useEffect, useMemo } from "react";
// import { Link, useNavigate } from "react-router-dom"; 
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../../config/api";
// import { useCart } from "../../../context/CartContext";

// // [PERBAIKAN] Menyinkronkan Interface Product dengan backend dan halaman detail
// interface Product {
//   id: number;
//   category_name: string;
//   sku?: string;
//   name: string;
//   slug: string; // <-- Wajib untuk navigasi
//   description?: string;
//   benefits?: string;
//   price: number;
//   discount_price?: number;
//   voucher_discount_price?: number;
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   color?: any; // <-- Diubah ke any agar bisa menghandle JSON string maupun array
// }

// export default function PublicCatalog() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const { fetchCart } = useCart() as any;
  
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [wishlistIds, setWishlistIds] = useState<number[]>([]);

//   // --- STATE UNTUK FITUR BARU (FILTER, SEARCH, SORT) ---
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeCategory, setActiveCategory] = useState("Semua");
//   const [sortBy] = useState("name_asc"); 
//   const [addingToCartId, setAddingToCartId] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (!res.ok) throw new Error("Gagal mengambil data produk");

//         const responseData = await res.json();
//         const productsArray = responseData.data ? responseData.data : responseData;
//         setProducts(productsArray || []);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchWishlists = async () => {
//       const token = localStorage.getItem("user_token");
//       if (!token) return; 

//       try {
//         const res = await fetch(`${BASE_URL}/api/wishlists`, {
//           headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//         });
//         if (res.ok) {
//           const data = await res.json();
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           setWishlistIds(data.map((item: any) => item.product_id));
//         }
//       } catch (error) {
//         console.error("Gagal mengambil wishlist:", error);
//       }
//     };

//     fetchProducts();
//     fetchWishlists();
//   }, []);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0,
//     }).format(angka);
//   };

//   const handleToggleWishlist = async (e: React.MouseEvent, productId: number) => {
//     e.preventDefault(); 

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

//     const isWished = wishlistIds.includes(productId);
//     if (isWished) {
//       setWishlistIds((prev) => prev.filter(id => id !== productId));
//     } else {
//       setWishlistIds((prev) => [...prev, productId]);
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//           "Accept": "application/json"
//         },
//         body: JSON.stringify({ product_id: productId })
//       });
      
//       if (!res.ok) throw new Error("Gagal memproses wishlist");
//     } catch (error) {
//       if (isWished) {
//         setWishlistIds((prev) => [...prev, productId]);
//       } else {
//         setWishlistIds((prev) => prev.filter(id => id !== productId));
//       }
//       console.error(error);
//     }
//   };

//   const handleQuickAddToCart = async (e: React.MouseEvent, product: Product) => {
//     e.preventDefault();
    
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({ title: "Login Diperlukan", text: "Silakan masuk untuk berbelanja.", icon: "info" });
//       navigate("/login");
//       return;
//     }

//     // [PERBAIKAN] Validasi Pengecekan Variasi Warna yang lebih aman
//     let hasVariants = false;
//     if (product.color) {
//       if (Array.isArray(product.color) && product.color.length > 0) {
//         hasVariants = true;
//       } else if (typeof product.color === 'string' && product.color.length > 0 && product.color !== "[]") {
//         hasVariants = true;
//       }
//     }

//     if (hasVariants) {
//       navigate(`/product/${product.slug}`);
//       return;
//     }

//     setAddingToCartId(product.id);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ product_id: product.id, quantity: 1 }),
//       });
//       if (res.ok) {
//         Swal.fire({ title: "Berhasil", text: "Dimasukkan ke keranjang", icon: "success", toast: true, position: "top-end", timer: 1500, showConfirmButton: false });
//         if(fetchCart) fetchCart();
//       } else {
//         const err = await res.json();
//         Swal.fire("Peringatan", err.message || "Gagal menambahkan produk", "warning");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Terjadi kesalahan koneksi.", "error");
//     } finally {
//       setAddingToCartId(null);
//     }
//   };

//   const categories = ["Semua", ...Array.from(new Set(products.map((p) => p.category_name).filter(Boolean)))];

//   const processedProducts = useMemo(() => {
//     return products
//       .filter((p) => {
//         const matchCategory = activeCategory === "Semua" || p.category_name === activeCategory;
//         const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
//         return matchCategory && matchSearch;
//       })
//       .sort((a, b) => {
//         if (sortBy === "name_asc") return a.name.localeCompare(b.name);
//         if (sortBy === "price_asc") return a.price - b.price;
//         if (sortBy === "price_desc") return b.price - a.price;
//         return b.id - a.id; 
//       });
//   }, [products, activeCategory, searchQuery, sortBy]);

//   return (
//     <div className="min-h-screen font-sans bg-gray-50/50">
      
//       {/* Header Banner */}
//       <div className="relative py-20 overflow-hidden text-center bg-gray-900 border-b border-gray-800">
//         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598440947619-2ce6598c4e1d?q=80&w=1500')] bg-cover bg-center opacity-20"></div>
//         <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
//         <div className="relative z-10 px-4">
//           <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">Temukan Favoritmu di Gycora</h1>
//           <p className="max-w-2xl mx-auto mt-4 text-gray-300">
//             Dari hair brush hingga scalp care, eksplor produk pilihan yang bikin rutinitas rambut terasa lebih praktis setiap hari.
//           </p>
//         </div>
//       </div>

//       <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
//         {/* --- FILTER & SEARCH BAR --- */}
//         <div className="flex flex-col gap-6 mb-10 md:flex-row md:items-center md:justify-between">
          
//           {/* Categories Pills */}
//           <div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar md:pb-0">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setActiveCategory(cat)}
//                 className={`px-5 py-2 text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap rounded-full border ${
//                   activeCategory === cat 
//                     ? "bg-gray-900 text-white border-gray-900 shadow-md" 
//                     : "bg-white text-gray-600 border-gray-200 hover:border-gycora hover:text-gycora"
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>

//           <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
//             {/* Search Input */}
//             <div className="relative">
//               <svg className="absolute w-4 h-4 text-gray-400 left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
//               <input 
//                 type="text" 
//                 placeholder="Cari produk..." 
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full py-2 pl-10 pr-4 text-sm transition-shadow bg-white border border-gray-200 rounded-full outline-none focus:ring-2 focus:ring-gycora/50 focus:border-gycora sm:w-64"
//               />
//             </div>
//           </div>
//         </div>

//         {/* --- PRODUCT GRID --- */}
//         {loading ? (
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-pulse">
//             {[...Array(8)].map((_, i) => (
//               <div key={i} className="flex flex-col overflow-hidden bg-white border border-gray-100 rounded-2xl">
//                 <div className="aspect-[4/5] bg-gray-200 w-full"></div>
//                 <div className="p-5 space-y-3">
//                   <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
//                   <div className="w-1/2 h-6 bg-gray-200 rounded"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : processedProducts.length === 0 ? (
//           <div className="py-20 text-center bg-white border border-gray-100 border-dashed rounded-3xl">
//             <h3 className="text-xl font-bold text-gray-700">Produk tidak ditemukan</h3>
//             <p className="mt-2 text-gray-500">Coba ubah kata kunci pencarian atau filter kategori Anda.</p>
//             <button onClick={() => {setSearchQuery(""); setActiveCategory("Semua");}} className="mt-6 text-sm font-bold text-gycora hover:underline">Reset Filter</button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {processedProducts.map((product) => {
//               const isWished = wishlistIds.includes(product.id);
//               const isAdding = addingToCartId === product.id;
              
//               // [PERBAIKAN] Validasi warna untuk label tombol
//               let hasColors = false;
//               if (product.color) {
//                 if (Array.isArray(product.color) && product.color.length > 0) hasColors = true;
//                 else if (typeof product.color === 'string' && product.color.length > 0 && product.color !== "[]") hasColors = true;
//               }

//               return (
//                 <Link 
//                   key={product.id} 
//                   to={`/product/${product.slug}`} 
//                   state={{ 
//                     initialProduct: product,
//                     allProducts: products
//                   }}
//                   className="relative flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm group rounded-2xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1"
//                 >
//                   <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
//                     {product.image_url ? (
//                       <img 
//                         src={product.image_url} 
//                         alt={product.name} 
//                         className="object-cover object-center w-full h-full transition-transform duration-700 group-hover:scale-105"
//                       />
//                     ) : (
//                       <div className="flex items-center justify-center w-full h-full font-medium text-gray-400">
//                         Belum ada gambar
//                       </div>
//                     )}
                    
//                     <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-gray-900/60 to-transparent group-hover:opacity-100"></div>
                    
//                     <div className="absolute flex flex-col gap-2 top-3 left-3">
//                       <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-md shadow-sm bg-white/90 backdrop-blur-sm">
//                         {product.category_name}
//                       </span>
//                       {product.stock < 5 && product.stock > 0 && (
//                         <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm bg-red-500/90 backdrop-blur-sm animate-pulse">
//                           Sisa {product.stock}!
//                         </span>
//                       )}
//                       {product.stock === 0 && (
//                          <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm bg-gray-900/90 backdrop-blur-sm">
//                           Habis
//                         </span>
//                       )}
//                     </div>

//                     <button 
//                       onClick={(e) => handleToggleWishlist(e, product.id)}
//                       className="absolute z-10 flex items-center justify-center w-10 h-10 transition-colors bg-white rounded-full shadow-md top-3 right-3 hover:bg-gray-50"
//                     >
//                       <svg 
//                         xmlns="http://www.w3.org/2000/svg" 
//                         viewBox="0 0 24 24" 
//                         strokeWidth={1.5} 
//                         stroke="currentColor" 
//                         className={`w-5 h-5 transition-all duration-300 ${isWished ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}
//                       >
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                       </svg>
//                     </button>

//                     <div className="absolute left-0 right-0 px-4 transition-all duration-300 translate-y-full opacity-0 bottom-4 group-hover:translate-y-0 group-hover:opacity-100">
//                       <button 
//                         disabled={product.stock === 0 || isAdding}
//                         onClick={(e) => handleQuickAddToCart(e, product)}
//                         className="w-full py-3 text-xs font-bold tracking-widest text-gray-900 uppercase transition-colors bg-white shadow-xl rounded-xl hover:bg-gycora hover:text-white disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
//                       >
//                         {isAdding ? "Memproses..." : hasColors ? "Pilih Varian" : "Tambah ke Keranjang"}
//                       </button>
//                     </div>
//                   </div>

//                   <div className="flex flex-col flex-grow p-5 bg-white">
//                     <h3 className="mb-1 text-sm font-bold text-gray-900 transition-colors sm:text-base group-hover:text-gycora line-clamp-2">
//                       {product.name}
//                     </h3>
//                     <div className="pt-3 mt-auto">
//                       <p className="text-lg font-black text-gray-900">
//                         {formatRupiah(product.price)}
//                       </p>
//                     </div>
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { Link, useNavigate } from "react-router-dom"; 
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../../config/api";
// import { useCart } from "../../../context/CartContext";
// import { useLanguage } from "../../../context/LanguageContext"; // Import Language Context

// // [PERBAIKAN] Menyinkronkan Interface Product dengan backend dan halaman detail
// interface Product {
//   id: number;
//   category_name: string;
//   sku?: string;
//   name: string;
//   slug: string; // <-- Wajib untuk navigasi
//   description?: string;
//   benefits?: string;
//   price: number;
//   discount_price?: number;
//   voucher_discount_price?: number;
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   color?: any; 
//   // [BARU] Field terjemahan dinamis
//   name_en?: string;
//   category_en?: string;
// }

// // [BARU] Fungsi utilitas translasi API untuk data dari database (dengan fallback)
// const translateText = async (text: string, langTo: string): Promise<string> => {
//   if (!text) return "";
//   try {
//     const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=id|${langTo}&de=admin@gycora.com`);
//     const data = await res.json();
//     if (data?.responseData?.translatedText && !data.responseData.translatedText.includes("MYMEMORY WARNING")) {
//       return data.responseData.translatedText;
//     }
//     return text;
//   } catch { 
//     return text; 
//   }
// };

// export default function PublicCatalog() {
//   const navigate = useNavigate();
//   const { t, lang } = useLanguage(); // Inisialisasi hook bahasa
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const { fetchCart } = useCart() as any;
  
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [wishlistIds, setWishlistIds] = useState<number[]>([]);

//   // --- STATE UNTUK FITUR BARU (FILTER, SEARCH, SORT) ---
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeCategory, setActiveCategory] = useState(t("cat_all"));
//   const [sortBy] = useState("name_asc"); 
//   const [addingToCartId, setAddingToCartId] = useState<number | null>(null);

//   // Efek untuk reset kategori jika pengguna mengubah bahasa agar tidak stuck di nama kategori bahasa sebelumnya
//   useEffect(() => {
//     setActiveCategory(t("cat_all"));
//   }, [lang, t]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true); // Pastikan loading state nyala saat re-fetch (ubah bahasa)
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (!res.ok) throw new Error("Gagal mengambil data produk");

//         const responseData = await res.json();
//         let productsArray = responseData.data ? responseData.data : responseData;
//         productsArray = productsArray || [];

//         // Translasi dinamis jika bahasa diatur ke Inggris
//         if (lang === "en") {
//           productsArray = await Promise.all(productsArray.map(async (p: Product) => ({
//             ...p,
//             name_en: await translateText(p.name, "en"),
//             category_en: await translateText(p.category_name, "en")
//           })));
//         }

//         setProducts(productsArray);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchWishlists = async () => {
//       const token = localStorage.getItem("user_token");
//       if (!token) return; 

//       try {
//         const res = await fetch(`${BASE_URL}/api/wishlists`, {
//           headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//         });
//         if (res.ok) {
//           const data = await res.json();
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           setWishlistIds(data.map((item: any) => item.product_id));
//         }
//       } catch (error) {
//         console.error("Gagal mengambil wishlist:", error);
//       }
//     };

//     fetchProducts();
//     fetchWishlists();
//   }, [lang]); // Dependency [lang] agar data produk diterjemahkan ulang saat bahasa diganti

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0,
//     }).format(angka);
//   };

//   const handleToggleWishlist = async (e: React.MouseEvent, productId: number) => {
//     e.preventDefault(); 

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
//         cancelButtonText: t("cancel")
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     const isWished = wishlistIds.includes(productId);
//     if (isWished) {
//       setWishlistIds((prev) => prev.filter(id => id !== productId));
//     } else {
//       setWishlistIds((prev) => [...prev, productId]);
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//           "Accept": "application/json"
//         },
//         body: JSON.stringify({ product_id: productId })
//       });
      
//       if (!res.ok) throw new Error("Gagal memproses wishlist");
//     } catch (error) {
//       if (isWished) {
//         setWishlistIds((prev) => [...prev, productId]);
//       } else {
//         setWishlistIds((prev) => prev.filter(id => id !== productId));
//       }
//       console.error(error);
//     }
//   };

//   const handleQuickAddToCart = async (e: React.MouseEvent, product: Product) => {
//     e.preventDefault();
    
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({ title: t("login_required"), text: t("login_required_desc"), icon: "info" });
//       navigate("/login");
//       return;
//     }

//     // Validasi Pengecekan Variasi Warna yang lebih aman
//     let hasVariants = false;
//     if (product.color) {
//       if (Array.isArray(product.color) && product.color.length > 0) {
//         hasVariants = true;
//       } else if (typeof product.color === 'string' && product.color.length > 0 && product.color !== "[]") {
//         hasVariants = true;
//       }
//     }

//     if (hasVariants) {
//       navigate(`/product/${product.slug}`);
//       return;
//     }

//     setAddingToCartId(product.id);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ product_id: product.id, quantity: 1 }),
//       });
//       if (res.ok) {
//         Swal.fire({ title: "Berhasil", text: t("added_to_cart"), icon: "success", toast: true, position: "top-end", timer: 1500, showConfirmButton: false });
//         if(fetchCart) fetchCart();
//       } else {
//         const err = await res.json();
//         Swal.fire("Peringatan", err.message || "Gagal menambahkan produk", "warning");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Terjadi kesalahan koneksi.", "error");
//     } finally {
//       setAddingToCartId(null);
//     }
//   };

//   // Menyiapkan daftar kategori untuk filter button
//   const categories = [t("cat_all"), ...Array.from(new Set(products.map((p) => lang === "en" ? (p.category_en || p.category_name) : p.category_name).filter(Boolean)))];

//   const processedProducts = useMemo(() => {
//     return products
//       .filter((p) => {
//         const catName = lang === "en" ? (p.category_en || p.category_name) : p.category_name;
//         const prodName = lang === "en" ? (p.name_en || p.name) : p.name;
        
//         const matchCategory = activeCategory === t("cat_all") || catName === activeCategory;
//         const matchSearch = prodName.toLowerCase().includes(searchQuery.toLowerCase());
        
//         return matchCategory && matchSearch;
//       })
//       .sort((a, b) => {
//         const nameA = lang === "en" ? (a.name_en || a.name) : a.name;
//         const nameB = lang === "en" ? (b.name_en || b.name) : b.name;
//         if (sortBy === "name_asc") return nameA.localeCompare(nameB);
//         // Bisa tambahkan logic sort price disini jika digunakan nantinya
//         return b.id - a.id; 
//       });
//   }, [products, activeCategory, searchQuery, sortBy, lang, t]);

//   return (
//     <div className="min-h-screen font-sans bg-gray-50/50">
      
//       {/* Header Banner */}
//       <div className="relative py-20 overflow-hidden text-center bg-gray-900 border-b border-gray-800">
//         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598440947619-2ce6598c4e1d?q=80&w=1500')] bg-cover bg-center opacity-20"></div>
//         <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
//         <div className="relative z-10 px-4">
//           <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">{t("banner_title")}</h1>
//           <p className="max-w-2xl mx-auto mt-4 text-gray-300">
//             {t("banner_desc")}
//           </p>
//         </div>
//       </div>

//       <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
//         {/* --- FILTER & SEARCH BAR --- */}
//         <div className="flex flex-col gap-6 mb-10 md:flex-row md:items-center md:justify-between">
          
//           {/* Categories Pills */}
//           <div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar md:pb-0">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setActiveCategory(cat)}
//                 className={`px-5 py-2 text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap rounded-full border ${
//                   activeCategory === cat 
//                     ? "bg-gray-900 text-white border-gray-900 shadow-md" 
//                     : "bg-white text-gray-600 border-gray-200 hover:border-gycora hover:text-gycora"
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>

//           <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
//             {/* Search Input */}
//             <div className="relative">
//               <svg className="absolute w-4 h-4 text-gray-400 left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
//               <input 
//                 type="text" 
//                 placeholder={t("search_prod_placeholder")} 
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full py-2 pl-10 pr-4 text-sm transition-shadow bg-white border border-gray-200 rounded-full outline-none focus:ring-2 focus:ring-gycora/50 focus:border-gycora sm:w-64"
//               />
//             </div>
//           </div>
//         </div>

//         {/* --- PRODUCT GRID --- */}
//         {loading ? (
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-pulse">
//             {[...Array(8)].map((_, i) => (
//               <div key={i} className="flex flex-col overflow-hidden bg-white border border-gray-100 rounded-2xl">
//                 <div className="aspect-[4/5] bg-gray-200 w-full"></div>
//                 <div className="p-5 space-y-3">
//                   <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
//                   <div className="w-1/2 h-6 bg-gray-200 rounded"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : processedProducts.length === 0 ? (
//           <div className="py-20 text-center bg-white border border-gray-100 border-dashed rounded-3xl">
//             <h3 className="text-xl font-bold text-gray-700">{t("no_product_found")}</h3>
//             <p className="mt-2 text-gray-500">{t("no_product_desc")}</p>
//             <button onClick={() => {setSearchQuery(""); setActiveCategory(t("cat_all"));}} className="mt-6 text-sm font-bold text-gycora hover:underline">{t("reset_filter")}</button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {processedProducts.map((product) => {
//               const isWished = wishlistIds.includes(product.id);
//               const isAdding = addingToCartId === product.id;
              
//               // Nama & kategori dinamis sesuai bahasa
//               const displayCategory = lang === "en" ? (product.category_en || product.category_name) : product.category_name;
//               const displayName = lang === "en" ? (product.name_en || product.name) : product.name;
              
//               // Validasi warna untuk label tombol
//               let hasColors = false;
//               if (product.color) {
//                 if (Array.isArray(product.color) && product.color.length > 0) hasColors = true;
//                 else if (typeof product.color === 'string' && product.color.length > 0 && product.color !== "[]") hasColors = true;
//               }

//               return (
//                 <Link 
//                   key={product.id} 
//                   to={`/product/${product.slug}`} 
//                   state={{ 
//                     initialProduct: product,
//                     allProducts: products
//                   }}
//                   className="relative flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm group rounded-2xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1"
//                 >
//                   <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
//                     {product.image_url ? (
//                       <img 
//                         src={product.image_url} 
//                         alt={displayName} 
//                         className="object-cover object-center w-full h-full transition-transform duration-700 group-hover:scale-105"
//                       />
//                     ) : (
//                       <div className="flex items-center justify-center w-full h-full font-medium text-gray-400">
//                         {t("no_image_text")}
//                       </div>
//                     )}
                    
//                     <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-gray-900/60 to-transparent group-hover:opacity-100"></div>
                    
//                     <div className="absolute flex flex-col gap-2 top-3 left-3">
//                       <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-md shadow-sm bg-white/90 backdrop-blur-sm">
//                         {displayCategory}
//                       </span>
//                       {product.stock < 5 && product.stock > 0 && (
//                         <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm bg-red-500/90 backdrop-blur-sm animate-pulse">
//                           {t("stock_warning", { stock: product.stock.toString() })}
//                         </span>
//                       )}
//                       {product.stock === 0 && (
//                          <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm bg-gray-900/90 backdrop-blur-sm">
//                           {t("status_out_of_stock")}
//                         </span>
//                       )}
//                     </div>

//                     <button 
//                       onClick={(e) => handleToggleWishlist(e, product.id)}
//                       className="absolute z-10 flex items-center justify-center w-10 h-10 transition-colors bg-white rounded-full shadow-md top-3 right-3 hover:bg-gray-50"
//                     >
//                       <svg 
//                         xmlns="http://www.w3.org/2000/svg" 
//                         viewBox="0 0 24 24" 
//                         strokeWidth={1.5} 
//                         stroke="currentColor" 
//                         className={`w-5 h-5 transition-all duration-300 ${isWished ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}
//                       >
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                       </svg>
//                     </button>

//                     <div className="absolute left-0 right-0 px-4 transition-all duration-300 translate-y-full opacity-0 bottom-4 group-hover:translate-y-0 group-hover:opacity-100">
//                       <button 
//                         disabled={product.stock === 0 || isAdding}
//                         onClick={(e) => handleQuickAddToCart(e, product)}
//                         className="w-full py-3 text-xs font-bold tracking-widest text-gray-900 uppercase transition-colors bg-white shadow-xl rounded-xl hover:bg-gycora hover:text-white disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
//                       >
//                         {isAdding ? t("btn_processing") : hasColors ? t("btn_choose_variant") : t("btn_add_to_cart")}
//                       </button>
//                     </div>
//                   </div>

//                   <div className="flex flex-col flex-grow p-5 bg-white">
//                     <h3 className="mb-1 text-sm font-bold text-gray-900 transition-colors sm:text-base group-hover:text-gycora line-clamp-2">
//                       {displayName}
//                     </h3>
//                     <div className="pt-3 mt-auto">
//                       <p className="text-lg font-black text-gray-900">
//                         {formatRupiah(product.price)}
//                       </p>
//                     </div>
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import Swal from "sweetalert2";
import { BASE_URL } from "../../../config/api";
import { useCart } from "../../../context/CartContext";
import { useLanguage } from "../../../context/LanguageContext";

interface Product {
  id: number;
  category_name: string;
  sku?: string;
  name: string;
  slug: string;
  description?: string;
  benefits?: string;
  price: number;
  discount_price?: number;
  voucher_discount_price?: number;
  stock: number;
  image_url: string;
  variant_images?: string[];
  variant_video?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  color?: any; 
  name_en?: string;
  category_en?: string;
}

const translateText = async (text: string, langTo: string): Promise<string> => {
  if (!text) return "";
  try {
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=id|${langTo}&de=admin@gycora.com`);
    const data = await res.json();
    if (data?.responseData?.translatedText && !data.responseData.translatedText.includes("MYMEMORY WARNING")) {
      return data.responseData.translatedText;
    }
    return text;
  } catch { 
    return text; 
  }
};

export default function PublicCatalog() {
  const navigate = useNavigate();
  // [PERBAIKAN]: Ambil lang dari Context
  const { t, lang } = useLanguage(); 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { fetchCart } = useCart() as any;
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(t("cat_all"));
  const [sortBy] = useState("name_asc"); 
  const [addingToCartId, setAddingToCartId] = useState<number | null>(null);

  useEffect(() => {
    setActiveCategory(t("cat_all"));
  }, [lang, t]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/api/products`);
        if (!res.ok) throw new Error("Gagal mengambil data produk");

        const responseData = await res.json();
        let productsArray = responseData.data ? responseData.data : responseData;
        productsArray = productsArray || [];

        if (lang === "en") {
          productsArray = await Promise.all(productsArray.map(async (p: Product) => ({
            ...p,
            name_en: await translateText(p.name, "en"),
            category_en: await translateText(p.category_name, "en")
          })));
        }

        setProducts(productsArray);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchWishlists = async () => {
      const token = localStorage.getItem("user_token");
      if (!token) return; 

      try {
        const res = await fetch(`${BASE_URL}/api/wishlists`, {
          headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
        });
        if (res.ok) {
          const data = await res.json();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setWishlistIds(data.map((item: any) => item.product_id));
        }
      } catch (error) {
        console.error("Gagal mengambil wishlist:", error);
      }
    };

    fetchProducts();
    fetchWishlists();
  }, [lang]);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const handleToggleWishlist = async (e: React.MouseEvent, productId: number) => {
    e.preventDefault(); 

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
        cancelButtonText: t("cancel")
      }).then((result) => {
        // [PERBAIKAN]: Tambahkan prefix bahasa
        if (result.isConfirmed) navigate(`/${lang}/login`);
      });
      return;
    }

    const isWished = wishlistIds.includes(productId);
    if (isWished) {
      setWishlistIds((prev) => prev.filter(id => id !== productId));
    } else {
      setWishlistIds((prev) => [...prev, productId]);
    }

    try {
      const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        },
        body: JSON.stringify({ product_id: productId })
      });
      
      if (!res.ok) throw new Error("Gagal memproses wishlist");
    } catch (error) {
      if (isWished) {
        setWishlistIds((prev) => [...prev, productId]);
      } else {
        setWishlistIds((prev) => prev.filter(id => id !== productId));
      }
      console.error(error);
    }
  };

  const handleQuickAddToCart = async (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    
    const token = localStorage.getItem("user_token");
    if (!token) {
      Swal.fire({ title: t("login_required"), text: t("login_required_desc"), icon: "info" });
      // [PERBAIKAN]: Tambahkan prefix bahasa
      navigate(`/${lang}/login`);
      return;
    }

    let hasVariants = false;
    if (product.color) {
      if (Array.isArray(product.color) && product.color.length > 0) {
        hasVariants = true;
      } else if (typeof product.color === 'string' && product.color.length > 0 && product.color !== "[]") {
        hasVariants = true;
      }
    }

    if (hasVariants) {
      // [PERBAIKAN]: Tambahkan prefix bahasa
      navigate(`/${lang}/page/${product.slug}`);
      return;
    }

    setAddingToCartId(product.id);
    try {
      const res = await fetch(`${BASE_URL}/api/carts`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ product_id: product.id, quantity: 1 }),
      });
      if (res.ok) {
        Swal.fire({ title: "Berhasil", text: t("added_to_cart"), icon: "success", toast: true, position: "top-end", timer: 1500, showConfirmButton: false });
        if(fetchCart) fetchCart();
      } else {
        const err = await res.json();
        Swal.fire("Peringatan", err.message || "Gagal menambahkan produk", "warning");
      }
    } catch (error) {
      Swal.fire("Error", "Terjadi kesalahan koneksi.", "error");
    } finally {
      setAddingToCartId(null);
    }
  };

  const categories = [t("cat_all"), ...Array.from(new Set(products.map((p) => lang === "en" ? (p.category_en || p.category_name) : p.category_name).filter(Boolean)))];

  const processedProducts = useMemo(() => {
    return products
      .filter((p) => {
        const catName = lang === "en" ? (p.category_en || p.category_name) : p.category_name;
        const prodName = lang === "en" ? (p.name_en || p.name) : p.name;
        
        const matchCategory = activeCategory === t("cat_all") || catName === activeCategory;
        const matchSearch = prodName.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchCategory && matchSearch;
      })
      .sort((a, b) => {
        const nameA = lang === "en" ? (a.name_en || a.name) : a.name;
        const nameB = lang === "en" ? (b.name_en || b.name) : b.name;
        if (sortBy === "name_asc") return nameA.localeCompare(nameB);
        return b.id - a.id; 
      });
  }, [products, activeCategory, searchQuery, sortBy, lang, t]);

  return (
    <div className="min-h-screen font-sans bg-gray-50/50">
      
      {/* Header Banner */}
      <div className="relative py-20 overflow-hidden text-center bg-gray-900 border-b border-gray-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598440947619-2ce6598c4e1d?q=80&w=1500')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">{t("banner_title")}</h1>
          <p className="max-w-2xl mx-auto mt-4 text-gray-300">
            {t("banner_desc")}
          </p>
        </div>
      </div>

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
        {/* --- FILTER & SEARCH BAR --- */}
        <div className="flex flex-col gap-6 mb-10 md:flex-row md:items-center md:justify-between">
          
          <div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap rounded-full border ${
                  activeCategory === cat 
                    ? "bg-gray-900 text-white border-gray-900 shadow-md" 
                    : "bg-white text-gray-600 border-gray-200 hover:border-gycora hover:text-gycora"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative">
              <svg className="absolute w-4 h-4 text-gray-400 left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input 
                type="text" 
                placeholder={t("search_prod_placeholder")} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-10 pr-4 text-sm transition-shadow bg-white border border-gray-200 rounded-full outline-none focus:ring-2 focus:ring-gycora/50 focus:border-gycora sm:w-64"
              />
            </div>
          </div>
        </div>

        {/* --- PRODUCT GRID --- */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col overflow-hidden bg-white border border-gray-100 rounded-2xl">
                <div className="aspect-[4/5] bg-gray-200 w-full"></div>
                <div className="p-5 space-y-3">
                  <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                  <div className="w-1/2 h-6 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : processedProducts.length === 0 ? (
          <div className="py-20 text-center bg-white border border-gray-100 border-dashed rounded-3xl">
            <h3 className="text-xl font-bold text-gray-700">{t("no_product_found")}</h3>
            <p className="mt-2 text-gray-500">{t("no_product_desc")}</p>
            <button onClick={() => {setSearchQuery(""); setActiveCategory(t("cat_all"));}} className="mt-6 text-sm font-bold text-gycora hover:underline">{t("reset_filter")}</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {processedProducts.map((product) => {
              const isWished = wishlistIds.includes(product.id);
              const isAdding = addingToCartId === product.id;
              
              const displayCategory = lang === "en" ? (product.category_en || product.category_name) : product.category_name;
              const displayName = lang === "en" ? (product.name_en || product.name) : product.name;
              
              let hasColors = false;
              if (product.color) {
                if (Array.isArray(product.color) && product.color.length > 0) hasColors = true;
                else if (typeof product.color === 'string' && product.color.length > 0 && product.color !== "[]") hasColors = true;
              }

              return (
                // [PERBAIKAN]: Menambahkan `/${lang}` di prop `to`
                <Link 
                  key={product.id} 
                  to={`/${lang}/product/${product.slug}`} 
                  state={{ 
                    initialProduct: product,
                    allProducts: products
                  }}
                  className="relative flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm group rounded-2xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
                    {product.image_url ? (
                      <img 
                        src={product.image_url} 
                        alt={displayName} 
                        className="object-cover object-center w-full h-full transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full font-medium text-gray-400">
                        {t("no_image_text")}
                      </div>
                    )}
                    
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-gray-900/60 to-transparent group-hover:opacity-100"></div>
                    
                    <div className="absolute flex flex-col gap-2 top-3 left-3">
                      <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-md shadow-sm bg-white/90 backdrop-blur-sm">
                        {displayCategory}
                      </span>
                      {product.stock < 5 && product.stock > 0 && (
                        <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm bg-red-500/90 backdrop-blur-sm animate-pulse">
                          {t("stock_warning", { stock: product.stock.toString() })}
                        </span>
                      )}
                      {product.stock === 0 && (
                         <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm bg-gray-900/90 backdrop-blur-sm">
                          {t("status_out_of_stock")}
                        </span>
                      )}
                    </div>

                    <button 
                      onClick={(e) => handleToggleWishlist(e, product.id)}
                      className="absolute z-10 flex items-center justify-center w-10 h-10 transition-colors bg-white rounded-full shadow-md top-3 right-3 hover:bg-gray-50"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className={`w-5 h-5 transition-all duration-300 ${isWished ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    </button>

                    <div className="absolute left-0 right-0 px-4 transition-all duration-300 translate-y-full opacity-0 bottom-4 group-hover:translate-y-0 group-hover:opacity-100">
                      <button 
                        disabled={product.stock === 0 || isAdding}
                        onClick={(e) => handleQuickAddToCart(e, product)}
                        className="w-full py-3 text-xs font-bold tracking-widest text-gray-900 uppercase transition-colors bg-white shadow-xl rounded-xl hover:bg-gycora hover:text-white disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        {isAdding ? t("btn_processing") : hasColors ? t("btn_choose_variant") : t("btn_add_to_cart")}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow p-5 bg-white">
                    <h3 className="mb-1 text-sm font-bold text-gray-900 transition-colors sm:text-base group-hover:text-gycora line-clamp-2">
                      {displayName}
                    </h3>
                    <div className="pt-3 mt-auto">
                      <p className="text-lg font-black text-gray-900">
                        {formatRupiah(product.price)}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}