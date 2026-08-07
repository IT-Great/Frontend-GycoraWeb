/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable prefer-const */
// /* eslint-disable @typescript-eslint/no-unused-expressions */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState, useEffect, useMemo } from "react";
// import { Link, useNavigate } from "react-router-dom"; 
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../../config/api";
// import { useLanguage } from "../../../context/LanguageContext";
// import { useCurrency } from "../../../context/CurrencyContext";

// interface Product {
//   id: number;
//   category_name: string;
//   sku?: string;
//   name: string;
//   slug: string;
//   description?: string;
//   benefits?: string;
//   price: number;
//   prices?: any;            // Field Data Harga Multi-currency
//   discount_price?: number;
//   discount_prices?: any;   // Field Data Diskon Multi-currency
//   wholesale_price?: number; 
//   voucher_discount_price?: number;
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   color?: any; 
//   name_en?: string;
//   category_en?: string;
// }

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

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
//   const { t, lang } = useLanguage(); 
  
//   // 👇 [PERBAIKAN] Langsung gunakan state dari Context! Tidak perlu useState/LocalStorage hack lagi 👇
//   const { currency } = useCurrency();
  
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [wishlistIds, setWishlistIds] = useState<number[]>([]);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeCategory, setActiveCategory] = useState(t("cat_all"));
//   const [sortBy] = useState("name_asc"); 

//   const [userType, setUserType] = useState<string>('guest');

//   useEffect(() => {
//     setActiveCategory(t("cat_all"));
    
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);
//         setUserType(user.usertype || 'user');
//       } catch (e) {
//         setUserType('guest');
//       }
//     }
//   }, [lang, t]);


//   // ============================================================================
//   // LOGIKA HARGA MULTI-CURRENCY & FALLBACK (Reaktif karena terikat pada Context)
//   // ============================================================================
//   const getPriceToDisplay = (product: Product) => {
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return { value: product.price, curr: 'IDR' };
  
//     const pricesObj = typeof product.prices === 'string' ? JSON.parse(product.prices) : (product.prices || {});
//     if (pricesObj[curr]) {
//       return { value: parseFloat(pricesObj[curr]), curr: curr };
//     }
//     return { value: product.price, curr: 'IDR' };
//   };

//   const getDiscountToDisplay = (product: Product) => {
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
  
//     const discObj = typeof product.discount_prices === 'string' ? JSON.parse(product.discount_prices) : (product.discount_prices || {});
//     if (discObj[curr]) {
//       return { value: parseFloat(discObj[curr]), curr: curr };
//     }
//     return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
//   };

//   const formatCurrencyDisplay = (priceObj: {value: number, curr: string} | null) => {
//     if (!priceObj) return "";
//     const symbols: any = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
    
//     const formatter = new Intl.NumberFormat(priceObj.curr === "IDR" ? "id-ID" : "en-US", {
//       minimumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//       maximumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//     });
  
//     return `${symbols[priceObj.curr] || priceObj.curr + " "}${formatter.format(priceObj.value)}`;
//   };
//   // ============================================================================


//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (!res.ok) throw new Error("Gagal mengambil data produk");

//         const responseData = await res.json();
//         let productsArray = responseData.data ? responseData.data : responseData;
//         productsArray = productsArray || [];

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
//           setWishlistIds(data.map((item: any) => item.product_id));
//         }
//       } catch (error) {
//         console.error("Gagal mengambil wishlist:", error);
//       }
//     };

//     fetchProducts();
//     fetchWishlists();
//   }, [lang]);

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
//         if (result.isConfirmed) navigate(`/${lang}/login`);
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
          
//           <div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar md:pb-0">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setActiveCategory(cat as string)}
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
//                 <div className="w-full bg-gray-200 aspect-square"></div>
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
              
//               const displayCategory = lang === "en" ? (product.category_en || product.category_name) : product.category_name;
//               const displayName = lang === "en" ? (product.name_en || product.name) : product.name;

//               // Ambil harga yang dikonversi dari helper custom kita
//               const dynamicPriceObj = getPriceToDisplay(product);
//               const dynamicDiscountObj = getDiscountToDisplay(product);

//               const hasWholesale = product.wholesale_price && product.wholesale_price > 0;
//               const isReseller = userType === 'reseller';

//               let finalPriceObj = dynamicPriceObj;
//               let isDiscounted = false;
//               let discountPercentage = 0;

//               // Logika Reseller: Jika reseller dan wholesale tersedia, maka timpa (Grosir tetap dlm IDR)
//               if (isReseller && hasWholesale) {
//                 finalPriceObj = { value: product.wholesale_price!, curr: 'IDR' };
//                 isDiscounted = true;
//                 discountPercentage = Math.round(((product.price - product.wholesale_price!) / product.price) * 100);
//               } 
//               else if (dynamicDiscountObj && dynamicDiscountObj.value > 0 && dynamicDiscountObj.value < dynamicPriceObj.value) {
//                 finalPriceObj = dynamicDiscountObj;
//                 isDiscounted = true;
//                 discountPercentage = Math.round(((dynamicPriceObj.value - dynamicDiscountObj.value) / dynamicPriceObj.value) * 100);
//               }

//               return (
//                 <Link 
//                   key={product.id} 
//                   to={`/${lang}/product/${product.slug}`} 
//                   state={{ 
//                     initialProduct: product,
//                     allProducts: products
//                   }}
//                   className="relative flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm group rounded-2xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1"
//                 >
//                   <div className="relative overflow-hidden aspect-square bg-gray-50">
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
//                       <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-md shadow-sm bg-white/90 backdrop-blur-sm w-fit">
//                         {displayCategory}
//                       </span>
//                       {product.stock < 5 && product.stock > 0 && (
//                         <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm bg-red-500/90 backdrop-blur-sm animate-pulse w-fit">
//                           {t("stock_warning", { stock: product.stock.toString() })}
//                         </span>
//                       )}
//                       {product.stock === 0 && (
//                          <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm bg-gray-900/90 backdrop-blur-sm w-fit">
//                           {t("status_out_of_stock")}
//                         </span>
//                       )}
                      
//                       {/* Badge Diskon / Grosir */}
//                       {isDiscounted && (
//                          <span className={`px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm w-fit ${isReseller && hasWholesale ? 'bg-blue-600' : 'bg-red-600'}`}>
//                           {isReseller && hasWholesale ? 'GROSIR' : `-${discountPercentage}%`}
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
//                   </div>

//                   <div className="flex flex-col flex-grow p-5 bg-white">
//                     <h3 className="mb-1 text-sm font-bold text-gray-900 transition-colors sm:text-base group-hover:text-gycora line-clamp-2">
//                       {displayName}
//                     </h3>
//                     <div className="pt-3 mt-auto">
//                       {/* Tampilan Harga Terformat */}
//                       {isDiscounted ? (
//                         <div className="flex flex-col">
//                           <span className="text-sm font-medium text-gray-400 line-through">
//                             {formatCurrencyDisplay(dynamicPriceObj)}
//                           </span>
//                           <span className={`text-lg font-black ${isReseller && hasWholesale ? 'text-blue-600' : 'text-red-600'}`}>
//                             {formatCurrencyDisplay(finalPriceObj)}
//                           </span>
//                         </div>
//                       ) : (
//                         <p className="text-lg font-black text-gray-900">
//                           {formatCurrencyDisplay(dynamicPriceObj)}
//                         </p>
//                       )}
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

// /* eslint-disable prefer-const */
// /* eslint-disable @typescript-eslint/no-unused-expressions */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState, useEffect, useMemo } from "react";
// import { Link, useNavigate } from "react-router-dom"; 
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../../config/api";
// import { useLanguage } from "../../../context/LanguageContext";
// import { useCurrency } from "../../../context/CurrencyContext";

// interface Product {
//   id: number;
//   category_name: string;
//   sku?: string;
//   name: string;
//   slug: string;
//   description?: string;
//   benefits?: string;
//   price: number;
//   prices?: any;            
//   discount_price?: number;
//   discount_prices?: any;   
//   wholesale_price?: number; 
//   wholesale_prices?: any; // 👇 [BARU] Field Data Harga Grosir Multi-currency
//   voucher_discount_price?: number;
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   color?: any; 
//   name_en?: string;
//   category_en?: string;
// }

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

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
//   const { t, lang } = useLanguage(); 
  
//   const { currency } = useCurrency();
  
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [wishlistIds, setWishlistIds] = useState<number[]>([]);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeCategory, setActiveCategory] = useState(t("cat_all"));
//   const [sortBy] = useState("name_asc"); 

//   const [userType, setUserType] = useState<string>('guest');

//   useEffect(() => {
//     setActiveCategory(t("cat_all"));
    
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);
//         setUserType(user.usertype || 'user');
//       } catch (e) {
//         setUserType('guest');
//       }
//     }
//   }, [lang, t]);


//   // ============================================================================
//   // LOGIKA HARGA MULTI-CURRENCY & FALLBACK
//   // ============================================================================
//   const getPriceToDisplay = (product: Product) => {
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return { value: product.price, curr: 'IDR' };
  
//     const pricesObj = typeof product.prices === 'string' ? JSON.parse(product.prices) : (product.prices || {});
//     if (pricesObj[curr]) {
//       return { value: parseFloat(pricesObj[curr]), curr: curr };
//     }
//     return { value: product.price, curr: 'IDR' };
//   };

