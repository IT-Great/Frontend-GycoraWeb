/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { BASE_URL } from "../../config/api";

// export default function TrackingPage() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // --- STATE ---
//   const [userData, setUserData] = useState<any>(null);
//   const [orderData, setOrderData] = useState<any>(null);
//   const [trackingData, setTrackingData] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Ambil state 'paymentMethod' yang dilempar dari OrderPage jika ada
//   const paymentMethodInfo = location.state?.paymentMethod || "";

//   // --- LIFECYCLE ---
//   useEffect(() => {
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) setUserData(JSON.parse(userStr));

//     const fetchAllData = async () => {
//       setIsLoading(true);
//       setError(null);

//       const token = localStorage.getItem("user_token");
//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       try {
//         // 1. Ambil detail pesanan utama
//         const orderRes = await fetch(`${BASE_URL}/api/transactions/${id}`, {
//           headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//         });
//         if (!orderRes.ok) throw new Error("Gagal mengambil detail pesanan.");

//         const rawOrderData = await orderRes.json();
//         setOrderData(rawOrderData.data ? rawOrderData.data : rawOrderData);

//         // 2. Ambil data tracking dari Biteship API melalui Laravel
//         try {
//           const trackRes = await fetch(`${BASE_URL}/api/transactions/${id}/tracking`, {
//             headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//           });
//           if (trackRes.ok) {
//             const rawTrackData = await trackRes.json();
//             setTrackingData(rawTrackData.data ? rawTrackData.data : rawTrackData);
//           }
//         } catch (trackErr) {
//           console.warn("Data pelacakan belum tersedia dari pihak ekspedisi.", trackErr);
//         }
//       } catch (err: any) {
//         setError(err.message || "Terjadi kesalahan sistem.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (id) fetchAllData();
//   }, [id, navigate]);

//   // --- COMPUTED & LOGIC ---
//   const activePaymentMethod = useMemo(() => {
//     if (orderData?.payment_method) return orderData.payment_method;
//     if (paymentMethodInfo) return paymentMethodInfo;
//     return null;
//   }, [orderData, paymentMethodInfo]);

//   const timelineHistory = useMemo(() => {
//     const apiHistory = trackingData?.courier?.history || [];
//     if (apiHistory.length > 0) {
//       // Biteship mengembalikan array kronologis, kita reverse agar yang terbaru di atas
//       return [...apiHistory].reverse();
//     }

//     // Fallback jika array history kosong tapi status sudah ada
//     return [
//       {
//         status: trackingData?.status || orderData?.status || "Processing",
//         note: getNoteFromStatus(trackingData?.status || orderData?.status),
//         updated_at: trackingData?.delivery?.datetime || orderData?.created_at || new Date().toISOString(),
//       },
//     ];
//   }, [trackingData, orderData]);

//   // --- HELPERS ---
//   const getCourierLogo = (company: string) => {
//     if (!company) return null;
//     const map: Record<string, string> = {
//       jne: "jne.png", sicepat: "sicepat.png", jnt: "jnt.png",
//       anteraja: "anteraja.png", gojek: "gojek.png", grab: "grab.png",
//       paxel: "paxel.png", ninja: "ninja.png",
//     };
//     return map[company.toLowerCase()] ? "/courier_images/" + map[company.toLowerCase()] : null;
//   };

//   const getPaymentLogo = (methodString: string) => {
//     if (!methodString) return null;
//     const channel = methodString.split(" ")[1]?.toLowerCase();
//     const map: Record<string, string> = {
//       bca: "bca.png", bni: "bni.png", bri: "bri.png", mandiri: "mandiri.png",
//       bsi: "bsi.png", permata: "permata.png", ovo: "ovo.png", dana: "dana.png",
//       linkaja: "linkaja.png", shopeepay: "shopeepay.png", alfamart: "alfamart.png",
//       indomaret: "indomaret.png", qris: "qris.png",
//     };
//     return map[channel] ? "/payment_images/" + map[channel] : null;
//   };

//   const formatPrice = (v: number) =>
//     new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(v || 0);

//   const getGrandTotal = (order: any) => {
//     if (!order) return 0;
//     const total = parseFloat(order.total_amount || 0);
//     const shipping = parseFloat(order.shipping_cost || 0);
//     const promo = parseFloat(order.promo_discount || 0);

//     // Perbaikan Typescript: Tidak mem-parsing float karena hasil perkalian sudah bertipe number
//     const pointsDiscount = (order.points_used || 0) * 1000;

//     return total + shipping - promo - pointsDiscount;
//   };

//   const formatStatusTitle = (status: string) => {
//     if (!status) return "Processing";
//     const formatted = status.replace(/_/g, " ");
//     return formatted.charAt(0).toUpperCase() + formatted.slice(1);
//   };

//   const formatDate = (dateString: string) => {
//     if (!dateString) return "-";
//     return new Date(dateString).toLocaleDateString("id-ID", {
//       weekday: "long", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
//     });
//   };

//   function getNoteFromStatus(status: string) {
//     const map: Record<string, string> = {
//       pending: "Menunggu pembayaran dari pelanggan.",
//       placed: "Pesanan telah masuk dan menunggu alokasi kurir.",
//       allocated: "Kurir telah dialokasikan dan akan segera menjemput paket.",
//       picking_up: "Kurir sedang dalam perjalanan menuju lokasi penjemputan.",
//       picked: "Paket telah diambil oleh kurir dan masuk ke pusat sortir.",
//       dropping_off: "Paket sedang dalam perjalanan menuju alamat tujuan.",
//       delivered: "Paket telah berhasil dikirim dan diterima.",
//       rejected: "Pengiriman ditolak oleh kurir atau sistem.",
//       cancelled: "Pengiriman telah dibatalkan.",
//     };
//     return map[status] || "Pesanan sedang diproses oleh sistem.";
//   }

//   // --- RENDER ---
//   return (
//     <div className="w-full min-h-screen px-6 py-20 font-sans md:px-12 lg:px-20 animate-fade-in">

//       {/* HEADER */}
//       <div className="flex flex-col gap-4 mb-8 md:flex-row md:justify-between md:items-center">
//         <div>
//           <button
//             onClick={() => navigate('/orders')}
//             className="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest text-gray-500 uppercase transition hover:text-gray-900"
//           >
//             <span>&larr;</span> Kembali ke Pesanan
//           </button>
//           <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 uppercase md:text-4xl">
//             Lacak Pengiriman
//           </h1>
//         </div>
//       </div>

//       {/* STATE: LOADING */}
//       {isLoading ? (
//         <div className="flex flex-col items-center justify-center py-20">
//           <div className="w-10 h-10 border-4 border-gray-100 rounded-full border-t-gycora animate-spin"></div>
//           <p className="mt-4 text-xs font-bold tracking-widest text-gray-400 uppercase animate-pulse">
//             Mengambil detail pesanan...
//           </p>
//         </div>
//       ) :

//       /* STATE: ERROR */
//       error ? (
//         <div className="p-8 text-center border border-red-100 bg-red-50 rounded-2xl">
//           <p className="font-bold text-red-600">{error}</p>
//         </div>
//       ) :

//       /* STATE: SUCCESS */
//       orderData && (
//         <div className="space-y-6 animate-fade-in">

//           {/* TRACKING CARD TOP */}
//           <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
//             <div className="flex flex-col items-start justify-between gap-6 p-6 border-b border-gray-100 bg-gray-50 md:p-8 md:flex-row md:items-center">
//               <div>
//                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
//                   Nomor Resi (Waybill)
//                 </p>
//                 <p className="font-mono text-xl font-bold text-black">
//                   {trackingData?.courier?.waybill_id || orderData.tracking_number || "Menunggu Resi..."}
//                 </p>
//                 <div className="flex flex-wrap items-center gap-3 mt-3">
//                   <span className="bg-gray-900 text-white px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest">
//                     {formatStatusTitle(trackingData?.status || orderData.status)}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex items-center w-full gap-6 md:w-auto">

//                 {/* PAYMENT INFO */}
//                 {activePaymentMethod && (
//                   <div className="flex flex-col items-start md:items-end">
//                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
//                       Pembayaran
//                     </p>
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-10 h-6 overflow-hidden bg-white border border-gray-200 rounded shrink-0">
//                         {getPaymentLogo(activePaymentMethod) ? (
//                           <img src={getPaymentLogo(activePaymentMethod)!} className="object-contain w-full h-full p-0.5" />
//                         ) : (
//                           <span className="font-black text-gray-300 text-[8px]">{activePaymentMethod.split(" ")[1] || "PAY"}</span>
//                         )}
//                       </div>
//                       <p className="text-xs font-bold uppercase text-gycora">
//                         {activePaymentMethod.replace("_", " ")}
//                       </p>
//                     </div>
//                   </div>
//                 )}

//                 <div className="hidden w-px h-8 bg-gray-200 md:block"></div>

//                 {/* COURIER INFO */}
//                 <div className="flex flex-col items-start md:items-end">
//                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
//                     Kurir
//                   </p>
//                   <div className="flex items-center gap-3">
//                     <div className="flex items-center justify-center w-8 h-8 overflow-hidden bg-white border border-gray-200 rounded-lg shrink-0">
//                       {getCourierLogo(trackingData?.courier?.company || orderData.courier_company) ? (
//                         <img src={getCourierLogo(trackingData?.courier?.company || orderData.courier_company)!} className="object-contain w-full h-full p-1" />
//                       ) : (
//                         <span className="font-black text-gray-300 text-[8px]">
//                           {trackingData?.courier?.company?.toUpperCase() || orderData.courier_company?.toUpperCase() || "N/A"}
//                         </span>
//                       )}
//                     </div>
//                     <div className="text-left md:text-right">
//                       <p className="text-xs font-bold text-gray-800 uppercase">
//                         {trackingData?.courier?.company || orderData.courier_company}
//                       </p>
//                       <p className="text-[10px] text-gray-500 font-bold uppercase mt-0.5">
//                         {trackingData?.courier?.type || orderData.courier_type}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//               </div>
//             </div>

//             {/* ADDRESS DETAILS */}
//             {trackingData ? (
//               <div className="grid grid-cols-1 gap-8 p-6 text-sm bg-white md:p-8 md:grid-cols-2">

//                 {/* ORIGIN */}
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
//                     <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
//                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Detail Pengirim</p>
//                   </div>
//                   <div>
//                     <p className="text-[10px] text-gray-400 uppercase tracking-widest">Nama Pengirim</p>
//                     <p className="font-bold text-gray-900">{trackingData.origin?.contact_name || "Gycora Store"}</p>
//                   </div>
//                   <div>
//                     <p className="text-[10px] text-gray-400 uppercase tracking-widest">Nomor Telepon</p>
//                     <p className="font-mono text-xs text-gray-700">{trackingData.origin?.contact_phone || "-"}</p>
//                   </div>
//                   <div>
//                     <p className="text-[10px] text-gray-400 uppercase tracking-widest">Alamat Lengkap</p>
//                     <p className="text-xs leading-relaxed text-gray-600">
//                       {trackingData.origin?.address || "-"}<br />
//                       {trackingData.origin?.postal_code && <span className="font-bold">Kode Pos: {trackingData.origin.postal_code}</span>}
//                     </p>
//                   </div>
//                 </div>

//                 {/* DESTINATION */}
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
//                     <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
//                     <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">Detail Penerima</p>
//                   </div>
//                   <div>
//                     <p className="text-[10px] text-gray-400 uppercase tracking-widest">Nama Penerima</p>
//                     <p className="font-bold text-gray-900">{trackingData.destination?.contact_name || "-"}</p>
//                   </div>
//                   <div>
//                     <p className="text-[10px] text-gray-400 uppercase tracking-widest">Nomor Telepon</p>
//                     <p className="font-mono text-xs text-gray-700">{trackingData.destination?.contact_phone || "-"}</p>
//                   </div>
//                   <div>
//                     <p className="text-[10px] text-gray-400 uppercase tracking-widest">Alamat Lengkap</p>
//                     <p className="text-xs leading-relaxed text-gray-600">
//                       {trackingData.destination?.address || "-"}<br />
//                       {trackingData.destination?.postal_code && <span className="font-bold">Kode Pos: {trackingData.destination.postal_code}</span>}
//                     </p>
//                   </div>
//                   {trackingData.destination?.note && (
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">Catatan Kurir</p>
//                       <p className="p-2 text-xs italic text-gray-500 border rounded bg-gray-50">
//                         "{trackingData.destination.note}"
//                       </p>
//                     </div>
//                   )}
//                 </div>

//               </div>
//             ) : (
//               <div className="p-6 text-xs italic text-center text-gray-400 bg-white md:p-8">
//                 Menunggu data lokasi origin dan destinasi tersedia dari pihak ekspedisi...
//               </div>
//             )}
//           </div>

//           {/* ORDER ITEMS SUMMARY */}
//           {orderData.details && orderData.details.length > 0 && (
//             <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
//               <div className="p-4 border-b border-gray-100 bg-gray-50">
//                 <h3 className="ml-2 text-xs font-bold tracking-widest text-gray-500 uppercase">
//                   Ringkasan Barang
//                 </h3>
//               </div>

//               <div className="p-6">
//                 <div className="mb-6 space-y-4">
//                   {orderData.details.map((detail: any) => (
//                     <div key={detail.id} className="flex items-center gap-4 pb-4 border-b border-gray-50 last:border-0">
//                       <img src={detail.product.image_url} className="object-cover w-16 h-16 bg-gray-100 border border-gray-100 rounded-lg" />
//                       <div className="flex-grow">
//                         <h4 className="text-sm font-bold text-gray-900 uppercase">{detail.product.name}</h4>
//                         {detail.color && (
//                           <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">
//                             Color: <span className="font-bold text-gray-700">{detail.color}</span>
//                           </p>
//                         )}
//                         <p className="mt-1 text-xs text-gray-400">
//                           {detail.quantity} x {formatPrice(detail.price)}
//                         </p>
//                       </div>
//                       <p className="text-sm font-bold text-gray-900">
//                         {formatPrice(detail.quantity * detail.price)}
//                       </p>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="pt-4 space-y-2 border-t border-gray-100">
//                   <div className="flex justify-between text-xs text-gray-500">
//                     <span>Subtotal Produk</span>
//                     <span>{formatPrice(orderData.total_amount)}</span>
//                   </div>
//                   <div className="flex justify-between text-xs text-gray-500">
//                     <span>Ongkos Kirim</span>
//                     <span>{formatPrice(orderData.shipping_cost)}</span>
//                   </div>

//                   {orderData.promo_discount > 0 && (
//                     <div className="flex justify-between text-xs font-medium text-emerald-600">
//                       <span>Promo (<span className="font-mono uppercase">{orderData.promo_code}</span>)</span>
//                       <span>- {formatPrice(orderData.promo_discount)}</span>
//                     </div>
//                   )}

//                   {orderData.points_used > 0 && (
//                     <div className="flex justify-between text-xs font-medium text-yellow-600">
//                       <span>Poin Ditukarkan ({orderData.points_used} Pts)</span>
//                       <span>- {formatPrice(orderData.points_used * 1000)}</span>
//                     </div>
//                   )}

//                   <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200 border-dashed">
//                     <span className="font-bold text-[10px] uppercase tracking-widest text-black">Total Akhir</span>
//                     <span className="text-xl font-black text-gycora">{formatPrice(getGrandTotal(orderData))}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* LOYALTY REWARD (If Applicable) */}
//               {userData?.is_membership && orderData.point > 0 && orderData.status === 'completed' ? (
//                  <div className="flex items-center justify-between p-4 m-6 border rounded-xl bg-gradient-to-r from-emerald-50 to-white border-emerald-100">
//                    <div className="flex items-center gap-3">
//                      <div className="flex items-center justify-center w-10 h-10 text-white rounded-full shadow-sm bg-emerald-500">
//                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
//                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                        </svg>
//                      </div>
//                      <div>
//                        <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">Loyalty Reward</p>
//                        <p className="text-xs mt-0.5 text-gray-500">Poin masuk ke akun Anda</p>
//                      </div>
//                    </div>
//                    <div className="text-right">
//                      <span className="text-2xl font-black text-emerald-600">+{orderData.point}</span>
//                      <span className="ml-1 text-xs font-bold text-emerald-800">Pts</span>
//                    </div>
//                  </div>
//               ) : null }
//             </div>
//           )}

//           {/* TRACKING TIMELINE */}
//           <div className="p-6 bg-white border border-gray-100 shadow-sm md:p-8 rounded-3xl">
//             <h3 className="pb-4 mb-6 text-sm font-bold tracking-widest uppercase border-b border-gray-100">
//               Riwayat Perjalanan (Timeline)
//             </h3>

//             <div className="relative ml-3 space-y-8 border-l-2 border-gray-100">
//               {timelineHistory.map((history: any, index: number) => (
//                 <div key={index} className="relative pl-8">
//                   <span
//                     className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all ${
//                       index === 0 ? "bg-gycora ring-4 ring-emerald-50" : "bg-gray-300"
//                     }`}
//                   ></span>

//                   <div className={index === 0 ? "opacity-100" : "opacity-50"}>
//                     <p className="mb-1 text-sm font-bold tracking-wide text-gray-900 uppercase">
//                       {formatStatusTitle(history.status)}
//                     </p>
//                     <p className="mb-2 text-xs text-gray-600">{history.note}</p>
//                     <p className="font-mono text-[10px] font-medium text-gray-400">
//                       {formatDate(history.updated_at)}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </div>
//       )}
//     </div>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { BASE_URL } from "../../config/api";
// import { useCurrency } from "../../context/CurrencyContext";

// export default function TrackingPage() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { formatPrice } = useCurrency();

//   // --- STATE ---
//   const [userData, setUserData] = useState<any>(null);
//   const [orderData, setOrderData] = useState<any>(null);
//   const [trackingData, setTrackingData] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Ambil state 'paymentMethod' yang dilempar dari OrderPage jika ada
//   const paymentMethodInfo = location.state?.paymentMethod || "";

//   // --- LIFECYCLE ---
//   useEffect(() => {
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) setUserData(JSON.parse(userStr));

//     const fetchAllData = async () => {
//       setIsLoading(true);
//       setError(null);

//       const token = localStorage.getItem("user_token");
//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       try {
//         // 1. Ambil detail pesanan utama
//         const orderRes = await fetch(`${BASE_URL}/api/transactions/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         });
//         if (!orderRes.ok) throw new Error("Gagal mengambil detail pesanan.");

//         const rawOrderData = await orderRes.json();
//         setOrderData(rawOrderData.data ? rawOrderData.data : rawOrderData);

//         // 2. Ambil data tracking dari Biteship API melalui Laravel
//         try {
//           const trackRes = await fetch(
//             `${BASE_URL}/api/transactions/${id}/tracking`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 Accept: "application/json",
//               },
//             },
//           );
//           if (trackRes.ok) {
//             const rawTrackData = await trackRes.json();
//             setTrackingData(
//               rawTrackData.data ? rawTrackData.data : rawTrackData,
//             );
//           }
//         } catch (trackErr) {
//           console.warn(
//             "Data pelacakan belum tersedia dari pihak ekspedisi.",
//             trackErr,
//           );
//         }
//       } catch (err: any) {
//         setError(err.message || "Terjadi kesalahan sistem.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (id) fetchAllData();
//   }, [id, navigate]);

//   // --- COMPUTED & LOGIC ---
//   const activePaymentMethod = useMemo(() => {
//     if (orderData?.payment_method) return orderData.payment_method;
//     if (paymentMethodInfo) return paymentMethodInfo;
//     return null;
//   }, [orderData, paymentMethodInfo]);

//   const timelineHistory = useMemo(() => {
//     const apiHistory = trackingData?.courier?.history || [];
//     if (apiHistory.length > 0) {
//       // Biteship mengembalikan array kronologis, kita reverse agar yang terbaru di atas
//       return [...apiHistory].reverse();
//     }

//     // Fallback jika array history kosong tapi status sudah ada
//     return [
//       {
//         status: trackingData?.status || orderData?.status || "Processing",
//         note: getNoteFromStatus(trackingData?.status || orderData?.status),
//         updated_at:
//           trackingData?.delivery?.datetime ||
//           orderData?.created_at ||
//           new Date().toISOString(),
//       },
//     ];
//   }, [trackingData, orderData]);

//   // --- HELPERS ---
//   const getCourierLogo = (company: string) => {
//     if (!company) return null;
//     const map: Record<string, string> = {
//       jne: "jne.png",
//       sicepat: "sicepat.png",
//       jnt: "jnt.png",
//       anteraja: "anteraja.png",
//       gojek: "gojek.png",
//       grab: "grab.png",
//       paxel: "paxel.png",
//       ninja: "ninja.png",
//     };
//     return map[company.toLowerCase()]
//       ? "/courier_images/" + map[company.toLowerCase()]
//       : null;
//   };

//   const getPaymentLogo = (methodString: string) => {
//     if (!methodString) return null;
//     const channel = methodString.split(" ")[1]?.toLowerCase();
//     const map: Record<string, string> = {
//       bca: "bca.png",
//       bni: "bni.png",
//       bri: "bri.png",
//       mandiri: "mandiri.png",
//       bsi: "bsi.png",
//       permata: "permata.png",
//       ovo: "ovo.png",
//       dana: "dana.png",
//       linkaja: "linkaja.png",
//       shopeepay: "shopeepay.png",
//       alfamart: "alfamart.png",
//       indomaret: "indomaret.png",
//       qris: "qris.png",
//     };
//     return map[channel] ? "/payment_images/" + map[channel] : null;
//   };

//   // const formatPrice = (v: number) =>
//   //   new Intl.NumberFormat("id-ID", {
//   //     style: "currency",
//   //     currency: "IDR",
//   //     minimumFractionDigits: 0,
//   //   }).format(v || 0);

//   const getGrandTotal = (order: any) => {
//     if (!order) return 0;
//     const total = parseFloat(order.total_amount || 0);
//     const shipping = parseFloat(order.shipping_cost || 0);
//     const promo = parseFloat(order.promo_discount || 0);

//     const pointsDiscount = (order.points_used || 0) * 1000;

//     return total + shipping - promo - pointsDiscount;
//   };

//   const formatStatusTitle = (status: string) => {
//     if (!status) return "Processing";
//     const formatted = status.replace(/_/g, " ");
//     return formatted.charAt(0).toUpperCase() + formatted.slice(1);
//   };

