/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable no-empty */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { useState, useEffect, useMemo, useCallback } from "react";

// import { useNavigate, useLocation } from "react-router-dom";

// import Swal from "sweetalert2";

// import { useCart } from "../../context/CartContext";

// import { BASE_URL } from "../../config/api";

// import { useLanguage } from "../../context/LanguageContext";

// import { useCurrency } from "../../context/CurrencyContext";

// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMapEvents,
//   useMap,
// } from "react-leaflet";

// interface Address {
//   id: number;

//   receiver: { first_name: string; last_name: string; full_name: string };

//   details: {
//     region: string;

//     address_location: string;

//     type: string;

//     city: string;

//     province: string;

//     postal_code: string;

//     latitude: string;

//     longitude: string;
//   };

//   is_default: boolean;
// }

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

// export default function PaymentPage() {
//   const navigate = useNavigate();

//   const location = useLocation();

//   const { t } = useLanguage();

//   // Ambil state multi-currency

//   const { currency, exchangeRates } = useCurrency();

//   const curr = (currency as Currency) || "IDR";

//   const { cartItems } = useCart();

//   const selectedItemIds: number[] = location.state?.selectedIds || [];

//   const [isPageLoading, setIsPageLoading] = useState(true);

//   const [userType, setUserType] = useState<string>("guest");

//   // --- STATE KATALOG (Untuk Injeksi Harga Asli) ---

//   const [catalogProducts, setCatalogProducts] = useState<any[]>([]);

//   const [isCatalogLoaded, setIsCatalogLoaded] = useState(false);

//   // --- STATE ALAMAT ---

//   const [addresses, setAddresses] = useState<any[]>([]);

//   const defaultPosition: [number, number] = [-6.175392, 106.827153];

//   const [mapPosition, setMapPosition] =
//     useState<[number, number]>(defaultPosition);

//   const [isGettingLocation, setIsGettingLocation] = useState(false);

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [editingId, setEditingId] = useState<number | null>(null);

//   const [formData, setFormData] = useState({
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

//   const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
//     null,
//   );

//   const getUrlPrefix = () => {
//     if (location.pathname.startsWith("/id")) return "/id";

//     if (location.pathname.startsWith("/en")) return "/en";

//     return "";
//   };

//   const urlPrefix = getUrlPrefix();

//   // --- STATE PENGIRIMAN ---

//   const [shippingMethod, setShippingMethod] = useState("free");

//   const [selectedRate, setSelectedRate] = useState<any>(null);

//   const [isLoadingRates, setIsLoadingRates] = useState(false);

//   const [rawShippingRates, setRawShippingRates] = useState<any[]>([]);

//   const [deliveryDate, setDeliveryDate] = useState("");

//   const [deliveryTime, setDeliveryTime] = useState("");

//   // --- STATE DISKON PROMO & POIN ---

//   const [promoInput, setPromoInput] = useState("");

//   const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);

//   const [promoDiscountAmount, setPromoDiscountAmount] = useState(0);

//   const [appliedPromoType, setAppliedPromoType] = useState<string | null>(null);

//   const [promoMessage, setPromoMessage] = useState("");

//   const [isVerifyingPromo, setIsVerifyingPromo] = useState(false);

//   const [availablePoints, setAvailablePoints] = useState(0);

//   const [pointsInput, setPointsInput] = useState<number | "">("");

//   const [pointsUsed, setPointsUsed] = useState<number>(0);

//   const [isProcessing, setIsProcessing] = useState(false);

//   const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

//   // ============================================================================

//   // 1. HELPER HARGA MURNI DARI DATABASE (TANPA KONVERSI MATEMATIKA UNTUK PRODUK)

//   // ============================================================================

//   // const getPriceToDisplay = useCallback((product: any) => {

//   //   if (!product) return { value: 0, curr: "IDR" };

//   //   if (curr === "IDR") return { value: Number(product.price), curr: "IDR" };

//   //   try {

//   //     const pricesObj = typeof product.prices === "string" ? JSON.parse(product.prices) : product.prices || {};

//   //     const dbPrice = pricesObj[curr] || pricesObj[curr.toLowerCase()] || pricesObj[curr.toUpperCase()];

//   //     if (dbPrice) return { value: parseFloat(dbPrice), curr: curr };

//   //   } catch (e) { console.error(e); }

//   //   return { value: Number(product.price), curr: "IDR" };

//   // }, [curr]);

//   // const getDiscountToDisplay = useCallback((product: any) => {

//   //   if (!product) return null;

//   //   if (curr === "IDR") return product.discount_price ? { value: Number(product.discount_price), curr: "IDR" } : null;

//   //   try {

//   //     const discObj = typeof product.discount_prices === "string" ? JSON.parse(product.discount_prices) : product.discount_prices || {};

//   //     const dbDisc = discObj[curr] || discObj[curr.toLowerCase()] || discObj[curr.toUpperCase()];

//   //     if (dbDisc) return { value: parseFloat(dbDisc), curr: curr };

//   //   } catch (e) { console.error(e); }

//   //   return product.discount_price ? { value: Number(product.discount_price), curr: "IDR" } : null;

//   // }, [curr]);

//   // const formatCurrencyDisplay = useCallback((priceObj: { value: number; curr: string } | null) => {

//   //   if (!priceObj) return "";

//   //   const symbols: any = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };

//   //   const formatter = new Intl.NumberFormat(priceObj.curr === "IDR" ? "id-ID" : "en-US", {

//   //     minimumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,

//   //     maximumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,

//   //   });

//   //   return `${symbols[priceObj.curr] || priceObj.curr + " "}${formatter.format(priceObj.value)}`;

//   // }, []);

//   // const getActivePriceObj = useCallback((product: any, totalQty: number) => {

//   //   const isReseller = userType === "reseller";

//   //   const wholesale = Number(product.wholesale_price) || 0;

//   //   const voucher = Number(product.voucher_discount_price) || 0;

//   //   // Voucher spesifik selalu IDR

//   //   if (appliedPromoType === "voucher" && voucher > 0) {

//   //     return { value: voucher, curr: "IDR" };

//   //   }

//   //   const dynamicPriceObj = getPriceToDisplay(product);

//   //   const dynamicDiscountObj = getDiscountToDisplay(product);

//   //   if (isReseller && wholesale > 0 && totalQty >= 24) {

//   //     return { value: wholesale, curr: "IDR" };

//   //   } else if (dynamicDiscountObj && dynamicDiscountObj.value > 0 && dynamicDiscountObj.value < dynamicPriceObj.value) {

//   //     return dynamicDiscountObj;

//   //   }

//   //   return dynamicPriceObj;

//   // }, [userType, appliedPromoType, getPriceToDisplay, getDiscountToDisplay]);

//   // ============================================================================

//   // 1. HELPER HARGA MURNI DARI DATABASE (TANPA KONVERSI MATEMATIKA UNTUK PRODUK)

//   // ============================================================================

//   const getPriceToDisplay = useCallback(
//     (product: any) => {
//       if (!product) return { value: 0, curr: "IDR" };

//       if (curr === "IDR") return { value: Number(product.price), curr: "IDR" };

//       try {
//         const pricesObj =
//           typeof product.prices === "string"
//             ? JSON.parse(product.prices)
//             : product.prices || {};

//         const dbPrice =
//           pricesObj[curr] ||
//           pricesObj[curr.toLowerCase()] ||
//           pricesObj[curr.toUpperCase()];

//         if (dbPrice) return { value: parseFloat(dbPrice), curr: curr };
//       } catch (e) {
//         console.error(e);
//       }

//       return { value: Number(product.price), curr: "IDR" };
//     },
//     [curr],
//   );

//   const getDiscountToDisplay = useCallback(
//     (product: any) => {
//       if (!product) return null;

//       if (curr === "IDR")
//         return product.discount_price
//           ? { value: Number(product.discount_price), curr: "IDR" }
//           : null;

//       try {
//         const discObj =
//           typeof product.discount_prices === "string"
//             ? JSON.parse(product.discount_prices)
//             : product.discount_prices || {};

//         const dbDisc =
//           discObj[curr] ||
//           discObj[curr.toLowerCase()] ||
//           discObj[curr.toUpperCase()];

//         if (dbDisc) return { value: parseFloat(dbDisc), curr: curr };
//       } catch (e) {
//         console.error(e);
//       }

//       return product.discount_price
//         ? { value: Number(product.discount_price), curr: "IDR" }
//         : null;
//     },
//     [curr],
//   );

//   // 👇 [PERBAIKAN] Tambahkan Helper Wholesale Multi-Currency 👇

//   const getWholesaleToDisplay = useCallback(
//     (product: any) => {
//       if (!product) return null;

//       if (curr === "IDR")
//         return product.wholesale_price
//           ? { value: Number(product.wholesale_price), curr: "IDR" }
//           : null;

//       try {
//         const wholesaleObj =
//           typeof product.wholesale_prices === "string"
//             ? JSON.parse(product.wholesale_prices)
//             : product.wholesale_prices || {};

//         const dbWholesale =
//           wholesaleObj[curr] ||
//           wholesaleObj[curr.toLowerCase()] ||
//           wholesaleObj[curr.toUpperCase()];

//         if (dbWholesale) return { value: parseFloat(dbWholesale), curr: curr };
//       } catch (e) {
//         console.error(e);
//       }

//       return product.wholesale_price
//         ? { value: Number(product.wholesale_price), curr: "IDR" }
//         : null;
//     },
//     [curr],
//   );

//   const formatCurrencyDisplay = useCallback(
//     (priceObj: { value: number; curr: string } | null) => {
//       if (!priceObj) return "";

//       const symbols: any = {
//         USD: "$",
//         SGD: "S$",
//         EUR: "€",
//         AUD: "A$",
//         MYR: "RM",
//         IDR: "Rp ",
//       };

//       const formatter = new Intl.NumberFormat(
//         priceObj.curr === "IDR" ? "id-ID" : "en-US",
//         {
//           minimumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,

//           maximumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//         },
//       );

//       return `${symbols[priceObj.curr] || priceObj.curr + " "}${formatter.format(priceObj.value)}`;
//     },
//     [],
//   );

//   const getActivePriceObj = useCallback(
//     (product: any, totalQty: number) => {
//       const isReseller = userType === "reseller";

//       const voucher = Number(product.voucher_discount_price) || 0;

//       // Voucher spesifik selalu IDR

//       if (appliedPromoType === "voucher" && voucher > 0) {
//         return { value: voucher, curr: "IDR" };
//       }

//       const dynamicPriceObj = getPriceToDisplay(product);

//       const dynamicDiscountObj = getDiscountToDisplay(product);

//       const dynamicWholesaleObj = getWholesaleToDisplay(product);

//       const hasWholesale = dynamicWholesaleObj && dynamicWholesaleObj.value > 0;

//       if (isReseller && hasWholesale && totalQty >= 24) {
//         return dynamicWholesaleObj!;
//       } else if (
//         dynamicDiscountObj &&
//         dynamicDiscountObj.value > 0 &&
//         dynamicDiscountObj.value < dynamicPriceObj.value
//       ) {
//         return dynamicDiscountObj;
//       }

//       return dynamicPriceObj;
//     },
//     [
//       userType,
//       appliedPromoType,
//       getPriceToDisplay,
//       getDiscountToDisplay,
//       getWholesaleToDisplay,
//     ],
//   );

//   const convertIDRtoActiveCurrency = useCallback(
//     (idrAmount: number) => {
//       if (curr === "IDR" || !exchangeRates || !exchangeRates[curr])
//         return { value: idrAmount, curr: "IDR" };

//       return { value: idrAmount * exchangeRates[curr], curr: curr };
//     },
//     [curr, exchangeRates],
//   );

//   const getFreshProduct = useCallback(
//     (cartProduct: any) => {
//       if (catalogProducts.length > 0 && cartProduct) {
//         const fresh = catalogProducts.find((p) => p.id === cartProduct.id);

//         if (fresh) return fresh;
//       }

//       return cartProduct;
//     },
//     [catalogProducts],
//   );

//   // ============================================================================

//   // 2. DATA CALCULATION (Menggunakan Fresh Product dari DB)

//   // ============================================================================

//   const checkoutItems = useMemo(() => {
//     let baseItems = cartItems.filter((item) =>
//       selectedItemIds.includes(item.id),
//     );

//     if (catalogProducts.length > 0) {
//       baseItems = baseItems.map((item) => {
//         const fresh = catalogProducts.find((p) => p.id === item.product_id);

//         return fresh ? { ...item, product: fresh } : item;
//       });
//     }

//     return baseItems;
//   }, [cartItems, selectedItemIds, catalogProducts]);

//   const checkoutCount = useMemo(() => {
//     return checkoutItems.reduce((sum, item) => sum + item.quantity, 0);
//   }, [checkoutItems]);

//   // Total Murni IDR (Untuk validasi Poin & Promo)

//   const checkoutTotalIDR = useMemo(() => {
//     return checkoutItems.reduce((sum, item) => {
//       const isReseller = userType === "reseller";

//       const wholesale = Number(item.product.wholesale_price) || 0;

//       const discount = Number(item.product.discount_price) || 0;

//       let priceToUse = Number(item.product.price) || 0;

//       if (isReseller && wholesale > 0 && checkoutCount >= 24) {
//         priceToUse = wholesale;
//       } else if (discount > 0 && discount < priceToUse) {
//         priceToUse = discount;
//       }

//       if (
//         appliedPromoType === "voucher" &&
//         item.product.voucher_discount_price &&
//         Number(item.product.voucher_discount_price) > 0
//       ) {
//         priceToUse = Number(item.product.voucher_discount_price);
//       }

//       return sum + priceToUse * item.quantity;
//     }, 0);
//   }, [checkoutItems, appliedPromoType, userType, checkoutCount]);

//   // Total Tampil Multi-Currency

//   const checkoutTotalAmountObj = useMemo(() => {
//     const totalValue = checkoutItems.reduce((sum, item) => {
//       const activeObj = getActivePriceObj(item.product, checkoutCount);

//       let val = activeObj.value;

//       if (activeObj.curr === "IDR" && curr !== "IDR") {
//         val = val * (exchangeRates?.[curr] || 1);
//       }

//       return sum + val * item.quantity;
//     }, 0);

//     return { value: totalValue, curr };
//   }, [checkoutItems, checkoutCount, curr, getActivePriceObj, exchangeRates]);

//   // Diskon Promo

//   const actualPromoDiscountIDR = useMemo(() => {
//     if (appliedPromoType === "claim") {
//       const productDiscount = Math.floor(checkoutTotalIDR * 0.1);

//       let shippingCost = 0;

//       if (shippingMethod === "biteship" && selectedRate) {
//         shippingCost = parseFloat(selectedRate.price) * checkoutCount;
//       }

//       const shippingSubsidy = Math.min(10000, shippingCost);

//       return productDiscount + shippingSubsidy;
//     }

//     return promoDiscountAmount;
//   }, [
//     appliedPromoType,
//     checkoutTotalIDR,
//     shippingMethod,
//     selectedRate,
//     checkoutCount,
//     promoDiscountAmount,
//   ]);

//   const actualPromoDiscountObj = convertIDRtoActiveCurrency(
//     actualPromoDiscountIDR,
//   );

//   // Diskon Poin

//   const maxPointsAllowed = useMemo(() => {
//     const maxUsableAmount = Math.max(
//       0,
//       checkoutTotalIDR - actualPromoDiscountIDR,
//     );

//     return Math.min(availablePoints, Math.floor(maxUsableAmount / 1000));
//   }, [availablePoints, checkoutTotalIDR, actualPromoDiscountIDR]);

//   const appliedPointDiscountIDR = pointsUsed * 1000;

//   const appliedPointDiscountObj = convertIDRtoActiveCurrency(
//     appliedPointDiscountIDR,
//   );

//   // Ongkos Kirim

//   const shippingCostIDR =
//     shippingMethod === "biteship" && selectedRate
//       ? parseFloat(selectedRate.price) * checkoutCount
//       : 0;

//   const shippingCostObj = convertIDRtoActiveCurrency(shippingCostIDR);

//   // Grand Total

//   const grandTotalObj = useMemo(() => {
//     return {
//       value:
//         checkoutTotalAmountObj.value +
//         shippingCostObj.value -
//         actualPromoDiscountObj.value -
//         appliedPointDiscountObj.value,

//       curr: curr,
//     };
//   }, [
//     checkoutTotalAmountObj,
//     shippingCostObj,
//     actualPromoDiscountObj,
//     appliedPointDiscountObj,
//     curr,
//   ]);

//   // ============================================================================

//   // 3. API & EFFECT HANDLING

//   // ============================================================================

//   const handleGetCurrentLocation = () => {
//     setIsGettingLocation(true);

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const lat = position.coords.latitude;

//           const lng = position.coords.longitude;

//           setMapPosition([lat, lng]);

//           fetchAddressFromCoords(lat, lng);

//           setIsGettingLocation(false);
//         },

//         () => {
//           Swal.fire("Akses Ditolak", t("warn_location_denied"), "warning");

//           setIsGettingLocation(false);
//         },
//       );
//     } else {
//       Swal.fire("Tidak Mendukung", t("warn_location_unsupported"), "error");

//       setIsGettingLocation(false);
//     }
//   };

//   const fetchAddressFromCoords = async (lat: number, lng: number) => {
//     try {
//       const res = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
//       );

//       const data = await res.json();

//       if (data && data.address) {
//         const { address } = data;

//         const newCity = address.city || address.town || address.county || "";

//         const newRegion =
//           address.suburb || address.village || address.neighbourhood || "";

//         const newProvince = address.state || "";

//         const newPostal = address.postcode || "";

//         const roadName = address.road || "";

//         const houseNumber = address.house_number || "";

//         const fullStreet = roadName
//           ? `${roadName} ${houseNumber}`.trim()
//           : data.display_name;

//         setFormData((prev) => ({
//           ...prev,
//           latitude: lat.toString(),
//           longitude: lng.toString(),

//           address_location: fullStreet,
//           city: newCity,
//           province: newProvince,

