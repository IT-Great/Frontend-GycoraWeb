// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Ganti dari next/navigation
// import Swal from "sweetalert2";
// import { useCart } from "../../context/CartContext"; // Sesuaikan path import
// import { BASE_URL } from "../../config/api";
// // import { useLanguage } from "../../context/LanguageContext"; // [BARU] Import Context Bahasa
// import { useCurrency } from "../../context/CurrencyContext";

// interface Address {
//   id: number;
//   receiver: { full_name: string };
//   details: {
//     location: string;
//     city: string;
//     province: string;
//     postal_code: string;
//     type: string;
//   };
//   is_default: boolean;
// }

// interface ShippingRate {
//   courier_name: string;
//   courier_service_name: string;
//   price: number;
//   duration: string;
// }

// export default function CheckoutPage() {
//   const navigate = useNavigate(); // Menggunakan useNavigate
//   const [userData, setUserData] = useState<any>(null);
//   const { cartItems, cartSubtotal } = useCart();
//   const { formatPrice } = useCurrency();

//   // States
//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
//     null,
//   );

//   const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
//   const [selectedRate, setSelectedRate] = useState<ShippingRate | null>(null);
//   const [isLoadingRates, setIsLoadingRates] = useState(false);

//   const [deliveryType, setDeliveryType] = useState("later"); // now, later, scheduled
//   const [pointsInput, setPointsInput] = useState<number | "">("");

//   const [isProcessing, setIsProcessing] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("user_token");
//     const storedUser = localStorage.getItem("user_data");

//     if (!token || !storedUser) {
//       navigate("/login"); // Mengganti router.push
//       return;
//     }

//     setUserData(JSON.parse(storedUser));
//     fetchAddresses(token);
//   }, [navigate]);

//   // Jika keranjang kosong saat masuk halaman ini, tendang balik ke products
//   useEffect(() => {
//     if (cartItems.length === 0) {
//       Swal.fire(
//         "Keranjang Kosong",
//         "Silakan pilih produk terlebih dahulu",
//         "warning",
//       ).then(() => {
//         navigate("/products"); // Mengganti router.push
//       });
//     }
//   }, [cartItems, navigate]);

//   // Fetch Buku Alamat
//   const fetchAddresses = async (token: string) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/addresses`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.ok) {
//         const data = await res.json();
//         const responseData = data.data ? data.data : data.data;
//         setAddresses(responseData || []);
//         // Auto-select alamat utama (default) jika ada
//         const defaultAddr = data.find((a: Address) => a.is_default);
//         if (defaultAddr) setSelectedAddressId(defaultAddr.id);
//         else if (data.length > 0) setSelectedAddressId(data[0].id);
//       }
//     } catch (error) {
//       console.error("Gagal memuat alamat", error);
//     }
//   };

//   // Fetch Ongkos Kirim (Biteship Mock) setiap kali alamat berubah
//   useEffect(() => {
//     if (!selectedAddressId || cartItems.length === 0) return;

//     const fetchRates = async () => {
//       setIsLoadingRates(true);
//       setSelectedRate(null);
//       const token = localStorage.getItem("user_token");
//       const cartIds = cartItems.map((item) => item.id);

//       try {
//         const res = await fetch(`${BASE_URL}/api/shipping-rates`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             address_id: selectedAddressId,
//             cart_ids: cartIds,
//           }),
//         });

//         if (res.ok) {
//           const data = await res.json();
//           const responseData = data.data ? data.data : data.data;
//           if (responseData.success) {
//             setShippingRates(responseData.pricing);
//             if (responseData.pricing.length > 0) {
//               setSelectedRate(responseData.pricing[0]); // Auto-select kurir pertama
//             }
//           }
//         }
//       } catch (error) {
//         console.error("Gagal menghitung ongkir", error);
//       } finally {
//         setIsLoadingRates(false);
//       }
//     };

//     fetchRates();
//   }, [selectedAddressId, cartItems]);

//   // Kalkulasi Keuangan
//   const userPoints = userData?.point || 0;
//   // Pastikan poin yang dipakai tidak melebihi poin yang dimiliki ATAU total tagihan
//   const maxUsablePoints = Math.min(userPoints, Math.floor(cartSubtotal / 1000));
//   const validPointsUsed = Math.min(Number(pointsInput) || 0, maxUsablePoints);
//   const pointDiscount = validPointsUsed * 1000;

//   const shippingCost = selectedRate ? selectedRate.price : 0;
//   const grandTotal = cartSubtotal + shippingCost - pointDiscount;

//   // Handler Submit Checkout
//   const handleProcessPayment = async () => {
//     if (!selectedAddressId) {
//       return Swal.fire(
//         "Alamat Diperlukan",
//         "Pilih alamat pengiriman terlebih dahulu",
//         "error",
//       );
//     }
//     if (!selectedRate) {
//       return Swal.fire("Kurir Diperlukan", "Pilih metode pengiriman", "error");
//     }

//     setIsProcessing(true);
//     const token = localStorage.getItem("user_token");
//     const cartIds = cartItems.map((item) => item.id);

//     const payload = {
//       address_id: selectedAddressId,
//       shipping_method: "biteship", // Karena kita pakai mock courier
//       use_points: validPointsUsed,
//       cart_ids: cartIds,
//       shipping_cost: selectedRate.price,
//       courier_company: selectedRate.courier_name,
//       courier_type: selectedRate.courier_service_name,
//       delivery_type: deliveryType,
//       promo_code: "", // Kosongkan dulu untuk MVP ini
//     };

//     try {
//       const res = await fetch(`${BASE_URL}/api/checkout`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         // Redirect ke URL Mock Xendit yang diberikan Golang
//         // window.location.href tetap digunakan karena ini pindah ke luar sistem React (ke Gateway Pembayaran)
//         window.location.href = data.checkout_url;
//       } else {
//         Swal.fire(
//           "Checkout Gagal",
//           data.message || "Terjadi kesalahan sistem",
//           "error",
//         );
//         setIsProcessing(false);
//       }
//     } catch (error) {
//       console.error("Error process payment:", error); // Menghindari warning linter
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//       setIsProcessing(false);
//     }
//   };

//   // const formatRupiah = (angka: number) => {
//   //   return new Intl.NumberFormat("id-ID", {
//   //     style: "currency",
//   //     currency: "IDR",
//   //     minimumFractionDigits: 0,
//   //   }).format(angka);
//   // };

