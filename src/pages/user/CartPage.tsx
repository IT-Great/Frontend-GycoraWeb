// /* eslint-disable no-empty */
// /* eslint-disable @typescript-eslint/no-unused-vars */

// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { useState, useEffect, useMemo, useRef } from "react";

// import { useNavigate } from "react-router-dom";

// import Swal from "sweetalert2";

// import { useCart, type Product } from "../../context/CartContext";

// import { BASE_URL } from "../../config/api";

// import { useLanguage } from "../../context/LanguageContext";

// import { useCurrency } from "../../context/CurrencyContext";

// interface CartItem {
//   id: number;

//   product_id: number;

//   product_slug: string;

//   product: Product;

//   quantity: number;

//   gross_amount: number;

//   color?: string | null;
// }

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

// export default function CartPage() {
//   const navigate = useNavigate();

//   const { t } = useLanguage();

//   // 👇 Tarik exchangeRates dari Context untuk Auto-Fallback

//   const { currency, exchangeRates } = useCurrency() as any;

//   const {
//     cartItems: contextCartItems,

//     fetchCart,

//     removeCartItemOptimistically,

//     updateCartItemQtyOptimistically,

//     revertCartItems,
//   } = useCart() as any;

//   const [localCartItems, setLocalCartItems] = useState<CartItem[]>([]);

//   const [selectedIds, setSelectedIds] = useState<number[]>([]);

//   const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

//   const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

//   const [rawSuggestedPool, setRawSuggestedPool] = useState<Product[]>([]);

//   const [catalogProducts, setCatalogProducts] = useState<any[]>([]); // Untuk referensi harga terupdate

//   const [loadingSuggestions, setLoadingSuggestions] = useState(true);

//   const [qtyInputs, setQtyInputs] = useState<{ [key: number]: string }>({});

//   const [userType, setUserType] = useState<string>("guest");

//   const debounceTimers = useRef<{ [key: number]: number }>({});

//   const getUrlPrefix = () => {
//     if (location.pathname.startsWith("/id")) return "/id";

//     if (location.pathname.startsWith("/en")) return "/en";

//     return "";
//   };

//   const urlPrefix = getUrlPrefix();

//   useEffect(() => {
//     const userStr = localStorage.getItem("user_data");

//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);

//         setUserType(user.usertype || "user");
//       } catch (e) {
//         setUserType("guest");
//       }
//     }
//   }, []);

//   useEffect(() => {
//     setLocalCartItems(contextCartItems);

//     const initialInputs: { [key: number]: string } = {};

//     contextCartItems.forEach((item: CartItem) => {
//       initialInputs[item.id] = item.quantity.toString();
//     });

//     setQtyInputs(initialInputs);
//   }, [contextCartItems]);

//   useEffect(() => {
//     setSelectedIds((prev) =>
//       prev.filter((id) => localCartItems.some((item) => item.id === id)),
//     );
//   }, [localCartItems]);

//   const isAllSelected =
//     localCartItems.length > 0 && selectedIds.length === localCartItems.length;

//   const handleSelectAll = () => {
//     if (isAllSelected) setSelectedIds([]);
//     else setSelectedIds(localCartItems.map((item) => item.id));
//   };

//   const handleSelectItem = (id: number) => {
//     setSelectedIds((prev) =>
//       prev.includes(id)
//         ? prev.filter((itemId) => itemId !== id)
//         : [...prev, id],
//     );
//   };

//   const selectedTotalQuantity = useMemo(() => {
//     return localCartItems

//       .filter((item) => selectedIds.includes(item.id))

//       .reduce((sum, item) => sum + item.quantity, 0);
//   }, [localCartItems, selectedIds]);

//   // ============================================================================

//   // FUNGSI HELPER MULTI-CURRENCY DENGAN AUTO-FALLBACK

//   // ============================================================================

//   const convertIDRtoActiveCurrency = (idrAmount: number) => {
//     const curr = (currency as Currency) || "IDR";

//     if (curr === "IDR" || !exchangeRates || !exchangeRates[curr])
//       return { value: idrAmount, curr: "IDR" };

//     return { value: idrAmount * exchangeRates[curr], curr: curr };
//   };

//   const getPriceToDisplay = (product: Product | null) => {
//     if (!product) return { value: 0, curr: "IDR" };

//     const curr = (currency as Currency) || "IDR";

//     const basePrice = Number(product.price) || 0;

//     if (curr === "IDR") return { value: basePrice, curr: "IDR" };

//     try {
//       const pricesObj =
//         typeof product.prices === "string"
//           ? JSON.parse(product.prices)
//           : product.prices || {};

//       const dbPrice =
//         pricesObj[curr] ||
//         pricesObj[curr.toLowerCase()] ||
//         pricesObj[curr.toUpperCase()];

//       if (dbPrice) return { value: parseFloat(dbPrice), curr: curr };
//     } catch (e) {}

//     return convertIDRtoActiveCurrency(basePrice);
//   };

//   const getDiscountToDisplay = (product: Product | null) => {
//     if (!product) return null;

//     const curr = (currency as Currency) || "IDR";

//     const baseDisc = Number(product.discount_price) || 0;

//     if (curr === "IDR")
//       return baseDisc > 0 ? { value: baseDisc, curr: "IDR" } : null;

//     try {
//       const discObj =
//         typeof product.discount_prices === "string"
//           ? JSON.parse(product.discount_prices)
//           : product.discount_prices || {};

//       const dbDisc =
//         discObj[curr] ||
//         discObj[curr.toLowerCase()] ||
//         discObj[curr.toUpperCase()];

//       if (dbDisc) return { value: parseFloat(dbDisc), curr: curr };
//     } catch (e) {}

//     return baseDisc > 0 ? convertIDRtoActiveCurrency(baseDisc) : null;
//   };

//   const getWholesaleToDisplay = (product: Product | null) => {
//     if (!product) return null;

//     const curr = (currency as Currency) || "IDR";

//     const baseWholesale = Number(product.wholesale_price) || 0;

//     if (curr === "IDR")
//       return baseWholesale > 0 ? { value: baseWholesale, curr: "IDR" } : null;

//     try {
//       const wholesaleObj =
//         typeof product.wholesale_price === "string"
//           ? JSON.parse(product.wholesale_price)
//           : product.wholesale_price || {};

//       const dbWholesale =
//         wholesaleObj[curr] ||
//         wholesaleObj[curr.toLowerCase()] ||
//         wholesaleObj[curr.toUpperCase()];

//       if (dbWholesale) return { value: parseFloat(dbWholesale), curr: curr };
//     } catch (e) {}

//     return baseWholesale > 0 ? convertIDRtoActiveCurrency(baseWholesale) : null;
//   };

//   const getActivePriceObj = (product: Product, totalQty: number) => {
//     const isReseller = userType === "reseller";

//     const dynamicPriceObj = getPriceToDisplay(product);

//     const dynamicDiscountObj = getDiscountToDisplay(product);

//     const dynamicWholesaleObj = getWholesaleToDisplay(product);

//     const hasWholesale = dynamicWholesaleObj && dynamicWholesaleObj.value > 0;

//     if (isReseller && hasWholesale && totalQty >= 24) {
//       return dynamicWholesaleObj!;
//     } else if (
//       dynamicDiscountObj &&
//       dynamicDiscountObj.value > 0 &&
//       dynamicDiscountObj.value < dynamicPriceObj.value
//     ) {
//       return dynamicDiscountObj;
//     }

//     return dynamicPriceObj;
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

//   // Memastikan data produk selalu fresh

//   const getFreshProduct = (cartProduct: any) => {
//     if (catalogProducts.length > 0 && cartProduct) {
//       const fresh = catalogProducts.find(
//         (p) => p.id === cartProduct.id || p.id === cartProduct.product_id,
//       );

//       if (fresh) return fresh;
//     }

//     return cartProduct;
//   };

//   const checkoutTotalAmountObj = useMemo(() => {
//     const curr = (currency as Currency) || "IDR";

//     const totalValue = localCartItems

//       .filter((item) => selectedIds.includes(item.id))

//       .reduce((total, item) => {
//         const freshProd = getFreshProduct(item.product);

//         const activePriceObj = getActivePriceObj(
//           freshProd,

//           selectedTotalQuantity,
//         );

//         return total + activePriceObj.value * item.quantity;
//       }, 0);

//     return { value: totalValue, curr: curr };
//   }, [
//     localCartItems,

//     selectedIds,

//     userType,

//     selectedTotalQuantity,

//     currency,

//     catalogProducts,
//   ]);

//   const handleQtyChange = (item: CartItem, newQty: number) => {
//     if (newQty < 1) newQty = 1;

//     if (newQty > item.product.stock) {
//       Swal.fire({
//         toast: true,

//         position: "top-end",

//         icon: "warning",

//         title: t("cart_max_stock_warning", {
//           stock: item.product.stock.toString(),
//         }),

//         showConfirmButton: false,

//         timer: 2000,
//       });

//       newQty = item.product.stock;
//     }

//     const token = localStorage.getItem("user_token");

//     const originalItems = [...localCartItems];

//     setLocalCartItems((prevItems) =>
//       prevItems.map((cartItem) =>
//         cartItem.id === item.id ? { ...cartItem, quantity: newQty } : cartItem,
//       ),
//     );

//     updateCartItemQtyOptimistically(item.id, newQty, 0);

//     setQtyInputs((prev) => ({ ...prev, [item.id]: newQty.toString() }));

//     if (debounceTimers.current[item.id])
//       window.clearTimeout(debounceTimers.current[item.id]);

//     debounceTimers.current[item.id] = window.setTimeout(async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/carts/${item.id}`, {
//           method: "PUT",

//           headers: {
//             "Content-Type": "application/json",

//             Accept: "application/json",

//             Authorization: `Bearer ${token}`,
//           },

//           body: JSON.stringify({ quantity: newQty }),
//         });

//         if (!res.ok) {
//           const err = await res.json();

//           Swal.fire(
//             t("notification"),

//             err.message || t("cart_update_fail"),

//             "warning",
//           );

//           revertCartItems(originalItems);

//           fetchCart();
//         }
//       } catch (error) {
//         Swal.fire(t("error"), t("cart_server_error"), "error");

//         revertCartItems(originalItems);

//         fetchCart();
//       }
//     }, 800);
//   };

//   const handleInputChange = (itemId: number, value: string) => {
//     if (value === "" || /^\d+$/.test(value))
//       setQtyInputs((prev) => ({ ...prev, [itemId]: value }));
//   };

//   const handleInputBlur = (item: CartItem) => {
//     let parsed = parseInt(qtyInputs[item.id]);

//     if (isNaN(parsed) || parsed < 1) parsed = 1;

//     handleQtyChange(item, parsed);
//   };

//   const handleOptimisticDelete = async (id: number) => {
//     const token = localStorage.getItem("user_token");

//     const originalItems = [...localCartItems];

//     setLocalCartItems((prevItems) =>
//       prevItems.filter((item) => item.id !== id),
//     );

//     setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));

//     removeCartItemOptimistically(id);

//     if (debounceTimers.current[id]) {
//       window.clearTimeout(debounceTimers.current[id]);

