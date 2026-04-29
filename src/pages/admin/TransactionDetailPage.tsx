// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import html2pdf from "html2pdf.js";
// import { BASE_URL } from "../../config/api";

// export default function TransactionDetailPage() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // --- STATE ---
//   const [transaction, setTransaction] = useState<any>(null);
//   const [biteshipData, setBiteshipData] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [trackingLoading, setTrackingLoading] = useState(false);
  
//   // Print Modal State
//   const [showPrintModal, setShowPrintModal] = useState(false);
//   const [isPreparingPDF, setIsPreparingPDF] = useState(false);
  
//   const [printSettings, setPrintSettings] = useState({
//     insurance_shown: true,
//     shipping_fee_shown: true,
//     item_description_shown: true,
//     item_sku_shown: true,
//     origin_phone_shown: true,
//     origin_address_shown: true,
//     receiver_phone_shown: true,
//     censor_receiver_name: true,
//     paper_size: "a4",
//   });

//   // --- API / DATA FETCHING ---
//   useEffect(() => {
//     const fetchTrackingData = async (trxId: number, trxData: any) => {
//       if (trxData.shipping_method !== "biteship" || !trxData.biteship_order_id) return;
      
//       setTrackingLoading(true);
//       try {
//         const token = localStorage.getItem("admin_token");
//         const res = await fetch(`${BASE_URL}/api/admin/transactions/${trxId}/tracking`, {
//           headers: { "Authorization": `Bearer ${token}` }
//         });
//         if (res.ok) {
//           const data = await res.json();
//           setBiteshipData(data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch biteship data:", error);
//       } finally {
//         setTrackingLoading(false);
//       }
//     };

//     const fetchData = async () => {
//       setIsLoading(true);
//       const stateData = location.state?.transactionData;
//       const token = localStorage.getItem("admin_token");

//       if (stateData) {
//         setTransaction(stateData);
//         setIsLoading(false);
//         fetchTrackingData(stateData.id, stateData);
        
//         // Background sync to ensure fresh data
//         try {
//           const res = await fetch(`${BASE_URL}/api/admin/transactions/${id}`, {
//             headers: { "Authorization": `Bearer ${token}` }
//           });
//           if (res.ok) {
//              const data = await res.json();
//              setTransaction(data);
//           }
//         } catch (error) {
//           console.error("Background sync failed", error);
//         }
//       } else {
//         try {
//           const res = await fetch(`${BASE_URL}/api/admin/transactions/${id}`, {
//             headers: { "Authorization": `Bearer ${token}` }
//           });
//           if (res.ok) {
//             const data = await res.json();
//             setTransaction(data);
//             fetchTrackingData(data.id, data);
//           } else {
//              throw new Error("Failed to load transaction detail");
//           }
//         } catch (error) {
//           console.error("Detail fetch error:", error);
//           Swal.fire("Error", "Gagal memuat detail transaksi", "error");
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     };

//     fetchData();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);


//   // --- COMPUTED / LOGIC HELPERS ---
//   const totalQuantity = useMemo(() => {
//     if (!transaction || !transaction.details) return 0;
//     return transaction.details.reduce((sum: number, item: any) => sum + parseInt(item.quantity), 0);
//   }, [transaction]);

//   const timelineHistory = useMemo(() => {
//     const apiHistory = biteshipData?.courier?.history || [];
//     if (apiHistory.length > 0) return [...apiHistory].reverse();
//     return [
//       {
//         status: biteshipData?.status || transaction?.status || "Processing",
//         note: getNoteFromStatus(biteshipData?.status || transaction?.status),
//         updated_at: biteshipData?.delivery?.datetime || transaction?.created_at || new Date().toISOString(),
//       },
//     ];
//   }, [biteshipData, transaction]);

//   // --- UI FORMATTING HELPERS ---
//   const formatPrice = (v: number) =>
//     new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(v || 0);

//   const formatDate = (dateString: string) => {
//     if (!dateString) return "-";
//     return new Date(dateString).toLocaleDateString("id-ID", {
//       weekday: "long", year: "numeric", month: "short", day: "numeric",
//     });
//   };

//   const formatDateTime = (dateString: string) => {
//     if (!dateString) return "-";
//     return new Date(dateString).toLocaleDateString("id-ID", {
//       weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
//     });
//   };

//   const formatStatus = (s: string) => (s ? s.replace(/_/g, " ") : "");
//   const formatStatusTitle = (status: string) => {
//     if (!status) return "Processing";
//     const formatted = status.replace(/_/g, " ");
//     return formatted.charAt(0).toUpperCase() + formatted.slice(1);
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
//       rejected: "Pengiriman ditolak oleh kurir.",
//       cancelled: "Pengiriman telah dibatalkan.",
//     };
//     return map[status] || "Pesanan sedang diproses oleh sistem.";
//   }

//   const getGrandTotal = (trx: any) => {
//     if (!trx) return 0;
//     const total = parseFloat(trx.total_amount || 0);
//     const shipping = parseFloat(trx.shipping_cost || 0);
//     const promo = parseFloat(trx.promo_discount || 0);
//     const pointsDiscount = (trx.points_used || 0) * 1000;
//     return total + shipping - promo - pointsDiscount;
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

//   const getCourierLogo = (company: string) => {
//     if (!company) return null;
//     const map: Record<string, string> = {
//       jne: "jne.png", sicepat: "sicepat.png", jnt: "jnt.png", anteraja: "anteraja.png",
//       gojek: "gojek.png", grab: "grab.png", paxel: "paxel.png", ninja: "ninja.png",
//     };
//     return map[company.toLowerCase()] ? "/courier_images/" + map[company.toLowerCase()] : null;
//   };

//   const getPaymentStatusText = (status: string) =>
//     ["completed", "processing", "refund_requested", "refund_approved", "refund_rejected"].includes(status)
//       ? "PAID"
//       : status === "cancelled" ? "CANCELLED" : status === "refunded" ? "REFUNDED" : "UNPAID";

//   const getPaymentStatusColor = (status: string) =>
//     ["completed", "processing", "refund_requested", "refund_approved", "refund_rejected"].includes(status)
//       ? "text-emerald-600"
//       : status === "cancelled" ? "text-red-500" : status === "refunded" ? "text-teal-600" : "text-orange-500";

//   const statusClass = (status: string) => {
//     const map: Record<string, string> = {
//       awaiting_payment: "bg-yellow-100 text-yellow-700",
//       pending: "bg-orange-100 text-orange-700",
//       processing: "bg-blue-100 text-blue-700",
//       completed: "bg-emerald-100 text-emerald-700",
//       cancelled: "bg-red-100 text-red-700",
//       refund_requested: "bg-purple-100 text-purple-700",
//       refund_approved: "bg-indigo-100 text-indigo-700",
//       refund_rejected: "bg-gray-200 text-gray-600 line-through",
//       refunded: "bg-teal-100 text-teal-700",
//       refund_manual_required: "bg-pink-100 text-pink-700",
//     };
//     return map[status] || "bg-gray-100 text-gray-500";
//   };


//   // --- PRINT LABEL LOGIC ---
//   const getCensoredName = () => {
//     const addr = transaction?.address;
//     let name = "";

//     if (addr && addr.first_name_address) {
//       name = `${addr.first_name_address} ${addr.last_name_address || ""}`.trim();
//     } else if (transaction?.user) {
//       name = `${transaction.user.first_name || ""} ${transaction.user.last_name || ""}`.trim();
//     }

//     if (!name) name = "Customer";
//     if (!printSettings.censor_receiver_name) return name;

//     return name
//       .split(" ")
//       .map((word) => {
//         if (word.length <= 1) return word;
//         return word.charAt(0) + "*".repeat(word.length - 1);
//       })
//       .join(" ");
//   };

//   const getItemsDescription = () => {
//     if (!transaction?.details) return "-";
//     return transaction.details
//       .map((d: any) => {
//         let desc = `${d.quantity}x ${d.product.name}`;
//         if (d.color) desc += ` - ${d.color}`;
//         if (printSettings.item_sku_shown && d.product.code) desc += ` (${d.product.code})`;
//         return desc;
//       })
//       .join(", ");
//   };

//   const generateAndDownloadPDF = () => {
//     setShowPrintModal(false);
//     setIsPreparingPDF(true); 

//     setTimeout(() => {
//       const element = document.getElementById("print-label-template");
//       if(!element) {
//           setIsPreparingPDF(false);
//           return Swal.fire("Error", "Elemen PDF tidak ditemukan", "error");
//       }

//       let formatSetting: string | number[] = "a4";
//       if (printSettings.paper_size === "thermal") formatSetting = [3.15, 3.93];
//       if (printSettings.paper_size === "thermal2") formatSetting = [3.93, 5.9];

//       const opt = {
//         margin: 0.1,
//         filename: `Resi-${transaction.order_id}.pdf`,
//         image: { type: "jpeg" as const, quality: 1 },
//         html2canvas: { scale: 2, useCORS: true, allowTaint: true, scrollY: 0, scrollX: 0 },
//         jsPDF: { unit: "in" as const, format: formatSetting as any, orientation: "portrait" as const },
//       };

//       html2pdf()
//         .set(opt)
//         .from(element)
//         .save()
//         .then(() => {
//           setIsPreparingPDF(false); 
//           Swal.fire({
//             icon: "success",
//             title: "Berhasil",
//             text: "Resi PDF berhasil diunduh.",
//             confirmButtonColor: "#059669",
//           });
//         })
//         .catch((err: any) => {
//           console.error("Error generating PDF:", err);
//           setIsPreparingPDF(false);
//           Swal.fire("Error", "Gagal memproses PDF", "error");
//         });
//     }, 1500);
//   };


//   // --- RENDER ---
//   return (
//     <div className="relative max-w-6xl min-h-screen px-6 py-12 mx-auto font-sans">
      
//       {/* OVERLAY: PREPARING PDF (MENGGUNAKAN GAYA VUE) */}
//       {isPreparingPDF && (
//         <div className="fixed inset-0 z-[999999] bg-gray-900/95 overflow-y-auto">
//           <div className="flex flex-col items-center min-h-screen px-4 py-10">
//             <div className="flex items-center gap-3 mb-8 font-bold tracking-widest text-white uppercase animate-pulse">
//               <div className="w-6 h-6 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
//               Generating PDF Document...
//             </div>

//             <div id="print-label-template" className="bg-white text-black p-8 w-[800px] shrink-0 border-[3px] border-black flex flex-col gap-4">
//               {transaction && (
//                 <>
//                   <div className="flex items-center justify-between pb-4 border-b-2 border-black">
//                     <div className="w-1/3">
//                       {getCourierLogo(transaction.courier_company) ? (
//                         <img src={getCourierLogo(transaction.courier_company)!} className="object-contain h-12" />
//                       ) : (
//                         <span className="text-2xl font-black uppercase">{transaction.courier_company}</span>
//                       )}
//                     </div>
//                     <div className="w-1/3 text-center">
//                       <h1 className="text-3xl font-black tracking-widest text-black uppercase">GYCORA</h1>
//                       <p className="text-[10px] font-bold mt-1 text-black">gycora.id</p>
//                     </div>
//                     <div className="w-1/3 text-right">
//                       <p className="text-xl font-black text-black uppercase">{transaction.courier_type}</p>
//                     </div>
//                   </div>

//                   <div className="flex flex-col items-center py-6 text-center border-b-2 border-black">
//                     <img
//                       src={`https://bwipjs-api.metafloor.com/?bcid=code128&text=${biteshipData?.courier?.waybill_id || transaction.tracking_number || transaction.order_id}&scale=4&includetext=false`}
//                       className="object-contain h-24 mb-4"
//                       crossOrigin="anonymous"
//                       alt="Barcode"
//                     />
//                     <p className="text-2xl font-black tracking-widest text-black">
//                       Nomor Resi - {biteshipData?.courier?.waybill_id || transaction.tracking_number || "N/A"}
//                     </p>
//                   </div>

//                   {printSettings.shipping_fee_shown && (
//                     <div className="py-4 text-center border-b-2 border-black">
//                       <p className="text-2xl font-black text-black">
//                         Ongkos Kirim: {formatPrice(transaction.shipping_cost)}
//                       </p>
//                       {transaction.promo_discount > 0 && (
//                         <p className="mt-1 text-lg font-bold text-black">
//                           Diskon Promo: - {formatPrice(transaction.promo_discount)}
//                         </p>
//                       )}
//                       <p className="mt-1 text-lg font-bold text-black">
//                         Jenis Layanan - {transaction.courier_type}
//                       </p>
//                     </div>
//                   )}

//                   <div className="flex gap-6 py-6 border-b-2 border-black">
//                     <div className="flex flex-col w-1/2 pr-6 border-r-2 border-black">
//                       <p className="mb-3 text-sm font-bold text-black">Reference Number:</p>
//                       <img
//                         src={`https://bwipjs-api.metafloor.com/?bcid=code128&text=${transaction.order_id}&scale=3&includetext=false`}
//                         className="self-start object-contain h-16"
//                         crossOrigin="anonymous"
//                         alt="Reference Barcode"
//                       />
//                       <p className="mt-2 text-sm font-bold text-black">{transaction.order_id}</p>
//                     </div>
//                     <div className="flex flex-col justify-center w-1/2 space-y-3 text-xl text-black">
//                       <p>Quantity <span className="mx-2">:</span><span className="font-black">{totalQuantity} Pcs</span></p>
//                       <p>Weight <span className="mx-4">:</span><span className="font-black">{totalQuantity} Kg</span></p>
//                     </div>
//                   </div>

