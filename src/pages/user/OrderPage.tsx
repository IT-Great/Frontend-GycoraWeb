/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useMemo, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// export default function OrderPage() {
//   const navigate = useNavigate();

//   // --- STATE ---
//   const [userData, setUserData] = useState<any>(null);
//   const [transactions, setTransactions] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [countdowns, setCountdowns] = useState<Record<number, string>>({});

//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [activeUnifiedTab, setActiveUnifiedTab] = useState("all");

//   // const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
//   // Gunakan ReturnType<typeof setInterval> agar TS secara otomatis menyesuaikan tipenya (bisa berupa number di browser atau Timeout di Node)
//   // const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   // const timerIntervalRef = useRef<number | null>(null);
//   const timerIntervalRef = useRef<any>(null);

//   // --- TABS DEFINITION ---
//   const unifiedTabs = [
//     { label: "Semua Pesanan", value: "all" },
//     { label: "Belum Dibayar", value: "unpaid" },
//     { label: "Akan Dikirim", value: "to_ship" },
//     { label: "Sedang Dikirim", value: "shipping" },
//     { label: "Selesai", value: "completed" },
//     { label: "Dibatalkan", value: "cancelled" },
//     { label: "Kendala / Retur", value: "issues" },
//   ];

//   // --- HELPERS ---
//   const formatPrice = (v: number) =>
//     new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(v);

//   const formatDateTime = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("id-ID", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const formatStatus = (status: string) =>
//     status ? status.replace(/_/g, " ") : "";

//   const getSubtotal = (order: any) => order.total_amount;

//   // const getGrandTotal = (order: any) => {
//   //   if (!order) return 0;
//   //   const total = parseFloat(order.total_amount || 0);
//   //   const shipping = parseFloat(order.shipping_cost || 0);
//   //   const promo = parseFloat(order.promo_discount || 0);
//   //   const pointsDiscount = parseFloat((order.points_used || 0) * 1000);
//   //   return total + shipping - promo - pointsDiscount;
//   // };

//   const getGrandTotal = (order: any) => {
//     if (!order) return 0;
//     const total = parseFloat(order.total_amount || 0);
//     const shipping = parseFloat(order.shipping_cost || 0);
//     const promo = parseFloat(order.promo_discount || 0);

//     // HAPUS parseFloat di sini karena hasil perkalian sudah pasti berupa angka (number)
//     const pointsDiscount = (order.points_used || 0) * 1000;

//     return total + shipping - promo - pointsDiscount;
//   };

//   const getOrderQuantity = (order: any) =>
//     order.details.reduce((sum: number, item: any) => sum + item.quantity, 0);

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
//     const key = company.toLowerCase();
//     return map[key] ? "/courier_images/" + map[key] : null;
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

//   const statusClass = (status: string) => {
//     const map: Record<string, string> = {
//       pending: "bg-orange-100 text-orange-700",
//       processing: "bg-blue-100 text-blue-700",
//       completed: "bg-emerald-100 text-emerald-700",
//       cancelled: "bg-red-100 text-red-700",
//       refund_requested: "bg-purple-100 text-purple-700",
//       refund_approved: "bg-indigo-100 text-indigo-700",
//       refund_rejected: "bg-gray-200 text-gray-600 line-through",
//       refunded: "bg-teal-100 text-teal-700",
//       refund_manual_required: "bg-pink-100 text-pink-700",
//       returned: "bg-gray-800 text-white",
//       shipping_failed: "bg-red-800 text-white",
//     };
//     return map[status] || "bg-gray-100 text-gray-500";
//   };

//   const shippingStatusClass = (status: string) => {
//     if (!status) return "bg-gray-50 border-gray-200 text-gray-500";
//     const str = status.toLowerCase();
//     if (["delivered"].includes(str))
//       return "bg-emerald-50 border-emerald-200 text-emerald-700";
//     if (
//       ["cancelled", "rejected", "disposed", "courier_not_found"].includes(str)
//     )
//       return "bg-red-50 border-red-200 text-red-700";
//     if (["on_hold", "return_in_transit", "returned"].includes(str))
//       return "bg-amber-50 border-amber-200 text-amber-700";
//     if (
//       [
//         "picking_up",
//         "picked",
//         "dropping_off",
//         "allocated",
//         "confirmed",
//       ].includes(str)
//     )
//       return "bg-blue-50 border-blue-200 text-blue-700";
//     return "bg-gray-50 border-gray-200 text-gray-600";
//   };

//   const canPay = (status: string) => ["pending"].includes(status);
//   const canCancel = (status: string) =>
//     ["pending", "processing"].includes(status);
//   const canRequestRefund = (order: any) => {
//     if (!["completed", "shipping_failed", "returned"].includes(order.status))
//       return false;
//     if (["shipping_failed", "returned"].includes(order.status)) return true;
//     if (order.shipping_method === "free") return true;

//     if (order.shipping_method === "biteship") {
//       const shipStatus = order.shipping_status
//         ? order.shipping_status.toLowerCase()
//         : "pending";
//       const unRefundableLogistics = [
//         "picked",
//         "dropping_off",
//         "delivered",
//         "return_in_transit",
//       ];
//       if (unRefundableLogistics.includes(shipStatus)) return false;
//       return true;
//     }
//     return false;
//   };

//   // --- LOGIC & COMPUTED EQUIVALENTS ---
//   const getUnifiedTabCount = (tabValue: string) => {
//     return transactions.filter((order) => {
//       if (tabValue === "all") return true;
//       const shipStatus = order.shipping_status
//         ? order.shipping_status.toLowerCase()
//         : "pending";

//       if (tabValue === "unpaid") return order.status === "pending";
//       if (tabValue === "to_ship")
//         return (
//           order.status === "processing" &&
//           [
//             "pending",
//             "placed",
//             "confirmed",
//             "allocated",
//             "picking_up",
//             "picked",
//           ].includes(shipStatus)
//         );
//       if (tabValue === "shipping") return shipStatus === "dropping_off";
//       if (tabValue === "completed")
//         return order.status === "completed" || shipStatus === "delivered";
//       if (tabValue === "cancelled") return order.status === "cancelled";
//       if (tabValue === "issues")
//         return (
//           order.status.includes("refund") ||
//           ["returned", "shipping_failed"].includes(order.status) ||
//           [
//             "on_hold",
//             "return_in_transit",
//             "rejected",
//             "disposed",
//             "courier_not_found",
//           ].includes(shipStatus)
//         );

//       return false;
//     }).length;
//   };

//   const filteredTransactions = useMemo(() => {
//     const query = searchQuery.toLowerCase();

//     return transactions.filter((order) => {
//       let matchSearch = true;
//       if (query) {
//         matchSearch =
//           order.order_id.toLowerCase().includes(query) ||
//           (order.total_amount &&
//             order.total_amount.toString().includes(query)) ||
//           (order.shipping_cost &&
//             order.shipping_cost.toString().includes(query)) ||
//           (order.payment_method &&
//             order.payment_method.toLowerCase().includes(query)) ||
//           (order.tracking_number &&
//             order.tracking_number.toLowerCase().includes(query)) ||
//           (order.delivery_type &&
//             order.delivery_type.toLowerCase().includes(query)) ||
//           (order.courier_company &&
//             order.courier_company.toLowerCase().includes(query));
//       }

//       let matchTab = false;
//       const tabValue = activeUnifiedTab;
//       const shipStatus = order.shipping_status
//         ? order.shipping_status.toLowerCase()
//         : "pending";

//       if (tabValue === "all") matchTab = true;
//       else if (tabValue === "unpaid") matchTab = order.status === "pending";
//       else if (tabValue === "to_ship")
//         matchTab =
//           order.status === "processing" &&
//           [
//             "pending",
//             "placed",
//             "confirmed",
//             "allocated",
//             "picking_up",
//             "picked",
//           ].includes(shipStatus);
//       else if (tabValue === "shipping")
//         matchTab = shipStatus === "dropping_off";
//       else if (tabValue === "completed")
//         matchTab = order.status === "completed" || shipStatus === "delivered";
//       else if (tabValue === "cancelled")
//         matchTab = order.status === "cancelled";
//       else if (tabValue === "issues")
//         matchTab =
//           order.status.includes("refund") ||
//           ["returned", "shipping_failed"].includes(order.status) ||
//           [
//             "on_hold",
//             "return_in_transit",
//             "rejected",
//             "disposed",
//             "courier_not_found",
//           ].includes(shipStatus);

//       return matchSearch && matchTab;
//     });
//   }, [transactions, searchQuery, activeUnifiedTab]);

//   const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
//   const paginatedTransactions = useMemo(() => {
//     const start = (currentPage - 1) * itemsPerPage;
//     return filteredTransactions.slice(start, start + itemsPerPage);
//   }, [filteredTransactions, currentPage, itemsPerPage]);

//   const showingStart =
//     filteredTransactions.length === 0
//       ? 0
//       : (currentPage - 1) * itemsPerPage + 1;
//   const showingEnd = Math.min(
//     currentPage * itemsPerPage,
//     filteredTransactions.length,
//   );

//   const visiblePages = useMemo(() => {
//     const maxVisible = 7;
//     if (totalPages <= maxVisible)
//       return Array.from({ length: totalPages }, (_, i) => i + 1);
//     if (currentPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
//     if (currentPage >= totalPages - 3)
//       return [
//         1,
//         "...",
//         totalPages - 4,
//         totalPages - 3,
//         totalPages - 2,
//         totalPages - 1,
//         totalPages,
//       ];
//     return [
//       1,
//       "...",
//       currentPage - 1,
//       currentPage,
//       currentPage + 1,
//       "...",
//       totalPages,
//     ];
//   }, [currentPage, totalPages]);

//   // Reset pagination on filter change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery, itemsPerPage, activeUnifiedTab]);

//   const resetFilters = () => {
//     setActiveUnifiedTab("all");
//     setSearchQuery("");
//   };

//   // --- TIMERS & API ---
//   const calculateTimeLeft = (referenceDate: string) => {
//     if (!referenceDate) return "Expired";
//     const expiryTime = new Date(referenceDate).getTime() + 86400000; // +24 Jam
//     const now = new Date().getTime();
//     const diff = expiryTime - now;

//     if (diff <= 0) return "Expired";

//     const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((diff % (1000 * 60)) / 1000);
//     return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
//   };

//   const autoCancelSilent = async (id: number) => {
//     try {
//       const token = localStorage.getItem("user_token");
//       await fetch(`${BASE_URL}/api/transactions/${id}/cancel`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchOrders();
//     } catch (e) {
//       console.error("Auto cancel failed", e);
//     }
//   };

//   // const startTimers = (currentOrders: any[]) => {
//   //   // if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
//   //   if (timerIntervalRef.current !== null) window.clearInterval(timerIntervalRef.current);

//   //   timerIntervalRef.current = window.setInterval(() => {
//   //     setCountdowns((prev) => {
//   //       const newCountdowns = { ...prev };
//   //       currentOrders.forEach((order) => {
//   //         if (canPay(order.status)) {
//   //           const timeReference =
//   //             order.status === "pending" && order.payment?.created_at
//   //               ? order.payment.created_at
//   //               : order.created_at;

//   //           const timeLeft = calculateTimeLeft(timeReference);
//   //           newCountdowns[order.id] = timeLeft;

//   //           if (timeLeft === "Expired" && !order.isCancelling) {
//   //             order.isCancelling = true;
//   //             autoCancelSilent(order.id);
//   //           }
//   //         }
//   //       });
//   //       return newCountdowns;
//   //     });
//   //   }, 1000);
//   // };

//   const startTimers = (currentOrders: any[]) => {
//     // Tidak perlu 'window.' lagi jika sudah pakai 'any'
//     if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

//     timerIntervalRef.current = setInterval(() => {
//       setCountdowns((prev) => {
//         const newCountdowns = { ...prev };
//         currentOrders.forEach((order) => {
//           if (canPay(order.status)) {
//             const timeReference =
//               order.status === "pending" && order.payment?.created_at
//                 ? order.payment.created_at
//                 : order.created_at;

//             const timeLeft = calculateTimeLeft(timeReference);
//             newCountdowns[order.id] = timeLeft;

//             if (timeLeft === "Expired" && !order.isCancelling) {
//               order.isCancelling = true;
//               autoCancelSilent(order.id);
//             }
//           }
//         });
//         return newCountdowns;
//       });
//     }, 1000);
//   };

//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("user_token");
//       const res = await fetch(`${BASE_URL}/api/transactions`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       });
//       if (!res.ok) throw new Error("Gagal mengambil data");

//       const data = await res.json();
//       const validTransactions = data.filter(
//         (order: any) => order.status !== "awaiting_payment",
//       );

//       const mappedOrders = validTransactions.map((o: any) => ({
//         ...o,
//         isCancelling: false,
//       }));
//       setTransactions(mappedOrders);
//       startTimers(mappedOrders);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setTimeout(() => setLoading(false), 300);
//     }
//   };

//   // useEffect(() => {
//   //   const userStr = localStorage.getItem("user_data");
//   //   if (userStr) setUserData(JSON.parse(userStr));
//   //   fetchOrders();

//   //   // return () => {
//   //   //   if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
//   //   // };

//   //   return () => {
//   //     // Tambahkan prefix "window." di sini
//   //     if (timerIntervalRef.current !== null) window.clearInterval(timerIntervalRef.current);
//   //   };
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, []);

//   useEffect(() => {
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) setUserData(JSON.parse(userStr));
//     fetchOrders();

//     return () => {
//       // Tidak perlu 'window.' lagi
//       if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // --- ACTIONS ---
//   const redirectToPayment = (order: any) => {
//     if (order.status === "pending" && order.payment?.checkout_url) {
//       window.location.href = order.payment.checkout_url;
//     } else {
//       Swal.fire("Error", "URL Pembayaran tidak ditemukan.", "error");
//     }
//   };

//   const handleOrderClick = (order: any) => {
//     if (canPay(order.status) && countdowns[order.id] !== "Expired") {
//       redirectToPayment(order);
//     }
//   };

//   const cancelOrder = async (id: number) => {
//     const result = await Swal.fire({
//       title: "Batalkan Pesanan?",
//       text: "Tindakan ini tidak dapat dikembalikan!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#059669",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Ya, batalkan!",
//       cancelButtonText: "Kembali",
//     });

//     if (result.isConfirmed) {
//       try {
//         const token = localStorage.getItem("user_token");
//         const res = await fetch(
//           `${BASE_URL}/api/transactions/${id}/cancel`,
//           {
//             method: "POST",
//             headers: { Authorization: `Bearer ${token}` },
//           },
//         );

//         if (res.ok) {
//           Swal.fire("Dibatalkan!", "Pesanan Anda telah dibatalkan.", "success");
//           fetchOrders();
//         } else {
//           const errorData = await res.json();
//           throw new Error(errorData.message);
//         }
//       } catch (err: any) {
//         Swal.fire(
//           "Error",
//           `Gagal membatalkan: ${err.message || "Terjadi kesalahan"}`,
//           "error",
//         );
//       }
//     }
//   };

//   const requestRefund = async (id: number) => {
//     const { value: formValues, isConfirmed } = await Swal.fire({
//       title: "Ajukan Pengembalian (Refund)",
//       html: `
//         <div class="space-y-4 text-left font-sans">
//           <div>
//             <label class="block mb-1 text-xs font-bold tracking-widest text-gray-700 uppercase">Alasan Pengembalian</label>
//             <textarea id="swal-refund-reason" rows="3" class="w-full p-3 text-sm border border-gray-300 outline-none resize-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora" placeholder="Jelaskan alasan pengembalian dana..."></textarea>
//           </div>
//           <div>
//             <label class="block mb-1 text-xs font-bold tracking-widest text-gray-700 uppercase">Upload Bukti (Foto/Video)</label>
//             <input type="file" id="swal-refund-file" accept="image/*,video/mp4,video/quicktime" class="w-full text-sm text-gray-500 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-gray-100 file:text-black hover:file:bg-gray-200" />
//             <p class="text-[10px] text-gray-400 mt-1">Maksimal 10MB. Format: JPG, PNG, MP4.</p>
//           </div>
//         </div>
//       `,
//       showCancelButton: true,
//       confirmButtonColor: "#059669",
//       confirmButtonText: "Kirim Pengajuan",
//       preConfirm: () => {
//         const reason = (
//           document.getElementById("swal-refund-reason") as HTMLTextAreaElement
//         ).value;
//         const fileInput = document.getElementById(
//           "swal-refund-file",
//         ) as HTMLInputElement;
//         const file = fileInput.files?.[0];

//         if (!reason) {
//           Swal.showValidationMessage("Harap isi alasan pengembalian.");
//           return false;
//         }
//         if (!file) {
//           Swal.showValidationMessage("Harap unggah file bukti.");
//           return false;
//         }
//         if (file.size > 10 * 1024 * 1024) {
//           Swal.showValidationMessage(
//             "Ukuran file tidak boleh lebih dari 10MB.",
//           );
//           return false;
//         }
//         return { reason, file };
//       },
//     });

//     if (isConfirmed && formValues) {
//       Swal.fire({
//         title: "Mengunggah...",
//         text: "Mohon tunggu, permintaan Anda sedang diproses.",
//         allowOutsideClick: false,
//         didOpen: () => {
//           Swal.showLoading();
//         },
//       });

//       try {
//         const token = localStorage.getItem("user_token");
//         const formData = new FormData();
//         formData.append("reason", formValues.reason);
//         formData.append("proof_file", formValues.file);

//         const res = await fetch(
//           `${BASE_URL}/api/transactions/${id}/refund-request`,
//           {
//             method: "POST",
//             headers: { Authorization: `Bearer ${token}` },
//             body: formData,
//           },
//         );

//         if (res.ok) {
//           fetchOrders();
//           Swal.fire(
//             "Berhasil",
//             "Pengajuan pengembalian telah dikirim ke admin.",
//             "success",
//           );
//         } else {
//           const errData = await res.json();
//           throw new Error(errData.message);
//         }
//       } catch (err: any) {
//         Swal.fire(
//           "Error",
//           err.message || "Gagal mengajukan pengembalian",
//           "error",
//         );
//       }
//     }
//   };

//   const processRefundUser = async (id: number) => {
//     try {
//       const token = localStorage.getItem("user_token");
//       const res = await fetch(
//         `${BASE_URL}/api/transactions/${id}/refund-process`,
//         {
//           method: "POST",
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );

//       if (res.ok) {
//         const data = await res.json();
//         fetchOrders();
//         Swal.fire("Refunded", data.message, "success");
//       } else {
//         throw new Error("Gagal memproses refund");
//       }
//     } catch (err: any) {
//       Swal.fire("Error", err.message || "Refund process failed", "error");
//     }
//   };

//   return (
//     <div className="min-h-screen px-6 py-20 mx-auto font-sans max-w-7xl animate-fade-in">
//       <div className="flex items-center justify-between mb-10">
//         <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 uppercase">
//           Lacak Pesanan
//         </h1>
//       </div>

//       {/* TABS */}
//       <div className="mb-8 border-b border-gray-200">
//         <div className="flex gap-6 pb-2 overflow-x-auto custom-scrollbar">
//           {unifiedTabs.map((tab) => (
//             <button
//               key={tab.value}
//               onClick={() => setActiveUnifiedTab(tab.value)}
//               className={`pb-4 font-bold text-xs uppercase tracking-widest transition-colors whitespace-nowrap border-b-2 flex items-center gap-2 ${
//                 activeUnifiedTab === tab.value
//                   ? "border-gycora text-gycora"
//                   : "border-transparent text-gray-400 hover:text-gray-700"
//               }`}
//             >
//               {tab.label}
//               {getUnifiedTabCount(tab.value) > 0 && (
//                 <span
//                   className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
//                     activeUnifiedTab === tab.value
//                       ? "bg-gycora text-white"
//                       : "bg-gray-200 text-gray-600"
//                   }`}
//                 >
//                   {getUnifiedTabCount(tab.value)}
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* FILTER & SEARCH */}
//       <div className="flex flex-col items-center justify-between gap-4 mb-8 md:flex-row">
//         <div className="relative w-full md:w-80">
//           <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-5 h-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//           </span>
//           <input
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             type="text"
//             placeholder="Cari ID Pesanan, Kurir, Metode..."
//             className="w-full py-2 pl-10 pr-4 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora"
//           />
//         </div>

//         <div className="flex items-center w-full gap-2 md:w-auto">
//           <span className="text-xs font-bold tracking-wide text-gray-400 uppercase">
//             Tampilkan:
//           </span>
//           <select
//             value={itemsPerPage}
//             onChange={(e) => setItemsPerPage(Number(e.target.value))}
//             className="px-3 py-2 text-sm font-bold border border-gray-200 outline-none cursor-pointer bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora"
//           >
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={20}>20</option>
//             <option value={50}>50</option>
//           </select>
//         </div>
//       </div>

//       {/* KONTEN */}
//       {loading ? (
//         <div className="space-y-8 animate-pulse">
//           {[1, 2, 3].map((i) => (
//             <div
//               key={i}
//               className="overflow-hidden bg-white border border-gray-100 rounded-2xl"
//             >
//               <div className="h-20 border-b border-gray-100 bg-gray-50"></div>
//               <div className="flex items-center gap-4 px-6 py-6">
//                 <div className="w-16 h-16 bg-gray-200 rounded-lg shrink-0"></div>
//                 <div className="w-full h-12 bg-gray-200 rounded-lg"></div>
//               </div>
//               <div className="h-16 bg-gray-50"></div>
//             </div>
//           ))}
//         </div>
//       ) : filteredTransactions.length === 0 ? (
//         <div className="p-12 text-center bg-white border border-gray-100 rounded-2xl animate-fade-in">
//           <p className="italic text-gray-400">
//             Tidak ada pesanan yang sesuai dengan filter.
//           </p>
//           <button
//             onClick={resetFilters}
//             className="inline-block mt-6 text-xs font-bold tracking-widest underline uppercase text-gycora hover:text-gycora-dark"
//           >
//             Hapus Filter
//           </button>
//         </div>
//       ) : (
//         <div className="space-y-8 animate-fade-in">
//           {paginatedTransactions.map((order) => (
//             <div
//               key={order.id}
//               className="relative overflow-hidden transition-shadow duration-300 bg-white border border-gray-100 shadow-sm hover:shadow-md rounded-2xl"
//             >
//               {/* ORDER HEADER */}
//               <div className="flex flex-col items-start justify-between gap-4 px-6 py-4 border-b border-gray-100 md:flex-row md:items-center bg-gray-50">
//                 <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
//                   <div>
//                     <p className="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-1">
//                       Order ID
//                     </p>
//                     <p className="font-mono text-sm font-bold text-gray-800">
//                       {order.order_id}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-1">
//                       Tanggal
//                     </p>
//                     <p className="text-xs font-bold text-gray-800">
//                       {formatDateTime(order.created_at)}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex flex-col items-end w-full gap-2 md:w-auto">
//                   <div className="flex items-center justify-between w-full gap-3 md:justify-end md:w-auto">
//                     <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
//                       Status:
//                     </span>
//                     <span
//                       className={`px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-tighter ${statusClass(order.status)}`}
//                     >
//                       {formatStatus(order.status)}
//                     </span>
//                   </div>