//   const getDiscountToDisplay = (product: Product) => {
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
  
//     const discObj = typeof product.discount_prices === 'string' ? JSON.parse(product.discount_prices) : (product.discount_prices || {});
//     if (discObj[curr]) {
//       return { value: parseFloat(discObj[curr]), curr: curr };
//     }
//     return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
//   };

//   // 👇 [BARU] Helper Multi-Currency untuk Harga Grosir 👇
//   const getWholesaleToDisplay = (product: Product) => {
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return product.wholesale_price ? { value: product.wholesale_price, curr: 'IDR' } : null;

//     const wholesaleObj = typeof product.wholesale_prices === 'string' ? JSON.parse(product.wholesale_prices) : (product.wholesale_prices || {});
//     if (wholesaleObj[curr]) {
//       return { value: parseFloat(wholesaleObj[curr]), curr: curr };
//     }
//     return product.wholesale_price ? { value: product.wholesale_price, curr: 'IDR' } : null;
//   };

//   const formatCurrencyDisplay = (priceObj: {value: number, curr: string} | null) => {
//     if (!priceObj) return "";
//     const symbols: any = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
    
//     const formatter = new Intl.NumberFormat(priceObj.curr === "IDR" ? "id-ID" : "en-US", {
//       minimumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//       maximumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//     });
  
//     return `${symbols[priceObj.curr] || priceObj.curr + " "}${formatter.format(priceObj.value)}`;
//   };
//   // ============================================================================


//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (!res.ok) throw new Error("Gagal mengambil data produk");

//         const responseData = await res.json();
//         let productsArray = responseData.data ? responseData.data : responseData;
//         productsArray = productsArray || [];

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
//           setWishlistIds(data.map((item: any) => item.product_id));
//         }
//       } catch (error) {
//         console.error("Gagal mengambil wishlist:", error);
//       }
//     };

//     fetchProducts();
//     fetchWishlists();
//   }, [lang]);

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
//         if (result.isConfirmed) navigate(`/${lang}/login`);
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
          
//           <div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar md:pb-0">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setActiveCategory(cat as string)}
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
//                 <div className="w-full bg-gray-200 aspect-square"></div>
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
              
//               const displayCategory = lang === "en" ? (product.category_en || product.category_name) : product.category_name;
//               const displayName = lang === "en" ? (product.name_en || product.name) : product.name;

//               // 👇 [PERBAIKAN] Terapkan helper Wholesale Multi-Currency 👇
//               const dynamicPriceObj = getPriceToDisplay(product);
//               const dynamicDiscountObj = getDiscountToDisplay(product);
//               const dynamicWholesaleObj = getWholesaleToDisplay(product);

//               const hasWholesale = dynamicWholesaleObj && dynamicWholesaleObj.value > 0;
//               const isReseller = userType === 'reseller';

//               let finalPriceObj = dynamicPriceObj;
//               let isDiscounted = false;
//               let discountPercentage = 0;

//               // Logika Harga Prioritas Reseller
//               if (isReseller && hasWholesale) {
//                 finalPriceObj = dynamicWholesaleObj!;
//                 isDiscounted = true;
//                 discountPercentage = Math.round(((dynamicPriceObj.value - dynamicWholesaleObj!.value) / dynamicPriceObj.value) * 100);
//               } 
//               else if (dynamicDiscountObj && dynamicDiscountObj.value > 0 && dynamicDiscountObj.value < dynamicPriceObj.value) {
//                 finalPriceObj = dynamicDiscountObj;
//                 isDiscounted = true;
//                 discountPercentage = Math.round(((dynamicPriceObj.value - dynamicDiscountObj.value) / dynamicPriceObj.value) * 100);
//               }

//               return (
//                 <Link 
//                   key={product.id} 
//                   to={`/${lang}/product/${product.slug}`} 
//                   state={{ 
//                     initialProduct: product,
//                     allProducts: products
//                   }}
//                   className="relative flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm group rounded-2xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1"
//                 >
//                   <div className="relative overflow-hidden aspect-square bg-gray-50">
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
//                       <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-md shadow-sm bg-white/90 backdrop-blur-sm w-fit">
//                         {displayCategory}
//                       </span>
//                       {product.stock < 5 && product.stock > 0 && (
//                         <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm bg-red-500/90 backdrop-blur-sm animate-pulse w-fit">
//                           {t("stock_warning", { stock: product.stock.toString() })}
//                         </span>
//                       )}
//                       {product.stock === 0 && (
//                          <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm bg-gray-900/90 backdrop-blur-sm w-fit">
//                           {t("status_out_of_stock")}
//                         </span>
//                       )}
                      
//                       {/* Badge Diskon / Grosir */}
//                       {isDiscounted && (
//                          <span className={`px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm w-fit ${isReseller && hasWholesale ? 'bg-blue-600' : 'bg-red-600'}`}>
//                           {isReseller && hasWholesale ? 'GROSIR' : `-${discountPercentage}%`}
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
//                   </div>

//                   <div className="flex flex-col flex-grow p-5 bg-white">
//                     <h3 className="mb-1 text-sm font-bold text-gray-900 transition-colors sm:text-base group-hover:text-gycora line-clamp-2">
//                       {displayName}
//                     </h3>
//                     <div className="pt-3 mt-auto">
//                       {/* Tampilan Harga Terformat Multi-Currency */}
//                       {isDiscounted ? (
//                         <div className="flex flex-col">
//                           <span className="text-sm font-medium text-gray-400 line-through">
//                             {formatCurrencyDisplay(dynamicPriceObj)}
//                           </span>
//                           <span className={`text-lg font-black ${isReseller && hasWholesale ? 'text-blue-600' : 'text-red-600'}`}>
//                             {formatCurrencyDisplay(finalPriceObj)}
//                           </span>
//                         </div>
//                       ) : (
//                         <p className="text-lg font-black text-gray-900">
//                           {formatCurrencyDisplay(dynamicPriceObj)}
//                         </p>
//                       )}
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

// /* eslint-disable prefer-const */
// /* eslint-disable @typescript-eslint/no-unused-expressions */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState, useEffect, useMemo } from "react";
// import { Link, useNavigate } from "react-router-dom"; 
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../../config/api";
// import { useLanguage } from "../../../context/LanguageContext";
// import { useCurrency } from "../../../context/CurrencyContext";

// interface Product {
//   id: number;
//   category?: {           // 👇 [PERBAIKAN] Menyesuaikan struktur JSON Product::with('category') dari Laravel
//     id: number;
//     name: string;
//   };
//   category_name?: string; // Fallback jika menggunakan query manual
//   sku?: string;
//   name: string;
//   slug: string;
//   description?: string;
//   benefits?: string;
//   price: number;
//   prices?: any;            
//   discount_price?: number;
//   discount_prices?: any;   
//   wholesale_price?: number; 
//   wholesale_prices?: any; 
//   voucher_discount_price?: number;
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   color?: any; 
//   name_en?: string;
//   category_en?: string;
// }

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

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
//   const { t, lang } = useLanguage(); 
  
//   const { currency } = useCurrency();
  
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [wishlistIds, setWishlistIds] = useState<number[]>([]);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeCategory, setActiveCategory] = useState(t("cat_all"));
//   const [sortBy] = useState("name_asc"); 

//   const [userType, setUserType] = useState<string>('guest');

//   useEffect(() => {
//     setActiveCategory(t("cat_all"));
    
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);
//         setUserType(user.usertype || 'user');
//       } catch (e) {
//         setUserType('guest');
//       }
//     }
//   }, [lang, t]);


//   // ============================================================================
//   // LOGIKA HARGA MULTI-CURRENCY & FALLBACK
//   // ============================================================================
//   const getPriceToDisplay = (product: Product) => {
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return { value: product.price, curr: 'IDR' };
  
//     const pricesObj = typeof product.prices === 'string' ? JSON.parse(product.prices) : (product.prices || {});
//     if (pricesObj[curr]) {
//       return { value: parseFloat(pricesObj[curr]), curr: curr };
//     }
//     return { value: product.price, curr: 'IDR' };
//   };

//   const getDiscountToDisplay = (product: Product) => {
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
  
//     const discObj = typeof product.discount_prices === 'string' ? JSON.parse(product.discount_prices) : (product.discount_prices || {});
//     if (discObj[curr]) {
//       return { value: parseFloat(discObj[curr]), curr: curr };
//     }
//     return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
//   };

//   const getWholesaleToDisplay = (product: Product) => {
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return product.wholesale_price ? { value: product.wholesale_price, curr: 'IDR' } : null;

//     const wholesaleObj = typeof product.wholesale_prices === 'string' ? JSON.parse(product.wholesale_prices) : (product.wholesale_prices || {});
//     if (wholesaleObj[curr]) {
//       return { value: parseFloat(wholesaleObj[curr]), curr: curr };
//     }
//     return product.wholesale_price ? { value: product.wholesale_price, curr: 'IDR' } : null;
//   };

//   const formatCurrencyDisplay = (priceObj: {value: number, curr: string} | null) => {
//     if (!priceObj) return "";
//     const symbols: any = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
    
