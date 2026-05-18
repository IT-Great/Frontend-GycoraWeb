/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../context/CartContext";

// export default function Header() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);

//   const { cartItems, cartTotalItems, cartSubtotal, isCartOpen, setIsCartOpen, fetchCart } = useCart();

//   useEffect(() => {
//     const token = localStorage.getItem("user_token");
//     const storedUser = localStorage.getItem("user_data");
//     if (token && storedUser) {
//       // eslint-disable-next-line react-hooks/set-state-in-effect
//       setUserData(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Keluar?", icon: "warning", showCancelButton: true, confirmButtonColor: "#059669", cancelButtonColor: "#d33", confirmButtonText: "Ya, Keluar"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("user_token");
//         localStorage.removeItem("user_data");
//         setUserData(null);
//         navigate("/");
//         Swal.fire({ title: "Berhasil Keluar", icon: "success", timer: 1500, showConfirmButton: false });
//       }
//     });
//   };

//   const handleRemoveItem = async (id: number) => {
//     // Nanti sesuaikan URL API dengan Laravel (misal port 8000)
//     const token = localStorage.getItem("user_token");
//     await fetch(`http://localhost:8000/api/carts/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
//     fetchCart();
//   };

//   const handleUpdateQty = async (id: number, newQty: number) => {
//     if (newQty < 1) return;
//     const token = localStorage.getItem("user_token");
//     const res = await fetch(`http://localhost:8000/api/carts/${id}`, {
//       method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ quantity: newQty }),
//     });
//     if (!res.ok) Swal.fire("Peringatan", "Stok tidak mencukupi", "warning");
//     fetchCart();
//   };

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
//   };

//   return (
//     <>
//       <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
//         <div className="flex items-center justify-between h-20 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex items-center flex-1"></div>

//           <div className="flex items-center justify-center flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
//             <span className="text-4xl italic font-extrabold tracking-tighter text-gycora">
//               Gycora<span className="text-xs align-top super">®</span>
//             </span>
//           </div>

//           <div className="flex items-center justify-end flex-1 gap-5">
//             {userData ? (
//               <div className="flex items-center gap-4">
//                 <Link to="/profile" className="flex items-center gap-2 cursor-pointer group">
//                   <div className="flex items-center justify-center w-8 h-8 text-sm font-bold transition-colors rounded-full bg-gycora-light text-gycora-dark group-hover:bg-gycora group-hover:text-white">
//                     {userData.first_name.charAt(0)}
//                   </div>
//                   <span className="hidden text-sm font-semibold text-gray-800 transition-colors md:block group-hover:text-gycora">
//                     Hi, {userData.first_name}
//                   </span>
//                 </Link>
//                 <div className="hidden w-px h-5 bg-gray-300 md:block"></div>
//                 <button onClick={handleLogout} className="text-sm font-medium text-gray-500 transition-colors hover:text-red-600">Logout</button>
//               </div>
//             ) : (
//               <Link to="/login" className="text-gray-600 transition-colors hover:text-gycora">Login</Link>
//             )}

//             {/* <button onClick={() => setIsCartOpen(true)} className="relative text-gray-600 transition-colors hover:text-gycora">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
//               {cartTotalItems > 0 && (
//                 <span className="absolute -top-1.5 -right-1.5 bg-gycora text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
//                   {cartTotalItems}
//                 </span>
//               )}
//             </button> */}
//             {/* UBAH BARIS INI */}
//             <button onClick={() => navigate("/cart")} className="relative text-gray-600 transition-colors hover:text-gycora">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
//               {cartTotalItems > 0 && (
//                 <span className="absolute -top-1.5 -right-1.5 bg-gycora text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
//                   {cartTotalItems}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>
//         <div className="hidden px-4 mx-auto border-t border-gray-100 max-w-7xl sm:px-6 lg:px-8 md:block">
//           <nav className="flex items-center justify-center h-12 space-x-10 text-sm font-semibold text-gray-700">
//              {/* --- TAUTAN BARU: Home --- */}
//              <Link to="/" className="transition-colors hover:text-gycora">Home</Link>

//              {/* Tautan Lama: Shop All */}
//              <Link to="/products" className="transition-colors hover:text-gycora">Shop All</Link>

//              {/* --- TAUTAN BARU: Order --- */}
//              {/* Asumsi: Halaman riwayat pesanan/order diletakkan di rute /orders */}
//              <Link to="/orders" className="transition-colors hover:text-gycora">Order</Link>
//           </nav>
//         </div>
//       </header>

//       {/* SLIDE-OUT CART */}
//       <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
//         <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
//         <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-500 ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
//           <div className="flex items-center justify-between p-6 border-b border-gray-100">
//             <h2 className="text-xl font-extrabold text-gray-900">Keranjang Belanja</h2>
//             <button onClick={() => setIsCartOpen(false)} className="p-2 text-gray-400 transition-colors hover:text-gray-900">Close</button>
//           </div>

//           <div className="flex-1 p-6 space-y-6 overflow-y-auto">
//             {cartItems.length === 0 ? (
//               <p className="mt-10 text-center text-gray-500">Keranjang Anda masih kosong.</p>
//             ) : (
//               cartItems.map((item) => (
//                 <div key={item.id} className="flex gap-4 pb-4 border-b">
//                   <img src={item.product.image_url} alt={item.product.name} className="object-cover w-16 h-16 rounded" />
//                   <div className="flex-1">
//                     <p className="text-sm font-bold">{item.product.name}</p>
//                     <p className="text-sm font-bold text-gycora">{formatRupiah(item.product.price)}</p>
//                     <div className="flex gap-2 mt-2">
//                        <button onClick={() => handleUpdateQty(item.id, item.quantity - 1)}>-</button>
//                        <span>{item.quantity}</span>
//                        <button onClick={() => handleUpdateQty(item.id, item.quantity + 1)}>+</button>
//                        <button onClick={() => handleRemoveItem(item.id)} className="ml-auto text-xs text-red-500">Hapus</button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           {cartItems.length > 0 && (
//             <div className="p-6 border-t border-gray-100 bg-gray-50">
//               <div className="flex justify-between mb-4 font-bold">
//                 <p>Subtotal</p><p>{formatRupiah(cartSubtotal)}</p>
//               </div>
//               <button onClick={() => { setIsCartOpen(false); navigate("/checkout"); }} className="w-full py-3 font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-800">
//                 Lanjut ke Checkout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../context/CartContext";

// export default function Header() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);

//   const { cartItems, cartTotalItems, cartSubtotal, isCartOpen, setIsCartOpen, fetchCart } = useCart();

//   useEffect(() => {
//     const token = localStorage.getItem("user_token");
//     const storedUser = localStorage.getItem("user_data");
//     if (token && storedUser) {
//       // eslint-disable-next-line react-hooks/set-state-in-effect
//       setUserData(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Keluar?", icon: "warning", showCancelButton: true, confirmButtonColor: "#059669", cancelButtonColor: "#d33", confirmButtonText: "Ya, Keluar"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("user_token");
//         localStorage.removeItem("user_data");
//         setUserData(null);
//         navigate("/");
//         Swal.fire({ title: "Berhasil Keluar", icon: "success", timer: 1500, showConfirmButton: false });
//       }
//     });
//   };

//   const handleRemoveItem = async (id: number) => {
//     // Nanti sesuaikan URL API dengan Laravel (misal port 8000)
//     const token = localStorage.getItem("user_token");
//     await fetch(`http://localhost:8000/api/carts/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
//     fetchCart();
//   };

//   const handleUpdateQty = async (id: number, newQty: number) => {
//     if (newQty < 1) return;
//     const token = localStorage.getItem("user_token");
//     const res = await fetch(`http://localhost:8000/api/carts/${id}`, {
//       method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ quantity: newQty }),
//     });
//     if (!res.ok) Swal.fire("Peringatan", "Stok tidak mencukupi", "warning");
//     fetchCart();
//   };

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
//   };

//   // --- FUNGSI BARU UNTUK CEK LOGIN SEBELUM KE HALAMAN ORDER ---
//   const handleOrderNavigation = () => {
//     const token = localStorage.getItem("user_token");

//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk melihat riwayat pesanan.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#059669",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Ke Halaman Login",
//         cancelButtonText: "Batal"
//       }).then((result) => {
//         if (result.isConfirmed) {
//           navigate("/login");
//         }
//       });
//     } else {
//       navigate("/orders");
//     }
//   };

//   return (
//     <>
//       <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
//         <div className="flex items-center justify-between h-20 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex items-center flex-1"></div>

//           <div className="flex items-center justify-center flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
//             <span className="text-4xl italic font-extrabold tracking-tighter text-gycora">
//               Gycora<span className="text-xs align-top super">®</span>
//             </span>
//           </div>

//           <div className="flex items-center justify-end flex-1 gap-5">
//             {userData ? (
//               <div className="flex items-center gap-4">
//                 <Link to="/profile" className="flex items-center gap-2 cursor-pointer group">
//                   <div className="flex items-center justify-center w-8 h-8 text-sm font-bold transition-colors rounded-full bg-gycora-light text-gycora-dark group-hover:bg-gycora group-hover:text-white">
//                     {userData.first_name.charAt(0)}
//                   </div>
//                   <span className="hidden text-sm font-semibold text-gray-800 transition-colors md:block group-hover:text-gycora">
//                     Hi, {userData.first_name}
//                   </span>
//                 </Link>
//                 <div className="hidden w-px h-5 bg-gray-300 md:block"></div>
//                 <button onClick={handleLogout} className="text-sm font-medium text-gray-500 transition-colors hover:text-red-600">Logout</button>
//               </div>
//             ) : (
//               <Link to="/login" className="text-gray-600 transition-colors hover:text-gycora">Login</Link>
//             )}

//             <button onClick={() => navigate("/cart")} className="relative text-gray-600 transition-colors hover:text-gycora">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
//               {cartTotalItems > 0 && (
//                 <span className="absolute -top-1.5 -right-1.5 bg-gycora text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
//                   {cartTotalItems}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>

//         <div className="hidden px-4 mx-auto border-t border-gray-100 max-w-7xl sm:px-6 lg:px-8 md:block">
//           <nav className="flex items-center justify-center h-12 space-x-10 text-sm font-semibold text-gray-700">
//              <Link to="/" className="transition-colors hover:text-gycora">Home</Link>
//              <Link to="/products" className="transition-colors hover:text-gycora">Shop All</Link>

//              {/* --- TAUTAN ORDER YANG SUDAH DIPERBARUI --- */}
//              <button onClick={handleOrderNavigation} className="font-semibold transition-colors hover:text-gycora">
//                Order
//              </button>
//           </nav>
//         </div>
//       </header>

//       {/* SLIDE-OUT CART */}
//       <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
//         <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
//         <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-500 ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
//           <div className="flex items-center justify-between p-6 border-b border-gray-100">
//             <h2 className="text-xl font-extrabold text-gray-900">Keranjang Belanja</h2>
//             <button onClick={() => setIsCartOpen(false)} className="p-2 text-gray-400 transition-colors hover:text-gray-900">Close</button>
//           </div>

//           <div className="flex-1 p-6 space-y-6 overflow-y-auto">
//             {cartItems.length === 0 ? (
//               <p className="mt-10 text-center text-gray-500">Keranjang Anda masih kosong.</p>
//             ) : (
//               cartItems.map((item) => (
//                 <div key={item.id} className="flex gap-4 pb-4 border-b">
//                   <img src={item.product.image_url} alt={item.product.name} className="object-cover w-16 h-16 rounded" />
//                   <div className="flex-1">
//                     <p className="text-sm font-bold">{item.product.name}</p>
//                     <p className="text-sm font-bold text-gycora">{formatRupiah(item.product.price)}</p>
//                     <div className="flex gap-2 mt-2">
//                        <button onClick={() => handleUpdateQty(item.id, item.quantity - 1)}>-</button>
//                        <span>{item.quantity}</span>
//                        <button onClick={() => handleUpdateQty(item.id, item.quantity + 1)}>+</button>
//                        <button onClick={() => handleRemoveItem(item.id)} className="ml-auto text-xs text-red-500">Hapus</button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           {cartItems.length > 0 && (
//             <div className="p-6 border-t border-gray-100 bg-gray-50">
//               <div className="flex justify-between mb-4 font-bold">
//                 <p>Subtotal</p><p>{formatRupiah(cartSubtotal)}</p>
//               </div>
//               <button onClick={() => { setIsCartOpen(false); navigate("/checkout"); }} className="w-full py-3 font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-800">
//                 Lanjut ke Checkout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../context/CartContext";
// import logoGycora from "../assets/gycora_logo.png"; // <-- Import Logo Gycora

// export default function Header() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);

//   // const { cartItems, cartTotalItems, cartSubtotal, isCartOpen, setIsCartOpen, fetchCart } = useCart();
//   const { cartTotalItems } = useCart();

//   useEffect(() => {
//     const token = localStorage.getItem("user_token");
//     const storedUser = localStorage.getItem("user_data");
//     if (token && storedUser) {
//       // eslint-disable-next-line react-hooks/set-state-in-effect
//       setUserData(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Keluar?", icon: "warning", showCancelButton: true, confirmButtonColor: "#059669", cancelButtonColor: "#d33", confirmButtonText: "Ya, Keluar"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("user_token");
//         localStorage.removeItem("user_data");
//         setUserData(null);
//         navigate("/");
//         Swal.fire({ title: "Berhasil Keluar", icon: "success", timer: 1500, showConfirmButton: false });
//       }
//     });
//   };

//   // const handleRemoveItem = async (id: number) => {
//   //   // Nanti sesuaikan URL API dengan Laravel (misal port 8000)
//   //   const token = localStorage.getItem("user_token");
//   //   await fetch(`http://localhost:8000/api/carts/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
//   //   fetchCart();
//   // };

//   // const handleUpdateQty = async (id: number, newQty: number) => {
//   //   if (newQty < 1) return;
//   //   const token = localStorage.getItem("user_token");
//   //   const res = await fetch(`http://localhost:8000/api/carts/${id}`, {
//   //     method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ quantity: newQty }),
//   //   });
//   //   if (!res.ok) Swal.fire("Peringatan", "Stok tidak mencukupi", "warning");
//   //   fetchCart();
//   // };

//   // const formatRupiah = (angka: number) => {
//   //   return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
//   // };

//   // --- FUNGSI BARU UNTUK CEK LOGIN SEBELUM KE HALAMAN ORDER ---
//   // const handleOrderNavigation = () => {
//   //   const token = localStorage.getItem("user_token");

//   //   if (!token) {
//   //     Swal.fire({
//   //       title: "Login Diperlukan",
//   //       text: "Silakan masuk ke akun Anda untuk melihat riwayat pesanan.",
//   //       icon: "info",
//   //       showCancelButton: true,
//   //       confirmButtonColor: "#059669",
//   //       cancelButtonColor: "#d33",
//   //       confirmButtonText: "Ke Halaman Login",
//   //       cancelButtonText: "Batal"
//   //     }).then((result) => {
//   //       if (result.isConfirmed) {
//   //         navigate("/login");
//   //       }
//   //     });
//   //   } else {
//   //     navigate("/orders");
//   //   }
//   // };

//   return (
//     <>
//       <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
//         <div className="flex items-center justify-between h-20 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex items-center flex-1"></div>

//           {/* MENGGANTI TEKS DENGAN LOGO GAMBAR */}
//           <div className="flex items-center justify-center flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
//             <img
//               src={logoGycora}
//               alt="Gycora Logo"
//               className="object-contain h-8 md:h-10"
//             />
//           </div>

//           <div className="flex items-center justify-end flex-1 gap-5">
//             {userData ? (
//               <div className="flex items-center gap-4">
//                 <Link to="/profile" className="flex items-center gap-2 cursor-pointer group">
//                   <div className="flex items-center justify-center w-8 h-8 text-sm font-bold transition-colors rounded-full bg-gycora-light text-gycora-dark group-hover:bg-gycora group-hover:text-white">
//                     {userData.first_name.charAt(0)}
//                   </div>
//                   <span className="hidden text-sm font-semibold text-gray-800 transition-colors md:block group-hover:text-gycora">
//                     Hi, {userData.first_name}
//                   </span>
//                 </Link>
//                 <div className="hidden w-px h-5 bg-gray-300 md:block"></div>
//                 <button onClick={handleLogout} className="text-sm font-medium text-gray-500 transition-colors hover:text-red-600">Logout</button>
//               </div>
//             ) : (
//               <Link to="/login" className="text-gray-600 transition-colors hover:text-gycora">Login</Link>
//             )}

//             <button onClick={() => navigate("/cart")} className="relative text-gray-600 transition-colors hover:text-gycora">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
//               {cartTotalItems > 0 && (
//                 <span className="absolute -top-1.5 -right-1.5 bg-gycora text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
//                   {cartTotalItems}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>

//         <div className="hidden px-4 mx-auto border-t border-gray-100 max-w-7xl sm:px-6 lg:px-8 md:block">
//           <nav className="flex items-center justify-center h-12 space-x-10 text-sm font-semibold text-gray-700">
//              <Link to="/" className="transition-colors hover:text-gycora">Home</Link>
//              <Link to="/products" className="transition-colors hover:text-gycora">Shop All</Link>
//              <Link to="/consult" className="transition-colors hover:text-gycora">Consult With Us</Link>

//              {/* --- TAUTAN ORDER YANG SUDAH DIPERBARUI --- */}
//              {/* <button onClick={handleOrderNavigation} className="font-semibold transition-colors hover:text-gycora">
//                Order
//              </button> */}
//           </nav>
//         </div>
//       </header>

//       {/* SLIDE-OUT CART */}
//       {/* <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
//         <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
//         <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-500 ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
//           <div className="flex items-center justify-between p-6 border-b border-gray-100">
//             <h2 className="text-xl font-extrabold text-gray-900">Keranjang Belanja</h2>
//             <button onClick={() => setIsCartOpen(false)} className="p-2 text-gray-400 transition-colors hover:text-gray-900">Close</button>
//           </div>

//           <div className="flex-1 p-6 space-y-6 overflow-y-auto">
//             {cartItems.length === 0 ? (
//               <p className="mt-10 text-center text-gray-500">Keranjang Anda masih kosong.</p>
//             ) : (
//               cartItems.map((item) => (
//                 <div key={item.id} className="flex gap-4 pb-4 border-b">
//                   <img src={item.product.image_url} alt={item.product.name} className="object-cover w-16 h-16 rounded" />
//                   <div className="flex-1">
//                     <p className="text-sm font-bold">{item.product.name}</p>
//                     {item.color && (
//                       <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">
//                         Warna: {item.color}
//                       </p>
//                     )}
//                     <p className="text-sm font-bold text-gycora mt-0.5">{formatRupiah(item.product.price)}</p>
//                     <div className="flex gap-2 mt-2">
//                        <button onClick={() => handleUpdateQty(item.id, item.quantity - 1)}>-</button>
//                        <span>{item.quantity}</span>
//                        <button onClick={() => handleUpdateQty(item.id, item.quantity + 1)}>+</button>
//                        <button onClick={() => handleRemoveItem(item.id)} className="ml-auto text-xs text-red-500">Hapus</button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           {cartItems.length > 0 && (
//             <div className="p-6 border-t border-gray-100 bg-gray-50">
//               <div className="flex justify-between mb-4 font-bold">
//                 <p>Subtotal</p><p>{formatRupiah(cartSubtotal)}</p>
//               </div>
//               <button onClick={() => { setIsCartOpen(false); navigate("/checkout"); }} className="w-full py-3 font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-800">
//                 Lanjut ke Checkout
//               </button>
//             </div>
//           )}
//         </div>
//       </div> */}
//     </>
//   );
// }

// import { useEffect, useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../context/CartContext";
// import logoGycora from "../assets/gycora_logo.png";
// import { BASE_URL } from "../config/api"; // Pastikan path ini benar

// export default function Header() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
//   const { cartTotalItems } = useCart();

//   // --- STATE UNTUK GLOBAL SEARCH MODAL ---
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [timeFilter, setTimeFilter] = useState("all"); // 'all', '7d', '30d', '90d'
//   const [isSearching, setIsSearching] = useState(false);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [searchResults, setSearchResults] = useState<any>({ products: [], transactions: [], carts: [] });

//   // Ref untuk debounce timer
//   // const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     const token = localStorage.getItem("user_token");
//     const storedUser = localStorage.getItem("user_data");
//     if (token && storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Keluar?", icon: "warning", showCancelButton: true, confirmButtonColor: "#059669", cancelButtonColor: "#d33", confirmButtonText: "Ya, Keluar"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("user_token");
//         localStorage.removeItem("user_data");
//         setUserData(null);
//         navigate("/");
//         Swal.fire({ title: "Berhasil Keluar", icon: "success", timer: 1500, showConfirmButton: false });
//       }
//     });
//   };

//   const handleOrderNavigation = () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk melihat riwayat pesanan.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#059669",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Ke Halaman Login",
//         cancelButtonText: "Batal"
//       }).then((result) => {
//         if (result.isConfirmed) {
//           navigate("/login");
//         }
//       });
//     } else {
//       navigate("/orders");
//     }
//   };

//   // --- EFEK PENCARIAN DENGAN DEBOUNCE ---
//   useEffect(() => {
//     if (!isSearchOpen) return;

//     if (searchQuery.trim().length === 0) {
//       setSearchResults({ products: [], transactions: [], carts: [] });
//       setIsSearching(false);
//       return;
//     }

//     setIsSearching(true);

//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }

//     // Debounce 500ms agar tidak spam request ke server
//     searchTimeoutRef.current = setTimeout(async () => {
//       try {
//         const token = localStorage.getItem("user_token");
//         // Panggilan ke backend agregator (Pastikan Anda membuat endpoint ini di Laravel!)
//         const res = await fetch(`${BASE_URL}/api/search?q=${encodeURIComponent(searchQuery)}&time=${timeFilter}`, {
//           headers: {
//             "Accept": "application/json",
//             ...(token && { "Authorization": `Bearer ${token}` })
//           }
//         });

//         if (res.ok) {
//           const data = await res.json();
//           // Asumsi struktur response: { products: [...], transactions: [...], carts: [...] }
//           setSearchResults(data);
//         } else {
//           setSearchResults({ products: [], transactions: [], carts: [] });
//         }
//       } catch (error) {
//         console.error("Global search error:", error);
//         setSearchResults({ products: [], transactions: [], carts: [] });
//       } finally {
//         setIsSearching(false);
//       }
//     }, 500);

//     return () => {
//       if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
//     };
//   }, [searchQuery, timeFilter, isSearchOpen]);

//   const closeSearchModal = () => {
//     setIsSearchOpen(false);
//     setSearchQuery("");
//     setSearchResults({ products: [], transactions: [], carts: [] });
//   };

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka || 0);
//   };

//   return (
//     <>
//       <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
//         <div className="flex items-center justify-between h-20 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex items-center flex-1"></div>

//           {/* LOGO */}
//           <div className="flex items-center justify-center flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
//             <img
//               src={logoGycora}
//               alt="Gycora Logo"
//               className="object-contain h-8 md:h-10"
//             />
//           </div>

//           <div className="flex items-center justify-end flex-1 gap-4 md:gap-5">
//             {userData ? (
//               <div className="flex items-center gap-4">
//                 <Link to="/profile" className="flex items-center gap-2 cursor-pointer group">
//                   <div className="flex items-center justify-center w-8 h-8 text-sm font-bold transition-colors rounded-full bg-gycora-light text-gycora-dark group-hover:bg-gycora group-hover:text-white">
//                     {userData.first_name.charAt(0)}
//                   </div>
//                   <span className="hidden text-sm font-semibold text-gray-800 transition-colors md:block group-hover:text-gycora">
//                     Hi, {userData.first_name}
//                   </span>
//                 </Link>
//                 <div className="hidden w-px h-5 bg-gray-300 md:block"></div>
//                 <button onClick={handleLogout} className="hidden text-sm font-medium text-gray-500 transition-colors md:block hover:text-red-600">Logout</button>
//               </div>
//             ) : (
//               <Link to="/login" className="text-sm font-medium text-gray-600 transition-colors hover:text-gycora">Login</Link>
//             )}

//             {/* IKON PENCARIAN (GLOBAL SEARCH) */}
//             <button onClick={() => setIsSearchOpen(true)} className="relative p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora">
//               <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </button>

//             {/* IKON KERANJANG */}
//             <button onClick={() => navigate("/cart")} className="relative p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora">
//               <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
//               </svg>
//               {cartTotalItems > 0 && (
//                 <span className="absolute top-0 right-0 bg-gycora text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1">
//                   {cartTotalItems}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>

//         <div className="hidden px-4 mx-auto border-t border-gray-100 max-w-7xl sm:px-6 lg:px-8 md:block">
//           <nav className="flex items-center justify-center h-12 space-x-10 text-sm font-semibold text-gray-700">
//              <Link to="/" className="transition-colors hover:text-gycora">Home</Link>
//              <Link to="/products" className="transition-colors hover:text-gycora">Shop All</Link>
//              <Link to="/consult" className="transition-colors hover:text-gycora">Consult With Us</Link>
//              <button onClick={handleOrderNavigation} className="font-semibold transition-colors hover:text-gycora">
//                Order
//              </button>
//           </nav>
//         </div>
//       </header>

//       {/* =====================================================================
//           GLOBAL SEARCH MODAL
//       ===================================================================== */}
//       {isSearchOpen && (
//         <div className="fixed inset-0 z-[100] flex justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
//           {/* Area luar klik untuk menutup modal */}
//           <div className="absolute inset-0" onClick={closeSearchModal}></div>

//           <div className="relative flex flex-col w-full max-w-3xl mt-16 md:mt-24 overflow-hidden bg-white shadow-2xl h-[85vh] md:h-[75vh] rounded-t-3xl md:rounded-3xl animate-fade-in-up">

//             {/* Header Pencarian */}
//             <div className="flex flex-col p-4 border-b border-gray-100 md:p-6 bg-gray-50/50">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-bold text-gray-900">Pencarian Universal</h2>
//                 <button onClick={closeSearchModal} className="p-1 text-gray-400 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:text-gray-900 hover:bg-gray-100">
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//                 </button>
//               </div>

//               {/* Input Pencarian */}
//               <div className="relative">
//                 <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Cari produk, No. Pesanan (INV-...), atau status..."
//                   className="w-full py-3 pl-12 pr-4 text-sm font-medium transition-all bg-white border border-gray-300 shadow-sm outline-none rounded-xl focus:ring-2 focus:ring-gycora focus:border-transparent"
//                   autoFocus
//                 />
//               </div>

//               {/* Filter Waktu (Pills) */}
//               <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
//                 {[
//                   { id: 'all', label: 'Semua Waktu' },
//                   { id: '7d', label: '7 Hari Terakhir' },
//                   { id: '30d', label: '30 Hari Terakhir' },
//                   { id: '90d', label: '3 Bulan Terakhir' },
//                 ].map((filter) => (
//                   <button
//                     key={filter.id}
//                     onClick={() => setTimeFilter(filter.id)}
//                     className={`shrink-0 px-4 py-1.5 text-xs font-bold rounded-full transition-all border ${timeFilter === filter.id ? 'bg-gycora text-white border-gycora shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-100'}`}
//                   >
//                     {filter.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Area Hasil Pencarian */}
//             <div className="flex-1 p-4 overflow-y-auto bg-white md:p-6 custom-scrollbar">
//               {searchQuery.trim().length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
//                   <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <p className="text-sm font-medium">Ketik kata kunci untuk memulai pencarian.</p>
//                 </div>
//               ) : isSearching ? (
//                 <div className="flex flex-col items-center justify-center h-full gap-3 text-gycora">
//                   <div className="w-8 h-8 border-4 rounded-full border-emerald-100 border-t-gycora animate-spin"></div>
//                   <p className="text-xs font-bold tracking-widest uppercase animate-pulse">Mencari data...</p>
//                 </div>
//               ) : (
//                 <div className="space-y-8 animate-fade-in">

//                   {/* --- HASIL PRODUK --- */}
//                   {searchResults.products && searchResults.products.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">Produk Katalog</h3>
//                       <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
//                         {searchResults.products.map((product: any) => (
//                           <div
//                             key={`prod-${product.id}`}
//                             onClick={() => { closeSearchModal(); navigate(`/product/${product.id}`); }}
//                             className="flex items-center gap-3 p-3 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
//                           >
//                             <img src={product.image_url} alt={product.name} className="object-cover w-12 h-12 rounded-lg bg-gray-50 shrink-0" />
//                             <div className="flex-1 min-w-0">
//                               <p className="text-sm font-bold text-gray-900 truncate group-hover:text-gycora">{product.name}</p>
//                               <p className="text-xs text-gray-500 font-mono mt-0.5">{product.sku}</p>
//                             </div>
//                             <span className="text-sm font-black text-gycora shrink-0">{formatRupiah(product.price)}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* --- HASIL TRANSAKSI (ORDER) --- */}
//                   {searchResults.transactions && searchResults.transactions.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">Riwayat Transaksi</h3>
//                       <div className="flex flex-col gap-3">
//                         {searchResults.transactions.map((trx: any) => (
//                           <div
//                             key={`trx-${trx.id}`}
//                             onClick={() => { closeSearchModal(); navigate(`/orders`); }}
//                             className="flex items-center justify-between p-4 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
//                           >
//                             <div className="flex items-center gap-4">
//                               <div className="flex items-center justify-center w-10 h-10 text-gray-500 bg-gray-100 rounded-full shadow-sm group-hover:bg-white group-hover:text-gycora">
//                                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
//                               </div>
//                               <div>
//                                 <p className="font-mono text-sm font-bold text-gray-900 group-hover:text-gycora">{trx.order_id}</p>
//                                 <p className="mt-1 text-xs text-gray-500">{new Date(trx.created_at).toLocaleDateString('id-ID')}</p>
//                               </div>
//                             </div>
//                             <div className="text-right">
//                               <p className="text-sm font-black text-gray-900">{formatRupiah(trx.total_amount)}</p>
//                               <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-600">{trx.status}</span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* KOSONG/TIDAK ADA HASIL */}
//                   {!isSearching &&
//                    searchResults.products?.length === 0 &&
//                    searchResults.transactions?.length === 0 &&
//                    searchResults.carts?.length === 0 && (
//                     <div className="flex flex-col items-center justify-center py-10 text-center">
//                       <p className="text-lg font-bold text-gray-900">Oops, tidak ditemukan!</p>
//                       <p className="max-w-sm mt-2 text-sm text-gray-500">Kami tidak dapat menemukan hasil untuk "{searchQuery}" dengan rentang waktu yang Anda pilih.</p>
//                     </div>
//                   )}

//                 </div>
//               )}
//             </div>

//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// import { useEffect, useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../context/CartContext";
// import logoGycora from "../assets/gycora_logo.png";
// import { BASE_URL } from "../config/api";

// export default function Header() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
//   const { cartTotalItems } = useCart();

//   // --- STATE UNTUK DROPDOWN PROFIL ---
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // --- STATE UNTUK GLOBAL SEARCH MODAL ---
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [timeFilter, setTimeFilter] = useState("all");
//   const [isSearching, setIsSearching] = useState(false);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [searchResults, setSearchResults] = useState<any>({ products: [], transactions: [], carts: [] });
//   const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     const token = localStorage.getItem("user_token");
//     const storedUser = localStorage.getItem("user_data");
//     if (token && storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }
//   }, []);

//   // --- EFEK KLIK DI LUAR DROPDOWN ---
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Keluar?", icon: "warning", showCancelButton: true, confirmButtonColor: "#059669", cancelButtonColor: "#d33", confirmButtonText: "Ya, Keluar"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("user_token");
//         localStorage.removeItem("user_data");
//         setUserData(null);
//         navigate("/");
//         Swal.fire({ title: "Berhasil Keluar", icon: "success", timer: 1500, showConfirmButton: false });
//       }
//     });
//   };

//   // --- EFEK PENCARIAN DENGAN DEBOUNCE ---
//   useEffect(() => {
//     if (!isSearchOpen) return;

//     if (searchQuery.trim().length === 0) {
//       setSearchResults({ products: [], transactions: [], carts: [] });
//       setIsSearching(false);
//       return;
//     }

//     setIsSearching(true);

//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }

//     searchTimeoutRef.current = setTimeout(async () => {
//       try {
//         const token = localStorage.getItem("user_token");
//         const res = await fetch(`${BASE_URL}/api/search?q=${encodeURIComponent(searchQuery)}&time=${timeFilter}`, {
//           headers: {
//             "Accept": "application/json",
//             ...(token && { "Authorization": `Bearer ${token}` })
//           }
//         });

//         if (res.ok) {
//           const data = await res.json();
//           setSearchResults(data);
//         } else {
//           setSearchResults({ products: [], transactions: [], carts: [] });
//         }
//       } catch (error) {
//         console.error("Global search error:", error);
//         setSearchResults({ products: [], transactions: [], carts: [] });
//       } finally {
//         setIsSearching(false);
//       }
//     }, 500);

//     return () => {
//       if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
//     };
//   }, [searchQuery, timeFilter, isSearchOpen]);

//   const closeSearchModal = () => {
//     setIsSearchOpen(false);
//     setSearchQuery("");
//     setSearchResults({ products: [], transactions: [], carts: [] });
//   };

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka || 0);
//   };

//   return (
//     <>
//       <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
//         <div className="flex items-center justify-between h-20 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex items-center flex-1"></div>

//           {/* LOGO */}
//           <div className="flex items-center justify-center flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
//             <img
//               src={logoGycora}
//               alt="Gycora Logo"
//               className="object-contain h-8 md:h-10"
//             />
//           </div>

//           <div className="flex items-center justify-end flex-1 gap-4 md:gap-5">
//             {userData ? (
//               // --- AREA DROPDOWN PROFIL BARU ---
//               <div className="relative" ref={dropdownRef}>
//                 <button
//                   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                   className="flex items-center gap-2 cursor-pointer group focus:outline-none"
//                 >
//                   <div className="flex items-center justify-center w-8 h-8 text-sm font-bold transition-colors rounded-full bg-gycora-light text-gycora-dark group-hover:bg-gycora group-hover:text-white">
//                     {userData.first_name.charAt(0)}
//                   </div>
//                   <span className="hidden text-sm font-semibold text-gray-800 transition-colors md:block group-hover:text-gycora">
//                     Hi, {userData.first_name}
//                   </span>
//                   <svg className={`hidden md:block w-4 h-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>

//                 {/* Modal Dropdown */}
//                 {isDropdownOpen && (
//                   <div className="absolute right-0 w-48 py-2 mt-3 bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] animate-fade-in-up origin-top-right">
//                     <Link
//                       to="/profile"
//                       onClick={() => setIsDropdownOpen(false)}
//                       className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gycora"
//                     >
//                       <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
//                       Profil Saya
//                     </Link>
//                     <Link
//                       to="/orders"
//                       onClick={() => setIsDropdownOpen(false)}
//                       className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gycora"
//                     >
//                       <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
//                       Pesanan Saya
//                     </Link>
//                     <div className="my-1 border-t border-gray-100"></div>
//                     <button
//                       onClick={() => {
//                         setIsDropdownOpen(false);
//                         handleLogout();
//                       }}
//                       className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
//                     >
//                       <svg className="w-4 h-4 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
//                       Keluar
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link to="/login" className="text-sm font-medium text-gray-600 transition-colors hover:text-gycora">Login</Link>
//             )}

//             {/* IKON PENCARIAN (GLOBAL SEARCH) */}
//             <button onClick={() => setIsSearchOpen(true)} className="relative p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora">
//               <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </button>

//             {/* IKON KERANJANG */}
//             <button onClick={() => navigate("/cart")} className="relative p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora">
//               <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
//               </svg>
//               {cartTotalItems > 0 && (
//                 <span className="absolute top-0 right-0 bg-gycora text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1">
//                   {cartTotalItems}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>

//         <div className="hidden px-4 mx-auto border-t border-gray-100 max-w-7xl sm:px-6 lg:px-8 md:block">
//           <nav className="flex items-center justify-center h-12 space-x-10 text-sm font-semibold text-gray-700">
//              <Link to="/" className="transition-colors hover:text-gycora">Home</Link>
//              <Link to="/products" className="transition-colors hover:text-gycora">Shop All</Link>
//              <Link to="/consult" className="transition-colors hover:text-gycora">Consult With Us</Link>
//              {/* Tautan Order sudah dihapus dari sini */}
//           </nav>
//         </div>
//       </header>

//       {/* =====================================================================
//           GLOBAL SEARCH MODAL
//       ===================================================================== */}
//       {isSearchOpen && (
//         <div className="fixed inset-0 z-[100] flex justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
//           {/* Area luar klik untuk menutup modal */}
//           <div className="absolute inset-0" onClick={closeSearchModal}></div>

//           <div className="relative flex flex-col w-full max-w-3xl mt-16 md:mt-24 overflow-hidden bg-white shadow-2xl h-[85vh] md:h-[75vh] rounded-t-3xl md:rounded-3xl animate-fade-in-up">

//             {/* Header Pencarian */}
//             <div className="flex flex-col p-4 border-b border-gray-100 md:p-6 bg-gray-50/50">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-bold text-gray-900">Pencarian Universal</h2>
//                 <button onClick={closeSearchModal} className="p-1 text-gray-400 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:text-gray-900 hover:bg-gray-100">
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//                 </button>
//               </div>

//               {/* Input Pencarian */}
//               <div className="relative">
//                 <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Cari produk, No. Pesanan (INV-...), atau status..."
//                   className="w-full py-3 pl-12 pr-4 text-sm font-medium transition-all bg-white border border-gray-300 shadow-sm outline-none rounded-xl focus:ring-2 focus:ring-gycora focus:border-transparent"
//                   autoFocus
//                 />
//               </div>

//               {/* Filter Waktu (Pills) */}
//               <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
//                 {[
//                   { id: 'all', label: 'Semua Waktu' },
//                   { id: '7d', label: '7 Hari Terakhir' },
//                   { id: '30d', label: '30 Hari Terakhir' },
//                   { id: '90d', label: '3 Bulan Terakhir' },
//                 ].map((filter) => (
//                   <button
//                     key={filter.id}
//                     onClick={() => setTimeFilter(filter.id)}
//                     className={`shrink-0 px-4 py-1.5 text-xs font-bold rounded-full transition-all border ${timeFilter === filter.id ? 'bg-gycora text-white border-gycora shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-100'}`}
//                   >
//                     {filter.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Area Hasil Pencarian */}
//             <div className="flex-1 p-4 overflow-y-auto bg-white md:p-6 custom-scrollbar">
//               {searchQuery.trim().length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
//                   <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <p className="text-sm font-medium">Ketik kata kunci untuk memulai pencarian.</p>
//                 </div>
//               ) : isSearching ? (
//                 <div className="flex flex-col items-center justify-center h-full gap-3 text-gycora">
//                   <div className="w-8 h-8 border-4 rounded-full border-emerald-100 border-t-gycora animate-spin"></div>
//                   <p className="text-xs font-bold tracking-widest uppercase animate-pulse">Mencari data...</p>
//                 </div>
//               ) : (
//                 <div className="space-y-8 animate-fade-in">