//                   {order.shipping_method === "biteship" ? (
//                     <div className="flex items-center justify-between w-full gap-3 md:justify-end md:w-auto">
//                       <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
//                         Pengiriman:
//                       </span>
//                       <span
//                         className={`px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-tighter border ${shippingStatusClass(order.shipping_status)}`}
//                       >
//                         {formatStatus(order.shipping_status || "Pending")}
//                       </span>
//                     </div>
//                   ) : order.shipping_method === "free" ? (
//                     <div className="flex items-center justify-between w-full gap-3 md:justify-end md:w-auto">
//                       <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
//                         Pengiriman:
//                       </span>
//                       <span className="px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-tighter border bg-gray-100 text-gray-600">
//                         In-Store Pickup
//                       </span>
//                     </div>
//                   ) : null}
//                 </div>
//               </div>

//               {/* POINTS BADGE */}
//               <div className="relative flex flex-col gap-6 px-6 py-4 bg-white border-b border-gray-100 md:flex-row md:gap-12">
//                 {/* {userData?.is_membership &&
//                   order.point > 0 &&
//                   order.status === "completed" && (
//                     <div className="absolute top-4 right-6 bg-gradient-to-r from-emerald-100 to-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="w-4 h-4 text-emerald-500"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                       >
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                       <div>
//                         <p className="text-[8px] font-bold text-emerald-800 uppercase tracking-widest leading-none">
//                           Points Earned
//                         </p>
//                         <p className="text-sm font-black leading-tight text-emerald-600">
//                           +{order.point} Pts
//                         </p>
//                       </div>
//                     </div>
//                   )} */}
//                 {/* LOYALTY REWARD BADGE */}
//                 {userData?.is_membership &&
//                 order.point > 0 &&
//                 order.status === "completed" ? (
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
//                         +{order.point}
//                       </span>
//                       <span className="ml-1 text-xs font-bold text-emerald-800">
//                         Pts
//                       </span>
//                     </div>
//                   </div>
//                 ) : null}
//                 <div className="flex-1 mt-4 md:mt-0"></div>
//                 <div className="flex-1 mt-4 md:mt-0"></div>
//               </div>

//               {/* PAYMENT & SHIPPING INFO */}
//               <div className="flex flex-col gap-6 px-6 py-4 bg-white border-b border-gray-100 md:flex-row md:gap-12">
//                 <div className="flex-1">
//                   <p className="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3">
//                     Payment Info
//                   </p>
//                   {order.payment_method ? (
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-12 h-8 overflow-hidden border border-gray-100 rounded bg-gray-50 shrink-0">
//                         {getPaymentLogo(order.payment_method) ? (
//                           <img
//                             src={getPaymentLogo(order.payment_method)!}
//                             className="object-contain w-full h-full p-1"
//                           />
//                         ) : (
//                           <span className="font-black text-gray-300 text-[8px]">
//                             {order.payment_method.split(" ")[1] || "PAY"}
//                           </span>
//                         )}
//                       </div>
//                       <div>
//                         <p className="text-xs font-bold text-gray-800 uppercase">
//                           {order.payment_method.replace("_", " ")}
//                         </p>
//                         {order.status === "refunded" ? (
//                           <p className="text-[10px] text-teal-600 font-bold mt-0.5">
//                             REFUNDED
//                           </p>
//                         ) : order.status === "cancelled" ? (
//                           <p className="text-[10px] text-red-600 font-bold mt-0.5">
//                             EXPIRED / CANCELLED
//                           </p>
//                         ) : canPay(order.status) ? (
//                           <p className="text-[10px] text-orange-500 font-bold mt-0.5">
//                             UNPAID
//                           </p>
//                         ) : (
//                           <p className="text-[10px] text-emerald-600 font-bold mt-0.5">
//                             PAID
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   ) : (
//                     <p className="text-xs italic text-gray-400">
//                       Menunggu pilihan pembayaran...
//                     </p>
//                   )}
//                 </div>

//                 <div className="flex-1">
//                   <p className="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3">
//                     Shipping Info
//                   </p>
//                   {order.shipping_method === "free" ? (
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-12 h-12 text-gray-400 bg-gray-100 border border-gray-200 rounded-lg shrink-0">
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
//                             strokeWidth="2"
//                             d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//                           />
//                         </svg>
//                       </div>
//                       <div>
//                         <p className="text-xs font-bold text-gray-800 uppercase">
//                           Ambil Sendiri
//                         </p>
//                         <p className="text-[10px] text-gray-500 font-medium mt-0.5">
//                           In-store Payment / Pickup
//                         </p>
//                       </div>
//                     </div>
//                   ) : order.shipping_method === "biteship" &&
//                     order.courier_company ? (
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-12 h-12 overflow-hidden bg-white border border-gray-100 rounded-lg shrink-0">
//                         {getCourierLogo(order.courier_company) ? (
//                           <img
//                             src={getCourierLogo(order.courier_company)!}
//                             className="object-contain w-full h-full p-1"
//                           />
//                         ) : (
//                           <span className="text-xs font-black text-gray-300">
//                             {order.courier_company.toUpperCase()}
//                           </span>
//                         )}
//                       </div>
//                       <div>
//                         <p className="text-xs font-bold text-gray-800 uppercase">
//                           {order.courier_company} - {order.courier_type}
//                         </p>
//                         <p className="text-[10px] text-gray-500 mt-0.5">
//                           Resi:{" "}
//                           <span className="font-mono font-bold text-black">
//                             {order.tracking_number || "Waiting..."}
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="text-xs italic text-gray-400">
//                       Tentukan di halaman checkout
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* ITEMS LIST */}
//               <div
//                 onClick={() => handleOrderClick(order)}
//                 className={`px-6 py-2 ${canPay(order.status) && countdowns[order.id] !== "Expired" ? "cursor-pointer hover:bg-emerald-50/30 transition-colors" : ""}`}
//               >
//                 {canPay(order.status) && countdowns[order.id] !== "Expired" && (
//                   <div className="my-3 text-emerald-600 text-[10px] text-center uppercase tracking-widest animate-pulse font-bold bg-emerald-50 py-2 rounded-lg">
//                     Ketuk di area ini untuk melanjutkan pembayaran
//                   </div>
//                 )}

//                 {order.details.map((detail: any) => (
//                   <div
//                     key={detail.id}
//                     className="flex items-center gap-4 py-4 border-b border-gray-50 last:border-0"
//                   >
//                     <img
//                       src={detail.product.image_url}
//                       className="object-cover w-16 h-16 bg-gray-100 border border-gray-100 rounded-lg shadow-sm"
//                     />
//                     <div className="flex-grow">
//                       <h4 className="text-sm font-bold text-gray-900 uppercase">
//                         {detail.product.name}
//                       </h4>
//                       <p className="mt-1 text-xs text-gray-400">
//                         {detail.quantity} x {formatPrice(detail.price)}
//                       </p>
//                     </div>
//                     <p className="text-sm font-bold text-gray-900">
//                       {formatPrice(detail.quantity * detail.price)}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* TOTALS & ACTIONS */}
//               <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
//                 <div className="flex flex-col pb-4 mb-4 space-y-1 border-b border-gray-200">
//                   <div className="flex justify-between text-xs text-gray-500">
//                     <span>Subtotal Produk</span>
//                     <span>{formatPrice(getSubtotal(order))}</span>
//                   </div>
//                   <div className="flex justify-between text-xs text-gray-500">
//                     <span>
//                       Ongkos Kirim (
//                       {order.shipping_cost > 0
//                         ? `${formatPrice(order.shipping_cost / getOrderQuantity(order))} x ${getOrderQuantity(order)}`
//                         : "Gratis"}
//                       )
//                     </span>
//                     <span>{formatPrice(order.shipping_cost)}</span>
//                   </div>

//                   {order.promo_discount > 0 && (
//                     <div className="flex justify-between text-xs font-medium text-emerald-600">
//                       <span>
//                         Promo (
//                         <span className="font-mono uppercase">
//                           {order.promo_code}
//                         </span>
//                         )
//                       </span>
//                       <span>- {formatPrice(order.promo_discount)}</span>
//                     </div>
//                   )}

//                   {order.points_used > 0 && (
//                     <div className="flex justify-between text-xs font-medium text-yellow-600">
//                       <span>Poin Ditukarkan ({order.points_used} Pts)</span>
//                       <span>- {formatPrice(order.points_used * 1000)}</span>
//                     </div>
//                   )}

//                   <div className="flex justify-between pt-2 mt-2 text-sm font-bold text-gray-900 border-t border-gray-200 border-dashed">
//                     <span className="uppercase tracking-widest text-[10px] mt-1">
//                       Total Akhir
//                     </span>
//                     <span className="text-lg text-gycora">
//                       {formatPrice(getGrandTotal(order))}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
//                   <div className="w-full text-left md:w-auto">
//                     {canPay(order.status) && order.payment && (
//                       <div className="flex items-center justify-center gap-2 md:justify-start">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-4 h-4 text-red-500 animate-pulse"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                           />
//                         </svg>
//                         <span className="font-mono text-sm font-bold text-red-500">
//                           {countdowns[order.id]}
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex flex-wrap justify-center w-full gap-3 md:justify-end md:w-auto">
//                     {canCancel(order.status) && (
//                       <button
//                         onClick={() => cancelOrder(order.id)}
//                         className="w-full px-6 py-2 text-xs font-bold tracking-widest text-red-600 uppercase transition border border-red-200 hover:bg-red-50 rounded-xl md:w-auto"
//                       >
//                         Batalkan
//                       </button>
//                     )}
//                     {canPay(order.status) && (
//                       <button
//                         onClick={() => redirectToPayment(order)}
//                         disabled={countdowns[order.id] === "Expired"}
//                         className="w-full px-6 py-2 text-xs font-bold tracking-widest text-white uppercase transition bg-gray-900 hover:bg-black disabled:bg-gray-300 disabled:cursor-not-allowed rounded-xl md:w-auto"
//                       >
//                         Bayar Sekarang
//                       </button>
//                     )}
//                     {[
//                       "processing",
//                       "completed",
//                       "cancelled",
//                       "refund_requested",
//                       "refund_approved",
//                       "refunded",
//                       "refund_rejected",
//                       "refund_manual_required",
//                       "shipping_failed",
//                       "returned",
//                     ].includes(order.status) &&
//                       order.shipping_method === "biteship" && (
//                         <button
//                           onClick={() =>
//                             navigate(`/tracking/${order.id}`, {
//                               state: { paymentMethod: order.payment_method },
//                             })
//                           }
//                           className="w-full px-6 py-2 text-xs font-bold tracking-widest text-white uppercase transition shadow-sm bg-gycora hover:bg-gycora-dark rounded-xl md:w-auto"
//                         >
//                           Lacak Paket
//                         </button>
//                       )}
//                     {canRequestRefund(order) && (
//                       <button
//                         onClick={() => requestRefund(order.id)}
//                         className="w-full px-6 py-2 text-xs font-bold tracking-widest text-gray-600 uppercase transition border border-gray-300 hover:bg-gray-100 rounded-xl md:w-auto"
//                       >
//                         Ajukan Retur
//                       </button>
//                     )}
//                     {order.status === "refund_requested" && (
//                       <div className="w-full px-4 py-2 text-xs font-bold text-center bg-amber-100 rounded-xl text-amber-700 md:w-auto">
//                         Menunggu Admin
//                       </div>
//                     )}
//                     {order.status === "refund_manual_required" && (
//                       <div className="w-full px-4 py-2 text-xs font-bold text-center text-pink-700 bg-pink-100 rounded-xl md:w-auto">
//                         Refund Manual
//                       </div>
//                     )}
//                     {order.status === "refund_approved" && (
//                       <button
//                         onClick={() => processRefundUser(order.id)}
//                         className="w-full px-6 py-2 text-xs font-bold tracking-widest text-white uppercase transition bg-blue-600 shadow-sm hover:bg-blue-700 rounded-xl md:w-auto"
//                       >
//                         Tarik Dana
//                       </button>
//                     )}
//                     {order.status === "refund_rejected" && (
//                       <div className="w-full text-xs italic font-bold text-center text-red-500 md:w-auto">
//                         Retur Ditolak
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* PAGINATION */}
//           {filteredTransactions.length > 0 && (
//             <div className="flex flex-col items-center justify-between gap-4 pt-6 mt-8 border-t border-gray-100 md:flex-row">
//               <p className="text-sm text-gray-400">
//                 Menampilkan{" "}
//                 <span className="font-bold text-black">{showingStart}</span>{" "}
//                 hingga{" "}
//                 <span className="font-bold text-black">{showingEnd}</span> dari{" "}
//                 <span className="font-bold text-black">
//                   {filteredTransactions.length}
//                 </span>{" "}
//                 pesanan
//               </p>

//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setCurrentPage((prev) => prev - 1)}
//                   disabled={currentPage === 1}
//                   className="px-4 py-2 text-sm font-medium transition border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
//                 >
//                   Mundur
//                 </button>

//                 <div className="flex gap-1">
//                   {visiblePages.map((page, index) => (
//                     <button
//                       key={index}
//                       onClick={() =>
//                         typeof page === "number" ? setCurrentPage(page) : null
//                       }
//                       disabled={page === "..."}
//                       className={`flex items-center justify-center w-10 h-10 text-sm font-medium transition rounded-xl ${currentPage === page ? "bg-gycora text-white border-gycora" : "hover:bg-gray-50 border-gray-200"} ${page === "..." ? "cursor-default border-transparent hover:bg-transparent" : "border"}`}
//                     >
//                       {page}
//                     </button>
//                   ))}
//                 </div>

//                 <button
//                   onClick={() => setCurrentPage((prev) => prev + 1)}
//                   disabled={currentPage === totalPages || totalPages === 0}
//                   className="px-4 py-2 text-sm font-medium transition border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
//                 >
//                   Lanjut
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useMemo, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// export default function OrderPage() {
//   const navigate = useNavigate();

//   // --- STATE ---
//   const [userData, setUserData] = useState<any>(null);
//   const [transactions, setTransactions] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [countdowns, setCountdowns] = useState<Record<number, string>>({});

//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [activeUnifiedTab, setActiveUnifiedTab] = useState("all");

//   const timerIntervalRef = useRef<any>(null);

//   // --- TABS DEFINITION ---
//   const unifiedTabs = [
//     { label: "Semua Pesanan", value: "all" },
//     { label: "Belum Dibayar", value: "unpaid" },
//     { label: "Akan Dikirim", value: "to_ship" },
//     { label: "Sedang Dikirim", value: "shipping" },
//     { label: "Selesai", value: "completed" },
//     { label: "Dibatalkan", value: "cancelled" },
//     { label: "Kendala / Retur", value: "issues" },
//   ];

//   // --- HELPERS ---
//   const formatPrice = (v: number) =>
//     new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(v);

//   const formatDateTime = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("id-ID", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const formatStatus = (status: string) =>
//     status ? status.replace(/_/g, " ") : "";

//   const getSubtotal = (order: any) => order.total_amount;

//   const getGrandTotal = (order: any) => {
//     if (!order) return 0;
//     const total = parseFloat(order.total_amount || 0);
//     const shipping = parseFloat(order.shipping_cost || 0);
//     const promo = parseFloat(order.promo_discount || 0);

//     const pointsDiscount = (order.points_used || 0) * 1000;

//     return total + shipping - promo - pointsDiscount;
//   };

//   const getOrderQuantity = (order: any) =>
//     order.details.reduce((sum: number, item: any) => sum + item.quantity, 0);

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
//     const key = company.toLowerCase();
//     return map[key] ? "/courier_images/" + map[key] : null;
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

//   const statusClass = (status: string) => {
//     const map: Record<string, string> = {
//       pending: "bg-orange-100 text-orange-700",
//       processing: "bg-blue-100 text-blue-700",
//       completed: "bg-emerald-100 text-emerald-700",
//       cancelled: "bg-red-100 text-red-700",
//       refund_requested: "bg-purple-100 text-purple-700",
//       refund_approved: "bg-indigo-100 text-indigo-700",
//       refund_rejected: "bg-gray-200 text-gray-600 line-through",
//       refunded: "bg-teal-100 text-teal-700",
//       refund_manual_required: "bg-pink-100 text-pink-700",
//       returned: "bg-gray-800 text-white",
//       shipping_failed: "bg-red-800 text-white",
//     };
//     return map[status] || "bg-gray-100 text-gray-500";
//   };

//   const shippingStatusClass = (status: string) => {
//     if (!status) return "bg-gray-50 border-gray-200 text-gray-500";
//     const str = status.toLowerCase();
//     if (["delivered"].includes(str))
//       return "bg-emerald-50 border-emerald-200 text-emerald-700";
//     if (
//       ["cancelled", "rejected", "disposed", "courier_not_found"].includes(str)
//     )
//       return "bg-red-50 border-red-200 text-red-700";
//     if (["on_hold", "return_in_transit", "returned"].includes(str))
//       return "bg-amber-50 border-amber-200 text-amber-700";
//     if (
//       [
//         "picking_up",
//         "picked",
//         "dropping_off",
//         "allocated",
//         "confirmed",
//       ].includes(str)
//     )
//       return "bg-blue-50 border-blue-200 text-blue-700";
//     return "bg-gray-50 border-gray-200 text-gray-600";
//   };

//   const canPay = (status: string) => ["pending"].includes(status);
//   const canCancel = (status: string) =>
//     ["pending", "processing"].includes(status);
//   const canRequestRefund = (order: any) => {
//     if (!["completed", "shipping_failed", "returned"].includes(order.status))
//       return false;
//     if (["shipping_failed", "returned"].includes(order.status)) return true;
//     if (order.shipping_method === "free") return true;

//     if (order.shipping_method === "biteship") {
//       const shipStatus = order.shipping_status
//         ? order.shipping_status.toLowerCase()
//         : "pending";
//       const unRefundableLogistics = [
//         "picked",
//         "dropping_off",
//         "delivered",
//         "return_in_transit",
//       ];
//       if (unRefundableLogistics.includes(shipStatus)) return false;
//       return true;
//     }
//     return false;
//   };

//   // --- LOGIC & COMPUTED EQUIVALENTS ---
//   const getUnifiedTabCount = (tabValue: string) => {
//     return transactions.filter((order) => {
//       if (tabValue === "all") return true;
//       const shipStatus = order.shipping_status
//         ? order.shipping_status.toLowerCase()
//         : "pending";

//       if (tabValue === "unpaid") return order.status === "pending";
//       if (tabValue === "to_ship")
//         return (
//           order.status === "processing" &&
//           [
//             "pending",
//             "placed",
//             "confirmed",
//             "allocated",
//             "picking_up",
//             "picked",
//           ].includes(shipStatus)
//         );
//       if (tabValue === "shipping") return shipStatus === "dropping_off";
//       if (tabValue === "completed")
//         return order.status === "completed" || shipStatus === "delivered";
//       if (tabValue === "cancelled") return order.status === "cancelled";
//       if (tabValue === "issues")
//         return (
//           order.status.includes("refund") ||
//           ["returned", "shipping_failed"].includes(order.status) ||
//           [
//             "on_hold",
//             "return_in_transit",
//             "rejected",
//             "disposed",
//             "courier_not_found",
//           ].includes(shipStatus)
//         );

//       return false;
//     }).length;
//   };

//   const filteredTransactions = useMemo(() => {
//     const query = searchQuery.toLowerCase();

//     return transactions.filter((order) => {
//       let matchSearch = true;
//       if (query) {
//         matchSearch =
//           order.order_id.toLowerCase().includes(query) ||
//           (order.total_amount &&
//             order.total_amount.toString().includes(query)) ||
//           (order.shipping_cost &&
//             order.shipping_cost.toString().includes(query)) ||
//           (order.payment_method &&
//             order.payment_method.toLowerCase().includes(query)) ||
//           (order.tracking_number &&
//             order.tracking_number.toLowerCase().includes(query)) ||
//           (order.delivery_type &&
//             order.delivery_type.toLowerCase().includes(query)) ||
//           (order.courier_company &&
//             order.courier_company.toLowerCase().includes(query));
//       }

//       let matchTab = false;
//       const tabValue = activeUnifiedTab;
//       const shipStatus = order.shipping_status
//         ? order.shipping_status.toLowerCase()
//         : "pending";

//       if (tabValue === "all") matchTab = true;
//       else if (tabValue === "unpaid") matchTab = order.status === "pending";
//       else if (tabValue === "to_ship")
//         matchTab =
//           order.status === "processing" &&
//           [
//             "pending",
//             "placed",
//             "confirmed",
//             "allocated",
//             "picking_up",
//             "picked",
//           ].includes(shipStatus);
//       else if (tabValue === "shipping")
//         matchTab = shipStatus === "dropping_off";
//       else if (tabValue === "completed")
//         matchTab = order.status === "completed" || shipStatus === "delivered";
//       else if (tabValue === "cancelled")
//         matchTab = order.status === "cancelled";
//       else if (tabValue === "issues")
//         matchTab =
//           order.status.includes("refund") ||
//           ["returned", "shipping_failed"].includes(order.status) ||
//           [
//             "on_hold",
//             "return_in_transit",
//             "rejected",
//             "disposed",
//             "courier_not_found",
//           ].includes(shipStatus);

//       return matchSearch && matchTab;
//     });
//   }, [transactions, searchQuery, activeUnifiedTab]);

//   const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
//   const paginatedTransactions = useMemo(() => {
//     const start = (currentPage - 1) * itemsPerPage;
//     return filteredTransactions.slice(start, start + itemsPerPage);
//   }, [filteredTransactions, currentPage, itemsPerPage]);

//   const showingStart =
//     filteredTransactions.length === 0
//       ? 0
//       : (currentPage - 1) * itemsPerPage + 1;
//   const showingEnd = Math.min(
//     currentPage * itemsPerPage,
//     filteredTransactions.length,
//   );

//   const visiblePages = useMemo(() => {
//     const maxVisible = 7;
//     if (totalPages <= maxVisible)
//       return Array.from({ length: totalPages }, (_, i) => i + 1);
//     if (currentPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
//     if (currentPage >= totalPages - 3)
//       return [
//         1,
//         "...",
//         totalPages - 4,
//         totalPages - 3,
//         totalPages - 2,
//         totalPages - 1,
//         totalPages,
//       ];
//     return [
//       1,
//       "...",
//       currentPage - 1,
//       currentPage,
//       currentPage + 1,
//       "...",
//       totalPages,
//     ];
//   }, [currentPage, totalPages]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery, itemsPerPage, activeUnifiedTab]);