//       delete debounceTimers.current[id];
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts/${id}`, {
//         method: "DELETE",

//         headers: {
//           Accept: "application/json",

//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) {
//         revertCartItems(originalItems);

//         Swal.fire(t("notification"), t("cart_delete_fail"), "warning");

//         fetchCart();
//       }
//     } catch (error) {
//       revertCartItems(originalItems);

//       Swal.fire(t("error"), t("cart_delete_fail"), "error");
//     }
//   };

//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);

//         const data = await res.json();

//         const products: any[] = data.data ? data.data : data;

//         setCatalogProducts(products); // Simpan semua data katalog fresh

//         const available = products.filter((p) => p.stock > 0);

//         const shuffled = available.sort(() => 0.5 - Math.random());

//         setRawSuggestedPool(shuffled);
//       } catch (error) {
//         console.error("Gagal memuat rekomendasi:", error);
//       } finally {
//         setLoadingSuggestions(false);
//       }
//     };

//     fetchSuggestions();
//   }, []);

//   useEffect(() => {
//     const cartProductIds = localCartItems.map((item) => item.product_id);

//     const finalSuggestions = rawSuggestedPool

//       .filter((p) => !cartProductIds.includes(p.id))

//       .slice(0, 4);

//     setSuggestedProducts(finalSuggestions);
//   }, [localCartItems, rawSuggestedPool]);

//   const addSuggestedProduct = async (product: Product) => {
//     const token = localStorage.getItem("user_token");

//     if (!token) {
//       navigate(`${urlPrefix}/login`);

//       return;
//     }

//     if (Array.isArray(product.color) && product.color.length > 0) {
//       navigate(`${urlPrefix}/product/${product.slug}`);

//       return;
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",

//         headers: {
//           "Content-Type": "application/json",

//           Accept: "application/json",

//           Authorization: `Bearer ${token}`,
//         },

//         body: JSON.stringify({ product_id: product.slug, quantity: 1 }),
//       });

//       if (res.ok) {
//         Swal.fire({
//           title: t("added_to_cart"),

//           icon: "success",

//           toast: true,

//           position: "top-end",

//           timer: 1500,

//           showConfirmButton: false,
//         });

//         fetchCart();
//       }
//     } catch (error) {}
//   };

//   const handleCheckout = () => {
//     if (selectedIds.length === 0) return;

//     setIsProcessingCheckout(true);

//     setTimeout(() => {
//       setIsProcessingCheckout(false);

//       navigate(`${urlPrefix}/checkout`, {
//         state: { selectedIds: selectedIds },
//       });
//     }, 800);
//   };

//   return (
//     <div className="w-full min-h-screen px-4 py-16 mx-auto overflow-x-hidden font-sans bg-gray-100 max-w-7xl sm:px-6 lg:px-8">
//       <div className="flex items-center gap-4 mb-10 animate-fade-in-up">
//         <button
//           onClick={() => navigate(`${urlPrefix}/products`)}
//           className="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50"
//         >
//           <svg
//             className="w-5 h-5 text-gray-600"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth="2"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M15 19l-7-7 7-7"
//             />
//           </svg>
//         </button>

//         <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
//           {t("cart_title")}
//         </h1>

//         <span className="ml-2 text-xl font-medium text-gray-400">
//           {t("cart_items_count", { count: localCartItems.length.toString() })}
//         </span>
//       </div>

//       <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
//         <div
//           className="flex-grow lg:w-2/3 animate-fade-in-up"
//           style={{ animationDelay: "100ms" }}
//         >
//           {userType === "reseller" && localCartItems.length > 0 && (
//             <div
//               className={`p-4 mb-6 border rounded-2xl flex items-center justify-between transition-all duration-500 ${selectedTotalQuantity >= 24 ? "bg-blue-600 border-blue-700 text-white shadow-lg" : "bg-blue-50 border-blue-200 text-blue-900"}`}
//             >
//               <div>
//                 <h3 className="text-sm font-bold md:text-base">
//                   {selectedTotalQuantity >= 24
//                     ? "🎉 Harga Grosir Aktif!"
//                     : "Aktifkan Harga Grosir"}
//                 </h3>

//                 <p
//                   className={`text-xs md:text-sm mt-1 ${selectedTotalQuantity >= 24 ? "text-blue-100" : "text-blue-700"}`}
//                 >
//                   {selectedTotalQuantity >= 24
//                     ? `Luar biasa! Anda membeli ${selectedTotalQuantity} item dan menikmati harga modal pabrik.`
//                     : `Centang atau tambah ${24 - selectedTotalQuantity} barang lagi untuk mendapatkan harga reseller.`}
//                 </p>
//               </div>

//               <div className="pl-4 shrink-0">
//                 <div
//                   className={`flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border-4 ${selectedTotalQuantity >= 24 ? "border-white bg-blue-500" : "border-blue-300 bg-white"}`}
//                 >
//                   <span
//                     className={`font-black text-sm md:text-lg ${selectedTotalQuantity >= 24 ? "text-white" : "text-blue-600"}`}
//                   >
//                     {selectedTotalQuantity}/24
//                   </span>
//                 </div>
//               </div>
//             </div>
//           )}

//           {localCartItems.length === 0 ? (
//             <div className="py-20 text-center border border-gray-200 border-dashed rounded-3xl bg-gray-50">
//               <p className="mb-6 text-2xl font-medium text-gray-400">
//                 {t("cart_empty_title")}
//               </p>

//               <button
//                 onClick={() => navigate(`${urlPrefix}/collections/all`)}
//                 className="px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition bg-gray-900 rounded-full shadow-xl hover:bg-black shadow-gray-200"
//               >
//                 {t("btn_start_shopping")}
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

//                 <label
//                   htmlFor="selectAll"
//                   className="text-xs font-bold tracking-widest text-gray-800 uppercase cursor-pointer select-none"
//                 >
//                   {t("cart_select_all")}
//                 </label>
//               </div>

//               <div className="space-y-8">
//                 {localCartItems.map((item: CartItem) => {
//                   const freshProd = getFreshProduct(item.product);

//                   const activePriceObj = getActivePriceObj(
//                     freshProd,

//                     selectedTotalQuantity,
//                   );

//                   const basePriceObj = getPriceToDisplay(freshProd);

//                   const isDiscounted =
//                     activePriceObj.value < basePriceObj.value;

//                   const isWholesaleActive =
//                     userType === "reseller" &&
//                     getWholesaleToDisplay(freshProd) !== null &&
//                     selectedTotalQuantity >= 24;

//                   const currentGrossAmountObj = {
//                     value: activePriceObj.value * item.quantity,

//                     curr: activePriceObj.curr,
//                   };

//                   const originalGrossAmountObj = {
//                     value: basePriceObj.value * item.quantity,

//                     curr: basePriceObj.curr,
//                   };

//                   return (
//                     <div
//                       key={item.id}
//                       className="relative flex items-start gap-4 pb-8 border-b border-gray-50 sm:gap-6 last:border-0 last:pb-0"
//                     >
//                       <div className="pt-3 sm:pt-12">
//                         <input
//                           type="checkbox"
//                           checked={selectedIds.includes(item.id)}
//                           onChange={() => handleSelectItem(item.id)}
//                           className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora"
//                         />
//                       </div>

//                       <div
//                         className="relative w-24 h-24 overflow-hidden border border-gray-100 cursor-pointer shrink-0 sm:w-40 sm:h-40 rounded-2xl bg-gray-50"
//                         onClick={() =>
//                           navigate(`${urlPrefix}/product/${freshProd.slug}`)
//                         }
//                       >
//                         <img
//                           src={freshProd.image_url}
//                           alt={freshProd.name}
//                           className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
//                         />

//                         {isDiscounted && (
//                           <div
//                             className={`absolute px-2 py-0.5 text-[9px] font-bold text-white top-2 left-2 rounded shadow-sm ${isWholesaleActive ? "bg-blue-600" : "bg-rose-500"}`}
//                           >
//                             {isWholesaleActive
//                               ? "GROSIR"
//                               : t("cart_sale_badge")}
//                           </div>
//                         )}
//                       </div>

//                       <div className="flex flex-col justify-between flex-grow min-h-[6rem] sm:min-h-[10rem]">
//                         <div>
//                           <div className="flex items-start justify-between gap-2">
//                             <h3
//                               className="w-2/3 text-sm font-bold tracking-tight text-gray-900 transition-colors cursor-pointer sm:text-lg hover:text-gycora line-clamp-2"
//                               onClick={() =>
//                                 navigate(
//                                   `${urlPrefix}/product/${freshProd.slug}`,
//                                 )
//                               }
//                             >
//                               {freshProd.name}
//                             </h3>

//                             <div className="text-right">
//                               <p
//                                 className={`text-sm font-extrabold sm:text-lg whitespace-nowrap ${isWholesaleActive ? "text-blue-600" : "text-gycora"}`}
//                               >
//                                 {formatCurrencyDisplay(currentGrossAmountObj)}
//                               </p>

//                               {isDiscounted && (
//                                 <p className="text-[10px] text-gray-400 line-through">
//                                   {formatCurrencyDisplay(
//                                     originalGrossAmountObj,
//                                   )}
//                                 </p>
//                               )}
//                             </div>
//                           </div>

//                           {item.color &&
//                             (() => {
//                               let hex = item.color as string;

//                               let name = "";

//                               try {
//                                 const parsed = JSON.parse(item.color as string);

//                                 if (parsed.hex) {
//                                   hex = parsed.hex;

//                                   name = parsed.name || "";
//                                 }
//                               } catch {
//                                 if (Array.isArray(freshProd.color)) {
//                                   const matched = freshProd.color.find(
//                                     (c: any) =>
//                                       (typeof c === "object" &&
//                                         c !== null &&
//                                         c.hex === item.color) ||
//                                       c === item.color,
//                                   );

//                                   if (
//                                     matched &&
//                                     typeof matched === "object" &&
//                                     matched !== null
//                                   ) {
//                                     name =
//                                       (matched as { name?: string }).name || "";
//                                   }
//                                 }
//                               }

//                               return (
//                                 <div className="flex items-center gap-2 mt-2">
//                                   <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
//                                     {t("cart_variant_label")}
//                                   </span>

//                                   <div className="flex items-center gap-2 px-2 py-1 bg-white border border-gray-200 rounded-md shadow-sm">
//                                     <span
//                                       className="w-3 h-3 border border-gray-300 rounded-full shadow-inner shrink-0"
//                                       style={{ backgroundColor: hex }}
//                                     ></span>

//                                     <span className="text-[10px] font-bold text-gray-700">
//                                       {name ? (
//                                         name
//                                       ) : (
//                                         <span className="font-mono uppercase">
//                                           {hex}
//                                         </span>
//                                       )}
//                                     </span>
//                                   </div>
//                                 </div>
//                               );
//                             })()}

//                           <div className="flex flex-wrap items-center mt-2 gap-x-3 gap-y-1">
//                             {isDiscounted ? (
//                               <div className="flex items-center gap-2">
//                                 <p
//                                   className={`text-xs font-bold ${isWholesaleActive ? "text-blue-500" : "text-rose-500"}`}
//                                 >
//                                   {formatCurrencyDisplay(activePriceObj)}{" "}
//                                   {t("cart_per_pc")}
//                                 </p>

//                                 <p className="text-[10px] text-gray-400 line-through">
//                                   {formatCurrencyDisplay(basePriceObj)}
//                                 </p>
//                               </div>
//                             ) : (
//                               <p className="text-xs italic tracking-wider text-gray-400">
//                                 {formatCurrencyDisplay(basePriceObj)}{" "}
//                                 {t("cart_per_pc")}
//                               </p>
//                             )}
//                           </div>
//                         </div>

//                         <div className="flex flex-col items-start gap-4 mt-4 sm:flex-row sm:justify-between sm:items-end sm:mt-6">
//                           {/* <div className="flex items-center h-10 overflow-hidden bg-white border border-gray-200 shadow-sm sm:h-12 rounded-xl">

//                             <button onClick={() => { const newVal = Math.max(1, parseInt(qtyInputs[item.id] !== undefined ? qtyInputs[item.id] : item.quantity.toString()) || 1 - 1); handleQtyChange(item, newVal); }} disabled={isProcessingCheckout} className="flex items-center justify-center w-10 h-full text-base font-bold text-gray-700 transition-colors sm:w-12 hover:bg-gray-100 hover:text-gycora">-</button>

//                             <input type="text" value={qtyInputs[item.id] !== undefined ? qtyInputs[item.id] : item.quantity} onChange={(e) => handleInputChange(item.id, e.target.value)} onBlur={() => handleInputBlur(item)} disabled={isProcessingCheckout} className="w-12 h-full text-sm font-bold text-center text-gray-900 bg-transparent border-none outline-none focus:ring-0 sm:text-base" />

//                             <button onClick={() => { const newVal = Math.min(freshProd.stock, parseInt(qtyInputs[item.id] !== undefined ? qtyInputs[item.id] : item.quantity.toString()) || 1 + 1); handleQtyChange(item, newVal); }} disabled={isProcessingCheckout} className="flex items-center justify-center w-10 h-full text-base font-bold text-gray-700 transition-colors sm:w-12 hover:bg-gray-100 hover:text-gycora">+</button>

//                           </div> */}

//                           <div className="flex items-center h-10 overflow-hidden bg-white border border-gray-200 shadow-sm sm:h-12 rounded-xl">
//                             <button
//                               onClick={() => {
//                                 const currentVal =
//                                   parseInt(
//                                     qtyInputs[item.id] !== undefined
//                                       ? qtyInputs[item.id]
//                                       : String(item.quantity),
//                                   ) || 1;

//                                 const newVal = Math.max(1, currentVal - 1);

//                                 handleQtyChange(item, newVal);
//                               }}
//                               disabled={isProcessingCheckout}
//                               className="flex items-center justify-center w-10 h-full text-base font-bold text-gray-700 transition-colors sm:w-12 hover:bg-gray-100 hover:text-gycora focus:outline-none"
//                             >
//                               -
//                             </button>

//                             <input
//                               type="text"
//                               value={
//                                 qtyInputs[item.id] !== undefined
//                                   ? qtyInputs[item.id]
//                                   : item.quantity
//                               }
//                               onChange={(e) =>
//                                 handleInputChange(item.id, e.target.value)
//                               }
//                               onBlur={() => handleInputBlur(item)}
//                               disabled={isProcessingCheckout}
//                               className="w-12 h-full text-sm font-bold text-center text-gray-900 bg-transparent border-none outline-none focus:ring-0 sm:text-base"
//                             />

//                             <button
//                               onClick={() => {
//                                 const currentVal =
//                                   parseInt(
//                                     qtyInputs[item.id] !== undefined
//                                       ? qtyInputs[item.id]
//                                       : String(item.quantity),
//                                   ) || 1;

//                                 const newVal = Math.min(
//                                   freshProd.stock,

//                                   currentVal + 1,
//                                 );

//                                 handleQtyChange(item, newVal);
//                               }}
//                               disabled={isProcessingCheckout}
//                               className="flex items-center justify-center w-10 h-full text-base font-bold text-gray-700 transition-colors sm:w-12 hover:bg-gray-100 hover:text-gycora focus:outline-none"
//                             >
//                               +
//                             </button>
//                           </div>

//                           <button
//                             onClick={() => handleOptimisticDelete(item.id)}
//                             className="flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest text-gray-400 uppercase transition-colors group hover:text-red-500"
//                           >
//                             <svg
//                               className="w-4 h-4 transition-transform sm:w-5 sm:h-5 group-hover:rotate-12"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke="currentColor"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                               />
//                             </svg>{" "}
//                             {t("btn_remove")}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* SUGGESTED PRODUCTS */}

//           <div className="pt-12 mt-12 border-t border-gray-100">
//             <h3 className="mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase">
//               {t("cart_suggest_title")}
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
//                 {suggestedProducts.map((product) => {
//                   const sugActivePriceObj = getActivePriceObj(
//                     product,

//                     selectedTotalQuantity,
//                   );

//                   const sugBasePriceObj = getPriceToDisplay(product);

//                   const isSugDiscounted =
//                     sugActivePriceObj.value < sugBasePriceObj.value;

//                   const isSugWholesale =
//                     userType === "reseller" &&
//                     getWholesaleToDisplay(product) !== null &&
//                     selectedTotalQuantity >= 24;

//                   return (
//                     <div key={product.id} className="flex flex-col group">
//                       <div
//                         className="relative mb-3 overflow-hidden border border-gray-100 cursor-pointer aspect-square rounded-2xl bg-gray-50"
//                         onClick={() =>
//                           navigate(`${urlPrefix}/product/${product.slug}`, {
//                             state: {
//                               initialProduct: product,

//                               allProducts: suggestedProducts,
//                             },
//                           })
//                         }
//                       >
//                         <img
//                           src={product.image_url}
//                           alt={product.name}
//                           className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
//                         />

//                         {isSugDiscounted && (
//                           <div
//                             className={`absolute px-2 py-0.5 text-[9px] font-bold text-white top-2 left-2 rounded shadow-sm ${isSugWholesale ? "bg-blue-600" : "bg-rose-500"}`}
//                           >
//                             {isSugWholesale ? "GROSIR" : t("cart_sale_badge")}
//                           </div>
//                         )}
//                       </div>

//                       <h4 className="mb-1 text-[11px] font-bold tracking-wide text-gray-900 uppercase truncate">
//                         {product.name}
//                       </h4>

//                       {isSugDiscounted ? (
//                         <div className="mb-3">
//                           <p
//                             className={`text-xs font-bold ${isSugWholesale ? "text-blue-500" : "text-rose-500"}`}
//                           >
//                             {formatCurrencyDisplay(sugActivePriceObj)}
//                           </p>

//                           <p className="text-[9px] text-gray-400 line-through">
//                             {formatCurrencyDisplay(sugBasePriceObj)}
//                           </p>
//                         </div>
//                       ) : (
//                         <p className="mb-3 text-xs font-bold text-gycora">
//                           {formatCurrencyDisplay(sugBasePriceObj)}
//                         </p>
//                       )}

//                       <button
//                         onClick={() => addSuggestedProduct(product)}
//                         className="px-3 py-2 mt-auto text-[9px] font-bold tracking-widest text-gray-700 uppercase transition-all duration-300 border border-gray-200 rounded-xl hover:border-gray-900 hover:bg-gray-900 hover:text-white"
//                       >
//                         {Array.isArray(product.color) &&
//                         product.color.length > 0
//                           ? t("btn_choose_variant")
//                           : t("btn_add_plus")}
//                       </button>
//                     </div>
//                   );
//                 })}
//               </div>
//             ) : null}
//           </div>
//         </div>

//         {/* RIGHT SIDE: CART SUMMARY */}

//         {localCartItems.length > 0 && (
//           <div
//             className="lg:w-1/3 animate-fade-in-up"
//             style={{ animationDelay: "200ms" }}
//           >
//             <div className="sticky p-8 bg-gray-50/50 border border-gray-100 rounded-[2rem] top-32 shadow-sm">
//               <h2 className="pb-4 mb-8 text-lg font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">
//                 {t("cart_summary_title")}
//               </h2>

//               <div className="mb-8 space-y-4">
//                 <div className="flex justify-between text-sm text-gray-600">
//                   <span>{t("cart_selected_items")}</span>

//                   <span className="font-bold text-gray-900">
//                     {selectedTotalQuantity} Pcs
//                   </span>
//                 </div>

//                 <div className="flex items-end justify-between pt-4 border-t border-gray-200">
//                   <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
//                     {t("cart_estimated_total")}
//                   </span>

//                   <span className="text-2xl font-black text-gycora">
//                     {formatCurrencyDisplay(checkoutTotalAmountObj)}
//                   </span>
//                 </div>

//                 <p className="mt-1 text-right text-[10px] italic text-gray-400">
//                   {t("cart_tax_shipping_note")}
//                 </p>
//               </div>

//               <button
//                 onClick={handleCheckout}
//                 disabled={isProcessingCheckout || selectedIds.length === 0}
//                 className="flex items-center justify-center w-full gap-3 py-5 text-sm font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/20"
//               >
//                 {!isProcessingCheckout ? (
//                   t("btn_checkout", { count: selectedIds.length.toString() })
//                 ) : (
//                   <span className="flex items-center gap-2">
//                     <div className="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"></div>

//                     {t("cart_processing")}
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

// /* eslint-disable no-empty */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { useState, useEffect, useMemo, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart, type Product } from "../../context/CartContext";
// import { BASE_URL } from "../../config/api";
// import { useLanguage } from "../../context/LanguageContext";
// import { useCurrency } from "../../context/CurrencyContext";

// interface CartItem {
//   id: number;
//   product_id: number;
//   product_slug: string;
//   product: Product;
//   quantity: number;
//   gross_amount: number;
//   color?: string | null;
// }

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

// export default function CartPage() {
//   const navigate = useNavigate();
//   const { t } = useLanguage();
//   const { currency, exchangeRates } = useCurrency() as any;

//   const {
//     cartItems: contextCartItems,
//     fetchCart,
//     removeCartItemOptimistically,
//     updateCartItemQtyOptimistically,
//     revertCartItems,
//   } = useCart() as any;

//   const [localCartItems, setLocalCartItems] = useState<CartItem[]>([]);
//   const [selectedIds, setSelectedIds] = useState<number[]>([]);
//   const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
//   const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
//   const [rawSuggestedPool, setRawSuggestedPool] = useState<Product[]>([]);
//   const [catalogProducts, setCatalogProducts] = useState<any[]>([]);
//   const [loadingSuggestions, setLoadingSuggestions] = useState(true);
//   const [qtyInputs, setQtyInputs] = useState<{ [key: number]: string }>({});
//   const [userType, setUserType] = useState<string>("guest");
//   const debounceTimers = useRef<{ [key: number]: number }>({});

//   const getUrlPrefix = () => {
//     if (location.pathname.startsWith("/id")) return "/id";
//     if (location.pathname.startsWith("/en")) return "/en";
//     return "";
//   };

//   const urlPrefix = getUrlPrefix();

//   useEffect(() => {
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);
//         setUserType(user.usertype || "user");
//       } catch (e) {
//         setUserType("guest");
//       }
//     }
//   }, []);

//   useEffect(() => {
//     setLocalCartItems(contextCartItems);
//     const initialInputs: { [key: number]: string } = {};
//     contextCartItems.forEach((item: CartItem) => {
//       initialInputs[item.id] = item.quantity.toString();
//     });
//     setQtyInputs(initialInputs);
//   }, [contextCartItems]);

//   useEffect(() => {
//     setSelectedIds((prev) =>
//       prev.filter((id) => localCartItems.some((item) => item.id === id)),
//     );
//   }, [localCartItems]);

//   const isAllSelected =
//     localCartItems.length > 0 && selectedIds.length === localCartItems.length;

//   const handleSelectAll = () => {
//     if (isAllSelected) setSelectedIds([]);
//     else setSelectedIds(localCartItems.map((item) => item.id));
//   };

//   const handleSelectItem = (id: number) => {
//     setSelectedIds((prev) =>
//       prev.includes(id)
//         ? prev.filter((itemId) => itemId !== id)
//         : [...prev, id],
//     );
//   };

//   const selectedTotalQuantity = useMemo(() => {
//     return localCartItems
//       .filter((item) => selectedIds.includes(item.id))
//       .reduce((sum, item) => sum + item.quantity, 0);
//   }, [localCartItems, selectedIds]);

//   // ============================================================================
//   // FUNGSI HELPER MULTI-CURRENCY DENGAN AUTO-FALLBACK
//   // ============================================================================

//   const convertIDRtoActiveCurrency = (idrAmount: number) => {
//     const curr = (currency as Currency) || "IDR";
//     if (curr === "IDR" || !exchangeRates || !exchangeRates[curr])
//       return { value: idrAmount, curr: "IDR" };
//     return { value: idrAmount * exchangeRates[curr], curr: curr };
//   };

//   const getPriceToDisplay = (product: Product | null) => {
//     if (!product) return { value: 0, curr: "IDR" };
//     const curr = (currency as Currency) || "IDR";
//     const basePrice = Number(product.price) || 0;

//     if (curr === "IDR") return { value: basePrice, curr: "IDR" };
//     try {
//       const pricesObj = typeof product.prices === "string" ? JSON.parse(product.prices) : product.prices || {};
//       const dbPrice = pricesObj[curr] || pricesObj[curr.toLowerCase()] || pricesObj[curr.toUpperCase()];
//       if (dbPrice) return { value: parseFloat(dbPrice), curr: curr };
//     } catch (e) {}
//     return convertIDRtoActiveCurrency(basePrice);
//   };

//   const getDiscountToDisplay = (product: Product | null) => {
//     if (!product) return null;
//     const curr = (currency as Currency) || "IDR";
//     const baseDisc = Number(product.discount_price) || 0;

//     if (curr === "IDR") return baseDisc > 0 ? { value: baseDisc, curr: "IDR" } : null;
//     try {
//       const discObj = typeof product.discount_prices === "string" ? JSON.parse(product.discount_prices) : product.discount_prices || {};
//       const dbDisc = discObj[curr] || discObj[curr.toLowerCase()] || discObj[curr.toUpperCase()];
//       if (dbDisc) return { value: parseFloat(dbDisc), curr: curr };
//     } catch (e) {}
//     return baseDisc > 0 ? convertIDRtoActiveCurrency(baseDisc) : null;
//   };

//   const getWholesaleToDisplay = (product: Product | null) => {
//     if (!product) return null;
//     const curr = (currency as Currency) || "IDR";
//     const baseWholesale = Number(product.wholesale_price) || 0;

//     if (curr === "IDR") return baseWholesale > 0 ? { value: baseWholesale, curr: "IDR" } : null;
//     try {
//       const wholesaleObj = typeof product.wholesale_price === "string" ? JSON.parse(product.wholesale_price) : (product as any).wholesale_prices || {};
//       const dbWholesale = wholesaleObj[curr] || wholesaleObj[curr.toLowerCase()] || wholesaleObj[curr.toUpperCase()];
//       if (dbWholesale) return { value: parseFloat(dbWholesale), curr: curr };
//     } catch (e) {}
//     return baseWholesale > 0 ? convertIDRtoActiveCurrency(baseWholesale) : null;
//   };

//   // 👇 Helper Baru untuk Bundle Display
//   const getBundleToDisplay = (product: Product | null) => {
//     if (!product) return null;
//     const curr = (currency as Currency) || "IDR";
//     const baseBundle = Number(product.bundle_price) || 0;

//     if (curr === "IDR") return baseBundle > 0 ? { value: baseBundle, curr: "IDR" } : null;
//     try {
//       const bundleObj = typeof product.bundle_prices === "string" ? JSON.parse(product.bundle_prices) : product.bundle_prices || {};
//       const dbBundle = bundleObj[curr] || bundleObj[curr.toLowerCase()] || bundleObj[curr.toUpperCase()];
//       if (dbBundle) return { value: parseFloat(dbBundle), curr: curr };
//     } catch (e) {}
//     return baseBundle > 0 ? convertIDRtoActiveCurrency(baseBundle) : null;
//   };

//   const getActivePriceObj = (product: Product, totalQty: number) => {
//     const isReseller = userType === "reseller";
//     const dynamicPriceObj = getPriceToDisplay(product);
//     const dynamicDiscountObj = getDiscountToDisplay(product);
//     const dynamicWholesaleObj = getWholesaleToDisplay(product);
//     const dynamicBundleObj = getBundleToDisplay(product);

//     const hasWholesale = dynamicWholesaleObj && dynamicWholesaleObj.value > 0;

//     // Validasi apakah bundle aktif dan tanggal end_date valid
//     const isBundleValid = product.is_bundle_active &&
//                           (!product.bundle_end_date || new Date(product.bundle_end_date) > new Date());

//     if (isReseller && hasWholesale && totalQty >= 24) {
//       return dynamicWholesaleObj!;
//     } else if (isBundleValid && dynamicBundleObj && dynamicBundleObj.value > 0) {
//       return dynamicBundleObj;
//     } else if (dynamicDiscountObj && dynamicDiscountObj.value > 0 && dynamicDiscountObj.value < dynamicPriceObj.value) {
//       return dynamicDiscountObj;
//     }

//     return dynamicPriceObj;
//   };

//   const formatCurrencyDisplay = (priceObj: { value: number; curr: string } | null) => {
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

//   const getFreshProduct = (cartProduct: any) => {
//     if (catalogProducts.length > 0 && cartProduct) {
//       const fresh = catalogProducts.find(
//         (p) => p.id === cartProduct.id || p.id === cartProduct.product_id,
//       );
//       if (fresh) return fresh;
//     }
//     return cartProduct;
//   };

//   const checkoutTotalAmountObj = useMemo(() => {
//     const curr = (currency as Currency) || "IDR";
//     const totalValue = localCartItems
//       .filter((item) => selectedIds.includes(item.id))
//       .reduce((total, item) => {
//         const freshProd = getFreshProduct(item.product);
//         const activePriceObj = getActivePriceObj(freshProd, selectedTotalQuantity);
//         return total + activePriceObj.value * item.quantity;
//       }, 0);
//     return { value: totalValue, curr: curr };
//   }, [localCartItems, selectedIds, userType, selectedTotalQuantity, currency, catalogProducts]);

//   const handleQtyChange = (item: CartItem, newQty: number) => {
//     if (newQty < 1) newQty = 1;
//     if (newQty > item.product.stock) {
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "warning",
//         title: t("cart_max_stock_warning", { stock: item.product.stock.toString() }),
//         showConfirmButton: false,
//         timer: 2000,
//       });
//       newQty = item.product.stock;
//     }

//     const token = localStorage.getItem("user_token");
//     const originalItems = [...localCartItems];

//     setLocalCartItems((prevItems) =>
//       prevItems.map((cartItem) =>
//         cartItem.id === item.id ? { ...cartItem, quantity: newQty } : cartItem,
//       ),
//     );
//     updateCartItemQtyOptimistically(item.id, newQty, 0);
//     setQtyInputs((prev) => ({ ...prev, [item.id]: newQty.toString() }));

//     if (debounceTimers.current[item.id]) window.clearTimeout(debounceTimers.current[item.id]);

//     debounceTimers.current[item.id] = window.setTimeout(async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/carts/${item.id}`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ quantity: newQty }),
//         });

//         if (!res.ok) {
//           const err = await res.json();
//           Swal.fire(t("notification"), err.message || t("cart_update_fail"), "warning");
//           revertCartItems(originalItems);
//           fetchCart();
//         }
//       } catch (error) {
//         Swal.fire(t("error"), t("cart_server_error"), "error");
//         revertCartItems(originalItems);
//         fetchCart();
//       }
//     }, 800);
//   };

//   const handleInputChange = (itemId: number, value: string) => {
//     if (value === "" || /^\d+$/.test(value))
//       setQtyInputs((prev) => ({ ...prev, [itemId]: value }));
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
//       window.clearTimeout(debounceTimers.current[id]);
//       delete debounceTimers.current[id];
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts/${id}`, {
//         method: "DELETE",
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (!res.ok) {
//         revertCartItems(originalItems);
//         Swal.fire(t("notification"), t("cart_delete_fail"), "warning");
//         fetchCart();
//       }
//     } catch (error) {
//       revertCartItems(originalItems);
//       Swal.fire(t("error"), t("cart_delete_fail"), "error");
//     }
//   };

//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         const data = await res.json();
//         const products: any[] = data.data ? data.data : data;

//         setCatalogProducts(products);

//         const available = products.filter((p) => p.stock > 0);
//         const shuffled = available.sort(() => 0.5 - Math.random());
//         setRawSuggestedPool(shuffled);
//       } catch (error) {
//         console.error("Gagal memuat rekomendasi:", error);
//       } finally {
//         setLoadingSuggestions(false);
//       }
//     };
//     fetchSuggestions();
//   }, []);

//   useEffect(() => {
//     const cartProductIds = localCartItems.map((item) => item.product_id);
//     const finalSuggestions = rawSuggestedPool
//       .filter((p) => !cartProductIds.includes(p.id))
//       .slice(0, 4);
//     setSuggestedProducts(finalSuggestions);
//   }, [localCartItems, rawSuggestedPool]);

//   const addSuggestedProduct = async (product: Product) => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       navigate(`${urlPrefix}/login`);
//       return;
//     }

//     if (Array.isArray(product.color) && product.color.length > 0) {
//       navigate(`${urlPrefix}/product/${product.slug}`);
//       return;
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ product_id: product.id, quantity: 1 }), // FIXED: Changed slug to id as per validation
//       });

//       if (res.ok) {
//         Swal.fire({
//           title: t("added_to_cart"),
//           icon: "success",
//           toast: true,
//           position: "top-end",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         fetchCart();
//       }
//     } catch (error) {}
//   };

//   const handleCheckout = () => {
//     if (selectedIds.length === 0) return;
//     setIsProcessingCheckout(true);

//     setTimeout(() => {
//       setIsProcessingCheckout(false);
//       navigate(`${urlPrefix}/checkout`, {
//         state: { selectedIds: selectedIds },
//       });
//     }, 800);
//   };

//   return (
//     <div className="w-full min-h-screen px-4 py-16 mx-auto overflow-x-hidden font-sans bg-gray-100 max-w-7xl sm:px-6 lg:px-8">
//       <div className="flex items-center gap-4 mb-10 animate-fade-in-up">
//         <button
//           onClick={() => navigate(`${urlPrefix}/products`)}
//           className="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50"
//         >
//           <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//         <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
//           {t("cart_title")}
//         </h1>
//         <span className="ml-2 text-xl font-medium text-gray-400">
//           {t("cart_items_count", { count: localCartItems.length.toString() })}
//         </span>
//       </div>

//       <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
//         <div className="flex-grow lg:w-2/3 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
//           {userType === "reseller" && localCartItems.length > 0 && (
//             <div className={`p-4 mb-6 border rounded-2xl flex items-center justify-between transition-all duration-500 ${selectedTotalQuantity >= 24 ? "bg-blue-600 border-blue-700 text-white shadow-lg" : "bg-blue-50 border-blue-200 text-blue-900"}`}>
//               <div>
//                 <h3 className="text-sm font-bold md:text-base">
//                   {selectedTotalQuantity >= 24 ? "🎉 Harga Grosir Aktif!" : "Aktifkan Harga Grosir"}
//                 </h3>
//                 <p className={`text-xs md:text-sm mt-1 ${selectedTotalQuantity >= 24 ? "text-blue-100" : "text-blue-700"}`}>
//                   {selectedTotalQuantity >= 24
//                     ? `Luar biasa! Anda membeli ${selectedTotalQuantity} item dan menikmati harga modal pabrik.`
//                     : `Centang atau tambah ${24 - selectedTotalQuantity} barang lagi untuk mendapatkan harga reseller.`}
//                 </p>
//               </div>
//               <div className="pl-4 shrink-0">
//                 <div className={`flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border-4 ${selectedTotalQuantity >= 24 ? "border-white bg-blue-500" : "border-blue-300 bg-white"}`}>
//                   <span className={`font-black text-sm md:text-lg ${selectedTotalQuantity >= 24 ? "text-white" : "text-blue-600"}`}>
//                     {selectedTotalQuantity}/24
//                   </span>
//                 </div>
//               </div>
//             </div>
//           )}

//           {localCartItems.length === 0 ? (
//             <div className="py-20 text-center border border-gray-200 border-dashed rounded-3xl bg-gray-50">
//               <p className="mb-6 text-2xl font-medium text-gray-400">{t("cart_empty_title")}</p>
//               <button
//                 onClick={() => navigate(`${urlPrefix}/collections/all`)}
//                 className="px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition bg-gray-900 rounded-full shadow-xl hover:bg-black shadow-gray-200"
//               >
//                 {t("btn_start_shopping")}
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
//                   {t("cart_select_all")}
//                 </label>
//               </div>

//               <div className="space-y-8">
//                 {localCartItems.map((item: CartItem) => {
//                   const freshProd = getFreshProduct(item.product);
//                   const activePriceObj = getActivePriceObj(freshProd, selectedTotalQuantity);
//                   const basePriceObj = getPriceToDisplay(freshProd);
//                   const isDiscounted = activePriceObj.value < basePriceObj.value;

//                   const isWholesaleActive =
//                     userType === "reseller" &&
//                     getWholesaleToDisplay(freshProd) !== null &&
//                     selectedTotalQuantity >= 24;

//                   // 👇 Pengecekan status untuk menampilkan tag Bundle
//                   const isBundleActive =
//                     freshProd.is_bundle_active &&
//                     (!freshProd.bundle_end_date || new Date(freshProd.bundle_end_date) > new Date()) &&
//                     getBundleToDisplay(freshProd) !== null &&
//                     !isWholesaleActive; // Prioritaskan grosir

//                   const currentGrossAmountObj = {
//                     value: activePriceObj.value * item.quantity,
//                     curr: activePriceObj.curr,
//                   };
//                   const originalGrossAmountObj = {
//                     value: basePriceObj.value * item.quantity,
//                     curr: basePriceObj.curr,
//                   };

//                   return (
//                     <div key={item.id} className="relative flex items-start gap-4 pb-8 border-b border-gray-50 sm:gap-6 last:border-0 last:pb-0">
//                       <div className="pt-3 sm:pt-12">
//                         <input
//                           type="checkbox"
//                           checked={selectedIds.includes(item.id)}
//                           onChange={() => handleSelectItem(item.id)}
//                           className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora"
//                         />
//                       </div>
//                       <div
//                         className="relative w-24 h-24 overflow-hidden border border-gray-100 cursor-pointer shrink-0 sm:w-40 sm:h-40 rounded-2xl bg-gray-50"
//                         onClick={() => navigate(`${urlPrefix}/product/${freshProd.slug}`)}
//                       >
//                         <img src={freshProd.image_url} alt={freshProd.name} className="object-cover w-full h-full transition-transform duration-500 hover:scale-105" />

//                         {/* 👇 Tag Dinamis Berdasarkan Harga yang Aktif */}
//                         {isDiscounted && (
//                           <div className={`absolute px-2 py-0.5 text-[9px] font-bold text-white top-2 left-2 rounded shadow-sm
//                             ${isWholesaleActive ? "bg-blue-600" : isBundleActive ? "bg-purple-600" : "bg-rose-500"}`}
//                           >
//                             {isWholesaleActive ? "GROSIR" : isBundleActive ? "BUNDLE" : t("cart_sale_badge")}
//                           </div>
//                         )}
//                       </div>

