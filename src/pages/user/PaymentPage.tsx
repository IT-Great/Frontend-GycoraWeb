/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
// // import { useState, useEffect, useMemo } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import Swal from "sweetalert2";
// // import { useCart } from "../../context/CartContext";

// // export default function PaymentPage() {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const { cartItems } = useCart();

// //   // Ambil ID yang dipilih dari CartPage
// //   const selectedItemIds: number[] = location.state?.selectedIds || [];

// //   const [isPageLoading, setIsPageLoading] = useState(true);

// //   // --- STATE ALAMAT ---
// //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
// //   const [addresses, setAddresses] = useState<any[]>([]);
// //   const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

// //   // --- STATE PENGIRIMAN ---
// //   const [shippingMethod, setShippingMethod] = useState("free");
// //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
// //   const [selectedRate, setSelectedRate] = useState<any>(null);
// //   const [isLoadingRates, setIsLoadingRates] = useState(false);
// //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
// //   const [rawShippingRates, setRawShippingRates] = useState<any[]>([]);

// //   const [deliveryDate, setDeliveryDate] = useState("");
// //   const [deliveryTime, setDeliveryTime] = useState("");

// //   // --- STATE DISKON ---
// //   const [promoInput, setPromoInput] = useState("");
// //   const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
// //   const [promoDiscountAmount, setPromoDiscountAmount] = useState(0);
// //   const [promoMessage, setPromoMessage] = useState("");
// //   const [isVerifyingPromo, setIsVerifyingPromo] = useState(false);

// //   const [isProcessing, setIsProcessing] = useState(false);

// //   // --- PERHITUNGAN KERANJANG (HANYA ITEM TERPILIH) ---
// //   const checkoutItems = useMemo(() => {
// //     return cartItems.filter((item) => selectedItemIds.includes(item.id));
// //   }, [cartItems, selectedItemIds]);

// //   const checkoutCount = useMemo(() => {
// //     return checkoutItems.reduce((sum, item) => sum + item.quantity, 0);
// //   }, [checkoutItems]);

// //   const checkoutTotalAmount = useMemo(() => {
// //     return checkoutItems.reduce((sum, item) => sum + Number(item.gross_amount), 0);
// //   }, [checkoutItems]);

// //   const grandTotal = useMemo(() => {
// //     let total = checkoutTotalAmount;
// //     if (shippingMethod === "biteship" && selectedRate) {
// //       total += parseFloat(selectedRate.price) * checkoutCount;
// //     }
// //     return total - promoDiscountAmount;
// //   }, [checkoutTotalAmount, shippingMethod, selectedRate, checkoutCount, promoDiscountAmount]);

// //   // --- INITIALIZATION ---
// //   useEffect(() => {
// //     // PROTEKSI: Jika tidak ada item yang dipilih, tendang ke Cart
// //     if (selectedItemIds.length === 0) {
// //       Swal.fire({
// //         toast: true, position: 'top-end', icon: 'warning',
// //         title: 'Pilih item terlebih dahulu', showConfirmButton: false, timer: 2000
// //       });
// //       navigate('/cart');
// //       return;
// //     }

// //     const loadData = async () => {
// //       const token = localStorage.getItem("user_token");
// //       if (!token) {
// //         navigate("/login");
// //         return;
// //       }

// //       try {
// //         const res = await fetch("https://backend-gycora-web.vercel.app/api/api/addresses", {
// //           headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
// //         });
// //         if (res.ok) {
// //           const data = await res.json();
// //           const addrArray = data.data ? data.data : data;
// //           setAddresses(addrArray || []);
// //           if (addrArray && addrArray.length > 0) {
// //             // eslint-disable-next-line @typescript-eslint/no-explicit-any
// //             const defaultAddr = addrArray.find((a: any) => a.is_default);
// //             setSelectedAddressId(defaultAddr ? defaultAddr.id : addrArray[0].id);
// //           }
// //         }
// //       } catch (err) {
// //         console.error("Gagal mengambil alamat:", err);
// //       } finally {
// //         const now = new Date();
// //         now.setHours(now.getHours() + 1);
// //         setDeliveryDate(now.toISOString().split("T")[0]);
// //         setDeliveryTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
// //         setIsPageLoading(false);
// //       }
// //     };
// //     loadData();
// //   }, [navigate, selectedItemIds.length]);

// //   // --- FETCH SHIPPING RATES ---
// //   useEffect(() => {
// //     if (selectedAddressId && selectedItemIds.length > 0 && shippingMethod === 'biteship') {
// //       const getRates = async () => {
// //         setIsLoadingRates(true);
// //         setSelectedRate(null);
// //         setRawShippingRates([]);
// //         try {
// //           const token = localStorage.getItem("user_token");
// //           const res = await fetch("https://backend-gycora-web.vercel.app/api/api/shipping/rates", {
// //             method: "POST",
// //             headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
// //             body: JSON.stringify({ address_id: selectedAddressId, cart_ids: selectedItemIds })
// //           });
// //           if (res.ok) {
// //             const data = await res.json();
// //             if (data.pricing) setRawShippingRates(data.pricing);
// //           }
// //         } catch (err) {
// //           console.error("Gagal menghitung ongkir:", err);
// //           Swal.fire({ toast: true, position: "top-end", icon: "error", title: "Gagal menghitung ongkir.", showConfirmButton: false, timer: 3000 });
// //         } finally {
// //           setIsLoadingRates(false);
// //         }
// //       };
// //       getRates();
// //     }
// //   }, [selectedAddressId, selectedItemIds, shippingMethod]);

// //   // Logika Filter Ongkir (Biteship)
// //   const processedShippingRates = useMemo(() => {
// //     if (!rawShippingRates || rawShippingRates.length === 0) return [];
// //     return rawShippingRates.map((rate) => {
// //       return { ...rate, is_disabled: false, disable_reason: "" };
// //     }).sort((a, b) => (a.is_disabled === b.is_disabled ? 0 : a.is_disabled ? 1 : -1));
// //   }, [rawShippingRates]);

// //   // --- HANDLERS ---
// //   const applyPromo = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!promoInput) return;
// //     setIsVerifyingPromo(true);
// //     try {
// //       const token = localStorage.getItem("user_token");
// //       const res = await fetch("https://backend-gycora-web.vercel.app/api/api/promo/verify", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
// //         body: JSON.stringify({ promo_code: promoInput })
// //       });
// //       const data = await res.json();

// //       if (!res.ok) throw new Error(data.message || "Promo tidak valid");
// //       if (checkoutTotalAmount < 50000) throw new Error("Minimum belanja Rp 50.000");

// //       setAppliedPromoCode(promoInput.toUpperCase());
// //       setPromoDiscountAmount(Math.min(data.discount_value, checkoutTotalAmount));
// //       setPromoMessage("✅ " + data.message);
// //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
// //     } catch (err: any) {
// //       setAppliedPromoCode(null);
// //       setPromoDiscountAmount(0);
// //       setPromoMessage("❌ " + err.message);
// //     } finally {
// //       setIsVerifyingPromo(false);
// //     }
// //   };

// //   const removePromo = () => {
// //     setPromoInput(""); setAppliedPromoCode(null); setPromoDiscountAmount(0); setPromoMessage("");
// //   };

// //   const handlePayment = async () => {
// //     setIsProcessing(true);
// //     try {
// //       const token = localStorage.getItem("user_token");
// //       const payload = {
// //         address_id: selectedAddressId,
// //         shipping_method: shippingMethod,
// //         use_points: 0,
// //         cart_ids: selectedItemIds,
// //         courier_company: shippingMethod === "biteship" ? selectedRate?.company : null,
// //         courier_type: shippingMethod === "biteship" ? selectedRate?.type : null,
// //         shipping_cost: shippingMethod === "biteship" ? selectedRate?.price : null,
// //         delivery_type: shippingMethod === "biteship" ? "now" : null,
// //         delivery_date: shippingMethod === "biteship" ? deliveryDate : null,
// //         delivery_time: shippingMethod === "biteship" ? deliveryTime : null,
// //         promo_code: appliedPromoCode,
// //       };

// //       const res = await fetch("https://backend-gycora-web.vercel.app/api/api/checkout", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
// //         body: JSON.stringify(payload)
// //       });
// //       const data = await res.json();

// //       if (res.ok && data.checkout_url) {
// //         window.location.href = data.checkout_url;
// //       } else {
// //         throw new Error(data.message || "Gagal membuat tagihan");
// //       }
// //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
// //     } catch (err: any) {
// //       Swal.fire("Error", err.message, "error");
// //     } finally {
// //       setIsProcessing(false);
// //     }
// //   };

// //   const formatPrice = (angka: number) => {
// //     return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
// //   };

// //   const isButtonDisabled = isProcessing || checkoutItems.length === 0 || !selectedAddressId ||
// //     (shippingMethod === "biteship" && !selectedRate);

// //   if (isPageLoading) {
// //     return (
// //       <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
// //         <div className="flex gap-2 mb-4">
// //           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-1"></div>
// //           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-2"></div>
// //           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-3"></div>
// //         </div>
// //         <p className="font-serif text-sm italic tracking-widest text-gray-500 animate-pulse">
// //           Mempersiapkan checkout Anda...
// //         </p>
// //       </div>
// //     );
// //   }

// //   if (checkoutItems.length === 0) {
// //     return (
// //       <div className="min-h-screen px-6 py-12 mx-auto font-sans md:py-24 max-w-[1440px] animate-fade-in">
// //         <div className="py-20 text-center">
// //           <h2 className="mb-4 text-3xl font-extrabold text-gray-900">Tidak ada item dipilih</h2>
// //           <button onClick={() => navigate('/cart')} className="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase rounded-full bg-gycora hover:bg-gycora-dark">
// //             Kembali ke Keranjang
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen px-6 py-12 mx-auto font-sans md:py-24 max-w-[1440px] animate-fade-in">
// //       <h1 className="mb-12 text-3xl font-extrabold tracking-tighter text-gray-900 uppercase md:text-4xl">
// //         Checkout
// //       </h1>

// //       <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">

// //         {/* BAGIAN KIRI: FORM PENGIRIMAN */}
// //         <div className="flex-grow space-y-12">

// //           {/* 1. ADDRESS */}
// //           <section>
// //             <div className="flex items-center gap-4 mb-6">
// //               <span className="flex items-center justify-center w-6 h-6 text-[10px] font-bold text-white rounded-full bg-gycora">1</span>
// //               <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">Alamat Pengiriman</h2>
// //             </div>

// //             {addresses.length === 0 ? (
// //               <div className="py-10 text-center border border-gray-300 border-dashed bg-gray-50 rounded-2xl">
// //                 <p className="mb-2 text-sm italic text-gray-500">Belum ada alamat tersimpan.</p>
// //                 <button onClick={() => navigate('/profile')} className="text-xs font-bold underline text-gycora hover:text-gycora-dark">
// //                   + Tambah Alamat di Profil
// //                 </button>
// //               </div>
// //             ) : (
// //               <div className="space-y-4">
// //                 {addresses.map((addr) => (
// //                   <label key={addr.id} className={`relative flex items-start p-6 border rounded-2xl cursor-pointer transition-all ${selectedAddressId === addr.id ? 'border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
// //                     <input type="radio" name="address" value={addr.id} checked={selectedAddressId === addr.id} onChange={() => setSelectedAddressId(addr.id)} className="w-5 h-5 mt-1 border-gray-300 rounded-full text-gycora focus:ring-gycora" />
// //                     <div className="flex-grow ml-4">
// //                       <div className="flex justify-between">
// //                         <p className="text-sm font-bold text-gray-900 uppercase">{addr.receiver.full_name}</p>
// //                         {addr.is_default && <span className="px-2 py-0.5 text-[9px] font-bold text-emerald-800 uppercase bg-emerald-100 rounded">Utama</span>}
// //                       </div>
// //                       <p className="mt-2 text-sm leading-relaxed text-gray-600">
// //                         {addr.details.address_location} - {addr.details.type} <br />
// //                         {addr.details.city}, {addr.details.province} <br />
// //                         {addr.details.region} - {addr.details.postal_code}
// //                       </p>
// //                     </div>
// //                   </label>
// //                 ))}
// //               </div>
// //             )}
// //           </section>

// //           {/* 2. SHIPPING METHOD */}
// //           <section className={!selectedAddressId ? "opacity-50 pointer-events-none" : ""}>
// //             <div className="flex items-center gap-4 mb-6">
// //               <span className="flex items-center justify-center w-6 h-6 text-[10px] font-bold text-white rounded-full bg-gycora">2</span>
// //               <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">Metode Pengiriman</h2>
// //             </div>

// //             <div className="space-y-4">
// //               {/* Ambil di Toko */}
// //               <label className={`relative flex items-center p-6 border rounded-2xl cursor-pointer transition-all ${shippingMethod === 'free' ? 'border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
// //                 <input type="radio" value="free" checked={shippingMethod === 'free'} onChange={() => setShippingMethod('free')} className="w-5 h-5 border-gray-300 rounded-full text-gycora focus:ring-gycora" />
// //                 <div className="flex items-center justify-between flex-grow ml-4">
// //                   <div>
// //                     <p className="text-sm font-bold tracking-wide text-gray-900 uppercase">Ambil Sendiri</p>
// //                     <p className="mt-1 text-xs font-bold text-emerald-600">In-Store Pickup (Surabaya)</p>
// //                   </div>
// //                   <p className="font-black text-gycora">Gratis</p>
// //                 </div>
// //               </label>

// //               {/* Biteship / Ekspedisi */}
// //               <label className={`relative flex items-center p-6 border rounded-2xl cursor-pointer transition-all ${shippingMethod === 'biteship' ? 'border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
// //                 <input type="radio" value="biteship" checked={shippingMethod === 'biteship'} onChange={() => setShippingMethod('biteship')} className="w-5 h-5 border-gray-300 rounded-full text-gycora focus:ring-gycora" />
// //                 <div className="flex items-center justify-between flex-grow ml-4">
// //                   <div>
// //                     <p className="text-sm font-bold tracking-wide text-gray-900 uppercase">Reguler / Express</p>
// //                     <p className="mt-1 text-xs text-gray-500">Dikirim via kurir pilihan Anda</p>
// //                   </div>
// //                 </div>
// //               </label>

// //               {/* Sub-menu Biteship */}
// //               {shippingMethod === 'biteship' && (
// //                 <div className="p-6 mt-4 space-y-8 bg-white border border-gray-200 rounded-3xl animate-fade-in">

// //                   <h3 className="pt-2 text-sm font-bold tracking-widest text-gray-900 uppercase border-t border-gray-100">Pilih Ekspedisi</h3>

// //                   {isLoadingRates ? (
// //                     <p className="py-4 text-sm text-center text-gray-500 animate-pulse">Menghitung ongkos kirim...</p>
// //                   ) : processedShippingRates.length === 0 ? (
// //                     <p className="py-4 text-xs italic text-center text-red-500">Tidak ada kurir tersedia untuk alamat ini.</p>
// //                   ) : (
// //                     <div className="space-y-3">
// //                       {processedShippingRates.map((rate, idx) => (
// //                         <label key={idx} className={`relative flex flex-col p-4 border rounded-xl transition-all ${rate.is_disabled ? 'opacity-50 bg-gray-50 pointer-events-none' : selectedRate?.company === rate.company && selectedRate?.type === rate.type ? 'border-gycora bg-emerald-50/10 shadow-sm' : 'border-gray-200 hover:bg-gray-50 cursor-pointer'}`}>
// //                           <div className="flex items-center w-full">
// //                             <input type="radio" disabled={rate.is_disabled} checked={selectedRate?.company === rate.company && selectedRate?.type === rate.type} onChange={() => setSelectedRate(rate)} className="w-4 h-4 border-gray-300 text-gycora focus:ring-gycora" />
// //                             <div className="flex items-center flex-grow gap-4 ml-4">
// //                               <div className="flex items-center justify-center w-12 h-12 overflow-hidden bg-white border border-gray-100 rounded-lg shrink-0">
// //                                 <span className="text-[10px] font-black text-gray-400">{rate.company.toUpperCase()}</span>
// //                               </div>
// //                               <div>
// //                                 <p className="text-sm font-bold tracking-wide text-gray-800 uppercase">{rate.company} - {rate.type}</p>
// //                                 <p className="text-[10px] text-gray-500 mt-0.5">{rate.courier_name} ({rate.duration})</p>
// //                               </div>
// //                             </div>
// //                             <p className="text-sm font-black text-gray-900">{formatPrice(rate.price)}</p>
// //                           </div>
// //                           {rate.is_disabled && (
// //                             <div className="px-3 py-1.5 mt-3 ml-8 text-[10px] font-bold tracking-widest text-red-600 uppercase bg-red-50 border border-red-100 rounded-lg">
// //                               ⚠️ Tidak Tersedia: {rate.disable_reason}
// //                             </div>
// //                           )}
// //                         </label>
// //                       ))}
// //                     </div>
// //                   )}
// //                 </div>
// //               )}
// //             </div>
// //           </section>
// //         </div>

// //         {/* BAGIAN KANAN: RINGKASAN PESANAN */}
// //         <div className="space-y-6 lg:w-[450px] xl:w-[480px] shrink-0">
// //           <div className="sticky p-8 border border-gray-100 shadow-xl bg-gray-50 rounded-3xl top-28">
// //             <h2 className="pb-4 mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">
// //               Ringkasan Pesanan
// //             </h2>

// //             <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
// //               {checkoutItems.map((item) => (
// //                 <div key={item.id} className="flex gap-4">
// //                   <img src={item.product.image_url} alt={item.product.name} className="object-cover w-16 h-16 bg-white border border-gray-100 rounded-xl shrink-0" />
// //                   <div className="flex-grow">
// //                     <p className="w-40 text-[11px] font-bold text-gray-900 uppercase truncate" title={item.product.name}>
// //                       {item.product.name}
// //                     </p>
// //                     <p className="text-[10px] text-gray-400 mt-0.5">Qty: {item.quantity}</p>
// //                     <p className="mt-1 text-xs font-medium text-gycora">
// //                       {formatPrice(item.gross_amount)}
// //                     </p>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>

// //             <div className="pt-4 space-y-3 text-sm border-t border-gray-200">
// //               <div className="flex justify-between text-gray-500">
// //                 <span>Total Items</span>
// //                 <span className="font-bold text-gray-900">{checkoutCount} items</span>
// //               </div>
// //               <div className="flex justify-between text-gray-500">
// //                 <span>Subtotal</span>
// //                 <span>{formatPrice(checkoutTotalAmount)}</span>
// //               </div>

// //               {/* Promo Code */}
// //               <div className="pt-4 mt-2 border-t border-gray-200 border-dashed">
// //                 <label className="block mb-2 text-[10px] font-bold tracking-widest text-gray-900 uppercase">Kode Promo</label>
// //                 <form onSubmit={applyPromo} className="flex gap-2">
// //                   <input type="text" value={promoInput} onChange={(e) => setPromoInput(e.target.value)} disabled={!!appliedPromoCode || isVerifyingPromo} placeholder="Masukkan kode promo" className="flex-1 px-3 py-2 text-sm uppercase bg-white border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-gycora disabled:bg-gray-100" />
// //                   {!appliedPromoCode ? (
// //                     <button type="submit" disabled={!promoInput || isVerifyingPromo} className="flex items-center justify-center w-20 px-4 text-[10px] font-bold text-white uppercase transition rounded-lg bg-gycora hover:bg-gycora-dark disabled:bg-gray-300">
// //                       {isVerifyingPromo ? "..." : "Apply"}
// //                     </button>
// //                   ) : (
// //                     <button type="button" onClick={removePromo} className="w-20 px-4 text-[10px] font-bold text-red-600 uppercase transition border border-red-200 rounded-lg bg-red-50 hover:bg-red-100">Hapus</button>
// //                   )}
// //                 </form>
// //                 {promoMessage && <p className={`mt-2 text-[10px] font-medium ${appliedPromoCode ? 'text-emerald-600' : 'text-red-500'}`}>{promoMessage}</p>}
// //                 {appliedPromoCode && (
// //                   <div className="flex items-center justify-between mt-2">
// //                     <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Promo Applied</span>
// //                     <span className="text-[11px] font-medium text-emerald-600">- {formatPrice(promoDiscountAmount)}</span>
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Ongkos Kirim */}
// //               <div className="flex items-start justify-between pt-4 text-gray-500">
// //                 <span>Ongkos Kirim</span>
// //                 {shippingMethod === 'free' ? (
// //                   <span className="font-bold text-emerald-600">Gratis (Ambil di Toko)</span>
// //                 ) : shippingMethod === 'biteship' && selectedRate ? (
// //                   <div className="text-right">
// //                     <span className="block font-medium text-gray-900">{formatPrice(selectedRate.price * checkoutCount)}</span>
// //                     <p className="mt-1 text-[10px] text-gray-400">{formatPrice(selectedRate.price)} x {checkoutCount} item</p>
// //                   </div>
// //                 ) : (
// //                   <span className="text-[10px] italic">Pilih metode</span>
// //                 )}
// //               </div>

// //               <div className="flex justify-between pt-4 font-bold text-gray-900 border-t border-gray-200">
// //                 <span className="mt-1 text-xs tracking-widest uppercase">Grand Total</span>
// //                 <span className="text-xl text-gycora">{formatPrice(grandTotal)}</span>
// //               </div>

// //               <button onClick={handlePayment} disabled={isButtonDisabled} className="flex items-center justify-center w-full gap-3 py-4 mt-8 text-xs font-bold tracking-[0.3em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/10">
// //                 {!isProcessing ? "Bayar Sekarang" : "Memproses..."}
// //               </button>

// //               {!selectedAddressId && <p className="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase">* Silakan pilih alamat pengiriman</p>}
// //               {shippingMethod === 'biteship' && !selectedRate && <p className="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase">* Silakan pilih kurir pengiriman</p>}
// //             </div>
// //           </div>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }

// import { useState, useEffect, useMemo } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../context/CartContext";
// import { BASE_URL } from "../../config/api"; // [BARU] Import BASE_URL

// export default function PaymentPage() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { cartItems } = useCart();

//   // Ambil ID yang dipilih dari CartPage
//   const selectedItemIds: number[] = location.state?.selectedIds || [];

//   const [isPageLoading, setIsPageLoading] = useState(true);

//   // --- STATE ALAMAT ---
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [addresses, setAddresses] = useState<any[]>([]);
//   const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

//   // --- STATE PENGIRIMAN ---
//   const [shippingMethod, setShippingMethod] = useState("free");
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [selectedRate, setSelectedRate] = useState<any>(null);
//   const [isLoadingRates, setIsLoadingRates] = useState(false);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [rawShippingRates, setRawShippingRates] = useState<any[]>([]);

//   const [deliveryDate, setDeliveryDate] = useState("");
//   const [deliveryTime, setDeliveryTime] = useState("");

//   // --- STATE DISKON ---
//   const [promoInput, setPromoInput] = useState("");
//   const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
//   const [promoDiscountAmount, setPromoDiscountAmount] = useState(0);
//   const [promoMessage, setPromoMessage] = useState("");
//   const [isVerifyingPromo, setIsVerifyingPromo] = useState(false);

//   const [isProcessing, setIsProcessing] = useState(false);

//   // --- STATE IMAGE ERRORS (UNTUK LOGO KURIR) ---
//   const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

//   // --- PERHITUNGAN KERANJANG (HANYA ITEM TERPILIH) ---
//   const checkoutItems = useMemo(() => {
//     return cartItems.filter((item) => selectedItemIds.includes(item.id));
//   }, [cartItems, selectedItemIds]);

//   const checkoutCount = useMemo(() => {
//     return checkoutItems.reduce((sum, item) => sum + item.quantity, 0);
//   }, [checkoutItems]);

//   const checkoutTotalAmount = useMemo(() => {
//     return checkoutItems.reduce((sum, item) => sum + Number(item.gross_amount), 0);
//   }, [checkoutItems]);

//   const grandTotal = useMemo(() => {
//     let total = checkoutTotalAmount;
//     if (shippingMethod === "biteship" && selectedRate) {
//       total += parseFloat(selectedRate.price) * checkoutCount;
//     }
//     return total - promoDiscountAmount;
//   }, [checkoutTotalAmount, shippingMethod, selectedRate, checkoutCount, promoDiscountAmount]);

//   // --- INITIALIZATION ---
//   useEffect(() => {
//     // PROTEKSI: Jika tidak ada item yang dipilih, tendang ke Cart
//     if (selectedItemIds.length === 0) {
//       Swal.fire({
//         toast: true, position: 'top-end', icon: 'warning',
//         title: 'Pilih item terlebih dahulu', showConfirmButton: false, timer: 2000
//       });
//       navigate('/cart');
//       return;
//     }

//     const loadData = async () => {
//       const token = localStorage.getItem("user_token");
//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       try {
//         // [PERBAIKAN] Menggunakan BASE_URL
//         const res = await fetch(`${BASE_URL}/api/addresses`, {
//           headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//         });
//         if (res.ok) {
//           const data = await res.json();
//           const addrArray = data.data ? data.data : data;
//           setAddresses(addrArray || []);
//           if (addrArray && addrArray.length > 0) {
//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//             const defaultAddr = addrArray.find((a: any) => a.is_default);
//             setSelectedAddressId(defaultAddr ? defaultAddr.id : addrArray[0].id);
//           }
//         }
//       } catch (err) {
//         console.error("Gagal mengambil alamat:", err);
//       } finally {
//         const now = new Date();
//         now.setHours(now.getHours() + 1);
//         setDeliveryDate(now.toISOString().split("T")[0]);
//         setDeliveryTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
//         setIsPageLoading(false);
//       }
//     };
//     loadData();
//   }, [navigate, selectedItemIds.length]);

//   // --- FETCH SHIPPING RATES ---
//   useEffect(() => {
//     if (selectedAddressId && selectedItemIds.length > 0 && shippingMethod === 'biteship') {
//       const getRates = async () => {
//         setIsLoadingRates(true);
//         setSelectedRate(null);
//         setRawShippingRates([]);
//         try {
//           const token = localStorage.getItem("user_token");
//           // [PERBAIKAN] Menggunakan BASE_URL
//           const res = await fetch(`${BASE_URL}/api/shipping/rates`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
//             body: JSON.stringify({ address_id: selectedAddressId, cart_ids: selectedItemIds })
//           });
//           if (res.ok) {
//             const data = await res.json();
//             if (data.pricing) setRawShippingRates(data.pricing);
//           }
//         } catch (err) {
//           console.error("Gagal menghitung ongkir:", err);
//           Swal.fire({ toast: true, position: "top-end", icon: "error", title: "Gagal menghitung ongkir.", showConfirmButton: false, timer: 3000 });
//         } finally {
//           setIsLoadingRates(false);
//         }
//       };
//       getRates();
//     }
//   }, [selectedAddressId, selectedItemIds, shippingMethod]);

//   // Logika Filter Ongkir (Biteship)
//   const processedShippingRates = useMemo(() => {
//     if (!rawShippingRates || rawShippingRates.length === 0) return [];
//     return rawShippingRates.map((rate) => {
//       return { ...rate, is_disabled: false, disable_reason: "" };
//     }).sort((a, b) => (a.is_disabled === b.is_disabled ? 0 : a.is_disabled ? 1 : -1));
//   }, [rawShippingRates]);

//   // --- HANDLERS ---
//   const applyPromo = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!promoInput) return;
//     setIsVerifyingPromo(true);
//     try {
//       const token = localStorage.getItem("user_token");
//       // [PERBAIKAN] Menggunakan BASE_URL
//       const res = await fetch(`${BASE_URL}/api/promo/verify`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
//         body: JSON.stringify({ promo_code: promoInput })
//       });
//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || "Promo tidak valid");
//       if (checkoutTotalAmount < 50000) throw new Error("Minimum belanja Rp 50.000");