//     const formatter = new Intl.NumberFormat(priceObj.curr === "IDR" ? "id-ID" : "en-US", {
//       minimumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//       maximumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//     });
  
//     return `${symbols[priceObj.curr] || priceObj.curr + " "}${formatter.format(priceObj.value)}`;
//   };
//   // ============================================================================


//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (!res.ok) throw new Error("Gagal mengambil data produk");

//         const responseData = await res.json();
//         let productsArray = responseData.data ? responseData.data : responseData;
//         productsArray = productsArray || [];

//         if (lang === "en") {
//           productsArray = await Promise.all(productsArray.map(async (p: Product) => {
//             // 👇 [PERBAIKAN] Mengambil nama kategori dari relasi object secara aman
//             const baseCategoryName = p.category?.name || p.category_name || "";
//             return {
//               ...p,
//               name_en: await translateText(p.name, "en"),
//               category_en: await translateText(baseCategoryName, "en")
//             };
//           }));
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
//           setWishlistIds(data.map((item: any) => item.product_id));
//         }
//       } catch (error) {
//         console.error("Gagal mengambil wishlist:", error);
//       }
//     };

//     fetchProducts();
//     fetchWishlists();
//   }, [lang]);

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
//         if (result.isConfirmed) navigate(`/${lang}/login`);
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

//   // 👇 [PERBAIKAN] Ekstraksi kategori dari relasi object agar Filter Button muncul 👇
//   const categories = useMemo(() => {
//     const rawCategories = products.map((p) => {
//       const baseName = p.category?.name || p.category_name || "";
//       return lang === "en" ? (p.category_en || baseName) : baseName;
//     }).filter(Boolean);
    
//     return [t("cat_all"), ...Array.from(new Set(rawCategories))];
//   }, [products, lang, t]);

//   const processedProducts = useMemo(() => {
//     return products
//       .filter((p) => {
//         // 👇 [PERBAIKAN] Filtering dengan membaca relasi object kategori 👇
//         const baseCatName = p.category?.name || p.category_name || "";
//         const catName = lang === "en" ? (p.category_en || baseCatName) : baseCatName;
//         const prodName = lang === "en" ? (p.name_en || p.name) : p.name;
        
//         const matchCategory = activeCategory === t("cat_all") || catName === activeCategory;
//         const matchSearch = prodName.toLowerCase().includes(searchQuery.toLowerCase());
        
//         return matchCategory && matchSearch;
//       })
//       .sort((a, b) => {
//         const nameA = lang === "en" ? (a.name_en || a.name) : a.name;
//         const nameB = lang === "en" ? (b.name_en || b.name) : b.name;
//         if (sortBy === "name_asc") return nameA.localeCompare(nameB);
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
          
//           <div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar md:pb-0">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setActiveCategory(cat as string)}
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
//                 <div className="w-full bg-gray-200 aspect-square"></div>
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
              
//               // 👇 [PERBAIKAN] Membaca relasi kategori untuk Badge Card
//               const baseCatName = product.category?.name || product.category_name || "";
//               const displayCategory = lang === "en" ? (product.category_en || baseCatName) : baseCatName;
//               const displayName = lang === "en" ? (product.name_en || product.name) : product.name;

//               const dynamicPriceObj = getPriceToDisplay(product);
//               const dynamicDiscountObj = getDiscountToDisplay(product);
//               const dynamicWholesaleObj = getWholesaleToDisplay(product);

//               const hasWholesale = dynamicWholesaleObj && dynamicWholesaleObj.value > 0;
//               const isReseller = userType === 'reseller';

//               let finalPriceObj = dynamicPriceObj;
//               let isDiscounted = false;
//               let discountPercentage = 0;

//               if (isReseller && hasWholesale) {
//                 finalPriceObj = dynamicWholesaleObj!;
//                 isDiscounted = true;
//                 discountPercentage = Math.round(((dynamicPriceObj.value - dynamicWholesaleObj!.value) / dynamicPriceObj.value) * 100);
//               } 
//               else if (dynamicDiscountObj && dynamicDiscountObj.value > 0 && dynamicDiscountObj.value < dynamicPriceObj.value) {
//                 finalPriceObj = dynamicDiscountObj;
//                 isDiscounted = true;
//                 discountPercentage = Math.round(((dynamicPriceObj.value - dynamicDiscountObj.value) / dynamicPriceObj.value) * 100);
//               }

//               return (
//                 <Link 
//                   key={product.id} 
//                   to={`/${lang}/product/${product.slug}`} 
//                   state={{ 
//                     initialProduct: product,
//                     allProducts: products
//                   }}
//                   className="relative flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm group rounded-2xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1"
//                 >
//                   <div className="relative overflow-hidden aspect-square bg-gray-50">
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
//                       <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-md shadow-sm bg-white/90 backdrop-blur-sm w-fit">
//                         {displayCategory}
//                       </span>
//                       {product.stock < 5 && product.stock > 0 && (
//                         <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm bg-red-500/90 backdrop-blur-sm animate-pulse w-fit">
//                           {t("stock_warning", { stock: product.stock.toString() })}
//                         </span>
//                       )}
//                       {product.stock === 0 && (
//                          <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm bg-gray-900/90 backdrop-blur-sm w-fit">
//                           {t("status_out_of_stock")}
//                         </span>
//                       )}
                      
//                       {isDiscounted && (
//                          <span className={`px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm w-fit ${isReseller && hasWholesale ? 'bg-blue-600' : 'bg-red-600'}`}>
//                           {isReseller && hasWholesale ? 'GROSIR' : `-${discountPercentage}%`}
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
//                   </div>

//                   <div className="flex flex-col flex-grow p-5 bg-white">
//                     <h3 className="mb-1 text-sm font-bold text-gray-900 transition-colors sm:text-base group-hover:text-gycora line-clamp-2">
//                       {displayName}
//                     </h3>
//                     <div className="pt-3 mt-auto">
//                       {isDiscounted ? (
//                         <div className="flex flex-col">
//                           <span className="text-sm font-medium text-gray-400 line-through">
//                             {formatCurrencyDisplay(dynamicPriceObj)}
//                           </span>
//                           <span className={`text-lg font-black ${isReseller && hasWholesale ? 'text-blue-600' : 'text-red-600'}`}>
//                             {formatCurrencyDisplay(finalPriceObj)}
//                           </span>
//                         </div>
//                       ) : (
//                         <p className="text-lg font-black text-gray-900">
//                           {formatCurrencyDisplay(dynamicPriceObj)}
//                         </p>
//                       )}
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

// /* eslint-disable prefer-const */
// /* eslint-disable @typescript-eslint/no-unused-expressions */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState, useEffect, useMemo } from "react";
// // 👇 [PERBAIKAN] Tambahkan useLocation 👇
// import { Link, useNavigate, useLocation } from "react-router-dom"; 
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../../config/api";
// import { useLanguage } from "../../../context/LanguageContext";
// import { useCurrency } from "../../../context/CurrencyContext";

// interface Product {
//   id: number;
//   category?: {
//     id: number;
//     name: string;
//   };
//   category_name?: string; 
//   sku?: string;
//   name: string;
//   slug: string;
//   description?: string;
//   benefits?: string;
//   price: number;
//   prices?: any;            
//   discount_price?: number;
//   discount_prices?: any;   
//   wholesale_price?: number; 
//   wholesale_prices?: any; 
//   voucher_discount_price?: number;
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   color?: any; 
//   name_en?: string;
//   category_en?: string;
// }

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

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
//   // 👇 [PERBAIKAN] Deklarasi useLocation 👇
//   const location = useLocation();
//   const { t, lang } = useLanguage(); 
  
//   const { currency } = useCurrency();
  
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [wishlistIds, setWishlistIds] = useState<number[]>([]);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeCategory, setActiveCategory] = useState(t("cat_all"));
//   const [sortBy] = useState("name_asc"); 

//   const [userType, setUserType] = useState<string>('guest');

//   // 👇 [PERBAIKAN] Menangkap state Kategori filterCategory jika ada 👇
//   useEffect(() => {
//     if (location.state?.filterCategory) {
//       setActiveCategory(location.state.filterCategory);
//     } else {
//       setActiveCategory(t("cat_all"));
//     }
    
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);
//         setUserType(user.usertype || 'user');
//       } catch (e) {
//         setUserType('guest');
//       }
//     }
//   }, [lang, t, location.state]);

//   const getPriceToDisplay = (product: Product) => {
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return { value: product.price, curr: 'IDR' };
  
//     const pricesObj = typeof product.prices === 'string' ? JSON.parse(product.prices) : (product.prices || {});
//     if (pricesObj[curr]) {
//       return { value: parseFloat(pricesObj[curr]), curr: curr };
//     }
//     return { value: product.price, curr: 'IDR' };
//   };

//   const getDiscountToDisplay = (product: Product) => {
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
  
//     const discObj = typeof product.discount_prices === 'string' ? JSON.parse(product.discount_prices) : (product.discount_prices || {});
//     if (discObj[curr]) {
//       return { value: parseFloat(discObj[curr]), curr: curr };
//     }
//     return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
//   };

//   const getWholesaleToDisplay = (product: Product) => {
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return product.wholesale_price ? { value: product.wholesale_price, curr: 'IDR' } : null;