//                       <div className="flex flex-col justify-between flex-grow min-h-[6rem] sm:min-h-[10rem]">
//                         <div>
//                           <div className="flex items-start justify-between gap-2">
//                             <h3
//                               className="w-2/3 text-sm font-bold tracking-tight text-gray-900 transition-colors cursor-pointer sm:text-lg hover:text-gycora line-clamp-2"
//                               onClick={() => navigate(`${urlPrefix}/product/${freshProd.slug}`)}
//                             >
//                               {freshProd.name}
//                             </h3>
//                             <div className="text-right">
//                               <p className={`text-sm font-extrabold sm:text-lg whitespace-nowrap ${isWholesaleActive ? "text-blue-600" : isBundleActive ? "text-purple-600" : "text-gycora"}`}>
//                                 {formatCurrencyDisplay(currentGrossAmountObj)}
//                               </p>
//                               {isDiscounted && (
//                                 <p className="text-[10px] text-gray-400 line-through">
//                                   {formatCurrencyDisplay(originalGrossAmountObj)}
//                                 </p>
//                               )}
//                             </div>
//                           </div>

//                           {item.color && (() => {
//                             let hex = item.color as string;
//                             let name = "";
//                             try {
//                               const parsed = JSON.parse(item.color as string);
//                               if (parsed.hex) {
//                                 hex = parsed.hex;
//                                 name = parsed.name || "";
//                               }
//                             } catch {
//                               if (Array.isArray(freshProd.color)) {
//                                 const matched = freshProd.color.find(
//                                   (c: any) => (typeof c === "object" && c !== null && c.hex === item.color) || c === item.color
//                                 );
//                                 if (matched && typeof matched === "object" && matched !== null) {
//                                   name = (matched as { name?: string }).name || "";
//                                 }
//                               }
//                             }
//                             return (
//                               <div className="flex items-center gap-2 mt-2">
//                                 <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">{t("cart_variant_label")}</span>
//                                 <div className="flex items-center gap-2 px-2 py-1 bg-white border border-gray-200 rounded-md shadow-sm">
//                                   <span className="w-3 h-3 border border-gray-300 rounded-full shadow-inner shrink-0" style={{ backgroundColor: hex }}></span>
//                                   <span className="text-[10px] font-bold text-gray-700">
//                                     {name ? name : <span className="font-mono uppercase">{hex}</span>}
//                                   </span>
//                                 </div>
//                               </div>
//                             );
//                           })()}

//                           <div className="flex flex-wrap items-center mt-2 gap-x-3 gap-y-1">
//                             {isDiscounted ? (
//                               <div className="flex items-center gap-2">
//                                 <p className={`text-xs font-bold ${isWholesaleActive ? "text-blue-500" : isBundleActive ? "text-purple-500" : "text-rose-500"}`}>
//                                   {formatCurrencyDisplay(activePriceObj)} {t("cart_per_pc")}
//                                 </p>
//                                 <p className="text-[10px] text-gray-400 line-through">
//                                   {formatCurrencyDisplay(basePriceObj)}
//                                 </p>
//                               </div>
//                             ) : (
//                               <p className="text-xs italic tracking-wider text-gray-400">
//                                 {formatCurrencyDisplay(basePriceObj)} {t("cart_per_pc")}
//                               </p>
//                             )}
//                           </div>
//                         </div>

//                         <div className="flex flex-col items-start gap-4 mt-4 sm:flex-row sm:justify-between sm:items-end sm:mt-6">
//                           <div className="flex items-center h-10 overflow-hidden bg-white border border-gray-200 shadow-sm sm:h-12 rounded-xl">
//                             <button
//                               onClick={() => {
//                                 const currentVal = parseInt(qtyInputs[item.id] !== undefined ? qtyInputs[item.id] : String(item.quantity)) || 1;
//                                 const newVal = Math.max(1, currentVal - 1);
//                                 handleQtyChange(item, newVal);
//                               }}
//                               disabled={isProcessingCheckout}
//                               className="flex items-center justify-center w-10 h-full text-base font-bold text-gray-700 transition-colors sm:w-12 hover:bg-gray-100 hover:text-gycora focus:outline-none"
//                             >
//                               -
//                             </button>
//                             <input
//                               type="text"
//                               value={qtyInputs[item.id] !== undefined ? qtyInputs[item.id] : item.quantity}
//                               onChange={(e) => handleInputChange(item.id, e.target.value)}
//                               onBlur={() => handleInputBlur(item)}
//                               disabled={isProcessingCheckout}
//                               className="w-12 h-full text-sm font-bold text-center text-gray-900 bg-transparent border-none outline-none focus:ring-0 sm:text-base"
//                             />
//                             <button
//                               onClick={() => {
//                                 const currentVal = parseInt(qtyInputs[item.id] !== undefined ? qtyInputs[item.id] : String(item.quantity)) || 1;
//                                 const newVal = Math.min(freshProd.stock, currentVal + 1);
//                                 handleQtyChange(item, newVal);
//                               }}
//                               disabled={isProcessingCheckout}
//                               className="flex items-center justify-center w-10 h-full text-base font-bold text-gray-700 transition-colors sm:w-12 hover:bg-gray-100 hover:text-gycora focus:outline-none"
//                             >
//                               +
//                             </button>
//                           </div>
//                           <button
//                             onClick={() => handleOptimisticDelete(item.id)}
//                             className="flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest text-gray-400 uppercase transition-colors group hover:text-red-500"
//                           >
//                             <svg className="w-4 h-4 transition-transform sm:w-5 sm:h-5 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                             </svg>
//                             {t("btn_remove")}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* SUGGESTED PRODUCTS */}
//           <div className="pt-12 mt-12 border-t border-gray-100">
//             <h3 className="mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase">
//               {t("cart_suggest_title")}
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
//                 {suggestedProducts.map((product) => {
//                   const sugActivePriceObj = getActivePriceObj(product, selectedTotalQuantity);
//                   const sugBasePriceObj = getPriceToDisplay(product);
//                   const isSugDiscounted = sugActivePriceObj.value < sugBasePriceObj.value;

//                   const isSugWholesale =
//                     userType === "reseller" &&
//                     getWholesaleToDisplay(product) !== null &&
//                     selectedTotalQuantity >= 24;

//                   const isSugBundle =
//                     product.is_bundle_active &&
//                     (!product.bundle_end_date || new Date(product.bundle_end_date) > new Date()) &&
//                     getBundleToDisplay(product) !== null &&
//                     !isSugWholesale;

//                   return (
//                     <div key={product.id} className="flex flex-col group">
//                       <div
//                         className="relative mb-3 overflow-hidden border border-gray-100 cursor-pointer aspect-square rounded-2xl bg-gray-50"
//                         onClick={() => navigate(`${urlPrefix}/product/${product.slug}`, {
//                           state: { initialProduct: product, allProducts: suggestedProducts },
//                         })}
//                       >
//                         <img src={product.image_url} alt={product.name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />

//                         {isSugDiscounted && (
//                           <div className={`absolute px-2 py-0.5 text-[9px] font-bold text-white top-2 left-2 rounded shadow-sm
//                             ${isSugWholesale ? "bg-blue-600" : isSugBundle ? "bg-purple-600" : "bg-rose-500"}`}
//                           >
//                             {isSugWholesale ? "GROSIR" : isSugBundle ? "BUNDLE" : t("cart_sale_badge")}
//                           </div>
//                         )}
//                       </div>
//                       <h4 className="mb-1 text-[11px] font-bold tracking-wide text-gray-900 uppercase truncate">
//                         {product.name}
//                       </h4>
//                       {isSugDiscounted ? (
//                         <div className="mb-3">
//                           <p className={`text-xs font-bold ${isSugWholesale ? "text-blue-500" : isSugBundle ? "text-purple-500" : "text-rose-500"}`}>
//                             {formatCurrencyDisplay(sugActivePriceObj)}
//                           </p>
//                           <p className="text-[9px] text-gray-400 line-through">
//                             {formatCurrencyDisplay(sugBasePriceObj)}
//                           </p>
//                         </div>
//                       ) : (
//                         <p className="mb-3 text-xs font-bold text-gycora">
//                           {formatCurrencyDisplay(sugBasePriceObj)}
//                         </p>
//                       )}
//                       <button
//                         onClick={() => addSuggestedProduct(product)}
//                         className="px-3 py-2 mt-auto text-[9px] font-bold tracking-widest text-gray-700 uppercase transition-all duration-300 border border-gray-200 rounded-xl hover:border-gray-900 hover:bg-gray-900 hover:text-white"
//                       >
//                         {Array.isArray(product.color) && product.color.length > 0 ? t("btn_choose_variant") : t("btn_add_plus")}
//                       </button>
//                     </div>
//                   );
//                 })}
//               </div>
//             ) : null}
//           </div>
//         </div>

//         {/* RIGHT SIDE: CART SUMMARY */}
//         {localCartItems.length > 0 && (
//           <div className="lg:w-1/3 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//             <div className="sticky p-8 bg-gray-50/50 border border-gray-100 rounded-[2rem] top-32 shadow-sm">
//               <h2 className="pb-4 mb-8 text-lg font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">
//                 {t("cart_summary_title")}
//               </h2>
//               <div className="mb-8 space-y-4">
//                 <div className="flex justify-between text-sm text-gray-600">
//                   <span>{t("cart_selected_items")}</span>
//                   <span className="font-bold text-gray-900">{selectedTotalQuantity} Pcs</span>
//                 </div>
//                 <div className="flex items-end justify-between pt-4 border-t border-gray-200">
//                   <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
//                     {t("cart_estimated_total")}
//                   </span>
//                   <span className="text-2xl font-black text-gycora">
//                     {formatCurrencyDisplay(checkoutTotalAmountObj)}
//                   </span>
//                 </div>
//                 <p className="mt-1 text-right text-[10px] italic text-gray-400">
//                   {t("cart_tax_shipping_note")}
//                 </p>
//               </div>
//               <button
//                 onClick={handleCheckout}
//                 disabled={isProcessingCheckout || selectedIds.length === 0}
//                 className="flex items-center justify-center w-full gap-3 py-5 text-sm font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/20"
//               >
//                 {!isProcessingCheckout ? (
//                   t("btn_checkout", { count: selectedIds.length.toString() })
//                 ) : (
//                   <span className="flex items-center gap-2">
//                     <div className="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"></div>
//                     {t("cart_processing")}
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

// /* eslint-disable no-empty */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { useState, useEffect, useMemo, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart, type Product } from "../../context/CartContext";
// import { BASE_URL } from "../../config/api";
// import { useLanguage } from "../../context/LanguageContext";
// import { useCurrency } from "../../context/CurrencyContext";

// interface CartItem {
//   id: number;
//   product_id: number;
//   product_slug: string;
//   product: Product;
//   quantity: number;
//   gross_amount: number;
//   color?: string | null;
// }

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

// export default function CartPage() {
//   const navigate = useNavigate();
//   const { t } = useLanguage();
//   const { currency, exchangeRates } = useCurrency() as any;

//   const {
//     cartItems: contextCartItems,
//     fetchCart,
//     removeCartItemOptimistically,
//     updateCartItemQtyOptimistically,
//     revertCartItems,
//   } = useCart() as any;

//   const [localCartItems, setLocalCartItems] = useState<CartItem[]>([]);
//   const [selectedIds, setSelectedIds] = useState<number[]>([]);
//   const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
//   const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
//   const [rawSuggestedPool, setRawSuggestedPool] = useState<Product[]>([]);
//   const [catalogProducts, setCatalogProducts] = useState<any[]>([]);
//   const [loadingSuggestions, setLoadingSuggestions] = useState(true);
//   const [qtyInputs, setQtyInputs] = useState<{ [key: number]: string }>({});
//   const [userType, setUserType] = useState<string>("guest");
//   const debounceTimers = useRef<{ [key: number]: number }>({});

//   const getUrlPrefix = () => {
//     if (location.pathname.startsWith("/id")) return "/id";
//     if (location.pathname.startsWith("/en")) return "/en";
//     return "";
//   };

//   const urlPrefix = getUrlPrefix();

//   useEffect(() => {
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);
//         setUserType(user.usertype || "user");
//       } catch (e) {
//         setUserType("guest");
//       }
//     }
//   }, []);

//   useEffect(() => {
//     setLocalCartItems(contextCartItems);
//     const initialInputs: { [key: number]: string } = {};
//     contextCartItems.forEach((item: CartItem) => {
//       initialInputs[item.id] = item.quantity.toString();
//     });
//     setQtyInputs(initialInputs);
//   }, [contextCartItems]);

//   useEffect(() => {
//     setSelectedIds((prev) =>
//       prev.filter((id) => localCartItems.some((item) => item.id === id)),
//     );
//   }, [localCartItems]);

//   const isAllSelected =
//     localCartItems.length > 0 && selectedIds.length === localCartItems.length;

//   const handleSelectAll = () => {
//     if (isAllSelected) setSelectedIds([]);
//     else setSelectedIds(localCartItems.map((item) => item.id));
//   };

//   const handleSelectItem = (id: number) => {
//     setSelectedIds((prev) =>
//       prev.includes(id)
//         ? prev.filter((itemId) => itemId !== id)
//         : [...prev, id],
//     );
//   };

//   const selectedTotalQuantity = useMemo(() => {
//     return localCartItems
//       .filter((item) => selectedIds.includes(item.id))
//       .reduce((sum, item) => sum + item.quantity, 0);
//   }, [localCartItems, selectedIds]);

//   // ============================================================================
//   // FUNGSI HELPER MULTI-CURRENCY
//   // ============================================================================

//   const convertIDRtoActiveCurrency = (idrAmount: number) => {
//     const curr = (currency as Currency) || "IDR";
//     if (curr === "IDR" || !exchangeRates || !exchangeRates[curr])
//       return { value: idrAmount, curr: "IDR" };
//     return { value: idrAmount * exchangeRates[curr], curr: curr };
//   };

//   const getPriceToDisplay = (product: Product | null) => {
//     if (!product) return { value: 0, curr: "IDR" };
//     const curr = (currency as Currency) || "IDR";
//     const basePrice = Number(product.price) || 0;

//     if (curr === "IDR") return { value: basePrice, curr: "IDR" };
//     try {
//       const pricesObj = typeof product.prices === "string" ? JSON.parse(product.prices) : product.prices || {};
//       const dbPrice = pricesObj[curr] || pricesObj[curr.toLowerCase()] || pricesObj[curr.toUpperCase()];
//       if (dbPrice) return { value: parseFloat(dbPrice), curr: curr };
//     } catch (e) {}
//     return convertIDRtoActiveCurrency(basePrice);
//   };

//   const getDiscountToDisplay = (product: Product | null) => {
//     if (!product) return null;
//     const curr = (currency as Currency) || "IDR";
//     const baseDisc = Number(product.discount_price) || 0;

//     if (curr === "IDR") return baseDisc > 0 ? { value: baseDisc, curr: "IDR" } : null;
//     try {
//       const discObj = typeof product.discount_prices === "string" ? JSON.parse(product.discount_prices) : product.discount_prices || {};
//       const dbDisc = discObj[curr] || discObj[curr.toLowerCase()] || discObj[curr.toUpperCase()];
//       if (dbDisc) return { value: parseFloat(dbDisc), curr: curr };
//     } catch (e) {}
//     return baseDisc > 0 ? convertIDRtoActiveCurrency(baseDisc) : null;
//   };

//   const getWholesaleToDisplay = (product: Product | null) => {
//     if (!product) return null;
//     const curr = (currency as Currency) || "IDR";
//     const baseWholesale = Number(product.wholesale_price) || 0;

//     if (curr === "IDR") return baseWholesale > 0 ? { value: baseWholesale, curr: "IDR" } : null;
//     try {
//       const wholesaleObj = typeof product.wholesale_price === "string" ? JSON.parse(product.wholesale_price) : (product as any).wholesale_prices || {};
//       const dbWholesale = wholesaleObj[curr] || wholesaleObj[curr.toLowerCase()] || wholesaleObj[curr.toUpperCase()];
//       if (dbWholesale) return { value: parseFloat(dbWholesale), curr: curr };
//     } catch (e) {}
//     return baseWholesale > 0 ? convertIDRtoActiveCurrency(baseWholesale) : null;
//   };

//   const getBundleToDisplay = (product: Product | null) => {
//     if (!product) return null;
//     const curr = (currency as Currency) || "IDR";
//     const baseBundle = Number(product.bundle_price) || 0;

//     if (curr === "IDR") return baseBundle > 0 ? { value: baseBundle, curr: "IDR" } : null;
//     try {
//       const bundleObj = typeof product.bundle_prices === "string" ? JSON.parse(product.bundle_prices) : product.bundle_prices || {};
//       const dbBundle = bundleObj[curr] || bundleObj[curr.toLowerCase()] || bundleObj[curr.toUpperCase()];
//       if (dbBundle) return { value: parseFloat(dbBundle), curr: curr };
//     } catch (e) {}
//     return baseBundle > 0 ? convertIDRtoActiveCurrency(baseBundle) : null;
//   };

//   // 👇 PERBAIKAN: Fungsi ini sekarang HANYA mengurus harga normal, diskon, dan grosir per-item
//   const getActivePriceObj = (product: Product, totalQty: number) => {
//     const isReseller = userType === "reseller";
//     const dynamicPriceObj = getPriceToDisplay(product);
//     const dynamicDiscountObj = getDiscountToDisplay(product);
//     const dynamicWholesaleObj = getWholesaleToDisplay(product);

//     const hasWholesale = dynamicWholesaleObj && dynamicWholesaleObj.value > 0;

//     if (isReseller && hasWholesale && totalQty >= 24) {
//       return dynamicWholesaleObj!;
//     } else if (dynamicDiscountObj && dynamicDiscountObj.value > 0 && dynamicDiscountObj.value < dynamicPriceObj.value) {
//       return dynamicDiscountObj;
//     }

//     return dynamicPriceObj;
//   };

//   const formatCurrencyDisplay = (priceObj: { value: number; curr: string } | null) => {
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
//   };

//   // ============================================================================

//   const getFreshProduct = (cartProduct: any) => {
//     if (catalogProducts.length > 0 && cartProduct) {
//       const fresh = catalogProducts.find((p) => p.id === cartProduct.id || p.id === cartProduct.product_id);
//       if (fresh) return fresh;
//     }
//     return cartProduct;
//   };

//   // 👇 PERBAIKAN FATAL: Kalkulasi total checkout dengan Sistem PAIRING BUNDLE
//   const checkoutSummary = useMemo(() => {
//     const curr = (currency as Currency) || "IDR";
//     let totalValue = 0;
//     let appliedBundlesCount = 0;

//     const selectedItems = localCartItems.filter((item) => selectedIds.includes(item.id));
//     const isReseller = userType === "reseller";
//     const isWholesaleGlobal = isReseller && selectedTotalQuantity >= 24;

//     const bundlePool: { product: Product, bundlePrice: number, normalPrice: number }[] = [];

//     selectedItems.forEach((item) => {
//       const freshProd = getFreshProduct(item.product);
//       const qty = item.quantity;
//       const wholesaleObj = getWholesaleToDisplay(freshProd);

//       // Jika user tembus syarat harga Grosir, Bundle diabaikan total
//       if (isWholesaleGlobal && wholesaleObj && wholesaleObj.value > 0) {
//         totalValue += wholesaleObj.value * qty;
//         return;
//       }

//       // Cek apakah produk ini valid untuk ikut dipasangkan menjadi Bundle
//       const bundleObj = getBundleToDisplay(freshProd);
//       const isBundleValid = freshProd.is_bundle_active &&
//                             (!freshProd.bundle_end_date || new Date(freshProd.bundle_end_date) > new Date()) &&
//                             bundleObj && bundleObj.value > 0;

//       const activePriceObj = getActivePriceObj(freshProd, selectedTotalQuantity);

//       if (isBundleValid) {
//         // Masukkan ke kolam per-kuantitas (1 per 1 agar mudah dipasangkan)
//         for (let i = 0; i < qty; i++) {
//           bundlePool.push({
//             product: freshProd,
//             bundlePrice: bundleObj.value,
//             normalPrice: activePriceObj.value
//           });
//         }
//       } else {
//         // Bukan produk bundle, langsung tambahkan harganya
//         totalValue += activePriceObj.value * qty;
//       }
//     });

//     // Proses pencarian Pasangan (Pairs) dari kolam barang Bundle
//     const groupedBundles = bundlePool.reduce((acc: any, item) => {
//       const key = item.bundlePrice;
//       if (!acc[key]) acc[key] = [];
//       acc[key].push(item);
//       return acc;
//     }, {});

//     Object.keys(groupedBundles).forEach((key) => {
//       const items = groupedBundles[key];
//       const pairs = Math.floor(items.length / 2); // 1 pasang = 2 produk
//       const remainder = items.length % 2; // Sisa yang jomblo
//       const bundlePrice = parseFloat(key);

//       // Pasangan mendapatkan harga bundle penuh (misal: 2 produk = 299.000)
//       totalValue += pairs * bundlePrice;
//       appliedBundlesCount += pairs;

//       // Produk sisa yang tidak dapat pasangan dikembalikan ke harga normal/diskonnya
//       for (let i = 0; i < remainder; i++) {
//         totalValue += items[items.length - 1 - i].normalPrice;
//       }
//     });

//     return {
//       totalObj: { value: totalValue, curr: curr },
//       appliedBundlesCount,
//     };
//   }, [localCartItems, selectedIds, userType, selectedTotalQuantity, currency, catalogProducts]);