//                   <div className="flex gap-6 py-6 border-b-2 border-black">
//                     <div className="w-1/2 pr-6 text-black border-r-2 border-black">
//                       <p className="mb-3 text-sm font-black uppercase">Alamat Penerima:</p>
//                       <p className="text-xl font-black leading-tight">{getCensoredName()}</p>
//                       {printSettings.receiver_phone_shown && (
//                         <p className="mt-1 font-mono text-xl font-bold">{transaction.user.phone || "-"}</p>
//                       )}
//                       <p className="mt-3 text-lg leading-snug">
//                         {transaction.address?.address_location || "Alamat tidak tersedia"}, {transaction.address?.postal_code || ""}
//                       </p>
//                     </div>
//                     <div className="w-1/2 pr-6 text-black">
//                       <p className="mb-3 text-sm font-black uppercase">Alamat Pengirim:</p>
//                       <p className="text-xl font-black leading-tight">Gycora Store</p>
//                       {printSettings.origin_phone_shown && (
//                         <p className="mt-1 font-mono text-xl font-bold">08883888585</p>
//                       )}
//                       {printSettings.origin_address_shown && (
//                         <p className="mt-3 text-lg leading-snug">
//                           Jalan Kecilung N0. 8A, Kota Surabaya, Jawa Timur 60275, Indonesia
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   {printSettings.item_description_shown && (
//                     <div className="py-6 text-lg leading-relaxed text-black border-b-2 border-black">
//                       <div className="flex">
//                         <span className="w-40 font-black uppercase shrink-0">Jenis Barang: </span>
//                         <span className="font-bold">{getItemsDescription()}</span>
//                       </div>
//                     </div>
//                   )}

//                   <div className="flex py-4 text-lg text-black border-b-2 border-black">
//                     <span className="w-40 font-black uppercase shrink-0">Catatan: </span>
//                     <span className="font-bold">Tidak Ada</span>
//                   </div>

//                   <div className="pt-4 text-sm font-bold text-center text-black">
//                     Pengiriman melalui platform Gycora
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}


//       {/* TOP NAVIGATION ACTIONS */}
//       <div className="relative z-10 flex flex-col justify-between gap-4 mb-10 sm:flex-row sm:items-center">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-gray-500 transition-colors w-fit hover:text-gray-900 group"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//           </svg>
//           <span className="text-sm font-bold tracking-widest uppercase">Back to List</span>
//         </button>

//         <div className="flex items-center gap-4">
//           {transaction?.shipping_method === 'biteship' && transaction?.biteship_order_id && (
//             <button
//               onClick={() => setShowPrintModal(true)}
//               className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white transition rounded-lg shadow-sm bg-gycora hover:bg-gycora-dark"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
//               </svg>
//               Cetak Resi
//             </button>
//           )}

//           {transaction?.shipping_method === 'biteship' && <div className="w-px h-8 bg-gray-200"></div>}

//           <div className="text-right">
//             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order Date</p>
//             <p className="text-sm font-bold text-gray-900">{formatDate(transaction?.created_at)}</p>
//           </div>
//           <div className="w-px h-8 bg-gray-200"></div>
//           <span className={`shadow-sm px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest ${statusClass(transaction?.status)}`}>
//             {formatStatus(transaction?.status)}
//           </span>
//         </div>
//       </div>


//       {/* PRINT MODAL (SETTINGS) */}
//       {showPrintModal && (
//         <div className="fixed inset-0 z-[500] flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm animate-fade-in">
//           <div className="flex flex-col w-full max-w-lg overflow-hidden bg-white shadow-2xl rounded-xl">
//             <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
//               <h3 className="text-lg font-bold text-gray-800">Print Label</h3>
//               <button onClick={() => setShowPrintModal(false)} className="text-gray-400 transition hover:text-red-500">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             <div className="flex-grow p-6 space-y-6 overflow-y-auto max-h-[70vh]">
//               <div>
//                 <h4 className="mb-4 font-bold text-gray-800">Isi Detail Resi</h4>
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                   <div className="space-y-3">
//                     <label className="flex items-center gap-3 cursor-pointer group">
//                       <input type="checkbox" checked={printSettings.insurance_shown} onChange={(e) => setPrintSettings({...printSettings, insurance_shown: e.target.checked})} className="w-5 h-5 border-gray-300 rounded cursor-pointer focus:ring-gycora text-gycora" />
//                       <span className="text-sm text-gray-600 group-hover:text-black">Nilai Asuransi</span>
//                     </label>
//                     <label className="flex items-center gap-3 cursor-pointer group">
//                       <input type="checkbox" checked={printSettings.shipping_fee_shown} onChange={(e) => setPrintSettings({...printSettings, shipping_fee_shown: e.target.checked})} className="w-5 h-5 border-gray-300 rounded cursor-pointer focus:ring-gycora text-gycora" />
//                       <span className="text-sm text-gray-600 group-hover:text-black">Ongkos Kirim</span>
//                     </label>
//                     <label className="flex items-center gap-3 cursor-pointer group">
//                       <input type="checkbox" checked={printSettings.item_description_shown} onChange={(e) => setPrintSettings({...printSettings, item_description_shown: e.target.checked})} className="w-5 h-5 border-gray-300 rounded cursor-pointer focus:ring-gycora text-gycora" />
//                       <span className="text-sm text-gray-600 group-hover:text-black">Deskripsi Barang</span>
//                     </label>
//                     <label className="flex items-center gap-3 cursor-pointer group">
//                       <input type="checkbox" checked={printSettings.item_sku_shown} onChange={(e) => setPrintSettings({...printSettings, item_sku_shown: e.target.checked})} className="w-5 h-5 border-gray-300 rounded cursor-pointer focus:ring-gycora text-gycora" />
//                       <span className="text-sm text-gray-600 group-hover:text-black">SKU Barang</span>
//                     </label>
//                   </div>
//                   <div className="space-y-3">
//                     <label className="flex items-center gap-3 cursor-pointer group">
//                       <input type="checkbox" checked={printSettings.origin_phone_shown} onChange={(e) => setPrintSettings({...printSettings, origin_phone_shown: e.target.checked})} className="w-5 h-5 border-gray-300 rounded cursor-pointer focus:ring-gycora text-gycora" />
//                       <span className="text-sm text-gray-600 group-hover:text-black">No. Telp Pengirim</span>
//                     </label>
//                     <label className="flex items-center gap-3 cursor-pointer group">
//                       <input type="checkbox" checked={printSettings.origin_address_shown} onChange={(e) => setPrintSettings({...printSettings, origin_address_shown: e.target.checked})} className="w-5 h-5 border-gray-300 rounded cursor-pointer focus:ring-gycora text-gycora" />
//                       <span className="text-sm text-gray-600 group-hover:text-black">Alamat Pengirim</span>
//                     </label>
//                     <label className="flex items-center gap-3 cursor-pointer group">
//                       <input type="checkbox" checked={printSettings.receiver_phone_shown} onChange={(e) => setPrintSettings({...printSettings, receiver_phone_shown: e.target.checked})} className="w-5 h-5 border-gray-300 rounded cursor-pointer focus:ring-gycora text-gycora" />
//                       <span className="text-sm text-gray-600 group-hover:text-black">No. Telp Penerima</span>
//                     </label>
//                     <label className="flex items-center gap-3 cursor-pointer group">
//                       <input type="checkbox" checked={printSettings.censor_receiver_name} onChange={(e) => setPrintSettings({...printSettings, censor_receiver_name: e.target.checked})} className="w-5 h-5 border-gray-300 rounded cursor-pointer focus:ring-gycora text-gycora" />
//                       <span className="text-sm text-gray-600 group-hover:text-black">Sensor Nama Penerima</span>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <h4 className="mb-3 font-bold text-gray-800">Tipe Label</h4>
//                 <select
//                   value={printSettings.paper_size}
//                   onChange={(e) => setPrintSettings({...printSettings, paper_size: e.target.value})}
//                   className="w-full p-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg outline-none cursor-pointer focus:ring-gycora focus:border-gycora"
//                 >
//                   <option value="a4">Default Kertas (A4)</option>
//                   <option value="thermal">Thermal 1 (8 x 10 cm)</option>
//                   <option value="thermal2">Thermal 2 (10 x 15 cm)</option>
//                 </select>
//               </div>
//             </div>

//             <div className="p-6 border-t border-gray-100 bg-gray-50">
//               <button
//                 onClick={generateAndDownloadPDF}
//                 className="w-full px-4 py-3 font-bold text-white transition rounded-lg shadow-md bg-gycora hover:bg-gycora-dark"
//               >
//                 Download Label (PDF)
//               </button>
//             </div>
//           </div>
//         </div>
//       )}


//       {/* PAGE CONTENT */}
//       {isLoading ? (
//         <div className="relative z-10 flex flex-col items-center justify-center py-20 animate-pulse">
//           <div className="w-12 h-12 mb-4 border-4 border-gray-100 rounded-full border-t-black animate-spin"></div>
//           <p className="font-serif italic text-center text-gray-400">Loading transaction details...</p>
//         </div>
//       ) : transaction ? (
//         <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-3 animate-fade-in">
          
//           <div className="space-y-6 lg:col-span-2">
            
//             {/* ORDER ITEMS CARD */}
//             <div className="bg-white shadow-sm p-6 sm:p-8 border border-gray-100 rounded-[2rem]">
//               <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
//                 <h2 className="text-xl font-bold tracking-tight text-gray-800">Order Items</h2>
//                 <div className="flex items-center gap-2">
//                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{transaction.details.length} Variants</span>
//                   <span className="px-3 py-1 text-xs font-bold text-white bg-black rounded-full">{totalQuantity} Total Items</span>
//                 </div>
//               </div>
//               <div className="divide-y divide-gray-50">
//                 {transaction.details.map((item: any) => (
//                   <div key={item.id} className="flex gap-6 py-6 first:pt-0 last:pb-0">
//                     <img src={item.product.image_url} className="object-cover w-24 h-24 border border-gray-100 shadow-sm bg-gray-50 rounded-2xl shrink-0" />
//                     <div className="flex flex-col justify-center flex-grow">
//                       <h3 className="text-sm font-bold tracking-wide text-gray-900 uppercase">{item.product.name}</h3>
//                       {item.color && (
//                         <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
//                           Color: <span className="font-bold text-gray-800">{item.color}</span>
//                         </p>
//                       )}
//                       <p className="mt-1 font-mono text-xs text-gray-400">SKU: {item.product.sku}</p>
//                       <div className="flex items-end justify-between mt-4">
//                         <p className="px-3 py-1 text-sm text-gray-600 rounded-lg bg-gray-50">
//                           {item.quantity} <span className="text-[10px] mx-1">x</span> {formatPrice(item.price)}
//                         </p>
//                         <p className="font-bold text-black">{formatPrice(item.quantity * item.price)}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* LOGISTICS & PAYMENT ROW */}
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              
//               {/* LOGISTICS CARD */}
//               <div className="bg-white shadow-sm p-6 sm:p-8 border border-gray-100 rounded-[2rem] flex flex-col relative overflow-hidden">
//                 <h2 className="pb-4 mb-6 text-sm font-bold tracking-widest text-gray-800 uppercase border-b border-gray-100">Logistics</h2>
//                 {trackingLoading && (
//                   <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
//                     <div className="w-8 h-8 border-2 border-gray-200 rounded-full border-t-black animate-spin"></div>
//                     <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-bold">Syncing Biteship...</p>
//                   </div>
//                 )}
//                 {transaction.shipping_method !== 'free' ? (
//                   <div className="flex flex-col justify-between flex-grow">
//                     <div className="flex items-center gap-4 mb-4">
//                       <div className="flex items-center justify-center w-16 h-12 p-1 bg-white border border-gray-200 shrink-0 rounded-xl">
//                         {getCourierLogo(transaction.courier_company) ? (
//                           <img src={getCourierLogo(transaction.courier_company)!} className="object-contain w-full h-full" />
//                         ) : (
//                           <span className="text-[10px] font-black text-gray-400">{transaction.courier_company?.toUpperCase()}</span>
//                         )}
//                       </div>
//                       <div>
//                         <p className="text-sm font-bold text-gray-900 uppercase">{transaction.courier_company}</p>
//                         <p className="text-xs text-gray-500 uppercase">{transaction.courier_type}</p>
//                       </div>
//                     </div>
//                     <div className="p-4 mt-auto space-y-2 bg-gray-50 rounded-xl">
//                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tracking Number (Resi)</p>
//                       <div className="flex items-center justify-between">
//                         <p className="font-mono text-sm font-bold text-black">
//                           {biteshipData?.courier?.waybill_id || transaction.tracking_number || "Pending Allocation"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col items-center justify-center flex-grow p-6 text-center bg-gray-50 rounded-xl">
//                     <div className="flex items-center justify-center w-12 h-12 mb-3 text-white bg-black rounded-full">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                       </svg>
//                     </div>
//                     <p className="text-sm font-bold text-gray-900 uppercase">No Courier</p>
//                     <p className="mt-1 text-xs font-bold text-gray-500">In-Store Pickup</p>
//                   </div>
//                 )}
//               </div>

//               {/* PAYMENT METHOD CARD */}
//               <div className="bg-white shadow-sm p-6 sm:p-8 border border-gray-100 rounded-[2rem] flex flex-col">
//                 <h2 className="pb-4 mb-6 text-sm font-bold tracking-widest text-gray-800 uppercase border-b border-gray-100">Payment Method</h2>
//                 {transaction.payment_method ? (
//                   <div className="flex flex-col justify-center flex-grow">
//                     <div className="flex items-center gap-4 mb-6">
//                       <div className="flex items-center justify-center w-16 h-12 p-1 border border-gray-100 shrink-0 bg-gray-50 rounded-xl">
//                         {getPaymentLogo(transaction.payment_method) ? (
//                           <img src={getPaymentLogo(transaction.payment_method)!} className="object-contain w-full h-full" />
//                         ) : (
//                           <span className="text-[10px] font-black text-gray-400">PAY</span>
//                         )}
//                       </div>
//                       <div>
//                         <p className="text-sm font-bold text-gray-900 uppercase">{transaction.payment_method.replace("_", " ")}</p>
//                         <p className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${getPaymentStatusColor(transaction.status)}`}>
//                           Status: {getPaymentStatusText(transaction.status)}
//                         </p>
//                       </div>
//                     </div>
//                     {transaction.payment && (
//                       <div className="p-4 mt-auto border border-blue-100 bg-blue-50/50 rounded-xl">
//                         <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Xendit Ref ID</p>
//                         <p className="font-mono text-xs text-blue-900 truncate">{transaction.payment.external_id}</p>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="flex items-center justify-center flex-grow">
//                     <p className="text-sm italic text-gray-400">Method not selected</p>
//                   </div>
//                 )}
//               </div>

//             </div>
//           </div>

//           <div className="space-y-6 lg:col-span-1">
            
//             {/* CUSTOMER DETAILS */}
//             <div className="bg-gray-900 shadow-xl p-8 rounded-[2rem] text-white relative overflow-hidden">
//               <div className="absolute w-32 h-32 bg-white rounded-full pointer-events-none opacity-5 -right-6 -top-6 blur-2xl"></div>
//               <h2 className="opacity-50 mb-6 font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                 </svg>
//                 Customer Details
//               </h2>
//               <p className="text-xl font-bold leading-none uppercase">{transaction.user.first_name} {transaction.user.last_name}</p>
//               <div className="mt-4 space-y-2 opacity-80">
//                 <p className="flex items-center gap-2 text-sm">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                   </svg>
//                   {transaction.user.email}
//                 </p>
//                 <p className="flex items-center gap-2 text-sm">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                   </svg>
//                   {transaction.user.phone || "No phone"}
//                 </p>
//               </div>
//               <div className="pt-6 mt-6 space-y-4 border-t border-white/10">
//                 <div>
//                   <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
//                   <div className="px-3 py-2 font-mono text-xs rounded-lg bg-white/10">{transaction.order_id}</div>
//                 </div>
//               </div>
//             </div>

//             {/* FINANCIAL SUMMARY */}
//             <div className="bg-white shadow-sm p-8 border border-gray-100 rounded-[2rem]">
//               <h2 className="mb-6 font-black text-[10px] text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-4">
//                 Financial Summary
//               </h2>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between text-sm text-gray-600">
//                   <span>Subtotal ({totalQuantity} items)</span>
//                   <span className="font-medium text-gray-900">{formatPrice(transaction.total_amount)}</span>
//                 </div>
//                 <div className="flex items-center justify-between text-sm text-gray-600">
//                   <span>Shipping Fee</span>
//                   {transaction.shipping_method === 'free' ? (
//                     <span className="font-bold text-emerald-600">Free</span>
//                   ) : (
//                     <span className="font-medium text-gray-900">{formatPrice(transaction.shipping_cost)}</span>
//                   )}
//                 </div>

//                 {transaction.promo_discount > 0 && (
//                   <div className="flex items-center justify-between text-sm font-medium text-emerald-600">
//                     <span>Promo Code ({transaction.promo_code})</span>
//                     <span>- {formatPrice(transaction.promo_discount)}</span>
//                   </div>
//                 )}
//                 {transaction.points_used > 0 && (
//                   <div className="flex items-center justify-between text-sm font-medium text-yellow-600">
//                     <span>Loyalty Points ({transaction.points_used} Pts)</span>
//                     <span>- {formatPrice(transaction.points_used * 1000)}</span>
//                   </div>
//                 )}

//                 <div className="flex items-end justify-between pt-4 border-t border-gray-100 border-dashed">
//                   <div>
//                     <span className="block text-xs font-bold tracking-widest text-gray-900 uppercase">Grand Total</span>
//                     <span className="text-[10px] text-gray-400 italic">Paid by customer</span>
//                   </div>
//                   <span className="text-2xl font-bold text-black">{formatPrice(getGrandTotal(transaction))}</span>
//                 </div>
//               </div>

//               {transaction.point > 0 && transaction.status === 'completed' && (
//                 <div className="flex items-center justify-between p-4 mt-4 border rounded-xl bg-gradient-to-r from-emerald-50 to-white border-emerald-100">
//                   <div className="flex items-center gap-3">
//                     <div className="flex items-center justify-center w-10 h-10 text-white rounded-full shadow-sm bg-emerald-500">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">Loyalty Reward</p>
//                       <p className="text-xs mt-0.5 text-gray-500">Points awarded to user</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <span className="text-2xl font-black text-emerald-600">+{transaction.point}</span>
//                     <span className="ml-1 text-xs font-bold text-emerald-800">Pts</span>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* TIMELINE */}
//             <div className="bg-white shadow-sm p-6 sm:p-8 border border-gray-100 rounded-[2rem]">
//               <h2 className="mb-6 font-black text-[10px] text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-4 flex justify-between items-center">
//                 <span>Tracking Timeline</span>
//                 {biteshipData && transaction.shipping_method === 'biteship' && (
//                   <span className="flex items-center gap-1 text-[8px] text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
//                     <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Live
//                   </span>
//                 )}
//               </h2>
//               {transaction.shipping_method === 'free' ? (
//                 <div className="py-6 text-center">
//                   <p className="mb-2 text-xs italic text-gray-500">No physical shipping required.</p>
//                   <p className="text-sm font-bold text-black uppercase">In-Store Pickup</p>
//                 </div>
//               ) : trackingLoading ? (
//                 <div className="flex justify-center py-6">
//                   <div className="w-6 h-6 border-2 border-gray-200 rounded-full border-t-black animate-spin"></div>
//                 </div>
//               ) : (
//                 <div className="relative ml-2 space-y-6 border-l-2 border-gray-100">
//                   {timelineHistory.map((history: any, index: number) => (
//                     <div key={index} className="relative pl-6">
//                       <span className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all ${index === 0 ? 'bg-gycora ring-4 ring-gray-50' : 'bg-gray-300'}`}></span>
//                       <div className={index === 0 ? 'opacity-100' : 'opacity-50'}>
//                         <p className="mb-1 text-xs font-bold tracking-wide text-gray-900 uppercase">{formatStatusTitle(history.status)}</p>
//                         <p className="text-[11px] text-gray-600 leading-tight mb-1.5">{history.note}</p>
//                         <p className="text-[9px] text-gray-400 font-medium font-mono">{formatDateTime(history.updated_at)}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//           </div>
//         </div>
//       ) : null}

//     </div>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import html2pdf from "html2pdf.js";
// import { BASE_URL } from "../../config/api";

// export default function TransactionDetailPage() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // --- STATE ---
//   const [transaction, setTransaction] = useState<any>(null);
//   const [biteshipData, setBiteshipData] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [trackingLoading, setTrackingLoading] = useState(false);
  
//   // Print Modal State
//   const [showPrintModal, setShowPrintModal] = useState(false);
//   const [isPreparingPDF, setIsPreparingPDF] = useState(false);
  
//   const [printSettings, setPrintSettings] = useState({
//     insurance_shown: true,
//     shipping_fee_shown: true,
//     item_description_shown: true,
//     item_sku_shown: true,
//     origin_phone_shown: true,
//     origin_address_shown: true,
//     receiver_phone_shown: true,
//     censor_receiver_name: true,
//     paper_size: "a4",
//   });

//   // --- API / DATA FETCHING ---
//   useEffect(() => {
//     const fetchTrackingData = async (trxId: number, trxData: any) => {
//       if (trxData.shipping_method !== "biteship" || !trxData.biteship_order_id) return;
      
//       setTrackingLoading(true);
//       try {
//         const token = localStorage.getItem("admin_token");
//         const res = await fetch(`${BASE_URL}/api/admin/transactions/${trxId}/tracking`, {
//           headers: { "Authorization": `Bearer ${token}` }
//         });
//         if (res.ok) {
//           const data = await res.json();
//           setBiteshipData(data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch biteship data:", error);
//       } finally {
//         setTrackingLoading(false);
//       }
//     };

//     const fetchData = async () => {
//       setIsLoading(true);
//       const stateData = location.state?.transactionData;
//       const token = localStorage.getItem("admin_token");

//       if (stateData) {
//         setTransaction(stateData);
//         setIsLoading(false);
//         fetchTrackingData(stateData.id, stateData);
        
//         // Background sync to ensure fresh data
//         try {
//           const res = await fetch(`${BASE_URL}/api/admin/transactions/${id}`, {
//             headers: { "Authorization": `Bearer ${token}` }
//           });
//           if (res.ok) {
//              const data = await res.json();
//              setTransaction(data);
//           }
//         } catch (error) {
//           console.error("Background sync failed", error);
//         }
//       } else {
//         try {
//           const res = await fetch(`${BASE_URL}/api/admin/transactions/${id}`, {
//             headers: { "Authorization": `Bearer ${token}` }
//           });
//           if (res.ok) {
//             const data = await res.json();
//             setTransaction(data);
//             fetchTrackingData(data.id, data);
//           } else {
//              throw new Error("Failed to load transaction detail");
//           }
//         } catch (error) {
//           console.error("Detail fetch error:", error);
//           Swal.fire("Error", "Gagal memuat detail transaksi", "error");
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     };