//                   {/* --- HASIL PRODUK --- */}
//                   {searchResults.products && searchResults.products.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">Produk Katalog</h3>
//                       <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
//                         {searchResults.products.map((product: any) => (
//                           <div
//                             key={`prod-${product.id}`}
//                             onClick={() => { closeSearchModal(); navigate(`/product/${product.id}`); }}
//                             className="flex items-center gap-3 p-3 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
//                           >
//                             <img src={product.image_url} alt={product.name} className="object-cover w-12 h-12 rounded-lg bg-gray-50 shrink-0" />
//                             <div className="flex-1 min-w-0">
//                               <p className="text-sm font-bold text-gray-900 truncate group-hover:text-gycora">{product.name}</p>
//                               <p className="text-xs text-gray-500 font-mono mt-0.5">{product.sku}</p>
//                             </div>
//                             <span className="text-sm font-black text-gycora shrink-0">{formatRupiah(product.price)}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* --- HASIL TRANSAKSI (ORDER) --- */}
//                   {searchResults.transactions && searchResults.transactions.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">Riwayat Transaksi</h3>
//                       <div className="flex flex-col gap-3">
//                         {searchResults.transactions.map((trx: any) => (
//                           <div
//                             key={`trx-${trx.id}`}
//                             onClick={() => { closeSearchModal(); navigate(`/orders`); }}
//                             className="flex items-center justify-between p-4 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
//                           >
//                             <div className="flex items-center gap-4">
//                               <div className="flex items-center justify-center w-10 h-10 text-gray-500 bg-gray-100 rounded-full shadow-sm group-hover:bg-white group-hover:text-gycora">
//                                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
//                               </div>
//                               <div>
//                                 <p className="font-mono text-sm font-bold text-gray-900 group-hover:text-gycora">{trx.order_id}</p>
//                                 <p className="mt-1 text-xs text-gray-500">{new Date(trx.created_at).toLocaleDateString('id-ID')}</p>
//                               </div>
//                             </div>
//                             <div className="text-right">
//                               <p className="text-sm font-black text-gray-900">{formatRupiah(trx.total_amount)}</p>
//                               <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-600">{trx.status}</span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* KOSONG/TIDAK ADA HASIL */}
//                   {!isSearching &&
//                    searchResults.products?.length === 0 &&
//                    searchResults.transactions?.length === 0 &&
//                    searchResults.carts?.length === 0 && (
//                     <div className="flex flex-col items-center justify-center py-10 text-center">
//                       <p className="text-lg font-bold text-gray-900">Oops, tidak ditemukan!</p>
//                       <p className="max-w-sm mt-2 text-sm text-gray-500">Kami tidak dapat menemukan hasil untuk "{searchQuery}" dengan rentang waktu yang Anda pilih.</p>
//                     </div>
//                   )}

//                 </div>
//               )}
//             </div>

//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// import { useEffect, useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../context/CartContext";
// import logoGycora from "../assets/gycora_logo.png";
// import { BASE_URL } from "../config/api";

// export default function Header() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
//   const { cartTotalItems } = useCart();

//   // --- STATE UNTUK DROPDOWN PROFIL ---
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // --- STATE UNTUK GLOBAL SEARCH MODAL ---
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [timeFilter, setTimeFilter] = useState("all");
//   const [isSearching, setIsSearching] = useState(false);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [searchResults, setSearchResults] = useState<any>({ products: [], transactions: [], carts: [] });
//   const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     const token = localStorage.getItem("user_token");
//     const storedUser = localStorage.getItem("user_data");
//     if (token && storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }
//   }, []);

//   // --- EFEK KLIK DI LUAR DROPDOWN ---
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Keluar?", icon: "warning", showCancelButton: true, confirmButtonColor: "#059669", cancelButtonColor: "#d33", confirmButtonText: "Ya, Keluar"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("user_token");
//         localStorage.removeItem("user_data");
//         setUserData(null);
//         navigate("/");
//         Swal.fire({ title: "Berhasil Keluar", icon: "success", timer: 1500, showConfirmButton: false });
//       }
//     });
//   };

//   // --- EFEK PENCARIAN DENGAN DEBOUNCE ---
//   useEffect(() => {
//     if (!isSearchOpen) return;

//     if (searchQuery.trim().length === 0) {
//       setSearchResults({ products: [], transactions: [], carts: [] });
//       setIsSearching(false);
//       return;
//     }

//     setIsSearching(true);

//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }

//     searchTimeoutRef.current = setTimeout(async () => {
//       try {
//         const token = localStorage.getItem("user_token");
//         const res = await fetch(`${BASE_URL}/api/search?q=${encodeURIComponent(searchQuery)}&time=${timeFilter}`, {
//           headers: {
//             "Accept": "application/json",
//             ...(token && { "Authorization": `Bearer ${token}` })
//           }
//         });

//         if (res.ok) {
//           const data = await res.json();
//           setSearchResults(data);
//         } else {
//           setSearchResults({ products: [], transactions: [], carts: [] });
//         }
//       } catch (error) {
//         console.error("Global search error:", error);
//         setSearchResults({ products: [], transactions: [], carts: [] });
//       } finally {
//         setIsSearching(false);
//       }
//     }, 500);

//     return () => {
//       if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
//     };
//   }, [searchQuery, timeFilter, isSearchOpen]);

//   const closeSearchModal = () => {
//     setIsSearchOpen(false);
//     setSearchQuery("");
//     setSearchResults({ products: [], transactions: [], carts: [] });
//   };

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka || 0);
//   };

//   return (
//     <>
//       <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
//         <div className="flex items-center justify-between h-20 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex items-center flex-1"></div>

//           {/* LOGO */}
//           <div className="flex items-center justify-center flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
//             <img
//               src={logoGycora}
//               alt="Gycora Logo"
//               className="object-contain h-8 md:h-10"
//             />
//           </div>

//           <div className="flex items-center justify-end flex-1 gap-4 md:gap-5">
//             {userData ? (
//               // --- AREA DROPDOWN PROFIL ---
//               <div className="relative" ref={dropdownRef}>
//                 <button
//                   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                   className="flex items-center gap-2 cursor-pointer group focus:outline-none"
//                 >
//                   <div className="flex items-center justify-center w-8 h-8 text-sm font-bold transition-colors rounded-full bg-gycora-light text-gycora-dark group-hover:bg-gycora group-hover:text-white">
//                     {userData.first_name.charAt(0)}
//                   </div>
//                   <span className="hidden text-sm font-semibold text-gray-800 transition-colors md:block group-hover:text-gycora">
//                     Hi, {userData.first_name}
//                   </span>
//                   <svg className={`hidden md:block w-4 h-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>

//                 {/* Modal Dropdown */}
//                 {isDropdownOpen && (
//                   <div className="absolute right-0 w-48 py-2 mt-3 bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] animate-fade-in-up origin-top-right">
//                     <Link
//                       to="/profile"
//                       onClick={() => setIsDropdownOpen(false)}
//                       className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gycora"
//                     >
//                       <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
//                       Profil Saya
//                     </Link>
//                     <Link
//                       to="/orders"
//                       onClick={() => setIsDropdownOpen(false)}
//                       className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gycora"
//                     >
//                       <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
//                       Pesanan Saya
//                     </Link>
//                     <div className="my-1 border-t border-gray-100"></div>
//                     <button
//                       onClick={() => {
//                         setIsDropdownOpen(false);
//                         handleLogout();
//                       }}
//                       className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
//                     >
//                       <svg className="w-4 h-4 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
//                       Keluar
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link to="/login" className="text-sm font-medium text-gray-600 transition-colors hover:text-gycora">Login</Link>
//             )}

//             {/* IKON PENCARIAN (GLOBAL SEARCH) */}
//             <button onClick={() => setIsSearchOpen(true)} className="relative p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora">
//               <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </button>

//             {/* IKON CHAT (HANYA MUNCUL JIKA SUDAH LOGIN) */}
//             {userData && (
//               <button onClick={() => navigate("/chat")} className="relative p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora" title="Chat dengan Pakar">
//                 <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                 </svg>
//               </button>
//             )}

//             {/* IKON KERANJANG */}
//             <button onClick={() => navigate("/cart")} className="relative p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora">
//               <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
//               </svg>
//               {cartTotalItems > 0 && (
//                 <span className="absolute top-0 right-0 bg-gycora text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1">
//                   {cartTotalItems}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>

//         <div className="hidden px-4 mx-auto border-t border-gray-100 max-w-7xl sm:px-6 lg:px-8 md:block">
//           <nav className="flex items-center justify-center h-12 space-x-10 text-sm font-semibold text-gray-700">
//              <Link to="/" className="transition-colors hover:text-gycora">Home</Link>
//              <Link to="/products" className="transition-colors hover:text-gycora">Shop All</Link>
//              <Link to="/consult" className="transition-colors hover:text-gycora">Consult With Us</Link>
//              {/* Tautan Order sudah dihapus dari sini */}
//           </nav>
//         </div>
//       </header>

//       {/* =====================================================================
//           GLOBAL SEARCH MODAL
//       ===================================================================== */}
//       {isSearchOpen && (
//         <div className="fixed inset-0 z-[100] flex justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
//           {/* Area luar klik untuk menutup modal */}
//           <div className="absolute inset-0" onClick={closeSearchModal}></div>

//           <div className="relative flex flex-col w-full max-w-3xl mt-16 md:mt-24 overflow-hidden bg-white shadow-2xl h-[85vh] md:h-[75vh] rounded-t-3xl md:rounded-3xl animate-fade-in-up">

//             {/* Header Pencarian */}
//             <div className="flex flex-col p-4 border-b border-gray-100 md:p-6 bg-gray-50/50">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-bold text-gray-900">Pencarian Universal</h2>
//                 <button onClick={closeSearchModal} className="p-1 text-gray-400 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:text-gray-900 hover:bg-gray-100">
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//                 </button>
//               </div>

//               {/* Input Pencarian */}
//               <div className="relative">
//                 <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Cari produk, No. Pesanan (INV-...), atau status..."
//                   className="w-full py-3 pl-12 pr-4 text-sm font-medium transition-all bg-white border border-gray-300 shadow-sm outline-none rounded-xl focus:ring-2 focus:ring-gycora focus:border-transparent"
//                   autoFocus
//                 />
//               </div>

//               {/* Filter Waktu (Pills) */}
//               <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
//                 {[
//                   { id: 'all', label: 'Semua Waktu' },
//                   { id: '7d', label: '7 Hari Terakhir' },
//                   { id: '30d', label: '30 Hari Terakhir' },
//                   { id: '90d', label: '3 Bulan Terakhir' },
//                 ].map((filter) => (
//                   <button
//                     key={filter.id}
//                     onClick={() => setTimeFilter(filter.id)}
//                     className={`shrink-0 px-4 py-1.5 text-xs font-bold rounded-full transition-all border ${timeFilter === filter.id ? 'bg-gycora text-white border-gycora shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-100'}`}
//                   >
//                     {filter.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Area Hasil Pencarian */}
//             <div className="flex-1 p-4 overflow-y-auto bg-white md:p-6 custom-scrollbar">
//               {searchQuery.trim().length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
//                   <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <p className="text-sm font-medium">Ketik kata kunci untuk memulai pencarian.</p>
//                 </div>
//               ) : isSearching ? (
//                 <div className="flex flex-col items-center justify-center h-full gap-3 text-gycora">
//                   <div className="w-8 h-8 border-4 rounded-full border-emerald-100 border-t-gycora animate-spin"></div>
//                   <p className="text-xs font-bold tracking-widest uppercase animate-pulse">Mencari data...</p>
//                 </div>
//               ) : (
//                 <div className="space-y-8 animate-fade-in">

//                   {/* --- HASIL PRODUK --- */}
//                   {searchResults.products && searchResults.products.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">Produk Katalog</h3>
//                       <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
//                         {searchResults.products.map((product: any) => (
//                           <div
//                             key={`prod-${product.id}`}
//                             onClick={() => { closeSearchModal(); navigate(`/product/${product.id}`); }}
//                             className="flex items-center gap-3 p-3 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
//                           >
//                             <img src={product.image_url} alt={product.name} className="object-cover w-12 h-12 rounded-lg bg-gray-50 shrink-0" />
//                             <div className="flex-1 min-w-0">
//                               <p className="text-sm font-bold text-gray-900 truncate group-hover:text-gycora">{product.name}</p>
//                               <p className="text-xs text-gray-500 font-mono mt-0.5">{product.sku}</p>
//                             </div>
//                             <span className="text-sm font-black text-gycora shrink-0">{formatRupiah(product.price)}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* --- HASIL TRANSAKSI (ORDER) --- */}
//                   {searchResults.transactions && searchResults.transactions.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">Riwayat Transaksi</h3>
//                       <div className="flex flex-col gap-3">
//                         {searchResults.transactions.map((trx: any) => (
//                           <div
//                             key={`trx-${trx.id}`}
//                             onClick={() => { closeSearchModal(); navigate(`/orders`); }}
//                             className="flex items-center justify-between p-4 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
//                           >
//                             <div className="flex items-center gap-4">
//                               <div className="flex items-center justify-center w-10 h-10 text-gray-500 bg-gray-100 rounded-full shadow-sm group-hover:bg-white group-hover:text-gycora">
//                                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
//                               </div>
//                               <div>
//                                 <p className="font-mono text-sm font-bold text-gray-900 group-hover:text-gycora">{trx.order_id}</p>
//                                 <p className="mt-1 text-xs text-gray-500">{new Date(trx.created_at).toLocaleDateString('id-ID')}</p>
//                               </div>
//                             </div>
//                             <div className="text-right">
//                               <p className="text-sm font-black text-gray-900">{formatRupiah(trx.total_amount)}</p>
//                               <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-600">{trx.status}</span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* KOSONG/TIDAK ADA HASIL */}
//                   {!isSearching &&
//                    searchResults.products?.length === 0 &&
//                    searchResults.transactions?.length === 0 &&
//                    searchResults.carts?.length === 0 && (
//                     <div className="flex flex-col items-center justify-center py-10 text-center">
//                       <p className="text-lg font-bold text-gray-900">Oops, tidak ditemukan!</p>
//                       <p className="max-w-sm mt-2 text-sm text-gray-500">Kami tidak dapat menemukan hasil untuk "{searchQuery}" dengan rentang waktu yang Anda pilih.</p>
//                     </div>
//                   )}

//                 </div>
//               )}
//             </div>

//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// import { useEffect, useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../context/CartContext";
// import logoGycora from "../assets/gycora_logo.png";
// import { BASE_URL } from "../config/api";

// export default function Header() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
//   const { cartTotalItems } = useCart();

//   // --- STATE UNTUK DROPDOWN PROFIL ---
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // --- STATE UNTUK MOBILE MENU (BARU) ---
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // --- STATE UNTUK GLOBAL SEARCH MODAL ---
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [timeFilter, setTimeFilter] = useState("all");
//   const [isSearching, setIsSearching] = useState(false);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [searchResults, setSearchResults] = useState<any>({ products: [], transactions: [], carts: [] });
//   const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     const token = localStorage.getItem("user_token");
//     const storedUser = localStorage.getItem("user_data");
//     if (token && storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }
//   }, []);

//   // --- EFEK KLIK DI LUAR DROPDOWN ---
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // --- MENCEGAH SCROLL SAAT MOBILE MENU DIBUKA ---
//   useEffect(() => {
//     if (isMobileMenuOpen || isSearchOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isMobileMenuOpen, isSearchOpen]);

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Keluar?", icon: "warning", showCancelButton: true, confirmButtonColor: "#059669", cancelButtonColor: "#d33", confirmButtonText: "Ya, Keluar"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("user_token");
//         localStorage.removeItem("user_data");
//         setUserData(null);
//         setIsMobileMenuOpen(false); // Tutup mobile menu jika sedang terbuka
//         navigate("/");
//         Swal.fire({ title: "Berhasil Keluar", icon: "success", timer: 1500, showConfirmButton: false });
//       }
//     });
//   };

//   // --- EFEK PENCARIAN DENGAN DEBOUNCE ---
//   useEffect(() => {
//     if (!isSearchOpen) return;

//     if (searchQuery.trim().length === 0) {
//       setSearchResults({ products: [], transactions: [], carts: [] });
//       setIsSearching(false);
//       return;
//     }

//     setIsSearching(true);

//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }

//     searchTimeoutRef.current = setTimeout(async () => {
//       try {
//         const token = localStorage.getItem("user_token");
//         const res = await fetch(`${BASE_URL}/api/search?q=${encodeURIComponent(searchQuery)}&time=${timeFilter}`, {
//           headers: {
//             "Accept": "application/json",
//             ...(token && { "Authorization": `Bearer ${token}` })
//           }
//         });

//         if (res.ok) {
//           const data = await res.json();
//           setSearchResults(data);
//         } else {
//           setSearchResults({ products: [], transactions: [], carts: [] });
//         }
//       } catch (error) {
//         console.error("Global search error:", error);
//         setSearchResults({ products: [], transactions: [], carts: [] });
//       } finally {
//         setIsSearching(false);
//       }
//     }, 500);

//     return () => {
//       if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
//     };
//   }, [searchQuery, timeFilter, isSearchOpen]);

//   const closeSearchModal = () => {
//     setIsSearchOpen(false);
//     setSearchQuery("");
//     setSearchResults({ products: [], transactions: [], carts: [] });
//   };

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka || 0);
//   };

//   return (
//     <>
//       <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
//         <div className="flex items-center justify-between h-20 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">

//           {/* BAGIAN KIRI: Hamburger Menu (Mobile) & Navigasi Kiri (Desktop) */}
//           <div className="flex items-center flex-1">
//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMobileMenuOpen(true)}
//               className="p-2 -ml-2 text-gray-600 transition-colors rounded-md md:hidden hover:bg-gray-100 focus:outline-none"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           </div>

//           {/* BAGIAN TENGAH: LOGO */}
//           <div className="flex items-center justify-center flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
//             <img
//               src={logoGycora}
//               alt="Gycora Logo"
//               className="object-contain h-8 md:h-10"
//             />
//           </div>

//           {/* BAGIAN KANAN: Ikon & Profil */}
//           <div className="flex items-center justify-end flex-1 gap-2 md:gap-5">
//             {userData ? (
//               // --- AREA DROPDOWN PROFIL (Desktop) ---
//               <div className="relative hidden md:block" ref={dropdownRef}>
//                 <button
//                   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                   className="flex items-center gap-2 cursor-pointer group focus:outline-none"
//                 >
//                   <div className="flex items-center justify-center w-8 h-8 text-sm font-bold transition-colors rounded-full bg-gycora-light text-gycora-dark group-hover:bg-gycora group-hover:text-white">
//                     {userData.first_name.charAt(0)}
//                   </div>
//                   <span className="hidden text-sm font-semibold text-gray-800 transition-colors md:block group-hover:text-gycora">
//                     Hi, {userData.first_name}
//                   </span>
//                   <svg className={`hidden md:block w-4 h-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>

//                 {/* Modal Dropdown Desktop */}
//                 {isDropdownOpen && (
//                   <div className="absolute right-0 w-48 py-2 mt-3 bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] animate-fade-in-up origin-top-right">
//                     <Link
//                       to="/profile"
//                       onClick={() => setIsDropdownOpen(false)}
//                       className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gycora"
//                     >
//                       <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
//                       Profil Saya
//                     </Link>
//                     <Link
//                       to="/orders"
//                       onClick={() => setIsDropdownOpen(false)}
//                       className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gycora"
//                     >
//                       <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
//                       Pesanan Saya
//                     </Link>
//                     <div className="my-1 border-t border-gray-100"></div>
//                     <button
//                       onClick={() => {
//                         setIsDropdownOpen(false);
//                         handleLogout();
//                       }}
//                       className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
//                     >
//                       <svg className="w-4 h-4 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
//                       Keluar
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link to="/login" className="hidden text-sm font-medium text-gray-600 transition-colors md:block hover:text-gycora">Login</Link>
//             )}

//             {/* IKON PENCARIAN (GLOBAL SEARCH) */}
//             <button onClick={() => setIsSearchOpen(true)} className="relative p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora">
//               <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </button>

//             {/* IKON CHAT (HANYA MUNCUL JIKA SUDAH LOGIN) */}
//             {userData && (
//               <button onClick={() => navigate("/chat")} className="relative hidden md:block p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora" title="Chat dengan Pakar">
//                 <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                 </svg>
//               </button>
//             )}

//             {/* IKON KERANJANG */}
//             <button id="cart-icon" onClick={() => navigate("/cart")} className="relative p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora">
//               <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
//               </svg>
//               {cartTotalItems > 0 && (
//                 <span className="absolute top-0 right-0 bg-gycora text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1">
//                   {cartTotalItems}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* BOTTOM NAVIGATION (Hanya Desktop) */}
//         <div className="hidden px-4 mx-auto border-t border-gray-100 max-w-7xl sm:px-6 lg:px-8 md:block">
//           <nav className="flex items-center justify-center h-12 space-x-10 text-sm font-semibold text-gray-700">
//              <Link to="/" className="transition-colors hover:text-gycora">Home</Link>
//              <Link to="/products" className="transition-colors hover:text-gycora">Shop All</Link>
//              <Link to="/consult" className="transition-colors hover:text-gycora">Consult With Us</Link>
//           </nav>
//         </div>
//       </header>

//       {/* =====================================================================
//           SIDEBAR MOBILE MENU (BARU)
//       ===================================================================== */}
//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 z-[100] md:hidden">
//           {/* Overlay Background */}
//           <div
//             className="absolute inset-0 transition-opacity bg-black/50 backdrop-blur-sm"
//             onClick={() => setIsMobileMenuOpen(false)}
//           ></div>

//           {/* Panel Menu */}
//           <div className="absolute inset-y-0 left-0 flex flex-col w-4/5 max-w-sm overflow-y-auto bg-white shadow-2xl animate-fade-in-right">
//             <div className="flex items-center justify-between p-4 border-b border-gray-100">
//               <img src={logoGycora} alt="Gycora" className="h-6" />
//               <button
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="p-2 text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200"
//               >
//                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//               </button>
//             </div>

//             {/* Jika User Login, tampilkan info singkat di atas */}
//             {userData && (
//               <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-emerald-50/30">
//                 <div className="flex items-center justify-center w-12 h-12 font-bold rounded-full bg-gycora-light text-gycora-dark">
//                   {userData.first_name.charAt(0)}
//                 </div>
//                 <div>
//                   <p className="text-sm font-bold text-gray-900">{userData.first_name} {userData.last_name}</p>
//                   <p className="text-xs text-gray-500">{userData.email}</p>
//                 </div>
//               </div>
//             )}

//             {/* Menu Navigasi */}
//             <nav className="flex flex-col flex-1 p-4 space-y-2">
//               <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gycora">Home</Link>
//               <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gycora">Shop All</Link>
//               <Link to="/consult" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gycora">Consult With Us</Link>

//               {/* Menu Khusus Login */}
//               {userData && (
//                 <>
//                   <div className="my-2 border-t border-gray-100"></div>
//                   <Link to="/chat" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gycora">
//                     <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
//                     Live Chat Pakar
//                   </Link>
//                   <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gycora">
//                     <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
//                     Profil Saya
//                   </Link>
//                   <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gycora">
//                     <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
//                     Pesanan Saya
//                   </Link>
//                 </>
//               )}
//             </nav>

//             {/* Footer Menu (Auth Action) */}
//             <div className="p-4 border-t border-gray-100">
//               {userData ? (
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-bold text-red-600 transition-colors bg-red-50 hover:bg-red-100 rounded-xl"
//                 >
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
//                   Keluar
//                 </button>
//               ) : (
//                 <div className="flex flex-col gap-2">
//                   <button onClick={() => { setIsMobileMenuOpen(false); navigate("/login"); }} className="w-full px-4 py-3 text-sm font-bold text-center text-white bg-gray-900 shadow-md rounded-xl hover:bg-black">
//                     Masuk
//                   </button>
//                   <button onClick={() => { setIsMobileMenuOpen(false); navigate("/register"); }} className="w-full px-4 py-3 text-sm font-bold text-center text-gray-700 bg-white border border-gray-200 shadow-sm rounded-xl hover:bg-gray-50">
//                     Daftar Akun Baru
//                   </button>
//                 </div>
//               )}
//             </div>

//           </div>
//         </div>
//       )}

//       {/* =====================================================================
//           GLOBAL SEARCH MODAL
//       ===================================================================== */}
//       {isSearchOpen && (
//         <div className="fixed inset-0 z-[100] flex justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
//           {/* Area luar klik untuk menutup modal */}
//           <div className="absolute inset-0" onClick={closeSearchModal}></div>

//           <div className="relative flex flex-col w-full max-w-3xl mt-16 md:mt-24 overflow-hidden bg-white shadow-2xl h-[85vh] md:h-[75vh] rounded-t-3xl md:rounded-3xl animate-fade-in-up">

//             {/* Header Pencarian */}
//             <div className="flex flex-col p-4 border-b border-gray-100 md:p-6 bg-gray-50/50">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-bold text-gray-900">Pencarian Universal</h2>
//                 <button onClick={closeSearchModal} className="p-1 text-gray-400 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:text-gray-900 hover:bg-gray-100">
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//                 </button>
//               </div>

//               {/* Input Pencarian */}
//               <div className="relative">
//                 <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Cari produk, No. Pesanan (INV-...), atau status..."
//                   className="w-full py-3 pl-12 pr-4 text-sm font-medium transition-all bg-white border border-gray-300 shadow-sm outline-none rounded-xl focus:ring-2 focus:ring-gycora focus:border-transparent"
//                   autoFocus
//                 />
//               </div>

//               {/* Filter Waktu (Pills) */}
//               <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
//                 {[
//                   { id: 'all', label: 'Semua Waktu' },
//                   { id: '7d', label: '7 Hari Terakhir' },
//                   { id: '30d', label: '30 Hari Terakhir' },
//                   { id: '90d', label: '3 Bulan Terakhir' },
//                 ].map((filter) => (
//                   <button
//                     key={filter.id}
//                     onClick={() => setTimeFilter(filter.id)}
//                     className={`shrink-0 px-4 py-1.5 text-xs font-bold rounded-full transition-all border ${timeFilter === filter.id ? 'bg-gycora text-white border-gycora shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-100'}`}
//                   >
//                     {filter.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Area Hasil Pencarian */}
//             <div className="flex-1 p-4 overflow-y-auto bg-white md:p-6 custom-scrollbar">
//               {searchQuery.trim().length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
//                   <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <p className="text-sm font-medium">Ketik kata kunci untuk memulai pencarian.</p>
//                 </div>
//               ) : isSearching ? (
//                 <div className="flex flex-col items-center justify-center h-full gap-3 text-gycora">
//                   <div className="w-8 h-8 border-4 rounded-full border-emerald-100 border-t-gycora animate-spin"></div>
//                   <p className="text-xs font-bold tracking-widest uppercase animate-pulse">Mencari data...</p>
//                 </div>
//               ) : (
//                 <div className="space-y-8 animate-fade-in">

//                   {/* --- HASIL PRODUK --- */}
//                   {searchResults.products && searchResults.products.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">Produk Katalog</h3>
//                       <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
//                         {searchResults.products.map((product: any) => (
//                           <div
//                             key={`prod-${product.id}`}
//                             onClick={() => { closeSearchModal(); navigate(`/product/${product.id}`); }}
//                             className="flex items-center gap-3 p-3 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
//                           >
//                             <img src={product.image_url} alt={product.name} className="object-cover w-12 h-12 rounded-lg bg-gray-50 shrink-0" />
//                             <div className="flex-1 min-w-0">
//                               <p className="text-sm font-bold text-gray-900 truncate group-hover:text-gycora">{product.name}</p>
//                               <p className="text-xs text-gray-500 font-mono mt-0.5">{product.sku}</p>
//                             </div>
//                             <span className="text-sm font-black text-gycora shrink-0">{formatRupiah(product.price)}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* --- HASIL TRANSAKSI (ORDER) --- */}
//                   {searchResults.transactions && searchResults.transactions.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">Riwayat Transaksi</h3>
//                       <div className="flex flex-col gap-3">
//                         {searchResults.transactions.map((trx: any) => (
//                           <div
//                             key={`trx-${trx.id}`}
//                             onClick={() => { closeSearchModal(); navigate(`/orders`); }}
//                             className="flex items-center justify-between p-4 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
//                           >
//                             <div className="flex items-center gap-4">
//                               <div className="flex items-center justify-center w-10 h-10 text-gray-500 bg-gray-100 rounded-full shadow-sm group-hover:bg-white group-hover:text-gycora">
//                                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
//                               </div>
//                               <div>
//                                 <p className="font-mono text-sm font-bold text-gray-900 group-hover:text-gycora">{trx.order_id}</p>
//                                 <p className="mt-1 text-xs text-gray-500">{new Date(trx.created_at).toLocaleDateString('id-ID')}</p>
//                               </div>
//                             </div>
//                             <div className="text-right">
//                               <p className="text-sm font-black text-gray-900">{formatRupiah(trx.total_amount)}</p>
//                               <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-600">{trx.status}</span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* KOSONG/TIDAK ADA HASIL */}
//                   {!isSearching &&
//                    searchResults.products?.length === 0 &&
//                    searchResults.transactions?.length === 0 &&
//                    searchResults.carts?.length === 0 && (
//                     <div className="flex flex-col items-center justify-center py-10 text-center">
//                       <p className="text-lg font-bold text-gray-900">Oops, tidak ditemukan!</p>
//                       <p className="max-w-sm mt-2 text-sm text-gray-500">Kami tidak dapat menemukan hasil untuk "{searchQuery}" dengan rentang waktu yang Anda pilih.</p>
//                     </div>
//                   )}

//                 </div>
//               )}
//             </div>

//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// import { useEffect, useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../context/CartContext";
// // import { useMessage } from "../context/MessageContext"; // <-- TAMBAHKAN INI
// import logoGycora from "../assets/gycora_logo.png";
// import { BASE_URL } from "../config/api";

// export default function Header() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
//   // Tambahkan state terpisah untuk mendeteksi apakah ini akun admin
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   // const [adminData, setAdminData] = useState<any>(null);

//   const { cartTotalItems } = useCart();
//   // const { unreadCount, fetchUnreadMessages } = useMessage(); // <-- GUNAKAN CONTEXT

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [timeFilter, setTimeFilter] = useState("all");
//   const [isSearching, setIsSearching] = useState(false);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [searchResults, setSearchResults] = useState<any>({
//     products: [],
//     transactions: [],
//     carts: [],
//   });
//   const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     // Cek User Biasa
//     const userToken = localStorage.getItem("user_token");
//     const storedUser = localStorage.getItem("user_data");
//     if (userToken && storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }

//     // // Cek Admin (Sangat penting karena Admin dan User punya dashboard berbeda)
//     // const adminToken = localStorage.getItem("admin_token");
//     // const storedAdmin = localStorage.getItem("admin_user");
//     // if (adminToken && storedAdmin) {
//     //   setAdminData(JSON.parse(storedAdmin));
//     //   fetchUnreadMessages(); // Refresh badge saat admin terdeteksi login
//     // }
//   }, []);

//   // --- EFEK KLIK DI LUAR DROPDOWN ---
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // --- MENCEGAH SCROLL SAAT MOBILE MENU DIBUKA ---
//   useEffect(() => {
//     if (isMobileMenuOpen || isSearchOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isMobileMenuOpen, isSearchOpen]);

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Keluar?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#059669",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Ya, Keluar",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("user_token");
//         localStorage.removeItem("user_data");
//         setUserData(null);
//         setIsMobileMenuOpen(false); // Tutup mobile menu jika sedang terbuka
//         navigate("/");
//         Swal.fire({
//           title: "Berhasil Keluar",
//           icon: "success",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//       }
//     });
//   };

//   // --- EFEK PENCARIAN DENGAN DEBOUNCE ---
//   useEffect(() => {
//     if (!isSearchOpen) return;

//     if (searchQuery.trim().length === 0) {
//       setSearchResults({ products: [], transactions: [], carts: [] });
//       setIsSearching(false);
//       return;
//     }

//     setIsSearching(true);

//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }

//     searchTimeoutRef.current = setTimeout(async () => {
//       try {
//         const token = localStorage.getItem("user_token");
//         const res = await fetch(
//           `${BASE_URL}/api/search?q=${encodeURIComponent(searchQuery)}&time=${timeFilter}`,
//           {
//             headers: {
//               Accept: "application/json",
//               ...(token && { Authorization: `Bearer ${token}` }),
//             },
//           },
//         );

//         if (res.ok) {
//           const data = await res.json();
//           setSearchResults(data);
//         } else {
//           setSearchResults({ products: [], transactions: [], carts: [] });
//         }
//       } catch (error) {
//         console.error("Global search error:", error);
//         setSearchResults({ products: [], transactions: [], carts: [] });
//       } finally {
//         setIsSearching(false);
//       }
//     }, 500);

//     return () => {
//       if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
//     };
//   }, [searchQuery, timeFilter, isSearchOpen]);

//   const closeSearchModal = () => {
//     setIsSearchOpen(false);
//     setSearchQuery("");
//     setSearchResults({ products: [], transactions: [], carts: [] });
//   };

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(angka || 0);
//   };

//   return (
//     <>
//         <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-md">
//           <div className="flex items-center justify-between h-20 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           {/* BAGIAN KIRI: Hamburger Menu (Mobile) & Navigasi Kiri (Desktop) */}
//           <div className="flex items-center flex-1">
//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMobileMenuOpen(true)}
//               className="p-2 -ml-2 text-gray-600 transition-colors rounded-md md:hidden hover:bg-gray-100 focus:outline-none"
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             </button>
//           </div>

//           {/* BAGIAN TENGAH: LOGO */}
//           <div
//             className="flex items-center justify-center flex-shrink-0 cursor-pointer"
//             onClick={() => navigate("/")}
//           >
//             <img
//               src={logoGycora}
//               alt="Gycora Logo"
//               className="object-contain h-8 md:h-10"
//             />
//           </div>

//           {/* BAGIAN KANAN: Ikon & Profil */}
//           <div className="flex items-center justify-end flex-1 gap-2 md:gap-5">
//             {userData ? (
//               // --- AREA DROPDOWN PROFIL (Desktop) ---
//               <div className="relative hidden md:block" ref={dropdownRef}>
//                 <button
//                   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                   className="flex items-center gap-2 cursor-pointer group focus:outline-none"
//                 >
//                   <div className="flex items-center justify-center w-8 h-8 text-sm font-bold transition-colors rounded-full bg-gycora-light text-gycora-dark group-hover:bg-gycora group-hover:text-white">
//                     {userData.first_name.charAt(0)}
//                   </div>
//                   <span className="hidden text-sm font-semibold text-gray-800 transition-colors md:block group-hover:text-gycora">
//                     Hi, {userData.first_name}
//                   </span>
//                   <svg
//                     className={`hidden md:block w-4 h-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M19 9l-7 7-7-7"
//                     />
//                   </svg>
//                 </button>

//                 {/* Modal Dropdown Desktop */}
//                 {isDropdownOpen && (
//                   <div className="absolute right-0 w-48 py-2 mt-3 bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] animate-fade-in-up origin-top-right">
//                     <Link
//                       to="/profile"
//                       onClick={() => setIsDropdownOpen(false)}
//                       className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gycora"
//                     >
//                       <svg
//                         className="w-4 h-4 mr-3 text-gray-400"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                         />
//                       </svg>
//                       Profil Saya
//                     </Link>
//                     <Link
//                       to="/orders"
//                       onClick={() => setIsDropdownOpen(false)}
//                       className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gycora"
//                     >
//                       <svg
//                         className="w-4 h-4 mr-3 text-gray-400"
//                         fill="none"
//                         viewBox="0 0 24 24"   
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
//                         />
//                       </svg>
//                       Pesanan Saya
//                     </Link>
//                     <div className="my-1 border-t border-gray-100"></div>
//                     <button
//                       onClick={() => {
//                         setIsDropdownOpen(false);
//                         handleLogout();
//                       }}
//                       className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
//                     >
//                       <svg
//                         className="w-4 h-4 mr-3 text-red-500"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                         />
//                       </svg>
//                       Keluar
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link
//                 to="/login"
//                 className="hidden text-sm font-medium text-gray-600 transition-colors md:block hover:text-gycora"
//               >
//                 Login
//               </Link>
//             )}

//             {/* IKON PENCARIAN (GLOBAL SEARCH) */}
//             <button
//               onClick={() => setIsSearchOpen(true)}
//               className="relative p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora"
//             >
//               <svg
//                 className="w-5 h-5 md:w-6 md:h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </button>

//             {/* --- BARU: IKON PESAN (INBOX) KHUSUS ADMIN --- */}
//             {/* {adminData && (
//               <button 
//                 onClick={() => navigate("/admin/messages")} // Sesuaikan route Inbox Admin Anda
//                 className="relative p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora" 
//                 title="Pesan Masuk"
//               >
//                 <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
                
//                 {unreadCount > 0 && (
//                   <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white translate-x-1 -translate-y-1 bg-red-500 rounded-full shadow-sm animate-pulse">
//                     {unreadCount > 99 ? '99+' : unreadCount}
//                   </span>
//                 )}
//               </button>
//             )} */}

//             {/* IKON CHAT (HANYA MUNCUL JIKA SUDAH LOGIN) */}
//             {userData && (
//               <button
//                 onClick={() => navigate("/chat")}
//                 className="relative hidden md:block p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora"
//                 title="Chat dengan Pakar"
//               >
//                 <svg
//                   className="w-5 h-5 md:w-6 md:h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="1.5"
//                     d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                   />
//                 </svg>
//               </button>
//             )}