//   const handleQtyChange = (item: CartItem, newQty: number) => {
//     if (newQty < 1) newQty = 1;
//     if (newQty > item.product.stock) {
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "warning",
//         title: t("cart_max_stock_warning", { stock: item.product.stock.toString() }),
//         showConfirmButton: false,
//         timer: 2000,
//       });
//       newQty = item.product.stock;
//     }

//     const token = localStorage.getItem("user_token");
//     const originalItems = [...localCartItems];

//     setLocalCartItems((prevItems) =>
//       prevItems.map((cartItem) =>
//         cartItem.id === item.id ? { ...cartItem, quantity: newQty } : cartItem,
//       ),
//     );
//     updateCartItemQtyOptimistically(item.id, newQty, 0);
//     setQtyInputs((prev) => ({ ...prev, [item.id]: newQty.toString() }));

//     if (debounceTimers.current[item.id]) window.clearTimeout(debounceTimers.current[item.id]);

//     debounceTimers.current[item.id] = window.setTimeout(async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/carts/${item.id}`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ quantity: newQty }),
//         });

//         if (!res.ok) {
//           const err = await res.json();
//           Swal.fire(t("notification"), err.message || t("cart_update_fail"), "warning");
//           revertCartItems(originalItems);
//           fetchCart();
//         }
//       } catch (error) {
//         Swal.fire(t("error"), t("cart_server_error"), "error");
//         revertCartItems(originalItems);
//         fetchCart();
//       }
//     }, 800);
//   };

//   const handleInputChange = (itemId: number, value: string) => {
//     if (value === "" || /^\d+$/.test(value))
//       setQtyInputs((prev) => ({ ...prev, [itemId]: value }));
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
//       window.clearTimeout(debounceTimers.current[id]);
//       delete debounceTimers.current[id];
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts/${id}`, {
//         method: "DELETE",
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (!res.ok) {
//         revertCartItems(originalItems);
//         Swal.fire(t("notification"), t("cart_delete_fail"), "warning");
//         fetchCart();
//       }
//     } catch (error) {
//       revertCartItems(originalItems);
//       Swal.fire(t("error"), t("cart_delete_fail"), "error");
//     }
//   };

//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         const data = await res.json();
//         const products: any[] = data.data ? data.data : data;

//         setCatalogProducts(products);

//         const available = products.filter((p) => p.stock > 0);
//         const shuffled = available.sort(() => 0.5 - Math.random());
//         setRawSuggestedPool(shuffled);
//       } catch (error) {
//         console.error("Gagal memuat rekomendasi:", error);
//       } finally {
//         setLoadingSuggestions(false);
//       }
//     };
//     fetchSuggestions();
//   }, []);

//   useEffect(() => {
//     const cartProductIds = localCartItems.map((item) => item.product_id);
//     const finalSuggestions = rawSuggestedPool
//       .filter((p) => !cartProductIds.includes(p.id))
//       .slice(0, 4);
//     setSuggestedProducts(finalSuggestions);
//   }, [localCartItems, rawSuggestedPool]);

//   const addSuggestedProduct = async (product: Product) => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       navigate(`${urlPrefix}/login`);
//       return;
//     }

//     if (Array.isArray(product.color) && product.color.length > 0) {
//       navigate(`${urlPrefix}/product/${product.slug}`);
//       return;
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ product_id: product.id, quantity: 1 }),
//       });

//       if (res.ok) {
//         Swal.fire({
//           title: t("added_to_cart"),
//           icon: "success",
//           toast: true,
//           position: "top-end",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         fetchCart();
//       }
//     } catch (error) {}
//   };

//   const handleCheckout = () => {
//     if (selectedIds.length === 0) return;
//     setIsProcessingCheckout(true);

//     setTimeout(() => {
//       setIsProcessingCheckout(false);
//       navigate(`${urlPrefix}/checkout`, {
//         state: { selectedIds: selectedIds },
//       });
//     }, 800);
//   };

//   return (
//     <div className="w-full min-h-screen px-4 py-16 mx-auto overflow-x-hidden font-sans bg-gray-100 max-w-7xl sm:px-6 lg:px-8">
//       <div className="flex items-center gap-4 mb-10 animate-fade-in-up">
//         <button
//           onClick={() => navigate(`${urlPrefix}/products`)}
//           className="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50"
//         >
//           <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//         <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
//           {t("cart_title")}
//         </h1>
//         <span className="ml-2 text-xl font-medium text-gray-400">
//           {t("cart_items_count", { count: localCartItems.length.toString() })}
//         </span>
//       </div>

//       <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
//         <div className="flex-grow lg:w-2/3 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
//           {userType === "reseller" && localCartItems.length > 0 && (
//             <div className={`p-4 mb-6 border rounded-2xl flex items-center justify-between transition-all duration-500 ${selectedTotalQuantity >= 24 ? "bg-blue-600 border-blue-700 text-white shadow-lg" : "bg-blue-50 border-blue-200 text-blue-900"}`}>
//               <div>
//                 <h3 className="text-sm font-bold md:text-base">
//                   {selectedTotalQuantity >= 24 ? "🎉 Harga Grosir Aktif!" : "Aktifkan Harga Grosir"}
//                 </h3>
//                 <p className={`text-xs md:text-sm mt-1 ${selectedTotalQuantity >= 24 ? "text-blue-100" : "text-blue-700"}`}>
//                   {selectedTotalQuantity >= 24
//                     ? `Luar biasa! Anda membeli ${selectedTotalQuantity} item dan menikmati harga modal pabrik.`
//                     : `Centang atau tambah ${24 - selectedTotalQuantity} barang lagi untuk mendapatkan harga reseller.`}
//                 </p>
//               </div>
//               <div className="pl-4 shrink-0">
//                 <div className={`flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border-4 ${selectedTotalQuantity >= 24 ? "border-white bg-blue-500" : "border-blue-300 bg-white"}`}>
//                   <span className={`font-black text-sm md:text-lg ${selectedTotalQuantity >= 24 ? "text-white" : "text-blue-600"}`}>
//                     {selectedTotalQuantity}/24
//                   </span>
//                 </div>
//               </div>
//             </div>
//           )}

//           {localCartItems.length === 0 ? (
//             <div className="py-20 text-center border border-gray-200 border-dashed rounded-3xl bg-gray-50">
//               <p className="mb-6 text-2xl font-medium text-gray-400">{t("cart_empty_title")}</p>
//               <button
//                 onClick={() => navigate(`${urlPrefix}/collections/all`)}
//                 className="px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition bg-gray-900 rounded-full shadow-xl hover:bg-black shadow-gray-200"
//               >
//                 {t("btn_start_shopping")}
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
//                   {t("cart_select_all")}
//                 </label>
//               </div>

//               <div className="space-y-8">
//                 {localCartItems.map((item: CartItem) => {
//                   const freshProd = getFreshProduct(item.product);
//                   const activePriceObj = getActivePriceObj(freshProd, selectedTotalQuantity);
//                   const basePriceObj = getPriceToDisplay(freshProd);
//                   const isDiscounted = activePriceObj.value < basePriceObj.value;

//                   const isWholesaleActive =
//                     userType === "reseller" &&
//                     getWholesaleToDisplay(freshProd) !== null &&
//                     selectedTotalQuantity >= 24;

//                   const currentGrossAmountObj = {
//                     value: activePriceObj.value * item.quantity,
//                     curr: activePriceObj.curr,
//                   };
//                   const originalGrossAmountObj = {
//                     value: basePriceObj.value * item.quantity,
//                     curr: basePriceObj.curr,
//                   };

//                   return (
//                     <div key={item.id} className="relative flex items-start gap-4 pb-8 border-b border-gray-50 sm:gap-6 last:border-0 last:pb-0">
//                       <div className="pt-3 sm:pt-12">
//                         <input
//                           type="checkbox"
//                           checked={selectedIds.includes(item.id)}
//                           onChange={() => handleSelectItem(item.id)}
//                           className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora"
//                         />
//                       </div>
//                       <div
//                         className="relative w-24 h-24 overflow-hidden border border-gray-100 cursor-pointer shrink-0 sm:w-40 sm:h-40 rounded-2xl bg-gray-50"
//                         onClick={() => navigate(`${urlPrefix}/product/${freshProd.slug}`)}
//                       >
//                         <img src={freshProd.image_url} alt={freshProd.name} className="object-cover w-full h-full transition-transform duration-500 hover:scale-105" />

//                         {/* TAG HANYA MENAMPILKAN DISKON/GROSIR. BUNDLE DIHILANGKAN DARI SINI */}
//                         {isDiscounted && (
//                           <div className={`absolute px-2 py-0.5 text-[9px] font-bold text-white top-2 left-2 rounded shadow-sm
//                             ${isWholesaleActive ? "bg-blue-600" : "bg-rose-500"}`}
//                           >
//                             {isWholesaleActive ? "GROSIR" : t("cart_sale_badge")}
//                           </div>
//                         )}
//                       </div>

//                       <div className="flex flex-col justify-between flex-grow min-h-[6rem] sm:min-h-[10rem]">
//                         <div>
//                           <div className="flex items-start justify-between gap-2">
//                             <h3
//                               className="w-2/3 text-sm font-bold tracking-tight text-gray-900 transition-colors cursor-pointer sm:text-lg hover:text-gycora line-clamp-2"
//                               onClick={() => navigate(`${urlPrefix}/product/${freshProd.slug}`)}
//                             >
//                               {freshProd.name}
//                             </h3>
//                             <div className="text-right">
//                               <p className={`text-sm font-extrabold sm:text-lg whitespace-nowrap ${isWholesaleActive ? "text-blue-600" : "text-gycora"}`}>
//                                 {formatCurrencyDisplay(currentGrossAmountObj)}
//                               </p>
//                               {isDiscounted && (
//                                 <p className="text-[10px] text-gray-400 line-through">
//                                   {formatCurrencyDisplay(originalGrossAmountObj)}
//                                 </p>
//                               )}
//                             </div>
//                           </div>

//                           {item.color && (() => {
//                             let hex = item.color as string;
//                             let name = "";
//                             try {
//                               const parsed = JSON.parse(item.color as string);
//                               if (parsed.hex) {
//                                 hex = parsed.hex;
//                                 name = parsed.name || "";
//                               }
//                             } catch {
//                               if (Array.isArray(freshProd.color)) {
//                                 const matched = freshProd.color.find(
//                                   (c: any) => (typeof c === "object" && c !== null && c.hex === item.color) || c === item.color
//                                 );
//                                 if (matched && typeof matched === "object" && matched !== null) {
//                                   name = (matched as { name?: string }).name || "";
//                                 }
//                               }
//                             }
//                             return (
//                               <div className="flex items-center gap-2 mt-2">
//                                 <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">{t("cart_variant_label")}</span>
//                                 <div className="flex items-center gap-2 px-2 py-1 bg-white border border-gray-200 rounded-md shadow-sm">
//                                   <span className="w-3 h-3 border border-gray-300 rounded-full shadow-inner shrink-0" style={{ backgroundColor: hex }}></span>
//                                   <span className="text-[10px] font-bold text-gray-700">
//                                     {name ? name : <span className="font-mono uppercase">{hex}</span>}
//                                   </span>
//                                 </div>
//                               </div>
//                             );
//                           })()}

//                           <div className="flex flex-wrap items-center mt-2 gap-x-3 gap-y-1">
//                             {isDiscounted ? (
//                               <div className="flex items-center gap-2">
//                                 <p className={`text-xs font-bold ${isWholesaleActive ? "text-blue-500" : "text-rose-500"}`}>
//                                   {formatCurrencyDisplay(activePriceObj)} {t("cart_per_pc")}
//                                 </p>
//                                 <p className="text-[10px] text-gray-400 line-through">
//                                   {formatCurrencyDisplay(basePriceObj)}
//                                 </p>
//                               </div>
//                             ) : (
//                               <p className="text-xs italic tracking-wider text-gray-400">
//                                 {formatCurrencyDisplay(basePriceObj)} {t("cart_per_pc")}
//                               </p>
//                             )}
//                           </div>
//                         </div>

//                         <div className="flex flex-col items-start gap-4 mt-4 sm:flex-row sm:justify-between sm:items-end sm:mt-6">
//                           <div className="flex items-center h-10 overflow-hidden bg-white border border-gray-200 shadow-sm sm:h-12 rounded-xl">
//                             <button
//                               onClick={() => {
//                                 const currentVal = parseInt(qtyInputs[item.id] !== undefined ? qtyInputs[item.id] : String(item.quantity)) || 1;
//                                 const newVal = Math.max(1, currentVal - 1);
//                                 handleQtyChange(item, newVal);
//                               }}
//                               disabled={isProcessingCheckout}
//                               className="flex items-center justify-center w-10 h-full text-base font-bold text-gray-700 transition-colors sm:w-12 hover:bg-gray-100 hover:text-gycora focus:outline-none"
//                             >
//                               -
//                             </button>
//                             <input
//                               type="text"
//                               value={qtyInputs[item.id] !== undefined ? qtyInputs[item.id] : item.quantity}
//                               onChange={(e) => handleInputChange(item.id, e.target.value)}
//                               onBlur={() => handleInputBlur(item)}
//                               disabled={isProcessingCheckout}
//                               className="w-12 h-full text-sm font-bold text-center text-gray-900 bg-transparent border-none outline-none focus:ring-0 sm:text-base"
//                             />
//                             <button
//                               onClick={() => {
//                                 const currentVal = parseInt(qtyInputs[item.id] !== undefined ? qtyInputs[item.id] : String(item.quantity)) || 1;
//                                 const newVal = Math.min(freshProd.stock, currentVal + 1);
//                                 handleQtyChange(item, newVal);
//                               }}
//                               disabled={isProcessingCheckout}
//                               className="flex items-center justify-center w-10 h-full text-base font-bold text-gray-700 transition-colors sm:w-12 hover:bg-gray-100 hover:text-gycora focus:outline-none"
//                             >
//                               +
//                             </button>
//                           </div>
//                           <button
//                             onClick={() => handleOptimisticDelete(item.id)}
//                             className="flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest text-gray-400 uppercase transition-colors group hover:text-red-500"
//                           >
//                             <svg className="w-4 h-4 transition-transform sm:w-5 sm:h-5 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                             </svg>
//                             {t("btn_remove")}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* SUGGESTED PRODUCTS - Tampilan Bundle Dihilangkan */}
//           <div className="pt-12 mt-12 border-t border-gray-100">
//             <h3 className="mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase">
//               {t("cart_suggest_title")}
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
//                 {suggestedProducts.map((product) => {
//                   const sugActivePriceObj = getActivePriceObj(product, selectedTotalQuantity);
//                   const sugBasePriceObj = getPriceToDisplay(product);
//                   const isSugDiscounted = sugActivePriceObj.value < sugBasePriceObj.value;

//                   const isSugWholesale =
//                     userType === "reseller" &&
//                     getWholesaleToDisplay(product) !== null &&
//                     selectedTotalQuantity >= 24;

//                   return (
//                     <div key={product.id} className="flex flex-col group">
//                       <div
//                         className="relative mb-3 overflow-hidden border border-gray-100 cursor-pointer aspect-square rounded-2xl bg-gray-50"
//                         onClick={() => navigate(`${urlPrefix}/product/${product.slug}`, {
//                           state: { initialProduct: product, allProducts: suggestedProducts },
//                         })}
//                       >
//                         <img src={product.image_url} alt={product.name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />

//                         {isSugDiscounted && (
//                           <div className={`absolute px-2 py-0.5 text-[9px] font-bold text-white top-2 left-2 rounded shadow-sm
//                             ${isSugWholesale ? "bg-blue-600" : "bg-rose-500"}`}
//                           >
//                             {isSugWholesale ? "GROSIR" : t("cart_sale_badge")}
//                           </div>
//                         )}
//                       </div>
//                       <h4 className="mb-1 text-[11px] font-bold tracking-wide text-gray-900 uppercase truncate">
//                         {product.name}
//                       </h4>
//                       {isSugDiscounted ? (
//                         <div className="mb-3">
//                           <p className={`text-xs font-bold ${isSugWholesale ? "text-blue-500" : "text-rose-500"}`}>
//                             {formatCurrencyDisplay(sugActivePriceObj)}
//                           </p>
//                           <p className="text-[9px] text-gray-400 line-through">
//                             {formatCurrencyDisplay(sugBasePriceObj)}
//                           </p>
//                         </div>
//                       ) : (
//                         <p className="mb-3 text-xs font-bold text-gycora">
//                           {formatCurrencyDisplay(sugBasePriceObj)}
//                         </p>
//                       )}
//                       <button
//                         onClick={() => addSuggestedProduct(product)}
//                         className="px-3 py-2 mt-auto text-[9px] font-bold tracking-widest text-gray-700 uppercase transition-all duration-300 border border-gray-200 rounded-xl hover:border-gray-900 hover:bg-gray-900 hover:text-white"
//                       >
//                         {Array.isArray(product.color) && product.color.length > 0 ? t("btn_choose_variant") : t("btn_add_plus")}
//                       </button>
//                     </div>
//                   );
//                 })}
//               </div>
//             ) : null}
//           </div>
//         </div>

//         {/* RIGHT SIDE: CART SUMMARY - Notifikasi Bundle Dipindah Kesini */}
//         {localCartItems.length > 0 && (
//           <div className="lg:w-1/3 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//             <div className="sticky p-8 bg-gray-50/50 border border-gray-100 rounded-[2rem] top-32 shadow-sm">
//               <h2 className="pb-4 mb-8 text-lg font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">
//                 {t("cart_summary_title")}
//               </h2>
//               <div className="mb-8 space-y-4">
//                 <div className="flex justify-between text-sm text-gray-600">
//                   <span>{t("cart_selected_items")}</span>
//                   <span className="font-bold text-gray-900">{selectedTotalQuantity} Pcs</span>
//                 </div>

//                 {/* 👇 PANEL NOTIFIKASI BUNDLE HANYA TAMPIL DI SINI JIKA SYARAT TERPENUHI (PAIRING) */}
//                 {checkoutSummary.appliedBundlesCount > 0 && (
//                   <div className="flex items-center justify-between p-4 border border-purple-200 rounded-2xl bg-purple-50">
//                     <div className="flex items-center gap-3">
//                       <span className="flex items-center justify-center w-6 h-6 text-xs text-white bg-purple-600 rounded-full shadow-sm">✓</span>
//                       <span className="text-xs font-extrabold tracking-wide text-purple-800 uppercase">Promo Bundle Aktif</span>
//                     </div>
//                     <span className="text-sm font-black text-purple-700">{checkoutSummary.appliedBundlesCount} Paket</span>
//                   </div>
//                 )}

//                 <div className="flex items-end justify-between pt-4 border-t border-gray-200">
//                   <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
//                     {t("cart_estimated_total")}
//                   </span>
//                   <span className="text-2xl font-black text-gycora">
//                     {formatCurrencyDisplay(checkoutSummary.totalObj)}
//                   </span>
//                 </div>
//                 <p className="mt-1 text-right text-[10px] italic text-gray-400">
//                   {t("cart_tax_shipping_note")}
//                 </p>
//               </div>
//               <button
//                 onClick={handleCheckout}
//                 disabled={isProcessingCheckout || selectedIds.length === 0}
//                 className="flex items-center justify-center w-full gap-3 py-5 text-sm font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/20"
//               >
//                 {!isProcessingCheckout ? (
//                   t("btn_checkout", { count: selectedIds.length.toString() })
//                 ) : (
//                   <span className="flex items-center gap-2">
//                     <div className="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"></div>
//                     {t("cart_processing")}
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

// /* eslint-disable no-empty */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { useState, useEffect, useMemo, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart, type Product } from "../../context/CartContext";
// import { BASE_URL } from "../../config/api";
// import { useLanguage } from "../../context/LanguageContext";
// import { useCurrency } from "../../context/CurrencyContext";

// interface CartItem {
//   id: number;
//   product_id: number;
//   product_slug: string;
//   product: Product;
//   quantity: number;
//   gross_amount: number;
//   color?: string | null;
// }

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

// export default function CartPage() {
//   const navigate = useNavigate();
//   const { t } = useLanguage();
//   const { currency, exchangeRates } = useCurrency() as any;

//   const {
//     cartItems: contextCartItems,
//     fetchCart,
//     removeCartItemOptimistically,
//     updateCartItemQtyOptimistically,
//     revertCartItems,
//   } = useCart() as any;

//   const [localCartItems, setLocalCartItems] = useState<CartItem[]>([]);
//   const [selectedIds, setSelectedIds] = useState<number[]>([]);
//   const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
//   const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
//   const [rawSuggestedPool, setRawSuggestedPool] = useState<Product[]>([]);
//   const [catalogProducts, setCatalogProducts] = useState<any[]>([]);
//   const [loadingSuggestions, setLoadingSuggestions] = useState(true);
//   const [qtyInputs, setQtyInputs] = useState<{ [key: number]: string }>({});
//   const [userType, setUserType] = useState<string>("guest");
//   const debounceTimers = useRef<{ [key: number]: number }>({});

//   const getUrlPrefix = () => {
//     if (location.pathname.startsWith("/id")) return "/id";
//     if (location.pathname.startsWith("/en")) return "/en";
//     return "";
//   };

//   const urlPrefix = getUrlPrefix();

//   useEffect(() => {
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);
//         setUserType(user.usertype || "user");
//       } catch (e) {
//         setUserType("guest");
//       }
//     }
//   }, []);

//   useEffect(() => {
//     setLocalCartItems(contextCartItems);
//     const initialInputs: { [key: number]: string } = {};
//     contextCartItems.forEach((item: CartItem) => {
//       initialInputs[item.id] = item.quantity.toString();
//     });
//     setQtyInputs(initialInputs);
//   }, [contextCartItems]);

//   useEffect(() => {
//     setSelectedIds((prev) =>
//       prev.filter((id) => localCartItems.some((item) => item.id === id)),
//     );
//   }, [localCartItems]);

//   const isAllSelected =
//     localCartItems.length > 0 && selectedIds.length === localCartItems.length;

//   const handleSelectAll = () => {
//     if (isAllSelected) setSelectedIds([]);
//     else setSelectedIds(localCartItems.map((item) => item.id));
//   };

//   const handleSelectItem = (id: number) => {
//     setSelectedIds((prev) =>
//       prev.includes(id)
//         ? prev.filter((itemId) => itemId !== id)
//         : [...prev, id],
//     );
//   };

//   const selectedTotalQuantity = useMemo(() => {
//     return localCartItems
//       .filter((item) => selectedIds.includes(item.id))
//       .reduce((sum, item) => sum + item.quantity, 0);
//   }, [localCartItems, selectedIds]);

//   // ============================================================================
//   // FUNGSI HELPER MULTI-CURRENCY
//   // ============================================================================

//   const convertIDRtoActiveCurrency = (idrAmount: number) => {
//     const curr = (currency as Currency) || "IDR";
//     if (curr === "IDR" || !exchangeRates || !exchangeRates[curr])
//       return { value: idrAmount, curr: "IDR" };
//     return { value: idrAmount * exchangeRates[curr], curr: curr };
//   };

//   const getPriceToDisplay = (product: Product | null) => {
//     if (!product) return { value: 0, curr: "IDR" };
//     const curr = (currency as Currency) || "IDR";
//     const basePrice = Number(product.price) || 0;

//     if (curr === "IDR") return { value: basePrice, curr: "IDR" };
//     try {
//       const pricesObj = typeof product.prices === "string" ? JSON.parse(product.prices) : product.prices || {};
//       const dbPrice = pricesObj[curr] || pricesObj[curr.toLowerCase()] || pricesObj[curr.toUpperCase()];
//       if (dbPrice) return { value: parseFloat(dbPrice), curr: curr };
//     } catch (e) {}
//     return convertIDRtoActiveCurrency(basePrice);
//   };