//   const resetFilters = () => {
//     setActiveUnifiedTab("all");
//     setSearchQuery("");
//   };

//   // --- TIMERS & API ---
//   const calculateTimeLeft = (referenceDate: string) => {
//     if (!referenceDate) return "Expired";
//     const expiryTime = new Date(referenceDate).getTime() + 86400000; // +24 Jam
//     const now = new Date().getTime();
//     const diff = expiryTime - now;

//     if (diff <= 0) return "Expired";

//     const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((diff % (1000 * 60)) / 1000);
//     return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
//   };

//   const autoCancelSilent = async (id: number) => {
//     try {
//       const token = localStorage.getItem("user_token");
//       await fetch(`${BASE_URL}/api/transactions/${id}/cancel`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchOrders();
//     } catch (e) {
//       console.error("Auto cancel failed", e);
//     }
//   };

//   const startTimers = (currentOrders: any[]) => {
//     if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

//     timerIntervalRef.current = setInterval(() => {
//       setCountdowns((prev) => {
//         const newCountdowns = { ...prev };
//         currentOrders.forEach((order) => {
//           if (canPay(order.status)) {
//             const timeReference =
//               order.status === "pending" && order.payment?.created_at
//                 ? order.payment.created_at
//                 : order.created_at;

//             const timeLeft = calculateTimeLeft(timeReference);
//             newCountdowns[order.id] = timeLeft;

//             if (timeLeft === "Expired" && !order.isCancelling) {
//               order.isCancelling = true;
//               autoCancelSilent(order.id);
//             }
//           }
//         });
//         return newCountdowns;
//       });
//     }, 1000);
//   };

//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("user_token");
//       const res = await fetch(`${BASE_URL}/api/transactions`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       });
//       if (!res.ok) throw new Error("Gagal mengambil data");

//       const data = await res.json();
//       const validTransactions = data.filter(
//         (order: any) => order.status !== "awaiting_payment",
//       );

//       const mappedOrders = validTransactions.map((o: any) => ({
//         ...o,
//         isCancelling: false,
//       }));
//       setTransactions(mappedOrders);
//       startTimers(mappedOrders);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setTimeout(() => setLoading(false), 300);
//     }
//   };

//   useEffect(() => {
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) setUserData(JSON.parse(userStr));
//     fetchOrders();

//     return () => {
//       if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // --- ACTIONS ---
//   const redirectToPayment = (order: any) => {
//     if (order.status === "pending" && order.payment?.checkout_url) {
//       window.location.href = order.payment.checkout_url;
//     } else {
//       Swal.fire("Error", "URL Pembayaran tidak ditemukan.", "error");
//     }
//   };

//   const handleOrderClick = (order: any) => {
//     if (canPay(order.status) && countdowns[order.id] !== "Expired") {
//       redirectToPayment(order);
//     }
//   };

//   const cancelOrder = async (id: number) => {
//     const result = await Swal.fire({
//       title: "Batalkan Pesanan?",
//       text: "Tindakan ini tidak dapat dikembalikan!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#059669",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Ya, batalkan!",
//       cancelButtonText: "Kembali",
//     });

//     if (result.isConfirmed) {
//       try {
//         const token = localStorage.getItem("user_token");
//         const res = await fetch(
//           `${BASE_URL}/api/transactions/${id}/cancel`,
//           {
//             method: "POST",
//             headers: { Authorization: `Bearer ${token}` },
//           },
//         );

//         if (res.ok) {
//           Swal.fire("Dibatalkan!", "Pesanan Anda telah dibatalkan.", "success");
//           fetchOrders();
//         } else {
//           const errorData = await res.json();
//           throw new Error(errorData.message);
//         }
//       } catch (err: any) {
//         Swal.fire(
//           "Error",
//           `Gagal membatalkan: ${err.message || "Terjadi kesalahan"}`,
//           "error",
//         );
//       }
//     }
//   };

//   const requestRefund = async (id: number) => {
//     const { value: formValues, isConfirmed } = await Swal.fire({
//       title: "Ajukan Pengembalian (Refund)",
//       html: `
//         <div class="space-y-4 text-left font-sans">
//           <div>
//             <label class="block mb-1 text-xs font-bold tracking-widest text-gray-700 uppercase">Alasan Pengembalian</label>
//             <textarea id="swal-refund-reason" rows="3" class="w-full p-3 text-sm border border-gray-300 outline-none resize-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora" placeholder="Jelaskan alasan pengembalian dana..."></textarea>
//           </div>
//           <div>
//             <label class="block mb-1 text-xs font-bold tracking-widest text-gray-700 uppercase">Upload Bukti (Foto/Video)</label>
//             <input type="file" id="swal-refund-file" accept="image/*,video/mp4,video/quicktime" class="w-full text-sm text-gray-500 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-gray-100 file:text-black hover:file:bg-gray-200" />
//             <p class="text-[10px] text-gray-400 mt-1">Maksimal 10MB. Format: JPG, PNG, MP4.</p>
//           </div>
//         </div>
//       `,
//       showCancelButton: true,
//       confirmButtonColor: "#059669",
//       confirmButtonText: "Kirim Pengajuan",
//       preConfirm: () => {
//         const reason = (
//           document.getElementById("swal-refund-reason") as HTMLTextAreaElement
//         ).value;
//         const fileInput = document.getElementById(
//           "swal-refund-file",
//         ) as HTMLInputElement;
//         const file = fileInput.files?.[0];

//         if (!reason) {
//           Swal.showValidationMessage("Harap isi alasan pengembalian.");
//           return false;
//         }
//         if (!file) {
//           Swal.showValidationMessage("Harap unggah file bukti.");
//           return false;
//         }
//         if (file.size > 10 * 1024 * 1024) {
//           Swal.showValidationMessage(
//             "Ukuran file tidak boleh lebih dari 10MB.",
//           );
//           return false;
//         }
//         return { reason, file };
//       },
//     });

//     if (isConfirmed && formValues) {
//       Swal.fire({
//         title: "Mengunggah...",
//         text: "Mohon tunggu, permintaan Anda sedang diproses.",
//         allowOutsideClick: false,
//         didOpen: () => {
//           Swal.showLoading();
//         },
//       });

//       try {
//         const token = localStorage.getItem("user_token");
//         const formData = new FormData();
//         formData.append("reason", formValues.reason);
//         formData.append("proof_file", formValues.file);

//         const res = await fetch(
//           `${BASE_URL}/api/transactions/${id}/refund-request`,
//           {
//             method: "POST",
//             headers: { Authorization: `Bearer ${token}` },
//             body: formData,
//           },
//         );

//         if (res.ok) {
//           fetchOrders();
//           Swal.fire(
//             "Berhasil",
//             "Pengajuan pengembalian telah dikirim ke admin.",
//             "success",
//           );
//         } else {
//           const errData = await res.json();
//           throw new Error(errData.message);
//         }
//       } catch (err: any) {
//         Swal.fire(
//           "Error",
//           err.message || "Gagal mengajukan pengembalian",
//           "error",
//         );
//       }
//     }
//   };

//   const processRefundUser = async (id: number) => {
//     try {
//       const token = localStorage.getItem("user_token");
//       const res = await fetch(
//         `${BASE_URL}/api/transactions/${id}/refund-process`,
//         {
//           method: "POST",
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );

//       if (res.ok) {
//         const data = await res.json();
//         fetchOrders();
//         Swal.fire("Refunded", data.message, "success");
//       } else {
//         throw new Error("Gagal memproses refund");
//       }
//     } catch (err: any) {
//       Swal.fire("Error", err.message || "Refund process failed", "error");
//     }
//   };

//   return (
//     <div className="min-h-screen px-6 py-20 mx-auto font-sans max-w-7xl animate-fade-in">
//       <div className="flex items-center justify-between mb-10">
//         <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 uppercase">
//           Lacak Pesanan
//         </h1>
//       </div>

//       {/* TABS */}
//       <div className="mb-8 border-b border-gray-200">
//         <div className="flex gap-6 pb-2 overflow-x-auto custom-scrollbar">
//           {unifiedTabs.map((tab) => (
//             <button
//               key={tab.value}
//               onClick={() => setActiveUnifiedTab(tab.value)}
//               className={`pb-4 font-bold text-xs uppercase tracking-widest transition-colors whitespace-nowrap border-b-2 flex items-center gap-2 ${
//                 activeUnifiedTab === tab.value
//                   ? "border-gycora text-gycora"
//                   : "border-transparent text-gray-400 hover:text-gray-700"
//               }`}
//             >
//               {tab.label}
//               {getUnifiedTabCount(tab.value) > 0 && (
//                 <span
//                   className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
//                     activeUnifiedTab === tab.value
//                       ? "bg-gycora text-white"
//                       : "bg-gray-200 text-gray-600"
//                   }`}
//                 >
//                   {getUnifiedTabCount(tab.value)}
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* FILTER & SEARCH */}
//       <div className="flex flex-col items-center justify-between gap-4 mb-8 md:flex-row">
//         <div className="relative w-full md:w-80">
//           <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-5 h-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//           </span>
//           <input
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             type="text"
//             placeholder="Cari ID Pesanan, Kurir, Metode..."
//             className="w-full py-2 pl-10 pr-4 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora"
//           />
//         </div>

//         <div className="flex items-center w-full gap-2 md:w-auto">
//           <span className="text-xs font-bold tracking-wide text-gray-400 uppercase">
//             Tampilkan:
//           </span>
//           <select
//             value={itemsPerPage}
//             onChange={(e) => setItemsPerPage(Number(e.target.value))}
//             className="px-3 py-2 text-sm font-bold border border-gray-200 outline-none cursor-pointer bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora"
//           >
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={20}>20</option>
//             <option value={50}>50</option>
//           </select>
//         </div>
//       </div>

//       {/* KONTEN */}
//       {loading ? (
//         <div className="space-y-8 animate-pulse">
//           {[1, 2, 3].map((i) => (
//             <div
//               key={i}
//               className="overflow-hidden bg-white border border-gray-100 rounded-2xl"
//             >
//               <div className="h-20 border-b border-gray-100 bg-gray-50"></div>
//               <div className="flex items-center gap-4 px-6 py-6">
//                 <div className="w-16 h-16 bg-gray-200 rounded-lg shrink-0"></div>
//                 <div className="w-full h-12 bg-gray-200 rounded-lg"></div>
//               </div>
//               <div className="h-16 bg-gray-50"></div>
//             </div>
//           ))}
//         </div>
//       ) : filteredTransactions.length === 0 ? (
//         <div className="p-12 text-center bg-white border border-gray-100 rounded-2xl animate-fade-in">
//           <p className="italic text-gray-400">
//             Tidak ada pesanan yang sesuai dengan filter.
//           </p>
//           <button
//             onClick={resetFilters}
//             className="inline-block mt-6 text-xs font-bold tracking-widest underline uppercase text-gycora hover:text-gycora-dark"
//           >
//             Hapus Filter
//           </button>
//         </div>
//       ) : (
//         <div className="space-y-8 animate-fade-in">
//           {paginatedTransactions.map((order) => (
//             <div
//               key={order.id}
//               className="relative overflow-hidden transition-shadow duration-300 bg-white border border-gray-100 shadow-sm hover:shadow-md rounded-2xl"
//             >
//               {/* ORDER HEADER */}
//               <div className="flex flex-col items-start justify-between gap-4 px-6 py-4 border-b border-gray-100 md:flex-row md:items-center bg-gray-50">
//                 <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
//                   <div>
//                     <p className="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-1">
//                       Order ID
//                     </p>
//                     <p className="font-mono text-sm font-bold text-gray-800">
//                       {order.order_id}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-1">
//                       Tanggal
//                     </p>
//                     <p className="text-xs font-bold text-gray-800">
//                       {formatDateTime(order.created_at)}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex flex-col items-end w-full gap-2 md:w-auto">
//                   <div className="flex items-center justify-between w-full gap-3 md:justify-end md:w-auto">
//                     <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
//                       Status:
//                     </span>
//                     <span
//                       className={`px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-tighter ${statusClass(order.status)}`}
//                     >
//                       {formatStatus(order.status)}
//                     </span>
//                   </div>

//                   {order.shipping_method === "biteship" ? (
//                     <div className="flex items-center justify-between w-full gap-3 md:justify-end md:w-auto">
//                       <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
//                         Pengiriman:
//                       </span>
//                       <span
//                         className={`px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-tighter border ${shippingStatusClass(order.shipping_status)}`}
//                       >
//                         {formatStatus(order.shipping_status || "Pending")}
//                       </span>
//                     </div>
//                   ) : order.shipping_method === "free" ? (
//                     <div className="flex items-center justify-between w-full gap-3 md:justify-end md:w-auto">
//                       <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
//                         Pengiriman:
//                       </span>
//                       <span className="px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-tighter border bg-gray-100 text-gray-600">
//                         In-Store Pickup
//                       </span>
//                     </div>
//                   ) : null}
//                 </div>
//               </div>

//               {/* LOYALTY REWARD BADGE */}
//               <div className="relative flex flex-col gap-6 px-6 py-4 bg-white border-b border-gray-100 md:flex-row md:gap-12">
//                 {userData?.is_membership &&
//                 order.point > 0 &&
//                 order.status === "completed" ? (
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
//                         +{order.point}
//                       </span>
//                       <span className="ml-1 text-xs font-bold text-emerald-800">
//                         Pts
//                       </span>
//                     </div>
//                   </div>
//                 ) : null}
//                 <div className="flex-1 mt-4 md:mt-0"></div>
//                 <div className="flex-1 mt-4 md:mt-0"></div>
//               </div>

//               {/* PAYMENT & SHIPPING INFO */}
//               <div className="flex flex-col gap-6 px-6 py-4 bg-white border-b border-gray-100 md:flex-row md:gap-12">
//                 <div className="flex-1">
//                   <p className="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3">
//                     Payment Info
//                   </p>
//                   {order.payment_method ? (
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-12 h-8 overflow-hidden border border-gray-100 rounded bg-gray-50 shrink-0">
//                         {getPaymentLogo(order.payment_method) ? (
//                           <img
//                             src={getPaymentLogo(order.payment_method)!}
//                             className="object-contain w-full h-full p-0.5"
//                           />
//                         ) : (
//                           <span className="font-black text-gray-300 text-[8px]">
//                             {order.payment_method.split(" ")[1] || "PAY"}
//                           </span>
//                         )}
//                       </div>
//                       <div>
//                         <p className="text-xs font-bold text-gray-800 uppercase">
//                           {order.payment_method.replace("_", " ")}
//                         </p>
//                         {order.status === "refunded" ? (
//                           <p className="text-[10px] text-teal-600 font-bold mt-0.5">
//                             REFUNDED
//                           </p>
//                         ) : order.status === "cancelled" ? (
//                           <p className="text-[10px] text-red-600 font-bold mt-0.5">
//                             EXPIRED / CANCELLED
//                           </p>
//                         ) : canPay(order.status) ? (
//                           <p className="text-[10px] text-orange-500 font-bold mt-0.5">
//                             UNPAID
//                           </p>
//                         ) : (
//                           <p className="text-[10px] text-emerald-600 font-bold mt-0.5">
//                             PAID
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   ) : (
//                     <p className="text-xs italic text-gray-400">
//                       Menunggu pilihan pembayaran...
//                     </p>
//                   )}
//                 </div>

//                 <div className="flex-1">
//                   <p className="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3">
//                     Shipping Info
//                   </p>
//                   {order.shipping_method === "free" ? (
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-12 h-12 text-gray-400 bg-gray-100 border border-gray-200 rounded-lg shrink-0">
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
//                             strokeWidth="2"
//                             d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//                           />
//                         </svg>
//                       </div>
//                       <div>
//                         <p className="text-xs font-bold text-gray-800 uppercase">
//                           Ambil Sendiri
//                         </p>
//                         <p className="text-[10px] text-gray-500 font-medium mt-0.5">
//                           In-store Payment / Pickup
//                         </p>
//                       </div>
//                     </div>
//                   ) : order.shipping_method === "biteship" &&
//                     order.courier_company ? (
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-12 h-12 overflow-hidden bg-white border border-gray-100 rounded-lg shrink-0">
//                         {getCourierLogo(order.courier_company) ? (
//                           <img
//                             src={getCourierLogo(order.courier_company)!}
//                             className="object-contain w-full h-full p-1"
//                           />
//                         ) : (
//                           <span className="text-xs font-black text-gray-300">
//                             {order.courier_company.toUpperCase()}
//                           </span>
//                         )}
//                       </div>
//                       <div>
//                         <p className="text-xs font-bold text-gray-800 uppercase">
//                           {order.courier_company} - {order.courier_type}
//                         </p>
//                         <p className="text-[10px] text-gray-500 mt-0.5">
//                           Resi:{" "}
//                           <span className="font-mono font-bold text-black">
//                             {order.tracking_number || "Waiting..."}
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="text-xs italic text-gray-400">
//                       Tentukan di halaman checkout
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* ITEMS LIST */}
//               <div
//                 onClick={() => handleOrderClick(order)}
//                 className={`px-6 py-2 ${canPay(order.status) && countdowns[order.id] !== "Expired" ? "cursor-pointer hover:bg-emerald-50/30 transition-colors" : ""}`}
//               >
//                 {canPay(order.status) && countdowns[order.id] !== "Expired" && (
//                   <div className="my-3 text-emerald-600 text-[10px] text-center uppercase tracking-widest animate-pulse font-bold bg-emerald-50 py-2 rounded-lg">
//                     Ketuk di area ini untuk melanjutkan pembayaran
//                   </div>
//                 )}

//                 {order.details.map((detail: any) => (
//                   <div
//                     key={detail.id}
//                     className="flex items-center gap-4 py-4 border-b border-gray-50 last:border-0"
//                   >
//                     <img
//                       src={detail.product.image_url}
//                       className="object-cover w-16 h-16 bg-gray-100 border border-gray-100 rounded-lg shadow-sm"
//                     />
//                     <div className="flex-grow">
//                       <h4 className="text-sm font-bold text-gray-900 uppercase">
//                         {detail.product.name}
//                       </h4>
//                       {detail.color && (
//                         <div className="flex items-center gap-1.5 mt-1">
//                           <div
//                             className="w-3 h-3 border border-gray-300 rounded-full shadow-sm"
//                             style={{ backgroundColor: detail.color }}
//                             title="Varian Warna"
//                           ></div>
//                         </div>
//                       )}
//                       <p className="mt-1 text-xs text-gray-400">
//                         {detail.quantity} x {formatPrice(detail.price)}
//                       </p>
//                     </div>
//                     <p className="text-sm font-bold text-gray-900">
//                       {formatPrice(detail.quantity * detail.price)}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* TOTALS & ACTIONS */}
//               <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
//                 <div className="flex flex-col pb-4 mb-4 space-y-1 border-b border-gray-200">
//                   <div className="flex justify-between text-xs text-gray-500">
//                     <span>Subtotal Produk</span>
//                     <span>{formatPrice(getSubtotal(order))}</span>
//                   </div>
//                   <div className="flex justify-between text-xs text-gray-500">
//                     <span>
//                       Ongkos Kirim (
//                       {order.shipping_cost > 0
//                         ? `${formatPrice(order.shipping_cost / getOrderQuantity(order))} x ${getOrderQuantity(order)}`
//                         : "Gratis"}
//                       )
//                     </span>
//                     <span>{formatPrice(order.shipping_cost)}</span>
//                   </div>

//                   {order.promo_discount > 0 && (
//                     <div className="flex justify-between text-xs font-medium text-emerald-600">
//                       <span>
//                         Promo (
//                         <span className="font-mono uppercase">
//                           {order.promo_code}
//                         </span>
//                         )
//                       </span>
//                       <span>- {formatPrice(order.promo_discount)}</span>
//                     </div>
//                   )}

//                   {order.points_used > 0 && (
//                     <div className="flex justify-between text-xs font-medium text-yellow-600">
//                       <span>Poin Ditukarkan ({order.points_used} Pts)</span>
//                       <span>- {formatPrice(order.points_used * 1000)}</span>
//                     </div>
//                   )}

//                   <div className="flex justify-between pt-2 mt-2 text-sm font-bold text-gray-900 border-t border-gray-200 border-dashed">
//                     <span className="uppercase tracking-widest text-[10px] mt-1">
//                       Total Akhir
//                     </span>
//                     <span className="text-lg text-gycora">
//                       {formatPrice(getGrandTotal(order))}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
//                   <div className="w-full text-left md:w-auto">
//                     {canPay(order.status) && order.payment && (
//                       <div className="flex items-center justify-center gap-2 md:justify-start">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-4 h-4 text-red-500 animate-pulse"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                           />
//                         </svg>
//                         <span className="font-mono text-sm font-bold text-red-500">
//                           {countdowns[order.id]}
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex flex-wrap justify-center w-full gap-3 md:justify-end md:w-auto">
//                     {canCancel(order.status) && (
//                       <button
//                         onClick={() => cancelOrder(order.id)}
//                         className="w-full px-6 py-2 text-xs font-bold tracking-widest text-red-600 uppercase transition border border-red-200 hover:bg-red-50 rounded-xl md:w-auto"
//                       >
//                         Batalkan
//                       </button>
//                     )}
//                     {canPay(order.status) && (
//                       <button
//                         onClick={() => redirectToPayment(order)}
//                         disabled={countdowns[order.id] === "Expired"}
//                         className="w-full px-6 py-2 text-xs font-bold tracking-widest text-white uppercase transition bg-gray-900 hover:bg-black disabled:bg-gray-300 disabled:cursor-not-allowed rounded-xl md:w-auto"
//                       >
//                         Bayar Sekarang
//                       </button>
//                     )}
//                     {[
//                       "processing",
//                       "completed",
//                       "cancelled",
//                       "refund_requested",
//                       "refund_approved",
//                       "refunded",
//                       "refund_rejected",
//                       "refund_manual_required",
//                       "shipping_failed",
//                       "returned",
//                     ].includes(order.status) &&
//                       order.shipping_method === "biteship" && (
//                         <button
//                           onClick={() =>
//                             navigate(`/tracking/${order.id}`, {
//                               state: { paymentMethod: order.payment_method },
//                             })
//                           }
//                           className="w-full px-6 py-2 text-xs font-bold tracking-widest text-white uppercase transition shadow-sm bg-gycora hover:bg-gycora-dark rounded-xl md:w-auto"
//                         >
//                           Lacak Paket
//                         </button>
//                       )}
//                     {canRequestRefund(order) && (
//                       <button
//                         onClick={() => requestRefund(order.id)}
//                         className="w-full px-6 py-2 text-xs font-bold tracking-widest text-gray-600 uppercase transition border border-gray-300 hover:bg-gray-100 rounded-xl md:w-auto"
//                       >
//                         Ajukan Retur
//                       </button>
//                     )}
//                     {order.status === "refund_requested" && (
//                       <div className="w-full px-4 py-2 text-xs font-bold text-center bg-amber-100 rounded-xl text-amber-700 md:w-auto">
//                         Menunggu Admin
//                       </div>
//                     )}
//                     {order.status === "refund_manual_required" && (
//                       <div className="w-full px-4 py-2 text-xs font-bold text-center text-pink-700 bg-pink-100 rounded-xl md:w-auto">
//                         Refund Manual
//                       </div>
//                     )}
//                     {order.status === "refund_approved" && (
//                       <button
//                         onClick={() => processRefundUser(order.id)}
//                         className="w-full px-6 py-2 text-xs font-bold tracking-widest text-white uppercase transition bg-blue-600 shadow-sm hover:bg-blue-700 rounded-xl md:w-auto"
//                       >
//                         Tarik Dana
//                       </button>
//                     )}
//                     {order.status === "refund_rejected" && (
//                       <div className="w-full text-xs italic font-bold text-center text-red-500 md:w-auto">
//                         Retur Ditolak
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* PAGINATION */}
//           {filteredTransactions.length > 0 && (
//             <div className="flex flex-col items-center justify-between gap-4 pt-6 mt-8 border-t border-gray-100 md:flex-row">
//               <p className="text-sm text-gray-400">
//                 Menampilkan{" "}
//                 <span className="font-bold text-black">{showingStart}</span>{" "}
//                 hingga{" "}
//                 <span className="font-bold text-black">{showingEnd}</span> dari{" "}
//                 <span className="font-bold text-black">
//                   {filteredTransactions.length}
//                 </span>{" "}
//                 pesanan
//               </p>