//             {/* IKON KERANJANG */}
//             <button
//               id="cart-icon"
//               onClick={() => navigate("/cart")}
//               className="relative p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora"
//             >
//               <svg
//                 className="w-5 h-5 md:w-6 md:h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="1.5"
//                   d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
//                 />
//               </svg>
//               {cartTotalItems > 0 && (
//                 <span className="absolute top-0 right-0 bg-gycora text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1">
//                   {cartTotalItems}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* BOTTOM NAVIGATION (Hanya Desktop) */}
//         <div className="hidden px-4 mx-auto border-t border-gray-100 max-w-7xl sm:px-6 lg:px-8 md:block">
//           <nav className="flex items-center justify-center h-12 space-x-10 text-sm font-semibold text-gray-700">
//             <Link to="/" className="transition-colors hover:text-gycora">
//               Home
//             </Link>
//             <Link
//               to="/products"
//               className="transition-colors hover:text-gycora"
//             >
//               Shop All
//             </Link>
//             <Link to="/consult" className="transition-colors hover:text-gycora">
//               Consult With Us
//             </Link>
//           </nav>
//         </div>
//       </header>

//       {/* =====================================================================
//           SIDEBAR MOBILE MENU (BARU)
//       ===================================================================== */}
//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 z-[100] md:hidden">
//           {/* Overlay Background */}
//           <div
//             className="absolute inset-0 transition-opacity bg-black/50 backdrop-blur-sm"
//             onClick={() => setIsMobileMenuOpen(false)}
//           ></div>

//           {/* Panel Menu */}
//           <div className="absolute inset-y-0 left-0 flex flex-col w-4/5 max-w-sm overflow-y-auto bg-white shadow-2xl animate-fade-in-right">
//             <div className="flex items-center justify-between p-4 border-b border-gray-100">
//               <img src={logoGycora} alt="Gycora" className="h-6" />
//               <button
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="p-2 text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200"
//               >
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
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

//             {/* Jika User Login, tampilkan info singkat di atas */}
//             {userData && (
//               <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-emerald-50/30">
//                 <div className="flex items-center justify-center w-12 h-12 font-bold rounded-full bg-gycora-light text-gycora-dark">
//                   {userData.first_name.charAt(0)}
//                 </div>
//                 <div>
//                   <p className="text-sm font-bold text-gray-900">
//                     {userData.first_name} {userData.last_name}
//                   </p>
//                   <p className="text-xs text-gray-500">{userData.email}</p>
//                 </div>
//               </div>
//             )}

//             {/* Menu Navigasi */}
//             <nav className="flex flex-col flex-1 p-4 space-y-2">
//               <Link
//                 to="/"
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gycora"
//               >
//                 Home
//               </Link>
//               <Link
//                 to="/products"
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gycora"
//               >
//                 Shop All
//               </Link>
//               <Link
//                 to="/consult"
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gycora"
//               >
//                 Consult With Us
//               </Link>

//               {/* Menu Khusus Login */}
//               {userData && (
//                 <>
//                   <div className="my-2 border-t border-gray-100"></div>
//                   <Link
//                     to="/chat"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                     className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gycora"
//                   >
//                     <svg
//                       className="w-5 h-5 text-gray-400"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                       />
//                     </svg>
//                     Live Chat Pakar
//                   </Link>
//                   <Link
//                     to="/profile"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                     className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gycora"
//                   >
//                     <svg
//                       className="w-5 h-5 text-gray-400"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                       />
//                     </svg>
//                     Profil Saya
//                   </Link>
//                   <Link
//                     to="/orders"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                     className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gycora"
//                   >
//                     <svg
//                       className="w-5 h-5 text-gray-400"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
//                       />
//                     </svg>
//                     Pesanan Saya
//                   </Link>
//                 </>
//               )}
//             </nav>

//             {/* Footer Menu (Auth Action) */}
//             <div className="p-4 border-t border-gray-100">
//               {userData ? (
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-bold text-red-600 transition-colors bg-red-50 hover:bg-red-100 rounded-xl"
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
//                       strokeWidth="2"
//                       d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                     />
//                   </svg>
//                   Keluar
//                 </button>
//               ) : (
//                 <div className="flex flex-col gap-2">
//                   <button
//                     onClick={() => {
//                       setIsMobileMenuOpen(false);
//                       navigate("/login");
//                     }}
//                     className="w-full px-4 py-3 text-sm font-bold text-center text-white bg-gray-900 shadow-md rounded-xl hover:bg-black"
//                   >
//                     Masuk
//                   </button>
//                   <button
//                     onClick={() => {
//                       setIsMobileMenuOpen(false);
//                       navigate("/register");
//                     }}
//                     className="w-full px-4 py-3 text-sm font-bold text-center text-gray-700 bg-white border border-gray-200 shadow-sm rounded-xl hover:bg-gray-50"
//                   >
//                     Daftar Akun Baru
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* =====================================================================
//           GLOBAL SEARCH MODAL
//       ===================================================================== */}
//       {isSearchOpen && (
//         <div className="fixed inset-0 z-[100] flex justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
//           {/* Area luar klik untuk menutup modal */}
//           <div className="absolute inset-0" onClick={closeSearchModal}></div>

//           <div className="relative flex flex-col w-full max-w-3xl mt-16 md:mt-24 overflow-hidden bg-white shadow-2xl h-[85vh] md:h-[75vh] rounded-t-3xl md:rounded-3xl animate-fade-in-up">
//             {/* Header Pencarian */}
//             <div className="flex flex-col p-4 border-b border-gray-100 md:p-6 bg-gray-50/50">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-bold text-gray-900">
//                   Pencarian Universal
//                 </h2>
//                 <button
//                   onClick={closeSearchModal}
//                   className="p-1 text-gray-400 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:text-gray-900 hover:bg-gray-100"
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
//                       strokeWidth="2"
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//               </div>

//               {/* Input Pencarian */}
//               <div className="relative">
//                 <svg
//                   className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                   />
//                 </svg>
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Cari produk, No. Pesanan (INV-...), atau status..."
//                   className="w-full py-3 pl-12 pr-4 text-sm font-medium transition-all bg-white border border-gray-300 shadow-sm outline-none rounded-xl focus:ring-2 focus:ring-gycora focus:border-transparent"
//                   autoFocus
//                 />
//               </div>

//               {/* Filter Waktu (Pills) */}
//               <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
//                 {[
//                   { id: "all", label: "Semua Waktu" },
//                   { id: "7d", label: "7 Hari Terakhir" },
//                   { id: "30d", label: "30 Hari Terakhir" },
//                   { id: "90d", label: "3 Bulan Terakhir" },
//                 ].map((filter) => (
//                   <button
//                     key={filter.id}
//                     onClick={() => setTimeFilter(filter.id)}
//                     className={`shrink-0 px-4 py-1.5 text-xs font-bold rounded-full transition-all border ${timeFilter === filter.id ? "bg-gycora text-white border-gycora shadow-md" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100"}`}
//                   >
//                     {filter.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Area Hasil Pencarian */}
//             <div className="flex-1 p-4 overflow-y-auto bg-white md:p-6 custom-scrollbar">
//               {searchQuery.trim().length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
//                   <svg
//                     className="w-16 h-16 mb-4"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth="1"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                   <p className="text-sm font-medium">
//                     Ketik kata kunci untuk memulai pencarian.
//                   </p>
//                 </div>
//               ) : isSearching ? (
//                 <div className="flex flex-col items-center justify-center h-full gap-3 text-gycora">
//                   <div className="w-8 h-8 border-4 rounded-full border-emerald-100 border-t-gycora animate-spin"></div>
//                   <p className="text-xs font-bold tracking-widest uppercase animate-pulse">
//                     Mencari data...
//                   </p>
//                 </div>
//               ) : (
//                 <div className="space-y-8 animate-fade-in">
//                   {/* --- HASIL PRODUK --- */}
//                   {searchResults.products &&
//                     searchResults.products.length > 0 && (
//                       <div className="space-y-3">
//                         <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">
//                           Produk Katalog
//                         </h3>
//                         <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
//                           {searchResults.products.map((product: any) => (
//                             <div
//                               key={`prod-${product.id}`}
//                               onClick={() => {
//                                 closeSearchModal();
//                                 navigate(`/product/${product.id}`);
//                               }}
//                               className="flex items-center gap-3 p-3 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
//                             >
//                               <img
//                                 src={product.image_url}
//                                 alt={product.name}
//                                 className="object-cover w-12 h-12 rounded-lg bg-gray-50 shrink-0"
//                               />
//                               <div className="flex-1 min-w-0">
//                                 <p className="text-sm font-bold text-gray-900 truncate group-hover:text-gycora">
//                                   {product.name}
//                                 </p>
//                                 <p className="text-xs text-gray-500 font-mono mt-0.5">
//                                   {product.sku}
//                                 </p>
//                               </div>
//                               <span className="text-sm font-black text-gycora shrink-0">
//                                 {formatRupiah(product.price)}
//                               </span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                   {/* --- HASIL TRANSAKSI (ORDER) --- */}
//                   {searchResults.transactions &&
//                     searchResults.transactions.length > 0 && (
//                       <div className="space-y-3">
//                         <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">
//                           Riwayat Transaksi
//                         </h3>
//                         <div className="flex flex-col gap-3">
//                           {searchResults.transactions.map((trx: any) => (
//                             <div
//                               key={`trx-${trx.id}`}
//                               onClick={() => {
//                                 closeSearchModal();
//                                 navigate(`/orders`);
//                               }}
//                               className="flex items-center justify-between p-4 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
//                             >
//                               <div className="flex items-center gap-4">
//                                 <div className="flex items-center justify-center w-10 h-10 text-gray-500 bg-gray-100 rounded-full shadow-sm group-hover:bg-white group-hover:text-gycora">
//                                   <svg
//                                     className="w-5 h-5"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                     stroke="currentColor"
//                                   >
//                                     <path
//                                       strokeLinecap="round"
//                                       strokeLinejoin="round"
//                                       strokeWidth="2"
//                                       d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                                     />
//                                   </svg>
//                                 </div>
//                                 <div>
//                                   <p className="font-mono text-sm font-bold text-gray-900 group-hover:text-gycora">
//                                     {trx.order_id}
//                                   </p>
//                                   <p className="mt-1 text-xs text-gray-500">
//                                     {new Date(
//                                       trx.created_at,
//                                     ).toLocaleDateString("id-ID")}
//                                   </p>
//                                 </div>
//                               </div>
//                               <div className="text-right">
//                                 <p className="text-sm font-black text-gray-900">
//                                   {formatRupiah(trx.total_amount)}
//                                 </p>
//                                 <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-600">
//                                   {trx.status}
//                                 </span>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                   {/* KOSONG/TIDAK ADA HASIL */}
//                   {!isSearching &&
//                     searchResults.products?.length === 0 &&
//                     searchResults.transactions?.length === 0 &&
//                     searchResults.carts?.length === 0 && (
//                       <div className="flex flex-col items-center justify-center py-10 text-center">
//                         <p className="text-lg font-bold text-gray-900">
//                           Oops, tidak ditemukan!
//                         </p>
//                         <p className="max-w-sm mt-2 text-sm text-gray-500">
//                           Kami tidak dapat menemukan hasil untuk "{searchQuery}"
//                           dengan rentang waktu yang Anda pilih.
//                         </p>
//                       </div>
//                     )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// import { useEffect, useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../context/CartContext";
// // import { useMessage } from "../context/MessageContext";
// import logoGycora from "../assets/gycora_logo.png";
// import { BASE_URL } from "../config/api";

// export default function Header() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);

//   const { cartTotalItems } = useCart();

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
//   // --- STATE UNTUK DROPDOWN PRODUCT DI DESKTOP & MOBILE ---
//   const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
//   const [isMobileProductMenuOpen, setIsMobileProductMenuOpen] = useState(false);

//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [timeFilter, setTimeFilter] = useState("all");
//   const [isSearching, setIsSearching] = useState(false);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [searchResults, setSearchResults] = useState<any>({
//     products: [],
//     transactions: [],
//     carts: [],
//   });
//   const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     const userToken = localStorage.getItem("user_token");
//     const storedUser = localStorage.getItem("user_data");
//     if (userToken && storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }
//   }, []);

//   // --- EFEK KLIK DI LUAR DROPDOWN ---
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // --- MENCEGAH SCROLL SAAT MOBILE MENU DIBUKA ---
//   useEffect(() => {
//     if (isMobileMenuOpen || isSearchOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isMobileMenuOpen, isSearchOpen]);

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Keluar?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#059669",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Ya, Keluar",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("user_token");
//         localStorage.removeItem("user_data");
//         setUserData(null);
//         setIsMobileMenuOpen(false);
//         navigate("/");
//         Swal.fire({
//           title: "Berhasil Keluar",
//           icon: "success",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//       }
//     });
//   };

//   // --- EFEK PENCARIAN DENGAN DEBOUNCE ---
//   useEffect(() => {
//     if (!isSearchOpen) return;

//     if (searchQuery.trim().length === 0) {
//       setSearchResults({ products: [], transactions: [], carts: [] });
//       setIsSearching(false);
//       return;
//     }

//     setIsSearching(true);

//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }

//     searchTimeoutRef.current = setTimeout(async () => {
//       try {
//         const token = localStorage.getItem("user_token");
//         const res = await fetch(
//           `${BASE_URL}/api/search?q=${encodeURIComponent(searchQuery)}&time=${timeFilter}`,
//           {
//             headers: {
//               Accept: "application/json",
//               ...(token && { Authorization: `Bearer ${token}` }),
//             },
//           },
//         );

//         if (res.ok) {
//           const data = await res.json();
//           setSearchResults(data);
//         } else {
//           setSearchResults({ products: [], transactions: [], carts: [] });
//         }
//       } catch (error) {
//         console.error("Global search error:", error);
//         setSearchResults({ products: [], transactions: [], carts: [] });
//       } finally {
//         setIsSearching(false);
//       }
//     }, 500);

//     return () => {
//       if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
//     };
//   }, [searchQuery, timeFilter, isSearchOpen]);

//   const closeSearchModal = () => {
//     setIsSearchOpen(false);
//     setSearchQuery("");
//     setSearchResults({ products: [], transactions: [], carts: [] });
//   };

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(angka || 0);
//   };

//   return (
//     <>
//         {/* HEADER DENGAN SHADOW MD DI BAWAH */}
//         <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-md">
//           <div className="flex items-center justify-between h-20 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          
//           <div className="flex items-center flex-1">
//             <button
//               onClick={() => setIsMobileMenuOpen(true)}
//               className="p-2 -ml-2 text-gray-600 transition-colors rounded-md md:hidden hover:bg-gray-100 focus:outline-none"
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             </button>
//           </div>

//           <div
//             className="flex items-center justify-center flex-shrink-0 cursor-pointer"
//             onClick={() => navigate("/")}
//           >
//             <img
//               src={logoGycora}
//               alt="Gycora Logo"
//               className="object-contain h-8 md:h-10"
//             />
//           </div>

//           <div className="flex items-center justify-end flex-1 gap-2 md:gap-5">
//             {userData ? (
//               <div className="relative hidden md:block" ref={dropdownRef}>
//                 <button
//                   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                   className="flex items-center gap-2 cursor-pointer group focus:outline-none"
//                 >
//                   <div className="flex items-center justify-center w-8 h-8 text-sm font-bold transition-colors rounded-full bg-gycora-light text-gycora-dark group-hover:bg-gycora group-hover:text-white">
//                     {userData.first_name.charAt(0)}
//                   </div>
//                   <span className="hidden text-sm font-semibold text-gray-800 transition-colors md:block group-hover:text-gycora">
//                     Hi, {userData.first_name}
//                   </span>
//                   <svg
//                     className={`hidden md:block w-4 h-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M19 9l-7 7-7-7"
//                     />
//                   </svg>
//                 </button>

//                 {isDropdownOpen && (
//                   <div className="absolute right-0 w-48 py-2 mt-3 bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] animate-fade-in-up origin-top-right">
//                     <Link
//                       to="/profile"
//                       onClick={() => setIsDropdownOpen(false)}
//                       className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gycora"
//                     >
//                       Profil Saya
//                     </Link>
//                     <Link
//                       to="/orders"
//                       onClick={() => setIsDropdownOpen(false)}
//                       className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gycora"
//                     >
//                       Pesanan Saya
//                     </Link>
//                     <div className="my-1 border-t border-gray-100"></div>
//                     <button
//                       onClick={() => {
//                         setIsDropdownOpen(false);
//                         handleLogout();
//                       }}
//                       className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
//                     >
//                       Keluar
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link
//                 to="/login"
//                 className="hidden text-sm font-medium text-gray-600 transition-colors md:block hover:text-gycora"
//               >
//                 Login
//               </Link>
//             )}

//             <button
//               onClick={() => setIsSearchOpen(true)}
//               className="relative p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora"
//             >
//               <svg
//                 className="w-5 h-5 md:w-6 md:h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </button>

//             {userData && (
//               <button
//                 onClick={() => navigate("/chat")}
//                 className="relative hidden md:block p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora"
//                 title="Chat dengan Pakar"
//               >
//                 <svg
//                   className="w-5 h-5 md:w-6 md:h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="1.5"
//                     d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                   />
//                 </svg>
//               </button>
//             )}

//             <button
//               id="cart-icon"
//               onClick={() => navigate("/cart")}
//               className="relative p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora"
//             >
//               <svg
//                 className="w-5 h-5 md:w-6 md:h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="1.5"
//                   d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
//                 />
//               </svg>
//               {cartTotalItems > 0 && (
//                 <span className="absolute top-0 right-0 bg-gycora text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1">
//                   {cartTotalItems}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* BOTTOM NAVIGATION (Hanya Desktop) */}
//         <div className="hidden px-4 mx-auto border-t border-gray-100 max-w-7xl sm:px-6 lg:px-8 md:block">
//           <nav className="flex items-center justify-center h-12 space-x-10 text-sm font-semibold text-gray-700">
//             <Link to="/" className="transition-colors hover:text-gycora">
//               Home
//             </Link>

//             {/* PRODUCT DROPDOWN DESKTOP */}
//             <div 
//               className="relative flex items-center h-full cursor-pointer group"
//               onMouseEnter={() => setIsProductMenuOpen(true)}
//               onMouseLeave={() => setIsProductMenuOpen(false)}
//             >
//               <div className="flex items-center gap-1 transition-colors hover:text-gycora">
//                 Product
//                 <svg
//                   className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`}
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                 </svg>
//               </div>

//               {/* Isi Dropdown Desktop */}
//               {isProductMenuOpen && (
//                 <div className="absolute w-56 py-2 mt-0 -translate-x-1/2 bg-white border border-gray-100 shadow-xl top-full left-1/2 rounded-xl animate-fade-in-up">
//                   <Link
//                     to="/product-one"
//                     className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors"
//                   >
//                     Ethereal Glow Brush
//                   </Link>
//                   <Link
//                     to="/product-two"
//                     className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors"
//                   >
//                     Eco Serenity Scalp Care
//                   </Link>
//                 </div>
//               )}
//             </div>

//             <Link to="/consult" className="transition-colors hover:text-gycora">
//               Consult With Us
//             </Link>
//           </nav>
//         </div>
//       </header>

//       {/* =====================================================================
//           SIDEBAR MOBILE MENU 
//       ===================================================================== */}
//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 z-[100] md:hidden">
//           <div
//             className="absolute inset-0 transition-opacity bg-black/50 backdrop-blur-sm"
//             onClick={() => setIsMobileMenuOpen(false)}
//           ></div>

//           <div className="absolute inset-y-0 left-0 flex flex-col w-4/5 max-w-sm overflow-y-auto bg-white shadow-2xl animate-fade-in-right">
//             <div className="flex items-center justify-between p-4 border-b border-gray-100">
//               <img src={logoGycora} alt="Gycora" className="h-6" />
//               <button
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="p-2 text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200"
//               >
//                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             {userData && (
//               <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-emerald-50/30">
//                 <div className="flex items-center justify-center w-12 h-12 font-bold rounded-full bg-gycora-light text-gycora-dark">
//                   {userData.first_name.charAt(0)}
//                 </div>
//                 <div>
//                   <p className="text-sm font-bold text-gray-900">
//                     {userData.first_name} {userData.last_name}
//                   </p>
//                   <p className="text-xs text-gray-500">{userData.email}</p>
//                 </div>
//               </div>
//             )}

//             <nav className="flex flex-col flex-1 p-4 space-y-2">
//               <Link
//                 to="/"
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gycora"
//               >
//                 Home
//               </Link>

//               {/* PRODUCT ACCORDION MOBILE */}
//               <div>
//                 <button
//                   onClick={() => setIsMobileProductMenuOpen(!isMobileProductMenuOpen)}
//                   className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gycora"
//                 >
//                   Product
//                   <svg
//                     className={`w-4 h-4 transition-transform duration-200 ${isMobileProductMenuOpen ? "rotate-180" : ""}`}
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
//                 {isMobileProductMenuOpen && (
//                   <div className="flex flex-col pl-6 mt-1 space-y-1">
//                     <Link
//                       to="/product-one"
//                       onClick={() => setIsMobileMenuOpen(false)}
//                       className="px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-emerald-50 hover:text-gycora"
//                     >
//                       Ethereal Glow Brush
//                     </Link>
//                     <Link
//                       to="/product-two"
//                       onClick={() => setIsMobileMenuOpen(false)}
//                       className="px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-emerald-50 hover:text-gycora"
//                     >
//                       Eco Serenity Scalp Care
//                     </Link>
//                   </div>
//                 )}
//               </div>

//               <Link
//                 to="/consult"
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gycora"
//               >
//                 Consult With Us
//               </Link>

//               {userData && (
//                 <>
//                   <div className="my-2 border-t border-gray-100"></div>
//                   <Link
//                     to="/chat"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                     className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gycora"
//                   >
//                     Live Chat Pakar
//                   </Link>
//                   <Link
//                     to="/profile"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                     className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gycora"
//                   >
//                     Profil Saya
//                   </Link>
//                   <Link
//                     to="/orders"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                     className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gycora"
//                   >
//                     Pesanan Saya
//                   </Link>
//                 </>
//               )}
//             </nav>

//             <div className="p-4 border-t border-gray-100">
//               {userData ? (
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-bold text-red-600 transition-colors bg-red-50 hover:bg-red-100 rounded-xl"
//                 >
//                   Keluar
//                 </button>
//               ) : (
//                 <div className="flex flex-col gap-2">
//                   <button
//                     onClick={() => {
//                       setIsMobileMenuOpen(false);
//                       navigate("/login");
//                     }}
//                     className="w-full px-4 py-3 text-sm font-bold text-center text-white bg-gray-900 shadow-md rounded-xl hover:bg-black"
//                   >
//                     Masuk
//                   </button>
//                   <button
//                     onClick={() => {
//                       setIsMobileMenuOpen(false);
//                       navigate("/register");
//                     }}
//                     className="w-full px-4 py-3 text-sm font-bold text-center text-gray-700 bg-white border border-gray-200 shadow-sm rounded-xl hover:bg-gray-50"
//                   >
//                     Daftar Akun Baru
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* =====================================================================
//           GLOBAL SEARCH MODAL
//       ===================================================================== */}
//       {isSearchOpen && (
//         <div className="fixed inset-0 z-[100] flex justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
//           <div className="absolute inset-0" onClick={closeSearchModal}></div>

//           <div className="relative flex flex-col w-full max-w-3xl mt-16 md:mt-24 overflow-hidden bg-white shadow-2xl h-[85vh] md:h-[75vh] rounded-t-3xl md:rounded-3xl animate-fade-in-up">
//             <div className="flex flex-col p-4 border-b border-gray-100 md:p-6 bg-gray-50/50">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-bold text-gray-900">
//                   Pencarian Universal
//                 </h2>
//                 <button
//                   onClick={closeSearchModal}
//                   className="p-1 text-gray-400 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:text-gray-900 hover:bg-gray-100"
//                 >
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               <div className="relative">
//                 <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Cari produk, No. Pesanan (INV-...), atau status..."
//                   className="w-full py-3 pl-12 pr-4 text-sm font-medium transition-all bg-white border border-gray-300 shadow-sm outline-none rounded-xl focus:ring-2 focus:ring-gycora focus:border-transparent"
//                   autoFocus
//                 />
//               </div>

//               <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
//                 {[
//                   { id: "all", label: "Semua Waktu" },
//                   { id: "7d", label: "7 Hari Terakhir" },
//                   { id: "30d", label: "30 Hari Terakhir" },
//                   { id: "90d", label: "3 Bulan Terakhir" },
//                 ].map((filter) => (
//                   <button
//                     key={filter.id}
//                     onClick={() => setTimeFilter(filter.id)}
//                     className={`shrink-0 px-4 py-1.5 text-xs font-bold rounded-full transition-all border ${timeFilter === filter.id ? "bg-gycora text-white border-gycora shadow-md" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100"}`}
//                   >
//                     {filter.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="flex-1 p-4 overflow-y-auto bg-white md:p-6 custom-scrollbar">
//               {searchQuery.trim().length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
//                   <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <p className="text-sm font-medium">Ketik kata kunci untuk memulai pencarian.</p>
//                 </div>
//               ) : isSearching ? (
//                 <div className="flex flex-col items-center justify-center h-full gap-3 text-gycora">
//                   <div className="w-8 h-8 border-4 rounded-full border-emerald-100 border-t-gycora animate-spin"></div>
//                   <p className="text-xs font-bold tracking-widest uppercase animate-pulse">Mencari data...</p>
//                 </div>
//               ) : (
//                 <div className="space-y-8 animate-fade-in">
//                   {searchResults.products && searchResults.products.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">
//                         Produk Katalog
//                       </h3>
//                       <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
//                         {searchResults.products.map((product: any) => (
//                           <div
//                             key={`prod-${product.id}`}
//                             onClick={() => {
//                               closeSearchModal();
//                               navigate(`/product/${product.id}`);
//                             }}
//                             className="flex items-center gap-3 p-3 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
//                           >
//                             <img src={product.image_url} alt={product.name} className="object-cover w-12 h-12 rounded-lg bg-gray-50 shrink-0" />
//                             <div className="flex-1 min-w-0">
//                               <p className="text-sm font-bold text-gray-900 truncate group-hover:text-gycora">{product.name}</p>
//                               <p className="text-xs text-gray-500 font-mono mt-0.5">{product.sku}</p>
//                             </div>
//                             <span className="text-sm font-black text-gycora shrink-0">{formatRupiah(product.price)}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {searchResults.transactions && searchResults.transactions.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">
//                         Riwayat Transaksi
//                       </h3>
//                       <div className="flex flex-col gap-3">
//                         {searchResults.transactions.map((trx: any) => (
//                           <div
//                             key={`trx-${trx.id}`}
//                             onClick={() => {
//                               closeSearchModal();
//                               navigate(`/orders`);
//                             }}
//                             className="flex items-center justify-between p-4 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
//                           >
//                             <div className="flex items-center gap-4">
//                               <div className="flex items-center justify-center w-10 h-10 text-gray-500 bg-gray-100 rounded-full shadow-sm group-hover:bg-white group-hover:text-gycora">
//                                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                                 </svg>
//                               </div>
//                               <div>
//                                 <p className="font-mono text-sm font-bold text-gray-900 group-hover:text-gycora">{trx.order_id}</p>
//                                 <p className="mt-1 text-xs text-gray-500">{new Date(trx.created_at).toLocaleDateString("id-ID")}</p>
//                               </div>
//                             </div>
//                             <div className="text-right">
//                               <p className="text-sm font-black text-gray-900">{formatRupiah(trx.total_amount)}</p>
//                               <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-600">
//                                 {trx.status}
//                               </span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {!isSearching && searchResults.products?.length === 0 && searchResults.transactions?.length === 0 && searchResults.carts?.length === 0 && (
//                     <div className="flex flex-col items-center justify-center py-10 text-center">
//                       <p className="text-lg font-bold text-gray-900">Oops, tidak ditemukan!</p>
//                       <p className="max-w-sm mt-2 text-sm text-gray-500">
//                         Kami tidak dapat menemukan hasil untuk "{searchQuery}" dengan rentang waktu yang Anda pilih.
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// import { useEffect, useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../context/CartContext";
// // import { useMessage } from "../context/MessageContext";
// import logoGycora from "../assets/gycora_logo.png";
// import { BASE_URL } from "../config/api";

// export default function Header() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);

//   const { cartTotalItems } = useCart();

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
//   // --- STATE UNTUK DROPDOWN PRODUCT DI DESKTOP & MOBILE ---
//   const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
//   const [isMobileProductMenuOpen, setIsMobileProductMenuOpen] = useState(false);

//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [timeFilter, setTimeFilter] = useState("all");
//   const [isSearching, setIsSearching] = useState(false);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [searchResults, setSearchResults] = useState<any>({
//     products: [],
//     transactions: [],
//     carts: [],
//   });
//   const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     const userToken = localStorage.getItem("user_token");
//     const storedUser = localStorage.getItem("user_data");
//     if (userToken && storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }
//   }, []);

//   // --- EFEK KLIK DI LUAR DROPDOWN ---
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // --- MENCEGAH SCROLL SAAT MOBILE MENU DIBUKA ---
//   useEffect(() => {
//     if (isMobileMenuOpen || isSearchOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isMobileMenuOpen, isSearchOpen]);

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Keluar?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#059669",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Ya, Keluar",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("user_token");
//         localStorage.removeItem("user_data");
//         setUserData(null);
//         setIsMobileMenuOpen(false);
//         navigate("/");
//         Swal.fire({
//           title: "Berhasil Keluar",
//           icon: "success",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//       }
//     });
//   };

//   // --- EFEK PENCARIAN DENGAN DEBOUNCE ---
//   useEffect(() => {
//     if (!isSearchOpen) return;

//     if (searchQuery.trim().length === 0) {
//       setSearchResults({ products: [], transactions: [], carts: [] });
//       setIsSearching(false);
//       return;
//     }

//     setIsSearching(true);

//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }

//     searchTimeoutRef.current = setTimeout(async () => {
//       try {
//         const token = localStorage.getItem("user_token");
//         const res = await fetch(
//           `${BASE_URL}/api/search?q=${encodeURIComponent(searchQuery)}&time=${timeFilter}`,
//           {
//             headers: {
//               Accept: "application/json",
//               ...(token && { Authorization: `Bearer ${token}` }),
//             },
//           },
//         );

//         if (res.ok) {
//           const data = await res.json();
//           setSearchResults(data);
//         } else {
//           setSearchResults({ products: [], transactions: [], carts: [] });
//         }
//       } catch (error) {
//         console.error("Global search error:", error);
//         setSearchResults({ products: [], transactions: [], carts: [] });
//       } finally {
//         setIsSearching(false);
//       }
//     }, 500);

//     return () => {
//       if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
//     };
//   }, [searchQuery, timeFilter, isSearchOpen]);

//   const closeSearchModal = () => {
//     setIsSearchOpen(false);
//     setSearchQuery("");
//     setSearchResults({ products: [], transactions: [], carts: [] });
//   };

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(angka || 0);
//   };

//   return (
//     <>
//       {/* =========================================
//           HEADER: DESAIN ONE-LAYER
//       ========================================= */}
//       <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
//         <div className="relative flex items-center justify-between h-20 px-4 mx-auto max-w-[1536px] sm:px-6 lg:px-8">
          
//           {/* BAGIAN KIRI: Navigasi Desktop / Hamburger Menu Mobile */}
//           <div className="flex items-center flex-1">
//             {/* Mobile Hamburger */}
//             <button
//               onClick={() => setIsMobileMenuOpen(true)}
//               className="p-2 -ml-2 text-gray-600 transition-colors rounded-md md:hidden hover:bg-gray-100 focus:outline-none"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>

//             {/* Desktop Nav (Kiri) */}
//             <nav className="items-center hidden gap-8 text-sm font-semibold text-gray-700 md:flex">
//               <Link to="/" className="transition-colors hover:text-gycora">
//                 Home
//               </Link>

//               {/* PRODUCT DROPDOWN DESKTOP */}
//               <div 
//                 className="relative flex items-center h-full py-2 cursor-pointer group"
//                 onMouseEnter={() => setIsProductMenuOpen(true)}
//                 onMouseLeave={() => setIsProductMenuOpen(false)}
//               >
//                 <div className="flex items-center gap-1 transition-colors hover:text-gycora">
//                   Product
//                   <svg
//                     className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`}
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </div>

//                 {/* Isi Dropdown Desktop */}
//                 {isProductMenuOpen && (
//                   <div className="absolute left-0 w-56 py-2 mt-2 bg-white border border-gray-100 shadow-xl top-10 rounded-xl animate-fade-in-up">
//                     <Link
//                       to="/product-one"
//                       className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors"
//                     >
//                       Ethereal Glow Brush
//                     </Link>
//                     <Link
//                       to="/product-two"
//                       className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors"
//                     >
//                       Eco Serenity Scalp Care
//                     </Link>
//                   </div>
//                 )}
//               </div>
//               <Link to="/consult" className="transition-colors hover:text-gycora">
//                 Consult With Us
//               </Link>
//             </nav>
//           </div>

//           {/* BAGIAN TENGAH: LOGO (Absolute Center) */}
//           <div
//             className="absolute flex items-center justify-center flex-shrink-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer left-1/2 top-1/2"
//             onClick={() => navigate("/")}
//           >
//             <img
//               src={logoGycora}
//               alt="Gycora Logo"
//               className="object-contain h-8 md:h-10"
//             />
//           </div>

//           {/* BAGIAN KANAN: Ikon & Profil */}
//           <div className="flex items-center justify-end flex-1 gap-2 md:gap-5">
//             {userData ? (
//               // --- AREA DROPDOWN PROFIL (Desktop) ---
//               <div className="relative hidden md:block" ref={dropdownRef}>
//                 <button
//                   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                   className="flex items-center gap-2 cursor-pointer group focus:outline-none"
//                 >
//                   <div className="flex items-center justify-center w-8 h-8 text-sm font-bold transition-colors rounded-full bg-gycora-light text-gycora-dark group-hover:bg-gycora group-hover:text-white">
//                     {userData.first_name.charAt(0)}
//                   </div>
//                   <span className="hidden text-sm font-semibold text-gray-800 transition-colors md:block group-hover:text-gycora">
//                     Hi, {userData.first_name}
//                   </span>
//                   <svg
//                     className={`hidden md:block w-4 h-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>

//                 {/* Modal Dropdown Desktop */}
//                 {isDropdownOpen && (
//                   <div className="absolute right-0 w-48 py-2 mt-3 bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] animate-fade-in-up origin-top-right">
//                     <Link
//                       to="/profile"
//                       onClick={() => setIsDropdownOpen(false)}
//                       className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gycora"
//                     >
//                       <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                       </svg>
//                       Profil Saya
//                     </Link>
//                     <Link
//                       to="/orders"
//                       onClick={() => setIsDropdownOpen(false)}
//                       className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gycora"
//                     >
//                       <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                       </svg>
//                       Pesanan Saya
//                     </Link>
//                     <div className="my-1 border-t border-gray-100"></div>
//                     <button
//                       onClick={() => {
//                         setIsDropdownOpen(false);
//                         handleLogout();
//                       }}
//                       className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
//                     >
//                       <svg className="w-4 h-4 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                       </svg>
//                       Keluar
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link
//                 to="/login"
//                 className="hidden text-sm font-medium text-gray-600 transition-colors md:block hover:text-gycora"
//               >
//                 Login
//               </Link>
//             )}

//             {/* IKON PENCARIAN (GLOBAL SEARCH) */}
//             <button
//               onClick={() => setIsSearchOpen(true)}
//               className="relative p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora"
//             >
//               <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </button>

//             {/* IKON CHAT (HANYA MUNCUL JIKA SUDAH LOGIN) */}
//             {userData && (
//               <button
//                 onClick={() => navigate("/chat")}
//                 className="relative hidden md:block p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora"
//                 title="Chat dengan Pakar"
//               >
//                 <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                 </svg>
//               </button>
//             )}

//             {/* IKON KERANJANG */}
//             <button
//               id="cart-icon"
//               onClick={() => navigate("/cart")}
//               className="relative p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora"
//             >
//               <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//               </svg>
//               {cartTotalItems > 0 && (
//                 <span className="absolute top-0 right-0 bg-gycora text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1">
//                   {cartTotalItems}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* =====================================================================
//           SIDEBAR MOBILE MENU 
//       ===================================================================== */}
//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 z-[100] md:hidden">
//           {/* Overlay Background */}
//           <div
//             className="absolute inset-0 transition-opacity bg-black/50 backdrop-blur-sm"
//             onClick={() => setIsMobileMenuOpen(false)}
//           ></div>

//           {/* Panel Menu */}
//           <div className="absolute inset-y-0 left-0 flex flex-col w-4/5 max-w-sm overflow-y-auto bg-white shadow-2xl animate-fade-in-right">
//             <div className="flex items-center justify-between p-4 border-b border-gray-100">
//               <img src={logoGycora} alt="Gycora" className="h-6" />
//               <button
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="p-2 text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200"
//               >
//                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             {/* Jika User Login, tampilkan info singkat di atas */}
//             {userData && (
//               <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-emerald-50/30">
//                 <div className="flex items-center justify-center w-12 h-12 font-bold rounded-full bg-gycora-light text-gycora-dark">
//                   {userData.first_name.charAt(0)}
//                 </div>
//                 <div>
//                   <p className="text-sm font-bold text-gray-900">
//                     {userData.first_name} {userData.last_name}
//                   </p>
//                   <p className="text-xs text-gray-500">{userData.email}</p>
//                 </div>
//               </div>
//             )}

//             {/* Menu Navigasi */}
//             <nav className="flex flex-col flex-1 p-4 space-y-2">
//               <Link
//                 to="/"
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gycora"
//               >
//                 Home
//               </Link>

//               {/* PRODUCT ACCORDION MOBILE */}
//               <div>
//                 <button
//                   onClick={() => setIsMobileProductMenuOpen(!isMobileProductMenuOpen)}
//                   className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gycora"
//                 >
//                   Product
//                   <svg
//                     className={`w-4 h-4 transition-transform duration-200 ${isMobileProductMenuOpen ? "rotate-180" : ""}`}
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
//                 {isMobileProductMenuOpen && (
//                   <div className="flex flex-col pl-6 mt-1 space-y-1">
//                     <Link
//                       to="/product-one"
//                       onClick={() => setIsMobileMenuOpen(false)}
//                       className="px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-emerald-50 hover:text-gycora"
//                     >
//                       Ethereal Glow Brush
//                     </Link>
//                     <Link
//                       to="/product-two"
//                       onClick={() => setIsMobileMenuOpen(false)}
//                       className="px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-emerald-50 hover:text-gycora"
//                     >
//                       Eco Serenity Scalp Care
//                     </Link>
//                   </div>
//                 )}
//               </div>