//   const getDiscountToDisplay = (product: Product | null) => {
//     if (!product) return null;
//     const curr = (currency as Currency) || "IDR";
//     const baseDisc = Number(product.discount_price) || 0;

//     if (curr === "IDR") return baseDisc > 0 ? { value: baseDisc, curr: "IDR" } : null;
//     try {
//       const discObj = typeof product.discount_prices === "string" ? JSON.parse(product.discount_prices) : product.discount_prices || {};
//       const dbDisc = discObj[curr] || discObj[curr.toLowerCase()] || discObj[curr.toUpperCase()];
//       if (dbDisc) return { value: parseFloat(dbDisc), curr: curr };
//     } catch (e) {}
//     return baseDisc > 0 ? convertIDRtoActiveCurrency(baseDisc) : null;
//   };

//   const getWholesaleToDisplay = (product: Product | null) => {
//     if (!product) return null;
//     const curr = (currency as Currency) || "IDR";
//     const baseWholesale = Number(product.wholesale_price) || 0;

//     if (curr === "IDR") return baseWholesale > 0 ? { value: baseWholesale, curr: "IDR" } : null;
//     try {
//       const wholesaleObj = typeof product.wholesale_price === "string" ? JSON.parse(product.wholesale_price) : (product as any).wholesale_prices || {};
//       const dbWholesale = wholesaleObj[curr] || wholesaleObj[curr.toLowerCase()] || wholesaleObj[curr.toUpperCase()];
//       if (dbWholesale) return { value: parseFloat(dbWholesale), curr: curr };
//     } catch (e) {}
//     return baseWholesale > 0 ? convertIDRtoActiveCurrency(baseWholesale) : null;
//   };

//   const getBundleToDisplay = (product: Product | null) => {
//     if (!product) return null;
//     const curr = (currency as Currency) || "IDR";
//     const baseBundle = Number(product.bundle_price) || 0;

//     if (curr === "IDR") return baseBundle > 0 ? { value: baseBundle, curr: "IDR" } : null;
//     try {
//       const bundleObj = typeof product.bundle_prices === "string" ? JSON.parse(product.bundle_prices) : product.bundle_prices || {};
//       const dbBundle = bundleObj[curr] || bundleObj[curr.toLowerCase()] || bundleObj[curr.toUpperCase()];
//       if (dbBundle) return { value: parseFloat(dbBundle), curr: curr };
//     } catch (e) {}
//     return baseBundle > 0 ? convertIDRtoActiveCurrency(baseBundle) : null;
//   };

//   const getActivePriceObj = (product: Product, totalQty: number) => {
//     const isReseller = userType === "reseller";
//     const dynamicPriceObj = getPriceToDisplay(product);
//     const dynamicDiscountObj = getDiscountToDisplay(product);
//     const dynamicWholesaleObj = getWholesaleToDisplay(product);

//     const hasWholesale = dynamicWholesaleObj && dynamicWholesaleObj.value > 0;

//     if (isReseller && hasWholesale && totalQty >= 24) {
//       return dynamicWholesaleObj!;
//     } else if (dynamicDiscountObj && dynamicDiscountObj.value > 0 && dynamicDiscountObj.value < dynamicPriceObj.value) {
//       return dynamicDiscountObj;
//     }

//     return dynamicPriceObj;
//   };

//   const formatCurrencyDisplay = (priceObj: { value: number; curr: string } | null) => {
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
//   };

//   const getFreshProduct = (cartProduct: any) => {
//     if (catalogProducts.length > 0 && cartProduct) {
//       const fresh = catalogProducts.find((p) => p.id === cartProduct.id || p.id === cartProduct.product_id);
//       if (fresh) return fresh;
//     }
//     return cartProduct;
//   };

//   // 👇 PERBAIKAN FATAL KE-2: Sistem Kolam Universal (Bebas Lintas Kategori)
//   const checkoutSummary = useMemo(() => {
//     const curr = (currency as Currency) || "IDR";
//     let totalValue = 0;
//     let appliedBundlesCount = 0;

//     const selectedItems = localCartItems.filter((item) => selectedIds.includes(item.id));
//     const isReseller = userType === "reseller";
//     const isWholesaleGlobal = isReseller && selectedTotalQuantity >= 24;

//     const bundlePool: { product: Product, bundlePrice: number, normalPrice: number }[] = [];

//     selectedItems.forEach((item) => {
//       const freshProd = getFreshProduct(item.product);
//       const qty = item.quantity;
//       const wholesaleObj = getWholesaleToDisplay(freshProd);

//       // Grosir mematikan semua logika promo lain
//       if (isWholesaleGlobal && wholesaleObj && wholesaleObj.value > 0) {
//         totalValue += wholesaleObj.value * qty;
//         return;
//       }

//       const bundleObj = getBundleToDisplay(freshProd);
//       const activePriceObj = getActivePriceObj(freshProd, selectedTotalQuantity);

//       // Cek keabsahan Bundle (Menangani data boolean, number, dan string aman tanpa error)
//       const isBundleActiveFlag = freshProd.is_bundle_active === true || freshProd.is_bundle_active === 1 || freshProd.is_bundle_active === "1";

//       let isValidDate = true;
//       if (freshProd.bundle_end_date && freshProd.bundle_end_date !== "0000-00-00 00:00:00") {
//         const d = new Date(freshProd.bundle_end_date);
//         if (!isNaN(d.getTime())) isValidDate = d > new Date();
//       }

//       const isBundleValid = isBundleActiveFlag && isValidDate && bundleObj && bundleObj.value > 0;

//       if (isBundleValid) {
//         // Semua produk valid dilempar ke SATU KOLAM yang sama tanpa grouping kaku
//         for (let i = 0; i < qty; i++) {
//           bundlePool.push({
//             product: freshProd,
//             bundlePrice: bundleObj.value,
//             normalPrice: activePriceObj.value
//           });
//         }
//       } else {
//         // Produk non-bundle, langsung dijumlah harga normal/diskonnya
//         totalValue += activePriceObj.value * qty;
//       }
//     });

//     // Proses pencarian Pasangan (Pairs) DARI SELURUH KOLAM
//     // Urutkan harga bundle tertinggi agar user otomatis dapat diskon paling optimal
//     bundlePool.sort((a, b) => b.bundlePrice - a.bundlePrice);

//     const totalBundleItems = bundlePool.length;
//     const pairs = Math.floor(totalBundleItems / 2); // Jumlah pasangan

//     // Looping pasangan
//     for (let i = 0; i < pairs; i++) {
//       const item1 = bundlePool[i * 2];
//       const item2 = bundlePool[i * 2 + 1];

//       // Ambil harga paket terbesar dari 2 item yang dipasangkan (kalau sama ya tidak berubah)
//       const pairPrice = Math.max(item1.bundlePrice, item2.bundlePrice);

//       totalValue += pairPrice;
//       appliedBundlesCount++;
//     }

//     // Sisa produk ganjil (jomblo) yang tidak dapat pasangan kembalikan ke harga normal
//     for (let i = pairs * 2; i < totalBundleItems; i++) {
//       totalValue += bundlePool[i].normalPrice;
//     }

//     return {
//       totalObj: { value: totalValue, curr: curr },
//       appliedBundlesCount,
//     };
//   }, [localCartItems, selectedIds, userType, selectedTotalQuantity, currency, catalogProducts]);

//   const handleQtyChange = (item: CartItem, newQty: number) => {
//     if (newQty < 1) newQty = 1;
//     if (newQty > item.product.stock) {
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "warning",
//         title: t("cart_max_stock_warning", { stock: item.product.stock.toString() }),
//         showConfirmButton: false,
//         timer: 2000,
//       });
//       newQty = item.product.stock;
//     }

//     const token = localStorage.getItem("user_token");
//     const originalItems = [...localCartItems];

//     setLocalCartItems((prevItems) =>
//       prevItems.map((cartItem) =>
//         cartItem.id === item.id ? { ...cartItem, quantity: newQty } : cartItem,
//       ),
//     );
//     updateCartItemQtyOptimistically(item.id, newQty, 0);
//     setQtyInputs((prev) => ({ ...prev, [item.id]: newQty.toString() }));

//     if (debounceTimers.current[item.id]) window.clearTimeout(debounceTimers.current[item.id]);

//     debounceTimers.current[item.id] = window.setTimeout(async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/carts/${item.id}`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ quantity: newQty }),
//         });

//         if (!res.ok) {
//           const err = await res.json();
//           Swal.fire(t("notification"), err.message || t("cart_update_fail"), "warning");
//           revertCartItems(originalItems);
//           fetchCart();
//         }
//       } catch (error) {
//         Swal.fire(t("error"), t("cart_server_error"), "error");
//         revertCartItems(originalItems);
//         fetchCart();
//       }
//     }, 800);
//   };

//   const handleInputChange = (itemId: number, value: string) => {
//     if (value === "" || /^\d+$/.test(value))
//       setQtyInputs((prev) => ({ ...prev, [itemId]: value }));
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
//       window.clearTimeout(debounceTimers.current[id]);
//       delete debounceTimers.current[id];
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts/${id}`, {
//         method: "DELETE",
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (!res.ok) {
//         revertCartItems(originalItems);
//         Swal.fire(t("notification"), t("cart_delete_fail"), "warning");
//         fetchCart();
//       }
//     } catch (error) {
//       revertCartItems(originalItems);
//       Swal.fire(t("error"), t("cart_delete_fail"), "error");
//     }
//   };

//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         const data = await res.json();
//         const products: any[] = data.data ? data.data : data;

//         setCatalogProducts(products);

//         const available = products.filter((p) => p.stock > 0);
//         const shuffled = available.sort(() => 0.5 - Math.random());
//         setRawSuggestedPool(shuffled);
//       } catch (error) {
//         console.error("Gagal memuat rekomendasi:", error);
//       } finally {
//         setLoadingSuggestions(false);
//       }
//     };
//     fetchSuggestions();
//   }, []);

//   useEffect(() => {
//     const cartProductIds = localCartItems.map((item) => item.product_id);
//     const finalSuggestions = rawSuggestedPool
//       .filter((p) => !cartProductIds.includes(p.id))
//       .slice(0, 4);
//     setSuggestedProducts(finalSuggestions);
//   }, [localCartItems, rawSuggestedPool]);

//   const addSuggestedProduct = async (product: Product) => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       navigate(`${urlPrefix}/login`);
//       return;
//     }

//     if (Array.isArray(product.color) && product.color.length > 0) {
//       navigate(`${urlPrefix}/product/${product.slug}`);
//       return;
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ product_id: product.id, quantity: 1 }),
//       });

//       if (res.ok) {
//         Swal.fire({
//           title: t("added_to_cart"),
//           icon: "success",
//           toast: true,
//           position: "top-end",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         fetchCart();
//       }
//     } catch (error) {}
//   };

//   const handleCheckout = () => {
//     if (selectedIds.length === 0) return;
//     setIsProcessingCheckout(true);

//     setTimeout(() => {
//       setIsProcessingCheckout(false);
//       navigate(`${urlPrefix}/checkout`, {
//         state: { selectedIds: selectedIds },
//       });
//     }, 800);
//   };

//   return (
//     <div className="w-full min-h-screen px-4 py-16 mx-auto overflow-x-hidden font-sans bg-gray-100 max-w-7xl sm:px-6 lg:px-8">
//       <div className="flex items-center gap-4 mb-10 animate-fade-in-up">
//         <button
//           onClick={() => navigate(`${urlPrefix}/products`)}
//           className="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50"
//         >
//           <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//         <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
//           {t("cart_title")}
//         </h1>
//         <span className="ml-2 text-xl font-medium text-gray-400">
//           {t("cart_items_count", { count: localCartItems.length.toString() })}
//         </span>
//       </div>

//       <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
//         <div className="flex-grow lg:w-2/3 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
//           {userType === "reseller" && localCartItems.length > 0 && (
//             <div className={`p-4 mb-6 border rounded-2xl flex items-center justify-between transition-all duration-500 ${selectedTotalQuantity >= 24 ? "bg-blue-600 border-blue-700 text-white shadow-lg" : "bg-blue-50 border-blue-200 text-blue-900"}`}>
//               <div>
//                 <h3 className="text-sm font-bold md:text-base">
//                   {selectedTotalQuantity >= 24 ? "🎉 Harga Grosir Aktif!" : "Aktifkan Harga Grosir"}
//                 </h3>
//                 <p className={`text-xs md:text-sm mt-1 ${selectedTotalQuantity >= 24 ? "text-blue-100" : "text-blue-700"}`}>
//                   {selectedTotalQuantity >= 24
//                     ? `Luar biasa! Anda membeli ${selectedTotalQuantity} item dan menikmati harga modal pabrik.`
//                     : `Centang atau tambah ${24 - selectedTotalQuantity} barang lagi untuk mendapatkan harga reseller.`}
//                 </p>
//               </div>
//               <div className="pl-4 shrink-0">
//                 <div className={`flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border-4 ${selectedTotalQuantity >= 24 ? "border-white bg-blue-500" : "border-blue-300 bg-white"}`}>
//                   <span className={`font-black text-sm md:text-lg ${selectedTotalQuantity >= 24 ? "text-white" : "text-blue-600"}`}>
//                     {selectedTotalQuantity}/24
//                   </span>
//                 </div>
//               </div>
//             </div>
//           )}

//           {localCartItems.length === 0 ? (
//             <div className="py-20 text-center border border-gray-200 border-dashed rounded-3xl bg-gray-50">
//               <p className="mb-6 text-2xl font-medium text-gray-400">{t("cart_empty_title")}</p>
//               <button
//                 onClick={() => navigate(`${urlPrefix}/collections/all`)}
//                 className="px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition bg-gray-900 rounded-full shadow-xl hover:bg-black shadow-gray-200"
//               >
//                 {t("btn_start_shopping")}
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
//                   {t("cart_select_all")}
//                 </label>
//               </div>

//               <div className="space-y-8">
//                 {localCartItems.map((item: CartItem) => {
//                   const freshProd = getFreshProduct(item.product);
//                   const activePriceObj = getActivePriceObj(freshProd, selectedTotalQuantity);
//                   const basePriceObj = getPriceToDisplay(freshProd);
//                   const isDiscounted = activePriceObj.value < basePriceObj.value;

//                   const isWholesaleActive =
//                     userType === "reseller" &&
//                     getWholesaleToDisplay(freshProd) !== null &&
//                     selectedTotalQuantity >= 24;

//                   const currentGrossAmountObj = {
//                     value: activePriceObj.value * item.quantity,
//                     curr: activePriceObj.curr,
//                   };
//                   const originalGrossAmountObj = {
//                     value: basePriceObj.value * item.quantity,
//                     curr: basePriceObj.curr,
//                   };

//                   return (
//                     <div key={item.id} className="relative flex items-start gap-4 pb-8 border-b border-gray-50 sm:gap-6 last:border-0 last:pb-0">
//                       <div className="pt-3 sm:pt-12">
//                         <input
//                           type="checkbox"
//                           checked={selectedIds.includes(item.id)}
//                           onChange={() => handleSelectItem(item.id)}
//                           className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora"
//                         />
//                       </div>
//                       <div
//                         className="relative w-24 h-24 overflow-hidden border border-gray-100 cursor-pointer shrink-0 sm:w-40 sm:h-40 rounded-2xl bg-gray-50"
//                         onClick={() => navigate(`${urlPrefix}/product/${freshProd.slug}`)}
//                       >
//                         <img src={freshProd.image_url} alt={freshProd.name} className="object-cover w-full h-full transition-transform duration-500 hover:scale-105" />

//                         {isDiscounted && (
//                           <div className={`absolute px-2 py-0.5 text-[9px] font-bold text-white top-2 left-2 rounded shadow-sm
//                             ${isWholesaleActive ? "bg-blue-600" : "bg-rose-500"}`}
//                           >
//                             {isWholesaleActive ? "GROSIR" : t("cart_sale_badge")}
//                           </div>
//                         )}
//                       </div>

//                       <div className="flex flex-col justify-between flex-grow min-h-[6rem] sm:min-h-[10rem]">
//                         <div>
//                           <div className="flex items-start justify-between gap-2">
//                             <h3
//                               className="w-2/3 text-sm font-bold tracking-tight text-gray-900 transition-colors cursor-pointer sm:text-lg hover:text-gycora line-clamp-2"
//                               onClick={() => navigate(`${urlPrefix}/product/${freshProd.slug}`)}
//                             >
//                               {freshProd.name}
//                             </h3>
//                             <div className="text-right">
//                               <p className={`text-sm font-extrabold sm:text-lg whitespace-nowrap ${isWholesaleActive ? "text-blue-600" : "text-gycora"}`}>
//                                 {formatCurrencyDisplay(currentGrossAmountObj)}
//                               </p>
//                               {isDiscounted && (
//                                 <p className="text-[10px] text-gray-400 line-through">
//                                   {formatCurrencyDisplay(originalGrossAmountObj)}
//                                 </p>
//                               )}
//                             </div>
//                           </div>

//                           {item.color && (() => {
//                             let hex = item.color as string;
//                             let name = "";
//                             try {
//                               const parsed = JSON.parse(item.color as string);
//                               if (parsed.hex) {
//                                 hex = parsed.hex;
//                                 name = parsed.name || "";
//                               }
//                             } catch {
//                               if (Array.isArray(freshProd.color)) {
//                                 const matched = freshProd.color.find(
//                                   (c: any) => (typeof c === "object" && c !== null && c.hex === item.color) || c === item.color
//                                 );
//                                 if (matched && typeof matched === "object" && matched !== null) {
//                                   name = (matched as { name?: string }).name || "";
//                                 }
//                               }
//                             }
//                             return (
//                               <div className="flex items-center gap-2 mt-2">
//                                 <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">{t("cart_variant_label")}</span>
//                                 <div className="flex items-center gap-2 px-2 py-1 bg-white border border-gray-200 rounded-md shadow-sm">
//                                   <span className="w-3 h-3 border border-gray-300 rounded-full shadow-inner shrink-0" style={{ backgroundColor: hex }}></span>
//                                   <span className="text-[10px] font-bold text-gray-700">
//                                     {name ? name : <span className="font-mono uppercase">{hex}</span>}
//                                   </span>
//                                 </div>
//                               </div>
//                             );
//                           })()}

//                           <div className="flex flex-wrap items-center mt-2 gap-x-3 gap-y-1">
//                             {isDiscounted ? (
//                               <div className="flex items-center gap-2">
//                                 <p className={`text-xs font-bold ${isWholesaleActive ? "text-blue-500" : "text-rose-500"}`}>
//                                   {formatCurrencyDisplay(activePriceObj)} {t("cart_per_pc")}
//                                 </p>
//                                 <p className="text-[10px] text-gray-400 line-through">
//                                   {formatCurrencyDisplay(basePriceObj)}
//                                 </p>
//                               </div>
//                             ) : (
//                               <p className="text-xs italic tracking-wider text-gray-400">
//                                 {formatCurrencyDisplay(basePriceObj)} {t("cart_per_pc")}
//                               </p>
//                             )}
//                           </div>
//                         </div>

//                         <div className="flex flex-col items-start gap-4 mt-4 sm:flex-row sm:justify-between sm:items-end sm:mt-6">
//                           <div className="flex items-center h-10 overflow-hidden bg-white border border-gray-200 shadow-sm sm:h-12 rounded-xl">
//                             <button
//                               onClick={() => {
//                                 const currentVal = parseInt(qtyInputs[item.id] !== undefined ? qtyInputs[item.id] : String(item.quantity)) || 1;
//                                 const newVal = Math.max(1, currentVal - 1);
//                                 handleQtyChange(item, newVal);
//                               }}
//                               disabled={isProcessingCheckout}
//                               className="flex items-center justify-center w-10 h-full text-base font-bold text-gray-700 transition-colors sm:w-12 hover:bg-gray-100 hover:text-gycora focus:outline-none"
//                             >
//                               -
//                             </button>
//                             <input
//                               type="text"
//                               value={qtyInputs[item.id] !== undefined ? qtyInputs[item.id] : item.quantity}
//                               onChange={(e) => handleInputChange(item.id, e.target.value)}
//                               onBlur={() => handleInputBlur(item)}
//                               disabled={isProcessingCheckout}
//                               className="w-12 h-full text-sm font-bold text-center text-gray-900 bg-transparent border-none outline-none focus:ring-0 sm:text-base"
//                             />
//                             <button
//                               onClick={() => {
//                                 const currentVal = parseInt(qtyInputs[item.id] !== undefined ? qtyInputs[item.id] : String(item.quantity)) || 1;
//                                 const newVal = Math.min(freshProd.stock, currentVal + 1);
//                                 handleQtyChange(item, newVal);
//                               }}
//                               disabled={isProcessingCheckout}
//                               className="flex items-center justify-center w-10 h-full text-base font-bold text-gray-700 transition-colors sm:w-12 hover:bg-gray-100 hover:text-gycora focus:outline-none"
//                             >
//                               +
//                             </button>
//                           </div>
//                           <button
//                             onClick={() => handleOptimisticDelete(item.id)}
//                             className="flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest text-gray-400 uppercase transition-colors group hover:text-red-500"
//                           >
//                             <svg className="w-4 h-4 transition-transform sm:w-5 sm:h-5 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                             </svg>
//                             {t("btn_remove")}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* SUGGESTED PRODUCTS */}
//           <div className="pt-12 mt-12 border-t border-gray-100">
//             <h3 className="mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase">
//               {t("cart_suggest_title")}
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
//                 {suggestedProducts.map((product) => {
//                   const sugActivePriceObj = getActivePriceObj(product, selectedTotalQuantity);
//                   const sugBasePriceObj = getPriceToDisplay(product);
//                   const isSugDiscounted = sugActivePriceObj.value < sugBasePriceObj.value;

//                   const isSugWholesale =
//                     userType === "reseller" &&
//                     getWholesaleToDisplay(product) !== null &&
//                     selectedTotalQuantity >= 24;

//                   return (
//                     <div key={product.id} className="flex flex-col group">
//                       <div
//                         className="relative mb-3 overflow-hidden border border-gray-100 cursor-pointer aspect-square rounded-2xl bg-gray-50"
//                         onClick={() => navigate(`${urlPrefix}/product/${product.slug}`, {
//                           state: { initialProduct: product, allProducts: suggestedProducts },
//                         })}
//                       >
//                         <img src={product.image_url} alt={product.name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />

//                         {isSugDiscounted && (
//                           <div className={`absolute px-2 py-0.5 text-[9px] font-bold text-white top-2 left-2 rounded shadow-sm
//                             ${isSugWholesale ? "bg-blue-600" : "bg-rose-500"}`}
//                           >
//                             {isSugWholesale ? "GROSIR" : t("cart_sale_badge")}
//                           </div>
//                         )}
//                       </div>
//                       <h4 className="mb-1 text-[11px] font-bold tracking-wide text-gray-900 uppercase truncate">
//                         {product.name}
//                       </h4>
//                       {isSugDiscounted ? (
//                         <div className="mb-3">
//                           <p className={`text-xs font-bold ${isSugWholesale ? "text-blue-500" : "text-rose-500"}`}>
//                             {formatCurrencyDisplay(sugActivePriceObj)}
//                           </p>
//                           <p className="text-[9px] text-gray-400 line-through">
//                             {formatCurrencyDisplay(sugBasePriceObj)}
//                           </p>
//                         </div>
//                       ) : (
//                         <p className="mb-3 text-xs font-bold text-gycora">
//                           {formatCurrencyDisplay(sugBasePriceObj)}
//                         </p>
//                       )}
//                       <button
//                         onClick={() => addSuggestedProduct(product)}
//                         className="px-3 py-2 mt-auto text-[9px] font-bold tracking-widest text-gray-700 uppercase transition-all duration-300 border border-gray-200 rounded-xl hover:border-gray-900 hover:bg-gray-900 hover:text-white"
//                       >
//                         {Array.isArray(product.color) && product.color.length > 0 ? t("btn_choose_variant") : t("btn_add_plus")}
//                       </button>
//                     </div>
//                   );
//                 })}
//               </div>
//             ) : null}
//           </div>
//         </div>