//     fetchData();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);


//   // --- COMPUTED / LOGIC HELPERS ---
//   const totalQuantity = useMemo(() => {
//     if (!transaction || !transaction.details) return 0;
//     return transaction.details.reduce((sum: number, item: any) => sum + parseInt(item.quantity), 0);
//   }, [transaction]);

//   const timelineHistory = useMemo(() => {
//     const apiHistory = biteshipData?.courier?.history || [];
//     if (apiHistory.length > 0) return [...apiHistory].reverse();
//     return [
//       {
//         status: biteshipData?.status || transaction?.status || "Processing",
//         note: getNoteFromStatus(biteshipData?.status || transaction?.status),
//         updated_at: biteshipData?.delivery?.datetime || transaction?.created_at || new Date().toISOString(),
//       },
//     ];
//   }, [biteshipData, transaction]);

//   // --- UI FORMATTING HELPERS ---
//   const formatPrice = (v: number) =>
//     new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(v || 0);

//   const formatDate = (dateString: string) => {
//     if (!dateString) return "-";
//     return new Date(dateString).toLocaleDateString("id-ID", {
//       weekday: "long", year: "numeric", month: "short", day: "numeric",
//     });
//   };

//   const formatDateTime = (dateString: string) => {
//     if (!dateString) return "-";
//     return new Date(dateString).toLocaleDateString("id-ID", {
//       weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
//     });
//   };

//   const formatStatus = (s: string) => (s ? s.replace(/_/g, " ") : "");
//   const formatStatusTitle = (status: string) => {
//     if (!status) return "Processing";
//     const formatted = status.replace(/_/g, " ");
//     return formatted.charAt(0).toUpperCase() + formatted.slice(1);
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
//       rejected: "Pengiriman ditolak oleh kurir.",
//       cancelled: "Pengiriman telah dibatalkan.",
//     };
//     return map[status] || "Pesanan sedang diproses oleh sistem.";
//   }

//   const getGrandTotal = (trx: any) => {
//     if (!trx) return 0;
//     const total = parseFloat(trx.total_amount || 0);
//     const shipping = parseFloat(trx.shipping_cost || 0);
//     const promo = parseFloat(trx.promo_discount || 0);
//     const pointsDiscount = (trx.points_used || 0) * 1000;
//     return total + shipping - promo - pointsDiscount;
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

//   const getCourierLogo = (company: string) => {
//     if (!company) return null;
//     const map: Record<string, string> = {
//       jne: "jne.png", sicepat: "sicepat.png", jnt: "jnt.png", anteraja: "anteraja.png",
//       gojek: "gojek.png", grab: "grab.png", paxel: "paxel.png", ninja: "ninja.png",
//     };
//     return map[company.toLowerCase()] ? "/courier_images/" + map[company.toLowerCase()] : null;
//   };