//               <Link
//                 to="/products"
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gycora"
//               >
//                 Shop All
//               </Link>

//               <Link
//                 to="/consult"
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gycora"
//               >
//                 Consult With Us
//               </Link>

//               {/* Menu Khusus Login */}
//               {userData && (
//                 <>
//                   <div className="my-2 border-t border-gray-100"></div>
//                   <Link
//                     to="/chat"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                     className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gycora"
//                   >
//                     <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                     </svg>
//                     Live Chat Pakar
//                   </Link>
//                   <Link
//                     to="/profile"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                     className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gycora"
//                   >
//                     <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                     </svg>
//                     Profil Saya
//                   </Link>
//                   <Link
//                     to="/orders"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                     className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gycora"
//                   >
//                     <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                     </svg>
//                     Pesanan Saya
//                   </Link>
//                 </>
//               )}
//             </nav>

//             {/* Footer Menu (Auth Action) */}
//             <div className="p-4 border-t border-gray-100">
//               {userData ? (
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-bold text-red-600 transition-colors bg-red-50 hover:bg-red-100 rounded-xl"
//                 >
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                   </svg>
//                   Keluar
//                 </button>
//               ) : (
//                 <div className="flex flex-col gap-2">
//                   <button
//                     onClick={() => {
//                       setIsMobileMenuOpen(false);
//                       navigate("/login");
//                     }}
//                     className="w-full px-4 py-3 text-sm font-bold text-center text-white bg-gray-900 shadow-md rounded-xl hover:bg-black"
//                   >
//                     Masuk
//                   </button>
//                   <button
//                     onClick={() => {
//                       setIsMobileMenuOpen(false);
//                       navigate("/register");
//                     }}
//                     className="w-full px-4 py-3 text-sm font-bold text-center text-gray-700 bg-white border border-gray-200 shadow-sm rounded-xl hover:bg-gray-50"
//                   >
//                     Daftar Akun Baru
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* =====================================================================
//           GLOBAL SEARCH MODAL
//       ===================================================================== */}
//       {isSearchOpen && (
//         <div className="fixed inset-0 z-[100] flex justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
//           {/* Area luar klik untuk menutup modal */}
//           <div className="absolute inset-0" onClick={closeSearchModal}></div>

//           <div className="relative flex flex-col w-full max-w-3xl mt-16 md:mt-24 overflow-hidden bg-white shadow-2xl h-[85vh] md:h-[75vh] rounded-t-3xl md:rounded-3xl animate-fade-in-up">
//             {/* Header Pencarian */}
//             <div className="flex flex-col p-4 border-b border-gray-100 md:p-6 bg-gray-50/50">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-bold text-gray-900">
//                   Pencarian Universal
//                 </h2>
//                 <button
//                   onClick={closeSearchModal}
//                   className="p-1 text-gray-400 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:text-gray-900 hover:bg-gray-100"
//                 >
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               {/* Input Pencarian */}
//               <div className="relative">
//                 <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Cari produk, No. Pesanan (INV-...), atau status..."
//                   className="w-full py-3 pl-12 pr-4 text-sm font-medium transition-all bg-white border border-gray-300 shadow-sm outline-none rounded-xl focus:ring-2 focus:ring-gycora focus:border-transparent"
//                   autoFocus
//                 />
//               </div>

//               {/* Filter Waktu (Pills) */}
//               <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
//                 {[
//                   { id: "all", label: "Semua Waktu" },
//                   { id: "7d", label: "7 Hari Terakhir" },
//                   { id: "30d", label: "30 Hari Terakhir" },
//                   { id: "90d", label: "3 Bulan Terakhir" },
//                 ].map((filter) => (
//                   <button
//                     key={filter.id}
//                     onClick={() => setTimeFilter(filter.id)}
//                     className={`shrink-0 px-4 py-1.5 text-xs font-bold rounded-full transition-all border ${timeFilter === filter.id ? "bg-gycora text-white border-gycora shadow-md" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100"}`}
//                   >
//                     {filter.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Area Hasil Pencarian */}
//             <div className="flex-1 p-4 overflow-y-auto bg-white md:p-6 custom-scrollbar">
//               {searchQuery.trim().length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
//                   <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <p className="text-sm font-medium">Ketik kata kunci untuk memulai pencarian.</p>
//                 </div>
//               ) : isSearching ? (
//                 <div className="flex flex-col items-center justify-center h-full gap-3 text-gycora">
//                   <div className="w-8 h-8 border-4 rounded-full border-emerald-100 border-t-gycora animate-spin"></div>
//                   <p className="text-xs font-bold tracking-widest uppercase animate-pulse">Mencari data...</p>
//                 </div>
//               ) : (
//                 <div className="space-y-8 animate-fade-in">
//                   {/* --- HASIL PRODUK --- */}
//                   {searchResults.products && searchResults.products.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">
//                         Produk Katalog
//                       </h3>
//                       <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
//                         {searchResults.products.map((product: any) => (
//                           <div
//                             key={`prod-${product.id}`}
//                             onClick={() => {
//                               closeSearchModal();
//                               navigate(`/product/${product.id}`);
//                             }}
//                             className="flex items-center gap-3 p-3 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
//                           >
//                             <img src={product.image_url} alt={product.name} className="object-cover w-12 h-12 rounded-lg bg-gray-50 shrink-0" />
//                             <div className="flex-1 min-w-0">
//                               <p className="text-sm font-bold text-gray-900 truncate group-hover:text-gycora">{product.name}</p>
//                               <p className="text-xs text-gray-500 font-mono mt-0.5">{product.sku}</p>
//                             </div>
//                             <span className="text-sm font-black text-gycora shrink-0">{formatRupiah(product.price)}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* --- HASIL TRANSAKSI (ORDER) --- */}
//                   {searchResults.transactions && searchResults.transactions.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">
//                         Riwayat Transaksi
//                       </h3>
//                       <div className="flex flex-col gap-3">
//                         {searchResults.transactions.map((trx: any) => (
//                           <div
//                             key={`trx-${trx.id}`}
//                             onClick={() => {
//                               closeSearchModal();
//                               navigate(`/orders`);
//                             }}
//                             className="flex items-center justify-between p-4 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
//                           >
//                             <div className="flex items-center gap-4">
//                               <div className="flex items-center justify-center w-10 h-10 text-gray-500 bg-gray-100 rounded-full shadow-sm group-hover:bg-white group-hover:text-gycora">
//                                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                                 </svg>
//                               </div>
//                               <div>
//                                 <p className="font-mono text-sm font-bold text-gray-900 group-hover:text-gycora">{trx.order_id}</p>
//                                 <p className="mt-1 text-xs text-gray-500">{new Date(trx.created_at).toLocaleDateString("id-ID")}</p>
//                               </div>
//                             </div>
//                             <div className="text-right">
//                               <p className="text-sm font-black text-gray-900">{formatRupiah(trx.total_amount)}</p>
//                               <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-600">
//                                 {trx.status}
//                               </span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* KOSONG/TIDAK ADA HASIL */}
//                   {!isSearching && searchResults.products?.length === 0 && searchResults.transactions?.length === 0 && searchResults.carts?.length === 0 && (
//                     <div className="flex flex-col items-center justify-center py-10 text-center">
//                       <p className="text-lg font-bold text-gray-900">Oops, tidak ditemukan!</p>
//                       <p className="max-w-sm mt-2 text-sm text-gray-500">
//                         Kami tidak dapat menemukan hasil untuk "{searchQuery}" dengan rentang waktu yang Anda pilih.
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// import { useEffect, useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../context/CartContext";
// import logoGycora from "../assets/gycora_logo.png";
// import { BASE_URL } from "../config/api";

// export default function Header() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
//   const { cartTotalItems } = useCart();

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
//   const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
//   const [isMobileProductMenuOpen, setIsMobileProductMenuOpen] = useState(false);

//   // [BARU] STATE UNTUK MENU ABOUT US
//   const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false);
//   const [isMobileAboutMenuOpen, setIsMobileAboutMenuOpen] = useState(false);

//   const [allProducts, setAllProducts] = useState<any[]>([]);
//   const [menuIds, setMenuIds] = useState({
//     pinkBrush: null as number | null,
//     blackBrush: null as number | null,
//     scalpCare: null as number | null,
//   });

//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [timeFilter, setTimeFilter] = useState("all");
//   const [isSearching, setIsSearching] = useState(false);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [searchResults, setSearchResults] = useState<any>({
//     products: [],
//     transactions: [],
//     carts: [],
//   });
//   const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     const userToken = localStorage.getItem("user_token");
//     const storedUser = localStorage.getItem("user_data");
//     if (userToken && storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }

//     const fetchForMenu = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         const data = await res.json();
//         const products = data.data ? data.data : data;
//         setAllProducts(products);

//         const pink = products.find((p: any) => p.name.toLowerCase().includes("brush") && p.name.toLowerCase().includes("pink"));
//         const black = products.find((p: any) => p.name.toLowerCase().includes("brush") && p.name.toLowerCase().includes("black"));
//         const scalp = products.find((p: any) => p.name.toLowerCase().includes("scalp"));

//         setMenuIds({
//           pinkBrush: pink?.id || null,
//           blackBrush: black?.id || null,
//           scalpCare: scalp?.id || null,
//         });
//       } catch (err) {
//         console.error("Gagal load menu produk", err);
//       }
//     };
//     fetchForMenu();
//   }, []);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (isMobileMenuOpen || isSearchOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isMobileMenuOpen, isSearchOpen]);

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Keluar?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#059669",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Ya, Keluar",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("user_token");
//         localStorage.removeItem("user_data");
//         setUserData(null);
//         setIsMobileMenuOpen(false);
//         navigate("/");
//       }
//     });
//   };

//   useEffect(() => {
//     if (!isSearchOpen) return;

//     if (searchQuery.trim().length === 0) {
//       setSearchResults({ products: [], transactions: [], carts: [] });
//       setIsSearching(false);
//       return;
//     }

//     setIsSearching(true);

//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }

//     searchTimeoutRef.current = setTimeout(async () => {
//       try {
//         const token = localStorage.getItem("user_token");
//         const res = await fetch(
//           `${BASE_URL}/api/search?q=${encodeURIComponent(searchQuery)}&time=${timeFilter}`,
//           {
//             headers: {
//               Accept: "application/json",
//               ...(token && { Authorization: `Bearer ${token}` }),
//             },
//           }
//         );

//         if (res.ok) {
//           const data = await res.json();
//           setSearchResults(data);
//         } else {
//           setSearchResults({ products: [], transactions: [], carts: [] });
//         }
//       } catch (error) {
//         console.error("Global search error:", error);
//         setSearchResults({ products: [], transactions: [], carts: [] });
//       } finally {
//         setIsSearching(false);
//       }
//     }, 500);

//     return () => {
//       if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
//     };
//   }, [searchQuery, timeFilter, isSearchOpen]);

//   const closeSearchModal = () => {
//     setIsSearchOpen(false);
//     setSearchQuery("");
//     setSearchResults({ products: [], transactions: [], carts: [] });
//   };

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(angka || 0);
//   };

//   return (
//     <>
//       <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
//         <div className="relative flex items-center justify-between h-20 px-4 mx-auto max-w-[1536px] sm:px-6 lg:px-8">
          
//           <div className="flex items-center flex-1">
//             <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-gray-600 transition-colors rounded-md md:hidden hover:bg-gray-100">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
//             </button>

//             <nav className="items-center hidden gap-6 text-sm font-semibold text-gray-700 md:flex lg:gap-8">
//               <Link to="/" className="transition-colors hover:text-gycora">Home</Link>

//               {/* [BARU] ABOUT US MENU DROPDOWN */}
//               <div 
//                 className="relative flex items-center h-full py-2 cursor-pointer group"
//                 onMouseEnter={() => setIsAboutMenuOpen(true)}
//                 onMouseLeave={() => setIsAboutMenuOpen(false)}
//               >
//                 <Link to="/about" className="flex items-center gap-1 transition-colors hover:text-gycora">
//                   About Us
//                   <svg
//                     className={`w-4 h-4 transition-transform duration-200 ${isAboutMenuOpen ? "rotate-180" : ""}`}
//                     fill="none" viewBox="0 0 24 24" stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </Link>

//                 {isAboutMenuOpen && (
//                   <div className="absolute left-0 pt-2 top-full w-52 animate-fade-in-up">
//                     <div className="py-2 bg-white border border-gray-100 shadow-2xl rounded-xl">
//                       <Link to="/about#our-story" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Story</Link>
//                       <Link to="/about#our-purpose" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Purpose</Link>
//                       <Link to="/about#our-innovation" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Innovation</Link>
//                       <Link to="/about#vision-mission" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Vision and Mission</Link>
//                       <Link to="/faq" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors border-t border-gray-100">FAQs</Link>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* PRODUCT MENU DROPDOWN */}
//               <div 
//                 className="relative flex items-center h-full py-2 cursor-pointer group"
//                 onMouseEnter={() => setIsProductMenuOpen(true)}
//                 onMouseLeave={() => setIsProductMenuOpen(false)}
//               >
//                 <Link to="/products" className="flex items-center gap-1 transition-colors hover:text-gycora">
//                   Product
//                   <svg
//                     className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`}
//                     fill="none" viewBox="0 0 24 24" stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </Link>

//                 {isProductMenuOpen && (
//                   <div className="absolute left-0 w-64 pt-2 top-full animate-fade-in-up">
//                     <div className="py-2 bg-white border border-gray-100 shadow-2xl rounded-xl">
//                       <button onClick={() => navigate(menuIds.pinkBrush ? `/product/${menuIds.pinkBrush}` : '/products', { state: { allProducts } })} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">
//                         Ethereal Glow Brush Pink
//                       </button>
//                       <button onClick={() => navigate(menuIds.blackBrush ? `/product/${menuIds.blackBrush}` : '/products', { state: { allProducts } })} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">
//                         Ethereal Glow Brush Black
//                       </button>
//                       <button onClick={() => navigate(menuIds.scalpCare ? `/product/${menuIds.scalpCare}` : '/products', { state: { allProducts } })} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">
//                         Eco Serenity Scalp Care
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <Link to="/consult" className="transition-colors hover:text-gycora">Consult</Link>
//             </nav>
//           </div>

//           {/* BAGIAN TENGAH: LOGO */}
//           <div className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer left-1/2 top-1/2" onClick={() => navigate("/")}>
//             <img src={logoGycora} alt="Gycora Logo" className="object-contain h-8 md:h-10" />
//           </div>

//           {/* BAGIAN KANAN: Ikon */}
//           <div className="flex items-center justify-end flex-1 gap-2 md:gap-5">
//             {userData ? (
//               <div className="relative hidden md:block" ref={dropdownRef}>
//                 <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 cursor-pointer group focus:outline-none">
//                   <div className="flex items-center justify-center w-8 h-8 text-sm font-bold transition-colors rounded-full bg-gycora-light text-gycora-dark group-hover:bg-gycora group-hover:text-white">
//                     {userData.first_name.charAt(0)}
//                   </div>
//                   <span className="hidden text-sm font-semibold text-gray-800 transition-colors md:block group-hover:text-gycora">Hi, {userData.first_name}</span>
//                 </button>
//                 {isDropdownOpen && (
//                   <div className="absolute right-0 w-48 py-2 mt-3 bg-white border border-gray-100 shadow-xl rounded-xl animate-fade-in-up">
//                     <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profil Saya</Link>
//                     <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Pesanan Saya</Link>
//                     <button onClick={handleLogout} className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50">Keluar</button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link to="/login" className="hidden text-sm font-medium text-gray-600 transition-colors md:block hover:text-gycora">Login</Link>
//             )}
            
//             <button onClick={() => setIsSearchOpen(true)} className="p-1.5 text-gray-600 hover:text-gycora">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
//             </button>
            
//             {userData && (
//               <button onClick={() => navigate("/chat")} className="relative hidden md:block p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora" title="Chat dengan Pakar">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                 </svg>
//               </button>
//             )}

//             <button onClick={() => navigate("/cart")} className="relative p-1.5 text-gray-600 hover:text-gycora">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
//               {cartTotalItems > 0 && <span className="absolute top-0 right-0 bg-gycora text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1">{cartTotalItems}</span>}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* MOBILE MENU */}
//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 z-[100] md:hidden">
//           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
//           <div className="absolute inset-y-0 left-0 w-4/5 max-w-sm p-4 overflow-y-auto bg-white shadow-2xl">
//              <div className="flex items-center justify-between mb-8">
//                 <img src={logoGycora} alt="Logo" className="h-6" />
//                 <button onClick={() => setIsMobileMenuOpen(false)}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
//              </div>
             
//              {userData && (
//               <div className="flex items-center gap-3 p-4 mb-4 border border-gray-100 rounded-xl bg-emerald-50/30">
//                 <div className="flex items-center justify-center w-12 h-12 font-bold rounded-full bg-gycora-light text-gycora-dark">
//                   {userData.first_name.charAt(0)}
//                 </div>
//                 <div>
//                   <p className="text-sm font-bold text-gray-900">{userData.first_name} {userData.last_name}</p>
//                   <p className="text-xs text-gray-500">{userData.email}</p>
//                 </div>
//               </div>
//             )}

//              <nav className="flex flex-col gap-4">
//                 <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Home</Link>
                
//                 {/* [BARU] Accordion About Us Mobile */}
//                 <div>
//                    <button onClick={() => setIsMobileAboutMenuOpen(!isMobileAboutMenuOpen)} className="flex items-center justify-between w-full text-lg font-bold">
//                       About Us
//                       <svg className={`w-5 h-5 transition-transform ${isMobileAboutMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
//                    </button>
//                    {isMobileAboutMenuOpen && (
//                       <div className="flex flex-col gap-3 pl-4 mt-2 text-gray-600">
//                          <Link to="/about#our-story" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Story</Link>
//                          <Link to="/about#our-purpose" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Purpose</Link>
//                          <Link to="/about#our-innovation" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Innovation</Link>
//                          <Link to="/about#vision-mission" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Vision and Mission</Link>
//                          <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)} className="text-left text-gycora">FAQs</Link>
//                       </div>
//                    )}
//                 </div>

//                 {/* Accordion Product Mobile */}
//                 <div>
//                    <button onClick={() => setIsMobileProductMenuOpen(!isMobileProductMenuOpen)} className="flex items-center justify-between w-full text-lg font-bold">
//                       Product
//                       <svg className={`w-5 h-5 transition-transform ${isMobileProductMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
//                    </button>
//                    {isMobileProductMenuOpen && (
//                       <div className="flex flex-col gap-3 pl-4 mt-2 text-gray-600">
//                          <button className="text-left" onClick={() => { setIsMobileMenuOpen(false); navigate(menuIds.pinkBrush ? `/product/${menuIds.pinkBrush}` : '/products', { state: { allProducts } }); }}>Ethereal Glow Brush Pink</button>
//                          <button className="text-left" onClick={() => { setIsMobileMenuOpen(false); navigate(menuIds.blackBrush ? `/product/${menuIds.blackBrush}` : '/products', { state: { allProducts } }); }}>Ethereal Glow Brush Black</button>
//                          <button className="text-left" onClick={() => { setIsMobileMenuOpen(false); navigate(menuIds.scalpCare ? `/product/${menuIds.scalpCare}` : '/products', { state: { allProducts } }); }}>Eco Serenity Scalp Care</button>
//                       </div>
//                    )}
//                 </div>

//                 <Link to="/consult" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Consult</Link>
             
//                 {userData ? (
//                   <>
//                     <div className="my-2 border-t border-gray-100"></div>
//                     <Link to="/chat" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">Live Chat Pakar</Link>
//                     <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">Profil Saya</Link>
//                     <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">Pesanan Saya</Link>
//                     <button onClick={handleLogout} className="mt-4 font-bold text-left text-red-600">Keluar</button>
//                   </>
//                 ) : (
//                   <div className="flex flex-col gap-2 mt-4">
//                     <button onClick={() => { setIsMobileMenuOpen(false); navigate("/login"); }} className="w-full px-4 py-3 text-sm font-bold text-white bg-gray-900 rounded-xl">Masuk</button>
//                     <button onClick={() => { setIsMobileMenuOpen(false); navigate("/register"); }} className="w-full px-4 py-3 text-sm font-bold text-gray-700 border border-gray-200 rounded-xl">Daftar Akun Baru</button>
//                   </div>
//                 )}
//              </nav>
//           </div>
//         </div>
//       )}

//       {/* =====================================================================
//           GLOBAL SEARCH MODAL
//       ===================================================================== */}
//       {isSearchOpen && (
//         <div className="fixed inset-0 z-[100] flex justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
//           <div className="absolute inset-0" onClick={closeSearchModal}></div>

//           <div className="relative flex flex-col w-full max-w-3xl mt-16 md:mt-24 overflow-hidden bg-white shadow-2xl h-[85vh] md:h-[75vh] rounded-t-3xl md:rounded-3xl animate-fade-in-up">
//             <div className="flex flex-col p-4 border-b border-gray-100 md:p-6 bg-gray-50/50">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-bold text-gray-900">
//                   Pencarian Universal
//                 </h2>
//                 <button onClick={closeSearchModal} className="p-1 text-gray-400 bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100">
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               <div className="relative">
//                 <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Cari produk, No. Pesanan (INV-...), atau status..."
//                   className="w-full py-3 pl-12 pr-4 text-sm font-medium transition-all bg-white border border-gray-300 shadow-sm outline-none rounded-xl focus:ring-2 focus:ring-gycora focus:border-transparent"
//                   autoFocus
//                 />
//               </div>

//               <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
//                 {[
//                   { id: "all", label: "Semua Waktu" },
//                   { id: "7d", label: "7 Hari Terakhir" },
//                   { id: "30d", label: "30 Hari Terakhir" },
//                   { id: "90d", label: "3 Bulan Terakhir" },
//                 ].map((filter) => (
//                   <button
//                     key={filter.id}
//                     onClick={() => setTimeFilter(filter.id)}
//                     className={`shrink-0 px-4 py-1.5 text-xs font-bold rounded-full transition-all border ${timeFilter === filter.id ? "bg-gycora text-white border-gycora shadow-md" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100"}`}
//                   >
//                     {filter.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="flex-1 p-4 overflow-y-auto bg-white md:p-6 custom-scrollbar">
//               {searchQuery.trim().length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
//                   <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <p className="text-sm font-medium">Ketik kata kunci untuk memulai pencarian.</p>
//                 </div>
//               ) : isSearching ? (
//                 <div className="flex flex-col items-center justify-center h-full gap-3 text-gycora">
//                   <div className="w-8 h-8 border-4 rounded-full border-emerald-100 border-t-gycora animate-spin"></div>
//                   <p className="text-xs font-bold tracking-widest uppercase animate-pulse">Mencari data...</p>
//                 </div>
//               ) : (
//                 <div className="space-y-8 animate-fade-in">
//                   {searchResults.products && searchResults.products.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">Produk Katalog</h3>
//                       <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
//                         {searchResults.products.map((product: any) => (
//                           <div
//                             key={`prod-${product.id}`}
//                             onClick={() => { closeSearchModal(); navigate(`/product/${product.id}`); }}
//                             className="flex items-center gap-3 p-3 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
//                           >
//                             <img src={product.image_url} alt={product.name} className="object-cover w-12 h-12 rounded-lg bg-gray-50 shrink-0" />
//                             <div className="flex-1 min-w-0">
//                               <p className="text-sm font-bold text-gray-900 truncate group-hover:text-gycora">{product.name}</p>
//                               <p className="text-xs text-gray-500 font-mono mt-0.5">{product.sku}</p>
//                             </div>
//                             <span className="text-sm font-black text-gycora shrink-0">{formatRupiah(product.price)}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {searchResults.transactions && searchResults.transactions.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">Riwayat Transaksi</h3>
//                       <div className="flex flex-col gap-3">
//                         {searchResults.transactions.map((trx: any) => (
//                           <div
//                             key={`trx-${trx.id}`}
//                             onClick={() => { closeSearchModal(); navigate(`/orders`); }}
//                             className="flex items-center justify-between p-4 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
//                           >
//                             <div className="flex items-center gap-4">
//                               <div className="flex items-center justify-center w-10 h-10 text-gray-500 bg-gray-100 rounded-full shadow-sm group-hover:bg-white group-hover:text-gycora">
//                                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                                 </svg>
//                               </div>
//                               <div>
//                                 <p className="font-mono text-sm font-bold text-gray-900 group-hover:text-gycora">{trx.order_id}</p>
//                                 <p className="mt-1 text-xs text-gray-500">{new Date(trx.created_at).toLocaleDateString("id-ID")}</p>
//                               </div>
//                             </div>
//                             <div className="text-right">
//                               <p className="text-sm font-black text-gray-900">{formatRupiah(trx.total_amount)}</p>
//                               <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-600">{trx.status}</span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                   {/*  */}
//                   {!isSearching && searchResults.products?.length === 0 && searchResults.transactions?.length === 0 && searchResults.carts?.length === 0 && (
//                     <div className="flex flex-col items-center justify-center py-10 text-center">
//                       <p className="text-lg font-bold text-gray-900">Oops, tidak ditemukan!</p>
//                       <p className="max-w-sm mt-2 text-sm text-gray-500">Kami tidak dapat menemukan hasil untuk "{searchQuery}" dengan rentang waktu yang Anda pilih.</p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// // Ganti warna CTA bawah
// import { useEffect, useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../context/CartContext";
// // import { useMessage } from "../context/MessageContext";
// import logoGycora from "../assets/gycora_logo.png";
// import { BASE_URL } from "../config/api";

// export default function Header() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
//   const { cartTotalItems } = useCart();

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
//   const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
//   const [isMobileProductMenuOpen, setIsMobileProductMenuOpen] = useState(false);

//   // --- STATE UNTUK MENU ABOUT US ---
//   const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false);
//   const [isMobileAboutMenuOpen, setIsMobileAboutMenuOpen] = useState(false);

//   // --- STATE UNTUK MENYIMPAN ID PRODUK DINAMIS UNTUK MENU ---
//   const [allProducts, setAllProducts] = useState<any[]>([]);
//   const [menuIds, setMenuIds] = useState({
//     pinkBrush: null as number | null,
//     blackBrush: null as number | null,
//     scalpCare: null as number | null,
//   });

//   // --- STATE PENCARIAN ---
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [timeFilter, setTimeFilter] = useState("all");
//   const [isSearching, setIsSearching] = useState(false);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [searchResults, setSearchResults] = useState<any>({
//     products: [],
//     transactions: [],
//     carts: [],
//   });
//   const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     const userToken = localStorage.getItem("user_token");
//     const storedUser = localStorage.getItem("user_data");
//     if (userToken && storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }

//     // FETCH PRODUK UNTUK MENGISI LINK DROPDOWN SECARA OTOMATIS
//     const fetchForMenu = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         const data = await res.json();
//         const products = data.data ? data.data : data;
//         setAllProducts(products);

//         // Cari ID berdasarkan nama (Case Insensitive)
//         const pink = products.find((p: any) => p.name.toLowerCase().includes("brush") && p.name.toLowerCase().includes("pink"));
//         const black = products.find((p: any) => p.name.toLowerCase().includes("brush") && p.name.toLowerCase().includes("black"));
//         const scalp = products.find((p: any) => p.name.toLowerCase().includes("scalp"));

//         setMenuIds({
//           pinkBrush: pink?.id || null,
//           blackBrush: black?.id || null,
//           scalpCare: scalp?.id || null,
//         });
//       } catch (err) {
//         console.error("Gagal load menu produk", err);
//       }
//     };
//     fetchForMenu();
//   }, []);

//   // --- EFEK KLIK DI LUAR DROPDOWN ---
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // --- MENCEGAH SCROLL SAAT MOBILE MENU DIBUKA ---
//   useEffect(() => {
//     if (isMobileMenuOpen || isSearchOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isMobileMenuOpen, isSearchOpen]);

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Keluar?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#059669",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Ya, Keluar",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("user_token");
//         localStorage.removeItem("user_data");
//         setUserData(null);
//         setIsMobileMenuOpen(false);
//         navigate("/");
//       }
//     });
//   };

//   // --- EFEK PENCARIAN DENGAN DEBOUNCE ---
//   useEffect(() => {
//     if (!isSearchOpen) return;

//     if (searchQuery.trim().length === 0) {
//       setSearchResults({ products: [], transactions: [], carts: [] });
//       setIsSearching(false);
//       return;
//     }

//     setIsSearching(true);

//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }

//     searchTimeoutRef.current = setTimeout(async () => {
//       try {
//         const token = localStorage.getItem("user_token");
//         const res = await fetch(
//           `${BASE_URL}/api/search?q=${encodeURIComponent(searchQuery)}&time=${timeFilter}`,
//           {
//             headers: {
//               Accept: "application/json",
//               ...(token && { Authorization: `Bearer ${token}` }),
//             },
//           }
//         );

//         if (res.ok) {
//           const data = await res.json();
//           setSearchResults(data);
//         } else {
//           setSearchResults({ products: [], transactions: [], carts: [] });
//         }
//       } catch (error) {
//         console.error("Global search error:", error);
//         setSearchResults({ products: [], transactions: [], carts: [] });
//       } finally {
//         setIsSearching(false);
//       }
//     }, 500);

//     return () => {
//       if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
//     };
//   }, [searchQuery, timeFilter, isSearchOpen]);

//   const closeSearchModal = () => {
//     setIsSearchOpen(false);
//     setSearchQuery("");
//     setSearchResults({ products: [], transactions: [], carts: [] });
//   };

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(angka || 0);
//   };

//   return (
//     <>
//       <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
//         <div className="relative flex items-center justify-between h-20 px-4 mx-auto max-w-[1536px] sm:px-6 lg:px-8">
          
//           {/* BAGIAN KIRI: Navigasi Desktop / Hamburger Menu Mobile */}
//           <div className="flex items-center flex-1">
//             <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-gray-600 transition-colors rounded-md md:hidden hover:bg-gray-100">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
//             </button>

//             <nav className="items-center hidden gap-6 text-sm font-semibold text-gray-700 md:flex lg:gap-8">
//               <Link to="/" className="transition-colors hover:text-gycora">Home</Link>

//               {/* ABOUT US MENU DROPDOWN */}
//               <div 
//                 className="relative flex items-center h-full py-2 cursor-pointer group"
//                 onMouseEnter={() => setIsAboutMenuOpen(true)}
//                 onMouseLeave={() => setIsAboutMenuOpen(false)}
//               >
//                 <Link to="/about" className="flex items-center gap-1 transition-colors hover:text-gycora">
//                   About Us
//                   <svg
//                     className={`w-4 h-4 transition-transform duration-200 ${isAboutMenuOpen ? "rotate-180" : ""}`}
//                     fill="none" viewBox="0 0 24 24" stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </Link>

//                 {isAboutMenuOpen && (
//                   <div className="absolute left-0 pt-2 top-full w-52 animate-fade-in-up">
//                     <div className="py-2 bg-white border border-gray-100 shadow-2xl rounded-xl">
//                       <Link to="/about#our-story" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Story</Link>
//                       <Link to="/about#our-purpose" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Purpose</Link>
//                       <Link to="/about#our-innovation" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Innovation</Link>
//                       <Link to="/about#vision-mission" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Vision and Mission</Link>
//                       <Link to="/faq" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors border-t border-gray-100">FAQs</Link>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* PRODUCT MENU DROPDOWN */}
//               {/* <div 
//                 className="relative flex items-center h-full py-2 cursor-pointer group"
//                 onMouseEnter={() => setIsProductMenuOpen(true)}
//                 onMouseLeave={() => setIsProductMenuOpen(false)}
//               >
//                 <Link to="/products" className="flex items-center gap-1 transition-colors hover:text-gycora">
//                   Product
//                   <svg
//                     className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`}
//                     fill="none" viewBox="0 0 24 24" stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </Link>

//                 {isProductMenuOpen && (
//                   <div className="absolute left-0 w-64 pt-2 top-full animate-fade-in-up">
//                     <div className="py-2 bg-white border border-gray-100 shadow-2xl rounded-xl">
//                       <button onClick={() => navigate(menuIds.pinkBrush ? `/product/${menuIds.pinkBrush}` : '/products', { state: { allProducts } })} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">
//                         Ethereal Glow Brush Pink
//                       </button>
//                       <button onClick={() => navigate(menuIds.blackBrush ? `/product/${menuIds.blackBrush}` : '/products', { state: { allProducts } })} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">
//                         Ethereal Glow Brush Black
//                       </button>
//                       <button onClick={() => navigate(menuIds.scalpCare ? `/product/${menuIds.scalpCare}` : '/products', { state: { allProducts } })} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">
//                         Eco Serenity Scalp Care
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div> */}

//               {/* PRODUCT MENU DROPDOWN */}
//               <div 
//                 className="relative flex items-center h-full py-2 cursor-pointer group"
//                 onMouseEnter={() => setIsProductMenuOpen(true)}
//                 onMouseLeave={() => setIsProductMenuOpen(false)}
//               >
//                 <Link to="/products" className="flex items-center gap-1 transition-colors hover:text-gycora">
//                   Product
//                   <svg
//                     className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`}
//                     fill="none" viewBox="0 0 24 24" stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </Link>

//                 {isProductMenuOpen && (
//                   <div className="absolute left-0 w-64 pt-2 top-full animate-fade-in-up">
//                     <div className="py-2 bg-white border border-gray-100 shadow-2xl rounded-xl">
//                       <button 
//                         onClick={() => {
//                           const targetProduct = allProducts.find(p => p.id === menuIds.pinkBrush);
//                           navigate(menuIds.pinkBrush ? `/product/${menuIds.pinkBrush}` : '/products', { 
//                             state: { initialProduct: targetProduct, allProducts } 
//                           });
//                         }} 
//                         className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors"
//                       >
//                         Ethereal Glow Brush Pink
//                       </button>
//                       <button 
//                         onClick={() => {
//                           const targetProduct = allProducts.find(p => p.id === menuIds.blackBrush);
//                           navigate(menuIds.blackBrush ? `/product/${menuIds.blackBrush}` : '/products', { 
//                             state: { initialProduct: targetProduct, allProducts } 
//                           });
//                         }} 
//                         className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors"
//                       >
//                         Ethereal Glow Brush Black
//                       </button>
//                       <button 
//                         onClick={() => {
//                           const targetProduct = allProducts.find(p => p.id === menuIds.scalpCare);
//                           navigate(menuIds.scalpCare ? `/product/${menuIds.scalpCare}` : '/products', { 
//                             state: { initialProduct: targetProduct, allProducts } 
//                           });
//                         }} 
//                         className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors"
//                       >
//                         Eco Serenity Scalp Care
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* [BARU] LINK MENU EVENTS */}
//               <Link to="/events" className="transition-colors hover:text-gycora">Events</Link>
              
//               <Link to="/consult" className="transition-colors hover:text-gycora">Consult</Link>
//             </nav>
//           </div>

//           {/* BAGIAN TENGAH: LOGO */}
//           <div className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer left-1/2 top-1/2" onClick={() => navigate("/")}>
//             <img src={logoGycora} alt="Gycora Logo" className="object-contain h-8 md:h-10" />
//           </div>

//           {/* BAGIAN KANAN: Ikon */}
//           <div className="flex items-center justify-end flex-1 gap-2 md:gap-5">
//             {userData ? (
//               <div className="relative hidden md:block" ref={dropdownRef}>
//                 <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 cursor-pointer group focus:outline-none">
//                   <div className="flex items-center justify-center w-8 h-8 text-sm font-bold transition-colors rounded-full bg-gycora-light text-gycora-dark group-hover:bg-gycora group-hover:text-white">
//                     {userData.first_name.charAt(0)}
//                   </div>
//                   <span className="hidden text-sm font-semibold text-gray-800 transition-colors md:block group-hover:text-gycora">Hi, {userData.first_name}</span>
//                 </button>
//                 {isDropdownOpen && (
//                   <div className="absolute right-0 w-48 py-2 mt-3 bg-white border border-gray-100 shadow-xl rounded-xl animate-fade-in-up">
//                     <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profil Saya</Link>
//                     <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Pesanan Saya</Link>
//                     <button onClick={handleLogout} className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50">Keluar</button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link to="/login" className="hidden text-sm font-medium text-gray-600 transition-colors md:block hover:text-gycora">Login</Link>
//             )}
            
//             <button onClick={() => setIsSearchOpen(true)} className="p-1.5 text-gray-600 hover:text-gycora">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
//             </button>
            
//             {userData && (
//               <button onClick={() => navigate("/chat")} className="relative hidden md:block p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora" title="Chat dengan Pakar">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                 </svg>
//               </button>
//             )}

//             <button onClick={() => navigate("/cart")} className="relative p-1.5 text-gray-600 hover:text-gycora">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
//               {cartTotalItems > 0 && <span className="absolute top-0 right-0 bg-gycora text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1">{cartTotalItems}</span>}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* MOBILE MENU */}
//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 z-[100] md:hidden">
//           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
//           <div className="absolute inset-y-0 left-0 w-4/5 max-w-sm p-4 overflow-y-auto bg-white shadow-2xl">
//              <div className="flex items-center justify-between mb-8">
//                 <img src={logoGycora} alt="Logo" className="h-6" />
//                 <button onClick={() => setIsMobileMenuOpen(false)}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
//              </div>
             
//              {userData && (
//               <div className="flex items-center gap-3 p-4 mb-4 border border-gray-100 rounded-xl bg-emerald-50/30">
//                 <div className="flex items-center justify-center w-12 h-12 font-bold rounded-full bg-gycora-light text-gycora-dark">
//                   {userData.first_name.charAt(0)}
//                 </div>
//                 <div>
//                   <p className="text-sm font-bold text-gray-900">{userData.first_name} {userData.last_name}</p>
//                   <p className="text-xs text-gray-500">{userData.email}</p>
//                 </div>
//               </div>
//             )}

//              <nav className="flex flex-col gap-4">
//                 <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Home</Link>
                