//     const wholesaleObj = typeof product.wholesale_prices === 'string' ? JSON.parse(product.wholesale_prices) : (product.wholesale_prices || {});
//     if (wholesaleObj[curr]) {
//       return { value: parseFloat(wholesaleObj[curr]), curr: curr };
//     }
//     return product.wholesale_price ? { value: product.wholesale_price, curr: 'IDR' } : null;
//   };

//   const formatCurrencyDisplay = (priceObj: {value: number, curr: string} | null) => {
//     if (!priceObj) return "";
//     const symbols: any = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
    
//     const formatter = new Intl.NumberFormat(priceObj.curr === "IDR" ? "id-ID" : "en-US", {
//       minimumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//       maximumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//     });
  
//     return `${symbols[priceObj.curr] || priceObj.curr + " "}${formatter.format(priceObj.value)}`;
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (!res.ok) throw new Error("Gagal mengambil data produk");

//         const responseData = await res.json();
//         let productsArray = responseData.data ? responseData.data : responseData;
//         productsArray = productsArray || [];

//         if (lang === "en") {
//           productsArray = await Promise.all(productsArray.map(async (p: Product) => {
//             const baseCategoryName = p.category?.name || p.category_name || "";
//             return {
//               ...p,
//               name_en: await translateText(p.name, "en"),
//               category_en: await translateText(baseCategoryName, "en")
//             };
//           }));
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
//           setWishlistIds(data.map((item: any) => item.product_id));
//         }
//       } catch (error) {
//         console.error("Gagal mengambil wishlist:", error);
//       }
//     };

//     fetchProducts();
//     fetchWishlists();
//   }, [lang]);

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
//         if (result.isConfirmed) navigate(`/${lang}/login`);
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

//   const categories = useMemo(() => {
//     const rawCategories = products.map((p) => {
//       const baseName = p.category?.name || p.category_name || "";
//       return lang === "en" ? (p.category_en || baseName) : baseName;
//     }).filter(Boolean);
    
//     return [t("cat_all"), ...Array.from(new Set(rawCategories))];
//   }, [products, lang, t]);

//   const processedProducts = useMemo(() => {
//     return products
//       .filter((p) => {
//         const baseCatName = p.category?.name || p.category_name || "";
//         const catName = lang === "en" ? (p.category_en || baseCatName) : baseCatName;
//         const prodName = lang === "en" ? (p.name_en || p.name) : p.name;
        
//         const matchCategory = activeCategory === t("cat_all") || catName === activeCategory;
//         const matchSearch = prodName.toLowerCase().includes(searchQuery.toLowerCase());
        
//         return matchCategory && matchSearch;
//       })
//       .sort((a, b) => {
//         const nameA = lang === "en" ? (a.name_en || a.name) : a.name;
//         const nameB = lang === "en" ? (b.name_en || b.name) : b.name;
//         if (sortBy === "name_asc") return nameA.localeCompare(nameB);
//         return b.id - a.id; 
//       });
//   }, [products, activeCategory, searchQuery, sortBy, lang, t]);

//   return (
//     <div className="min-h-screen font-sans bg-gray-50/50">
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
//         <div className="flex flex-col gap-6 mb-10 md:flex-row md:items-center md:justify-between">
//           <div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar md:pb-0">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setActiveCategory(cat as string)}
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

//         {loading ? (
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-pulse">
//             {[...Array(8)].map((_, i) => (
//               <div key={i} className="flex flex-col overflow-hidden bg-white border border-gray-100 rounded-2xl">
//                 <div className="w-full bg-gray-200 aspect-square"></div>
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
//               const baseCatName = product.category?.name || product.category_name || "";
//               const displayCategory = lang === "en" ? (product.category_en || baseCatName) : baseCatName;
//               const displayName = lang === "en" ? (product.name_en || product.name) : product.name;

//               const dynamicPriceObj = getPriceToDisplay(product);
//               const dynamicDiscountObj = getDiscountToDisplay(product);
//               const dynamicWholesaleObj = getWholesaleToDisplay(product);

//               const hasWholesale = dynamicWholesaleObj && dynamicWholesaleObj.value > 0;
//               const isReseller = userType === 'reseller';

//               let finalPriceObj = dynamicPriceObj;
//               let isDiscounted = false;
//               let discountPercentage = 0;

//               if (isReseller && hasWholesale) {
//                 finalPriceObj = dynamicWholesaleObj!;
//                 isDiscounted = true;
//                 discountPercentage = Math.round(((dynamicPriceObj.value - dynamicWholesaleObj!.value) / dynamicPriceObj.value) * 100);
//               } 
//               else if (dynamicDiscountObj && dynamicDiscountObj.value > 0 && dynamicDiscountObj.value < dynamicPriceObj.value) {
//                 finalPriceObj = dynamicDiscountObj;
//                 isDiscounted = true;
//                 discountPercentage = Math.round(((dynamicPriceObj.value - dynamicDiscountObj.value) / dynamicPriceObj.value) * 100);
//               }

//               return (
//                 <Link 
//                   key={product.id} 
//                   to={`/${lang}/product/${product.slug}`} 
//                   state={{ 
//                     initialProduct: product,
//                     allProducts: products
//                   }}
//                   className="relative flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm group rounded-2xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1"
//                 >
//                   <div className="relative overflow-hidden aspect-square bg-gray-50">
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
//                       <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-md shadow-sm bg-white/90 backdrop-blur-sm w-fit">
//                         {displayCategory}
//                       </span>
//                       {product.stock < 5 && product.stock > 0 && (
//                         <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm bg-red-500/90 backdrop-blur-sm animate-pulse w-fit">
//                           {t("stock_warning", { stock: product.stock.toString() })}
//                         </span>
//                       )}
//                       {product.stock === 0 && (
//                          <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm bg-gray-900/90 backdrop-blur-sm w-fit">
//                           {t("status_out_of_stock")}
//                         </span>
//                       )}
                      
//                       {isDiscounted && (
//                          <span className={`px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm w-fit ${isReseller && hasWholesale ? 'bg-blue-600' : 'bg-red-600'}`}>
//                           {isReseller && hasWholesale ? 'GROSIR' : `-${discountPercentage}%`}
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
//                   </div>

//                   <div className="flex flex-col flex-grow p-5 bg-white">
//                     <h3 className="mb-1 text-sm font-bold text-gray-900 transition-colors sm:text-base group-hover:text-gycora line-clamp-2">
//                       {displayName}
//                     </h3>
//                     <div className="pt-3 mt-auto">
//                       {isDiscounted ? (
//                         <div className="flex flex-col">
//                           <span className="text-sm font-medium text-gray-400 line-through">
//                             {formatCurrencyDisplay(dynamicPriceObj)}
//                           </span>
//                           <span className={`text-lg font-black ${isReseller && hasWholesale ? 'text-blue-600' : 'text-red-600'}`}>
//                             {formatCurrencyDisplay(finalPriceObj)}
//                           </span>
//                         </div>
//                       ) : (
//                         <p className="text-lg font-black text-gray-900">
//                           {formatCurrencyDisplay(dynamicPriceObj)}
//                         </p>
//                       )}
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

// /* eslint-disable prefer-const */
// /* eslint-disable @typescript-eslint/no-unused-expressions */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState, useEffect, useMemo } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom"; 
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../../config/api";
// import { useLanguage } from "../../../context/LanguageContext";
// import { useCurrency } from "../../../context/CurrencyContext";

// interface Product {
//   id: number;
//   category?: {
//     id: number;
//     name: string;
//   };
//   category_name?: string; 
//   sku?: string;
//   name: string;
//   slug: string;
//   description?: string;
//   benefits?: string;
//   price: number;
//   prices?: any;            
//   discount_price?: number;
//   discount_prices?: any;   
//   wholesale_price?: number; 
//   wholesale_prices?: any; 
//   voucher_discount_price?: number;
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   color?: any; 
//   name_en?: string;
//   category_en?: string;
// }

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

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
//   const location = useLocation();
//   const { t, lang } = useLanguage(); 
//   const { currency } = useCurrency();
  
//   // 👇 [FITUR 0 DETIK] Baca data awal dari Browser Cache (Session Storage) 👇
//   const CACHE_KEY = `gycora_catalog_products_${lang}`;
//   const [products, setProducts] = useState<Product[]>(() => {
//     const cached = sessionStorage.getItem(CACHE_KEY);
//     return cached ? JSON.parse(cached) : [];
//   });
  
//   // Loading otomatis false jika sudah ada data di cache (menghilangkan skeleton loading)
//   const [loading, setLoading] = useState(products.length === 0);
  
//   // Sama dengan Wishlist
//   const WISHLIST_CACHE_KEY = 'gycora_user_wishlists';
//   const [wishlistIds, setWishlistIds] = useState<number[]>(() => {
//     const cached = sessionStorage.getItem(WISHLIST_CACHE_KEY);
//     return cached ? JSON.parse(cached) : [];
//   });

//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeCategory, setActiveCategory] = useState(t("cat_all"));
//   const [sortBy] = useState("name_asc"); 
//   const [userType, setUserType] = useState<string>('guest');