//         {/* RIGHT SIDE: CART SUMMARY */}
//         {localCartItems.length > 0 && (
//           <div className="lg:w-1/3 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//             <div className="sticky p-8 bg-gray-50/50 border border-gray-100 rounded-[2rem] top-32 shadow-sm">
//               <h2 className="pb-4 mb-8 text-lg font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">
//                 {t("cart_summary_title")}
//               </h2>
//               <div className="mb-8 space-y-4">
//                 <div className="flex justify-between text-sm text-gray-600">
//                   <span>{t("cart_selected_items")}</span>
//                   <span className="font-bold text-gray-900">{selectedTotalQuantity} Pcs</span>
//                 </div>

//                 {checkoutSummary.appliedBundlesCount > 0 && (
//                   <div className="flex items-center justify-between p-4 border border-purple-200 rounded-2xl bg-purple-50">
//                     <div className="flex items-center gap-3">
//                       <span className="flex items-center justify-center w-6 h-6 text-xs text-white bg-purple-600 rounded-full shadow-sm">✓</span>
//                       <span className="text-xs font-extrabold tracking-wide text-purple-800 uppercase">Promo Bundle Aktif</span>
//                     </div>
//                     <span className="text-sm font-black text-purple-700">{checkoutSummary.appliedBundlesCount} Paket</span>
//                   </div>
//                 )}

//                 <div className="flex items-end justify-between pt-4 border-t border-gray-200">
//                   <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
//                     {t("cart_estimated_total")}
//                   </span>
//                   <span className="text-2xl font-black text-gycora">
//                     {formatCurrencyDisplay(checkoutSummary.totalObj)}
//                   </span>
//                 </div>
//                 <p className="mt-1 text-right text-[10px] italic text-gray-400">
//                   {t("cart_tax_shipping_note")}
//                 </p>
//               </div>
//               <button
//                 onClick={handleCheckout}
//                 disabled={isProcessingCheckout || selectedIds.length === 0}
//                 className="flex items-center justify-center w-full gap-3 py-5 text-sm font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/20"
//               >
//                 {!isProcessingCheckout ? (
//                   t("btn_checkout", { count: selectedIds.length.toString() })
//                 ) : (
//                   <span className="flex items-center gap-2">
//                     <div className="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"></div>
//                     {t("cart_processing")}
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

// /* eslint-disable no-empty */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { useState, useEffect, useMemo, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart, type Product } from "../../context/CartContext";
// import { BASE_URL } from "../../config/api";
// import { useLanguage } from "../../context/LanguageContext";
// import { useCurrency } from "../../context/CurrencyContext";

// interface CartItem {
//   id: number;
//   product_id: number;
//   product_slug: string;
//   product: Product;
//   quantity: number;
//   gross_amount: number;
//   color?: string | null;
// }

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

// export default function CartPage() {
//   const navigate = useNavigate();
//   const { t } = useLanguage();
//   const { currency, exchangeRates } = useCurrency() as any;

//   const {
//     cartItems: contextCartItems,
//     fetchCart,
//     removeCartItemOptimistically,
//     updateCartItemQtyOptimistically,
//     revertCartItems,
//   } = useCart() as any;

//   const [localCartItems, setLocalCartItems] = useState<CartItem[]>([]);
//   const [selectedIds, setSelectedIds] = useState<number[]>([]);
//   const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
//   const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
//   const [rawSuggestedPool, setRawSuggestedPool] = useState<Product[]>([]);
//   const [loadingSuggestions, setLoadingSuggestions] = useState(true);
//   const [qtyInputs, setQtyInputs] = useState<{ [key: number]: string }>({});
//   const [userType, setUserType] = useState<string>("guest");
//   const debounceTimers = useRef<{ [key: number]: number }>({});

//   const getUrlPrefix = () => {
//     if (location.pathname.startsWith("/id")) return "/id";
//     if (location.pathname.startsWith("/en")) return "/en";
//     return "";
//   };

//   const urlPrefix = getUrlPrefix();

//   useEffect(() => {
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);
//         setUserType(user.usertype || "user");
//       } catch (e) {
//         setUserType("guest");
//       }
//     }
//   }, []);

//   useEffect(() => {
//     setLocalCartItems(contextCartItems);
//     const initialInputs: { [key: number]: string } = {};
//     contextCartItems.forEach((item: CartItem) => {
//       initialInputs[item.id] = item.quantity.toString();
//     });
//     setQtyInputs(initialInputs);
//   }, [contextCartItems]);

//   useEffect(() => {
//     setSelectedIds((prev) =>
//       prev.filter((id) => localCartItems.some((item) => item.id === id)),
//     );
//   }, [localCartItems]);

//   const isAllSelected =
//     localCartItems.length > 0 && selectedIds.length === localCartItems.length;

//   const handleSelectAll = () => {
//     if (isAllSelected) setSelectedIds([]);
//     else setSelectedIds(localCartItems.map((item) => item.id));
//   };

//   const handleSelectItem = (id: number) => {
//     setSelectedIds((prev) =>
//       prev.includes(id)
//         ? prev.filter((itemId) => itemId !== id)
//         : [...prev, id],
//     );
//   };

//   const selectedTotalQuantity = useMemo(() => {
//     return localCartItems
//       .filter((item) => selectedIds.includes(item.id))
//       .reduce((sum, item) => sum + item.quantity, 0);
//   }, [localCartItems, selectedIds]);

//   // ============================================================================
//   // FUNGSI HELPER MULTI-CURRENCY
//   // ============================================================================

//   const convertIDRtoActiveCurrency = (idrAmount: number) => {
//     const curr = (currency as Currency) || "IDR";
//     if (curr === "IDR" || !exchangeRates || !exchangeRates[curr])
//       return { value: idrAmount, curr: "IDR" };
//     return { value: idrAmount * exchangeRates[curr], curr: curr };
//   };

//   const getPriceToDisplay = (product: Product | null) => {
//     if (!product) return { value: 0, curr: "IDR" };
//     const curr = (currency as Currency) || "IDR";
//     const basePrice = Number(product.price) || 0;

//     if (curr === "IDR") return { value: basePrice, curr: "IDR" };
//     try {
//       const pricesObj =
//         typeof product.prices === "string"
//           ? JSON.parse(product.prices)
//           : product.prices || {};
//       const dbPrice =
//         pricesObj[curr] ||
//         pricesObj[curr.toLowerCase()] ||
//         pricesObj[curr.toUpperCase()];
//       if (dbPrice) return { value: parseFloat(dbPrice), curr: curr };
//     } catch (e) {}
//     return convertIDRtoActiveCurrency(basePrice);
//   };

//   const getDiscountToDisplay = (product: Product | null) => {
//     if (!product) return null;
//     const curr = (currency as Currency) || "IDR";
//     const baseDisc = Number(product.discount_price) || 0;

//     if (curr === "IDR")
//       return baseDisc > 0 ? { value: baseDisc, curr: "IDR" } : null;
//     try {
//       const discObj =
//         typeof product.discount_prices === "string"
//           ? JSON.parse(product.discount_prices)
//           : product.discount_prices || {};
//       const dbDisc =
//         discObj[curr] ||
//         discObj[curr.toLowerCase()] ||
//         discObj[curr.toUpperCase()];
//       if (dbDisc) return { value: parseFloat(dbDisc), curr: curr };
//     } catch (e) {}
//     return baseDisc > 0 ? convertIDRtoActiveCurrency(baseDisc) : null;
//   };

//   const getWholesaleToDisplay = (product: Product | null) => {
//     if (!product) return null;
//     const curr = (currency as Currency) || "IDR";
//     const baseWholesale = Number(product.wholesale_price) || 0;

//     if (curr === "IDR")
//       return baseWholesale > 0 ? { value: baseWholesale, curr: "IDR" } : null;
//     try {
//       const wholesaleObj =
//         typeof product.wholesale_price === "string"
//           ? JSON.parse(product.wholesale_price)
//           : (product as any).wholesale_prices || {};
//       const dbWholesale =
//         wholesaleObj[curr] ||
//         wholesaleObj[curr.toLowerCase()] ||
//         wholesaleObj[curr.toUpperCase()];
//       if (dbWholesale) return { value: parseFloat(dbWholesale), curr: curr };
//     } catch (e) {}
//     return baseWholesale > 0 ? convertIDRtoActiveCurrency(baseWholesale) : null;
//   };

//   const getBundleToDisplay = (product: Product | null) => {
//     if (!product) return null;
//     const curr = (currency as Currency) || "IDR";
//     const baseBundle = Number(product.bundle_price) || 0;

//     if (curr === "IDR")
//       return baseBundle > 0 ? { value: baseBundle, curr: "IDR" } : null;
//     try {
//       const bundleObj =
//         typeof product.bundle_prices === "string"
//           ? JSON.parse(product.bundle_prices)
//           : product.bundle_prices || {};
//       const dbBundle =
//         bundleObj[curr] ||
//         bundleObj[curr.toLowerCase()] ||
//         bundleObj[curr.toUpperCase()];
//       if (dbBundle) return { value: parseFloat(dbBundle), curr: curr };
//     } catch (e) {}
//     return baseBundle > 0 ? convertIDRtoActiveCurrency(baseBundle) : null;
//   };

//   const getActivePriceObj = (product: Product, totalQty: number) => {
//     const isReseller = userType === "reseller";
//     const dynamicPriceObj = getPriceToDisplay(product);
//     const dynamicDiscountObj = getDiscountToDisplay(product);
//     const dynamicWholesaleObj = getWholesaleToDisplay(product);

//     if (
//       isReseller &&
//       dynamicWholesaleObj &&
//       dynamicWholesaleObj.value > 0 &&
//       totalQty >= 24
//     ) {
//       return dynamicWholesaleObj;
//     } else if (
//       dynamicDiscountObj &&
//       dynamicDiscountObj.value > 0 &&
//       dynamicDiscountObj.value < dynamicPriceObj.value
//     ) {
//       return dynamicDiscountObj;
//     }
//     return dynamicPriceObj;
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
//   // OTAK UTAMA: MENGHITUNG HARGA BUNDLE DAN TOTAL KERANJANG TERPADU
//   // ============================================================================
//   // const cartCalculations = useMemo(() => {
//   //   const curr = (currency as Currency) || "IDR";
//   //   let totalValue = 0;
//   //   let appliedBundlesCount = 0;

//   //   const itemTotals: Record<number, number> = {};
//   //   const isBundledMap: Record<number, boolean> = {};
//   //   const bundlePool: { cartId: number; normalPrice: number; bundlePrice: number }[] = [];

//   //   const selectedItems = localCartItems.filter((item) => selectedIds.includes(item.id));
//   //   const isReseller = userType === "reseller";
//   //   const isWholesaleGlobal = isReseller && selectedTotalQuantity >= 24;

//   //   // Tahap 1: Evaluasi semua item terpilih dan masukkan ke kolam jika valid
//   //   selectedItems.forEach((item) => {
//   //     const prod = item.product; // KITA PAKAI LANGSUNG DARI CART, JANGAN DITIMPA API LAIN
//   //     const qty = item.quantity;

//   //     itemTotals[item.id] = 0;
//   //     isBundledMap[item.id] = false;

//   //     const basePriceObj = getPriceToDisplay(prod);
//   //     const discObj = getDiscountToDisplay(prod);
//   //     const wholesaleObj = getWholesaleToDisplay(prod);
//   //     const bundleObj = getBundleToDisplay(prod);

//   //     let normalActivePrice = basePriceObj.value;
//   //     if (discObj && discObj.value > 0 && discObj.value < basePriceObj.value) {
//   //       normalActivePrice = discObj.value;
//   //     }

//   //     // Aturan Emas: Grosir mematikan bundle
//   //     if (isWholesaleGlobal && wholesaleObj && wholesaleObj.value > 0) {
//   //       itemTotals[item.id] = wholesaleObj.value * qty;
//   //       return;
//   //     }

//   //     // Pengecekan Aman (Kebal terhadap string "1", integer 1, atau boolean true)
//   //     const isBundleFlag = String(prod.is_bundle_active) === "1" || String(prod.is_bundle_active) === "true";

//   //     let isValidDate = true;
//   //     if (prod.bundle_end_date && prod.bundle_end_date !== "0000-00-00 00:00:00") {
//   //       const d = new Date(prod.bundle_end_date.replace(/-/g, "/"));
//   //       if (!isNaN(d.getTime())) isValidDate = d.getTime() > Date.now();
//   //     }

//   //     if (isBundleFlag && isValidDate && bundleObj && bundleObj.value > 0) {
//   //       for (let i = 0; i < qty; i++) {
//   //         bundlePool.push({
//   //           cartId: item.id,
//   //           normalPrice: normalActivePrice,
//   //           bundlePrice: bundleObj.value
//   //         });
//   //       }
//   //     } else {
//   //       itemTotals[item.id] = normalActivePrice * qty;
//   //     }
//   //   });

//   //   // Tahap 2: Menjodohkan barang-barang di kolam bundle (Lintas Kategori)
//   //   bundlePool.sort((a, b) => b.bundlePrice - a.bundlePrice);
//   //   const pairs = Math.floor(bundlePool.length / 2);

//   //   for (let i = 0; i < pairs; i++) {
//   //     const item1 = bundlePool[i * 2];
//   //     const item2 = bundlePool[i * 2 + 1];

//   //     // Ambil harga paket tertinggi diantara keduanya
//   //     const pairPrice = Math.max(item1.bundlePrice, item2.bundlePrice);
//   //     const halfPrice = pairPrice / 2; // Bagi dua untuk dibebankan ke masing-masing item

//   //     itemTotals[item1.cartId] += halfPrice;
//   //     itemTotals[item2.cartId] += halfPrice;

//   //     isBundledMap[item1.cartId] = true;
//   //     isBundledMap[item2.cartId] = true;

//   //     appliedBundlesCount++;
//   //   }

//   //   // Tahap 3: Sisa barang ganjil kembali ke harga diskon normal
//   //   for (let i = pairs * 2; i < bundlePool.length; i++) {
//   //     const unpaired = bundlePool[i];
//   //     itemTotals[unpaired.cartId] += unpaired.normalPrice;
//   //   }

//   //   // Tahap 4: Jumlahkan semuanya
//   //   selectedItems.forEach((item) => {
//   //     totalValue += itemTotals[item.id];
//   //   });

//   //   return {
//   //     totalObj: { value: totalValue, curr },
//   //     appliedBundlesCount,
//   //     itemTotals,
//   //     isBundledMap,
//   //   };
//   // }, [localCartItems, selectedIds, userType, selectedTotalQuantity, currency]);

//   // ============================================================================
//   // OTAK UTAMA: MENGHITUNG HARGA BUNDLE DAN TOTAL KERANJANG TERPADU
//   // ============================================================================
//   const cartCalculations = useMemo(() => {
//     const curr = (currency as Currency) || "IDR";
//     let totalValue = 0;
//     let appliedBundlesCount = 0;

//     const itemTotals: Record<number, number> = {};
//     const isBundledMap: Record<number, boolean> = {};
//     const isEligibleForBundleMap: Record<number, boolean> = {}; // BARU: Indikator UI
//     const bundlePool: {
//       cartId: number;
//       normalPrice: number;
//       bundlePrice: number;
//     }[] = [];

//     const selectedItems = localCartItems.filter((item) =>
//       selectedIds.includes(item.id),
//     );
//     const isReseller = userType === "reseller";
//     const isWholesaleGlobal = isReseller && selectedTotalQuantity >= 24;

//     // Tahap 1: Evaluasi item
//     selectedItems.forEach((item) => {
//       const prod = item.product;
//       const qty = item.quantity;

//       itemTotals[item.id] = 0;
//       isBundledMap[item.id] = false;
//       isEligibleForBundleMap[item.id] = false;

//       const basePriceObj = getPriceToDisplay(prod);
//       const discObj = getDiscountToDisplay(prod);
//       const wholesaleObj = getWholesaleToDisplay(prod);
//       const bundleObj = getBundleToDisplay(prod);

//       let normalActivePrice = basePriceObj.value;
//       if (discObj && discObj.value > 0 && discObj.value < basePriceObj.value) {
//         normalActivePrice = discObj.value;
//       }

//       if (isWholesaleGlobal && wholesaleObj && wholesaleObj.value > 0) {
//         itemTotals[item.id] = wholesaleObj.value * qty;
//         return;
//       }

//       // PERBAIKAN 1: Pengecekan Boolean Kebal Peluru
//       const isBundleFlag =
//         prod.is_bundle_active === true ||
//         prod.is_bundle_active === 1 ||
//         String(prod.is_bundle_active).toLowerCase() === "true" ||
//         String(prod.is_bundle_active) === "1";

//       // PERBAIKAN 2: Parsing Tanggal ISO yang Benar
//       let isValidDate = true;
//       if (
//         prod.bundle_end_date &&
//         prod.bundle_end_date !== "0000-00-00 00:00:00"
//       ) {
//         const d = new Date(prod.bundle_end_date); // Hapus replace regex yang merusak ISO format
//         if (!isNaN(d.getTime())) {
//           isValidDate = d.getTime() > Date.now();
//         } else {
//           isValidDate = false;
//         }
//       }

//       if (isBundleFlag && isValidDate && bundleObj && bundleObj.value > 0) {
//         isEligibleForBundleMap[item.id] = true; // Tandai bahwa barang ini bisa di-bundle
//         for (let i = 0; i < qty; i++) {
//           bundlePool.push({
//             cartId: item.id,
//             normalPrice: normalActivePrice,
//             bundlePrice: bundleObj.value,
//           });
//         }
//       } else {
//         itemTotals[item.id] = normalActivePrice * qty;
//       }
//     });

//     // Tahap 2: Menjodohkan
//     bundlePool.sort((a, b) => b.bundlePrice - a.bundlePrice);
//     const pairs = Math.floor(bundlePool.length / 2);

//     for (let i = 0; i < pairs; i++) {
//       const item1 = bundlePool[i * 2];
//       const item2 = bundlePool[i * 2 + 1];

//       const pairPrice = Math.max(item1.bundlePrice, item2.bundlePrice);
//       const halfPrice = pairPrice / 2;

//       itemTotals[item1.cartId] += halfPrice;
//       itemTotals[item2.cartId] += halfPrice;

//       isBundledMap[item1.cartId] = true;
//       isBundledMap[item2.cartId] = true;

//       appliedBundlesCount++;
//     }

//     // Tahap 3: Sisa ganjil
//     for (let i = pairs * 2; i < bundlePool.length; i++) {
//       const unpaired = bundlePool[i];
//       itemTotals[unpaired.cartId] += unpaired.normalPrice;
//     }

//     // Tahap 4: Jumlahkan
//     selectedItems.forEach((item) => {
//       totalValue += itemTotals[item.id];
//     });

//     return {
//       totalObj: { value: totalValue, curr },
//       appliedBundlesCount,
//       itemTotals,
//       isBundledMap,
//       isEligibleForBundleMap, // Export parameter ini
//     };
//   }, [localCartItems, selectedIds, userType, selectedTotalQuantity, currency]);

//   const handleQtyChange = (item: CartItem, newQty: number) => {
//     if (newQty < 1) newQty = 1;
//     if (newQty > item.product.stock) {
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "warning",
//         title: t("cart_max_stock_warning", {
//           stock: item.product.stock.toString(),
//         }),
//         showConfirmButton: false,
//         timer: 2000,
//       });
//       newQty = item.product.stock;
//     }

//     const token = localStorage.getItem("user_token");
//     const originalItems = [...localCartItems];

//     setLocalCartItems((prevItems) =>
//       prevItems.map((cartItem) =>
//         cartItem.id === item.id ? { ...cartItem, quantity: newQty } : cartItem,
//       ),
//     );
//     updateCartItemQtyOptimistically(item.id, newQty, 0);
//     setQtyInputs((prev) => ({ ...prev, [item.id]: newQty.toString() }));

//     if (debounceTimers.current[item.id])
//       window.clearTimeout(debounceTimers.current[item.id]);

//     debounceTimers.current[item.id] = window.setTimeout(async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/carts/${item.id}`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ quantity: newQty }),
//         });

//         if (!res.ok) {
//           const err = await res.json();
//           Swal.fire(
//             t("notification"),
//             err.message || t("cart_update_fail"),
//             "warning",
//           );
//           revertCartItems(originalItems);
//           fetchCart();
//         }
//       } catch (error) {
//         Swal.fire(t("error"), t("cart_server_error"), "error");
//         revertCartItems(originalItems);
//         fetchCart();
//       }
//     }, 800);
//   };

//   const handleInputChange = (itemId: number, value: string) => {
//     if (value === "" || /^\d+$/.test(value))
//       setQtyInputs((prev) => ({ ...prev, [itemId]: value }));
//   };

//   const handleInputBlur = (item: CartItem) => {
//     let parsed = parseInt(qtyInputs[item.id]);
//     if (isNaN(parsed) || parsed < 1) parsed = 1;
//     handleQtyChange(item, parsed);
//   };

//   const handleOptimisticDelete = async (id: number) => {
//     const token = localStorage.getItem("user_token");
//     const originalItems = [...localCartItems];

//     setLocalCartItems((prevItems) =>
//       prevItems.filter((item) => item.id !== id),
//     );
//     setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
//     removeCartItemOptimistically(id);