//   const formatDate = (dateString: string) => {
//     if (!dateString) return "-";
//     return new Date(dateString).toLocaleDateString("id-ID", {
//       weekday: "long",
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   function getNoteFromStatus(status: string) {
//     const map: Record<string, string> = {
//       pending: "Menunggu pembayaran dari pelanggan.",
//       placed: "Pesanan telah masuk dan menunggu alokasi kurir.",
//       allocated: "Kurir telah dialokasikan dan akan segera menjemput paket.",
//       picking_up: "Kurir sedang dalam perjalanan menuju lokasi penjemputan.",
//       picked: "Paket telah diambil oleh kurir dan masuk ke pusat sortir.",
//       dropping_off: "Paket sedang dalam perjalanan menuju alamat tujuan.",
//       delivered: "Paket telah berhasil dikirim dan diterima.",
//       rejected: "Pengiriman ditolak oleh kurir atau sistem.",
//       cancelled: "Pengiriman telah dibatalkan.",
//     };
//     return map[status] || "Pesanan sedang diproses oleh sistem.";
//   }

//   // --- RENDER ---
//   return (
//     <div className="w-full min-h-screen px-6 py-20 font-sans md:px-12 lg:px-20 animate-fade-in">
//       {/* HEADER */}
//       <div className="flex flex-col gap-4 mb-8 md:flex-row md:justify-between md:items-center">
//         <div>
//           <button
//             onClick={() => navigate("/orders")}
//             className="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest text-gray-500 uppercase transition hover:text-gray-900"
//           >
//             <span>&larr;</span> Kembali ke Pesanan
//           </button>
//           <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 uppercase md:text-4xl">
//             Lacak Pengiriman
//           </h1>
//         </div>
//       </div>

//       {/* STATE: LOADING */}
//       {isLoading ? (
//         <div className="flex flex-col items-center justify-center py-20">
//           <div className="w-10 h-10 border-4 border-gray-100 rounded-full border-t-gycora animate-spin"></div>
//           <p className="mt-4 text-xs font-bold tracking-widest text-gray-400 uppercase animate-pulse">
//             Mengambil detail pesanan...
//           </p>
//         </div>
//       ) : /* STATE: ERROR */
//       error ? (
//         <div className="p-8 text-center border border-red-100 bg-red-50 rounded-2xl">
//           <p className="font-bold text-red-600">{error}</p>
//         </div>
//       ) : (
//         /* STATE: SUCCESS */
//         orderData && (
//           <div className="space-y-6 animate-fade-in">
//             {/* TRACKING CARD TOP */}
//             <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
//               <div className="flex flex-col items-start justify-between gap-6 p-6 border-b border-gray-100 bg-gray-50 md:p-8 md:flex-row md:items-center">
//                 <div>
//                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
//                     Nomor Resi (Waybill)
//                   </p>
//                   <p className="font-mono text-xl font-bold text-black">
//                     {trackingData?.courier?.waybill_id ||
//                       orderData.tracking_number ||
//                       "Menunggu Resi..."}
//                   </p>
//                   <div className="flex flex-wrap items-center gap-3 mt-3">
//                     <span className="bg-gray-900 text-white px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest">
//                       {formatStatusTitle(
//                         trackingData?.status || orderData.status,
//                       )}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-center w-full gap-6 md:w-auto">
//                   {/* PAYMENT INFO */}
//                   {activePaymentMethod && (
//                     <div className="flex flex-col items-start md:items-end">
//                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
//                         Pembayaran
//                       </p>
//                       <div className="flex items-center gap-3">
//                         <div className="flex items-center justify-center w-10 h-6 overflow-hidden bg-white border border-gray-200 rounded shrink-0">
//                           {getPaymentLogo(activePaymentMethod) ? (
//                             <img
//                               src={getPaymentLogo(activePaymentMethod)!}
//                               className="object-contain w-full h-full p-0.5"
//                             />
//                           ) : (
//                             <span className="font-black text-gray-300 text-[8px]">
//                               {activePaymentMethod.split(" ")[1] || "PAY"}
//                             </span>
//                           )}
//                         </div>
//                         <p className="text-xs font-bold uppercase text-gycora">
//                           {activePaymentMethod.replace("_", " ")}
//                         </p>
//                       </div>
//                     </div>
//                   )}

//                   <div className="hidden w-px h-8 bg-gray-200 md:block"></div>

//                   {/* COURIER INFO */}
//                   <div className="flex flex-col items-start md:items-end">
//                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
//                       Kurir
//                     </p>
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-8 h-8 overflow-hidden bg-white border border-gray-200 rounded-lg shrink-0">
//                         {getCourierLogo(
//                           trackingData?.courier?.company ||
//                             orderData.courier_company,
//                         ) ? (
//                           <img
//                             src={
//                               getCourierLogo(
//                                 trackingData?.courier?.company ||
//                                   orderData.courier_company,
//                               )!
//                             }
//                             className="object-contain w-full h-full p-1"
//                           />
//                         ) : (
//                           <span className="font-black text-gray-300 text-[8px]">
//                             {trackingData?.courier?.company?.toUpperCase() ||
//                               orderData.courier_company?.toUpperCase() ||
//                               "N/A"}
//                           </span>
//                         )}
//                       </div>
//                       <div className="text-left md:text-right">
//                         <p className="text-xs font-bold text-gray-800 uppercase">
//                           {trackingData?.courier?.company ||
//                             orderData.courier_company}
//                         </p>
//                         <p className="text-[10px] text-gray-500 font-bold uppercase mt-0.5">
//                           {trackingData?.courier?.type ||
//                             orderData.courier_type}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* ADDRESS DETAILS */}
//               {trackingData ? (
//                 <div className="grid grid-cols-1 gap-8 p-6 text-sm bg-white md:p-8 md:grid-cols-2">
//                   {/* ORIGIN */}
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
//                       <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
//                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
//                         Detail Pengirim
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         Nama Pengirim
//                       </p>
//                       <p className="font-bold text-gray-900">
//                         {trackingData.origin?.contact_name || "Gycora Store"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         Nomor Telepon
//                       </p>
//                       <p className="font-mono text-xs text-gray-700">
//                         {trackingData.origin?.contact_phone || "-"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         Alamat Lengkap
//                       </p>
//                       <p className="text-xs leading-relaxed text-gray-600">
//                         {trackingData.origin?.address || "-"}
//                         <br />
//                         {trackingData.origin?.postal_code && (
//                           <span className="font-bold">
//                             Kode Pos: {trackingData.origin.postal_code}
//                           </span>
//                         )}
//                       </p>
//                     </div>
//                   </div>

//                   {/* DESTINATION */}
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
//                       <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
//                       <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">
//                         Detail Penerima
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         Nama Penerima
//                       </p>
//                       <p className="font-bold text-gray-900">
//                         {trackingData.destination?.contact_name || "-"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         Nomor Telepon
//                       </p>
//                       <p className="font-mono text-xs text-gray-700">
//                         {trackingData.destination?.contact_phone || "-"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         Alamat Lengkap
//                       </p>
//                       <p className="text-xs leading-relaxed text-gray-600">
//                         {trackingData.destination?.address || "-"}
//                         <br />
//                         {trackingData.destination?.postal_code && (
//                           <span className="font-bold">
//                             Kode Pos: {trackingData.destination.postal_code}
//                           </span>
//                         )}
//                       </p>
//                     </div>
//                     {trackingData.destination?.note && (
//                       <div>
//                         <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                           Catatan Kurir
//                         </p>
//                         <p className="p-2 text-xs italic text-gray-500 border rounded bg-gray-50">
//                           "{trackingData.destination.note}"
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="p-6 text-xs italic text-center text-gray-400 bg-white md:p-8">
//                   Menunggu data lokasi origin dan destinasi tersedia dari pihak
//                   ekspedisi...
//                 </div>
//               )}
//             </div>

//             {/* ORDER ITEMS SUMMARY */}
//             {orderData.details && orderData.details.length > 0 && (
//               <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
//                 <div className="p-4 border-b border-gray-100 bg-gray-50">
//                   <h3 className="ml-2 text-xs font-bold tracking-widest text-gray-500 uppercase">
//                     Ringkasan Barang
//                   </h3>
//                 </div>

//                 <div className="p-6">
//                   <div className="mb-6 space-y-4">
//                     {orderData.details.map((detail: any) => (
//                       <div
//                         key={detail.id}
//                         className="flex items-center gap-4 pb-4 border-b border-gray-50 last:border-0"
//                       >
//                         <img
//                           src={detail.product.image_url}
//                           className="object-cover w-16 h-16 bg-gray-100 border border-gray-100 rounded-lg"
//                         />
//                         <div className="flex-grow">
//                           <h4 className="text-sm font-bold text-gray-900 uppercase">
//                             {detail.product.name}
//                           </h4>
//                           {/* [PERBAIKAN] Ubah dari teks Hex ke Lingkaran Warna */}
//                           {detail.color && (
//                             <div className="flex items-center gap-1.5 mt-1">
//                               <div
//                                 className="w-3 h-3 border border-gray-300 rounded-full shadow-sm"
//                                 style={{ backgroundColor: detail.color }}
//                                 title="Varian Warna"
//                               ></div>
//                             </div>
//                           )}
//                           <p className="mt-1 text-xs text-gray-400">
//                             {detail.quantity} x {formatPrice(detail.price)}
//                           </p>
//                         </div>
//                         <p className="text-sm font-bold text-gray-900">
//                           {formatPrice(detail.quantity * detail.price)}
//                         </p>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="pt-4 space-y-2 border-t border-gray-100">
//                     <div className="flex justify-between text-xs text-gray-500">
//                       <span>Subtotal Produk</span>
//                       <span>{formatPrice(orderData.total_amount)}</span>
//                     </div>
//                     <div className="flex justify-between text-xs text-gray-500">
//                       <span>Ongkos Kirim</span>
//                       <span>{formatPrice(orderData.shipping_cost)}</span>
//                     </div>

//                     {orderData.promo_discount > 0 && (
//                       <div className="flex justify-between text-xs font-medium text-emerald-600">
//                         <span>
//                           Promo (
//                           <span className="font-mono uppercase">
//                             {orderData.promo_code}
//                           </span>
//                           )
//                         </span>
//                         <span>- {formatPrice(orderData.promo_discount)}</span>
//                       </div>
//                     )}

//                     {orderData.points_used > 0 && (
//                       <div className="flex justify-between text-xs font-medium text-yellow-600">
//                         <span>
//                           Poin Ditukarkan ({orderData.points_used} Pts)
//                         </span>
//                         <span>
//                           - {formatPrice(orderData.points_used * 1000)}
//                         </span>
//                       </div>
//                     )}

//                     <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200 border-dashed">
//                       <span className="font-bold text-[10px] uppercase tracking-widest text-black">
//                         Total Akhir
//                       </span>
//                       <span className="text-xl font-black text-gycora">
//                         {formatPrice(getGrandTotal(orderData))}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* LOYALTY REWARD (If Applicable) */}
//                 {userData?.is_membership &&
//                 orderData.point > 0 &&
//                 orderData.status === "completed" ? (
//                   <div className="flex items-center justify-between p-4 m-6 border rounded-xl bg-gradient-to-r from-emerald-50 to-white border-emerald-100">
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-10 h-10 text-white rounded-full shadow-sm bg-emerald-500">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       </div>
//                       <div>
//                         <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">
//                           Loyalty Reward
//                         </p>
//                         <p className="text-xs mt-0.5 text-gray-500">
//                           Poin masuk ke akun Anda
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <span className="text-2xl font-black text-emerald-600">
//                         +{orderData.point}
//                       </span>
//                       <span className="ml-1 text-xs font-bold text-emerald-800">
//                         Pts
//                       </span>
//                     </div>
//                   </div>
//                 ) : null}
//               </div>
//             )}

//             {/* TRACKING TIMELINE */}
//             <div className="p-6 bg-white border border-gray-100 shadow-sm md:p-8 rounded-3xl">
//               <h3 className="pb-4 mb-6 text-sm font-bold tracking-widest uppercase border-b border-gray-100">
//                 Riwayat Perjalanan (Timeline)
//               </h3>

//               <div className="relative ml-3 space-y-8 border-l-2 border-gray-100">
//                 {timelineHistory.map((history: any, index: number) => (
//                   <div key={index} className="relative pl-8">
//                     <span
//                       className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all ${
//                         index === 0
//                           ? "bg-gycora ring-4 ring-emerald-50"
//                           : "bg-gray-300"
//                       }`}
//                     ></span>

//                     <div className={index === 0 ? "opacity-100" : "opacity-50"}>
//                       <p className="mb-1 text-sm font-bold tracking-wide text-gray-900 uppercase">
//                         {formatStatusTitle(history.status)}
//                       </p>
//                       <p className="mb-2 text-xs text-gray-600">
//                         {history.note}
//                       </p>
//                       <p className="font-mono text-[10px] font-medium text-gray-400">
//                         {formatDate(history.updated_at)}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )
//       )}
//     </div>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { BASE_URL } from "../../config/api";
// import { useCurrency } from "../../context/CurrencyContext";
// import { useLanguage } from "../../context/LanguageContext"; // [BARU] Import Context Bahasa

// export default function TrackingPage() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { formatPrice } = useCurrency();
//   const { t, lang } = useLanguage(); // [BARU] Inisialisasi hook bahasa

//   // --- STATE ---
//   const [userData, setUserData] = useState<any>(null);
//   const [orderData, setOrderData] = useState<any>(null);
//   const [trackingData, setTrackingData] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Ambil state 'paymentMethod' yang dilempar dari OrderPage jika ada
//   const paymentMethodInfo = location.state?.paymentMethod || "";

//   // =========================================================
//   // LOGIKA PREFIX URL PINTAR
//   // Membaca URL saat ini untuk menentukan prefix navigasi
//   // =========================================================
//   const getUrlPrefix = () => {
//     if (location.pathname.startsWith("/id")) return "/id";
//     if (location.pathname.startsWith("/en")) return "/en";
//     return ""; // Tanpa prefix
//   };
//   const urlPrefix = getUrlPrefix();

//   // --- LIFECYCLE ---
//   useEffect(() => {
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) setUserData(JSON.parse(userStr));

//     const fetchAllData = async () => {
//       setIsLoading(true);
//       setError(null);

//       const token = localStorage.getItem("user_token");
//       if (!token) {
//         navigate(`${urlPrefix}/login`); // [PERBAIKAN] Tambah urlPrefix
//         return;
//       }

//       try {
//         // 1. Ambil detail pesanan utama
//         const orderRes = await fetch(`${BASE_URL}/api/transactions/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         });
//         if (!orderRes.ok) throw new Error(t("tp_err_fetch_order"));

//         const rawOrderData = await orderRes.json();
//         setOrderData(rawOrderData.data ? rawOrderData.data : rawOrderData);

//         // 2. Ambil data tracking dari Biteship API melalui Laravel
//         try {
//           const trackRes = await fetch(
//             `${BASE_URL}/api/transactions/${id}/tracking`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 Accept: "application/json",
//               },
//             },
//           );
//           if (trackRes.ok) {
//             const rawTrackData = await trackRes.json();
//             setTrackingData(
//               rawTrackData.data ? rawTrackData.data : rawTrackData,
//             );
//           }
//         } catch (trackErr) {
//           console.warn(
//             "Data pelacakan belum tersedia dari pihak ekspedisi.",
//             trackErr,
//           );
//         }
//       } catch (err: any) {
//         setError(err.message || t("tp_err_system"));
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (id) fetchAllData();
//   }, [id, navigate, t, urlPrefix]);

//   // --- COMPUTED & LOGIC ---
//   const activePaymentMethod = useMemo(() => {
//     if (orderData?.payment_method) return orderData.payment_method;
//     if (paymentMethodInfo) return paymentMethodInfo;
//     return null;
//   }, [orderData, paymentMethodInfo]);

//   const timelineHistory = useMemo(() => {
//     const apiHistory = trackingData?.courier?.history || [];
//     if (apiHistory.length > 0) {
//       // Biteship mengembalikan array kronologis, kita reverse agar yang terbaru di atas
//       return [...apiHistory].reverse();
//     }

//     // Fallback jika array history kosong tapi status sudah ada
//     return [
//       {
//         status: trackingData?.status || orderData?.status || t("tp_stat_processing"),
//         note: getNoteFromStatus(trackingData?.status || orderData?.status),
//         updated_at:
//           trackingData?.delivery?.datetime ||
//           orderData?.created_at ||
//           new Date().toISOString(),
//       },
//     ];
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [trackingData, orderData, t]);

//   // --- HELPERS ---
//   const getCourierLogo = (company: string) => {
//     if (!company) return null;
//     const map: Record<string, string> = {
//       jne: "jne.png",
//       sicepat: "sicepat.png",
//       jnt: "jnt.png",
//       anteraja: "anteraja.png",
//       gojek: "gojek.png",
//       grab: "grab.png",
//       paxel: "paxel.png",
//       ninja: "ninja.png",
//     };
//     return map[company.toLowerCase()]
//       ? "/courier_images/" + map[company.toLowerCase()]
//       : null;
//   };

//   const getPaymentLogo = (methodString: string) => {
//     if (!methodString) return null;
//     const channel = methodString.split(" ")[1]?.toLowerCase();
//     const map: Record<string, string> = {
//       bca: "bca.png",
//       bni: "bni.png",
//       bri: "bri.png",
//       mandiri: "mandiri.png",
//       bsi: "bsi.png",
//       permata: "permata.png",
//       ovo: "ovo.png",
//       dana: "dana.png",
//       linkaja: "linkaja.png",
//       shopeepay: "shopeepay.png",
//       alfamart: "alfamart.png",
//       indomaret: "indomaret.png",
//       qris: "qris.png",
//     };
//     return map[channel] ? "/payment_images/" + map[channel] : null;
//   };

//   const getGrandTotal = (order: any) => {
//     if (!order) return 0;
//     const total = parseFloat(order.total_amount || 0);
//     const shipping = parseFloat(order.shipping_cost || 0);
//     const promo = parseFloat(order.promo_discount || 0);

//     const pointsDiscount = (order.points_used || 0) * 1000;

//     return total + shipping - promo - pointsDiscount;
//   };

//   const formatStatusTitle = (status: string) => {
//     if (!status) return t("tp_stat_processing");
//     const formatted = status.replace(/_/g, " ");
//     return formatted.charAt(0).toUpperCase() + formatted.slice(1);
//   };

//   const formatDate = (dateString: string) => {
//     if (!dateString) return "-";
//     // [PERBAIKAN] Menggunakan `lang` untuk penanggalan dinamis
//     return new Date(dateString).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
//       weekday: "long",
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   function getNoteFromStatus(status: string) {
//     const map: Record<string, string> = {
//       pending: t("tp_note_pending"),
//       placed: t("tp_note_placed"),
//       allocated: t("tp_note_allocated"),
//       picking_up: t("tp_note_picking_up"),
//       picked: t("tp_note_picked"),
//       dropping_off: t("tp_note_dropping_off"),
//       delivered: t("tp_note_delivered"),
//       rejected: t("tp_note_rejected"),
//       cancelled: t("tp_note_cancelled"),
//     };
//     return map[status] || t("tp_note_default");
//   }

//   // --- RENDER ---
//   return (
//     <div className="w-full min-h-screen px-6 py-20 font-sans md:px-12 lg:px-20 animate-fade-in">
//       {/* HEADER */}
//       <div className="flex flex-col gap-4 mb-8 md:flex-row md:justify-between md:items-center">
//         <div>
//           <button
//             onClick={() => navigate(`${urlPrefix}/orders`)} // [PERBAIKAN] Menambahkan urlPrefix
//             className="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest text-gray-500 uppercase transition hover:text-gray-900"
//           >
//             <span>&larr;</span> {t("tp_back_to_orders")}
//           </button>
//           <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 uppercase md:text-4xl">
//             {t("tp_title")}
//           </h1>
//         </div>
//       </div>

//       {/* STATE: LOADING */}
//       {isLoading ? (
//         <div className="flex flex-col items-center justify-center py-20">
//           <div className="w-10 h-10 border-4 border-gray-100 rounded-full border-t-gycora animate-spin"></div>
//           <p className="mt-4 text-xs font-bold tracking-widest text-gray-400 uppercase animate-pulse">
//             {t("tp_loading_details")}
//           </p>
//         </div>
//       ) : /* STATE: ERROR */
//       error ? (
//         <div className="p-8 text-center border border-red-100 bg-red-50 rounded-2xl">
//           <p className="font-bold text-red-600">{error}</p>
//         </div>
//       ) : (
//         /* STATE: SUCCESS */
//         orderData && (
//           <div className="space-y-6 animate-fade-in">
//             {/* TRACKING CARD TOP */}
//             <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
//               <div className="flex flex-col items-start justify-between gap-6 p-6 border-b border-gray-100 bg-gray-50 md:p-8 md:flex-row md:items-center">
//                 <div>
//                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
//                     {t("tp_waybill_title")}
//                   </p>
//                   <p className="font-mono text-xl font-bold text-black">
//                     {trackingData?.courier?.waybill_id ||
//                       orderData.tracking_number ||
//                       t("tp_waiting_waybill")}
//                   </p>
//                   <div className="flex flex-wrap items-center gap-3 mt-3">
//                     <span className="bg-gray-900 text-white px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest">
//                       {formatStatusTitle(
//                         trackingData?.status || orderData.status,
//                       )}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-center w-full gap-6 md:w-auto">
//                   {/* PAYMENT INFO */}
//                   {activePaymentMethod && (
//                     <div className="flex flex-col items-start md:items-end">
//                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
//                         {t("tp_payment_title")}
//                       </p>
//                       <div className="flex items-center gap-3">
//                         <div className="flex items-center justify-center w-10 h-6 overflow-hidden bg-white border border-gray-200 rounded shrink-0">
//                           {getPaymentLogo(activePaymentMethod) ? (
//                             <img
//                               src={getPaymentLogo(activePaymentMethod)!}
//                               className="object-contain w-full h-full p-0.5"
//                             />
//                           ) : (
//                             <span className="font-black text-gray-300 text-[8px]">
//                               {activePaymentMethod.split(" ")[1] || "PAY"}
//                             </span>
//                           )}
//                         </div>
//                         <p className="text-xs font-bold uppercase text-gycora">
//                           {activePaymentMethod.replace("_", " ")}
//                         </p>
//                       </div>
//                     </div>
//                   )}

//                   <div className="hidden w-px h-8 bg-gray-200 md:block"></div>

//                   {/* COURIER INFO */}
//                   <div className="flex flex-col items-start md:items-end">
//                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
//                       {t("tp_courier_title")}
//                     </p>
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-8 h-8 overflow-hidden bg-white border border-gray-200 rounded-lg shrink-0">
//                         {getCourierLogo(
//                           trackingData?.courier?.company ||
//                             orderData.courier_company,
//                         ) ? (
//                           <img
//                             src={
//                               getCourierLogo(
//                                 trackingData?.courier?.company ||
//                                   orderData.courier_company,
//                               )!
//                             }
//                             className="object-contain w-full h-full p-1"
//                           />
//                         ) : (
//                           <span className="font-black text-gray-300 text-[8px]">
//                             {trackingData?.courier?.company?.toUpperCase() ||
//                               orderData.courier_company?.toUpperCase() ||
//                               t("tp_courier_na")}
//                           </span>
//                         )}
//                       </div>
//                       <div className="text-left md:text-right">
//                         <p className="text-xs font-bold text-gray-800 uppercase">
//                           {trackingData?.courier?.company ||
//                             orderData.courier_company}
//                         </p>
//                         <p className="text-[10px] text-gray-500 font-bold uppercase mt-0.5">
//                           {trackingData?.courier?.type ||
//                             orderData.courier_type}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* ADDRESS DETAILS */}
//               {trackingData ? (
//                 <div className="grid grid-cols-1 gap-8 p-6 text-sm bg-white md:p-8 md:grid-cols-2">
//                   {/* ORIGIN */}
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
//                       <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
//                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
//                         {t("tp_origin_title")}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_sender_name")}
//                       </p>
//                       <p className="font-bold text-gray-900">
//                         {trackingData.origin?.contact_name || "Gycora Store"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_sender_phone")}
//                       </p>
//                       <p className="font-mono text-xs text-gray-700">
//                         {trackingData.origin?.contact_phone || "-"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_sender_address")}
//                       </p>
//                       <p className="text-xs leading-relaxed text-gray-600">
//                         {trackingData.origin?.address || "-"}
//                         <br />
//                         {trackingData.origin?.postal_code && (
//                           <span className="font-bold">
//                             {t("tp_postal_code")}: {trackingData.origin.postal_code}
//                           </span>
//                         )}
//                       </p>
//                     </div>
//                   </div>

//                   {/* DESTINATION */}
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
//                       <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
//                       <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">
//                         {t("tp_dest_title")}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_receiver_name")}
//                       </p>
//                       <p className="font-bold text-gray-900">
//                         {trackingData.destination?.contact_name || "-"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_receiver_phone")}
//                       </p>
//                       <p className="font-mono text-xs text-gray-700">
//                         {trackingData.destination?.contact_phone || "-"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_receiver_address")}
//                       </p>
//                       <p className="text-xs leading-relaxed text-gray-600">
//                         {trackingData.destination?.address || "-"}
//                         <br />
//                         {trackingData.destination?.postal_code && (
//                           <span className="font-bold">
//                             {t("tp_postal_code")}: {trackingData.destination.postal_code}
//                           </span>
//                         )}
//                       </p>
//                     </div>
//                     {trackingData.destination?.note && (
//                       <div>
//                         <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                           {t("tp_courier_note")}
//                         </p>
//                         <p className="p-2 text-xs italic text-gray-500 border rounded bg-gray-50">
//                           "{trackingData.destination.note}"
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="p-6 text-xs italic text-center text-gray-400 bg-white md:p-8">
//                   {t("tp_waiting_location")}
//                 </div>
//               )}
//             </div>

//             {/* ORDER ITEMS SUMMARY */}
//             {orderData.details && orderData.details.length > 0 && (
//               <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
//                 <div className="p-4 border-b border-gray-100 bg-gray-50">
//                   <h3 className="ml-2 text-xs font-bold tracking-widest text-gray-500 uppercase">
//                     {t("tp_item_summary")}
//                   </h3>
//                 </div>

//                 <div className="p-6">
//                   <div className="mb-6 space-y-4">
//                     {orderData.details.map((detail: any) => (
//                       <div
//                         key={detail.id}
//                         className="flex items-center gap-4 pb-4 border-b border-gray-50 last:border-0"
//                       >
//                         <img
//                           src={detail.product.image_url}
//                           className="object-cover w-16 h-16 bg-gray-100 border border-gray-100 rounded-lg"
//                         />
//                         <div className="flex-grow">
//                           <h4 className="text-sm font-bold text-gray-900 uppercase">
//                             {detail.product.name}
//                           </h4>
//                           {detail.color && (
//                             <div className="flex items-center gap-1.5 mt-1">
//                               <div
//                                 className="w-3 h-3 border border-gray-300 rounded-full shadow-sm"
//                                 style={{ backgroundColor: detail.color }}
//                                 title={t("tp_variant_title")}
//                               ></div>
//                             </div>
//                           )}
//                           <p className="mt-1 text-xs text-gray-400">
//                             {detail.quantity} x {formatPrice(detail.price)}
//                           </p>
//                         </div>
//                         <p className="text-sm font-bold text-gray-900">
//                           {formatPrice(detail.quantity * detail.price)}
//                         </p>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="pt-4 space-y-2 border-t border-gray-100">
//                     <div className="flex justify-between text-xs text-gray-500">
//                       <span>{t("tp_subtotal")}</span>
//                       <span>{formatPrice(orderData.total_amount)}</span>
//                     </div>
//                     <div className="flex justify-between text-xs text-gray-500">
//                       <span>{t("tp_shipping_cost")}</span>
//                       <span>{formatPrice(orderData.shipping_cost)}</span>
//                     </div>

//                     {orderData.promo_discount > 0 && (
//                       <div className="flex justify-between text-xs font-medium text-emerald-600">
//                         <span>
//                           {t("tp_promo_label")} (
//                           <span className="font-mono uppercase">
//                             {orderData.promo_code}
//                           </span>
//                           )
//                         </span>
//                         <span>- {formatPrice(orderData.promo_discount)}</span>
//                       </div>
//                     )}

//                     {orderData.points_used > 0 && (
//                       <div className="flex justify-between text-xs font-medium text-yellow-600">
//                         <span>
//                           {t("tp_points_redeemed")} ({orderData.points_used} {t("tp_points_unit")})
//                         </span>
//                         <span>
//                           - {formatPrice(orderData.points_used * 1000)}
//                         </span>
//                       </div>
//                     )}

//                     <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200 border-dashed">
//                       <span className="font-bold text-[10px] uppercase tracking-widest text-black">
//                         {t("tp_grand_total")}
//                       </span>
//                       <span className="text-xl font-black text-gycora">
//                         {formatPrice(getGrandTotal(orderData))}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* LOYALTY REWARD (If Applicable) */}
//                 {userData?.is_membership &&
//                 orderData.point > 0 &&
//                 orderData.status === "completed" ? (
//                   <div className="flex items-center justify-between p-4 m-6 border rounded-xl bg-gradient-to-r from-emerald-50 to-white border-emerald-100">
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-10 h-10 text-white rounded-full shadow-sm bg-emerald-500">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       </div>
//                       <div>
//                         <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">
//                           {t("tp_loyalty_reward")}
//                         </p>
//                         <p className="text-xs mt-0.5 text-gray-500">
//                           {t("tp_points_earned")}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <span className="text-2xl font-black text-emerald-600">
//                         +{orderData.point}
//                       </span>
//                       <span className="ml-1 text-xs font-bold text-emerald-800">
//                         {t("tp_points_unit")}
//                       </span>
//                     </div>
//                   </div>
//                 ) : null}
//               </div>
//             )}

//             {/* TRACKING TIMELINE */}
//             <div className="p-6 bg-white border border-gray-100 shadow-sm md:p-8 rounded-3xl">
//               <h3 className="pb-4 mb-6 text-sm font-bold tracking-widest uppercase border-b border-gray-100">
//                 {t("tp_timeline_title")}
//               </h3>

//               <div className="relative ml-3 space-y-8 border-l-2 border-gray-100">
//                 {timelineHistory.map((history: any, index: number) => (
//                   <div key={index} className="relative pl-8">
//                     <span
//                       className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all ${
//                         index === 0
//                           ? "bg-gycora ring-4 ring-emerald-50"
//                           : "bg-gray-300"
//                       }`}
//                     ></span>

//                     <div className={index === 0 ? "opacity-100" : "opacity-50"}>
//                       <p className="mb-1 text-sm font-bold tracking-wide text-gray-900 uppercase">
//                         {formatStatusTitle(history.status)}
//                       </p>
//                       <p className="mb-2 text-xs text-gray-600">
//                         {history.note}
//                       </p>
//                       <p className="font-mono text-[10px] font-medium text-gray-400">
//                         {formatDate(history.updated_at)}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )
//       )}
//     </div>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { BASE_URL } from "../../config/api";
// import { useCurrency } from "../../context/CurrencyContext";
// import { useLanguage } from "../../context/LanguageContext";

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

// export default function TrackingPage() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { t, lang } = useLanguage();

//   // 👇 [PERBAIKAN] Tarik state currency dan exchangeRates (hapus formatPrice lama)
//   const { currency, exchangeRates } = useCurrency() as any;

//   // --- STATE ---
//   const [userData, setUserData] = useState<any>(null);
//   const [orderData, setOrderData] = useState<any>(null);
//   const [trackingData, setTrackingData] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Ambil state 'paymentMethod' yang dilempar dari OrderPage jika ada
//   const paymentMethodInfo = location.state?.paymentMethod || "";

//   // =========================================================
//   // LOGIKA PREFIX URL PINTAR
//   // =========================================================
//   const getUrlPrefix = () => {
//     if (location.pathname.startsWith("/id")) return "/id";
//     if (location.pathname.startsWith("/en")) return "/en";
//     return "";
//   };
//   const urlPrefix = getUrlPrefix();

//   // --- LIFECYCLE ---
//   useEffect(() => {
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) setUserData(JSON.parse(userStr));

//     const fetchAllData = async () => {
//       setIsLoading(true);
//       setError(null);

//       const token = localStorage.getItem("user_token");
//       if (!token) {
//         navigate(`${urlPrefix}/login`);
//         return;
//       }

//       try {
//         // 1. Ambil detail pesanan utama
//         const orderRes = await fetch(`${BASE_URL}/api/transactions/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         });
//         if (!orderRes.ok) throw new Error(t("tp_err_fetch_order"));

//         const rawOrderData = await orderRes.json();
//         setOrderData(rawOrderData.data ? rawOrderData.data : rawOrderData);

//         // 2. Ambil data tracking dari Biteship API melalui Laravel
//         try {
//           const trackRes = await fetch(
//             `${BASE_URL}/api/transactions/${id}/tracking`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 Accept: "application/json",
//               },
//             },
//           );
//           if (trackRes.ok) {
//             const rawTrackData = await trackRes.json();
//             setTrackingData(
//               rawTrackData.data ? rawTrackData.data : rawTrackData,
//             );
//           }
//         } catch (trackErr) {
//           console.warn(
//             "Data pelacakan belum tersedia dari pihak ekspedisi.",
//             trackErr,
//           );
//         }
//       } catch (err: any) {
//         setError(err.message || t("tp_err_system"));
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (id) fetchAllData();
//   }, [id, navigate, t, urlPrefix]);

//   // --- COMPUTED & LOGIC ---
//   const activePaymentMethod = useMemo(() => {
//     if (orderData?.payment_method) return orderData.payment_method;
//     if (paymentMethodInfo) return paymentMethodInfo;
//     return null;
//   }, [orderData, paymentMethodInfo]);

//   const timelineHistory = useMemo(() => {
//     const apiHistory = trackingData?.courier?.history || [];
//     if (apiHistory.length > 0) {
//       // Biteship mengembalikan array kronologis, kita reverse agar yang terbaru di atas
//       return [...apiHistory].reverse();
//     }

//     // Fallback jika array history kosong tapi status sudah ada
//     return [
//       {
//         status: trackingData?.status || orderData?.status || t("tp_stat_processing"),
//         note: getNoteFromStatus(trackingData?.status || orderData?.status),
//         updated_at:
//           trackingData?.delivery?.datetime ||
//           orderData?.created_at ||
//           new Date().toISOString(),
//       },
//     ];
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [trackingData, orderData, t]);

