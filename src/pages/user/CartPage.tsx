/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart, type CartItem, type Product } from "../../context/CartContext";
// import { BASE_URL } from "../../config/api";

// export default function CartPage() {
//   const navigate = useNavigate();
//   const { cartItems, fetchCart } = useCart();

//   // State untuk Pemilihan Item
//   const [selectedIds, setSelectedIds] = useState<number[]>([]);
//   const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

//   // State untuk Rekomendasi Produk
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   // const [suggestedProducts, setSuggestedProducts] = useState<any[]>([]);
//   // const [suggestedProducts, setSuggestedProducts] = useState<CartItem["product"][]>([]);
//   const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
//   const [loadingSuggestions, setLoadingSuggestions] = useState(true);

//   // --- LOGIKA PEMILIHAN (SELECTION) ---
//   // Hapus ID dari state selection jika item sudah dihapus dari keranjang
//   useEffect(() => {
//     setSelectedIds((prev) => prev.filter((id) => cartItems.some((item) => item.id === id)));
//   }, [cartItems]);

//   const isAllSelected = cartItems.length > 0 && selectedIds.length === cartItems.length;

//   const handleSelectAll = () => {
//     if (isAllSelected) {
//       setSelectedIds([]); // Deselect all
//     } else {
//       setSelectedIds(cartItems.map((item) => item.id)); // Select all
//     }
//   };

//   const handleSelectItem = (id: number) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
//     );
//   };

//   // --- LOGIKA PERHITUNGAN CHECKOUT ---
//   const checkoutTotalAmount = useMemo(() => {
//     return cartItems
//       .filter((item) => selectedIds.includes(item.id))
//       .reduce((total, item) => total + Number(item.gross_amount), 0);
//   }, [cartItems, selectedIds]);

//   // --- LOGIKA OPTIMISTIC UI (UPDATE & DELETE) ---
//   const handleQtyChange = async (item: CartItem, newQty: number) => {
//     if (newQty < 1 || newQty > item.product.stock) {
//         if(newQty > item.product.stock) Swal.fire("Peringatan", `Stok maksimum ${item.product.stock} tercapai.`, "warning");
//         return;
//     }

//     const token = localStorage.getItem("user_token");
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts/${item.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ quantity: newQty }),
//       });
//       if (!res.ok) {
//           const err = await res.json();
//           Swal.fire("Peringatan", err.message || "Gagal mengubah kuantitas", "warning");
//       }
//       fetchCart();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleOptimisticDelete = async (id: number) => {
//     const token = localStorage.getItem("user_token");
//     try {
//       // Langsung panggil API penghapusan
//       await fetch(`${BASE_URL}/api/carts/${id}`, {
//         method: "DELETE",
//         headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
//       });
//       fetchCart(); // Sinkronisasi ulang data
//     } catch (error) {
//       console.error(error);
//       Swal.fire("Error", "Gagal menghapus item", "error");
//     }
//   };

//   // --- LOGIKA REKOMENDASI PRODUK ---
//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         const data = await res.json();
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         const products: any[] = data.data ? data.data : data;

//         // Filter produk yang sudah ada di keranjang & stok kosong
//         const cartProductIds = cartItems.map((item) => item.product_id);
//         const available = products.filter((p) => !cartProductIds.includes(p.id) && p.stock > 0);

//         // Acak (Shuffle) dan ambil 4 teratas
//         const shuffled = available.sort(() => 0.5 - Math.random());
//         setSuggestedProducts(shuffled.slice(0, 4));
//       } catch (error) {
//         console.error("Gagal memuat rekomendasi:", error);
//       } finally {
//         setLoadingSuggestions(false);
//       }
//     };
//     fetchSuggestions();
//   }, [cartItems]); // Refresh rekomendasi jika isi keranjang berubah

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   // const addSuggestedProduct = async (product: any) => {

//   // Kita harus menambahkan 'id' ke dalam tipe karena API produk mengembalikan objek dengan id,
//   // sedangkan di CartItem.product, id tersebut tidak dideklarasikan (hanya ada product_id di CartItem-nya)
//   // const addSuggestedProduct = async (product: CartItem["product"] & { id: number }) => {
//   const addSuggestedProduct = async (product: Product) => {
//     const token = localStorage.getItem("user_token");
//     if(!token) {
//         navigate("/login");
//         return;
//     }
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ product_id: product.id, quantity: 1 }),
//       });
//       if (res.ok) {
//         Swal.fire({ title: "Ditambahkan ke Keranjang", icon: "success", toast: true, position: "top-end", timer: 1500, showConfirmButton: false });
//         fetchCart();
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleCheckout = () => {
//     if (selectedIds.length === 0) return;
//     setIsProcessingCheckout(true);
//     // Simulasi loading sebelum pindah halaman
//     setTimeout(() => {
//         setIsProcessingCheckout(false);
//         // navigate("/checkout"); // Arahkan ke halaman checkout yang sesungguhnya nanti
//         navigate("/checkout", { state: { selectedIds: selectedIds } });
//     }, 800);
//   };

//   const formatPrice = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
//   };

//   return (
//     <div className="min-h-screen px-4 py-16 mx-auto font-sans max-w-7xl sm:px-6 lg:px-8">

//       {/* HEADER KERANJANG */}
//       <div className="flex items-center gap-4 mb-10 animate-fade-in-up">
//         <button
//           onClick={() => navigate("/products")}
//           className="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50"
//         >
//           <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//         <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
//           Keranjang Belanja
//         </h1>
//         <span className="ml-2 text-xl font-medium text-gray-400">
//           ({cartItems.length} items)
//         </span>
//       </div>

//       <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">

//         {/* AREA KIRI: DAFTAR ITEM & REKOMENDASI */}
//         <div className="flex-grow lg:w-2/3 animate-fade-in-up" style={{ animationDelay: "100ms" }}>

//           {cartItems.length === 0 ? (
//             <div className="py-20 text-center border border-gray-200 border-dashed rounded-3xl bg-gray-50">
//               <p className="mb-6 text-2xl font-medium text-gray-400">
//                 Keranjang Anda masih kosong.
//               </p>
//               <button
//                 onClick={() => navigate("/products")}
//                 className="px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition bg-gray-900 rounded-full shadow-xl hover:bg-black shadow-gray-200"
//               >
//                 Mulai Belanja
//               </button>
//             </div>
//           ) : (
//             <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-3xl sm:p-8">

//               {/* Checkbox Select All */}
//               <div className="flex items-center gap-4 pb-4 mb-4 border-b border-gray-100">
//                 <input
//                   type="checkbox"
//                   checked={isAllSelected}
//                   onChange={handleSelectAll}
//                   id="selectAll"
//                   className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora"
//                 />
//                 <label htmlFor="selectAll" className="text-xs font-bold tracking-widest text-gray-800 uppercase cursor-pointer select-none">
//                   Pilih Semua Item
//                 </label>
//               </div>

//               {/* List Keranjang */}
//               <div className="space-y-8">
//                 {cartItems.map((item) => (
//                   <div key={item.id} className="relative flex items-start gap-4 pb-8 border-b border-gray-50 sm:gap-6 last:border-0 last:pb-0">

//                     <div className="pt-3 sm:pt-12">
//                       <input
//                         type="checkbox"
//                         checked={selectedIds.includes(item.id)}
//                         onChange={() => handleSelectItem(item.id)}
//                         className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora"
//                       />
//                     </div>

//                     <div
//                       className="relative w-24 h-24 overflow-hidden border border-gray-100 cursor-pointer shrink-0 sm:w-40 sm:h-40 rounded-2xl bg-gray-50"
//                       onClick={() => navigate(`/product/${item.product.id}`)}
//                     >
//                       <img
//                         src={item.product.image_url}
//                         alt={item.product.name}
//                         className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
//                       />
//                     </div>

//                     <div className="flex flex-col justify-between flex-grow min-h-[6rem] sm:min-h-[10rem]">
//                       <div>
//                         <div className="flex items-start justify-between gap-2">
//                           <h3
//                             className="w-2/3 text-sm font-bold tracking-tight text-gray-900 transition-colors cursor-pointer sm:text-lg hover:text-gycora line-clamp-2"
//                             onClick={() => navigate(`/product/${item.product.id}`)}
//                           >
//                             {item.product.name}
//                           </h3>
//                           <p className="text-sm font-extrabold text-right sm:text-lg whitespace-nowrap text-gycora">
//                             {formatPrice(item.gross_amount)}
//                           </p>
//                         </div>

//                         <div className="flex flex-wrap items-center mt-2 gap-x-3 gap-y-1">
//                           <p className="text-xs italic tracking-wider text-gray-400">
//                             {formatPrice(item.product.price)} / pc
//                           </p>
//                           <span className="hidden w-1 h-1 bg-gray-300 rounded-full sm:block"></span>
//                           <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
//                             Stok Tersedia: <span className="text-gray-900">{item.product.stock}</span>
//                           </p>
//                         </div>
//                       </div>

//                       {/* Kontrol Kuantitas & Hapus */}
//                       <div className="flex flex-col items-start gap-4 mt-4 sm:flex-row sm:justify-between sm:items-end sm:mt-6">
//                         <div className="flex items-center overflow-hidden border border-gray-200 shadow-sm bg-gray-50 rounded-xl">
//                           <button
//                             onClick={() => handleQtyChange(item, item.quantity - 1)}
//                             className="px-4 py-2 text-base font-bold text-gray-700 transition-colors hover:bg-gray-200 sm:px-4 sm:py-2"
//                           >
//                             -
//                           </button>
//                           <span className="w-10 text-sm font-bold text-center text-gray-900 sm:w-12 sm:text-base">
//                             {item.quantity}
//                           </span>
//                           <button
//                             onClick={() => handleQtyChange(item, item.quantity + 1)}
//                             className="px-4 py-2 text-base font-bold text-gray-700 transition-colors hover:bg-gray-200 sm:px-4 sm:py-2"
//                           >
//                             +
//                           </button>
//                         </div>

//                         <button
//                           onClick={() => handleOptimisticDelete(item.id)}
//                           className="flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest text-gray-400 uppercase transition-colors group hover:text-red-500"
//                         >
//                           <svg className="w-4 h-4 transition-transform sm:w-5 sm:h-5 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                           </svg>
//                           Hapus
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* AREA REKOMENDASI PRODUK */}
//           <div className="pt-12 mt-12 border-t border-gray-100">
//             <h3 className="mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase">
//               Mungkin Anda Juga Suka
//             </h3>

//             {loadingSuggestions ? (
//               <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
//                 {[1, 2, 3, 4].map((i) => (
//                   <div key={i} className="flex flex-col gap-2">
//                     <div className="bg-gray-100 aspect-square rounded-2xl animate-pulse"></div>
//                     <div className="w-3/4 h-3 mt-1 bg-gray-100 rounded animate-pulse"></div>
//                     <div className="w-1/2 h-3 bg-gray-100 rounded animate-pulse"></div>
//                   </div>
//                 ))}
//               </div>
//             ) : suggestedProducts.length > 0 ? (
//               <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
//                 {suggestedProducts.map((product) => (
//                   <div key={product.id} className="flex flex-col group">
//                     <div
//                       className="relative mb-3 overflow-hidden border border-gray-100 cursor-pointer aspect-square rounded-2xl bg-gray-50"
//                       onClick={() => navigate(`/product/${product.id}`)}
//                     >
//                       <img
//                         src={product.image_url}
//                         alt={product.name}
//                         className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
//                       />
//                     </div>
//                     <h4 className="mb-1 text-[11px] font-bold tracking-wide text-gray-900 uppercase truncate">
//                       {product.name}
//                     </h4>
//                     <p className="mb-3 text-xs font-bold text-gycora">
//                       {formatPrice(product.price)}
//                     </p>
//                     <button
//                       onClick={() => addSuggestedProduct(product)}
//                       className="px-3 py-2 mt-auto text-[9px] font-bold tracking-widest text-gray-700 uppercase transition-all duration-300 border border-gray-200 rounded-xl hover:border-gray-900 hover:bg-gray-900 hover:text-white"
//                     >
//                       Tambah +
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             ) : null}
//           </div>
//         </div>

//         {/* AREA KANAN: ORDER SUMMARY */}
//         {cartItems.length > 0 && (
//           <div className="lg:w-1/3 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//             <div className="sticky p-8 bg-gray-50/50 border border-gray-100 rounded-[2rem] top-32 shadow-sm">
//               <h2 className="pb-4 mb-8 text-lg font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">
//                 Ringkasan Pesanan
//               </h2>

//               <div className="mb-8 space-y-4">
//                 <div className="flex justify-between text-sm text-gray-600">
//                   <span>Item Dipilih</span>
//                   <span className="font-bold text-gray-900">{selectedIds.length}</span>
//                 </div>

//                 <div className="flex items-end justify-between pt-4 border-t border-gray-200">
//                   <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
//                     Estimasi Total
//                   </span>
//                   <span className="text-2xl font-black text-gycora">
//                     {formatPrice(checkoutTotalAmount)}
//                   </span>
//                 </div>
//                 <p className="mt-1 text-right text-[10px] italic text-gray-400">
//                   Pajak & pengiriman dihitung saat checkout.
//                 </p>
//               </div>

//               <button
//                 onClick={handleCheckout}
//                 disabled={isProcessingCheckout || selectedIds.length === 0}
//                 className="flex items-center justify-center w-full gap-3 py-5 text-sm font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/20"
//               >
//                 {!isProcessingCheckout ? (
//                   `Checkout (${selectedIds.length})`
//                 ) : (
//                   <span className="flex items-center gap-2">
//                     <div className="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"></div>
//                     Memproses...
//                   </span>
//                 )}
//               </button>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart, type Product } from "../../context/CartContext";
// import { BASE_URL } from "../../config/api";

// // Definisikan secara lokal struktur cart item jika CartContext tidak diexport lengkap
// interface CartItem {
//   id: number;
//   product_id: number;
//   product: Product;
//   quantity: number;
//   gross_amount: number;
//   color?: string | null; // Pastikan TypeScript mengenali ada atribut color
// }

// export default function CartPage() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const { cartItems, fetchCart } = useCart() as any;

//   const [selectedIds, setSelectedIds] = useState<number[]>([]);
//   const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

//   const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
//   const [loadingSuggestions, setLoadingSuggestions] = useState(true);

//   useEffect(() => {
//     setSelectedIds((prev) => prev.filter((id) => cartItems.some((item: CartItem) => item.id === id)));
//   }, [cartItems]);

//   const isAllSelected = cartItems.length > 0 && selectedIds.length === cartItems.length;

//   const handleSelectAll = () => {
//     if (isAllSelected) setSelectedIds([]);
//     else setSelectedIds(cartItems.map((item: CartItem) => item.id));
//   };

//   const handleSelectItem = (id: number) => {
//     setSelectedIds((prev) => prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]);
//   };

//   const checkoutTotalAmount = useMemo(() => {
//     return cartItems
//       .filter((item: CartItem) => selectedIds.includes(item.id))
//       .reduce((total: number, item: CartItem) => total + Number(item.gross_amount), 0);
//   }, [cartItems, selectedIds]);

//   const handleQtyChange = async (item: CartItem, newQty: number) => {
//     if (newQty < 1 || newQty > item.product.stock) {
//         if(newQty > item.product.stock) Swal.fire("Peringatan", `Stok maksimum ${item.product.stock} tercapai.`, "warning");
//         return;
//     }

//     const token = localStorage.getItem("user_token");
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts/${item.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ quantity: newQty }),
//       });
//       if (!res.ok) {
//           const err = await res.json();
//           Swal.fire("Peringatan", err.message || "Gagal mengubah kuantitas", "warning");
//       }
//       fetchCart();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleOptimisticDelete = async (id: number) => {
//     const token = localStorage.getItem("user_token");
//     try {
//       await fetch(`${BASE_URL}/api/carts/${id}`, {
//         method: "DELETE",
//         headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
//       });
//       fetchCart();
//     } catch (error) {
//       console.error(error);
//       Swal.fire("Error", "Gagal menghapus item", "error");
//     }
//   };

//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         const data = await res.json();
//         const products: any[] = data.data ? data.data : data;

//         const cartProductIds = cartItems.map((item: CartItem) => item.product_id);
//         const available = products.filter((p) => !cartProductIds.includes(p.id) && p.stock > 0);

//         const shuffled = available.sort(() => 0.5 - Math.random());
//         setSuggestedProducts(shuffled.slice(0, 4));
//       } catch (error) {
//         console.error("Gagal memuat rekomendasi:", error);
//       } finally {
//         setLoadingSuggestions(false);
//       }
//     };
//     fetchSuggestions();
//   }, [cartItems]);

//   const addSuggestedProduct = async (product: Product) => {
//     const token = localStorage.getItem("user_token");
//     if(!token) {
//         navigate("/login");
//         return;
//     }