//                 {/* Accordion About Us Mobile */}
//                 <div>
//                    <button onClick={() => setIsMobileAboutMenuOpen(!isMobileAboutMenuOpen)} className="flex items-center justify-between w-full text-lg font-bold">
//                       About Us
//                       <svg className={`w-5 h-5 transition-transform ${isMobileAboutMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
//                    </button>
//                    {isMobileAboutMenuOpen && (
//                       <div className="flex flex-col gap-3 pl-4 mt-2 text-gray-600">
//                          <Link to="/about#our-story" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Story</Link>
//                          <Link to="/about#our-purpose" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Purpose</Link>
//                          <Link to="/about#our-innovation" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Innovation</Link>
//                          <Link to="/about#vision-mission" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Vision and Mission</Link>
//                          <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)} className="text-left text-gycora">FAQs</Link>
//                       </div>
//                    )}
//                 </div>

//                 {/* Accordion Product Mobile */}
//                 {/* <div>
//                    <button onClick={() => setIsMobileProductMenuOpen(!isMobileProductMenuOpen)} className="flex items-center justify-between w-full text-lg font-bold">
//                       Product
//                       <svg className={`w-5 h-5 transition-transform ${isMobileProductMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
//                    </button>
//                    {isMobileProductMenuOpen && (
//                       <div className="flex flex-col gap-3 pl-4 mt-2 text-gray-600">
//                          <button className="text-left" onClick={() => { setIsMobileMenuOpen(false); navigate(menuIds.pinkBrush ? `/product/${menuIds.pinkBrush}` : '/products', { state: { allProducts } }); }}>Ethereal Glow Brush Pink</button>
//                          <button className="text-left" onClick={() => { setIsMobileMenuOpen(false); navigate(menuIds.blackBrush ? `/product/${menuIds.blackBrush}` : '/products', { state: { allProducts } }); }}>Ethereal Glow Brush Black</button>
//                          <button className="text-left" onClick={() => { setIsMobileMenuOpen(false); navigate(menuIds.scalpCare ? `/product/${menuIds.scalpCare}` : '/products', { state: { allProducts } }); }}>Eco Serenity Scalp Care</button>
//                       </div>
//                    )}
//                 </div> */}

//                 <div>
//                    <button onClick={() => setIsMobileProductMenuOpen(!isMobileProductMenuOpen)} className="flex items-center justify-between w-full text-lg font-bold">
//                       Product
//                       <svg className={`w-5 h-5 transition-transform ${isMobileProductMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
//                    </button>
//                    {isMobileProductMenuOpen && (
//                       <div className="flex flex-col gap-3 pl-4 mt-2 text-gray-600">
//                          <button className="text-left" onClick={() => { 
//                            setIsMobileMenuOpen(false); 
//                            const targetProduct = allProducts.find(p => p.id === menuIds.pinkBrush);
//                            navigate(menuIds.pinkBrush ? `/product/${menuIds.pinkBrush}` : '/products', { state: { initialProduct: targetProduct, allProducts } }); 
//                          }}>Ethereal Glow Brush Pink</button>
//                          <button className="text-left" onClick={() => { 
//                            setIsMobileMenuOpen(false); 
//                            const targetProduct = allProducts.find(p => p.id === menuIds.blackBrush);
//                            navigate(menuIds.blackBrush ? `/product/${menuIds.blackBrush}` : '/products', { state: { initialProduct: targetProduct, allProducts } }); 
//                          }}>Ethereal Glow Brush Black</button>
//                          <button className="text-left" onClick={() => { 
//                            setIsMobileMenuOpen(false); 
//                            const targetProduct = allProducts.find(p => p.id === menuIds.scalpCare);
//                            navigate(menuIds.scalpCare ? `/product/${menuIds.scalpCare}` : '/products', { state: { initialProduct: targetProduct, allProducts } }); 
//                          }}>Eco Serenity Scalp Care</button>
//                       </div>
//                    )}
//                 </div>

//                 {/* [BARU] LINK MENU EVENTS MOBILE */}
//                 <Link to="/events" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Events</Link>
                
//                 <Link to="/consult" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Consult</Link>
             
//                 {userData ? (
//                   <>
//                     <div className="my-2 border-t border-gray-100"></div>
//                     <Link to="/chat" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">Live Chat Pakar</Link>
//                     <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">Profil Saya</Link>
//                     <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">Pesanan Saya</Link>
//                     <button onClick={handleLogout} className="mt-4 font-bold text-left text-red-600">Keluar</button>
//                   </>
//                 ) : (
//                   <div className="flex flex-col gap-2 mt-4">
//                     <button onClick={() => { setIsMobileMenuOpen(false); navigate("/login"); }} className="w-full px-4 py-3 text-sm font-bold text-white bg-gray-900 rounded-xl">Masuk</button>
//                     <button onClick={() => { setIsMobileMenuOpen(false); navigate("/register"); }} className="w-full px-4 py-3 text-sm font-bold text-gray-700 border border-gray-200 rounded-xl">Daftar Akun Baru</button>
//                   </div>
//                 )}
//              </nav>
//           </div>
//         </div>
//       )}

//       {/* =====================================================================
//           GLOBAL SEARCH MODAL
//       ===================================================================== */}
//       {isSearchOpen && (
//         <div className="fixed inset-0 z-[100] flex justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
//           <div className="absolute inset-0" onClick={closeSearchModal}></div>

//           <div className="relative flex flex-col w-full max-w-3xl mt-16 md:mt-24 overflow-hidden bg-white shadow-2xl h-[85vh] md:h-[75vh] rounded-t-3xl md:rounded-3xl animate-fade-in-up">
//             <div className="flex flex-col p-4 border-b border-gray-100 md:p-6 bg-gray-50/50">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-bold text-gray-900">
//                   Pencarian Universal
//                 </h2>
//                 <button onClick={closeSearchModal} className="p-1 text-gray-400 bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100">
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               <div className="relative">
//                 <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Cari produk, No. Pesanan (INV-...), atau status..."
//                   className="w-full py-3 pl-12 pr-4 text-sm font-medium transition-all bg-white border border-gray-300 shadow-sm outline-none rounded-xl focus:ring-2 focus:ring-gycora focus:border-transparent"
//                   autoFocus
//                 />
//               </div>

//               <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
//                 {[
//                   { id: "all", label: "Semua Waktu" },
//                   { id: "7d", label: "7 Hari Terakhir" },
//                   { id: "30d", label: "30 Hari Terakhir" },
//                   { id: "90d", label: "3 Bulan Terakhir" },
//                 ].map((filter) => (
//                   <button
//                     key={filter.id}
//                     onClick={() => setTimeFilter(filter.id)}
//                     className={`shrink-0 px-4 py-1.5 text-xs font-bold rounded-full transition-all border ${timeFilter === filter.id ? "bg-gycora text-white border-gycora shadow-md" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100"}`}
//                   >
//                     {filter.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="flex-1 p-4 overflow-y-auto bg-white md:p-6 custom-scrollbar">
//               {searchQuery.trim().length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
//                   <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <p className="text-sm font-medium">Ketik kata kunci untuk memulai pencarian.</p>
//                 </div>
//               ) : isSearching ? (
//                 <div className="flex flex-col items-center justify-center h-full gap-3 text-gycora">
//                   <div className="w-8 h-8 border-4 rounded-full border-emerald-100 border-t-gycora animate-spin"></div>
//                   <p className="text-xs font-bold tracking-widest uppercase animate-pulse">Mencari data...</p>
//                 </div>
//               ) : (
//                 <div className="space-y-8 animate-fade-in">
//                   {searchResults.products && searchResults.products.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">Produk Katalog</h3>
//                       <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
//                         {searchResults.products.map((product: any) => (
//                           <div
//                             key={`prod-${product.id}`}
//                             onClick={() => { closeSearchModal(); navigate(`/product/${product.id}`); }}
//                             className="flex items-center gap-3 p-3 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
//                           >
//                             <img src={product.image_url} alt={product.name} className="object-cover w-12 h-12 rounded-lg bg-gray-50 shrink-0" />
//                             <div className="flex-1 min-w-0">
//                               <p className="text-sm font-bold text-gray-900 truncate group-hover:text-gycora">{product.name}</p>
//                               <p className="text-xs text-gray-500 font-mono mt-0.5">{product.sku}</p>
//                             </div>
//                             <span className="text-sm font-black text-gycora shrink-0">{formatRupiah(product.price)}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {searchResults.transactions && searchResults.transactions.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">Riwayat Transaksi</h3>
//                       <div className="flex flex-col gap-3">
//                         {searchResults.transactions.map((trx: any) => (
//                           <div
//                             key={`trx-${trx.id}`}
//                             onClick={() => { closeSearchModal(); navigate(`/orders`); }}
//                             className="flex items-center justify-between p-4 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
//                           >
//                             <div className="flex items-center gap-4">
//                               <div className="flex items-center justify-center w-10 h-10 text-gray-500 bg-gray-100 rounded-full shadow-sm group-hover:bg-white group-hover:text-gycora">
//                                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                                 </svg>
//                               </div>
//                               <div>
//                                 <p className="font-mono text-sm font-bold text-gray-900 group-hover:text-gycora">{trx.order_id}</p>
//                                 <p className="mt-1 text-xs text-gray-500">{new Date(trx.created_at).toLocaleDateString("id-ID")}</p>
//                               </div>
//                             </div>
//                             <div className="text-right">
//                               <p className="text-sm font-black text-gray-900">{formatRupiah(trx.total_amount)}</p>
//                               <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-600">{trx.status}</span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {!isSearching && searchResults.products?.length === 0 && searchResults.transactions?.length === 0 && searchResults.carts?.length === 0 && (
//                     <div className="flex flex-col items-center justify-center py-10 text-center">
//                       <p className="text-lg font-bold text-gray-900">Oops, tidak ditemukan!</p>
//                       <p className="max-w-sm mt-2 text-sm text-gray-500">Kami tidak dapat menemukan hasil untuk "{searchQuery}" dengan rentang waktu yang Anda pilih.</p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// import { useEffect, useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../context/CartContext";
// // import { useMessage } from "../context/MessageContext";
// import logoGycora from "../assets/gycora_logo.png";
// import { BASE_URL } from "../config/api";

// export default function Header() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
//   const { cartTotalItems } = useCart();

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
//   const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
//   const [isMobileProductMenuOpen, setIsMobileProductMenuOpen] = useState(false);

//   // --- STATE UNTUK MENU ABOUT US ---
//   const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false);
//   const [isMobileAboutMenuOpen, setIsMobileAboutMenuOpen] = useState(false);

//   // --- STATE UNTUK MENYIMPAN ID PRODUK DINAMIS UNTUK MENU ---
//   const [allProducts, setAllProducts] = useState<any[]>([]);
//   const [menuIds, setMenuIds] = useState({
//     pinkBrush: null as number | null,
//     blackBrush: null as number | null,
//     scalpCare: null as number | null,
//   });

//   // --- STATE PENCARIAN ---
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [timeFilter, setTimeFilter] = useState("all");
//   const [isSearching, setIsSearching] = useState(false);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [searchResults, setSearchResults] = useState<any>({
//     products: [],
//     transactions: [],
//     carts: [],
//   });
//   const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     const userToken = localStorage.getItem("user_token");
//     const storedUser = localStorage.getItem("user_data");
//     if (userToken && storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }

//     // FETCH PRODUK UNTUK MENGISI LINK DROPDOWN SECARA OTOMATIS
//     const fetchForMenu = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         const data = await res.json();
//         const products = data.data ? data.data : data;
//         setAllProducts(products);

//         // Cari ID berdasarkan nama (Case Insensitive)
//         const pink = products.find((p: any) => p.name.toLowerCase().includes("brush") && p.name.toLowerCase().includes("pink"));
//         const black = products.find((p: any) => p.name.toLowerCase().includes("brush") && p.name.toLowerCase().includes("black"));
//         const scalp = products.find((p: any) => p.name.toLowerCase().includes("scalp"));

//         setMenuIds({
//           pinkBrush: pink?.id || null,
//           blackBrush: black?.id || null,
//           scalpCare: scalp?.id || null,
//         });
//       } catch (err) {
//         console.error("Gagal load menu produk", err);
//       }
//     };
//     fetchForMenu();
//   }, []);

//   // --- EFEK KLIK DI LUAR DROPDOWN ---
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // --- MENCEGAH SCROLL SAAT MOBILE MENU DIBUKA ---
//   useEffect(() => {
//     if (isMobileMenuOpen || isSearchOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isMobileMenuOpen, isSearchOpen]);

//   const handleLogout = () => {
//     // [PERBAIKAN] Menutup dropdown sebelum menampilkan konfirmasi Swal
//     setIsDropdownOpen(false);
    
//     Swal.fire({
//       title: "Keluar?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#059669",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Ya, Keluar",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("user_token");
//         localStorage.removeItem("user_data");
//         setUserData(null);
//         setIsMobileMenuOpen(false);
//         navigate("/");
//       }
//     });
//   };

//   // --- EFEK PENCARIAN DENGAN DEBOUNCE ---
//   useEffect(() => {
//     if (!isSearchOpen) return;

//     if (searchQuery.trim().length === 0) {
//       setSearchResults({ products: [], transactions: [], carts: [] });
//       setIsSearching(false);
//       return;
//     }

//     setIsSearching(true);

//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }

//     searchTimeoutRef.current = setTimeout(async () => {
//       try {
//         const token = localStorage.getItem("user_token");
//         const res = await fetch(
//           `${BASE_URL}/api/search?q=${encodeURIComponent(searchQuery)}&time=${timeFilter}`,
//           {
//             headers: {
//               Accept: "application/json",
//               ...(token && { Authorization: `Bearer ${token}` }),
//             },
//           }
//         );

//         if (res.ok) {
//           const data = await res.json();
//           setSearchResults(data);
//         } else {
//           setSearchResults({ products: [], transactions: [], carts: [] });
//         }
//       } catch (error) {
//         console.error("Global search error:", error);
//         setSearchResults({ products: [], transactions: [], carts: [] });
//       } finally {
//         setIsSearching(false);
//       }
//     }, 500);

//     return () => {
//       if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
//     };
//   }, [searchQuery, timeFilter, isSearchOpen]);

//   const closeSearchModal = () => {
//     setIsSearchOpen(false);
//     setSearchQuery("");
//     setSearchResults({ products: [], transactions: [], carts: [] });
//   };

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(angka || 0);
//   };

//   return (
//     <>
//       <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
//         <div className="relative flex items-center justify-between h-20 px-4 mx-auto max-w-[1536px] sm:px-6 lg:px-8">
          
//           {/* BAGIAN KIRI: Navigasi Desktop / Hamburger Menu Mobile */}
//           <div className="flex items-center flex-1">
//             <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-gray-600 transition-colors rounded-md md:hidden hover:bg-gray-100">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
//             </button>

//             <nav className="items-center hidden gap-6 text-sm font-semibold text-gray-700 md:flex lg:gap-8">
//               <Link to="/" className="transition-colors hover:text-gycora">Home</Link>

//               {/* ABOUT US MENU DROPDOWN */}
//               <div 
//                 className="relative flex items-center h-full py-2 cursor-pointer group"
//                 onMouseEnter={() => setIsAboutMenuOpen(true)}
//                 onMouseLeave={() => setIsAboutMenuOpen(false)}
//               >
//                 <Link to="/about" className="flex items-center gap-1 transition-colors hover:text-gycora">
//                   About Us
//                   <svg
//                     className={`w-4 h-4 transition-transform duration-200 ${isAboutMenuOpen ? "rotate-180" : ""}`}
//                     fill="none" viewBox="0 0 24 24" stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </Link>

//                 {isAboutMenuOpen && (
//                   <div className="absolute left-0 pt-2 top-full w-52 animate-fade-in-up">
//                     <div className="py-2 bg-white border border-gray-100 shadow-2xl rounded-xl">
//                       <Link to="/about#our-story" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Story</Link>
//                       <Link to="/about#our-purpose" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Purpose</Link>
//                       <Link to="/about#our-innovation" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Innovation</Link>
//                       <Link to="/about#vision-mission" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Vision and Mission</Link>
//                       <Link to="/faq" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors border-t border-gray-100">FAQs</Link>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* PRODUCT MENU DROPDOWN */}
//               <div 
//                 className="relative flex items-center h-full py-2 cursor-pointer group"
//                 onMouseEnter={() => setIsProductMenuOpen(true)}
//                 onMouseLeave={() => setIsProductMenuOpen(false)}
//               >
//                 <Link to="/products" className="flex items-center gap-1 transition-colors hover:text-gycora">
//                   Product
//                   <svg
//                     className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`}
//                     fill="none" viewBox="0 0 24 24" stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </Link>

//                 {isProductMenuOpen && (
//                   <div className="absolute left-0 w-64 pt-2 top-full animate-fade-in-up">
//                     <div className="py-2 bg-white border border-gray-100 shadow-2xl rounded-xl">
//                       <button 
//                         onClick={() => {
//                           const targetProduct = allProducts.find(p => p.id === menuIds.pinkBrush);
//                           navigate(menuIds.pinkBrush ? `/product/${menuIds.pinkBrush}` : '/products', { 
//                             state: { initialProduct: targetProduct, allProducts } 
//                           });
//                         }} 
//                         className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors"
//                       >
//                         Ethereal Glow Brush Pink
//                       </button>
//                       <button 
//                         onClick={() => {
//                           const targetProduct = allProducts.find(p => p.id === menuIds.blackBrush);
//                           navigate(menuIds.blackBrush ? `/product/${menuIds.blackBrush}` : '/products', { 
//                             state: { initialProduct: targetProduct, allProducts } 
//                           });
//                         }} 
//                         className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors"
//                       >
//                         Ethereal Glow Brush Black
//                       </button>
//                       <button 
//                         onClick={() => {
//                           const targetProduct = allProducts.find(p => p.id === menuIds.scalpCare);
//                           navigate(menuIds.scalpCare ? `/product/${menuIds.scalpCare}` : '/products', { 
//                             state: { initialProduct: targetProduct, allProducts } 
//                           });
//                         }} 
//                         className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors"
//                       >
//                         Eco Serenity Scalp Care
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* LINK MENU EVENTS */}
//               <Link to="/events" className="transition-colors hover:text-gycora">Events</Link>
              
//               <Link to="/consult" className="transition-colors hover:text-gycora">Consult</Link>
//             </nav>
//           </div>

//           {/* BAGIAN TENGAH: LOGO */}
//           <div className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer left-1/2 top-1/2" onClick={() => navigate("/")}>
//             <img src={logoGycora} alt="Gycora Logo" className="object-contain h-8 md:h-10" />
//           </div>

//           {/* BAGIAN KANAN: Ikon */}
//           <div className="flex items-center justify-end flex-1 gap-2 md:gap-5">
//             {userData ? (
//               <div className="relative hidden md:block" ref={dropdownRef}>
//                 <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 cursor-pointer group focus:outline-none">
//                   <div className="flex items-center justify-center w-8 h-8 text-sm font-bold transition-colors rounded-full bg-gycora-light text-gycora-dark group-hover:bg-gycora group-hover:text-white">
//                     {userData.first_name.charAt(0)}
//                   </div>
//                   <span className="hidden text-sm font-semibold text-gray-800 transition-colors md:block group-hover:text-gycora">Hi, {userData.first_name}</span>
//                 </button>
//                 {isDropdownOpen && (
//                   <div className="absolute right-0 w-48 py-2 mt-3 bg-white border border-gray-100 shadow-xl rounded-xl animate-fade-in-up">
//                     {/* [PERBAIKAN] Menambahkan onClick untuk menutup dropdown saat link diklik */}
//                     <Link to="/profile" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profil Saya</Link>
//                     <Link to="/orders" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Pesanan Saya</Link>
//                     <button onClick={handleLogout} className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50">Keluar</button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link to="/login" className="hidden text-sm font-medium text-gray-600 transition-colors md:block hover:text-gycora">Login</Link>
//             )}
            
//             <button onClick={() => setIsSearchOpen(true)} className="p-1.5 text-gray-600 hover:text-gycora">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
//             </button>
            
//             {userData && (
//               <button onClick={() => navigate("/chat")} className="relative hidden md:block p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora" title="Chat dengan Pakar">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                 </svg>
//               </button>
//             )}

//             <button onClick={() => navigate("/cart")} className="relative p-1.5 text-gray-600 hover:text-gycora">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
//               {cartTotalItems > 0 && <span className="absolute top-0 right-0 bg-gycora text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1">{cartTotalItems}</span>}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* MOBILE MENU */}
//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 z-[100] md:hidden">
//           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
//           <div className="absolute inset-y-0 left-0 w-4/5 max-w-sm p-4 overflow-y-auto bg-white shadow-2xl">
//              <div className="flex items-center justify-between mb-8">
//                 <img src={logoGycora} alt="Logo" className="h-6" />
//                 <button onClick={() => setIsMobileMenuOpen(false)}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
//              </div>
             
//              {userData && (
//               <div className="flex items-center gap-3 p-4 mb-4 border border-gray-100 rounded-xl bg-emerald-50/30">
//                 <div className="flex items-center justify-center w-12 h-12 font-bold rounded-full bg-gycora-light text-gycora-dark">
//                   {userData.first_name.charAt(0)}
//                 </div>
//                 <div>
//                   <p className="text-sm font-bold text-gray-900">{userData.first_name} {userData.last_name}</p>
//                   <p className="text-xs text-gray-500">{userData.email}</p>
//                 </div>
//               </div>
//             )}

//              <nav className="flex flex-col gap-4">
//                 <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Home</Link>
                
//                 {/* Accordion About Us Mobile */}
//                 <div>
//                    <button onClick={() => setIsMobileAboutMenuOpen(!isMobileAboutMenuOpen)} className="flex items-center justify-between w-full text-lg font-bold">
//                       About Us
//                       <svg className={`w-5 h-5 transition-transform ${isMobileAboutMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
//                    </button>
//                    {isMobileAboutMenuOpen && (
//                       <div className="flex flex-col gap-3 pl-4 mt-2 text-gray-600">
//                          <Link to="/about#our-story" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Story</Link>
//                          <Link to="/about#our-purpose" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Purpose</Link>
//                          <Link to="/about#our-innovation" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Innovation</Link>
//                          <Link to="/about#vision-mission" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Vision and Mission</Link>
//                          <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)} className="text-left text-gycora">FAQs</Link>
//                       </div>
//                    )}
//                 </div>

//                 <div>
//                    <button onClick={() => setIsMobileProductMenuOpen(!isMobileProductMenuOpen)} className="flex items-center justify-between w-full text-lg font-bold">
//                       Product
//                       <svg className={`w-5 h-5 transition-transform ${isMobileProductMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
//                    </button>
//                    {isMobileProductMenuOpen && (
//                       <div className="flex flex-col gap-3 pl-4 mt-2 text-gray-600">
//                          <button className="text-left" onClick={() => { 
//                            setIsMobileMenuOpen(false); 
//                            const targetProduct = allProducts.find(p => p.id === menuIds.pinkBrush);
//                            navigate(menuIds.pinkBrush ? `/product/${menuIds.pinkBrush}` : '/products', { state: { initialProduct: targetProduct, allProducts } }); 
//                          }}>Ethereal Glow Brush Pink</button>
//                          <button className="text-left" onClick={() => { 
//                            setIsMobileMenuOpen(false); 
//                            const targetProduct = allProducts.find(p => p.id === menuIds.blackBrush);
//                            navigate(menuIds.blackBrush ? `/product/${menuIds.blackBrush}` : '/products', { state: { initialProduct: targetProduct, allProducts } }); 
//                          }}>Ethereal Glow Brush Black</button>
//                          <button className="text-left" onClick={() => { 
//                            setIsMobileMenuOpen(false); 
//                            const targetProduct = allProducts.find(p => p.id === menuIds.scalpCare);
//                            navigate(menuIds.scalpCare ? `/product/${menuIds.scalpCare}` : '/products', { state: { initialProduct: targetProduct, allProducts } }); 
//                          }}>Eco Serenity Scalp Care</button>
//                       </div>
//                    )}
//                 </div>

//                 {/* LINK MENU EVENTS MOBILE */}
//                 <Link to="/events" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Events</Link>
                
//                 <Link to="/consult" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Consult</Link>
             
//                 {userData ? (
//                   <>
//                     <div className="my-2 border-t border-gray-100"></div>
//                     <Link to="/chat" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">Live Chat Pakar</Link>
//                     <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">Profil Saya</Link>
//                     <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">Pesanan Saya</Link>
//                     <button onClick={handleLogout} className="mt-4 font-bold text-left text-red-600">Keluar</button>
//                   </>
//                 ) : (
//                   <div className="flex flex-col gap-2 mt-4">
//                     <button onClick={() => { setIsMobileMenuOpen(false); navigate("/login"); }} className="w-full px-4 py-3 text-sm font-bold text-white bg-gray-900 rounded-xl">Masuk</button>
//                     <button onClick={() => { setIsMobileMenuOpen(false); navigate("/register"); }} className="w-full px-4 py-3 text-sm font-bold text-gray-700 border border-gray-200 rounded-xl">Daftar Akun Baru</button>
//                   </div>
//                 )}
//              </nav>
//           </div>
//         </div>
//       )}

//       {/* =====================================================================
//           GLOBAL SEARCH MODAL
//       ===================================================================== */}
//       {isSearchOpen && (
//         <div className="fixed inset-0 z-[100] flex justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
//           <div className="absolute inset-0" onClick={closeSearchModal}></div>

//           <div className="relative flex flex-col w-full max-w-3xl mt-16 md:mt-24 overflow-hidden bg-white shadow-2xl h-[85vh] md:h-[75vh] rounded-t-3xl md:rounded-3xl animate-fade-in-up">
//             <div className="flex flex-col p-4 border-b border-gray-100 md:p-6 bg-gray-50/50">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-bold text-gray-900">
//                   Pencarian Universal
//                 </h2>
//                 <button onClick={closeSearchModal} className="p-1 text-gray-400 bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100">
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               <div className="relative">
//                 <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Cari produk, No. Pesanan (INV-...), atau status..."
//                   className="w-full py-3 pl-12 pr-4 text-sm font-medium transition-all bg-white border border-gray-300 shadow-sm outline-none rounded-xl focus:ring-2 focus:ring-gycora focus:border-transparent"
//                   autoFocus
//                 />
//               </div>

//               <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
//                 {[
//                   { id: "all", label: "Semua Waktu" },
//                   { id: "7d", label: "7 Hari Terakhir" },
//                   { id: "30d", label: "30 Hari Terakhir" },
//                   { id: "90d", label: "3 Bulan Terakhir" },
//                 ].map((filter) => (
//                   <button
//                     key={filter.id}
//                     onClick={() => setTimeFilter(filter.id)}
//                     className={`shrink-0 px-4 py-1.5 text-xs font-bold rounded-full transition-all border ${timeFilter === filter.id ? "bg-gycora text-white border-gycora shadow-md" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100"}`}
//                   >
//                     {filter.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="flex-1 p-4 overflow-y-auto bg-white md:p-6 custom-scrollbar">
//               {searchQuery.trim().length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
//                   <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <p className="text-sm font-medium">Ketik kata kunci untuk memulai pencarian.</p>
//                 </div>
//               ) : isSearching ? (
//                 <div className="flex flex-col items-center justify-center h-full gap-3 text-gycora">
//                   <div className="w-8 h-8 border-4 rounded-full border-emerald-100 border-t-gycora animate-spin"></div>
//                   <p className="text-xs font-bold tracking-widest uppercase animate-pulse">Mencari data...</p>
//                 </div>
//               ) : (
//                 <div className="space-y-8 animate-fade-in">
//                   {searchResults.products && searchResults.products.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">Produk Katalog</h3>
//                       <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
//                         {searchResults.products.map((product: any) => (
//                           <div
//                             key={`prod-${product.id}`}
//                             onClick={() => { closeSearchModal(); navigate(`/product/${product.id}`); }}
//                             className="flex items-center gap-3 p-3 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
//                           >
//                             <img src={product.image_url} alt={product.name} className="object-cover w-12 h-12 rounded-lg bg-gray-50 shrink-0" />
//                             <div className="flex-1 min-w-0">
//                               <p className="text-sm font-bold text-gray-900 truncate group-hover:text-gycora">{product.name}</p>
//                               <p className="text-xs text-gray-500 font-mono mt-0.5">{product.sku}</p>
//                             </div>
//                             <span className="text-sm font-black text-gycora shrink-0">{formatRupiah(product.price)}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {searchResults.transactions && searchResults.transactions.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">Riwayat Transaksi</h3>
//                       <div className="flex flex-col gap-3">
//                         {searchResults.transactions.map((trx: any) => (
//                           <div
//                             key={`trx-${trx.id}`}
//                             onClick={() => { closeSearchModal(); navigate(`/orders`); }}
//                             className="flex items-center justify-between p-4 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
//                           >
//                             <div className="flex items-center gap-4">
//                               <div className="flex items-center justify-center w-10 h-10 text-gray-500 bg-gray-100 rounded-full shadow-sm group-hover:bg-white group-hover:text-gycora">
//                                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                                 </svg>
//                               </div>
//                               <div>
//                                 <p className="font-mono text-sm font-bold text-gray-900 group-hover:text-gycora">{trx.order_id}</p>
//                                 <p className="mt-1 text-xs text-gray-500">{new Date(trx.created_at).toLocaleDateString("id-ID")}</p>
//                               </div>
//                             </div>
//                             <div className="text-right">
//                               <p className="text-sm font-black text-gray-900">{formatRupiah(trx.total_amount)}</p>
//                               <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-600">{trx.status}</span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {!isSearching && searchResults.products?.length === 0 && searchResults.transactions?.length === 0 && searchResults.carts?.length === 0 && (
//                     <div className="flex flex-col items-center justify-center py-10 text-center">
//                       <p className="text-lg font-bold text-gray-900">Oops, tidak ditemukan!</p>
//                       <p className="max-w-sm mt-2 text-sm text-gray-500">Kami tidak dapat menemukan hasil untuk "{searchQuery}" dengan rentang waktu yang Anda pilih.</p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// import { useEffect, useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../context/CartContext";
// // import { useMessage } from "../context/MessageContext";
// import logoGycora from "../assets/gycora_logo.png";
// import { BASE_URL } from "../config/api";

// export default function Header() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
//   const { cartTotalItems } = useCart();

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
//   const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
//   const [isMobileProductMenuOpen, setIsMobileProductMenuOpen] = useState(false);

//   const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false);
//   const [isMobileAboutMenuOpen, setIsMobileAboutMenuOpen] = useState(false);

//   const [allProducts, setAllProducts] = useState<any[]>([]);
//   // [PERBAIKAN] Mengubah tipe dari number | null menjadi string | null karena sekarang menyimpan slug
//   const [menuIds, setMenuIds] = useState({
//     pinkBrush: null as string | null,
//     blackBrush: null as string | null,
//     scalpCare: null as string | null,
//   });

//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [timeFilter, setTimeFilter] = useState("all");
//   const [isSearching, setIsSearching] = useState(false);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [searchResults, setSearchResults] = useState<any>({
//     products: [],
//     transactions: [],
//     carts: [],
//   });
//   const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     const userToken = localStorage.getItem("user_token");
//     const storedUser = localStorage.getItem("user_data");
//     if (userToken && storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }

//     const fetchForMenu = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         const data = await res.json();
//         const products = data.data ? data.data : data;
//         setAllProducts(products);

//         const pink = products.find((p: any) => p.name.toLowerCase().includes("brush") && p.name.toLowerCase().includes("pink"));
//         const black = products.find((p: any) => p.name.toLowerCase().includes("brush") && p.name.toLowerCase().includes("black"));
//         const scalp = products.find((p: any) => p.name.toLowerCase().includes("scalp"));

//         // [PERBAIKAN] Menyimpan slug, bukan id
//         setMenuIds({
//           pinkBrush: pink?.slug || null,
//           blackBrush: black?.slug || null,
//           scalpCare: scalp?.slug || null,
//         });
//       } catch (err) {
//         console.error("Gagal load menu produk", err);
//       }
//     };
//     fetchForMenu();
//   }, []);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (isMobileMenuOpen || isSearchOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isMobileMenuOpen, isSearchOpen]);

//   const handleLogout = () => {
//     setIsDropdownOpen(false);
    
//     Swal.fire({
//       title: "Keluar?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#059669",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Ya, Keluar",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("user_token");
//         localStorage.removeItem("user_data");
//         setUserData(null);
//         setIsMobileMenuOpen(false);
//         navigate("/");
//       }
//     });
//   };

//   useEffect(() => {
//     if (!isSearchOpen) return;

//     if (searchQuery.trim().length === 0) {
//       setSearchResults({ products: [], transactions: [], carts: [] });
//       setIsSearching(false);
//       return;
//     }

//     setIsSearching(true);

//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }

//     searchTimeoutRef.current = setTimeout(async () => {
//       try {
//         const token = localStorage.getItem("user_token");
//         const res = await fetch(
//           `${BASE_URL}/api/search?q=${encodeURIComponent(searchQuery)}&time=${timeFilter}`,
//           {
//             headers: {
//               Accept: "application/json",
//               ...(token && { Authorization: `Bearer ${token}` }),
//             },
//           }
//         );

//         if (res.ok) {
//           const data = await res.json();
//           setSearchResults(data);
//         } else {
//           setSearchResults({ products: [], transactions: [], carts: [] });
//         }
//       } catch (error) {
//         console.error("Global search error:", error);
//         setSearchResults({ products: [], transactions: [], carts: [] });
//       } finally {
//         setIsSearching(false);
//       }
//     }, 500);

//     return () => {
//       if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
//     };
//   }, [searchQuery, timeFilter, isSearchOpen]);

//   const closeSearchModal = () => {
//     setIsSearchOpen(false);
//     setSearchQuery("");
//     setSearchResults({ products: [], transactions: [], carts: [] });
//   };

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(angka || 0);
//   };

//   return (
//     <>
//       <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
//         <div className="relative flex items-center justify-between h-20 px-4 mx-auto max-w-[1536px] sm:px-6 lg:px-8">
          
//           <div className="flex items-center flex-1">
//             <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-gray-600 transition-colors rounded-md md:hidden hover:bg-gray-100">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
//             </button>

//             <nav className="items-center hidden gap-6 text-sm font-semibold text-gray-700 md:flex lg:gap-8">
//               <Link to="/" className="transition-colors hover:text-gycora">Home</Link>

//               <div 
//                 className="relative flex items-center h-full py-2 cursor-pointer group"
//                 onMouseEnter={() => setIsAboutMenuOpen(true)}
//                 onMouseLeave={() => setIsAboutMenuOpen(false)}
//               >
//                 <Link to="/about" className="flex items-center gap-1 transition-colors hover:text-gycora">
//                   About Us
//                   <svg
//                     className={`w-4 h-4 transition-transform duration-200 ${isAboutMenuOpen ? "rotate-180" : ""}`}
//                     fill="none" viewBox="0 0 24 24" stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </Link>

//                 {isAboutMenuOpen && (
//                   <div className="absolute left-0 pt-2 top-full w-52 animate-fade-in-up">
//                     <div className="py-2 bg-white border border-gray-100 shadow-2xl rounded-xl">
//                       <Link to="/about#our-story" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Story</Link>
//                       <Link to="/about#our-purpose" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Purpose</Link>
//                       <Link to="/about#our-innovation" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Innovation</Link>
//                       <Link to="/about#vision-mission" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Vision and Mission</Link>
//                       <Link to="/faq" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors border-t border-gray-100">FAQs</Link>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div 
//                 className="relative flex items-center h-full py-2 cursor-pointer group"
//                 onMouseEnter={() => setIsProductMenuOpen(true)}
//                 onMouseLeave={() => setIsProductMenuOpen(false)}
//               >
//                 <Link to="/products" className="flex items-center gap-1 transition-colors hover:text-gycora">
//                   Product
//                   <svg
//                     className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`}
//                     fill="none" viewBox="0 0 24 24" stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </Link>

//                 {isProductMenuOpen && (
//                   <div className="absolute left-0 w-64 pt-2 top-full animate-fade-in-up">
//                     <div className="py-2 bg-white border border-gray-100 shadow-2xl rounded-xl">
//                       <button 
//                         onClick={() => {
//                           // [PERBAIKAN] Pencarian berdasarkan slug
//                           const targetProduct = allProducts.find(p => p.slug === menuIds.pinkBrush);
//                           navigate(menuIds.pinkBrush ? `/product/${menuIds.pinkBrush}` : '/products', { 
//                             state: { initialProduct: targetProduct, allProducts } 
//                           });
//                         }} 
//                         className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors"
//                       >
//                         Ethereal Glow Brush Pink
//                       </button>
//                       <button 
//                         onClick={() => {
//                           const targetProduct = allProducts.find(p => p.slug === menuIds.blackBrush);
//                           navigate(menuIds.blackBrush ? `/product/${menuIds.blackBrush}` : '/products', { 
//                             state: { initialProduct: targetProduct, allProducts } 
//                           });
//                         }} 
//                         className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors"
//                       >
//                         Ethereal Glow Brush Black
//                       </button>
//                       <button 
//                         onClick={() => {
//                           const targetProduct = allProducts.find(p => p.slug === menuIds.scalpCare);
//                           navigate(menuIds.scalpCare ? `/product/${menuIds.scalpCare}` : '/products', { 
//                             state: { initialProduct: targetProduct, allProducts } 
//                           });
//                         }} 
//                         className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors"
//                       >
//                         Eco Serenity Scalp Care
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <Link to="/events" className="transition-colors hover:text-gycora">Events</Link>
//               <Link to="/consult" className="transition-colors hover:text-gycora">Consult</Link>
//             </nav>
//           </div>

//           <div className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer left-1/2 top-1/2" onClick={() => navigate("/")}>
//             <img src={logoGycora} alt="Gycora Logo" className="object-contain h-8 md:h-10" />
//           </div>

//           <div className="flex items-center justify-end flex-1 gap-2 md:gap-5">
//             {userData ? (
//               <div className="relative hidden md:block" ref={dropdownRef}>
//                 <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 cursor-pointer group focus:outline-none">
//                   <div className="flex items-center justify-center w-8 h-8 text-sm font-bold transition-colors rounded-full bg-gycora-light text-gycora-dark group-hover:bg-gycora group-hover:text-white">
//                     {userData.first_name.charAt(0)}
//                   </div>
//                   <span className="hidden text-sm font-semibold text-gray-800 transition-colors md:block group-hover:text-gycora">Hi, {userData.first_name}</span>
//                 </button>
//                 {isDropdownOpen && (
//                   <div className="absolute right-0 w-48 py-2 mt-3 bg-white border border-gray-100 shadow-xl rounded-xl animate-fade-in-up">
//                     <Link to="/profile" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profil Saya</Link>
//                     <Link to="/orders" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Pesanan Saya</Link>
//                     <button onClick={handleLogout} className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50">Keluar</button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link to="/login" className="hidden text-sm font-medium text-gray-600 transition-colors md:block hover:text-gycora">Login</Link>
//             )}
            