//   // Hilangkan pengecekan !isClient, langsung cek apakah keranjang kosong untuk state loading/empty
//   if (cartItems.length === 0) {
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-12 font-sans bg-gray-50">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         {/* Header Breadcrumb */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
//             Checkout
//           </h1>
//           <p className="mt-1 text-gray-500">
//             Selesaikan pesanan Anda dengan aman.
//           </p>
//         </div>

//         <div className="flex flex-col gap-8 lg:flex-row">
//           {/* KOLOM KIRI: FORM PENGISIAN */}
//           <div className="w-full space-y-6 lg:w-2/3">
//             {/* 1. Alamat Pengiriman */}
//             <div className="p-6 bg-white border border-gray-100 shadow-sm md:p-8 rounded-2xl">
//               <h2 className="flex items-center gap-2 mb-6 text-xl font-bold text-gray-900">
//                 <span className="flex items-center justify-center w-6 h-6 text-sm text-white rounded-full bg-gycora">
//                   1
//                 </span>
//                 Alamat Pengiriman
//               </h2>

//               {addresses.length === 0 ? (
//                 <div className="p-6 text-center border-2 border-gray-300 border-dashed rounded-xl">
//                   <p className="mb-4 text-gray-500">
//                     Anda belum memiliki alamat.
//                   </p>
//                   <button
//                     onClick={() => navigate("/profile")}
//                     className="px-6 py-2 text-sm font-bold text-white bg-gray-900 rounded-full"
//                   >
//                     Tambah Alamat
//                   </button>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                   {addresses.map((addr) => (
//                     <div
//                       key={addr.id}
//                       onClick={() => setSelectedAddressId(addr.id)}
//                       className={`cursor-pointer relative p-4 rounded-xl border-2 transition-all ${selectedAddressId === addr.id ? "border-gycora bg-emerald-50/20" : "border-gray-200 hover:border-gray-300"}`}
//                     >
//                       {addr.is_default && (
//                         <span className="absolute top-3 right-3 text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">
//                           Utama
//                         </span>
//                       )}
//                       <h3 className="font-bold text-gray-900">
//                         {addr.receiver.full_name}
//                       </h3>
//                       <p className="mt-1 text-sm text-gray-600">
//                         {addr.details.location}, {addr.details.city}
//                       </p>
//                       <p className="mt-1 text-xs text-gray-500">
//                         {addr.details.postal_code}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* 2. Metode Pengiriman (Kurir) */}
//             <div className="p-6 bg-white border border-gray-100 shadow-sm md:p-8 rounded-2xl">
//               <h2 className="flex items-center gap-2 mb-6 text-xl font-bold text-gray-900">
//                 <span className="flex items-center justify-center w-6 h-6 text-sm text-white rounded-full bg-gycora">
//                   2
//                 </span>
//                 Opsi Pengiriman
//               </h2>

//               {isLoadingRates ? (
//                 <p className="text-sm text-gray-500 animate-pulse">
//                   Menghitung ongkos kirim terbaik untuk Anda...
//                 </p>
//               ) : !selectedAddressId ? (
//                 <p className="text-sm italic text-gray-500">
//                   Pilih alamat pengiriman terlebih dahulu.
//                 </p>
//               ) : shippingRates.length === 0 ? (
//                 <p className="text-sm text-red-500">
//                   Kurir tidak tersedia untuk wilayah ini.
//                 </p>
//               ) : (
//                 <div className="space-y-3">
//                   {shippingRates.map((rate, idx) => (
//                     <label
//                       key={idx}
//                       className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${selectedRate?.courier_service_name === rate.courier_service_name ? "border-gycora ring-1 ring-gycora bg-emerald-50/10" : "border-gray-200 hover:bg-gray-50"}`}
//                     >
//                       <div className="flex items-center gap-4">
//                         <input
//                           type="radio"
//                           name="courier"
//                           checked={
//                             selectedRate?.courier_service_name ===
//                             rate.courier_service_name
//                           }
//                           onChange={() => setSelectedRate(rate)}
//                           className="w-4 h-4 text-gycora focus:ring-gycora"
//                         />
//                         <div>
//                           <p className="font-bold text-gray-900">
//                             {rate.courier_name} - {rate.courier_service_name}
//                           </p>
//                           <p className="text-xs text-gray-500">
//                             Estimasi tiba: {rate.duration}
//                           </p>
//                         </div>
//                       </div>
//                       <span className="font-bold text-gycora">
//                         {formatPrice(rate.price)}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* 3. Waktu Pengiriman */}
//             <div className="p-6 bg-white border border-gray-100 shadow-sm md:p-8 rounded-2xl">
//               <h2 className="flex items-center gap-2 mb-6 text-xl font-bold text-gray-900">
//                 <span className="flex items-center justify-center w-6 h-6 text-sm text-white rounded-full bg-gycora">
//                   3
//                 </span>
//                 Waktu Pengiriman
//               </h2>
//               <div className="flex flex-wrap gap-4">
//                 <label
//                   className={`flex-1 min-w-[120px] text-center p-3 border rounded-xl cursor-pointer font-semibold text-sm ${deliveryType === "later" ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 text-gray-600 hover:border-gray-400"}`}
//                 >
//                   <input
//                     type="radio"
//                     name="deliveryTime"
//                     className="hidden"
//                     checked={deliveryType === "later"}
//                     onChange={() => setDeliveryType("later")}
//                   />
//                   Reguler (Secepatnya)
//                 </label>
//                 <label
//                   className={`flex-1 min-w-[120px] text-center p-3 border rounded-xl cursor-pointer font-semibold text-sm ${deliveryType === "scheduled" ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 text-gray-600 hover:border-gray-400"}`}
//                 >
//                   <input
//                     type="radio"
//                     name="deliveryTime"
//                     className="hidden"
//                     checked={deliveryType === "scheduled"}
//                     onChange={() => setDeliveryType("scheduled")}
//                   />
//                   Jadwalkan Waktu
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* KOLOM KANAN: RINGKASAN PESANAN */}
//           <div className="w-full lg:w-1/3">
//             <div className="sticky p-6 bg-white border border-gray-100 shadow-sm md:p-8 rounded-2xl top-24">
//               <h2 className="mb-6 text-xl font-bold text-gray-900">
//                 Ringkasan Pesanan
//               </h2>