//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setCurrentPage((prev) => prev - 1)}
//                   disabled={currentPage === 1}
//                   className="px-4 py-2 text-sm font-medium transition border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
//                 >
//                   Mundur
//                 </button>

//                 <div className="flex gap-1">
//                   {visiblePages.map((page, index) => (
//                     <button
//                       key={index}
//                       onClick={() =>
//                         typeof page === "number" ? setCurrentPage(page) : null
//                       }
//                       disabled={page === "..."}
//                       className={`flex items-center justify-center w-10 h-10 text-sm font-medium transition rounded-xl ${currentPage === page ? "bg-gycora text-white border-gycora" : "hover:bg-gray-50 border-gray-200"} ${page === "..." ? "cursor-default border-transparent hover:bg-transparent" : "border"}`}
//                     >
//                       {page}
//                     </button>
//                   ))}
//                 </div>

//                 <button
//                   onClick={() => setCurrentPage((prev) => prev + 1)}
//                   disabled={currentPage === totalPages || totalPages === 0}
//                   className="px-4 py-2 text-sm font-medium transition border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
//                 >
//                   Lanjut
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useMemo, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// // --- IMPORT KOMPONEN REVIEW MODAL ---
// import ReviewModal from "../../components/ReviewModal";

// export default function OrderPage() {
//   const navigate = useNavigate();

//   // --- STATE ---
//   const [userData, setUserData] = useState<any>(null);
//   const [transactions, setTransactions] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [countdowns, setCountdowns] = useState<Record<number, string>>({});

//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [activeUnifiedTab, setActiveUnifiedTab] = useState("all");

//   const timerIntervalRef = useRef<any>(null);

//   // --- STATE UNTUK REVIEW MODAL ---
//   const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
//   const [selectedReviewItem, setSelectedReviewItem] = useState<{
//     productId: number;
//     productName: string;
//     transactionId: string;
//   } | null>(null);

//   // --- TABS DEFINITION ---
//   const unifiedTabs = [
//     { label: "Semua Pesanan", value: "all" },
//     { label: "Belum Dibayar", value: "unpaid" },
//     { label: "Akan Dikirim", value: "to_ship" },
//     { label: "Sedang Dikirim", value: "shipping" },
//     { label: "Selesai", value: "completed" },
//     { label: "Dibatalkan", value: "cancelled" },
//     { label: "Kendala / Retur", value: "issues" },
//   ];

//   // --- HELPERS ---
//   const formatPrice = (v: number) =>
//     new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(v);

//   const formatDateTime = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("id-ID", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const formatStatus = (status: string) =>
//     status ? status.replace(/_/g, " ") : "";

//   const getSubtotal = (order: any) => order.total_amount;

//   const getGrandTotal = (order: any) => {
//     if (!order) return 0;
//     const total = parseFloat(order.total_amount || 0);
//     const shipping = parseFloat(order.shipping_cost || 0);
//     const promo = parseFloat(order.promo_discount || 0);

//     const pointsDiscount = (order.points_used || 0) * 1000;

//     return total + shipping - promo - pointsDiscount;
//   };

//   const getOrderQuantity = (order: any) =>
//     order.details.reduce((sum: number, item: any) => sum + item.quantity, 0);

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
//     const key = company.toLowerCase();
//     return map[key] ? "/courier_images/" + map[key] : null;
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

//   const statusClass = (status: string) => {
//     const map: Record<string, string> = {
//       pending: "bg-orange-100 text-orange-700",
//       processing: "bg-blue-100 text-blue-700",
//       completed: "bg-emerald-100 text-emerald-700",
//       cancelled: "bg-red-100 text-red-700",
//       refund_requested: "bg-purple-100 text-purple-700",
//       refund_approved: "bg-indigo-100 text-indigo-700",
//       refund_rejected: "bg-gray-200 text-gray-600 line-through",
//       refunded: "bg-teal-100 text-teal-700",
//       refund_manual_required: "bg-pink-100 text-pink-700",
//       returned: "bg-gray-800 text-white",
//       shipping_failed: "bg-red-800 text-white",
//     };
//     return map[status] || "bg-gray-100 text-gray-500";
//   };

//   const shippingStatusClass = (status: string) => {
//     if (!status) return "bg-gray-50 border-gray-200 text-gray-500";
//     const str = status.toLowerCase();
//     if (["delivered"].includes(str))
//       return "bg-emerald-50 border-emerald-200 text-emerald-700";
//     if (
//       ["cancelled", "rejected", "disposed", "courier_not_found"].includes(str)
//     )
//       return "bg-red-50 border-red-200 text-red-700";
//     if (["on_hold", "return_in_transit", "returned"].includes(str))
//       return "bg-amber-50 border-amber-200 text-amber-700";
//     if (
//       [
//         "picking_up",
//         "picked",
//         "dropping_off",
//         "allocated",
//         "confirmed",
//       ].includes(str)
//     )
//       return "bg-blue-50 border-blue-200 text-blue-700";
//     return "bg-gray-50 border-gray-200 text-gray-600";
//   };

//   const canPay = (status: string) => ["pending"].includes(status);
//   const canCancel = (status: string) =>
//     ["pending", "processing"].includes(status);
//   const canRequestRefund = (order: any) => {
//     if (!["completed", "shipping_failed", "returned"].includes(order.status))
//       return false;
//     if (["shipping_failed", "returned"].includes(order.status)) return true;
//     if (order.shipping_method === "free") return true;

//     if (order.shipping_method === "biteship") {
//       const shipStatus = order.shipping_status
//         ? order.shipping_status.toLowerCase()
//         : "pending";
//       const unRefundableLogistics = [
//         "picked",
//         "dropping_off",
//         "delivered",
//         "return_in_transit",
//       ];
//       if (unRefundableLogistics.includes(shipStatus)) return false;
//       return true;
//     }
//     return false;
//   };

//   // --- LOGIC & COMPUTED EQUIVALENTS ---
//   const getUnifiedTabCount = (tabValue: string) => {
//     return transactions.filter((order) => {
//       if (tabValue === "all") return true;
//       const shipStatus = order.shipping_status
//         ? order.shipping_status.toLowerCase()
//         : "pending";

//       if (tabValue === "unpaid") return order.status === "pending";
//       if (tabValue === "to_ship")
//         return (
//           order.status === "processing" &&
//           [
//             "pending",
//             "placed",
//             "confirmed",
//             "allocated",
//             "picking_up",
//             "picked",
//           ].includes(shipStatus)
//         );
//       if (tabValue === "shipping") return shipStatus === "dropping_off";
//       if (tabValue === "completed")
//         return order.status === "completed" || shipStatus === "delivered";
//       if (tabValue === "cancelled") return order.status === "cancelled";
//       if (tabValue === "issues")
//         return (
//           order.status.includes("refund") ||
//           ["returned", "shipping_failed"].includes(order.status) ||
//           [
//             "on_hold",
//             "return_in_transit",
//             "rejected",
//             "disposed",
//             "courier_not_found",
//           ].includes(shipStatus)
//         );

//       return false;
//     }).length;
//   };

//   const filteredTransactions = useMemo(() => {
//     const query = searchQuery.toLowerCase();

//     return transactions.filter((order) => {
//       let matchSearch = true;
//       if (query) {
//         matchSearch =
//           order.order_id.toLowerCase().includes(query) ||
//           (order.total_amount &&
//             order.total_amount.toString().includes(query)) ||
//           (order.shipping_cost &&
//             order.shipping_cost.toString().includes(query)) ||
//           (order.payment_method &&
//             order.payment_method.toLowerCase().includes(query)) ||
//           (order.tracking_number &&
//             order.tracking_number.toLowerCase().includes(query)) ||
//           (order.delivery_type &&
//             order.delivery_type.toLowerCase().includes(query)) ||
//           (order.courier_company &&
//             order.courier_company.toLowerCase().includes(query));
//       }

//       let matchTab = false;
//       const tabValue = activeUnifiedTab;
//       const shipStatus = order.shipping_status
//         ? order.shipping_status.toLowerCase()
//         : "pending";

//       if (tabValue === "all") matchTab = true;
//       else if (tabValue === "unpaid") matchTab = order.status === "pending";
//       else if (tabValue === "to_ship")
//         matchTab =
//           order.status === "processing" &&
//           [
//             "pending",
//             "placed",
//             "confirmed",
//             "allocated",
//             "picking_up",
//             "picked",
//           ].includes(shipStatus);
//       else if (tabValue === "shipping")
//         matchTab = shipStatus === "dropping_off";
//       else if (tabValue === "completed")
//         matchTab = order.status === "completed" || shipStatus === "delivered";
//       else if (tabValue === "cancelled")
//         matchTab = order.status === "cancelled";
//       else if (tabValue === "issues")
//         matchTab =
//           order.status.includes("refund") ||
//           ["returned", "shipping_failed"].includes(order.status) ||
//           [
//             "on_hold",
//             "return_in_transit",
//             "rejected",
//             "disposed",
//             "courier_not_found",
//           ].includes(shipStatus);

//       return matchSearch && matchTab;
//     });
//   }, [transactions, searchQuery, activeUnifiedTab]);

//   const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
//   const paginatedTransactions = useMemo(() => {
//     const start = (currentPage - 1) * itemsPerPage;
//     return filteredTransactions.slice(start, start + itemsPerPage);
//   }, [filteredTransactions, currentPage, itemsPerPage]);

//   const showingStart =
//     filteredTransactions.length === 0
//       ? 0
//       : (currentPage - 1) * itemsPerPage + 1;
//   const showingEnd = Math.min(
//     currentPage * itemsPerPage,
//     filteredTransactions.length,
//   );

//   const visiblePages = useMemo(() => {
//     const maxVisible = 7;
//     if (totalPages <= maxVisible)
//       return Array.from({ length: totalPages }, (_, i) => i + 1);
//     if (currentPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
//     if (currentPage >= totalPages - 3)
//       return [
//         1,
//         "...",
//         totalPages - 4,
//         totalPages - 3,
//         totalPages - 2,
//         totalPages - 1,
//         totalPages,
//       ];
//     return [
//       1,
//       "...",
//       currentPage - 1,
//       currentPage,
//       currentPage + 1,
//       "...",
//       totalPages,
//     ];
//   }, [currentPage, totalPages]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery, itemsPerPage, activeUnifiedTab]);

//   const resetFilters = () => {
//     setActiveUnifiedTab("all");
//     setSearchQuery("");
//   };

//   // --- TIMERS & API ---
//   const calculateTimeLeft = (referenceDate: string) => {
//     if (!referenceDate) return "Expired";
//     const expiryTime = new Date(referenceDate).getTime() + 86400000; // +24 Jam
//     const now = new Date().getTime();
//     const diff = expiryTime - now;

//     if (diff <= 0) return "Expired";

//     const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((diff % (1000 * 60)) / 1000);
//     return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
//   };

//   const autoCancelSilent = async (id: number) => {
//     try {
//       const token = localStorage.getItem("user_token");
//       await fetch(`${BASE_URL}/api/transactions/${id}/cancel`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchOrders();
//     } catch (e) {
//       console.error("Auto cancel failed", e);
//     }
//   };

//   const startTimers = (currentOrders: any[]) => {
//     if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

//     timerIntervalRef.current = setInterval(() => {
//       setCountdowns((prev) => {
//         const newCountdowns = { ...prev };
//         currentOrders.forEach((order) => {
//           if (canPay(order.status)) {
//             const timeReference =
//               order.status === "pending" && order.payment?.created_at
//                 ? order.payment.created_at
//                 : order.created_at;

//             const timeLeft = calculateTimeLeft(timeReference);
//             newCountdowns[order.id] = timeLeft;

//             if (timeLeft === "Expired" && !order.isCancelling) {
//               order.isCancelling = true;
//               autoCancelSilent(order.id);
//             }
//           }
//         });
//         return newCountdowns;
//       });
//     }, 1000);
//   };

//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("user_token");
//       const res = await fetch(`${BASE_URL}/api/transactions`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       });
//       if (!res.ok) throw new Error("Gagal mengambil data");

//       const data = await res.json();
//       const validTransactions = data.filter(
//         (order: any) => order.status !== "awaiting_payment",
//       );

//       const mappedOrders = validTransactions.map((o: any) => ({
//         ...o,
//         isCancelling: false,
//       }));
//       setTransactions(mappedOrders);
//       startTimers(mappedOrders);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setTimeout(() => setLoading(false), 300);
//     }
//   };

//   useEffect(() => {
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) setUserData(JSON.parse(userStr));
//     fetchOrders();

//     return () => {
//       if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // --- ACTIONS ---
//   const redirectToPayment = (order: any) => {
//     if (order.status === "pending" && order.payment?.checkout_url) {
//       window.location.href = order.payment.checkout_url;
//     } else {
//       Swal.fire("Error", "URL Pembayaran tidak ditemukan.", "error");
//     }
//   };

//   const handleOrderClick = (order: any) => {
//     if (canPay(order.status) && countdowns[order.id] !== "Expired") {
//       redirectToPayment(order);
//     }
//   };

//   const cancelOrder = async (id: number) => {
//     const result = await Swal.fire({
//       title: "Batalkan Pesanan?",
//       text: "Tindakan ini tidak dapat dikembalikan!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#059669",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Ya, batalkan!",
//       cancelButtonText: "Kembali",
//     });

//     if (result.isConfirmed) {
//       try {
//         const token = localStorage.getItem("user_token");
//         const res = await fetch(
//           `${BASE_URL}/api/transactions/${id}/cancel`,
//           {
//             method: "POST",
//             headers: { Authorization: `Bearer ${token}` },
//           },
//         );

//         if (res.ok) {
//           Swal.fire("Dibatalkan!", "Pesanan Anda telah dibatalkan.", "success");
//           fetchOrders();
//         } else {
//           const errorData = await res.json();
//           throw new Error(errorData.message);
//         }
//       } catch (err: any) {
//         Swal.fire(
//           "Error",
//           `Gagal membatalkan: ${err.message || "Terjadi kesalahan"}`,
//           "error",
//         );
//       }
//     }
//   };

//   const requestRefund = async (id: number) => {
//     const { value: formValues, isConfirmed } = await Swal.fire({
//       title: "Ajukan Pengembalian (Refund)",
//       html: `
//         <div class="space-y-4 text-left font-sans">
//           <div>
//             <label class="block mb-1 text-xs font-bold tracking-widest text-gray-700 uppercase">Alasan Pengembalian</label>
//             <textarea id="swal-refund-reason" rows="3" class="w-full p-3 text-sm border border-gray-300 outline-none resize-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora" placeholder="Jelaskan alasan pengembalian dana..."></textarea>
//           </div>
//           <div>
//             <label class="block mb-1 text-xs font-bold tracking-widest text-gray-700 uppercase">Upload Bukti (Foto/Video)</label>
//             <input type="file" id="swal-refund-file" accept="image/*,video/mp4,video/quicktime" class="w-full text-sm text-gray-500 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-gray-100 file:text-black hover:file:bg-gray-200" />
//             <p class="text-[10px] text-gray-400 mt-1">Maksimal 10MB. Format: JPG, PNG, MP4.</p>
//           </div>
//         </div>
//       `,
//       showCancelButton: true,
//       confirmButtonColor: "#059669",
//       confirmButtonText: "Kirim Pengajuan",
//       preConfirm: () => {
//         const reason = (
//           document.getElementById("swal-refund-reason") as HTMLTextAreaElement
//         ).value;
//         const fileInput = document.getElementById(
//           "swal-refund-file",
//         ) as HTMLInputElement;
//         const file = fileInput.files?.[0];

//         if (!reason) {
//           Swal.showValidationMessage("Harap isi alasan pengembalian.");
//           return false;
//         }
//         if (!file) {
//           Swal.showValidationMessage("Harap unggah file bukti.");
//           return false;
//         }
//         if (file.size > 10 * 1024 * 1024) {
//           Swal.showValidationMessage(
//             "Ukuran file tidak boleh lebih dari 10MB.",
//           );
//           return false;
//         }
//         return { reason, file };
//       },
//     });

//     if (isConfirmed && formValues) {
//       Swal.fire({
//         title: "Mengunggah...",
//         text: "Mohon tunggu, permintaan Anda sedang diproses.",
//         allowOutsideClick: false,
//         didOpen: () => {
//           Swal.showLoading();
//         },
//       });

//       try {
//         const token = localStorage.getItem("user_token");
//         const formData = new FormData();
//         formData.append("reason", formValues.reason);
//         formData.append("proof_file", formValues.file);

//         const res = await fetch(
//           `${BASE_URL}/api/transactions/${id}/refund-request`,
//           {
//             method: "POST",
//             headers: { Authorization: `Bearer ${token}` },
//             body: formData,
//           },
//         );

//         if (res.ok) {
//           fetchOrders();
//           Swal.fire(
//             "Berhasil",
//             "Pengajuan pengembalian telah dikirim ke admin.",
//             "success",
//           );
//         } else {
//           const errData = await res.json();
//           throw new Error(errData.message);
//         }
//       } catch (err: any) {
//         Swal.fire(
//           "Error",
//           err.message || "Gagal mengajukan pengembalian",
//           "error",
//         );
//       }
//     }
//   };

//   const processRefundUser = async (id: number) => {
//     try {
//       const token = localStorage.getItem("user_token");
//       const res = await fetch(
//         `${BASE_URL}/api/transactions/${id}/refund-process`,
//         {
//           method: "POST",
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );

//       if (res.ok) {
//         const data = await res.json();
//         fetchOrders();
//         Swal.fire("Refunded", data.message, "success");
//       } else {
//         throw new Error("Gagal memproses refund");
//       }
//     } catch (err: any) {
//       Swal.fire("Error", err.message || "Refund process failed", "error");
//     }
//   };

//   return (
//     <div className="min-h-screen px-6 py-20 mx-auto font-sans max-w-7xl animate-fade-in">
//       <div className="flex items-center justify-between mb-10">
//         <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 uppercase">
//           Lacak Pesanan
//         </h1>
//       </div>

//       {/* TABS */}
//       <div className="mb-8 border-b border-gray-200">
//         <div className="flex gap-6 pb-2 overflow-x-auto custom-scrollbar">
//           {unifiedTabs.map((tab) => (
//             <button
//               key={tab.value}
//               onClick={() => setActiveUnifiedTab(tab.value)}
//               className={`pb-4 font-bold text-xs uppercase tracking-widest transition-colors whitespace-nowrap border-b-2 flex items-center gap-2 ${
//                 activeUnifiedTab === tab.value
//                   ? "border-gycora text-gycora"
//                   : "border-transparent text-gray-400 hover:text-gray-700"
//               }`}
//             >
//               {tab.label}
//               {getUnifiedTabCount(tab.value) > 0 && (
//                 <span
//                   className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
//                     activeUnifiedTab === tab.value
//                       ? "bg-gycora text-white"
//                       : "bg-gray-200 text-gray-600"
//                   }`}
//                 >
//                   {getUnifiedTabCount(tab.value)}
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* FILTER & SEARCH */}
//       <div className="flex flex-col items-center justify-between gap-4 mb-8 md:flex-row">
//         <div className="relative w-full md:w-80">
//           <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-5 h-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//           </span>
//           <input
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             type="text"
//             placeholder="Cari ID Pesanan, Kurir, Metode..."
//             className="w-full py-2 pl-10 pr-4 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora"
//           />
//         </div>

//         <div className="flex items-center w-full gap-2 md:w-auto">
//           <span className="text-xs font-bold tracking-wide text-gray-400 uppercase">
//             Tampilkan:
//           </span>
//           <select
//             value={itemsPerPage}
//             onChange={(e) => setItemsPerPage(Number(e.target.value))}
//             className="px-3 py-2 text-sm font-bold border border-gray-200 outline-none cursor-pointer bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora"
//           >
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={20}>20</option>
//             <option value={50}>50</option>
//           </select>
//         </div>
//       </div>

//       {/* KONTEN */}
//       {loading ? (
//         <div className="space-y-8 animate-pulse">
//           {[1, 2, 3].map((i) => (
//             <div
//               key={i}
//               className="overflow-hidden bg-white border border-gray-100 rounded-2xl"
//             >
//               <div className="h-20 border-b border-gray-100 bg-gray-50"></div>
//               <div className="flex items-center gap-4 px-6 py-6">
//                 <div className="w-16 h-16 bg-gray-200 rounded-lg shrink-0"></div>
//                 <div className="w-full h-12 bg-gray-200 rounded-lg"></div>
//               </div>
//               <div className="h-16 bg-gray-50"></div>
//             </div>
//           ))}
//         </div>
//       ) : filteredTransactions.length === 0 ? (
//         <div className="p-12 text-center bg-white border border-gray-100 rounded-2xl animate-fade-in">
//           <p className="italic text-gray-400">
//             Tidak ada pesanan yang sesuai dengan filter.
//           </p>
//           <button
//             onClick={resetFilters}
//             className="inline-block mt-6 text-xs font-bold tracking-widest underline uppercase text-gycora hover:text-gycora-dark"
//           >
//             Hapus Filter
//           </button>
//         </div>
//       ) : (
//         <div className="space-y-8 animate-fade-in">
//           {paginatedTransactions.map((order) => (
//             <div
//               key={order.id}
//               className="relative overflow-hidden transition-shadow duration-300 bg-white border border-gray-100 shadow-sm hover:shadow-md rounded-2xl"
//             >
//               {/* ORDER HEADER */}
//               <div className="flex flex-col items-start justify-between gap-4 px-6 py-4 border-b border-gray-100 md:flex-row md:items-center bg-gray-50">
//                 <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
//                   <div>
//                     <p className="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-1">
//                       Order ID
//                     </p>
//                     <p className="font-mono text-sm font-bold text-gray-800">
//                       {order.order_id}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-1">
//                       Tanggal
//                     </p>
//                     <p className="text-xs font-bold text-gray-800">
//                       {formatDateTime(order.created_at)}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex flex-col items-end w-full gap-2 md:w-auto">
//                   <div className="flex items-center justify-between w-full gap-3 md:justify-end md:w-auto">
//                     <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
//                       Status:
//                     </span>
//                     <span
//                       className={`px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-tighter ${statusClass(order.status)}`}
//                     >
//                       {formatStatus(order.status)}
//                     </span>
//                   </div>