//   useEffect(() => {
//     if (location.state?.filterCategory) {
//       setActiveCategory(location.state.filterCategory);
//     } else {
//       setActiveCategory(t("cat_all"));
//     }
    
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);
//         setUserType(user.usertype || 'user');
//       } catch (e) {
//         setUserType('guest');
//       }
//     }
//   }, [lang, t, location.state]);

//   const getPriceToDisplay = (product: Product) => {
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return { value: product.price, curr: 'IDR' };
//     const pricesObj = typeof product.prices === 'string' ? JSON.parse(product.prices) : (product.prices || {});
//     if (pricesObj[curr]) return { value: parseFloat(pricesObj[curr]), curr: curr };
//     return { value: product.price, curr: 'IDR' };
//   };

//   const getDiscountToDisplay = (product: Product) => {
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
//     const discObj = typeof product.discount_prices === 'string' ? JSON.parse(product.discount_prices) : (product.discount_prices || {});
//     if (discObj[curr]) return { value: parseFloat(discObj[curr]), curr: curr };
//     return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
//   };

//   const getWholesaleToDisplay = (product: Product) => {
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return product.wholesale_price ? { value: product.wholesale_price, curr: 'IDR' } : null;
//     const wholesaleObj = typeof product.wholesale_prices === 'string' ? JSON.parse(product.wholesale_prices) : (product.wholesale_prices || {});
//     if (wholesaleObj[curr]) return { value: parseFloat(wholesaleObj[curr]), curr: curr };
//     return product.wholesale_price ? { value: product.wholesale_price, curr: 'IDR' } : null;
//   };

//   const formatCurrencyDisplay = (priceObj: {value: number, curr: string} | null) => {
//     if (!priceObj) return "";
//     const symbols: any = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
//     const formatter = new Intl.NumberFormat(priceObj.curr === "IDR" ? "id-ID" : "en-US", {
//       minimumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//       maximumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//     });
//     return `${symbols[priceObj.curr] || priceObj.curr + " "}${formatter.format(priceObj.value)}`;
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       // Jika produk belum ada di cache, tampilkan loading animasi
//       if (products.length === 0) setLoading(true);
      
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (!res.ok) throw new Error("Gagal mengambil data produk");

//         const responseData = await res.json();
//         let productsArray = responseData.data ? responseData.data : responseData;
//         productsArray = productsArray || [];

//         if (lang === "en") {
//           productsArray = await Promise.all(productsArray.map(async (p: Product) => {
//             const baseCategoryName = p.category?.name || p.category_name || "";
//             return {
//               ...p,
//               name_en: await translateText(p.name, "en"),
//               category_en: await translateText(baseCategoryName, "en")
//             };
//           }));
//         }

//         // 👇 [FITUR 0 DETIK] Simpan data final ke React State & Browser Cache 👇
//         setProducts(productsArray);
//         sessionStorage.setItem(CACHE_KEY, JSON.stringify(productsArray));

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
//           const ids = data.map((item: any) => item.product_id);
//           setWishlistIds(ids);
//           sessionStorage.setItem(WISHLIST_CACHE_KEY, JSON.stringify(ids)); // Simpan ke browser cache
//         }
//       } catch (error) {
//         console.error("Gagal mengambil wishlist:", error);
//       }
//     };

//     fetchProducts();
//     fetchWishlists();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [lang]); // Gunakan lang sebagai trigger

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
//         if (result.isConfirmed) navigate(`/${lang}/login`);
//       });
//       return;
//     }

//     const isWished = wishlistIds.includes(productId);
    
//     // UI Update instan tanpa delay (Optimistic Update)
//     let newIds;
//     if (isWished) {
//       newIds = wishlistIds.filter(id => id !== productId);
//     } else {
//       newIds = [...wishlistIds, productId];
//     }
//     setWishlistIds(newIds);
//     sessionStorage.setItem(WISHLIST_CACHE_KEY, JSON.stringify(newIds));

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
//       // Revert state jika API Error
//       if (isWished) {
//         setWishlistIds((prev) => [...prev, productId]);
//       } else {
//         setWishlistIds((prev) => prev.filter(id => id !== productId));
//       }
//       console.error(error);
//     }
//   };

//   const categories = useMemo(() => {
//     const rawCategories = products.map((p) => {
//       const baseName = p.category?.name || p.category_name || "";
//       return lang === "en" ? (p.category_en || baseName) : baseName;
//     }).filter(Boolean);
    
//     return [t("cat_all"), ...Array.from(new Set(rawCategories))];
//   }, [products, lang, t]);

//   const processedProducts = useMemo(() => {
//     return products
//       .filter((p) => {
//         const baseCatName = p.category?.name || p.category_name || "";
//         const catName = lang === "en" ? (p.category_en || baseCatName) : baseCatName;
//         const prodName = lang === "en" ? (p.name_en || p.name) : p.name;
        
//         const matchCategory = activeCategory === t("cat_all") || catName === activeCategory;
//         const matchSearch = prodName.toLowerCase().includes(searchQuery.toLowerCase());
        
//         return matchCategory && matchSearch;
//       })
//       .sort((a, b) => {
//         const nameA = lang === "en" ? (a.name_en || a.name) : a.name;
//         const nameB = lang === "en" ? (b.name_en || b.name) : b.name;
//         if (sortBy === "name_asc") return nameA.localeCompare(nameB);
//         return b.id - a.id; 
//       });
//   }, [products, activeCategory, searchQuery, sortBy, lang, t]);

//   return (
//     <div className="min-h-screen font-sans bg-gray-50/50">
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
//         <div className="flex flex-col gap-6 mb-10 md:flex-row md:items-center md:justify-between">
//           <div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar md:pb-0">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setActiveCategory(cat as string)}
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

//         {loading ? (
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-pulse">
//             {[...Array(8)].map((_, i) => (
//               <div key={i} className="flex flex-col overflow-hidden bg-white border border-gray-100 rounded-2xl">
//                 <div className="w-full bg-gray-200 aspect-square"></div>
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
//               const baseCatName = product.category?.name || product.category_name || "";
//               const displayCategory = lang === "en" ? (product.category_en || baseCatName) : baseCatName;
//               const displayName = lang === "en" ? (product.name_en || product.name) : product.name;

//               const dynamicPriceObj = getPriceToDisplay(product);
//               const dynamicDiscountObj = getDiscountToDisplay(product);
//               const dynamicWholesaleObj = getWholesaleToDisplay(product);

//               const hasWholesale = dynamicWholesaleObj && dynamicWholesaleObj.value > 0;
//               const isReseller = userType === 'reseller';

//               let finalPriceObj = dynamicPriceObj;
//               let isDiscounted = false;
//               let discountPercentage = 0;

//               if (isReseller && hasWholesale) {
//                 finalPriceObj = dynamicWholesaleObj!;
//                 isDiscounted = true;
//                 discountPercentage = Math.round(((dynamicPriceObj.value - dynamicWholesaleObj!.value) / dynamicPriceObj.value) * 100);
//               } 
//               else if (dynamicDiscountObj && dynamicDiscountObj.value > 0 && dynamicDiscountObj.value < dynamicPriceObj.value) {
//                 finalPriceObj = dynamicDiscountObj;
//                 isDiscounted = true;
//                 discountPercentage = Math.round(((dynamicPriceObj.value - dynamicDiscountObj.value) / dynamicPriceObj.value) * 100);
//               }

//               return (
//                 <Link 
//                   key={product.id} 
//                   to={`/${lang}/product/${product.slug}`} 
//                   state={{ 
//                     initialProduct: product,
//                     allProducts: products
//                   }}
//                   className="relative flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm group rounded-2xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1"
//                 >
//                   <div className="relative overflow-hidden aspect-square bg-gray-50">
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
//                       <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-md shadow-sm bg-white/90 backdrop-blur-sm w-fit">
//                         {displayCategory}
//                       </span>
//                       {product.stock < 5 && product.stock > 0 && (
//                         <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm bg-red-500/90 backdrop-blur-sm animate-pulse w-fit">
//                           {t("stock_warning", { stock: product.stock.toString() })}
//                         </span>
//                       )}
//                       {product.stock === 0 && (
//                          <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm bg-gray-900/90 backdrop-blur-sm w-fit">
//                           {t("status_out_of_stock")}
//                         </span>
//                       )}
                      
//                       {isDiscounted && (
//                          <span className={`px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm w-fit ${isReseller && hasWholesale ? 'bg-blue-600' : 'bg-red-600'}`}>
//                           {isReseller && hasWholesale ? 'GROSIR' : `-${discountPercentage}%`}
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
//                   </div>

//                   <div className="flex flex-col flex-grow p-5 bg-white">
//                     <h3 className="mb-1 text-sm font-bold text-gray-900 transition-colors sm:text-base group-hover:text-gycora line-clamp-2">
//                       {displayName}
//                     </h3>
//                     <div className="pt-3 mt-auto">
//                       {isDiscounted ? (
//                         <div className="flex flex-col">
//                           <span className="text-sm font-medium text-gray-400 line-through">
//                             {formatCurrencyDisplay(dynamicPriceObj)}
//                           </span>
//                           <span className={`text-lg font-black ${isReseller && hasWholesale ? 'text-blue-600' : 'text-red-600'}`}>
//                             {formatCurrencyDisplay(finalPriceObj)}
//                           </span>
//                         </div>
//                       ) : (
//                         <p className="text-lg font-black text-gray-900">
//                           {formatCurrencyDisplay(dynamicPriceObj)}
//                         </p>
//                       )}
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