//   // ============================================================================
//   // 👇 [PERBAIKAN] HELPER HARGA MULTI-CURRENCY DENGAN AUTO-FALLBACK 👇
//   // ============================================================================
//   const convertIDRtoActiveCurrency = (idrAmount: number) => {
//     const curr = (currency as Currency) || "IDR";
//     if (curr === "IDR" || !exchangeRates || !exchangeRates[curr]) return { value: idrAmount, curr: "IDR" };
//     return { value: idrAmount * exchangeRates[curr], curr: curr };
//   };

//   const formatCurrencyDisplay = (priceObj: { value: number; curr: string } | null) => {
//     if (!priceObj) return "";
//     const symbols: any = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
//     const formatter = new Intl.NumberFormat(priceObj.curr === "IDR" ? "id-ID" : "en-US", {
//       minimumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//       maximumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//     });
//     return `${symbols[priceObj.curr] || priceObj.curr + " "}${formatter.format(priceObj.value)}`;
//   };
//   // ============================================================================

//   // --- HELPERS ---
//   const getSubtotal = (order: any) => order.total_amount;

//   const getOrderQuantity = (order: any) =>
//     order.details.reduce((sum: number, item: any) => sum + item.quantity, 0);

//   const getGrandTotal = (order: any) => {
//     if (!order) return 0;
//     const total = parseFloat(order.total_amount || 0);
//     const shipping = parseFloat(order.shipping_cost || 0);
//     const promo = parseFloat(order.promo_discount || 0);
//     const pointsDiscount = (order.points_used || 0) * 1000;
//     return total + shipping - promo - pointsDiscount;
//   };

//   const getCourierLogo = (company: string) => {
//     if (!company) return null;
//     const map: Record<string, string> = {
//       jne: "jne.png", sicepat: "sicepat.png", jnt: "jnt.png",
//       anteraja: "anteraja.png", gojek: "gojek.png", grab: "grab.png",
//       paxel: "paxel.png", ninja: "ninja.png",
//     };
//     return map[company.toLowerCase()]
//       ? "/courier_images/" + map[company.toLowerCase()]
//       : null;
//   };

//   const getPaymentLogo = (methodString: string) => {
//     if (!methodString) return null;
//     const channel = methodString.split(" ")[1]?.toLowerCase();
//     const map: Record<string, string> = {
//       bca: "bca.png", bni: "bni.png", bri: "bri.png", mandiri: "mandiri.png",
//       bsi: "bsi.png", permata: "permata.png", ovo: "ovo.png", dana: "dana.png",
//       linkaja: "linkaja.png", shopeepay: "shopeepay.png", alfamart: "alfamart.png",
//       indomaret: "indomaret.png", qris: "qris.png",
//     };
//     return map[channel] ? "/payment_images/" + map[channel] : null;
//   };

//   const formatStatusTitle = (status: string) => {
//     if (!status) return t("tp_stat_processing");
//     const formatted = status.replace(/_/g, " ");
//     return formatted.charAt(0).toUpperCase() + formatted.slice(1);
//   };

//   const formatDate = (dateString: string) => {
//     if (!dateString) return "-";
//     return new Date(dateString).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
//       weekday: "long", year: "numeric", month: "short", day: "numeric",
//       hour: "2-digit", minute: "2-digit",
//     });
//   };

//   function getNoteFromStatus(status: string) {
//     const map: Record<string, string> = {
//       pending: t("tp_note_pending"), placed: t("tp_note_placed"),
//       allocated: t("tp_note_allocated"), picking_up: t("tp_note_picking_up"),
//       picked: t("tp_note_picked"), dropping_off: t("tp_note_dropping_off"),
//       delivered: t("tp_note_delivered"), rejected: t("tp_note_rejected"),
//       cancelled: t("tp_note_cancelled"),
//     };
//     return map[status] || t("tp_note_default");
//   }

//   // 👇 [LOGIKA GROSIR] 👇
//   const orderTotalQty = orderData ? getOrderQuantity(orderData) : 0;
//   const isWholesaleOrder = userData?.usertype === 'reseller' && orderTotalQty >= 24;

//   // --- RENDER ---
//   return (
//     <div className="w-full min-h-screen px-6 py-20 font-sans md:px-12 lg:px-20 animate-fade-in">
//       {/* HEADER */}
//       <div className="flex flex-col gap-4 mb-8 md:flex-row md:justify-between md:items-center">
//         <div>
//           <button
//             onClick={() => navigate(`${urlPrefix}/orders`)}
//             className="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest text-gray-500 uppercase transition hover:text-gray-900"
//           >
//             <span>&larr;</span> {t("tp_back_to_orders")}
//           </button>
//           <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 uppercase md:text-4xl">
//             {t("tp_title")}
//           </h1>
//         </div>
//       </div>

//       {/* STATE: LOADING */}
//       {isLoading ? (
//         <div className="flex flex-col items-center justify-center py-20">
//           <div className="w-10 h-10 border-4 border-gray-100 rounded-full border-t-gycora animate-spin"></div>
//           <p className="mt-4 text-xs font-bold tracking-widest text-gray-400 uppercase animate-pulse">
//             {t("tp_loading_details")}
//           </p>
//         </div>
//       ) : /* STATE: ERROR */
//       error ? (
//         <div className="p-8 text-center border border-red-100 bg-red-50 rounded-2xl">
//           <p className="font-bold text-red-600">{error}</p>
//         </div>
//       ) : (
//         /* STATE: SUCCESS */
//         orderData && (
//           <div className="space-y-6 animate-fade-in">
//             {/* TRACKING CARD TOP */}
//             <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
//               <div className="flex flex-col items-start justify-between gap-6 p-6 border-b border-gray-100 bg-gray-50 md:p-8 md:flex-row md:items-center">
//                 <div>
//                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
//                     {t("tp_waybill_title")}
//                   </p>
//                   <p className="font-mono text-xl font-bold text-black">
//                     {trackingData?.courier?.waybill_id ||
//                       orderData.tracking_number ||
//                       t("tp_waiting_waybill")}
//                   </p>
//                   <div className="flex flex-wrap items-center gap-3 mt-3">
//                     <span className="bg-gray-900 text-white px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest">
//                       {formatStatusTitle(
//                         trackingData?.status || orderData.status,
//                       )}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-center w-full gap-6 md:w-auto">
//                   {/* PAYMENT INFO */}
//                   {activePaymentMethod && (
//                     <div className="flex flex-col items-start md:items-end">
//                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
//                         {t("tp_payment_title")}
//                       </p>
//                       <div className="flex items-center gap-3">
//                         <div className="flex items-center justify-center w-10 h-6 overflow-hidden bg-white border border-gray-200 rounded shrink-0">
//                           {getPaymentLogo(activePaymentMethod) ? (
//                             <img
//                               src={getPaymentLogo(activePaymentMethod)!}
//                               className="object-contain w-full h-full p-0.5"
//                             />
//                           ) : (
//                             <span className="font-black text-gray-300 text-[8px]">
//                               {activePaymentMethod.split(" ")[1] || "PAY"}
//                             </span>
//                           )}
//                         </div>
//                         <p className="text-xs font-bold uppercase text-gycora">
//                           {activePaymentMethod.replace("_", " ")}
//                         </p>
//                       </div>
//                     </div>
//                   )}

//                   <div className="hidden w-px h-8 bg-gray-200 md:block"></div>

//                   {/* COURIER INFO */}
//                   <div className="flex flex-col items-start md:items-end">
//                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
//                       {t("tp_courier_title")}
//                     </p>
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-8 h-8 overflow-hidden bg-white border border-gray-200 rounded-lg shrink-0">
//                         {getCourierLogo(
//                           trackingData?.courier?.company ||
//                             orderData.courier_company,
//                         ) ? (
//                           <img
//                             src={
//                               getCourierLogo(
//                                 trackingData?.courier?.company ||
//                                   orderData.courier_company,
//                               )!
//                             }
//                             className="object-contain w-full h-full p-1"
//                           />
//                         ) : (
//                           <span className="font-black text-gray-300 text-[8px]">
//                             {trackingData?.courier?.company?.toUpperCase() ||
//                               orderData.courier_company?.toUpperCase() ||
//                               t("tp_courier_na")}
//                           </span>
//                         )}
//                       </div>
//                       <div className="text-left md:text-right">
//                         <p className="text-xs font-bold text-gray-800 uppercase">
//                           {trackingData?.courier?.company ||
//                             orderData.courier_company}
//                         </p>
//                         <p className="text-[10px] text-gray-500 font-bold uppercase mt-0.5">
//                           {trackingData?.courier?.type ||
//                             orderData.courier_type}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* ADDRESS DETAILS */}
//               {trackingData ? (
//                 <div className="grid grid-cols-1 gap-8 p-6 text-sm bg-white md:p-8 md:grid-cols-2">
//                   {/* ORIGIN */}
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
//                       <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
//                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
//                         {t("tp_origin_title")}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_sender_name")}
//                       </p>
//                       <p className="font-bold text-gray-900">
//                         {trackingData.origin?.contact_name || "Gycora Store"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_sender_phone")}
//                       </p>
//                       <p className="font-mono text-xs text-gray-700">
//                         {trackingData.origin?.contact_phone || "-"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_sender_address")}
//                       </p>
//                       <p className="text-xs leading-relaxed text-gray-600">
//                         {trackingData.origin?.address || "-"}
//                         <br />
//                         {trackingData.origin?.postal_code && (
//                           <span className="font-bold">
//                             {t("tp_postal_code")}: {trackingData.origin.postal_code}
//                           </span>
//                         )}
//                       </p>
//                     </div>
//                   </div>

//                   {/* DESTINATION */}
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
//                       <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
//                       <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">
//                         {t("tp_dest_title")}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_receiver_name")}
//                       </p>
//                       <p className="font-bold text-gray-900">
//                         {trackingData.destination?.contact_name || "-"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_receiver_phone")}
//                       </p>
//                       <p className="font-mono text-xs text-gray-700">
//                         {trackingData.destination?.contact_phone || "-"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_receiver_address")}
//                       </p>
//                       <p className="text-xs leading-relaxed text-gray-600">
//                         {trackingData.destination?.address || "-"}
//                         <br />
//                         {trackingData.destination?.postal_code && (
//                           <span className="font-bold">
//                             {t("tp_postal_code")}: {trackingData.destination.postal_code}
//                           </span>
//                         )}
//                       </p>
//                     </div>
//                     {trackingData.destination?.note && (
//                       <div>
//                         <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                           {t("tp_courier_note")}
//                         </p>
//                         <p className="p-2 text-xs italic text-gray-500 border rounded bg-gray-50">
//                           "{trackingData.destination.note}"
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="p-6 text-xs italic text-center text-gray-400 bg-white md:p-8">
//                   {t("tp_waiting_location")}
//                 </div>
//               )}
//             </div>

//             {/* ORDER ITEMS SUMMARY */}
//             {orderData.details && orderData.details.length > 0 && (
//               <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
//                 <div className="p-4 border-b border-gray-100 bg-gray-50">
//                   <h3 className="ml-2 text-xs font-bold tracking-widest text-gray-500 uppercase">
//                     {t("tp_item_summary")}
//                   </h3>
//                 </div>

//                 <div className="p-6">
//                   <div className="mb-6 space-y-4">
//                     {orderData.details.map((detail: any) => (
//                       <div
//                         key={detail.id}
//                         className="flex items-center gap-4 pb-4 border-b border-gray-50 last:border-0"
//                       >
//                         <img
//                           src={detail.product.image_url}
//                           className="object-cover w-16 h-16 bg-gray-100 border border-gray-100 rounded-lg"
//                         />
//                         <div className="flex-grow">
//                           <h4 className="text-sm font-bold text-gray-900 uppercase">
//                             {detail.product.name}
//                           </h4>

//                           {/* 👇 BADGE GROSIR 👇 */}
//                           {isWholesaleOrder && (
//                             <span className="px-1.5 py-0.5 mt-1 mb-1 text-[8px] font-bold text-white bg-blue-600 rounded w-max inline-block">
//                                 GROSIR
//                             </span>
//                           )}

//                           {detail.color && (
//                             <div className="flex items-center gap-1.5 mt-1">
//                               <div
//                                 className="w-3 h-3 border border-gray-300 rounded-full shadow-sm"
//                                 style={{ backgroundColor: detail.color }}
//                                 title={t("tp_variant_title")}
//                               ></div>
//                             </div>
//                           )}
//                           <p className="mt-1 text-xs text-gray-400">
//                             {detail.quantity} x {formatCurrencyDisplay(convertIDRtoActiveCurrency(detail.price))}
//                           </p>
//                         </div>
//                         <p className="text-sm font-bold text-gray-900">
//                           {formatCurrencyDisplay(convertIDRtoActiveCurrency(detail.quantity * detail.price))}
//                         </p>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="pt-4 space-y-2 border-t border-gray-100">
//                     <div className="flex justify-between text-xs text-gray-500">
//                       <span>{t("tp_subtotal")}</span>
//                       <span>{formatCurrencyDisplay(convertIDRtoActiveCurrency(getSubtotal(orderData)))}</span>
//                     </div>
//                     <div className="flex justify-between text-xs text-gray-500">
//                       <span>{t("tp_shipping_cost")}</span>
//                       <span>{formatCurrencyDisplay(convertIDRtoActiveCurrency(orderData.shipping_cost))}</span>
//                     </div>

//                     {orderData.promo_discount > 0 && (
//                       <div className="flex justify-between text-xs font-medium text-emerald-600">
//                         <span>
//                           {t("tp_promo_label")} (
//                           <span className="font-mono uppercase">
//                             {orderData.promo_code}
//                           </span>
//                           )
//                         </span>
//                         <span>- {formatCurrencyDisplay(convertIDRtoActiveCurrency(orderData.promo_discount))}</span>
//                       </div>
//                     )}

//                     {orderData.points_used > 0 && (
//                       <div className="flex justify-between text-xs font-medium text-yellow-600">
//                         <span>
//                           {t("tp_points_redeemed")} ({orderData.points_used} {t("tp_points_unit")})
//                         </span>
//                         <span>
//                           - {formatCurrencyDisplay(convertIDRtoActiveCurrency(orderData.points_used * 1000))}
//                         </span>
//                       </div>
//                     )}

//                     <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200 border-dashed">
//                       <span className="font-bold text-[10px] uppercase tracking-widest text-black">
//                         {t("tp_grand_total")}
//                       </span>
//                       <span className="text-xl font-black text-gycora">
//                         {formatCurrencyDisplay(convertIDRtoActiveCurrency(getGrandTotal(orderData)))}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* LOYALTY REWARD */}
//                 {userData?.is_membership &&
//                 orderData.point > 0 &&
//                 orderData.status === "completed" ? (
//                   <div className="flex items-center justify-between p-4 m-6 border rounded-xl bg-gradient-to-r from-emerald-50 to-white border-emerald-100">
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-10 h-10 text-white rounded-full shadow-sm bg-emerald-500">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       </div>
//                       <div>
//                         <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">
//                           {t("tp_loyalty_reward")}
//                         </p>
//                         <p className="text-xs mt-0.5 text-gray-500">
//                           {t("tp_points_earned")}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <span className="text-2xl font-black text-emerald-600">
//                         +{orderData.point}
//                       </span>
//                       <span className="ml-1 text-xs font-bold text-emerald-800">
//                         {t("tp_points_unit")}
//                       </span>
//                     </div>
//                   </div>
//                 ) : null}
//               </div>
//             )}

//             {/* TRACKING TIMELINE */}
//             <div className="p-6 bg-white border border-gray-100 shadow-sm md:p-8 rounded-3xl">
//               <h3 className="pb-4 mb-6 text-sm font-bold tracking-widest uppercase border-b border-gray-100">
//                 {t("tp_timeline_title")}
//               </h3>

//               <div className="relative ml-3 space-y-8 border-l-2 border-gray-100">
//                 {timelineHistory.map((history: any, index: number) => (
//                   <div key={index} className="relative pl-8">
//                     <span
//                       className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all ${
//                         index === 0
//                           ? "bg-gycora ring-4 ring-emerald-50"
//                           : "bg-gray-300"
//                       }`}
//                     ></span>

//                     <div className={index === 0 ? "opacity-100" : "opacity-50"}>
//                       <p className="mb-1 text-sm font-bold tracking-wide text-gray-900 uppercase">
//                         {formatStatusTitle(history.status)}
//                       </p>
//                       <p className="mb-2 text-xs text-gray-600">
//                         {history.note}
//                       </p>
//                       <p className="font-mono text-[10px] font-medium text-gray-400">
//                         {formatDate(history.updated_at)}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )
//       )}
//     </div>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { BASE_URL } from "../../config/api";
// import { useCurrency } from "../../context/CurrencyContext";
// import { useLanguage } from "../../context/LanguageContext";

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

// export default function TrackingPage() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { t, lang } = useLanguage();

//   // 👇 [PERBAIKAN] Tarik state currency dan exchangeRates (hapus formatPrice lama)
//   const { currency, exchangeRates } = useCurrency() as any;

//   // --- STATE ---
//   const [userData, setUserData] = useState<any>(null);
//   const [orderData, setOrderData] = useState<any>(null);
//   const [trackingData, setTrackingData] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Ambil state 'paymentMethod' yang dilempar dari OrderPage jika ada
//   const paymentMethodInfo = location.state?.paymentMethod || "";

//   // =========================================================
//   // LOGIKA PREFIX URL PINTAR
//   // =========================================================
//   const getUrlPrefix = () => {
//     if (location.pathname.startsWith("/id")) return "/id";
//     if (location.pathname.startsWith("/en")) return "/en";
//     return "";
//   };
//   const urlPrefix = getUrlPrefix();

//   // --- LIFECYCLE ---
//   useEffect(() => {
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) setUserData(JSON.parse(userStr));

//     const fetchAllData = async () => {
//       setIsLoading(true);
//       setError(null);

//       const token = localStorage.getItem("user_token");
//       if (!token) {
//         navigate(`${urlPrefix}/login`);
//         return;
//       }

//       try {
//         // 1. Ambil detail pesanan utama
//         const orderRes = await fetch(`${BASE_URL}/api/transactions/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         });
//         if (!orderRes.ok) throw new Error(t("tp_err_fetch_order"));

//         const rawOrderData = await orderRes.json();
//         setOrderData(rawOrderData.data ? rawOrderData.data : rawOrderData);

//         // 2. Ambil data tracking dari Biteship API melalui Laravel
//         try {
//           const trackRes = await fetch(
//             `${BASE_URL}/api/transactions/${id}/tracking`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 Accept: "application/json",
//               },
//             },
//           );
//           if (trackRes.ok) {
//             const rawTrackData = await trackRes.json();
//             setTrackingData(
//               rawTrackData.data ? rawTrackData.data : rawTrackData,
//             );
//           }
//         } catch (trackErr) {
//           console.warn(
//             "Data pelacakan belum tersedia dari pihak ekspedisi.",
//             trackErr,
//           );
//         }
//       } catch (err: any) {
//         setError(err.message || t("tp_err_system"));
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (id) fetchAllData();
//   }, [id, navigate, t, urlPrefix]);

//   // --- COMPUTED & LOGIC ---
//   const activePaymentMethod = useMemo(() => {
//     if (orderData?.payment_method) return orderData.payment_method;
//     if (paymentMethodInfo) return paymentMethodInfo;
//     return null;
//   }, [orderData, paymentMethodInfo]);

//   const timelineHistory = useMemo(() => {
//     const apiHistory = trackingData?.courier?.history || [];
//     if (apiHistory.length > 0) {
//       // Biteship mengembalikan array kronologis, kita reverse agar yang terbaru di atas
//       return [...apiHistory].reverse();
//     }

//     // Fallback jika array history kosong tapi status sudah ada
//     return [
//       {
//         status:
//           trackingData?.status || orderData?.status || t("tp_stat_processing"),
//         note: getNoteFromStatus(trackingData?.status || orderData?.status),
//         updated_at:
//           trackingData?.delivery?.datetime ||
//           orderData?.created_at ||
//           new Date().toISOString(),
//       },
//     ];
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [trackingData, orderData, t]);

//   // ============================================================================
//   // 👇 [PERBAIKAN] HELPER HARGA MULTI-CURRENCY DENGAN AUTO-FALLBACK 👇
//   // ============================================================================
//   const convertIDRtoActiveCurrency = (idrAmount: number) => {
//     const curr = (currency as Currency) || "IDR";
//     if (curr === "IDR" || !exchangeRates || !exchangeRates[curr])
//       return { value: idrAmount, curr: "IDR" };
//     return { value: idrAmount * exchangeRates[curr], curr: curr };
//   };

//   const formatCurrencyDisplay = (
//     priceObj: { value: number; curr: string } | null,
//   ) => {
//     if (!priceObj) return "";
//     const symbols: any = {
//       USD: "$",
//       SGD: "S$",
//       EUR: "€",
//       AUD: "A$",
//       MYR: "RM",
//       IDR: "Rp ",
//     };
//     const formatter = new Intl.NumberFormat(
//       priceObj.curr === "IDR" ? "id-ID" : "en-US",
//       {
//         minimumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//         maximumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//       },
//     );
//     return `${symbols[priceObj.curr] || priceObj.curr + " "}${formatter.format(priceObj.value)}`;
//   };
//   // ============================================================================

//   // --- HELPERS ---
//   const getSubtotal = (order: any) => order.total_amount;

//   const getOrderQuantity = (order: any) =>
//     order.details.reduce((sum: number, item: any) => sum + item.quantity, 0);

//   const getGrandTotal = (order: any) => {
//     if (!order) return 0;
//     const total = parseFloat(order.total_amount || 0);
//     const shipping = parseFloat(order.shipping_cost || 0);
//     const promo = parseFloat(order.promo_discount || 0);
//     const pointsDiscount = (order.points_used || 0) * 1000;
//     return total + shipping - promo - pointsDiscount;
//   };

//   const getCourierLogo = (company: string) => {
//     if (!company) return null;
//     const map: Record<string, string> = {
//       jne: "jne.png",
//       sicepat: "sicepat.png",
//       jnt: "jnt.png",
//       anteraja: "anteraja.png",
//       gojek: "gojek.png",
//       grab: "grab.png",
//       paxel: "paxel.png",
//       ninja: "ninja.png",
//     };
//     return map[company.toLowerCase()]
//       ? "/courier_images/" + map[company.toLowerCase()]
//       : null;
//   };

//   const getPaymentLogo = (methodString: string) => {
//     if (!methodString) return null;
//     const channel = methodString.split(" ")[1]?.toLowerCase();
//     const map: Record<string, string> = {
//       bca: "bca.png",
//       bni: "bni.png",
//       bri: "bri.png",
//       mandiri: "mandiri.png",
//       bsi: "bsi.png",
//       permata: "permata.png",
//       ovo: "ovo.png",
//       dana: "dana.png",
//       linkaja: "linkaja.png",
//       shopeepay: "shopeepay.png",
//       alfamart: "alfamart.png",
//       indomaret: "indomaret.png",
//       qris: "qris.png",
//     };
//     return map[channel] ? "/payment_images/" + map[channel] : null;
//   };

//   const formatStatusTitle = (status: string) => {
//     if (!status) return t("tp_stat_processing");
//     const formatted = status.replace(/_/g, " ");
//     return formatted.charAt(0).toUpperCase() + formatted.slice(1);
//   };

//   const formatDate = (dateString: string) => {
//     if (!dateString) return "-";
//     return new Date(dateString).toLocaleDateString(
//       lang === "id" ? "id-ID" : "en-US",
//       {
//         weekday: "long",
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       },
//     );
//   };

//   function getNoteFromStatus(status: string) {
//     const map: Record<string, string> = {
//       pending: t("tp_note_pending"),
//       placed: t("tp_note_placed"),
//       allocated: t("tp_note_allocated"),
//       picking_up: t("tp_note_picking_up"),
//       picked: t("tp_note_picked"),
//       dropping_off: t("tp_note_dropping_off"),
//       delivered: t("tp_note_delivered"),
//       rejected: t("tp_note_rejected"),
//       cancelled: t("tp_note_cancelled"),
//     };
//     return map[status] || t("tp_note_default");
//   }

//   // 👇 [LOGIKA GROSIR] 👇
//   const orderTotalQty = orderData ? getOrderQuantity(orderData) : 0;
//   const isWholesaleOrder =
//     userData?.usertype === "reseller" && orderTotalQty >= 24;

//   // --- RENDER ---
//   return (
//     <div className="w-full min-h-screen px-6 py-20 font-sans md:px-12 lg:px-20 animate-fade-in">
//       {/* HEADER */}
//       <div className="flex flex-col gap-4 mb-8 md:flex-row md:justify-between md:items-center">
//         <div>
//           <button
//             onClick={() => navigate(`${urlPrefix}/orders`)}
//             className="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest text-gray-500 uppercase transition hover:text-gray-900"
//           >
//             <span>&larr;</span> {t("tp_back_to_orders")}
//           </button>
//           <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 uppercase md:text-4xl">
//             {t("tp_title")}
//           </h1>
//         </div>
//       </div>

//       {/* STATE: LOADING */}
//       {isLoading ? (
//         <div className="flex flex-col items-center justify-center py-20">
//           <div className="w-10 h-10 border-4 border-gray-100 rounded-full border-t-gycora animate-spin"></div>
//           <p className="mt-4 text-xs font-bold tracking-widest text-gray-400 uppercase animate-pulse">
//             {t("tp_loading_details")}
//           </p>
//         </div>
//       ) : /* STATE: ERROR */
//       error ? (
//         <div className="p-8 text-center border border-red-100 bg-red-50 rounded-2xl">
//           <p className="font-bold text-red-600">{error}</p>
//         </div>
//       ) : (
//         /* STATE: SUCCESS */
//         orderData && (
//           <div className="space-y-6 animate-fade-in">
//             {/* TRACKING CARD TOP */}
//             <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
//               <div className="flex flex-col items-start justify-between gap-6 p-6 border-b border-gray-100 bg-gray-50 md:p-8 md:flex-row md:items-center">
//                 <div>
//                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
//                     {t("tp_waybill_title")}
//                   </p>
//                   <p className="font-mono text-xl font-bold text-black">
//                     {trackingData?.courier?.waybill_id ||
//                       orderData.tracking_number ||
//                       t("tp_waiting_waybill")}
//                   </p>
//                   <div className="flex flex-wrap items-center gap-3 mt-3">
//                     <span className="bg-gray-900 text-white px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest">
//                       {formatStatusTitle(
//                         trackingData?.status || orderData.status,
//                       )}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-center w-full gap-6 md:w-auto">
//                   {/* PAYMENT INFO */}
//                   {activePaymentMethod && (
//                     <div className="flex flex-col items-start md:items-end">
//                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
//                         {t("tp_payment_title")}
//                       </p>
//                       <div className="flex items-center gap-3">
//                         <div className="flex items-center justify-center w-10 h-6 overflow-hidden bg-white border border-gray-200 rounded shrink-0">
//                           {getPaymentLogo(activePaymentMethod) ? (
//                             <img
//                               src={getPaymentLogo(activePaymentMethod)!}
//                               className="object-contain w-full h-full p-0.5"
//                             />
//                           ) : (
//                             <span className="font-black text-gray-300 text-[8px]">
//                               {activePaymentMethod.split(" ")[1] || "PAY"}
//                             </span>
//                           )}
//                         </div>
//                         <p className="text-xs font-bold uppercase text-gycora">
//                           {activePaymentMethod.replace("_", " ")}
//                         </p>
//                       </div>
//                     </div>
//                   )}

//                   <div className="hidden w-px h-8 bg-gray-200 md:block"></div>