//                   {order.shipping_method === "biteship" ? (
//                     <div className="flex items-center justify-between w-full gap-3 md:justify-end md:w-auto">
//                       <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
//                         Pengiriman:
//                       </span>
//                       <span
//                         className={`px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-tighter border ${shippingStatusClass(order.shipping_status)}`}
//                       >
//                         {formatStatus(order.shipping_status || "Pending")}
//                       </span>
//                     </div>
//                   ) : order.shipping_method === "free" ? (
//                     <div className="flex items-center justify-between w-full gap-3 md:justify-end md:w-auto">
//                       <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
//                         Pengiriman:
//                       </span>
//                       <span className="px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-tighter border bg-gray-100 text-gray-600">
//                         In-Store Pickup
//                       </span>
//                     </div>
//                   ) : null}
//                 </div>
//               </div>

//               {/* LOYALTY REWARD BADGE */}
//               <div className="relative flex flex-col gap-6 px-6 py-4 bg-white border-b border-gray-100 md:flex-row md:gap-12">
//                 {userData?.is_membership &&
//                 order.point > 0 &&
//                 order.status === "completed" ? (
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
//                         +{order.point}
//                       </span>
//                       <span className="ml-1 text-xs font-bold text-emerald-800">
//                         Pts
//                       </span>
//                     </div>
//                   </div>
//                 ) : null}
//                 <div className="flex-1 mt-4 md:mt-0"></div>
//                 <div className="flex-1 mt-4 md:mt-0"></div>
//               </div>

//               {/* PAYMENT & SHIPPING INFO */}
//               <div className="flex flex-col gap-6 px-6 py-4 bg-white border-b border-gray-100 md:flex-row md:gap-12">
//                 <div className="flex-1">
//                   <p className="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3">
//                     Payment Info
//                   </p>
//                   {order.payment_method ? (
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-12 h-8 overflow-hidden border border-gray-100 rounded bg-gray-50 shrink-0">
//                         {getPaymentLogo(order.payment_method) ? (
//                           <img
//                             src={getPaymentLogo(order.payment_method)!}
//                             className="object-contain w-full h-full p-0.5"
//                           />
//                         ) : (
//                           <span className="font-black text-gray-300 text-[8px]">
//                             {order.payment_method.split(" ")[1] || "PAY"}
//                           </span>
//                         )}
//                       </div>
//                       <div>
//                         <p className="text-xs font-bold text-gray-800 uppercase">
//                           {order.payment_method.replace("_", " ")}
//                         </p>
//                         {order.status === "refunded" ? (
//                           <p className="text-[10px] text-teal-600 font-bold mt-0.5">
//                             REFUNDED
//                           </p>
//                         ) : order.status === "cancelled" ? (
//                           <p className="text-[10px] text-red-600 font-bold mt-0.5">
//                             EXPIRED / CANCELLED
//                           </p>
//                         ) : canPay(order.status) ? (
//                           <p className="text-[10px] text-orange-500 font-bold mt-0.5">
//                             UNPAID
//                           </p>
//                         ) : (
//                           <p className="text-[10px] text-emerald-600 font-bold mt-0.5">
//                             PAID
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   ) : (
//                     <p className="text-xs italic text-gray-400">
//                       Menunggu pilihan pembayaran...
//                     </p>
//                   )}
//                 </div>

//                 <div className="flex-1">
//                   <p className="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3">
//                     Shipping Info
//                   </p>
//                   {order.shipping_method === "free" ? (
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-12 h-12 text-gray-400 bg-gray-100 border border-gray-200 rounded-lg shrink-0">
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
//                             strokeWidth="2"
//                             d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//                           />
//                         </svg>
//                       </div>
//                       <div>
//                         <p className="text-xs font-bold text-gray-800 uppercase">
//                           Ambil Sendiri
//                         </p>
//                         <p className="text-[10px] text-gray-500 font-medium mt-0.5">
//                           In-store Payment / Pickup
//                         </p>
//                       </div>
//                     </div>
//                   ) : order.shipping_method === "biteship" &&
//                     order.courier_company ? (
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-12 h-12 overflow-hidden bg-white border border-gray-100 rounded-lg shrink-0">
//                         {getCourierLogo(order.courier_company) ? (
//                           <img
//                             src={getCourierLogo(order.courier_company)!}
//                             className="object-contain w-full h-full p-1"
//                           />
//                         ) : (
//                           <span className="text-xs font-black text-gray-300">
//                             {order.courier_company.toUpperCase()}
//                           </span>
//                         )}
//                       </div>
//                       <div>
//                         <p className="text-xs font-bold text-gray-800 uppercase">
//                           {order.courier_company} - {order.courier_type}
//                         </p>
//                         <p className="text-[10px] text-gray-500 mt-0.5">
//                           Resi:{" "}
//                           <span className="font-mono font-bold text-black">
//                             {order.tracking_number || "Waiting..."}
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="text-xs italic text-gray-400">
//                       Tentukan di halaman checkout
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* ITEMS LIST */}
//               <div
//                 onClick={() => handleOrderClick(order)}
//                 className={`px-6 py-2 ${canPay(order.status) && countdowns[order.id] !== "Expired" ? "cursor-pointer hover:bg-emerald-50/30 transition-colors" : ""}`}
//               >
//                 {canPay(order.status) && countdowns[order.id] !== "Expired" && (
//                   <div className="my-3 text-emerald-600 text-[10px] text-center uppercase tracking-widest animate-pulse font-bold bg-emerald-50 py-2 rounded-lg">
//                     Ketuk di area ini untuk melanjutkan pembayaran
//                   </div>
//                 )}

//                 {order.details.map((detail: any) => (
//                   <div
//                     key={detail.id}
//                     className="flex items-center gap-4 py-4 border-b border-gray-50 last:border-0"
//                   >
//                     <img
//                       src={detail.product.image_url}
//                       className="object-cover w-16 h-16 bg-gray-100 border border-gray-100 rounded-lg shadow-sm shrink-0"
//                     />
//                     <div className="flex-grow">
//                       <h4 className="text-sm font-bold text-gray-900 uppercase">
//                         {detail.product.name}
//                       </h4>
//                       {detail.color && (
//                         <div className="flex items-center gap-1.5 mt-1">
//                           <div 
//                             className="w-3 h-3 border border-gray-300 rounded-full shadow-sm" 
//                             style={{ backgroundColor: detail.color }}
//                             title="Varian Warna"
//                           ></div>
//                         </div>
//                       )}
//                       <p className="mt-1 text-xs text-gray-400">
//                         {detail.quantity} x {formatPrice(detail.price)}
//                       </p>

//                       {/* --- TOMBOL BERI ULASAN (REVIEW) DITAMBAHKAN DI SINI --- */}
//                       {order.status === "completed" && (
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation(); // Mencegah memicu row klik (apabila ada)
//                             setSelectedReviewItem({
//                               productId: detail.product.id,
//                               productName: detail.product.name,
//                               transactionId: order.order_id,
//                             });
//                             setIsReviewModalOpen(true);
//                           }}
//                           className="px-3 py-1.5 mt-2 text-[10px] font-bold tracking-widest text-gycora uppercase transition-colors bg-white border border-gycora hover:bg-emerald-50 rounded-lg w-max block"
//                         >
//                           Beri Ulasan
//                         </button>
//                       )}

//                     </div>
//                     <p className="text-sm font-bold text-gray-900">
//                       {formatPrice(detail.quantity * detail.price)}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* TOTALS & ACTIONS */}
//               <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
//                 <div className="flex flex-col pb-4 mb-4 space-y-1 border-b border-gray-200">
//                   <div className="flex justify-between text-xs text-gray-500">
//                     <span>Subtotal Produk</span>
//                     <span>{formatPrice(getSubtotal(order))}</span>
//                   </div>
//                   <div className="flex justify-between text-xs text-gray-500">
//                     <span>
//                       Ongkos Kirim (
//                       {order.shipping_cost > 0
//                         ? `${formatPrice(order.shipping_cost / getOrderQuantity(order))} x ${getOrderQuantity(order)}`
//                         : "Gratis"}
//                       )
//                     </span>
//                     <span>{formatPrice(order.shipping_cost)}</span>
//                   </div>

//                   {order.promo_discount > 0 && (
//                     <div className="flex justify-between text-xs font-medium text-emerald-600">
//                       <span>
//                         Promo (
//                         <span className="font-mono uppercase">
//                           {order.promo_code}
//                         </span>
//                         )
//                       </span>
//                       <span>- {formatPrice(order.promo_discount)}</span>
//                     </div>
//                   )}

//                   {order.points_used > 0 && (
//                     <div className="flex justify-between text-xs font-medium text-yellow-600">
//                       <span>Poin Ditukarkan ({order.points_used} Pts)</span>
//                       <span>- {formatPrice(order.points_used * 1000)}</span>
//                     </div>
//                   )}

//                   <div className="flex justify-between pt-2 mt-2 text-sm font-bold text-gray-900 border-t border-gray-200 border-dashed">
//                     <span className="uppercase tracking-widest text-[10px] mt-1">
//                       Total Akhir
//                     </span>
//                     <span className="text-lg text-gycora">
//                       {formatPrice(getGrandTotal(order))}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
//                   <div className="w-full text-left md:w-auto">
//                     {canPay(order.status) && order.payment && (
//                       <div className="flex items-center justify-center gap-2 md:justify-start">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-4 h-4 text-red-500 animate-pulse"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                           />
//                         </svg>
//                         <span className="font-mono text-sm font-bold text-red-500">
//                           {countdowns[order.id]}
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex flex-wrap justify-center w-full gap-3 md:justify-end md:w-auto">
//                     {canCancel(order.status) && (
//                       <button
//                         onClick={() => cancelOrder(order.id)}
//                         className="w-full px-6 py-2 text-xs font-bold tracking-widest text-red-600 uppercase transition border border-red-200 hover:bg-red-50 rounded-xl md:w-auto"
//                       >
//                         Batalkan
//                       </button>
//                     )}
//                     {canPay(order.status) && (
//                       <button
//                         onClick={() => redirectToPayment(order)}
//                         disabled={countdowns[order.id] === "Expired"}
//                         className="w-full px-6 py-2 text-xs font-bold tracking-widest text-white uppercase transition bg-gray-900 hover:bg-black disabled:bg-gray-300 disabled:cursor-not-allowed rounded-xl md:w-auto"
//                       >
//                         Bayar Sekarang
//                       </button>
//                     )}
//                     {[
//                       "processing",
//                       "completed",
//                       "cancelled",
//                       "refund_requested",
//                       "refund_approved",
//                       "refunded",
//                       "refund_rejected",
//                       "refund_manual_required",
//                       "shipping_failed",
//                       "returned",
//                     ].includes(order.status) &&
//                       order.shipping_method === "biteship" && (
//                         <button
//                           onClick={() =>
//                             navigate(`/tracking/${order.id}`, {
//                               state: { paymentMethod: order.payment_method },
//                             })
//                           }
//                           className="w-full px-6 py-2 text-xs font-bold tracking-widest text-white uppercase transition shadow-sm bg-gycora hover:bg-gycora-dark rounded-xl md:w-auto"
//                         >
//                           Lacak Paket
//                         </button>
//                       )}
//                     {canRequestRefund(order) && (
//                       <button
//                         onClick={() => requestRefund(order.id)}
//                         className="w-full px-6 py-2 text-xs font-bold tracking-widest text-gray-600 uppercase transition border border-gray-300 hover:bg-gray-100 rounded-xl md:w-auto"
//                       >
//                         Ajukan Retur
//                       </button>
//                     )}
//                     {order.status === "refund_requested" && (
//                       <div className="w-full px-4 py-2 text-xs font-bold text-center bg-amber-100 rounded-xl text-amber-700 md:w-auto">
//                         Menunggu Admin
//                       </div>
//                     )}
//                     {order.status === "refund_manual_required" && (
//                       <div className="w-full px-4 py-2 text-xs font-bold text-center text-pink-700 bg-pink-100 rounded-xl md:w-auto">
//                         Refund Manual
//                       </div>
//                     )}
//                     {order.status === "refund_approved" && (
//                       <button
//                         onClick={() => processRefundUser(order.id)}
//                         className="w-full px-6 py-2 text-xs font-bold tracking-widest text-white uppercase transition bg-blue-600 shadow-sm hover:bg-blue-700 rounded-xl md:w-auto"
//                       >
//                         Tarik Dana
//                       </button>
//                     )}
//                     {order.status === "refund_rejected" && (
//                       <div className="w-full text-xs italic font-bold text-center text-red-500 md:w-auto">
//                         Retur Ditolak
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* PAGINATION */}
//           {filteredTransactions.length > 0 && (
//             <div className="flex flex-col items-center justify-between gap-4 pt-6 mt-8 border-t border-gray-100 md:flex-row">
//               <p className="text-sm text-gray-400">
//                 Menampilkan{" "}
//                 <span className="font-bold text-black">{showingStart}</span>{" "}
//                 hingga{" "}
//                 <span className="font-bold text-black">{showingEnd}</span> dari{" "}
//                 <span className="font-bold text-black">
//                   {filteredTransactions.length}
//                 </span>{" "}
//                 pesanan
//               </p>

//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setCurrentPage((prev) => prev - 1)}
//                   disabled={currentPage === 1}
//                   className="px-4 py-2 text-sm font-medium transition border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
//                 >
//                   Mundur
//                 </button>
                
//                 {/*  */}
//                 <div className="flex gap-1">
//                   {visiblePages.map((page, index) => (
//                     <button
//                       key={index}
//                       onClick={() =>
//                         typeof page === "number" ? setCurrentPage(page) : null
//                       }
//                       disabled={page === "..."}
//                       className={`flex items-center justify-center w-10 h-10 text-sm font-medium transition rounded-xl ${currentPage === page ? "bg-gycora text-white border-gycora" : "hover:bg-gray-50 border-gray-200"} ${page === "..." ? "cursor-default border-transparent hover:bg-transparent" : "border"}`}
//                     >
//                       {page}
//                     </button>
//                   ))}
//                 </div>

//                 <button
//                   onClick={() => setCurrentPage((prev) => prev + 1)}
//                   disabled={currentPage === totalPages || totalPages === 0}
//                   className="px-4 py-2 text-sm font-medium transition border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
//                 >
//                   Lanjut
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* --- MOUNT KOMPONEN REVIEW MODAL --- */}
//       {selectedReviewItem && (
//         <ReviewModal
//           isOpen={isReviewModalOpen}
//           onClose={() => setIsReviewModalOpen(false)}
//           productId={selectedReviewItem.productId}
//           productName={selectedReviewItem.productName}
//           transactionId={selectedReviewItem.transactionId}
//           onSuccess={() => {
//             // (Opsional) Jika Anda ingin mengambil data pesanan ulang setelah review sukses:
//             // fetchOrders();
//           }}
//         />
//       )}
      
//     </div>
//   );
// }

// Mode Baru
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useMemo, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// // --- IMPORT KOMPONEN REVIEW MODAL ---
// import ReviewModal from "../../components/ReviewModal";

// export default function OrderPage() {
//   const navigate = useNavigate();

//   // --- STATE ---
//   const [userData, setUserData] = useState<any>(null);
//   const [transactions, setTransactions] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [countdowns, setCountdowns] = useState<Record<number, string>>({});

//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [activeUnifiedTab, setActiveUnifiedTab] = useState("all");

//   const timerIntervalRef = useRef<any>(null);

//   // --- STATE UNTUK REVIEW MODAL ---
//   const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
//   const [selectedReviewItem, setSelectedReviewItem] = useState<{
//     productId: number;
//     productName: string;
//     transactionId: string;
//   } | null>(null);

//   // --- TABS DEFINITION ---
//   const unifiedTabs = [
//     { label: "Semua Pesanan", value: "all" },
//     { label: "Belum Dibayar", value: "unpaid" },
//     { label: "Akan Dikirim", value: "to_ship" },
//     { label: "Sedang Dikirim", value: "shipping" },
//     { label: "Selesai", value: "completed" },
//     { label: "Dibatalkan", value: "cancelled" },
//     { label: "Kendala / Retur", value: "issues" },
//   ];

//   // --- HELPERS ---
//   const formatPrice = (v: number) =>
//     new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(v);

//   const formatDateTime = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("id-ID", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const formatStatus = (status: string) =>
//     status ? status.replace(/_/g, " ") : "";

//   const getSubtotal = (order: any) => order.total_amount;

//   const getGrandTotal = (order: any) => {
//     if (!order) return 0;
//     const total = parseFloat(order.total_amount || 0);
//     const shipping = parseFloat(order.shipping_cost || 0);
//     const promo = parseFloat(order.promo_discount || 0);
//     const pointsDiscount = (order.points_used || 0) * 1000;
//     return total + shipping - promo - pointsDiscount;
//   };

//   const getOrderQuantity = (order: any) =>
//     order.details.reduce((sum: number, item: any) => sum + item.quantity, 0);

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
//     const key = company.toLowerCase();
//     return map[key] ? "/courier_images/" + map[key] : null;
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

//   const statusClass = (status: string) => {
//     const map: Record<string, string> = {
//       pending: "bg-orange-100 text-orange-700",
//       processing: "bg-blue-100 text-blue-700",
//       completed: "bg-emerald-100 text-emerald-700",
//       cancelled: "bg-red-100 text-red-700",
//       refund_requested: "bg-purple-100 text-purple-700",
//       refund_approved: "bg-indigo-100 text-indigo-700",
//       refund_rejected: "bg-gray-200 text-gray-600 line-through",
//       refunded: "bg-teal-100 text-teal-700",
//       refund_manual_required: "bg-pink-100 text-pink-700",
//       returned: "bg-gray-800 text-white",
//       shipping_failed: "bg-red-800 text-white",
//     };
//     return map[status] || "bg-gray-100 text-gray-500";
//   };

//   const shippingStatusClass = (status: string) => {
//     if (!status) return "bg-gray-50 border-gray-200 text-gray-500";
//     const str = status.toLowerCase();
//     if (["delivered"].includes(str))
//       return "bg-emerald-50 border-emerald-200 text-emerald-700";
//     if (["cancelled", "rejected", "disposed", "courier_not_found"].includes(str))
//       return "bg-red-50 border-red-200 text-red-700";
//     if (["on_hold", "return_in_transit", "returned"].includes(str))
//       return "bg-amber-50 border-amber-200 text-amber-700";
//     if (["picking_up", "picked", "dropping_off", "allocated", "confirmed"].includes(str))
//       return "bg-blue-50 border-blue-200 text-blue-700";
//     return "bg-gray-50 border-gray-200 text-gray-600";
//   };

//   const canPay = (status: string) => ["pending"].includes(status);
//   const canCancel = (status: string) => ["pending", "processing"].includes(status);
//   const canRequestRefund = (order: any) => {
//     if (!["completed", "shipping_failed", "returned"].includes(order.status)) return false;
//     if (["shipping_failed", "returned"].includes(order.status)) return true;
//     if (order.shipping_method === "free") return true;

//     if (order.shipping_method === "biteship") {
//       const shipStatus = order.shipping_status ? order.shipping_status.toLowerCase() : "pending";
//       const unRefundableLogistics = ["picked", "dropping_off", "delivered", "return_in_transit"];
//       if (unRefundableLogistics.includes(shipStatus)) return false;
//       return true;
//     }
//     return false;
//   };

//   // --- LOGIC & COMPUTED EQUIVALENTS ---
//   const getUnifiedTabCount = (tabValue: string) => {
//     return transactions.filter((order) => {
//       if (tabValue === "all") return true;
//       const shipStatus = order.shipping_status ? order.shipping_status.toLowerCase() : "pending";

//       if (tabValue === "unpaid") return order.status === "pending";
//       if (tabValue === "to_ship")
//         return (
//           order.status === "processing" &&
//           ["pending", "placed", "confirmed", "allocated", "picking_up", "picked"].includes(shipStatus)
//         );
//       if (tabValue === "shipping") return shipStatus === "dropping_off";
//       if (tabValue === "completed") return order.status === "completed" || shipStatus === "delivered";
//       if (tabValue === "cancelled") return order.status === "cancelled";
//       if (tabValue === "issues")
//         return (
//           order.status.includes("refund") ||
//           ["returned", "shipping_failed"].includes(order.status) ||
//           ["on_hold", "return_in_transit", "rejected", "disposed", "courier_not_found"].includes(shipStatus)
//         );

//       return false;
//     }).length;
//   };

//   const filteredTransactions = useMemo(() => {
//     const query = searchQuery.toLowerCase();

//     return transactions.filter((order) => {
//       let matchSearch = true;
//       if (query) {
//         matchSearch =
//           order.order_id.toLowerCase().includes(query) ||
//           (order.total_amount && order.total_amount.toString().includes(query)) ||
//           (order.shipping_cost && order.shipping_cost.toString().includes(query)) ||
//           (order.payment_method && order.payment_method.toLowerCase().includes(query)) ||
//           (order.tracking_number && order.tracking_number.toLowerCase().includes(query)) ||
//           (order.delivery_type && order.delivery_type.toLowerCase().includes(query)) ||
//           (order.courier_company && order.courier_company.toLowerCase().includes(query));
//       }

//       let matchTab = false;
//       const tabValue = activeUnifiedTab;
//       const shipStatus = order.shipping_status ? order.shipping_status.toLowerCase() : "pending";

//       if (tabValue === "all") matchTab = true;
//       else if (tabValue === "unpaid") matchTab = order.status === "pending";
//       else if (tabValue === "to_ship")
//         matchTab =
//           order.status === "processing" &&
//           ["pending", "placed", "confirmed", "allocated", "picking_up", "picked"].includes(shipStatus);
//       else if (tabValue === "shipping") matchTab = shipStatus === "dropping_off";
//       else if (tabValue === "completed") matchTab = order.status === "completed" || shipStatus === "delivered";
//       else if (tabValue === "cancelled") matchTab = order.status === "cancelled";
//       else if (tabValue === "issues")
//         matchTab =
//           order.status.includes("refund") ||
//           ["returned", "shipping_failed"].includes(order.status) ||
//           ["on_hold", "return_in_transit", "rejected", "disposed", "courier_not_found"].includes(shipStatus);