//             <button onClick={() => setIsSearchOpen(true)} className="p-1.5 text-gray-600 hover:text-gycora">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
//             </button>
            
//             {userData && (
//               <button onClick={() => navigate("/chat")} className="relative hidden md:block p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora" title="Chat dengan Pakar">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                 </svg>
//               </button>
//             )}

//             <button onClick={() => navigate("/cart")} className="relative p-1.5 text-gray-600 hover:text-gycora">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
//               {cartTotalItems > 0 && <span className="absolute top-0 right-0 bg-gycora text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1">{cartTotalItems}</span>}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* MOBILE MENU */}
//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 z-[100] md:hidden">
//           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
//           <div className="absolute inset-y-0 left-0 w-4/5 max-w-sm p-4 overflow-y-auto bg-white shadow-2xl">
//              <div className="flex items-center justify-between mb-8">
//                 <img src={logoGycora} alt="Logo" className="h-6" />
//                 <button onClick={() => setIsMobileMenuOpen(false)}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
//              </div>
             
//              {userData && (
//               <div className="flex items-center gap-3 p-4 mb-4 border border-gray-100 rounded-xl bg-emerald-50/30">
//                 <div className="flex items-center justify-center w-12 h-12 font-bold rounded-full bg-gycora-light text-gycora-dark">
//                   {userData.first_name.charAt(0)}
//                 </div>
//                 <div>
//                   <p className="text-sm font-bold text-gray-900">{userData.first_name} {userData.last_name}</p>
//                   <p className="text-xs text-gray-500">{userData.email}</p>
//                 </div>
//               </div>
//             )}

//              <nav className="flex flex-col gap-4">
//                 <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Home</Link>
                
//                 <div>
//                    <button onClick={() => setIsMobileAboutMenuOpen(!isMobileAboutMenuOpen)} className="flex items-center justify-between w-full text-lg font-bold">
//                       About Us
//                       <svg className={`w-5 h-5 transition-transform ${isMobileAboutMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
//                    </button>
//                    {isMobileAboutMenuOpen && (
//                       <div className="flex flex-col gap-3 pl-4 mt-2 text-gray-600">
//                          <Link to="/about#our-story" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Story</Link>
//                          <Link to="/about#our-purpose" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Purpose</Link>
//                          <Link to="/about#our-innovation" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Innovation</Link>
//                          <Link to="/about#vision-mission" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Vision and Mission</Link>
//                          <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)} className="text-left text-gycora">FAQs</Link>
//                       </div>
//                    )}
//                 </div>

//                 <div>
//                    <button onClick={() => setIsMobileProductMenuOpen(!isMobileProductMenuOpen)} className="flex items-center justify-between w-full text-lg font-bold">
//                       Product
//                       <svg className={`w-5 h-5 transition-transform ${isMobileProductMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
//                    </button>
//                    {isMobileProductMenuOpen && (
//                       <div className="flex flex-col gap-3 pl-4 mt-2 text-gray-600">
//                          <button className="text-left" onClick={() => { 
//                            setIsMobileMenuOpen(false); 
//                            const targetProduct = allProducts.find(p => p.slug === menuIds.pinkBrush);
//                            navigate(menuIds.pinkBrush ? `/product/${menuIds.pinkBrush}` : '/products', { state: { initialProduct: targetProduct, allProducts } }); 
//                          }}>Ethereal Glow Brush Pink</button>
//                          <button className="text-left" onClick={() => { 
//                            setIsMobileMenuOpen(false); 
//                            const targetProduct = allProducts.find(p => p.slug === menuIds.blackBrush);
//                            navigate(menuIds.blackBrush ? `/product/${menuIds.blackBrush}` : '/products', { state: { initialProduct: targetProduct, allProducts } }); 
//                          }}>Ethereal Glow Brush Black</button>
//                          <button className="text-left" onClick={() => { 
//                            setIsMobileMenuOpen(false); 
//                            const targetProduct = allProducts.find(p => p.slug === menuIds.scalpCare);
//                            navigate(menuIds.scalpCare ? `/product/${menuIds.scalpCare}` : '/products', { state: { initialProduct: targetProduct, allProducts } }); 
//                          }}>Eco Serenity Scalp Care</button>
//                       </div>
//                    )}
//                 </div>

//                 <Link to="/events" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Events</Link>
//                 <Link to="/consult" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Consult</Link>
             
//                 {userData ? (
//                   <>
//                     <div className="my-2 border-t border-gray-100"></div>
//                     <Link to="/chat" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">Live Chat Pakar</Link>
//                     <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">Profil Saya</Link>
//                     <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">Pesanan Saya</Link>
//                     <button onClick={handleLogout} className="mt-4 font-bold text-left text-red-600">Keluar</button>
//                   </>
//                 ) : (
//                   <div className="flex flex-col gap-2 mt-4">
//                     <button onClick={() => { setIsMobileMenuOpen(false); navigate("/login"); }} className="w-full px-4 py-3 text-sm font-bold text-white bg-gray-900 rounded-xl">Masuk</button>
//                     <button onClick={() => { setIsMobileMenuOpen(false); navigate("/register"); }} className="w-full px-4 py-3 text-sm font-bold text-gray-700 border border-gray-200 rounded-xl">Daftar Akun Baru</button>
//                   </div>
//                 )}
//              </nav>
//           </div>
//         </div>
//       )}

//       {/* GLOBAL SEARCH MODAL */}
//       {isSearchOpen && (
//         <div className="fixed inset-0 z-[100] flex justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
//           <div className="absolute inset-0" onClick={closeSearchModal}></div>

//           <div className="relative flex flex-col w-full max-w-3xl mt-16 md:mt-24 overflow-hidden bg-white shadow-2xl h-[85vh] md:h-[75vh] rounded-t-3xl md:rounded-3xl animate-fade-in-up">
//             <div className="flex flex-col p-4 border-b border-gray-100 md:p-6 bg-gray-50/50">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-bold text-gray-900">
//                   Pencarian Universal
//                 </h2>
//                 <button onClick={closeSearchModal} className="p-1 text-gray-400 bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100">
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               <div className="relative">
//                 <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Cari produk, No. Pesanan (INV-...), atau status..."
//                   className="w-full py-3 pl-12 pr-4 text-sm font-medium transition-all bg-white border border-gray-300 shadow-sm outline-none rounded-xl focus:ring-2 focus:ring-gycora focus:border-transparent"
//                   autoFocus
//                 />
//               </div>

//               <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
//                 {[
//                   { id: "all", label: "Semua Waktu" },
//                   { id: "7d", label: "7 Hari Terakhir" },
//                   { id: "30d", label: "30 Hari Terakhir" },
//                   { id: "90d", label: "3 Bulan Terakhir" },
//                 ].map((filter) => (
//                   <button
//                     key={filter.id}
//                     onClick={() => setTimeFilter(filter.id)}
//                     className={`shrink-0 px-4 py-1.5 text-xs font-bold rounded-full transition-all border ${timeFilter === filter.id ? "bg-gycora text-white border-gycora shadow-md" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100"}`}
//                   >
//                     {filter.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="flex-1 p-4 overflow-y-auto bg-white md:p-6 custom-scrollbar">
//               {searchQuery.trim().length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
//                   <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <p className="text-sm font-medium">Ketik kata kunci untuk memulai pencarian.</p>
//                 </div>
//               ) : isSearching ? (
//                 <div className="flex flex-col items-center justify-center h-full gap-3 text-gycora">
//                   <div className="w-8 h-8 border-4 rounded-full border-emerald-100 border-t-gycora animate-spin"></div>
//                   <p className="text-xs font-bold tracking-widest uppercase animate-pulse">Mencari data...</p>
//                 </div>
//               ) : (
//                 <div className="space-y-8 animate-fade-in">
//                   {searchResults.products && searchResults.products.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">Produk Katalog</h3>
//                       <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
//                         {searchResults.products.map((product: any) => (
//                           <div
//                             key={`prod-${product.id}`}
//                             onClick={() => { closeSearchModal(); navigate(`/product/${product.slug}`); }} // [PERBAIKAN] Menggunakan slug di Global Search
//                             className="flex items-center gap-3 p-3 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
//                           >
//                             <img src={product.image_url} alt={product.name} className="object-cover w-12 h-12 rounded-lg bg-gray-50 shrink-0" />
//                             <div className="flex-1 min-w-0">
//                               <p className="text-sm font-bold text-gray-900 truncate group-hover:text-gycora">{product.name}</p>
//                               <p className="text-xs text-gray-500 font-mono mt-0.5">{product.sku}</p>
//                             </div>
//                             <span className="text-sm font-black text-gycora shrink-0">{formatRupiah(product.price)}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {searchResults.transactions && searchResults.transactions.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">Riwayat Transaksi</h3>
//                       <div className="flex flex-col gap-3">
//                         {searchResults.transactions.map((trx: any) => (
//                           <div
//                             key={`trx-${trx.id}`}
//                             onClick={() => { closeSearchModal(); navigate(`/orders`); }}
//                             className="flex items-center justify-between p-4 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
//                           >
//                             <div className="flex items-center gap-4">
//                               <div className="flex items-center justify-center w-10 h-10 text-gray-500 bg-gray-100 rounded-full shadow-sm group-hover:bg-white group-hover:text-gycora">
//                                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                                 </svg>
//                               </div>
//                               <div>
//                                 <p className="font-mono text-sm font-bold text-gray-900 group-hover:text-gycora">{trx.order_id}</p>
//                                 <p className="mt-1 text-xs text-gray-500">{new Date(trx.created_at).toLocaleDateString("id-ID")}</p>
//                               </div>
//                             </div>
//                             <div className="text-right">
//                               <p className="text-sm font-black text-gray-900">{formatRupiah(trx.total_amount)}</p>
//                               <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-600">{trx.status}</span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {!isSearching && searchResults.products?.length === 0 && searchResults.transactions?.length === 0 && searchResults.carts?.length === 0 && (
//                     <div className="flex flex-col items-center justify-center py-10 text-center">
//                       <p className="text-lg font-bold text-gray-900">Oops, tidak ditemukan!</p>
//                       <p className="max-w-sm mt-2 text-sm text-gray-500">Kami tidak dapat menemukan hasil untuk "{searchQuery}" dengan rentang waktu yang Anda pilih.</p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// import { useEffect, useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../context/CartContext";
// // import { useMessage } from "../context/MessageContext";
// import logoGycora from "../assets/gycora_logo.png";
// import { BASE_URL } from "../config/api";

// export default function Header() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
//   const { cartTotalItems } = useCart();

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
//   const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
//   const [isMobileProductMenuOpen, setIsMobileProductMenuOpen] = useState(false);

//   const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false);
//   const [isMobileAboutMenuOpen, setIsMobileAboutMenuOpen] = useState(false);

//   // --- STATE UNTUK DROPDOWN BAHASA ---
//   const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
//   const langDropdownRef = useRef<HTMLDivElement>(null);
//   const [currentLang, setCurrentLang] = useState<"id" | "en">(
//     (localStorage.getItem("app_lang") as "id" | "en") || "id"
//   );

//   const [allProducts, setAllProducts] = useState<any[]>([]);
//   const [menuIds, setMenuIds] = useState({
//     pinkBrush: null as string | null,
//     blackBrush: null as string | null,
//     scalpCare: null as string | null,
//   });

//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [timeFilter, setTimeFilter] = useState("all");
//   const [isSearching, setIsSearching] = useState(false);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [searchResults, setSearchResults] = useState<any>({
//     products: [],
//     transactions: [],
//     carts: [],
//   });
//   const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     const userToken = localStorage.getItem("user_token");
//     const storedUser = localStorage.getItem("user_data");
//     if (userToken && storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }

//     const fetchForMenu = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         const data = await res.json();
//         const products = data.data ? data.data : data;
//         setAllProducts(products);

//         const pink = products.find((p: any) => p.name.toLowerCase().includes("brush") && p.name.toLowerCase().includes("pink"));
//         const black = products.find((p: any) => p.name.toLowerCase().includes("brush") && p.name.toLowerCase().includes("black"));
//         const scalp = products.find((p: any) => p.name.toLowerCase().includes("scalp"));

//         setMenuIds({
//           pinkBrush: pink?.slug || null,
//           blackBrush: black?.slug || null,
//           scalpCare: scalp?.slug || null,
//         });
//       } catch (err) {
//         console.error("Gagal load menu produk", err);
//       }
//     };
//     fetchForMenu();
//   }, []);

//   // --- FUNGSI MEMICU TERJEMAHAN GOOGLE ---
//   const triggerGoogleTranslate = (langCode: "id" | "en") => {
//     const selectEl = document.querySelector(".goog-te-combo") as HTMLSelectElement;
//     if (selectEl) {
//       selectEl.value = langCode;
//       selectEl.dispatchEvent(new Event("change"));
//     }
//   };

//   // Setel bahasa awal saat komponen dimuat
//   useEffect(() => {
//     const initLangTimeout = setTimeout(() => {
//       if (currentLang === "en") {
//         triggerGoogleTranslate("en");
//       }
//     }, 1500);
//     return () => clearTimeout(initLangTimeout);
//   }, []);

//   // Handler mengubah bahasa dari dropdown
//   const handleLanguageChange = (lang: "id" | "en") => {
//     setCurrentLang(lang);
//     localStorage.setItem("app_lang", lang);
//     triggerGoogleTranslate(lang);
//     setIsLangMenuOpen(false); // Tutup menu setelah memilih
//   };

//   // --- EFEK KLIK DI LUAR DROPDOWN (PROFIL & BAHASA) ---
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//       if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
//         setIsLangMenuOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (isMobileMenuOpen || isSearchOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isMobileMenuOpen, isSearchOpen]);

//   const handleLogout = () => {
//     setIsDropdownOpen(false);
    
//     Swal.fire({
//       title: "Keluar?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#059669",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Ya, Keluar",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("user_token");
//         localStorage.removeItem("user_data");
//         setUserData(null);
//         setIsMobileMenuOpen(false);
//         navigate("/");
//       }
//     });
//   };

//   useEffect(() => {
//     if (!isSearchOpen) return;

//     if (searchQuery.trim().length === 0) {
//       setSearchResults({ products: [], transactions: [], carts: [] });
//       setIsSearching(false);
//       return;
//     }

//     setIsSearching(true);

//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }

//     searchTimeoutRef.current = setTimeout(async () => {
//       try {
//         const token = localStorage.getItem("user_token");
//         const res = await fetch(
//           `${BASE_URL}/api/search?q=${encodeURIComponent(searchQuery)}&time=${timeFilter}`,
//           {
//             headers: {
//               Accept: "application/json",
//               ...(token && { Authorization: `Bearer ${token}` }),
//             },
//           }
//         );

//         if (res.ok) {
//           const data = await res.json();
//           setSearchResults(data);
//         } else {
//           setSearchResults({ products: [], transactions: [], carts: [] });
//         }
//       } catch (error) {
//         console.error("Global search error:", error);
//         setSearchResults({ products: [], transactions: [], carts: [] });
//       } finally {
//         setIsSearching(false);
//       }
//     }, 500);

//     return () => {
//       if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
//     };
//   }, [searchQuery, timeFilter, isSearchOpen]);

//   const closeSearchModal = () => {
//     setIsSearchOpen(false);
//     setSearchQuery("");
//     setSearchResults({ products: [], transactions: [], carts: [] });
//   };

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(angka || 0);
//   };

//   return (
//     <>
//       <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm notranslate">
//         <div className="relative flex items-center justify-between h-20 px-4 mx-auto max-w-[1536px] sm:px-6 lg:px-8">
          
//           <div className="flex items-center flex-1">
//             <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-gray-600 transition-colors rounded-md md:hidden hover:bg-gray-100">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
//             </button>

//             <nav className="items-center hidden gap-6 text-sm font-semibold text-gray-700 md:flex lg:gap-8">
//               <Link to="/" className="transition-colors translate hover:text-gycora">Home</Link>

//               <div 
//                 className="relative flex items-center h-full py-2 cursor-pointer group"
//                 onMouseEnter={() => setIsAboutMenuOpen(true)}
//                 onMouseLeave={() => setIsAboutMenuOpen(false)}
//               >
//                 <Link to="/about" className="flex items-center gap-1 transition-colors translate hover:text-gycora">
//                   About Us
//                   <svg
//                     className={`w-4 h-4 transition-transform duration-200 ${isAboutMenuOpen ? "rotate-180" : ""}`}
//                     fill="none" viewBox="0 0 24 24" stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </Link>

//                 {isAboutMenuOpen && (
//                   <div className="absolute left-0 pt-2 top-full w-52 animate-fade-in-up translate">
//                     <div className="py-2 bg-white border border-gray-100 shadow-2xl rounded-xl">
//                       <Link to="/about#our-story" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Story</Link>
//                       <Link to="/about#our-purpose" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Purpose</Link>
//                       <Link to="/about#our-innovation" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Innovation</Link>
//                       <Link to="/about#vision-mission" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Vision and Mission</Link>
//                       <Link to="/faq" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors border-t border-gray-100">FAQs</Link>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div 
//                 className="relative flex items-center h-full py-2 cursor-pointer group"
//                 onMouseEnter={() => setIsProductMenuOpen(true)}
//                 onMouseLeave={() => setIsProductMenuOpen(false)}
//               >
//                 <Link to="/products" className="flex items-center gap-1 transition-colors translate hover:text-gycora">
//                   Product
//                   <svg
//                     className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`}
//                     fill="none" viewBox="0 0 24 24" stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </Link>

//                 {isProductMenuOpen && (
//                   <div className="absolute left-0 w-64 pt-2 top-full animate-fade-in-up">
//                     <div className="py-2 bg-white border border-gray-100 shadow-2xl rounded-xl notranslate">
//                       <button 
//                         onClick={() => {
//                           const targetProduct = allProducts.find(p => p.slug === menuIds.pinkBrush);
//                           navigate(menuIds.pinkBrush ? `/product/${menuIds.pinkBrush}` : '/products', { 
//                             state: { initialProduct: targetProduct, allProducts } 
//                           });
//                         }} 
//                         className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors"
//                       >
//                         Ethereal Glow Brush Pink
//                       </button>
//                       <button 
//                         onClick={() => {
//                           const targetProduct = allProducts.find(p => p.slug === menuIds.blackBrush);
//                           navigate(menuIds.blackBrush ? `/product/${menuIds.blackBrush}` : '/products', { 
//                             state: { initialProduct: targetProduct, allProducts } 
//                           });
//                         }} 
//                         className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors"
//                       >
//                         Ethereal Glow Brush Black
//                       </button>
//                       <button 
//                         onClick={() => {
//                           const targetProduct = allProducts.find(p => p.slug === menuIds.scalpCare);
//                           navigate(menuIds.scalpCare ? `/product/${menuIds.scalpCare}` : '/products', { 
//                             state: { initialProduct: targetProduct, allProducts } 
//                           });
//                         }} 
//                         className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors"
//                       >
//                         Eco Serenity Scalp Care
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <Link to="/events" className="transition-colors translate hover:text-gycora">Events</Link>
//               <Link to="/consult" className="transition-colors translate hover:text-gycora">Consult</Link>
//             </nav>
//           </div>

//           <div className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer left-1/2 top-1/2 notranslate" onClick={() => navigate("/")}>
//             <img src={logoGycora} alt="Gycora Logo" className="object-contain h-8 md:h-10" />
//           </div>

//           <div className="flex items-center justify-end flex-1 gap-2 md:gap-5">
            
//             {/* --- DROPDOWN BAHASA (DESKTOP & MOBILE) --- */}
//             <div className="relative" ref={langDropdownRef}>
//               <button 
//                 onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
//                 className="flex items-center gap-1 p-1.5 text-xs font-bold text-gray-600 uppercase transition-colors rounded-lg hover:bg-gray-100 hover:text-gycora notranslate"
//                 title="Ganti Bahasa"
//               >
//                 <span>{currentLang}</span>
//                 <svg className={`w-3 h-3 transition-transform ${isLangMenuOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>
              
//               {isLangMenuOpen && (
//                 <div className="absolute right-0 z-50 w-32 py-2 mt-2 bg-white border border-gray-100 shadow-xl rounded-xl animate-fade-in-up">
//                   <button 
//                     onClick={() => handleLanguageChange("id")}
//                     className={`w-full text-left px-4 py-2 text-sm transition-colors ${currentLang === 'id' ? 'text-gycora font-bold bg-emerald-50' : 'text-gray-700 hover:bg-gray-50'}`}
//                   >
//                     🇮🇩 Indonesia
//                   </button>
//                   <button 
//                     onClick={() => handleLanguageChange("en")}
//                     className={`w-full text-left px-4 py-2 text-sm transition-colors ${currentLang === 'en' ? 'text-gycora font-bold bg-emerald-50' : 'text-gray-700 hover:bg-gray-50'}`}
//                   >
//                     🇬🇧 English
//                   </button>
//                 </div>
//               )}
//             </div>

//             {userData ? (
//               <div className="relative hidden md:block" ref={dropdownRef}>
//                 <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 cursor-pointer group focus:outline-none">
//                   <div className="flex items-center justify-center w-8 h-8 text-sm font-bold transition-colors rounded-full bg-gycora-light text-gycora-dark group-hover:bg-gycora group-hover:text-white notranslate">
//                     {userData.first_name.charAt(0)}
//                   </div>
//                   <span className="hidden text-sm font-semibold text-gray-800 transition-colors md:block group-hover:text-gycora notranslate">Hi, {userData.first_name}</span>
//                 </button>
//                 {isDropdownOpen && (
//                   <div className="absolute right-0 w-48 py-2 mt-3 bg-white border border-gray-100 shadow-xl rounded-xl animate-fade-in-up translate">
//                     <Link to="/profile" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profil Saya</Link>
//                     <Link to="/orders" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Pesanan Saya</Link>
//                     <button onClick={handleLogout} className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50">Keluar</button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link to="/login" className="hidden text-sm font-medium text-gray-600 transition-colors md:block hover:text-gycora translate">Login</Link>
//             )}
            
//             <button onClick={() => setIsSearchOpen(true)} className="p-1.5 text-gray-600 hover:text-gycora">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
//             </button>
            
//             {userData && (
//               <button onClick={() => navigate("/chat")} className="relative hidden md:block p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora" title="Chat dengan Pakar">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                 </svg>
//               </button>
//             )}

//             <button onClick={() => navigate("/cart")} className="relative p-1.5 text-gray-600 hover:text-gycora">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
//               {cartTotalItems > 0 && <span className="absolute top-0 right-0 bg-gycora text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1 notranslate">{cartTotalItems}</span>}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* MOBILE MENU */}
//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 z-[100] md:hidden">
//           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
//           <div className="absolute inset-y-0 left-0 w-4/5 max-w-sm p-4 overflow-y-auto bg-white shadow-2xl translate">
//              <div className="flex items-center justify-between mb-8 notranslate">
//                 <img src={logoGycora} alt="Logo" className="h-6" />
//                 <button onClick={() => setIsMobileMenuOpen(false)}><svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
//              </div>
             
//              {userData && (
//               <div className="flex items-center gap-3 p-4 mb-4 border border-gray-100 rounded-xl bg-emerald-50/30 notranslate">
//                 <div className="flex items-center justify-center w-12 h-12 font-bold rounded-full bg-gycora-light text-gycora-dark">
//                   {userData.first_name.charAt(0)}
//                 </div>
//                 <div>
//                   <p className="text-sm font-bold text-gray-900">{userData.first_name} {userData.last_name}</p>
//                   <p className="text-xs text-gray-500">{userData.email}</p>
//                 </div>
//               </div>
//             )}

//              <nav className="flex flex-col gap-4">
//                 <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Home</Link>
                
//                 <div>
//                    <button onClick={() => setIsMobileAboutMenuOpen(!isMobileAboutMenuOpen)} className="flex items-center justify-between w-full text-lg font-bold">
//                       About Us
//                       <svg className={`w-5 h-5 transition-transform ${isMobileAboutMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
//                    </button>
//                    {isMobileAboutMenuOpen && (
//                       <div className="flex flex-col gap-3 pl-4 mt-2 text-gray-600">
//                          <Link to="/about#our-story" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Story</Link>
//                          <Link to="/about#our-purpose" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Purpose</Link>
//                          <Link to="/about#our-innovation" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Innovation</Link>
//                          <Link to="/about#vision-mission" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Vision and Mission</Link>
//                          <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)} className="text-left text-gycora">FAQs</Link>
//                       </div>
//                    )}
//                 </div>

//                 <div className="notranslate">
//                    <button onClick={() => setIsMobileProductMenuOpen(!isMobileProductMenuOpen)} className="flex items-center justify-between w-full text-lg font-bold translate">
//                       Product
//                       <svg className={`w-5 h-5 transition-transform ${isMobileProductMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
//                    </button>
//                    {isMobileProductMenuOpen && (
//                       <div className="flex flex-col gap-3 pl-4 mt-2 text-gray-600">
//                          <button className="text-left" onClick={() => { 
//                            setIsMobileMenuOpen(false); 
//                            const targetProduct = allProducts.find(p => p.slug === menuIds.pinkBrush);
//                            navigate(menuIds.pinkBrush ? `/product/${menuIds.pinkBrush}` : '/products', { state: { initialProduct: targetProduct, allProducts } }); 
//                          }}>Ethereal Glow Brush Pink</button>
//                          <button className="text-left" onClick={() => { 
//                            setIsMobileMenuOpen(false); 
//                            const targetProduct = allProducts.find(p => p.slug === menuIds.blackBrush);
//                            navigate(menuIds.blackBrush ? `/product/${menuIds.blackBrush}` : '/products', { state: { initialProduct: targetProduct, allProducts } }); 
//                          }}>Ethereal Glow Brush Black</button>
//                          <button className="text-left" onClick={() => { 
//                            setIsMobileMenuOpen(false); 
//                            const targetProduct = allProducts.find(p => p.slug === menuIds.scalpCare);
//                            navigate(menuIds.scalpCare ? `/product/${menuIds.scalpCare}` : '/products', { state: { initialProduct: targetProduct, allProducts } }); 
//                          }}>Eco Serenity Scalp Care</button>
//                       </div>
//                    )}
//                 </div>

//                 <Link to="/events" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Events</Link>
//                 <Link to="/consult" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Consult</Link>
             
//                 {userData ? (
//                   <>
//                     <div className="my-2 border-t border-gray-100"></div>
//                     <Link to="/chat" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">Live Chat Pakar</Link>
//                     <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">Profil Saya</Link>
//                     <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">Pesanan Saya</Link>
//                     <button onClick={handleLogout} className="mt-4 font-bold text-left text-red-600">Keluar</button>
//                   </>
//                 ) : (
//                   <div className="flex flex-col gap-2 mt-4">
//                     <button onClick={() => { setIsMobileMenuOpen(false); navigate("/login"); }} className="w-full px-4 py-3 text-sm font-bold text-white bg-gray-900 rounded-xl">Masuk</button>
//                     <button onClick={() => { setIsMobileMenuOpen(false); navigate("/register"); }} className="w-full px-4 py-3 text-sm font-bold text-gray-700 border border-gray-200 rounded-xl">Daftar Akun Baru</button>
//                   </div>
//                 )}
//              </nav>
//           </div>
//         </div>
//       )}

//       {/* GLOBAL SEARCH MODAL */}
//       {isSearchOpen && (
//         <div className="fixed inset-0 z-[100] flex justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
//           <div className="absolute inset-0" onClick={closeSearchModal}></div>

//           <div className="relative flex flex-col w-full max-w-3xl mt-16 md:mt-24 overflow-hidden bg-white shadow-2xl h-[85vh] md:h-[75vh] rounded-t-3xl md:rounded-3xl animate-fade-in-up translate">
//             <div className="flex flex-col p-4 border-b border-gray-100 md:p-6 bg-gray-50/50">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-bold text-gray-900">
//                   Pencarian Universal
//                 </h2>
//                 <button onClick={closeSearchModal} className="p-1 text-gray-400 bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100">
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               <div className="relative">
//                 <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Cari produk, No. Pesanan (INV-...), atau status..."
//                   className="w-full py-3 pl-12 pr-4 text-sm font-medium transition-all bg-white border border-gray-300 shadow-sm outline-none rounded-xl focus:ring-2 focus:ring-gycora focus:border-transparent notranslate"
//                   autoFocus
//                 />
//               </div>

//               <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
//                 {[
//                   { id: "all", label: "Semua Waktu" },
//                   { id: "7d", label: "7 Hari Terakhir" },
//                   { id: "30d", label: "30 Hari Terakhir" },
//                   { id: "90d", label: "3 Bulan Terakhir" },
//                 ].map((filter) => (
//                   <button
//                     key={filter.id}
//                     onClick={() => setTimeFilter(filter.id)}
//                     className={`shrink-0 px-4 py-1.5 text-xs font-bold rounded-full transition-all border ${timeFilter === filter.id ? "bg-gycora text-white border-gycora shadow-md" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100"}`}
//                   >
//                     {filter.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="flex-1 p-4 overflow-y-auto bg-white md:p-6 custom-scrollbar">
//               {searchQuery.trim().length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
//                   <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <p className="text-sm font-medium">Ketik kata kunci untuk memulai pencarian.</p>
//                 </div>
//               ) : isSearching ? (
//                 <div className="flex flex-col items-center justify-center h-full gap-3 text-gycora">
//                   <div className="w-8 h-8 border-4 rounded-full border-emerald-100 border-t-gycora animate-spin"></div>
//                   <p className="text-xs font-bold tracking-widest uppercase animate-pulse">Mencari data...</p>
//                 </div>
//               ) : (
//                 <div className="space-y-8 animate-fade-in">
//                   {searchResults.products && searchResults.products.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">Produk Katalog</h3>
//                       <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
//                         {searchResults.products.map((product: any) => (
//                           <div
//                             key={`prod-${product.id}`}
//                             onClick={() => { closeSearchModal(); navigate(`/product/${product.slug}`); }}
//                             className="flex items-center gap-3 p-3 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group notranslate"
//                           >
//                             <img src={product.image_url} alt={product.name} className="object-cover w-12 h-12 rounded-lg bg-gray-50 shrink-0" />
//                             <div className="flex-1 min-w-0">
//                               <p className="text-sm font-bold text-gray-900 truncate group-hover:text-gycora">{product.name}</p>
//                               <p className="text-xs text-gray-500 font-mono mt-0.5">{product.sku}</p>
//                             </div>
//                             <span className="text-sm font-black text-gycora shrink-0">{formatRupiah(product.price)}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {searchResults.transactions && searchResults.transactions.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">Riwayat Transaksi</h3>
//                       <div className="flex flex-col gap-3">
//                         {searchResults.transactions.map((trx: any) => (
//                           <div
//                             key={`trx-${trx.id}`}
//                             onClick={() => { closeSearchModal(); navigate(`/orders`); }}
//                             className="flex items-center justify-between p-4 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
//                           >
//                             <div className="flex items-center gap-4">
//                               <div className="flex items-center justify-center w-10 h-10 text-gray-500 bg-gray-100 rounded-full shadow-sm group-hover:bg-white group-hover:text-gycora">
//                                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                                 </svg>
//                               </div>
//                               <div className="notranslate">
//                                 <p className="font-mono text-sm font-bold text-gray-900 group-hover:text-gycora">{trx.order_id}</p>
//                                 <p className="mt-1 text-xs text-gray-500">{new Date(trx.created_at).toLocaleDateString("id-ID")}</p>
//                               </div>
//                             </div>
//                             <div className="text-right">
//                               <p className="text-sm font-black text-gray-900 notranslate">{formatRupiah(trx.total_amount)}</p>
//                               <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-600 translate">{trx.status}</span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {!isSearching && searchResults.products?.length === 0 && searchResults.transactions?.length === 0 && searchResults.carts?.length === 0 && (
//                     <div className="flex flex-col items-center justify-center py-10 text-center">
//                       <p className="text-lg font-bold text-gray-900">Oops, tidak ditemukan!</p>
//                       <p className="max-w-sm mt-2 text-sm text-gray-500">Kami tidak dapat menemukan hasil untuk "{searchQuery}" dengan rentang waktu yang Anda pilih.</p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// import { useEffect, useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../context/CartContext";
// // import { useMessage } from "../context/MessageContext";
// import logoGycora from "../assets/gycora_logo.png";
// import { BASE_URL } from "../config/api";

// export default function Header() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
//   const { cartTotalItems } = useCart();

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
//   const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
//   const [isMobileProductMenuOpen, setIsMobileProductMenuOpen] = useState(false);

//   const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false);
//   const [isMobileAboutMenuOpen, setIsMobileAboutMenuOpen] = useState(false);

//   // --- STATE UNTUK DROPDOWN BAHASA ---
//   const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
//   const langDropdownRef = useRef<HTMLDivElement>(null);
//   const [currentLang, setCurrentLang] = useState<"id" | "en">(
//     (localStorage.getItem("app_lang") as "id" | "en") || "id"
//   );

//   const [allProducts, setAllProducts] = useState<any[]>([]);
//   const [menuIds, setMenuIds] = useState({
//     pinkBrush: null as string | null,
//     blackBrush: null as string | null,
//     scalpCare: null as string | null,
//   });

//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [timeFilter, setTimeFilter] = useState("all");
//   const [isSearching, setIsSearching] = useState(false);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [searchResults, setSearchResults] = useState<any>({
//     products: [],
//     transactions: [],
//     carts: [],
//   });
//   const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     const userToken = localStorage.getItem("user_token");
//     const storedUser = localStorage.getItem("user_data");
//     if (userToken && storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }

//     const fetchForMenu = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         const data = await res.json();
//         const products = data.data ? data.data : data;
//         setAllProducts(products);

//         const pink = products.find((p: any) => p.name.toLowerCase().includes("brush") && p.name.toLowerCase().includes("pink"));
//         const black = products.find((p: any) => p.name.toLowerCase().includes("brush") && p.name.toLowerCase().includes("black"));
//         const scalp = products.find((p: any) => p.name.toLowerCase().includes("scalp"));

//         setMenuIds({
//           pinkBrush: pink?.slug || null,
//           blackBrush: black?.slug || null,
//           scalpCare: scalp?.slug || null,
//         });
//       } catch (err) {
//         console.error("Gagal load menu produk", err);
//       }
//     };
//     fetchForMenu();
//   }, []);

//   // --- FUNGSI MEMICU TERJEMAHAN GOOGLE ---
//   const triggerGoogleTranslate = (langCode: "id" | "en") => {
//     // Memastikan elemen ada. Jika belum, kita bisa gunakan setInterval untuk mencarinya.
//     const attemptTranslate = setInterval(() => {
//       const selectEl = document.querySelector(".goog-te-combo") as HTMLSelectElement;
//       if (selectEl) {
//         clearInterval(attemptTranslate); // Berhenti mencari jika sudah ketemu
//         if (selectEl.value !== langCode) { // Hanya picu event jika berbeda
//            selectEl.value = langCode;
//            selectEl.dispatchEvent(new Event("change"));
//         }
//       }
//     }, 500); // Cek setiap setengah detik

//     // Hentikan pencarian setelah 5 detik agar tidak infinite loop jika script diblokir adblocker
//     setTimeout(() => clearInterval(attemptTranslate), 5000); 
//   };

//   // Setel bahasa awal saat komponen dimuat
//   useEffect(() => {
//     if (currentLang === "en") {
//       triggerGoogleTranslate("en");
//     }
//   }, [currentLang]); // [PERBAIKAN] Menambahkan currentLang ke dependency

//   // Handler mengubah bahasa dari dropdown
//   const handleLanguageChange = (lang: "id" | "en") => {
//     setCurrentLang(lang);
//     localStorage.setItem("app_lang", lang);
//     triggerGoogleTranslate(lang);
//     setIsLangMenuOpen(false); // Tutup menu setelah memilih
//   };

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//       if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
//         setIsLangMenuOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (isMobileMenuOpen || isSearchOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isMobileMenuOpen, isSearchOpen]);

//   const handleLogout = () => {
//     setIsDropdownOpen(false);
    
//     Swal.fire({
//       title: "Keluar?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#059669",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Ya, Keluar",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("user_token");
//         localStorage.removeItem("user_data");
//         setUserData(null);
//         setIsMobileMenuOpen(false);
//         navigate("/");
//       }
//     });
//   };

//   useEffect(() => {
//     if (!isSearchOpen) return;

//     if (searchQuery.trim().length === 0) {
//       setSearchResults({ products: [], transactions: [], carts: [] });
//       setIsSearching(false);
//       return;
//     }

//     setIsSearching(true);

//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }

//     searchTimeoutRef.current = setTimeout(async () => {
//       try {
//         const token = localStorage.getItem("user_token");
//         const res = await fetch(
//           `${BASE_URL}/api/search?q=${encodeURIComponent(searchQuery)}&time=${timeFilter}`,
//           {
//             headers: {
//               Accept: "application/json",
//               ...(token && { Authorization: `Bearer ${token}` }),
//             },
//           }
//         );

//         if (res.ok) {
//           const data = await res.json();
//           setSearchResults(data);
//         } else {
//           setSearchResults({ products: [], transactions: [], carts: [] });
//         }
//       } catch (error) {
//         console.error("Global search error:", error);
//         setSearchResults({ products: [], transactions: [], carts: [] });
//       } finally {
//         setIsSearching(false);
//       }
//     }, 500);

//     return () => {
//       if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
//     };
//   }, [searchQuery, timeFilter, isSearchOpen]);

//   const closeSearchModal = () => {
//     setIsSearchOpen(false);
//     setSearchQuery("");
//     setSearchResults({ products: [], transactions: [], carts: [] });
//   };

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(angka || 0);
//   };

//   return (
//     <>
//       <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm notranslate">
//         <div className="relative flex items-center justify-between h-20 px-4 mx-auto max-w-[1536px] sm:px-6 lg:px-8">
          
//           <div className="flex items-center flex-1">
//             <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-gray-600 transition-colors rounded-md md:hidden hover:bg-gray-100">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
//             </button>

//             <nav className="items-center hidden gap-6 text-sm font-semibold text-gray-700 md:flex lg:gap-8">
//               <Link to="/" className="transition-colors translate hover:text-gycora">Home</Link>