//           region: newRegion,
//           postal_code: newPostal,
//         }));
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const MapEvents = useCallback(() => {
//     useMapEvents({
//       click(e) {
//         setMapPosition([e.latlng.lat, e.latlng.lng]);

//         fetchAddressFromCoords(e.latlng.lat, e.latlng.lng);
//       },
//     });

//     return null;
//   }, []);

//   const MapCenterUpdater = ({ position }: { position: [number, number] }) => {
//     const map = useMap();

//     useEffect(() => {
//       map.setView(position, map.getZoom());
//     }, [position, map]);

//     return null;
//   };

//   useEffect(() => {
//     if (pointsUsed > maxPointsAllowed) {
//       setPointsUsed(maxPointsAllowed);

//       setPointsInput(maxPointsAllowed > 0 ? maxPointsAllowed : "");
//     }
//   }, [maxPointsAllowed, pointsUsed]);

//   const handleOpenModal = (address: Address | null = null) => {
//     if (address) {
//       setEditingId(address.id);

//       const lat = parseFloat(address.details.latitude);

//       const lng = parseFloat(address.details.longitude);

//       setMapPosition(!isNaN(lat) && !isNaN(lng) ? [lat, lng] : defaultPosition);

//       setFormData({
//         region: address.details.region || "",
//         first_name_address: address.receiver.first_name,

//         last_name_address: address.receiver.last_name,
//         address_location: address.details.address_location,

//         city: address.details.city,
//         province: address.details.province,
//         postal_code: address.details.postal_code,

//         location_type: address.details.type,
//         latitude: address.details.latitude || "",

//         longitude: address.details.longitude || "",
//         is_default: address.is_default,
//       });
//     } else {
//       setEditingId(null);

//       setMapPosition(defaultPosition);

//       setFormData({
//         region: "",
//         first_name_address: "",
//         last_name_address: "",
//         address_location: "",

//         city: "",
//         province: "",
//         postal_code: "",
//         location_type: "home",
//         latitude: "",

//         longitude: "",
//         is_default: false,
//       });
//     }

//     setIsModalOpen(true);
//   };

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
//           const defaultAddr = addrArray.find((a: any) => a.is_default);

//           setSelectedAddressId(defaultAddr ? defaultAddr.id : addrArray[0].id);
//         } else {
//           setSelectedAddressId(null);
//         }
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     const fetchCatalog = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);

//         if (res.ok) {
//           const data = await res.json();

//           setCatalogProducts(data.data ? data.data : data);
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setIsCatalogLoaded(true);
//       }
//     };

//     fetchCatalog();
//   }, []);

//   useEffect(() => {
//     if (selectedItemIds.length === 0) {
//       navigate(`${urlPrefix}/cart`);

//       return;
//     }

//     const loadData = async () => {
//       const token = localStorage.getItem("user_token");

//       const userStr = localStorage.getItem("user_data");

//       if (!token) {
//         navigate(`${urlPrefix}/login`);
//         return;
//       }

//       if (userStr) {
//         const user = JSON.parse(userStr);

//         setAvailablePoints(user.point || 0);

//         setUserType(user.usertype || "user");
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
//           console.error(err);
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

//       .map((rate) => ({ ...rate, is_disabled: false, disable_reason: "" }))

//       .sort((a, b) =>
//         a.is_disabled === b.is_disabled ? 0 : a.is_disabled ? 1 : -1,
//       );
//   }, [rawShippingRates]);

//   const applyPromo = async (e: any) => {
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

//       if (checkoutTotalIDR < 50000)
//         throw new Error("Minimum belanja Rp 50.000");

//       setAppliedPromoCode(promoInput.toUpperCase());

//       setAppliedPromoType(data.promo_type);

//       if (data.promo_type === "claim") {
//         setPromoDiscountAmount(0);

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

//   const handleApplyPoints = (e: any) => {
//     e.preventDefault();

//     const ptsToUse = Number(pointsInput);

//     if (ptsToUse > availablePoints)
//       return Swal.fire(
//         "Peringatan",
//         `Anda hanya memiliki ${availablePoints} poin.`,
//         "warning",
//       );

//     if (ptsToUse > maxPointsAllowed) {
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

//         promo_type: appliedPromoType,
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
//         (window as any).dataLayer = (window as any).dataLayer || [];

//         (window as any).dataLayer.push({
//           event: "add_payment_info",

//           ecommerce: {
//             currency: grandTotalObj.curr,

//             value: grandTotalObj.value,

//             items: checkoutItems.map((item: any) => {
//               const freshProd = getFreshProduct(item.product);

//               const activePObj = getActivePriceObj(freshProd, checkoutCount);

//               return {
//                 item_id: freshProd.id,
//                 item_name: freshProd.name,
//                 price: activePObj.value,
//                 quantity: item.quantity,
//               };
//             }),
//           },
//         });

//         window.location.href = data.checkout_url;
//       } else {
//         throw new Error(data.message || "Gagal membuat tagihan");
//       }
//     } catch (err: any) {
//       Swal.fire("Error", err.message, "error");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleImageError = (company: string) => {
//     setImageErrors((prev) => ({ ...prev, [company]: true }));
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

//   const handleSubmitAddress = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.latitude || !formData.longitude)
//       return Swal.fire(t("notification"), t("warn_select_location"), "warning");

//     const token = localStorage.getItem("user_token");

//     const method = editingId ? "PUT" : "POST";

//     const url = editingId
//       ? `${BASE_URL}/api/addresses/${editingId}`
//       : `${BASE_URL}/api/addresses`;

//     try {
//       const res = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },

//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Berhasil!",
//           text: editingId
//             ? t("toast_address_updated")
//             : t("toast_address_added"),
//           timer: 1500,
//           showConfirmButton: false,
//         });

//         setIsModalOpen(false);

//         fetchAddresses(token!);
//       } else {
//         throw new Error("Gagal menyimpan alamat");
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire(t("error"), t("server_error"), "error");
//     }
//   };

//   const isButtonDisabled =
//     isProcessing ||
//     checkoutItems.length === 0 ||
//     !selectedAddressId ||
//     (shippingMethod === "biteship" && !selectedRate);

//   if (isPageLoading || !isCatalogLoaded) {
//     return (
//       <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
//         <div className="flex gap-2 mb-4">
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-1"></div>

//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-2"></div>

//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-3"></div>
//         </div>

//         <p className="font-serif text-sm italic tracking-widest text-gray-500 animate-pulse">
//           {t("pay_loading_checkout")}
//         </p>
//       </div>
//     );
//   }

//   if (checkoutItems.length === 0) {
//     return (
//       <div className="min-h-screen px-6 py-12 mx-auto font-sans md:py-24 max-w-[1440px] animate-fade-in">
//         <div className="py-20 text-center">
//           <h2 className="mb-4 text-3xl font-extrabold text-gray-900">
//             {t("pay_empty_items")}
//           </h2>

//           <button
//             onClick={() => navigate(`${urlPrefix}/cart`)}
//             className="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase rounded-full bg-gycora hover:bg-gycora-dark"
//           >
//             {t("pay_btn_back_cart")}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen px-6 py-12 mx-auto font-sans md:py-24 max-w-[1440px] animate-fade-in relative">
//       <h1 className="mb-12 text-3xl font-extrabold tracking-tighter text-gray-900 uppercase md:text-4xl">
//         {t("pay_checkout_title")}
//       </h1>

//       <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
//         <div className="flex-grow space-y-12">
//           {/* BAGIAN ALAMAT */}

//           <section>
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-4">
//                 <span className="flex items-center justify-center w-6 h-6 text-[10px] font-bold text-white rounded-full bg-gycora">
//                   1
//                 </span>

//                 <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">
//                   {t("pay_shipping_address")}
//                 </h2>
//               </div>

//               {addresses.length > 0 && (
//                 <button
//                   onClick={() => handleOpenModal()}
//                   className="text-xs font-bold transition-colors text-emerald-600 hover:text-emerald-800"
//                 >
//                   {t("pay_add_address")}
//                 </button>
//               )}
//             </div>

//             {addresses.length === 0 ? (
//               <div className="py-10 text-center border border-gray-300 border-dashed bg-gray-50 rounded-2xl">
//                 <p className="mb-2 text-sm italic text-gray-500">
//                   {t("pay_no_address")}
//                 </p>

//                 <button
//                   onClick={() => handleOpenModal()}
//                   className="px-6 py-2 mt-2 text-xs font-bold tracking-widest text-white uppercase transition-colors rounded-full shadow-md bg-gycora hover:bg-gycora-dark"
//                 >
//                   {t("pay_new_address")}
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
//                             {t("main_address")}
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

//           {/* BAGIAN KURIR */}

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
//                 {t("pay_shipping_method")}
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
//                       {t("pay_method_pickup")}
//                     </p>

//                     <p className="mt-1 text-xs font-bold text-emerald-600">
//                       {t("pay_method_pickup_desc")}
//                     </p>
//                   </div>

//                   <p className="font-black text-gycora">
//                     {t("pay_method_free")}
//                   </p>
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
//                       {t("pay_method_courier")}
//                     </p>

//                     <p className="mt-1 text-xs text-gray-500">
//                       {t("pay_method_courier_desc")}
//                     </p>
//                   </div>
//                 </div>
//               </label>

//               {shippingMethod === "biteship" && (
//                 <div className="p-6 mt-4 space-y-8 bg-white border border-gray-200 rounded-3xl animate-fade-in">
//                   <h3 className="pt-2 text-sm font-bold tracking-widest text-gray-900 uppercase border-t border-gray-100">
//                     {t("pay_choose_courier")}
//                   </h3>

//                   {isLoadingRates ? (
//                     <p className="py-4 text-sm text-center text-gray-500 animate-pulse">
//                       {t("pay_calc_shipping")}
//                     </p>
//                   ) : processedShippingRates.length === 0 ? (
//                     <p className="py-4 text-xs italic text-center text-red-500">
//                       {t("pay_no_courier")}
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
//                               {formatCurrencyDisplay(
//                                 convertIDRtoActiveCurrency(rate.price),
//                               )}
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
//               {t("pay_order_summary")}
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

//                 // 👇 GUNAKAN SISTEM HARGA BARU 👇

//                 const freshProd = getFreshProduct(item.product);

//                 const activePriceObj = getActivePriceObj(
//                   freshProd,
//                   checkoutCount,
//                 );

//                 const basePriceObj = getPriceToDisplay(freshProd);

//                 const isDiscounted = activePriceObj.value < basePriceObj.value;

//                 const isWholesaleActive =
//                   userType === "reseller" &&
//                   Number(freshProd.wholesale_price) > 0 &&
//                   checkoutCount >= 24;

//                 const currentGrossAmountObj = {
//                   value: activePriceObj.value * item.quantity,
//                   curr: activePriceObj.curr,
//                 };

//                 const originalGrossAmountObj = {
//                   value: basePriceObj.value * item.quantity,
//                   curr: basePriceObj.curr,
//                 };

//                 return (
//                   <div key={item.id} className="flex gap-4">
//                     <img
//                       src={freshProd.image_url}
//                       alt={freshProd.name}
//                       className="object-cover w-16 h-16 bg-white border border-gray-100 rounded-xl shrink-0"
//                     />

//                     <div className="flex-grow">
//                       <div className="flex items-center gap-2">
//                         <p
//                           className="w-40 text-[11px] font-bold text-gray-900 uppercase truncate"
//                           title={freshProd.name}
//                         >
//                           {freshProd.name}
//                         </p>

//                         {isWholesaleActive && (
//                           <span className="px-1.5 py-0.5 text-[8px] font-bold text-white bg-blue-600 rounded">
//                             GROSIR
//                           </span>
//                         )}
//                       </div>

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

//                       <p
//                         className={`mt-1 text-xs font-medium ${isWholesaleActive ? "text-blue-600" : "text-gycora"}`}
//                       >
//                         {formatCurrencyDisplay(currentGrossAmountObj)}{" "}
//                         {isDiscounted && (
//                           <span className="text-[9px] line-through text-gray-400 ml-1">
//                             {formatCurrencyDisplay(originalGrossAmountObj)}
//                           </span>
//                         )}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="pt-4 space-y-3 text-sm border-t border-gray-200">
//               <div className="flex justify-between text-gray-500">
//                 <span>{t("pay_total_items")}</span>

//                 <span className="font-bold text-gray-900">
//                   {checkoutCount} items
//                 </span>
//               </div>

//               <div className="flex justify-between text-gray-500">
//                 <span>{t("pay_product_subtotal")}</span>

//                 <span
//                   className={
//                     appliedPromoType === "voucher"
//                       ? "text-amber-600 font-bold"
//                       : ""
//                   }
//                 >
//                   {formatCurrencyDisplay(checkoutTotalAmountObj)}
//                 </span>
//               </div>

//               {/* Promo Code */}

//               <div className="pt-4 mt-2 border-t border-gray-200 border-dashed">
//                 <label className="block mb-2 text-[10px] font-bold tracking-widest text-gray-900 uppercase">
//                   {t("pay_promo_label")}
//                 </label>

//                 <form onSubmit={applyPromo} className="flex gap-2">
//                   <input
//                     type="text"
//                     value={promoInput}
//                     onChange={(e) => setPromoInput(e.target.value)}
//                     disabled={!!appliedPromoCode || isVerifyingPromo}
//                     placeholder={t("pay_promo_placeholder")}
//                     className="flex-1 px-3 py-2 text-sm uppercase bg-white border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-gycora disabled:bg-gray-100"
//                   />

//                   {!appliedPromoCode ? (
//                     <button
//                       type="submit"
//                       disabled={!promoInput || isVerifyingPromo}
//                       className="flex items-center justify-center w-20 px-4 text-[10px] font-bold text-white uppercase transition rounded-lg bg-gycora hover:bg-gycora-dark disabled:bg-gray-300"
//                     >
//                       {isVerifyingPromo ? "..." : t("pay_btn_apply")}
//                     </button>
//                   ) : (
//                     <button
//                       type="button"
//                       onClick={removePromo}
//                       className="w-20 px-4 text-[10px] font-bold text-red-600 uppercase transition border border-red-200 rounded-lg bg-red-50 hover:bg-red-100"
//                     >
//                       {t("pay_btn_remove")}
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

//                 {appliedPromoCode && (
//                   <div className="flex justify-between text-[10px] md:text-xs font-medium text-emerald-600 mt-2">
//                     <span className="pr-2 truncate">
//                       Promo (
//                       <span className="font-mono uppercase">
//                         {appliedPromoCode}
//                       </span>
//                       )
//                     </span>

//                     <span>
//                       - {formatCurrencyDisplay(actualPromoDiscountObj)}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {/* Loyalty Points */}

//               <div className="pt-4 mt-2 border-t border-gray-200 border-dashed">
//                 <div className="flex items-center justify-between mb-3">
//                   <label className="text-[10px] font-bold tracking-widest text-gray-900 uppercase">
//                     {t("pay_loyalty_points")}
//                   </label>

//                   <span className="text-xs text-gray-500">
//                     {t("pay_balance")}{" "}
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
//                       {t("pay_btn_use")}
//                     </button>
//                   ) : (
//                     <button
//                       type="button"
//                       onClick={handleRemovePoints}
//                       className="w-24 px-4 text-[10px] font-bold text-red-600 uppercase transition border border-red-200 rounded-lg bg-red-50 hover:bg-red-100"
//                     >
//                       {t("pay_btn_cancel")}
//                     </button>
//                   )}
//                 </form>

//                 {pointsUsed > 0 && (
//                   <div className="flex items-center justify-between mt-3 animate-fade-in">
//                     <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
//                       {t("pay_points_applied")} ({pointsUsed} Pts)
//                     </span>

//                     <span className="text-[11px] font-medium text-emerald-600">
//                       - {formatCurrencyDisplay(appliedPointDiscountObj)}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {/* Ongkos Kirim */}

//               <div className="flex items-start justify-between pt-4 mt-2 text-gray-500 border-t border-gray-200 border-dashed">
//                 <span>{t("pay_shipping_cost")}</span>

//                 {shippingMethod === "free" ? (
//                   <span className="font-bold text-emerald-600">
//                     {t("pay_method_pickup")}
//                   </span>
//                 ) : shippingMethod === "biteship" && selectedRate ? (
//                   <div className="text-right">
//                     <span className="block font-medium text-gray-900">
//                       {formatCurrencyDisplay({
//                         value: parseFloat(selectedRate.price) * checkoutCount,
//                         curr: "IDR",
//                       })}
//                     </span>

//                     <p className="mt-1 text-[10px] text-gray-400">
//                       {formatCurrencyDisplay({
//                         value: parseFloat(selectedRate.price),
//                         curr: "IDR",
//                       })}{" "}
//                       x {checkoutCount} item
//                     </p>
//                   </div>
//                 ) : (
//                   <span className="text-[10px] italic">Pilih metode</span>
//                 )}
//               </div>

//               <div className="flex justify-between pt-4 font-bold text-gray-900 border-t border-gray-200">
//                 <span className="mt-1 text-xs tracking-widest uppercase">
//                   {t("pay_grand_total")}
//                 </span>

//                 <span className="text-xl text-gycora">
//                   {formatCurrencyDisplay(grandTotalObj)}
//                 </span>
//               </div>

//               <button
//                 onClick={handlePayment}
//                 disabled={isButtonDisabled}
//                 className="flex items-center justify-center w-full gap-3 py-4 mt-8 text-xs font-bold tracking-[0.3em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/10"
//               >
//                 {!isProcessing ? t("pay_btn_pay_now") : t("pay_btn_processing")}
//               </button>

//               {!selectedAddressId && (
//                 <p className="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase">
//                   {t("pay_alert_no_address")}
//                 </p>
//               )}

//               {shippingMethod === "biteship" && !selectedRate && (
//                 <p className="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase">
//                   {t("pay_alert_no_courier")}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- MODAL FORM ALAMAT DENGAN PETA --- */}

//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-10 pb-10 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fade-in-up">
//           <div className="flex flex-col w-full max-w-5xl my-auto overflow-hidden bg-white shadow-2xl rounded-3xl">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50 shrink-0">
//               <h3 className="text-xl font-extrabold tracking-tight text-gray-900">
//                 {editingId
//                   ? t("modal_edit_address_title")
//                   : t("modal_add_address_title")}
//               </h3>

//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="p-2 text-gray-400 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100"
//               >
//                 <svg
//                   className="w-5 h-5"
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

//             <div className="flex flex-col md:flex-row h-auto md:h-[650px] overflow-hidden">
//               {/* BAGIAN PETA (KIRI) */}

//               <div className="relative w-full bg-gray-100 border-b border-gray-200 h-72 md:h-full md:w-5/12 md:border-b-0 md:border-r shrink-0">
//                 <MapContainer
//                   center={mapPosition}
//                   zoom={15}
//                   style={{ height: "100%", width: "100%" }}
//                   scrollWheelZoom={true}
//                 >
//                   <TileLayer
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   />

//                   <Marker position={mapPosition}>
//                     <Popup>{t("popup_selected_location")}</Popup>
//                   </Marker>

//                   <MapEvents />

//                   <MapCenterUpdater position={mapPosition} />
//                 </MapContainer>

//                 <button
//                   type="button"
//                   onClick={handleGetCurrentLocation}
//                   disabled={isGettingLocation}
//                   className="absolute z-[1000] bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:-translate-x-0 md:right-6 flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-full shadow-xl font-bold text-xs hover:bg-gray-50 border border-gray-200 transition-all hover:-translate-y-0.5"
//                 >
//                   {isGettingLocation ? (
//                     <span className="w-4 h-4 border-2 rounded-full border-[#006A4E] border-t-transparent animate-spin"></span>
//                   ) : (
//                     <svg
//                       className="w-4 h-4 text-[#006A4E]"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                     </svg>
//                   )}

//                   {t("btn_use_current_location")}
//                 </button>
//               </div>

//               {/* BAGIAN FORM (KANAN) */}

//               <form
//                 onSubmit={handleSubmitAddress}
//                 className="flex flex-col flex-1 p-6 space-y-6 overflow-y-auto bg-white sm:p-8 custom-scrollbar"
//               >
//                 <div className="flex gap-3 p-4 border border-blue-100 rounded-2xl bg-blue-50/50">
//                   <svg
//                     className="w-5 h-5 text-blue-500 shrink-0"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>

//                   <p className="text-xs leading-relaxed text-blue-800">
//                     {t("guide_map_text")}
//                   </p>
//                 </div>

//                 <div className="space-y-5">
//                   <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
//                         {t("label_first_name")}
//                       </label>

//                       <input
//                         type="text"
//                         required
//                         value={formData.first_name_address}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             first_name_address: e.target.value,
//                           })
//                         }
//                         className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
//                       />
//                     </div>

//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
//                         {t("label_last_name")}
//                       </label>

//                       <input
//                         type="text"
//                         required
//                         value={formData.last_name_address}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             last_name_address: e.target.value,
//                           })
//                         }
//                         className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
//                       {t("label_address_type")}
//                     </label>

//                     <select
//                       value={formData.location_type}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           location_type: e.target.value,
//                         })
//                       }
//                       className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none bg-white transition-all"
//                     >
//                       <option value="home">{t("option_home")}</option>

//                       <option value="office">{t("option_office")}</option>

//                       <option value="other">{t("option_other")}</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
//                       {t("label_full_address")}
//                     </label>

//                     <textarea
//                       required
//                       rows={3}
//                       placeholder={t("placeholder_full_address")}
//                       value={formData.address_location}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           address_location: e.target.value,
//                         })
//                       }
//                       className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none resize-none bg-white transition-all"
//                     ></textarea>
//                   </div>

//                   <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
//                         {t("label_region")}
//                       </label>

//                       <input
//                         type="text"
//                         required
//                         value={formData.region}
//                         onChange={(e) =>
//                           setFormData({ ...formData, region: e.target.value })
//                         }
//                         className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
//                       />
//                     </div>

//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
//                         {t("label_city")}
//                       </label>

//                       <input
//                         type="text"
//                         required
//                         value={formData.city}
//                         onChange={(e) =>
//                           setFormData({ ...formData, city: e.target.value })
//                         }
//                         className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
//                       />
//                     </div>

//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
//                         {t("label_province")}
//                       </label>

//                       <input
//                         type="text"
//                         required
//                         value={formData.province}
//                         onChange={(e) =>
//                           setFormData({ ...formData, province: e.target.value })
//                         }
//                         className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
//                       />
//                     </div>

//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
//                         {t("label_postal_code")}
//                       </label>

//                       <input
//                         type="text"
//                         required
//                         value={formData.postal_code}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             postal_code: e.target.value,
//                           })
//                         }
//                         className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
//                       />
//                     </div>
//                   </div>

//                   <input type="hidden" value={formData.latitude} />

//                   <input type="hidden" value={formData.longitude} />

//                   <div
//                     className="flex items-center gap-3 p-4 mt-2 transition-colors border border-gray-200 cursor-pointer rounded-xl bg-gray-50 hover:bg-gray-100"
//                     onClick={() =>
//                       setFormData({
//                         ...formData,
//                         is_default: !formData.is_default,
//                       })
//                     }
//                   >
//                     <input
//                       type="checkbox"
//                       id="is_default"
//                       checked={formData.is_default}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           is_default: e.target.checked,
//                         })
//                       }
//                       className="w-5 h-5 rounded cursor-pointer text-[#006A4E] focus:ring-[#006A4E] accent-[#006A4E]"
//                       onClick={(e) => e.stopPropagation()}
//                     />

//                     <label
//                       htmlFor="is_default"
//                       className="text-sm font-bold text-gray-800 cursor-pointer select-none"
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       {t("label_set_default_address")}
//                     </label>
//                   </div>
//                 </div>

//                 <div className="flex justify-end gap-3 pt-6 mt-auto border-t border-gray-100">
//                   <button
//                     type="button"
//                     onClick={() => setIsModalOpen(false)}
//                     className="px-6 py-3 text-sm font-bold text-gray-600 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200"
//                   >
//                     {t("btn_cancel")}
//                   </button>

//                   <button
//                     type="submit"
//                     className="px-6 py-3 text-sm font-bold text-white transition-all shadow-md bg-[#006A4E] rounded-xl hover:bg-emerald-900 hover:shadow-lg"
//                   >
//                     {editingId
//                       ? t("btn_update_address")
//                       : t("btn_save_address")}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable no-empty */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { useState, useEffect, useMemo, useCallback } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../context/CartContext";
// import { BASE_URL } from "../../config/api";
// import { useLanguage } from "../../context/LanguageContext";
// import { useCurrency } from "../../context/CurrencyContext";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMapEvents,
//   useMap,
// } from "react-leaflet";

// interface Address {
//   id: number;
//   receiver: { first_name: string; last_name: string; full_name: string };
//   details: {
//     region: string;
//     address_location: string;
//     type: string;
//     city: string;
//     province: string;
//     postal_code: string;
//     latitude: string;
//     longitude: string;
//   };
//   is_default: boolean;
// }

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

// export default function PaymentPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { t } = useLanguage();

//   const { currency, exchangeRates } = useCurrency();
//   const curr = (currency as Currency) || "IDR";
//   const { cartItems } = useCart();
//   const selectedItemIds: number[] = location.state?.selectedIds || [];

//   const [isPageLoading, setIsPageLoading] = useState(true);
//   const [userType, setUserType] = useState<string>("guest");
//   const [catalogProducts, setCatalogProducts] = useState<any[]>([]);
//   const [isCatalogLoaded, setIsCatalogLoaded] = useState(false);

//   const [addresses, setAddresses] = useState<any[]>([]);
//   const defaultPosition: [number, number] = [-6.175392, 106.827153];
//   const [mapPosition, setMapPosition] = useState<[number, number]>(defaultPosition);
//   const [isGettingLocation, setIsGettingLocation] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState<number | null>(null);

//   const [formData, setFormData] = useState({
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

//   const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

//   const getUrlPrefix = () => {
//     if (location.pathname.startsWith("/id")) return "/id";
//     if (location.pathname.startsWith("/en")) return "/en";
//     return "";
//   };
//   const urlPrefix = getUrlPrefix();

//   const [shippingMethod, setShippingMethod] = useState("free");
//   const [selectedRate, setSelectedRate] = useState<any>(null);
//   const [isLoadingRates, setIsLoadingRates] = useState(false);
//   const [rawShippingRates, setRawShippingRates] = useState<any[]>([]);
//   const [deliveryDate, setDeliveryDate] = useState("");
//   const [deliveryTime, setDeliveryTime] = useState("");

//   const [promoInput, setPromoInput] = useState("");
//   const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
//   const [promoDiscountAmount, setPromoDiscountAmount] = useState(0);
//   const [appliedPromoType, setAppliedPromoType] = useState<string | null>(null);
//   const [promoMessage, setPromoMessage] = useState("");
//   const [isVerifyingPromo, setIsVerifyingPromo] = useState(false);
//   const [availablePoints, setAvailablePoints] = useState(0);
//   const [pointsInput, setPointsInput] = useState<number | "">("");
//   const [pointsUsed, setPointsUsed] = useState<number>(0);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

//   const convertIDRtoActiveCurrency = useCallback((idrAmount: number) => {
//     if (curr === "IDR" || !exchangeRates || !exchangeRates[curr]) return { value: idrAmount, curr: "IDR" };
//     return { value: idrAmount * exchangeRates[curr], curr: curr };
//   }, [curr, exchangeRates]);

//   const formatCurrencyDisplay = useCallback((priceObj: { value: number; curr: string } | null) => {
//     if (!priceObj) return "";
//     const symbols: any = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
//     const formatter = new Intl.NumberFormat(priceObj.curr === "IDR" ? "id-ID" : "en-US", {
//       minimumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//       maximumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//     });
//     return `${symbols[priceObj.curr] || priceObj.curr + " "}${formatter.format(priceObj.value)}`;
//   }, []);

//   const getPriceToDisplay = useCallback((product: any) => {
//     if (!product) return { value: 0, curr: "IDR" };
//     if (curr === "IDR") return { value: Number(product.price), curr: "IDR" };
//     try {
//       const pricesObj = typeof product.prices === "string" ? JSON.parse(product.prices) : product.prices || {};
//       const dbPrice = pricesObj[curr] || pricesObj[curr.toLowerCase()] || pricesObj[curr.toUpperCase()];
//       if (dbPrice) return { value: parseFloat(dbPrice), curr: curr };
//     } catch (e) { console.error(e); }
//     return { value: Number(product.price), curr: "IDR" };
//   }, [curr]);

//   const getDiscountToDisplay = useCallback((product: any) => {
//     if (!product) return null;
//     if (curr === "IDR") return product.discount_price ? { value: Number(product.discount_price), curr: "IDR" } : null;
//     try {
//       const discObj = typeof product.discount_prices === "string" ? JSON.parse(product.discount_prices) : product.discount_prices || {};
//       const dbDisc = discObj[curr] || discObj[curr.toLowerCase()] || discObj[curr.toUpperCase()];
//       if (dbDisc) return { value: parseFloat(dbDisc), curr: curr };
//     } catch (e) { console.error(e); }
//     return product.discount_price ? { value: Number(product.discount_price), curr: "IDR" } : null;
//   }, [curr]);

//   const getWholesaleToDisplay = useCallback((product: any) => {
//     if (!product) return null;
//     if (curr === "IDR") return product.wholesale_price ? { value: Number(product.wholesale_price), curr: "IDR" } : null;
//     try {
//       const wholesaleObj = typeof product.wholesale_prices === "string" ? JSON.parse(product.wholesale_prices) : product.wholesale_prices || {};
//       const dbWholesale = wholesaleObj[curr] || wholesaleObj[curr.toLowerCase()] || wholesaleObj[curr.toUpperCase()];
//       if (dbWholesale) return { value: parseFloat(dbWholesale), curr: curr };
//     } catch (e) { console.error(e); }
//     return product.wholesale_price ? { value: Number(product.wholesale_price), curr: "IDR" } : null;
//   }, [curr]);

//   const getBundleToDisplay = useCallback((product: any) => {
//     if (!product) return null;
//     if (curr === "IDR") return product.bundle_price > 0 ? { value: Number(product.bundle_price), curr: "IDR" } : null;
//     try {
//       const bundleObj = typeof product.bundle_prices === "string" ? JSON.parse(product.bundle_prices) : product.bundle_prices || {};
//       const dbBundle = bundleObj[curr] || bundleObj[curr.toLowerCase()] || bundleObj[curr.toUpperCase()];
//       if (dbBundle) return { value: parseFloat(dbBundle), curr: curr };
//     } catch (e) {}
//     return product.bundle_price > 0 ? convertIDRtoActiveCurrency(Number(product.bundle_price)) : null;
//   }, [curr, convertIDRtoActiveCurrency]);

//   const getActivePriceObj = useCallback((product: any, totalQty: number) => {
//     const isReseller = userType === "reseller";
//     const voucher = Number(product.voucher_discount_price) || 0;
//     if (appliedPromoType === "voucher" && voucher > 0) return { value: voucher, curr: "IDR" };

//     const dynamicPriceObj = getPriceToDisplay(product);
//     const dynamicDiscountObj = getDiscountToDisplay(product);
//     const dynamicWholesaleObj = getWholesaleToDisplay(product);

//     if (isReseller && dynamicWholesaleObj && dynamicWholesaleObj.value > 0 && totalQty >= 24) {
//       return dynamicWholesaleObj;
//     } else if (dynamicDiscountObj && dynamicDiscountObj.value > 0 && dynamicDiscountObj.value < dynamicPriceObj.value) {
//       return dynamicDiscountObj;
//     }
//     return dynamicPriceObj;
//   }, [userType, appliedPromoType, getPriceToDisplay, getDiscountToDisplay, getWholesaleToDisplay]);

//   const getFreshProduct = useCallback((cartProduct: any) => {
//     if (catalogProducts.length > 0 && cartProduct) {
//       const fresh = catalogProducts.find((p) => p.id === cartProduct.id || p.id === cartProduct.product_id);
//       if (fresh) return fresh;
//     }
//     return cartProduct;
//   }, [catalogProducts]);

//   const checkoutItems = useMemo(() => {
//     let baseItems = cartItems.filter((item) => selectedItemIds.includes(item.id));
//     if (catalogProducts.length > 0) {
//       baseItems = baseItems.map((item) => {
//         const fresh = catalogProducts.find((p) => p.id === item.product_id);
//         return fresh ? { ...item, product: fresh } : item;
//       });
//     }
//     return baseItems;
//   }, [cartItems, selectedItemIds, catalogProducts]);

//   const checkoutCount = useMemo(() => {
//     return checkoutItems.reduce((sum, item) => sum + item.quantity, 0);
//   }, [checkoutItems]);

//   // ============================================================================
//   // OTAK UTAMA: MENGHITUNG HARGA BUNDLE DAN TOTAL IDR & MULTI-CURRENCY (SINKRON)
//   // ============================================================================
//   const checkoutData = useMemo(() => {
//     let totalValueDisplay = 0;
//     let totalValueIDR = 0;
//     let appliedBundlesCount = 0;
//     const itemGrossAmounts: { [cartId: number]: number } = {};
//     const isBundledMap: Record<number, boolean> = {};

//     const driversPool: { cartId: number; normalPrice: number; normalIDR: number; bundlePrice: number; bundleIDR: number }[] = [];
//     const partnersPool: { cartId: number; normalPrice: number; normalIDR: number }[] = [];

//     const isReseller = userType === "reseller";
//     const isWholesaleGlobal = isReseller && checkoutCount >= 24;

//     checkoutItems.forEach((item) => {
//       const prod = item.product;
//       const qty = item.quantity;
//       itemGrossAmounts[item.id] = 0;
//       isBundledMap[item.id] = false;

//       // Ambil Harga Aktif untuk Tampilan
//       const activePriceObj = getActivePriceObj(prod, checkoutCount);
//       let normalPriceDisplay = activePriceObj.value;
//       if (activePriceObj.curr === "IDR" && curr !== "IDR") {
//         normalPriceDisplay = normalPriceDisplay * (exchangeRates?.[curr] || 1);
//       }

//       // Ambil Harga Aktif IDR Murni untuk Validasi
//       let normalPriceIDR = Number(prod.price) || 0;
//       const wholesale = Number(prod.wholesale_price) || 0;
//       const discount = Number(prod.discount_price) || 0;
//       const voucher = Number(prod.voucher_discount_price) || 0;

//       if (appliedPromoType === "voucher" && voucher > 0) {
//         normalPriceIDR = voucher;
//       } else if (isWholesaleGlobal && wholesale > 0) {
//         normalPriceIDR = wholesale;
//       } else if (discount > 0 && discount < normalPriceIDR) {
//         normalPriceIDR = discount;
//       }

//       // 1. Prioritas Grosir
//       if (isWholesaleGlobal && wholesale > 0) {
//         itemGrossAmounts[item.id] += normalPriceDisplay * qty;
//         totalValueDisplay += normalPriceDisplay * qty;
//         totalValueIDR += normalPriceIDR * qty;
//         return;
//       }

//       // 2. Persiapan Sistem Bundle
//       const sku = (prod.sku || "").toUpperCase();
//       const isEGB = sku.startsWith("EGB");
//       const isBundleActiveFlag = String(prod.is_bundle_active).toLowerCase() === "true" || prod.is_bundle_active == 1;

//       let isValidDate = true;
//       if (prod.bundle_end_date && prod.bundle_end_date !== "0000-00-00 00:00:00") {
//         const safeDateStr = prod.bundle_end_date.replace(" ", "T");
//         const d = new Date(safeDateStr);
//         if (!isNaN(d.getTime())) isValidDate = d.getTime() > Date.now();
//       }

//       const bundleObjDisplay = getBundleToDisplay(prod);
//       const bundlePriceIDR = Number(prod.bundle_price) || 0;
//       const isDriver = isEGB && isBundleActiveFlag && isValidDate && bundleObjDisplay && bundleObjDisplay.value > 0;

//       if (isDriver) {
//         for (let i = 0; i < qty; i++) {
//           driversPool.push({ cartId: item.id, normalPrice: normalPriceDisplay, normalIDR: normalPriceIDR, bundlePrice: bundleObjDisplay.value, bundleIDR: bundlePriceIDR });
//         }
//       } else if (!isEGB) {
//         for (let i = 0; i < qty; i++) {
//           partnersPool.push({ cartId: item.id, normalPrice: normalPriceDisplay, normalIDR: normalPriceIDR });
//         }
//       } else {
//         itemGrossAmounts[item.id] += normalPriceDisplay * qty;
//         totalValueDisplay += normalPriceDisplay * qty;
//         totalValueIDR += normalPriceIDR * qty;
//       }
//     });

//     driversPool.sort((a, b) => b.bundlePrice - a.bundlePrice);

//     while (driversPool.length > 0 && partnersPool.length > 0) {
//       const driver = driversPool.shift()!;
//       const partner = partnersPool.shift()!;

//       const halfDisplay = driver.bundlePrice / 2;
//       itemGrossAmounts[driver.cartId] += halfDisplay;
//       itemGrossAmounts[partner.cartId] += halfDisplay;

//       isBundledMap[driver.cartId] = true;
//       isBundledMap[partner.cartId] = true;

//       totalValueDisplay += driver.bundlePrice;
//       totalValueIDR += driver.bundleIDR;
//       appliedBundlesCount++;
//     }

//     driversPool.forEach((d) => {
//       itemGrossAmounts[d.cartId] += d.normalPrice;
//       totalValueDisplay += d.normalPrice;
//       totalValueIDR += d.normalIDR;
//     });

//     partnersPool.forEach((p) => {
//       itemGrossAmounts[p.cartId] += p.normalPrice;
//       totalValueDisplay += p.normalPrice;
//       totalValueIDR += p.normalIDR;
//     });

//     return {
//       totalObj: { value: totalValueDisplay, curr },
//       totalIDR: totalValueIDR,
//       itemGrossAmounts,
//       isBundledMap,
//       appliedBundlesCount
//     };
//   }, [checkoutItems, checkoutCount, curr, getActivePriceObj, getBundleToDisplay, appliedPromoType, exchangeRates, userType]);

//   const checkoutTotalIDR = checkoutData.totalIDR;
//   const checkoutTotalAmountObj = checkoutData.totalObj;

//   const actualPromoDiscountIDR = useMemo(() => {
//     if (appliedPromoType === "claim") {
//       const productDiscount = Math.floor(checkoutTotalIDR * 0.1);
//       let shippingCost = 0;
//       if (shippingMethod === "biteship" && selectedRate) shippingCost = parseFloat(selectedRate.price) * checkoutCount;
//       const shippingSubsidy = Math.min(10000, shippingCost);
//       return productDiscount + shippingSubsidy;
//     }
//     return promoDiscountAmount;
//   }, [appliedPromoType, checkoutTotalIDR, shippingMethod, selectedRate, checkoutCount, promoDiscountAmount]);

//   const actualPromoDiscountObj = convertIDRtoActiveCurrency(actualPromoDiscountIDR);

//   const maxPointsAllowed = useMemo(() => {
//     const maxUsableAmount = Math.max(0, checkoutTotalIDR - actualPromoDiscountIDR);
//     return Math.min(availablePoints, Math.floor(maxUsableAmount / 1000));
//   }, [availablePoints, checkoutTotalIDR, actualPromoDiscountIDR]);

//   const appliedPointDiscountIDR = pointsUsed * 1000;
//   const appliedPointDiscountObj = convertIDRtoActiveCurrency(appliedPointDiscountIDR);
//   const shippingCostIDR = shippingMethod === "biteship" && selectedRate ? parseFloat(selectedRate.price) * checkoutCount : 0;
//   const shippingCostObj = convertIDRtoActiveCurrency(shippingCostIDR);

//   const grandTotalObj = useMemo(() => {
//     return {
//       value: checkoutTotalAmountObj.value + shippingCostObj.value - actualPromoDiscountObj.value - appliedPointDiscountObj.value,
//       curr: curr,
//     };
//   }, [checkoutTotalAmountObj, shippingCostObj, actualPromoDiscountObj, appliedPointDiscountObj, curr]);

//   const handleGetCurrentLocation = () => {
//     setIsGettingLocation(true);
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const lat = position.coords.latitude;
//           const lng = position.coords.longitude;
//           setMapPosition([lat, lng]);
//           fetchAddressFromCoords(lat, lng);
//           setIsGettingLocation(false);
//         },
//         () => { Swal.fire("Akses Ditolak", t("warn_location_denied"), "warning"); setIsGettingLocation(false); }
//       );
//     } else {
//       Swal.fire("Tidak Mendukung", t("warn_location_unsupported"), "error"); setIsGettingLocation(false);
//     }
//   };

//   const fetchAddressFromCoords = async (lat: number, lng: number) => {
//     try {
//       const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
//       const data = await res.json();
//       if (data && data.address) {
//         const { address } = data;
//         const newCity = address.city || address.town || address.county || "";
//         const newRegion = address.suburb || address.village || address.neighbourhood || "";
//         const newProvince = address.state || "";
//         const newPostal = address.postcode || "";
//         const roadName = address.road || "";
//         const houseNumber = address.house_number || "";
//         const fullStreet = roadName ? `${roadName} ${houseNumber}`.trim() : data.display_name;

//         setFormData((prev) => ({
//           ...prev, latitude: lat.toString(), longitude: lng.toString(), address_location: fullStreet,
//           city: newCity, province: newProvince, region: newRegion, postal_code: newPostal,
//         }));
//       }
//     } catch (error) { console.error(error); }
//   };

//   const MapEvents = useCallback(() => {
//     useMapEvents({ click(e) { setMapPosition([e.latlng.lat, e.latlng.lng]); fetchAddressFromCoords(e.latlng.lat, e.latlng.lng); } });
//     return null;
//   }, []);

//   const MapCenterUpdater = ({ position }: { position: [number, number] }) => {
//     const map = useMap();
//     useEffect(() => { map.setView(position, map.getZoom()); }, [position, map]);
//     return null;
//   };

//   useEffect(() => {
//     if (pointsUsed > maxPointsAllowed) {
//       setPointsUsed(maxPointsAllowed);
//       setPointsInput(maxPointsAllowed > 0 ? maxPointsAllowed : "");
//     }
//   }, [maxPointsAllowed, pointsUsed]);

//   const handleOpenModal = (address: Address | null = null) => {
//     if (address) {
//       setEditingId(address.id);
//       const lat = parseFloat(address.details.latitude);
//       const lng = parseFloat(address.details.longitude);
//       setMapPosition(!isNaN(lat) && !isNaN(lng) ? [lat, lng] : defaultPosition);
//       setFormData({
//         region: address.details.region || "", first_name_address: address.receiver.first_name, last_name_address: address.receiver.last_name,
//         address_location: address.details.address_location, city: address.details.city, province: address.details.province,
//         postal_code: address.details.postal_code, location_type: address.details.type, latitude: address.details.latitude || "",
//         longitude: address.details.longitude || "", is_default: address.is_default,
//       });
//     } else {
//       setEditingId(null);
//       setMapPosition(defaultPosition);
//       setFormData({
//         region: "", first_name_address: "", last_name_address: "", address_location: "", city: "", province: "", postal_code: "",
//         location_type: "home", latitude: "", longitude: "", is_default: false,
//       });
//     }
//     setIsModalOpen(true);
//   };

//   const fetchAddresses = async (token: string) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/addresses`, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } });
//       if (res.ok) {
//         const data = await res.json();
//         const addrArray = data.data ? data.data : data;
//         setAddresses(addrArray || []);
//         if (addrArray && addrArray.length > 0) {
//           const defaultAddr = addrArray.find((a: any) => a.is_default);
//           setSelectedAddressId(defaultAddr ? defaultAddr.id : addrArray[0].id);
//         } else { setSelectedAddressId(null); }
//       }
//     } catch (err) { console.error(err); }
//   };

//   useEffect(() => {
//     const fetchCatalog = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (res.ok) {
//           const data = await res.json();
//           setCatalogProducts(data.data ? data.data : data);
//         }
//       } catch (err) { console.error(err); } finally { setIsCatalogLoaded(true); }
//     };
//     fetchCatalog();
//   }, []);

//   useEffect(() => {
//     if (selectedItemIds.length === 0) { navigate(`${urlPrefix}/cart`); return; }
//     const loadData = async () => {
//       const token = localStorage.getItem("user_token");
//       const userStr = localStorage.getItem("user_data");
//       if (!token) { navigate(`${urlPrefix}/login`); return; }
//       if (userStr) {
//         const user = JSON.parse(userStr);
//         setAvailablePoints(user.point || 0);
//         setUserType(user.usertype || "user");
//       }
//       await fetchAddresses(token);
//       const now = new Date();
//       now.setHours(now.getHours() + 1);
//       setDeliveryDate(now.toISOString().split("T")[0]);
//       setDeliveryTime(`${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`);
//       setIsPageLoading(false);
//     };
//     loadData();
//   }, [navigate, selectedItemIds.length]);

//   useEffect(() => {
//     if (selectedAddressId && selectedItemIds.length > 0 && shippingMethod === "biteship") {
//       const getRates = async () => {
//         setIsLoadingRates(true);
//         setSelectedRate(null);
//         setRawShippingRates([]);
//         try {
//           const token = localStorage.getItem("user_token");
//           const res = await fetch(`${BASE_URL}/api/shipping/rates`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
//             body: JSON.stringify({ address_id: selectedAddressId, cart_ids: selectedItemIds }),
//           });
//           if (res.ok) {
//             const data = await res.json();
//             if (data.pricing) setRawShippingRates(data.pricing);
//           }
//         } catch (err) { console.error(err); } finally { setIsLoadingRates(false); }
//       };
//       getRates();
//     }
//   }, [selectedAddressId, selectedItemIds, shippingMethod]);

//   const processedShippingRates = useMemo(() => {
//     if (!rawShippingRates || rawShippingRates.length === 0) return [];
//     return rawShippingRates
//       .map((rate) => ({ ...rate, is_disabled: false, disable_reason: "" }))
//       .sort((a, b) => a.is_disabled === b.is_disabled ? 0 : a.is_disabled ? 1 : -1 );
//   }, [rawShippingRates]);

//   const applyPromo = async (e: any) => {
//     e.preventDefault();
//     if (!promoInput) return;
//     setIsVerifyingPromo(true);
//     try {
//       const token = localStorage.getItem("user_token");
//       const res = await fetch(`${BASE_URL}/api/promo/verify`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
//         body: JSON.stringify({ promo_code: promoInput }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Promo tidak valid");
//       if (checkoutTotalIDR < 50000) throw new Error("Minimum belanja Rp 50.000");

//       setAppliedPromoCode(promoInput.toUpperCase());
//       setAppliedPromoType(data.promo_type);

//       if (data.promo_type === "claim") {
//         setPromoDiscountAmount(0);
//         setPromoMessage("✅ " + data.message + " (10% OFF + Subsidi Ongkir 10K)");
//       } else {
//         setPromoDiscountAmount(data.discount_value);
//         setPromoMessage("✅ " + data.message + " (Harga Khusus Diterapkan)");
//       }
//     } catch (err: any) {
//       removePromo();
//       setPromoMessage("❌ " + err.message);
//     } finally { setIsVerifyingPromo(false); }
//   };

//   const removePromo = () => {
//     setPromoInput(""); setAppliedPromoCode(null); setAppliedPromoType(null); setPromoDiscountAmount(0); setPromoMessage("");
//   };

//   const handleApplyPoints = (e: any) => {
//     e.preventDefault();
//     const ptsToUse = Number(pointsInput);
//     if (ptsToUse > availablePoints) return Swal.fire("Peringatan", `Anda hanya memiliki ${availablePoints} poin.`, "warning");
//     if (ptsToUse > maxPointsAllowed) { setPointsInput(maxPointsAllowed); setPointsUsed(maxPointsAllowed); return; }
//     setPointsUsed(ptsToUse);
//   };

//   const handleRemovePoints = () => { setPointsInput(""); setPointsUsed(0); };

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
//         promo_type: appliedPromoType,
//       };

//       const res = await fetch(`${BASE_URL}/api/checkout`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const data = await res.json();

//       if (res.ok && data.checkout_url) {
//         (window as any).dataLayer = (window as any).dataLayer || [];
//         (window as any).dataLayer.push({
//           event: "add_payment_info",
//           ecommerce: {
//             currency: grandTotalObj.curr,
//             value: grandTotalObj.value,
//             items: checkoutItems.map((item: any) => {
//               const freshProd = getFreshProduct(item.product);
//               const calculatedGross = checkoutData.itemGrossAmounts[item.id];
//               const unitPrice = calculatedGross !== undefined ? calculatedGross / item.quantity : getActivePriceObj(freshProd, checkoutCount).value;
//               return {
//                 item_id: freshProd.id,
//                 item_name: freshProd.name,
//                 price: unitPrice,
//                 quantity: item.quantity,
//               };
//             }),
//           },
//         });
//         window.location.href = data.checkout_url;
//       } else { throw new Error(data.message || "Gagal membuat tagihan"); }
//     } catch (err: any) { Swal.fire("Error", err.message, "error"); } finally { setIsProcessing(false); }
//   };

//   const handleImageError = (company: string) => { setImageErrors((prev) => ({ ...prev, [company]: true })); };

//   const getCourierLogo = (company: string) => {
//     if (!company) return null;
//     const map: Record<string, string> = { jne: "jne.png", sicepat: "sicepat.png", jnt: "jnt.png", anteraja: "anteraja.png", gojek: "gojek.png", grab: "grab.png", paxel: "paxel.png", ninja: "ninja.png" };
//     return map[company.toLowerCase()] ? "/courier_images/" + map[company.toLowerCase()] : null;
//   };

//   const handleSubmitAddress = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.latitude || !formData.longitude) return Swal.fire(t("notification"), t("warn_select_location"), "warning");
//     const token = localStorage.getItem("user_token");
//     const method = editingId ? "PUT" : "POST";
//     const url = editingId ? `${BASE_URL}/api/addresses/${editingId}` : `${BASE_URL}/api/addresses`;
//     try {
//       const res = await fetch(url, { method, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(formData) });
//       if (res.ok) {
//         Swal.fire({ icon: "success", title: "Berhasil!", text: editingId ? t("toast_address_updated") : t("toast_address_added"), timer: 1500, showConfirmButton: false });
//         setIsModalOpen(false); fetchAddresses(token!);
//       } else { throw new Error("Gagal menyimpan alamat"); }
//     } catch (error) { console.error(error); Swal.fire(t("error"), t("server_error"), "error"); }
//   };

//   const isButtonDisabled = isProcessing || checkoutItems.length === 0 || !selectedAddressId || (shippingMethod === "biteship" && !selectedRate);

//   if (isPageLoading || !isCatalogLoaded) {
//     return (
//       <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
//         <div className="flex gap-2 mb-4">
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-1"></div>
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-2"></div>
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-3"></div>
//         </div>
//         <p className="font-serif text-sm italic tracking-widest text-gray-500 animate-pulse">{t("pay_loading_checkout")}</p>
//       </div>
//     );
//   }

//   if (checkoutItems.length === 0) {
//     return (
//       <div className="min-h-screen px-6 py-12 mx-auto font-sans md:py-24 max-w-[1440px] animate-fade-in">
//         <div className="py-20 text-center">
//           <h2 className="mb-4 text-3xl font-extrabold text-gray-900">{t("pay_empty_items")}</h2>
//           <button onClick={() => navigate(`${urlPrefix}/cart`)} className="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase rounded-full bg-gycora hover:bg-gycora-dark">{t("pay_btn_back_cart")}</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen px-6 py-12 mx-auto font-sans md:py-24 max-w-[1440px] animate-fade-in relative">
//       <h1 className="mb-12 text-3xl font-extrabold tracking-tighter text-gray-900 uppercase md:text-4xl">{t("pay_checkout_title")}</h1>

//       <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
//         <div className="flex-grow space-y-12">
//           {/* BAGIAN ALAMAT */}
//           <section>
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-4">
//                 <span className="flex items-center justify-center w-6 h-6 text-[10px] font-bold text-white rounded-full bg-gycora">1</span>
//                 <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">{t("pay_shipping_address")}</h2>
//               </div>
//               {addresses.length > 0 && (
//                 <button onClick={() => handleOpenModal()} className="text-xs font-bold transition-colors text-emerald-600 hover:text-emerald-800">{t("pay_add_address")}</button>
//               )}
//             </div>

//             {addresses.length === 0 ? (
//               <div className="py-10 text-center border border-gray-300 border-dashed bg-gray-50 rounded-2xl">
//                 <p className="mb-2 text-sm italic text-gray-500">{t("pay_no_address")}</p>
//                 <button onClick={() => handleOpenModal()} className="px-6 py-2 mt-2 text-xs font-bold tracking-widest text-white uppercase transition-colors rounded-full shadow-md bg-gycora hover:bg-gycora-dark">{t("pay_new_address")}</button>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {addresses.map((addr) => (
//                   <label key={addr.id} className={`relative flex items-start p-6 border rounded-2xl cursor-pointer transition-all ${selectedAddressId === addr.id ? "border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md" : "border-gray-200 bg-white hover:bg-gray-50"}`}>
//                     <input type="radio" name="address" value={addr.id} checked={selectedAddressId === addr.id} onChange={() => setSelectedAddressId(addr.id)} className="w-5 h-5 mt-1 border-gray-300 rounded-full text-gycora focus:ring-gycora" />
//                     <div className="flex-grow ml-4">
//                       <div className="flex justify-between">
//                         <p className="text-sm font-bold text-gray-900 uppercase">{addr.receiver.full_name}</p>
//                         {addr.is_default && <span className="px-2 py-0.5 text-[9px] font-bold text-emerald-800 uppercase bg-emerald-100 rounded">{t("main_address")}</span>}
//                       </div>
//                       <p className="mt-2 text-sm leading-relaxed text-gray-600">{addr.details.address_location} - {addr.details.type} <br /> {addr.details.city}, {addr.details.province} <br /> {addr.details.region} - {addr.details.postal_code}</p>
//                     </div>
//                   </label>
//                 ))}
//               </div>
//             )}
//           </section>

//           {/* BAGIAN KURIR */}
//           <section className={!selectedAddressId ? "opacity-50 pointer-events-none" : ""}>
//             <div className="flex items-center gap-4 mb-6">
//               <span className="flex items-center justify-center w-6 h-6 text-[10px] font-bold text-white rounded-full bg-gycora">2</span>
//               <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">{t("pay_shipping_method")}</h2>
//             </div>

//             <div className="space-y-4">
//               <label className={`relative flex items-center p-6 border rounded-2xl cursor-pointer transition-all ${shippingMethod === "free" ? "border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md" : "border-gray-200 bg-white hover:bg-gray-50"}`}>
//                 <input type="radio" value="free" checked={shippingMethod === "free"} onChange={() => setShippingMethod("free")} className="w-5 h-5 border-gray-300 rounded-full text-gycora focus:ring-gycora" />
//                 <div className="flex items-center justify-between flex-grow ml-4">
//                   <div>
//                     <p className="text-sm font-bold tracking-wide text-gray-900 uppercase">{t("pay_method_pickup")}</p>
//                     <p className="mt-1 text-xs font-bold text-emerald-600">{t("pay_method_pickup_desc")}</p>
//                   </div>
//                   <p className="font-black text-gycora">{t("pay_method_free")}</p>
//                 </div>
//               </label>

//               <label className={`relative flex items-center p-6 border rounded-2xl cursor-pointer transition-all ${shippingMethod === "biteship" ? "border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md" : "border-gray-200 bg-white hover:bg-gray-50"}`}>
//                 <input type="radio" value="biteship" checked={shippingMethod === "biteship"} onChange={() => setShippingMethod("biteship")} className="w-5 h-5 border-gray-300 rounded-full text-gycora focus:ring-gycora" />
//                 <div className="flex items-center justify-between flex-grow ml-4">
//                   <div>
//                     <p className="text-sm font-bold tracking-wide text-gray-900 uppercase">{t("pay_method_courier")}</p>
//                     <p className="mt-1 text-xs text-gray-500">{t("pay_method_courier_desc")}</p>
//                   </div>
//                 </div>
//               </label>

//               {shippingMethod === "biteship" && (
//                 <div className="p-6 mt-4 space-y-8 bg-white border border-gray-200 rounded-3xl animate-fade-in">
//                   <h3 className="pt-2 text-sm font-bold tracking-widest text-gray-900 uppercase border-t border-gray-100">{t("pay_choose_courier")}</h3>
//                   {isLoadingRates ? (
//                     <p className="py-4 text-sm text-center text-gray-500 animate-pulse">{t("pay_calc_shipping")}</p>
//                   ) : processedShippingRates.length === 0 ? (
//                     <p className="py-4 text-xs italic text-center text-red-500">{t("pay_no_courier")}</p>
//                   ) : (
//                     <div className="space-y-3">
//                       {processedShippingRates.map((rate, idx) => (
//                         <label key={idx} className={`relative flex flex-col p-4 border rounded-xl transition-all ${rate.is_disabled ? "opacity-50 bg-gray-50 pointer-events-none" : selectedRate?.company === rate.company && selectedRate?.type === rate.type ? "border-gycora bg-emerald-50/10 shadow-sm" : "border-gray-200 hover:bg-gray-50 cursor-pointer"}`}>
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
//                             <p className="text-sm font-black text-gray-900">{formatCurrencyDisplay(convertIDRtoActiveCurrency(rate.price))}</p>
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
//             <h2 className="pb-4 mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">{t("pay_order_summary")}</h2>

//             {checkoutData.appliedBundlesCount > 0 && (
//               <div className="flex items-center justify-between p-3 mb-6 border border-purple-200 rounded-xl bg-purple-50">
//                 <span className="text-[10px] font-extrabold tracking-wide text-purple-800 uppercase">{t("bundle_promo_active")}</span>
//                 <span className="text-xs font-black text-purple-700">{checkoutData.appliedBundlesCount} {t("bundle")}</span>
//               </div>
//             )}

//             <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
//               {checkoutItems.map((item: any) => {
//                 let colorHex = item.color;
//                 let colorName = "";
//                 try {
//                   const parsed = JSON.parse(item.color as string);
//                   if (parsed.hex) { colorHex = parsed.hex; colorName = parsed.name || ""; }
//                 } catch {}

//                 const freshProd = getFreshProduct(item.product);
//                 const activePriceObj = getActivePriceObj(freshProd, checkoutCount);
//                 const basePriceObj = getPriceToDisplay(freshProd);
//                 const isDiscounted = activePriceObj.value < basePriceObj.value;

//                 const isWholesaleActive = userType === "reseller" && Number(freshProd.wholesale_price) > 0 && checkoutCount >= 24;
//                 const isBundled = checkoutData.isBundledMap[item.id];
//                 const calculatedGross = checkoutData.itemGrossAmounts[item.id];

//                 const currentGrossAmountObj = {
//                   value: calculatedGross !== undefined ? calculatedGross : activePriceObj.value * item.quantity,
//                   curr: checkoutData.totalObj.curr,
//                 };
//                 const originalGrossAmountObj = {
//                   value: basePriceObj.value * item.quantity,
//                   curr: basePriceObj.curr,
//                 };

//                 return (
//                   <div key={item.id} className="flex gap-4">
//                     <img src={freshProd.image_url} alt={freshProd.name} className="object-cover w-16 h-16 bg-white border border-gray-100 rounded-xl shrink-0" />
//                     <div className="flex-grow">
//                       <div className="flex items-center gap-2">
//                         <p className="w-40 text-[11px] font-bold text-gray-900 uppercase truncate" title={freshProd.name}>{freshProd.name}</p>
//                         {isWholesaleActive && <span className="px-1.5 py-0.5 text-[8px] font-bold text-white bg-blue-600 rounded">GROSIR (WHOLESALE)</span>}
//                         {isBundled && <span className="px-1.5 py-0.5 text-[8px] font-bold text-purple-600 bg-purple-100 rounded uppercase">Bundle</span>}
//                       </div>

//                       <div className="flex items-center gap-2 mt-0.5">
//                         <p className="text-[10px] text-gray-400">Qty: {item.quantity}</p>
//                         {item.color && (
//                           <>
//                             <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
//                             <div className="flex items-center gap-1.5">
//                               <div className="w-3 h-3 border border-gray-300 rounded-full shadow-sm shrink-0" style={{ backgroundColor: colorHex }}></div>
//                               {colorName && <span className="text-[10px] font-bold text-gray-500 uppercase">{colorName}</span>}
//                             </div>
//                           </>
//                         )}
//                       </div>

//                       <p className={`mt-1 text-xs font-medium ${isBundled ? "text-purple-600" : isWholesaleActive ? "text-blue-600" : "text-gycora"}`}>
//                         {formatCurrencyDisplay(currentGrossAmountObj)}{" "}
//                         {(isDiscounted && !isBundled) && (
//                           <span className="text-[9px] line-through text-gray-400 ml-1">{formatCurrencyDisplay(originalGrossAmountObj)}</span>
//                         )}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="pt-4 space-y-3 text-sm border-t border-gray-200">
//               <div className="flex justify-between text-gray-500">
//                 <span>{t("pay_total_items")}</span>
//                 <span className="font-bold text-gray-900">{checkoutCount} items</span>
//               </div>
//               <div className="flex justify-between text-gray-500">
//                 <span>{t("pay_product_subtotal")}</span>
//                 <span className={appliedPromoType === "voucher" ? "text-amber-600 font-bold" : ""}>{formatCurrencyDisplay(checkoutTotalAmountObj)}</span>
//               </div>

//               {/* Promo Code */}
//               <div className="pt-4 mt-2 border-t border-gray-200 border-dashed">
//                 <label className="block mb-2 text-[10px] font-bold tracking-widest text-gray-900 uppercase">{t("pay_promo_label")}</label>
//                 <form onSubmit={applyPromo} className="flex gap-2">
//                   <input type="text" value={promoInput} onChange={(e) => setPromoInput(e.target.value)} disabled={!!appliedPromoCode || isVerifyingPromo} placeholder={t("pay_promo_placeholder")} className="flex-1 px-3 py-2 text-sm uppercase bg-white border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-gycora disabled:bg-gray-100" />
//                   {!appliedPromoCode ? (
//                     <button type="submit" disabled={!promoInput || isVerifyingPromo} className="flex items-center justify-center w-20 px-4 text-[10px] font-bold text-white uppercase transition rounded-lg bg-gycora hover:bg-gycora-dark disabled:bg-gray-300">{isVerifyingPromo ? "..." : t("pay_btn_apply")}</button>
//                   ) : (
//                     <button type="button" onClick={removePromo} className="w-20 px-4 text-[10px] font-bold text-red-600 uppercase transition border border-red-200 rounded-lg bg-red-50 hover:bg-red-100">{t("pay_btn_remove")}</button>
//                   )}
//                 </form>
//                 {promoMessage && <p className={`mt-2 text-[10px] font-medium ${appliedPromoCode ? "text-emerald-600" : "text-red-500"}`}>{promoMessage}</p>}
//                 {appliedPromoCode && (
//                   <div className="flex justify-between text-[10px] md:text-xs font-medium text-emerald-600 mt-2">
//                     <span className="pr-2 truncate">Promo (<span className="font-mono uppercase">{appliedPromoCode}</span>)</span>
//                     <span>- {formatCurrencyDisplay(actualPromoDiscountObj)}</span>
//                   </div>
//                 )}
//               </div>

//               {/* Loyalty Points */}
//               <div className="pt-4 mt-2 border-t border-gray-200 border-dashed">
//                 <div className="flex items-center justify-between mb-3">
//                   <label className="text-[10px] font-bold tracking-widest text-gray-900 uppercase">{t("pay_loyalty_points")}</label>
//                   <span className="text-xs text-gray-500">{t("pay_balance")} <strong className="text-gycora">{availablePoints} Pts</strong></span>
//                 </div>
//                 <form onSubmit={handleApplyPoints} className="flex gap-2">
//                   <input type="number" value={pointsInput} onChange={(e) => setPointsInput(e.target.value === "" ? "" : Number(e.target.value))} disabled={pointsUsed > 0 || availablePoints <= 0} placeholder={`Maks: ${maxPointsAllowed}`} className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-gycora disabled:bg-gray-100" min="0" max={maxPointsAllowed} />
//                   {pointsUsed === 0 ? (
//                     <button type="submit" disabled={!pointsInput || availablePoints <= 0} className="flex items-center justify-center w-24 px-4 text-[10px] font-bold text-white uppercase transition rounded-lg bg-gycora hover:bg-gycora-dark disabled:bg-gray-300">{t("pay_btn_use")}</button>
//                   ) : (
//                     <button type="button" onClick={handleRemovePoints} className="w-24 px-4 text-[10px] font-bold text-red-600 uppercase transition border border-red-200 rounded-lg bg-red-50 hover:bg-red-100">{t("pay_btn_cancel")}</button>
//                   )}
//                 </form>
//                 {pointsUsed > 0 && (
//                   <div className="flex items-center justify-between mt-3 animate-fade-in">
//                     <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">{t("pay_points_applied")} ({pointsUsed} Pts)</span>
//                     <span className="text-[11px] font-medium text-emerald-600">- {formatCurrencyDisplay(appliedPointDiscountObj)}</span>
//                   </div>
//                 )}
//               </div>

//               {/* Ongkos Kirim */}
//               <div className="flex items-start justify-between pt-4 mt-2 text-gray-500 border-t border-gray-200 border-dashed">
//                 <span>{t("pay_shipping_cost")}</span>
//                 {shippingMethod === "free" ? (
//                   <span className="font-bold text-emerald-600">{t("pay_method_pickup")}</span>
//                 ) : shippingMethod === "biteship" && selectedRate ? (
//                   <div className="text-right">
//                     <span className="block font-medium text-gray-900">{formatCurrencyDisplay({ value: parseFloat(selectedRate.price) * checkoutCount, curr: "IDR" })}</span>
//                     <p className="mt-1 text-[10px] text-gray-400">{formatCurrencyDisplay({ value: parseFloat(selectedRate.price), curr: "IDR" })} x {checkoutCount} item</p>
//                   </div>
//                 ) : (
//                   <span className="text-[10px] italic">{t("choose_method")}</span>
//                 )}
//               </div>

//               <div className="flex justify-between pt-4 font-bold text-gray-900 border-t border-gray-200">
//                 <span className="mt-1 text-xs tracking-widest uppercase">{t("pay_grand_total")}</span>
//                 <span className="text-xl text-gycora">{formatCurrencyDisplay(grandTotalObj)}</span>
//               </div>

//               <button onClick={handlePayment} disabled={isButtonDisabled} className="flex items-center justify-center w-full gap-3 py-4 mt-8 text-xs font-bold tracking-[0.3em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/10">
//                 {!isProcessing ? t("pay_btn_pay_now") : t("pay_btn_processing")}
//               </button>

//               {!selectedAddressId && <p className="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase">{t("pay_alert_no_address")}</p>}
//               {shippingMethod === "biteship" && !selectedRate && <p className="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase">{t("pay_alert_no_courier")}</p>}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- MODAL FORM ALAMAT DENGAN PETA --- */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-10 pb-10 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fade-in-up">
//           <div className="flex flex-col w-full max-w-5xl my-auto overflow-hidden bg-white shadow-2xl rounded-3xl">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50 shrink-0">
//               <h3 className="text-xl font-extrabold tracking-tight text-gray-900">{editingId ? t("modal_edit_address_title") : t("modal_add_address_title")}</h3>
//               <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//               </button>
//             </div>
//             <div className="flex flex-col md:flex-row h-auto md:h-[650px] overflow-hidden">
//               {/* BAGIAN PETA (KIRI) */}
//               <div className="relative w-full bg-gray-100 border-b border-gray-200 h-72 md:h-full md:w-5/12 md:border-b-0 md:border-r shrink-0">
//                 <MapContainer center={mapPosition} zoom={15} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
//                   <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                   <Marker position={mapPosition}><Popup>{t("popup_selected_location")}</Popup></Marker>
//                   <MapEvents />
//                   <MapCenterUpdater position={mapPosition} />
//                 </MapContainer>
//                 <button type="button" onClick={handleGetCurrentLocation} disabled={isGettingLocation} className="absolute z-[1000] bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:-translate-x-0 md:right-6 flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-full shadow-xl font-bold text-xs hover:bg-gray-50 border border-gray-200 transition-all hover:-translate-y-0.5">
//                   {isGettingLocation ? (
//                     <span className="w-4 h-4 border-2 rounded-full border-[#006A4E] border-t-transparent animate-spin"></span>
//                   ) : (
//                     <svg className="w-4 h-4 text-[#006A4E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
//                   )}
//                   {t("btn_use_current_location")}
//                 </button>
//               </div>

//               {/* BAGIAN FORM (KANAN) */}
//               <form onSubmit={handleSubmitAddress} className="flex flex-col flex-1 p-6 space-y-6 overflow-y-auto bg-white sm:p-8 custom-scrollbar">
//                 <div className="flex gap-3 p-4 border border-blue-100 rounded-2xl bg-blue-50/50">
//                   <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
//                   <p className="text-xs leading-relaxed text-blue-800">{t("guide_map_text")}</p>
//                 </div>
//                 <div className="space-y-5">
//                   <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_first_name")}</label>
//                       <input type="text" required value={formData.first_name_address} onChange={(e) => setFormData({ ...formData, first_name_address: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
//                     </div>
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_last_name")}</label>
//                       <input type="text" required value={formData.last_name_address} onChange={(e) => setFormData({ ...formData, last_name_address: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_address_type")}</label>
//                     <select value={formData.location_type} onChange={(e) => setFormData({ ...formData, location_type: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none bg-white transition-all">
//                       <option value="home">{t("option_home")}</option>
//                       <option value="office">{t("option_office")}</option>
//                       <option value="other">{t("option_other")}</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_full_address")}</label>
//                     <textarea required rows={3} placeholder={t("placeholder_full_address")} value={formData.address_location} onChange={(e) => setFormData({ ...formData, address_location: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none resize-none bg-white transition-all"></textarea>
//                   </div>
//                   <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_region")}</label>
//                       <input type="text" required value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
//                     </div>
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_city")}</label>
//                       <input type="text" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
//                     </div>
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_province")}</label>
//                       <input type="text" required value={formData.province} onChange={(e) => setFormData({ ...formData, province: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
//                     </div>
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_postal_code")}</label>
//                       <input type="text" required value={formData.postal_code} onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
//                     </div>
//                   </div>
//                   <input type="hidden" value={formData.latitude} />
//                   <input type="hidden" value={formData.longitude} />
//                   <div className="flex items-center gap-3 p-4 mt-2 transition-colors border border-gray-200 cursor-pointer rounded-xl bg-gray-50 hover:bg-gray-100" onClick={() => setFormData({ ...formData, is_default: !formData.is_default })}>
//                     <input type="checkbox" id="is_default" checked={formData.is_default} onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })} className="w-5 h-5 rounded cursor-pointer text-[#006A4E] focus:ring-[#006A4E] accent-[#006A4E]" onClick={(e) => e.stopPropagation()} />
//                     <label htmlFor="is_default" className="text-sm font-bold text-gray-800 cursor-pointer select-none" onClick={(e) => e.stopPropagation()}>{t("label_set_default_address")}</label>
//                   </div>
//                 </div>
//                 <div className="flex justify-end gap-3 pt-6 mt-auto border-t border-gray-100">
//                   <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-sm font-bold text-gray-600 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200">{t("btn_cancel")}</button>
//                   <button type="submit" className="px-6 py-3 text-sm font-bold text-white transition-all shadow-md bg-[#006A4E] rounded-xl hover:bg-emerald-900 hover:shadow-lg">{editingId ? t("btn_update_address") : t("btn_save_address")}</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable no-empty */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { useState, useEffect, useMemo, useCallback } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../context/CartContext";
// import { BASE_URL } from "../../config/api";
// import { useLanguage } from "../../context/LanguageContext";
// import { useCurrency } from "../../context/CurrencyContext";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMapEvents,
//   useMap,
// } from "react-leaflet";

// interface Address {
//   id: number;
//   receiver: { first_name: string; last_name: string; full_name: string };
//   details: {
//     region: string;
//     address_location: string;
//     type: string;
//     city: string;
//     province: string;
//     postal_code: string;
//     latitude: string;
//     longitude: string;
//   };
//   is_default: boolean;
// }

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

// export default function PaymentPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { t } = useLanguage();

//   const { currency, exchangeRates } = useCurrency();
//   const curr = (currency as Currency) || "IDR";
//   const { cartItems } = useCart();
//   const selectedItemIds: number[] = location.state?.selectedIds || [];

//   const [isPageLoading, setIsPageLoading] = useState(true);
//   const [userType, setUserType] = useState<string>("guest");
//   const [catalogProducts, setCatalogProducts] = useState<any[]>([]);
//   const [isCatalogLoaded, setIsCatalogLoaded] = useState(false);

//   const [addresses, setAddresses] = useState<any[]>([]);
//   const defaultPosition: [number, number] = [-6.175392, 106.827153];
//   const [mapPosition, setMapPosition] = useState<[number, number]>(defaultPosition);
//   const [isGettingLocation, setIsGettingLocation] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState<number | null>(null);

//   const [formData, setFormData] = useState({
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

//   const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

//   const getUrlPrefix = () => {
//     if (location.pathname.startsWith("/id")) return "/id";
//     if (location.pathname.startsWith("/en")) return "/en";
//     return "";
//   };
//   const urlPrefix = getUrlPrefix();

//   const [shippingMethod, setShippingMethod] = useState("free");
//   const [selectedRate, setSelectedRate] = useState<any>(null);
//   const [isLoadingRates, setIsLoadingRates] = useState(false);
//   const [rawShippingRates, setRawShippingRates] = useState<any[]>([]);
//   const [deliveryDate, setDeliveryDate] = useState("");
//   const [deliveryTime, setDeliveryTime] = useState("");

//   const [promoInput, setPromoInput] = useState("");
//   const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
//   const [promoDiscountAmount, setPromoDiscountAmount] = useState(0);
//   const [appliedPromoType, setAppliedPromoType] = useState<string | null>(null);
//   const [promoMessage, setPromoMessage] = useState("");
//   const [isVerifyingPromo, setIsVerifyingPromo] = useState(false);
//   const [availablePoints, setAvailablePoints] = useState(0);
//   const [pointsInput, setPointsInput] = useState<number | "">("");
//   const [pointsUsed, setPointsUsed] = useState<number>(0);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

//   const convertIDRtoActiveCurrency = useCallback((idrAmount: number) => {
//     if (curr === "IDR" || !exchangeRates || !exchangeRates[curr]) return { value: idrAmount, curr: "IDR" };
//     return { value: idrAmount * exchangeRates[curr], curr: curr };
//   }, [curr, exchangeRates]);

//   const formatCurrencyDisplay = useCallback((priceObj: { value: number; curr: string } | null) => {
//     if (!priceObj) return "";
//     const symbols: any = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
//     const formatter = new Intl.NumberFormat(priceObj.curr === "IDR" ? "id-ID" : "en-US", {
//       minimumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//       maximumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//     });
//     return `${symbols[priceObj.curr] || priceObj.curr + " "}${formatter.format(priceObj.value)}`;
//   }, []);

//   const getPriceToDisplay = useCallback((product: any) => {
//     if (!product) return { value: 0, curr: "IDR" };
//     if (curr === "IDR") return { value: Number(product.price), curr: "IDR" };
//     try {
//       const pricesObj = typeof product.prices === "string" ? JSON.parse(product.prices) : product.prices || {};
//       const dbPrice = pricesObj[curr] || pricesObj[curr.toLowerCase()] || pricesObj[curr.toUpperCase()];
//       if (dbPrice) return { value: parseFloat(dbPrice), curr: curr };
//     } catch (e) { console.error(e); }
//     return { value: Number(product.price), curr: "IDR" };
//   }, [curr]);

//   const getDiscountToDisplay = useCallback((product: any) => {
//     if (!product) return null;
//     if (curr === "IDR") return product.discount_price ? { value: Number(product.discount_price), curr: "IDR" } : null;
//     try {
//       const discObj = typeof product.discount_prices === "string" ? JSON.parse(product.discount_prices) : product.discount_prices || {};
//       const dbDisc = discObj[curr] || discObj[curr.toLowerCase()] || discObj[curr.toUpperCase()];
//       if (dbDisc) return { value: parseFloat(dbDisc), curr: curr };
//     } catch (e) { console.error(e); }
//     return product.discount_price ? { value: Number(product.discount_price), curr: "IDR" } : null;
//   }, [curr]);

//   const getWholesaleToDisplay = useCallback((product: any) => {
//     if (!product) return null;
//     if (curr === "IDR") return product.wholesale_price ? { value: Number(product.wholesale_price), curr: "IDR" } : null;
//     try {
//       const wholesaleObj = typeof product.wholesale_prices === "string" ? JSON.parse(product.wholesale_prices) : product.wholesale_prices || {};
//       const dbWholesale = wholesaleObj[curr] || wholesaleObj[curr.toLowerCase()] || wholesaleObj[curr.toUpperCase()];
//       if (dbWholesale) return { value: parseFloat(dbWholesale), curr: curr };
//     } catch (e) { console.error(e); }
//     return product.wholesale_price ? { value: Number(product.wholesale_price), curr: "IDR" } : null;
//   }, [curr]);

//   const getBundleToDisplay = useCallback((product: any) => {
//     if (!product) return null;
//     if (curr === "IDR") return product.bundle_price > 0 ? { value: Number(product.bundle_price), curr: "IDR" } : null;
//     try {
//       const bundleObj = typeof product.bundle_prices === "string" ? JSON.parse(product.bundle_prices) : product.bundle_prices || {};
//       const dbBundle = bundleObj[curr] || bundleObj[curr.toLowerCase()] || bundleObj[curr.toUpperCase()];
//       if (dbBundle) return { value: parseFloat(dbBundle), curr: curr };
//     } catch (e) {}
//     return product.bundle_price > 0 ? convertIDRtoActiveCurrency(Number(product.bundle_price)) : null;
//   }, [curr, convertIDRtoActiveCurrency]);

//   const getActivePriceObj = useCallback((product: any, totalQty: number) => {
//     const isReseller = userType === "reseller";
//     const voucher = Number(product.voucher_discount_price) || 0;
//     if (appliedPromoType === "voucher" && voucher > 0) return { value: voucher, curr: "IDR" };

//     const dynamicPriceObj = getPriceToDisplay(product);
//     const dynamicDiscountObj = getDiscountToDisplay(product);
//     const dynamicWholesaleObj = getWholesaleToDisplay(product);

//     if (isReseller && dynamicWholesaleObj && dynamicWholesaleObj.value > 0 && totalQty >= 24) {
//       return dynamicWholesaleObj;
//     } else if (dynamicDiscountObj && dynamicDiscountObj.value > 0 && dynamicDiscountObj.value < dynamicPriceObj.value) {
//       return dynamicDiscountObj;
//     }
//     return dynamicPriceObj;
//   }, [userType, appliedPromoType, getPriceToDisplay, getDiscountToDisplay, getWholesaleToDisplay]);

//   const getFreshProduct = useCallback((cartProduct: any) => {
//     if (catalogProducts.length > 0 && cartProduct) {
//       const fresh = catalogProducts.find((p) => p.id === cartProduct.id || p.id === cartProduct.product_id);
//       if (fresh) return fresh;
//     }
//     return cartProduct;
//   }, [catalogProducts]);

//   const checkoutItems = useMemo(() => {
//     let baseItems = cartItems.filter((item) => selectedItemIds.includes(item.id));
//     if (catalogProducts.length > 0) {
//       baseItems = baseItems.map((item) => {
//         const fresh = catalogProducts.find((p) => p.id === item.product_id);
//         return fresh ? { ...item, product: fresh } : item;
//       });
//     }
//     return baseItems;
//   }, [cartItems, selectedItemIds, catalogProducts]);

//   const checkoutCount = useMemo(() => {
//     return checkoutItems.reduce((sum, item) => sum + item.quantity, 0);
//   }, [checkoutItems]);

//   const checkoutData = useMemo(() => {
//     let totalValueDisplay = 0;
//     let totalValueIDR = 0;
//     let appliedBundlesCount = 0;
//     const itemGrossAmounts: { [cartId: number]: number } = {};
//     const isBundledMap: Record<number, boolean> = {};

//     const driversPool: { cartId: number; normalPrice: number; normalIDR: number; bundlePrice: number; bundleIDR: number }[] = [];
//     const partnersPool: { cartId: number; normalPrice: number; normalIDR: number }[] = [];

//     const isReseller = userType === "reseller";
//     const isWholesaleGlobal = isReseller && checkoutCount >= 24;

//     checkoutItems.forEach((item) => {
//       const prod = item.product;
//       const qty = item.quantity;
//       itemGrossAmounts[item.id] = 0;
//       isBundledMap[item.id] = false;

//       const activePriceObj = getActivePriceObj(prod, checkoutCount);
//       let normalPriceDisplay = activePriceObj.value;
//       if (activePriceObj.curr === "IDR" && curr !== "IDR") {
//         normalPriceDisplay = normalPriceDisplay * (exchangeRates?.[curr] || 1);
//       }

//       let normalPriceIDR = Number(prod.price) || 0;
//       const wholesale = Number(prod.wholesale_price) || 0;
//       const discount = Number(prod.discount_price) || 0;
//       const voucher = Number(prod.voucher_discount_price) || 0;

//       if (appliedPromoType === "voucher" && voucher > 0) {
//         normalPriceIDR = voucher;
//       } else if (isWholesaleGlobal && wholesale > 0) {
//         normalPriceIDR = wholesale;
//       } else if (discount > 0 && discount < normalPriceIDR) {
//         normalPriceIDR = discount;
//       }

//       if (isWholesaleGlobal && wholesale > 0) {
//         itemGrossAmounts[item.id] += normalPriceDisplay * qty;
//         totalValueDisplay += normalPriceDisplay * qty;
//         totalValueIDR += normalPriceIDR * qty;
//         return;
//       }

//       const sku = (prod.sku || "").toUpperCase();
//       const isEGB = sku.startsWith("EGB");
//       const isBundleActiveFlag = String(prod.is_bundle_active).toLowerCase() === "true" || prod.is_bundle_active == 1;

//       let isValidDate = true;
//       if (prod.bundle_end_date && prod.bundle_end_date !== "0000-00-00 00:00:00") {
//         const safeDateStr = prod.bundle_end_date.replace(" ", "T");
//         const d = new Date(safeDateStr);
//         if (!isNaN(d.getTime())) isValidDate = d.getTime() > Date.now();
//       }

//       const bundleObjDisplay = getBundleToDisplay(prod);
//       const bundlePriceIDR = Number(prod.bundle_price) || 0;
//       const isDriver = isEGB && isBundleActiveFlag && isValidDate && bundleObjDisplay && bundleObjDisplay.value > 0;

//       if (isDriver) {
//         for (let i = 0; i < qty; i++) {
//           driversPool.push({ cartId: item.id, normalPrice: normalPriceDisplay, normalIDR: normalPriceIDR, bundlePrice: bundleObjDisplay.value, bundleIDR: bundlePriceIDR });
//         }
//       } else if (!isEGB) {
//         for (let i = 0; i < qty; i++) {
//           partnersPool.push({ cartId: item.id, normalPrice: normalPriceDisplay, normalIDR: normalPriceIDR });
//         }
//       } else {
//         itemGrossAmounts[item.id] += normalPriceDisplay * qty;
//         totalValueDisplay += normalPriceDisplay * qty;
//         totalValueIDR += normalPriceIDR * qty;
//       }
//     });

//     driversPool.sort((a, b) => b.bundlePrice - a.bundlePrice);

//     while (driversPool.length > 0 && partnersPool.length > 0) {
//       const driver = driversPool.shift()!;
//       const partner = partnersPool.shift()!;

//       const halfDisplay = driver.bundlePrice / 2;
//       itemGrossAmounts[driver.cartId] += halfDisplay;
//       itemGrossAmounts[partner.cartId] += halfDisplay;

//       isBundledMap[driver.cartId] = true;
//       isBundledMap[partner.cartId] = true;

//       totalValueDisplay += driver.bundlePrice;
//       totalValueIDR += driver.bundleIDR;
//       appliedBundlesCount++;
//     }

//     driversPool.forEach((d) => {
//       itemGrossAmounts[d.cartId] += d.normalPrice;
//       totalValueDisplay += d.normalPrice;
//       totalValueIDR += d.normalIDR;
//     });

//     partnersPool.forEach((p) => {
//       itemGrossAmounts[p.cartId] += p.normalPrice;
//       totalValueDisplay += p.normalPrice;
//       totalValueIDR += p.normalIDR;
//     });

//     return {
//       totalObj: { value: totalValueDisplay, curr },
//       totalIDR: totalValueIDR,
//       itemGrossAmounts,
//       isBundledMap,
//       appliedBundlesCount
//     };
//   }, [checkoutItems, checkoutCount, curr, getActivePriceObj, getBundleToDisplay, appliedPromoType, exchangeRates, userType]);

//   const checkoutTotalIDR = checkoutData.totalIDR;
//   const checkoutTotalAmountObj = checkoutData.totalObj;

//   const actualPromoDiscountIDR = useMemo(() => {
//     if (appliedPromoType === "claim") {
//       const productDiscount = Math.floor(checkoutTotalIDR * 0.1);
//       let shippingCost = 0;
//       if (shippingMethod === "biteship" && selectedRate) shippingCost = parseFloat(selectedRate.price);
//       const shippingSubsidy = Math.min(10000, shippingCost);
//       return productDiscount + shippingSubsidy;
//     }
//     return promoDiscountAmount;
//   }, [appliedPromoType, checkoutTotalIDR, shippingMethod, selectedRate, promoDiscountAmount]);

//   const actualPromoDiscountObj = convertIDRtoActiveCurrency(actualPromoDiscountIDR);

//   const maxPointsAllowed = useMemo(() => {
//     const maxUsableAmount = Math.max(0, checkoutTotalIDR - actualPromoDiscountIDR);
//     return Math.min(availablePoints, Math.floor(maxUsableAmount / 1000));
//   }, [availablePoints, checkoutTotalIDR, actualPromoDiscountIDR]);

//   const appliedPointDiscountIDR = pointsUsed * 1000;
//   const appliedPointDiscountObj = convertIDRtoActiveCurrency(appliedPointDiscountIDR);

//   // 👇 [PERBAIKAN KRITIS ONGKIR FRONTEND]: Hilangkan perkalian checkoutCount
//   // const shippingCostIDR = computed(() => {
//   //   return shippingMethod === "biteship" && selectedRate ? parseFloat(selectedRate.price) : 0;
//   // });

//   // const shippingCostObj = computed(() => convertIDRtoActiveCurrency(shippingCostIDR));

//   // 👇 [PERBAIKAN KRITIS ONGKIR FRONTEND]: Menggunakan useMemo (Sintaks React)
//   const shippingCostIDR = useMemo(() => {
//     return shippingMethod === "biteship" && selectedRate ? parseFloat(selectedRate.price) : 0;
//   }, [shippingMethod, selectedRate]);

//   const shippingCostObj = useMemo(() => {
//     return convertIDRtoActiveCurrency(shippingCostIDR);
//   }, [shippingCostIDR, convertIDRtoActiveCurrency]);

//   const grandTotalObj = useMemo(() => {
//     return {
//       value: checkoutTotalAmountObj.value + shippingCostObj.value - actualPromoDiscountObj.value - appliedPointDiscountObj.value,
//       curr: curr,
//     };
//   }, [checkoutTotalAmountObj, shippingCostObj, actualPromoDiscountObj, appliedPointDiscountObj, curr]);

//   const handleGetCurrentLocation = () => {
//     setIsGettingLocation(true);
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const lat = position.coords.latitude;
//           const lng = position.coords.longitude;
//           setMapPosition([lat, lng]);
//           fetchAddressFromCoords(lat, lng);
//           setIsGettingLocation(false);
//         },
//         () => { Swal.fire("Akses Ditolak", t("warn_location_denied"), "warning"); setIsGettingLocation(false); }
//       );
//     } else {
//       Swal.fire("Tidak Mendukung", t("warn_location_unsupported"), "error"); setIsGettingLocation(false);
//     }
//   };

//   const fetchAddressFromCoords = async (lat: number, lng: number) => {
//     try {
//       const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
//       const data = await res.json();
//       if (data && data.address) {
//         const { address } = data;
//         const newCity = address.city || address.town || address.county || "";
//         const newRegion = address.suburb || address.village || address.neighbourhood || "";
//         const newProvince = address.state || "";
//         const newPostal = address.postcode || "";
//         const roadName = address.road || "";
//         const houseNumber = address.house_number || "";
//         const fullStreet = roadName ? `${roadName} ${houseNumber}`.trim() : data.display_name;

//         setFormData((prev) => ({
//           ...prev, latitude: lat.toString(), longitude: lng.toString(), address_location: fullStreet,
//           city: newCity, province: newProvince, region: newRegion, postal_code: newPostal,
//         }));
//       }
//     } catch (error) { console.error(error); }
//   };

//   const MapEvents = useCallback(() => {
//     useMapEvents({ click(e) { setMapPosition([e.latlng.lat, e.latlng.lng]); fetchAddressFromCoords(e.latlng.lat, e.latlng.lng); } });
//     return null;
//   }, []);

//   const MapCenterUpdater = ({ position }: { position: [number, number] }) => {
//     const map = useMap();
//     useEffect(() => { map.setView(position, map.getZoom()); }, [position, map]);
//     return null;
//   };

//   useEffect(() => {
//     if (pointsUsed > maxPointsAllowed) {
//       setPointsUsed(maxPointsAllowed);
//       setPointsInput(maxPointsAllowed > 0 ? maxPointsAllowed : "");
//     }
//   }, [maxPointsAllowed, pointsUsed]);

//   const handleOpenModal = (address: Address | null = null) => {
//     if (address) {
//       setEditingId(address.id);
//       const lat = parseFloat(address.details.latitude);
//       const lng = parseFloat(address.details.longitude);
//       setMapPosition(!isNaN(lat) && !isNaN(lng) ? [lat, lng] : defaultPosition);
//       setFormData({
//         region: address.details.region || "", first_name_address: address.receiver.first_name, last_name_address: address.receiver.last_name,
//         address_location: address.details.address_location, city: address.details.city, province: address.details.province,
//         postal_code: address.details.postal_code, location_type: address.details.type, latitude: address.details.latitude || "",
//         longitude: address.details.longitude || "", is_default: address.is_default,
//       });
//     } else {
//       setEditingId(null);
//       setMapPosition(defaultPosition);
//       setFormData({
//         region: "", first_name_address: "", last_name_address: "", address_location: "", city: "", province: "", postal_code: "",
//         location_type: "home", latitude: "", longitude: "", is_default: false,
//       });
//     }
//     setIsModalOpen(true);
//   };

//   const fetchAddresses = async (token: string) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/addresses`, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } });
//       if (res.ok) {
//         const data = await res.json();
//         const addrArray = data.data ? data.data : data;
//         setAddresses(addrArray || []);
//         if (addrArray && addrArray.length > 0) {
//           const defaultAddr = addrArray.find((a: any) => a.is_default);
//           setSelectedAddressId(defaultAddr ? defaultAddr.id : addrArray[0].id);
//         } else { setSelectedAddressId(null); }
//       }
//     } catch (err) { console.error(err); }
//   };

//   useEffect(() => {
//     const fetchCatalog = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (res.ok) {
//           const data = await res.json();
//           setCatalogProducts(data.data ? data.data : data);
//         }
//       } catch (err) { console.error(err); } finally { setIsCatalogLoaded(true); }
//     };
//     fetchCatalog();
//   }, []);

//   useEffect(() => {
//     if (selectedItemIds.length === 0) { navigate(`${urlPrefix}/cart`); return; }
//     const loadData = async () => {
//       const token = localStorage.getItem("user_token");
//       const userStr = localStorage.getItem("user_data");
//       if (!token) { navigate(`${urlPrefix}/login`); return; }
//       if (userStr) {
//         const user = JSON.parse(userStr);
//         setAvailablePoints(user.point || 0);
//         setUserType(user.usertype || "user");
//       }
//       await fetchAddresses(token);
//       // const now = new Date();
//       // GANTI SEMENTARA UNTUK TESTING
// const now = new Date("2026-08-17T12:00:00+07:00");
//       now.setHours(now.getHours() + 1);
//       setDeliveryDate(now.toISOString().split("T")[0]);
//       setDeliveryTime(`${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`);
//       setIsPageLoading(false);
//     };
//     loadData();
//   }, [navigate, selectedItemIds.length]);

//   useEffect(() => {
//     if (selectedAddressId && selectedItemIds.length > 0 && shippingMethod === "biteship") {
//       const getRates = async () => {
//         setIsLoadingRates(true);
//         setSelectedRate(null);
//         setRawShippingRates([]);
//         try {
//           const token = localStorage.getItem("user_token");
//           const res = await fetch(`${BASE_URL}/api/shipping/rates`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
//             body: JSON.stringify({ address_id: selectedAddressId, cart_ids: selectedItemIds }),
//           });
//           if (res.ok) {
//             const data = await res.json();
//             if (data.pricing) setRawShippingRates(data.pricing);
//           }
//         } catch (err) { console.error(err); } finally { setIsLoadingRates(false); }
//       };
//       getRates();
//     }
//   }, [selectedAddressId, selectedItemIds, shippingMethod]);

//   const processedShippingRates = useMemo(() => {
//     if (!rawShippingRates || rawShippingRates.length === 0) return [];
//     return rawShippingRates
//       .map((rate) => ({ ...rate, is_disabled: false, disable_reason: "" }))
//       .sort((a, b) => a.is_disabled === b.is_disabled ? 0 : a.is_disabled ? 1 : -1 );
//   }, [rawShippingRates]);

//   const applyPromo = async (e: any) => {
//     e.preventDefault();
//     if (!promoInput) return;
//     setIsVerifyingPromo(true);
//     try {
//       const token = localStorage.getItem("user_token");
//       const res = await fetch(`${BASE_URL}/api/promo/verify`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
//         body: JSON.stringify({ promo_code: promoInput }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Promo tidak valid");
//       if (checkoutTotalIDR < 50000) throw new Error("Minimum belanja Rp 50.000");

//       setAppliedPromoCode(promoInput.toUpperCase());
//       setAppliedPromoType(data.promo_type);

//       if (data.promo_type === "claim") {
//         setPromoDiscountAmount(0);
//         setPromoMessage("✅ " + data.message + " (10% OFF + Subsidi Ongkir 10K)");
//       } else {
//         setPromoDiscountAmount(data.discount_value);
//         setPromoMessage("✅ " + data.message + " (Harga Khusus Diterapkan)");
//       }
//     } catch (err: any) {
//       removePromo();
//       setPromoMessage("❌ " + err.message);
//     } finally { setIsVerifyingPromo(false); }
//   };

//   const removePromo = () => {
//     setPromoInput(""); setAppliedPromoCode(null); setAppliedPromoType(null); setPromoDiscountAmount(0); setPromoMessage("");
//   };

//   const handleApplyPoints = (e: any) => {
//     e.preventDefault();
//     const ptsToUse = Number(pointsInput);
//     if (ptsToUse > availablePoints) return Swal.fire("Peringatan", `Anda hanya memiliki ${availablePoints} poin.`, "warning");
//     if (ptsToUse > maxPointsAllowed) { setPointsInput(maxPointsAllowed); setPointsUsed(maxPointsAllowed); return; }
//     setPointsUsed(ptsToUse);
//   };

//   const handleRemovePoints = () => { setPointsInput(""); setPointsUsed(0); };

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
//         promo_type: appliedPromoType,
//         currency: curr,
//       };

//       const res = await fetch(`${BASE_URL}/api/checkout`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const data = await res.json();

//       if (res.ok && data.checkout_url) {
//         (window as any).dataLayer = (window as any).dataLayer || [];
//         (window as any).dataLayer.push({
//           event: "add_payment_info",
//           ecommerce: {
//             currency: grandTotalObj.curr,
//             value: grandTotalObj.value,
//             items: checkoutItems.map((item: any) => {
//               const freshProd = getFreshProduct(item.product);
//               const calculatedGross = checkoutData.itemGrossAmounts[item.id];
//               const unitPrice = calculatedGross !== undefined ? calculatedGross / item.quantity : getActivePriceObj(freshProd, checkoutCount).value;
//               return {
//                 item_id: freshProd.id,
//                 item_name: freshProd.name,
//                 price: unitPrice,
//                 quantity: item.quantity,
//               };
//             }),
//           },
//         });
//         window.location.href = data.checkout_url;
//       } else { throw new Error(data.message || "Gagal membuat tagihan"); }
//     } catch (err: any) { Swal.fire("Error", err.message, "error"); } finally { setIsProcessing(false); }
//   };

//   const handleImageError = (company: string) => { setImageErrors((prev) => ({ ...prev, [company]: true })); };

//   const getCourierLogo = (company: string) => {
//     if (!company) return null;
//     const map: Record<string, string> = { jne: "jne.png", sicepat: "sicepat.png", jnt: "jnt.png", anteraja: "anteraja.png", gojek: "gojek.png", grab: "grab.png", paxel: "paxel.png", ninja: "ninja.png" };
//     return map[company.toLowerCase()] ? "/courier_images/" + map[company.toLowerCase()] : null;
//   };

//   const handleSubmitAddress = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.latitude || !formData.longitude) return Swal.fire(t("notification"), t("warn_select_location"), "warning");
//     const token = localStorage.getItem("user_token");
//     const method = editingId ? "PUT" : "POST";
//     const url = editingId ? `${BASE_URL}/api/addresses/${editingId}` : `${BASE_URL}/api/addresses`;
//     try {
//       const res = await fetch(url, { method, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(formData) });
//       if (res.ok) {
//         Swal.fire({ icon: "success", title: "Berhasil!", text: editingId ? t("toast_address_updated") : t("toast_address_added"), timer: 1500, showConfirmButton: false });
//         setIsModalOpen(false); fetchAddresses(token!);
//       } else { throw new Error("Gagal menyimpan alamat"); }
//     } catch (error) { console.error(error); Swal.fire(t("error"), t("server_error"), "error"); }
//   };

//   const isButtonDisabled = isProcessing || checkoutItems.length === 0 || !selectedAddressId || (shippingMethod === "biteship" && !selectedRate);

//   if (isPageLoading || !isCatalogLoaded) {
//     return (
//       <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
//         <div className="flex gap-2 mb-4">
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-1"></div>
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-2"></div>
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-3"></div>
//         </div>
//         <p className="font-serif text-sm italic tracking-widest text-gray-500 animate-pulse">{t("pay_loading_checkout")}</p>
//       </div>
//     );
//   }

//   if (checkoutItems.length === 0) {
//     return (
//       <div className="min-h-screen px-6 py-12 mx-auto font-sans md:py-24 max-w-[1440px] animate-fade-in">
//         <div className="py-20 text-center">
//           <h2 className="mb-4 text-3xl font-extrabold text-gray-900">{t("pay_empty_items")}</h2>
//           <button onClick={() => navigate(`${urlPrefix}/cart`)} className="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase rounded-full bg-gycora hover:bg-gycora-dark">{t("pay_btn_back_cart")}</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen px-6 py-12 mx-auto font-sans md:py-24 max-w-[1440px] animate-fade-in relative">
//       <h1 className="mb-12 text-3xl font-extrabold tracking-tighter text-gray-900 uppercase md:text-4xl">{t("pay_checkout_title")}</h1>

//       <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
//         <div className="flex-grow space-y-12">
//           {/* BAGIAN ALAMAT */}
//           <section>
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-4">
//                 <span className="flex items-center justify-center w-6 h-6 text-[10px] font-bold text-white rounded-full bg-gycora">1</span>
//                 <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">{t("pay_shipping_address")}</h2>
//               </div>
//               {addresses.length > 0 && (
//                 <button onClick={() => handleOpenModal()} className="text-xs font-bold transition-colors text-emerald-600 hover:text-emerald-800">{t("pay_add_address")}</button>
//               )}
//             </div>

//             {addresses.length === 0 ? (
//               <div className="py-10 text-center border border-gray-300 border-dashed bg-gray-50 rounded-2xl">
//                 <p className="mb-2 text-sm italic text-gray-500">{t("pay_no_address")}</p>
//                 <button onClick={() => handleOpenModal()} className="px-6 py-2 mt-2 text-xs font-bold tracking-widest text-white uppercase transition-colors rounded-full shadow-md bg-gycora hover:bg-gycora-dark">{t("pay_new_address")}</button>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {addresses.map((addr) => (
//                   <label key={addr.id} className={`relative flex items-start p-6 border rounded-2xl cursor-pointer transition-all ${selectedAddressId === addr.id ? "border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md" : "border-gray-200 bg-white hover:bg-gray-50"}`}>
//                     <input type="radio" name="address" value={addr.id} checked={selectedAddressId === addr.id} onChange={() => setSelectedAddressId(addr.id)} className="w-5 h-5 mt-1 border-gray-300 rounded-full text-gycora focus:ring-gycora" />
//                     <div className="flex-grow ml-4">
//                       <div className="flex justify-between">
//                         <p className="text-sm font-bold text-gray-900 uppercase">{addr.receiver.full_name}</p>
//                         {addr.is_default && <span className="px-2 py-0.5 text-[9px] font-bold text-emerald-800 uppercase bg-emerald-100 rounded">{t("main_address")}</span>}
//                       </div>
//                       <p className="mt-2 text-sm leading-relaxed text-gray-600">{addr.details.address_location} - {addr.details.type} <br /> {addr.details.city}, {addr.details.province} <br /> {addr.details.region} - {addr.details.postal_code}</p>
//                     </div>
//                   </label>
//                 ))}
//               </div>
//             )}
//           </section>

//           {/* BAGIAN KURIR */}
//           <section className={!selectedAddressId ? "opacity-50 pointer-events-none" : ""}>
//             <div className="flex items-center gap-4 mb-6">
//               <span className="flex items-center justify-center w-6 h-6 text-[10px] font-bold text-white rounded-full bg-gycora">2</span>
//               <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">{t("pay_shipping_method")}</h2>
//             </div>

//             <div className="space-y-4">
//               <label className={`relative flex items-center p-6 border rounded-2xl cursor-pointer transition-all ${shippingMethod === "free" ? "border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md" : "border-gray-200 bg-white hover:bg-gray-50"}`}>
//                 <input type="radio" value="free" checked={shippingMethod === "free"} onChange={() => setShippingMethod("free")} className="w-5 h-5 border-gray-300 rounded-full text-gycora focus:ring-gycora" />
//                 <div className="flex items-center justify-between flex-grow ml-4">
//                   <div>
//                     <p className="text-sm font-bold tracking-wide text-gray-900 uppercase">{t("pay_method_pickup")}</p>
//                     <p className="mt-1 text-xs font-bold text-emerald-600">{t("pay_method_pickup_desc")}</p>
//                   </div>
//                   <p className="font-black text-gycora">{t("pay_method_free")}</p>
//                 </div>
//               </label>

//               <label className={`relative flex items-center p-6 border rounded-2xl cursor-pointer transition-all ${shippingMethod === "biteship" ? "border-gycora ring-1 ring-gycora bg-emerald-50/20 shadow-md" : "border-gray-200 bg-white hover:bg-gray-50"}`}>
//                 <input type="radio" value="biteship" checked={shippingMethod === "biteship"} onChange={() => setShippingMethod("biteship")} className="w-5 h-5 border-gray-300 rounded-full text-gycora focus:ring-gycora" />
//                 <div className="flex items-center justify-between flex-grow ml-4">
//                   <div>
//                     <p className="text-sm font-bold tracking-wide text-gray-900 uppercase">{t("pay_method_courier")}</p>
//                     <p className="mt-1 text-xs text-gray-500">{t("pay_method_courier_desc")}</p>
//                   </div>
//                 </div>
//               </label>

//               {shippingMethod === "biteship" && (
//                 <div className="p-6 mt-4 space-y-8 bg-white border border-gray-200 rounded-3xl animate-fade-in">
//                   <h3 className="pt-2 text-sm font-bold tracking-widest text-gray-900 uppercase border-t border-gray-100">{t("pay_choose_courier")}</h3>
//                   {isLoadingRates ? (
//                     <p className="py-4 text-sm text-center text-gray-500 animate-pulse">{t("pay_calc_shipping")}</p>
//                   ) : processedShippingRates.length === 0 ? (
//                     <p className="py-4 text-xs italic text-center text-red-500">{t("pay_no_courier")}</p>
//                   ) : (
//                     <div className="space-y-3">
//                       {processedShippingRates.map((rate, idx) => (
//                         <label key={idx} className={`relative flex flex-col p-4 border rounded-xl transition-all ${rate.is_disabled ? "opacity-50 bg-gray-50 pointer-events-none" : selectedRate?.company === rate.company && selectedRate?.type === rate.type ? "border-gycora bg-emerald-50/10 shadow-sm" : "border-gray-200 hover:bg-gray-50 cursor-pointer"}`}>
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
//                             <p className="text-sm font-black text-gray-900">{formatCurrencyDisplay(convertIDRtoActiveCurrency(rate.price))}</p>
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
//             <h2 className="pb-4 mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">{t("pay_order_summary")}</h2>

//             {checkoutData.appliedBundlesCount > 0 && (
//               <div className="flex items-center justify-between p-3 mb-6 border border-purple-200 rounded-xl bg-purple-50">
//                 <span className="text-[10px] font-extrabold tracking-wide text-purple-800 uppercase">{t("bundle_promo_active")}</span>
//                 <span className="text-xs font-black text-purple-700">{checkoutData.appliedBundlesCount} {t("bundle")}</span>
//               </div>
//             )}

//             <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
//               {checkoutItems.map((item: any) => {
//                 let colorHex = item.color;
//                 let colorName = "";
//                 try {
//                   const parsed = JSON.parse(item.color as string);
//                   if (parsed.hex) { colorHex = parsed.hex; colorName = parsed.name || ""; }
//                 } catch {}

//                 const freshProd = getFreshProduct(item.product);
//                 const activePriceObj = getActivePriceObj(freshProd, checkoutCount);
//                 const basePriceObj = getPriceToDisplay(freshProd);
//                 const isDiscounted = activePriceObj.value < basePriceObj.value;

//                 const isWholesaleActive = userType === "reseller" && Number(freshProd.wholesale_price) > 0 && checkoutCount >= 24;
//                 const isBundled = checkoutData.isBundledMap[item.id];
//                 const calculatedGross = checkoutData.itemGrossAmounts[item.id];

//                 const currentGrossAmountObj = {
//                   value: calculatedGross !== undefined ? calculatedGross : activePriceObj.value * item.quantity,
//                   curr: checkoutData.totalObj.curr,
//                 };
//                 const originalGrossAmountObj = {
//                   value: basePriceObj.value * item.quantity,
//                   curr: basePriceObj.curr,
//                 };

//                 return (
//                   <div key={item.id} className="flex gap-4">
//                     <img src={freshProd.image_url} alt={freshProd.name} className="object-cover w-16 h-16 bg-white border border-gray-100 rounded-xl shrink-0" />
//                     <div className="flex-grow">
//                       <div className="flex items-center gap-2">
//                         <p className="w-40 text-[11px] font-bold text-gray-900 uppercase truncate" title={freshProd.name}>{freshProd.name}</p>
//                         {isWholesaleActive && <span className="px-1.5 py-0.5 text-[8px] font-bold text-white bg-blue-600 rounded">GROSIR (WHOLESALE)</span>}
//                         {isBundled && <span className="px-1.5 py-0.5 text-[8px] font-bold text-purple-600 bg-purple-100 rounded uppercase">Bundle</span>}
//                       </div>

//                       <div className="flex items-center gap-2 mt-0.5">
//                         <p className="text-[10px] text-gray-400">Qty: {item.quantity}</p>
//                         {item.color && (
//                           <>
//                             <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
//                             <div className="flex items-center gap-1.5">
//                               <div className="w-3 h-3 border border-gray-300 rounded-full shadow-sm shrink-0" style={{ backgroundColor: colorHex }}></div>
//                               {colorName && <span className="text-[10px] font-bold text-gray-500 uppercase">{colorName}</span>}
//                             </div>
//                           </>
//                         )}
//                       </div>

//                       <p className={`mt-1 text-xs font-medium ${isBundled ? "text-purple-600" : isWholesaleActive ? "text-blue-600" : "text-gycora"}`}>
//                         {formatCurrencyDisplay(currentGrossAmountObj)}{" "}
//                         {(isDiscounted && !isBundled) && (
//                           <span className="text-[9px] line-through text-gray-400 ml-1">{formatCurrencyDisplay(originalGrossAmountObj)}</span>
//                         )}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="pt-4 space-y-3 text-sm border-t border-gray-200">
//               <div className="flex justify-between text-gray-500">
//                 <span>{t("pay_total_items")}</span>
//                 <span className="font-bold text-gray-900">{checkoutCount} items</span>
//               </div>
//               <div className="flex justify-between text-gray-500">
//                 <span>{t("pay_product_subtotal")}</span>
//                 <span className={appliedPromoType === "voucher" ? "text-amber-600 font-bold" : ""}>{formatCurrencyDisplay(checkoutTotalAmountObj)}</span>
//               </div>

//               {/* Promo Code */}
//               <div className="pt-4 mt-2 border-t border-gray-200 border-dashed">
//                 <label className="block mb-2 text-[10px] font-bold tracking-widest text-gray-900 uppercase">{t("pay_promo_label")}</label>
//                 <form onSubmit={applyPromo} className="flex gap-2">
//                   <input type="text" value={promoInput} onChange={(e) => setPromoInput(e.target.value)} disabled={!!appliedPromoCode || isVerifyingPromo} placeholder={t("pay_promo_placeholder")} className="flex-1 px-3 py-2 text-sm uppercase bg-white border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-gycora disabled:bg-gray-100" />
//                   {!appliedPromoCode ? (
//                     <button type="submit" disabled={!promoInput || isVerifyingPromo} className="flex items-center justify-center w-20 px-4 text-[10px] font-bold text-white uppercase transition rounded-lg bg-gycora hover:bg-gycora-dark disabled:bg-gray-300">{isVerifyingPromo ? "..." : t("pay_btn_apply")}</button>
//                   ) : (
//                     <button type="button" onClick={removePromo} className="w-20 px-4 text-[10px] font-bold text-red-600 uppercase transition border border-red-200 rounded-lg bg-red-50 hover:bg-red-100">{t("pay_btn_remove")}</button>
//                   )}
//                 </form>
//                 {promoMessage && <p className={`mt-2 text-[10px] font-medium ${appliedPromoCode ? "text-emerald-600" : "text-red-500"}`}>{promoMessage}</p>}
//                 {appliedPromoCode && (
//                   <div className="flex justify-between text-[10px] md:text-xs font-medium text-emerald-600 mt-2">
//                     <span className="pr-2 truncate">Promo (<span className="font-mono uppercase">{appliedPromoCode}</span>)</span>
//                     <span>- {formatCurrencyDisplay(actualPromoDiscountObj)}</span>
//                   </div>
//                 )}
//               </div>

//               {/* Loyalty Points */}
//               <div className="pt-4 mt-2 border-t border-gray-200 border-dashed">
//                 <div className="flex items-center justify-between mb-3">
//                   <label className="text-[10px] font-bold tracking-widest text-gray-900 uppercase">{t("pay_loyalty_points")}</label>
//                   <span className="text-xs text-gray-500">{t("pay_balance")} <strong className="text-gycora">{availablePoints} Pts</strong></span>
//                 </div>
//                 <form onSubmit={handleApplyPoints} className="flex gap-2">
//                   <input type="number" value={pointsInput} onChange={(e) => setPointsInput(e.target.value === "" ? "" : Number(e.target.value))} disabled={pointsUsed > 0 || availablePoints <= 0} placeholder={`Maks: ${maxPointsAllowed}`} className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-gycora disabled:bg-gray-100" min="0" max={maxPointsAllowed} />
//                   {pointsUsed === 0 ? (
//                     <button type="submit" disabled={!pointsInput || availablePoints <= 0} className="flex items-center justify-center w-24 px-4 text-[10px] font-bold text-white uppercase transition rounded-lg bg-gycora hover:bg-gycora-dark disabled:bg-gray-300">{t("pay_btn_use")}</button>
//                   ) : (
//                     <button type="button" onClick={handleRemovePoints} className="w-24 px-4 text-[10px] font-bold text-red-600 uppercase transition border border-red-200 rounded-lg bg-red-50 hover:bg-red-100">{t("pay_btn_cancel")}</button>
//                   )}
//                 </form>
//                 {pointsUsed > 0 && (
//                   <div className="flex items-center justify-between mt-3 animate-fade-in">
//                     <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">{t("pay_points_applied")} ({pointsUsed} Pts)</span>
//                     <span className="text-[11px] font-medium text-emerald-600">- {formatCurrencyDisplay(appliedPointDiscountObj)}</span>
//                   </div>
//                 )}
//               </div>

//               {/* 👇 [PERBAIKAN] TAMPILAN ONGKOS KIRIM TETAP 👇 */}
//               <div className="flex items-start justify-between pt-4 mt-2 text-gray-500 border-t border-gray-200 border-dashed">
//                 <span>{t("pay_shipping_cost")}</span>
//                 {shippingMethod === "free" ? (
//                   <span className="font-bold text-emerald-600">{t("pay_method_pickup")}</span>
//                 ) : shippingMethod === "biteship" && selectedRate ? (
//                   <div className="text-right">
//                     <span className="block font-medium text-gray-900">{formatCurrencyDisplay({ value: parseFloat(selectedRate.price), curr: "IDR" })}</span>
//                     <p className="mt-1 text-[10px] text-gray-400">Flat Rate (Semua Item)</p>
//                   </div>
//                 ) : (
//                   <span className="text-[10px] italic">{t("choose_method")}</span>
//                 )}
//               </div>

//               <div className="flex justify-between pt-4 font-bold text-gray-900 border-t border-gray-200">
//                 <span className="mt-1 text-xs tracking-widest uppercase">{t("pay_grand_total")}</span>
//                 <span className="text-xl text-gycora">{formatCurrencyDisplay(grandTotalObj)}</span>
//               </div>

//               <button onClick={handlePayment} disabled={isButtonDisabled} className="flex items-center justify-center w-full gap-3 py-4 mt-8 text-xs font-bold tracking-[0.3em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/10">
//                 {!isProcessing ? t("pay_btn_pay_now") : t("pay_btn_processing")}
//               </button>

//               {!selectedAddressId && <p className="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase">{t("pay_alert_no_address")}</p>}
//               {shippingMethod === "biteship" && !selectedRate && <p className="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase">{t("pay_alert_no_courier")}</p>}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- MODAL FORM ALAMAT DENGAN PETA --- */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-10 pb-10 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fade-in-up">
//           <div className="flex flex-col w-full max-w-5xl my-auto overflow-hidden bg-white shadow-2xl rounded-3xl">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50 shrink-0">
//               <h3 className="text-xl font-extrabold tracking-tight text-gray-900">{editingId ? t("modal_edit_address_title") : t("modal_add_address_title")}</h3>
//               <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//               </button>
//             </div>
//             <div className="flex flex-col md:flex-row h-auto md:h-[650px] overflow-hidden">
//               {/* BAGIAN PETA (KIRI) */}
//               <div className="relative w-full bg-gray-100 border-b border-gray-200 h-72 md:h-full md:w-5/12 md:border-b-0 md:border-r shrink-0">
//                 <MapContainer center={mapPosition} zoom={15} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
//                   <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                   <Marker position={mapPosition}><Popup>{t("popup_selected_location")}</Popup></Marker>
//                   <MapEvents />
//                   <MapCenterUpdater position={mapPosition} />
//                 </MapContainer>
//                 <button type="button" onClick={handleGetCurrentLocation} disabled={isGettingLocation} className="absolute z-[1000] bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:-translate-x-0 md:right-6 flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-full shadow-xl font-bold text-xs hover:bg-gray-50 border border-gray-200 transition-all hover:-translate-y-0.5">
//                   {isGettingLocation ? (
//                     <span className="w-4 h-4 border-2 rounded-full border-[#006A4E] border-t-transparent animate-spin"></span>
//                   ) : (
//                     <svg className="w-4 h-4 text-[#006A4E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
//                   )}
//                   {t("btn_use_current_location")}
//                 </button>
//               </div>

//               {/* BAGIAN FORM (KANAN) */}
//               <form onSubmit={handleSubmitAddress} className="flex flex-col flex-1 p-6 space-y-6 overflow-y-auto bg-white sm:p-8 custom-scrollbar">
//                 <div className="flex gap-3 p-4 border border-blue-100 rounded-2xl bg-blue-50/50">
//                   <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
//                   <p className="text-xs leading-relaxed text-blue-800">{t("guide_map_text")}</p>
//                 </div>
//                 <div className="space-y-5">
//                   <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_first_name")}</label>
//                       <input type="text" required value={formData.first_name_address} onChange={(e) => setFormData({ ...formData, first_name_address: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
//                     </div>
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_last_name")}</label>
//                       <input type="text" required value={formData.last_name_address} onChange={(e) => setFormData({ ...formData, last_name_address: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_address_type")}</label>
//                     <select value={formData.location_type} onChange={(e) => setFormData({ ...formData, location_type: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none bg-white transition-all">
//                       <option value="home">{t("option_home")}</option>
//                       <option value="office">{t("option_office")}</option>
//                       <option value="other">{t("option_other")}</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_full_address")}</label>
//                     <textarea required rows={3} placeholder={t("placeholder_full_address")} value={formData.address_location} onChange={(e) => setFormData({ ...formData, address_location: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none resize-none bg-white transition-all"></textarea>
//                   </div>
//                   <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_region")}</label>
//                       <input type="text" required value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
//                     </div>
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_city")}</label>
//                       <input type="text" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
//                     </div>
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_province")}</label>
//                       <input type="text" required value={formData.province} onChange={(e) => setFormData({ ...formData, province: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
//                     </div>
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_postal_code")}</label>
//                       <input type="text" required value={formData.postal_code} onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
//                     </div>
//                   </div>
//                   <input type="hidden" value={formData.latitude} />
//                   <input type="hidden" value={formData.longitude} />
//                   <div className="flex items-center gap-3 p-4 mt-2 transition-colors border border-gray-200 cursor-pointer rounded-xl bg-gray-50 hover:bg-gray-100" onClick={() => setFormData({ ...formData, is_default: !formData.is_default })}>
//                     <input type="checkbox" id="is_default" checked={formData.is_default} onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })} className="w-5 h-5 rounded cursor-pointer text-[#006A4E] focus:ring-[#006A4E] accent-[#006A4E]" onClick={(e) => e.stopPropagation()} />
//                     <label htmlFor="is_default" className="text-sm font-bold text-gray-800 cursor-pointer select-none" onClick={(e) => e.stopPropagation()}>{t("label_set_default_address")}</label>
//                   </div>
//                 </div>
//                 <div className="flex justify-end gap-3 pt-6 mt-auto border-t border-gray-100">
//                   <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-sm font-bold text-gray-600 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200">{t("btn_cancel")}</button>
//                   <button type="submit" className="px-6 py-3 text-sm font-bold text-white transition-all shadow-md bg-[#006A4E] rounded-xl hover:bg-emerald-900 hover:shadow-lg">{editingId ? t("btn_update_address") : t("btn_save_address")}</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable no-empty */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { useState, useEffect, useMemo, useCallback } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../context/CartContext";
// import { BASE_URL } from "../../config/api";
// import { useLanguage } from "../../context/LanguageContext";
// import { useCurrency } from "../../context/CurrencyContext";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMapEvents,
//   useMap,
// } from "react-leaflet";

// interface Address {
//   id: number;
//   receiver: { first_name: string; last_name: string; full_name: string };
//   details: {
//     region: string;
//     address_location: string;
//     type: string;
//     city: string;
//     province: string;
//     postal_code: string;
//     latitude: string;
//     longitude: string;
//   };
//   is_default: boolean;
// }

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

// export default function PaymentPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { t } = useLanguage();

//   const { currency, exchangeRates } = useCurrency();
//   const curr = (currency as Currency) || "IDR";
//   const { cartItems } = useCart();
//   const selectedItemIds: number[] = location.state?.selectedIds || [];

//   const [isPageLoading, setIsPageLoading] = useState(true);
//   const [userType, setUserType] = useState<string>("guest");
//   const [catalogProducts, setCatalogProducts] = useState<any[]>([]);
//   const [isCatalogLoaded, setIsCatalogLoaded] = useState(false);

//   const [addresses, setAddresses] = useState<any[]>([]);
//   const defaultPosition: [number, number] = [-6.175392, 106.827153];
//   const [mapPosition, setMapPosition] =
//     useState<[number, number]>(defaultPosition);
//   const [isGettingLocation, setIsGettingLocation] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState<number | null>(null);

//   const [formData, setFormData] = useState({
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

//   const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
//     null,
//   );

//   const getUrlPrefix = () => {
//     if (location.pathname.startsWith("/id")) return "/id";
//     if (location.pathname.startsWith("/en")) return "/en";
//     return "";
//   };
//   const urlPrefix = getUrlPrefix();

//   const [shippingMethod, setShippingMethod] = useState("free");
//   const [selectedRate, setSelectedRate] = useState<any>(null);
//   const [isLoadingRates, setIsLoadingRates] = useState(false);
//   const [rawShippingRates, setRawShippingRates] = useState<any[]>([]);
//   const [deliveryDate, setDeliveryDate] = useState("");
//   const [deliveryTime, setDeliveryTime] = useState("");

//   const [promoInput, setPromoInput] = useState("");
//   const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
//   const [promoDiscountAmount, setPromoDiscountAmount] = useState(0);
//   const [appliedPromoType, setAppliedPromoType] = useState<string | null>(null);
//   const [promoMessage, setPromoMessage] = useState("");
//   const [isVerifyingPromo, setIsVerifyingPromo] = useState(false);
//   const [availablePoints, setAvailablePoints] = useState(0);
//   const [pointsInput, setPointsInput] = useState<number | "">("");
//   const [pointsUsed, setPointsUsed] = useState<number>(0);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

//   const convertIDRtoActiveCurrency = useCallback(
//     (idrAmount: number) => {
//       if (curr === "IDR" || !exchangeRates || !exchangeRates[curr])
//         return { value: idrAmount, curr: "IDR" };
//       return { value: idrAmount * exchangeRates[curr], curr: curr };
//     },
//     [curr, exchangeRates],
//   );

//   const formatCurrencyDisplay = useCallback(
//     (priceObj: { value: number; curr: string } | null) => {
//       if (!priceObj) return "";
//       const symbols: any = {
//         USD: "$",
//         SGD: "S$",
//         EUR: "€",
//         AUD: "A$",
//         MYR: "RM",
//         IDR: "Rp ",
//       };
//       const formatter = new Intl.NumberFormat(
//         priceObj.curr === "IDR" ? "id-ID" : "en-US",
//         {
//           minimumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//           maximumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//         },
//       );
//       return `${symbols[priceObj.curr] || priceObj.curr + " "}${formatter.format(priceObj.value)}`;
//     },
//     [],
//   );

//   const getPriceToDisplay = useCallback(
//     (product: any) => {
//       if (!product) return { value: 0, curr: "IDR" };
//       if (curr === "IDR") return { value: Number(product.price), curr: "IDR" };
//       try {
//         const pricesObj =
//           typeof product.prices === "string"
//             ? JSON.parse(product.prices)
//             : product.prices || {};
//         const dbPrice =
//           pricesObj[curr] ||
//           pricesObj[curr.toLowerCase()] ||
//           pricesObj[curr.toUpperCase()];
//         if (dbPrice) return { value: parseFloat(dbPrice), curr: curr };
//       } catch (e) {
//         console.error(e);
//       }
//       return { value: Number(product.price), curr: "IDR" };
//     },
//     [curr],
//   );

//   const getDiscountToDisplay = useCallback(
//     (product: any) => {
//       if (!product) return null;
//       if (curr === "IDR")
//         return product.discount_price
//           ? { value: Number(product.discount_price), curr: "IDR" }
//           : null;
//       try {
//         const discObj =
//           typeof product.discount_prices === "string"
//             ? JSON.parse(product.discount_prices)
//             : product.discount_prices || {};
//         const dbDisc =
//           discObj[curr] ||
//           discObj[curr.toLowerCase()] ||
//           discObj[curr.toUpperCase()];
//         if (dbDisc) return { value: parseFloat(dbDisc), curr: curr };
//       } catch (e) {
//         console.error(e);
//       }
//       return product.discount_price
//         ? { value: Number(product.discount_price), curr: "IDR" }
//         : null;
//     },
//     [curr],
//   );

//   const getWholesaleToDisplay = useCallback(
//     (product: any) => {
//       if (!product) return null;
//       if (curr === "IDR")
//         return product.wholesale_price
//           ? { value: Number(product.wholesale_price), curr: "IDR" }
//           : null;
//       try {
//         const wholesaleObj =
//           typeof product.wholesale_prices === "string"
//             ? JSON.parse(product.wholesale_prices)
//             : product.wholesale_prices || {};
//         const dbWholesale =
//           wholesaleObj[curr] ||
//           wholesaleObj[curr.toLowerCase()] ||
//           wholesaleObj[curr.toUpperCase()];
//         if (dbWholesale) return { value: parseFloat(dbWholesale), curr: curr };
//       } catch (e) {
//         console.error(e);
//       }
//       return product.wholesale_price
//         ? { value: Number(product.wholesale_price), curr: "IDR" }
//         : null;
//     },
//     [curr],
//   );

//   const getBundleToDisplay = useCallback(
//     (product: any) => {
//       if (!product) return null;
//       if (curr === "IDR")
//         return product.bundle_price > 0
//           ? { value: Number(product.bundle_price), curr: "IDR" }
//           : null;
//       try {
//         const bundleObj =
//           typeof product.bundle_prices === "string"
//             ? JSON.parse(product.bundle_prices)
//             : product.bundle_prices || {};
//         const dbBundle =
//           bundleObj[curr] ||
//           bundleObj[curr.toLowerCase()] ||
//           bundleObj[curr.toUpperCase()];
//         if (dbBundle) return { value: parseFloat(dbBundle), curr: curr };
//       } catch (e) {}
//       return product.bundle_price > 0
//         ? convertIDRtoActiveCurrency(Number(product.bundle_price))
//         : null;
//     },
//     [curr, convertIDRtoActiveCurrency],
//   );

//   const getActivePriceObj = useCallback(
//     (product: any, totalQty: number) => {
//       const isReseller = userType === "reseller";
//       const voucher = Number(product.voucher_discount_price) || 0;
//       if (appliedPromoType === "voucher" && voucher > 0)
//         return { value: voucher, curr: "IDR" };

//       const dynamicPriceObj = getPriceToDisplay(product);
//       const dynamicDiscountObj = getDiscountToDisplay(product);
//       const dynamicWholesaleObj = getWholesaleToDisplay(product);

//       if (
//         isReseller &&
//         dynamicWholesaleObj &&
//         dynamicWholesaleObj.value > 0 &&
//         totalQty >= 24
//       ) {
//         return dynamicWholesaleObj;
//       } else if (
//         dynamicDiscountObj &&
//         dynamicDiscountObj.value > 0 &&
//         dynamicDiscountObj.value < dynamicPriceObj.value
//       ) {
//         return dynamicDiscountObj;
//       }
//       return dynamicPriceObj;
//     },
//     [
//       userType,
//       appliedPromoType,
//       getPriceToDisplay,
//       getDiscountToDisplay,
//       getWholesaleToDisplay,
//     ],
//   );

//   const getFreshProduct = useCallback(
//     (cartProduct: any) => {
//       if (catalogProducts.length > 0 && cartProduct) {
//         const fresh = catalogProducts.find(
//           (p) => p.id === cartProduct.id || p.id === cartProduct.product_id,
//         );
//         if (fresh) return fresh;
//       }
//       return cartProduct;
//     },
//     [catalogProducts],
//   );

//   const checkoutItems = useMemo(() => {
//     let baseItems = cartItems.filter((item) =>
//       selectedItemIds.includes(item.id),
//     );
//     if (catalogProducts.length > 0) {
//       baseItems = baseItems.map((item) => {
//         const fresh = catalogProducts.find((p) => p.id === item.product_id);
//         return fresh ? { ...item, product: fresh } : item;
//       });
//     }
//     return baseItems;
//   }, [cartItems, selectedItemIds, catalogProducts]);

//   const checkoutCount = useMemo(() => {
//     return checkoutItems.reduce((sum, item) => sum + item.quantity, 0);
//   }, [checkoutItems]);

//   // ============================================================================
//   // 👇 LOGIKA HARGA BUNDLE, BN-01, DAN PROMO 17AN DISELESAIKAN 👇
//   // ============================================================================
//   const checkoutData = useMemo(() => {
//     const curr = (currency as Currency) || "IDR";
//     let totalValueDisplay = 0;
//     let totalValueIDR = 0;
//     let appliedBundlesCount = 0;

//     const itemGrossAmounts: { [cartId: number]: number } = {};
//     const isBundledMap: Record<number, boolean> = {};
//     const isEligibleForBundleMap: Record<number, boolean> = {};
//     let hasBundleProduct = false; // Deteksi produk bundle untuk promo 17-an

//     const driversPool: {
//       cartId: number;
//       normalPrice: number;
//       normalIDR: number;
//       bundlePrice: number;
//       bundleIDR: number;
//     }[] = [];
//     const partnersPool: {
//       cartId: number;
//       normalPrice: number;
//       normalIDR: number;
//     }[] = [];

//     const isReseller = userType === "reseller";
//     const isWholesaleGlobal = isReseller && checkoutCount >= 24;

//     // Tahap 1: Inisialisasi dan Pemisahan Kolam
//     checkoutItems.forEach((item) => {
//       const prod = item.product;
//       const qty = item.quantity;
//       itemGrossAmounts[item.id] = 0;
//       isBundledMap[item.id] = false;
//       isEligibleForBundleMap[item.id] = false;

//       const activePriceObj = getActivePriceObj(prod, checkoutCount);
//       let normalPriceDisplay = activePriceObj.value;
//       if (activePriceObj.curr === "IDR" && curr !== "IDR") {
//         normalPriceDisplay = normalPriceDisplay * (exchangeRates?.[curr] || 1);
//       }

//       let normalPriceIDR = Number(prod.price) || 0;
//       const wholesale = Number(prod.wholesale_price) || 0;
//       const discount = Number(prod.discount_price) || 0;
//       const voucher = Number(prod.voucher_discount_price) || 0;

//       if (appliedPromoType === "voucher" && voucher > 0) {
//         normalPriceIDR = voucher;
//       } else if (isWholesaleGlobal && wholesale > 0) {
//         normalPriceIDR = wholesale;
//       } else if (discount > 0 && discount < normalPriceIDR) {
//         normalPriceIDR = discount;
//       }

//       // Grosir mematikan semua logika bundle
//       if (isWholesaleGlobal && wholesale > 0) {
//         itemGrossAmounts[item.id] += normalPriceDisplay * qty;
//         totalValueDisplay += normalPriceDisplay * qty;
//         totalValueIDR += normalPriceIDR * qty;
//         return;
//       }

//       const sku = (prod.sku || "").toUpperCase();
//       const isEGB = sku.startsWith("EGB");

//       // Deteksi Bundle Aktif & Kategori BN-01
//       const rawFlag = prod.is_bundle_active;

//       // 👇 [PERBAIKAN] Mengubah String() dan === agar sesuai tipe TS 👇
//       const isBundleActiveFlag =
//         rawFlag === true ||
//         rawFlag === 1 ||
//         String(rawFlag) === "1" ||
//         String(rawFlag).toLowerCase() === "true";

//       const catCode = String((prod as any).category?.code || "").toUpperCase();
//       const isStandaloneBundle = catCode === "BN-01";

//       const isBundleValid = isBundleActiveFlag || isStandaloneBundle;

//       if (isBundleValid) {
//         hasBundleProduct = true;
//       }

//       let isValidDate = true;
//       if (
//         prod.bundle_end_date &&
//         prod.bundle_end_date !== "0000-00-00 00:00:00"
//       ) {
//         const safeDateStr = prod.bundle_end_date.replace(" ", "T");
//         const d = new Date(safeDateStr);
//         if (!isNaN(d.getTime())) isValidDate = d.getTime() > Date.now();
//       }

//       const bundleObjDisplay = getBundleToDisplay(prod);
//       const bundlePriceIDR = Number(prod.bundle_price) || 0;

//       const isDriver =
//         isEGB &&
//         isBundleValid &&
//         isValidDate &&
//         bundleObjDisplay &&
//         bundleObjDisplay.value > 0;

//       if (isDriver) {
//         isEligibleForBundleMap[item.id] = true;
//         for (let i = 0; i < qty; i++) {
//           driversPool.push({
//             cartId: item.id,
//             normalPrice: normalPriceDisplay,
//             normalIDR: normalPriceIDR,
//             bundlePrice: bundleObjDisplay.value,
//             bundleIDR: bundlePriceIDR,
//           });
//         }
//       } else if (!isEGB && !isStandaloneBundle) {
//         // Hanya produk Non-EGB dan BUKAN BN-01 yang masuk ke Partner Pool
//         isEligibleForBundleMap[item.id] = true;
//         for (let i = 0; i < qty; i++) {
//           partnersPool.push({
//             cartId: item.id,
//             normalPrice: normalPriceDisplay,
//             normalIDR: normalPriceIDR,
//           });
//         }
//       } else {
//         // BN-01 (Standalone Bundle) & EGB mati dibayar dengan harga normal
//         itemGrossAmounts[item.id] += normalPriceDisplay * qty;
//         totalValueDisplay += normalPriceDisplay * qty;
//         totalValueIDR += normalPriceIDR * qty;
//       }
//     });

//     // Tahap 2: Penjodohan (Pairing)
//     driversPool.sort((a, b) => b.bundlePrice - a.bundlePrice);

//     while (driversPool.length > 0 && partnersPool.length > 0) {
//       const driver = driversPool.shift()!;
//       const partner = partnersPool.shift()!;

//       const halfDisplay = driver.bundlePrice / 2;
//       itemGrossAmounts[driver.cartId] += halfDisplay;
//       itemGrossAmounts[partner.cartId] += halfDisplay;

//       isBundledMap[driver.cartId] = true;
//       isBundledMap[partner.cartId] = true;

//       totalValueDisplay += driver.bundlePrice;
//       totalValueIDR += driver.bundleIDR;
//       appliedBundlesCount++;
//     }

//     // Tahap 3: Barang Jomblo (Sisa) kembali ke harga normal
//     driversPool.forEach((d) => {
//       itemGrossAmounts[d.cartId] += d.normalPrice;
//       totalValueDisplay += d.normalPrice;
//       totalValueIDR += d.normalIDR;
//     });

//     partnersPool.forEach((p) => {
//       itemGrossAmounts[p.cartId] += p.normalPrice;
//       totalValueDisplay += p.normalPrice;
//       totalValueIDR += p.normalIDR;
//     });

//     // =========================================================================
//     // LOGIKA EVENT PROMO KEMERDEKAAN 17-18 AGUSTUS 2026
//     // =========================================================================
//     const now = new Date();
//     // const now = new Date("2026-08-17T12:00:00+07:00");
//     const promoStart = new Date("2026-08-17T00:00:00+07:00");
//     const promoEnd = new Date("2026-08-18T23:59:59+07:00");
//     const isMerdekaPromoActive = now >= promoStart && now <= promoEnd;

//     let merdekaDiscountIDR = 0;
//     const freebies: string[] = [];

//     if (isMerdekaPromoActive) {
//       if (totalValueIDR >= 200000) {
//         merdekaDiscountIDR = 17000;
//       }

//       if (totalValueIDR > 500000) {
//         freebies.push("Free Gycora Pouch");
//         freebies.push("Free Random Haircare");
//       } else if (hasBundleProduct) {
//         freebies.push("Free Gycora Pouch");
//       }
//     }

//     // Terapkan potongan harga
//     totalValueIDR -= merdekaDiscountIDR;
//     if (totalValueIDR < 0) totalValueIDR = 0;

//     const merdekaDiscountDisplay =
//       convertIDRtoActiveCurrency(merdekaDiscountIDR).value;
//     totalValueDisplay -= merdekaDiscountDisplay;
//     if (totalValueDisplay < 0) totalValueDisplay = 0;
//     // ==================================================================

//     return {
//       totalObj: { value: totalValueDisplay, curr },
//       totalIDR: totalValueIDR,
//       itemGrossAmounts,
//       isBundledMap,
//       isEligibleForBundleMap,
//       appliedBundlesCount,
//       isMerdekaPromoActive,
//       merdekaDiscountIDR,
//       merdekaDiscountDisplay,
//       freebies,
//       originalTotalIDR: totalValueIDR + merdekaDiscountIDR,
//     };
//   }, [
//     checkoutItems,
//     checkoutCount,
//     curr,
//     getActivePriceObj,
//     getBundleToDisplay,
//     appliedPromoType,
//     exchangeRates,
//     userType,
//     getFreshProduct,
//     convertIDRtoActiveCurrency,
//   ]);
//   // 👆 ======================================================================= 👆

//   const checkoutTotalIDR = checkoutData.totalIDR;
//   const checkoutTotalAmountObj = checkoutData.totalObj;

//   const actualPromoDiscountIDR = useMemo(() => {
//     if (appliedPromoType === "claim") {
//       const productDiscount = Math.floor(checkoutTotalIDR * 0.1);
//       let shippingCost = 0;
//       if (shippingMethod === "biteship" && selectedRate)
//         shippingCost = parseFloat(selectedRate.price);
//       const shippingSubsidy = Math.min(10000, shippingCost);
//       return productDiscount + shippingSubsidy;
//     }
//     return promoDiscountAmount;
//   }, [
//     appliedPromoType,
//     checkoutTotalIDR,
//     shippingMethod,
//     selectedRate,
//     promoDiscountAmount,
//   ]);

//   const actualPromoDiscountObj = convertIDRtoActiveCurrency(
//     actualPromoDiscountIDR,
//   );

//   const maxPointsAllowed = useMemo(() => {
//     const maxUsableAmount = Math.max(
//       0,
//       checkoutTotalIDR - actualPromoDiscountIDR,
//     );
//     return Math.min(availablePoints, Math.floor(maxUsableAmount / 1000));
//   }, [availablePoints, checkoutTotalIDR, actualPromoDiscountIDR]);

//   const appliedPointDiscountIDR = pointsUsed * 1000;
//   const appliedPointDiscountObj = convertIDRtoActiveCurrency(
//     appliedPointDiscountIDR,
//   );

//   const shippingCostIDR = useMemo(() => {
//     return shippingMethod === "biteship" && selectedRate
//       ? parseFloat(selectedRate.price)
//       : 0;
//   }, [shippingMethod, selectedRate]);

//   const shippingCostObj = useMemo(() => {
//     return convertIDRtoActiveCurrency(shippingCostIDR);
//   }, [shippingCostIDR, convertIDRtoActiveCurrency]);

//   const grandTotalObj = useMemo(() => {
//     return {
//       value:
//         checkoutTotalAmountObj.value +
//         shippingCostObj.value -
//         actualPromoDiscountObj.value -
//         appliedPointDiscountObj.value,
//       curr: curr,
//     };
//   }, [
//     checkoutTotalAmountObj,
//     shippingCostObj,
//     actualPromoDiscountObj,
//     appliedPointDiscountObj,
//     curr,
//   ]);

//   const handleGetCurrentLocation = () => {
//     setIsGettingLocation(true);
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const lat = position.coords.latitude;
//           const lng = position.coords.longitude;
//           setMapPosition([lat, lng]);
//           fetchAddressFromCoords(lat, lng);
//           setIsGettingLocation(false);
//         },
//         () => {
//           Swal.fire("Akses Ditolak", t("warn_location_denied"), "warning");
//           setIsGettingLocation(false);
//         },
//       );
//     } else {
//       Swal.fire("Tidak Mendukung", t("warn_location_unsupported"), "error");
//       setIsGettingLocation(false);
//     }
//   };

//   const fetchAddressFromCoords = async (lat: number, lng: number) => {
//     try {
//       const res = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
//       );
//       const data = await res.json();
//       if (data && data.address) {
//         const { address } = data;
//         const newCity = address.city || address.town || address.county || "";
//         const newRegion =
//           address.suburb || address.village || address.neighbourhood || "";
//         const newProvince = address.state || "";
//         const newPostal = address.postcode || "";
//         const roadName = address.road || "";
//         const houseNumber = address.house_number || "";
//         const fullStreet = roadName
//           ? `${roadName} ${houseNumber}`.trim()
//           : data.display_name;

//         setFormData((prev) => ({
//           ...prev,
//           latitude: lat.toString(),
//           longitude: lng.toString(),
//           address_location: fullStreet,
//           city: newCity,
//           province: newProvince,
//           region: newRegion,
//           postal_code: newPostal,
//         }));
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const MapEvents = useCallback(() => {
//     useMapEvents({
//       click(e) {
//         setMapPosition([e.latlng.lat, e.latlng.lng]);
//         fetchAddressFromCoords(e.latlng.lat, e.latlng.lng);
//       },
//     });
//     return null;
//   }, []);

//   const MapCenterUpdater = ({ position }: { position: [number, number] }) => {
//     const map = useMap();
//     useEffect(() => {
//       map.setView(position, map.getZoom());
//     }, [position, map]);
//     return null;
//   };

//   useEffect(() => {
//     if (pointsUsed > maxPointsAllowed) {
//       setPointsUsed(maxPointsAllowed);
//       setPointsInput(maxPointsAllowed > 0 ? maxPointsAllowed : "");
//     }
//   }, [maxPointsAllowed, pointsUsed]);

//   const handleOpenModal = (address: Address | null = null) => {
//     if (address) {
//       setEditingId(address.id);
//       const lat = parseFloat(address.details.latitude);
//       const lng = parseFloat(address.details.longitude);
//       setMapPosition(!isNaN(lat) && !isNaN(lng) ? [lat, lng] : defaultPosition);
//       setFormData({
//         region: address.details.region || "",
//         first_name_address: address.receiver.first_name,
//         last_name_address: address.receiver.last_name,
//         address_location: address.details.address_location,
//         city: address.details.city,
//         province: address.details.province,
//         postal_code: address.details.postal_code,
//         location_type: address.details.type,
//         latitude: address.details.latitude || "",
//         longitude: address.details.longitude || "",
//         is_default: address.is_default,
//       });
//     } else {
//       setEditingId(null);
//       setMapPosition(defaultPosition);
//       setFormData({
//         region: "",
//         first_name_address: "",
//         last_name_address: "",
//         address_location: "",
//         city: "",
//         province: "",
//         postal_code: "",
//         location_type: "home",
//         latitude: "",
//         longitude: "",
//         is_default: false,
//       });
//     }
//     setIsModalOpen(true);
//   };

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
//           const defaultAddr = addrArray.find((a: any) => a.is_default);
//           setSelectedAddressId(defaultAddr ? defaultAddr.id : addrArray[0].id);
//         } else {
//           setSelectedAddressId(null);
//         }
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     const fetchCatalog = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (res.ok) {
//           const data = await res.json();
//           setCatalogProducts(data.data ? data.data : data);
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setIsCatalogLoaded(true);
//       }
//     };
//     fetchCatalog();
//   }, []);

//   useEffect(() => {
//     if (selectedItemIds.length === 0) {
//       navigate(`${urlPrefix}/cart`);
//       return;
//     }
//     const loadData = async () => {
//       const token = localStorage.getItem("user_token");
//       const userStr = localStorage.getItem("user_data");
//       if (!token) {
//         navigate(`${urlPrefix}/login`);
//         return;
//       }
//       if (userStr) {
//         const user = JSON.parse(userStr);
//         setAvailablePoints(user.point || 0);
//         setUserType(user.usertype || "user");
//       }
//       await fetchAddresses(token);

//       const now = new Date();
//       // const now = new Date("2026-08-17T12:00:00+07:00");
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
//           console.error(err);
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
//       .map((rate) => ({ ...rate, is_disabled: false, disable_reason: "" }))
//       .sort((a, b) =>
//         a.is_disabled === b.is_disabled ? 0 : a.is_disabled ? 1 : -1,
//       );
//   }, [rawShippingRates]);

//   const applyPromo = async (e: any) => {
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
//       if (checkoutTotalIDR < 50000)
//         throw new Error("Minimum belanja Rp 50.000");

//       setAppliedPromoCode(promoInput.toUpperCase());
//       setAppliedPromoType(data.promo_type);

//       if (data.promo_type === "claim") {
//         setPromoDiscountAmount(0);
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

//   const handleApplyPoints = (e: any) => {
//     e.preventDefault();
//     const ptsToUse = Number(pointsInput);
//     if (ptsToUse > availablePoints)
//       return Swal.fire(
//         "Peringatan",
//         `Anda hanya memiliki ${availablePoints} poin.`,
//         "warning",
//       );
//     if (ptsToUse > maxPointsAllowed) {
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
//         promo_type: appliedPromoType,
//         currency: curr,
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
//         (window as any).dataLayer = (window as any).dataLayer || [];
//         (window as any).dataLayer.push({
//           event: "add_payment_info",
//           ecommerce: {
//             currency: grandTotalObj.curr,
//             value: grandTotalObj.value,
//             items: checkoutItems.map((item: any) => {
//               const freshProd = getFreshProduct(item.product);
//               const calculatedGross = checkoutData.itemGrossAmounts[item.id];
//               const unitPrice =
//                 calculatedGross !== undefined
//                   ? calculatedGross / item.quantity
//                   : getActivePriceObj(freshProd, checkoutCount).value;
//               return {
//                 item_id: freshProd.id,
//                 item_name: freshProd.name,
//                 price: unitPrice,
//                 quantity: item.quantity,
//               };
//             }),
//           },
//         });
//         window.location.href = data.checkout_url;
//       } else {
//         throw new Error(data.message || "Gagal membuat tagihan");
//       }
//     } catch (err: any) {
//       Swal.fire("Error", err.message, "error");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleImageError = (company: string) => {
//     setImageErrors((prev) => ({ ...prev, [company]: true }));
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

//   const handleSubmitAddress = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.latitude || !formData.longitude)
//       return Swal.fire(t("notification"), t("warn_select_location"), "warning");
//     const token = localStorage.getItem("user_token");
//     const method = editingId ? "PUT" : "POST";
//     const url = editingId
//       ? `${BASE_URL}/api/addresses/${editingId}`
//       : `${BASE_URL}/api/addresses`;
//     try {
//       const res = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });
//       if (res.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Berhasil!",
//           text: editingId
//             ? t("toast_address_updated")
//             : t("toast_address_added"),
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         setIsModalOpen(false);
//         fetchAddresses(token!);
//       } else {
//         throw new Error("Gagal menyimpan alamat");
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire(t("error"), t("server_error"), "error");
//     }
//   };

//   const isButtonDisabled =
//     isProcessing ||
//     checkoutItems.length === 0 ||
//     !selectedAddressId ||
//     (shippingMethod === "biteship" && !selectedRate);

//   if (isPageLoading || !isCatalogLoaded) {
//     return (
//       <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
//         <div className="flex gap-2 mb-4">
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-1"></div>
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-2"></div>
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-3"></div>
//         </div>
//         <p className="font-serif text-sm italic tracking-widest text-gray-500 animate-pulse">
//           {t("pay_loading_checkout")}
//         </p>
//       </div>
//     );
//   }

//   if (checkoutItems.length === 0) {
//     return (
//       <div className="min-h-screen px-6 py-12 mx-auto font-sans md:py-24 max-w-[1440px] animate-fade-in">
//         <div className="py-20 text-center">
//           <h2 className="mb-4 text-3xl font-extrabold text-gray-900">
//             {t("pay_empty_items")}
//           </h2>
//           <button
//             onClick={() => navigate(`${urlPrefix}/cart`)}
//             className="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase rounded-full bg-gycora hover:bg-gycora-dark"
//           >
//             {t("pay_btn_back_cart")}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen px-6 py-12 mx-auto font-sans md:py-24 max-w-[1440px] animate-fade-in relative">
//       <h1 className="mb-12 text-3xl font-extrabold tracking-tighter text-gray-900 uppercase md:text-4xl">
//         {t("pay_checkout_title")}
//       </h1>

//       <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
//         <div className="flex-grow space-y-12">
//           {/* BAGIAN ALAMAT */}
//           <section>
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-4">
//                 <span className="flex items-center justify-center w-6 h-6 text-[10px] font-bold text-white rounded-full bg-gycora">
//                   1
//                 </span>
//                 <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">
//                   {t("pay_shipping_address")}
//                 </h2>
//               </div>
//               {addresses.length > 0 && (
//                 <button
//                   onClick={() => handleOpenModal()}
//                   className="text-xs font-bold transition-colors text-emerald-600 hover:text-emerald-800"
//                 >
//                   {t("pay_add_address")}
//                 </button>
//               )}
//             </div>

//             {addresses.length === 0 ? (
//               <div className="py-10 text-center border border-gray-300 border-dashed bg-gray-50 rounded-2xl">
//                 <p className="mb-2 text-sm italic text-gray-500">
//                   {t("pay_no_address")}
//                 </p>
//                 <button
//                   onClick={() => handleOpenModal()}
//                   className="px-6 py-2 mt-2 text-xs font-bold tracking-widest text-white uppercase transition-colors rounded-full shadow-md bg-gycora hover:bg-gycora-dark"
//                 >
//                   {t("pay_new_address")}
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
//                             {t("main_address")}
//                           </span>
//                         )}
//                       </div>
//                       <p className="mt-2 text-sm leading-relaxed text-gray-600">
//                         {addr.details.address_location} - {addr.details.type}{" "}
//                         <br /> {addr.details.city}, {addr.details.province}{" "}
//                         <br /> {addr.details.region} -{" "}
//                         {addr.details.postal_code}
//                       </p>
//                     </div>
//                   </label>
//                 ))}
//               </div>
//             )}
//           </section>

//           {/* BAGIAN KURIR */}
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
//                 {t("pay_shipping_method")}
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
//                       {t("pay_method_pickup")}
//                     </p>
//                     <p className="mt-1 text-xs font-bold text-emerald-600">
//                       {t("pay_method_pickup_desc")}
//                     </p>
//                   </div>
//                   <p className="font-black text-gycora">
//                     {t("pay_method_free")}
//                   </p>
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
//                       {t("pay_method_courier")}
//                     </p>
//                     <p className="mt-1 text-xs text-gray-500">
//                       {t("pay_method_courier_desc")}
//                     </p>
//                   </div>
//                 </div>
//               </label>

//               {shippingMethod === "biteship" && (
//                 <div className="p-6 mt-4 space-y-8 bg-white border border-gray-200 rounded-3xl animate-fade-in">
//                   <h3 className="pt-2 text-sm font-bold tracking-widest text-gray-900 uppercase border-t border-gray-100">
//                     {t("pay_choose_courier")}
//                   </h3>
//                   {isLoadingRates ? (
//                     <p className="py-4 text-sm text-center text-gray-500 animate-pulse">
//                       {t("pay_calc_shipping")}
//                     </p>
//                   ) : processedShippingRates.length === 0 ? (
//                     <p className="py-4 text-xs italic text-center text-red-500">
//                       {t("pay_no_courier")}
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
//                               {formatCurrencyDisplay(
//                                 convertIDRtoActiveCurrency(rate.price),
//                               )}
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
//               {t("pay_order_summary")}
//             </h2>

//             {/* 👇 DYNAMIC UPSELL BANNER (MERDEKA) 👇 */}
//             {checkoutData.isMerdekaPromoActive &&
//               checkoutData.originalTotalIDR > 0 &&
//               checkoutData.originalTotalIDR < 500000 && (
//                 <div className="p-3 mb-4 text-xs font-medium text-center text-red-700 bg-red-100 border border-red-200 rounded-xl">
//                   Tambah{" "}
//                   <span className="font-bold text-red-600">
//                     {formatCurrencyDisplay(
//                       convertIDRtoActiveCurrency(
//                         500000 - checkoutData.originalTotalIDR,
//                       ),
//                     )}
//                   </span>{" "}
//                   lagi untuk dapat{" "}
//                   <strong>Free Pouch + Random Haircare!</strong> 🇮🇩
//                 </div>
//               )}

//             {/* 👇 VISUALISASI HADIAH KEMERDEKAAN 👇 */}
//             {checkoutData.freebies.length > 0 && (
//               <div className="flex flex-col gap-2 p-4 mb-4 border border-red-200 bg-red-50 rounded-2xl">
//                 <div className="flex items-center gap-2">
//                   <span className="text-base">🎁</span>
//                   <span className="text-xs font-extrabold tracking-wide text-red-700 uppercase">
//                     Hadiah Kemerdekaan!
//                   </span>
//                 </div>
//                 <ul className="pl-6 space-y-1 text-xs font-bold text-red-600 list-disc">
//                   {checkoutData.freebies.map((f: string, i: number) => (
//                     <li key={i}>{f}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {checkoutData.appliedBundlesCount > 0 && (
//               <div className="flex items-center justify-between p-3 mb-6 border border-purple-200 rounded-xl bg-purple-50">
//                 <span className="text-[10px] font-extrabold tracking-wide text-purple-800 uppercase">
//                   {t("bundle_promo_active")}
//                 </span>
//                 <span className="text-xs font-black text-purple-700">
//                   {checkoutData.appliedBundlesCount} {t("bundle")}
//                 </span>
//               </div>
//             )}

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
//                 } catch (error) {
//                   if (Array.isArray(item.product.color)) {
//                     const matched = item.product.color.find(
//                       (c: any) =>
//                         (typeof c === "object" &&
//                           c !== null &&
//                           c.hex === item.color) ||
//                         c === item.color,
//                     );
//                     if (
//                       matched &&
//                       typeof matched === "object" &&
//                       matched !== null
//                     )
//                       colorName = (matched as { name?: string }).name || "";
//                   }
//                 }

//                 const freshProd = getFreshProduct(item.product);
//                 const activePriceObj = getActivePriceObj(
//                   freshProd,
//                   checkoutCount,
//                 );
//                 const basePriceObj = getPriceToDisplay(freshProd);
//                 const isDiscounted = activePriceObj.value < basePriceObj.value;

//                 const isWholesaleActive =
//                   userType === "reseller" &&
//                   Number(freshProd.wholesale_price) > 0 &&
//                   checkoutCount >= 24;
//                 const isBundled = checkoutData.isBundledMap[item.id];

//                 const catCode = String(
//                   freshProd.category?.code || "",
//                 ).toUpperCase();
//                 const isStandaloneBundle = catCode === "BN-01";

//                 const calculatedGross = checkoutData.itemGrossAmounts[item.id];

//                 const currentGrossAmountObj = {
//                   value:
//                     calculatedGross !== undefined
//                       ? calculatedGross
//                       : activePriceObj.value * item.quantity,
//                   curr: checkoutData.totalObj.curr,
//                 };
//                 const originalGrossAmountObj = {
//                   value: basePriceObj.value * item.quantity,
//                   curr: basePriceObj.curr,
//                 };

//                 return (
//                   <div key={item.id} className="flex gap-4">
//                     <img
//                       src={freshProd.image_url}
//                       alt={freshProd.name}
//                       className="object-cover w-16 h-16 bg-white border border-gray-100 rounded-xl shrink-0"
//                     />
//                     <div className="flex-grow min-w-0">
//                       <div className="flex items-center gap-2">
//                         <p
//                           className="w-40 text-[11px] font-bold text-gray-900 uppercase truncate"
//                           title={freshProd.name}
//                         >
//                           {freshProd.name}
//                         </p>
//                         {isWholesaleActive && (
//                           <span className="px-1.5 py-0.5 text-[8px] font-bold text-white bg-blue-600 rounded shrink-0">
//                             GROSIR
//                           </span>
//                         )}
//                         {(isBundled || isStandaloneBundle) && (
//                           <span className="px-1.5 py-0.5 text-[8px] font-bold text-purple-600 bg-purple-100 rounded uppercase shrink-0">
//                             Bundle
//                           </span>
//                         )}
//                       </div>

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
//                               ></div>
//                               {colorName && (
//                                 <span className="text-[10px] font-bold text-gray-500 uppercase truncate max-w-[80px]">
//                                   {colorName}
//                                 </span>
//                               )}
//                             </div>
//                           </>
//                         )}
//                       </div>

//                       <p
//                         className={`mt-1 text-xs font-medium ${isBundled || isStandaloneBundle ? "text-purple-600" : isWholesaleActive ? "text-blue-600" : "text-gycora"}`}
//                       >
//                         {formatCurrencyDisplay(currentGrossAmountObj)}{" "}
//                         {isDiscounted && !isBundled && !isStandaloneBundle && (
//                           <span className="text-[9px] line-through text-gray-400 ml-1">
//                             {formatCurrencyDisplay(originalGrossAmountObj)}
//                           </span>
//                         )}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="pt-4 space-y-3 text-sm border-t border-gray-200">
//               <div className="flex justify-between text-gray-500">
//                 <span>{t("pay_total_items")}</span>
//                 <span className="font-bold text-gray-900">
//                   {checkoutCount} items
//                 </span>
//               </div>
//               <div className="flex justify-between text-gray-500">
//                 <span>{t("pay_product_subtotal")}</span>
//                 <span
//                   className={
//                     appliedPromoType === "voucher"
//                       ? "text-amber-600 font-bold"
//                       : ""
//                   }
//                 >
//                   {formatCurrencyDisplay(checkoutData.totalObj)}
//                 </span>
//               </div>

//               {/* 👇 BARIS DISKON MERDEKA 👇 */}
//               {checkoutData.merdekaDiscountDisplay > 0 && (
//                 <div className="flex justify-between text-sm font-bold text-red-600">
//                   <span>Merdeka Sale 🇮🇩</span>
//                   <span>
//                     -{" "}
//                     {formatCurrencyDisplay({
//                       value: checkoutData.merdekaDiscountDisplay,
//                       curr: checkoutData.totalObj.curr,
//                     })}
//                   </span>
//                 </div>
//               )}

//               {/* Promo Code */}
//               <div className="pt-4 mt-2 border-t border-gray-200 border-dashed">
//                 <label className="block mb-2 text-[10px] font-bold tracking-widest text-gray-900 uppercase">
//                   {t("pay_promo_label")}
//                 </label>
//                 <form onSubmit={applyPromo} className="flex gap-2">
//                   <input
//                     type="text"
//                     value={promoInput}
//                     onChange={(e) => setPromoInput(e.target.value)}
//                     disabled={!!appliedPromoCode || isVerifyingPromo}
//                     placeholder={t("pay_promo_placeholder")}
//                     className="flex-1 px-3 py-2 text-sm uppercase bg-white border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-gycora disabled:bg-gray-100"
//                   />
//                   {!appliedPromoCode ? (
//                     <button
//                       type="submit"
//                       disabled={!promoInput || isVerifyingPromo}
//                       className="flex items-center justify-center w-20 px-4 text-[10px] font-bold text-white uppercase transition rounded-lg bg-gycora hover:bg-gycora-dark disabled:bg-gray-300"
//                     >
//                       {isVerifyingPromo ? "..." : t("pay_btn_apply")}
//                     </button>
//                   ) : (
//                     <button
//                       type="button"
//                       onClick={removePromo}
//                       className="w-20 px-4 text-[10px] font-bold text-red-600 uppercase transition border border-red-200 rounded-lg bg-red-50 hover:bg-red-100"
//                     >
//                       {t("pay_btn_remove")}
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
//                 {appliedPromoCode && (
//                   <div className="flex justify-between text-[10px] md:text-xs font-medium text-emerald-600 mt-2">
//                     <span className="pr-2 truncate">
//                       Promo (
//                       <span className="font-mono uppercase">
//                         {appliedPromoCode}
//                       </span>
//                       )
//                     </span>
//                     <span>
//                       - {formatCurrencyDisplay(actualPromoDiscountObj)}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {/* Loyalty Points */}
//               <div className="pt-4 mt-2 border-t border-gray-200 border-dashed">
//                 <div className="flex items-center justify-between mb-3">
//                   <label className="text-[10px] font-bold tracking-widest text-gray-900 uppercase">
//                     {t("pay_loyalty_points")}
//                   </label>
//                   <span className="text-xs text-gray-500">
//                     {t("pay_balance")}{" "}
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
//                       {t("pay_btn_use")}
//                     </button>
//                   ) : (
//                     <button
//                       type="button"
//                       onClick={handleRemovePoints}
//                       className="w-24 px-4 text-[10px] font-bold text-red-600 uppercase transition border border-red-200 rounded-lg bg-red-50 hover:bg-red-100"
//                     >
//                       {t("pay_btn_cancel")}
//                     </button>
//                   )}
//                 </form>
//                 {pointsUsed > 0 && (
//                   <div className="flex items-center justify-between mt-3 animate-fade-in">
//                     <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
//                       {t("pay_points_applied")} ({pointsUsed} Pts)
//                     </span>
//                     <span className="text-[11px] font-medium text-emerald-600">
//                       - {formatCurrencyDisplay(appliedPointDiscountObj)}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {/* TAMPILAN ONGKOS KIRIM */}
//               <div className="flex items-start justify-between pt-4 mt-2 text-gray-500 border-t border-gray-200 border-dashed">
//                 <span>{t("pay_shipping_cost")}</span>
//                 {shippingMethod === "free" ? (
//                   <span className="font-bold text-emerald-600">
//                     {t("pay_method_pickup")}
//                   </span>
//                 ) : shippingMethod === "biteship" && selectedRate ? (
//                   <div className="text-right">
//                     <span className="block font-medium text-gray-900">
//                       {formatCurrencyDisplay({
//                         value: parseFloat(selectedRate.price),
//                         curr: "IDR",
//                       })}
//                     </span>
//                     <p className="mt-1 text-[10px] text-gray-400">
//                       Flat Rate (Semua Item)
//                     </p>
//                   </div>
//                 ) : (
//                   <span className="text-[10px] italic">
//                     {t("choose_method")}
//                   </span>
//                 )}
//               </div>

//               <div className="flex justify-between pt-4 font-bold text-gray-900 border-t border-gray-200">
//                 <span className="mt-1 text-xs tracking-widest uppercase">
//                   {t("pay_grand_total")}
//                 </span>
//                 <span className="text-xl text-gycora">
//                   {formatCurrencyDisplay(grandTotalObj)}
//                 </span>
//               </div>

//               <button
//                 onClick={handlePayment}
//                 disabled={isButtonDisabled}
//                 className="flex items-center justify-center w-full gap-3 py-4 mt-8 text-xs font-bold tracking-[0.3em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/10"
//               >
//                 {!isProcessing ? t("pay_btn_pay_now") : t("pay_btn_processing")}
//               </button>

//               {!selectedAddressId && (
//                 <p className="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase">
//                   {t("pay_alert_no_address")}
//                 </p>
//               )}
//               {shippingMethod === "biteship" && !selectedRate && (
//                 <p className="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase">
//                   {t("pay_alert_no_courier")}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* --- MODAL FORM ALAMAT DENGAN PETA --- */}
//         {isModalOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-10 pb-10 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fade-in-up">
//             <div className="flex flex-col w-full max-w-5xl my-auto overflow-hidden bg-white shadow-2xl rounded-3xl">
//               <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50 shrink-0">
//                 <h3 className="text-xl font-extrabold tracking-tight text-gray-900">
//                   {editingId
//                     ? t("modal_edit_address_title")
//                     : t("modal_add_address_title")}
//                 </h3>
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="p-2 text-gray-400 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100"
//                 >
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
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
//               <div className="flex flex-col md:flex-row h-auto md:h-[650px] overflow-hidden">
//                 {/* BAGIAN PETA (KIRI) */}
//                 <div className="relative w-full bg-gray-100 border-b border-gray-200 h-72 md:h-full md:w-5/12 md:border-b-0 md:border-r shrink-0">
//                   <MapContainer
//                     center={mapPosition}
//                     zoom={15}
//                     style={{ height: "100%", width: "100%" }}
//                     scrollWheelZoom={true}
//                   >
//                     <TileLayer
//                       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//                       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     />
//                     <Marker position={mapPosition}>
//                       <Popup>{t("popup_selected_location")}</Popup>
//                     </Marker>
//                     <MapEvents />
//                     <MapCenterUpdater position={mapPosition} />
//                   </MapContainer>
//                   <button
//                     type="button"
//                     onClick={handleGetCurrentLocation}
//                     disabled={isGettingLocation}
//                     className="absolute z-[1000] bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:-translate-x-0 md:right-6 flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-full shadow-xl font-bold text-xs hover:bg-gray-50 border border-gray-200 transition-all hover:-translate-y-0.5"
//                   >
//                     {isGettingLocation ? (
//                       <span className="w-4 h-4 border-2 rounded-full border-[#006A4E] border-t-transparent animate-spin"></span>
//                     ) : (
//                       <svg
//                         className="w-4 h-4 text-[#006A4E]"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                         />
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                         />
//                       </svg>
//                     )}
//                     {t("btn_use_current_location")}
//                   </button>
//                 </div>

//                 {/* BAGIAN FORM (KANAN) */}
//                 <form
//                   onSubmit={handleSubmitAddress}
//                   className="flex flex-col flex-1 p-6 space-y-6 overflow-y-auto bg-white sm:p-8 custom-scrollbar"
//                 >
//                   <div className="flex gap-3 p-4 border border-blue-100 rounded-2xl bg-blue-50/50">
//                     <svg
//                       className="w-5 h-5 text-blue-500 shrink-0"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                       />
//                     </svg>
//                     <p className="text-xs leading-relaxed text-blue-800">
//                       {t("guide_map_text")}
//                     </p>
//                   </div>
//                   <div className="space-y-5">
//                     <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//                       <div>
//                         <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
//                           {t("label_first_name")}
//                         </label>
//                         <input
//                           type="text"
//                           required
//                           value={formData.first_name_address}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               first_name_address: e.target.value,
//                             })
//                           }
//                           className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
//                         />
//                       </div>
//                       <div>
//                         <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
//                           {t("label_last_name")}
//                         </label>
//                         <input
//                           type="text"
//                           required
//                           value={formData.last_name_address}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               last_name_address: e.target.value,
//                             })
//                           }
//                           className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
//                         {t("label_address_type")}
//                       </label>
//                       <select
//                         value={formData.location_type}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             location_type: e.target.value,
//                           })
//                         }
//                         className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none bg-white transition-all"
//                       >
//                         <option value="home">{t("option_home")}</option>
//                         <option value="office">{t("option_office")}</option>
//                         <option value="other">{t("option_other")}</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
//                         {t("label_full_address")}
//                       </label>
//                       <textarea
//                         required
//                         rows={3}
//                         placeholder={t("placeholder_full_address")}
//                         value={formData.address_location}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             address_location: e.target.value,
//                           })
//                         }
//                         className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none resize-none bg-white transition-all"
//                       ></textarea>
//                     </div>
//                     <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//                       <div>
//                         <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
//                           {t("label_region")}
//                         </label>
//                         <input
//                           type="text"
//                           required
//                           value={formData.region}
//                           onChange={(e) =>
//                             setFormData({ ...formData, region: e.target.value })
//                           }
//                           className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
//                         />
//                       </div>
//                       <div>
//                         <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
//                           {t("label_city")}
//                         </label>
//                         <input
//                           type="text"
//                           required
//                           value={formData.city}
//                           onChange={(e) =>
//                             setFormData({ ...formData, city: e.target.value })
//                           }
//                           className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
//                         />
//                       </div>
//                       <div>
//                         <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
//                           {t("label_province")}
//                         </label>
//                         <input
//                           type="text"
//                           required
//                           value={formData.province}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               province: e.target.value,
//                             })
//                           }
//                           className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
//                         />
//                       </div>
//                       <div>
//                         <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
//                           {t("label_postal_code")}
//                         </label>
//                         <input
//                           type="text"
//                           required
//                           value={formData.postal_code}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               postal_code: e.target.value,
//                             })
//                           }
//                           className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
//                         />
//                       </div>
//                     </div>
//                     <input type="hidden" value={formData.latitude} />
//                     <input type="hidden" value={formData.longitude} />
//                     <div
//                       className="flex items-center gap-3 p-4 mt-2 transition-colors border border-gray-200 cursor-pointer rounded-xl bg-gray-50 hover:bg-gray-100"
//                       onClick={() =>
//                         setFormData({
//                           ...formData,
//                           is_default: !formData.is_default,
//                         })
//                       }
//                     >
//                       <input
//                         type="checkbox"
//                         id="is_default"
//                         checked={formData.is_default}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             is_default: e.target.checked,
//                           })
//                         }
//                         className="w-5 h-5 rounded cursor-pointer text-[#006A4E] focus:ring-[#006A4E] accent-[#006A4E]"
//                         onClick={(e) => e.stopPropagation()}
//                       />
//                       <label
//                         htmlFor="is_default"
//                         className="text-sm font-bold text-gray-800 cursor-pointer select-none"
//                         onClick={(e) => e.stopPropagation()}
//                       >
//                         {t("label_set_default_address")}
//                       </label>
//                     </div>
//                   </div>
//                   <div className="flex justify-end gap-3 pt-6 mt-auto border-t border-gray-100">
//                     <button
//                       type="button"
//                       onClick={() => setIsModalOpen(false)}
//                       className="px-6 py-3 text-sm font-bold text-gray-600 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200"
//                     >
//                       {t("btn_cancel")}
//                     </button>
//                     <button
//                       type="submit"
//                       className="px-6 py-3 text-sm font-bold text-white transition-all shadow-md bg-[#006A4E] rounded-xl hover:bg-emerald-900 hover:shadow-lg"
//                     >
//                       {editingId
//                         ? t("btn_update_address")
//                         : t("btn_save_address")}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// /* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable no-empty */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { useState, useEffect, useMemo, useCallback } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../context/CartContext";
// import { BASE_URL } from "../../config/api";
// import { useLanguage } from "../../context/LanguageContext";
// import { useCurrency } from "../../context/CurrencyContext";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMapEvents,
//   useMap,
// } from "react-leaflet";

// interface Address {
//   id: number;
//   receiver: { first_name: string; last_name: string; full_name: string };
//   details: {
//     region: string;
//     address_location: string;
//     type: string;
//     city: string;
//     province: string;
//     postal_code: string;
//     latitude: string;
//     longitude: string;
//   };
//   is_default: boolean;
// }

// // 👇 [BARU] Interface untuk Promo Dinamis dari Backend 👇
// interface PromoRuleTier {
//   min_purchase: number;
//   discount_nominal?: number;
//   freebies?: string[];
// }
// interface PromoRules {
//   tiers?: PromoRuleTier[];
//   bundle_reward?: { freebies?: string[] };
// }
// interface DynamicPromo {
//   name: string;
//   banner_badge: string | null;
//   rules: PromoRules | string;
//   end_date: string;
// }
// // 👆 ================================================= 👆

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

// export default function PaymentPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { t } = useLanguage();

//   const { currency, exchangeRates } = useCurrency();
//   const curr = (currency as Currency) || "IDR";
//   const { cartItems } = useCart();
//   const selectedItemIds: number[] = location.state?.selectedIds || [];

//   const [isPageLoading, setIsPageLoading] = useState(true);
//   const [userType, setUserType] = useState<string>("guest");
//   const [catalogProducts, setCatalogProducts] = useState<any[]>([]);
//   const [isCatalogLoaded, setIsCatalogLoaded] = useState(false);

//   // 👇 [BARU] State untuk menyimpan Promo Aktif 👇
//   const [activePromos, setActivePromos] = useState<DynamicPromo[]>([]);

//   const [addresses, setAddresses] = useState<any[]>([]);
//   const defaultPosition: [number, number] = [-6.175392, 106.827153];
//   const [mapPosition, setMapPosition] =
//     useState<[number, number]>(defaultPosition);
//   const [isGettingLocation, setIsGettingLocation] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState<number | null>(null);

//   const [formData, setFormData] = useState({
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

//   const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
//     null,
//   );

//   const getUrlPrefix = () => {
//     if (location.pathname.startsWith("/id")) return "/id";
//     if (location.pathname.startsWith("/en")) return "/en";
//     return "";
//   };
//   const urlPrefix = getUrlPrefix();

//   const [shippingMethod, setShippingMethod] = useState("free");
//   const [selectedRate, setSelectedRate] = useState<any>(null);
//   const [isLoadingRates, setIsLoadingRates] = useState(false);
//   const [rawShippingRates, setRawShippingRates] = useState<any[]>([]);
//   const [deliveryDate, setDeliveryDate] = useState("");
//   const [deliveryTime, setDeliveryTime] = useState("");

//   const [promoInput, setPromoInput] = useState("");
//   const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
//   const [promoDiscountAmount, setPromoDiscountAmount] = useState(0);
//   const [appliedPromoType, setAppliedPromoType] = useState<string | null>(null);
//   const [promoMessage, setPromoMessage] = useState("");
//   const [isVerifyingPromo, setIsVerifyingPromo] = useState(false);
//   const [availablePoints, setAvailablePoints] = useState(0);
//   const [pointsInput, setPointsInput] = useState<number | "">("");
//   const [pointsUsed, setPointsUsed] = useState<number>(0);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

//   // 👇 [BARU] Fetch Promo Aktif dari Backend 👇
//   useEffect(() => {
//     const fetchPromos = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/promos/active`);
//         if (res.ok) {
//           const data = await res.json();
//           setActivePromos(data);
//         }
//       } catch (error) {
//         console.error("Gagal memuat promo aktif:", error);
//       }
//     };
//     fetchPromos();
//   }, []);

//   const convertIDRtoActiveCurrency = useCallback(
//     (idrAmount: number) => {
//       if (curr === "IDR" || !exchangeRates || !exchangeRates[curr])
//         return { value: idrAmount, curr: "IDR" };
//       return { value: idrAmount * exchangeRates[curr], curr: curr };
//     },
//     [curr, exchangeRates],
//   );

//   const formatCurrencyDisplay = useCallback(
//     (priceObj: { value: number; curr: string } | null) => {
//       if (!priceObj) return "";
//       const symbols: any = {
//         USD: "$",
//         SGD: "S$",
//         EUR: "€",
//         AUD: "A$",
//         MYR: "RM",
//         IDR: "Rp ",
//       };
//       const formatter = new Intl.NumberFormat(
//         priceObj.curr === "IDR" ? "id-ID" : "en-US",
//         {
//           minimumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//           maximumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//         },
//       );
//       return `${symbols[priceObj.curr] || priceObj.curr + " "}${formatter.format(priceObj.value)}`;
//     },
//     [],
//   );

//   const getPriceToDisplay = useCallback(
//     (product: any) => {
//       if (!product) return { value: 0, curr: "IDR" };
//       if (curr === "IDR") return { value: Number(product.price), curr: "IDR" };
//       try {
//         const pricesObj =
//           typeof product.prices === "string"
//             ? JSON.parse(product.prices)
//             : product.prices || {};
//         const dbPrice =
//           pricesObj[curr] ||
//           pricesObj[curr.toLowerCase()] ||
//           pricesObj[curr.toUpperCase()];
//         if (dbPrice) return { value: parseFloat(dbPrice), curr: curr };
//       } catch (e) {
//         console.error(e);
//       }
//       return { value: Number(product.price), curr: "IDR" };
//     },
//     [curr],
//   );

//   const getDiscountToDisplay = useCallback(
//     (product: any) => {
//       if (!product) return null;
//       if (curr === "IDR")
//         return product.discount_price
//           ? { value: Number(product.discount_price), curr: "IDR" }
//           : null;
//       try {
//         const discObj =
//           typeof product.discount_prices === "string"
//             ? JSON.parse(product.discount_prices)
//             : product.discount_prices || {};
//         const dbDisc =
//           discObj[curr] ||
//           discObj[curr.toLowerCase()] ||
//           discObj[curr.toUpperCase()];
//         if (dbDisc) return { value: parseFloat(dbDisc), curr: curr };
//       } catch (e) {
//         console.error(e);
//       }
//       return product.discount_price
//         ? { value: Number(product.discount_price), curr: "IDR" }
//         : null;
//     },
//     [curr],
//   );

//   const getWholesaleToDisplay = useCallback(
//     (product: any) => {
//       if (!product) return null;
//       if (curr === "IDR")
//         return product.wholesale_price
//           ? { value: Number(product.wholesale_price), curr: "IDR" }
//           : null;
//       try {
//         const wholesaleObj =
//           typeof product.wholesale_prices === "string"
//             ? JSON.parse(product.wholesale_prices)
//             : product.wholesale_prices || {};
//         const dbWholesale =
//           wholesaleObj[curr] ||
//           wholesaleObj[curr.toLowerCase()] ||
//           wholesaleObj[curr.toUpperCase()];
//         if (dbWholesale) return { value: parseFloat(dbWholesale), curr: curr };
//       } catch (e) {
//         console.error(e);
//       }
//       return product.wholesale_price
//         ? { value: Number(product.wholesale_price), curr: "IDR" }
//         : null;
//     },
//     [curr],
//   );

//   const getBundleToDisplay = useCallback(
//     (product: any) => {
//       if (!product) return null;
//       if (curr === "IDR")
//         return product.bundle_price > 0
//           ? { value: Number(product.bundle_price), curr: "IDR" }
//           : null;
//       try {
//         const bundleObj =
//           typeof product.bundle_prices === "string"
//             ? JSON.parse(product.bundle_prices)
//             : product.bundle_prices || {};
//         const dbBundle =
//           bundleObj[curr] ||
//           bundleObj[curr.toLowerCase()] ||
//           bundleObj[curr.toUpperCase()];
//         if (dbBundle) return { value: parseFloat(dbBundle), curr: curr };
//       } catch (e) {}
//       return product.bundle_price > 0
//         ? convertIDRtoActiveCurrency(Number(product.bundle_price))
//         : null;
//     },
//     [curr, convertIDRtoActiveCurrency],
//   );

//   const getActivePriceObj = useCallback(
//     (product: any, totalQty: number) => {
//       const isReseller = userType === "reseller";
//       const voucher = Number(product.voucher_discount_price) || 0;
//       if (appliedPromoType === "voucher" && voucher > 0)
//         return { value: voucher, curr: "IDR" };

//       const dynamicPriceObj = getPriceToDisplay(product);
//       const dynamicDiscountObj = getDiscountToDisplay(product);
//       const dynamicWholesaleObj = getWholesaleToDisplay(product);

//       if (
//         isReseller &&
//         dynamicWholesaleObj &&
//         dynamicWholesaleObj.value > 0 &&
//         totalQty >= 24
//       ) {
//         return dynamicWholesaleObj;
//       } else if (
//         dynamicDiscountObj &&
//         dynamicDiscountObj.value > 0 &&
//         dynamicDiscountObj.value < dynamicPriceObj.value
//       ) {
//         return dynamicDiscountObj;
//       }
//       return dynamicPriceObj;
//     },
//     [
//       userType,
//       appliedPromoType,
//       getPriceToDisplay,
//       getDiscountToDisplay,
//       getWholesaleToDisplay,
//     ],
//   );

//   const getFreshProduct = useCallback(
//     (cartProduct: any) => {
//       if (catalogProducts.length > 0 && cartProduct) {
//         const fresh = catalogProducts.find(
//           (p) => p.id === cartProduct.id || p.id === cartProduct.product_id,
//         );
//         if (fresh) return fresh;
//       }
//       return cartProduct;
//     },
//     [catalogProducts],
//   );

//   const checkoutItems = useMemo(() => {
//     let baseItems = cartItems.filter((item) =>
//       selectedItemIds.includes(item.id),
//     );
//     if (catalogProducts.length > 0) {
//       baseItems = baseItems.map((item) => {
//         const fresh = catalogProducts.find((p) => p.id === item.product_id);
//         return fresh ? { ...item, product: fresh } : item;
//       });
//     }
//     return baseItems;
//   }, [cartItems, selectedItemIds, catalogProducts]);

//   const checkoutCount = useMemo(() => {
//     return checkoutItems.reduce((sum, item) => sum + item.quantity, 0);
//   }, [checkoutItems]);

//   // ============================================================================
//   // OTAK UTAMA: MENGHITUNG HARGA BUNDLE, TOTAL, & DYNAMIC PROMO ENGINE
//   // ============================================================================
//   const checkoutData = useMemo(() => {
//     const curr = (currency as Currency) || "IDR";
//     let totalValueDisplay = 0;
//     let totalValueIDR = 0;
//     let appliedBundlesCount = 0;

//     const itemGrossAmounts: { [cartId: number]: number } = {};
//     const isBundledMap: Record<number, boolean> = {};
//     const isEligibleForBundleMap: Record<number, boolean> = {};
//     let hasBundleProduct = false;

//     const driversPool: {
//       cartId: number;
//       normalPrice: number;
//       normalIDR: number;
//       bundlePrice: number;
//       bundleIDR: number;
//     }[] = [];
//     const partnersPool: {
//       cartId: number;
//       normalPrice: number;
//       normalIDR: number;
//     }[] = [];

//     const isReseller = userType === "reseller";
//     const isWholesaleGlobal = isReseller && checkoutCount >= 24;

//     // Tahap 1: Inisialisasi Kolam
//     checkoutItems.forEach((item) => {
//       const prod = item.product;
//       const qty = item.quantity;
//       itemGrossAmounts[item.id] = 0;
//       isBundledMap[item.id] = false;
//       isEligibleForBundleMap[item.id] = false;

//       const activePriceObj = getActivePriceObj(prod, checkoutCount);
//       let normalPriceDisplay = activePriceObj.value;
//       if (activePriceObj.curr === "IDR" && curr !== "IDR") {
//         normalPriceDisplay = normalPriceDisplay * (exchangeRates?.[curr] || 1);
//       }

//       let normalPriceIDR = Number(prod.price) || 0;
//       const wholesale = Number(prod.wholesale_price) || 0;
//       const discount = Number(prod.discount_price) || 0;
//       const voucher = Number(prod.voucher_discount_price) || 0;

//       if (appliedPromoType === "voucher" && voucher > 0) {
//         normalPriceIDR = voucher;
//       } else if (isWholesaleGlobal && wholesale > 0) {
//         normalPriceIDR = wholesale;
//       } else if (discount > 0 && discount < normalPriceIDR) {
//         normalPriceIDR = discount;
//       }

//       // Grosir mematikan semua logika bundle
//       if (isWholesaleGlobal && wholesale > 0) {
//         itemGrossAmounts[item.id] += normalPriceDisplay * qty;
//         totalValueDisplay += normalPriceDisplay * qty;
//         totalValueIDR += normalPriceIDR * qty;
//         return;
//       }

//       const sku = (prod.sku || "").toUpperCase();
//       const isEGB = sku.startsWith("EGB");

//       const rawFlag = prod.is_bundle_active;
//       const isBundleActiveFlag =
//         rawFlag === true ||
//         rawFlag === 1 ||
//         String(rawFlag) === "1" ||
//         String(rawFlag).toLowerCase() === "true";

//       const catCode = String((prod as any).category?.code || "").toUpperCase();
//       const isStandaloneBundle = catCode === "BN-01";

//       const isBundleValid = isBundleActiveFlag || isStandaloneBundle;

//       if (isBundleValid) {
//         hasBundleProduct = true;
//       }

//       let isValidDate = true;
//       if (
//         prod.bundle_end_date &&
//         prod.bundle_end_date !== "0000-00-00 00:00:00"
//       ) {
//         const safeDateStr = prod.bundle_end_date.replace(" ", "T");
//         const d = new Date(safeDateStr);
//         if (!isNaN(d.getTime())) isValidDate = d.getTime() > Date.now();
//       }

//       const bundleObjDisplay = getBundleToDisplay(prod);
//       const bundlePriceIDR = Number(prod.bundle_price) || 0;

//       const isDriver =
//         isEGB &&
//         isBundleValid &&
//         isValidDate &&
//         bundleObjDisplay &&
//         bundleObjDisplay.value > 0;

//       if (isDriver) {
//         isEligibleForBundleMap[item.id] = true;
//         for (let i = 0; i < qty; i++) {
//           driversPool.push({
//             cartId: item.id,
//             normalPrice: normalPriceDisplay,
//             normalIDR: normalPriceIDR,
//             bundlePrice: bundleObjDisplay.value,
//             bundleIDR: bundlePriceIDR,
//           });
//         }
//       } else if (!isEGB && !isStandaloneBundle) {
//         isEligibleForBundleMap[item.id] = true;
//         for (let i = 0; i < qty; i++) {
//           partnersPool.push({
//             cartId: item.id,
//             normalPrice: normalPriceDisplay,
//             normalIDR: normalPriceIDR,
//           });
//         }
//       } else {
//         itemGrossAmounts[item.id] += normalPriceDisplay * qty;
//         totalValueDisplay += normalPriceDisplay * qty;
//         totalValueIDR += normalPriceIDR * qty;
//       }
//     });

//     // Tahap 2: Penjodohan (Pairing)
//     driversPool.sort((a, b) => b.bundlePrice - a.bundlePrice);

//     while (driversPool.length > 0 && partnersPool.length > 0) {
//       const driver = driversPool.shift()!;
//       const partner = partnersPool.shift()!;

//       const halfDisplay = driver.bundlePrice / 2;
//       itemGrossAmounts[driver.cartId] += halfDisplay;
//       itemGrossAmounts[partner.cartId] += halfDisplay;

//       isBundledMap[driver.cartId] = true;
//       isBundledMap[partner.cartId] = true;

//       totalValueDisplay += driver.bundlePrice;
//       totalValueIDR += driver.bundleIDR;
//       appliedBundlesCount++;
//     }

//     // Tahap 3: Sisa Jomblo
//     driversPool.forEach((d) => {
//       itemGrossAmounts[d.cartId] += d.normalPrice;
//       totalValueDisplay += d.normalPrice;
//       totalValueIDR += d.normalIDR;
//     });

//     partnersPool.forEach((p) => {
//       itemGrossAmounts[p.cartId] += p.normalPrice;
//       totalValueDisplay += p.normalPrice;
//       totalValueIDR += p.normalIDR;
//     });

//     // =========================================================================
//     // 👇 [BARU] MESIN PROMO DINAMIS (Membaca API JSON) 👇
//     // =========================================================================
//     let dynamicDiscountIDR = 0;
//     let freebies: string[] = [];
//     const upsellMessages: { amountNeeded: number; message: string }[] = [];
//     const appliedPromoNames: string[] = [];

//     activePromos.forEach((promo) => {
//       const rules: PromoRules =
//         typeof promo.rules === "string" ? JSON.parse(promo.rules) : promo.rules;
//       let promoDiscount = 0;
//       let currentPromoFreebies: string[] = [];

//       // Evaluasi Syarat Tiering
//       if (rules.tiers && Array.isArray(rules.tiers)) {
//         const sortedTiers = [...rules.tiers].sort(
//           (a, b) => b.min_purchase - a.min_purchase,
//         );

//         for (const tier of sortedTiers) {
//           if (totalValueIDR >= tier.min_purchase) {
//             promoDiscount = tier.discount_nominal || 0;
//             if (tier.freebies)
//               currentPromoFreebies = [
//                 ...currentPromoFreebies,
//                 ...tier.freebies,
//               ];
//             break;
//           }
//         }

//         // Kalkulasi Upsell Banner untuk tier berikutnya
//         if (totalValueIDR > 0) {
//           const nextTiers = sortedTiers
//             .filter((t) => totalValueIDR < t.min_purchase)
//             .sort((a, b) => a.min_purchase - b.min_purchase);

//           if (nextTiers.length > 0) {
//             const nextTier = nextTiers[0];
//             const amountNeeded = nextTier.min_purchase - totalValueIDR;
//             const rewards = [];

//             if (nextTier.discount_nominal)
//               rewards.push(`Diskon Rp ${nextTier.discount_nominal / 1000}K`);
//             if (nextTier.freebies && nextTier.freebies.length > 0)
//               rewards.push(...nextTier.freebies);

//             if (rewards.length > 0) {
//               upsellMessages.push({
//                 amountNeeded,
//                 message: `${rewards.join(" + ")}! ${promo.banner_badge || ""}`,
//               });
//             }
//           }
//         }
//       }

//       // Evaluasi Hadiah Pembelian Bundle
//       if (
//         hasBundleProduct &&
//         rules.bundle_reward &&
//         rules.bundle_reward.freebies
//       ) {
//         currentPromoFreebies = [
//           ...currentPromoFreebies,
//           ...rules.bundle_reward.freebies,
//         ];
//       }

//       if (promoDiscount > 0 || currentPromoFreebies.length > 0) {
//         dynamicDiscountIDR += promoDiscount;
//         freebies = [...freebies, ...currentPromoFreebies];
//         appliedPromoNames.push(promo.banner_badge || promo.name);
//       }
//     });

//     freebies = Array.from(new Set(freebies));

//     totalValueIDR -= dynamicDiscountIDR;
//     if (totalValueIDR < 0) totalValueIDR = 0;

//     const dynamicDiscountDisplay =
//       convertIDRtoActiveCurrency(dynamicDiscountIDR).value;
//     totalValueDisplay -= dynamicDiscountDisplay;
//     if (totalValueDisplay < 0) totalValueDisplay = 0;
//     // 👆 ================================================================== 👆

//     return {
//       totalObj: { value: totalValueDisplay, curr },
//       totalIDR: totalValueIDR,
//       itemGrossAmounts,
//       isBundledMap,
//       isEligibleForBundleMap,
//       appliedBundlesCount,
//       dynamicDiscountIDR,
//       dynamicDiscountDisplay,
//       freebies,
//       upsellMessages,
//       appliedPromoNames,
//       originalTotalIDR: totalValueIDR + dynamicDiscountIDR,
//     };
//   }, [
//     checkoutItems,
//     checkoutCount,
//     curr,
//     getActivePriceObj,
//     getBundleToDisplay,
//     appliedPromoType,
//     exchangeRates,
//     userType,
//     getFreshProduct,
//     convertIDRtoActiveCurrency,
//     activePromos,
//   ]);

//   const checkoutTotalIDR = checkoutData.totalIDR;
//   const checkoutTotalAmountObj = checkoutData.totalObj;

//   const actualPromoDiscountIDR = useMemo(() => {
//     if (appliedPromoType === "claim") {
//       const productDiscount = Math.floor(checkoutTotalIDR * 0.1);
//       let shippingCost = 0;
//       if (shippingMethod === "biteship" && selectedRate)
//         shippingCost = parseFloat(selectedRate.price);
//       const shippingSubsidy = Math.min(10000, shippingCost);
//       return productDiscount + shippingSubsidy;
//     }
//     return promoDiscountAmount;
//   }, [
//     appliedPromoType,
//     checkoutTotalIDR,
//     shippingMethod,
//     selectedRate,
//     promoDiscountAmount,
//   ]);

//   const actualPromoDiscountObj = convertIDRtoActiveCurrency(
//     actualPromoDiscountIDR,
//   );

//   const maxPointsAllowed = useMemo(() => {
//     const maxUsableAmount = Math.max(
//       0,
//       checkoutTotalIDR - actualPromoDiscountIDR,
//     );
//     return Math.min(availablePoints, Math.floor(maxUsableAmount / 1000));
//   }, [availablePoints, checkoutTotalIDR, actualPromoDiscountIDR]);

//   const appliedPointDiscountIDR = pointsUsed * 1000;
//   const appliedPointDiscountObj = convertIDRtoActiveCurrency(
//     appliedPointDiscountIDR,
//   );

//   const shippingCostIDR = useMemo(() => {
//     return shippingMethod === "biteship" && selectedRate
//       ? parseFloat(selectedRate.price)
//       : 0;
//   }, [shippingMethod, selectedRate]);

//   const shippingCostObj = useMemo(() => {
//     return convertIDRtoActiveCurrency(shippingCostIDR);
//   }, [shippingCostIDR, convertIDRtoActiveCurrency]);

//   const grandTotalObj = useMemo(() => {
//     return {
//       value:
//         checkoutTotalAmountObj.value +
//         shippingCostObj.value -
//         actualPromoDiscountObj.value -
//         appliedPointDiscountObj.value,
//       curr: curr,
//     };
//   }, [
//     checkoutTotalAmountObj,
//     shippingCostObj,
//     actualPromoDiscountObj,
//     appliedPointDiscountObj,
//     curr,
//   ]);

//   const handleGetCurrentLocation = () => {
//     setIsGettingLocation(true);
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const lat = position.coords.latitude;
//           const lng = position.coords.longitude;
//           setMapPosition([lat, lng]);
//           fetchAddressFromCoords(lat, lng);
//           setIsGettingLocation(false);
//         },
//         () => {
//           Swal.fire("Akses Ditolak", t("warn_location_denied"), "warning");
//           setIsGettingLocation(false);
//         },
//       );
//     } else {
//       Swal.fire("Tidak Mendukung", t("warn_location_unsupported"), "error");
//       setIsGettingLocation(false);
//     }
//   };

//   const fetchAddressFromCoords = async (lat: number, lng: number) => {
//     try {
//       const res = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
//       );
//       const data = await res.json();
//       if (data && data.address) {
//         const { address } = data;
//         const newCity = address.city || address.town || address.county || "";
//         const newRegion =
//           address.suburb || address.village || address.neighbourhood || "";
//         const newProvince = address.state || "";
//         const newPostal = address.postcode || "";
//         const roadName = address.road || "";
//         const houseNumber = address.house_number || "";
//         const fullStreet = roadName
//           ? `${roadName} ${houseNumber}`.trim()
//           : data.display_name;

//         setFormData((prev) => ({
//           ...prev,
//           latitude: lat.toString(),
//           longitude: lng.toString(),
//           address_location: fullStreet,
//           city: newCity,
//           province: newProvince,
//           region: newRegion,
//           postal_code: newPostal,
//         }));
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const MapEvents = useCallback(() => {
//     useMapEvents({
//       click(e) {
//         setMapPosition([e.latlng.lat, e.latlng.lng]);
//         fetchAddressFromCoords(e.latlng.lat, e.latlng.lng);
//       },
//     });
//     return null;
//   }, []);

//   const MapCenterUpdater = ({ position }: { position: [number, number] }) => {
//     const map = useMap();
//     useEffect(() => {
//       map.setView(position, map.getZoom());
//     }, [position, map]);
//     return null;
//   };

//   useEffect(() => {
//     if (pointsUsed > maxPointsAllowed) {
//       setPointsUsed(maxPointsAllowed);
//       setPointsInput(maxPointsAllowed > 0 ? maxPointsAllowed : "");
//     }
//   }, [maxPointsAllowed, pointsUsed]);

//   const handleOpenModal = (address: Address | null = null) => {
//     if (address) {
//       setEditingId(address.id);
//       const lat = parseFloat(address.details.latitude);
//       const lng = parseFloat(address.details.longitude);
//       setMapPosition(!isNaN(lat) && !isNaN(lng) ? [lat, lng] : defaultPosition);
//       setFormData({
//         region: address.details.region || "",
//         first_name_address: address.receiver.first_name,
//         last_name_address: address.receiver.last_name,
//         address_location: address.details.address_location,
//         city: address.details.city,
//         province: address.details.province,
//         postal_code: address.details.postal_code,
//         location_type: address.details.type,
//         latitude: address.details.latitude || "",
//         longitude: address.details.longitude || "",
//         is_default: address.is_default,
//       });
//     } else {
//       setEditingId(null);
//       setMapPosition(defaultPosition);
//       setFormData({
//         region: "",
//         first_name_address: "",
//         last_name_address: "",
//         address_location: "",
//         city: "",
//         province: "",
//         postal_code: "",
//         location_type: "home",
//         latitude: "",
//         longitude: "",
//         is_default: false,
//       });
//     }
//     setIsModalOpen(true);
//   };

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
//           const defaultAddr = addrArray.find((a: any) => a.is_default);
//           setSelectedAddressId(defaultAddr ? defaultAddr.id : addrArray[0].id);
//         } else {
//           setSelectedAddressId(null);
//         }
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     const fetchCatalog = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (res.ok) {
//           const data = await res.json();
//           setCatalogProducts(data.data ? data.data : data);
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setIsCatalogLoaded(true);
//       }
//     };
//     fetchCatalog();
//   }, []);

//   useEffect(() => {
//     if (selectedItemIds.length === 0) {
//       navigate(`${urlPrefix}/cart`);
//       return;
//     }
//     const loadData = async () => {
//       const token = localStorage.getItem("user_token");
//       const userStr = localStorage.getItem("user_data");
//       if (!token) {
//         navigate(`${urlPrefix}/login`);
//         return;
//       }
//       if (userStr) {
//         const user = JSON.parse(userStr);
//         setAvailablePoints(user.point || 0);
//         setUserType(user.usertype || "user");
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
//           console.error(err);
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
//       .map((rate) => ({ ...rate, is_disabled: false, disable_reason: "" }))
//       .sort((a, b) =>
//         a.is_disabled === b.is_disabled ? 0 : a.is_disabled ? 1 : -1,
//       );
//   }, [rawShippingRates]);

//   const applyPromo = async (e: any) => {
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
//       if (checkoutTotalIDR < 50000)
//         throw new Error("Minimum belanja Rp 50.000");

//       setAppliedPromoCode(promoInput.toUpperCase());
//       setAppliedPromoType(data.promo_type);

//       if (data.promo_type === "claim") {
//         setPromoDiscountAmount(0);
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

//   const handleApplyPoints = (e: any) => {
//     e.preventDefault();
//     const ptsToUse = Number(pointsInput);
//     if (ptsToUse > availablePoints)
//       return Swal.fire(
//         "Peringatan",
//         `Anda hanya memiliki ${availablePoints} poin.`,
//         "warning",
//       );
//     if (ptsToUse > maxPointsAllowed) {
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
//         promo_type: appliedPromoType,
//         currency: curr,
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
//         (window as any).dataLayer = (window as any).dataLayer || [];
//         (window as any).dataLayer.push({
//           event: "add_payment_info",
//           ecommerce: {
//             currency: grandTotalObj.curr,
//             value: grandTotalObj.value,
//             items: checkoutItems.map((item: any) => {
//               const freshProd = getFreshProduct(item.product);
//               const calculatedGross = checkoutData.itemGrossAmounts[item.id];
//               const unitPrice =
//                 calculatedGross !== undefined
//                   ? calculatedGross / item.quantity
//                   : getActivePriceObj(freshProd, checkoutCount).value;
//               return {
//                 item_id: freshProd.id,
//                 item_name: freshProd.name,
//                 price: unitPrice,
//                 quantity: item.quantity,
//               };
//             }),
//           },
//         });
//         window.location.href = data.checkout_url;
//       } else {
//         throw new Error(data.message || "Gagal membuat tagihan");
//       }
//     } catch (err: any) {
//       Swal.fire("Error", err.message, "error");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleImageError = (company: string) => {
//     setImageErrors((prev) => ({ ...prev, [company]: true }));
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

//   const handleSubmitAddress = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.latitude || !formData.longitude)
//       return Swal.fire(t("notification"), t("warn_select_location"), "warning");
//     const token = localStorage.getItem("user_token");
//     const method = editingId ? "PUT" : "POST";
//     const url = editingId
//       ? `${BASE_URL}/api/addresses/${editingId}`
//       : `${BASE_URL}/api/addresses`;
//     try {
//       const res = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });
//       if (res.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Berhasil!",
//           text: editingId
//             ? t("toast_address_updated")
//             : t("toast_address_added"),
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         setIsModalOpen(false);
//         fetchAddresses(token!);
//       } else {
//         throw new Error("Gagal menyimpan alamat");
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire(t("error"), t("server_error"), "error");
//     }
//   };

//   const isButtonDisabled =
//     isProcessing ||
//     checkoutItems.length === 0 ||
//     !selectedAddressId ||
//     (shippingMethod === "biteship" && !selectedRate);

//   if (isPageLoading || !isCatalogLoaded) {
//     return (
//       <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
//         <div className="flex gap-2 mb-4">
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-1"></div>
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-2"></div>
//           <div className="w-3 h-3 rounded-full bg-gycora animate-bounce-3"></div>
//         </div>
//         <p className="font-serif text-sm italic tracking-widest text-gray-500 animate-pulse">
//           {t("pay_loading_checkout")}
//         </p>
//       </div>
//     );
//   }

//   if (checkoutItems.length === 0) {
//     return (
//       <div className="min-h-screen px-6 py-12 mx-auto font-sans md:py-24 max-w-[1440px] animate-fade-in">
//         <div className="py-20 text-center">
//           <h2 className="mb-4 text-3xl font-extrabold text-gray-900">
//             {t("pay_empty_items")}
//           </h2>
//           <button
//             onClick={() => navigate(`${urlPrefix}/cart`)}
//             className="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase rounded-full bg-gycora hover:bg-gycora-dark"
//           >
//             {t("pay_btn_back_cart")}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen px-6 py-12 mx-auto font-sans md:py-24 max-w-[1440px] animate-fade-in relative">
//       <h1 className="mb-12 text-3xl font-extrabold tracking-tighter text-gray-900 uppercase md:text-4xl">
//         {t("pay_checkout_title")}
//       </h1>

//       <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
//         <div className="flex-grow space-y-12">
//           {/* BAGIAN ALAMAT */}
//           <section>
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-4">
//                 <span className="flex items-center justify-center w-6 h-6 text-[10px] font-bold text-white rounded-full bg-gycora">
//                   1
//                 </span>
//                 <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">
//                   {t("pay_shipping_address")}
//                 </h2>
//               </div>
//               {addresses.length > 0 && (
//                 <button
//                   onClick={() => handleOpenModal()}
//                   className="text-xs font-bold transition-colors text-emerald-600 hover:text-emerald-800"
//                 >
//                   {t("pay_add_address")}
//                 </button>
//               )}
//             </div>

//             {addresses.length === 0 ? (
//               <div className="py-10 text-center border border-gray-300 border-dashed bg-gray-50 rounded-2xl">
//                 <p className="mb-2 text-sm italic text-gray-500">
//                   {t("pay_no_address")}
//                 </p>
//                 <button
//                   onClick={() => handleOpenModal()}
//                   className="px-6 py-2 mt-2 text-xs font-bold tracking-widest text-white uppercase transition-colors rounded-full shadow-md bg-gycora hover:bg-gycora-dark"
//                 >
//                   {t("pay_new_address")}
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
//                             {t("main_address")}
//                           </span>
//                         )}
//                       </div>
//                       <p className="mt-2 text-sm leading-relaxed text-gray-600">
//                         {addr.details.address_location} - {addr.details.type}{" "}
//                         <br /> {addr.details.city}, {addr.details.province}{" "}
//                         <br /> {addr.details.region} -{" "}
//                         {addr.details.postal_code}
//                       </p>
//                     </div>
//                   </label>
//                 ))}
//               </div>
//             )}
//           </section>

//           {/* BAGIAN KURIR */}
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
//                 {t("pay_shipping_method")}
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
//                       {t("pay_method_pickup")}
//                     </p>
//                     <p className="mt-1 text-xs font-bold text-emerald-600">
//                       {t("pay_method_pickup_desc")}
//                     </p>
//                   </div>
//                   <p className="font-black text-gycora">
//                     {t("pay_method_free")}
//                   </p>
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
//                       {t("pay_method_courier")}
//                     </p>
//                     <p className="mt-1 text-xs text-gray-500">
//                       {t("pay_method_courier_desc")}
//                     </p>
//                   </div>
//                 </div>
//               </label>

//               {shippingMethod === "biteship" && (
//                 <div className="p-6 mt-4 space-y-8 bg-white border border-gray-200 rounded-3xl animate-fade-in">
//                   <h3 className="pt-2 text-sm font-bold tracking-widest text-gray-900 uppercase border-t border-gray-100">
//                     {t("pay_choose_courier")}
//                   </h3>
//                   {isLoadingRates ? (
//                     <p className="py-4 text-sm text-center text-gray-500 animate-pulse">
//                       {t("pay_calc_shipping")}
//                     </p>
//                   ) : processedShippingRates.length === 0 ? (
//                     <p className="py-4 text-xs italic text-center text-red-500">
//                       {t("pay_no_courier")}
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
//                               {formatCurrencyDisplay(
//                                 convertIDRtoActiveCurrency(rate.price),
//                               )}
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
//               {t("pay_order_summary")}
//             </h2>

//             {/* 👇 DYNAMIC UPSELL BANNER 👇 */}
//             {checkoutData.upsellMessages.map((upsell, idx) => (
//               <div
//                 key={idx}
//                 className="p-3 mb-4 text-xs font-medium text-center text-red-700 bg-red-100 border border-red-200 rounded-xl"
//               >
//                 Tambah{" "}
//                 <span className="font-bold text-red-600">
//                   {formatCurrencyDisplay(
//                     convertIDRtoActiveCurrency(upsell.amountNeeded),
//                   )}
//                 </span>{" "}
//                 lagi untuk <strong>{upsell.message}</strong>
//               </div>
//             ))}

//             {/* 👇 VISUALISASI HADIAH DINAMIS 👇 */}
//             {checkoutData.freebies.length > 0 && (
//               <div className="flex flex-col gap-2 p-4 mb-4 border border-red-200 bg-red-50 rounded-2xl">
//                 <div className="flex items-center gap-2">
//                   <span className="text-base">🎁</span>
//                   <span className="text-xs font-extrabold tracking-wide text-red-700 uppercase">
//                     Promo Rewards!
//                   </span>
//                 </div>
//                 <ul className="pl-6 space-y-1 text-xs font-bold text-red-600 list-disc">
//                   {checkoutData.freebies.map((f: string, i: number) => (
//                     <li key={i}>{f}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {checkoutData.appliedBundlesCount > 0 && (
//               <div className="flex items-center justify-between p-3 mb-6 border border-purple-200 rounded-xl bg-purple-50">
//                 <span className="text-[10px] font-extrabold tracking-wide text-purple-800 uppercase">
//                   {t("bundle_promo_active")}
//                 </span>
//                 <span className="text-xs font-black text-purple-700">
//                   {checkoutData.appliedBundlesCount} {t("bundle")}
//                 </span>
//               </div>
//             )}

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
//                 } catch (error) {
//                   if (Array.isArray(item.product.color)) {
//                     const matched = item.product.color.find(
//                       (c: any) =>
//                         (typeof c === "object" &&
//                           c !== null &&
//                           c.hex === item.color) ||
//                         c === item.color,
//                     );
//                     if (
//                       matched &&
//                       typeof matched === "object" &&
//                       matched !== null
//                     )
//                       colorName = (matched as { name?: string }).name || "";
//                   }
//                 }

//                 const freshProd = getFreshProduct(item.product);
//                 const activePriceObj = getActivePriceObj(
//                   freshProd,
//                   checkoutCount,
//                 );
//                 const basePriceObj = getPriceToDisplay(freshProd);
//                 const isDiscounted = activePriceObj.value < basePriceObj.value;

//                 const isWholesaleActive =
//                   userType === "reseller" &&
//                   Number(freshProd.wholesale_price) > 0 &&
//                   checkoutCount >= 24;
//                 const isBundled = checkoutData.isBundledMap[item.id];

//                 const catCode = String(
//                   freshProd.category?.code || "",
//                 ).toUpperCase();
//                 const isStandaloneBundle = catCode === "BN-01";

//                 const calculatedGross = checkoutData.itemGrossAmounts[item.id];

//                 const currentGrossAmountObj = {
//                   value:
//                     calculatedGross !== undefined
//                       ? calculatedGross
//                       : activePriceObj.value * item.quantity,
//                   curr: checkoutData.totalObj.curr,
//                 };
//                 const originalGrossAmountObj = {
//                   value: basePriceObj.value * item.quantity,
//                   curr: basePriceObj.curr,
//                 };

//                 return (
//                   <div key={item.id} className="flex gap-4">
//                     <img
//                       src={freshProd.image_url}
//                       alt={freshProd.name}
//                       className="object-cover w-16 h-16 bg-white border border-gray-100 rounded-xl shrink-0"
//                     />
//                     <div className="flex-grow min-w-0">
//                       <div className="flex items-center gap-2">
//                         <p
//                           className="w-40 text-[11px] font-bold text-gray-900 uppercase truncate"
//                           title={freshProd.name}
//                         >
//                           {freshProd.name}
//                         </p>
//                         {isWholesaleActive && (
//                           <span className="px-1.5 py-0.5 text-[8px] font-bold text-white bg-blue-600 rounded shrink-0">
//                             GROSIR
//                           </span>
//                         )}
//                         {(isBundled || isStandaloneBundle) && (
//                           <span className="px-1.5 py-0.5 text-[8px] font-bold text-purple-600 bg-purple-100 rounded uppercase shrink-0">
//                             Bundle
//                           </span>
//                         )}
//                       </div>

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
//                               ></div>
//                               {colorName && (
//                                 <span className="text-[10px] font-bold text-gray-500 uppercase truncate max-w-[80px]">
//                                   {colorName}
//                                 </span>
//                               )}
//                             </div>
//                           </>
//                         )}
//                       </div>

//                       <p
//                         className={`mt-1 text-xs font-medium ${isBundled || isStandaloneBundle ? "text-purple-600" : isWholesaleActive ? "text-blue-600" : "text-gycora"}`}
//                       >
//                         {formatCurrencyDisplay(currentGrossAmountObj)}{" "}
//                         {isDiscounted && !isBundled && !isStandaloneBundle && (
//                           <span className="text-[9px] line-through text-gray-400 ml-1">
//                             {formatCurrencyDisplay(originalGrossAmountObj)}
//                           </span>
//                         )}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="pt-4 space-y-3 text-sm border-t border-gray-200">
//               <div className="flex justify-between text-gray-500">
//                 <span>{t("pay_total_items")}</span>
//                 <span className="font-bold text-gray-900">
//                   {checkoutCount} items
//                 </span>
//               </div>
//               <div className="flex justify-between text-gray-500">
//                 <span>{t("pay_product_subtotal")}</span>
//                 <span
//                   className={
//                     appliedPromoType === "voucher"
//                       ? "text-amber-600 font-bold"
//                       : ""
//                   }
//                 >
//                   {formatCurrencyDisplay(checkoutData.totalObj)}
//                 </span>
//               </div>

//               {/* 👇 BARIS DISKON DINAMIS 👇 */}
//               {checkoutData.dynamicDiscountDisplay > 0 && (
//                 <div className="flex justify-between text-sm font-bold text-red-600">
//                   <span
//                     className="max-w-[150px] truncate"
//                     title={
//                       checkoutData.appliedPromoNames.join(" + ") ||
//                       "Promo Active"
//                     }
//                   >
//                     {checkoutData.appliedPromoNames.join(" + ") ||
//                       "Promo Active"}
//                   </span>
//                   <span>
//                     -{" "}
//                     {formatCurrencyDisplay({
//                       value: checkoutData.dynamicDiscountDisplay,
//                       curr: checkoutData.totalObj.curr,
//                     })}
//                   </span>
//                 </div>
//               )}

//               {/* Promo Code */}
//               <div className="pt-4 mt-2 border-t border-gray-200 border-dashed">
//                 <label className="block mb-2 text-[10px] font-bold tracking-widest text-gray-900 uppercase">
//                   {t("pay_promo_label")}
//                 </label>
//                 <form onSubmit={applyPromo} className="flex gap-2">
//                   <input
//                     type="text"
//                     value={promoInput}
//                     onChange={(e) => setPromoInput(e.target.value)}
//                     disabled={!!appliedPromoCode || isVerifyingPromo}
//                     placeholder={t("pay_promo_placeholder")}
//                     className="flex-1 px-3 py-2 text-sm uppercase bg-white border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-gycora disabled:bg-gray-100"
//                   />
//                   {!appliedPromoCode ? (
//                     <button
//                       type="submit"
//                       disabled={!promoInput || isVerifyingPromo}
//                       className="flex items-center justify-center w-20 px-4 text-[10px] font-bold text-white uppercase transition rounded-lg bg-gycora hover:bg-gycora-dark disabled:bg-gray-300"
//                     >
//                       {isVerifyingPromo ? "..." : t("pay_btn_apply")}
//                     </button>
//                   ) : (
//                     <button
//                       type="button"
//                       onClick={removePromo}
//                       className="w-20 px-4 text-[10px] font-bold text-red-600 uppercase transition border border-red-200 rounded-lg bg-red-50 hover:bg-red-100"
//                     >
//                       {t("pay_btn_remove")}
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
//                 {appliedPromoCode && (
//                   <div className="flex justify-between text-[10px] md:text-xs font-medium text-emerald-600 mt-2">
//                     <span className="pr-2 truncate">
//                       Promo (
//                       <span className="font-mono uppercase">
//                         {appliedPromoCode}
//                       </span>
//                       )
//                     </span>
//                     <span>
//                       - {formatCurrencyDisplay(actualPromoDiscountObj)}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {/* Loyalty Points */}
//               <div className="pt-4 mt-2 border-t border-gray-200 border-dashed">
//                 <div className="flex items-center justify-between mb-3">
//                   <label className="text-[10px] font-bold tracking-widest text-gray-900 uppercase">
//                     {t("pay_loyalty_points")}
//                   </label>
//                   <span className="text-xs text-gray-500">
//                     {t("pay_balance")}{" "}
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
//                       {t("pay_btn_use")}
//                     </button>
//                   ) : (
//                     <button
//                       type="button"
//                       onClick={handleRemovePoints}
//                       className="w-24 px-4 text-[10px] font-bold text-red-600 uppercase transition border border-red-200 rounded-lg bg-red-50 hover:bg-red-100"
//                     >
//                       {t("pay_btn_cancel")}
//                     </button>
//                   )}
//                 </form>
//                 {pointsUsed > 0 && (
//                   <div className="flex items-center justify-between mt-3 animate-fade-in">
//                     <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
//                       {t("pay_points_applied")} ({pointsUsed} Pts)
//                     </span>
//                     <span className="text-[11px] font-medium text-emerald-600">
//                       - {formatCurrencyDisplay(appliedPointDiscountObj)}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {/* TAMPILAN ONGKOS KIRIM */}
//               <div className="flex items-start justify-between pt-4 mt-2 text-gray-500 border-t border-gray-200 border-dashed">
//                 <span>{t("pay_shipping_cost")}</span>
//                 {shippingMethod === "free" ? (
//                   <span className="font-bold text-emerald-600">
//                     {t("pay_method_pickup")}
//                   </span>
//                 ) : shippingMethod === "biteship" && selectedRate ? (
//                   <div className="text-right">
//                     <span className="block font-medium text-gray-900">
//                       {formatCurrencyDisplay({
//                         value: parseFloat(selectedRate.price),
//                         curr: "IDR",
//                       })}
//                     </span>
//                     <p className="mt-1 text-[10px] text-gray-400">
//                       Flat Rate (Semua Item)
//                     </p>
//                   </div>
//                 ) : (
//                   <span className="text-[10px] italic">
//                     {t("choose_method")}
//                   </span>
//                 )}
//               </div>

//               <div className="flex justify-between pt-4 font-bold text-gray-900 border-t border-gray-200">
//                 <span className="mt-1 text-xs tracking-widest uppercase">
//                   {t("pay_grand_total")}
//                 </span>
//                 <span className="text-xl text-gycora">
//                   {formatCurrencyDisplay(grandTotalObj)}
//                 </span>
//               </div>

//               <button
//                 onClick={handlePayment}
//                 disabled={isButtonDisabled}
//                 className="flex items-center justify-center w-full gap-3 py-4 mt-8 text-xs font-bold tracking-[0.3em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/10"
//               >
//                 {!isProcessing ? t("pay_btn_pay_now") : t("pay_btn_processing")}
//               </button>

//               {!selectedAddressId && (
//                 <p className="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase">
//                   {t("pay_alert_no_address")}
//                 </p>
//               )}
//               {shippingMethod === "biteship" && !selectedRate && (
//                 <p className="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase">
//                   {t("pay_alert_no_courier")}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* --- MODAL FORM ALAMAT DENGAN PETA --- */}
//         {isModalOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-10 pb-10 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fade-in-up">
//             <div className="flex flex-col w-full max-w-5xl my-auto overflow-hidden bg-white shadow-2xl rounded-3xl">
//               <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50 shrink-0">
//                 <h3 className="text-xl font-extrabold tracking-tight text-gray-900">
//                   {editingId
//                     ? t("modal_edit_address_title")
//                     : t("modal_add_address_title")}
//                 </h3>
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="p-2 text-gray-400 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100"
//                 >
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
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
//               <div className="flex flex-col md:flex-row h-auto md:h-[650px] overflow-hidden">
//                 {/* BAGIAN PETA (KIRI) */}
//                 <div className="relative w-full bg-gray-100 border-b border-gray-200 h-72 md:h-full md:w-5/12 md:border-b-0 md:border-r shrink-0">
//                   <MapContainer
//                     center={mapPosition}
//                     zoom={15}
//                     style={{ height: "100%", width: "100%" }}
//                     scrollWheelZoom={true}
//                   >
//                     <TileLayer
//                       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//                       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     />
//                     <Marker position={mapPosition}>
//                       <Popup>{t("popup_selected_location")}</Popup>
//                     </Marker>
//                     <MapEvents />
//                     <MapCenterUpdater position={mapPosition} />
//                   </MapContainer>
//                   <button
//                     type="button"
//                     onClick={handleGetCurrentLocation}
//                     disabled={isGettingLocation}
//                     className="absolute z-[1000] bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:-translate-x-0 md:right-6 flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-full shadow-xl font-bold text-xs hover:bg-gray-50 border border-gray-200 transition-all hover:-translate-y-0.5"
//                   >
//                     {isGettingLocation ? (
//                       <span className="w-4 h-4 border-2 rounded-full border-[#006A4E] border-t-transparent animate-spin"></span>
//                     ) : (
//                       <svg
//                         className="w-4 h-4 text-[#006A4E]"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                         />
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                         />
//                       </svg>
//                     )}
//                     {t("btn_use_current_location")}
//                   </button>
//                 </div>

//                 {/* BAGIAN FORM (KANAN) */}
//                 <form
//                   onSubmit={handleSubmitAddress}
//                   className="flex flex-col flex-1 p-6 space-y-6 overflow-y-auto bg-white sm:p-8 custom-scrollbar"
//                 >
//                   <div className="flex gap-3 p-4 border border-blue-100 rounded-2xl bg-blue-50/50">
//                     <svg
//                       className="w-5 h-5 text-blue-500 shrink-0"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                       />
//                     </svg>
//                     <p className="text-xs leading-relaxed text-blue-800">
//                       {t("guide_map_text")}
//                     </p>
//                   </div>
//                   <div className="space-y-5">
//                     <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//                       <div>
//                         <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
//                           {t("label_first_name")}
//                         </label>
//                         <input
//                           type="text"
//                           required
//                           value={formData.first_name_address}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               first_name_address: e.target.value,
//                             })
//                           }
//                           className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
//                         />
//                       </div>
//                       <div>
//                         <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
//                           {t("label_last_name")}
//                         </label>
//                         <input
//                           type="text"
//                           required
//                           value={formData.last_name_address}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               last_name_address: e.target.value,
//                             })
//                           }
//                           className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
//                         {t("label_address_type")}
//                       </label>
//                       <select
//                         value={formData.location_type}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             location_type: e.target.value,
//                           })
//                         }
//                         className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none bg-white transition-all"
//                       >
//                         <option value="home">{t("option_home")}</option>
//                         <option value="office">{t("option_office")}</option>
//                         <option value="other">{t("option_other")}</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
//                         {t("label_full_address")}
//                       </label>
//                       <textarea
//                         required
//                         rows={3}
//                         placeholder={t("placeholder_full_address")}
//                         value={formData.address_location}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             address_location: e.target.value,
//                           })
//                         }
//                         className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none resize-none bg-white transition-all"
//                       ></textarea>
//                     </div>
//                     <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//                       <div>
//                         <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
//                           {t("label_region")}
//                         </label>
//                         <input
//                           type="text"
//                           required
//                           value={formData.region}
//                           onChange={(e) =>
//                             setFormData({ ...formData, region: e.target.value })
//                           }
//                           className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
//                         />
//                       </div>
//                       <div>
//                         <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
//                           {t("label_city")}
//                         </label>
//                         <input
//                           type="text"
//                           required
//                           value={formData.city}
//                           onChange={(e) =>
//                             setFormData({ ...formData, city: e.target.value })
//                           }
//                           className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
//                         />
//                       </div>
//                       <div>
//                         <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
//                           {t("label_province")}
//                         </label>
//                         <input
//                           type="text"
//                           required
//                           value={formData.province}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               province: e.target.value,
//                             })
//                           }
//                           className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
//                         />
//                       </div>
//                       <div>
//                         <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
//                           {t("label_postal_code")}
//                         </label>
//                         <input
//                           type="text"
//                           required
//                           value={formData.postal_code}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               postal_code: e.target.value,
//                             })
//                           }
//                           className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
//                         />
//                       </div>
//                     </div>
//                     <input type="hidden" value={formData.latitude} />
//                     <input type="hidden" value={formData.longitude} />
//                     <div
//                       className="flex items-center gap-3 p-4 mt-2 transition-colors border border-gray-200 cursor-pointer rounded-xl bg-gray-50 hover:bg-gray-100"
//                       onClick={() =>
//                         setFormData({
//                           ...formData,
//                           is_default: !formData.is_default,
//                         })
//                       }
//                     >
//                       <input
//                         type="checkbox"
//                         id="is_default"
//                         checked={formData.is_default}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             is_default: e.target.checked,
//                           })
//                         }
//                         className="w-5 h-5 rounded cursor-pointer text-[#006A4E] focus:ring-[#006A4E] accent-[#006A4E]"
//                         onClick={(e) => e.stopPropagation()}
//                       />
//                       <label
//                         htmlFor="is_default"
//                         className="text-sm font-bold text-gray-800 cursor-pointer select-none"
//                         onClick={(e) => e.stopPropagation()}
//                       >
//                         {t("label_set_default_address")}
//                       </label>
//                     </div>
//                   </div>
//                   <div className="flex justify-end gap-3 pt-6 mt-auto border-t border-gray-100">
//                     <button
//                       type="button"
//                       onClick={() => setIsModalOpen(false)}
//                       className="px-6 py-3 text-sm font-bold text-gray-600 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200"
//                     >
//                       {t("btn_cancel")}
//                     </button>
//                     <button
//                       type="submit"
//                       className="px-6 py-3 text-sm font-bold text-white transition-all shadow-md bg-[#006A4E] rounded-xl hover:bg-emerald-900 hover:shadow-lg"
//                     >
//                       {editingId
//                         ? t("btn_update_address")
//                         : t("btn_save_address")}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useCart } from "../../context/CartContext";
import { BASE_URL } from "../../config/api";
import { useLanguage } from "../../context/LanguageContext";
import { useCurrency } from "../../context/CurrencyContext";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";

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

interface PromoRuleTier {
  min_purchase: number;
  discount_nominal?: number;
  freebies?: string[];
}
interface PromoRules {
  tiers?: PromoRuleTier[];
  bundle_reward?: { freebies?: string[] };
}
interface DynamicPromo {
  name: string;
  banner_badge: string | null;
  rules: PromoRules | string;
  end_date: string;
}

type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const { currency, exchangeRates } = useCurrency();
  const curr = (currency as Currency) || "IDR";
  const { cartItems } = useCart();
  const selectedItemIds: number[] = location.state?.selectedIds || [];

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [userType, setUserType] = useState<string>("guest");
  const [catalogProducts, setCatalogProducts] = useState<any[]>([]);
  const [isCatalogLoaded, setIsCatalogLoaded] = useState(false);

  const [activePromos, setActivePromos] = useState<DynamicPromo[]>([]);

  // 👇 [BARU] State untuk A/B Testing Variant 👇
  const [abVariant, setAbVariant] = useState<"A" | "B">("A");

  const [addresses, setAddresses] = useState<any[]>([]);
  const defaultPosition: [number, number] = [-6.175392, 106.827153];
  const [mapPosition, setMapPosition] =
    useState<[number, number]>(defaultPosition);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
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

  const getUrlPrefix = () => {
    if (location.pathname.startsWith("/id")) return "/id";
    if (location.pathname.startsWith("/en")) return "/en";
    return "";
  };
  const urlPrefix = getUrlPrefix();

  const [shippingMethod, setShippingMethod] = useState("free");
  const [selectedRate, setSelectedRate] = useState<any>(null);
  const [isLoadingRates, setIsLoadingRates] = useState(false);
  const [rawShippingRates, setRawShippingRates] = useState<any[]>([]);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

  const [promoInput, setPromoInput] = useState("");
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
  const [promoDiscountAmount, setPromoDiscountAmount] = useState(0);
  const [appliedPromoType, setAppliedPromoType] = useState<string | null>(null);
  const [promoMessage, setPromoMessage] = useState("");
  const [isVerifyingPromo, setIsVerifyingPromo] = useState(false);
  const [availablePoints, setAvailablePoints] = useState(0);
  const [pointsInput, setPointsInput] = useState<number | "">("");
  const [pointsUsed, setPointsUsed] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // 👇 [BARU] Fungsi Pembacaan/Penulisan Cookie untuk A/B Testing 👇
  useEffect(() => {
    // Cari cookie ab_variant
    const match = document.cookie.match(new RegExp("(^| )ab_variant=([^;]+)"));
    if (match) {
      setAbVariant(match[2] as "A" | "B");
    } else {
      // Jika belum ada, lempar koin (50:50) dan simpan cookie selama 30 hari
      const newVariant = Math.random() < 0.5 ? "A" : "B";
      document.cookie = `ab_variant=${newVariant}; path=/; max-age=${30 * 24 * 60 * 60}`;
      setAbVariant(newVariant);

      // Catat event A/B Test (Impression) ke backend (Opsional)
      // fetch(`${BASE_URL}/api/ab-test/log`, { method: "POST", body: JSON.stringify({ variant: newVariant, action: 'impression' }) });
    }
  }, []);

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/promos/active`);
        if (res.ok) {
          const data = await res.json();
          setActivePromos(data);
        }
      } catch (error) {
        console.error("Gagal memuat promo aktif:", error);
      }
    };
    fetchPromos();
  }, []);

  const convertIDRtoActiveCurrency = useCallback(
    (idrAmount: number) => {
      if (curr === "IDR" || !exchangeRates || !exchangeRates[curr])
        return { value: idrAmount, curr: "IDR" };
      return { value: idrAmount * exchangeRates[curr], curr: curr };
    },
    [curr, exchangeRates],
  );

  const formatCurrencyDisplay = useCallback(
    (priceObj: { value: number; curr: string } | null) => {
      if (!priceObj) return "";
      const symbols: any = {
        USD: "$",
        SGD: "S$",
        EUR: "€",
        AUD: "A$",
        MYR: "RM",
        IDR: "Rp ",
      };
      const formatter = new Intl.NumberFormat(
        priceObj.curr === "IDR" ? "id-ID" : "en-US",
        {
          minimumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
          maximumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
        },
      );
      return `${symbols[priceObj.curr] || priceObj.curr + " "}${formatter.format(priceObj.value)}`;
    },
    [],
  );

  const getPriceToDisplay = useCallback(
    (product: any) => {
      if (!product) return { value: 0, curr: "IDR" };
      if (curr === "IDR") return { value: Number(product.price), curr: "IDR" };
      try {
        const pricesObj =
          typeof product.prices === "string"
            ? JSON.parse(product.prices)
            : product.prices || {};
        const dbPrice =
          pricesObj[curr] ||
          pricesObj[curr.toLowerCase()] ||
          pricesObj[curr.toUpperCase()];
        if (dbPrice) return { value: parseFloat(dbPrice), curr: curr };
      } catch (e) {
        console.error(e);
      }
      return { value: Number(product.price), curr: "IDR" };
    },
    [curr],
  );

  const getDiscountToDisplay = useCallback(
    (product: any) => {
      if (!product) return null;
      if (curr === "IDR")
        return product.discount_price
          ? { value: Number(product.discount_price), curr: "IDR" }
          : null;
      try {
        const discObj =
          typeof product.discount_prices === "string"
            ? JSON.parse(product.discount_prices)
            : product.discount_prices || {};
        const dbDisc =
          discObj[curr] ||
          discObj[curr.toLowerCase()] ||
          discObj[curr.toUpperCase()];
        if (dbDisc) return { value: parseFloat(dbDisc), curr: curr };
      } catch (e) {
        console.error(e);
      }
      return product.discount_price
        ? { value: Number(product.discount_price), curr: "IDR" }
        : null;
    },
    [curr],
  );

  const getWholesaleToDisplay = useCallback(
    (product: any) => {
      if (!product) return null;
      if (curr === "IDR")
        return product.wholesale_price
          ? { value: Number(product.wholesale_price), curr: "IDR" }
          : null;
      try {
        const wholesaleObj =
          typeof product.wholesale_prices === "string"
            ? JSON.parse(product.wholesale_prices)
            : product.wholesale_prices || {};
        const dbWholesale =
          wholesaleObj[curr] ||
          wholesaleObj[curr.toLowerCase()] ||
          wholesaleObj[curr.toUpperCase()];
        if (dbWholesale) return { value: parseFloat(dbWholesale), curr: curr };
      } catch (e) {
        console.error(e);
      }
      return product.wholesale_price
        ? { value: Number(product.wholesale_price), curr: "IDR" }
        : null;
    },
    [curr],
  );

  const getBundleToDisplay = useCallback(
    (product: any) => {
      if (!product) return null;
      if (curr === "IDR")
        return product.bundle_price > 0
          ? { value: Number(product.bundle_price), curr: "IDR" }
          : null;
      try {
        const bundleObj =
          typeof product.bundle_prices === "string"
            ? JSON.parse(product.bundle_prices)
            : product.bundle_prices || {};
        const dbBundle =
          bundleObj[curr] ||
          bundleObj[curr.toLowerCase()] ||
          bundleObj[curr.toUpperCase()];
        if (dbBundle) return { value: parseFloat(dbBundle), curr: curr };
      } catch (e) {}
      return product.bundle_price > 0
        ? convertIDRtoActiveCurrency(Number(product.bundle_price))
        : null;
    },
    [curr, convertIDRtoActiveCurrency],
  );

  const getActivePriceObj = useCallback(
    (product: any, totalQty: number) => {
      const isReseller = userType === "reseller";
      const voucher = Number(product.voucher_discount_price) || 0;
      if (appliedPromoType === "voucher" && voucher > 0)
        return { value: voucher, curr: "IDR" };

      const dynamicPriceObj = getPriceToDisplay(product);
      const dynamicDiscountObj = getDiscountToDisplay(product);
      const dynamicWholesaleObj = getWholesaleToDisplay(product);

      if (
        isReseller &&
        dynamicWholesaleObj &&
        dynamicWholesaleObj.value > 0 &&
        totalQty >= 24
      ) {
        return dynamicWholesaleObj;
      } else if (
        dynamicDiscountObj &&
        dynamicDiscountObj.value > 0 &&
        dynamicDiscountObj.value < dynamicPriceObj.value
      ) {
        return dynamicDiscountObj;
      }
      return dynamicPriceObj;
    },
    [
      userType,
      appliedPromoType,
      getPriceToDisplay,
      getDiscountToDisplay,
      getWholesaleToDisplay,
    ],
  );

  const getFreshProduct = useCallback(
    (cartProduct: any) => {
      if (catalogProducts.length > 0 && cartProduct) {
        const fresh = catalogProducts.find(
          (p) => p.id === cartProduct.id || p.id === cartProduct.product_id,
        );
        if (fresh) return fresh;
      }
      return cartProduct;
    },
    [catalogProducts],
  );

  const checkoutItems = useMemo(() => {
    let baseItems = cartItems.filter((item) =>
      selectedItemIds.includes(item.id),
    );
    if (catalogProducts.length > 0) {
      baseItems = baseItems.map((item) => {
        const fresh = catalogProducts.find((p) => p.id === item.product_id);
        return fresh ? { ...item, product: fresh } : item;
      });
    }
    return baseItems;
  }, [cartItems, selectedItemIds, catalogProducts]);

  const checkoutCount = useMemo(() => {
    return checkoutItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [checkoutItems]);

  const checkoutData = useMemo(() => {
    const curr = (currency as Currency) || "IDR";
    let totalValueDisplay = 0;
    let totalValueIDR = 0;
    let appliedBundlesCount = 0;

    const itemGrossAmounts: { [cartId: number]: number } = {};
    const isBundledMap: Record<number, boolean> = {};
    const isEligibleForBundleMap: Record<number, boolean> = {};
    let hasBundleProduct = false;

    const driversPool: {
      cartId: number;
      normalPrice: number;
      normalIDR: number;
      bundlePrice: number;
      bundleIDR: number;
    }[] = [];
    const partnersPool: {
      cartId: number;
      normalPrice: number;
      normalIDR: number;
    }[] = [];

    const isReseller = userType === "reseller";
    const isWholesaleGlobal = isReseller && checkoutCount >= 24;

    checkoutItems.forEach((item) => {
      const prod = item.product;
      const qty = item.quantity;
      itemGrossAmounts[item.id] = 0;
      isBundledMap[item.id] = false;
      isEligibleForBundleMap[item.id] = false;

      const activePriceObj = getActivePriceObj(prod, checkoutCount);
      let normalPriceDisplay = activePriceObj.value;
      if (activePriceObj.curr === "IDR" && curr !== "IDR") {
        normalPriceDisplay = normalPriceDisplay * (exchangeRates?.[curr] || 1);
      }

      let normalPriceIDR = Number(prod.price) || 0;
      const wholesale = Number(prod.wholesale_price) || 0;
      const discount = Number(prod.discount_price) || 0;
      const voucher = Number(prod.voucher_discount_price) || 0;

      if (appliedPromoType === "voucher" && voucher > 0) {
        normalPriceIDR = voucher;
      } else if (isWholesaleGlobal && wholesale > 0) {
        normalPriceIDR = wholesale;
      } else if (discount > 0 && discount < normalPriceIDR) {
        normalPriceIDR = discount;
      }

      if (isWholesaleGlobal && wholesale > 0) {
        itemGrossAmounts[item.id] += normalPriceDisplay * qty;
        totalValueDisplay += normalPriceDisplay * qty;
        totalValueIDR += normalPriceIDR * qty;
        return;
      }

      const sku = (prod.sku || "").toUpperCase();
      const isEGB = sku.startsWith("EGB");

      const rawFlag = prod.is_bundle_active;
      const isBundleActiveFlag =
        rawFlag === true ||
        rawFlag === 1 ||
        String(rawFlag) === "1" ||
        String(rawFlag).toLowerCase() === "true";

      const catCode = String((prod as any).category?.code || "").toUpperCase();
      const isStandaloneBundle = catCode === "BN-01";

      const isBundleValid = isBundleActiveFlag || isStandaloneBundle;

      if (isBundleValid) {
        hasBundleProduct = true;
      }

      let isValidDate = true;
      if (
        prod.bundle_end_date &&
        prod.bundle_end_date !== "0000-00-00 00:00:00"
      ) {
        const safeDateStr = prod.bundle_end_date.replace(" ", "T");
        const d = new Date(safeDateStr);
        if (!isNaN(d.getTime())) isValidDate = d.getTime() > Date.now();
      }

      const bundleObjDisplay = getBundleToDisplay(prod);
      const bundlePriceIDR = Number(prod.bundle_price) || 0;

      const isDriver =
        isEGB &&
        isBundleValid &&
        isValidDate &&
        bundleObjDisplay &&
        bundleObjDisplay.value > 0;

      if (isDriver) {
        isEligibleForBundleMap[item.id] = true;
        for (let i = 0; i < qty; i++) {
          driversPool.push({
            cartId: item.id,
            normalPrice: normalPriceDisplay,
            normalIDR: normalPriceIDR,
            bundlePrice: bundleObjDisplay.value,
            bundleIDR: bundlePriceIDR,
          });
        }
      } else if (!isEGB && !isStandaloneBundle) {
        isEligibleForBundleMap[item.id] = true;
        for (let i = 0; i < qty; i++) {
          partnersPool.push({
            cartId: item.id,
            normalPrice: normalPriceDisplay,
            normalIDR: normalPriceIDR,
          });
        }
      } else {
        itemGrossAmounts[item.id] += normalPriceDisplay * qty;
        totalValueDisplay += normalPriceDisplay * qty;
        totalValueIDR += normalPriceIDR * qty;
      }
    });

    driversPool.sort((a, b) => b.bundlePrice - a.bundlePrice);

    while (driversPool.length > 0 && partnersPool.length > 0) {
      const driver = driversPool.shift()!;
      const partner = partnersPool.shift()!;

      const halfDisplay = driver.bundlePrice / 2;
      itemGrossAmounts[driver.cartId] += halfDisplay;
      itemGrossAmounts[partner.cartId] += halfDisplay;

      isBundledMap[driver.cartId] = true;
      isBundledMap[partner.cartId] = true;

      totalValueDisplay += driver.bundlePrice;
      totalValueIDR += driver.bundleIDR;
      appliedBundlesCount++;
    }

    driversPool.forEach((d) => {
      itemGrossAmounts[d.cartId] += d.normalPrice;
      totalValueDisplay += d.normalPrice;
      totalValueIDR += d.normalIDR;
    });

    partnersPool.forEach((p) => {
      itemGrossAmounts[p.cartId] += p.normalPrice;
      totalValueDisplay += p.normalPrice;
      totalValueIDR += p.normalIDR;
    });

    let dynamicDiscountIDR = 0;
    let freebies: string[] = [];
    const upsellMessages: { amountNeeded: number; message: string }[] = [];
    const appliedPromoNames: string[] = [];

    activePromos.forEach((promo) => {
      const rules: PromoRules =
        typeof promo.rules === "string" ? JSON.parse(promo.rules) : promo.rules;
      let promoDiscount = 0;
      let currentPromoFreebies: string[] = [];

      if (rules.tiers && Array.isArray(rules.tiers)) {
        const sortedTiers = [...rules.tiers].sort(
          (a, b) => b.min_purchase - a.min_purchase,
        );

        for (const tier of sortedTiers) {
          if (totalValueIDR >= tier.min_purchase) {
            promoDiscount = tier.discount_nominal || 0;
            if (tier.freebies)
              currentPromoFreebies = [
                ...currentPromoFreebies,
                ...tier.freebies,
              ];
            break;
          }
        }

        if (totalValueIDR > 0) {
          const nextTiers = sortedTiers
            .filter((t) => totalValueIDR < t.min_purchase)
            .sort((a, b) => a.min_purchase - b.min_purchase);

          if (nextTiers.length > 0) {
            const nextTier = nextTiers[0];
            const amountNeeded = nextTier.min_purchase - totalValueIDR;
            const rewards = [];

            if (nextTier.discount_nominal)
              rewards.push(`Diskon Rp ${nextTier.discount_nominal / 1000}K`);
            if (nextTier.freebies && nextTier.freebies.length > 0)
              rewards.push(...nextTier.freebies);

            if (rewards.length > 0) {
              upsellMessages.push({
                amountNeeded,
                message: `${rewards.join(" + ")}! ${promo.banner_badge || ""}`,
              });
            }
          }
        }
      }

      if (
        hasBundleProduct &&
        rules.bundle_reward &&
        rules.bundle_reward.freebies
      ) {
        currentPromoFreebies = [
          ...currentPromoFreebies,
          ...rules.bundle_reward.freebies,
        ];
      }

      if (promoDiscount > 0 || currentPromoFreebies.length > 0) {
        dynamicDiscountIDR += promoDiscount;
        freebies = [...freebies, ...currentPromoFreebies];
        appliedPromoNames.push(promo.banner_badge || promo.name);
      }
    });

    freebies = Array.from(new Set(freebies));

    totalValueIDR -= dynamicDiscountIDR;
    if (totalValueIDR < 0) totalValueIDR = 0;

    const dynamicDiscountDisplay =
      convertIDRtoActiveCurrency(dynamicDiscountIDR).value;
    totalValueDisplay -= dynamicDiscountDisplay;
    if (totalValueDisplay < 0) totalValueDisplay = 0;

    return {
      totalObj: { value: totalValueDisplay, curr },
      totalIDR: totalValueIDR,
      itemGrossAmounts,
      isBundledMap,
      isEligibleForBundleMap,
      appliedBundlesCount,
      dynamicDiscountIDR,
      dynamicDiscountDisplay,
      freebies,
      upsellMessages,
      appliedPromoNames,
      originalTotalIDR: totalValueIDR + dynamicDiscountIDR,
    };
  }, [
    checkoutItems,
    checkoutCount,
    curr,
    getActivePriceObj,
    getBundleToDisplay,
    appliedPromoType,
    exchangeRates,
    userType,
    getFreshProduct,
    convertIDRtoActiveCurrency,
    activePromos,
  ]);

  const checkoutTotalIDR = checkoutData.totalIDR;
  const checkoutTotalAmountObj = checkoutData.totalObj;

  const actualPromoDiscountIDR = useMemo(() => {
    if (appliedPromoType === "claim") {
      const productDiscount = Math.floor(checkoutTotalIDR * 0.1);
      let shippingCost = 0;
      if (shippingMethod === "biteship" && selectedRate)
        shippingCost = parseFloat(selectedRate.price);
      const shippingSubsidy = Math.min(10000, shippingCost);
      return productDiscount + shippingSubsidy;
    }
    return promoDiscountAmount;
  }, [
    appliedPromoType,
    checkoutTotalIDR,
    shippingMethod,
    selectedRate,
    promoDiscountAmount,
  ]);

  const actualPromoDiscountObj = convertIDRtoActiveCurrency(
    actualPromoDiscountIDR,
  );

  const maxPointsAllowed = useMemo(() => {
    const maxUsableAmount = Math.max(
      0,
      checkoutTotalIDR - actualPromoDiscountIDR,
    );
    return Math.min(availablePoints, Math.floor(maxUsableAmount / 1000));
  }, [availablePoints, checkoutTotalIDR, actualPromoDiscountIDR]);

  const appliedPointDiscountIDR = pointsUsed * 1000;
  const appliedPointDiscountObj = convertIDRtoActiveCurrency(
    appliedPointDiscountIDR,
  );

  const shippingCostIDR = useMemo(() => {
    return shippingMethod === "biteship" && selectedRate
      ? parseFloat(selectedRate.price)
      : 0;
  }, [shippingMethod, selectedRate]);

  const shippingCostObj = useMemo(() => {
    return convertIDRtoActiveCurrency(shippingCostIDR);
  }, [shippingCostIDR, convertIDRtoActiveCurrency]);

  const grandTotalObj = useMemo(() => {
    return {
      value:
        checkoutTotalAmountObj.value +
        shippingCostObj.value -
        actualPromoDiscountObj.value -
        appliedPointDiscountObj.value,
      curr: curr,
    };
  }, [
    checkoutTotalAmountObj,
    shippingCostObj,
    actualPromoDiscountObj,
    appliedPointDiscountObj,
    curr,
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
        },
      );
    } else {
      Swal.fire("Tidak Mendukung", t("warn_location_unsupported"), "error");
      setIsGettingLocation(false);
    }
  };

  const fetchAddressFromCoords = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      );
      const data = await res.json();
      if (data && data.address) {
        const { address } = data;
        const newCity = address.city || address.town || address.county || "";
        const newRegion =
          address.suburb || address.village || address.neighbourhood || "";
        const newProvince = address.state || "";
        const newPostal = address.postcode || "";
        const roadName = address.road || "";
        const houseNumber = address.house_number || "";
        const fullStreet = roadName
          ? `${roadName} ${houseNumber}`.trim()
          : data.display_name;

        setFormData((prev) => ({
          ...prev,
          latitude: lat.toString(),
          longitude: lng.toString(),
          address_location: fullStreet,
          city: newCity,
          province: newProvince,
          region: newRegion,
          postal_code: newPostal,
        }));
      }
    } catch (error) {
      console.error(error);
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

  useEffect(() => {
    if (pointsUsed > maxPointsAllowed) {
      setPointsUsed(maxPointsAllowed);
      setPointsInput(maxPointsAllowed > 0 ? maxPointsAllowed : "");
    }
  }, [maxPointsAllowed, pointsUsed]);

  const handleOpenModal = (address: Address | null = null) => {
    if (address) {
      setEditingId(address.id);
      const lat = parseFloat(address.details.latitude);
      const lng = parseFloat(address.details.longitude);
      setMapPosition(!isNaN(lat) && !isNaN(lng) ? [lat, lng] : defaultPosition);
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
          const defaultAddr = addrArray.find((a: any) => a.is_default);
          setSelectedAddressId(defaultAddr ? defaultAddr.id : addrArray[0].id);
        } else {
          setSelectedAddressId(null);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products`);
        if (res.ok) {
          const data = await res.json();
          setCatalogProducts(data.data ? data.data : data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsCatalogLoaded(true);
      }
    };
    fetchCatalog();
  }, []);

  useEffect(() => {
    if (selectedItemIds.length === 0) {
      navigate(`${urlPrefix}/cart`);
      return;
    }
    const loadData = async () => {
      const token = localStorage.getItem("user_token");
      const userStr = localStorage.getItem("user_data");
      if (!token) {
        navigate(`${urlPrefix}/login`);
        return;
      }
      if (userStr) {
        const user = JSON.parse(userStr);
        setAvailablePoints(user.point || 0);
        setUserType(user.usertype || "user");
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
      .map((rate) => ({ ...rate, is_disabled: false, disable_reason: "" }))
      .sort((a, b) =>
        a.is_disabled === b.is_disabled ? 0 : a.is_disabled ? 1 : -1,
      );
  }, [rawShippingRates]);

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
      if (checkoutTotalIDR < 50000)
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

  const handleApplyPoints = (e: any) => {
    e.preventDefault();
    const ptsToUse = Number(pointsInput);
    if (ptsToUse > availablePoints)
      return Swal.fire(
        "Peringatan",
        `Anda hanya memiliki ${availablePoints} poin.`,
        "warning",
      );
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
        currency: curr,
        // 👇 [BARU] Kirim varian A/B Test yang dipakai saat transaksi 👇
        ab_test_variant: abVariant,
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
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: "add_payment_info",
          ecommerce: {
            currency: grandTotalObj.curr,
            value: grandTotalObj.value,
            items: checkoutItems.map((item: any) => {
              const freshProd = getFreshProduct(item.product);
              const calculatedGross = checkoutData.itemGrossAmounts[item.id];
              const unitPrice =
                calculatedGross !== undefined
                  ? calculatedGross / item.quantity
                  : getActivePriceObj(freshProd, checkoutCount).value;
              return {
                item_id: freshProd.id,
                item_name: freshProd.name,
                price: unitPrice,
                quantity: item.quantity,
              };
            }),
          },
        });
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

  const handleSubmitAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.latitude || !formData.longitude)
      return Swal.fire(t("notification"), t("warn_select_location"), "warning");
    const token = localStorage.getItem("user_token");
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${BASE_URL}/api/addresses/${editingId}`
      : `${BASE_URL}/api/addresses`;
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: editingId
            ? t("toast_address_updated")
            : t("toast_address_added"),
          timer: 1500,
          showConfirmButton: false,
        });
        setIsModalOpen(false);
        fetchAddresses(token!);
      } else {
        throw new Error("Gagal menyimpan alamat");
      }
    } catch (error) {
      console.error(error);
      Swal.fire(t("error"), t("server_error"), "error");
    }
  };

  const isButtonDisabled =
    isProcessing ||
    checkoutItems.length === 0 ||
    !selectedAddressId ||
    (shippingMethod === "biteship" && !selectedRate);

  if (isPageLoading || !isCatalogLoaded) {
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
            onClick={() => navigate(`${urlPrefix}/cart`)}
            className="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase rounded-full bg-gycora hover:bg-gycora-dark"
          >
            {t("pay_btn_back_cart")}
          </button>
        </div>
      </div>
    );
  }

  // 👇 [BARU] Logika Tampilan Berdasarkan Varian A/B Testing 👇
  // Jika Varian A -> Tombol Hitam/Gycora (Default Klasik)
  // Jika Varian B -> Tombol Merah/Oranye (Psychological Urgency)
  const buttonStyleClass =
    abVariant === "B"
      ? "bg-red-600 hover:bg-red-700 text-white shadow-red-500/50" // Variant B: Merah Agresif
      : "bg-gray-900 hover:bg-black text-white shadow-black/10"; // Variant A: Hitam Klasik

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
                <button
                  onClick={() => handleOpenModal()}
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
                  onClick={() => handleOpenModal()}
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
                            {t("main_address")}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">
                        {addr.details.address_location} - {addr.details.type}{" "}
                        <br /> {addr.details.city}, {addr.details.province}{" "}
                        <br /> {addr.details.region} -{" "}
                        {addr.details.postal_code}
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
                              {formatCurrencyDisplay(
                                convertIDRtoActiveCurrency(rate.price),
                              )}
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

            {/* DYNAMIC UPSELL BANNER */}
            {checkoutData.upsellMessages.map((upsell, idx) => (
              <div
                key={idx}
                className="p-3 mb-4 text-xs font-medium text-center text-red-700 bg-red-100 border border-red-200 rounded-xl"
              >
                Tambah{" "}
                <span className="font-bold text-red-600">
                  {formatCurrencyDisplay(
                    convertIDRtoActiveCurrency(upsell.amountNeeded),
                  )}
                </span>{" "}
                lagi untuk <strong>{upsell.message}</strong>
              </div>
            ))}

            {/* VISUALISASI HADIAH DINAMIS */}
            {checkoutData.freebies.length > 0 && (
              <div className="flex flex-col gap-2 p-4 mb-4 border border-red-200 bg-red-50 rounded-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-base">🎁</span>
                  <span className="text-xs font-extrabold tracking-wide text-red-700 uppercase">
                    Promo Rewards!
                  </span>
                </div>
                <ul className="pl-6 space-y-1 text-xs font-bold text-red-600 list-disc">
                  {checkoutData.freebies.map((f: string, i: number) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            {checkoutData.appliedBundlesCount > 0 && (
              <div className="flex items-center justify-between p-3 mb-6 border border-purple-200 rounded-xl bg-purple-50">
                <span className="text-[10px] font-extrabold tracking-wide text-purple-800 uppercase">
                  {t("bundle_promo_active")}
                </span>
                <span className="text-xs font-black text-purple-700">
                  {checkoutData.appliedBundlesCount} {t("bundle")}
                </span>
              </div>
            )}

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
                } catch (error) {
                  if (Array.isArray(item.product.color)) {
                    const matched = item.product.color.find(
                      (c: any) =>
                        (typeof c === "object" &&
                          c !== null &&
                          c.hex === item.color) ||
                        c === item.color,
                    );
                    if (
                      matched &&
                      typeof matched === "object" &&
                      matched !== null
                    )
                      colorName = (matched as { name?: string }).name || "";
                  }
                }

                const freshProd = getFreshProduct(item.product);
                const activePriceObj = getActivePriceObj(
                  freshProd,
                  checkoutCount,
                );
                const basePriceObj = getPriceToDisplay(freshProd);
                const isDiscounted = activePriceObj.value < basePriceObj.value;

                const isWholesaleActive =
                  userType === "reseller" &&
                  Number(freshProd.wholesale_price) > 0 &&
                  checkoutCount >= 24;
                const isBundled = checkoutData.isBundledMap[item.id];
                const catCode = String(
                  freshProd.category?.code || "",
                ).toUpperCase();
                const isStandaloneBundle = catCode === "BN-01";
                const calculatedGross = checkoutData.itemGrossAmounts[item.id];

                const currentGrossAmountObj = {
                  value:
                    calculatedGross !== undefined
                      ? calculatedGross
                      : activePriceObj.value * item.quantity,
                  curr: checkoutData.totalObj.curr,
                };
                const originalGrossAmountObj = {
                  value: basePriceObj.value * item.quantity,
                  curr: basePriceObj.curr,
                };

                return (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={freshProd.image_url}
                      alt={freshProd.name}
                      className="object-cover w-16 h-16 bg-white border border-gray-100 rounded-xl shrink-0"
                    />
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2">
                        <p
                          className="w-40 text-[11px] font-bold text-gray-900 uppercase truncate"
                          title={freshProd.name}
                        >
                          {freshProd.name}
                        </p>
                        {isWholesaleActive && (
                          <span className="px-1.5 py-0.5 text-[8px] font-bold text-white bg-blue-600 rounded shrink-0">
                            GROSIR
                          </span>
                        )}
                        {(isBundled || isStandaloneBundle) && (
                          <span className="px-1.5 py-0.5 text-[8px] font-bold text-purple-600 bg-purple-100 rounded uppercase shrink-0">
                            Bundle
                          </span>
                        )}
                      </div>

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
                                <span className="text-[10px] font-bold text-gray-500 uppercase truncate max-w-[80px]">
                                  {colorName}
                                </span>
                              )}
                            </div>
                          </>
                        )}
                      </div>

                      <p
                        className={`mt-1 text-xs font-medium ${isBundled || isStandaloneBundle ? "text-purple-600" : isWholesaleActive ? "text-blue-600" : "text-gycora"}`}
                      >
                        {formatCurrencyDisplay(currentGrossAmountObj)}{" "}
                        {isDiscounted && !isBundled && !isStandaloneBundle && (
                          <span className="text-[9px] line-through text-gray-400 ml-1">
                            {formatCurrencyDisplay(originalGrossAmountObj)}
                          </span>
                        )}
                      </p>
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
                  {formatCurrencyDisplay(checkoutData.totalObj)}
                </span>
              </div>

              {checkoutData.dynamicDiscountDisplay > 0 && (
                <div className="flex justify-between text-sm font-bold text-red-600">
                  <span
                    className="max-w-[150px] truncate"
                    title={
                      checkoutData.appliedPromoNames.join(" + ") ||
                      "Promo Active"
                    }
                  >
                    {checkoutData.appliedPromoNames.join(" + ") ||
                      "Promo Active"}
                  </span>
                  <span>
                    -{" "}
                    {formatCurrencyDisplay({
                      value: checkoutData.dynamicDiscountDisplay,
                      curr: checkoutData.totalObj.curr,
                    })}
                  </span>
                </div>
              )}

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
                    <span>
                      - {formatCurrencyDisplay(actualPromoDiscountObj)}
                    </span>
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
                      - {formatCurrencyDisplay(appliedPointDiscountObj)}
                    </span>
                  </div>
                )}
              </div>

              {/* TAMPILAN ONGKOS KIRIM */}
              <div className="flex items-start justify-between pt-4 mt-2 text-gray-500 border-t border-gray-200 border-dashed">
                <span>{t("pay_shipping_cost")}</span>
                {shippingMethod === "free" ? (
                  <span className="font-bold text-emerald-600">
                    {t("pay_method_pickup")}
                  </span>
                ) : shippingMethod === "biteship" && selectedRate ? (
                  <div className="text-right">
                    <span className="block font-medium text-gray-900">
                      {formatCurrencyDisplay({
                        value: parseFloat(selectedRate.price),
                        curr: "IDR",
                      })}
                    </span>
                    <p className="mt-1 text-[10px] text-gray-400">
                      Flat Rate (Semua Item)
                    </p>
                  </div>
                ) : (
                  <span className="text-[10px] italic">
                    {t("choose_method")}
                  </span>
                )}
              </div>

              <div className="flex justify-between pt-4 font-bold text-gray-900 border-t border-gray-200">
                <span className="mt-1 text-xs tracking-widest uppercase">
                  {t("pay_grand_total")}
                </span>
                <span className="text-xl text-gycora">
                  {formatCurrencyDisplay(grandTotalObj)}
                </span>
              </div>

              {/* 👇 [PERBAIKAN] MENGGUNAKAN DYNAMIC BUTTON CLASS UNTUK A/B TESTING 👇 */}
              <button
                onClick={handlePayment}
                disabled={isButtonDisabled}
                className={`flex items-center justify-center w-full gap-3 py-4 mt-8 text-xs font-bold tracking-[0.3em] uppercase transition-all duration-300 shadow-xl rounded-2xl disabled:bg-gray-300 disabled:shadow-none ${buttonStyleClass}`}
              >
                {!isProcessing
                  ? abVariant === "B"
                    ? "Tuntaskan Pesanan (Varian Merah)"
                    : "Tuntaskan Pesanan (Varian Hitam)"
                  : t("pay_btn_processing")}
              </button>

              {/* Teks edukasi agar Bos paham (Bisa dihapus nanti jika sudah production) */}
              <p className="text-[9px] text-center text-gray-400 mt-2 italic">
                A/B Test Variant: <strong>{abVariant}</strong>. (Reload dari
                browser rahasia/incognito untuk melihat warna lain).
              </p>

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

        {/* --- MODAL FORM ALAMAT DENGAN PETA --- */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-10 pb-10 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fade-in-up">
            <div className="flex flex-col w-full max-w-5xl my-auto overflow-hidden bg-white shadow-2xl rounded-3xl">
              <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50 shrink-0">
                <h3 className="text-xl font-extrabold tracking-tight text-gray-900">
                  {editingId
                    ? t("modal_edit_address_title")
                    : t("modal_add_address_title")}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100"
                >
                  <svg
                    className="w-5 h-5"
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
              <div className="flex flex-col md:flex-row h-auto md:h-[650px] overflow-hidden">
                {/* BAGIAN PETA (KIRI) */}
                <div className="relative w-full bg-gray-100 border-b border-gray-200 h-72 md:h-full md:w-5/12 md:border-b-0 md:border-r shrink-0">
                  <MapContainer
                    center={mapPosition}
                    zoom={15}
                    style={{ height: "100%", width: "100%" }}
                    scrollWheelZoom={true}
                  >
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
                      <svg
                        className="w-4 h-4 text-[#006A4E]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                    {t("btn_use_current_location")}
                  </button>
                </div>

                {/* BAGIAN FORM (KANAN) */}
                <form
                  onSubmit={handleSubmitAddress}
                  className="flex flex-col flex-1 p-6 space-y-6 overflow-y-auto bg-white sm:p-8 custom-scrollbar"
                >
                  <div className="flex gap-3 p-4 border border-blue-100 rounded-2xl bg-blue-50/50">
                    <svg
                      className="w-5 h-5 text-blue-500 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-xs leading-relaxed text-blue-800">
                      {t("guide_map_text")}
                    </p>
                  </div>
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <div>
                        <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                          {t("label_first_name")}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.first_name_address}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              first_name_address: e.target.value,
                            })
                          }
                          className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                          {t("label_last_name")}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.last_name_address}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              last_name_address: e.target.value,
                            })
                          }
                          className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        {t("label_address_type")}
                      </label>
                      <select
                        value={formData.location_type}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            location_type: e.target.value,
                          })
                        }
                        className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none bg-white transition-all"
                      >
                        <option value="home">{t("option_home")}</option>
                        <option value="office">{t("option_office")}</option>
                        <option value="other">{t("option_other")}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        {t("label_full_address")}
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder={t("placeholder_full_address")}
                        value={formData.address_location}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            address_location: e.target.value,
                          })
                        }
                        className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none resize-none bg-white transition-all"
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                          {t("label_region")}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.region}
                          onChange={(e) =>
                            setFormData({ ...formData, region: e.target.value })
                          }
                          className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                          {t("label_city")}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                          }
                          className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                          {t("label_province")}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.province}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              province: e.target.value,
                            })
                          }
                          className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                          {t("label_postal_code")}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.postal_code}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              postal_code: e.target.value,
                            })
                          }
                          className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
                        />
                      </div>
                    </div>
                    <input type="hidden" value={formData.latitude} />
                    <input type="hidden" value={formData.longitude} />
                    <div
                      className="flex items-center gap-3 p-4 mt-2 transition-colors border border-gray-200 cursor-pointer rounded-xl bg-gray-50 hover:bg-gray-100"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          is_default: !formData.is_default,
                        })
                      }
                    >
                      <input
                        type="checkbox"
                        id="is_default"
                        checked={formData.is_default}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            is_default: e.target.checked,
                          })
                        }
                        className="w-5 h-5 rounded cursor-pointer text-[#006A4E] focus:ring-[#006A4E] accent-[#006A4E]"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <label
                        htmlFor="is_default"
                        className="text-sm font-bold text-gray-800 cursor-pointer select-none"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t("label_set_default_address")}
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-6 mt-auto border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-3 text-sm font-bold text-gray-600 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200"
                    >
                      {t("btn_cancel")}
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 text-sm font-bold text-white transition-all shadow-md bg-[#006A4E] rounded-xl hover:bg-emerald-900 hover:shadow-lg"
                    >
                      {editingId
                        ? t("btn_update_address")
                        : t("btn_save_address")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