//   const getPaymentStatusText = (status: string) =>
//     ["completed", "processing", "refund_requested", "refund_approved", "refund_rejected"].includes(status)
//       ? "PAID"
//       : status === "cancelled" ? "CANCELLED" : status === "refunded" ? "REFUNDED" : "UNPAID";

//   const getPaymentStatusColor = (status: string) =>
//     ["completed", "processing", "refund_requested", "refund_approved", "refund_rejected"].includes(status)
//       ? "text-emerald-600"
//       : status === "cancelled" ? "text-red-500" : status === "refunded" ? "text-teal-600" : "text-orange-500";

//   const statusClass = (status: string) => {
//     const map: Record<string, string> = {
//       awaiting_payment: "bg-yellow-100 text-yellow-700",
//       pending: "bg-orange-100 text-orange-700",
//       processing: "bg-blue-100 text-blue-700",
//       completed: "bg-emerald-100 text-emerald-700",
//       cancelled: "bg-red-100 text-red-700",
//       refund_requested: "bg-purple-100 text-purple-700",
//       refund_approved: "bg-indigo-100 text-indigo-700",
//       refund_rejected: "bg-gray-200 text-gray-600 line-through",
//       refunded: "bg-teal-100 text-teal-700",
//       refund_manual_required: "bg-pink-100 text-pink-700",
//     };
//     return map[status] || "bg-gray-100 text-gray-500";
//   };


//   // --- PRINT LABEL LOGIC ---
//   const getCensoredName = () => {
//     const addr = transaction?.address;
//     let name = "";

//     if (addr && addr.first_name_address) {
//       name = `${addr.first_name_address} ${addr.last_name_address || ""}`.trim();
//     } else if (transaction?.user) {
//       name = `${transaction.user.first_name || ""} ${transaction.user.last_name || ""}`.trim();
//     }

//     if (!name) name = "Customer";
//     if (!printSettings.censor_receiver_name) return name;

//     return name
//       .split(" ")
//       .map((word) => {
//         if (word.length <= 1) return word;
//         return word.charAt(0) + "*".repeat(word.length - 1);
//       })
//       .join(" ");
//   };

//   const getItemsDescription = () => {
//     if (!transaction?.details) return "-";
//     return transaction.details
//       .map((d: any) => {
//         let desc = `${d.quantity}x ${d.product.name}`;
//         if (d.color) desc += ` - ${d.color}`;
//         if (printSettings.item_sku_shown && d.product.code) desc += ` (${d.product.code})`;
//         return desc;
//       })
//       .join(", ");
//   };

//   const generateAndDownloadPDF = () => {
//     setShowPrintModal(false);
//     setIsPreparingPDF(true); 

//     setTimeout(() => {
//       const element = document.getElementById("print-label-template");
//       if(!element) {
//           setIsPreparingPDF(false);
//           return Swal.fire("Error", "Elemen PDF tidak ditemukan", "error");
//       }

//       let formatSetting: string | number[] = "a4";
//       if (printSettings.paper_size === "thermal") formatSetting = [3.15, 3.93];
//       if (printSettings.paper_size === "thermal2") formatSetting = [3.93, 5.9];

//       const opt = {
//         margin: 0.1,
//         filename: `Resi-${transaction.order_id}.pdf`,
//         image: { type: "jpeg" as const, quality: 1 },
//         html2canvas: { scale: 2, useCORS: true, allowTaint: true, scrollY: 0, scrollX: 0 },
//         jsPDF: { unit: "in" as const, format: formatSetting as any, orientation: "portrait" as const },
//       };

//       html2pdf()
//         .set(opt)
//         .from(element)
//         .save()
//         .then(() => {
//           setIsPreparingPDF(false); 
//           Swal.fire({
//             icon: "success",
//             title: "Berhasil",
//             text: "Resi PDF berhasil diunduh.",
//             confirmButtonColor: "#059669",
//           });
//         })
//         .catch((err: any) => {
//           console.error("Error generating PDF:", err);
//           setIsPreparingPDF(false);
//           Swal.fire("Error", "Gagal memproses PDF", "error");
//         });
//     }, 1500);
//   };


//   // --- RENDER ---
//   return (
//     <div className="relative max-w-6xl min-h-screen px-6 py-12 mx-auto font-sans">
      
//       {/* OVERLAY: PREPARING PDF (MENGGUNAKAN GAYA VUE) */}
//       {isPreparingPDF && (
//         <div className="fixed inset-0 z-[999999] bg-gray-900/95 overflow-y-auto">
//           <div className="flex flex-col items-center min-h-screen px-4 py-10">
//             <div className="flex items-center gap-3 mb-8 font-bold tracking-widest text-white uppercase animate-pulse">
//               <div className="w-6 h-6 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
//               Generating PDF Document...
//             </div>

//             <div id="print-label-template" className="bg-white text-black p-8 w-[800px] shrink-0 border-[3px] border-black flex flex-col gap-4">
//               {transaction && (
//                 <>
//                   <div className="flex items-center justify-between pb-4 border-b-2 border-black">
//                     <div className="w-1/3">
//                       {getCourierLogo(transaction.courier_company) ? (
//                         <img src={getCourierLogo(transaction.courier_company)!} className="object-contain h-12" />
//                       ) : (
//                         <span className="text-2xl font-black uppercase">{transaction.courier_company}</span>
//                       )}
//                     </div>
//                     <div className="w-1/3 text-center">
//                       <h1 className="text-3xl font-black tracking-widest text-black uppercase">GYCORA</h1>
//                       <p className="text-[10px] font-bold mt-1 text-black">gycora.id</p>
//                     </div>
//                     <div className="w-1/3 text-right">
//                       <p className="text-xl font-black text-black uppercase">{transaction.courier_type}</p>
//                     </div>
//                   </div>

//                   <div className="flex flex-col items-center py-6 text-center border-b-2 border-black">
//                     <img
//                       src={`https://bwipjs-api.metafloor.com/?bcid=code128&text=${biteshipData?.courier?.waybill_id || transaction.tracking_number || transaction.order_id}&scale=4&includetext=false`}
//                       className="object-contain h-24 mb-4"
//                       crossOrigin="anonymous"
//                       alt="Barcode"
//                     />
//                     <p className="text-2xl font-black tracking-widest text-black">
//                       Nomor Resi - {biteshipData?.courier?.waybill_id || transaction.tracking_number || "N/A"}
//                     </p>
//                   </div>

//                   {printSettings.shipping_fee_shown && (
//                     <div className="py-4 text-center border-b-2 border-black">
//                       <p className="text-2xl font-black text-black">
//                         Ongkos Kirim: {formatPrice(transaction.shipping_cost)}
//                       </p>
//                       {transaction.promo_discount > 0 && (
//                         <p className="mt-1 text-lg font-bold text-black">
//                           Diskon Promo: - {formatPrice(transaction.promo_discount)}
//                         </p>
//                       )}
//                       <p className="mt-1 text-lg font-bold text-black">
//                         Jenis Layanan - {transaction.courier_type}
//                       </p>
//                     </div>
//                   )}

//                   <div className="flex gap-6 py-6 border-b-2 border-black">
//                     <div className="flex flex-col w-1/2 pr-6 border-r-2 border-black">
//                       <p className="mb-3 text-sm font-bold text-black">Reference Number:</p>
//                       <img
//                         src={`https://bwipjs-api.metafloor.com/?bcid=code128&text=${transaction.order_id}&scale=3&includetext=false`}
//                         className="self-start object-contain h-16"
//                         crossOrigin="anonymous"
//                         alt="Reference Barcode"
//                       />
//                       <p className="mt-2 text-sm font-bold text-black">{transaction.order_id}</p>
//                     </div>
//                     <div className="flex flex-col justify-center w-1/2 space-y-3 text-xl text-black">
//                       <p>Quantity <span className="mx-2">:</span><span className="font-black">{totalQuantity} Pcs</span></p>
//                       <p>Weight <span className="mx-4">:</span><span className="font-black">{totalQuantity} Kg</span></p>
//                     </div>
//                   </div>