//               <div 
//                 className="relative flex items-center h-full py-2 cursor-pointer group"
//                 onMouseEnter={() => setIsAboutMenuOpen(true)}
//                 onMouseLeave={() => setIsAboutMenuOpen(false)}
//               >
//                 <Link to="/about" className="flex items-center gap-1 transition-colors translate hover:text-gycora">
//                   About Us
//                   <svg
//                     className={`w-4 h-4 transition-transform duration-200 ${isAboutMenuOpen ? "rotate-180" : ""}`}
//                     fill="none" viewBox="0 0 24 24" stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </Link>

//                 {isAboutMenuOpen && (
//                   <div className="absolute left-0 pt-2 top-full w-52 animate-fade-in-up translate">
//                     <div className="py-2 bg-white border border-gray-100 shadow-2xl rounded-xl">
//                       <Link to="/about#our-story" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Story</Link>
//                       <Link to="/about#our-purpose" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Purpose</Link>
//                       <Link to="/about#our-innovation" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Innovation</Link>
//                       <Link to="/about#vision-mission" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Vision and Mission</Link>
//                       <Link to="/faq" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors border-t border-gray-100">FAQs</Link>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div 
//                 className="relative flex items-center h-full py-2 cursor-pointer group"
//                 onMouseEnter={() => setIsProductMenuOpen(true)}
//                 onMouseLeave={() => setIsProductMenuOpen(false)}
//               >
//                 <Link to="/products" className="flex items-center gap-1 transition-colors translate hover:text-gycora">
//                   Product
//                   <svg
//                     className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`}
//                     fill="none" viewBox="0 0 24 24" stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </Link>

//                 {isProductMenuOpen && (
//                   <div className="absolute left-0 w-64 pt-2 top-full animate-fade-in-up">
//                     <div className="py-2 bg-white border border-gray-100 shadow-2xl rounded-xl notranslate">
//                       <button 
//                         onClick={() => {
//                           const targetProduct = allProducts.find(p => p.slug === menuIds.pinkBrush);
//                           navigate(menuIds.pinkBrush ? `/product/${menuIds.pinkBrush}` : '/products', { 
//                             state: { initialProduct: targetProduct, allProducts } 
//                           });
//                         }} 
//                         className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors"
//                       >
//                         Ethereal Glow Brush Pink
//                       </button>
//                       <button 
//                         onClick={() => {
//                           const targetProduct = allProducts.find(p => p.slug === menuIds.blackBrush);
//                           navigate(menuIds.blackBrush ? `/product/${menuIds.blackBrush}` : '/products', { 
//                             state: { initialProduct: targetProduct, allProducts } 
//                           });
//                         }} 
//                         className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors"
//                       >
//                         Ethereal Glow Brush Black
//                       </button>
//                       <button 
//                         onClick={() => {
//                           const targetProduct = allProducts.find(p => p.slug === menuIds.scalpCare);
//                           navigate(menuIds.scalpCare ? `/product/${menuIds.scalpCare}` : '/products', { 
//                             state: { initialProduct: targetProduct, allProducts } 
//                           });
//                         }} 
//                         className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors"
//                       >
//                         Eco Serenity Scalp Care
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <Link to="/events" className="transition-colors translate hover:text-gycora">Events</Link>
//               <Link to="/consult" className="transition-colors translate hover:text-gycora">Consult</Link>
//             </nav>
//           </div>

//           <div className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer left-1/2 top-1/2 notranslate" onClick={() => navigate("/")}>
//             <img src={logoGycora} alt="Gycora Logo" className="object-contain h-8 md:h-10" />
//           </div>

//           <div className="flex items-center justify-end flex-1 gap-2 md:gap-5">
            
//             {/* --- DROPDOWN BAHASA --- */}
//             <div className="relative" ref={langDropdownRef}>
//               <button 
//                 onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
//                 className="flex items-center gap-1 p-1.5 text-xs font-bold text-gray-600 uppercase transition-colors rounded-lg hover:bg-gray-100 hover:text-gycora notranslate"
//                 title="Ganti Bahasa"
//               >
//                 <span>{currentLang}</span>
//                 <svg className={`w-3 h-3 transition-transform ${isLangMenuOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>
              
//               {isLangMenuOpen && (
//                 <div className="absolute right-0 z-50 w-32 py-2 mt-2 bg-white border border-gray-100 shadow-xl rounded-xl animate-fade-in-up">
//                   <button 
//                     onClick={() => handleLanguageChange("id")}
//                     className={`w-full text-left px-4 py-2 text-sm transition-colors ${currentLang === 'id' ? 'text-gycora font-bold bg-emerald-50' : 'text-gray-700 hover:bg-gray-50'}`}
//                   >
//                     🇮🇩 Indonesia
//                   </button>
//                   <button 
//                     onClick={() => handleLanguageChange("en")}
//                     className={`w-full text-left px-4 py-2 text-sm transition-colors ${currentLang === 'en' ? 'text-gycora font-bold bg-emerald-50' : 'text-gray-700 hover:bg-gray-50'}`}
//                   >
//                     🇬🇧 English
//                   </button>
//                 </div>
//               )}
//             </div>

//             {userData ? (
//               <div className="relative hidden md:block" ref={dropdownRef}>
//                 <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 cursor-pointer group focus:outline-none">
//                   <div className="flex items-center justify-center w-8 h-8 text-sm font-bold transition-colors rounded-full bg-gycora-light text-gycora-dark group-hover:bg-gycora group-hover:text-white notranslate">
//                     {userData.first_name.charAt(0)}
//                   </div>
//                   <span className="hidden text-sm font-semibold text-gray-800 transition-colors md:block group-hover:text-gycora notranslate">Hi, {userData.first_name}</span>
//                 </button>
//                 {isDropdownOpen && (
//                   <div className="absolute right-0 w-48 py-2 mt-3 bg-white border border-gray-100 shadow-xl rounded-xl animate-fade-in-up translate">
//                     <Link to="/profile" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profil Saya</Link>
//                     <Link to="/orders" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Pesanan Saya</Link>
//                     <button onClick={handleLogout} className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50">Keluar</button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link to="/login" className="hidden text-sm font-medium text-gray-600 transition-colors md:block hover:text-gycora translate">Login</Link>
//             )}
            
//             <button onClick={() => setIsSearchOpen(true)} className="p-1.5 text-gray-600 hover:text-gycora">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
//             </button>
            
//             {userData && (
//               <button onClick={() => navigate("/chat")} className="relative hidden md:block p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora" title="Chat dengan Pakar">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                 </svg>
//               </button>
//             )}

//             <button onClick={() => navigate("/cart")} className="relative p-1.5 text-gray-600 hover:text-gycora">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
//               {cartTotalItems > 0 && <span className="absolute top-0 right-0 bg-gycora text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1 notranslate">{cartTotalItems}</span>}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* MOBILE MENU */}
//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 z-[100] md:hidden">
//           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
//           <div className="absolute inset-y-0 left-0 w-4/5 max-w-sm p-4 overflow-y-auto bg-white shadow-2xl translate">
//              <div className="flex items-center justify-between mb-8 notranslate">
//                 <img src={logoGycora} alt="Logo" className="h-6" />
//                 <button onClick={() => setIsMobileMenuOpen(false)}><svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
//              </div>
             
//              {userData && (
//               <div className="flex items-center gap-3 p-4 mb-4 border border-gray-100 rounded-xl bg-emerald-50/30 notranslate">
//                 <div className="flex items-center justify-center w-12 h-12 font-bold rounded-full bg-gycora-light text-gycora-dark">
//                   {userData.first_name.charAt(0)}
//                 </div>
//                 <div>
//                   <p className="text-sm font-bold text-gray-900">{userData.first_name} {userData.last_name}</p>
//                   <p className="text-xs text-gray-500">{userData.email}</p>
//                 </div>
//               </div>
//             )}

//              <nav className="flex flex-col gap-4">
//                 <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Home</Link>
                
//                 <div>
//                    <button onClick={() => setIsMobileAboutMenuOpen(!isMobileAboutMenuOpen)} className="flex items-center justify-between w-full text-lg font-bold">
//                       About Us
//                       <svg className={`w-5 h-5 transition-transform ${isMobileAboutMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
//                    </button>
//                    {isMobileAboutMenuOpen && (
//                       <div className="flex flex-col gap-3 pl-4 mt-2 text-gray-600">
//                          <Link to="/about#our-story" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Story</Link>
//                          <Link to="/about#our-purpose" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Purpose</Link>
//                          <Link to="/about#our-innovation" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Innovation</Link>
//                          <Link to="/about#vision-mission" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Vision and Mission</Link>
//                          <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)} className="text-left text-gycora">FAQs</Link>
//                       </div>
//                    )}
//                 </div>

//                 <div className="notranslate">
//                    <button onClick={() => setIsMobileProductMenuOpen(!isMobileProductMenuOpen)} className="flex items-center justify-between w-full text-lg font-bold translate">
//                       Product
//                       <svg className={`w-5 h-5 transition-transform ${isMobileProductMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
//                    </button>
//                    {isMobileProductMenuOpen && (
//                       <div className="flex flex-col gap-3 pl-4 mt-2 text-gray-600">
//                          <button className="text-left" onClick={() => { 
//                            setIsMobileMenuOpen(false); 
//                            const targetProduct = allProducts.find(p => p.slug === menuIds.pinkBrush);
//                            navigate(menuIds.pinkBrush ? `/product/${menuIds.pinkBrush}` : '/products', { state: { initialProduct: targetProduct, allProducts } }); 
//                          }}>Ethereal Glow Brush Pink</button>
//                          <button className="text-left" onClick={() => { 
//                            setIsMobileMenuOpen(false); 
//                            const targetProduct = allProducts.find(p => p.slug === menuIds.blackBrush);
//                            navigate(menuIds.blackBrush ? `/product/${menuIds.blackBrush}` : '/products', { state: { initialProduct: targetProduct, allProducts } }); 
//                          }}>Ethereal Glow Brush Black</button>
//                          <button className="text-left" onClick={() => { 
//                            setIsMobileMenuOpen(false); 
//                            const targetProduct = allProducts.find(p => p.slug === menuIds.scalpCare);
//                            navigate(menuIds.scalpCare ? `/product/${menuIds.scalpCare}` : '/products', { state: { initialProduct: targetProduct, allProducts } }); 
//                          }}>Eco Serenity Scalp Care</button>
//                       </div>
//                    )}
//                 </div>

//                 <Link to="/events" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Events</Link>
//                 <Link to="/consult" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Consult</Link>
             
//                 {userData ? (
//                   <>
//                     <div className="my-2 border-t border-gray-100"></div>
//                     <Link to="/chat" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">Live Chat Pakar</Link>
//                     <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">Profil Saya</Link>
//                     <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">Pesanan Saya</Link>
//                     <button onClick={handleLogout} className="mt-4 font-bold text-left text-red-600">Keluar</button>
//                   </>
//                 ) : (
//                   <div className="flex flex-col gap-2 mt-4">
//                     <button onClick={() => { setIsMobileMenuOpen(false); navigate("/login"); }} className="w-full px-4 py-3 text-sm font-bold text-white bg-gray-900 rounded-xl">Masuk</button>
//                     <button onClick={() => { setIsMobileMenuOpen(false); navigate("/register"); }} className="w-full px-4 py-3 text-sm font-bold text-gray-700 border border-gray-200 rounded-xl">Daftar Akun Baru</button>
//                   </div>
//                 )}
//              </nav>
//           </div>
//         </div>
//       )}

//       {/* GLOBAL SEARCH MODAL */}
//       {isSearchOpen && (
//         <div className="fixed inset-0 z-[100] flex justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
//           <div className="absolute inset-0" onClick={closeSearchModal}></div>

//           <div className="relative flex flex-col w-full max-w-3xl mt-16 md:mt-24 overflow-hidden bg-white shadow-2xl h-[85vh] md:h-[75vh] rounded-t-3xl md:rounded-3xl animate-fade-in-up translate">
//             <div className="flex flex-col p-4 border-b border-gray-100 md:p-6 bg-gray-50/50">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-bold text-gray-900">
//                   Pencarian Universal
//                 </h2>
//                 <button onClick={closeSearchModal} className="p-1 text-gray-400 bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100">
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               <div className="relative">
//                 <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Cari produk, No. Pesanan (INV-...), atau status..."
//                   className="w-full py-3 pl-12 pr-4 text-sm font-medium transition-all bg-white border border-gray-300 shadow-sm outline-none rounded-xl focus:ring-2 focus:ring-gycora focus:border-transparent notranslate"
//                   autoFocus
//                 />
//               </div>

//               <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
//                 {[
//                   { id: "all", label: "Semua Waktu" },
//                   { id: "7d", label: "7 Hari Terakhir" },
//                   { id: "30d", label: "30 Hari Terakhir" },
//                   { id: "90d", label: "3 Bulan Terakhir" },
//                 ].map((filter) => (
//                   <button
//                     key={filter.id}
//                     onClick={() => setTimeFilter(filter.id)}
//                     className={`shrink-0 px-4 py-1.5 text-xs font-bold rounded-full transition-all border ${timeFilter === filter.id ? "bg-gycora text-white border-gycora shadow-md" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100"}`}
//                   >
//                     {filter.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="flex-1 p-4 overflow-y-auto bg-white md:p-6 custom-scrollbar">
//               {searchQuery.trim().length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
//                   <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <p className="text-sm font-medium">Ketik kata kunci untuk memulai pencarian.</p>
//                 </div>
//               ) : isSearching ? (
//                 <div className="flex flex-col items-center justify-center h-full gap-3 text-gycora">
//                   <div className="w-8 h-8 border-4 rounded-full border-emerald-100 border-t-gycora animate-spin"></div>
//                   <p className="text-xs font-bold tracking-widest uppercase animate-pulse">Mencari data...</p>
//                 </div>
//               ) : (
//                 <div className="space-y-8 animate-fade-in">
//                   {searchResults.products && searchResults.products.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">Produk Katalog</h3>
//                       <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
//                         {searchResults.products.map((product: any) => (
//                           <div
//                             key={`prod-${product.id}`}
//                             onClick={() => { closeSearchModal(); navigate(`/product/${product.slug}`); }}
//                             className="flex items-center gap-3 p-3 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group notranslate"
//                           >
//                             <img src={product.image_url} alt={product.name} className="object-cover w-12 h-12 rounded-lg bg-gray-50 shrink-0" />
//                             <div className="flex-1 min-w-0">
//                               <p className="text-sm font-bold text-gray-900 truncate group-hover:text-gycora">{product.name}</p>
//                               <p className="text-xs text-gray-500 font-mono mt-0.5">{product.sku}</p>
//                             </div>
//                             <span className="text-sm font-black text-gycora shrink-0">{formatRupiah(product.price)}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {searchResults.transactions && searchResults.transactions.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">Riwayat Transaksi</h3>
//                       <div className="flex flex-col gap-3">
//                         {searchResults.transactions.map((trx: any) => (
//                           <div
//                             key={`trx-${trx.id}`}
//                             onClick={() => { closeSearchModal(); navigate(`/orders`); }}
//                             className="flex items-center justify-between p-4 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
//                           >
//                             <div className="flex items-center gap-4">
//                               <div className="flex items-center justify-center w-10 h-10 text-gray-500 bg-gray-100 rounded-full shadow-sm group-hover:bg-white group-hover:text-gycora">
//                                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                                 </svg>
//                               </div>
//                               <div className="notranslate">
//                                 <p className="font-mono text-sm font-bold text-gray-900 group-hover:text-gycora">{trx.order_id}</p>
//                                 <p className="mt-1 text-xs text-gray-500">{new Date(trx.created_at).toLocaleDateString("id-ID")}</p>
//                               </div>
//                             </div>
//                             <div className="text-right">
//                               <p className="text-sm font-black text-gray-900 notranslate">{formatRupiah(trx.total_amount)}</p>
//                               <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-600 translate">{trx.status}</span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {!isSearching && searchResults.products?.length === 0 && searchResults.transactions?.length === 0 && searchResults.carts?.length === 0 && (
//                     <div className="flex flex-col items-center justify-center py-10 text-center">
//                       <p className="text-lg font-bold text-gray-900">Oops, tidak ditemukan!</p>
//                       <p className="max-w-sm mt-2 text-sm text-gray-500">Kami tidak dapat menemukan hasil untuk "{searchQuery}" dengan rentang waktu yang Anda pilih.</p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// import { useEffect, useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../context/CartContext";
// // import { useMessage } from "../context/MessageContext";
// import logoGycora from "../assets/gycora_logo.png";
// import { BASE_URL } from "../config/api";

// // --- FUNGSI HELPER UNTUK MENGATUR COOKIE BAHASA ---
// const setCookie = (name: string, value: string, days: number) => {
//   const expires = new Date();
//   expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
//   document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
// };

// export default function Header() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
//   const { cartTotalItems } = useCart();

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
//   const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
//   const [isMobileProductMenuOpen, setIsMobileProductMenuOpen] = useState(false);

//   const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false);
//   const [isMobileAboutMenuOpen, setIsMobileAboutMenuOpen] = useState(false);

//   // --- STATE UNTUK DROPDOWN BAHASA ---
//   const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
//   const langDropdownRef = useRef<HTMLDivElement>(null);
  
//   // Baca bahasa dari cookie googtrans atau default ke 'id'
//   const getInitialLang = (): "id" | "en" => {
//     const match = document.cookie.match(/googtrans=([^;]+)/);
//     if (match && match[1]) {
//       return match[1] === "/id/en" ? "en" : "id";
//     }
//     return "id";
//   };
//   const [currentLang, setCurrentLang] = useState<"id" | "en">(getInitialLang());

//   const [allProducts, setAllProducts] = useState<any[]>([]);
//   const [menuIds, setMenuIds] = useState({
//     pinkBrush: null as string | null,
//     blackBrush: null as string | null,
//     scalpCare: null as string | null,
//   });

//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [timeFilter, setTimeFilter] = useState("all");
//   const [isSearching, setIsSearching] = useState(false);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [searchResults, setSearchResults] = useState<any>({
//     products: [],
//     transactions: [],
//     carts: [],
//   });
//   const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     const userToken = localStorage.getItem("user_token");
//     const storedUser = localStorage.getItem("user_data");
//     if (userToken && storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }

//     const fetchForMenu = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         const data = await res.json();
//         const products = data.data ? data.data : data;
//         setAllProducts(products);

//         const pink = products.find((p: any) => p.name.toLowerCase().includes("brush") && p.name.toLowerCase().includes("pink"));
//         const black = products.find((p: any) => p.name.toLowerCase().includes("brush") && p.name.toLowerCase().includes("black"));
//         const scalp = products.find((p: any) => p.name.toLowerCase().includes("scalp"));

//         setMenuIds({
//           pinkBrush: pink?.slug || null,
//           blackBrush: black?.slug || null,
//           scalpCare: scalp?.slug || null,
//         });
//       } catch (err) {
//         console.error("Gagal load menu produk", err);
//       }
//     };
//     fetchForMenu();
//   }, []);

//   // --- HANDLER UBAH BAHASA (AMAN DARI FATAL ERROR) ---
//   const handleLanguageChange = (lang: "id" | "en") => {
//     if (lang === currentLang) {
//       setIsLangMenuOpen(false);
//       return;
//     }
    
//     // Setel cookie terjemahan yang dibaca oleh Google Translate
//     if (lang === "en") {
//       setCookie("googtrans", "/id/en", 30); // Dari ID ke EN
//     } else {
//       setCookie("googtrans", "/id/id", 30); // Kembali ke ID
//     }

//     setCurrentLang(lang);
//     setIsLangMenuOpen(false);
    
//     // Refresh halaman agar Google Translate membaca cookie baru dan menerapkannya seketika
//     window.location.reload(); 
//   };

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//       if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
//         setIsLangMenuOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (isMobileMenuOpen || isSearchOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isMobileMenuOpen, isSearchOpen]);

//   const handleLogout = () => {
//     setIsDropdownOpen(false);
    
//     Swal.fire({
//       title: "Keluar?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#059669",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Ya, Keluar",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("user_token");
//         localStorage.removeItem("user_data");
//         setUserData(null);
//         setIsMobileMenuOpen(false);
//         navigate("/");
//       }
//     });
//   };

//   useEffect(() => {
//     if (!isSearchOpen) return;

//     if (searchQuery.trim().length === 0) {
//       setSearchResults({ products: [], transactions: [], carts: [] });
//       setIsSearching(false);
//       return;
//     }

//     setIsSearching(true);

//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }

//     searchTimeoutRef.current = setTimeout(async () => {
//       try {
//         const token = localStorage.getItem("user_token");
//         const res = await fetch(
//           `${BASE_URL}/api/search?q=${encodeURIComponent(searchQuery)}&time=${timeFilter}`,
//           {
//             headers: {
//               Accept: "application/json",
//               ...(token && { Authorization: `Bearer ${token}` }),
//             },
//           }
//         );

//         if (res.ok) {
//           const data = await res.json();
//           setSearchResults(data);
//         } else {
//           setSearchResults({ products: [], transactions: [], carts: [] });
//         }
//       } catch (error) {
//         console.error("Global search error:", error);
//         setSearchResults({ products: [], transactions: [], carts: [] });
//       } finally {
//         setIsSearching(false);
//       }
//     }, 500);

//     return () => {
//       if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
//     };
//   }, [searchQuery, timeFilter, isSearchOpen]);

//   const closeSearchModal = () => {
//     setIsSearchOpen(false);
//     setSearchQuery("");
//     setSearchResults({ products: [], transactions: [], carts: [] });
//   };

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(angka || 0);
//   };

//   return (
//     <>
//       <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm notranslate">
//         <div className="relative flex items-center justify-between h-20 px-4 mx-auto max-w-[1536px] sm:px-6 lg:px-8">
          
//           <div className="flex items-center flex-1">
//             <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-gray-600 transition-colors rounded-md md:hidden hover:bg-gray-100">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
//             </button>

//             <nav className="items-center hidden gap-6 text-sm font-semibold text-gray-700 md:flex lg:gap-8">
//               <Link to="/" className="transition-colors translate hover:text-gycora">Home</Link>

//               <div 
//                 className="relative flex items-center h-full py-2 cursor-pointer group"
//                 onMouseEnter={() => setIsAboutMenuOpen(true)}
//                 onMouseLeave={() => setIsAboutMenuOpen(false)}
//               >
//                 <Link to="/about" className="flex items-center gap-1 transition-colors translate hover:text-gycora">
//                   About Us
//                   <svg
//                     className={`w-4 h-4 transition-transform duration-200 ${isAboutMenuOpen ? "rotate-180" : ""}`}
//                     fill="none" viewBox="0 0 24 24" stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </Link>

//                 {isAboutMenuOpen && (
//                   <div className="absolute left-0 pt-2 top-full w-52 animate-fade-in-up translate">
//                     <div className="py-2 bg-white border border-gray-100 shadow-2xl rounded-xl">
//                       <Link to="/about#our-story" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Story</Link>
//                       <Link to="/about#our-purpose" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Purpose</Link>
//                       <Link to="/about#our-innovation" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Innovation</Link>
//                       <Link to="/about#vision-mission" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Vision and Mission</Link>
//                       <Link to="/faq" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors border-t border-gray-100">FAQs</Link>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div 
//                 className="relative flex items-center h-full py-2 cursor-pointer group"
//                 onMouseEnter={() => setIsProductMenuOpen(true)}
//                 onMouseLeave={() => setIsProductMenuOpen(false)}
//               >
//                 <Link to="/products" className="flex items-center gap-1 transition-colors translate hover:text-gycora">
//                   Product
//                   <svg
//                     className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`}
//                     fill="none" viewBox="0 0 24 24" stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </Link>

//                 {isProductMenuOpen && (
//                   <div className="absolute left-0 w-64 pt-2 top-full animate-fade-in-up">
//                     <div className="py-2 bg-white border border-gray-100 shadow-2xl rounded-xl notranslate">
//                       <button 
//                         onClick={() => {
//                           const targetProduct = allProducts.find(p => p.slug === menuIds.pinkBrush);
//                           navigate(menuIds.pinkBrush ? `/product/${menuIds.pinkBrush}` : '/products', { 
//                             state: { initialProduct: targetProduct, allProducts } 
//                           });
//                         }} 
//                         className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors"
//                       >
//                         Ethereal Glow Brush Pink
//                       </button>
//                       <button 
//                         onClick={() => {
//                           const targetProduct = allProducts.find(p => p.slug === menuIds.blackBrush);
//                           navigate(menuIds.blackBrush ? `/product/${menuIds.blackBrush}` : '/products', { 
//                             state: { initialProduct: targetProduct, allProducts } 
//                           });
//                         }} 
//                         className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors"
//                       >
//                         Ethereal Glow Brush Black
//                       </button>
//                       <button 
//                         onClick={() => {
//                           const targetProduct = allProducts.find(p => p.slug === menuIds.scalpCare);
//                           navigate(menuIds.scalpCare ? `/product/${menuIds.scalpCare}` : '/products', { 
//                             state: { initialProduct: targetProduct, allProducts } 
//                           });
//                         }} 
//                         className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors"
//                       >
//                         Eco Serenity Scalp Care
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <Link to="/events" className="transition-colors translate hover:text-gycora">Events</Link>
//               <Link to="/consult" className="transition-colors translate hover:text-gycora">Consult</Link>
//             </nav>
//           </div>

//           <div className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer left-1/2 top-1/2 notranslate" onClick={() => navigate("/")}>
//             <img src={logoGycora} alt="Gycora Logo" className="object-contain h-8 md:h-10" />
//           </div>

//           <div className="flex items-center justify-end flex-1 gap-2 md:gap-5">
            
//             {/* --- DROPDOWN BAHASA --- */}
//             <div className="relative" ref={langDropdownRef}>
//               <button 
//                 onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
//                 className="flex items-center gap-1 p-1.5 text-xs font-bold text-gray-600 uppercase transition-colors rounded-lg hover:bg-gray-100 hover:text-gycora notranslate"
//                 title="Ganti Bahasa"
//               >
//                 <span>{currentLang}</span>
//                 <svg className={`w-3 h-3 transition-transform ${isLangMenuOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>
              
//               {isLangMenuOpen && (
//                 <div className="absolute right-0 z-50 w-32 py-2 mt-2 bg-white border border-gray-100 shadow-xl rounded-xl animate-fade-in-up">
//                   <button 
//                     onClick={() => handleLanguageChange("id")}
//                     className={`w-full text-left px-4 py-2 text-sm transition-colors ${currentLang === 'id' ? 'text-gycora font-bold bg-emerald-50' : 'text-gray-700 hover:bg-gray-50'}`}
//                   >
//                     🇮🇩 Indonesia
//                   </button>
//                   <button 
//                     onClick={() => handleLanguageChange("en")}
//                     className={`w-full text-left px-4 py-2 text-sm transition-colors ${currentLang === 'en' ? 'text-gycora font-bold bg-emerald-50' : 'text-gray-700 hover:bg-gray-50'}`}
//                   >
//                     🇬🇧 English
//                   </button>
//                 </div>
//               )}
//             </div>

//             {userData ? (
//               <div className="relative hidden md:block" ref={dropdownRef}>
//                 <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 cursor-pointer group focus:outline-none">
//                   <div className="flex items-center justify-center w-8 h-8 text-sm font-bold transition-colors rounded-full bg-gycora-light text-gycora-dark group-hover:bg-gycora group-hover:text-white notranslate">
//                     {userData.first_name.charAt(0)}
//                   </div>
//                   <span className="hidden text-sm font-semibold text-gray-800 transition-colors md:block group-hover:text-gycora notranslate">Hi, {userData.first_name}</span>
//                 </button>
//                 {isDropdownOpen && (
//                   <div className="absolute right-0 w-48 py-2 mt-3 bg-white border border-gray-100 shadow-xl rounded-xl animate-fade-in-up translate">
//                     <Link to="/profile" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profil Saya</Link>
//                     <Link to="/orders" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Pesanan Saya</Link>
//                     <button onClick={handleLogout} className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50">Keluar</button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link to="/login" className="hidden text-sm font-medium text-gray-600 transition-colors md:block hover:text-gycora translate">Login</Link>
//             )}
            
//             <button onClick={() => setIsSearchOpen(true)} className="p-1.5 text-gray-600 hover:text-gycora">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
//             </button>
            
//             {userData && (
//               <button onClick={() => navigate("/chat")} className="relative hidden md:block p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora" title="Chat dengan Pakar">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                 </svg>
//               </button>
//             )}

//             <button onClick={() => navigate("/cart")} className="relative p-1.5 text-gray-600 hover:text-gycora">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
//               {cartTotalItems > 0 && <span className="absolute top-0 right-0 bg-gycora text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1 notranslate">{cartTotalItems}</span>}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* MOBILE MENU */}
//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 z-[100] md:hidden">
//           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
//           <div className="absolute inset-y-0 left-0 w-4/5 max-w-sm p-4 overflow-y-auto bg-white shadow-2xl translate">
//              <div className="flex items-center justify-between mb-8 notranslate">
//                 <img src={logoGycora} alt="Logo" className="h-6" />
//                 <button onClick={() => setIsMobileMenuOpen(false)}><svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
//              </div>
             
//              {userData && (
//               <div className="flex items-center gap-3 p-4 mb-4 border border-gray-100 rounded-xl bg-emerald-50/30 notranslate">
//                 <div className="flex items-center justify-center w-12 h-12 font-bold rounded-full bg-gycora-light text-gycora-dark">
//                   {userData.first_name.charAt(0)}
//                 </div>
//                 <div>
//                   <p className="text-sm font-bold text-gray-900">{userData.first_name} {userData.last_name}</p>
//                   <p className="text-xs text-gray-500">{userData.email}</p>
//                 </div>
//               </div>
//             )}

//              <nav className="flex flex-col gap-4">
//                 <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Home</Link>
                
//                 <div>
//                    <button onClick={() => setIsMobileAboutMenuOpen(!isMobileAboutMenuOpen)} className="flex items-center justify-between w-full text-lg font-bold">
//                       About Us
//                       <svg className={`w-5 h-5 transition-transform ${isMobileAboutMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
//                    </button>
//                    {isMobileAboutMenuOpen && (
//                       <div className="flex flex-col gap-3 pl-4 mt-2 text-gray-600">
//                          <Link to="/about#our-story" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Story</Link>
//                          <Link to="/about#our-purpose" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Purpose</Link>
//                          <Link to="/about#our-innovation" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Innovation</Link>
//                          <Link to="/about#vision-mission" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Vision and Mission</Link>
//                          <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)} className="text-left text-gycora">FAQs</Link>
//                       </div>
//                    )}
//                 </div>

//                 <div className="notranslate">
//                    <button onClick={() => setIsMobileProductMenuOpen(!isMobileProductMenuOpen)} className="flex items-center justify-between w-full text-lg font-bold translate">
//                       Product
//                       <svg className={`w-5 h-5 transition-transform ${isMobileProductMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
//                    </button>
//                    {isMobileProductMenuOpen && (
//                       <div className="flex flex-col gap-3 pl-4 mt-2 text-gray-600">
//                          <button className="text-left" onClick={() => { 
//                            setIsMobileMenuOpen(false); 
//                            const targetProduct = allProducts.find(p => p.slug === menuIds.pinkBrush);
//                            navigate(menuIds.pinkBrush ? `/product/${menuIds.pinkBrush}` : '/products', { state: { initialProduct: targetProduct, allProducts } }); 
//                          }}>Ethereal Glow Brush Pink</button>
//                          <button className="text-left" onClick={() => { 
//                            setIsMobileMenuOpen(false); 
//                            const targetProduct = allProducts.find(p => p.slug === menuIds.blackBrush);
//                            navigate(menuIds.blackBrush ? `/product/${menuIds.blackBrush}` : '/products', { state: { initialProduct: targetProduct, allProducts } }); 
//                          }}>Ethereal Glow Brush Black</button>
//                          <button className="text-left" onClick={() => { 
//                            setIsMobileMenuOpen(false); 
//                            const targetProduct = allProducts.find(p => p.slug === menuIds.scalpCare);
//                            navigate(menuIds.scalpCare ? `/product/${menuIds.scalpCare}` : '/products', { state: { initialProduct: targetProduct, allProducts } }); 
//                          }}>Eco Serenity Scalp Care</button>
//                       </div>
//                    )}
//                 </div>

//                 <Link to="/events" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Events</Link>
//                 <Link to="/consult" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Consult</Link>
             
//                 {userData ? (
//                   <>
//                     <div className="my-2 border-t border-gray-100"></div>
//                     <Link to="/chat" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">Live Chat Pakar</Link>
//                     <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">Profil Saya</Link>
//                     <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">Pesanan Saya</Link>
//                     <button onClick={handleLogout} className="mt-4 font-bold text-left text-red-600">Keluar</button>
//                   </>
//                 ) : (
//                   <div className="flex flex-col gap-2 mt-4">
//                     <button onClick={() => { setIsMobileMenuOpen(false); navigate("/login"); }} className="w-full px-4 py-3 text-sm font-bold text-white bg-gray-900 rounded-xl">Masuk</button>
//                     <button onClick={() => { setIsMobileMenuOpen(false); navigate("/register"); }} className="w-full px-4 py-3 text-sm font-bold text-gray-700 border border-gray-200 rounded-xl">Daftar Akun Baru</button>
//                   </div>
//                 )}
//              </nav>
//           </div>
//         </div>
//       )}

//       {/* GLOBAL SEARCH MODAL */}
//       {isSearchOpen && (
//         <div className="fixed inset-0 z-[100] flex justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
//           <div className="absolute inset-0" onClick={closeSearchModal}></div>

//           <div className="relative flex flex-col w-full max-w-3xl mt-16 md:mt-24 overflow-hidden bg-white shadow-2xl h-[85vh] md:h-[75vh] rounded-t-3xl md:rounded-3xl animate-fade-in-up translate">
//             <div className="flex flex-col p-4 border-b border-gray-100 md:p-6 bg-gray-50/50">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-bold text-gray-900">
//                   Pencarian Universal
//                 </h2>
//                 <button onClick={closeSearchModal} className="p-1 text-gray-400 bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100">
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               <div className="relative">
//                 <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Cari produk, No. Pesanan (INV-...), atau status..."
//                   className="w-full py-3 pl-12 pr-4 text-sm font-medium transition-all bg-white border border-gray-300 shadow-sm outline-none rounded-xl focus:ring-2 focus:ring-gycora focus:border-transparent notranslate"
//                   autoFocus
//                 />
//               </div>

//               <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
//                 {[
//                   { id: "all", label: "Semua Waktu" },
//                   { id: "7d", label: "7 Hari Terakhir" },
//                   { id: "30d", label: "30 Hari Terakhir" },
//                   { id: "90d", label: "3 Bulan Terakhir" },
//                 ].map((filter) => (
//                   <button
//                     key={filter.id}
//                     onClick={() => setTimeFilter(filter.id)}
//                     className={`shrink-0 px-4 py-1.5 text-xs font-bold rounded-full transition-all border ${timeFilter === filter.id ? "bg-gycora text-white border-gycora shadow-md" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100"}`}
//                   >
//                     {filter.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="flex-1 p-4 overflow-y-auto bg-white md:p-6 custom-scrollbar">
//               {searchQuery.trim().length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
//                   <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <p className="text-sm font-medium">Ketik kata kunci untuk memulai pencarian.</p>
//                 </div>
//               ) : isSearching ? (
//                 <div className="flex flex-col items-center justify-center h-full gap-3 text-gycora">
//                   <div className="w-8 h-8 border-4 rounded-full border-emerald-100 border-t-gycora animate-spin"></div>
//                   <p className="text-xs font-bold tracking-widest uppercase animate-pulse">Mencari data...</p>
//                 </div>
//               ) : (
//                 <div className="space-y-8 animate-fade-in">
//                   {searchResults.products && searchResults.products.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">Produk Katalog</h3>
//                       <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
//                         {searchResults.products.map((product: any) => (
//                           <div
//                             key={`prod-${product.id}`}
//                             onClick={() => { closeSearchModal(); navigate(`/product/${product.slug}`); }}
//                             className="flex items-center gap-3 p-3 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group notranslate"
//                           >
//                             <img src={product.image_url} alt={product.name} className="object-cover w-12 h-12 rounded-lg bg-gray-50 shrink-0" />
//                             <div className="flex-1 min-w-0">
//                               <p className="text-sm font-bold text-gray-900 truncate group-hover:text-gycora">{product.name}</p>
//                               <p className="text-xs text-gray-500 font-mono mt-0.5">{product.sku}</p>
//                             </div>
//                             <span className="text-sm font-black text-gycora shrink-0">{formatRupiah(product.price)}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {searchResults.transactions && searchResults.transactions.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">Riwayat Transaksi</h3>
//                       <div className="flex flex-col gap-3">
//                         {searchResults.transactions.map((trx: any) => (
//                           <div
//                             key={`trx-${trx.id}`}
//                             onClick={() => { closeSearchModal(); navigate(`/orders`); }}
//                             className="flex items-center justify-between p-4 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
//                           >
//                             <div className="flex items-center gap-4">
//                               <div className="flex items-center justify-center w-10 h-10 text-gray-500 bg-gray-100 rounded-full shadow-sm group-hover:bg-white group-hover:text-gycora">
//                                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                                 </svg>
//                               </div>
//                               <div className="notranslate">
//                                 <p className="font-mono text-sm font-bold text-gray-900 group-hover:text-gycora">{trx.order_id}</p>
//                                 <p className="mt-1 text-xs text-gray-500">{new Date(trx.created_at).toLocaleDateString("id-ID")}</p>
//                               </div>
//                             </div>
//                             <div className="text-right">
//                               <p className="text-sm font-black text-gray-900 notranslate">{formatRupiah(trx.total_amount)}</p>
//                               <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-600 translate">{trx.status}</span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {!isSearching && searchResults.products?.length === 0 && searchResults.transactions?.length === 0 && searchResults.carts?.length === 0 && (
//                     <div className="flex flex-col items-center justify-center py-10 text-center">
//                       <p className="text-lg font-bold text-gray-900">Oops, tidak ditemukan!</p>
//                       <p className="max-w-sm mt-2 text-sm text-gray-500">Kami tidak dapat menemukan hasil untuk "{searchQuery}" dengan rentang waktu yang Anda pilih.</p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// import { useEffect, useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../context/CartContext";
// // import { useMessage } from "../context/MessageContext";
// import logoGycora from "../assets/gycora_logo.png";
// import { BASE_URL } from "../config/api";