//     // Jika produk punya varian warna, arahkan ke detail agar milih warna
//     if (product.color && product.color.length > 0) {
//         navigate(`/product/${product.id}`);
//         return;
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ product_id: product.id, quantity: 1 }),
//       });
//       if (res.ok) {
//         Swal.fire({ title: "Ditambahkan ke Keranjang", icon: "success", toast: true, position: "top-end", timer: 1500, showConfirmButton: false });
//         fetchCart();
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleCheckout = () => {
//     if (selectedIds.length === 0) return;
//     setIsProcessingCheckout(true);
//     setTimeout(() => {
//         setIsProcessingCheckout(false);
//         navigate("/checkout", { state: { selectedIds: selectedIds } });
//     }, 800);
//   };

//   const formatPrice = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
//   };

//   return (
//     <div className="min-h-screen px-4 py-16 mx-auto font-sans max-w-7xl sm:px-6 lg:px-8">

//       <div className="flex items-center gap-4 mb-10 animate-fade-in-up">
//         <button
//           onClick={() => navigate("/products")}
//           className="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50"
//         >
//           <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//         <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
//           Keranjang Belanja
//         </h1>
//         <span className="ml-2 text-xl font-medium text-gray-400">
//           ({cartItems.length} items)
//         </span>
//       </div>

//       <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">

//         <div className="flex-grow lg:w-2/3 animate-fade-in-up" style={{ animationDelay: "100ms" }}>

//           {cartItems.length === 0 ? (
//             <div className="py-20 text-center border border-gray-200 border-dashed rounded-3xl bg-gray-50">
//               <p className="mb-6 text-2xl font-medium text-gray-400">Keranjang Anda masih kosong.</p>
//               <button
//                 onClick={() => navigate("/products")}
//                 className="px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition bg-gray-900 rounded-full shadow-xl hover:bg-black shadow-gray-200"
//               >
//                 Mulai Belanja
//               </button>
//             </div>
//           ) : (
//             <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-3xl sm:p-8">

//               <div className="flex items-center gap-4 pb-4 mb-4 border-b border-gray-100">
//                 <input
//                   type="checkbox"
//                   checked={isAllSelected}
//                   onChange={handleSelectAll}
//                   id="selectAll"
//                   className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora"
//                 />
//                 <label htmlFor="selectAll" className="text-xs font-bold tracking-widest text-gray-800 uppercase cursor-pointer select-none">
//                   Pilih Semua Item
//                 </label>
//               </div>

//               <div className="space-y-8">
//                 {cartItems.map((item: CartItem) => (
//                   <div key={item.id} className="relative flex items-start gap-4 pb-8 border-b border-gray-50 sm:gap-6 last:border-0 last:pb-0">

//                     <div className="pt-3 sm:pt-12">
//                       <input
//                         type="checkbox"
//                         checked={selectedIds.includes(item.id)}
//                         onChange={() => handleSelectItem(item.id)}
//                         className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora"
//                       />
//                     </div>

//                     <div
//                       className="relative w-24 h-24 overflow-hidden border border-gray-100 cursor-pointer shrink-0 sm:w-40 sm:h-40 rounded-2xl bg-gray-50"
//                       onClick={() => navigate(`/product/${item.product.id}`)}
//                     >
//                       <img
//                         src={item.product.image_url}
//                         alt={item.product.name}
//                         className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
//                       />
//                     </div>

//                     <div className="flex flex-col justify-between flex-grow min-h-[6rem] sm:min-h-[10rem]">
//                       <div>
//                         <div className="flex items-start justify-between gap-2">
//                           <h3
//                             className="w-2/3 text-sm font-bold tracking-tight text-gray-900 transition-colors cursor-pointer sm:text-lg hover:text-gycora line-clamp-2"
//                             onClick={() => navigate(`/product/${item.product.id}`)}
//                           >
//                             {item.product.name}
//                           </h3>
//                           <p className="text-sm font-extrabold text-right sm:text-lg whitespace-nowrap text-gycora">
//                             {formatPrice(item.gross_amount)}
//                           </p>
//                         </div>

//                         {/* DISPLAY WARNA DARI KERANJANG */}
//                         {item.color && (
//                           <div className="flex items-center gap-2 mt-2">
//                             <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Varian:</span>
//                             <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 border border-gray-200 rounded-md">
//                               <span className="w-3 h-3 border border-gray-300 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></span>
//                               <span className="text-[10px] font-mono text-gray-700">{item.color}</span>
//                             </div>
//                           </div>
//                         )}

//                         <div className="flex flex-wrap items-center mt-2 gap-x-3 gap-y-1">
//                           <p className="text-xs italic tracking-wider text-gray-400">
//                             {formatPrice(item.product.price)} / pc
//                           </p>
//                           <span className="hidden w-1 h-1 bg-gray-300 rounded-full sm:block"></span>
//                           <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
//                             Stok Tersedia: <span className="text-gray-900">{item.product.stock}</span>
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex flex-col items-start gap-4 mt-4 sm:flex-row sm:justify-between sm:items-end sm:mt-6">
//                         <div className="flex items-center overflow-hidden border border-gray-200 shadow-sm bg-gray-50 rounded-xl">
//                           <button
//                             onClick={() => handleQtyChange(item, item.quantity - 1)}
//                             className="px-4 py-2 text-base font-bold text-gray-700 transition-colors hover:bg-gray-200 sm:px-4 sm:py-2"
//                           >
//                             -
//                           </button>
//                           <span className="w-10 text-sm font-bold text-center text-gray-900 sm:w-12 sm:text-base">
//                             {item.quantity}
//                           </span>
//                           <button
//                             onClick={() => handleQtyChange(item, item.quantity + 1)}
//                             className="px-4 py-2 text-base font-bold text-gray-700 transition-colors hover:bg-gray-200 sm:px-4 sm:py-2"
//                           >
//                             +
//                           </button>
//                         </div>

//                         <button
//                           onClick={() => handleOptimisticDelete(item.id)}
//                           className="flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest text-gray-400 uppercase transition-colors group hover:text-red-500"
//                         >
//                           <svg className="w-4 h-4 transition-transform sm:w-5 sm:h-5 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                           </svg>
//                           Hapus
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="pt-12 mt-12 border-t border-gray-100">
//             <h3 className="mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase">
//               Mungkin Anda Juga Suka
//             </h3>

//             {loadingSuggestions ? (
//               <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
//                 {[1, 2, 3, 4].map((i) => (
//                   <div key={i} className="flex flex-col gap-2">
//                     <div className="bg-gray-100 aspect-square rounded-2xl animate-pulse"></div>
//                     <div className="w-3/4 h-3 mt-1 bg-gray-100 rounded animate-pulse"></div>
//                     <div className="w-1/2 h-3 bg-gray-100 rounded animate-pulse"></div>
//                   </div>
//                 ))}
//               </div>
//             ) : suggestedProducts.length > 0 ? (
//               <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
//                 {suggestedProducts.map((product) => (
//                   <div key={product.id} className="flex flex-col group">
//                     <div
//                       className="relative mb-3 overflow-hidden border border-gray-100 cursor-pointer aspect-square rounded-2xl bg-gray-50"
//                       onClick={() => navigate(`/product/${product.id}`)}
//                     >
//                       <img
//                         src={product.image_url}
//                         alt={product.name}
//                         className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
//                       />
//                     </div>
//                     <h4 className="mb-1 text-[11px] font-bold tracking-wide text-gray-900 uppercase truncate">
//                       {product.name}
//                     </h4>
//                     <p className="mb-3 text-xs font-bold text-gycora">
//                       {formatPrice(product.price)}
//                     </p>
//                     <button
//                       onClick={() => addSuggestedProduct(product)}
//                       className="px-3 py-2 mt-auto text-[9px] font-bold tracking-widest text-gray-700 uppercase transition-all duration-300 border border-gray-200 rounded-xl hover:border-gray-900 hover:bg-gray-900 hover:text-white"
//                     >
//                       {product.color && product.color.length > 0 ? "Pilih Varian" : "Tambah +"}
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             ) : null}
//           </div>
//         </div>

//         {cartItems.length > 0 && (
//           <div className="lg:w-1/3 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//             <div className="sticky p-8 bg-gray-50/50 border border-gray-100 rounded-[2rem] top-32 shadow-sm">
//               <h2 className="pb-4 mb-8 text-lg font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">
//                 Ringkasan Pesanan
//               </h2>

//               <div className="mb-8 space-y-4">
//                 <div className="flex justify-between text-sm text-gray-600">
//                   <span>Item Dipilih</span>
//                   <span className="font-bold text-gray-900">{selectedIds.length}</span>
//                 </div>

//                 <div className="flex items-end justify-between pt-4 border-t border-gray-200">
//                   <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
//                     Estimasi Total
//                   </span>
//                   <span className="text-2xl font-black text-gycora">
//                     {formatPrice(checkoutTotalAmount)}
//                   </span>
//                 </div>
//                 <p className="mt-1 text-right text-[10px] italic text-gray-400">
//                   Pajak & pengiriman dihitung saat checkout.
//                 </p>
//               </div>

//               <button
//                 onClick={handleCheckout}
//                 disabled={isProcessingCheckout || selectedIds.length === 0}
//                 className="flex items-center justify-center w-full gap-3 py-5 text-sm font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/20"
//               >
//                 {!isProcessingCheckout ? (
//                   `Checkout (${selectedIds.length})`
//                 ) : (
//                   <span className="flex items-center gap-2">
//                     <div className="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"></div>
//                     Memproses...
//                   </span>
//                 )}
//               </button>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart, type Product } from "../../context/CartContext";
// import { BASE_URL } from "../../config/api";

// // Definisikan secara lokal struktur cart item jika CartContext tidak diexport lengkap
// interface CartItem {
//   id: number;
//   product_id: number;
//   product: Product;
//   quantity: number;
//   gross_amount: number;
//   color?: string | null;
// }

// export default function CartPage() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const { cartItems: contextCartItems, fetchCart } = useCart() as any;

//   // STATE BARU: Local state untuk Optimistic UI
//   const [localCartItems, setLocalCartItems] = useState<CartItem[]>([]);

//   const [selectedIds, setSelectedIds] = useState<number[]>([]);
//   const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

//   const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
//   const [loadingSuggestions, setLoadingSuggestions] = useState(true);

//   // Sync state lokal dengan global context ketika data dari server masuk
//   useEffect(() => {
//     setLocalCartItems(contextCartItems);
//   }, [contextCartItems]);

//   useEffect(() => {
//     setSelectedIds((prev) => prev.filter((id) => localCartItems.some((item) => item.id === id)));
//   }, [localCartItems]);

//   const isAllSelected = localCartItems.length > 0 && selectedIds.length === localCartItems.length;

//   const handleSelectAll = () => {
//     if (isAllSelected) setSelectedIds([]);
//     else setSelectedIds(localCartItems.map((item) => item.id));
//   };

//   const handleSelectItem = (id: number) => {
//     setSelectedIds((prev) => prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]);
//   };

//   const checkoutTotalAmount = useMemo(() => {
//     return localCartItems
//       .filter((item) => selectedIds.includes(item.id))
//       .reduce((total, item) => total + Number(item.gross_amount), 0);
//   }, [localCartItems, selectedIds]);

//   // --- OPTIMISTIC QTY UPDATE ---
//   const handleQtyChange = async (item: CartItem, newQty: number) => {
//     if (newQty < 1 || newQty > item.product.stock) {
//         if(newQty > item.product.stock) Swal.fire("Peringatan", `Stok maksimum ${item.product.stock} tercapai.`, "warning");
//         return;
//     }

//     const token = localStorage.getItem("user_token");

//     // 1. Optimistic Update (Langsung ubah UI)
//     const originalItems = [...localCartItems]; // Simpan state lama untuk rollback
//     setLocalCartItems((prevItems) =>
//       prevItems.map((cartItem) =>
//         cartItem.id === item.id
//           ? {
//               ...cartItem,
//               quantity: newQty,
//               gross_amount: newQty * cartItem.product.price
//             }
//           : cartItem
//       )
//     );

//     // 2. Background Sync
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts/${item.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ quantity: newQty }),
//       });

//       if (!res.ok) {
//           const err = await res.json();
//           // Rollback jika gagal
//           setLocalCartItems(originalItems);
//           Swal.fire("Peringatan", err.message || "Gagal mengubah kuantitas", "warning");
//       }

//       // Sinkronkan global state di background (optional, tapi disarankan agar ikon header ikut update)
//       fetchCart();
//     } catch (error) {
//       console.error(error);
//       setLocalCartItems(originalItems); // Rollback jika network error
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     }
//   };

//   // --- OPTIMISTIC DELETE ---
//   const handleOptimisticDelete = async (id: number) => {
//     const token = localStorage.getItem("user_token");

//     // 1. Optimistic Delete (Langsung hapus dari UI)
//     const originalItems = [...localCartItems]; // Backup data
//     setLocalCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
//     // Hapus juga dari pilihan checkout jika sedang dicentang
//     setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));