//               {/* Item Keranjang */}
//               <div className="pr-2 mb-6 space-y-4 overflow-y-auto max-h-60">
//                 {cartItems.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex items-start justify-between gap-4"
//                   >
//                     <div className="flex gap-3">
//                       <div className="w-12 h-12 overflow-hidden bg-gray-100 rounded-md shrink-0">
//                         <img
//                           src={item.product.image_url}
//                           alt="product"
//                           className="object-cover w-full h-full"
//                         />
//                       </div>
//                       <div>
//                         <p className="text-sm font-bold text-gray-900 line-clamp-1">
//                           {item.product.name}
//                         </p>
//                         <p className="text-xs text-gray-500">
//                           {item.quantity} x {formatPrice(item.product.price)}
//                         </p>
//                       </div>
//                     </div>
//                     <p className="text-sm font-bold">
//                       {formatPrice(item.product.price * item.quantity)}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* Gycora Points */}
//               <div className="py-6 mb-6 border-t border-b border-gray-100">
//                 <div className="flex items-center justify-between mb-2">
//                   <h3 className="text-sm font-bold text-gray-900">
//                     Pakai Gycora Points
//                   </h3>
//                   <span className="px-2 py-1 text-xs font-semibold rounded text-emerald-600 bg-emerald-50">
//                     Sisa: {userPoints} Pts
//                   </span>
//                 </div>
//                 <p className="mb-3 text-xs text-gray-500">
//                   Maksimal poin yang bisa dipakai: {maxUsablePoints}
//                 </p>
//                 <div className="flex items-center gap-2">
//                   <input
//                     type="number"
//                     min="0"
//                     max={maxUsablePoints}
//                     value={pointsInput}
//                     onChange={(e) => {
//                       const val = parseInt(e.target.value);
//                       if (isNaN(val)) setPointsInput("");
//                       else if (val > maxUsablePoints)
//                         setPointsInput(maxUsablePoints);
//                       else setPointsInput(val);
//                     }}
//                     placeholder="0"
//                     className="w-full p-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-gycora"
//                   />
//                   <button
//                     onClick={() => setPointsInput(maxUsablePoints)}
//                     className="px-3 py-2 text-xs font-bold text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200 whitespace-nowrap"
//                   >
//                     Max
//                   </button>
//                 </div>
//               </div>

//               {/* Kalkulasi */}
//               <div className="mb-6 space-y-3 text-sm text-gray-600">
//                 <div className="flex justify-between">
//                   <p>Subtotal ({cartItems.length} barang)</p>
//                   <p className="font-medium text-gray-900">
//                     {formatPrice(cartSubtotal)}
//                   </p>
//                 </div>
//                 <div className="flex justify-between">
//                   <p>Ongkos Kirim</p>
//                   <p className="font-medium text-gray-900">
//                     {shippingCost > 0 ? formatPrice(shippingCost) : "-"}
//                   </p>
//                 </div>
//                 {pointDiscount > 0 && (
//                   <div className="flex justify-between text-emerald-600">
//                     <p>Diskon Poin</p>
//                     <p className="font-bold">-{formatPrice(pointDiscount)}</p>
//                   </div>
//                 )}
//               </div>

//               {/* Grand Total */}
//               <div className="pt-4 mb-6 border-t border-gray-200">
//                 <div className="flex items-end justify-between">
//                   <div>
//                     <p className="text-sm text-gray-500">Total Tagihan</p>
//                     <p className="text-xs text-gray-400 mt-0.5">
//                       Sudah termasuk PPN 11%
//                     </p>
//                   </div>
//                   <p className="text-2xl font-extrabold text-gycora-dark">
//                     {formatPrice(grandTotal)}
//                   </p>
//                 </div>
//               </div>

//               {/* Tombol Bayar */}
//               <button
//                 onClick={handleProcessPayment}
//                 disabled={isProcessing || !selectedAddressId || !selectedRate}
//                 className={`w-full py-4 rounded-full font-bold text-white shadow-xl transition-all flex justify-center items-center gap-2 ${
//                   isProcessing || !selectedAddressId || !selectedRate
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-gray-900 hover:bg-black hover:-translate-y-0.5"
//                 }`}
//               >
//                 {isProcessing ? (
//                   <>
//                     <svg
//                       className="w-5 h-5 text-white animate-spin"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Memproses...
//                   </>
//                 ) : (
//                   "Bayar Sekarang"
//                 )}
//               </button>

//               {/* Secure Payment Note */}
//               <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
//                 <svg
//                   className="w-4 h-4"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                   />
//                 </svg>
//                 Pembayaran diamankan oleh enkripsi 256-bit
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useMemo } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../context/CartContext"; 
// import { BASE_URL } from "../../config/api";
// import { useCurrency } from "../../context/CurrencyContext";

// interface Address {
//   id: number;
//   receiver: { full_name: string };
//   details: {
//     location: string;
//     city: string;
//     province: string;
//     postal_code: string;
//     type: string;
//   };
//   is_default: boolean;
// }

// interface ShippingRate {
//   courier_name: string;
//   courier_service_name: string;
//   price: number;
//   duration: string;
// }

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

// export default function CheckoutPage() {
//   const navigate = useNavigate(); 
//   const location = useLocation();
//   const [userData, setUserData] = useState<any>(null);
  
//   // Ambil state currency dan rate (jika diperlukan untuk konversi ongkir) dari Context
//   const { currency, exchangeRates } = useCurrency();
//   const { cartItems } = useCart();

//   // States
//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
//     null,
//   );

//   const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
//   const [selectedRate, setSelectedRate] = useState<ShippingRate | null>(null);
//   const [isLoadingRates, setIsLoadingRates] = useState(false);

//   const [deliveryType, setDeliveryType] = useState("later"); 
//   const [pointsInput, setPointsInput] = useState<number | "">("");

//   const [isProcessing, setIsProcessing] = useState(false);
//   const [userType, setUserType] = useState<string>('guest');

//   // Menyimpan ID item yang dicentang dari halaman keranjang
//   const [checkoutItemIds, setCheckoutItemIds] = useState<number[]>([]);

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useMemo, useCallback } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../context/CartContext"; 
// import { BASE_URL } from "../../config/api";
// import { useCurrency } from "../../context/CurrencyContext";
// // import { useLanguage } from "../../context/LanguageContext";

// interface Address {
//   id: number;
//   receiver: { full_name: string };
//   details: { location: string; city: string; province: string; postal_code: string; type: string };
//   is_default: boolean;
// }