// /* eslint-disable prefer-const */
// /* eslint-disable @typescript-eslint/no-unused-expressions */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState, useEffect, useMemo, useRef } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom"; 
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../../config/api";
// import { useLanguage } from "../../../context/LanguageContext";
// import { useCurrency } from "../../../context/CurrencyContext";

// interface Product {
//   id: number;
//   category?: {
//     id: number;
//     name: string;
//   };
//   category_name?: string; 
//   sku?: string;
//   name: string;
//   slug: string;
//   description?: string;
//   benefits?: string;
//   price: number;
//   prices?: any;            
//   discount_price?: number;
//   discount_prices?: any;   
//   wholesale_price?: number; 
//   wholesale_prices?: any; 
//   voucher_discount_price?: number;
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   color?: any; 
//   name_en?: string;
//   category_en?: string;
// }

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

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
//   const location = useLocation();
//   const { t, lang } = useLanguage(); 
//   const { currency } = useCurrency();
  
//   const CACHE_KEY = `gycora_catalog_products_${lang}`;
//   const [products, setProducts] = useState<Product[]>(() => {
//     const cached = sessionStorage.getItem(CACHE_KEY);
//     return cached ? JSON.parse(cached) : [];
//   });
  
//   const [loading, setLoading] = useState(products.length === 0);
  
//   const WISHLIST_CACHE_KEY = 'gycora_user_wishlists';
//   const [wishlistIds, setWishlistIds] = useState<number[]>(() => {
//     const cached = sessionStorage.getItem(WISHLIST_CACHE_KEY);
//     return cached ? JSON.parse(cached) : [];
//   });

//   const [searchQuery, setSearchQuery] = useState("");
//   // 👇 [BARU] State khusus menampung hasil Meilisearch
//   const [searchResults, setSearchResults] = useState<Product[] | null>(null);
//   const [isSearching, setIsSearching] = useState(false);
  
//   const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const [activeCategory, setActiveCategory] = useState(t("cat_all"));
//   const [sortBy] = useState("name_asc"); 
//   const [userType, setUserType] = useState<string>('guest');

//   useEffect(() => {
//     if (location.state?.filterCategory) {
//       setActiveCategory(location.state.filterCategory);
//     } else {
//       setActiveCategory(t("cat_all"));
//     }
    
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);
//         setUserType(user.usertype || 'user');
//       } catch (e) {
//         setUserType('guest');
//       }
//     }
//   }, [lang, t, location.state]);

//   const getPriceToDisplay = (product: Product) => {
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return { value: product.price, curr: 'IDR' };
//     const pricesObj = typeof product.prices === 'string' ? JSON.parse(product.prices) : (product.prices || {});
//     if (pricesObj[curr]) return { value: parseFloat(pricesObj[curr]), curr: curr };
//     return { value: product.price, curr: 'IDR' };
//   };

//   const getDiscountToDisplay = (product: Product) => {
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
//     const discObj = typeof product.discount_prices === 'string' ? JSON.parse(product.discount_prices) : (product.discount_prices || {});
//     if (discObj[curr]) return { value: parseFloat(discObj[curr]), curr: curr };
//     return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
//   };

//   const getWholesaleToDisplay = (product: Product) => {
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return product.wholesale_price ? { value: product.wholesale_price, curr: 'IDR' } : null;
//     const wholesaleObj = typeof product.wholesale_prices === 'string' ? JSON.parse(product.wholesale_prices) : (product.wholesale_prices || {});
//     if (wholesaleObj[curr]) return { value: parseFloat(wholesaleObj[curr]), curr: curr };
//     return product.wholesale_price ? { value: product.wholesale_price, curr: 'IDR' } : null;
//   };

//   const formatCurrencyDisplay = (priceObj: {value: number, curr: string} | null) => {
//     if (!priceObj) return "";
//     const symbols: any = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
//     const formatter = new Intl.NumberFormat(priceObj.curr === "IDR" ? "id-ID" : "en-US", {
//       minimumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//       maximumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
//     });
//     return `${symbols[priceObj.curr] || priceObj.curr + " "}${formatter.format(priceObj.value)}`;
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       if (products.length === 0) setLoading(true);
      
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (!res.ok) throw new Error("Gagal mengambil data produk");

//         const responseData = await res.json();
//         let productsArray = responseData.data ? responseData.data : responseData;
//         productsArray = productsArray || [];

//         if (lang === "en") {
//           productsArray = await Promise.all(productsArray.map(async (p: Product) => {
//             const baseCategoryName = p.category?.name || p.category_name || "";
//             return {
//               ...p,
//               name_en: await translateText(p.name, "en"),
//               category_en: await translateText(baseCategoryName, "en")
//             };
//           }));
//         }

//         setProducts(productsArray);
//         sessionStorage.setItem(CACHE_KEY, JSON.stringify(productsArray));

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
//           const ids = data.map((item: any) => item.product_id);
//           setWishlistIds(ids);
//           sessionStorage.setItem(WISHLIST_CACHE_KEY, JSON.stringify(ids)); 
//         }
//       } catch (error) {
//         console.error("Gagal mengambil wishlist:", error);
//       }
//     };

//     fetchProducts();
//     fetchWishlists();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [lang]); 

//   // 👇 [BARU] FUNGSI DEBOUNCE MEILISEARCH API 👇
//   const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchQuery(value);
//     setActiveCategory(t("cat_all")); // Reset kategori saat mencari

//     // Jika input dihapus kosong, kembalikan ke produk normal
//     if (value.trim() === "") {
//       setSearchResults(null);
//       setIsSearching(false);
//       if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
//       return;
//     }

//     setIsSearching(true);
    
//     // Teknik Debounce: Tunggu user berhenti mengetik 400ms baru hit API
//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }

//     searchTimeoutRef.current = setTimeout(async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/search/products?q=${encodeURIComponent(value)}`);
//         const data = await res.json();
        
//         if (res.ok && data.data) {
//           setSearchResults(data.data);
//         } else {
//           setSearchResults([]); // Kosongkan jika tidak ada hasil
//         }
//       } catch (error) {
//         console.error("Meilisearch API Error:", error);
//         setSearchResults([]);
//       } finally {
//         setIsSearching(false);
//       }
//     }, 400); // Tunggu 400ms
//   };
//   // 👆 ========================================= 👆

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
//         if (result.isConfirmed) navigate(`/${lang}/login`);
//       });
//       return;
//     }

//     const isWished = wishlistIds.includes(productId);
    
//     let newIds;
//     if (isWished) {
//       newIds = wishlistIds.filter(id => id !== productId);
//     } else {
//       newIds = [...wishlistIds, productId];
//     }
//     setWishlistIds(newIds);
//     sessionStorage.setItem(WISHLIST_CACHE_KEY, JSON.stringify(newIds));

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

//   const categories = useMemo(() => {
//     const rawCategories = products.map((p) => {
//       const baseName = p.category?.name || p.category_name || "";
//       return lang === "en" ? (p.category_en || baseName) : baseName;
//     }).filter(Boolean);
    
//     return [t("cat_all"), ...Array.from(new Set(rawCategories))];
//   }, [products, lang, t]);

//   const processedProducts = useMemo(() => {
//     // 👇 Jika ada hasil dari Meilisearch, prioritaskan untuk dirender 👇
//     let sourceProducts = searchResults !== null ? searchResults : products;

//     return sourceProducts
//       .filter((p) => {
//         // Jika sedang mode search Meilisearch, abaikan filter kategori
//         if (searchResults !== null) return true;

//         const baseCatName = p.category?.name || p.category_name || "";
//         const catName = lang === "en" ? (p.category_en || baseCatName) : baseCatName;
        
//         return activeCategory === t("cat_all") || catName === activeCategory;
//       })
//       .sort((a, b) => {
//         // Jika dari Meilisearch, JANGAN disort. Biarkan Algoritma Meilisearch menentukan urutan yang paling relevan.
//         if (searchResults !== null) return 0;

//         const nameA = lang === "en" ? (a.name_en || a.name) : a.name;
//         const nameB = lang === "en" ? (b.name_en || b.name) : b.name;
//         if (sortBy === "name_asc") return nameA.localeCompare(nameB);
//         return b.id - a.id; 
//       });
//   }, [products, searchResults, activeCategory, sortBy, lang, t]);

//   return (
//     <div className="min-h-screen font-sans bg-gray-50/50">
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
//         <div className="flex flex-col gap-6 mb-10 md:flex-row md:items-center md:justify-between">
//           <div className={`flex gap-2 pb-2 overflow-x-auto no-scrollbar md:pb-0 transition-opacity ${searchResults !== null ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setActiveCategory(cat as string)}
//                 className={`px-5 py-2 text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap rounded-full border ${
//                   activeCategory === cat 
//                     ? "bg-gray-900 text-white border-gray-900 shadow-md" 
//                     : "bg-white text-gray-600 border-gray-200 hover:border-[#006A4E] hover:text-[#006A4E]"
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>