//                   {/* COURIER INFO */}
//                   <div className="flex flex-col items-start md:items-end">
//                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
//                       {t("tp_courier_title")}
//                     </p>
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-8 h-8 overflow-hidden bg-white border border-gray-200 rounded-lg shrink-0">
//                         {getCourierLogo(
//                           trackingData?.courier?.company ||
//                             orderData.courier_company,
//                         ) ? (
//                           <img
//                             src={
//                               getCourierLogo(
//                                 trackingData?.courier?.company ||
//                                   orderData.courier_company,
//                               )!
//                             }
//                             className="object-contain w-full h-full p-1"
//                           />
//                         ) : (
//                           <span className="font-black text-gray-300 text-[8px]">
//                             {trackingData?.courier?.company?.toUpperCase() ||
//                               orderData.courier_company?.toUpperCase() ||
//                               t("tp_courier_na")}
//                           </span>
//                         )}
//                       </div>
//                       <div className="text-left md:text-right">
//                         <p className="text-xs font-bold text-gray-800 uppercase">
//                           {trackingData?.courier?.company ||
//                             orderData.courier_company}
//                         </p>
//                         <p className="text-[10px] text-gray-500 font-bold uppercase mt-0.5">
//                           {trackingData?.courier?.type ||
//                             orderData.courier_type}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* ADDRESS DETAILS */}
//               {trackingData ? (
//                 <div className="grid grid-cols-1 gap-8 p-6 text-sm bg-white md:p-8 md:grid-cols-2">
//                   {/* ORIGIN */}
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
//                       <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
//                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
//                         {t("tp_origin_title")}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_sender_name")}
//                       </p>
//                       <p className="font-bold text-gray-900">
//                         {trackingData.origin?.contact_name || "Gycora Store"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_sender_phone")}
//                       </p>
//                       <p className="font-mono text-xs text-gray-700">
//                         {trackingData.origin?.contact_phone || "-"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_sender_address")}
//                       </p>
//                       <p className="text-xs leading-relaxed text-gray-600">
//                         {trackingData.origin?.address || "-"}
//                         <br />
//                         {trackingData.origin?.postal_code && (
//                           <span className="font-bold">
//                             {t("tp_postal_code")}:{" "}
//                             {trackingData.origin.postal_code}
//                           </span>
//                         )}
//                       </p>
//                     </div>
//                   </div>

//                   {/* DESTINATION */}
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
//                       <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
//                       <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">
//                         {t("tp_dest_title")}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_receiver_name")}
//                       </p>
//                       <p className="font-bold text-gray-900">
//                         {trackingData.destination?.contact_name || "-"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_receiver_phone")}
//                       </p>
//                       <p className="font-mono text-xs text-gray-700">
//                         {trackingData.destination?.contact_phone || "-"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_receiver_address")}
//                       </p>
//                       <p className="text-xs leading-relaxed text-gray-600">
//                         {trackingData.destination?.address || "-"}
//                         <br />
//                         {trackingData.destination?.postal_code && (
//                           <span className="font-bold">
//                             {t("tp_postal_code")}:{" "}
//                             {trackingData.destination.postal_code}
//                           </span>
//                         )}
//                       </p>
//                     </div>
//                     {trackingData.destination?.note && (
//                       <div>
//                         <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                           {t("tp_courier_note")}
//                         </p>
//                         <p className="p-2 text-xs italic text-gray-500 border rounded bg-gray-50">
//                           "{trackingData.destination.note}"
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="p-6 text-xs italic text-center text-gray-400 bg-white md:p-8">
//                   {t("tp_waiting_location")}
//                 </div>
//               )}
//             </div>

//             {/* ORDER ITEMS SUMMARY */}
//             {orderData.details && orderData.details.length > 0 && (
//               <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
//                 <div className="p-4 border-b border-gray-100 bg-gray-50">
//                   <h3 className="ml-2 text-xs font-bold tracking-widest text-gray-500 uppercase">
//                     {t("tp_item_summary")}
//                   </h3>
//                 </div>

//                 <div className="p-6">
//                   <div className="mb-6 space-y-4">
//                     {orderData.details.map((detail: any) => (
//                       <div
//                         key={detail.id}
//                         className="flex items-center gap-4 pb-4 border-b border-gray-50 last:border-0"
//                       >
//                         <img
//                           src={detail.product.image_url}
//                           className="object-cover w-16 h-16 bg-gray-100 border border-gray-100 rounded-lg"
//                         />
//                         <div className="flex-grow">
//                           <h4 className="text-sm font-bold text-gray-900 uppercase">
//                             {detail.product.name}
//                           </h4>

//                           {/* 👇 BADGE HARGA MULTI-LOGIC 👇 */}
//                           <div className="flex flex-wrap gap-1 mt-1 mb-1">
//                             {/* {detail.is_bundle ? (
//                               <span className="px-1.5 py-0.5 text-[8px] font-bold text-white bg-purple-600 rounded w-max inline-block">
//                                 BUNDLE
//                               </span>
//                             ) : isWholesaleOrder ? ( */}
//                             {detail.product?.is_bundle_active ? (
//                               <span
//                                 className="px-1.5 py-0.5 text-[8px] font-bold text-white bg-purple-600 rounded w-max inline-block"
//                                 title="Harga Promo Paket"
//                               >
//                                 BUNDLE
//                               </span>
//                             ) : isWholesaleOrder ? (
//                               <span className="px-1.5 py-0.5 text-[8px] font-bold text-white bg-blue-600 rounded w-max inline-block">
//                                 GROSIR
//                               </span>
//                             ) : null}
//                           </div>

//                           {detail.color && (
//                             <div className="flex items-center gap-1.5 mt-1">
//                               <div
//                                 className="w-3 h-3 border border-gray-300 rounded-full shadow-sm"
//                                 style={{ backgroundColor: detail.color }}
//                                 title={t("tp_variant_title")}
//                               ></div>
//                             </div>
//                           )}
//                           <p className="mt-1 text-xs text-gray-400">
//                             {detail.quantity} x{" "}
//                             {formatCurrencyDisplay(
//                               convertIDRtoActiveCurrency(detail.price),
//                             )}
//                           </p>
//                         </div>
//                         <p className="text-sm font-bold text-gray-900">
//                           {formatCurrencyDisplay(
//                             convertIDRtoActiveCurrency(
//                               detail.quantity * detail.price,
//                             ),
//                           )}
//                         </p>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="pt-4 space-y-2 border-t border-gray-100">
//                     <div className="flex justify-between text-xs text-gray-500">
//                       <span>{t("tp_subtotal")}</span>
//                       <span>
//                         {formatCurrencyDisplay(
//                           convertIDRtoActiveCurrency(getSubtotal(orderData)),
//                         )}
//                       </span>
//                     </div>
//                     <div className="flex justify-between text-xs text-gray-500">
//                       <span>{t("tp_shipping_cost")}</span>
//                       <span>
//                         {formatCurrencyDisplay(
//                           convertIDRtoActiveCurrency(orderData.shipping_cost),
//                         )}
//                       </span>
//                     </div>

//                     {orderData.promo_discount > 0 && (
//                       <div className="flex justify-between text-xs font-medium text-emerald-600">
//                         <span>
//                           {t("tp_promo_label")} (
//                           <span className="font-mono uppercase">
//                             {orderData.promo_code}
//                           </span>
//                           )
//                         </span>
//                         <span>
//                           -{" "}
//                           {formatCurrencyDisplay(
//                             convertIDRtoActiveCurrency(
//                               orderData.promo_discount,
//                             ),
//                           )}
//                         </span>
//                       </div>
//                     )}

//                     {orderData.points_used > 0 && (
//                       <div className="flex justify-between text-xs font-medium text-yellow-600">
//                         <span>
//                           {t("tp_points_redeemed")} ({orderData.points_used}{" "}
//                           {t("tp_points_unit")})
//                         </span>
//                         <span>
//                           -{" "}
//                           {formatCurrencyDisplay(
//                             convertIDRtoActiveCurrency(
//                               orderData.points_used * 1000,
//                             ),
//                           )}
//                         </span>
//                       </div>
//                     )}

//                     <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200 border-dashed">
//                       <span className="font-bold text-[10px] uppercase tracking-widest text-black">
//                         {t("tp_grand_total")}
//                       </span>
//                       <span className="text-xl font-black text-gycora">
//                         {formatCurrencyDisplay(
//                           convertIDRtoActiveCurrency(getGrandTotal(orderData)),
//                         )}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* LOYALTY REWARD */}
//                 {userData?.is_membership &&
//                 orderData.point > 0 &&
//                 orderData.status === "completed" ? (
//                   <div className="flex items-center justify-between p-4 m-6 border rounded-xl bg-gradient-to-r from-emerald-50 to-white border-emerald-100">
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-10 h-10 text-white rounded-full shadow-sm bg-emerald-500">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       </div>
//                       <div>
//                         <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">
//                           {t("tp_loyalty_reward")}
//                         </p>
//                         <p className="text-xs mt-0.5 text-gray-500">
//                           {t("tp_points_earned")}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <span className="text-2xl font-black text-emerald-600">
//                         +{orderData.point}
//                       </span>
//                       <span className="ml-1 text-xs font-bold text-emerald-800">
//                         {t("tp_points_unit")}
//                       </span>
//                     </div>
//                   </div>
//                 ) : null}
//               </div>
//             )}

//             {/* TRACKING TIMELINE */}
//             <div className="p-6 bg-white border border-gray-100 shadow-sm md:p-8 rounded-3xl">
//               <h3 className="pb-4 mb-6 text-sm font-bold tracking-widest uppercase border-b border-gray-100">
//                 {t("tp_timeline_title")}
//               </h3>

//               <div className="relative ml-3 space-y-8 border-l-2 border-gray-100">
//                 {timelineHistory.map((history: any, index: number) => (
//                   <div key={index} className="relative pl-8">
//                     <span
//                       className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all ${
//                         index === 0
//                           ? "bg-gycora ring-4 ring-emerald-50"
//                           : "bg-gray-300"
//                       }`}
//                     ></span>

//                     <div className={index === 0 ? "opacity-100" : "opacity-50"}>
//                       <p className="mb-1 text-sm font-bold tracking-wide text-gray-900 uppercase">
//                         {formatStatusTitle(history.status)}
//                       </p>
//                       <p className="mb-2 text-xs text-gray-600">
//                         {history.note}
//                       </p>
//                       <p className="font-mono text-[10px] font-medium text-gray-400">
//                         {formatDate(history.updated_at)}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )
//       )}
//     </div>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useMemo, useCallback } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { BASE_URL } from "../../config/api";
// import { useCurrency } from "../../context/CurrencyContext";
// import { useLanguage } from "../../context/LanguageContext";

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

// export default function TrackingPage() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { t, lang } = useLanguage();

//   const { currency, exchangeRates } = useCurrency() as any;

//   // --- STATE ---
//   const [userData, setUserData] = useState<any>(null);
//   const [orderData, setOrderData] = useState<any>(null);
//   const [trackingData, setTrackingData] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const paymentMethodInfo = location.state?.paymentMethod || "";

//   const getUrlPrefix = () => {
//     if (location.pathname.startsWith("/id")) return "/id";
//     if (location.pathname.startsWith("/en")) return "/en";
//     return "";
//   };
//   const urlPrefix = getUrlPrefix();

//   useEffect(() => {
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) setUserData(JSON.parse(userStr));

//     const fetchAllData = async () => {
//       setIsLoading(true);
//       setError(null);

//       const token = localStorage.getItem("user_token");
//       if (!token) {
//         navigate(`${urlPrefix}/login`);
//         return;
//       }

//       try {
//         const orderRes = await fetch(`${BASE_URL}/api/transactions/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         });
//         if (!orderRes.ok) throw new Error(t("tp_err_fetch_order"));

//         const rawOrderData = await orderRes.json();
//         setOrderData(rawOrderData.data ? rawOrderData.data : rawOrderData);

//         try {
//           const trackRes = await fetch(
//             `${BASE_URL}/api/transactions/${id}/tracking`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 Accept: "application/json",
//               },
//             },
//           );
//           if (trackRes.ok) {
//             const rawTrackData = await trackRes.json();
//             setTrackingData(
//               rawTrackData.data ? rawTrackData.data : rawTrackData,
//             );
//           }
//         } catch (trackErr) {
//           console.warn("Data pelacakan belum tersedia dari pihak ekspedisi.", trackErr);
//         }
//       } catch (err: any) {
//         setError(err.message || t("tp_err_system"));
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (id) fetchAllData();
//   }, [id, navigate, t, urlPrefix]);

//   const activePaymentMethod = useMemo(() => {
//     if (orderData?.payment_method) return orderData.payment_method;
//     if (paymentMethodInfo) return paymentMethodInfo;
//     return null;
//   }, [orderData, paymentMethodInfo]);

//   const timelineHistory = useMemo(() => {
//     const apiHistory = trackingData?.courier?.history || [];
//     if (apiHistory.length > 0) {
//       return [...apiHistory].reverse();
//     }

//     return [
//       {
//         status: trackingData?.status || orderData?.status || t("tp_stat_processing"),
//         note: getNoteFromStatus(trackingData?.status || orderData?.status),
//         updated_at:
//           trackingData?.delivery?.datetime ||
//           orderData?.created_at ||
//           new Date().toISOString(),
//       },
//     ];
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [trackingData, orderData, t]);

//   const convertIDRtoActiveCurrency = useCallback((idrAmount: number) => {
//     const curr = (currency as Currency) || "IDR";
//     if (curr === "IDR" || !exchangeRates || !exchangeRates[curr])
//       return { value: idrAmount, curr: "IDR" };
//     return { value: idrAmount * exchangeRates[curr], curr: curr };
//   }, [currency, exchangeRates]);

//   const formatCurrencyDisplay = useCallback((priceObj: { value: number; curr: string } | null) => {
//     if (!priceObj) return "";
//     const symbols: any = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
//     const formatter = new Intl.NumberFormat(
//       priceObj.curr === "IDR" ? "id-ID" : "en-US",
//       {
//         minimumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//         maximumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//       },
//     );
//     return `${symbols[priceObj.curr] || priceObj.curr + " "}${formatter.format(priceObj.value)}`;
//   }, []);

//   const getSubtotal = (order: any) => order.total_amount;

//   const getOrderQuantity = (order: any) =>
//     order.details.reduce((sum: number, item: any) => sum + item.quantity, 0);

//   const getGrandTotal = (order: any) => {
//     if (!order) return 0;
//     const total = parseFloat(order.total_amount || 0);
//     const shipping = parseFloat(order.shipping_cost || 0);
//     const promo = parseFloat(order.promo_discount || 0);
//     const pointsDiscount = (order.points_used || 0) * 1000;
//     return total + shipping - promo - pointsDiscount;
//   };

//   // ============================================================================
//   // 👇 LOGIKA FORENSIK HARGA HISTORY (SAMA SEPERTI DI ORDERPAGE) 👇
//   // ============================================================================
//   const checkIsBundledInHistory = useCallback((detail: any, order: any, userType: string) => {
//     const prod = detail.product;
//     if (!prod) return false;

//     const paidPrice = Number(detail.price);
//     const normalPrice = Number(prod.price) || 0;
//     const discPrice = Number(prod.discount_price) || 0;
//     const wholesalePrice = Number(prod.wholesale_price) || 0;
//     const voucherPrice = Number(prod.voucher_discount_price) || 0;

//     const orderTotalQty = getOrderQuantity(order);
//     const isWholesaleOrder = userType === "reseller" && orderTotalQty >= 24;

//     if (paidPrice >= normalPrice) return false;
//     if (discPrice > 0 && paidPrice === discPrice) return false;
//     if (isWholesaleOrder && wholesalePrice > 0 && paidPrice === wholesalePrice) return false;
//     if (voucherPrice > 0 && paidPrice === voucherPrice) return false;

//     const hasValidBundleTime = order.details.some((d: any) => {
//       const p = d.product;
//       if (!p) return false;
//       const isBundleFlag = String(p.is_bundle_active).toLowerCase() === "true" || p.is_bundle_active == 1;
//       if (!isBundleFlag) return false;
      
//       if (!p.bundle_end_date || p.bundle_end_date === "0000-00-00 00:00:00") return true;
      
//       const orderDate = new Date(order.created_at).getTime();
//       const endDate = new Date(p.bundle_end_date.replace(" ", "T")).getTime();
//       return orderDate <= endDate;
//     });

//     return hasValidBundleTime;
//   }, []);
//   // ============================================================================

//   const getCourierLogo = (company: string) => {
//     if (!company) return null;
//     const map: Record<string, string> = {
//       jne: "jne.png", sicepat: "sicepat.png", jnt: "jnt.png",
//       anteraja: "anteraja.png", gojek: "gojek.png", grab: "grab.png",
//       paxel: "paxel.png", ninja: "ninja.png",
//     };
//     return map[company.toLowerCase()] ? "/courier_images/" + map[company.toLowerCase()] : null;
//   };

//   const getPaymentLogo = (methodString: string) => {
//     if (!methodString) return null;
//     const channel = methodString.split(" ")[1]?.toLowerCase();
//     const map: Record<string, string> = {
//       bca: "bca.png", bni: "bni.png", bri: "bri.png", mandiri: "mandiri.png",
//       bsi: "bsi.png", permata: "permata.png", ovo: "ovo.png", dana: "dana.png",
//       linkaja: "linkaja.png", shopeepay: "shopeepay.png", alfamart: "alfamart.png",
//       indomaret: "indomaret.png", qris: "qris.png",
//     };
//     return map[channel] ? "/payment_images/" + map[channel] : null;
//   };

//   const formatStatusTitle = (status: string) => {
//     if (!status) return t("tp_stat_processing");
//     const formatted = status.replace(/_/g, " ");
//     return formatted.charAt(0).toUpperCase() + formatted.slice(1);
//   };

//   const formatDate = (dateString: string) => {
//     if (!dateString) return "-";
//     return new Date(dateString).toLocaleDateString(
//       lang === "id" ? "id-ID" : "en-US",
//       {
//         weekday: "long", year: "numeric", month: "short",
//         day: "numeric", hour: "2-digit", minute: "2-digit",
//       },
//     );
//   };

//   function getNoteFromStatus(status: string) {
//     const map: Record<string, string> = {
//       pending: t("tp_note_pending"), placed: t("tp_note_placed"),
//       allocated: t("tp_note_allocated"), picking_up: t("tp_note_picking_up"),
//       picked: t("tp_note_picked"), dropping_off: t("tp_note_dropping_off"),
//       delivered: t("tp_note_delivered"), rejected: t("tp_note_rejected"),
//       cancelled: t("tp_note_cancelled"),
//     };
//     return map[status] || t("tp_note_default");
//   }

//   const orderTotalQty = orderData ? getOrderQuantity(orderData) : 0;
//   const isWholesaleOrder = userData?.usertype === "reseller" && orderTotalQty >= 24;

//   return (
//     <div className="w-full min-h-screen px-6 py-20 font-sans md:px-12 lg:px-20 animate-fade-in">
//       <div className="flex flex-col gap-4 mb-8 md:flex-row md:justify-between md:items-center">
//         <div>
//           <button
//             onClick={() => navigate(`${urlPrefix}/orders`)}
//             className="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest text-gray-500 uppercase transition hover:text-gray-900"
//           >
//             <span>&larr;</span> {t("tp_back_to_orders")}
//           </button>
//           <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 uppercase md:text-4xl">
//             {t("tp_title")}
//           </h1>
//         </div>
//       </div>

//       {isLoading ? (
//         <div className="flex flex-col items-center justify-center py-20">
//           <div className="w-10 h-10 border-4 border-gray-100 rounded-full border-t-gycora animate-spin"></div>
//           <p className="mt-4 text-xs font-bold tracking-widest text-gray-400 uppercase animate-pulse">
//             {t("tp_loading_details")}
//           </p>
//         </div>
//       ) : error ? (
//         <div className="p-8 text-center border border-red-100 bg-red-50 rounded-2xl">
//           <p className="font-bold text-red-600">{error}</p>
//         </div>
//       ) : (
//         orderData && (
//           <div className="space-y-6 animate-fade-in">
//             {/* TRACKING CARD TOP */}
//             <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
//               <div className="flex flex-col items-start justify-between gap-6 p-6 border-b border-gray-100 bg-gray-50 md:p-8 md:flex-row md:items-center">
//                 <div>
//                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
//                     {t("tp_waybill_title")}
//                   </p>
//                   <p className="font-mono text-xl font-bold text-black">
//                     {trackingData?.courier?.waybill_id ||
//                       orderData.tracking_number ||
//                       t("tp_waiting_waybill")}
//                   </p>
//                   <div className="flex flex-wrap items-center gap-3 mt-3">
//                     <span className="bg-gray-900 text-white px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest">
//                       {formatStatusTitle(trackingData?.status || orderData.status)}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-center w-full gap-6 md:w-auto">
//                   {/* PAYMENT INFO */}
//                   {activePaymentMethod && (
//                     <div className="flex flex-col items-start md:items-end">
//                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
//                         {t("tp_payment_title")}
//                       </p>
//                       <div className="flex items-center gap-3">
//                         <div className="flex items-center justify-center w-10 h-6 overflow-hidden bg-white border border-gray-200 rounded shrink-0">
//                           {getPaymentLogo(activePaymentMethod) ? (
//                             <img src={getPaymentLogo(activePaymentMethod)!} className="object-contain w-full h-full p-0.5" />
//                           ) : (
//                             <span className="font-black text-gray-300 text-[8px]">{activePaymentMethod.split(" ")[1] || "PAY"}</span>
//                           )}
//                         </div>
//                         <p className="text-xs font-bold uppercase text-gycora">
//                           {activePaymentMethod.replace("_", " ")}
//                         </p>
//                       </div>
//                     </div>
//                   )}

//                   <div className="hidden w-px h-8 bg-gray-200 md:block"></div>

//                   {/* COURIER INFO */}
//                   <div className="flex flex-col items-start md:items-end">
//                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
//                       {t("tp_courier_title")}
//                     </p>
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-8 h-8 overflow-hidden bg-white border border-gray-200 rounded-lg shrink-0">
//                         {getCourierLogo(trackingData?.courier?.company || orderData.courier_company) ? (
//                           <img
//                             src={getCourierLogo(trackingData?.courier?.company || orderData.courier_company)!}
//                             className="object-contain w-full h-full p-1"
//                           />
//                         ) : (
//                           <span className="font-black text-gray-300 text-[8px]">
//                             {trackingData?.courier?.company?.toUpperCase() || orderData.courier_company?.toUpperCase() || t("tp_courier_na")}
//                           </span>
//                         )}
//                       </div>
//                       <div className="text-left md:text-right">
//                         <p className="text-xs font-bold text-gray-800 uppercase">
//                           {trackingData?.courier?.company || orderData.courier_company}
//                         </p>
//                         <p className="text-[10px] text-gray-500 font-bold uppercase mt-0.5">
//                           {trackingData?.courier?.type || orderData.courier_type}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* ADDRESS DETAILS */}
//               {trackingData ? (
//                 <div className="grid grid-cols-1 gap-8 p-6 text-sm bg-white md:p-8 md:grid-cols-2">
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
//                       <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
//                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t("tp_origin_title")}</p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">{t("tp_sender_name")}</p>
//                       <p className="font-bold text-gray-900">{trackingData.origin?.contact_name || "Gycora Store"}</p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">{t("tp_sender_phone")}</p>
//                       <p className="font-mono text-xs text-gray-700">{trackingData.origin?.contact_phone || "-"}</p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">{t("tp_sender_address")}</p>
//                       <p className="text-xs leading-relaxed text-gray-600">
//                         {trackingData.origin?.address || "-"}
//                         <br />
//                         {trackingData.origin?.postal_code && (
//                           <span className="font-bold">{t("tp_postal_code")}: {trackingData.origin.postal_code}</span>
//                         )}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
//                       <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
//                       <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">{t("tp_dest_title")}</p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">{t("tp_receiver_name")}</p>
//                       <p className="font-bold text-gray-900">{trackingData.destination?.contact_name || "-"}</p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">{t("tp_receiver_phone")}</p>
//                       <p className="font-mono text-xs text-gray-700">{trackingData.destination?.contact_phone || "-"}</p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">{t("tp_receiver_address")}</p>
//                       <p className="text-xs leading-relaxed text-gray-600">
//                         {trackingData.destination?.address || "-"}
//                         <br />
//                         {trackingData.destination?.postal_code && (
//                           <span className="font-bold">{t("tp_postal_code")}: {trackingData.destination.postal_code}</span>
//                         )}
//                       </p>
//                     </div>
//                     {trackingData.destination?.note && (
//                       <div>
//                         <p className="text-[10px] text-gray-400 uppercase tracking-widest">{t("tp_courier_note")}</p>
//                         <p className="p-2 text-xs italic text-gray-500 border rounded bg-gray-50">"{trackingData.destination.note}"</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="p-6 text-xs italic text-center text-gray-400 bg-white md:p-8">
//                   {t("tp_waiting_location")}
//                 </div>
//               )}
//             </div>

//             {/* ORDER ITEMS SUMMARY */}
//             {orderData.details && orderData.details.length > 0 && (
//               <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
//                 <div className="p-4 border-b border-gray-100 bg-gray-50">
//                   <h3 className="ml-2 text-xs font-bold tracking-widest text-gray-500 uppercase">{t("tp_item_summary")}</h3>
//                 </div>

//                 <div className="p-6">
//                   <div className="mb-6 space-y-4">
//                     {orderData.details.map((detail: any) => {
//                       // 👇 [BARU] IDENTIFIKASI BADGE TRACKING PAGE 👇
//                       const isHistoricallyBundled = checkIsBundledInHistory(detail, orderData, userData?.usertype);
//                       const isWholesaleItem = isWholesaleOrder && Number(detail.product.wholesale_price) > 0 && Number(detail.price) === Number(detail.product.wholesale_price);
//                       const isDiscountedItem = !isHistoricallyBundled && !isWholesaleItem && Number(detail.price) < Number(detail.product.price);

//                       return (
//                       <div key={detail.id} className="flex items-center gap-4 pb-4 border-b border-gray-50 last:border-0">
//                         <img src={detail.product.image_url} className="object-cover w-16 h-16 bg-gray-100 border border-gray-100 rounded-lg" />
//                         <div className="flex-grow">
//                           <h4 className="text-sm font-bold text-gray-900 uppercase">
//                             {detail.product.name}
//                           </h4>
                          
//                           <div className="flex flex-wrap gap-1 mt-1 mb-1">
//                             {isHistoricallyBundled ? (
//                               <span className="px-1.5 py-0.5 text-[8px] font-bold text-white bg-purple-600 rounded w-max inline-block" title="Harga Promo Paket">
//                                 BUNDLE
//                               </span>
//                             ) : isWholesaleItem ? (
//                               <span className="px-1.5 py-0.5 text-[8px] font-bold text-white bg-blue-600 rounded w-max inline-block">
//                                 GROSIR
//                               </span>
//                             ) : isDiscountedItem ? (
//                               <span className="px-1.5 py-0.5 text-[8px] font-bold text-white bg-rose-500 rounded w-max inline-block">
//                                 SALE
//                               </span>
//                             ) : null}
//                           </div>

//                           {detail.color && (
//                             <div className="flex items-center gap-1.5 mt-1">
//                               <div className="w-3 h-3 border border-gray-300 rounded-full shadow-sm" style={{ backgroundColor: detail.color }} title={t("tp_variant_title")}></div>
//                             </div>
//                           )}
//                           <p className="mt-1 text-xs text-gray-400">
//                             {detail.quantity} x {formatCurrencyDisplay(convertIDRtoActiveCurrency(detail.price))}
//                             {(isHistoricallyBundled || isDiscountedItem) && (
//                               <span className="text-[8px] line-through text-gray-400 ml-1">
//                                 {formatCurrencyDisplay(convertIDRtoActiveCurrency(detail.product.price))}
//                               </span>
//                             )}
//                           </p>
//                         </div>
//                         <p className="text-sm font-bold text-gray-900">
//                           {formatCurrencyDisplay(convertIDRtoActiveCurrency(detail.quantity * detail.price))}
//                         </p>
//                       </div>
//                     )})}
//                   </div>

//                   <div className="pt-4 space-y-2 border-t border-gray-100">
//                     <div className="flex justify-between text-xs text-gray-500">
//                       <span>{t("tp_subtotal")}</span>
//                       <span>{formatCurrencyDisplay(convertIDRtoActiveCurrency(getSubtotal(orderData)))}</span>
//                     </div>
//                     <div className="flex justify-between text-xs text-gray-500">
//                       <span>{t("tp_shipping_cost")}</span>
//                       <span>{formatCurrencyDisplay(convertIDRtoActiveCurrency(orderData.shipping_cost))}</span>
//                     </div>

//                     {orderData.promo_discount > 0 && (
//                       <div className="flex justify-between text-xs font-medium text-emerald-600">
//                         <span>{t("tp_promo_label")} (<span className="font-mono uppercase">{orderData.promo_code}</span>)</span>
//                         <span>- {formatCurrencyDisplay(convertIDRtoActiveCurrency(orderData.promo_discount))}</span>
//                       </div>
//                     )}