// interface ShippingRate {
//   courier_name: string;
//   courier_service_name: string;
//   price: number;
//   duration: string;
// }

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

// export default function CheckoutPage() {
//   const navigate = useNavigate(); 
//   const location = useLocation();
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   // const { t } = useLanguage();
//   const [userData, setUserData] = useState<any>(null);
  
//   // Ambil state currency dan rate dari Context
//   const { currency, exchangeRates } = useCurrency();
//   const { cartItems } = useCart();

//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
//   const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
//   const [selectedRate, setSelectedRate] = useState<ShippingRate | null>(null);
//   const [isLoadingRates, setIsLoadingRates] = useState(false);
//   const [deliveryType, setDeliveryType] = useState("later"); 
//   const [pointsInput, setPointsInput] = useState<number | "">("");
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [userType, setUserType] = useState<string>('guest');
//   const [checkoutItemIds, setCheckoutItemIds] = useState<number[]>([]);

//     const itemsToCheckout = useMemo(() => {
//     if (checkoutItemIds.length === 0) return cartItems; // fallback jika langsung tembak URL
//     return cartItems.filter(item => checkoutItemIds.includes(item.id));
//   }, [cartItems, checkoutItemIds]);

//   // ============================================================================
//   // HELPER HARGA MULTI-CURRENCY
//   // ============================================================================
//   // const getPriceToDisplay = (product: any) => {
//   //   if (!product) return { value: 0, curr: 'IDR' };
//   //   const curr = (currency as Currency) || 'IDR';
//   //   if (curr === 'IDR') return { value: Number(product.price), curr: 'IDR' };
  
//   //   const pricesObj = typeof product.prices === 'string' ? JSON.parse(product.prices) : (product.prices || {});
//   //   if (pricesObj[curr]) return { value: parseFloat(pricesObj[curr]), curr: curr };
    
//   //   return { value: Number(product.price), curr: 'IDR' };
//   // };

//   // const getDiscountToDisplay = (product: any) => {
//   //   if (!product) return null;
//   //   const curr = (currency as Currency) || 'IDR';
//   //   if (curr === 'IDR') return product.discount_price ? { value: Number(product.discount_price), curr: 'IDR' } : null;
  
//   //   const discObj = typeof product.discount_prices === 'string' ? JSON.parse(product.discount_prices) : (product.discount_prices || {});
//   //   if (discObj[curr]) return { value: parseFloat(discObj[curr]), curr: curr };
    
//   //   return product.discount_price ? { value: Number(product.discount_price), curr: 'IDR' } : null;
//   // };

//   // 1. Definisikan helper yang benar-benar reaktif terhadap 'currency' dari Context
// const getPriceToDisplay = (product: any, curr: Currency) => {
//   if (!product) return { value: 0, curr: 'IDR' };
//   if (curr === 'IDR') return { value: Number(product.price), curr: 'IDR' };
  
//   const pricesObj = typeof product.prices === 'string' ? JSON.parse(product.prices) : (product.prices || {});
//   if (pricesObj[curr]) return { value: parseFloat(pricesObj[curr]), curr: curr };
  
//   return { value: Number(product.price), curr: 'IDR' };
// };

// const getDiscountToDisplay = (product: any, curr: Currency) => {
//   if (!product) return null;
//   if (curr === 'IDR') return product.discount_price ? { value: Number(product.discount_price), curr: 'IDR' } : null;
  
//   const discObj = typeof product.discount_prices === 'string' ? JSON.parse(product.discount_prices) : (product.discount_prices || {});
//   if (discObj[curr]) return { value: parseFloat(discObj[curr]), curr: curr };
  
//   return product.discount_price ? { value: Number(product.discount_price), curr: 'IDR' } : null;
// };

//   const totalQuantity = useMemo(() => {
//     return itemsToCheckout.reduce((sum, item) => sum + item.quantity, 0);
//   }, [itemsToCheckout]);

//   const getActivePriceObj = useCallback((product: any, totalQty: number, curr: Currency) => {
//   const isReseller = userType === 'reseller';
//   const wholesale = Number(product.wholesale_price) || 0;
  
//   const dynamicPriceObj = getPriceToDisplay(product, curr);
//   const dynamicDiscountObj = getDiscountToDisplay(product, curr);

//   if (isReseller && wholesale > 0 && totalQty >= 24) return { value: wholesale, curr: 'IDR' }; 
//   if (dynamicDiscountObj && dynamicDiscountObj.value > 0 && dynamicDiscountObj.value < dynamicPriceObj.value) return dynamicDiscountObj;
//   return dynamicPriceObj;
// }, [userType, currency]); // Dependencies: userType (state) dan currency (Context)

// // 2. Perbarui useMemo agar bergantung pada 'currency'
// const cartSubtotalObj = useMemo(() => {
//   const curr = (currency as Currency) || 'IDR';
//   const totalValue = itemsToCheckout.reduce((total, item) => {
//     // Gunakan fungsi getActivePriceObj yang sudah diupdate agar menerima 'curr'
//     const activePriceObj = getActivePriceObj(item.product, totalQuantity, curr);
//     return total + (activePriceObj.value * item.quantity);
//   }, 0);
//   return { value: totalValue, curr: curr };
// }, [itemsToCheckout, userType, totalQuantity, currency, getActivePriceObj]);

// // 3. Pastikan fungsi getActivePriceObj menerima currency
// // const getActivePriceObj = (product: any, totalQty: number, curr: Currency) => {
// //   const isReseller = userType === 'reseller';
// //   const wholesale = Number(product.wholesale_price) || 0;
  
// //   const dynamicPriceObj = getPriceToDisplay(product, curr); // Lewatkan curr
// //   const dynamicDiscountObj = getDiscountToDisplay(product, curr); // Lewatkan curr

// //   if (isReseller && wholesale > 0 && totalQty >= 24) return { value: wholesale, curr: 'IDR' }; 
// //   if (dynamicDiscountObj && dynamicDiscountObj.value > 0 && dynamicDiscountObj.value < dynamicPriceObj.value) return dynamicDiscountObj;
// //   return dynamicPriceObj;
// // };