//       return matchSearch && matchTab;
//     });
//   }, [transactions, searchQuery, activeUnifiedTab]);

//   const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
//   const paginatedTransactions = useMemo(() => {
//     const start = (currentPage - 1) * itemsPerPage;
//     return filteredTransactions.slice(start, start + itemsPerPage);
//   }, [filteredTransactions, currentPage, itemsPerPage]);

//   const showingStart = filteredTransactions.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
//   const showingEnd = Math.min(currentPage * itemsPerPage, filteredTransactions.length);

//   const visiblePages = useMemo(() => {
//     const maxVisible = 5; // Disesuaikan untuk mobile agar tidak kepanjangan
//     if (totalPages <= maxVisible) return Array.from({ length: totalPages }, (_, i) => i + 1);
//     if (currentPage <= 3) return [1, 2, 3, "...", totalPages];
//     if (currentPage >= totalPages - 2) return [1, "...", totalPages - 2, totalPages - 1, totalPages];
//     return [1, "...", currentPage, "...", totalPages];
//   }, [currentPage, totalPages]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery, itemsPerPage, activeUnifiedTab]);

//   const resetFilters = () => {
//     setActiveUnifiedTab("all");
//     setSearchQuery("");
//   };

//   // --- TIMERS & API ---
//   const calculateTimeLeft = (referenceDate: string) => {
//     if (!referenceDate) return "Expired";
//     const expiryTime = new Date(referenceDate).getTime() + 86400000; // +24 Jam
//     const now = new Date().getTime();
//     const diff = expiryTime - now;

//     if (diff <= 0) return "Expired";

//     const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((diff % (1000 * 60)) / 1000);
//     return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
//   };

//   const autoCancelSilent = async (id: number) => {
//     try {
//       const token = localStorage.getItem("user_token");
//       await fetch(`${BASE_URL}/api/transactions/${id}/cancel`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchOrders();
//     } catch (e) {
//       console.error("Auto cancel failed", e);
//     }
//   };

//   const startTimers = (currentOrders: any[]) => {
//     if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

//     timerIntervalRef.current = setInterval(() => {
//       setCountdowns((prev) => {
//         const newCountdowns = { ...prev };
//         currentOrders.forEach((order) => {
//           if (canPay(order.status)) {
//             const timeReference =
//               order.status === "pending" && order.payment?.created_at ? order.payment.created_at : order.created_at;

//             const timeLeft = calculateTimeLeft(timeReference);
//             newCountdowns[order.id] = timeLeft;

//             if (timeLeft === "Expired" && !order.isCancelling) {
//               order.isCancelling = true;
//               autoCancelSilent(order.id);
//             }
//           }
//         });
//         return newCountdowns;
//       });
//     }, 1000);
//   };

//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("user_token");
//       const res = await fetch(`${BASE_URL}/api/transactions`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       });
//       if (!res.ok) throw new Error("Gagal mengambil data");

//       const data = await res.json();
//       const validTransactions = data.filter((order: any) => order.status !== "awaiting_payment");

//       const mappedOrders = validTransactions.map((o: any) => ({
//         ...o,
//         isCancelling: false,
//       }));
//       setTransactions(mappedOrders);
//       startTimers(mappedOrders);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setTimeout(() => setLoading(false), 300);
//     }
//   };

//   useEffect(() => {
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) setUserData(JSON.parse(userStr));
//     fetchOrders();

//     return () => {
//       if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // --- ACTIONS ---
//   const redirectToPayment = (order: any) => {
//     if (order.status === "pending" && order.payment?.checkout_url) {
//       window.location.href = order.payment.checkout_url;
//     } else {
//       Swal.fire("Error", "URL Pembayaran tidak ditemukan.", "error");
//     }
//   };

//   const handleOrderClick = (order: any) => {
//     if (canPay(order.status) && countdowns[order.id] !== "Expired") {
//       redirectToPayment(order);
//     }
//   };

//   const cancelOrder = async (id: number) => {
//     const result = await Swal.fire({
//       title: "Batalkan Pesanan?",
//       text: "Tindakan ini tidak dapat dikembalikan!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#059669",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Ya, batalkan!",
//       cancelButtonText: "Kembali",
//     });

//     if (result.isConfirmed) {
//       try {
//         const token = localStorage.getItem("user_token");
//         const res = await fetch(`${BASE_URL}/api/transactions/${id}/cancel`, {
//           method: "POST",
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.ok) {
//           Swal.fire("Dibatalkan!", "Pesanan Anda telah dibatalkan.", "success");
//           fetchOrders();
//         } else {
//           const errorData = await res.json();
//           throw new Error(errorData.message);
//         }
//       } catch (err: any) {
//         Swal.fire("Error", `Gagal membatalkan: ${err.message || "Terjadi kesalahan"}`, "error");
//       }
//     }
//   };

//   const requestRefund = async (id: number) => {
//     const { value: formValues, isConfirmed } = await Swal.fire({
//       title: "Ajukan Pengembalian (Refund)",
//       html: `
//         <div class="space-y-4 text-left font-sans">
//           <div>
//             <label class="block mb-1 text-xs font-bold tracking-widest text-gray-700 uppercase">Alasan Pengembalian</label>
//             <textarea id="swal-refund-reason" rows="3" class="w-full p-3 text-sm border border-gray-300 outline-none resize-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora" placeholder="Jelaskan alasan pengembalian dana..."></textarea>
//           </div>
//           <div>
//             <label class="block mb-1 text-xs font-bold tracking-widest text-gray-700 uppercase">Upload Bukti (Foto/Video)</label>
//             <input type="file" id="swal-refund-file" accept="image/*,video/mp4,video/quicktime" class="w-full text-sm text-gray-500 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-gray-100 file:text-black hover:file:bg-gray-200" />
//             <p class="text-[10px] text-gray-400 mt-1">Maksimal 10MB. Format: JPG, PNG, MP4.</p>
//           </div>
//         </div>
//       `,
//       showCancelButton: true,
//       confirmButtonColor: "#059669",
//       confirmButtonText: "Kirim Pengajuan",
//       preConfirm: () => {
//         const reason = (document.getElementById("swal-refund-reason") as HTMLTextAreaElement).value;
//         const fileInput = document.getElementById("swal-refund-file") as HTMLInputElement;
//         const file = fileInput.files?.[0];

//         if (!reason) {
//           Swal.showValidationMessage("Harap isi alasan pengembalian.");
//           return false;
//         }
//         if (!file) {
//           Swal.showValidationMessage("Harap unggah file bukti.");
//           return false;
//         }
//         if (file.size > 10 * 1024 * 1024) {
//           Swal.showValidationMessage("Ukuran file tidak boleh lebih dari 10MB.");
//           return false;
//         }
//         return { reason, file };
//       },
//     });

//     if (isConfirmed && formValues) {
//       Swal.fire({
//         title: "Mengunggah...",
//         text: "Mohon tunggu, permintaan Anda sedang diproses.",
//         allowOutsideClick: false,
//         didOpen: () => {
//           Swal.showLoading();
//         },
//       });

//       try {
//         const token = localStorage.getItem("user_token");
//         const formData = new FormData();
//         formData.append("reason", formValues.reason);
//         formData.append("proof_file", formValues.file);

//         const res = await fetch(`${BASE_URL}/api/transactions/${id}/refund-request`, {
//           method: "POST",
//           headers: { Authorization: `Bearer ${token}` },
//           body: formData,
//         });

//         if (res.ok) {
//           fetchOrders();
//           Swal.fire("Berhasil", "Pengajuan pengembalian telah dikirim ke admin.", "success");
//         } else {
//           const errData = await res.json();
//           throw new Error(errData.message);
//         }
//       } catch (err: any) {
//         Swal.fire("Error", err.message || "Gagal mengajukan pengembalian", "error");
//       }
//     }
//   };

//   const processRefundUser = async (id: number) => {
//     try {
//       const token = localStorage.getItem("user_token");
//       const res = await fetch(`${BASE_URL}/api/transactions/${id}/refund-process`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.ok) {
//         const data = await res.json();
//         fetchOrders();
//         Swal.fire("Refunded", data.message, "success");
//       } else {
//         throw new Error("Gagal memproses refund");
//       }
//     } catch (err: any) {
//       Swal.fire("Error", err.message || "Refund process failed", "error");
//     }
//   };

//   return (
//     <div className="min-h-screen px-4 py-10 mx-auto font-sans md:px-6 md:py-20 max-w-7xl animate-fade-in">
//       <div className="flex items-center justify-between mb-8 md:mb-10">
//         <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 uppercase md:text-4xl">
//           Lacak Pesanan
//         </h1>
//       </div>

//       {/* TABS - Scrollable on Mobile */}
//       <div className="mb-6 border-b border-gray-200 md:mb-8">
//         <div className="flex gap-4 pb-2 overflow-x-auto md:gap-6 custom-scrollbar">
//           {unifiedTabs.map((tab) => (
//             <button
//               key={tab.value}
//               onClick={() => setActiveUnifiedTab(tab.value)}
//               className={`pb-3 md:pb-4 font-bold text-[10px] md:text-xs uppercase tracking-widest transition-colors whitespace-nowrap border-b-2 flex items-center gap-1.5 md:gap-2 ${
//                 activeUnifiedTab === tab.value
//                   ? "border-gycora text-gycora"
//                   : "border-transparent text-gray-400 hover:text-gray-700"
//               }`}
//             >
//               {tab.label}
//               {getUnifiedTabCount(tab.value) > 0 && (
//                 <span
//                   className={`px-1.5 py-0.5 rounded-full text-[8px] md:text-[9px] font-black ${
//                     activeUnifiedTab === tab.value ? "bg-gycora text-white" : "bg-gray-200 text-gray-600"
//                   }`}
//                 >
//                   {getUnifiedTabCount(tab.value)}
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* FILTER & SEARCH */}
//       <div className="flex flex-col gap-4 mb-6 md:mb-8 md:flex-row md:items-center md:justify-between">
//         <div className="relative w-full md:w-80">
//           <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
//             <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </span>
//           <input
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             type="text"
//             placeholder="Cari ID Pesanan, Kurir, Metode..."
//             className="w-full py-2.5 md:py-2 pl-9 md:pl-10 pr-4 text-xs md:text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora"
//           />
//         </div>

//         <div className="flex items-center justify-between w-full gap-2 md:w-auto md:justify-end">
//           <span className="text-[10px] md:text-xs font-bold tracking-wide text-gray-400 uppercase">
//             Tampilkan:
//           </span>
//           <select
//             value={itemsPerPage}
//             onChange={(e) => setItemsPerPage(Number(e.target.value))}
//             className="px-2 py-1.5 md:px-3 md:py-2 text-xs md:text-sm font-bold border border-gray-200 outline-none cursor-pointer bg-gray-50 rounded-lg md:rounded-xl focus:ring-2 focus:ring-gycora"
//           >
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={20}>20</option>
//             <option value={50}>50</option>
//           </select>
//         </div>
//       </div>

//       {/* KONTEN */}
//       {loading ? (
//         <div className="space-y-6 md:space-y-8 animate-pulse">
//           {[1, 2, 3].map((i) => (
//             <div key={i} className="overflow-hidden bg-white border border-gray-100 rounded-2xl">
//               <div className="h-16 border-b border-gray-100 md:h-20 bg-gray-50"></div>
//               <div className="flex items-center gap-4 px-4 py-4 md:px-6 md:py-6">
//                 <div className="w-12 h-12 bg-gray-200 rounded-lg md:w-16 md:h-16 shrink-0"></div>
//                 <div className="w-full h-10 bg-gray-200 rounded-lg md:h-12"></div>
//               </div>
//               <div className="h-14 md:h-16 bg-gray-50"></div>
//             </div>
//           ))}
//         </div>
//       ) : filteredTransactions.length === 0 ? (
//         <div className="p-8 text-center bg-white border border-gray-100 md:p-12 rounded-2xl animate-fade-in">
//           <p className="text-sm italic text-gray-400 md:text-base">
//             Tidak ada pesanan yang sesuai dengan filter.
//           </p>
//           <button
//             onClick={resetFilters}
//             className="inline-block mt-4 md:mt-6 text-[10px] md:text-xs font-bold tracking-widest underline uppercase text-gycora hover:text-gycora-dark"
//           >
//             Hapus Filter
//           </button>
//         </div>
//       ) : (
//         <div className="space-y-6 md:space-y-8 animate-fade-in">
//           {paginatedTransactions.map((order) => (
//             <div
//               key={order.id}
//               className="relative overflow-hidden transition-shadow duration-300 bg-white border border-gray-100 shadow-sm hover:shadow-md rounded-2xl"
//             >
//               {/* ORDER HEADER - Responsive Stack */}
//               <div className="flex flex-col gap-3 px-4 py-3 border-b border-gray-100 md:px-6 md:py-4 md:flex-row md:items-center md:justify-between bg-gray-50">
//                 <div className="flex justify-between w-full md:w-auto md:justify-start md:gap-8">
//                   <div>
//                     <p className="font-bold text-[9px] md:text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-0.5 md:mb-1">
//                       Order ID
//                     </p>
//                     <p className="font-mono text-xs font-bold text-gray-800 md:text-sm">
//                       {order.order_id}
//                     </p>
//                   </div>
//                   <div className="text-right md:text-left">
//                     <p className="font-bold text-[9px] md:text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-0.5 md:mb-1">
//                       Tanggal
//                     </p>
//                     <p className="text-[10px] md:text-xs font-bold text-gray-800">
//                       {formatDateTime(order.created_at)}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex flex-col gap-2 mt-2 md:mt-0 md:flex-row md:items-center md:justify-end">
//                   <div className="flex items-center justify-between gap-2 md:justify-end">
//                     <span className="text-[8px] md:text-[9px] font-bold text-gray-400 uppercase tracking-widest">
//                       Status:
//                     </span>
//                     <span className={`px-2 md:px-3 py-1 rounded-full font-bold text-[9px] md:text-[10px] uppercase tracking-tighter ${statusClass(order.status)}`}>
//                       {formatStatus(order.status)}
//                     </span>
//                   </div>

//                   {order.shipping_method === "biteship" ? (
//                     <div className="flex items-center justify-between gap-2 md:justify-end">
//                       <span className="text-[8px] md:text-[9px] font-bold text-gray-400 uppercase tracking-widest">
//                         Pengiriman:
//                       </span>
//                       <span className={`px-2 md:px-3 py-1 rounded-full font-bold text-[9px] md:text-[10px] uppercase tracking-tighter border ${shippingStatusClass(order.shipping_status)}`}>
//                         {formatStatus(order.shipping_status || "Pending")}
//                       </span>
//                     </div>
//                   ) : order.shipping_method === "free" ? (
//                     <div className="flex items-center justify-between gap-2 md:justify-end">
//                       <span className="text-[8px] md:text-[9px] font-bold text-gray-400 uppercase tracking-widest">
//                         Pengiriman:
//                       </span>
//                       <span className="px-2 md:px-3 py-1 rounded-full font-bold text-[9px] md:text-[10px] uppercase tracking-tighter border bg-gray-100 text-gray-600">
//                         In-Store Pickup
//                       </span>
//                     </div>
//                   ) : null}
//                 </div>
//               </div>

//               {/* LOYALTY REWARD BADGE */}
//               {userData?.is_membership && order.point > 0 && order.status === "completed" && (
//                 <div className="px-4 py-3 border-b md:px-6 md:py-4 border-gray-50">
//                   <div className="flex items-center justify-between p-3 border md:p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-white border-emerald-100">
//                     <div className="flex items-center gap-2 md:gap-3">
//                       <div className="flex items-center justify-center w-8 h-8 text-white rounded-full shadow-sm md:w-10 md:h-10 bg-emerald-500 shrink-0">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-6 md:h-6" viewBox="0 0 20 20" fill="currentColor">
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       </div>
//                       <div>
//                         <p className="text-[9px] md:text-[10px] font-bold text-emerald-800 uppercase tracking-widest">
//                           Loyalty Reward
//                         </p>
//                         <p className="text-[10px] md:text-xs mt-0.5 text-gray-500 hidden sm:block">
//                           Poin masuk ke akun Anda
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <span className="text-lg font-black md:text-2xl text-emerald-600">
//                         +{order.point}
//                       </span>
//                       <span className="ml-1 text-[10px] md:text-xs font-bold text-emerald-800">
//                         Pts
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* PAYMENT & SHIPPING INFO - Stack on Mobile */}
//               <div className="flex flex-col gap-4 px-4 py-4 bg-white border-b border-gray-100 md:px-6 md:flex-row md:gap-12">
                
//                 <div className="flex-1">
//                   <p className="font-bold text-[9px] md:text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-2 md:mb-3">
//                     Payment Info
//                   </p>
//                   {order.payment_method ? (
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-10 h-6 overflow-hidden border border-gray-100 rounded md:w-12 md:h-8 bg-gray-50 shrink-0">
//                         {getPaymentLogo(order.payment_method) ? (
//                           <img src={getPaymentLogo(order.payment_method)!} className="object-contain w-full h-full p-0.5" />
//                         ) : (
//                           <span className="font-black text-gray-300 text-[6px] md:text-[8px]">
//                             {order.payment_method.split(" ")[1] || "PAY"}
//                           </span>
//                         )}
//                       </div>
//                       <div>
//                         <p className="text-[10px] md:text-xs font-bold text-gray-800 uppercase leading-none">
//                           {order.payment_method.replace("_", " ")}
//                         </p>
//                         {order.status === "refunded" ? (
//                           <p className="text-[8px] md:text-[10px] text-teal-600 font-bold mt-1">REFUNDED</p>
//                         ) : order.status === "cancelled" ? (
//                           <p className="text-[8px] md:text-[10px] text-red-600 font-bold mt-1">EXPIRED / CANCELLED</p>
//                         ) : canPay(order.status) ? (
//                           <p className="text-[8px] md:text-[10px] text-orange-500 font-bold mt-1">UNPAID</p>
//                         ) : (
//                           <p className="text-[8px] md:text-[10px] text-emerald-600 font-bold mt-1">PAID</p>
//                         )}
//                       </div>
//                     </div>
//                   ) : (
//                     <p className="text-[10px] md:text-xs italic text-gray-400">Menunggu pilihan pembayaran...</p>
//                   )}
//                 </div>

//                 <div className="flex-1 pt-4 border-t border-gray-50 md:pt-0 md:border-0">
//                   <p className="font-bold text-[9px] md:text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-2 md:mb-3">
//                     Shipping Info
//                   </p>
//                   {order.shipping_method === "free" ? (
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-10 h-10 text-gray-400 bg-gray-100 border border-gray-200 rounded-lg md:w-12 md:h-12 shrink-0">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                         </svg>
//                       </div>
//                       <div>
//                         <p className="text-[10px] md:text-xs font-bold text-gray-800 uppercase leading-none">Ambil Sendiri</p>
//                         <p className="text-[9px] md:text-[10px] text-gray-500 font-medium mt-1">In-store Payment / Pickup</p>
//                       </div>
//                     </div>
//                   ) : order.shipping_method === "biteship" && order.courier_company ? (
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-10 h-10 overflow-hidden bg-white border border-gray-100 rounded-lg md:w-12 md:h-12 shrink-0">
//                         {getCourierLogo(order.courier_company) ? (
//                           <img src={getCourierLogo(order.courier_company)!} className="object-contain w-full h-full p-1" />
//                         ) : (
//                           <span className="text-[10px] md:text-xs font-black text-gray-300">{order.courier_company.toUpperCase()}</span>
//                         )}
//                       </div>
//                       <div>
//                         <p className="text-[10px] md:text-xs font-bold text-gray-800 uppercase leading-none">
//                           {order.courier_company} - {order.courier_type}
//                         </p>
//                         <p className="text-[9px] md:text-[10px] text-gray-500 mt-1">
//                           Resi: <span className="font-mono font-bold text-black">{order.tracking_number || "Waiting..."}</span>
//                         </p>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="text-[10px] md:text-xs italic text-gray-400">Tentukan di halaman checkout</div>
//                   )}
//                 </div>
//               </div>

//               {/* ITEMS LIST */}
//               <div
//                 onClick={() => handleOrderClick(order)}
//                 className={`px-4 md:px-6 py-2 ${canPay(order.status) && countdowns[order.id] !== "Expired" ? "cursor-pointer hover:bg-emerald-50/30 transition-colors" : ""}`}
//               >
//                 {canPay(order.status) && countdowns[order.id] !== "Expired" && (
//                   <div className="my-2 text-emerald-600 text-[9px] md:text-[10px] text-center uppercase tracking-widest animate-pulse font-bold bg-emerald-50 py-1.5 md:py-2 rounded-lg">
//                     Ketuk di area ini untuk bayar
//                   </div>
//                 )}

//                 {order.details.map((detail: any) => (
//                   <div key={detail.id} className="flex items-start gap-3 py-3 border-b md:items-center md:gap-4 md:py-4 border-gray-50 last:border-0">
//                     <img src={detail.product.image_url} className="object-cover w-12 h-12 bg-gray-100 border border-gray-100 rounded-lg shadow-sm md:w-16 md:h-16 shrink-0" />
//                     <div className="flex-grow">
//                       <h4 className="text-[10px] md:text-sm font-bold text-gray-900 uppercase leading-tight line-clamp-2 md:line-clamp-none">
//                         {detail.product.name}
//                       </h4>
//                       {detail.color && (
//                         <div className="flex items-center gap-1.5 mt-1.5">
//                           <div className="w-2.5 h-2.5 md:w-3 md:h-3 border border-gray-300 rounded-full shadow-sm" style={{ backgroundColor: detail.color }} title="Varian Warna"></div>
//                         </div>
//                       )}
//                       <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-1.5 gap-2">
//                         <p className="text-[9px] md:text-xs text-gray-400">
//                           {detail.quantity} x {formatPrice(detail.price)}
//                         </p>
                        