//     // 2. Background Sync
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts/${id}`, {
//         method: "DELETE",
//         headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
//       });

//       if (!res.ok) {
//         setLocalCartItems(originalItems); // Rollback
//         Swal.fire("Peringatan", "Gagal menghapus item", "warning");
//       }
//       fetchCart();
//     } catch (error) {
//       console.error(error);
//       setLocalCartItems(originalItems); // Rollback
//       Swal.fire("Error", "Gagal menghapus item", "error");
//     }
//   };

//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         const data = await res.json();
//         const products: any[] = data.data ? data.data : data;

//         const cartProductIds = localCartItems.map((item) => item.product_id);
//         const available = products.filter((p) => !cartProductIds.includes(p.id) && p.stock > 0);

//         const shuffled = available.sort(() => 0.5 - Math.random());
//         setSuggestedProducts(shuffled.slice(0, 4));
//       } catch (error) {
//         console.error("Gagal memuat rekomendasi:", error);
//       } finally {
//         setLoadingSuggestions(false);
//       }
//     };

//     // Gunakan localCartItems agar rekomendasi ikut berubah cepat saat dihapus
//     fetchSuggestions();
//   }, [localCartItems]);

//   const addSuggestedProduct = async (product: Product) => {
//     const token = localStorage.getItem("user_token");
//     if(!token) {
//         navigate("/login");
//         return;
//     }

//     if (product.color && product.color.length > 0) {
//         navigate(`/product/${product.id}`);
//         return;
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ product_id: product.id, quantity: 1 }),
//       });
//       if (res.ok) {
//         Swal.fire({ title: "Ditambahkan ke Keranjang", icon: "success", toast: true, position: "top-end", timer: 1500, showConfirmButton: false });
//         fetchCart();
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleCheckout = () => {
//     if (selectedIds.length === 0) return;
//     setIsProcessingCheckout(true);
//     setTimeout(() => {
//         setIsProcessingCheckout(false);
//         navigate("/checkout", { state: { selectedIds: selectedIds } });
//     }, 800);
//   };

//   const formatPrice = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
//   };

//   return (
//     <div className="min-h-screen px-4 py-16 mx-auto font-sans max-w-7xl sm:px-6 lg:px-8">

//       <div className="flex items-center gap-4 mb-10 animate-fade-in-up">
//         <button
//           onClick={() => navigate("/products")}
//           className="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50"
//         >
//           <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//         <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
//           Keranjang Belanja
//         </h1>
//         <span className="ml-2 text-xl font-medium text-gray-400">
//           ({localCartItems.length} items)
//         </span>
//       </div>

//       <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">

//         <div className="flex-grow lg:w-2/3 animate-fade-in-up" style={{ animationDelay: "100ms" }}>

//           {localCartItems.length === 0 ? (
//             <div className="py-20 text-center border border-gray-200 border-dashed rounded-3xl bg-gray-50">
//               <p className="mb-6 text-2xl font-medium text-gray-400">Keranjang Anda masih kosong.</p>
//               <button
//                 onClick={() => navigate("/products")}
//                 className="px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition bg-gray-900 rounded-full shadow-xl hover:bg-black shadow-gray-200"
//               >
//                 Mulai Belanja
//               </button>
//             </div>
//           ) : (
//             <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-3xl sm:p-8">

//               <div className="flex items-center gap-4 pb-4 mb-4 border-b border-gray-100">
//                 <input
//                   type="checkbox"
//                   checked={isAllSelected}
//                   onChange={handleSelectAll}
//                   id="selectAll"
//                   className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora"
//                 />
//                 <label htmlFor="selectAll" className="text-xs font-bold tracking-widest text-gray-800 uppercase cursor-pointer select-none">
//                   Pilih Semua Item
//                 </label>
//               </div>

//               <div className="space-y-8">
//                 {localCartItems.map((item: CartItem) => (
//                   <div key={item.id} className="relative flex items-start gap-4 pb-8 border-b border-gray-50 sm:gap-6 last:border-0 last:pb-0">

//                     <div className="pt-3 sm:pt-12">
//                       <input
//                         type="checkbox"
//                         checked={selectedIds.includes(item.id)}
//                         onChange={() => handleSelectItem(item.id)}
//                         className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora"
//                       />
//                     </div>

//                     <div
//                       className="relative w-24 h-24 overflow-hidden border border-gray-100 cursor-pointer shrink-0 sm:w-40 sm:h-40 rounded-2xl bg-gray-50"
//                       onClick={() => navigate(`/product/${item.product.id}`)}
//                     >
//                       <img
//                         src={item.product.image_url}
//                         alt={item.product.name}
//                         className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
//                       />
//                     </div>

//                     <div className="flex flex-col justify-between flex-grow min-h-[6rem] sm:min-h-[10rem]">
//                       <div>
//                         <div className="flex items-start justify-between gap-2">
//                           <h3
//                             className="w-2/3 text-sm font-bold tracking-tight text-gray-900 transition-colors cursor-pointer sm:text-lg hover:text-gycora line-clamp-2"
//                             onClick={() => navigate(`/product/${item.product.id}`)}
//                           >
//                             {item.product.name}
//                           </h3>
//                           <p className="text-sm font-extrabold text-right sm:text-lg whitespace-nowrap text-gycora">
//                             {formatPrice(item.gross_amount)}
//                           </p>
//                         </div>

//                         {item.color && (
//                           <div className="flex items-center gap-2 mt-2">
//                             <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Varian:</span>
//                             <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 border border-gray-200 rounded-md">
//                               <span className="w-3 h-3 border border-gray-300 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></span>
//                               <span className="text-[10px] font-mono text-gray-700">{item.color}</span>
//                             </div>
//                           </div>
//                         )}

//                         <div className="flex flex-wrap items-center mt-2 gap-x-3 gap-y-1">
//                           <p className="text-xs italic tracking-wider text-gray-400">
//                             {formatPrice(item.product.price)} / pc
//                           </p>
//                           <span className="hidden w-1 h-1 bg-gray-300 rounded-full sm:block"></span>
//                           <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
//                             Stok Tersedia: <span className="text-gray-900">{item.product.stock}</span>
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex flex-col items-start gap-4 mt-4 sm:flex-row sm:justify-between sm:items-end sm:mt-6">
//                         <div className="flex items-center overflow-hidden border border-gray-200 shadow-sm bg-gray-50 rounded-xl">
//                           <button
//                             onClick={() => handleQtyChange(item, item.quantity - 1)}
//                             className="px-4 py-2 text-base font-bold text-gray-700 transition-colors hover:bg-gray-200 sm:px-4 sm:py-2"
//                           >
//                             -
//                           </button>
//                           <span className="w-10 text-sm font-bold text-center text-gray-900 sm:w-12 sm:text-base">
//                             {item.quantity}
//                           </span>
//                           <button
//                             onClick={() => handleQtyChange(item, item.quantity + 1)}
//                             className="px-4 py-2 text-base font-bold text-gray-700 transition-colors hover:bg-gray-200 sm:px-4 sm:py-2"
//                           >
//                             +
//                           </button>
//                         </div>

//                         <button
//                           onClick={() => handleOptimisticDelete(item.id)}
//                           className="flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest text-gray-400 uppercase transition-colors group hover:text-red-500"
//                         >
//                           <svg className="w-4 h-4 transition-transform sm:w-5 sm:h-5 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                           </svg>
//                           Hapus
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="pt-12 mt-12 border-t border-gray-100">
//             <h3 className="mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase">
//               Mungkin Anda Juga Suka
//             </h3>

//             {loadingSuggestions ? (
//               <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
//                 {[1, 2, 3, 4].map((i) => (
//                   <div key={i} className="flex flex-col gap-2">
//                     <div className="bg-gray-100 aspect-square rounded-2xl animate-pulse"></div>
//                     <div className="w-3/4 h-3 mt-1 bg-gray-100 rounded animate-pulse"></div>
//                     <div className="w-1/2 h-3 bg-gray-100 rounded animate-pulse"></div>
//                   </div>
//                 ))}
//               </div>
//             ) : suggestedProducts.length > 0 ? (
//               <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
//                 {suggestedProducts.map((product) => (
//                   <div key={product.id} className="flex flex-col group">
//                     <div
//                       className="relative mb-3 overflow-hidden border border-gray-100 cursor-pointer aspect-square rounded-2xl bg-gray-50"
//                       onClick={() => navigate(`/product/${product.id}`)}
//                     >
//                       <img
//                         src={product.image_url}
//                         alt={product.name}
//                         className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
//                       />
//                     </div>
//                     <h4 className="mb-1 text-[11px] font-bold tracking-wide text-gray-900 uppercase truncate">
//                       {product.name}
//                     </h4>
//                     <p className="mb-3 text-xs font-bold text-gycora">
//                       {formatPrice(product.price)}
//                     </p>
//                     <button
//                       onClick={() => addSuggestedProduct(product)}
//                       className="px-3 py-2 mt-auto text-[9px] font-bold tracking-widest text-gray-700 uppercase transition-all duration-300 border border-gray-200 rounded-xl hover:border-gray-900 hover:bg-gray-900 hover:text-white"
//                     >
//                       {product.color && product.color.length > 0 ? "Pilih Varian" : "Tambah +"}
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             ) : null}
//           </div>
//         </div>

//         {localCartItems.length > 0 && (
//           <div className="lg:w-1/3 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//             <div className="sticky p-8 bg-gray-50/50 border border-gray-100 rounded-[2rem] top-32 shadow-sm">
//               <h2 className="pb-4 mb-8 text-lg font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">
//                 Ringkasan Pesanan
//               </h2>

//               <div className="mb-8 space-y-4">
//                 <div className="flex justify-between text-sm text-gray-600">
//                   <span>Item Dipilih</span>
//                   <span className="font-bold text-gray-900">{selectedIds.length}</span>
//                 </div>

//                 <div className="flex items-end justify-between pt-4 border-t border-gray-200">
//                   <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
//                     Estimasi Total
//                   </span>
//                   <span className="text-2xl font-black text-gycora">
//                     {formatPrice(checkoutTotalAmount)}
//                   </span>
//                 </div>
//                 <p className="mt-1 text-right text-[10px] italic text-gray-400">
//                   Pajak & pengiriman dihitung saat checkout.
//                 </p>
//               </div>

//               <button
//                 onClick={handleCheckout}
//                 disabled={isProcessingCheckout || selectedIds.length === 0}
//                 className="flex items-center justify-center w-full gap-3 py-5 text-sm font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/20"
//               >
//                 {!isProcessingCheckout ? (
//                   `Checkout (${selectedIds.length})`
//                 ) : (
//                   <span className="flex items-center gap-2">
//                     <div className="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"></div>
//                     Memproses...
//                   </span>
//                 )}
//               </button>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart, type Product } from "../../context/CartContext";
// import { BASE_URL } from "../../config/api";

// // Definisikan secara lokal struktur cart item jika CartContext tidak diexport lengkap
// interface CartItem {
//   id: number;
//   product_id: number;
//   product: Product;
//   quantity: number;
//   gross_amount: number;
//   color?: string | null;
// }

// export default function CartPage() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const { cartItems: contextCartItems, fetchCart } = useCart() as any;

//   // STATE BARU: Local state untuk Optimistic UI
//   const [localCartItems, setLocalCartItems] = useState<CartItem[]>([]);

//   const [selectedIds, setSelectedIds] = useState<number[]>([]);
//   const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

//   const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
//   const [loadingSuggestions, setLoadingSuggestions] = useState(true);

//   // REFERENSI BARU: Menyimpan timer debounce untuk setiap item id
//   const debounceTimers = useRef<{ [key: number]: ReturnType<typeof setTimeout> }>({});

//   // Sync state lokal dengan global context ketika data dari server masuk
//   useEffect(() => {
//     setLocalCartItems(contextCartItems);
//   }, [contextCartItems]);

//   useEffect(() => {
//     setSelectedIds((prev) => prev.filter((id) => localCartItems.some((item) => item.id === id)));
//   }, [localCartItems]);

//   const isAllSelected = localCartItems.length > 0 && selectedIds.length === localCartItems.length;

//   const handleSelectAll = () => {
//     if (isAllSelected) setSelectedIds([]);
//     else setSelectedIds(localCartItems.map((item) => item.id));
//   };

//   const handleSelectItem = (id: number) => {
//     setSelectedIds((prev) => prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]);
//   };

//   const checkoutTotalAmount = useMemo(() => {
//     return localCartItems
//       .filter((item) => selectedIds.includes(item.id))
//       .reduce((total, item) => total + Number(item.gross_amount), 0);
//   }, [localCartItems, selectedIds]);

//   // --- OPTIMISTIC QTY UPDATE DENGAN DEBOUNCE ---
//   const handleQtyChange = (item: CartItem, newQty: number) => {
//     if (newQty < 1 || newQty > item.product.stock) {
//         if(newQty > item.product.stock) Swal.fire("Peringatan", `Stok maksimum ${item.product.stock} tercapai.`, "warning");
//         return;
//     }

//     const token = localStorage.getItem("user_token");

//     // 1. Optimistic Update (Langsung ubah UI secara instan)
//     setLocalCartItems((prevItems) =>
//       prevItems.map((cartItem) =>
//         cartItem.id === item.id
//           ? {
//               ...cartItem,
//               quantity: newQty,
//               gross_amount: newQty * cartItem.product.price
//             }
//           : cartItem
//       )
//     );

//     // 2. Bersihkan timer sebelumnya jika user mengklik tombol lagi dengan cepat
//     if (debounceTimers.current[item.id]) {
//       clearTimeout(debounceTimers.current[item.id]);
//     }

//     // 3. Set timer baru (Tunggu 1 detik / 1000ms sebelum nembak API)
//     debounceTimers.current[item.id] = setTimeout(async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/carts/${item.id}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
//           body: JSON.stringify({ quantity: newQty }), // newQty mengambil nilai terbaru
//         });

//         if (!res.ok) {
//             const err = await res.json();
//             Swal.fire("Peringatan", err.message || "Gagal mengubah kuantitas", "warning");
//             // Sinkronisasi ulang dengan data server asli (rollback jika gagal)
//             fetchCart();
//         } else {
//             // Sinkronkan global state di background jika sukses agar badge ikon di header ikut update
//             fetchCart();
//         }
//       } catch (error) {
//         console.error(error);
//         Swal.fire("Error", "Gagal terhubung ke server", "error");
//         fetchCart(); // Rollback jika network error
//       }
//     }, 1000); // <-- 1000 ms delay
//   };

//   // --- OPTIMISTIC DELETE ---
//   const handleOptimisticDelete = async (id: number) => {
//     const token = localStorage.getItem("user_token");

//     // 1. Optimistic Delete (Langsung hapus dari UI)
//     const originalItems = [...localCartItems]; // Backup data
//     setLocalCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
//     // Hapus juga dari pilihan checkout jika sedang dicentang
//     setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));

//     // Hapus timer jika item dihapus saat masih dalam antrean debounce
//     if (debounceTimers.current[id]) {
//       clearTimeout(debounceTimers.current[id]);
//       delete debounceTimers.current[id];
//     }

//     // 2. Background Sync
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts/${id}`, {
//         method: "DELETE",
//         headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
//       });

//       if (!res.ok) {
//         setLocalCartItems(originalItems); // Rollback
//         Swal.fire("Peringatan", "Gagal menghapus item", "warning");
//       }
//       fetchCart();
//     } catch (error) {
//       console.error(error);
//       setLocalCartItems(originalItems); // Rollback
//       Swal.fire("Error", "Gagal menghapus item", "error");
//     }
//   };

//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         const data = await res.json();
//         const products: any[] = data.data ? data.data : data;

//         const cartProductIds = localCartItems.map((item) => item.product_id);
//         const available = products.filter((p) => !cartProductIds.includes(p.id) && p.stock > 0);

//         const shuffled = available.sort(() => 0.5 - Math.random());
//         setSuggestedProducts(shuffled.slice(0, 4));
//       } catch (error) {
//         console.error("Gagal memuat rekomendasi:", error);
//       } finally {
//         setLoadingSuggestions(false);
//       }
//     };

//     // Gunakan localCartItems agar rekomendasi ikut berubah cepat saat dihapus
//     fetchSuggestions();
//   }, [localCartItems]);

//   const addSuggestedProduct = async (product: Product) => {
//     const token = localStorage.getItem("user_token");
//     if(!token) {
//         navigate("/login");
//         return;
//     }

//     if (product.color && product.color.length > 0) {
//         navigate(`/product/${product.id}`);
//         return;
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ product_id: product.id, quantity: 1 }),
//       });
//       if (res.ok) {
//         Swal.fire({ title: "Ditambahkan ke Keranjang", icon: "success", toast: true, position: "top-end", timer: 1500, showConfirmButton: false });
//         fetchCart();
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleCheckout = () => {
//     if (selectedIds.length === 0) return;
//     setIsProcessingCheckout(true);
//     setTimeout(() => {
//         setIsProcessingCheckout(false);
//         navigate("/checkout", { state: { selectedIds: selectedIds } });
//     }, 800);
//   };

//   const formatPrice = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
//   };

//   return (
//     <div className="min-h-screen px-4 py-16 mx-auto font-sans max-w-7xl sm:px-6 lg:px-8">

//       <div className="flex items-center gap-4 mb-10 animate-fade-in-up">
//         <button
//           onClick={() => navigate("/products")}
//           className="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50"
//         >
//           <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//         <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
//           Keranjang Belanja
//         </h1>
//         <span className="ml-2 text-xl font-medium text-gray-400">
//           ({localCartItems.length} items)
//         </span>
//       </div>

//       <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">

//         <div className="flex-grow lg:w-2/3 animate-fade-in-up" style={{ animationDelay: "100ms" }}>

//           {localCartItems.length === 0 ? (
//             <div className="py-20 text-center border border-gray-200 border-dashed rounded-3xl bg-gray-50">
//               <p className="mb-6 text-2xl font-medium text-gray-400">Keranjang Anda masih kosong.</p>
//               <button
//                 onClick={() => navigate("/products")}
//                 className="px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition bg-gray-900 rounded-full shadow-xl hover:bg-black shadow-gray-200"
//               >
//                 Mulai Belanja
//               </button>
//             </div>
//           ) : (
//             <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-3xl sm:p-8">

//               <div className="flex items-center gap-4 pb-4 mb-4 border-b border-gray-100">
//                 <input
//                   type="checkbox"
//                   checked={isAllSelected}
//                   onChange={handleSelectAll}
//                   id="selectAll"
//                   className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora"
//                 />
//                 <label htmlFor="selectAll" className="text-xs font-bold tracking-widest text-gray-800 uppercase cursor-pointer select-none">
//                   Pilih Semua Item
//                 </label>
//               </div>

//               <div className="space-y-8">
//                 {localCartItems.map((item: CartItem) => (
//                   <div key={item.id} className="relative flex items-start gap-4 pb-8 border-b border-gray-50 sm:gap-6 last:border-0 last:pb-0">

//                     <div className="pt-3 sm:pt-12">
//                       <input
//                         type="checkbox"
//                         checked={selectedIds.includes(item.id)}
//                         onChange={() => handleSelectItem(item.id)}
//                         className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora"
//                       />
//                     </div>

//                     <div
//                       className="relative w-24 h-24 overflow-hidden border border-gray-100 cursor-pointer shrink-0 sm:w-40 sm:h-40 rounded-2xl bg-gray-50"
//                       onClick={() => navigate(`/product/${item.product.id}`)}
//                     >
//                       <img
//                         src={item.product.image_url}
//                         alt={item.product.name}
//                         className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
//                       />
//                     </div>

//                     <div className="flex flex-col justify-between flex-grow min-h-[6rem] sm:min-h-[10rem]">
//                       <div>
//                         <div className="flex items-start justify-between gap-2">
//                           <h3
//                             className="w-2/3 text-sm font-bold tracking-tight text-gray-900 transition-colors cursor-pointer sm:text-lg hover:text-gycora line-clamp-2"
//                             onClick={() => navigate(`/product/${item.product.id}`)}
//                           >
//                             {item.product.name}
//                           </h3>
//                           <p className="text-sm font-extrabold text-right sm:text-lg whitespace-nowrap text-gycora">
//                             {formatPrice(item.gross_amount)}
//                           </p>
//                         </div>

//                         {item.color && (
//                           <div className="flex items-center gap-2 mt-2">
//                             <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Varian:</span>
//                             <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 border border-gray-200 rounded-md">
//                               <span className="w-3 h-3 border border-gray-300 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></span>
//                               <span className="text-[10px] font-mono text-gray-700">{item.color}</span>
//                             </div>
//                           </div>
//                         )}

//                         <div className="flex flex-wrap items-center mt-2 gap-x-3 gap-y-1">
//                           <p className="text-xs italic tracking-wider text-gray-400">
//                             {formatPrice(item.product.price)} / pc
//                           </p>
//                           <span className="hidden w-1 h-1 bg-gray-300 rounded-full sm:block"></span>
//                           <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
//                             Stok Tersedia: <span className="text-gray-900">{item.product.stock}</span>
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex flex-col items-start gap-4 mt-4 sm:flex-row sm:justify-between sm:items-end sm:mt-6">
//                         <div className="flex items-center overflow-hidden border border-gray-200 shadow-sm bg-gray-50 rounded-xl">
//                           <button
//                             onClick={() => handleQtyChange(item, item.quantity - 1)}
//                             className="px-4 py-2 text-base font-bold text-gray-700 transition-colors hover:bg-gray-200 sm:px-4 sm:py-2"
//                           >
//                             -
//                           </button>
//                           <span className="w-10 text-sm font-bold text-center text-gray-900 sm:w-12 sm:text-base">
//                             {item.quantity}
//                           </span>
//                           <button
//                             onClick={() => handleQtyChange(item, item.quantity + 1)}
//                             className="px-4 py-2 text-base font-bold text-gray-700 transition-colors hover:bg-gray-200 sm:px-4 sm:py-2"
//                           >
//                             +
//                           </button>
//                         </div>

//                         <button
//                           onClick={() => handleOptimisticDelete(item.id)}
//                           className="flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest text-gray-400 uppercase transition-colors group hover:text-red-500"
//                         >
//                           <svg className="w-4 h-4 transition-transform sm:w-5 sm:h-5 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                           </svg>
//                           Hapus
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="pt-12 mt-12 border-t border-gray-100">
//             <h3 className="mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase">
//               Mungkin Anda Juga Suka
//             </h3>

//             {loadingSuggestions ? (
//               <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
//                 {[1, 2, 3, 4].map((i) => (
//                   <div key={i} className="flex flex-col gap-2">
//                     <div className="bg-gray-100 aspect-square rounded-2xl animate-pulse"></div>
//                     <div className="w-3/4 h-3 mt-1 bg-gray-100 rounded animate-pulse"></div>
//                     <div className="w-1/2 h-3 bg-gray-100 rounded animate-pulse"></div>
//                   </div>
//                 ))}
//               </div>
//             ) : suggestedProducts.length > 0 ? (
//               <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
//                 {suggestedProducts.map((product) => (
//                   <div key={product.id} className="flex flex-col group">
//                     <div
//                       className="relative mb-3 overflow-hidden border border-gray-100 cursor-pointer aspect-square rounded-2xl bg-gray-50"
//                       onClick={() => navigate(`/product/${product.id}`)}
//                     >
//                       <img
//                         src={product.image_url}
//                         alt={product.name}
//                         className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
//                       />
//                     </div>
//                     <h4 className="mb-1 text-[11px] font-bold tracking-wide text-gray-900 uppercase truncate">
//                       {product.name}
//                     </h4>
//                     <p className="mb-3 text-xs font-bold text-gycora">
//                       {formatPrice(product.price)}
//                     </p>
//                     <button
//                       onClick={() => addSuggestedProduct(product)}
//                       className="px-3 py-2 mt-auto text-[9px] font-bold tracking-widest text-gray-700 uppercase transition-all duration-300 border border-gray-200 rounded-xl hover:border-gray-900 hover:bg-gray-900 hover:text-white"
//                     >
//                       {product.color && product.color.length > 0 ? "Pilih Varian" : "Tambah +"}
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             ) : null}
//           </div>
//         </div>

//         {localCartItems.length > 0 && (
//           <div className="lg:w-1/3 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//             <div className="sticky p-8 bg-gray-50/50 border border-gray-100 rounded-[2rem] top-32 shadow-sm">
//               <h2 className="pb-4 mb-8 text-lg font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">
//                 Ringkasan Pesanan
//               </h2>

//               <div className="mb-8 space-y-4">
//                 <div className="flex justify-between text-sm text-gray-600">
//                   <span>Item Dipilih</span>
//                   <span className="font-bold text-gray-900">{selectedIds.length}</span>
//                 </div>

//                 <div className="flex items-end justify-between pt-4 border-t border-gray-200">
//                   <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
//                     Estimasi Total
//                   </span>
//                   <span className="text-2xl font-black text-gycora">
//                     {formatPrice(checkoutTotalAmount)}
//                   </span>
//                 </div>
//                 <p className="mt-1 text-right text-[10px] italic text-gray-400">
//                   Pajak & pengiriman dihitung saat checkout.
//                 </p>
//               </div>

//               <button
//                 onClick={handleCheckout}
//                 disabled={isProcessingCheckout || selectedIds.length === 0}
//                 className="flex items-center justify-center w-full gap-3 py-5 text-sm font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/20"
//               >
//                 {!isProcessingCheckout ? (
//                   `Checkout (${selectedIds.length})`
//                 ) : (
//                   <span className="flex items-center gap-2">
//                     <div className="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"></div>
//                     Memproses...
//                   </span>
//                 )}
//               </button>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart, type Product } from "../../context/CartContext";
// import { BASE_URL } from "../../config/api";

// // Definisikan secara lokal struktur cart item jika CartContext tidak diexport lengkap
// interface CartItem {
//   id: number;
//   product_id: number;
//   product: Product;
//   quantity: number;
//   gross_amount: number;
//   color?: string | null;
// }

// export default function CartPage() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const { cartItems: contextCartItems, fetchCart } = useCart() as any;

//   const [localCartItems, setLocalCartItems] = useState<CartItem[]>([]);
//   const [selectedIds, setSelectedIds] = useState<number[]>([]);
//   const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
//   const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
//   const [loadingSuggestions, setLoadingSuggestions] = useState(true);

//   const debounceTimers = useRef<{ [key: number]: ReturnType<typeof setTimeout> }>({});

//   useEffect(() => {
//     setLocalCartItems(contextCartItems);
//   }, [contextCartItems]);

//   useEffect(() => {
//     setSelectedIds((prev) => prev.filter((id) => localCartItems.some((item) => item.id === id)));
//   }, [localCartItems]);

//   const isAllSelected = localCartItems.length > 0 && selectedIds.length === localCartItems.length;

//   const handleSelectAll = () => {
//     if (isAllSelected) setSelectedIds([]);
//     else setSelectedIds(localCartItems.map((item) => item.id));
//   };

//   const handleSelectItem = (id: number) => {
//     setSelectedIds((prev) => prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]);
//   };

//   const checkoutTotalAmount = useMemo(() => {
//     return localCartItems
//       .filter((item) => selectedIds.includes(item.id))
//       .reduce((total, item) => total + Number(item.gross_amount), 0);
//   }, [localCartItems, selectedIds]);

//   const handleQtyChange = (item: CartItem, newQty: number) => {
//     if (newQty < 1 || newQty > item.product.stock) {
//         if(newQty > item.product.stock) Swal.fire("Peringatan", `Stok maksimum ${item.product.stock} tercapai.`, "warning");
//         return;
//     }

//     const token = localStorage.getItem("user_token");
//     // const originalItems = [...localCartItems];

//     setLocalCartItems((prevItems) =>
//       prevItems.map((cartItem) =>
//         cartItem.id === item.id
//           ? { ...cartItem, quantity: newQty, gross_amount: newQty * cartItem.product.price }
//           : cartItem
//       )
//     );

//     if (debounceTimers.current[item.id]) {
//       clearTimeout(debounceTimers.current[item.id]);
//     }