//     if (debounceTimers.current[id]) {
//       window.clearTimeout(debounceTimers.current[id]);
//       delete debounceTimers.current[id];
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts/${id}`, {
//         method: "DELETE",
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (!res.ok) {
//         revertCartItems(originalItems);
//         Swal.fire(t("notification"), t("cart_delete_fail"), "warning");
//         fetchCart();
//       }
//     } catch (error) {
//       revertCartItems(originalItems);
//       Swal.fire(t("error"), t("cart_delete_fail"), "error");
//     }
//   };

//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         const data = await res.json();
//         const products: any[] = data.data ? data.data : data;

//         const available = products.filter((p) => p.stock > 0);
//         const shuffled = available.sort(() => 0.5 - Math.random());
//         setRawSuggestedPool(shuffled);
//       } catch (error) {
//         console.error("Gagal memuat rekomendasi:", error);
//       } finally {
//         setLoadingSuggestions(false);
//       }
//     };
//     fetchSuggestions();
//   }, []);

//   useEffect(() => {
//     const cartProductIds = localCartItems.map((item) => item.product_id);
//     const finalSuggestions = rawSuggestedPool
//       .filter((p) => !cartProductIds.includes(p.id))
//       .slice(0, 4);
//     setSuggestedProducts(finalSuggestions);
//   }, [localCartItems, rawSuggestedPool]);

//   const addSuggestedProduct = async (product: Product) => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       navigate(`${urlPrefix}/login`);
//       return;
//     }
//     if (Array.isArray(product.color) && product.color.length > 0) {
//       navigate(`${urlPrefix}/product/${product.slug}`);
//       return;
//     }
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ product_id: product.id, quantity: 1 }),
//       });
//       if (res.ok) {
//         Swal.fire({
//           title: t("added_to_cart"),
//           icon: "success",
//           toast: true,
//           position: "top-end",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         fetchCart();
//       }
//     } catch (error) {}
//   };

//   const handleCheckout = () => {
//     if (selectedIds.length === 0) return;
//     setIsProcessingCheckout(true);
//     setTimeout(() => {
//       setIsProcessingCheckout(false);
//       navigate(`${urlPrefix}/checkout`, {
//         state: { selectedIds: selectedIds },
//       });
//     }, 800);
//   };

//   return (
//     <div className="w-full min-h-screen px-4 py-16 mx-auto overflow-x-hidden font-sans bg-gray-100 max-w-7xl sm:px-6 lg:px-8">
//       <div className="flex items-center gap-4 mb-10 animate-fade-in-up">
//         <button
//           onClick={() => navigate(`${urlPrefix}/products`)}
//           className="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50"
//         >
//           <svg
//             className="w-5 h-5 text-gray-600"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth="2"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M15 19l-7-7 7-7"
//             />
//           </svg>
//         </button>
//         <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
//           {t("cart_title")}
//         </h1>
//         <span className="ml-2 text-xl font-medium text-gray-400">
//           {t("cart_items_count", { count: localCartItems.length.toString() })}
//         </span>
//       </div>

//       <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
//         <div
//           className="flex-grow lg:w-2/3 animate-fade-in-up"
//           style={{ animationDelay: "100ms" }}
//         >
//           {userType === "reseller" && localCartItems.length > 0 && (
//             <div
//               className={`p-4 mb-6 border rounded-2xl flex items-center justify-between transition-all duration-500 ${selectedTotalQuantity >= 24 ? "bg-blue-600 border-blue-700 text-white shadow-lg" : "bg-blue-50 border-blue-200 text-blue-900"}`}
//             >
//               <div>
//                 <h3 className="text-sm font-bold md:text-base">
//                   {selectedTotalQuantity >= 24
//                     ? "🎉 Harga Grosir Aktif!"
//                     : "Aktifkan Harga Grosir"}
//                 </h3>
//                 <p
//                   className={`text-xs md:text-sm mt-1 ${selectedTotalQuantity >= 24 ? "text-blue-100" : "text-blue-700"}`}
//                 >
//                   {selectedTotalQuantity >= 24
//                     ? `Luar biasa! Anda membeli ${selectedTotalQuantity} item dan menikmati harga modal pabrik.`
//                     : `Centang atau tambah ${24 - selectedTotalQuantity} barang lagi untuk mendapatkan harga reseller.`}
//                 </p>
//               </div>
//               <div className="pl-4 shrink-0">
//                 <div
//                   className={`flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border-4 ${selectedTotalQuantity >= 24 ? "border-white bg-blue-500" : "border-blue-300 bg-white"}`}
//                 >
//                   <span
//                     className={`font-black text-sm md:text-lg ${selectedTotalQuantity >= 24 ? "text-white" : "text-blue-600"}`}
//                   >
//                     {selectedTotalQuantity}/24
//                   </span>
//                 </div>
//               </div>
//             </div>
//           )}

//           {localCartItems.length === 0 ? (
//             <div className="py-20 text-center border border-gray-200 border-dashed rounded-3xl bg-gray-50">
//               <p className="mb-6 text-2xl font-medium text-gray-400">
//                 {t("cart_empty_title")}
//               </p>
//               <button
//                 onClick={() => navigate(`${urlPrefix}/collections/all`)}
//                 className="px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition bg-gray-900 rounded-full shadow-xl hover:bg-black shadow-gray-200"
//               >
//                 {t("btn_start_shopping")}
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
//                 <label
//                   htmlFor="selectAll"
//                   className="text-xs font-bold tracking-widest text-gray-800 uppercase cursor-pointer select-none"
//                 >
//                   {t("cart_select_all")}
//                 </label>
//               </div>

//               <div className="space-y-8">
//                 {localCartItems.map((item: CartItem) => {
//                   const prod = item.product; // Selalu pakai dari database Cart, hindari overwrite
//                   const basePriceObj = getPriceToDisplay(prod);

//                   // CEK HASIL KALKULASI DARI OOTAK UTAMA (USEMEMO)
//                   const calculatedGross = cartCalculations.itemTotals[item.id];
//                   const fallbackGrossObj = getActivePriceObj(
//                     prod,
//                     selectedTotalQuantity,
//                   );

//                   // Jika item dicentang, pakai nilai kalkulasi pool. Jika tidak dicentang, munculkan harga normal/diskon biasa
//                   const isItemSelected = selectedIds.includes(item.id);
//                   const isBundled =
//                     isItemSelected && cartCalculations.isBundledMap[item.id];
//                   const isEligible =
//                     cartCalculations.isEligibleForBundleMap[item.id];
//                   const isWholesaleActive =
//                     userType === "reseller" &&
//                     getWholesaleToDisplay(prod) !== null &&
//                     selectedTotalQuantity >= 24;

//                   const currentGrossAmountObj = {
//                     value:
//                       isItemSelected && calculatedGross !== undefined
//                         ? calculatedGross
//                         : fallbackGrossObj.value * item.quantity,
//                     curr: cartCalculations.totalObj.curr,
//                   };

//                   const originalGrossAmountObj = {
//                     value: basePriceObj.value * item.quantity,
//                     curr: basePriceObj.curr,
//                   };

//                   const isDiscountedVisual =
//                     fallbackGrossObj.value < basePriceObj.value || isBundled;

//                   return (
//                     <div
//                       key={item.id}
//                       className="relative flex items-start gap-4 pb-8 border-b border-gray-50 sm:gap-6 last:border-0 last:pb-0"
//                     >
//                       <div className="pt-3 sm:pt-12">
//                         <input
//                           type="checkbox"
//                           checked={selectedIds.includes(item.id)}
//                           onChange={() => handleSelectItem(item.id)}
//                           className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora"
//                         />
//                       </div>
//                       <div
//                         className="relative w-24 h-24 overflow-hidden border border-gray-100 cursor-pointer shrink-0 sm:w-40 sm:h-40 rounded-2xl bg-gray-50"
//                         onClick={() =>
//                           navigate(`${urlPrefix}/product/${prod.slug}`)
//                         }
//                       >
//                         <img
//                           src={prod.image_url}
//                           alt={prod.name}
//                           className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
//                         />
//                         {/* {isBundled ? (
//                           <div className="absolute px-2 py-0.5 text-[9px] font-bold text-white top-2 left-2 rounded shadow-sm bg-purple-600">BUNDLE</div>
//                         ) : isDiscountedVisual ? (
//                           <div className={`absolute px-2 py-0.5 text-[9px] font-bold text-white top-2 left-2 rounded shadow-sm ${isWholesaleActive ? "bg-blue-600" : "bg-rose-500"}`}>
//                             {isWholesaleActive ? "GROSIR" : t("cart_sale_badge")}
//                           </div>
//                         ) : null} */}

//                         {isBundled ? (
//                           <div className="absolute px-2 py-0.5 text-[9px] font-bold text-white top-2 left-2 rounded shadow-sm bg-purple-600">
//                             BUNDLE AKTIF
//                           </div>
//                         ) : isEligible ? (
//                           <div className="absolute px-2 py-0.5 text-[9px] font-bold text-white top-2 left-2 rounded shadow-sm bg-indigo-400">
//                             MENUNGGU PASANGAN
//                           </div>
//                         ) : isDiscountedVisual ? (
//                           <div
//                             className={`absolute px-2 py-0.5 text-[9px] font-bold text-white top-2 left-2 rounded shadow-sm ${isWholesaleActive ? "bg-blue-600" : "bg-rose-500"}`}
//                           >
//                             {isWholesaleActive
//                               ? "GROSIR"
//                               : t("cart_sale_badge")}
//                           </div>
//                         ) : null}
//                       </div>

//                       <div className="flex flex-col justify-between flex-grow min-h-[6rem] sm:min-h-[10rem]">
//                         <div>
//                           <div className="flex items-start justify-between gap-2">
//                             <h3
//                               className="w-2/3 text-sm font-bold tracking-tight text-gray-900 transition-colors cursor-pointer sm:text-lg hover:text-gycora line-clamp-2"
//                               onClick={() =>
//                                 navigate(`${urlPrefix}/product/${prod.slug}`)
//                               }
//                             >
//                               {prod.name}
//                             </h3>
//                             <div className="text-right">
//                               {/* Label Harga Paling Jelas */}
//                               <p
//                                 className={`text-sm font-extrabold sm:text-lg whitespace-nowrap ${isBundled ? "text-purple-600" : isWholesaleActive ? "text-blue-600" : "text-gycora"}`}
//                               >
//                                 {formatCurrencyDisplay(currentGrossAmountObj)}
//                               </p>
//                               {isBundled ? (
//                                 <span className="inline-block mt-1 text-[10px] font-black text-purple-600 uppercase bg-purple-100 px-2 py-0.5 rounded shadow-sm">
//                                   Harga Promo Paket
//                                 </span>
//                               ) : isDiscountedVisual ? (
//                                 <p className="text-[10px] text-gray-400 line-through mt-0.5">
//                                   {formatCurrencyDisplay(
//                                     originalGrossAmountObj,
//                                   )}
//                                 </p>
//                               ) : null}
//                             </div>
//                           </div>

//                           {item.color &&
//                             (() => {
//                               let hex = item.color as string;
//                               let name = "";
//                               try {
//                                 const parsed = JSON.parse(item.color as string);
//                                 if (parsed.hex) {
//                                   hex = parsed.hex;
//                                   name = parsed.name || "";
//                                 }
//                               } catch {
//                                 if (Array.isArray(prod.color)) {
//                                   const matched = prod.color.find(
//                                     (c: any) =>
//                                       (typeof c === "object" &&
//                                         c !== null &&
//                                         c.hex === item.color) ||
//                                       c === item.color,
//                                   );
//                                   if (
//                                     matched &&
//                                     typeof matched === "object" &&
//                                     matched !== null
//                                   )
//                                     name =
//                                       (matched as { name?: string }).name || "";
//                                 }
//                               }
//                               return (
//                                 <div className="flex items-center gap-2 mt-2">
//                                   <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
//                                     {t("cart_variant_label")}
//                                   </span>
//                                   <div className="flex items-center gap-2 px-2 py-1 bg-white border border-gray-200 rounded-md shadow-sm">
//                                     <span
//                                       className="w-3 h-3 border border-gray-300 rounded-full shadow-inner shrink-0"
//                                       style={{ backgroundColor: hex }}
//                                     ></span>
//                                     <span className="text-[10px] font-bold text-gray-700">
//                                       {name ? (
//                                         name
//                                       ) : (
//                                         <span className="font-mono uppercase">
//                                           {hex}
//                                         </span>
//                                       )}
//                                     </span>
//                                   </div>
//                                 </div>
//                               );
//                             })()}
//                         </div>

//                         <div className="flex flex-col items-start gap-4 mt-4 sm:flex-row sm:justify-between sm:items-end sm:mt-6">
//                           <div className="flex items-center h-10 overflow-hidden bg-white border border-gray-200 shadow-sm sm:h-12 rounded-xl">
//                             <button
//                               onClick={() =>
//                                 handleQtyChange(
//                                   item,
//                                   Math.max(
//                                     1,
//                                     (parseInt(
//                                       qtyInputs[item.id] ||
//                                         String(item.quantity),
//                                     ) || 1) - 1,
//                                   ),
//                                 )
//                               }
//                               disabled={isProcessingCheckout}
//                               className="flex items-center justify-center w-10 h-full text-base font-bold text-gray-700 transition-colors sm:w-12 hover:bg-gray-100 hover:text-gycora"
//                             >
//                               -
//                             </button>
//                             <input
//                               type="text"
//                               value={
//                                 qtyInputs[item.id] !== undefined
//                                   ? qtyInputs[item.id]
//                                   : item.quantity
//                               }
//                               onChange={(e) =>
//                                 handleInputChange(item.id, e.target.value)
//                               }
//                               onBlur={() => handleInputBlur(item)}
//                               disabled={isProcessingCheckout}
//                               className="w-12 h-full text-sm font-bold text-center text-gray-900 bg-transparent border-none outline-none focus:ring-0 sm:text-base"
//                             />
//                             <button
//                               onClick={() =>
//                                 handleQtyChange(
//                                   item,
//                                   Math.min(
//                                     prod.stock,
//                                     (parseInt(
//                                       qtyInputs[item.id] ||
//                                         String(item.quantity),
//                                     ) || 1) + 1,
//                                   ),
//                                 )
//                               }
//                               disabled={isProcessingCheckout}
//                               className="flex items-center justify-center w-10 h-full text-base font-bold text-gray-700 transition-colors sm:w-12 hover:bg-gray-100 hover:text-gycora"
//                             >
//                               +
//                             </button>
//                           </div>
//                           <button
//                             onClick={() => handleOptimisticDelete(item.id)}
//                             className="flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest text-gray-400 uppercase transition-colors group hover:text-red-500"
//                           >
//                             <svg
//                               className="w-4 h-4 transition-transform sm:w-5 sm:h-5 group-hover:rotate-12"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke="currentColor"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                               />
//                             </svg>
//                             {t("btn_remove")}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* SUGGESTED PRODUCTS */}
//           <div className="pt-12 mt-12 border-t border-gray-100">
//             <h3 className="mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase">
//               {t("cart_suggest_title")}
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
//                 {suggestedProducts.map((product) => {
//                   const sugActivePriceObj = getActivePriceObj(
//                     product,
//                     selectedTotalQuantity,
//                   );
//                   const sugBasePriceObj = getPriceToDisplay(product);
//                   const isSugDiscounted =
//                     sugActivePriceObj.value < sugBasePriceObj.value;
//                   const isSugWholesale =
//                     userType === "reseller" &&
//                     getWholesaleToDisplay(product) !== null &&
//                     selectedTotalQuantity >= 24;

//                   return (
//                     <div key={product.id} className="flex flex-col group">
//                       <div
//                         className="relative mb-3 overflow-hidden border border-gray-100 cursor-pointer aspect-square rounded-2xl bg-gray-50"
//                         onClick={() =>
//                           navigate(`${urlPrefix}/product/${product.slug}`, {
//                             state: {
//                               initialProduct: product,
//                               allProducts: suggestedProducts,
//                             },
//                           })
//                         }
//                       >
//                         <img
//                           src={product.image_url}
//                           alt={product.name}
//                           className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
//                         />
//                         {isSugDiscounted && (
//                           <div
//                             className={`absolute px-2 py-0.5 text-[9px] font-bold text-white top-2 left-2 rounded shadow-sm ${isSugWholesale ? "bg-blue-600" : "bg-rose-500"}`}
//                           >
//                             {isSugWholesale ? "GROSIR" : t("cart_sale_badge")}
//                           </div>
//                         )}
//                       </div>
//                       <h4 className="mb-1 text-[11px] font-bold tracking-wide text-gray-900 uppercase truncate">
//                         {product.name}
//                       </h4>
//                       {isSugDiscounted ? (
//                         <div className="mb-3">
//                           <p
//                             className={`text-xs font-bold ${isSugWholesale ? "text-blue-500" : "text-rose-500"}`}
//                           >
//                             {formatCurrencyDisplay(sugActivePriceObj)}
//                           </p>
//                           <p className="text-[9px] text-gray-400 line-through">
//                             {formatCurrencyDisplay(sugBasePriceObj)}
//                           </p>
//                         </div>
//                       ) : (
//                         <p className="mb-3 text-xs font-bold text-gycora">
//                           {formatCurrencyDisplay(sugBasePriceObj)}
//                         </p>
//                       )}
//                       <button
//                         onClick={() => addSuggestedProduct(product)}
//                         className="px-3 py-2 mt-auto text-[9px] font-bold tracking-widest text-gray-700 uppercase transition-all duration-300 border border-gray-200 rounded-xl hover:border-gray-900 hover:bg-gray-900 hover:text-white"
//                       >
//                         {Array.isArray(product.color) &&
//                         product.color.length > 0
//                           ? t("btn_choose_variant")
//                           : t("btn_add_plus")}
//                       </button>
//                     </div>
//                   );
//                 })}
//               </div>
//             ) : null}
//           </div>
//         </div>

//         {/* RIGHT SIDE: CART SUMMARY */}
//         {localCartItems.length > 0 && (
//           <div
//             className="lg:w-1/3 animate-fade-in-up"
//             style={{ animationDelay: "200ms" }}
//           >
//             <div className="sticky p-8 bg-gray-50/50 border border-gray-100 rounded-[2rem] top-32 shadow-sm">
//               <h2 className="pb-4 mb-8 text-lg font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">
//                 {t("cart_summary_title")}
//               </h2>
//               <div className="mb-8 space-y-4">
//                 <div className="flex justify-between text-sm text-gray-600">
//                   <span>{t("cart_selected_items")}</span>
//                   <span className="font-bold text-gray-900">
//                     {selectedTotalQuantity} Pcs
//                   </span>
//                 </div>

//                 {cartCalculations.appliedBundlesCount > 0 && (
//                   <div className="flex items-center justify-between p-4 border border-purple-200 rounded-2xl bg-purple-50">
//                     <div className="flex items-center gap-3">
//                       <span className="flex items-center justify-center w-6 h-6 text-xs text-white bg-purple-600 rounded-full shadow-sm">
//                         ✓
//                       </span>
//                       <span className="text-xs font-extrabold tracking-wide text-purple-800 uppercase">
//                         Promo Bundle Aktif
//                       </span>
//                     </div>
//                     <span className="text-sm font-black text-purple-700">
//                       {cartCalculations.appliedBundlesCount} Paket
//                     </span>
//                   </div>
//                 )}

//                 <div className="flex items-end justify-between pt-4 border-t border-gray-200">
//                   <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
//                     {t("cart_estimated_total")}
//                   </span>
//                   <span className="text-2xl font-black text-gycora">
//                     {formatCurrencyDisplay(cartCalculations.totalObj)}
//                   </span>
//                 </div>
//                 <p className="mt-1 text-right text-[10px] italic text-gray-400">
//                   {t("cart_tax_shipping_note")}
//                 </p>
//               </div>
//               <button
//                 onClick={handleCheckout}
//                 disabled={isProcessingCheckout || selectedIds.length === 0}
//                 className="flex items-center justify-center w-full gap-3 py-5 text-sm font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/20"
//               >
//                 {!isProcessingCheckout ? (
//                   t("btn_checkout", { count: selectedIds.length.toString() })
//                 ) : (
//                   <span className="flex items-center gap-2">
//                     <div className="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"></div>
//                     {t("cart_processing")}
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

/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCart, type Product } from "../../context/CartContext";
import { BASE_URL } from "../../config/api";
import { useLanguage } from "../../context/LanguageContext";
import { useCurrency } from "../../context/CurrencyContext";

interface CartItem {
  id: number;
  product_id: number;
  product_slug: string;
  product: Product;
  quantity: number;
  gross_amount: number;
  color?: string | null;
}

type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

export default function CartPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { currency, exchangeRates } = useCurrency() as any;

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
  const [rawSuggestedPool, setRawSuggestedPool] = useState<Product[]>([]);
  const [catalogProducts, setCatalogProducts] = useState<any[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(true);
  const [qtyInputs, setQtyInputs] = useState<{ [key: number]: string }>({});
  const [userType, setUserType] = useState<string>("guest");
  const debounceTimers = useRef<{ [key: number]: number }>({});

  const getUrlPrefix = () => {
    if (location.pathname.startsWith("/id")) return "/id";
    if (location.pathname.startsWith("/en")) return "/en";
    return "";
  };

  const urlPrefix = getUrlPrefix();

  useEffect(() => {
    const userStr = localStorage.getItem("user_data");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserType(user.usertype || "user");
      } catch (e) {
        setUserType("guest");
      }
    }
  }, []);

  useEffect(() => {
    setLocalCartItems(contextCartItems);
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

  const isAllSelected = localCartItems.length > 0 && selectedIds.length === localCartItems.length;

  const handleSelectAll = () => {
    if (isAllSelected) setSelectedIds([]);
    else setSelectedIds(localCartItems.map((item) => item.id));
  };

  const handleSelectItem = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id],
    );
  };

  const selectedTotalQuantity = useMemo(() => {
    return localCartItems
      .filter((item) => selectedIds.includes(item.id))
      .reduce((sum, item) => sum + item.quantity, 0);
  }, [localCartItems, selectedIds]);

  // ============================================================================
  // FUNGSI HELPER MULTI-CURRENCY
  // ============================================================================
  const convertIDRtoActiveCurrency = (idrAmount: number) => {
    const curr = (currency as Currency) || "IDR";
    if (curr === "IDR" || !exchangeRates || !exchangeRates[curr])
      return { value: idrAmount, curr: "IDR" };
    return { value: idrAmount * exchangeRates[curr], curr: curr };
  };

  const getPriceToDisplay = (product: Product | null) => {
    if (!product) return { value: 0, curr: "IDR" };
    const curr = (currency as Currency) || "IDR";
    const basePrice = Number(product.price) || 0;

    if (curr === "IDR") return { value: basePrice, curr: "IDR" };
    try {
      const pricesObj = typeof product.prices === "string" ? JSON.parse(product.prices) : product.prices || {};
      const dbPrice = pricesObj[curr] || pricesObj[curr.toLowerCase()] || pricesObj[curr.toUpperCase()];
      if (dbPrice) return { value: parseFloat(dbPrice), curr: curr };
    } catch (e) {}
    return convertIDRtoActiveCurrency(basePrice);
  };

  const getDiscountToDisplay = (product: Product | null) => {
    if (!product) return null;
    const curr = (currency as Currency) || "IDR";
    const baseDisc = Number(product.discount_price) || 0;

    if (curr === "IDR") return baseDisc > 0 ? { value: baseDisc, curr: "IDR" } : null;
    try {
      const discObj = typeof product.discount_prices === "string" ? JSON.parse(product.discount_prices) : product.discount_prices || {};
      const dbDisc = discObj[curr] || discObj[curr.toLowerCase()] || discObj[curr.toUpperCase()];
      if (dbDisc) return { value: parseFloat(dbDisc), curr: curr };
    } catch (e) {}
    return baseDisc > 0 ? convertIDRtoActiveCurrency(baseDisc) : null;
  };

  const getWholesaleToDisplay = (product: Product | null) => {
    if (!product) return null;
    const curr = (currency as Currency) || "IDR";
    const baseWholesale = Number(product.wholesale_price) || 0;

    if (curr === "IDR") return baseWholesale > 0 ? { value: baseWholesale, curr: "IDR" } : null;
    try {
      const wholesaleObj = typeof product.wholesale_price === "string" ? JSON.parse(product.wholesale_price) : (product as any).wholesale_prices || {};
      const dbWholesale = wholesaleObj[curr] || wholesaleObj[curr.toLowerCase()] || wholesaleObj[curr.toUpperCase()];
      if (dbWholesale) return { value: parseFloat(dbWholesale), curr: curr };
    } catch (e) {}
    return baseWholesale > 0 ? convertIDRtoActiveCurrency(baseWholesale) : null;
  };

  const getBundleToDisplay = (product: Product | null) => {
    if (!product) return null;
    const curr = (currency as Currency) || "IDR";
    const baseBundle = Number(product.bundle_price) || 0;

    if (curr === "IDR") return baseBundle > 0 ? { value: baseBundle, curr: "IDR" } : null;
    try {
      const bundleObj = typeof product.bundle_prices === "string" ? JSON.parse(product.bundle_prices) : product.bundle_prices || {};
      const dbBundle = bundleObj[curr] || bundleObj[curr.toLowerCase()] || bundleObj[curr.toUpperCase()];
      if (dbBundle) return { value: parseFloat(dbBundle), curr: curr };
    } catch (e) {}
    return baseBundle > 0 ? convertIDRtoActiveCurrency(baseBundle) : null;
  };

  const getActivePriceObj = (product: Product, totalQty: number) => {
    const isReseller = userType === "reseller";
    const dynamicPriceObj = getPriceToDisplay(product);
    const dynamicDiscountObj = getDiscountToDisplay(product);
    const dynamicWholesaleObj = getWholesaleToDisplay(product);

    if (isReseller && dynamicWholesaleObj && dynamicWholesaleObj.value > 0 && totalQty >= 24) {
      return dynamicWholesaleObj;
    } else if (dynamicDiscountObj && dynamicDiscountObj.value > 0 && dynamicDiscountObj.value < dynamicPriceObj.value) {
      return dynamicDiscountObj;
    }
    return dynamicPriceObj;
  };

  const formatCurrencyDisplay = (priceObj: { value: number; curr: string } | null) => {
    if (!priceObj) return "";
    const symbols: any = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
    const formatter = new Intl.NumberFormat(priceObj.curr === "IDR" ? "id-ID" : "en-US", {
      minimumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
      maximumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
    });
    return `${symbols[priceObj.curr] || priceObj.curr + " "}${formatter.format(priceObj.value)}`;
  };

  const getFreshProduct = (cartProduct: any) => {
    if (catalogProducts.length > 0 && cartProduct) {
      const fresh = catalogProducts.find((p) => p.id === cartProduct.id || p.id === cartProduct.product_id);
      if (fresh) return fresh;
    }
    return cartProduct;
  };

  // ============================================================================
  // OTAK UTAMA: MENGHITUNG HARGA BUNDLE DAN TOTAL KERANJANG TERPADU
  // ============================================================================
  const checkoutData = useMemo(() => {
    const curr = (currency as Currency) || "IDR";
    let totalValue = 0;
    let appliedBundlesCount = 0;

    const itemGrossAmounts: { [cartId: number]: number } = {};
    const isBundledMap: Record<number, boolean> = {};
    const isEligibleForBundleMap: Record<number, boolean> = {}; 
    const bundlePool: { cartId: number; normalPrice: number; bundlePrice: number }[] = [];

    const selectedItems = localCartItems.filter((item) => selectedIds.includes(item.id));
    const isReseller = userType === "reseller";
    const isWholesaleGlobal = isReseller && selectedTotalQuantity >= 24;

    selectedItems.forEach((item) => {
      const prod = getFreshProduct(item.product);
      const qty = item.quantity;

      itemGrossAmounts[item.id] = 0;
      isBundledMap[item.id] = false;
      isEligibleForBundleMap[item.id] = false;

      const activePriceObj = getActivePriceObj(prod, selectedTotalQuantity);
      const bundleObj = getBundleToDisplay(prod);
      const wholesaleObj = getWholesaleToDisplay(prod);

      // Grosir mematikan semua logika bundle
      if (isWholesaleGlobal && wholesaleObj && wholesaleObj.value > 0) {
        itemGrossAmounts[item.id] = wholesaleObj.value * qty;
        totalValue += wholesaleObj.value * qty;
        return; 
      }

      // Pengecekan Aman (Kebal terhadap string "1", integer 1, atau boolean true)
      const rawFlag = prod.is_bundle_active;
      const isBundleActiveFlag = rawFlag === true || rawFlag === 1 || rawFlag === "1" || String(rawFlag).toLowerCase() === "true";

      let isValidDate = true;
      if (prod.bundle_end_date && prod.bundle_end_date !== "0000-00-00 00:00:00") {
        const safeDateStr = prod.bundle_end_date.replace(" ", "T");
        const d = new Date(safeDateStr);
        if (!isNaN(d.getTime())) isValidDate = d.getTime() > Date.now();
      }

      const isBundleValid = isBundleActiveFlag && isValidDate && bundleObj && bundleObj.value > 0;

      if (isBundleValid) {
        isEligibleForBundleMap[item.id] = true;
        for (let i = 0; i < qty; i++) {
          bundlePool.push({
            cartId: item.id,
            normalPrice: activePriceObj.value,
            bundlePrice: bundleObj.value
          });
        }
      } else {
        itemGrossAmounts[item.id] = activePriceObj.value * qty;
        totalValue += activePriceObj.value * qty;
      }
    });

    // Proses pencarian Pasangan dari kolam
    bundlePool.sort((a, b) => b.bundlePrice - a.bundlePrice);
    const totalBundleItems = bundlePool.length;
    const pairs = Math.floor(totalBundleItems / 2); 

    for (let i = 0; i < pairs; i++) {
      const item1 = bundlePool[i * 2];
      const item2 = bundlePool[i * 2 + 1];

      const pairPrice = Math.max(item1.bundlePrice, item2.bundlePrice);
      const halfPrice = pairPrice / 2;

      itemGrossAmounts[item1.cartId] += halfPrice;
      itemGrossAmounts[item2.cartId] += halfPrice;

      isBundledMap[item1.cartId] = true;
      isBundledMap[item2.cartId] = true;

      totalValue += pairPrice;
      appliedBundlesCount++;
    }

    // Sisa produk jomblo dikembalikan ke harga normal
    for (let i = pairs * 2; i < totalBundleItems; i++) {
      const unpairedItem = bundlePool[i];
      itemGrossAmounts[unpairedItem.cartId] += unpairedItem.normalPrice;
      totalValue += unpairedItem.normalPrice;
    }

    return {
      totalObj: { value: totalValue, curr },
      appliedBundlesCount,
      itemGrossAmounts,
      isBundledMap,
      isEligibleForBundleMap,
    };
  }, [localCartItems, selectedIds, userType, selectedTotalQuantity, currency, catalogProducts]);

  // ============================================================================

  const handleQtyChange = (item: CartItem, newQty: number) => {
    if (newQty < 1) newQty = 1;
    if (newQty > item.product.stock) {
      Swal.fire({
        toast: true, position: "top-end", icon: "warning",
        title: t("cart_max_stock_warning", { stock: item.product.stock.toString() }),
        showConfirmButton: false, timer: 2000,
      });
      newQty = item.product.stock;
    }

    const token = localStorage.getItem("user_token");
    const originalItems = [...localCartItems];

    setLocalCartItems((prevItems) =>
      prevItems.map((cartItem) => cartItem.id === item.id ? { ...cartItem, quantity: newQty } : cartItem),
    );
    updateCartItemQtyOptimistically(item.id, newQty, 0);
    setQtyInputs((prev) => ({ ...prev, [item.id]: newQty.toString() }));

    if (debounceTimers.current[item.id]) window.clearTimeout(debounceTimers.current[item.id]);

    debounceTimers.current[item.id] = window.setTimeout(async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/carts/${item.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ quantity: newQty }),
        });

        if (!res.ok) {
          const err = await res.json();
          Swal.fire(t("notification"), err.message || t("cart_update_fail"), "warning");
          revertCartItems(originalItems);
          fetchCart();
        }
      } catch (error) {
        Swal.fire(t("error"), t("cart_server_error"), "error");
        revertCartItems(originalItems);
        fetchCart();
      }
    }, 800);
  };

  const handleInputChange = (itemId: number, value: string) => {
    if (value === "" || /^\d+$/.test(value)) setQtyInputs((prev) => ({ ...prev, [itemId]: value }));
  };

  const handleInputBlur = (item: CartItem) => {
    let parsed = parseInt(qtyInputs[item.id]);
    if (isNaN(parsed) || parsed < 1) parsed = 1;
    handleQtyChange(item, parsed);
  };

  const handleOptimisticDelete = async (id: number) => {
    const token = localStorage.getItem("user_token");
    const originalItems = [...localCartItems];

    setLocalCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
    removeCartItemOptimistically(id);

    if (debounceTimers.current[id]) {
      window.clearTimeout(debounceTimers.current[id]);
      delete debounceTimers.current[id];
    }

    try {
      const res = await fetch(`${BASE_URL}/api/carts/${id}`, {
        method: "DELETE",
        headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        revertCartItems(originalItems);
        Swal.fire(t("notification"), t("cart_delete_fail"), "warning");
        fetchCart();
      }
    } catch (error) {
      revertCartItems(originalItems);
      Swal.fire(t("error"), t("cart_delete_fail"), "error");
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products`);
        const data = await res.json();
        const products: any[] = data.data ? data.data : data;

        setCatalogProducts(products); 

        const available = products.filter((p) => p.stock > 0);
        const shuffled = available.sort(() => 0.5 - Math.random());
        setRawSuggestedPool(shuffled);
      } catch (error) {
        console.error("Gagal memuat rekomendasi:", error);
      } finally {
        setLoadingSuggestions(false);
      }
    };
    fetchSuggestions();
  }, []);

  useEffect(() => {
    const cartProductIds = localCartItems.map((item) => item.product_id);
    const finalSuggestions = rawSuggestedPool.filter((p) => !cartProductIds.includes(p.id)).slice(0, 4);
    setSuggestedProducts(finalSuggestions);
  }, [localCartItems, rawSuggestedPool]);

  const addSuggestedProduct = async (product: Product) => {
    const token = localStorage.getItem("user_token");
    if (!token) { navigate(`${urlPrefix}/login`); return; }
    if (Array.isArray(product.color) && product.color.length > 0) { navigate(`${urlPrefix}/product/${product.slug}`); return; }
    try {
      const res = await fetch(`${BASE_URL}/api/carts`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ product_id: product.id, quantity: 1 }),
      });

      if (res.ok) {
        Swal.fire({ title: t("added_to_cart"), icon: "success", toast: true, position: "top-end", timer: 1500, showConfirmButton: false });
        fetchCart();
      }
    } catch (error) {}
  };

  const handleCheckout = () => {
    if (selectedIds.length === 0) return;
    setIsProcessingCheckout(true);
    setTimeout(() => {
      setIsProcessingCheckout(false);
      navigate(`${urlPrefix}/checkout`, { state: { selectedIds: selectedIds } });
    }, 800);
  };

  return (
    <div className="w-full min-h-screen px-4 py-16 mx-auto overflow-x-hidden font-sans bg-gray-100 max-w-7xl sm:px-6 lg:px-8">
      <div className="flex items-center gap-4 mb-10 animate-fade-in-up">
        <button onClick={() => navigate(`${urlPrefix}/products`)} className="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50">
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl">{t("cart_title")}</h1>
        <span className="ml-2 text-xl font-medium text-gray-400">{t("cart_items_count", { count: localCartItems.length.toString() })}</span>
      </div>

      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        <div className="flex-grow lg:w-2/3 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          {userType === "reseller" && localCartItems.length > 0 && (
            <div className={`p-4 mb-6 border rounded-2xl flex items-center justify-between transition-all duration-500 ${selectedTotalQuantity >= 24 ? "bg-blue-600 border-blue-700 text-white shadow-lg" : "bg-blue-50 border-blue-200 text-blue-900"}`}>
              <div>
                <h3 className="text-sm font-bold md:text-base">{selectedTotalQuantity >= 24 ? "🎉 Harga Grosir Aktif!" : "Aktifkan Harga Grosir"}</h3>
                <p className={`text-xs md:text-sm mt-1 ${selectedTotalQuantity >= 24 ? "text-blue-100" : "text-blue-700"}`}>
                  {selectedTotalQuantity >= 24 ? `Luar biasa! Anda membeli ${selectedTotalQuantity} item dan menikmati harga modal pabrik.` : `Centang atau tambah ${24 - selectedTotalQuantity} barang lagi untuk mendapatkan harga reseller.`}
                </p>
              </div>
              <div className="pl-4 shrink-0">
                <div className={`flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border-4 ${selectedTotalQuantity >= 24 ? "border-white bg-blue-500" : "border-blue-300 bg-white"}`}>
                  <span className={`font-black text-sm md:text-lg ${selectedTotalQuantity >= 24 ? "text-white" : "text-blue-600"}`}>{selectedTotalQuantity}/24</span>
                </div>
              </div>
            </div>
          )}

          {localCartItems.length === 0 ? (
            <div className="py-20 text-center border border-gray-200 border-dashed rounded-3xl bg-gray-50">
              <p className="mb-6 text-2xl font-medium text-gray-400">{t("cart_empty_title")}</p>
              <button onClick={() => navigate(`${urlPrefix}/collections/all`)} className="px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition bg-gray-900 rounded-full shadow-xl hover:bg-black shadow-gray-200">
                {t("btn_start_shopping")}
              </button>
            </div>
          ) : (
            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-3xl sm:p-8">
              <div className="flex items-center gap-4 pb-4 mb-4 border-b border-gray-100">
                <input type="checkbox" checked={isAllSelected} onChange={handleSelectAll} id="selectAll" className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora" />
                <label htmlFor="selectAll" className="text-xs font-bold tracking-widest text-gray-800 uppercase cursor-pointer select-none">{t("cart_select_all")}</label>
              </div>

              <div className="space-y-8">
                {localCartItems.map((item: CartItem) => {
                  const prod = getFreshProduct(item.product);
                  const basePriceObj = getPriceToDisplay(prod);
                  
                  const activePriceObj = getActivePriceObj(prod, selectedTotalQuantity);
                  const isDiscountedVisual = activePriceObj.value < basePriceObj.value;
                  const isWholesaleActive = userType === "reseller" && getWholesaleToDisplay(prod) !== null && selectedTotalQuantity >= 24;

                  const isItemSelected = selectedIds.includes(item.id);
                  const calculatedGross = checkoutData.itemGrossAmounts[item.id];
                  
                  const isBundled = isItemSelected && checkoutData.isBundledMap[item.id];
                  const isEligible = checkoutData.isEligibleForBundleMap[item.id];

                  const currentGrossAmountObj = {
                    value: isItemSelected && calculatedGross !== undefined ? calculatedGross : activePriceObj.value * item.quantity,
                    curr: checkoutData.totalObj.curr,
                  };

                  const originalGrossAmountObj = {
                    value: basePriceObj.value * item.quantity,
                    curr: basePriceObj.curr,
                  };

                  return (
                    <div key={item.id} className="relative flex items-start gap-4 pb-8 border-b border-gray-50 sm:gap-6 last:border-0 last:pb-0">
                      <div className="pt-3 sm:pt-12">
                        <input type="checkbox" checked={isItemSelected} onChange={() => handleSelectItem(item.id)} className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora" />
                      </div>
                      <div className="relative w-24 h-24 overflow-hidden border border-gray-100 cursor-pointer shrink-0 sm:w-40 sm:h-40 rounded-2xl bg-gray-50" onClick={() => navigate(`${urlPrefix}/product/${prod.slug}`)}>
                        <img src={prod.image_url} alt={prod.name} className="object-cover w-full h-full transition-transform duration-500 hover:scale-105" />
                        
                        {isBundled ? (
                          <div className="absolute px-2 py-0.5 text-[9px] font-bold text-white top-2 left-2 rounded shadow-sm bg-purple-600">BUNDLE AKTIF</div>
                        ) : isEligible ? (
                          <div className="absolute px-2 py-0.5 text-[9px] font-bold text-white top-2 left-2 rounded shadow-sm bg-indigo-400">MENUNGGU PASANGAN</div>
                        ) : isDiscountedVisual ? (
                          <div className={`absolute px-2 py-0.5 text-[9px] font-bold text-white top-2 left-2 rounded shadow-sm ${isWholesaleActive ? "bg-blue-600" : "bg-rose-500"}`}>
                            {isWholesaleActive ? "GROSIR" : t("cart_sale_badge")}
                          </div>
                        ) : null}
                      </div>

                      <div className="flex flex-col justify-between flex-grow min-h-[6rem] sm:min-h-[10rem]">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="w-2/3 text-sm font-bold tracking-tight text-gray-900 transition-colors cursor-pointer sm:text-lg hover:text-gycora line-clamp-2" onClick={() => navigate(`${urlPrefix}/product/${prod.slug}`)}>
                              {prod.name}
                            </h3>
                            <div className="text-right">
                              <p className={`text-sm font-extrabold sm:text-lg whitespace-nowrap ${isBundled ? "text-purple-600" : isWholesaleActive ? "text-blue-600" : "text-gycora"}`}>
                                {formatCurrencyDisplay(currentGrossAmountObj)}
                              </p>
                              {isBundled ? (
                                <span className="inline-block mt-1 text-[10px] font-black text-purple-600 uppercase bg-purple-100 px-2 py-0.5 rounded shadow-sm">Harga Promo Paket</span>
                              ) : isDiscountedVisual ? (
                                <p className="text-[10px] text-gray-400 line-through mt-0.5">{formatCurrencyDisplay(originalGrossAmountObj)}</p>
                              ) : null}
                            </div>
                          </div>

                          {item.color && (() => {
                            let hex = item.color as string;
                            let name = "";
                            try {
                              const parsed = JSON.parse(item.color as string);
                              if (parsed.hex) { hex = parsed.hex; name = parsed.name || ""; }
                            } catch {
                              if (Array.isArray(prod.color)) {
                                const matched = prod.color.find((c: any) => (typeof c === "object" && c !== null && c.hex === item.color) || c === item.color);
                                if (matched && typeof matched === "object" && matched !== null) name = (matched as { name?: string }).name || "";
                              }
                            }
                            return (
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">{t("cart_variant_label")}</span>
                                <div className="flex items-center gap-2 px-2 py-1 bg-white border border-gray-200 rounded-md shadow-sm">
                                  <span className="w-3 h-3 border border-gray-300 rounded-full shadow-inner shrink-0" style={{ backgroundColor: hex }}></span>
                                  <span className="text-[10px] font-bold text-gray-700">{name ? name : <span className="font-mono uppercase">{hex}</span>}</span>
                                </div>
                              </div>
                            );
                          })()}
                        </div>

                        <div className="flex flex-col items-start gap-4 mt-4 sm:flex-row sm:justify-between sm:items-end sm:mt-6">
                          <div className="flex items-center h-10 overflow-hidden bg-white border border-gray-200 shadow-sm sm:h-12 rounded-xl">
                            <button onClick={() => handleQtyChange(item, Math.max(1, (parseInt(qtyInputs[item.id] || String(item.quantity)) || 1) - 1))} disabled={isProcessingCheckout} className="flex items-center justify-center w-10 h-full text-base font-bold text-gray-700 transition-colors sm:w-12 hover:bg-gray-100 hover:text-gycora focus:outline-none">-</button>
                            <input type="text" value={qtyInputs[item.id] !== undefined ? qtyInputs[item.id] : item.quantity} onChange={(e) => handleInputChange(item.id, e.target.value)} onBlur={() => handleInputBlur(item)} disabled={isProcessingCheckout} className="w-12 h-full text-sm font-bold text-center text-gray-900 bg-transparent border-none outline-none focus:ring-0 sm:text-base" />
                            <button onClick={() => handleQtyChange(item, Math.min(prod.stock, (parseInt(qtyInputs[item.id] || String(item.quantity)) || 1) + 1))} disabled={isProcessingCheckout} className="flex items-center justify-center w-10 h-full text-base font-bold text-gray-700 transition-colors sm:w-12 hover:bg-gray-100 hover:text-gycora focus:outline-none">+</button>
                          </div>
                          <button onClick={() => handleOptimisticDelete(item.id)} className="flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest text-gray-400 uppercase transition-colors group hover:text-red-500">
                            <svg className="w-4 h-4 transition-transform sm:w-5 sm:h-5 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
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

          {/* SUGGESTED PRODUCTS */}
          <div className="pt-12 mt-12 border-t border-gray-100">
            <h3 className="mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase">{t("cart_suggest_title")}</h3>
            {loadingSuggestions ? (
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col gap-2"><div className="bg-gray-100 aspect-square rounded-2xl animate-pulse"></div><div className="w-3/4 h-3 mt-1 bg-gray-100 rounded animate-pulse"></div><div className="w-1/2 h-3 bg-gray-100 rounded animate-pulse"></div></div>
                ))}
              </div>
            ) : suggestedProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {suggestedProducts.map((product) => {
                  const sugActivePriceObj = getActivePriceObj(product, selectedTotalQuantity);
                  const sugBasePriceObj = getPriceToDisplay(product);
                  const isSugDiscounted = sugActivePriceObj.value < sugBasePriceObj.value;

                  const isSugWholesale = userType === "reseller" && getWholesaleToDisplay(product) !== null && selectedTotalQuantity >= 24;

                  return (
                    <div key={product.id} className="flex flex-col group">
                      <div className="relative mb-3 overflow-hidden border border-gray-100 cursor-pointer aspect-square rounded-2xl bg-gray-50" onClick={() => navigate(`${urlPrefix}/product/${product.slug}`, { state: { initialProduct: product, allProducts: suggestedProducts } })}>
                        <img src={product.image_url} alt={product.name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />
                        {isSugDiscounted && <div className={`absolute px-2 py-0.5 text-[9px] font-bold text-white top-2 left-2 rounded shadow-sm ${isSugWholesale ? "bg-blue-600" : "bg-rose-500"}`}>{isSugWholesale ? "GROSIR" : t("cart_sale_badge")}</div>}
                      </div>
                      <h4 className="mb-1 text-[11px] font-bold tracking-wide text-gray-900 uppercase truncate">{product.name}</h4>
                      {isSugDiscounted ? (
                        <div className="mb-3">
                          <p className={`text-xs font-bold ${isSugWholesale ? "text-blue-500" : "text-rose-500"}`}>{formatCurrencyDisplay(sugActivePriceObj)}</p>
                          <p className="text-[9px] text-gray-400 line-through">{formatCurrencyDisplay(sugBasePriceObj)}</p>
                        </div>
                      ) : <p className="mb-3 text-xs font-bold text-gycora">{formatCurrencyDisplay(sugBasePriceObj)}</p>}
                      <button onClick={() => addSuggestedProduct(product)} className="px-3 py-2 mt-auto text-[9px] font-bold tracking-widest text-gray-700 uppercase transition-all duration-300 border border-gray-200 rounded-xl hover:border-gray-900 hover:bg-gray-900 hover:text-white">
                        {Array.isArray(product.color) && product.color.length > 0 ? t("btn_choose_variant") : t("btn_add_plus")}
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>

        {/* RIGHT SIDE: CART SUMMARY */}
        {localCartItems.length > 0 && (
          <div className="lg:w-1/3 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <div className="sticky p-8 bg-gray-50/50 border border-gray-100 rounded-[2rem] top-32 shadow-sm">
              <h2 className="pb-4 mb-8 text-lg font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">{t("cart_summary_title")}</h2>
              <div className="mb-8 space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{t("cart_selected_items")}</span>
                  <span className="font-bold text-gray-900">{selectedTotalQuantity} Pcs</span>
                </div>

                {checkoutData.appliedBundlesCount > 0 && (
                  <div className="flex items-center justify-between p-4 border border-purple-200 rounded-2xl bg-purple-50">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-6 h-6 text-xs text-white bg-purple-600 rounded-full shadow-sm">✓</span>
                      <span className="text-xs font-extrabold tracking-wide text-purple-800 uppercase">Promo Bundle Aktif</span>
                    </div>
                    <span className="text-sm font-black text-purple-700">{checkoutData.appliedBundlesCount} Paket</span>
                  </div>
                )}

                <div className="flex items-end justify-between pt-4 border-t border-gray-200">
                  <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">{t("cart_estimated_total")}</span>
                  <span className="text-2xl font-black text-gycora">{formatCurrencyDisplay(checkoutData.totalObj)}</span>
                </div>
                <p className="mt-1 text-right text-[10px] italic text-gray-400">{t("cart_tax_shipping_note")}</p>
              </div>
              <button onClick={handleCheckout} disabled={isProcessingCheckout || selectedIds.length === 0} className="flex items-center justify-center w-full gap-3 py-5 text-sm font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/20">
                {!isProcessingCheckout ? t("btn_checkout", { count: selectedIds.length.toString() }) : <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"></div>{t("cart_processing")}</span>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