//       setAppliedPromoCode(promoInput.toUpperCase());
//       setPromoDiscountAmount(Math.min(data.discount_value, checkoutTotalAmount));
//       setPromoMessage("✅ " + data.message);
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err: any) {
//       setAppliedPromoCode(null);
//       setPromoDiscountAmount(0);
//       setPromoMessage("❌ " + err.message);
//     } finally {
//       setIsVerifyingPromo(false);
//     }
//   };

//   const removePromo = () => {
//     setPromoInput(""); setAppliedPromoCode(null); setPromoDiscountAmount(0); setPromoMessage("");
//   };

//   const handlePayment = async () => {
//     setIsProcessing(true);
//     try {
//       const token = localStorage.getItem("user_token");
//       const payload = {
//         address_id: selectedAddressId,
//         shipping_method: shippingMethod,
//         use_points: 0,
//         cart_ids: selectedItemIds,
//         courier_company: shippingMethod === "biteship" ? selectedRate?.company : null,
//         courier_type: shippingMethod === "biteship" ? selectedRate?.type : null,
//         shipping_cost: shippingMethod === "biteship" ? selectedRate?.price : null,
//         delivery_type: shippingMethod === "biteship" ? "now" : null,
//         delivery_date: shippingMethod === "biteship" ? deliveryDate : null,
//         delivery_time: shippingMethod === "biteship" ? deliveryTime : null,
//         promo_code: appliedPromoCode,
//       };

//       // [PERBAIKAN] Menggunakan BASE_URL
//       const res = await fetch(`${BASE_URL}/api/checkout`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
//         body: JSON.stringify(payload)
//       });
//       const data = await res.json();

//       if (res.ok && data.checkout_url) {
//         window.location.href = data.checkout_url;
//       } else {
//         throw new Error(data.message || "Gagal membuat tagihan");
//       }
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err: any) {
//       Swal.fire("Error", err.message, "error");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const formatPrice = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
//   };

//   // --- LOGO HELPER ---
//   const handleImageError = (company: string) => {
//     setImageErrors((prev) => ({ ...prev, [company]: true }));
//   };

//   const getCourierLogo = (company: string) => {
//     if (!company) return null;
//     const baseUrl = "/courier_images/";
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
//     const logo = map[company.toLowerCase()];
//     return logo ? baseUrl + logo : null;
//   };

//   const isButtonDisabled = isProcessing || checkoutItems.length === 0 || !selectedAddressId ||
//     (shippingMethod === "biteship" && !selectedRate);

//   if (isPageLoading) {
//     return (
//       <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
//         <div className="flex gap-2 mb-4">
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-1"></div>
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-2"></div>
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-3"></div>
//         </div>
//         <p className="font-serif text-sm italic tracking-widest text-gray-500 animate-pulse">
//           Mempersiapkan checkout Anda...
//         </p>
//       </div>
//     );
//   }

//   if (checkoutItems.length === 0) {
//     return (
//       <div className="min-h-screen px-6 py-12 mx-auto font-sans md:py-24 max-w-[1440px] animate-fade-in">
//         <div className="py-20 text-center">
//           <h2 className="mb-4 text-3xl font-extrabold text-gray-900">Tidak ada item dipilih</h2>
//           <button onClick={() => navigate('/cart')} className="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase rounded-full bg-gycora hover:bg-gycora-dark">
//             Kembali ke Keranjang
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen px-6 py-12 mx-auto font-sans md:py-24 max-w-[1440px] animate-fade-in">
//       <h1 className="mb-12 text-3xl font-extrabold tracking-tighter text-gray-900 uppercase md:text-4xl">
//         Checkout
//       </h1>

//       <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">

//         {/* BAGIAN KIRI: FORM PENGIRIMAN */}
//         <div className="flex-grow space-y-12">

//           {/* 1. ADDRESS */}
//           <section>
//             <div className="flex items-center gap-4 mb-6">
//               <span className="flex items-center justify-center w-6 h-6 text-[10px] font-bold text-white rounded-full bg-gycora">1</span>
//               <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">Alamat Pengiriman</h2>
//             </div>

//             {addresses.length === 0 ? (
//               <div className="py-10 text-center border border-gray-300 border-dashed bg-gray-50 rounded-2xl">
//                 <p className="mb-2 text-sm italic text-gray-500">Belum ada alamat tersimpan.</p>
//                 <button onClick={() => navigate('/profile')} className="text-xs font-bold underline text-gycora hover:text-gycora-dark">
//                   + Tambah Alamat di Profil
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {addresses.map((addr) => (
//                   <label key={addr.id} className={`relative flex items-start p-6 border rounded-2xl cursor-pointer transition-all ${selectedAddressId === addr.id ? 'border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
//                     <input type="radio" name="address" value={addr.id} checked={selectedAddressId === addr.id} onChange={() => setSelectedAddressId(addr.id)} className="w-5 h-5 mt-1 border-gray-300 rounded-full text-gycora focus:ring-gycora" />
//                     <div className="flex-grow ml-4">
//                       <div className="flex justify-between">
//                         <p className="text-sm font-bold text-gray-900 uppercase">{addr.receiver.full_name}</p>
//                         {addr.is_default && <span className="px-2 py-0.5 text-[9px] font-bold text-emerald-800 uppercase bg-emerald-100 rounded">Utama</span>}
//                       </div>
//                       <p className="mt-2 text-sm leading-relaxed text-gray-600">
//                         {addr.details.address_location} - {addr.details.type} <br />
//                         {addr.details.city}, {addr.details.province} <br />
//                         {addr.details.region} - {addr.details.postal_code}
//                       </p>
//                     </div>
//                   </label>
//                 ))}
//               </div>
//             )}
//           </section>

//           {/* 2. SHIPPING METHOD */}
//           <section className={!selectedAddressId ? "opacity-50 pointer-events-none" : ""}>
//             <div className="flex items-center gap-4 mb-6">
//               <span className="flex items-center justify-center w-6 h-6 text-[10px] font-bold text-white rounded-full bg-gycora">2</span>
//               <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">Metode Pengiriman</h2>
//             </div>

//             <div className="space-y-4">
//               {/* Ambil di Toko */}
//               <label className={`relative flex items-center p-6 border rounded-2xl cursor-pointer transition-all ${shippingMethod === 'free' ? 'border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
//                 <input type="radio" value="free" checked={shippingMethod === 'free'} onChange={() => setShippingMethod('free')} className="w-5 h-5 border-gray-300 rounded-full text-gycora focus:ring-gycora" />
//                 <div className="flex items-center justify-between flex-grow ml-4">
//                   <div>
//                     <p className="text-sm font-bold tracking-wide text-gray-900 uppercase">Ambil Sendiri</p>
//                     <p className="mt-1 text-xs font-bold text-emerald-600">In-Store Pickup (Surabaya)</p>
//                   </div>
//                   <p className="font-black text-gycora">Gratis</p>
//                 </div>
//               </label>

//               {/* Biteship / Ekspedisi */}
//               <label className={`relative flex items-center p-6 border rounded-2xl cursor-pointer transition-all ${shippingMethod === 'biteship' ? 'border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
//                 <input type="radio" value="biteship" checked={shippingMethod === 'biteship'} onChange={() => setShippingMethod('biteship')} className="w-5 h-5 border-gray-300 rounded-full text-gycora focus:ring-gycora" />
//                 <div className="flex items-center justify-between flex-grow ml-4">
//                   <div>
//                     <p className="text-sm font-bold tracking-wide text-gray-900 uppercase">Reguler / Express</p>
//                     <p className="mt-1 text-xs text-gray-500">Dikirim via kurir pilihan Anda</p>
//                   </div>
//                 </div>
//               </label>

//               {/* Sub-menu Biteship */}
//               {shippingMethod === 'biteship' && (
//                 <div className="p-6 mt-4 space-y-8 bg-white border border-gray-200 rounded-3xl animate-fade-in">

//                   <h3 className="pt-2 text-sm font-bold tracking-widest text-gray-900 uppercase border-t border-gray-100">Pilih Ekspedisi</h3>

//                   {isLoadingRates ? (
//                     <p className="py-4 text-sm text-center text-gray-500 animate-pulse">Menghitung ongkos kirim...</p>
//                   ) : processedShippingRates.length === 0 ? (
//                     <p className="py-4 text-xs italic text-center text-red-500">Tidak ada kurir tersedia untuk alamat ini.</p>
//                   ) : (
//                     <div className="space-y-3">
//                       {processedShippingRates.map((rate, idx) => (
//                         <label key={idx} className={`relative flex flex-col p-4 border rounded-xl transition-all ${rate.is_disabled ? 'opacity-50 bg-gray-50 pointer-events-none' : selectedRate?.company === rate.company && selectedRate?.type === rate.type ? 'border-gycora bg-emerald-50/10 shadow-sm' : 'border-gray-200 hover:bg-gray-50 cursor-pointer'}`}>
//                           <div className="flex items-center w-full">
//                             <input type="radio" disabled={rate.is_disabled} checked={selectedRate?.company === rate.company && selectedRate?.type === rate.type} onChange={() => setSelectedRate(rate)} className="w-4 h-4 border-gray-300 text-gycora focus:ring-gycora" />
//                             <div className="flex items-center flex-grow gap-4 ml-4">
//                               <div className="flex items-center justify-center w-12 h-12 overflow-hidden bg-white border border-gray-100 rounded-lg shrink-0">

//                                 {/* [BARU] LOGIKA GAMBAR KURIR */}
//                                 {!imageErrors[rate.company] && getCourierLogo(rate.company) ? (
//                                   <img
//                                     src={getCourierLogo(rate.company)!}
//                                     alt={rate.company}
//                                     className="object-contain w-full h-full p-1"
//                                     onError={() => handleImageError(rate.company)}
//                                   />
//                                 ) : (
//                                   <span className="text-[10px] font-black text-gray-400">{rate.company.toUpperCase()}</span>
//                                 )}

//                               </div>
//                               <div>
//                                 <p className="text-sm font-bold tracking-wide text-gray-800 uppercase">{rate.company} - {rate.type}</p>
//                                 <p className="text-[10px] text-gray-500 mt-0.5">{rate.courier_name} ({rate.duration})</p>
//                               </div>
//                             </div>
//                             <p className="text-sm font-black text-gray-900">{formatPrice(rate.price)}</p>
//                           </div>
//                           {rate.is_disabled && (
//                             <div className="px-3 py-1.5 mt-3 ml-8 text-[10px] font-bold tracking-widest text-red-600 uppercase bg-red-50 border border-red-100 rounded-lg">
//                               ⚠️ Tidak Tersedia: {rate.disable_reason}
//                             </div>
//                           )}
//                         </label>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </section>
//         </div>

//         {/* BAGIAN KANAN: RINGKASAN PESANAN */}
//         <div className="space-y-6 lg:w-[450px] xl:w-[480px] shrink-0">
//           <div className="sticky p-8 border border-gray-100 shadow-xl bg-gray-50 rounded-3xl top-28">
//             <h2 className="pb-4 mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">
//               Ringkasan Pesanan
//             </h2>

//             <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
//               {checkoutItems.map((item) => (
//                 <div key={item.id} className="flex gap-4">
//                   <img src={item.product.image_url} alt={item.product.name} className="object-cover w-16 h-16 bg-white border border-gray-100 rounded-xl shrink-0" />
//                   <div className="flex-grow">
//                     <p className="w-40 text-[11px] font-bold text-gray-900 uppercase truncate" title={item.product.name}>
//                       {item.product.name}
//                     </p>
//                     <p className="text-[10px] text-gray-400 mt-0.5">Qty: {item.quantity}</p>
//                     <p className="mt-1 text-xs font-medium text-gycora">
//                       {formatPrice(item.gross_amount)}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="pt-4 space-y-3 text-sm border-t border-gray-200">
//               <div className="flex justify-between text-gray-500">
//                 <span>Total Items</span>
//                 <span className="font-bold text-gray-900">{checkoutCount} items</span>
//               </div>
//               <div className="flex justify-between text-gray-500">
//                 <span>Subtotal</span>
//                 <span>{formatPrice(checkoutTotalAmount)}</span>
//               </div>

//               {/* Promo Code */}
//               <div className="pt-4 mt-2 border-t border-gray-200 border-dashed">
//                 <label className="block mb-2 text-[10px] font-bold tracking-widest text-gray-900 uppercase">Kode Promo</label>
//                 <form onSubmit={applyPromo} className="flex gap-2">
//                   <input type="text" value={promoInput} onChange={(e) => setPromoInput(e.target.value)} disabled={!!appliedPromoCode || isVerifyingPromo} placeholder="Masukkan kode promo" className="flex-1 px-3 py-2 text-sm uppercase bg-white border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-gycora disabled:bg-gray-100" />
//                   {!appliedPromoCode ? (
//                     <button type="submit" disabled={!promoInput || isVerifyingPromo} className="flex items-center justify-center w-20 px-4 text-[10px] font-bold text-white uppercase transition rounded-lg bg-gycora hover:bg-gycora-dark disabled:bg-gray-300">
//                       {isVerifyingPromo ? "..." : "Apply"}
//                     </button>
//                   ) : (
//                     <button type="button" onClick={removePromo} className="w-20 px-4 text-[10px] font-bold text-red-600 uppercase transition border border-red-200 rounded-lg bg-red-50 hover:bg-red-100">Hapus</button>
//                   )}
//                 </form>
//                 {promoMessage && <p className={`mt-2 text-[10px] font-medium ${appliedPromoCode ? 'text-emerald-600' : 'text-red-500'}`}>{promoMessage}</p>}
//                 {appliedPromoCode && (
//                   <div className="flex items-center justify-between mt-2">
//                     <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Promo Applied</span>
//                     <span className="text-[11px] font-medium text-emerald-600">- {formatPrice(promoDiscountAmount)}</span>
//                   </div>
//                 )}
//               </div>

//               {/* Ongkos Kirim */}
//               <div className="flex items-start justify-between pt-4 text-gray-500">
//                 <span>Ongkos Kirim</span>
//                 {shippingMethod === 'free' ? (
//                   <span className="font-bold text-emerald-600">Gratis (Ambil di Toko)</span>
//                 ) : shippingMethod === 'biteship' && selectedRate ? (
//                   <div className="text-right">
//                     <span className="block font-medium text-gray-900">{formatPrice(selectedRate.price * checkoutCount)}</span>
//                     <p className="mt-1 text-[10px] text-gray-400">{formatPrice(selectedRate.price)} x {checkoutCount} item</p>
//                   </div>
//                 ) : (
//                   <span className="text-[10px] italic">Pilih metode</span>
//                 )}
//               </div>

//               <div className="flex justify-between pt-4 font-bold text-gray-900 border-t border-gray-200">
//                 <span className="mt-1 text-xs tracking-widest uppercase">Grand Total</span>
//                 <span className="text-xl text-gycora">{formatPrice(grandTotal)}</span>
//               </div>

//               <button onClick={handlePayment} disabled={isButtonDisabled} className="flex items-center justify-center w-full gap-3 py-4 mt-8 text-xs font-bold tracking-[0.3em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/10">
//                 {!isProcessing ? "Bayar Sekarang" : "Memproses..."}
//               </button>

//               {!selectedAddressId && <p className="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase">* Silakan pilih alamat pengiriman</p>}
//               {shippingMethod === 'biteship' && !selectedRate && <p className="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase">* Silakan pilih kurir pengiriman</p>}
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../context/CartContext";
// import { BASE_URL } from "../../config/api";

// export default function PaymentPage() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { cartItems } = useCart();

//   // Ambil ID yang dipilih dari CartPage
//   const selectedItemIds: number[] = location.state?.selectedIds || [];

//   const [isPageLoading, setIsPageLoading] = useState(true);

//   // --- STATE ALAMAT ---
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [addresses, setAddresses] = useState<any[]>([]);
//   const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

//   // --- STATE PENGIRIMAN ---
//   const [shippingMethod, setShippingMethod] = useState("free");
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [selectedRate, setSelectedRate] = useState<any>(null);
//   const [isLoadingRates, setIsLoadingRates] = useState(false);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [rawShippingRates, setRawShippingRates] = useState<any[]>([]);

//   const [deliveryDate, setDeliveryDate] = useState("");
//   const [deliveryTime, setDeliveryTime] = useState("");

//   // --- STATE DISKON ---
//   const [promoInput, setPromoInput] = useState("");
//   const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
//   const [promoDiscountAmount, setPromoDiscountAmount] = useState(0);
//   const [promoMessage, setPromoMessage] = useState("");
//   const [isVerifyingPromo, setIsVerifyingPromo] = useState(false);

//   const [isProcessing, setIsProcessing] = useState(false);

//   // --- STATE IMAGE ERRORS (UNTUK LOGO KURIR) ---
//   const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

//   // --- PERHITUNGAN KERANJANG (HANYA ITEM TERPILIH) ---
//   const checkoutItems = useMemo(() => {
//     return cartItems.filter((item) => selectedItemIds.includes(item.id));
//   }, [cartItems, selectedItemIds]);

//   const checkoutCount = useMemo(() => {
//     return checkoutItems.reduce((sum, item) => sum + item.quantity, 0);
//   }, [checkoutItems]);

//   const checkoutTotalAmount = useMemo(() => {
//     return checkoutItems.reduce((sum, item) => sum + Number(item.gross_amount), 0);
//   }, [checkoutItems]);

//   const grandTotal = useMemo(() => {
//     let total = checkoutTotalAmount;
//     if (shippingMethod === "biteship" && selectedRate) {
//       total += parseFloat(selectedRate.price) * checkoutCount;
//     }
//     return total - promoDiscountAmount;
//   }, [checkoutTotalAmount, shippingMethod, selectedRate, checkoutCount, promoDiscountAmount]);

//   // --- INITIALIZATION ---
//   useEffect(() => {
//     // PROTEKSI: Jika tidak ada item yang dipilih, tendang ke Cart
//     if (selectedItemIds.length === 0) {
//       Swal.fire({
//         toast: true, position: 'top-end', icon: 'warning',
//         title: 'Pilih item terlebih dahulu', showConfirmButton: false, timer: 2000
//       });
//       navigate('/cart');
//       return;
//     }

//     const loadData = async () => {
//       const token = localStorage.getItem("user_token");
//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       try {
//         const res = await fetch(`${BASE_URL}/api/addresses`, {
//           headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//         });
//         if (res.ok) {
//           const data = await res.json();
//           const addrArray = data.data ? data.data : data;
//           setAddresses(addrArray || []);
//           if (addrArray && addrArray.length > 0) {
//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//             const defaultAddr = addrArray.find((a: any) => a.is_default);
//             setSelectedAddressId(defaultAddr ? defaultAddr.id : addrArray[0].id);
//           }
//         }
//       } catch (err) {
//         console.error("Gagal mengambil alamat:", err);
//       } finally {
//         const now = new Date();
//         now.setHours(now.getHours() + 1);
//         setDeliveryDate(now.toISOString().split("T")[0]);
//         setDeliveryTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
//         setIsPageLoading(false);
//       }
//     };
//     loadData();
//   }, [navigate, selectedItemIds.length]);

//   // --- FETCH SHIPPING RATES ---
//   useEffect(() => {
//     if (selectedAddressId && selectedItemIds.length > 0 && shippingMethod === 'biteship') {
//       const getRates = async () => {
//         setIsLoadingRates(true);
//         setSelectedRate(null);
//         setRawShippingRates([]);
//         try {
//           const token = localStorage.getItem("user_token");
//           const res = await fetch(`${BASE_URL}/api/shipping/rates`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
//             body: JSON.stringify({ address_id: selectedAddressId, cart_ids: selectedItemIds })
//           });
//           if (res.ok) {
//             const data = await res.json();
//             if (data.pricing) setRawShippingRates(data.pricing);
//           }
//         } catch (err) {
//           console.error("Gagal menghitung ongkir:", err);
//           Swal.fire({ toast: true, position: "top-end", icon: "error", title: "Gagal menghitung ongkir.", showConfirmButton: false, timer: 3000 });
//         } finally {
//           setIsLoadingRates(false);
//         }
//       };
//       getRates();
//     }
//   }, [selectedAddressId, selectedItemIds, shippingMethod]);

//   // Logika Filter Ongkir (Biteship)
//   const processedShippingRates = useMemo(() => {
//     if (!rawShippingRates || rawShippingRates.length === 0) return [];
//     return rawShippingRates.map((rate) => {
//       return { ...rate, is_disabled: false, disable_reason: "" };
//     }).sort((a, b) => (a.is_disabled === b.is_disabled ? 0 : a.is_disabled ? 1 : -1));
//   }, [rawShippingRates]);

//   // --- HANDLERS ---
//   const applyPromo = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!promoInput) return;
//     setIsVerifyingPromo(true);
//     try {
//       const token = localStorage.getItem("user_token");
//       const res = await fetch(`${BASE_URL}/api/promo/verify`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
//         body: JSON.stringify({ promo_code: promoInput })
//       });
//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || "Promo tidak valid");
//       if (checkoutTotalAmount < 50000) throw new Error("Minimum belanja Rp 50.000");

//       setAppliedPromoCode(promoInput.toUpperCase());
//       setPromoDiscountAmount(Math.min(data.discount_value, checkoutTotalAmount));
//       setPromoMessage("✅ " + data.message);
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err: any) {
//       setAppliedPromoCode(null);
//       setPromoDiscountAmount(0);
//       setPromoMessage("❌ " + err.message);
//     } finally {
//       setIsVerifyingPromo(false);
//     }
//   };

//   const removePromo = () => {
//     setPromoInput(""); setAppliedPromoCode(null); setPromoDiscountAmount(0); setPromoMessage("");
//   };

//   const handlePayment = async () => {
//     setIsProcessing(true);
//     try {
//       const token = localStorage.getItem("user_token");
//       const payload = {
//         address_id: selectedAddressId,
//         shipping_method: shippingMethod,
//         use_points: 0,
//         cart_ids: selectedItemIds,
//         courier_company: shippingMethod === "biteship" ? selectedRate?.company : null,
//         courier_type: shippingMethod === "biteship" ? selectedRate?.type : null,
//         shipping_cost: shippingMethod === "biteship" ? selectedRate?.price : null,
//         delivery_type: shippingMethod === "biteship" ? "now" : null,
//         delivery_date: shippingMethod === "biteship" ? deliveryDate : null,
//         delivery_time: shippingMethod === "biteship" ? deliveryTime : null,
//         promo_code: appliedPromoCode,
//       };

//       const res = await fetch(`${BASE_URL}/api/checkout`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
//         body: JSON.stringify(payload)
//       });
//       const data = await res.json();

//       if (res.ok && data.checkout_url) {
//         window.location.href = data.checkout_url;
//       } else {
//         throw new Error(data.message || "Gagal membuat tagihan");
//       }
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err: any) {
//       Swal.fire("Error", err.message, "error");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const formatPrice = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
//   };

//   // --- LOGO HELPER ---
//   const handleImageError = (company: string) => {
//     setImageErrors((prev) => ({ ...prev, [company]: true }));
//   };

//   const getCourierLogo = (company: string) => {
//     if (!company) return null;
//     const baseUrl = "/courier_images/";
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
//     const logo = map[company.toLowerCase()];
//     return logo ? baseUrl + logo : null;
//   };

//   const isButtonDisabled = isProcessing || checkoutItems.length === 0 || !selectedAddressId ||
//     (shippingMethod === "biteship" && !selectedRate);

//   if (isPageLoading) {
//     return (
//       <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
//         <div className="flex gap-2 mb-4">
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-1"></div>
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-2"></div>
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-3"></div>
//         </div>
//         <p className="font-serif text-sm italic tracking-widest text-gray-500 animate-pulse">
//           Mempersiapkan checkout Anda...
//         </p>
//       </div>
//     );
//   }

//   if (checkoutItems.length === 0) {
//     return (
//       <div className="min-h-screen px-6 py-12 mx-auto font-sans md:py-24 max-w-[1440px] animate-fade-in">
//         <div className="py-20 text-center">
//           <h2 className="mb-4 text-3xl font-extrabold text-gray-900">Tidak ada item dipilih</h2>
//           <button onClick={() => navigate('/cart')} className="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase rounded-full bg-gycora hover:bg-gycora-dark">
//             Kembali ke Keranjang
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen px-6 py-12 mx-auto font-sans md:py-24 max-w-[1440px] animate-fade-in">
//       <h1 className="mb-12 text-3xl font-extrabold tracking-tighter text-gray-900 uppercase md:text-4xl">
//         Checkout
//       </h1>

//       <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">

//         {/* BAGIAN KIRI: FORM PENGIRIMAN */}
//         <div className="flex-grow space-y-12">

//           {/* 1. ADDRESS */}
//           <section>
//             <div className="flex items-center gap-4 mb-6">
//               <span className="flex items-center justify-center w-6 h-6 text-[10px] font-bold text-white rounded-full bg-gycora">1</span>
//               <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">Alamat Pengiriman</h2>
//             </div>

//             {addresses.length === 0 ? (
//               <div className="py-10 text-center border border-gray-300 border-dashed bg-gray-50 rounded-2xl">
//                 <p className="mb-2 text-sm italic text-gray-500">Belum ada alamat tersimpan.</p>
//                 <button onClick={() => navigate('/profile')} className="text-xs font-bold underline text-gycora hover:text-gycora-dark">
//                   + Tambah Alamat di Profil
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {addresses.map((addr) => (
//                   <label key={addr.id} className={`relative flex items-start p-6 border rounded-2xl cursor-pointer transition-all ${selectedAddressId === addr.id ? 'border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
//                     <input type="radio" name="address" value={addr.id} checked={selectedAddressId === addr.id} onChange={() => setSelectedAddressId(addr.id)} className="w-5 h-5 mt-1 border-gray-300 rounded-full text-gycora focus:ring-gycora" />
//                     <div className="flex-grow ml-4">
//                       <div className="flex justify-between">
//                         <p className="text-sm font-bold text-gray-900 uppercase">{addr.receiver.full_name}</p>
//                         {addr.is_default && <span className="px-2 py-0.5 text-[9px] font-bold text-emerald-800 uppercase bg-emerald-100 rounded">Utama</span>}
//                       </div>
//                       <p className="mt-2 text-sm leading-relaxed text-gray-600">
//                         {addr.details.address_location} - {addr.details.type} <br />
//                         {addr.details.city}, {addr.details.province} <br />
//                         {addr.details.region} - {addr.details.postal_code}
//                       </p>
//                     </div>
//                   </label>
//                 ))}
//               </div>
//             )}
//           </section>

//           {/* 2. SHIPPING METHOD */}
//           <section className={!selectedAddressId ? "opacity-50 pointer-events-none" : ""}>
//             <div className="flex items-center gap-4 mb-6">
//               <span className="flex items-center justify-center w-6 h-6 text-[10px] font-bold text-white rounded-full bg-gycora">2</span>
//               <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">Metode Pengiriman</h2>
//             </div>

//             <div className="space-y-4">
//               {/* Ambil di Toko */}
//               <label className={`relative flex items-center p-6 border rounded-2xl cursor-pointer transition-all ${shippingMethod === 'free' ? 'border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
//                 <input type="radio" value="free" checked={shippingMethod === 'free'} onChange={() => setShippingMethod('free')} className="w-5 h-5 border-gray-300 rounded-full text-gycora focus:ring-gycora" />
//                 <div className="flex items-center justify-between flex-grow ml-4">
//                   <div>
//                     <p className="text-sm font-bold tracking-wide text-gray-900 uppercase">Ambil Sendiri</p>
//                     <p className="mt-1 text-xs font-bold text-emerald-600">In-Store Pickup (Surabaya)</p>
//                   </div>
//                   <p className="font-black text-gycora">Gratis</p>
//                 </div>
//               </label>

//               {/* Biteship / Ekspedisi */}
//               <label className={`relative flex items-center p-6 border rounded-2xl cursor-pointer transition-all ${shippingMethod === 'biteship' ? 'border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
//                 <input type="radio" value="biteship" checked={shippingMethod === 'biteship'} onChange={() => setShippingMethod('biteship')} className="w-5 h-5 border-gray-300 rounded-full text-gycora focus:ring-gycora" />
//                 <div className="flex items-center justify-between flex-grow ml-4">
//                   <div>
//                     <p className="text-sm font-bold tracking-wide text-gray-900 uppercase">Reguler / Express</p>
//                     <p className="mt-1 text-xs text-gray-500">Dikirim via kurir pilihan Anda</p>
//                   </div>
//                 </div>
//               </label>

//               {/* Sub-menu Biteship */}
//               {shippingMethod === 'biteship' && (
//                 <div className="p-6 mt-4 space-y-8 bg-white border border-gray-200 rounded-3xl animate-fade-in">

//                   <h3 className="pt-2 text-sm font-bold tracking-widest text-gray-900 uppercase border-t border-gray-100">Pilih Ekspedisi</h3>

//                   {isLoadingRates ? (
//                     <p className="py-4 text-sm text-center text-gray-500 animate-pulse">Menghitung ongkos kirim...</p>
//                   ) : processedShippingRates.length === 0 ? (
//                     <p className="py-4 text-xs italic text-center text-red-500">Tidak ada kurir tersedia untuk alamat ini.</p>
//                   ) : (
//                     <div className="space-y-3">
//                       {processedShippingRates.map((rate, idx) => (
//                         <label key={idx} className={`relative flex flex-col p-4 border rounded-xl transition-all ${rate.is_disabled ? 'opacity-50 bg-gray-50 pointer-events-none' : selectedRate?.company === rate.company && selectedRate?.type === rate.type ? 'border-gycora bg-emerald-50/10 shadow-sm' : 'border-gray-200 hover:bg-gray-50 cursor-pointer'}`}>
//                           <div className="flex items-center w-full">
//                             <input type="radio" disabled={rate.is_disabled} checked={selectedRate?.company === rate.company && selectedRate?.type === rate.type} onChange={() => setSelectedRate(rate)} className="w-4 h-4 border-gray-300 text-gycora focus:ring-gycora" />
//                             <div className="flex items-center flex-grow gap-4 ml-4">
//                               <div className="flex items-center justify-center w-12 h-12 overflow-hidden bg-white border border-gray-100 rounded-lg shrink-0">

//                                 {/* LOGIKA GAMBAR KURIR */}
//                                 {!imageErrors[rate.company] && getCourierLogo(rate.company) ? (
//                                   <img
//                                     src={getCourierLogo(rate.company)!}
//                                     alt={rate.company}
//                                     className="object-contain w-full h-full p-1"
//                                     onError={() => handleImageError(rate.company)}
//                                   />
//                                 ) : (
//                                   <span className="text-[10px] font-black text-gray-400">{rate.company.toUpperCase()}</span>
//                                 )}

//                               </div>
//                               <div>
//                                 <p className="text-sm font-bold tracking-wide text-gray-800 uppercase">{rate.company} - {rate.type}</p>
//                                 <p className="text-[10px] text-gray-500 mt-0.5">{rate.courier_name} ({rate.duration})</p>
//                               </div>
//                             </div>
//                             <p className="text-sm font-black text-gray-900">{formatPrice(rate.price)}</p>
//                           </div>
//                           {rate.is_disabled && (
//                             <div className="px-3 py-1.5 mt-3 ml-8 text-[10px] font-bold tracking-widest text-red-600 uppercase bg-red-50 border border-red-100 rounded-lg">
//                               ⚠️ Tidak Tersedia: {rate.disable_reason}
//                             </div>
//                           )}
//                         </label>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </section>
//         </div>

//         {/* BAGIAN KANAN: RINGKASAN PESANAN */}
//         <div className="space-y-6 lg:w-[450px] xl:w-[480px] shrink-0">
//           <div className="sticky p-8 border border-gray-100 shadow-xl bg-gray-50 rounded-3xl top-28">
//             <h2 className="pb-4 mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">
//               Ringkasan Pesanan
//             </h2>

//             <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
//               {checkoutItems.map((item: any) => (
//                 <div key={item.id} className="flex gap-4">
//                   <img src={item.product.image_url} alt={item.product.name} className="object-cover w-16 h-16 bg-white border border-gray-100 rounded-xl shrink-0" />
//                   <div className="flex-grow">
//                     <p className="w-40 text-[11px] font-bold text-gray-900 uppercase truncate" title={item.product.name}>
//                       {item.product.name}
//                     </p>

//                     {/* BAGIAN WARNA DAN QTY YANG BARU */}
//                     <div className="flex items-center gap-2 mt-0.5">
//                       <p className="text-[10px] text-gray-400">Qty: {item.quantity}</p>
//                       {item.color && (
//                         <>
//                           <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
//                           <div
//                             className="w-3 h-3 border border-gray-300 rounded-full shadow-sm"
//                             style={{ backgroundColor: item.color }}
//                             title="Varian Warna"
//                           ></div>
//                         </>
//                       )}
//                     </div>

//                     <p className="mt-1 text-xs font-medium text-gycora">
//                       {formatPrice(item.gross_amount)}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="pt-4 space-y-3 text-sm border-t border-gray-200">
//               <div className="flex justify-between text-gray-500">
//                 <span>Total Items</span>
//                 <span className="font-bold text-gray-900">{checkoutCount} items</span>
//               </div>
//               <div className="flex justify-between text-gray-500">
//                 <span>Subtotal</span>
//                 <span>{formatPrice(checkoutTotalAmount)}</span>
//               </div>

//               {/* Promo Code */}
//               <div className="pt-4 mt-2 border-t border-gray-200 border-dashed">
//                 <label className="block mb-2 text-[10px] font-bold tracking-widest text-gray-900 uppercase">Kode Promo</label>
//                 <form onSubmit={applyPromo} className="flex gap-2">
//                   <input type="text" value={promoInput} onChange={(e) => setPromoInput(e.target.value)} disabled={!!appliedPromoCode || isVerifyingPromo} placeholder="Masukkan kode promo" className="flex-1 px-3 py-2 text-sm uppercase bg-white border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-gycora disabled:bg-gray-100" />
//                   {!appliedPromoCode ? (
//                     <button type="submit" disabled={!promoInput || isVerifyingPromo} className="flex items-center justify-center w-20 px-4 text-[10px] font-bold text-white uppercase transition rounded-lg bg-gycora hover:bg-gycora-dark disabled:bg-gray-300">
//                       {isVerifyingPromo ? "..." : "Apply"}
//                     </button>
//                   ) : (
//                     <button type="button" onClick={removePromo} className="w-20 px-4 text-[10px] font-bold text-red-600 uppercase transition border border-red-200 rounded-lg bg-red-50 hover:bg-red-100">Hapus</button>
//                   )}
//                 </form>
//                 {promoMessage && <p className={`mt-2 text-[10px] font-medium ${appliedPromoCode ? 'text-emerald-600' : 'text-red-500'}`}>{promoMessage}</p>}
//                 {appliedPromoCode && (
//                   <div className="flex items-center justify-between mt-2">
//                     <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Promo Applied</span>
//                     <span className="text-[11px] font-medium text-emerald-600">- {formatPrice(promoDiscountAmount)}</span>
//                   </div>
//                 )}
//               </div>

//               {/* Ongkos Kirim */}
//               <div className="flex items-start justify-between pt-4 text-gray-500">
//                 <span>Ongkos Kirim</span>
//                 {shippingMethod === 'free' ? (
//                   <span className="font-bold text-emerald-600">Gratis (Ambil di Toko)</span>
//                 ) : shippingMethod === 'biteship' && selectedRate ? (
//                   <div className="text-right">
//                     <span className="block font-medium text-gray-900">{formatPrice(selectedRate.price * checkoutCount)}</span>
//                     <p className="mt-1 text-[10px] text-gray-400">{formatPrice(selectedRate.price)} x {checkoutCount} item</p>
//                   </div>
//                 ) : (
//                   <span className="text-[10px] italic">Pilih metode</span>
//                 )}
//               </div>

//               <div className="flex justify-between pt-4 font-bold text-gray-900 border-t border-gray-200">
//                 <span className="mt-1 text-xs tracking-widest uppercase">Grand Total</span>
//                 <span className="text-xl text-gycora">{formatPrice(grandTotal)}</span>
//               </div>

//               <button onClick={handlePayment} disabled={isButtonDisabled} className="flex items-center justify-center w-full gap-3 py-4 mt-8 text-xs font-bold tracking-[0.3em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/10">
//                 {!isProcessing ? "Bayar Sekarang" : "Memproses..."}
//               </button>

//               {!selectedAddressId && <p className="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase">* Silakan pilih alamat pengiriman</p>}
//               {shippingMethod === 'biteship' && !selectedRate && <p className="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase">* Silakan pilih kurir pengiriman</p>}
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../context/CartContext";
// import { BASE_URL } from "../../config/api";

// export default function PaymentPage() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { cartItems } = useCart();

//   const selectedItemIds: number[] = location.state?.selectedIds || [];

//   const [isPageLoading, setIsPageLoading] = useState(true);

//   // --- STATE ALAMAT ---
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [addresses, setAddresses] = useState<any[]>([]);
//   const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

//   // --- STATE PENGIRIMAN ---
//   const [shippingMethod, setShippingMethod] = useState("free");
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [selectedRate, setSelectedRate] = useState<any>(null);
//   const [isLoadingRates, setIsLoadingRates] = useState(false);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [rawShippingRates, setRawShippingRates] = useState<any[]>([]);

//   const [deliveryDate, setDeliveryDate] = useState("");
//   const [deliveryTime, setDeliveryTime] = useState("");

//   // --- STATE DISKON ---
//   const [promoInput, setPromoInput] = useState("");
//   const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
//   const [promoDiscountAmount, setPromoDiscountAmount] = useState(0);
//   const [promoMessage, setPromoMessage] = useState("");
//   const [isVerifyingPromo, setIsVerifyingPromo] = useState(false);

//   const [isProcessing, setIsProcessing] = useState(false);

//   // --- STATE IMAGE ERRORS (UNTUK LOGO KURIR) ---
//   const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

//   // --- STATE MODAL TAMBAH ALAMAT ---
//   const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
//   const [isSubmittingAddress, setIsSubmittingAddress] = useState(false);
//   const [addressFormData, setAddressFormData] = useState({
//     region: "",
//     first_name_address: "",
//     last_name_address: "",
//     address_location: "",
//     city: "",
//     province: "",
//     postal_code: "",
//     location_type: "home",
//     latitude: "",
//     longitude: "",
//     is_default: false,
//   });

//   // --- PERHITUNGAN KERANJANG (HANYA ITEM TERPILIH) ---
//   const checkoutItems = useMemo(() => {
//     return cartItems.filter((item) => selectedItemIds.includes(item.id));
//   }, [cartItems, selectedItemIds]);

//   const checkoutCount = useMemo(() => {
//     return checkoutItems.reduce((sum, item) => sum + item.quantity, 0);
//   }, [checkoutItems]);

//   const checkoutTotalAmount = useMemo(() => {
//     return checkoutItems.reduce((sum, item) => sum + Number(item.gross_amount), 0);
//   }, [checkoutItems]);

//   const grandTotal = useMemo(() => {
//     let total = checkoutTotalAmount;
//     if (shippingMethod === "biteship" && selectedRate) {
//       total += parseFloat(selectedRate.price) * checkoutCount;
//     }
//     return total - promoDiscountAmount;
//   }, [checkoutTotalAmount, shippingMethod, selectedRate, checkoutCount, promoDiscountAmount]);

//   const fetchAddresses = async (token: string) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/addresses`, {
//         headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//       });
//       if (res.ok) {
//         const data = await res.json();
//         const addrArray = data.data ? data.data : data;
//         setAddresses(addrArray || []);

//         if (addrArray && addrArray.length > 0) {
//           // Pilih alamat default, atau alamat pertama jika tidak ada yang default
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           const defaultAddr = addrArray.find((a: any) => a.is_default);
//           setSelectedAddressId(defaultAddr ? defaultAddr.id : addrArray[0].id);
//         } else {
//           setSelectedAddressId(null);
//         }
//       }
//     } catch (err) {
//       console.error("Gagal mengambil alamat:", err);
//     }
//   };

//   useEffect(() => {
//     // PROTEKSI: Jika tidak ada item yang dipilih, tendang ke Cart
//     if (selectedItemIds.length === 0) {
//       Swal.fire({
//         toast: true, position: 'top-end', icon: 'warning',
//         title: 'Pilih item terlebih dahulu', showConfirmButton: false, timer: 2000
//       });
//       navigate('/cart');
//       return;
//     }

//     const loadData = async () => {
//       const token = localStorage.getItem("user_token");
//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       await fetchAddresses(token);

//       const now = new Date();
//       now.setHours(now.getHours() + 1);
//       setDeliveryDate(now.toISOString().split("T")[0]);
//       setDeliveryTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
//       setIsPageLoading(false);
//     };

//     loadData();
//   }, [navigate, selectedItemIds.length]);

//   // --- FETCH SHIPPING RATES ---
//   useEffect(() => {
//     if (selectedAddressId && selectedItemIds.length > 0 && shippingMethod === 'biteship') {
//       const getRates = async () => {
//         setIsLoadingRates(true);
//         setSelectedRate(null);
//         setRawShippingRates([]);
//         try {
//           const token = localStorage.getItem("user_token");
//           const res = await fetch(`${BASE_URL}/api/shipping/rates`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
//             body: JSON.stringify({ address_id: selectedAddressId, cart_ids: selectedItemIds })
//           });
//           if (res.ok) {
//             const data = await res.json();
//             if (data.pricing) setRawShippingRates(data.pricing);
//           }
//         } catch (err) {
//           console.error("Gagal menghitung ongkir:", err);
//           Swal.fire({ toast: true, position: "top-end", icon: "error", title: "Gagal menghitung ongkir.", showConfirmButton: false, timer: 3000 });
//         } finally {
//           setIsLoadingRates(false);
//         }
//       };
//       getRates();
//     }
//   }, [selectedAddressId, selectedItemIds, shippingMethod]);

//   // Logika Filter Ongkir (Biteship)
//   const processedShippingRates = useMemo(() => {
//     if (!rawShippingRates || rawShippingRates.length === 0) return [];
//     return rawShippingRates.map((rate) => {
//       return { ...rate, is_disabled: false, disable_reason: "" };
//     }).sort((a, b) => (a.is_disabled === b.is_disabled ? 0 : a.is_disabled ? 1 : -1));
//   }, [rawShippingRates]);

//   // --- HANDLERS DISKON & PEMBAYARAN ---
//   const applyPromo = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!promoInput) return;
//     setIsVerifyingPromo(true);
//     try {
//       const token = localStorage.getItem("user_token");
//       const res = await fetch(`${BASE_URL}/api/promo/verify`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
//         body: JSON.stringify({ promo_code: promoInput })
//       });
//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || "Promo tidak valid");
//       if (checkoutTotalAmount < 50000) throw new Error("Minimum belanja Rp 50.000");

//       setAppliedPromoCode(promoInput.toUpperCase());
//       setPromoDiscountAmount(Math.min(data.discount_value, checkoutTotalAmount));
//       setPromoMessage("✅ " + data.message);
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err: any) {
//       setAppliedPromoCode(null);
//       setPromoDiscountAmount(0);
//       setPromoMessage("❌ " + err.message);
//     } finally {
//       setIsVerifyingPromo(false);
//     }
//   };

//   const removePromo = () => {
//     setPromoInput(""); setAppliedPromoCode(null); setPromoDiscountAmount(0); setPromoMessage("");
//   };

//   const handlePayment = async () => {
//     setIsProcessing(true);
//     try {
//       const token = localStorage.getItem("user_token");
//       const payload = {
//         address_id: selectedAddressId,
//         shipping_method: shippingMethod,
//         use_points: 0,
//         cart_ids: selectedItemIds,
//         courier_company: shippingMethod === "biteship" ? selectedRate?.company : null,
//         courier_type: shippingMethod === "biteship" ? selectedRate?.type : null,
//         shipping_cost: shippingMethod === "biteship" ? selectedRate?.price : null,
//         delivery_type: shippingMethod === "biteship" ? "now" : null,
//         delivery_date: shippingMethod === "biteship" ? deliveryDate : null,
//         delivery_time: shippingMethod === "biteship" ? deliveryTime : null,
//         promo_code: appliedPromoCode,
//       };

//       const res = await fetch(`${BASE_URL}/api/checkout`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
//         body: JSON.stringify(payload)
//       });
//       const data = await res.json();

//       if (res.ok && data.checkout_url) {
//         window.location.href = data.checkout_url;
//       } else {
//         throw new Error(data.message || "Gagal membuat tagihan");
//       }
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err: any) {
//       Swal.fire("Error", err.message, "error");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const formatPrice = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
//   };

//   // --- LOGO HELPER ---
//   const handleImageError = (company: string) => {
//     setImageErrors((prev) => ({ ...prev, [company]: true }));
//   };

//   const getCourierLogo = (company: string) => {
//     if (!company) return null;
//     const baseUrl = "/courier_images/";
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
//     const logo = map[company.toLowerCase()];
//     return logo ? baseUrl + logo : null;
//   };

//   // --- HANDLERS MODAL TAMBAH ALAMAT ---
//   const handleOpenAddressModal = () => {
//     // Jika belum ada alamat sama sekali, paksa jadi alamat utama
//     const isFirstAddress = addresses.length === 0;

//     setAddressFormData({
//       region: "",
//       first_name_address: "",
//       last_name_address: "",
//       address_location: "",
//       city: "",
//       province: "",
//       postal_code: "",
//       location_type: "home",
//       latitude: "",
//       longitude: "",
//       is_default: isFirstAddress,
//     });
//     setIsAddressModalOpen(true);
//   };

//   const handleSubmitAddress = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmittingAddress(true);
//     const token = localStorage.getItem("user_token");

//     try {
//       const res = await fetch(`${BASE_URL}/api/addresses`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json"
//         },
//         body: JSON.stringify(addressFormData),
//       });

//       if (res.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Berhasil!",
//           text: "Alamat baru telah ditambahkan.",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         setIsAddressModalOpen(false);
//         // Refresh daftar alamat agar langsung muncul dan otomatis terpilih
//         await fetchAddresses(token!);
//       } else {
//         throw new Error("Gagal menyimpan alamat");
//       }
//     } catch (error) {
//       console.error("Gagal submit alamat:", error);
//       Swal.fire("Error", "Terjadi kesalahan saat menyimpan data alamat", "error");
//     } finally {
//       setIsSubmittingAddress(false);
//     }
//   };

//   const isButtonDisabled = isProcessing || checkoutItems.length === 0 || !selectedAddressId ||
//     (shippingMethod === "biteship" && !selectedRate);

//   if (isPageLoading) {
//     return (
//       <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
//         <div className="flex gap-2 mb-4">
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-1"></div>
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-2"></div>
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-3"></div>
//         </div>
//         <p className="font-serif text-sm italic tracking-widest text-gray-500 animate-pulse">
//           Mempersiapkan checkout Anda...
//         </p>
//       </div>
//     );
//   }

//   if (checkoutItems.length === 0) {
//     return (
//       <div className="min-h-screen px-6 py-12 mx-auto font-sans md:py-24 max-w-[1440px] animate-fade-in">
//         <div className="py-20 text-center">
//           <h2 className="mb-4 text-3xl font-extrabold text-gray-900">Tidak ada item dipilih</h2>
//           <button onClick={() => navigate('/cart')} className="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase rounded-full bg-gycora hover:bg-gycora-dark">
//             Kembali ke Keranjang
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen px-6 py-12 mx-auto font-sans md:py-24 max-w-[1440px] animate-fade-in relative">
//       <h1 className="mb-12 text-3xl font-extrabold tracking-tighter text-gray-900 uppercase md:text-4xl">
//         Checkout
//       </h1>

//       <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">

//         {/* BAGIAN KIRI: FORM PENGIRIMAN */}
//         <div className="flex-grow space-y-12">

//           {/* 1. ADDRESS */}
//           <section>
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-4">
//                 <span className="flex items-center justify-center w-6 h-6 text-[10px] font-bold text-white rounded-full bg-gycora">1</span>
//                 <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">Alamat Pengiriman</h2>
//               </div>
//               {/* Tombol Tambah Alamat dipindah ke header jika sudah ada alamat */}
//               {addresses.length > 0 && (
//                 <button
//                   onClick={handleOpenAddressModal}
//                   className="text-xs font-bold transition-colors text-emerald-600 hover:text-emerald-800"
//                 >
//                   + Tambah Alamat
//                 </button>
//               )}
//             </div>

//             {addresses.length === 0 ? (
//               <div className="py-10 text-center border border-gray-300 border-dashed bg-gray-50 rounded-2xl">
//                 <p className="mb-2 text-sm italic text-gray-500">Belum ada alamat tersimpan.</p>
//                 <button
//                   onClick={handleOpenAddressModal}
//                   className="px-6 py-2 mt-2 text-xs font-bold tracking-widest text-white uppercase transition-colors rounded-full shadow-md bg-gycora hover:bg-gycora-dark"
//                 >
//                   + Tambah Alamat Baru
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {addresses.map((addr) => (
//                   <label key={addr.id} className={`relative flex items-start p-6 border rounded-2xl cursor-pointer transition-all ${selectedAddressId === addr.id ? 'border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
//                     <input type="radio" name="address" value={addr.id} checked={selectedAddressId === addr.id} onChange={() => setSelectedAddressId(addr.id)} className="w-5 h-5 mt-1 border-gray-300 rounded-full text-gycora focus:ring-gycora" />
//                     <div className="flex-grow ml-4">
//                       <div className="flex justify-between">
//                         <p className="text-sm font-bold text-gray-900 uppercase">{addr.receiver.full_name}</p>
//                         {addr.is_default && <span className="px-2 py-0.5 text-[9px] font-bold text-emerald-800 uppercase bg-emerald-100 rounded">Utama</span>}
//                       </div>
//                       <p className="mt-2 text-sm leading-relaxed text-gray-600">
//                         {addr.details.address_location} - {addr.details.type} <br />
//                         {addr.details.city}, {addr.details.province} <br />
//                         {addr.details.region} - {addr.details.postal_code}
//                       </p>
//                     </div>
//                   </label>
//                 ))}
//               </div>
//             )}
//           </section>

//           {/* 2. SHIPPING METHOD */}
//           <section className={!selectedAddressId ? "opacity-50 pointer-events-none" : ""}>
//             <div className="flex items-center gap-4 mb-6">
//               <span className="flex items-center justify-center w-6 h-6 text-[10px] font-bold text-white rounded-full bg-gycora">2</span>
//               <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">Metode Pengiriman</h2>
//             </div>

//             <div className="space-y-4">
//               {/* Ambil di Toko */}
//               <label className={`relative flex items-center p-6 border rounded-2xl cursor-pointer transition-all ${shippingMethod === 'free' ? 'border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
//                 <input type="radio" value="free" checked={shippingMethod === 'free'} onChange={() => setShippingMethod('free')} className="w-5 h-5 border-gray-300 rounded-full text-gycora focus:ring-gycora" />
//                 <div className="flex items-center justify-between flex-grow ml-4">
//                   <div>
//                     <p className="text-sm font-bold tracking-wide text-gray-900 uppercase">Ambil Sendiri</p>
//                     <p className="mt-1 text-xs font-bold text-emerald-600">In-Store Pickup (Surabaya)</p>
//                   </div>
//                   <p className="font-black text-gycora">Gratis</p>
//                 </div>
//               </label>

//               {/* Biteship / Ekspedisi */}
//               <label className={`relative flex items-center p-6 border rounded-2xl cursor-pointer transition-all ${shippingMethod === 'biteship' ? 'border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
//                 <input type="radio" value="biteship" checked={shippingMethod === 'biteship'} onChange={() => setShippingMethod('biteship')} className="w-5 h-5 border-gray-300 rounded-full text-gycora focus:ring-gycora" />
//                 <div className="flex items-center justify-between flex-grow ml-4">
//                   <div>
//                     <p className="text-sm font-bold tracking-wide text-gray-900 uppercase">Reguler / Express</p>
//                     <p className="mt-1 text-xs text-gray-500">Dikirim via kurir pilihan Anda</p>
//                   </div>
//                 </div>
//               </label>

//               {/* Sub-menu Biteship */}
//               {shippingMethod === 'biteship' && (
//                 <div className="p-6 mt-4 space-y-8 bg-white border border-gray-200 rounded-3xl animate-fade-in">

//                   <h3 className="pt-2 text-sm font-bold tracking-widest text-gray-900 uppercase border-t border-gray-100">Pilih Ekspedisi</h3>

//                   {isLoadingRates ? (
//                     <p className="py-4 text-sm text-center text-gray-500 animate-pulse">Menghitung ongkos kirim...</p>
//                   ) : processedShippingRates.length === 0 ? (
//                     <p className="py-4 text-xs italic text-center text-red-500">Tidak ada kurir tersedia untuk alamat ini.</p>
//                   ) : (
//                     <div className="space-y-3">
//                       {processedShippingRates.map((rate, idx) => (
//                         <label key={idx} className={`relative flex flex-col p-4 border rounded-xl transition-all ${rate.is_disabled ? 'opacity-50 bg-gray-50 pointer-events-none' : selectedRate?.company === rate.company && selectedRate?.type === rate.type ? 'border-gycora bg-emerald-50/10 shadow-sm' : 'border-gray-200 hover:bg-gray-50 cursor-pointer'}`}>
//                           <div className="flex items-center w-full">
//                             <input type="radio" disabled={rate.is_disabled} checked={selectedRate?.company === rate.company && selectedRate?.type === rate.type} onChange={() => setSelectedRate(rate)} className="w-4 h-4 border-gray-300 text-gycora focus:ring-gycora" />
//                             <div className="flex items-center flex-grow gap-4 ml-4">
//                               <div className="flex items-center justify-center w-12 h-12 overflow-hidden bg-white border border-gray-100 rounded-lg shrink-0">

//                                 {/* LOGIKA GAMBAR KURIR */}
//                                 {!imageErrors[rate.company] && getCourierLogo(rate.company) ? (
//                                   <img
//                                     src={getCourierLogo(rate.company)!}
//                                     alt={rate.company}
//                                     className="object-contain w-full h-full p-1"
//                                     onError={() => handleImageError(rate.company)}
//                                   />
//                                 ) : (
//                                   <span className="text-[10px] font-black text-gray-400">{rate.company.toUpperCase()}</span>
//                                 )}

//                               </div>
//                               <div>
//                                 <p className="text-sm font-bold tracking-wide text-gray-800 uppercase">{rate.company} - {rate.type}</p>
//                                 <p className="text-[10px] text-gray-500 mt-0.5">{rate.courier_name} ({rate.duration})</p>
//                               </div>
//                             </div>
//                             <p className="text-sm font-black text-gray-900">{formatPrice(rate.price)}</p>
//                           </div>
//                           {rate.is_disabled && (
//                             <div className="px-3 py-1.5 mt-3 ml-8 text-[10px] font-bold tracking-widest text-red-600 uppercase bg-red-50 border border-red-100 rounded-lg">
//                               ⚠️ Tidak Tersedia: {rate.disable_reason}
//                             </div>
//                           )}
//                         </label>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </section>
//         </div>

//         {/* BAGIAN KANAN: RINGKASAN PESANAN */}
//         <div className="space-y-6 lg:w-[450px] xl:w-[480px] shrink-0">
//           <div className="sticky p-8 border border-gray-100 shadow-xl bg-gray-50 rounded-3xl top-28">
//             <h2 className="pb-4 mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">
//               Ringkasan Pesanan
//             </h2>

//             <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
//               {checkoutItems.map((item: any) => (
//                 <div key={item.id} className="flex gap-4">
//                   <img src={item.product.image_url} alt={item.product.name} className="object-cover w-16 h-16 bg-white border border-gray-100 rounded-xl shrink-0" />
//                   <div className="flex-grow">
//                     <p className="w-40 text-[11px] font-bold text-gray-900 uppercase truncate" title={item.product.name}>
//                       {item.product.name}
//                     </p>

//                     {/* BAGIAN WARNA DAN QTY YANG BARU */}
//                     {/* <div className="flex items-center gap-2 mt-0.5">
//                       <p className="text-[10px] text-gray-400">Qty: {item.quantity}</p>
//                       {item.color && (
//                         <>
//                           <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
//                           <div
//                             className="w-3 h-3 border border-gray-300 rounded-full shadow-sm"
//                             style={{ backgroundColor: item.color }}
//                             title="Varian Warna"
//                           ></div>
//                         </>
//                       )}
//                     </div> */}

//                     {/* BAGIAN WARNA DAN QTY YANG BARU */}
//                     <div className="flex items-center gap-2 mt-0.5">
//                       <p className="text-[10px] text-gray-400">Qty: {item.quantity}</p>
//                       {item.color && (
//                         (() => {
//                           let hex = item.color;
//                           let name = "";
//                           try {
//                             // Coba parse jika datanya berupa JSON String dari format baru
//                             const parsed = JSON.parse(item.color as string);
//                             if (parsed.hex) {
//                               hex = parsed.hex;
//                               name = parsed.name || "";
//                             }
//                           } catch {
//                             // Jika gagal parse, berarti datanya format jadul (hanya string hex)
//                           }

//                           return (
//                             <>
//                               <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
//                               <div className="flex items-center gap-1.5">
//                                 <div
//                                   className="w-3 h-3 border border-gray-300 rounded-full shadow-sm shrink-0"
//                                   style={{ backgroundColor: hex }}
//                                   title={name || hex}
//                                 ></div>
//                                 {name && <span className="text-[10px] font-bold text-gray-500 uppercase">{name}</span>}
//                               </div>
//                             </>
//                           );
//                         })()
//                       )}
//                     </div>

//                     <p className="mt-1 text-xs font-medium text-gycora">
//                       {formatPrice(item.gross_amount)}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="pt-4 space-y-3 text-sm border-t border-gray-200">
//               <div className="flex justify-between text-gray-500">
//                 <span>Total Items</span>
//                 <span className="font-bold text-gray-900">{checkoutCount} items</span>
//               </div>
//               <div className="flex justify-between text-gray-500">
//                 <span>Subtotal</span>
//                 <span>{formatPrice(checkoutTotalAmount)}</span>
//               </div>

//               {/* Promo Code */}
//               <div className="pt-4 mt-2 border-t border-gray-200 border-dashed">
//                 <label className="block mb-2 text-[10px] font-bold tracking-widest text-gray-900 uppercase">Kode Promo</label>
//                 <form onSubmit={applyPromo} className="flex gap-2">
//                   <input type="text" value={promoInput} onChange={(e) => setPromoInput(e.target.value)} disabled={!!appliedPromoCode || isVerifyingPromo} placeholder="Masukkan kode promo" className="flex-1 px-3 py-2 text-sm uppercase bg-white border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-gycora disabled:bg-gray-100" />
//                   {!appliedPromoCode ? (
//                     <button type="submit" disabled={!promoInput || isVerifyingPromo} className="flex items-center justify-center w-20 px-4 text-[10px] font-bold text-white uppercase transition rounded-lg bg-gycora hover:bg-gycora-dark disabled:bg-gray-300">
//                       {isVerifyingPromo ? "..." : "Apply"}
//                     </button>
//                   ) : (
//                     <button type="button" onClick={removePromo} className="w-20 px-4 text-[10px] font-bold text-red-600 uppercase transition border border-red-200 rounded-lg bg-red-50 hover:bg-red-100">Hapus</button>
//                   )}
//                 </form>
//                 {promoMessage && <p className={`mt-2 text-[10px] font-medium ${appliedPromoCode ? 'text-emerald-600' : 'text-red-500'}`}>{promoMessage}</p>}
//                 {appliedPromoCode && (
//                   <div className="flex items-center justify-between mt-2">
//                     <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Promo Applied</span>
//                     <span className="text-[11px] font-medium text-emerald-600">- {formatPrice(promoDiscountAmount)}</span>
//                   </div>
//                 )}
//               </div>

//               {/* Ongkos Kirim */}
//               <div className="flex items-start justify-between pt-4 text-gray-500">
//                 <span>Ongkos Kirim</span>
//                 {shippingMethod === 'free' ? (
//                   <span className="font-bold text-emerald-600">Gratis (Ambil di Toko)</span>
//                 ) : shippingMethod === 'biteship' && selectedRate ? (
//                   <div className="text-right">
//                     <span className="block font-medium text-gray-900">{formatPrice(selectedRate.price * checkoutCount)}</span>
//                     <p className="mt-1 text-[10px] text-gray-400">{formatPrice(selectedRate.price)} x {checkoutCount} item</p>
//                   </div>
//                 ) : (
//                   <span className="text-[10px] italic">Pilih metode</span>
//                 )}
//               </div>

//               <div className="flex justify-between pt-4 font-bold text-gray-900 border-t border-gray-200">
//                 <span className="mt-1 text-xs tracking-widest uppercase">Grand Total</span>
//                 <span className="text-xl text-gycora">{formatPrice(grandTotal)}</span>
//               </div>

//               <button onClick={handlePayment} disabled={isButtonDisabled} className="flex items-center justify-center w-full gap-3 py-4 mt-8 text-xs font-bold tracking-[0.3em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/10">
//                 {!isProcessing ? "Bayar Sekarang" : "Memproses..."}
//               </button>

//               {!selectedAddressId && <p className="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase">* Silakan pilih alamat pengiriman</p>}
//               {shippingMethod === 'biteship' && !selectedRate && <p className="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase">* Silakan pilih kurir pengiriman</p>}
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* ======================================================= */}
//       {/* MODAL FORM ALAMAT */}
//       {/* ======================================================= */}
//       {isAddressModalOpen && (
//         <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
//               <h3 className="text-lg font-bold text-gray-900">Tambah Alamat Baru</h3>
//               <button onClick={() => setIsAddressModalOpen(false)} className="text-gray-400 transition-colors hover:text-gray-900">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//             <form onSubmit={handleSubmitAddress} className="flex-1 p-6 space-y-6 overflow-y-auto">
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Nama Depan Penerima</label>
//                   <input
//                     type="text" required value={addressFormData.first_name_address}
//                     onChange={(e) => setAddressFormData({ ...addressFormData, first_name_address: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Nama Belakang Penerima</label>
//                   <input
//                     type="text" required value={addressFormData.last_name_address}
//                     onChange={(e) => setAddressFormData({ ...addressFormData, last_name_address: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">Label Alamat (Rumah/Kantor)</label>
//                 <select
//                   value={addressFormData.location_type}
//                   onChange={(e) => setAddressFormData({ ...addressFormData, location_type: e.target.value })}
//                   className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none bg-white"
//                 >
//                   <option value="home">Rumah</option>
//                   <option value="office">Kantor</option>
//                   <option value="other">Lainnya</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">Alamat Lengkap (Jalan, RT/RW, Patokan)</label>
//                 <textarea
//                   required rows={3} value={addressFormData.address_location}
//                   onChange={(e) => setAddressFormData({ ...addressFormData, address_location: e.target.value })}
//                   className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none resize-none"
//                 ></textarea>
//               </div>
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Provinsi</label>
//                   <input
//                     type="text" required value={addressFormData.province}
//                     onChange={(e) => setAddressFormData({ ...addressFormData, province: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Kota / Kabupaten</label>
//                   <input
//                     type="text" required value={addressFormData.city}
//                     onChange={(e) => setAddressFormData({ ...addressFormData, city: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Kecamatan / Region</label>
//                   <input
//                     type="text" required value={addressFormData.region}
//                     onChange={(e) => setAddressFormData({ ...addressFormData, region: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Kode Pos</label>
//                   <input
//                     type="text" required value={addressFormData.postal_code}
//                     onChange={(e) => setAddressFormData({ ...addressFormData, postal_code: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 p-4 mt-4 border rounded-lg bg-emerald-50 border-emerald-100">
//                 <input
//                   type="checkbox" id="is_default" checked={addressFormData.is_default}
//                   onChange={(e) => setAddressFormData({ ...addressFormData, is_default: e.target.checked })}
//                   className="w-5 h-5 rounded cursor-pointer text-gycora focus:ring-gycora accent-gycora"
//                 />
//                 <label htmlFor="is_default" className="text-sm font-bold cursor-pointer select-none text-emerald-800">
//                   Jadikan sebagai alamat utama
//                 </label>
//               </div>
//               <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
//                 <button
//                   type="button" onClick={() => setIsAddressModalOpen(false)}
//                   className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   Batal
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isSubmittingAddress}
//                   className="px-6 py-2.5 text-sm font-bold text-white bg-gray-900 hover:bg-black disabled:bg-gray-400 rounded-full shadow-lg transition-colors"
//                 >
//                   {isSubmittingAddress ? "Menyimpan..." : "Simpan Alamat"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../context/CartContext";
// import { BASE_URL } from "../../config/api";

// export default function PaymentPage() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { cartItems } = useCart();

//   const selectedItemIds: number[] = location.state?.selectedIds || [];

//   const [isPageLoading, setIsPageLoading] = useState(true);

//   // --- STATE ALAMAT ---
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [addresses, setAddresses] = useState<any[]>([]);
//   const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

//   // --- STATE PENGIRIMAN ---
//   const [shippingMethod, setShippingMethod] = useState("free");
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [selectedRate, setSelectedRate] = useState<any>(null);
//   const [isLoadingRates, setIsLoadingRates] = useState(false);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [rawShippingRates, setRawShippingRates] = useState<any[]>([]);

//   const [deliveryDate, setDeliveryDate] = useState("");
//   const [deliveryTime, setDeliveryTime] = useState("");

//   // --- STATE DISKON ---
//   const [promoInput, setPromoInput] = useState("");
//   const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
//   const [promoDiscountAmount, setPromoDiscountAmount] = useState(0);
//   const [promoMessage, setPromoMessage] = useState("");
//   const [isVerifyingPromo, setIsVerifyingPromo] = useState(false);

//   const [isProcessing, setIsProcessing] = useState(false);

//   // --- STATE IMAGE ERRORS (UNTUK LOGO KURIR) ---
//   const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

//   // --- STATE MODAL TAMBAH ALAMAT ---
//   const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
//   const [isSubmittingAddress, setIsSubmittingAddress] = useState(false);
//   const [addressFormData, setAddressFormData] = useState({
//     region: "",
//     first_name_address: "",
//     last_name_address: "",
//     address_location: "",
//     city: "",
//     province: "",
//     postal_code: "",
//     location_type: "home",
//     latitude: "",
//     longitude: "",
//     is_default: false,
//   });

//   // --- PERHITUNGAN KERANJANG (HANYA ITEM TERPILIH) ---
//   const checkoutItems = useMemo(() => {
//     return cartItems.filter((item) => selectedItemIds.includes(item.id));
//   }, [cartItems, selectedItemIds]);

//   const checkoutCount = useMemo(() => {
//     return checkoutItems.reduce((sum, item) => sum + item.quantity, 0);
//   }, [checkoutItems]);

//   const checkoutTotalAmount = useMemo(() => {
//     return checkoutItems.reduce((sum, item) => sum + Number(item.gross_amount), 0);
//   }, [checkoutItems]);

//   const grandTotal = useMemo(() => {
//     let total = checkoutTotalAmount;
//     if (shippingMethod === "biteship" && selectedRate) {
//       total += parseFloat(selectedRate.price) * checkoutCount;
//     }
//     return total - promoDiscountAmount;
//   }, [checkoutTotalAmount, shippingMethod, selectedRate, checkoutCount, promoDiscountAmount]);

//   const fetchAddresses = async (token: string) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/addresses`, {
//         headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//       });
//       if (res.ok) {
//         const data = await res.json();
//         const addrArray = data.data ? data.data : data;
//         setAddresses(addrArray || []);

//         if (addrArray && addrArray.length > 0) {
//           // Pilih alamat default, atau alamat pertama jika tidak ada yang default
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           const defaultAddr = addrArray.find((a: any) => a.is_default);
//           setSelectedAddressId(defaultAddr ? defaultAddr.id : addrArray[0].id);
//         } else {
//           setSelectedAddressId(null);
//         }
//       }
//     } catch (err) {
//       console.error("Gagal mengambil alamat:", err);
//     }
//   };

//   useEffect(() => {
//     // PROTEKSI: Jika tidak ada item yang dipilih, tendang ke Cart
//     if (selectedItemIds.length === 0) {
//       Swal.fire({
//         toast: true, position: 'top-end', icon: 'warning',
//         title: 'Pilih item terlebih dahulu', showConfirmButton: false, timer: 2000
//       });
//       navigate('/cart');
//       return;
//     }

//     const loadData = async () => {
//       const token = localStorage.getItem("user_token");
//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       await fetchAddresses(token);

//       const now = new Date();
//       now.setHours(now.getHours() + 1);
//       setDeliveryDate(now.toISOString().split("T")[0]);
//       setDeliveryTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
//       setIsPageLoading(false);
//     };

//     loadData();
//   }, [navigate, selectedItemIds.length]);

//   // --- FETCH SHIPPING RATES ---
//   useEffect(() => {
//     if (selectedAddressId && selectedItemIds.length > 0 && shippingMethod === 'biteship') {
//       const getRates = async () => {
//         setIsLoadingRates(true);
//         setSelectedRate(null);
//         setRawShippingRates([]);
//         try {
//           const token = localStorage.getItem("user_token");
//           const res = await fetch(`${BASE_URL}/api/shipping/rates`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
//             body: JSON.stringify({ address_id: selectedAddressId, cart_ids: selectedItemIds })
//           });
//           if (res.ok) {
//             const data = await res.json();
//             if (data.pricing) setRawShippingRates(data.pricing);
//           }
//         } catch (err) {
//           console.error("Gagal menghitung ongkir:", err);
//           Swal.fire({ toast: true, position: "top-end", icon: "error", title: "Gagal menghitung ongkir.", showConfirmButton: false, timer: 3000 });
//         } finally {
//           setIsLoadingRates(false);
//         }
//       };
//       getRates();
//     }
//   }, [selectedAddressId, selectedItemIds, shippingMethod]);

//   // Logika Filter Ongkir (Biteship)
//   const processedShippingRates = useMemo(() => {
//     if (!rawShippingRates || rawShippingRates.length === 0) return [];
//     return rawShippingRates.map((rate) => {
//       return { ...rate, is_disabled: false, disable_reason: "" };
//     }).sort((a, b) => (a.is_disabled === b.is_disabled ? 0 : a.is_disabled ? 1 : -1));
//   }, [rawShippingRates]);

//   // --- HANDLERS DISKON & PEMBAYARAN ---
//   const applyPromo = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!promoInput) return;
//     setIsVerifyingPromo(true);
//     try {
//       const token = localStorage.getItem("user_token");
//       const res = await fetch(`${BASE_URL}/api/promo/verify`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
//         body: JSON.stringify({ promo_code: promoInput })
//       });
//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || "Promo tidak valid");
//       if (checkoutTotalAmount < 50000) throw new Error("Minimum belanja Rp 50.000");

//       setAppliedPromoCode(promoInput.toUpperCase());
//       setPromoDiscountAmount(Math.min(data.discount_value, checkoutTotalAmount));
//       setPromoMessage("✅ " + data.message);
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err: any) {
//       setAppliedPromoCode(null);
//       setPromoDiscountAmount(0);
//       setPromoMessage("❌ " + err.message);
//     } finally {
//       setIsVerifyingPromo(false);
//     }
//   };

//   const removePromo = () => {
//     setPromoInput(""); setAppliedPromoCode(null); setPromoDiscountAmount(0); setPromoMessage("");
//   };

//   const handlePayment = async () => {
//     setIsProcessing(true);
//     try {
//       const token = localStorage.getItem("user_token");
//       const payload = {
//         address_id: selectedAddressId,
//         shipping_method: shippingMethod,
//         use_points: 0,
//         cart_ids: selectedItemIds,
//         courier_company: shippingMethod === "biteship" ? selectedRate?.company : null,
//         courier_type: shippingMethod === "biteship" ? selectedRate?.type : null,
//         shipping_cost: shippingMethod === "biteship" ? selectedRate?.price : null,
//         delivery_type: shippingMethod === "biteship" ? "now" : null,
//         delivery_date: shippingMethod === "biteship" ? deliveryDate : null,
//         delivery_time: shippingMethod === "biteship" ? deliveryTime : null,
//         promo_code: appliedPromoCode,
//       };

//       const res = await fetch(`${BASE_URL}/api/checkout`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
//         body: JSON.stringify(payload)
//       });
//       const data = await res.json();

//       if (res.ok && data.checkout_url) {
//         window.location.href = data.checkout_url;
//       } else {
//         throw new Error(data.message || "Gagal membuat tagihan");
//       }
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err: any) {
//       Swal.fire("Error", err.message, "error");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const formatPrice = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
//   };

//   // --- LOGO HELPER ---
//   const handleImageError = (company: string) => {
//     setImageErrors((prev) => ({ ...prev, [company]: true }));
//   };

//   const getCourierLogo = (company: string) => {
//     if (!company) return null;
//     const baseUrl = "/courier_images/";
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
//     const logo = map[company.toLowerCase()];
//     return logo ? baseUrl + logo : null;
//   };

//   // --- HANDLERS MODAL TAMBAH ALAMAT ---
//   const handleOpenAddressModal = () => {
//     // Jika belum ada alamat sama sekali, paksa jadi alamat utama
//     const isFirstAddress = addresses.length === 0;

//     setAddressFormData({
//       region: "",
//       first_name_address: "",
//       last_name_address: "",
//       address_location: "",
//       city: "",
//       province: "",
//       postal_code: "",
//       location_type: "home",
//       latitude: "",
//       longitude: "",
//       is_default: isFirstAddress,
//     });
//     setIsAddressModalOpen(true);
//   };

//   const handleSubmitAddress = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmittingAddress(true);
//     const token = localStorage.getItem("user_token");

//     try {
//       const res = await fetch(`${BASE_URL}/api/addresses`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json"
//         },
//         body: JSON.stringify(addressFormData),
//       });

//       if (res.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Berhasil!",
//           text: "Alamat baru telah ditambahkan.",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         setIsAddressModalOpen(false);
//         // Refresh daftar alamat agar langsung muncul dan otomatis terpilih
//         await fetchAddresses(token!);
//       } else {
//         throw new Error("Gagal menyimpan alamat");
//       }
//     } catch (error) {
//       console.error("Gagal submit alamat:", error);
//       Swal.fire("Error", "Terjadi kesalahan saat menyimpan data alamat", "error");
//     } finally {
//       setIsSubmittingAddress(false);
//     }
//   };

//   const isButtonDisabled = isProcessing || checkoutItems.length === 0 || !selectedAddressId ||
//     (shippingMethod === "biteship" && !selectedRate);

//   if (isPageLoading) {
//     return (
//       <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
//         <div className="flex gap-2 mb-4">
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-1"></div>
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-2"></div>
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-3"></div>
//         </div>
//         <p className="font-serif text-sm italic tracking-widest text-gray-500 animate-pulse">
//           Mempersiapkan checkout Anda...
//         </p>
//       </div>
//     );
//   }

//   if (checkoutItems.length === 0) {
//     return (
//       <div className="min-h-screen px-6 py-12 mx-auto font-sans md:py-24 max-w-[1440px] animate-fade-in">
//         <div className="py-20 text-center">
//           <h2 className="mb-4 text-3xl font-extrabold text-gray-900">Tidak ada item dipilih</h2>
//           <button onClick={() => navigate('/cart')} className="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase rounded-full bg-gycora hover:bg-gycora-dark">
//             Kembali ke Keranjang
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen px-6 py-12 mx-auto font-sans md:py-24 max-w-[1440px] animate-fade-in relative">
//       <h1 className="mb-12 text-3xl font-extrabold tracking-tighter text-gray-900 uppercase md:text-4xl">
//         Checkout
//       </h1>

//       <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">

//         {/* BAGIAN KIRI: FORM PENGIRIMAN */}
//         <div className="flex-grow space-y-12">

//           {/* 1. ADDRESS */}
//           <section>
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-4">
//                 <span className="flex items-center justify-center w-6 h-6 text-[10px] font-bold text-white rounded-full bg-gycora">1</span>
//                 <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">Alamat Pengiriman</h2>
//               </div>
//               {/* Tombol Tambah Alamat dipindah ke header jika sudah ada alamat */}
//               {addresses.length > 0 && (
//                 <button
//                   onClick={handleOpenAddressModal}
//                   className="text-xs font-bold transition-colors text-emerald-600 hover:text-emerald-800"
//                 >
//                   + Tambah Alamat
//                 </button>
//               )}
//             </div>

//             {addresses.length === 0 ? (
//               <div className="py-10 text-center border border-gray-300 border-dashed bg-gray-50 rounded-2xl">
//                 <p className="mb-2 text-sm italic text-gray-500">Belum ada alamat tersimpan.</p>
//                 <button
//                   onClick={handleOpenAddressModal}
//                   className="px-6 py-2 mt-2 text-xs font-bold tracking-widest text-white uppercase transition-colors rounded-full shadow-md bg-gycora hover:bg-gycora-dark"
//                 >
//                   + Tambah Alamat Baru
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {addresses.map((addr) => (
//                   <label key={addr.id} className={`relative flex items-start p-6 border rounded-2xl cursor-pointer transition-all ${selectedAddressId === addr.id ? 'border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
//                     <input type="radio" name="address" value={addr.id} checked={selectedAddressId === addr.id} onChange={() => setSelectedAddressId(addr.id)} className="w-5 h-5 mt-1 border-gray-300 rounded-full text-gycora focus:ring-gycora" />
//                     <div className="flex-grow ml-4">
//                       <div className="flex justify-between">
//                         <p className="text-sm font-bold text-gray-900 uppercase">{addr.receiver.full_name}</p>
//                         {addr.is_default && <span className="px-2 py-0.5 text-[9px] font-bold text-emerald-800 uppercase bg-emerald-100 rounded">Utama</span>}
//                       </div>
//                       <p className="mt-2 text-sm leading-relaxed text-gray-600">
//                         {addr.details.address_location} - {addr.details.type} <br />
//                         {addr.details.city}, {addr.details.province} <br />
//                         {addr.details.region} - {addr.details.postal_code}
//                       </p>
//                     </div>
//                   </label>
//                 ))}
//               </div>
//             )}
//           </section>

//           {/* 2. SHIPPING METHOD */}
//           <section className={!selectedAddressId ? "opacity-50 pointer-events-none" : ""}>
//             <div className="flex items-center gap-4 mb-6">
//               <span className="flex items-center justify-center w-6 h-6 text-[10px] font-bold text-white rounded-full bg-gycora">2</span>
//               <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">Metode Pengiriman</h2>
//             </div>

//             <div className="space-y-4">
//               {/* Ambil di Toko */}
//               <label className={`relative flex items-center p-6 border rounded-2xl cursor-pointer transition-all ${shippingMethod === 'free' ? 'border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
//                 <input type="radio" value="free" checked={shippingMethod === 'free'} onChange={() => setShippingMethod('free')} className="w-5 h-5 border-gray-300 rounded-full text-gycora focus:ring-gycora" />
//                 <div className="flex items-center justify-between flex-grow ml-4">
//                   <div>
//                     <p className="text-sm font-bold tracking-wide text-gray-900 uppercase">Ambil Sendiri</p>
//                     <p className="mt-1 text-xs font-bold text-emerald-600">In-Store Pickup (Surabaya)</p>
//                   </div>
//                   <p className="font-black text-gycora">Gratis</p>
//                 </div>
//               </label>

//               {/* Biteship / Ekspedisi */}
//               <label className={`relative flex items-center p-6 border rounded-2xl cursor-pointer transition-all ${shippingMethod === 'biteship' ? 'border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
//                 <input type="radio" value="biteship" checked={shippingMethod === 'biteship'} onChange={() => setShippingMethod('biteship')} className="w-5 h-5 border-gray-300 rounded-full text-gycora focus:ring-gycora" />
//                 <div className="flex items-center justify-between flex-grow ml-4">
//                   <div>
//                     <p className="text-sm font-bold tracking-wide text-gray-900 uppercase">Reguler / Express</p>
//                     <p className="mt-1 text-xs text-gray-500">Dikirim via kurir pilihan Anda</p>
//                   </div>
//                 </div>
//               </label>

//               {/* Sub-menu Biteship */}
//               {shippingMethod === 'biteship' && (
//                 <div className="p-6 mt-4 space-y-8 bg-white border border-gray-200 rounded-3xl animate-fade-in">

//                   <h3 className="pt-2 text-sm font-bold tracking-widest text-gray-900 uppercase border-t border-gray-100">Pilih Ekspedisi</h3>

//                   {isLoadingRates ? (
//                     <p className="py-4 text-sm text-center text-gray-500 animate-pulse">Menghitung ongkos kirim...</p>
//                   ) : processedShippingRates.length === 0 ? (
//                     <p className="py-4 text-xs italic text-center text-red-500">Tidak ada kurir tersedia untuk alamat ini.</p>
//                   ) : (
//                     <div className="space-y-3">
//                       {processedShippingRates.map((rate, idx) => (
//                         <label key={idx} className={`relative flex flex-col p-4 border rounded-xl transition-all ${rate.is_disabled ? 'opacity-50 bg-gray-50 pointer-events-none' : selectedRate?.company === rate.company && selectedRate?.type === rate.type ? 'border-gycora bg-emerald-50/10 shadow-sm' : 'border-gray-200 hover:bg-gray-50 cursor-pointer'}`}>
//                           <div className="flex items-center w-full">
//                             <input type="radio" disabled={rate.is_disabled} checked={selectedRate?.company === rate.company && selectedRate?.type === rate.type} onChange={() => setSelectedRate(rate)} className="w-4 h-4 border-gray-300 text-gycora focus:ring-gycora" />
//                             <div className="flex items-center flex-grow gap-4 ml-4">
//                               <div className="flex items-center justify-center w-12 h-12 overflow-hidden bg-white border border-gray-100 rounded-lg shrink-0">

//                                 {/* LOGIKA GAMBAR KURIR */}
//                                 {!imageErrors[rate.company] && getCourierLogo(rate.company) ? (
//                                   <img
//                                     src={getCourierLogo(rate.company)!}
//                                     alt={rate.company}
//                                     className="object-contain w-full h-full p-1"
//                                     onError={() => handleImageError(rate.company)}
//                                   />
//                                 ) : (
//                                   <span className="text-[10px] font-black text-gray-400">{rate.company.toUpperCase()}</span>
//                                 )}

//                               </div>
//                               <div>
//                                 <p className="text-sm font-bold tracking-wide text-gray-800 uppercase">{rate.company} - {rate.type}</p>
//                                 <p className="text-[10px] text-gray-500 mt-0.5">{rate.courier_name} ({rate.duration})</p>
//                               </div>
//                             </div>
//                             <p className="text-sm font-black text-gray-900">{formatPrice(rate.price)}</p>
//                           </div>
//                           {rate.is_disabled && (
//                             <div className="px-3 py-1.5 mt-3 ml-8 text-[10px] font-bold tracking-widest text-red-600 uppercase bg-red-50 border border-red-100 rounded-lg">
//                               ⚠️ Tidak Tersedia: {rate.disable_reason}
//                             </div>
//                           )}
//                         </label>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </section>
//         </div>

//         {/* BAGIAN KANAN: RINGKASAN PESANAN */}
//         <div className="space-y-6 lg:w-[450px] xl:w-[480px] shrink-0">
//           <div className="sticky p-8 border border-gray-100 shadow-xl bg-gray-50 rounded-3xl top-28">
//             <h2 className="pb-4 mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">
//               Ringkasan Pesanan
//             </h2>

//             <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
//               {checkoutItems.map((item: any) => {
//                 // [PERBAIKAN] Coba Parse JSON untuk Varian Warna
//                 let colorHex = item.color;
//                 let colorName = "";
//                 try {
//                   const parsed = JSON.parse(item.color as string);
//                   if (parsed.hex) {
//                     colorHex = parsed.hex;
//                     colorName = parsed.name || "";
//                   }
//                 } catch {
//                   // Fallback jika item.color hanyalah string hex jadul
//                 }

//                 return (
//                   <div key={item.id} className="flex gap-4">
//                     <img src={item.product.image_url} alt={item.product.name} className="object-cover w-16 h-16 bg-white border border-gray-100 rounded-xl shrink-0" />
//                     <div className="flex-grow">
//                       <p className="w-40 text-[11px] font-bold text-gray-900 uppercase truncate" title={item.product.name}>
//                         {item.product.name}
//                       </p>

//                       {/* [PERBAIKAN] TAMPILAN WARNA DI RINGKASAN */}
//                       <div className="flex items-center gap-2 mt-0.5">
//                         <p className="text-[10px] text-gray-400">Qty: {item.quantity}</p>
//                         {item.color && (
//                           <>
//                             <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
//                             <div className="flex items-center gap-1.5">
//                               <div
//                                 className="w-3 h-3 border border-gray-300 rounded-full shadow-sm shrink-0"
//                                 style={{ backgroundColor: colorHex }}
//                                 title={colorName || colorHex}
//                               ></div>
//                               {colorName && <span className="text-[10px] font-bold text-gray-500 uppercase">{colorName}</span>}
//                             </div>
//                           </>
//                         )}
//                       </div>

//                       <p className="mt-1 text-xs font-medium text-gycora">
//                         {formatPrice(item.gross_amount)}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="pt-4 space-y-3 text-sm border-t border-gray-200">
//               <div className="flex justify-between text-gray-500">
//                 <span>Total Items</span>
//                 <span className="font-bold text-gray-900">{checkoutCount} items</span>
//               </div>
//               <div className="flex justify-between text-gray-500">
//                 <span>Subtotal</span>
//                 <span>{formatPrice(checkoutTotalAmount)}</span>
//               </div>

//               {/* Promo Code */}
//               <div className="pt-4 mt-2 border-t border-gray-200 border-dashed">
//                 <label className="block mb-2 text-[10px] font-bold tracking-widest text-gray-900 uppercase">Kode Promo</label>
//                 <form onSubmit={applyPromo} className="flex gap-2">
//                   <input type="text" value={promoInput} onChange={(e) => setPromoInput(e.target.value)} disabled={!!appliedPromoCode || isVerifyingPromo} placeholder="Masukkan kode promo" className="flex-1 px-3 py-2 text-sm uppercase bg-white border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-gycora disabled:bg-gray-100" />
//                   {!appliedPromoCode ? (
//                     <button type="submit" disabled={!promoInput || isVerifyingPromo} className="flex items-center justify-center w-20 px-4 text-[10px] font-bold text-white uppercase transition rounded-lg bg-gycora hover:bg-gycora-dark disabled:bg-gray-300">
//                       {isVerifyingPromo ? "..." : "Apply"}
//                     </button>
//                   ) : (
//                     <button type="button" onClick={removePromo} className="w-20 px-4 text-[10px] font-bold text-red-600 uppercase transition border border-red-200 rounded-lg bg-red-50 hover:bg-red-100">Hapus</button>
//                   )}
//                 </form>
//                 {promoMessage && <p className={`mt-2 text-[10px] font-medium ${appliedPromoCode ? 'text-emerald-600' : 'text-red-500'}`}>{promoMessage}</p>}
//                 {appliedPromoCode && (
//                   <div className="flex items-center justify-between mt-2">
//                     <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Promo Applied</span>
//                     <span className="text-[11px] font-medium text-emerald-600">- {formatPrice(promoDiscountAmount)}</span>
//                   </div>
//                 )}
//               </div>

//               {/* Ongkos Kirim */}
//               <div className="flex items-start justify-between pt-4 text-gray-500">
//                 <span>Ongkos Kirim</span>
//                 {shippingMethod === 'free' ? (
//                   <span className="font-bold text-emerald-600">Gratis (Ambil di Toko)</span>
//                 ) : shippingMethod === 'biteship' && selectedRate ? (
//                   <div className="text-right">
//                     <span className="block font-medium text-gray-900">{formatPrice(selectedRate.price * checkoutCount)}</span>
//                     <p className="mt-1 text-[10px] text-gray-400">{formatPrice(selectedRate.price)} x {checkoutCount} item</p>
//                   </div>
//                 ) : (
//                   <span className="text-[10px] italic">Pilih metode</span>
//                 )}
//               </div>

//               <div className="flex justify-between pt-4 font-bold text-gray-900 border-t border-gray-200">
//                 <span className="mt-1 text-xs tracking-widest uppercase">Grand Total</span>
//                 <span className="text-xl text-gycora">{formatPrice(grandTotal)}</span>
//               </div>

//               <button onClick={handlePayment} disabled={isButtonDisabled} className="flex items-center justify-center w-full gap-3 py-4 mt-8 text-xs font-bold tracking-[0.3em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/10">
//                 {!isProcessing ? "Bayar Sekarang" : "Memproses..."}
//               </button>

//               {!selectedAddressId && <p className="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase">* Silakan pilih alamat pengiriman</p>}
//               {shippingMethod === 'biteship' && !selectedRate && <p className="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase">* Silakan pilih kurir pengiriman</p>}
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* ======================================================= */}
//       {/* MODAL FORM ALAMAT */}
//       {/* ======================================================= */}
//       {isAddressModalOpen && (
//         <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
//               <h3 className="text-lg font-bold text-gray-900">Tambah Alamat Baru</h3>
//               <button onClick={() => setIsAddressModalOpen(false)} className="text-gray-400 transition-colors hover:text-gray-900">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//             <form onSubmit={handleSubmitAddress} className="flex-1 p-6 space-y-6 overflow-y-auto">
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Nama Depan Penerima</label>
//                   <input
//                     type="text" required value={addressFormData.first_name_address}
//                     onChange={(e) => setAddressFormData({ ...addressFormData, first_name_address: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Nama Belakang Penerima</label>
//                   <input
//                     type="text" required value={addressFormData.last_name_address}
//                     onChange={(e) => setAddressFormData({ ...addressFormData, last_name_address: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">Label Alamat (Rumah/Kantor)</label>
//                 <select
//                   value={addressFormData.location_type}
//                   onChange={(e) => setAddressFormData({ ...addressFormData, location_type: e.target.value })}
//                   className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none bg-white"
//                 >
//                   <option value="home">Rumah</option>
//                   <option value="office">Kantor</option>
//                   <option value="other">Lainnya</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">Alamat Lengkap (Jalan, RT/RW, Patokan)</label>
//                 <textarea
//                   required rows={3} value={addressFormData.address_location}
//                   onChange={(e) => setAddressFormData({ ...addressFormData, address_location: e.target.value })}
//                   className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none resize-none"
//                 ></textarea>
//               </div>
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Provinsi</label>
//                   <input
//                     type="text" required value={addressFormData.province}
//                     onChange={(e) => setAddressFormData({ ...addressFormData, province: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Kota / Kabupaten</label>
//                   <input
//                     type="text" required value={addressFormData.city}
//                     onChange={(e) => setAddressFormData({ ...addressFormData, city: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Kecamatan / Region</label>
//                   <input
//                     type="text" required value={addressFormData.region}
//                     onChange={(e) => setAddressFormData({ ...addressFormData, region: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Kode Pos</label>
//                   <input
//                     type="text" required value={addressFormData.postal_code}
//                     onChange={(e) => setAddressFormData({ ...addressFormData, postal_code: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 p-4 mt-4 border rounded-lg bg-emerald-50 border-emerald-100">
//                 <input
//                   type="checkbox" id="is_default" checked={addressFormData.is_default}
//                   onChange={(e) => setAddressFormData({ ...addressFormData, is_default: e.target.checked })}
//                   className="w-5 h-5 rounded cursor-pointer text-gycora focus:ring-gycora accent-gycora"
//                 />
//                 <label htmlFor="is_default" className="text-sm font-bold cursor-pointer select-none text-emerald-800">
//                   Jadikan sebagai alamat utama
//                 </label>
//               </div>
//               <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
//                 <button
//                   type="button" onClick={() => setIsAddressModalOpen(false)}
//                   className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   Batal
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isSubmittingAddress}
//                   className="px-6 py-2.5 text-sm font-bold text-white bg-gray-900 hover:bg-black disabled:bg-gray-400 rounded-full shadow-lg transition-colors"
//                 >
//                   {isSubmittingAddress ? "Menyimpan..." : "Simpan Alamat"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../context/CartContext";
// import { BASE_URL } from "../../config/api";

// export default function PaymentPage() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { cartItems } = useCart();

//   const selectedItemIds: number[] = location.state?.selectedIds || [];

//   const [isPageLoading, setIsPageLoading] = useState(true);

//   // --- STATE ALAMAT ---
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [addresses, setAddresses] = useState<any[]>([]);
//   const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

//   // --- STATE PENGIRIMAN ---
//   const [shippingMethod, setShippingMethod] = useState("free");
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [selectedRate, setSelectedRate] = useState<any>(null);
//   const [isLoadingRates, setIsLoadingRates] = useState(false);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [rawShippingRates, setRawShippingRates] = useState<any[]>([]);

//   const [deliveryDate, setDeliveryDate] = useState("");
//   const [deliveryTime, setDeliveryTime] = useState("");

//   // --- STATE DISKON PROMO ---
//   const [promoInput, setPromoInput] = useState("");
//   const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
//   const [promoDiscountAmount, setPromoDiscountAmount] = useState(0);
//   const [promoMessage, setPromoMessage] = useState("");
//   const [isVerifyingPromo, setIsVerifyingPromo] = useState(false);

//   // --- STATE LOYALTY POINTS (BARU) ---
//   const [availablePoints, setAvailablePoints] = useState(0);
//   const [isUsingPoints, setIsUsingPoints] = useState(false);

//   const [isProcessing, setIsProcessing] = useState(false);

//   // --- STATE IMAGE ERRORS ---
//   const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

//   // --- STATE MODAL TAMBAH ALAMAT ---
//   const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
//   const [isSubmittingAddress, setIsSubmittingAddress] = useState(false);
//   const [addressFormData, setAddressFormData] = useState({
//     region: "",
//     first_name_address: "",
//     last_name_address: "",
//     address_location: "",
//     city: "",
//     province: "",
//     postal_code: "",
//     location_type: "home",
//     latitude: "",
//     longitude: "",
//     is_default: false,
//   });

//   // --- PERHITUNGAN KERANJANG ---
//   const checkoutItems = useMemo(() => {
//     return cartItems.filter((item) => selectedItemIds.includes(item.id));
//   }, [cartItems, selectedItemIds]);

//   const checkoutCount = useMemo(() => {
//     return checkoutItems.reduce((sum, item) => sum + item.quantity, 0);
//   }, [checkoutItems]);

//   const checkoutTotalAmount = useMemo(() => {
//     return checkoutItems.reduce((sum, item) => sum + Number(item.gross_amount), 0);
//   }, [checkoutItems]);

//   // --- KALKULASI POIN DINAMIS (BARU) ---
//   const { appliedPointDiscount, pointsUsed } = useMemo(() => {
//     if (!isUsingPoints || availablePoints <= 0) return { appliedPointDiscount: 0, pointsUsed: 0 };

//     // Nilai konversi: 1 Poin = Rp 1.000
//     const pointsValueInRupiah = availablePoints * 1000;

//     // Maksimal yang bisa didiskon adalah Subtotal dikurangi Promo Code
//     const maxUsableAmount = Math.max(0, checkoutTotalAmount - promoDiscountAmount);

//     // Potongan aktual tidak boleh melebihi sisa tagihan barang
//     const actualDiscount = Math.min(pointsValueInRupiah, maxUsableAmount);
//     const actualPointsUsed = actualDiscount / 1000;

//     return { appliedPointDiscount: actualDiscount, pointsUsed: actualPointsUsed };
//   }, [isUsingPoints, availablePoints, checkoutTotalAmount, promoDiscountAmount]);

//   const grandTotal = useMemo(() => {
//     let total = checkoutTotalAmount;
//     if (shippingMethod === "biteship" && selectedRate) {
//       total += parseFloat(selectedRate.price) * checkoutCount;
//     }
//     // Kurangi promo dan poin
//     return total - promoDiscountAmount - appliedPointDiscount;
//   }, [checkoutTotalAmount, shippingMethod, selectedRate, checkoutCount, promoDiscountAmount, appliedPointDiscount]);

//   const fetchAddresses = async (token: string) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/addresses`, {
//         headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//       });
//       if (res.ok) {
//         const data = await res.json();
//         const addrArray = data.data ? data.data : data;
//         setAddresses(addrArray || []);

//         if (addrArray && addrArray.length > 0) {
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           const defaultAddr = addrArray.find((a: any) => a.is_default);
//           setSelectedAddressId(defaultAddr ? defaultAddr.id : addrArray[0].id);
//         } else {
//           setSelectedAddressId(null);
//         }
//       }
//     } catch (err) {
//       console.error("Gagal mengambil alamat:", err);
//     }
//   };

//   useEffect(() => {
//     // PROTEKSI: Jika tidak ada item yang dipilih, tendang ke Cart
//     if (selectedItemIds.length === 0) {
//       Swal.fire({
//         toast: true, position: 'top-end', icon: 'warning',
//         title: 'Pilih item terlebih dahulu', showConfirmButton: false, timer: 2000
//       });
//       navigate('/cart');
//       return;
//     }

//     const loadData = async () => {
//       const token = localStorage.getItem("user_token");
//       const userStr = localStorage.getItem("user_data");

//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       // Mengambil poin dari data user di localStorage
//       if (userStr) {
//         const user = JSON.parse(userStr);
//         setAvailablePoints(user.point || 0);
//       }

//       await fetchAddresses(token);

//       const now = new Date();
//       now.setHours(now.getHours() + 1);
//       setDeliveryDate(now.toISOString().split("T")[0]);
//       setDeliveryTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
//       setIsPageLoading(false);
//     };

//     loadData();
//   }, [navigate, selectedItemIds.length]);

//   // --- FETCH SHIPPING RATES ---
//   useEffect(() => {
//     if (selectedAddressId && selectedItemIds.length > 0 && shippingMethod === 'biteship') {
//       const getRates = async () => {
//         setIsLoadingRates(true);
//         setSelectedRate(null);
//         setRawShippingRates([]);
//         try {
//           const token = localStorage.getItem("user_token");
//           const res = await fetch(`${BASE_URL}/api/shipping/rates`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
//             body: JSON.stringify({ address_id: selectedAddressId, cart_ids: selectedItemIds })
//           });
//           if (res.ok) {
//             const data = await res.json();
//             if (data.pricing) setRawShippingRates(data.pricing);
//           }
//         } catch (err) {
//           console.error("Gagal menghitung ongkir:", err);
//           Swal.fire({ toast: true, position: "top-end", icon: "error", title: "Gagal menghitung ongkir.", showConfirmButton: false, timer: 3000 });
//         } finally {
//           setIsLoadingRates(false);
//         }
//       };
//       getRates();
//     }
//   }, [selectedAddressId, selectedItemIds, shippingMethod]);

//   const processedShippingRates = useMemo(() => {
//     if (!rawShippingRates || rawShippingRates.length === 0) return [];
//     return rawShippingRates.map((rate) => {
//       return { ...rate, is_disabled: false, disable_reason: "" };
//     }).sort((a, b) => (a.is_disabled === b.is_disabled ? 0 : a.is_disabled ? 1 : -1));
//   }, [rawShippingRates]);

//   // --- HANDLERS DISKON & PEMBAYARAN ---
//   const applyPromo = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!promoInput) return;
//     setIsVerifyingPromo(true);
//     try {
//       const token = localStorage.getItem("user_token");
//       const res = await fetch(`${BASE_URL}/api/promo/verify`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
//         body: JSON.stringify({ promo_code: promoInput })
//       });
//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || "Promo tidak valid");
//       if (checkoutTotalAmount < 50000) throw new Error("Minimum belanja Rp 50.000");

//       setAppliedPromoCode(promoInput.toUpperCase());
//       setPromoDiscountAmount(Math.min(data.discount_value, checkoutTotalAmount));
//       setPromoMessage("✅ " + data.message);
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err: any) {
//       setAppliedPromoCode(null);
//       setPromoDiscountAmount(0);
//       setPromoMessage("❌ " + err.message);
//     } finally {
//       setIsVerifyingPromo(false);
//     }
//   };

//   const removePromo = () => {
//     setPromoInput(""); setAppliedPromoCode(null); setPromoDiscountAmount(0); setPromoMessage("");
//   };

//   const handlePayment = async () => {
//     setIsProcessing(true);
//     try {
//       const token = localStorage.getItem("user_token");
//       const payload = {
//         address_id: selectedAddressId,
//         shipping_method: shippingMethod,
//         use_points: pointsUsed, // DIUBAH: Mengirim jumlah poin yang terpakai ke backend
//         cart_ids: selectedItemIds,
//         courier_company: shippingMethod === "biteship" ? selectedRate?.company : null,
//         courier_type: shippingMethod === "biteship" ? selectedRate?.type : null,
//         shipping_cost: shippingMethod === "biteship" ? selectedRate?.price : null,
//         delivery_type: shippingMethod === "biteship" ? "now" : null,
//         delivery_date: shippingMethod === "biteship" ? deliveryDate : null,
//         delivery_time: shippingMethod === "biteship" ? deliveryTime : null,
//         promo_code: appliedPromoCode,
//       };

//       const res = await fetch(`${BASE_URL}/api/checkout`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
//         body: JSON.stringify(payload)
//       });
//       const data = await res.json();

//       if (res.ok && data.checkout_url) {
//         window.location.href = data.checkout_url;
//       } else {
//         throw new Error(data.message || "Gagal membuat tagihan");
//       }
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err: any) {
//       Swal.fire("Error", err.message, "error");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const formatPrice = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
//   };

//   const handleImageError = (company: string) => {
//     setImageErrors((prev) => ({ ...prev, [company]: true }));
//   };

//   const getCourierLogo = (company: string) => {
//     if (!company) return null;
//     const baseUrl = "/courier_images/";
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
//     const logo = map[company.toLowerCase()];
//     return logo ? baseUrl + logo : null;
//   };

//   const handleOpenAddressModal = () => {
//     const isFirstAddress = addresses.length === 0;
//     setAddressFormData({
//       region: "", first_name_address: "", last_name_address: "", address_location: "",
//       city: "", province: "", postal_code: "", location_type: "home", latitude: "", longitude: "",
//       is_default: isFirstAddress,
//     });
//     setIsAddressModalOpen(true);
//   };

//   const handleSubmitAddress = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmittingAddress(true);
//     const token = localStorage.getItem("user_token");

//     try {
//       const res = await fetch(`${BASE_URL}/api/addresses`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json"
//         },
//         body: JSON.stringify(addressFormData),
//       });

//       if (res.ok) {
//         Swal.fire({
//           icon: "success", title: "Berhasil!", text: "Alamat baru telah ditambahkan.",
//           timer: 1500, showConfirmButton: false,
//         });
//         setIsAddressModalOpen(false);
//         await fetchAddresses(token!);
//       } else {
//         throw new Error("Gagal menyimpan alamat");
//       }
//     } catch (error) {
//       console.error("Gagal submit alamat:", error);
//       Swal.fire("Error", "Terjadi kesalahan saat menyimpan data alamat", "error");
//     } finally {
//       setIsSubmittingAddress(false);
//     }
//   };

//   const isButtonDisabled = isProcessing || checkoutItems.length === 0 || !selectedAddressId ||
//     (shippingMethod === "biteship" && !selectedRate);

//   if (isPageLoading) {
//     return (
//       <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
//         <div className="flex gap-2 mb-4">
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-1"></div>
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-2"></div>
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-3"></div>
//         </div>
//         <p className="font-serif text-sm italic tracking-widest text-gray-500 animate-pulse">
//           Mempersiapkan checkout Anda...
//         </p>
//       </div>
//     );
//   }

//   if (checkoutItems.length === 0) {
//     return (
//       <div className="min-h-screen px-6 py-12 mx-auto font-sans md:py-24 max-w-[1440px] animate-fade-in">
//         <div className="py-20 text-center">
//           <h2 className="mb-4 text-3xl font-extrabold text-gray-900">Tidak ada item dipilih</h2>
//           <button onClick={() => navigate('/cart')} className="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase rounded-full bg-gycora hover:bg-gycora-dark">
//             Kembali ke Keranjang
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen px-6 py-12 mx-auto font-sans md:py-24 max-w-[1440px] animate-fade-in relative">
//       <h1 className="mb-12 text-3xl font-extrabold tracking-tighter text-gray-900 uppercase md:text-4xl">
//         Checkout
//       </h1>

//       <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">

//         {/* BAGIAN KIRI: FORM PENGIRIMAN */}
//         <div className="flex-grow space-y-12">

//           {/* 1. ADDRESS */}
//           <section>
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-4">
//                 <span className="flex items-center justify-center w-6 h-6 text-[10px] font-bold text-white rounded-full bg-gycora">1</span>
//                 <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">Alamat Pengiriman</h2>
//               </div>
//               {addresses.length > 0 && (
//                 <button onClick={handleOpenAddressModal} className="text-xs font-bold transition-colors text-emerald-600 hover:text-emerald-800">
//                   + Tambah Alamat
//                 </button>
//               )}
//             </div>

//             {addresses.length === 0 ? (
//               <div className="py-10 text-center border border-gray-300 border-dashed bg-gray-50 rounded-2xl">
//                 <p className="mb-2 text-sm italic text-gray-500">Belum ada alamat tersimpan.</p>
//                 <button onClick={handleOpenAddressModal} className="px-6 py-2 mt-2 text-xs font-bold tracking-widest text-white uppercase transition-colors rounded-full shadow-md bg-gycora hover:bg-gycora-dark">
//                   + Tambah Alamat Baru
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {addresses.map((addr) => (
//                   <label key={addr.id} className={`relative flex items-start p-6 border rounded-2xl cursor-pointer transition-all ${selectedAddressId === addr.id ? 'border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
//                     <input type="radio" name="address" value={addr.id} checked={selectedAddressId === addr.id} onChange={() => setSelectedAddressId(addr.id)} className="w-5 h-5 mt-1 border-gray-300 rounded-full text-gycora focus:ring-gycora" />
//                     <div className="flex-grow ml-4">
//                       <div className="flex justify-between">
//                         <p className="text-sm font-bold text-gray-900 uppercase">{addr.receiver.full_name}</p>
//                         {addr.is_default && <span className="px-2 py-0.5 text-[9px] font-bold text-emerald-800 uppercase bg-emerald-100 rounded">Utama</span>}
//                       </div>
//                       <p className="mt-2 text-sm leading-relaxed text-gray-600">
//                         {addr.details.address_location} - {addr.details.type} <br />
//                         {addr.details.city}, {addr.details.province} <br />
//                         {addr.details.region} - {addr.details.postal_code}
//                       </p>
//                     </div>
//                   </label>
//                 ))}
//               </div>
//             )}
//           </section>

//           {/* 2. SHIPPING METHOD */}
//           <section className={!selectedAddressId ? "opacity-50 pointer-events-none" : ""}>
//             <div className="flex items-center gap-4 mb-6">
//               <span className="flex items-center justify-center w-6 h-6 text-[10px] font-bold text-white rounded-full bg-gycora">2</span>
//               <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">Metode Pengiriman</h2>
//             </div>

//             <div className="space-y-4">
//               {/* Ambil di Toko */}
//               <label className={`relative flex items-center p-6 border rounded-2xl cursor-pointer transition-all ${shippingMethod === 'free' ? 'border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
//                 <input type="radio" value="free" checked={shippingMethod === 'free'} onChange={() => setShippingMethod('free')} className="w-5 h-5 border-gray-300 rounded-full text-gycora focus:ring-gycora" />
//                 <div className="flex items-center justify-between flex-grow ml-4">
//                   <div>
//                     <p className="text-sm font-bold tracking-wide text-gray-900 uppercase">Ambil Sendiri</p>
//                     <p className="mt-1 text-xs font-bold text-emerald-600">In-Store Pickup (Surabaya)</p>
//                   </div>
//                   <p className="font-black text-gycora">Gratis</p>
//                 </div>
//               </label>

//               {/* Biteship / Ekspedisi */}
//               <label className={`relative flex items-center p-6 border rounded-2xl cursor-pointer transition-all ${shippingMethod === 'biteship' ? 'border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
//                 <input type="radio" value="biteship" checked={shippingMethod === 'biteship'} onChange={() => setShippingMethod('biteship')} className="w-5 h-5 border-gray-300 rounded-full text-gycora focus:ring-gycora" />
//                 <div className="flex items-center justify-between flex-grow ml-4">
//                   <div>
//                     <p className="text-sm font-bold tracking-wide text-gray-900 uppercase">Reguler / Express</p>
//                     <p className="mt-1 text-xs text-gray-500">Dikirim via kurir pilihan Anda</p>
//                   </div>
//                 </div>
//               </label>

//               {/* Sub-menu Biteship */}
//               {shippingMethod === 'biteship' && (
//                 <div className="p-6 mt-4 space-y-8 bg-white border border-gray-200 rounded-3xl animate-fade-in">
//                   <h3 className="pt-2 text-sm font-bold tracking-widest text-gray-900 uppercase border-t border-gray-100">Pilih Ekspedisi</h3>
//                   {isLoadingRates ? (
//                     <p className="py-4 text-sm text-center text-gray-500 animate-pulse">Menghitung ongkos kirim...</p>
//                   ) : processedShippingRates.length === 0 ? (
//                     <p className="py-4 text-xs italic text-center text-red-500">Tidak ada kurir tersedia untuk alamat ini.</p>
//                   ) : (
//                     <div className="space-y-3">
//                       {processedShippingRates.map((rate, idx) => (
//                         <label key={idx} className={`relative flex flex-col p-4 border rounded-xl transition-all ${rate.is_disabled ? 'opacity-50 bg-gray-50 pointer-events-none' : selectedRate?.company === rate.company && selectedRate?.type === rate.type ? 'border-gycora bg-emerald-50/10 shadow-sm' : 'border-gray-200 hover:bg-gray-50 cursor-pointer'}`}>
//                           <div className="flex items-center w-full">
//                             <input type="radio" disabled={rate.is_disabled} checked={selectedRate?.company === rate.company && selectedRate?.type === rate.type} onChange={() => setSelectedRate(rate)} className="w-4 h-4 border-gray-300 text-gycora focus:ring-gycora" />
//                             <div className="flex items-center flex-grow gap-4 ml-4">
//                               <div className="flex items-center justify-center w-12 h-12 overflow-hidden bg-white border border-gray-100 rounded-lg shrink-0">
//                                 {!imageErrors[rate.company] && getCourierLogo(rate.company) ? (
//                                   <img src={getCourierLogo(rate.company)!} alt={rate.company} className="object-contain w-full h-full p-1" onError={() => handleImageError(rate.company)} />
//                                 ) : (
//                                   <span className="text-[10px] font-black text-gray-400">{rate.company.toUpperCase()}</span>
//                                 )}
//                               </div>
//                               <div>
//                                 <p className="text-sm font-bold tracking-wide text-gray-800 uppercase">{rate.company} - {rate.type}</p>
//                                 <p className="text-[10px] text-gray-500 mt-0.5">{rate.courier_name} ({rate.duration})</p>
//                               </div>
//                             </div>
//                             <p className="text-sm font-black text-gray-900">{formatPrice(rate.price)}</p>
//                           </div>
//                           {rate.is_disabled && (
//                             <div className="px-3 py-1.5 mt-3 ml-8 text-[10px] font-bold tracking-widest text-red-600 uppercase bg-red-50 border border-red-100 rounded-lg">
//                               ⚠️ Tidak Tersedia: {rate.disable_reason}
//                             </div>
//                           )}
//                         </label>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </section>
//         </div>

//         {/* BAGIAN KANAN: RINGKASAN PESANAN */}
//         <div className="space-y-6 lg:w-[450px] xl:w-[480px] shrink-0">
//           <div className="sticky p-8 border border-gray-100 shadow-xl bg-gray-50 rounded-3xl top-28">
//             <h2 className="pb-4 mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">
//               Ringkasan Pesanan
//             </h2>

//             <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
//               {checkoutItems.map((item: any) => {
//                 let colorHex = item.color;
//                 let colorName = "";
//                 try {
//                   const parsed = JSON.parse(item.color as string);
//                   if (parsed.hex) {
//                     colorHex = parsed.hex;
//                     colorName = parsed.name || "";
//                   }
//                 } catch { /* empty */ }

//                 return (
//                   <div key={item.id} className="flex gap-4">
//                     <img src={item.product.image_url} alt={item.product.name} className="object-cover w-16 h-16 bg-white border border-gray-100 rounded-xl shrink-0" />
//                     <div className="flex-grow">
//                       <p className="w-40 text-[11px] font-bold text-gray-900 uppercase truncate" title={item.product.name}>
//                         {item.product.name}
//                       </p>
//                       <div className="flex items-center gap-2 mt-0.5">
//                         <p className="text-[10px] text-gray-400">Qty: {item.quantity}</p>
//                         {item.color && (
//                           <>
//                             <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
//                             <div className="flex items-center gap-1.5">
//                               <div className="w-3 h-3 border border-gray-300 rounded-full shadow-sm shrink-0" style={{ backgroundColor: colorHex }} title={colorName || colorHex}></div>
//                               {colorName && <span className="text-[10px] font-bold text-gray-500 uppercase">{colorName}</span>}
//                             </div>
//                           </>
//                         )}
//                       </div>
//                       <p className="mt-1 text-xs font-medium text-gycora">{formatPrice(item.gross_amount)}</p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="pt-4 space-y-3 text-sm border-t border-gray-200">
//               <div className="flex justify-between text-gray-500">
//                 <span>Total Items</span>
//                 <span className="font-bold text-gray-900">{checkoutCount} items</span>
//               </div>
//               <div className="flex justify-between text-gray-500">
//                 <span>Subtotal</span>
//                 <span>{formatPrice(checkoutTotalAmount)}</span>
//               </div>

//               {/* Promo Code */}
//               <div className="pt-4 mt-2 border-t border-gray-200 border-dashed">
//                 <label className="block mb-2 text-[10px] font-bold tracking-widest text-gray-900 uppercase">Kode Promo</label>
//                 <form onSubmit={applyPromo} className="flex gap-2">
//                   <input type="text" value={promoInput} onChange={(e) => setPromoInput(e.target.value)} disabled={!!appliedPromoCode || isVerifyingPromo} placeholder="Masukkan kode promo" className="flex-1 px-3 py-2 text-sm uppercase bg-white border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-gycora disabled:bg-gray-100" />
//                   {!appliedPromoCode ? (
//                     <button type="submit" disabled={!promoInput || isVerifyingPromo} className="flex items-center justify-center w-20 px-4 text-[10px] font-bold text-white uppercase transition rounded-lg bg-gycora hover:bg-gycora-dark disabled:bg-gray-300">
//                       {isVerifyingPromo ? "..." : "Apply"}
//                     </button>
//                   ) : (
//                     <button type="button" onClick={removePromo} className="w-20 px-4 text-[10px] font-bold text-red-600 uppercase transition border border-red-200 rounded-lg bg-red-50 hover:bg-red-100">Hapus</button>
//                   )}
//                 </form>
//                 {promoMessage && <p className={`mt-2 text-[10px] font-medium ${appliedPromoCode ? 'text-emerald-600' : 'text-red-500'}`}>{promoMessage}</p>}
//                 {appliedPromoCode && (
//                   <div className="flex items-center justify-between mt-2">
//                     <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Promo Applied</span>
//                     <span className="text-[11px] font-medium text-emerald-600">- {formatPrice(promoDiscountAmount)}</span>
//                   </div>
//                 )}
//               </div>

//               {/* --- LOYALTY POINTS SECTION (BARU) --- */}
//               <div className="pt-4 mt-2 border-t border-gray-200 border-dashed">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h3 className="text-[10px] font-bold tracking-widest text-gray-900 uppercase">Loyalty Points</h3>
//                     <p className="mt-1 text-xs text-gray-500">
//                       Saldo: <span className="font-bold text-gycora">{availablePoints} Pts</span>
//                     </p>
//                   </div>

//                   {/* Switch Toggle untuk Poin */}
//                   <label className="relative inline-flex items-center cursor-pointer" title={availablePoints <= 0 ? "Poin tidak mencukupi" : "Gunakan poin"}>
//                     <input
//                       type="checkbox"
//                       className="sr-only peer"
//                       checked={isUsingPoints}
//                       onChange={(e) => setIsUsingPoints(e.target.checked)}
//                       disabled={availablePoints <= 0}
//                     />
//                     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gycora disabled:opacity-50 disabled:cursor-not-allowed"></div>
//                   </label>
//                 </div>

//                 {/* Detail Diskon Poin jika diaktifkan */}
//                 {isUsingPoints && appliedPointDiscount > 0 && (
//                   <div className="flex items-center justify-between mt-3 animate-fade-in">
//                     <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Points Applied ({pointsUsed} Pts)</span>
//                     <span className="text-[11px] font-medium text-emerald-600">- {formatPrice(appliedPointDiscount)}</span>
//                   </div>
//                 )}
//               </div>

//               {/* Ongkos Kirim */}
//               <div className="flex items-start justify-between pt-4 mt-2 text-gray-500 border-t border-gray-200 border-dashed">
//                 <span>Ongkos Kirim</span>
//                 {shippingMethod === 'free' ? (
//                   <span className="font-bold text-emerald-600">Gratis (Ambil di Toko)</span>
//                 ) : shippingMethod === 'biteship' && selectedRate ? (
//                   <div className="text-right">
//                     <span className="block font-medium text-gray-900">{formatPrice(selectedRate.price * checkoutCount)}</span>
//                     <p className="mt-1 text-[10px] text-gray-400">{formatPrice(selectedRate.price)} x {checkoutCount} item</p>
//                   </div>
//                 ) : (
//                   <span className="text-[10px] italic">Pilih metode</span>
//                 )}
//               </div>

//               <div className="flex justify-between pt-4 font-bold text-gray-900 border-t border-gray-200">
//                 <span className="mt-1 text-xs tracking-widest uppercase">Grand Total</span>
//                 <span className="text-xl text-gycora">{formatPrice(grandTotal)}</span>
//               </div>

//               <button onClick={handlePayment} disabled={isButtonDisabled} className="flex items-center justify-center w-full gap-3 py-4 mt-8 text-xs font-bold tracking-[0.3em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/10">
//                 {!isProcessing ? "Bayar Sekarang" : "Memproses..."}
//               </button>

//               {!selectedAddressId && <p className="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase">* Silakan pilih alamat pengiriman</p>}
//               {shippingMethod === 'biteship' && !selectedRate && <p className="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase">* Silakan pilih kurir pengiriman</p>}
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* ======================================================= */}
//       {/* MODAL FORM ALAMAT */}
//       {/* ======================================================= */}
//       {isAddressModalOpen && (
//         <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
//               <h3 className="text-lg font-bold text-gray-900">Tambah Alamat Baru</h3>
//               <button onClick={() => setIsAddressModalOpen(false)} className="text-gray-400 transition-colors hover:text-gray-900">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//             <form onSubmit={handleSubmitAddress} className="flex-1 p-6 space-y-6 overflow-y-auto">
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Nama Depan Penerima</label>
//                   <input
//                     type="text" required value={addressFormData.first_name_address}
//                     onChange={(e) => setAddressFormData({ ...addressFormData, first_name_address: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Nama Belakang Penerima</label>
//                   <input
//                     type="text" required value={addressFormData.last_name_address}
//                     onChange={(e) => setAddressFormData({ ...addressFormData, last_name_address: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">Label Alamat (Rumah/Kantor)</label>
//                 <select
//                   value={addressFormData.location_type}
//                   onChange={(e) => setAddressFormData({ ...addressFormData, location_type: e.target.value })}
//                   className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none bg-white"
//                 >
//                   <option value="home">Rumah</option>
//                   <option value="office">Kantor</option>
//                   <option value="other">Lainnya</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">Alamat Lengkap (Jalan, RT/RW, Patokan)</label>
//                 <textarea
//                   required rows={3} value={addressFormData.address_location}
//                   onChange={(e) => setAddressFormData({ ...addressFormData, address_location: e.target.value })}
//                   className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none resize-none"
//                 ></textarea>
//               </div>
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Provinsi</label>
//                   <input
//                     type="text" required value={addressFormData.province}
//                     onChange={(e) => setAddressFormData({ ...addressFormData, province: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Kota / Kabupaten</label>
//                   <input
//                     type="text" required value={addressFormData.city}
//                     onChange={(e) => setAddressFormData({ ...addressFormData, city: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Kecamatan / Region</label>
//                   <input
//                     type="text" required value={addressFormData.region}
//                     onChange={(e) => setAddressFormData({ ...addressFormData, region: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Kode Pos</label>
//                   <input
//                     type="text" required value={addressFormData.postal_code}
//                     onChange={(e) => setAddressFormData({ ...addressFormData, postal_code: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 p-4 mt-4 border rounded-lg bg-emerald-50 border-emerald-100">
//                 <input
//                   type="checkbox" id="is_default" checked={addressFormData.is_default}
//                   onChange={(e) => setAddressFormData({ ...addressFormData, is_default: e.target.checked })}
//                   className="w-5 h-5 rounded cursor-pointer text-gycora focus:ring-gycora accent-gycora"
//                 />
//                 <label htmlFor="is_default" className="text-sm font-bold cursor-pointer select-none text-emerald-800">
//                   Jadikan sebagai alamat utama
//                 </label>
//               </div>
//               <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
//                 <button
//                   type="button" onClick={() => setIsAddressModalOpen(false)}
//                   className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   Batal
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isSubmittingAddress}
//                   className="px-6 py-2.5 text-sm font-bold text-white bg-gray-900 hover:bg-black disabled:bg-gray-400 rounded-full shadow-lg transition-colors"
//                 >
//                   {isSubmittingAddress ? "Menyimpan..." : "Simpan Alamat"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../context/CartContext";
// import { BASE_URL } from "../../config/api";

// export default function PaymentPage() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { cartItems } = useCart();

//   const selectedItemIds: number[] = location.state?.selectedIds || [];

//   const [isPageLoading, setIsPageLoading] = useState(true);

//   // --- STATE ALAMAT ---
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [addresses, setAddresses] = useState<any[]>([]);
//   const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

//   // --- STATE PENGIRIMAN ---
//   const [shippingMethod, setShippingMethod] = useState("free");
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [selectedRate, setSelectedRate] = useState<any>(null);
//   const [isLoadingRates, setIsLoadingRates] = useState(false);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [rawShippingRates, setRawShippingRates] = useState<any[]>([]);

//   const [deliveryDate, setDeliveryDate] = useState("");
//   const [deliveryTime, setDeliveryTime] = useState("");

//   // --- STATE DISKON PROMO ---
//   const [promoInput, setPromoInput] = useState("");
//   const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
//   const [promoDiscountAmount, setPromoDiscountAmount] = useState(0);
//   const [promoMessage, setPromoMessage] = useState("");
//   const [isVerifyingPromo, setIsVerifyingPromo] = useState(false);

//   // --- STATE LOYALTY POINTS (DIPERBARUI) ---
//   const [availablePoints, setAvailablePoints] = useState(0);
//   const [pointsInput, setPointsInput] = useState<number | "">("");
//   const [pointsUsed, setPointsUsed] = useState<number>(0);

//   const [isProcessing, setIsProcessing] = useState(false);

//   // --- STATE IMAGE ERRORS ---
//   const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

//   // --- STATE MODAL TAMBAH ALAMAT ---
//   const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
//   const [isSubmittingAddress, setIsSubmittingAddress] = useState(false);
//   const [addressFormData, setAddressFormData] = useState({
//     region: "",
//     first_name_address: "",
//     last_name_address: "",
//     address_location: "",
//     city: "",
//     province: "",
//     postal_code: "",
//     location_type: "home",
//     latitude: "",
//     longitude: "",
//     is_default: false,
//   });

//   // --- PERHITUNGAN KERANJANG ---
//   const checkoutItems = useMemo(() => {
//     return cartItems.filter((item) => selectedItemIds.includes(item.id));
//   }, [cartItems, selectedItemIds]);

//   const checkoutCount = useMemo(() => {
//     return checkoutItems.reduce((sum, item) => sum + item.quantity, 0);
//   }, [checkoutItems]);

//   const checkoutTotalAmount = useMemo(() => {
//     return checkoutItems.reduce((sum, item) => sum + Number(item.gross_amount), 0);
//   }, [checkoutItems]);

//   // --- KALKULASI POIN DINAMIS (DIPERBARUI) ---
//   // Maksimal poin yang bisa dipakai = Sisa tagihan (setelah dipotong promo) / 1000
//   const maxPointsAllowed = useMemo(() => {
//     const maxUsableAmount = Math.max(0, checkoutTotalAmount - promoDiscountAmount);
//     return Math.min(availablePoints, Math.floor(maxUsableAmount / 1000));
//   }, [availablePoints, checkoutTotalAmount, promoDiscountAmount]);

//   const appliedPointDiscount = pointsUsed * 1000;

//   // Auto-clamp: Jika ada perubahan promo yang membuat maxPoints drop di bawah poin yang sedang dipakai
//   useEffect(() => {
//     if (pointsUsed > maxPointsAllowed) {
//       setPointsUsed(maxPointsAllowed);
//       setPointsInput(maxPointsAllowed > 0 ? maxPointsAllowed : "");
//     }
//   }, [maxPointsAllowed, pointsUsed]);

//   const grandTotal = useMemo(() => {
//     let total = checkoutTotalAmount;
//     if (shippingMethod === "biteship" && selectedRate) {
//       total += parseFloat(selectedRate.price) * checkoutCount;
//     }
//     // Kurangi promo dan poin
//     return total - promoDiscountAmount - appliedPointDiscount;
//   }, [checkoutTotalAmount, shippingMethod, selectedRate, checkoutCount, promoDiscountAmount, appliedPointDiscount]);

//   const fetchAddresses = async (token: string) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/addresses`, {
//         headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//       });
//       if (res.ok) {
//         const data = await res.json();
//         const addrArray = data.data ? data.data : data;
//         setAddresses(addrArray || []);

//         if (addrArray && addrArray.length > 0) {
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           const defaultAddr = addrArray.find((a: any) => a.is_default);
//           setSelectedAddressId(defaultAddr ? defaultAddr.id : addrArray[0].id);
//         } else {
//           setSelectedAddressId(null);
//         }
//       }
//     } catch (err) {
//       console.error("Gagal mengambil alamat:", err);
//     }
//   };

//   useEffect(() => {
//     if (selectedItemIds.length === 0) {
//       Swal.fire({
//         toast: true, position: 'top-end', icon: 'warning',
//         title: 'Pilih item terlebih dahulu', showConfirmButton: false, timer: 2000
//       });
//       navigate('/cart');
//       return;
//     }

//     const loadData = async () => {
//       const token = localStorage.getItem("user_token");
//       const userStr = localStorage.getItem("user_data");

//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       if (userStr) {
//         const user = JSON.parse(userStr);
//         setAvailablePoints(user.point || 0);
//       }

//       await fetchAddresses(token);

//       const now = new Date();
//       now.setHours(now.getHours() + 1);
//       setDeliveryDate(now.toISOString().split("T")[0]);
//       setDeliveryTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
//       setIsPageLoading(false);
//     };

//     loadData();
//   }, [navigate, selectedItemIds.length]);

//   useEffect(() => {
//     if (selectedAddressId && selectedItemIds.length > 0 && shippingMethod === 'biteship') {
//       const getRates = async () => {
//         setIsLoadingRates(true);
//         setSelectedRate(null);
//         setRawShippingRates([]);
//         try {
//           const token = localStorage.getItem("user_token");
//           const res = await fetch(`${BASE_URL}/api/shipping/rates`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
//             body: JSON.stringify({ address_id: selectedAddressId, cart_ids: selectedItemIds })
//           });
//           if (res.ok) {
//             const data = await res.json();
//             if (data.pricing) setRawShippingRates(data.pricing);
//           }
//         } catch (err) {
//           console.error("Gagal menghitung ongkir:", err);
//           Swal.fire({ toast: true, position: "top-end", icon: "error", title: "Gagal menghitung ongkir.", showConfirmButton: false, timer: 3000 });
//         } finally {
//           setIsLoadingRates(false);
//         }
//       };
//       getRates();
//     }
//   }, [selectedAddressId, selectedItemIds, shippingMethod]);

//   const processedShippingRates = useMemo(() => {
//     if (!rawShippingRates || rawShippingRates.length === 0) return [];
//     return rawShippingRates.map((rate) => {
//       return { ...rate, is_disabled: false, disable_reason: "" };
//     }).sort((a, b) => (a.is_disabled === b.is_disabled ? 0 : a.is_disabled ? 1 : -1));
//   }, [rawShippingRates]);

//   // --- HANDLERS DISKON, POIN, & PEMBAYARAN ---
//   const applyPromo = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!promoInput) return;
//     setIsVerifyingPromo(true);
//     try {
//       const token = localStorage.getItem("user_token");
//       const res = await fetch(`${BASE_URL}/api/promo/verify`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
//         body: JSON.stringify({ promo_code: promoInput })
//       });
//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || "Promo tidak valid");
//       if (checkoutTotalAmount < 50000) throw new Error("Minimum belanja Rp 50.000");

//       setAppliedPromoCode(promoInput.toUpperCase());
//       setPromoDiscountAmount(Math.min(data.discount_value, checkoutTotalAmount));
//       setPromoMessage("✅ " + data.message);
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err: any) {
//       setAppliedPromoCode(null);
//       setPromoDiscountAmount(0);
//       setPromoMessage("❌ " + err.message);
//     } finally {
//       setIsVerifyingPromo(false);
//     }
//   };

//   const removePromo = () => {
//     setPromoInput(""); setAppliedPromoCode(null); setPromoDiscountAmount(0); setPromoMessage("");
//   };

//   // Handler Apply Points
//   const handleApplyPoints = (e: React.FormEvent) => {
//     e.preventDefault();
//     const ptsToUse = Number(pointsInput);

//     if (ptsToUse > availablePoints) {
//       Swal.fire("Poin Tidak Cukup", `Anda hanya memiliki ${availablePoints} poin.`, "warning");
//       return;
//     }

//     if (ptsToUse > maxPointsAllowed) {
//       Swal.fire("Batas Maksimal", `Anda hanya bisa menggunakan maksimal ${maxPointsAllowed} poin untuk tagihan ini.`, "info");
//       setPointsInput(maxPointsAllowed);
//       setPointsUsed(maxPointsAllowed);
//       return;
//     }

//     setPointsUsed(ptsToUse);
//   };

//   const handleRemovePoints = () => {
//     setPointsInput("");
//     setPointsUsed(0);
//   };

//   const handlePayment = async () => {
//     setIsProcessing(true);
//     try {
//       const token = localStorage.getItem("user_token");
//       const payload = {
//         address_id: selectedAddressId,
//         shipping_method: shippingMethod,
//         use_points: pointsUsed,
//         cart_ids: selectedItemIds,
//         courier_company: shippingMethod === "biteship" ? selectedRate?.company : null,
//         courier_type: shippingMethod === "biteship" ? selectedRate?.type : null,
//         shipping_cost: shippingMethod === "biteship" ? selectedRate?.price : null,
//         delivery_type: shippingMethod === "biteship" ? "now" : null,
//         delivery_date: shippingMethod === "biteship" ? deliveryDate : null,
//         delivery_time: shippingMethod === "biteship" ? deliveryTime : null,
//         promo_code: appliedPromoCode,
//       };

//       const res = await fetch(`${BASE_URL}/api/checkout`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
//         body: JSON.stringify(payload)
//       });
//       const data = await res.json();

//       if (res.ok && data.checkout_url) {
//         window.location.href = data.checkout_url;
//       } else {
//         throw new Error(data.message || "Gagal membuat tagihan");
//       }
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err: any) {
//       Swal.fire("Error", err.message, "error");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const formatPrice = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
//   };

//   const handleImageError = (company: string) => {
//     setImageErrors((prev) => ({ ...prev, [company]: true }));
//   };

//   const getCourierLogo = (company: string) => {
//     if (!company) return null;
//     const baseUrl = "/courier_images/";
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
//     const logo = map[company.toLowerCase()];
//     return logo ? baseUrl + logo : null;
//   };

//   const handleOpenAddressModal = () => {
//     const isFirstAddress = addresses.length === 0;
//     setAddressFormData({
//       region: "", first_name_address: "", last_name_address: "", address_location: "",
//       city: "", province: "", postal_code: "", location_type: "home", latitude: "", longitude: "",
//       is_default: isFirstAddress,
//     });
//     setIsAddressModalOpen(true);
//   };

//   const handleSubmitAddress = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmittingAddress(true);
//     const token = localStorage.getItem("user_token");

//     try {
//       const res = await fetch(`${BASE_URL}/api/addresses`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json"
//         },
//         body: JSON.stringify(addressFormData),
//       });

//       if (res.ok) {
//         Swal.fire({
//           icon: "success", title: "Berhasil!", text: "Alamat baru telah ditambahkan.",
//           timer: 1500, showConfirmButton: false,
//         });
//         setIsAddressModalOpen(false);
//         await fetchAddresses(token!);
//       } else {
//         throw new Error("Gagal menyimpan alamat");
//       }
//     } catch (error) {
//       console.error("Gagal submit alamat:", error);
//       Swal.fire("Error", "Terjadi kesalahan saat menyimpan data alamat", "error");
//     } finally {
//       setIsSubmittingAddress(false);
//     }
//   };

//   const isButtonDisabled = isProcessing || checkoutItems.length === 0 || !selectedAddressId ||
//     (shippingMethod === "biteship" && !selectedRate);

//   if (isPageLoading) {
//     return (
//       <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
//         <div className="flex gap-2 mb-4">
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-1"></div>
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-2"></div>
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-3"></div>
//         </div>
//         <p className="font-serif text-sm italic tracking-widest text-gray-500 animate-pulse">
//           Mempersiapkan checkout Anda...
//         </p>
//       </div>
//     );
//   }

//   if (checkoutItems.length === 0) {
//     return (
//       <div className="min-h-screen px-6 py-12 mx-auto font-sans md:py-24 max-w-[1440px] animate-fade-in">
//         <div className="py-20 text-center">
//           <h2 className="mb-4 text-3xl font-extrabold text-gray-900">Tidak ada item dipilih</h2>
//           <button onClick={() => navigate('/cart')} className="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase rounded-full bg-gycora hover:bg-gycora-dark">
//             Kembali ke Keranjang
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen px-6 py-12 mx-auto font-sans md:py-24 max-w-[1440px] animate-fade-in relative">
//       <h1 className="mb-12 text-3xl font-extrabold tracking-tighter text-gray-900 uppercase md:text-4xl">
//         Checkout
//       </h1>

//       <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">

//         {/* BAGIAN KIRI: FORM PENGIRIMAN */}
//         <div className="flex-grow space-y-12">

//           {/* 1. ADDRESS */}
//           <section>
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-4">
//                 <span className="flex items-center justify-center w-6 h-6 text-[10px] font-bold text-white rounded-full bg-gycora">1</span>
//                 <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">Alamat Pengiriman</h2>
//               </div>
//               {addresses.length > 0 && (
//                 <button onClick={handleOpenAddressModal} className="text-xs font-bold transition-colors text-emerald-600 hover:text-emerald-800">
//                   + Tambah Alamat
//                 </button>
//               )}
//             </div>

//             {addresses.length === 0 ? (
//               <div className="py-10 text-center border border-gray-300 border-dashed bg-gray-50 rounded-2xl">
//                 <p className="mb-2 text-sm italic text-gray-500">Belum ada alamat tersimpan.</p>
//                 <button onClick={handleOpenAddressModal} className="px-6 py-2 mt-2 text-xs font-bold tracking-widest text-white uppercase transition-colors rounded-full shadow-md bg-gycora hover:bg-gycora-dark">
//                   + Tambah Alamat Baru
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {addresses.map((addr) => (
//                   <label key={addr.id} className={`relative flex items-start p-6 border rounded-2xl cursor-pointer transition-all ${selectedAddressId === addr.id ? 'border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
//                     <input type="radio" name="address" value={addr.id} checked={selectedAddressId === addr.id} onChange={() => setSelectedAddressId(addr.id)} className="w-5 h-5 mt-1 border-gray-300 rounded-full text-gycora focus:ring-gycora" />
//                     <div className="flex-grow ml-4">
//                       <div className="flex justify-between">
//                         <p className="text-sm font-bold text-gray-900 uppercase">{addr.receiver.full_name}</p>
//                         {addr.is_default && <span className="px-2 py-0.5 text-[9px] font-bold text-emerald-800 uppercase bg-emerald-100 rounded">Utama</span>}
//                       </div>
//                       <p className="mt-2 text-sm leading-relaxed text-gray-600">
//                         {addr.details.address_location} - {addr.details.type} <br />
//                         {addr.details.city}, {addr.details.province} <br />
//                         {addr.details.region} - {addr.details.postal_code}
//                       </p>
//                     </div>
//                   </label>
//                 ))}
//               </div>
//             )}
//           </section>

//           {/* 2. SHIPPING METHOD */}
//           <section className={!selectedAddressId ? "opacity-50 pointer-events-none" : ""}>
//             <div className="flex items-center gap-4 mb-6">
//               <span className="flex items-center justify-center w-6 h-6 text-[10px] font-bold text-white rounded-full bg-gycora">2</span>
//               <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">Metode Pengiriman</h2>
//             </div>

//             <div className="space-y-4">
//               {/* Ambil di Toko */}
//               <label className={`relative flex items-center p-6 border rounded-2xl cursor-pointer transition-all ${shippingMethod === 'free' ? 'border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
//                 <input type="radio" value="free" checked={shippingMethod === 'free'} onChange={() => setShippingMethod('free')} className="w-5 h-5 border-gray-300 rounded-full text-gycora focus:ring-gycora" />
//                 <div className="flex items-center justify-between flex-grow ml-4">
//                   <div>
//                     <p className="text-sm font-bold tracking-wide text-gray-900 uppercase">Ambil Sendiri</p>
//                     <p className="mt-1 text-xs font-bold text-emerald-600">In-Store Pickup (Surabaya)</p>
//                   </div>
//                   <p className="font-black text-gycora">Gratis</p>
//                 </div>
//               </label>

//               {/* Biteship / Ekspedisi */}
//               <label className={`relative flex items-center p-6 border rounded-2xl cursor-pointer transition-all ${shippingMethod === 'biteship' ? 'border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
//                 <input type="radio" value="biteship" checked={shippingMethod === 'biteship'} onChange={() => setShippingMethod('biteship')} className="w-5 h-5 border-gray-300 rounded-full text-gycora focus:ring-gycora" />
//                 <div className="flex items-center justify-between flex-grow ml-4">
//                   <div>
//                     <p className="text-sm font-bold tracking-wide text-gray-900 uppercase">Reguler / Express</p>
//                     <p className="mt-1 text-xs text-gray-500">Dikirim via kurir pilihan Anda</p>
//                   </div>
//                 </div>
//               </label>

//               {/* Sub-menu Biteship */}
//               {shippingMethod === 'biteship' && (
//                 <div className="p-6 mt-4 space-y-8 bg-white border border-gray-200 rounded-3xl animate-fade-in">
//                   <h3 className="pt-2 text-sm font-bold tracking-widest text-gray-900 uppercase border-t border-gray-100">Pilih Ekspedisi</h3>
//                   {isLoadingRates ? (
//                     <p className="py-4 text-sm text-center text-gray-500 animate-pulse">Menghitung ongkos kirim...</p>
//                   ) : processedShippingRates.length === 0 ? (
//                     <p className="py-4 text-xs italic text-center text-red-500">Tidak ada kurir tersedia untuk alamat ini.</p>
//                   ) : (
//                     <div className="space-y-3">
//                       {processedShippingRates.map((rate, idx) => (
//                         <label key={idx} className={`relative flex flex-col p-4 border rounded-xl transition-all ${rate.is_disabled ? 'opacity-50 bg-gray-50 pointer-events-none' : selectedRate?.company === rate.company && selectedRate?.type === rate.type ? 'border-gycora bg-emerald-50/10 shadow-sm' : 'border-gray-200 hover:bg-gray-50 cursor-pointer'}`}>
//                           <div className="flex items-center w-full">
//                             <input type="radio" disabled={rate.is_disabled} checked={selectedRate?.company === rate.company && selectedRate?.type === rate.type} onChange={() => setSelectedRate(rate)} className="w-4 h-4 border-gray-300 text-gycora focus:ring-gycora" />
//                             <div className="flex items-center flex-grow gap-4 ml-4">
//                               <div className="flex items-center justify-center w-12 h-12 overflow-hidden bg-white border border-gray-100 rounded-lg shrink-0">
//                                 {!imageErrors[rate.company] && getCourierLogo(rate.company) ? (
//                                   <img src={getCourierLogo(rate.company)!} alt={rate.company} className="object-contain w-full h-full p-1" onError={() => handleImageError(rate.company)} />
//                                 ) : (
//                                   <span className="text-[10px] font-black text-gray-400">{rate.company.toUpperCase()}</span>
//                                 )}
//                               </div>
//                               <div>
//                                 <p className="text-sm font-bold tracking-wide text-gray-800 uppercase">{rate.company} - {rate.type}</p>
//                                 <p className="text-[10px] text-gray-500 mt-0.5">{rate.courier_name} ({rate.duration})</p>
//                               </div>
//                             </div>
//                             <p className="text-sm font-black text-gray-900">{formatPrice(rate.price)}</p>
//                           </div>
//                           {rate.is_disabled && (
//                             <div className="px-3 py-1.5 mt-3 ml-8 text-[10px] font-bold tracking-widest text-red-600 uppercase bg-red-50 border border-red-100 rounded-lg">
//                               ⚠️ Tidak Tersedia: {rate.disable_reason}
//                             </div>
//                           )}
//                         </label>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </section>
//         </div>

//         {/* BAGIAN KANAN: RINGKASAN PESANAN */}
//         <div className="space-y-6 lg:w-[450px] xl:w-[480px] shrink-0">
//           <div className="sticky p-8 border border-gray-100 shadow-xl bg-gray-50 rounded-3xl top-28">
//             <h2 className="pb-4 mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">
//               Ringkasan Pesanan
//             </h2>

//             <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
//               {checkoutItems.map((item: any) => {
//                 let colorHex = item.color;
//                 let colorName = "";
//                 try {
//                   const parsed = JSON.parse(item.color as string);
//                   if (parsed.hex) {
//                     colorHex = parsed.hex;
//                     colorName = parsed.name || "";
//                   }
//                 } catch { }

//                 return (
//                   <div key={item.id} className="flex gap-4">
//                     <img src={item.product.image_url} alt={item.product.name} className="object-cover w-16 h-16 bg-white border border-gray-100 rounded-xl shrink-0" />
//                     <div className="flex-grow">
//                       <p className="w-40 text-[11px] font-bold text-gray-900 uppercase truncate" title={item.product.name}>
//                         {item.product.name}
//                       </p>
//                       <div className="flex items-center gap-2 mt-0.5">
//                         <p className="text-[10px] text-gray-400">Qty: {item.quantity}</p>
//                         {item.color && (
//                           <>
//                             <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
//                             <div className="flex items-center gap-1.5">
//                               <div className="w-3 h-3 border border-gray-300 rounded-full shadow-sm shrink-0" style={{ backgroundColor: colorHex }} title={colorName || colorHex}></div>
//                               {colorName && <span className="text-[10px] font-bold text-gray-500 uppercase">{colorName}</span>}
//                             </div>
//                           </>
//                         )}
//                       </div>
//                       <p className="mt-1 text-xs font-medium text-gycora">{formatPrice(item.gross_amount)}</p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="pt-4 space-y-3 text-sm border-t border-gray-200">
//               <div className="flex justify-between text-gray-500">
//                 <span>Total Items</span>
//                 <span className="font-bold text-gray-900">{checkoutCount} items</span>
//               </div>
//               <div className="flex justify-between text-gray-500">
//                 <span>Subtotal</span>
//                 <span>{formatPrice(checkoutTotalAmount)}</span>
//               </div>

//               {/* Promo Code */}
//               <div className="pt-4 mt-2 border-t border-gray-200 border-dashed">
//                 <label className="block mb-2 text-[10px] font-bold tracking-widest text-gray-900 uppercase">Kode Promo</label>
//                 <form onSubmit={applyPromo} className="flex gap-2">
//                   <input type="text" value={promoInput} onChange={(e) => setPromoInput(e.target.value)} disabled={!!appliedPromoCode || isVerifyingPromo} placeholder="Masukkan kode promo" className="flex-1 px-3 py-2 text-sm uppercase bg-white border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-gycora disabled:bg-gray-100" />
//                   {!appliedPromoCode ? (
//                     <button type="submit" disabled={!promoInput || isVerifyingPromo} className="flex items-center justify-center w-20 px-4 text-[10px] font-bold text-white uppercase transition rounded-lg bg-gycora hover:bg-gycora-dark disabled:bg-gray-300">
//                       {isVerifyingPromo ? "..." : "Apply"}
//                     </button>
//                   ) : (
//                     <button type="button" onClick={removePromo} className="w-20 px-4 text-[10px] font-bold text-red-600 uppercase transition border border-red-200 rounded-lg bg-red-50 hover:bg-red-100">Hapus</button>
//                   )}
//                 </form>
//                 {promoMessage && <p className={`mt-2 text-[10px] font-medium ${appliedPromoCode ? 'text-emerald-600' : 'text-red-500'}`}>{promoMessage}</p>}
//                 {appliedPromoCode && (
//                   <div className="flex items-center justify-between mt-2">
//                     <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Promo Applied</span>
//                     <span className="text-[11px] font-medium text-emerald-600">- {formatPrice(promoDiscountAmount)}</span>
//                   </div>
//                 )}
//               </div>

//               {/* --- LOYALTY POINTS SECTION --- */}
//               <div className="pt-4 mt-2 border-t border-gray-200 border-dashed">
//                 <div className="flex items-center justify-between mb-3">
//                   <label className="text-[10px] font-bold tracking-widest text-gray-900 uppercase">Loyalty Points</label>
//                   <span className="text-xs text-gray-500">
//                     Saldo: <strong className="text-gycora">{availablePoints} Pts</strong>
//                   </span>
//                 </div>

//                 <form onSubmit={handleApplyPoints} className="flex gap-2">
//                   <input
//                     type="number"
//                     value={pointsInput}
//                     onChange={(e) => setPointsInput(e.target.value === "" ? "" : Number(e.target.value))}
//                     disabled={pointsUsed > 0 || availablePoints <= 0}
//                     placeholder={`Maks: ${maxPointsAllowed}`}
//                     className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-gycora disabled:bg-gray-100"
//                     min="0"
//                     max={maxPointsAllowed}
//                   />
//                   {pointsUsed === 0 ? (
//                     <button type="submit" disabled={!pointsInput || availablePoints <= 0} className="flex items-center justify-center w-24 px-4 text-[10px] font-bold text-white uppercase transition rounded-lg bg-gycora hover:bg-gycora-dark disabled:bg-gray-300">
//                       Pakai
//                     </button>
//                   ) : (
//                     <button type="button" onClick={handleRemovePoints} className="w-24 px-4 text-[10px] font-bold text-red-600 uppercase transition border border-red-200 rounded-lg bg-red-50 hover:bg-red-100">
//                       Batal
//                     </button>
//                   )}
//                 </form>

//                 {/* Detail Diskon Poin jika diaktifkan */}
//                 {pointsUsed > 0 && (
//                   <div className="flex items-center justify-between mt-3 animate-fade-in">
//                     <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Points Applied ({pointsUsed} Pts)</span>
//                     <span className="text-[11px] font-medium text-emerald-600">- {formatPrice(appliedPointDiscount)}</span>
//                   </div>
//                 )}
//               </div>

//               {/* Ongkos Kirim */}
//               <div className="flex items-start justify-between pt-4 mt-2 text-gray-500 border-t border-gray-200 border-dashed">
//                 <span>Ongkos Kirim</span>
//                 {shippingMethod === 'free' ? (
//                   <span className="font-bold text-emerald-600">Gratis (Ambil di Toko)</span>
//                 ) : shippingMethod === 'biteship' && selectedRate ? (
//                   <div className="text-right">
//                     <span className="block font-medium text-gray-900">{formatPrice(selectedRate.price * checkoutCount)}</span>
//                     <p className="mt-1 text-[10px] text-gray-400">{formatPrice(selectedRate.price)} x {checkoutCount} item</p>
//                   </div>
//                 ) : (
//                   <span className="text-[10px] italic">Pilih metode</span>
//                 )}
//               </div>

//               <div className="flex justify-between pt-4 font-bold text-gray-900 border-t border-gray-200">
//                 <span className="mt-1 text-xs tracking-widest uppercase">Grand Total</span>
//                 <span className="text-xl text-gycora">{formatPrice(grandTotal)}</span>
//               </div>

//               <button onClick={handlePayment} disabled={isButtonDisabled} className="flex items-center justify-center w-full gap-3 py-4 mt-8 text-xs font-bold tracking-[0.3em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/10">
//                 {!isProcessing ? "Bayar Sekarang" : "Memproses..."}
//               </button>

//               {!selectedAddressId && <p className="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase">* Silakan pilih alamat pengiriman</p>}
//               {shippingMethod === 'biteship' && !selectedRate && <p className="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase">* Silakan pilih kurir pengiriman</p>}
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* ======================================================= */}
//       {/* MODAL FORM ALAMAT */}
//       {/* ======================================================= */}
//       {isAddressModalOpen && (
//         <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
//               <h3 className="text-lg font-bold text-gray-900">Tambah Alamat Baru</h3>
//               <button onClick={() => setIsAddressModalOpen(false)} className="text-gray-400 transition-colors hover:text-gray-900">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//             <form onSubmit={handleSubmitAddress} className="flex-1 p-6 space-y-6 overflow-y-auto">
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Nama Depan Penerima</label>
//                   <input
//                     type="text" required value={addressFormData.first_name_address}
//                     onChange={(e) => setAddressFormData({ ...addressFormData, first_name_address: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Nama Belakang Penerima</label>
//                   <input
//                     type="text" required value={addressFormData.last_name_address}
//                     onChange={(e) => setAddressFormData({ ...addressFormData, last_name_address: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">Label Alamat (Rumah/Kantor)</label>
//                 <select
//                   value={addressFormData.location_type}
//                   onChange={(e) => setAddressFormData({ ...addressFormData, location_type: e.target.value })}
//                   className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none bg-white"
//                 >
//                   <option value="home">Rumah</option>
//                   <option value="office">Kantor</option>
//                   <option value="other">Lainnya</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">Alamat Lengkap (Jalan, RT/RW, Patokan)</label>
//                 <textarea
//                   required rows={3} value={addressFormData.address_location}
//                   onChange={(e) => setAddressFormData({ ...addressFormData, address_location: e.target.value })}
//                   className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none resize-none"
//                 ></textarea>
//               </div>
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Provinsi</label>
//                   <input
//                     type="text" required value={addressFormData.province}
//                     onChange={(e) => setAddressFormData({ ...addressFormData, province: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Kota / Kabupaten</label>
//                   <input
//                     type="text" required value={addressFormData.city}
//                     onChange={(e) => setAddressFormData({ ...addressFormData, city: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Kecamatan / Region</label>
//                   <input
//                     type="text" required value={addressFormData.region}
//                     onChange={(e) => setAddressFormData({ ...addressFormData, region: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Kode Pos</label>
//                   <input
//                     type="text" required value={addressFormData.postal_code}
//                     onChange={(e) => setAddressFormData({ ...addressFormData, postal_code: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 p-4 mt-4 border rounded-lg bg-emerald-50 border-emerald-100">
//                 <input
//                   type="checkbox" id="is_default" checked={addressFormData.is_default}
//                   onChange={(e) => setAddressFormData({ ...addressFormData, is_default: e.target.checked })}
//                   className="w-5 h-5 rounded cursor-pointer text-gycora focus:ring-gycora accent-gycora"
//                 />
//                 <label htmlFor="is_default" className="text-sm font-bold cursor-pointer select-none text-emerald-800">
//                   Jadikan sebagai alamat utama
//                 </label>
//               </div>
//               <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
//                 <button
//                   type="button" onClick={() => setIsAddressModalOpen(false)}
//                   className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   Batal
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isSubmittingAddress}
//                   className="px-6 py-2.5 text-sm font-bold text-white bg-gray-900 hover:bg-black disabled:bg-gray-400 rounded-full shadow-lg transition-colors"
//                 >
//                   {isSubmittingAddress ? "Menyimpan..." : "Simpan Alamat"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../context/CartContext";
// import { BASE_URL } from "../../config/api";

// export default function PaymentPage() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { cartItems } = useCart();

//   const selectedItemIds: number[] = location.state?.selectedIds || [];

//   const [isPageLoading, setIsPageLoading] = useState(true);

//   // --- STATE ALAMAT ---
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [addresses, setAddresses] = useState<any[]>([]);
//   const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
//     null,
//   );

//   // --- STATE PENGIRIMAN ---
//   const [shippingMethod, setShippingMethod] = useState("free");
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [selectedRate, setSelectedRate] = useState<any>(null);
//   const [isLoadingRates, setIsLoadingRates] = useState(false);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [rawShippingRates, setRawShippingRates] = useState<any[]>([]);

//   const [deliveryDate, setDeliveryDate] = useState("");
//   const [deliveryTime, setDeliveryTime] = useState("");

//   // --- STATE DISKON PROMO ---
//   const [promoInput, setPromoInput] = useState("");
//   const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
//   const [promoDiscountAmount, setPromoDiscountAmount] = useState(0); // Hanya terisi jika promo_type = 'claim'
//   const [appliedPromoType, setAppliedPromoType] = useState<string | null>(null); // 'claim' atau 'voucher'
//   const [promoMessage, setPromoMessage] = useState("");
//   const [isVerifyingPromo, setIsVerifyingPromo] = useState(false);

//   // =========================================================================
//   // LOGIKA KALKULASI HARGA DINAMIS BERDASARKAN TIPE PROMO
//   // =========================================================================
//   const checkoutItems = useMemo(() => {
//     return cartItems.filter((item) => selectedItemIds.includes(item.id));
//   }, [cartItems, selectedItemIds]);

//   const checkoutCount = useMemo(() => {
//     return checkoutItems.reduce((sum, item) => sum + item.quantity, 0);
//   }, [checkoutItems]);

//   // Total Belanja Barang (Diubah dinamis jika promo_type == 'voucher')
//   const checkoutTotalAmount = useMemo(() => {
//     return checkoutItems.reduce((sum, item) => {
//       // Harga dasar produk (sebelum potongan voucher khusus)
//       let priceToUse = item.product.discount_price
//         ? Number(item.product.discount_price)
//         : Number(item.product.price);

//       // Jika user memakai VOUCHER BOS dan produk ini Punya Harga Khusus Voucher
//       if (
//         appliedPromoType === "voucher" &&
//         item.product.voucher_discount_price &&
//         Number(item.product.voucher_discount_price) > 0
//       ) {
//         priceToUse = Number(item.product.voucher_discount_price);
//       }

//       return sum + priceToUse * item.quantity;
//     }, 0);
//   }, [checkoutItems, appliedPromoType]);

//   // [PERBAIKAN 1] Buat variabel dinamis untuk menghitung total diskon promo
//   const actualPromoDiscount = useMemo(() => {
//     if (appliedPromoType === "claim") {
//       // Hitung 10% dari total barang
//       const productDiscount = Math.floor(checkoutTotalAmount * 0.1);

//       // Hitung maksimal 10.000 dari ongkos kirim
//       let shippingCost = 0;
//       if (shippingMethod === "biteship" && selectedRate) {
//         shippingCost = parseFloat(selectedRate.price) * checkoutCount;
//       }
//       const shippingSubsidy = Math.min(10000, shippingCost);

//       return productDiscount + shippingSubsidy;
//     }
//     return promoDiscountAmount; // Jika voucher bos (global), pakai angka statis
//   }, [
//     appliedPromoType,
//     checkoutTotalAmount,
//     shippingMethod,
//     selectedRate,
//     checkoutCount,
//     promoDiscountAmount,
//   ]);

//   // --- STATE LOYALTY POINTS ---
//   const [availablePoints, setAvailablePoints] = useState(0);
//   const [pointsInput, setPointsInput] = useState<number | "">("");
//   const [pointsUsed, setPointsUsed] = useState<number>(0);

//   const [isProcessing, setIsProcessing] = useState(false);

//   // --- STATE IMAGE ERRORS & MODAL ALAMAT ---
//   const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
//   const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
//   const [isSubmittingAddress, setIsSubmittingAddress] = useState(false);
//   const [addressFormData, setAddressFormData] = useState({
//     region: "",
//     first_name_address: "",
//     last_name_address: "",
//     address_location: "",
//     city: "",
//     province: "",
//     postal_code: "",
//     location_type: "home",
//     latitude: "",
//     longitude: "",
//     is_default: false,
//   });

//   // Maksimal poin yang bisa dipakai = Sisa tagihan (setelah dipotong promo claim global jika ada) / 1000
//   // const maxPointsAllowed = useMemo(() => {
//   //   const maxUsableAmount = Math.max(
//   //     0,
//   //     checkoutTotalAmount - promoDiscountAmount,
//   //   );
//   //   return Math.min(availablePoints, Math.floor(maxUsableAmount / 1000));
//   // }, [availablePoints, checkoutTotalAmount, promoDiscountAmount]);

//   // [PERBAIKAN 2] Ubah semua `promoDiscountAmount` menjadi `actualPromoDiscount` pada maxPointsAllowed dan grandTotal
//   const maxPointsAllowed = useMemo(() => {
//     const maxUsableAmount = Math.max(
//       0,
//       checkoutTotalAmount - actualPromoDiscount,
//     );
//     return Math.min(availablePoints, Math.floor(maxUsableAmount / 1000));
//   }, [availablePoints, checkoutTotalAmount, actualPromoDiscount]);

//   const appliedPointDiscount = pointsUsed * 1000;

//   useEffect(() => {
//     if (pointsUsed > maxPointsAllowed) {
//       setPointsUsed(maxPointsAllowed);
//       setPointsInput(maxPointsAllowed > 0 ? maxPointsAllowed : "");
//     }
//   }, [maxPointsAllowed, pointsUsed]);

//   const grandTotal = useMemo(() => {
//     let total = checkoutTotalAmount;
//     if (shippingMethod === "biteship" && selectedRate) {
//       total += parseFloat(selectedRate.price) * checkoutCount;
//     }
//     return total - promoDiscountAmount - appliedPointDiscount;
//   }, [
//     checkoutTotalAmount,
//     shippingMethod,
//     selectedRate,
//     checkoutCount,
//     promoDiscountAmount,
//     appliedPointDiscount,
//   ]);

//   // =========================================================================
//   // FETCH DATA AWAL
//   // =========================================================================
//   const fetchAddresses = async (token: string) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/addresses`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       });
//       if (res.ok) {
//         const data = await res.json();
//         const addrArray = data.data ? data.data : data;
//         setAddresses(addrArray || []);

//         if (addrArray && addrArray.length > 0) {
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           const defaultAddr = addrArray.find((a: any) => a.is_default);
//           setSelectedAddressId(defaultAddr ? defaultAddr.id : addrArray[0].id);
//         } else {
//           setSelectedAddressId(null);
//         }
//       }
//     } catch (err) {
//       console.error("Gagal mengambil alamat:", err);
//     }
//   };

//   useEffect(() => {
//     if (selectedItemIds.length === 0) {
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "warning",
//         title: "Pilih item terlebih dahulu",
//         showConfirmButton: false,
//         timer: 2000,
//       });
//       navigate("/cart");
//       return;
//     }

//     const loadData = async () => {
//       const token = localStorage.getItem("user_token");
//       const userStr = localStorage.getItem("user_data");

//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       if (userStr) {
//         const user = JSON.parse(userStr);
//         setAvailablePoints(user.point || 0);
//       }

//       await fetchAddresses(token);

//       const now = new Date();
//       now.setHours(now.getHours() + 1);
//       setDeliveryDate(now.toISOString().split("T")[0]);
//       setDeliveryTime(
//         `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`,
//       );
//       setIsPageLoading(false);
//     };

//     loadData();
//   }, [navigate, selectedItemIds.length]);

//   useEffect(() => {
//     if (
//       selectedAddressId &&
//       selectedItemIds.length > 0 &&
//       shippingMethod === "biteship"
//     ) {
//       const getRates = async () => {
//         setIsLoadingRates(true);
//         setSelectedRate(null);
//         setRawShippingRates([]);
//         try {
//           const token = localStorage.getItem("user_token");
//           const res = await fetch(`${BASE_URL}/api/shipping/rates`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//               Accept: "application/json",
//             },
//             body: JSON.stringify({
//               address_id: selectedAddressId,
//               cart_ids: selectedItemIds,
//             }),
//           });
//           if (res.ok) {
//             const data = await res.json();
//             if (data.pricing) setRawShippingRates(data.pricing);
//           }
//         } catch (err) {
//           console.error("Gagal menghitung ongkir:", err);
//           Swal.fire({
//             toast: true,
//             position: "top-end",
//             icon: "error",
//             title: "Gagal menghitung ongkir.",
//             showConfirmButton: false,
//             timer: 3000,
//           });
//         } finally {
//           setIsLoadingRates(false);
//         }
//       };
//       getRates();
//     }
//   }, [selectedAddressId, selectedItemIds, shippingMethod]);

//   const processedShippingRates = useMemo(() => {
//     if (!rawShippingRates || rawShippingRates.length === 0) return [];
//     return rawShippingRates
//       .map((rate) => {
//         return { ...rate, is_disabled: false, disable_reason: "" };
//       })
//       .sort((a, b) =>
//         a.is_disabled === b.is_disabled ? 0 : a.is_disabled ? 1 : -1,
//       );
//   }, [rawShippingRates]);

//   // =========================================================================
//   // HANDLERS DISKON, POIN, & PEMBAYARAN
//   // =========================================================================
//   // const applyPromo = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   if (!promoInput) return;
//   //   setIsVerifyingPromo(true);
//   //   try {
//   //     const token = localStorage.getItem("user_token");
//   //     const res = await fetch(`${BASE_URL}/api/promo/verify`, {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Authorization: `Bearer ${token}`,
//   //         Accept: "application/json",
//   //       },
//   //       body: JSON.stringify({ promo_code: promoInput }),
//   //     });
//   //     const data = await res.json();

//   //     if (!res.ok) throw new Error(data.message || "Promo tidak valid");

//   //     // Default pengecekan, total belanja keranjang minimal 50rb sebelum dipotong
//   //     if (checkoutTotalAmount < 50000)
//   //       throw new Error("Minimum belanja Rp 50.000");

//   //     setAppliedPromoCode(promoInput.toUpperCase());
//   //     setAppliedPromoType(data.promo_type); // Setel tipe promo ('claim' atau 'voucher')

//   //     // Jika promo_type == 'claim', set nominal diskon global. Jika 'voucher', jangan set diskon global.
//   //     if (data.promo_type === "claim") {
//   //       setPromoDiscountAmount(
//   //         Math.min(data.discount_value, checkoutTotalAmount),
//   //       );
//   //       setPromoMessage("✅ " + data.message + " (Potongan Global)");
//   //     } else {
//   //       setPromoDiscountAmount(0);
//   //       setPromoMessage(
//   //         "✅ " + data.message + " (Harga Khusus per Produk Diterapkan)",
//   //       );
//   //     }

//   //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   //   } catch (err: any) {
//   //     setAppliedPromoCode(null);
//   //     setAppliedPromoType(null);
//   //     setPromoDiscountAmount(0);
//   //     setPromoMessage("❌ " + err.message);
//   //   } finally {
//   //     setIsVerifyingPromo(false);
//   //   }
//   // };

//   // [PERBAIKAN 3] Ubah fungsi applyPromo()
//   const applyPromo = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!promoInput) return;
//     setIsVerifyingPromo(true);
//     try {
//       const token = localStorage.getItem("user_token");
//       const res = await fetch(`${BASE_URL}/api/promo/verify`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ promo_code: promoInput }),
//       });
//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || "Promo tidak valid");
//       if (checkoutTotalAmount < 50000)
//         throw new Error("Minimum belanja Rp 50.000");

//       setAppliedPromoCode(promoInput.toUpperCase());
//       setAppliedPromoType(data.promo_type);

//       if (data.promo_type === "claim") {
//         setPromoDiscountAmount(0); // Nilainya dihandle dinamis oleh useMemo 'actualPromoDiscount'
//         setPromoMessage(
//           "✅ " + data.message + " (10% OFF + Subsidi Ongkir 10K)",
//         );
//       } else {
//         setPromoDiscountAmount(data.discount_value);
//         setPromoMessage("✅ " + data.message + " (Harga Khusus Diterapkan)");
//       }
//     } catch (err: any) {
//       removePromo();
//       setPromoMessage("❌ " + err.message);
//     } finally {
//       setIsVerifyingPromo(false);
//     }
//   };

//   const removePromo = () => {
//     setPromoInput("");
//     setAppliedPromoCode(null);
//     setAppliedPromoType(null);
//     setPromoDiscountAmount(0);
//     setPromoMessage("");
//   };

//   const handleApplyPoints = (e: React.FormEvent) => {
//     e.preventDefault();
//     const ptsToUse = Number(pointsInput);

//     if (ptsToUse > availablePoints) {
//       Swal.fire(
//         "Poin Tidak Cukup",
//         `Anda hanya memiliki ${availablePoints} poin.`,
//         "warning",
//       );
//       return;
//     }

//     if (ptsToUse > maxPointsAllowed) {
//       Swal.fire(
//         "Batas Maksimal",
//         `Anda hanya bisa menggunakan maksimal ${maxPointsAllowed} poin untuk tagihan ini.`,
//         "info",
//       );
//       setPointsInput(maxPointsAllowed);
//       setPointsUsed(maxPointsAllowed);
//       return;
//     }

//     setPointsUsed(ptsToUse);
//   };

//   const handleRemovePoints = () => {
//     setPointsInput("");
//     setPointsUsed(0);
//   };

//   const handlePayment = async () => {
//     setIsProcessing(true);
//     try {
//       const token = localStorage.getItem("user_token");
//       const payload = {
//         address_id: selectedAddressId,
//         shipping_method: shippingMethod,
//         use_points: pointsUsed,
//         cart_ids: selectedItemIds,
//         courier_company:
//           shippingMethod === "biteship" ? selectedRate?.company : null,
//         courier_type: shippingMethod === "biteship" ? selectedRate?.type : null,
//         shipping_cost:
//           shippingMethod === "biteship" ? selectedRate?.price : null,
//         delivery_type: shippingMethod === "biteship" ? "now" : null,
//         delivery_date: shippingMethod === "biteship" ? deliveryDate : null,
//         delivery_time: shippingMethod === "biteship" ? deliveryTime : null,
//         promo_code: appliedPromoCode,
//         promo_type: appliedPromoType, // Kirim tipe promo ke backend agar perhitungannya match
//       };

//       const res = await fetch(`${BASE_URL}/api/checkout`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: JSON.stringify(payload),
//       });
//       const data = await res.json();

//       if (res.ok && data.checkout_url) {
//         window.location.href = data.checkout_url;
//       } else {
//         throw new Error(data.message || "Gagal membuat tagihan");
//       }
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err: any) {
//       Swal.fire("Error", err.message, "error");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const formatPrice = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(angka);
//   };

//   const handleImageError = (company: string) => {
//     setImageErrors((prev) => ({ ...prev, [company]: true }));
//   };

//   const getCourierLogo = (company: string) => {
//     if (!company) return null;
//     const baseUrl = "/courier_images/";
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
//     const logo = map[company.toLowerCase()];
//     return logo ? baseUrl + logo : null;
//   };

//   const handleOpenAddressModal = () => {
//     const isFirstAddress = addresses.length === 0;
//     setAddressFormData({
//       region: "",
//       first_name_address: "",
//       last_name_address: "",
//       address_location: "",
//       city: "",
//       province: "",
//       postal_code: "",
//       location_type: "home",
//       latitude: "",
//       longitude: "",
//       is_default: isFirstAddress,
//     });
//     setIsAddressModalOpen(true);
//   };

//   const handleSubmitAddress = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmittingAddress(true);
//     const token = localStorage.getItem("user_token");

//     try {
//       const res = await fetch(`${BASE_URL}/api/addresses`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: JSON.stringify(addressFormData),
//       });

//       if (res.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Berhasil!",
//           text: "Alamat ditambahkan.",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         setIsAddressModalOpen(false);
//         await fetchAddresses(token!);
//       } else {
//         throw new Error("Gagal menyimpan alamat");
//       }
//     } catch (error) {
//       console.error("Gagal submit alamat:", error);
//       Swal.fire(
//         "Error",
//         "Terjadi kesalahan saat menyimpan data alamat",
//         "error",
//       );
//     } finally {
//       setIsSubmittingAddress(false);
//     }
//   };

//   const isButtonDisabled =
//     isProcessing ||
//     checkoutItems.length === 0 ||
//     !selectedAddressId ||
//     (shippingMethod === "biteship" && !selectedRate);

//   if (isPageLoading) {
//     return (
//       <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
//         <div className="flex gap-2 mb-4">
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-1"></div>
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-2"></div>
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-3"></div>
//         </div>
//         <p className="font-serif text-sm italic tracking-widest text-gray-500 animate-pulse">
//           Mempersiapkan checkout Anda...
//         </p>
//       </div>
//     );
//   }

//   if (checkoutItems.length === 0) {
//     return (
//       <div className="min-h-screen px-6 py-12 mx-auto font-sans md:py-24 max-w-[1440px] animate-fade-in">
//         <div className="py-20 text-center">
//           <h2 className="mb-4 text-3xl font-extrabold text-gray-900">
//             Tidak ada item dipilih
//           </h2>
//           <button
//             onClick={() => navigate("/cart")}
//             className="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase rounded-full bg-gycora hover:bg-gycora-dark"
//           >
//             Kembali ke Keranjang
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen px-6 py-12 mx-auto font-sans md:py-24 max-w-[1440px] animate-fade-in relative">
//       <h1 className="mb-12 text-3xl font-extrabold tracking-tighter text-gray-900 uppercase md:text-4xl">
//         Checkout
//       </h1>

//       <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
//         {/* BAGIAN KIRI: FORM PENGIRIMAN */}
//         <div className="flex-grow space-y-12">
//           <section>
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-4">
//                 <span className="flex items-center justify-center w-6 h-6 text-[10px] font-bold text-white rounded-full bg-gycora">
//                   1
//                 </span>
//                 <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">
//                   Alamat Pengiriman
//                 </h2>
//               </div>
//               {addresses.length > 0 && (
//                 <button
//                   onClick={handleOpenAddressModal}
//                   className="text-xs font-bold transition-colors text-emerald-600 hover:text-emerald-800"
//                 >
//                   + Tambah Alamat
//                 </button>
//               )}
//             </div>

//             {addresses.length === 0 ? (
//               <div className="py-10 text-center border border-gray-300 border-dashed bg-gray-50 rounded-2xl">
//                 <p className="mb-2 text-sm italic text-gray-500">
//                   Belum ada alamat tersimpan.
//                 </p>
//                 <button
//                   onClick={handleOpenAddressModal}
//                   className="px-6 py-2 mt-2 text-xs font-bold tracking-widest text-white uppercase transition-colors rounded-full shadow-md bg-gycora hover:bg-gycora-dark"
//                 >
//                   + Tambah Alamat Baru
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {addresses.map((addr) => (
//                   <label
//                     key={addr.id}
//                     className={`relative flex items-start p-6 border rounded-2xl cursor-pointer transition-all ${selectedAddressId === addr.id ? "border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md" : "border-gray-200 bg-white hover:bg-gray-50"}`}
//                   >
//                     <input
//                       type="radio"
//                       name="address"
//                       value={addr.id}
//                       checked={selectedAddressId === addr.id}
//                       onChange={() => setSelectedAddressId(addr.id)}
//                       className="w-5 h-5 mt-1 border-gray-300 rounded-full text-gycora focus:ring-gycora"
//                     />
//                     <div className="flex-grow ml-4">
//                       <div className="flex justify-between">
//                         <p className="text-sm font-bold text-gray-900 uppercase">
//                           {addr.receiver.full_name}
//                         </p>
//                         {addr.is_default && (
//                           <span className="px-2 py-0.5 text-[9px] font-bold text-emerald-800 uppercase bg-emerald-100 rounded">
//                             Utama
//                           </span>
//                         )}
//                       </div>
//                       <p className="mt-2 text-sm leading-relaxed text-gray-600">
//                         {addr.details.address_location} - {addr.details.type}{" "}
//                         <br />
//                         {addr.details.city}, {addr.details.province} <br />
//                         {addr.details.region} - {addr.details.postal_code}
//                       </p>
//                     </div>
//                   </label>
//                 ))}
//               </div>
//             )}
//           </section>

//           <section
//             className={
//               !selectedAddressId ? "opacity-50 pointer-events-none" : ""
//             }
//           >
//             <div className="flex items-center gap-4 mb-6">
//               <span className="flex items-center justify-center w-6 h-6 text-[10px] font-bold text-white rounded-full bg-gycora">
//                 2
//               </span>
//               <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">
//                 Metode Pengiriman
//               </h2>
//             </div>

//             <div className="space-y-4">
//               <label
//                 className={`relative flex items-center p-6 border rounded-2xl cursor-pointer transition-all ${shippingMethod === "free" ? "border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md" : "border-gray-200 bg-white hover:bg-gray-50"}`}
//               >
//                 <input
//                   type="radio"
//                   value="free"
//                   checked={shippingMethod === "free"}
//                   onChange={() => setShippingMethod("free")}
//                   className="w-5 h-5 border-gray-300 rounded-full text-gycora focus:ring-gycora"
//                 />
//                 <div className="flex items-center justify-between flex-grow ml-4">
//                   <div>
//                     <p className="text-sm font-bold tracking-wide text-gray-900 uppercase">
//                       Ambil Sendiri
//                     </p>
//                     <p className="mt-1 text-xs font-bold text-emerald-600">
//                       In-Store Pickup (Surabaya)
//                     </p>
//                   </div>
//                   <p className="font-black text-gycora">Gratis</p>
//                 </div>
//               </label>

//               <label
//                 className={`relative flex items-center p-6 border rounded-2xl cursor-pointer transition-all ${shippingMethod === "biteship" ? "border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md" : "border-gray-200 bg-white hover:bg-gray-50"}`}
//               >
//                 <input
//                   type="radio"
//                   value="biteship"
//                   checked={shippingMethod === "biteship"}
//                   onChange={() => setShippingMethod("biteship")}
//                   className="w-5 h-5 border-gray-300 rounded-full text-gycora focus:ring-gycora"
//                 />
//                 <div className="flex items-center justify-between flex-grow ml-4">
//                   <div>
//                     <p className="text-sm font-bold tracking-wide text-gray-900 uppercase">
//                       Reguler / Express
//                     </p>
//                     <p className="mt-1 text-xs text-gray-500">
//                       Dikirim via kurir pilihan Anda
//                     </p>
//                   </div>
//                 </div>
//               </label>

//               {shippingMethod === "biteship" && (
//                 <div className="p-6 mt-4 space-y-8 bg-white border border-gray-200 rounded-3xl animate-fade-in">
//                   <h3 className="pt-2 text-sm font-bold tracking-widest text-gray-900 uppercase border-t border-gray-100">
//                     Pilih Ekspedisi
//                   </h3>
//                   {isLoadingRates ? (
//                     <p className="py-4 text-sm text-center text-gray-500 animate-pulse">
//                       Menghitung ongkos kirim...
//                     </p>
//                   ) : processedShippingRates.length === 0 ? (
//                     <p className="py-4 text-xs italic text-center text-red-500">
//                       Tidak ada kurir tersedia untuk alamat ini.
//                     </p>
//                   ) : (
//                     <div className="space-y-3">
//                       {processedShippingRates.map((rate, idx) => (
//                         <label
//                           key={idx}
//                           className={`relative flex flex-col p-4 border rounded-xl transition-all ${rate.is_disabled ? "opacity-50 bg-gray-50 pointer-events-none" : selectedRate?.company === rate.company && selectedRate?.type === rate.type ? "border-gycora bg-emerald-50/10 shadow-sm" : "border-gray-200 hover:bg-gray-50 cursor-pointer"}`}
//                         >
//                           <div className="flex items-center w-full">
//                             <input
//                               type="radio"
//                               disabled={rate.is_disabled}
//                               checked={
//                                 selectedRate?.company === rate.company &&
//                                 selectedRate?.type === rate.type
//                               }
//                               onChange={() => setSelectedRate(rate)}
//                               className="w-4 h-4 border-gray-300 text-gycora focus:ring-gycora"
//                             />
//                             <div className="flex items-center flex-grow gap-4 ml-4">
//                               <div className="flex items-center justify-center w-12 h-12 overflow-hidden bg-white border border-gray-100 rounded-lg shrink-0">
//                                 {!imageErrors[rate.company] &&
//                                 getCourierLogo(rate.company) ? (
//                                   <img
//                                     src={getCourierLogo(rate.company)!}
//                                     alt={rate.company}
//                                     className="object-contain w-full h-full p-1"
//                                     onError={() =>
//                                       handleImageError(rate.company)
//                                     }
//                                   />
//                                 ) : (
//                                   <span className="text-[10px] font-black text-gray-400">
//                                     {rate.company.toUpperCase()}
//                                   </span>
//                                 )}
//                               </div>
//                               <div>
//                                 <p className="text-sm font-bold tracking-wide text-gray-800 uppercase">
//                                   {rate.company} - {rate.type}
//                                 </p>
//                                 <p className="text-[10px] text-gray-500 mt-0.5">
//                                   {rate.courier_name} ({rate.duration})
//                                 </p>
//                               </div>
//                             </div>
//                             <p className="text-sm font-black text-gray-900">
//                               {formatPrice(rate.price)}
//                             </p>
//                           </div>
//                         </label>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </section>
//         </div>

//         {/* BAGIAN KANAN: RINGKASAN PESANAN */}
//         <div className="space-y-6 lg:w-[450px] xl:w-[480px] shrink-0">
//           <div className="sticky p-8 border border-gray-100 shadow-xl bg-gray-50 rounded-3xl top-28">
//             <h2 className="pb-4 mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">
//               Ringkasan Pesanan
//             </h2>

//             <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
//               {checkoutItems.map((item: any) => {
//                 let colorHex = item.color;
//                 let colorName = "";
//                 try {
//                   const parsed = JSON.parse(item.color as string);
//                   if (parsed.hex) {
//                     colorHex = parsed.hex;
//                     colorName = parsed.name || "";
//                   }
//                 } catch {}

//                 // Hitung ulang tampilan harga item individual
//                 let displayPrice = item.product.discount_price
//                   ? Number(item.product.discount_price)
//                   : Number(item.product.price);
//                 const isVoucherActive =
//                   appliedPromoType === "voucher" &&
//                   item.product.voucher_discount_price &&
//                   Number(item.product.voucher_discount_price) > 0;
//                 if (isVoucherActive) {
//                   displayPrice = Number(item.product.voucher_discount_price);
//                 }

//                 return (
//                   <div key={item.id} className="flex gap-4">
//                     <img
//                       src={item.product.image_url}
//                       alt={item.product.name}
//                       className="object-cover w-16 h-16 bg-white border border-gray-100 rounded-xl shrink-0"
//                     />
//                     <div className="flex-grow">
//                       <p
//                         className="w-40 text-[11px] font-bold text-gray-900 uppercase truncate"
//                         title={item.product.name}
//                       >
//                         {item.product.name}
//                       </p>
//                       <div className="flex items-center gap-2 mt-0.5">
//                         <p className="text-[10px] text-gray-400">
//                           Qty: {item.quantity}
//                         </p>
//                         {item.color && (
//                           <>
//                             <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
//                             <div className="flex items-center gap-1.5">
//                               <div
//                                 className="w-3 h-3 border border-gray-300 rounded-full shadow-sm shrink-0"
//                                 style={{ backgroundColor: colorHex }}
//                                 title={colorName || colorHex}
//                               ></div>
//                               {colorName && (
//                                 <span className="text-[10px] font-bold text-gray-500 uppercase">
//                                   {colorName}
//                                 </span>
//                               )}
//                             </div>
//                           </>
//                         )}
//                       </div>

//                       {/* UI Menunjukkan kalau harganya turun karena voucher khusus */}
//                       {isVoucherActive ? (
//                         <p className="mt-1 text-xs font-medium text-amber-600">
//                           {formatPrice(displayPrice * item.quantity)}{" "}
//                           <span className="text-[9px] line-through text-gray-400 ml-1">
//                             {formatPrice(item.gross_amount)}
//                           </span>
//                         </p>
//                       ) : (
//                         <p className="mt-1 text-xs font-medium text-gycora">
//                           {formatPrice(displayPrice * item.quantity)}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="pt-4 space-y-3 text-sm border-t border-gray-200">
//               <div className="flex justify-between text-gray-500">
//                 <span>Total Items</span>
//                 <span className="font-bold text-gray-900">
//                   {checkoutCount} items
//                 </span>
//               </div>
//               <div className="flex justify-between text-gray-500">
//                 <span>Subtotal Barang</span>
//                 <span
//                   className={
//                     appliedPromoType === "voucher"
//                       ? "text-amber-600 font-bold"
//                       : ""
//                   }
//                 >
//                   {formatPrice(checkoutTotalAmount)}
//                 </span>
//               </div>

//               {/* Promo Code */}
//               <div className="pt-4 mt-2 border-t border-gray-200 border-dashed">
//                 <label className="block mb-2 text-[10px] font-bold tracking-widest text-gray-900 uppercase">
//                   Kode Promo / Voucher
//                 </label>
//                 <form onSubmit={applyPromo} className="flex gap-2">
//                   <input
//                     type="text"
//                     value={promoInput}
//                     onChange={(e) => setPromoInput(e.target.value)}
//                     disabled={!!appliedPromoCode || isVerifyingPromo}
//                     placeholder="Masukkan kode promo"
//                     className="flex-1 px-3 py-2 text-sm uppercase bg-white border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-gycora disabled:bg-gray-100"
//                   />
//                   {!appliedPromoCode ? (
//                     <button
//                       type="submit"
//                       disabled={!promoInput || isVerifyingPromo}
//                       className="flex items-center justify-center w-20 px-4 text-[10px] font-bold text-white uppercase transition rounded-lg bg-gycora hover:bg-gycora-dark disabled:bg-gray-300"
//                     >
//                       {isVerifyingPromo ? "..." : "Apply"}
//                     </button>
//                   ) : (
//                     <button
//                       type="button"
//                       onClick={removePromo}
//                       className="w-20 px-4 text-[10px] font-bold text-red-600 uppercase transition border border-red-200 rounded-lg bg-red-50 hover:bg-red-100"
//                     >
//                       Hapus
//                     </button>
//                   )}
//                 </form>
//                 {promoMessage && (
//                   <p
//                     className={`mt-2 text-[10px] font-medium ${appliedPromoCode ? "text-emerald-600" : "text-red-500"}`}
//                   >
//                     {promoMessage}
//                   </p>
//                 )}

//                 {/* HANYA TAMPIL JIKA PROMO TYPE == CLAIM (Diskon Global) */}
//                 {/* {appliedPromoCode && appliedPromoType === "claim" && (
//                   <div className="flex items-center justify-between mt-2">
//                     <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
//                       Promo Applied
//                     </span>
//                     <span className="text-[11px] font-medium text-emerald-600">
//                       - {formatPrice(promoDiscountAmount)}
//                     </span>
//                   </div>
//                 )} */}

//                 {appliedPromoCode && (
//                   <div className="flex justify-between text-[10px] md:text-xs font-medium text-emerald-600">
//                     <span className="pr-2 truncate">
//                       Promo (
//                       <span className="font-mono uppercase">
//                         {appliedPromoCode}
//                       </span>
//                       )
//                     </span>
//                     <span>- {formatPrice(actualPromoDiscount)}</span>{" "}
//                     {/* <-- Gunakan actualPromoDiscount */}
//                   </div>
//                 )}
//               </div>

//               {/* --- LOYALTY POINTS SECTION --- */}
//               <div className="pt-4 mt-2 border-t border-gray-200 border-dashed">
//                 <div className="flex items-center justify-between mb-3">
//                   <label className="text-[10px] font-bold tracking-widest text-gray-900 uppercase">
//                     Loyalty Points
//                   </label>
//                   <span className="text-xs text-gray-500">
//                     Saldo:{" "}
//                     <strong className="text-gycora">
//                       {availablePoints} Pts
//                     </strong>
//                   </span>
//                 </div>

//                 <form onSubmit={handleApplyPoints} className="flex gap-2">
//                   <input
//                     type="number"
//                     value={pointsInput}
//                     onChange={(e) =>
//                       setPointsInput(
//                         e.target.value === "" ? "" : Number(e.target.value),
//                       )
//                     }
//                     disabled={pointsUsed > 0 || availablePoints <= 0}
//                     placeholder={`Maks: ${maxPointsAllowed}`}
//                     className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-gycora disabled:bg-gray-100"
//                     min="0"
//                     max={maxPointsAllowed}
//                   />
//                   {pointsUsed === 0 ? (
//                     <button
//                       type="submit"
//                       disabled={!pointsInput || availablePoints <= 0}
//                       className="flex items-center justify-center w-24 px-4 text-[10px] font-bold text-white uppercase transition rounded-lg bg-gycora hover:bg-gycora-dark disabled:bg-gray-300"
//                     >
//                       Pakai
//                     </button>
//                   ) : (
//                     <button
//                       type="button"
//                       onClick={handleRemovePoints}
//                       className="w-24 px-4 text-[10px] font-bold text-red-600 uppercase transition border border-red-200 rounded-lg bg-red-50 hover:bg-red-100"
//                     >
//                       Batal
//                     </button>
//                   )}
//                 </form>

//                 {pointsUsed > 0 && (
//                   <div className="flex items-center justify-between mt-3 animate-fade-in">
//                     <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
//                       Points Applied ({pointsUsed} Pts)
//                     </span>
//                     <span className="text-[11px] font-medium text-emerald-600">
//                       - {formatPrice(appliedPointDiscount)}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {/* Ongkos Kirim */}
//               <div className="flex items-start justify-between pt-4 mt-2 text-gray-500 border-t border-gray-200 border-dashed">
//                 <span>Ongkos Kirim</span>
//                 {shippingMethod === "free" ? (
//                   <span className="font-bold text-emerald-600">
//                     Gratis (Ambil di Toko)
//                   </span>
//                 ) : shippingMethod === "biteship" && selectedRate ? (
//                   <div className="text-right">
//                     <span className="block font-medium text-gray-900">
//                       {formatPrice(selectedRate.price * checkoutCount)}
//                     </span>
//                     <p className="mt-1 text-[10px] text-gray-400">
//                       {formatPrice(selectedRate.price)} x {checkoutCount} item
//                     </p>
//                   </div>
//                 ) : (
//                   <span className="text-[10px] italic">Pilih metode</span>
//                 )}
//               </div>

//               <div className="flex justify-between pt-4 font-bold text-gray-900 border-t border-gray-200">
//                 <span className="mt-1 text-xs tracking-widest uppercase">
//                   Grand Total
//                 </span>
//                 <span className="text-xl text-gycora">
//                   {formatPrice(grandTotal)}
//                 </span>
//               </div>

//               <button
//                 onClick={handlePayment}
//                 disabled={isButtonDisabled}
//                 className="flex items-center justify-center w-full gap-3 py-4 mt-8 text-xs font-bold tracking-[0.3em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/10"
//               >
//                 {!isProcessing ? "Bayar Sekarang" : "Memproses..."}
//               </button>

//               {!selectedAddressId && (
//                 <p className="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase">
//                   * Silakan pilih alamat pengiriman
//                 </p>
//               )}
//               {shippingMethod === "biteship" && !selectedRate && (
//                 <p className="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase">
//                   * Silakan pilih kurir pengiriman
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ADDRESS MODAL IGNORED FOR BREVITY */}
//       {/* ======================================================= */}
//       {/* MODAL FORM ALAMAT */}
//       {/* ======================================================= */}
//       {isAddressModalOpen && (
//         <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
//               <h3 className="text-lg font-bold text-gray-900">
//                 Tambah Alamat Baru
//               </h3>
//               <button
//                 onClick={() => setIsAddressModalOpen(false)}
//                 className="text-gray-400 transition-colors hover:text-gray-900"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
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
//             <form
//               onSubmit={handleSubmitAddress}
//               className="flex-1 p-6 space-y-6 overflow-y-auto"
//             >
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">
//                     Nama Depan Penerima
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={addressFormData.first_name_address}
//                     onChange={(e) =>
//                       setAddressFormData({
//                         ...addressFormData,
//                         first_name_address: e.target.value,
//                       })
//                     }
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">
//                     Nama Belakang Penerima
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={addressFormData.last_name_address}
//                     onChange={(e) =>
//                       setAddressFormData({
//                         ...addressFormData,
//                         last_name_address: e.target.value,
//                       })
//                     }
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">
//                   Label Alamat (Rumah/Kantor)
//                 </label>
//                 <select
//                   value={addressFormData.location_type}
//                   onChange={(e) =>
//                     setAddressFormData({
//                       ...addressFormData,
//                       location_type: e.target.value,
//                     })
//                   }
//                   className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none bg-white"
//                 >
//                   <option value="home">Rumah</option>
//                   <option value="office">Kantor</option>
//                   <option value="other">Lainnya</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">
//                   Alamat Lengkap (Jalan, RT/RW, Patokan)
//                 </label>
//                 <textarea
//                   required
//                   rows={3}
//                   value={addressFormData.address_location}
//                   onChange={(e) =>
//                     setAddressFormData({
//                       ...addressFormData,
//                       address_location: e.target.value,
//                     })
//                   }
//                   className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none resize-none"
//                 ></textarea>
//               </div>
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">
//                     Provinsi
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={addressFormData.province}
//                     onChange={(e) =>
//                       setAddressFormData({
//                         ...addressFormData,
//                         province: e.target.value,
//                       })
//                     }
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">
//                     Kota / Kabupaten
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={addressFormData.city}
//                     onChange={(e) =>
//                       setAddressFormData({
//                         ...addressFormData,
//                         city: e.target.value,
//                       })
//                     }
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">
//                     Kecamatan / Region
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={addressFormData.region}
//                     onChange={(e) =>
//                       setAddressFormData({
//                         ...addressFormData,
//                         region: e.target.value,
//                       })
//                     }
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">
//                     Kode Pos
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={addressFormData.postal_code}
//                     onChange={(e) =>
//                       setAddressFormData({
//                         ...addressFormData,
//                         postal_code: e.target.value,
//                       })
//                     }
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 p-4 mt-4 border rounded-lg bg-emerald-50 border-emerald-100">
//                 <input
//                   type="checkbox"
//                   id="is_default"
//                   checked={addressFormData.is_default}
//                   onChange={(e) =>
//                     setAddressFormData({
//                       ...addressFormData,
//                       is_default: e.target.checked,
//                     })
//                   }
//                   className="w-5 h-5 rounded cursor-pointer text-gycora focus:ring-gycora accent-gycora"
//                 />
//                 <label
//                   htmlFor="is_default"
//                   className="text-sm font-bold cursor-pointer select-none text-emerald-800"
//                 >
//                   Jadikan sebagai alamat utama
//                 </label>
//               </div>
//               <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
//                 <button
//                   type="button"
//                   onClick={() => setIsAddressModalOpen(false)}
//                   className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   Batal
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isSubmittingAddress}
//                   className="px-6 py-2.5 text-sm font-bold text-white bg-gray-900 hover:bg-black disabled:bg-gray-400 rounded-full shadow-lg transition-colors"
//                 >
//                   {isSubmittingAddress ? "Menyimpan..." : "Simpan Alamat"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useCart } from "../../context/CartContext";
import { BASE_URL } from "../../config/api";
import { useLanguage } from "../../context/LanguageContext"; // [BARU] Import Context Bahasa

import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";

interface Address {
  id: number;
  receiver: { first_name: string; last_name: string; full_name: string };
  details: {
    region: string;
    address_location: string;
    type: string;
    city: string;
    province: string;
    postal_code: string;
    latitude: string;
    longitude: string;
  };
  is_default: boolean;
}

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage(); // [BARU] Inisialisasi hook bahasa

  const { cartItems } = useCart();
  const selectedItemIds: number[] = location.state?.selectedIds || [];
  const [isPageLoading, setIsPageLoading] = useState(true);

  // --- STATE ALAMAT ---
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [addresses, setAddresses] = useState<any[]>([]);

    // Default koordinat (Monas, Jakarta)
  const defaultPosition: [number, number] = [-6.175392, 106.827153];
  const [mapPosition, setMapPosition] = useState<[number, number]>(defaultPosition);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  
    // --- State Modal Alamat ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    region: "",
    first_name_address: "",
    last_name_address: "",
    address_location: "",
    city: "",
    province: "",
    postal_code: "",
    location_type: "home",
    latitude: "",
    longitude: "",
    is_default: false,
  });

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );

  // --- STATE PENGIRIMAN ---
  const [shippingMethod, setShippingMethod] = useState("free");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedRate, setSelectedRate] = useState<any>(null);
  const [isLoadingRates, setIsLoadingRates] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rawShippingRates, setRawShippingRates] = useState<any[]>([]);

  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

  // --- STATE DISKON PROMO ---
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
  const [promoDiscountAmount, setPromoDiscountAmount] = useState(0);
  const [appliedPromoType, setAppliedPromoType] = useState<string | null>(null);
  const [promoMessage, setPromoMessage] = useState("");
  const [isVerifyingPromo, setIsVerifyingPromo] = useState(false);

  const checkoutItems = useMemo(() => {
    return cartItems.filter((item) => selectedItemIds.includes(item.id));
  }, [cartItems, selectedItemIds]);

  const checkoutCount = useMemo(() => {
    return checkoutItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [checkoutItems]);

  const checkoutTotalAmount = useMemo(() => {
    return checkoutItems.reduce((sum, item) => {
      let priceToUse = item.product.discount_price
        ? Number(item.product.discount_price)
        : Number(item.product.price);

      if (
        appliedPromoType === "voucher" &&
        item.product.voucher_discount_price &&
        Number(item.product.voucher_discount_price) > 0
      ) {
        priceToUse = Number(item.product.voucher_discount_price);
      }
      return sum + priceToUse * item.quantity;
    }, 0);
  }, [checkoutItems, appliedPromoType]);

  const actualPromoDiscount = useMemo(() => {
    if (appliedPromoType === "claim") {
      const productDiscount = Math.floor(checkoutTotalAmount * 0.1);
      let shippingCost = 0;
      if (shippingMethod === "biteship" && selectedRate) {
        shippingCost = parseFloat(selectedRate.price) * checkoutCount;
      }
      const shippingSubsidy = Math.min(10000, shippingCost);
      return productDiscount + shippingSubsidy;
    }
    return promoDiscountAmount;
  }, [
    appliedPromoType,
    checkoutTotalAmount,
    shippingMethod,
    selectedRate,
    checkoutCount,
    promoDiscountAmount,
  ]);

    const handleGetCurrentLocation = () => {
      setIsGettingLocation(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            setMapPosition([lat, lng]);
            fetchAddressFromCoords(lat, lng);
            setIsGettingLocation(false);
          },
          () => {
            Swal.fire("Akses Ditolak", t("warn_location_denied"), "warning");
            setIsGettingLocation(false);
          }
        );
      } else {
        Swal.fire("Tidak Mendukung", t("warn_location_unsupported"), "error");
        setIsGettingLocation(false);
      }
    };

      // --- Handlers Peta & Geocoding ---
  const fetchAddressFromCoords = async (lat: number, lng: number) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await res.json();
      
      if (data && data.address) {
        const { address } = data;
        
        const newCity = address.city || address.town || address.county || "";
        const newRegion = address.suburb || address.village || address.neighbourhood || "";
        const newProvince = address.state || "";
        const newPostal = address.postcode || "";
        
        const roadName = address.road || "";
        const houseNumber = address.house_number || "";
        const fullStreet = roadName ? `${roadName} ${houseNumber}`.trim() : data.display_name;

        setFormData(prev => ({
          ...prev,
          latitude: lat.toString(),
          longitude: lng.toString(),
          address_location: fullStreet, 
          city: newCity,
          province: newProvince,
          region: newRegion,
          postal_code: newPostal
        }));
      }
    } catch (error) {
      console.error("Reverse Geocoding error:", error);
    }
  };
  
    const MapEvents = useCallback(() => {
      useMapEvents({
        click(e) {
          setMapPosition([e.latlng.lat, e.latlng.lng]);
          fetchAddressFromCoords(e.latlng.lat, e.latlng.lng);
        },
      });
      return null;
    }, []);
  
    const MapCenterUpdater = ({ position }: { position: [number, number] }) => {
      const map = useMap();
      useEffect(() => {
        map.setView(position, map.getZoom());
      }, [position, map]);
      return null;
    };

  const [availablePoints, setAvailablePoints] = useState(0);
  const [pointsInput, setPointsInput] = useState<number | "">("");
  const [pointsUsed, setPointsUsed] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  // const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  // const [isSubmittingAddress, setIsSubmittingAddress] = useState(false);
  // const [addressFormData, setAddressFormData] = useState({
  //   region: "",
  //   first_name_address: "",
  //   last_name_address: "",
  //   address_location: "",
  //   city: "",
  //   province: "",
  //   postal_code: "",
  //   location_type: "home",
  //   latitude: "",
  //   longitude: "",
  //   is_default: false,
  // });

  const maxPointsAllowed = useMemo(() => {
    const maxUsableAmount = Math.max(
      0,
      checkoutTotalAmount - actualPromoDiscount,
    );
    return Math.min(availablePoints, Math.floor(maxUsableAmount / 1000));
  }, [availablePoints, checkoutTotalAmount, actualPromoDiscount]);

  const appliedPointDiscount = pointsUsed * 1000;

  useEffect(() => {
    if (pointsUsed > maxPointsAllowed) {
      setPointsUsed(maxPointsAllowed);
      setPointsInput(maxPointsAllowed > 0 ? maxPointsAllowed : "");
    }
  }, [maxPointsAllowed, pointsUsed]);

  const grandTotal = useMemo(() => {
    let total = checkoutTotalAmount;
    if (shippingMethod === "biteship" && selectedRate) {
      total += parseFloat(selectedRate.price) * checkoutCount;
    }
    return total - actualPromoDiscount - appliedPointDiscount;
  }, [
    checkoutTotalAmount,
    shippingMethod,
    selectedRate,
    checkoutCount,
    actualPromoDiscount,
    appliedPointDiscount,
  ]);

    // --- Handlers Modal Alamat ---
  const handleOpenModal = (address: Address | null = null) => {
    if (address) {
      setEditingId(address.id);
      
      const lat = parseFloat(address.details.latitude);
      const lng = parseFloat(address.details.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        setMapPosition([lat, lng]);
      } else {
        setMapPosition(defaultPosition);
      }

      setFormData({
        region: address.details.region || "",
        first_name_address: address.receiver.first_name,
        last_name_address: address.receiver.last_name,
        address_location: address.details.address_location,
        city: address.details.city,
        province: address.details.province,
        postal_code: address.details.postal_code,
        location_type: address.details.type,
        latitude: address.details.latitude || "",
        longitude: address.details.longitude || "",
        is_default: address.is_default,
      });
    } else {
      setEditingId(null);
      setMapPosition(defaultPosition);
      setFormData({
        region: "", first_name_address: "", last_name_address: "", address_location: "",
        city: "", province: "", postal_code: "", location_type: "home", 
        latitude: "", longitude: "", is_default: false,
      });
    }
    setIsModalOpen(true);
  };

  const fetchAddresses = async (token: string) => {
    try {
      const res = await fetch(`${BASE_URL}/api/addresses`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        const addrArray = data.data ? data.data : data;
        setAddresses(addrArray || []);
        if (addrArray && addrArray.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const defaultAddr = addrArray.find((a: any) => a.is_default);
          setSelectedAddressId(defaultAddr ? defaultAddr.id : addrArray[0].id);
        } else {
          setSelectedAddressId(null);
        }
      }
    } catch (err) {
      console.error("Gagal mengambil alamat:", err);
    }
  };

  useEffect(() => {
    if (selectedItemIds.length === 0) {
      navigate("/cart");
      return;
    }

    const loadData = async () => {
      const token = localStorage.getItem("user_token");
      const userStr = localStorage.getItem("user_data");

      if (!token) {
        navigate("/login");
        return;
      }
      if (userStr) {
        const user = JSON.parse(userStr);
        setAvailablePoints(user.point || 0);
      }

      await fetchAddresses(token);

      const now = new Date();
      now.setHours(now.getHours() + 1);
      setDeliveryDate(now.toISOString().split("T")[0]);
      setDeliveryTime(
        `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`,
      );
      setIsPageLoading(false);
    };

    loadData();
  }, [navigate, selectedItemIds.length]);

  useEffect(() => {
    if (
      selectedAddressId &&
      selectedItemIds.length > 0 &&
      shippingMethod === "biteship"
    ) {
      const getRates = async () => {
        setIsLoadingRates(true);
        setSelectedRate(null);
        setRawShippingRates([]);
        try {
          const token = localStorage.getItem("user_token");
          const res = await fetch(`${BASE_URL}/api/shipping/rates`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
            body: JSON.stringify({
              address_id: selectedAddressId,
              cart_ids: selectedItemIds,
            }),
          });
          if (res.ok) {
            const data = await res.json();
            if (data.pricing) setRawShippingRates(data.pricing);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoadingRates(false);
        }
      };
      getRates();
    }
  }, [selectedAddressId, selectedItemIds, shippingMethod]);

  const processedShippingRates = useMemo(() => {
    if (!rawShippingRates || rawShippingRates.length === 0) return [];
    return rawShippingRates
      .map((rate) => {
        return { ...rate, is_disabled: false, disable_reason: "" };
      })
      .sort((a, b) =>
        a.is_disabled === b.is_disabled ? 0 : a.is_disabled ? 1 : -1,
      );
  }, [rawShippingRates]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const applyPromo = async (e: any) => {
    e.preventDefault();
    if (!promoInput) return;
    setIsVerifyingPromo(true);
    try {
      const token = localStorage.getItem("user_token");
      const res = await fetch(`${BASE_URL}/api/promo/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({ promo_code: promoInput }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Promo tidak valid");
      if (checkoutTotalAmount < 50000)
        throw new Error("Minimum belanja Rp 50.000");

      setAppliedPromoCode(promoInput.toUpperCase());
      setAppliedPromoType(data.promo_type);

      if (data.promo_type === "claim") {
        setPromoDiscountAmount(0);
        setPromoMessage(
          "✅ " + data.message + " (10% OFF + Subsidi Ongkir 10K)",
        );
      } else {
        setPromoDiscountAmount(data.discount_value);
        setPromoMessage("✅ " + data.message + " (Harga Khusus Diterapkan)");
      }
    } catch (err: any) {
      removePromo();
      setPromoMessage("❌ " + err.message);
    } finally {
      setIsVerifyingPromo(false);
    }
  };

  const removePromo = () => {
    setPromoInput("");
    setAppliedPromoCode(null);
    setAppliedPromoType(null);
    setPromoDiscountAmount(0);
    setPromoMessage("");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleApplyPoints = (e: any) => {
    e.preventDefault();
    const ptsToUse = Number(pointsInput);

    if (ptsToUse > availablePoints) {
      Swal.fire(
        "Peringatan",
        `Anda hanya memiliki ${availablePoints} poin.`,
        "warning",
      );
      return;
    }
    if (ptsToUse > maxPointsAllowed) {
      setPointsInput(maxPointsAllowed);
      setPointsUsed(maxPointsAllowed);
      return;
    }
    setPointsUsed(ptsToUse);
  };

  const handleRemovePoints = () => {
    setPointsInput("");
    setPointsUsed(0);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const token = localStorage.getItem("user_token");
      const payload = {
        address_id: selectedAddressId,
        shipping_method: shippingMethod,
        use_points: pointsUsed,
        cart_ids: selectedItemIds,
        courier_company:
          shippingMethod === "biteship" ? selectedRate?.company : null,
        courier_type: shippingMethod === "biteship" ? selectedRate?.type : null,
        shipping_cost:
          shippingMethod === "biteship" ? selectedRate?.price : null,
        delivery_type: shippingMethod === "biteship" ? "now" : null,
        delivery_date: shippingMethod === "biteship" ? deliveryDate : null,
        delivery_time: shippingMethod === "biteship" ? deliveryTime : null,
        promo_code: appliedPromoCode,
        promo_type: appliedPromoType,
      };

      const res = await fetch(`${BASE_URL}/api/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok && data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        throw new Error(data.message || "Gagal membuat tagihan");
      }
    } catch (err: any) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPrice = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const handleImageError = (company: string) => {
    setImageErrors((prev) => ({ ...prev, [company]: true }));
  };

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
    return map[company.toLowerCase()]
      ? "/courier_images/" + map[company.toLowerCase()]
      : null;
  };

  // const handleOpenAddressModal = () => {
  //   setAddressFormData({
  //     region: "",
  //     first_name_address: "",
  //     last_name_address: "",
  //     address_location: "",
  //     city: "",
  //     province: "",
  //     postal_code: "",
  //     location_type: "home",
  //     latitude: "",
  //     longitude: "",
  //     is_default: addresses.length === 0,
  //   });
  //   setIsAddressModalOpen(true);
  // };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const handleSubmitAddress = async (e: any) => {
  //   e.preventDefault();
  //   setIsSubmittingAddress(true);
  //   const token = localStorage.getItem("user_token");
  //   try {
  //     const res = await fetch(`${BASE_URL}/api/addresses`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //         Accept: "application/json",
  //       },
  //       body: JSON.stringify(addressFormData),
  //     });
  //     if (res.ok) {
  //       setIsAddressModalOpen(false);
  //       await fetchAddresses(token!);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsSubmittingAddress(false);
  //   }
  // };

    const handleSubmitAddress = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!formData.latitude || !formData.longitude) {
         Swal.fire(t("notification"), t("warn_select_location"), "warning");
         return;
      }
  
      const token = localStorage.getItem("user_token");
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${BASE_URL}/api/addresses/${editingId}` : `${BASE_URL}/api/addresses`;
  
      try {
        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(formData),
        });
  
        if (res.ok) {
          Swal.fire({ icon: "success", title: "Berhasil!", text: editingId ? t("toast_address_updated") : t("toast_address_added"), timer: 1500, showConfirmButton: false });
          setIsModalOpen(false);
          fetchAddresses(token!);
        } else {
          throw new Error("Gagal menyimpan alamat");
        }
      } catch (error) {
        console.error("Gagal submit alamat:", error);
        Swal.fire(t("error"), t("server_error"), "error");
      }
    };

  const isButtonDisabled =
    isProcessing ||
    checkoutItems.length === 0 ||
    !selectedAddressId ||
    (shippingMethod === "biteship" && !selectedRate);

  if (isPageLoading) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
        <div className="flex gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-1"></div>
          <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-2"></div>
          <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-3"></div>
        </div>
        <p className="font-serif text-sm italic tracking-widest text-gray-500 animate-pulse">
          {t("pay_loading_checkout")}
        </p>
      </div>
    );
  }

  if (checkoutItems.length === 0) {
    return (
      <div className="min-h-screen px-6 py-12 mx-auto font-sans md:py-24 max-w-[1440px] animate-fade-in">
        <div className="py-20 text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-gray-900">
            {t("pay_empty_items")}
          </h2>
          <button
            onClick={() => navigate("/cart")}
            className="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase rounded-full bg-gycora hover:bg-gycora-dark"
          >
            {t("pay_btn_back_cart")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12 mx-auto font-sans md:py-24 max-w-[1440px] animate-fade-in relative">
      <h1 className="mb-12 text-3xl font-extrabold tracking-tighter text-gray-900 uppercase md:text-4xl">
        {t("pay_checkout_title")}
      </h1>

      <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
        <div className="flex-grow space-y-12">
          {/* BAGIAN ALAMAT */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="flex items-center justify-center w-6 h-6 text-[10px] font-bold text-white rounded-full bg-gycora">
                  1
                </span>
                <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">
                  {t("pay_shipping_address")}
                </h2>
              </div>
              {addresses.length > 0 && (
                <button onClick={() => handleOpenModal}
                  className="text-xs font-bold transition-colors text-emerald-600 hover:text-emerald-800"
                >
                  {t("pay_add_address")}
                </button>
              )}
            </div>

            {addresses.length === 0 ? (
              <div className="py-10 text-center border border-gray-300 border-dashed bg-gray-50 rounded-2xl">
                <p className="mb-2 text-sm italic text-gray-500">
                  {t("pay_no_address")}
                </p>
                <button
                  onClick={() => handleOpenModal}
                  className="px-6 py-2 mt-2 text-xs font-bold tracking-widest text-white uppercase transition-colors rounded-full shadow-md bg-gycora hover:bg-gycora-dark"
                >
                  {t("pay_new_address")}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {addresses.map((addr) => (
                  <label
                    key={addr.id}
                    className={`relative flex items-start p-6 border rounded-2xl cursor-pointer transition-all ${selectedAddressId === addr.id ? "border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md" : "border-gray-200 bg-white hover:bg-gray-50"}`}
                  >
                    <input
                      type="radio"
                      name="address"
                      value={addr.id}
                      checked={selectedAddressId === addr.id}
                      onChange={() => setSelectedAddressId(addr.id)}
                      className="w-5 h-5 mt-1 border-gray-300 rounded-full text-gycora focus:ring-gycora"
                    />
                    <div className="flex-grow ml-4">
                      <div className="flex justify-between">
                        <p className="text-sm font-bold text-gray-900 uppercase">
                          {addr.receiver.full_name}
                        </p>
                        {addr.is_default && (
                          <span className="px-2 py-0.5 text-[9px] font-bold text-emerald-800 uppercase bg-emerald-100 rounded">
                            Utama
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">
                        {addr.details.address_location} - {addr.details.type}{" "}
                        <br />
                        {addr.details.city}, {addr.details.province} <br />
                        {addr.details.region} - {addr.details.postal_code}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </section>

          {/* BAGIAN KURIR */}
          <section
            className={
              !selectedAddressId ? "opacity-50 pointer-events-none" : ""
            }
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="flex items-center justify-center w-6 h-6 text-[10px] font-bold text-white rounded-full bg-gycora">
                2
              </span>
              <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">
                {t("pay_shipping_method")}
              </h2>
            </div>

            <div className="space-y-4">
              <label
                className={`relative flex items-center p-6 border rounded-2xl cursor-pointer transition-all ${shippingMethod === "free" ? "border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md" : "border-gray-200 bg-white hover:bg-gray-50"}`}
              >
                <input
                  type="radio"
                  value="free"
                  checked={shippingMethod === "free"}
                  onChange={() => setShippingMethod("free")}
                  className="w-5 h-5 border-gray-300 rounded-full text-gycora focus:ring-gycora"
                />
                <div className="flex items-center justify-between flex-grow ml-4">
                  <div>
                    <p className="text-sm font-bold tracking-wide text-gray-900 uppercase">
                      {t("pay_method_pickup")}
                    </p>
                    <p className="mt-1 text-xs font-bold text-emerald-600">
                      {t("pay_method_pickup_desc")}
                    </p>
                  </div>
                  <p className="font-black text-gycora">
                    {t("pay_method_free")}
                  </p>
                </div>
              </label>

              <label
                className={`relative flex items-center p-6 border rounded-2xl cursor-pointer transition-all ${shippingMethod === "biteship" ? "border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md" : "border-gray-200 bg-white hover:bg-gray-50"}`}
              >
                <input
                  type="radio"
                  value="biteship"
                  checked={shippingMethod === "biteship"}
                  onChange={() => setShippingMethod("biteship")}
                  className="w-5 h-5 border-gray-300 rounded-full text-gycora focus:ring-gycora"
                />
                <div className="flex items-center justify-between flex-grow ml-4">
                  <div>
                    <p className="text-sm font-bold tracking-wide text-gray-900 uppercase">
                      {t("pay_method_courier")}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {t("pay_method_courier_desc")}
                    </p>
                  </div>
                </div>
              </label>

              {shippingMethod === "biteship" && (
                <div className="p-6 mt-4 space-y-8 bg-white border border-gray-200 rounded-3xl animate-fade-in">
                  <h3 className="pt-2 text-sm font-bold tracking-widest text-gray-900 uppercase border-t border-gray-100">
                    {t("pay_choose_courier")}
                  </h3>
                  {isLoadingRates ? (
                    <p className="py-4 text-sm text-center text-gray-500 animate-pulse">
                      {t("pay_calc_shipping")}
                    </p>
                  ) : processedShippingRates.length === 0 ? (
                    <p className="py-4 text-xs italic text-center text-red-500">
                      {t("pay_no_courier")}
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {processedShippingRates.map((rate, idx) => (
                        <label
                          key={idx}
                          className={`relative flex flex-col p-4 border rounded-xl transition-all ${rate.is_disabled ? "opacity-50 bg-gray-50 pointer-events-none" : selectedRate?.company === rate.company && selectedRate?.type === rate.type ? "border-gycora bg-emerald-50/10 shadow-sm" : "border-gray-200 hover:bg-gray-50 cursor-pointer"}`}
                        >
                          <div className="flex items-center w-full">
                            <input
                              type="radio"
                              disabled={rate.is_disabled}
                              checked={
                                selectedRate?.company === rate.company &&
                                selectedRate?.type === rate.type
                              }
                              onChange={() => setSelectedRate(rate)}
                              className="w-4 h-4 border-gray-300 text-gycora focus:ring-gycora"
                            />
                            <div className="flex items-center flex-grow gap-4 ml-4">
                              <div className="flex items-center justify-center w-12 h-12 overflow-hidden bg-white border border-gray-100 rounded-lg shrink-0">
                                {!imageErrors[rate.company] &&
                                getCourierLogo(rate.company) ? (
                                  <img
                                    src={getCourierLogo(rate.company)!}
                                    alt={rate.company}
                                    className="object-contain w-full h-full p-1"
                                    onError={() =>
                                      handleImageError(rate.company)
                                    }
                                  />
                                ) : (
                                  <span className="text-[10px] font-black text-gray-400">
                                    {rate.company.toUpperCase()}
                                  </span>
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-bold tracking-wide text-gray-800 uppercase">
                                  {rate.company} - {rate.type}
                                </p>
                                <p className="text-[10px] text-gray-500 mt-0.5">
                                  {rate.courier_name} ({rate.duration})
                                </p>
                              </div>
                            </div>
                            <p className="text-sm font-black text-gray-900">
                              {formatPrice(rate.price)}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* BAGIAN KANAN: RINGKASAN PESANAN */}
        <div className="space-y-6 lg:w-[450px] xl:w-[480px] shrink-0">
          <div className="sticky p-8 border border-gray-100 shadow-xl bg-gray-50 rounded-3xl top-28">
            <h2 className="pb-4 mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">
              {t("pay_order_summary")}
            </h2>

            <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {checkoutItems.map((item: any) => {
                let colorHex = item.color;
                let colorName = "";
                try {
                  const parsed = JSON.parse(item.color as string);
                  if (parsed.hex) {
                    colorHex = parsed.hex;
                    colorName = parsed.name || "";
                  }
                } catch {}

                let displayPrice = item.product.discount_price
                  ? Number(item.product.discount_price)
                  : Number(item.product.price);
                const isVoucherActive =
                  appliedPromoType === "voucher" &&
                  item.product.voucher_discount_price &&
                  Number(item.product.voucher_discount_price) > 0;
                if (isVoucherActive)
                  displayPrice = Number(item.product.voucher_discount_price);

                return (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="object-cover w-16 h-16 bg-white border border-gray-100 rounded-xl shrink-0"
                    />
                    <div className="flex-grow">
                      <p
                        className="w-40 text-[11px] font-bold text-gray-900 uppercase truncate"
                        title={item.product.name}
                      >
                        {item.product.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-[10px] text-gray-400">
                          Qty: {item.quantity}
                        </p>
                        {item.color && (
                          <>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <div className="flex items-center gap-1.5">
                              <div
                                className="w-3 h-3 border border-gray-300 rounded-full shadow-sm shrink-0"
                                style={{ backgroundColor: colorHex }}
                              ></div>
                              {colorName && (
                                <span className="text-[10px] font-bold text-gray-500 uppercase">
                                  {colorName}
                                </span>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                      {isVoucherActive ? (
                        <p className="mt-1 text-xs font-medium text-amber-600">
                          {formatPrice(displayPrice * item.quantity)}{" "}
                          <span className="text-[9px] line-through text-gray-400 ml-1">
                            {formatPrice(item.gross_amount)}
                          </span>
                        </p>
                      ) : (
                        <p className="mt-1 text-xs font-medium text-gycora">
                          {formatPrice(displayPrice * item.quantity)}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 space-y-3 text-sm border-t border-gray-200">
              <div className="flex justify-between text-gray-500">
                <span>{t("pay_total_items")}</span>
                <span className="font-bold text-gray-900">
                  {checkoutCount} items
                </span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>{t("pay_product_subtotal")}</span>
                <span
                  className={
                    appliedPromoType === "voucher"
                      ? "text-amber-600 font-bold"
                      : ""
                  }
                >
                  {formatPrice(checkoutTotalAmount)}
                </span>
              </div>

              {/* Promo Code */}
              <div className="pt-4 mt-2 border-t border-gray-200 border-dashed">
                <label className="block mb-2 text-[10px] font-bold tracking-widest text-gray-900 uppercase">
                  {t("pay_promo_label")}
                </label>
                <form onSubmit={applyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    disabled={!!appliedPromoCode || isVerifyingPromo}
                    placeholder={t("pay_promo_placeholder")}
                    className="flex-1 px-3 py-2 text-sm uppercase bg-white border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-gycora disabled:bg-gray-100"
                  />
                  {!appliedPromoCode ? (
                    <button
                      type="submit"
                      disabled={!promoInput || isVerifyingPromo}
                      className="flex items-center justify-center w-20 px-4 text-[10px] font-bold text-white uppercase transition rounded-lg bg-gycora hover:bg-gycora-dark disabled:bg-gray-300"
                    >
                      {isVerifyingPromo ? "..." : t("pay_btn_apply")}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={removePromo}
                      className="w-20 px-4 text-[10px] font-bold text-red-600 uppercase transition border border-red-200 rounded-lg bg-red-50 hover:bg-red-100"
                    >
                      {t("pay_btn_remove")}
                    </button>
                  )}
                </form>
                {promoMessage && (
                  <p
                    className={`mt-2 text-[10px] font-medium ${appliedPromoCode ? "text-emerald-600" : "text-red-500"}`}
                  >
                    {promoMessage}
                  </p>
                )}
                {appliedPromoCode && (
                  <div className="flex justify-between text-[10px] md:text-xs font-medium text-emerald-600 mt-2">
                    <span className="pr-2 truncate">
                      Promo (
                      <span className="font-mono uppercase">
                        {appliedPromoCode}
                      </span>
                      )
                    </span>
                    <span>- {formatPrice(actualPromoDiscount)}</span>
                  </div>
                )}
              </div>

              {/* Loyalty Points */}
              <div className="pt-4 mt-2 border-t border-gray-200 border-dashed">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[10px] font-bold tracking-widest text-gray-900 uppercase">
                    {t("pay_loyalty_points")}
                  </label>
                  <span className="text-xs text-gray-500">
                    {t("pay_balance")}{" "}
                    <strong className="text-gycora">
                      {availablePoints} Pts
                    </strong>
                  </span>
                </div>
                <form onSubmit={handleApplyPoints} className="flex gap-2">
                  <input
                    type="number"
                    value={pointsInput}
                    onChange={(e) =>
                      setPointsInput(
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    disabled={pointsUsed > 0 || availablePoints <= 0}
                    placeholder={`Maks: ${maxPointsAllowed}`}
                    className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-gycora disabled:bg-gray-100"
                    min="0"
                    max={maxPointsAllowed}
                  />
                  {pointsUsed === 0 ? (
                    <button
                      type="submit"
                      disabled={!pointsInput || availablePoints <= 0}
                      className="flex items-center justify-center w-24 px-4 text-[10px] font-bold text-white uppercase transition rounded-lg bg-gycora hover:bg-gycora-dark disabled:bg-gray-300"
                    >
                      {t("pay_btn_use")}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleRemovePoints}
                      className="w-24 px-4 text-[10px] font-bold text-red-600 uppercase transition border border-red-200 rounded-lg bg-red-50 hover:bg-red-100"
                    >
                      {t("pay_btn_cancel")}
                    </button>
                  )}
                </form>
                {pointsUsed > 0 && (
                  <div className="flex items-center justify-between mt-3 animate-fade-in">
                    <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                      {t("pay_points_applied")} ({pointsUsed} Pts)
                    </span>
                    <span className="text-[11px] font-medium text-emerald-600">
                      - {formatPrice(appliedPointDiscount)}
                    </span>
                  </div>
                )}
              </div>

              {/* Ongkos Kirim */}
              <div className="flex items-start justify-between pt-4 mt-2 text-gray-500 border-t border-gray-200 border-dashed">
                <span>{t("pay_shipping_cost")}</span>
                {shippingMethod === "free" ? (
                  <span className="font-bold text-emerald-600">
                    {t("pay_method_pickup")}
                  </span>
                ) : shippingMethod === "biteship" && selectedRate ? (
                  <div className="text-right">
                    <span className="block font-medium text-gray-900">
                      {formatPrice(selectedRate.price * checkoutCount)}
                    </span>
                    <p className="mt-1 text-[10px] text-gray-400">
                      {formatPrice(selectedRate.price)} x {checkoutCount} item
                    </p>
                  </div>
                ) : (
                  <span className="text-[10px] italic">Pilih metode</span>
                )}
              </div>

              <div className="flex justify-between pt-4 font-bold text-gray-900 border-t border-gray-200">
                <span className="mt-1 text-xs tracking-widest uppercase">
                  {t("pay_grand_total")}
                </span>
                <span className="text-xl text-gycora">
                  {formatPrice(grandTotal)}
                </span>
              </div>

              <button
                onClick={handlePayment}
                disabled={isButtonDisabled}
                className="flex items-center justify-center w-full gap-3 py-4 mt-8 text-xs font-bold tracking-[0.3em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/10"
              >
                {!isProcessing ? t("pay_btn_pay_now") : t("pay_btn_processing")}
              </button>

              {!selectedAddressId && (
                <p className="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase">
                  {t("pay_alert_no_address")}
                </p>
              )}
              {shippingMethod === "biteship" && !selectedRate && (
                <p className="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase">
                  {t("pay_alert_no_courier")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ADDRESS MODAL IGNORED FOR BREVITY */}
      {/* ======================================================= */}
      {/* MODAL FORM ALAMAT */}
      {/* ======================================================= */}
      {/* {isAddressModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">
                Tambah Alamat Baru
              </h3>
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="text-gray-400 transition-colors hover:text-gray-900"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form
              onSubmit={handleSubmitAddress}
              className="flex-1 p-6 space-y-6 overflow-y-auto"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    Nama Depan Penerima
                  </label>
                  <input
                    type="text"
                    required
                    value={addressFormData.first_name_address}
                    onChange={(e) =>
                      setAddressFormData({
                        ...addressFormData,
                        first_name_address: e.target.value,
                      })
                    }
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    Nama Belakang Penerima
                  </label>
                  <input
                    type="text"
                    required
                    value={addressFormData.last_name_address}
                    onChange={(e) =>
                      setAddressFormData({
                        ...addressFormData,
                        last_name_address: e.target.value,
                      })
                    }
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-700">
                  Label Alamat (Rumah/Kantor)
                </label>
                <select
                  value={addressFormData.location_type}
                  onChange={(e) =>
                    setAddressFormData({
                      ...addressFormData,
                      location_type: e.target.value,
                    })
                  }
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none bg-white"
                >
                  <option value="home">Rumah</option>
                  <option value="office">Kantor</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-700">
                  Alamat Lengkap (Jalan, RT/RW, Patokan)
                </label>
                <textarea
                  required
                  rows={3}
                  value={addressFormData.address_location}
                  onChange={(e) =>
                    setAddressFormData({
                      ...addressFormData,
                      address_location: e.target.value,
                    })
                  }
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none resize-none"
                ></textarea>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    Provinsi
                  </label>
                  <input
                    type="text"
                    required
                    value={addressFormData.province}
                    onChange={(e) =>
                      setAddressFormData({
                        ...addressFormData,
                        province: e.target.value,
                      })
                    }
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    Kota / Kabupaten
                  </label>
                  <input
                    type="text"
                    required
                    value={addressFormData.city}
                    onChange={(e) =>
                      setAddressFormData({
                        ...addressFormData,
                        city: e.target.value,
                      })
                    }
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    Kecamatan / Region
                  </label>
                  <input
                    type="text"
                    required
                    value={addressFormData.region}
                    onChange={(e) =>
                      setAddressFormData({
                        ...addressFormData,
                        region: e.target.value,
                      })
                    }
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    Kode Pos
                  </label>
                  <input
                    type="text"
                    required
                    value={addressFormData.postal_code}
                    onChange={(e) =>
                      setAddressFormData({
                        ...addressFormData,
                        postal_code: e.target.value,
                      })
                    }
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 mt-4 border rounded-lg bg-emerald-50 border-emerald-100">
                <input
                  type="checkbox"
                  id="is_default"
                  checked={addressFormData.is_default}
                  onChange={(e) =>
                    setAddressFormData({
                      ...addressFormData,
                      is_default: e.target.checked,
                    })
                  }
                  className="w-5 h-5 rounded cursor-pointer text-gycora focus:ring-gycora accent-gycora"
                />
                <label
                  htmlFor="is_default"
                  className="text-sm font-bold cursor-pointer select-none text-emerald-800"
                >
                  Jadikan sebagai alamat utama
                </label>
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingAddress}
                  className="px-6 py-2.5 text-sm font-bold text-white bg-gray-900 hover:bg-black disabled:bg-gray-400 rounded-full shadow-lg transition-colors"
                >
                  {isSubmittingAddress ? "Menyimpan..." : "Simpan Alamat"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}
            {/* --- MODAL FORM ALAMAT DENGAN PETA --- */}
            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-10 pb-10 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fade-in-up">
                <div className="flex flex-col w-full max-w-5xl my-auto overflow-hidden bg-white shadow-2xl rounded-3xl">
                  <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50 shrink-0">
                    <h3 className="text-xl font-extrabold tracking-tight text-gray-900">
                      {editingId ? t("modal_edit_address_title") : t("modal_add_address_title")}
                    </h3>
                    <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
      
                  <div className="flex flex-col md:flex-row h-auto md:h-[650px] overflow-hidden">
                    {/* BAGIAN PETA (KIRI) */}
                    <div className="relative w-full bg-gray-100 border-b border-gray-200 h-72 md:h-full md:w-5/12 md:border-b-0 md:border-r shrink-0">
                      <MapContainer center={mapPosition} zoom={15} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={mapPosition}>
                          <Popup>{t("popup_selected_location")}</Popup>
                        </Marker>
                        <MapEvents />
                        <MapCenterUpdater position={mapPosition} />
                      </MapContainer>
                      
                      <button 
                        type="button"
                        onClick={handleGetCurrentLocation}
                        disabled={isGettingLocation}
                        className="absolute z-[1000] bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:-translate-x-0 md:right-6 flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-full shadow-xl font-bold text-xs hover:bg-gray-50 border border-gray-200 transition-all hover:-translate-y-0.5"
                      >
                        {isGettingLocation ? (
                          <span className="w-4 h-4 border-2 rounded-full border-[#006A4E] border-t-transparent animate-spin"></span>
                        ) : (
                          <svg className="w-4 h-4 text-[#006A4E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        )}
                        {t("btn_use_current_location")}
                      </button>
                    </div>
      
                    {/* BAGIAN FORM (KANAN) */}
                    <form onSubmit={handleSubmitAddress} className="flex flex-col flex-1 p-6 space-y-6 overflow-y-auto bg-white sm:p-8 custom-scrollbar">
                      
                      <div className="flex gap-3 p-4 border border-blue-100 rounded-2xl bg-blue-50/50">
                        <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <p className="text-xs leading-relaxed text-blue-800">
                          {t("guide_map_text")}
                        </p>
                      </div>
      
                      <div className="space-y-5">
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                          <div>
                            <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_first_name")}</label>
                            <input type="text" required value={formData.first_name_address} onChange={(e) => setFormData({ ...formData, first_name_address: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_last_name")}</label>
                            <input type="text" required value={formData.last_name_address} onChange={(e) => setFormData({ ...formData, last_name_address: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
                          </div>
                        </div>
      
                        <div>
                          <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_address_type")}</label>
                          <select value={formData.location_type} onChange={(e) => setFormData({ ...formData, location_type: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none bg-white transition-all">
                            <option value="home">{t("option_home")}</option>
                            <option value="office">{t("option_office")}</option>
                            <option value="other">{t("option_other")}</option>
                          </select>
                        </div>
      
                        <div>
                          <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_full_address")}</label>
                          <textarea required rows={3} placeholder={t("placeholder_full_address")} value={formData.address_location} onChange={(e) => setFormData({ ...formData, address_location: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none resize-none bg-white transition-all"></textarea>
                        </div>
      
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <div>
                            <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_region")}</label>
                            <input type="text" required value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_city")}</label>
                            <input type="text" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_province")}</label>
                            <input type="text" required value={formData.province} onChange={(e) => setFormData({ ...formData, province: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_postal_code")}</label>
                            <input type="text" required value={formData.postal_code} onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
                          </div>
                        </div>
      
                        <input type="hidden" value={formData.latitude} />
                        <input type="hidden" value={formData.longitude} />
      
                        <div className="flex items-center gap-3 p-4 mt-2 transition-colors border border-gray-200 cursor-pointer rounded-xl bg-gray-50 hover:bg-gray-100" onClick={() => setFormData({ ...formData, is_default: !formData.is_default })}>
                          <input type="checkbox" id="is_default" checked={formData.is_default} onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })} className="w-5 h-5 rounded cursor-pointer text-[#006A4E] focus:ring-[#006A4E] accent-[#006A4E]" onClick={(e) => e.stopPropagation()} />
                          <label htmlFor="is_default" className="text-sm font-bold text-gray-800 cursor-pointer select-none" onClick={(e) => e.stopPropagation()}>
                            {t("label_set_default_address")}
                          </label>
                        </div>
                      </div>
      
                      <div className="flex justify-end gap-3 pt-6 mt-auto border-t border-gray-100">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-sm font-bold text-gray-600 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200">
                          {t("btn_cancel")}
                        </button>
                        <button type="submit" className="px-6 py-3 text-sm font-bold text-white transition-all shadow-md bg-[#006A4E] rounded-xl hover:bg-emerald-900 hover:shadow-lg">
                          {editingId ? t("btn_update_address") : t("btn_save_address")}
                        </button>
                      </div>
                    </form>
                  </div>
      
                </div>
              </div>
            )}
    </div>
  );
}