//     debounceTimers.current[item.id] = setTimeout(async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/carts/${item.id}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
//           body: JSON.stringify({ quantity: newQty }),
//         });

//         if (!res.ok) {
//             const err = await res.json();
//             Swal.fire("Peringatan", err.message || "Gagal mengubah kuantitas", "warning");
//             fetchCart();
//         } else {
//             fetchCart();
//         }
//       } catch (error) {
//         console.error(error);
//         Swal.fire("Error", "Gagal terhubung ke server", "error");
//         fetchCart();
//       }
//     }, 1000);
//   };

//   const handleOptimisticDelete = async (id: number) => {
//     const token = localStorage.getItem("user_token");
//     const originalItems = [...localCartItems];

//     setLocalCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
//     setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));

//     if (debounceTimers.current[id]) {
//       clearTimeout(debounceTimers.current[id]);
//       delete debounceTimers.current[id];
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts/${id}`, {
//         method: "DELETE",
//         headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
//       });

//       if (!res.ok) {
//         setLocalCartItems(originalItems);
//         Swal.fire("Peringatan", "Gagal menghapus item", "warning");
//       }
//       fetchCart();
//     } catch (error) {
//       console.error(error);
//       setLocalCartItems(originalItems);
//       Swal.fire("Error", "Gagal menghapus item", "error");
//     }
//   };

//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         const data = await res.json();
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         const products: any[] = data.data ? data.data : data;

//         const cartProductIds = localCartItems.map((item) => item.product_id);
//         const available = products.filter((p) => !cartProductIds.includes(p.id) && p.stock > 0);

//         const shuffled = available.sort(() => 0.5 - Math.random());
//         setSuggestedProducts(shuffled.slice(0, 4));
//       } catch (error) {
//         console.error("Gagal memuat rekomendasi:", error);
//       } finally {
//         setLoadingSuggestions(false);
//       }
//     };

//     fetchSuggestions();
//   }, [localCartItems]);

//   const addSuggestedProduct = async (product: Product) => {
//     const token = localStorage.getItem("user_token");
//     if(!token) {
//         navigate("/login");
//         return;
//     }

//     if (product.color && product.color.length > 0) {
//         navigate(`/product/${product.id}`);
//         return;
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ product_id: product.id, quantity: 1 }),
//       });
//       if (res.ok) {
//         Swal.fire({ title: "Ditambahkan ke Keranjang", icon: "success", toast: true, position: "top-end", timer: 1500, showConfirmButton: false });
//         fetchCart();
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleCheckout = () => {
//     if (selectedIds.length === 0) return;
//     setIsProcessingCheckout(true);
//     setTimeout(() => {
//         setIsProcessingCheckout(false);
//         navigate("/checkout", { state: { selectedIds: selectedIds } });
//     }, 800);
//   };

//   const formatPrice = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
//   };

//   return (
//     <div className="min-h-screen px-4 py-16 mx-auto font-sans max-w-7xl sm:px-6 lg:px-8">

//       <div className="flex items-center gap-4 mb-10 animate-fade-in-up">
//         <button onClick={() => navigate("/products")} className="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50">
//           <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
//         </button>
//         <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl">Keranjang Belanja</h1>
//         <span className="ml-2 text-xl font-medium text-gray-400">({localCartItems.length} items)</span>
//       </div>

//       <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">

//         <div className="flex-grow lg:w-2/3 animate-fade-in-up" style={{ animationDelay: "100ms" }}>

//           {localCartItems.length === 0 ? (
//             <div className="py-20 text-center border border-gray-200 border-dashed rounded-3xl bg-gray-50">
//               <p className="mb-6 text-2xl font-medium text-gray-400">Keranjang Anda masih kosong.</p>
//               <button onClick={() => navigate("/products")} className="px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition bg-gray-900 rounded-full shadow-xl hover:bg-black shadow-gray-200">
//                 Mulai Belanja
//               </button>
//             </div>
//           ) : (
//             <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-3xl sm:p-8">

//               <div className="flex items-center gap-4 pb-4 mb-4 border-b border-gray-100">
//                 <input type="checkbox" checked={isAllSelected} onChange={handleSelectAll} id="selectAll" className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora" />
//                 <label htmlFor="selectAll" className="text-xs font-bold tracking-widest text-gray-800 uppercase cursor-pointer select-none">Pilih Semua Item</label>
//               </div>

//               <div className="space-y-8">
//                 {localCartItems.map((item: CartItem) => (
//                   <div key={item.id} className="relative flex items-start gap-4 pb-8 border-b border-gray-50 sm:gap-6 last:border-0 last:pb-0">

//                     <div className="pt-3 sm:pt-12">
//                       <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => handleSelectItem(item.id)} className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora" />
//                     </div>

//                     <div className="relative w-24 h-24 overflow-hidden border border-gray-100 cursor-pointer shrink-0 sm:w-40 sm:h-40 rounded-2xl bg-gray-50" onClick={() => navigate(`/product/${item.product.id}`)}>
//                       <img src={item.product.image_url} alt={item.product.name} className="object-cover w-full h-full transition-transform duration-500 hover:scale-105" />
//                     </div>

//                     <div className="flex flex-col justify-between flex-grow min-h-[6rem] sm:min-h-[10rem]">
//                       <div>
//                         <div className="flex items-start justify-between gap-2">
//                           <h3 className="w-2/3 text-sm font-bold tracking-tight text-gray-900 transition-colors cursor-pointer sm:text-lg hover:text-gycora line-clamp-2" onClick={() => navigate(`/product/${item.product.id}`)}>
//                             {item.product.name}
//                           </h3>
//                           <p className="text-sm font-extrabold text-right sm:text-lg whitespace-nowrap text-gycora">
//                             {formatPrice(item.gross_amount)}
//                           </p>
//                         </div>

//                         {/* --- PERBAIKAN: DISPLAY WARNA DENGAN NAMA JIKA ADA --- */}
//                         {item.color && (
//                           (() => {
//                             let hex = item.color as string;
//                             let name = "";

//                             // Jika formatnya JSON string
//                             try {
//                               const parsed = JSON.parse(item.color as string);
//                               if (parsed.hex) { hex = parsed.hex; name = parsed.name || ""; }
//                             } catch {
//                               // Jika formatnya string Hex lama, kita cari di master product-nya
//                               if (Array.isArray(item.product.color)) {
//                                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
//                                 const matched = item.product.color.find((c: any) => (typeof c === 'object' && c.hex === item.color) || c === item.color);
//                                 if (matched && typeof matched === 'object') name = matched.name;
//                               }
//                             }

//                             return (
//                               <div className="flex items-center gap-2 mt-2">
//                                 <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Varian:</span>
//                                 <div className="flex items-center gap-2 px-2 py-1 bg-white border border-gray-200 rounded-md shadow-sm">
//                                   <span className="w-3 h-3 border border-gray-300 rounded-full shadow-inner shrink-0" style={{ backgroundColor: hex }}></span>
//                                   <span className="text-[10px] font-bold text-gray-700">
//                                     {name ? name : <span className="font-mono uppercase">{hex}</span>}
//                                   </span>
//                                 </div>
//                               </div>
//                             );
//                           })()
//                         )}

//                         <div className="flex flex-wrap items-center mt-2 gap-x-3 gap-y-1">
//                           <p className="text-xs italic tracking-wider text-gray-400">{formatPrice(item.product.price)} / pc</p>
//                           <span className="hidden w-1 h-1 bg-gray-300 rounded-full sm:block"></span>
//                           {/* <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Stok Tersedia: <span className="text-gray-900">{item.product.stock}</span></p> */}
//                         </div>
//                       </div>

//                       <div className="flex flex-col items-start gap-4 mt-4 sm:flex-row sm:justify-between sm:items-end sm:mt-6">
//                         <div className="flex items-center overflow-hidden border border-gray-200 shadow-sm bg-gray-50 rounded-xl">
//                           <button onClick={() => handleQtyChange(item, item.quantity - 1)} className="px-4 py-2 text-base font-bold text-gray-700 transition-colors hover:bg-gray-200 sm:px-4 sm:py-2">-</button>
//                           <span className="w-10 text-sm font-bold text-center text-gray-900 sm:w-12 sm:text-base">{item.quantity}</span>
//                           <button onClick={() => handleQtyChange(item, item.quantity + 1)} className="px-4 py-2 text-base font-bold text-gray-700 transition-colors hover:bg-gray-200 sm:px-4 sm:py-2">+</button>
//                         </div>
//                         <button onClick={() => handleOptimisticDelete(item.id)} className="flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest text-gray-400 uppercase transition-colors group hover:text-red-500">
//                           <svg className="w-4 h-4 transition-transform sm:w-5 sm:h-5 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> Hapus
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="pt-12 mt-12 border-t border-gray-100">
//             <h3 className="mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase">Mungkin Anda Juga Suka</h3>
//             {loadingSuggestions ? (
//               <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
//                 {[1, 2, 3, 4].map((i) => (
//                   <div key={i} className="flex flex-col gap-2">
//                     <div className="bg-gray-100 aspect-square rounded-2xl animate-pulse"></div>
//                     <div className="w-3/4 h-3 mt-1 bg-gray-100 rounded animate-pulse"></div>
//                     <div className="w-1/2 h-3 bg-gray-100 rounded animate-pulse"></div>
//                   </div>
//                 ))}
//               </div>
//             ) : suggestedProducts.length > 0 ? (
//               <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
//                 {suggestedProducts.map((product) => (
//                   <div key={product.id} className="flex flex-col group">
//                     <div className="relative mb-3 overflow-hidden border border-gray-100 cursor-pointer aspect-square rounded-2xl bg-gray-50" onClick={() => navigate(`/product/${product.id}`)}>
//                       <img src={product.image_url} alt={product.name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />
//                     </div>
//                     <h4 className="mb-1 text-[11px] font-bold tracking-wide text-gray-900 uppercase truncate">{product.name}</h4>
//                     <p className="mb-3 text-xs font-bold text-gycora">{formatPrice(product.price)}</p>
//                     <button onClick={() => addSuggestedProduct(product)} className="px-3 py-2 mt-auto text-[9px] font-bold tracking-widest text-gray-700 uppercase transition-all duration-300 border border-gray-200 rounded-xl hover:border-gray-900 hover:bg-gray-900 hover:text-white">
//                       {product.color && product.color.length > 0 ? "Pilih Varian" : "Tambah +"}
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             ) : null}
//           </div>
//         </div>

//         {localCartItems.length > 0 && (
//           <div className="lg:w-1/3 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//             <div className="sticky p-8 bg-gray-50/50 border border-gray-100 rounded-[2rem] top-32 shadow-sm">
//               <h2 className="pb-4 mb-8 text-lg font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">Ringkasan Pesanan</h2>
//               <div className="mb-8 space-y-4">
//                 <div className="flex justify-between text-sm text-gray-600"><span>Item Dipilih</span><span className="font-bold text-gray-900">{selectedIds.length}</span></div>
//                 <div className="flex items-end justify-between pt-4 border-t border-gray-200">
//                   <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">Estimasi Total</span>
//                   <span className="text-2xl font-black text-gycora">{formatPrice(checkoutTotalAmount)}</span>
//                 </div>
//                 <p className="mt-1 text-right text-[10px] italic text-gray-400">Pajak & pengiriman dihitung saat checkout.</p>
//               </div>
//               <button onClick={handleCheckout} disabled={isProcessingCheckout || selectedIds.length === 0} className="flex items-center justify-center w-full gap-3 py-5 text-sm font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/20">
//                 {!isProcessingCheckout ? (`Checkout (${selectedIds.length})`) : (<span className="flex items-center gap-2"><div className="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"></div>Memproses...</span>)}
//               </button>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart, type Product } from "../../context/CartContext";
// import { BASE_URL } from "../../config/api";

// interface CartItem {
//   id: number;
//   product_id: number;
//   product: Product;
//   quantity: number;
//   gross_amount: number;
//   color?: string | null;
// }

// export default function CartPage() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const { cartItems: contextCartItems, fetchCart, removeCartItemOptimistically, updateCartItemQtyOptimistically, revertCartItems } = useCart() as any;

//   const [localCartItems, setLocalCartItems] = useState<CartItem[]>([]);
//   const [selectedIds, setSelectedIds] = useState<number[]>([]);
//   const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
//   const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
//   const [loadingSuggestions, setLoadingSuggestions] = useState(true);

//   const debounceTimers = useRef<{ [key: number]: ReturnType<typeof setTimeout> }>({});

//   useEffect(() => {
//     setLocalCartItems(contextCartItems);
//   }, [contextCartItems]);

//   useEffect(() => {
//     setSelectedIds((prev) => prev.filter((id) => localCartItems.some((item) => item.id === id)));
//   }, [localCartItems]);

//   const isAllSelected = localCartItems.length > 0 && selectedIds.length === localCartItems.length;

//   const handleSelectAll = () => {
//     if (isAllSelected) setSelectedIds([]);
//     else setSelectedIds(localCartItems.map((item) => item.id));
//   };

//   const handleSelectItem = (id: number) => {
//     setSelectedIds((prev) => prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]);
//   };

//   const checkoutTotalAmount = useMemo(() => {
//     return localCartItems
//       .filter((item) => selectedIds.includes(item.id))
//       .reduce((total, item) => total + Number(item.gross_amount), 0);
//   }, [localCartItems, selectedIds]);

//   const handleQtyChange = (item: CartItem, newQty: number) => {
//     if (newQty < 1 || newQty > item.product.stock) {
//         if(newQty > item.product.stock) Swal.fire("Peringatan", `Stok maksimum ${item.product.stock} tercapai.`, "warning");
//         return;
//     }

//     const token = localStorage.getItem("user_token");
//     const originalItems = [...localCartItems]; // Simpan state sebelumnya untuk revert

//     const newGrossAmount = newQty * item.product.price;

//     // 1. UPDATE LOKAL (UI Halaman Cart)
//     setLocalCartItems((prevItems) =>
//       prevItems.map((cartItem) =>
//         cartItem.id === item.id
//           ? { ...cartItem, quantity: newQty, gross_amount: newGrossAmount }
//           : cartItem
//       )
//     );

//     // 2. UPDATE GLOBAL (UI Header/Context) secara optimis
//     updateCartItemQtyOptimistically(item.id, newQty, newGrossAmount);

//     if (debounceTimers.current[item.id]) {
//       clearTimeout(debounceTimers.current[item.id]);
//     }

//     // 3. HIT API DI BELAKANG
//     debounceTimers.current[item.id] = setTimeout(async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/carts/${item.id}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
//           body: JSON.stringify({ quantity: newQty }),
//         });

//         if (!res.ok) {
//             const err = await res.json();
//             Swal.fire("Peringatan", err.message || "Gagal mengubah kuantitas", "warning");
//             // Jika gagal, kembalikan ke state asli
//             revertCartItems(originalItems);
//             fetchCart();
//         }
//       } catch (error) {
//         console.error(error);
//         Swal.fire("Error", "Gagal terhubung ke server", "error");
//         revertCartItems(originalItems);
//         fetchCart();
//       }
//     }, 1000);
//   };

//   const handleOptimisticDelete = async (id: number) => {
//     const token = localStorage.getItem("user_token");
//     const originalItems = [...localCartItems];

//     // 1. UPDATE LOKAL (Hilang dari tabel keranjang seketika)
//     setLocalCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
//     setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));

//     // 2. UPDATE GLOBAL (Angka badge header berkurang seketika)
//     removeCartItemOptimistically(id);

//     if (debounceTimers.current[id]) {
//       clearTimeout(debounceTimers.current[id]);
//       delete debounceTimers.current[id];
//     }

//     // 3. HIT API PENGHAPUSAN DI BELAKANG
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts/${id}`, {
//         method: "DELETE",
//         headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
//       });

//       if (!res.ok) {
//         // JIKA GAGAL: Revert state
//         revertCartItems(originalItems);
//         Swal.fire("Peringatan", "Gagal menghapus item", "warning");
//       }
//     } catch (error) {
//       console.error(error);
//       revertCartItems(originalItems);
//       Swal.fire("Error", "Gagal menghapus item", "error");
//     }
//   };

//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         const data = await res.json();
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         const products: any[] = data.data ? data.data : data;

//         const cartProductIds = localCartItems.map((item) => item.product_id);
//         const available = products.filter((p) => !cartProductIds.includes(p.id) && p.stock > 0);

//         const shuffled = available.sort(() => 0.5 - Math.random());
//         setSuggestedProducts(shuffled.slice(0, 4));
//       } catch (error) {
//         console.error("Gagal memuat rekomendasi:", error);
//       } finally {
//         setLoadingSuggestions(false);
//       }
//     };

//     fetchSuggestions();
//   }, [localCartItems]);

//   const addSuggestedProduct = async (product: Product) => {
//     const token = localStorage.getItem("user_token");
//     if(!token) {
//         navigate("/login");
//         return;
//     }

//     if (product.color && product.color.length > 0) {
//         navigate(`/product/${product.id}`);
//         return;
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ product_id: product.id, quantity: 1 }),
//       });
//       if (res.ok) {
//         Swal.fire({ title: "Ditambahkan ke Keranjang", icon: "success", toast: true, position: "top-end", timer: 1500, showConfirmButton: false });
//         fetchCart();
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleCheckout = () => {
//     if (selectedIds.length === 0) return;
//     setIsProcessingCheckout(true);
//     setTimeout(() => {
//         setIsProcessingCheckout(false);
//         navigate("/checkout", { state: { selectedIds: selectedIds } });
//     }, 800);
//   };

//   const formatPrice = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
//   };

//   return (
//     <div className="min-h-screen px-4 py-16 mx-auto font-sans max-w-7xl sm:px-6 lg:px-8">

//       <div className="flex items-center gap-4 mb-10 animate-fade-in-up">
//         <button onClick={() => navigate("/products")} className="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50">
//           <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
//         </button>
//         <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl">Keranjang Belanja</h1>
//         <span className="ml-2 text-xl font-medium text-gray-400">({localCartItems.length} items)</span>
//       </div>

//       <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">

//         <div className="flex-grow lg:w-2/3 animate-fade-in-up" style={{ animationDelay: "100ms" }}>

//           {localCartItems.length === 0 ? (
//             <div className="py-20 text-center border border-gray-200 border-dashed rounded-3xl bg-gray-50">
//               <p className="mb-6 text-2xl font-medium text-gray-400">Keranjang Anda masih kosong.</p>
//               <button onClick={() => navigate("/products")} className="px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition bg-gray-900 rounded-full shadow-xl hover:bg-black shadow-gray-200">
//                 Mulai Belanja
//               </button>
//             </div>
//           ) : (
//             <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-3xl sm:p-8">

//               <div className="flex items-center gap-4 pb-4 mb-4 border-b border-gray-100">
//                 <input type="checkbox" checked={isAllSelected} onChange={handleSelectAll} id="selectAll" className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora" />
//                 <label htmlFor="selectAll" className="text-xs font-bold tracking-widest text-gray-800 uppercase cursor-pointer select-none">Pilih Semua Item</label>
//               </div>

//               <div className="space-y-8">
//                 {localCartItems.map((item: CartItem) => (
//                   <div key={item.id} className="relative flex items-start gap-4 pb-8 border-b border-gray-50 sm:gap-6 last:border-0 last:pb-0">

//                     <div className="pt-3 sm:pt-12">
//                       <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => handleSelectItem(item.id)} className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora" />
//                     </div>

//                     <div className="relative w-24 h-24 overflow-hidden border border-gray-100 cursor-pointer shrink-0 sm:w-40 sm:h-40 rounded-2xl bg-gray-50" onClick={() => navigate(`/product/${item.product.id}`)}>
//                       <img src={item.product.image_url} alt={item.product.name} className="object-cover w-full h-full transition-transform duration-500 hover:scale-105" />
//                     </div>

//                     <div className="flex flex-col justify-between flex-grow min-h-[6rem] sm:min-h-[10rem]">
//                       <div>
//                         <div className="flex items-start justify-between gap-2">
//                           <h3 className="w-2/3 text-sm font-bold tracking-tight text-gray-900 transition-colors cursor-pointer sm:text-lg hover:text-gycora line-clamp-2" onClick={() => navigate(`/product/${item.product.id}`)}>
//                             {item.product.name}
//                           </h3>
//                           <p className="text-sm font-extrabold text-right sm:text-lg whitespace-nowrap text-gycora">
//                             {formatPrice(item.gross_amount)}
//                           </p>
//                         </div>

//                         {item.color && (
//                           (() => {
//                             let hex = item.color as string;
//                             let name = "";

//                             try {
//                               const parsed = JSON.parse(item.color as string);
//                               if (parsed.hex) { hex = parsed.hex; name = parsed.name || ""; }
//                             } catch {
//                               if (Array.isArray(item.product.color)) {
//                                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
//                                 const matched = item.product.color.find((c: any) => (typeof c === 'object' && c.hex === item.color) || c === item.color);
//                                 if (matched && typeof matched === 'object') name = matched.name;
//                               }
//                             }

//                             return (
//                               <div className="flex items-center gap-2 mt-2">
//                                 <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Varian:</span>
//                                 <div className="flex items-center gap-2 px-2 py-1 bg-white border border-gray-200 rounded-md shadow-sm">
//                                   <span className="w-3 h-3 border border-gray-300 rounded-full shadow-inner shrink-0" style={{ backgroundColor: hex }}></span>
//                                   <span className="text-[10px] font-bold text-gray-700">
//                                     {name ? name : <span className="font-mono uppercase">{hex}</span>}
//                                   </span>
//                                 </div>
//                               </div>
//                             );
//                           })()
//                         )}

//                         <div className="flex flex-wrap items-center mt-2 gap-x-3 gap-y-1">
//                           <p className="text-xs italic tracking-wider text-gray-400">{formatPrice(item.product.price)} / pc</p>
//                           <span className="hidden w-1 h-1 bg-gray-300 rounded-full sm:block"></span>
//                         </div>
//                       </div>

//                       <div className="flex flex-col items-start gap-4 mt-4 sm:flex-row sm:justify-between sm:items-end sm:mt-6">
//                         <div className="flex items-center overflow-hidden border border-gray-200 shadow-sm bg-gray-50 rounded-xl">
//                           <button onClick={() => handleQtyChange(item, item.quantity - 1)} className="px-4 py-2 text-base font-bold text-gray-700 transition-colors hover:bg-gray-200 sm:px-4 sm:py-2">-</button>
//                           <span className="w-10 text-sm font-bold text-center text-gray-900 sm:w-12 sm:text-base">{item.quantity}</span>
//                           <button onClick={() => handleQtyChange(item, item.quantity + 1)} className="px-4 py-2 text-base font-bold text-gray-700 transition-colors hover:bg-gray-200 sm:px-4 sm:py-2">+</button>
//                         </div>
//                         <button onClick={() => handleOptimisticDelete(item.id)} className="flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest text-gray-400 uppercase transition-colors group hover:text-red-500">
//                           <svg className="w-4 h-4 transition-transform sm:w-5 sm:h-5 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> Hapus
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="pt-12 mt-12 border-t border-gray-100">
//             <h3 className="mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase">Mungkin Anda Juga Suka</h3>
//             {loadingSuggestions ? (
//               <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
//                 {[1, 2, 3, 4].map((i) => (
//                   <div key={i} className="flex flex-col gap-2">
//                     <div className="bg-gray-100 aspect-square rounded-2xl animate-pulse"></div>
//                     <div className="w-3/4 h-3 mt-1 bg-gray-100 rounded animate-pulse"></div>
//                     <div className="w-1/2 h-3 bg-gray-100 rounded animate-pulse"></div>
//                   </div>
//                 ))}
//               </div>
//             ) : suggestedProducts.length > 0 ? (
//               <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
//                 {suggestedProducts.map((product) => (
//                   <div key={product.id} className="flex flex-col group">
//                     <div className="relative mb-3 overflow-hidden border border-gray-100 cursor-pointer aspect-square rounded-2xl bg-gray-50" onClick={() => navigate(`/product/${product.id}`)}>
//                       <img src={product.image_url} alt={product.name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />
//                     </div>
//                     <h4 className="mb-1 text-[11px] font-bold tracking-wide text-gray-900 uppercase truncate">{product.name}</h4>
//                     <p className="mb-3 text-xs font-bold text-gycora">{formatPrice(product.price)}</p>
//                     <button onClick={() => addSuggestedProduct(product)} className="px-3 py-2 mt-auto text-[9px] font-bold tracking-widest text-gray-700 uppercase transition-all duration-300 border border-gray-200 rounded-xl hover:border-gray-900 hover:bg-gray-900 hover:text-white">
//                       {product.color && product.color.length > 0 ? "Pilih Varian" : "Tambah +"}
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             ) : null}
//           </div>
//         </div>