//   const formatCurrencyDisplay = (priceObj: {value: number, curr: string} | null) => {
//     if (!priceObj) return "";
//     const symbols: any = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
//     const formatter = new Intl.NumberFormat(priceObj.curr === "IDR" ? "id-ID" : "en-US", {
//       minimumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//       maximumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//     });
//     return `${symbols[priceObj.curr] || priceObj.curr + " "}${formatter.format(priceObj.value)}`;
//   };

//   // Konversi manual untuk Ongkir & Poin (dari IDR ke Mata Uang Aktif)
//   const convertIDRtoActiveCurrency = (idrAmount: number) => {
//     const curr = (currency as Currency) || 'IDR';
//     const rate = exchangeRates?.[curr] || 1;
//     // Jika IDR, rate 1. Jika mata uang lain, kalikan dengan rate yang diambil dari Laravel
//     return { value: idrAmount * (curr === 'IDR' ? 1 : rate), curr: curr };
//   };

//   // const getActivePriceObj = (product: any, totalQty: number) => {
//   //   const isReseller = userType === 'reseller';
//   //   const wholesale = Number(product.wholesale_price) || 0;
    
//   //   const dynamicPriceObj = getPriceToDisplay(product);
//   //   const dynamicDiscountObj = getDiscountToDisplay(product);

//   //   // Prioritas 1: Grosir (IDR)
//   //   if (isReseller && wholesale > 0 && totalQty >= 24) return { value: wholesale, curr: 'IDR' }; 
//   //   // Prioritas 2: Diskon Multi-currency
//   //   if (dynamicDiscountObj && dynamicDiscountObj.value > 0 && dynamicDiscountObj.value < dynamicPriceObj.value) return dynamicDiscountObj;
//   //   // Prioritas 3: Harga Normal Multi-currency
//   //   return dynamicPriceObj;
//   // };
//   // ============================================================================

//   useEffect(() => {
//     const token = localStorage.getItem("user_token");
//     const storedUser = localStorage.getItem("user_data");

//     if (!token || !storedUser) {
//       navigate("/login"); 
//       return;
//     }

//     const userObj = JSON.parse(storedUser);
//     setUserData(userObj);
//     setUserType(userObj.usertype || 'user');
//     fetchAddresses(token);

//     if (location.state && location.state.selectedIds) {
//       setCheckoutItemIds(location.state.selectedIds);
//     }
//   }, [navigate, location.state]);

//   useEffect(() => {
//     if (cartItems.length === 0) {
//       Swal.fire(
//         "Keranjang Kosong",
//         "Silakan pilih produk terlebih dahulu",
//         "warning",
//       ).then(() => {
//         navigate("/products"); 
//       });
//     }
//   }, [cartItems, navigate]);

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useCart } from "../../context/CartContext"; 
import { BASE_URL } from "../../config/api";
import { useCurrency } from "../../context/CurrencyContext";

interface Address {
  id: number;
  receiver: { full_name: string };
  details: { location: string; city: string; province: string; postal_code: string; type: string };
  is_default: boolean;
}

interface ShippingRate {
  courier_name: string;
  courier_service_name: string;
  price: number;
  duration: string;
}

type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