//           <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
//             <div className="relative w-full sm:w-80 group">
//               <svg className={`absolute w-5 h-5 left-4 top-3 transition-colors ${isSearching ? 'text-[#006A4E]' : 'text-gray-400 group-focus-within:text-[#006A4E]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//               <input 
//                 type="text" 
//                 placeholder={t("search_prod_placeholder")} 
//                 value={searchQuery}
//                 onChange={handleSearchInput}
//                 className="w-full py-2.5 pl-12 pr-10 text-sm transition-all bg-white border border-gray-200 rounded-full outline-none focus:ring-2 focus:ring-[#006A4E]/30 focus:border-[#006A4E] shadow-sm hover:shadow-md"
//               />
//               {/* Spinner Kecil Khas Meilisearch */}
//               {isSearching && (
//                 <div className="absolute right-4 top-3 w-4 h-4 border-2 border-gray-300 border-t-[#006A4E] rounded-full animate-spin"></div>
//               )}
//             </div>
//           </div>
//         </div>

//         {loading ? (
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-pulse">
//             {[...Array(8)].map((_, i) => (
//               <div key={i} className="flex flex-col overflow-hidden bg-white border border-gray-100 rounded-2xl">
//                 <div className="w-full bg-gray-200 aspect-square"></div>
//                 <div className="p-5 space-y-3">
//                   <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
//                   <div className="w-1/2 h-6 bg-gray-200 rounded"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : processedProducts.length === 0 ? (
//           <div className="py-20 text-center bg-white border border-gray-100 border-dashed rounded-3xl">
//             <h3 className="text-xl font-bold text-gray-700">{searchQuery ? "Produk Tidak Ditemukan" : t("no_product_found")}</h3>
//             <p className="mt-2 text-gray-500">{searchQuery ? "Maaf, mesin pencari kami tidak dapat menemukan produk yang sesuai dengan ketikan Anda." : t("no_product_desc")}</p>
//             <button onClick={() => {setSearchQuery(""); setSearchResults(null); setActiveCategory(t("cat_all"));}} className="mt-6 text-sm font-bold text-[#006A4E] hover:underline px-6 py-2 bg-emerald-50 rounded-full">Tampilkan Semua Produk</button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {processedProducts.map((product) => {
//               const isWished = wishlistIds.includes(product.id);
//               const baseCatName = product.category?.name || product.category_name || "";
//               const displayCategory = lang === "en" ? (product.category_en || baseCatName) : baseCatName;
//               const displayName = lang === "en" ? (product.name_en || product.name) : product.name;

//               const dynamicPriceObj = getPriceToDisplay(product);
//               const dynamicDiscountObj = getDiscountToDisplay(product);
//               const dynamicWholesaleObj = getWholesaleToDisplay(product);

//               const hasWholesale = dynamicWholesaleObj && dynamicWholesaleObj.value > 0;
//               const isReseller = userType === 'reseller';

//               let finalPriceObj = dynamicPriceObj;
//               let isDiscounted = false;
//               let discountPercentage = 0;

//               if (isReseller && hasWholesale) {
//                 finalPriceObj = dynamicWholesaleObj!;
//                 isDiscounted = true;
//                 discountPercentage = Math.round(((dynamicPriceObj.value - dynamicWholesaleObj!.value) / dynamicPriceObj.value) * 100);
//               } 
//               else if (dynamicDiscountObj && dynamicDiscountObj.value > 0 && dynamicDiscountObj.value < dynamicPriceObj.value) {
//                 finalPriceObj = dynamicDiscountObj;
//                 isDiscounted = true;
//                 discountPercentage = Math.round(((dynamicPriceObj.value - dynamicDiscountObj.value) / dynamicPriceObj.value) * 100);
//               }

//               return (
//                 <Link 
//                   key={product.id} 
//                   to={`/${lang}/product/${product.slug}`} 
//                   state={{ 
//                     initialProduct: product,
//                     allProducts: products
//                   }}
//                   className="relative flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm group rounded-2xl hover:shadow-xl hover:border-[#006A4E]/30 hover:-translate-y-1"
//                 >
//                   <div className="relative overflow-hidden aspect-square bg-gray-50">
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
//                       <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-md shadow-sm bg-white/90 backdrop-blur-sm w-fit">
//                         {displayCategory}
//                       </span>
//                       {product.stock < 5 && product.stock > 0 && (
//                         <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm bg-red-500/90 backdrop-blur-sm animate-pulse w-fit">
//                           {t("stock_warning", { stock: product.stock.toString() })}
//                         </span>
//                       )}
//                       {product.stock === 0 && (
//                          <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm bg-gray-900/90 backdrop-blur-sm w-fit">
//                           {t("status_out_of_stock")}
//                         </span>
//                       )}
                      
//                       {isDiscounted && (
//                          <span className={`px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm w-fit ${isReseller && hasWholesale ? 'bg-blue-600' : 'bg-red-600'}`}>
//                           {isReseller && hasWholesale ? 'GROSIR' : `-${discountPercentage}%`}
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
//                   </div>

//                   <div className="flex flex-col flex-grow p-5 bg-white">
//                     <h3 className="mb-1 text-sm font-bold text-gray-900 transition-colors sm:text-base group-hover:text-[#006A4E] line-clamp-2">
//                       {displayName}
//                     </h3>
//                     <div className="pt-3 mt-auto">
//                       {isDiscounted ? (
//                         <div className="flex flex-col">
//                           <span className="text-sm font-medium text-gray-400 line-through">
//                             {formatCurrencyDisplay(dynamicPriceObj)}
//                           </span>
//                           <span className={`text-lg font-black ${isReseller && hasWholesale ? 'text-blue-600' : 'text-red-600'}`}>
//                             {formatCurrencyDisplay(finalPriceObj)}
//                           </span>
//                         </div>
//                       ) : (
//                         <p className="text-lg font-black text-gray-900">
//                           {formatCurrencyDisplay(dynamicPriceObj)}
//                         </p>
//                       )}
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