//         {localCartItems.length > 0 && (
//           <div className="lg:w-1/3 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//             <div className="sticky p-8 bg-gray-50/50 border border-gray-100 rounded-[2rem] top-32 shadow-sm">
//               <h2 className="pb-4 mb-8 text-lg font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">Ringkasan Pesanan</h2>
//               <div className="mb-8 space-y-4">
//                 <div className="flex justify-between text-sm text-gray-600"><span>Item Dipilih</span><span className="font-bold text-gray-900">{selectedIds.length}</span></div>
//                 <div className="flex items-end justify-between pt-4 border-t border-gray-200">
//                   <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">Estimasi Total</span>
//                   <span className="text-2xl font-black text-gycora">{formatPrice(checkoutTotalAmount)}</span>
//                 </div>
//                 <p className="mt-1 text-right text-[10px] italic text-gray-400">Pajak & pengiriman dihitung saat checkout.</p>
//               </div>
//               <button onClick={handleCheckout} disabled={isProcessingCheckout || selectedIds.length === 0} className="flex items-center justify-center w-full gap-3 py-5 text-sm font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/20">
//                 {!isProcessingCheckout ? (`Checkout (${selectedIds.length})`) : (<span className="flex items-center gap-2"><div className="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"></div>Memproses...</span>)}
//               </button>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart, type Product } from "../../context/CartContext";
// import { BASE_URL } from "../../config/api";

// interface CartItem {
//   id: number;
//   product_id: number;
//   product: Product;
//   quantity: number;
//   gross_amount: number;
//   color?: string | null;
// }

// export default function CartPage() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const { cartItems: contextCartItems, fetchCart, removeCartItemOptimistically, updateCartItemQtyOptimistically, revertCartItems } = useCart() as any;

//   const [localCartItems, setLocalCartItems] = useState<CartItem[]>([]);
//   const [selectedIds, setSelectedIds] = useState<number[]>([]);
//   const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
//   const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
//   const [loadingSuggestions, setLoadingSuggestions] = useState(true);

//   // State terpisah untuk menampung input string sementara saat pengguna mengetik
//   const [qtyInputs, setQtyInputs] = useState<{ [key: number]: string }>({});

//   const debounceTimers = useRef<{ [key: number]: ReturnType<typeof setTimeout> }>({});

//   useEffect(() => {
//     setLocalCartItems(contextCartItems);
//     // Inisialisasi state input berdasarkan data asli
//     const initialInputs: { [key: number]: string } = {};
//     contextCartItems.forEach((item: CartItem) => {
//       initialInputs[item.id] = item.quantity.toString();
//     });
//     setQtyInputs(initialInputs);
//   }, [contextCartItems]);

//   useEffect(() => {
//     setSelectedIds((prev) => prev.filter((id) => localCartItems.some((item) => item.id === id)));
//   }, [localCartItems]);

//   const isAllSelected = localCartItems.length > 0 && selectedIds.length === localCartItems.length;

//   const handleSelectAll = () => {
//     if (isAllSelected) setSelectedIds([]);
//     else setSelectedIds(localCartItems.map((item) => item.id));
//   };

//   const handleSelectItem = (id: number) => {
//     setSelectedIds((prev) => prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]);
//   };

//   const checkoutTotalAmount = useMemo(() => {
//     return localCartItems
//       .filter((item) => selectedIds.includes(item.id))
//       .reduce((total, item) => total + Number(item.gross_amount), 0);
//   }, [localCartItems, selectedIds]);

//   // FUNGSI INTI UNTUK MENGUBAH DAN MEMUKUL API
//   const handleQtyChange = (item: CartItem, newQty: number) => {
//     if (newQty < 1 || newQty > item.product.stock) {
//         if(newQty > item.product.stock) {
//             Swal.fire({ toast: true, position: 'top-end', icon: 'warning', title: `Stok maksimum ${item.product.stock} tercapai.`, showConfirmButton: false, timer: 2000 });
//             setQtyInputs(prev => ({ ...prev, [item.id]: item.product.stock.toString() }));
//             newQty = item.product.stock;
//         } else {
//             return;
//         }
//     }

//     const token = localStorage.getItem("user_token");
//     const originalItems = [...localCartItems];

//     const newGrossAmount = newQty * item.product.price;

//     setLocalCartItems((prevItems) =>
//       prevItems.map((cartItem) =>
//         cartItem.id === item.id
//           ? { ...cartItem, quantity: newQty, gross_amount: newGrossAmount }
//           : cartItem
//       )
//     );

//     updateCartItemQtyOptimistically(item.id, newQty, newGrossAmount);
//     setQtyInputs(prev => ({ ...prev, [item.id]: newQty.toString() }));

//     if (debounceTimers.current[item.id]) {
//       clearTimeout(debounceTimers.current[item.id]);
//     }

//     debounceTimers.current[item.id] = setTimeout(async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/carts/${item.id}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
//           body: JSON.stringify({ quantity: newQty }),
//         });

//         if (!res.ok) {
//             const err = await res.json();
//             Swal.fire("Peringatan", err.message || "Gagal mengubah kuantitas", "warning");
//             revertCartItems(originalItems);
//             fetchCart();
//         }
//       } catch (error) {
//         console.error(error);
//         Swal.fire("Error", "Gagal terhubung ke server", "error");
//         revertCartItems(originalItems);
//         fetchCart();
//       }
//     }, 800);
//   };

//   // --- HANDLE KETIKAN INPUT ---
//   const handleInputChange = (itemId: number, value: string) => {
//     if (value === "" || /^\d+$/.test(value)) {
//       setQtyInputs(prev => ({ ...prev, [itemId]: value }));
//     }
//   };

//   const handleInputBlur = (item: CartItem) => {
//     let parsed = parseInt(qtyInputs[item.id]);
//     if (isNaN(parsed) || parsed < 1) parsed = 1;
//     handleQtyChange(item, parsed);
//   };

//   const handleOptimisticDelete = async (id: number) => {
//     const token = localStorage.getItem("user_token");
//     const originalItems = [...localCartItems];

//     setLocalCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
//     setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
//     removeCartItemOptimistically(id);