//                   <div className="flex gap-6 py-6 border-b-2 border-black">
//                     <div className="w-1/2 pr-6 text-black border-r-2 border-black">
//                       <p className="mb-3 text-sm font-black uppercase">Alamat Penerima:</p>
//                       <p className="text-xl font-black leading-tight">{getCensoredName()}</p>
//                       {printSettings.receiver_phone_shown && (
//                         <p className="mt-1 font-mono text-xl font-bold">{transaction.user.phone || "-"}</p>
//                       )}
//                       <p className="mt-3 text-lg leading-snug">
//                         {transaction.address?.address_location || "Alamat tidak tersedia"}, {transaction.address?.postal_code || ""}
//                       </p>
//                     </div>
//                     <div className="w-1/2 pr-6 text-black">
//                       <p className="mb-3 text-sm font-black uppercase">Alamat Pengirim:</p>
//                       <p className="text-xl font-black leading-tight">Gycora Store</p>
//                       {printSettings.origin_phone_shown && (
//                         <p className="mt-1 font-mono text-xl font-bold">08883888585</p>
//                       )}
//                       {printSettings.origin_address_shown && (
//                         <p className="mt-3 text-lg leading-snug">
//                           Jalan Kecilung N0. 8A, Kota Surabaya, Jawa Timur 60275, Indonesia
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   {printSettings.item_description_shown && (
//                     <div className="py-6 text-lg leading-relaxed text-black border-b-2 border-black">
//                       <div className="flex">
//                         <span className="w-40 font-black uppercase shrink-0">Jenis Barang: </span>
//                         <span className="font-bold">{getItemsDescription()}</span>
//                       </div>
//                     </div>
//                   )}

//                   <div className="flex py-4 text-lg text-black border-b-2 border-black">
//                     <span className="w-40 font-black uppercase shrink-0">Catatan: </span>
//                     <span className="font-bold">Tidak Ada</span>
//                   </div>

//                   <div className="pt-4 text-sm font-bold text-center text-black">
//                     Pengiriman melalui platform Gycora
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}


//       {/* TOP NAVIGATION ACTIONS */}
//       <div className="relative z-10 flex flex-col justify-between gap-4 mb-10 sm:flex-row sm:items-center">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-gray-500 transition-colors w-fit hover:text-gray-900 group"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//           </svg>
//           <span className="text-sm font-bold tracking-widest uppercase">Back to List</span>
//         </button>

//         <div className="flex items-center gap-4">
//           {transaction?.shipping_method === 'biteship' && transaction?.biteship_order_id && (
//             <button
//               onClick={() => setShowPrintModal(true)}
//               className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white transition rounded-lg shadow-sm bg-gycora hover:bg-gycora-dark"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
//               </svg>
//               Cetak Resi
//             </button>
//           )}

//           {transaction?.shipping_method === 'biteship' && <div className="w-px h-8 bg-gray-200"></div>}

//           <div className="text-right">
//             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order Date</p>
//             <p className="text-sm font-bold text-gray-900">{formatDate(transaction?.created_at)}</p>
//           </div>
//           <div className="w-px h-8 bg-gray-200"></div>
//           <span className={`shadow-sm px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest ${statusClass(transaction?.status)}`}>
//             {formatStatus(transaction?.status)}
//           </span>
//         </div>
//       </div>


//       {/* PRINT MODAL (SETTINGS) */}
//       {showPrintModal && (
//         <div className="fixed inset-0 z-[500] flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm animate-fade-in">
//           <div className="flex flex-col w-full max-w-lg overflow-hidden bg-white shadow-2xl rounded-xl">
//             <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
//               <h3 className="text-lg font-bold text-gray-800">Print Label</h3>
//               <button onClick={() => setShowPrintModal(false)} className="text-gray-400 transition hover:text-red-500">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             <div className="flex-grow p-6 space-y-6 overflow-y-auto max-h-[70vh]">
//               <div>
//                 <h4 className="mb-4 font-bold text-gray-800">Isi Detail Resi</h4>
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                   <div className="space-y-3">
//                     <label className="flex items-center gap-3 cursor-pointer group">
//                       <input type="checkbox" checked={printSettings.insurance_shown} onChange={(e) => setPrintSettings({...printSettings, insurance_shown: e.target.checked})} className="w-5 h-5 border-gray-300 rounded cursor-pointer focus:ring-gycora text-gycora" />
//                       <span className="text-sm text-gray-600 group-hover:text-black">Nilai Asuransi</span>
//                     </label>
//                     <label className="flex items-center gap-3 cursor-pointer group">
//                       <input type="checkbox" checked={printSettings.shipping_fee_shown} onChange={(e) => setPrintSettings({...printSettings, shipping_fee_shown: e.target.checked})} className="w-5 h-5 border-gray-300 rounded cursor-pointer focus:ring-gycora text-gycora" />
//                       <span className="text-sm text-gray-600 group-hover:text-black">Ongkos Kirim</span>
//                     </label>
//                     <label className="flex items-center gap-3 cursor-pointer group">
//                       <input type="checkbox" checked={printSettings.item_description_shown} onChange={(e) => setPrintSettings({...printSettings, item_description_shown: e.target.checked})} className="w-5 h-5 border-gray-300 rounded cursor-pointer focus:ring-gycora text-gycora" />
//                       <span className="text-sm text-gray-600 group-hover:text-black">Deskripsi Barang</span>
//                     </label>
//                     <label className="flex items-center gap-3 cursor-pointer group">
//                       <input type="checkbox" checked={printSettings.item_sku_shown} onChange={(e) => setPrintSettings({...printSettings, item_sku_shown: e.target.checked})} className="w-5 h-5 border-gray-300 rounded cursor-pointer focus:ring-gycora text-gycora" />
//                       <span className="text-sm text-gray-600 group-hover:text-black">SKU Barang</span>
//                     </label>
//                   </div>
//                   <div className="space-y-3">
//                     <label className="flex items-center gap-3 cursor-pointer group">
//                       <input type="checkbox" checked={printSettings.origin_phone_shown} onChange={(e) => setPrintSettings({...printSettings, origin_phone_shown: e.target.checked})} className="w-5 h-5 border-gray-300 rounded cursor-pointer focus:ring-gycora text-gycora" />
//                       <span className="text-sm text-gray-600 group-hover:text-black">No. Telp Pengirim</span>
//                     </label>
//                     <label className="flex items-center gap-3 cursor-pointer group">
//                       <input type="checkbox" checked={printSettings.origin_address_shown} onChange={(e) => setPrintSettings({...printSettings, origin_address_shown: e.target.checked})} className="w-5 h-5 border-gray-300 rounded cursor-pointer focus:ring-gycora text-gycora" />
//                       <span className="text-sm text-gray-600 group-hover:text-black">Alamat Pengirim</span>
//                     </label>
//                     <label className="flex items-center gap-3 cursor-pointer group">
//                       <input type="checkbox" checked={printSettings.receiver_phone_shown} onChange={(e) => setPrintSettings({...printSettings, receiver_phone_shown: e.target.checked})} className="w-5 h-5 border-gray-300 rounded cursor-pointer focus:ring-gycora text-gycora" />
//                       <span className="text-sm text-gray-600 group-hover:text-black">No. Telp Penerima</span>
//                     </label>
//                     <label className="flex items-center gap-3 cursor-pointer group">
//                       <input type="checkbox" checked={printSettings.censor_receiver_name} onChange={(e) => setPrintSettings({...printSettings, censor_receiver_name: e.target.checked})} className="w-5 h-5 border-gray-300 rounded cursor-pointer focus:ring-gycora text-gycora" />
//                       <span className="text-sm text-gray-600 group-hover:text-black">Sensor Nama Penerima</span>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <h4 className="mb-3 font-bold text-gray-800">Tipe Label</h4>
//                 <select
//                   value={printSettings.paper_size}
//                   onChange={(e) => setPrintSettings({...printSettings, paper_size: e.target.value})}
//                   className="w-full p-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg outline-none cursor-pointer focus:ring-gycora focus:border-gycora"
//                 >
//                   <option value="a4">Default Kertas (A4)</option>
//                   <option value="thermal">Thermal 1 (8 x 10 cm)</option>
//                   <option value="thermal2">Thermal 2 (10 x 15 cm)</option>
//                 </select>
//               </div>
//             </div>

//             <div className="p-6 border-t border-gray-100 bg-gray-50">
//               <button
//                 onClick={generateAndDownloadPDF}
//                 className="w-full px-4 py-3 font-bold text-white transition rounded-lg shadow-md bg-gycora hover:bg-gycora-dark"
//               >
//                 Download Label (PDF)
//               </button>
//             </div>
//           </div>
//         </div>
//       )}


//       {/* PAGE CONTENT */}
//       {isLoading ? (
//         <div className="relative z-10 flex flex-col items-center justify-center py-20 animate-pulse">
//           <div className="w-12 h-12 mb-4 border-4 border-gray-100 rounded-full border-t-black animate-spin"></div>
//           <p className="font-serif italic text-center text-gray-400">Loading transaction details...</p>
//         </div>
//       ) : transaction ? (
//         <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-3 animate-fade-in">
          
//           <div className="space-y-6 lg:col-span-2">
            
//             {/* ORDER ITEMS CARD */}
//             <div className="bg-white shadow-sm p-6 sm:p-8 border border-gray-100 rounded-[2rem]">
//               <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
//                 <h2 className="text-xl font-bold tracking-tight text-gray-800">Order Items</h2>
//                 <div className="flex items-center gap-2">
//                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{transaction.details.length} Variants</span>
//                   <span className="px-3 py-1 text-xs font-bold text-white bg-black rounded-full">{totalQuantity} Total Items</span>
//                 </div>
//               </div>
//               <div className="divide-y divide-gray-50">
//                 {transaction.details.map((item: any) => (
//                   <div key={item.id} className="flex gap-6 py-6 first:pt-0 last:pb-0">
//                     <img src={item.product.image_url} className="object-cover w-24 h-24 border border-gray-100 shadow-sm bg-gray-50 rounded-2xl shrink-0" />
//                     <div className="flex flex-col justify-center flex-grow">
//                       <h3 className="text-sm font-bold tracking-wide text-gray-900 uppercase">{item.product.name}</h3>
                      
//                       {/* INDIKATOR WARNA DENGAN LINGKARAN */}
//                       {item.color && (
//                         <div className="flex items-center gap-2 mt-1">
//                           <p className="text-[10px] text-gray-500 uppercase tracking-widest">
//                             Color:
//                           </p>
//                           <div 
//                             className="w-3 h-3 border border-gray-300 rounded-full shadow-sm" 
//                             style={{ backgroundColor: item.color }}
//                             title="Varian Warna"
//                           ></div>
//                         </div>
//                       )}

//                       <p className="mt-1 font-mono text-xs text-gray-400">SKU: {item.product.sku}</p>
//                       <div className="flex items-end justify-between mt-4">
//                         <p className="px-3 py-1 text-sm text-gray-600 rounded-lg bg-gray-50">
//                           {item.quantity} <span className="text-[10px] mx-1">x</span> {formatPrice(item.price)}
//                         </p>
//                         <p className="font-bold text-black">{formatPrice(item.quantity * item.price)}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* LOGISTICS & PAYMENT ROW */}
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              
//               {/* LOGISTICS CARD */}
//               <div className="bg-white shadow-sm p-6 sm:p-8 border border-gray-100 rounded-[2rem] flex flex-col relative overflow-hidden">
//                 <h2 className="pb-4 mb-6 text-sm font-bold tracking-widest text-gray-800 uppercase border-b border-gray-100">Logistics</h2>
//                 {trackingLoading && (
//                   <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
//                     <div className="w-8 h-8 border-2 border-gray-200 rounded-full border-t-black animate-spin"></div>
//                     <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-bold">Syncing Biteship...</p>
//                   </div>
//                 )}
//                 {transaction.shipping_method !== 'free' ? (
//                   <div className="flex flex-col justify-between flex-grow">
//                     <div className="flex items-center gap-4 mb-4">
//                       <div className="flex items-center justify-center w-16 h-12 p-1 bg-white border border-gray-200 shrink-0 rounded-xl">
//                         {getCourierLogo(transaction.courier_company) ? (
//                           <img src={getCourierLogo(transaction.courier_company)!} className="object-contain w-full h-full" />
//                         ) : (
//                           <span className="text-[10px] font-black text-gray-400">{transaction.courier_company?.toUpperCase()}</span>
//                         )}
//                       </div>
//                       <div>
//                         <p className="text-sm font-bold text-gray-900 uppercase">{transaction.courier_company}</p>
//                         <p className="text-xs text-gray-500 uppercase">{transaction.courier_type}</p>
//                       </div>
//                     </div>
//                     <div className="p-4 mt-auto space-y-2 bg-gray-50 rounded-xl">
//                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tracking Number (Resi)</p>
//                       <div className="flex items-center justify-between">
//                         <p className="font-mono text-sm font-bold text-black">
//                           {biteshipData?.courier?.waybill_id || transaction.tracking_number || "Pending Allocation"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col items-center justify-center flex-grow p-6 text-center bg-gray-50 rounded-xl">
//                     <div className="flex items-center justify-center w-12 h-12 mb-3 text-white bg-black rounded-full">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                       </svg>
//                     </div>
//                     <p className="text-sm font-bold text-gray-900 uppercase">No Courier</p>
//                     <p className="mt-1 text-xs font-bold text-gray-500">In-Store Pickup</p>
//                   </div>
//                 )}
//               </div>

//               {/* PAYMENT METHOD CARD */}
//               <div className="bg-white shadow-sm p-6 sm:p-8 border border-gray-100 rounded-[2rem] flex flex-col">
//                 <h2 className="pb-4 mb-6 text-sm font-bold tracking-widest text-gray-800 uppercase border-b border-gray-100">Payment Method</h2>
//                 {transaction.payment_method ? (
//                   <div className="flex flex-col justify-center flex-grow">
//                     <div className="flex items-center gap-4 mb-6">
//                       <div className="flex items-center justify-center w-16 h-12 p-1 border border-gray-100 shrink-0 bg-gray-50 rounded-xl">
//                         {getPaymentLogo(transaction.payment_method) ? (
//                           <img src={getPaymentLogo(transaction.payment_method)!} className="object-contain w-full h-full" />
//                         ) : (
//                           <span className="text-[10px] font-black text-gray-400">PAY</span>
//                         )}
//                       </div>
//                       <div>
//                         <p className="text-sm font-bold text-gray-900 uppercase">{transaction.payment_method.replace("_", " ")}</p>
//                         <p className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${getPaymentStatusColor(transaction.status)}`}>
//                           Status: {getPaymentStatusText(transaction.status)}
//                         </p>
//                       </div>
//                     </div>
//                     {transaction.payment && (
//                       <div className="p-4 mt-auto border border-blue-100 bg-blue-50/50 rounded-xl">
//                         <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Xendit Ref ID</p>
//                         <p className="font-mono text-xs text-blue-900 truncate">{transaction.payment.external_id}</p>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="flex items-center justify-center flex-grow">
//                     <p className="text-sm italic text-gray-400">Method not selected</p>
//                   </div>
//                 )}
//               </div>

//             </div>
//           </div>

//           <div className="space-y-6 lg:col-span-1">
            
//             {/* CUSTOMER DETAILS */}
//             <div className="bg-gray-900 shadow-xl p-8 rounded-[2rem] text-white relative overflow-hidden">
//               <div className="absolute w-32 h-32 bg-white rounded-full pointer-events-none opacity-5 -right-6 -top-6 blur-2xl"></div>
//               <h2 className="opacity-50 mb-6 font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                 </svg>
//                 Customer Details
//               </h2>
//               <p className="text-xl font-bold leading-none uppercase">{transaction.user.first_name} {transaction.user.last_name}</p>
//               <div className="mt-4 space-y-2 opacity-80">
//                 <p className="flex items-center gap-2 text-sm">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                   </svg>
//                   {transaction.user.email}
//                 </p>
//                 <p className="flex items-center gap-2 text-sm">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                   </svg>
//                   {transaction.user.phone || "No phone"}
//                 </p>
//               </div>
//               <div className="pt-6 mt-6 space-y-4 border-t border-white/10">
//                 <div>
//                   <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
//                   <div className="px-3 py-2 font-mono text-xs rounded-lg bg-white/10">{transaction.order_id}</div>
//                 </div>
//               </div>
//             </div>

//             {/* FINANCIAL SUMMARY */}
//             <div className="bg-white shadow-sm p-8 border border-gray-100 rounded-[2rem]">
//               <h2 className="mb-6 font-black text-[10px] text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-4">
//                 Financial Summary
//               </h2>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between text-sm text-gray-600">
//                   <span>Subtotal ({totalQuantity} items)</span>
//                   <span className="font-medium text-gray-900">{formatPrice(transaction.total_amount)}</span>
//                 </div>
//                 <div className="flex items-center justify-between text-sm text-gray-600">
//                   <span>Shipping Fee</span>
//                   {transaction.shipping_method === 'free' ? (
//                     <span className="font-bold text-emerald-600">Free</span>
//                   ) : (
//                     <span className="font-medium text-gray-900">{formatPrice(transaction.shipping_cost)}</span>
//                   )}
//                 </div>

//                 {transaction.promo_discount > 0 && (
//                   <div className="flex items-center justify-between text-sm font-medium text-emerald-600">
//                     <span>Promo Code ({transaction.promo_code})</span>
//                     <span>- {formatPrice(transaction.promo_discount)}</span>
//                   </div>
//                 )}
//                 {transaction.points_used > 0 && (
//                   <div className="flex items-center justify-between text-sm font-medium text-yellow-600">
//                     <span>Loyalty Points ({transaction.points_used} Pts)</span>
//                     <span>- {formatPrice(transaction.points_used * 1000)}</span>
//                   </div>
//                 )}

//                 <div className="flex items-end justify-between pt-4 border-t border-gray-100 border-dashed">
//                   <div>
//                     <span className="block text-xs font-bold tracking-widest text-gray-900 uppercase">Grand Total</span>
//                     <span className="text-[10px] text-gray-400 italic">Paid by customer</span>
//                   </div>
//                   <span className="text-2xl font-bold text-black">{formatPrice(getGrandTotal(transaction))}</span>
//                 </div>
//               </div>

//               {transaction.point > 0 && transaction.status === 'completed' && (
//                 <div className="flex items-center justify-between p-4 mt-4 border rounded-xl bg-gradient-to-r from-emerald-50 to-white border-emerald-100">
//                   <div className="flex items-center gap-3">
//                     <div className="flex items-center justify-center w-10 h-10 text-white rounded-full shadow-sm bg-emerald-500">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">Loyalty Reward</p>
//                       <p className="text-xs mt-0.5 text-gray-500">Points awarded to user</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <span className="text-2xl font-black text-emerald-600">+{transaction.point}</span>
//                     <span className="ml-1 text-xs font-bold text-emerald-800">Pts</span>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* TIMELINE */}
//             <div className="bg-white shadow-sm p-6 sm:p-8 border border-gray-100 rounded-[2rem]">
//               <h2 className="mb-6 font-black text-[10px] text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-4 flex justify-between items-center">
//                 <span>Tracking Timeline</span>
//                 {biteshipData && transaction.shipping_method === 'biteship' && (
//                   <span className="flex items-center gap-1 text-[8px] text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
//                     <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Live
//                   </span>
//                 )}
//               </h2>
//               {transaction.shipping_method === 'free' ? (
//                 <div className="py-6 text-center">
//                   <p className="mb-2 text-xs italic text-gray-500">No physical shipping required.</p>
//                   <p className="text-sm font-bold text-black uppercase">In-Store Pickup</p>
//                 </div>
//               ) : trackingLoading ? (
//                 <div className="flex justify-center py-6">
//                   <div className="w-6 h-6 border-2 border-gray-200 rounded-full border-t-black animate-spin"></div>
//                 </div>
//               ) : (
//                 <div className="relative ml-2 space-y-6 border-l-2 border-gray-100">
//                   {timelineHistory.map((history: any, index: number) => (
//                     <div key={index} className="relative pl-6">
//                       <span className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all ${index === 0 ? 'bg-gycora ring-4 ring-gray-50' : 'bg-gray-300'}`}></span>
//                       <div className={index === 0 ? 'opacity-100' : 'opacity-50'}>
//                         <p className="mb-1 text-xs font-bold tracking-wide text-gray-900 uppercase">{formatStatusTitle(history.status)}</p>
//                         <p className="text-[11px] text-gray-600 leading-tight mb-1.5">{history.note}</p>
//                         <p className="text-[9px] text-gray-400 font-medium font-mono">{formatDateTime(history.updated_at)}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//           </div>
//         </div>
//       ) : null}

//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import html2pdf from "html2pdf.js";
import { BASE_URL } from "../../config/api";

export default function TransactionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // --- STATE ---
  const [transaction, setTransaction] = useState<any>(null);
  const [biteshipData, setBiteshipData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [trackingLoading, setTrackingLoading] = useState(false);
  
  // Print Resi State
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [isPreparingPDF, setIsPreparingPDF] = useState(false);
  
  // Export Invoice State
  const [isExportingInvoice, setIsExportingInvoice] = useState(false);

  const [printSettings, setPrintSettings] = useState({
    insurance_shown: true,
    shipping_fee_shown: true,
    item_description_shown: true,
    item_sku_shown: true,
    origin_phone_shown: true,
    origin_address_shown: true,
    receiver_phone_shown: true,
    censor_receiver_name: true,
    paper_size: "a4",
  });

  // --- API / DATA FETCHING ---
  useEffect(() => {
    const fetchTrackingData = async (trxId: number, trxData: any) => {
      if (trxData.shipping_method !== "biteship" || !trxData.biteship_order_id) return;
      
      setTrackingLoading(true);
      try {
        const token = localStorage.getItem("admin_token");
        const res = await fetch(`${BASE_URL}/api/admin/transactions/${trxId}/tracking`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setBiteshipData(data);
        }
      } catch (error) {
        console.error("Failed to fetch biteship data:", error);
      } finally {
        setTrackingLoading(false);
      }
    };

    const fetchData = async () => {
      setIsLoading(true);
      const stateData = location.state?.transactionData;
      const token = localStorage.getItem("admin_token");

      if (stateData) {
        setTransaction(stateData);
        setIsLoading(false);
        fetchTrackingData(stateData.id, stateData);
        
        // Background sync to ensure fresh data
        try {
          const res = await fetch(`${BASE_URL}/api/admin/transactions/${id}`, {
            headers: { "Authorization": `Bearer ${token}` }
          });
          if (res.ok) {
             const data = await res.json();
             setTransaction(data);
          }
        } catch (error) {
          console.error("Background sync failed", error);
        }
      } else {
        try {
          const res = await fetch(`${BASE_URL}/api/admin/transactions/${id}`, {
            headers: { "Authorization": `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            setTransaction(data);
            fetchTrackingData(data.id, data);
          } else {
             throw new Error("Failed to load transaction detail");
          }
        } catch (error) {
          console.error("Detail fetch error:", error);
          Swal.fire("Error", "Gagal memuat detail transaksi", "error");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);


  // --- COMPUTED / LOGIC HELPERS ---
  const totalQuantity = useMemo(() => {
    if (!transaction || !transaction.details) return 0;
    return transaction.details.reduce((sum: number, item: any) => sum + parseInt(item.quantity), 0);
  }, [transaction]);

  const timelineHistory = useMemo(() => {
    const apiHistory = biteshipData?.courier?.history || [];
    if (apiHistory.length > 0) return [...apiHistory].reverse();
    return [
      {
        status: biteshipData?.status || transaction?.status || "Processing",
        note: getNoteFromStatus(biteshipData?.status || transaction?.status),
        updated_at: biteshipData?.delivery?.datetime || transaction?.created_at || new Date().toISOString(),
      },
    ];
  }, [biteshipData, transaction]);

  // --- UI FORMATTING HELPERS ---
  const formatPrice = (v: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(v || 0);

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long", year: "numeric", month: "short", day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
    });
  };

  const formatStatus = (s: string) => (s ? s.replace(/_/g, " ") : "");
  const formatStatusTitle = (status: string) => {
    if (!status) return "Processing";
    const formatted = status.replace(/_/g, " ");
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  function getNoteFromStatus(status: string) {
    const map: Record<string, string> = {
      pending: "Menunggu pembayaran dari pelanggan.",
      placed: "Pesanan telah masuk dan menunggu alokasi kurir.",
      allocated: "Kurir telah dialokasikan dan akan segera menjemput paket.",
      picking_up: "Kurir sedang dalam perjalanan menuju lokasi penjemputan.",
      picked: "Paket telah diambil oleh kurir dan masuk ke pusat sortir.",
      dropping_off: "Paket sedang dalam perjalanan menuju alamat tujuan.",
      delivered: "Paket telah berhasil dikirim dan diterima.",
      rejected: "Pengiriman ditolak oleh kurir.",
      cancelled: "Pengiriman telah dibatalkan.",
    };
    return map[status] || "Pesanan sedang diproses oleh sistem.";
  }

  const getGrandTotal = (trx: any) => {
    if (!trx) return 0;
    const total = parseFloat(trx.total_amount || 0);
    const shipping = parseFloat(trx.shipping_cost || 0);
    const promo = parseFloat(trx.promo_discount || 0);
    const pointsDiscount = (trx.points_used || 0) * 1000;
    return total + shipping - promo - pointsDiscount;
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

  const getCourierLogo = (company: string) => {
    if (!company) return null;
    const map: Record<string, string> = {
      jne: "jne.png", sicepat: "sicepat.png", jnt: "jnt.png", anteraja: "anteraja.png",
      gojek: "gojek.png", grab: "grab.png", paxel: "paxel.png", ninja: "ninja.png",
    };
    return map[company.toLowerCase()] ? "/courier_images/" + map[company.toLowerCase()] : null;
  };

  const getPaymentStatusText = (status: string) =>
    ["completed", "processing", "refund_requested", "refund_approved", "refund_rejected"].includes(status)
      ? "PAID"
      : status === "cancelled" ? "CANCELLED" : status === "refunded" ? "REFUNDED" : "UNPAID";

  const getPaymentStatusColor = (status: string) =>
    ["completed", "processing", "refund_requested", "refund_approved", "refund_rejected"].includes(status)
      ? "text-emerald-600"
      : status === "cancelled" ? "text-red-500" : status === "refunded" ? "text-teal-600" : "text-orange-500";

  const statusClass = (status: string) => {
    const map: Record<string, string> = {
      awaiting_payment: "bg-yellow-100 text-yellow-700",
      pending: "bg-orange-100 text-orange-700",
      processing: "bg-blue-100 text-blue-700",
      completed: "bg-emerald-100 text-emerald-700",
      cancelled: "bg-red-100 text-red-700",
      refund_requested: "bg-purple-100 text-purple-700",
      refund_approved: "bg-indigo-100 text-indigo-700",
      refund_rejected: "bg-gray-200 text-gray-600 line-through",
      refunded: "bg-teal-100 text-teal-700",
      refund_manual_required: "bg-pink-100 text-pink-700",
    };
    return map[status] || "bg-gray-100 text-gray-500";
  };


  // --- PRINT LABEL LOGIC ---
  const getCensoredName = () => {
    const addr = transaction?.address;
    let name = "";

    if (addr && addr.first_name_address) {
      name = `${addr.first_name_address} ${addr.last_name_address || ""}`.trim();
    } else if (transaction?.user) {
      name = `${transaction.user.first_name || ""} ${transaction.user.last_name || ""}`.trim();
    }

    if (!name) name = "Customer";
    if (!printSettings.censor_receiver_name) return name;

    return name
      .split(" ")
      .map((word) => {
        if (word.length <= 1) return word;
        return word.charAt(0) + "*".repeat(word.length - 1);
      })
      .join(" ");
  };

  const getItemsDescription = () => {
    if (!transaction?.details) return "-";
    return transaction.details
      .map((d: any) => {
        let desc = `${d.quantity}x ${d.product.name}`;
        if (d.color) desc += ` - ${d.color}`;
        if (printSettings.item_sku_shown && d.product.code) desc += ` (${d.product.code})`;
        return desc;
      })
      .join(", ");
  };

  const generateAndDownloadPDF = () => {
    setShowPrintModal(false);
    setIsPreparingPDF(true); 

    setTimeout(() => {
      const element = document.getElementById("print-label-template");
      if(!element) {
          setIsPreparingPDF(false);
          return Swal.fire("Error", "Elemen PDF tidak ditemukan", "error");
      }

      let formatSetting: string | number[] = "a4";
      if (printSettings.paper_size === "thermal") formatSetting = [3.15, 3.93];
      if (printSettings.paper_size === "thermal2") formatSetting = [3.93, 5.9];

      const opt = {
        margin: 0.1,
        filename: `Resi-${transaction.order_id}.pdf`,
        image: { type: "jpeg" as const, quality: 1 },
        html2canvas: { scale: 2, useCORS: true, allowTaint: true, scrollY: 0, scrollX: 0 },
        jsPDF: { unit: "in" as const, format: formatSetting as any, orientation: "portrait" as const },
      };

      html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
          setIsPreparingPDF(false); 
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Resi PDF berhasil diunduh.",
            confirmButtonColor: "#059669",
          });
        })
        .catch((err: any) => {
          console.error("Error generating PDF:", err);
          setIsPreparingPDF(false);
          Swal.fire("Error", "Gagal memproses PDF", "error");
        });
    }, 1500);
  };

  // --- EXPORT INVOICE LOGIC ---
  const generateInvoicePDF = () => {
    setIsExportingInvoice(true);
    
    setTimeout(() => {
      const element = document.getElementById("export-invoice-template");
      if(!element) {
          setIsExportingInvoice(false);
          return Swal.fire("Error", "Elemen Invoice PDF tidak ditemukan", "error");
      }

      const opt = {
        margin: 0.5,
        filename: `Invoice-${transaction.order_id}.pdf`,
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, allowTaint: true, scrollY: 0, scrollX: 0 },
        jsPDF: { unit: "in" as const, format: "a4", orientation: "portrait" as const },
      };

      html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
          setIsExportingInvoice(false); 
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Faktur/Invoice berhasil diunduh.",
            confirmButtonColor: "#059669",
            timer: 2000,
            showConfirmButton: false
          });
        })
        .catch((err: any) => {
          console.error("Error generating Invoice PDF:", err);
          setIsExportingInvoice(false);
          Swal.fire("Error", "Gagal memproses Invoice PDF", "error");
        });
    }, 1000);
  };


  // --- RENDER ---
  return (
    <div className="relative max-w-6xl min-h-screen px-6 py-12 mx-auto font-sans">
      
      {/* OVERLAY: PREPARING PDF (MENGGUNAKAN GAYA VUE) */}
      {(isPreparingPDF || isExportingInvoice) && (
        <div className="fixed inset-0 z-[999999] bg-gray-900/95 overflow-y-auto">
          <div className="flex flex-col items-center min-h-screen px-4 py-10">
            <div className="flex items-center gap-3 mb-8 font-bold tracking-widest text-white uppercase animate-pulse">
              <div className="w-6 h-6 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
              Generating PDF Document...
            </div>

            {/* TEMPLATE: CETAK RESI LOGISTIK */}
            <div id="print-label-template" className={`bg-white text-black p-8 w-[800px] shrink-0 border-[3px] border-black flex flex-col gap-4 ${isExportingInvoice ? 'hidden' : ''}`}>
              {transaction && (
                <>
                  <div className="flex items-center justify-between pb-4 border-b-2 border-black">
                    <div className="w-1/3">
                      {getCourierLogo(transaction.courier_company) ? (
                        <img src={getCourierLogo(transaction.courier_company)!} className="object-contain h-12" />
                      ) : (
                        <span className="text-2xl font-black uppercase">{transaction.courier_company}</span>
                      )}
                    </div>
                    <div className="w-1/3 text-center">
                      <h1 className="text-3xl font-black tracking-widest text-black uppercase">GYCORA</h1>
                      <p className="text-[10px] font-bold mt-1 text-black">gycora.id</p>
                    </div>
                    <div className="w-1/3 text-right">
                      <p className="text-xl font-black text-black uppercase">{transaction.courier_type}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center py-6 text-center border-b-2 border-black">
                    <img
                      src={`https://bwipjs-api.metafloor.com/?bcid=code128&text=${biteshipData?.courier?.waybill_id || transaction.tracking_number || transaction.order_id}&scale=4&includetext=false`}
                      className="object-contain h-24 mb-4"
                      crossOrigin="anonymous"
                      alt="Barcode"
                    />
                    <p className="text-2xl font-black tracking-widest text-black">
                      Nomor Resi - {biteshipData?.courier?.waybill_id || transaction.tracking_number || "N/A"}
                    </p>
                  </div>

                  {printSettings.shipping_fee_shown && (
                    <div className="py-4 text-center border-b-2 border-black">
                      <p className="text-2xl font-black text-black">
                        Ongkos Kirim: {formatPrice(transaction.shipping_cost)}
                      </p>
                      {transaction.promo_discount > 0 && (
                        <p className="mt-1 text-lg font-bold text-black">
                          Diskon Promo: - {formatPrice(transaction.promo_discount)}
                        </p>
                      )}
                      <p className="mt-1 text-lg font-bold text-black">
                        Jenis Layanan - {transaction.courier_type}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-6 py-6 border-b-2 border-black">
                    <div className="flex flex-col w-1/2 pr-6 border-r-2 border-black">
                      <p className="mb-3 text-sm font-bold text-black">Reference Number:</p>
                      <img
                        src={`https://bwipjs-api.metafloor.com/?bcid=code128&text=${transaction.order_id}&scale=3&includetext=false`}
                        className="self-start object-contain h-16"
                        crossOrigin="anonymous"
                        alt="Reference Barcode"
                      />
                      <p className="mt-2 text-sm font-bold text-black">{transaction.order_id}</p>
                    </div>
                    <div className="flex flex-col justify-center w-1/2 space-y-3 text-xl text-black">
                      <p>Quantity <span className="mx-2">:</span><span className="font-black">{totalQuantity} Pcs</span></p>
                      <p>Weight <span className="mx-4">:</span><span className="font-black">{totalQuantity} Kg</span></p>
                    </div>
                  </div>

                  <div className="flex gap-6 py-6 border-b-2 border-black">
                    <div className="w-1/2 pr-6 text-black border-r-2 border-black">
                      <p className="mb-3 text-sm font-black uppercase">Alamat Penerima:</p>
                      <p className="text-xl font-black leading-tight">{getCensoredName()}</p>
                      {printSettings.receiver_phone_shown && (
                        <p className="mt-1 font-mono text-xl font-bold">{transaction.user.phone || "-"}</p>
                      )}
                      <p className="mt-3 text-lg leading-snug">
                        {transaction.address?.address_location || "Alamat tidak tersedia"}, {transaction.address?.postal_code || ""}
                      </p>
                    </div>
                    <div className="w-1/2 pr-6 text-black">
                      <p className="mb-3 text-sm font-black uppercase">Alamat Pengirim:</p>
                      <p className="text-xl font-black leading-tight">Gycora Store</p>
                      {printSettings.origin_phone_shown && (
                        <p className="mt-1 font-mono text-xl font-bold">08883888585</p>
                      )}
                      {printSettings.origin_address_shown && (
                        <p className="mt-3 text-lg leading-snug">
                          Jalan Kecilung N0. 8A, Kota Surabaya, Jawa Timur 60275, Indonesia
                        </p>
                      )}
                    </div>
                  </div>

                  {printSettings.item_description_shown && (
                    <div className="py-6 text-lg leading-relaxed text-black border-b-2 border-black">
                      <div className="flex">
                        <span className="w-40 font-black uppercase shrink-0">Jenis Barang: </span>
                        <span className="font-bold">{getItemsDescription()}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex py-4 text-lg text-black border-b-2 border-black">
                    <span className="w-40 font-black uppercase shrink-0">Catatan: </span>
                    <span className="font-bold">Tidak Ada</span>
                  </div>

                  <div className="pt-4 text-sm font-bold text-center text-black">
                    Pengiriman melalui platform Gycora
                  </div>
                </>
              )}
            </div>

            {/* TEMPLATE: EXPORT INVOICE DETAIL TRANSAKSI */}
            <div id="export-invoice-template" className={`bg-white text-black p-10 w-[800px] shrink-0 font-sans ${isPreparingPDF ? 'hidden' : ''}`}>
              {transaction && (
                <>
                  {/* Header Invoice */}
                  <div className="flex items-start justify-between pb-6 mb-6 border-b border-gray-300">
                    <div>
                      <h1 className="text-3xl font-black tracking-widest uppercase text-gycora-dark">GYCORA</h1>
                      <p className="mt-1 text-sm text-gray-500">Official Online Store</p>
                      <p className="mt-1 text-sm text-gray-500">Surabaya, Indonesia</p>
                    </div>
                    <div className="text-right">
                      <h2 className="mb-2 text-4xl font-black tracking-wider text-gray-800 uppercase">INVOICE</h2>
                      <p className="text-sm font-bold text-gray-600">Order ID: {transaction.order_id}</p>
                      <p className="text-sm text-gray-500">Date: {new Date(transaction.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p className="inline-block px-2 py-1 mt-2 text-sm font-bold tracking-widest text-gray-700 uppercase bg-gray-100 rounded">
                        Status: {formatStatus(transaction.status)}
                      </p>
                    </div>
                  </div>

                  {/* Customer & Shipping Info */}
                  <div className="flex gap-8 mb-8">
                    <div className="w-1/2">
                      <h3 className="pb-2 mb-3 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-200">Billed To</h3>
                      <p className="text-lg font-bold text-gray-900">{transaction.user.first_name} {transaction.user.last_name}</p>
                      <p className="text-sm text-gray-600">{transaction.user.email}</p>
                      <p className="text-sm text-gray-600">{transaction.user.phone || "-"}</p>
                    </div>
                    <div className="w-1/2">
                      <h3 className="pb-2 mb-3 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-200">Shipped To</h3>
                      <p className="text-lg font-bold text-gray-900">{transaction.address?.first_name_address} {transaction.address?.last_name_address}</p>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600">{transaction.address?.address_location}</p>
                      <p className="text-sm text-gray-600">{transaction.address?.city}, {transaction.address?.province} - {transaction.address?.postal_code}</p>
                    </div>
                  </div>

                  {/* Order Items Table */}
                  <div className="mb-8">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="text-xs tracking-widest text-gray-600 uppercase bg-gray-100">
                          <th className="px-4 py-3 font-bold rounded-tl-lg">Item Description</th>
                          <th className="px-4 py-3 font-bold text-center">Qty</th>
                          <th className="px-4 py-3 font-bold text-right">Price</th>
                          <th className="px-4 py-3 font-bold text-right rounded-tr-lg">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {transaction.details.map((item: any) => (
                          <tr key={item.id}>
                            <td className="px-4 py-4">
                              <p className="font-bold text-gray-900">{item.product.name}</p>
                              {item.color && <p className="mt-1 text-xs text-gray-500">Color: {item.color}</p>}
                              <p className="mt-1 font-mono text-xs text-gray-400">SKU: {item.product.sku}</p>
                            </td>
                            <td className="px-4 py-4 font-medium text-center text-gray-900">{item.quantity}</td>
                            <td className="px-4 py-4 text-sm text-right text-gray-600">{formatPrice(item.price)}</td>
                            <td className="px-4 py-4 font-bold text-right text-gray-900">{formatPrice(item.quantity * item.price)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Totals Section */}
                  <div className="flex justify-end mb-8">
                    <div className="w-1/2 p-6 border border-gray-100 bg-gray-50 rounded-xl">
                      <div className="flex justify-between mb-3 text-sm text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-medium text-gray-900">{formatPrice(transaction.total_amount)}</span>
                      </div>
                      <div className="flex justify-between mb-3 text-sm text-gray-600">
                        <span>Shipping ({transaction.courier_company?.toUpperCase() || 'Free'})</span>
                        <span className="font-medium text-gray-900">{formatPrice(transaction.shipping_cost)}</span>
                      </div>
                      {transaction.promo_discount > 0 && (
                        <div className="flex justify-between mb-3 text-sm text-emerald-600">
                          <span>Discount (Promo)</span>
                          <span>-{formatPrice(transaction.promo_discount)}</span>
                        </div>
                      )}
                      {transaction.points_used > 0 && (
                        <div className="flex justify-between mb-3 text-sm text-emerald-600">
                          <span>Discount (Points)</span>
                          <span>-{formatPrice(transaction.points_used * 1000)}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-4 mt-4 border-t border-gray-300">
                        <span className="font-bold tracking-widest text-gray-900 uppercase">Grand Total</span>
                        <span className="text-2xl font-black text-gycora-dark">{formatPrice(getGrandTotal(transaction))}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  {transaction.payment_method && (
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="mb-2 text-xs font-bold tracking-widest text-gray-400 uppercase">Payment Details</h3>
                      <p className="text-sm font-bold text-gray-900 uppercase">{transaction.payment_method.replace('_', ' ')}</p>
                      {transaction.payment && <p className="mt-1 font-mono text-xs text-gray-500">Ref ID: {transaction.payment.external_id}</p>}
                    </div>
                  )}

                  <div className="pt-6 mt-12 text-xs text-center text-gray-400 border-t border-gray-200">
                    <p>Thank you for shopping at Gycora.</p>
                    <p>This is a computer-generated document. No signature is required.</p>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      )}


      {/* TOP NAVIGATION ACTIONS */}
      <div className="relative z-10 flex flex-col justify-between gap-4 mb-10 sm:flex-row sm:items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 transition-colors w-fit hover:text-gray-900 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-bold tracking-widest uppercase">Back to List</span>
        </button>

        <div className="flex flex-wrap items-center justify-end gap-4">
          
          {/* TOMBOL EXPORT INVOICE */}
          <button
            onClick={generateInvoicePDF}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-700 transition bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 hover:text-gray-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export Data
          </button>

          {transaction?.shipping_method === 'biteship' && transaction?.biteship_order_id && (
            <button
              onClick={() => setShowPrintModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white transition rounded-lg shadow-sm bg-gycora hover:bg-gycora-dark"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Cetak Resi
            </button>
          )}

          {transaction?.shipping_method === 'biteship' && <div className="hidden w-px h-8 bg-gray-200 sm:block"></div>}

          <div className="text-right">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order Date</p>
            <p className="text-sm font-bold text-gray-900">{formatDate(transaction?.created_at)}</p>
          </div>
          <div className="w-px h-8 bg-gray-200"></div>
          <span className={`shadow-sm px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest ${statusClass(transaction?.status)}`}>
            {formatStatus(transaction?.status)}
          </span>
        </div>
      </div>


      {/* PRINT MODAL (SETTINGS) */}
      {showPrintModal && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="flex flex-col w-full max-w-lg overflow-hidden bg-white shadow-2xl rounded-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Print Label</h3>
              <button onClick={() => setShowPrintModal(false)} className="text-gray-400 transition hover:text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-grow p-6 space-y-6 overflow-y-auto max-h-[70vh]">
              <div>
                <h4 className="mb-4 font-bold text-gray-800">Isi Detail Resi</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" checked={printSettings.insurance_shown} onChange={(e) => setPrintSettings({...printSettings, insurance_shown: e.target.checked})} className="w-5 h-5 border-gray-300 rounded cursor-pointer focus:ring-gycora text-gycora" />
                      <span className="text-sm text-gray-600 group-hover:text-black">Nilai Asuransi</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" checked={printSettings.shipping_fee_shown} onChange={(e) => setPrintSettings({...printSettings, shipping_fee_shown: e.target.checked})} className="w-5 h-5 border-gray-300 rounded cursor-pointer focus:ring-gycora text-gycora" />
                      <span className="text-sm text-gray-600 group-hover:text-black">Ongkos Kirim</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" checked={printSettings.item_description_shown} onChange={(e) => setPrintSettings({...printSettings, item_description_shown: e.target.checked})} className="w-5 h-5 border-gray-300 rounded cursor-pointer focus:ring-gycora text-gycora" />
                      <span className="text-sm text-gray-600 group-hover:text-black">Deskripsi Barang</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" checked={printSettings.item_sku_shown} onChange={(e) => setPrintSettings({...printSettings, item_sku_shown: e.target.checked})} className="w-5 h-5 border-gray-300 rounded cursor-pointer focus:ring-gycora text-gycora" />
                      <span className="text-sm text-gray-600 group-hover:text-black">SKU Barang</span>
                    </label>
                  </div>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" checked={printSettings.origin_phone_shown} onChange={(e) => setPrintSettings({...printSettings, origin_phone_shown: e.target.checked})} className="w-5 h-5 border-gray-300 rounded cursor-pointer focus:ring-gycora text-gycora" />
                      <span className="text-sm text-gray-600 group-hover:text-black">No. Telp Pengirim</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" checked={printSettings.origin_address_shown} onChange={(e) => setPrintSettings({...printSettings, origin_address_shown: e.target.checked})} className="w-5 h-5 border-gray-300 rounded cursor-pointer focus:ring-gycora text-gycora" />
                      <span className="text-sm text-gray-600 group-hover:text-black">Alamat Pengirim</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" checked={printSettings.receiver_phone_shown} onChange={(e) => setPrintSettings({...printSettings, receiver_phone_shown: e.target.checked})} className="w-5 h-5 border-gray-300 rounded cursor-pointer focus:ring-gycora text-gycora" />
                      <span className="text-sm text-gray-600 group-hover:text-black">No. Telp Penerima</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" checked={printSettings.censor_receiver_name} onChange={(e) => setPrintSettings({...printSettings, censor_receiver_name: e.target.checked})} className="w-5 h-5 border-gray-300 rounded cursor-pointer focus:ring-gycora text-gycora" />
                      <span className="text-sm text-gray-600 group-hover:text-black">Sensor Nama Penerima</span>
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="mb-3 font-bold text-gray-800">Tipe Label</h4>
                <select
                  value={printSettings.paper_size}
                  onChange={(e) => setPrintSettings({...printSettings, paper_size: e.target.value})}
                  className="w-full p-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg outline-none cursor-pointer focus:ring-gycora focus:border-gycora"
                >
                  <option value="a4">Default Kertas (A4)</option>
                  <option value="thermal">Thermal 1 (8 x 10 cm)</option>
                  <option value="thermal2">Thermal 2 (10 x 15 cm)</option>
                </select>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <button
                onClick={generateAndDownloadPDF}
                className="w-full px-4 py-3 font-bold text-white transition rounded-lg shadow-md bg-gycora hover:bg-gycora-dark"
              >
                Download Label (PDF)
              </button>
            </div>
          </div>
        </div>
      )}


      {/* PAGE CONTENT */}
      {isLoading ? (
        <div className="relative z-10 flex flex-col items-center justify-center py-20 animate-pulse">
          <div className="w-12 h-12 mb-4 border-4 border-gray-100 rounded-full border-t-black animate-spin"></div>
          <p className="font-serif italic text-center text-gray-400">Loading transaction details...</p>
        </div>
      ) : transaction ? (
        <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-3 animate-fade-in">
          
          <div className="space-y-6 lg:col-span-2">
            
            {/* ORDER ITEMS CARD */}
            <div className="bg-white shadow-sm p-6 sm:p-8 border border-gray-100 rounded-[2rem]">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
                <h2 className="text-xl font-bold tracking-tight text-gray-800">Order Items</h2>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{transaction.details.length} Variants</span>
                  <span className="px-3 py-1 text-xs font-bold text-white bg-black rounded-full">{totalQuantity} Total Items</span>
                </div>
              </div>
              <div className="divide-y divide-gray-50">
                {transaction.details.map((item: any) => (
                  <div key={item.id} className="flex gap-6 py-6 first:pt-0 last:pb-0">
                    <img src={item.product.image_url} className="object-cover w-24 h-24 border border-gray-100 shadow-sm bg-gray-50 rounded-2xl shrink-0" />
                    <div className="flex flex-col justify-center flex-grow">
                      <h3 className="text-sm font-bold tracking-wide text-gray-900 uppercase">{item.product.name}</h3>
                      
                      {/* INDIKATOR WARNA DENGAN LINGKARAN */}
                      {item.color && (
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                            Color:
                          </p>
                          <div 
                            className="w-3 h-3 border border-gray-300 rounded-full shadow-sm" 
                            style={{ backgroundColor: item.color }}
                            title="Varian Warna"
                          ></div>
                        </div>
                      )}

                      <p className="mt-1 font-mono text-xs text-gray-400">SKU: {item.product.sku}</p>
                      <div className="flex items-end justify-between mt-4">
                        <p className="px-3 py-1 text-sm text-gray-600 rounded-lg bg-gray-50">
                          {item.quantity} <span className="text-[10px] mx-1">x</span> {formatPrice(item.price)}
                        </p>
                        <p className="font-bold text-black">{formatPrice(item.quantity * item.price)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LOGISTICS & PAYMENT ROW */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              
              {/* LOGISTICS CARD */}
              <div className="bg-white shadow-sm p-6 sm:p-8 border border-gray-100 rounded-[2rem] flex flex-col relative overflow-hidden">
                <h2 className="pb-4 mb-6 text-sm font-bold tracking-widest text-gray-800 uppercase border-b border-gray-100">Logistics</h2>
                {trackingLoading && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                    <div className="w-8 h-8 border-2 border-gray-200 rounded-full border-t-black animate-spin"></div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-bold">Syncing Biteship...</p>
                  </div>
                )}
                {transaction.shipping_method !== 'free' ? (
                  <div className="flex flex-col justify-between flex-grow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center justify-center w-16 h-12 p-1 bg-white border border-gray-200 shrink-0 rounded-xl">
                        {getCourierLogo(transaction.courier_company) ? (
                          <img src={getCourierLogo(transaction.courier_company)!} className="object-contain w-full h-full" />
                        ) : (
                          <span className="text-[10px] font-black text-gray-400">{transaction.courier_company?.toUpperCase()}</span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 uppercase">{transaction.courier_company}</p>
                        <p className="text-xs text-gray-500 uppercase">{transaction.courier_type}</p>
                      </div>
                    </div>
                    <div className="p-4 mt-auto space-y-2 bg-gray-50 rounded-xl">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tracking Number (Resi)</p>
                      <div className="flex items-center justify-between">
                        <p className="font-mono text-sm font-bold text-black">
                          {biteshipData?.courier?.waybill_id || transaction.tracking_number || "Pending Allocation"}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center flex-grow p-6 text-center bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-center w-12 h-12 mb-3 text-white bg-black rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <p className="text-sm font-bold text-gray-900 uppercase">No Courier</p>
                    <p className="mt-1 text-xs font-bold text-gray-500">In-Store Pickup</p>
                  </div>
                )}
              </div>

              {/* PAYMENT METHOD CARD */}
              <div className="bg-white shadow-sm p-6 sm:p-8 border border-gray-100 rounded-[2rem] flex flex-col">
                <h2 className="pb-4 mb-6 text-sm font-bold tracking-widest text-gray-800 uppercase border-b border-gray-100">Payment Method</h2>
                {transaction.payment_method ? (
                  <div className="flex flex-col justify-center flex-grow">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center justify-center w-16 h-12 p-1 border border-gray-100 shrink-0 bg-gray-50 rounded-xl">
                        {getPaymentLogo(transaction.payment_method) ? (
                          <img src={getPaymentLogo(transaction.payment_method)!} className="object-contain w-full h-full" />
                        ) : (
                          <span className="text-[10px] font-black text-gray-400">PAY</span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 uppercase">{transaction.payment_method.replace("_", " ")}</p>
                        <p className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${getPaymentStatusColor(transaction.status)}`}>
                          Status: {getPaymentStatusText(transaction.status)}
                        </p>
                      </div>
                    </div>
                    {transaction.payment && (
                      <div className="p-4 mt-auto border border-blue-100 bg-blue-50/50 rounded-xl">
                        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Xendit Ref ID</p>
                        <p className="font-mono text-xs text-blue-900 truncate">{transaction.payment.external_id}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center flex-grow">
                    <p className="text-sm italic text-gray-400">Method not selected</p>
                  </div>
                )}
              </div>

            </div>
          </div>

          <div className="space-y-6 lg:col-span-1">
            
            {/* CUSTOMER DETAILS */}
            <div className="bg-gray-900 shadow-xl p-8 rounded-[2rem] text-white relative overflow-hidden">
              <div className="absolute w-32 h-32 bg-white rounded-full pointer-events-none opacity-5 -right-6 -top-6 blur-2xl"></div>
              <h2 className="opacity-50 mb-6 font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Customer Details
              </h2>
              <p className="text-xl font-bold leading-none uppercase">{transaction.user.first_name} {transaction.user.last_name}</p>
              <div className="mt-4 space-y-2 opacity-80">
                <p className="flex items-center gap-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {transaction.user.email}
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {transaction.user.phone || "No phone"}
                </p>
              </div>
              <div className="pt-6 mt-6 space-y-4 border-t border-white/10">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                  <div className="px-3 py-2 font-mono text-xs rounded-lg bg-white/10">{transaction.order_id}</div>
                </div>
              </div>
            </div>

            {/* FINANCIAL SUMMARY */}
            <div className="bg-white shadow-sm p-8 border border-gray-100 rounded-[2rem]">
              <h2 className="mb-6 font-black text-[10px] text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-4">
                Financial Summary
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Subtotal ({totalQuantity} items)</span>
                  <span className="font-medium text-gray-900">{formatPrice(transaction.total_amount)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Shipping Fee</span>
                  {transaction.shipping_method === 'free' ? (
                    <span className="font-bold text-emerald-600">Free</span>
                  ) : (
                    <span className="font-medium text-gray-900">{formatPrice(transaction.shipping_cost)}</span>
                  )}
                </div>

                {transaction.promo_discount > 0 && (
                  <div className="flex items-center justify-between text-sm font-medium text-emerald-600">
                    <span>Promo Code ({transaction.promo_code})</span>
                    <span>- {formatPrice(transaction.promo_discount)}</span>
                  </div>
                )}
                {transaction.points_used > 0 && (
                  <div className="flex items-center justify-between text-sm font-medium text-yellow-600">
                    <span>Loyalty Points ({transaction.points_used} Pts)</span>
                    <span>- {formatPrice(transaction.points_used * 1000)}</span>
                  </div>
                )}

                <div className="flex items-end justify-between pt-4 border-t border-gray-100 border-dashed">
                  <div>
                    <span className="block text-xs font-bold tracking-widest text-gray-900 uppercase">Grand Total</span>
                    <span className="text-[10px] text-gray-400 italic">Paid by customer</span>
                  </div>
                  <span className="text-2xl font-bold text-black">{formatPrice(getGrandTotal(transaction))}</span>
                </div>
              </div>

              {transaction.point > 0 && transaction.status === 'completed' && (
                <div className="flex items-center justify-between p-4 mt-4 border rounded-xl bg-gradient-to-r from-emerald-50 to-white border-emerald-100">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 text-white rounded-full shadow-sm bg-emerald-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">Loyalty Reward</p>
                      <p className="text-xs mt-0.5 text-gray-500">Points awarded to user</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-emerald-600">+{transaction.point}</span>
                    <span className="ml-1 text-xs font-bold text-emerald-800">Pts</span>
                  </div>
                </div>
              )}
            </div>

            {/* TIMELINE */}
            <div className="bg-white shadow-sm p-6 sm:p-8 border border-gray-100 rounded-[2rem]">
              <h2 className="mb-6 font-black text-[10px] text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-4 flex justify-between items-center">
                <span>Tracking Timeline</span>
                {biteshipData && transaction.shipping_method === 'biteship' && (
                  <span className="flex items-center gap-1 text-[8px] text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Live
                  </span>
                )}
              </h2>
              {transaction.shipping_method === 'free' ? (
                <div className="py-6 text-center">
                  <p className="mb-2 text-xs italic text-gray-500">No physical shipping required.</p>
                  <p className="text-sm font-bold text-black uppercase">In-Store Pickup</p>
                </div>
              ) : trackingLoading ? (
                <div className="flex justify-center py-6">
                  <div className="w-6 h-6 border-2 border-gray-200 rounded-full border-t-black animate-spin"></div>
                </div>
              ) : (
                <div className="relative ml-2 space-y-6 border-l-2 border-gray-100">
                  {timelineHistory.map((history: any, index: number) => (
                    <div key={index} className="relative pl-6">
                      <span className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all ${index === 0 ? 'bg-gycora ring-4 ring-gray-50' : 'bg-gray-300'}`}></span>
                      <div className={index === 0 ? 'opacity-100' : 'opacity-50'}>
                        <p className="mb-1 text-xs font-bold tracking-wide text-gray-900 uppercase">{formatStatusTitle(history.status)}</p>
                        <p className="text-[11px] text-gray-600 leading-tight mb-1.5">{history.note}</p>
                        <p className="text-[9px] text-gray-400 font-medium font-mono">{formatDateTime(history.updated_at)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      ) : null}

    </div>
  );
}