//                     {orderData.points_used > 0 && (
//                       <div className="flex justify-between text-xs font-medium text-yellow-600">
//                         <span>{t("tp_points_redeemed")} ({orderData.points_used} {t("tp_points_unit")})</span>
//                         <span>- {formatCurrencyDisplay(convertIDRtoActiveCurrency(orderData.points_used * 1000))}</span>
//                       </div>
//                     )}

//                     <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200 border-dashed">
//                       <span className="font-bold text-[10px] uppercase tracking-widest text-black">{t("tp_grand_total")}</span>
//                       <span className="text-xl font-black text-gycora">{formatCurrencyDisplay(convertIDRtoActiveCurrency(getGrandTotal(orderData)))}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {userData?.is_membership && orderData.point > 0 && orderData.status === "completed" ? (
//                   <div className="flex items-center justify-between p-4 m-6 border rounded-xl bg-gradient-to-r from-emerald-50 to-white border-emerald-100">
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-10 h-10 text-white rounded-full shadow-sm bg-emerald-500">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       </div>
//                       <div>
//                         <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">{t("tp_loyalty_reward")}</p>
//                         <p className="text-xs mt-0.5 text-gray-500">{t("tp_points_earned")}</p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <span className="text-2xl font-black text-emerald-600">+{orderData.point}</span>
//                       <span className="ml-1 text-xs font-bold text-emerald-800">{t("tp_points_unit")}</span>
//                     </div>
//                   </div>
//                 ) : null}
//               </div>
//             )}

//             {/* TRACKING TIMELINE */}
//             <div className="p-6 bg-white border border-gray-100 shadow-sm md:p-8 rounded-3xl">
//               <h3 className="pb-4 mb-6 text-sm font-bold tracking-widest uppercase border-b border-gray-100">
//                 {t("tp_timeline_title")}
//               </h3>

//               <div className="relative ml-3 space-y-8 border-l-2 border-gray-100">
//                 {timelineHistory.map((history: any, index: number) => (
//                   <div key={index} className="relative pl-8">
//                     <span className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all ${index === 0 ? "bg-gycora ring-4 ring-emerald-50" : "bg-gray-300"}`}></span>
//                     <div className={index === 0 ? "opacity-100" : "opacity-50"}>
//                       <p className="mb-1 text-sm font-bold tracking-wide text-gray-900 uppercase">{formatStatusTitle(history.status)}</p>
//                       <p className="mb-2 text-xs text-gray-600">{history.note}</p>
//                       <p className="font-mono text-[10px] font-medium text-gray-400">{formatDate(history.updated_at)}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )
//       )}
//     </div>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useMemo, useCallback } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { BASE_URL } from "../../config/api";
// import { useCurrency } from "../../context/CurrencyContext";
// import { useLanguage } from "../../context/LanguageContext";

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

// export default function TrackingPage() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { t, lang } = useLanguage();

//   const { currency, exchangeRates } = useCurrency() as any;

//   const [userData, setUserData] = useState<any>(null);
//   const [orderData, setOrderData] = useState<any>(null);
//   const [trackingData, setTrackingData] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const paymentMethodInfo = location.state?.paymentMethod || "";

//   const getUrlPrefix = () => {
//     if (location.pathname.startsWith("/id")) return "/id";
//     if (location.pathname.startsWith("/en")) return "/en";
//     return "";
//   };
//   const urlPrefix = getUrlPrefix();

//   useEffect(() => {
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) setUserData(JSON.parse(userStr));

//     const fetchAllData = async () => {
//       setIsLoading(true);
//       setError(null);

//       const token = localStorage.getItem("user_token");
//       if (!token) {
//         navigate(`${urlPrefix}/login`);
//         return;
//       }

//       try {
//         const orderRes = await fetch(`${BASE_URL}/api/transactions/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         });
//         if (!orderRes.ok) throw new Error(t("tp_err_fetch_order"));

//         const rawOrderData = await orderRes.json();
//         setOrderData(rawOrderData.data ? rawOrderData.data : rawOrderData);

//         try {
//           const trackRes = await fetch(`${BASE_URL}/api/transactions/${id}/tracking`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               Accept: "application/json",
//             },
//           });
//           if (trackRes.ok) {
//             const rawTrackData = await trackRes.json();
//             setTrackingData(rawTrackData.data ? rawTrackData.data : rawTrackData);
//           }
//         } catch (trackErr) {
//           console.warn("Data pelacakan belum tersedia dari pihak ekspedisi.", trackErr);
//         }
//       } catch (err: any) {
//         setError(err.message || t("tp_err_system"));
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (id) fetchAllData();
//   }, [id, navigate, t, urlPrefix]);

//   const activePaymentMethod = useMemo(() => {
//     if (orderData?.payment_method) return orderData.payment_method;
//     if (paymentMethodInfo) return paymentMethodInfo;
//     return null;
//   }, [orderData, paymentMethodInfo]);

//   const timelineHistory = useMemo(() => {
//     const apiHistory = trackingData?.courier?.history || [];
//     if (apiHistory.length > 0) {
//       return [...apiHistory].reverse();
//     }

//     return [
//       {
//         status: trackingData?.status || orderData?.status || t("tp_stat_processing"),
//         note: getNoteFromStatus(trackingData?.status || orderData?.status),
//         updated_at:
//           trackingData?.delivery?.datetime ||
//           orderData?.created_at ||
//           new Date().toISOString(),
//       },
//     ];
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [trackingData, orderData, t]);

//   const convertIDRtoActiveCurrency = useCallback((idrAmount: number) => {
//     const curr = (currency as Currency) || "IDR";
//     if (curr === "IDR" || !exchangeRates || !exchangeRates[curr])
//       return { value: idrAmount, curr: "IDR" };
//     return { value: idrAmount * exchangeRates[curr], curr: curr };
//   }, [currency, exchangeRates]);

//   const formatCurrencyDisplay = useCallback((priceObj: { value: number; curr: string } | null) => {
//     if (!priceObj) return "";
//     const symbols: any = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
//     const formatter = new Intl.NumberFormat(
//       priceObj.curr === "IDR" ? "id-ID" : "en-US",
//       {
//         minimumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//         maximumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//       },
//     );
//     return `${symbols[priceObj.curr] || priceObj.curr + " "}${formatter.format(priceObj.value)}`;
//   }, []);

//   const getSubtotal = (order: any) => order.total_amount;
//   const getOrderQuantity = (order: any) => order.details.reduce((sum: number, item: any) => sum + item.quantity, 0);

//   const getGrandTotal = (order: any) => {
//     if (!order) return 0;
//     const total = parseFloat(order.total_amount || 0);
//     const shipping = parseFloat(order.shipping_cost || 0);
//     const promo = parseFloat(order.promo_discount || 0);
//     const pointsDiscount = (order.points_used || 0) * 1000;
//     return total + shipping - promo - pointsDiscount;
//   };

//   // ============================================================================
//   // 👇 LOGIKA FORENSIK HARGA HISTORY (ANTI-BUG) 👇
//   // ============================================================================
//   const checkIsBundledInHistory = useCallback((detail: any, order: any, userType: string) => {
//     const prod = detail.product;
//     if (!prod) return false;

//     // 1. FILTER WAKTU (Mencegah riwayat transaksi lama rusak)
//     const orderDate = new Date(order.created_at).getTime();
//     const featureLaunchDate = new Date("2026-07-20T00:00:00Z").getTime();
//     if (orderDate < featureLaunchDate) return false;

//     // 2. FILTER RENTANG WAKTU BUNDLE
//     let isWithinTimeframe = true;
//     if (prod.bundle_end_date && prod.bundle_end_date !== "0000-00-00 00:00:00") {
//       const endDate = new Date(prod.bundle_end_date.replace(" ", "T")).getTime();
//       isWithinTimeframe = orderDate <= endDate;
//     }
//     if (!isWithinTimeframe) return false;

//     // 3. FILTER KOMPOSISI (Syarat Selang-Seling)
//     const hasDriver = order.details.some((d: any) => {
//       const p = d.product;
//       if (!p) return false;
//       const sku = (p.sku || "").toUpperCase();
//       const isBundleFlag = String(p.is_bundle_active).toLowerCase() === "true" || p.is_bundle_active == 1;
//       return sku.startsWith("EGB") && isBundleFlag;
//     });

//     const hasPartner = order.details.some((d: any) => {
//       const p = d.product;
//       return p && !(p.sku || "").toUpperCase().startsWith("EGB");
//     });

//     if (!hasDriver || !hasPartner) return false;

//     // 4. FILTER FORENSIK HARGA (Double Check)
//     const paidPrice = Number(detail.price);
//     const normalPrice = Number(prod.price) || 0;
//     if (paidPrice >= normalPrice) return false;

//     const sku = (prod.sku || "").toUpperCase();
//     const isEGB = sku.startsWith("EGB");
//     if (isEGB) {
//       const isBundleFlag = String(prod.is_bundle_active).toLowerCase() === "true" || prod.is_bundle_active == 1;
//       return isBundleFlag;
//     }

//     return true; 
//   }, []);
//   // ============================================================================

//   const getCourierLogo = (company: string) => {
//     if (!company) return null;
//     const map: Record<string, string> = {
//       jne: "jne.png", sicepat: "sicepat.png", jnt: "jnt.png",
//       anteraja: "anteraja.png", gojek: "gojek.png", grab: "grab.png",
//       paxel: "paxel.png", ninja: "ninja.png",
//     };
//     return map[company.toLowerCase()] ? "/courier_images/" + map[company.toLowerCase()] : null;
//   };

//   const getPaymentLogo = (methodString: string) => {
//     if (!methodString) return null;
//     const channel = methodString.split(" ")[1]?.toLowerCase();
//     const map: Record<string, string> = {
//       bca: "bca.png", bni: "bni.png", bri: "bri.png", mandiri: "mandiri.png",
//       bsi: "bsi.png", permata: "permata.png", ovo: "ovo.png", dana: "dana.png",
//       linkaja: "linkaja.png", shopeepay: "shopeepay.png", alfamart: "alfamart.png",
//       indomaret: "indomaret.png", qris: "qris.png",
//     };
//     return map[channel] ? "/payment_images/" + map[channel] : null;
//   };

//   const formatStatusTitle = (status: string) => {
//     if (!status) return t("tp_stat_processing");
//     const formatted = status.replace(/_/g, " ");
//     return formatted.charAt(0).toUpperCase() + formatted.slice(1);
//   };

//   const formatDate = (dateString: string) => {
//     if (!dateString) return "-";
//     return new Date(dateString).toLocaleDateString(
//       lang === "id" ? "id-ID" : "en-US",
//       {
//         weekday: "long", year: "numeric", month: "short",
//         day: "numeric", hour: "2-digit", minute: "2-digit",
//       },
//     );
//   };

//   function getNoteFromStatus(status: string) {
//     const map: Record<string, string> = {
//       pending: t("tp_note_pending"), placed: t("tp_note_placed"),
//       allocated: t("tp_note_allocated"), picking_up: t("tp_note_picking_up"),
//       picked: t("tp_note_picked"), dropping_off: t("tp_note_dropping_off"),
//       delivered: t("tp_note_delivered"), rejected: t("tp_note_rejected"),
//       cancelled: t("tp_note_cancelled"),
//     };
//     return map[status] || t("tp_note_default");
//   }

//   const orderTotalQty = orderData ? getOrderQuantity(orderData) : 0;
//   const isWholesaleOrder = userData?.usertype === "reseller" && orderTotalQty >= 24;

//   return (
//     <div className="w-full min-h-screen px-6 py-20 font-sans md:px-12 lg:px-20 animate-fade-in">
//       {/* HEADER */}
//       <div className="flex flex-col gap-4 mb-8 md:flex-row md:justify-between md:items-center">
//         <div>
//           <button
//             onClick={() => navigate(`${urlPrefix}/orders`)}
//             className="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest text-gray-500 uppercase transition hover:text-gray-900"
//           >
//             <span>&larr;</span> {t("tp_back_to_orders")}
//           </button>
//           <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 uppercase md:text-4xl">
//             {t("tp_title")}
//           </h1>
//         </div>
//       </div>

//       {/* STATE: LOADING */}
//       {isLoading ? (
//         <div className="flex flex-col items-center justify-center py-20">
//           <div className="w-10 h-10 border-4 border-gray-100 rounded-full border-t-gycora animate-spin"></div>
//           <p className="mt-4 text-xs font-bold tracking-widest text-gray-400 uppercase animate-pulse">
//             {t("tp_loading_details")}
//           </p>
//         </div>
//       ) : /* STATE: ERROR */
//       error ? (
//         <div className="p-8 text-center border border-red-100 bg-red-50 rounded-2xl">
//           <p className="font-bold text-red-600">{error}</p>
//         </div>
//       ) : (
//         /* STATE: SUCCESS */
//         orderData && (
//           <div className="space-y-6 animate-fade-in">
//             {/* TRACKING CARD TOP */}
//             <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
//               <div className="flex flex-col items-start justify-between gap-6 p-6 border-b border-gray-100 bg-gray-50 md:p-8 md:flex-row md:items-center">
//                 <div>
//                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
//                     {t("tp_waybill_title")}
//                   </p>
//                   <p className="font-mono text-xl font-bold text-black">
//                     {trackingData?.courier?.waybill_id ||
//                       orderData.tracking_number ||
//                       t("tp_waiting_waybill")}
//                   </p>
//                   <div className="flex flex-wrap items-center gap-3 mt-3">
//                     <span className="bg-gray-900 text-white px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest">
//                       {formatStatusTitle(
//                         trackingData?.status || orderData.status,
//                       )}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-center w-full gap-6 md:w-auto">
//                   {/* PAYMENT INFO */}
//                   {activePaymentMethod && (
//                     <div className="flex flex-col items-start md:items-end">
//                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
//                         {t("tp_payment_title")}
//                       </p>
//                       <div className="flex items-center gap-3">
//                         <div className="flex items-center justify-center w-10 h-6 overflow-hidden bg-white border border-gray-200 rounded shrink-0">
//                           {getPaymentLogo(activePaymentMethod) ? (
//                             <img
//                               src={getPaymentLogo(activePaymentMethod)!}
//                               className="object-contain w-full h-full p-0.5"
//                             />
//                           ) : (
//                             <span className="font-black text-gray-300 text-[8px]">
//                               {activePaymentMethod.split(" ")[1] || "PAY"}
//                             </span>
//                           )}
//                         </div>
//                         <p className="text-xs font-bold uppercase text-gycora">
//                           {activePaymentMethod.replace("_", " ")}
//                         </p>
//                       </div>
//                     </div>
//                   )}

//                   <div className="hidden w-px h-8 bg-gray-200 md:block"></div>

//                   {/* COURIER INFO */}
//                   <div className="flex flex-col items-start md:items-end">
//                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
//                       {t("tp_courier_title")}
//                     </p>
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-8 h-8 overflow-hidden bg-white border border-gray-200 rounded-lg shrink-0">
//                         {getCourierLogo(
//                           trackingData?.courier?.company ||
//                             orderData.courier_company,
//                         ) ? (
//                           <img
//                             src={
//                               getCourierLogo(
//                                 trackingData?.courier?.company ||
//                                   orderData.courier_company,
//                               )!
//                             }
//                             className="object-contain w-full h-full p-1"
//                           />
//                         ) : (
//                           <span className="font-black text-gray-300 text-[8px]">
//                             {trackingData?.courier?.company?.toUpperCase() ||
//                               orderData.courier_company?.toUpperCase() ||
//                               t("tp_courier_na")}
//                           </span>
//                         )}
//                       </div>
//                       <div className="text-left md:text-right">
//                         <p className="text-xs font-bold text-gray-800 uppercase">
//                           {trackingData?.courier?.company ||
//                             orderData.courier_company}
//                         </p>
//                         <p className="text-[10px] text-gray-500 font-bold uppercase mt-0.5">
//                           {trackingData?.courier?.type ||
//                             orderData.courier_type}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* ADDRESS DETAILS */}
//               {trackingData ? (
//                 <div className="grid grid-cols-1 gap-8 p-6 text-sm bg-white md:p-8 md:grid-cols-2">
//                   {/* ORIGIN */}
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
//                       <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
//                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
//                         {t("tp_origin_title")}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_sender_name")}
//                       </p>
//                       <p className="font-bold text-gray-900">
//                         {trackingData.origin?.contact_name || "Gycora Store"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_sender_phone")}
//                       </p>
//                       <p className="font-mono text-xs text-gray-700">
//                         {trackingData.origin?.contact_phone || "-"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_sender_address")}
//                       </p>
//                       <p className="text-xs leading-relaxed text-gray-600">
//                         {trackingData.origin?.address || "-"}
//                         <br />
//                         {trackingData.origin?.postal_code && (
//                           <span className="font-bold">
//                             {t("tp_postal_code")}: {trackingData.origin.postal_code}
//                           </span>
//                         )}
//                       </p>
//                     </div>
//                   </div>

//                   {/* DESTINATION */}
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
//                       <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
//                       <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">
//                         {t("tp_dest_title")}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_receiver_name")}
//                       </p>
//                       <p className="font-bold text-gray-900">
//                         {trackingData.destination?.contact_name || "-"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_receiver_phone")}
//                       </p>
//                       <p className="font-mono text-xs text-gray-700">
//                         {trackingData.destination?.contact_phone || "-"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_receiver_address")}
//                       </p>
//                       <p className="text-xs leading-relaxed text-gray-600">
//                         {trackingData.destination?.address || "-"}
//                         <br />
//                         {trackingData.destination?.postal_code && (
//                           <span className="font-bold">
//                             {t("tp_postal_code")}: {trackingData.destination.postal_code}
//                           </span>
//                         )}
//                       </p>
//                     </div>
//                     {trackingData.destination?.note && (
//                       <div>
//                         <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                           {t("tp_courier_note")}
//                         </p>
//                         <p className="p-2 text-xs italic text-gray-500 border rounded bg-gray-50">
//                           "{trackingData.destination.note}"
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="p-6 text-xs italic text-center text-gray-400 bg-white md:p-8">
//                   {t("tp_waiting_location")}
//                 </div>
//               )}
//             </div>

//             {/* ORDER ITEMS SUMMARY */}
//             {orderData.details && orderData.details.length > 0 && (
//               <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
//                 <div className="p-4 border-b border-gray-100 bg-gray-50">
//                   <h3 className="ml-2 text-xs font-bold tracking-widest text-gray-500 uppercase">
//                     {t("tp_item_summary")}
//                   </h3>
//                 </div>

//                 <div className="p-6">
//                   <div className="mb-6 space-y-4">
//                     {orderData.details.map((detail: any) => {
//                       // 👇 [BARU] IDENTIFIKASI BADGE TRACKING PAGE 👇
//                       const isHistoricallyBundled = checkIsBundledInHistory(detail, orderData, userData?.usertype);
//                       const isWholesaleItem = isWholesaleOrder && Number(detail.product.wholesale_price) > 0 && Number(detail.price) === Number(detail.product.wholesale_price);
//                       const isDiscountedItem = !isHistoricallyBundled && !isWholesaleItem && Number(detail.price) < Number(detail.product.price);

//                       return (
//                       <div
//                         key={detail.id}
//                         className="flex items-center gap-4 pb-4 border-b border-gray-50 last:border-0"
//                       >
//                         <img
//                           src={detail.product.image_url}
//                           className="object-cover w-16 h-16 bg-gray-100 border border-gray-100 rounded-lg"
//                         />
//                         <div className="flex-grow">
//                           <h4 className="text-sm font-bold text-gray-900 uppercase">
//                             {detail.product.name}
//                           </h4>
                          
//                           {/* 👇 BADGE HARGA MULTI-LOGIC 👇 */}
//                           <div className="flex flex-wrap gap-1 mt-1 mb-1">
//                             {isHistoricallyBundled ? (
//                               <span className="px-1.5 py-0.5 text-[8px] font-bold text-white bg-purple-600 rounded w-max inline-block" title="Harga Promo Paket">
//                                 BUNDLE
//                               </span>
//                             ) : isWholesaleItem ? (
//                               <span className="px-1.5 py-0.5 text-[8px] font-bold text-white bg-blue-600 rounded w-max inline-block">
//                                 GROSIR
//                               </span>
//                             ) : isDiscountedItem ? (
//                               <span className="px-1.5 py-0.5 text-[8px] font-bold text-white bg-rose-500 rounded w-max inline-block">
//                                 SALE
//                               </span>
//                             ) : null}
//                           </div>

//                           {detail.color && (
//                             <div className="flex items-center gap-1.5 mt-1">
//                               <div
//                                 className="w-3 h-3 border border-gray-300 rounded-full shadow-sm"
//                                 style={{ backgroundColor: detail.color }}
//                                 title={t("tp_variant_title")}
//                               ></div>
//                             </div>
//                           )}
//                           <p className="mt-1 text-xs text-gray-400">
//                             {detail.quantity} x {formatCurrencyDisplay(convertIDRtoActiveCurrency(detail.price))}
//                             {(isHistoricallyBundled || isDiscountedItem) && (
//                               <span className="text-[8px] line-through text-gray-400 ml-1">
//                                 {formatCurrencyDisplay(convertIDRtoActiveCurrency(detail.product.price))}
//                               </span>
//                             )}
//                           </p>
//                         </div>
//                         <p className="text-sm font-bold text-gray-900">
//                           {formatCurrencyDisplay(convertIDRtoActiveCurrency(detail.quantity * detail.price))}
//                         </p>
//                       </div>
//                     )})}
//                   </div>

//                   <div className="pt-4 space-y-2 border-t border-gray-100">
//                     <div className="flex justify-between text-xs text-gray-500">
//                       <span>{t("tp_subtotal")}</span>
//                       <span>{formatCurrencyDisplay(convertIDRtoActiveCurrency(getSubtotal(orderData)))}</span>
//                     </div>
//                     <div className="flex justify-between text-xs text-gray-500">
//                       <span>{t("tp_shipping_cost")}</span>
//                       <span>{formatCurrencyDisplay(convertIDRtoActiveCurrency(orderData.shipping_cost))}</span>
//                     </div>

//                     {orderData.promo_discount > 0 && (
//                       <div className="flex justify-between text-xs font-medium text-emerald-600">
//                         <span>
//                           {t("tp_promo_label")} (
//                           <span className="font-mono uppercase">
//                             {orderData.promo_code}
//                           </span>
//                           )
//                         </span>
//                         <span>- {formatCurrencyDisplay(convertIDRtoActiveCurrency(orderData.promo_discount))}</span>
//                       </div>
//                     )}

//                     {orderData.points_used > 0 && (
//                       <div className="flex justify-between text-xs font-medium text-yellow-600">
//                         <span>
//                           {t("tp_points_redeemed")} ({orderData.points_used} {t("tp_points_unit")})
//                         </span>
//                         <span>
//                           - {formatCurrencyDisplay(convertIDRtoActiveCurrency(orderData.points_used * 1000))}
//                         </span>
//                       </div>
//                     )}

//                     <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200 border-dashed">
//                       <span className="font-bold text-[10px] uppercase tracking-widest text-black">
//                         {t("tp_grand_total")}
//                       </span>
//                       <span className="text-xl font-black text-gycora">
//                         {formatCurrencyDisplay(convertIDRtoActiveCurrency(getGrandTotal(orderData)))}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* LOYALTY REWARD */}
//                 {userData?.is_membership &&
//                 orderData.point > 0 &&
//                 orderData.status === "completed" ? (
//                   <div className="flex items-center justify-between p-4 m-6 border rounded-xl bg-gradient-to-r from-emerald-50 to-white border-emerald-100">
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-10 h-10 text-white rounded-full shadow-sm bg-emerald-500">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       </div>
//                       <div>
//                         <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">
//                           {t("tp_loyalty_reward")}
//                         </p>
//                         <p className="text-xs mt-0.5 text-gray-500">
//                           {t("tp_points_earned")}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <span className="text-2xl font-black text-emerald-600">
//                         +{orderData.point}
//                       </span>
//                       <span className="ml-1 text-xs font-bold text-emerald-800">
//                         {t("tp_points_unit")}
//                       </span>
//                     </div>
//                   </div>
//                 ) : null}
//               </div>
//             )}

//             {/* TRACKING TIMELINE */}
//             <div className="p-6 bg-white border border-gray-100 shadow-sm md:p-8 rounded-3xl">
//               <h3 className="pb-4 mb-6 text-sm font-bold tracking-widest uppercase border-b border-gray-100">
//                 {t("tp_timeline_title")}
//               </h3>

//               <div className="relative ml-3 space-y-8 border-l-2 border-gray-100">
//                 {timelineHistory.map((history: any, index: number) => (
//                   <div key={index} className="relative pl-8">
//                     <span
//                       className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all ${
//                         index === 0
//                           ? "bg-gycora ring-4 ring-emerald-50"
//                           : "bg-gray-300"
//                       }`}
//                     ></span>

//                     <div className={index === 0 ? "opacity-100" : "opacity-50"}>
//                       <p className="mb-1 text-sm font-bold tracking-wide text-gray-900 uppercase">
//                         {formatStatusTitle(history.status)}
//                       </p>
//                       <p className="mb-2 text-xs text-gray-600">
//                         {history.note}
//                       </p>
//                       <p className="font-mono text-[10px] font-medium text-gray-400">
//                         {formatDate(history.updated_at)}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )
//       )}
//     </div>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useMemo, useCallback } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { BASE_URL } from "../../config/api";
// import { useCurrency } from "../../context/CurrencyContext";
// import { useLanguage } from "../../context/LanguageContext";

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

// export default function TrackingPage() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { t, lang } = useLanguage();

//   const { currency, exchangeRates } = useCurrency() as any;

//   const [userData, setUserData] = useState<any>(null);
//   const [orderData, setOrderData] = useState<any>(null);
//   const [trackingData, setTrackingData] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const paymentMethodInfo = location.state?.paymentMethod || "";

//   const getUrlPrefix = () => {
//     if (location.pathname.startsWith("/id")) return "/id";
//     if (location.pathname.startsWith("/en")) return "/en";
//     return "";
//   };
//   const urlPrefix = getUrlPrefix();

//   useEffect(() => {
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) setUserData(JSON.parse(userStr));

//     const fetchAllData = async () => {
//       setIsLoading(true);
//       setError(null);

//       const token = localStorage.getItem("user_token");
//       if (!token) {
//         navigate(`${urlPrefix}/login`);
//         return;
//       }

//       try {
//         const orderRes = await fetch(`${BASE_URL}/api/transactions/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         });
//         if (!orderRes.ok) throw new Error(t("tp_err_fetch_order"));

//         const rawOrderData = await orderRes.json();
//         setOrderData(rawOrderData.data ? rawOrderData.data : rawOrderData);

//         try {
//           const trackRes = await fetch(`${BASE_URL}/api/transactions/${id}/tracking`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               Accept: "application/json",
//             },
//           });
//           if (trackRes.ok) {
//             const rawTrackData = await trackRes.json();
//             setTrackingData(rawTrackData.data ? rawTrackData.data : rawTrackData);
//           }
//         } catch (trackErr) {
//           console.warn("Data pelacakan belum tersedia dari pihak ekspedisi.", trackErr);
//         }
//       } catch (err: any) {
//         setError(err.message || t("tp_err_system"));
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (id) fetchAllData();
//   }, [id, navigate, t, urlPrefix]);

//   const activePaymentMethod = useMemo(() => {
//     if (orderData?.payment_method) return orderData.payment_method;
//     if (paymentMethodInfo) return paymentMethodInfo;
//     return null;
//   }, [orderData, paymentMethodInfo]);

//   const timelineHistory = useMemo(() => {
//     const apiHistory = trackingData?.courier?.history || [];
//     if (apiHistory.length > 0) {
//       return [...apiHistory].reverse();
//     }

//     return [
//       {
//         status: trackingData?.status || orderData?.status || t("tp_stat_processing"),
//         note: getNoteFromStatus(trackingData?.status || orderData?.status),
//         updated_at:
//           trackingData?.delivery?.datetime ||
//           orderData?.created_at ||
//           new Date().toISOString(),
//       },
//     ];
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [trackingData, orderData, t]);

//   const convertIDRtoActiveCurrency = useCallback((idrAmount: number) => {
//     const curr = (currency as Currency) || "IDR";
//     if (curr === "IDR" || !exchangeRates || !exchangeRates[curr])
//       return { value: idrAmount, curr: "IDR" };
//     return { value: idrAmount * exchangeRates[curr], curr: curr };
//   }, [currency, exchangeRates]);