import { useState, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import Swal from "sweetalert2";
import { BASE_URL } from "../../../config/api";
import { useLanguage } from "../../../context/LanguageContext";
import { useCurrency } from "../../../context/CurrencyContext";

interface Product {
  id: number;
  category?: {
    id: number;
    name: string;
  };
  category_name?: string; 
  sku?: string;
  name: string;
  slug: string;
  description?: string;
  benefits?: string;
  price: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prices?: any;            
  discount_price?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  discount_prices?: any;   
  wholesale_price?: number; 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wholesale_prices?: any; 
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

type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

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
  const location = useLocation();
  const { t, lang } = useLanguage(); 
  const { currency } = useCurrency();
  
  const CACHE_KEY = `gycora_catalog_products_${lang}`;
  const [products, setProducts] = useState<Product[]>(() => {
    const cached = sessionStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : [];
  });
  
  const [loading, setLoading] = useState(products.length === 0);
  
  const WISHLIST_CACHE_KEY = 'gycora_user_wishlists';
  const [wishlistIds, setWishlistIds] = useState<number[]>(() => {
    const cached = sessionStorage.getItem(WISHLIST_CACHE_KEY);
    return cached ? JSON.parse(cached) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  
  // 👇 PERBAIKAN: Gunakan ReturnType<typeof setTimeout> alih-alih NodeJS.Timeout
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [activeCategory, setActiveCategory] = useState(t("cat_all"));
  const [sortBy] = useState("name_asc"); 
  const [userType, setUserType] = useState<string>('guest');

  useEffect(() => {
    if (location.state?.filterCategory) {
      setActiveCategory(location.state.filterCategory);
    } else {
      setActiveCategory(t("cat_all"));
    }
    
    const userStr = localStorage.getItem("user_data");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserType(user.usertype || 'user');
      } catch (e) {
        setUserType('guest');
      }
    }
  }, [lang, t, location.state]);

  const getPriceToDisplay = (product: Product) => {
    const curr = (currency as Currency) || 'IDR';
    if (curr === 'IDR') return { value: product.price, curr: 'IDR' };
    const pricesObj = typeof product.prices === 'string' ? JSON.parse(product.prices) : (product.prices || {});
    if (pricesObj[curr]) return { value: parseFloat(pricesObj[curr]), curr: curr };
    return { value: product.price, curr: 'IDR' };
  };

  const getDiscountToDisplay = (product: Product) => {
    const curr = (currency as Currency) || 'IDR';
    if (curr === 'IDR') return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
    const discObj = typeof product.discount_prices === 'string' ? JSON.parse(product.discount_prices) : (product.discount_prices || {});
    if (discObj[curr]) return { value: parseFloat(discObj[curr]), curr: curr };
    return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
  };

  const getWholesaleToDisplay = (product: Product) => {
    const curr = (currency as Currency) || 'IDR';
    if (curr === 'IDR') return product.wholesale_price ? { value: product.wholesale_price, curr: 'IDR' } : null;
    const wholesaleObj = typeof product.wholesale_prices === 'string' ? JSON.parse(product.wholesale_prices) : (product.wholesale_prices || {});
    if (wholesaleObj[curr]) return { value: parseFloat(wholesaleObj[curr]), curr: curr };
    return product.wholesale_price ? { value: product.wholesale_price, curr: 'IDR' } : null;
  };

  const formatCurrencyDisplay = (priceObj: {value: number, curr: string} | null) => {
    if (!priceObj) return "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const symbols: any = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
    const formatter = new Intl.NumberFormat(priceObj.curr === "IDR" ? "id-ID" : "en-US", {
      minimumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
      maximumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
    });
    return `${symbols[priceObj.curr] || priceObj.curr + " "}${formatter.format(priceObj.value)}`;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (products.length === 0) setLoading(true);
      
      try {
        const res = await fetch(`${BASE_URL}/api/products`);
        if (!res.ok) throw new Error("Gagal mengambil data produk");

        const responseData = await res.json();
        let productsArray = responseData.data ? responseData.data : responseData;
        productsArray = productsArray || [];

        if (lang === "en") {
          productsArray = await Promise.all(productsArray.map(async (p: Product) => {
            const baseCategoryName = p.category?.name || p.category_name || "";
            return {
              ...p,
              name_en: await translateText(p.name, "en"),
              category_en: await translateText(baseCategoryName, "en")
            };
          }));
        }

        setProducts(productsArray);
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(productsArray));

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
          const ids = data.map((item: any) => item.product_id);
          setWishlistIds(ids);
          sessionStorage.setItem(WISHLIST_CACHE_KEY, JSON.stringify(ids)); 
        }
      } catch (error) {
        console.error("Gagal mengambil wishlist:", error);
      }
    };

    fetchProducts();
    fetchWishlists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]); 

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setActiveCategory(t("cat_all"));

    if (value.trim() === "") {
      setSearchResults(null);
      setIsSearching(false);
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      return;
    }

    setIsSearching(true);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/search/products?q=${encodeURIComponent(value)}`);
        const data = await res.json();
        
        if (res.ok && data.data) {
          setSearchResults(data.data);
        } else {
          setSearchResults([]); 
        }
      } catch (error) {
        console.error("Meilisearch API Error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 400); 
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
        if (result.isConfirmed) navigate(`/${lang}/login`);
      });
      return;
    }

    const isWished = wishlistIds.includes(productId);
    
    let newIds;
    if (isWished) {
      newIds = wishlistIds.filter(id => id !== productId);
    } else {
      newIds = [...wishlistIds, productId];
    }
    setWishlistIds(newIds);
    sessionStorage.setItem(WISHLIST_CACHE_KEY, JSON.stringify(newIds));

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

  const categories = useMemo(() => {
    const rawCategories = products.map((p) => {
      const baseName = p.category?.name || p.category_name || "";
      return lang === "en" ? (p.category_en || baseName) : baseName;
    }).filter(Boolean);
    
    return [t("cat_all"), ...Array.from(new Set(rawCategories))];
  }, [products, lang, t]);

  const processedProducts = useMemo(() => {
    const sourceProducts = searchResults !== null ? searchResults : products;

    return sourceProducts
      .filter((p) => {
        if (searchResults !== null) return true;

        const baseCatName = p.category?.name || p.category_name || "";
        const catName = lang === "en" ? (p.category_en || baseCatName) : baseCatName;
        
        return activeCategory === t("cat_all") || catName === activeCategory;
      })
      .sort((a, b) => {
        if (searchResults !== null) return 0;

        const nameA = lang === "en" ? (a.name_en || a.name) : a.name;
        const nameB = lang === "en" ? (b.name_en || b.name) : b.name;
        if (sortBy === "name_asc") return nameA.localeCompare(nameB);
        return b.id - a.id; 
      });
  }, [products, searchResults, activeCategory, sortBy, lang, t]);

  return (
    <div className="min-h-screen font-sans bg-gray-50/50">
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
        <div className="flex flex-col gap-6 mb-10 md:flex-row md:items-center md:justify-between">
          <div className={`flex gap-2 pb-2 overflow-x-auto no-scrollbar md:pb-0 transition-opacity ${searchResults !== null ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as string)}
                className={`px-5 py-2 text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap rounded-full border ${
                  activeCategory === cat 
                    ? "bg-gray-900 text-white border-gray-900 shadow-md" 
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#006A4E] hover:text-[#006A4E]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-80 group">
              <svg className={`absolute w-5 h-5 left-4 top-3 transition-colors ${isSearching ? 'text-[#006A4E]' : 'text-gray-400 group-focus-within:text-[#006A4E]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder={t("search_prod_placeholder")} 
                value={searchQuery}
                onChange={handleSearchInput}
                className="w-full py-2.5 pl-12 pr-10 text-sm transition-all bg-white border border-gray-200 rounded-full outline-none focus:ring-2 focus:ring-[#006A4E]/30 focus:border-[#006A4E] shadow-sm hover:shadow-md"
              />
              {isSearching && (
                <div className="absolute right-4 top-3 w-4 h-4 border-2 border-gray-300 border-t-[#006A4E] rounded-full animate-spin"></div>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col overflow-hidden bg-white border border-gray-100 rounded-2xl">
                <div className="w-full bg-gray-200 aspect-square"></div>
                <div className="p-5 space-y-3">
                  <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                  <div className="w-1/2 h-6 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : processedProducts.length === 0 ? (
          <div className="py-20 text-center bg-white border border-gray-100 border-dashed rounded-3xl">
            <h3 className="text-xl font-bold text-gray-700">{searchQuery ? "Produk Tidak Ditemukan" : t("no_product_found")}</h3>
            <p className="mt-2 text-gray-500">{searchQuery ? "Maaf, mesin pencari kami tidak dapat menemukan produk yang sesuai dengan ketikan Anda." : t("no_product_desc")}</p>
            <button onClick={() => {setSearchQuery(""); setSearchResults(null); setActiveCategory(t("cat_all"));}} className="mt-6 text-sm font-bold text-[#006A4E] hover:underline px-6 py-2 bg-emerald-50 rounded-full">Tampilkan Semua Produk</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {processedProducts.map((product) => {
              const isWished = wishlistIds.includes(product.id);
              const baseCatName = product.category?.name || product.category_name || "";
              const displayCategory = lang === "en" ? (product.category_en || baseCatName) : baseCatName;
              const displayName = lang === "en" ? (product.name_en || product.name) : product.name;

              const dynamicPriceObj = getPriceToDisplay(product);
              const dynamicDiscountObj = getDiscountToDisplay(product);
              const dynamicWholesaleObj = getWholesaleToDisplay(product);

              const hasWholesale = dynamicWholesaleObj && dynamicWholesaleObj.value > 0;
              const isReseller = userType === 'reseller';

              let finalPriceObj = dynamicPriceObj;
              let isDiscounted = false;
              let discountPercentage = 0;

              if (isReseller && hasWholesale) {
                finalPriceObj = dynamicWholesaleObj!;
                isDiscounted = true;
                discountPercentage = Math.round(((dynamicPriceObj.value - dynamicWholesaleObj!.value) / dynamicPriceObj.value) * 100);
              } 
              else if (dynamicDiscountObj && dynamicDiscountObj.value > 0 && dynamicDiscountObj.value < dynamicPriceObj.value) {
                finalPriceObj = dynamicDiscountObj;
                isDiscounted = true;
                discountPercentage = Math.round(((dynamicPriceObj.value - dynamicDiscountObj.value) / dynamicPriceObj.value) * 100);
              }

              return (
                <Link 
                  key={product.id} 
                  to={`/${lang}/product/${product.slug}`} 
                  state={{ 
                    initialProduct: product,
                    allProducts: products
                  }}
                  className="relative flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm group rounded-2xl hover:shadow-xl hover:border-[#006A4E]/30 hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden aspect-square bg-gray-50">
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
                      <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-md shadow-sm bg-white/90 backdrop-blur-sm w-fit">
                        {displayCategory}
                      </span>
                      {product.stock < 5 && product.stock > 0 && (
                        <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm bg-red-500/90 backdrop-blur-sm animate-pulse w-fit">
                          {t("stock_warning", { stock: product.stock.toString() })}
                        </span>
                      )}
                      {product.stock === 0 && (
                         <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm bg-gray-900/90 backdrop-blur-sm w-fit">
                          {t("status_out_of_stock")}
                        </span>
                      )}
                      
                      {isDiscounted && (
                         <span className={`px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-md shadow-sm w-fit ${isReseller && hasWholesale ? 'bg-blue-600' : 'bg-red-600'}`}>
                          {isReseller && hasWholesale ? 'GROSIR' : `-${discountPercentage}%`}
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
                  </div>

                  <div className="flex flex-col flex-grow p-5 bg-white">
                    <h3 className="mb-1 text-sm font-bold text-gray-900 transition-colors sm:text-base group-hover:text-[#006A4E] line-clamp-2">
                      {displayName}
                    </h3>
                    <div className="pt-3 mt-auto">
                      {isDiscounted ? (
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-400 line-through">
                            {formatCurrencyDisplay(dynamicPriceObj)}
                          </span>
                          <span className={`text-lg font-black ${isReseller && hasWholesale ? 'text-blue-600' : 'text-red-600'}`}>
                            {formatCurrencyDisplay(finalPriceObj)}
                          </span>
                        </div>
                      ) : (
                        <p className="text-lg font-black text-gray-900">
                          {formatCurrencyDisplay(dynamicPriceObj)}
                        </p>
                      )}
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