export default function CheckoutPage() {
  const navigate = useNavigate(); 
  const location = useLocation();
  const [userData, setUserData] = useState<any>(null);
  const { currency, exchangeRates } = useCurrency();
  const { cartItems } = useCart();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
  const [selectedRate, setSelectedRate] = useState<ShippingRate | null>(null);
  const [isLoadingRates, setIsLoadingRates] = useState(false);
  const [deliveryType, setDeliveryType] = useState("later"); 
  const [pointsInput, setPointsInput] = useState<number | "">("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [userType, setUserType] = useState<string>('guest');
  const [checkoutItemIds, setCheckoutItemIds] = useState<number[]>([]);

  // ============================================================================
  // 1. HELPER HARGA (HARUS DI ATAS SEBELUM USEMEMO)
  // ============================================================================
  const getPriceToDisplay = useCallback((product: any, curr: Currency) => {
    if (!product) return { value: 0, curr: 'IDR' };
    if (curr === 'IDR') return { value: Number(product.price), curr: 'IDR' };
    const pricesObj = typeof product.prices === 'string' ? JSON.parse(product.prices) : (product.prices || {});
    if (pricesObj[curr]) return { value: parseFloat(pricesObj[curr]), curr: curr };
    return { value: Number(product.price), curr: 'IDR' };
  }, []);

  const getDiscountToDisplay = useCallback((product: any, curr: Currency) => {
    if (!product) return null;
    if (curr === 'IDR') return product.discount_price ? { value: Number(product.discount_price), curr: 'IDR' } : null;
    const discObj = typeof product.discount_prices === 'string' ? JSON.parse(product.discount_prices) : (product.discount_prices || {});
    if (discObj[curr]) return { value: parseFloat(discObj[curr]), curr: curr };
    return product.discount_price ? { value: Number(product.discount_price), curr: 'IDR' } : null;
  }, []);

  const formatCurrencyDisplay = (priceObj: {value: number, curr: string} | null) => {
    if (!priceObj) return "";
    const symbols: any = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
    const formatter = new Intl.NumberFormat(priceObj.curr === "IDR" ? "id-ID" : "en-US", {
      minimumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
      maximumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
    });
    return `${symbols[priceObj.curr] || priceObj.curr + " "}${formatter.format(priceObj.value)}`;
  };

  const getActivePriceObj = useCallback((product: any, totalQty: number, curr: Currency) => {
    const isReseller = userType === 'reseller';
    const wholesale = Number(product.wholesale_price) || 0;
    const dynamicPriceObj = getPriceToDisplay(product, curr);
    const dynamicDiscountObj = getDiscountToDisplay(product, curr);

    if (isReseller && wholesale > 0 && totalQty >= 24) return { value: wholesale, curr: 'IDR' }; 
    if (dynamicDiscountObj && dynamicDiscountObj.value > 0 && dynamicDiscountObj.value < dynamicPriceObj.value) return dynamicDiscountObj;
    return dynamicPriceObj;
  }, [userType, getPriceToDisplay, getDiscountToDisplay]);

  const convertIDRtoActiveCurrency = (idrAmount: number) => {
    const curr = (currency as Currency) || 'IDR';
    const rate = exchangeRates?.[curr] || 1;
    return { value: idrAmount * (curr === 'IDR' ? 1 : rate), curr: curr };
  };

  // ============================================================================
  // 2. DATA CALCULATION (Setelah helper didefinisikan)
  // ============================================================================
  const itemsToCheckout = useMemo(() => {
    return checkoutItemIds.length === 0 ? cartItems : cartItems.filter(item => checkoutItemIds.includes(item.id));
  }, [cartItems, checkoutItemIds]);

  const totalQuantity = useMemo(() => {
    return itemsToCheckout.reduce((sum, item) => sum + item.quantity, 0);
  }, [itemsToCheckout]);

  const curr = (currency as Currency) || 'IDR';

  const cartSubtotalObj = useMemo(() => {
    const totalValue = itemsToCheckout.reduce((total, item) => {
      const activePriceObj = getActivePriceObj(item.product, totalQuantity, curr);
      return total + (activePriceObj.value * item.quantity);
    }, 0);
    return { value: totalValue, curr: curr };
  }, [itemsToCheckout, totalQuantity, curr, getActivePriceObj]);

  const baseIDRSubtotal = itemsToCheckout.reduce((sum, item) => {
    const price = item.product.discount_price && item.product.discount_price < item.product.price ? item.product.discount_price : item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  const userPoints = userData?.point || 0;
  const maxUsablePoints = Math.min(userPoints, Math.floor(baseIDRSubtotal / 1000));
  const validPointsUsed = Math.min(Number(pointsInput) || 0, maxUsablePoints);
  const pointDiscountObj = convertIDRtoActiveCurrency(validPointsUsed * 1000);
  const shippingCostIDR = selectedRate ? selectedRate.price : 0;
  const shippingCostObj = convertIDRtoActiveCurrency(shippingCostIDR);
  const grandTotalObj = { 
    value: cartSubtotalObj.value + shippingCostObj.value - pointDiscountObj.value, 
    curr: curr 
  };

  // ============================================================================
  // 3. EFFECT DAN HANDLER (Sama seperti sebelumnya)
  // ============================================================================
  useEffect(() => {
    const token = localStorage.getItem("user_token");
    const storedUser = localStorage.getItem("user_data");
    if (!token || !storedUser) { navigate("/login"); return; }
    const userObj = JSON.parse(storedUser);
    setUserData(userObj);
    setUserType(userObj.usertype || 'user');
    fetchAddresses(token);
    if (location.state && location.state.selectedIds) setCheckoutItemIds(location.state.selectedIds);
  }, [navigate, location.state]);

  const fetchAddresses = async (token: string) => {
    try {
      const res = await fetch(`${BASE_URL}/api/addresses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        const responseData = data.data ? data.data : data.data;
        setAddresses(responseData || []);
        const defaultAddr = responseData.find((a: Address) => a.is_default);
        if (defaultAddr) setSelectedAddressId(defaultAddr.id);
        else if (responseData.length > 0) setSelectedAddressId(responseData[0].id);
      }
    } catch (error) {
      console.error("Gagal memuat alamat", error);
    }
  };

  useEffect(() => {
    if (!selectedAddressId || itemsToCheckout.length === 0) return;

    const fetchRates = async () => {
      setIsLoadingRates(true);
      setSelectedRate(null);
      const token = localStorage.getItem("user_token");
      const cartIds = itemsToCheckout.map((item) => item.id);

      try {
        const res = await fetch(`${BASE_URL}/api/shipping-rates`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            address_id: selectedAddressId,
            cart_ids: cartIds,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const responseData = data.data ? data.data : data.data;
          if (responseData.success) {
            setShippingRates(responseData.pricing);
            if (responseData.pricing.length > 0) {
              setSelectedRate(responseData.pricing[0]); 
            }
          }
        }
      } catch (error) {
        console.error("Gagal menghitung ongkir", error);
      } finally {
        setIsLoadingRates(false);
      }
    };

    fetchRates();
  }, [selectedAddressId, itemsToCheckout]);


  // ============================================================================
  // [BARU] HELPER HARGA MULTI-CURRENCY
  // ============================================================================
  // const getPriceToDisplay = (product: any) => {
  //   if (!product) return { value: 0, curr: 'IDR' };
  //   const curr = (currency as Currency) || 'IDR';
  //   if (curr === 'IDR') return { value: product.price, curr: 'IDR' };
  
  //   const pricesObj = typeof product.prices === 'string' ? JSON.parse(product.prices) : (product.prices || {});
  //   if (pricesObj[curr]) {
  //     return { value: parseFloat(pricesObj[curr]), curr: curr };
  //   }
  //   return { value: product.price, curr: 'IDR' };
  // };

  // const getDiscountToDisplay = (product: any) => {
  //   if (!product) return null;
  //   const curr = (currency as Currency) || 'IDR';
  //   if (curr === 'IDR') return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
  
  //   const discObj = typeof product.discount_prices === 'string' ? JSON.parse(product.discount_prices) : (product.discount_prices || {});
  //   if (discObj[curr]) {
  //     return { value: parseFloat(discObj[curr]), curr: curr };
  //   }
  //   return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
  // };

  // const formatCurrencyDisplay = (priceObj: {value: number, curr: string} | null) => {
  //   if (!priceObj) return "";
  //   const symbols: any = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
    
  //   const formatter = new Intl.NumberFormat(priceObj.curr === "IDR" ? "id-ID" : "en-US", {
  //     minimumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
  //     maximumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
  //   });
  
  //   return `${symbols[priceObj.curr] || priceObj.curr + " "}${formatter.format(priceObj.value)}`;
  // };

  // const getActivePriceObj = (product: any, totalQty: number) => {
  //   const isReseller = userType === 'reseller';
  //   const wholesale = Number(product.wholesale_price) || 0;
    
  //   const dynamicPriceObj = getPriceToDisplay(product);
  //   const dynamicDiscountObj = getDiscountToDisplay(product);

  //   if (isReseller && wholesale > 0 && totalQty >= 24) {
  //     return { value: wholesale, curr: 'IDR' }; 
  //   } 
  //   else if (dynamicDiscountObj && dynamicDiscountObj.value > 0 && dynamicDiscountObj.value < dynamicPriceObj.value) {
  //     return dynamicDiscountObj;
  //   }
  //   return dynamicPriceObj;
  // };

  // Helper konversi IDR ke mata uang aktif (Digunakan untuk ongkir dan poin karena dari backend keluarnya IDR)
  // const convertIDRtoActiveCurrency = (idrAmount: number) => {
  //   const curr = (currency as Currency) || 'IDR';
  //   if (curr === 'IDR' || !exchangeRates || !exchangeRates[curr]) {
  //     return { value: idrAmount, curr: 'IDR' };
  //   }
  //   // Asumsi: exchangeRates menyimpan rate IDR -> Mata uang (misal USD: 0.000062)
  //   // Atau jika exchangeRates nyimpan USD->IDR (16000), maka dibagi. Asumsikan dari backend sudah rasio IDR ke USD.
  //   const rate = exchangeRates[curr];
  //   return { value: idrAmount * rate, curr: curr };
  // };
  // ============================================================================

  // Kalkulasi Keuangan Multi-Currency
  // const curr = (currency as Currency) || 'IDR';
  
  // // Subtotal (Berdasarkan harga per item dalam mata uang aktif)
  // // const cartSubtotalObj = useMemo(() => {
  // //   const totalValue = itemsToCheckout.reduce((total, item) => {
  // //     const activePriceObj = getActivePriceObj(item.product, totalQuantity);
  // //     return total + (activePriceObj.value * item.quantity);
  // //   }, 0);
  // //   return { value: totalValue, curr: curr };
  // // }, [itemsToCheckout, userType, totalQuantity, currency]);

  // // Kalkulasi Poin (Berdasarkan IDR, karena poin dikonversi dari nominal IDR aslinya 1:1000)
  // const baseIDRSubtotal = itemsToCheckout.reduce((sum, item) => {
  //   const price = item.product.discount_price && item.product.discount_price < item.product.price ? item.product.discount_price : item.product.price;
  //   return sum + (price * item.quantity);
  // }, 0);

  // const userPoints = userData?.point || 0;
  // const maxUsablePoints = Math.min(userPoints, Math.floor(baseIDRSubtotal / 1000));
  // const validPointsUsed = Math.min(Number(pointsInput) || 0, maxUsablePoints);
  
  // Point Discount dalam IDR (Lalu kita ubah tampilannya ke mata uang)
  const pointDiscountIDR = validPointsUsed * 1000;
  // const pointDiscountObj = convertIDRtoActiveCurrency(pointDiscountIDR);

  // Ongkir (Dari backend IDR, ubah ke mata uang layar)
  // const shippingCostIDR = selectedRate ? selectedRate.price : 0;
  // const shippingCostObj = convertIDRtoActiveCurrency(shippingCostIDR);

  // Grand Total (Dihitung dalam IDR jika backend menuntut IDR, tapi untuk layar kita hitung sesuai value di layar)
  // const grandTotalObj = { 
  //   value: cartSubtotalObj.value + shippingCostObj.value - pointDiscountObj.value, 
  //   curr: curr 
  // };


  const handleProcessPayment = async () => {
    if (!selectedAddressId) {
      return Swal.fire("Alamat Diperlukan", "Pilih alamat pengiriman terlebih dahulu", "error");
    }
    if (!selectedRate) {
      return Swal.fire("Kurir Diperlukan", "Pilih metode pengiriman", "error");
    }

    setIsProcessing(true);
    const token = localStorage.getItem("user_token");
    const cartIds = itemsToCheckout.map((item) => item.id);

    // Payload dikirim tetap dalam nominal / data IDR murni karena backend memproses pembayaran lokal.
    const payload = {
      address_id: selectedAddressId,
      shipping_method: "biteship", 
      use_points: validPointsUsed,
      cart_ids: cartIds,
      shipping_cost: shippingCostIDR, 
      courier_company: selectedRate.courier_name,
      courier_type: selectedRate.courier_service_name,
      delivery_type: deliveryType,
      promo_code: "", 
    };

    try {
      const res = await fetch(`${BASE_URL}/api/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        window.location.href = data.checkout_url;
      } else {
        Swal.fire("Checkout Gagal", data.message || "Terjadi kesalahan sistem", "error");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Error process payment:", error); 
      Swal.fire("Error", "Gagal terhubung ke server", "error");
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">
        <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 font-sans bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Checkout
          </h1>
          <p className="mt-1 text-gray-500">
            Selesaikan pesanan Anda dengan aman.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* KOLOM KIRI: FORM PENGISIAN */}
          <div className="w-full space-y-6 lg:w-2/3">
            {/* 1. Alamat Pengiriman */}
            <div className="p-6 bg-white border border-gray-100 shadow-sm md:p-8 rounded-2xl">
              <h2 className="flex items-center gap-2 mb-6 text-xl font-bold text-gray-900">
                <span className="flex items-center justify-center w-6 h-6 text-sm text-white rounded-full bg-gycora">
                  1
                </span>
                Alamat Pengiriman
              </h2>

              {addresses.length === 0 ? (
                <div className="p-6 text-center border-2 border-gray-300 border-dashed rounded-xl">
                  <p className="mb-4 text-gray-500">
                    Anda belum memiliki alamat.
                  </p>
                  <button
                    onClick={() => navigate("/profile")}
                    className="px-6 py-2 text-sm font-bold text-white bg-gray-900 rounded-full"
                  >
                    Tambah Alamat
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`cursor-pointer relative p-4 rounded-xl border-2 transition-all ${selectedAddressId === addr.id ? "border-gycora bg-emerald-50/20" : "border-gray-200 hover:border-gray-300"}`}
                    >
                      {addr.is_default && (
                        <span className="absolute top-3 right-3 text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">
                          Utama
                        </span>
                      )}
                      <h3 className="font-bold text-gray-900">
                        {addr.receiver.full_name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {addr.details.location}, {addr.details.city}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {addr.details.postal_code}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Metode Pengiriman (Kurir) */}
            <div className="p-6 bg-white border border-gray-100 shadow-sm md:p-8 rounded-2xl">
              <h2 className="flex items-center gap-2 mb-6 text-xl font-bold text-gray-900">
                <span className="flex items-center justify-center w-6 h-6 text-sm text-white rounded-full bg-gycora">
                  2
                </span>
                Opsi Pengiriman
              </h2>

              {isLoadingRates ? (
                <p className="text-sm text-gray-500 animate-pulse">
                  Menghitung ongkos kirim terbaik untuk Anda...
                </p>
              ) : !selectedAddressId ? (
                <p className="text-sm italic text-gray-500">
                  Pilih alamat pengiriman terlebih dahulu.
                </p>
              ) : shippingRates.length === 0 ? (
                <p className="text-sm text-red-500">
                  Kurir tidak tersedia untuk wilayah ini.
                </p>
              ) : (
                <div className="space-y-3">
                  {shippingRates.map((rate, idx) => {
                    // Konversi harga ongkir IDR ke mata uang aktif untuk ditampilkan ke layar
                    const convertedRateObj = convertIDRtoActiveCurrency(rate.price);

                    return (
                      <label
                        key={idx}
                        className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${selectedRate?.courier_service_name === rate.courier_service_name ? "border-gycora ring-1 ring-gycora bg-emerald-50/10" : "border-gray-200 hover:bg-gray-50"}`}
                      >
                        <div className="flex items-center gap-4">
                          <input
                            type="radio"
                            name="courier"
                            checked={
                              selectedRate?.courier_service_name ===
                              rate.courier_service_name
                            }
                            onChange={() => setSelectedRate(rate)}
                            className="w-4 h-4 text-gycora focus:ring-gycora"
                          />
                          <div>
                            <p className="font-bold text-gray-900">
                              {rate.courier_name} - {rate.courier_service_name}
                            </p>
                            <p className="text-xs text-gray-500">
                              Estimasi tiba: {rate.duration}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-gycora">
                          {formatCurrencyDisplay(convertedRateObj)}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 3. Waktu Pengiriman */}
            <div className="p-6 bg-white border border-gray-100 shadow-sm md:p-8 rounded-2xl">
              <h2 className="flex items-center gap-2 mb-6 text-xl font-bold text-gray-900">
                <span className="flex items-center justify-center w-6 h-6 text-sm text-white rounded-full bg-gycora">
                  3
                </span>
                Waktu Pengiriman
              </h2>
              <div className="flex flex-wrap gap-4">
                <label
                  className={`flex-1 min-w-[120px] text-center p-3 border rounded-xl cursor-pointer font-semibold text-sm ${deliveryType === "later" ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 text-gray-600 hover:border-gray-400"}`}
                >
                  <input
                    type="radio"
                    name="deliveryTime"
                    className="hidden"
                    checked={deliveryType === "later"}
                    onChange={() => setDeliveryType("later")}
                  />
                  Reguler (Secepatnya)
                </label>
                <label
                  className={`flex-1 min-w-[120px] text-center p-3 border rounded-xl cursor-pointer font-semibold text-sm ${deliveryType === "scheduled" ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 text-gray-600 hover:border-gray-400"}`}
                >
                  <input
                    type="radio"
                    name="deliveryTime"
                    className="hidden"
                    checked={deliveryType === "scheduled"}
                    onChange={() => setDeliveryType("scheduled")}
                  />
                  Jadwalkan Waktu
                </label>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: RINGKASAN PESANAN */}
          <div className="w-full lg:w-1/3">
            <div className="sticky p-6 bg-white border border-gray-100 shadow-sm md:p-8 rounded-2xl top-24">
              <h2 className="mb-6 text-xl font-bold text-gray-900">
                Ringkasan Pesanan
              </h2>

              {/* Item Keranjang */}
              <div className="pr-2 mb-6 space-y-4 overflow-y-auto max-h-60">
                {itemsToCheckout.map((item) => {
                  const activePriceObj = getActivePriceObj(item.product, totalQuantity, curr);
                  const totalGrossObj = { value: activePriceObj.value * item.quantity, curr: activePriceObj.curr };

                  return (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-4"
                    >
                      <div className="flex gap-3">
                        <div className="w-12 h-12 overflow-hidden bg-gray-100 rounded-md shrink-0">
                          <img
                            src={item.product.image_url}
                            alt="product"
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 line-clamp-1">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.quantity} x {formatCurrencyDisplay(activePriceObj)}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-bold">
                        {formatCurrencyDisplay(totalGrossObj)}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Gycora Points */}
              <div className="py-6 mb-6 border-t border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-gray-900">
                    Pakai Gycora Points
                  </h3>
                  <span className="px-2 py-1 text-xs font-semibold rounded text-emerald-600 bg-emerald-50">
                    Sisa: {userPoints} Pts
                  </span>
                </div>
                <p className="mb-3 text-xs text-gray-500">
                  Maksimal poin yang bisa dipakai: {maxUsablePoints}
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max={maxUsablePoints}
                    value={pointsInput}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (isNaN(val)) setPointsInput("");
                      else if (val > maxUsablePoints)
                        setPointsInput(maxUsablePoints);
                      else setPointsInput(val);
                    }}
                    placeholder="0"
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-gycora"
                  />
                  <button
                    onClick={() => setPointsInput(maxUsablePoints)}
                    className="px-3 py-2 text-xs font-bold text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200 whitespace-nowrap"
                  >
                    Max
                  </button>
                </div>
              </div>

              {/* Kalkulasi */}
              <div className="mb-6 space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <p>Subtotal ({itemsToCheckout.length} barang)</p>
                  <p className="font-medium text-gray-900">
                    {formatCurrencyDisplay(cartSubtotalObj)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Ongkos Kirim</p>
                  <p className="font-medium text-gray-900">
                    {shippingCostIDR > 0 ? formatCurrencyDisplay(shippingCostObj) : "-"}
                  </p>
                </div>
                {pointDiscountIDR > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <p>Diskon Poin</p>
                    <p className="font-bold">-{formatCurrencyDisplay(pointDiscountObj)}</p>
                  </div>
                )}
              </div>

              {/* Grand Total */}
              <div className="pt-4 mb-6 border-t border-gray-200">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Tagihan</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Sudah termasuk PPN 11%
                    </p>
                  </div>
                  <p className="text-2xl font-extrabold text-gycora-dark">
                    {formatCurrencyDisplay(grandTotalObj)}
                  </p>
                </div>
              </div>

              {/* Tombol Bayar */}
              <button
                onClick={handleProcessPayment}
                disabled={isProcessing || !selectedAddressId || !selectedRate}
                className={`w-full py-4 rounded-full font-bold text-white shadow-xl transition-all flex justify-center items-center gap-2 ${
                  isProcessing || !selectedAddressId || !selectedRate
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gray-900 hover:bg-black hover:-translate-y-0.5"
                }`}
              >
                {isProcessing ? (
                  <>
                    <svg
                      className="w-5 h-5 text-white animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Memproses...
                  </>
                ) : (
                  "Bayar Sekarang"
                )}
              </button>

              {/* Secure Payment Note */}
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Pembayaran diamankan oleh enkripsi 256-bit
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}