//   const formatCurrencyDisplay = useCallback((priceObj: { value: number; curr: string } | null) => {
//     if (!priceObj) return "";
//     const symbols: any = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
//     const formatter = new Intl.NumberFormat(
//       priceObj.curr === "IDR" ? "id-ID" : "en-US",
//       {
//         minimumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//         maximumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//       },
//     );
//     return `${symbols[priceObj.curr] || priceObj.curr + " "}${formatter.format(priceObj.value)}`;
//   }, []);

//   const getSubtotal = (order: any) => order.total_amount;
//   const getOrderQuantity = (order: any) => order.details.reduce((sum: number, item: any) => sum + item.quantity, 0);

//   const getGrandTotal = (order: any) => {
//     if (!order) return 0;
//     const total = parseFloat(order.total_amount || 0);
//     const shipping = parseFloat(order.shipping_cost || 0);
//     const promo = parseFloat(order.promo_discount || 0);
//     const pointsDiscount = (order.points_used || 0) * 1000;
//     return total + shipping - promo - pointsDiscount;
//   };

//   // ============================================================================
//   // 👇 LOGIKA FORENSIK HARGA HISTORY (MEMBACA MATEMATIKA ASLI DB) 👇
//   // ============================================================================
//   const checkIsBundledInHistory = useCallback((detail: any, order: any, userType: string) => {
//     const prod = detail.product;
//     if (!prod) return false;

//     const orderDate = new Date(order.created_at).getTime();
//     const featureLaunchDate = new Date("2026-07-20T00:00:00Z").getTime();
//     if (orderDate < featureLaunchDate) return false;

//     let isWithinTimeframe = true;
//     if (prod.bundle_end_date && prod.bundle_end_date !== "0000-00-00 00:00:00") {
//       const endDate = new Date(prod.bundle_end_date.replace(" ", "T")).getTime();
//       isWithinTimeframe = orderDate <= endDate;
//     }
//     if (!isWithinTimeframe) return false;

//     const hasDriver = order.details.some((d: any) => (d.product?.sku || "").toUpperCase().startsWith("EGB"));
//     const hasPartner = order.details.some((d: any) => !(d.product?.sku || "").toUpperCase().startsWith("EGB"));
//     if (!hasDriver || !hasPartner) return false;

//     const paidPrice = Number(detail.price);
//     const normalPrice = Number(prod.price) || 0;
//     const discPrice = Number(prod.discount_price) || 0;

//     if (Math.abs(paidPrice - normalPrice) < 1) return false;
//     if (discPrice > 0 && Math.abs(paidPrice - discPrice) < 1) return false;

//     let isMatchedWithBundleSplit = false;
//     order.details.forEach((d: any) => {
//       const p = d.product;
//       if (p && (p.sku || "").toUpperCase().startsWith("EGB")) {
//         const currentBundlePrice = Number(p.bundle_price) || 0;
//         if (currentBundlePrice > 0) {
//           const splitPrice = currentBundlePrice / 2;
//           if (Math.abs(paidPrice - splitPrice) < 1) {
//             isMatchedWithBundleSplit = true;
//           }
//         }
//       }
//     });

//     return isMatchedWithBundleSplit;
//   }, []);
//   // ============================================================================

//   const getCourierLogo = (company: string) => {
//     if (!company) return null;
//     const map: Record<string, string> = {
//       jne: "jne.png", sicepat: "sicepat.png", jnt: "jnt.png",
//       anteraja: "anteraja.png", gojek: "gojek.png", grab: "grab.png",
//       paxel: "paxel.png", ninja: "ninja.png",
//     };
//     return map[company.toLowerCase()] ? "/courier_images/" + map[company.toLowerCase()] : null;
//   };

//   const getPaymentLogo = (methodString: string) => {
//     if (!methodString) return null;
//     const channel = methodString.split(" ")[1]?.toLowerCase();
//     const map: Record<string, string> = {
//       bca: "bca.png", bni: "bni.png", bri: "bri.png", mandiri: "mandiri.png",
//       bsi: "bsi.png", permata: "permata.png", ovo: "ovo.png", dana: "dana.png",
//       linkaja: "linkaja.png", shopeepay: "shopeepay.png", alfamart: "alfamart.png",
//       indomaret: "indomaret.png", qris: "qris.png",
//     };
//     return map[channel] ? "/payment_images/" + map[channel] : null;
//   };

//   const formatStatusTitle = (status: string) => {
//     if (!status) return t("tp_stat_processing");
//     const formatted = status.replace(/_/g, " ");
//     return formatted.charAt(0).toUpperCase() + formatted.slice(1);
//   };

//   const formatDate = (dateString: string) => {
//     if (!dateString) return "-";
//     return new Date(dateString).toLocaleDateString(
//       lang === "id" ? "id-ID" : "en-US",
//       {
//         weekday: "long", year: "numeric", month: "short",
//         day: "numeric", hour: "2-digit", minute: "2-digit",
//       },
//     );
//   };

//   function getNoteFromStatus(status: string) {
//     const map: Record<string, string> = {
//       pending: t("tp_note_pending"), placed: t("tp_note_placed"),
//       allocated: t("tp_note_allocated"), picking_up: t("tp_note_picking_up"),
//       picked: t("tp_note_picked"), dropping_off: t("tp_note_dropping_off"),
//       delivered: t("tp_note_delivered"), rejected: t("tp_note_rejected"),
//       cancelled: t("tp_note_cancelled"),
//     };
//     return map[status] || t("tp_note_default");
//   }

//   const orderTotalQty = orderData ? getOrderQuantity(orderData) : 0;
//   const isWholesaleOrder = userData?.usertype === "reseller" && orderTotalQty >= 24;

//   return (
//     <div className="w-full min-h-screen px-6 py-20 font-sans md:px-12 lg:px-20 animate-fade-in">
//       {/* HEADER */}
//       <div className="flex flex-col gap-4 mb-8 md:flex-row md:justify-between md:items-center">
//         <div>
//           <button
//             onClick={() => navigate(`${urlPrefix}/orders`)}
//             className="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest text-gray-500 uppercase transition hover:text-gray-900"
//           >
//             <span>&larr;</span> {t("tp_back_to_orders")}
//           </button>
//           <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 uppercase md:text-4xl">
//             {t("tp_title")}
//           </h1>
//         </div>
//       </div>

//       {/* STATE: LOADING */}
//       {isLoading ? (
//         <div className="flex flex-col items-center justify-center py-20">
//           <div className="w-10 h-10 border-4 border-gray-100 rounded-full border-t-gycora animate-spin"></div>
//           <p className="mt-4 text-xs font-bold tracking-widest text-gray-400 uppercase animate-pulse">
//             {t("tp_loading_details")}
//           </p>
//         </div>
//       ) : /* STATE: ERROR */
//       error ? (
//         <div className="p-8 text-center border border-red-100 bg-red-50 rounded-2xl">
//           <p className="font-bold text-red-600">{error}</p>
//         </div>
//       ) : (
//         /* STATE: SUCCESS */
//         orderData && (
//           <div className="space-y-6 animate-fade-in">
//             {/* TRACKING CARD TOP */}
//             <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
//               <div className="flex flex-col items-start justify-between gap-6 p-6 border-b border-gray-100 bg-gray-50 md:p-8 md:flex-row md:items-center">
//                 <div>
//                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
//                     {t("tp_waybill_title")}
//                   </p>
//                   <p className="font-mono text-xl font-bold text-black">
//                     {trackingData?.courier?.waybill_id ||
//                       orderData.tracking_number ||
//                       t("tp_waiting_waybill")}
//                   </p>
//                   <div className="flex flex-wrap items-center gap-3 mt-3">
//                     <span className="bg-gray-900 text-white px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest">
//                       {formatStatusTitle(
//                         trackingData?.status || orderData.status,
//                       )}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-center w-full gap-6 md:w-auto">
//                   {/* PAYMENT INFO */}
//                   {activePaymentMethod && (
//                     <div className="flex flex-col items-start md:items-end">
//                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
//                         {t("tp_payment_title")}
//                       </p>
//                       <div className="flex items-center gap-3">
//                         <div className="flex items-center justify-center w-10 h-6 overflow-hidden bg-white border border-gray-200 rounded shrink-0">
//                           {getPaymentLogo(activePaymentMethod) ? (
//                             <img
//                               src={getPaymentLogo(activePaymentMethod)!}
//                               className="object-contain w-full h-full p-0.5"
//                             />
//                           ) : (
//                             <span className="font-black text-gray-300 text-[8px]">
//                               {activePaymentMethod.split(" ")[1] || "PAY"}
//                             </span>
//                           )}
//                         </div>
//                         <p className="text-xs font-bold uppercase text-gycora">
//                           {activePaymentMethod.replace("_", " ")}
//                         </p>
//                       </div>
//                     </div>
//                   )}

//                   <div className="hidden w-px h-8 bg-gray-200 md:block"></div>

//                   {/* COURIER INFO */}
//                   <div className="flex flex-col items-start md:items-end">
//                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
//                       {t("tp_courier_title")}
//                     </p>
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-8 h-8 overflow-hidden bg-white border border-gray-200 rounded-lg shrink-0">
//                         {getCourierLogo(
//                           trackingData?.courier?.company ||
//                             orderData.courier_company,
//                         ) ? (
//                           <img
//                             src={
//                               getCourierLogo(
//                                 trackingData?.courier?.company ||
//                                   orderData.courier_company,
//                               )!
//                             }
//                             className="object-contain w-full h-full p-1"
//                           />
//                         ) : (
//                           <span className="font-black text-gray-300 text-[8px]">
//                             {trackingData?.courier?.company?.toUpperCase() ||
//                               orderData.courier_company?.toUpperCase() ||
//                               t("tp_courier_na")}
//                           </span>
//                         )}
//                       </div>
//                       <div className="text-left md:text-right">
//                         <p className="text-xs font-bold text-gray-800 uppercase">
//                           {trackingData?.courier?.company ||
//                             orderData.courier_company}
//                         </p>
//                         <p className="text-[10px] text-gray-500 font-bold uppercase mt-0.5">
//                           {trackingData?.courier?.type ||
//                             orderData.courier_type}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* ADDRESS DETAILS */}
//               {trackingData ? (
//                 <div className="grid grid-cols-1 gap-8 p-6 text-sm bg-white md:p-8 md:grid-cols-2">
//                   {/* ORIGIN */}
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
//                       <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
//                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
//                         {t("tp_origin_title")}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_sender_name")}
//                       </p>
//                       <p className="font-bold text-gray-900">
//                         {trackingData.origin?.contact_name || "Gycora Store"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_sender_phone")}
//                       </p>
//                       <p className="font-mono text-xs text-gray-700">
//                         {trackingData.origin?.contact_phone || "-"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_sender_address")}
//                       </p>
//                       <p className="text-xs leading-relaxed text-gray-600">
//                         {trackingData.origin?.address || "-"}
//                         <br />
//                         {trackingData.origin?.postal_code && (
//                           <span className="font-bold">
//                             {t("tp_postal_code")}: {trackingData.origin.postal_code}
//                           </span>
//                         )}
//                       </p>
//                     </div>
//                   </div>

//                   {/* DESTINATION */}
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
//                       <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
//                       <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">
//                         {t("tp_dest_title")}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_receiver_name")}
//                       </p>
//                       <p className="font-bold text-gray-900">
//                         {trackingData.destination?.contact_name || "-"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_receiver_phone")}
//                       </p>
//                       <p className="font-mono text-xs text-gray-700">
//                         {trackingData.destination?.contact_phone || "-"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_receiver_address")}
//                       </p>
//                       <p className="text-xs leading-relaxed text-gray-600">
//                         {trackingData.destination?.address || "-"}
//                         <br />
//                         {trackingData.destination?.postal_code && (
//                           <span className="font-bold">
//                             {t("tp_postal_code")}: {trackingData.destination.postal_code}
//                           </span>
//                         )}
//                       </p>
//                     </div>
//                     {trackingData.destination?.note && (
//                       <div>
//                         <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                           {t("tp_courier_note")}
//                         </p>
//                         <p className="p-2 text-xs italic text-gray-500 border rounded bg-gray-50">
//                           "{trackingData.destination.note}"
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="p-6 text-xs italic text-center text-gray-400 bg-white md:p-8">
//                   {t("tp_waiting_location")}
//                 </div>
//               )}
//             </div>

//             {/* ORDER ITEMS SUMMARY */}
//             {orderData.details && orderData.details.length > 0 && (
//               <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
//                 <div className="p-4 border-b border-gray-100 bg-gray-50">
//                   <h3 className="ml-2 text-xs font-bold tracking-widest text-gray-500 uppercase">
//                     {t("tp_item_summary")}
//                   </h3>
//                 </div>

//                 <div className="p-6">
//                   <div className="mb-6 space-y-4">
//                     {orderData.details.map((detail: any) => {
//                       // 👇 [BARU] IDENTIFIKASI BADGE TRACKING PAGE (FORENSIK DB) 👇
//                       const isHistoricallyBundled = checkIsBundledInHistory(detail, orderData, userData?.usertype);
//                       const isWholesaleItem = isWholesaleOrder && Number(detail.product.wholesale_price) > 0 && Math.abs(Number(detail.price) - Number(detail.product.wholesale_price)) < 1;
//                       const isDiscountedItem = !isHistoricallyBundled && !isWholesaleItem && Number(detail.price) < Number(detail.product.price);

//                       return (
//                       <div
//                         key={detail.id}
//                         className="flex items-center gap-4 pb-4 border-b border-gray-50 last:border-0"
//                       >
//                         <img
//                           src={detail.product.image_url}
//                           className="object-cover w-16 h-16 bg-gray-100 border border-gray-100 rounded-lg"
//                         />
//                         <div className="flex-grow">
//                           <h4 className="text-sm font-bold text-gray-900 uppercase">
//                             {detail.product.name}
//                           </h4>
                          
//                           {/* 👇 BADGE HARGA MULTI-LOGIC 👇 */}
//                           <div className="flex flex-wrap gap-1 mt-1 mb-1">
//                             {isHistoricallyBundled ? (
//                               <span className="px-1.5 py-0.5 text-[8px] font-bold text-white bg-purple-600 rounded w-max inline-block" title="Harga Promo Paket">
//                                 BUNDLE
//                               </span>
//                             ) : isWholesaleItem ? (
//                               <span className="px-1.5 py-0.5 text-[8px] font-bold text-white bg-blue-600 rounded w-max inline-block">
//                                 GROSIR
//                               </span>
//                             ) : isDiscountedItem ? (
//                               <span className="px-1.5 py-0.5 text-[8px] font-bold text-white bg-rose-500 rounded w-max inline-block">
//                                 SALE
//                               </span>
//                             ) : null}
//                           </div>

//                           {detail.color && (
//                             <div className="flex items-center gap-1.5 mt-1">
//                               <div
//                                 className="w-3 h-3 border border-gray-300 rounded-full shadow-sm"
//                                 style={{ backgroundColor: detail.color }}
//                                 title={t("tp_variant_title")}
//                               ></div>
//                             </div>
//                           )}
//                           <p className="mt-1 text-xs text-gray-400">
//                             {detail.quantity} x {formatCurrencyDisplay(convertIDRtoActiveCurrency(detail.price))}
//                             {(isHistoricallyBundled || isDiscountedItem) && (
//                               <span className="text-[8px] line-through text-gray-400 ml-1">
//                                 {formatCurrencyDisplay(convertIDRtoActiveCurrency(detail.product.price))}
//                               </span>
//                             )}
//                           </p>
//                         </div>
//                         <p className="text-sm font-bold text-gray-900">
//                           {formatCurrencyDisplay(convertIDRtoActiveCurrency(detail.quantity * detail.price))}
//                         </p>
//                       </div>
//                     )})}
//                   </div>

//                   <div className="pt-4 space-y-2 border-t border-gray-100">
//                     <div className="flex justify-between text-xs text-gray-500">
//                       <span>{t("tp_subtotal")}</span>
//                       <span>{formatCurrencyDisplay(convertIDRtoActiveCurrency(getSubtotal(orderData)))}</span>
//                     </div>
//                     <div className="flex justify-between text-xs text-gray-500">
//                       <span>{t("tp_shipping_cost")}</span>
//                       <span>{formatCurrencyDisplay(convertIDRtoActiveCurrency(orderData.shipping_cost))}</span>
//                     </div>

//                     {orderData.promo_discount > 0 && (
//                       <div className="flex justify-between text-xs font-medium text-emerald-600">
//                         <span>
//                           {t("tp_promo_label")} (
//                           <span className="font-mono uppercase">
//                             {orderData.promo_code}
//                           </span>
//                           )
//                         </span>
//                         <span>- {formatCurrencyDisplay(convertIDRtoActiveCurrency(orderData.promo_discount))}</span>
//                       </div>
//                     )}

//                     {orderData.points_used > 0 && (
//                       <div className="flex justify-between text-xs font-medium text-yellow-600">
//                         <span>
//                           {t("tp_points_redeemed")} ({orderData.points_used} {t("tp_points_unit")})
//                         </span>
//                         <span>
//                           - {formatCurrencyDisplay(convertIDRtoActiveCurrency(orderData.points_used * 1000))}
//                         </span>
//                       </div>
//                     )}

//                     <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200 border-dashed">
//                       <span className="font-bold text-[10px] uppercase tracking-widest text-black">
//                         {t("tp_grand_total")}
//                       </span>
//                       <span className="text-xl font-black text-gycora">
//                         {formatCurrencyDisplay(convertIDRtoActiveCurrency(getGrandTotal(orderData)))}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* LOYALTY REWARD */}
//                 {userData?.is_membership &&
//                 orderData.point > 0 &&
//                 orderData.status === "completed" ? (
//                   <div className="flex items-center justify-between p-4 m-6 border rounded-xl bg-gradient-to-r from-emerald-50 to-white border-emerald-100">
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-10 h-10 text-white rounded-full shadow-sm bg-emerald-500">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       </div>
//                       <div>
//                         <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">
//                           {t("tp_loyalty_reward")}
//                         </p>
//                         <p className="text-xs mt-0.5 text-gray-500">
//                           {t("tp_points_earned")}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <span className="text-2xl font-black text-emerald-600">
//                         +{orderData.point}
//                       </span>
//                       <span className="ml-1 text-xs font-bold text-emerald-800">
//                         {t("tp_points_unit")}
//                       </span>
//                     </div>
//                   </div>
//                 ) : null}
//               </div>
//             )}

//             {/* TRACKING TIMELINE */}
//             <div className="p-6 bg-white border border-gray-100 shadow-sm md:p-8 rounded-3xl">
//               <h3 className="pb-4 mb-6 text-sm font-bold tracking-widest uppercase border-b border-gray-100">
//                 {t("tp_timeline_title")}
//               </h3>

//               <div className="relative ml-3 space-y-8 border-l-2 border-gray-100">
//                 {timelineHistory.map((history: any, index: number) => (
//                   <div key={index} className="relative pl-8">
//                     <span
//                       className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all ${
//                         index === 0
//                           ? "bg-gycora ring-4 ring-emerald-50"
//                           : "bg-gray-300"
//                       }`}
//                     ></span>

//                     <div className={index === 0 ? "opacity-100" : "opacity-50"}>
//                       <p className="mb-1 text-sm font-bold tracking-wide text-gray-900 uppercase">
//                         {formatStatusTitle(history.status)}
//                       </p>
//                       <p className="mb-2 text-xs text-gray-600">
//                         {history.note}
//                       </p>
//                       <p className="font-mono text-[10px] font-medium text-gray-400">
//                         {formatDate(history.updated_at)}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )
//       )}
//     </div>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useMemo, useCallback } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { BASE_URL } from "../../config/api";
// import { useCurrency } from "../../context/CurrencyContext";
// import { useLanguage } from "../../context/LanguageContext";

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

// export default function TrackingPage() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { t, lang } = useLanguage();

//   const { currency, exchangeRates } = useCurrency() as any;

//   const [userData, setUserData] = useState<any>(null);
//   const [orderData, setOrderData] = useState<any>(null);
//   const [trackingData, setTrackingData] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const paymentMethodInfo = location.state?.paymentMethod || "";

//   const getUrlPrefix = () => {
//     if (location.pathname.startsWith("/id")) return "/id";
//     if (location.pathname.startsWith("/en")) return "/en";
//     return "";
//   };
//   const urlPrefix = getUrlPrefix();

//   useEffect(() => {
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) setUserData(JSON.parse(userStr));

//     const fetchAllData = async () => {
//       setIsLoading(true);
//       setError(null);

//       const token = localStorage.getItem("user_token");
//       if (!token) {
//         navigate(`${urlPrefix}/login`);
//         return;
//       }

//       try {
//         const orderRes = await fetch(`${BASE_URL}/api/transactions/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         });
//         if (!orderRes.ok) throw new Error(t("tp_err_fetch_order"));

//         const rawOrderData = await orderRes.json();
//         setOrderData(rawOrderData.data ? rawOrderData.data : rawOrderData);

//         try {
//           const trackRes = await fetch(`${BASE_URL}/api/transactions/${id}/tracking`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               Accept: "application/json",
//             },
//           });
//           if (trackRes.ok) {
//             const rawTrackData = await trackRes.json();
//             setTrackingData(rawTrackData.data ? rawTrackData.data : rawTrackData);
//           }
//         } catch (trackErr) {
//           console.warn("Data pelacakan belum tersedia dari pihak ekspedisi.", trackErr);
//         }
//       } catch (err: any) {
//         setError(err.message || t("tp_err_system"));
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (id) fetchAllData();
//   }, [id, navigate, t, urlPrefix]);

//   const activePaymentMethod = useMemo(() => {
//     if (orderData?.payment_method) return orderData.payment_method;
//     if (paymentMethodInfo) return paymentMethodInfo;
//     return null;
//   }, [orderData, paymentMethodInfo]);

//   const timelineHistory = useMemo(() => {
//     const apiHistory = trackingData?.courier?.history || [];
//     if (apiHistory.length > 0) {
//       return [...apiHistory].reverse();
//     }

//     return [
//       {
//         status: trackingData?.status || orderData?.status || t("tp_stat_processing"),
//         note: getNoteFromStatus(trackingData?.status || orderData?.status),
//         updated_at:
//           trackingData?.delivery?.datetime ||
//           orderData?.created_at ||
//           new Date().toISOString(),
//       },
//     ];
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [trackingData, orderData, t]);

//   const convertIDRtoActiveCurrency = useCallback((idrAmount: number) => {
//     const curr = (currency as Currency) || "IDR";
//     if (curr === "IDR" || !exchangeRates || !exchangeRates[curr])
//       return { value: idrAmount, curr: "IDR" };
//     return { value: idrAmount * exchangeRates[curr], curr: curr };
//   }, [currency, exchangeRates]);

//   const formatCurrencyDisplay = useCallback((priceObj: { value: number; curr: string } | null) => {
//     if (!priceObj) return "";
//     const symbols: any = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
//     const formatter = new Intl.NumberFormat(
//       priceObj.curr === "IDR" ? "id-ID" : "en-US",
//       {
//         minimumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//         maximumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//       },
//     );
//     return `${symbols[priceObj.curr] || priceObj.curr + " "}${formatter.format(priceObj.value)}`;
//   }, []);

//   const getSubtotal = (order: any) => order.total_amount;
//   const getOrderQuantity = (order: any) => order.details.reduce((sum: number, item: any) => sum + item.quantity, 0);

//   const getGrandTotal = (order: any) => {
//     if (!order) return 0;
//     const total = parseFloat(order.total_amount || 0);
//     const shipping = parseFloat(order.shipping_cost || 0);
//     const promo = parseFloat(order.promo_discount || 0);
//     const pointsDiscount = (order.points_used || 0) * 1000;
//     return total + shipping - promo - pointsDiscount;
//   };

//   // ============================================================================
//   // 👇 LOGIKA FORENSIK HARGA HISTORY (ANTI-BUG) 👇
//   // ============================================================================
//   const checkIsBundledInHistory = useCallback((detail: any, order: any, userType: string) => {
//     const prod = detail.product;
//     if (!prod) return false;

//     // 1. FILTER WAKTU ABSOLUT (Sistem Bundle baru di-deploy 23 Juli 2026, 17:00 WIB)
//     const orderDate = new Date(order.created_at).getTime();
//     const launchDate = new Date("2026-07-23T17:00:00+07:00").getTime();
//     if (orderDate < launchDate) return false;

//     // 2. FILTER KOMPOSISI (Harus ada Driver(EGB) dan Partner(Non-EGB) di order ini)
//     const hasDriver = order.details.some((d: any) => (d.product?.sku || "").toUpperCase().startsWith("EGB"));
//     const hasPartner = order.details.some((d: any) => !(d.product?.sku || "").toUpperCase().startsWith("EGB"));
//     if (!hasDriver || !hasPartner) return false;

//     // 3. FILTER HARGA (Memastikan yang dibayar BUKAN harga normal/diskon standar)
//     const paidPrice = Number(detail.price);
//     const normalPrice = Number(prod.price) || 0;
//     const discPrice = Number(prod.discount_price) || 0;
//     const wholesalePrice = Number(prod.wholesale_price) || 0;

//     const orderTotalQty = getOrderQuantity(order);
//     const isWholesaleOrder = userType === "reseller" && orderTotalQty >= 24;

//     if (Math.abs(paidPrice - normalPrice) < 1) return false;
//     if (discPrice > 0 && Math.abs(paidPrice - discPrice) < 1) return false;
//     if (isWholesaleOrder && wholesalePrice > 0 && Math.abs(paidPrice - wholesalePrice) < 1) return false;

//     return true; 
//   }, []);
//   // ============================================================================

//   const getCourierLogo = (company: string) => {
//     if (!company) return null;
//     const map: Record<string, string> = {
//       jne: "jne.png", sicepat: "sicepat.png", jnt: "jnt.png",
//       anteraja: "anteraja.png", gojek: "gojek.png", grab: "grab.png",
//       paxel: "paxel.png", ninja: "ninja.png",
//     };
//     return map[company.toLowerCase()] ? "/courier_images/" + map[company.toLowerCase()] : null;
//   };

//   const getPaymentLogo = (methodString: string) => {
//     if (!methodString) return null;
//     const channel = methodString.split(" ")[1]?.toLowerCase();
//     const map: Record<string, string> = {
//       bca: "bca.png", bni: "bni.png", bri: "bri.png", mandiri: "mandiri.png",
//       bsi: "bsi.png", permata: "permata.png", ovo: "ovo.png", dana: "dana.png",
//       linkaja: "linkaja.png", shopeepay: "shopeepay.png", alfamart: "alfamart.png",
//       indomaret: "indomaret.png", qris: "qris.png",
//     };
//     return map[channel] ? "/payment_images/" + map[channel] : null;
//   };

//   const formatStatusTitle = (status: string) => {
//     if (!status) return t("tp_stat_processing");
//     const formatted = status.replace(/_/g, " ");
//     return formatted.charAt(0).toUpperCase() + formatted.slice(1);
//   };

//   const formatDate = (dateString: string) => {
//     if (!dateString) return "-";
//     return new Date(dateString).toLocaleDateString(
//       lang === "id" ? "id-ID" : "en-US",
//       {
//         weekday: "long", year: "numeric", month: "short",
//         day: "numeric", hour: "2-digit", minute: "2-digit",
//       },
//     );
//   };

//   function getNoteFromStatus(status: string) {
//     const map: Record<string, string> = {
//       pending: t("tp_note_pending"), placed: t("tp_note_placed"),
//       allocated: t("tp_note_allocated"), picking_up: t("tp_note_picking_up"),
//       picked: t("tp_note_picked"), dropping_off: t("tp_note_dropping_off"),
//       delivered: t("tp_note_delivered"), rejected: t("tp_note_rejected"),
//       cancelled: t("tp_note_cancelled"),
//     };
//     return map[status] || t("tp_note_default");
//   }

//   const orderTotalQty = orderData ? getOrderQuantity(orderData) : 0;
//   const isWholesaleOrder = userData?.usertype === "reseller" && orderTotalQty >= 24;

//   return (
//     <div className="w-full min-h-screen px-6 py-20 font-sans md:px-12 lg:px-20 animate-fade-in">
//       {/* HEADER */}
//       <div className="flex flex-col gap-4 mb-8 md:flex-row md:justify-between md:items-center">
//         <div>
//           <button
//             onClick={() => navigate(`${urlPrefix}/orders`)}
//             className="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest text-gray-500 uppercase transition hover:text-gray-900"
//           >
//             <span>&larr;</span> {t("tp_back_to_orders")}
//           </button>
//           <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 uppercase md:text-4xl">
//             {t("tp_title")}
//           </h1>
//         </div>
//       </div>