// // --- FUNGSI HELPER UNTUK MENGATUR COOKIE BAHASA (DIPERBAIKI) ---
// const setCookie = (name: string, value: string, days: number, domain?: string) => {
//   const expires = new Date();
//   expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
//   let cookieString = `${name}=${value};expires=${expires.toUTCString()};path=/`;
//   if (domain) {
//     cookieString += `;domain=${domain}`;
//   }
//   document.cookie = cookieString;
// };

// // Fungsi untuk Ambil Nilai Cookie
// const getCookie = (name: string) => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop()?.split(";").shift();
//   return null;
// };

// export default function Header() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
//   const { cartTotalItems } = useCart();

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
//   const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
//   const [isMobileProductMenuOpen, setIsMobileProductMenuOpen] = useState(false);

//   const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false);
//   const [isMobileAboutMenuOpen, setIsMobileAboutMenuOpen] = useState(false);

//   // --- STATE UNTUK DROPDOWN BAHASA ---
//   const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
//   const langDropdownRef = useRef<HTMLDivElement>(null);
  
//   // Baca bahasa saat ini (dari Cookie)
//   const currentGoogTrans = getCookie("googtrans");
//   const initLang = currentGoogTrans === "/id/en" ? "en" : "id";
//   const [currentLang, setCurrentLang] = useState<"id" | "en">(initLang);

//   const [allProducts, setAllProducts] = useState<any[]>([]);
//   const [menuIds, setMenuIds] = useState({
//     pinkBrush: null as string | null,
//     blackBrush: null as string | null,
//     scalpCare: null as string | null,
//   });

//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [timeFilter, setTimeFilter] = useState("all");
//   const [isSearching, setIsSearching] = useState(false);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [searchResults, setSearchResults] = useState<any>({
//     products: [],
//     transactions: [],
//     carts: [],
//   });
//   const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     const userToken = localStorage.getItem("user_token");
//     const storedUser = localStorage.getItem("user_data");
//     if (userToken && storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }

//     const fetchForMenu = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         const data = await res.json();
//         const products = data.data ? data.data : data;
//         setAllProducts(products);

//         const pink = products.find((p: any) => p.name.toLowerCase().includes("brush") && p.name.toLowerCase().includes("pink"));
//         const black = products.find((p: any) => p.name.toLowerCase().includes("brush") && p.name.toLowerCase().includes("black"));
//         const scalp = products.find((p: any) => p.name.toLowerCase().includes("scalp"));

//         setMenuIds({
//           pinkBrush: pink?.slug || null,
//           blackBrush: black?.slug || null,
//           scalpCare: scalp?.slug || null,
//         });
//       } catch (err) {
//         console.error("Gagal load menu produk", err);
//       }
//     };
//     fetchForMenu();
//   }, []);

//   // --- EFEK UNTUK MENG-INJECT GOOGLE TRANSLATE ---
//   useEffect(() => {
//     if (!document.getElementById("google-translate-script")) {
//       const gTranslateContainer = document.createElement("div");
//       gTranslateContainer.id = "google_translate_element";
//       gTranslateContainer.style.display = "none";
//       document.body.appendChild(gTranslateContainer);

//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       (window as any).googleTranslateElementInit = () => {
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         new (window as any).google.translate.TranslateElement(
//           { pageLanguage: "id", includedLanguages: "en,id", autoDisplay: false },
//           "google_translate_element"
//         );
//       };

//       const script = document.createElement("script");
//       script.id = "google-translate-script";
//       script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//       script.async = true;
//       document.body.appendChild(script);
//     }
//   }, []);

//   // --- HANDLER UBAH BAHASA (AMAN) ---
//   const handleLanguageChange = (lang: "id" | "en") => {
//     if (lang === currentLang) {
//       setIsLangMenuOpen(false);
//       return;
//     }
    
//     if (lang === "en") {
//       setCookie("googtrans", "/id/en", 30); 
//       setCookie("googtrans", "/id/en", 30, window.location.hostname); 
//     } else {
//       document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//       document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
//     }

//     setCurrentLang(lang);
//     localStorage.setItem("app_lang", lang);
//     setIsLangMenuOpen(false);
    
//     // Reload halaman untuk terapkan terjemahan
//     window.location.reload(); 
//   };

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//       if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
//         setIsLangMenuOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (isMobileMenuOpen || isSearchOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isMobileMenuOpen, isSearchOpen]);

//   const handleLogout = () => {
//     setIsDropdownOpen(false);
    
//     Swal.fire({
//       title: "Keluar?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#059669",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Ya, Keluar",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("user_token");
//         localStorage.removeItem("user_data");
//         setUserData(null);
//         setIsMobileMenuOpen(false);
//         navigate("/");
//       }
//     });
//   };

//   useEffect(() => {
//     if (!isSearchOpen) return;

//     if (searchQuery.trim().length === 0) {
//       setSearchResults({ products: [], transactions: [], carts: [] });
//       setIsSearching(false);
//       return;
//     }

//     setIsSearching(true);

//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }

//     searchTimeoutRef.current = setTimeout(async () => {
//       try {
//         const token = localStorage.getItem("user_token");
//         const res = await fetch(
//           `${BASE_URL}/api/search?q=${encodeURIComponent(searchQuery)}&time=${timeFilter}`,
//           {
//             headers: {
//               Accept: "application/json",
//               ...(token && { Authorization: `Bearer ${token}` }),
//             },
//           }
//         );

//         if (res.ok) {
//           const data = await res.json();
//           setSearchResults(data);
//         } else {
//           setSearchResults({ products: [], transactions: [], carts: [] });
//         }
//       } catch (error) {
//         console.error("Global search error:", error);
//         setSearchResults({ products: [], transactions: [], carts: [] });
//       } finally {
//         setIsSearching(false);
//       }
//     }, 500);

//     return () => {
//       if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
//     };
//   }, [searchQuery, timeFilter, isSearchOpen]);

//   const closeSearchModal = () => {
//     setIsSearchOpen(false);
//     setSearchQuery("");
//     setSearchResults({ products: [], transactions: [], carts: [] });
//   };

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(angka || 0);
//   };

//   return (
//     <>
//       <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm notranslate">
//         <div className="relative flex items-center justify-between h-20 px-4 mx-auto max-w-[1536px] sm:px-6 lg:px-8">
          
//           <div className="flex items-center flex-1">
//             <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-gray-600 transition-colors rounded-md md:hidden hover:bg-gray-100">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
//             </button>

//             <nav className="items-center hidden gap-6 text-sm font-semibold text-gray-700 md:flex lg:gap-8">
//               <Link to="/" className="transition-colors translate hover:text-gycora">Home</Link>

//               <div 
//                 className="relative flex items-center h-full py-2 cursor-pointer group"
//                 onMouseEnter={() => setIsAboutMenuOpen(true)}
//                 onMouseLeave={() => setIsAboutMenuOpen(false)}
//               >
//                 <Link to="/about" className="flex items-center gap-1 transition-colors translate hover:text-gycora">
//                   About Us
//                   <svg
//                     className={`w-4 h-4 transition-transform duration-200 ${isAboutMenuOpen ? "rotate-180" : ""}`}
//                     fill="none" viewBox="0 0 24 24" stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </Link>

//                 {isAboutMenuOpen && (
//                   <div className="absolute left-0 pt-2 top-full w-52 animate-fade-in-up translate">
//                     <div className="py-2 bg-white border border-gray-100 shadow-2xl rounded-xl">
//                       <Link to="/about#our-story" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Story</Link>
//                       <Link to="/about#our-purpose" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Purpose</Link>
//                       <Link to="/about#our-innovation" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Innovation</Link>
//                       <Link to="/about#vision-mission" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Vision and Mission</Link>
//                       <Link to="/faq" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors border-t border-gray-100">FAQs</Link>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div 
//                 className="relative flex items-center h-full py-2 cursor-pointer group"
//                 onMouseEnter={() => setIsProductMenuOpen(true)}
//                 onMouseLeave={() => setIsProductMenuOpen(false)}
//               >
//                 <Link to="/products" className="flex items-center gap-1 transition-colors translate hover:text-gycora">
//                   Product
//                   <svg
//                     className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`}
//                     fill="none" viewBox="0 0 24 24" stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </Link>

//                 {isProductMenuOpen && (
//                   <div className="absolute left-0 w-64 pt-2 top-full animate-fade-in-up">
//                     <div className="py-2 bg-white border border-gray-100 shadow-2xl rounded-xl notranslate">
//                       <button 
//                         onClick={() => {
//                           const targetProduct = allProducts.find(p => p.slug === menuIds.pinkBrush);
//                           navigate(menuIds.pinkBrush ? `/product/${menuIds.pinkBrush}` : '/products', { 
//                             state: { initialProduct: targetProduct, allProducts } 
//                           });
//                         }} 
//                         className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors"
//                       >
//                         Ethereal Glow Brush Pink
//                       </button>
//                       <button 
//                         onClick={() => {
//                           const targetProduct = allProducts.find(p => p.slug === menuIds.blackBrush);
//                           navigate(menuIds.blackBrush ? `/product/${menuIds.blackBrush}` : '/products', { 
//                             state: { initialProduct: targetProduct, allProducts } 
//                           });
//                         }} 
//                         className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors"
//                       >
//                         Ethereal Glow Brush Black
//                       </button>
//                       <button 
//                         onClick={() => {
//                           const targetProduct = allProducts.find(p => p.slug === menuIds.scalpCare);
//                           navigate(menuIds.scalpCare ? `/product/${menuIds.scalpCare}` : '/products', { 
//                             state: { initialProduct: targetProduct, allProducts } 
//                           });
//                         }} 
//                         className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors"
//                       >
//                         Eco Serenity Scalp Care
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <Link to="/events" className="transition-colors translate hover:text-gycora">Events</Link>
//               <Link to="/consult" className="transition-colors translate hover:text-gycora">Consult</Link>
//             </nav>
//           </div>

//           <div className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer left-1/2 top-1/2 notranslate" onClick={() => navigate("/")}>
//             <img src={logoGycora} alt="Gycora Logo" className="object-contain h-8 md:h-10" />
//           </div>

//           <div className="flex items-center justify-end flex-1 gap-2 md:gap-5">
            
//             {/* --- DROPDOWN BAHASA --- */}
//             <div className="relative" ref={langDropdownRef}>
//               <button 
//                 onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
//                 className="flex items-center gap-1 p-1.5 text-xs font-bold text-gray-600 uppercase transition-colors rounded-lg hover:bg-gray-100 hover:text-gycora notranslate"
//                 title="Ganti Bahasa"
//               >
//                 <span>{currentLang}</span>
//                 <svg className={`w-3 h-3 transition-transform ${isLangMenuOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>
              
//               {isLangMenuOpen && (
//                 <div className="absolute right-0 z-50 w-32 py-2 mt-2 bg-white border border-gray-100 shadow-xl rounded-xl animate-fade-in-up">
//                   <button 
//                     onClick={() => handleLanguageChange("id")}
//                     className={`w-full text-left px-4 py-2 text-sm transition-colors ${currentLang === 'id' ? 'text-gycora font-bold bg-emerald-50' : 'text-gray-700 hover:bg-gray-50'}`}
//                   >
//                     🇮🇩 Indonesia
//                   </button>
//                   <button 
//                     onClick={() => handleLanguageChange("en")}
//                     className={`w-full text-left px-4 py-2 text-sm transition-colors ${currentLang === 'en' ? 'text-gycora font-bold bg-emerald-50' : 'text-gray-700 hover:bg-gray-50'}`}
//                   >
//                     🇬🇧 English
//                   </button>
//                 </div>
//               )}
//             </div>

//             {userData ? (
//               <div className="relative hidden md:block" ref={dropdownRef}>
//                 <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 cursor-pointer group focus:outline-none">
//                   <div className="flex items-center justify-center w-8 h-8 text-sm font-bold transition-colors rounded-full bg-gycora-light text-gycora-dark group-hover:bg-gycora group-hover:text-white notranslate">
//                     {userData.first_name.charAt(0)}
//                   </div>
//                   <span className="hidden text-sm font-semibold text-gray-800 transition-colors md:block group-hover:text-gycora notranslate">Hi, {userData.first_name}</span>
//                 </button>
//                 {isDropdownOpen && (
//                   <div className="absolute right-0 w-48 py-2 mt-3 bg-white border border-gray-100 shadow-xl rounded-xl animate-fade-in-up translate">
//                     <Link to="/profile" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profil Saya</Link>
//                     <Link to="/orders" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Pesanan Saya</Link>
//                     <button onClick={handleLogout} className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50">Keluar</button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link to="/login" className="hidden text-sm font-medium text-gray-600 transition-colors md:block hover:text-gycora translate">Login</Link>
//             )}
            
//             <button onClick={() => setIsSearchOpen(true)} className="p-1.5 text-gray-600 hover:text-gycora">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
//             </button>
            
//             {userData && (
//               <button onClick={() => navigate("/chat")} className="relative hidden md:block p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora" title="Chat dengan Pakar">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                 </svg>
//               </button>
//             )}

//             <button onClick={() => navigate("/cart")} className="relative p-1.5 text-gray-600 hover:text-gycora">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
//               {cartTotalItems > 0 && <span className="absolute top-0 right-0 bg-gycora text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1 notranslate">{cartTotalItems}</span>}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* MOBILE MENU */}
//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 z-[100] md:hidden">
//           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
//           <div className="absolute inset-y-0 left-0 w-4/5 max-w-sm p-4 overflow-y-auto bg-white shadow-2xl translate">
//              <div className="flex items-center justify-between mb-8 notranslate">
//                 <img src={logoGycora} alt="Logo" className="h-6" />
//                 <button onClick={() => setIsMobileMenuOpen(false)}><svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
//              </div>
             
//              {userData && (
//               <div className="flex items-center gap-3 p-4 mb-4 border border-gray-100 rounded-xl bg-emerald-50/30 notranslate">
//                 <div className="flex items-center justify-center w-12 h-12 font-bold rounded-full bg-gycora-light text-gycora-dark">
//                   {userData.first_name.charAt(0)}
//                 </div>
//                 <div>
//                   <p className="text-sm font-bold text-gray-900">{userData.first_name} {userData.last_name}</p>
//                   <p className="text-xs text-gray-500">{userData.email}</p>
//                 </div>
//               </div>
//             )}

//              <nav className="flex flex-col gap-4">
//                 <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Home</Link>
                
//                 <div>
//                    <button onClick={() => setIsMobileAboutMenuOpen(!isMobileAboutMenuOpen)} className="flex items-center justify-between w-full text-lg font-bold">
//                       About Us
//                       <svg className={`w-5 h-5 transition-transform ${isMobileAboutMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
//                    </button>
//                    {isMobileAboutMenuOpen && (
//                       <div className="flex flex-col gap-3 pl-4 mt-2 text-gray-600">
//                          <Link to="/about#our-story" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Story</Link>
//                          <Link to="/about#our-purpose" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Purpose</Link>
//                          <Link to="/about#our-innovation" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Innovation</Link>
//                          <Link to="/about#vision-mission" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Vision and Mission</Link>
//                          <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)} className="text-left text-gycora">FAQs</Link>
//                       </div>
//                    )}
//                 </div>

//                 <div className="notranslate">
//                    <button onClick={() => setIsMobileProductMenuOpen(!isMobileProductMenuOpen)} className="flex items-center justify-between w-full text-lg font-bold translate">
//                       Product
//                       <svg className={`w-5 h-5 transition-transform ${isMobileProductMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
//                    </button>
//                    {isMobileProductMenuOpen && (
//                       <div className="flex flex-col gap-3 pl-4 mt-2 text-gray-600">
//                          <button className="text-left" onClick={() => { 
//                            setIsMobileMenuOpen(false); 
//                            const targetProduct = allProducts.find(p => p.slug === menuIds.pinkBrush);
//                            navigate(menuIds.pinkBrush ? `/product/${menuIds.pinkBrush}` : '/products', { state: { initialProduct: targetProduct, allProducts } }); 
//                          }}>Ethereal Glow Brush Pink</button>
//                          <button className="text-left" onClick={() => { 
//                            setIsMobileMenuOpen(false); 
//                            const targetProduct = allProducts.find(p => p.slug === menuIds.blackBrush);
//                            navigate(menuIds.blackBrush ? `/product/${menuIds.blackBrush}` : '/products', { state: { initialProduct: targetProduct, allProducts } }); 
//                          }}>Ethereal Glow Brush Black</button>
//                          <button className="text-left" onClick={() => { 
//                            setIsMobileMenuOpen(false); 
//                            const targetProduct = allProducts.find(p => p.slug === menuIds.scalpCare);
//                            navigate(menuIds.scalpCare ? `/product/${menuIds.scalpCare}` : '/products', { state: { initialProduct: targetProduct, allProducts } }); 
//                          }}>Eco Serenity Scalp Care</button>
//                       </div>
//                    )}
//                 </div>

//                 <Link to="/events" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Events</Link>
//                 <Link to="/consult" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Consult</Link>
             
//                 {userData ? (
//                   <>
//                     <div className="my-2 border-t border-gray-100"></div>
//                     <Link to="/chat" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">Live Chat Pakar</Link>
//                     <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">Profil Saya</Link>
//                     <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">Pesanan Saya</Link>
//                     <button onClick={handleLogout} className="mt-4 font-bold text-left text-red-600">Keluar</button>
//                   </>
//                 ) : (
//                   <div className="flex flex-col gap-2 mt-4">
//                     <button onClick={() => { setIsMobileMenuOpen(false); navigate("/login"); }} className="w-full px-4 py-3 text-sm font-bold text-white bg-gray-900 rounded-xl">Masuk</button>
//                     <button onClick={() => { setIsMobileMenuOpen(false); navigate("/register"); }} className="w-full px-4 py-3 text-sm font-bold text-gray-700 border border-gray-200 rounded-xl">Daftar Akun Baru</button>
//                   </div>
//                 )}
//              </nav>
//           </div>
//         </div>
//       )}

//       {/* GLOBAL SEARCH MODAL */}
//       {isSearchOpen && (
//         <div className="fixed inset-0 z-[100] flex justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
//           <div className="absolute inset-0" onClick={closeSearchModal}></div>

//           <div className="relative flex flex-col w-full max-w-3xl mt-16 md:mt-24 overflow-hidden bg-white shadow-2xl h-[85vh] md:h-[75vh] rounded-t-3xl md:rounded-3xl animate-fade-in-up translate">
//             <div className="flex flex-col p-4 border-b border-gray-100 md:p-6 bg-gray-50/50">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-bold text-gray-900">
//                   Pencarian Universal
//                 </h2>
//                 <button onClick={closeSearchModal} className="p-1 text-gray-400 bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100">
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               <div className="relative">
//                 <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Cari produk, No. Pesanan (INV-...), atau status..."
//                   className="w-full py-3 pl-12 pr-4 text-sm font-medium transition-all bg-white border border-gray-300 shadow-sm outline-none rounded-xl focus:ring-2 focus:ring-gycora focus:border-transparent notranslate"
//                   autoFocus
//                 />
//               </div>

//               <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
//                 {[
//                   { id: "all", label: "Semua Waktu" },
//                   { id: "7d", label: "7 Hari Terakhir" },
//                   { id: "30d", label: "30 Hari Terakhir" },
//                   { id: "90d", label: "3 Bulan Terakhir" },
//                 ].map((filter) => (
//                   <button
//                     key={filter.id}
//                     onClick={() => setTimeFilter(filter.id)}
//                     className={`shrink-0 px-4 py-1.5 text-xs font-bold rounded-full transition-all border ${timeFilter === filter.id ? "bg-gycora text-white border-gycora shadow-md" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100"}`}
//                   >
//                     {filter.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="flex-1 p-4 overflow-y-auto bg-white md:p-6 custom-scrollbar">
//               {searchQuery.trim().length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
//                   <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <p className="text-sm font-medium">Ketik kata kunci untuk memulai pencarian.</p>
//                 </div>
//               ) : isSearching ? (
//                 <div className="flex flex-col items-center justify-center h-full gap-3 text-gycora">
//                   <div className="w-8 h-8 border-4 rounded-full border-emerald-100 border-t-gycora animate-spin"></div>
//                   <p className="text-xs font-bold tracking-widest uppercase animate-pulse">Mencari data...</p>
//                 </div>
//               ) : (
//                 <div className="space-y-8 animate-fade-in">
//                   {searchResults.products && searchResults.products.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">Produk Katalog</h3>
//                       <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
//                         {searchResults.products.map((product: any) => (
//                           <div
//                             key={`prod-${product.id}`}
//                             onClick={() => { closeSearchModal(); navigate(`/product/${product.slug}`); }}
//                             className="flex items-center gap-3 p-3 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group notranslate"
//                           >
//                             <img src={product.image_url} alt={product.name} className="object-cover w-12 h-12 rounded-lg bg-gray-50 shrink-0" />
//                             <div className="flex-1 min-w-0">
//                               <p className="text-sm font-bold text-gray-900 truncate group-hover:text-gycora">{product.name}</p>
//                               <p className="text-xs text-gray-500 font-mono mt-0.5">{product.sku}</p>
//                             </div>
//                             <span className="text-sm font-black text-gycora shrink-0">{formatRupiah(product.price)}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {searchResults.transactions && searchResults.transactions.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">Riwayat Transaksi</h3>
//                       <div className="flex flex-col gap-3">
//                         {searchResults.transactions.map((trx: any) => (
//                           <div
//                             key={`trx-${trx.id}`}
//                             onClick={() => { closeSearchModal(); navigate(`/orders`); }}
//                             className="flex items-center justify-between p-4 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
//                           >
//                             <div className="flex items-center gap-4">
//                               <div className="flex items-center justify-center w-10 h-10 text-gray-500 bg-gray-100 rounded-full shadow-sm group-hover:bg-white group-hover:text-gycora">
//                                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                                 </svg>
//                               </div>
//                               <div className="notranslate">
//                                 <p className="font-mono text-sm font-bold text-gray-900 group-hover:text-gycora">{trx.order_id}</p>
//                                 <p className="mt-1 text-xs text-gray-500">{new Date(trx.created_at).toLocaleDateString("id-ID")}</p>
//                               </div>
//                             </div>
//                             <div className="text-right">
//                               <p className="text-sm font-black text-gray-900 notranslate">{formatRupiah(trx.total_amount)}</p>
//                               <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-600 translate">{trx.status}</span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {!isSearching && searchResults.products?.length === 0 && searchResults.transactions?.length === 0 && searchResults.carts?.length === 0 && (
//                     <div className="flex flex-col items-center justify-center py-10 text-center">
//                       <p className="text-lg font-bold text-gray-900">Oops, tidak ditemukan!</p>
//                       <p className="max-w-sm mt-2 text-sm text-gray-500">Kami tidak dapat menemukan hasil untuk "{searchQuery}" dengan rentang waktu yang Anda pilih.</p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCart } from "../context/CartContext";
// import { useMessage } from "../context/MessageContext";
import logoGycora from "../assets/gycora_logo.png";
import { BASE_URL } from "../config/api";

export default function Header() {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userData, setUserData] = useState<any>(null);
  const { cartTotalItems } = useCart();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [isMobileProductMenuOpen, setIsMobileProductMenuOpen] = useState(false);

  const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false);
  const [isMobileAboutMenuOpen, setIsMobileAboutMenuOpen] = useState(false);

  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [menuIds, setMenuIds] = useState({
    pinkBrush: null as string | null,
    blackBrush: null as string | null,
    scalpCare: null as string | null,
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const [isSearching, setIsSearching] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [searchResults, setSearchResults] = useState<any>({
    products: [],
    transactions: [],
    carts: [],
  });
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const storedUser = localStorage.getItem("user_data");
    if (userToken && storedUser) {
      setUserData(JSON.parse(storedUser));
    }

    const fetchForMenu = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products`);
        const data = await res.json();
        const products = data.data ? data.data : data;
        setAllProducts(products);

        const pink = products.find((p: any) => p.name.toLowerCase().includes("brush") && p.name.toLowerCase().includes("pink"));
        const black = products.find((p: any) => p.name.toLowerCase().includes("brush") && p.name.toLowerCase().includes("black"));
        const scalp = products.find((p: any) => p.name.toLowerCase().includes("scalp"));

        setMenuIds({
          pinkBrush: pink?.slug || null,
          blackBrush: black?.slug || null,
          scalpCare: scalp?.slug || null,
        });
      } catch (err) {
        console.error("Gagal load menu produk", err);
      }
    };
    fetchForMenu();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen, isSearchOpen]);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    
    Swal.fire({
      title: "Keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Keluar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user_token");
        localStorage.removeItem("user_data");
        setUserData(null);
        setIsMobileMenuOpen(false);
        navigate("/");
      }
    });
  };

  useEffect(() => {
    if (!isSearchOpen) return;

    if (searchQuery.trim().length === 0) {
      setSearchResults({ products: [], transactions: [], carts: [] });
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const token = localStorage.getItem("user_token");
        const res = await fetch(
          `${BASE_URL}/api/search?q=${encodeURIComponent(searchQuery)}&time=${timeFilter}`,
          {
            headers: {
              Accept: "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          setSearchResults(data);
        } else {
          setSearchResults({ products: [], transactions: [], carts: [] });
        }
      } catch (error) {
        console.error("Global search error:", error);
        setSearchResults({ products: [], transactions: [], carts: [] });
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [searchQuery, timeFilter, isSearchOpen]);

  const closeSearchModal = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults({ products: [], transactions: [], carts: [] });
  };

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka || 0);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="relative flex items-center justify-between h-20 px-4 mx-auto max-w-[1536px] sm:px-6 lg:px-8">
          
          <div className="flex items-center flex-1">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-gray-600 transition-colors rounded-md md:hidden hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>

            <nav className="items-center hidden gap-6 text-sm font-semibold text-gray-700 md:flex lg:gap-8">
              <Link to="/" className="transition-colors hover:text-gycora">Home</Link>

              <div 
                className="relative flex items-center h-full py-2 cursor-pointer group"
                onMouseEnter={() => setIsAboutMenuOpen(true)}
                onMouseLeave={() => setIsAboutMenuOpen(false)}
              >
                <Link to="/about" className="flex items-center gap-1 transition-colors hover:text-gycora">
                  About Us
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isAboutMenuOpen ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                {isAboutMenuOpen && (
                  <div className="absolute left-0 pt-2 top-full w-52 animate-fade-in-up">
                    <div className="py-2 bg-white border border-gray-100 shadow-2xl rounded-xl">
                      <Link to="/about#our-story" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Story</Link>
                      <Link to="/about#our-purpose" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Purpose</Link>
                      <Link to="/about#our-innovation" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Innovation</Link>
                      <Link to="/about#vision-mission" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Vision and Mission</Link>
                      <Link to="/faq" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors border-t border-gray-100">FAQs</Link>
                    </div>
                  </div>
                )}
              </div>

              <div 
                className="relative flex items-center h-full py-2 cursor-pointer group"
                onMouseEnter={() => setIsProductMenuOpen(true)}
                onMouseLeave={() => setIsProductMenuOpen(false)}
              >
                <Link to="/products" className="flex items-center gap-1 transition-colors hover:text-gycora">
                  Product
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                {isProductMenuOpen && (
                  <div className="absolute left-0 w-64 pt-2 top-full animate-fade-in-up">
                    <div className="py-2 bg-white border border-gray-100 shadow-2xl rounded-xl">
                      <button 
                        onClick={() => {
                          const targetProduct = allProducts.find(p => p.slug === menuIds.pinkBrush);
                          navigate(menuIds.pinkBrush ? `/product/${menuIds.pinkBrush}` : '/products', { 
                            state: { initialProduct: targetProduct, allProducts } 
                          });
                        }} 
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors"
                      >
                        Ethereal Glow Brush Pink
                      </button>
                      <button 
                        onClick={() => {
                          const targetProduct = allProducts.find(p => p.slug === menuIds.blackBrush);
                          navigate(menuIds.blackBrush ? `/product/${menuIds.blackBrush}` : '/products', { 
                            state: { initialProduct: targetProduct, allProducts } 
                          });
                        }} 
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors"
                      >
                        Ethereal Glow Brush Black
                      </button>
                      <button 
                        onClick={() => {
                          const targetProduct = allProducts.find(p => p.slug === menuIds.scalpCare);
                          navigate(menuIds.scalpCare ? `/product/${menuIds.scalpCare}` : '/products', { 
                            state: { initialProduct: targetProduct, allProducts } 
                          });
                        }} 
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors"
                      >
                        Eco Serenity Scalp Care
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/events" className="transition-colors hover:text-gycora">Events</Link>
              <Link to="/consult" className="transition-colors hover:text-gycora">Consult</Link>
            </nav>
          </div>

          <div className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer left-1/2 top-1/2" onClick={() => navigate("/")}>
            <img src={logoGycora} alt="Gycora Logo" className="object-contain h-8 md:h-10" />
          </div>

          <div className="flex items-center justify-end flex-1 gap-2 md:gap-5">
            {userData ? (
              <div className="relative hidden md:block" ref={dropdownRef}>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 cursor-pointer group focus:outline-none">
                  <div className="flex items-center justify-center w-8 h-8 text-sm font-bold transition-colors rounded-full bg-gycora-light text-gycora-dark group-hover:bg-gycora group-hover:text-white">
                    {userData.first_name.charAt(0)}
                  </div>
                  <span className="hidden text-sm font-semibold text-gray-800 transition-colors md:block group-hover:text-gycora">Hi, {userData.first_name}</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 w-48 py-2 mt-3 bg-white border border-gray-100 shadow-xl rounded-xl animate-fade-in-up">
                    <Link to="/profile" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profil Saya</Link>
                    <Link to="/orders" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Pesanan Saya</Link>
                    <button onClick={handleLogout} className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50">Keluar</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="hidden text-sm font-medium text-gray-600 transition-colors md:block hover:text-gycora">Login</Link>
            )}
            
            <button onClick={() => setIsSearchOpen(true)} className="p-1.5 text-gray-600 hover:text-gycora">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
            
            {userData && (
              <button onClick={() => navigate("/chat")} className="relative hidden md:block p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora" title="Chat dengan Pakar">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            )}

            <button onClick={() => navigate("/cart")} className="relative p-1.5 text-gray-600 hover:text-gycora">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              {cartTotalItems > 0 && <span className="absolute top-0 right-0 bg-gycora text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1">{cartTotalItems}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="absolute inset-y-0 left-0 w-4/5 max-w-sm p-4 overflow-y-auto bg-white shadow-2xl">
             <div className="flex items-center justify-between mb-8">
                <img src={logoGycora} alt="Logo" className="h-6" />
                <button onClick={() => setIsMobileMenuOpen(false)}><svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
             </div>
             
             {userData && (
              <div className="flex items-center gap-3 p-4 mb-4 border border-gray-100 rounded-xl bg-emerald-50/30">
                <div className="flex items-center justify-center w-12 h-12 font-bold rounded-full bg-gycora-light text-gycora-dark">
                  {userData.first_name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{userData.first_name} {userData.last_name}</p>
                  <p className="text-xs text-gray-500">{userData.email}</p>
                </div>
              </div>
            )}

             <nav className="flex flex-col gap-4">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Home</Link>
                
                <div>
                   <button onClick={() => setIsMobileAboutMenuOpen(!isMobileAboutMenuOpen)} className="flex items-center justify-between w-full text-lg font-bold">
                      About Us
                      <svg className={`w-5 h-5 transition-transform ${isMobileAboutMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                   </button>
                   {isMobileAboutMenuOpen && (
                      <div className="flex flex-col gap-3 pl-4 mt-2 text-gray-600">
                         <Link to="/about#our-story" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Story</Link>
                         <Link to="/about#our-purpose" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Purpose</Link>
                         <Link to="/about#our-innovation" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Innovation</Link>
                         <Link to="/about#vision-mission" onClick={() => setIsMobileMenuOpen(false)} className="text-left">Vision and Mission</Link>
                         <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)} className="text-left text-gycora">FAQs</Link>
                      </div>
                   )}
                </div>

                <div>
                   <button onClick={() => setIsMobileProductMenuOpen(!isMobileProductMenuOpen)} className="flex items-center justify-between w-full text-lg font-bold">
                      Product
                      <svg className={`w-5 h-5 transition-transform ${isMobileProductMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                   </button>
                   {isMobileProductMenuOpen && (
                      <div className="flex flex-col gap-3 pl-4 mt-2 text-gray-600">
                         <button className="text-left" onClick={() => { 
                           setIsMobileMenuOpen(false); 
                           const targetProduct = allProducts.find(p => p.slug === menuIds.pinkBrush);
                           navigate(menuIds.pinkBrush ? `/product/${menuIds.pinkBrush}` : '/products', { state: { initialProduct: targetProduct, allProducts } }); 
                         }}>Ethereal Glow Brush Pink</button>
                         <button className="text-left" onClick={() => { 
                           setIsMobileMenuOpen(false); 
                           const targetProduct = allProducts.find(p => p.slug === menuIds.blackBrush);
                           navigate(menuIds.blackBrush ? `/product/${menuIds.blackBrush}` : '/products', { state: { initialProduct: targetProduct, allProducts } }); 
                         }}>Ethereal Glow Brush Black</button>
                         <button className="text-left" onClick={() => { 
                           setIsMobileMenuOpen(false); 
                           const targetProduct = allProducts.find(p => p.slug === menuIds.scalpCare);
                           navigate(menuIds.scalpCare ? `/product/${menuIds.scalpCare}` : '/products', { state: { initialProduct: targetProduct, allProducts } }); 
                         }}>Eco Serenity Scalp Care</button>
                      </div>
                   )}
                </div>

                <Link to="/events" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Events</Link>
                <Link to="/consult" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Consult</Link>
             
                {userData ? (
                  <>
                    <div className="my-2 border-t border-gray-100"></div>
                    <Link to="/chat" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">Live Chat Pakar</Link>
                    <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">Profil Saya</Link>
                    <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">Pesanan Saya</Link>
                    <button onClick={handleLogout} className="mt-4 font-bold text-left text-red-600">Keluar</button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 mt-4">
                    <button onClick={() => { setIsMobileMenuOpen(false); navigate("/login"); }} className="w-full px-4 py-3 text-sm font-bold text-white bg-gray-900 rounded-xl">Masuk</button>
                    <button onClick={() => { setIsMobileMenuOpen(false); navigate("/register"); }} className="w-full px-4 py-3 text-sm font-bold text-gray-700 border border-gray-200 rounded-xl">Daftar Akun Baru</button>
                  </div>
                )}
             </nav>
          </div>
        </div>
      )}

      {/* GLOBAL SEARCH MODAL */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="absolute inset-0" onClick={closeSearchModal}></div>

          <div className="relative flex flex-col w-full max-w-3xl mt-16 md:mt-24 overflow-hidden bg-white shadow-2xl h-[85vh] md:h-[75vh] rounded-t-3xl md:rounded-3xl animate-fade-in-up">
            <div className="flex flex-col p-4 border-b border-gray-100 md:p-6 bg-gray-50/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  Pencarian Universal
                </h2>
                <button onClick={closeSearchModal} className="p-1 text-gray-400 bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="relative">
                <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari produk, No. Pesanan (INV-...), atau status..."
                  className="w-full py-3 pl-12 pr-4 text-sm font-medium transition-all bg-white border border-gray-300 shadow-sm outline-none rounded-xl focus:ring-2 focus:ring-gycora focus:border-transparent"
                  autoFocus
                />
              </div>

              <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
                {[
                  { id: "all", label: "Semua Waktu" },
                  { id: "7d", label: "7 Hari Terakhir" },
                  { id: "30d", label: "30 Hari Terakhir" },
                  { id: "90d", label: "3 Bulan Terakhir" },
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setTimeFilter(filter.id)}
                    className={`shrink-0 px-4 py-1.5 text-xs font-bold rounded-full transition-all border ${timeFilter === filter.id ? "bg-gycora text-white border-gycora shadow-md" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100"}`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-white md:p-6 custom-scrollbar">
              {searchQuery.trim().length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
                  <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm font-medium">Ketik kata kunci untuk memulai pencarian.</p>
                </div>
              ) : isSearching ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-gycora">
                  <div className="w-8 h-8 border-4 rounded-full border-emerald-100 border-t-gycora animate-spin"></div>
                  <p className="text-xs font-bold tracking-widest uppercase animate-pulse">Mencari data...</p>
                </div>
              ) : (
                <div className="space-y-8 animate-fade-in">
                  {searchResults.products && searchResults.products.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">Produk Katalog</h3>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {searchResults.products.map((product: any) => (
                          <div
                            key={`prod-${product.id}`}
                            onClick={() => { closeSearchModal(); navigate(`/product/${product.slug}`); }}
                            className="flex items-center gap-3 p-3 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
                          >
                            <img src={product.image_url} alt={product.name} className="object-cover w-12 h-12 rounded-lg bg-gray-50 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-gray-900 truncate group-hover:text-gycora">{product.name}</p>
                              <p className="text-xs text-gray-500 font-mono mt-0.5">{product.sku}</p>
                            </div>
                            <span className="text-sm font-black text-gycora shrink-0">{formatRupiah(product.price)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {searchResults.transactions && searchResults.transactions.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">Riwayat Transaksi</h3>
                      <div className="flex flex-col gap-3">
                        {searchResults.transactions.map((trx: any) => (
                          <div
                            key={`trx-${trx.id}`}
                            onClick={() => { closeSearchModal(); navigate(`/orders`); }}
                            className="flex items-center justify-between p-4 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex items-center justify-center w-10 h-10 text-gray-500 bg-gray-100 rounded-full shadow-sm group-hover:bg-white group-hover:text-gycora">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </div>
                              <div>
                                <p className="font-mono text-sm font-bold text-gray-900 group-hover:text-gycora">{trx.order_id}</p>
                                <p className="mt-1 text-xs text-gray-500">{new Date(trx.created_at).toLocaleDateString("id-ID")}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-black text-gray-900">{formatRupiah(trx.total_amount)}</p>
                              <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-600">{trx.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {!isSearching && searchResults.products?.length === 0 && searchResults.transactions?.length === 0 && searchResults.carts?.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <p className="text-lg font-bold text-gray-900">Oops, tidak ditemukan!</p>
                      <p className="max-w-sm mt-2 text-sm text-gray-500">Kami tidak dapat menemukan hasil untuk "{searchQuery}" dengan rentang waktu yang Anda pilih.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}