//                         {/* REVIEW BUTTON (Mobile responsif) */}
//                         {order.status === "completed" && (
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setSelectedReviewItem({
//                                 productId: detail.product.id,
//                                 productName: detail.product.name,
//                                 transactionId: order.order_id,
//                               });
//                               setIsReviewModalOpen(true);
//                             }}
//                             className="px-2.5 py-1 text-[8px] md:text-[10px] font-bold tracking-widest text-gycora uppercase transition-colors bg-white border border-gycora hover:bg-emerald-50 rounded-md w-max"
//                           >
//                             Beri Ulasan
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                     <p className="text-[11px] md:text-sm font-bold text-gray-900 mt-0.5 md:mt-0 whitespace-nowrap">
//                       {formatPrice(detail.quantity * detail.price)}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* TOTALS & ACTIONS */}
//               <div className="px-4 py-4 md:px-6 bg-gray-50/50">
//                 <div className="flex flex-col pb-3 mb-3 space-y-1 border-b md:pb-4 md:mb-4 border-gray-200/60">
//                   <div className="flex justify-between text-[10px] md:text-xs text-gray-500">
//                     <span>Subtotal Produk</span>
//                     <span>{formatPrice(getSubtotal(order))}</span>
//                   </div>
//                   <div className="flex justify-between text-[10px] md:text-xs text-gray-500">
//                     <span>Ongkos Kirim ({order.shipping_cost > 0 ? `${formatPrice(order.shipping_cost / getOrderQuantity(order))} x ${getOrderQuantity(order)}` : "Gratis"})</span>
//                     <span>{formatPrice(order.shipping_cost)}</span>
//                   </div>

//                   {order.promo_discount > 0 && (
//                     <div className="flex justify-between text-[10px] md:text-xs font-medium text-emerald-600">
//                       <span>Promo (<span className="font-mono uppercase">{order.promo_code}</span>)</span>
//                       <span>- {formatPrice(order.promo_discount)}</span>
//                     </div>
//                   )}

//                   {order.points_used > 0 && (
//                     <div className="flex justify-between text-[10px] md:text-xs font-medium text-yellow-600">
//                       <span>Poin Ditukarkan ({order.points_used} Pts)</span>
//                       <span>- {formatPrice(order.points_used * 1000)}</span>
//                     </div>
//                   )}

//                   <div className="flex justify-between pt-2 mt-2 text-sm font-bold text-gray-900 border-t border-gray-200 border-dashed md:text-base">
//                     <span className="uppercase tracking-widest text-[9px] md:text-[10px] mt-1">Total Akhir</span>
//                     <span className="text-base md:text-lg text-gycora">{formatPrice(getGrandTotal(order))}</span>
//                   </div>
//                 </div>

//                 {/* ACTION BUTTONS Container */}
//                 <div className="flex flex-col items-center justify-between gap-3 md:flex-row md:gap-4">
//                   <div className="w-full text-center md:text-left md:w-auto">
//                     {canPay(order.status) && order.payment && (
//                       <div className="flex items-center justify-center gap-1.5 md:justify-start">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                         <span className="font-mono text-xs font-bold text-red-500 md:text-sm">
//                           {countdowns[order.id]}
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex flex-wrap items-center justify-end w-full gap-2 md:gap-3 md:w-auto">
//                     {canCancel(order.status) && (
//                       <button
//                         onClick={() => cancelOrder(order.id)}
//                         className="flex-1 md:flex-none px-4 md:px-6 py-2 md:py-2.5 text-[10px] md:text-xs font-bold tracking-widest text-red-600 uppercase transition border border-red-200 hover:bg-red-50 rounded-lg md:rounded-xl"
//                       >
//                         Batalkan
//                       </button>
//                     )}
                    
//                     {canPay(order.status) && (
//                       <button
//                         onClick={() => redirectToPayment(order)}
//                         disabled={countdowns[order.id] === "Expired"}
//                         className="flex-1 md:flex-none px-4 md:px-6 py-2 md:py-2.5 text-[10px] md:text-xs font-bold tracking-widest text-white uppercase transition bg-gray-900 hover:bg-black disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg md:rounded-xl"
//                       >
//                         Bayar Sekarang
//                       </button>
//                     )}

//                     {["processing", "completed", "cancelled", "refund_requested", "refund_approved", "refunded", "refund_rejected", "refund_manual_required", "shipping_failed", "returned"].includes(order.status) &&
//                       order.shipping_method === "biteship" && (
//                         <button
//                           onClick={() => navigate(`/tracking/${order.id}`, { state: { paymentMethod: order.payment_method } })}
//                           className="flex-1 md:flex-none px-4 md:px-6 py-2 md:py-2.5 text-[10px] md:text-xs font-bold tracking-widest text-white uppercase transition shadow-sm bg-gycora hover:bg-gycora-dark rounded-lg md:rounded-xl"
//                         >
//                           Lacak Paket
//                         </button>
//                       )}

//                     {canRequestRefund(order) && (
//                       <button
//                         onClick={() => requestRefund(order.id)}
//                         className="flex-1 md:flex-none px-4 md:px-6 py-2 md:py-2.5 text-[10px] md:text-xs font-bold tracking-widest text-gray-600 uppercase transition border border-gray-300 hover:bg-gray-100 rounded-lg md:rounded-xl"
//                       >
//                         Ajukan Retur
//                       </button>
//                     )}

//                     {order.status === "refund_requested" && (
//                       <div className="flex-1 md:flex-none px-3 md:px-4 py-1.5 md:py-2 text-[9px] md:text-xs font-bold text-center bg-amber-100 rounded-lg md:rounded-xl text-amber-700">
//                         Menunggu Admin
//                       </div>
//                     )}
//                     {order.status === "refund_manual_required" && (
//                       <div className="flex-1 md:flex-none px-3 md:px-4 py-1.5 md:py-2 text-[9px] md:text-xs font-bold text-center text-pink-700 bg-pink-100 rounded-lg md:rounded-xl">
//                         Refund Manual
//                       </div>
//                     )}
//                     {order.status === "refund_approved" && (
//                       <button
//                         onClick={() => processRefundUser(order.id)}
//                         className="flex-1 md:flex-none px-4 md:px-6 py-2 md:py-2.5 text-[10px] md:text-xs font-bold tracking-widest text-white uppercase transition bg-blue-600 shadow-sm hover:bg-blue-700 rounded-lg md:rounded-xl"
//                       >
//                         Tarik Dana
//                       </button>
//                     )}
//                     {order.status === "refund_rejected" && (
//                       <div className="flex-1 md:flex-none text-[10px] md:text-xs italic font-bold text-center text-red-500">
//                         Retur Ditolak
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* PAGINATION */}
//           {filteredTransactions.length > 0 && (
//             <div className="flex flex-col items-center justify-between gap-4 pt-4 mt-6 border-t border-gray-100 md:pt-6 md:mt-8 md:flex-row">
//               <p className="text-xs text-gray-400 md:text-sm">
//                 Menampilkan <span className="font-bold text-black">{showingStart}</span> hingga <span className="font-bold text-black">{showingEnd}</span> dari <span className="font-bold text-black">{filteredTransactions.length}</span>
//               </p>

//               <div className="flex items-center gap-1.5 md:gap-2">
//                 <button
//                   onClick={() => setCurrentPage((prev) => prev - 1)}
//                   disabled={currentPage === 1}
//                   className="px-2.5 py-1.5 md:px-4 md:py-2 text-[10px] md:text-sm font-medium transition border border-gray-200 rounded-lg md:rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
//                 >
//                   Mundur
//                 </button>
                
//                 <div className="flex gap-0.5 md:gap-1">
//                   {visiblePages.map((page, index) => (
//                     <button
//                       key={index}
//                       onClick={() => typeof page === "number" ? setCurrentPage(page) : null}
//                       disabled={page === "..."}
//                       className={`flex items-center justify-center w-7 h-7 md:w-10 md:h-10 text-[10px] md:text-sm font-medium transition rounded-lg md:rounded-xl ${currentPage === page ? "bg-gycora text-white border-gycora" : "hover:bg-gray-50 border-gray-200"} ${page === "..." ? "cursor-default border-transparent hover:bg-transparent" : "border"}`}
//                     >
//                       {page}
//                     </button>
//                   ))}
//                 </div>

//                 <button
//                   onClick={() => setCurrentPage((prev) => prev + 1)}
//                   disabled={currentPage === totalPages || totalPages === 0}
//                   className="px-2.5 py-1.5 md:px-4 md:py-2 text-[10px] md:text-sm font-medium transition border border-gray-200 rounded-lg md:rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
//                 >
//                   Lanjut
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* --- MOUNT KOMPONEN REVIEW MODAL --- */}
//       {selectedReviewItem && (
//         <ReviewModal
//           isOpen={isReviewModalOpen}
//           onClose={() => setIsReviewModalOpen(false)}
//           productId={selectedReviewItem.productId}
//           productName={selectedReviewItem.productName}
//           transactionId={selectedReviewItem.transactionId}
//           onSuccess={() => {
//             // (Opsional) Jika Anda ingin mengambil data pesanan ulang setelah review sukses:
//             fetchOrders();
//           }}
//         />
//       )}
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

import ReviewModal from "../../components/ReviewModal";