//       {/* STATE: LOADING */}
//       {isLoading ? (
//         <div className="flex flex-col items-center justify-center py-20">
//           <div className="w-10 h-10 border-4 border-gray-100 rounded-full border-t-gycora animate-spin"></div>
//           <p className="mt-4 text-xs font-bold tracking-widest text-gray-400 uppercase animate-pulse">
//             {t("tp_loading_details")}
//           </p>
//         </div>
//       ) : /* STATE: ERROR */
//       error ? (
//         <div className="p-8 text-center border border-red-100 bg-red-50 rounded-2xl">
//           <p className="font-bold text-red-600">{error}</p>
//         </div>
//       ) : (
//         /* STATE: SUCCESS */
//         orderData && (
//           <div className="space-y-6 animate-fade-in">
//             {/* TRACKING CARD TOP */}
//             <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
//               <div className="flex flex-col items-start justify-between gap-6 p-6 border-b border-gray-100 bg-gray-50 md:p-8 md:flex-row md:items-center">
//                 <div>
//                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
//                     {t("tp_waybill_title")}
//                   </p>
//                   <p className="font-mono text-xl font-bold text-black">
//                     {trackingData?.courier?.waybill_id ||
//                       orderData.tracking_number ||
//                       t("tp_waiting_waybill")}
//                   </p>
//                   <div className="flex flex-wrap items-center gap-3 mt-3">
//                     <span className="bg-gray-900 text-white px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest">
//                       {formatStatusTitle(
//                         trackingData?.status || orderData.status,
//                       )}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-center w-full gap-6 md:w-auto">
//                   {/* PAYMENT INFO */}
//                   {activePaymentMethod && (
//                     <div className="flex flex-col items-start md:items-end">
//                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
//                         {t("tp_payment_title")}
//                       </p>
//                       <div className="flex items-center gap-3">
//                         <div className="flex items-center justify-center w-10 h-6 overflow-hidden bg-white border border-gray-200 rounded shrink-0">
//                           {getPaymentLogo(activePaymentMethod) ? (
//                             <img
//                               src={getPaymentLogo(activePaymentMethod)!}
//                               className="object-contain w-full h-full p-0.5"
//                             />
//                           ) : (
//                             <span className="font-black text-gray-300 text-[8px]">
//                               {activePaymentMethod.split(" ")[1] || "PAY"}
//                             </span>
//                           )}
//                         </div>
//                         <p className="text-xs font-bold uppercase text-gycora">
//                           {activePaymentMethod.replace("_", " ")}
//                         </p>
//                       </div>
//                     </div>
//                   )}

//                   <div className="hidden w-px h-8 bg-gray-200 md:block"></div>

//                   {/* COURIER INFO */}
//                   <div className="flex flex-col items-start md:items-end">
//                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
//                       {t("tp_courier_title")}
//                     </p>
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-8 h-8 overflow-hidden bg-white border border-gray-200 rounded-lg shrink-0">
//                         {getCourierLogo(
//                           trackingData?.courier?.company ||
//                             orderData.courier_company,
//                         ) ? (
//                           <img
//                             src={
//                               getCourierLogo(
//                                 trackingData?.courier?.company ||
//                                   orderData.courier_company,
//                               )!
//                             }
//                             className="object-contain w-full h-full p-1"
//                           />
//                         ) : (
//                           <span className="font-black text-gray-300 text-[8px]">
//                             {trackingData?.courier?.company?.toUpperCase() ||
//                               orderData.courier_company?.toUpperCase() ||
//                               t("tp_courier_na")}
//                           </span>
//                         )}
//                       </div>
//                       <div className="text-left md:text-right">
//                         <p className="text-xs font-bold text-gray-800 uppercase">
//                           {trackingData?.courier?.company ||
//                             orderData.courier_company}
//                         </p>
//                         <p className="text-[10px] text-gray-500 font-bold uppercase mt-0.5">
//                           {trackingData?.courier?.type ||
//                             orderData.courier_type}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* ADDRESS DETAILS */}
//               {trackingData ? (
//                 <div className="grid grid-cols-1 gap-8 p-6 text-sm bg-white md:p-8 md:grid-cols-2">
//                   {/* ORIGIN */}
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
//                       <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
//                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
//                         {t("tp_origin_title")}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_sender_name")}
//                       </p>
//                       <p className="font-bold text-gray-900">
//                         {trackingData.origin?.contact_name || "Gycora Store"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_sender_phone")}
//                       </p>
//                       <p className="font-mono text-xs text-gray-700">
//                         {trackingData.origin?.contact_phone || "-"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_sender_address")}
//                       </p>
//                       <p className="text-xs leading-relaxed text-gray-600">
//                         {trackingData.origin?.address || "-"}
//                         <br />
//                         {trackingData.origin?.postal_code && (
//                           <span className="font-bold">
//                             {t("tp_postal_code")}: {trackingData.origin.postal_code}
//                           </span>
//                         )}
//                       </p>
//                     </div>
//                   </div>

//                   {/* DESTINATION */}
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
//                       <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
//                       <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">
//                         {t("tp_dest_title")}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_receiver_name")}
//                       </p>
//                       <p className="font-bold text-gray-900">
//                         {trackingData.destination?.contact_name || "-"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_receiver_phone")}
//                       </p>
//                       <p className="font-mono text-xs text-gray-700">
//                         {trackingData.destination?.contact_phone || "-"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_receiver_address")}
//                       </p>
//                       <p className="text-xs leading-relaxed text-gray-600">
//                         {trackingData.destination?.address || "-"}
//                         <br />
//                         {trackingData.destination?.postal_code && (
//                           <span className="font-bold">
//                             {t("tp_postal_code")}: {trackingData.destination.postal_code}
//                           </span>
//                         )}
//                       </p>
//                     </div>
//                     {trackingData.destination?.note && (
//                       <div>
//                         <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                           {t("tp_courier_note")}
//                         </p>
//                         <p className="p-2 text-xs italic text-gray-500 border rounded bg-gray-50">
//                           "{trackingData.destination.note}"
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="p-6 text-xs italic text-center text-gray-400 bg-white md:p-8">
//                   {t("tp_waiting_location")}
//                 </div>
//               )}
//             </div>

//             {/* ORDER ITEMS SUMMARY */}
//             {orderData.details && orderData.details.length > 0 && (
//               <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
//                 <div className="p-4 border-b border-gray-100 bg-gray-50">
//                   <h3 className="ml-2 text-xs font-bold tracking-widest text-gray-500 uppercase">
//                     {t("tp_item_summary")}
//                   </h3>
//                 </div>

//                 <div className="p-6">
//                   <div className="mb-6 space-y-4">
//                     {orderData.details.map((detail: any) => {
//                       // 👇 [BARU] IDENTIFIKASI BADGE TRACKING PAGE (FORENSIK DB) 👇
//                       const isHistoricallyBundled = checkIsBundledInHistory(detail, orderData, userData?.usertype);
//                       const isWholesaleItem = isWholesaleOrder && Number(detail.product.wholesale_price) > 0 && Math.abs(Number(detail.price) - Number(detail.product.wholesale_price)) < 1;
//                       const isDiscountedItem = !isHistoricallyBundled && !isWholesaleItem && Number(detail.price) < Number(detail.product.price);

//                       return (
//                       <div
//                         key={detail.id}
//                         className="flex items-center gap-4 pb-4 border-b border-gray-50 last:border-0"
//                       >
//                         <img
//                           src={detail.product.image_url}
//                           className="object-cover w-16 h-16 bg-gray-100 border border-gray-100 rounded-lg"
//                         />
//                         <div className="flex-grow">
//                           <h4 className="text-sm font-bold text-gray-900 uppercase">
//                             {detail.product.name}
//                           </h4>
                          
//                           {/* 👇 BADGE HARGA MULTI-LOGIC 👇 */}
//                           <div className="flex flex-wrap gap-1 mt-1 mb-1">
//                             {isHistoricallyBundled ? (
//                               <span className="px-1.5 py-0.5 text-[8px] font-bold text-white bg-purple-600 rounded w-max inline-block" title="Harga Promo Paket">
//                                 BUNDLE
//                               </span>
//                             ) : isWholesaleItem ? (
//                               <span className="px-1.5 py-0.5 text-[8px] font-bold text-white bg-blue-600 rounded w-max inline-block">
//                                 GROSIR
//                               </span>
//                             ) : isDiscountedItem ? (
//                               <span className="px-1.5 py-0.5 text-[8px] font-bold text-white bg-rose-500 rounded w-max inline-block">
//                                 SALE
//                               </span>
//                             ) : null}
//                           </div>

//                           {detail.color && (
//                             <div className="flex items-center gap-1.5 mt-1">
//                               <div
//                                 className="w-3 h-3 border border-gray-300 rounded-full shadow-sm"
//                                 style={{ backgroundColor: detail.color }}
//                                 title={t("tp_variant_title")}
//                               ></div>
//                             </div>
//                           )}
//                           <p className="mt-1 text-xs text-gray-400">
//                             {detail.quantity} x {formatCurrencyDisplay(convertIDRtoActiveCurrency(detail.price))}
//                             {(isHistoricallyBundled || isDiscountedItem) && (
//                               <span className="text-[8px] line-through text-gray-400 ml-1">
//                                 {formatCurrencyDisplay(convertIDRtoActiveCurrency(detail.product.price))}
//                               </span>
//                             )}
//                           </p>
//                         </div>
//                         <p className="text-sm font-bold text-gray-900">
//                           {formatCurrencyDisplay(convertIDRtoActiveCurrency(detail.quantity * detail.price))}
//                         </p>
//                       </div>
//                     )})}
//                   </div>

//                   <div className="pt-4 space-y-2 border-t border-gray-100">
//                     <div className="flex justify-between text-xs text-gray-500">
//                       <span>{t("tp_subtotal")}</span>
//                       <span>{formatCurrencyDisplay(convertIDRtoActiveCurrency(getSubtotal(orderData)))}</span>
//                     </div>
//                     <div className="flex justify-between text-xs text-gray-500">
//                       <span>{t("tp_shipping_cost")}</span>
//                       <span>{formatCurrencyDisplay(convertIDRtoActiveCurrency(orderData.shipping_cost))}</span>
//                     </div>

//                     {orderData.promo_discount > 0 && (
//                       <div className="flex justify-between text-xs font-medium text-emerald-600">
//                         <span>
//                           {t("tp_promo_label")} (
//                           <span className="font-mono uppercase">
//                             {orderData.promo_code}
//                           </span>
//                           )
//                         </span>
//                         <span>- {formatCurrencyDisplay(convertIDRtoActiveCurrency(orderData.promo_discount))}</span>
//                       </div>
//                     )}

//                     {orderData.points_used > 0 && (
//                       <div className="flex justify-between text-xs font-medium text-yellow-600">
//                         <span>
//                           {t("tp_points_redeemed")} ({orderData.points_used} {t("tp_points_unit")})
//                         </span>
//                         <span>
//                           - {formatCurrencyDisplay(convertIDRtoActiveCurrency(orderData.points_used * 1000))}
//                         </span>
//                       </div>
//                     )}

//                     <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200 border-dashed">
//                       <span className="font-bold text-[10px] uppercase tracking-widest text-black">
//                         {t("tp_grand_total")}
//                       </span>
//                       <span className="text-xl font-black text-gycora">
//                         {formatCurrencyDisplay(convertIDRtoActiveCurrency(getGrandTotal(orderData)))}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* LOYALTY REWARD */}
//                 {userData?.is_membership &&
//                 orderData.point > 0 &&
//                 orderData.status === "completed" ? (
//                   <div className="flex items-center justify-between p-4 m-6 border rounded-xl bg-gradient-to-r from-emerald-50 to-white border-emerald-100">
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-10 h-10 text-white rounded-full shadow-sm bg-emerald-500">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       </div>
//                       <div>
//                         <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">
//                           {t("tp_loyalty_reward")}
//                         </p>
//                         <p className="text-xs mt-0.5 text-gray-500">
//                           {t("tp_points_earned")}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <span className="text-2xl font-black text-emerald-600">
//                         +{orderData.point}
//                       </span>
//                       <span className="ml-1 text-xs font-bold text-emerald-800">
//                         {t("tp_points_unit")}
//                       </span>
//                     </div>
//                   </div>
//                 ) : null}
//               </div>
//             )}

//             {/* TRACKING TIMELINE */}
//             <div className="p-6 bg-white border border-gray-100 shadow-sm md:p-8 rounded-3xl">
//               <h3 className="pb-4 mb-6 text-sm font-bold tracking-widest uppercase border-b border-gray-100">
//                 {t("tp_timeline_title")}
//               </h3>

//               <div className="relative ml-3 space-y-8 border-l-2 border-gray-100">
//                 {timelineHistory.map((history: any, index: number) => (
//                   <div key={index} className="relative pl-8">
//                     <span
//                       className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all ${
//                         index === 0
//                           ? "bg-gycora ring-4 ring-emerald-50"
//                           : "bg-gray-300"
//                       }`}
//                     ></span>

//                     <div className={index === 0 ? "opacity-100" : "opacity-50"}>
//                       <p className="mb-1 text-sm font-bold tracking-wide text-gray-900 uppercase">
//                         {formatStatusTitle(history.status)}
//                       </p>
//                       <p className="mb-2 text-xs text-gray-600">
//                         {history.note}
//                       </p>
//                       <p className="font-mono text-[10px] font-medium text-gray-400">
//                         {formatDate(history.updated_at)}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )
//       )}
//     </div>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useMemo, useCallback } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { BASE_URL } from "../../config/api";
// import { useCurrency } from "../../context/CurrencyContext";
// import { useLanguage } from "../../context/LanguageContext";

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

// export default function TrackingPage() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { t, lang } = useLanguage();

//   const { currency, exchangeRates } = useCurrency() as any;

//   const [userData, setUserData] = useState<any>(null);
//   const [orderData, setOrderData] = useState<any>(null);
//   const [trackingData, setTrackingData] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const paymentMethodInfo = location.state?.paymentMethod || "";

//   const getUrlPrefix = () => {
//     if (location.pathname.startsWith("/id")) return "/id";
//     if (location.pathname.startsWith("/en")) return "/en";
//     return "";
//   };
//   const urlPrefix = getUrlPrefix();

//   useEffect(() => {
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) setUserData(JSON.parse(userStr));

//     const fetchAllData = async () => {
//       setIsLoading(true);
//       setError(null);

//       const token = localStorage.getItem("user_token");
//       if (!token) {
//         navigate(`${urlPrefix}/login`);
//         return;
//       }

//       try {
//         const orderRes = await fetch(`${BASE_URL}/api/transactions/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         });
//         if (!orderRes.ok) throw new Error(t("tp_err_fetch_order"));

//         const rawOrderData = await orderRes.json();
//         setOrderData(rawOrderData.data ? rawOrderData.data : rawOrderData);

//         try {
//           const trackRes = await fetch(`${BASE_URL}/api/transactions/${id}/tracking`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               Accept: "application/json",
//             },
//           });
//           if (trackRes.ok) {
//             const rawTrackData = await trackRes.json();
//             setTrackingData(rawTrackData.data ? rawTrackData.data : rawTrackData);
//           }
//         } catch (trackErr) {
//           console.warn("Data pelacakan belum tersedia dari pihak ekspedisi.", trackErr);
//         }
//       } catch (err: any) {
//         setError(err.message || t("tp_err_system"));
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (id) fetchAllData();
//   }, [id, navigate, t, urlPrefix]);

//   const activePaymentMethod = useMemo(() => {
//     if (orderData?.payment_method) return orderData.payment_method;
//     if (paymentMethodInfo) return paymentMethodInfo;
//     return null;
//   }, [orderData, paymentMethodInfo]);

//   const timelineHistory = useMemo(() => {
//     const apiHistory = trackingData?.courier?.history || [];
//     if (apiHistory.length > 0) {
//       return [...apiHistory].reverse();
//     }

//     return [
//       {
//         status: trackingData?.status || orderData?.status || t("tp_stat_processing"),
//         note: getNoteFromStatus(trackingData?.status || orderData?.status),
//         updated_at:
//           trackingData?.delivery?.datetime ||
//           orderData?.created_at ||
//           new Date().toISOString(),
//       },
//     ];
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [trackingData, orderData, t]);

//   const convertIDRtoActiveCurrency = useCallback((idrAmount: number) => {
//     const curr = (currency as Currency) || "IDR";
//     if (curr === "IDR" || !exchangeRates || !exchangeRates[curr])
//       return { value: idrAmount, curr: "IDR" };
//     return { value: idrAmount * exchangeRates[curr], curr: curr };
//   }, [currency, exchangeRates]);

//   const formatCurrencyDisplay = useCallback((priceObj: { value: number; curr: string } | null) => {
//     if (!priceObj) return "";
//     const symbols: any = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
//     const formatter = new Intl.NumberFormat(
//       priceObj.curr === "IDR" ? "id-ID" : "en-US",
//       {
//         minimumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//         maximumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//       },
//     );
//     return `${symbols[priceObj.curr] || priceObj.curr + " "}${formatter.format(priceObj.value)}`;
//   }, []);

//   const getSubtotal = (order: any) => order.total_amount;
//   const getOrderQuantity = (order: any) => order.details.reduce((sum: number, item: any) => sum + item.quantity, 0);

//   const getGrandTotal = (order: any) => {
//     if (!order) return 0;
//     const total = parseFloat(order.total_amount || 0);
//     const shipping = parseFloat(order.shipping_cost || 0);
//     const promo = parseFloat(order.promo_discount || 0);
//     const pointsDiscount = (order.points_used || 0) * 1000;
//     return total + shipping - promo - pointsDiscount;
//   };

//   // ============================================================================
//   // 👇 LOGIKA FORENSIK HARGA HISTORY (ANTI-BUG) 👇
//   // ============================================================================
//   const checkIsBundledInHistory = useCallback((detail: any, order: any, userType: string) => {
//     const prod = detail.product;
//     if (!prod) return false;

//     // 1. FILTER WAKTU ABSOLUT (Sistem Bundle baru di-deploy 23 Juli 2026, 17:00 WIB)
//     const orderDate = new Date(order.created_at).getTime();
//     const launchDate = new Date("2026-07-23T17:00:00+07:00").getTime();
//     if (orderDate < launchDate) return false;

//     // 2. FILTER KOMPOSISI (Harus ada Driver(EGB) dan Partner(Non-EGB) di order ini)
//     const hasDriver = order.details.some((d: any) => (d.product?.sku || "").toUpperCase().startsWith("EGB"));
//     const hasPartner = order.details.some((d: any) => !(d.product?.sku || "").toUpperCase().startsWith("EGB"));
//     if (!hasDriver || !hasPartner) return false;

//     // 3. FILTER HARGA (Memastikan yang dibayar BUKAN harga normal/diskon standar)
//     const paidPrice = Number(detail.price);
//     const normalPrice = Number(prod.price) || 0;
//     const discPrice = Number(prod.discount_price) || 0;
//     const wholesalePrice = Number(prod.wholesale_price) || 0;

//     const orderTotalQty = getOrderQuantity(order);
//     const isWholesaleOrder = userType === "reseller" && orderTotalQty >= 24;

//     if (Math.abs(paidPrice - normalPrice) < 1) return false;
//     if (discPrice > 0 && Math.abs(paidPrice - discPrice) < 1) return false;
//     if (isWholesaleOrder && wholesalePrice > 0 && Math.abs(paidPrice - wholesalePrice) < 1) return false;

//     return true; 
//   }, []);
//   // ============================================================================

//   const getCourierLogo = (company: string) => {
//     if (!company) return null;
//     const map: Record<string, string> = {
//       jne: "jne.png", sicepat: "sicepat.png", jnt: "jnt.png",
//       anteraja: "anteraja.png", gojek: "gojek.png", grab: "grab.png",
//       paxel: "paxel.png", ninja: "ninja.png",
//     };
//     return map[company.toLowerCase()] ? "/courier_images/" + map[company.toLowerCase()] : null;
//   };

//   const getPaymentLogo = (methodString: string) => {
//     if (!methodString) return null;
//     const channel = methodString.split(" ")[1]?.toLowerCase();
//     const map: Record<string, string> = {
//       bca: "bca.png", bni: "bni.png", bri: "bri.png", mandiri: "mandiri.png",
//       bsi: "bsi.png", permata: "permata.png", ovo: "ovo.png", dana: "dana.png",
//       linkaja: "linkaja.png", shopeepay: "shopeepay.png", alfamart: "alfamart.png",
//       indomaret: "indomaret.png", qris: "qris.png",
//     };
//     return map[channel] ? "/payment_images/" + map[channel] : null;
//   };

//   const formatStatusTitle = (status: string) => {
//     if (!status) return t("tp_stat_processing");
//     const formatted = status.replace(/_/g, " ");
//     return formatted.charAt(0).toUpperCase() + formatted.slice(1);
//   };

//   const formatDate = (dateString: string) => {
//     if (!dateString) return "-";
//     return new Date(dateString).toLocaleDateString(
//       lang === "id" ? "id-ID" : "en-US",
//       {
//         weekday: "long", year: "numeric", month: "short",
//         day: "numeric", hour: "2-digit", minute: "2-digit",
//       },
//     );
//   };

//   function getNoteFromStatus(status: string) {
//     const map: Record<string, string> = {
//       pending: t("tp_note_pending"), placed: t("tp_note_placed"),
//       allocated: t("tp_note_allocated"), picking_up: t("tp_note_picking_up"),
//       picked: t("tp_note_picked"), dropping_off: t("tp_note_dropping_off"),
//       delivered: t("tp_note_delivered"), rejected: t("tp_note_rejected"),
//       cancelled: t("tp_note_cancelled"),
//     };
//     return map[status] || t("tp_note_default");
//   }

//   const orderTotalQty = orderData ? getOrderQuantity(orderData) : 0;
//   const isWholesaleOrder = userData?.usertype === "reseller" && orderTotalQty >= 24;

//   return (
//     <div className="w-full min-h-screen px-6 py-20 font-sans md:px-12 lg:px-20 animate-fade-in">
//       {/* HEADER */}
//       <div className="flex flex-col gap-4 mb-8 md:flex-row md:justify-between md:items-center">
//         <div>
//           <button
//             onClick={() => navigate(`${urlPrefix}/orders`)}
//             className="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest text-gray-500 uppercase transition hover:text-gray-900"
//           >
//             <span>&larr;</span> {t("tp_back_to_orders")}
//           </button>
//           <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 uppercase md:text-4xl">
//             {t("tp_title")}
//           </h1>
//         </div>
//       </div>

//       {/* STATE: LOADING */}
//       {isLoading ? (
//         <div className="flex flex-col items-center justify-center py-20">
//           <div className="w-10 h-10 border-4 border-gray-100 rounded-full border-t-gycora animate-spin"></div>
//           <p className="mt-4 text-xs font-bold tracking-widest text-gray-400 uppercase animate-pulse">
//             {t("tp_loading_details")}
//           </p>
//         </div>
//       ) : /* STATE: ERROR */
//       error ? (
//         <div className="p-8 text-center border border-red-100 bg-red-50 rounded-2xl">
//           <p className="font-bold text-red-600">{error}</p>
//         </div>
//       ) : (
//         /* STATE: SUCCESS */
//         orderData && (
//           <div className="space-y-6 animate-fade-in">
//             {/* TRACKING CARD TOP */}
//             <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
//               <div className="flex flex-col items-start justify-between gap-6 p-6 border-b border-gray-100 bg-gray-50 md:p-8 md:flex-row md:items-center">
//                 <div>
//                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
//                     {t("tp_waybill_title")}
//                   </p>
//                   <p className="font-mono text-xl font-bold text-black">
//                     {trackingData?.courier?.waybill_id ||
//                       orderData.tracking_number ||
//                       t("tp_waiting_waybill")}
//                   </p>
//                   <div className="flex flex-wrap items-center gap-3 mt-3">
//                     <span className="bg-gray-900 text-white px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest">
//                       {formatStatusTitle(
//                         trackingData?.status || orderData.status,
//                       )}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-center w-full gap-6 md:w-auto">
//                   {/* PAYMENT INFO */}
//                   {activePaymentMethod && (
//                     <div className="flex flex-col items-start md:items-end">
//                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
//                         {t("tp_payment_title")}
//                       </p>
//                       <div className="flex items-center gap-3">
//                         <div className="flex items-center justify-center w-10 h-6 overflow-hidden bg-white border border-gray-200 rounded shrink-0">
//                           {getPaymentLogo(activePaymentMethod) ? (
//                             <img
//                               src={getPaymentLogo(activePaymentMethod)!}
//                               className="object-contain w-full h-full p-0.5"
//                             />
//                           ) : (
//                             <span className="font-black text-gray-300 text-[8px]">
//                               {activePaymentMethod.split(" ")[1] || "PAY"}
//                             </span>
//                           )}
//                         </div>
//                         <p className="text-xs font-bold uppercase text-gycora">
//                           {activePaymentMethod.replace("_", " ")}
//                         </p>
//                       </div>
//                     </div>
//                   )}

//                   <div className="hidden w-px h-8 bg-gray-200 md:block"></div>

//                   {/* COURIER INFO */}
//                   <div className="flex flex-col items-start md:items-end">
//                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
//                       {t("tp_courier_title")}
//                     </p>
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-8 h-8 overflow-hidden bg-white border border-gray-200 rounded-lg shrink-0">
//                         {getCourierLogo(
//                           trackingData?.courier?.company ||
//                             orderData.courier_company,
//                         ) ? (
//                           <img
//                             src={
//                               getCourierLogo(
//                                 trackingData?.courier?.company ||
//                                   orderData.courier_company,
//                               )!
//                             }
//                             className="object-contain w-full h-full p-1"
//                           />
//                         ) : (
//                           <span className="font-black text-gray-300 text-[8px]">
//                             {trackingData?.courier?.company?.toUpperCase() ||
//                               orderData.courier_company?.toUpperCase() ||
//                               t("tp_courier_na")}
//                           </span>
//                         )}
//                       </div>
//                       <div className="text-left md:text-right">
//                         <p className="text-xs font-bold text-gray-800 uppercase">
//                           {trackingData?.courier?.company ||
//                             orderData.courier_company}
//                         </p>
//                         <p className="text-[10px] text-gray-500 font-bold uppercase mt-0.5">
//                           {trackingData?.courier?.type ||
//                             orderData.courier_type}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* ADDRESS DETAILS */}
//               {trackingData ? (
//                 <div className="grid grid-cols-1 gap-8 p-6 text-sm bg-white md:p-8 md:grid-cols-2">
//                   {/* ORIGIN */}
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
//                       <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
//                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
//                         {t("tp_origin_title")}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_sender_name")}
//                       </p>
//                       <p className="font-bold text-gray-900">
//                         {trackingData.origin?.contact_name || "Gycora Store"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_sender_phone")}
//                       </p>
//                       <p className="font-mono text-xs text-gray-700">
//                         {trackingData.origin?.contact_phone || "-"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_sender_address")}
//                       </p>
//                       <p className="text-xs leading-relaxed text-gray-600">
//                         {trackingData.origin?.address || "-"}
//                         <br />
//                         {trackingData.origin?.postal_code && (
//                           <span className="font-bold">
//                             {t("tp_postal_code")}: {trackingData.origin.postal_code}
//                           </span>
//                         )}
//                       </p>
//                     </div>
//                   </div>

//                   {/* DESTINATION */}
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
//                       <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
//                       <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">
//                         {t("tp_dest_title")}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_receiver_name")}
//                       </p>
//                       <p className="font-bold text-gray-900">
//                         {trackingData.destination?.contact_name || "-"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_receiver_phone")}
//                       </p>
//                       <p className="font-mono text-xs text-gray-700">
//                         {trackingData.destination?.contact_phone || "-"}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                         {t("tp_receiver_address")}
//                       </p>
//                       <p className="text-xs leading-relaxed text-gray-600">
//                         {trackingData.destination?.address || "-"}
//                         <br />
//                         {trackingData.destination?.postal_code && (
//                           <span className="font-bold">
//                             {t("tp_postal_code")}: {trackingData.destination.postal_code}
//                           </span>
//                         )}
//                       </p>
//                     </div>
//                     {trackingData.destination?.note && (
//                       <div>
//                         <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                           {t("tp_courier_note")}
//                         </p>
//                         <p className="p-2 text-xs italic text-gray-500 border rounded bg-gray-50">
//                           "{trackingData.destination.note}"
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="p-6 text-xs italic text-center text-gray-400 bg-white md:p-8">
//                   {t("tp_waiting_location")}
//                 </div>
//               )}
//             </div>