//     if (debounceTimers.current[id]) {
//       clearTimeout(debounceTimers.current[id]);
//       delete debounceTimers.current[id];
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts/${id}`, {
//         method: "DELETE",
//         headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
//       });

//       if (!res.ok) {
//         revertCartItems(originalItems);
//         Swal.fire("Peringatan", "Gagal menghapus item", "warning");
//       }
//     } catch (error) {
//       console.error(error);
//       revertCartItems(originalItems);
//       Swal.fire("Error", "Gagal menghapus item", "error");
//     }
//   };

//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         const data = await res.json();
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         const products: any[] = data.data ? data.data : data;

//         const cartProductIds = localCartItems.map((item) => item.product_id);
//         const available = products.filter((p) => !cartProductIds.includes(p.id) && p.stock > 0);

//         const shuffled = available.sort(() => 0.5 - Math.random());
//         setSuggestedProducts(shuffled.slice(0, 4));
//       } catch (error) {
//         console.error("Gagal memuat rekomendasi:", error);
//       } finally {
//         setLoadingSuggestions(false);
//       }
//     };

//     fetchSuggestions();
//   }, [localCartItems]);

//   const addSuggestedProduct = async (product: Product) => {
//     const token = localStorage.getItem("user_token");
//     if(!token) {
//         navigate("/login");
//         return;
//     }

//     if (product.color && product.color.length > 0) {
//         navigate(`/product/${product.id}`);
//         return;
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ product_id: product.id, quantity: 1 }),
//       });
//       if (res.ok) {
//         Swal.fire({ title: "Ditambahkan ke Keranjang", icon: "success", toast: true, position: "top-end", timer: 1500, showConfirmButton: false });
//         fetchCart();
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleCheckout = () => {
//     if (selectedIds.length === 0) return;
//     setIsProcessingCheckout(true);
//     setTimeout(() => {
//         setIsProcessingCheckout(false);
//         navigate("/checkout", { state: { selectedIds: selectedIds } });
//     }, 800);
//   };

//   const formatPrice = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
//   };

//   return (
//     <div className="min-h-screen px-4 py-16 mx-auto font-sans max-w-7xl sm:px-6 lg:px-8">

//       <div className="flex items-center gap-4 mb-10 animate-fade-in-up">
//         <button onClick={() => navigate("/products")} className="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50">
//           <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
//         </button>
//         <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl">Keranjang Belanja</h1>
//         <span className="ml-2 text-xl font-medium text-gray-400">({localCartItems.length} items)</span>
//       </div>

//       <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">

//         <div className="flex-grow lg:w-2/3 animate-fade-in-up" style={{ animationDelay: "100ms" }}>

//           {localCartItems.length === 0 ? (
//             <div className="py-20 text-center border border-gray-200 border-dashed rounded-3xl bg-gray-50">
//               <p className="mb-6 text-2xl font-medium text-gray-400">Keranjang Anda masih kosong.</p>
//               <button onClick={() => navigate("/products")} className="px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition bg-gray-900 rounded-full shadow-xl hover:bg-black shadow-gray-200">
//                 Mulai Belanja
//               </button>
//             </div>
//           ) : (
//             <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-3xl sm:p-8">

//               <div className="flex items-center gap-4 pb-4 mb-4 border-b border-gray-100">
//                 <input type="checkbox" checked={isAllSelected} onChange={handleSelectAll} id="selectAll" className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora" />
//                 <label htmlFor="selectAll" className="text-xs font-bold tracking-widest text-gray-800 uppercase cursor-pointer select-none">Pilih Semua Item</label>
//               </div>

//               <div className="space-y-8">
//                 {localCartItems.map((item: CartItem) => (
//                   <div key={item.id} className="relative flex items-start gap-4 pb-8 border-b border-gray-50 sm:gap-6 last:border-0 last:pb-0">

//                     <div className="pt-3 sm:pt-12">
//                       <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => handleSelectItem(item.id)} className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora" />
//                     </div>

//                     <div className="relative w-24 h-24 overflow-hidden border border-gray-100 cursor-pointer shrink-0 sm:w-40 sm:h-40 rounded-2xl bg-gray-50" onClick={() => navigate(`/product/${item.product.id}`)}>
//                       <img src={item.product.image_url} alt={item.product.name} className="object-cover w-full h-full transition-transform duration-500 hover:scale-105" />
//                     </div>

//                     <div className="flex flex-col justify-between flex-grow min-h-[6rem] sm:min-h-[10rem]">
//                       <div>
//                         <div className="flex items-start justify-between gap-2">
//                           <h3 className="w-2/3 text-sm font-bold tracking-tight text-gray-900 transition-colors cursor-pointer sm:text-lg hover:text-gycora line-clamp-2" onClick={() => navigate(`/product/${item.product.id}`)}>
//                             {item.product.name}
//                           </h3>
//                           <p className="text-sm font-extrabold text-right sm:text-lg whitespace-nowrap text-gycora">
//                             {formatPrice(item.gross_amount)}
//                           </p>
//                         </div>

//                         {item.color && (
//                           (() => {
//                             let hex = item.color as string;
//                             let name = "";

//                             try {
//                               const parsed = JSON.parse(item.color as string);
//                               if (parsed.hex) { hex = parsed.hex; name = parsed.name || ""; }
//                             } catch {
//                               if (Array.isArray(item.product.color)) {
//                                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
//                                 const matched = item.product.color.find((c: any) => (typeof c === 'object' && c.hex === item.color) || c === item.color);
//                                 if (matched && typeof matched === 'object') name = matched.name;
//                               }
//                             }

//                             return (
//                               <div className="flex items-center gap-2 mt-2">
//                                 <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Varian:</span>
//                                 <div className="flex items-center gap-2 px-2 py-1 bg-white border border-gray-200 rounded-md shadow-sm">
//                                   <span className="w-3 h-3 border border-gray-300 rounded-full shadow-inner shrink-0" style={{ backgroundColor: hex }}></span>
//                                   <span className="text-[10px] font-bold text-gray-700">
//                                     {name ? name : <span className="font-mono uppercase">{hex}</span>}
//                                   </span>
//                                 </div>
//                               </div>
//                             );
//                           })()
//                         )}

//                         <div className="flex flex-wrap items-center mt-2 gap-x-3 gap-y-1">
//                           <p className="text-xs italic tracking-wider text-gray-400">{formatPrice(item.product.price)} / pc</p>
//                           <span className="hidden w-1 h-1 bg-gray-300 rounded-full sm:block"></span>
//                         </div>
//                       </div>

//                       <div className="flex flex-col items-start gap-4 mt-4 sm:flex-row sm:justify-between sm:items-end sm:mt-6">

//                         {/* PERBAIKAN: QTY INPUT BISA DIKETIK */}
//                         <div className="flex items-center h-10 overflow-hidden bg-white border border-gray-200 shadow-sm sm:h-12 rounded-xl">
//                           <button onClick={() => handleQtyChange(item, item.quantity - 1)} className="flex items-center justify-center w-10 h-full text-base font-bold text-gray-700 transition-colors sm:w-12 hover:bg-gray-100 hover:text-gycora">-</button>
//                           <input
//                             type="text"
//                             value={qtyInputs[item.id] !== undefined ? qtyInputs[item.id] : item.quantity}
//                             onChange={(e) => handleInputChange(item.id, e.target.value)}
//                             onBlur={() => handleInputBlur(item)}
//                             className="w-12 h-full text-sm font-bold text-center text-gray-900 bg-transparent border-none outline-none focus:ring-0 sm:text-base"
//                           />
//                           <button onClick={() => handleQtyChange(item, item.quantity + 1)} className="flex items-center justify-center w-10 h-full text-base font-bold text-gray-700 transition-colors sm:w-12 hover:bg-gray-100 hover:text-gycora">+</button>
//                         </div>

//                         <button onClick={() => handleOptimisticDelete(item.id)} className="flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest text-gray-400 uppercase transition-colors group hover:text-red-500">
//                           <svg className="w-4 h-4 transition-transform sm:w-5 sm:h-5 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> Hapus
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* ... [SISA KODE MUNGKIN ANDA JUGA SUKA TETAP SAMA] ... */}
//           <div className="pt-12 mt-12 border-t border-gray-100">
//             <h3 className="mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase">Mungkin Anda Juga Suka</h3>
//             {loadingSuggestions ? (
//               <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
//                 {[1, 2, 3, 4].map((i) => (
//                   <div key={i} className="flex flex-col gap-2">
//                     <div className="bg-gray-100 aspect-square rounded-2xl animate-pulse"></div>
//                     <div className="w-3/4 h-3 mt-1 bg-gray-100 rounded animate-pulse"></div>
//                     <div className="w-1/2 h-3 bg-gray-100 rounded animate-pulse"></div>
//                   </div>
//                 ))}
//               </div>
//             ) : suggestedProducts.length > 0 ? (
//               <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
//                 {suggestedProducts.map((product) => (
//                   <div key={product.id} className="flex flex-col group">
//                     <div className="relative mb-3 overflow-hidden border border-gray-100 cursor-pointer aspect-square rounded-2xl bg-gray-50" onClick={() => navigate(`/product/${product.id}`)}>
//                       <img src={product.image_url} alt={product.name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />
//                     </div>
//                     <h4 className="mb-1 text-[11px] font-bold tracking-wide text-gray-900 uppercase truncate">{product.name}</h4>
//                     <p className="mb-3 text-xs font-bold text-gycora">{formatPrice(product.price)}</p>
//                     <button onClick={() => addSuggestedProduct(product)} className="px-3 py-2 mt-auto text-[9px] font-bold tracking-widest text-gray-700 uppercase transition-all duration-300 border border-gray-200 rounded-xl hover:border-gray-900 hover:bg-gray-900 hover:text-white">
//                       {product.color && product.color.length > 0 ? "Pilih Varian" : "Tambah +"}
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             ) : null}
//           </div>
//         </div>

//         {/* ... [SISA KODE RINGKASAN PESANAN TETAP SAMA] ... */}
//         {localCartItems.length > 0 && (
//           <div className="lg:w-1/3 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//             <div className="sticky p-8 bg-gray-50/50 border border-gray-100 rounded-[2rem] top-32 shadow-sm">
//               <h2 className="pb-4 mb-8 text-lg font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">Ringkasan Pesanan</h2>
//               <div className="mb-8 space-y-4">
//                 <div className="flex justify-between text-sm text-gray-600"><span>Item Dipilih</span><span className="font-bold text-gray-900">{selectedIds.length}</span></div>
//                 <div className="flex items-end justify-between pt-4 border-t border-gray-200">
//                   <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">Estimasi Total</span>
//                   <span className="text-2xl font-black text-gycora">{formatPrice(checkoutTotalAmount)}</span>
//                 </div>
//                 <p className="mt-1 text-right text-[10px] italic text-gray-400">Pajak & pengiriman dihitung saat checkout.</p>
//               </div>
//               <button onClick={handleCheckout} disabled={isProcessingCheckout || selectedIds.length === 0} className="flex items-center justify-center w-full gap-3 py-5 text-sm font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/20">
//                 {!isProcessingCheckout ? (`Checkout (${selectedIds.length})`) : (<span className="flex items-center gap-2"><div className="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"></div>Memproses...</span>)}
//               </button>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart, type Product } from "../../context/CartContext";
// import { BASE_URL } from "../../config/api";

// interface CartItem {
//   id: number;
//   product_id: number;
//   product: Product;
//   quantity: number;
//   gross_amount: number;
//   color?: string | null;
// }

// export default function CartPage() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const { cartItems: contextCartItems, fetchCart, removeCartItemOptimistically, updateCartItemQtyOptimistically, revertCartItems } = useCart() as any;

//   const [localCartItems, setLocalCartItems] = useState<CartItem[]>([]);
//   const [selectedIds, setSelectedIds] = useState<number[]>([]);
//   const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
//   const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
//   const [loadingSuggestions, setLoadingSuggestions] = useState(true);

//   // State terpisah untuk menampung input string sementara saat pengguna mengetik
//   const [qtyInputs, setQtyInputs] = useState<{ [key: number]: string }>({});

//   const debounceTimers = useRef<{ [key: number]: ReturnType<typeof setTimeout> }>({});

//   useEffect(() => {
//     setLocalCartItems(contextCartItems);
//     // Inisialisasi state input berdasarkan data asli
//     const initialInputs: { [key: number]: string } = {};
//     contextCartItems.forEach((item: CartItem) => {
//       initialInputs[item.id] = item.quantity.toString();
//     });
//     setQtyInputs(initialInputs);
//   }, [contextCartItems]);

//   useEffect(() => {
//     setSelectedIds((prev) => prev.filter((id) => localCartItems.some((item) => item.id === id)));
//   }, [localCartItems]);

//   const isAllSelected = localCartItems.length > 0 && selectedIds.length === localCartItems.length;

//   const handleSelectAll = () => {
//     if (isAllSelected) setSelectedIds([]);
//     else setSelectedIds(localCartItems.map((item) => item.id));
//   };

//   const handleSelectItem = (id: number) => {
//     setSelectedIds((prev) => prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]);
//   };

//   // Helper untuk mendapatkan harga yang aktif (diskon atau harga normal)
//   const getActivePrice = (product: Product) => {
//     return product.discount_price && product.discount_price > 0 ? product.discount_price : product.price;
//   };

//   const checkoutTotalAmount = useMemo(() => {
//     return localCartItems
//       .filter((item) => selectedIds.includes(item.id))
//       // [PERBAIKAN] Selalu gunakan fungsi getActivePrice dikalikan quantity agar selalu akurat
//       .reduce((total, item) => total + (getActivePrice(item.product) * item.quantity), 0);
//   }, [localCartItems, selectedIds]);

//   // FUNGSI INTI UNTUK MENGUBAH DAN MEMUKUL API
//   const handleQtyChange = (item: CartItem, newQty: number) => {
//     if (newQty < 1 || newQty > item.product.stock) {
//         if(newQty > item.product.stock) {
//             Swal.fire({ toast: true, position: 'top-end', icon: 'warning', title: `Stok maksimum ${item.product.stock} tercapai.`, showConfirmButton: false, timer: 2000 });
//             setQtyInputs(prev => ({ ...prev, [item.id]: item.product.stock.toString() }));
//             newQty = item.product.stock;
//         } else {
//             return;
//         }
//     }

//     const token = localStorage.getItem("user_token");
//     const originalItems = [...localCartItems];

//     // Menghitung gross amount menggunakan harga aktif
//     const currentPrice = getActivePrice(item.product);
//     const newGrossAmount = newQty * currentPrice;

//     setLocalCartItems((prevItems) =>
//       prevItems.map((cartItem) =>
//         cartItem.id === item.id
//           ? { ...cartItem, quantity: newQty, gross_amount: newGrossAmount }
//           : cartItem
//       )
//     );

//     updateCartItemQtyOptimistically(item.id, newQty, newGrossAmount);
//     setQtyInputs(prev => ({ ...prev, [item.id]: newQty.toString() }));

//     if (debounceTimers.current[item.id]) {
//       clearTimeout(debounceTimers.current[item.id]);
//     }

//     debounceTimers.current[item.id] = setTimeout(async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/carts/${item.id}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
//           body: JSON.stringify({ quantity: newQty }),
//         });

//         if (!res.ok) {
//             const err = await res.json();
//             Swal.fire("Peringatan", err.message || "Gagal mengubah kuantitas", "warning");
//             revertCartItems(originalItems);
//             fetchCart();
//         }
//       } catch (error) {
//         console.error(error);
//         Swal.fire("Error", "Gagal terhubung ke server", "error");
//         revertCartItems(originalItems);
//         fetchCart();
//       }
//     }, 800);
//   };

//   // --- HANDLE KETIKAN INPUT ---
//   const handleInputChange = (itemId: number, value: string) => {
//     if (value === "" || /^\d+$/.test(value)) {
//       setQtyInputs(prev => ({ ...prev, [itemId]: value }));
//     }
//   };

//   const handleInputBlur = (item: CartItem) => {
//     let parsed = parseInt(qtyInputs[item.id]);
//     if (isNaN(parsed) || parsed < 1) parsed = 1;
//     handleQtyChange(item, parsed);
//   };

//   const handleOptimisticDelete = async (id: number) => {
//     const token = localStorage.getItem("user_token");
//     const originalItems = [...localCartItems];

//     setLocalCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
//     setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
//     removeCartItemOptimistically(id);

//     if (debounceTimers.current[id]) {
//       clearTimeout(debounceTimers.current[id]);
//       delete debounceTimers.current[id];
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts/${id}`, {
//         method: "DELETE",
//         headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
//       });

//       if (!res.ok) {
//         revertCartItems(originalItems);
//         Swal.fire("Peringatan", "Gagal menghapus item", "warning");
//       }
//     } catch (error) {
//       console.error(error);
//       revertCartItems(originalItems);
//       Swal.fire("Error", "Gagal menghapus item", "error");
//     }
//   };

//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         const data = await res.json();
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         const products: any[] = data.data ? data.data : data;

//         const cartProductIds = localCartItems.map((item) => item.product_id);
//         const available = products.filter((p) => !cartProductIds.includes(p.id) && p.stock > 0);

//         const shuffled = available.sort(() => 0.5 - Math.random());
//         setSuggestedProducts(shuffled.slice(0, 4));
//       } catch (error) {
//         console.error("Gagal memuat rekomendasi:", error);
//       } finally {
//         setLoadingSuggestions(false);
//       }
//     };

//     fetchSuggestions();
//   }, [localCartItems]);

//   const addSuggestedProduct = async (product: Product) => {
//     const token = localStorage.getItem("user_token");
//     if(!token) {
//         navigate("/login");
//         return;
//     }

//     if (product.color && product.color.length > 0) {
//         navigate(`/product/${product.id}`);
//         return;
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ product_id: product.id, quantity: 1 }),
//       });
//       if (res.ok) {
//         Swal.fire({ title: "Ditambahkan ke Keranjang", icon: "success", toast: true, position: "top-end", timer: 1500, showConfirmButton: false });
//         fetchCart();
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleCheckout = () => {
//     if (selectedIds.length === 0) return;
//     setIsProcessingCheckout(true);
//     setTimeout(() => {
//         setIsProcessingCheckout(false);
//         navigate("/checkout", { state: { selectedIds: selectedIds } });
//     }, 800);
//   };

//   const formatPrice = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
//   };

//   return (
//     <div className="min-h-screen px-4 py-16 mx-auto font-sans max-w-7xl sm:px-6 lg:px-8">

//       <div className="flex items-center gap-4 mb-10 animate-fade-in-up">
//         <button onClick={() => navigate("/products")} className="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50">
//           <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
//         </button>
//         <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl">Keranjang Belanja</h1>
//         <span className="ml-2 text-xl font-medium text-gray-400">({localCartItems.length} items)</span>
//       </div>

//       <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">

//         <div className="flex-grow lg:w-2/3 animate-fade-in-up" style={{ animationDelay: "100ms" }}>

//           {localCartItems.length === 0 ? (
//             <div className="py-20 text-center border border-gray-200 border-dashed rounded-3xl bg-gray-50">
//               <p className="mb-6 text-2xl font-medium text-gray-400">Keranjang Anda masih kosong.</p>
//               <button onClick={() => navigate("/products")} className="px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition bg-gray-900 rounded-full shadow-xl hover:bg-black shadow-gray-200">
//                 Mulai Belanja
//               </button>
//             </div>
//           ) : (
//             <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-3xl sm:p-8">

//               <div className="flex items-center gap-4 pb-4 mb-4 border-b border-gray-100">
//                 <input type="checkbox" checked={isAllSelected} onChange={handleSelectAll} id="selectAll" className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora" />
//                 <label htmlFor="selectAll" className="text-xs font-bold tracking-widest text-gray-800 uppercase cursor-pointer select-none">Pilih Semua Item</label>
//               </div>

//               <div className="space-y-8">
//                 {localCartItems.map((item: CartItem) => {
//                   const currentPrice = getActivePrice(item.product);
//                   const isDiscounted = item.product.discount_price && item.product.discount_price > 0;
//                   // [PERBAIKAN] Menghitung harga total (gross) baris ini dengan akurat
//                   const currentGrossAmount = currentPrice * item.quantity;
//                   const originalGrossAmount = item.product.price * item.quantity;

//                   return (
//                     <div key={item.id} className="relative flex items-start gap-4 pb-8 border-b border-gray-50 sm:gap-6 last:border-0 last:pb-0">

//                       <div className="pt-3 sm:pt-12">
//                         <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => handleSelectItem(item.id)} className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora" />
//                       </div>

//                       <div className="relative w-24 h-24 overflow-hidden border border-gray-100 cursor-pointer shrink-0 sm:w-40 sm:h-40 rounded-2xl bg-gray-50" onClick={() => navigate(`/product/${item.product.id}`)}>
//                         <img src={item.product.image_url} alt={item.product.name} className="object-cover w-full h-full transition-transform duration-500 hover:scale-105" />
//                         {isDiscounted && (
//                           <div className="absolute px-2 py-0.5 text-[9px] font-bold text-white bg-rose-500 top-2 left-2 rounded shadow-sm">SALE</div>
//                         )}
//                       </div>

//                       <div className="flex flex-col justify-between flex-grow min-h-[6rem] sm:min-h-[10rem]">
//                         <div>
//                           <div className="flex items-start justify-between gap-2">
//                             <h3 className="w-2/3 text-sm font-bold tracking-tight text-gray-900 transition-colors cursor-pointer sm:text-lg hover:text-gycora line-clamp-2" onClick={() => navigate(`/product/${item.product.id}`)}>
//                               {item.product.name}
//                             </h3>
//                             <div className="text-right">
//                               {/* [PERBAIKAN] Memastikan harga besar utama di pojok kanan adalah harga setelah diskon */}
//                               <p className="text-sm font-extrabold sm:text-lg whitespace-nowrap text-gycora">
//                                 {formatPrice(currentGrossAmount)}
//                               </p>
//                               {/* [PERBAIKAN] Harga coret adalah total dari harga original */}
//                               {isDiscounted && (
//                                 <p className="text-[10px] text-gray-400 line-through">
//                                   {formatPrice(originalGrossAmount)}
//                                 </p>
//                               )}
//                             </div>
//                           </div>

//                           {item.color && (
//                             (() => {
//                               let hex = item.color as string;
//                               let name = "";

//                               try {
//                                 const parsed = JSON.parse(item.color as string);
//                                 if (parsed.hex) { hex = parsed.hex; name = parsed.name || ""; }
//                               } catch {
//                                 if (Array.isArray(item.product.color)) {
//                                   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//                                   const matched = item.product.color.find((c: any) => (typeof c === 'object' && c.hex === item.color) || c === item.color);
//                                   if (matched && typeof matched === 'object') name = matched.name;
//                                 }
//                               }

//                               return (
//                                 <div className="flex items-center gap-2 mt-2">
//                                   <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Varian:</span>
//                                   <div className="flex items-center gap-2 px-2 py-1 bg-white border border-gray-200 rounded-md shadow-sm">
//                                     <span className="w-3 h-3 border border-gray-300 rounded-full shadow-inner shrink-0" style={{ backgroundColor: hex }}></span>
//                                     <span className="text-[10px] font-bold text-gray-700">
//                                       {name ? name : <span className="font-mono uppercase">{hex}</span>}
//                                     </span>
//                                   </div>
//                                 </div>
//                               );
//                             })()
//                           )}

//                           <div className="flex flex-wrap items-center mt-2 gap-x-3 gap-y-1">
//                             {isDiscounted ? (
//                               <div className="flex items-center gap-2">
//                                 {/* Harga diskon satuan */}
//                                 <p className="text-xs font-bold text-rose-500">{formatPrice(currentPrice)} / pc</p>
//                                 {/* Harga coret satuan */}
//                                 <p className="text-[10px] text-gray-400 line-through">{formatPrice(item.product.price)}</p>
//                               </div>
//                             ) : (
//                               <p className="text-xs italic tracking-wider text-gray-400">{formatPrice(item.product.price)} / pc</p>
//                             )}
//                             <span className="hidden w-1 h-1 bg-gray-300 rounded-full sm:block"></span>
//                           </div>
//                         </div>

//                         <div className="flex flex-col items-start gap-4 mt-4 sm:flex-row sm:justify-between sm:items-end sm:mt-6">

//                           <div className="flex items-center h-10 overflow-hidden bg-white border border-gray-200 shadow-sm sm:h-12 rounded-xl">
//                             <button onClick={() => handleQtyChange(item, item.quantity - 1)} className="flex items-center justify-center w-10 h-full text-base font-bold text-gray-700 transition-colors sm:w-12 hover:bg-gray-100 hover:text-gycora">-</button>
//                             <input
//                               type="text"
//                               value={qtyInputs[item.id] !== undefined ? qtyInputs[item.id] : item.quantity}
//                               onChange={(e) => handleInputChange(item.id, e.target.value)}
//                               onBlur={() => handleInputBlur(item)}
//                               className="w-12 h-full text-sm font-bold text-center text-gray-900 bg-transparent border-none outline-none focus:ring-0 sm:text-base"
//                             />
//                             <button onClick={() => handleQtyChange(item, item.quantity + 1)} className="flex items-center justify-center w-10 h-full text-base font-bold text-gray-700 transition-colors sm:w-12 hover:bg-gray-100 hover:text-gycora">+</button>
//                           </div>

//                           <button onClick={() => handleOptimisticDelete(item.id)} className="flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest text-gray-400 uppercase transition-colors group hover:text-red-500">
//                             <svg className="w-4 h-4 transition-transform sm:w-5 sm:h-5 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> Hapus
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           <div className="pt-12 mt-12 border-t border-gray-100">
//             <h3 className="mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase">Mungkin Anda Juga Suka</h3>
//             {loadingSuggestions ? (
//               <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
//                 {[1, 2, 3, 4].map((i) => (
//                   <div key={i} className="flex flex-col gap-2">
//                     <div className="bg-gray-100 aspect-square rounded-2xl animate-pulse"></div>
//                     <div className="w-3/4 h-3 mt-1 bg-gray-100 rounded animate-pulse"></div>
//                     <div className="w-1/2 h-3 bg-gray-100 rounded animate-pulse"></div>
//                   </div>
//                 ))}
//               </div>
//             ) : suggestedProducts.length > 0 ? (
//               <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
//                 {suggestedProducts.map((product) => {
//                   const isSugDiscounted = product.discount_price && product.discount_price > 0;
//                   return (
//                     <div key={product.id} className="flex flex-col group">
//                       <div className="relative mb-3 overflow-hidden border border-gray-100 cursor-pointer aspect-square rounded-2xl bg-gray-50" onClick={() => navigate(`/product/${product.id}`)}>
//                         <img src={product.image_url} alt={product.name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />
//                         {isSugDiscounted && (
//                           <div className="absolute px-2 py-0.5 text-[9px] font-bold text-white bg-rose-500 top-2 left-2 rounded shadow-sm">SALE</div>
//                         )}
//                       </div>
//                       <h4 className="mb-1 text-[11px] font-bold tracking-wide text-gray-900 uppercase truncate">{product.name}</h4>

//                       {isSugDiscounted ? (
//                         <div className="mb-3">
//                           <p className="text-xs font-bold text-rose-500">{formatPrice(product.discount_price!)}</p>
//                           <p className="text-[9px] text-gray-400 line-through">{formatPrice(product.price)}</p>
//                         </div>
//                       ) : (
//                         <p className="mb-3 text-xs font-bold text-gycora">{formatPrice(product.price)}</p>
//                       )}

//                       <button onClick={() => addSuggestedProduct(product)} className="px-3 py-2 mt-auto text-[9px] font-bold tracking-widest text-gray-700 uppercase transition-all duration-300 border border-gray-200 rounded-xl hover:border-gray-900 hover:bg-gray-900 hover:text-white">
//                         {product.color && product.color.length > 0 ? "Pilih Varian" : "Tambah +"}
//                       </button>
//                     </div>
//                   );
//                 })}
//               </div>
//             ) : null}
//           </div>
//         </div>

//         {localCartItems.length > 0 && (
//           <div className="lg:w-1/3 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//             <div className="sticky p-8 bg-gray-50/50 border border-gray-100 rounded-[2rem] top-32 shadow-sm">
//               <h2 className="pb-4 mb-8 text-lg font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">Ringkasan Pesanan</h2>
//               <div className="mb-8 space-y-4">
//                 <div className="flex justify-between text-sm text-gray-600"><span>Item Dipilih</span><span className="font-bold text-gray-900">{selectedIds.length}</span></div>
//                 <div className="flex items-end justify-between pt-4 border-t border-gray-200">
//                   <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">Estimasi Total</span>
//                   <span className="text-2xl font-black text-gycora">{formatPrice(checkoutTotalAmount)}</span>
//                 </div>
//                 <p className="mt-1 text-right text-[10px] italic text-gray-400">Pajak & pengiriman dihitung saat checkout.</p>
//               </div>
//               <button onClick={handleCheckout} disabled={isProcessingCheckout || selectedIds.length === 0} className="flex items-center justify-center w-full gap-3 py-5 text-sm font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/20">
//                 {!isProcessingCheckout ? (`Checkout (${selectedIds.length})`) : (<span className="flex items-center gap-2"><div className="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"></div>Memproses...</span>)}
//               </button>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart, type Product } from "../../context/CartContext";
// import { BASE_URL } from "../../config/api";

// interface CartItem {
//   id: number;
//   product_id: number;
//   product: Product;
//   quantity: number;
//   gross_amount: number;
//   color?: string | null;
// }

// export default function CartPage() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const { cartItems: contextCartItems, fetchCart, removeCartItemOptimistically, updateCartItemQtyOptimistically, revertCartItems } = useCart() as any;

//   const [localCartItems, setLocalCartItems] = useState<CartItem[]>([]);
//   const [selectedIds, setSelectedIds] = useState<number[]>([]);
//   const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
//   const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
//   const [loadingSuggestions, setLoadingSuggestions] = useState(true);

//   // State terpisah untuk menampung input string sementara saat pengguna mengetik
//   const [qtyInputs, setQtyInputs] = useState<{ [key: number]: string }>({});

//   const debounceTimers = useRef<{ [key: number]: ReturnType<typeof setTimeout> }>({});

//   useEffect(() => {
//     setLocalCartItems(contextCartItems);
//     // Inisialisasi state input berdasarkan data asli
//     const initialInputs: { [key: number]: string } = {};
//     contextCartItems.forEach((item: CartItem) => {
//       initialInputs[item.id] = item.quantity.toString();
//     });
//     setQtyInputs(initialInputs);
//   }, [contextCartItems]);

//   useEffect(() => {
//     setSelectedIds((prev) => prev.filter((id) => localCartItems.some((item) => item.id === id)));
//   }, [localCartItems]);

//   const isAllSelected = localCartItems.length > 0 && selectedIds.length === localCartItems.length;

//   const handleSelectAll = () => {
//     if (isAllSelected) setSelectedIds([]);
//     else setSelectedIds(localCartItems.map((item) => item.id));
//   };

//   const handleSelectItem = (id: number) => {
//     setSelectedIds((prev) => prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]);
//   };

//   // Helper untuk mendapatkan harga yang aktif (diskon atau harga normal)
//   const getActivePrice = (product: Product) => {
//     return product.discount_price && product.discount_price > 0 ? product.discount_price : product.price;
//   };

//   const checkoutTotalAmount = useMemo(() => {
//     return localCartItems
//       .filter((item) => selectedIds.includes(item.id))
//       .reduce((total, item) => total + (getActivePrice(item.product) * item.quantity), 0);
//   }, [localCartItems, selectedIds]);

//   // FUNGSI INTI UNTUK MENGUBAH DAN MEMUKUL API
//   const handleQtyChange = (item: CartItem, newQty: number) => {
//     if (newQty < 1 || newQty > item.product.stock) {
//         if(newQty > item.product.stock) {
//             Swal.fire({ toast: true, position: 'top-end', icon: 'warning', title: `Stok maksimum ${item.product.stock} tercapai.`, showConfirmButton: false, timer: 2000 });
//             setQtyInputs(prev => ({ ...prev, [item.id]: item.product.stock.toString() }));
//             newQty = item.product.stock;
//         } else {
//             return;
//         }
//     }

//     const token = localStorage.getItem("user_token");
//     const originalItems = [...localCartItems];

//     const currentPrice = getActivePrice(item.product);
//     const newGrossAmount = newQty * currentPrice;

//     setLocalCartItems((prevItems) =>
//       prevItems.map((cartItem) =>
//         cartItem.id === item.id
//           ? { ...cartItem, quantity: newQty, gross_amount: newGrossAmount }
//           : cartItem
//       )
//     );

//     updateCartItemQtyOptimistically(item.id, newQty, newGrossAmount);
//     setQtyInputs(prev => ({ ...prev, [item.id]: newQty.toString() }));

//     if (debounceTimers.current[item.id]) {
//       clearTimeout(debounceTimers.current[item.id]);
//     }

//     debounceTimers.current[item.id] = setTimeout(async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/carts/${item.id}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
//           body: JSON.stringify({ quantity: newQty }),
//         });

//         if (!res.ok) {
//             const err = await res.json();
//             Swal.fire("Peringatan", err.message || "Gagal mengubah kuantitas", "warning");
//             revertCartItems(originalItems);
//             fetchCart();
//         }
//       } catch (error) {
//         console.error(error);
//         Swal.fire("Error", "Gagal terhubung ke server", "error");
//         revertCartItems(originalItems);
//         fetchCart();
//       }
//     }, 800);
//   };

//   const handleInputChange = (itemId: number, value: string) => {
//     if (value === "" || /^\d+$/.test(value)) {
//       setQtyInputs(prev => ({ ...prev, [itemId]: value }));
//     }
//   };

//   const handleInputBlur = (item: CartItem) => {
//     let parsed = parseInt(qtyInputs[item.id]);
//     if (isNaN(parsed) || parsed < 1) parsed = 1;
//     handleQtyChange(item, parsed);
//   };

//   const handleOptimisticDelete = async (id: number) => {
//     const token = localStorage.getItem("user_token");
//     const originalItems = [...localCartItems];

//     setLocalCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
//     setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
//     removeCartItemOptimistically(id);

//     if (debounceTimers.current[id]) {
//       clearTimeout(debounceTimers.current[id]);
//       delete debounceTimers.current[id];
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts/${id}`, {
//         method: "DELETE",
//         headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
//       });

//       if (!res.ok) {
//         revertCartItems(originalItems);
//         Swal.fire("Peringatan", "Gagal menghapus item", "warning");
//       }
//     } catch (error) {
//       console.error(error);
//       revertCartItems(originalItems);
//       Swal.fire("Error", "Gagal menghapus item", "error");
//     }
//   };

//   // [PERBAIKAN 2] Menghapus 'localCartItems' dari dependency array agar tidak me-render ulang tiap kuantitas diubah
//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         const data = await res.json();
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         const products: any[] = data.data ? data.data : data;

//         // Ambil ID langsung dari contextCartItems di momen render pertama
//         const cartProductIds = contextCartItems.map((item: CartItem) => item.product_id);
//         const available = products.filter((p) => !cartProductIds.includes(p.id) && p.stock > 0);

//         const shuffled = available.sort(() => 0.5 - Math.random());
//         setSuggestedProducts(shuffled.slice(0, 4));
//       } catch (error) {
//         console.error("Gagal memuat rekomendasi:", error);
//       } finally {
//         setLoadingSuggestions(false);
//       }
//     };

//     fetchSuggestions();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const addSuggestedProduct = async (product: Product) => {
//     const token = localStorage.getItem("user_token");
//     if(!token) {
//         navigate("/login");
//         return;
//     }

//     if (product.color && product.color.length > 0) {
//         navigate(`/product/${product.id}`);
//         return;
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ product_id: product.id, quantity: 1 }),
//       });
//       if (res.ok) {
//         Swal.fire({ title: "Ditambahkan ke Keranjang", icon: "success", toast: true, position: "top-end", timer: 1500, showConfirmButton: false });
//         fetchCart();
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleCheckout = () => {
//     if (selectedIds.length === 0) return;
//     setIsProcessingCheckout(true);
//     setTimeout(() => {
//         setIsProcessingCheckout(false);
//         navigate("/checkout", { state: { selectedIds: selectedIds } });
//     }, 800);
//   };

//   const formatPrice = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
//   };

//   return (
//     // [PERBAIKAN 1] Menambahkan 'overflow-x-hidden' dan mengatur lebar penuh (w-full) untuk mencegah 'lompatan' scrollbar horizontal
//     <div className="w-full min-h-screen px-4 py-16 mx-auto overflow-x-hidden font-sans max-w-7xl sm:px-6 lg:px-8">

//       <div className="flex items-center gap-4 mb-10 animate-fade-in-up">
//         <button onClick={() => navigate("/products")} className="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50">
//           <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
//         </button>
//         <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl">Keranjang Belanja</h1>
//         <span className="ml-2 text-xl font-medium text-gray-400">({localCartItems.length} items)</span>
//       </div>

//       <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">

//         <div className="flex-grow lg:w-2/3 animate-fade-in-up" style={{ animationDelay: "100ms" }}>

//           {localCartItems.length === 0 ? (
//             <div className="py-20 text-center border border-gray-200 border-dashed rounded-3xl bg-gray-50">
//               <p className="mb-6 text-2xl font-medium text-gray-400">Keranjang Anda masih kosong.</p>
//               <button onClick={() => navigate("/products")} className="px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition bg-gray-900 rounded-full shadow-xl hover:bg-black shadow-gray-200">
//                 Mulai Belanja
//               </button>
//             </div>
//           ) : (
//             <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-3xl sm:p-8">

//               <div className="flex items-center gap-4 pb-4 mb-4 border-b border-gray-100">
//                 <input type="checkbox" checked={isAllSelected} onChange={handleSelectAll} id="selectAll" className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora" />
//                 <label htmlFor="selectAll" className="text-xs font-bold tracking-widest text-gray-800 uppercase cursor-pointer select-none">Pilih Semua Item</label>
//               </div>

//               <div className="space-y-8">
//                 {localCartItems.map((item: CartItem) => {
//                   const currentPrice = getActivePrice(item.product);
//                   const isDiscounted = item.product.discount_price && item.product.discount_price > 0;
//                   const currentGrossAmount = currentPrice * item.quantity;
//                   const originalGrossAmount = item.product.price * item.quantity;

//                   return (
//                     <div key={item.id} className="relative flex items-start gap-4 pb-8 border-b border-gray-50 sm:gap-6 last:border-0 last:pb-0">

//                       <div className="pt-3 sm:pt-12">
//                         <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => handleSelectItem(item.id)} className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora" />
//                       </div>

//                       <div className="relative w-24 h-24 overflow-hidden border border-gray-100 cursor-pointer shrink-0 sm:w-40 sm:h-40 rounded-2xl bg-gray-50" onClick={() => navigate(`/product/${item.product.id}`)}>
//                         <img src={item.product.image_url} alt={item.product.name} className="object-cover w-full h-full transition-transform duration-500 hover:scale-105" />
//                         {isDiscounted && (
//                           <div className="absolute px-2 py-0.5 text-[9px] font-bold text-white bg-rose-500 top-2 left-2 rounded shadow-sm">SALE</div>
//                         )}
//                       </div>

//                       <div className="flex flex-col justify-between flex-grow min-h-[6rem] sm:min-h-[10rem]">
//                         <div>
//                           <div className="flex items-start justify-between gap-2">
//                             <h3 className="w-2/3 text-sm font-bold tracking-tight text-gray-900 transition-colors cursor-pointer sm:text-lg hover:text-gycora line-clamp-2" onClick={() => navigate(`/product/${item.product.id}`)}>
//                               {item.product.name}
//                             </h3>
//                             <div className="text-right">
//                               <p className="text-sm font-extrabold sm:text-lg whitespace-nowrap text-gycora">
//                                 {formatPrice(currentGrossAmount)}
//                               </p>
//                               {isDiscounted && (
//                                 <p className="text-[10px] text-gray-400 line-through">
//                                   {formatPrice(originalGrossAmount)}
//                                 </p>
//                               )}
//                             </div>
//                           </div>

//                           {item.color && (
//                             (() => {
//                               let hex = item.color as string;
//                               let name = "";

//                               try {
//                                 const parsed = JSON.parse(item.color as string);
//                                 if (parsed.hex) { hex = parsed.hex; name = parsed.name || ""; }
//                               } catch {
//                                 if (Array.isArray(item.product.color)) {
//                                   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//                                   const matched = item.product.color.find((c: any) => (typeof c === 'object' && c.hex === item.color) || c === item.color);
//                                   if (matched && typeof matched === 'object') name = matched.name;
//                                 }
//                               }

//                               return (
//                                 <div className="flex items-center gap-2 mt-2">
//                                   <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Varian:</span>
//                                   <div className="flex items-center gap-2 px-2 py-1 bg-white border border-gray-200 rounded-md shadow-sm">
//                                     <span className="w-3 h-3 border border-gray-300 rounded-full shadow-inner shrink-0" style={{ backgroundColor: hex }}></span>
//                                     <span className="text-[10px] font-bold text-gray-700">
//                                       {name ? name : <span className="font-mono uppercase">{hex}</span>}
//                                     </span>
//                                   </div>
//                                 </div>
//                               );
//                             })()
//                           )}

//                           <div className="flex flex-wrap items-center mt-2 gap-x-3 gap-y-1">
//                             {isDiscounted ? (
//                               <div className="flex items-center gap-2">
//                                 <p className="text-xs font-bold text-rose-500">{formatPrice(currentPrice)} / pc</p>
//                                 <p className="text-[10px] text-gray-400 line-through">{formatPrice(item.product.price)}</p>
//                               </div>
//                             ) : (
//                               <p className="text-xs italic tracking-wider text-gray-400">{formatPrice(item.product.price)} / pc</p>
//                             )}
//                             <span className="hidden w-1 h-1 bg-gray-300 rounded-full sm:block"></span>
//                           </div>
//                         </div>

//                         <div className="flex flex-col items-start gap-4 mt-4 sm:flex-row sm:justify-between sm:items-end sm:mt-6">

//                           <div className="flex items-center h-10 overflow-hidden bg-white border border-gray-200 shadow-sm sm:h-12 rounded-xl">
//                             <button onClick={() => handleQtyChange(item, item.quantity - 1)} className="flex items-center justify-center w-10 h-full text-base font-bold text-gray-700 transition-colors sm:w-12 hover:bg-gray-100 hover:text-gycora">-</button>
//                             <input
//                               type="text"
//                               value={qtyInputs[item.id] !== undefined ? qtyInputs[item.id] : item.quantity}
//                               onChange={(e) => handleInputChange(item.id, e.target.value)}
//                               onBlur={() => handleInputBlur(item)}
//                               className="w-12 h-full text-sm font-bold text-center text-gray-900 bg-transparent border-none outline-none focus:ring-0 sm:text-base"
//                             />
//                             <button onClick={() => handleQtyChange(item, item.quantity + 1)} className="flex items-center justify-center w-10 h-full text-base font-bold text-gray-700 transition-colors sm:w-12 hover:bg-gray-100 hover:text-gycora">+</button>
//                           </div>

//                           <button onClick={() => handleOptimisticDelete(item.id)} className="flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest text-gray-400 uppercase transition-colors group hover:text-red-500">
//                             <svg className="w-4 h-4 transition-transform sm:w-5 sm:h-5 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> Hapus
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           <div className="pt-12 mt-12 border-t border-gray-100">
//             <h3 className="mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase">Mungkin Anda Juga Suka</h3>
//             {loadingSuggestions ? (
//               <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
//                 {[1, 2, 3, 4].map((i) => (
//                   <div key={i} className="flex flex-col gap-2">
//                     <div className="bg-gray-100 aspect-square rounded-2xl animate-pulse"></div>
//                     <div className="w-3/4 h-3 mt-1 bg-gray-100 rounded animate-pulse"></div>
//                     <div className="w-1/2 h-3 bg-gray-100 rounded animate-pulse"></div>
//                   </div>
//                 ))}
//               </div>
//             ) : suggestedProducts.length > 0 ? (
//               <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
//                 {suggestedProducts.map((product) => {
//                   const isSugDiscounted = product.discount_price && product.discount_price > 0;
//                   return (
//                     <div key={product.id} className="flex flex-col group">
//                       <div className="relative mb-3 overflow-hidden border border-gray-100 cursor-pointer aspect-square rounded-2xl bg-gray-50" onClick={() => navigate(`/product/${product.id}`)}>
//                         <img src={product.image_url} alt={product.name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />
//                         {isSugDiscounted && (
//                           <div className="absolute px-2 py-0.5 text-[9px] font-bold text-white bg-rose-500 top-2 left-2 rounded shadow-sm">SALE</div>
//                         )}
//                       </div>
//                       <h4 className="mb-1 text-[11px] font-bold tracking-wide text-gray-900 uppercase truncate">{product.name}</h4>

//                       {isSugDiscounted ? (
//                         <div className="mb-3">
//                           <p className="text-xs font-bold text-rose-500">{formatPrice(product.discount_price!)}</p>
//                           <p className="text-[9px] text-gray-400 line-through">{formatPrice(product.price)}</p>
//                         </div>
//                       ) : (
//                         <p className="mb-3 text-xs font-bold text-gycora">{formatPrice(product.price)}</p>
//                       )}

//                       <button onClick={() => addSuggestedProduct(product)} className="px-3 py-2 mt-auto text-[9px] font-bold tracking-widest text-gray-700 uppercase transition-all duration-300 border border-gray-200 rounded-xl hover:border-gray-900 hover:bg-gray-900 hover:text-white">
//                         {product.color && product.color.length > 0 ? "Pilih Varian" : "Tambah +"}
//                       </button>
//                     </div>
//                   );
//                 })}
//               </div>
//             ) : null}
//           </div>
//         </div>

//         {localCartItems.length > 0 && (
//           <div className="lg:w-1/3 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//             <div className="sticky p-8 bg-gray-50/50 border border-gray-100 rounded-[2rem] top-32 shadow-sm">
//               <h2 className="pb-4 mb-8 text-lg font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">Ringkasan Pesanan</h2>
//               <div className="mb-8 space-y-4">
//                 <div className="flex justify-between text-sm text-gray-600"><span>Item Dipilih</span><span className="font-bold text-gray-900">{selectedIds.length}</span></div>
//                 <div className="flex items-end justify-between pt-4 border-t border-gray-200">
//                   <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">Estimasi Total</span>
//                   <span className="text-2xl font-black text-gycora">{formatPrice(checkoutTotalAmount)}</span>
//                 </div>
//                 <p className="mt-1 text-right text-[10px] italic text-gray-400">Pajak & pengiriman dihitung saat checkout.</p>
//               </div>
//               <button onClick={handleCheckout} disabled={isProcessingCheckout || selectedIds.length === 0} className="flex items-center justify-center w-full gap-3 py-5 text-sm font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/20">
//                 {!isProcessingCheckout ? (`Checkout (${selectedIds.length})`) : (<span className="flex items-center gap-2"><div className="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"></div>Memproses...</span>)}
//               </button>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCart, type Product } from "../../context/CartContext";
import { BASE_URL } from "../../config/api";
import { useLanguage } from "../../context/LanguageContext"; // [BARU] Import Context Bahasa

interface CartItem {
  id: number;
  product_id: number;
  product_slug: string;
  product: Product;
  quantity: number;
  gross_amount: number;
  color?: string | null;
}

export default function CartPage() {
  const navigate = useNavigate();
  const { t } = useLanguage(); // [BARU] Inisialisasi hook bahasa

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const {
    cartItems: contextCartItems,
    fetchCart,
    removeCartItemOptimistically,
    updateCartItemQtyOptimistically,
    revertCartItems,
  } = useCart() as any;

  const [localCartItems, setLocalCartItems] = useState<CartItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(true);

  // State terpisah untuk menampung input string sementara saat pengguna mengetik
  const [qtyInputs, setQtyInputs] = useState<{ [key: number]: string }>({});

  const debounceTimers = useRef<{
    [key: number]: ReturnType<typeof setTimeout>;
  }>({});

  // =========================================================
  // [BARU] LOGIKA PREFIX URL PINTAR
  // Membaca URL saat ini untuk menentukan prefix navigasi
  // =========================================================
  const getUrlPrefix = () => {
    if (location.pathname.startsWith("/id")) return "/id";
    if (location.pathname.startsWith("/en")) return "/en";
    return ""; // Tanpa prefix
  };
  const urlPrefix = getUrlPrefix();

  useEffect(() => {
    setLocalCartItems(contextCartItems);
    // Inisialisasi state input berdasarkan data asli
    const initialInputs: { [key: number]: string } = {};
    contextCartItems.forEach((item: CartItem) => {
      initialInputs[item.id] = item.quantity.toString();
    });
    setQtyInputs(initialInputs);
  }, [contextCartItems]);

  useEffect(() => {
    setSelectedIds((prev) =>
      prev.filter((id) => localCartItems.some((item) => item.id === id)),
    );
  }, [localCartItems]);

  const isAllSelected =
    localCartItems.length > 0 && selectedIds.length === localCartItems.length;

  const handleSelectAll = () => {
    if (isAllSelected) setSelectedIds([]);
    else setSelectedIds(localCartItems.map((item) => item.id));
  };

  const handleSelectItem = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  // Helper untuk mendapatkan harga yang aktif (diskon atau harga normal)
  const getActivePrice = (product: Product) => {
    return product.discount_price && product.discount_price > 0
      ? product.discount_price
      : product.price;
  };

  const checkoutTotalAmount = useMemo(() => {
    return localCartItems
      .filter((item) => selectedIds.includes(item.id))
      .reduce(
        (total, item) => total + getActivePrice(item.product) * item.quantity,
        0,
      );
  }, [localCartItems, selectedIds]);

  // FUNGSI INTI UNTUK MENGUBAH DAN MEMUKUL API
  const handleQtyChange = (item: CartItem, newQty: number) => {
    if (newQty < 1 || newQty > item.product.stock) {
      if (newQty > item.product.stock) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "warning",
          title: t("cart_max_stock_warning", {
            stock: item.product.stock.toString(),
          }),
          showConfirmButton: false,
          timer: 2000,
        });
        setQtyInputs((prev) => ({
          ...prev,
          [item.id]: item.product.stock.toString(),
        }));
        newQty = item.product.stock;
      } else {
        return;
      }
    }

    const token = localStorage.getItem("user_token");
    const originalItems = [...localCartItems];

    const currentPrice = getActivePrice(item.product);
    const newGrossAmount = newQty * currentPrice;

    setLocalCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: newQty, gross_amount: newGrossAmount }
          : cartItem,
      ),
    );

    updateCartItemQtyOptimistically(item.id, newQty, newGrossAmount);
    setQtyInputs((prev) => ({ ...prev, [item.id]: newQty.toString() }));

    if (debounceTimers.current[item.id]) {
      clearTimeout(debounceTimers.current[item.id]);
    }

    debounceTimers.current[item.id] = setTimeout(async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/carts/${item.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity: newQty }),
        });

        if (!res.ok) {
          const err = await res.json();
          Swal.fire(
            t("notification"),
            err.message || t("cart_update_fail"),
            "warning",
          );
          revertCartItems(originalItems);
          fetchCart();
        }
      } catch (error) {
        console.error(error);
        Swal.fire(t("error"), t("cart_server_error"), "error");
        revertCartItems(originalItems);
        fetchCart();
      }
    }, 800);
  };

  const handleInputChange = (itemId: number, value: string) => {
    if (value === "" || /^\d+$/.test(value)) {
      setQtyInputs((prev) => ({ ...prev, [itemId]: value }));
    }
  };

  const handleInputBlur = (item: CartItem) => {
    let parsed = parseInt(qtyInputs[item.id]);
    if (isNaN(parsed) || parsed < 1) parsed = 1;
    handleQtyChange(item, parsed);
  };

  const handleOptimisticDelete = async (id: number) => {
    const token = localStorage.getItem("user_token");
    const originalItems = [...localCartItems];

    setLocalCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== id),
    );
    setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
    removeCartItemOptimistically(id);

    if (debounceTimers.current[id]) {
      clearTimeout(debounceTimers.current[id]);
      delete debounceTimers.current[id];
    }

    try {
      const res = await fetch(`${BASE_URL}/api/carts/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        revertCartItems(originalItems);
        Swal.fire(t("notification"), t("cart_delete_fail"), "warning");
      }
    } catch (error) {
      console.error(error);
      revertCartItems(originalItems);
      Swal.fire(t("error"), t("cart_delete_fail"), "error");
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products`);
        const data = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const products: any[] = data.data ? data.data : data;

        const cartProductIds = contextCartItems.map(
          (item: CartItem) => item.product_id,
        );
        const available = products.filter(
          (p) => !cartProductIds.includes(p.id) && p.stock > 0,
        );

        const shuffled = available.sort(() => 0.5 - Math.random());
        setSuggestedProducts(shuffled.slice(0, 4));
      } catch (error) {
        console.error("Gagal memuat rekomendasi:", error);
      } finally {
        setLoadingSuggestions(false);
      }
    };

    fetchSuggestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addSuggestedProduct = async (product: Product) => {
    const token = localStorage.getItem("user_token");
    if (!token) {
      navigate(`${urlPrefix}/login`);
      return;
    }

    if (product.color && product.color.length > 0) {
      navigate(`${urlPrefix}/product/${product.slug}`); // [PERBAIKAN] Menggunakan slug sesuai permintaan sebelumnya
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/carts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: product.slug, quantity: 1 }),
      });
      if (res.ok) {
        Swal.fire({
          title: t("added_to_cart"),
          icon: "success",
          toast: true,
          position: "top-end",
          timer: 1500,
          showConfirmButton: false,
        });
        fetchCart();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = () => {
    if (selectedIds.length === 0) return;
    setIsProcessingCheckout(true);
    setTimeout(() => {
      setIsProcessingCheckout(false);
      navigate(`${navigate}/checkout`, { state: { selectedIds: selectedIds } });
    }, 800);
  };

  const formatPrice = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <div className="w-full min-h-screen px-4 py-16 mx-auto overflow-x-hidden font-sans bg-gray-100 max-w-7xl sm:px-6 lg:px-8">
      <div className="flex items-center gap-4 mb-10 animate-fade-in-up">
        <button
          onClick={() => navigate(`${urlPrefix}/products`)}
          className="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
          {t("cart_title")}
        </h1>
        <span className="ml-2 text-xl font-medium text-gray-400">
          {t("cart_items_count", { count: localCartItems.length.toString() })}
        </span>
      </div>

      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        <div
          className="flex-grow lg:w-2/3 animate-fade-in-up"
          style={{ animationDelay: "100ms" }}
        >
          {localCartItems.length === 0 ? (
            <div className="py-20 text-center border border-gray-200 border-dashed rounded-3xl bg-gray-50">
              <p className="mb-6 text-2xl font-medium text-gray-400">
                {t("cart_empty_title")}
              </p>
              <button
                onClick={() => navigate(`${urlPrefix}/products`)}
                className="px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition bg-gray-900 rounded-full shadow-xl hover:bg-black shadow-gray-200"
              >
                {t("btn_start_shopping")}
              </button>
            </div>
          ) : (
            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-3xl sm:p-8">
              <div className="flex items-center gap-4 pb-4 mb-4 border-b border-gray-100">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  id="selectAll"
                  className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora"
                />
                <label
                  htmlFor="selectAll"
                  className="text-xs font-bold tracking-widest text-gray-800 uppercase cursor-pointer select-none"
                >
                  {t("cart_select_all")}
                </label>
              </div>

              <div className="space-y-8">
                {localCartItems.map((item: CartItem) => {
                  const currentPrice = getActivePrice(item.product);
                  const isDiscounted =
                    item.product.discount_price &&
                    item.product.discount_price > 0;
                  const currentGrossAmount = currentPrice * item.quantity;
                  const originalGrossAmount =
                    item.product.price * item.quantity;

                  return (
                    <div
                      key={item.id}
                      className="relative flex items-start gap-4 pb-8 border-b border-gray-50 sm:gap-6 last:border-0 last:pb-0"
                    >
                      <div className="pt-3 sm:pt-12">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(item.id)}
                          onChange={() => handleSelectItem(item.id)}
                          className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora"
                        />
                      </div>

                      <div
                        className="relative w-24 h-24 overflow-hidden border border-gray-100 cursor-pointer shrink-0 sm:w-40 sm:h-40 rounded-2xl bg-gray-50"
                        onClick={() =>
                          navigate(`${urlPrefix}/product/${item.product.slug}`)
                        }
                      >
                        <img
                          src={item.product.image_url}
                          alt={item.product.name}
                          className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                        />
                        {isDiscounted && (
                          <div className="absolute px-2 py-0.5 text-[9px] font-bold text-white bg-rose-500 top-2 left-2 rounded shadow-sm">
                            {t("cart_sale_badge")}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col justify-between flex-grow min-h-[6rem] sm:min-h-[10rem]">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3
                              className="w-2/3 text-sm font-bold tracking-tight text-gray-900 transition-colors cursor-pointer sm:text-lg hover:text-gycora line-clamp-2"
                              onClick={() =>
                                navigate(`${urlPrefix}/product/${item.product.slug}`)
                              }
                            >
                              {item.product.name}
                            </h3>
                            <div className="text-right">
                              <p className="text-sm font-extrabold sm:text-lg whitespace-nowrap text-gycora">
                                {formatPrice(currentGrossAmount)}
                              </p>
                              {isDiscounted && (
                                <p className="text-[10px] text-gray-400 line-through">
                                  {formatPrice(originalGrossAmount)}
                                </p>
                              )}
                            </div>
                          </div>

                          {item.color &&
                            (() => {
                              let hex = item.color as string;
                              let name = "";

                              try {
                                const parsed = JSON.parse(item.color as string);
                                if (parsed.hex) {
                                  hex = parsed.hex;
                                  name = parsed.name || "";
                                }
                              } catch {
                                if (Array.isArray(item.product.color)) {
                                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                  const matched = item.product.color.find(
                                    (c: any) =>
                                      (typeof c === "object" &&
                                        c.hex === item.color) ||
                                      c === item.color,
                                  );
                                  if (matched && typeof matched === "object")
                                    name = matched.name;
                                }
                              }

                              return (
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                    {t("cart_variant_label")}
                                  </span>
                                  <div className="flex items-center gap-2 px-2 py-1 bg-white border border-gray-200 rounded-md shadow-sm">
                                    <span
                                      className="w-3 h-3 border border-gray-300 rounded-full shadow-inner shrink-0"
                                      style={{ backgroundColor: hex }}
                                    ></span>
                                    <span className="text-[10px] font-bold text-gray-700">
                                      {name ? (
                                        name
                                      ) : (
                                        <span className="font-mono uppercase">
                                          {hex}
                                        </span>
                                      )}
                                    </span>
                                  </div>
                                </div>
                              );
                            })()}

                          <div className="flex flex-wrap items-center mt-2 gap-x-3 gap-y-1">
                            {isDiscounted ? (
                              <div className="flex items-center gap-2">
                                <p className="text-xs font-bold text-rose-500">
                                  {formatPrice(currentPrice)} {t("cart_per_pc")}
                                </p>
                                <p className="text-[10px] text-gray-400 line-through">
                                  {formatPrice(item.product.price)}
                                </p>
                              </div>
                            ) : (
                              <p className="text-xs italic tracking-wider text-gray-400">
                                {formatPrice(item.product.price)}{" "}
                                {t("cart_per_pc")}
                              </p>
                            )}
                            <span className="hidden w-1 h-1 bg-gray-300 rounded-full sm:block"></span>
                          </div>
                        </div>

                        <div className="flex flex-col items-start gap-4 mt-4 sm:flex-row sm:justify-between sm:items-end sm:mt-6">
                          <div className="flex items-center h-10 overflow-hidden bg-white border border-gray-200 shadow-sm sm:h-12 rounded-xl">
                            <button
                              onClick={() =>
                                handleQtyChange(item, item.quantity - 1)
                              }
                              className="flex items-center justify-center w-10 h-full text-base font-bold text-gray-700 transition-colors sm:w-12 hover:bg-gray-100 hover:text-gycora"
                            >
                              -
                            </button>
                            <input
                              type="text"
                              value={
                                qtyInputs[item.id] !== undefined
                                  ? qtyInputs[item.id]
                                  : item.quantity
                              }
                              onChange={(e) =>
                                handleInputChange(item.id, e.target.value)
                              }
                              onBlur={() => handleInputBlur(item)}
                              className="w-12 h-full text-sm font-bold text-center text-gray-900 bg-transparent border-none outline-none focus:ring-0 sm:text-base"
                            />
                            <button
                              onClick={() =>
                                handleQtyChange(item, item.quantity + 1)
                              }
                              className="flex items-center justify-center w-10 h-full text-base font-bold text-gray-700 transition-colors sm:w-12 hover:bg-gray-100 hover:text-gycora"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => handleOptimisticDelete(item.id)}
                            className="flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest text-gray-400 uppercase transition-colors group hover:text-red-500"
                          >
                            <svg
                              className="w-4 h-4 transition-transform sm:w-5 sm:h-5 group-hover:rotate-12"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>{" "}
                            {t("btn_remove")}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="pt-12 mt-12 border-t border-gray-100">
            <h3 className="mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase">
              {t("cart_suggest_title")}
            </h3>
            {loadingSuggestions ? (
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="bg-gray-100 aspect-square rounded-2xl animate-pulse"></div>
                    <div className="w-3/4 h-3 mt-1 bg-gray-100 rounded animate-pulse"></div>
                    <div className="w-1/2 h-3 bg-gray-100 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            ) : suggestedProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {suggestedProducts.map((product) => {
                  const isSugDiscounted =
                    product.discount_price && product.discount_price > 0;
                  return (
                    <div key={product.id} className="flex flex-col group">
                      {/* <div className="relative mb-3 overflow-hidden border border-gray-100 cursor-pointer aspect-square rounded-2xl bg-gray-50" onClick={() => navigate(`/product/${product.id}`)}> */}
                      {/* <div className="relative mb-3 overflow-hidden border border-gray-100 cursor-pointer aspect-square rounded-2xl bg-gray-50" onClick={() => navigate(`/product/${product.slug}`)}> */}
                      <div
                        className="relative mb-3 overflow-hidden border border-gray-100 cursor-pointer aspect-square rounded-2xl bg-gray-50"
                        onClick={() =>
                          navigate(`${urlPrefix}/product/${product.slug}`, {
                            state: {
                              initialProduct: product, // Lempar data secara eksplisit
                              allProducts: suggestedProducts,
                            },
                          })
                        }
                      >
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                        />
                        {isSugDiscounted && (
                          <div className="absolute px-2 py-0.5 text-[9px] font-bold text-white bg-rose-500 top-2 left-2 rounded shadow-sm">
                            {t("cart_sale_badge")}
                          </div>
                        )}
                      </div>
                      <h4 className="mb-1 text-[11px] font-bold tracking-wide text-gray-900 uppercase truncate">
                        {product.name}
                      </h4>

                      {isSugDiscounted ? (
                        <div className="mb-3">
                          <p className="text-xs font-bold text-rose-500">
                            {formatPrice(product.discount_price!)}
                          </p>
                          <p className="text-[9px] text-gray-400 line-through">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                      ) : (
                        <p className="mb-3 text-xs font-bold text-gycora">
                          {formatPrice(product.price)}
                        </p>
                      )}

                      <button
                        onClick={() => addSuggestedProduct(product)}
                        className="px-3 py-2 mt-auto text-[9px] font-bold tracking-widest text-gray-700 uppercase transition-all duration-300 border border-gray-200 rounded-xl hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                      >
                        {product.color && product.color.length > 0
                          ? t("btn_choose_variant")
                          : t("btn_add_plus")}
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>

        {localCartItems.length > 0 && (
          <div
            className="lg:w-1/3 animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <div className="sticky p-8 bg-gray-50/50 border border-gray-100 rounded-[2rem] top-32 shadow-sm">
              <h2 className="pb-4 mb-8 text-lg font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">
                {t("cart_summary_title")}
              </h2>
              <div className="mb-8 space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{t("cart_selected_items")}</span>
                  <span className="font-bold text-gray-900">
                    {selectedIds.length}
                  </span>
                </div>
                <div className="flex items-end justify-between pt-4 border-t border-gray-200">
                  <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
                    {t("cart_estimated_total")}
                  </span>
                  <span className="text-2xl font-black text-gycora">
                    {formatPrice(checkoutTotalAmount)}
                  </span>
                </div>
                <p className="mt-1 text-right text-[10px] italic text-gray-400">
                  {t("cart_tax_shipping_note")}
                </p>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isProcessingCheckout || selectedIds.length === 0}
                className="flex items-center justify-center w-full gap-3 py-5 text-sm font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/20"
              >
                {!isProcessingCheckout ? (
                  t("btn_checkout", { count: selectedIds.length.toString() })
                ) : (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"></div>
                    {t("cart_processing")}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