export default function OrderPage() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [countdowns, setCountdowns] = useState<Record<number, string>>({});

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeUnifiedTab, setActiveUnifiedTab] = useState("all");

  const timerIntervalRef = useRef<any>(null);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReviewItem, setSelectedReviewItem] = useState<{
    productId: number;
    productName: string;
    transactionId: string;
  } | null>(null);

  const unifiedTabs = [
    { label: "Semua Pesanan", value: "all" },
    { label: "Belum Dibayar", value: "unpaid" },
    { label: "Akan Dikirim", value: "to_ship" },
    { label: "Sedang Dikirim", value: "shipping" },
    { label: "Selesai", value: "completed" },
    { label: "Dibatalkan", value: "cancelled" },
    { label: "Kendala / Retur", value: "issues" },
  ];

  // --- HELPERS ---
  const formatPrice = (v: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(v);

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatStatus = (status: string) =>
    status ? status.replace(/_/g, " ") : "";

  const getSubtotal = (order: any) => order.total_amount;

  const getGrandTotal = (order: any) => {
    if (!order) return 0;
    const total = parseFloat(order.total_amount || 0);
    const shipping = parseFloat(order.shipping_cost || 0);
    const promo = parseFloat(order.promo_discount || 0);
    const pointsDiscount = (order.points_used || 0) * 1000;
    return total + shipping - promo - pointsDiscount;
  };

  const getOrderQuantity = (order: any) =>
    order.details.reduce((sum: number, item: any) => sum + item.quantity, 0);

  const getCourierLogo = (company: string) => {
    if (!company) return null;
    const map: Record<string, string> = {
      jne: "jne.png",
      sicepat: "sicepat.png",
      jnt: "jnt.png",
      anteraja: "anteraja.png",
      gojek: "gojek.png",
      grab: "grab.png",
      paxel: "paxel.png",
      ninja: "ninja.png",
    };
    const key = company.toLowerCase();
    return map[key] ? "/courier_images/" + map[key] : null;
  };

  const getPaymentLogo = (methodString: string) => {
    if (!methodString) return null;
    const channel = methodString.split(" ")[1]?.toLowerCase();
    const map: Record<string, string> = {
      bca: "bca.png",
      bni: "bni.png",
      bri: "bri.png",
      mandiri: "mandiri.png",
      bsi: "bsi.png",
      permata: "permata.png",
      ovo: "ovo.png",
      dana: "dana.png",
      linkaja: "linkaja.png",
      shopeepay: "shopeepay.png",
      alfamart: "alfamart.png",
      indomaret: "indomaret.png",
      qris: "qris.png",
    };
    return map[channel] ? "/payment_images/" + map[channel] : null;
  };

  const statusClass = (status: string) => {
    const map: Record<string, string> = {
      pending: "bg-orange-100 text-orange-700",
      processing: "bg-blue-100 text-blue-700",
      completed: "bg-emerald-100 text-emerald-700",
      cancelled: "bg-red-100 text-red-700",
      refund_requested: "bg-purple-100 text-purple-700",
      refund_approved: "bg-indigo-100 text-indigo-700",
      refund_rejected: "bg-gray-200 text-gray-600 line-through",
      refunded: "bg-teal-100 text-teal-700",
      refund_manual_required: "bg-pink-100 text-pink-700",
      returned: "bg-gray-800 text-white",
      shipping_failed: "bg-red-800 text-white",
    };
    return map[status] || "bg-gray-100 text-gray-500";
  };

  const shippingStatusClass = (status: string) => {
    if (!status) return "bg-gray-50 border-gray-200 text-gray-500";
    const str = status.toLowerCase();
    if (["delivered"].includes(str))
      return "bg-emerald-50 border-emerald-200 text-emerald-700";
    if (["cancelled", "rejected", "disposed", "courier_not_found"].includes(str))
      return "bg-red-50 border-red-200 text-red-700";
    if (["on_hold", "return_in_transit", "returned"].includes(str))
      return "bg-amber-50 border-amber-200 text-amber-700";
    if (["picking_up", "picked", "dropping_off", "allocated", "confirmed"].includes(str))
      return "bg-blue-50 border-blue-200 text-blue-700";
    return "bg-gray-50 border-gray-200 text-gray-600";
  };

  const canPay = (status: string) => ["pending"].includes(status);
  const canCancel = (status: string) => ["pending", "processing"].includes(status);
  const canRequestRefund = (order: any) => {
    if (!["completed", "shipping_failed", "returned"].includes(order.status)) return false;
    if (["shipping_failed", "returned"].includes(order.status)) return true;
    if (order.shipping_method === "free") return true;
    if (order.shipping_method === "biteship") {
      const shipStatus = order.shipping_status ? order.shipping_status.toLowerCase() : "pending";
      const unRefundableLogistics = ["picked", "dropping_off", "delivered", "return_in_transit"];
      if (unRefundableLogistics.includes(shipStatus)) return false;
      return true;
    }
    return false;
  };

  const getUnifiedTabCount = (tabValue: string) => {
    return transactions.filter((order) => {
      if (tabValue === "all") return true;
      const shipStatus = order.shipping_status ? order.shipping_status.toLowerCase() : "pending";
      if (tabValue === "unpaid") return order.status === "pending";
      if (tabValue === "to_ship")
        return (
          order.status === "processing" &&
          ["pending", "placed", "confirmed", "allocated", "picking_up", "picked"].includes(shipStatus)
        );
      if (tabValue === "shipping") return shipStatus === "dropping_off";
      if (tabValue === "completed") return order.status === "completed" || shipStatus === "delivered";
      if (tabValue === "cancelled") return order.status === "cancelled";
      if (tabValue === "issues")
        return (
          order.status.includes("refund") ||
          ["returned", "shipping_failed"].includes(order.status) ||
          ["on_hold", "return_in_transit", "rejected", "disposed", "courier_not_found"].includes(shipStatus)
        );
      return false;
    }).length;
  };

  const filteredTransactions = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return transactions.filter((order) => {
      let matchSearch = true;
      if (query) {
        matchSearch =
          order.order_id.toLowerCase().includes(query) ||
          (order.total_amount && order.total_amount.toString().includes(query)) ||
          (order.shipping_cost && order.shipping_cost.toString().includes(query)) ||
          (order.payment_method && order.payment_method.toLowerCase().includes(query)) ||
          (order.tracking_number && order.tracking_number.toLowerCase().includes(query)) ||
          (order.delivery_type && order.delivery_type.toLowerCase().includes(query)) ||
          (order.courier_company && order.courier_company.toLowerCase().includes(query));
      }
      let matchTab = false;
      const tabValue = activeUnifiedTab;
      const shipStatus = order.shipping_status ? order.shipping_status.toLowerCase() : "pending";
      if (tabValue === "all") matchTab = true;
      else if (tabValue === "unpaid") matchTab = order.status === "pending";
      else if (tabValue === "to_ship")
        matchTab =
          order.status === "processing" &&
          ["pending", "placed", "confirmed", "allocated", "picking_up", "picked"].includes(shipStatus);
      else if (tabValue === "shipping") matchTab = shipStatus === "dropping_off";
      else if (tabValue === "completed") matchTab = order.status === "completed" || shipStatus === "delivered";
      else if (tabValue === "cancelled") matchTab = order.status === "cancelled";
      else if (tabValue === "issues")
        matchTab =
          order.status.includes("refund") ||
          ["returned", "shipping_failed"].includes(order.status) ||
          ["on_hold", "return_in_transit", "rejected", "disposed", "courier_not_found"].includes(shipStatus);
      return matchSearch && matchTab;
    });
  }, [transactions, searchQuery, activeUnifiedTab]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(start, start + itemsPerPage);
  }, [filteredTransactions, currentPage, itemsPerPage]);

  const showingStart = filteredTransactions.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const showingEnd = Math.min(currentPage * itemsPerPage, filteredTransactions.length);

  const visiblePages = useMemo(() => {
    const isMobile = window.innerWidth < 768;
    const maxVisible = isMobile ? 3 : 7;
    if (totalPages <= maxVisible) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (isMobile) {
      if (currentPage <= 2) return [1, 2, "...", totalPages];
      if (currentPage >= totalPages - 1) return [1, "...", totalPages - 1, totalPages];
      return [1, "...", currentPage, "...", totalPages];
    } else {
      if (currentPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
      if (currentPage >= totalPages - 3) return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
    }
  }, [currentPage, totalPages]);

  useEffect(() => { setCurrentPage(1); }, [searchQuery, itemsPerPage, activeUnifiedTab]);

  const resetFilters = () => {
    setActiveUnifiedTab("all");
    setSearchQuery("");
  };

  const calculateTimeLeft = (referenceDate: string) => {
    if (!referenceDate) return "Expired";
    const expiryTime = new Date(referenceDate).getTime() + 86400000;
    const now = new Date().getTime();
    const diff = expiryTime - now;
    if (diff <= 0) return "Expired";
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const autoCancelSilent = async (id: number) => {
    try {
      const token = localStorage.getItem("user_token");
      await fetch(`${BASE_URL}/api/transactions/${id}/cancel`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrders();
    } catch (e) {
      console.error("Auto cancel failed", e);
    }
  };

  const startTimers = (currentOrders: any[]) => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      setCountdowns((prev) => {
        const newCountdowns = { ...prev };
        currentOrders.forEach((order) => {
          if (canPay(order.status)) {
            const timeReference =
              order.status === "pending" && order.payment?.created_at ? order.payment.created_at : order.created_at;
            const timeLeft = calculateTimeLeft(timeReference);
            newCountdowns[order.id] = timeLeft;
            if (timeLeft === "Expired" && !order.isCancelling) {
              order.isCancelling = true;
              autoCancelSilent(order.id);
            }
          }
        });
        return newCountdowns;
      });
    }, 1000);
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("user_token");
      const res = await fetch(`${BASE_URL}/api/transactions`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Gagal mengambil data");
      const data = await res.json();
      const validTransactions = data.filter((order: any) => order.status !== "awaiting_payment");
      const mappedOrders = validTransactions.map((o: any) => ({ ...o, isCancelling: false }));
      setTransactions(mappedOrders);
      startTimers(mappedOrders);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setLoading(false), 300);
    }
  };

  useEffect(() => {
    const userStr = localStorage.getItem("user_data");
    if (userStr) setUserData(JSON.parse(userStr));
    fetchOrders();
    return () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const redirectToPayment = (order: any) => {
    if (order.status === "pending" && order.payment?.checkout_url) {
      window.location.href = order.payment.checkout_url;
    } else {
      Swal.fire("Error", "URL Pembayaran tidak ditemukan.", "error");
    }
  };

  const handleOrderClick = (order: any) => {
    if (canPay(order.status) && countdowns[order.id] !== "Expired") {
      redirectToPayment(order);
    }
  };

  const cancelOrder = async (id: number) => {
    const result = await Swal.fire({
      title: "Batalkan Pesanan?",
      text: "Tindakan ini tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, batalkan!",
      cancelButtonText: "Kembali",
    });
    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("user_token");
        const res = await fetch(`${BASE_URL}/api/transactions/${id}/cancel`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          Swal.fire("Dibatalkan!", "Pesanan Anda telah dibatalkan.", "success");
          fetchOrders();
        } else {
          const errorData = await res.json();
          throw new Error(errorData.message);
        }
      } catch (err: any) {
        Swal.fire("Error", `Gagal membatalkan: ${err.message || "Terjadi kesalahan"}`, "error");
      }
    }
  };

  const requestRefund = async (id: number) => {
    const { value: formValues, isConfirmed } = await Swal.fire({
      title: "Ajukan Pengembalian (Refund)",
      html: `
        <div class="text-left space-y-4 font-sans">
          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1">Alasan Pengembalian</label>
            <textarea id="swal-refund-reason" rows="3" class="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-black resize-none" placeholder="Jelaskan alasan pengembalian dana..."></textarea>
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1">Upload Bukti (Foto/Video)</label>
            <input type="file" id="swal-refund-file" accept="image/*,video/mp4,video/quicktime" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-gray-100 file:text-black hover:file:bg-gray-200 cursor-pointer" />
            <p class="text-[10px] text-gray-400 mt-1">Maksimal 10MB. Format: JPG, PNG, MP4.</p>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonColor: "#000",
      confirmButtonText: "Kirim Pengajuan",
      preConfirm: () => {
        const reason = (document.getElementById("swal-refund-reason") as HTMLTextAreaElement).value;
        const fileInput = document.getElementById("swal-refund-file") as HTMLInputElement;
        const file = fileInput.files?.[0];
        if (!reason) { Swal.showValidationMessage("Harap isi alasan pengembalian."); return false; }
        if (!file) { Swal.showValidationMessage("Harap unggah file bukti."); return false; }
        if (file.size > 10 * 1024 * 1024) { Swal.showValidationMessage("Ukuran file tidak boleh lebih dari 10MB."); return false; }
        return { reason, file };
      },
    });

    if (isConfirmed && formValues) {
      Swal.fire({ title: "Mengunggah...", text: "Mohon tunggu, permintaan Anda sedang diproses.", allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });
      try {
        const token = localStorage.getItem("user_token");
        const formData = new FormData();
        formData.append("reason", formValues.reason);
        formData.append("proof_file", formValues.file);
        const res = await fetch(`${BASE_URL}/api/transactions/${id}/refund-request`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        if (res.ok) {
          fetchOrders();
          Swal.fire("Berhasil", "Pengajuan pengembalian telah dikirim ke admin.", "success");
        } else {
          const errData = await res.json();
          throw new Error(errData.message);
        }
      } catch (err: any) {
        Swal.fire("Error", err.message || "Gagal mengajukan pengembalian", "error");
      }
    }
  };

  const processRefundUser = async (id: number) => {
    try {
      const token = localStorage.getItem("user_token");
      const res = await fetch(`${BASE_URL}/api/transactions/${id}/refund-process`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        fetchOrders();
        Swal.fire("Refunded", data.message, "success");
      } else {
        throw new Error("Gagal memproses refund");
      }
    } catch (err: any) {
      Swal.fire("Error", err.message || "Refund process failed", "error");
    }
  };

  return (
    // [FIX 1] Tambah overflow-x-hidden + w-full di wrapper utama agar tidak ada scroll horizontal
    <div className="min-h-screen w-full px-4 py-6 mx-auto font-sans md:px-6 md:py-20 max-w-7xl animate-fade-in bg-[#FAFAFA] overflow-x-hidden">

      <div className="flex items-center justify-between w-full mb-6 md:mb-10">
        <h1 className="font-serif text-3xl tracking-tighter text-gray-900 uppercase md:text-4xl">
          Track My Orders
        </h1>
      </div>

      {/* [FIX 2] Tab wrapper: overflow-hidden di luar, scroll hanya pada inner div */}
      <div className="w-full mb-6 overflow-hidden border-b border-gray-200 md:mb-8">
        <div
          className="flex gap-4 pb-2 overflow-x-auto md:gap-6 scroll-smooth"
          style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
        >
          {unifiedTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveUnifiedTab(tab.value)}
              className={`pb-3 md:pb-4 font-bold text-[10px] md:text-xs uppercase tracking-widest transition-colors whitespace-nowrap border-b-2 flex items-center gap-1.5 md:gap-2 shrink-0 ${
                activeUnifiedTab === tab.value
                  ? "border-black text-black"
                  : "border-transparent text-gray-400 hover:text-gray-700"
              }`}
            >
              {tab.label}
              {getUnifiedTabCount(tab.value) > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-[8px] md:text-[9px] font-black ${activeUnifiedTab === tab.value ? "bg-black text-white" : "bg-gray-200 text-gray-600"}`}>
                  {getUnifiedTabCount(tab.value)}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* [FIX 3] Filter row: pastikan tidak meluap di mobile */}
      <div className="flex flex-col w-full gap-3 mb-6 md:flex-row md:flex-nowrap md:mb-8 md:items-center md:justify-between">
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search Order ID, Courier..."
            className="w-full py-2.5 md:py-2 pl-9 md:pl-10 pr-4 text-xs md:text-sm transition border border-gray-200 outline-none bg-white rounded-xl focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] md:text-xs font-bold tracking-wide text-gray-400 uppercase whitespace-nowrap">Show:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="px-2 py-1.5 md:px-3 md:py-2 text-xs md:text-sm font-bold border border-gray-200 outline-none cursor-pointer bg-white rounded-lg md:rounded-xl focus:ring-2 focus:ring-black"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* KONTEN */}
      {loading ? (
        <div className="w-full space-y-6 md:space-y-8 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-full overflow-hidden bg-white border border-gray-100 rounded-2xl">
              <div className="flex flex-col justify-between gap-4 px-6 py-4 border-b border-gray-100 md:flex-row bg-gray-50">
                <div className="flex flex-col gap-4 md:flex-row md:gap-8">
                  <div>
                    <div className="w-16 h-3 mb-2 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                  <div>
                    <div className="w-12 h-3 mb-2 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="w-24 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-28 animate-pulse"></div>
                </div>
              </div>
              <div className="px-6 py-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse shrink-0"></div>
                  <div className="flex-grow min-w-0 space-y-2">
                    <div className="w-48 h-4 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="w-24 h-5 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                <div className="space-y-2">
                  <div className="w-40 h-3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-32 h-3 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="w-32 h-10 bg-gray-300 rounded-xl animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredTransactions.length === 0 ? (
        <div className="w-full p-8 text-center bg-white border border-gray-100 md:p-12 rounded-2xl animate-fade-in">
          <p className="text-sm italic text-gray-400 md:text-base">Tidak ada pesanan yang sesuai dengan filter.</p>
          <button onClick={resetFilters} className="inline-block mt-4 md:mt-6 text-[10px] md:text-xs font-bold tracking-widest text-black underline uppercase">
            Hapus Filter
          </button>
        </div>
      ) : (
        <div className="w-full space-y-6 md:space-y-8 animate-fade-in">
          {paginatedTransactions.map((order) => (
            // [FIX 4] Card: overflow-hidden + min-w-0 wajib ada agar konten tidak meluap
            <div key={order.id} className="relative w-full min-w-0 overflow-hidden transition-shadow duration-300 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md">

              {/* ============================================================
                  VERSI MOBILE (< 768px)
              ============================================================ */}
              <div className="block w-full md:hidden">

                {/* [FIX 5] Header card mobile: min-w-0 + overflow-hidden pada parent flex */}
                <div className="flex items-start justify-between gap-2 p-4 bg-white border-b border-gray-100">
                  {/* [FIX 6] Kolom kiri: min-w-0 + overflow-hidden agar Order ID tidak meluap */}
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                    {/* [FIX 7] font-mono dengan truncate + max-w penuh agar tidak overflow */}
                    <p className="w-full mb-2 font-mono text-xs font-bold text-gray-900 truncate">{order.order_id}</p>
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[9px] uppercase tracking-tighter w-max inline-block ${statusClass(order.status)}`}>
                      {formatStatus(order.status)}
                    </span>
                  </div>
                  {/* [FIX 8] Kolom kanan: shrink-0 dengan max-w agar tidak dorong kolom kiri */}
                  <div className="text-right shrink-0 max-w-[40%]">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Tanggal</p>
                    <p className="text-[10px] font-bold text-gray-900 leading-snug">{formatDateTime(order.created_at)}</p>
                  </div>
                </div>

                {/* Items Mobile */}
                <div
                  onClick={() => handleOrderClick(order)}
                  className={`px-4 py-2 bg-white border-b border-gray-100 ${canPay(order.status) && countdowns[order.id] !== "Expired" ? "cursor-pointer" : ""}`}
                >
                  {canPay(order.status) && countdowns[order.id] !== "Expired" && (
                    <div className="my-2 text-blue-600 text-[10px] text-center uppercase tracking-widest animate-pulse font-bold bg-blue-50 py-1.5 rounded-md">
                      Ketuk di sini untuk bayar
                    </div>
                  )}
                  {order.details.map((detail: any) => (
                    <div key={detail.id} className="flex items-center w-full gap-3 py-3 border-b border-gray-50 last:border-0">
                      <img
                        src={detail.product.image_url || detail.product.image}
                        className="object-cover border border-gray-200 rounded-lg w-14 h-14 bg-gray-50 shrink-0"
                      />
                      {/* [FIX 9] flex-grow + min-w-0 agar nama produk truncate dengan benar */}
                      <div className="flex flex-col justify-center flex-grow min-w-0">
                        <h4 className="text-[11px] font-bold text-gray-900 uppercase leading-tight truncate">{detail.product.name}</h4>
                        <p className="text-[10px] text-gray-500 mt-1">{detail.quantity} x {formatPrice(detail.price)}</p>
                        {order.status === "completed" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedReviewItem({ productId: detail.product.id, productName: detail.product.name, transactionId: order.order_id });
                              setIsReviewModalOpen(true);
                            }}
                            className="px-2.5 py-1 mt-2 text-[9px] font-bold tracking-widest text-black uppercase transition-colors bg-white border border-black rounded w-max"
                          >
                            Beri Ulasan
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Payment & Info Mobile */}
                <div className="w-full p-4 bg-white border-b border-gray-100">
                  {/* [FIX 10] Flex row payment+shipping: min-w-0 pada setiap child */}
                  <div className="flex gap-3 mb-4">
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <p className="font-bold text-[10px] text-gray-400 uppercase tracking-widest mb-1">Payment</p>
                      <p className="text-xs italic text-gray-500 truncate">
                        {order.payment_method ? order.payment_method.replace("_", " ").toUpperCase() : "Pending"}
                      </p>
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <p className="font-bold text-[10px] text-gray-400 uppercase tracking-widest mb-1">Shipping</p>
                      <p className="text-xs italic text-gray-500 truncate">
                        {order.shipping_method === "free"
                          ? "Ambil Sendiri"
                          : order.courier_company
                          ? order.courier_company.toUpperCase()
                          : "Checkout"}
                      </p>
                    </div>
                  </div>

                  {/* Loyalty Reward Mobile */}
                  {userData?.is_membership && order.point > 0 && order.status === "completed" && (
                    <div className="flex items-center justify-between p-3 mb-4 border border-yellow-100 rounded-lg bg-gradient-to-r from-yellow-50 to-white">
                      <div className="flex items-center min-w-0 gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <p className="text-[9px] font-bold text-yellow-800 uppercase tracking-widest">Points Earned</p>
                      </div>
                      <span className="text-sm font-black text-yellow-600 shrink-0">+{order.point} Pts</span>
                    </div>
                  )}

                  <div className="pt-3 mt-1 border-t border-gray-100 border-dashed">
                    <div className="flex items-center justify-between gap-2">
                      <span className="uppercase tracking-widest text-[10px] font-bold text-gray-500 shrink-0">Final Amount</span>
                      <span className="text-sm font-black text-gray-900">{formatPrice(getGrandTotal(order))}</span>
                    </div>
                  </div>
                </div>

                {/* [FIX 11] Actions Mobile: overflow-hidden pada grid wrapper */}
                <div className="grid w-full grid-cols-2 gap-2 p-4 overflow-hidden bg-gray-50">
                  {canPay(order.status) && order.payment && (
                    <div className="col-span-2 flex items-center justify-center gap-1.5 mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-red-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-mono text-xs font-bold text-red-500">{countdowns[order.id]}</span>
                    </div>
                  )}
                  {canCancel(order.status) && (
                    <button onClick={() => cancelOrder(order.id)} className="w-full py-2.5 border border-red-200 rounded-xl font-bold text-red-600 text-[10px] uppercase tracking-widest transition hover:bg-red-50">
                      Cancel
                    </button>
                  )}
                  {canPay(order.status) && (
                    <button
                      onClick={() => redirectToPayment(order)}
                      disabled={countdowns[order.id] === "Expired"}
                      className={`w-full py-2.5 bg-black rounded-xl font-bold text-white text-[10px] uppercase tracking-widest transition hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed ${!canCancel(order.status) ? "col-span-2" : ""}`}
                    >
                      Pay Now
                    </button>
                  )}
                  {["processing", "completed", "cancelled", "refund_requested", "refund_approved", "refunded", "refund_rejected", "refund_manual_required", "shipping_failed", "returned"].includes(order.status) &&
                    order.shipping_method === "biteship" && (
                      <button
                        onClick={() => navigate(`/tracking/${order.id}`, { state: { paymentMethod: order.payment_method } })}
                        className="col-span-2 w-full py-2.5 bg-black rounded-xl font-bold text-white text-[10px] uppercase tracking-widest transition hover:bg-gray-800"
                      >
                        Track Order
                      </button>
                    )}
                  {canRequestRefund(order) && (
                    <button onClick={() => requestRefund(order.id)} className="col-span-2 w-full py-2.5 border border-gray-300 rounded-xl font-bold text-gray-600 text-[10px] uppercase tracking-widest transition hover:bg-gray-100">
                      Request to Refund
                    </button>
                  )}
                  {order.status === "refund_requested" && (
                    <div className="col-span-2 w-full py-2.5 bg-amber-100 rounded-xl text-amber-700 text-[10px] font-bold text-center">Waiting Admin</div>
                  )}
                  {order.status === "refund_manual_required" && (
                    <div className="col-span-2 w-full py-2.5 bg-pink-100 rounded-xl text-pink-700 text-[10px] font-bold text-center">Manual Refund</div>
                  )}
                  {order.status === "refund_approved" && (
                    <button onClick={() => processRefundUser(order.id)} className="col-span-2 w-full py-2.5 bg-blue-600 rounded-xl font-bold text-white text-[10px] uppercase tracking-widest transition hover:bg-blue-700">
                      Refund Now
                    </button>
                  )}
                  {order.status === "refund_rejected" && (
                    <div className="col-span-2 text-[10px] font-bold italic text-red-500 text-center py-1">Refund Rejected</div>
                  )}
                </div>
              </div>

              {/* ============================================================
                  VERSI DESKTOP (>= 768px)
              ============================================================ */}
              <div className="hidden md:block">
                <div className="flex flex-col items-start justify-between gap-4 px-6 py-4 border-b border-gray-100 md:flex-row md:items-center bg-gray-50">
                  <div className="flex flex-col min-w-0 gap-4 md:flex-row md:items-center md:gap-8">
                    <div className="min-w-0">
                      <p className="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-1">Order ID</p>
                      <p className="font-mono font-bold text-gray-800 text-sm truncate max-w-[200px]">{order.order_id}</p>
                    </div>
                    <div>
                      <p className="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-1">Date</p>
                      <p className="text-xs font-bold text-gray-800 whitespace-nowrap">{formatDateTime(order.created_at)}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end w-full gap-2 md:w-auto shrink-0">
                    <div className="flex items-center justify-between w-full gap-3 md:justify-end md:w-auto">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Transaction:</span>
                      <span className={`px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-tighter ${statusClass(order.status)}`}>{formatStatus(order.status)}</span>
                    </div>
                    {order.shipping_method === "biteship" ? (
                      <div className="flex items-center justify-between w-full gap-3 md:justify-end md:w-auto">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Shipping:</span>
                        <span className={`px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-tighter border ${shippingStatusClass(order.shipping_status)}`}>{formatStatus(order.shipping_status || "Pending")}</span>
                      </div>
                    ) : order.shipping_method === "free" ? (
                      <div className="flex items-center justify-between w-full gap-3 md:justify-end md:w-auto">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Shipping:</span>
                        <span className="px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-tighter border bg-gray-100 text-gray-600">In-Store Pickup</span>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="relative flex flex-col gap-6 px-6 py-4 bg-white border-b border-gray-100 md:flex-row md:gap-12">
                  {userData?.is_membership && order.point > 0 && order.status === "completed" && (
                    <div className="static md:absolute md:top-4 md:right-6 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-200 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm w-max mb-4 md:mb-0 z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <div>
                        <p className="text-[8px] font-bold text-yellow-800 uppercase tracking-widest leading-none">Points Earned</p>
                        <p className="text-sm font-black leading-tight text-yellow-600">+{order.point} Pts</p>
                      </div>
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3">Payment Info</p>
                    {order.payment_method ? (
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-12 h-8 overflow-hidden border border-gray-100 rounded bg-gray-50 shrink-0">
                          {getPaymentLogo(order.payment_method) ? (
                            <img src={getPaymentLogo(order.payment_method)!} className="object-contain w-full h-full p-1" />
                          ) : (
                            <span className="font-black text-gray-300 text-[8px] truncate px-1">{order.payment_method.split(" ")[1] || "PAY"}</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-800 uppercase truncate">{order.payment_method.replace("_", " ")}</p>
                          {order.status === "refunded" ? (
                            <p className="text-[10px] text-teal-600 font-bold mt-0.5">REFUNDED</p>
                          ) : order.status === "cancelled" ? (
                            <p className="text-[10px] text-red-600 font-bold mt-0.5">EXPIRED / CANCELLED</p>
                          ) : canPay(order.status) ? (
                            <p className="text-[10px] text-orange-500 font-bold mt-0.5">UNPAID</p>
                          ) : (
                            <p className="text-[10px] text-green-600 font-bold mt-0.5">PAID</p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs italic text-gray-400">Waiting for payment selection...</p>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3">Shipping Info</p>
                    {order.shipping_method === "free" ? (
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-12 h-12 text-gray-400 bg-gray-100 border border-gray-200 rounded-lg shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-800 uppercase truncate">No Courier</p>
                          <p className="text-[10px] text-gray-500 font-medium mt-0.5 truncate">In-store Payment / Pickup</p>
                        </div>
                      </div>
                    ) : order.shipping_method === "biteship" && order.courier_company ? (
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-12 h-12 overflow-hidden bg-white border border-gray-100 rounded-lg shrink-0">
                          {getCourierLogo(order.courier_company) ? (
                            <img src={getCourierLogo(order.courier_company)!} className="object-contain w-full h-full p-1" />
                          ) : (
                            <span className="px-1 text-xs font-black text-gray-300 truncate">{order.courier_company.toUpperCase()}</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-800 uppercase truncate">{order.courier_company} - {order.courier_type}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5 truncate">Resi: <span className="font-mono font-bold text-black">{order.tracking_number || "Waiting..."}</span></p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs italic text-gray-400">Setup shipping at checkout</div>
                    )}
                  </div>
                </div>

                <div
                  onClick={() => handleOrderClick(order)}
                  className={`px-6 py-2 ${canPay(order.status) && countdowns[order.id] !== "Expired" ? "cursor-pointer hover:bg-blue-50/30 transition-colors" : ""}`}
                >
                  {canPay(order.status) && countdowns[order.id] !== "Expired" && (
                    <div className="my-3 text-blue-600 text-[10px] text-center uppercase tracking-widest animate-pulse font-bold bg-blue-50 py-2 rounded-lg">
                      Tap anywhere here to complete payment
                    </div>
                  )}
                  {order.details.map((detail: any) => (
                    <div key={detail.id} className="flex items-center gap-4 py-4 border-b border-gray-50 last:border-0">
                      <img src={detail.product.image_url || detail.product.image} className="object-cover w-16 h-16 bg-gray-100 border border-gray-100 rounded-lg shadow-sm shrink-0" />
                      <div className="flex-grow min-w-0">
                        <h4 className="text-sm font-bold text-gray-900 uppercase truncate">{detail.product.name}</h4>
                        <div className="flex items-center justify-between gap-2">
                          <p className="mt-1 text-xs text-gray-400 shrink-0">{detail.quantity} x {formatPrice(detail.price)}</p>
                          {order.status === "completed" && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedReviewItem({ productId: detail.product.id, productName: detail.product.name, transactionId: order.order_id });
                                setIsReviewModalOpen(true);
                              }}
                              className="px-2 py-1 mt-1 text-[10px] font-bold tracking-widest text-black uppercase transition-colors bg-white border border-black hover:bg-gray-50 rounded w-max shrink-0"
                            >
                              Review
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-sm font-bold text-gray-900 shrink-0 whitespace-nowrap">{formatPrice(detail.quantity * detail.price)}</p>
                    </div>
                  ))}
                </div>

                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                  <div className="flex flex-col pb-4 mb-4 space-y-1 border-b border-gray-200">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Subtotal for Products</span><span>{formatPrice(getSubtotal(order))}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span className="pr-2 truncate">Shipping Subtotal ({order.shipping_cost > 0 ? `${formatPrice(order.shipping_cost / getOrderQuantity(order))} x ${getOrderQuantity(order)}` : "Free"})</span>
                      <span className="shrink-0">{formatPrice(order.shipping_cost)}</span>
                    </div>
                    {order.promo_discount > 0 && (
                      <div className="flex justify-between text-xs font-medium text-emerald-600">
                        <span className="pr-2 truncate">Promo (<span className="font-mono uppercase">{order.promo_code}</span>)</span>
                        <span className="shrink-0">- {formatPrice(order.promo_discount)}</span>
                      </div>
                    )}
                    {order.points_used > 0 && (
                      <div className="flex justify-between text-xs font-medium text-yellow-600">
                        <span className="pr-2 truncate">Points Used ({order.points_used} Pts)</span>
                        <span className="shrink-0">- {formatPrice(order.points_used * 1000)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-2 mt-2 text-sm font-bold text-gray-900 border-t border-gray-200 border-dashed">
                      <span className="uppercase tracking-widest text-[10px] mt-1">Final Amount</span>
                      <span className="text-lg text-gray-900">{formatPrice(getGrandTotal(order))}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="w-full text-left md:w-auto">
                      {canPay(order.status) && order.payment && (
                        <div className="flex items-center justify-center gap-2 md:justify-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-500 animate-pulse shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-mono text-sm font-bold text-red-500">{countdowns[order.id]}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap justify-center w-full gap-3 md:justify-end md:w-auto">
                      {canCancel(order.status) && (
                        <button onClick={() => cancelOrder(order.id)} className="w-full px-6 py-2 text-xs font-bold tracking-widest text-red-600 uppercase transition border border-red-200 hover:bg-red-50 rounded-xl md:w-auto">Cancel</button>
                      )}
                      {canPay(order.status) && (
                        <button onClick={() => redirectToPayment(order)} disabled={countdowns[order.id] === "Expired"} className="w-full px-6 py-2 text-xs font-bold tracking-widest text-white uppercase transition bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-xl md:w-auto">Pay Now</button>
                      )}
                      {["processing", "completed", "cancelled", "refund_requested", "refund_approved", "refunded", "refund_rejected", "refund_manual_required", "shipping_failed", "returned"].includes(order.status) &&
                        order.shipping_method === "biteship" && (
                          <button onClick={() => navigate(`/tracking/${order.id}`, { state: { paymentMethod: order.payment_method } })} className="w-full px-6 py-2 text-xs font-bold tracking-widest text-white uppercase transition bg-black shadow-sm hover:bg-gray-800 rounded-xl md:w-auto">Track Order</button>
                        )}
                      {canRequestRefund(order) && (
                        <button onClick={() => requestRefund(order.id)} className="w-full px-6 py-2 text-xs font-bold tracking-widest text-gray-600 uppercase transition border border-gray-300 hover:bg-gray-100 rounded-xl md:w-auto">Request to Refund</button>
                      )}
                      {order.status === "refund_requested" && (
                        <div className="w-full px-4 py-2 text-xs font-bold text-center bg-amber-100 rounded-xl text-amber-700 md:w-auto">Waiting Admin</div>
                      )}
                      {order.status === "refund_manual_required" && (
                        <div className="w-full px-4 py-2 text-xs font-bold text-center text-pink-700 bg-pink-100 rounded-xl md:w-auto">Manual Refund</div>
                      )}
                      {order.status === "refund_approved" && (
                        <button onClick={() => processRefundUser(order.id)} className="w-full px-6 py-2 text-xs font-bold tracking-widest text-white uppercase transition bg-blue-600 shadow-sm hover:bg-blue-700 rounded-xl md:w-auto">Refund Now</button>
                      )}
                      {order.status === "refund_rejected" && (
                        <div className="w-full text-xs italic font-bold text-center text-red-500 md:w-auto">Refund Rejected</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}

          {/* PAGINATION */}
          <div className="flex flex-col items-center justify-between w-full gap-4 pt-6 mt-8 border-t border-gray-100 md:flex-row">
            <p className="text-[10px] md:text-sm text-gray-400">
              Showing <span className="font-bold text-black">{showingStart}</span> to <span className="font-bold text-black">{showingEnd}</span> of <span className="font-bold text-black">{filteredTransactions.length}</span> orders
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 md:px-4 md:py-2 border rounded-xl hover:bg-gray-50 disabled:opacity-30 transition disabled:cursor-not-allowed text-[10px] md:text-sm font-medium"
              >
                Previous
              </button>
              <div className="flex gap-1">
                {visiblePages.map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === "number" ? setCurrentPage(page) : null}
                    disabled={page === "..."}
                    className={`w-7 h-7 md:w-10 md:h-10 rounded-lg md:rounded-xl font-medium transition flex items-center justify-center text-[10px] md:text-sm ${
                      currentPage === page ? "bg-black text-white border-black" : "hover:bg-gray-50 border-gray-200"
                    } ${page === "..." ? "cursor-default border-transparent hover:bg-transparent" : "border"}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-3 py-1.5 md:px-4 md:py-2 border rounded-xl hover:bg-gray-50 disabled:opacity-30 transition disabled:cursor-not-allowed text-[10px] md:text-sm font-medium"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedReviewItem && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          productId={selectedReviewItem.productId}
          productName={selectedReviewItem.productName}
          transactionId={selectedReviewItem.transactionId}
          onSuccess={() => {}}
        />
      )}
    </div>
  );
}