//             {/* ORDER ITEMS SUMMARY */}
//             {orderData.details && orderData.details.length > 0 && (
//               <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
//                 <div className="p-4 border-b border-gray-100 bg-gray-50">
//                   <h3 className="ml-2 text-xs font-bold tracking-widest text-gray-500 uppercase">
//                     {t("tp_item_summary")}
//                   </h3>
//                 </div>

//                 <div className="p-6">
//                   <div className="mb-6 space-y-4">
//                     {orderData.details.map((detail: any) => {
//                       // 👇 [BARU] IDENTIFIKASI BADGE TRACKING PAGE (FORENSIK DB) 👇
//                       const isHistoricallyBundled = checkIsBundledInHistory(detail, orderData, userData?.usertype);
//                       const isWholesaleItem = isWholesaleOrder && Number(detail.product.wholesale_price) > 0 && Math.abs(Number(detail.price) - Number(detail.product.wholesale_price)) < 1;
//                       const isDiscountedItem = !isHistoricallyBundled && !isWholesaleItem && Number(detail.price) < Number(detail.product.price);

//                       return (
//                       <div
//                         key={detail.id}
//                         className="flex items-center gap-4 pb-4 border-b border-gray-50 last:border-0"
//                       >
//                         <img
//                           src={detail.product.image_url}
//                           className="object-cover w-16 h-16 bg-gray-100 border border-gray-100 rounded-lg"
//                         />
//                         <div className="flex-grow">
//                           <h4 className="text-sm font-bold text-gray-900 uppercase">
//                             {detail.product.name}
//                           </h4>
                          
//                           {/* 👇 BADGE HARGA MULTI-LOGIC 👇 */}
//                           <div className="flex flex-wrap gap-1 mt-1 mb-1">
//                             {isHistoricallyBundled ? (
//                               <span className="px-1.5 py-0.5 text-[8px] font-bold text-white bg-purple-600 rounded w-max inline-block" title="Harga Promo Paket">
//                                 BUNDLE
//                               </span>
//                             ) : isWholesaleItem ? (
//                               <span className="px-1.5 py-0.5 text-[8px] font-bold text-white bg-blue-600 rounded w-max inline-block">
//                                 GROSIR
//                               </span>
//                             ) : isDiscountedItem ? (
//                               <span className="px-1.5 py-0.5 text-[8px] font-bold text-white bg-rose-500 rounded w-max inline-block">
//                                 SALE
//                               </span>
//                             ) : null}
//                           </div>

//                           {detail.color && (
//                             <div className="flex items-center gap-1.5 mt-1">
//                               <div
//                                 className="w-3 h-3 border border-gray-300 rounded-full shadow-sm"
//                                 style={{ backgroundColor: detail.color }}
//                                 title={t("tp_variant_title")}
//                               ></div>
//                             </div>
//                           )}
//                           <p className="mt-1 text-xs text-gray-400">
//                             {detail.quantity} x {formatCurrencyDisplay(convertIDRtoActiveCurrency(detail.price))}
//                             {(isHistoricallyBundled || isDiscountedItem) && (
//                               <span className="text-[8px] line-through text-gray-400 ml-1">
//                                 {formatCurrencyDisplay(convertIDRtoActiveCurrency(detail.product.price))}
//                               </span>
//                             )}
//                           </p>
//                         </div>
//                         <p className="text-sm font-bold text-gray-900">
//                           {formatCurrencyDisplay(convertIDRtoActiveCurrency(detail.quantity * detail.price))}
//                         </p>
//                       </div>
//                     )})}
//                   </div>

//                   <div className="pt-4 space-y-2 border-t border-gray-100">
//                     <div className="flex justify-between text-xs text-gray-500">
//                       <span>{t("tp_subtotal")}</span>
//                       <span>{formatCurrencyDisplay(convertIDRtoActiveCurrency(getSubtotal(orderData)))}</span>
//                     </div>
//                     <div className="flex justify-between text-xs text-gray-500">
//                       <span>{t("tp_shipping_cost")}</span>
//                       <span>{formatCurrencyDisplay(convertIDRtoActiveCurrency(orderData.shipping_cost))}</span>
//                     </div>

//                     {orderData.promo_discount > 0 && (
//                       <div className="flex justify-between text-xs font-medium text-emerald-600">
//                         <span>
//                           {t("tp_promo_label")} (
//                           <span className="font-mono uppercase">
//                             {orderData.promo_code}
//                           </span>
//                           )
//                         </span>
//                         <span>- {formatCurrencyDisplay(convertIDRtoActiveCurrency(orderData.promo_discount))}</span>
//                       </div>
//                     )}

//                     {orderData.points_used > 0 && (
//                       <div className="flex justify-between text-xs font-medium text-yellow-600">
//                         <span>
//                           {t("tp_points_redeemed")} ({orderData.points_used} {t("tp_points_unit")})
//                         </span>
//                         <span>
//                           - {formatCurrencyDisplay(convertIDRtoActiveCurrency(orderData.points_used * 1000))}
//                         </span>
//                       </div>
//                     )}

//                     <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200 border-dashed">
//                       <span className="font-bold text-[10px] uppercase tracking-widest text-black">
//                         {t("tp_grand_total")}
//                       </span>
//                       <span className="text-xl font-black text-gycora">
//                         {formatCurrencyDisplay(convertIDRtoActiveCurrency(getGrandTotal(orderData)))}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* LOYALTY REWARD */}
//                 {userData?.is_membership &&
//                 orderData.point > 0 &&
//                 orderData.status === "completed" ? (
//                   <div className="flex items-center justify-between p-4 m-6 border rounded-xl bg-gradient-to-r from-emerald-50 to-white border-emerald-100">
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-10 h-10 text-white rounded-full shadow-sm bg-emerald-500">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       </div>
//                       <div>
//                         <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">
//                           {t("tp_loyalty_reward")}
//                         </p>
//                         <p className="text-xs mt-0.5 text-gray-500">
//                           {t("tp_points_earned")}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <span className="text-2xl font-black text-emerald-600">
//                         +{orderData.point}
//                       </span>
//                       <span className="ml-1 text-xs font-bold text-emerald-800">
//                         {t("tp_points_unit")}
//                       </span>
//                     </div>
//                   </div>
//                 ) : null}
//               </div>
//             )}

//             {/* TRACKING TIMELINE */}
//             <div className="p-6 bg-white border border-gray-100 shadow-sm md:p-8 rounded-3xl">
//               <h3 className="pb-4 mb-6 text-sm font-bold tracking-widest uppercase border-b border-gray-100">
//                 {t("tp_timeline_title")}
//               </h3>

//               <div className="relative ml-3 space-y-8 border-l-2 border-gray-100">
//                 {timelineHistory.map((history: any, index: number) => (
//                   <div key={index} className="relative pl-8">
//                     <span
//                       className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all ${
//                         index === 0
//                           ? "bg-gycora ring-4 ring-emerald-50"
//                           : "bg-gray-300"
//                       }`}
//                     ></span>

//                     <div className={index === 0 ? "opacity-100" : "opacity-50"}>
//                       <p className="mb-1 text-sm font-bold tracking-wide text-gray-900 uppercase">
//                         {formatStatusTitle(history.status)}
//                       </p>
//                       <p className="mb-2 text-xs text-gray-600">
//                         {history.note}
//                       </p>
//                       <p className="font-mono text-[10px] font-medium text-gray-400">
//                         {formatDate(history.updated_at)}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )
//       )}
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../../config/api";
import { useCurrency } from "../../context/CurrencyContext";
import { useLanguage } from "../../context/LanguageContext";

type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

export default function TrackingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, lang } = useLanguage();

  const { currency, exchangeRates } = useCurrency() as any;

  const [userData, setUserData] = useState<any>(null);
  const [orderData, setOrderData] = useState<any>(null);
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const paymentMethodInfo = location.state?.paymentMethod || "";

  const getUrlPrefix = () => {
    if (location.pathname.startsWith("/id")) return "/id";
    if (location.pathname.startsWith("/en")) return "/en";
    return "";
  };
  const urlPrefix = getUrlPrefix();

  useEffect(() => {
    const userStr = localStorage.getItem("user_data");
    if (userStr) setUserData(JSON.parse(userStr));

    const fetchAllData = async () => {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem("user_token");
      if (!token) {
        navigate(`${urlPrefix}/login`);
        return;
      }

      try {
        const orderRes = await fetch(`${BASE_URL}/api/transactions/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        if (!orderRes.ok) throw new Error(t("tp_err_fetch_order"));

        const rawOrderData = await orderRes.json();
        setOrderData(rawOrderData.data ? rawOrderData.data : rawOrderData);

        try {
          const trackRes = await fetch(`${BASE_URL}/api/transactions/${id}/tracking`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });
          if (trackRes.ok) {
            const rawTrackData = await trackRes.json();
            setTrackingData(rawTrackData.data ? rawTrackData.data : rawTrackData);
          }
        } catch (trackErr) {
          console.warn("Data pelacakan belum tersedia dari pihak ekspedisi.", trackErr);
        }
      } catch (err: any) {
        setError(err.message || t("tp_err_system"));
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchAllData();
  }, [id, navigate, t, urlPrefix]);

  const activePaymentMethod = useMemo(() => {
    if (orderData?.payment_method) return orderData.payment_method;
    if (paymentMethodInfo) return paymentMethodInfo;
    return null;
  }, [orderData, paymentMethodInfo]);

  const timelineHistory = useMemo(() => {
    const apiHistory = trackingData?.courier?.history || [];
    if (apiHistory.length > 0) {
      return [...apiHistory].reverse();
    }

    return [
      {
        status: trackingData?.status || orderData?.status || t("tp_stat_processing"),
        note: getNoteFromStatus(trackingData?.status || orderData?.status),
        updated_at:
          trackingData?.delivery?.datetime ||
          orderData?.created_at ||
          new Date().toISOString(),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackingData, orderData, t]);

  const convertIDRtoActiveCurrency = useCallback((idrAmount: number) => {
    const curr = (currency as Currency) || "IDR";
    if (curr === "IDR" || !exchangeRates || !exchangeRates[curr])
      return { value: idrAmount, curr: "IDR" };
    return { value: idrAmount * exchangeRates[curr], curr: curr };
  }, [currency, exchangeRates]);

  const formatCurrencyDisplay = useCallback((priceObj: { value: number; curr: string } | null) => {
    if (!priceObj) return "";
    const symbols: any = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
    const formatter = new Intl.NumberFormat(
      priceObj.curr === "IDR" ? "id-ID" : "en-US",
      {
        minimumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
        maximumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
      },
    );
    return `${symbols[priceObj.curr] || priceObj.curr + " "}${formatter.format(priceObj.value)}`;
  }, []);

  const getSubtotal = (order: any) => order.total_amount;
  const getOrderQuantity = (order: any) => order.details.reduce((sum: number, item: any) => sum + item.quantity, 0);

  const getGrandTotal = (order: any) => {
    if (!order) return 0;
    const total = parseFloat(order.total_amount || 0);
    const shipping = parseFloat(order.shipping_cost || 0);
    const promo = parseFloat(order.promo_discount || 0);
    const pointsDiscount = (order.points_used || 0) * 1000;
    return total + shipping - promo - pointsDiscount;
  };

  // ============================================================================
  // 👇 LOGIKA FORENSIK HARGA HISTORY (MEMBACA MATEMATIKA ASLI DB & TANGGAL MULAI) 👇
  // ============================================================================
  const checkIsBundledInHistory = useCallback((detail: any, order: any) => {
    const prod = detail.product;
    if (!prod) return false;

    // 1. FILTER WAKTU (Rentang Waktu Bundle)
    let isWithinTimeframe = true;
    const orderDate = new Date(order.created_at).getTime();

    // Cek Start Date
    if (prod.bundle_start_date && prod.bundle_start_date !== "0000-00-00 00:00:00") {
      const startDate = new Date(prod.bundle_start_date.replace(" ", "T")).getTime();
      if (orderDate < startDate) isWithinTimeframe = false;
    } else {
      // Fallback: Jika tidak ada start date, kita anggap rilis fitur pada tgl 20 Juli 2026
      const fallbackLaunchDate = new Date("2026-07-20T00:00:00Z").getTime();
      if (orderDate < fallbackLaunchDate) isWithinTimeframe = false;
    }

    // Cek End Date
    if (isWithinTimeframe && prod.bundle_end_date && prod.bundle_end_date !== "0000-00-00 00:00:00") {
      const endDate = new Date(prod.bundle_end_date.replace(" ", "T")).getTime();
      if (orderDate > endDate) isWithinTimeframe = false;
    }

    if (!isWithinTimeframe) return false;

    // 2. FILTER MATEMATIKA ANTI-BUG
    const paidPrice = Number(detail.price);
    const normalPrice = Number(prod.price) || 0;
    const discPrice = Number(prod.discount_price) || 0;

    // Jika user bayar seharga normal atau harga diskon biasa, PASTI BUKAN BUNDLE!
    if (Math.abs(paidPrice - normalPrice) < 1) return false;
    if (discPrice > 0 && Math.abs(paidPrice - discPrice) < 1) return false;

    // 3. FILTER KOMPOSISI SYARAT BUNDLE (Ada EGB + Kategori Lain)
    const hasDriver = order.details.some((d: any) => (d.product?.sku || "").toUpperCase().startsWith("EGB"));
    const hasPartner = order.details.some((d: any) => !(d.product?.sku || "").toUpperCase().startsWith("EGB"));
    if (!hasDriver || !hasPartner) return false;

    // 4. PENCOCOKAN PEMBAGIAN HARGA BUNDLE
    let isMatchedWithBundleSplit = false;
    order.details.forEach((d: any) => {
      const p = d.product;
      if (p && (p.sku || "").toUpperCase().startsWith("EGB")) {
        const currentBundlePrice = Number(p.bundle_price) || 0;
        if (currentBundlePrice > 0) {
          const splitPrice = currentBundlePrice / 2;
          if (Math.abs(paidPrice - splitPrice) < 1) {
            isMatchedWithBundleSplit = true;
          }
        }
      }
    });

    return isMatchedWithBundleSplit;
  }, []);
  // ============================================================================

  const getCourierLogo = (company: string) => {
    if (!company) return null;
    const map: Record<string, string> = {
      jne: "jne.png", sicepat: "sicepat.png", jnt: "jnt.png",
      anteraja: "anteraja.png", gojek: "gojek.png", grab: "grab.png",
      paxel: "paxel.png", ninja: "ninja.png",
    };
    return map[company.toLowerCase()] ? "/courier_images/" + map[company.toLowerCase()] : null;
  };

  const getPaymentLogo = (methodString: string) => {
    if (!methodString) return null;
    const channel = methodString.split(" ")[1]?.toLowerCase();
    const map: Record<string, string> = {
      bca: "bca.png", bni: "bni.png", bri: "bri.png", mandiri: "mandiri.png",
      bsi: "bsi.png", permata: "permata.png", ovo: "ovo.png", dana: "dana.png",
      linkaja: "linkaja.png", shopeepay: "shopeepay.png", alfamart: "alfamart.png",
      indomaret: "indomaret.png", qris: "qris.png",
    };
    return map[channel] ? "/payment_images/" + map[channel] : null;
  };

  const formatStatusTitle = (status: string) => {
    if (!status) return t("tp_stat_processing");
    const formatted = status.replace(/_/g, " ");
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString(
      lang === "id" ? "id-ID" : "en-US",
      {
        weekday: "long", year: "numeric", month: "short",
        day: "numeric", hour: "2-digit", minute: "2-digit",
      },
    );
  };

  function getNoteFromStatus(status: string) {
    const map: Record<string, string> = {
      pending: t("tp_note_pending"), placed: t("tp_note_placed"),
      allocated: t("tp_note_allocated"), picking_up: t("tp_note_picking_up"),
      picked: t("tp_note_picked"), dropping_off: t("tp_note_dropping_off"),
      delivered: t("tp_note_delivered"), rejected: t("tp_note_rejected"),
      cancelled: t("tp_note_cancelled"),
    };
    return map[status] || t("tp_note_default");
  }

  const orderTotalQty = orderData ? getOrderQuantity(orderData) : 0;
  const isWholesaleOrder = userData?.usertype === "reseller" && orderTotalQty >= 24;

  return (
    <div className="w-full min-h-screen px-6 py-20 font-sans md:px-12 lg:px-20 animate-fade-in">
      {/* HEADER */}
      <div className="flex flex-col gap-4 mb-8 md:flex-row md:justify-between md:items-center">
        <div>
          <button
            onClick={() => navigate(`${urlPrefix}/orders`)}
            className="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest text-gray-500 uppercase transition hover:text-gray-900"
          >
            <span>&larr;</span> {t("tp_back_to_orders")}
          </button>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 uppercase md:text-4xl">
            {t("tp_title")}
          </h1>
        </div>
      </div>

      {/* STATE: LOADING */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-gray-100 rounded-full border-t-gycora animate-spin"></div>
          <p className="mt-4 text-xs font-bold tracking-widest text-gray-400 uppercase animate-pulse">
            {t("tp_loading_details")}
          </p>
        </div>
      ) : /* STATE: ERROR */
      error ? (
        <div className="p-8 text-center border border-red-100 bg-red-50 rounded-2xl">
          <p className="font-bold text-red-600">{error}</p>
        </div>
      ) : (
        /* STATE: SUCCESS */
        orderData && (
          <div className="space-y-6 animate-fade-in">
            {/* TRACKING CARD TOP */}
            <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
              <div className="flex flex-col items-start justify-between gap-6 p-6 border-b border-gray-100 bg-gray-50 md:p-8 md:flex-row md:items-center">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    {t("tp_waybill_title")}
                  </p>
                  <p className="font-mono text-xl font-bold text-black">
                    {trackingData?.courier?.waybill_id ||
                      orderData.tracking_number ||
                      t("tp_waiting_waybill")}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <span className="bg-gray-900 text-white px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest">
                      {formatStatusTitle(
                        trackingData?.status || orderData.status,
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex items-center w-full gap-6 md:w-auto">
                  {/* PAYMENT INFO */}
                  {activePaymentMethod && (
                    <div className="flex flex-col items-start md:items-end">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                        {t("tp_payment_title")}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-6 overflow-hidden bg-white border border-gray-200 rounded shrink-0">
                          {getPaymentLogo(activePaymentMethod) ? (
                            <img
                              src={getPaymentLogo(activePaymentMethod)!}
                              className="object-contain w-full h-full p-0.5"
                            />
                          ) : (
                            <span className="font-black text-gray-300 text-[8px]">
                              {activePaymentMethod.split(" ")[1] || "PAY"}
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-bold uppercase text-gycora">
                          {activePaymentMethod.replace("_", " ")}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="hidden w-px h-8 bg-gray-200 md:block"></div>

                  {/* COURIER INFO */}
                  <div className="flex flex-col items-start md:items-end">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                      {t("tp_courier_title")}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 overflow-hidden bg-white border border-gray-200 rounded-lg shrink-0">
                        {getCourierLogo(
                          trackingData?.courier?.company ||
                            orderData.courier_company,
                        ) ? (
                          <img
                            src={
                              getCourierLogo(
                                trackingData?.courier?.company ||
                                  orderData.courier_company,
                              )!
                            }
                            className="object-contain w-full h-full p-1"
                          />
                        ) : (
                          <span className="font-black text-gray-300 text-[8px]">
                            {trackingData?.courier?.company?.toUpperCase() ||
                              orderData.courier_company?.toUpperCase() ||
                              t("tp_courier_na")}
                          </span>
                        )}
                      </div>
                      <div className="text-left md:text-right">
                        <p className="text-xs font-bold text-gray-800 uppercase">
                          {trackingData?.courier?.company ||
                            orderData.courier_company}
                        </p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase mt-0.5">
                          {trackingData?.courier?.type ||
                            orderData.courier_type}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ADDRESS DETAILS */}
              {trackingData ? (
                <div className="grid grid-cols-1 gap-8 p-6 text-sm bg-white md:p-8 md:grid-cols-2">
                  {/* ORIGIN */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
                      <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {t("tp_origin_title")}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                        {t("tp_sender_name")}
                      </p>
                      <p className="font-bold text-gray-900">
                        {trackingData.origin?.contact_name || "Gycora Store"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                        {t("tp_sender_phone")}
                      </p>
                      <p className="font-mono text-xs text-gray-700">
                        {trackingData.origin?.contact_phone || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                        {t("tp_sender_address")}
                      </p>
                      <p className="text-xs leading-relaxed text-gray-600">
                        {trackingData.origin?.address || "-"}
                        <br />
                        {trackingData.origin?.postal_code && (
                          <span className="font-bold">
                            {t("tp_postal_code")}: {trackingData.origin.postal_code}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* DESTINATION */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
                      <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
                      <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">
                        {t("tp_dest_title")}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                        {t("tp_receiver_name")}
                      </p>
                      <p className="font-bold text-gray-900">
                        {trackingData.destination?.contact_name || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                        {t("tp_receiver_phone")}
                      </p>
                      <p className="font-mono text-xs text-gray-700">
                        {trackingData.destination?.contact_phone || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                        {t("tp_receiver_address")}
                      </p>
                      <p className="text-xs leading-relaxed text-gray-600">
                        {trackingData.destination?.address || "-"}
                        <br />
                        {trackingData.destination?.postal_code && (
                          <span className="font-bold">
                            {t("tp_postal_code")}: {trackingData.destination.postal_code}
                          </span>
                        )}
                      </p>
                    </div>
                    {trackingData.destination?.note && (
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                          {t("tp_courier_note")}
                        </p>
                        <p className="p-2 text-xs italic text-gray-500 border rounded bg-gray-50">
                          "{trackingData.destination.note}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-6 text-xs italic text-center text-gray-400 bg-white md:p-8">
                  {t("tp_waiting_location")}
                </div>
              )}
            </div>

            {/* ORDER ITEMS SUMMARY */}
            {orderData.details && orderData.details.length > 0 && (
              <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                  <h3 className="ml-2 text-xs font-bold tracking-widest text-gray-500 uppercase">
                    {t("tp_item_summary")}
                  </h3>
                </div>

                <div className="p-6">
                  <div className="mb-6 space-y-4">
                    {orderData.details.map((detail: any) => {
                      // 👇 [BARU] IDENTIFIKASI BADGE TRACKING PAGE (FORENSIK DB BEBAS TS6133) 👇
                      const isHistoricallyBundled = checkIsBundledInHistory(detail, orderData);
                      const isWholesaleItem = isWholesaleOrder && Number(detail.product.wholesale_price) > 0 && Math.abs(Number(detail.price) - Number(detail.product.wholesale_price)) < 1;
                      const isDiscountedItem = !isHistoricallyBundled && !isWholesaleItem && Number(detail.price) < Number(detail.product.price);

                      return (
                      <div
                        key={detail.id}
                        className="flex items-center gap-4 pb-4 border-b border-gray-50 last:border-0"
                      >
                        <img
                          src={detail.product.image_url}
                          className="object-cover w-16 h-16 bg-gray-100 border border-gray-100 rounded-lg"
                        />
                        <div className="flex-grow">
                          <h4 className="text-sm font-bold text-gray-900 uppercase">
                            {detail.product.name}
                          </h4>
                          
                          {/* 👇 BADGE HARGA MULTI-LOGIC 👇 */}
                          <div className="flex flex-wrap gap-1 mt-1 mb-1">
                            {isHistoricallyBundled ? (
                              <span className="px-1.5 py-0.5 text-[8px] font-bold text-white bg-purple-600 rounded w-max inline-block" title="Harga Promo Paket">
                                BUNDLE
                              </span>
                            ) : isWholesaleItem ? (
                              <span className="px-1.5 py-0.5 text-[8px] font-bold text-white bg-blue-600 rounded w-max inline-block">
                                GROSIR
                              </span>
                            ) : isDiscountedItem ? (
                              <span className="px-1.5 py-0.5 text-[8px] font-bold text-white bg-rose-500 rounded w-max inline-block">
                                SALE
                              </span>
                            ) : null}
                          </div>

                          {detail.color && (
                            <div className="flex items-center gap-1.5 mt-1">
                              <div
                                className="w-3 h-3 border border-gray-300 rounded-full shadow-sm"
                                style={{ backgroundColor: detail.color }}
                                title={t("tp_variant_title")}
                              ></div>
                            </div>
                          )}
                          <p className="mt-1 text-xs text-gray-400">
                            {detail.quantity} x {formatCurrencyDisplay(convertIDRtoActiveCurrency(detail.price))}
                            {(isHistoricallyBundled || isDiscountedItem) && (
                              <span className="text-[8px] line-through text-gray-400 ml-1">
                                {formatCurrencyDisplay(convertIDRtoActiveCurrency(detail.product.price))}
                              </span>
                            )}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-gray-900">
                          {formatCurrencyDisplay(convertIDRtoActiveCurrency(detail.quantity * detail.price))}
                        </p>
                      </div>
                    )})}
                  </div>

                  <div className="pt-4 space-y-2 border-t border-gray-100">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{t("tp_subtotal")}</span>
                      <span>{formatCurrencyDisplay(convertIDRtoActiveCurrency(getSubtotal(orderData)))}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{t("tp_shipping_cost")}</span>
                      <span>{formatCurrencyDisplay(convertIDRtoActiveCurrency(orderData.shipping_cost))}</span>
                    </div>

                    {orderData.promo_discount > 0 && (
                      <div className="flex justify-between text-xs font-medium text-emerald-600">
                        <span>
                          {t("tp_promo_label")} (
                          <span className="font-mono uppercase">
                            {orderData.promo_code}
                          </span>
                          )
                        </span>
                        <span>- {formatCurrencyDisplay(convertIDRtoActiveCurrency(orderData.promo_discount))}</span>
                      </div>
                    )}

                    {orderData.points_used > 0 && (
                      <div className="flex justify-between text-xs font-medium text-yellow-600">
                        <span>
                          {t("tp_points_redeemed")} ({orderData.points_used} {t("tp_points_unit")})
                        </span>
                        <span>
                          - {formatCurrencyDisplay(convertIDRtoActiveCurrency(orderData.points_used * 1000))}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200 border-dashed">
                      <span className="font-bold text-[10px] uppercase tracking-widest text-black">
                        {t("tp_grand_total")}
                      </span>
                      <span className="text-xl font-black text-gycora">
                        {formatCurrencyDisplay(convertIDRtoActiveCurrency(getGrandTotal(orderData)))}
                      </span>
                    </div>
                  </div>
                </div>

                {/* LOYALTY REWARD */}
                {userData?.is_membership &&
                orderData.point > 0 &&
                orderData.status === "completed" ? (
                  <div className="flex items-center justify-between p-4 m-6 border rounded-xl bg-gradient-to-r from-emerald-50 to-white border-emerald-100">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 text-white rounded-full shadow-sm bg-emerald-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">
                          {t("tp_loyalty_reward")}
                        </p>
                        <p className="text-xs mt-0.5 text-gray-500">
                          {t("tp_points_earned")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-emerald-600">
                        +{orderData.point}
                      </span>
                      <span className="ml-1 text-xs font-bold text-emerald-800">
                        {t("tp_points_unit")}
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
            )}

            {/* TRACKING TIMELINE */}
            <div className="p-6 bg-white border border-gray-100 shadow-sm md:p-8 rounded-3xl">
              <h3 className="pb-4 mb-6 text-sm font-bold tracking-widest uppercase border-b border-gray-100">
                {t("tp_timeline_title")}
              </h3>

              <div className="relative ml-3 space-y-8 border-l-2 border-gray-100">
                {timelineHistory.map((history: any, index: number) => (
                  <div key={index} className="relative pl-8">
                    <span
                      className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all ${
                        index === 0
                          ? "bg-gycora ring-4 ring-emerald-50"
                          : "bg-gray-300"
                      }`}
                    ></span>

                    <div className={index === 0 ? "opacity-100" : "opacity-50"}>
                      <p className="mb-1 text-sm font-bold tracking-wide text-gray-900 uppercase">
                        {formatStatusTitle(history.status)}
                      </p>
                      <p className="mb-2 text-xs text-gray-600">
                        {history.note}
                      </p>
                      <p className="font-mono text-[10px] font-medium text-gray-400">
                        {formatDate(history.updated_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
